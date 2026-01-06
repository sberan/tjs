# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | schemasafe pass | schemasafe ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.5M | 184/199 | 21.5M | 184 | -19% |
| draft6 | 276 | ✅ 276 | 29.7M | 259/276 | 23.3M | 259 | 🟢 **-22%** |
| draft7 | 313 | ✅ 313 | 15.9M | 281/313 | 21.1M | 281 | 🔴 **+32%** |
| draft2019-09 | 435 | ✅ 435 | 19.8M | 399/435 | 18.8M | 399 | -5% |
| draft2020-12 | 448 | ✅ 448 | 20.8M | 389/448 | 14.9M | 389 | 🟢 **-28%** |
| **Total** | 1671 | 1670/1671 | 20.7M | 1512/1671 | 18.9M | 1512 | -9% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **1.54x faster** (34 ns vs 53 ns per test, 6344 tests in 1512 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 38.7M | ✅ | 7.4M | 🟢 **-81%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 81.3M | ✅ | 124.9M | 🔴 **+54%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 130.0M | ✅ | 99.2M | 🟢 **-24%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 99.5M | ✅ | 135.2M | 🔴 **+36%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 128.4M | ✅ | 69.3M | 🟢 **-46%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 34.5M | ✅ | 35.6M | +3% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 51.8M | ✅ | 28.2M | 🟢 **-46%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 56.6M | ✅ | 78.8M | 🔴 **+39%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 154.3M | ✅ | 125.4M | -19% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.6M | ✅ | 42.3M | -7% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 25.5M | ✅ | 24.4M | -4% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 33.3M | ✅ | 27.0M | -19% |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 25.5M | ✅ | 24.3M | -5% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 140.7M | ✅ | 125.3M | -11% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.0M | ✅ | 16.1M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 42.5M | ✅ | 51.4M | 🔴 **+21%** |
| allOf.json | allOf | 4 | ✅ | 48.4M | ✅ | 39.1M | -19% |
| allOf.json | allOf with base schema | 5 | ✅ | 22.7M | ✅ | 24.4M | +7% |
| allOf.json | allOf simple types | 2 | ✅ | 111.3M | ✅ | 85.4M | 🟢 **-23%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 152.9M | ✅ | 125.4M | -18% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 123.2M | -19% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.5M | ✅ | 85.7M | 🔴 **+54%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 112.4M | ✅ | 85.7M | 🟢 **-24%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 48.1M | ✅ | 86.7M | 🔴 **+80%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 78.7M | ✅ | 33.1M | 🟢 **-58%** |
| anyOf.json | anyOf | 4 | ✅ | 54.4M | ✅ | 81.4M | 🔴 **+49%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 56.5M | ✅ | 26.1M | 🟢 **-54%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.9M | ✅ | 29.0M | 🟢 **-34%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 165.7M | ✅ | 133.5M | -19% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.2M | ✅ | 80.9M | 🔴 **+42%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 75.4M | 🟢 **-26%** |
| default.json | invalid string value for default | 2 | ✅ | 49.4M | ✅ | 43.4M | -12% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.9M | ✅ | 52.8M | 🟢 **-32%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 88.2M | ✅ | 71.5M | -19% |
| dependencies.json | multiple dependencies | 6 | ✅ | 29.0M | ✅ | 31.0M | +7% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 57.3M | ✅ | 34.7M | 🟢 **-39%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.6M | ✅ | 11.6M | 🟢 **-34%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.0M | ✅ | 26.7M | 🟢 **-50%** |
| enum.json | simple enum validation | 2 | ✅ | 56.3M | ✅ | 85.7M | 🔴 **+52%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.2M | ✅ | 38.0M | 🟢 **-38%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 58.0M | ✅ | 88.2M | 🔴 **+52%** |
| enum.json | enums in properties | 6 | ✅ | 48.8M | ✅ | 36.2M | 🟢 **-26%** |
| enum.json | enum with escaped characters | 3 | ✅ | 49.0M | ✅ | 69.1M | 🔴 **+41%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 103.9M | ✅ | 65.0M | 🟢 **-37%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 47.7M | ✅ | 67.2M | 🔴 **+41%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 102.4M | ✅ | 76.7M | 🟢 **-25%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.8M | ✅ | 69.1M | 🔴 **+45%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.6M | ✅ | 84.8M | 🟢 **-25%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.1M | ✅ | 79.4M | 🔴 **+50%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 112.4M | ✅ | 85.9M | 🟢 **-24%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.2M | ✅ | 76.2M | 🔴 **+43%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.1M | ✅ | 72.1M | -18% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 46.0M | ✅ | 67.0M | 🔴 **+46%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 90.5M | ✅ | 74.8M | -17% |
| format.json | email format | 6 | ✅ | 72.9M | ✅ | 122.5M | 🔴 **+68%** |
| format.json | ipv4 format | 6 | ✅ | 158.1M | ✅ | 119.1M | 🟢 **-25%** |
| format.json | ipv6 format | 6 | ✅ | 77.2M | ✅ | 106.5M | 🔴 **+38%** |
| format.json | hostname format | 6 | ✅ | 157.9M | ✅ | 130.2M | -18% |
| format.json | date-time format | 6 | ✅ | 73.2M | ✅ | 119.1M | 🔴 **+63%** |
| format.json | uri format | 6 | ✅ | 158.4M | ✅ | 112.8M | 🟢 **-29%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.9M | ✅ | 24.8M | 🟢 **-31%** |
| items.json | a schema given for items | 4 | ✅ | 87.3M | ✅ | 42.2M | 🟢 **-52%** |
| items.json | an array of schemas for items | 6 | ✅ | 54.1M | ✅ | 59.4M | +10% |
| items.json | items and subitems | 6 | ✅ | 32.6M | ✅ | 8.1M | 🟢 **-75%** |
| items.json | nested items | 3 | ✅ | 13.1M | ✅ | 6.3M | 🟢 **-52%** |
| items.json | items with null instance elements | 1 | ✅ | 70.1M | ✅ | 66.4M | -5% |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.0M | ✅ | 69.3M | -8% |
| maxItems.json | maxItems validation | 4 | ✅ | 64.4M | ✅ | 46.2M | 🟢 **-28%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.5M | ✅ | 21.8M | 🟢 **-59%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 49.8M | ✅ | 67.8M | 🔴 **+36%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 39.4M | ✅ | 48.8M | 🔴 **+24%** |
| maximum.json | maximum validation | 4 | ✅ | 61.6M | ✅ | 97.3M | 🔴 **+58%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 60.7M | ✅ | 95.5M | 🔴 **+57%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 61.6M | ✅ | 96.3M | 🔴 **+56%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 53.2M | ✅ | 82.4M | 🔴 **+55%** |
| minItems.json | minItems validation | 4 | ✅ | 65.5M | ✅ | 94.3M | 🔴 **+44%** |
| minLength.json | minLength validation | 5 | ✅ | 47.4M | ✅ | 35.3M | 🟢 **-25%** |
| minProperties.json | minProperties validation | 6 | ✅ | 49.9M | ✅ | 68.4M | 🔴 **+37%** |
| minimum.json | minimum validation | 4 | ✅ | 61.8M | ✅ | 94.3M | 🔴 **+53%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 60.6M | ✅ | 93.8M | 🔴 **+55%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 52.7M | ✅ | 79.5M | 🔴 **+51%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.9M | ✅ | 90.0M | 🔴 **+56%** |
| multipleOf.json | by int | 3 | ✅ | 60.9M | ✅ | 93.5M | 🔴 **+54%** |
| multipleOf.json | by number | 3 | ✅ | 56.0M | ✅ | 59.3M | +6% |
| multipleOf.json | by small number | 2 | ✅ | 51.4M | ✅ | 27.1M | 🟢 **-47%** |
| multipleOf.json | float division = inf | 1 | ✅ | 38.9M | ✅ | 1.0M | 🟢 **-97%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.5M | ✅ | 17.2M | 🟢 **-73%** |
| not.json | not | 2 | ✅ | 56.0M | ✅ | 83.1M | 🔴 **+48%** |
| not.json | not multiple types | 3 | ✅ | 49.5M | ✅ | 65.2M | 🔴 **+32%** |
| not.json | not more complex schema | 3 | ✅ | 52.4M | ✅ | 49.7M | -5% |
| not.json | forbidden property | 2 | ✅ | 42.2M | ✅ | 59.6M | 🔴 **+41%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 40.4M | ✅ | 62.9M | 🔴 **+56%** |
| not.json | double negation | 1 | ✅ | 154.2M | ✅ | 125.3M | -19% |
| oneOf.json | oneOf | 4 | ✅ | 46.2M | ✅ | 70.2M | 🔴 **+52%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 28.8M | ✅ | 27.3M | -5% |
| oneOf.json | oneOf complex types | 4 | ✅ | 37.2M | ✅ | 27.9M | 🟢 **-25%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.0M | ✅ | 84.2M | 🔴 **+53%** |
| oneOf.json | oneOf with required | 4 | ✅ | 38.0M | ✅ | 25.8M | 🟢 **-32%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 40.1M | ✅ | 30.7M | 🟢 **-23%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.5M | ✅ | 85.6M | 🔴 **+54%** |
| pattern.json | pattern validation | 8 | ✅ | 48.3M | ✅ | 71.4M | 🔴 **+48%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.1M | ✅ | 60.5M | 🔴 **+31%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ✅ | 16.7M | 🟢 **-35%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ✅ | 14.2M | -2% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.0M | ✅ | 13.2M | 🟢 **-23%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 22.6M | 🔴 **+31%** |
| properties.json | object properties validation | 6 | ✅ | 45.4M | ✅ | 52.7M | +16% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.1M | ✅ | 11.0M | 🟢 **-43%** |
| properties.json | properties with escaped characters | 2 | ✅ | 36.0M | ✅ | 24.5M | 🟢 **-32%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 60.3M | +0% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.8M | ✅ | 29.4M | +18% |
| ref.json | root pointer ref | 4 | ✅ | 22.5M | ✅ | 13.9M | 🟢 **-38%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.0M | ✅ | 29.1M | 🟢 **-29%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 45.9M | ✅ | 24.8M | 🟢 **-46%** |
| ref.json | escaped pointer ref | 6 | ✅ | 36.9M | ✅ | 29.6M | -20% |
| ref.json | nested refs | 2 | ✅ | 43.5M | ✅ | 11.1M | 🟢 **-75%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 42.4M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 53.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 42.5M | ✅ | 49.5M | +16% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.5M | ✅ | 29.2M | 🟢 **-31%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.7M | ✅ | 2.7M | 🟢 **-75%** |
| ref.json | refs with quote | 2 | ✅ | 41.8M | ✅ | 29.5M | 🟢 **-29%** |
| ref.json | Location-independent identifier | 2 | ✅ | 56.0M | ✅ | 43.7M | 🟢 **-22%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 53.4M | ✅ | 42.9M | -20% |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 44.8M | ✅ | 44.2M | -1% |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 53.1M | ✅ | 43.4M | -18% |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.5M | ✅ | 43.2M | 🟢 **-22%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.5M | ✅ | 43.4M | 🟢 **-22%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.5M | ✅ | 43.3M | 🟢 **-22%** |
| refRemote.json | remote ref | 2 | ✅ | 53.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 34.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 51.8M | ✅ | 82.5M | 🔴 **+59%** |
| required.json | required default validation | 1 | ✅ | 154.3M | ✅ | 125.4M | -19% |
| required.json | required with escaped characters | 2 | ✅ | 40.3M | ✅ | 24.0M | 🟢 **-40%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.3M | ✅ | 36.0M | 🔴 **+55%** |
| type.json | integer type matches integers | 8 | ✅ | 41.7M | ✅ | 59.9M | 🔴 **+44%** |
| type.json | number type matches numbers | 9 | ✅ | 45.4M | ✅ | 74.7M | 🔴 **+65%** |
| type.json | string type matches strings | 9 | ✅ | 47.6M | ✅ | 73.2M | 🔴 **+54%** |
| type.json | object type matches objects | 7 | ✅ | 41.2M | ✅ | 59.2M | 🔴 **+44%** |
| type.json | array type matches arrays | 7 | ✅ | 44.3M | ✅ | 59.1M | 🔴 **+34%** |
| type.json | boolean type matches booleans | 10 | ✅ | 43.7M | ✅ | 63.4M | 🔴 **+45%** |
| type.json | null type matches only the null object | 10 | ✅ | 51.4M | ✅ | 60.2M | +17% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.6M | ✅ | 70.0M | 🔴 **+31%** |
| type.json | type as array with one item | 2 | ✅ | 52.3M | ✅ | 87.7M | 🔴 **+68%** |
| type.json | type: array or object | 5 | ✅ | 48.8M | ✅ | 66.3M | 🔴 **+36%** |
| type.json | type: array, object or null | 5 | ✅ | 55.0M | ✅ | 81.3M | 🔴 **+48%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ✅ | 8.0M | 🟢 **-53%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 27.9M | ✅ | 23.3M | -17% |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.5M | ✅ | 28.6M | 🔴 **+64%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 144.4M | ✅ | 129.2M | -10% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.0M | ✅ | 47.2M | 🟢 **-32%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.1M | ✅ | 42.2M | 🟢 **-27%** |
| optional/bignum.json | integer | 2 | ✅ | 72.3M | ✅ | 121.7M | 🔴 **+68%** |
| optional/bignum.json | number | 2 | ✅ | 75.9M | ✅ | 126.8M | 🔴 **+67%** |
| optional/bignum.json | string | 1 | ✅ | 42.4M | ✅ | 62.2M | 🔴 **+47%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.2M | ✅ | 111.2M | 🔴 **+58%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.8M | ✅ | 60.2M | 🔴 **+47%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.2M | ✅ | 111.1M | 🔴 **+58%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.8M | ✅ | 60.2M | 🔴 **+48%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.7M | ✅ | 70.7M | 🔴 **+45%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.2M | ✅ | 35.9M | 🔴 **+97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.2M | ✅ | 36.1M | 🔴 **+49%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.1M | ✅ | 36.0M | 🔴 **+49%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.1M | ✅ | 31.9M | 🔴 **+27%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.6M | ✅ | 35.6M | 🔴 **+45%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.3M | ✅ | 36.6M | 🔴 **+51%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.1M | ✅ | 36.1M | 🔴 **+50%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 31.0M | ✅ | 38.2M | 🔴 **+23%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.3M | ✅ | 33.5M | 🔴 **+32%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.2M | ✅ | 20.4M | 🔴 **+27%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.6M | ✅ | 15.6M | +15% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.9M | ✅ | 16.0M | +15% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.5M | ✅ | 33.7M | 🔴 **+37%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.3M | ✅ | 28.1M | 🔴 **+39%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.5M | ✅ | 19.8M | -12% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.9M | ✅ | 13.6M | 🟢 **-24%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ✅ | 14.9M | 🟢 **-25%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 9.2M | +15% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ✅ | 10.7M | 🔴 **+26%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ✅ | 15.8M | -19% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.5M | ✅ | 9.3M | 🟢 **-61%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.7M | ✅ | 13.3M | 🟢 **-25%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.6M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.2M | ✅ | 34.6M | -2% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.1M | ✅ | 18.4M | +14% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 73.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.8M | 🟢 **-24%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 36.8M | ✅ | 25.4M | 🟢 **-31%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.0M | ✅ | 32.4M | 🔴 **+25%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.4M | ✅ | 9.9M | 🟢 **-39%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.4M | ✅ | 7.5M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 39.0M | ✅ | 15.7M | 🟢 **-60%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.3M | ✅ | 125.4M | 🟢 **-21%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.9M | ✅ | 99.9M | 🔴 **+30%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.9M | ✅ | 135.5M | 🟢 **-21%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 69.3M | -17% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 36.0M | 🟢 **-37%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.5M | ✅ | 27.4M | 🟢 **-29%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 59.3M | 🟢 **-45%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ✅ | 125.4M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 57.4M | ✅ | 22.9M | 🟢 **-60%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.7M | ✅ | 24.2M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 48.8M | ✅ | 26.4M | 🟢 **-46%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.5M | ✅ | 25.1M | 🟢 **-29%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ✅ | 125.4M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 16.5M | 🟢 **-43%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.1M | ✅ | 51.6M | 🟢 **-22%** |
| allOf.json | allOf | 4 | ✅ | 34.7M | ✅ | 19.7M | 🟢 **-43%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.8M | ✅ | 25.0M | -16% |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 83.9M | 🔴 **+38%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 125.3M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ✅ | 64.4M | 🔴 **+29%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.6M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.2M | ✅ | 124.8M | 🟢 **-22%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ✅ | 125.0M | 🟢 **-22%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.0M | ✅ | 87.2M | 🔴 **+41%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 81.9M | 🟢 **-29%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 86.3M | 🔴 **+33%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 59.0M | 🟢 **-29%** |
| anyOf.json | anyOf | 4 | ✅ | 66.6M | ✅ | 81.4M | 🔴 **+22%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.0M | ✅ | 27.2M | 🟢 **-47%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.4M | ✅ | 124.6M | 🟢 **-22%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 125.3M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 65.1M | 🔴 **+31%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.7M | ✅ | 30.4M | 🟢 **-59%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.8M | ✅ | 133.4M | 🟢 **-22%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.7M | ✅ | 86.5M | 🟢 **-28%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 184.1M | ✅ | 136.5M | 🟢 **-26%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 88.5M | ✅ | 62.5M | 🟢 **-29%** |
| const.json | const validation | 3 | ✅ | 55.1M | ✅ | 60.3M | +10% |
| const.json | const with object | 4 | ✅ | 50.2M | ✅ | 31.6M | 🟢 **-37%** |
| const.json | const with array | 3 | ✅ | 48.8M | ✅ | 9.1M | 🟢 **-81%** |
| const.json | const with null | 2 | ✅ | 117.8M | ✅ | 86.7M | 🟢 **-26%** |
| const.json | const with false does not match 0 | 3 | ✅ | 58.7M | ✅ | 73.8M | 🔴 **+26%** |
| const.json | const with true does not match 1 | 3 | ✅ | 107.7M | ✅ | 75.6M | 🟢 **-30%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ✅ | 31.1M | 🟢 **-43%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.0M | ✅ | 32.5M | 🟢 **-66%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 44.5M | ✅ | 31.7M | 🟢 **-29%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 92.7M | ✅ | 23.6M | 🟢 **-74%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ✅ | 36.6M | 🟢 **-31%** |
| const.json | const with 1 does not match true | 3 | ✅ | 114.4M | ✅ | 89.3M | 🟢 **-22%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 53.8M | ✅ | 67.2M | 🔴 **+25%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.2M | ✅ | 39.3M | 🟢 **-64%** |
| const.json | nul characters in strings | 2 | ✅ | 54.9M | ✅ | 73.0M | 🔴 **+33%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 77.5M | ✅ | 53.5M | 🟢 **-31%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 55.2M | ✅ | 70.4M | 🔴 **+28%** |
| contains.json | contains keyword validation | 6 | ✅ | 51.4M | ✅ | 18.4M | 🟢 **-64%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.3M | ✅ | 13.7M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ✅ | 35.0M | 🟢 **-66%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ✅ | 42.8M | 🟢 **-26%** |
| contains.json | items + contains | 4 | ✅ | 57.0M | ✅ | 9.5M | 🟢 **-83%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 18.7M | 🟢 **-77%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 75.2M | 🟢 **-26%** |
| default.json | invalid string value for default | 2 | ✅ | 50.4M | ✅ | 48.0M | -5% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 38.3M | ✅ | 49.7M | 🔴 **+30%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.7M | ✅ | 71.9M | 🟢 **-21%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.8M | ✅ | 138.2M | 🟢 **-21%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.9M | ✅ | 31.4M | 🟢 **-21%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 39.8M | ✅ | 35.2M | -12% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 85.5M | ✅ | 54.3M | 🟢 **-36%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.8M | ✅ | 16.3M | -13% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 48.1M | ✅ | 26.5M | 🟢 **-45%** |
| enum.json | simple enum validation | 2 | ✅ | 31.9M | ✅ | 85.2M | 🔴 **+167%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 57.2M | ✅ | 34.4M | 🟢 **-40%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 58.4M | ✅ | 88.9M | 🔴 **+52%** |
| enum.json | enums in properties | 6 | ✅ | 55.4M | ✅ | 40.8M | 🟢 **-26%** |
| enum.json | enum with escaped characters | 3 | ✅ | 70.3M | ✅ | 95.2M | 🔴 **+35%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.1M | ✅ | 76.2M | 🟢 **-31%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.0M | ✅ | 67.5M | 🔴 **+30%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.4M | ✅ | 66.7M | 🟢 **-38%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 52.3M | ✅ | 69.0M | 🔴 **+32%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 88.6M | 🟢 **-23%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.3M | ✅ | 82.0M | 🔴 **+38%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 104.5M | ✅ | 89.3M | -15% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ✅ | 80.8M | 🔴 **+37%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 73.9M | -17% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.5M | ✅ | 77.3M | 🔴 **+39%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.9M | ✅ | 79.9M | 🟢 **-29%** |
| format.json | email format | 6 | ✅ | 81.4M | ✅ | 132.7M | 🔴 **+63%** |
| format.json | ipv4 format | 6 | ✅ | 162.3M | ✅ | 131.6M | -19% |
| format.json | ipv6 format | 6 | ✅ | 87.9M | ✅ | 111.6M | 🔴 **+27%** |
| format.json | hostname format | 6 | ✅ | 163.1M | ✅ | 133.0M | -18% |
| format.json | date-time format | 6 | ✅ | 87.2M | ✅ | 109.4M | 🔴 **+26%** |
| format.json | json-pointer format | 6 | ✅ | 162.9M | ✅ | 129.9M | 🟢 **-20%** |
| format.json | uri format | 6 | ✅ | 81.2M | ✅ | 128.8M | 🔴 **+59%** |
| format.json | uri-reference format | 6 | ✅ | 163.6M | ✅ | 122.7M | 🟢 **-25%** |
| format.json | uri-template format | 6 | ✅ | 88.3M | ✅ | 132.5M | 🔴 **+50%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.4M | ✅ | 24.8M | 🟢 **-57%** |
| items.json | a schema given for items | 4 | ✅ | 55.7M | ✅ | 42.2M | 🟢 **-24%** |
| items.json | an array of schemas for items | 6 | ✅ | 108.9M | ✅ | 59.5M | 🟢 **-45%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.9M | ✅ | 135.4M | 🟢 **-21%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ✅ | 66.0M | 🟢 **-37%** |
| items.json | items with boolean schemas | 3 | ✅ | 62.1M | ✅ | 78.0M | 🔴 **+26%** |
| items.json | items and subitems | 6 | ✅ | 34.7M | ✅ | 8.2M | 🟢 **-76%** |
| items.json | nested items | 3 | ✅ | 12.7M | ✅ | 6.7M | 🟢 **-47%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 66.4M | -14% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 69.3M | -16% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ✅ | 98.5M | 🔴 **+34%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 78.3M | 🔴 **+23%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.0M | ✅ | 46.5M | 🟢 **-21%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.6M | ✅ | 51.4M | -1% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.7M | ✅ | 68.5M | 🔴 **+30%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.8M | ✅ | 46.6M | +12% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 40.2M | ✅ | 47.8M | +19% |
| maximum.json | maximum validation | 4 | ✅ | 68.9M | ✅ | 95.9M | 🔴 **+39%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.5M | ✅ | 101.6M | 🔴 **+50%** |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ✅ | 95.9M | 🔴 **+30%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.1M | ✅ | 77.8M | 🔴 **+23%** |
| minLength.json | minLength validation | 5 | ✅ | 52.9M | ✅ | 35.7M | 🟢 **-32%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.2M | ✅ | 49.1M | -6% |
| minProperties.json | minProperties validation | 6 | ✅ | 53.8M | ✅ | 68.0M | 🔴 **+26%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.2M | ✅ | 48.4M | +15% |
| minimum.json | minimum validation | 4 | ✅ | 66.2M | ✅ | 97.2M | 🔴 **+47%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.7M | ✅ | 89.1M | 🔴 **+38%** |
| multipleOf.json | by int | 3 | ✅ | 68.6M | ✅ | 95.9M | 🔴 **+40%** |
| multipleOf.json | by number | 3 | ✅ | 63.7M | ✅ | 59.3M | -7% |
| multipleOf.json | by small number | 2 | ✅ | 56.7M | ✅ | 27.0M | 🟢 **-52%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 1.0M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 17.2M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 85.8M | 🔴 **+36%** |
| not.json | not multiple types | 3 | ✅ | 56.0M | ✅ | 74.1M | 🔴 **+32%** |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ✅ | 47.9M | -18% |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 59.5M | 🔴 **+29%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.9M | ✅ | 62.4M | 🔴 **+27%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 48.8M | ✅ | 57.6M | +18% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.4M | ✅ | 138.5M | 🟢 **-23%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 102.3M | 🟢 **-36%** |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ✅ | 76.0M | 🔴 **+49%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.8M | ✅ | 25.9M | 🟢 **-21%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ✅ | 63.8M | 🔴 **+28%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.6M | ✅ | 114.1M | 🟢 **-28%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 64.2M | 🔴 **+29%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 64.5M | 🔴 **+29%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.1M | ✅ | 29.2M | 🟢 **-27%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 85.2M | 🔴 **+38%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.0M | ✅ | 26.6M | 🟢 **-35%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ✅ | 32.8M | 🟢 **-25%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 83.1M | 🔴 **+33%** |
| pattern.json | pattern validation | 8 | ✅ | 52.6M | ✅ | 73.1M | 🔴 **+39%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.4M | ✅ | 60.5M | 🔴 **+28%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.7M | ✅ | 17.1M | 🟢 **-31%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.2M | ✅ | 15.0M | +5% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.6M | ✅ | 13.5M | 🟢 **-23%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ✅ | 18.1M | -14% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 11.4M | ✅ | 22.7M | 🔴 **+100%** |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ✅ | 54.2M | +9% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.0M | ✅ | 11.6M | 🟢 **-39%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.3M | ✅ | 55.1M | 🔴 **+30%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.8M | ✅ | 25.1M | 🟢 **-44%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 60.3M | -7% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.9M | ✅ | 27.6M | +7% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.1M | ✅ | 41.5M | -4% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ✅ | 17.0M | -10% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.2M | ✅ | 132.0M | 🟢 **-23%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.9M | ✅ | 25.1M | 🟢 **-43%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.2M | ✅ | 30.4M | 🟢 **-21%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.8M | ✅ | 33.1M | -19% |
| ref.json | root pointer ref | 4 | ✅ | 23.9M | ✅ | 13.9M | 🟢 **-42%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 57.2M | ✅ | 27.3M | 🟢 **-52%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ✅ | 25.1M | 🟢 **-51%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.1M | ✅ | 29.3M | 🟢 **-27%** |
| ref.json | nested refs | 2 | ✅ | 47.4M | ✅ | 11.7M | 🟢 **-75%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.8M | ✅ | 48.5M | +4% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.9M | ✅ | 29.2M | 🟢 **-38%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.1M | ✅ | 121.2M | 🟢 **-24%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 32.3M | 🟢 **-35%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ✅ | 2.9M | 🟢 **-69%** |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ✅ | 28.9M | 🟢 **-38%** |
| ref.json | Location-independent identifier | 2 | ✅ | 57.4M | ✅ | 42.6M | 🟢 **-26%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.8M | ✅ | 42.5M | 🟢 **-29%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.4M | ✅ | 43.2M | 🟢 **-27%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.0M | ✅ | 37.9M | -19% |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ✅ | 10.7M | 🟢 **-71%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.3M | ✅ | 10.7M | 🟢 **-70%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 25.6M | 🟢 **-24%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.7M | ✅ | 28.6M | 🟢 **-39%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ✅ | 28.9M | 🟢 **-38%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ✅ | 30.3M | 🟢 **-35%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.7M | ✅ | 28.9M | 🟢 **-38%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.9M | ✅ | 28.8M | 🟢 **-39%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.4M | ✅ | 28.6M | 🟢 **-40%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.5M | ✅ | 43.0M | 🟢 **-28%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 42.8M | 🟢 **-31%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 42.8M | 🟢 **-31%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 42.9M | 🟢 **-31%** |
| refRemote.json | remote ref | 2 | ✅ | 59.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 58.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 46.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.0M | ✅ | 82.9M | 🔴 **+43%** |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 125.0M | 🟢 **-21%** |
| required.json | required with empty array | 1 | ✅ | 159.2M | ✅ | 125.4M | 🟢 **-21%** |
| required.json | required with escaped characters | 2 | ✅ | 44.4M | ✅ | 24.0M | 🟢 **-46%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ✅ | 35.7M | 🔴 **+42%** |
| type.json | integer type matches integers | 9 | ✅ | 52.8M | ✅ | 64.8M | 🔴 **+23%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 73.9M | 🔴 **+34%** |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 71.8M | 🔴 **+31%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 59.5M | 🔴 **+29%** |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ✅ | 58.9M | +14% |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 61.3M | +18% |
| type.json | null type matches only the null object | 10 | ✅ | 48.1M | ✅ | 59.8M | 🔴 **+24%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ✅ | 69.6M | 🔴 **+34%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 87.4M | 🔴 **+40%** |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 64.9M | +17% |
| type.json | type: array, object or null | 5 | ✅ | 64.4M | ✅ | 75.2M | +17% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ✅ | 7.8M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.2M | ✅ | 23.9M | 🟢 **-23%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 29.8M | 🔴 **+64%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 155.6M | ✅ | 130.4M | -16% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.3M | ✅ | 47.2M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 68.6M | ✅ | 42.7M | 🟢 **-38%** |
| optional/bignum.json | integer | 2 | ✅ | 79.8M | ✅ | 121.9M | 🔴 **+53%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 126.8M | 🔴 **+51%** |
| optional/bignum.json | string | 1 | ✅ | 47.6M | ✅ | 61.9M | 🔴 **+30%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 111.2M | 🔴 **+44%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 60.3M | 🔴 **+32%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 76.6M | ✅ | 110.2M | 🔴 **+44%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 59.8M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 71.4M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 17.2M | ✅ | 36.1M | 🔴 **+109%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 35.9M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 18.9M | ✅ | 35.9M | 🔴 **+90%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.4M | ✅ | 33.6M | 🔴 **+27%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.6M | ✅ | 35.5M | 🔴 **+39%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.8M | ✅ | 34.8M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.2M | ✅ | 35.9M | 🔴 **+37%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 38.2M | 🔴 **+47%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 33.6M | 🔴 **+21%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ✅ | 20.2M | 🔴 **+22%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.2M | ✅ | 16.2M | +14% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ✅ | 16.0M | +9% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ✅ | 27.0M | +3% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.0M | ✅ | 26.3M | 🔴 **+38%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 20.5M | -12% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.5M | ✅ | 13.1M | 🟢 **-36%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ✅ | 14.5M | 🟢 **-30%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 9.0M | +16% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ✅ | 11.0M | 🔴 **+28%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.4M | ✅ | 15.9M | 🟢 **-22%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ✅ | 9.5M | 🟢 **-61%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.1M | ✅ | 14.3M | 🟢 **-21%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.5M | ✅ | 34.6M | -10% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ✅ | 17.5M | +6% |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.8M | ✅ | 35.6M | +19% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.7M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ✅ | 7.8M | -18% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.2M | ✅ | 19.1M | +18% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.8M | 🟢 **-24%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.5M | ✅ | 24.7M | 🟢 **-39%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 43.1M | ✅ | 31.8M | 🟢 **-26%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 41.8M | ✅ | 32.8M | 🟢 **-22%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.7M | ✅ | 34.6M | 🔴 **+29%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.0M | ✅ | 9.8M | 🟢 **-42%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.9M | ✅ | 25.4M | -9% |

### draft7

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 56.5M | ✅ | 7.4M | 🟢 **-87%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 43.5M | ✅ | 16.0M | 🟢 **-63%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.3M | ✅ | 124.4M | 🟢 **-22%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.3M | ✅ | 96.5M | 🔴 **+26%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 135.0M | 🟢 **-21%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 69.3M | -17% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 35.9M | 🟢 **-37%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.1M | ✅ | 28.5M | 🟢 **-37%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.4M | ✅ | 76.7M | 🟢 **-29%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ✅ | 125.4M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 66.5M | ✅ | 43.3M | 🟢 **-35%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.2M | ✅ | 23.4M | 🟢 **-27%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.9M | ✅ | 26.8M | 🟢 **-40%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.7M | ✅ | 24.5M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 125.4M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.6M | ✅ | 17.4M | 🟢 **-39%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 51.5M | 🟢 **-23%** |
| allOf.json | allOf | 4 | ✅ | 34.1M | ✅ | 40.0M | +17% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.1M | ✅ | 25.4M | -16% |
| allOf.json | allOf simple types | 2 | ✅ | 51.1M | ✅ | 85.8M | 🔴 **+68%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.8M | ✅ | 124.9M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ✅ | 63.8M | 🔴 **+28%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.4M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ✅ | 125.4M | 🟢 **-21%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 125.5M | 🟢 **-21%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 52.2M | ✅ | 86.5M | 🔴 **+66%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 85.8M | 🟢 **-26%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.4M | ✅ | 86.5M | 🔴 **+41%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.6M | ✅ | 59.7M | 🟢 **-28%** |
| anyOf.json | anyOf | 4 | ✅ | 66.5M | ✅ | 89.9M | 🔴 **+35%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.1M | ✅ | 27.4M | 🟢 **-39%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 125.4M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 158.9M | ✅ | 122.2M | 🟢 **-23%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 64.6M | 🔴 **+30%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.5M | ✅ | 30.5M | 🟢 **-59%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.3M | ✅ | 135.0M | 🟢 **-21%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.4M | ✅ | 87.2M | 🟢 **-27%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 176.2M | ✅ | 138.6M | 🟢 **-21%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.2M | ✅ | 55.6M | 🟢 **-38%** |
| const.json | const validation | 3 | ✅ | 50.6M | ✅ | 68.6M | 🔴 **+36%** |
| const.json | const with object | 4 | ✅ | 49.7M | ✅ | 32.8M | 🟢 **-34%** |
| const.json | const with array | 3 | ✅ | 45.7M | ✅ | 8.8M | 🟢 **-81%** |
| const.json | const with null | 2 | ✅ | 116.9M | ✅ | 87.6M | 🟢 **-25%** |
| const.json | const with false does not match 0 | 3 | ✅ | 60.0M | ✅ | 63.8M | +6% |
| const.json | const with true does not match 1 | 3 | ✅ | 107.4M | ✅ | 75.1M | 🟢 **-30%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.2M | ✅ | 69.3M | 🔴 **+28%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ✅ | 69.3M | 🟢 **-27%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.6M | ✅ | 33.5M | 🟢 **-35%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 92.9M | ✅ | 33.5M | 🟢 **-64%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 52.4M | ✅ | 65.6M | 🔴 **+25%** |
| const.json | const with 1 does not match true | 3 | ✅ | 57.8M | ✅ | 91.4M | 🔴 **+58%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.7M | ✅ | 70.9M | 🔴 **+27%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 108.2M | ✅ | 78.4M | 🟢 **-28%** |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 73.7M | 🔴 **+33%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ✅ | 66.8M | -14% |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 74.5M | 🔴 **+32%** |
| contains.json | contains keyword validation | 6 | ✅ | 103.3M | ✅ | 20.0M | 🟢 **-81%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ✅ | 14.6M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ✅ | 73.0M | 🟢 **-30%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.8M | ✅ | 39.5M | 🟢 **-32%** |
| contains.json | items + contains | 4 | ✅ | 59.1M | ✅ | 17.9M | 🟢 **-70%** |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ✅ | 73.0M | 🔴 **+22%** |
| contains.json | contains with null instance elements | 1 | ✅ | 128.8M | ✅ | 38.0M | 🟢 **-70%** |
| default.json | invalid type for default | 2 | ✅ | 66.5M | ✅ | 75.6M | +14% |
| default.json | invalid string value for default | 2 | ✅ | 71.3M | ✅ | 38.8M | 🟢 **-46%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.3M | ✅ | 57.4M | +16% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 13.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 59.3M | ✅ | 72.4M | 🔴 **+22%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.5M | ✅ | 136.9M | 🟢 **-22%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.7M | ✅ | 31.5M | +3% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 39.9M | ✅ | 35.3M | -11% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 50.2M | ✅ | 54.5M | +9% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.6M | ✅ | 16.7M | -10% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 37.7M | ✅ | 26.8M | 🟢 **-29%** |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 85.2M | 🔴 **+34%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 41.4M | ✅ | 38.7M | -7% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.8M | ✅ | 89.4M | 🔴 **+38%** |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ✅ | 41.0M | +8% |
| enum.json | enum with escaped characters | 3 | ✅ | 71.3M | ✅ | 91.4M | 🔴 **+28%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 58.4M | ✅ | 73.6M | 🔴 **+26%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.0M | ✅ | 69.3M | 🔴 **+28%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 59.4M | ✅ | 76.1M | 🔴 **+28%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ✅ | 64.9M | 🔴 **+20%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.2M | ✅ | 88.8M | 🔴 **+34%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.1M | ✅ | 82.2M | 🔴 **+39%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.4M | ✅ | 91.7M | 🔴 **+38%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 60.4M | ✅ | 81.1M | 🔴 **+34%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.2M | ✅ | 73.1M | 🔴 **+32%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.7M | ✅ | 79.5M | 🔴 **+33%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 56.7M | ✅ | 77.3M | 🔴 **+36%** |
| format.json | email format | 6 | ✅ | 87.4M | ✅ | 133.1M | 🔴 **+52%** |
| format.json | idn-email format | 6 | ✅ | 88.3M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 87.9M | ✅ | 132.6M | 🔴 **+51%** |
| format.json | ipv4 format | 6 | ✅ | 87.7M | ✅ | 118.7M | 🔴 **+35%** |
| format.json | ipv6 format | 6 | ✅ | 86.4M | ✅ | 119.3M | 🔴 **+38%** |
| format.json | idn-hostname format | 6 | ✅ | 87.4M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 87.7M | ✅ | 133.5M | 🔴 **+52%** |
| format.json | date format | 6 | ✅ | 86.8M | ✅ | 106.7M | 🔴 **+23%** |
| format.json | date-time format | 6 | ✅ | 88.3M | ✅ | 132.6M | 🔴 **+50%** |
| format.json | time format | 6 | ✅ | 85.5M | ✅ | 120.3M | 🔴 **+41%** |
| format.json | json-pointer format | 6 | ✅ | 85.0M | ✅ | 131.8M | 🔴 **+55%** |
| format.json | relative-json-pointer format | 6 | ✅ | 88.0M | ✅ | 129.9M | 🔴 **+48%** |
| format.json | iri format | 6 | ✅ | 87.9M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 88.2M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 88.1M | ✅ | 112.3M | 🔴 **+27%** |
| format.json | uri-reference format | 6 | ✅ | 88.1M | ✅ | 131.4M | 🔴 **+49%** |
| format.json | uri-template format | 6 | ✅ | 88.2M | ✅ | 132.5M | 🔴 **+50%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ✅ | 135.6M | 🟢 **-21%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.2M | ✅ | 135.5M | 🟢 **-21%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 132.4M | 🟢 **-23%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.4M | ✅ | 94.4M | 🔴 **+34%** |
| if-then-else.json | if and else without then | 3 | ✅ | 62.3M | ✅ | 94.5M | 🔴 **+52%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.3M | ✅ | 79.8M | 🔴 **+30%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 169.7M | ✅ | 128.1M | 🟢 **-24%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ✅ | 85.3M | 🔴 **+32%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ✅ | 80.9M | 🔴 **+26%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.9M | ✅ | 36.6M | -11% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.7M | ✅ | 25.1M | 🟢 **-35%** |
| items.json | a schema given for items | 4 | ✅ | 60.1M | ✅ | 43.4M | 🟢 **-28%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.0M | ✅ | 58.3M | -10% |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.2M | ✅ | 135.4M | 🟢 **-20%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 70.6M | ✅ | 66.4M | -6% |
| items.json | items with boolean schemas | 3 | ✅ | 61.8M | ✅ | 79.5M | 🔴 **+29%** |
| items.json | items and subitems | 6 | ✅ | 28.9M | ✅ | 7.9M | 🟢 **-73%** |
| items.json | nested items | 3 | ✅ | 13.5M | ✅ | 6.6M | 🟢 **-51%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 66.4M | -14% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 69.3M | -16% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 99.2M | 🔴 **+34%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 81.5M | 🔴 **+28%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.8M | ✅ | 40.5M | 🟢 **-31%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.7M | ✅ | 46.8M | -9% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.7M | ✅ | 68.5M | 🔴 **+28%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 43.1M | ✅ | 47.8M | +11% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.9M | ✅ | 49.1M | +17% |
| maximum.json | maximum validation | 4 | ✅ | 69.1M | ✅ | 97.3M | 🔴 **+41%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 101.9M | 🔴 **+51%** |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ✅ | 99.5M | 🔴 **+35%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.0M | ✅ | 81.0M | 🔴 **+29%** |
| minLength.json | minLength validation | 5 | ✅ | 52.8M | ✅ | 34.6M | 🟢 **-35%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 47.5M | -9% |
| minProperties.json | minProperties validation | 6 | ✅ | 55.1M | ✅ | 69.0M | 🔴 **+25%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.9M | ✅ | 48.0M | +9% |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ✅ | 45.9M | 🟢 **-33%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.6M | ✅ | 85.5M | 🔴 **+32%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 90.7M | 🔴 **+31%** |
| multipleOf.json | by number | 3 | ✅ | 64.0M | ✅ | 55.7M | -13% |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 26.9M | 🟢 **-53%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.1M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.7M | ✅ | 17.1M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 84.5M | 🔴 **+34%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 73.0M | 🔴 **+30%** |
| not.json | not more complex schema | 3 | ✅ | 59.3M | ✅ | 48.4M | -18% |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 26.2M | 🟢 **-43%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.0M | ✅ | 62.3M | 🔴 **+27%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.0M | ✅ | 62.3M | 🔴 **+27%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 184.0M | ✅ | 122.5M | 🟢 **-33%** |
| not.json | double negation | 1 | ✅ | 159.6M | ✅ | 125.1M | 🟢 **-22%** |
| oneOf.json | oneOf | 4 | ✅ | 59.6M | ✅ | 70.1M | +18% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.5M | ✅ | 26.7M | 🟢 **-20%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 65.0M | 🔴 **+30%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.7M | ✅ | 124.6M | 🟢 **-22%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 64.8M | 🔴 **+30%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 64.7M | 🔴 **+30%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.0M | ✅ | 28.8M | 🟢 **-28%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 87.0M | 🔴 **+41%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.8M | ✅ | 13.0M | 🟢 **-71%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ✅ | 32.3M | 🟢 **-26%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 86.0M | 🔴 **+38%** |
| pattern.json | pattern validation | 8 | ✅ | 49.6M | ✅ | 36.9M | 🟢 **-26%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.3M | ✅ | 64.9M | 🔴 **+37%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.9M | ✅ | 16.5M | 🟢 **-36%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 14.6M | -2% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.9M | ✅ | 13.6M | -19% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.0M | ✅ | 19.4M | -3% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 10.9M | 🟢 **-39%** |
| properties.json | object properties validation | 6 | ✅ | 49.7M | ✅ | 53.8M | +8% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 10.9M | 🟢 **-45%** |
| properties.json | properties with boolean schema | 4 | ✅ | 41.8M | ✅ | 55.0M | 🔴 **+32%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.9M | ✅ | 23.4M | 🟢 **-48%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 60.3M | -7% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.9M | ✅ | 29.7M | +15% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.3M | ✅ | 41.6M | -6% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.2M | ✅ | 16.6M | -9% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.8M | ✅ | 135.6M | 🟢 **-21%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.6M | ✅ | 25.5M | 🟢 **-40%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 41.2M | ✅ | 30.7M | 🟢 **-25%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.3M | ✅ | 33.3M | 🟢 **-21%** |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ✅ | 14.3M | 🟢 **-41%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.2M | ✅ | 29.3M | 🟢 **-37%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ✅ | 23.5M | 🟢 **-54%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.1M | ✅ | 28.2M | 🟢 **-30%** |
| ref.json | nested refs | 2 | ✅ | 47.2M | ✅ | 11.8M | 🟢 **-75%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 58.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 48.9M | +5% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.1M | ✅ | 27.3M | 🟢 **-41%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.3M | ✅ | 121.1M | 🟢 **-24%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 33.0M | 🟢 **-34%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ✅ | 2.7M | 🟢 **-70%** |
| ref.json | refs with quote | 2 | ✅ | 46.6M | ✅ | 29.1M | 🟢 **-37%** |
| ref.json | Location-independent identifier | 2 | ✅ | 51.6M | ✅ | 40.1M | 🟢 **-22%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 58.1M | ✅ | 43.5M | 🟢 **-25%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.7M | ✅ | 43.5M | 🟢 **-27%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.3M | ✅ | 38.3M | -19% |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.4M | ✅ | 9.9M | 🟢 **-73%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.5M | ✅ | 10.0M | 🟢 **-73%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.9M | ✅ | 43.8M | 🟢 **-27%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 25.6M | 🟢 **-24%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.7M | ✅ | 29.0M | 🟢 **-38%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ✅ | 29.2M | 🟢 **-38%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.8M | ✅ | 30.9M | 🟢 **-34%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.5M | ✅ | 25.6M | 🟢 **-45%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ✅ | 29.1M | 🟢 **-38%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.8M | ✅ | 29.1M | 🟢 **-39%** |
| ref.json | ref to if | 2 | ✅ | 58.4M | ✅ | 39.8M | 🟢 **-32%** |
| ref.json | ref to then | 2 | ✅ | 60.0M | ✅ | 43.1M | 🟢 **-28%** |
| ref.json | ref to else | 2 | ✅ | 60.3M | ✅ | 43.3M | 🟢 **-28%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 60.0M | ✅ | 42.9M | 🟢 **-29%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 43.2M | 🟢 **-31%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 44.0M | 🟢 **-29%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 42.8M | 🟢 **-31%** |
| refRemote.json | remote ref | 2 | ✅ | 55.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 36.8M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 39.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 46.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.7M | ✅ | 83.2M | 🔴 **+44%** |
| required.json | required default validation | 1 | ✅ | 158.8M | ✅ | 125.4M | 🟢 **-21%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 125.3M | 🟢 **-21%** |
| required.json | required with escaped characters | 2 | ✅ | 44.1M | ✅ | 23.3M | 🟢 **-47%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.0M | ✅ | 35.8M | 🔴 **+43%** |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 63.8M | 🔴 **+21%** |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ✅ | 73.7M | 🔴 **+34%** |
| type.json | string type matches strings | 9 | ✅ | 54.1M | ✅ | 72.3M | 🔴 **+34%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 59.9M | 🔴 **+30%** |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ✅ | 59.6M | +16% |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 63.3M | 🔴 **+22%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.8M | ✅ | 60.2M | -4% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.1M | ✅ | 70.5M | 🔴 **+38%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 87.8M | 🔴 **+41%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 65.3M | +18% |
| type.json | type: array, object or null | 5 | ✅ | 62.1M | ✅ | 81.8M | 🔴 **+32%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ✅ | 7.9M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ✅ | 24.0M | 🟢 **-24%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.1M | ✅ | 29.4M | 🔴 **+62%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 158.2M | ✅ | 130.9M | -17% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ✅ | 47.3M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.5M | ✅ | 42.8M | 🟢 **-38%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 122.1M | 🔴 **+53%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 125.9M | 🔴 **+50%** |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 62.5M | 🔴 **+31%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 111.2M | 🔴 **+44%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.5M | ✅ | 60.3M | 🔴 **+33%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 111.1M | 🔴 **+44%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 27.1M | ✅ | 60.2M | 🔴 **+122%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 345K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.3M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 429K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 71.9M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.9M | ✅ | 35.9M | 🔴 **+90%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.8M | ✅ | 36.0M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.0M | ✅ | 36.1M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.6M | ✅ | 32.4M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 34.7M | 🔴 **+35%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.9M | ✅ | 36.1M | 🔴 **+40%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.8M | ✅ | 36.2M | 🔴 **+35%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 37.9M | 🔴 **+46%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 32.2M | +16% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ✅ | 20.5M | 🔴 **+23%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.2M | ✅ | 16.0M | +13% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 15.9M | +7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ✅ | 33.6M | 🔴 **+28%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.0M | ✅ | 26.2M | 🔴 **+31%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.0M | ✅ | 20.2M | -12% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 12.7M | 🟢 **-38%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.8M | ✅ | 14.9M | 🟢 **-29%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 8.4M | +3% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 11.5M | 🔴 **+32%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ✅ | 15.9M | 🟢 **-20%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.6M | ✅ | 9.2M | 🟢 **-61%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.6M | ✅ | 25.0M | +2% |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ✅ | 14.0M | 🟢 **-24%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.3M | ✅ | 34.3M | -11% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.4M | ✅ | 18.1M | +10% |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.1M | ✅ | 36.1M | 🔴 **+28%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.8M | ✅ | 941K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.1M | ✅ | 41.8M | +13% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.3M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ✅ | 7.8M | -20% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ✅ | 18.8M | +17% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.1M | ✅ | 4.8M | 🟢 **-22%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.1M | ✅ | 25.2M | 🟢 **-37%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 52.7M | ✅ | 37.9M | 🟢 **-28%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 52.7M | ✅ | 38.1M | 🟢 **-28%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.2M | ✅ | 35.0M | 🔴 **+29%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.6M | ✅ | 10.9M | 🟢 **-34%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.5M | ✅ | 23.1M | -16% |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 25.6M | ✅ | 7.7M | 🟢 **-70%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.9M | ✅ | 23.3M | 🟢 **-37%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.7M | ✅ | 125.4M | 🟢 **-21%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.8M | ✅ | 101.1M | 🔴 **+32%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.7M | ✅ | 135.6M | 🟢 **-21%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 61.6M | 🟢 **-26%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 88.6M | ✅ | 36.0M | 🟢 **-59%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 39.0M | ✅ | 27.3M | 🟢 **-30%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 106.8M | ✅ | 78.1M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.4M | ✅ | 125.1M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.4M | ✅ | 32.5M | 🟢 **-47%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.6M | ✅ | 24.3M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 47.1M | ✅ | 26.2M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.7M | ✅ | 25.3M | 🟢 **-29%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.2M | ✅ | 125.6M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 17.5M | 🟢 **-39%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 51.7M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.1M | ✅ | 13.2M | 🟢 **-57%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.7M | ✅ | 9.3M | 🟢 **-75%** |
| allOf.json | allOf | 4 | ✅ | 34.4M | ✅ | 37.8M | +10% |
| allOf.json | allOf with base schema | 5 | ✅ | 38.4M | ✅ | 25.5M | 🟢 **-34%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 85.7M | 🔴 **+42%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 124.6M | 🟢 **-22%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ✅ | 62.0M | 🔴 **+24%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 65.2M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.4M | ✅ | 125.6M | 🟢 **-21%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 125.1M | 🟢 **-21%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 88.4M | 🔴 **+42%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 88.4M | 🟢 **-24%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.6M | ✅ | 87.2M | 🔴 **+35%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 59.8M | 🟢 **-28%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ✅ | 39.0M | 🟢 **-38%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ✅ | 39.0M | 🟢 **-66%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 59.8M | ✅ | 39.0M | 🟢 **-35%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 62.2M | ✅ | 38.7M | 🟢 **-38%** |
| anyOf.json | anyOf | 4 | ✅ | 65.7M | ✅ | 89.6M | 🔴 **+36%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 33.1M | ✅ | 26.7M | -19% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 125.4M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.8M | ✅ | 125.4M | 🟢 **-22%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 64.4M | 🔴 **+29%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.1M | ✅ | 30.4M | 🟢 **-37%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 172.0M | ✅ | 134.0M | 🟢 **-22%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 87.7M | 🔴 **+35%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.2M | ✅ | 124.5M | 🟢 **-32%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 49.2M | ✅ | 51.3M | +4% |
| const.json | const validation | 3 | ✅ | 55.1M | ✅ | 69.7M | 🔴 **+27%** |
| const.json | const with object | 4 | ✅ | 35.9M | ✅ | 32.0M | -11% |
| const.json | const with array | 3 | ✅ | 49.3M | ✅ | 9.3M | 🟢 **-81%** |
| const.json | const with null | 2 | ✅ | 64.8M | ✅ | 87.6M | 🔴 **+35%** |
| const.json | const with false does not match 0 | 3 | ✅ | 60.4M | ✅ | 69.3M | +15% |
| const.json | const with true does not match 1 | 3 | ✅ | 57.9M | ✅ | 63.3M | +9% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.0M | ✅ | 67.2M | 🔴 **+24%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.0M | ✅ | 68.0M | 🔴 **+26%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.4M | ✅ | 33.7M | 🟢 **-34%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.3M | ✅ | 33.4M | 🟢 **-35%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ✅ | 59.5M | +11% |
| const.json | const with 1 does not match true | 3 | ✅ | 67.3M | ✅ | 91.2M | 🔴 **+36%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ✅ | 69.0M | 🔴 **+24%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 55.8M | ✅ | 78.4M | 🔴 **+41%** |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 74.2M | 🔴 **+34%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.1M | ✅ | 30.4M | 🟢 **-39%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ✅ | 75.9M | 🔴 **+35%** |
| contains.json | contains keyword validation | 6 | ✅ | 60.0M | ✅ | 19.6M | 🟢 **-67%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.3M | ✅ | 14.1M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.1M | ✅ | 37.4M | 🟢 **-40%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.8M | ✅ | 42.6M | 🟢 **-26%** |
| contains.json | items + contains | 4 | ✅ | 40.1M | ✅ | 17.5M | 🟢 **-56%** |
| contains.json | contains with false if subschema | 2 | ✅ | 59.6M | ✅ | 37.3M | 🟢 **-37%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 20.3M | 🟢 **-75%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.0M | ✅ | 138.2M | 🟢 **-21%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.4M | ✅ | 137.5M | 🟢 **-22%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.1M | ✅ | 138.4M | 🟢 **-23%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 183.3M | ✅ | 117.4M | 🟢 **-36%** |
| default.json | invalid type for default | 2 | ✅ | 46.0M | ✅ | 75.3M | 🔴 **+63%** |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ✅ | 46.0M | -13% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.5M | ✅ | 50.2M | +10% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.5M | ✅ | 72.7M | 🔴 **+22%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 103.5M | ✅ | 136.5M | 🔴 **+32%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 25.8M | ✅ | 31.1M | 🔴 **+20%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 41.9M | ✅ | 40.2M | -4% |
| dependentSchemas.json | single dependency | 8 | ✅ | 47.9M | ✅ | 47.5M | -1% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.9M | ✅ | 51.6M | +10% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.4M | ✅ | 34.1M | -13% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.0M | ✅ | 25.6M | 🟢 **-31%** |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 45.1M | 🟢 **-29%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.2M | ✅ | 38.8M | -8% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ✅ | 75.3M | +13% |
| enum.json | enums in properties | 6 | ✅ | 38.0M | ✅ | 41.1M | +8% |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 87.8M | 🔴 **+23%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 58.8M | ✅ | 30.1M | 🟢 **-49%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.3M | ✅ | 60.8M | +16% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 56.9M | ✅ | 55.2M | -3% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.6M | ✅ | 67.0M | 🔴 **+25%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.5M | ✅ | 73.8M | +9% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.9M | ✅ | 73.8M | 🔴 **+25%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.3M | ✅ | 81.4M | 🔴 **+21%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ✅ | 72.6M | 🔴 **+23%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.1M | ✅ | 73.2M | 🔴 **+33%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.2M | ✅ | 49.8M | -10% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 54.7M | ✅ | 43.6M | 🟢 **-20%** |
| format.json | email format | 6 | ✅ | 181.7M | ✅ | 132.1M | 🟢 **-27%** |
| format.json | idn-email format | 6 | ✅ | 177.4M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 180.5M | ✅ | 123.8M | 🟢 **-31%** |
| format.json | ipv4 format | 6 | ✅ | 175.2M | ✅ | 117.7M | 🟢 **-33%** |
| format.json | ipv6 format | 6 | ✅ | 162.0M | ✅ | 128.9M | 🟢 **-20%** |
| format.json | idn-hostname format | 6 | ✅ | 181.2M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 181.7M | ✅ | 70.0M | 🟢 **-61%** |
| format.json | date format | 6 | ✅ | 182.2M | ✅ | 118.5M | 🟢 **-35%** |
| format.json | date-time format | 6 | ✅ | 182.2M | ✅ | 133.1M | 🟢 **-27%** |
| format.json | time format | 6 | ✅ | 145.7M | ✅ | 118.4M | -19% |
| format.json | json-pointer format | 6 | ✅ | 180.6M | ✅ | 133.5M | 🟢 **-26%** |
| format.json | relative-json-pointer format | 6 | ✅ | 182.5M | ✅ | 131.3M | 🟢 **-28%** |
| format.json | iri format | 6 | ✅ | 182.6M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 182.6M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 181.7M | ✅ | 132.6M | 🟢 **-27%** |
| format.json | uri-reference format | 6 | ✅ | 177.6M | ✅ | 122.0M | 🟢 **-31%** |
| format.json | uri-template format | 6 | ✅ | 182.8M | ✅ | 118.5M | 🟢 **-35%** |
| format.json | uuid format | 6 | ✅ | 181.5M | ✅ | 122.4M | 🟢 **-33%** |
| format.json | duration format | 6 | ✅ | 180.8M | ✅ | 117.0M | 🟢 **-35%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ✅ | 134.7M | 🟢 **-21%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.5M | ✅ | 134.6M | 🟢 **-22%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ✅ | 135.0M | 🟢 **-21%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ✅ | 89.7M | 🔴 **+28%** |
| if-then-else.json | if and else without then | 3 | ✅ | 69.1M | ✅ | 94.2M | 🔴 **+36%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.3M | ✅ | 80.3M | 🔴 **+31%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 127.9M | 🟢 **-25%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ✅ | 85.7M | 🔴 **+32%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ✅ | 58.6M | -9% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.6M | ✅ | 37.4M | -12% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ✅ | 24.4M | 🟢 **-37%** |
| items.json | a schema given for items | 4 | ✅ | 57.4M | ✅ | 43.9M | 🟢 **-23%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.4M | ✅ | 58.6M | -10% |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ✅ | 135.5M | 🟢 **-21%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ✅ | 66.3M | +6% |
| items.json | items with boolean schemas | 3 | ✅ | 60.5M | ✅ | 79.8M | 🔴 **+32%** |
| items.json | items and subitems | 6 | ✅ | 28.5M | ✅ | 8.2M | 🟢 **-71%** |
| items.json | nested items | 3 | ✅ | 13.5M | ✅ | 6.8M | 🟢 **-50%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 66.4M | -14% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 69.3M | -16% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.2M | ✅ | 133.4M | 🟢 **-22%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.7M | ✅ | 24.7M | 🟢 **-52%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.5M | ✅ | 24.1M | 🟢 **-58%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.8M | ✅ | 19.7M | 🟢 **-61%** |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 99.8M | 🔴 **+35%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 83.8M | 🔴 **+32%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.1M | ✅ | 45.0M | 🟢 **-24%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.6M | ✅ | 51.5M | 0% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.0M | ✅ | 68.6M | 🔴 **+27%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.9M | ✅ | 49.6M | +18% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 35.2M | ✅ | 50.1M | 🔴 **+42%** |
| maximum.json | maximum validation | 4 | ✅ | 69.1M | ✅ | 98.5M | 🔴 **+43%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 94.7M | 🔴 **+40%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.9M | ✅ | 135.6M | 🟢 **-21%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 59.7M | ✅ | 30.4M | 🟢 **-49%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.1M | ✅ | 23.8M | 🟢 **-57%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ✅ | 23.7M | 🟢 **-59%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.5M | ✅ | 23.0M | 🟢 **-52%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.5M | ✅ | 22.9M | 🟢 **-47%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.8M | ✅ | 53.9M | 🟢 **-69%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ✅ | 32.1M | 🟢 **-51%** |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ✅ | 99.3M | 🔴 **+35%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 83.7M | 🔴 **+32%** |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ✅ | 37.0M | 🟢 **-30%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 50.4M | -4% |
| minProperties.json | minProperties validation | 6 | ✅ | 54.6M | ✅ | 69.2M | 🔴 **+27%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.6M | ✅ | 49.1M | +12% |
| minimum.json | minimum validation | 4 | ✅ | 66.8M | ✅ | 99.1M | 🔴 **+48%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ✅ | 89.9M | 🔴 **+39%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 95.6M | 🔴 **+38%** |
| multipleOf.json | by number | 3 | ✅ | 63.5M | ✅ | 59.2M | -7% |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 27.0M | 🟢 **-53%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 17.2M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 85.8M | 🔴 **+36%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 72.8M | 🔴 **+30%** |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ✅ | 50.6M | -13% |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 59.9M | 🔴 **+30%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 45.8M | ✅ | 62.1M | 🔴 **+36%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.0M | ✅ | 62.3M | 🔴 **+27%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.6M | ✅ | 139.0M | 🟢 **-22%** |
| not.json | double negation | 1 | ✅ | 159.7M | ✅ | 100.9M | 🟢 **-37%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.6M | ✅ | 14.8M | 🟢 **-53%** |
| oneOf.json | oneOf | 4 | ✅ | 53.4M | ✅ | 70.8M | 🔴 **+33%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.1M | ✅ | 27.1M | -18% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 63.4M | 🔴 **+27%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.6M | ✅ | 121.4M | 🟢 **-24%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 51.7M | +4% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 63.4M | 🔴 **+27%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.9M | ✅ | 29.1M | 🟢 **-27%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 84.6M | 🔴 **+37%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.3M | ✅ | 24.4M | 🟢 **-41%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.9M | ✅ | 32.1M | 🟢 **-30%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 85.5M | 🔴 **+37%** |
| pattern.json | pattern validation | 8 | ✅ | 52.4M | ✅ | 70.7M | 🔴 **+35%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 57.1M | +19% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.9M | ✅ | 17.5M | 🟢 **-35%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ✅ | 14.9M | -2% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.4M | ✅ | 13.4M | 🟢 **-23%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.2M | ✅ | 18.4M | -4% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 22.1M | 🔴 **+24%** |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ✅ | 51.1M | +3% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 11.6M | 🟢 **-42%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.3M | ✅ | 53.1M | 🔴 **+25%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ✅ | 21.1M | 🟢 **-53%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 58.1M | -10% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ✅ | 28.1M | +7% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.3M | ✅ | 39.7M | -11% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ✅ | 16.1M | -15% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.7M | ✅ | 127.3M | 🟢 **-26%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.3M | ✅ | 25.0M | 🟢 **-41%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ✅ | 30.5M | 🟢 **-23%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ✅ | 32.9M | 🟢 **-22%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.8M | ✅ | 13.8M | 0% |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.4M | ✅ | 10.9M | 🔴 **+71%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.2M | ✅ | 10.5M | 🔴 **+233%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 14.0M | ✅ | 10.9M | 🟢 **-22%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 13.9M | ✅ | 10.8M | 🟢 **-22%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.5M | ✅ | 14.7M | 🔴 **+55%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.3M | ✅ | 14.6M | 🔴 **+77%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.4M | ✅ | 4.2M | -3% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ✅ | 4.4M | +6% |
| ref.json | root pointer ref | 4 | ✅ | 24.1M | ✅ | 14.1M | 🟢 **-42%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ✅ | 28.9M | 🟢 **-38%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ✅ | 24.5M | 🟢 **-52%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.6M | ✅ | 28.3M | 🟢 **-30%** |
| ref.json | nested refs | 2 | ✅ | 46.6M | ✅ | 10.9M | 🟢 **-77%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.2M | ✅ | 29.6M | 🟢 **-26%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 47.7M | +2% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.8M | ✅ | 25.5M | 🟢 **-45%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ✅ | 119.8M | 🟢 **-25%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 34.7M | 🟢 **-30%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ✅ | 2.9M | 🟢 **-68%** |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ✅ | 27.6M | 🟢 **-41%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.4M | ✅ | 8.9M | 🟢 **-67%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.4M | ✅ | 38.1M | -19% |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.0M | ✅ | 9.6M | 🟢 **-73%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.8M | ✅ | 9.6M | 🟢 **-73%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.1M | ✅ | 39.9M | 🟢 **-33%** |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 55.4M | ✅ | 38.2M | 🟢 **-31%** |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.0M | ✅ | 41.7M | 🟢 **-32%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 48.0M | ✅ | 24.6M | 🟢 **-49%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 24.6M | 🟢 **-27%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.9M | ✅ | 27.1M | 🟢 **-42%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.9M | ✅ | 28.8M | 🟢 **-39%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.9M | ✅ | 27.2M | 🟢 **-42%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 41.8M | ✅ | 27.7M | 🟢 **-34%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.6M | ✅ | 27.2M | 🟢 **-42%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.7M | ✅ | 27.8M | 🟢 **-41%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 58.4M | ✅ | 24.4M | 🟢 **-58%** |
| ref.json | ref to if | 2 | ✅ | 59.2M | ✅ | 38.9M | 🟢 **-34%** |
| ref.json | ref to then | 2 | ✅ | 59.2M | ✅ | 37.6M | 🟢 **-36%** |
| ref.json | ref to else | 2 | ✅ | 59.6M | ✅ | 37.6M | 🟢 **-37%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.4M | ✅ | 30.1M | 🟢 **-49%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 33.8M | 🟢 **-46%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 35.6M | 🟢 **-43%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 43.1M | 🟢 **-31%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ✅ | 18.0M | 🔴 **+271%** |
| refRemote.json | remote ref | 2 | ✅ | 59.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.9M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 58.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 58.7M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 59.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 59.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 58.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 47.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 59.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.0M | ✅ | 81.2M | 🔴 **+40%** |
| required.json | required default validation | 1 | ✅ | 159.0M | ✅ | 121.6M | 🟢 **-24%** |
| required.json | required with empty array | 1 | ✅ | 158.2M | ✅ | 121.5M | 🟢 **-23%** |
| required.json | required with escaped characters | 2 | ✅ | 44.0M | ✅ | 21.1M | 🟢 **-52%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.8M | ✅ | 35.0M | 🔴 **+41%** |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 64.5M | 🔴 **+22%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 68.0M | 🔴 **+23%** |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 68.1M | 🔴 **+24%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 58.1M | 🔴 **+26%** |
| type.json | array type matches arrays | 7 | ✅ | 51.4M | ✅ | 59.7M | +16% |
| type.json | boolean type matches booleans | 10 | ✅ | 62.1M | ✅ | 63.8M | +3% |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ✅ | 60.5M | 🔴 **+24%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ✅ | 45.2M | -13% |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 85.2M | 🔴 **+37%** |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 66.2M | +19% |
| type.json | type: array, object or null | 5 | ✅ | 62.0M | ✅ | 80.1M | 🔴 **+29%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.8M | ✅ | 129.9M | 🔴 **+55%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.1M | ✅ | 80.1M | 🔴 **+51%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 56.9M | ✅ | 53.5M | -6% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ✅ | 45.2M | 🟢 **-37%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 49.9M | ✅ | 51.2M | +2% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 80.9M | ✅ | 67.8M | -16% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 46.0M | ✅ | 25.5M | 🟢 **-45%** |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 45.4M | ✅ | 27.6M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.8M | ✅ | 37.2M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.8M | ✅ | 13.8M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 83.9M | ✅ | 70.6M | -16% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.3M | ✅ | 70.6M | 🔴 **+232%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.5M | ✅ | 15.8M | 🔴 **+26%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.2M | ✅ | 23.8M | 🔴 **+56%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ✅ | 27.8M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ✅ | 13.8M | 🔴 **+22%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 52.7M | ✅ | 79.6M | 🔴 **+51%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.8M | ✅ | 32.6M | 🟢 **-32%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.7M | ✅ | 32.7M | 🟢 **-32%** |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ✅ | 58.1M | 🔴 **+49%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.7M | ✅ | 26.1M | -2% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.9M | ✅ | 129.2M | 🔴 **+41%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ✅ | 66.4M | -14% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.5M | ✅ | 19.6M | -9% |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 35.9M | ✅ | 32.3M | -10% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.9M | ✅ | 98.9M | 🔴 **+80%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 34.2M | ✅ | 23.7M | 🟢 **-31%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.8M | ✅ | 25.0M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 35.2M | ✅ | 20.6M | 🟢 **-41%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.0M | ✅ | 14.6M | -3% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 65.3M | ✅ | 57.9M | -11% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.4M | ✅ | 16.4M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 14.0M | ✅ | 12.2M | -13% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 61.0M | ✅ | 57.8M | -5% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 32.9M | ✅ | 55.4M | 🔴 **+69%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 17.7M | ✅ | 5.6M | 🟢 **-68%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.4M | ✅ | 9.8M | 🟢 **-50%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 26.9M | ✅ | 10.3M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 19.2M | ✅ | 7.4M | 🟢 **-61%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.7M | ✅ | 8.0M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.3M | ✅ | 9.5M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.7M | ✅ | 12.8M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 36.0M | ✅ | 22.0M | 🟢 **-39%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 32.4M | ✅ | 15.8M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 32.6M | ✅ | 15.4M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.4M | ✅ | 16.5M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.5M | ✅ | 16.3M | 🟢 **-45%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.9M | ✅ | 56.5M | 🔴 **+72%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.8M | ✅ | 57.8M | 🔴 **+82%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.3M | ✅ | 14.7M | 🟢 **-44%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.2M | ✅ | 20.2M | 🟢 **-28%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.1M | ✅ | 14.5M | 🟢 **-31%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.3M | ✅ | 20.2M | 🔴 **+65%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.8M | ✅ | 15.2M | 🟢 **-47%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.0M | ✅ | 19.6M | 🟢 **-37%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 37.2M | ✅ | 21.5M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.5M | ✅ | 11.1M | 🟢 **-40%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.3M | ✅ | 9.2M | 🟢 **-52%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ✅ | 2.6M | 🟢 **-64%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 77.3M | ✅ | 118.5M | 🔴 **+53%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.7M | ✅ | 50.7M | +2% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.1M | ✅ | 21.4M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.1M | ✅ | 4.1M | 🟢 **-71%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.0M | ✅ | 8.5M | 🟢 **-61%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.8M | ✅ | 8.3M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ✅ | 7.8M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.1M | ✅ | 23.9M | 🟢 **-20%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.3M | ✅ | 29.7M | 🔴 **+62%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ✅ | 126.6M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.2M | ✅ | 46.0M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.3M | ✅ | 41.2M | 🟢 **-41%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.8M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.3M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.0M | ✅ | 20.1M | 🟢 **-61%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 111.4M | 🔴 **+39%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 122.0M | 🔴 **+45%** |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 50.2M | +5% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.1M | ✅ | 107.8M | 🔴 **+40%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 59.9M | 🔴 **+31%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.1M | ✅ | 107.6M | 🔴 **+40%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 59.7M | 🔴 **+31%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 28.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.6M | ✅ | 70.0M | +17% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 173.8M | ✅ | 133.6M | 🟢 **-23%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 35.2M | ✅ | 30.5M | -13% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 41.7M | ✅ | 39.5M | -5% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.7M | ✅ | 45.4M | -7% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.2M | ✅ | 53.7M | +11% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.7M | ✅ | 35.4M | -13% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 64.0M | +19% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.9M | ✅ | 35.0M | 🔴 **+85%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 34.9M | 🔴 **+38%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.8M | ✅ | 35.1M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.7M | ✅ | 33.4M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.7M | ✅ | 35.1M | 🔴 **+36%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 19.6M | ✅ | 35.4M | 🔴 **+80%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.9M | ✅ | 35.0M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 36.7M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.6M | ✅ | 31.5M | +14% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ✅ | 20.0M | 🔴 **+21%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.4M | ✅ | 15.9M | +10% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.9M | ✅ | 15.8M | -1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 20.6M | ✅ | 32.9M | 🔴 **+60%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.9M | ✅ | 27.4M | 🔴 **+31%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.9M | ✅ | 19.4M | -15% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 13.6M | 🟢 **-33%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.9M | ✅ | 14.8M | 🟢 **-29%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 8.9M | +12% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 10.9M | 🔴 **+32%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.6M | ✅ | 16.4M | 🟢 **-20%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ✅ | 9.4M | 🟢 **-61%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.4M | ✅ | 24.3M | -4% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.3M | ✅ | 13.9M | 🟢 **-63%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ✅ | 13.9M | 🟢 **-24%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.3M | ✅ | 35.0M | -9% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ✅ | 17.4M | +5% |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.1M | ✅ | 34.8M | +16% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.2M | ✅ | 941K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.8M | ✅ | 41.1M | 🔴 **+25%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.4M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ✅ | 7.7M | -20% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ✅ | 18.8M | +10% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ✅ | 4.7M | 🟢 **-26%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.9M | ✅ | 15.6M | +5% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.1M | ✅ | 23.7M | 🟢 **-41%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 60.0M | ✅ | 56.1M | -6% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.5M | ✅ | 33.8M | 🔴 **+23%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.6M | ✅ | 10.8M | 🟢 **-38%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.3M | ✅ | 27.0M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.3M | ✅ | 28.2M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.0M | ✅ | 26.7M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.3M | ✅ | 37.6M | 🟢 **-40%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.3M | ✅ | 27.0M | 🟢 **-42%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.6M | ✅ | 24.3M | -12% |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 57.0M | ✅ | 20.9M | 🟢 **-63%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.9M | ✅ | 21.9M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.4M | ✅ | 27.4M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.0M | ✅ | 25.2M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 176.0M | ✅ | 125.2M | 🟢 **-29%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 26.0M | ✅ | 16.9M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 60.1M | ✅ | 51.5M | -14% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.4M | ✅ | 12.8M | 🟢 **-59%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 35.6M | ✅ | 17.9M | 🟢 **-50%** |
| allOf.json | allOf | 4 | ✅ | 38.2M | ✅ | 39.5M | +4% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.0M | ✅ | 25.4M | -15% |
| allOf.json | allOf simple types | 2 | ✅ | 66.7M | ✅ | 85.2M | 🔴 **+28%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 174.5M | ✅ | 125.6M | 🟢 **-28%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 55.0M | ✅ | 64.7M | +18% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 82.8M | ✅ | 64.2M | 🟢 **-23%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 176.9M | ✅ | 125.6M | 🟢 **-29%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 174.8M | ✅ | 125.3M | 🟢 **-28%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.2M | ✅ | 88.1M | 🔴 **+27%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 125.5M | ✅ | 88.0M | 🟢 **-30%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 71.9M | ✅ | 65.1M | -10% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 87.5M | ✅ | 56.4M | 🟢 **-36%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 70.1M | ✅ | 35.9M | 🟢 **-49%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 124.1M | ✅ | 37.6M | 🟢 **-70%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 48.4M | ✅ | 38.1M | 🟢 **-21%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 25.9M | ✅ | 38.1M | 🔴 **+47%** |
| anyOf.json | anyOf | 4 | ✅ | 74.0M | ✅ | 89.5M | 🔴 **+21%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.0M | ✅ | 26.6M | 🟢 **-30%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 174.8M | ✅ | 124.3M | 🟢 **-29%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 174.7M | ✅ | 122.9M | 🟢 **-30%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 54.5M | ✅ | 64.6M | +18% |
| anyOf.json | anyOf complex types | 4 | ✅ | 52.9M | ✅ | 30.9M | 🟢 **-42%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 191.2M | ✅ | 135.2M | 🟢 **-29%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 70.3M | ✅ | 86.8M | 🔴 **+23%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 198.7M | ✅ | 138.8M | 🟢 **-30%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 48.4M | ✅ | 17.7M | 🟢 **-63%** |
| const.json | const validation | 3 | ✅ | 54.0M | ✅ | 68.1M | 🔴 **+26%** |
| const.json | const with object | 4 | ✅ | 37.9M | ✅ | 32.7M | -14% |
| const.json | const with array | 3 | ✅ | 50.2M | ✅ | 8.9M | 🟢 **-82%** |
| const.json | const with null | 2 | ✅ | 70.6M | ✅ | 86.8M | 🔴 **+23%** |
| const.json | const with false does not match 0 | 3 | ✅ | 63.0M | ✅ | 76.3M | 🔴 **+21%** |
| const.json | const with true does not match 1 | 3 | ✅ | 63.9M | ✅ | 71.2M | +11% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 58.6M | ✅ | 67.0M | +14% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 60.2M | ✅ | 68.1M | +13% |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 56.0M | ✅ | 33.6M | 🟢 **-40%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 55.1M | ✅ | 33.6M | 🟢 **-39%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 55.2M | ✅ | 63.8M | +16% |
| const.json | const with 1 does not match true | 3 | ✅ | 73.1M | ✅ | 91.1M | 🔴 **+25%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 28.7M | ✅ | 68.2M | 🔴 **+138%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 66.5M | ✅ | 80.5M | 🔴 **+21%** |
| const.json | nul characters in strings | 2 | ✅ | 60.1M | ✅ | 72.3M | 🔴 **+20%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 55.0M | ✅ | 67.4M | 🔴 **+23%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 61.3M | ✅ | 76.1M | 🔴 **+24%** |
| contains.json | contains keyword validation | 6 | ✅ | 63.5M | ✅ | 19.3M | 🟢 **-70%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 60.0M | ✅ | 14.8M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 64.4M | ✅ | 72.5M | +13% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 62.1M | ✅ | 42.6M | 🟢 **-31%** |
| contains.json | items + contains | 4 | ✅ | 41.7M | ✅ | 18.0M | 🟢 **-57%** |
| contains.json | contains with false if subschema | 2 | ✅ | 65.3M | ✅ | 73.2M | +12% |
| contains.json | contains with null instance elements | 1 | ✅ | 89.0M | ✅ | 38.0M | 🟢 **-57%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 197.7M | ✅ | 138.1M | 🟢 **-30%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 194.6M | ✅ | 137.2M | 🟢 **-29%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 200.3M | ✅ | 129.5M | 🟢 **-35%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 196.9M | ✅ | 138.2M | 🟢 **-30%** |
| default.json | invalid type for default | 2 | ✅ | 69.8M | ✅ | 75.6M | +8% |
| default.json | invalid string value for default | 2 | ✅ | 54.1M | ✅ | 46.1M | -15% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.7M | ✅ | 55.0M | +4% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 62.2M | ✅ | 71.8M | +15% |
| dependentRequired.json | empty dependents | 3 | ✅ | 196.1M | ✅ | 137.8M | 🟢 **-30%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.9M | ✅ | 31.3M | 🔴 **+25%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 43.8M | ✅ | 39.9M | -9% |
| dependentSchemas.json | single dependency | 8 | ✅ | 50.5M | ✅ | 47.6M | -6% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 52.1M | ✅ | 52.2M | +0% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 42.4M | ✅ | 17.8M | 🟢 **-58%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.5M | ✅ | 17.0M | 🟢 **-55%** |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.0M | ✅ | 4.1M | 🟢 **-68%** |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 17.8M | ✅ | 19.5M | +10% |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 14.3M | ✅ | 22.2M | 🔴 **+55%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 10.2M | ✅ | 3.2M | 🟢 **-68%** |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 11.9M | ✅ | 4.9M | 🟢 **-59%** |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 9.0M | ✅ | 2.7M | 🟢 **-70%** |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.3M | ✅ | 6.2M | 🟢 **-25%** |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 14.7M | ✅ | 17.4M | +18% |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 11.2M | ✅ | 7.6M | 🟢 **-32%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.2M | ✅ | 1.4M | 🟢 **-81%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.7M | ✅ | 6.6M | 🟢 **-55%** |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.3M | ✅ | 1.4M | 🟢 **-74%** |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ✅ | 1.4M | 🟢 **-80%** |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.3M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.8M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.4M | ✅ | 28.7M | +5% |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.4M | ✅ | 4.0M | 🟢 **-52%** |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 69.7M | ✅ | 84.9M | 🔴 **+22%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.1M | ✅ | 37.8M | -14% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.6M | ✅ | 88.8M | 🔴 **+24%** |
| enum.json | enums in properties | 6 | ✅ | 39.0M | ✅ | 41.1M | +6% |
| enum.json | enum with escaped characters | 3 | ✅ | 76.7M | ✅ | 96.3M | 🔴 **+26%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 63.7M | ✅ | 73.9M | +16% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.1M | ✅ | 68.3M | +16% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 65.1M | ✅ | 74.1M | +14% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 59.5M | ✅ | 67.1M | +13% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 72.2M | ✅ | 89.1M | 🔴 **+23%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.3M | ✅ | 80.3M | 🔴 **+21%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 72.0M | ✅ | 90.7M | 🔴 **+26%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.9M | ✅ | 79.9M | 🔴 **+21%** |
| enum.json | nul characters in strings | 2 | ✅ | 60.6M | ✅ | 73.6M | 🔴 **+21%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.9M | ✅ | 79.5M | 🔴 **+31%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 64.0M | ✅ | 78.5M | 🔴 **+23%** |
| format.json | email format | 7 | ✅ | 202.9M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 203.1M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 202.3M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 202.6M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 202.0M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 197.9M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 203.2M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 201.2M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 199.1M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 201.6M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 203.2M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 196.2M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 201.8M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 202.9M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 203.0M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 202.2M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 203.0M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 193.1M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 201.7M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 191.1M | ✅ | 135.5M | 🟢 **-29%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 190.9M | ✅ | 115.4M | 🟢 **-40%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 190.9M | ✅ | 134.8M | 🟢 **-29%** |
| if-then-else.json | if and then without else | 3 | ✅ | 74.6M | ✅ | 94.6M | 🔴 **+27%** |
| if-then-else.json | if and else without then | 3 | ✅ | 75.5M | ✅ | 94.5M | 🔴 **+25%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 67.2M | ✅ | 81.0M | 🔴 **+21%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 186.7M | ✅ | 128.0M | 🟢 **-31%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 69.9M | ✅ | 85.1M | 🔴 **+22%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 69.4M | ✅ | 79.9M | +15% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 49.1M | ✅ | 37.2M | 🟢 **-24%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 42.8M | ✅ | 24.9M | 🟢 **-42%** |
| items.json | a schema given for items | 4 | ✅ | 64.6M | ✅ | 43.8M | 🟢 **-32%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 187.5M | ✅ | 135.6M | 🟢 **-28%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 66.5M | ✅ | 78.1M | +18% |
| items.json | items and subitems | 6 | ✅ | 29.5M | ✅ | 8.1M | 🟢 **-72%** |
| items.json | nested items | 3 | ✅ | 13.5M | ✅ | 6.7M | 🟢 **-51%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 84.4M | ✅ | 104.5M | 🔴 **+24%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 50.9M | ✅ | 31.6M | 🟢 **-38%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 50.3M | ✅ | 28.4M | 🟢 **-43%** |
| items.json | items with heterogeneous array | 2 | ✅ | 68.9M | ✅ | 76.9M | +12% |
| items.json | items with null instance elements | 1 | ✅ | 83.0M | ✅ | 66.4M | -20% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 188.9M | ✅ | 134.1M | 🟢 **-29%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.2M | ✅ | 23.6M | 🟢 **-59%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 62.7M | ✅ | 24.4M | 🟢 **-61%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 56.0M | ✅ | 20.7M | 🟢 **-63%** |
| maxItems.json | maxItems validation | 4 | ✅ | 81.7M | ✅ | 99.8M | 🔴 **+22%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 68.8M | ✅ | 83.0M | 🔴 **+21%** |
| maxLength.json | maxLength validation | 5 | ✅ | 64.5M | ✅ | 40.9M | 🟢 **-37%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.7M | ✅ | 50.1M | -12% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.2M | ✅ | 68.7M | 🔴 **+22%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.9M | ✅ | 47.5M | +11% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 45.2M | ✅ | 49.5M | +10% |
| maximum.json | maximum validation | 4 | ✅ | 74.1M | ✅ | 98.3M | 🔴 **+33%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.7M | ✅ | 100.1M | 🔴 **+38%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 191.0M | ✅ | 134.8M | 🟢 **-29%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 66.1M | ✅ | 30.0M | 🟢 **-55%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 60.2M | ✅ | 23.3M | 🟢 **-61%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 62.8M | ✅ | 24.8M | 🟢 **-61%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 52.3M | ✅ | 24.7M | 🟢 **-53%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 47.2M | ✅ | 23.4M | 🟢 **-50%** |
| minContains.json | minContains = 0 | 2 | ✅ | 186.8M | ✅ | 53.9M | 🟢 **-71%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.5M | ✅ | 31.3M | 🟢 **-56%** |
| minItems.json | minItems validation | 4 | ✅ | 81.9M | ✅ | 98.0M | +20% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 83.1M | +20% |
| minLength.json | minLength validation | 5 | ✅ | 59.0M | ✅ | 37.0M | 🟢 **-37%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.6M | ✅ | 50.3M | -11% |
| minProperties.json | minProperties validation | 6 | ✅ | 58.2M | ✅ | 68.8M | +18% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.7M | ✅ | 49.6M | +14% |
| minimum.json | minimum validation | 4 | ✅ | 75.4M | ✅ | 100.1M | 🔴 **+33%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.7M | ✅ | 88.6M | 🔴 **+35%** |
| multipleOf.json | by int | 3 | ✅ | 74.5M | ✅ | 95.1M | 🔴 **+28%** |
| multipleOf.json | by number | 3 | ✅ | 68.9M | ✅ | 59.6M | -13% |
| multipleOf.json | by small number | 2 | ✅ | 61.2M | ✅ | 27.1M | 🟢 **-56%** |
| multipleOf.json | float division = inf | 1 | ✅ | 46.6M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 70.4M | ✅ | 17.1M | 🟢 **-76%** |
| not.json | not | 2 | ✅ | 69.3M | ✅ | 85.5M | 🔴 **+23%** |
| not.json | not multiple types | 3 | ✅ | 61.5M | ✅ | 73.0M | +19% |
| not.json | not more complex schema | 3 | ✅ | 62.9M | ✅ | 47.9M | 🟢 **-24%** |
| not.json | forbidden property | 2 | ✅ | 50.3M | ✅ | 59.7M | +19% |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.4M | ✅ | 61.9M | 🔴 **+28%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 45.1M | ✅ | 60.5M | 🔴 **+34%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 197.4M | ✅ | 138.9M | 🟢 **-30%** |
| not.json | double negation | 1 | ✅ | 174.9M | ✅ | 125.3M | 🟢 **-28%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.1M | ✅ | 14.7M | 🟢 **-53%** |
| oneOf.json | oneOf | 4 | ✅ | 58.3M | ✅ | 75.3M | 🔴 **+29%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.6M | ✅ | 23.8M | 🟢 **-33%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 56.0M | ✅ | 62.7M | +12% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 175.6M | ✅ | 121.2M | 🟢 **-31%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 55.5M | ✅ | 62.5M | +13% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 55.3M | ✅ | 62.4M | +13% |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.6M | ✅ | 28.6M | 🟢 **-34%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 67.5M | ✅ | 83.9M | 🔴 **+24%** |
| oneOf.json | oneOf with required | 4 | ✅ | 42.3M | ✅ | 26.4M | 🟢 **-37%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.9M | ✅ | 32.3M | 🟢 **-33%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 70.0M | ✅ | 85.1M | 🔴 **+22%** |
| pattern.json | pattern validation | 8 | ✅ | 52.8M | ✅ | 70.3M | 🔴 **+33%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 52.0M | ✅ | 56.3M | +8% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ✅ | 18.4M | 🟢 **-31%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.6M | ✅ | 13.9M | -11% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.3M | ✅ | 12.8M | 🟢 **-30%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.9M | ✅ | 17.8M | -19% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.7M | ✅ | 21.8M | +11% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 67.3M | ✅ | 58.9M | -12% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 64.6M | ✅ | 77.7M | 🔴 **+20%** |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 90.2M | ✅ | 67.8M | 🟢 **-25%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 90.7M | ✅ | 69.3M | 🟢 **-24%** |
| properties.json | object properties validation | 6 | ✅ | 51.0M | ✅ | 52.3M | +2% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.3M | ✅ | 11.5M | 🟢 **-44%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ✅ | 53.4M | +15% |
| properties.json | properties with escaped characters | 2 | ✅ | 47.3M | ✅ | 24.0M | 🟢 **-49%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 73.2M | ✅ | 58.1M | 🟢 **-21%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.0M | ✅ | 28.5M | +2% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.5M | ✅ | 40.3M | -13% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 21.1M | ✅ | 15.7M | 🟢 **-25%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 188.9M | ✅ | 130.4M | 🟢 **-31%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.4M | ✅ | 24.8M | 🟢 **-44%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 44.6M | ✅ | 30.4M | 🟢 **-32%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.9M | ✅ | 33.4M | 🟢 **-22%** |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ✅ | 13.9M | 🟢 **-44%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 49.5M | ✅ | 28.8M | 🟢 **-42%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.1M | ✅ | 24.5M | 🟢 **-56%** |
| ref.json | escaped pointer ref | 6 | ✅ | 42.4M | ✅ | 28.7M | 🟢 **-32%** |
| ref.json | nested refs | 2 | ✅ | 40.8M | ✅ | 11.5M | 🟢 **-72%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 38.6M | ✅ | 29.6M | 🟢 **-23%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.2M | ✅ | 45.7M | -5% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.3M | ✅ | 28.6M | 🟢 **-41%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 174.5M | ✅ | 119.9M | 🟢 **-31%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 54.8M | ✅ | 34.5M | 🟢 **-37%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ✅ | 2.9M | 🟢 **-67%** |
| ref.json | refs with quote | 2 | ✅ | 48.9M | ✅ | 28.2M | 🟢 **-42%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.8M | ✅ | 9.5M | 🟢 **-67%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.6M | ✅ | 38.0M | 🟢 **-26%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 35.7M | ✅ | 10.2M | 🟢 **-71%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.7M | ✅ | 10.1M | 🟢 **-73%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.6M | ✅ | 40.9M | -16% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.2M | ✅ | 38.2M | 🟢 **-22%** |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 67.6M | ✅ | 35.2M | 🟢 **-48%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 39.4M | ✅ | 24.4M | 🟢 **-38%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 35.2M | ✅ | 24.6M | 🟢 **-30%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 48.5M | ✅ | 28.6M | 🟢 **-41%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.4M | ✅ | 28.7M | 🟢 **-41%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.3M | ✅ | 27.7M | 🟢 **-41%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.6M | ✅ | 27.7M | 🟢 **-42%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 47.9M | ✅ | 27.5M | 🟢 **-42%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.7M | ✅ | 27.6M | 🟢 **-42%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 55.6M | ✅ | 24.7M | 🟢 **-56%** |
| ref.json | ref to if | 2 | ✅ | 54.7M | ✅ | 38.7M | 🟢 **-29%** |
| ref.json | ref to then | 2 | ✅ | 52.4M | ✅ | 36.3M | 🟢 **-31%** |
| ref.json | ref to else | 2 | ✅ | 52.3M | ✅ | 38.3M | 🟢 **-27%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.3M | ✅ | 35.4M | 🟢 **-31%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.7M | ✅ | 33.7M | 🟢 **-52%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 35.5M | 🟢 **-49%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 69.6M | ✅ | 43.0M | 🟢 **-38%** |
| refRemote.json | remote ref | 2 | ✅ | 52.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.2M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 53.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 51.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 41.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 45.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.2M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 53.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 52.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 43.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 55.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 68.2M | ✅ | 80.6M | +18% |
| required.json | required default validation | 1 | ✅ | 174.6M | ✅ | 114.7M | 🟢 **-34%** |
| required.json | required with empty array | 1 | ✅ | 174.6M | ✅ | 121.1M | 🟢 **-31%** |
| required.json | required with escaped characters | 2 | ✅ | 38.0M | ✅ | 21.9M | 🟢 **-42%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.6M | ✅ | 35.4M | 🔴 **+50%** |
| type.json | integer type matches integers | 9 | ✅ | 55.0M | ✅ | 62.8M | +14% |
| type.json | number type matches numbers | 9 | ✅ | 57.6M | ✅ | 65.0M | +13% |
| type.json | string type matches strings | 9 | ✅ | 57.8M | ✅ | 66.9M | +16% |
| type.json | object type matches objects | 7 | ✅ | 47.8M | ✅ | 57.1M | +19% |
| type.json | array type matches arrays | 7 | ✅ | 54.0M | ✅ | 56.8M | +5% |
| type.json | boolean type matches booleans | 10 | ✅ | 55.5M | ✅ | 61.5M | +11% |
| type.json | null type matches only the null object | 10 | ✅ | 50.0M | ✅ | 58.5M | +17% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 54.7M | ✅ | 63.9M | +17% |
| type.json | type as array with one item | 2 | ✅ | 68.9M | ✅ | 84.8M | 🔴 **+23%** |
| type.json | type: array or object | 5 | ✅ | 62.5M | ✅ | 64.5M | +3% |
| type.json | type: array, object or null | 5 | ✅ | 68.5M | ✅ | 63.9M | -7% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 88.6M | ✅ | 130.5M | 🔴 **+47%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 57.4M | ✅ | 79.8M | 🔴 **+39%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 59.0M | ✅ | 53.5M | -9% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 78.9M | ✅ | 45.1M | 🟢 **-43%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 54.5M | ✅ | 51.7M | -5% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 88.6M | ✅ | 67.9M | 🟢 **-23%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 48.9M | ✅ | 26.5M | 🟢 **-46%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 52.9M | ✅ | 34.6M | 🟢 **-35%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.2M | ✅ | 13.6M | 🟢 **-41%** |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 90.9M | ✅ | 66.8M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.9M | ✅ | 70.6M | 🔴 **+222%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 13.3M | ✅ | 12.4M | -7% |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.3M | ✅ | 23.8M | 🔴 **+47%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 38.1M | ✅ | 26.5M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 12.0M | ✅ | 12.1M | +2% |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 57.0M | ✅ | 79.6M | 🔴 **+40%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 51.9M | ✅ | 35.0M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 52.3M | ✅ | 34.7M | 🟢 **-34%** |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 42.9M | ✅ | 57.7M | 🔴 **+34%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 27.3M | ✅ | 27.7M | +1% |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.6M | ✅ | 11.8M | 🟢 **-43%** |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.9M | ✅ | 3.5M | 🟢 **-61%** |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ✅ | 5.9M | 🟢 **-44%** |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.6M | ✅ | 15.9M | -19% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 102.2M | ✅ | 126.9M | 🔴 **+24%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 83.3M | ✅ | 66.4M | 🟢 **-20%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.4M | ✅ | 15.5M | 🟢 **-31%** |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 39.3M | ✅ | 32.3M | -18% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 57.6M | ✅ | 129.9M | 🔴 **+126%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 35.3M | ✅ | 24.2M | 🟢 **-32%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 40.2M | ✅ | 23.3M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 35.6M | ✅ | 16.9M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.6M | ✅ | 13.7M | -12% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 189.4M | ✅ | 127.4M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.3M | ✅ | 14.3M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 31.2M | ✅ | 14.5M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.6M | ✅ | 11.3M | -17% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 67.6M | ✅ | 56.9M | -16% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.3M | ✅ | 56.5M | 🔴 **+87%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.1M | ✅ | 5.4M | 🟢 **-66%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.1M | ✅ | 8.5M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.9M | ✅ | 10.7M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.7M | ✅ | 8.6M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.5M | ✅ | 7.0M | 🟢 **-68%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.9M | ✅ | 9.0M | 🟢 **-50%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.5M | ✅ | 11.4M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.8M | ✅ | 20.1M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 31.7M | ✅ | 15.0M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 32.7M | ✅ | 14.9M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 9.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.4M | ✅ | 14.7M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.7M | ✅ | 13.7M | 🟢 **-55%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.1M | ✅ | 56.9M | 🔴 **+89%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.3M | ✅ | 56.1M | 🔴 **+85%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.1M | ✅ | 14.1M | 🟢 **-48%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.4M | ✅ | 18.7M | 🟢 **-34%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.2M | ✅ | 14.1M | 🟢 **-34%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ✅ | 18.1M | 🔴 **+51%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 29.1M | ✅ | 14.1M | 🟢 **-52%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 33.8M | ✅ | 20.9M | 🟢 **-38%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 44.5M | ✅ | 20.6M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.8M | ✅ | 9.2M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.7M | ✅ | 9.1M | 🟢 **-54%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ✅ | 2.9M | 🟢 **-61%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 88.0M | ✅ | 115.7M | 🔴 **+31%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.5M | ✅ | 50.7M | -2% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 31.8M | ✅ | 20.2M | 🟢 **-36%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.4M | ✅ | 4.0M | 🟢 **-72%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 23.0M | ✅ | 13.0M | 🟢 **-44%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 26.7M | ✅ | 11.6M | 🟢 **-57%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.5M | ✅ | 7.9M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.5M | ✅ | 23.9M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 43.4M | ✅ | 29.5M | 🟢 **-32%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 165.4M | ✅ | 126.6M | 🟢 **-23%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.1M | ✅ | 45.9M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.3M | ✅ | 42.2M | 🟢 **-32%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 56.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 68.3M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.2M | ✅ | 23.5M | 🟢 **-57%** |
| optional/bignum.json | integer | 2 | ✅ | 91.1M | ✅ | 112.1M | 🔴 **+23%** |
| optional/bignum.json | number | 2 | ✅ | 94.8M | ✅ | 117.6M | 🔴 **+24%** |
| optional/bignum.json | string | 1 | ✅ | 52.8M | ✅ | 60.5M | +15% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 84.7M | ✅ | 107.4M | 🔴 **+27%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.2M | ✅ | 58.6M | +17% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 85.0M | ✅ | 107.1M | 🔴 **+26%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 49.9M | ✅ | 58.7M | +18% |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 95.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.3M | ✅ | 70.1M | +14% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 197.7M | ✅ | 127.4M | 🟢 **-36%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.0M | ✅ | 30.9M | -6% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 43.9M | ✅ | 39.5M | -10% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 50.4M | ✅ | 46.8M | -7% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 56.6M | ✅ | 53.6M | -5% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 42.8M | ✅ | 34.4M | -20% |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ✅ | 2.6M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 57.9M | ✅ | 45.8M | 🟢 **-21%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.3M | ✅ | 35.0M | +20% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.7M | ✅ | 34.9M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.3M | ✅ | 32.9M | +12% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.5M | ✅ | 32.4M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 33.1M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.2M | ✅ | 35.2M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.7M | ✅ | 33.9M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.9M | ✅ | 37.1M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.6M | ✅ | 31.6M | +7% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ✅ | 20.2M | +18% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.5M | ✅ | 16.2M | -2% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.8M | ✅ | 15.6M | -2% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ✅ | 32.4M | +16% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.8M | ✅ | 24.3M | +7% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.5M | ✅ | 20.5M | -16% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.0M | ✅ | 14.2M | 🟢 **-36%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ✅ | 15.4M | 🟢 **-26%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.2M | ✅ | 8.7M | +20% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.2M | ✅ | 11.3M | 🔴 **+23%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.1M | ✅ | 16.0M | 🔴 **+44%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.0M | ✅ | 9.2M | 🟢 **-62%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.5M | ✅ | 24.5M | -8% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 39.4M | ✅ | 13.3M | 🟢 **-66%** |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 44.3M | ✅ | 123K | 🟢 **-100%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 12.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.4M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.7M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.4M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.1M | ✅ | 35.1M | -3% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.6M | ✅ | 17.4M | +5% |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.9M | ✅ | 34.5M | +12% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 77.9M | ✅ | 940K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 38.4M | ✅ | 41.6M | +8% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.9M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.1M | ✅ | 7.6M | 🟢 **-25%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.2M | ✅ | 18.7M | +3% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.9M | ✅ | 4.7M | 🟢 **-32%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ✅ | 11.5M | 🟢 **-26%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 22.9M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.7M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 38.4M | ✅ | 24.6M | 🟢 **-36%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 66.0M | ✅ | 60.7M | -8% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.2M | ✅ | 34.0M | +17% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.0M | ✅ | 10.3M | 🟢 **-43%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 48.7M | ✅ | 28.7M | 🟢 **-41%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 49.0M | ✅ | 28.7M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 48.4M | ✅ | 27.1M | 🟢 **-44%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 69.7M | ✅ | 35.4M | 🟢 **-49%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.1M | ✅ | 27.0M | 🟢 **-45%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 24.2M | ✅ | 24.4M | +1% |
