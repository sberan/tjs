# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | schemasafe pass | schemasafe ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 28.8M | 184/199 | 21.7M | 184 | 🟢 **-25%** |
| draft6 | 276 | ✅ 276 | 29.6M | 259/276 | 23.6M | 259 | 🟢 **-20%** |
| draft7 | 313 | ✅ 313 | 16.3M | 281/313 | 21.0M | 281 | 🔴 **+29%** |
| draft2019-09 | 435 | ✅ 435 | 19.6M | 399/435 | 18.8M | 399 | -4% |
| draft2020-12 | 448 | ✅ 448 | 20.0M | 389/448 | 15.2M | 389 | 🟢 **-24%** |
| **Total** | 1671 | 1670/1671 | 20.7M | 1512/1671 | 19.1M | 1512 | -8% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **1.53x faster** (34 ns vs 52 ns per test, 6344 tests in 1512 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 64.6M | ✅ | 7.6M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 174.6M | ✅ | 123.6M | 🟢 **-29%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 147.6M | ✅ | 84.7M | 🟢 **-43%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 189.7M | ✅ | 134.7M | 🟢 **-29%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 129.1M | ✅ | 69.3M | 🟢 **-46%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 41.2M | ✅ | 35.8M | -13% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.2M | ✅ | 28.8M | 🟢 **-51%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 69.0M | ✅ | 78.6M | +14% |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 174.5M | ✅ | 123.5M | 🟢 **-29%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 51.9M | ✅ | 46.1M | -11% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 47.9M | ✅ | 24.2M | 🟢 **-49%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 37.0M | ✅ | 27.7M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 43.4M | ✅ | 25.2M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 174.6M | ✅ | 125.1M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 37.5M | ✅ | 17.0M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.3M | ✅ | 51.7M | -1% |
| allOf.json | allOf | 4 | ✅ | 45.3M | ✅ | 40.2M | -11% |
| allOf.json | allOf with base schema | 5 | ✅ | 25.5M | ✅ | 25.4M | 0% |
| allOf.json | allOf simple types | 2 | ✅ | 124.4M | ✅ | 85.3M | 🟢 **-31%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 173.5M | ✅ | 119.7M | 🟢 **-31%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 72.8M | ✅ | 124.7M | 🔴 **+71%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.4M | ✅ | 87.5M | 🔴 **+26%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 124.6M | ✅ | 87.8M | 🟢 **-29%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.4M | ✅ | 85.7M | 🔴 **+22%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.9M | ✅ | 58.2M | 🟢 **-33%** |
| anyOf.json | anyOf | 4 | ✅ | 64.2M | ✅ | 93.1M | 🔴 **+45%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 49.4M | ✅ | 26.7M | 🟢 **-46%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 53.2M | ✅ | 22.9M | 🟢 **-57%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 188.3M | ✅ | 130.6M | 🟢 **-31%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 87.2M | 🔴 **+23%** |
| default.json | invalid type for default | 2 | ✅ | 108.2M | ✅ | 73.9M | 🟢 **-32%** |
| default.json | invalid string value for default | 2 | ✅ | 46.2M | ✅ | 47.7M | +3% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 84.6M | ✅ | 57.3M | 🟢 **-32%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 103.0M | ✅ | 72.6M | 🟢 **-30%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 32.2M | ✅ | 31.6M | -2% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 60.3M | ✅ | 35.3M | 🟢 **-41%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.7M | ✅ | 11.7M | 🟢 **-38%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.3M | ✅ | 24.5M | 🟢 **-54%** |
| enum.json | simple enum validation | 2 | ✅ | 68.2M | ✅ | 86.1M | 🔴 **+26%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.8M | ✅ | 38.8M | 🟢 **-37%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.3M | ✅ | 89.0M | 🔴 **+30%** |
| enum.json | enums in properties | 6 | ✅ | 52.5M | ✅ | 36.7M | 🟢 **-30%** |
| enum.json | enum with escaped characters | 3 | ✅ | 56.3M | ✅ | 69.5M | 🔴 **+24%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 44.7M | ✅ | 59.7M | 🔴 **+33%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 24.7M | ✅ | 68.6M | 🔴 **+178%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 113.7M | ✅ | 73.6M | 🟢 **-35%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 57.7M | ✅ | 68.6M | +19% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 128.1M | ✅ | 88.7M | 🟢 **-31%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.1M | ✅ | 80.6M | 🔴 **+22%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 125.6M | ✅ | 89.6M | 🟢 **-29%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.6M | ✅ | 80.6M | 🔴 **+43%** |
| enum.json | nul characters in strings | 2 | ✅ | 92.8M | ✅ | 74.4M | -20% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 54.8M | ✅ | 67.2M | 🔴 **+23%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.9M | ✅ | 75.9M | -17% |
| format.json | email format | 6 | ✅ | 93.3M | ✅ | 131.1M | 🔴 **+41%** |
| format.json | ipv4 format | 6 | ✅ | 162.3M | ✅ | 133.4M | -18% |
| format.json | ipv6 format | 6 | ✅ | 95.1M | ✅ | 122.3M | 🔴 **+29%** |
| format.json | hostname format | 6 | ✅ | 160.8M | ✅ | 132.2M | -18% |
| format.json | date-time format | 6 | ✅ | 38.4M | ✅ | 122.5M | 🔴 **+219%** |
| format.json | uri format | 6 | ✅ | 88.5M | ✅ | 119.2M | 🔴 **+35%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.2M | ✅ | 25.2M | 🟢 **-36%** |
| items.json | a schema given for items | 4 | ✅ | 72.6M | ✅ | 44.0M | 🟢 **-39%** |
| items.json | an array of schemas for items | 6 | ✅ | 68.0M | ✅ | 59.4M | -13% |
| items.json | items and subitems | 6 | ✅ | 35.0M | ✅ | 8.4M | 🟢 **-76%** |
| items.json | nested items | 3 | ✅ | 13.5M | ✅ | 6.8M | 🟢 **-50%** |
| items.json | items with null instance elements | 1 | ✅ | 83.6M | ✅ | 66.4M | 🟢 **-20%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 89.1M | ✅ | 69.3M | 🟢 **-22%** |
| maxItems.json | maxItems validation | 4 | ✅ | 71.6M | ✅ | 99.5M | 🔴 **+39%** |
| maxLength.json | maxLength validation | 5 | ✅ | 63.8M | ✅ | 43.1M | 🟢 **-32%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.1M | ✅ | 68.9M | 🔴 **+32%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 45.8M | ✅ | 48.9M | +7% |
| maximum.json | maximum validation | 4 | ✅ | 81.7M | ✅ | 97.8M | +20% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 74.5M | ✅ | 101.8M | 🔴 **+37%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 75.9M | ✅ | 98.6M | 🔴 **+30%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 64.2M | ✅ | 83.1M | 🔴 **+29%** |
| minItems.json | minItems validation | 4 | ✅ | 79.8M | ✅ | 99.6M | 🔴 **+25%** |
| minLength.json | minLength validation | 5 | ✅ | 58.2M | ✅ | 36.6M | 🟢 **-37%** |
| minProperties.json | minProperties validation | 6 | ✅ | 58.4M | ✅ | 68.8M | +18% |
| minimum.json | minimum validation | 4 | ✅ | 75.2M | ✅ | 98.2M | 🔴 **+31%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 73.7M | ✅ | 97.2M | 🔴 **+32%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 64.0M | ✅ | 82.3M | 🔴 **+29%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 68.5M | ✅ | 90.2M | 🔴 **+32%** |
| multipleOf.json | by int | 3 | ✅ | 71.2M | ✅ | 95.8M | 🔴 **+35%** |
| multipleOf.json | by number | 3 | ✅ | 63.3M | ✅ | 59.6M | -6% |
| multipleOf.json | by small number | 2 | ✅ | 61.4M | ✅ | 27.2M | 🟢 **-56%** |
| multipleOf.json | float division = inf | 1 | ✅ | 45.6M | ✅ | 1.0M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 74.4M | ✅ | 18.6M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 68.4M | ✅ | 86.2M | 🔴 **+26%** |
| not.json | not multiple types | 3 | ✅ | 61.5M | ✅ | 73.2M | +19% |
| not.json | not more complex schema | 3 | ✅ | 65.4M | ✅ | 49.9M | 🟢 **-24%** |
| not.json | forbidden property | 2 | ✅ | 50.3M | ✅ | 59.7M | +19% |
| not.json | forbid everything with empty schema | 9 | ✅ | 45.6M | ✅ | 62.7M | 🔴 **+37%** |
| not.json | double negation | 1 | ✅ | 174.6M | ✅ | 125.4M | 🟢 **-28%** |
| oneOf.json | oneOf | 4 | ✅ | 66.3M | ✅ | 70.4M | +6% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.0M | ✅ | 26.7M | 🟢 **-24%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.4M | ✅ | 28.1M | 🟢 **-35%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 64.3M | ✅ | 86.5M | 🔴 **+34%** |
| oneOf.json | oneOf with required | 4 | ✅ | 43.5M | ✅ | 26.0M | 🟢 **-40%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 48.2M | ✅ | 32.5M | 🟢 **-33%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 68.6M | ✅ | 86.9M | 🔴 **+27%** |
| pattern.json | pattern validation | 8 | ✅ | 54.3M | ✅ | 72.6M | 🔴 **+34%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 54.4M | ✅ | 48.2M | -11% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.5M | ✅ | 16.1M | 🟢 **-42%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ✅ | 14.8M | -3% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.4M | ✅ | 14.1M | 🟢 **-23%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 12.8M | ✅ | 21.9M | 🔴 **+71%** |
| properties.json | object properties validation | 6 | ✅ | 50.2M | ✅ | 53.4M | +7% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.3M | ✅ | 11.9M | 🟢 **-41%** |
| properties.json | properties with escaped characters | 2 | ✅ | 47.5M | ✅ | 23.8M | 🟢 **-50%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 73.8M | ✅ | 60.3M | -18% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.3M | ✅ | 29.6M | +8% |
| ref.json | root pointer ref | 4 | ✅ | 25.2M | ✅ | 14.1M | 🟢 **-44%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 49.9M | ✅ | 29.1M | 🟢 **-42%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.0M | ✅ | 24.2M | 🟢 **-57%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ✅ | 29.4M | 🟢 **-32%** |
| ref.json | nested refs | 2 | ✅ | 38.6M | ✅ | 11.8M | 🟢 **-70%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 53.8M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 67.2M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.1M | ✅ | 45.0M | -6% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 49.3M | ✅ | 28.5M | 🟢 **-42%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.6M | ✅ | 2.7M | 🟢 **-77%** |
| ref.json | refs with quote | 2 | ✅ | 49.6M | ✅ | 29.1M | 🟢 **-41%** |
| ref.json | Location-independent identifier | 2 | ✅ | 70.3M | ✅ | 40.1M | 🟢 **-43%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 54.9M | ✅ | 42.1M | 🟢 **-23%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 52.5M | ✅ | 44.7M | -15% |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 55.4M | ✅ | 42.1M | 🟢 **-24%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 69.7M | ✅ | 39.3M | 🟢 **-44%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 69.0M | ✅ | 40.2M | 🟢 **-42%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 69.5M | ✅ | 42.8M | 🟢 **-38%** |
| refRemote.json | remote ref | 2 | ✅ | 50.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 42.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 42.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 36.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 54.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 68.8M | ✅ | 77.8M | +13% |
| required.json | required default validation | 1 | ✅ | 175.6M | ✅ | 125.1M | 🟢 **-29%** |
| required.json | required with escaped characters | 2 | ✅ | 39.9M | ✅ | 24.0M | 🟢 **-40%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.7M | ✅ | 36.0M | 🔴 **+52%** |
| type.json | integer type matches integers | 8 | ✅ | 53.3M | ✅ | 59.8M | +12% |
| type.json | number type matches numbers | 9 | ✅ | 60.0M | ✅ | 72.9M | 🔴 **+21%** |
| type.json | string type matches strings | 9 | ✅ | 59.7M | ✅ | 72.6M | 🔴 **+22%** |
| type.json | object type matches objects | 7 | ✅ | 49.3M | ✅ | 59.7M | 🔴 **+21%** |
| type.json | array type matches arrays | 7 | ✅ | 54.7M | ✅ | 59.5M | +9% |
| type.json | boolean type matches booleans | 10 | ✅ | 56.3M | ✅ | 63.6M | +13% |
| type.json | null type matches only the null object | 10 | ✅ | 51.9M | ✅ | 59.9M | +15% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 54.6M | ✅ | 70.6M | 🔴 **+29%** |
| type.json | type as array with one item | 2 | ✅ | 69.4M | ✅ | 88.0M | 🔴 **+27%** |
| type.json | type: array or object | 5 | ✅ | 58.1M | ✅ | 66.7M | +15% |
| type.json | type: array, object or null | 5 | ✅ | 70.5M | ✅ | 73.8M | +5% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.3M | ✅ | 7.8M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.4M | ✅ | 24.3M | 🟢 **-25%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 30.1M | 🔴 **+61%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 156.9M | ✅ | 127.7M | -19% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 74.3M | ✅ | 47.3M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 74.4M | ✅ | 43.0M | 🟢 **-42%** |
| optional/bignum.json | integer | 2 | ✅ | 90.3M | ✅ | 113.0M | 🔴 **+25%** |
| optional/bignum.json | number | 2 | ✅ | 94.6M | ✅ | 126.4M | 🔴 **+34%** |
| optional/bignum.json | string | 1 | ✅ | 52.7M | ✅ | 62.6M | +19% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 85.8M | ✅ | 110.7M | 🔴 **+29%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 49.9M | ✅ | 60.2M | 🔴 **+21%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 84.6M | ✅ | 111.2M | 🔴 **+32%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 49.8M | ✅ | 57.1M | +15% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 58.5M | ✅ | 72.8M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.1M | ✅ | 36.1M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.5M | ✅ | 35.9M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.5M | ✅ | 36.0M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.3M | ✅ | 34.1M | 🔴 **+20%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.2M | ✅ | 35.7M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.1M | ✅ | 36.2M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.8M | ✅ | 35.7M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.1M | ✅ | 37.9M | 🔴 **+40%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 33.4M | +11% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ✅ | 19.7M | +18% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.3M | ✅ | 16.3M | +0% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ✅ | 15.6M | +6% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.4M | ✅ | 33.3M | 🔴 **+21%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.7M | ✅ | 27.1M | 🔴 **+31%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.3M | ✅ | 20.0M | -18% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 21.7M | ✅ | 13.5M | 🟢 **-38%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 22.0M | ✅ | 15.5M | 🟢 **-30%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ✅ | 9.0M | +8% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ✅ | 11.0M | 🔴 **+24%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.5M | ✅ | 16.1M | 🔴 **+40%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ✅ | 9.5M | 🟢 **-63%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 16.6M | ✅ | 13.7M | -17% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 40.1M | ✅ | 29.3M | 🟢 **-27%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.7M | ✅ | 18.0M | +2% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.9M | ✅ | 4.7M | 🟢 **-32%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.6M | ✅ | 25.7M | 🟢 **-28%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.6M | ✅ | 34.8M | +17% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.7M | ✅ | 10.6M | 🟢 **-40%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 62.0M | ✅ | 7.6M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 44.6M | ✅ | 15.9M | 🟢 **-64%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.1M | ✅ | 125.2M | 🟢 **-21%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.8M | ✅ | 89.7M | +17% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 170.8M | ✅ | 136.1M | 🟢 **-20%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 69.3M | -17% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 35.9M | 🟢 **-37%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.2M | ✅ | 28.7M | 🟢 **-37%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 78.9M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ✅ | 124.6M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 66.8M | ✅ | 42.9M | 🟢 **-36%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.7M | ✅ | 24.3M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 46.9M | ✅ | 28.0M | 🟢 **-40%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.9M | ✅ | 25.2M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 140.4M | ✅ | 125.4M | -11% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 16.8M | 🟢 **-41%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 51.7M | 🟢 **-22%** |
| allOf.json | allOf | 4 | ✅ | 34.7M | ✅ | 40.1M | +16% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 25.5M | -16% |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 86.1M | 🔴 **+42%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 113.1M | 🟢 **-29%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ✅ | 63.9M | 🔴 **+28%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 65.1M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 125.4M | 🟢 **-21%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 125.0M | 🟢 **-22%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 87.6M | 🔴 **+41%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 85.5M | 🟢 **-26%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 86.5M | 🔴 **+34%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 59.8M | 🟢 **-28%** |
| anyOf.json | anyOf | 4 | ✅ | 66.3M | ✅ | 93.1M | 🔴 **+40%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.1M | ✅ | 26.7M | 🟢 **-47%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 125.3M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.4M | ✅ | 125.3M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 65.2M | 🔴 **+31%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.6M | ✅ | 30.6M | 🟢 **-59%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.8M | ✅ | 135.4M | 🟢 **-21%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 86.2M | 🟢 **-28%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.1M | ✅ | 95.5M | 🟢 **-48%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.7M | ✅ | 38.3M | 🟢 **-57%** |
| const.json | const validation | 3 | ✅ | 55.1M | ✅ | 69.1M | 🔴 **+25%** |
| const.json | const with object | 4 | ✅ | 50.0M | ✅ | 32.2M | 🟢 **-36%** |
| const.json | const with array | 3 | ✅ | 49.4M | ✅ | 8.8M | 🟢 **-82%** |
| const.json | const with null | 2 | ✅ | 117.7M | ✅ | 87.4M | 🟢 **-26%** |
| const.json | const with false does not match 0 | 3 | ✅ | 58.8M | ✅ | 73.1M | 🔴 **+24%** |
| const.json | const with true does not match 1 | 3 | ✅ | 102.2M | ✅ | 75.3M | 🟢 **-26%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.0M | ✅ | 68.6M | 🔴 **+27%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.4M | ✅ | 60.5M | 🟢 **-37%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.7M | ✅ | 33.5M | 🟢 **-35%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.1M | ✅ | 33.0M | 🟢 **-65%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ✅ | 66.1M | 🔴 **+24%** |
| const.json | const with 1 does not match true | 3 | ✅ | 114.4M | ✅ | 86.8M | 🟢 **-24%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.9M | ✅ | 69.1M | 🔴 **+24%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.6M | ✅ | 71.1M | 🟢 **-36%** |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 73.5M | 🔴 **+33%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ✅ | 67.2M | -14% |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 38.8M | 🟢 **-31%** |
| contains.json | contains keyword validation | 6 | ✅ | 103.6M | ✅ | 20.2M | 🟢 **-80%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ✅ | 14.7M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ✅ | 73.3M | 🟢 **-30%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ✅ | 42.0M | 🟢 **-27%** |
| contains.json | items + contains | 4 | ✅ | 60.2M | ✅ | 17.0M | 🟢 **-72%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 37.9M | 🟢 **-53%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 75.5M | 🟢 **-25%** |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ✅ | 45.8M | -13% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.0M | ✅ | 26.9M | 🟢 **-66%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.4M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 98.7M | ✅ | 34.6M | 🟢 **-65%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.4M | ✅ | 138.0M | 🟢 **-21%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.9M | ✅ | 31.7M | -7% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.0M | ✅ | 35.3M | -12% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 85.1M | ✅ | 54.7M | 🟢 **-36%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.7M | ✅ | 16.6M | -11% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 51.9M | ✅ | 26.8M | 🟢 **-48%** |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 86.4M | 🔴 **+36%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.1M | ✅ | 38.6M | 🟢 **-36%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.0M | ✅ | 83.8M | 🔴 **+25%** |
| enum.json | enums in properties | 6 | ✅ | 56.7M | ✅ | 41.2M | 🟢 **-27%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.4M | ✅ | 91.4M | 🔴 **+28%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.6M | ✅ | 63.0M | 🟢 **-43%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.1M | ✅ | 67.8M | 🔴 **+30%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.7M | ✅ | 73.4M | 🟢 **-32%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.0M | ✅ | 68.3M | 🔴 **+26%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 88.8M | 🟢 **-22%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.1M | ✅ | 71.8M | 🔴 **+22%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 110.2M | ✅ | 79.5M | 🟢 **-28%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 60.5M | ✅ | 78.3M | 🔴 **+30%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 64.0M | 🟢 **-28%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.0M | ✅ | 49.2M | -18% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 113.4M | ✅ | 44.8M | 🟢 **-61%** |
| format.json | email format | 6 | ✅ | 81.0M | ✅ | 128.4M | 🔴 **+58%** |
| format.json | ipv4 format | 6 | ✅ | 162.8M | ✅ | 132.4M | -19% |
| format.json | ipv6 format | 6 | ✅ | 88.4M | ✅ | 106.2M | 🔴 **+20%** |
| format.json | hostname format | 6 | ✅ | 163.4M | ✅ | 132.0M | -19% |
| format.json | date-time format | 6 | ✅ | 88.4M | ✅ | 65.9M | 🟢 **-25%** |
| format.json | json-pointer format | 6 | ✅ | 163.6M | ✅ | 131.3M | -20% |
| format.json | uri format | 6 | ✅ | 86.5M | ✅ | 129.2M | 🔴 **+49%** |
| format.json | uri-reference format | 6 | ✅ | 158.1M | ✅ | 124.7M | 🟢 **-21%** |
| format.json | uri-template format | 6 | ✅ | 88.5M | ✅ | 132.9M | 🔴 **+50%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.2M | ✅ | 24.9M | 🟢 **-57%** |
| items.json | a schema given for items | 4 | ✅ | 56.0M | ✅ | 43.9M | 🟢 **-22%** |
| items.json | an array of schemas for items | 6 | ✅ | 105.7M | ✅ | 58.3M | 🟢 **-45%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 172.0M | ✅ | 134.6M | 🟢 **-22%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ✅ | 66.0M | 🟢 **-37%** |
| items.json | items with boolean schemas | 3 | ✅ | 61.3M | ✅ | 79.7M | 🔴 **+30%** |
| items.json | items and subitems | 6 | ✅ | 35.2M | ✅ | 8.2M | 🟢 **-77%** |
| items.json | nested items | 3 | ✅ | 13.0M | ✅ | 6.7M | 🟢 **-48%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 69.1M | ✅ | 66.4M | -4% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 69.3M | -16% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ✅ | 95.5M | 🔴 **+30%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 76.3M | 🔴 **+20%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.1M | ✅ | 45.1M | 🟢 **-24%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.8M | ✅ | 47.8M | -4% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 49.9M | ✅ | 68.5M | 🔴 **+37%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.9M | ✅ | 47.6M | +14% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.6M | ✅ | 45.3M | +6% |
| maximum.json | maximum validation | 4 | ✅ | 68.9M | ✅ | 100.2M | 🔴 **+46%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 62.1M | ✅ | 102.0M | 🔴 **+64%** |
| minItems.json | minItems validation | 4 | ✅ | 72.2M | ✅ | 96.1M | 🔴 **+33%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.4M | ✅ | 83.2M | 🔴 **+31%** |
| minLength.json | minLength validation | 5 | ✅ | 50.8M | ✅ | 34.4M | 🟢 **-32%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 50.0M | -4% |
| minProperties.json | minProperties validation | 6 | ✅ | 55.0M | ✅ | 69.3M | 🔴 **+26%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.4M | ✅ | 49.5M | +17% |
| minimum.json | minimum validation | 4 | ✅ | 69.1M | ✅ | 97.0M | 🔴 **+40%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.7M | ✅ | 90.4M | 🔴 **+40%** |
| multipleOf.json | by int | 3 | ✅ | 69.4M | ✅ | 96.5M | 🔴 **+39%** |
| multipleOf.json | by number | 3 | ✅ | 61.8M | ✅ | 61.1M | -1% |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 27.1M | 🟢 **-53%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 17.2M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 84.6M | 🔴 **+34%** |
| not.json | not multiple types | 3 | ✅ | 55.9M | ✅ | 73.0M | 🔴 **+31%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 50.9M | -12% |
| not.json | forbidden property | 2 | ✅ | 46.3M | ✅ | 59.4M | 🔴 **+28%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 63.1M | 🔴 **+28%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 48.9M | ✅ | 62.9M | 🔴 **+29%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.6M | ✅ | 137.6M | 🟢 **-23%** |
| not.json | double negation | 1 | ✅ | 158.8M | ✅ | 100.4M | 🟢 **-37%** |
| oneOf.json | oneOf | 4 | ✅ | 49.1M | ✅ | 75.2M | 🔴 **+53%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 18.2M | ✅ | 27.2M | 🔴 **+50%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 65.2M | 🔴 **+31%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.2M | ✅ | 125.4M | 🟢 **-21%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 40.9M | ✅ | 65.1M | 🔴 **+59%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 65.2M | 🔴 **+31%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ✅ | 28.3M | 🟢 **-30%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 86.5M | 🔴 **+40%** |
| oneOf.json | oneOf with required | 4 | ✅ | 35.2M | ✅ | 26.8M | 🟢 **-24%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 22.1M | ✅ | 29.3M | 🔴 **+33%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 87.5M | 🔴 **+40%** |
| pattern.json | pattern validation | 8 | ✅ | 52.7M | ✅ | 73.1M | 🔴 **+39%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.2M | ✅ | 61.4M | 🔴 **+27%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.0M | ✅ | 17.3M | 🟢 **-31%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 14.6M | -1% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.8M | ✅ | 12.8M | 🟢 **-24%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ✅ | 18.4M | -6% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 18.2M | +3% |
| properties.json | object properties validation | 6 | ✅ | 49.4M | ✅ | 54.8M | +11% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ✅ | 11.4M | 🟢 **-42%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.5M | ✅ | 58.5M | 🔴 **+37%** |
| properties.json | properties with escaped characters | 2 | ✅ | 42.8M | ✅ | 24.2M | 🟢 **-43%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 60.3M | -7% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ✅ | 29.4M | +12% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.9M | ✅ | 38.4M | -14% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 17.2M | -10% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 169.9M | ✅ | 135.5M | 🟢 **-20%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 39.8M | ✅ | 25.4M | 🟢 **-36%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.6M | ✅ | 30.5M | 🟢 **-23%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.0M | ✅ | 33.3M | 🟢 **-21%** |
| ref.json | root pointer ref | 4 | ✅ | 23.7M | ✅ | 14.0M | 🟢 **-41%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 40.2M | ✅ | 29.2M | 🟢 **-27%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.8M | ✅ | 25.2M | 🟢 **-46%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 29.6M | 🟢 **-27%** |
| ref.json | nested refs | 2 | ✅ | 44.3M | ✅ | 12.1M | 🟢 **-73%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.7M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 56.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 46.2M | -1% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 45.0M | ✅ | 29.2M | 🟢 **-35%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.4M | ✅ | 120.4M | 🟢 **-24%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 32.8M | 🟢 **-34%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ✅ | 2.8M | 🟢 **-69%** |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ✅ | 29.4M | 🟢 **-37%** |
| ref.json | Location-independent identifier | 2 | ✅ | 58.9M | ✅ | 43.9M | 🟢 **-25%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.2M | ✅ | 43.5M | 🟢 **-26%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 56.4M | ✅ | 43.4M | 🟢 **-23%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 43.5M | ✅ | 38.4M | -12% |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.7M | ✅ | 10.4M | 🟢 **-72%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.2M | ✅ | 10.5M | 🟢 **-71%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.0M | ✅ | 25.6M | -17% |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 45.1M | ✅ | 29.0M | 🟢 **-36%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 22.2M | ✅ | 29.1M | 🔴 **+31%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 39.1M | ✅ | 28.9M | 🟢 **-26%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.8M | ✅ | 29.1M | 🟢 **-35%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 43.7M | ✅ | 29.0M | 🟢 **-34%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.8M | ✅ | 29.0M | 🟢 **-34%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.3M | ✅ | 43.4M | 🟢 **-27%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 43.7M | 🟢 **-30%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 43.8M | 🟢 **-30%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 43.5M | 🟢 **-30%** |
| refRemote.json | remote ref | 2 | ✅ | 59.5M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 47.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.1M | ✅ | 82.8M | 🔴 **+42%** |
| required.json | required default validation | 1 | ✅ | 158.3M | ✅ | 125.4M | 🟢 **-21%** |
| required.json | required with empty array | 1 | ✅ | 156.8M | ✅ | 123.2M | 🟢 **-21%** |
| required.json | required with escaped characters | 2 | ✅ | 44.0M | ✅ | 24.1M | 🟢 **-45%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.2M | ✅ | 36.2M | 🔴 **+57%** |
| type.json | integer type matches integers | 9 | ✅ | 52.8M | ✅ | 64.7M | 🔴 **+23%** |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ✅ | 75.0M | 🔴 **+36%** |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 73.5M | 🔴 **+35%** |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ✅ | 60.3M | 🔴 **+31%** |
| type.json | array type matches arrays | 7 | ✅ | 51.0M | ✅ | 58.0M | +14% |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 63.8M | 🔴 **+23%** |
| type.json | null type matches only the null object | 10 | ✅ | 49.0M | ✅ | 60.3M | 🔴 **+23%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.2M | ✅ | 71.2M | 🔴 **+39%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 87.9M | 🔴 **+41%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 63.7M | +14% |
| type.json | type: array, object or null | 5 | ✅ | 62.2M | ✅ | 80.6M | 🔴 **+30%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ✅ | 8.1M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.3M | ✅ | 23.4M | 🟢 **-25%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ✅ | 29.8M | 🔴 **+62%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ✅ | 130.6M | -19% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.2M | ✅ | 47.3M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 67.7M | ✅ | 43.1M | 🟢 **-36%** |
| optional/bignum.json | integer | 2 | ✅ | 80.0M | ✅ | 121.3M | 🔴 **+52%** |
| optional/bignum.json | number | 2 | ✅ | 84.1M | ✅ | 126.4M | 🔴 **+50%** |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 62.9M | 🔴 **+32%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.1M | ✅ | 109.3M | 🔴 **+42%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 60.3M | 🔴 **+32%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 76.6M | ✅ | 110.9M | 🔴 **+45%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 59.8M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.1M | ✅ | 71.2M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.0M | ✅ | 36.0M | 🔴 **+89%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 36.2M | 🔴 **+35%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 36.2M | 🔴 **+42%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 33.9M | 🔴 **+27%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.7M | ✅ | 36.0M | 🔴 **+40%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.1M | ✅ | 36.5M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.8M | ✅ | 33.9M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.8M | ✅ | 38.2M | 🔴 **+54%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.6M | ✅ | 33.8M | 🔴 **+23%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ✅ | 20.5M | 🔴 **+23%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.5M | ✅ | 16.5M | +14% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ✅ | 15.8M | +10% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.6M | ✅ | 33.9M | 🔴 **+38%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.6M | ✅ | 27.6M | 🔴 **+41%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ✅ | 20.5M | -10% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.2M | ✅ | 13.0M | 🟢 **-29%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.6M | ✅ | 13.3M | 🟢 **-36%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.3M | ✅ | 9.0M | +9% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ✅ | 10.4M | +14% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.4M | ✅ | 15.9M | 🟢 **-22%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.4M | ✅ | 9.4M | 🟢 **-62%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.0M | ✅ | 14.8M | -18% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.0M | ✅ | 35.4M | -7% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.4M | ✅ | 18.1M | +10% |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.9M | ✅ | 36.4M | 🔴 **+22%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.0M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ✅ | 8.2M | -15% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.6M | ✅ | 19.2M | +16% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.8M | 🟢 **-22%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.1M | ✅ | 24.0M | 🟢 **-40%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 43.0M | ✅ | 33.8M | 🟢 **-21%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 43.5M | ✅ | 33.2M | 🟢 **-24%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.6M | ✅ | 34.9M | 🔴 **+26%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ✅ | 10.4M | 🟢 **-38%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.1M | ✅ | 25.2M | -11% |

### draft7

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 59.6M | ✅ | 7.6M | 🟢 **-87%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 40.2M | ✅ | 15.3M | 🟢 **-62%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.1M | ✅ | 125.4M | 🟢 **-21%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.4M | ✅ | 91.0M | +19% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 169.5M | ✅ | 134.7M | 🟢 **-21%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 69.3M | -17% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 35.9M | 🟢 **-37%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.8M | ✅ | 24.9M | 🟢 **-36%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.4M | ✅ | 77.0M | 🟢 **-28%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.3M | ✅ | 125.5M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 67.1M | ✅ | 43.0M | 🟢 **-36%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.7M | ✅ | 24.2M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.0M | ✅ | 27.8M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.1M | ✅ | 25.2M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 125.3M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 17.0M | 🟢 **-41%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 51.7M | 🟢 **-23%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 39.8M | +15% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 25.5M | -17% |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 86.1M | 🔴 **+42%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 125.3M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ✅ | 65.1M | 🔴 **+31%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.8M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.3M | ✅ | 123.4M | 🟢 **-22%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ✅ | 125.3M | 🟢 **-21%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 61.7M | ✅ | 86.9M | 🔴 **+41%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 86.8M | 🟢 **-25%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 87.4M | 🔴 **+35%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.4M | ✅ | 59.9M | 🟢 **-28%** |
| anyOf.json | anyOf | 4 | ✅ | 66.1M | ✅ | 88.4M | 🔴 **+34%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 48.3M | ✅ | 27.7M | 🟢 **-43%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.4M | ✅ | 125.4M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 124.0M | 🟢 **-22%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 65.1M | 🔴 **+31%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.7M | ✅ | 30.9M | 🟢 **-59%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 135.6M | 🟢 **-21%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 86.2M | 🟢 **-28%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.4M | ✅ | 138.9M | 🟢 **-23%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.5M | ✅ | 17.7M | 🟢 **-80%** |
| const.json | const validation | 3 | ✅ | 55.1M | ✅ | 69.3M | 🔴 **+26%** |
| const.json | const with object | 4 | ✅ | 50.0M | ✅ | 32.5M | 🟢 **-35%** |
| const.json | const with array | 3 | ✅ | 49.5M | ✅ | 9.2M | 🟢 **-81%** |
| const.json | const with null | 2 | ✅ | 117.8M | ✅ | 86.8M | 🟢 **-26%** |
| const.json | const with false does not match 0 | 3 | ✅ | 60.0M | ✅ | 62.4M | +4% |
| const.json | const with true does not match 1 | 3 | ✅ | 107.8M | ✅ | 76.3M | 🟢 **-29%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.0M | ✅ | 69.6M | 🔴 **+29%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ✅ | 69.3M | 🟢 **-27%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.5M | ✅ | 33.7M | 🟢 **-35%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 88.1M | ✅ | 33.7M | 🟢 **-62%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ✅ | 65.2M | 🔴 **+22%** |
| const.json | const with 1 does not match true | 3 | ✅ | 114.4M | ✅ | 91.5M | 🟢 **-20%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ✅ | 69.1M | 🔴 **+24%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.3M | ✅ | 81.1M | 🟢 **-26%** |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 62.9M | +14% |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ✅ | 67.2M | -14% |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 75.9M | 🔴 **+35%** |
| contains.json | contains keyword validation | 6 | ✅ | 103.8M | ✅ | 20.4M | 🟢 **-80%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.0M | ✅ | 14.6M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ✅ | 73.3M | 🟢 **-30%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.8M | ✅ | 39.6M | 🟢 **-32%** |
| contains.json | items + contains | 4 | ✅ | 64.1M | ✅ | 18.2M | 🟢 **-72%** |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ✅ | 73.2M | 🔴 **+22%** |
| contains.json | contains with null instance elements | 1 | ✅ | 127.0M | ✅ | 38.2M | 🟢 **-70%** |
| default.json | invalid type for default | 2 | ✅ | 62.5M | ✅ | 74.8M | +20% |
| default.json | invalid string value for default | 2 | ✅ | 71.3M | ✅ | 48.2M | 🟢 **-32%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.4M | ✅ | 56.7M | 🔴 **+25%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.4M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 58.5M | ✅ | 66.2M | +13% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.3M | ✅ | 137.9M | 🟢 **-21%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.9M | ✅ | 31.6M | +2% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.3M | ✅ | 35.4M | -12% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 25.9M | ✅ | 55.1M | 🔴 **+112%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.6M | ✅ | 16.8M | -10% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.1M | ✅ | 24.6M | 🟢 **-36%** |
| enum.json | simple enum validation | 2 | ✅ | 60.6M | ✅ | 86.2M | 🔴 **+42%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.6M | ✅ | 38.8M | -9% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.5M | ✅ | 89.1M | 🔴 **+38%** |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ✅ | 41.1M | +8% |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 97.1M | 🔴 **+37%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 56.3M | ✅ | 77.4M | 🔴 **+38%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.2M | ✅ | 67.8M | 🔴 **+30%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 58.0M | ✅ | 74.8M | 🔴 **+29%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 49.0M | ✅ | 66.2M | 🔴 **+35%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 57.0M | ✅ | 89.2M | 🔴 **+56%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 52.0M | ✅ | 80.1M | 🔴 **+54%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.1M | ✅ | 91.5M | 🔴 **+36%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 52.5M | ✅ | 80.2M | 🔴 **+53%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 74.5M | 🔴 **+35%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.5M | ✅ | 79.7M | 🔴 **+34%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 55.1M | ✅ | 78.8M | 🔴 **+43%** |
| format.json | email format | 6 | ✅ | 81.2M | ✅ | 133.3M | 🔴 **+64%** |
| format.json | idn-email format | 6 | ✅ | 81.3M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 81.3M | ✅ | 132.9M | 🔴 **+63%** |
| format.json | ipv4 format | 6 | ✅ | 80.8M | ✅ | 123.8M | 🔴 **+53%** |
| format.json | ipv6 format | 6 | ✅ | 80.4M | ✅ | 115.4M | 🔴 **+44%** |
| format.json | idn-hostname format | 6 | ✅ | 45.4M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 85.3M | ✅ | 109.6M | 🔴 **+28%** |
| format.json | date format | 6 | ✅ | 80.8M | ✅ | 133.3M | 🔴 **+65%** |
| format.json | date-time format | 6 | ✅ | 87.4M | ✅ | 123.1M | 🔴 **+41%** |
| format.json | time format | 6 | ✅ | 81.2M | ✅ | 128.8M | 🔴 **+59%** |
| format.json | json-pointer format | 6 | ✅ | 81.4M | ✅ | 119.5M | 🔴 **+47%** |
| format.json | relative-json-pointer format | 6 | ✅ | 86.3M | ✅ | 125.9M | 🔴 **+46%** |
| format.json | iri format | 6 | ✅ | 45.6M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 85.5M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 81.2M | ✅ | 115.3M | 🔴 **+42%** |
| format.json | uri-reference format | 6 | ✅ | 81.3M | ✅ | 104.5M | 🔴 **+29%** |
| format.json | uri-template format | 6 | ✅ | 80.8M | ✅ | 129.7M | 🔴 **+60%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.2M | ✅ | 134.9M | 🟢 **-21%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 167.9M | ✅ | 135.5M | -19% |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ✅ | 130.0M | 🟢 **-24%** |
| if-then-else.json | if and then without else | 3 | ✅ | 69.6M | ✅ | 94.0M | 🔴 **+35%** |
| if-then-else.json | if and else without then | 3 | ✅ | 63.8M | ✅ | 94.9M | 🔴 **+49%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 56.5M | ✅ | 80.9M | 🔴 **+43%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.4M | ✅ | 127.9M | 🟢 **-25%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.6M | ✅ | 84.8M | 🔴 **+31%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ✅ | 80.4M | 🔴 **+25%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.4M | ✅ | 36.0M | -15% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.7M | ✅ | 24.2M | 🟢 **-37%** |
| items.json | a schema given for items | 4 | ✅ | 60.1M | ✅ | 24.6M | 🟢 **-59%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.5M | ✅ | 58.9M | -10% |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.4M | ✅ | 135.6M | 🟢 **-21%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ✅ | 65.0M | +4% |
| items.json | items with boolean schemas | 3 | ✅ | 61.8M | ✅ | 43.1M | 🟢 **-30%** |
| items.json | items and subitems | 6 | ✅ | 28.6M | ✅ | 8.2M | 🟢 **-71%** |
| items.json | nested items | 3 | ✅ | 13.4M | ✅ | 6.6M | 🟢 **-51%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 66.4M | -14% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 69.3M | -16% |
| maxItems.json | maxItems validation | 4 | ✅ | 70.9M | ✅ | 53.5M | 🟢 **-25%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 83.4M | 🔴 **+31%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.5M | ✅ | 45.3M | 🟢 **-23%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.8M | ✅ | 51.0M | -1% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.5M | ✅ | 67.8M | 🔴 **+27%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.6M | ✅ | 47.1M | +13% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.4M | ✅ | 50.4M | +19% |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ✅ | 100.1M | 🔴 **+45%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.1M | ✅ | 100.2M | 🔴 **+49%** |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ✅ | 97.1M | 🔴 **+32%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.4M | ✅ | 70.3M | +11% |
| minLength.json | minLength validation | 5 | ✅ | 52.2M | ✅ | 36.5M | 🟢 **-30%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 48.4M | -7% |
| minProperties.json | minProperties validation | 6 | ✅ | 54.9M | ✅ | 67.5M | 🔴 **+23%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 40.6M | ✅ | 41.1M | +1% |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ✅ | 97.2M | 🔴 **+41%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.6M | ✅ | 89.4M | 🔴 **+38%** |
| multipleOf.json | by int | 3 | ✅ | 69.4M | ✅ | 90.2M | 🔴 **+30%** |
| multipleOf.json | by number | 3 | ✅ | 64.0M | ✅ | 56.1M | -12% |
| multipleOf.json | by small number | 2 | ✅ | 56.8M | ✅ | 25.3M | 🟢 **-55%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 15.9M | 🟢 **-77%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 78.5M | 🔴 **+25%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 62.9M | +12% |
| not.json | not more complex schema | 3 | ✅ | 59.6M | ✅ | 48.0M | -19% |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 55.8M | 🔴 **+21%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 63.0M | 🔴 **+28%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.2M | ✅ | 60.7M | 🔴 **+24%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 171.5M | ✅ | 137.7M | -20% |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 101.3M | 🟢 **-36%** |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ✅ | 77.0M | 🔴 **+51%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.2M | ✅ | 26.7M | -20% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ✅ | 64.7M | 🔴 **+30%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.5M | ✅ | 125.4M | 🟢 **-21%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 64.7M | 🔴 **+30%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 64.7M | 🔴 **+30%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.2M | ✅ | 29.5M | 🟢 **-27%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 86.4M | 🔴 **+40%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.1M | ✅ | 26.8M | 🟢 **-39%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.4M | ✅ | 33.0M | 🟢 **-24%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 87.3M | 🔴 **+40%** |
| pattern.json | pattern validation | 8 | ✅ | 52.8M | ✅ | 71.2M | 🔴 **+35%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 60.5M | 🔴 **+26%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.0M | ✅ | 17.2M | 🟢 **-34%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ✅ | 14.1M | -7% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.5M | ✅ | 13.1M | 🟢 **-21%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.3M | ✅ | 16.0M | 🟢 **-25%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 11.4M | ✅ | 22.5M | 🔴 **+97%** |
| properties.json | object properties validation | 6 | ✅ | 49.9M | ✅ | 53.9M | +8% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ✅ | 11.3M | 🟢 **-42%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.6M | ✅ | 58.2M | 🔴 **+37%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.8M | ✅ | 24.2M | 🟢 **-46%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 60.3M | -7% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ✅ | 29.6M | +13% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.9M | ✅ | 41.1M | -8% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.8M | ✅ | 15.9M | -20% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 133.8M | 🟢 **-22%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.5M | ✅ | 24.4M | 🟢 **-42%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 42.4M | ✅ | 30.2M | 🟢 **-29%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.0M | ✅ | 30.8M | 🟢 **-27%** |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ✅ | 13.7M | 🟢 **-43%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.5M | ✅ | 29.1M | 🟢 **-37%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.0M | ✅ | 25.1M | 🟢 **-51%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 29.0M | 🟢 **-28%** |
| ref.json | nested refs | 2 | ✅ | 46.3M | ✅ | 12.9M | 🟢 **-72%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 59.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 34.4M | ✅ | 49.4M | 🔴 **+43%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.5M | ✅ | 27.4M | 🟢 **-41%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 158.6M | ✅ | 120.9M | 🟢 **-24%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 33.8M | 🟢 **-32%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.1M | ✅ | 2.8M | 🟢 **-70%** |
| ref.json | refs with quote | 2 | ✅ | 46.3M | ✅ | 30.8M | 🟢 **-33%** |
| ref.json | Location-independent identifier | 2 | ✅ | 50.8M | ✅ | 41.5M | -18% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.4M | ✅ | 44.0M | 🟢 **-26%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.8M | ✅ | 43.2M | 🟢 **-28%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 43.9M | ✅ | 38.4M | -13% |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ✅ | 10.7M | 🟢 **-71%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ✅ | 10.6M | 🟢 **-71%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 55.6M | ✅ | 43.6M | 🟢 **-21%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 25.6M | 🟢 **-24%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ✅ | 29.1M | 🟢 **-38%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ✅ | 29.2M | 🟢 **-38%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.6M | ✅ | 30.5M | 🟢 **-35%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.6M | ✅ | 29.2M | 🟢 **-37%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ✅ | 29.1M | 🟢 **-38%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 48.3M | ✅ | 29.2M | 🟢 **-40%** |
| ref.json | ref to if | 2 | ✅ | 59.4M | ✅ | 43.8M | 🟢 **-26%** |
| ref.json | ref to then | 2 | ✅ | 59.7M | ✅ | 43.9M | 🟢 **-26%** |
| ref.json | ref to else | 2 | ✅ | 59.4M | ✅ | 43.6M | 🟢 **-27%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 58.2M | ✅ | 43.8M | 🟢 **-25%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 44.1M | 🟢 **-29%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 43.9M | 🟢 **-30%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 43.7M | 🟢 **-30%** |
| refRemote.json | remote ref | 2 | ✅ | 58.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 45.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 45.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.0M | ✅ | 81.9M | 🔴 **+41%** |
| required.json | required default validation | 1 | ✅ | 159.2M | ✅ | 125.5M | 🟢 **-21%** |
| required.json | required with empty array | 1 | ✅ | 159.3M | ✅ | 125.0M | 🟢 **-21%** |
| required.json | required with escaped characters | 2 | ✅ | 44.3M | ✅ | 23.9M | 🟢 **-46%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ✅ | 36.0M | 🔴 **+43%** |
| type.json | integer type matches integers | 9 | ✅ | 52.8M | ✅ | 64.9M | 🔴 **+23%** |
| type.json | number type matches numbers | 9 | ✅ | 55.0M | ✅ | 70.1M | 🔴 **+27%** |
| type.json | string type matches strings | 9 | ✅ | 54.8M | ✅ | 73.3M | 🔴 **+34%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 60.1M | 🔴 **+30%** |
| type.json | array type matches arrays | 7 | ✅ | 51.4M | ✅ | 46.3M | -10% |
| type.json | boolean type matches booleans | 10 | ✅ | 51.9M | ✅ | 61.5M | +19% |
| type.json | null type matches only the null object | 10 | ✅ | 49.0M | ✅ | 59.9M | 🔴 **+22%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.2M | ✅ | 71.2M | 🔴 **+39%** |
| type.json | type as array with one item | 2 | ✅ | 62.0M | ✅ | 88.0M | 🔴 **+42%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 65.6M | +18% |
| type.json | type: array, object or null | 5 | ✅ | 64.5M | ✅ | 77.9M | 🔴 **+21%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ✅ | 8.2M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ✅ | 24.3M | 🟢 **-23%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.5M | ✅ | 29.6M | 🔴 **+60%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ✅ | 130.6M | -19% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.2M | ✅ | 47.3M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.4M | ✅ | 42.9M | 🟢 **-38%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 120.9M | 🔴 **+51%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 126.6M | 🔴 **+50%** |
| optional/bignum.json | string | 1 | ✅ | 47.4M | ✅ | 62.9M | 🔴 **+33%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 111.2M | 🔴 **+44%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 60.8M | 🔴 **+33%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.1M | ✅ | 111.3M | 🔴 **+44%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 59.8M | 🔴 **+31%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 348K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.0M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 428K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 71.3M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.4M | ✅ | 36.2M | 🔴 **+42%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.9M | ✅ | 35.5M | 🔴 **+37%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 35.9M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 34.4M | 🔴 **+29%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 35.9M | 🔴 **+39%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.0M | ✅ | 34.1M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.4M | ✅ | 34.2M | 🔴 **+35%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 38.2M | 🔴 **+47%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 33.0M | +19% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ✅ | 20.6M | 🔴 **+24%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.7M | ✅ | 16.3M | +19% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.5M | ✅ | 15.7M | +8% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.5M | ✅ | 33.9M | 🔴 **+33%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.4M | ✅ | 26.1M | 🔴 **+22%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 20.5M | ✅ | 19.3M | -6% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.8M | ✅ | 13.2M | 🟢 **-30%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.4M | ✅ | 14.9M | 🟢 **-27%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 8.6M | +6% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ✅ | 11.3M | 🔴 **+25%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ✅ | 15.9M | 🟢 **-22%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.8M | ✅ | 9.5M | 🟢 **-62%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.1M | ✅ | 24.5M | -2% |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ✅ | 14.5M | 🟢 **-21%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.0M | ✅ | 34.6M | -9% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.4M | ✅ | 18.0M | +10% |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.2M | ✅ | 35.9M | +19% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.1M | ✅ | 911K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.4M | ✅ | 43.0M | +15% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ✅ | 7.8M | -19% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.8M | ✅ | 17.5M | +11% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ✅ | 4.8M | 🟢 **-25%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.2M | ✅ | 25.6M | 🟢 **-36%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 51.9M | ✅ | 37.6M | 🟢 **-28%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 52.5M | ✅ | 38.7M | 🟢 **-26%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.6M | ✅ | 35.2M | 🔴 **+27%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.9M | ✅ | 10.9M | 🟢 **-31%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.0M | ✅ | 25.4M | -9% |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 68.9M | ✅ | 28.7M | 🟢 **-58%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 43.7M | ✅ | 26.1M | 🟢 **-40%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 157.7M | ✅ | 124.8M | 🟢 **-21%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.7M | ✅ | 87.9M | +15% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.9M | ✅ | 135.0M | 🟢 **-21%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 34.1M | 🟢 **-59%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 18.0M | 🟢 **-68%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 46.6M | ✅ | 28.2M | 🟢 **-39%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 71.0M | 🟢 **-34%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.7M | ✅ | 125.1M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.8M | ✅ | 42.9M | 🟢 **-31%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.6M | ✅ | 24.0M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 47.4M | ✅ | 27.1M | 🟢 **-43%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.8M | ✅ | 24.8M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.6M | ✅ | 125.1M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 16.1M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 50.9M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.2M | ✅ | 11.7M | 🟢 **-63%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.7M | ✅ | 17.3M | 🟢 **-54%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 38.5M | +11% |
| allOf.json | allOf with base schema | 5 | ✅ | 36.0M | ✅ | 24.5M | 🟢 **-32%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 85.3M | 🔴 **+41%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 125.4M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ✅ | 64.3M | 🔴 **+29%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 63.4M | 🟢 **-31%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 125.1M | 🟢 **-21%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.2M | ✅ | 125.9M | 🟢 **-21%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 87.0M | 🔴 **+40%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 87.6M | 🟢 **-24%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 86.6M | 🔴 **+34%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 59.7M | 🟢 **-28%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ✅ | 36.7M | 🟢 **-42%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.4M | ✅ | 38.8M | 🟢 **-66%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 60.1M | ✅ | 36.6M | 🟢 **-39%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 65.8M | ✅ | 38.3M | 🟢 **-42%** |
| anyOf.json | anyOf | 4 | ✅ | 66.4M | ✅ | 76.9M | +16% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.0M | ✅ | 26.6M | 🟢 **-22%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 125.3M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.2M | ✅ | 125.6M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.7M | ✅ | 64.0M | 🔴 **+29%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.1M | ✅ | 30.6M | 🟢 **-36%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.5M | ✅ | 133.6M | 🟢 **-22%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 86.4M | 🔴 **+33%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 184.2M | ✅ | 138.7M | 🟢 **-25%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 48.8M | ✅ | 17.5M | 🟢 **-64%** |
| const.json | const validation | 3 | ✅ | 55.1M | ✅ | 69.5M | 🔴 **+26%** |
| const.json | const with object | 4 | ✅ | 36.4M | ✅ | 32.5M | -11% |
| const.json | const with array | 3 | ✅ | 49.5M | ✅ | 8.8M | 🟢 **-82%** |
| const.json | const with null | 2 | ✅ | 74.5M | ✅ | 87.3M | +17% |
| const.json | const with false does not match 0 | 3 | ✅ | 58.6M | ✅ | 58.7M | +0% |
| const.json | const with true does not match 1 | 3 | ✅ | 58.0M | ✅ | 76.5M | 🔴 **+32%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ✅ | 68.2M | 🔴 **+26%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.0M | ✅ | 69.0M | 🔴 **+28%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.6M | ✅ | 33.4M | 🟢 **-35%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.7M | ✅ | 33.1M | 🟢 **-36%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ✅ | 65.3M | 🔴 **+22%** |
| const.json | const with 1 does not match true | 3 | ✅ | 67.3M | ✅ | 81.0M | 🔴 **+20%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ✅ | 67.5M | 🔴 **+21%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.0M | ✅ | 74.5M | +18% |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 73.5M | 🔴 **+33%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ✅ | 66.7M | 🔴 **+32%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 48.0M | ✅ | 73.3M | 🔴 **+53%** |
| contains.json | contains keyword validation | 6 | ✅ | 58.8M | ✅ | 18.9M | 🟢 **-68%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 28.8M | ✅ | 14.1M | 🟢 **-51%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.0M | ✅ | 72.9M | +17% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.5M | ✅ | 41.9M | 🟢 **-27%** |
| contains.json | items + contains | 4 | ✅ | 40.0M | ✅ | 18.9M | 🟢 **-53%** |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ✅ | 72.9M | 🔴 **+22%** |
| contains.json | contains with null instance elements | 1 | ✅ | 53.8M | ✅ | 37.5M | 🟢 **-30%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.3M | ✅ | 137.4M | 🟢 **-22%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 169.5M | ✅ | 122.3M | 🟢 **-28%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.0M | ✅ | 138.1M | 🟢 **-23%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 177.3M | ✅ | 124.5M | 🟢 **-30%** |
| default.json | invalid type for default | 2 | ✅ | 66.3M | ✅ | 75.3M | +14% |
| default.json | invalid string value for default | 2 | ✅ | 50.2M | ✅ | 47.6M | -5% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.4M | ✅ | 56.9M | 🔴 **+25%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.3M | ✅ | 72.6M | 🔴 **+22%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 137.0M | 🟢 **-22%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 25.8M | ✅ | 31.5M | 🔴 **+22%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 27.1M | ✅ | 39.9M | 🔴 **+47%** |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.3M | ✅ | 47.8M | -1% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.8M | ✅ | 54.7M | +17% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.5M | ✅ | 35.5M | -10% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.6M | ✅ | 26.7M | 🟢 **-29%** |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 79.0M | 🔴 **+24%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.2M | ✅ | 32.6M | 🟢 **-23%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.7M | ✅ | 89.1M | 🔴 **+33%** |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ✅ | 41.0M | +8% |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 96.7M | 🔴 **+36%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 54.2M | ✅ | 74.7M | 🔴 **+38%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 53.0M | ✅ | 69.7M | 🔴 **+31%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 57.6M | ✅ | 75.6M | 🔴 **+31%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 49.2M | ✅ | 69.7M | 🔴 **+42%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 64.8M | ✅ | 88.7M | 🔴 **+37%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.7M | ✅ | 79.7M | 🔴 **+48%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.3M | ✅ | 91.1M | 🔴 **+35%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.1M | ✅ | 77.9M | 🔴 **+34%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 74.0M | 🔴 **+34%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 51.1M | ✅ | 75.2M | 🔴 **+47%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 55.1M | ✅ | 79.2M | 🔴 **+44%** |
| format.json | email format | 6 | ✅ | 133.3M | ✅ | 129.8M | -3% |
| format.json | idn-email format | 6 | ✅ | 172.7M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 95.5M | ✅ | 132.7M | 🔴 **+39%** |
| format.json | ipv4 format | 6 | ✅ | 145.7M | ✅ | 107.5M | 🟢 **-26%** |
| format.json | ipv6 format | 6 | ✅ | 182.2M | ✅ | 127.6M | 🟢 **-30%** |
| format.json | idn-hostname format | 6 | ✅ | 182.7M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 181.7M | ✅ | 131.9M | 🟢 **-27%** |
| format.json | date format | 6 | ✅ | 145.2M | ✅ | 108.2M | 🟢 **-26%** |
| format.json | date-time format | 6 | ✅ | 145.5M | ✅ | 117.8M | -19% |
| format.json | time format | 6 | ✅ | 172.6M | ✅ | 121.2M | 🟢 **-30%** |
| format.json | json-pointer format | 6 | ✅ | 94.9M | ✅ | 132.6M | 🔴 **+40%** |
| format.json | relative-json-pointer format | 6 | ✅ | 128.7M | ✅ | 118.5M | -8% |
| format.json | iri format | 6 | ✅ | 181.7M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 173.3M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 182.9M | ✅ | 132.7M | 🟢 **-27%** |
| format.json | uri-reference format | 6 | ✅ | 181.9M | ✅ | 103.0M | 🟢 **-43%** |
| format.json | uri-template format | 6 | ✅ | 173.9M | ✅ | 122.5M | 🟢 **-30%** |
| format.json | uuid format | 6 | ✅ | 181.4M | ✅ | 119.4M | 🟢 **-34%** |
| format.json | duration format | 6 | ✅ | 99.6M | ✅ | 133.0M | 🔴 **+34%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ✅ | 134.3M | 🟢 **-22%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.6M | ✅ | 135.4M | 🟢 **-21%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.6M | ✅ | 135.1M | 🟢 **-21%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.3M | ✅ | 94.9M | 🔴 **+35%** |
| if-then-else.json | if and else without then | 3 | ✅ | 69.4M | ✅ | 95.0M | 🔴 **+37%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.2M | ✅ | 80.1M | 🔴 **+31%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.6M | ✅ | 128.0M | 🟢 **-25%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ✅ | 78.2M | 🔴 **+21%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.0M | ✅ | 64.0M | 0% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.6M | ✅ | 32.9M | 🟢 **-23%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.6M | ✅ | 21.7M | 🟢 **-45%** |
| items.json | a schema given for items | 4 | ✅ | 59.3M | ✅ | 43.9M | 🟢 **-26%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.2M | ✅ | 59.3M | -9% |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.7M | ✅ | 134.3M | 🟢 **-22%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ✅ | 66.4M | +7% |
| items.json | items with boolean schemas | 3 | ✅ | 62.2M | ✅ | 79.4M | 🔴 **+28%** |
| items.json | items and subitems | 6 | ✅ | 29.0M | ✅ | 8.0M | 🟢 **-72%** |
| items.json | nested items | 3 | ✅ | 13.5M | ✅ | 6.8M | 🟢 **-49%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 66.4M | -14% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 69.3M | -16% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.6M | ✅ | 135.3M | 🟢 **-21%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.7M | ✅ | 24.6M | 🟢 **-53%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.9M | ✅ | 24.3M | 🟢 **-58%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.7M | ✅ | 20.1M | 🟢 **-60%** |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ✅ | 96.2M | 🔴 **+30%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 82.9M | 🔴 **+31%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.0M | ✅ | 39.8M | 🟢 **-33%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.6M | ✅ | 50.8M | -2% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.1M | ✅ | 68.7M | 🔴 **+27%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.1M | ✅ | 47.9M | +19% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.5M | ✅ | 50.2M | +18% |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ✅ | 100.6M | 🔴 **+46%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 88.7M | 🔴 **+31%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.8M | ✅ | 134.5M | 🟢 **-22%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.1M | ✅ | 30.2M | 🟢 **-50%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 50.2M | ✅ | 13.3M | 🟢 **-74%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ✅ | 25.4M | 🟢 **-57%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.5M | ✅ | 23.3M | 🟢 **-51%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.5M | ✅ | 23.1M | 🟢 **-47%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.4M | ✅ | 46.5M | 🟢 **-73%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 66.1M | ✅ | 31.8M | 🟢 **-52%** |
| minItems.json | minItems validation | 4 | ✅ | 73.4M | ✅ | 95.9M | 🔴 **+31%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 83.4M | 🔴 **+31%** |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ✅ | 35.0M | 🟢 **-34%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 47.8M | -9% |
| minProperties.json | minProperties validation | 6 | ✅ | 55.2M | ✅ | 68.0M | 🔴 **+23%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.2M | ✅ | 50.2M | +19% |
| minimum.json | minimum validation | 4 | ✅ | 69.1M | ✅ | 97.9M | 🔴 **+42%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ✅ | 90.0M | 🔴 **+39%** |
| multipleOf.json | by int | 3 | ✅ | 69.4M | ✅ | 94.0M | 🔴 **+35%** |
| multipleOf.json | by number | 3 | ✅ | 64.3M | ✅ | 59.3M | -8% |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 27.0M | 🟢 **-53%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 16.3M | 🟢 **-76%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 84.9M | 🔴 **+35%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 69.7M | 🔴 **+24%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 48.1M | -17% |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 59.2M | 🔴 **+28%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.8M | ✅ | 61.6M | 🔴 **+26%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.0M | ✅ | 62.3M | 🔴 **+27%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.4M | ✅ | 138.8M | 🟢 **-23%** |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 125.2M | 🟢 **-21%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.2M | ✅ | 14.5M | 🟢 **-53%** |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ✅ | 74.5M | 🔴 **+46%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.2M | ✅ | 26.6M | -20% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.7M | ✅ | 62.1M | 🔴 **+25%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.5M | ✅ | 121.4M | 🟢 **-24%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 60.6M | 🔴 **+22%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 62.3M | 🔴 **+25%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.9M | ✅ | 28.1M | 🟢 **-29%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 53.0M | ✅ | 84.8M | 🔴 **+60%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.1M | ✅ | 25.7M | 🟢 **-37%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.4M | ✅ | 31.4M | 🟢 **-28%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.2M | ✅ | 85.5M | 🔴 **+37%** |
| pattern.json | pattern validation | 8 | ✅ | 52.6M | ✅ | 67.9M | 🔴 **+29%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 56.3M | +17% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.7M | ✅ | 17.0M | 🟢 **-31%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.1M | ✅ | 14.3M | +1% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.8M | ✅ | 12.9M | -18% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.5M | ✅ | 16.3M | 🟢 **-20%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 22.5M | 🔴 **+27%** |
| properties.json | object properties validation | 6 | ✅ | 50.0M | ✅ | 52.0M | +4% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 11.7M | 🟢 **-41%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.4M | ✅ | 53.2M | 🔴 **+25%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.3M | ✅ | 24.2M | 🟢 **-45%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 58.1M | -10% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ✅ | 28.7M | +9% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.9M | ✅ | 37.7M | -16% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.8M | ✅ | 15.7M | 🟢 **-21%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 162.7M | ✅ | 130.4M | -20% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 19.8M | ✅ | 24.6M | 🔴 **+24%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.6M | ✅ | 30.0M | 🟢 **-20%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.3M | ✅ | 32.6M | 🟢 **-23%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.2M | ✅ | 12.0M | -15% |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.1M | ✅ | 10.0M | 🔴 **+64%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.0M | ✅ | 10.2M | 🔴 **+241%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 14.0M | ✅ | 10.2M | 🟢 **-27%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.6M | ✅ | 10.0M | 🟢 **-20%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.1M | ✅ | 14.0M | 🔴 **+53%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.9M | ✅ | 14.2M | 🔴 **+78%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ✅ | 4.2M | +0% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ✅ | 4.4M | +5% |
| ref.json | root pointer ref | 4 | ✅ | 23.1M | ✅ | 13.4M | 🟢 **-42%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.3M | ✅ | 27.7M | 🟢 **-40%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.3M | ✅ | 24.0M | 🟢 **-53%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.5M | ✅ | 28.6M | 🟢 **-29%** |
| ref.json | nested refs | 2 | ✅ | 45.9M | ✅ | 11.9M | 🟢 **-74%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 37.3M | ✅ | 29.0M | 🟢 **-22%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.8M | ✅ | 47.0M | +0% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.9M | ✅ | 30.3M | 🟢 **-35%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.3M | ✅ | 118.7M | 🟢 **-25%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 34.2M | 🟢 **-31%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ✅ | 2.7M | 🟢 **-71%** |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ✅ | 28.8M | 🟢 **-38%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.5M | ✅ | 9.2M | 🟢 **-66%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 46.9M | ✅ | 37.6M | -20% |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.9M | ✅ | 10.2M | 🟢 **-72%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ✅ | 10.4M | 🟢 **-72%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 60.2M | ✅ | 42.7M | 🟢 **-29%** |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 57.8M | ✅ | 40.0M | 🟢 **-31%** |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.2M | ✅ | 40.2M | 🟢 **-34%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 48.9M | ✅ | 24.1M | 🟢 **-51%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 24.4M | 🟢 **-27%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.9M | ✅ | 28.6M | 🟢 **-39%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.9M | ✅ | 28.4M | 🟢 **-39%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.9M | ✅ | 27.5M | 🟢 **-41%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.9M | ✅ | 27.4M | 🟢 **-42%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.9M | ✅ | 27.4M | 🟢 **-41%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.9M | ✅ | 27.5M | 🟢 **-41%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 60.2M | ✅ | 24.6M | 🟢 **-59%** |
| ref.json | ref to if | 2 | ✅ | 60.3M | ✅ | 35.9M | 🟢 **-40%** |
| ref.json | ref to then | 2 | ✅ | 60.1M | ✅ | 37.8M | 🟢 **-37%** |
| ref.json | ref to else | 2 | ✅ | 55.0M | ✅ | 37.7M | 🟢 **-31%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 56.8M | ✅ | 33.5M | 🟢 **-41%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 35.1M | 🟢 **-44%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 33.6M | 🟢 **-46%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 42.7M | 🟢 **-32%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ✅ | 18.3M | 🔴 **+285%** |
| refRemote.json | remote ref | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 60.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 59.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 47.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 60.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 60.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 48.8M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 60.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 56.5M | ✅ | 75.7M | 🔴 **+34%** |
| required.json | required default validation | 1 | ✅ | 159.6M | ✅ | 121.2M | 🟢 **-24%** |
| required.json | required with empty array | 1 | ✅ | 159.3M | ✅ | 121.7M | 🟢 **-24%** |
| required.json | required with escaped characters | 2 | ✅ | 19.7M | ✅ | 23.5M | +19% |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ✅ | 34.9M | 🔴 **+38%** |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 63.5M | 🔴 **+20%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 67.6M | 🔴 **+23%** |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 66.2M | 🔴 **+21%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 57.0M | 🔴 **+23%** |
| type.json | array type matches arrays | 7 | ✅ | 51.0M | ✅ | 58.6M | +15% |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 62.1M | +20% |
| type.json | null type matches only the null object | 10 | ✅ | 48.5M | ✅ | 50.6M | +4% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.3M | ✅ | 65.0M | 🔴 **+27%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 83.9M | 🔴 **+35%** |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 65.1M | +17% |
| type.json | type: array, object or null | 5 | ✅ | 67.1M | ✅ | 79.7M | +19% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.8M | ✅ | 130.0M | 🔴 **+55%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.2M | ✅ | 79.5M | 🔴 **+49%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 57.0M | ✅ | 53.4M | -6% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ✅ | 45.2M | 🟢 **-37%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 50.0M | ✅ | 50.3M | +1% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 80.8M | ✅ | 67.8M | -16% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 45.4M | ✅ | 27.8M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 45.7M | ✅ | 27.7M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.0M | ✅ | 37.2M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 24.1M | ✅ | 14.5M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 84.0M | ✅ | 70.6M | -16% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 22.0M | ✅ | 71.0M | 🔴 **+223%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.6M | ✅ | 15.6M | 🔴 **+25%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.0M | ✅ | 23.6M | 🔴 **+47%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ✅ | 27.2M | 🟢 **-23%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.5M | ✅ | 14.4M | 🔴 **+25%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.3M | ✅ | 78.0M | 🔴 **+46%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.0M | ✅ | 34.8M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.8M | ✅ | 34.8M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 38.9M | ✅ | 56.9M | 🔴 **+46%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.9M | ✅ | 27.6M | +3% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 84.7M | ✅ | 130.2M | 🔴 **+54%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ✅ | 66.4M | -14% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.4M | ✅ | 20.8M | -7% |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 36.0M | ✅ | 32.1M | -11% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 44.4M | ✅ | 96.2M | 🔴 **+117%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.8M | ✅ | 24.8M | 🟢 **-25%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 31.2M | ✅ | 23.1M | 🟢 **-26%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 35.1M | ✅ | 20.3M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.2M | ✅ | 14.8M | -3% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 65.4M | ✅ | 58.0M | -11% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 31.7M | ✅ | 15.1M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.8M | ✅ | 12.6M | -9% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 65.3M | ✅ | 58.0M | -11% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 33.0M | ✅ | 56.0M | 🔴 **+70%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 17.7M | ✅ | 5.6M | 🟢 **-69%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.9M | ✅ | 9.7M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.6M | ✅ | 11.5M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 19.1M | ✅ | 7.0M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.7M | ✅ | 9.9M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.9M | ✅ | 6.2M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.7M | ✅ | 11.6M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 35.8M | ✅ | 21.9M | 🟢 **-39%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 32.3M | ✅ | 15.6M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 32.5M | ✅ | 14.6M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ✅ | 16.6M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.5M | ✅ | 15.8M | 🟢 **-47%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.9M | ✅ | 58.0M | 🔴 **+76%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.0M | ✅ | 58.0M | 🔴 **+94%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.4M | ✅ | 14.4M | 🟢 **-45%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.3M | ✅ | 20.1M | 🟢 **-29%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.1M | ✅ | 14.3M | 🟢 **-32%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.5M | ✅ | 19.4M | 🔴 **+69%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.1M | ✅ | 15.2M | 🟢 **-46%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.1M | ✅ | 20.9M | 🟢 **-35%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 41.2M | ✅ | 20.3M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.5M | ✅ | 10.8M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.8M | ✅ | 9.0M | 🟢 **-52%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ✅ | 2.9M | 🟢 **-60%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 78.1M | ✅ | 118.3M | 🔴 **+51%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.5M | ✅ | 50.1M | +1% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.8M | ✅ | 20.1M | 🟢 **-27%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.6M | ✅ | 3.9M | 🟢 **-71%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.8M | ✅ | 13.0M | 🟢 **-40%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.9M | ✅ | 10.6M | 🟢 **-57%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ✅ | 7.8M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ✅ | 23.1M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ✅ | 29.1M | 🔴 **+58%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ✅ | 126.2M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.3M | ✅ | 45.9M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.8M | ✅ | 42.3M | 🟢 **-34%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 43.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.3M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.2M | ✅ | 22.4M | 🟢 **-57%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 112.1M | 🔴 **+40%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 121.8M | 🔴 **+45%** |
| optional/bignum.json | string | 1 | ✅ | 47.6M | ✅ | 60.7M | 🔴 **+28%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 107.8M | 🔴 **+40%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.5M | ✅ | 59.2M | 🔴 **+30%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.1M | ✅ | 107.7M | 🔴 **+40%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 59.0M | 🔴 **+29%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 28.8M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.2M | ✅ | 69.3M | +17% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.5M | ✅ | 133.3M | 🟢 **-24%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 30.6M | ✅ | 30.6M | 0% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ✅ | 39.2M | -7% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.2M | ✅ | 46.4M | -4% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 49.4M | ✅ | 53.0M | +7% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.8M | ✅ | 34.8M | -15% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 68.3M | 🔴 **+28%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.9M | ✅ | 34.6M | 🔴 **+83%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ✅ | 34.1M | 🔴 **+28%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 21.4M | ✅ | 34.7M | 🔴 **+62%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 33.1M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 34.2M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.0M | ✅ | 35.0M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.3M | ✅ | 32.9M | 🔴 **+35%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 35.6M | 🔴 **+37%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 32.7M | +18% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.5M | ✅ | 19.3M | 🔴 **+24%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.4M | ✅ | 16.1M | +12% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.5M | ✅ | 15.2M | +5% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ✅ | 32.0M | 🔴 **+22%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.3M | ✅ | 26.8M | 🔴 **+26%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.0M | ✅ | 20.3M | -12% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 13.4M | 🟢 **-35%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.9M | ✅ | 14.5M | 🟢 **-30%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 8.3M | +2% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ✅ | 11.0M | 🔴 **+24%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.4M | ✅ | 16.3M | 🟢 **-20%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ✅ | 9.2M | 🟢 **-62%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.9M | ✅ | 23.7M | -5% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.9M | ✅ | 12.6M | 🟢 **-67%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ✅ | 14.0M | 🟢 **-24%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.0M | ✅ | 35.2M | +3% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ✅ | 17.4M | +5% |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.4M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.2M | ✅ | 34.9M | +16% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.2M | ✅ | 935K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.0M | ✅ | 41.8M | 🔴 **+31%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.6M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ✅ | 7.6M | 🟢 **-21%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.2M | ✅ | 18.9M | +10% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.7M | 🟢 **-26%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.9M | ✅ | 14.9M | 0% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.3M | ✅ | 23.9M | 🟢 **-41%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.6M | ✅ | 61.6M | +3% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.6M | ✅ | 34.1M | 🔴 **+23%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.7M | ✅ | 10.4M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.0M | ✅ | 28.5M | 🟢 **-38%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.3M | ✅ | 28.5M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.4M | ✅ | 27.0M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.3M | ✅ | 37.3M | 🟢 **-40%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.4M | ✅ | 27.0M | 🟢 **-42%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.0M | ✅ | 24.0M | -14% |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.6M | ✅ | 21.0M | 🟢 **-61%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.0M | ✅ | 24.3M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.1M | ✅ | 27.5M | 🟢 **-39%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.5M | ✅ | 25.0M | 🟢 **-27%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 140.4M | ✅ | 125.4M | -11% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.2M | ✅ | 17.3M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.6M | ✅ | 51.5M | 🟢 **-23%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 29.2M | ✅ | 10.1M | 🟢 **-65%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.5M | ✅ | 9.3M | 🟢 **-75%** |
| allOf.json | allOf | 4 | ✅ | 34.3M | ✅ | 39.4M | +15% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.6M | ✅ | 25.4M | -17% |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 85.5M | 🔴 **+41%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.8M | ✅ | 125.4M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ✅ | 57.9M | +16% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.7M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 125.3M | 🟢 **-21%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 125.3M | 🟢 **-21%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 87.1M | 🔴 **+40%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 87.9M | 🟢 **-24%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 53.8M | ✅ | 87.2M | 🔴 **+62%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.1M | ✅ | 58.4M | 🟢 **-30%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ✅ | 38.4M | 🟢 **-39%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ✅ | 35.8M | 🟢 **-68%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 55.7M | ✅ | 38.3M | 🟢 **-31%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 62.3M | ✅ | 38.3M | 🟢 **-39%** |
| anyOf.json | anyOf | 4 | ✅ | 66.7M | ✅ | 90.1M | 🔴 **+35%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.1M | ✅ | 26.9M | 🟢 **-29%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 57.2M | 🟢 **-64%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 125.5M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 64.6M | 🔴 **+30%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.3M | ✅ | 28.1M | 🟢 **-44%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 135.2M | 🟢 **-21%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 76.5M | +18% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.9M | ✅ | 127.9M | 🟢 **-30%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 49.1M | ✅ | 51.1M | +4% |
| const.json | const validation | 3 | ✅ | 55.1M | ✅ | 36.1M | 🟢 **-34%** |
| const.json | const with object | 4 | ✅ | 36.2M | ✅ | 32.2M | -11% |
| const.json | const with array | 3 | ✅ | 49.5M | ✅ | 8.8M | 🟢 **-82%** |
| const.json | const with null | 2 | ✅ | 64.8M | ✅ | 87.1M | 🔴 **+35%** |
| const.json | const with false does not match 0 | 3 | ✅ | 58.8M | ✅ | 73.7M | 🔴 **+25%** |
| const.json | const with true does not match 1 | 3 | ✅ | 58.1M | ✅ | 73.3M | 🔴 **+26%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ✅ | 68.0M | 🔴 **+26%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.0M | ✅ | 55.3M | +2% |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.2M | ✅ | 32.9M | 🟢 **-36%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.7M | ✅ | 32.8M | 🟢 **-36%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ✅ | 64.2M | 🔴 **+20%** |
| const.json | const with 1 does not match true | 3 | ✅ | 67.3M | ✅ | 90.3M | 🔴 **+34%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ✅ | 38.3M | 🟢 **-31%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.0M | ✅ | 44.8M | 🟢 **-29%** |
| const.json | nul characters in strings | 2 | ✅ | 53.0M | ✅ | 74.0M | 🔴 **+40%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ✅ | 66.9M | 🔴 **+32%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 75.7M | 🔴 **+34%** |
| contains.json | contains keyword validation | 6 | ✅ | 59.8M | ✅ | 20.2M | 🟢 **-66%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 53.6M | ✅ | 13.6M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 49.0M | ✅ | 58.3M | +19% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ✅ | 39.6M | 🟢 **-31%** |
| contains.json | items + contains | 4 | ✅ | 40.3M | ✅ | 18.7M | 🟢 **-54%** |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ✅ | 70.6M | +18% |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 38.3M | 🟢 **-53%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.2M | ✅ | 138.4M | 🟢 **-21%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.0M | ✅ | 118.0M | 🟢 **-33%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.5M | ✅ | 68.3M | 🟢 **-62%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 182.8M | ✅ | 133.9M | 🟢 **-27%** |
| default.json | invalid type for default | 2 | ✅ | 67.4M | ✅ | 75.5M | +12% |
| default.json | invalid string value for default | 2 | ✅ | 52.6M | ✅ | 21.3M | 🟢 **-60%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.3M | ✅ | 53.0M | +7% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 58.0M | ✅ | 72.2M | 🔴 **+24%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 157.2M | ✅ | 136.8M | -13% |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 25.9M | ✅ | 30.5M | +17% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ✅ | 39.9M | -5% |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.6M | ✅ | 48.1M | -1% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.9M | ✅ | 54.8M | +17% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.6M | ✅ | 33.4M | -18% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.6M | ✅ | 26.4M | 🟢 **-30%** |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.7M | ✅ | 6.3M | 🟢 **-54%** |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.6M | ✅ | 19.1M | -12% |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.7M | ✅ | 22.1M | 🔴 **+32%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.5M | ✅ | 2.4M | 🟢 **-80%** |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 14.0M | ✅ | 4.8M | 🟢 **-66%** |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 11.1M | ✅ | 2.7M | 🟢 **-75%** |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.3M | ✅ | 6.4M | 🟢 **-23%** |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.6M | ✅ | 18.6M | +6% |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.5M | ✅ | 7.9M | 🟢 **-36%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.2M | ✅ | 1.5M | 🟢 **-81%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.6M | ✅ | 13.3M | -14% |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.8M | ✅ | 2.2M | 🟢 **-63%** |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.8M | ✅ | 1.6M | 🟢 **-76%** |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.9M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 10.0M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.0M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.5M | ✅ | 28.8M | +1% |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.4M | ✅ | 4.3M | 🟢 **-48%** |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.8M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 56.2M | ✅ | 84.6M | 🔴 **+51%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 39.7M | ✅ | 38.7M | -3% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.5M | ✅ | 89.4M | 🔴 **+34%** |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ✅ | 40.7M | +7% |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 97.0M | 🔴 **+36%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 57.6M | ✅ | 76.1M | 🔴 **+32%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.0M | ✅ | 70.4M | 🔴 **+30%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 58.1M | ✅ | 77.5M | 🔴 **+33%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ✅ | 68.6M | 🔴 **+27%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.3M | ✅ | 89.1M | 🔴 **+32%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.8M | ✅ | 81.2M | 🔴 **+51%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.3M | ✅ | 88.4M | 🔴 **+31%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ✅ | 80.5M | 🔴 **+37%** |
| enum.json | nul characters in strings | 2 | ✅ | 54.3M | ✅ | 74.2M | 🔴 **+37%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.5M | ✅ | 79.6M | 🔴 **+43%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 59.5M | ✅ | 78.6M | 🔴 **+32%** |
| format.json | email format | 7 | ✅ | 176.3M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 175.8M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 183.1M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 175.2M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 182.5M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 178.0M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 182.7M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 182.5M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 182.1M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 182.6M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 183.6M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 184.0M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 176.3M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 182.0M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.5M | ✅ | 134.9M | 🟢 **-21%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.6M | ✅ | 135.4M | 🟢 **-21%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 170.3M | ✅ | 134.5M | 🟢 **-21%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.4M | ✅ | 95.7M | 🔴 **+36%** |
| if-then-else.json | if and else without then | 3 | ✅ | 69.1M | ✅ | 93.3M | 🔴 **+35%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.3M | ✅ | 79.7M | 🔴 **+30%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.7M | ✅ | 128.1M | 🟢 **-25%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ✅ | 85.6M | 🔴 **+32%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ✅ | 80.1M | 🔴 **+25%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.7M | ✅ | 37.1M | -13% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.7M | ✅ | 24.4M | 🟢 **-37%** |
| items.json | a schema given for items | 4 | ✅ | 56.1M | ✅ | 43.8M | 🟢 **-22%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.4M | ✅ | 133.5M | 🟢 **-22%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ✅ | 74.9M | 🔴 **+20%** |
| items.json | items and subitems | 6 | ✅ | 29.0M | ✅ | 8.3M | 🟢 **-71%** |
| items.json | nested items | 3 | ✅ | 13.4M | ✅ | 6.7M | 🟢 **-50%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 76.7M | ✅ | 104.6M | 🔴 **+36%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.7M | ✅ | 33.3M | 🟢 **-29%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 45.3M | ✅ | 30.3M | 🟢 **-33%** |
| items.json | items with heterogeneous array | 2 | ✅ | 63.5M | ✅ | 78.8M | 🔴 **+24%** |
| items.json | items with null instance elements | 1 | ✅ | 77.1M | ✅ | 66.5M | -14% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 164.3M | ✅ | 135.2M | -18% |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.7M | ✅ | 24.4M | 🟢 **-53%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.9M | ✅ | 24.5M | 🟢 **-58%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.9M | ✅ | 20.9M | 🟢 **-59%** |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 99.6M | 🔴 **+35%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 80.5M | 🔴 **+27%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.1M | ✅ | 42.3M | 🟢 **-28%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.7M | ✅ | 50.7M | -2% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.9M | ✅ | 68.5M | 🔴 **+30%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.8M | ✅ | 46.1M | +10% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.6M | ✅ | 50.4M | +18% |
| maximum.json | maximum validation | 4 | ✅ | 63.0M | ✅ | 99.6M | 🔴 **+58%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.7M | ✅ | 102.3M | 🔴 **+51%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.4M | ✅ | 134.9M | 🟢 **-21%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.2M | ✅ | 29.6M | 🟢 **-51%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.1M | ✅ | 21.7M | 🟢 **-61%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.3M | ✅ | 25.4M | 🟢 **-56%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.3M | ✅ | 23.3M | 🟢 **-51%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.4M | ✅ | 23.1M | 🟢 **-47%** |
| minContains.json | minContains = 0 | 2 | ✅ | 171.8M | ✅ | 54.4M | 🟢 **-68%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ✅ | 31.8M | 🟢 **-52%** |
| minItems.json | minItems validation | 4 | ✅ | 73.9M | ✅ | 91.0M | 🔴 **+23%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 83.4M | 🔴 **+31%** |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ✅ | 35.3M | 🟢 **-33%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 49.2M | -6% |
| minProperties.json | minProperties validation | 6 | ✅ | 54.9M | ✅ | 66.8M | 🔴 **+22%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.0M | ✅ | 49.9M | 🔴 **+22%** |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ✅ | 98.9M | 🔴 **+43%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.4M | ✅ | 90.3M | 🔴 **+40%** |
| multipleOf.json | by int | 3 | ✅ | 65.5M | ✅ | 94.4M | 🔴 **+44%** |
| multipleOf.json | by number | 3 | ✅ | 63.3M | ✅ | 59.3M | -6% |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 27.1M | 🟢 **-53%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 17.2M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 85.4M | 🔴 **+36%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 72.1M | 🔴 **+28%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 50.9M | -12% |
| not.json | forbidden property | 2 | ✅ | 46.2M | ✅ | 59.7M | 🔴 **+29%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.0M | ✅ | 63.1M | 🔴 **+29%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.0M | ✅ | 63.4M | 🔴 **+29%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.7M | ✅ | 138.9M | 🟢 **-23%** |
| not.json | double negation | 1 | ✅ | 157.1M | ✅ | 125.4M | 🟢 **-20%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.3M | ✅ | 14.9M | 🟢 **-52%** |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ✅ | 70.5M | 🔴 **+39%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.5M | ✅ | 27.0M | 🟢 **-26%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 62.5M | 🔴 **+25%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 155.6M | ✅ | 121.6M | 🟢 **-22%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 61.3M | 🔴 **+23%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 62.7M | 🔴 **+26%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.7M | ✅ | 28.7M | 🟢 **-28%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 84.7M | 🔴 **+37%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.2M | ✅ | 25.4M | 🟢 **-38%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ✅ | 32.7M | 🟢 **-25%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 85.7M | 🔴 **+37%** |
| pattern.json | pattern validation | 8 | ✅ | 52.8M | ✅ | 70.4M | 🔴 **+33%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 56.3M | +17% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ✅ | 18.2M | 🟢 **-32%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.9M | ✅ | 13.7M | -8% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.2M | ✅ | 13.1M | 🟢 **-24%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.1M | ✅ | 16.5M | 🟢 **-22%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 21.5M | 🔴 **+21%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.5M | ✅ | 58.7M | -10% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 60.5M | ✅ | 77.9M | 🔴 **+29%** |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 83.0M | ✅ | 67.9M | -18% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 83.0M | ✅ | 69.3M | -16% |
| properties.json | object properties validation | 6 | ✅ | 49.7M | ✅ | 52.3M | +5% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 11.9M | 🟢 **-41%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.7M | ✅ | 52.9M | 🔴 **+24%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ✅ | 24.2M | 🟢 **-46%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 58.1M | -10% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ✅ | 28.9M | +10% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.2M | ✅ | 40.8M | -8% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.8M | ✅ | 16.5M | -17% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.8M | ✅ | 130.6M | 🟢 **-24%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.7M | ✅ | 22.7M | 🟢 **-47%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ✅ | 29.9M | 🟢 **-25%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.1M | ✅ | 32.9M | 🟢 **-22%** |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ✅ | 13.7M | 🟢 **-43%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ✅ | 28.9M | 🟢 **-38%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ✅ | 23.8M | 🟢 **-54%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.5M | ✅ | 28.2M | 🟢 **-30%** |
| ref.json | nested refs | 2 | ✅ | 47.2M | ✅ | 12.8M | 🟢 **-73%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 38.6M | ✅ | 30.0M | 🟢 **-22%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 48.1M | +3% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 28.7M | 🟢 **-38%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.6M | ✅ | 119.9M | 🟢 **-25%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 35.0M | 🟢 **-30%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.1M | ✅ | 2.7M | 🟢 **-71%** |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ✅ | 28.7M | 🟢 **-38%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.3M | ✅ | 9.7M | 🟢 **-65%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.1M | ✅ | 38.1M | -19% |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ✅ | 10.5M | 🟢 **-72%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.6M | ✅ | 10.5M | 🟢 **-71%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 56.2M | ✅ | 43.0M | 🟢 **-23%** |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 55.9M | ✅ | 41.0M | 🟢 **-27%** |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.2M | ✅ | 40.3M | 🟢 **-34%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 47.6M | ✅ | 24.8M | 🟢 **-48%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 32.5M | ✅ | 24.5M | 🟢 **-25%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.2M | ✅ | 28.7M | 🟢 **-38%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.6M | ✅ | 30.5M | 🟢 **-35%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ✅ | 27.7M | 🟢 **-41%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.8M | ✅ | 27.8M | 🟢 **-38%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.6M | ✅ | 27.6M | 🟢 **-41%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.4M | ✅ | 27.6M | 🟢 **-41%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 58.4M | ✅ | 24.6M | 🟢 **-58%** |
| ref.json | ref to if | 2 | ✅ | 57.2M | ✅ | 38.8M | 🟢 **-32%** |
| ref.json | ref to then | 2 | ✅ | 58.9M | ✅ | 34.6M | 🟢 **-41%** |
| ref.json | ref to else | 2 | ✅ | 58.8M | ✅ | 39.1M | 🟢 **-33%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 58.0M | ✅ | 36.1M | 🟢 **-38%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 33.7M | 🟢 **-46%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 35.7M | 🟢 **-43%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 41.0M | 🟢 **-34%** |
| refRemote.json | remote ref | 2 | ✅ | 58.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 57.5M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 58.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 47.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 54.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 58.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 59.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 46.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 56.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.0M | ✅ | 77.8M | 🔴 **+34%** |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 121.5M | 🟢 **-24%** |
| required.json | required with empty array | 1 | ✅ | 159.6M | ✅ | 121.6M | 🟢 **-24%** |
| required.json | required with escaped characters | 2 | ✅ | 44.0M | ✅ | 23.4M | 🟢 **-47%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.1M | ✅ | 35.1M | 🔴 **+40%** |
| type.json | integer type matches integers | 9 | ✅ | 52.8M | ✅ | 64.0M | 🔴 **+21%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 68.0M | 🔴 **+23%** |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 67.8M | 🔴 **+24%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 56.9M | 🔴 **+23%** |
| type.json | array type matches arrays | 7 | ✅ | 51.4M | ✅ | 59.6M | +16% |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 63.7M | 🔴 **+23%** |
| type.json | null type matches only the null object | 10 | ✅ | 49.1M | ✅ | 60.2M | 🔴 **+23%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.1M | ✅ | 65.4M | 🔴 **+26%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 84.1M | 🔴 **+35%** |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 65.5M | +18% |
| type.json | type: array, object or null | 5 | ✅ | 65.5M | ✅ | 80.9M | 🔴 **+24%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 130.0M | 🔴 **+57%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.4M | ✅ | 79.8M | 🔴 **+50%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 57.0M | ✅ | 53.5M | -6% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ✅ | 45.2M | 🟢 **-37%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 49.9M | ✅ | 51.4M | +3% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 80.9M | ✅ | 67.9M | -16% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.0M | ✅ | 26.4M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.0M | ✅ | 37.2M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.4M | ✅ | 13.6M | 🟢 **-42%** |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 84.0M | ✅ | 70.6M | -16% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.0M | ✅ | 70.6M | 🔴 **+237%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.5M | ✅ | 12.5M | -1% |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.5M | ✅ | 23.6M | 🔴 **+52%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ✅ | 26.7M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ✅ | 12.1M | +7% |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.4M | ✅ | 79.6M | 🔴 **+49%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.3M | ✅ | 34.9M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.1M | ✅ | 34.9M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ✅ | 53.5M | 🔴 **+37%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.8M | ✅ | 29.1M | +9% |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.5M | ✅ | 12.8M | 🟢 **-38%** |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.8M | ✅ | 3.5M | 🟢 **-60%** |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ✅ | 5.8M | 🟢 **-45%** |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.1M | ✅ | 14.4M | 🟢 **-24%** |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.8M | ✅ | 130.4M | 🔴 **+41%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ✅ | 60.0M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.6M | ✅ | 15.6M | 🟢 **-28%** |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 36.0M | ✅ | 32.1M | -11% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.3M | ✅ | 119.6M | 🔴 **+120%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.6M | ✅ | 23.8M | 🟢 **-29%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.8M | ✅ | 23.9M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 34.0M | ✅ | 19.2M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.8M | ✅ | 14.3M | -4% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.6M | ✅ | 130.7M | 🟢 **-24%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 34.4M | ✅ | 14.8M | 🟢 **-57%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.8M | ✅ | 14.0M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 12.1M | ✅ | 11.4M | -6% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.6M | ✅ | 57.0M | -14% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.9M | ✅ | 57.0M | 🔴 **+97%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.8M | ✅ | 5.4M | 🟢 **-66%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.2M | ✅ | 7.9M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.0M | ✅ | 9.9M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.5M | ✅ | 6.8M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.1M | ✅ | 7.5M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.0M | ✅ | 6.6M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.6M | ✅ | 12.3M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.4M | ✅ | 19.9M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.8M | ✅ | 13.6M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.8M | ✅ | 14.1M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ✅ | 16.5M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.5M | ✅ | 16.7M | 🟢 **-43%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.9M | ✅ | 57.0M | 🔴 **+97%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.7M | ✅ | 57.0M | 🔴 **+85%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.5M | ✅ | 14.1M | 🟢 **-45%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.8M | ✅ | 18.8M | 🟢 **-32%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.6M | ✅ | 14.0M | 🟢 **-32%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ✅ | 18.5M | 🔴 **+55%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.9M | ✅ | 14.6M | 🟢 **-46%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.7M | ✅ | 20.5M | 🟢 **-37%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 41.2M | ✅ | 20.1M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.7M | ✅ | 9.2M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.7M | ✅ | 9.3M | 🟢 **-51%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ✅ | 2.9M | 🟢 **-59%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 71.8M | ✅ | 115.5M | 🔴 **+61%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.6M | ✅ | 50.8M | +2% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.8M | ✅ | 20.5M | 🟢 **-26%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.1M | ✅ | 3.3M | 🟢 **-77%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.2M | ✅ | 11.9M | 🟢 **-46%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ✅ | 11.4M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ✅ | 8.0M | 🟢 **-53%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.4M | ✅ | 23.8M | -19% |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 40.5M | ✅ | 29.3M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.5M | ✅ | 126.6M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 75.9M | ✅ | 46.3M | 🟢 **-39%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.5M | ✅ | 42.5M | 🟢 **-33%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.3M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.0M | ✅ | 22.7M | 🟢 **-56%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 111.1M | 🔴 **+39%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 122.0M | 🔴 **+45%** |
| optional/bignum.json | string | 1 | ✅ | 47.6M | ✅ | 59.9M | 🔴 **+26%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 76.6M | ✅ | 107.6M | 🔴 **+40%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 59.8M | 🔴 **+31%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.1M | ✅ | 107.5M | 🔴 **+40%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 60.0M | 🔴 **+32%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 87.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.5M | ✅ | 67.5M | +13% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.4M | ✅ | 133.5M | 🟢 **-24%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 30.9M | ✅ | 30.7M | -1% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 42.1M | ✅ | 39.1M | -7% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.7M | ✅ | 46.4M | -5% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.7M | ✅ | 52.9M | +9% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.7M | ✅ | 34.6M | -15% |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.6M | ✅ | 2.7M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 52.2M | ✅ | 66.9M | 🔴 **+28%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.0M | ✅ | 34.9M | 🔴 **+83%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.3M | ✅ | 33.7M | 🔴 **+28%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 35.1M | 🔴 **+38%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 33.1M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 34.8M | 🔴 **+35%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.5M | ✅ | 34.8M | 🔴 **+32%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.4M | ✅ | 34.7M | 🔴 **+37%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 37.1M | 🔴 **+42%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.5M | ✅ | 32.2M | +17% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.2M | ✅ | 20.1M | 🔴 **+32%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.3M | ✅ | 15.4M | +8% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 15.4M | +4% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ✅ | 32.6M | 🔴 **+24%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.4M | ✅ | 26.9M | 🔴 **+25%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.4M | ✅ | 19.3M | -18% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 12.8M | 🟢 **-38%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.5M | ✅ | 15.0M | 🟢 **-27%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 8.5M | +4% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ✅ | 10.3M | 🔴 **+26%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.4M | ✅ | 16.3M | 🟢 **-20%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.3M | ✅ | 9.3M | 🟢 **-62%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.3M | ✅ | 24.2M | -4% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.1M | ✅ | 13.5M | 🟢 **-64%** |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 40.9M | ✅ | 125K | 🟢 **-100%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.6M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.5M | ✅ | 35.1M | +2% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.0M | ✅ | 17.2M | +8% |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.3M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.8M | ✅ | 34.8M | +17% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.9M | ✅ | 933K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 33.0M | ✅ | 40.8M | 🔴 **+24%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.3M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 7.7M | 🟢 **-21%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.3M | ✅ | 19.0M | +17% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.8M | 🟢 **-24%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.0M | ✅ | 15.3M | +2% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 23.1M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.6M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.1M | ✅ | 24.0M | 🟢 **-40%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.9M | ✅ | 61.1M | +2% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.9M | ✅ | 23.0M | -14% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.2M | ✅ | 10.5M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.5M | ✅ | 28.5M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.5M | ✅ | 28.5M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.3M | ✅ | 27.0M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.2M | ✅ | 37.3M | 🟢 **-40%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.3M | ✅ | 27.1M | 🟢 **-42%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.6M | ✅ | 24.1M | -13% |
