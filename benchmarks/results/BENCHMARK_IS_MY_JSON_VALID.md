# tjs vs is-my-json-valid Benchmarks

Performance comparison of **tjs** vs **[is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | is-my-json-valid pass | is-my-json-valid ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 27.1M | 163/199 | 14.8M | 163 | 🟢 **-45%** |
| draft6 | 276 | ✅ 276 | 28.9M | 182/276 | 16.5M | 182 | 🟢 **-43%** |
| draft7 | 313 | ✅ 313 | 16.0M | 193/313 | 18.9M | 193 | +18% |
| draft2019-09 | 435 | ✅ 435 | 19.3M | 231/435 | 19.7M | 231 | +2% |
| draft2020-12 | 448 | ✅ 448 | 20.0M | 219/448 | 20.0M | 219 | +0% |
| **Total** | 1671 | 1670/1671 | 20.4M | 988/1671 | 17.9M | 988 | -12% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.39x faster** (23 ns vs 56 ns per test, 3702 tests in 988 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 58.1M | ✅ | 6.0M | 🟢 **-90%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.0M | ✅ | 61.9M | 🟢 **-61%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.6M | ✅ | 38.0M | 🟢 **-71%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 165.6M | ✅ | 79.3M | 🟢 **-52%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 129.0M | ✅ | 53.2M | 🟢 **-59%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 38.1M | ✅ | 18.9M | 🟢 **-50%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 53.4M | ✅ | 22.2M | 🟢 **-58%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 63.2M | ✅ | 45.0M | 🟢 **-29%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 147.4M | ✅ | 76.6M | 🟢 **-48%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 49.8M | ✅ | 17.2M | 🟢 **-65%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 46.1M | ✅ | 9.1M | 🟢 **-80%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 35.3M | ✅ | 27.7M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 50.1M | ✅ | 20.1M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 110.0M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.3M | ✅ | 9.6M | 🟢 **-75%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 49.5M | ✅ | 50.7M | +2% |
| allOf.json | allOf | 4 | ✅ | 70.1M | ✅ | 19.7M | 🟢 **-72%** |
| allOf.json | allOf with base schema | 5 | ✅ | 24.4M | ✅ | 20.4M | -16% |
| allOf.json | allOf simple types | 2 | ✅ | 113.7M | ✅ | 28.9M | 🟢 **-75%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.4M | ✅ | 114.8M | 🟢 **-28%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 76.5M | 🟢 **-52%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 56.2M | -10% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 30.5M | 🟢 **-74%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 59.2M | -9% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.7M | ✅ | 17.5M | 🟢 **-79%** |
| anyOf.json | anyOf | 4 | ✅ | 66.6M | ✅ | 63.3M | -5% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.5M | ✅ | 26.6M | 🟢 **-47%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.1M | ✅ | 47.6M | -1% |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ✅ | 75.1M | 🟢 **-56%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 33.0M | 🟢 **-49%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 98.1M | -3% |
| default.json | invalid string value for default | 2 | ✅ | 52.6M | ✅ | 68.1M | 🔴 **+29%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.0M | ✅ | 32.3M | 🟢 **-59%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 94.1M | ✅ | 44.8M | 🟢 **-52%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.9M | ✅ | 33.4M | +8% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 59.0M | ✅ | 23.0M | 🟢 **-61%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.3M | ✅ | 13.7M | 🟢 **-25%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.3M | ✅ | 35.1M | 🟢 **-34%** |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 30.6M | 🟢 **-52%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.1M | ✅ | 948K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 50.0M | ✅ | 32.6M | 🟢 **-35%** |
| enum.json | enum with escaped characters | 3 | ✅ | 52.3M | ✅ | 33.2M | 🟢 **-37%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.9M | ✅ | 46.9M | 🟢 **-58%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 53.8M | ✅ | 4.2M | 🟢 **-92%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 100.5M | ✅ | 47.0M | 🟢 **-53%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 51.1M | ✅ | 4.2M | 🟢 **-92%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 64.6M | 🟢 **-44%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.1M | ✅ | 4.5M | 🟢 **-92%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 112.4M | ✅ | 64.2M | 🟢 **-43%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 54.5M | ✅ | 4.5M | 🟢 **-92%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 52.4M | 🟢 **-41%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 50.4M | ✅ | 27.4M | 🟢 **-46%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ✅ | 52.0M | 🟢 **-43%** |
| format.json | email format | 6 | ✅ | 81.3M | ✅ | 71.5M | -12% |
| format.json | ipv4 format | 6 | ✅ | 82.1M | ✅ | 117.3M | 🔴 **+43%** |
| format.json | ipv6 format | 6 | ✅ | 81.1M | ✅ | 70.1M | -14% |
| format.json | hostname format | 6 | ✅ | 163.7M | ✅ | 71.8M | 🟢 **-56%** |
| format.json | date-time format | 6 | ✅ | 80.1M | ✅ | 99.8M | 🔴 **+25%** |
| format.json | uri format | 6 | ✅ | 161.4M | ✅ | 75.2M | 🟢 **-53%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 45.7M | ✅ | 16.0M | 🟢 **-65%** |
| items.json | a schema given for items | 4 | ✅ | 89.1M | ✅ | 31.3M | 🟢 **-65%** |
| items.json | an array of schemas for items | 6 | ✅ | 63.8M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 34.4M | ✅ | 6.6M | 🟢 **-81%** |
| items.json | nested items | 3 | ✅ | 13.3M | ✅ | 2.6M | 🟢 **-80%** |
| items.json | items with null instance elements | 1 | ✅ | 68.0M | ✅ | 63.2M | -7% |
| items.json | array-form items with null instance e... | 1 | ✅ | 82.9M | ✅ | 79.1M | -5% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 40.0M | 🟢 **-46%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.0M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.6M | ✅ | 40.1M | 🟢 **-25%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.6M | ✅ | 36.3M | -15% |
| maximum.json | maximum validation | 4 | ✅ | 31.6M | ✅ | 41.0M | 🔴 **+30%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 62.2M | ✅ | 65.2M | +5% |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 68.5M | ✅ | 41.1M | 🟢 **-40%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 59.4M | ✅ | 53.0M | -11% |
| minItems.json | minItems validation | 4 | ✅ | 66.0M | ✅ | 40.1M | 🟢 **-39%** |
| minLength.json | minLength validation | 5 | ✅ | 51.8M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 54.1M | ✅ | 35.2M | 🟢 **-35%** |
| minimum.json | minimum validation | 4 | ✅ | 66.4M | ✅ | 36.5M | 🟢 **-45%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 66.6M | ✅ | 41.3M | 🟢 **-38%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 28.9M | ✅ | 53.4M | 🔴 **+84%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ✅ | 39.7M | 🟢 **-39%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 60.9M | -12% |
| multipleOf.json | by number | 3 | ✅ | 60.4M | ✅ | 3.8M | 🟢 **-94%** |
| multipleOf.json | by small number | 2 | ✅ | 48.7M | ✅ | 2.3M | 🟢 **-95%** |
| multipleOf.json | float division = inf | 1 | ✅ | 37.5M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 17.8M | 🟢 **-72%** |
| not.json | not multiple types | 3 | ✅ | 51.4M | ✅ | 44.5M | -13% |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ✅ | 34.1M | 🟢 **-41%** |
| not.json | forbidden property | 2 | ✅ | 44.6M | ✅ | 56.9M | 🔴 **+27%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 20.0M | 🟢 **-59%** |
| not.json | double negation | 1 | ✅ | 159.4M | ✅ | 115.8M | 🟢 **-27%** |
| oneOf.json | oneOf | 4 | ✅ | 50.6M | ✅ | 28.5M | 🟢 **-44%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.9M | ✅ | 45.3M | 🔴 **+42%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.0M | ✅ | 23.4M | 🟢 **-41%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.2M | ✅ | 55.7M | -7% |
| oneOf.json | oneOf with required | 4 | ✅ | 41.2M | ✅ | 24.7M | 🟢 **-40%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ✅ | 37.9M | -13% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 30.6M | 🟢 **-51%** |
| pattern.json | pattern validation | 8 | ✅ | 51.1M | ✅ | 59.3M | +16% |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 20.8M | 🟢 **-57%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.3M | ✅ | 12.2M | 🟢 **-52%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ✅ | 4.2M | 🟢 **-72%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.4M | ✅ | 9.0M | 🟢 **-48%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.2M | ✅ | 17.7M | +9% |
| properties.json | object properties validation | 6 | ✅ | 49.9M | ✅ | 48.3M | -3% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 5.2M | 🟢 **-74%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.0M | ✅ | 31.6M | 🟢 **-30%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 70.2M | +8% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ✅ | 16.9M | 🟢 **-30%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 57.2M | ✅ | 29.2M | 🟢 **-49%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 47.1M | ✅ | 21.0M | 🟢 **-55%** |
| ref.json | escaped pointer ref | 6 | ✅ | 34.3M | ✅ | 24.5M | 🟢 **-29%** |
| ref.json | nested refs | 2 | ✅ | 47.7M | ✅ | 20.9M | 🟢 **-56%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.8M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 62.3M | ✅ | 26.5M | 🟢 **-57%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.9M | ✅ | 29.9M | 🟢 **-36%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 17.3M | 🟢 **-63%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.1M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ✅ | 24.7M | 🟢 **-47%** |
| ref.json | Location-independent identifier | 2 | ✅ | 62.9M | ✅ | 30.4M | 🟢 **-52%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 48.9M | ✅ | 3.2M | 🟢 **-93%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 59.7M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 62.3M | ✅ | 26.7M | 🟢 **-57%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 62.3M | ✅ | 32.4M | 🟢 **-48%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 58.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 59.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.1M | ✅ | 33.7M | 🟢 **-42%** |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 109.9M | 🟢 **-31%** |
| required.json | required with escaped characters | 2 | ✅ | 44.5M | ✅ | 16.8M | 🟢 **-62%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 50.2M | ✅ | 22.3M | 🟢 **-56%** |
| type.json | number type matches numbers | 9 | ✅ | 55.0M | ✅ | 47.3M | -14% |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 26.4M | 🟢 **-52%** |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ✅ | 22.6M | 🟢 **-51%** |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ✅ | 40.3M | 🟢 **-22%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 23.8M | 🟢 **-54%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.8M | ✅ | 39.0M | 🟢 **-20%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.9M | ✅ | 24.2M | 🟢 **-53%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 56.1M | -10% |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 27.8M | 🟢 **-50%** |
| type.json | type: array, object or null | 5 | ✅ | 62.3M | ✅ | 55.9M | -10% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.3M | ✅ | 11.0M | 🟢 **-64%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 12.2M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.5M | ✅ | 64.7M | 🟢 **-60%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.2M | ✅ | 47.3M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.1M | ✅ | 46.3M | 🟢 **-28%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 67.2M | -16% |
| optional/bignum.json | number | 2 | ✅ | 84.1M | ✅ | 64.7M | 🟢 **-23%** |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 38.6M | -19% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 64.6M | -16% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 37.0M | -19% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 64.7M | -16% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 18.0M | 🟢 **-61%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 52.8M | ✅ | 28.8M | 🟢 **-45%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.2M | ✅ | 18.7M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.7M | ✅ | 28.4M | +6% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.9M | ✅ | 20.7M | -17% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 15.8M | ✅ | 26.2M | 🔴 **+66%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.3M | ✅ | 22.9M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.7M | ✅ | 28.0M | +5% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.4M | ✅ | 20.6M | 🟢 **-22%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 34.2M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 24.3M | ✅ | 17.1M | 🟢 **-30%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.6M | ✅ | 11.4M | 🟢 **-22%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.5M | ✅ | 14.3M | -1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ✅ | 18.5M | 🟢 **-29%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 10.1M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.1M | ✅ | 13.5M | 🟢 **-33%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 6.6M | -17% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ✅ | 4.7M | 🟢 **-56%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.4M | ✅ | 10.4M | 🟢 **-70%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.2M | ✅ | 74.4M | -9% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.3M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 62.0M | ✅ | 6.0M | 🟢 **-90%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 42.7M | ✅ | 17.1M | 🟢 **-60%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.5M | ✅ | 90.0M | 🟢 **-43%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.5M | ✅ | 29.2M | 🟢 **-60%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.9M | ✅ | 120.9M | 🟢 **-30%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 78.9M | ✅ | 53.2M | 🟢 **-33%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.4M | ✅ | 19.8M | 🟢 **-65%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.1M | ✅ | 22.2M | 🟢 **-51%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 46.7M | 🟢 **-57%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.6M | ✅ | 76.1M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 67.6M | ✅ | 16.9M | 🟢 **-75%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.2M | ✅ | 11.5M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 47.5M | ✅ | 27.8M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.7M | ✅ | 19.0M | 🟢 **-45%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 108.7M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.2M | ✅ | 9.6M | 🟢 **-65%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.6M | ✅ | 51.0M | 🟢 **-24%** |
| allOf.json | allOf | 4 | ✅ | 33.4M | ✅ | 19.2M | 🟢 **-42%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 20.4M | 🟢 **-33%** |
| allOf.json | allOf simple types | 2 | ✅ | 57.3M | ✅ | 29.9M | 🟢 **-48%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 114.7M | 🟢 **-28%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 46.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ✅ | 76.2M | 🟢 **-52%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ✅ | 100.9M | 🟢 **-37%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 58.9M | ✅ | 30.5M | 🟢 **-48%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 56.0M | 🟢 **-52%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 33.0M | 🟢 **-46%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 30.9M | 🟢 **-63%** |
| anyOf.json | anyOf | 4 | ✅ | 62.7M | ✅ | 40.2M | 🟢 **-36%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 48.5M | ✅ | 45.3M | -7% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 147.4M | ✅ | 76.2M | 🟢 **-48%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 116.4M | 🟢 **-27%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 46.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.6M | ✅ | 32.2M | 🟢 **-57%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ✅ | 116.8M | 🟢 **-32%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 32.6M | 🟢 **-73%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 180.0M | ✅ | 124.8M | 🟢 **-31%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 52.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 42.1M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 117.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 55.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 107.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 51.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 49.0M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 50.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 114.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 52.7M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 52.7M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.5M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 103.7M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.2M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.4M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 63.8M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.0M | ✅ | 73.3M | -5% |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 98.4M | -3% |
| default.json | invalid string value for default | 2 | ✅ | 50.9M | ✅ | 62.1M | 🔴 **+22%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.0M | ✅ | 32.7M | 🟢 **-59%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 99.1M | ✅ | 44.8M | 🟢 **-55%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.2M | ✅ | 95.3M | 🟢 **-46%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 40.0M | ✅ | 23.2M | 🟢 **-42%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 38.5M | ✅ | 38.9M | +1% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 72.9M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.6M | ✅ | 13.8M | 🟢 **-22%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.3M | ✅ | 35.7M | 🟢 **-33%** |
| enum.json | simple enum validation | 2 | ✅ | 59.9M | ✅ | 31.1M | 🟢 **-48%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.3M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 63.2M | ✅ | 3.7M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 56.6M | ✅ | 37.6M | 🟢 **-34%** |
| enum.json | enum with escaped characters | 3 | ✅ | 67.0M | ✅ | 37.6M | 🟢 **-44%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.7M | ✅ | 27.2M | 🟢 **-75%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 51.1M | ✅ | 4.0M | 🟢 **-92%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.8M | ✅ | 26.7M | 🟢 **-75%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 51.1M | ✅ | 4.4M | 🟢 **-91%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 37.2M | 🟢 **-67%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.3M | ✅ | 4.8M | 🟢 **-91%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.3M | ✅ | 36.9M | 🟢 **-68%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.0M | ✅ | 4.8M | 🟢 **-91%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 30.3M | 🟢 **-66%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 52.3M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 113.2M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 78.7M | ✅ | 65.7M | -17% |
| format.json | ipv4 format | 6 | ✅ | 162.8M | ✅ | 69.8M | 🟢 **-57%** |
| format.json | ipv6 format | 6 | ✅ | 83.1M | ✅ | 89.9M | +8% |
| format.json | hostname format | 6 | ✅ | 163.3M | ✅ | 69.7M | 🟢 **-57%** |
| format.json | date-time format | 6 | ✅ | 83.5M | ✅ | 75.1M | -10% |
| format.json | json-pointer format | 6 | ✅ | 163.3M | ✅ | 112.8M | 🟢 **-31%** |
| format.json | uri format | 6 | ✅ | 83.6M | ✅ | 71.1M | -15% |
| format.json | uri-reference format | 6 | ✅ | 162.6M | ✅ | 68.8M | 🟢 **-58%** |
| format.json | uri-template format | 6 | ✅ | 81.8M | ✅ | 57.8M | 🟢 **-29%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.7M | ✅ | 14.1M | 🟢 **-76%** |
| items.json | a schema given for items | 4 | ✅ | 53.6M | ✅ | 48.6M | -9% |
| items.json | an array of schemas for items | 6 | ✅ | 108.8M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 172.0M | ✅ | 65.7M | 🟢 **-62%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 129.1M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 56.4M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 33.9M | ✅ | 7.9M | 🟢 **-77%** |
| items.json | nested items | 3 | ✅ | 12.8M | ✅ | 2.3M | 🟢 **-82%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 44.3M | ✅ | 93.3M | 🔴 **+111%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 78.8M | ✅ | 57.8M | 🟢 **-27%** |
| maxItems.json | maxItems validation | 4 | ✅ | 62.8M | ✅ | 73.7M | +17% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 59.5M | ✅ | 29.9M | 🟢 **-50%** |
| maxLength.json | maxLength validation | 5 | ✅ | 54.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 41.8M | ✅ | 28.2M | 🟢 **-33%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 50.6M | ✅ | 57.0M | +13% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 35.4M | ✅ | 23.8M | 🟢 **-33%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 29.4M | ✅ | 38.9M | 🔴 **+32%** |
| maximum.json | maximum validation | 4 | ✅ | 59.5M | ✅ | 39.1M | 🟢 **-34%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 63.8M | ✅ | 66.7M | +4% |
| minItems.json | minItems validation | 4 | ✅ | 59.2M | ✅ | 42.2M | 🟢 **-29%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 50.4M | ✅ | 51.9M | +3% |
| minLength.json | minLength validation | 5 | ✅ | 49.2M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 43.2M | ✅ | 30.1M | 🟢 **-30%** |
| minProperties.json | minProperties validation | 6 | ✅ | 25.9M | ✅ | 57.0M | 🔴 **+120%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 37.2M | ✅ | 23.5M | 🟢 **-37%** |
| minimum.json | minimum validation | 4 | ✅ | 59.9M | ✅ | 62.9M | +5% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 60.5M | ✅ | 40.2M | 🟢 **-34%** |
| multipleOf.json | by int | 3 | ✅ | 68.0M | ✅ | 66.3M | -3% |
| multipleOf.json | by number | 3 | ✅ | 53.8M | ✅ | 3.9M | 🟢 **-93%** |
| multipleOf.json | by small number | 2 | ✅ | 54.1M | ✅ | 2.3M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 41.0M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 55.8M | ✅ | 29.8M | 🟢 **-47%** |
| not.json | not multiple types | 3 | ✅ | 50.8M | ✅ | 45.3M | -11% |
| not.json | not more complex schema | 3 | ✅ | 50.6M | ✅ | 19.0M | 🟢 **-62%** |
| not.json | forbidden property | 2 | ✅ | 42.7M | ✅ | 59.0M | 🔴 **+38%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 42.9M | ✅ | 20.2M | 🟢 **-53%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 42.9M | ✅ | 34.4M | -20% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.0M | ✅ | 73.6M | 🟢 **-59%** |
| not.json | double negation | 1 | ✅ | 158.6M | ✅ | 76.1M | 🟢 **-52%** |
| oneOf.json | oneOf | 4 | ✅ | 48.3M | ✅ | 44.4M | -8% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 15.7M | ✅ | 26.2M | 🔴 **+67%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 46.9M | ✅ | 38.7M | -18% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 46.9M | ✅ | 15.2M | 🟢 **-68%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 38.5M | -18% |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.5M | ✅ | 23.7M | 🟢 **-38%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 58.3M | ✅ | 54.8M | -6% |
| oneOf.json | oneOf with required | 4 | ✅ | 38.8M | ✅ | 23.6M | 🟢 **-39%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.4M | ✅ | 37.6M | -9% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.6M | ✅ | 30.4M | 🟢 **-48%** |
| pattern.json | pattern validation | 8 | ✅ | 49.2M | ✅ | 61.8M | 🔴 **+26%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 45.8M | ✅ | 24.1M | 🟢 **-47%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 11.1M | 🟢 **-57%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 5.3M | 🟢 **-64%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.2M | ✅ | 12.2M | 🟢 **-29%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.2M | ✅ | 18.3M | +6% |
| properties.json | object properties validation | 6 | ✅ | 46.8M | ✅ | 49.2M | +5% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ✅ | 5.4M | 🟢 **-73%** |
| properties.json | properties with boolean schema | 4 | ✅ | 40.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 40.8M | ✅ | 13.5M | 🟢 **-67%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.3M | ✅ | 107.7M | 🔴 **+73%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.1M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.5M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.6M | ✅ | 75.2M | 🟢 **-56%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 40.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.2M | ✅ | 17.4M | 🟢 **-25%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.4M | ✅ | 28.2M | 🟢 **-37%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.8M | ✅ | 20.4M | 🟢 **-58%** |
| ref.json | escaped pointer ref | 6 | ✅ | 38.9M | ✅ | 25.1M | 🟢 **-36%** |
| ref.json | nested refs | 2 | ✅ | 45.9M | ✅ | 20.6M | 🟢 **-55%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 47.8M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 57.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.5M | ✅ | 30.4M | 🟢 **-32%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 43.8M | ✅ | 29.7M | 🟢 **-32%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.2M | ✅ | 55.7M | 🟢 **-65%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 46.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.0M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 43.2M | ✅ | 25.9M | 🟢 **-40%** |
| ref.json | Location-independent identifier | 2 | ✅ | 53.2M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 55.8M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 57.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 44.9M | ✅ | 3.1M | 🟢 **-93%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 35.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 43.1M | ✅ | 26.7M | 🟢 **-38%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 38.9M | ✅ | 30.3M | 🟢 **-22%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 40.4M | ✅ | 26.7M | 🟢 **-34%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.4M | ✅ | 31.4M | 🟢 **-29%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.6M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 45.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 56.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 26.8M | 🟢 **-54%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 30.2M | 🟢 **-49%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.9M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 56.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 56.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 45.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 45.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 39.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 45.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 55.4M | ✅ | 33.4M | 🟢 **-40%** |
| required.json | required default validation | 1 | ✅ | 159.0M | ✅ | 110.4M | 🟢 **-31%** |
| required.json | required with empty array | 1 | ✅ | 159.5M | ✅ | 54.9M | 🟢 **-66%** |
| required.json | required with escaped characters | 2 | ✅ | 42.6M | ✅ | 34.2M | -20% |
| required.json | required properties whose names are J... | 7 | ✅ | 24.6M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 46.8M | ✅ | 24.0M | 🟢 **-49%** |
| type.json | number type matches numbers | 9 | ✅ | 51.7M | ✅ | 48.2M | -7% |
| type.json | string type matches strings | 9 | ✅ | 51.4M | ✅ | 27.0M | 🟢 **-48%** |
| type.json | object type matches objects | 7 | ✅ | 43.7M | ✅ | 22.7M | 🟢 **-48%** |
| type.json | array type matches arrays | 7 | ✅ | 48.3M | ✅ | 40.8M | -15% |
| type.json | boolean type matches booleans | 10 | ✅ | 48.6M | ✅ | 23.8M | 🟢 **-51%** |
| type.json | null type matches only the null object | 10 | ✅ | 45.7M | ✅ | 37.4M | -18% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 48.6M | ✅ | 25.1M | 🟢 **-48%** |
| type.json | type as array with one item | 2 | ✅ | 58.9M | ✅ | 60.1M | +2% |
| type.json | type: array or object | 5 | ✅ | 52.6M | ✅ | 28.1M | 🟢 **-47%** |
| type.json | type: array, object or null | 5 | ✅ | 58.9M | ✅ | 46.4M | 🟢 **-21%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.7M | ✅ | 11.0M | 🟢 **-62%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.0M | ✅ | 11.5M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.0M | ✅ | 70.9M | 🟢 **-56%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.3M | ✅ | 46.2M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.6M | ✅ | 44.6M | 🟢 **-28%** |
| optional/bignum.json | integer | 2 | ✅ | 76.1M | ✅ | 67.7M | -11% |
| optional/bignum.json | number | 2 | ✅ | 80.0M | ✅ | 107.9M | 🔴 **+35%** |
| optional/bignum.json | string | 1 | ✅ | 45.0M | ✅ | 20.7M | 🟢 **-54%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 73.4M | ✅ | 96.3M | 🔴 **+31%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 43.1M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 64.6M | -12% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 43.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 50.8M | ✅ | 20.8M | 🟢 **-59%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 24.7M | ✅ | 28.6M | +16% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.9M | ✅ | 20.8M | -17% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.7M | ✅ | 30.1M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.7M | ✅ | 19.0M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.2M | ✅ | 31.3M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.1M | ✅ | 20.9M | -20% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.5M | ✅ | 28.5M | +16% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.5M | ✅ | 27.0M | +6% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.7M | ✅ | 26.2M | -2% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.8M | ✅ | 11.6M | -16% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ✅ | 14.2M | -9% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 19.5M | ✅ | 18.8M | -3% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ✅ | 9.9M | 🟢 **-49%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.4M | ✅ | 13.5M | 🟢 **-34%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 6.4M | 🟢 **-21%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.6M | ✅ | 5.7M | 🟢 **-47%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 32.6M | ✅ | 10.4M | 🟢 **-68%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 15.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.0M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 78.3M | ✅ | 68.8M | -12% |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.0M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 41.4M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 41.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 25.5M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 19.4M | ✅ | 6.2M | 🟢 **-68%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.7M | ✅ | 16.7M | 🟢 **-53%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.3M | ✅ | 90.6M | 🟢 **-43%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 70.5M | ✅ | 29.2M | 🟢 **-59%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.2M | ✅ | 121.7M | 🟢 **-29%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 49.9M | 🟢 **-40%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.8M | ✅ | 19.9M | 🟢 **-65%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 40.4M | ✅ | 21.7M | 🟢 **-46%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.5M | ✅ | 44.8M | 🟢 **-58%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.4M | ✅ | 71.8M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.6M | ✅ | 17.6M | 🟢 **-71%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.8M | ✅ | 11.3M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 26.8M | ✅ | 27.6M | +3% |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.5M | ✅ | 19.1M | 🟢 **-45%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 157.9M | ✅ | 110.2M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 11.9M | ✅ | 9.2M | 🟢 **-23%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 50.6M | 🟢 **-24%** |
| allOf.json | allOf | 4 | ✅ | 34.3M | ✅ | 18.6M | 🟢 **-46%** |
| allOf.json | allOf with base schema | 5 | ✅ | 18.6M | ✅ | 20.2M | +8% |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 27.4M | 🟢 **-55%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.8M | ✅ | 114.6M | 🟢 **-28%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 49.9M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 72.0M | 🟢 **-55%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 114.9M | 🟢 **-28%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 115.7M | ✅ | 28.9M | 🟢 **-75%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 62.3M | ✅ | 57.3M | -8% |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 85.0M | ✅ | 29.7M | 🟢 **-65%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 47.1M | ✅ | 30.4M | 🟢 **-35%** |
| anyOf.json | anyOf | 4 | ✅ | 102.8M | ✅ | 38.2M | 🟢 **-63%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 33.3M | ✅ | 45.0M | 🔴 **+35%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 71.4M | 🟢 **-55%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.4M | ✅ | 117.2M | 🟢 **-26%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.7M | ✅ | 30.8M | 🟢 **-35%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 116.7M | 🟢 **-32%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.5M | ✅ | 29.3M | 🟢 **-55%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 182.6M | ✅ | 124.4M | 🟢 **-32%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 49.1M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 97.5M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 33.2M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 82.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 64.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 110.4M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 59.3M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 95.7M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 95.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 97.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 108.9M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 57.7M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 44.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 89.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 94.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 105.2M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 126.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 70.1M | -13% |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 98.4M | -3% |
| default.json | invalid string value for default | 2 | ✅ | 52.5M | ✅ | 63.3M | 🔴 **+21%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.0M | ✅ | 30.5M | 🟢 **-61%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 99.2M | ✅ | 41.9M | 🟢 **-58%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.7M | ✅ | 93.1M | 🟢 **-47%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.5M | ✅ | 22.1M | 🟢 **-44%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.3M | ✅ | 38.4M | -5% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 83.1M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.6M | ✅ | 13.4M | 🟢 **-28%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 49.6M | ✅ | 35.4M | 🟢 **-29%** |
| enum.json | simple enum validation | 2 | ✅ | 62.3M | ✅ | 28.3M | 🟢 **-55%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 935K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.1M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 55.1M | ✅ | 37.6M | 🟢 **-32%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 36.0M | 🟢 **-49%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.1M | ✅ | 25.3M | 🟢 **-77%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.2M | ✅ | 4.4M | 🟢 **-92%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.6M | ✅ | 25.3M | 🟢 **-76%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ✅ | 4.5M | 🟢 **-92%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 18.7M | 🟢 **-84%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 60.6M | ✅ | 4.8M | 🟢 **-92%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.4M | ✅ | 34.3M | 🟢 **-70%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.6M | ✅ | 4.8M | 🟢 **-92%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 27.3M | 🟢 **-69%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.3M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 88.0M | ✅ | 68.3M | 🟢 **-22%** |
| format.json | idn-email format | 6 | ✅ | 160.9M | ✅ | 56.5M | 🟢 **-65%** |
| format.json | regex format | 6 | ✅ | 88.2M | ✅ | 121.7M | 🔴 **+38%** |
| format.json | ipv4 format | 6 | ✅ | 158.6M | ✅ | 67.0M | 🟢 **-58%** |
| format.json | ipv6 format | 6 | ✅ | 88.4M | ✅ | 114.1M | 🔴 **+29%** |
| format.json | idn-hostname format | 6 | ✅ | 161.8M | ✅ | 65.7M | 🟢 **-59%** |
| format.json | hostname format | 6 | ✅ | 87.0M | ✅ | 67.9M | 🟢 **-22%** |
| format.json | date format | 6 | ✅ | 162.8M | ✅ | 103.9M | 🟢 **-36%** |
| format.json | date-time format | 6 | ✅ | 88.4M | ✅ | 67.7M | 🟢 **-23%** |
| format.json | time format | 6 | ✅ | 162.3M | ✅ | 63.9M | 🟢 **-61%** |
| format.json | json-pointer format | 6 | ✅ | 88.3M | ✅ | 120.8M | 🔴 **+37%** |
| format.json | relative-json-pointer format | 6 | ✅ | 161.7M | ✅ | 60.5M | 🟢 **-63%** |
| format.json | iri format | 6 | ✅ | 88.4M | ✅ | 69.1M | 🟢 **-22%** |
| format.json | iri-reference format | 6 | ✅ | 162.2M | ✅ | 62.6M | 🟢 **-61%** |
| format.json | uri format | 6 | ✅ | 88.2M | ✅ | 68.3M | 🟢 **-23%** |
| format.json | uri-reference format | 6 | ✅ | 158.9M | ✅ | 67.2M | 🟢 **-58%** |
| format.json | uri-template format | 6 | ✅ | 81.1M | ✅ | 63.5M | 🟢 **-22%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.7M | ✅ | 74.6M | 🟢 **-57%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.5M | ✅ | 62.7M | 🟢 **-63%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.5M | ✅ | 121.8M | 🟢 **-29%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 118.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.4M | ✅ | 75.1M | 🟢 **-56%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 111.5M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.3M | ✅ | 15.3M | 🟢 **-73%** |
| items.json | a schema given for items | 4 | ✅ | 56.3M | ✅ | 32.9M | 🟢 **-41%** |
| items.json | an array of schemas for items | 6 | ✅ | 109.1M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.7M | ✅ | 61.5M | 🟢 **-64%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 60.5M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 35.2M | ✅ | 6.3M | 🟢 **-82%** |
| items.json | nested items | 3 | ✅ | 13.2M | ✅ | 3.2M | 🟢 **-76%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 60.7M | 🟢 **-21%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 79.4M | -4% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 40.7M | 🟢 **-45%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 57.4M | -10% |
| maxLength.json | maxLength validation | 5 | ✅ | 57.9M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.8M | ✅ | 28.6M | 🟢 **-45%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.0M | ✅ | 59.0M | +9% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.8M | ✅ | 23.2M | 🟢 **-44%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.5M | ✅ | 38.9M | -9% |
| maximum.json | maximum validation | 4 | ✅ | 67.6M | ✅ | 40.0M | 🟢 **-41%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 72.0M | +6% |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ✅ | 40.5M | 🟢 **-45%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 57.3M | -10% |
| minLength.json | minLength validation | 5 | ✅ | 51.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 29.7M | 🟢 **-43%** |
| minProperties.json | minProperties validation | 6 | ✅ | 54.9M | ✅ | 59.2M | +8% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.9M | ✅ | 22.9M | 🟢 **-47%** |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ✅ | 72.9M | +6% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.8M | ✅ | 39.1M | 🟢 **-40%** |
| multipleOf.json | by int | 3 | ✅ | 69.2M | ✅ | 66.1M | -4% |
| multipleOf.json | by number | 3 | ✅ | 60.2M | ✅ | 3.8M | 🟢 **-94%** |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ✅ | 2.3M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 27.6M | 🟢 **-56%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 44.6M | 🟢 **-20%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 33.6M | 🟢 **-42%** |
| not.json | forbidden property | 2 | ✅ | 45.9M | ✅ | 58.5M | 🔴 **+27%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 19.4M | 🟢 **-61%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.2M | ✅ | 34.6M | 🟢 **-30%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 174.1M | ✅ | 71.7M | 🟢 **-59%** |
| not.json | double negation | 1 | ✅ | 159.6M | ✅ | 61.1M | 🟢 **-62%** |
| oneOf.json | oneOf | 4 | ✅ | 50.6M | ✅ | 38.3M | 🟢 **-24%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.3M | ✅ | 25.0M | 🟢 **-23%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 35.1M | 🟢 **-30%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 19.5M | 🟢 **-61%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 37.4M | 🟢 **-25%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.9M | ✅ | 22.5M | 🟢 **-44%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 57.2M | -7% |
| oneOf.json | oneOf with required | 4 | ✅ | 41.2M | ✅ | 23.8M | 🟢 **-42%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ✅ | 37.9M | -13% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 29.1M | 🟢 **-53%** |
| pattern.json | pattern validation | 8 | ✅ | 52.8M | ✅ | 59.3M | +12% |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.4M | ✅ | 23.8M | 🟢 **-50%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.8M | ✅ | 12.4M | 🟢 **-50%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ✅ | 5.7M | 🟢 **-63%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.0M | ✅ | 12.9M | 🟢 **-24%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 18.9M | +6% |
| properties.json | object properties validation | 6 | ✅ | 49.7M | ✅ | 45.8M | -8% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 9.4M | 🟢 **-53%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.8M | ✅ | 12.9M | 🟢 **-71%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 108.0M | 🔴 **+67%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.8M | ✅ | 73.2M | 🟢 **-57%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.5M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.5M | ✅ | 18.1M | 🟢 **-23%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.5M | ✅ | 24.5M | 🟢 **-47%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ✅ | 22.0M | 🟢 **-57%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 23.4M | 🟢 **-42%** |
| ref.json | nested refs | 2 | ✅ | 46.4M | ✅ | 22.0M | 🟢 **-53%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.5M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 57.8M | ✅ | 30.4M | 🟢 **-47%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 28.6M | 🟢 **-39%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.6M | ✅ | 52.6M | 🟢 **-67%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ✅ | 24.7M | 🟢 **-47%** |
| ref.json | Location-independent identifier | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.0M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 46.4M | ✅ | 3.0M | 🟢 **-93%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.9M | ✅ | 25.0M | 🟢 **-47%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ✅ | 28.5M | 🟢 **-39%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.9M | ✅ | 25.1M | 🟢 **-47%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.7M | ✅ | 29.5M | 🟢 **-37%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 59.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 58.4M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 58.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 25.1M | 🟢 **-60%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 25.1M | 🟢 **-60%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 58.5M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 47.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 46.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.2M | ✅ | 32.4M | 🟢 **-44%** |
| required.json | required default validation | 1 | ✅ | 159.6M | ✅ | 109.6M | 🟢 **-31%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 57.9M | 🟢 **-64%** |
| required.json | required with escaped characters | 2 | ✅ | 44.1M | ✅ | 34.8M | 🟢 **-21%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.6M | ✅ | 22.7M | 🟢 **-57%** |
| type.json | number type matches numbers | 9 | ✅ | 52.6M | ✅ | 48.1M | -8% |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 25.7M | 🟢 **-53%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 35.5M | 🟢 **-23%** |
| type.json | array type matches arrays | 7 | ✅ | 51.1M | ✅ | 21.5M | 🟢 **-58%** |
| type.json | boolean type matches booleans | 10 | ✅ | 47.7M | ✅ | 41.4M | -13% |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ✅ | 20.4M | 🟢 **-58%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ✅ | 44.8M | -14% |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 29.1M | 🟢 **-53%** |
| type.json | type: array or object | 5 | ✅ | 55.5M | ✅ | 41.2M | 🟢 **-26%** |
| type.json | type: array, object or null | 5 | ✅ | 63.0M | ✅ | 32.9M | 🟢 **-48%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.9M | ✅ | 10.7M | 🟢 **-65%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 12.1M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.0M | ✅ | 69.2M | 🟢 **-57%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.2M | ✅ | 45.5M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 68.2M | ✅ | 46.5M | 🟢 **-32%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 63.7M | 🟢 **-20%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 106.4M | 🔴 **+26%** |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 19.1M | 🟢 **-60%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 66.6M | ✅ | 96.6M | 🔴 **+45%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 61.5M | 🟢 **-20%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 347K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.0M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 19.6M | 🟢 **-63%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.2M | ✅ | 28.6M | +9% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 20.1M | 🟢 **-21%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 28.5M | +6% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.9M | ✅ | 17.2M | 🟢 **-34%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.7M | ✅ | 31.2M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.8M | ✅ | 20.1M | 🟢 **-22%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.0M | ✅ | 28.4M | +14% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 25.7M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.6M | ✅ | 25.4M | -8% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.6M | ✅ | 11.1M | -18% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.8M | ✅ | 14.3M | +4% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.2M | ✅ | 18.1M | 🟢 **-25%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.4M | ✅ | 9.8M | 🟢 **-47%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ✅ | 12.9M | 🟢 **-38%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 6.6M | -16% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.6M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 33.4M | ✅ | 8.9M | 🟢 **-73%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.6M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 71.9M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.9M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 85.1M | ✅ | 67.1M | 🟢 **-21%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.5M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 52.5M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 52.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.9M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 32.4M | ✅ | 8.7M | 🟢 **-73%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.0M | ✅ | 16.0M | 🟢 **-54%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.4M | ✅ | 90.5M | 🟢 **-43%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 67.8M | ✅ | 28.4M | 🟢 **-58%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.9M | ✅ | 120.7M | 🟢 **-30%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 68.5M | ✅ | 43.9M | 🟢 **-36%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.8M | ✅ | 18.6M | 🟢 **-67%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.5M | ✅ | 20.2M | 🟢 **-47%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.2M | ✅ | 43.7M | 🟢 **-59%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.5M | ✅ | 68.3M | 🟢 **-57%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 66.9M | ✅ | 15.6M | 🟢 **-77%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.7M | ✅ | 10.4M | 🟢 **-68%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 35.0M | ✅ | 21.8M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.1M | ✅ | 17.6M | 🟢 **-47%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 108.4M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.1M | ✅ | 8.6M | 🟢 **-68%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 50.7M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 13.7M | ✅ | 11.1M | -19% |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 19.1M | ✅ | 24.2M | 🔴 **+27%** |
| allOf.json | allOf | 4 | ✅ | 33.6M | ✅ | 17.0M | 🟢 **-49%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.1M | ✅ | 20.2M | 🟢 **-33%** |
| allOf.json | allOf simple types | 2 | ✅ | 58.6M | ✅ | 25.6M | 🟢 **-56%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.6M | ✅ | 113.9M | 🟢 **-28%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.2M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 146.5M | ✅ | 67.7M | 🟢 **-54%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 147.0M | ✅ | 114.4M | 🟢 **-22%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 60.4M | ✅ | 27.2M | 🟢 **-55%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 54.3M | 🟢 **-53%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 59.4M | ✅ | 27.2M | 🟢 **-54%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 80.5M | ✅ | 30.8M | 🟢 **-62%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 54.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 104.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 52.0M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 61.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 65.3M | ✅ | 35.6M | 🟢 **-45%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.5M | ✅ | 45.0M | 🔴 **+30%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 68.2M | 🟢 **-57%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.3M | ✅ | 115.6M | 🟢 **-27%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.3M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.5M | ✅ | 29.2M | 🟢 **-39%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 162.1M | ✅ | 114.4M | 🟢 **-29%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 59.5M | ✅ | 13.6M | 🟢 **-77%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 177.0M | ✅ | 118.4M | 🟢 **-33%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 49.0M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 54.3M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 34.3M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 40.7M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 64.2M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 58.4M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 57.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 53.8M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.5M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.1M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 54.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.4M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.5M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.8M | ✅ | 67.3M | -17% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.6M | ✅ | 123.3M | 🟢 **-30%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.6M | ✅ | 55.5M | 🟢 **-68%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 178.5M | ✅ | 66.5M | 🟢 **-63%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 184.0M | ✅ | 59.4M | 🟢 **-68%** |
| default.json | invalid type for default | 2 | ✅ | 68.0M | ✅ | 58.2M | -14% |
| default.json | invalid string value for default | 2 | ✅ | 47.4M | ✅ | 57.9M | 🔴 **+22%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 47.9M | ✅ | 53.6M | +12% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.5M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.2M | ✅ | 70.0M | 🟢 **-60%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.0M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 47.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.8M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 27.3M | 🟢 **-57%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.6M | ✅ | 963K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.9M | ✅ | 3.7M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ✅ | 37.2M | -2% |
| enum.json | enum with escaped characters | 3 | ✅ | 71.4M | ✅ | 31.8M | 🟢 **-55%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 58.6M | ✅ | 24.0M | 🟢 **-59%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.0M | ✅ | 4.5M | 🟢 **-92%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 59.4M | ✅ | 23.9M | 🟢 **-60%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.0M | ✅ | 4.4M | 🟢 **-92%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.5M | ✅ | 33.6M | 🟢 **-50%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 60.9M | ✅ | 4.8M | 🟢 **-92%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 65.9M | ✅ | 33.3M | 🟢 **-49%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.0M | ✅ | 4.8M | 🟢 **-92%** |
| enum.json | nul characters in strings | 2 | ✅ | 54.5M | ✅ | 25.7M | 🟢 **-53%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 58.8M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 182.7M | ✅ | 64.1M | 🟢 **-65%** |
| format.json | idn-email format | 6 | ✅ | 181.6M | ✅ | 55.4M | 🟢 **-69%** |
| format.json | regex format | 6 | ✅ | 183.0M | ✅ | 124.9M | 🟢 **-32%** |
| format.json | ipv4 format | 6 | ✅ | 170.8M | ✅ | 63.3M | 🟢 **-63%** |
| format.json | ipv6 format | 6 | ✅ | 183.1M | ✅ | 63.2M | 🟢 **-66%** |
| format.json | idn-hostname format | 6 | ✅ | 179.6M | ✅ | 110.3M | 🟢 **-39%** |
| format.json | hostname format | 6 | ✅ | 178.0M | ✅ | 63.0M | 🟢 **-65%** |
| format.json | date format | 6 | ✅ | 175.0M | ✅ | 63.2M | 🟢 **-64%** |
| format.json | date-time format | 6 | ✅ | 174.0M | ✅ | 107.3M | 🟢 **-38%** |
| format.json | time format | 6 | ✅ | 181.8M | ✅ | 63.1M | 🟢 **-65%** |
| format.json | json-pointer format | 6 | ✅ | 171.3M | ✅ | 66.3M | 🟢 **-61%** |
| format.json | relative-json-pointer format | 6 | ✅ | 181.0M | ✅ | 62.7M | 🟢 **-65%** |
| format.json | iri format | 6 | ✅ | 174.3M | ✅ | 66.4M | 🟢 **-62%** |
| format.json | iri-reference format | 6 | ✅ | 181.9M | ✅ | 63.5M | 🟢 **-65%** |
| format.json | uri format | 6 | ✅ | 182.6M | ✅ | 117.1M | 🟢 **-36%** |
| format.json | uri-reference format | 6 | ✅ | 181.9M | ✅ | 65.2M | 🟢 **-64%** |
| format.json | uri-template format | 6 | ✅ | 181.6M | ✅ | 64.9M | 🟢 **-64%** |
| format.json | uuid format | 6 | ✅ | 180.1M | ✅ | 109.7M | 🟢 **-39%** |
| format.json | duration format | 6 | ✅ | 181.7M | ✅ | 57.9M | 🟢 **-68%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.3M | ✅ | 120.5M | 🟢 **-30%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 170.7M | ✅ | 70.1M | 🟢 **-59%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 60.5M | 🟢 **-65%** |
| if-then-else.json | if and then without else | 3 | ✅ | 68.5M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 68.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 56.6M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 162.8M | ✅ | 69.1M | 🟢 **-58%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 62.8M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 63.8M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.7M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ✅ | 13.5M | 🟢 **-65%** |
| items.json | a schema given for items | 4 | ✅ | 56.1M | ✅ | 31.3M | 🟢 **-44%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.5M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.2M | ✅ | 59.2M | 🟢 **-65%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 60.6M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 60.4M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.1M | ✅ | 5.8M | 🟢 **-80%** |
| items.json | nested items | 3 | ✅ | 13.4M | ✅ | 4.3M | 🟢 **-68%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 76.2M | ✅ | 58.0M | 🟢 **-24%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 78.4M | -6% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.8M | ✅ | 70.9M | 🟢 **-59%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 58.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 56.6M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.6M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ✅ | 74.3M | +1% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 27.1M | 🟢 **-57%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.8M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.2M | ✅ | 27.2M | 🟢 **-47%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.6M | ✅ | 58.1M | +8% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.8M | ✅ | 22.2M | 🟢 **-47%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 40.6M | ✅ | 38.7M | -5% |
| maximum.json | maximum validation | 4 | ✅ | 68.9M | ✅ | 37.5M | 🟢 **-46%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 71.2M | +5% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 165.0M | ✅ | 70.9M | 🟢 **-57%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 59.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.0M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.5M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.9M | ✅ | 60.0M | 🟢 **-65%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 63.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ✅ | 38.5M | 🟢 **-48%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 62.7M | ✅ | 55.9M | -11% |
| minLength.json | minLength validation | 5 | ✅ | 49.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.2M | ✅ | 26.9M | 🟢 **-48%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.1M | ✅ | 58.9M | +7% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.8M | ✅ | 22.3M | 🟢 **-47%** |
| minimum.json | minimum validation | 4 | ✅ | 68.9M | ✅ | 71.9M | +4% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ✅ | 35.3M | 🟢 **-46%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 66.3M | -4% |
| multipleOf.json | by number | 3 | ✅ | 62.9M | ✅ | 3.8M | 🟢 **-94%** |
| multipleOf.json | by small number | 2 | ✅ | 51.9M | ✅ | 2.3M | 🟢 **-95%** |
| multipleOf.json | float division = inf | 1 | ✅ | 42.7M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 67.0M | ❌ | - | - |
| not.json | not | 2 | ✅ | 61.8M | ✅ | 27.1M | 🟢 **-56%** |
| not.json | not multiple types | 3 | ✅ | 56.0M | ✅ | 45.0M | -20% |
| not.json | not more complex schema | 3 | ✅ | 54.6M | ✅ | 32.0M | 🟢 **-41%** |
| not.json | forbidden property | 2 | ✅ | 41.2M | ✅ | 57.6M | 🔴 **+40%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.0M | ✅ | 18.0M | 🟢 **-63%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.2M | ✅ | 34.8M | 🟢 **-29%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.0M | ✅ | 66.7M | 🟢 **-63%** |
| not.json | double negation | 1 | ✅ | 159.0M | ✅ | 58.8M | 🟢 **-63%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 29.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 52.2M | ✅ | 26.0M | 🟢 **-50%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.1M | ✅ | 44.0M | 🔴 **+33%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.3M | ✅ | 18.3M | 🟢 **-63%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 17.8M | 🟢 **-64%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 38.3M | 🟢 **-23%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ✅ | 21.9M | 🟢 **-46%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.2M | ✅ | 56.1M | -7% |
| oneOf.json | oneOf with required | 4 | ✅ | 40.5M | ✅ | 22.5M | 🟢 **-44%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ✅ | 37.7M | -13% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 56.9M | ✅ | 26.3M | 🟢 **-54%** |
| pattern.json | pattern validation | 8 | ✅ | 51.4M | ✅ | 60.5M | +18% |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.4M | ✅ | 23.0M | 🟢 **-50%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.7M | ✅ | 12.0M | 🟢 **-53%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.9M | ✅ | 5.4M | 🟢 **-64%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.3M | ✅ | 12.6M | 🟢 **-23%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.2M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 18.6M | +5% |
| properties.json | object properties validation | 6 | ✅ | 49.9M | ✅ | 44.1M | -12% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 5.1M | 🟢 **-75%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.8M | ✅ | 12.0M | 🟢 **-73%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 105.9M | 🔴 **+63%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 24.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 69.5M | 🟢 **-59%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.6M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 42.1M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 34.9M | 🔴 **+1040%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 13.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.0M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.8M | ✅ | 16.0M | 🟢 **-30%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.5M | ✅ | 26.4M | 🟢 **-43%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ✅ | 19.0M | 🟢 **-63%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.5M | ✅ | 22.3M | 🟢 **-45%** |
| ref.json | nested refs | 2 | ✅ | 47.9M | ✅ | 17.8M | 🟢 **-63%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.0M | ✅ | 22.4M | 🟢 **-44%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.6M | ✅ | 27.3M | 🟢 **-39%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 27.0M | 🟢 **-42%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.3M | ✅ | 47.0M | 🟢 **-70%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.0M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.1M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 41.4M | ✅ | 22.9M | 🟢 **-45%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 43.9M | ✅ | 3.2M | 🟢 **-93%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 60.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 57.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 59.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 32.1M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 44.4M | ✅ | 23.5M | 🟢 **-47%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 41.1M | ✅ | 26.9M | 🟢 **-34%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.0M | ✅ | 23.3M | 🟢 **-47%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.4M | ✅ | 27.1M | 🟢 **-40%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 59.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 59.5M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 59.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 57.5M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 60.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 23.3M | 🟢 **-63%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 60.5M | ✅ | 27.3M | 🟢 **-55%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.3M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.7M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 60.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 60.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 49.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 59.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 57.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 58.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.9M | ✅ | 31.1M | 🟢 **-46%** |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 108.8M | 🟢 **-32%** |
| required.json | required with empty array | 1 | ✅ | 159.0M | ✅ | 55.0M | 🟢 **-65%** |
| required.json | required with escaped characters | 2 | ✅ | 44.5M | ✅ | 34.7M | 🟢 **-22%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.0M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 21.7M | 🟢 **-59%** |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ✅ | 47.5M | -14% |
| type.json | string type matches strings | 9 | ✅ | 54.6M | ✅ | 24.1M | 🟢 **-56%** |
| type.json | object type matches objects | 7 | ✅ | 45.4M | ✅ | 39.3M | -14% |
| type.json | array type matches arrays | 7 | ✅ | 51.0M | ✅ | 19.9M | 🟢 **-61%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 42.3M | -18% |
| type.json | null type matches only the null object | 10 | ✅ | 48.7M | ✅ | 19.4M | 🟢 **-60%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.8M | ✅ | 44.6M | -14% |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 26.4M | 🟢 **-58%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 47.5M | -15% |
| type.json | type: array, object or null | 5 | ✅ | 62.2M | ✅ | 31.3M | 🟢 **-50%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.8M | ✅ | 120.4M | 🔴 **+44%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 57.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.9M | ✅ | 54.0M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 48.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 80.8M | ✅ | 52.2M | 🟢 **-35%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 46.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 45.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 46.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 82.6M | ✅ | 48.3M | 🟢 **-42%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.0M | ✅ | 82.5M | 🔴 **+293%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.4M | ✅ | 65.9M | 🟢 **-29%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.2M | ✅ | 54.9M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 36.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.6M | ✅ | 56.8M | +4% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 65.4M | ✅ | 35.9M | 🟢 **-45%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 12.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 60.2M | ✅ | 24.2M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 31.0M | ✅ | 85.8M | 🔴 **+176%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 16.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 35.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 30.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.3M | ✅ | 51.6M | 🔴 **+70%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.9M | ✅ | 51.1M | 🔴 **+71%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 38.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.7M | ✅ | 14.0M | 🟢 **-25%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 73.8M | ✅ | 69.4M | -6% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 43.8M | ✅ | 54.6M | 🔴 **+25%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.6M | ✅ | 10.4M | 🟢 **-65%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 15.0M | ✅ | 12.0M | 🟢 **-20%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.2M | ✅ | 66.1M | 🟢 **-59%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 75.2M | ✅ | 44.6M | 🟢 **-41%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.0M | ✅ | 43.4M | 🟢 **-32%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.0M | ✅ | 26.9M | 🟢 **-57%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 60.2M | 🟢 **-25%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 59.1M | 🟢 **-30%** |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 38.6M | -19% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 76.8M | ✅ | 58.7M | 🟢 **-24%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 58.9M | 🟢 **-24%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 28.2M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 56.7M | ✅ | 54.3M | -4% |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.2M | ✅ | 67.8M | +15% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.1M | ✅ | 55.8M | 🟢 **-68%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 35.0M | ✅ | 21.2M | 🟢 **-39%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 41.8M | ✅ | 40.8M | -2% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.3M | ✅ | 27.7M | 🟢 **-43%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.7M | ✅ | 18.8M | 🟢 **-53%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.3M | ✅ | 28.4M | 🟢 **-47%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.4M | ✅ | 19.1M | 🟢 **-25%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 28.6M | +9% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 19.1M | 🟢 **-25%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 26.2M | -2% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 20.7M | -16% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.4M | ✅ | 28.6M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.3M | ✅ | 19.2M | 🟢 **-27%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.2M | ✅ | 33.8M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.6M | ✅ | 15.4M | 🟢 **-44%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.9M | ✅ | 10.8M | 🟢 **-22%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.7M | ✅ | 14.1M | +3% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.2M | ✅ | 17.3M | 🟢 **-31%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 9.6M | 🟢 **-53%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.4M | ✅ | 13.7M | 🟢 **-26%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ✅ | 6.4M | 🟢 **-22%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.3M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 36.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.0M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.1M | ✅ | 8.8M | 🟢 **-76%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.2M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.2M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.6M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 71.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.9M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.4M | ✅ | 65.2M | 🟢 **-21%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 39.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 58.4M | ✅ | 33.9M | 🟢 **-42%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 13.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 44.1M | ✅ | 23.2M | 🟢 **-47%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 44.4M | ✅ | 26.4M | 🟢 **-41%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.4M | ✅ | 23.1M | 🟢 **-48%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 61.1M | ✅ | 27.5M | 🟢 **-55%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 43.3M | ✅ | 23.1M | 🟢 **-47%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.9M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.9M | ✅ | 19.2M | 🟢 **-64%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.1M | ✅ | 11.4M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 27.5M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.1M | ✅ | 19.6M | 🟢 **-41%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 154.5M | ✅ | 109.3M | 🟢 **-29%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 9.3M | 🟢 **-68%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 50.7M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.0M | ✅ | 12.5M | 🟢 **-60%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.2M | ✅ | 24.0M | 🟢 **-36%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 19.6M | 🟢 **-44%** |
| allOf.json | allOf with base schema | 5 | ✅ | 28.3M | ✅ | 20.4M | 🟢 **-28%** |
| allOf.json | allOf simple types | 2 | ✅ | 68.9M | ✅ | 29.0M | 🟢 **-58%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.4M | ✅ | 113.8M | 🟢 **-26%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.1M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 153.6M | ✅ | 76.6M | 🟢 **-50%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 141.9M | ✅ | 115.2M | -19% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.0M | ✅ | 30.4M | 🟢 **-51%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 57.7M | 🟢 **-50%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 32.0M | 🟢 **-51%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 81.8M | ✅ | 30.3M | 🟢 **-63%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 145.8M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 59.9M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 62.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.5M | ✅ | 36.0M | 🟢 **-46%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.1M | ✅ | 45.3M | +19% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 153.9M | ✅ | 76.6M | 🟢 **-50%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 153.8M | ✅ | 116.3M | 🟢 **-24%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 46.5M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.0M | ✅ | 32.3M | 🟢 **-33%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.9M | ✅ | 116.2M | 🟢 **-30%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 30.2M | 🟢 **-53%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 178.3M | ✅ | 124.2M | 🟢 **-30%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 61.5M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 36.4M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 48.7M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 64.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 60.3M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 52.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 49.4M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 49.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 50.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.0M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 54.9M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.1M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 59.4M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 74.3M | -8% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 169.8M | ✅ | 122.7M | 🟢 **-28%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 170.0M | ✅ | 60.2M | 🟢 **-65%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 173.4M | ✅ | 80.8M | 🟢 **-53%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 178.4M | ✅ | 62.6M | 🟢 **-65%** |
| default.json | invalid type for default | 2 | ✅ | 68.0M | ✅ | 65.3M | -4% |
| default.json | invalid string value for default | 2 | ✅ | 52.0M | ✅ | 63.4M | 🔴 **+22%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.3M | ✅ | 53.9M | +9% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.4M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 169.6M | ✅ | 68.8M | 🟢 **-59%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.0M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.1M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.9M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.1M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.6M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 17.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 14.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 11.3M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.5M | ✅ | 66.6M | 🔴 **+685%** |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 18.2M | ✅ | 43.3M | 🔴 **+138%** |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.4M | ✅ | 114.9M | 🔴 **+825%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 16.0M | ✅ | 30.4M | 🔴 **+90%** |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.1M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 7.0M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 10.2M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.4M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 59.1M | -7% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.4M | ✅ | 915K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 73.3M | ✅ | 3.9M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 38.2M | ✅ | 23.4M | 🟢 **-39%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.3M | ✅ | 65.4M | -8% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 58.7M | ✅ | 21.4M | 🟢 **-64%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.0M | ✅ | 4.4M | 🟢 **-92%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 57.6M | ✅ | 26.4M | 🟢 **-54%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.0M | ✅ | 4.5M | 🟢 **-92%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 65.1M | ✅ | 36.2M | 🟢 **-44%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.1M | ✅ | 4.8M | 🟢 **-92%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.5M | ✅ | 35.1M | 🟢 **-48%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.7M | ✅ | 4.8M | 🟢 **-92%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 28.7M | 🟢 **-48%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 56.6M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 57.0M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 177.4M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 176.5M | ✅ | 63.6M | 🟢 **-64%** |
| format.json | regex format | 7 | ✅ | 177.3M | ✅ | 62.7M | 🟢 **-65%** |
| format.json | ipv4 format | 7 | ✅ | 177.9M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 175.6M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 173.5M | ✅ | 72.7M | 🟢 **-58%** |
| format.json | hostname format | 7 | ✅ | 177.7M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 177.3M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 173.6M | ✅ | 46.2M | 🟢 **-73%** |
| format.json | time format | 7 | ✅ | 176.9M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 177.5M | ✅ | 74.3M | 🟢 **-58%** |
| format.json | relative-json-pointer format | 7 | ✅ | 176.5M | ✅ | 68.2M | 🟢 **-61%** |
| format.json | iri format | 7 | ✅ | 177.5M | ✅ | 122.2M | 🟢 **-31%** |
| format.json | iri-reference format | 7 | ✅ | 178.0M | ✅ | 60.3M | 🟢 **-66%** |
| format.json | uri format | 7 | ✅ | 177.1M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 177.9M | ✅ | 73.1M | 🟢 **-59%** |
| format.json | uri-template format | 7 | ✅ | 177.3M | ✅ | 62.1M | 🟢 **-65%** |
| format.json | uuid format | 7 | ✅ | 177.3M | ✅ | 73.4M | 🟢 **-59%** |
| format.json | duration format | 7 | ✅ | 176.8M | ✅ | 67.4M | 🟢 **-62%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 163.9M | ✅ | 120.4M | 🟢 **-27%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 165.2M | ✅ | 62.7M | 🟢 **-62%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 164.5M | ✅ | 66.0M | 🟢 **-60%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 69.4M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.1M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 164.7M | ✅ | 79.6M | 🟢 **-52%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.4M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.6M | ✅ | 14.8M | 🟢 **-63%** |
| items.json | a schema given for items | 4 | ✅ | 58.4M | ✅ | 34.1M | 🟢 **-42%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.5M | ✅ | 98.9M | 🟢 **-40%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.3M | ✅ | 3.1M | 🟢 **-76%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 76.8M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 47.4M | ✅ | 25.6M | 🟢 **-46%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 47.1M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 63.5M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 77.1M | ✅ | 63.5M | -18% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 163.4M | ✅ | 120.2M | 🟢 **-26%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.9M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 49.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ✅ | 42.4M | 🟢 **-42%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.4M | ✅ | 57.5M | -9% |
| maxLength.json | maxLength validation | 5 | ✅ | 58.9M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.8M | ✅ | 30.0M | 🟢 **-42%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.1M | ✅ | 57.8M | +9% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.9M | ✅ | 24.2M | 🟢 **-42%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.2M | ✅ | 38.7M | -10% |
| maximum.json | maximum validation | 4 | ✅ | 68.9M | ✅ | 42.1M | 🟢 **-39%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 71.9M | +6% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 151.1M | ✅ | 75.0M | 🟢 **-50%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 58.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.4M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.4M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 165.3M | ✅ | 65.8M | 🟢 **-60%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ✅ | 42.4M | 🟢 **-42%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.0M | ✅ | 57.2M | -9% |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.1M | ✅ | 22.9M | 🟢 **-56%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.2M | ✅ | 59.4M | +8% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.1M | ✅ | 23.2M | 🟢 **-45%** |
| minimum.json | minimum validation | 4 | ✅ | 68.5M | ✅ | 72.9M | +6% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.8M | ✅ | 40.9M | 🟢 **-37%** |
| multipleOf.json | by int | 3 | ✅ | 69.3M | ✅ | 66.3M | -4% |
| multipleOf.json | by number | 3 | ✅ | 64.1M | ✅ | 3.8M | 🟢 **-94%** |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 2.3M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 29.9M | 🟢 **-52%** |
| not.json | not multiple types | 3 | ✅ | 51.7M | ✅ | 45.0M | -13% |
| not.json | not more complex schema | 3 | ✅ | 57.7M | ✅ | 35.4M | 🟢 **-39%** |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 58.8M | 🔴 **+28%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.6M | ✅ | 20.1M | 🟢 **-59%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 48.5M | ✅ | 35.5M | 🟢 **-27%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 171.9M | ✅ | 74.9M | 🟢 **-56%** |
| not.json | double negation | 1 | ✅ | 153.1M | ✅ | 63.4M | 🟢 **-59%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.5M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ✅ | 29.1M | 🟢 **-43%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.0M | ✅ | 45.3M | 🔴 **+37%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ✅ | 20.8M | 🟢 **-58%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 153.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 20.3M | 🟢 **-59%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.3M | ✅ | 38.2M | 🟢 **-22%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.6M | ✅ | 23.8M | 🟢 **-40%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 56.6M | -8% |
| oneOf.json | oneOf with required | 4 | ✅ | 40.6M | ✅ | 24.7M | 🟢 **-39%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.2M | ✅ | 37.8M | -12% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 28.4M | 🟢 **-54%** |
| pattern.json | pattern validation | 8 | ✅ | 51.4M | ✅ | 58.6M | +14% |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 24.2M | 🟢 **-50%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.3M | ✅ | 12.5M | 🟢 **-51%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ✅ | 5.5M | 🟢 **-64%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.1M | ✅ | 13.3M | 🟢 **-22%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.6M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 19.6M | +11% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.4M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 61.7M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 83.0M | ✅ | 66.3M | 🟢 **-20%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 82.8M | ✅ | 114.5M | 🔴 **+38%** |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ✅ | 30.4M | 🟢 **-39%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 5.5M | 🟢 **-72%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.9M | ✅ | 13.2M | 🟢 **-71%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 107.0M | 🔴 **+65%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.5M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 165.4M | ✅ | 76.1M | 🟢 **-54%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.8M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.3M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.9M | ✅ | 18.6M | -19% |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.1M | ✅ | 26.0M | 🟢 **-44%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.3M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 25.0M | 🟢 **-38%** |
| ref.json | nested refs | 2 | ✅ | 47.7M | ✅ | 23.4M | 🟢 **-51%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 39.5M | ✅ | 22.5M | 🟢 **-43%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 32.0M | 🟢 **-31%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 29.9M | 🟢 **-36%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 153.0M | ✅ | 53.9M | 🟢 **-65%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.8M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.6M | ✅ | 24.7M | 🟢 **-47%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 45.9M | ✅ | 3.3M | 🟢 **-93%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 57.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.7M | ✅ | 26.7M | 🟢 **-43%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ✅ | 31.9M | 🟢 **-32%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ✅ | 26.8M | 🟢 **-43%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.4M | ✅ | 29.9M | 🟢 **-36%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 60.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 59.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 23.4M | 🟢 **-62%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 61.0M | ✅ | 15.3M | 🟢 **-75%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 59.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.5M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 60.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 47.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 59.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 60.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 60.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.8M | ✅ | 33.8M | 🟢 **-42%** |
| required.json | required default validation | 1 | ✅ | 153.3M | ✅ | 110.2M | 🟢 **-28%** |
| required.json | required with empty array | 1 | ✅ | 152.7M | ✅ | 60.7M | 🟢 **-60%** |
| required.json | required with escaped characters | 2 | ✅ | 44.5M | ✅ | 32.2M | 🟢 **-28%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 24.4M | 🟢 **-54%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 45.6M | -17% |
| type.json | string type matches strings | 9 | ✅ | 54.6M | ✅ | 26.8M | 🟢 **-51%** |
| type.json | object type matches objects | 7 | ✅ | 54.5M | ✅ | 39.0M | 🟢 **-28%** |
| type.json | array type matches arrays | 7 | ✅ | 51.1M | ✅ | 22.6M | 🟢 **-56%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 41.7M | -19% |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ✅ | 21.2M | 🟢 **-57%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.4M | ✅ | 44.5M | -14% |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 30.4M | 🟢 **-51%** |
| type.json | type: array or object | 5 | ✅ | 55.5M | ✅ | 47.1M | -15% |
| type.json | type: array, object or null | 5 | ✅ | 67.2M | ✅ | 33.8M | 🟢 **-50%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.7M | ✅ | 121.8M | 🔴 **+45%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 48.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ✅ | 58.5M | -19% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 49.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 80.7M | ✅ | 65.7M | -19% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 47.2M | ✅ | 23.2M | 🟢 **-51%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 83.9M | ✅ | 67.3M | -20% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.1M | ✅ | 70.2M | 🔴 **+233%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.2M | ✅ | 70.0M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ✅ | 59.8M | 🟢 **-23%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 35.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.9M | ✅ | 68.6M | 🔴 **+25%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 34.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 164.8M | ✅ | 26.6M | 🟢 **-84%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 34.7M | ✅ | 16.5M | 🟢 **-53%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 12.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.6M | ✅ | 24.4M | 🟢 **-63%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 29.0M | ✅ | 107.2M | 🔴 **+269%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 30.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.4M | ✅ | 64.6M | 🔴 **+112%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.0M | ✅ | 68.0M | 🔴 **+134%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 41.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ✅ | 15.4M | -20% |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 74.8M | ✅ | 79.9M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.1M | ✅ | 59.4M | 🔴 **+21%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.2M | ✅ | 11.9M | 🟢 **-61%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 38.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 157.2M | ✅ | 72.4M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 75.9M | ✅ | 69.7M | -8% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.9M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.4M | ✅ | 32.3M | 🟢 **-48%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 67.7M | -15% |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 64.5M | 🟢 **-23%** |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 39.0M | -18% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 63.9M | -17% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 64.6M | -16% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 87.5M | ✅ | 72.6M | -17% |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.4M | ✅ | 68.6M | +15% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 169.7M | ✅ | 52.8M | 🟢 **-69%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 31.0M | ✅ | 23.1M | 🟢 **-26%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ✅ | 41.0M | -2% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.7M | ✅ | 30.5M | 🟢 **-37%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.0M | ✅ | 20.7M | 🟢 **-48%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 20.8M | 🟢 **-61%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.0M | ✅ | 28.4M | 🔴 **+49%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 20.7M | -19% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.9M | ✅ | 28.6M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 19.1M | 🟢 **-29%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 31.5M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.1M | ✅ | 20.9M | -13% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.4M | ✅ | 28.7M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 23.4M | ✅ | 27.0M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.4M | ✅ | 25.6M | -3% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.1M | ✅ | 11.4M | -19% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.4M | ✅ | 14.3M | 0% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.2M | ✅ | 19.0M | 🟢 **-25%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 10.2M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.9M | ✅ | 13.8M | 🟢 **-34%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 5.2M | 🟢 **-34%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 21.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.7M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.6M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 38.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.6M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 33.5M | ✅ | 9.0M | 🟢 **-73%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.3M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.6M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.9M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.7M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 35.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.4M | ✅ | 70.0M | 🟢 **-21%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.7M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.5M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 22.6M | ✅ | 9.9M | 🟢 **-56%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 20.3M | ✅ | 12.7M | 🟢 **-37%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.9M | ✅ | 37.7M | 🟢 **-37%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 55.9M | ✅ | 26.1M | 🟢 **-53%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.3M | ✅ | 29.4M | 🟢 **-36%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.9M | ✅ | 26.1M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.3M | ✅ | 30.6M | 🟢 **-51%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.3M | ✅ | 26.0M | 🟢 **-44%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.4M | ❌ | - | - |
