# tjs vs is-my-json-valid Benchmarks

Performance comparison of **tjs** vs **[is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | is-my-json-valid pass | is-my-json-valid ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 27.3M | 163/199 | 15.3M | 163 | 🟢 **-44%** |
| draft6 | 276 | ✅ 276 | 29.3M | 182/276 | 15.6M | 182 | 🟢 **-47%** |
| draft7 | 313 | ✅ 313 | 15.7M | 193/313 | 18.6M | 193 | +18% |
| draft2019-09 | 435 | ✅ 435 | 18.7M | 231/435 | 19.9M | 231 | +6% |
| draft2020-12 | 448 | ✅ 448 | 19.1M | 219/448 | 20.0M | 219 | +5% |
| **Total** | 1671 | 1670/1671 | 19.9M | 988/1671 | 17.8M | 988 | -10% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.41x faster** (23 ns vs 56 ns per test, 3702 tests in 988 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 8.4M | +16% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 90.0M | ✅ | 55.0M | 🟢 **-39%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.6M | ✅ | 38.3M | 🟢 **-74%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 93.4M | ✅ | 78.8M | -16% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.5M | ✅ | 47.4M | 🟢 **-62%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.5M | ✅ | 19.7M | 🟢 **-58%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 59.5M | ✅ | 22.3M | 🟢 **-63%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.4M | ✅ | 45.6M | 🟢 **-37%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.0M | ✅ | 70.7M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 40.0M | ✅ | 16.8M | 🟢 **-58%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 23.1M | ✅ | 11.3M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.2M | ✅ | 26.9M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.7M | ✅ | 19.0M | 🟢 **-57%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 89.9M | ✅ | 88.6M | -1% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 34.0M | ✅ | 9.1M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.4M | ✅ | 50.6M | -4% |
| allOf.json | allOf | 4 | ✅ | 48.1M | ✅ | 19.3M | 🟢 **-60%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.6M | ✅ | 20.0M | 🟢 **-28%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 14.6M | 🟢 **-87%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 89.3M | ✅ | 112.7M | 🔴 **+26%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.7M | ✅ | 76.2M | 🟢 **-50%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 53.9M | 🟢 **-30%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 31.7M | 🟢 **-73%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 53.6M | 🟢 **-32%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 17.2M | 🟢 **-80%** |
| anyOf.json | anyOf | 4 | ✅ | 81.9M | ✅ | 57.5M | 🟢 **-30%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.9M | ✅ | 26.2M | 🟢 **-49%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 54.1M | ✅ | 47.0M | -13% |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 163.9M | ✅ | 74.7M | 🟢 **-54%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 33.0M | 🟢 **-58%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 97.7M | -9% |
| default.json | invalid string value for default | 2 | ✅ | 55.1M | ✅ | 67.6M | 🔴 **+23%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.6M | ✅ | 31.9M | 🟢 **-60%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.1M | ✅ | 44.5M | 🟢 **-51%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.6M | ✅ | 32.5M | -6% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 59.0M | ✅ | 22.6M | 🟢 **-62%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.8M | ✅ | 13.7M | 🟢 **-27%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 44.5M | ✅ | 35.2M | 🟢 **-21%** |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 31.8M | 🟢 **-58%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 975K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.5M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 33.2M | 🔴 **+129%** |
| enum.json | enum with escaped characters | 3 | ✅ | 59.3M | ✅ | 33.3M | 🟢 **-44%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.5M | ✅ | 26.7M | 🟢 **-76%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.5M | ✅ | 26.5M | 🟢 **-76%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.2M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 57.8M | ✅ | 34.5M | 🟢 **-40%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.6M | ✅ | 4.9M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 36.8M | 🟢 **-67%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 67.5M | ✅ | 4.9M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 81.9M | ✅ | 28.9M | 🟢 **-65%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 49.6M | ✅ | 46.5M | -6% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 29.0M | 🟢 **-69%** |
| format.json | email format | 6 | ✅ | 83.9M | ✅ | 113.4M | 🔴 **+35%** |
| format.json | ipv4 format | 6 | ✅ | 163.0M | ✅ | 70.7M | 🟢 **-57%** |
| format.json | ipv6 format | 6 | ✅ | 83.2M | ✅ | 69.6M | -16% |
| format.json | hostname format | 6 | ✅ | 162.8M | ✅ | 113.2M | 🟢 **-30%** |
| format.json | date-time format | 6 | ✅ | 89.3M | ✅ | 69.6M | 🟢 **-22%** |
| format.json | uri format | 6 | ✅ | 134.1M | ✅ | 70.8M | 🟢 **-47%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.8M | ✅ | 16.0M | 🟢 **-64%** |
| items.json | a schema given for items | 4 | ✅ | 73.3M | ✅ | 31.0M | 🟢 **-58%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.7M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.8M | ✅ | 6.7M | 🟢 **-78%** |
| items.json | nested items | 3 | ✅ | 11.8M | ✅ | 3.2M | 🟢 **-73%** |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 63.4M | -16% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.8M | ✅ | 79.4M | -2% |
| maxItems.json | maxItems validation | 4 | ✅ | 79.0M | ✅ | 41.5M | 🟢 **-47%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 33.8M | ✅ | 39.7M | +17% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 24.3M | ✅ | 38.4M | 🔴 **+58%** |
| maximum.json | maximum validation | 4 | ✅ | 43.1M | ✅ | 41.0M | -5% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.5M | ✅ | 65.9M | -13% |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 69.3M | ✅ | 40.2M | 🟢 **-42%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ✅ | 55.1M | 🟢 **-22%** |
| minItems.json | minItems validation | 4 | ✅ | 41.1M | ✅ | 41.5M | +1% |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 40.0M | 🟢 **-33%** |
| minimum.json | minimum validation | 4 | ✅ | 76.7M | ✅ | 72.7M | -5% |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.8M | ✅ | 41.5M | 🟢 **-46%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 70.4M | ✅ | 55.6M | 🟢 **-21%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 40.8M | 🟢 **-44%** |
| multipleOf.json | by int | 3 | ✅ | 74.3M | ✅ | 64.6M | -13% |
| multipleOf.json | by number | 3 | ✅ | 72.4M | ✅ | 4.1M | 🟢 **-94%** |
| multipleOf.json | by small number | 2 | ✅ | 63.1M | ✅ | 2.3M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.3M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 31.8M | 🟢 **-59%** |
| not.json | not multiple types | 3 | ✅ | 68.7M | ✅ | 44.7M | 🟢 **-35%** |
| not.json | not more complex schema | 3 | ✅ | 68.7M | ✅ | 35.3M | 🟢 **-49%** |
| not.json | forbidden property | 2 | ✅ | 54.2M | ✅ | 57.4M | +6% |
| not.json | forbid everything with empty schema | 9 | ✅ | 59.9M | ✅ | 20.1M | 🟢 **-66%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 113.4M | 🔴 **+26%** |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ✅ | 29.1M | 🟢 **-57%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.0M | ✅ | 44.7M | 🔴 **+32%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.2M | ✅ | 23.9M | 🟢 **-46%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 56.2M | 🟢 **-26%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.4M | ✅ | 24.1M | 🟢 **-50%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.5M | ✅ | 37.8M | 🟢 **-24%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 31.8M | 🟢 **-58%** |
| pattern.json | pattern validation | 8 | ✅ | 55.7M | ✅ | 61.0M | +9% |
| pattern.json | pattern is not anchored | 1 | ✅ | 21.9M | ✅ | 24.2M | +10% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ✅ | 12.0M | 🟢 **-55%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.4M | ✅ | 5.5M | 🟢 **-64%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.2M | ✅ | 12.6M | 🟢 **-22%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 19.6M | +8% |
| properties.json | object properties validation | 6 | ✅ | 56.5M | ✅ | 49.1M | -13% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 5.2M | 🟢 **-74%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.5M | ✅ | 30.6M | 🟢 **-33%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 69.8M | -1% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.5M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.3M | ✅ | 17.0M | 🟢 **-35%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.5M | ✅ | 29.4M | 🟢 **-46%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 55.9M | ✅ | 21.3M | 🟢 **-62%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ✅ | 25.0M | 🟢 **-48%** |
| ref.json | nested refs | 2 | ✅ | 41.0M | ✅ | 21.3M | 🟢 **-48%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 54.2M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ✅ | 26.8M | 🟢 **-65%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.0M | ✅ | 31.9M | 🟢 **-40%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.6M | ✅ | 31.5M | 🟢 **-42%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 55.0M | ✅ | 25.8M | 🟢 **-53%** |
| ref.json | Location-independent identifier | 2 | ✅ | 77.1M | ✅ | 31.7M | 🟢 **-59%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 53.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.8M | ✅ | 3.3M | 🟢 **-94%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 26.6M | 🟢 **-65%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 31.2M | 🟢 **-60%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 51.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.5M | ✅ | 32.9M | 🟢 **-49%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 106.1M | +18% |
| required.json | required with escaped characters | 2 | ✅ | 54.3M | ✅ | 16.7M | 🟢 **-69%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 64.7M | ✅ | 22.1M | 🟢 **-66%** |
| type.json | number type matches numbers | 9 | ✅ | 69.2M | ✅ | 46.8M | 🟢 **-32%** |
| type.json | string type matches strings | 9 | ✅ | 68.2M | ✅ | 26.7M | 🟢 **-61%** |
| type.json | object type matches objects | 7 | ✅ | 58.8M | ✅ | 22.6M | 🟢 **-61%** |
| type.json | array type matches arrays | 7 | ✅ | 64.4M | ✅ | 40.6M | 🟢 **-37%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 23.8M | 🟢 **-64%** |
| type.json | null type matches only the null object | 10 | ✅ | 89.6M | ✅ | 22.1M | 🟢 **-75%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ✅ | 44.9M | 🟢 **-32%** |
| type.json | type as array with one item | 2 | ✅ | 76.1M | ✅ | 32.2M | 🟢 **-58%** |
| type.json | type: array or object | 5 | ✅ | 71.5M | ✅ | 47.4M | 🟢 **-34%** |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 34.7M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 18.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.5M | ✅ | 10.8M | 🟢 **-68%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.5M | ✅ | 11.4M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.8M | ✅ | 70.5M | 🟢 **-23%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ✅ | 46.0M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.7M | ✅ | 45.9M | 🟢 **-37%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 67.3M | 🟢 **-24%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 64.4M | 🟢 **-27%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 37.0M | 🟢 **-42%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 61.3M | 🟢 **-22%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 18.2M | 🟢 **-70%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 94.4M | +20% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 20.1M | 🟢 **-67%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.0M | ✅ | 28.5M | +2% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.1M | ✅ | 20.7M | 🟢 **-29%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 28.0M | -1% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.0M | ✅ | 20.9M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 27.4M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 23.4M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.6M | ✅ | 27.7M | -3% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ✅ | 20.9M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.2M | ✅ | 34.2M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.4M | ✅ | 17.2M | 🟢 **-43%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 11.3M | 🟢 **-25%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 17.0M | ✅ | 14.3M | -16% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 22.3M | ✅ | 19.0M | -15% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 9.9M | 🟢 **-52%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.3M | ✅ | 13.6M | 🟢 **-33%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 6.5M | -19% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ✅ | 4.9M | 🟢 **-56%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.5M | ✅ | 10.4M | 🟢 **-73%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 92.6M | ✅ | 71.7M | 🟢 **-23%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.8M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 6.2M | -14% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.6M | ✅ | 17.3M | 🟢 **-54%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 146.4M | ✅ | 90.6M | 🟢 **-38%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 70.0M | ✅ | 28.5M | 🟢 **-59%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.7M | ✅ | 121.4M | 🟢 **-26%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 77.0M | ✅ | 53.2M | 🟢 **-31%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 53.6M | ✅ | 13.7M | 🟢 **-74%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 43.4M | ✅ | 31.3M | 🟢 **-28%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 104.1M | ✅ | 26.6M | 🟢 **-74%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 77.0M | ✅ | 109.5M | 🔴 **+42%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 47.5M | ✅ | 14.5M | 🟢 **-69%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.9M | ✅ | 13.8M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.2M | ✅ | 21.2M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.7M | ✅ | 26.4M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 71.7M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.8M | ✅ | 11.4M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 41.2M | 🟢 **-41%** |
| allOf.json | allOf | 4 | ✅ | 38.9M | ✅ | 30.2M | 🟢 **-23%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.9M | ✅ | 14.5M | 🟢 **-53%** |
| allOf.json | allOf simple types | 2 | ✅ | 56.5M | ✅ | 46.4M | -18% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.7M | ✅ | 76.6M | 🟢 **-50%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 62.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 89.9M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 76.9M | ✅ | 76.5M | -1% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.7M | ✅ | 114.8M | 🟢 **-25%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 70.5M | ✅ | 30.4M | 🟢 **-57%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 111.7M | ✅ | 57.3M | 🟢 **-49%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 73.5M | ✅ | 30.7M | 🟢 **-58%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 80.9M | ✅ | 31.4M | 🟢 **-61%** |
| anyOf.json | anyOf | 4 | ✅ | 77.2M | ✅ | 40.2M | 🟢 **-48%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 44.1M | ✅ | 47.3M | +7% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 84.9M | ✅ | 76.6M | -10% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.5M | ✅ | 116.5M | 🟢 **-24%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 62.8M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ✅ | 32.3M | 🟢 **-55%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 88.2M | ✅ | 116.1M | 🔴 **+32%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 114.5M | ✅ | 31.8M | 🟢 **-72%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 69.0M | ✅ | 116.1M | 🔴 **+68%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 85.3M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 64.5M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 56.3M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 72.1M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 61.7M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 62.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 76.4M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 59.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 33.1M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 62.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 96.3M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 95.2M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.6M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 74.0M | +1% |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 98.4M | -9% |
| default.json | invalid string value for default | 2 | ✅ | 26.4M | ✅ | 62.8M | 🔴 **+138%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 70.8M | ✅ | 32.6M | 🟢 **-54%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.4M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.6M | ✅ | 44.6M | 🟢 **-51%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 89.5M | ✅ | 95.4M | +7% |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.9M | ✅ | 23.1M | 🟢 **-34%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 45.6M | ✅ | 38.8M | -15% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 55.3M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 16.8M | ✅ | 13.7M | -18% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 36.2M | ✅ | 35.2M | -3% |
| enum.json | simple enum validation | 2 | ✅ | 113.7M | ✅ | 32.0M | 🟢 **-72%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 24.5M | ✅ | 929K | 🟢 **-96%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 111.1M | ✅ | 3.6M | 🟢 **-97%** |
| enum.json | enums in properties | 6 | ✅ | 14.1M | ✅ | 37.5M | 🔴 **+166%** |
| enum.json | enum with escaped characters | 3 | ✅ | 124.4M | ✅ | 37.7M | 🟢 **-70%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 66.1M | ✅ | 46.8M | 🟢 **-29%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 77.7M | ✅ | 4.0M | 🟢 **-95%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 61.4M | ✅ | 47.2M | 🟢 **-23%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 95.4M | ✅ | 4.0M | 🟢 **-96%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 55.9M | ✅ | 64.3M | +15% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 97.8M | ✅ | 4.4M | 🟢 **-95%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 60.8M | ✅ | 64.1M | +5% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 99.5M | ✅ | 4.4M | 🟢 **-96%** |
| enum.json | nul characters in strings | 2 | ✅ | 62.2M | ✅ | 51.7M | -17% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 91.6M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 65.5M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 85.6M | ✅ | 72.5M | -15% |
| format.json | ipv4 format | 6 | ✅ | 79.3M | ✅ | 69.5M | -12% |
| format.json | ipv6 format | 6 | ✅ | 161.5M | ✅ | 116.7M | 🟢 **-28%** |
| format.json | hostname format | 6 | ✅ | 83.9M | ✅ | 70.0M | -17% |
| format.json | date-time format | 6 | ✅ | 156.8M | ✅ | 71.6M | 🟢 **-54%** |
| format.json | json-pointer format | 6 | ✅ | 79.5M | ✅ | 73.8M | -7% |
| format.json | uri format | 6 | ✅ | 159.0M | ✅ | 71.7M | 🟢 **-55%** |
| format.json | uri-reference format | 6 | ✅ | 79.5M | ✅ | 68.3M | -14% |
| format.json | uri-template format | 6 | ✅ | 161.4M | ✅ | 64.1M | 🟢 **-60%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.5M | ✅ | 14.0M | 🟢 **-64%** |
| items.json | a schema given for items | 4 | ✅ | 72.6M | ✅ | 49.1M | 🟢 **-32%** |
| items.json | an array of schemas for items | 6 | ✅ | 33.4M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 163.4M | ✅ | 65.6M | 🟢 **-60%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.6M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 88.7M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 22.1M | ✅ | 6.3M | 🟢 **-72%** |
| items.json | nested items | 3 | ✅ | 12.5M | ✅ | 2.1M | 🟢 **-84%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 59.1M | -18% |
| items.json | array-form items with null instance e... | 1 | ✅ | 127.3M | ✅ | 79.4M | 🟢 **-38%** |
| maxItems.json | maxItems validation | 4 | ✅ | 74.9M | ✅ | 22.6M | 🟢 **-70%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 108.0M | ✅ | 26.3M | 🟢 **-76%** |
| maxLength.json | maxLength validation | 5 | ✅ | 52.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 71.0M | ✅ | 28.7M | 🟢 **-60%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.2M | ✅ | 58.9M | +5% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 64.1M | ✅ | 23.9M | 🟢 **-63%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.2M | ✅ | 35.6M | 🟢 **-28%** |
| maximum.json | maximum validation | 4 | ✅ | 125.5M | ✅ | 41.3M | 🟢 **-67%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 65.9M | ✅ | 66.0M | +0% |
| minItems.json | minItems validation | 4 | ✅ | 128.0M | ✅ | 40.9M | 🟢 **-68%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 26.5M | 🟢 **-62%** |
| minLength.json | minLength validation | 5 | ✅ | 84.7M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 25.0M | ✅ | 16.1M | 🟢 **-36%** |
| minProperties.json | minProperties validation | 6 | ✅ | 82.2M | ✅ | 58.6M | 🟢 **-29%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.7M | ✅ | 23.6M | 🟢 **-52%** |
| minimum.json | minimum validation | 4 | ✅ | 123.5M | ✅ | 36.2M | 🟢 **-71%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 68.9M | ✅ | 40.6M | 🟢 **-41%** |
| multipleOf.json | by int | 3 | ✅ | 123.9M | ✅ | 60.9M | 🟢 **-51%** |
| multipleOf.json | by number | 3 | ✅ | 68.4M | ✅ | 3.8M | 🟢 **-94%** |
| multipleOf.json | by small number | 2 | ✅ | 98.1M | ✅ | 2.3M | 🟢 **-98%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 107.7M | ❌ | - | - |
| not.json | not | 2 | ✅ | 73.2M | ✅ | 29.9M | 🟢 **-59%** |
| not.json | not multiple types | 3 | ✅ | 107.7M | ✅ | 44.4M | 🟢 **-59%** |
| not.json | not more complex schema | 3 | ✅ | 65.8M | ✅ | 35.2M | 🟢 **-46%** |
| not.json | forbidden property | 2 | ✅ | 70.6M | ✅ | 55.5M | 🟢 **-21%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.4M | ✅ | 19.9M | 🟢 **-68%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 90.3M | ✅ | 33.3M | 🟢 **-63%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 84.8M | ✅ | 74.7M | -12% |
| not.json | double negation | 1 | ✅ | 153.1M | ✅ | 63.6M | 🟢 **-58%** |
| oneOf.json | oneOf | 4 | ✅ | 74.1M | ✅ | 47.5M | 🟢 **-36%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 47.5M | ✅ | 26.2M | 🟢 **-45%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 63.4M | ✅ | 35.7M | 🟢 **-44%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 152.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.3M | ✅ | 17.9M | 🟢 **-72%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 37.9M | 🟢 **-59%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.4M | ✅ | 23.8M | 🟢 **-44%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 110.7M | ✅ | 33.0M | 🟢 **-70%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.8M | ✅ | 24.7M | 🟢 **-47%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 68.6M | ✅ | 18.8M | 🟢 **-73%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.6M | ✅ | 30.3M | 🟢 **-58%** |
| pattern.json | pattern validation | 8 | ✅ | 74.6M | ✅ | 43.8M | 🟢 **-41%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.9M | ✅ | 27.3M | +9% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 30.8M | ✅ | 10.5M | 🟢 **-66%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ✅ | 4.5M | 🟢 **-69%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.9M | ✅ | 10.1M | 🟢 **-36%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.6M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 20.2M | ✅ | 18.3M | -9% |
| properties.json | object properties validation | 6 | ✅ | 53.5M | ✅ | 49.0M | -8% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.2M | ✅ | 9.0M | 🟢 **-58%** |
| properties.json | properties with boolean schema | 4 | ✅ | 48.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 69.7M | ✅ | 13.7M | 🟢 **-80%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ✅ | 105.1M | 🔴 **+57%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 32.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 21.3M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.5M | ✅ | 76.1M | -14% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 67.0M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 53.7M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.4M | ✅ | 17.4M | 🟢 **-32%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 71.2M | ✅ | 30.7M | 🟢 **-57%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 47.4M | ✅ | 21.3M | 🟢 **-55%** |
| ref.json | escaped pointer ref | 6 | ✅ | 59.0M | ✅ | 25.0M | 🟢 **-58%** |
| ref.json | nested refs | 2 | ✅ | 40.3M | ✅ | 21.5M | 🟢 **-47%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 78.4M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 27.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.4M | ✅ | 25.7M | 🟢 **-49%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.2M | ✅ | 28.3M | 🟢 **-46%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.1M | ✅ | 56.2M | 🟢 **-34%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.3M | ✅ | 25.9M | 🟢 **-50%** |
| ref.json | Location-independent identifier | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 50.9M | ✅ | 3.0M | 🟢 **-94%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 41.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.6M | ✅ | 26.8M | 🟢 **-49%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 51.8M | ✅ | 29.9M | 🟢 **-42%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.8M | ✅ | 26.6M | 🟢 **-43%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.8M | ✅ | 30.1M | 🟢 **-37%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 39.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.3M | ✅ | 26.9M | 🟢 **-58%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 30.3M | 🟢 **-59%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.4M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 48.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 41.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 37.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 61.6M | ✅ | 33.6M | 🟢 **-45%** |
| required.json | required default validation | 1 | ✅ | 85.2M | ✅ | 109.9M | 🔴 **+29%** |
| required.json | required with empty array | 1 | ✅ | 85.0M | ✅ | 60.5M | 🟢 **-29%** |
| required.json | required with escaped characters | 2 | ✅ | 51.2M | ✅ | 34.6M | 🟢 **-32%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.7M | ✅ | 24.4M | 🟢 **-62%** |
| type.json | number type matches numbers | 9 | ✅ | 66.5M | ✅ | 47.8M | 🟢 **-28%** |
| type.json | string type matches strings | 9 | ✅ | 65.2M | ✅ | 27.0M | 🟢 **-59%** |
| type.json | object type matches objects | 7 | ✅ | 56.4M | ✅ | 38.1M | 🟢 **-33%** |
| type.json | array type matches arrays | 7 | ✅ | 61.2M | ✅ | 22.4M | 🟢 **-63%** |
| type.json | boolean type matches booleans | 10 | ✅ | 63.1M | ✅ | 41.7M | 🟢 **-34%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.9M | ✅ | 22.4M | 🟢 **-64%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.5M | ✅ | 43.8M | 🟢 **-31%** |
| type.json | type as array with one item | 2 | ✅ | 72.3M | ✅ | 32.5M | 🟢 **-55%** |
| type.json | type: array or object | 5 | ✅ | 62.8M | ✅ | 48.2M | 🟢 **-23%** |
| type.json | type: array, object or null | 5 | ✅ | 72.8M | ✅ | 34.5M | 🟢 **-53%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.9M | ✅ | 10.1M | 🟢 **-69%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.8M | ✅ | 10.4M | 🟢 **-45%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 86.2M | ✅ | 72.8M | -16% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.2M | ✅ | 46.2M | 🟢 **-32%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.7M | ✅ | 46.5M | 🟢 **-27%** |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 67.5M | -19% |
| optional/bignum.json | number | 2 | ✅ | 84.0M | ✅ | 108.1M | 🔴 **+29%** |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 20.8M | 🟢 **-66%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 96.5M | 🔴 **+28%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.7M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 64.8M | -14% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.1M | ✅ | 20.8M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.8M | ✅ | 28.8M | +0% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.9M | ✅ | 19.9M | 🟢 **-29%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.7M | ✅ | 28.7M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.1M | ✅ | 19.0M | 🟢 **-33%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.0M | ✅ | 31.4M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.4M | ✅ | 20.8M | 🟢 **-21%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.8M | ✅ | 28.7M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.4M | ✅ | 27.1M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.9M | ✅ | 26.1M | -13% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 11.5M | 🟢 **-24%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 13.6M | -9% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.8M | ✅ | 19.0M | 🟢 **-32%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 9.7M | 🟢 **-53%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 13.8M | 🟢 **-30%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 6.6M | -17% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.7M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ✅ | 4.5M | 🟢 **-60%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.1M | ✅ | 10.4M | 🟢 **-76%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.9M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 89.9M | ✅ | 71.0M | 🟢 **-21%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 36.3M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 46.1M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 46.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.7M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 28.1M | ✅ | 6.8M | 🟢 **-76%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 18.9M | ✅ | 10.7M | 🟢 **-43%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.8M | ✅ | 90.6M | 🟢 **-41%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.6M | ✅ | 29.9M | 🟢 **-59%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.1M | ✅ | 121.9M | 🟢 **-26%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 77.0M | ✅ | 47.0M | 🟢 **-39%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.7M | ✅ | 20.0M | 🟢 **-64%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.6M | ✅ | 22.6M | 🟢 **-41%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 45.8M | 🟢 **-57%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 77.0M | ✅ | 76.4M | -1% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.2M | ✅ | 16.2M | 🟢 **-64%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.0M | ✅ | 11.6M | 🟢 **-45%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 35.1M | ✅ | 27.0M | 🟢 **-23%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 43.8M | ✅ | 17.8M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 43.0M | ✅ | 108.5M | 🔴 **+152%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 32.0M | ✅ | 9.6M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 50.9M | ✅ | 48.7M | -4% |
| allOf.json | allOf | 4 | ✅ | 47.9M | ✅ | 19.5M | 🟢 **-59%** |
| allOf.json | allOf with base schema | 5 | ✅ | 26.5M | ✅ | 20.2M | 🟢 **-24%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.8M | ✅ | 25.5M | 🟢 **-77%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 85.1M | ✅ | 113.1M | 🔴 **+33%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 63.2M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 151.5M | ✅ | 76.3M | 🟢 **-50%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 77.1M | ✅ | 59.5M | 🟢 **-23%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 117.8M | ✅ | 53.9M | 🟢 **-54%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 73.5M | ✅ | 30.0M | 🟢 **-59%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 53.3M | 🟢 **-56%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 58.9M | ✅ | 16.3M | 🟢 **-72%** |
| anyOf.json | anyOf | 4 | ✅ | 128.5M | ✅ | 36.1M | 🟢 **-72%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.5M | ✅ | 26.0M | 🟢 **-25%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 153.0M | ✅ | 116.5M | 🟢 **-24%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.2M | ✅ | 76.6M | -10% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.6M | ✅ | 31.5M | 🟢 **-35%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.4M | ✅ | 116.2M | 🟢 **-29%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.8M | ✅ | 30.6M | 🟢 **-59%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 170.1M | ✅ | 115.8M | 🟢 **-32%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 61.5M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 98.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 39.4M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 83.9M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.3M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 112.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 72.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 96.4M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 64.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 94.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 62.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 98.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 68.1M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 110.7M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 69.8M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 91.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 55.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 61.8M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 91.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 68.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 106.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 38.4M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 100.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 37.8M | 🟢 **-49%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 97.1M | -10% |
| default.json | invalid string value for default | 2 | ✅ | 53.3M | ✅ | 68.2M | 🔴 **+28%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.6M | ✅ | 32.6M | 🟢 **-58%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.4M | ✅ | 44.9M | 🟢 **-51%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 90.4M | ✅ | 95.2M | +5% |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.6M | ✅ | 15.3M | 🟢 **-61%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 45.8M | ✅ | 38.4M | -16% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.3M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.3M | ✅ | 13.7M | 🔴 **+21%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 45.8M | ✅ | 33.1M | 🟢 **-28%** |
| enum.json | simple enum validation | 2 | ✅ | 71.9M | ✅ | 30.2M | 🟢 **-58%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 956K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.4M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 16.0M | ✅ | 37.7M | 🔴 **+135%** |
| enum.json | enum with escaped characters | 3 | ✅ | 85.3M | ✅ | 37.3M | 🟢 **-56%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.9M | ✅ | 46.9M | 🟢 **-58%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.7M | ✅ | 4.1M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 43.4M | 🟢 **-61%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 62.2M | ✅ | 4.2M | 🟢 **-93%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 64.5M | 🟢 **-44%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.5M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 109.9M | ✅ | 63.3M | 🟢 **-42%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.4M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 51.1M | 🟢 **-44%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.6M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 86.5M | ✅ | 74.7M | -14% |
| format.json | idn-email format | 6 | ✅ | 162.6M | ✅ | 69.2M | 🟢 **-57%** |
| format.json | regex format | 6 | ✅ | 87.0M | ✅ | 121.1M | 🔴 **+39%** |
| format.json | ipv4 format | 6 | ✅ | 163.0M | ✅ | 70.6M | 🟢 **-57%** |
| format.json | ipv6 format | 6 | ✅ | 87.2M | ✅ | 71.7M | -18% |
| format.json | idn-hostname format | 6 | ✅ | 163.3M | ✅ | 111.8M | 🟢 **-32%** |
| format.json | hostname format | 6 | ✅ | 87.2M | ✅ | 73.5M | -16% |
| format.json | date format | 6 | ✅ | 162.1M | ✅ | 70.5M | 🟢 **-56%** |
| format.json | date-time format | 6 | ✅ | 87.3M | ✅ | 119.1M | 🔴 **+36%** |
| format.json | time format | 6 | ✅ | 162.5M | ✅ | 65.9M | 🟢 **-59%** |
| format.json | json-pointer format | 6 | ✅ | 86.7M | ✅ | 79.9M | -8% |
| format.json | relative-json-pointer format | 6 | ✅ | 163.3M | ✅ | 62.4M | 🟢 **-62%** |
| format.json | iri format | 6 | ✅ | 87.0M | ✅ | 73.1M | -16% |
| format.json | iri-reference format | 6 | ✅ | 163.3M | ✅ | 69.4M | 🟢 **-58%** |
| format.json | uri format | 6 | ✅ | 86.7M | ✅ | 119.1M | 🔴 **+37%** |
| format.json | uri-reference format | 6 | ✅ | 163.0M | ✅ | 73.0M | 🟢 **-55%** |
| format.json | uri-template format | 6 | ✅ | 86.7M | ✅ | 75.9M | -12% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 164.5M | ✅ | 121.4M | 🟢 **-26%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 88.5M | ✅ | 79.6M | -10% |
| if-then-else.json | ignore else without if | 2 | ✅ | 163.8M | ✅ | 66.1M | 🟢 **-60%** |
| if-then-else.json | if and then without else | 3 | ✅ | 74.0M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 121.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 164.5M | ✅ | 79.2M | 🟢 **-52%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 113.4M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.8M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 58.3M | ✅ | 16.1M | 🟢 **-72%** |
| items.json | a schema given for items | 4 | ✅ | 52.7M | ✅ | 34.3M | 🟢 **-35%** |
| items.json | an array of schemas for items | 6 | ✅ | 97.3M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.6M | ✅ | 65.6M | 🟢 **-26%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 63.1M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.4M | ✅ | 7.7M | 🟢 **-74%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 2.7M | 🟢 **-78%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 93.4M | 🔴 **+30%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 77.1M | ✅ | 57.7M | 🟢 **-25%** |
| maxItems.json | maxItems validation | 4 | ✅ | 75.1M | ✅ | 74.3M | -1% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 30.0M | 🟢 **-57%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.2M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.8M | ✅ | 29.8M | 🟢 **-45%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.5M | ✅ | 58.5M | +3% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.3M | ✅ | 23.5M | 🟢 **-51%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ✅ | 33.5M | 🟢 **-32%** |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ✅ | 42.0M | 🟢 **-43%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.2M | ✅ | 72.7M | +1% |
| minItems.json | minItems validation | 4 | ✅ | 75.1M | ✅ | 40.7M | 🟢 **-46%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 54.3M | 🟢 **-22%** |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.9M | ✅ | 29.8M | 🟢 **-46%** |
| minProperties.json | minProperties validation | 6 | ✅ | 58.0M | ✅ | 59.2M | +2% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.3M | ✅ | 24.3M | 🟢 **-51%** |
| minimum.json | minimum validation | 4 | ✅ | 73.3M | ✅ | 72.2M | -2% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.1M | ✅ | 40.7M | 🟢 **-41%** |
| multipleOf.json | by int | 3 | ✅ | 74.0M | ✅ | 66.1M | -11% |
| multipleOf.json | by number | 3 | ✅ | 70.1M | ✅ | 3.7M | 🟢 **-95%** |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 2.3M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 73.3M | ✅ | 29.8M | 🟢 **-59%** |
| not.json | not multiple types | 3 | ✅ | 67.9M | ✅ | 44.5M | 🟢 **-34%** |
| not.json | not more complex schema | 3 | ✅ | 66.1M | ✅ | 35.2M | 🟢 **-47%** |
| not.json | forbidden property | 2 | ✅ | 52.5M | ✅ | 58.7M | +12% |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.6M | ✅ | 20.5M | 🟢 **-67%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.6M | ✅ | 35.9M | 🟢 **-42%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.4M | ✅ | 74.8M | -7% |
| not.json | double negation | 1 | ✅ | 85.2M | ✅ | 57.4M | 🟢 **-33%** |
| oneOf.json | oneOf | 4 | ✅ | 64.5M | ✅ | 48.6M | 🟢 **-25%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.8M | ✅ | 25.3M | 🟢 **-23%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 63.4M | ✅ | 38.4M | 🟢 **-39%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.3M | ✅ | 20.4M | 🟢 **-68%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 38.3M | 🟢 **-40%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.0M | ✅ | 23.9M | 🟢 **-45%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 57.4M | 🟢 **-21%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.4M | ✅ | 24.7M | 🟢 **-47%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.8M | ✅ | 37.5M | 🟢 **-22%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.4M | ✅ | 32.7M | 🟢 **-55%** |
| pattern.json | pattern validation | 8 | ✅ | 53.7M | ✅ | 59.0M | +10% |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.5M | ✅ | 14.3M | 🟢 **-30%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ✅ | 12.6M | 🟢 **-52%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ✅ | 5.0M | 🟢 **-65%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.9M | ✅ | 12.0M | 🟢 **-25%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.2M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 19.2M | +9% |
| properties.json | object properties validation | 6 | ✅ | 50.7M | ✅ | 48.8M | -4% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.6M | ✅ | 4.9M | 🟢 **-74%** |
| properties.json | properties with boolean schema | 4 | ✅ | 48.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 49.9M | ✅ | 13.6M | 🟢 **-73%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 107.7M | 🔴 **+61%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.6M | ✅ | 75.4M | -15% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.3M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.4M | ✅ | 18.1M | 🟢 **-29%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.4M | ✅ | 26.1M | 🟢 **-50%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 55.7M | ✅ | 23.2M | 🟢 **-58%** |
| ref.json | escaped pointer ref | 6 | ✅ | 45.7M | ✅ | 24.7M | 🟢 **-46%** |
| ref.json | nested refs | 2 | ✅ | 38.5M | ✅ | 23.4M | 🟢 **-39%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 54.6M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 49.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.9M | ✅ | 32.2M | 🟢 **-39%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.2M | ✅ | 31.2M | 🟢 **-38%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.1M | ✅ | 56.4M | 🟢 **-34%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 51.1M | ✅ | 26.0M | 🟢 **-49%** |
| ref.json | Location-independent identifier | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 48.2M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 54.6M | ✅ | 3.2M | 🟢 **-94%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 41.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 51.4M | ✅ | 26.6M | 🟢 **-48%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 52.7M | ✅ | 30.0M | 🟢 **-43%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.8M | ✅ | 26.5M | 🟢 **-45%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.9M | ✅ | 29.8M | 🟢 **-38%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 72.9M | ✅ | 26.4M | 🟢 **-64%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.2M | ✅ | 31.4M | 🟢 **-57%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.4M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 49.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 45.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 43.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 38.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.2M | ✅ | 33.7M | 🟢 **-46%** |
| required.json | required default validation | 1 | ✅ | 81.8M | ✅ | 110.3M | 🔴 **+35%** |
| required.json | required with empty array | 1 | ✅ | 85.2M | ✅ | 60.6M | 🟢 **-29%** |
| required.json | required with escaped characters | 2 | ✅ | 50.6M | ✅ | 34.7M | 🟢 **-31%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.5M | ✅ | 24.4M | 🟢 **-62%** |
| type.json | number type matches numbers | 9 | ✅ | 66.5M | ✅ | 48.0M | 🟢 **-28%** |
| type.json | string type matches strings | 9 | ✅ | 65.9M | ✅ | 26.9M | 🟢 **-59%** |
| type.json | object type matches objects | 7 | ✅ | 56.7M | ✅ | 39.8M | 🟢 **-30%** |
| type.json | array type matches arrays | 7 | ✅ | 61.1M | ✅ | 22.2M | 🟢 **-64%** |
| type.json | boolean type matches booleans | 10 | ✅ | 60.4M | ✅ | 23.8M | 🟢 **-61%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.8M | ✅ | 36.7M | 🟢 **-42%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.5M | ✅ | 25.1M | 🟢 **-60%** |
| type.json | type as array with one item | 2 | ✅ | 73.2M | ✅ | 59.9M | -18% |
| type.json | type: array or object | 5 | ✅ | 68.4M | ✅ | 27.7M | 🟢 **-59%** |
| type.json | type: array, object or null | 5 | ✅ | 73.6M | ✅ | 55.8M | 🟢 **-24%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.9M | ✅ | 10.8M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.6M | ✅ | 12.2M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 86.0M | ✅ | 72.7M | -15% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 67.8M | ✅ | 46.5M | 🟢 **-31%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 68.3M | ✅ | 46.4M | 🟢 **-32%** |
| optional/bignum.json | integer | 2 | ✅ | 83.6M | ✅ | 67.4M | -19% |
| optional/bignum.json | number | 2 | ✅ | 84.1M | ✅ | 108.1M | 🔴 **+28%** |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 19.5M | 🟢 **-68%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 64.7M | -14% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 64.7M | -14% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 352K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 22.6M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 422K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.9M | ✅ | 19.5M | 🟢 **-33%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.8M | ✅ | 28.8M | 0% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.7M | ✅ | 20.7M | 🟢 **-25%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.9M | ✅ | 28.3M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.2M | ✅ | 18.8M | 🟢 **-33%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.1M | ✅ | 28.8M | +11% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.1M | ✅ | 20.8M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.9M | ✅ | 25.8M | -7% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.8M | ✅ | 26.8M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 25.7M | -14% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ✅ | 11.3M | 🟢 **-27%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.2M | ✅ | 14.3M | -6% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.2M | ✅ | 18.8M | 🟢 **-22%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 10.0M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ✅ | 13.2M | 🟢 **-34%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 6.7M | -13% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.1M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.7M | ✅ | 9.0M | 🟢 **-76%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.0M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.1M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 70.1M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 35.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.3M | ✅ | 70.1M | -16% |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 36.4M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 57.4M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 57.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.5M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.2M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 12.1M | 🔴 **+63%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.8M | ✅ | 16.8M | 🟢 **-56%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 79.4M | 🟢 **-48%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 69.7M | ✅ | 29.0M | 🟢 **-58%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.2M | ✅ | 87.7M | 🟢 **-47%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 77.0M | ✅ | 46.2M | 🟢 **-40%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.6M | ✅ | 18.5M | 🟢 **-67%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 43.6M | ✅ | 22.4M | 🟢 **-49%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 41.8M | 🟢 **-61%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 77.1M | ✅ | 76.3M | -1% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.7M | ✅ | 15.9M | 🟢 **-65%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.7M | ✅ | 10.8M | 🟢 **-50%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.3M | ✅ | 25.5M | 🟢 **-41%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.3M | ✅ | 16.3M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 54.4M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.2M | ✅ | 8.8M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 49.3M | 🟢 **-29%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.5M | ✅ | 11.9M | 🟢 **-53%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.6M | ✅ | 19.7M | 🟢 **-38%** |
| allOf.json | allOf | 4 | ✅ | 39.1M | ✅ | 19.4M | 🟢 **-50%** |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ✅ | 20.3M | 🟢 **-34%** |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ✅ | 27.1M | 🟢 **-61%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 113.7M | 🟢 **-26%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 85.2M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 85.2M | ✅ | 68.4M | -20% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.2M | ✅ | 108.8M | 🟢 **-29%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.4M | ✅ | 31.8M | 🟢 **-57%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.6M | ✅ | 52.1M | 🟢 **-56%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 29.9M | 🟢 **-60%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 28.8M | 🟢 **-66%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.4M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 48.5M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 76.0M | ✅ | 40.2M | 🟢 **-47%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 37.3M | ✅ | 44.6M | +20% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.2M | ✅ | 76.4M | -10% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.2M | ✅ | 115.1M | 🔴 **+35%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.9M | ✅ | 31.8M | 🟢 **-35%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.9M | ✅ | 115.0M | 🔴 **+44%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 31.1M | 🟢 **-58%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 69.5M | ✅ | 116.1M | 🔴 **+67%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 61.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 64.7M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 36.8M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 56.0M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 72.1M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 58.4M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 61.2M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 62.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 62.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 62.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.1M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.2M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 69.7M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 62.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 62.2M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 57.8M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 64.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 68.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.3M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 38.0M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 62.8M | -15% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 90.2M | ✅ | 116.4M | 🔴 **+29%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 90.3M | ✅ | 57.2M | 🟢 **-37%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 79.6M | ✅ | 74.0M | -7% |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 72.3M | ✅ | 32.4M | 🟢 **-55%** |
| default.json | invalid type for default | 2 | ✅ | 64.7M | ✅ | 64.9M | +0% |
| default.json | invalid string value for default | 2 | ✅ | 24.6M | ✅ | 63.2M | 🔴 **+158%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.1M | ✅ | 53.2M | +4% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 32.4M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 90.1M | ✅ | 74.9M | -17% |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.3M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 46.0M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 53.0M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 52.8M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.6M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 64.5M | ✅ | 29.9M | 🟢 **-54%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.3M | ✅ | 924K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.5M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 15.0M | ✅ | 36.0M | 🔴 **+140%** |
| enum.json | enum with escaped characters | 3 | ✅ | 73.6M | ✅ | 37.4M | 🟢 **-49%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 69.5M | ✅ | 26.8M | 🟢 **-61%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 62.7M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 67.5M | ✅ | 26.7M | 🟢 **-60%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.9M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 68.9M | ✅ | 35.5M | 🟢 **-48%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 54.4M | ✅ | 4.8M | 🟢 **-91%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.2M | ✅ | 31.7M | 🟢 **-55%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.6M | ✅ | 4.9M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 61.4M | ✅ | 28.1M | 🟢 **-54%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 68.2M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 87.9M | ✅ | 71.2M | -19% |
| format.json | idn-email format | 6 | ✅ | 89.5M | ✅ | 61.5M | 🟢 **-31%** |
| format.json | regex format | 6 | ✅ | 73.5M | ✅ | 125.7M | 🔴 **+71%** |
| format.json | ipv4 format | 6 | ✅ | 78.0M | ✅ | 68.0M | -13% |
| format.json | ipv6 format | 6 | ✅ | 73.6M | ✅ | 72.2M | -2% |
| format.json | idn-hostname format | 6 | ✅ | 81.0M | ✅ | 111.6M | 🔴 **+38%** |
| format.json | hostname format | 6 | ✅ | 80.9M | ✅ | 69.7M | -14% |
| format.json | date format | 6 | ✅ | 77.7M | ✅ | 69.2M | -11% |
| format.json | date-time format | 6 | ✅ | 80.8M | ✅ | 107.2M | 🔴 **+33%** |
| format.json | time format | 6 | ✅ | 73.5M | ✅ | 64.8M | -12% |
| format.json | json-pointer format | 6 | ✅ | 73.3M | ✅ | 69.7M | -5% |
| format.json | relative-json-pointer format | 6 | ✅ | 80.8M | ✅ | 60.4M | 🟢 **-25%** |
| format.json | iri format | 6 | ✅ | 80.6M | ✅ | 69.7M | -14% |
| format.json | iri-reference format | 6 | ✅ | 80.4M | ✅ | 66.4M | -17% |
| format.json | uri format | 6 | ✅ | 73.6M | ✅ | 115.7M | 🔴 **+57%** |
| format.json | uri-reference format | 6 | ✅ | 80.9M | ✅ | 72.0M | -11% |
| format.json | uri-template format | 6 | ✅ | 80.3M | ✅ | 68.8M | -14% |
| format.json | uuid format | 6 | ✅ | 81.0M | ✅ | 111.9M | 🔴 **+38%** |
| format.json | duration format | 6 | ✅ | 80.2M | ✅ | 63.2M | 🟢 **-21%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.7M | ✅ | 121.3M | 🔴 **+52%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.1M | ✅ | 79.3M | +0% |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.9M | ✅ | 58.6M | 🟢 **-27%** |
| if-then-else.json | if and then without else | 3 | ✅ | 73.6M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 70.1M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.9M | ✅ | 72.3M | -10% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.6M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.9M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.0M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.8M | ✅ | 13.5M | 🟢 **-69%** |
| items.json | a schema given for items | 4 | ✅ | 52.0M | ✅ | 31.8M | 🟢 **-39%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.0M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.5M | ✅ | 57.8M | 🟢 **-35%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 67.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 63.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.6M | ✅ | 7.5M | 🟢 **-41%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 2.9M | 🟢 **-77%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 93.7M | 🔴 **+30%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 77.0M | ✅ | 58.0M | 🟢 **-25%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.6M | ✅ | 112.2M | 🔴 **+27%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.5M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 57.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 75.1M | ✅ | 37.5M | 🟢 **-50%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 52.1M | 🟢 **-25%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.2M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.6M | ✅ | 27.4M | 🟢 **-50%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.3M | ✅ | 54.2M | -4% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.2M | ✅ | 23.8M | 🟢 **-50%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.6M | ✅ | 38.6M | 🟢 **-22%** |
| maximum.json | maximum validation | 4 | ✅ | 72.7M | ✅ | 40.6M | 🟢 **-44%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.2M | ✅ | 71.5M | -1% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.5M | ✅ | 72.7M | -18% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 67.9M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.4M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 58.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 56.5M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 88.5M | ✅ | 66.2M | 🟢 **-25%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 67.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 75.1M | ✅ | 40.9M | 🟢 **-46%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.3M | ✅ | 53.8M | 🟢 **-22%** |
| minLength.json | minLength validation | 5 | ✅ | 55.1M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.8M | ✅ | 29.5M | 🟢 **-46%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.8M | ✅ | 58.0M | +0% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.0M | ✅ | 23.2M | 🟢 **-51%** |
| minimum.json | minimum validation | 4 | ✅ | 73.3M | ✅ | 66.5M | -9% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.1M | ✅ | 38.3M | 🟢 **-45%** |
| multipleOf.json | by int | 3 | ✅ | 74.0M | ✅ | 64.1M | -13% |
| multipleOf.json | by number | 3 | ✅ | 70.0M | ✅ | 3.8M | 🟢 **-95%** |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 2.3M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 73.4M | ✅ | 28.4M | 🟢 **-61%** |
| not.json | not multiple types | 3 | ✅ | 67.8M | ✅ | 43.5M | 🟢 **-36%** |
| not.json | not more complex schema | 3 | ✅ | 64.3M | ✅ | 34.4M | 🟢 **-47%** |
| not.json | forbidden property | 2 | ✅ | 52.4M | ✅ | 52.0M | -1% |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.7M | ✅ | 19.6M | 🟢 **-68%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 82.7M | ✅ | 33.1M | 🟢 **-60%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 84.1M | ✅ | 72.2M | -14% |
| not.json | double negation | 1 | ✅ | 85.0M | ✅ | 62.7M | 🟢 **-26%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.8M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 64.4M | ✅ | 28.4M | 🟢 **-56%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.4M | ✅ | 45.0M | 🔴 **+27%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 62.8M | ✅ | 21.1M | 🟢 **-66%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 20.1M | 🟢 **-68%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 38.0M | 🟢 **-40%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.3M | ✅ | 20.9M | 🟢 **-52%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.6M | ✅ | 51.8M | 🟢 **-29%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.8M | ✅ | 23.1M | 🟢 **-51%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.8M | ✅ | 36.9M | 🟢 **-23%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.6M | ✅ | 28.9M | 🟢 **-60%** |
| pattern.json | pattern validation | 8 | ✅ | 54.1M | ✅ | 55.9M | +3% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.9M | ✅ | 21.7M | -13% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.9M | ✅ | 11.3M | 🟢 **-58%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ✅ | 6.1M | 🟢 **-58%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.3M | ✅ | 12.0M | -16% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.1M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 17.3M | -3% |
| properties.json | object properties validation | 6 | ✅ | 54.4M | ✅ | 38.7M | 🟢 **-29%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ✅ | 5.0M | 🟢 **-75%** |
| properties.json | properties with boolean schema | 4 | ✅ | 48.2M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 49.9M | ✅ | 12.4M | 🟢 **-75%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 55.9M | -17% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.5M | ✅ | 76.7M | -13% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.3M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.2M | ✅ | 37.1M | 🔴 **+1073%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.0M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.3M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.3M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.9M | ✅ | 15.8M | 🟢 **-34%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 53.3M | ✅ | 29.7M | 🟢 **-44%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.8M | ✅ | 19.2M | 🟢 **-66%** |
| ref.json | escaped pointer ref | 6 | ✅ | 45.9M | ✅ | 23.0M | 🟢 **-50%** |
| ref.json | nested refs | 2 | ✅ | 38.1M | ✅ | 20.8M | 🟢 **-45%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 42.8M | ✅ | 24.5M | 🟢 **-43%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.8M | ✅ | 29.6M | 🟢 **-42%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.5M | ✅ | 29.7M | 🟢 **-44%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.1M | ✅ | 52.0M | 🟢 **-39%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 50.9M | ✅ | 26.0M | 🟢 **-49%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.2M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.0M | ✅ | 3.2M | 🟢 **-94%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.0M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 41.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 42.0M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 50.7M | ✅ | 26.6M | 🟢 **-47%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 51.9M | ✅ | 30.0M | 🟢 **-42%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.5M | ✅ | 24.6M | 🟢 **-48%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.6M | ✅ | 29.6M | 🟢 **-38%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 49.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 26.2M | 🟢 **-64%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.0M | ✅ | 29.4M | 🟢 **-56%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.3M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 43.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 49.6M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 45.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 49.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 48.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.5M | ✅ | 30.2M | 🟢 **-52%** |
| required.json | required default validation | 1 | ✅ | 85.1M | ✅ | 101.1M | +19% |
| required.json | required with empty array | 1 | ✅ | 85.0M | ✅ | 57.2M | 🟢 **-33%** |
| required.json | required with escaped characters | 2 | ✅ | 50.0M | ✅ | 32.2M | 🟢 **-36%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.8M | ✅ | 22.8M | 🟢 **-64%** |
| type.json | number type matches numbers | 9 | ✅ | 66.6M | ✅ | 46.3M | 🟢 **-30%** |
| type.json | string type matches strings | 9 | ✅ | 65.6M | ✅ | 26.3M | 🟢 **-60%** |
| type.json | object type matches objects | 7 | ✅ | 54.9M | ✅ | 39.0M | 🟢 **-29%** |
| type.json | array type matches arrays | 7 | ✅ | 60.7M | ✅ | 22.5M | 🟢 **-63%** |
| type.json | boolean type matches booleans | 10 | ✅ | 82.1M | ✅ | 39.7M | 🟢 **-52%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.9M | ✅ | 20.8M | 🟢 **-67%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.6M | ✅ | 43.1M | 🟢 **-32%** |
| type.json | type as array with one item | 2 | ✅ | 73.1M | ✅ | 29.5M | 🟢 **-60%** |
| type.json | type: array or object | 5 | ✅ | 68.9M | ✅ | 27.3M | 🟢 **-60%** |
| type.json | type: array, object or null | 5 | ✅ | 73.6M | ✅ | 55.5M | 🟢 **-25%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.8M | ✅ | 78.3M | -1% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 50.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.4M | ✅ | 81.1M | 🔴 **+20%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 52.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 75.2M | ✅ | 52.0M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 43.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 41.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 76.8M | ✅ | 50.0M | 🟢 **-35%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.0M | ✅ | 49.6M | 🔴 **+136%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 52.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 49.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 45.2M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 71.2M | ✅ | 71.4M | +0% |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 72.0M | ✅ | 59.6M | -17% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 56.1M | ✅ | 53.9M | -4% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 34.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 66.6M | ✅ | 35.7M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.6M | ✅ | 23.2M | 🟢 **-65%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 33.2M | ✅ | 69.2M | 🔴 **+108%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 32.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 33.2M | ✅ | 45.3M | 🔴 **+36%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.2M | ✅ | 52.2M | 🔴 **+67%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.4M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 52.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.9M | ✅ | 14.7M | 🟢 **-26%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 75.0M | ✅ | 73.1M | -2% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 50.7M | ✅ | 59.0M | +16% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.8M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.7M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.9M | ✅ | 11.0M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 11.3M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 81.2M | ✅ | 69.6M | -14% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 67.4M | ✅ | 42.9M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 68.6M | ✅ | 41.4M | 🟢 **-40%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 55.5M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.5M | ✅ | 29.8M | 🟢 **-59%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 62.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.7M | ✅ | 64.0M | 🟢 **-24%** |
| optional/bignum.json | number | 2 | ✅ | 83.9M | ✅ | 63.7M | 🟢 **-24%** |
| optional/bignum.json | string | 1 | ✅ | 59.5M | ✅ | 38.1M | 🟢 **-36%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 61.1M | -19% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 63.3M | -16% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.1M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.6M | ✅ | 60.5M | -12% |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.5M | ✅ | 68.6M | +12% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.3M | ✅ | 64.3M | 🟢 **-29%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.6M | ✅ | 21.1M | 🟢 **-37%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.6M | ✅ | 37.0M | 🟢 **-22%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 53.1M | ✅ | 28.8M | 🟢 **-46%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 59.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.9M | ✅ | 20.7M | 🟢 **-48%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.2M | ✅ | 28.1M | 0% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.8M | ✅ | 20.8M | 🟢 **-28%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 28.1M | +2% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 20.4M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.2M | ✅ | 25.8M | -8% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.0M | ✅ | 21.3M | -18% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.1M | ✅ | 28.7M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.3M | ✅ | 20.7M | 🟢 **-24%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.9M | ✅ | 33.9M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.7M | ✅ | 17.1M | 🟢 **-42%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ✅ | 10.7M | 🟢 **-29%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 13.9M | -7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.6M | ✅ | 18.0M | 🟢 **-35%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.3M | ✅ | 7.8M | 🟢 **-62%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.0M | ✅ | 12.7M | 🟢 **-33%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 6.8M | -12% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.8M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.9M | ✅ | 9.1M | 🟢 **-76%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.3M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 68.0M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.2M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.2M | ✅ | 64.5M | 🟢 **-23%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.4M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.3M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.5M | ✅ | 37.5M | 🟢 **-37%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 52.5M | ✅ | 25.8M | 🟢 **-51%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 51.1M | ✅ | 27.0M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 51.9M | ✅ | 25.7M | 🟢 **-50%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 73.0M | ✅ | 30.2M | 🟢 **-59%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.3M | ✅ | 24.4M | 🟢 **-53%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.8M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 30.0M | ✅ | 18.7M | 🟢 **-38%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.1M | ✅ | 10.8M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 27.8M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.5M | ✅ | 20.1M | 🟢 **-40%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.0M | ✅ | 109.1M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.0M | ✅ | 9.4M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 50.1M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.6M | ✅ | 11.5M | 🟢 **-55%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.6M | ✅ | 24.6M | 🟢 **-22%** |
| allOf.json | allOf | 4 | ✅ | 40.6M | ✅ | 19.4M | 🟢 **-52%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.9M | ✅ | 20.0M | 🟢 **-33%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 28.9M | 🟢 **-60%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.1M | ✅ | 115.0M | 🟢 **-24%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 65.4M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 91.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 80.5M | ✅ | 76.7M | -5% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.9M | ✅ | 60.0M | 🟢 **-61%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 76.4M | ✅ | 58.9M | 🟢 **-23%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 32.6M | 🟢 **-72%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.4M | ✅ | 61.0M | 🟢 **-22%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 17.0M | 🟢 **-80%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 51.3M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 80.0M | ✅ | 34.9M | 🟢 **-56%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.8M | ✅ | 45.4M | +14% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 89.9M | ✅ | 76.4M | -15% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 89.9M | ✅ | 113.5M | 🔴 **+26%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 64.2M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 49.4M | ✅ | 32.3M | 🟢 **-35%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 83.5M | ✅ | 116.5M | 🔴 **+39%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 29.5M | 🟢 **-63%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.6M | ✅ | 115.6M | 🔴 **+45%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 58.9M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.4M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 40.5M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 78.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.4M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 75.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 65.8M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 68.0M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 67.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 62.7M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.6M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 69.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 63.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.0M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.6M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 70.0M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 31.7M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 50.4M | 🟢 **-35%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 95.9M | ✅ | 119.7M | 🔴 **+25%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 78.8M | ✅ | 68.8M | -13% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 83.0M | ✅ | 70.2M | -15% |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 89.5M | ✅ | 59.5M | 🟢 **-33%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 63.9M | -11% |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ✅ | 63.2M | +15% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.6M | ✅ | 53.8M | +2% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 64.1M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 79.1M | ✅ | 76.8M | -3% |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.1M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 54.2M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 51.7M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.1M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 28.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.3M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.7M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.0M | ✅ | 64.2M | 🔴 **+705%** |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 14.5M | ✅ | 31.7M | 🔴 **+119%** |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 7.0M | ✅ | 114.1M | 🔴 **+1535%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 8.7M | ✅ | 60.6M | 🔴 **+593%** |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.3M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.7M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 15.8M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 6.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 70.9M | ✅ | 30.5M | 🟢 **-57%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 43.1M | ✅ | 969K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 72.0M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 37.2M | 🔴 **+157%** |
| enum.json | enum with escaped characters | 3 | ✅ | 61.7M | ✅ | 34.3M | 🟢 **-44%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.6M | ✅ | 26.8M | 🟢 **-65%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 65.9M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.9M | ✅ | 26.0M | 🟢 **-66%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.1M | ✅ | 4.4M | 🟢 **-93%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 71.9M | ✅ | 37.2M | 🟢 **-48%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 4.8M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.4M | ✅ | 37.2M | 🟢 **-49%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.1M | ✅ | 4.7M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.4M | ✅ | 28.6M | 🟢 **-56%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 64.5M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 96.1M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 96.1M | ✅ | 58.7M | 🟢 **-39%** |
| format.json | regex format | 7 | ✅ | 78.2M | ✅ | 61.7M | 🟢 **-21%** |
| format.json | ipv4 format | 7 | ✅ | 95.5M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 77.5M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 78.2M | ✅ | 72.8M | -7% |
| format.json | hostname format | 7 | ✅ | 76.9M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 78.3M | ✅ | 46.4M | 🟢 **-41%** |
| format.json | time format | 7 | ✅ | 78.0M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 78.4M | ✅ | 72.5M | -8% |
| format.json | relative-json-pointer format | 7 | ✅ | 76.6M | ✅ | 66.8M | -13% |
| format.json | iri format | 7 | ✅ | 78.5M | ✅ | 122.6M | 🔴 **+56%** |
| format.json | iri-reference format | 7 | ✅ | 77.6M | ✅ | 61.9M | 🟢 **-20%** |
| format.json | uri format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 78.0M | ✅ | 74.2M | -5% |
| format.json | uri-template format | 7 | ✅ | 78.4M | ✅ | 62.6M | 🟢 **-20%** |
| format.json | uuid format | 7 | ✅ | 78.4M | ✅ | 74.1M | -5% |
| format.json | duration format | 7 | ✅ | 78.3M | ✅ | 69.9M | -11% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 82.1M | ✅ | 121.6M | 🔴 **+48%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 92.1M | ✅ | 79.3M | -14% |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.1M | ✅ | 76.3M | -9% |
| if-then-else.json | if and then without else | 3 | ✅ | 77.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 75.0M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 83.4M | ✅ | 79.6M | -5% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.0M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.4M | ✅ | 15.0M | 🟢 **-66%** |
| items.json | a schema given for items | 4 | ✅ | 54.6M | ✅ | 31.9M | 🟢 **-42%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.7M | ✅ | 102.2M | +9% |
| items.json | items with boolean schema (false) | 2 | ✅ | 64.8M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 13.1M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 2.2M | 🟢 **-82%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.7M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.6M | ✅ | 25.5M | 🟢 **-45%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 45.4M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.2M | ✅ | 63.5M | -16% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 121.8M | 🔴 **+30%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.2M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 78.9M | ✅ | 42.6M | 🟢 **-46%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.4M | ✅ | 57.6M | 🟢 **-20%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.3M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 55.2M | ✅ | 32.2M | 🟢 **-42%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.6M | ✅ | 57.4M | -2% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.7M | ✅ | 23.8M | 🟢 **-52%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.4M | ✅ | 38.7M | 🟢 **-23%** |
| maximum.json | maximum validation | 4 | ✅ | 78.5M | ✅ | 41.9M | 🟢 **-47%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 72.3M | -4% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 79.1M | -16% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 67.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.6M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 57.1M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 58.8M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 93.3M | ✅ | 68.8M | 🟢 **-26%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.6M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 80.2M | ✅ | 73.8M | -8% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.4M | ✅ | 31.6M | 🟢 **-56%** |
| minLength.json | minLength validation | 5 | ✅ | 58.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 31.2M | 🟢 **-45%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.5M | ✅ | 59.5M | +0% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.8M | ✅ | 24.3M | 🟢 **-52%** |
| minimum.json | minimum validation | 4 | ✅ | 76.8M | ✅ | 69.9M | -9% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 41.2M | 🟢 **-43%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 66.9M | -14% |
| multipleOf.json | by number | 3 | ✅ | 73.4M | ✅ | 3.8M | 🟢 **-95%** |
| multipleOf.json | by small number | 2 | ✅ | 66.7M | ✅ | 2.3M | 🟢 **-97%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 29.9M | 🟢 **-61%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 45.2M | 🟢 **-36%** |
| not.json | not more complex schema | 3 | ✅ | 66.3M | ✅ | 35.3M | 🟢 **-47%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 57.8M | +6% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.3M | ✅ | 20.5M | 🟢 **-66%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.3M | ✅ | 36.1M | 🟢 **-40%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 89.7M | ✅ | 75.2M | -16% |
| not.json | double negation | 1 | ✅ | 89.9M | ✅ | 63.8M | 🟢 **-29%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.5M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 28.9M | 🟢 **-57%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.2M | ✅ | 44.7M | 🔴 **+20%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 21.0M | 🟢 **-68%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 88.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.0M | ✅ | 19.2M | 🟢 **-71%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 65.5M | ✅ | 38.4M | 🟢 **-41%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 29.2M | ✅ | 22.6M | 🟢 **-23%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 75.5M | ✅ | 57.2M | 🟢 **-24%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.4M | ✅ | 24.5M | 🟢 **-49%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.2M | ✅ | 38.0M | 🟢 **-23%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.1M | ✅ | 32.6M | 🟢 **-57%** |
| pattern.json | pattern validation | 8 | ✅ | 56.2M | ✅ | 58.4M | +4% |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.6M | ✅ | 24.1M | 🔴 **+66%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ✅ | 12.4M | 🟢 **-55%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ✅ | 5.6M | 🟢 **-62%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.1M | ✅ | 13.0M | -19% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.7M | ✅ | 17.0M | +2% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.1M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.1M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 65.9M | -18% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 114.6M | 🔴 **+42%** |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ✅ | 30.4M | 🟢 **-46%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 5.8M | 🟢 **-71%** |
| properties.json | properties with boolean schema | 4 | ✅ | 48.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 52.1M | ✅ | 13.5M | 🟢 **-74%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 107.8M | 🔴 **+53%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.5M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.8M | ✅ | 75.1M | 🟢 **-20%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.3M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.4M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.2M | ✅ | 17.8M | 🟢 **-32%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.0M | ✅ | 26.0M | 🟢 **-53%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.0M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ✅ | 24.9M | 🟢 **-48%** |
| ref.json | nested refs | 2 | ✅ | 37.9M | ✅ | 23.4M | 🟢 **-38%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.4M | ✅ | 22.3M | 🟢 **-50%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.3M | ✅ | 30.9M | 🟢 **-41%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 30.0M | 🟢 **-45%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 56.2M | 🟢 **-38%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.1M | ✅ | 26.1M | 🟢 **-52%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 3.2M | 🟢 **-94%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.3M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 51.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 41.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 50.9M | ✅ | 26.8M | 🟢 **-47%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.8M | ✅ | 31.9M | 🟢 **-42%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.3M | ✅ | 26.3M | 🟢 **-48%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 48.7M | ✅ | 31.4M | 🟢 **-35%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 26.7M | 🟢 **-65%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.1M | ✅ | 32.4M | 🟢 **-57%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.1M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 50.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 42.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 43.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 44.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 51.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 42.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 51.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 48.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.0M | ✅ | 33.8M | 🟢 **-48%** |
| required.json | required default validation | 1 | ✅ | 89.8M | ✅ | 109.0M | 🔴 **+21%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 60.7M | 🟢 **-33%** |
| required.json | required with escaped characters | 2 | ✅ | 51.8M | ✅ | 34.8M | 🟢 **-33%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 67.1M | ✅ | 24.4M | 🟢 **-64%** |
| type.json | number type matches numbers | 9 | ✅ | 69.5M | ✅ | 46.9M | 🟢 **-32%** |
| type.json | string type matches strings | 9 | ✅ | 67.0M | ✅ | 27.0M | 🟢 **-60%** |
| type.json | object type matches objects | 7 | ✅ | 58.3M | ✅ | 39.8M | 🟢 **-32%** |
| type.json | array type matches arrays | 7 | ✅ | 64.2M | ✅ | 22.6M | 🟢 **-65%** |
| type.json | boolean type matches booleans | 10 | ✅ | 62.9M | ✅ | 22.9M | 🟢 **-64%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 39.6M | 🟢 **-40%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.6M | ✅ | 25.1M | 🟢 **-62%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 60.0M | 🟢 **-22%** |
| type.json | type: array or object | 5 | ✅ | 72.0M | ✅ | 28.1M | 🟢 **-61%** |
| type.json | type: array, object or null | 5 | ✅ | 76.1M | ✅ | 56.3M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 82.8M | ✅ | 78.7M | -5% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 60.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 58.5M | -17% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 54.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.3M | ✅ | 63.7M | -19% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.6M | ✅ | 22.4M | 🟢 **-51%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.9M | ✅ | 67.5M | -17% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.1M | ✅ | 70.2M | 🔴 **+233%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 60.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 52.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 44.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 46.6M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.9M | ✅ | 75.0M | -18% |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.2M | ✅ | 59.2M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 42.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 56.3M | ✅ | 69.2M | 🔴 **+23%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 93.9M | ✅ | 26.9M | 🟢 **-71%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 36.1M | ✅ | 16.3M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 25.6M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 107.2M | 🔴 **+276%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 64.5M | 🔴 **+126%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.4M | ✅ | 65.1M | 🔴 **+129%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.4M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 17.3M | ✅ | 15.4M | -11% |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 6.7M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.3M | ✅ | 79.7M | -3% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.1M | ✅ | 60.1M | +15% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.9M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ✅ | 11.9M | 🟢 **-65%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 46.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 90.8M | ✅ | 72.1M | 🟢 **-21%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ✅ | 69.8M | -3% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.7M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 76.1M | ✅ | 31.6M | 🟢 **-58%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 67.6M | 🟢 **-24%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 69.5M | 🟢 **-22%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 38.9M | 🟢 **-39%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 63.1M | 🟢 **-20%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 64.7M | -18% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ✅ | 72.6M | -15% |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.3M | ✅ | 68.8M | +5% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 96.1M | ✅ | 62.9M | 🟢 **-35%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.7M | ✅ | 23.2M | 🟢 **-31%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ✅ | 40.7M | -16% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.8M | ✅ | 30.7M | 🟢 **-45%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.9M | ✅ | 20.6M | 🟢 **-51%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.3M | ✅ | 20.8M | 🟢 **-29%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 17.1M | ✅ | 28.6M | 🔴 **+67%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.2M | ✅ | 20.9M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ✅ | 28.8M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.5M | ✅ | 19.2M | 🟢 **-28%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 31.5M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.1M | ✅ | 20.9M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ✅ | 28.4M | +0% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 27.0M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.6M | ✅ | 25.2M | -18% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ✅ | 11.4M | 🟢 **-23%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.3M | ✅ | 14.3M | -6% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ✅ | 19.1M | 🟢 **-33%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.5M | ✅ | 10.0M | 🟢 **-52%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.1M | ✅ | 13.4M | 🟢 **-33%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.6M | ✅ | 6.2M | -19% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.1M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.4M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.7M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.4M | ✅ | 9.1M | 🟢 **-76%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.8M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.9M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.5M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.1M | ✅ | 71.2M | 🟢 **-26%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.2M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 26.4M | ✅ | 10.8M | 🟢 **-59%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 16.0M | ✅ | 13.0M | -19% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.3M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 66.2M | ✅ | 37.8M | 🟢 **-43%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 54.4M | ✅ | 26.0M | 🟢 **-52%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 55.3M | ✅ | 29.5M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 55.1M | ✅ | 25.9M | 🟢 **-53%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.6M | ✅ | 32.7M | 🟢 **-57%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 55.0M | ✅ | 26.0M | 🟢 **-53%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.5M | ❌ | - | - |
