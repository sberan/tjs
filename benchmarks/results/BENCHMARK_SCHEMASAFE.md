# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | schemasafe pass | schemasafe ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 24.8M | 184/199 | 21.6M | 184 | -13% |
| draft6 | 276 | ✅ 276 | 29.7M | 259/276 | 23.6M | 259 | 🟢 **-21%** |
| draft7 | 313 | ✅ 313 | 15.6M | 281/313 | 21.1M | 281 | 🔴 **+36%** |
| draft2019-09 | 435 | ✅ 435 | 18.2M | 399/435 | 19.0M | 399 | +5% |
| draft2020-12 | 448 | ✅ 448 | 19.2M | 389/448 | 15.1M | 389 | 🟢 **-22%** |
| **Total** | 1671 | 1670/1671 | 19.6M | 1512/1671 | 19.1M | 1512 | -2% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **1.39x faster** (38 ns vs 52 ns per test, 6344 tests in 1512 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 7.6M | +2% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 69.8M | ✅ | 125.2M | 🔴 **+79%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.4M | ✅ | 100.9M | 🟢 **-31%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 71.2M | ✅ | 134.4M | 🔴 **+89%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 69.3M | 🟢 **-44%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 39.7M | ✅ | 35.7M | -10% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 59.3M | ✅ | 28.6M | 🟢 **-52%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 58.8M | ✅ | 77.6M | 🔴 **+32%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.0M | ✅ | 125.4M | -18% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 35.0M | ✅ | 46.1M | 🔴 **+32%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 24.9M | ✅ | 24.5M | -1% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 32.1M | ✅ | 27.6M | -14% |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.2M | ✅ | 25.2M | 🟢 **-43%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 69.8M | ✅ | 125.1M | 🔴 **+79%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.9M | ✅ | 17.4M | 🟢 **-49%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 44.2M | ✅ | 51.5M | +17% |
| allOf.json | allOf | 4 | ✅ | 47.7M | ✅ | 40.1M | -16% |
| allOf.json | allOf with base schema | 5 | ✅ | 25.1M | ✅ | 25.3M | +1% |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 85.9M | 🟢 **-22%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 69.7M | ✅ | 125.0M | 🔴 **+79%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.7M | ✅ | 125.0M | -18% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 61.1M | ✅ | 84.7M | 🔴 **+39%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.7M | ✅ | 87.5M | 🟢 **-26%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.6M | ✅ | 83.2M | 🔴 **+35%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.0M | ✅ | 59.5M | 🟢 **-29%** |
| anyOf.json | anyOf | 4 | ✅ | 62.3M | ✅ | 89.8M | 🔴 **+44%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.9M | ✅ | 26.6M | 🟢 **-42%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.5M | ✅ | 30.9M | 🟢 **-29%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.3M | ✅ | 130.7M | 🟢 **-20%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 60.5M | ✅ | 87.2M | 🔴 **+44%** |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 75.6M | 🟢 **-30%** |
| default.json | invalid string value for default | 2 | ✅ | 45.4M | ✅ | 45.1M | -1% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.4M | ✅ | 57.2M | 🟢 **-26%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.9M | ✅ | 66.2M | 🟢 **-27%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.8M | ✅ | 28.1M | -9% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.6M | ✅ | 35.5M | 🟢 **-39%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.2M | ✅ | 11.1M | 0% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 33.2M | ✅ | 26.6M | -20% |
| enum.json | simple enum validation | 2 | ✅ | 68.5M | ✅ | 86.0M | 🔴 **+25%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 38.5M | 🟢 **-37%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 57.8M | ✅ | 89.0M | 🔴 **+54%** |
| enum.json | enums in properties | 6 | ✅ | 15.0M | ✅ | 37.0M | 🔴 **+147%** |
| enum.json | enum with escaped characters | 3 | ✅ | 48.6M | ✅ | 71.6M | 🔴 **+47%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.1M | ✅ | 72.8M | 🟢 **-36%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.9M | ✅ | 68.1M | 🔴 **+29%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 76.0M | 🟢 **-32%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.0M | ✅ | 67.8M | 🔴 **+28%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 89.4M | 🟢 **-22%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 52.7M | ✅ | 79.8M | 🔴 **+51%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 103.2M | ✅ | 91.1M | -12% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 52.3M | ✅ | 79.1M | 🔴 **+51%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 73.7M | -19% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 49.1M | ✅ | 66.3M | 🔴 **+35%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 75.0M | 🟢 **-20%** |
| format.json | email format | 6 | ✅ | 65.7M | ✅ | 131.1M | 🔴 **+99%** |
| format.json | ipv4 format | 6 | ✅ | 162.3M | ✅ | 128.3M | 🟢 **-21%** |
| format.json | ipv6 format | 6 | ✅ | 65.8M | ✅ | 121.3M | 🔴 **+84%** |
| format.json | hostname format | 6 | ✅ | 163.1M | ✅ | 132.6M | -19% |
| format.json | date-time format | 6 | ✅ | 64.2M | ✅ | 119.1M | 🔴 **+85%** |
| format.json | uri format | 6 | ✅ | 162.0M | ✅ | 131.5M | -19% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ✅ | 23.1M | 🟢 **-40%** |
| items.json | a schema given for items | 4 | ✅ | 81.9M | ✅ | 43.9M | 🟢 **-46%** |
| items.json | an array of schemas for items | 6 | ✅ | 55.5M | ✅ | 59.0M | +6% |
| items.json | items and subitems | 6 | ✅ | 28.1M | ✅ | 8.1M | 🟢 **-71%** |
| items.json | nested items | 3 | ✅ | 11.7M | ✅ | 6.8M | 🟢 **-42%** |
| items.json | items with null instance elements | 1 | ✅ | 60.8M | ✅ | 66.4M | +9% |
| items.json | array-form items with null instance e... | 1 | ✅ | 64.3M | ✅ | 69.3M | +8% |
| maxItems.json | maxItems validation | 4 | ✅ | 58.3M | ✅ | 95.5M | 🔴 **+64%** |
| maxLength.json | maxLength validation | 5 | ✅ | 49.4M | ✅ | 38.5M | 🟢 **-22%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 48.1M | ✅ | 68.6M | 🔴 **+43%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.8M | ✅ | 50.2M | 🔴 **+20%** |
| maximum.json | maximum validation | 4 | ✅ | 34.3M | ✅ | 100.3M | 🔴 **+192%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 56.3M | ✅ | 97.9M | 🔴 **+74%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 57.0M | ✅ | 100.7M | 🔴 **+77%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 57.2M | ✅ | 82.5M | 🔴 **+44%** |
| minItems.json | minItems validation | 4 | ✅ | 52.4M | ✅ | 97.5M | 🔴 **+86%** |
| minLength.json | minLength validation | 5 | ✅ | 48.5M | ✅ | 37.4M | 🟢 **-23%** |
| minProperties.json | minProperties validation | 6 | ✅ | 48.3M | ✅ | 69.2M | 🔴 **+43%** |
| minimum.json | minimum validation | 4 | ✅ | 57.0M | ✅ | 99.5M | 🔴 **+74%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 56.6M | ✅ | 97.9M | 🔴 **+73%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 57.1M | ✅ | 82.0M | 🔴 **+44%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.2M | ✅ | 90.2M | 🔴 **+58%** |
| multipleOf.json | by int | 3 | ✅ | 59.8M | ✅ | 89.4M | 🔴 **+50%** |
| multipleOf.json | by number | 3 | ✅ | 57.0M | ✅ | 56.2M | -1% |
| multipleOf.json | by small number | 2 | ✅ | 46.4M | ✅ | 27.6M | 🟢 **-40%** |
| multipleOf.json | float division = inf | 1 | ✅ | 24.8M | ✅ | 1.1M | 🟢 **-96%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 60.0M | ✅ | 17.2M | 🟢 **-71%** |
| not.json | not | 2 | ✅ | 61.2M | ✅ | 85.2M | 🔴 **+39%** |
| not.json | not multiple types | 3 | ✅ | 50.7M | ✅ | 38.3M | 🟢 **-24%** |
| not.json | not more complex schema | 3 | ✅ | 49.5M | ✅ | 48.3M | -2% |
| not.json | forbidden property | 2 | ✅ | 42.1M | ✅ | 59.7M | 🔴 **+42%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 50.5M | ✅ | 63.0M | 🔴 **+25%** |
| not.json | double negation | 1 | ✅ | 69.7M | ✅ | 125.0M | 🔴 **+79%** |
| oneOf.json | oneOf | 4 | ✅ | 53.3M | ✅ | 75.9M | 🔴 **+42%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.1M | ✅ | 26.5M | -12% |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.7M | ✅ | 29.2M | 🟢 **-25%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.0M | ✅ | 85.8M | 🔴 **+43%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.9M | ✅ | 26.6M | 🟢 **-37%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 39.8M | ✅ | 32.8M | -17% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 60.0M | ✅ | 87.2M | 🔴 **+45%** |
| pattern.json | pattern validation | 8 | ✅ | 46.3M | ✅ | 72.2M | 🔴 **+56%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.6M | ✅ | 61.4M | 🔴 **+199%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.8M | ✅ | 18.8M | 🟢 **-24%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ✅ | 15.0M | +4% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 13.0M | -17% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.1M | ✅ | 19.0M | +18% |
| properties.json | object properties validation | 6 | ✅ | 45.8M | ✅ | 54.5M | +19% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.4M | ✅ | 11.6M | 🟢 **-37%** |
| properties.json | properties with escaped characters | 2 | ✅ | 38.7M | ✅ | 24.4M | 🟢 **-37%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 57.2M | ✅ | 54.9M | -4% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.8M | ✅ | 29.3M | +13% |
| ref.json | root pointer ref | 4 | ✅ | 22.6M | ✅ | 14.0M | 🟢 **-38%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 23.5M | ✅ | 29.1M | 🔴 **+24%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ✅ | 24.8M | 🟢 **-47%** |
| ref.json | escaped pointer ref | 6 | ✅ | 39.3M | ✅ | 29.6M | 🟢 **-25%** |
| ref.json | nested refs | 2 | ✅ | 35.0M | ✅ | 12.3M | 🟢 **-65%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 44.2M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 12.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.3M | ✅ | 47.1M | +6% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 21.5M | ✅ | 29.0M | 🔴 **+35%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 5.4M | ✅ | 2.9M | 🟢 **-46%** |
| ref.json | refs with quote | 2 | ✅ | 44.2M | ✅ | 29.3M | 🟢 **-34%** |
| ref.json | Location-independent identifier | 2 | ✅ | 61.1M | ✅ | 43.3M | 🟢 **-29%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 40.1M | ✅ | 43.1M | +8% |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 41.6M | ✅ | 44.5M | +7% |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 39.8M | ✅ | 40.3M | +1% |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 61.0M | ✅ | 43.1M | 🟢 **-29%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 49.1M | ✅ | 39.4M | -20% |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 54.1M | ✅ | 39.1M | 🟢 **-28%** |
| refRemote.json | remote ref | 2 | ✅ | 42.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 38.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 38.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 17.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 28.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 40.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.2M | ✅ | 38.9M | 🟢 **-27%** |
| required.json | required default validation | 1 | ✅ | 66.8M | ✅ | 125.3M | 🔴 **+87%** |
| required.json | required with escaped characters | 2 | ✅ | 43.3M | ✅ | 23.1M | 🟢 **-47%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ✅ | 35.7M | 🔴 **+41%** |
| type.json | integer type matches integers | 8 | ✅ | 48.9M | ✅ | 59.1M | 🔴 **+21%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 73.2M | 🔴 **+33%** |
| type.json | string type matches strings | 9 | ✅ | 55.2M | ✅ | 71.0M | 🔴 **+29%** |
| type.json | object type matches objects | 7 | ✅ | 49.0M | ✅ | 32.7M | 🟢 **-33%** |
| type.json | array type matches arrays | 7 | ✅ | 52.2M | ✅ | 43.8M | -16% |
| type.json | boolean type matches booleans | 10 | ✅ | 53.6M | ✅ | 62.3M | +16% |
| type.json | null type matches only the null object | 10 | ✅ | 49.7M | ✅ | 59.9M | 🔴 **+21%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.4M | ✅ | 68.1M | 🔴 **+28%** |
| type.json | type as array with one item | 2 | ✅ | 60.6M | ✅ | 87.9M | 🔴 **+45%** |
| type.json | type: array or object | 5 | ✅ | 54.2M | ✅ | 65.1M | 🔴 **+20%** |
| type.json | type: array, object or null | 5 | ✅ | 57.3M | ✅ | 73.5M | 🔴 **+28%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ✅ | 7.9M | 🟢 **-53%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.8M | ✅ | 23.9M | -20% |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.9M | ✅ | 29.4M | 🔴 **+64%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 63.9M | ✅ | 130.6M | 🔴 **+104%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 57.1M | ✅ | 47.2M | -17% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 53.9M | ✅ | 40.2M | 🟢 **-26%** |
| optional/bignum.json | integer | 2 | ✅ | 67.7M | ✅ | 121.8M | 🔴 **+80%** |
| optional/bignum.json | number | 2 | ✅ | 68.7M | ✅ | 126.9M | 🔴 **+85%** |
| optional/bignum.json | string | 1 | ✅ | 52.2M | ✅ | 62.0M | +19% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 63.3M | ✅ | 110.5M | 🔴 **+75%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.1M | ✅ | 59.4M | +18% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 63.3M | ✅ | 111.1M | 🔴 **+76%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 50.1M | ✅ | 60.1M | +20% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 25.7M | ✅ | 36.7M | 🔴 **+43%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.7M | ✅ | 35.0M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.5M | ✅ | 29.0M | +19% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.0M | ✅ | 33.3M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.6M | ✅ | 31.8M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.3M | ✅ | 30.8M | 🔴 **+27%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.7M | ✅ | 33.1M | 🔴 **+40%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.3M | ✅ | 32.5M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 30.3M | ✅ | 31.1M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.4M | ✅ | 32.9M | +20% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.3M | ✅ | 20.5M | 🔴 **+26%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.4M | ✅ | 16.2M | +13% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ✅ | 15.3M | +4% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.3M | ✅ | 33.7M | 🔴 **+34%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.5M | ✅ | 15.3M | -13% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.9M | ✅ | 18.1M | -17% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ✅ | 11.9M | 🟢 **-38%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.7M | ✅ | 15.6M | -17% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.6M | ✅ | 8.6M | +13% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 11.1M | 🔴 **+34%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.1M | ✅ | 15.9M | +5% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.4M | ✅ | 9.3M | 🟢 **-62%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.8M | ✅ | 13.7M | 🟢 **-23%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.3M | ✅ | 34.8M | +1% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.5M | ✅ | 17.9M | 🔴 **+55%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 66.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.8M | 🟢 **-23%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 32.0M | ✅ | 23.2M | 🟢 **-28%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.8M | ✅ | 34.9M | 🔴 **+26%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ✅ | 10.5M | 🟢 **-34%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 45.2M | ✅ | 7.7M | 🟢 **-83%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 15.8M | 🟢 **-57%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 157.5M | ✅ | 124.6M | 🟢 **-21%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 83.8M | ✅ | 101.0M | 🔴 **+21%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 172.5M | ✅ | 134.4M | 🟢 **-22%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 84.6M | ✅ | 69.3M | -18% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 38.7M | ✅ | 35.6M | -8% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.1M | ✅ | 28.0M | 🟢 **-25%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 111.3M | ✅ | 79.2M | 🟢 **-29%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 86.4M | ✅ | 124.6M | 🔴 **+44%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.1M | ✅ | 43.0M | +2% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 18.5M | ✅ | 24.4M | 🔴 **+32%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.3M | ✅ | 28.0M | 🟢 **-23%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.4M | ✅ | 25.1M | 🟢 **-20%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.1M | ✅ | 125.4M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.5M | ✅ | 17.4M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 73.1M | ✅ | 51.5M | 🟢 **-30%** |
| allOf.json | allOf | 4 | ✅ | 32.0M | ✅ | 39.6M | 🔴 **+24%** |
| allOf.json | allOf with base schema | 5 | ✅ | 26.6M | ✅ | 24.5M | -8% |
| allOf.json | allOf simple types | 2 | ✅ | 77.9M | ✅ | 85.9M | +10% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.3M | ✅ | 125.1M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 72.0M | ✅ | 64.6M | -10% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 90.1M | ✅ | 64.6M | 🟢 **-28%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 86.1M | ✅ | 123.9M | 🔴 **+44%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 124.2M | 🟢 **-22%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 80.0M | ✅ | 87.6M | +10% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 126.2M | ✅ | 88.1M | 🟢 **-30%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 80.6M | ✅ | 87.3M | +8% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.3M | ✅ | 59.3M | 🟢 **-31%** |
| anyOf.json | anyOf | 4 | ✅ | 71.1M | ✅ | 90.1M | 🔴 **+27%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.6M | ✅ | 25.9M | 🟢 **-44%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 94.1M | ✅ | 125.3M | 🔴 **+33%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 125.4M | 🟢 **-21%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 69.8M | ✅ | 64.7M | -7% |
| anyOf.json | anyOf complex types | 4 | ✅ | 68.4M | ✅ | 30.6M | 🟢 **-55%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 87.0M | ✅ | 135.3M | 🔴 **+56%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 130.2M | ✅ | 87.8M | 🟢 **-33%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 72.0M | ✅ | 126.6M | 🔴 **+76%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.2M | ✅ | 63.1M | 🟢 **-29%** |
| const.json | const validation | 3 | ✅ | 70.7M | ✅ | 70.4M | 0% |
| const.json | const with object | 4 | ✅ | 52.7M | ✅ | 32.6M | 🟢 **-38%** |
| const.json | const with array | 3 | ✅ | 59.5M | ✅ | 5.3M | 🟢 **-91%** |
| const.json | const with null | 2 | ✅ | 127.7M | ✅ | 87.2M | 🟢 **-32%** |
| const.json | const with false does not match 0 | 3 | ✅ | 76.2M | ✅ | 63.8M | -16% |
| const.json | const with true does not match 1 | 3 | ✅ | 89.0M | ✅ | 75.5M | -15% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.7M | ✅ | 68.0M | +2% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 97.3M | ✅ | 69.2M | 🟢 **-29%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 66.6M | ✅ | 32.3M | 🟢 **-52%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.1M | ✅ | 33.7M | 🟢 **-64%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 64.0M | ✅ | 66.3M | +3% |
| const.json | const with 1 does not match true | 3 | ✅ | 120.3M | ✅ | 91.3M | 🟢 **-24%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 69.3M | ✅ | 68.2M | -2% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 118.6M | ✅ | 80.8M | 🟢 **-32%** |
| const.json | nul characters in strings | 2 | ✅ | 67.8M | ✅ | 74.7M | +10% |
| const.json | characters with the same visual repre... | 2 | ✅ | 86.4M | ✅ | 67.4M | 🟢 **-22%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 69.4M | ✅ | 75.9M | +9% |
| contains.json | contains keyword validation | 6 | ✅ | 102.7M | ✅ | 19.0M | 🟢 **-82%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.9M | ✅ | 14.5M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 74.1M | ✅ | 72.0M | -3% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 73.5M | ✅ | 42.5M | 🟢 **-42%** |
| contains.json | items + contains | 4 | ✅ | 40.4M | ✅ | 17.5M | 🟢 **-57%** |
| contains.json | contains with null instance elements | 1 | ✅ | 32.9M | ✅ | 37.8M | +15% |
| default.json | invalid type for default | 2 | ✅ | 111.0M | ✅ | 75.5M | 🟢 **-32%** |
| default.json | invalid string value for default | 2 | ✅ | 55.5M | ✅ | 48.1M | -13% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 61.3M | ✅ | 57.3M | -7% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 9.9M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 58.4M | ✅ | 70.9M | 🔴 **+21%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.8M | ✅ | 137.9M | 🔴 **+42%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 36.1M | ✅ | 31.3M | -13% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 27.3M | ✅ | 35.5M | 🔴 **+30%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 60.9M | ✅ | 54.7M | -10% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 13.0M | ✅ | 16.2M | 🔴 **+25%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 31.3M | ✅ | 26.8M | -14% |
| enum.json | simple enum validation | 2 | ✅ | 115.8M | ✅ | 85.2M | 🟢 **-26%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.2M | ✅ | 38.9M | -16% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 123.1M | ✅ | 88.5M | 🟢 **-28%** |
| enum.json | enums in properties | 6 | ✅ | 14.3M | ✅ | 41.0M | 🔴 **+186%** |
| enum.json | enum with escaped characters | 3 | ✅ | 124.2M | ✅ | 97.1M | 🟢 **-22%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 61.9M | ✅ | 74.2M | 🔴 **+20%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 90.7M | ✅ | 70.0M | 🟢 **-23%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.5M | ✅ | 76.4M | 0% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 97.5M | ✅ | 68.1M | 🟢 **-30%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 79.6M | ✅ | 89.1M | +12% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 107.4M | ✅ | 81.6M | 🟢 **-24%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 79.3M | ✅ | 90.7M | +14% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 106.3M | ✅ | 80.3M | 🟢 **-24%** |
| enum.json | nul characters in strings | 2 | ✅ | 68.5M | ✅ | 74.0M | +8% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 115.7M | ✅ | 77.0M | 🟢 **-33%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 74.3M | ✅ | 79.0M | +6% |
| format.json | email format | 6 | ✅ | 158.7M | ✅ | 133.0M | -16% |
| format.json | ipv4 format | 6 | ✅ | 95.2M | ✅ | 119.3M | 🔴 **+25%** |
| format.json | ipv6 format | 6 | ✅ | 154.1M | ✅ | 121.3M | 🟢 **-21%** |
| format.json | hostname format | 6 | ✅ | 94.7M | ✅ | 122.3M | 🔴 **+29%** |
| format.json | date-time format | 6 | ✅ | 156.8M | ✅ | 118.7M | 🟢 **-24%** |
| format.json | json-pointer format | 6 | ✅ | 94.9M | ✅ | 131.4M | 🔴 **+38%** |
| format.json | uri format | 6 | ✅ | 152.2M | ✅ | 132.6M | -13% |
| format.json | uri-reference format | 6 | ✅ | 92.9M | ✅ | 124.7M | 🔴 **+34%** |
| format.json | uri-template format | 6 | ✅ | 158.7M | ✅ | 118.8M | 🟢 **-25%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.4M | ✅ | 25.1M | 🟢 **-35%** |
| items.json | a schema given for items | 4 | ✅ | 68.7M | ✅ | 43.7M | 🟢 **-36%** |
| items.json | an array of schemas for items | 6 | ✅ | 62.3M | ✅ | 59.4M | -5% |
| items.json | items with boolean schema (true) | 2 | ✅ | 160.5M | ✅ | 135.7M | -15% |
| items.json | items with boolean schema (false) | 2 | ✅ | 69.1M | ✅ | 65.7M | -5% |
| items.json | items with boolean schemas | 3 | ✅ | 73.8M | ✅ | 79.0M | +7% |
| items.json | items and subitems | 6 | ✅ | 24.1M | ✅ | 8.3M | 🟢 **-65%** |
| items.json | nested items | 3 | ✅ | 12.6M | ✅ | 6.5M | 🟢 **-48%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 80.7M | ✅ | 66.4M | -18% |
| items.json | array-form items with null instance e... | 1 | ✅ | 128.2M | ✅ | 69.3M | 🟢 **-46%** |
| maxItems.json | maxItems validation | 4 | ✅ | 84.7M | ✅ | 89.9M | +6% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 112.8M | ✅ | 82.2M | 🟢 **-27%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.4M | ✅ | 43.1M | 🟢 **-28%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 77.7M | ✅ | 51.1M | 🟢 **-34%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.9M | ✅ | 67.3M | 🔴 **+25%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 64.4M | ✅ | 47.3M | 🟢 **-27%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.2M | ✅ | 43.0M | -16% |
| maximum.json | maximum validation | 4 | ✅ | 131.7M | ✅ | 96.3M | 🟢 **-27%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 82.2M | ✅ | 102.1M | 🔴 **+24%** |
| minItems.json | minItems validation | 4 | ✅ | 128.7M | ✅ | 97.4M | 🟢 **-24%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 78.2M | ✅ | 83.2M | +6% |
| minLength.json | minLength validation | 5 | ✅ | 89.0M | ✅ | 38.2M | 🟢 **-57%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 59.4M | ✅ | 48.3M | -19% |
| minProperties.json | minProperties validation | 6 | ✅ | 83.9M | ✅ | 69.1M | -18% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 52.0M | ✅ | 48.1M | -8% |
| minimum.json | minimum validation | 4 | ✅ | 126.3M | ✅ | 98.8M | 🟢 **-22%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 75.0M | ✅ | 87.5M | +17% |
| multipleOf.json | by int | 3 | ✅ | 129.5M | ✅ | 93.8M | 🟢 **-28%** |
| multipleOf.json | by number | 3 | ✅ | 74.7M | ✅ | 59.5M | 🟢 **-20%** |
| multipleOf.json | by small number | 2 | ✅ | 98.2M | ✅ | 27.1M | 🟢 **-72%** |
| multipleOf.json | float division = inf | 1 | ✅ | 59.7M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 121.7M | ✅ | 15.6M | 🟢 **-87%** |
| not.json | not | 2 | ✅ | 80.1M | ✅ | 85.7M | +7% |
| not.json | not multiple types | 3 | ✅ | 111.5M | ✅ | 74.0M | 🟢 **-34%** |
| not.json | not more complex schema | 3 | ✅ | 72.4M | ✅ | 46.3M | 🟢 **-36%** |
| not.json | forbidden property | 2 | ✅ | 54.7M | ✅ | 59.6M | +9% |
| not.json | forbid everything with empty schema | 9 | ✅ | 67.2M | ✅ | 62.8M | -7% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 88.6M | ✅ | 62.2M | 🟢 **-30%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 89.0M | ✅ | 138.3M | 🔴 **+55%** |
| not.json | double negation | 1 | ✅ | 159.1M | ✅ | 123.6M | 🟢 **-22%** |
| oneOf.json | oneOf | 4 | ✅ | 68.8M | ✅ | 70.4M | +2% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 43.7M | ✅ | 27.5M | 🟢 **-37%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 69.8M | ✅ | 64.6M | -8% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 158.4M | ✅ | 124.2M | 🟢 **-22%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 64.5M | ✅ | 64.3M | 0% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 101.6M | ✅ | 63.7M | 🟢 **-37%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.5M | ✅ | 29.4M | 🟢 **-34%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 123.7M | ✅ | 85.9M | 🟢 **-31%** |
| oneOf.json | oneOf with required | 4 | ✅ | 53.7M | ✅ | 25.7M | 🟢 **-52%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 72.8M | ✅ | 33.0M | 🟢 **-55%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 78.4M | ✅ | 86.0M | +10% |
| pattern.json | pattern validation | 8 | ✅ | 77.1M | ✅ | 71.8M | -7% |
| pattern.json | pattern is not anchored | 1 | ✅ | 27.2M | ✅ | 32.2M | +19% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 28.2M | ✅ | 16.4M | 🟢 **-42%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.9M | ✅ | 14.3M | +2% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.5M | ✅ | 10.1M | 🟢 **-30%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 16.2M | 🟢 **-21%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.8M | ✅ | 20.2M | +2% |
| properties.json | object properties validation | 6 | ✅ | 66.3M | ✅ | 53.3M | -20% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.2M | ✅ | 11.1M | 🟢 **-39%** |
| properties.json | properties with boolean schema | 4 | ✅ | 50.7M | ✅ | 54.8M | +8% |
| properties.json | properties with escaped characters | 2 | ✅ | 43.9M | ✅ | 24.1M | 🟢 **-45%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 110.9M | ✅ | 46.0M | 🟢 **-59%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.6M | ✅ | 29.5M | +11% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.5M | ✅ | 40.4M | -13% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.3M | ✅ | 17.2M | -6% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 172.3M | ✅ | 95.3M | 🟢 **-45%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.9M | ✅ | 23.6M | 🟢 **-54%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 44.7M | ✅ | 30.5M | 🟢 **-32%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.3M | ✅ | 30.9M | 🟢 **-21%** |
| ref.json | root pointer ref | 4 | ✅ | 27.7M | ✅ | 14.0M | 🟢 **-50%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.1M | ✅ | 29.2M | 🟢 **-35%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 60.1M | ✅ | 23.9M | 🟢 **-60%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 28.9M | 🟢 **-28%** |
| ref.json | nested refs | 2 | ✅ | 38.3M | ✅ | 11.6M | 🟢 **-70%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 34.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 20.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.7M | ✅ | 43.8M | +5% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.5M | ✅ | 29.1M | 🟢 **-35%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 94.3M | ✅ | 121.0M | 🔴 **+28%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 71.3M | ✅ | 31.1M | 🟢 **-56%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.8M | ✅ | 2.9M | 🟢 **-63%** |
| ref.json | refs with quote | 2 | ✅ | 44.1M | ✅ | 29.1M | 🟢 **-34%** |
| ref.json | Location-independent identifier | 2 | ✅ | 34.3M | ✅ | 39.3M | +15% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 34.2M | ✅ | 43.4M | 🔴 **+27%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 32.9M | ✅ | 40.0M | 🔴 **+22%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 58.1M | ✅ | 37.9M | 🟢 **-35%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 26.6M | ✅ | 10.7M | 🟢 **-60%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 25.9M | ✅ | 10.0M | 🟢 **-62%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ✅ | 25.4M | 🟢 **-42%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.3M | ✅ | 28.7M | 🟢 **-38%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.1M | ✅ | 14.6M | 🟢 **-70%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 41.8M | ✅ | 28.9M | 🟢 **-31%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.6M | ✅ | 28.4M | 🟢 **-33%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.7M | ✅ | 28.8M | 🟢 **-33%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 32.4M | ✅ | 27.5M | -15% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 33.1M | ✅ | 42.7M | 🔴 **+29%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 80.9M | ✅ | 43.3M | 🟢 **-47%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 80.8M | ✅ | 43.2M | 🟢 **-47%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.7M | ✅ | 27.9M | 🟢 **-62%** |
| refRemote.json | remote ref | 2 | ✅ | 33.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 34.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 33.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 26.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 27.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 22.8M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 32.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 28.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 28.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 60.0M | ✅ | 82.7M | 🔴 **+38%** |
| required.json | required default validation | 1 | ✅ | 93.7M | ✅ | 125.3M | 🔴 **+34%** |
| required.json | required with empty array | 1 | ✅ | 94.7M | ✅ | 125.5M | 🔴 **+33%** |
| required.json | required with escaped characters | 2 | ✅ | 44.2M | ✅ | 22.5M | 🟢 **-49%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.6M | ✅ | 36.4M | 🔴 **+54%** |
| type.json | integer type matches integers | 9 | ✅ | 67.8M | ✅ | 64.7M | -5% |
| type.json | number type matches numbers | 9 | ✅ | 70.3M | ✅ | 74.6M | +6% |
| type.json | string type matches strings | 9 | ✅ | 70.0M | ✅ | 72.2M | +3% |
| type.json | object type matches objects | 7 | ✅ | 59.9M | ✅ | 59.7M | 0% |
| type.json | array type matches arrays | 7 | ✅ | 64.3M | ✅ | 59.4M | -8% |
| type.json | boolean type matches booleans | 10 | ✅ | 67.4M | ✅ | 63.0M | -6% |
| type.json | null type matches only the null object | 10 | ✅ | 66.2M | ✅ | 60.3M | -9% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.4M | ✅ | 69.8M | +7% |
| type.json | type as array with one item | 2 | ✅ | 78.8M | ✅ | 86.5M | +10% |
| type.json | type: array or object | 5 | ✅ | 73.8M | ✅ | 66.5M | -10% |
| type.json | type: array, object or null | 5 | ✅ | 79.2M | ✅ | 74.2M | -6% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.4M | ✅ | 8.0M | 🟢 **-51%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 34.9M | ✅ | 24.0M | 🟢 **-31%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.8M | ✅ | 29.8M | 🔴 **+50%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 82.1M | ✅ | 130.2M | 🔴 **+59%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.8M | ✅ | 46.9M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 75.0M | ✅ | 42.8M | 🟢 **-43%** |
| optional/bignum.json | integer | 2 | ✅ | 89.5M | ✅ | 121.6M | 🔴 **+36%** |
| optional/bignum.json | number | 2 | ✅ | 88.3M | ✅ | 126.9M | 🔴 **+44%** |
| optional/bignum.json | string | 1 | ✅ | 68.1M | ✅ | 53.5M | 🟢 **-21%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 83.1M | ✅ | 111.2M | 🔴 **+34%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 64.1M | ✅ | 60.2M | -6% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 84.0M | ✅ | 111.2M | 🔴 **+32%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 64.0M | ✅ | 60.4M | -6% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 35.7M | ✅ | 71.9M | 🔴 **+101%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 32.1M | ✅ | 36.2M | +13% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.5M | ✅ | 35.2M | +20% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 30.0M | ✅ | 36.1M | 🔴 **+20%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.8M | ✅ | 34.2M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 28.2M | ✅ | 34.1M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 30.7M | ✅ | 36.5M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 30.0M | ✅ | 35.3M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 29.3M | ✅ | 37.3M | 🔴 **+28%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.6M | ✅ | 33.5M | +3% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ✅ | 20.3M | +20% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.1M | ✅ | 16.5M | -4% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ✅ | 15.8M | +1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 33.0M | +12% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.7M | ✅ | 27.7M | 🔴 **+22%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.8M | ✅ | 21.1M | -3% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.7M | ✅ | 13.7M | 🟢 **-27%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.8M | ✅ | 13.5M | 🟢 **-24%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 8.3M | +5% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 11.0M | 🔴 **+26%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.6M | ✅ | 15.9M | 🔴 **+37%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.6M | ✅ | 9.3M | 🟢 **-65%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ✅ | 13.9M | 🟢 **-26%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.4M | ✅ | 35.0M | 🟢 **-21%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.7M | ✅ | 17.8M | 🔴 **+40%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ✅ | 36.0M | +10% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.1M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.3M | ✅ | 8.1M | 🟢 **-22%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.1M | ✅ | 20.2M | +12% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.9M | 🟢 **-25%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 30.0M | ✅ | 24.5M | -18% |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 50.1M | ✅ | 32.4M | 🟢 **-35%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 50.1M | ✅ | 31.5M | 🟢 **-37%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 32.5M | ✅ | 34.9M | +7% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.9M | ✅ | 10.9M | 🟢 **-31%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 10.9M | ✅ | 25.2M | 🔴 **+131%** |

### draft7

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 7.5M | +4% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.4M | ✅ | 14.3M | 🟢 **-59%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 139.7M | ✅ | 124.7M | -11% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 63.4M | ✅ | 47.4M | 🟢 **-25%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 150.8M | ✅ | 134.3M | -11% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 69.4M | ✅ | 69.3M | 0% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 53.1M | ✅ | 30.9M | 🟢 **-42%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.9M | ✅ | 26.1M | 🟢 **-38%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 103.9M | ✅ | 78.1M | 🟢 **-25%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.3M | ✅ | 86.9M | +19% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.0M | ✅ | 42.0M | 0% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.5M | ✅ | 22.4M | +10% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.6M | ✅ | 28.0M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.4M | ✅ | 25.1M | 🟢 **-29%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 139.7M | ✅ | 124.8M | -11% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.6M | ✅ | 16.4M | 🟢 **-43%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.0M | ✅ | 51.6M | 🟢 **-24%** |
| allOf.json | allOf | 4 | ✅ | 36.3M | ✅ | 38.2M | +5% |
| allOf.json | allOf with base schema | 5 | ✅ | 28.8M | ✅ | 22.1M | 🟢 **-23%** |
| allOf.json | allOf simple types | 2 | ✅ | 67.7M | ✅ | 85.8M | 🔴 **+27%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 139.7M | ✅ | 117.4M | -16% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 59.5M | ✅ | 64.2M | +8% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 88.1M | ✅ | 64.2M | 🟢 **-27%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.3M | ✅ | 124.7M | 🔴 **+70%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 139.6M | ✅ | 124.8M | -11% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.7M | ✅ | 87.2M | 🔴 **+25%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 112.2M | ✅ | 65.1M | 🟢 **-42%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.0M | ✅ | 80.3M | +15% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 79.8M | ✅ | 59.2M | 🟢 **-26%** |
| anyOf.json | anyOf | 4 | ✅ | 70.3M | ✅ | 82.2M | +17% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 41.8M | ✅ | 26.6M | 🟢 **-36%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 79.6M | ✅ | 124.4M | 🔴 **+56%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 139.6M | ✅ | 124.8M | -11% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 59.6M | ✅ | 64.9M | +9% |
| anyOf.json | anyOf complex types | 4 | ✅ | 67.0M | ✅ | 30.6M | 🟢 **-54%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 75.6M | ✅ | 134.6M | 🔴 **+78%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 112.3M | ✅ | 87.1M | 🟢 **-22%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 69.2M | ✅ | 136.7M | 🔴 **+98%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 87.9M | ✅ | 61.2M | 🟢 **-30%** |
| const.json | const validation | 3 | ✅ | 77.6M | ✅ | 67.6M | -13% |
| const.json | const with object | 4 | ✅ | 48.0M | ✅ | 32.2M | 🟢 **-33%** |
| const.json | const with array | 3 | ✅ | 48.2M | ✅ | 5.4M | 🟢 **-89%** |
| const.json | const with null | 2 | ✅ | 112.3M | ✅ | 86.1M | 🟢 **-23%** |
| const.json | const with false does not match 0 | 3 | ✅ | 65.3M | ✅ | 63.4M | -3% |
| const.json | const with true does not match 1 | 3 | ✅ | 105.7M | ✅ | 74.5M | 🟢 **-29%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 51.9M | ✅ | 66.7M | 🔴 **+29%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 86.9M | ✅ | 68.3M | 🟢 **-21%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 59.4M | ✅ | 33.3M | 🟢 **-44%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 89.5M | ✅ | 33.4M | 🟢 **-63%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 57.2M | ✅ | 65.1M | +14% |
| const.json | const with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 91.5M | -18% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 57.8M | ✅ | 71.2M | 🔴 **+23%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 105.6M | ✅ | 74.7M | 🟢 **-29%** |
| const.json | nul characters in strings | 2 | ✅ | 57.8M | ✅ | 73.7M | 🔴 **+28%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.4M | ✅ | 67.0M | -16% |
| const.json | characters with the same visual repre... | 2 | ✅ | 59.9M | ✅ | 75.8M | 🔴 **+27%** |
| contains.json | contains keyword validation | 6 | ✅ | 83.3M | ✅ | 19.9M | 🟢 **-76%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 56.3M | ✅ | 13.8M | 🟢 **-76%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 96.8M | ✅ | 72.9M | 🟢 **-25%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 61.5M | ✅ | 41.7M | 🟢 **-32%** |
| contains.json | items + contains | 4 | ✅ | 47.3M | ✅ | 18.5M | 🟢 **-61%** |
| contains.json | contains with false if subschema | 2 | ✅ | 63.5M | ✅ | 71.6M | +13% |
| contains.json | contains with null instance elements | 1 | ✅ | 116.8M | ✅ | 37.7M | 🟢 **-68%** |
| default.json | invalid type for default | 2 | ✅ | 33.1M | ✅ | 69.2M | 🔴 **+109%** |
| default.json | invalid string value for default | 2 | ✅ | 36.2M | ✅ | 48.1M | 🔴 **+33%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.5M | ✅ | 56.8M | +15% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 57.6M | ✅ | 70.9M | 🔴 **+23%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 83.8M | ✅ | 136.4M | 🔴 **+63%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.7M | ✅ | 31.1M | -2% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 42.0M | ✅ | 35.2M | -16% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 52.1M | ✅ | 51.5M | -1% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.8M | ✅ | 16.4M | -7% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 19.2M | ✅ | 26.8M | 🔴 **+40%** |
| enum.json | simple enum validation | 2 | ✅ | 67.7M | ✅ | 85.2M | 🔴 **+26%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.9M | ✅ | 38.9M | -15% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ✅ | 88.1M | 🔴 **+32%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 41.1M | 🔴 **+193%** |
| enum.json | enum with escaped characters | 3 | ✅ | 32.3M | ✅ | 96.4M | 🔴 **+199%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 61.3M | ✅ | 75.6M | 🔴 **+23%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 30.8M | ✅ | 67.7M | 🔴 **+120%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 55.1M | ✅ | 75.5M | 🔴 **+37%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 56.5M | ✅ | 70.3M | 🔴 **+24%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.6M | ✅ | 89.2M | 🔴 **+34%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 60.7M | ✅ | 82.2M | 🔴 **+35%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.8M | ✅ | 91.3M | 🔴 **+37%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 52.7M | ✅ | 78.9M | 🔴 **+50%** |
| enum.json | nul characters in strings | 2 | ✅ | 59.2M | ✅ | 71.3M | 🔴 **+21%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 57.6M | ✅ | 77.0M | 🔴 **+34%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 57.1M | ✅ | 78.2M | 🔴 **+37%** |
| format.json | email format | 6 | ✅ | 73.6M | ✅ | 131.4M | 🔴 **+79%** |
| format.json | idn-email format | 6 | ✅ | 72.3M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 63.6M | ✅ | 131.2M | 🔴 **+106%** |
| format.json | ipv4 format | 6 | ✅ | 71.1M | ✅ | 123.2M | 🔴 **+73%** |
| format.json | ipv6 format | 6 | ✅ | 42.9M | ✅ | 118.5M | 🔴 **+176%** |
| format.json | idn-hostname format | 6 | ✅ | 69.6M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 55.2M | ✅ | 121.5M | 🔴 **+120%** |
| format.json | date format | 6 | ✅ | 72.3M | ✅ | 122.2M | 🔴 **+69%** |
| format.json | date-time format | 6 | ✅ | 72.8M | ✅ | 132.7M | 🔴 **+82%** |
| format.json | time format | 6 | ✅ | 77.5M | ✅ | 121.8M | 🔴 **+57%** |
| format.json | json-pointer format | 6 | ✅ | 79.4M | ✅ | 133.0M | 🔴 **+67%** |
| format.json | relative-json-pointer format | 6 | ✅ | 73.1M | ✅ | 132.6M | 🔴 **+81%** |
| format.json | iri format | 6 | ✅ | 73.0M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 73.4M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 79.7M | ✅ | 128.0M | 🔴 **+61%** |
| format.json | uri-reference format | 6 | ✅ | 73.2M | ✅ | 118.6M | 🔴 **+62%** |
| format.json | uri-template format | 6 | ✅ | 71.3M | ✅ | 119.0M | 🔴 **+67%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 82.8M | ✅ | 134.5M | 🔴 **+63%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 82.4M | ✅ | 134.7M | 🔴 **+63%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 75.3M | ✅ | 134.2M | 🔴 **+78%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ✅ | 95.1M | 🔴 **+36%** |
| if-then-else.json | if and else without then | 3 | ✅ | 59.5M | ✅ | 92.1M | 🔴 **+55%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 64.3M | ✅ | 69.5M | +8% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 75.2M | ✅ | 127.1M | 🔴 **+69%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 67.1M | ✅ | 84.2M | 🔴 **+26%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.4M | ✅ | 75.6M | +17% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.9M | ✅ | 36.9M | -8% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.9M | ✅ | 25.1M | 🟢 **-34%** |
| items.json | a schema given for items | 4 | ✅ | 50.7M | ✅ | 43.8M | -14% |
| items.json | an array of schemas for items | 6 | ✅ | 59.5M | ✅ | 59.0M | -1% |
| items.json | items with boolean schema (true) | 2 | ✅ | 82.3M | ✅ | 134.9M | 🔴 **+64%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 63.4M | ✅ | 54.7M | -14% |
| items.json | items with boolean schemas | 3 | ✅ | 57.3M | ✅ | 74.2M | 🔴 **+30%** |
| items.json | items and subitems | 6 | ✅ | 11.4M | ✅ | 8.3M | 🟢 **-27%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 6.7M | 🟢 **-44%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 70.2M | ✅ | 66.4M | -5% |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 69.3M | -6% |
| maxItems.json | maxItems validation | 4 | ✅ | 70.1M | ✅ | 96.6M | 🔴 **+38%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 65.8M | ✅ | 83.1M | 🔴 **+26%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.0M | ✅ | 43.7M | 🟢 **-21%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 52.5M | ✅ | 51.6M | -2% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.1M | ✅ | 68.1M | 🔴 **+28%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 37.9M | ✅ | 48.1M | 🔴 **+27%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.4M | ✅ | 50.7M | +5% |
| maximum.json | maximum validation | 4 | ✅ | 68.6M | ✅ | 95.6M | 🔴 **+39%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 69.3M | ✅ | 102.0M | 🔴 **+47%** |
| minItems.json | minItems validation | 4 | ✅ | 67.7M | ✅ | 99.0M | 🔴 **+46%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 65.7M | ✅ | 82.9M | 🔴 **+26%** |
| minLength.json | minLength validation | 5 | ✅ | 54.2M | ✅ | 34.2M | 🟢 **-37%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.1M | ✅ | 46.8M | -10% |
| minProperties.json | minProperties validation | 6 | ✅ | 55.3M | ✅ | 68.3M | 🔴 **+23%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.0M | ✅ | 50.0M | +4% |
| minimum.json | minimum validation | 4 | ✅ | 69.4M | ✅ | 94.4M | 🔴 **+36%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.5M | ✅ | 89.1M | 🔴 **+36%** |
| multipleOf.json | by int | 3 | ✅ | 70.2M | ✅ | 94.4M | 🔴 **+35%** |
| multipleOf.json | by number | 3 | ✅ | 68.6M | ✅ | 59.3M | -14% |
| multipleOf.json | by small number | 2 | ✅ | 63.0M | ✅ | 27.1M | 🟢 **-57%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.4M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.7M | ✅ | 17.2M | 🟢 **-75%** |
| not.json | not | 2 | ✅ | 68.9M | ✅ | 83.9M | 🔴 **+22%** |
| not.json | not multiple types | 3 | ✅ | 64.2M | ✅ | 72.2M | +13% |
| not.json | not more complex schema | 3 | ✅ | 61.3M | ✅ | 48.2M | 🟢 **-21%** |
| not.json | forbidden property | 2 | ✅ | 49.9M | ✅ | 59.8M | +20% |
| not.json | forbid everything with empty schema | 9 | ✅ | 55.8M | ✅ | 62.7M | +12% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 56.2M | ✅ | 58.9M | +5% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 78.7M | ✅ | 137.6M | 🔴 **+75%** |
| not.json | double negation | 1 | ✅ | 79.8M | ✅ | 124.8M | 🔴 **+56%** |
| oneOf.json | oneOf | 4 | ✅ | 71.0M | ✅ | 74.3M | +5% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.0M | ✅ | 28.1M | -9% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 59.0M | ✅ | 63.8M | +8% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 79.6M | ✅ | 124.4M | 🔴 **+56%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 59.2M | ✅ | 64.2M | +8% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 59.3M | ✅ | 64.0M | +8% |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.1M | ✅ | 29.0M | 🟢 **-26%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 68.0M | ✅ | 84.8M | 🔴 **+25%** |
| oneOf.json | oneOf with required | 4 | ✅ | 42.8M | ✅ | 26.7M | 🟢 **-38%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ✅ | 31.7M | 🟢 **-27%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 68.5M | ✅ | 86.1M | 🔴 **+26%** |
| pattern.json | pattern validation | 8 | ✅ | 51.4M | ✅ | 72.5M | 🔴 **+41%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.7M | ✅ | 60.5M | 🔴 **+145%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.3M | ✅ | 18.3M | 🟢 **-28%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.2M | ✅ | 14.7M | +11% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.6M | ✅ | 13.0M | -16% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ✅ | 18.3M | -7% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 21.8M | 🔴 **+24%** |
| properties.json | object properties validation | 6 | ✅ | 50.1M | ✅ | 54.5M | +9% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.9M | ✅ | 11.1M | 🟢 **-38%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.6M | ✅ | 58.4M | 🔴 **+31%** |
| properties.json | properties with escaped characters | 2 | ✅ | 47.3M | ✅ | 24.0M | 🟢 **-49%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.1M | ✅ | 59.5M | -7% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.6M | ✅ | 29.1M | +9% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.9M | ✅ | 41.2M | +6% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.1M | ✅ | 17.0M | -6% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 82.5M | ✅ | 133.7M | 🔴 **+62%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.5M | ✅ | 24.4M | 🟢 **-50%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.8M | ✅ | 28.9M | 🟢 **-26%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.0M | ✅ | 33.0M | -20% |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ✅ | 14.1M | 🟢 **-43%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.1M | ✅ | 29.1M | 🟢 **-39%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.4M | ✅ | 25.1M | 🟢 **-53%** |
| ref.json | escaped pointer ref | 6 | ✅ | 42.3M | ✅ | 29.4M | 🟢 **-30%** |
| ref.json | nested refs | 2 | ✅ | 37.2M | ✅ | 11.7M | 🟢 **-68%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 47.5M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 47.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 22.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.2M | ✅ | 47.4M | -2% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.1M | ✅ | 28.8M | 🟢 **-40%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 79.7M | ✅ | 120.2M | 🔴 **+51%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 59.5M | ✅ | 31.9M | 🟢 **-46%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ✅ | 2.7M | 🟢 **-69%** |
| ref.json | refs with quote | 2 | ✅ | 50.2M | ✅ | 28.1M | 🟢 **-44%** |
| ref.json | Location-independent identifier | 2 | ✅ | 47.9M | ✅ | 40.0M | -16% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 47.5M | ✅ | 43.3M | -9% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 45.5M | ✅ | 40.7M | -11% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.0M | ✅ | 38.3M | 🟢 **-28%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.9M | ✅ | 10.3M | 🟢 **-68%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.7M | ✅ | 10.5M | 🟢 **-67%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.9M | ✅ | 39.9M | -15% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.5M | ✅ | 25.5M | 🟢 **-37%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 49.8M | ✅ | 29.0M | 🟢 **-42%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.1M | ✅ | 29.0M | 🟢 **-40%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.0M | ✅ | 28.9M | 🟢 **-39%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.3M | ✅ | 29.1M | 🟢 **-36%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 50.3M | ✅ | 28.8M | 🟢 **-43%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.3M | ✅ | 28.8M | 🟢 **-30%** |
| ref.json | ref to if | 2 | ✅ | 47.6M | ✅ | 43.1M | -10% |
| ref.json | ref to then | 2 | ✅ | 47.7M | ✅ | 41.4M | -13% |
| ref.json | ref to else | 2 | ✅ | 47.6M | ✅ | 42.2M | -12% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.5M | ✅ | 42.6M | -10% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 68.7M | ✅ | 41.1M | 🟢 **-40%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.0M | ✅ | 43.4M | 🟢 **-37%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 63.1M | ✅ | 42.6M | 🟢 **-32%** |
| refRemote.json | remote ref | 2 | ✅ | 47.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 39.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 40.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.0M | ✅ | 77.1M | 🔴 **+33%** |
| required.json | required default validation | 1 | ✅ | 79.7M | ✅ | 124.7M | 🔴 **+57%** |
| required.json | required with empty array | 1 | ✅ | 79.7M | ✅ | 123.9M | 🔴 **+55%** |
| required.json | required with escaped characters | 2 | ✅ | 47.8M | ✅ | 24.0M | 🟢 **-50%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.6M | ✅ | 36.3M | 🔴 **+37%** |
| type.json | integer type matches integers | 9 | ✅ | 57.6M | ✅ | 63.6M | +10% |
| type.json | number type matches numbers | 9 | ✅ | 59.4M | ✅ | 71.2M | +20% |
| type.json | string type matches strings | 9 | ✅ | 59.4M | ✅ | 73.1M | 🔴 **+23%** |
| type.json | object type matches objects | 7 | ✅ | 50.5M | ✅ | 59.8M | +18% |
| type.json | array type matches arrays | 7 | ✅ | 56.1M | ✅ | 59.1M | +5% |
| type.json | boolean type matches booleans | 10 | ✅ | 57.4M | ✅ | 63.0M | +10% |
| type.json | null type matches only the null object | 10 | ✅ | 57.0M | ✅ | 60.1M | +5% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.6M | ✅ | 68.4M | +19% |
| type.json | type as array with one item | 2 | ✅ | 68.4M | ✅ | 87.7M | 🔴 **+28%** |
| type.json | type: array or object | 5 | ✅ | 57.9M | ✅ | 66.6M | +15% |
| type.json | type: array, object or null | 5 | ✅ | 61.6M | ✅ | 71.5M | +16% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 8.0M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ✅ | 24.2M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.9M | ✅ | 29.7M | 🔴 **+66%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 79.1M | ✅ | 127.8M | 🔴 **+61%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 65.6M | ✅ | 46.9M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.0M | ✅ | 42.9M | 🟢 **-30%** |
| optional/bignum.json | integer | 2 | ✅ | 78.3M | ✅ | 121.5M | 🔴 **+55%** |
| optional/bignum.json | number | 2 | ✅ | 80.4M | ✅ | 108.5M | 🔴 **+35%** |
| optional/bignum.json | string | 1 | ✅ | 57.4M | ✅ | 61.3M | +7% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.8M | ✅ | 111.2M | 🔴 **+55%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.7M | ✅ | 60.0M | +8% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 111.2M | 🔴 **+51%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.7M | ✅ | 59.5M | +7% |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 343K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 23.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.4M | ✅ | 71.3M | 🔴 **+160%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.5M | ✅ | 35.4M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 35.9M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 36.0M | 🔴 **+37%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.3M | ✅ | 34.1M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.0M | ✅ | 33.9M | 🔴 **+36%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.3M | ✅ | 34.2M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.0M | ✅ | 35.4M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.9M | ✅ | 38.1M | 🔴 **+53%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.8M | ✅ | 33.6M | +17% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.0M | ✅ | 20.1M | 🔴 **+26%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.0M | ✅ | 16.1M | -5% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.2M | ✅ | 15.8M | +11% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ✅ | 32.3M | 🔴 **+23%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.4M | ✅ | 27.4M | 🔴 **+34%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ✅ | 18.7M | -16% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ✅ | 13.6M | 🟢 **-29%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.6M | ✅ | 15.4M | -17% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.9M | ✅ | 8.4M | -6% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.7M | ✅ | 11.7M | 🔴 **+21%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.1M | ✅ | 16.0M | -16% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ✅ | 9.4M | 🟢 **-62%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.1M | ✅ | 22.5M | 🔴 **+147%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ✅ | 14.0M | 🟢 **-24%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.9M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 4.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.4M | ✅ | 35.2M | -3% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.0M | ✅ | 18.0M | 🔴 **+64%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.5M | ✅ | 36.0M | +14% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 65.3M | ✅ | 940K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.1M | ✅ | 43.2M | 🔴 **+27%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 7.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 76.7M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.8M | ✅ | 7.8M | 🟢 **-28%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.2M | ✅ | 19.2M | +6% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.8M | 🟢 **-26%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.7M | ✅ | 24.9M | 🟢 **-28%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 56.0M | ✅ | 37.1M | 🟢 **-34%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 56.0M | ✅ | 38.1M | 🟢 **-32%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ✅ | 34.4M | +19% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.3M | ✅ | 10.9M | 🟢 **-33%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.1M | ✅ | 24.6M | 🔴 **+75%** |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 6.7M | -9% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 33.2M | ✅ | 15.4M | 🟢 **-53%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.6M | ✅ | 102.5M | 🟢 **-33%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 64.9M | ✅ | 86.0M | 🔴 **+32%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.0M | ✅ | 135.0M | -18% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 70.1M | ✅ | 69.3M | -1% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.0M | ✅ | 35.9M | 🟢 **-36%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.3M | ✅ | 15.7M | 🟢 **-58%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 78.9M | 🟢 **-27%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 70.0M | ✅ | 125.3M | 🔴 **+79%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.4M | ✅ | 41.3M | -11% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.3M | ✅ | 23.8M | +12% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.8M | ✅ | 27.4M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.8M | ✅ | 12.6M | 🟢 **-63%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.9M | ✅ | 125.0M | -18% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.7M | ✅ | 15.3M | 🟢 **-45%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 58.5M | ✅ | 51.3M | -12% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.6M | ✅ | 14.2M | 🟢 **-42%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.6M | ✅ | 9.5M | 🟢 **-70%** |
| allOf.json | allOf | 4 | ✅ | 37.4M | ✅ | 39.9M | +7% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ✅ | 25.3M | -18% |
| allOf.json | allOf simple types | 2 | ✅ | 63.2M | ✅ | 80.5M | 🔴 **+27%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.0M | ✅ | 125.5M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 58.2M | ✅ | 63.9M | +10% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64.7M | 🟢 **-30%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 76.7M | ✅ | 124.4M | 🔴 **+62%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 136.8M | ✅ | 125.3M | -8% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.8M | ✅ | 87.4M | 🔴 **+31%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 84.3M | 🟢 **-28%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.9M | ✅ | 87.2M | 🔴 **+29%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 59.9M | 🟢 **-29%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 66.9M | ✅ | 38.8M | 🟢 **-42%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.7M | ✅ | 38.4M | 🟢 **-56%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 45.5M | ✅ | 33.3M | 🟢 **-27%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 66.6M | ✅ | 38.5M | 🟢 **-42%** |
| anyOf.json | anyOf | 4 | ✅ | 68.8M | ✅ | 87.9M | 🔴 **+28%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 37.0M | ✅ | 27.2M | 🟢 **-27%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 76.8M | ✅ | 124.9M | 🔴 **+63%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 76.8M | ✅ | 125.0M | 🔴 **+63%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 58.2M | ✅ | 65.0M | +12% |
| anyOf.json | anyOf complex types | 4 | ✅ | 46.0M | ✅ | 29.9M | 🟢 **-35%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 72.0M | ✅ | 135.5M | 🔴 **+88%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 87.1M | 🔴 **+34%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 75.0M | ✅ | 138.7M | 🔴 **+85%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 52.0M | ✅ | 62.4M | 🔴 **+20%** |
| const.json | const validation | 3 | ✅ | 57.6M | ✅ | 69.4M | 🔴 **+21%** |
| const.json | const with object | 4 | ✅ | 37.5M | ✅ | 32.6M | -13% |
| const.json | const with array | 3 | ✅ | 50.9M | ✅ | 8.8M | 🟢 **-83%** |
| const.json | const with null | 2 | ✅ | 68.0M | ✅ | 86.9M | 🔴 **+28%** |
| const.json | const with false does not match 0 | 3 | ✅ | 32.5M | ✅ | 76.8M | 🔴 **+136%** |
| const.json | const with true does not match 1 | 3 | ✅ | 62.2M | ✅ | 73.2M | +18% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 57.1M | ✅ | 69.8M | 🔴 **+22%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 56.5M | ✅ | 69.0M | 🔴 **+22%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 53.5M | ✅ | 32.8M | 🟢 **-39%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 53.4M | ✅ | 33.7M | 🟢 **-37%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 56.1M | ✅ | 65.2M | +16% |
| const.json | const with 1 does not match true | 3 | ✅ | 31.8M | ✅ | 91.2M | 🔴 **+187%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 32.8M | ✅ | 69.1M | 🔴 **+110%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.3M | ✅ | 81.1M | 🔴 **+28%** |
| const.json | nul characters in strings | 2 | ✅ | 57.4M | ✅ | 73.0M | 🔴 **+27%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 44.9M | ✅ | 67.3M | 🔴 **+50%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 55.5M | ✅ | 75.4M | 🔴 **+36%** |
| contains.json | contains keyword validation | 6 | ✅ | 54.6M | ✅ | 20.9M | 🟢 **-62%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.6M | ✅ | 14.7M | 🟢 **-75%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.8M | ✅ | 73.0M | +16% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.5M | ✅ | 43.2M | 🟢 **-21%** |
| contains.json | items + contains | 4 | ✅ | 38.6M | ✅ | 17.3M | 🟢 **-55%** |
| contains.json | contains with false if subschema | 2 | ✅ | 60.8M | ✅ | 73.1M | 🔴 **+20%** |
| contains.json | contains with null instance elements | 1 | ✅ | 67.4M | ✅ | 38.1M | 🟢 **-44%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 79.9M | ✅ | 138.1M | 🔴 **+73%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 79.1M | ✅ | 138.0M | 🔴 **+75%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 70.1M | ✅ | 139.1M | 🔴 **+99%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 66.8M | ✅ | 138.2M | 🔴 **+107%** |
| default.json | invalid type for default | 2 | ✅ | 59.6M | ✅ | 75.6M | 🔴 **+27%** |
| default.json | invalid string value for default | 2 | ✅ | 49.8M | ✅ | 46.3M | -7% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 39.3M | ✅ | 57.1M | 🔴 **+45%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 56.3M | ✅ | 69.6M | 🔴 **+24%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 68.1M | ✅ | 137.7M | 🔴 **+102%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.5M | ✅ | 31.6M | +19% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.5M | ✅ | 39.8M | -6% |
| dependentSchemas.json | single dependency | 8 | ✅ | 49.9M | ✅ | 48.5M | -3% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 48.0M | ✅ | 55.1M | +15% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 37.7M | ✅ | 35.9M | -5% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 36.0M | ✅ | 26.8M | 🟢 **-26%** |
| enum.json | simple enum validation | 2 | ✅ | 75.9M | ✅ | 86.3M | +14% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.9M | ✅ | 38.8M | -10% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.7M | ✅ | 88.9M | 🔴 **+42%** |
| enum.json | enums in properties | 6 | ✅ | 14.6M | ✅ | 41.1M | 🔴 **+182%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.0M | ✅ | 96.2M | 🔴 **+60%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 62.4M | ✅ | 71.1M | +14% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.4M | ✅ | 68.8M | 🔴 **+24%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 62.9M | ✅ | 77.3M | 🔴 **+23%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 55.3M | ✅ | 67.1M | 🔴 **+21%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 61.3M | ✅ | 89.6M | 🔴 **+46%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.5M | ✅ | 77.3M | 🔴 **+32%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 32.3M | ✅ | 91.0M | 🔴 **+181%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.4M | ✅ | 78.4M | 🔴 **+34%** |
| enum.json | nul characters in strings | 2 | ✅ | 57.4M | ✅ | 71.7M | 🔴 **+25%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 62.6M | ✅ | 79.4M | 🔴 **+27%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 57.2M | ✅ | 78.3M | 🔴 **+37%** |
| format.json | email format | 6 | ✅ | 74.3M | ✅ | 132.8M | 🔴 **+79%** |
| format.json | idn-email format | 6 | ✅ | 79.1M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 74.3M | ✅ | 132.7M | 🔴 **+78%** |
| format.json | ipv4 format | 6 | ✅ | 66.6M | ✅ | 121.2M | 🔴 **+82%** |
| format.json | ipv6 format | 6 | ✅ | 66.5M | ✅ | 132.6M | 🔴 **+99%** |
| format.json | idn-hostname format | 6 | ✅ | 63.4M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 66.5M | ✅ | 129.8M | 🔴 **+95%** |
| format.json | date format | 6 | ✅ | 66.5M | ✅ | 120.5M | 🔴 **+81%** |
| format.json | date-time format | 6 | ✅ | 66.5M | ✅ | 119.2M | 🔴 **+79%** |
| format.json | time format | 6 | ✅ | 66.4M | ✅ | 118.7M | 🔴 **+79%** |
| format.json | json-pointer format | 6 | ✅ | 66.4M | ✅ | 131.0M | 🔴 **+97%** |
| format.json | relative-json-pointer format | 6 | ✅ | 66.5M | ✅ | 132.6M | 🔴 **+99%** |
| format.json | iri format | 6 | ✅ | 66.5M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 66.5M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 66.6M | ✅ | 133.1M | 🔴 **+100%** |
| format.json | uri-reference format | 6 | ✅ | 66.5M | ✅ | 132.0M | 🔴 **+99%** |
| format.json | uri-template format | 6 | ✅ | 66.7M | ✅ | 108.3M | 🔴 **+62%** |
| format.json | uuid format | 6 | ✅ | 66.6M | ✅ | 133.0M | 🔴 **+100%** |
| format.json | duration format | 6 | ✅ | 66.6M | ✅ | 132.9M | 🔴 **+100%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 72.3M | ✅ | 135.6M | 🔴 **+88%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 72.3M | ✅ | 135.2M | 🔴 **+87%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 72.3M | ✅ | 135.1M | 🔴 **+87%** |
| if-then-else.json | if and then without else | 3 | ✅ | 66.5M | ✅ | 91.7M | 🔴 **+38%** |
| if-then-else.json | if and else without then | 3 | ✅ | 66.5M | ✅ | 94.8M | 🔴 **+43%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 63.0M | ✅ | 79.2M | 🔴 **+26%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 72.2M | ✅ | 127.9M | 🔴 **+77%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 66.2M | ✅ | 85.5M | 🔴 **+29%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 63.6M | ✅ | 80.0M | 🔴 **+26%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ✅ | 36.5M | -6% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 40.9M | ✅ | 25.2M | 🟢 **-38%** |
| items.json | a schema given for items | 4 | ✅ | 48.3M | ✅ | 43.9M | -9% |
| items.json | an array of schemas for items | 6 | ✅ | 60.6M | ✅ | 59.5M | -2% |
| items.json | items with boolean schema (true) | 2 | ✅ | 65.6M | ✅ | 135.5M | 🔴 **+106%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.9M | ✅ | 66.2M | +5% |
| items.json | items with boolean schemas | 3 | ✅ | 57.6M | ✅ | 78.6M | 🔴 **+36%** |
| items.json | items and subitems | 6 | ✅ | 12.8M | ✅ | 8.3M | 🟢 **-35%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 6.7M | 🟢 **-45%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 65.9M | ✅ | 66.4M | +1% |
| items.json | array-form items with null instance e... | 1 | ✅ | 70.2M | ✅ | 68.1M | -3% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 78.8M | ✅ | 135.5M | 🔴 **+72%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 61.9M | ✅ | 24.9M | 🟢 **-60%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 58.7M | ✅ | 24.7M | 🟢 **-58%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 53.7M | ✅ | 21.0M | 🟢 **-61%** |
| maxItems.json | maxItems validation | 4 | ✅ | 68.2M | ✅ | 98.8M | 🔴 **+45%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 83.4M | 🔴 **+31%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.1M | ✅ | 41.8M | 🟢 **-21%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.1M | ✅ | 51.5M | +1% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.4M | ✅ | 68.8M | 🔴 **+31%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 45.7M | ✅ | 48.7M | +7% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.8M | ✅ | 49.8M | +16% |
| maximum.json | maximum validation | 4 | ✅ | 66.9M | ✅ | 99.7M | 🔴 **+49%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ✅ | 101.4M | 🔴 **+54%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 79.1M | ✅ | 133.1M | 🔴 **+68%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 59.3M | ✅ | 30.2M | 🟢 **-49%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.6M | ✅ | 23.7M | 🟢 **-57%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.8M | ✅ | 24.5M | 🟢 **-58%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 53.0M | ✅ | 24.8M | 🟢 **-53%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 49.2M | ✅ | 23.8M | 🟢 **-52%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 79.1M | ✅ | 54.4M | 🟢 **-31%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 61.2M | ✅ | 32.0M | 🟢 **-48%** |
| minItems.json | minItems validation | 4 | ✅ | 68.1M | ✅ | 99.6M | 🔴 **+46%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 83.2M | 🔴 **+31%** |
| minLength.json | minLength validation | 5 | ✅ | 52.0M | ✅ | 37.9M | 🟢 **-27%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 51.2M | ✅ | 50.3M | -2% |
| minProperties.json | minProperties validation | 6 | ✅ | 53.4M | ✅ | 69.4M | 🔴 **+30%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 46.2M | ✅ | 50.3M | +9% |
| minimum.json | minimum validation | 4 | ✅ | 66.9M | ✅ | 98.4M | 🔴 **+47%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.1M | ✅ | 90.5M | 🔴 **+43%** |
| multipleOf.json | by int | 3 | ✅ | 67.4M | ✅ | 95.0M | 🔴 **+41%** |
| multipleOf.json | by number | 3 | ✅ | 64.3M | ✅ | 59.5M | -7% |
| multipleOf.json | by small number | 2 | ✅ | 59.1M | ✅ | 27.6M | 🟢 **-53%** |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.9M | ✅ | 17.2M | 🟢 **-74%** |
| not.json | not | 2 | ✅ | 66.9M | ✅ | 85.8M | 🔴 **+28%** |
| not.json | not multiple types | 3 | ✅ | 62.0M | ✅ | 72.9M | +18% |
| not.json | not more complex schema | 3 | ✅ | 60.0M | ✅ | 48.5M | -19% |
| not.json | forbidden property | 2 | ✅ | 47.2M | ✅ | 60.0M | 🔴 **+27%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 52.0M | ✅ | 61.7M | +19% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 55.2M | ✅ | 63.1M | +14% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 75.7M | ✅ | 138.1M | 🔴 **+82%** |
| not.json | double negation | 1 | ✅ | 76.8M | ✅ | 125.3M | 🔴 **+63%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.7M | ✅ | 14.9M | 🟢 **-53%** |
| oneOf.json | oneOf | 4 | ✅ | 59.5M | ✅ | 76.1M | 🔴 **+28%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.8M | ✅ | 26.9M | 🟢 **-23%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 57.9M | ✅ | 63.4M | +10% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 76.7M | ✅ | 120.8M | 🔴 **+57%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 58.3M | ✅ | 63.4M | +9% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 58.3M | ✅ | 63.4M | +9% |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.0M | ✅ | 28.2M | 🟢 **-31%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 66.0M | ✅ | 85.4M | 🔴 **+29%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.0M | ✅ | 26.5M | 🟢 **-40%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.2M | ✅ | 32.7M | 🟢 **-28%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.3M | ✅ | 86.2M | 🔴 **+30%** |
| pattern.json | pattern validation | 8 | ✅ | 50.8M | ✅ | 70.8M | 🔴 **+39%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.1M | ✅ | 56.3M | 🔴 **+134%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ✅ | 18.6M | 🟢 **-27%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 14.6M | -3% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.0M | ✅ | 13.0M | -19% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.2M | ✅ | 18.3M | -9% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 22.6M | 🔴 **+29%** |
| properties.json | object properties validation | 6 | ✅ | 50.5M | ✅ | 51.9M | +3% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ✅ | 11.5M | 🟢 **-40%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.6M | ✅ | 53.2M | +19% |
| properties.json | properties with escaped characters | 2 | ✅ | 45.9M | ✅ | 24.2M | 🟢 **-47%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.0M | ✅ | 57.1M | -8% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.9M | ✅ | 27.8M | +3% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.8M | ✅ | 38.8M | +3% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 16.1M | -16% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 79.1M | ✅ | 125.8M | 🔴 **+59%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.7M | ✅ | 25.1M | 🟢 **-46%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.4M | ✅ | 30.4M | -19% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.1M | ✅ | 33.2M | -15% |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.3M | ✅ | 13.7M | +3% |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.8M | ✅ | 10.7M | 🔴 **+86%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 10.4M | 🔴 **+238%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.7M | ✅ | 11.0M | -6% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 11.8M | ✅ | 10.0M | -15% |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.6M | ✅ | 14.4M | 🔴 **+68%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.0M | ✅ | 14.8M | 🔴 **+86%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 3.9M | ✅ | 4.2M | +8% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ✅ | 4.5M | +7% |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ✅ | 13.5M | 🟢 **-44%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.5M | ✅ | 28.9M | 🟢 **-39%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.6M | ✅ | 24.7M | 🟢 **-53%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ✅ | 28.8M | 🟢 **-33%** |
| ref.json | nested refs | 2 | ✅ | 37.0M | ✅ | 11.1M | 🟢 **-70%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.7M | ✅ | 29.1M | 🟢 **-28%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.3M | ✅ | 45.4M | -4% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.6M | ✅ | 28.6M | 🟢 **-41%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 76.8M | ✅ | 120.0M | 🔴 **+56%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 58.2M | ✅ | 35.0M | 🟢 **-40%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.2M | ✅ | 2.7M | 🟢 **-67%** |
| ref.json | refs with quote | 2 | ✅ | 47.5M | ✅ | 28.8M | 🟢 **-39%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.4M | ✅ | 9.1M | 🟢 **-64%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.3M | ✅ | 37.9M | 🟢 **-26%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.2M | ✅ | 10.3M | 🟢 **-68%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.1M | ✅ | 10.0M | 🟢 **-69%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 45.9M | ✅ | 43.1M | -6% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 46.3M | ✅ | 40.0M | -14% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 64.4M | ✅ | 41.9M | 🟢 **-35%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 34.9M | ✅ | 24.9M | 🟢 **-29%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.9M | ✅ | 24.5M | 🟢 **-35%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.1M | ✅ | 28.1M | 🟢 **-40%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 47.0M | ✅ | 28.6M | 🟢 **-39%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.6M | ✅ | 27.6M | 🟢 **-38%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.3M | ✅ | 29.1M | 🟢 **-34%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.6M | ✅ | 27.0M | 🟢 **-41%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.2M | ✅ | 27.5M | 🟢 **-38%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 46.6M | ✅ | 25.0M | 🟢 **-46%** |
| ref.json | ref to if | 2 | ✅ | 47.0M | ✅ | 38.8M | -17% |
| ref.json | ref to then | 2 | ✅ | 47.1M | ✅ | 36.2M | 🟢 **-23%** |
| ref.json | ref to else | 2 | ✅ | 44.9M | ✅ | 38.9M | -13% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.0M | ✅ | 36.1M | 🟢 **-23%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.2M | ✅ | 33.8M | 🟢 **-49%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 32.4M | 🟢 **-52%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 60.5M | ✅ | 43.3M | 🟢 **-28%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.6M | ✅ | 18.4M | 🔴 **+297%** |
| refRemote.json | remote ref | 2 | ✅ | 45.5M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 44.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 42.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 47.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 44.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.6M | ✅ | 75.1M | 🔴 **+30%** |
| required.json | required default validation | 1 | ✅ | 76.8M | ✅ | 121.4M | 🔴 **+58%** |
| required.json | required with empty array | 1 | ✅ | 76.4M | ✅ | 121.3M | 🔴 **+59%** |
| required.json | required with escaped characters | 2 | ✅ | 46.6M | ✅ | 23.5M | 🟢 **-50%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.3M | ✅ | 35.4M | 🔴 **+34%** |
| type.json | integer type matches integers | 9 | ✅ | 53.8M | ✅ | 63.0M | +17% |
| type.json | number type matches numbers | 9 | ✅ | 59.7M | ✅ | 67.0M | +12% |
| type.json | string type matches strings | 9 | ✅ | 59.3M | ✅ | 68.4M | +15% |
| type.json | object type matches objects | 7 | ✅ | 52.8M | ✅ | 57.9M | +10% |
| type.json | array type matches arrays | 7 | ✅ | 55.3M | ✅ | 56.7M | +3% |
| type.json | boolean type matches booleans | 10 | ✅ | 58.1M | ✅ | 63.9M | +10% |
| type.json | null type matches only the null object | 10 | ✅ | 54.2M | ✅ | 60.4M | +11% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.0M | ✅ | 62.2M | +9% |
| type.json | type as array with one item | 2 | ✅ | 66.7M | ✅ | 81.8M | 🔴 **+23%** |
| type.json | type: array or object | 5 | ✅ | 58.0M | ✅ | 65.3M | +13% |
| type.json | type: array, object or null | 5 | ✅ | 61.9M | ✅ | 80.9M | 🔴 **+31%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 71.3M | ✅ | 130.7M | 🔴 **+83%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.6M | ✅ | 80.2M | 🔴 **+50%** |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 46.5M | ✅ | 53.6M | +15% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 62.1M | ✅ | 45.1M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 48.4M | ✅ | 51.9M | +7% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 68.7M | ✅ | 67.9M | -1% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 41.2M | ✅ | 28.0M | 🟢 **-32%** |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 38.6M | ✅ | 27.6M | 🟢 **-29%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.9M | ✅ | 37.4M | -18% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.2M | ✅ | 13.7M | 🟢 **-38%** |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 70.6M | ✅ | 70.6M | +0% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.3M | ✅ | 70.6M | 🔴 **+248%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ✅ | 15.3M | 🔴 **+29%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.0M | ✅ | 23.8M | 🔴 **+59%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 37.7M | ✅ | 27.8M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ✅ | 14.2M | 🔴 **+29%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 51.0M | ✅ | 77.7M | 🔴 **+52%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 45.0M | ✅ | 34.8M | 🟢 **-23%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.6M | ✅ | 34.4M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 42.1M | ✅ | 58.4M | 🔴 **+39%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.8M | ✅ | 27.7M | +17% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 64.0M | ✅ | 118.3M | 🔴 **+85%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 66.1M | ✅ | 66.4M | +1% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.6M | ✅ | 19.8M | -4% |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 39.2M | ✅ | 32.3M | -18% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.1M | ✅ | 98.9M | 🔴 **+90%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.2M | ✅ | 24.3M | 🟢 **-22%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 32.9M | ✅ | 24.9M | 🟢 **-24%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.8M | ✅ | 19.7M | 🟢 **-36%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ✅ | 15.3M | 🔴 **+35%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 61.2M | ✅ | 58.0M | -5% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.0M | ✅ | 17.2M | 🟢 **-41%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ✅ | 12.0M | 🔴 **+26%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 61.2M | ✅ | 58.1M | -5% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.1M | ✅ | 55.4M | 🔴 **+84%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.7M | ✅ | 5.5M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.2M | ✅ | 9.8M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.8M | ✅ | 11.9M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.6M | ✅ | 9.4M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.5M | ✅ | 7.9M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.0M | ✅ | 6.5M | 🟢 **-64%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 27.2M | ✅ | 11.9M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.4M | ✅ | 20.8M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.1M | ✅ | 15.5M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 29.0M | ✅ | 15.8M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.8M | ✅ | 16.6M | 🟢 **-38%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.3M | ✅ | 16.8M | 🟢 **-36%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.7M | ✅ | 58.0M | 🔴 **+83%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.1M | ✅ | 58.0M | 🔴 **+106%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 24.8M | ✅ | 14.6M | 🟢 **-41%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.3M | ✅ | 19.8M | 🟢 **-25%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.2M | ✅ | 14.6M | 🟢 **-28%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ✅ | 20.0M | 🔴 **+67%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.4M | ✅ | 15.5M | 🟢 **-41%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.3M | ✅ | 21.3M | 🟢 **-27%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 42.9M | ✅ | 21.5M | 🟢 **-50%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.0M | ✅ | 10.1M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ✅ | 9.1M | 🟢 **-53%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ✅ | 2.9M | 🟢 **-60%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 66.5M | ✅ | 115.5M | 🔴 **+74%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 47.7M | ✅ | 50.4M | +6% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 12.9M | ✅ | 21.4M | 🔴 **+66%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 6.2M | ✅ | 3.3M | 🟢 **-47%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.2M | ✅ | 12.4M | 🟢 **-42%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.0M | ✅ | 11.9M | 🟢 **-50%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ✅ | 8.0M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.1M | ✅ | 24.0M | 🟢 **-23%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 28.9M | 🔴 **+58%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 74.2M | ✅ | 126.7M | 🔴 **+71%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.5M | ✅ | 46.3M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.3M | ✅ | 41.6M | 🟢 **-30%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 46.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 67.0M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 53.8M | ✅ | 24.6M | 🟢 **-54%** |
| optional/bignum.json | integer | 2 | ✅ | 74.9M | ✅ | 112.0M | 🔴 **+50%** |
| optional/bignum.json | number | 2 | ✅ | 75.9M | ✅ | 121.4M | 🔴 **+60%** |
| optional/bignum.json | string | 1 | ✅ | 56.5M | ✅ | 60.5M | +7% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 105.1M | 🔴 **+53%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.9M | ✅ | 59.4M | +10% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 107.2M | 🔴 **+56%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 53.9M | ✅ | 59.3M | +10% |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.2M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 63.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 57.1M | ✅ | 69.4M | 🔴 **+21%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 80.0M | ✅ | 133.1M | 🔴 **+66%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.1M | ✅ | 30.9M | -4% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 44.4M | ✅ | 38.7M | -13% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 49.5M | ✅ | 46.7M | -6% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 54.8M | ✅ | 53.6M | -2% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 38.5M | ✅ | 34.7M | -10% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.7M | ✅ | 66.9M | 🔴 **+141%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.5M | ✅ | 34.2M | 🔴 **+76%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ✅ | 34.4M | 🔴 **+29%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 33.0M | 🔴 **+23%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.1M | ✅ | 33.0M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.2M | ✅ | 34.6M | 🔴 **+37%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.9M | ✅ | 35.2M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.6M | ✅ | 34.3M | 🔴 **+29%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 36.9M | 🔴 **+48%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.7M | ✅ | 32.8M | +14% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ✅ | 20.1M | 🔴 **+21%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.7M | ✅ | 16.0M | +9% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 14.9M | +0% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.4M | ✅ | 32.0M | 🔴 **+21%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.9M | ✅ | 27.0M | 🔴 **+36%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.6M | ✅ | 19.8M | -12% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.5M | ✅ | 13.6M | 🟢 **-31%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.3M | ✅ | 13.9M | 🟢 **-28%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 8.3M | +5% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.1M | ✅ | 10.1M | 🔴 **+24%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ✅ | 16.1M | -18% |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.3M | ✅ | 9.4M | 🟢 **-63%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ✅ | 24.3M | 🔴 **+186%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 39.1M | ✅ | 13.6M | 🟢 **-65%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ✅ | 14.3M | 🟢 **-22%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 40.7M | ✅ | 34.6M | -15% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ✅ | 17.0M | 🔴 **+44%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.9M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.7M | ✅ | 35.1M | +14% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.8M | ✅ | 944K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 38.4M | ✅ | 41.7M | +9% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 75.4M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ✅ | 7.6M | 🟢 **-22%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.4M | ✅ | 18.6M | +13% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.7M | 🟢 **-25%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ✅ | 15.6M | +3% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 32.3M | ✅ | 25.1M | 🟢 **-22%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 55.0M | ✅ | 62.0M | +13% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ✅ | 33.3M | +15% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.1M | ✅ | 9.9M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 47.6M | ✅ | 28.7M | 🟢 **-40%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 47.6M | ✅ | 28.6M | 🟢 **-40%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 47.5M | ✅ | 27.9M | 🟢 **-41%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 63.1M | ✅ | 37.6M | 🟢 **-40%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.6M | ✅ | 27.2M | 🟢 **-45%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.1M | ✅ | 24.7M | 🔴 **+76%** |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 35.9M | ✅ | 21.3M | 🟢 **-41%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.3M | ✅ | 23.9M | +7% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 27.4M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.3M | ✅ | 25.1M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 153.1M | ✅ | 124.6M | -19% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.8M | ✅ | 17.2M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 51.8M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.2M | ✅ | 13.3M | 🟢 **-47%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.3M | ✅ | 9.3M | 🟢 **-70%** |
| allOf.json | allOf | 4 | ✅ | 39.8M | ✅ | 39.9M | +0% |
| allOf.json | allOf with base schema | 5 | ✅ | 29.3M | ✅ | 25.5M | -13% |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 85.2M | +17% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ✅ | 125.3M | -18% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 63.9M | -3% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 63.8M | 🟢 **-31%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 125.5M | 🔴 **+55%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 125.4M | -18% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 87.2M | +13% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 87.7M | 🟢 **-26%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 62.1M | ✅ | 86.4M | 🔴 **+39%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.5M | ✅ | 59.0M | 🟢 **-30%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ✅ | 38.3M | 🟢 **-50%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.2M | ✅ | 38.4M | 🟢 **-55%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 51.0M | ✅ | 37.9M | 🟢 **-26%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ✅ | 38.5M | 🟢 **-50%** |
| anyOf.json | anyOf | 4 | ✅ | 79.7M | ✅ | 88.6M | +11% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 40.0M | ✅ | 27.4M | 🟢 **-32%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 125.5M | 🔴 **+40%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 89.7M | ✅ | 125.6M | 🔴 **+40%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 64.3M | -3% |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.5M | ✅ | 30.9M | 🟢 **-39%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 135.4M | 🔴 **+61%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 86.6M | +10% |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.8M | ✅ | 138.9M | 🔴 **+76%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 64.6M | ✅ | 63.0M | -3% |
| const.json | const validation | 3 | ✅ | 67.4M | ✅ | 61.1M | -9% |
| const.json | const with object | 4 | ✅ | 41.2M | ✅ | 32.4M | 🟢 **-21%** |
| const.json | const with array | 3 | ✅ | 57.8M | ✅ | 9.1M | 🟢 **-84%** |
| const.json | const with null | 2 | ✅ | 78.7M | ✅ | 64.7M | -18% |
| const.json | const with false does not match 0 | 3 | ✅ | 76.0M | ✅ | 62.7M | -18% |
| const.json | const with true does not match 1 | 3 | ✅ | 76.1M | ✅ | 69.1M | -9% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.1M | ✅ | 60.5M | -9% |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.6M | ✅ | 37.4M | 🟢 **-44%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.6M | ✅ | 25.8M | 🟢 **-62%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 67.4M | ✅ | 33.3M | 🟢 **-51%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ✅ | 63.2M | +0% |
| const.json | const with 1 does not match true | 3 | ✅ | 73.4M | ✅ | 69.6M | -5% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.7M | ✅ | 68.3M | -6% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.1M | ✅ | 69.9M | -4% |
| const.json | nul characters in strings | 2 | ✅ | 50.0M | ✅ | 71.8M | 🔴 **+44%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 55.9M | -4% |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ✅ | 75.0M | +13% |
| contains.json | contains keyword validation | 6 | ✅ | 64.5M | ✅ | 19.6M | 🟢 **-70%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.5M | ✅ | 14.3M | 🟢 **-77%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ✅ | 71.8M | 0% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 70.1M | ✅ | 42.5M | 🟢 **-39%** |
| contains.json | items + contains | 4 | ✅ | 42.2M | ✅ | 17.8M | 🟢 **-58%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.8M | ✅ | 72.4M | +5% |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 35.6M | 🟢 **-54%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 96.0M | ✅ | 137.6M | 🔴 **+43%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 78.9M | ✅ | 72.8M | -8% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 83.4M | ✅ | 125.6M | 🔴 **+51%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 77.5M | ✅ | 113.1M | 🔴 **+46%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 75.1M | +5% |
| default.json | invalid string value for default | 2 | ✅ | 54.9M | ✅ | 47.6M | -13% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 56.1M | ✅ | 52.8M | -6% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 64.6M | ✅ | 60.7M | -6% |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 138.1M | 🔴 **+44%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.0M | ✅ | 31.4M | +12% |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.0M | ✅ | 39.9M | -19% |
| dependentSchemas.json | single dependency | 8 | ✅ | 54.5M | ✅ | 47.3M | -13% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.6M | ✅ | 52.8M | -3% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.0M | ✅ | 35.2M | -12% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.4M | ✅ | 25.0M | 🟢 **-35%** |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 8.1M | ✅ | 3.8M | 🟢 **-53%** |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.5M | ✅ | 19.7M | -4% |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.2M | ✅ | 21.8M | 🔴 **+35%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.0M | ✅ | 2.3M | 🟢 **-79%** |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 12.8M | ✅ | 5.4M | 🟢 **-58%** |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 9.4M | ✅ | 2.7M | 🟢 **-71%** |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.9M | ✅ | 6.4M | -19% |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.6M | ✅ | 18.6M | +5% |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.4M | ✅ | 8.6M | 🟢 **-31%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.3M | ✅ | 1.5M | 🟢 **-79%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.5M | ✅ | 13.3M | -14% |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ✅ | 2.2M | 🟢 **-63%** |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.5M | ✅ | 1.5M | 🟢 **-76%** |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.4M | ✅ | 28.8M | +1% |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ✅ | 2.7M | 🟢 **-67%** |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 84.9M | +13% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.1M | ✅ | 38.8M | -16% |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.6M | ✅ | 86.5M | 🔴 **+28%** |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 40.9M | 🔴 **+174%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ✅ | 96.7M | +20% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.9M | ✅ | 72.8M | -4% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.3M | ✅ | 70.1M | +6% |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.8M | ✅ | 69.9M | -8% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.2M | ✅ | 68.2M | +3% |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 88.9M | +19% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 78.8M | +15% |
| enum.json | enum with 1 does not match true | 3 | ✅ | 72.8M | ✅ | 90.3M | 🔴 **+24%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.9M | ✅ | 80.8M | 🔴 **+29%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 73.6M | +14% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 74.4M | +5% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 64.3M | ✅ | 79.6M | 🔴 **+24%** |
| format.json | email format | 7 | ✅ | 95.9M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 92.4M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 78.2M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 78.7M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 77.8M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 95.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 78.4M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.2M | ✅ | 135.0M | 🔴 **+60%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.8M | ✅ | 135.6M | 🔴 **+44%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.2M | ✅ | 135.6M | 🔴 **+61%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.4M | ✅ | 95.3M | 🔴 **+23%** |
| if-then-else.json | if and else without then | 3 | ✅ | 76.5M | ✅ | 94.1M | 🔴 **+23%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.6M | ✅ | 80.6M | +13% |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 128.1M | 🔴 **+52%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ✅ | 85.1M | +12% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ✅ | 80.6M | +7% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.1M | ✅ | 37.1M | -12% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.5M | ✅ | 24.8M | 🟢 **-44%** |
| items.json | a schema given for items | 4 | ✅ | 54.4M | ✅ | 43.9M | -19% |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 134.4M | 🔴 **+43%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 72.0M | ✅ | 78.6M | +9% |
| items.json | items and subitems | 6 | ✅ | 12.7M | ✅ | 8.4M | 🟢 **-34%** |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 6.8M | 🟢 **-44%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 43.1M | ✅ | 100.5M | 🔴 **+133%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.5M | ✅ | 33.3M | 🟢 **-28%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.8M | ✅ | 28.5M | 🟢 **-36%** |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 79.2M | +9% |
| items.json | items with null instance elements | 1 | ✅ | 74.9M | ✅ | 66.4M | -11% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 135.4M | 🔴 **+44%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.6M | ✅ | 23.4M | 🟢 **-61%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ✅ | 24.5M | 🟢 **-63%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.4M | ✅ | 20.8M | 🟢 **-65%** |
| maxItems.json | maxItems validation | 4 | ✅ | 80.3M | ✅ | 99.6M | 🔴 **+24%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 82.4M | +14% |
| maxLength.json | maxLength validation | 5 | ✅ | 58.4M | ✅ | 44.6M | 🟢 **-24%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 50.0M | -12% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 68.8M | +17% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.4M | ✅ | 48.7M | -3% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ✅ | 48.4M | -6% |
| maximum.json | maximum validation | 4 | ✅ | 76.5M | ✅ | 99.5M | 🔴 **+30%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 74.1M | ✅ | 101.4M | 🔴 **+37%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 135.5M | 🔴 **+44%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.8M | ✅ | 28.1M | 🟢 **-57%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.1M | ✅ | 23.4M | 🟢 **-60%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.2M | ✅ | 24.8M | 🟢 **-63%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.5M | ✅ | 24.1M | 🟢 **-60%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 57.5M | ✅ | 23.0M | 🟢 **-60%** |
| minContains.json | minContains = 0 | 2 | ✅ | 93.9M | ✅ | 54.0M | 🟢 **-42%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 67.5M | ✅ | 32.4M | 🟢 **-52%** |
| minItems.json | minItems validation | 4 | ✅ | 78.9M | ✅ | 96.4M | 🔴 **+22%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 79.4M | +9% |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 35.7M | 🟢 **-39%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.2M | ✅ | 48.5M | -14% |
| minProperties.json | minProperties validation | 6 | ✅ | 56.6M | ✅ | 68.7M | 🔴 **+21%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 51.0M | ✅ | 49.1M | -4% |
| minimum.json | minimum validation | 4 | ✅ | 78.6M | ✅ | 99.4M | 🔴 **+27%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.2M | ✅ | 90.0M | 🔴 **+26%** |
| multipleOf.json | by int | 3 | ✅ | 77.7M | ✅ | 95.8M | 🔴 **+23%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 59.3M | -19% |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 27.0M | 🟢 **-60%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 1.1M | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 17.2M | 🟢 **-77%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 84.9M | +10% |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 69.0M | -3% |
| not.json | not more complex schema | 3 | ✅ | 69.1M | ✅ | 49.3M | 🟢 **-29%** |
| not.json | forbidden property | 2 | ✅ | 53.9M | ✅ | 59.5M | +10% |
| not.json | forbid everything with empty schema | 9 | ✅ | 65.2M | ✅ | 62.6M | -4% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 64.1M | ✅ | 62.6M | -2% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.0M | ✅ | 138.7M | 🔴 **+54%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 125.4M | 🔴 **+39%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.1M | ✅ | 14.5M | 🟢 **-55%** |
| oneOf.json | oneOf | 4 | ✅ | 67.0M | ✅ | 72.8M | +9% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.4M | ✅ | 25.2M | 🟢 **-27%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 62.7M | -5% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 120.8M | 🔴 **+34%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 62.5M | -5% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 62.8M | -5% |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.8M | ✅ | 28.8M | 🟢 **-36%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 84.7M | +11% |
| oneOf.json | oneOf with required | 4 | ✅ | 48.5M | ✅ | 26.4M | 🟢 **-46%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.5M | ✅ | 32.6M | 🟢 **-34%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 86.0M | +13% |
| pattern.json | pattern validation | 8 | ✅ | 55.6M | ✅ | 69.4M | 🔴 **+25%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.1M | ✅ | 56.3M | 🔴 **+298%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 17.6M | 🟢 **-31%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 14.7M | 0% |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.0M | ✅ | 13.2M | -12% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.3M | ✅ | 17.1M | -11% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ✅ | 22.2M | 🔴 **+23%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.3M | ✅ | 58.9M | -14% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.4M | ✅ | 78.2M | +20% |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 67.9M | -16% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 69.3M | -14% |
| properties.json | object properties validation | 6 | ✅ | 56.5M | ✅ | 52.7M | -7% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 11.4M | 🟢 **-43%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ✅ | 53.3M | +8% |
| properties.json | properties with escaped characters | 2 | ✅ | 52.6M | ✅ | 24.2M | 🟢 **-54%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 58.1M | -17% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.3M | ✅ | 28.9M | +2% |
| propertyNames.json | propertyNames validation | 6 | ✅ | 41.0M | ✅ | 40.8M | 0% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ✅ | 16.7M | -16% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 130.1M | 🔴 **+39%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.3M | ✅ | 25.0M | 🟢 **-44%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.6M | ✅ | 30.2M | 🟢 **-26%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ✅ | 32.9M | 🟢 **-23%** |
| ref.json | root pointer ref | 4 | ✅ | 24.6M | ✅ | 14.7M | 🟢 **-40%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.1M | ✅ | 28.7M | 🟢 **-48%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.1M | ✅ | 24.2M | 🟢 **-58%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.8M | ✅ | 28.6M | 🟢 **-39%** |
| ref.json | nested refs | 2 | ✅ | 38.4M | ✅ | 12.1M | 🟢 **-68%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.2M | ✅ | 30.1M | 🟢 **-32%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.2M | ✅ | 47.6M | -9% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.4M | ✅ | 28.7M | 🟢 **-45%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 120.0M | 🔴 **+33%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 34.6M | 🟢 **-48%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ✅ | 2.8M | 🟢 **-68%** |
| ref.json | refs with quote | 2 | ✅ | 54.0M | ✅ | 28.8M | 🟢 **-47%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.1M | ✅ | 9.7M | 🟢 **-65%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 38.2M | 🟢 **-33%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.2M | ✅ | 10.2M | 🟢 **-70%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.0M | ✅ | 10.3M | 🟢 **-69%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.6M | ✅ | 42.8M | -14% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.6M | ✅ | 41.6M | -16% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ✅ | 35.7M | 🟢 **-52%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.0M | ✅ | 24.9M | 🟢 **-34%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 41.7M | ✅ | 24.5M | 🟢 **-41%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.0M | ✅ | 28.7M | 🟢 **-45%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.4M | ✅ | 28.6M | 🟢 **-46%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.5M | ✅ | 27.6M | 🟢 **-44%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.8M | ✅ | 27.6M | 🟢 **-46%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.7M | ✅ | 27.7M | 🟢 **-43%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 50.9M | ✅ | 27.7M | 🟢 **-46%** |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 50.4M | ✅ | 24.8M | 🟢 **-51%** |
| ref.json | ref to if | 2 | ✅ | 50.0M | ✅ | 37.5M | 🟢 **-25%** |
| ref.json | ref to then | 2 | ✅ | 49.8M | ✅ | 37.3M | 🟢 **-25%** |
| ref.json | ref to else | 2 | ✅ | 48.0M | ✅ | 38.8M | -19% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.0M | ✅ | 33.6M | 🟢 **-31%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 33.1M | 🟢 **-57%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 34.6M | 🟢 **-55%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 42.0M | 🟢 **-40%** |
| refRemote.json | remote ref | 2 | ✅ | 45.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 40.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 50.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 76.0M | +17% |
| required.json | required default validation | 1 | ✅ | 89.9M | ✅ | 121.3M | 🔴 **+35%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 107.7M | +20% |
| required.json | required with escaped characters | 2 | ✅ | 54.2M | ✅ | 23.4M | 🟢 **-57%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.2M | ✅ | 34.5M | 🔴 **+32%** |
| type.json | integer type matches integers | 9 | ✅ | 66.4M | ✅ | 61.5M | -7% |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 68.8M | -1% |
| type.json | string type matches strings | 9 | ✅ | 69.2M | ✅ | 68.1M | -2% |
| type.json | object type matches objects | 7 | ✅ | 59.1M | ✅ | 53.7M | -9% |
| type.json | array type matches arrays | 7 | ✅ | 64.7M | ✅ | 59.8M | -8% |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 63.6M | -4% |
| type.json | null type matches only the null object | 10 | ✅ | 66.1M | ✅ | 59.2M | -10% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.5M | ✅ | 64.8M | -2% |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 85.0M | +11% |
| type.json | type: array or object | 5 | ✅ | 70.8M | ✅ | 65.8M | -7% |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 73.3M | -5% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 127.4M | 🔴 **+53%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.1M | ✅ | 67.2M | +10% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.6M | ✅ | 53.5M | +4% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 45.2M | 🟢 **-36%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.2M | ✅ | 49.5M | -12% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 67.8M | -14% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.8M | ✅ | 26.8M | 🟢 **-42%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.7M | ✅ | 37.2M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.5M | ✅ | 13.3M | 🟢 **-41%** |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.9M | ✅ | 70.6M | -14% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.4M | ✅ | 70.7M | 🔴 **+246%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.6M | ✅ | 12.3M | -2% |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.3M | ✅ | 23.8M | 🔴 **+55%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.9M | ✅ | 26.1M | 🟢 **-36%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ✅ | 11.7M | +3% |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.1M | ✅ | 79.7M | 🔴 **+30%** |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 52.4M | ✅ | 32.5M | 🟢 **-38%** |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 51.8M | ✅ | 34.8M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 46.4M | ✅ | 57.8M | 🔴 **+24%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.5M | ✅ | 27.7M | +13% |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.6M | ✅ | 13.0M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.4M | ✅ | 3.5M | 🟢 **-58%** |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.2M | ✅ | 5.8M | 🟢 **-43%** |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.1M | ✅ | 15.9M | -17% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.5M | ✅ | 129.4M | 🔴 **+41%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 66.4M | -12% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.0M | ✅ | 15.2M | 🟢 **-31%** |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 42.1M | ✅ | 26.6M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.3M | ✅ | 130.5M | 🔴 **+124%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.4M | ✅ | 23.4M | 🟢 **-30%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.5M | ✅ | 23.3M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.2M | ✅ | 17.8M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.2M | ✅ | 13.6M | 🔴 **+21%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 93.8M | ✅ | 130.7M | 🔴 **+39%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.7M | ✅ | 15.0M | 🟢 **-58%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.7M | ✅ | 15.5M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.2M | ✅ | 11.2M | 🔴 **+22%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 68.9M | ✅ | 57.0M | -17% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 57.0M | 🔴 **+100%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 13.6M | ✅ | 5.1M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.8M | ✅ | 8.1M | 🟢 **-54%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.8M | ✅ | 10.2M | 🟢 **-57%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 15.6M | ✅ | 8.3M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.4M | ✅ | 7.6M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.2M | ✅ | 6.1M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.1M | ✅ | 12.5M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.4M | ✅ | 20.2M | 🟢 **-38%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.3M | ✅ | 14.3M | 🟢 **-50%** |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.4M | ✅ | 11.7M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.3M | ✅ | 15.7M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.5M | ✅ | 16.7M | 🟢 **-45%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.8M | ✅ | 57.0M | 🔴 **+91%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 57.0M | 🔴 **+100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.2M | ✅ | 13.1M | 🟢 **-50%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ✅ | 18.4M | 🟢 **-34%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.3M | ✅ | 13.5M | 🟢 **-33%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.6M | ✅ | 18.5M | 🔴 **+59%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.5M | ✅ | 13.4M | 🟢 **-48%** |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.6M | ✅ | 20.5M | 🟢 **-37%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 48.8M | ✅ | 20.2M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ✅ | 9.4M | 🟢 **-50%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.1M | ✅ | 9.2M | 🟢 **-54%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ✅ | 2.6M | 🟢 **-63%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.5M | ✅ | 118.3M | 🔴 **+43%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 49.8M | -5% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.5M | ✅ | 21.4M | -19% |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.9M | ✅ | 3.8M | 🟢 **-70%** |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.3M | ✅ | 12.8M | 🟢 **-40%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.4M | ✅ | 11.8M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ✅ | 8.0M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.9M | ✅ | 24.0M | 🟢 **-25%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.7M | ✅ | 29.0M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ✅ | 123.4M | 🔴 **+35%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.0M | ✅ | 45.9M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.2M | ✅ | 41.9M | 🟢 **-37%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.2M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.6M | ✅ | 24.2M | 🟢 **-63%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 111.1M | 🔴 **+26%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 121.5M | 🔴 **+37%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 61.5M | -3% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 107.6M | 🔴 **+36%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 59.8M | 0% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 107.8M | 🔴 **+37%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 59.5M | -1% |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ✅ | 70.1M | +8% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 133.1M | 🔴 **+39%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.5M | ✅ | 30.8M | -11% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.9M | ✅ | 38.5M | 🟢 **-21%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.8M | ✅ | 46.9M | -16% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ✅ | 53.0M | -14% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.2M | ✅ | 34.6M | -16% |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.4M | ✅ | 2.7M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.1M | ✅ | 67.7M | 🔴 **+133%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.6M | ✅ | 34.3M | +20% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 34.8M | 🔴 **+23%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 33.0M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 33.1M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 31.5M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.6M | ✅ | 34.7M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.2M | ✅ | 33.0M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 35.1M | ✅ | 37.0M | +5% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.4M | ✅ | 32.7M | +8% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ✅ | 11.1M | 🟢 **-35%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.3M | ✅ | 16.2M | +5% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.0M | ✅ | 15.8M | +5% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.4M | ✅ | 32.4M | +14% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.8M | ✅ | 26.7M | 🔴 **+22%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ✅ | 19.3M | -17% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 12.4M | 🟢 **-38%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.4M | ✅ | 15.2M | 🟢 **-21%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 8.2M | +3% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ✅ | 11.0M | 🔴 **+34%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ✅ | 16.1M | 🟢 **-26%** |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ✅ | 9.2M | 🟢 **-64%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ✅ | 23.9M | 🔴 **+182%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.9M | ✅ | 13.3M | 🟢 **-68%** |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ✅ | 125K | 🟢 **-100%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.3M | ✅ | 34.9M | -20% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ✅ | 17.3M | 🔴 **+45%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.5M | ✅ | 34.9M | +7% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.6M | ✅ | 926K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.4M | ✅ | 41.4M | 0% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.9M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.3M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ✅ | 7.7M | 🟢 **-22%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.9M | ✅ | 18.7M | +11% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ✅ | 4.8M | 🟢 **-25%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ✅ | 15.6M | +2% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.7M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.4M | ✅ | 24.1M | 🟢 **-35%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 65.8M | ✅ | 61.8M | -6% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ✅ | 33.3M | +8% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.7M | ✅ | 10.2M | 🟢 **-43%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 55.2M | ✅ | 28.6M | 🟢 **-48%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 55.0M | ✅ | 28.6M | 🟢 **-48%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.6M | ✅ | 27.2M | 🟢 **-50%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 35.2M | 🟢 **-54%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.8M | ✅ | 27.1M | 🟢 **-50%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.4M | ✅ | 24.1M | 🔴 **+56%** |
