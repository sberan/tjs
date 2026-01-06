# tjs vs jsen Benchmarks

Performance comparison of **tjs** vs **[jsen](https://github.com/bugventure/jsen)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | jsen pass | jsen ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 24.8M | 170/199 | 15.1M | 170 | 🟢 **-39%** |
| draft6 | 276 | ✅ 276 | 29.7M | 182/276 | 15.3M | 182 | 🟢 **-48%** |
| draft7 | 313 | ✅ 313 | 15.6M | 193/313 | 17.3M | 193 | +11% |
| draft2019-09 | 435 | ✅ 435 | 18.2M | 227/435 | 18.3M | 227 | +1% |
| draft2020-12 | 448 | ✅ 448 | 19.2M | 213/448 | 18.4M | 213 | -4% |
| **Total** | 1671 | 1670/1671 | 19.6M | 985/1671 | 16.9M | 985 | -14% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.32x faster** (26 ns vs 59 ns per test, 3744 tests in 985 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 6.6M | -11% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 69.8M | ✅ | 62.0M | -11% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.4M | ✅ | 56.1M | 🟢 **-62%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 71.2M | ✅ | 71.2M | 0% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 64.7M | 🟢 **-48%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 39.7M | ✅ | 36.3M | -9% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 59.3M | ✅ | 42.2M | 🟢 **-29%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 58.8M | ✅ | 43.7M | 🟢 **-26%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.0M | ✅ | 69.1M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 35.0M | ✅ | 14.7M | 🟢 **-58%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 24.9M | ✅ | 15.9M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 32.1M | ✅ | 17.5M | 🟢 **-45%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.2M | ✅ | 31.3M | 🟢 **-29%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 69.8M | ✅ | 63.5M | -9% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.9M | ✅ | 28.3M | -16% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 44.2M | ✅ | 42.9M | -3% |
| allOf.json | allOf | 4 | ✅ | 47.7M | ✅ | 37.0M | 🟢 **-22%** |
| allOf.json | allOf with base schema | 5 | ✅ | 25.1M | ✅ | 27.4M | +9% |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 53.3M | 🟢 **-51%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 69.7M | ✅ | 74.7M | +7% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.7M | ✅ | 74.4M | 🟢 **-51%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 61.1M | ✅ | 50.6M | -17% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.7M | ✅ | 53.0M | 🟢 **-55%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.6M | ✅ | 53.6M | -13% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.0M | ✅ | 24.2M | 🟢 **-71%** |
| anyOf.json | anyOf | 4 | ✅ | 62.3M | ✅ | 15.0M | 🟢 **-76%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.9M | ✅ | 17.8M | 🟢 **-61%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.5M | ✅ | 16.4M | 🟢 **-62%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.3M | ✅ | 15.9M | 🟢 **-90%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 60.5M | ✅ | 14.8M | 🟢 **-76%** |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 61.5M | 🟢 **-43%** |
| default.json | invalid string value for default | 2 | ✅ | 45.4M | ✅ | 48.2M | +6% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.4M | ✅ | 44.5M | 🟢 **-42%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ✅ | 5.6M | 🟢 **-55%** |
| dependencies.json | dependencies | 7 | ✅ | 90.9M | ✅ | 55.4M | 🟢 **-39%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.8M | ✅ | 37.8M | 🔴 **+23%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.6M | ✅ | 41.0M | 🟢 **-30%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.2M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 33.2M | ✅ | 30.5M | -8% |
| enum.json | simple enum validation | 2 | ✅ | 68.5M | ✅ | 34.4M | 🟢 **-50%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 57.8M | ✅ | 17.0M | 🟢 **-71%** |
| enum.json | enums in properties | 6 | ✅ | 15.0M | ✅ | 18.4M | 🔴 **+23%** |
| enum.json | enum with escaped characters | 3 | ✅ | 48.6M | ✅ | 21.9M | 🟢 **-55%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.1M | ✅ | 31.0M | 🟢 **-73%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.9M | ✅ | 10.4M | 🟢 **-80%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 32.6M | 🟢 **-71%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.0M | ✅ | 10.2M | 🟢 **-81%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 34.8M | 🟢 **-70%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 52.7M | ✅ | 10.7M | 🟢 **-80%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 103.2M | ✅ | 36.9M | 🟢 **-64%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 52.3M | ✅ | 10.8M | 🟢 **-79%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 26.0M | 🟢 **-72%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 49.1M | ✅ | 24.2M | 🟢 **-51%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 27.3M | 🟢 **-71%** |
| format.json | email format | 6 | ✅ | 65.7M | ✅ | 89.6M | 🔴 **+36%** |
| format.json | ipv4 format | 6 | ✅ | 162.3M | ✅ | 68.8M | 🟢 **-58%** |
| format.json | ipv6 format | 6 | ✅ | 65.8M | ✅ | 68.5M | +4% |
| format.json | hostname format | 6 | ✅ | 163.1M | ✅ | 67.9M | 🟢 **-58%** |
| format.json | date-time format | 6 | ✅ | 64.2M | ✅ | 68.9M | +7% |
| format.json | uri format | 6 | ✅ | 162.0M | ✅ | 68.9M | 🟢 **-57%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ✅ | 35.8M | -7% |
| items.json | a schema given for items | 4 | ✅ | 81.9M | ✅ | 49.5M | 🟢 **-40%** |
| items.json | an array of schemas for items | 6 | ✅ | 55.5M | ✅ | 54.7M | -1% |
| items.json | items and subitems | 6 | ✅ | 28.1M | ✅ | 25.4M | -9% |
| items.json | nested items | 3 | ✅ | 11.7M | ✅ | 9.0M | 🟢 **-23%** |
| items.json | items with null instance elements | 1 | ✅ | 60.8M | ✅ | 62.2M | +2% |
| items.json | array-form items with null instance e... | 1 | ✅ | 64.3M | ✅ | 65.5M | +2% |
| maxItems.json | maxItems validation | 4 | ✅ | 58.3M | ✅ | 52.4M | -10% |
| maxLength.json | maxLength validation | 5 | ✅ | 49.4M | ✅ | 44.0M | -11% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 48.1M | ✅ | 46.9M | -2% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.8M | ✅ | 35.6M | -15% |
| maximum.json | maximum validation | 4 | ✅ | 34.3M | ✅ | 55.0M | 🔴 **+60%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 56.3M | ✅ | 54.7M | -3% |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 57.0M | ✅ | 54.9M | -4% |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 57.2M | ✅ | 51.5M | -10% |
| minItems.json | minItems validation | 4 | ✅ | 52.4M | ✅ | 53.6M | +2% |
| minLength.json | minLength validation | 5 | ✅ | 48.5M | ✅ | 43.1M | -11% |
| minProperties.json | minProperties validation | 6 | ✅ | 48.3M | ✅ | 47.1M | -3% |
| minimum.json | minimum validation | 4 | ✅ | 57.0M | ✅ | 57.2M | +0% |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 56.6M | ✅ | 54.1M | -4% |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 57.1M | ✅ | 49.6M | -13% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.2M | ✅ | 54.7M | -4% |
| multipleOf.json | by int | 3 | ✅ | 59.8M | ✅ | 56.0M | -6% |
| multipleOf.json | by number | 3 | ✅ | 57.0M | ✅ | 6.4M | 🟢 **-89%** |
| multipleOf.json | by small number | 2 | ✅ | 46.4M | ✅ | 4.0M | 🟢 **-91%** |
| multipleOf.json | float division = inf | 1 | ✅ | 24.8M | ✅ | 4.5M | 🟢 **-82%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 60.0M | ❌ | - | - |
| not.json | not | 2 | ✅ | 61.2M | ✅ | 16.9M | 🟢 **-72%** |
| not.json | not multiple types | 3 | ✅ | 50.7M | ✅ | 23.7M | 🟢 **-53%** |
| not.json | not more complex schema | 3 | ✅ | 49.5M | ✅ | 17.5M | 🟢 **-65%** |
| not.json | forbidden property | 2 | ✅ | 42.1M | ✅ | 48.3M | +15% |
| not.json | forbid everything with empty schema | 9 | ✅ | 50.5M | ✅ | 38.7M | 🟢 **-23%** |
| not.json | double negation | 1 | ✅ | 69.7M | ✅ | 15.0M | 🟢 **-78%** |
| oneOf.json | oneOf | 4 | ✅ | 53.3M | ✅ | 16.8M | 🟢 **-68%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.1M | ✅ | 18.4M | 🟢 **-39%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.7M | ✅ | 18.1M | 🟢 **-53%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.0M | ✅ | 20.3M | 🟢 **-66%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.9M | ✅ | 17.3M | 🟢 **-59%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 39.8M | ✅ | 18.3M | 🟢 **-54%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 60.0M | ✅ | 14.6M | 🟢 **-76%** |
| pattern.json | pattern validation | 8 | ✅ | 46.3M | ✅ | 44.5M | -4% |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.6M | ✅ | 28.9M | 🔴 **+41%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.8M | ✅ | 19.2M | 🟢 **-22%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ✅ | 10.6M | 🟢 **-26%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 13.3M | -15% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.1M | ✅ | 18.6M | +16% |
| properties.json | object properties validation | 6 | ✅ | 45.8M | ✅ | 46.8M | +2% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.4M | ✅ | 8.0M | 🟢 **-57%** |
| properties.json | properties with escaped characters | 2 | ✅ | 38.7M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 57.2M | ✅ | 62.2M | +9% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.6M | ✅ | 15.2M | 🟢 **-33%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 23.5M | ✅ | 46.5M | 🔴 **+98%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ✅ | 45.0M | -3% |
| ref.json | escaped pointer ref | 6 | ✅ | 39.3M | ✅ | 40.5M | +3% |
| ref.json | nested refs | 2 | ✅ | 35.0M | ✅ | 53.9M | 🔴 **+54%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 44.2M | ✅ | 50.8M | +15% |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 12.0M | ✅ | 29.2M | 🔴 **+144%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.3M | ✅ | 47.7M | +8% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 21.5M | ✅ | 46.1M | 🔴 **+114%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 5.4M | ✅ | 6.4M | +18% |
| ref.json | refs with quote | 2 | ✅ | 44.2M | ✅ | 46.2M | +5% |
| ref.json | Location-independent identifier | 2 | ✅ | 61.1M | ✅ | 54.1M | -11% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 40.1M | ✅ | 53.9M | 🔴 **+35%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 41.6M | ✅ | 6.1M | 🟢 **-85%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 39.8M | ✅ | 45.7M | +15% |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 61.0M | ✅ | 51.4M | -16% |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 49.1M | ✅ | 47.0M | -4% |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 54.1M | ✅ | 51.2M | -6% |
| refRemote.json | remote ref | 2 | ✅ | 42.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 38.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 38.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 17.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 28.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 40.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.2M | ✅ | 53.8M | +1% |
| required.json | required default validation | 1 | ✅ | 66.8M | ✅ | 63.4M | -5% |
| required.json | required with escaped characters | 2 | ✅ | 43.3M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 48.9M | ✅ | 35.2M | 🟢 **-28%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 45.6M | -17% |
| type.json | string type matches strings | 9 | ✅ | 55.2M | ✅ | 47.2M | -14% |
| type.json | object type matches objects | 7 | ✅ | 49.0M | ✅ | 39.1M | 🟢 **-20%** |
| type.json | array type matches arrays | 7 | ✅ | 52.2M | ✅ | 36.3M | 🟢 **-30%** |
| type.json | boolean type matches booleans | 10 | ✅ | 53.6M | ✅ | 42.3M | 🟢 **-21%** |
| type.json | null type matches only the null object | 10 | ✅ | 49.7M | ✅ | 39.1M | 🟢 **-21%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.4M | ✅ | 41.5M | 🟢 **-22%** |
| type.json | type as array with one item | 2 | ✅ | 60.6M | ✅ | 28.1M | 🟢 **-54%** |
| type.json | type: array or object | 5 | ✅ | 54.2M | ✅ | 43.6M | -20% |
| type.json | type: array, object or null | 5 | ✅ | 57.3M | ✅ | 46.2M | -19% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ✅ | 2.0M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.8M | ✅ | 6.6M | 🟢 **-78%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.9M | ✅ | 11.1M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 63.9M | ✅ | 66.7M | +4% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 57.1M | ✅ | 60.8M | +6% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 53.9M | ✅ | 48.8M | -10% |
| optional/bignum.json | integer | 2 | ✅ | 67.7M | ✅ | 13.1M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 68.7M | ✅ | 74.0M | +8% |
| optional/bignum.json | string | 1 | ✅ | 52.2M | ✅ | 41.8M | 🟢 **-20%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 63.3M | ✅ | 68.4M | +8% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.1M | ✅ | 40.7M | -19% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 63.3M | ✅ | 67.7M | +7% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 50.1M | ✅ | 40.8M | -19% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 25.7M | ✅ | 22.5M | -12% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.7M | ✅ | 24.1M | -10% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.5M | ✅ | 24.0M | -2% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.0M | ✅ | 25.3M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.6M | ✅ | 24.8M | -3% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.3M | ✅ | 25.9M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.7M | ✅ | 24.4M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.3M | ✅ | 25.2M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 30.3M | ✅ | 29.4M | -3% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.4M | ✅ | 10.6M | 🟢 **-61%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.4M | ✅ | 12.6M | -12% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ✅ | 13.5M | -8% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.3M | ✅ | 22.7M | -10% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ✅ | 14.4M | 🟢 **-25%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.7M | ✅ | 15.4M | -18% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.6M | ✅ | 10.3M | 🔴 **+35%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ✅ | 7.0M | 🟢 **-35%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 66.9M | ✅ | 43.0M | 🟢 **-36%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 32.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 45.2M | ✅ | 6.4M | 🟢 **-86%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 39.2M | +6% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 157.5M | ✅ | 60.7M | 🟢 **-61%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 83.8M | ✅ | 55.3M | 🟢 **-34%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 172.5M | ✅ | 71.2M | 🟢 **-59%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 84.6M | ✅ | 64.6M | 🟢 **-24%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 38.7M | ✅ | 35.7M | -8% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.1M | ✅ | 41.9M | +13% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 111.3M | ✅ | 48.2M | 🟢 **-57%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 86.4M | ✅ | 68.6M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.1M | ✅ | 13.6M | 🟢 **-68%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 18.5M | ✅ | 18.4M | 0% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.3M | ✅ | 17.5M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.4M | ✅ | 31.2M | 0% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.1M | ✅ | 63.1M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.5M | ✅ | 27.7M | +18% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 73.1M | ✅ | 42.6M | 🟢 **-42%** |
| allOf.json | allOf | 4 | ✅ | 32.0M | ✅ | 19.5M | 🟢 **-39%** |
| allOf.json | allOf with base schema | 5 | ✅ | 26.6M | ✅ | 26.7M | +0% |
| allOf.json | allOf simple types | 2 | ✅ | 77.9M | ✅ | 45.9M | 🟢 **-41%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.3M | ✅ | 73.8M | 🟢 **-53%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 72.0M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 90.1M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 86.1M | ✅ | 39.8M | 🟢 **-54%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 73.1M | 🟢 **-54%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 80.0M | ✅ | 29.2M | 🟢 **-64%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 126.2M | ✅ | 50.5M | 🟢 **-60%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 80.6M | ✅ | 52.7M | 🟢 **-35%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.3M | ✅ | 23.4M | 🟢 **-73%** |
| anyOf.json | anyOf | 4 | ✅ | 71.1M | ✅ | 15.0M | 🟢 **-79%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.6M | ✅ | 17.8M | 🟢 **-62%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 94.1M | ✅ | 9.0M | 🟢 **-90%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 17.3M | 🟢 **-89%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 69.8M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 68.4M | ✅ | 14.8M | 🟢 **-78%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 87.0M | ✅ | 15.8M | 🟢 **-82%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 130.2M | ✅ | 14.6M | 🟢 **-89%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 72.0M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.2M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 70.7M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 52.7M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 59.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 127.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 76.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 89.0M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.7M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 97.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 66.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 64.0M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 120.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 69.3M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 118.6M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 67.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 86.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 69.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 102.7M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 74.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 73.5M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.4M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 32.9M | ✅ | 49.2M | 🔴 **+50%** |
| default.json | invalid type for default | 2 | ✅ | 111.0M | ✅ | 61.3M | 🟢 **-45%** |
| default.json | invalid string value for default | 2 | ✅ | 55.5M | ✅ | 44.1M | 🟢 **-21%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 61.3M | ✅ | 22.8M | 🟢 **-63%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 9.9M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 58.4M | ✅ | 54.8M | -6% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.8M | ✅ | 56.1M | 🟢 **-42%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 36.1M | ✅ | 36.9M | +2% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 27.3M | ✅ | 39.6M | 🔴 **+45%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 60.9M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 13.0M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 31.3M | ✅ | 25.5M | -19% |
| enum.json | simple enum validation | 2 | ✅ | 115.8M | ✅ | 37.4M | 🟢 **-68%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.2M | ✅ | 2.7M | 🟢 **-94%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 123.1M | ✅ | 17.5M | 🟢 **-86%** |
| enum.json | enums in properties | 6 | ✅ | 14.3M | ✅ | 21.5M | 🔴 **+50%** |
| enum.json | enum with escaped characters | 3 | ✅ | 124.2M | ✅ | 23.7M | 🟢 **-81%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 61.9M | ✅ | 32.7M | 🟢 **-47%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 90.7M | ✅ | 10.6M | 🟢 **-88%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.5M | ✅ | 26.9M | 🟢 **-65%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 97.5M | ✅ | 10.2M | 🟢 **-90%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 79.6M | ✅ | 36.0M | 🟢 **-55%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 107.4M | ✅ | 10.6M | 🟢 **-90%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 79.3M | ✅ | 17.7M | 🟢 **-78%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 106.3M | ✅ | 10.2M | 🟢 **-90%** |
| enum.json | nul characters in strings | 2 | ✅ | 68.5M | ✅ | 25.4M | 🟢 **-63%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 115.7M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 74.3M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 158.7M | ✅ | 44.1M | 🟢 **-72%** |
| format.json | ipv4 format | 6 | ✅ | 95.2M | ✅ | 66.4M | 🟢 **-30%** |
| format.json | ipv6 format | 6 | ✅ | 154.1M | ✅ | 65.7M | 🟢 **-57%** |
| format.json | hostname format | 6 | ✅ | 94.7M | ✅ | 67.5M | 🟢 **-29%** |
| format.json | date-time format | 6 | ✅ | 156.8M | ✅ | 68.1M | 🟢 **-57%** |
| format.json | json-pointer format | 6 | ✅ | 94.9M | ✅ | 71.3M | 🟢 **-25%** |
| format.json | uri format | 6 | ✅ | 152.2M | ✅ | 65.0M | 🟢 **-57%** |
| format.json | uri-reference format | 6 | ✅ | 92.9M | ✅ | 70.3M | 🟢 **-24%** |
| format.json | uri-template format | 6 | ✅ | 158.7M | ✅ | 71.4M | 🟢 **-55%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.4M | ✅ | 30.7M | -20% |
| items.json | a schema given for items | 4 | ✅ | 68.7M | ✅ | 48.9M | 🟢 **-29%** |
| items.json | an array of schemas for items | 6 | ✅ | 62.3M | ✅ | 54.7M | -12% |
| items.json | items with boolean schema (true) | 2 | ✅ | 160.5M | ✅ | 70.8M | 🟢 **-56%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 69.1M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 73.8M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 24.1M | ✅ | 23.3M | -3% |
| items.json | nested items | 3 | ✅ | 12.6M | ✅ | 9.0M | 🟢 **-28%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 80.7M | ✅ | 61.0M | 🟢 **-24%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 128.2M | ✅ | 64.9M | 🟢 **-49%** |
| maxItems.json | maxItems validation | 4 | ✅ | 84.7M | ✅ | 53.4M | 🟢 **-37%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 112.8M | ✅ | 47.6M | 🟢 **-58%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.4M | ✅ | 46.8M | 🟢 **-21%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 77.7M | ✅ | 41.0M | 🟢 **-47%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.9M | ✅ | 46.7M | -13% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 64.4M | ✅ | 32.7M | 🟢 **-49%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.2M | ✅ | 35.5M | 🟢 **-31%** |
| maximum.json | maximum validation | 4 | ✅ | 131.7M | ✅ | 54.3M | 🟢 **-59%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 82.2M | ✅ | 54.4M | 🟢 **-34%** |
| minItems.json | minItems validation | 4 | ✅ | 128.7M | ✅ | 53.6M | 🟢 **-58%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 78.2M | ✅ | 46.7M | 🟢 **-40%** |
| minLength.json | minLength validation | 5 | ✅ | 89.0M | ✅ | 43.2M | 🟢 **-51%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 59.4M | ✅ | 40.9M | 🟢 **-31%** |
| minProperties.json | minProperties validation | 6 | ✅ | 83.9M | ✅ | 47.0M | 🟢 **-44%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 52.0M | ✅ | 35.0M | 🟢 **-33%** |
| minimum.json | minimum validation | 4 | ✅ | 126.3M | ✅ | 53.8M | 🟢 **-57%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 75.0M | ✅ | 55.3M | 🟢 **-26%** |
| multipleOf.json | by int | 3 | ✅ | 129.5M | ✅ | 53.9M | 🟢 **-58%** |
| multipleOf.json | by number | 3 | ✅ | 74.7M | ✅ | 6.4M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 98.2M | ✅ | 4.1M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 59.7M | ✅ | 4.3M | 🟢 **-93%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 121.7M | ❌ | - | - |
| not.json | not | 2 | ✅ | 80.1M | ✅ | 17.2M | 🟢 **-78%** |
| not.json | not multiple types | 3 | ✅ | 111.5M | ✅ | 22.9M | 🟢 **-79%** |
| not.json | not more complex schema | 3 | ✅ | 72.4M | ✅ | 17.3M | 🟢 **-76%** |
| not.json | forbidden property | 2 | ✅ | 54.7M | ✅ | 46.2M | -15% |
| not.json | forbid everything with empty schema | 9 | ✅ | 67.2M | ✅ | 38.5M | 🟢 **-43%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 88.6M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 89.0M | ✅ | 57.9M | 🟢 **-35%** |
| not.json | double negation | 1 | ✅ | 159.1M | ✅ | 14.1M | 🟢 **-91%** |
| oneOf.json | oneOf | 4 | ✅ | 68.8M | ✅ | 16.7M | 🟢 **-76%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 43.7M | ✅ | 17.7M | 🟢 **-59%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 69.8M | ✅ | 41.7M | 🟢 **-40%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 158.4M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 64.5M | ✅ | 38.9M | 🟢 **-40%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 101.6M | ✅ | 42.0M | 🟢 **-59%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.5M | ✅ | 17.9M | 🟢 **-60%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 123.7M | ✅ | 19.8M | 🟢 **-84%** |
| oneOf.json | oneOf with required | 4 | ✅ | 53.7M | ✅ | 17.3M | 🟢 **-68%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 72.8M | ✅ | 16.3M | 🟢 **-78%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 78.4M | ✅ | 14.6M | 🟢 **-81%** |
| pattern.json | pattern validation | 8 | ✅ | 77.1M | ✅ | 44.1M | 🟢 **-43%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 27.2M | ✅ | 27.7M | +2% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 28.2M | ✅ | 19.3M | 🟢 **-32%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.9M | ✅ | 7.9M | 🟢 **-43%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.5M | ✅ | 13.5M | -7% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.8M | ✅ | 17.3M | -12% |
| properties.json | object properties validation | 6 | ✅ | 66.3M | ✅ | 47.0M | 🟢 **-29%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.2M | ✅ | 7.6M | 🟢 **-58%** |
| properties.json | properties with boolean schema | 4 | ✅ | 50.7M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 43.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 110.9M | ✅ | 47.5M | 🟢 **-57%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.3M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 172.3M | ✅ | 64.5M | 🟢 **-63%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 44.7M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.3M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 27.7M | ✅ | 16.1M | 🟢 **-42%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.1M | ✅ | 44.5M | -1% |
| ref.json | relative pointer ref to array | 2 | ✅ | 60.1M | ✅ | 44.1M | 🟢 **-27%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 40.0M | -1% |
| ref.json | nested refs | 2 | ✅ | 38.3M | ✅ | 52.3M | 🔴 **+37%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.0M | ✅ | 48.5M | +1% |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 34.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 20.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.7M | ✅ | 45.7M | +10% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.5M | ✅ | 44.9M | +1% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 94.3M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 71.3M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.8M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 44.1M | ✅ | 44.7M | +1% |
| ref.json | Location-independent identifier | 2 | ✅ | 34.3M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 34.2M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 32.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 58.1M | ✅ | 6.3M | 🟢 **-89%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 26.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 25.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.3M | ✅ | 45.2M | -2% |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.1M | ✅ | 45.4M | -6% |
| ref.json | URN base URI with r-component | 2 | ✅ | 41.8M | ✅ | 44.9M | +8% |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.6M | ✅ | 45.3M | +6% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 32.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 33.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 80.9M | ✅ | 51.1M | 🟢 **-37%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 80.8M | ✅ | 51.7M | 🟢 **-36%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.7M | ✅ | 50.7M | 🟢 **-31%** |
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
| required.json | required validation | 5 | ✅ | 60.0M | ✅ | 54.6M | -9% |
| required.json | required default validation | 1 | ✅ | 93.7M | ✅ | 63.4M | 🟢 **-32%** |
| required.json | required with empty array | 1 | ✅ | 94.7M | ✅ | 63.1M | 🟢 **-33%** |
| required.json | required with escaped characters | 2 | ✅ | 44.2M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 23.6M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 67.8M | ✅ | 37.0M | 🟢 **-45%** |
| type.json | number type matches numbers | 9 | ✅ | 70.3M | ✅ | 44.5M | 🟢 **-37%** |
| type.json | string type matches strings | 9 | ✅ | 70.0M | ✅ | 46.6M | 🟢 **-33%** |
| type.json | object type matches objects | 7 | ✅ | 59.9M | ✅ | 39.1M | 🟢 **-35%** |
| type.json | array type matches arrays | 7 | ✅ | 64.3M | ✅ | 39.8M | 🟢 **-38%** |
| type.json | boolean type matches booleans | 10 | ✅ | 67.4M | ✅ | 41.9M | 🟢 **-38%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.2M | ✅ | 40.1M | 🟢 **-39%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.4M | ✅ | 41.2M | 🟢 **-37%** |
| type.json | type as array with one item | 2 | ✅ | 78.8M | ✅ | 50.4M | 🟢 **-36%** |
| type.json | type: array or object | 5 | ✅ | 73.8M | ✅ | 42.7M | 🟢 **-42%** |
| type.json | type: array, object or null | 5 | ✅ | 79.2M | ✅ | 47.6M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.4M | ✅ | 1.9M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 34.9M | ✅ | 6.3M | 🟢 **-82%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.8M | ✅ | 11.1M | 🟢 **-44%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 82.1M | ✅ | 66.7M | -19% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.8M | ✅ | 60.6M | -13% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 75.0M | ✅ | 51.9M | 🟢 **-31%** |
| optional/bignum.json | integer | 2 | ✅ | 89.5M | ✅ | 13.0M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 88.3M | ✅ | 73.2M | -17% |
| optional/bignum.json | string | 1 | ✅ | 68.1M | ✅ | 39.5M | 🟢 **-42%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 83.1M | ✅ | 68.2M | -18% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 64.1M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 84.0M | ✅ | 46.6M | 🟢 **-44%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 64.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 35.7M | ✅ | 24.8M | 🟢 **-31%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 32.1M | ✅ | 25.1M | 🟢 **-22%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.5M | ✅ | 25.2M | -15% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 30.0M | ✅ | 25.4M | -16% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.8M | ✅ | 24.2M | -19% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 28.2M | ✅ | 26.7M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 30.7M | ✅ | 25.2M | -18% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 30.0M | ✅ | 24.9M | -17% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 29.3M | ✅ | 29.2M | 0% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.6M | ✅ | 10.2M | 🟢 **-69%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.1M | ✅ | 12.8M | 🟢 **-25%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ✅ | 13.5M | -14% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 24.1M | -19% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.7M | ✅ | 17.3M | -8% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.8M | ✅ | 17.4M | -3% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 11.2M | 🔴 **+42%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ✅ | 7.2M | 🟢 **-36%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.1M | ✅ | 43.0M | 🟢 **-55%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.3M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 30.0M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 50.1M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 50.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 32.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 10.9M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 7.5M | +4% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.4M | ✅ | 37.7M | +7% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 139.7M | ✅ | 60.5M | 🟢 **-57%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 63.4M | ✅ | 54.9M | -13% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 150.8M | ✅ | 68.8M | 🟢 **-54%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 69.4M | ✅ | 63.3M | -9% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 53.1M | ✅ | 34.9M | 🟢 **-34%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.9M | ✅ | 39.5M | -6% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 103.9M | ✅ | 45.7M | 🟢 **-56%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.3M | ✅ | 66.4M | -9% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.0M | ✅ | 16.5M | 🟢 **-61%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.5M | ✅ | 16.6M | -19% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.6M | ✅ | 17.2M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.4M | ✅ | 17.1M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 139.7M | ✅ | 62.5M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.6M | ✅ | 26.6M | -7% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.0M | ✅ | 41.9M | 🟢 **-38%** |
| allOf.json | allOf | 4 | ✅ | 36.3M | ✅ | 35.8M | -1% |
| allOf.json | allOf with base schema | 5 | ✅ | 28.8M | ✅ | 26.9M | -7% |
| allOf.json | allOf simple types | 2 | ✅ | 67.7M | ✅ | 49.8M | 🟢 **-26%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 139.7M | ✅ | 71.4M | 🟢 **-49%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 59.5M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 88.1M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.3M | ✅ | 62.4M | -15% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 139.6M | ✅ | 73.9M | 🟢 **-47%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.7M | ✅ | 51.7M | 🟢 **-26%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 112.2M | ✅ | 42.0M | 🟢 **-63%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.0M | ✅ | 51.3M | 🟢 **-27%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 79.8M | ✅ | 22.8M | 🟢 **-71%** |
| anyOf.json | anyOf | 4 | ✅ | 70.3M | ✅ | 14.8M | 🟢 **-79%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 41.8M | ✅ | 17.2M | 🟢 **-59%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 79.6M | ✅ | 18.1M | 🟢 **-77%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 139.6M | ✅ | 18.1M | 🟢 **-87%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 59.6M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 67.0M | ✅ | 14.5M | 🟢 **-78%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 75.6M | ✅ | 15.6M | 🟢 **-79%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 112.3M | ✅ | 14.3M | 🟢 **-87%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 69.2M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 87.9M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 77.6M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 48.0M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 48.2M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 112.3M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 65.3M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 105.7M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 51.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 86.9M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 59.4M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 89.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 57.2M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 57.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 105.6M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 57.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 83.3M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 96.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 61.5M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 47.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 63.5M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 116.8M | ✅ | 49.8M | 🟢 **-57%** |
| default.json | invalid type for default | 2 | ✅ | 33.1M | ✅ | 58.6M | 🔴 **+77%** |
| default.json | invalid string value for default | 2 | ✅ | 36.2M | ✅ | 46.1M | 🔴 **+27%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.5M | ✅ | 44.6M | -10% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 57.6M | ✅ | 54.0M | -6% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 83.8M | ✅ | 64.0M | 🟢 **-24%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.7M | ✅ | 36.3M | +15% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 42.0M | ✅ | 37.5M | -11% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 52.1M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.8M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 19.2M | ✅ | 25.9M | 🔴 **+35%** |
| enum.json | simple enum validation | 2 | ✅ | 67.7M | ✅ | 39.6M | 🟢 **-42%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.9M | ✅ | 2.7M | 🟢 **-94%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ✅ | 17.0M | 🟢 **-75%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 21.3M | 🔴 **+52%** |
| enum.json | enum with escaped characters | 3 | ✅ | 32.3M | ✅ | 24.0M | 🟢 **-26%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 61.3M | ✅ | 33.0M | 🟢 **-46%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 30.8M | ✅ | 9.8M | 🟢 **-68%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 55.1M | ✅ | 32.8M | 🟢 **-40%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 56.5M | ✅ | 10.2M | 🟢 **-82%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.6M | ✅ | 36.4M | 🟢 **-45%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 60.7M | ✅ | 9.8M | 🟢 **-84%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.8M | ✅ | 36.7M | 🟢 **-45%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 52.7M | ✅ | 10.1M | 🟢 **-81%** |
| enum.json | nul characters in strings | 2 | ✅ | 59.2M | ✅ | 27.0M | 🟢 **-54%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 57.6M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 57.1M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 73.6M | ✅ | 46.8M | 🟢 **-36%** |
| format.json | idn-email format | 6 | ✅ | 72.3M | ✅ | 71.0M | -2% |
| format.json | regex format | 6 | ✅ | 63.6M | ✅ | 71.7M | +13% |
| format.json | ipv4 format | 6 | ✅ | 71.1M | ✅ | 67.9M | -4% |
| format.json | ipv6 format | 6 | ✅ | 42.9M | ✅ | 68.6M | 🔴 **+60%** |
| format.json | idn-hostname format | 6 | ✅ | 69.6M | ✅ | 70.6M | +1% |
| format.json | hostname format | 6 | ✅ | 55.2M | ✅ | 67.9M | 🔴 **+23%** |
| format.json | date format | 6 | ✅ | 72.3M | ✅ | 69.6M | -4% |
| format.json | date-time format | 6 | ✅ | 72.8M | ✅ | 68.6M | -6% |
| format.json | time format | 6 | ✅ | 77.5M | ✅ | 71.0M | -8% |
| format.json | json-pointer format | 6 | ✅ | 79.4M | ✅ | 71.7M | -10% |
| format.json | relative-json-pointer format | 6 | ✅ | 73.1M | ✅ | 71.5M | -2% |
| format.json | iri format | 6 | ✅ | 73.0M | ✅ | 71.5M | -2% |
| format.json | iri-reference format | 6 | ✅ | 73.4M | ✅ | 71.2M | -3% |
| format.json | uri format | 6 | ✅ | 79.7M | ✅ | 68.2M | -14% |
| format.json | uri-reference format | 6 | ✅ | 73.2M | ✅ | 97.1M | 🔴 **+33%** |
| format.json | uri-template format | 6 | ✅ | 71.3M | ✅ | 96.8M | 🔴 **+36%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 82.8M | ✅ | 75.9M | -8% |
| if-then-else.json | ignore then without if | 2 | ✅ | 82.4M | ✅ | 75.3M | -9% |
| if-then-else.json | ignore else without if | 2 | ✅ | 75.3M | ✅ | 76.1M | +1% |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 59.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 64.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 75.2M | ✅ | 60.2M | -20% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 67.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.4M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.9M | ✅ | 28.4M | 🟢 **-25%** |
| items.json | a schema given for items | 4 | ✅ | 50.7M | ✅ | 49.1M | -3% |
| items.json | an array of schemas for items | 6 | ✅ | 59.5M | ✅ | 54.8M | -8% |
| items.json | items with boolean schema (true) | 2 | ✅ | 82.3M | ✅ | 70.8M | -14% |
| items.json | items with boolean schema (false) | 2 | ✅ | 63.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 57.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 11.4M | ✅ | 23.3M | 🔴 **+105%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 8.9M | 🟢 **-26%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 70.2M | ✅ | 61.9M | -12% |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 82.2M | +12% |
| maxItems.json | maxItems validation | 4 | ✅ | 70.1M | ✅ | 53.1M | 🟢 **-24%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 65.8M | ✅ | 42.9M | 🟢 **-35%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.0M | ✅ | 46.2M | -16% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 52.5M | ✅ | 40.4M | 🟢 **-23%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.1M | ✅ | 45.7M | -14% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 37.9M | ✅ | 34.6M | -9% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.4M | ✅ | 34.9M | 🟢 **-28%** |
| maximum.json | maximum validation | 4 | ✅ | 68.6M | ✅ | 54.9M | 🟢 **-20%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 69.3M | ✅ | 54.5M | 🟢 **-21%** |
| minItems.json | minItems validation | 4 | ✅ | 67.7M | ✅ | 53.5M | 🟢 **-21%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 65.7M | ✅ | 42.7M | 🟢 **-35%** |
| minLength.json | minLength validation | 5 | ✅ | 54.2M | ✅ | 43.3M | 🟢 **-20%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.1M | ✅ | 40.8M | 🟢 **-22%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.3M | ✅ | 45.7M | -17% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.0M | ✅ | 32.5M | 🟢 **-32%** |
| minimum.json | minimum validation | 4 | ✅ | 69.4M | ✅ | 54.1M | 🟢 **-22%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.5M | ✅ | 54.1M | -17% |
| multipleOf.json | by int | 3 | ✅ | 70.2M | ✅ | 53.4M | 🟢 **-24%** |
| multipleOf.json | by number | 3 | ✅ | 68.6M | ✅ | 6.5M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 63.0M | ✅ | 4.0M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.4M | ✅ | 4.3M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.7M | ❌ | - | - |
| not.json | not | 2 | ✅ | 68.9M | ✅ | 16.7M | 🟢 **-76%** |
| not.json | not multiple types | 3 | ✅ | 64.2M | ✅ | 23.1M | 🟢 **-64%** |
| not.json | not more complex schema | 3 | ✅ | 61.3M | ✅ | 16.9M | 🟢 **-72%** |
| not.json | forbidden property | 2 | ✅ | 49.9M | ✅ | 45.6M | -9% |
| not.json | forbid everything with empty schema | 9 | ✅ | 55.8M | ✅ | 35.8M | 🟢 **-36%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 56.2M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 78.7M | ✅ | 62.2M | 🟢 **-21%** |
| not.json | double negation | 1 | ✅ | 79.8M | ✅ | 14.2M | 🟢 **-82%** |
| oneOf.json | oneOf | 4 | ✅ | 71.0M | ✅ | 16.6M | 🟢 **-77%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.0M | ✅ | 16.9M | 🟢 **-46%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 59.0M | ✅ | 42.4M | 🟢 **-28%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 79.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 59.2M | ✅ | 37.9M | 🟢 **-36%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 59.3M | ✅ | 41.7M | 🟢 **-30%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.1M | ✅ | 17.6M | 🟢 **-55%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 68.0M | ✅ | 18.5M | 🟢 **-73%** |
| oneOf.json | oneOf with required | 4 | ✅ | 42.8M | ✅ | 17.3M | 🟢 **-60%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ✅ | 16.2M | 🟢 **-63%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 68.5M | ✅ | 14.2M | 🟢 **-79%** |
| pattern.json | pattern validation | 8 | ✅ | 51.4M | ✅ | 46.7M | -9% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.7M | ✅ | 28.3M | +14% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.3M | ✅ | 18.5M | 🟢 **-27%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.2M | ✅ | 8.2M | 🟢 **-38%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.6M | ✅ | 13.3M | -14% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 17.2M | -2% |
| properties.json | object properties validation | 6 | ✅ | 50.1M | ✅ | 46.5M | -7% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.9M | ✅ | 8.0M | 🟢 **-55%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 47.3M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.1M | ✅ | 47.3M | 🟢 **-26%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 82.5M | ✅ | 52.0M | 🟢 **-37%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.5M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.8M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ✅ | 16.7M | 🟢 **-33%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.1M | ✅ | 44.4M | -8% |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.4M | ✅ | 44.5M | -17% |
| ref.json | escaped pointer ref | 6 | ✅ | 42.3M | ✅ | 39.8M | -6% |
| ref.json | nested refs | 2 | ✅ | 37.2M | ✅ | 51.2M | 🔴 **+38%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 47.5M | ✅ | 47.5M | 0% |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 47.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 22.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.2M | ✅ | 45.8M | -5% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.1M | ✅ | 44.9M | -7% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 79.7M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 59.5M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 50.2M | ✅ | 45.6M | -9% |
| ref.json | Location-independent identifier | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 47.5M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 45.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.0M | ✅ | 6.0M | 🟢 **-89%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 49.8M | ✅ | 45.4M | -9% |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.1M | ✅ | 44.6M | -7% |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.0M | ✅ | 44.1M | -6% |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.3M | ✅ | 45.2M | 0% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.3M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.7M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 68.7M | ✅ | 50.5M | 🟢 **-26%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.0M | ✅ | 50.4M | 🟢 **-27%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 63.1M | ✅ | 51.2M | -19% |
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
| required.json | required validation | 5 | ✅ | 58.0M | ✅ | 54.8M | -5% |
| required.json | required default validation | 1 | ✅ | 79.7M | ✅ | 62.4M | 🟢 **-22%** |
| required.json | required with empty array | 1 | ✅ | 79.7M | ✅ | 62.2M | 🟢 **-22%** |
| required.json | required with escaped characters | 2 | ✅ | 47.8M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 26.6M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 57.6M | ✅ | 38.0M | 🟢 **-34%** |
| type.json | number type matches numbers | 9 | ✅ | 59.4M | ✅ | 45.5M | 🟢 **-23%** |
| type.json | string type matches strings | 9 | ✅ | 59.4M | ✅ | 46.8M | 🟢 **-21%** |
| type.json | object type matches objects | 7 | ✅ | 50.5M | ✅ | 38.6M | 🟢 **-24%** |
| type.json | array type matches arrays | 7 | ✅ | 56.1M | ✅ | 36.2M | 🟢 **-35%** |
| type.json | boolean type matches booleans | 10 | ✅ | 57.4M | ✅ | 42.0M | 🟢 **-27%** |
| type.json | null type matches only the null object | 10 | ✅ | 57.0M | ✅ | 34.9M | 🟢 **-39%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.6M | ✅ | 39.0M | 🟢 **-32%** |
| type.json | type as array with one item | 2 | ✅ | 68.4M | ✅ | 50.4M | 🟢 **-26%** |
| type.json | type: array or object | 5 | ✅ | 57.9M | ✅ | 42.9M | 🟢 **-26%** |
| type.json | type: array, object or null | 5 | ✅ | 61.6M | ✅ | 47.5M | 🟢 **-23%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 2.0M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ✅ | 6.1M | 🟢 **-81%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.9M | ✅ | 6.0M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 79.1M | ✅ | 65.7M | -17% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 65.6M | ✅ | 60.5M | -8% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.0M | ✅ | 51.2M | -16% |
| optional/bignum.json | integer | 2 | ✅ | 78.3M | ✅ | 13.1M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 80.4M | ✅ | 96.7M | 🔴 **+20%** |
| optional/bignum.json | string | 1 | ✅ | 57.4M | ✅ | 41.2M | 🟢 **-28%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.8M | ✅ | 67.6M | -6% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.7M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 48.6M | 🟢 **-34%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.7M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 343K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 23.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.4M | ✅ | 17.5M | 🟢 **-36%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.5M | ✅ | 25.2M | -12% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 24.4M | -4% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 25.0M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.3M | ✅ | 18.6M | 🟢 **-34%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.0M | ✅ | 25.5M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.3M | ✅ | 25.2M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.0M | ✅ | 24.8M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.9M | ✅ | 29.2M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.8M | ✅ | 10.2M | 🟢 **-65%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.0M | ✅ | 12.8M | 🟢 **-25%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.2M | ✅ | 13.2M | -7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ✅ | 24.0M | -9% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ✅ | 15.6M | -19% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.6M | ✅ | 17.7M | -5% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.9M | ✅ | 11.0M | 🔴 **+23%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.9M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 4.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.5M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 65.3M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 7.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 76.7M | ✅ | 44.6M | 🟢 **-42%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.7M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 56.0M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 56.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.1M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 6.5M | -12% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 33.2M | ✅ | 37.9M | +14% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.6M | ✅ | 62.0M | 🟢 **-59%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 64.9M | ✅ | 55.9M | -14% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.0M | ✅ | 71.6M | 🟢 **-56%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 70.1M | ✅ | 64.2M | -8% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.0M | ✅ | 35.7M | 🟢 **-36%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.3M | ✅ | 41.7M | +12% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 47.9M | 🟢 **-56%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 70.0M | ✅ | 68.7M | -2% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.4M | ✅ | 14.2M | 🟢 **-69%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.3M | ✅ | 17.7M | -17% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.8M | ✅ | 17.3M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.8M | ✅ | 31.3M | -7% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.9M | ✅ | 63.2M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.7M | ✅ | 26.8M | -3% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 58.5M | ✅ | 42.7M | 🟢 **-27%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.6M | ✅ | 19.7M | -20% |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.6M | ✅ | 19.1M | 🟢 **-40%** |
| allOf.json | allOf | 4 | ✅ | 37.4M | ✅ | 32.6M | -13% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ✅ | 27.2M | -12% |
| allOf.json | allOf simple types | 2 | ✅ | 63.2M | ✅ | 52.4M | -17% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.0M | ✅ | 74.2M | 🟢 **-52%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 58.2M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 76.7M | ✅ | 62.2M | -19% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 136.8M | ✅ | 74.1M | 🟢 **-46%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.8M | ✅ | 52.7M | 🟢 **-21%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 52.9M | 🟢 **-55%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.9M | ✅ | 51.1M | 🟢 **-25%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 23.7M | 🟢 **-72%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 66.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 45.5M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 66.6M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 68.8M | ✅ | 15.2M | 🟢 **-78%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 37.0M | ✅ | 18.0M | 🟢 **-52%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 76.8M | ✅ | 17.8M | 🟢 **-77%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 76.8M | ✅ | 17.8M | 🟢 **-77%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 58.2M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 46.0M | ✅ | 14.7M | 🟢 **-68%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 72.0M | ✅ | 15.1M | 🟢 **-79%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 13.2M | 🟢 **-80%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 75.0M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 52.0M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 57.6M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 37.5M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 50.9M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 68.0M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 32.5M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 62.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 57.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 56.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 53.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 56.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 31.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 32.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 57.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 44.9M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 55.5M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 54.6M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.5M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 38.6M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 60.8M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 67.4M | ✅ | 51.1M | 🟢 **-24%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 79.9M | ✅ | 76.6M | -4% |
| content.json | validation of binary string-encoding | 3 | ✅ | 79.1M | ✅ | 76.2M | -4% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 70.1M | ✅ | 74.4M | +6% |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 66.8M | ✅ | 72.6M | +9% |
| default.json | invalid type for default | 2 | ✅ | 59.6M | ✅ | 61.6M | +3% |
| default.json | invalid string value for default | 2 | ✅ | 49.8M | ✅ | 48.5M | -2% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 39.3M | ✅ | 44.5M | +13% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 56.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 68.1M | ✅ | 61.3M | -10% |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.5M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.5M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 49.9M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 48.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 37.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 36.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.9M | ✅ | 31.3M | 🟢 **-59%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.9M | ✅ | 2.7M | 🟢 **-94%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.7M | ✅ | 16.8M | 🟢 **-73%** |
| enum.json | enums in properties | 6 | ✅ | 14.6M | ✅ | 20.3M | 🔴 **+39%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.0M | ✅ | 24.4M | 🟢 **-59%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 62.4M | ✅ | 33.1M | 🟢 **-47%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.4M | ✅ | 10.0M | 🟢 **-82%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 62.9M | ✅ | 32.4M | 🟢 **-49%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 55.3M | ✅ | 10.0M | 🟢 **-82%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 61.3M | ✅ | 36.1M | 🟢 **-41%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.5M | ✅ | 11.0M | 🟢 **-81%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 32.3M | ✅ | 35.5M | +10% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.4M | ✅ | 11.0M | 🟢 **-81%** |
| enum.json | nul characters in strings | 2 | ✅ | 57.4M | ✅ | 27.2M | 🟢 **-53%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 62.6M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 57.2M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 74.3M | ✅ | 45.6M | 🟢 **-39%** |
| format.json | idn-email format | 6 | ✅ | 79.1M | ✅ | 71.7M | -9% |
| format.json | regex format | 6 | ✅ | 74.3M | ✅ | 71.6M | -4% |
| format.json | ipv4 format | 6 | ✅ | 66.6M | ✅ | 68.3M | +3% |
| format.json | ipv6 format | 6 | ✅ | 66.5M | ✅ | 68.6M | +3% |
| format.json | idn-hostname format | 6 | ✅ | 63.4M | ✅ | 71.7M | +13% |
| format.json | hostname format | 6 | ✅ | 66.5M | ✅ | 68.6M | +3% |
| format.json | date format | 6 | ✅ | 66.5M | ✅ | 63.3M | -5% |
| format.json | date-time format | 6 | ✅ | 66.5M | ✅ | 68.2M | +3% |
| format.json | time format | 6 | ✅ | 66.4M | ✅ | 71.2M | +7% |
| format.json | json-pointer format | 6 | ✅ | 66.4M | ✅ | 71.8M | +8% |
| format.json | relative-json-pointer format | 6 | ✅ | 66.5M | ✅ | 71.7M | +8% |
| format.json | iri format | 6 | ✅ | 66.5M | ✅ | 71.7M | +8% |
| format.json | iri-reference format | 6 | ✅ | 66.5M | ✅ | 71.9M | +8% |
| format.json | uri format | 6 | ✅ | 66.6M | ✅ | 68.7M | +3% |
| format.json | uri-reference format | 6 | ✅ | 66.5M | ✅ | 71.4M | +7% |
| format.json | uri-template format | 6 | ✅ | 66.7M | ✅ | 71.0M | +7% |
| format.json | uuid format | 6 | ✅ | 66.6M | ✅ | 72.0M | +8% |
| format.json | duration format | 6 | ✅ | 66.6M | ✅ | 71.8M | +8% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 72.3M | ✅ | 76.1M | +5% |
| if-then-else.json | ignore then without if | 2 | ✅ | 72.3M | ✅ | 76.1M | +5% |
| if-then-else.json | ignore else without if | 2 | ✅ | 72.3M | ✅ | 76.4M | +6% |
| if-then-else.json | if and then without else | 3 | ✅ | 66.5M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 66.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 63.0M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 72.2M | ✅ | 62.3M | -14% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 66.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 63.6M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 40.9M | ✅ | 28.9M | 🟢 **-29%** |
| items.json | a schema given for items | 4 | ✅ | 48.3M | ✅ | 49.1M | +2% |
| items.json | an array of schemas for items | 6 | ✅ | 60.6M | ✅ | 54.4M | -10% |
| items.json | items with boolean schema (true) | 2 | ✅ | 65.6M | ✅ | 71.2M | +9% |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.9M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 57.6M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.8M | ✅ | 22.5M | 🔴 **+77%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 9.0M | 🟢 **-26%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 65.9M | ✅ | 62.1M | -6% |
| items.json | array-form items with null instance e... | 1 | ✅ | 70.2M | ✅ | 64.5M | -8% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 78.8M | ✅ | 39.0M | 🟢 **-50%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 61.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 58.7M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 53.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 68.2M | ✅ | 40.1M | 🟢 **-41%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 43.1M | 🟢 **-32%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.1M | ✅ | 46.0M | -13% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.1M | ✅ | 40.5M | 🟢 **-21%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.4M | ✅ | 45.7M | -13% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 45.7M | ✅ | 33.4M | 🟢 **-27%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.8M | ✅ | 33.5M | 🟢 **-22%** |
| maximum.json | maximum validation | 4 | ✅ | 66.9M | ✅ | 52.8M | 🟢 **-21%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ✅ | 54.3M | -18% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 79.1M | ✅ | 74.8M | -6% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 59.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.6M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.8M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 53.0M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 49.2M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 79.1M | ✅ | 38.3M | 🟢 **-52%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 61.2M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 68.1M | ✅ | 38.7M | 🟢 **-43%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 46.5M | 🟢 **-27%** |
| minLength.json | minLength validation | 5 | ✅ | 52.0M | ✅ | 43.2M | -17% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 51.2M | ✅ | 37.1M | 🟢 **-28%** |
| minProperties.json | minProperties validation | 6 | ✅ | 53.4M | ✅ | 46.7M | -12% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 46.2M | ✅ | 34.1M | 🟢 **-26%** |
| minimum.json | minimum validation | 4 | ✅ | 66.9M | ✅ | 49.8M | 🟢 **-26%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.1M | ✅ | 54.0M | -14% |
| multipleOf.json | by int | 3 | ✅ | 67.4M | ✅ | 51.7M | 🟢 **-23%** |
| multipleOf.json | by number | 3 | ✅ | 64.3M | ✅ | 6.3M | 🟢 **-90%** |
| multipleOf.json | by small number | 2 | ✅ | 59.1M | ✅ | 4.0M | 🟢 **-93%** |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 4.1M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 66.9M | ✅ | 16.6M | 🟢 **-75%** |
| not.json | not multiple types | 3 | ✅ | 62.0M | ✅ | 22.8M | 🟢 **-63%** |
| not.json | not more complex schema | 3 | ✅ | 60.0M | ✅ | 16.9M | 🟢 **-72%** |
| not.json | forbidden property | 2 | ✅ | 47.2M | ✅ | 38.6M | -18% |
| not.json | forbid everything with empty schema | 9 | ✅ | 52.0M | ✅ | 36.3M | 🟢 **-30%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 55.2M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 75.7M | ✅ | 58.0M | 🟢 **-23%** |
| not.json | double negation | 1 | ✅ | 76.8M | ✅ | 13.9M | 🟢 **-82%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.7M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 59.5M | ✅ | 15.0M | 🟢 **-75%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.8M | ✅ | 17.1M | 🟢 **-51%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 57.9M | ✅ | 42.2M | 🟢 **-27%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 76.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 58.3M | ✅ | 39.4M | 🟢 **-32%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 58.3M | ✅ | 42.2M | 🟢 **-28%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.0M | ✅ | 17.8M | 🟢 **-57%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 66.0M | ✅ | 20.1M | 🟢 **-70%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.0M | ✅ | 16.7M | 🟢 **-62%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.2M | ✅ | 16.4M | 🟢 **-64%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.3M | ✅ | 14.5M | 🟢 **-78%** |
| pattern.json | pattern validation | 8 | ✅ | 50.8M | ✅ | 46.6M | -8% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.1M | ✅ | 29.1M | 🔴 **+21%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ✅ | 13.2M | 🟢 **-49%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 6.6M | 🟢 **-56%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.0M | ✅ | 13.8M | -14% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.2M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 17.2M | -2% |
| properties.json | object properties validation | 6 | ✅ | 50.5M | ✅ | 46.3M | -8% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ✅ | 13.5M | 🟢 **-30%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 45.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.0M | ✅ | 46.1M | 🟢 **-26%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 79.1M | ✅ | 50.5M | 🟢 **-36%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.7M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.4M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 7.6M | 🔴 **+146%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 11.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.0M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 3.9M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ✅ | 16.6M | 🟢 **-31%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.5M | ✅ | 44.2M | -7% |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.6M | ✅ | 44.9M | -15% |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ✅ | 40.4M | -6% |
| ref.json | nested refs | 2 | ✅ | 37.0M | ✅ | 51.5M | 🔴 **+39%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.3M | ✅ | 34.7M | 🟢 **-27%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.6M | ✅ | 46.0M | -5% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 76.8M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 58.2M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 47.5M | ✅ | 26.0M | 🟢 **-45%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.3M | ✅ | 5.9M | 🟢 **-88%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.1M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 45.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 64.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 34.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.1M | ✅ | 45.9M | -3% |
| ref.json | URN base URI with NSS | 2 | ✅ | 47.0M | ✅ | 45.0M | -4% |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.6M | ✅ | 46.2M | +4% |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.3M | ✅ | 46.1M | +4% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.6M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.2M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 44.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.2M | ✅ | 52.3M | 🟢 **-21%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 52.9M | 🟢 **-21%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 60.5M | ✅ | 50.8M | -16% |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.6M | ❌ | - | - |
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
| required.json | required validation | 5 | ✅ | 57.6M | ✅ | 54.3M | -6% |
| required.json | required default validation | 1 | ✅ | 76.8M | ✅ | 63.3M | -18% |
| required.json | required with empty array | 1 | ✅ | 76.4M | ✅ | 62.9M | -18% |
| required.json | required with escaped characters | 2 | ✅ | 46.6M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 26.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 53.8M | ✅ | 38.7M | 🟢 **-28%** |
| type.json | number type matches numbers | 9 | ✅ | 59.7M | ✅ | 46.7M | 🟢 **-22%** |
| type.json | string type matches strings | 9 | ✅ | 59.3M | ✅ | 46.7M | 🟢 **-21%** |
| type.json | object type matches objects | 7 | ✅ | 52.8M | ✅ | 39.1M | 🟢 **-26%** |
| type.json | array type matches arrays | 7 | ✅ | 55.3M | ✅ | 39.7M | 🟢 **-28%** |
| type.json | boolean type matches booleans | 10 | ✅ | 58.1M | ✅ | 42.0M | 🟢 **-28%** |
| type.json | null type matches only the null object | 10 | ✅ | 54.2M | ✅ | 39.4M | 🟢 **-27%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.0M | ✅ | 41.1M | 🟢 **-28%** |
| type.json | type as array with one item | 2 | ✅ | 66.7M | ✅ | 50.9M | 🟢 **-24%** |
| type.json | type: array or object | 5 | ✅ | 58.0M | ✅ | 43.8M | 🟢 **-25%** |
| type.json | type: array, object or null | 5 | ✅ | 61.9M | ✅ | 48.3M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 71.3M | ✅ | 75.9M | +6% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 46.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 62.1M | ✅ | 43.7M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 48.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 68.7M | ✅ | 47.5M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 41.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 38.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 70.6M | ✅ | 47.4M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.3M | ✅ | 66.9M | 🔴 **+230%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 37.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 51.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 45.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 64.0M | ✅ | 38.9M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 66.1M | ✅ | 74.4M | +13% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 39.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.1M | ✅ | 46.7M | -10% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 32.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 61.2M | ✅ | 44.9M | 🟢 **-27%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 61.2M | ✅ | 44.2M | 🟢 **-28%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.1M | ✅ | 60.1M | 🔴 **+100%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 27.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 29.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.7M | ✅ | 42.6M | 🔴 **+35%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.1M | ✅ | 58.4M | 🔴 **+108%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.2M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.4M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 42.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ✅ | 10.4M | 🟢 **-46%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 66.5M | ✅ | 45.7M | 🟢 **-31%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 47.7M | ✅ | 74.5M | 🔴 **+56%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 12.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 6.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ✅ | 2.0M | 🟢 **-89%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.1M | ✅ | 6.4M | 🟢 **-79%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 10.4M | 🟢 **-43%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 74.2M | ✅ | 84.8M | +14% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.5M | ✅ | 60.6M | -5% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.3M | ✅ | 52.0M | -12% |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 46.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 67.0M | ✅ | 36.7M | 🟢 **-45%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 53.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 74.9M | ✅ | 13.1M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 75.9M | ✅ | 73.6M | -3% |
| optional/bignum.json | string | 1 | ✅ | 56.5M | ✅ | 41.9M | 🟢 **-26%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 68.4M | -1% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 48.3M | 🟢 **-30%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 53.9M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.2M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 63.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 57.1M | ✅ | 41.5M | 🟢 **-27%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 80.0M | ✅ | 67.7M | -15% |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.1M | ✅ | 37.2M | +16% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 44.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 49.5M | ✅ | 46.7M | -6% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 54.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 38.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.7M | ✅ | 21.8M | 🟢 **-21%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.5M | ✅ | 25.3M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ✅ | 24.8M | -7% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 25.3M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.1M | ✅ | 24.5M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.2M | ✅ | 24.9M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.9M | ✅ | 25.4M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.6M | ✅ | 22.7M | -15% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 29.6M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.7M | ✅ | 10.5M | 🟢 **-63%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.7M | ✅ | 12.7M | -13% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 13.7M | -7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.4M | ✅ | 24.3M | -8% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.5M | ✅ | 14.6M | 🟢 **-26%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.3M | ✅ | 17.7M | -8% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 11.3M | 🔴 **+43%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.3M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 39.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 40.7M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.9M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.7M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.8M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 38.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 75.4M | ✅ | 43.3M | 🟢 **-43%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 32.3M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 55.0M | ✅ | 35.8M | 🟢 **-35%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 47.6M | ✅ | 35.6M | 🟢 **-25%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 47.6M | ✅ | 45.0M | -5% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 47.5M | ✅ | 44.2M | -7% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 63.1M | ✅ | 51.2M | -19% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.6M | ✅ | 44.2M | -11% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.1M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 35.9M | ✅ | 21.7M | 🟢 **-39%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.3M | ✅ | 17.5M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 17.0M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.3M | ✅ | 28.8M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 153.1M | ✅ | 61.2M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.8M | ✅ | 24.9M | -17% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 39.9M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.2M | ✅ | 19.2M | 🟢 **-24%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.3M | ✅ | 18.3M | 🟢 **-42%** |
| allOf.json | allOf | 4 | ✅ | 39.8M | ✅ | 34.0M | -15% |
| allOf.json | allOf with base schema | 5 | ✅ | 29.3M | ✅ | 25.2M | -14% |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 48.5M | 🟢 **-33%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ✅ | 71.0M | 🟢 **-53%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 61.3M | 🟢 **-24%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 71.5M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 49.3M | 🟢 **-36%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 48.4M | 🟢 **-59%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 62.1M | ✅ | 47.8M | 🟢 **-23%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.5M | ✅ | 21.5M | 🟢 **-74%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 51.0M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 79.7M | ✅ | 14.5M | 🟢 **-82%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 40.0M | ✅ | 17.5M | 🟢 **-56%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 16.7M | 🟢 **-81%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 89.7M | ✅ | 16.8M | 🟢 **-81%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.5M | ✅ | 13.5M | 🟢 **-73%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 14.6M | 🟢 **-83%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 13.4M | 🟢 **-83%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 64.6M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.4M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 41.2M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 57.8M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 78.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 76.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 76.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.6M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 67.4M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.7M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.1M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 50.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.5M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 70.1M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 42.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.8M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 47.7M | 🟢 **-38%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 96.0M | ✅ | 74.3M | 🟢 **-23%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 78.9M | ✅ | 74.1M | -6% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 83.4M | ✅ | 65.7M | 🟢 **-21%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 77.5M | ✅ | 69.0M | -11% |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 58.0M | -19% |
| default.json | invalid string value for default | 2 | ✅ | 54.9M | ✅ | 48.1M | -12% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 56.1M | ✅ | 42.0M | 🟢 **-25%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 64.6M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 61.2M | 🟢 **-36%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.0M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.0M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 54.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.6M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.0M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 8.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.5M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 12.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.5M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.5M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.4M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 33.7M | 🟢 **-55%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.1M | ✅ | 2.8M | 🟢 **-94%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.6M | ✅ | 18.0M | 🟢 **-73%** |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 20.1M | 🔴 **+35%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ✅ | 24.6M | 🟢 **-69%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.9M | ✅ | 28.4M | 🟢 **-63%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.3M | ✅ | 10.5M | 🟢 **-84%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.8M | ✅ | 30.7M | 🟢 **-60%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.2M | ✅ | 11.5M | 🟢 **-83%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 32.8M | 🟢 **-56%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 11.1M | 🟢 **-84%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 72.8M | ✅ | 35.5M | 🟢 **-51%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.9M | ✅ | 11.5M | 🟢 **-82%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 26.6M | 🟢 **-59%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 64.3M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 95.9M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 92.4M | ✅ | 44.8M | 🟢 **-52%** |
| format.json | regex format | 7 | ✅ | 78.2M | ✅ | 69.2M | -12% |
| format.json | ipv4 format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 78.7M | ✅ | 42.8M | 🟢 **-46%** |
| format.json | hostname format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 78.4M | ✅ | 40.2M | 🟢 **-49%** |
| format.json | date-time format | 7 | ✅ | 77.8M | ✅ | 34.9M | 🟢 **-55%** |
| format.json | time format | 7 | ✅ | 78.5M | ✅ | 69.1M | -12% |
| format.json | json-pointer format | 7 | ✅ | 95.5M | ✅ | 69.3M | 🟢 **-27%** |
| format.json | relative-json-pointer format | 7 | ✅ | 78.5M | ✅ | 68.8M | -12% |
| format.json | iri format | 7 | ✅ | 78.5M | ✅ | 69.4M | -12% |
| format.json | iri-reference format | 7 | ✅ | 78.5M | ✅ | 69.0M | -12% |
| format.json | uri format | 7 | ✅ | 78.4M | ✅ | 42.2M | 🟢 **-46%** |
| format.json | uri-reference format | 7 | ✅ | 78.4M | ✅ | 69.2M | -12% |
| format.json | uri-template format | 7 | ✅ | 78.3M | ✅ | 69.4M | -11% |
| format.json | uuid format | 7 | ✅ | 78.4M | ✅ | 68.9M | -12% |
| format.json | duration format | 7 | ✅ | 78.4M | ✅ | 68.0M | -13% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.2M | ✅ | 73.7M | -12% |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.8M | ✅ | 73.3M | 🟢 **-22%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.2M | ✅ | 73.9M | -12% |
| if-then-else.json | if and then without else | 3 | ✅ | 77.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.6M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 62.0M | 🟢 **-26%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.5M | ✅ | 26.1M | 🟢 **-41%** |
| items.json | a schema given for items | 4 | ✅ | 54.4M | ✅ | 46.2M | -15% |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 66.0M | 🟢 **-30%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 72.0M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.7M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 8.6M | 🟢 **-29%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 43.1M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.5M | ✅ | 31.0M | 🟢 **-33%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.8M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 74.9M | ✅ | 45.1M | 🟢 **-40%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 74.3M | 🟢 **-21%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.6M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 80.3M | ✅ | 37.6M | 🟢 **-53%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 46.3M | 🟢 **-36%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.4M | ✅ | 41.3M | 🟢 **-29%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 39.9M | 🟢 **-30%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 43.2M | 🟢 **-26%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.4M | ✅ | 30.6M | 🟢 **-39%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ✅ | 33.5M | 🟢 **-35%** |
| maximum.json | maximum validation | 4 | ✅ | 76.5M | ✅ | 52.0M | 🟢 **-32%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 74.1M | ✅ | 52.1M | 🟢 **-30%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 74.4M | 🟢 **-21%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.8M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 57.5M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 93.9M | ✅ | 63.2M | 🟢 **-33%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 67.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 78.9M | ✅ | 37.5M | 🟢 **-53%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 45.5M | 🟢 **-37%** |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 36.6M | 🟢 **-37%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.2M | ✅ | 37.4M | 🟢 **-33%** |
| minProperties.json | minProperties validation | 6 | ✅ | 56.6M | ✅ | 43.2M | 🟢 **-24%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 51.0M | ✅ | 21.5M | 🟢 **-58%** |
| minimum.json | minimum validation | 4 | ✅ | 78.6M | ✅ | 51.5M | 🟢 **-34%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.2M | ✅ | 51.3M | 🟢 **-28%** |
| multipleOf.json | by int | 3 | ✅ | 77.7M | ✅ | 48.4M | 🟢 **-38%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 6.7M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 4.5M | 🟢 **-93%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 4.5M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 16.0M | 🟢 **-79%** |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 21.6M | 🟢 **-70%** |
| not.json | not more complex schema | 3 | ✅ | 69.1M | ✅ | 15.8M | 🟢 **-77%** |
| not.json | forbidden property | 2 | ✅ | 53.9M | ✅ | 43.5M | -19% |
| not.json | forbid everything with empty schema | 9 | ✅ | 65.2M | ✅ | 36.3M | 🟢 **-44%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 64.1M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.0M | ✅ | 59.1M | 🟢 **-34%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 13.5M | 🟢 **-85%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.0M | ✅ | 14.0M | 🟢 **-79%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.4M | ✅ | 17.9M | 🟢 **-48%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 37.0M | 🟢 **-44%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 37.5M | 🟢 **-43%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 40.2M | 🟢 **-39%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.8M | ✅ | 16.8M | 🟢 **-63%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 19.2M | 🟢 **-75%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.5M | ✅ | 16.1M | 🟢 **-67%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.5M | ✅ | 15.4M | 🟢 **-69%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 13.4M | 🟢 **-82%** |
| pattern.json | pattern validation | 8 | ✅ | 55.6M | ✅ | 41.3M | 🟢 **-26%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.1M | ✅ | 27.5M | 🔴 **+94%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 18.8M | 🟢 **-26%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 9.2M | 🟢 **-38%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.0M | ✅ | 13.7M | -8% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.3M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ✅ | 8.8M | 🟢 **-51%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.3M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.4M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 63.0M | 🟢 **-22%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 70.2M | -13% |
| properties.json | object properties validation | 6 | ✅ | 56.5M | ✅ | 43.1M | 🟢 **-24%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 13.5M | 🟢 **-32%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 52.6M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 45.0M | 🟢 **-36%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 41.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 46.9M | 🟢 **-50%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.3M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.6M | ✅ | 15.3M | 🟢 **-38%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.1M | ✅ | 42.3M | 🟢 **-23%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.8M | ✅ | 30.1M | 🟢 **-36%** |
| ref.json | nested refs | 2 | ✅ | 38.4M | ✅ | 43.1M | +12% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.2M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.2M | ✅ | 31.0M | 🟢 **-41%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.4M | ✅ | 42.6M | -19% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.0M | ✅ | 43.1M | 🟢 **-20%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 6.1M | 🟢 **-89%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.0M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.0M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 41.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.0M | ✅ | 42.0M | -19% |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.4M | ✅ | 41.8M | 🟢 **-22%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.5M | ✅ | 41.9M | -15% |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.8M | ✅ | 42.5M | -16% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 50.2M | 🟢 **-35%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 50.7M | 🟢 **-34%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 48.7M | 🟢 **-31%** |
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
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 49.8M | 🟢 **-23%** |
| required.json | required default validation | 1 | ✅ | 89.9M | ✅ | 61.3M | 🟢 **-32%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 61.3M | 🟢 **-32%** |
| required.json | required with escaped characters | 2 | ✅ | 54.2M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 26.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.4M | ✅ | 40.1M | 🟢 **-40%** |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 45.2M | 🟢 **-35%** |
| type.json | string type matches strings | 9 | ✅ | 69.2M | ✅ | 44.2M | 🟢 **-36%** |
| type.json | object type matches objects | 7 | ✅ | 59.1M | ✅ | 35.8M | 🟢 **-39%** |
| type.json | array type matches arrays | 7 | ✅ | 64.7M | ✅ | 38.2M | 🟢 **-41%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 41.2M | 🟢 **-38%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.1M | ✅ | 37.8M | 🟢 **-43%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.5M | ✅ | 39.7M | 🟢 **-40%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 47.9M | 🟢 **-38%** |
| type.json | type: array or object | 5 | ✅ | 70.8M | ✅ | 41.1M | 🟢 **-42%** |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 35.7M | 🟢 **-54%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 73.5M | -11% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 42.8M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 48.3M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.8M | ✅ | 41.2M | -10% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.9M | ✅ | 48.1M | 🟢 **-41%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.4M | ✅ | 74.2M | 🔴 **+264%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 52.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 51.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 46.4M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.5M | ✅ | 45.0M | 🟢 **-51%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 71.6M | -5% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.3M | ✅ | 74.1M | 🔴 **+27%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 93.8M | ✅ | 45.5M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.7M | ✅ | 19.4M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 68.9M | ✅ | 42.7M | 🟢 **-38%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 59.2M | 🔴 **+108%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 13.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.8M | ✅ | 43.7M | 🔴 **+47%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 58.9M | 🔴 **+107%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 48.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.1M | ✅ | 9.9M | 🟢 **-51%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.5M | ✅ | 44.6M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 71.2M | 🔴 **+36%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.9M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ✅ | 2.1M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.9M | ✅ | 6.6M | 🟢 **-79%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ✅ | 56.6M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.0M | ✅ | 60.8M | -15% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.2M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.2M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 45.7M | 🟢 **-41%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 14.6M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 68.7M | 🟢 **-23%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 39.8M | 🟢 **-37%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 62.8M | 🟢 **-20%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 47.3M | 🟢 **-40%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ✅ | 39.1M | 🟢 **-40%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 61.6M | 🟢 **-36%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.5M | ✅ | 34.7M | +1% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.8M | ✅ | 43.9M | 🟢 **-21%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.2M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.1M | ✅ | 20.2M | 🟢 **-31%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.6M | ✅ | 22.5M | 🟢 **-21%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 22.6M | 🟢 **-20%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 22.4M | 🟢 **-21%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 22.0M | 🟢 **-23%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 23.6M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.6M | ✅ | 22.8M | 🟢 **-20%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.2M | ✅ | 22.4M | 🟢 **-21%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 35.1M | ✅ | 25.4M | 🟢 **-28%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.4M | ✅ | 10.2M | 🟢 **-67%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.3M | ✅ | 12.5M | -18% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.0M | ✅ | 13.3M | -11% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.4M | ✅ | 21.9M | 🟢 **-23%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 14.1M | 🟢 **-30%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.4M | ✅ | 17.2M | -11% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 11.8M | 🔴 **+49%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.9M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.5M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.9M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.3M | ✅ | 41.7M | 🟢 **-56%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.6M | ✅ | 18.9M | 🟢 **-26%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.7M | ✅ | 20.9M | +12% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 65.8M | ✅ | 44.1M | 🟢 **-33%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 55.2M | ✅ | 32.1M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 55.0M | ✅ | 42.5M | 🟢 **-23%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.6M | ✅ | 42.3M | 🟢 **-22%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 50.1M | 🟢 **-35%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.8M | ✅ | 42.5M | 🟢 **-22%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.4M | ❌ | - | - |
