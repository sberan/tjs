# tjs vs jsen Benchmarks

Performance comparison of **tjs** vs **[jsen](https://github.com/bugventure/jsen)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | jsen pass | jsen ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 29.3M | 170/199 | 14.8M | 170 | 🟢 **-49%** |
| draft6 | 276 | ✅ 276 | 33.2M | 182/276 | 15.7M | 182 | 🟢 **-53%** |
| draft7 | 313 | ✅ 313 | 16.5M | 193/313 | 17.0M | 193 | +3% |
| draft2019-09 | 435 | ✅ 435 | 20.7M | 227/435 | 18.2M | 227 | -12% |
| draft2020-12 | 448 | ✅ 448 | 20.9M | 213/448 | 18.0M | 213 | -14% |
| **Total** | 1671 | 1670/1671 | 21.6M | 985/1671 | 16.8M | 985 | 🟢 **-23%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.71x faster** (22 ns vs 60 ns per test, 3744 tests in 985 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.9M | ✅ | 6.4M | 🟢 **-90%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 146.8M | ✅ | 61.5M | 🟢 **-58%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 123.0M | ✅ | 54.0M | 🟢 **-56%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.4M | ✅ | 71.4M | 🟢 **-58%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.5M | ✅ | 64.4M | 🟢 **-48%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.3M | ✅ | 35.7M | 🟢 **-23%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 54.3M | ✅ | 41.9M | 🟢 **-23%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 46.5M | 🟢 **-36%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.3M | ✅ | 67.9M | 🟢 **-57%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.0M | ✅ | 13.8M | 🟢 **-74%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 50.0M | ✅ | 18.4M | 🟢 **-63%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 38.2M | ✅ | 16.8M | 🟢 **-56%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 51.5M | ✅ | 30.8M | 🟢 **-40%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.7M | ✅ | 63.2M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.8M | ✅ | 27.3M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 51.7M | ✅ | 42.9M | -17% |
| allOf.json | allOf | 4 | ✅ | 49.3M | ✅ | 36.2M | 🟢 **-27%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.3M | ✅ | 27.2M | 0% |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 49.2M | 🟢 **-55%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.2M | ✅ | 74.5M | 🟢 **-53%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 74.4M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 49.8M | 🟢 **-35%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 51.8M | 🟢 **-56%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.6M | ✅ | 53.0M | 🟢 **-33%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.1M | ✅ | 23.6M | 🟢 **-72%** |
| anyOf.json | anyOf | 4 | ✅ | 81.9M | ✅ | 15.1M | 🟢 **-82%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.9M | ✅ | 18.1M | 🟢 **-64%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.4M | ✅ | 16.9M | 🟢 **-67%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 15.6M | 🟢 **-91%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 14.5M | 🟢 **-82%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 60.9M | 🟢 **-43%** |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ✅ | 48.6M | -12% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.9M | ✅ | 44.7M | 🟢 **-44%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 13.1M | ✅ | 6.9M | 🟢 **-48%** |
| dependencies.json | dependencies | 7 | ✅ | 100.1M | ✅ | 55.5M | 🟢 **-45%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.1M | ✅ | 37.7M | +10% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 59.8M | ✅ | 40.7M | 🟢 **-32%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 19.6M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 54.0M | ✅ | 30.7M | 🟢 **-43%** |
| enum.json | simple enum validation | 2 | ✅ | 88.8M | ✅ | 33.6M | 🟢 **-62%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 2.9M | 🟢 **-95%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.7M | ✅ | 17.9M | 🟢 **-76%** |
| enum.json | enums in properties | 6 | ✅ | 48.5M | ✅ | 20.9M | 🟢 **-57%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.9M | ✅ | 21.2M | 🟢 **-65%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.1M | ✅ | 32.9M | 🟢 **-71%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 10.1M | 🟢 **-85%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.0M | ✅ | 33.2M | 🟢 **-70%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 65.5M | ✅ | 10.1M | 🟢 **-85%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 35.4M | 🟢 **-69%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 10.8M | 🟢 **-84%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 36.4M | 🟢 **-67%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 11.0M | 🟢 **-84%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 27.3M | 🟢 **-70%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 26.1M | 🟢 **-55%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 94.0M | ✅ | 27.6M | 🟢 **-71%** |
| format.json | email format | 6 | ✅ | 91.8M | ✅ | 68.7M | 🟢 **-25%** |
| format.json | ipv4 format | 6 | ✅ | 163.1M | ✅ | 68.5M | 🟢 **-58%** |
| format.json | ipv6 format | 6 | ✅ | 92.5M | ✅ | 68.0M | 🟢 **-26%** |
| format.json | hostname format | 6 | ✅ | 134.0M | ✅ | 65.6M | 🟢 **-51%** |
| format.json | date-time format | 6 | ✅ | 92.9M | ✅ | 67.2M | 🟢 **-28%** |
| format.json | uri format | 6 | ✅ | 162.7M | ✅ | 67.9M | 🟢 **-58%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 46.6M | ✅ | 32.0M | 🟢 **-31%** |
| items.json | a schema given for items | 4 | ✅ | 94.2M | ✅ | 46.2M | 🟢 **-51%** |
| items.json | an array of schemas for items | 6 | ✅ | 66.8M | ✅ | 54.0M | -19% |
| items.json | items and subitems | 6 | ✅ | 35.4M | ✅ | 25.3M | 🟢 **-28%** |
| items.json | nested items | 3 | ✅ | 13.9M | ✅ | 9.0M | 🟢 **-35%** |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 61.9M | -18% |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.0M | ✅ | 65.0M | -18% |
| maxItems.json | maxItems validation | 4 | ✅ | 81.0M | ✅ | 53.3M | 🟢 **-34%** |
| maxLength.json | maxLength validation | 5 | ✅ | 66.9M | ✅ | 41.8M | 🟢 **-37%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.1M | ✅ | 39.8M | 🟢 **-31%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.4M | ✅ | 33.7M | 🟢 **-35%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 54.2M | 🟢 **-29%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ✅ | 54.0M | 🟢 **-29%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 53.6M | 🟢 **-30%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ✅ | 44.2M | 🟢 **-37%** |
| minItems.json | minItems validation | 4 | ✅ | 81.2M | ✅ | 42.4M | 🟢 **-48%** |
| minLength.json | minLength validation | 5 | ✅ | 57.9M | ✅ | 43.1M | 🟢 **-26%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.7M | ✅ | 46.1M | 🟢 **-23%** |
| minimum.json | minimum validation | 4 | ✅ | 78.7M | ✅ | 54.1M | 🟢 **-31%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 51.6M | 🟢 **-33%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 61.3M | ✅ | 47.2M | 🟢 **-23%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.8M | ✅ | 54.4M | 🟢 **-24%** |
| multipleOf.json | by int | 3 | ✅ | 77.4M | ✅ | 52.6M | 🟢 **-32%** |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ✅ | 6.3M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 3.9M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 4.4M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 91.3M | ✅ | 16.9M | 🟢 **-82%** |
| not.json | not multiple types | 3 | ✅ | 69.6M | ✅ | 22.6M | 🟢 **-68%** |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 17.3M | 🟢 **-75%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 41.5M | 🟢 **-24%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.3M | ✅ | 36.5M | 🟢 **-39%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 13.6M | 🟢 **-91%** |
| oneOf.json | oneOf | 4 | ✅ | 77.1M | ✅ | 16.7M | 🟢 **-78%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.2M | ✅ | 17.8M | 🟢 **-52%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.9M | ✅ | 17.8M | 🟢 **-60%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 20.0M | 🟢 **-74%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.6M | ✅ | 17.1M | 🟢 **-65%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.6M | ✅ | 17.5M | 🟢 **-65%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 14.5M | 🟢 **-81%** |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ✅ | 46.8M | -17% |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 28.9M | +15% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ✅ | 19.2M | 🟢 **-27%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ✅ | 9.3M | 🟢 **-37%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.7M | ✅ | 13.6M | 🟢 **-27%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 18.4M | +2% |
| properties.json | object properties validation | 6 | ✅ | 56.1M | ✅ | 37.3M | 🟢 **-33%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.5M | ✅ | 13.6M | 🟢 **-37%** |
| properties.json | properties with escaped characters | 2 | ✅ | 52.1M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 62.0M | -12% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 28.1M | ✅ | 16.5M | 🟢 **-41%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.6M | ✅ | 45.0M | -18% |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ✅ | 44.4M | 🟢 **-25%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ✅ | 33.9M | 🟢 **-28%** |
| ref.json | nested refs | 2 | ✅ | 57.0M | ✅ | 47.4M | -17% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 55.1M | ✅ | 48.2M | -12% |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 27.9M | ✅ | 28.9M | +4% |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.7M | ✅ | 37.6M | 🟢 **-31%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 45.3M | -17% |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.9M | ✅ | 5.5M | 🟢 **-54%** |
| ref.json | refs with quote | 2 | ✅ | 54.4M | ✅ | 44.8M | -18% |
| ref.json | Location-independent identifier | 2 | ✅ | 77.1M | ✅ | 51.1M | 🟢 **-34%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 72.0M | ✅ | 51.2M | 🟢 **-29%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.9M | ✅ | 6.6M | 🟢 **-88%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 71.8M | ✅ | 52.3M | 🟢 **-27%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 40.9M | 🟢 **-47%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 53.0M | 🟢 **-31%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 42.3M | 🟢 **-45%** |
| refRemote.json | remote ref | 2 | ✅ | 71.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 72.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 70.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 44.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 42.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 72.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 54.3M | -16% |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 63.4M | 🟢 **-60%** |
| required.json | required with escaped characters | 2 | ✅ | 54.4M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 64.6M | ✅ | 27.9M | 🟢 **-57%** |
| type.json | number type matches numbers | 9 | ✅ | 69.5M | ✅ | 46.9M | 🟢 **-33%** |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 47.3M | 🟢 **-32%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 39.6M | 🟢 **-33%** |
| type.json | array type matches arrays | 7 | ✅ | 64.6M | ✅ | 40.3M | 🟢 **-38%** |
| type.json | boolean type matches booleans | 10 | ✅ | 67.0M | ✅ | 42.0M | 🟢 **-37%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.9M | ✅ | 38.0M | 🟢 **-42%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ✅ | 41.2M | 🟢 **-38%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 51.1M | 🟢 **-33%** |
| type.json | type: array or object | 5 | ✅ | 66.6M | ✅ | 43.2M | 🟢 **-35%** |
| type.json | type: array, object or null | 5 | ✅ | 74.3M | ✅ | 48.2M | 🟢 **-35%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ✅ | 2.0M | 🟢 **-89%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.8M | ✅ | 6.1M | 🟢 **-82%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.0M | ✅ | 5.9M | 🟢 **-69%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.2M | ✅ | 84.8M | 🟢 **-47%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.2M | ✅ | 60.0M | -18% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.3M | ✅ | 39.2M | 🟢 **-46%** |
| optional/bignum.json | integer | 2 | ✅ | 88.2M | ✅ | 13.1M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 73.3M | -17% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 41.5M | 🟢 **-35%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.8M | ✅ | 68.3M | -13% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 40.1M | 🟢 **-33%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 68.3M | -13% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 40.1M | 🟢 **-33%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.6M | ✅ | 23.3M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 25.2M | -14% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 24.7M | -16% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 21.0M | 🟢 **-24%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.9M | ✅ | 24.7M | -17% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.1M | ✅ | 26.2M | -3% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.6M | ✅ | 24.7M | -16% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.6M | ✅ | 25.2M | -12% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.9M | ✅ | 29.7M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.3M | ✅ | 10.1M | 🟢 **-68%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 12.6M | -17% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.2M | ✅ | 12.8M | -16% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.5M | ✅ | 24.2M | -18% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.5M | ✅ | 14.0M | 🟢 **-38%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 22.7M | ✅ | 17.8M | 🟢 **-22%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ✅ | 10.8M | 🔴 **+28%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ✅ | 6.8M | 🟢 **-36%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.0M | ✅ | 45.8M | 🟢 **-52%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 43.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.1M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 62.7M | ✅ | 11.2M | 🟢 **-82%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 45.5M | ✅ | 36.7M | -19% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 174.7M | ✅ | 61.6M | 🟢 **-65%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 32.5M | ✅ | 54.7M | 🔴 **+68%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 187.2M | ✅ | 45.5M | 🟢 **-76%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 68.7M | ✅ | 64.3M | -6% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 59.8M | ✅ | 20.2M | 🟢 **-66%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.0M | ✅ | 38.6M | -12% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 112.6M | ✅ | 47.8M | 🟢 **-58%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 174.9M | ✅ | 68.8M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 58.4M | ✅ | 13.9M | 🟢 **-76%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 39.2M | ✅ | 18.5M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.5M | ✅ | 16.7M | 🟢 **-62%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 40.1M | ✅ | 31.1M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 174.4M | ✅ | 62.7M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 30.4M | ✅ | 27.7M | -9% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ✅ | 42.8M | 🟢 **-38%** |
| allOf.json | allOf | 4 | ✅ | 41.8M | ✅ | 35.9M | -14% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.8M | ✅ | 27.6M | -13% |
| allOf.json | allOf simple types | 2 | ✅ | 80.8M | ✅ | 51.2M | 🟢 **-37%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 174.6M | ✅ | 74.2M | 🟢 **-57%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 74.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 101.2M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 174.8M | ✅ | 39.4M | 🟢 **-77%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 174.3M | ✅ | 50.8M | 🟢 **-71%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 84.4M | ✅ | 52.4M | 🟢 **-38%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 126.9M | ✅ | 50.7M | 🟢 **-60%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 86.0M | ✅ | 53.7M | 🟢 **-38%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 85.5M | ✅ | 23.5M | 🟢 **-72%** |
| anyOf.json | anyOf | 4 | ✅ | 88.0M | ✅ | 15.0M | 🟢 **-83%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 54.2M | ✅ | 18.0M | 🟢 **-67%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 170.3M | ✅ | 17.8M | 🟢 **-90%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 175.5M | ✅ | 17.7M | 🟢 **-90%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 75.2M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 79.2M | ✅ | 14.8M | 🟢 **-81%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 190.4M | ✅ | 15.6M | 🟢 **-92%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 128.9M | ✅ | 14.6M | 🟢 **-89%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 196.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 86.4M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 76.7M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 64.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 130.0M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 82.4M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 120.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 71.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 97.1M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 70.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 91.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 82.7M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 128.0M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 76.1M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 114.1M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 69.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 87.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 73.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 106.1M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 67.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 112.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 80.0M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 61.3M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 88.5M | ✅ | 50.0M | 🟢 **-44%** |
| default.json | invalid type for default | 2 | ✅ | 113.3M | ✅ | 61.9M | 🟢 **-45%** |
| default.json | invalid string value for default | 2 | ✅ | 59.7M | ✅ | 48.7M | -19% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 85.3M | ✅ | 42.8M | 🟢 **-50%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 97.6M | ✅ | 55.3M | 🟢 **-43%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 197.9M | ✅ | 66.1M | 🟢 **-67%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 43.7M | ✅ | 37.5M | -14% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 50.4M | ✅ | 40.6M | -20% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 93.3M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 20.0M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 54.1M | ✅ | 25.8M | 🟢 **-52%** |
| enum.json | simple enum validation | 2 | ✅ | 82.8M | ✅ | 36.4M | 🟢 **-56%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 67.1M | ✅ | 2.9M | 🟢 **-96%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 82.4M | ✅ | 17.6M | 🟢 **-79%** |
| enum.json | enums in properties | 6 | ✅ | 59.5M | ✅ | 20.5M | 🟢 **-66%** |
| enum.json | enum with escaped characters | 3 | ✅ | 87.8M | ✅ | 24.3M | 🟢 **-72%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 118.6M | ✅ | 33.1M | 🟢 **-72%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 72.0M | ✅ | 10.2M | 🟢 **-86%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 119.9M | ✅ | 32.4M | 🟢 **-73%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 70.1M | ✅ | 10.8M | 🟢 **-85%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 127.6M | ✅ | 36.0M | 🟢 **-72%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 73.3M | ✅ | 10.5M | 🟢 **-86%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 127.2M | ✅ | 36.7M | 🟢 **-71%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 71.2M | ✅ | 10.4M | 🟢 **-85%** |
| enum.json | nul characters in strings | 2 | ✅ | 97.0M | ✅ | 27.0M | 🟢 **-72%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 79.5M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.6M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 99.7M | ✅ | 47.2M | 🟢 **-53%** |
| format.json | ipv4 format | 6 | ✅ | 158.9M | ✅ | 63.2M | 🟢 **-60%** |
| format.json | ipv6 format | 6 | ✅ | 99.7M | ✅ | 62.4M | 🟢 **-37%** |
| format.json | hostname format | 6 | ✅ | 161.0M | ✅ | 68.5M | 🟢 **-57%** |
| format.json | date-time format | 6 | ✅ | 99.7M | ✅ | 68.4M | 🟢 **-31%** |
| format.json | json-pointer format | 6 | ✅ | 159.3M | ✅ | 71.7M | 🟢 **-55%** |
| format.json | uri format | 6 | ✅ | 99.7M | ✅ | 68.5M | 🟢 **-31%** |
| format.json | uri-reference format | 6 | ✅ | 159.6M | ✅ | 61.7M | 🟢 **-61%** |
| format.json | uri-template format | 6 | ✅ | 96.9M | ✅ | 70.5M | 🟢 **-27%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 63.4M | ✅ | 35.6M | 🟢 **-44%** |
| items.json | a schema given for items | 4 | ✅ | 63.0M | ✅ | 49.1M | 🟢 **-22%** |
| items.json | an array of schemas for items | 6 | ✅ | 111.9M | ✅ | 54.2M | 🟢 **-52%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 187.4M | ✅ | 71.3M | 🟢 **-62%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 100.1M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 62.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 34.6M | ✅ | 23.3M | 🟢 **-33%** |
| items.json | nested items | 3 | ✅ | 12.7M | ✅ | 9.0M | 🟢 **-29%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 84.9M | ✅ | 61.0M | 🟢 **-28%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.9M | ✅ | 64.8M | -19% |
| maxItems.json | maxItems validation | 4 | ✅ | 84.2M | ✅ | 53.8M | 🟢 **-36%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 74.2M | ✅ | 47.3M | 🟢 **-36%** |
| maxLength.json | maxLength validation | 5 | ✅ | 70.6M | ✅ | 46.5M | 🟢 **-34%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 66.2M | ✅ | 39.7M | 🟢 **-40%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.6M | ✅ | 46.7M | 🟢 **-20%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.9M | ✅ | 32.9M | 🟢 **-33%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 53.3M | ✅ | 34.8M | 🟢 **-35%** |
| maximum.json | maximum validation | 4 | ✅ | 87.1M | ✅ | 54.9M | 🟢 **-37%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 85.6M | ✅ | 54.8M | 🟢 **-36%** |
| minItems.json | minItems validation | 4 | ✅ | 87.7M | ✅ | 53.5M | 🟢 **-39%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 82.3M | ✅ | 49.0M | 🟢 **-40%** |
| minLength.json | minLength validation | 5 | ✅ | 65.8M | ✅ | 43.9M | 🟢 **-33%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 64.9M | ✅ | 41.4M | 🟢 **-36%** |
| minProperties.json | minProperties validation | 6 | ✅ | 64.3M | ✅ | 44.8M | 🟢 **-30%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 45.4M | ✅ | 34.4M | 🟢 **-24%** |
| minimum.json | minimum validation | 4 | ✅ | 85.6M | ✅ | 54.3M | 🟢 **-37%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 81.0M | ✅ | 55.5M | 🟢 **-31%** |
| multipleOf.json | by int | 3 | ✅ | 84.0M | ✅ | 52.3M | 🟢 **-38%** |
| multipleOf.json | by number | 3 | ✅ | 80.2M | ✅ | 6.4M | 🟢 **-92%** |
| multipleOf.json | by small number | 2 | ✅ | 74.3M | ✅ | 4.1M | 🟢 **-95%** |
| multipleOf.json | float division = inf | 1 | ✅ | 62.7M | ✅ | 4.5M | 🟢 **-93%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 79.7M | ❌ | - | - |
| not.json | not | 2 | ✅ | 83.7M | ✅ | 17.2M | 🟢 **-79%** |
| not.json | not multiple types | 3 | ✅ | 78.8M | ✅ | 22.7M | 🟢 **-71%** |
| not.json | not more complex schema | 3 | ✅ | 75.9M | ✅ | 17.3M | 🟢 **-77%** |
| not.json | forbidden property | 2 | ✅ | 56.9M | ✅ | 42.1M | 🟢 **-26%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 69.2M | ✅ | 40.2M | 🟢 **-42%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 69.4M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 202.9M | ✅ | 62.7M | 🟢 **-69%** |
| not.json | double negation | 1 | ✅ | 174.5M | ✅ | 14.9M | 🟢 **-91%** |
| oneOf.json | oneOf | 4 | ✅ | 72.4M | ✅ | 16.8M | 🟢 **-77%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 38.6M | ✅ | 17.0M | 🟢 **-56%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 76.3M | ✅ | 43.0M | 🟢 **-44%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 99.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 75.6M | ✅ | 39.1M | 🟢 **-48%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 75.6M | ✅ | 43.2M | 🟢 **-43%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 46.4M | ✅ | 18.1M | 🟢 **-61%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 82.4M | ✅ | 20.2M | 🟢 **-76%** |
| oneOf.json | oneOf with required | 4 | ✅ | 53.7M | ✅ | 17.5M | 🟢 **-67%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 54.4M | ✅ | 16.6M | 🟢 **-70%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 82.1M | ✅ | 14.5M | 🟢 **-82%** |
| pattern.json | pattern validation | 8 | ✅ | 59.9M | ✅ | 45.6M | 🟢 **-24%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 16.6M | ✅ | 26.6M | 🔴 **+60%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.9M | ✅ | 19.3M | 🟢 **-31%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 16.3M | ✅ | 6.7M | 🟢 **-59%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.8M | ✅ | 13.9M | 🟢 **-26%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 23.2M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 20.2M | ✅ | 15.0M | 🟢 **-26%** |
| properties.json | object properties validation | 6 | ✅ | 58.1M | ✅ | 46.5M | 🟢 **-20%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.8M | ✅ | 8.1M | 🟢 **-63%** |
| properties.json | properties with boolean schema | 4 | ✅ | 50.9M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 57.4M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 78.4M | ✅ | 45.9M | 🟢 **-41%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 30.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 49.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.4M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 182.9M | ✅ | 49.1M | 🟢 **-73%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 53.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 46.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 28.2M | ✅ | 16.1M | 🟢 **-43%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 58.7M | ✅ | 45.0M | 🟢 **-23%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 64.1M | ✅ | 44.5M | 🟢 **-31%** |
| ref.json | escaped pointer ref | 6 | ✅ | 49.2M | ✅ | 39.7M | -19% |
| ref.json | nested refs | 2 | ✅ | 43.6M | ✅ | 53.0M | 🔴 **+22%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 60.3M | ✅ | 46.8M | 🟢 **-22%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.9M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 60.2M | ✅ | 37.2M | 🟢 **-38%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 60.2M | ✅ | 46.3M | 🟢 **-23%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 174.6M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 75.7M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 60.0M | ✅ | 44.9M | 🟢 **-25%** |
| ref.json | Location-independent identifier | 2 | ✅ | 55.1M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 54.8M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 55.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 60.4M | ✅ | 5.9M | 🟢 **-90%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 41.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 40.2M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 44.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 60.1M | ✅ | 45.6M | 🟢 **-24%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 59.4M | ✅ | 46.0M | 🟢 **-22%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 57.5M | ✅ | 43.8M | 🟢 **-24%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 60.6M | ✅ | 45.9M | 🟢 **-24%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.4M | ✅ | 51.7M | 🟢 **-40%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 84.7M | ✅ | 53.6M | 🟢 **-37%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 86.6M | ✅ | 51.5M | 🟢 **-41%** |
| refRemote.json | remote ref | 2 | ✅ | 54.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 54.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 33.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 34.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 52.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 39.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 75.0M | ✅ | 54.4M | 🟢 **-27%** |
| required.json | required default validation | 1 | ✅ | 175.4M | ✅ | 63.0M | 🟢 **-64%** |
| required.json | required with empty array | 1 | ✅ | 174.6M | ✅ | 63.0M | 🟢 **-64%** |
| required.json | required with escaped characters | 2 | ✅ | 44.1M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 70.7M | ✅ | 38.3M | 🟢 **-46%** |
| type.json | number type matches numbers | 9 | ✅ | 73.3M | ✅ | 45.9M | 🟢 **-37%** |
| type.json | string type matches strings | 9 | ✅ | 73.0M | ✅ | 47.1M | 🟢 **-35%** |
| type.json | object type matches objects | 7 | ✅ | 62.7M | ✅ | 39.8M | 🟢 **-37%** |
| type.json | array type matches arrays | 7 | ✅ | 67.5M | ✅ | 39.9M | 🟢 **-41%** |
| type.json | boolean type matches booleans | 10 | ✅ | 70.6M | ✅ | 41.5M | 🟢 **-41%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.1M | ✅ | 38.9M | 🟢 **-40%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 69.6M | ✅ | 41.7M | 🟢 **-40%** |
| type.json | type as array with one item | 2 | ✅ | 84.3M | ✅ | 53.1M | 🟢 **-37%** |
| type.json | type: array or object | 5 | ✅ | 79.3M | ✅ | 43.6M | 🟢 **-45%** |
| type.json | type: array, object or null | 5 | ✅ | 84.0M | ✅ | 48.8M | 🟢 **-42%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ✅ | 2.1M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 36.3M | ✅ | 6.5M | 🟢 **-82%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.7M | ✅ | 6.3M | 🟢 **-68%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 191.6M | ✅ | 66.3M | 🟢 **-65%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.9M | ✅ | 59.9M | -18% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 78.8M | ✅ | 52.1M | 🟢 **-34%** |
| optional/bignum.json | integer | 2 | ✅ | 94.0M | ✅ | 13.1M | 🟢 **-86%** |
| optional/bignum.json | number | 2 | ✅ | 96.2M | ✅ | 72.2M | 🟢 **-25%** |
| optional/bignum.json | string | 1 | ✅ | 71.8M | ✅ | 42.1M | 🟢 **-41%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 88.0M | ✅ | 68.3M | 🟢 **-22%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 66.5M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 87.5M | ✅ | 47.8M | 🟢 **-45%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 66.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 67.5M | ✅ | 21.6M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 21.2M | ✅ | 25.3M | +19% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 32.4M | ✅ | 25.4M | 🟢 **-22%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 32.0M | ✅ | 25.4M | 🟢 **-21%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 32.4M | ✅ | 24.6M | 🟢 **-24%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 29.5M | ✅ | 26.9M | -9% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 32.6M | ✅ | 25.4M | 🟢 **-22%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 32.6M | ✅ | 25.2M | 🟢 **-23%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 29.1M | ✅ | 29.5M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 34.8M | ✅ | 10.5M | 🟢 **-70%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 18.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.7M | ✅ | 12.8M | 🟢 **-28%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.3M | ✅ | 13.6M | -17% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.9M | ✅ | 24.0M | -20% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 23.7M | ✅ | 14.6M | 🟢 **-38%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 23.1M | ✅ | 17.8M | 🟢 **-23%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.6M | ✅ | 11.4M | 🔴 **+32%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 27.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.9M | ✅ | 7.2M | 🟢 **-34%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 45.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 33.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 101.8M | ✅ | 64.7M | 🟢 **-36%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.4M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.0M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 38.6M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 51.6M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 50.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 33.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.6M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 23.9M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.8M | ✅ | 24.9M | 🟢 **-59%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 46.7M | ✅ | 36.4M | 🟢 **-22%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.5M | ✅ | 59.4M | 🟢 **-63%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 75.6M | ✅ | 54.8M | 🟢 **-28%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 38.0M | 🟢 **-78%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 75.1M | ✅ | 61.5M | -18% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 57.9M | ✅ | 33.8M | 🟢 **-42%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.6M | ✅ | 20.7M | 🟢 **-50%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 45.2M | 🟢 **-58%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ✅ | 65.0M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 68.4M | ✅ | 17.7M | 🟢 **-74%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.5M | ✅ | 18.3M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.7M | ✅ | 16.9M | 🟢 **-66%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.0M | ✅ | 16.6M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 50.2M | 🟢 **-68%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.4M | ✅ | 25.8M | 🟢 **-23%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.7M | ✅ | 41.9M | 🟢 **-39%** |
| allOf.json | allOf | 4 | ✅ | 39.1M | ✅ | 19.5M | 🟢 **-50%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.6M | ✅ | 27.1M | -11% |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ✅ | 49.2M | 🟢 **-29%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 72.8M | 🟢 **-54%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 44.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 146.9M | ✅ | 27.7M | 🟢 **-81%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.0M | ✅ | 73.0M | 🟢 **-54%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.3M | ✅ | 49.2M | 🟢 **-33%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 45.0M | 🟢 **-62%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.6M | ✅ | 49.2M | 🟢 **-34%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.4M | ✅ | 23.5M | 🟢 **-72%** |
| anyOf.json | anyOf | 4 | ✅ | 75.8M | ✅ | 14.9M | 🟢 **-80%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.9M | ✅ | 17.7M | 🟢 **-62%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 17.5M | 🟢 **-89%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 17.6M | 🟢 **-89%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 72.9M | ✅ | 14.4M | 🟢 **-80%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 170.7M | ✅ | 15.4M | 🟢 **-91%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 14.5M | 🟢 **-88%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 178.2M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 85.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 62.3M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 54.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 72.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 93.8M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 57.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 59.8M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 63.7M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 91.8M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 62.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 52.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 95.8M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 68.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 58.8M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 62.4M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ✅ | 49.5M | 🟢 **-60%** |
| default.json | invalid type for default | 2 | ✅ | 64.2M | ✅ | 60.1M | -6% |
| default.json | invalid string value for default | 2 | ✅ | 67.9M | ✅ | 46.6M | 🟢 **-31%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 47.7M | ✅ | 43.3M | -9% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 62.6M | ✅ | 53.7M | -14% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.6M | ✅ | 62.4M | 🟢 **-65%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.0M | ✅ | 36.8M | +12% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 43.7M | ✅ | 39.2M | -10% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 53.9M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 19.5M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 23.8M | ✅ | 26.4M | +11% |
| enum.json | simple enum validation | 2 | ✅ | 52.6M | ✅ | 39.9M | 🟢 **-24%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.3M | ✅ | 2.7M | 🟢 **-94%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.1M | ✅ | 18.0M | 🟢 **-75%** |
| enum.json | enums in properties | 6 | ✅ | 43.0M | ✅ | 20.2M | 🟢 **-53%** |
| enum.json | enum with escaped characters | 3 | ✅ | 70.7M | ✅ | 24.2M | 🟢 **-66%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 71.9M | ✅ | 29.9M | 🟢 **-58%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.9M | ✅ | 11.1M | 🟢 **-83%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 71.9M | ✅ | 32.8M | 🟢 **-54%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.5M | ✅ | 11.3M | 🟢 **-82%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 70.9M | ✅ | 35.9M | 🟢 **-49%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ✅ | 11.0M | 🟢 **-83%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.2M | ✅ | 36.2M | 🟢 **-48%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.4M | ✅ | 10.7M | 🟢 **-84%** |
| enum.json | nul characters in strings | 2 | ✅ | 62.2M | ✅ | 27.2M | 🟢 **-56%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 67.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 86.4M | ✅ | 44.1M | 🟢 **-49%** |
| format.json | idn-email format | 6 | ✅ | 87.1M | ✅ | 68.4M | 🟢 **-21%** |
| format.json | regex format | 6 | ✅ | 87.0M | ✅ | 68.3M | 🟢 **-21%** |
| format.json | ipv4 format | 6 | ✅ | 87.3M | ✅ | 64.7M | 🟢 **-26%** |
| format.json | ipv6 format | 6 | ✅ | 86.6M | ✅ | 65.0M | 🟢 **-25%** |
| format.json | idn-hostname format | 6 | ✅ | 87.2M | ✅ | 68.7M | 🟢 **-21%** |
| format.json | hostname format | 6 | ✅ | 86.6M | ✅ | 65.1M | 🟢 **-25%** |
| format.json | date format | 6 | ✅ | 87.2M | ✅ | 67.9M | 🟢 **-22%** |
| format.json | date-time format | 6 | ✅ | 86.8M | ✅ | 64.7M | 🟢 **-26%** |
| format.json | time format | 6 | ✅ | 86.9M | ✅ | 68.7M | 🟢 **-21%** |
| format.json | json-pointer format | 6 | ✅ | 81.4M | ✅ | 68.9M | -15% |
| format.json | relative-json-pointer format | 6 | ✅ | 87.2M | ✅ | 68.7M | 🟢 **-21%** |
| format.json | iri format | 6 | ✅ | 86.3M | ✅ | 63.4M | 🟢 **-27%** |
| format.json | iri-reference format | 6 | ✅ | 87.2M | ✅ | 68.7M | 🟢 **-21%** |
| format.json | uri format | 6 | ✅ | 86.5M | ✅ | 64.6M | 🟢 **-25%** |
| format.json | uri-reference format | 6 | ✅ | 86.2M | ✅ | 68.7M | 🟢 **-20%** |
| format.json | uri-template format | 6 | ✅ | 79.0M | ✅ | 68.4M | -13% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ✅ | 75.4M | 🟢 **-56%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.2M | ✅ | 72.3M | 🟢 **-58%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.6M | ✅ | 74.8M | 🟢 **-56%** |
| if-then-else.json | if and then without else | 3 | ✅ | 73.6M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.6M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 58.1M | 🟢 **-66%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.6M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 70.6M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 45.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.8M | ✅ | 28.3M | 🟢 **-37%** |
| items.json | a schema given for items | 4 | ✅ | 61.8M | ✅ | 48.0M | 🟢 **-22%** |
| items.json | an array of schemas for items | 6 | ✅ | 64.5M | ✅ | 52.8M | -18% |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.8M | ✅ | 65.9M | 🟢 **-61%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.8M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 65.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 30.6M | ✅ | 23.4M | 🟢 **-24%** |
| items.json | nested items | 3 | ✅ | 13.6M | ✅ | 9.1M | 🟢 **-33%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 60.4M | -16% |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 62.9M | -16% |
| maxItems.json | maxItems validation | 4 | ✅ | 75.1M | ✅ | 52.4M | 🟢 **-30%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 47.2M | 🟢 **-32%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.4M | ✅ | 44.7M | 🟢 **-25%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 57.3M | ✅ | 40.6M | 🟢 **-29%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.9M | ✅ | 44.9M | -20% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.5M | ✅ | 30.9M | 🟢 **-36%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ✅ | 33.6M | 🟢 **-32%** |
| maximum.json | maximum validation | 4 | ✅ | 73.2M | ✅ | 53.5M | 🟢 **-27%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.1M | ✅ | 52.9M | 🟢 **-27%** |
| minItems.json | minItems validation | 4 | ✅ | 68.1M | ✅ | 52.2M | 🟢 **-23%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.0M | ✅ | 46.3M | 🟢 **-33%** |
| minLength.json | minLength validation | 5 | ✅ | 61.4M | ✅ | 42.1M | 🟢 **-32%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.6M | ✅ | 28.2M | 🟢 **-50%** |
| minProperties.json | minProperties validation | 6 | ✅ | 56.9M | ✅ | 45.7M | -20% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.2M | ✅ | 34.2M | 🟢 **-30%** |
| minimum.json | minimum validation | 4 | ✅ | 73.3M | ✅ | 52.9M | 🟢 **-28%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 53.2M | 🟢 **-23%** |
| multipleOf.json | by int | 3 | ✅ | 73.8M | ✅ | 53.4M | 🟢 **-28%** |
| multipleOf.json | by number | 3 | ✅ | 70.1M | ✅ | 6.1M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 4.0M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.7M | ✅ | 4.4M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 73.3M | ✅ | 17.2M | 🟢 **-77%** |
| not.json | not multiple types | 3 | ✅ | 67.7M | ✅ | 23.1M | 🟢 **-66%** |
| not.json | not more complex schema | 3 | ✅ | 65.9M | ✅ | 17.0M | 🟢 **-74%** |
| not.json | forbidden property | 2 | ✅ | 52.6M | ✅ | 44.6M | -15% |
| not.json | forbid everything with empty schema | 9 | ✅ | 62.0M | ✅ | 38.3M | 🟢 **-38%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.9M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 176.8M | ✅ | 58.4M | 🟢 **-67%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 13.6M | 🟢 **-91%** |
| oneOf.json | oneOf | 4 | ✅ | 61.1M | ✅ | 16.8M | 🟢 **-72%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.7M | ✅ | 17.6M | 🟢 **-51%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 62.9M | ✅ | 41.2M | 🟢 **-34%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 38.2M | 🟢 **-40%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 40.4M | 🟢 **-36%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.8M | ✅ | 17.9M | 🟢 **-59%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 19.8M | 🟢 **-73%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.5M | ✅ | 17.2M | 🟢 **-63%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.7M | ✅ | 16.4M | 🟢 **-66%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.5M | ✅ | 14.4M | 🟢 **-80%** |
| pattern.json | pattern validation | 8 | ✅ | 53.6M | ✅ | 44.9M | -16% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.9M | ✅ | 28.7M | +15% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ✅ | 19.1M | 🟢 **-27%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.9M | ✅ | 6.8M | 🟢 **-57%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.8M | ✅ | 13.0M | 🟢 **-27%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 22.5M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 17.3M | -3% |
| properties.json | object properties validation | 6 | ✅ | 54.0M | ✅ | 44.2M | -18% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.3M | ✅ | 8.1M | 🟢 **-60%** |
| properties.json | properties with boolean schema | 4 | ✅ | 33.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 50.5M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ✅ | 44.3M | 🟢 **-34%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.6M | ✅ | 48.8M | 🟢 **-72%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.8M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 42.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 44.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 27.2M | ✅ | 13.4M | 🟢 **-51%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.0M | ✅ | 43.7M | -16% |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.1M | ✅ | 43.8M | 🟢 **-23%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.0M | ✅ | 39.3M | -15% |
| ref.json | nested refs | 2 | ✅ | 54.0M | ✅ | 49.8M | -8% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 55.6M | ✅ | 45.8M | -18% |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 67.2M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.6M | ✅ | 44.2M | -16% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.9M | ✅ | 44.7M | -15% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 147.3M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.5M | ✅ | 44.7M | -15% |
| ref.json | Location-independent identifier | 2 | ✅ | 68.8M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 68.8M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 68.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.1M | ✅ | 6.2M | 🟢 **-89%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 40.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 40.4M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 68.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.7M | ✅ | 44.2M | -16% |
| ref.json | URN base URI with NSS | 2 | ✅ | 52.5M | ✅ | 44.5M | -15% |
| ref.json | URN base URI with r-component | 2 | ✅ | 52.4M | ✅ | 44.5M | -15% |
| ref.json | URN base URI with q-component | 2 | ✅ | 52.5M | ✅ | 43.4M | -17% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 53.3M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 68.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 68.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 68.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 68.6M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 50.2M | 🟢 **-32%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 49.9M | 🟢 **-32%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.4M | ✅ | 49.9M | 🟢 **-32%** |
| refRemote.json | remote ref | 2 | ✅ | 68.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 68.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 68.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 34.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 43.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 40.7M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 55.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 55.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 53.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 61.5M | ✅ | 52.3M | -15% |
| required.json | required default validation | 1 | ✅ | 158.6M | ✅ | 61.0M | 🟢 **-62%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 61.2M | 🟢 **-62%** |
| required.json | required with escaped characters | 2 | ✅ | 50.7M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.5M | ✅ | 29.9M | 🟢 **-53%** |
| type.json | number type matches numbers | 9 | ✅ | 66.2M | ✅ | 44.9M | 🟢 **-32%** |
| type.json | string type matches strings | 9 | ✅ | 65.4M | ✅ | 46.1M | 🟢 **-30%** |
| type.json | object type matches objects | 7 | ✅ | 56.5M | ✅ | 37.8M | 🟢 **-33%** |
| type.json | array type matches arrays | 7 | ✅ | 61.1M | ✅ | 38.6M | 🟢 **-37%** |
| type.json | boolean type matches booleans | 10 | ✅ | 61.9M | ✅ | 40.3M | 🟢 **-35%** |
| type.json | null type matches only the null object | 10 | ✅ | 57.8M | ✅ | 38.0M | 🟢 **-34%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.3M | ✅ | 40.5M | 🟢 **-36%** |
| type.json | type as array with one item | 2 | ✅ | 73.1M | ✅ | 50.0M | 🟢 **-32%** |
| type.json | type: array or object | 5 | ✅ | 65.1M | ✅ | 42.3M | 🟢 **-35%** |
| type.json | type: array, object or null | 5 | ✅ | 73.6M | ✅ | 47.7M | 🟢 **-35%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ✅ | 2.0M | 🟢 **-89%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.2M | ✅ | 6.4M | 🟢 **-81%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 6.2M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 158.3M | ✅ | 64.4M | 🟢 **-59%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.4M | ✅ | 58.1M | -17% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.9M | ✅ | 50.2M | 🟢 **-21%** |
| optional/bignum.json | integer | 2 | ✅ | 83.7M | ✅ | 13.1M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 84.0M | ✅ | 71.8M | -15% |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 40.2M | 🟢 **-34%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 65.2M | -13% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 46.4M | 🟢 **-38%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 352K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.7M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 427K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 27.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 59.9M | ✅ | 21.4M | 🟢 **-64%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ✅ | 24.7M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 24.6M | -13% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.8M | ✅ | 24.6M | -14% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.3M | ✅ | 23.8M | -19% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.2M | ✅ | 24.4M | -7% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.1M | ✅ | 24.1M | -17% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.8M | ✅ | 24.3M | -16% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.7M | ✅ | 28.2M | +6% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.2M | ✅ | 10.5M | 🟢 **-66%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.4M | ✅ | 12.5M | -19% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 13.2M | -11% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.7M | ✅ | 22.5M | -16% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.3M | ✅ | 12.8M | 🟢 **-42%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 15.1M | 🟢 **-25%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ✅ | 11.4M | 🔴 **+40%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 14.2M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.0M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.3M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.0M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.7M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 70.0M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.2M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 73.6M | ✅ | 41.6M | 🟢 **-44%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 41.1M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 64.8M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 57.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.9M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 26.6M | ✅ | 6.5M | 🟢 **-75%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 41.4M | ✅ | 37.1M | -10% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.6M | ✅ | 62.0M | 🟢 **-61%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.3M | ✅ | 54.9M | 🟢 **-25%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 87.7M | ✅ | 71.3M | -19% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 78.9M | ✅ | 64.5M | -18% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 29.2M | ✅ | 22.5M | 🟢 **-23%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.7M | ✅ | 40.6M | -5% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 42.8M | 🟢 **-60%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.3M | ✅ | 66.0M | 🟢 **-58%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 62.4M | ✅ | 13.8M | 🟢 **-78%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.6M | ✅ | 15.5M | 🟢 **-57%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.8M | ✅ | 16.8M | 🟢 **-63%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 22.5M | ✅ | 29.3M | 🔴 **+30%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 63.3M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 31.2M | ✅ | 26.0M | -17% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.0M | ✅ | 34.3M | 🟢 **-50%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.7M | ✅ | 19.9M | 🟢 **-37%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 38.0M | ✅ | 15.4M | 🟢 **-60%** |
| allOf.json | allOf | 4 | ✅ | 40.4M | ✅ | 32.6M | -19% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.2M | ✅ | 27.3M | -10% |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 50.3M | 🟢 **-31%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 74.7M | 🟢 **-53%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ✅ | 56.3M | 🟢 **-65%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.6M | ✅ | 73.3M | 🟢 **-54%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 46.1M | 🟢 **-40%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 48.5M | 🟢 **-59%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 46.9M | 🟢 **-40%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.2M | ✅ | 23.1M | 🟢 **-72%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 71.5M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 91.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 81.4M | ✅ | 14.8M | 🟢 **-82%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.1M | ✅ | 18.0M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 17.9M | 🟢 **-89%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.4M | ✅ | 16.4M | 🟢 **-90%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.0M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 54.5M | ✅ | 14.9M | 🟢 **-73%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 15.5M | 🟢 **-91%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 14.6M | 🟢 **-81%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.5M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 65.3M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.4M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 41.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 78.6M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 76.0M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 65.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 60.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 61.8M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.2M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.6M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 63.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 47.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 49.5M | 🟢 **-36%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 172.7M | ✅ | 72.7M | 🟢 **-58%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.6M | ✅ | 73.1M | 🟢 **-58%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 178.7M | ✅ | 68.3M | 🟢 **-62%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 182.8M | ✅ | 70.8M | 🟢 **-61%** |
| default.json | invalid type for default | 2 | ✅ | 70.4M | ✅ | 61.6M | -12% |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ✅ | 47.6M | -13% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 56.1M | ✅ | 44.3M | 🟢 **-21%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 65.2M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.2M | ✅ | 57.2M | 🟢 **-68%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 59.5M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 50.0M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 43.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 88.8M | ✅ | 30.9M | 🟢 **-65%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.6M | ✅ | 2.4M | 🟢 **-95%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 17.4M | 🟢 **-77%** |
| enum.json | enums in properties | 6 | ✅ | 45.1M | ✅ | 20.7M | 🟢 **-54%** |
| enum.json | enum with escaped characters | 3 | ✅ | 77.8M | ✅ | 24.3M | 🟢 **-69%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.2M | ✅ | 33.4M | 🟢 **-56%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 10.1M | 🟢 **-85%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.1M | ✅ | 32.9M | 🟢 **-57%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.5M | ✅ | 9.4M | 🟢 **-86%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 36.6M | 🟢 **-51%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.8M | ✅ | 10.3M | 🟢 **-85%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.7M | ✅ | 36.8M | 🟢 **-50%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.4M | ✅ | 9.5M | 🟢 **-86%** |
| enum.json | nul characters in strings | 2 | ✅ | 63.4M | ✅ | 27.5M | 🟢 **-57%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 167.9M | ✅ | 45.9M | 🟢 **-73%** |
| format.json | idn-email format | 6 | ✅ | 182.2M | ✅ | 72.0M | 🟢 **-61%** |
| format.json | regex format | 6 | ✅ | 181.5M | ✅ | 71.6M | 🟢 **-61%** |
| format.json | ipv4 format | 6 | ✅ | 182.7M | ✅ | 68.7M | 🟢 **-62%** |
| format.json | ipv6 format | 6 | ✅ | 182.8M | ✅ | 66.6M | 🟢 **-64%** |
| format.json | idn-hostname format | 6 | ✅ | 181.8M | ✅ | 71.8M | 🟢 **-61%** |
| format.json | hostname format | 6 | ✅ | 182.7M | ✅ | 68.5M | 🟢 **-63%** |
| format.json | date format | 6 | ✅ | 182.8M | ✅ | 71.7M | 🟢 **-61%** |
| format.json | date-time format | 6 | ✅ | 182.4M | ✅ | 68.7M | 🟢 **-62%** |
| format.json | time format | 6 | ✅ | 181.0M | ✅ | 72.0M | 🟢 **-60%** |
| format.json | json-pointer format | 6 | ✅ | 182.5M | ✅ | 71.9M | 🟢 **-61%** |
| format.json | relative-json-pointer format | 6 | ✅ | 182.4M | ✅ | 71.6M | 🟢 **-61%** |
| format.json | iri format | 6 | ✅ | 179.5M | ✅ | 71.6M | 🟢 **-60%** |
| format.json | iri-reference format | 6 | ✅ | 182.8M | ✅ | 71.8M | 🟢 **-61%** |
| format.json | uri format | 6 | ✅ | 182.3M | ✅ | 64.6M | 🟢 **-65%** |
| format.json | uri-reference format | 6 | ✅ | 182.9M | ✅ | 71.4M | 🟢 **-61%** |
| format.json | uri-template format | 6 | ✅ | 182.5M | ✅ | 71.8M | 🟢 **-61%** |
| format.json | uuid format | 6 | ✅ | 179.8M | ✅ | 63.8M | 🟢 **-64%** |
| format.json | duration format | 6 | ✅ | 182.5M | ✅ | 71.4M | 🟢 **-61%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ✅ | 77.0M | 🟢 **-55%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 165.3M | ✅ | 76.8M | 🟢 **-54%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.0M | ✅ | 77.0M | 🟢 **-55%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.3M | ✅ | 62.2M | 🟢 **-64%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 46.6M | ✅ | 28.6M | 🟢 **-39%** |
| items.json | a schema given for items | 4 | ✅ | 63.8M | ✅ | 49.4M | 🟢 **-23%** |
| items.json | an array of schemas for items | 6 | ✅ | 67.9M | ✅ | 55.1M | -19% |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.3M | ✅ | 70.8M | 🟢 **-59%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 72.0M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 68.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 31.0M | ✅ | 23.4M | 🟢 **-25%** |
| items.json | nested items | 3 | ✅ | 13.7M | ✅ | 9.0M | 🟢 **-34%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 62.2M | -17% |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.0M | ✅ | 65.0M | -18% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.6M | ✅ | 76.0M | 🟢 **-56%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 65.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 61.2M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 80.9M | ✅ | 40.2M | 🟢 **-50%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.5M | ✅ | 47.4M | 🟢 **-35%** |
| maxLength.json | maxLength validation | 5 | ✅ | 62.4M | ✅ | 46.4M | 🟢 **-26%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.4M | ✅ | 40.9M | 🟢 **-31%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.3M | ✅ | 39.1M | 🟢 **-33%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.7M | ✅ | 32.8M | 🟢 **-34%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.2M | ✅ | 33.0M | 🟢 **-36%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 54.3M | 🟢 **-29%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 54.8M | 🟢 **-28%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 76.8M | 🟢 **-55%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 81.4M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.5M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.7M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 57.3M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.4M | ✅ | 61.0M | 🟢 **-64%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 80.1M | ✅ | 40.8M | 🟢 **-49%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.7M | ✅ | 47.9M | 🟢 **-34%** |
| minLength.json | minLength validation | 5 | ✅ | 58.0M | ✅ | 43.9M | 🟢 **-24%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ✅ | 40.9M | 🟢 **-31%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.3M | ✅ | 46.8M | 🟢 **-21%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.2M | ✅ | 34.2M | 🟢 **-32%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 53.6M | 🟢 **-30%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ✅ | 55.4M | 🟢 **-23%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 54.2M | 🟢 **-30%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 6.4M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 66.7M | ✅ | 4.1M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 4.3M | 🟢 **-93%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 67.5M | ✅ | 17.3M | 🟢 **-74%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 23.0M | 🟢 **-68%** |
| not.json | not more complex schema | 3 | ✅ | 69.0M | ✅ | 17.3M | 🟢 **-75%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 45.5M | -16% |
| not.json | forbid everything with empty schema | 9 | ✅ | 59.8M | ✅ | 39.4M | 🟢 **-34%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.4M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.7M | ✅ | 58.4M | 🟢 **-68%** |
| not.json | double negation | 1 | ✅ | 159.2M | ✅ | 14.1M | 🟢 **-91%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ✅ | 15.2M | 🟢 **-77%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.2M | ✅ | 18.6M | 🟢 **-50%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 42.5M | 🟢 **-36%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 39.4M | 🟢 **-40%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 42.5M | 🟢 **-36%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 45.0M | ✅ | 17.8M | 🟢 **-61%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 20.4M | 🟢 **-73%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.4M | ✅ | 17.4M | 🟢 **-64%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 16.1M | 🟢 **-67%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 14.4M | 🟢 **-81%** |
| pattern.json | pattern validation | 8 | ✅ | 56.3M | ✅ | 47.0M | -16% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.3M | ✅ | 29.0M | +19% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 28.3M | ✅ | 19.2M | 🟢 **-32%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ✅ | 6.4M | 🟢 **-58%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.0M | ✅ | 13.6M | 🟢 **-25%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 22.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 17.3M | -4% |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ✅ | 44.1M | 🟢 **-21%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.9M | ✅ | 8.0M | 🟢 **-61%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 52.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 45.1M | 🟢 **-36%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.9M | ✅ | 49.8M | 🟢 **-71%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 47.1M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 45.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 7.5M | 🔴 **+139%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 14.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 13.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.3M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.9M | ✅ | 16.8M | 🟢 **-38%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.9M | ✅ | 45.0M | -18% |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ✅ | 40.6M | 🟢 **-32%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ✅ | 40.2M | -16% |
| ref.json | nested refs | 2 | ✅ | 57.3M | ✅ | 53.2M | -7% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 47.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.7M | ✅ | 35.6M | 🟢 **-35%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.8M | ✅ | 45.8M | -16% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.4M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.4M | ✅ | 45.9M | -16% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 32.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.7M | ✅ | 5.7M | 🟢 **-90%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 41.3M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 39.1M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 71.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 70.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.7M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 57.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.7M | ✅ | 45.7M | -17% |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.8M | ✅ | 45.3M | -17% |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.5M | ✅ | 45.5M | -17% |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.8M | ✅ | 45.8M | -16% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 54.4M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 71.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 71.3M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 71.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 71.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 72.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 53.1M | 🟢 **-31%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 52.9M | 🟢 **-31%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 50.9M | 🟢 **-34%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.9M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 71.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 71.6M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 72.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 69.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 42.6M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 57.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 71.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 48.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 69.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 71.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 58.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 71.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.4M | ✅ | 54.5M | -13% |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 49.8M | 🟢 **-69%** |
| required.json | required with empty array | 1 | ✅ | 159.4M | ✅ | 63.4M | 🟢 **-60%** |
| required.json | required with escaped characters | 2 | ✅ | 53.8M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.8M | ✅ | 38.5M | 🟢 **-42%** |
| type.json | number type matches numbers | 9 | ✅ | 66.8M | ✅ | 46.7M | 🟢 **-30%** |
| type.json | string type matches strings | 9 | ✅ | 69.1M | ✅ | 46.6M | 🟢 **-33%** |
| type.json | object type matches objects | 7 | ✅ | 56.3M | ✅ | 39.3M | 🟢 **-30%** |
| type.json | array type matches arrays | 7 | ✅ | 64.6M | ✅ | 39.6M | 🟢 **-39%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 42.5M | 🟢 **-36%** |
| type.json | null type matches only the null object | 10 | ✅ | 63.8M | ✅ | 38.6M | 🟢 **-40%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.9M | ✅ | 41.3M | 🟢 **-37%** |
| type.json | type as array with one item | 2 | ✅ | 91.2M | ✅ | 49.0M | 🟢 **-46%** |
| type.json | type: array or object | 5 | ✅ | 87.7M | ✅ | 43.2M | 🟢 **-51%** |
| type.json | type: array, object or null | 5 | ✅ | 88.6M | ✅ | 39.7M | 🟢 **-55%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 76.5M | -8% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 61.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 43.2M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 78.8M | ✅ | 47.5M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 51.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 54.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 24.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 81.9M | ✅ | 47.5M | 🟢 **-42%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.3M | ✅ | 67.2M | 🔴 **+230%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 52.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 52.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.5M | ✅ | 45.6M | 🟢 **-50%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 74.4M | -1% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 23.7M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.1M | ✅ | 68.3M | +18% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 37.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 42.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 40.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 69.6M | ✅ | 44.9M | 🟢 **-36%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 36.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 14.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 43.5M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 32.3M | ✅ | 60.1M | 🔴 **+86%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 20.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 32.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 20.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 32.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 40.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 35.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 35.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 34.2M | ✅ | 42.7M | 🔴 **+25%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 33.6M | ✅ | 60.8M | 🔴 **+81%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 33.0M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 24.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.4M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 30.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 35.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.1M | ✅ | 10.5M | 🟢 **-48%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.4M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.6M | ✅ | 45.4M | 🟢 **-45%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.6M | ✅ | 74.7M | 🔴 **+45%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.6M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 24.0M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 29.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ✅ | 2.0M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ✅ | 6.4M | 🟢 **-81%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ✅ | 10.7M | 🟢 **-44%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 159.9M | ✅ | 85.5M | 🟢 **-47%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.0M | ✅ | 60.7M | -17% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.3M | ✅ | 51.7M | 🟢 **-22%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 52.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 39.6M | ✅ | 34.4M | -13% |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 12.4M | 🟢 **-86%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 66.0M | 🟢 **-26%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 26.7M | 🟢 **-58%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 68.4M | -13% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 48.9M | 🟢 **-38%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 29.6M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 73.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.2M | ✅ | 41.4M | 🟢 **-36%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.1M | ✅ | 67.3M | 🟢 **-62%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.2M | ✅ | 37.7M | +10% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.8M | ✅ | 47.0M | -16% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 49.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.5M | ✅ | 21.0M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 20.2M | ✅ | 23.4M | +16% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.2M | ✅ | 25.3M | -13% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 25.4M | -14% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.5M | ✅ | 25.0M | -15% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.5M | ✅ | 27.1M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.7M | ✅ | 24.6M | -17% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.4M | ✅ | 25.3M | -14% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 29.9M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 10.5M | 🟢 **-67%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ✅ | 12.7M | -19% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.8M | ✅ | 13.6M | -14% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 24.4M | -18% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.5M | ✅ | 15.1M | 🟢 **-33%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 22.6M | ✅ | 17.9M | 🟢 **-21%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ✅ | 10.6M | 🔴 **+26%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.1M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.0M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.3M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.5M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.5M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.0M | ✅ | 45.9M | 🟢 **-52%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.7M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 68.0M | ✅ | 35.7M | 🟢 **-48%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 54.8M | ✅ | 33.4M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 54.4M | ✅ | 44.9M | -17% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 45.0M | -18% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.5M | ✅ | 53.0M | 🟢 **-31%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 45.4M | -17% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 31.1M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 54.5M | ✅ | 20.8M | 🟢 **-62%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.2M | ✅ | 18.2M | 🟢 **-48%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.0M | ✅ | 16.5M | 🟢 **-62%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.6M | ✅ | 16.1M | 🟢 **-56%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ✅ | 62.5M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 34.0M | ✅ | 25.8M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.2M | ✅ | 42.4M | 🟢 **-39%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 34.9M | ✅ | 19.7M | 🟢 **-44%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 38.3M | ✅ | 18.6M | 🟢 **-51%** |
| allOf.json | allOf | 4 | ✅ | 40.1M | ✅ | 35.9M | -10% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.2M | ✅ | 27.6M | -11% |
| allOf.json | allOf simple types | 2 | ✅ | 85.3M | ✅ | 44.1M | 🟢 **-48%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 74.0M | 🟢 **-54%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 55.7M | 🟢 **-65%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 74.1M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 52.5M | 🟢 **-32%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 45.5M | 🟢 **-61%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.5M | ✅ | 45.5M | 🟢 **-42%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.2M | ✅ | 22.9M | 🟢 **-73%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 71.4M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 79.3M | ✅ | 15.0M | 🟢 **-81%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.0M | ✅ | 18.3M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 18.1M | 🟢 **-89%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.1M | ✅ | 17.5M | 🟢 **-89%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.2M | ✅ | 14.2M | 🟢 **-72%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 15.6M | 🟢 **-91%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.6M | ✅ | 14.5M | 🟢 **-82%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.5M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.5M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 82.4M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 41.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 78.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 69.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 76.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 58.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 68.0M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 67.9M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.4M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 63.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 47.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 54.2M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 49.3M | 🟢 **-36%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 175.5M | ✅ | 77.4M | 🟢 **-56%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ✅ | 76.6M | 🟢 **-57%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.6M | ✅ | 74.9M | 🟢 **-58%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 175.8M | ✅ | 71.7M | 🟢 **-59%** |
| default.json | invalid type for default | 2 | ✅ | 70.3M | ✅ | 61.3M | -13% |
| default.json | invalid string value for default | 2 | ✅ | 54.8M | ✅ | 48.2M | -12% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 53.5M | ✅ | 44.5M | -17% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 65.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.5M | ✅ | 61.3M | 🟢 **-65%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.7M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 49.5M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 42.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.9M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 17.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 14.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.6M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 10.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.8M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 31.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 8.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 38.0M | ✅ | 31.3M | -17% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.0M | ✅ | 2.6M | 🟢 **-94%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.1M | ✅ | 17.2M | 🟢 **-73%** |
| enum.json | enums in properties | 6 | ✅ | 45.2M | ✅ | 22.4M | 🟢 **-50%** |
| enum.json | enum with escaped characters | 3 | ✅ | 40.7M | ✅ | 24.4M | 🟢 **-40%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 73.0M | ✅ | 33.1M | 🟢 **-55%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.6M | ✅ | 10.5M | 🟢 **-84%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.2M | ✅ | 32.9M | 🟢 **-57%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.3M | ✅ | 11.3M | 🟢 **-82%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.7M | ✅ | 36.4M | 🟢 **-45%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 35.5M | ✅ | 11.3M | 🟢 **-68%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.1M | ✅ | 36.8M | 🟢 **-47%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.8M | ✅ | 11.2M | 🟢 **-83%** |
| enum.json | nul characters in strings | 2 | ✅ | 61.1M | ✅ | 27.1M | 🟢 **-56%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 183.4M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 183.1M | ✅ | 45.4M | 🟢 **-75%** |
| format.json | regex format | 7 | ✅ | 183.8M | ✅ | 72.4M | 🟢 **-61%** |
| format.json | ipv4 format | 7 | ✅ | 183.6M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 181.9M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 182.7M | ✅ | 45.6M | 🟢 **-75%** |
| format.json | hostname format | 7 | ✅ | 181.3M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 183.3M | ✅ | 42.3M | 🟢 **-77%** |
| format.json | date-time format | 7 | ✅ | 183.5M | ✅ | 36.6M | 🟢 **-80%** |
| format.json | time format | 7 | ✅ | 147.0M | ✅ | 72.3M | 🟢 **-51%** |
| format.json | json-pointer format | 7 | ✅ | 177.0M | ✅ | 72.0M | 🟢 **-59%** |
| format.json | relative-json-pointer format | 7 | ✅ | 183.8M | ✅ | 72.1M | 🟢 **-61%** |
| format.json | iri format | 7 | ✅ | 184.1M | ✅ | 72.7M | 🟢 **-61%** |
| format.json | iri-reference format | 7 | ✅ | 183.5M | ✅ | 72.4M | 🟢 **-61%** |
| format.json | uri format | 7 | ✅ | 183.9M | ✅ | 49.7M | 🟢 **-73%** |
| format.json | uri-reference format | 7 | ✅ | 177.4M | ✅ | 72.6M | 🟢 **-59%** |
| format.json | uri-template format | 7 | ✅ | 150.2M | ✅ | 69.9M | 🟢 **-53%** |
| format.json | uuid format | 7 | ✅ | 183.3M | ✅ | 72.3M | 🟢 **-61%** |
| format.json | duration format | 7 | ✅ | 183.9M | ✅ | 72.4M | 🟢 **-61%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ✅ | 77.0M | 🟢 **-55%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.6M | ✅ | 76.6M | 🟢 **-55%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 76.6M | 🟢 **-55%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 160.6M | ✅ | 61.8M | 🟢 **-62%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 46.5M | ✅ | 28.6M | 🟢 **-38%** |
| items.json | a schema given for items | 4 | ✅ | 64.2M | ✅ | 49.4M | 🟢 **-23%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 168.5M | ✅ | 70.7M | 🟢 **-58%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 31.1M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.8M | ✅ | 8.9M | 🟢 **-36%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.7M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 53.5M | ✅ | 33.4M | 🟢 **-38%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 53.0M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 46.1M | 🟢 **-39%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.8M | ✅ | 76.2M | 🟢 **-56%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 75.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 80.9M | ✅ | 40.7M | 🟢 **-50%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.7M | ✅ | 46.8M | 🟢 **-36%** |
| maxLength.json | maxLength validation | 5 | ✅ | 62.2M | ✅ | 46.9M | 🟢 **-25%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 58.2M | ✅ | 40.2M | 🟢 **-31%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.4M | ✅ | 44.0M | 🟢 **-25%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.5M | ✅ | 34.9M | 🟢 **-30%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.7M | ✅ | 34.8M | 🟢 **-32%** |
| maximum.json | maximum validation | 4 | ✅ | 76.8M | ✅ | 54.8M | 🟢 **-29%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 54.4M | 🟢 **-28%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.7M | ✅ | 74.2M | 🟢 **-57%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 72.0M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.9M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 58.8M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 171.7M | ✅ | 61.9M | 🟢 **-64%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 72.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 80.8M | ✅ | 40.4M | 🟢 **-50%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.3M | ✅ | 36.2M | 🟢 **-45%** |
| minLength.json | minLength validation | 5 | ✅ | 57.9M | ✅ | 43.9M | 🟢 **-24%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ✅ | 28.3M | 🟢 **-52%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 46.9M | 🟢 **-22%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.4M | ✅ | 31.4M | 🟢 **-38%** |
| minimum.json | minimum validation | 4 | ✅ | 76.5M | ✅ | 54.1M | 🟢 **-29%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.2M | ✅ | 55.6M | 🟢 **-23%** |
| multipleOf.json | by int | 3 | ✅ | 76.8M | ✅ | 55.4M | 🟢 **-28%** |
| multipleOf.json | by number | 3 | ✅ | 73.6M | ✅ | 6.1M | 🟢 **-92%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 4.2M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 4.5M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.3M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 17.0M | 🟢 **-78%** |
| not.json | not multiple types | 3 | ✅ | 71.2M | ✅ | 23.1M | 🟢 **-68%** |
| not.json | not more complex schema | 3 | ✅ | 69.1M | ✅ | 17.4M | 🟢 **-75%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 46.2M | -15% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.5M | ✅ | 39.0M | 🟢 **-36%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.7M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 185.2M | ✅ | 57.8M | 🟢 **-69%** |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 14.3M | 🟢 **-91%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 65.4M | ✅ | 15.1M | 🟢 **-77%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.3M | ✅ | 18.5M | 🟢 **-50%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.0M | ✅ | 41.9M | 🟢 **-36%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 39.0M | 🟢 **-41%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 41.9M | 🟢 **-37%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 45.0M | ✅ | 18.0M | 🟢 **-60%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 20.2M | 🟢 **-73%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.7M | ✅ | 17.3M | 🟢 **-59%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 16.4M | 🟢 **-67%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 14.4M | 🟢 **-81%** |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ✅ | 43.8M | 🟢 **-23%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.1M | ✅ | 29.0M | 🔴 **+106%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.1M | ✅ | 19.6M | 🟢 **-28%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.3M | ✅ | 5.9M | 🟢 **-61%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.9M | ✅ | 13.5M | 🟢 **-25%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 22.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 17.2M | -2% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 67.9M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 68.0M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 78.9M | ✅ | 60.8M | 🟢 **-23%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 79.0M | ✅ | 73.4M | -7% |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ✅ | 46.7M | -17% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.5M | ✅ | 7.0M | 🟢 **-68%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 46.1M | 🟢 **-34%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 47.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.4M | ✅ | 50.3M | 🟢 **-71%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.8M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 47.1M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 45.4M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.9M | ✅ | 16.5M | 🟢 **-39%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.9M | ✅ | 44.7M | -19% |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ✅ | 38.2M | -20% |
| ref.json | nested refs | 2 | ✅ | 54.7M | ✅ | 52.6M | -4% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 46.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.8M | ✅ | 33.6M | 🟢 **-39%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 44.7M | -18% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.4M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.4M | ✅ | 45.5M | -16% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 32.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.8M | ✅ | 5.8M | 🟢 **-90%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 41.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 41.9M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 71.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 69.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 54.6M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.2M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.8M | ✅ | 41.5M | 🟢 **-24%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.8M | ✅ | 45.6M | -17% |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.8M | ✅ | 45.8M | -16% |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.8M | ✅ | 45.8M | -16% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.8M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 54.8M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 71.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 70.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 70.9M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 70.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 71.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 51.2M | 🟢 **-34%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 52.3M | 🟢 **-32%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.0M | ✅ | 43.7M | 🟢 **-43%** |
| refRemote.json | remote ref | 2 | ✅ | 71.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 70.7M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 70.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 70.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 39.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 46.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 42.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 57.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 70.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 70.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 70.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 53.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 69.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 77.2M | ✅ | 54.2M | 🟢 **-30%** |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 63.2M | 🟢 **-60%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 63.2M | 🟢 **-60%** |
| required.json | required with escaped characters | 2 | ✅ | 53.9M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.8M | ✅ | 38.3M | 🟢 **-43%** |
| type.json | number type matches numbers | 9 | ✅ | 69.3M | ✅ | 46.4M | 🟢 **-33%** |
| type.json | string type matches strings | 9 | ✅ | 68.8M | ✅ | 46.5M | 🟢 **-32%** |
| type.json | object type matches objects | 7 | ✅ | 58.6M | ✅ | 39.4M | 🟢 **-33%** |
| type.json | array type matches arrays | 7 | ✅ | 64.2M | ✅ | 39.4M | 🟢 **-39%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.4M | ✅ | 42.3M | 🟢 **-36%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.7M | ✅ | 37.3M | 🟢 **-43%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.1M | ✅ | 40.7M | 🟢 **-38%** |
| type.json | type as array with one item | 2 | ✅ | 76.8M | ✅ | 52.2M | 🟢 **-32%** |
| type.json | type: array or object | 5 | ✅ | 70.2M | ✅ | 42.0M | 🟢 **-40%** |
| type.json | type: array, object or null | 5 | ✅ | 77.5M | ✅ | 48.0M | 🟢 **-38%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 75.9M | -8% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 57.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 43.1M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 49.8M | 🟢 **-37%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 53.5M | ✅ | 44.3M | -17% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 54.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.8M | ✅ | 49.2M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.7M | ✅ | 76.7M | 🔴 **+254%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 13.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 53.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 53.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 22.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 9.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 20.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.9M | ✅ | 46.1M | 🟢 **-50%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 74.5M | -1% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 23.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.3M | ✅ | 77.0M | 🔴 **+32%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 37.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 40.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 37.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.6M | ✅ | 39.3M | 🟢 **-77%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 39.0M | ✅ | 19.7M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.6M | ✅ | 43.6M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 23.9M | ✅ | 62.3M | 🔴 **+161%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 19.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 22.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 38.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 33.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.8M | ✅ | 42.9M | 🔴 **+49%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.9M | ✅ | 62.7M | 🔴 **+117%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 36.9M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 20.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.2M | ✅ | 10.2M | 🟢 **-49%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.4M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 81.9M | ✅ | 45.8M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.7M | ✅ | 74.6M | 🔴 **+44%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 32.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.7M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 24.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 29.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.7M | ✅ | 2.0M | 🟢 **-89%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.4M | ✅ | 6.2M | 🟢 **-81%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.6M | ✅ | 78.3M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.2M | ✅ | 66.1M | -10% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.6M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 43.6M | 🟢 **-43%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.6M | ✅ | 13.1M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 68.7M | 🟢 **-23%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 41.3M | 🟢 **-35%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 67.9M | -14% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 47.0M | 🟢 **-40%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ✅ | 41.5M | 🟢 **-36%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 66.3M | 🟢 **-62%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.1M | ✅ | 37.4M | +10% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.6M | ✅ | 46.9M | -16% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 49.9M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.6M | ✅ | 22.2M | 🟢 **-66%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 27.6M | ✅ | 23.8M | -14% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 25.0M | -7% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.0M | ✅ | 24.9M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.9M | ✅ | 24.7M | -15% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.3M | ✅ | 26.6M | -3% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.7M | ✅ | 25.2M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.7M | ✅ | 24.8M | -14% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 28.2M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 10.0M | 🟢 **-69%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 12.6M | -17% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.0M | ✅ | 13.4M | -4% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 24.2M | -18% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.5M | ✅ | 15.1M | 🟢 **-33%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.8M | ✅ | 17.5M | -16% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.6M | ✅ | 10.8M | 🔴 **+26%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.8M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.6M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.6M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 24.4M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.8M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.0M | ✅ | 45.8M | 🟢 **-52%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 26.2M | ✅ | 20.0M | 🟢 **-24%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.6M | ✅ | 22.5M | 🔴 **+21%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 42.7M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 68.0M | ✅ | 45.1M | 🟢 **-34%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.5M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 54.9M | ✅ | 33.7M | 🟢 **-39%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 54.4M | ✅ | 44.9M | -17% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 45.0M | -18% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 50.7M | 🟢 **-34%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.8M | ✅ | 44.9M | -18% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 31.2M | ❌ | - | - |
