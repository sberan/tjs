# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | schemasafe pass | schemasafe ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 27.3M | 184/199 | 21.5M | 184 | 🟢 **-21%** |
| draft6 | 276 | ✅ 276 | 29.4M | 259/276 | 23.3M | 259 | 🟢 **-21%** |
| draft7 | 313 | ✅ 313 | 14.4M | 281/313 | 21.2M | 281 | 🔴 **+48%** |
| draft2019-09 | 435 | ✅ 435 | 18.7M | 399/435 | 18.9M | 399 | +1% |
| draft2020-12 | 448 | ✅ 448 | 19.6M | 389/448 | 14.9M | 389 | 🟢 **-24%** |
| **Total** | 1671 | 1670/1671 | 19.6M | 1512/1671 | 19.0M | 1512 | -3% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **1.39x faster** (38 ns vs 53 ns per test, 6344 tests in 1512 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 7.5M | +3% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 89.9M | ✅ | 125.4M | 🔴 **+39%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.6M | ✅ | 90.4M | 🟢 **-38%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 93.9M | ✅ | 135.0M | 🔴 **+44%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 69.2M | 🟢 **-44%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 45.9M | ✅ | 35.8M | 🟢 **-22%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 57.3M | ✅ | 26.7M | 🟢 **-53%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 78.7M | +8% |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 152.9M | ✅ | 122.0M | 🟢 **-20%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 39.9M | ✅ | 42.5M | +7% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.0M | ✅ | 24.2M | +10% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.1M | ✅ | 23.6M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 42.5M | ✅ | 23.8M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 81.0M | ✅ | 125.2M | 🔴 **+55%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.7M | ✅ | 9.3M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.5M | ✅ | 51.7M | -2% |
| allOf.json | allOf | 4 | ✅ | 47.8M | ✅ | 38.8M | -19% |
| allOf.json | allOf with base schema | 5 | ✅ | 27.4M | ✅ | 25.6M | -7% |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 85.6M | 🟢 **-22%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 89.9M | ✅ | 65.9M | 🟢 **-27%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 64.1M | 🟢 **-58%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 76.9M | ✅ | 85.0M | +11% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 87.5M | 🟢 **-26%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 80.9M | +3% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 57.6M | 🟢 **-32%** |
| anyOf.json | anyOf | 4 | ✅ | 81.6M | ✅ | 90.3M | +11% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.4M | ✅ | 26.5M | 🟢 **-48%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.4M | ✅ | 30.2M | 🟢 **-40%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 162.0M | ✅ | 135.3M | -16% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 69.1M | -12% |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 75.5M | 🟢 **-30%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 46.0M | -17% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.8M | ✅ | 57.0M | 🟢 **-26%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.2M | ✅ | 36.3M | 🟢 **-60%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.2M | ✅ | 31.1M | -9% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.4M | ✅ | 35.1M | 🟢 **-40%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.6M | ✅ | 11.6M | 🟢 **-38%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 47.2M | ✅ | 26.5M | 🟢 **-44%** |
| enum.json | simple enum validation | 2 | ✅ | 75.2M | ✅ | 81.5M | +8% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.6M | ✅ | 39.5M | 🟢 **-35%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 88.2M | +18% |
| enum.json | enums in properties | 6 | ✅ | 14.8M | ✅ | 37.0M | 🔴 **+150%** |
| enum.json | enum with escaped characters | 3 | ✅ | 61.1M | ✅ | 69.9M | +14% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.0M | ✅ | 73.8M | 🟢 **-35%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.0M | ✅ | 68.6M | +4% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 71.1M | 🟢 **-36%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.7M | ✅ | 62.3M | -4% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 108.7M | ✅ | 89.3M | -18% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.6M | ✅ | 80.2M | +17% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 106.3M | ✅ | 90.6M | -15% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 67.7M | ✅ | 79.8M | +18% |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 72.0M | 🟢 **-21%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 67.1M | +15% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 75.4M | -20% |
| format.json | email format | 6 | ✅ | 93.0M | ✅ | 132.0M | 🔴 **+42%** |
| format.json | ipv4 format | 6 | ✅ | 162.8M | ✅ | 132.7M | -18% |
| format.json | ipv6 format | 6 | ✅ | 92.9M | ✅ | 109.9M | +18% |
| format.json | hostname format | 6 | ✅ | 162.7M | ✅ | 128.3M | 🟢 **-21%** |
| format.json | date-time format | 6 | ✅ | 92.8M | ✅ | 122.2M | 🔴 **+32%** |
| format.json | uri format | 6 | ✅ | 162.1M | ✅ | 118.9M | 🟢 **-27%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.7M | ✅ | 13.1M | 🟢 **-71%** |
| items.json | a schema given for items | 4 | ✅ | 65.2M | ✅ | 36.9M | 🟢 **-44%** |
| items.json | an array of schemas for items | 6 | ✅ | 67.6M | ✅ | 58.7M | -13% |
| items.json | items and subitems | 6 | ✅ | 13.6M | ✅ | 8.1M | 🟢 **-40%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 6.7M | 🟢 **-45%** |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 66.4M | -12% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 69.3M | -14% |
| maxItems.json | maxItems validation | 4 | ✅ | 78.6M | ✅ | 84.4M | +7% |
| maxLength.json | maxLength validation | 5 | ✅ | 58.3M | ✅ | 42.2M | 🟢 **-28%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.9M | ✅ | 68.7M | +19% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.1M | ✅ | 43.2M | -15% |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 96.9M | 🔴 **+26%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ✅ | 97.9M | 🔴 **+29%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 75.4M | ✅ | 86.8M | +15% |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ✅ | 82.1M | +17% |
| minItems.json | minItems validation | 4 | ✅ | 78.9M | ✅ | 95.7M | 🔴 **+21%** |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 33.1M | 🟢 **-43%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.7M | ✅ | 66.9M | +12% |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 85.1M | +11% |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 98.1M | 🔴 **+28%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 70.4M | ✅ | 82.4M | +17% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.0M | ✅ | 87.9M | 🔴 **+22%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 93.5M | 🔴 **+20%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 59.5M | -19% |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 27.8M | 🟢 **-58%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 73.9M | ✅ | 17.2M | 🟢 **-77%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 77.7M | +1% |
| not.json | not multiple types | 3 | ✅ | 71.2M | ✅ | 74.6M | +5% |
| not.json | not more complex schema | 3 | ✅ | 60.6M | ✅ | 51.0M | -16% |
| not.json | forbidden property | 2 | ✅ | 47.7M | ✅ | 59.6M | 🔴 **+25%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.3M | ✅ | 58.5M | -3% |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 125.1M | 🔴 **+39%** |
| oneOf.json | oneOf | 4 | ✅ | 59.4M | ✅ | 76.1M | 🔴 **+28%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.9M | ✅ | 25.8M | 🟢 **-22%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ✅ | 29.2M | 🟢 **-34%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 86.5M | +14% |
| oneOf.json | oneOf with required | 4 | ✅ | 48.2M | ✅ | 26.9M | 🟢 **-44%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.2M | ✅ | 33.2M | 🟢 **-32%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 71.8M | ✅ | 86.9M | 🔴 **+21%** |
| pattern.json | pattern validation | 8 | ✅ | 55.2M | ✅ | 72.0M | 🔴 **+30%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 60.5M | 🔴 **+139%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.0M | ✅ | 18.0M | 🟢 **-31%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.8M | ✅ | 14.8M | +7% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.8M | ✅ | 12.7M | -15% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ✅ | 22.8M | 🔴 **+27%** |
| properties.json | object properties validation | 6 | ✅ | 53.9M | ✅ | 54.6M | +1% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 11.2M | 🟢 **-44%** |
| properties.json | properties with escaped characters | 2 | ✅ | 50.6M | ✅ | 24.7M | 🟢 **-51%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 48.8M | ✅ | 60.3M | 🔴 **+24%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ✅ | 29.6M | +4% |
| ref.json | root pointer ref | 4 | ✅ | 25.9M | ✅ | 14.3M | 🟢 **-45%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.6M | ✅ | 29.2M | 🟢 **-37%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.0M | ✅ | 23.9M | 🟢 **-60%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.5M | ✅ | 29.3M | 🟢 **-38%** |
| ref.json | nested refs | 2 | ✅ | 23.9M | ✅ | 12.5M | 🟢 **-48%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 52.2M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.0M | ✅ | 49.3M | +1% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 49.3M | ✅ | 28.2M | 🟢 **-43%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.7M | ✅ | 2.7M | 🟢 **-77%** |
| ref.json | refs with quote | 2 | ✅ | 46.3M | ✅ | 28.9M | 🟢 **-38%** |
| ref.json | Location-independent identifier | 2 | ✅ | 69.4M | ✅ | 43.7M | 🟢 **-37%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 45.6M | ✅ | 44.0M | -4% |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 53.7M | ✅ | 46.5M | -13% |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 44.8M | ✅ | 44.1M | -2% |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 43.5M | 🟢 **-44%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 61.0M | ✅ | 40.6M | 🟢 **-33%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 60.5M | ✅ | 43.6M | 🟢 **-28%** |
| refRemote.json | remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 43.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 43.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.0M | ✅ | 80.9M | 🔴 **+25%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 124.9M | 🔴 **+39%** |
| required.json | required with escaped characters | 2 | ✅ | 53.2M | ✅ | 24.1M | 🟢 **-55%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ✅ | 32.9M | +18% |
| type.json | integer type matches integers | 8 | ✅ | 64.7M | ✅ | 57.5M | -11% |
| type.json | number type matches numbers | 9 | ✅ | 69.4M | ✅ | 70.0M | +1% |
| type.json | string type matches strings | 9 | ✅ | 69.4M | ✅ | 70.5M | +2% |
| type.json | object type matches objects | 7 | ✅ | 58.8M | ✅ | 58.2M | -1% |
| type.json | array type matches arrays | 7 | ✅ | 64.3M | ✅ | 57.5M | -10% |
| type.json | boolean type matches booleans | 10 | ✅ | 66.3M | ✅ | 61.6M | -7% |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 57.8M | -12% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.3M | ✅ | 67.2M | +3% |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 87.9M | +14% |
| type.json | type: array or object | 5 | ✅ | 72.4M | ✅ | 66.2M | -9% |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 74.1M | -4% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ✅ | 7.9M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.5M | ✅ | 24.2M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 29.8M | 🔴 **+59%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.9M | ✅ | 130.1M | 🔴 **+41%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ✅ | 46.9M | 🟢 **-35%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 77.2M | ✅ | 42.8M | 🟢 **-45%** |
| optional/bignum.json | integer | 2 | ✅ | 88.1M | ✅ | 119.5M | 🔴 **+36%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 126.0M | 🔴 **+42%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 62.6M | -1% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 109.5M | 🔴 **+39%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 60.7M | +1% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 110.7M | 🔴 **+40%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 60.7M | +1% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.6M | ✅ | 71.5M | 🔴 **+150%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.2M | ✅ | 33.9M | +16% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 27.7M | -2% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 35.4M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 33.1M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 34.0M | 🔴 **+29%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.6M | ✅ | 30.9M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ✅ | 35.8M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 36.7M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.5M | ✅ | 29.1M | -5% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ✅ | 20.7M | 🔴 **+21%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.4M | ✅ | 16.2M | -1% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 14.9M | +1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.7M | ✅ | 33.0M | 🔴 **+29%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.4M | ✅ | 20.9M | -3% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 20.2M | -13% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 13.5M | 🟢 **-33%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 13.7M | 🟢 **-32%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 8.8M | +9% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 10.2M | 🔴 **+24%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.2M | ✅ | 16.1M | 🟢 **-24%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.3M | ✅ | 9.4M | 🟢 **-64%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ✅ | 14.3M | 🟢 **-25%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.9M | ✅ | 34.6M | -11% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ✅ | 18.1M | 🔴 **+51%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 90.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.8M | 🟢 **-27%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.4M | ✅ | 23.7M | 🟢 **-37%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.3M | ✅ | 34.6M | +14% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ✅ | 10.7M | 🟢 **-38%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.0M | ✅ | 7.6M | +9% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 15.4M | ✅ | 18.1M | +17% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 151.4M | ✅ | 135.9M | -10% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 39.7M | ✅ | 80.8M | 🔴 **+104%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.3M | ✅ | 146.2M | -11% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 75.0M | -7% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 29.9M | ✅ | 33.6M | +12% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.8M | ✅ | 29.6M | 🟢 **-34%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 71.7M | 🟢 **-33%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 80.6M | ✅ | 141.9M | 🔴 **+76%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.6M | ✅ | 41.8M | -8% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.9M | ✅ | 24.0M | +9% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.4M | ✅ | 27.4M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.3M | ✅ | 24.8M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 142.2M | -7% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.6M | ✅ | 16.8M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 56.9M | -18% |
| allOf.json | allOf | 4 | ✅ | 38.7M | ✅ | 37.2M | -4% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.9M | ✅ | 23.9M | 🟢 **-23%** |
| allOf.json | allOf simple types | 2 | ✅ | 59.3M | ✅ | 76.3M | 🔴 **+29%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ✅ | 142.0M | -7% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.0M | ✅ | 52.4M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.3M | ✅ | 51.1M | 🟢 **-45%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 141.8M | 🔴 **+75%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 141.9M | -7% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 78.2M | +2% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 78.8M | 🟢 **-33%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 77.2M | -2% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.9M | ✅ | 50.0M | 🟢 **-40%** |
| anyOf.json | anyOf | 4 | ✅ | 70.9M | ✅ | 78.0M | +10% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 42.8M | ✅ | 21.8M | 🟢 **-49%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 141.8M | 🔴 **+58%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.9M | ✅ | 141.9M | -7% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 59.4M | ✅ | 51.8M | -13% |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ✅ | 27.1M | 🟢 **-62%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 64.2M | ✅ | 146.3M | 🔴 **+128%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 85.3M | ✅ | 78.8M | -8% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 75.4M | ✅ | 132.0M | 🔴 **+75%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 76.6M | ✅ | 48.4M | 🟢 **-37%** |
| const.json | const validation | 3 | ✅ | 78.2M | ✅ | 59.9M | 🟢 **-23%** |
| const.json | const with object | 4 | ✅ | 49.9M | ✅ | 29.9M | 🟢 **-40%** |
| const.json | const with array | 3 | ✅ | 53.4M | ✅ | 5.6M | 🟢 **-90%** |
| const.json | const with null | 2 | ✅ | 119.5M | ✅ | 78.8M | 🟢 **-34%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.7M | ✅ | 60.4M | 🟢 **-20%** |
| const.json | const with true does not match 1 | 3 | ✅ | 110.7M | ✅ | 62.0M | 🟢 **-44%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 60.1M | ✅ | 55.5M | -8% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.0M | ✅ | 54.2M | 🟢 **-43%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.5M | ✅ | 31.9M | 🟢 **-47%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.2M | ✅ | 31.4M | 🟢 **-67%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 61.5M | ✅ | 60.0M | -2% |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 84.9M | 🟢 **-24%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.9M | ✅ | 62.9M | -5% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 99.9M | ✅ | 67.3M | 🟢 **-33%** |
| const.json | nul characters in strings | 2 | ✅ | 32.5M | ✅ | 63.4M | 🔴 **+95%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 51.7M | 🟢 **-35%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 62.3M | ✅ | 69.6M | +12% |
| contains.json | contains keyword validation | 6 | ✅ | 90.5M | ✅ | 17.9M | 🟢 **-80%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 60.9M | ✅ | 12.1M | 🟢 **-80%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ✅ | 61.4M | 🟢 **-42%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 61.9M | ✅ | 34.4M | 🟢 **-44%** |
| contains.json | items + contains | 4 | ✅ | 48.9M | ✅ | 16.7M | 🟢 **-66%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 35.5M | 🟢 **-54%** |
| default.json | invalid type for default | 2 | ✅ | 94.9M | ✅ | 82.3M | -13% |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 48.8M | -12% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 74.3M | ✅ | 54.1M | 🟢 **-27%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.4M | ✅ | 65.9M | 🟢 **-28%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 149.9M | 🔴 **+56%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.7M | ✅ | 30.0M | 🟢 **-25%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.8M | ✅ | 32.6M | 🟢 **-30%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.5M | ✅ | 50.6M | 🟢 **-42%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 14.7M | ✅ | 15.6M | +6% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 45.2M | ✅ | 25.2M | 🟢 **-44%** |
| enum.json | simple enum validation | 2 | ✅ | 70.6M | ✅ | 75.3M | +7% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 36.0M | 🟢 **-41%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.4M | ✅ | 33.6M | 🟢 **-55%** |
| enum.json | enums in properties | 6 | ✅ | 16.3M | ✅ | 38.1M | 🔴 **+134%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.7M | ✅ | 86.9M | +8% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 111.7M | ✅ | 58.9M | 🟢 **-47%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 53.7M | -19% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.2M | ✅ | 58.5M | 🟢 **-47%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.4M | ✅ | 53.5M | -19% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 79.8M | 🟢 **-30%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 66.6M | -3% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 76.6M | 🟢 **-31%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.4M | ✅ | 67.4M | -2% |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 59.2M | 🟢 **-35%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 51.5M | 🟢 **-27%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 100.8M | ✅ | 65.8M | 🟢 **-35%** |
| format.json | email format | 6 | ✅ | 92.9M | ✅ | 136.8M | 🔴 **+47%** |
| format.json | ipv4 format | 6 | ✅ | 161.9M | ✅ | 90.2M | 🟢 **-44%** |
| format.json | ipv6 format | 6 | ✅ | 92.6M | ✅ | 124.4M | 🔴 **+34%** |
| format.json | hostname format | 6 | ✅ | 162.4M | ✅ | 111.2M | 🟢 **-32%** |
| format.json | date-time format | 6 | ✅ | 92.9M | ✅ | 118.8M | 🔴 **+28%** |
| format.json | json-pointer format | 6 | ✅ | 157.2M | ✅ | 136.3M | -13% |
| format.json | uri format | 6 | ✅ | 93.0M | ✅ | 138.2M | 🔴 **+49%** |
| format.json | uri-reference format | 6 | ✅ | 159.6M | ✅ | 82.6M | 🟢 **-48%** |
| format.json | uri-template format | 6 | ✅ | 92.8M | ✅ | 133.5M | 🔴 **+44%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 58.1M | ✅ | 22.7M | 🟢 **-61%** |
| items.json | a schema given for items | 4 | ✅ | 54.4M | ✅ | 45.8M | -16% |
| items.json | an array of schemas for items | 6 | ✅ | 106.3M | ✅ | 58.6M | 🟢 **-45%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 145.9M | 🔴 **+55%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ✅ | 59.0M | 🟢 **-43%** |
| items.json | items with boolean schemas | 3 | ✅ | 64.4M | ✅ | 68.7M | +7% |
| items.json | items and subitems | 6 | ✅ | 27.8M | ✅ | 7.8M | 🟢 **-72%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 7.1M | 🟢 **-42%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 71.2M | -5% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 77.6M | -4% |
| maxItems.json | maxItems validation | 4 | ✅ | 78.8M | ✅ | 86.1M | +9% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 74.5M | +3% |
| maxLength.json | maxLength validation | 5 | ✅ | 59.2M | ✅ | 40.1M | 🟢 **-32%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.3M | ✅ | 41.7M | 🟢 **-26%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 62.3M | +7% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 46.3M | ✅ | 42.3M | -9% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.8M | ✅ | 41.9M | -14% |
| maximum.json | maximum validation | 4 | ✅ | 76.8M | ✅ | 83.3M | +8% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 81.6M | +8% |
| minItems.json | minItems validation | 4 | ✅ | 78.8M | ✅ | 85.3M | +8% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 74.6M | +3% |
| minLength.json | minLength validation | 5 | ✅ | 58.2M | ✅ | 34.9M | 🟢 **-40%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 43.3M | 🟢 **-24%** |
| minProperties.json | minProperties validation | 6 | ✅ | 58.2M | ✅ | 61.3M | +5% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.5M | ✅ | 43.5M | -12% |
| minimum.json | minimum validation | 4 | ✅ | 78.9M | ✅ | 82.6M | +5% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 85.3M | +18% |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 85.4M | +10% |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 34.3M | 🟢 **-53%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 29.8M | 🟢 **-55%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 1.4M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.1M | ✅ | 36.6M | 🟢 **-51%** |
| not.json | not | 2 | ✅ | 76.9M | ✅ | 75.4M | -2% |
| not.json | not multiple types | 3 | ✅ | 70.6M | ✅ | 60.2M | -15% |
| not.json | not more complex schema | 3 | ✅ | 68.8M | ✅ | 39.6M | 🟢 **-42%** |
| not.json | forbidden property | 2 | ✅ | 54.6M | ✅ | 55.7M | +2% |
| not.json | forbid everything with empty schema | 9 | ✅ | 64.7M | ✅ | 49.5M | 🟢 **-23%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 90.0M | ✅ | 49.6M | 🟢 **-45%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.2M | ✅ | 133.8M | 🔴 **+48%** |
| not.json | double negation | 1 | ✅ | 89.9M | ✅ | 141.7M | 🔴 **+58%** |
| oneOf.json | oneOf | 4 | ✅ | 66.9M | ✅ | 65.0M | -3% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.8M | ✅ | 21.7M | 🟢 **-36%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.0M | ✅ | 51.8M | 🟢 **-22%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 142.2M | 🔴 **+58%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 51.8M | 🟢 **-22%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.0M | ✅ | 50.7M | 🟢 **-23%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.7M | ✅ | 24.1M | 🟢 **-46%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 76.3M | +0% |
| oneOf.json | oneOf with required | 4 | ✅ | 48.4M | ✅ | 22.3M | 🟢 **-54%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.5M | ✅ | 26.2M | 🟢 **-47%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 77.4M | +2% |
| pattern.json | pattern validation | 8 | ✅ | 55.5M | ✅ | 69.9M | 🔴 **+26%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 67.1M | 🔴 **+165%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ✅ | 18.2M | 🟢 **-29%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.4M | ✅ | 14.7M | -4% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.0M | ✅ | 13.5M | -15% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.2M | ✅ | 18.0M | -11% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 23.8M | 🔴 **+31%** |
| properties.json | object properties validation | 6 | ✅ | 56.4M | ✅ | 53.4M | -5% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 10.9M | 🟢 **-45%** |
| properties.json | properties with boolean schema | 4 | ✅ | 48.9M | ✅ | 51.7M | +6% |
| properties.json | properties with escaped characters | 2 | ✅ | 52.4M | ✅ | 23.0M | 🟢 **-56%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 65.2M | -7% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ✅ | 27.8M | -2% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.9M | ✅ | 40.5M | -1% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ✅ | 16.9M | -15% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 146.2M | 🔴 **+56%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.4M | ✅ | 23.8M | 🟢 **-54%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.6M | ✅ | 29.8M | 🟢 **-23%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ✅ | 32.6M | 🟢 **-24%** |
| ref.json | root pointer ref | 4 | ✅ | 26.2M | ✅ | 13.8M | 🟢 **-47%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.1M | ✅ | 29.6M | 🟢 **-45%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.9M | ✅ | 25.4M | 🟢 **-57%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ✅ | 28.4M | 🟢 **-40%** |
| ref.json | nested refs | 2 | ✅ | 38.8M | ✅ | 13.1M | 🟢 **-66%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 56.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.5M | ✅ | 46.1M | -14% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.1M | ✅ | 29.0M | 🟢 **-46%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ✅ | 134.7M | 🔴 **+50%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.0M | ✅ | 26.2M | 🟢 **-60%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ✅ | 2.6M | 🟢 **-70%** |
| ref.json | refs with quote | 2 | ✅ | 52.5M | ✅ | 28.7M | 🟢 **-45%** |
| ref.json | Location-independent identifier | 2 | ✅ | 50.7M | ✅ | 37.2M | 🟢 **-27%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 51.4M | ✅ | 40.7M | 🟢 **-21%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 49.6M | ✅ | 38.2M | 🟢 **-23%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 34.5M | 🟢 **-39%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ✅ | 10.5M | 🟢 **-68%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.1M | ✅ | 10.8M | 🟢 **-65%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ✅ | 25.5M | 🟢 **-42%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.3M | ✅ | 27.7M | 🟢 **-47%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.4M | ✅ | 28.2M | 🟢 **-47%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.8M | ✅ | 28.0M | 🟢 **-43%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.7M | ✅ | 27.8M | 🟢 **-44%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.4M | ✅ | 28.0M | 🟢 **-42%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.8M | ✅ | 27.9M | 🟢 **-36%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.1M | ✅ | 38.2M | 🟢 **-25%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 38.5M | 🟢 **-50%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 37.3M | 🟢 **-52%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 36.8M | 🟢 **-48%** |
| refRemote.json | remote ref | 2 | ✅ | 51.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 43.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 42.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 41.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 77.1M | +19% |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 141.7M | 🔴 **+58%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 133.5M | 🔴 **+48%** |
| required.json | required with escaped characters | 2 | ✅ | 52.8M | ✅ | 22.3M | 🟢 **-58%** |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ✅ | 34.0M | 🔴 **+21%** |
| type.json | integer type matches integers | 9 | ✅ | 67.1M | ✅ | 56.0M | -17% |
| type.json | number type matches numbers | 9 | ✅ | 68.8M | ✅ | 60.3M | -12% |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 59.8M | -14% |
| type.json | object type matches objects | 7 | ✅ | 47.0M | ✅ | 50.2M | +7% |
| type.json | array type matches arrays | 7 | ✅ | 64.0M | ✅ | 51.7M | -19% |
| type.json | boolean type matches booleans | 10 | ✅ | 54.9M | ✅ | 54.5M | -1% |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 51.9M | 🟢 **-21%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.2M | ✅ | 54.8M | -17% |
| type.json | type as array with one item | 2 | ✅ | 77.0M | ✅ | 78.9M | +3% |
| type.json | type: array or object | 5 | ✅ | 72.2M | ✅ | 60.1M | -17% |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 72.3M | -6% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.7M | ✅ | 7.4M | 🟢 **-56%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.3M | ✅ | 23.7M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ✅ | 28.9M | 🔴 **+53%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ✅ | 133.2M | 🔴 **+45%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.5M | ✅ | 51.6M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 65.8M | ✅ | 45.6M | 🟢 **-31%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 131.4M | 🔴 **+49%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 134.2M | 🔴 **+51%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 50.1M | 🟢 **-21%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 117.1M | 🔴 **+48%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 47.4M | 🟢 **-21%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 106.4M | 🔴 **+35%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 49.5M | -17% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.4M | ✅ | 67.1M | 🔴 **+136%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.3M | ✅ | 31.4M | 🔴 **+63%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 32.3M | +14% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.3M | ✅ | 32.3M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 31.7M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 17.0M | ✅ | 33.6M | 🔴 **+97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.1M | ✅ | 32.9M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ✅ | 27.5M | -3% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 37.7M | 🔴 **+39%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 30.0M | +0% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.3M | ✅ | 20.7M | 🔴 **+27%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ✅ | 17.2M | +11% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 16.5M | +7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ✅ | 29.9M | +14% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.6M | ✅ | 26.5M | 🔴 **+23%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 20.7M | -11% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.4M | ✅ | 14.8M | -15% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.9M | ✅ | 14.9M | 🟢 **-21%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 8.6M | +9% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ✅ | 10.8M | 🔴 **+25%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ✅ | 12.7M | 🟢 **-41%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.8M | ✅ | 9.0M | 🟢 **-64%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ✅ | 13.8M | 🟢 **-27%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.1M | ✅ | 31.1M | 🟢 **-30%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ✅ | 20.4M | 🔴 **+70%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ✅ | 34.6M | +6% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 91.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ✅ | 8.9M | -10% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.5M | ✅ | 21.3M | 🔴 **+22%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 5.3M | -19% |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.7M | ✅ | 21.0M | 🟢 **-44%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 47.4M | ✅ | 25.7M | 🟢 **-46%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 47.6M | ✅ | 25.8M | 🟢 **-46%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.7M | ✅ | 31.9M | +4% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.0M | ✅ | 10.6M | 🟢 **-37%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.2M | ✅ | 19.8M | 🔴 **+30%** |

### draft7

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 8.2M | ✅ | 8.7M | +5% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 30.5M | ✅ | 18.9M | 🟢 **-38%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.2M | ✅ | 125.6M | -17% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 27.3M | ✅ | 100.7M | 🔴 **+268%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ✅ | 135.0M | -18% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 56.2M | ✅ | 69.3M | 🔴 **+23%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.8M | ✅ | 36.0M | 🟢 **-34%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 32.9M | ✅ | 27.7M | -16% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 79.1M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 54.4M | ✅ | 125.4M | 🔴 **+130%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 43.4M | ✅ | 43.1M | -1% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 19.6M | ✅ | 24.5M | 🔴 **+25%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 25.6M | ✅ | 28.5M | +11% |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.9M | ✅ | 25.0M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 60.3M | ✅ | 125.2M | 🔴 **+108%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.0M | ✅ | 17.5M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 39.1M | ✅ | 51.7M | 🔴 **+32%** |
| allOf.json | allOf | 4 | ✅ | 45.6M | ✅ | 40.1M | -12% |
| allOf.json | allOf with base schema | 5 | ✅ | 22.9M | ✅ | 25.6M | +11% |
| allOf.json | allOf simple types | 2 | ✅ | 109.8M | ✅ | 86.5M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 60.4M | ✅ | 125.3M | 🔴 **+108%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 92.5M | ✅ | 64.8M | 🟢 **-30%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 48.0M | ✅ | 64.9M | 🔴 **+35%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 152.6M | ✅ | 125.3M | -18% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 54.5M | ✅ | 124.6M | 🔴 **+129%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 107.9M | ✅ | 88.6M | -18% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 53.7M | ✅ | 87.5M | 🔴 **+63%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 117.2M | ✅ | 87.4M | 🟢 **-25%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 45.5M | ✅ | 60.0M | 🔴 **+32%** |
| anyOf.json | anyOf | 4 | ✅ | 128.2M | ✅ | 74.6M | 🟢 **-42%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 30.2M | ✅ | 27.8M | -8% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 152.8M | ✅ | 120.5M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 54.2M | ✅ | 125.4M | 🔴 **+132%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.9M | 🟢 **-30%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 39.5M | ✅ | 30.4M | 🟢 **-23%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.5M | ✅ | 135.7M | -17% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 54.5M | ✅ | 87.0M | 🔴 **+60%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 170.0M | ✅ | 138.7M | -18% |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 44.5M | ✅ | 51.4M | +16% |
| const.json | const validation | 3 | ✅ | 98.2M | ✅ | 70.2M | 🟢 **-29%** |
| const.json | const with object | 4 | ✅ | 33.8M | ✅ | 32.7M | -3% |
| const.json | const with array | 3 | ✅ | 83.9M | ✅ | 9.4M | 🟢 **-89%** |
| const.json | const with null | 2 | ✅ | 54.4M | ✅ | 76.0M | 🔴 **+40%** |
| const.json | const with false does not match 0 | 3 | ✅ | 113.8M | ✅ | 76.4M | 🟢 **-33%** |
| const.json | const with true does not match 1 | 3 | ✅ | 51.2M | ✅ | 78.2M | 🔴 **+53%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 96.5M | ✅ | 51.4M | 🟢 **-47%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 47.5M | ✅ | 67.3M | 🔴 **+42%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 95.2M | ✅ | 20.0M | 🟢 **-79%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 46.8M | ✅ | 27.1M | 🟢 **-42%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 94.3M | ✅ | 65.7M | 🟢 **-30%** |
| const.json | const with 1 does not match true | 3 | ✅ | 47.2M | ✅ | 91.5M | 🔴 **+94%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 110.6M | ✅ | 69.4M | 🟢 **-37%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 48.0M | ✅ | 80.5M | 🔴 **+67%** |
| const.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 74.7M | -18% |
| const.json | characters with the same visual repre... | 2 | ✅ | 43.6M | ✅ | 67.3M | 🔴 **+54%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 76.2M | -19% |
| contains.json | contains keyword validation | 6 | ✅ | 47.3M | ✅ | 18.9M | 🟢 **-60%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 91.7M | ✅ | 14.7M | 🟢 **-84%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 51.2M | ✅ | 73.2M | 🔴 **+43%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 107.1M | ✅ | 43.0M | 🟢 **-60%** |
| contains.json | items + contains | 4 | ✅ | 33.6M | ✅ | 18.8M | 🟢 **-44%** |
| contains.json | contains with false if subschema | 2 | ✅ | 101.1M | ✅ | 73.2M | 🟢 **-28%** |
| contains.json | contains with null instance elements | 1 | ✅ | 54.3M | ✅ | 38.4M | 🟢 **-29%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 75.5M | 🟢 **-30%** |
| default.json | invalid string value for default | 2 | ✅ | 41.9M | ✅ | 47.8M | +14% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.8M | ✅ | 57.2M | 🟢 **-26%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.3M | ✅ | 72.7M | 🟢 **-20%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 56.7M | ✅ | 137.2M | 🔴 **+142%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 36.6M | ✅ | 31.2M | -15% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 36.8M | ✅ | 35.3M | -4% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.2M | ✅ | 55.0M | 🟢 **-37%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 9.9M | ✅ | 11.8M | +18% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.1M | ✅ | 27.0M | 🟢 **-29%** |
| enum.json | simple enum validation | 2 | ✅ | 53.0M | ✅ | 85.7M | 🔴 **+62%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 38.9M | 🟢 **-36%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 44.9M | ✅ | 89.2M | 🔴 **+99%** |
| enum.json | enums in properties | 6 | ✅ | 15.8M | ✅ | 41.2M | 🔴 **+160%** |
| enum.json | enum with escaped characters | 3 | ✅ | 53.4M | ✅ | 96.6M | 🔴 **+81%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.6M | ✅ | 77.2M | 🟢 **-30%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 47.6M | ✅ | 70.4M | 🔴 **+48%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 77.0M | 🟢 **-31%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.6M | ✅ | 70.4M | 🔴 **+48%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 88.7M | 🟢 **-22%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 48.5M | ✅ | 80.5M | 🔴 **+66%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 90.9M | -19% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 41.0M | ✅ | 79.3M | 🔴 **+93%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 74.3M | -19% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 47.7M | ✅ | 80.0M | 🔴 **+68%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.5M | ✅ | 77.6M | 🟢 **-28%** |
| format.json | email format | 6 | ✅ | 56.9M | ✅ | 132.8M | 🔴 **+133%** |
| format.json | idn-email format | 6 | ✅ | 163.0M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 56.9M | ✅ | 118.6M | 🔴 **+108%** |
| format.json | ipv4 format | 6 | ✅ | 160.3M | ✅ | 123.9M | 🟢 **-23%** |
| format.json | ipv6 format | 6 | ✅ | 56.7M | ✅ | 131.7M | 🔴 **+132%** |
| format.json | idn-hostname format | 6 | ✅ | 162.6M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 56.9M | ✅ | 133.4M | 🔴 **+135%** |
| format.json | date format | 6 | ✅ | 163.6M | ✅ | 110.3M | 🟢 **-33%** |
| format.json | date-time format | 6 | ✅ | 57.0M | ✅ | 132.0M | 🔴 **+131%** |
| format.json | time format | 6 | ✅ | 162.3M | ✅ | 131.8M | -19% |
| format.json | json-pointer format | 6 | ✅ | 56.9M | ✅ | 133.1M | 🔴 **+134%** |
| format.json | relative-json-pointer format | 6 | ✅ | 162.7M | ✅ | 132.5M | -19% |
| format.json | iri format | 6 | ✅ | 56.7M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 163.2M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 56.6M | ✅ | 120.1M | 🔴 **+112%** |
| format.json | uri-reference format | 6 | ✅ | 159.0M | ✅ | 110.0M | 🟢 **-31%** |
| format.json | uri-template format | 6 | ✅ | 56.5M | ✅ | 133.0M | 🔴 **+135%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 164.5M | ✅ | 134.2M | -18% |
| if-then-else.json | ignore then without if | 2 | ✅ | 61.3M | ✅ | 135.7M | 🔴 **+121%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 151.9M | ✅ | 135.4M | -11% |
| if-then-else.json | if and then without else | 3 | ✅ | 53.0M | ✅ | 95.6M | 🔴 **+80%** |
| if-then-else.json | if and else without then | 3 | ✅ | 121.2M | ✅ | 87.8M | 🟢 **-28%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 49.0M | ✅ | 79.3M | 🔴 **+62%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 164.5M | ✅ | 126.8M | 🟢 **-23%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 53.2M | ✅ | 85.3M | 🔴 **+60%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 113.3M | ✅ | 80.1M | 🟢 **-29%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 34.3M | ✅ | 36.8M | +7% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 56.7M | ✅ | 19.6M | 🟢 **-65%** |
| items.json | a schema given for items | 4 | ✅ | 41.5M | ✅ | 43.9M | +6% |
| items.json | an array of schemas for items | 6 | ✅ | 96.5M | ✅ | 58.3M | 🟢 **-40%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 61.3M | ✅ | 125.8M | 🔴 **+105%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 101.7M | ✅ | 66.5M | 🟢 **-35%** |
| items.json | items with boolean schemas | 3 | ✅ | 44.2M | ✅ | 77.1M | 🔴 **+74%** |
| items.json | items and subitems | 6 | ✅ | 29.2M | ✅ | 8.0M | 🟢 **-72%** |
| items.json | nested items | 3 | ✅ | 11.7M | ✅ | 6.7M | 🟢 **-43%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 53.4M | ✅ | 65.6M | 🔴 **+23%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 56.1M | ✅ | 60.7M | +8% |
| maxItems.json | maxItems validation | 4 | ✅ | 51.3M | ✅ | 99.5M | 🔴 **+94%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 51.3M | ✅ | 62.6M | 🔴 **+22%** |
| maxLength.json | maxLength validation | 5 | ✅ | 44.4M | ✅ | 44.6M | +0% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 43.0M | ✅ | 51.1M | +19% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 43.8M | ✅ | 67.5M | 🔴 **+54%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 38.5M | ✅ | 47.7M | 🔴 **+24%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 37.2M | ✅ | 38.6M | +4% |
| maximum.json | maximum validation | 4 | ✅ | 50.0M | ✅ | 99.8M | 🔴 **+99%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 49.7M | ✅ | 100.0M | 🔴 **+101%** |
| minItems.json | minItems validation | 4 | ✅ | 50.4M | ✅ | 51.5M | +2% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 51.5M | ✅ | 39.8M | 🟢 **-23%** |
| minLength.json | minLength validation | 5 | ✅ | 43.7M | ✅ | 35.0M | 🟢 **-20%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 42.3M | ✅ | 47.9M | +13% |
| minProperties.json | minProperties validation | 6 | ✅ | 45.0M | ✅ | 69.4M | 🔴 **+54%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 36.0M | ✅ | 42.7M | +19% |
| minimum.json | minimum validation | 4 | ✅ | 49.2M | ✅ | 95.7M | 🔴 **+95%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 51.5M | ✅ | 90.1M | 🔴 **+75%** |
| multipleOf.json | by int | 3 | ✅ | 53.0M | ✅ | 77.9M | 🔴 **+47%** |
| multipleOf.json | by number | 3 | ✅ | 50.7M | ✅ | 57.9M | +14% |
| multipleOf.json | by small number | 2 | ✅ | 48.4M | ✅ | 26.8M | 🟢 **-45%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.5M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 53.4M | ✅ | 16.2M | 🟢 **-70%** |
| not.json | not | 2 | ✅ | 53.5M | ✅ | 86.1M | 🔴 **+61%** |
| not.json | not multiple types | 3 | ✅ | 49.6M | ✅ | 74.4M | 🔴 **+50%** |
| not.json | not more complex schema | 3 | ✅ | 48.3M | ✅ | 48.2M | 0% |
| not.json | forbidden property | 2 | ✅ | 40.4M | ✅ | 56.5M | 🔴 **+40%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 44.2M | ✅ | 62.8M | 🔴 **+42%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 44.3M | ✅ | 62.8M | 🔴 **+42%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 55.5M | ✅ | 133.9M | 🔴 **+141%** |
| not.json | double negation | 1 | ✅ | 53.9M | ✅ | 125.1M | 🔴 **+132%** |
| oneOf.json | oneOf | 4 | ✅ | 46.0M | ✅ | 70.8M | 🔴 **+54%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 28.6M | ✅ | 28.3M | -1% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 48.1M | ✅ | 65.2M | 🔴 **+36%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 60.4M | ✅ | 125.4M | 🔴 **+108%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 48.0M | ✅ | 65.0M | 🔴 **+35%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 48.0M | ✅ | 63.6M | 🔴 **+33%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 35.4M | ✅ | 29.2M | -18% |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 53.3M | ✅ | 86.8M | 🔴 **+63%** |
| oneOf.json | oneOf with required | 4 | ✅ | 38.2M | ✅ | 26.9M | 🟢 **-30%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.5M | ✅ | 33.4M | -13% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 43.0M | ✅ | 87.3M | 🔴 **+103%** |
| pattern.json | pattern validation | 8 | ✅ | 42.7M | ✅ | 69.3M | 🔴 **+62%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.9M | ✅ | 60.5M | 🔴 **+190%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.5M | ✅ | 17.9M | 🟢 **-24%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.1M | ✅ | 13.5M | -4% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.3M | ✅ | 13.6M | -5% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.3M | ✅ | 16.1M | -12% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.5M | ✅ | 22.8M | 🔴 **+38%** |
| properties.json | object properties validation | 6 | ✅ | 42.1M | ✅ | 54.5M | 🔴 **+29%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.7M | ✅ | 11.9M | 🟢 **-33%** |
| properties.json | properties with boolean schema | 4 | ✅ | 38.5M | ✅ | 58.3M | 🔴 **+52%** |
| properties.json | properties with escaped characters | 2 | ✅ | 39.2M | ✅ | 24.2M | 🟢 **-38%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 51.2M | ✅ | 60.3M | +18% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.6M | ✅ | 29.3M | +19% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 29.6M | ✅ | 41.0M | 🔴 **+38%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 17.7M | ✅ | 17.2M | -3% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 60.6M | ✅ | 135.4M | 🔴 **+124%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 39.1M | ✅ | 23.9M | 🟢 **-39%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 30.9M | ✅ | 30.6M | -1% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 32.5M | ✅ | 33.6M | +3% |
| ref.json | root pointer ref | 4 | ✅ | 19.8M | ✅ | 14.6M | 🟢 **-26%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 37.9M | ✅ | 29.2M | 🟢 **-23%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 42.5M | ✅ | 25.1M | 🟢 **-41%** |
| ref.json | escaped pointer ref | 6 | ✅ | 37.5M | ✅ | 29.6M | 🟢 **-21%** |
| ref.json | nested refs | 2 | ✅ | 32.6M | ✅ | 11.9M | 🟢 **-64%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 40.4M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 38.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 21.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 40.3M | ✅ | 49.6M | 🔴 **+23%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 40.5M | ✅ | 29.2M | 🟢 **-28%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 60.4M | ✅ | 121.0M | 🔴 **+100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 47.9M | ✅ | 33.7M | 🟢 **-30%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.0M | ✅ | 2.8M | 🟢 **-64%** |
| ref.json | refs with quote | 2 | ✅ | 40.1M | ✅ | 29.3M | 🟢 **-27%** |
| ref.json | Location-independent identifier | 2 | ✅ | 40.2M | ✅ | 40.2M | +0% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 39.7M | ✅ | 43.7M | +10% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 39.3M | ✅ | 43.6M | +11% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 41.0M | ✅ | 38.4M | -6% |
| ref.json | refs with relative uris and defs | 3 | ✅ | 28.5M | ✅ | 10.7M | 🟢 **-62%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 28.2M | ✅ | 10.4M | 🟢 **-63%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 36.1M | ✅ | 43.9M | 🔴 **+22%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.1M | ✅ | 25.6M | -18% |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 40.2M | ✅ | 29.0M | 🟢 **-28%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 40.2M | ✅ | 29.1M | 🟢 **-28%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 37.8M | ✅ | 29.0M | 🟢 **-23%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 35.0M | ✅ | 28.9M | -18% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 37.9M | ✅ | 29.2M | 🟢 **-23%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 33.2M | ✅ | 29.0M | -13% |
| ref.json | ref to if | 2 | ✅ | 37.0M | ✅ | 43.5M | +18% |
| ref.json | ref to then | 2 | ✅ | 40.1M | ✅ | 43.7M | +9% |
| ref.json | ref to else | 2 | ✅ | 40.2M | ✅ | 43.5M | +8% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 37.4M | ✅ | 43.8M | +17% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 51.8M | ✅ | 40.2M | 🟢 **-23%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 53.9M | ✅ | 43.1M | 🟢 **-20%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 49.4M | ✅ | 44.0M | -11% |
| refRemote.json | remote ref | 2 | ✅ | 35.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 38.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 25.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 28.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 30.6M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 26.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 33.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 32.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 36.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 32.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 47.5M | ✅ | 82.9M | 🔴 **+75%** |
| required.json | required default validation | 1 | ✅ | 56.9M | ✅ | 125.3M | 🔴 **+120%** |
| required.json | required with empty array | 1 | ✅ | 60.3M | ✅ | 125.5M | 🔴 **+108%** |
| required.json | required with escaped characters | 2 | ✅ | 36.6M | ✅ | 23.8M | 🟢 **-35%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.6M | ✅ | 36.4M | 🔴 **+54%** |
| type.json | integer type matches integers | 9 | ✅ | 56.9M | ✅ | 65.4M | +15% |
| type.json | number type matches numbers | 9 | ✅ | 46.7M | ✅ | 74.9M | 🔴 **+60%** |
| type.json | string type matches strings | 9 | ✅ | 49.1M | ✅ | 73.4M | 🔴 **+49%** |
| type.json | object type matches objects | 7 | ✅ | 43.9M | ✅ | 59.9M | 🔴 **+36%** |
| type.json | array type matches arrays | 7 | ✅ | 46.6M | ✅ | 59.2M | 🔴 **+27%** |
| type.json | boolean type matches booleans | 10 | ✅ | 46.3M | ✅ | 63.9M | 🔴 **+38%** |
| type.json | null type matches only the null object | 10 | ✅ | 45.8M | ✅ | 60.8M | 🔴 **+33%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 47.5M | ✅ | 71.2M | 🔴 **+50%** |
| type.json | type as array with one item | 2 | ✅ | 53.7M | ✅ | 88.2M | 🔴 **+64%** |
| type.json | type: array or object | 5 | ✅ | 48.2M | ✅ | 66.8M | 🔴 **+39%** |
| type.json | type: array, object or null | 5 | ✅ | 50.2M | ✅ | 82.1M | 🔴 **+64%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ✅ | 8.1M | 🟢 **-50%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.6M | ✅ | 24.2M | -15% |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.1M | ✅ | 29.6M | 🔴 **+73%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 58.0M | ✅ | 130.1M | 🔴 **+124%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 51.3M | ✅ | 47.0M | -8% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 48.4M | ✅ | 42.4M | -12% |
| optional/bignum.json | integer | 2 | ✅ | 59.2M | ✅ | 121.8M | 🔴 **+106%** |
| optional/bignum.json | number | 2 | ✅ | 59.6M | ✅ | 126.7M | 🔴 **+112%** |
| optional/bignum.json | string | 1 | ✅ | 46.9M | ✅ | 63.2M | 🔴 **+35%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 55.9M | ✅ | 111.3M | 🔴 **+99%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.7M | ✅ | 60.5M | +9% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 55.9M | ✅ | 111.4M | 🔴 **+99%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 44.4M | ✅ | 59.7M | 🔴 **+34%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 349K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.0M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 429K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 22.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 21.0M | ✅ | 72.2M | 🔴 **+244%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.2M | ✅ | 36.1M | 🔴 **+98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 22.5M | ✅ | 36.2M | 🔴 **+61%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.1M | ✅ | 36.1M | 🔴 **+56%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 24.6M | ✅ | 32.4M | 🔴 **+32%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 22.0M | ✅ | 35.9M | 🔴 **+63%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.3M | ✅ | 36.6M | 🔴 **+57%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 22.3M | ✅ | 36.1M | 🔴 **+62%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 22.9M | ✅ | 38.2M | 🔴 **+67%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.6M | ✅ | 33.8M | 🔴 **+32%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.4M | ✅ | 19.7M | 🔴 **+28%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.1M | ✅ | 16.5M | +17% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.3M | ✅ | 15.6M | +17% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.5M | ✅ | 31.6M | 🔴 **+29%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.5M | ✅ | 25.5M | 🔴 **+46%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 20.9M | ✅ | 20.3M | -3% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.2M | ✅ | 13.7M | 🟢 **-25%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.0M | ✅ | 15.3M | -10% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 9.1M | +17% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 7.9M | ✅ | 11.4M | 🔴 **+44%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 13.6M | ✅ | 15.9M | +17% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.9M | ✅ | 9.4M | 🟢 **-59%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 7.8M | ✅ | 24.4M | 🔴 **+214%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.2M | ✅ | 14.7M | -14% |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.0M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.2M | ✅ | 35.2M | +0% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.3M | ✅ | 18.0M | 🔴 **+59%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 27.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 13.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 26.9M | ✅ | 35.6M | 🔴 **+33%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 50.7M | ✅ | 939K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 29.6M | ✅ | 42.6M | 🔴 **+44%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 54.3M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ✅ | 8.0M | -14% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 14.6M | ✅ | 18.7M | 🔴 **+29%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ✅ | 4.7M | 🟢 **-20%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 29.2M | ✅ | 25.6M | -12% |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 44.4M | ✅ | 38.9M | -12% |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 44.2M | ✅ | 38.9M | -12% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.2M | ✅ | 35.0M | 🔴 **+33%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.2M | ✅ | 10.5M | 🟢 **-35%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 11.7M | ✅ | 25.4M | 🔴 **+117%** |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.7M | ✅ | 7.8M | +2% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.6M | ✅ | 22.0M | 🟢 **-42%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 125.4M | -18% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.9M | ✅ | 90.8M | 🔴 **+23%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ✅ | 133.5M | -19% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 77.0M | ✅ | 69.3M | -10% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 30.4M | ✅ | 35.6M | +17% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 20.6M | ✅ | 24.9M | 🔴 **+21%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.0M | ✅ | 78.0M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 76.8M | ✅ | 125.4M | 🔴 **+63%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.1M | ✅ | 41.1M | -2% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.4M | ✅ | 24.5M | +15% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.8M | ✅ | 28.3M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.6M | ✅ | 25.2M | 🟢 **-23%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 153.1M | ✅ | 125.3M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.5M | ✅ | 15.7M | 🟢 **-43%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ✅ | 51.5M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 21.7M | ✅ | 14.0M | 🟢 **-35%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 17.3M | ✅ | 17.0M | -1% |
| allOf.json | allOf | 4 | ✅ | 38.8M | ✅ | 39.6M | +2% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ✅ | 25.5M | -18% |
| allOf.json | allOf simple types | 2 | ✅ | 69.6M | ✅ | 85.8M | 🔴 **+23%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 78.0M | ✅ | 125.5M | 🔴 **+61%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 63.3M | ✅ | 64.2M | +1% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.2M | ✅ | 63.8M | 🟢 **-31%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 85.1M | ✅ | 125.4M | 🔴 **+47%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.7M | ✅ | 125.8M | -18% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.5M | ✅ | 86.6M | +18% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.6M | ✅ | 88.7M | 🟢 **-25%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.6M | ✅ | 87.3M | +17% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.5M | ✅ | 59.1M | 🟢 **-29%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.2M | ✅ | 38.2M | 🟢 **-48%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.3M | ✅ | 35.5M | 🟢 **-59%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 49.8M | ✅ | 37.6M | 🟢 **-25%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.1M | ✅ | 36.1M | 🟢 **-51%** |
| anyOf.json | anyOf | 4 | ✅ | 75.9M | ✅ | 90.2M | +19% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.3M | ✅ | 27.7M | 🟢 **-22%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.1M | ✅ | 125.4M | 🔴 **+47%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.2M | ✅ | 125.4M | 🔴 **+47%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 64.8M | +2% |
| anyOf.json | anyOf complex types | 4 | ✅ | 49.3M | ✅ | 31.0M | 🟢 **-37%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.8M | ✅ | 134.6M | 🔴 **+69%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.8M | ✅ | 86.5M | +16% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 84.1M | ✅ | 138.8M | 🔴 **+65%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.7M | ✅ | 60.9M | +0% |
| const.json | const validation | 3 | ✅ | 64.2M | ✅ | 59.7M | -7% |
| const.json | const with object | 4 | ✅ | 40.2M | ✅ | 32.4M | -19% |
| const.json | const with array | 3 | ✅ | 56.3M | ✅ | 5.3M | 🟢 **-90%** |
| const.json | const with null | 2 | ✅ | 74.8M | ✅ | 86.8M | +16% |
| const.json | const with false does not match 0 | 3 | ✅ | 70.8M | ✅ | 77.2M | +9% |
| const.json | const with true does not match 1 | 3 | ✅ | 71.9M | ✅ | 72.3M | +0% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.4M | ✅ | 68.7M | +8% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 63.7M | ✅ | 68.2M | +7% |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 62.8M | ✅ | 33.6M | 🟢 **-46%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 64.7M | ✅ | 33.5M | 🟢 **-48%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.6M | ✅ | 64.9M | +7% |
| const.json | const with 1 does not match true | 3 | ✅ | 70.5M | ✅ | 85.8M | 🔴 **+22%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 69.0M | ✅ | 69.1M | +0% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 69.8M | ✅ | 80.6M | +15% |
| const.json | nul characters in strings | 2 | ✅ | 62.2M | ✅ | 64.1M | +3% |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ✅ | 66.8M | +18% |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.0M | ✅ | 75.0M | +19% |
| contains.json | contains keyword validation | 6 | ✅ | 61.9M | ✅ | 19.1M | 🟢 **-69%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.5M | ✅ | 14.7M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 68.6M | ✅ | 73.1M | +7% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 69.1M | ✅ | 42.2M | 🟢 **-39%** |
| contains.json | items + contains | 4 | ✅ | 41.3M | ✅ | 18.0M | 🟢 **-56%** |
| contains.json | contains with false if subschema | 2 | ✅ | 66.1M | ✅ | 73.3M | +11% |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 38.2M | 🟢 **-48%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 90.2M | ✅ | 137.7M | 🔴 **+53%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 89.9M | ✅ | 122.8M | 🔴 **+37%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 80.4M | ✅ | 139.6M | 🔴 **+74%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 74.2M | ✅ | 118.2M | 🔴 **+59%** |
| default.json | invalid type for default | 2 | ✅ | 67.7M | ✅ | 75.6M | +12% |
| default.json | invalid string value for default | 2 | ✅ | 53.2M | ✅ | 48.2M | -9% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.0M | ✅ | 56.2M | +10% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 61.2M | ✅ | 71.8M | +17% |
| dependentRequired.json | empty dependents | 3 | ✅ | 90.3M | ✅ | 137.9M | 🔴 **+53%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.9M | ✅ | 31.4M | +17% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 47.8M | ✅ | 38.9M | -19% |
| dependentSchemas.json | single dependency | 8 | ✅ | 53.7M | ✅ | 48.4M | -10% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.0M | ✅ | 54.9M | +2% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.5M | ✅ | 34.7M | -14% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.3M | ✅ | 23.9M | 🟢 **-37%** |
| enum.json | simple enum validation | 2 | ✅ | 71.4M | ✅ | 65.7M | -8% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.4M | ✅ | 38.5M | -17% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.2M | ✅ | 78.4M | +10% |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 41.2M | 🔴 **+181%** |
| enum.json | enum with escaped characters | 3 | ✅ | 76.7M | ✅ | 97.2M | 🔴 **+27%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 71.9M | ✅ | 73.2M | +2% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.7M | ✅ | 68.0M | +7% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 72.0M | ✅ | 73.5M | +2% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.6M | ✅ | 67.5M | +6% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 71.3M | ✅ | 86.9M | 🔴 **+22%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ✅ | 79.9M | 🔴 **+21%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.2M | ✅ | 91.1M | 🔴 **+30%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 63.9M | ✅ | 78.2M | 🔴 **+22%** |
| enum.json | nul characters in strings | 2 | ✅ | 62.1M | ✅ | 73.4M | +18% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.0M | ✅ | 79.8M | +17% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 79.2M | ✅ | 78.4M | -1% |
| format.json | email format | 6 | ✅ | 89.6M | ✅ | 132.1M | 🔴 **+47%** |
| format.json | idn-email format | 6 | ✅ | 89.5M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 72.5M | ✅ | 115.5M | 🔴 **+59%** |
| format.json | ipv4 format | 6 | ✅ | 80.2M | ✅ | 111.8M | 🔴 **+39%** |
| format.json | ipv6 format | 6 | ✅ | 72.6M | ✅ | 132.9M | 🔴 **+83%** |
| format.json | idn-hostname format | 6 | ✅ | 79.9M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 89.6M | ✅ | 126.4M | 🔴 **+41%** |
| format.json | date format | 6 | ✅ | 74.9M | ✅ | 120.4M | 🔴 **+61%** |
| format.json | date-time format | 6 | ✅ | 72.7M | ✅ | 130.9M | 🔴 **+80%** |
| format.json | time format | 6 | ✅ | 72.4M | ✅ | 114.7M | 🔴 **+59%** |
| format.json | json-pointer format | 6 | ✅ | 72.7M | ✅ | 132.4M | 🔴 **+82%** |
| format.json | relative-json-pointer format | 6 | ✅ | 72.7M | ✅ | 133.3M | 🔴 **+83%** |
| format.json | iri format | 6 | ✅ | 72.7M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 79.5M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 72.7M | ✅ | 111.7M | 🔴 **+54%** |
| format.json | uri-reference format | 6 | ✅ | 72.6M | ✅ | 128.4M | 🔴 **+77%** |
| format.json | uri-template format | 6 | ✅ | 80.2M | ✅ | 123.0M | 🔴 **+53%** |
| format.json | uuid format | 6 | ✅ | 80.4M | ✅ | 131.0M | 🔴 **+63%** |
| format.json | duration format | 6 | ✅ | 74.0M | ✅ | 132.7M | 🔴 **+79%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.6M | ✅ | 135.2M | 🔴 **+70%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.5M | ✅ | 130.3M | 🔴 **+64%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.7M | ✅ | 134.3M | 🔴 **+68%** |
| if-then-else.json | if and then without else | 3 | ✅ | 73.8M | ✅ | 95.1M | 🔴 **+29%** |
| if-then-else.json | if and else without then | 3 | ✅ | 72.8M | ✅ | 94.6M | 🔴 **+30%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.5M | ✅ | 80.0M | +17% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.5M | ✅ | 127.7M | 🔴 **+61%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.6M | ✅ | 85.9M | +18% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.0M | ✅ | 81.0M | +14% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.1M | ✅ | 37.3M | -9% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.4M | ✅ | 22.3M | 🟢 **-49%** |
| items.json | a schema given for items | 4 | ✅ | 52.4M | ✅ | 43.9M | -16% |
| items.json | an array of schemas for items | 6 | ✅ | 65.4M | ✅ | 59.2M | -9% |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.5M | ✅ | 135.2M | 🔴 **+53%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.7M | ✅ | 66.5M | -3% |
| items.json | items with boolean schemas | 3 | ✅ | 59.6M | ✅ | 78.3M | 🔴 **+31%** |
| items.json | items and subitems | 6 | ✅ | 27.3M | ✅ | 8.1M | 🟢 **-70%** |
| items.json | nested items | 3 | ✅ | 7.7M | ✅ | 6.7M | -13% |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 66.4M | -8% |
| items.json | array-form items with null instance e... | 1 | ✅ | 77.0M | ✅ | 69.3M | -10% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.6M | ✅ | 135.0M | 🔴 **+52%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.5M | ✅ | 24.7M | 🟢 **-57%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.4M | ✅ | 24.3M | 🟢 **-62%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 57.8M | ✅ | 20.4M | 🟢 **-65%** |
| maxItems.json | maxItems validation | 4 | ✅ | 74.9M | ✅ | 98.3M | 🔴 **+31%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.4M | ✅ | 83.5M | 🔴 **+20%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.9M | ✅ | 46.9M | 🟢 **-22%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.2M | ✅ | 51.3M | -5% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.4M | ✅ | 68.9M | 🔴 **+22%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.4M | ✅ | 49.3M | +4% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.9M | ✅ | 49.4M | -1% |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ✅ | 95.3M | 🔴 **+30%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 71.7M | ✅ | 101.8M | 🔴 **+42%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.5M | ✅ | 134.5M | 🔴 **+52%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.9M | ✅ | 30.2M | 🟢 **-54%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.3M | ✅ | 23.6M | 🟢 **-60%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.5M | ✅ | 24.1M | 🟢 **-62%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 56.8M | ✅ | 24.3M | 🟢 **-57%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 56.5M | ✅ | 23.6M | 🟢 **-58%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 88.6M | ✅ | 54.3M | 🟢 **-39%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 68.5M | ✅ | 31.7M | 🟢 **-54%** |
| minItems.json | minItems validation | 4 | ✅ | 74.9M | ✅ | 97.8M | 🔴 **+31%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.4M | ✅ | 83.0M | +20% |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ✅ | 37.0M | 🟢 **-34%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 55.0M | ✅ | 48.0M | -13% |
| minProperties.json | minProperties validation | 6 | ✅ | 57.5M | ✅ | 69.1M | 🔴 **+20%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.5M | ✅ | 49.5M | 0% |
| minimum.json | minimum validation | 4 | ✅ | 73.2M | ✅ | 98.4M | 🔴 **+34%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 90.2M | 🔴 **+31%** |
| multipleOf.json | by int | 3 | ✅ | 73.8M | ✅ | 96.5M | 🔴 **+31%** |
| multipleOf.json | by number | 3 | ✅ | 35.1M | ✅ | 59.4M | 🔴 **+69%** |
| multipleOf.json | by small number | 2 | ✅ | 63.7M | ✅ | 27.1M | 🟢 **-58%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 1.0M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 16.7M | 🟢 **-77%** |
| not.json | not | 2 | ✅ | 72.0M | ✅ | 85.8M | +19% |
| not.json | not multiple types | 3 | ✅ | 67.7M | ✅ | 65.6M | -3% |
| not.json | not more complex schema | 3 | ✅ | 65.5M | ✅ | 49.8M | 🟢 **-24%** |
| not.json | forbidden property | 2 | ✅ | 49.7M | ✅ | 59.4M | +19% |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.0M | ✅ | 63.1M | +3% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.7M | ✅ | 62.5M | +1% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 83.8M | ✅ | 136.3M | 🔴 **+63%** |
| not.json | double negation | 1 | ✅ | 85.1M | ✅ | 125.4M | 🔴 **+47%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.4M | ✅ | 14.7M | 🟢 **-56%** |
| oneOf.json | oneOf | 4 | ✅ | 60.7M | ✅ | 74.9M | 🔴 **+23%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.6M | ✅ | 26.8M | -18% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 57.4M | ✅ | 62.3M | +8% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.1M | ✅ | 121.2M | 🔴 **+42%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 43.1M | 🟢 **-32%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.3M | ✅ | 63.1M | 0% |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.4M | ✅ | 28.0M | 🟢 **-35%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 71.1M | ✅ | 77.0M | +8% |
| oneOf.json | oneOf with required | 4 | ✅ | 46.4M | ✅ | 26.3M | 🟢 **-43%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.7M | ✅ | 32.4M | 🟢 **-32%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.1M | ✅ | 86.6M | 🔴 **+20%** |
| pattern.json | pattern validation | 8 | ✅ | 50.0M | ✅ | 70.4M | 🔴 **+41%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 13.8M | ✅ | 54.7M | 🔴 **+296%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.6M | ✅ | 18.3M | 🟢 **-31%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.2M | ✅ | 14.9M | +5% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 13.2M | -16% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.9M | ✅ | 18.0M | -14% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.9M | ✅ | 22.4M | 🔴 **+33%** |
| properties.json | object properties validation | 6 | ✅ | 54.3M | ✅ | 52.2M | -4% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 12.2M | 🟢 **-39%** |
| properties.json | properties with boolean schema | 4 | ✅ | 48.1M | ✅ | 52.9M | +10% |
| properties.json | properties with escaped characters | 2 | ✅ | 51.2M | ✅ | 24.0M | 🟢 **-53%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 66.5M | ✅ | 58.1M | -13% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ✅ | 28.5M | +2% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.3M | ✅ | 40.9M | +4% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.6M | ✅ | 15.8M | -15% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.6M | ✅ | 130.8M | 🔴 **+48%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.7M | ✅ | 25.0M | 🟢 **-50%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.5M | ✅ | 29.5M | 🟢 **-25%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.9M | ✅ | 32.8M | 🟢 **-22%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.8M | ✅ | 12.6M | -9% |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.1M | ✅ | 10.6M | 🔴 **+74%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.2M | ✅ | 10.3M | 🔴 **+224%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.3M | ✅ | 10.6M | -6% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.1M | ✅ | 10.4M | -14% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.3M | ✅ | 14.8M | 🔴 **+59%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ✅ | 14.0M | 🔴 **+73%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ✅ | 4.0M | -3% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ✅ | 4.2M | 0% |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ✅ | 13.1M | 🟢 **-46%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.7M | ✅ | 28.7M | 🟢 **-46%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.8M | ✅ | 24.2M | 🟢 **-57%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.0M | ✅ | 28.5M | 🟢 **-38%** |
| ref.json | nested refs | 2 | ✅ | 38.3M | ✅ | 11.9M | 🟢 **-69%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.3M | ✅ | 29.9M | 🟢 **-31%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.5M | ✅ | 47.8M | -9% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.6M | ✅ | 28.7M | 🟢 **-36%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.0M | ✅ | 120.0M | 🔴 **+41%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ✅ | 34.5M | 🟢 **-46%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ✅ | 2.5M | 🟢 **-71%** |
| ref.json | refs with quote | 2 | ✅ | 44.3M | ✅ | 28.7M | 🟢 **-35%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.4M | ✅ | 9.8M | 🟢 **-64%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.0M | ✅ | 38.1M | 🟢 **-31%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ✅ | 10.1M | 🟢 **-70%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.7M | ✅ | 10.3M | 🟢 **-68%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.5M | ✅ | 42.7M | -12% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 48.0M | ✅ | 41.1M | -14% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.3M | ✅ | 38.6M | 🟢 **-45%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.0M | ✅ | 24.8M | 🟢 **-35%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.7M | ✅ | 23.6M | 🟢 **-42%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.4M | ✅ | 28.7M | 🟢 **-45%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 52.1M | ✅ | 28.8M | 🟢 **-45%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.2M | ✅ | 27.7M | 🟢 **-41%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.3M | ✅ | 28.8M | 🟢 **-42%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 39.5M | ✅ | 26.1M | 🟢 **-34%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 52.7M | ✅ | 27.7M | 🟢 **-47%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 49.5M | ✅ | 24.3M | 🟢 **-51%** |
| ref.json | ref to if | 2 | ✅ | 49.3M | ✅ | 39.0M | 🟢 **-21%** |
| ref.json | ref to then | 2 | ✅ | 49.7M | ✅ | 36.3M | 🟢 **-27%** |
| ref.json | ref to else | 2 | ✅ | 48.0M | ✅ | 38.9M | -19% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 48.9M | ✅ | 35.7M | 🟢 **-27%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 32.4M | 🟢 **-56%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 33.8M | 🟢 **-54%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.1M | ✅ | 42.5M | 🟢 **-42%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ✅ | 18.0M | 🔴 **+273%** |
| refRemote.json | remote ref | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 47.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 42.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 49.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 40.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 47.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.1M | ✅ | 76.0M | 🔴 **+22%** |
| required.json | required default validation | 1 | ✅ | 85.1M | ✅ | 121.4M | 🔴 **+43%** |
| required.json | required with empty array | 1 | ✅ | 85.1M | ✅ | 121.4M | 🔴 **+43%** |
| required.json | required with escaped characters | 2 | ✅ | 49.8M | ✅ | 23.4M | 🟢 **-53%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.4M | ✅ | 35.1M | 🔴 **+28%** |
| type.json | integer type matches integers | 9 | ✅ | 63.3M | ✅ | 64.3M | +2% |
| type.json | number type matches numbers | 9 | ✅ | 66.0M | ✅ | 67.1M | +2% |
| type.json | string type matches strings | 9 | ✅ | 65.3M | ✅ | 66.1M | +1% |
| type.json | object type matches objects | 7 | ✅ | 56.1M | ✅ | 57.6M | +3% |
| type.json | array type matches arrays | 7 | ✅ | 61.2M | ✅ | 59.8M | -2% |
| type.json | boolean type matches booleans | 10 | ✅ | 62.2M | ✅ | 63.7M | +2% |
| type.json | null type matches only the null object | 10 | ✅ | 62.2M | ✅ | 60.1M | -3% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.3M | ✅ | 65.2M | +3% |
| type.json | type as array with one item | 2 | ✅ | 73.1M | ✅ | 84.0M | +15% |
| type.json | type: array or object | 5 | ✅ | 68.6M | ✅ | 65.9M | -4% |
| type.json | type: array, object or null | 5 | ✅ | 73.5M | ✅ | 73.8M | +0% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.9M | ✅ | 130.3M | 🔴 **+65%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 57.8M | ✅ | 80.0M | 🔴 **+38%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.6M | ✅ | 53.9M | -1% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.5M | ✅ | 45.2M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 54.8M | ✅ | 52.1M | -5% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 75.3M | ✅ | 67.8M | -10% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 40.6M | ✅ | 28.0M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 35.9M | ✅ | 29.1M | -19% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.9M | ✅ | 37.4M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.0M | ✅ | 13.3M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 77.8M | ✅ | 70.7M | -9% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.3M | ✅ | 70.7M | 🔴 **+232%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.5M | ✅ | 15.4M | 🔴 **+23%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.7M | ✅ | 23.8M | 🔴 **+52%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.4M | ✅ | 27.7M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.5M | ✅ | 14.6M | 🔴 **+27%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 58.8M | ✅ | 79.1M | 🔴 **+35%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.7M | ✅ | 34.9M | 🟢 **-28%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 48.4M | ✅ | 34.7M | 🟢 **-28%** |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 45.1M | ✅ | 57.8M | 🔴 **+28%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.7M | ✅ | 27.7M | +17% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 70.1M | ✅ | 130.3M | 🔴 **+86%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 72.0M | ✅ | 66.4M | -8% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.9M | ✅ | 21.6M | -1% |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.8M | ✅ | 32.2M | 🟢 **-23%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 55.7M | ✅ | 98.1M | 🔴 **+76%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.8M | ✅ | 24.8M | 🟢 **-24%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.3M | ✅ | 25.0M | 🟢 **-29%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.4M | ✅ | 20.5M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.5M | ✅ | 16.0M | 🔴 **+38%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 66.2M | ✅ | 58.0M | -12% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.3M | ✅ | 15.9M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ✅ | 12.5M | 🔴 **+32%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.3M | ✅ | 57.6M | -13% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 33.1M | ✅ | 56.0M | 🔴 **+69%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.8M | ✅ | 5.5M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.2M | ✅ | 9.8M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 26.6M | ✅ | 11.6M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.6M | ✅ | 9.4M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.8M | ✅ | 7.6M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.5M | ✅ | 6.3M | 🟢 **-66%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.3M | ✅ | 12.4M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 35.5M | ✅ | 22.2M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.3M | ✅ | 15.6M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 31.0M | ✅ | 15.8M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ✅ | 15.8M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.7M | ✅ | 16.0M | 🟢 **-46%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.3M | ✅ | 58.0M | 🔴 **+86%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.2M | ✅ | 57.6M | 🔴 **+91%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ✅ | 14.6M | 🟢 **-44%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.6M | ✅ | 20.1M | 🟢 **-27%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.0M | ✅ | 12.3M | 🟢 **-41%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.2M | ✅ | 19.5M | 🔴 **+60%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.2M | ✅ | 15.5M | 🟢 **-43%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.3M | ✅ | 21.3M | 🟢 **-32%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 45.8M | ✅ | 21.5M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.1M | ✅ | 10.8M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 17.9M | ✅ | 9.2M | 🟢 **-49%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ✅ | 2.9M | 🟢 **-59%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 72.7M | ✅ | 115.4M | 🔴 **+59%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 50.9M | ✅ | 46.1M | -9% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.5M | ✅ | 20.9M | -18% |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.8M | ✅ | 4.0M | 🟢 **-69%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ✅ | 13.1M | 🟢 **-40%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.0M | ✅ | 11.8M | 🟢 **-51%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ✅ | 8.0M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.9M | ✅ | 24.0M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ✅ | 29.5M | 🔴 **+55%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.3M | ✅ | 126.7M | 🔴 **+49%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.4M | ✅ | 45.4M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.4M | ✅ | 42.4M | 🟢 **-33%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 51.2M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.0M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 62.0M | ✅ | 23.3M | 🟢 **-62%** |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 112.0M | 🔴 **+34%** |
| optional/bignum.json | number | 2 | ✅ | 82.2M | ✅ | 121.2M | 🔴 **+47%** |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 61.5M | +1% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 107.8M | 🔴 **+43%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ✅ | 58.2M | +1% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 106.0M | 🔴 **+41%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ✅ | 59.6M | +3% |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.7M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.4M | ✅ | 68.7M | +12% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.3M | ✅ | 132.6M | 🔴 **+47%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.7M | ✅ | 30.6M | -9% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.6M | ✅ | 39.4M | -17% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 53.7M | ✅ | 47.0M | -12% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 57.7M | ✅ | 53.6M | -7% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.8M | ✅ | 35.1M | -14% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 13.5M | ✅ | 66.6M | 🔴 **+392%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ✅ | 35.0M | 🔴 **+76%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.7M | ✅ | 17.4M | 🟢 **-37%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 16.0M | 🟢 **-39%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.1M | ✅ | 32.5M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 35.2M | 🔴 **+37%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.0M | ✅ | 35.4M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.6M | ✅ | 34.6M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.8M | ✅ | 37.1M | 🔴 **+44%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.8M | ✅ | 32.0M | +7% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ✅ | 20.2M | +19% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ✅ | 16.1M | +8% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.4M | ✅ | 15.6M | +1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.8M | ✅ | 32.8M | +18% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.2M | ✅ | 26.9M | 🔴 **+33%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ✅ | 20.7M | -11% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.1M | ✅ | 12.4M | 🟢 **-39%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ✅ | 14.2M | 🟢 **-28%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 8.9M | +13% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.0M | ✅ | 10.3M | 🔴 **+28%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ✅ | 16.0M | 🟢 **-26%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ✅ | 9.1M | 🟢 **-64%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.2M | ✅ | 23.1M | 🔴 **+183%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.6M | ✅ | 12.9M | 🟢 **-68%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.8M | ✅ | 14.5M | 🟢 **-23%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.3M | ✅ | 34.8M | -7% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ✅ | 17.0M | 🔴 **+41%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.9M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.6M | ✅ | 34.9M | +10% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 69.0M | ✅ | 935K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 39.9M | ✅ | 42.1M | +6% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.6M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 7.6M | 🟢 **-22%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.0M | ✅ | 18.5M | +15% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.6M | 🟢 **-29%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.4M | ✅ | 15.5M | +1% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.1M | ✅ | 24.8M | 🟢 **-31%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 61.8M | ✅ | 60.8M | -2% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.9M | ✅ | 34.0M | +14% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ✅ | 10.4M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 53.1M | ✅ | 28.6M | 🟢 **-46%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 53.2M | ✅ | 28.6M | 🟢 **-46%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.1M | ✅ | 27.6M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 72.9M | ✅ | 37.3M | 🟢 **-49%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 50.3M | ✅ | 27.0M | 🟢 **-46%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.7M | ✅ | 23.7M | 🔴 **+73%** |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 60.8M | ✅ | 20.9M | 🟢 **-66%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 12.2M | ✅ | 24.2M | 🔴 **+99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 22.9M | ✅ | 27.8M | 🔴 **+21%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.2M | ✅ | 25.1M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 139.5M | ✅ | 125.4M | -10% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.6M | ✅ | 16.9M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 67.8M | ✅ | 51.5M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 26.2M | ✅ | 13.7M | 🟢 **-48%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 29.4M | ✅ | 9.3M | 🟢 **-68%** |
| allOf.json | allOf | 4 | ✅ | 36.5M | ✅ | 37.5M | +3% |
| allOf.json | allOf with base schema | 5 | ✅ | 26.7M | ✅ | 25.3M | -5% |
| allOf.json | allOf simple types | 2 | ✅ | 61.7M | ✅ | 56.6M | -8% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 139.6M | ✅ | 125.2M | -10% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 62.4M | ✅ | 64.9M | +4% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 88.1M | ✅ | 64.8M | 🟢 **-26%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 77.3M | ✅ | 124.8M | 🔴 **+62%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 138.6M | ✅ | 125.2M | -10% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.7M | ✅ | 86.6M | +18% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 100.8M | ✅ | 87.4M | -13% |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 73.4M | ✅ | 64.5M | -12% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 79.2M | ✅ | 59.0M | 🟢 **-26%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.7M | ✅ | 37.9M | 🟢 **-49%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 65.6M | ✅ | 35.2M | 🟢 **-46%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 43.1M | ✅ | 34.8M | -19% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.3M | ✅ | 30.3M | 🟢 **-59%** |
| anyOf.json | anyOf | 4 | ✅ | 66.0M | ✅ | 81.4M | 🔴 **+23%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.0M | ✅ | 19.4M | 🟢 **-45%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 83.9M | ✅ | 125.4M | 🔴 **+49%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 84.7M | ✅ | 66.5M | 🟢 **-22%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 62.4M | ✅ | 64.3M | +3% |
| anyOf.json | anyOf complex types | 4 | ✅ | 45.3M | ✅ | 30.7M | 🟢 **-32%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 67.7M | ✅ | 130.8M | 🔴 **+93%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.0M | ✅ | 85.3M | +15% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 71.9M | ✅ | 76.8M | +7% |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 57.9M | ✅ | 61.5M | +6% |
| const.json | const validation | 3 | ✅ | 63.6M | ✅ | 61.0M | -4% |
| const.json | const with object | 4 | ✅ | 30.5M | ✅ | 31.5M | +3% |
| const.json | const with array | 3 | ✅ | 55.6M | ✅ | 9.1M | 🟢 **-84%** |
| const.json | const with null | 2 | ✅ | 74.6M | ✅ | 86.2M | +15% |
| const.json | const with false does not match 0 | 3 | ✅ | 70.8M | ✅ | 71.5M | +1% |
| const.json | const with true does not match 1 | 3 | ✅ | 70.5M | ✅ | 74.6M | +6% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 49.1M | ✅ | 64.5M | 🔴 **+31%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 58.3M | ✅ | 38.2M | 🟢 **-35%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 64.1M | ✅ | 33.5M | 🟢 **-48%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 62.7M | ✅ | 18.4M | 🟢 **-71%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.7M | ✅ | 64.3M | +6% |
| const.json | const with 1 does not match true | 3 | ✅ | 62.3M | ✅ | 73.4M | +18% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 61.8M | ✅ | 64.3M | +4% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 61.4M | ✅ | 76.3M | 🔴 **+24%** |
| const.json | nul characters in strings | 2 | ✅ | 50.7M | ✅ | 73.8M | 🔴 **+46%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 31.9M | 🟢 **-45%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.2M | ✅ | 75.4M | +19% |
| contains.json | contains keyword validation | 6 | ✅ | 60.8M | ✅ | 19.3M | 🟢 **-68%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.9M | ✅ | 13.8M | 🟢 **-76%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 67.5M | ✅ | 72.3M | +7% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 68.7M | ✅ | 40.8M | 🟢 **-41%** |
| contains.json | items + contains | 4 | ✅ | 41.0M | ✅ | 17.6M | 🟢 **-57%** |
| contains.json | contains with false if subschema | 2 | ✅ | 66.8M | ✅ | 67.7M | +1% |
| contains.json | contains with null instance elements | 1 | ✅ | 76.1M | ✅ | 37.8M | 🟢 **-50%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 73.8M | ✅ | 137.2M | 🔴 **+86%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 90.0M | ✅ | 122.9M | 🔴 **+37%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 77.7M | ✅ | 127.6M | 🔴 **+64%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 73.9M | ✅ | 121.8M | 🔴 **+65%** |
| default.json | invalid type for default | 2 | ✅ | 69.1M | ✅ | 75.1M | +9% |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ✅ | 43.5M | 🟢 **-21%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 53.7M | ✅ | 57.2M | +7% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.4M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.2M | ✅ | 71.9M | 🔴 **+21%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 89.8M | ✅ | 135.3M | 🔴 **+51%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.0M | ✅ | 31.0M | +11% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 45.2M | ✅ | 39.0M | -14% |
| dependentSchemas.json | single dependency | 8 | ✅ | 50.8M | ✅ | 46.0M | -10% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 50.3M | ✅ | 53.8M | +7% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 38.4M | ✅ | 35.7M | -7% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.1M | ✅ | 26.5M | 🟢 **-29%** |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 12.8M | ✅ | 4.4M | 🟢 **-65%** |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.2M | ✅ | 20.0M | -1% |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.8M | ✅ | 21.4M | 🔴 **+36%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.0M | ✅ | 3.1M | 🟢 **-72%** |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 12.3M | ✅ | 4.5M | 🟢 **-63%** |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.1M | ✅ | 2.8M | 🟢 **-72%** |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.9M | ✅ | 6.1M | 🟢 **-23%** |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 15.4M | ✅ | 17.5M | +14% |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 11.4M | ✅ | 8.2M | 🟢 **-28%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.5M | ✅ | 1.5M | 🟢 **-80%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.3M | ✅ | 11.1M | 🟢 **-22%** |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ✅ | 1.6M | 🟢 **-74%** |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.3M | ✅ | 1.6M | 🟢 **-75%** |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.6M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 25.2M | ✅ | 28.7M | +14% |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 7.5M | ✅ | 2.9M | 🟢 **-62%** |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.6M | ✅ | 85.2M | +19% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.5M | ✅ | 38.4M | -18% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 73.5M | ✅ | 88.2M | +20% |
| enum.json | enums in properties | 6 | ✅ | 14.3M | ✅ | 39.7M | 🔴 **+177%** |
| enum.json | enum with escaped characters | 3 | ✅ | 75.7M | ✅ | 94.4M | 🔴 **+25%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 70.6M | ✅ | 73.9M | +5% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.7M | ✅ | 69.8M | +13% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 70.9M | ✅ | 75.5M | +6% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 60.2M | ✅ | 67.6M | +12% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.0M | ✅ | 89.1M | 🔴 **+20%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.4M | ✅ | 73.0M | +10% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.8M | ✅ | 89.9M | 🔴 **+22%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 64.1M | ✅ | 80.8M | 🔴 **+26%** |
| enum.json | nul characters in strings | 2 | ✅ | 58.3M | ✅ | 74.0M | 🔴 **+27%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 67.6M | ✅ | 79.2M | +17% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 67.7M | ✅ | 77.9M | +15% |
| format.json | email format | 7 | ✅ | 82.2M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 88.3M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 73.4M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 73.2M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 73.2M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 73.5M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 73.1M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 73.3M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 73.1M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 73.4M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 73.2M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 73.3M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 72.6M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 71.7M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 73.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 73.4M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 72.6M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 71.9M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 72.9M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.0M | ✅ | 134.8M | 🔴 **+71%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 88.4M | ✅ | 115.6M | 🔴 **+31%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.8M | ✅ | 135.4M | 🔴 **+70%** |
| if-then-else.json | if and then without else | 3 | ✅ | 74.1M | ✅ | 92.0M | 🔴 **+24%** |
| if-then-else.json | if and else without then | 3 | ✅ | 74.2M | ✅ | 94.7M | 🔴 **+28%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.4M | ✅ | 79.6M | +16% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.8M | ✅ | 124.4M | 🔴 **+56%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.0M | ✅ | 84.0M | +17% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.3M | ✅ | 78.5M | +10% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.0M | ✅ | 37.2M | -9% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ✅ | 24.0M | 🟢 **-38%** |
| items.json | a schema given for items | 4 | ✅ | 52.3M | ✅ | 41.9M | -20% |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.4M | ✅ | 134.8M | 🔴 **+52%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 67.6M | ✅ | 77.8M | +15% |
| items.json | items and subitems | 6 | ✅ | 11.8M | ✅ | 8.3M | 🟢 **-30%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 6.8M | 🟢 **-44%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 76.6M | ✅ | 93.5M | 🔴 **+22%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.1M | ✅ | 33.5M | 🟢 **-27%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 43.3M | ✅ | 30.2M | 🟢 **-30%** |
| items.json | items with heterogeneous array | 2 | ✅ | 70.4M | ✅ | 76.2M | +8% |
| items.json | items with null instance elements | 1 | ✅ | 74.3M | ✅ | 66.4M | -11% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.5M | ✅ | 134.5M | 🔴 **+52%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 56.3M | ✅ | 23.0M | 🟢 **-59%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.7M | ✅ | 24.6M | 🟢 **-61%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 58.3M | ✅ | 20.0M | 🟢 **-66%** |
| maxItems.json | maxItems validation | 4 | ✅ | 74.7M | ✅ | 99.4M | 🔴 **+33%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 70.4M | ✅ | 81.2M | +15% |
| maxLength.json | maxLength validation | 5 | ✅ | 56.7M | ✅ | 39.5M | 🟢 **-30%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.5M | ✅ | 50.6M | -7% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.2M | ✅ | 67.7M | 🔴 **+25%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.5M | ✅ | 47.1M | -1% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.8M | ✅ | 48.9M | +0% |
| maximum.json | maximum validation | 4 | ✅ | 73.7M | ✅ | 98.6M | 🔴 **+34%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 73.2M | ✅ | 101.2M | 🔴 **+38%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.5M | ✅ | 135.3M | 🔴 **+53%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.2M | ✅ | 29.1M | 🟢 **-55%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 58.4M | ✅ | 22.3M | 🟢 **-62%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.2M | ✅ | 23.5M | 🟢 **-63%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 58.5M | ✅ | 23.4M | 🟢 **-60%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 33.9M | ✅ | 22.7M | 🟢 **-33%** |
| minContains.json | minContains = 0 | 2 | ✅ | 87.7M | ✅ | 51.9M | 🟢 **-41%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 70.0M | ✅ | 30.9M | 🟢 **-56%** |
| minItems.json | minItems validation | 4 | ✅ | 74.5M | ✅ | 99.0M | 🔴 **+33%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 70.4M | ✅ | 82.4M | +17% |
| minLength.json | minLength validation | 5 | ✅ | 51.1M | ✅ | 35.1M | 🟢 **-31%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.0M | ✅ | 50.0M | -7% |
| minProperties.json | minProperties validation | 6 | ✅ | 57.2M | ✅ | 68.5M | +20% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.8M | ✅ | 47.3M | -5% |
| minimum.json | minimum validation | 4 | ✅ | 66.2M | ✅ | 98.1M | 🔴 **+48%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.5M | ✅ | 88.2M | 🔴 **+27%** |
| multipleOf.json | by int | 3 | ✅ | 75.1M | ✅ | 96.1M | 🔴 **+28%** |
| multipleOf.json | by number | 3 | ✅ | 72.4M | ✅ | 59.6M | -18% |
| multipleOf.json | by small number | 2 | ✅ | 66.5M | ✅ | 26.2M | 🟢 **-61%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.6M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 72.5M | ✅ | 17.2M | 🟢 **-76%** |
| not.json | not | 2 | ✅ | 72.5M | ✅ | 84.7M | +17% |
| not.json | not multiple types | 3 | ✅ | 68.1M | ✅ | 72.1M | +6% |
| not.json | not more complex schema | 3 | ✅ | 66.3M | ✅ | 42.9M | 🟢 **-35%** |
| not.json | forbidden property | 2 | ✅ | 51.9M | ✅ | 58.8M | +13% |
| not.json | forbid everything with empty schema | 9 | ✅ | 58.7M | ✅ | 62.2M | +6% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 58.7M | ✅ | 62.9M | +7% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 83.2M | ✅ | 137.4M | 🔴 **+65%** |
| not.json | double negation | 1 | ✅ | 84.7M | ✅ | 102.2M | 🔴 **+21%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.6M | ✅ | 14.4M | 🟢 **-57%** |
| oneOf.json | oneOf | 4 | ✅ | 64.2M | ✅ | 69.9M | +9% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.6M | ✅ | 26.7M | -15% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 62.1M | ✅ | 62.7M | +1% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 83.7M | ✅ | 121.5M | 🔴 **+45%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 62.6M | ✅ | 62.7M | +0% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 62.5M | ✅ | 62.2M | -1% |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.5M | ✅ | 27.7M | 🟢 **-31%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.0M | ✅ | 83.1M | +15% |
| oneOf.json | oneOf with required | 4 | ✅ | 50.0M | ✅ | 25.7M | 🟢 **-49%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.0M | ✅ | 32.1M | 🟢 **-29%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.2M | ✅ | 85.4M | +18% |
| pattern.json | pattern validation | 8 | ✅ | 53.9M | ✅ | 69.0M | 🔴 **+28%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.2M | ✅ | 56.3M | 🔴 **+123%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.9M | ✅ | 18.2M | 🟢 **-30%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.3M | ✅ | 14.7M | -4% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.7M | ✅ | 13.3M | 🟢 **-20%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.5M | ✅ | 17.4M | -19% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ✅ | 22.5M | 🔴 **+25%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 62.4M | ✅ | 54.8M | -12% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 54.6M | ✅ | 76.8M | 🔴 **+41%** |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 77.9M | ✅ | 67.8M | -13% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 78.1M | ✅ | 69.3M | -11% |
| properties.json | object properties validation | 6 | ✅ | 50.8M | ✅ | 50.2M | -1% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.7M | ✅ | 11.5M | 🟢 **-42%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.1M | ✅ | 52.2M | +13% |
| properties.json | properties with escaped characters | 2 | ✅ | 48.2M | ✅ | 23.2M | 🟢 **-52%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ✅ | 58.1M | -14% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.3M | ✅ | 27.9M | +2% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.0M | ✅ | 39.1M | -2% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.1M | ✅ | 16.9M | -16% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.4M | ✅ | 128.5M | 🔴 **+45%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.0M | ✅ | 24.9M | 🟢 **-50%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ✅ | 30.4M | 🟢 **-24%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.4M | ✅ | 33.3M | 🟢 **-21%** |
| ref.json | root pointer ref | 4 | ✅ | 23.8M | ✅ | 13.7M | 🟢 **-42%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.9M | ✅ | 27.7M | 🟢 **-48%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 55.7M | ✅ | 23.9M | 🟢 **-57%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.5M | ✅ | 27.9M | 🟢 **-36%** |
| ref.json | nested refs | 2 | ✅ | 37.7M | ✅ | 11.8M | 🟢 **-69%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.8M | ✅ | 29.9M | 🟢 **-27%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.1M | ✅ | 47.6M | -9% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.8M | ✅ | 28.7M | 🟢 **-46%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 84.8M | ✅ | 119.6M | 🔴 **+41%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 62.4M | ✅ | 34.9M | 🟢 **-44%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 2.8M | 🟢 **-67%** |
| ref.json | refs with quote | 2 | ✅ | 52.6M | ✅ | 28.7M | 🟢 **-45%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.7M | ✅ | 10.3M | 🟢 **-63%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.5M | ✅ | 37.4M | 🟢 **-33%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.7M | ✅ | 10.5M | 🟢 **-68%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.3M | ✅ | 10.1M | 🟢 **-69%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.3M | ✅ | 42.9M | -13% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 48.6M | ✅ | 41.0M | -16% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 71.4M | ✅ | 34.4M | 🟢 **-52%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 37.6M | ✅ | 23.8M | 🟢 **-37%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.9M | ✅ | 24.3M | 🟢 **-41%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.1M | ✅ | 28.5M | 🟢 **-45%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.6M | ✅ | 28.3M | 🟢 **-44%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.3M | ✅ | 27.5M | 🟢 **-44%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.6M | ✅ | 27.5M | 🟢 **-42%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.9M | ✅ | 27.0M | 🟢 **-45%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 45.4M | ✅ | 26.3M | 🟢 **-42%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 49.1M | ✅ | 23.5M | 🟢 **-52%** |
| ref.json | ref to if | 2 | ✅ | 49.2M | ✅ | 38.3M | 🟢 **-22%** |
| ref.json | ref to then | 2 | ✅ | 49.0M | ✅ | 35.3M | 🟢 **-28%** |
| ref.json | ref to else | 2 | ✅ | 47.9M | ✅ | 38.3M | 🟢 **-20%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.4M | ✅ | 35.1M | 🟢 **-29%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.7M | ✅ | 31.3M | 🟢 **-58%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.8M | ✅ | 33.0M | 🟢 **-55%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.4M | ✅ | 42.1M | 🟢 **-37%** |
| refRemote.json | remote ref | 2 | ✅ | 49.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.6M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 41.7M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 43.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 49.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 60.3M | ✅ | 75.6M | 🔴 **+25%** |
| required.json | required default validation | 1 | ✅ | 84.8M | ✅ | 121.3M | 🔴 **+43%** |
| required.json | required with empty array | 1 | ✅ | 84.7M | ✅ | 121.6M | 🔴 **+44%** |
| required.json | required with escaped characters | 2 | ✅ | 48.6M | ✅ | 22.7M | 🟢 **-53%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.1M | ✅ | 35.0M | 🔴 **+29%** |
| type.json | integer type matches integers | 9 | ✅ | 61.8M | ✅ | 63.6M | +3% |
| type.json | number type matches numbers | 9 | ✅ | 80.8M | ✅ | 67.2M | -17% |
| type.json | string type matches strings | 9 | ✅ | 63.6M | ✅ | 67.4M | +6% |
| type.json | object type matches objects | 7 | ✅ | 46.3M | ✅ | 56.0M | 🔴 **+21%** |
| type.json | array type matches arrays | 7 | ✅ | 58.8M | ✅ | 58.8M | 0% |
| type.json | boolean type matches booleans | 10 | ✅ | 61.5M | ✅ | 62.1M | +1% |
| type.json | null type matches only the null object | 10 | ✅ | 61.2M | ✅ | 60.4M | -1% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 59.7M | ✅ | 60.7M | +2% |
| type.json | type as array with one item | 2 | ✅ | 73.4M | ✅ | 83.5M | +14% |
| type.json | type: array or object | 5 | ✅ | 66.3M | ✅ | 65.0M | -2% |
| type.json | type: array, object or null | 5 | ✅ | 65.5M | ✅ | 72.2M | +10% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 74.5M | ✅ | 129.8M | 🔴 **+74%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 56.0M | ✅ | 79.5M | 🔴 **+42%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.3M | ✅ | 52.7M | -3% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 68.6M | ✅ | 45.1M | 🟢 **-34%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 52.8M | ✅ | 50.9M | -4% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 75.6M | ✅ | 67.8M | -10% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.4M | ✅ | 26.6M | 🟢 **-41%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 50.8M | ✅ | 37.0M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.5M | ✅ | 13.1M | 🟢 **-41%** |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 79.1M | ✅ | 70.6M | -11% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.5M | ✅ | 70.6M | 🔴 **+263%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ✅ | 12.1M | +1% |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.9M | ✅ | 23.7M | 🔴 **+59%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 39.7M | ✅ | 26.7M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ✅ | 11.6M | +5% |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.8M | ✅ | 79.4M | 🔴 **+48%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.5M | ✅ | 32.5M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 48.7M | ✅ | 32.3M | 🟢 **-34%** |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 45.1M | ✅ | 57.7M | 🔴 **+28%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.3M | ✅ | 25.2M | +8% |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 18.0M | ✅ | 12.4M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.3M | ✅ | 3.5M | 🟢 **-57%** |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.4M | ✅ | 5.7M | 🟢 **-45%** |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.2M | ✅ | 15.0M | 🟢 **-22%** |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 83.8M | ✅ | 130.9M | 🔴 **+56%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 74.3M | ✅ | 56.9M | 🟢 **-23%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.4M | ✅ | 15.4M | 🟢 **-24%** |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 40.0M | ✅ | 32.0M | 🟢 **-20%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 57.9M | ✅ | 130.9M | 🔴 **+126%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.2M | ✅ | 23.3M | 🟢 **-30%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.7M | ✅ | 24.8M | 🟢 **-36%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.6M | ✅ | 18.7M | 🟢 **-39%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.6M | ✅ | 15.0M | 🔴 **+29%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 85.2M | ✅ | 117.1M | 🔴 **+37%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.7M | ✅ | 15.8M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 27.1M | ✅ | 15.6M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.6M | ✅ | 12.1M | 🔴 **+26%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 65.9M | ✅ | 56.9M | -14% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.1M | ✅ | 56.9M | 🔴 **+102%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.1M | ✅ | 5.2M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.6M | ✅ | 8.3M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.5M | ✅ | 10.7M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.8M | ✅ | 6.3M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.0M | ✅ | 7.5M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 16.2M | ✅ | 6.6M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.6M | ✅ | 11.0M | 🟢 **-58%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.0M | ✅ | 20.2M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.9M | ✅ | 15.1M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 27.8M | ✅ | 14.4M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.1M | ✅ | 16.2M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ✅ | 16.6M | 🟢 **-44%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.2M | ✅ | 56.5M | 🔴 **+87%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.9M | ✅ | 57.0M | 🔴 **+85%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.4M | ✅ | 14.0M | 🟢 **-45%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.3M | ✅ | 19.2M | 🟢 **-30%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ✅ | 13.9M | 🟢 **-32%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.5M | ✅ | 19.3M | 🔴 **+67%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.7M | ✅ | 14.6M | 🟢 **-43%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.6M | ✅ | 20.9M | 🟢 **-34%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.3M | ✅ | 21.2M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.7M | ✅ | 9.5M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.9M | ✅ | 8.9M | 🟢 **-55%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.7M | ✅ | 2.9M | 🟢 **-62%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 58.5M | ✅ | 107.6M | 🔴 **+84%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.8M | ✅ | 50.8M | -2% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.9M | ✅ | 21.1M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.0M | ✅ | 4.0M | 🟢 **-69%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ✅ | 11.9M | 🟢 **-46%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ✅ | 11.9M | 🟢 **-50%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ✅ | 7.7M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.9M | ✅ | 23.8M | 🟢 **-25%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 50.4M | ✅ | 29.4M | 🟢 **-42%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.0M | ✅ | 122.3M | 🔴 **+44%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.7M | ✅ | 46.2M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.3M | ✅ | 40.4M | 🟢 **-35%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 54.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.8M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 62.2M | ✅ | 23.2M | 🟢 **-63%** |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 112.1M | 🔴 **+34%** |
| optional/bignum.json | number | 2 | ✅ | 85.8M | ✅ | 120.1M | 🔴 **+40%** |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 60.9M | 0% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.3M | ✅ | 107.6M | 🔴 **+37%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 58.5M | ✅ | 59.7M | +2% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.1M | ✅ | 107.5M | 🔴 **+38%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 58.4M | ✅ | 59.7M | +2% |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 80.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 60.6M | ✅ | 69.0M | +14% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 89.5M | ✅ | 103.3M | +15% |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.6M | ✅ | 30.5M | -6% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.0M | ✅ | 39.3M | -13% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 51.0M | ✅ | 44.9M | -12% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 56.0M | ✅ | 53.3M | -5% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 34.9M | ✅ | 34.9M | 0% |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.0M | ✅ | 2.7M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.6M | ✅ | 67.9M | 🔴 **+138%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.2M | ✅ | 35.0M | +20% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 32.8M | +16% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.2M | ✅ | 35.0M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.1M | ✅ | 33.0M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.2M | ✅ | 35.0M | 🔴 **+39%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.1M | ✅ | 35.3M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.9M | ✅ | 32.5M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.0M | ✅ | 37.1M | 🔴 **+38%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.6M | ✅ | 32.5M | +10% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ✅ | 20.2M | 🔴 **+22%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.9M | ✅ | 15.7M | -1% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ✅ | 15.1M | 0% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ✅ | 32.6M | +17% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ✅ | 26.8M | 🔴 **+26%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.5M | ✅ | 20.9M | -11% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ✅ | 13.3M | 🟢 **-36%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 14.1M | 🟢 **-29%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 9.6M | ✅ | 8.6M | -10% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 10.1M | ✅ | 11.2M | +11% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.8M | ✅ | 16.2M | -18% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.4M | ✅ | 9.1M | 🟢 **-64%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.7M | ✅ | 24.2M | 🔴 **+150%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.4M | ✅ | 11.8M | 🟢 **-71%** |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 48.4M | ✅ | 119K | 🟢 **-100%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 12.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.9M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.8M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 4.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.8M | ✅ | 35.0M | -7% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.1M | ✅ | 17.3M | 🔴 **+56%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.4M | ✅ | 34.8M | +8% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 61.6M | ✅ | 919K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.7M | ✅ | 41.6M | +2% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 7.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 81.9M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.5M | ✅ | 7.7M | 🟢 **-27%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.8M | ✅ | 18.6M | +4% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.8M | 🟢 **-27%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.9M | ✅ | 15.6M | -2% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.0M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.2M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.8M | ✅ | 23.8M | 🟢 **-33%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 63.4M | ✅ | 61.0M | -4% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.1M | ✅ | 34.0M | +13% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ✅ | 10.5M | 🟢 **-38%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 53.2M | ✅ | 28.0M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 53.0M | ✅ | 28.6M | 🟢 **-46%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.9M | ✅ | 26.8M | 🟢 **-49%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 73.4M | ✅ | 32.3M | 🟢 **-56%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.0M | ✅ | 27.2M | 🟢 **-48%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.0M | ✅ | 22.6M | 🔴 **+61%** |
