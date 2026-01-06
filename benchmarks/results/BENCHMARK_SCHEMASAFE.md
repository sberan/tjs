# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | schemasafe pass | schemasafe ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.4M | 184/199 | 21.5M | 184 | -18% |
| draft6 | 276 | ✅ 276 | 28.7M | 259/276 | 23.5M | 259 | -18% |
| draft7 | 313 | ✅ 313 | 15.6M | 281/313 | 21.1M | 281 | 🔴 **+35%** |
| draft2019-09 | 435 | ✅ 435 | 18.6M | 399/435 | 18.9M | 399 | +2% |
| draft2020-12 | 448 | ✅ 448 | 18.8M | 389/448 | 15.2M | 389 | -20% |
| **Total** | 1671 | 1670/1671 | 19.7M | 1512/1671 | 19.1M | 1512 | -3% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **1.40x faster** (37 ns vs 52 ns per test, 6344 tests in 1512 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.5M | ✅ | 7.4M | -1% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 85.1M | ✅ | 120.3M | 🔴 **+41%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 144.6M | ✅ | 89.5M | 🟢 **-38%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 88.3M | ✅ | 131.4M | 🔴 **+49%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 69.3M | 🟢 **-44%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 44.4M | ✅ | 35.7M | -19% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.3M | ✅ | 28.6M | 🟢 **-51%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 69.6M | ✅ | 71.3M | +2% |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 151.9M | ✅ | 124.2M | -18% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 38.7M | ✅ | 45.8M | +18% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.0M | ✅ | 23.9M | +8% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 34.9M | ✅ | 25.7M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 43.9M | ✅ | 25.1M | 🟢 **-43%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 77.1M | ✅ | 123.6M | 🔴 **+60%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 32.5M | ✅ | 17.4M | 🟢 **-46%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 50.9M | ✅ | 51.7M | +1% |
| allOf.json | allOf | 4 | ✅ | 46.8M | ✅ | 38.8M | -17% |
| allOf.json | allOf with base schema | 5 | ✅ | 26.8M | ✅ | 25.3M | -6% |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 81.7M | 🟢 **-26%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 85.2M | ✅ | 124.0M | 🔴 **+46%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.9M | ✅ | 123.7M | -19% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.4M | ✅ | 82.7M | +13% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.5M | ✅ | 83.2M | 🟢 **-29%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.5M | ✅ | 81.6M | +9% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 55.6M | 🟢 **-34%** |
| anyOf.json | anyOf | 4 | ✅ | 76.0M | ✅ | 92.6M | 🔴 **+22%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.1M | ✅ | 26.8M | 🟢 **-40%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.0M | ✅ | 22.6M | 🟢 **-53%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 163.7M | ✅ | 132.2M | -19% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.6M | ✅ | 81.2M | +9% |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 75.5M | 🟢 **-30%** |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ✅ | 43.0M | -18% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.2M | ✅ | 57.2M | 🟢 **-26%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.8M | ✅ | 71.9M | 🟢 **-21%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.2M | ✅ | 31.5M | -5% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 31.7M | ✅ | 35.2M | +11% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.5M | ✅ | 16.9M | -9% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 45.7M | ✅ | 15.9M | 🟢 **-65%** |
| enum.json | simple enum validation | 2 | ✅ | 71.9M | ✅ | 82.2M | +14% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.6M | ✅ | 38.2M | 🟢 **-37%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.1M | ✅ | 86.6M | 🔴 **+22%** |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 36.7M | 🔴 **+146%** |
| enum.json | enum with escaped characters | 3 | ✅ | 57.4M | ✅ | 63.4M | +10% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 106.5M | ✅ | 67.8M | 🟢 **-36%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.6M | ✅ | 66.1M | +7% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 57.8M | ✅ | 67.8M | +17% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 31.7M | ✅ | 63.4M | 🔴 **+100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.3M | ✅ | 80.0M | 🟢 **-30%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.5M | ✅ | 78.1M | 🔴 **+23%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 104.7M | ✅ | 87.7M | -16% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 63.3M | ✅ | 79.2M | 🔴 **+25%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 71.0M | 🟢 **-22%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ✅ | 66.6M | +18% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 74.1M | 🟢 **-21%** |
| format.json | email format | 6 | ✅ | 79.6M | ✅ | 129.5M | 🔴 **+63%** |
| format.json | ipv4 format | 6 | ✅ | 162.5M | ✅ | 126.4M | 🟢 **-22%** |
| format.json | ipv6 format | 6 | ✅ | 79.4M | ✅ | 119.9M | 🔴 **+51%** |
| format.json | hostname format | 6 | ✅ | 134.1M | ✅ | 107.0M | 🟢 **-20%** |
| format.json | date-time format | 6 | ✅ | 82.8M | ✅ | 113.2M | 🔴 **+37%** |
| format.json | uri format | 6 | ✅ | 133.5M | ✅ | 66.3M | 🟢 **-50%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.3M | ✅ | 25.1M | 🟢 **-34%** |
| items.json | a schema given for items | 4 | ✅ | 68.4M | ✅ | 40.7M | 🟢 **-40%** |
| items.json | an array of schemas for items | 6 | ✅ | 33.4M | ✅ | 58.0M | 🔴 **+73%** |
| items.json | items and subitems | 6 | ✅ | 13.4M | ✅ | 8.2M | 🟢 **-39%** |
| items.json | nested items | 3 | ✅ | 11.8M | ✅ | 6.7M | 🟢 **-43%** |
| items.json | items with null instance elements | 1 | ✅ | 72.0M | ✅ | 66.1M | -8% |
| items.json | array-form items with null instance e... | 1 | ✅ | 76.9M | ✅ | 69.3M | -10% |
| maxItems.json | maxItems validation | 4 | ✅ | 74.5M | ✅ | 92.5M | 🔴 **+24%** |
| maxLength.json | maxLength validation | 5 | ✅ | 56.1M | ✅ | 33.8M | 🟢 **-40%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.1M | ✅ | 37.9M | 🟢 **-31%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.1M | ✅ | 40.6M | -6% |
| maximum.json | maximum validation | 4 | ✅ | 66.4M | ✅ | 94.6M | 🔴 **+43%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ✅ | 90.1M | 🔴 **+36%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 72.6M | ✅ | 81.7M | +12% |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 67.4M | ✅ | 78.8M | +17% |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ✅ | 87.7M | +19% |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ✅ | 32.1M | 🟢 **-43%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.3M | ✅ | 62.1M | +8% |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ✅ | 89.6M | 🔴 **+28%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 70.8M | ✅ | 92.0M | 🔴 **+30%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 63.2M | ✅ | 80.1M | 🔴 **+27%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 80.4M | +16% |
| multipleOf.json | by int | 3 | ✅ | 74.0M | ✅ | 89.8M | 🔴 **+21%** |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 56.1M | -16% |
| multipleOf.json | by small number | 2 | ✅ | 64.0M | ✅ | 27.3M | 🟢 **-57%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 15.9M | 🟢 **-78%** |
| not.json | not | 2 | ✅ | 73.4M | ✅ | 76.9M | +5% |
| not.json | not multiple types | 3 | ✅ | 67.9M | ✅ | 63.6M | -6% |
| not.json | not more complex schema | 3 | ✅ | 65.9M | ✅ | 47.1M | 🟢 **-28%** |
| not.json | forbidden property | 2 | ✅ | 49.5M | ✅ | 55.9M | +13% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.3M | ✅ | 58.0M | -4% |
| not.json | double negation | 1 | ✅ | 85.2M | ✅ | 123.0M | 🔴 **+44%** |
| oneOf.json | oneOf | 4 | ✅ | 74.3M | ✅ | 67.7M | -9% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.3M | ✅ | 26.5M | 🟢 **-21%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.4M | ✅ | 29.2M | 🟢 **-33%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.4M | ✅ | 81.8M | +13% |
| oneOf.json | oneOf with required | 4 | ✅ | 46.7M | ✅ | 26.4M | 🟢 **-43%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 57.4M | ✅ | 31.9M | 🟢 **-44%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 67.9M | ✅ | 79.3M | +17% |
| pattern.json | pattern validation | 8 | ✅ | 54.0M | ✅ | 71.0M | 🔴 **+32%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.8M | ✅ | 60.5M | 🔴 **+144%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 17.2M | 🟢 **-33%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.9M | ✅ | 14.5M | +4% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.0M | ✅ | 13.3M | -5% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 22.8M | 🔴 **+28%** |
| properties.json | object properties validation | 6 | ✅ | 53.0M | ✅ | 53.9M | +2% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ✅ | 12.0M | 🟢 **-38%** |
| properties.json | properties with escaped characters | 2 | ✅ | 48.8M | ✅ | 24.6M | 🟢 **-49%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ✅ | 60.3M | -10% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ✅ | 29.2M | +5% |
| ref.json | root pointer ref | 4 | ✅ | 25.3M | ✅ | 14.2M | 🟢 **-44%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 51.3M | ✅ | 28.6M | 🟢 **-44%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 55.6M | ✅ | 25.1M | 🟢 **-55%** |
| ref.json | escaped pointer ref | 6 | ✅ | 45.5M | ✅ | 29.4M | 🟢 **-35%** |
| ref.json | nested refs | 2 | ✅ | 38.2M | ✅ | 11.7M | 🟢 **-69%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 52.9M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 73.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.1M | ✅ | 45.6M | -12% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.2M | ✅ | 29.0M | 🟢 **-42%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.0M | ✅ | 2.7M | 🟢 **-75%** |
| ref.json | refs with quote | 2 | ✅ | 50.5M | ✅ | 28.5M | 🟢 **-44%** |
| ref.json | Location-independent identifier | 2 | ✅ | 73.2M | ✅ | 42.5M | 🟢 **-42%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 49.0M | ✅ | 33.7M | 🟢 **-31%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 54.5M | ✅ | 46.2M | -15% |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 48.8M | ✅ | 43.6M | -11% |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 73.2M | ✅ | 42.7M | 🟢 **-42%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 73.4M | ✅ | 43.3M | 🟢 **-41%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.3M | ✅ | 39.8M | 🟢 **-41%** |
| refRemote.json | remote ref | 2 | ✅ | 49.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 26.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.4M | ✅ | 82.5M | 🔴 **+32%** |
| required.json | required default validation | 1 | ✅ | 85.2M | ✅ | 121.6M | 🔴 **+43%** |
| required.json | required with escaped characters | 2 | ✅ | 49.9M | ✅ | 24.0M | 🟢 **-52%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.0M | ✅ | 35.8M | 🔴 **+38%** |
| type.json | integer type matches integers | 8 | ✅ | 60.7M | ✅ | 57.3M | -6% |
| type.json | number type matches numbers | 9 | ✅ | 65.8M | ✅ | 66.4M | +1% |
| type.json | string type matches strings | 9 | ✅ | 65.8M | ✅ | 70.7M | +7% |
| type.json | object type matches objects | 7 | ✅ | 56.9M | ✅ | 58.1M | +2% |
| type.json | array type matches arrays | 7 | ✅ | 61.2M | ✅ | 55.6M | -9% |
| type.json | boolean type matches booleans | 10 | ✅ | 63.1M | ✅ | 59.3M | -6% |
| type.json | null type matches only the null object | 10 | ✅ | 62.9M | ✅ | 57.5M | -9% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.6M | ✅ | 65.7M | +3% |
| type.json | type as array with one item | 2 | ✅ | 71.4M | ✅ | 85.5M | +20% |
| type.json | type: array or object | 5 | ✅ | 69.0M | ✅ | 64.4M | -7% |
| type.json | type: array, object or null | 5 | ✅ | 73.4M | ✅ | 73.6M | +0% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.7M | ✅ | 8.0M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.7M | ✅ | 24.2M | 🟢 **-24%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ✅ | 29.8M | 🔴 **+58%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 86.1M | ✅ | 125.0M | 🔴 **+45%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.5M | ✅ | 47.3M | 🟢 **-31%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.3M | ✅ | 43.0M | 🟢 **-38%** |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 120.9M | 🔴 **+44%** |
| optional/bignum.json | number | 2 | ✅ | 84.0M | ✅ | 123.8M | 🔴 **+47%** |
| optional/bignum.json | string | 1 | ✅ | 60.9M | ✅ | 61.3M | +1% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 110.4M | 🔴 **+47%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ✅ | 59.4M | +3% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 110.3M | 🔴 **+47%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ✅ | 58.7M | +2% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.8M | ✅ | 70.7M | 🔴 **+154%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.8M | ✅ | 36.0M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 35.8M | 🔴 **+29%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 33.8M | ✅ | 36.1M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.0M | ✅ | 33.9M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 23.3M | ✅ | 35.4M | 🔴 **+52%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.9M | ✅ | 36.5M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.7M | ✅ | 36.0M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.2M | ✅ | 37.6M | 🔴 **+49%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.5M | ✅ | 32.5M | +10% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ✅ | 20.5M | 🔴 **+23%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ✅ | 16.4M | +11% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ✅ | 15.3M | +1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.7M | ✅ | 33.5M | 🔴 **+21%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.7M | ✅ | 23.5M | +14% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.4M | ✅ | 19.2M | -14% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 13.0M | 🟢 **-35%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.1M | ✅ | 14.0M | 🟢 **-23%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.6M | ✅ | 9.0M | +19% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 11.2M | 🔴 **+34%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ✅ | 16.0M | 🟢 **-26%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ✅ | 9.3M | 🟢 **-64%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.6M | ✅ | 14.2M | 🟢 **-23%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.2M | ✅ | 34.5M | -7% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ✅ | 18.0M | 🔴 **+50%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.7M | 🟢 **-25%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.4M | ✅ | 25.2M | 🟢 **-29%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.2M | ✅ | 34.3M | +13% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.2M | ✅ | 10.6M | 🟢 **-30%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.0M | ✅ | 7.5M | +8% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 20.9M | 🟢 **-43%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 122.6M | -20% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 36.3M | ✅ | 85.7M | 🔴 **+136%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.3M | ✅ | 131.9M | -20% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.3M | ✅ | 69.3M | -5% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.0M | ✅ | 35.6M | 🟢 **-35%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.7M | ✅ | 28.2M | 🟢 **-34%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 106.5M | ✅ | 78.5M | 🟢 **-26%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ✅ | 123.0M | 🔴 **+67%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.7M | ✅ | 41.0M | -10% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.5M | ✅ | 24.0M | +12% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.9M | ✅ | 27.6M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.4M | ✅ | 25.0M | 🟢 **-27%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 122.9M | -20% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.3M | ✅ | 16.9M | 🟢 **-40%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 51.4M | 🟢 **-26%** |
| allOf.json | allOf | 4 | ✅ | 38.3M | ✅ | 39.6M | +3% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.1M | ✅ | 25.4M | -18% |
| allOf.json | allOf simple types | 2 | ✅ | 66.6M | ✅ | 85.2M | 🔴 **+28%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.1M | ✅ | 115.5M | 🟢 **-25%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.7M | ✅ | 64.5M | +6% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.2M | 🟢 **-31%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.5M | ✅ | 122.9M | 🔴 **+67%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.2M | ✅ | 121.5M | 🟢 **-21%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 70.0M | ✅ | 82.9M | +18% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 87.2M | 🟢 **-26%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.8M | ✅ | 85.0M | +20% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 59.0M | 🟢 **-30%** |
| anyOf.json | anyOf | 4 | ✅ | 71.6M | ✅ | 92.2M | 🔴 **+29%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 44.7M | ✅ | 27.3M | 🟢 **-39%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.7M | ✅ | 123.1M | 🔴 **+53%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.9M | ✅ | 122.9M | -20% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.7M | ✅ | 57.2M | -6% |
| anyOf.json | anyOf complex types | 4 | ✅ | 77.5M | ✅ | 30.6M | 🟢 **-60%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 83.4M | ✅ | 130.9M | 🔴 **+57%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 86.0M | 🟢 **-28%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 71.1M | ✅ | 136.4M | 🔴 **+92%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 88.9M | ✅ | 17.9M | 🟢 **-80%** |
| const.json | const validation | 3 | ✅ | 74.3M | ✅ | 68.0M | -9% |
| const.json | const with object | 4 | ✅ | 49.9M | ✅ | 32.4M | 🟢 **-35%** |
| const.json | const with array | 3 | ✅ | 53.7M | ✅ | 8.8M | 🟢 **-84%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 81.7M | 🟢 **-32%** |
| const.json | const with false does not match 0 | 3 | ✅ | 68.0M | ✅ | 73.8M | +8% |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 75.4M | 🟢 **-33%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 59.2M | ✅ | 68.9M | +16% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ✅ | 70.3M | 🟢 **-26%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.3M | ✅ | 32.6M | 🟢 **-46%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.8M | ✅ | 33.1M | 🟢 **-65%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 56.7M | ✅ | 64.8M | +14% |
| const.json | const with 1 does not match true | 3 | ✅ | 106.3M | ✅ | 89.2M | -16% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.0M | ✅ | 68.7M | +6% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 106.8M | ✅ | 78.8M | 🟢 **-26%** |
| const.json | nul characters in strings | 2 | ✅ | 59.7M | ✅ | 73.1M | 🔴 **+22%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 67.0M | -15% |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.7M | ✅ | 75.3M | 🔴 **+24%** |
| contains.json | contains keyword validation | 6 | ✅ | 98.8M | ✅ | 19.6M | 🟢 **-80%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.4M | ✅ | 14.7M | 🟢 **-74%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.1M | ✅ | 72.4M | 🟢 **-31%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 65.9M | ✅ | 42.2M | 🟢 **-36%** |
| contains.json | items + contains | 4 | ✅ | 51.7M | ✅ | 18.6M | 🟢 **-64%** |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 37.9M | 🟢 **-46%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 75.0M | 🟢 **-30%** |
| default.json | invalid string value for default | 2 | ✅ | 51.4M | ✅ | 48.0M | -7% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.5M | ✅ | 56.8M | 🟢 **-28%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.2M | ✅ | 71.8M | 🟢 **-21%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 84.7M | ✅ | 134.7M | 🔴 **+59%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.3M | ✅ | 31.2M | 🟢 **-21%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 44.7M | ✅ | 35.3M | 🟢 **-21%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.1M | ✅ | 54.7M | 🟢 **-37%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.3M | ✅ | 16.4M | 🔴 **+46%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 46.3M | ✅ | 26.2M | 🟢 **-43%** |
| enum.json | simple enum validation | 2 | ✅ | 68.6M | ✅ | 85.7M | 🔴 **+25%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 37.3M | 🟢 **-39%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.1M | ✅ | 88.0M | 🔴 **+29%** |
| enum.json | enums in properties | 6 | ✅ | 15.3M | ✅ | 40.8M | 🔴 **+167%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.3M | ✅ | 96.6M | 🔴 **+34%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 109.2M | ✅ | 70.8M | 🟢 **-35%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.0M | ✅ | 38.7M | 🟢 **-34%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 108.9M | ✅ | 75.7M | 🟢 **-31%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.1M | ✅ | 70.2M | +15% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 108.7M | ✅ | 85.5M | 🟢 **-21%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 62.1M | ✅ | 80.6M | 🔴 **+30%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 89.6M | -20% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 55.3M | ✅ | 80.6M | 🔴 **+46%** |
| enum.json | nul characters in strings | 2 | ✅ | 89.9M | ✅ | 73.2M | -19% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 65.2M | ✅ | 77.9M | +19% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.0M | ✅ | 79.1M | 🟢 **-27%** |
| format.json | email format | 6 | ✅ | 78.9M | ✅ | 125.1M | 🔴 **+59%** |
| format.json | ipv4 format | 6 | ✅ | 161.2M | ✅ | 113.6M | 🟢 **-30%** |
| format.json | ipv6 format | 6 | ✅ | 80.3M | ✅ | 127.1M | 🔴 **+58%** |
| format.json | hostname format | 6 | ✅ | 162.4M | ✅ | 117.9M | 🟢 **-27%** |
| format.json | date-time format | 6 | ✅ | 78.0M | ✅ | 114.5M | 🔴 **+47%** |
| format.json | json-pointer format | 6 | ✅ | 156.4M | ✅ | 127.6M | -18% |
| format.json | uri format | 6 | ✅ | 75.5M | ✅ | 128.5M | 🔴 **+70%** |
| format.json | uri-reference format | 6 | ✅ | 162.0M | ✅ | 108.6M | 🟢 **-33%** |
| format.json | uri-template format | 6 | ✅ | 80.9M | ✅ | 128.3M | 🔴 **+59%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.7M | ✅ | 25.0M | 🟢 **-57%** |
| items.json | a schema given for items | 4 | ✅ | 50.4M | ✅ | 43.7M | -13% |
| items.json | an array of schemas for items | 6 | ✅ | 95.8M | ✅ | 59.1M | 🟢 **-38%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 78.2M | ✅ | 131.1M | 🔴 **+68%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.3M | ✅ | 66.0M | 🟢 **-37%** |
| items.json | items with boolean schemas | 3 | ✅ | 60.0M | ✅ | 78.0M | 🔴 **+30%** |
| items.json | items and subitems | 6 | ✅ | 28.2M | ✅ | 7.9M | 🟢 **-72%** |
| items.json | nested items | 3 | ✅ | 11.4M | ✅ | 6.7M | 🟢 **-41%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 66.4M | -4% |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.3M | ✅ | 69.3M | -5% |
| maxItems.json | maxItems validation | 4 | ✅ | 67.4M | ✅ | 87.4M | 🔴 **+30%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 82.3M | 🔴 **+24%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.1M | ✅ | 46.7M | -15% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.1M | ✅ | 50.8M | -4% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 68.0M | 🔴 **+25%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.5M | ✅ | 42.1M | +2% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.7M | ✅ | 46.9M | -2% |
| maximum.json | maximum validation | 4 | ✅ | 69.8M | ✅ | 99.3M | 🔴 **+42%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 69.1M | ✅ | 101.8M | 🔴 **+47%** |
| minItems.json | minItems validation | 4 | ✅ | 71.3M | ✅ | 94.1M | 🔴 **+32%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.3M | ✅ | 81.9M | 🔴 **+24%** |
| minLength.json | minLength validation | 5 | ✅ | 53.3M | ✅ | 37.8M | 🟢 **-29%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.9M | ✅ | 48.5M | -8% |
| minProperties.json | minProperties validation | 6 | ✅ | 55.8M | ✅ | 67.6M | 🔴 **+21%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.2M | ✅ | 49.4M | +5% |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ✅ | 98.1M | 🔴 **+40%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ✅ | 88.9M | 🔴 **+35%** |
| multipleOf.json | by int | 3 | ✅ | 70.4M | ✅ | 93.6M | 🔴 **+33%** |
| multipleOf.json | by number | 3 | ✅ | 67.0M | ✅ | 59.4M | -11% |
| multipleOf.json | by small number | 2 | ✅ | 56.3M | ✅ | 27.3M | 🟢 **-52%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 17.3M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 70.0M | ✅ | 80.7M | +15% |
| not.json | not multiple types | 3 | ✅ | 64.1M | ✅ | 71.9M | +12% |
| not.json | not more complex schema | 3 | ✅ | 55.4M | ✅ | 48.3M | -13% |
| not.json | forbidden property | 2 | ✅ | 48.8M | ✅ | 55.2M | +13% |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.7M | ✅ | 62.2M | +8% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.8M | ✅ | 60.1M | +4% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 79.9M | ✅ | 136.8M | 🔴 **+71%** |
| not.json | double negation | 1 | ✅ | 80.7M | ✅ | 121.3M | 🔴 **+50%** |
| oneOf.json | oneOf | 4 | ✅ | 61.5M | ✅ | 75.5M | 🔴 **+23%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.6M | ✅ | 27.8M | -15% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.5M | ✅ | 64.4M | +6% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.7M | ✅ | 123.0M | 🔴 **+53%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.7M | ✅ | 63.0M | +4% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.5M | ✅ | 64.4M | +6% |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.2M | ✅ | 28.9M | 🟢 **-31%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.0M | ✅ | 85.6M | 🔴 **+24%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.8M | ✅ | 26.5M | 🟢 **-42%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 44.1M | ✅ | 31.8M | 🟢 **-28%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.2M | ✅ | 85.3M | 🔴 **+23%** |
| pattern.json | pattern validation | 8 | ✅ | 51.9M | ✅ | 70.6M | 🔴 **+36%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.4M | ✅ | 60.5M | 🔴 **+148%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.5M | ✅ | 16.7M | 🟢 **-37%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.9M | ✅ | 14.7M | -1% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.8M | ✅ | 13.4M | -10% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.9M | ✅ | 18.0M | -14% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 21.7M | 🔴 **+22%** |
| properties.json | object properties validation | 6 | ✅ | 51.1M | ✅ | 54.3M | +6% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ✅ | 11.5M | 🟢 **-41%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ✅ | 57.7M | 🔴 **+25%** |
| properties.json | properties with escaped characters | 2 | ✅ | 47.5M | ✅ | 24.1M | 🟢 **-49%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 63.5M | ✅ | 60.3M | -5% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ✅ | 29.3M | +7% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.6M | ✅ | 39.7M | +6% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ✅ | 16.6M | -14% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.4M | ✅ | 131.3M | 🔴 **+57%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 47.6M | ✅ | 24.7M | 🟢 **-48%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.2M | ✅ | 29.2M | 🟢 **-23%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.6M | ✅ | 33.0M | -19% |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ✅ | 14.1M | 🟢 **-43%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 50.5M | ✅ | 29.0M | 🟢 **-42%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.5M | ✅ | 25.0M | 🟢 **-52%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.2M | ✅ | 28.5M | 🟢 **-35%** |
| ref.json | nested refs | 2 | ✅ | 37.1M | ✅ | 12.7M | 🟢 **-66%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 53.4M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.6M | ✅ | 49.0M | -3% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 49.7M | ✅ | 28.9M | 🟢 **-42%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.7M | ✅ | 117.6M | 🔴 **+46%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.9M | ✅ | 33.2M | 🟢 **-45%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ✅ | 2.7M | 🟢 **-68%** |
| ref.json | refs with quote | 2 | ✅ | 51.0M | ✅ | 29.2M | 🟢 **-43%** |
| ref.json | Location-independent identifier | 2 | ✅ | 47.5M | ✅ | 43.3M | -9% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 47.1M | ✅ | 43.7M | -7% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 47.3M | ✅ | 43.9M | -7% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 52.9M | ✅ | 37.8M | 🟢 **-29%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ✅ | 10.6M | 🟢 **-67%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 30.8M | ✅ | 10.6M | 🟢 **-65%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.0M | ✅ | 25.5M | 🟢 **-36%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 49.9M | ✅ | 28.8M | 🟢 **-42%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 49.7M | ✅ | 29.0M | 🟢 **-42%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.2M | ✅ | 28.9M | 🟢 **-38%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.0M | ✅ | 28.8M | 🟢 **-39%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.5M | ✅ | 28.9M | 🟢 **-36%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 40.9M | ✅ | 28.9M | 🟢 **-29%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.5M | ✅ | 43.5M | -7% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 43.6M | 🟢 **-38%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 81.7M | ✅ | 44.1M | 🟢 **-46%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 52.2M | ✅ | 42.6M | -18% |
| refRemote.json | remote ref | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 45.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 37.2M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 37.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 60.1M | ✅ | 81.5M | 🔴 **+35%** |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 122.9M | 🔴 **+52%** |
| required.json | required with empty array | 1 | ✅ | 80.4M | ✅ | 121.7M | 🔴 **+51%** |
| required.json | required with escaped characters | 2 | ✅ | 48.4M | ✅ | 24.0M | 🟢 **-50%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.7M | ✅ | 36.2M | 🔴 **+36%** |
| type.json | integer type matches integers | 9 | ✅ | 60.0M | ✅ | 63.7M | +6% |
| type.json | number type matches numbers | 9 | ✅ | 62.0M | ✅ | 72.4M | +17% |
| type.json | string type matches strings | 9 | ✅ | 61.4M | ✅ | 69.4M | +13% |
| type.json | object type matches objects | 7 | ✅ | 54.7M | ✅ | 59.0M | +8% |
| type.json | array type matches arrays | 7 | ✅ | 57.8M | ✅ | 56.0M | -3% |
| type.json | boolean type matches booleans | 10 | ✅ | 59.4M | ✅ | 62.9M | +6% |
| type.json | null type matches only the null object | 10 | ✅ | 59.2M | ✅ | 53.8M | -9% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.0M | ✅ | 70.5M | +17% |
| type.json | type as array with one item | 2 | ✅ | 69.3M | ✅ | 87.1M | 🔴 **+26%** |
| type.json | type: array or object | 5 | ✅ | 61.5M | ✅ | 65.3M | +6% |
| type.json | type: array, object or null | 5 | ✅ | 67.8M | ✅ | 73.4M | +8% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.5M | ✅ | 7.9M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ✅ | 24.0M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.0M | ✅ | 29.7M | 🔴 **+65%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.2M | ✅ | 122.0M | 🔴 **+58%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.1M | ✅ | 47.3M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.6M | ✅ | 42.2M | 🟢 **-31%** |
| optional/bignum.json | integer | 2 | ✅ | 79.2M | ✅ | 119.1M | 🔴 **+50%** |
| optional/bignum.json | number | 2 | ✅ | 79.8M | ✅ | 123.8M | 🔴 **+55%** |
| optional/bignum.json | string | 1 | ✅ | 57.9M | ✅ | 62.5M | +8% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 109.5M | 🔴 **+52%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 60.0M | +7% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 107.1M | 🔴 **+49%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 48.8M | -12% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 26.7M | ✅ | 71.5M | 🔴 **+168%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.7M | ✅ | 34.1M | 🔴 **+73%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.7M | ✅ | 35.9M | 🔴 **+35%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.2M | ✅ | 36.0M | 🔴 **+32%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.7M | ✅ | 33.3M | 🔴 **+20%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.6M | ✅ | 35.9M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.5M | ✅ | 36.4M | 🔴 **+32%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.4M | ✅ | 36.1M | 🔴 **+32%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.4M | ✅ | 38.1M | 🔴 **+50%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 34.9M | ✅ | 33.2M | -5% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 19.3M | ✅ | 20.5M | +6% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ✅ | 16.1M | +9% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.2M | ✅ | 15.4M | +2% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.3M | ✅ | 33.7M | 🔴 **+23%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.2M | ✅ | 26.2M | 🔴 **+36%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.9M | ✅ | 20.6M | -10% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 14.5M | 🟢 **-28%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.5M | ✅ | 15.4M | -17% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 9.2M | +16% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ✅ | 11.1M | 🔴 **+32%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ✅ | 16.1M | 🟢 **-21%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.4M | ✅ | 9.4M | 🟢 **-61%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.5M | ✅ | 14.1M | 🟢 **-24%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.8M | ✅ | 34.7M | -17% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ✅ | 17.9M | 🔴 **+50%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.3M | ✅ | 35.1M | +12% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 78.8M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 7.7M | 🟢 **-21%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ✅ | 19.1M | +12% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.8M | 🟢 **-24%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.1M | ✅ | 24.9M | 🟢 **-29%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 44.8M | ✅ | 31.8M | 🟢 **-29%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 45.0M | ✅ | 31.6M | 🟢 **-30%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.6M | ✅ | 34.9M | +18% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.5M | ✅ | 11.0M | 🟢 **-37%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.6M | ✅ | 25.7M | 🔴 **+90%** |

### draft7

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 7.6M | +6% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.7M | ✅ | 15.9M | 🟢 **-59%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 149.2M | ✅ | 125.6M | -16% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.8M | ✅ | 101.8M | 🔴 **+40%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ✅ | 120.1M | 🟢 **-27%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 69.3M | -14% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.2M | ✅ | 35.9M | 🟢 **-35%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.6M | ✅ | 27.8M | 🟢 **-38%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 79.0M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 125.2M | 🔴 **+55%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.0M | ✅ | 43.0M | -6% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.2M | ✅ | 24.6M | +11% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.4M | ✅ | 28.3M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.9M | ✅ | 24.8M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 125.4M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.2M | ✅ | 17.5M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 51.6M | 🟢 **-26%** |
| allOf.json | allOf | 4 | ✅ | 39.7M | ✅ | 40.0M | +1% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.6M | ✅ | 25.4M | -17% |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 86.2M | +18% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.0M | ✅ | 125.1M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 64.8M | -2% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 65.0M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 125.0M | 🔴 **+54%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.7M | ✅ | 125.3M | -18% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 88.6M | +15% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 87.8M | 🟢 **-26%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 87.2M | +11% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 60.0M | 🟢 **-29%** |
| anyOf.json | anyOf | 4 | ✅ | 81.5M | ✅ | 90.2M | +11% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.1M | ✅ | 27.6M | 🟢 **-39%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 89.9M | ✅ | 125.3M | 🔴 **+39%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.6M | ✅ | 125.4M | -18% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 64.8M | -2% |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ✅ | 30.8M | 🟢 **-57%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ✅ | 134.3M | 🔴 **+60%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 80.7M | 🟢 **-33%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.3M | ✅ | 138.5M | 🔴 **+75%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 84.9M | ✅ | 62.8M | 🟢 **-26%** |
| const.json | const validation | 3 | ✅ | 67.2M | ✅ | 68.0M | +1% |
| const.json | const with object | 4 | ✅ | 49.9M | ✅ | 32.4M | 🟢 **-35%** |
| const.json | const with array | 3 | ✅ | 51.1M | ✅ | 9.5M | 🟢 **-81%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 84.5M | 🟢 **-30%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ✅ | 75.9M | 0% |
| const.json | const with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 75.3M | 🟢 **-33%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 70.6M | +6% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ✅ | 69.4M | 🟢 **-27%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 65.5M | ✅ | 32.3M | 🟢 **-51%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.2M | ✅ | 33.5M | 🟢 **-65%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ✅ | 64.0M | +1% |
| const.json | const with 1 does not match true | 3 | ✅ | 109.0M | ✅ | 91.1M | -16% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.9M | ✅ | 69.0M | -5% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.7M | ✅ | 81.2M | 🟢 **-27%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 74.4M | +15% |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 67.3M | -15% |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ✅ | 74.1M | +12% |
| contains.json | contains keyword validation | 6 | ✅ | 99.5M | ✅ | 19.8M | 🟢 **-80%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.2M | ✅ | 15.0M | 🟢 **-74%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 86.7M | ✅ | 72.8M | -16% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.6M | ✅ | 43.2M | 🟢 **-40%** |
| contains.json | items + contains | 4 | ✅ | 51.2M | ✅ | 17.8M | 🟢 **-65%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.2M | ✅ | 59.4M | -13% |
| contains.json | contains with null instance elements | 1 | ✅ | 124.2M | ✅ | 38.3M | 🟢 **-69%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 73.0M | +2% |
| default.json | invalid string value for default | 2 | ✅ | 74.5M | ✅ | 45.0M | 🟢 **-40%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 54.9M | ✅ | 56.6M | +3% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.6M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 62.8M | ✅ | 72.7M | +16% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 136.9M | 🔴 **+42%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.6M | ✅ | 31.5M | -6% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.6M | ✅ | 35.5M | 🟢 **-24%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 56.6M | ✅ | 57.9M | +2% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.0M | ✅ | 16.1M | -11% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.6M | ✅ | 26.9M | 🟢 **-30%** |
| enum.json | simple enum validation | 2 | ✅ | 60.4M | ✅ | 86.4M | 🔴 **+43%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.7M | ✅ | 38.7M | -19% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.2M | ✅ | 89.5M | 🔴 **+39%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 40.6M | 🔴 **+176%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.2M | ✅ | 97.2M | 🔴 **+21%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 60.0M | ✅ | 77.3M | 🔴 **+29%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.3M | ✅ | 70.0M | +6% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.6M | ✅ | 77.8M | +3% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.8M | ✅ | 70.4M | +14% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.5M | ✅ | 89.4M | 🔴 **+20%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 82.5M | 🔴 **+20%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.3M | ✅ | 91.6M | 🔴 **+30%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 66.5M | ✅ | 81.3M | 🔴 **+22%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 74.1M | +14% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 67.5M | ✅ | 80.0M | +18% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.7M | ✅ | 77.5M | +10% |
| format.json | email format | 6 | ✅ | 78.1M | ✅ | 132.1M | 🔴 **+69%** |
| format.json | idn-email format | 6 | ✅ | 83.9M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 84.1M | ✅ | 119.4M | 🔴 **+42%** |
| format.json | ipv4 format | 6 | ✅ | 92.0M | ✅ | 121.2M | 🔴 **+32%** |
| format.json | ipv6 format | 6 | ✅ | 83.8M | ✅ | 119.1M | 🔴 **+42%** |
| format.json | idn-hostname format | 6 | ✅ | 83.8M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 83.8M | ✅ | 132.8M | 🔴 **+58%** |
| format.json | date format | 6 | ✅ | 91.4M | ✅ | 119.3M | 🔴 **+30%** |
| format.json | date-time format | 6 | ✅ | 88.2M | ✅ | 133.6M | 🔴 **+51%** |
| format.json | time format | 6 | ✅ | 83.3M | ✅ | 118.4M | 🔴 **+42%** |
| format.json | json-pointer format | 6 | ✅ | 92.4M | ✅ | 121.3M | 🔴 **+31%** |
| format.json | relative-json-pointer format | 6 | ✅ | 84.0M | ✅ | 119.0M | 🔴 **+42%** |
| format.json | iri format | 6 | ✅ | 90.7M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 84.8M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 83.8M | ✅ | 123.9M | 🔴 **+48%** |
| format.json | uri-reference format | 6 | ✅ | 89.4M | ✅ | 111.7M | 🔴 **+25%** |
| format.json | uri-template format | 6 | ✅ | 92.3M | ✅ | 132.8M | 🔴 **+44%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 93.8M | ✅ | 134.7M | 🔴 **+44%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.9M | ✅ | 135.3M | 🔴 **+44%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.1M | ✅ | 135.6M | 🔴 **+61%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.4M | ✅ | 95.2M | 🔴 **+23%** |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ✅ | 94.0M | 🔴 **+23%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.9M | ✅ | 80.8M | +12% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.0M | ✅ | 127.9M | 🔴 **+52%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ✅ | 78.6M | +3% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.4M | ✅ | 81.0M | +7% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.1M | ✅ | 38.7M | -8% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 45.0M | ✅ | 22.7M | 🟢 **-50%** |
| items.json | a schema given for items | 4 | ✅ | 54.3M | ✅ | 43.9M | -19% |
| items.json | an array of schemas for items | 6 | ✅ | 67.4M | ✅ | 44.3M | 🟢 **-34%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 134.7M | 🔴 **+43%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.7M | ✅ | 66.3M | -7% |
| items.json | items with boolean schemas | 3 | ✅ | 65.1M | ✅ | 79.7M | 🔴 **+22%** |
| items.json | items and subitems | 6 | ✅ | 13.0M | ✅ | 8.0M | 🟢 **-38%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 6.7M | 🟢 **-46%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 66.4M | -12% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 69.3M | -14% |
| maxItems.json | maxItems validation | 4 | ✅ | 79.0M | ✅ | 100.0M | 🔴 **+27%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 83.4M | +15% |
| maxLength.json | maxLength validation | 5 | ✅ | 59.3M | ✅ | 42.3M | 🟢 **-29%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 51.5M | -9% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.4M | ✅ | 68.7M | +18% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.4M | ✅ | 47.9M | -3% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.7M | ✅ | 50.5M | 0% |
| maximum.json | maximum validation | 4 | ✅ | 75.0M | ✅ | 99.7M | 🔴 **+33%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 74.7M | ✅ | 102.7M | 🔴 **+38%** |
| minItems.json | minItems validation | 4 | ✅ | 81.1M | ✅ | 97.6M | 🔴 **+20%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 71.0M | ✅ | 83.7M | +18% |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 36.8M | 🟢 **-37%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 49.5M | -13% |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ✅ | 68.2M | +14% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.4M | ✅ | 48.6M | -3% |
| minimum.json | minimum validation | 4 | ✅ | 79.0M | ✅ | 86.2M | +9% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 90.3M | 🔴 **+25%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 93.0M | +20% |
| multipleOf.json | by number | 3 | ✅ | 73.6M | ✅ | 59.5M | -19% |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 18.3M | 🟢 **-73%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 17.1M | 🟢 **-77%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 85.5M | +11% |
| not.json | not multiple types | 3 | ✅ | 71.0M | ✅ | 75.5M | +6% |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 47.2M | 🟢 **-31%** |
| not.json | forbidden property | 2 | ✅ | 54.0M | ✅ | 54.4M | +1% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.2M | ✅ | 62.3M | +3% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.0M | ✅ | 60.0M | 0% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.3M | ✅ | 137.7M | 🔴 **+52%** |
| not.json | double negation | 1 | ✅ | 89.6M | ✅ | 125.4M | 🔴 **+40%** |
| oneOf.json | oneOf | 4 | ✅ | 66.1M | ✅ | 68.3M | +3% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.7M | ✅ | 15.5M | 🟢 **-54%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 62.6M | -5% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 124.7M | 🔴 **+39%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 64.7M | -2% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 35.4M | 🟢 **-46%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ✅ | 29.3M | 🟢 **-34%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 41.7M | 🟢 **-45%** |
| oneOf.json | oneOf with required | 4 | ✅ | 57.5M | ✅ | 25.7M | 🟢 **-55%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 33.0M | 🟢 **-33%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 87.4M | +15% |
| pattern.json | pattern validation | 8 | ✅ | 56.2M | ✅ | 71.6M | 🔴 **+27%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 63.2M | 🔴 **+149%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.7M | ✅ | 19.2M | 🟢 **-28%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.1M | ✅ | 14.4M | +9% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.1M | ✅ | 13.6M | -10% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ✅ | 18.3M | -13% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 21.7M | +20% |
| properties.json | object properties validation | 6 | ✅ | 56.0M | ✅ | 53.8M | -4% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ✅ | 8.8M | 🟢 **-55%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.1M | ✅ | 54.7M | +11% |
| properties.json | properties with escaped characters | 2 | ✅ | 51.6M | ✅ | 12.0M | 🟢 **-77%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 60.3M | -14% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.2M | ✅ | 29.0M | +3% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.9M | ✅ | 40.3M | -1% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ✅ | 16.6M | -14% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 134.0M | 🔴 **+43%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.5M | ✅ | 23.9M | 🟢 **-54%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.4M | ✅ | 30.2M | 🟢 **-25%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.7M | ✅ | 32.8M | 🟢 **-23%** |
| ref.json | root pointer ref | 4 | ✅ | 26.1M | ✅ | 8.6M | 🟢 **-67%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.2M | ✅ | 28.5M | 🟢 **-47%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.7M | ✅ | 22.3M | 🟢 **-62%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.1M | ✅ | 29.7M | 🟢 **-37%** |
| ref.json | nested refs | 2 | ✅ | 39.1M | ✅ | 11.6M | 🟢 **-70%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.4M | ✅ | 49.0M | -8% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 53.7M | ✅ | 28.8M | 🟢 **-46%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 88.1M | ✅ | 121.2M | 🔴 **+38%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 33.4M | 🟢 **-49%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ✅ | 2.9M | 🟢 **-66%** |
| ref.json | refs with quote | 2 | ✅ | 54.7M | ✅ | 29.3M | 🟢 **-46%** |
| ref.json | Location-independent identifier | 2 | ✅ | 51.2M | ✅ | 43.8M | -14% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 50.7M | ✅ | 43.5M | -14% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 51.1M | ✅ | 43.4M | -15% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 38.2M | 🟢 **-33%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ✅ | 10.1M | 🟢 **-69%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.0M | ✅ | 9.8M | 🟢 **-69%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.2M | ✅ | 42.8M | -7% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.9M | ✅ | 25.3M | 🟢 **-42%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.2M | ✅ | 28.1M | 🟢 **-46%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.2M | ✅ | 28.7M | 🟢 **-46%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.6M | ✅ | 28.1M | 🟢 **-43%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.4M | ✅ | 28.7M | 🟢 **-42%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.1M | ✅ | 28.7M | 🟢 **-40%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.7M | ✅ | 30.3M | 🟢 **-29%** |
| ref.json | ref to if | 2 | ✅ | 50.9M | ✅ | 43.2M | -15% |
| ref.json | ref to then | 2 | ✅ | 50.7M | ✅ | 43.4M | -14% |
| ref.json | ref to else | 2 | ✅ | 49.5M | ✅ | 43.2M | -13% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.0M | ✅ | 43.2M | -15% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.9M | ✅ | 43.8M | 🟢 **-43%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 43.8M | 🟢 **-43%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 43.6M | 🟢 **-38%** |
| refRemote.json | remote ref | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 39.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 41.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 81.5M | 🔴 **+26%** |
| required.json | required default validation | 1 | ✅ | 87.9M | ✅ | 124.8M | 🔴 **+42%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 125.3M | 🔴 **+39%** |
| required.json | required with escaped characters | 2 | ✅ | 52.1M | ✅ | 24.1M | 🟢 **-54%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ✅ | 36.4M | 🔴 **+31%** |
| type.json | integer type matches integers | 9 | ✅ | 67.0M | ✅ | 63.3M | -6% |
| type.json | number type matches numbers | 9 | ✅ | 68.6M | ✅ | 75.4M | +10% |
| type.json | string type matches strings | 9 | ✅ | 68.8M | ✅ | 73.4M | +7% |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 60.8M | +3% |
| type.json | array type matches arrays | 7 | ✅ | 64.5M | ✅ | 59.7M | -8% |
| type.json | boolean type matches booleans | 10 | ✅ | 66.4M | ✅ | 64.0M | -4% |
| type.json | null type matches only the null object | 10 | ✅ | 65.6M | ✅ | 60.2M | -8% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ✅ | 71.3M | +7% |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 65.4M | -15% |
| type.json | type: array or object | 5 | ✅ | 72.4M | ✅ | 63.7M | -12% |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 82.3M | +6% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ✅ | 7.9M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ✅ | 24.1M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.0M | ✅ | 29.3M | 🔴 **+54%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ✅ | 130.7M | 🔴 **+43%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 47.3M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.8M | ✅ | 41.9M | 🟢 **-42%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 121.7M | 🔴 **+37%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 127.0M | 🔴 **+43%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 63.0M | -1% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 111.3M | 🔴 **+41%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 60.8M | +1% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.6M | ✅ | 111.2M | 🔴 **+41%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 59.4M | -1% |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 347K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 18.7M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.4M | ✅ | 72.3M | 🔴 **+146%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 36.1M | 🔴 **+23%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.9M | ✅ | 36.0M | 🔴 **+29%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 35.8M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.8M | ✅ | 33.7M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 34.0M | 🔴 **+29%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.1M | ✅ | 36.6M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.5M | ✅ | 36.0M | 🔴 **+36%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.3M | ✅ | 38.0M | 🔴 **+50%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.4M | ✅ | 33.4M | +10% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.8M | ✅ | 20.7M | 🔴 **+23%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.2M | ✅ | 16.0M | -1% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 15.9M | +8% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.1M | ✅ | 33.7M | +20% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.8M | ✅ | 27.6M | 🔴 **+39%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.6M | ✅ | 19.0M | -20% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.5M | ✅ | 13.2M | 🟢 **-36%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.0M | ✅ | 15.1M | -16% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 9.0M | +18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ✅ | 11.1M | 🔴 **+27%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ✅ | 15.9M | 🟢 **-25%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.9M | ✅ | 9.3M | 🟢 **-64%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.0M | ✅ | 24.9M | 🔴 **+178%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ✅ | 14.5M | 🟢 **-23%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 20.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.4M | ✅ | 35.5M | -8% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ✅ | 18.1M | 🔴 **+50%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.3M | ✅ | 36.1M | +12% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.3M | ✅ | 937K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.7M | ✅ | 42.9M | +5% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ✅ | 7.6M | 🟢 **-24%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.5M | ✅ | 18.6M | +13% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.8M | 🟢 **-23%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.5M | ✅ | 24.8M | 🟢 **-34%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 59.5M | ✅ | 38.8M | 🟢 **-35%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 58.8M | ✅ | 38.3M | 🟢 **-35%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ✅ | 34.6M | +12% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ✅ | 10.4M | 🟢 **-38%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.1M | ✅ | 24.6M | 🔴 **+63%** |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 14.4M | 🔴 **+97%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.7M | ✅ | 25.3M | 🟢 **-33%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.1M | ✅ | 118.7M | 🟢 **-22%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.5M | ✅ | 50.0M | 🟢 **-35%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ✅ | 134.8M | -18% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 77.0M | ✅ | 69.3M | -10% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.4M | ✅ | 35.8M | 🟢 **-34%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 43.5M | ✅ | 23.7M | 🟢 **-46%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 78.6M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 77.1M | ✅ | 118.6M | 🔴 **+54%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.3M | ✅ | 42.8M | -7% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.8M | ✅ | 22.6M | +4% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.2M | ✅ | 27.6M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.7M | ✅ | 23.6M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 125.0M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.4M | ✅ | 16.4M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 51.6M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.5M | ✅ | 12.5M | 🟢 **-51%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.3M | ✅ | 9.1M | 🟢 **-71%** |
| allOf.json | allOf | 4 | ✅ | 38.7M | ✅ | 40.2M | +4% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 25.5M | -17% |
| allOf.json | allOf simple types | 2 | ✅ | 65.9M | ✅ | 86.2M | 🔴 **+31%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 143.1M | ✅ | 125.3M | -12% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.7M | ✅ | 64.6M | +6% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.5M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 85.1M | ✅ | 125.4M | 🔴 **+47%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.9M | ✅ | 125.4M | -17% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.3M | ✅ | 88.1M | 🔴 **+20%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 88.5M | 🟢 **-25%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.6M | ✅ | 87.3M | +17% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 60.0M | 🟢 **-29%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.2M | ✅ | 35.4M | 🟢 **-52%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.9M | ✅ | 37.2M | 🟢 **-57%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 49.1M | ✅ | 38.4M | 🟢 **-22%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.1M | ✅ | 38.7M | 🟢 **-47%** |
| anyOf.json | anyOf | 4 | ✅ | 82.4M | ✅ | 93.9M | +14% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.2M | ✅ | 27.3M | 🟢 **-22%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.1M | ✅ | 125.1M | 🔴 **+47%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.1M | ✅ | 80.4M | -5% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.2M | ✅ | 63.9M | +1% |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.9M | ✅ | 29.6M | 🟢 **-40%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.9M | ✅ | 131.0M | 🔴 **+64%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 71.1M | -5% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 82.8M | ✅ | 132.2M | 🔴 **+60%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 61.3M | ✅ | 61.9M | +1% |
| const.json | const validation | 3 | ✅ | 63.1M | ✅ | 70.3M | +11% |
| const.json | const with object | 4 | ✅ | 40.1M | ✅ | 32.5M | -19% |
| const.json | const with array | 3 | ✅ | 56.1M | ✅ | 8.4M | 🟢 **-85%** |
| const.json | const with null | 2 | ✅ | 74.6M | ✅ | 87.6M | +17% |
| const.json | const with false does not match 0 | 3 | ✅ | 64.9M | ✅ | 75.7M | +17% |
| const.json | const with true does not match 1 | 3 | ✅ | 71.5M | ✅ | 76.9M | +8% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.3M | ✅ | 68.4M | +8% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 62.0M | ✅ | 68.4M | +10% |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 57.3M | ✅ | 33.6M | 🟢 **-41%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 62.8M | ✅ | 33.6M | 🟢 **-46%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.4M | ✅ | 66.2M | +10% |
| const.json | const with 1 does not match true | 3 | ✅ | 35.1M | ✅ | 91.6M | 🔴 **+161%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 57.2M | ✅ | 74.0M | 🔴 **+29%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 68.9M | ✅ | 80.5M | +17% |
| const.json | nul characters in strings | 2 | ✅ | 31.2M | ✅ | 72.5M | 🔴 **+132%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 67.2M | +19% |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.3M | ✅ | 76.4M | 🔴 **+21%** |
| contains.json | contains keyword validation | 6 | ✅ | 61.7M | ✅ | 19.4M | 🟢 **-69%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.0M | ✅ | 14.7M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 68.5M | ✅ | 73.3M | +7% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 69.2M | ✅ | 41.4M | 🟢 **-40%** |
| contains.json | items + contains | 4 | ✅ | 40.3M | ✅ | 18.1M | 🟢 **-55%** |
| contains.json | contains with false if subschema | 2 | ✅ | 65.9M | ✅ | 73.4M | +11% |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 38.2M | 🟢 **-48%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 90.1M | ✅ | 138.1M | 🔴 **+53%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 89.6M | ✅ | 137.0M | 🔴 **+53%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 87.7M | ✅ | 139.7M | 🔴 **+59%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 73.0M | ✅ | 138.2M | 🔴 **+89%** |
| default.json | invalid type for default | 2 | ✅ | 68.0M | ✅ | 70.5M | +4% |
| default.json | invalid string value for default | 2 | ✅ | 53.2M | ✅ | 47.8M | -10% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 26.2M | ✅ | 57.2M | 🔴 **+118%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 61.5M | ✅ | 72.5M | +18% |
| dependentRequired.json | empty dependents | 3 | ✅ | 90.0M | ✅ | 137.0M | 🔴 **+52%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.4M | ✅ | 31.6M | +11% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 44.7M | ✅ | 39.7M | -11% |
| dependentSchemas.json | single dependency | 8 | ✅ | 53.5M | ✅ | 48.4M | -9% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.8M | ✅ | 54.8M | +0% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.7M | ✅ | 35.5M | -11% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.1M | ✅ | 26.5M | 🟢 **-28%** |
| enum.json | simple enum validation | 2 | ✅ | 70.9M | ✅ | 86.1M | 🔴 **+21%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.3M | ✅ | 38.9M | -16% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 70.9M | ✅ | 89.4M | 🔴 **+26%** |
| enum.json | enums in properties | 6 | ✅ | 14.3M | ✅ | 41.2M | 🔴 **+188%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 95.7M | 🔴 **+35%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 69.1M | ✅ | 74.6M | +8% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.8M | ✅ | 67.7M | +9% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 71.9M | ✅ | 76.9M | +7% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ✅ | 70.0M | 🔴 **+29%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 68.6M | ✅ | 87.7M | 🔴 **+28%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 57.2M | ✅ | 82.3M | 🔴 **+44%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.3M | ✅ | 90.5M | 🔴 **+35%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 55.9M | ✅ | 79.9M | 🔴 **+43%** |
| enum.json | nul characters in strings | 2 | ✅ | 57.0M | ✅ | 74.5M | 🔴 **+31%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.3M | ✅ | 79.4M | 🔴 **+32%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 61.4M | ✅ | 80.0M | 🔴 **+30%** |
| format.json | email format | 6 | ✅ | 89.0M | ✅ | 133.0M | 🔴 **+49%** |
| format.json | idn-email format | 6 | ✅ | 79.1M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 76.6M | ✅ | 131.5M | 🔴 **+72%** |
| format.json | ipv4 format | 6 | ✅ | 80.7M | ✅ | 111.6M | 🔴 **+38%** |
| format.json | ipv6 format | 6 | ✅ | 80.7M | ✅ | 115.1M | 🔴 **+43%** |
| format.json | idn-hostname format | 6 | ✅ | 73.3M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 77.7M | ✅ | 133.4M | 🔴 **+72%** |
| format.json | date format | 6 | ✅ | 77.5M | ✅ | 124.3M | 🔴 **+60%** |
| format.json | date-time format | 6 | ✅ | 73.6M | ✅ | 128.6M | 🔴 **+75%** |
| format.json | time format | 6 | ✅ | 76.4M | ✅ | 133.2M | 🔴 **+74%** |
| format.json | json-pointer format | 6 | ✅ | 80.6M | ✅ | 133.0M | 🔴 **+65%** |
| format.json | relative-json-pointer format | 6 | ✅ | 73.3M | ✅ | 118.9M | 🔴 **+62%** |
| format.json | iri format | 6 | ✅ | 79.9M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 73.7M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 80.9M | ✅ | 133.2M | 🔴 **+64%** |
| format.json | uri-reference format | 6 | ✅ | 77.1M | ✅ | 133.0M | 🔴 **+73%** |
| format.json | uri-template format | 6 | ✅ | 80.5M | ✅ | 132.2M | 🔴 **+64%** |
| format.json | uuid format | 6 | ✅ | 79.7M | ✅ | 122.3M | 🔴 **+53%** |
| format.json | duration format | 6 | ✅ | 75.8M | ✅ | 118.2M | 🔴 **+56%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.9M | ✅ | 135.4M | 🔴 **+69%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.9M | ✅ | 134.6M | 🔴 **+69%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 88.5M | ✅ | 129.5M | 🔴 **+46%** |
| if-then-else.json | if and then without else | 3 | ✅ | 73.1M | ✅ | 94.2M | 🔴 **+29%** |
| if-then-else.json | if and else without then | 3 | ✅ | 73.0M | ✅ | 95.0M | 🔴 **+30%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.7M | ✅ | 80.8M | +18% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.7M | ✅ | 128.0M | 🔴 **+61%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.4M | ✅ | 85.8M | +19% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.9M | ✅ | 80.7M | +12% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ✅ | 36.6M | -6% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.6M | ✅ | 24.8M | 🟢 **-43%** |
| items.json | a schema given for items | 4 | ✅ | 50.9M | ✅ | 43.8M | -14% |
| items.json | an array of schemas for items | 6 | ✅ | 65.3M | ✅ | 59.1M | -10% |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.6M | ✅ | 135.1M | 🔴 **+52%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.6M | ✅ | 65.6M | -4% |
| items.json | items with boolean schemas | 3 | ✅ | 62.9M | ✅ | 77.8M | 🔴 **+24%** |
| items.json | items and subitems | 6 | ✅ | 12.8M | ✅ | 8.3M | 🟢 **-35%** |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 6.8M | 🟢 **-44%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 66.1M | -8% |
| items.json | array-form items with null instance e... | 1 | ✅ | 69.4M | ✅ | 69.3M | 0% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.6M | ✅ | 135.5M | 🔴 **+53%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 72.4M | ✅ | 24.7M | 🟢 **-66%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.4M | ✅ | 24.6M | 🟢 **-61%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 56.9M | ✅ | 20.0M | 🟢 **-65%** |
| maxItems.json | maxItems validation | 4 | ✅ | 74.9M | ✅ | 99.7M | 🔴 **+33%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.4M | ✅ | 83.7M | 🔴 **+21%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.1M | ✅ | 46.8M | -18% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.9M | ✅ | 50.3M | -9% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.3M | ✅ | 63.5M | +13% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 43.6M | ✅ | 48.2M | +11% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ✅ | 49.8M | +1% |
| maximum.json | maximum validation | 4 | ✅ | 73.2M | ✅ | 99.2M | 🔴 **+35%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.2M | ✅ | 102.5M | 🔴 **+42%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.3M | ✅ | 134.6M | 🔴 **+53%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 63.2M | ✅ | 29.8M | 🟢 **-53%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.4M | ✅ | 23.6M | 🟢 **-60%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.5M | ✅ | 24.9M | 🟢 **-61%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 54.0M | ✅ | 24.8M | 🟢 **-54%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 54.6M | ✅ | 23.3M | 🟢 **-57%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 88.6M | ✅ | 53.1M | 🟢 **-40%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 68.7M | ✅ | 31.6M | 🟢 **-54%** |
| minItems.json | minItems validation | 4 | ✅ | 75.0M | ✅ | 95.6M | 🔴 **+27%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.2M | ✅ | 83.6M | 🔴 **+21%** |
| minLength.json | minLength validation | 5 | ✅ | 56.0M | ✅ | 37.0M | 🟢 **-34%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.7M | ✅ | 43.1M | 🟢 **-21%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.7M | ✅ | 69.4M | 🔴 **+20%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.3M | ✅ | 49.5M | +0% |
| minimum.json | minimum validation | 4 | ✅ | 73.2M | ✅ | 99.0M | 🔴 **+35%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 90.5M | 🔴 **+31%** |
| multipleOf.json | by int | 3 | ✅ | 73.9M | ✅ | 96.0M | 🔴 **+30%** |
| multipleOf.json | by number | 3 | ✅ | 70.1M | ✅ | 59.8M | -15% |
| multipleOf.json | by small number | 2 | ✅ | 64.0M | ✅ | 27.1M | 🟢 **-58%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.7M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 17.6M | 🟢 **-76%** |
| not.json | not | 2 | ✅ | 73.3M | ✅ | 85.5M | +17% |
| not.json | not multiple types | 3 | ✅ | 67.9M | ✅ | 74.4M | +10% |
| not.json | not more complex schema | 3 | ✅ | 65.9M | ✅ | 47.8M | 🟢 **-27%** |
| not.json | forbidden property | 2 | ✅ | 51.0M | ✅ | 59.7M | +17% |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.7M | ✅ | 62.5M | +1% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.9M | ✅ | 62.9M | +3% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.0M | ✅ | 138.6M | 🔴 **+73%** |
| not.json | double negation | 1 | ✅ | 85.1M | ✅ | 125.3M | 🔴 **+47%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.5M | ✅ | 14.5M | 🟢 **-54%** |
| oneOf.json | oneOf | 4 | ✅ | 64.4M | ✅ | 74.1M | +15% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.0M | ✅ | 26.6M | -19% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 62.4M | ✅ | 63.0M | +1% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.1M | ✅ | 121.5M | 🔴 **+43%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.2M | ✅ | 63.1M | 0% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.2M | ✅ | 63.4M | +0% |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.4M | ✅ | 28.5M | 🟢 **-34%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.4M | ✅ | 81.8M | +13% |
| oneOf.json | oneOf with required | 4 | ✅ | 46.5M | ✅ | 26.4M | 🟢 **-43%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.9M | ✅ | 32.9M | 🟢 **-31%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.5M | ✅ | 85.3M | +18% |
| pattern.json | pattern validation | 8 | ✅ | 53.8M | ✅ | 68.0M | 🔴 **+26%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.4M | ✅ | 56.3M | 🔴 **+292%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ✅ | 17.4M | 🟢 **-34%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.6M | ✅ | 14.9M | +2% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.7M | ✅ | 13.0M | -11% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.1M | ✅ | 17.2M | -19% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 22.7M | 🔴 **+27%** |
| properties.json | object properties validation | 6 | ✅ | 54.3M | ✅ | 52.6M | -3% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ✅ | 11.4M | 🟢 **-41%** |
| properties.json | properties with boolean schema | 4 | ✅ | 47.9M | ✅ | 53.5M | +12% |
| properties.json | properties with escaped characters | 2 | ✅ | 47.9M | ✅ | 24.1M | 🟢 **-50%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 58.1M | -13% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ✅ | 28.0M | +1% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.8M | ✅ | 40.0M | +0% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.5M | ✅ | 16.0M | -14% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.4M | ✅ | 130.2M | 🔴 **+47%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.7M | ✅ | 25.0M | 🟢 **-50%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.5M | ✅ | 30.1M | 🟢 **-24%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.0M | ✅ | 33.2M | 🟢 **-21%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.6M | ✅ | 12.4M | -9% |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.8M | ✅ | 10.9M | 🔴 **+87%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 10.5M | 🔴 **+243%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.2M | ✅ | 10.9M | -10% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.0M | ✅ | 10.8M | -10% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.1M | ✅ | 14.6M | 🔴 **+60%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ✅ | 14.6M | 🔴 **+79%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.3M | ✅ | 4.3M | -1% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ✅ | 4.4M | +6% |
| ref.json | root pointer ref | 4 | ✅ | 23.9M | ✅ | 13.8M | 🟢 **-42%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 53.2M | ✅ | 28.9M | 🟢 **-46%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 55.6M | ✅ | 24.7M | 🟢 **-56%** |
| ref.json | escaped pointer ref | 6 | ✅ | 45.9M | ✅ | 29.0M | 🟢 **-37%** |
| ref.json | nested refs | 2 | ✅ | 37.7M | ✅ | 11.5M | 🟢 **-69%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 42.7M | ✅ | 29.8M | 🟢 **-30%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.2M | ✅ | 48.1M | -4% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.8M | ✅ | 28.8M | 🟢 **-43%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.2M | ✅ | 120.0M | 🔴 **+41%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.2M | ✅ | 30.8M | 🟢 **-51%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ✅ | 2.7M | 🟢 **-69%** |
| ref.json | refs with quote | 2 | ✅ | 52.4M | ✅ | 28.7M | 🟢 **-45%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.3M | ✅ | 9.9M | 🟢 **-62%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 54.9M | ✅ | 38.1M | 🟢 **-31%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ✅ | 10.0M | 🟢 **-70%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.2M | ✅ | 10.2M | 🟢 **-69%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.7M | ✅ | 43.6M | -11% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 47.8M | ✅ | 41.2M | -14% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.3M | ✅ | 39.9M | 🟢 **-43%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.4M | ✅ | 23.9M | 🟢 **-38%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 42.2M | ✅ | 24.6M | 🟢 **-42%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.5M | ✅ | 30.3M | 🟢 **-42%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.6M | ✅ | 28.8M | 🟢 **-43%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.5M | ✅ | 27.7M | 🟢 **-42%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.5M | ✅ | 27.8M | 🟢 **-42%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.7M | ✅ | 27.8M | 🟢 **-43%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.7M | ✅ | 27.7M | 🟢 **-41%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 47.8M | ✅ | 22.7M | 🟢 **-53%** |
| ref.json | ref to if | 2 | ✅ | 47.8M | ✅ | 36.1M | 🟢 **-25%** |
| ref.json | ref to then | 2 | ✅ | 49.2M | ✅ | 38.9M | 🟢 **-21%** |
| ref.json | ref to else | 2 | ✅ | 46.8M | ✅ | 39.0M | -17% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.9M | ✅ | 35.2M | 🟢 **-25%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.2M | ✅ | 31.3M | 🟢 **-57%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 72.9M | ✅ | 36.0M | 🟢 **-51%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.4M | ✅ | 43.1M | 🟢 **-36%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ✅ | 18.4M | 🔴 **+283%** |
| refRemote.json | remote ref | 2 | ✅ | 48.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 43.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 26.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 47.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 47.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.3M | ✅ | 81.1M | 🔴 **+30%** |
| required.json | required default validation | 1 | ✅ | 85.1M | ✅ | 121.5M | 🔴 **+43%** |
| required.json | required with empty array | 1 | ✅ | 85.1M | ✅ | 121.6M | 🔴 **+43%** |
| required.json | required with escaped characters | 2 | ✅ | 49.8M | ✅ | 23.5M | 🟢 **-53%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.5M | ✅ | 35.3M | 🔴 **+29%** |
| type.json | integer type matches integers | 9 | ✅ | 63.6M | ✅ | 64.0M | +1% |
| type.json | number type matches numbers | 9 | ✅ | 66.2M | ✅ | 68.1M | +3% |
| type.json | string type matches strings | 9 | ✅ | 65.3M | ✅ | 67.6M | +4% |
| type.json | object type matches objects | 7 | ✅ | 56.4M | ✅ | 56.3M | 0% |
| type.json | array type matches arrays | 7 | ✅ | 60.7M | ✅ | 59.7M | -2% |
| type.json | boolean type matches booleans | 10 | ✅ | 62.8M | ✅ | 53.3M | -15% |
| type.json | null type matches only the null object | 10 | ✅ | 62.6M | ✅ | 60.4M | -4% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.1M | ✅ | 65.6M | +4% |
| type.json | type as array with one item | 2 | ✅ | 73.0M | ✅ | 84.8M | +16% |
| type.json | type: array or object | 5 | ✅ | 68.3M | ✅ | 66.3M | -3% |
| type.json | type: array, object or null | 5 | ✅ | 73.5M | ✅ | 79.1M | +8% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.9M | ✅ | 131.1M | 🔴 **+66%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 58.3M | ✅ | 79.0M | 🔴 **+36%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 46.9M | ✅ | 53.7M | +14% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.0M | ✅ | 45.2M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 48.3M | ✅ | 51.2M | +6% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 75.2M | ✅ | 67.9M | -10% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 43.2M | ✅ | 27.3M | 🟢 **-37%** |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 34.4M | ✅ | 27.5M | -20% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.4M | ✅ | 36.9M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.1M | ✅ | 12.9M | 🟢 **-44%** |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 77.9M | ✅ | 70.6M | -9% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.6M | ✅ | 70.3M | 🔴 **+241%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ✅ | 15.7M | 🔴 **+29%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.5M | ✅ | 23.8M | 🔴 **+54%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.3M | ✅ | 26.8M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ✅ | 14.4M | 🔴 **+30%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 57.7M | ✅ | 79.1M | 🔴 **+37%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 45.7M | ✅ | 34.7M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 48.4M | ✅ | 34.9M | 🟢 **-28%** |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 45.2M | ✅ | 57.6M | 🔴 **+28%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.4M | ✅ | 27.8M | +19% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 71.2M | ✅ | 130.4M | 🔴 **+83%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 72.0M | ✅ | 66.4M | -8% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.5M | ✅ | 21.6M | +0% |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.8M | ✅ | 32.3M | 🟢 **-23%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 55.9M | ✅ | 98.7M | 🔴 **+77%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.6M | ✅ | 24.7M | 🟢 **-24%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 34.4M | ✅ | 24.3M | 🟢 **-29%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 34.7M | ✅ | 20.0M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 10.7M | ✅ | 15.7M | 🔴 **+46%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 66.7M | ✅ | 58.0M | -13% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.4M | ✅ | 17.0M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.7M | ✅ | 12.6M | 🔴 **+30%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.7M | ✅ | 58.0M | -13% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 31.1M | ✅ | 58.0M | 🔴 **+87%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.0M | ✅ | 5.7M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.6M | ✅ | 9.1M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 22.7M | ✅ | 11.9M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.4M | ✅ | 9.5M | 🟢 **-45%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.7M | ✅ | 7.8M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.4M | ✅ | 6.6M | 🟢 **-64%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.3M | ✅ | 12.9M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.4M | ✅ | 22.2M | 🟢 **-31%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.3M | ✅ | 15.0M | 🟢 **-50%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 30.3M | ✅ | 15.7M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.7M | ✅ | 16.8M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.8M | ✅ | 15.8M | 🟢 **-47%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.7M | ✅ | 58.0M | 🔴 **+83%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.2M | ✅ | 58.0M | 🔴 **+92%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.9M | ✅ | 13.2M | 🟢 **-49%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.5M | ✅ | 19.4M | 🟢 **-29%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.0M | ✅ | 14.6M | 🟢 **-31%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ✅ | 18.0M | 🔴 **+52%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.5M | ✅ | 15.4M | 🟢 **-44%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 30.6M | ✅ | 21.3M | 🟢 **-30%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 46.0M | ✅ | 21.3M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ✅ | 10.2M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.7M | ✅ | 9.5M | 🟢 **-52%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ✅ | 2.7M | 🟢 **-63%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 72.9M | ✅ | 118.5M | 🔴 **+63%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.7M | ✅ | 50.8M | +2% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.2M | ✅ | 21.5M | -15% |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.7M | ✅ | 3.5M | 🟢 **-72%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ✅ | 12.9M | 🟢 **-41%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.1M | ✅ | 11.2M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 8.1M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.8M | ✅ | 23.9M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 14.1M | ✅ | 29.4M | 🔴 **+109%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 86.1M | ✅ | 126.3M | 🔴 **+47%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.7M | ✅ | 46.2M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.9M | ✅ | 42.6M | 🟢 **-33%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 51.0M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.0M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 61.5M | ✅ | 24.2M | 🟢 **-61%** |
| optional/bignum.json | integer | 2 | ✅ | 83.7M | ✅ | 112.0M | 🔴 **+34%** |
| optional/bignum.json | number | 2 | ✅ | 84.1M | ✅ | 121.9M | 🔴 **+45%** |
| optional/bignum.json | string | 1 | ✅ | 60.9M | ✅ | 60.8M | 0% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 106.9M | 🔴 **+42%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ✅ | 59.9M | +4% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 107.7M | 🔴 **+43%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ✅ | 59.9M | +4% |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.8M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.4M | ✅ | 70.1M | +14% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.3M | ✅ | 133.1M | 🔴 **+47%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.7M | ✅ | 30.8M | -9% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.5M | ✅ | 39.6M | -17% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 52.8M | ✅ | 46.8M | -11% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 59.0M | ✅ | 53.7M | -9% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.8M | ✅ | 35.3M | -13% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.0M | ✅ | 66.7M | 🔴 **+147%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.9M | ✅ | 32.8M | +13% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.7M | ✅ | 34.8M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.1M | ✅ | 32.1M | 🔴 **+23%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.9M | ✅ | 31.8M | +14% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 32.5M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.9M | ✅ | 35.3M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.7M | ✅ | 35.0M | 🔴 **+27%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.7M | ✅ | 36.3M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.8M | ✅ | 28.9M | -3% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 13.5M | ✅ | 19.1M | 🔴 **+42%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.3M | ✅ | 16.1M | +5% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 15.6M | +5% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.7M | ✅ | 26.0M | -6% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.5M | ✅ | 26.8M | 🔴 **+25%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 19.0M | -18% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 12.8M | 🟢 **-37%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.7M | ✅ | 14.3M | 🟢 **-27%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 8.6M | +7% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 10.3M | +18% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.0M | ✅ | 16.0M | 🟢 **-24%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ✅ | 9.5M | 🟢 **-61%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.4M | ✅ | 23.6M | 🔴 **+180%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.9M | ✅ | 14.1M | 🟢 **-65%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.8M | ✅ | 14.0M | 🟢 **-26%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.0M | ✅ | 34.9M | -19% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ✅ | 17.2M | 🔴 **+43%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.2M | ✅ | 34.5M | +7% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 69.5M | ✅ | 939K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.3M | ✅ | 41.9M | +4% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.4M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ✅ | 8.0M | -18% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ✅ | 17.9M | +11% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.7M | 🟢 **-25%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.5M | ✅ | 15.4M | -1% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.7M | ✅ | 22.4M | 🟢 **-37%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 62.8M | ✅ | 55.5M | -12% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 22.5M | ✅ | 33.6M | 🔴 **+49%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.0M | ✅ | 10.6M | 🟢 **-33%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 52.7M | ✅ | 28.7M | 🟢 **-46%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 52.9M | ✅ | 28.7M | 🟢 **-46%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 53.3M | ✅ | 27.2M | 🟢 **-49%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 72.4M | ✅ | 37.6M | 🟢 **-48%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.7M | ✅ | 27.0M | 🟢 **-49%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.9M | ✅ | 24.4M | 🔴 **+64%** |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 56.9M | ✅ | 21.1M | 🟢 **-63%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.3M | ✅ | 21.9M | +3% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 27.6M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.7M | ✅ | 25.2M | 🟢 **-23%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.6M | ✅ | 124.8M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.2M | ✅ | 16.1M | 🟢 **-43%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 51.6M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.4M | ✅ | 13.5M | 🟢 **-47%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.2M | ✅ | 9.2M | 🟢 **-70%** |
| allOf.json | allOf | 4 | ✅ | 39.2M | ✅ | 40.0M | +2% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 25.4M | -18% |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ✅ | 85.4M | 🔴 **+23%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 142.0M | ✅ | 118.2M | -17% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 63.0M | ✅ | 61.8M | -2% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.4M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 77.1M | ✅ | 124.8M | 🔴 **+62%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 125.0M | -18% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 72.1M | ✅ | 87.8M | 🔴 **+22%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 87.6M | 🟢 **-26%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 87.0M | +16% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 59.4M | 🟢 **-30%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.2M | ✅ | 36.0M | 🟢 **-51%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.3M | ✅ | 36.6M | 🟢 **-58%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 48.3M | ✅ | 38.7M | -20% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.2M | ✅ | 38.7M | 🟢 **-47%** |
| anyOf.json | anyOf | 4 | ✅ | 76.0M | ✅ | 92.8M | 🔴 **+22%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.2M | ✅ | 27.4M | 🟢 **-30%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.2M | ✅ | 125.5M | 🔴 **+47%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.2M | ✅ | 125.4M | 🔴 **+47%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 64.5M | +2% |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.9M | ✅ | 30.9M | 🟢 **-37%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.9M | ✅ | 126.4M | 🔴 **+58%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 86.8M | +16% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 76.3M | ✅ | 134.9M | 🔴 **+77%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.9M | ✅ | 62.8M | +3% |
| const.json | const validation | 3 | ✅ | 64.0M | ✅ | 69.8M | +9% |
| const.json | const with object | 4 | ✅ | 38.5M | ✅ | 32.5M | -16% |
| const.json | const with array | 3 | ✅ | 56.2M | ✅ | 9.1M | 🟢 **-84%** |
| const.json | const with null | 2 | ✅ | 74.7M | ✅ | 86.9M | +16% |
| const.json | const with false does not match 0 | 3 | ✅ | 72.0M | ✅ | 74.6M | +4% |
| const.json | const with true does not match 1 | 3 | ✅ | 72.2M | ✅ | 75.7M | +5% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.1M | ✅ | 68.9M | +9% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.4M | ✅ | 68.6M | 🔴 **+26%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 62.7M | ✅ | 31.7M | 🟢 **-49%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 62.6M | ✅ | 33.5M | 🟢 **-47%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.7M | ✅ | 64.7M | +7% |
| const.json | const with 1 does not match true | 3 | ✅ | 70.2M | ✅ | 89.1M | 🔴 **+27%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 33.5M | ✅ | 68.9M | 🔴 **+106%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.6M | ✅ | 80.9M | 🔴 **+27%** |
| const.json | nul characters in strings | 2 | ✅ | 58.6M | ✅ | 74.5M | 🔴 **+27%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 66.9M | +19% |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.4M | ✅ | 74.5M | +17% |
| contains.json | contains keyword validation | 6 | ✅ | 61.7M | ✅ | 20.1M | 🟢 **-68%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.1M | ✅ | 14.8M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 67.5M | ✅ | 73.2M | +8% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.8M | ✅ | 41.9M | 🟢 **-37%** |
| contains.json | items + contains | 4 | ✅ | 21.1M | ✅ | 17.6M | -16% |
| contains.json | contains with false if subschema | 2 | ✅ | 66.1M | ✅ | 72.7M | +10% |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 38.2M | 🟢 **-48%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 75.0M | ✅ | 138.0M | 🔴 **+84%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 90.3M | ✅ | 123.5M | 🔴 **+37%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 79.6M | ✅ | 138.8M | 🔴 **+74%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 76.3M | ✅ | 126.0M | 🔴 **+65%** |
| default.json | invalid type for default | 2 | ✅ | 64.4M | ✅ | 75.0M | +16% |
| default.json | invalid string value for default | 2 | ✅ | 53.1M | ✅ | 44.8M | -16% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 26.3M | ✅ | 26.8M | +2% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 60.9M | ✅ | 68.4M | +12% |
| dependentRequired.json | empty dependents | 3 | ✅ | 80.6M | ✅ | 136.0M | 🔴 **+69%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.9M | ✅ | 31.5M | +13% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 47.5M | ✅ | 19.5M | 🟢 **-59%** |
| dependentSchemas.json | single dependency | 8 | ✅ | 52.9M | ✅ | 48.2M | -9% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 52.7M | ✅ | 55.0M | +4% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 38.6M | ✅ | 35.2M | -9% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.3M | ✅ | 26.9M | 🟢 **-28%** |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 10.4M | ✅ | 4.2M | 🟢 **-60%** |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.5M | ✅ | 20.0M | -3% |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.8M | ✅ | 22.3M | 🔴 **+41%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.0M | ✅ | 2.4M | 🟢 **-79%** |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.2M | ✅ | 5.0M | 🟢 **-62%** |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.6M | ✅ | 2.7M | 🟢 **-75%** |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.9M | ✅ | 6.3M | -20% |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 11.1M | ✅ | 17.4M | 🔴 **+57%** |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.4M | ✅ | 8.5M | 🟢 **-31%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.9M | ✅ | 1.4M | 🟢 **-82%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 8.6M | ✅ | 12.8M | 🔴 **+49%** |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.7M | ✅ | 2.1M | 🟢 **-62%** |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.5M | ✅ | 2.4M | 🟢 **-63%** |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.7M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 26.7M | ✅ | 25.7M | -4% |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ✅ | 2.5M | 🟢 **-69%** |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.9M | ✅ | 83.2M | +16% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.1M | ✅ | 38.7M | -14% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.1M | ✅ | 76.3M | +19% |
| enum.json | enums in properties | 6 | ✅ | 14.8M | ✅ | 40.9M | 🔴 **+175%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.9M | ✅ | 89.9M | 🔴 **+23%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 69.3M | ✅ | 69.9M | +1% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 62.0M | ✅ | 66.7M | +8% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 72.2M | ✅ | 63.1M | -13% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.9M | ✅ | 63.7M | 0% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 71.5M | ✅ | 40.4M | 🟢 **-43%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ✅ | 80.3M | 🔴 **+22%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.9M | ✅ | 75.5M | +13% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.7M | ✅ | 68.7M | +5% |
| enum.json | nul characters in strings | 2 | ✅ | 62.2M | ✅ | 74.0M | +19% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 67.4M | ✅ | 71.7M | +6% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 68.1M | ✅ | 70.9M | +4% |
| format.json | email format | 7 | ✅ | 83.3M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 83.2M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 75.4M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 73.8M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 75.2M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 75.6M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 75.6M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 75.3M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 75.4M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 74.2M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 82.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 75.3M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 75.6M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 75.5M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 75.5M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 73.8M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 75.6M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 75.4M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 75.6M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.8M | ✅ | 135.8M | 🔴 **+70%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.9M | ✅ | 133.6M | 🔴 **+67%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.9M | ✅ | 134.7M | 🔴 **+69%** |
| if-then-else.json | if and then without else | 3 | ✅ | 72.1M | ✅ | 95.2M | 🔴 **+32%** |
| if-then-else.json | if and else without then | 3 | ✅ | 72.8M | ✅ | 94.4M | 🔴 **+30%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.7M | ✅ | 76.8M | +12% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 80.0M | ✅ | 128.1M | 🔴 **+60%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.5M | ✅ | 85.5M | +18% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 72.0M | ✅ | 77.0M | +7% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.1M | ✅ | 37.1M | -10% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.2M | ✅ | 20.4M | 🟢 **-53%** |
| items.json | a schema given for items | 4 | ✅ | 51.6M | ✅ | 43.9M | -15% |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.5M | ✅ | 135.5M | 🔴 **+53%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.8M | ✅ | 74.6M | +8% |
| items.json | items and subitems | 6 | ✅ | 12.7M | ✅ | 8.2M | 🟢 **-35%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 6.6M | 🟢 **-46%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 75.6M | ✅ | 99.9M | 🔴 **+32%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 44.4M | ✅ | 31.7M | 🟢 **-29%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 43.0M | ✅ | 30.1M | 🟢 **-30%** |
| items.json | items with heterogeneous array | 2 | ✅ | 69.7M | ✅ | 78.1M | +12% |
| items.json | items with null instance elements | 1 | ✅ | 72.0M | ✅ | 66.4M | -8% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.6M | ✅ | 135.2M | 🔴 **+53%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.7M | ✅ | 23.5M | 🟢 **-59%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.3M | ✅ | 24.7M | 🟢 **-61%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 57.2M | ✅ | 20.8M | 🟢 **-64%** |
| maxItems.json | maxItems validation | 4 | ✅ | 75.2M | ✅ | 98.5M | 🔴 **+31%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 83.5M | 🔴 **+20%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.2M | ✅ | 43.3M | 🟢 **-24%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.6M | ✅ | 51.2M | -6% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.2M | ✅ | 67.9M | 🔴 **+21%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.6M | ✅ | 47.8M | +0% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.6M | ✅ | 49.7M | +2% |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ✅ | 96.9M | 🔴 **+32%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.1M | ✅ | 100.7M | 🔴 **+48%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.3M | ✅ | 134.4M | 🔴 **+52%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 63.2M | ✅ | 30.0M | 🟢 **-53%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 58.0M | ✅ | 23.3M | 🟢 **-60%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.0M | ✅ | 22.0M | 🟢 **-65%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 58.7M | ✅ | 24.3M | 🟢 **-59%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 53.9M | ✅ | 23.8M | 🟢 **-56%** |
| minContains.json | minContains = 0 | 2 | ✅ | 88.6M | ✅ | 54.3M | 🟢 **-39%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 68.5M | ✅ | 31.7M | 🟢 **-54%** |
| minItems.json | minItems validation | 4 | ✅ | 75.3M | ✅ | 90.2M | +20% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 83.5M | 🔴 **+20%** |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ✅ | 36.5M | 🟢 **-35%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.9M | ✅ | 48.7M | -11% |
| minProperties.json | minProperties validation | 6 | ✅ | 57.8M | ✅ | 69.0M | +19% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.5M | ✅ | 48.5M | 0% |
| minimum.json | minimum validation | 4 | ✅ | 73.3M | ✅ | 99.1M | 🔴 **+35%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 89.3M | 🔴 **+29%** |
| multipleOf.json | by int | 3 | ✅ | 73.3M | ✅ | 95.5M | 🔴 **+30%** |
| multipleOf.json | by number | 3 | ✅ | 70.0M | ✅ | 59.4M | -15% |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 27.1M | 🟢 **-58%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 1.0M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.8M | ✅ | 17.0M | 🟢 **-76%** |
| not.json | not | 2 | ✅ | 73.3M | ✅ | 82.5M | +13% |
| not.json | not multiple types | 3 | ✅ | 67.7M | ✅ | 75.1M | +11% |
| not.json | not more complex schema | 3 | ✅ | 66.1M | ✅ | 48.4M | 🟢 **-27%** |
| not.json | forbidden property | 2 | ✅ | 49.9M | ✅ | 59.6M | +19% |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.0M | ✅ | 62.7M | +3% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.5M | ✅ | 63.1M | +3% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 84.6M | ✅ | 121.7M | 🔴 **+44%** |
| not.json | double negation | 1 | ✅ | 85.1M | ✅ | 123.3M | 🔴 **+45%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.1M | ✅ | 14.9M | 🟢 **-55%** |
| oneOf.json | oneOf | 4 | ✅ | 64.5M | ✅ | 70.9M | +10% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.0M | ✅ | 26.7M | -19% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 63.0M | ✅ | 63.3M | +1% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.2M | ✅ | 121.4M | 🔴 **+43%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.2M | ✅ | 63.2M | 0% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 63.1M | 0% |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.1M | ✅ | 28.0M | 🟢 **-35%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.4M | ✅ | 85.4M | +18% |
| oneOf.json | oneOf with required | 4 | ✅ | 46.7M | ✅ | 25.2M | 🟢 **-46%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.4M | ✅ | 31.6M | 🟢 **-33%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.1M | ✅ | 86.2M | +20% |
| pattern.json | pattern validation | 8 | ✅ | 54.1M | ✅ | 62.8M | +16% |
| pattern.json | pattern is not anchored | 1 | ✅ | 22.7M | ✅ | 60.5M | 🔴 **+166%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.1M | ✅ | 17.9M | 🟢 **-23%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ✅ | 14.9M | -1% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.2M | ✅ | 13.1M | -19% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.6M | ✅ | 18.4M | -11% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 21.7M | 🔴 **+21%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.7M | ✅ | 58.4M | -11% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 62.3M | ✅ | 77.3M | 🔴 **+24%** |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 77.0M | ✅ | 67.9M | -12% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 77.0M | ✅ | 69.3M | -10% |
| properties.json | object properties validation | 6 | ✅ | 53.3M | ✅ | 50.1M | -6% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 12.1M | 🟢 **-39%** |
| properties.json | properties with boolean schema | 4 | ✅ | 47.8M | ✅ | 52.6M | +10% |
| properties.json | properties with escaped characters | 2 | ✅ | 43.7M | ✅ | 24.1M | 🟢 **-45%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 58.1M | -13% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ✅ | 29.0M | +4% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.8M | ✅ | 39.7M | 0% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ✅ | 15.4M | -18% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.5M | ✅ | 130.3M | 🔴 **+47%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.4M | ✅ | 24.6M | 🟢 **-50%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.1M | ✅ | 30.0M | 🟢 **-23%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.9M | ✅ | 33.1M | 🟢 **-21%** |
| ref.json | root pointer ref | 4 | ✅ | 23.9M | ✅ | 14.0M | 🟢 **-41%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 51.9M | ✅ | 28.9M | 🟢 **-44%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.5M | ✅ | 24.4M | 🟢 **-54%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.9M | ✅ | 28.7M | 🟢 **-36%** |
| ref.json | nested refs | 2 | ✅ | 37.8M | ✅ | 11.3M | 🟢 **-70%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.0M | ✅ | 29.3M | 🟢 **-32%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.3M | ✅ | 46.4M | -8% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.5M | ✅ | 28.8M | 🟢 **-45%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.1M | ✅ | 118.5M | 🔴 **+39%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.5M | ✅ | 34.1M | 🟢 **-46%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ✅ | 2.9M | 🟢 **-67%** |
| ref.json | refs with quote | 2 | ✅ | 52.4M | ✅ | 28.2M | 🟢 **-46%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.4M | ✅ | 10.3M | 🟢 **-61%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 54.9M | ✅ | 38.2M | 🟢 **-30%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.4M | ✅ | 10.5M | 🟢 **-69%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.4M | ✅ | 10.5M | 🟢 **-69%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.0M | ✅ | 37.7M | 🟢 **-21%** |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 47.9M | ✅ | 41.4M | -14% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.4M | ✅ | 37.4M | 🟢 **-47%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 37.8M | ✅ | 25.0M | 🟢 **-34%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 41.7M | ✅ | 24.1M | 🟢 **-42%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 51.8M | ✅ | 28.7M | 🟢 **-44%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.6M | ✅ | 29.2M | 🟢 **-42%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 41.9M | ✅ | 27.8M | 🟢 **-34%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.5M | ✅ | 27.6M | 🟢 **-39%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 47.1M | ✅ | 27.2M | 🟢 **-42%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 51.6M | ✅ | 27.8M | 🟢 **-46%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 48.6M | ✅ | 25.0M | 🟢 **-49%** |
| ref.json | ref to if | 2 | ✅ | 49.2M | ✅ | 38.2M | 🟢 **-22%** |
| ref.json | ref to then | 2 | ✅ | 48.5M | ✅ | 39.0M | -20% |
| ref.json | ref to else | 2 | ✅ | 46.9M | ✅ | 37.4M | 🟢 **-20%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 45.0M | ✅ | 35.6M | 🟢 **-21%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 33.8M | 🟢 **-54%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 72.6M | ✅ | 34.8M | 🟢 **-52%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.3M | ✅ | 43.1M | 🟢 **-36%** |
| refRemote.json | remote ref | 2 | ✅ | 45.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 42.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 45.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 45.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 49.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.4M | ✅ | 80.1M | 🔴 **+28%** |
| required.json | required default validation | 1 | ✅ | 85.1M | ✅ | 121.5M | 🔴 **+43%** |
| required.json | required with empty array | 1 | ✅ | 85.2M | ✅ | 121.3M | 🔴 **+42%** |
| required.json | required with escaped characters | 2 | ✅ | 50.1M | ✅ | 23.3M | 🟢 **-53%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.4M | ✅ | 35.3M | 🔴 **+45%** |
| type.json | integer type matches integers | 9 | ✅ | 63.9M | ✅ | 55.7M | -13% |
| type.json | number type matches numbers | 9 | ✅ | 66.2M | ✅ | 36.4M | 🟢 **-45%** |
| type.json | string type matches strings | 9 | ✅ | 65.9M | ✅ | 68.0M | +3% |
| type.json | object type matches objects | 7 | ✅ | 56.2M | ✅ | 55.0M | -2% |
| type.json | array type matches arrays | 7 | ✅ | 61.1M | ✅ | 59.4M | -3% |
| type.json | boolean type matches booleans | 10 | ✅ | 63.1M | ✅ | 63.2M | +0% |
| type.json | null type matches only the null object | 10 | ✅ | 62.8M | ✅ | 60.8M | -3% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 62.9M | ✅ | 65.0M | +3% |
| type.json | type as array with one item | 2 | ✅ | 73.1M | ✅ | 84.5M | +16% |
| type.json | type: array or object | 5 | ✅ | 67.3M | ✅ | 66.4M | -1% |
| type.json | type: array, object or null | 5 | ✅ | 73.1M | ✅ | 74.5M | +2% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.8M | ✅ | 129.7M | 🔴 **+65%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 57.2M | ✅ | 79.3M | 🔴 **+39%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 49.6M | ✅ | 53.7M | +8% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.4M | ✅ | 45.2M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 51.9M | ✅ | 52.0M | +0% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 75.3M | ✅ | 67.8M | -10% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.1M | ✅ | 24.0M | 🟢 **-46%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.9M | ✅ | 37.3M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.0M | ✅ | 11.8M | 🟢 **-49%** |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 77.9M | ✅ | 70.7M | -9% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.9M | ✅ | 70.6M | 🔴 **+238%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ✅ | 11.1M | -9% |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.5M | ✅ | 23.9M | 🔴 **+54%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.1M | ✅ | 26.6M | 🟢 **-34%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ✅ | 11.9M | +7% |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 58.4M | ✅ | 79.5M | 🔴 **+36%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.7M | ✅ | 34.8M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 49.3M | ✅ | 35.0M | 🟢 **-29%** |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 44.5M | ✅ | 57.2M | 🔴 **+29%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.8M | ✅ | 26.3M | +6% |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.5M | ✅ | 12.9M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.7M | ✅ | 3.4M | 🟢 **-61%** |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.0M | ✅ | 5.8M | 🟢 **-41%** |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.2M | ✅ | 14.5M | 🟢 **-24%** |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 83.8M | ✅ | 130.0M | 🔴 **+55%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 71.9M | ✅ | 65.9M | -8% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.6M | ✅ | 15.0M | 🟢 **-31%** |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.4M | ✅ | 32.3M | 🟢 **-22%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 56.1M | ✅ | 129.9M | 🔴 **+131%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.5M | ✅ | 25.2M | 🟢 **-20%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 33.1M | ✅ | 24.9M | 🟢 **-25%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.8M | ✅ | 19.5M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ✅ | 14.7M | 🔴 **+30%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 88.5M | ✅ | 130.7M | 🔴 **+48%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 32.3M | ✅ | 14.8M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.1M | ✅ | 15.7M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.4M | ✅ | 11.7M | 🔴 **+24%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.5M | ✅ | 56.8M | -15% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.0M | ✅ | 56.2M | 🔴 **+101%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.0M | ✅ | 5.2M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 16.3M | ✅ | 8.7M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.3M | ✅ | 11.2M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.3M | ✅ | 6.6M | 🟢 **-64%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.0M | ✅ | 7.4M | 🟢 **-61%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.6M | ✅ | 6.4M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.9M | ✅ | 12.0M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.6M | ✅ | 19.7M | 🟢 **-38%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.0M | ✅ | 14.7M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.1M | ✅ | 14.5M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.4M | ✅ | 14.5M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.3M | ✅ | 16.6M | 🟢 **-43%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.0M | ✅ | 56.9M | 🔴 **+103%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.8M | ✅ | 56.8M | 🔴 **+104%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.5M | ✅ | 14.1M | 🟢 **-45%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.8M | ✅ | 19.5M | 🟢 **-25%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.1M | ✅ | 14.2M | 🟢 **-30%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ✅ | 19.4M | 🔴 **+62%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.6M | ✅ | 14.1M | 🟢 **-45%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.8M | ✅ | 20.9M | 🟢 **-34%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.5M | ✅ | 20.8M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.4M | ✅ | 10.2M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.0M | ✅ | 9.1M | 🟢 **-55%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ✅ | 2.8M | 🟢 **-60%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 78.5M | ✅ | 115.3M | 🔴 **+47%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 50.9M | ✅ | 44.7M | -12% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.0M | ✅ | 21.4M | -18% |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.1M | ✅ | 4.1M | 🟢 **-66%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ✅ | 12.7M | 🟢 **-42%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.0M | ✅ | 11.2M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 7.8M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ✅ | 23.0M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 44.8M | ✅ | 29.5M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.6M | ✅ | 123.5M | 🔴 **+44%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.9M | ✅ | 46.3M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.2M | ✅ | 41.9M | 🟢 **-35%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 51.1M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.5M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 61.2M | ✅ | 23.2M | 🟢 **-62%** |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 110.9M | 🔴 **+32%** |
| optional/bignum.json | number | 2 | ✅ | 84.0M | ✅ | 121.8M | 🔴 **+45%** |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 61.0M | +0% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 107.9M | 🔴 **+43%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ✅ | 59.6M | +3% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 107.9M | 🔴 **+43%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ✅ | 59.6M | +3% |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 80.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.9M | ✅ | 70.0M | +13% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.1M | ✅ | 133.5M | 🔴 **+48%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.6M | ✅ | 30.8M | -8% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.7M | ✅ | 38.0M | 🟢 **-20%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 52.7M | ✅ | 46.8M | -11% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 57.7M | ✅ | 53.6M | -7% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.6M | ✅ | 34.6M | -15% |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ✅ | 2.5M | 🟢 **-69%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.3M | ✅ | 68.5M | 🔴 **+142%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ✅ | 34.4M | 🔴 **+72%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.1M | ✅ | 34.9M | 🔴 **+29%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 34.9M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 13.7M | ✅ | 33.1M | 🔴 **+141%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 12.7M | ✅ | 34.4M | 🔴 **+170%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.4M | ✅ | 33.8M | 🔴 **+28%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.3M | ✅ | 33.1M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.8M | ✅ | 36.8M | 🔴 **+43%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 31.8M | +6% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ✅ | 20.2M | +19% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.7M | ✅ | 15.3M | +4% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.2M | ✅ | 15.7M | +3% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.8M | ✅ | 32.1M | +16% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.4M | ✅ | 26.2M | 🔴 **+22%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 20.4M | -12% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.3M | ✅ | 12.6M | 🟢 **-38%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ✅ | 15.3M | 🟢 **-23%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 8.5M | +9% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ✅ | 10.8M | 🔴 **+32%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ✅ | 16.1M | 🟢 **-25%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ✅ | 9.2M | 🟢 **-65%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.1M | ✅ | 23.5M | 🔴 **+192%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.0M | ✅ | 12.2M | 🟢 **-70%** |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 49.8M | ✅ | 124K | 🟢 **-100%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.9M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.8M | ✅ | 34.6M | -8% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ✅ | 17.1M | 🔴 **+42%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.3M | ✅ | 35.0M | +9% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 71.5M | ✅ | 937K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.1M | ✅ | 42.0M | 🔴 **+31%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.4M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.0M | ✅ | 8.1M | -19% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ✅ | 17.2M | +0% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ✅ | 4.8M | 🟢 **-26%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.4M | ✅ | 14.7M | -4% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 24.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.2M | ✅ | 24.2M | 🟢 **-33%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 61.7M | ✅ | 61.6M | 0% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.3M | ✅ | 33.6M | +11% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.6M | ✅ | 9.7M | 🟢 **-45%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 51.2M | ✅ | 28.6M | 🟢 **-44%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 51.0M | ✅ | 28.6M | 🟢 **-44%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 50.9M | ✅ | 26.8M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 73.1M | ✅ | 37.2M | 🟢 **-49%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.5M | ✅ | 27.2M | 🟢 **-48%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.5M | ✅ | 24.4M | 🔴 **+81%** |
