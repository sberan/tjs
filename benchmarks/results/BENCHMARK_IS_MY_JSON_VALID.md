# tjs vs is-my-json-valid Benchmarks

Performance comparison of **tjs** vs **[is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | is-my-json-valid pass | is-my-json-valid ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 28.4M | 163/199 | 15.5M | 163 | 🟢 **-45%** |
| draft6 | 276 | ✅ 276 | 29.6M | 182/276 | 16.4M | 182 | 🟢 **-45%** |
| draft7 | 313 | ✅ 313 | 16.2M | 193/313 | 18.5M | 193 | +14% |
| draft2019-09 | 435 | ✅ 435 | 19.7M | 231/435 | 20.0M | 231 | +2% |
| draft2020-12 | 448 | ✅ 448 | 20.4M | 219/448 | 20.3M | 219 | -1% |
| **Total** | 1671 | 1670/1671 | 20.8M | 988/1671 | 18.1M | 988 | -13% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.43x faster** (23 ns vs 55 ns per test, 3702 tests in 988 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 59.4M | ✅ | 12.7M | 🟢 **-79%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.0M | ✅ | 62.0M | 🟢 **-61%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.4M | ✅ | 37.5M | 🟢 **-74%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.2M | ✅ | 79.4M | 🟢 **-54%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 53.1M | 🟢 **-57%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.3M | ✅ | 20.0M | 🟢 **-57%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.4M | ✅ | 22.5M | 🟢 **-62%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.6M | ✅ | 44.5M | 🟢 **-39%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.1M | ✅ | 76.5M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 48.6M | ✅ | 17.6M | 🟢 **-64%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 42.0M | ✅ | 11.6M | 🟢 **-72%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.1M | ✅ | 27.4M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.4M | ✅ | 19.8M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 157.6M | ✅ | 110.0M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.4M | ✅ | 9.2M | 🟢 **-72%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.5M | ✅ | 50.8M | -3% |
| allOf.json | allOf | 4 | ✅ | 47.7M | ✅ | 19.6M | 🟢 **-59%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.2M | ✅ | 20.3M | 🟢 **-25%** |
| allOf.json | allOf simple types | 2 | ✅ | 92.4M | ✅ | 29.1M | 🟢 **-69%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.2M | ✅ | 114.0M | 🟢 **-28%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.7M | ✅ | 74.5M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.4M | ✅ | 58.4M | +6% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 32.1M | 🟢 **-73%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 61.1M | 🟢 **-22%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 17.4M | 🟢 **-79%** |
| anyOf.json | anyOf | 4 | ✅ | 81.9M | ✅ | 64.0M | 🟢 **-22%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.9M | ✅ | 26.7M | 🟢 **-48%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.1M | ✅ | 46.7M | -7% |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ✅ | 72.8M | 🟢 **-58%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 32.1M | 🟢 **-59%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 98.3M | -9% |
| default.json | invalid string value for default | 2 | ✅ | 51.1M | ✅ | 66.1M | 🔴 **+29%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.2M | ✅ | 33.0M | 🟢 **-58%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.6M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.2M | ✅ | 44.5M | 🟢 **-51%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.6M | ✅ | 33.3M | -4% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.3M | ✅ | 23.0M | 🟢 **-61%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.6M | ✅ | 13.1M | +12% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 47.1M | ✅ | 35.1M | 🟢 **-25%** |
| enum.json | simple enum validation | 2 | ✅ | 75.2M | ✅ | 31.1M | 🟢 **-59%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 966K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 15.2M | ✅ | 32.5M | 🔴 **+114%** |
| enum.json | enum with escaped characters | 3 | ✅ | 59.4M | ✅ | 17.1M | 🟢 **-71%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 108.6M | ✅ | 46.9M | 🟢 **-57%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.7M | ✅ | 4.1M | 🟢 **-93%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 108.3M | ✅ | 46.7M | 🟢 **-57%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.0M | ✅ | 4.3M | 🟢 **-93%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 36.2M | 🟢 **-68%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 67.2M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.2M | ✅ | 53.4M | 🟢 **-52%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.4M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 87.9M | ✅ | 49.8M | 🟢 **-43%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 57.8M | ✅ | 25.5M | 🟢 **-56%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 50.5M | 🟢 **-46%** |
| format.json | email format | 6 | ✅ | 92.8M | ✅ | 70.6M | 🟢 **-24%** |
| format.json | ipv4 format | 6 | ✅ | 162.6M | ✅ | 114.7M | 🟢 **-29%** |
| format.json | ipv6 format | 6 | ✅ | 82.1M | ✅ | 70.2M | -15% |
| format.json | hostname format | 6 | ✅ | 157.0M | ✅ | 71.7M | 🟢 **-54%** |
| format.json | date-time format | 6 | ✅ | 92.7M | ✅ | 63.3M | 🟢 **-32%** |
| format.json | uri format | 6 | ✅ | 163.4M | ✅ | 71.7M | 🟢 **-56%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.8M | ✅ | 16.0M | 🟢 **-64%** |
| items.json | a schema given for items | 4 | ✅ | 81.5M | ✅ | 33.8M | 🟢 **-58%** |
| items.json | an array of schemas for items | 6 | ✅ | 68.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.7M | ✅ | 6.6M | 🟢 **-77%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 2.1M | 🟢 **-83%** |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 63.2M | -16% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 79.3M | -2% |
| maxItems.json | maxItems validation | 4 | ✅ | 79.0M | ✅ | 41.4M | 🟢 **-48%** |
| maxLength.json | maxLength validation | 5 | ✅ | 66.8M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.3M | ✅ | 39.6M | 🟢 **-32%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 25.3M | ✅ | 35.8M | 🔴 **+42%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 40.4M | 🟢 **-47%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.5M | ✅ | 66.4M | -12% |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 42.0M | 🟢 **-45%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ✅ | 50.7M | 🟢 **-28%** |
| minItems.json | minItems validation | 4 | ✅ | 80.8M | ✅ | 41.4M | 🟢 **-49%** |
| minLength.json | minLength validation | 5 | ✅ | 57.7M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 37.7M | 🟢 **-37%** |
| minimum.json | minimum validation | 4 | ✅ | 76.8M | ✅ | 64.6M | -16% |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 39.4M | 🟢 **-49%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 70.4M | ✅ | 50.1M | 🟢 **-29%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 40.6M | 🟢 **-44%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 66.5M | -14% |
| multipleOf.json | by number | 3 | ✅ | 70.7M | ✅ | 3.8M | 🟢 **-95%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 2.3M | 🟢 **-97%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 24.0M | 🟢 **-69%** |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 44.8M | 🟢 **-37%** |
| not.json | not more complex schema | 3 | ✅ | 68.3M | ✅ | 35.4M | 🟢 **-48%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 59.1M | +9% |
| not.json | forbid everything with empty schema | 9 | ✅ | 54.6M | ✅ | 20.2M | 🟢 **-63%** |
| not.json | double negation | 1 | ✅ | 95.9M | ✅ | 105.9M | +10% |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 29.0M | 🟢 **-57%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.4M | ✅ | 44.9M | 🔴 **+20%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.9M | ✅ | 24.0M | 🟢 **-47%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 70.4M | ✅ | 56.5M | -20% |
| oneOf.json | oneOf with required | 4 | ✅ | 42.9M | ✅ | 24.7M | 🟢 **-43%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.1M | ✅ | 37.6M | 🟢 **-23%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 32.4M | 🟢 **-57%** |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ✅ | 60.9M | +8% |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.1M | ✅ | 24.2M | -4% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.7M | ✅ | 12.0M | 🟢 **-55%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ✅ | 5.0M | 🟢 **-66%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.7M | ✅ | 12.8M | 🟢 **-28%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 19.2M | +6% |
| properties.json | object properties validation | 6 | ✅ | 56.1M | ✅ | 48.4M | -14% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ✅ | 8.4M | 🟢 **-56%** |
| properties.json | properties with escaped characters | 2 | ✅ | 52.7M | ✅ | 31.8M | 🟢 **-40%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 68.3M | -3% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.3M | ✅ | 18.6M | 🟢 **-29%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.3M | ✅ | 26.0M | 🟢 **-52%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.1M | ✅ | 23.4M | 🟢 **-60%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.5M | ✅ | 25.0M | 🟢 **-47%** |
| ref.json | nested refs | 2 | ✅ | 38.8M | ✅ | 23.3M | 🟢 **-40%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 53.8M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ✅ | 26.9M | 🟢 **-65%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 55.0M | ✅ | 32.3M | 🟢 **-41%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 28.9M | 🟢 **-47%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.8M | ✅ | 26.3M | 🟢 **-52%** |
| ref.json | Location-independent identifier | 2 | ✅ | 77.1M | ✅ | 31.4M | 🟢 **-59%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.6M | ✅ | 3.2M | 🟢 **-94%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 32.4M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 26.7M | 🟢 **-65%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 30.2M | 🟢 **-61%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 47.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 44.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.8M | ✅ | 29.8M | 🟢 **-53%** |
| required.json | required default validation | 1 | ✅ | 97.9M | ✅ | 110.0M | +12% |
| required.json | required with escaped characters | 2 | ✅ | 53.8M | ✅ | 17.0M | 🟢 **-69%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 64.5M | ✅ | 18.0M | 🟢 **-72%** |
| type.json | number type matches numbers | 9 | ✅ | 67.4M | ✅ | 47.0M | 🟢 **-30%** |
| type.json | string type matches strings | 9 | ✅ | 67.1M | ✅ | 26.9M | 🟢 **-60%** |
| type.json | object type matches objects | 7 | ✅ | 57.9M | ✅ | 38.5M | 🟢 **-33%** |
| type.json | array type matches arrays | 7 | ✅ | 63.3M | ✅ | 22.7M | 🟢 **-64%** |
| type.json | boolean type matches booleans | 10 | ✅ | 65.6M | ✅ | 42.2M | 🟢 **-36%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.0M | ✅ | 21.9M | 🟢 **-66%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 64.8M | ✅ | 44.6M | 🟢 **-31%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 30.6M | 🟢 **-60%** |
| type.json | type: array or object | 5 | ✅ | 72.1M | ✅ | 28.0M | 🟢 **-61%** |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 55.9M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.3M | ✅ | 10.3M | 🟢 **-69%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 11.8M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 154.8M | ✅ | 72.3M | 🟢 **-53%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.9M | ✅ | 46.6M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 71.0M | ✅ | 44.8M | 🟢 **-37%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 67.3M | 🟢 **-24%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 64.2M | 🟢 **-28%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 38.4M | 🟢 **-39%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 63.0M | 🟢 **-20%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 37.4M | 🟢 **-38%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 63.9M | -19% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 21.9M | 🟢 **-63%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.7M | ✅ | 20.7M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 20.1M | ✅ | 28.2M | 🔴 **+40%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ✅ | 20.6M | 🟢 **-27%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 28.4M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.8M | ✅ | 18.9M | 🟢 **-37%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.4M | ✅ | 30.3M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.7M | ✅ | 20.1M | 🟢 **-32%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.4M | ✅ | 28.3M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 26.8M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 25.1M | 🟢 **-22%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ✅ | 11.2M | 🟢 **-28%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.3M | ✅ | 13.6M | -11% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.1M | ✅ | 19.0M | 🟢 **-32%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.8M | ✅ | 10.0M | 🟢 **-52%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 21.1M | ✅ | 13.4M | 🟢 **-36%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 6.5M | -19% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.7M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ✅ | 5.6M | 🟢 **-50%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 39.0M | ✅ | 10.5M | 🟢 **-73%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.4M | ✅ | 74.1M | -16% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 22.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.8M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 12.2M | 🔴 **+66%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.0M | ✅ | 16.9M | 🟢 **-53%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.5M | ✅ | 45.3M | 🟢 **-72%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.8M | ✅ | 28.6M | 🟢 **-61%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.3M | ✅ | 121.7M | 🟢 **-29%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 53.2M | 🟢 **-28%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.8M | ✅ | 14.3M | 🟢 **-74%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.1M | ✅ | 22.5M | 🟢 **-47%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 44.6M | 🟢 **-59%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.0M | ✅ | 76.5M | 🟢 **-50%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 63.6M | ✅ | 17.3M | 🟢 **-73%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.0M | ✅ | 9.3M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.7M | ✅ | 26.3M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.4M | ✅ | 19.7M | 🟢 **-39%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ✅ | 109.4M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.8M | ✅ | 9.3M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 50.7M | 🟢 **-27%** |
| allOf.json | allOf | 4 | ✅ | 38.3M | ✅ | 19.5M | 🟢 **-49%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 20.1M | 🟢 **-34%** |
| allOf.json | allOf simple types | 2 | ✅ | 55.1M | ✅ | 28.9M | 🟢 **-48%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 114.5M | 🟢 **-28%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.5M | ✅ | 76.5M | 🟢 **-52%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.2M | ✅ | 58.5M | 🟢 **-63%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.9M | ✅ | 54.9M | 🟢 **-21%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 29.3M | 🟢 **-75%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.9M | ✅ | 55.6M | 🟢 **-22%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 17.2M | 🟢 **-80%** |
| anyOf.json | anyOf | 4 | ✅ | 71.9M | ✅ | 61.2M | -15% |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.0M | ✅ | 26.2M | 🟢 **-49%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 115.9M | 🟢 **-27%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.1M | ✅ | 76.3M | 🟢 **-52%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.8M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.0M | ✅ | 31.8M | 🟢 **-55%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.5M | ✅ | 116.3M | 🟢 **-32%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 32.2M | 🟢 **-73%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 152.8M | ✅ | 119.5M | 🟢 **-22%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 54.3M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 48.4M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 52.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 67.5M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 112.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 60.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 90.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.4M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.0M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 58.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 60.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.5M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 49.9M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.8M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 89.7M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 63.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.6M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 74.2M | +5% |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 98.5M | -8% |
| default.json | invalid string value for default | 2 | ✅ | 48.9M | ✅ | 63.4M | 🔴 **+30%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.1M | ✅ | 32.9M | 🟢 **-57%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 49.6M | ✅ | 44.3M | -11% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.2M | ✅ | 95.6M | 🟢 **-45%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.6M | ✅ | 23.2M | 🟢 **-42%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 43.0M | ✅ | 38.4M | -11% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 84.3M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 10.9M | ✅ | 13.7M | 🔴 **+25%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 33.3M | ✅ | 35.0M | +5% |
| enum.json | simple enum validation | 2 | ✅ | 68.6M | ✅ | 31.8M | 🟢 **-54%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 945K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 34.3M | ✅ | 3.8M | 🟢 **-89%** |
| enum.json | enums in properties | 6 | ✅ | 15.4M | ✅ | 37.2M | 🔴 **+141%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.6M | ✅ | 37.8M | 🟢 **-48%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 104.1M | ✅ | 45.7M | 🟢 **-56%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.6M | ✅ | 4.1M | 🟢 **-93%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 110.9M | ✅ | 45.5M | 🟢 **-59%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 57.6M | ✅ | 4.2M | 🟢 **-93%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.8M | ✅ | 63.4M | 🟢 **-44%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 47.7M | ✅ | 4.6M | 🟢 **-90%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 101.4M | ✅ | 63.1M | 🟢 **-38%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 44.3M | ✅ | 4.6M | 🟢 **-90%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 49.6M | 🟢 **-46%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 65.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.3M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 74.8M | ✅ | 71.7M | -4% |
| format.json | ipv4 format | 6 | ✅ | 156.0M | ✅ | 70.4M | 🟢 **-55%** |
| format.json | ipv6 format | 6 | ✅ | 79.9M | ✅ | 115.4M | 🔴 **+44%** |
| format.json | hostname format | 6 | ✅ | 160.5M | ✅ | 70.2M | 🟢 **-56%** |
| format.json | date-time format | 6 | ✅ | 75.1M | ✅ | 73.8M | -2% |
| format.json | json-pointer format | 6 | ✅ | 157.3M | ✅ | 112.8M | 🟢 **-28%** |
| format.json | uri format | 6 | ✅ | 78.7M | ✅ | 71.8M | -9% |
| format.json | uri-reference format | 6 | ✅ | 150.4M | ✅ | 72.1M | 🟢 **-52%** |
| format.json | uri-template format | 6 | ✅ | 79.1M | ✅ | 63.5M | -20% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 48.1M | ✅ | 13.2M | 🟢 **-73%** |
| items.json | a schema given for items | 4 | ✅ | 49.9M | ✅ | 49.1M | -2% |
| items.json | an array of schemas for items | 6 | ✅ | 102.2M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.8M | ✅ | 65.5M | 🟢 **-62%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.5M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 59.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.3M | ✅ | 8.1M | 🟢 **-72%** |
| items.json | nested items | 3 | ✅ | 11.6M | ✅ | 2.2M | 🟢 **-81%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 93.6M | 🔴 **+36%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 57.9M | 🟢 **-21%** |
| maxItems.json | maxItems validation | 4 | ✅ | 71.3M | ✅ | 71.9M | +1% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.4M | ✅ | 29.9M | 🟢 **-55%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 55.1M | ✅ | 31.9M | 🟢 **-42%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 56.4M | +3% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.3M | ✅ | 23.7M | 🟢 **-50%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 46.3M | ✅ | 38.2M | -18% |
| maximum.json | maximum validation | 4 | ✅ | 69.8M | ✅ | 42.0M | 🟢 **-40%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.9M | ✅ | 71.6M | +4% |
| minItems.json | minItems validation | 4 | ✅ | 71.4M | ✅ | 41.5M | 🟢 **-42%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 51.5M | 🟢 **-22%** |
| minLength.json | minLength validation | 5 | ✅ | 53.4M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.7M | ✅ | 29.6M | 🟢 **-46%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.6M | ✅ | 59.1M | +6% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.9M | ✅ | 24.3M | 🟢 **-49%** |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ✅ | 72.7M | +4% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ✅ | 40.5M | 🟢 **-39%** |
| multipleOf.json | by int | 3 | ✅ | 70.0M | ✅ | 65.0M | -7% |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 3.8M | 🟢 **-94%** |
| multipleOf.json | by small number | 2 | ✅ | 61.6M | ✅ | 2.3M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ❌ | - | - |
| not.json | not | 2 | ✅ | 69.9M | ✅ | 30.8M | 🟢 **-56%** |
| not.json | not multiple types | 3 | ✅ | 64.6M | ✅ | 43.8M | 🟢 **-32%** |
| not.json | not more complex schema | 3 | ✅ | 62.7M | ✅ | 31.4M | 🟢 **-50%** |
| not.json | forbidden property | 2 | ✅ | 45.4M | ✅ | 54.6M | 🔴 **+20%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.6M | ✅ | 20.2M | 🟢 **-65%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.7M | ✅ | 33.4M | 🟢 **-42%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 183.8M | ✅ | 75.2M | 🟢 **-59%** |
| not.json | double negation | 1 | ✅ | 159.2M | ✅ | 63.9M | 🟢 **-60%** |
| oneOf.json | oneOf | 4 | ✅ | 62.0M | ✅ | 47.8M | 🟢 **-23%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.5M | ✅ | 25.6M | 🟢 **-28%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.3M | ✅ | 33.8M | 🟢 **-44%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.6M | ✅ | 20.1M | 🟢 **-67%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.5M | ✅ | 35.6M | 🟢 **-41%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 46.7M | ✅ | 23.0M | 🟢 **-51%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.1M | ✅ | 55.0M | 🟢 **-20%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.8M | ✅ | 24.6M | 🟢 **-45%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.6M | ✅ | 37.2M | 🟢 **-20%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.2M | ✅ | 30.6M | 🟢 **-56%** |
| pattern.json | pattern validation | 8 | ✅ | 51.9M | ✅ | 58.0M | +12% |
| pattern.json | pattern is not anchored | 1 | ✅ | 13.7M | ✅ | 23.9M | 🔴 **+74%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ✅ | 12.3M | 🟢 **-53%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.4M | ✅ | 5.2M | 🟢 **-61%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.4M | ✅ | 12.8M | 🟢 **-26%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 14.4M | ✅ | 19.2M | 🔴 **+33%** |
| properties.json | object properties validation | 6 | ✅ | 51.1M | ✅ | 47.6M | -7% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ✅ | 4.9M | 🟢 **-75%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.2M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 45.0M | ✅ | 13.8M | 🟢 **-69%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.5M | ✅ | 61.1M | -5% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.6M | ✅ | 74.9M | 🟢 **-56%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 47.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.1M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.7M | ✅ | 17.3M | 🟢 **-30%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 50.7M | ✅ | 29.3M | 🟢 **-42%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ✅ | 21.2M | 🟢 **-59%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.5M | ✅ | 25.0M | 🟢 **-44%** |
| ref.json | nested refs | 2 | ✅ | 38.6M | ✅ | 21.3M | 🟢 **-45%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.8M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.4M | ✅ | 30.2M | 🟢 **-40%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.5M | ✅ | 31.1M | 🟢 **-36%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.0M | ✅ | 56.2M | 🟢 **-65%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.8M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 50.8M | ✅ | 26.1M | 🟢 **-49%** |
| ref.json | Location-independent identifier | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 42.2M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.0M | ✅ | 3.2M | 🟢 **-94%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 34.0M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 48.1M | ✅ | 26.6M | 🟢 **-45%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 47.7M | ✅ | 31.6M | 🟢 **-34%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.3M | ✅ | 25.9M | 🟢 **-49%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.1M | ✅ | 30.7M | 🟢 **-39%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 26.7M | 🟢 **-62%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.8M | ✅ | 31.6M | 🟢 **-55%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.0M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 43.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.7M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.6M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 38.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 37.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 37.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 60.1M | ✅ | 33.5M | 🟢 **-44%** |
| required.json | required default validation | 1 | ✅ | 159.0M | ✅ | 109.6M | 🟢 **-31%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 60.7M | 🟢 **-62%** |
| required.json | required with escaped characters | 2 | ✅ | 49.9M | ✅ | 32.2M | 🟢 **-35%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 60.0M | ✅ | 24.2M | 🟢 **-60%** |
| type.json | number type matches numbers | 9 | ✅ | 62.0M | ✅ | 45.1M | 🟢 **-27%** |
| type.json | string type matches strings | 9 | ✅ | 61.6M | ✅ | 26.3M | 🟢 **-57%** |
| type.json | object type matches objects | 7 | ✅ | 54.6M | ✅ | 37.3M | 🟢 **-32%** |
| type.json | array type matches arrays | 7 | ✅ | 57.8M | ✅ | 22.5M | 🟢 **-61%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.5M | ✅ | 38.8M | 🟢 **-35%** |
| type.json | null type matches only the null object | 10 | ✅ | 59.1M | ✅ | 21.8M | 🟢 **-63%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.0M | ✅ | 42.9M | 🟢 **-29%** |
| type.json | type as array with one item | 2 | ✅ | 69.7M | ✅ | 30.4M | 🟢 **-56%** |
| type.json | type: array or object | 5 | ✅ | 65.6M | ✅ | 27.8M | 🟢 **-58%** |
| type.json | type: array, object or null | 5 | ✅ | 70.0M | ✅ | 54.4M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.7M | ✅ | 10.6M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.6M | ✅ | 11.7M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ✅ | 72.5M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.2M | ✅ | 46.6M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 65.9M | ✅ | 45.4M | 🟢 **-31%** |
| optional/bignum.json | integer | 2 | ✅ | 79.5M | ✅ | 67.4M | -15% |
| optional/bignum.json | number | 2 | ✅ | 79.8M | ✅ | 64.5M | -19% |
| optional/bignum.json | string | 1 | ✅ | 58.6M | ✅ | 36.9M | 🟢 **-37%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 64.7M | -10% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.8M | ✅ | 63.7M | -11% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 67.9M | ✅ | 20.6M | 🟢 **-70%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 34.9M | ✅ | 24.4M | 🟢 **-30%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ✅ | 20.5M | 🟢 **-23%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 28.7M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 19.0M | 🟢 **-34%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 30.4M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.5M | ✅ | 20.8M | 🟢 **-27%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.3M | ✅ | 27.4M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 33.4M | ✅ | 27.0M | -19% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.5M | ✅ | 26.0M | -15% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.0M | ✅ | 11.6M | 🟢 **-28%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 14.1M | -9% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.1M | ✅ | 18.8M | 🟢 **-33%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.4M | ✅ | 9.9M | 🟢 **-49%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.3M | ✅ | 13.4M | 🟢 **-34%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 6.2M | 🟢 **-23%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 13.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.4M | ✅ | 5.9M | 🟢 **-43%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.6M | ✅ | 10.7M | 🟢 **-74%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.1M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.2M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.2M | ✅ | 70.4M | -11% |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.8M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.3M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 44.8M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 43.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.5M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 5.8M | -20% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.9M | ✅ | 16.6M | 🟢 **-57%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 134.5M | ✅ | 90.6M | 🟢 **-33%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.3M | ✅ | 28.4M | 🟢 **-61%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.5M | ✅ | 122.3M | 🟢 **-29%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 53.1M | 🟢 **-34%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 50.5M | ✅ | 18.7M | 🟢 **-63%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.5M | ✅ | 22.4M | 🟢 **-47%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 43.6M | 🟢 **-60%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.1M | ✅ | 76.6M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 63.2M | ✅ | 16.4M | 🟢 **-74%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.0M | ✅ | 11.6M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.4M | ✅ | 27.4M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.7M | ✅ | 19.5M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 110.1M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.9M | ✅ | 9.3M | 🟢 **-69%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 50.3M | 🟢 **-28%** |
| allOf.json | allOf | 4 | ✅ | 40.9M | ✅ | 19.4M | 🟢 **-53%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 20.2M | 🟢 **-34%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 28.9M | 🟢 **-60%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.6M | ✅ | 114.5M | 🟢 **-28%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 76.6M | 🟢 **-52%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 114.7M | 🟢 **-28%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 29.3M | 🟢 **-62%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 56.9M | 🟢 **-52%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 30.5M | 🟢 **-61%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 28.5M | 🟢 **-66%** |
| anyOf.json | anyOf | 4 | ✅ | 81.7M | ✅ | 39.9M | 🟢 **-51%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 58.7M | ✅ | 44.6M | 🟢 **-24%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 72.2M | 🟢 **-55%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.2M | ✅ | 116.4M | 🟢 **-27%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 73.0M | ✅ | 31.0M | 🟢 **-57%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ✅ | 116.1M | 🟢 **-32%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 30.6M | 🟢 **-74%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 182.3M | ✅ | 115.2M | 🟢 **-37%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.4M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.4M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 57.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 72.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.8M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 62.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.9M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.0M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 70.6M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 58.0M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 99.0M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.5M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 48.0M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 34.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ✅ | 73.5M | 🟢 **-41%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 95.8M | 🔴 **+34%** |
| default.json | invalid string value for default | 2 | ✅ | 69.8M | ✅ | 62.7M | -10% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.8M | ✅ | 32.6M | 🟢 **-37%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 62.5M | ✅ | 44.8M | 🟢 **-28%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 92.0M | ✅ | 95.0M | +3% |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.4M | ✅ | 22.9M | 🟢 **-33%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.7M | ✅ | 38.6M | -17% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 56.1M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.7M | ✅ | 13.7M | 🟢 **-27%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 19.8M | ✅ | 35.6M | 🔴 **+80%** |
| enum.json | simple enum validation | 2 | ✅ | 69.1M | ✅ | 32.5M | 🟢 **-53%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.2M | ✅ | 921K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 73.1M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 14.4M | ✅ | 36.8M | 🔴 **+155%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ✅ | 37.5M | 🟢 **-53%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 63.9M | ✅ | 45.7M | 🟢 **-28%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.6M | ✅ | 4.0M | 🟢 **-93%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.8M | ✅ | 46.4M | 🟢 **-39%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.3M | ✅ | 4.1M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 58.7M | 🟢 **-21%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 64.4M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 34.8M | ✅ | 59.9M | 🔴 **+72%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.9M | ✅ | 4.6M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.7M | ✅ | 44.0M | 🟢 **-32%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 70.8M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 51.0M | ✅ | 71.4M | 🔴 **+40%** |
| format.json | idn-email format | 6 | ✅ | 83.2M | ✅ | 68.2M | -18% |
| format.json | regex format | 6 | ✅ | 91.6M | ✅ | 120.9M | 🔴 **+32%** |
| format.json | ipv4 format | 6 | ✅ | 88.9M | ✅ | 69.8M | 🟢 **-22%** |
| format.json | ipv6 format | 6 | ✅ | 82.9M | ✅ | 70.9M | -14% |
| format.json | idn-hostname format | 6 | ✅ | 91.5M | ✅ | 108.4M | +18% |
| format.json | hostname format | 6 | ✅ | 83.8M | ✅ | 71.6M | -15% |
| format.json | date format | 6 | ✅ | 83.5M | ✅ | 69.1M | -17% |
| format.json | date-time format | 6 | ✅ | 91.6M | ✅ | 113.9M | 🔴 **+24%** |
| format.json | time format | 6 | ✅ | 83.4M | ✅ | 35.9M | 🟢 **-57%** |
| format.json | json-pointer format | 6 | ✅ | 91.8M | ✅ | 71.8M | 🟢 **-22%** |
| format.json | relative-json-pointer format | 6 | ✅ | 82.8M | ✅ | 107.8M | 🔴 **+30%** |
| format.json | iri format | 6 | ✅ | 81.0M | ✅ | 60.3M | 🟢 **-26%** |
| format.json | iri-reference format | 6 | ✅ | 83.8M | ✅ | 39.7M | 🟢 **-53%** |
| format.json | uri format | 6 | ✅ | 92.2M | ✅ | 111.9M | 🔴 **+21%** |
| format.json | uri-reference format | 6 | ✅ | 92.2M | ✅ | 72.1M | 🟢 **-22%** |
| format.json | uri-template format | 6 | ✅ | 83.9M | ✅ | 70.3M | -16% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.7M | ✅ | 121.9M | 🟢 **-29%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.2M | ✅ | 62.8M | 🟢 **-63%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 70.0M | 🟢 **-59%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.1M | ✅ | 79.6M | 🟢 **-54%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 46.7M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.9M | ✅ | 15.5M | 🟢 **-66%** |
| items.json | a schema given for items | 4 | ✅ | 53.8M | ✅ | 31.9M | 🟢 **-41%** |
| items.json | an array of schemas for items | 6 | ✅ | 56.0M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ✅ | 55.2M | 🟢 **-68%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 84.0M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 58.0M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.9M | ✅ | 7.9M | 🟢 **-39%** |
| items.json | nested items | 3 | ✅ | 11.8M | ✅ | 2.1M | 🟢 **-82%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 93.6M | 🔴 **+24%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 57.8M | 🟢 **-29%** |
| maxItems.json | maxItems validation | 4 | ✅ | 80.5M | ✅ | 73.2M | -9% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.5M | ✅ | 30.1M | 🟢 **-58%** |
| maxLength.json | maxLength validation | 5 | ✅ | 62.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.4M | ✅ | 30.1M | 🟢 **-49%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.2M | ✅ | 58.8M | +1% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.3M | ✅ | 24.0M | 🟢 **-52%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ✅ | 37.6M | 🟢 **-27%** |
| maximum.json | maximum validation | 4 | ✅ | 76.8M | ✅ | 42.1M | 🟢 **-45%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.5M | ✅ | 66.7M | -12% |
| minItems.json | minItems validation | 4 | ✅ | 78.6M | ✅ | 42.4M | 🟢 **-46%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.7M | ✅ | 55.8M | 🟢 **-23%** |
| minLength.json | minLength validation | 5 | ✅ | 57.2M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.7M | ✅ | 30.1M | 🟢 **-49%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ✅ | 40.6M | 🟢 **-32%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.9M | ✅ | 24.2M | 🟢 **-52%** |
| minimum.json | minimum validation | 4 | ✅ | 76.7M | ✅ | 63.3M | -17% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.1M | ✅ | 41.0M | 🟢 **-43%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 66.1M | -15% |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ✅ | 3.8M | 🟢 **-95%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 2.3M | 🟢 **-97%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 76.9M | ✅ | 31.1M | 🟢 **-60%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 44.7M | 🟢 **-37%** |
| not.json | not more complex schema | 3 | ✅ | 68.8M | ✅ | 35.2M | 🟢 **-49%** |
| not.json | forbidden property | 2 | ✅ | 54.3M | ✅ | 58.1M | +7% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.5M | ✅ | 20.6M | 🟢 **-66%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 59.6M | ✅ | 32.1M | 🟢 **-46%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 182.6M | ✅ | 75.0M | 🟢 **-59%** |
| not.json | double negation | 1 | ✅ | 159.1M | ✅ | 76.7M | 🟢 **-52%** |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 48.1M | 🟢 **-28%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.0M | ✅ | 25.9M | 🟢 **-28%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 37.4M | 🟢 **-43%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 20.9M | 🟢 **-68%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 65.9M | ✅ | 37.7M | 🟢 **-43%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.8M | ✅ | 23.7M | 🟢 **-46%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 52.6M | 🟢 **-31%** |
| oneOf.json | oneOf with required | 4 | ✅ | 47.8M | ✅ | 24.5M | 🟢 **-49%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 59.0M | ✅ | 36.4M | 🟢 **-38%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 27.8M | 🟢 **-64%** |
| pattern.json | pattern validation | 8 | ✅ | 56.0M | ✅ | 62.0M | +11% |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 24.2M | -5% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ✅ | 12.1M | 🟢 **-55%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.7M | ✅ | 6.0M | 🟢 **-56%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.9M | ✅ | 11.9M | 🟢 **-33%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.6M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 19.2M | +6% |
| properties.json | object properties validation | 6 | ✅ | 56.3M | ✅ | 47.7M | -15% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 5.0M | 🟢 **-75%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.4M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 53.1M | ✅ | 13.7M | 🟢 **-74%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 105.8M | 🔴 **+51%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.3M | ✅ | 76.5M | 🟢 **-55%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.3M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.2M | ✅ | 13.9M | 🟢 **-47%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.0M | ✅ | 29.3M | 🟢 **-47%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.1M | ✅ | 21.2M | 🟢 **-64%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.1M | ✅ | 24.8M | 🟢 **-47%** |
| ref.json | nested refs | 2 | ✅ | 42.6M | ✅ | 21.1M | 🟢 **-50%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 58.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 53.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.3M | ✅ | 30.2M | 🟢 **-44%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 29.9M | 🟢 **-45%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.7M | ✅ | 56.0M | 🟢 **-65%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.9M | ✅ | 26.0M | 🟢 **-53%** |
| ref.json | Location-independent identifier | 2 | ✅ | 52.6M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 53.0M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.8M | ✅ | 3.1M | 🟢 **-94%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.2M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 51.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.8M | ✅ | 23.4M | 🟢 **-57%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.5M | ✅ | 29.7M | 🟢 **-45%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.7M | ✅ | 23.2M | 🟢 **-58%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.7M | ✅ | 28.2M | 🟢 **-48%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.5M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.8M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 25.3M | 🟢 **-67%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 30.2M | 🟢 **-61%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 50.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.7M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 51.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.1M | ✅ | 33.5M | 🟢 **-48%** |
| required.json | required default validation | 1 | ✅ | 159.6M | ✅ | 108.4M | 🟢 **-32%** |
| required.json | required with empty array | 1 | ✅ | 159.0M | ✅ | 59.1M | 🟢 **-63%** |
| required.json | required with escaped characters | 2 | ✅ | 54.2M | ✅ | 33.0M | 🟢 **-39%** |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 85.9M | ✅ | 22.5M | 🟢 **-74%** |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 43.5M | 🟢 **-37%** |
| type.json | string type matches strings | 9 | ✅ | 69.1M | ✅ | 26.7M | 🟢 **-61%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 38.4M | 🟢 **-35%** |
| type.json | array type matches arrays | 7 | ✅ | 64.5M | ✅ | 22.3M | 🟢 **-65%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.4M | ✅ | 40.4M | 🟢 **-39%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.1M | ✅ | 21.8M | 🟢 **-67%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.7M | ✅ | 44.2M | 🟢 **-33%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 30.0M | 🟢 **-61%** |
| type.json | type: array or object | 5 | ✅ | 71.0M | ✅ | 27.9M | 🟢 **-61%** |
| type.json | type: array, object or null | 5 | ✅ | 76.3M | ✅ | 53.7M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.3M | ✅ | 10.2M | 🟢 **-69%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ✅ | 12.1M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ✅ | 72.7M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.3M | ✅ | 46.3M | 🟢 **-35%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.4M | ✅ | 45.7M | 🟢 **-37%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 67.4M | 🟢 **-24%** |
| optional/bignum.json | number | 2 | ✅ | 88.6M | ✅ | 69.3M | 🟢 **-22%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 37.2M | 🟢 **-41%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 64.6M | -18% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 64.7M | -18% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 346K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.1M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 426K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 13.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 58.2M | ✅ | 18.6M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.3M | ✅ | 22.6M | 🟢 **-23%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.5M | ✅ | 20.7M | 🟢 **-27%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.3M | ✅ | 28.5M | -3% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.9M | ✅ | 19.1M | 🟢 **-36%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.0M | ✅ | 28.8M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.6M | ✅ | 20.7M | 🟢 **-30%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.4M | ✅ | 28.3M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 27.0M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.7M | ✅ | 26.1M | -18% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ✅ | 11.5M | 🟢 **-26%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 11.4M | 🟢 **-26%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.4M | ✅ | 18.9M | 🟢 **-36%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ✅ | 9.9M | 🟢 **-49%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 13.3M | 🟢 **-33%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 6.9M | -14% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.4M | ✅ | 8.8M | 🟢 **-77%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.7M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.5M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 36.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.2M | ✅ | 71.3M | -19% |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.0M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.1M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.0M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 59.5M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 59.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.8M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.4M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 6.2M | -16% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 17.6M | 🟢 **-52%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.6M | ✅ | 90.5M | 🟢 **-43%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 65.1M | ✅ | 30.2M | 🟢 **-54%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.4M | ✅ | 121.3M | 🟢 **-29%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 53.2M | 🟢 **-28%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 29.5M | ✅ | 19.1M | 🟢 **-35%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 34.7M | ✅ | 20.8M | 🟢 **-40%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 45.0M | 🟢 **-58%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.4M | ✅ | 76.5M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 32.7M | ✅ | 15.3M | 🟢 **-53%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 30.8M | ✅ | 10.8M | 🟢 **-65%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 40.6M | ✅ | 27.3M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.7M | ✅ | 19.9M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ✅ | 110.2M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.0M | ✅ | 9.1M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 50.8M | 🟢 **-27%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 28.2M | ✅ | 12.3M | 🟢 **-56%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.1M | ✅ | 24.6M | -18% |
| allOf.json | allOf | 4 | ✅ | 37.2M | ✅ | 19.6M | 🟢 **-47%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 20.1M | 🟢 **-35%** |
| allOf.json | allOf simple types | 2 | ✅ | 66.6M | ✅ | 29.8M | 🟢 **-55%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.7M | ✅ | 115.1M | 🟢 **-27%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 59.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.3M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.7M | ✅ | 76.6M | -6% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 114.6M | 🟢 **-28%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.7M | ✅ | 31.1M | 🟢 **-55%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.7M | ✅ | 57.5M | 🟢 **-51%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.6M | ✅ | 30.9M | 🟢 **-56%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.7M | ✅ | 31.3M | 🟢 **-63%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 56.5M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 65.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 42.6M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 81.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 69.8M | ✅ | 40.0M | 🟢 **-43%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 36.4M | ✅ | 45.3M | 🔴 **+24%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 146.1M | ✅ | 76.5M | 🟢 **-48%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.1M | ✅ | 116.2M | 🟢 **-27%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.7M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 46.0M | ✅ | 31.5M | 🟢 **-31%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 87.8M | ✅ | 116.3M | 🔴 **+32%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 70.9M | ✅ | 33.1M | 🟢 **-53%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 178.7M | ✅ | 124.0M | 🟢 **-31%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 57.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 58.6M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 33.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 50.2M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 66.1M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 66.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 67.4M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 59.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 59.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 58.0M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 56.8M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 57.2M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 64.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 66.4M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 59.7M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.9M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.4M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 65.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 65.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 38.9M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 63.4M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 74.3M | +5% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.3M | ✅ | 123.1M | 🟢 **-30%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ✅ | 60.6M | 🟢 **-66%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.8M | ✅ | 74.4M | 🟢 **-59%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 182.2M | ✅ | 64.7M | 🟢 **-64%** |
| default.json | invalid type for default | 2 | ✅ | 65.5M | ✅ | 65.3M | 0% |
| default.json | invalid string value for default | 2 | ✅ | 51.5M | ✅ | 62.8M | 🔴 **+22%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.5M | ✅ | 54.1M | +5% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 58.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 174.6M | ✅ | 77.0M | 🟢 **-56%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 46.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 51.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.9M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.6M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 79.5M | ✅ | 29.0M | 🟢 **-64%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.9M | ✅ | 948K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.1M | ✅ | 3.7M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 37.7M | 🔴 **+161%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.5M | ✅ | 37.7M | 🟢 **-48%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 68.2M | ✅ | 26.6M | 🟢 **-61%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.0M | ✅ | 4.5M | 🟢 **-93%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 67.9M | ✅ | 26.4M | 🟢 **-61%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 59.6M | ✅ | 4.5M | 🟢 **-92%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.9M | ✅ | 37.4M | 🟢 **-44%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.2M | ✅ | 4.8M | 🟢 **-92%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.2M | ✅ | 36.3M | 🟢 **-46%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.6M | ✅ | 4.7M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 59.7M | ✅ | 28.6M | 🟢 **-52%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 62.6M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 64.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 180.4M | ✅ | 70.6M | 🟢 **-61%** |
| format.json | idn-email format | 6 | ✅ | 182.2M | ✅ | 61.2M | 🟢 **-66%** |
| format.json | regex format | 6 | ✅ | 181.1M | ✅ | 122.5M | 🟢 **-32%** |
| format.json | ipv4 format | 6 | ✅ | 181.8M | ✅ | 69.1M | 🟢 **-62%** |
| format.json | ipv6 format | 6 | ✅ | 179.1M | ✅ | 70.6M | 🟢 **-61%** |
| format.json | idn-hostname format | 6 | ✅ | 178.7M | ✅ | 108.5M | 🟢 **-39%** |
| format.json | hostname format | 6 | ✅ | 181.6M | ✅ | 70.6M | 🟢 **-61%** |
| format.json | date format | 6 | ✅ | 181.8M | ✅ | 68.1M | 🟢 **-63%** |
| format.json | date-time format | 6 | ✅ | 177.3M | ✅ | 115.4M | 🟢 **-35%** |
| format.json | time format | 6 | ✅ | 182.9M | ✅ | 70.3M | 🟢 **-62%** |
| format.json | json-pointer format | 6 | ✅ | 182.5M | ✅ | 73.4M | 🟢 **-60%** |
| format.json | relative-json-pointer format | 6 | ✅ | 178.1M | ✅ | 59.8M | 🟢 **-66%** |
| format.json | iri format | 6 | ✅ | 182.2M | ✅ | 71.5M | 🟢 **-61%** |
| format.json | iri-reference format | 6 | ✅ | 182.3M | ✅ | 68.8M | 🟢 **-62%** |
| format.json | uri format | 6 | ✅ | 181.1M | ✅ | 116.2M | 🟢 **-36%** |
| format.json | uri-reference format | 6 | ✅ | 182.4M | ✅ | 69.5M | 🟢 **-62%** |
| format.json | uri-template format | 6 | ✅ | 182.9M | ✅ | 68.9M | 🟢 **-62%** |
| format.json | uuid format | 6 | ✅ | 182.6M | ✅ | 109.2M | 🟢 **-40%** |
| format.json | duration format | 6 | ✅ | 182.1M | ✅ | 54.5M | 🟢 **-70%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.7M | ✅ | 121.6M | 🟢 **-29%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.8M | ✅ | 79.5M | 🟢 **-54%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ✅ | 76.3M | 🟢 **-55%** |
| if-then-else.json | if and then without else | 3 | ✅ | 67.5M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 69.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 65.6M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 70.0M | 🟢 **-59%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 69.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 48.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 41.5M | ✅ | 14.6M | 🟢 **-65%** |
| items.json | a schema given for items | 4 | ✅ | 50.8M | ✅ | 34.4M | 🟢 **-32%** |
| items.json | an array of schemas for items | 6 | ✅ | 62.9M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.7M | ✅ | 65.8M | 🟢 **-62%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 65.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 57.6M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.6M | ✅ | 7.9M | 🟢 **-37%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 2.4M | 🟢 **-80%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 93.4M | 🔴 **+35%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 57.7M | 🟢 **-21%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 170.9M | ✅ | 120.7M | 🟢 **-29%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 55.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 65.5M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 71.3M | ✅ | 40.6M | 🟢 **-43%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 57.0M | -14% |
| maxLength.json | maxLength validation | 5 | ✅ | 57.8M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 55.4M | ✅ | 30.3M | 🟢 **-45%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.5M | ✅ | 59.0M | +8% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 46.4M | ✅ | 24.3M | 🟢 **-48%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.0M | ✅ | 39.4M | -18% |
| maximum.json | maximum validation | 4 | ✅ | 69.9M | ✅ | 42.1M | 🟢 **-40%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.9M | ✅ | 72.5M | +5% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.7M | ✅ | 79.5M | 🟢 **-54%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 57.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 61.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 52.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 50.3M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.1M | ✅ | 66.7M | 🟢 **-61%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 71.2M | ✅ | 69.0M | -3% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 30.1M | 🟢 **-55%** |
| minLength.json | minLength validation | 5 | ✅ | 53.5M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.6M | ✅ | 32.5M | 🟢 **-40%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.7M | ✅ | 60.0M | +8% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.9M | ✅ | 24.4M | 🟢 **-49%** |
| minimum.json | minimum validation | 4 | ✅ | 69.9M | ✅ | 72.8M | +4% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ✅ | 41.1M | 🟢 **-38%** |
| multipleOf.json | by int | 3 | ✅ | 70.4M | ✅ | 66.6M | -5% |
| multipleOf.json | by number | 3 | ✅ | 64.2M | ✅ | 3.6M | 🟢 **-94%** |
| multipleOf.json | by small number | 2 | ✅ | 61.5M | ✅ | 2.3M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.6M | ❌ | - | - |
| not.json | not | 2 | ✅ | 69.9M | ✅ | 31.8M | 🟢 **-54%** |
| not.json | not multiple types | 3 | ✅ | 64.8M | ✅ | 44.9M | 🟢 **-31%** |
| not.json | not more complex schema | 3 | ✅ | 63.0M | ✅ | 35.5M | 🟢 **-44%** |
| not.json | forbidden property | 2 | ✅ | 50.2M | ✅ | 58.9M | +17% |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.9M | ✅ | 21.0M | 🟢 **-64%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.9M | ✅ | 35.3M | 🟢 **-39%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.4M | ✅ | 75.4M | 🟢 **-58%** |
| not.json | double negation | 1 | ✅ | 114.0M | ✅ | 63.8M | 🟢 **-44%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 61.8M | ✅ | 28.2M | 🟢 **-54%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.4M | ✅ | 45.3M | 🔴 **+28%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.3M | ✅ | 21.3M | 🟢 **-65%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.8M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.5M | ✅ | 20.5M | 🟢 **-66%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.5M | ✅ | 38.3M | 🟢 **-37%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.8M | ✅ | 23.6M | 🟢 **-45%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.1M | ✅ | 52.6M | 🟢 **-24%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.4M | ✅ | 24.7M | 🟢 **-46%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.3M | ✅ | 38.1M | -18% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.1M | ✅ | 32.7M | 🟢 **-53%** |
| pattern.json | pattern validation | 8 | ✅ | 52.2M | ✅ | 57.8M | +11% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.6M | ✅ | 24.2M | -1% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.2M | ✅ | 12.2M | 🟢 **-53%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ✅ | 5.8M | 🟢 **-61%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.1M | ✅ | 12.5M | 🟢 **-23%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.1M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 11.2M | ✅ | 19.0M | 🔴 **+69%** |
| properties.json | object properties validation | 6 | ✅ | 52.6M | ✅ | 45.9M | -13% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.9M | ✅ | 5.3M | 🟢 **-72%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 48.4M | ✅ | 13.7M | 🟢 **-72%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.5M | ✅ | 61.1M | -5% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.1M | ✅ | 76.2M | 🟢 **-55%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 47.8M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 38.2M | 🔴 **+1151%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.7M | ✅ | 17.3M | 🟢 **-30%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.9M | ✅ | 29.4M | 🟢 **-40%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.7M | ✅ | 21.3M | 🟢 **-59%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.3M | ✅ | 26.0M | 🟢 **-41%** |
| ref.json | nested refs | 2 | ✅ | 37.1M | ✅ | 21.5M | 🟢 **-42%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 41.8M | ✅ | 24.8M | 🟢 **-41%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.3M | ✅ | 31.9M | 🟢 **-34%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 49.6M | ✅ | 32.1M | 🟢 **-35%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.1M | ✅ | 56.4M | 🟢 **-65%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.7M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 48.5M | ✅ | 25.6M | 🟢 **-47%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.2M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.8M | ✅ | 3.1M | 🟢 **-94%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 67.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 36.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 39.3M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ✅ | 26.8M | 🟢 **-43%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 47.2M | ✅ | 30.0M | 🟢 **-37%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.3M | ✅ | 26.6M | 🟢 **-45%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.1M | ✅ | 16.6M | 🟢 **-67%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 43.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.8M | ✅ | 26.8M | 🟢 **-62%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.7M | ✅ | 30.3M | 🟢 **-57%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 69.8M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.2M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 47.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.6M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 37.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.9M | ✅ | 33.8M | 🟢 **-44%** |
| required.json | required default validation | 1 | ✅ | 158.9M | ✅ | 110.4M | 🟢 **-31%** |
| required.json | required with empty array | 1 | ✅ | 158.3M | ✅ | 60.4M | 🟢 **-62%** |
| required.json | required with escaped characters | 2 | ✅ | 47.7M | ✅ | 33.5M | 🟢 **-30%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 60.2M | ✅ | 24.3M | 🟢 **-60%** |
| type.json | number type matches numbers | 9 | ✅ | 62.2M | ✅ | 48.2M | 🟢 **-22%** |
| type.json | string type matches strings | 9 | ✅ | 62.0M | ✅ | 27.1M | 🟢 **-56%** |
| type.json | object type matches objects | 7 | ✅ | 54.5M | ✅ | 22.8M | 🟢 **-58%** |
| type.json | array type matches arrays | 7 | ✅ | 58.3M | ✅ | 40.1M | 🟢 **-31%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.6M | ✅ | 23.8M | 🟢 **-60%** |
| type.json | null type matches only the null object | 10 | ✅ | 59.4M | ✅ | 37.1M | 🟢 **-38%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.1M | ✅ | 25.2M | 🟢 **-58%** |
| type.json | type as array with one item | 2 | ✅ | 69.0M | ✅ | 60.4M | -12% |
| type.json | type: array or object | 5 | ✅ | 60.6M | ✅ | 28.2M | 🟢 **-54%** |
| type.json | type: array, object or null | 5 | ✅ | 70.0M | ✅ | 56.7M | -19% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 74.1M | ✅ | 79.7M | +8% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 55.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 48.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 64.6M | ✅ | 52.1M | -19% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 50.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 71.5M | ✅ | 56.9M | 🟢 **-20%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 41.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 41.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 74.1M | ✅ | 58.4M | 🟢 **-21%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.5M | ✅ | 74.7M | 🔴 **+265%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 39.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 52.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 45.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 43.2M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 80.7M | ✅ | 72.3M | -10% |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 68.7M | ✅ | 63.9M | -7% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.1M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 40.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.0M | ✅ | 63.7M | +18% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 13.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 63.9M | ✅ | 38.1M | 🟢 **-40%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.7M | ✅ | 27.7M | 🟢 **-57%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.5M | ✅ | 86.0M | 🔴 **+182%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 16.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 27.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.2M | ✅ | 55.3M | 🔴 **+72%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.1M | ✅ | 56.1M | 🔴 **+81%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 44.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.4M | ✅ | 15.2M | 🟢 **-22%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 69.7M | ✅ | 73.3M | +5% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.4M | ✅ | 63.8M | 🔴 **+29%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 16.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.5M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.8M | ✅ | 10.9M | 🟢 **-64%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.5M | ✅ | 12.2M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.6M | ✅ | 72.6M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.2M | ✅ | 46.4M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ✅ | 46.6M | 🟢 **-24%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 49.1M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 69.9M | ✅ | 29.5M | 🟢 **-58%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.3M | ✅ | 67.5M | -15% |
| optional/bignum.json | number | 2 | ✅ | 79.6M | ✅ | 107.7M | 🔴 **+35%** |
| optional/bignum.json | string | 1 | ✅ | 58.6M | ✅ | 20.8M | 🟢 **-64%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.5M | ✅ | 95.2M | 🔴 **+33%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 64.6M | -10% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 66.9M | ✅ | 60.6M | -9% |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 60.2M | ✅ | 68.7M | +14% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 170.7M | ✅ | 62.9M | 🟢 **-63%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.9M | ✅ | 20.9M | 🟢 **-36%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.7M | ✅ | 40.6M | -11% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 51.7M | ✅ | 30.7M | 🟢 **-41%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 57.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.5M | ✅ | 20.7M | 🟢 **-48%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 57.3M | ✅ | 28.6M | 🟢 **-50%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.7M | ✅ | 20.5M | +4% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.7M | ✅ | 28.8M | +8% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 20.9M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.5M | ✅ | 27.7M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 23.7M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.4M | ✅ | 28.8M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ✅ | 20.8M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.3M | ✅ | 34.4M | 🔴 **+31%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.6M | ✅ | 17.3M | 🟢 **-44%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.7M | ✅ | 11.6M | 🟢 **-31%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.6M | ✅ | 14.5M | +6% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ✅ | 18.7M | 🟢 **-34%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.9M | ✅ | 10.1M | 🟢 **-49%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 13.3M | 🟢 **-34%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 6.2M | 🟢 **-23%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.6M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.7M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.9M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.8M | ✅ | 6.6M | 🟢 **-82%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.2M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.4M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.3M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 67.1M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.1M | ✅ | 71.4M | -10% |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.1M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.8M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.2M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 62.2M | ✅ | 37.6M | 🟢 **-39%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 48.3M | ✅ | 26.1M | 🟢 **-46%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 50.2M | ✅ | 29.5M | 🟢 **-41%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 48.7M | ✅ | 26.1M | 🟢 **-46%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 69.4M | ✅ | 30.7M | 🟢 **-56%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 48.4M | ✅ | 26.1M | 🟢 **-46%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.6M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 20.0M | ✅ | 16.9M | -15% |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.2M | ✅ | 11.7M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 27.7M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 17.9M | ✅ | 19.9M | +11% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.9M | ✅ | 110.2M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.9M | ✅ | 9.6M | 🟢 **-68%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 50.5M | 🟢 **-27%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 29.7M | ✅ | 12.0M | 🟢 **-60%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.2M | ✅ | 24.0M | 🟢 **-23%** |
| allOf.json | allOf | 4 | ✅ | 40.8M | ✅ | 19.5M | 🟢 **-52%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.9M | ✅ | 20.3M | 🟢 **-34%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 19.1M | 🟢 **-74%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.8M | ✅ | 112.5M | 🟢 **-29%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.0M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 76.3M | 🟢 **-52%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 112.9M | 🟢 **-29%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 38.8M | ✅ | 30.0M | 🟢 **-23%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 57.9M | 🟢 **-51%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.6M | ✅ | 30.4M | 🟢 **-61%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 30.4M | 🟢 **-64%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 72.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 45.5M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 70.1M | ✅ | 35.0M | 🟢 **-50%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.9M | ✅ | 45.2M | +16% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 76.4M | 🟢 **-52%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.4M | ✅ | 113.2M | 🟢 **-29%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.8M | ✅ | 29.7M | 🟢 **-42%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 108.6M | 🟢 **-37%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.5M | ✅ | 30.7M | 🟢 **-61%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 153.5M | ✅ | 115.9M | 🟢 **-24%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 59.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 82.0M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 40.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 55.8M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 78.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 75.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 63.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 59.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 66.9M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 70.9M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.7M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.7M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.6M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 68.4M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 70.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.9M | ✅ | 74.3M | +5% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 175.9M | ✅ | 120.6M | 🟢 **-31%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 165.2M | ✅ | 58.7M | 🟢 **-64%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 176.8M | ✅ | 78.5M | 🟢 **-56%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 176.6M | ✅ | 63.4M | 🟢 **-64%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 53.7M | 🟢 **-25%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 63.1M | +14% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.7M | ✅ | 50.4M | -4% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 64.7M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 174.8M | ✅ | 62.8M | 🟢 **-64%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.8M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 59.2M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 41.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 39.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.2M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.9M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.2M | ✅ | 66.6M | 🔴 **+710%** |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.9M | ✅ | 43.9M | 🔴 **+145%** |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.8M | ✅ | 114.3M | 🔴 **+793%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.4M | ✅ | 60.7M | 🔴 **+293%** |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.4M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.8M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.4M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 30.5M | 🟢 **-59%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.7M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.4M | ✅ | 3.8M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 36.5M | 🔴 **+148%** |
| enum.json | enum with escaped characters | 3 | ✅ | 79.5M | ✅ | 37.4M | 🟢 **-53%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.0M | ✅ | 26.3M | 🟢 **-65%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.3M | ✅ | 4.4M | 🟢 **-93%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.8M | ✅ | 23.8M | 🟢 **-69%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.4M | ✅ | 4.1M | 🟢 **-94%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 68.1M | ✅ | 37.3M | 🟢 **-45%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.3M | ✅ | 4.9M | 🟢 **-93%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.7M | ✅ | 36.8M | 🟢 **-50%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 4.9M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 28.9M | 🟢 **-55%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 181.2M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 181.1M | ✅ | 63.2M | 🟢 **-65%** |
| format.json | regex format | 7 | ✅ | 181.8M | ✅ | 62.8M | 🟢 **-65%** |
| format.json | ipv4 format | 7 | ✅ | 182.0M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 182.1M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 182.0M | ✅ | 74.4M | 🟢 **-59%** |
| format.json | hostname format | 7 | ✅ | 182.1M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 181.6M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 181.8M | ✅ | 39.5M | 🟢 **-78%** |
| format.json | time format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 181.8M | ✅ | 73.0M | 🟢 **-60%** |
| format.json | relative-json-pointer format | 7 | ✅ | 181.9M | ✅ | 120.5M | 🟢 **-34%** |
| format.json | iri format | 7 | ✅ | 181.9M | ✅ | 62.8M | 🟢 **-65%** |
| format.json | iri-reference format | 7 | ✅ | 176.8M | ✅ | 74.3M | 🟢 **-58%** |
| format.json | uri format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 180.5M | ✅ | 70.2M | 🟢 **-61%** |
| format.json | uri-template format | 7 | ✅ | 175.2M | ✅ | 74.3M | 🟢 **-58%** |
| format.json | uuid format | 7 | ✅ | 181.3M | ✅ | 61.5M | 🟢 **-66%** |
| format.json | duration format | 7 | ✅ | 182.0M | ✅ | 73.6M | 🟢 **-60%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ✅ | 118.3M | 🟢 **-31%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 168.8M | ✅ | 59.1M | 🟢 **-65%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 126.8M | ✅ | 79.1M | 🟢 **-38%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.9M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.2M | ✅ | 63.3M | 🟢 **-63%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.2M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.7M | ✅ | 13.0M | 🟢 **-71%** |
| items.json | a schema given for items | 4 | ✅ | 54.6M | ✅ | 48.7M | -11% |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.2M | ✅ | 65.3M | 🟢 **-62%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.9M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.4M | ✅ | 3.8M | 🟢 **-69%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.7M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.7M | ✅ | 25.5M | 🟢 **-45%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 40.3M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.4M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 63.4M | -16% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.0M | ✅ | 118.0M | 🟢 **-31%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 75.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 78.5M | ✅ | 42.7M | 🟢 **-46%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 56.6M | 🟢 **-22%** |
| maxLength.json | maxLength validation | 5 | ✅ | 61.0M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.3M | ✅ | 32.3M | 🟢 **-46%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 59.2M | +1% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.3M | ✅ | 23.4M | 🟢 **-54%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.0M | ✅ | 37.0M | 🟢 **-27%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 42.1M | 🟢 **-45%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ✅ | 71.9M | -5% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.2M | ✅ | 79.2M | 🟢 **-54%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 71.9M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.6M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.9M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 58.9M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 171.6M | ✅ | 118.9M | 🟢 **-31%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.2M | ✅ | 41.7M | 🟢 **-49%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 56.3M | 🟢 **-22%** |
| minLength.json | minLength validation | 5 | ✅ | 57.8M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ✅ | 30.2M | 🟢 **-49%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ✅ | 59.0M | -1% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.3M | ✅ | 24.0M | 🟢 **-52%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 73.4M | -4% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 41.1M | 🟢 **-43%** |
| multipleOf.json | by int | 3 | ✅ | 77.4M | ✅ | 66.4M | -14% |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ✅ | 4.0M | 🟢 **-95%** |
| multipleOf.json | by small number | 2 | ✅ | 66.7M | ✅ | 2.3M | 🟢 **-97%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.3M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 29.9M | 🟢 **-61%** |
| not.json | not multiple types | 3 | ✅ | 71.0M | ✅ | 44.9M | 🟢 **-37%** |
| not.json | not more complex schema | 3 | ✅ | 68.8M | ✅ | 35.4M | 🟢 **-49%** |
| not.json | forbidden property | 2 | ✅ | 51.8M | ✅ | 57.4M | +11% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.2M | ✅ | 20.1M | 🟢 **-67%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 65.0M | ✅ | 33.0M | 🟢 **-49%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.1M | ✅ | 75.3M | 🟢 **-58%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 63.6M | 🟢 **-60%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.2M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ✅ | 28.8M | 🟢 **-57%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.0M | ✅ | 47.0M | 🔴 **+27%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 20.3M | 🟢 **-69%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 20.4M | 🟢 **-69%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 36.7M | 🟢 **-44%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.5M | ✅ | 23.9M | 🟢 **-46%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 57.7M | 🟢 **-24%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.2M | ✅ | 24.5M | 🟢 **-49%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.4M | ✅ | 38.0M | 🟢 **-23%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 29.0M | 🟢 **-62%** |
| pattern.json | pattern validation | 8 | ✅ | 53.5M | ✅ | 57.1M | +7% |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 23.2M | -8% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.1M | ✅ | 11.9M | 🟢 **-56%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.5M | ✅ | 5.2M | 🟢 **-61%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.3M | ✅ | 13.0M | 🟢 **-25%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.1M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ✅ | 19.2M | +7% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 67.6M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.4M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 66.8M | -17% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 54.3M | 🟢 **-33%** |
| properties.json | object properties validation | 6 | ✅ | 56.0M | ✅ | 48.9M | -13% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 16.6M | ✅ | 4.9M | 🟢 **-70%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.5M | ✅ | 13.5M | 🟢 **-74%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 56.8M | -19% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 45.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.8M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.2M | ✅ | 75.4M | 🟢 **-56%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.3M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.8M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ✅ | 19.2M | 🟢 **-23%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.5M | ✅ | 26.0M | 🟢 **-52%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.3M | ✅ | 24.7M | 🟢 **-47%** |
| ref.json | nested refs | 2 | ✅ | 38.7M | ✅ | 23.4M | 🟢 **-39%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.5M | ✅ | 22.5M | 🟢 **-49%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.4M | ✅ | 30.2M | 🟢 **-43%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.9M | ✅ | 31.7M | 🟢 **-42%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.1M | ✅ | 56.4M | 🟢 **-65%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.5M | ✅ | 26.2M | 🟢 **-52%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 3.1M | 🟢 **-95%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 51.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 44.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 86.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 39.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 53.9M | ✅ | 26.7M | 🟢 **-50%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.6M | ✅ | 31.8M | 🟢 **-42%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 55.1M | ✅ | 26.7M | 🟢 **-52%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 53.9M | ✅ | 29.9M | 🟢 **-45%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.0M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 55.3M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 51.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.3M | ✅ | 26.8M | 🟢 **-65%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 29.8M | 🟢 **-61%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.4M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 51.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 45.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 51.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 41.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 51.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.1M | ✅ | 33.7M | 🟢 **-48%** |
| required.json | required default validation | 1 | ✅ | 154.4M | ✅ | 99.2M | 🟢 **-36%** |
| required.json | required with empty array | 1 | ✅ | 158.3M | ✅ | 60.3M | 🟢 **-62%** |
| required.json | required with escaped characters | 2 | ✅ | 53.7M | ✅ | 33.0M | 🟢 **-39%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 58.3M | ✅ | 24.4M | 🟢 **-58%** |
| type.json | number type matches numbers | 9 | ✅ | 68.7M | ✅ | 47.9M | 🟢 **-30%** |
| type.json | string type matches strings | 9 | ✅ | 85.8M | ✅ | 27.1M | 🟢 **-68%** |
| type.json | object type matches objects | 7 | ✅ | 58.7M | ✅ | 21.8M | 🟢 **-63%** |
| type.json | array type matches arrays | 7 | ✅ | 63.5M | ✅ | 40.4M | 🟢 **-36%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 23.8M | 🟢 **-64%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 37.3M | 🟢 **-43%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.8M | ✅ | 25.0M | 🟢 **-62%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 59.3M | 🟢 **-23%** |
| type.json | type: array or object | 5 | ✅ | 72.2M | ✅ | 28.1M | 🟢 **-61%** |
| type.json | type: array, object or null | 5 | ✅ | 77.3M | ✅ | 56.5M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 82.9M | ✅ | 78.2M | -6% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 60.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 58.3M | -17% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 57.8M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 42.0M | ✅ | 22.9M | 🟢 **-45%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 52.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.8M | ✅ | 67.2M | -18% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.2M | ✅ | 70.4M | 🔴 **+248%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 49.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 49.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.1M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.7M | ✅ | 73.8M | -19% |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 60.0M | 🟢 **-20%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.3M | ✅ | 68.6M | +18% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 35.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.5M | ✅ | 27.0M | 🟢 **-84%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 33.3M | ✅ | 15.9M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 26.4M | 🟢 **-62%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 104.6M | 🔴 **+267%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 33.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.6M | ✅ | 64.7M | 🔴 **+127%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.9M | ✅ | 65.1M | 🔴 **+118%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.6M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.4M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 48.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ✅ | 15.5M | -20% |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.4M | ✅ | 80.1M | -3% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 58.7M | +12% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.6M | ✅ | 12.0M | 🟢 **-61%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 160.7M | ✅ | 71.9M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 70.3M | -2% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.1M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 54.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 30.6M | 🟢 **-60%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 66.2M | 🟢 **-25%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 69.1M | 🟢 **-22%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 35.0M | 🟢 **-45%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 64.3M | -19% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 64.7M | -18% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ✅ | 72.7M | -15% |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ✅ | 68.9M | +6% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.4M | ✅ | 64.4M | 🟢 **-63%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.1M | ✅ | 19.7M | 🟢 **-42%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.6M | ✅ | 40.9M | -14% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.7M | ✅ | 30.9M | 🟢 **-44%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.7M | ✅ | 20.9M | 🟢 **-50%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.7M | ✅ | 20.7M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ✅ | 30.4M | 🔴 **+53%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 20.9M | 🟢 **-24%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 28.8M | -2% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.1M | ✅ | 19.1M | 🟢 **-34%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.0M | ✅ | 30.9M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.5M | ✅ | 20.9M | 🟢 **-29%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.3M | ✅ | 29.2M | 0% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.4M | ✅ | 27.0M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.1M | ✅ | 25.4M | -18% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ✅ | 9.4M | 🟢 **-37%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ✅ | 14.0M | -11% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.5M | ✅ | 19.0M | 🟢 **-36%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 10.2M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.8M | ✅ | 13.3M | 🟢 **-36%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 6.4M | -18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.3M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.7M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 42.1M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.3M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.9M | ✅ | 9.1M | 🟢 **-79%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.4M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.2M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.3M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.3M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.2M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.2M | ✅ | 69.7M | 🟢 **-27%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.8M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 24.0M | ✅ | 10.8M | 🟢 **-55%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.2M | ✅ | 13.1M | 🟢 **-28%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 67.9M | ✅ | 37.2M | 🟢 **-45%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 53.0M | ✅ | 26.0M | 🟢 **-51%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 55.3M | ✅ | 31.0M | 🟢 **-44%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.5M | ✅ | 25.9M | 🟢 **-51%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 32.8M | 🟢 **-57%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 26.2M | 🟢 **-52%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.8M | ❌ | - | - |
