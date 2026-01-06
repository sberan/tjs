# tjs vs is-my-json-valid Benchmarks

Performance comparison of **tjs** vs **[is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | is-my-json-valid pass | is-my-json-valid ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.8M | 163/199 | 14.9M | 163 | 🟢 **-44%** |
| draft6 | 276 | ✅ 276 | 29.3M | 182/276 | 15.5M | 182 | 🟢 **-47%** |
| draft7 | 313 | ✅ 313 | 15.6M | 193/313 | 18.4M | 193 | +18% |
| draft2019-09 | 435 | ✅ 435 | 17.4M | 231/435 | 19.9M | 231 | +14% |
| draft2020-12 | 448 | ✅ 448 | 19.3M | 219/448 | 19.1M | 219 | -1% |
| **Total** | 1671 | 1670/1671 | 19.5M | 988/1671 | 17.5M | 988 | -10% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.36x faster** (24 ns vs 57 ns per test, 3702 tests in 988 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 6.1M | -17% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 90.0M | ✅ | 59.1M | 🟢 **-34%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.5M | ✅ | 38.2M | 🟢 **-74%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 93.8M | ✅ | 75.0M | 🟢 **-20%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 45.9M | 🟢 **-63%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.7M | ✅ | 20.0M | 🟢 **-57%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 57.4M | ✅ | 21.4M | 🟢 **-63%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 45.1M | 🟢 **-38%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.0M | ✅ | 72.1M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 39.9M | ✅ | 17.7M | 🟢 **-56%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 24.7M | ✅ | 11.4M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.1M | ✅ | 27.4M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 37.0M | ✅ | 19.2M | 🟢 **-48%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 80.9M | ✅ | 106.5M | 🔴 **+32%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 34.0M | ✅ | 9.4M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.5M | ✅ | 50.8M | -3% |
| allOf.json | allOf | 4 | ✅ | 47.7M | ✅ | 18.6M | 🟢 **-61%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.6M | ✅ | 20.4M | 🟢 **-26%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 27.5M | 🟢 **-75%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 90.0M | ✅ | 114.6M | 🔴 **+27%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.0M | ✅ | 71.9M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 58.7M | 🟢 **-24%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.9M | ✅ | 30.4M | 🟢 **-74%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 60.9M | 🟢 **-23%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.5M | ✅ | 15.4M | 🟢 **-81%** |
| anyOf.json | anyOf | 4 | ✅ | 76.1M | ✅ | 68.2M | -10% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.2M | ✅ | 25.3M | 🟢 **-44%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.7M | ✅ | 47.6M | -6% |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 163.0M | ✅ | 70.5M | 🟢 **-57%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 29.3M | 🟢 **-63%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 98.5M | -9% |
| default.json | invalid string value for default | 2 | ✅ | 54.6M | ✅ | 63.5M | +16% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.4M | ✅ | 30.8M | 🟢 **-61%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.3M | ✅ | 42.2M | 🟢 **-54%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.5M | ✅ | 33.4M | -3% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.8M | ✅ | 21.9M | 🟢 **-63%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.5M | ✅ | 13.4M | +17% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 43.4M | ✅ | 36.0M | -17% |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 30.9M | 🟢 **-59%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 967K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 15.1M | ✅ | 33.5M | 🔴 **+121%** |
| enum.json | enum with escaped characters | 3 | ✅ | 57.9M | ✅ | 32.0M | 🟢 **-45%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.3M | ✅ | 25.7M | 🟢 **-77%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.6M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.6M | ✅ | 25.2M | 🟢 **-77%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.4M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 35.7M | 🟢 **-69%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 69.0M | ✅ | 4.9M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 35.2M | 🟢 **-68%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.5M | ✅ | 4.8M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 24.9M | 🟢 **-73%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 43.7M | 🟢 **-25%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 27.5M | 🟢 **-71%** |
| format.json | email format | 6 | ✅ | 92.5M | ✅ | 116.2M | 🔴 **+26%** |
| format.json | ipv4 format | 6 | ✅ | 160.9M | ✅ | 69.0M | 🟢 **-57%** |
| format.json | ipv6 format | 6 | ✅ | 92.5M | ✅ | 67.1M | 🟢 **-27%** |
| format.json | hostname format | 6 | ✅ | 163.5M | ✅ | 118.9M | 🟢 **-27%** |
| format.json | date-time format | 6 | ✅ | 92.5M | ✅ | 66.8M | 🟢 **-28%** |
| format.json | uri format | 6 | ✅ | 163.0M | ✅ | 68.2M | 🟢 **-58%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.7M | ✅ | 15.1M | 🟢 **-66%** |
| items.json | a schema given for items | 4 | ✅ | 81.0M | ✅ | 32.9M | 🟢 **-59%** |
| items.json | an array of schemas for items | 6 | ✅ | 68.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 27.6M | ✅ | 6.4M | 🟢 **-77%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 3.2M | 🟢 **-74%** |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 60.9M | -19% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 79.4M | -2% |
| maxItems.json | maxItems validation | 4 | ✅ | 78.8M | ✅ | 40.7M | 🟢 **-48%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.0M | ✅ | 38.8M | 🟢 **-33%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ✅ | 39.4M | 🟢 **-23%** |
| maximum.json | maximum validation | 4 | ✅ | 76.2M | ✅ | 28.2M | 🟢 **-63%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ✅ | 36.3M | 🟢 **-52%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 39.8M | 🟢 **-48%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 69.9M | ✅ | 53.4M | 🟢 **-24%** |
| minItems.json | minItems validation | 4 | ✅ | 80.3M | ✅ | 40.5M | 🟢 **-50%** |
| minLength.json | minLength validation | 5 | ✅ | 58.4M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.6M | ✅ | 38.9M | 🟢 **-35%** |
| minimum.json | minimum validation | 4 | ✅ | 76.8M | ✅ | 67.0M | -13% |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.8M | ✅ | 38.9M | 🟢 **-49%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 70.3M | ✅ | 55.5M | 🟢 **-21%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 70.6M | ✅ | 38.8M | 🟢 **-45%** |
| multipleOf.json | by int | 3 | ✅ | 77.7M | ✅ | 49.1M | 🟢 **-37%** |
| multipleOf.json | by number | 3 | ✅ | 63.5M | ✅ | 3.8M | 🟢 **-94%** |
| multipleOf.json | by small number | 2 | ✅ | 66.5M | ✅ | 2.3M | 🟢 **-97%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 28.2M | 🟢 **-63%** |
| not.json | not multiple types | 3 | ✅ | 69.7M | ✅ | 43.4M | 🟢 **-38%** |
| not.json | not more complex schema | 3 | ✅ | 69.1M | ✅ | 32.8M | 🟢 **-52%** |
| not.json | forbidden property | 2 | ✅ | 53.9M | ✅ | 58.7M | +9% |
| not.json | forbid everything with empty schema | 9 | ✅ | 64.3M | ✅ | 18.8M | 🟢 **-71%** |
| not.json | double negation | 1 | ✅ | 89.6M | ✅ | 116.5M | 🔴 **+30%** |
| oneOf.json | oneOf | 4 | ✅ | 31.0M | ✅ | 27.6M | -11% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.9M | ✅ | 30.5M | -7% |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.5M | ✅ | 22.7M | 🟢 **-48%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 75.9M | ✅ | 46.8M | 🟢 **-38%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.6M | ✅ | 23.6M | 🟢 **-51%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 29.2M | 🟢 **-41%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 28.9M | 🟢 **-62%** |
| pattern.json | pattern validation | 8 | ✅ | 52.1M | ✅ | 60.9M | +17% |
| pattern.json | pattern is not anchored | 1 | ✅ | 22.4M | ✅ | 23.8M | +6% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.6M | ✅ | 7.2M | 🟢 **-73%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.6M | ✅ | 5.5M | 🟢 **-62%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.4M | ✅ | 11.9M | 🟢 **-27%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.0M | ✅ | 18.8M | +18% |
| properties.json | object properties validation | 6 | ✅ | 54.0M | ✅ | 48.0M | -11% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 5.0M | 🟢 **-75%** |
| properties.json | properties with escaped characters | 2 | ✅ | 42.0M | ✅ | 31.7M | 🟢 **-25%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 65.6M | -6% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.3M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.9M | ✅ | 16.5M | 🟢 **-36%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ✅ | 27.9M | 🟢 **-40%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.2M | ✅ | 19.7M | 🟢 **-66%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.8M | ✅ | 23.7M | 🟢 **-49%** |
| ref.json | nested refs | 2 | ✅ | 38.6M | ✅ | 19.6M | 🟢 **-49%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 52.3M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ✅ | 25.0M | 🟢 **-68%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 51.8M | ✅ | 27.4M | 🟢 **-47%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.1M | ✅ | 21.5M | 🟢 **-59%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 49.9M | ✅ | 24.5M | 🟢 **-51%** |
| ref.json | Location-independent identifier | 2 | ✅ | 77.0M | ✅ | 28.4M | 🟢 **-63%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 53.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 53.6M | ✅ | 3.3M | 🟢 **-94%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 71.6M | ✅ | 25.1M | 🟢 **-65%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.0M | ✅ | 28.8M | 🟢 **-63%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 51.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 45.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 32.5M | ✅ | 32.6M | +0% |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 110.1M | 🔴 **+22%** |
| required.json | required with escaped characters | 2 | ✅ | 51.1M | ✅ | 15.8M | 🟢 **-69%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 64.6M | ✅ | 21.4M | 🟢 **-67%** |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 45.7M | 🟢 **-34%** |
| type.json | string type matches strings | 9 | ✅ | 68.6M | ✅ | 25.5M | 🟢 **-63%** |
| type.json | object type matches objects | 7 | ✅ | 58.2M | ✅ | 39.7M | 🟢 **-32%** |
| type.json | array type matches arrays | 7 | ✅ | 64.3M | ✅ | 21.1M | 🟢 **-67%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 22.7M | 🟢 **-66%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.6M | ✅ | 39.5M | 🟢 **-40%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.2M | ✅ | 23.7M | 🟢 **-64%** |
| type.json | type as array with one item | 2 | ✅ | 59.6M | ✅ | 59.9M | +1% |
| type.json | type: array or object | 5 | ✅ | 50.6M | ✅ | 26.8M | 🟢 **-47%** |
| type.json | type: array, object or null | 5 | ✅ | 70.6M | ✅ | 56.3M | 🟢 **-20%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ✅ | 10.6M | 🟢 **-68%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.8M | ✅ | 12.3M | 🟢 **-35%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.5M | ✅ | 68.6M | 🟢 **-25%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 59.0M | -18% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.7M | ✅ | 31.7M | 🟢 **-56%** |
| optional/bignum.json | integer | 2 | ✅ | 88.0M | ✅ | 97.0M | +10% |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 62.0M | 🟢 **-30%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 19.8M | 🟢 **-69%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 96.2M | 🔴 **+22%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 19.2M | 🟢 **-68%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 96.5M | 🔴 **+22%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 19.2M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.6M | ✅ | 28.6M | +0% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 19.8M | 🟢 **-33%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.5M | ✅ | 25.0M | -9% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.0M | ✅ | 19.3M | 🟢 **-31%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.5M | ✅ | 26.5M | -7% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 21.7M | -16% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.8M | ✅ | 27.8M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ✅ | 20.0M | 🟢 **-29%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.1M | ✅ | 33.7M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 15.8M | 🟢 **-48%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ✅ | 11.0M | 🟢 **-29%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 13.7M | -8% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.4M | ✅ | 17.4M | 🟢 **-39%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 9.9M | 🟢 **-52%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.1M | ✅ | 13.5M | 🟢 **-33%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 6.2M | 🟢 **-20%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.2M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.3M | ✅ | 5.3M | 🟢 **-53%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.4M | ✅ | 10.6M | 🟢 **-72%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.6M | ✅ | 70.7M | 🟢 **-26%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.0M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.2M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 6.2M | -14% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 39.1M | ✅ | 10.7M | 🟢 **-73%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 90.6M | 🟢 **-41%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.2M | ✅ | 29.3M | 🟢 **-60%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ✅ | 115.3M | 🟢 **-30%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 47.5M | 🟢 **-41%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.7M | ✅ | 19.9M | 🟢 **-64%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.6M | ✅ | 18.6M | 🟢 **-58%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.4M | ✅ | 45.2M | 🟢 **-58%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 72.1M | -11% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.7M | ✅ | 17.1M | 🟢 **-63%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.2M | ✅ | 10.8M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.6M | ✅ | 27.9M | 🟢 **-35%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.4M | ✅ | 19.1M | 🟢 **-48%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.9M | ✅ | 109.9M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.1M | ✅ | 9.4M | 🟢 **-68%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 50.7M | 🟢 **-27%** |
| allOf.json | allOf | 4 | ✅ | 40.1M | ✅ | 18.7M | 🟢 **-53%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.2M | ✅ | 20.4M | 🟢 **-32%** |
| allOf.json | allOf simple types | 2 | ✅ | 58.9M | ✅ | 16.8M | 🟢 **-72%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.1M | ✅ | 76.6M | 🟢 **-50%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 65.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.4M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 72.1M | -11% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.6M | ✅ | 103.6M | 🟢 **-32%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 29.0M | 🟢 **-62%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.6M | ✅ | 56.9M | 🟢 **-52%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.5M | ✅ | 29.4M | 🟢 **-63%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.7M | ✅ | 31.2M | 🟢 **-63%** |
| anyOf.json | anyOf | 4 | ✅ | 80.1M | ✅ | 38.1M | 🟢 **-52%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.2M | ✅ | 45.1M | 0% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 89.0M | ✅ | 72.1M | -19% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.8M | ✅ | 116.5M | 🟢 **-24%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.9M | ✅ | 31.1M | 🟢 **-57%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 114.1M | 🔴 **+36%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.4M | ✅ | 27.3M | 🟢 **-77%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.3M | ✅ | 120.0M | 🔴 **+53%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 85.0M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 82.4M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 50.0M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.3M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.5M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 76.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.1M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 65.4M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.9M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 62.9M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 112.6M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 99.1M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 62.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 49.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 70.3M | -9% |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 98.4M | -9% |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 63.7M | +15% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 75.9M | ✅ | 31.0M | 🟢 **-59%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.6M | ✅ | 42.6M | 🟢 **-53%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 95.6M | -1% |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.5M | ✅ | 22.4M | 🟢 **-43%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.7M | ✅ | 39.0M | -16% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.3M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 15.6M | ✅ | 13.0M | -16% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 46.9M | ✅ | 35.8M | 🟢 **-24%** |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 29.0M | 🟢 **-61%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 971K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.5M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 15.8M | ✅ | 37.4M | 🔴 **+137%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ✅ | 36.0M | 🟢 **-55%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.1M | ✅ | 45.5M | 🟢 **-59%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.0M | ✅ | 4.2M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.1M | ✅ | 46.0M | 🟢 **-59%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.5M | ✅ | 4.0M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 108.7M | ✅ | 64.6M | 🟢 **-41%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 109.9M | ✅ | 57.9M | 🟢 **-47%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.1M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 90.7M | ✅ | 45.1M | 🟢 **-50%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 107.6M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 92.3M | ✅ | 68.4M | 🟢 **-26%** |
| format.json | ipv4 format | 6 | ✅ | 161.5M | ✅ | 66.8M | 🟢 **-59%** |
| format.json | ipv6 format | 6 | ✅ | 93.0M | ✅ | 115.4M | 🔴 **+24%** |
| format.json | hostname format | 6 | ✅ | 162.9M | ✅ | 66.2M | 🟢 **-59%** |
| format.json | date-time format | 6 | ✅ | 91.6M | ✅ | 68.2M | 🟢 **-26%** |
| format.json | json-pointer format | 6 | ✅ | 162.7M | ✅ | 107.8M | 🟢 **-34%** |
| format.json | uri format | 6 | ✅ | 92.9M | ✅ | 67.8M | 🟢 **-27%** |
| format.json | uri-reference format | 6 | ✅ | 163.5M | ✅ | 68.7M | 🟢 **-58%** |
| format.json | uri-template format | 6 | ✅ | 93.0M | ✅ | 63.6M | 🟢 **-32%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 25.2M | ✅ | 6.7M | 🟢 **-73%** |
| items.json | a schema given for items | 4 | ✅ | 27.4M | ✅ | 48.8M | 🔴 **+78%** |
| items.json | an array of schemas for items | 6 | ✅ | 96.1M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 72.1M | ✅ | 61.7M | -14% |
| items.json | items with boolean schema (false) | 2 | ✅ | 40.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 28.0M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 16.0M | ✅ | 7.6M | 🟢 **-52%** |
| items.json | nested items | 3 | ✅ | 12.9M | ✅ | 2.2M | 🟢 **-83%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 93.6M | 🔴 **+24%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 49.1M | 🟢 **-39%** |
| maxItems.json | maxItems validation | 4 | ✅ | 78.7M | ✅ | 68.5M | -13% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 28.6M | 🟢 **-61%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.0M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 45.8M | ✅ | 28.5M | 🟢 **-38%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.1M | ✅ | 30.6M | 🟢 **-44%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.0M | ✅ | 23.2M | 🟢 **-51%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 45.2M | ✅ | 23.1M | 🟢 **-49%** |
| maximum.json | maximum validation | 4 | ✅ | 75.8M | ✅ | 58.8M | 🟢 **-22%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 39.0M | ✅ | 39.6M | +1% |
| minItems.json | minItems validation | 4 | ✅ | 69.9M | ✅ | 73.6M | +5% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 28.1M | 🟢 **-61%** |
| minLength.json | minLength validation | 5 | ✅ | 57.6M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.0M | ✅ | 28.6M | 🟢 **-49%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.7M | ✅ | 58.0M | -3% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.6M | ✅ | 12.8M | 🟢 **-74%** |
| minimum.json | minimum validation | 4 | ✅ | 75.8M | ✅ | 71.4M | -6% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.9M | ✅ | 39.0M | 🟢 **-46%** |
| multipleOf.json | by int | 3 | ✅ | 72.9M | ✅ | 37.1M | 🟢 **-49%** |
| multipleOf.json | by number | 3 | ✅ | 70.7M | ✅ | 3.7M | 🟢 **-95%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 2.3M | 🟢 **-97%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 27.6M | 🟢 **-64%** |
| not.json | not multiple types | 3 | ✅ | 70.8M | ✅ | 45.1M | 🟢 **-36%** |
| not.json | not more complex schema | 3 | ✅ | 66.6M | ✅ | 33.6M | 🟢 **-50%** |
| not.json | forbidden property | 2 | ✅ | 51.6M | ✅ | 58.6M | +14% |
| not.json | forbid everything with empty schema | 9 | ✅ | 63.9M | ✅ | 18.8M | 🟢 **-71%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 58.9M | ✅ | 33.0M | 🟢 **-44%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.1M | ✅ | 70.8M | 🟢 **-22%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 60.9M | 🟢 **-32%** |
| oneOf.json | oneOf | 4 | ✅ | 72.3M | ✅ | 39.9M | 🟢 **-45%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.8M | ✅ | 24.8M | 🟢 **-22%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 38.7M | 🟢 **-41%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 19.4M | 🟢 **-71%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.8M | ✅ | 38.1M | 🟢 **-40%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.2M | ✅ | 22.6M | 🟢 **-49%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 51.8M | 🟢 **-32%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.1M | ✅ | 23.6M | 🟢 **-51%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.4M | ✅ | 37.8M | 🟢 **-24%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 27.0M | 🟢 **-65%** |
| pattern.json | pattern validation | 8 | ✅ | 55.1M | ✅ | 61.4M | +11% |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 22.9M | -9% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.0M | ✅ | 10.9M | 🟢 **-55%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ✅ | 4.8M | 🟢 **-67%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 11.5M | 🟢 **-27%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.3M | ✅ | 16.4M | +1% |
| properties.json | object properties validation | 6 | ✅ | 56.0M | ✅ | 49.0M | -13% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.7M | ✅ | 4.9M | 🟢 **-75%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 50.5M | ✅ | 12.8M | 🟢 **-75%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 107.8M | 🔴 **+54%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 73.0M | 🟢 **-22%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.3M | ✅ | 16.5M | 🟢 **-37%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.3M | ✅ | 27.9M | 🟢 **-50%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.4M | ✅ | 20.1M | 🟢 **-62%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.2M | ✅ | 23.6M | 🟢 **-50%** |
| ref.json | nested refs | 2 | ✅ | 38.4M | ✅ | 20.0M | 🟢 **-48%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.8M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.5M | ✅ | 28.9M | 🟢 **-47%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.9M | ✅ | 28.4M | 🟢 **-48%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 47.5M | ✅ | 52.9M | +11% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 35.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 55.2M | ✅ | 24.6M | 🟢 **-55%** |
| ref.json | Location-independent identifier | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 51.9M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 3.0M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.3M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.9M | ✅ | 25.0M | 🟢 **-54%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.9M | ✅ | 28.5M | 🟢 **-48%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.5M | ✅ | 24.8M | 🟢 **-51%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.7M | ✅ | 28.1M | 🟢 **-44%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.5M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.8M | ✅ | 25.1M | 🟢 **-67%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 28.7M | 🟢 **-63%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 50.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.8M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 40.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 42.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.5M | ✅ | 32.4M | 🟢 **-50%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 109.8M | 🔴 **+22%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 57.7M | 🟢 **-36%** |
| required.json | required with escaped characters | 2 | ✅ | 52.9M | ✅ | 33.2M | 🟢 **-37%** |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 64.3M | ✅ | 23.2M | 🟢 **-64%** |
| type.json | number type matches numbers | 9 | ✅ | 67.8M | ✅ | 48.1M | 🟢 **-29%** |
| type.json | string type matches strings | 9 | ✅ | 67.4M | ✅ | 25.3M | 🟢 **-63%** |
| type.json | object type matches objects | 7 | ✅ | 57.1M | ✅ | 21.6M | 🟢 **-62%** |
| type.json | array type matches arrays | 7 | ✅ | 62.8M | ✅ | 40.3M | 🟢 **-36%** |
| type.json | boolean type matches booleans | 10 | ✅ | 64.9M | ✅ | 22.6M | 🟢 **-65%** |
| type.json | null type matches only the null object | 10 | ✅ | 64.4M | ✅ | 20.7M | 🟢 **-68%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 64.9M | ✅ | 40.8M | 🟢 **-37%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 29.1M | 🟢 **-62%** |
| type.json | type: array or object | 5 | ✅ | 67.2M | ✅ | 26.7M | 🟢 **-60%** |
| type.json | type: array, object or null | 5 | ✅ | 77.0M | ✅ | 56.6M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.6M | ✅ | 10.6M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ✅ | 12.0M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 90.5M | ✅ | 69.2M | 🟢 **-24%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.2M | ✅ | 45.7M | 🟢 **-35%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.5M | ✅ | 46.5M | 🟢 **-27%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 63.6M | 🟢 **-28%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 61.9M | 🟢 **-30%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 39.3M | 🟢 **-38%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 61.4M | 🟢 **-22%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 61.6M | 🟢 **-22%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 24.1M | ✅ | 19.3M | -20% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 28.5M | -3% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.8M | ✅ | 20.0M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.4M | ✅ | 28.1M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.6M | ✅ | 17.3M | 🟢 **-37%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.3M | ✅ | 31.2M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.5M | ✅ | 19.9M | 🟢 **-30%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ✅ | 26.9M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 33.5M | ✅ | 25.4M | 🟢 **-24%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 25.6M | -16% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.4M | ✅ | 11.1M | 🟢 **-28%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.0M | ✅ | 14.1M | +9% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.0M | ✅ | 18.1M | 🟢 **-30%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 9.3M | 🟢 **-54%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 13.4M | 🟢 **-32%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 6.4M | 🟢 **-21%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.0M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ✅ | 4.8M | 🟢 **-57%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.2M | ✅ | 10.4M | 🟢 **-76%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.1M | ✅ | 64.8M | 🟢 **-32%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.0M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.0M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 47.2M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 47.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.4M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.2M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 19.6M | ✅ | 6.1M | 🟢 **-69%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.9M | ✅ | 16.6M | 🟢 **-57%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 144.1M | ✅ | 90.4M | 🟢 **-37%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.1M | ✅ | 28.3M | 🟢 **-61%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 163.6M | ✅ | 117.4M | 🟢 **-28%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.6M | ✅ | 51.2M | 🟢 **-37%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.6M | ✅ | 19.9M | 🟢 **-64%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.1M | ✅ | 21.6M | 🟢 **-52%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 45.1M | 🟢 **-58%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 72.1M | -11% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.5M | ✅ | 16.3M | 🟢 **-64%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.0M | ✅ | 10.3M | 🟢 **-48%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.9M | ✅ | 27.7M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.8M | ✅ | 19.0M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 109.7M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 15.6M | ✅ | 9.0M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 50.8M | 🟢 **-27%** |
| allOf.json | allOf | 4 | ✅ | 40.4M | ✅ | 18.7M | 🟢 **-54%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.0M | ✅ | 20.5M | 🟢 **-29%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 27.4M | 🟢 **-62%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 114.5M | 🟢 **-25%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 80.7M | ✅ | 72.1M | -11% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.0M | ✅ | 56.4M | 🟢 **-63%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 52.5M | 🟢 **-32%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 30.0M | 🟢 **-75%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 61.1M | 🟢 **-22%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 131.2M | ✅ | 16.4M | 🟢 **-87%** |
| anyOf.json | anyOf | 4 | ✅ | 79.9M | ✅ | 68.1M | -15% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 44.3M | ✅ | 25.1M | 🟢 **-43%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 116.3M | 🔴 **+29%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.8M | ✅ | 72.0M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 61.2M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.5M | ✅ | 28.8M | 🟢 **-60%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 115.2M | 🔴 **+37%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.1M | ✅ | 29.4M | 🟢 **-75%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.3M | ✅ | 124.4M | 🔴 **+59%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 91.9M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 64.9M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.3M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 53.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 65.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 65.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.2M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.0M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.2M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 111.9M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 52.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 89.1M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 99.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 62.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.7M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ✅ | 70.5M | 🟢 **-43%** |
| default.json | invalid type for default | 2 | ✅ | 71.6M | ✅ | 98.4M | 🔴 **+38%** |
| default.json | invalid string value for default | 2 | ✅ | 73.5M | ✅ | 60.1M | -18% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.4M | ✅ | 31.1M | 🟢 **-41%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 65.4M | ✅ | 42.8M | 🟢 **-35%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 95.4M | -1% |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.5M | ✅ | 22.1M | 🟢 **-36%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 47.6M | ✅ | 39.3M | -18% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 61.4M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.4M | ✅ | 13.6M | +18% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 37.9M | ✅ | 35.6M | -6% |
| enum.json | simple enum validation | 2 | ✅ | 74.6M | ✅ | 29.0M | 🟢 **-61%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.7M | ✅ | 956K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 15.0M | ✅ | 37.7M | 🔴 **+152%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ✅ | 35.8M | 🟢 **-56%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.1M | ✅ | 25.5M | 🟢 **-66%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.6M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.0M | ✅ | 24.9M | 🟢 **-67%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.6M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 35.4M | 🟢 **-53%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 4.8M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.7M | ✅ | 33.9M | 🟢 **-54%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.0M | ✅ | 4.8M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.7M | ✅ | 27.2M | 🟢 **-58%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.6M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 90.8M | ✅ | 68.0M | 🟢 **-25%** |
| format.json | idn-email format | 6 | ✅ | 93.0M | ✅ | 64.7M | 🟢 **-30%** |
| format.json | regex format | 6 | ✅ | 93.0M | ✅ | 118.0M | 🔴 **+27%** |
| format.json | ipv4 format | 6 | ✅ | 92.7M | ✅ | 67.1M | 🟢 **-28%** |
| format.json | ipv6 format | 6 | ✅ | 92.9M | ✅ | 67.9M | 🟢 **-27%** |
| format.json | idn-hostname format | 6 | ✅ | 92.5M | ✅ | 110.6M | +20% |
| format.json | hostname format | 6 | ✅ | 92.9M | ✅ | 67.2M | 🟢 **-28%** |
| format.json | date format | 6 | ✅ | 92.8M | ✅ | 66.9M | 🟢 **-28%** |
| format.json | date-time format | 6 | ✅ | 92.4M | ✅ | 69.2M | 🟢 **-25%** |
| format.json | time format | 6 | ✅ | 93.0M | ✅ | 119.2M | 🔴 **+28%** |
| format.json | json-pointer format | 6 | ✅ | 93.0M | ✅ | 64.7M | 🟢 **-30%** |
| format.json | relative-json-pointer format | 6 | ✅ | 92.8M | ✅ | 75.4M | -19% |
| format.json | iri format | 6 | ✅ | 92.9M | ✅ | 62.7M | 🟢 **-32%** |
| format.json | iri-reference format | 6 | ✅ | 93.1M | ✅ | 75.6M | -19% |
| format.json | uri format | 6 | ✅ | 83.9M | ✅ | 67.0M | 🟢 **-20%** |
| format.json | uri-reference format | 6 | ✅ | 90.7M | ✅ | 126.4M | 🔴 **+39%** |
| format.json | uri-template format | 6 | ✅ | 92.7M | ✅ | 60.7M | 🟢 **-35%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 93.9M | ✅ | 121.7M | 🔴 **+30%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.9M | ✅ | 75.0M | 🟢 **-20%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.2M | ✅ | 62.2M | 🟢 **-26%** |
| if-then-else.json | if and then without else | 3 | ✅ | 74.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 75.0M | -11% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 75.4M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.2M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.9M | ✅ | 15.5M | 🟢 **-66%** |
| items.json | a schema given for items | 4 | ✅ | 54.6M | ✅ | 32.6M | 🟢 **-40%** |
| items.json | an array of schemas for items | 6 | ✅ | 68.1M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.8M | ✅ | 62.1M | 🟢 **-34%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 65.6M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 25.1M | ✅ | 7.7M | 🟢 **-70%** |
| items.json | nested items | 3 | ✅ | 12.4M | ✅ | 2.5M | 🟢 **-80%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 93.6M | 🔴 **+24%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 55.7M | 🟢 **-31%** |
| maxItems.json | maxItems validation | 4 | ✅ | 78.9M | ✅ | 74.7M | -5% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 30.0M | 🟢 **-59%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.3M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.4M | ✅ | 28.6M | 🟢 **-49%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.6M | ✅ | 59.0M | +1% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.2M | ✅ | 23.2M | 🟢 **-54%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.0M | ✅ | 38.8M | 🟢 **-21%** |
| maximum.json | maximum validation | 4 | ✅ | 78.6M | ✅ | 40.2M | 🟢 **-49%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 72.6M | -4% |
| minItems.json | minItems validation | 4 | ✅ | 78.9M | ✅ | 40.6M | 🟢 **-49%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 57.3M | 🟢 **-21%** |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.7M | ✅ | 28.7M | 🟢 **-49%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ✅ | 58.4M | -2% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.9M | ✅ | 23.3M | 🟢 **-54%** |
| minimum.json | minimum validation | 4 | ✅ | 69.7M | ✅ | 72.4M | +4% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 39.2M | 🟢 **-46%** |
| multipleOf.json | by int | 3 | ✅ | 77.4M | ✅ | 66.0M | -15% |
| multipleOf.json | by number | 3 | ✅ | 73.6M | ✅ | 3.8M | 🟢 **-95%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 2.3M | 🟢 **-97%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 76.9M | ✅ | 28.2M | 🟢 **-63%** |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 45.1M | 🟢 **-37%** |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 33.4M | 🟢 **-51%** |
| not.json | forbidden property | 2 | ✅ | 53.8M | ✅ | 58.8M | +9% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.0M | ✅ | 19.5M | 🟢 **-67%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.5M | ✅ | 33.7M | 🟢 **-44%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.2M | ✅ | 71.3M | 🟢 **-21%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 61.1M | 🟢 **-32%** |
| oneOf.json | oneOf | 4 | ✅ | 77.6M | ✅ | 49.0M | 🟢 **-37%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.9M | ✅ | 24.9M | 🟢 **-26%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 65.8M | ✅ | 39.1M | 🟢 **-41%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 17.3M | 🟢 **-74%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 39.1M | 🟢 **-41%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.4M | ✅ | 23.0M | 🟢 **-48%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 57.9M | 🟢 **-24%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.0M | ✅ | 23.8M | 🟢 **-50%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.7M | ✅ | 37.9M | 🟢 **-24%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.1M | ✅ | 30.4M | 🟢 **-60%** |
| pattern.json | pattern validation | 8 | ✅ | 54.5M | ✅ | 62.5M | +15% |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 23.8M | -6% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ✅ | 11.5M | 🟢 **-58%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 5.4M | 🟢 **-64%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.9M | ✅ | 12.5M | 🟢 **-22%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.1M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 18.7M | +4% |
| properties.json | object properties validation | 6 | ✅ | 56.4M | ✅ | 49.0M | -13% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 5.2M | 🟢 **-74%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 52.9M | ✅ | 12.9M | 🟢 **-76%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 108.0M | 🔴 **+54%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 73.0M | 🟢 **-22%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.3M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.0M | ✅ | 18.2M | 🟢 **-30%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 49.5M | ✅ | 24.6M | 🟢 **-50%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.3M | ✅ | 22.7M | 🟢 **-62%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.4M | ✅ | 23.6M | 🟢 **-47%** |
| ref.json | nested refs | 2 | ✅ | 39.1M | ✅ | 21.9M | 🟢 **-44%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 58.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 55.0M | ✅ | 28.8M | 🟢 **-48%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.4M | ✅ | 30.1M | 🟢 **-45%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ✅ | 52.8M | 🟢 **-41%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 53.4M | ✅ | 24.7M | 🟢 **-54%** |
| ref.json | Location-independent identifier | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 3.1M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 53.6M | ✅ | 25.0M | 🟢 **-53%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.1M | ✅ | 24.5M | 🟢 **-55%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 51.0M | ✅ | 28.6M | 🟢 **-44%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.2M | ✅ | 25.0M | 🟢 **-49%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.8M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.9M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 25.1M | 🟢 **-67%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.8M | ✅ | 26.3M | 🟢 **-66%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.4M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 45.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 43.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.6M | ✅ | 32.6M | 🟢 **-50%** |
| required.json | required default validation | 1 | ✅ | 89.9M | ✅ | 109.6M | 🔴 **+22%** |
| required.json | required with empty array | 1 | ✅ | 89.6M | ✅ | 57.6M | 🟢 **-36%** |
| required.json | required with escaped characters | 2 | ✅ | 54.1M | ✅ | 34.9M | 🟢 **-35%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 67.1M | ✅ | 23.1M | 🟢 **-66%** |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 47.7M | 🟢 **-31%** |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 25.4M | 🟢 **-63%** |
| type.json | object type matches objects | 7 | ✅ | 58.8M | ✅ | 21.5M | 🟢 **-63%** |
| type.json | array type matches arrays | 7 | ✅ | 63.9M | ✅ | 39.6M | 🟢 **-38%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.6M | ✅ | 22.6M | 🟢 **-66%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.9M | ✅ | 20.1M | 🟢 **-69%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ✅ | 45.4M | 🟢 **-32%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 29.6M | 🟢 **-62%** |
| type.json | type: array or object | 5 | ✅ | 72.1M | ✅ | 48.4M | 🟢 **-33%** |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 33.0M | 🟢 **-57%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.4M | ✅ | 10.6M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ✅ | 12.1M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.4M | ✅ | 68.7M | 🟢 **-25%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 45.4M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.6M | ✅ | 46.5M | 🟢 **-36%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 63.1M | 🟢 **-29%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 61.9M | 🟢 **-30%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 39.4M | 🟢 **-38%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 61.2M | 🟢 **-22%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 61.5M | 🟢 **-22%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.8M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 350K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.5M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 428K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.4M | ✅ | 20.0M | 🟢 **-32%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 27.6M | -6% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 19.8M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.4M | ✅ | 30.3M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 18.4M | 🟢 **-36%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.0M | ✅ | 31.5M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.6M | ✅ | 19.9M | 🟢 **-33%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ✅ | 30.6M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.3M | ✅ | 26.3M | +0% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 36.4M | ✅ | 25.9M | 🟢 **-29%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ✅ | 10.9M | 🟢 **-29%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 14.5M | -2% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.6M | ✅ | 18.2M | 🟢 **-34%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 26.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.5M | ✅ | 7.6M | 🟢 **-63%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 13.8M | 🟢 **-31%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 6.6M | -18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.3M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 20.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.7M | ✅ | 9.0M | 🟢 **-77%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.0M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.7M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.6M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 92.7M | ✅ | 62.6M | 🟢 **-32%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.5M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 59.5M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 59.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.4M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.7M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 25.7M | 🔴 **+247%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 14.2M | ✅ | 16.7M | +18% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.8M | ✅ | 91.2M | 🟢 **-40%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 59.4M | ✅ | 31.3M | 🟢 **-47%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 163.3M | ✅ | 126.8M | 🟢 **-22%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 64.2M | ✅ | 59.5M | -7% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.4M | ✅ | 15.7M | 🟢 **-71%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.3M | ✅ | 21.3M | 🟢 **-44%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 34.6M | 🟢 **-68%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 63.2M | ✅ | 80.6M | 🔴 **+28%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.4M | ✅ | 14.5M | 🟢 **-68%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 19.7M | ✅ | 10.7M | 🟢 **-46%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.8M | ✅ | 23.9M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 29.8M | ✅ | 18.5M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.4M | ✅ | 115.4M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 24.9M | ✅ | 9.0M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.2M | ✅ | 53.6M | 🟢 **-23%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 23.6M | ✅ | 11.8M | 🟢 **-50%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.8M | ✅ | 18.2M | 🟢 **-41%** |
| allOf.json | allOf | 4 | ✅ | 34.5M | ✅ | 18.4M | 🟢 **-47%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 17.9M | 🟢 **-42%** |
| allOf.json | allOf simple types | 2 | ✅ | 58.4M | ✅ | 28.7M | 🟢 **-51%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.6M | ✅ | 120.0M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 53.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 63.4M | ✅ | 79.9M | 🔴 **+26%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 120.0M | 🟢 **-22%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 61.1M | ✅ | 29.2M | 🟢 **-52%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 44.1M | 🟢 **-63%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 60.8M | ✅ | 29.8M | 🟢 **-51%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 24.6M | 🟢 **-71%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 61.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 42.3M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 60.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 62.3M | ✅ | 41.6M | 🟢 **-33%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 31.8M | ✅ | 36.3M | +14% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 69.6M | ✅ | 80.5M | +16% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 69.6M | ✅ | 126.2M | 🔴 **+81%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 54.0M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.5M | ✅ | 32.2M | 🟢 **-26%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 65.0M | ✅ | 124.3M | 🔴 **+91%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 61.6M | ✅ | 29.7M | 🟢 **-52%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 57.5M | ✅ | 112.9M | 🔴 **+97%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 51.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 53.6M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 36.3M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 48.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 61.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 58.7M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 57.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 53.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 53.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 53.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 51.9M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 57.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 54.4M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 58.4M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 53.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 49.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.0M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 53.2M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 51.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 57.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 56.5M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 34.9M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 62.0M | ✅ | 74.0M | +19% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 71.8M | ✅ | 129.8M | 🔴 **+81%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 72.1M | ✅ | 71.0M | -1% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 64.6M | ✅ | 75.9M | +18% |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 60.6M | ✅ | 66.4M | +10% |
| default.json | invalid type for default | 2 | ✅ | 54.3M | ✅ | 74.5M | 🔴 **+37%** |
| default.json | invalid string value for default | 2 | ✅ | 46.2M | ✅ | 30.6M | 🟢 **-34%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 44.1M | ✅ | 25.4M | 🟢 **-42%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 52.5M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 71.9M | ✅ | 75.1M | +5% |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 25.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 41.7M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 46.3M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.5M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 36.4M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 33.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 60.1M | ✅ | 27.7M | 🟢 **-54%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 40.7M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 59.7M | ✅ | 4.4M | 🟢 **-93%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 29.0M | 🔴 **+107%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.9M | ✅ | 35.4M | 🟢 **-42%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 59.2M | ✅ | 36.2M | 🟢 **-39%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 53.1M | ✅ | 4.6M | 🟢 **-91%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 46.0M | ✅ | 36.1M | 🟢 **-22%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 48.4M | ✅ | 4.5M | 🟢 **-91%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 58.2M | ✅ | 48.8M | -16% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 54.5M | ✅ | 4.9M | 🟢 **-91%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 57.7M | ✅ | 42.6M | 🟢 **-26%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 54.4M | ✅ | 4.9M | 🟢 **-91%** |
| enum.json | nul characters in strings | 2 | ✅ | 53.1M | ✅ | 37.7M | 🟢 **-29%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 47.6M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 52.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 67.1M | ✅ | 66.3M | -1% |
| format.json | idn-email format | 6 | ✅ | 67.4M | ✅ | 67.1M | 0% |
| format.json | regex format | 6 | ✅ | 59.6M | ✅ | 128.6M | 🔴 **+116%** |
| format.json | ipv4 format | 6 | ✅ | 59.6M | ✅ | 70.0M | +17% |
| format.json | ipv6 format | 6 | ✅ | 58.5M | ✅ | 74.2M | 🔴 **+27%** |
| format.json | idn-hostname format | 6 | ✅ | 59.7M | ✅ | 108.1M | 🔴 **+81%** |
| format.json | hostname format | 6 | ✅ | 59.4M | ✅ | 73.0M | 🔴 **+23%** |
| format.json | date format | 6 | ✅ | 59.8M | ✅ | 69.1M | +16% |
| format.json | date-time format | 6 | ✅ | 59.6M | ✅ | 107.8M | 🔴 **+81%** |
| format.json | time format | 6 | ✅ | 59.6M | ✅ | 70.4M | +18% |
| format.json | json-pointer format | 6 | ✅ | 59.7M | ✅ | 74.4M | 🔴 **+25%** |
| format.json | relative-json-pointer format | 6 | ✅ | 67.2M | ✅ | 62.5M | -7% |
| format.json | iri format | 6 | ✅ | 59.5M | ✅ | 74.6M | 🔴 **+25%** |
| format.json | iri-reference format | 6 | ✅ | 59.5M | ✅ | 70.1M | +18% |
| format.json | uri format | 6 | ✅ | 59.6M | ✅ | 121.6M | 🔴 **+104%** |
| format.json | uri-reference format | 6 | ✅ | 59.8M | ✅ | 74.9M | 🔴 **+25%** |
| format.json | uri-template format | 6 | ✅ | 59.2M | ✅ | 75.6M | 🔴 **+28%** |
| format.json | uuid format | 6 | ✅ | 59.6M | ✅ | 114.5M | 🔴 **+92%** |
| format.json | duration format | 6 | ✅ | 59.5M | ✅ | 63.1M | +6% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 64.8M | ✅ | 126.7M | 🔴 **+95%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 71.4M | ✅ | 83.0M | +16% |
| if-then-else.json | ignore else without if | 2 | ✅ | 64.8M | ✅ | 72.9M | +12% |
| if-then-else.json | if and then without else | 3 | ✅ | 60.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 60.0M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 57.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 64.4M | ✅ | 81.8M | 🔴 **+27%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 59.9M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 60.1M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 37.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.3M | ✅ | 15.2M | 🟢 **-60%** |
| items.json | a schema given for items | 4 | ✅ | 35.4M | ✅ | 32.3M | -9% |
| items.json | an array of schemas for items | 6 | ✅ | 54.4M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 71.2M | ✅ | 75.2M | +6% |
| items.json | items with boolean schema (false) | 2 | ✅ | 57.5M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 48.8M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 24.2M | ✅ | 5.8M | 🟢 **-76%** |
| items.json | nested items | 3 | ✅ | 11.8M | ✅ | 4.2M | 🟢 **-65%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 60.7M | ✅ | 68.7M | +13% |
| items.json | array-form items with null instance e... | 1 | ✅ | 57.6M | ✅ | 50.7M | -12% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 71.3M | ✅ | 126.1M | 🔴 **+77%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.3M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 54.4M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 46.5M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 51.4M | ✅ | 43.6M | -15% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 40.2M | ✅ | 41.0M | +2% |
| maxLength.json | maxLength validation | 5 | ✅ | 49.5M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 44.4M | ✅ | 29.6M | 🟢 **-33%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 45.3M | ✅ | 51.7M | +14% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.5M | ✅ | 23.4M | 🟢 **-44%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 38.7M | ✅ | 30.1M | 🟢 **-22%** |
| maximum.json | maximum validation | 4 | ✅ | 57.8M | ✅ | 42.5M | 🟢 **-26%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 53.2M | ✅ | 61.4M | +16% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 71.0M | ✅ | 81.6M | +15% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 48.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 45.5M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 54.4M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 46.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 46.1M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 71.2M | ✅ | 68.4M | -4% |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 56.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 53.5M | ✅ | 42.0M | 🟢 **-21%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 58.4M | ✅ | 43.9M | 🟢 **-25%** |
| minLength.json | minLength validation | 5 | ✅ | 46.2M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 46.0M | ✅ | 29.7M | 🟢 **-35%** |
| minProperties.json | minProperties validation | 6 | ✅ | 48.9M | ✅ | 54.1M | +11% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 35.1M | ✅ | 23.3M | 🟢 **-34%** |
| minimum.json | minimum validation | 4 | ✅ | 59.8M | ✅ | 61.0M | +2% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.4M | ✅ | 40.1M | 🟢 **-30%** |
| multipleOf.json | by int | 3 | ✅ | 57.6M | ✅ | 54.4M | -5% |
| multipleOf.json | by number | 3 | ✅ | 30.0M | ✅ | 3.6M | 🟢 **-88%** |
| multipleOf.json | by small number | 2 | ✅ | 54.5M | ✅ | 2.1M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 48.6M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 60.5M | ❌ | - | - |
| not.json | not | 2 | ✅ | 50.8M | ✅ | 29.0M | 🟢 **-43%** |
| not.json | not multiple types | 3 | ✅ | 50.8M | ✅ | 34.5M | 🟢 **-32%** |
| not.json | not more complex schema | 3 | ✅ | 53.6M | ✅ | 36.0M | 🟢 **-33%** |
| not.json | forbidden property | 2 | ✅ | 39.6M | ✅ | 43.4M | +9% |
| not.json | forbid everything with empty schema | 9 | ✅ | 27.5M | ✅ | 18.4M | 🟢 **-33%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 51.6M | ✅ | 27.5M | 🟢 **-47%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 35.3M | ✅ | 78.6M | 🔴 **+123%** |
| not.json | double negation | 1 | ✅ | 67.0M | ✅ | 65.7M | -2% |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 27.2M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 51.4M | ✅ | 27.7M | 🟢 **-46%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 29.8M | ✅ | 35.9M | 🔴 **+20%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 53.9M | ✅ | 18.2M | 🟢 **-66%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 69.8M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 47.3M | ✅ | 17.2M | 🟢 **-64%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 53.7M | ✅ | 26.4M | 🟢 **-51%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.6M | ✅ | 22.8M | 🟢 **-41%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.4M | ✅ | 43.2M | 🟢 **-28%** |
| oneOf.json | oneOf with required | 4 | ✅ | 42.0M | ✅ | 24.6M | 🟢 **-42%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 42.6M | ✅ | 32.8M | 🟢 **-23%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 60.5M | ✅ | 29.2M | 🟢 **-52%** |
| pattern.json | pattern validation | 8 | ✅ | 46.4M | ✅ | 57.7M | 🔴 **+24%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.5M | ✅ | 26.0M | 🔴 **+27%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 22.6M | ✅ | 11.7M | 🟢 **-48%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.3M | ✅ | 5.3M | 🟢 **-63%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 13.6M | ✅ | 12.4M | -9% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.6M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.1M | ✅ | 20.0M | +17% |
| properties.json | object properties validation | 6 | ✅ | 46.4M | ✅ | 41.1M | -11% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.9M | ✅ | 4.7M | 🟢 **-74%** |
| properties.json | properties with boolean schema | 4 | ✅ | 41.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 41.0M | ✅ | 13.2M | 🟢 **-68%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 57.2M | ✅ | 116.7M | 🔴 **+104%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 22.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 35.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.5M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 61.8M | ✅ | 77.2M | 🔴 **+25%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 35.0M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 37.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 12.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.9M | ✅ | 41.4M | 🔴 **+1345%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 10.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.6M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 3.9M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 20.0M | ✅ | 17.2M | -14% |
| ref.json | relative pointer ref to object | 2 | ✅ | 42.9M | ✅ | 28.2M | 🟢 **-34%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.8M | ✅ | 21.1M | 🟢 **-55%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.3M | ✅ | 24.8M | 🟢 **-39%** |
| ref.json | nested refs | 2 | ✅ | 34.6M | ✅ | 22.0M | 🟢 **-36%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 38.2M | ✅ | 22.6M | 🟢 **-41%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 43.9M | ✅ | 28.9M | 🟢 **-34%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 43.9M | ✅ | 29.1M | 🟢 **-34%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 54.8M | ✅ | 61.2M | +12% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 54.0M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.0M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 44.1M | ✅ | 26.6M | 🟢 **-40%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 23.6M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 46.6M | ✅ | 3.2M | 🟢 **-93%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 30.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 30.0M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 42.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 39.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 59.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 34.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 35.0M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 39.6M | ✅ | 26.6M | 🟢 **-33%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 36.8M | ✅ | 29.6M | -20% |
| ref.json | URN base URI with r-component | 2 | ✅ | 37.2M | ✅ | 27.2M | 🟢 **-27%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 37.5M | ✅ | 29.5M | 🟢 **-21%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 41.3M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 36.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 39.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 42.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 37.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 39.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 61.1M | ✅ | 26.7M | 🟢 **-56%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 61.2M | ✅ | 29.8M | 🟢 **-51%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.1M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.5M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 42.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 37.2M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 41.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 26.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 32.6M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 27.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 35.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 39.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 42.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 35.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 38.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.1M | ✅ | 32.9M | 🟢 **-38%** |
| required.json | required default validation | 1 | ✅ | 68.3M | ✅ | 115.2M | 🔴 **+69%** |
| required.json | required with empty array | 1 | ✅ | 69.8M | ✅ | 66.2M | -5% |
| required.json | required with escaped characters | 2 | ✅ | 43.2M | ✅ | 28.2M | 🟢 **-35%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 53.9M | ✅ | 22.9M | 🟢 **-58%** |
| type.json | number type matches numbers | 9 | ✅ | 54.9M | ✅ | 37.1M | 🟢 **-33%** |
| type.json | string type matches strings | 9 | ✅ | 55.2M | ✅ | 25.9M | 🟢 **-53%** |
| type.json | object type matches objects | 7 | ✅ | 48.5M | ✅ | 29.2M | 🟢 **-40%** |
| type.json | array type matches arrays | 7 | ✅ | 51.3M | ✅ | 22.1M | 🟢 **-57%** |
| type.json | boolean type matches booleans | 10 | ✅ | 37.6M | ✅ | 31.8M | -15% |
| type.json | null type matches only the null object | 10 | ✅ | 50.7M | ✅ | 21.1M | 🟢 **-58%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.1M | ✅ | 35.2M | 🟢 **-34%** |
| type.json | type as array with one item | 2 | ✅ | 60.9M | ✅ | 30.5M | 🟢 **-50%** |
| type.json | type: array or object | 5 | ✅ | 54.2M | ✅ | 39.0M | 🟢 **-28%** |
| type.json | type: array, object or null | 5 | ✅ | 57.2M | ✅ | 33.5M | 🟢 **-41%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 65.2M | ✅ | 126.2M | 🔴 **+94%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 47.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 43.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 57.4M | ✅ | 64.9M | +13% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 45.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 62.9M | ✅ | 50.7M | -19% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 37.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 33.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 42.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 64.1M | ✅ | 62.3M | -3% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.6M | ✅ | 55.6M | 🔴 **+184%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 47.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 41.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 41.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.5M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.0M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 54.3M | ✅ | 81.4M | 🔴 **+50%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 60.8M | ✅ | 59.4M | -2% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 36.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 48.8M | ✅ | 68.8M | 🔴 **+41%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 29.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 56.2M | ✅ | 36.4M | 🟢 **-35%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 27.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 56.3M | ✅ | 27.7M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.8M | ✅ | 89.9M | 🔴 **+212%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 25.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 24.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.8M | ✅ | 60.2M | 🔴 **+109%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.0M | ✅ | 59.0M | 🔴 **+111%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 33.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 16.5M | ✅ | 14.8M | -10% |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 6.9M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 60.6M | ✅ | 82.5M | 🔴 **+36%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 44.8M | ✅ | 59.4M | 🔴 **+32%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 23.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.4M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 20.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.2M | ✅ | 10.2M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.8M | ✅ | 9.4M | 🟢 **-47%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 67.3M | ✅ | 74.3M | +10% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 49.9M | ✅ | 52.4M | +5% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 53.9M | ✅ | 45.5M | -16% |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 44.4M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 61.5M | ✅ | 29.9M | 🟢 **-51%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 49.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 67.6M | ✅ | 74.5M | +10% |
| optional/bignum.json | number | 2 | ✅ | 68.2M | ✅ | 75.2M | +10% |
| optional/bignum.json | string | 1 | ✅ | 50.9M | ✅ | 24.6M | 🟢 **-52%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 63.3M | ✅ | 65.9M | +4% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.1M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 63.3M | ✅ | 71.9M | +14% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 50.1M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 13.3M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 58.2M | ✅ | 65.7M | +13% |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 33.7M | ✅ | 66.7M | 🔴 **+98%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 69.4M | ✅ | 70.5M | +2% |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 29.6M | ✅ | 21.3M | 🟢 **-28%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 41.7M | ✅ | 35.6M | -15% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 46.4M | ✅ | 30.0M | 🟢 **-35%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 47.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 36.0M | ✅ | 19.2M | 🟢 **-47%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 25.1M | ✅ | 25.2M | +0% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.9M | ✅ | 20.5M | +8% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.4M | ✅ | 24.9M | +2% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.4M | ✅ | 20.3M | -17% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.6M | ✅ | 22.2M | -14% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.2M | ✅ | 23.2M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.5M | ✅ | 25.0M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.4M | ✅ | 18.9M | 🟢 **-22%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.2M | ✅ | 33.6M | 🔴 **+39%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.5M | ✅ | 16.1M | 🟢 **-42%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.7M | ✅ | 12.0M | -18% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.1M | ✅ | 14.4M | +2% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.6M | ✅ | 18.1M | 🟢 **-30%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.1M | ✅ | 9.5M | 🟢 **-50%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.6M | ✅ | 12.6M | 🟢 **-32%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 6.1M | 🟢 **-21%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 14.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 36.2M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.5M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.0M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.6M | ✅ | 7.6M | 🟢 **-80%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.2M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 29.3M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.2M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 54.4M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 36.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 68.2M | ✅ | 71.6M | +5% |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.4M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 14.7M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 13.8M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 30.3M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 52.9M | ✅ | 37.8M | 🟢 **-29%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 44.1M | ✅ | 26.9M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 43.8M | ✅ | 28.8M | 🟢 **-34%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.1M | ✅ | 26.2M | 🟢 **-40%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 60.6M | ✅ | 29.5M | 🟢 **-51%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 43.1M | ✅ | 26.2M | 🟢 **-39%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.1M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 39.9M | ✅ | 16.8M | 🟢 **-58%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.7M | ✅ | 11.0M | 🟢 **-49%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 27.3M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.5M | ✅ | 18.6M | 🟢 **-45%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 110.2M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.6M | ✅ | 9.1M | 🟢 **-68%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 50.8M | 🟢 **-27%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.3M | ✅ | 12.0M | 🟢 **-53%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.0M | ✅ | 24.6M | 🟢 **-21%** |
| allOf.json | allOf | 4 | ✅ | 39.6M | ✅ | 17.8M | 🟢 **-55%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.0M | ✅ | 19.5M | 🟢 **-33%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 25.8M | 🟢 **-65%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.7M | ✅ | 113.9M | 🟢 **-25%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 65.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 91.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 90.0M | ✅ | 68.4M | 🟢 **-24%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 114.7M | 🟢 **-25%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 27.4M | 🟢 **-64%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 55.7M | 🟢 **-53%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.4M | ✅ | 27.7M | 🟢 **-65%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.0M | ✅ | 31.0M | 🟢 **-63%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 50.8M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 82.4M | ✅ | 33.2M | 🟢 **-60%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 36.2M | ✅ | 45.3M | 🔴 **+25%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 68.2M | 🟢 **-24%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 90.0M | ✅ | 116.2M | 🔴 **+29%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 65.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.2M | ✅ | 29.5M | 🟢 **-41%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 82.0M | ✅ | 116.3M | 🔴 **+42%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 27.7M | 🟢 **-65%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.6M | ✅ | 117.5M | 🔴 **+48%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 63.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 64.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 40.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 78.4M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 74.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 75.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.6M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 61.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 67.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 68.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 70.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.0M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.6M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 70.1M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 42.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 66.9M | -13% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 96.0M | ✅ | 121.9M | 🔴 **+27%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 95.9M | ✅ | 61.0M | 🟢 **-36%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 83.3M | ✅ | 65.3M | 🟢 **-22%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 89.5M | ✅ | 64.2M | 🟢 **-28%** |
| default.json | invalid type for default | 2 | ✅ | 71.4M | ✅ | 58.9M | -18% |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 58.0M | +5% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 54.7M | ✅ | 54.3M | -1% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 32.8M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.1M | ✅ | 68.6M | 🟢 **-29%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.8M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.8M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.6M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.9M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 12.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.7M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.7M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.7M | ✅ | 60.2M | 🔴 **+679%** |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 16.4M | ✅ | 67.0M | 🔴 **+307%** |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 11.3M | ✅ | 68.4M | 🔴 **+504%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.9M | ✅ | 55.2M | 🔴 **+271%** |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.6M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.1M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.6M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.1M | ✅ | 27.0M | 🟢 **-64%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.1M | ✅ | 947K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.1M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 14.6M | ✅ | 37.5M | 🔴 **+156%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.8M | ✅ | 33.2M | 🟢 **-59%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 74.7M | ✅ | 23.6M | 🟢 **-68%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 53.8M | ✅ | 4.4M | 🟢 **-92%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.7M | ✅ | 23.9M | 🟢 **-68%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.6M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.2M | ✅ | 32.6M | 🟢 **-56%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.4M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 71.8M | ✅ | 32.9M | 🟢 **-54%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.3M | ✅ | 4.7M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 25.7M | 🟢 **-60%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 95.3M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 95.0M | ✅ | 65.6M | 🟢 **-31%** |
| format.json | regex format | 7 | ✅ | 78.3M | ✅ | 63.2M | -19% |
| format.json | ipv4 format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 76.1M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 77.6M | ✅ | 66.8M | -14% |
| format.json | hostname format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 96.2M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 95.7M | ✅ | 43.2M | 🟢 **-55%** |
| format.json | time format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 73.5M | ✅ | 65.7M | -11% |
| format.json | relative-json-pointer format | 7 | ✅ | 78.5M | ✅ | 47.1M | 🟢 **-40%** |
| format.json | iri format | 7 | ✅ | 78.1M | ✅ | 113.2M | 🔴 **+45%** |
| format.json | iri-reference format | 7 | ✅ | 78.6M | ✅ | 56.9M | 🟢 **-28%** |
| format.json | uri format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 77.6M | ✅ | 66.9M | -14% |
| format.json | uri-template format | 7 | ✅ | 78.1M | ✅ | 62.4M | 🟢 **-20%** |
| format.json | uuid format | 7 | ✅ | 78.4M | ✅ | 61.7M | 🟢 **-21%** |
| format.json | duration format | 7 | ✅ | 78.0M | ✅ | 34.4M | 🟢 **-56%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.2M | ✅ | 120.8M | 🔴 **+44%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.2M | ✅ | 55.9M | 🟢 **-40%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.0M | ✅ | 71.0M | -15% |
| if-then-else.json | if and then without else | 3 | ✅ | 77.6M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.1M | ✅ | 64.2M | 🟢 **-24%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 75.9M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.8M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 45.0M | ✅ | 13.7M | 🟢 **-70%** |
| items.json | a schema given for items | 4 | ✅ | 54.7M | ✅ | 29.2M | 🟢 **-47%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 102.2M | +9% |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.1M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 19.5M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 2.2M | 🟢 **-82%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.7M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.6M | ✅ | 23.5M | 🟢 **-50%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 45.4M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 58.4M | 🟢 **-23%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 119.4M | 🔴 **+27%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 60.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 79.0M | ✅ | 38.6M | 🟢 **-51%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 57.2M | 🟢 **-21%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.2M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 27.2M | 🟢 **-52%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 59.2M | +1% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.3M | ✅ | 22.2M | 🟢 **-55%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.4M | ✅ | 38.5M | 🟢 **-25%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 36.4M | 🟢 **-53%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 71.3M | -6% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 92.9M | ✅ | 70.8M | 🟢 **-24%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 71.5M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.6M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 65.8M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 61.0M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 58.7M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 93.5M | ✅ | 121.9M | 🔴 **+30%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 79.0M | ✅ | 38.6M | 🟢 **-51%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 56.9M | 🟢 **-22%** |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.6M | ✅ | 27.2M | 🟢 **-52%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 59.0M | -2% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 46.5M | ✅ | 22.3M | 🟢 **-52%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 73.2M | -5% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 37.0M | 🟢 **-49%** |
| multipleOf.json | by int | 3 | ✅ | 77.7M | ✅ | 66.6M | -14% |
| multipleOf.json | by number | 3 | ✅ | 70.0M | ✅ | 3.7M | 🟢 **-95%** |
| multipleOf.json | by small number | 2 | ✅ | 66.7M | ✅ | 2.3M | 🟢 **-97%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 27.0M | 🟢 **-65%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 45.1M | 🟢 **-36%** |
| not.json | not more complex schema | 3 | ✅ | 68.7M | ✅ | 31.9M | 🟢 **-54%** |
| not.json | forbidden property | 2 | ✅ | 52.0M | ✅ | 58.8M | +13% |
| not.json | forbid everything with empty schema | 9 | ✅ | 55.5M | ✅ | 18.0M | 🟢 **-68%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.5M | ✅ | 33.8M | 🟢 **-44%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.0M | ✅ | 63.5M | 🟢 **-29%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 59.0M | 🟢 **-34%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.3M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 66.9M | ✅ | 26.1M | 🟢 **-61%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.9M | ✅ | 45.3M | 🔴 **+22%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 18.9M | 🟢 **-71%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 18.4M | 🟢 **-72%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 38.4M | 🟢 **-42%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.5M | ✅ | 21.9M | 🟢 **-51%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 57.7M | 🟢 **-24%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.5M | ✅ | 22.7M | 🟢 **-53%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.7M | ✅ | 37.8M | 🟢 **-24%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 27.5M | 🟢 **-64%** |
| pattern.json | pattern validation | 8 | ✅ | 55.9M | ✅ | 54.7M | -2% |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 22.4M | -11% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.5M | ✅ | 12.6M | 🟢 **-53%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.4M | ✅ | 5.4M | 🟢 **-65%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.3M | ✅ | 13.5M | -17% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.5M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 15.1M | ✅ | 18.1M | +20% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.2M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.3M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 60.2M | 🟢 **-26%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 114.3M | 🔴 **+41%** |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ✅ | 27.7M | 🟢 **-51%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.1M | ✅ | 5.7M | 🟢 **-71%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.0M | ✅ | 12.1M | 🟢 **-76%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 107.7M | 🔴 **+53%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 69.3M | 🟢 **-26%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.6M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.7M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.7M | ✅ | 17.4M | 🟢 **-29%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.5M | ✅ | 23.2M | 🟢 **-57%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.5M | ✅ | 22.2M | 🟢 **-53%** |
| ref.json | nested refs | 2 | ✅ | 38.9M | ✅ | 20.5M | 🟢 **-47%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.8M | ✅ | 19.5M | 🟢 **-55%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.2M | ✅ | 27.2M | 🟢 **-48%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 53.3M | ✅ | 27.0M | 🟢 **-49%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 48.6M | 🟢 **-46%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 64.8M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.5M | ✅ | 22.8M | 🟢 **-57%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 3.1M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.0M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 39.2M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.7M | ✅ | 23.5M | 🟢 **-55%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 51.8M | ✅ | 27.1M | 🟢 **-48%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.8M | ✅ | 23.5M | 🟢 **-52%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.1M | ✅ | 27.0M | 🟢 **-45%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 50.2M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 45.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 50.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.0M | ✅ | 22.3M | 🟢 **-71%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.8M | ✅ | 27.2M | 🟢 **-65%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.1M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 49.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 42.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 51.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 51.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 39.8M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 49.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.1M | ✅ | 31.1M | 🟢 **-52%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 108.9M | 🔴 **+21%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 55.0M | 🟢 **-39%** |
| required.json | required with escaped characters | 2 | ✅ | 53.5M | ✅ | 33.1M | 🟢 **-38%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.6M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 65.6M | ✅ | 21.9M | 🟢 **-67%** |
| type.json | number type matches numbers | 9 | ✅ | 67.2M | ✅ | 47.9M | 🟢 **-29%** |
| type.json | string type matches strings | 9 | ✅ | 65.8M | ✅ | 24.1M | 🟢 **-63%** |
| type.json | object type matches objects | 7 | ✅ | 57.5M | ✅ | 39.3M | 🟢 **-32%** |
| type.json | array type matches arrays | 7 | ✅ | 63.0M | ✅ | 19.6M | 🟢 **-69%** |
| type.json | boolean type matches booleans | 10 | ✅ | 65.4M | ✅ | 42.3M | 🟢 **-35%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.0M | ✅ | 19.2M | 🟢 **-70%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.0M | ✅ | 45.0M | 🟢 **-31%** |
| type.json | type as array with one item | 2 | ✅ | 76.3M | ✅ | 28.8M | 🟢 **-62%** |
| type.json | type: array or object | 5 | ✅ | 71.6M | ✅ | 48.3M | 🟢 **-33%** |
| type.json | type: array, object or null | 5 | ✅ | 74.8M | ✅ | 31.3M | 🟢 **-58%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 82.8M | ✅ | 48.4M | 🟢 **-42%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 60.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 56.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 69.8M | ✅ | 47.8M | 🟢 **-32%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 58.9M | 🟢 **-25%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.8M | ✅ | 23.2M | 🟢 **-49%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 51.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.9M | ✅ | 60.7M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.2M | ✅ | 64.0M | 🔴 **+202%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 60.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 49.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 50.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.1M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.0M | ✅ | 65.0M | 🟢 **-29%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 54.4M | 🟢 **-28%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 61.7M | +6% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 39.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 93.8M | ✅ | 25.8M | 🟢 **-72%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 36.0M | ✅ | 15.4M | 🟢 **-57%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 25.2M | 🟢 **-64%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 106.6M | 🔴 **+274%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 59.5M | 🔴 **+109%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 61.0M | 🔴 **+114%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 48.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.2M | ✅ | 14.1M | 🟢 **-30%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 81.5M | ✅ | 66.5M | -18% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 54.9M | +5% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.8M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 22.8M | ✅ | 10.9M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 42.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 89.5M | ✅ | 65.8M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.3M | ✅ | 64.6M | -8% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.9M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 27.3M | 🟢 **-65%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 60.1M | 🟢 **-32%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 59.3M | 🟢 **-33%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 38.6M | 🟢 **-39%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.8M | ✅ | 59.0M | 🟢 **-25%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 59.1M | 🟢 **-25%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ✅ | 62.9M | 🟢 **-26%** |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.3M | ✅ | 68.2M | +4% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 57.2M | 🟢 **-40%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.3M | ✅ | 19.8M | 🟢 **-42%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 49.2M | ✅ | 41.0M | -17% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.8M | ✅ | 27.7M | 🟢 **-50%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.5M | ✅ | 19.0M | 🟢 **-52%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.4M | ✅ | 19.2M | 🟢 **-35%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 25.9M | -12% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ✅ | 19.3M | 🟢 **-31%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 26.2M | -7% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.2M | ✅ | 11.9M | 🟢 **-56%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.1M | ✅ | 29.7M | +14% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.5M | ✅ | 19.2M | 🟢 **-33%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ✅ | 27.3M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.5M | ✅ | 25.3M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 26.0M | -14% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.4M | ✅ | 10.3M | 🟢 **-34%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.3M | ✅ | 14.1M | -8% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.1M | ✅ | 17.3M | 🟢 **-39%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ✅ | 9.7M | 🟢 **-53%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 13.5M | 🟢 **-32%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 6.0M | 🟢 **-22%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.8M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.2M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 12.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.4M | ✅ | 8.7M | 🟢 **-80%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.1M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.8M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.4M | ✅ | 60.5M | 🟢 **-32%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.7M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 26.1M | ✅ | 9.6M | 🟢 **-63%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.1M | ✅ | 12.0M | 🟢 **-30%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.1M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 65.9M | ✅ | 34.1M | 🟢 **-48%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 35.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 53.5M | ✅ | 22.9M | 🟢 **-57%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 52.5M | ✅ | 26.4M | 🟢 **-50%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 55.1M | ✅ | 23.2M | 🟢 **-58%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 27.5M | 🟢 **-64%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 53.7M | ✅ | 23.2M | 🟢 **-57%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.7M | ❌ | - | - |
