# tjs vs jsen Benchmarks

Performance comparison of **tjs** vs **[jsen](https://github.com/bugventure/jsen)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | jsen pass | jsen ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 27.3M | 170/199 | 15.1M | 170 | 🟢 **-44%** |
| draft6 | 276 | ✅ 276 | 29.4M | 182/276 | 15.9M | 182 | 🟢 **-46%** |
| draft7 | 313 | ✅ 313 | 14.4M | 193/313 | 17.8M | 193 | 🔴 **+24%** |
| draft2019-09 | 435 | ✅ 435 | 18.7M | 227/435 | 18.5M | 227 | -1% |
| draft2020-12 | 448 | ✅ 448 | 19.6M | 213/448 | 18.2M | 213 | -7% |
| **Total** | 1671 | 1670/1671 | 19.6M | 985/1671 | 17.1M | 985 | -13% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.30x faster** (25 ns vs 59 ns per test, 3744 tests in 985 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 49.1M | 🔴 **+579%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 89.9M | ✅ | 61.8M | 🟢 **-31%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.6M | ✅ | 55.9M | 🟢 **-62%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 93.9M | ✅ | 71.7M | 🟢 **-24%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 64.7M | 🟢 **-48%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 45.9M | ✅ | 35.9M | 🟢 **-22%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 57.3M | ✅ | 41.6M | 🟢 **-27%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.8M | ✅ | 49.1M | 🟢 **-33%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 152.9M | ✅ | 68.9M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 39.9M | ✅ | 13.3M | 🟢 **-67%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.0M | ✅ | 17.4M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.1M | ✅ | 16.9M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 42.5M | ✅ | 31.2M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 81.0M | ✅ | 63.3M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.7M | ✅ | 28.0M | -17% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.5M | ✅ | 42.6M | -19% |
| allOf.json | allOf | 4 | ✅ | 47.8M | ✅ | 35.9M | 🟢 **-25%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.4M | ✅ | 27.3M | 0% |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 52.3M | 🟢 **-52%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 89.9M | ✅ | 74.3M | -17% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 74.5M | 🟢 **-51%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 76.9M | ✅ | 51.6M | 🟢 **-33%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 53.0M | 🟢 **-55%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 53.1M | 🟢 **-33%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 23.1M | 🟢 **-73%** |
| anyOf.json | anyOf | 4 | ✅ | 81.6M | ✅ | 15.1M | 🟢 **-81%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.4M | ✅ | 17.3M | 🟢 **-66%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.4M | ✅ | 17.1M | 🟢 **-66%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 162.0M | ✅ | 15.7M | 🟢 **-90%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 14.8M | 🟢 **-81%** |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 62.0M | 🟢 **-42%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 48.4M | -12% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.8M | ✅ | 44.6M | 🟢 **-42%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.8M | ✅ | 7.5M | 🟢 **-42%** |
| dependencies.json | dependencies | 7 | ✅ | 91.2M | ✅ | 55.1M | 🟢 **-40%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.2M | ✅ | 37.5M | +10% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.4M | ✅ | 40.1M | 🟢 **-31%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.6M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 47.2M | ✅ | 16.2M | 🟢 **-66%** |
| enum.json | simple enum validation | 2 | ✅ | 75.2M | ✅ | 35.2M | 🟢 **-53%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.6M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 17.6M | 🟢 **-76%** |
| enum.json | enums in properties | 6 | ✅ | 14.8M | ✅ | 18.5M | 🔴 **+26%** |
| enum.json | enum with escaped characters | 3 | ✅ | 61.1M | ✅ | 21.3M | 🟢 **-65%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.0M | ✅ | 33.1M | 🟢 **-71%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.0M | ✅ | 10.3M | 🟢 **-84%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 15.9M | 🟢 **-86%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.7M | ✅ | 10.7M | 🟢 **-83%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 108.7M | ✅ | 35.2M | 🟢 **-68%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.6M | ✅ | 10.8M | 🟢 **-84%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 106.3M | ✅ | 17.6M | 🟢 **-83%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 67.7M | ✅ | 10.6M | 🟢 **-84%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 26.8M | 🟢 **-71%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 25.5M | 🟢 **-56%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 26.1M | 🟢 **-72%** |
| format.json | email format | 6 | ✅ | 93.0M | ✅ | 59.6M | 🟢 **-36%** |
| format.json | ipv4 format | 6 | ✅ | 162.8M | ✅ | 68.8M | 🟢 **-58%** |
| format.json | ipv6 format | 6 | ✅ | 92.9M | ✅ | 68.5M | 🟢 **-26%** |
| format.json | hostname format | 6 | ✅ | 162.7M | ✅ | 66.0M | 🟢 **-59%** |
| format.json | date-time format | 6 | ✅ | 92.8M | ✅ | 68.4M | 🟢 **-26%** |
| format.json | uri format | 6 | ✅ | 162.1M | ✅ | 36.8M | 🟢 **-77%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.7M | ✅ | 33.5M | 🟢 **-25%** |
| items.json | a schema given for items | 4 | ✅ | 65.2M | ✅ | 49.4M | 🟢 **-24%** |
| items.json | an array of schemas for items | 6 | ✅ | 67.6M | ✅ | 55.0M | -19% |
| items.json | items and subitems | 6 | ✅ | 13.6M | ✅ | 22.6M | 🔴 **+66%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 8.9M | 🟢 **-27%** |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 62.3M | -17% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 64.9M | -20% |
| maxItems.json | maxItems validation | 4 | ✅ | 78.6M | ✅ | 53.7M | 🟢 **-32%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.3M | ✅ | 45.1M | 🟢 **-23%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.9M | ✅ | 46.7M | -19% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.1M | ✅ | 34.2M | 🟢 **-33%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 53.3M | 🟢 **-31%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ✅ | 54.6M | 🟢 **-28%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 75.4M | ✅ | 54.8M | 🟢 **-27%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ✅ | 41.9M | 🟢 **-40%** |
| minItems.json | minItems validation | 4 | ✅ | 78.9M | ✅ | 53.3M | 🟢 **-32%** |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 43.5M | 🟢 **-25%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.7M | ✅ | 45.5M | 🟢 **-24%** |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ✅ | 54.1M | 🟢 **-30%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.9M | ✅ | 53.2M | 🟢 **-31%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 70.4M | ✅ | 43.4M | 🟢 **-38%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.0M | ✅ | 55.0M | 🟢 **-24%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 52.0M | 🟢 **-33%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 6.1M | 🟢 **-92%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 3.9M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 4.5M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 73.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 16.6M | 🟢 **-78%** |
| not.json | not multiple types | 3 | ✅ | 71.2M | ✅ | 23.2M | 🟢 **-67%** |
| not.json | not more complex schema | 3 | ✅ | 60.6M | ✅ | 17.1M | 🟢 **-72%** |
| not.json | forbidden property | 2 | ✅ | 47.7M | ✅ | 26.0M | 🟢 **-46%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.3M | ✅ | 37.1M | 🟢 **-38%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 14.3M | 🟢 **-84%** |
| oneOf.json | oneOf | 4 | ✅ | 59.4M | ✅ | 16.6M | 🟢 **-72%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.9M | ✅ | 18.0M | 🟢 **-45%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ✅ | 17.9M | 🟢 **-60%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 19.7M | 🟢 **-74%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.2M | ✅ | 17.2M | 🟢 **-64%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.2M | ✅ | 18.5M | 🟢 **-63%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 71.8M | ✅ | 14.7M | 🟢 **-80%** |
| pattern.json | pattern validation | 8 | ✅ | 55.2M | ✅ | 45.8M | -17% |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 29.1M | +15% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.0M | ✅ | 19.7M | 🟢 **-24%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.8M | ✅ | 6.4M | 🟢 **-54%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.8M | ✅ | 13.6M | -8% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ✅ | 16.0M | -11% |
| properties.json | object properties validation | 6 | ✅ | 53.9M | ✅ | 46.9M | -13% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 13.5M | 🟢 **-32%** |
| properties.json | properties with escaped characters | 2 | ✅ | 50.6M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 48.8M | ✅ | 62.1M | 🔴 **+27%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.9M | ✅ | 16.5M | 🟢 **-36%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.6M | ✅ | 44.3M | -5% |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.0M | ✅ | 44.1M | 🟢 **-25%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.5M | ✅ | 39.9M | -16% |
| ref.json | nested refs | 2 | ✅ | 23.9M | ✅ | 50.9M | 🔴 **+113%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 52.2M | ✅ | 49.3M | -5% |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.2M | ✅ | 29.7M | 🔴 **+23%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.0M | ✅ | 46.0M | -6% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 49.3M | ✅ | 46.1M | -7% |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.7M | ✅ | 3.3M | 🟢 **-72%** |
| ref.json | refs with quote | 2 | ✅ | 46.3M | ✅ | 45.6M | -2% |
| ref.json | Location-independent identifier | 2 | ✅ | 69.4M | ✅ | 53.8M | 🟢 **-22%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 45.6M | ✅ | 53.3M | +17% |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 53.7M | ✅ | 6.6M | 🟢 **-88%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 44.8M | ✅ | 53.3M | +19% |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 53.3M | 🟢 **-31%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 61.0M | ✅ | 52.9M | -13% |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 60.5M | ✅ | 42.3M | 🟢 **-30%** |
| refRemote.json | remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 43.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 43.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.0M | ✅ | 54.0M | -17% |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 62.9M | 🟢 **-30%** |
| required.json | required with escaped characters | 2 | ✅ | 53.2M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 64.7M | ✅ | 28.9M | 🟢 **-55%** |
| type.json | number type matches numbers | 9 | ✅ | 69.4M | ✅ | 46.8M | 🟢 **-33%** |
| type.json | string type matches strings | 9 | ✅ | 69.4M | ✅ | 46.6M | 🟢 **-33%** |
| type.json | object type matches objects | 7 | ✅ | 58.8M | ✅ | 39.1M | 🟢 **-33%** |
| type.json | array type matches arrays | 7 | ✅ | 64.3M | ✅ | 39.7M | 🟢 **-38%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.3M | ✅ | 42.3M | 🟢 **-36%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 41.4M | 🟢 **-37%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.3M | ✅ | 40.9M | 🟢 **-37%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 51.1M | 🟢 **-34%** |
| type.json | type: array or object | 5 | ✅ | 72.4M | ✅ | 43.6M | 🟢 **-40%** |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 48.8M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ✅ | 2.0M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.5M | ✅ | 9.0M | 🟢 **-73%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 6.1M | 🟢 **-68%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.9M | ✅ | 65.7M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ✅ | 76.7M | +7% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 77.2M | ✅ | 51.4M | 🟢 **-33%** |
| optional/bignum.json | integer | 2 | ✅ | 88.1M | ✅ | 13.1M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 74.3M | -16% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 40.9M | 🟢 **-36%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 67.5M | -14% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 40.3M | 🟢 **-33%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 68.4M | -13% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 40.6M | 🟢 **-32%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.6M | ✅ | 24.0M | -16% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.2M | ✅ | 24.9M | -15% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 25.3M | -11% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 23.2M | -18% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 24.8M | -14% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 26.1M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.6M | ✅ | 25.4M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ✅ | 25.1M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 29.7M | +14% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.5M | ✅ | 10.4M | 🟢 **-66%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.4M | ✅ | 12.9M | 🟢 **-21%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 13.2M | -11% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.7M | ✅ | 24.2M | -6% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 14.0M | 🟢 **-31%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 17.2M | -15% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 11.5M | 🔴 **+44%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.2M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ✅ | 7.7M | 🟢 **-31%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.9M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 90.9M | ✅ | 60.4M | 🟢 **-34%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.0M | ✅ | 22.8M | 🔴 **+227%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 15.4M | ✅ | 19.2M | 🔴 **+25%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 151.4M | ✅ | 31.8M | 🟢 **-79%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 39.7M | ✅ | 54.5M | 🔴 **+38%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.3M | ✅ | 68.5M | 🟢 **-58%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 64.0M | 🟢 **-21%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 29.9M | ✅ | 33.8M | +13% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.8M | ✅ | 39.3M | -12% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 41.2M | 🟢 **-62%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 80.6M | ✅ | 67.0M | -17% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.6M | ✅ | 18.5M | 🟢 **-60%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.9M | ✅ | 18.2M | -17% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.4M | ✅ | 16.3M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.3M | ✅ | 30.2M | -9% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 59.5M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.6M | ✅ | 26.5M | +3% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 42.7M | 🟢 **-38%** |
| allOf.json | allOf | 4 | ✅ | 38.7M | ✅ | 34.9M | -10% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.9M | ✅ | 25.2M | -18% |
| allOf.json | allOf simple types | 2 | ✅ | 59.3M | ✅ | 31.7M | 🟢 **-47%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ✅ | 73.4M | 🟢 **-52%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.0M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.3M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 58.8M | 🟢 **-27%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 72.6M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 50.9M | 🟢 **-34%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 49.7M | 🟢 **-58%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 49.2M | 🟢 **-38%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.9M | ✅ | 23.0M | 🟢 **-73%** |
| anyOf.json | anyOf | 4 | ✅ | 70.9M | ✅ | 15.0M | 🟢 **-79%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 42.8M | ✅ | 18.3M | 🟢 **-57%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 17.8M | 🟢 **-80%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.9M | ✅ | 18.0M | 🟢 **-88%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 59.4M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ✅ | 14.5M | 🟢 **-80%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 64.2M | ✅ | 15.7M | 🟢 **-76%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 85.3M | ✅ | 14.5M | 🟢 **-83%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 75.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 76.6M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 78.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.5M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.7M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 110.7M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 60.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.2M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 61.5M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.9M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 99.9M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 32.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 62.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 90.5M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 60.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 61.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 48.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 50.9M | 🟢 **-34%** |
| default.json | invalid type for default | 2 | ✅ | 94.9M | ✅ | 61.4M | 🟢 **-35%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 48.4M | -12% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 74.3M | ✅ | 42.6M | 🟢 **-43%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.4M | ✅ | 55.4M | 🟢 **-39%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 65.4M | 🟢 **-32%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.7M | ✅ | 37.6M | -5% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.8M | ✅ | 40.4M | -14% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.5M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 14.7M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 45.2M | ✅ | 24.3M | 🟢 **-46%** |
| enum.json | simple enum validation | 2 | ✅ | 70.6M | ✅ | 40.7M | 🟢 **-42%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 2.8M | 🟢 **-95%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.4M | ✅ | 17.7M | 🟢 **-76%** |
| enum.json | enums in properties | 6 | ✅ | 16.3M | ✅ | 21.9M | 🔴 **+34%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.7M | ✅ | 23.6M | 🟢 **-71%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 111.7M | ✅ | 32.8M | 🟢 **-71%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ✅ | 10.2M | 🟢 **-85%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.2M | ✅ | 32.2M | 🟢 **-71%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.4M | ✅ | 10.9M | 🟢 **-84%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 36.0M | 🟢 **-69%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 11.0M | 🟢 **-84%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 34.4M | 🟢 **-69%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.4M | ✅ | 10.2M | 🟢 **-85%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 27.3M | 🟢 **-70%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 100.8M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 92.9M | ✅ | 58.3M | 🟢 **-37%** |
| format.json | ipv4 format | 6 | ✅ | 161.9M | ✅ | 66.8M | 🟢 **-59%** |
| format.json | ipv6 format | 6 | ✅ | 92.6M | ✅ | 65.9M | 🟢 **-29%** |
| format.json | hostname format | 6 | ✅ | 162.4M | ✅ | 66.6M | 🟢 **-59%** |
| format.json | date-time format | 6 | ✅ | 92.9M | ✅ | 66.8M | 🟢 **-28%** |
| format.json | json-pointer format | 6 | ✅ | 157.2M | ✅ | 69.4M | 🟢 **-56%** |
| format.json | uri format | 6 | ✅ | 93.0M | ✅ | 67.0M | 🟢 **-28%** |
| format.json | uri-reference format | 6 | ✅ | 159.6M | ✅ | 69.5M | 🟢 **-56%** |
| format.json | uri-template format | 6 | ✅ | 92.8M | ✅ | 69.2M | 🟢 **-25%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 58.1M | ✅ | 35.3M | 🟢 **-39%** |
| items.json | a schema given for items | 4 | ✅ | 54.4M | ✅ | 47.6M | -13% |
| items.json | an array of schemas for items | 6 | ✅ | 106.3M | ✅ | 54.1M | 🟢 **-49%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 69.9M | 🟢 **-26%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 64.4M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 27.8M | ✅ | 23.5M | -15% |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 9.1M | 🟢 **-26%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 61.7M | -18% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 64.1M | 🟢 **-21%** |
| maxItems.json | maxItems validation | 4 | ✅ | 78.8M | ✅ | 53.6M | 🟢 **-32%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 46.8M | 🟢 **-36%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.2M | ✅ | 46.4M | 🟢 **-22%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.3M | ✅ | 41.0M | 🟢 **-27%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 46.1M | 🟢 **-21%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 46.3M | ✅ | 33.7M | 🟢 **-27%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.8M | ✅ | 33.6M | 🟢 **-31%** |
| maximum.json | maximum validation | 4 | ✅ | 76.8M | ✅ | 54.7M | 🟢 **-29%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 53.9M | 🟢 **-29%** |
| minItems.json | minItems validation | 4 | ✅ | 78.8M | ✅ | 53.5M | 🟢 **-32%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 48.5M | 🟢 **-33%** |
| minLength.json | minLength validation | 5 | ✅ | 58.2M | ✅ | 41.9M | 🟢 **-28%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 40.7M | 🟢 **-28%** |
| minProperties.json | minProperties validation | 6 | ✅ | 58.2M | ✅ | 45.8M | 🟢 **-21%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.5M | ✅ | 35.3M | 🟢 **-29%** |
| minimum.json | minimum validation | 4 | ✅ | 78.9M | ✅ | 53.6M | 🟢 **-32%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 53.1M | 🟢 **-27%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 55.4M | 🟢 **-29%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 6.3M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 4.1M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 4.3M | 🟢 **-93%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.1M | ❌ | - | - |
| not.json | not | 2 | ✅ | 76.9M | ✅ | 17.5M | 🟢 **-77%** |
| not.json | not multiple types | 3 | ✅ | 70.6M | ✅ | 23.1M | 🟢 **-67%** |
| not.json | not more complex schema | 3 | ✅ | 68.8M | ✅ | 16.8M | 🟢 **-76%** |
| not.json | forbidden property | 2 | ✅ | 54.6M | ✅ | 46.3M | -15% |
| not.json | forbid everything with empty schema | 9 | ✅ | 64.7M | ✅ | 38.2M | 🟢 **-41%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 90.0M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.2M | ✅ | 56.9M | 🟢 **-37%** |
| not.json | double negation | 1 | ✅ | 89.9M | ✅ | 14.7M | 🟢 **-84%** |
| oneOf.json | oneOf | 4 | ✅ | 66.9M | ✅ | 16.6M | 🟢 **-75%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.8M | ✅ | 17.8M | 🟢 **-47%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.0M | ✅ | 42.2M | 🟢 **-36%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 39.3M | 🟢 **-40%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.0M | ✅ | 42.3M | 🟢 **-36%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.7M | ✅ | 17.8M | 🟢 **-60%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 19.9M | 🟢 **-74%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.4M | ✅ | 17.4M | 🟢 **-64%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.5M | ✅ | 16.4M | 🟢 **-67%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 14.2M | 🟢 **-81%** |
| pattern.json | pattern validation | 8 | ✅ | 55.5M | ✅ | 46.4M | -16% |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 29.0M | +15% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ✅ | 14.8M | 🟢 **-42%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.4M | ✅ | 8.0M | 🟢 **-48%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.0M | ✅ | 13.0M | -18% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.2M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 17.4M | -4% |
| properties.json | object properties validation | 6 | ✅ | 56.4M | ✅ | 47.1M | -16% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 8.3M | 🟢 **-58%** |
| properties.json | properties with boolean schema | 4 | ✅ | 48.9M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 52.4M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 45.8M | 🟢 **-35%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 50.0M | 🟢 **-47%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.2M | ✅ | 16.2M | 🟢 **-38%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.1M | ✅ | 46.7M | -14% |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.9M | ✅ | 41.8M | 🟢 **-29%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ✅ | 39.8M | -16% |
| ref.json | nested refs | 2 | ✅ | 38.8M | ✅ | 53.2M | 🔴 **+37%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 56.0M | ✅ | 50.7M | -10% |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.5M | ✅ | 45.7M | -15% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.1M | ✅ | 46.0M | -15% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.0M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.5M | ✅ | 47.3M | -10% |
| ref.json | Location-independent identifier | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 5.6M | 🟢 **-90%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.3M | ✅ | 45.0M | -14% |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.4M | ✅ | 46.0M | -14% |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.8M | ✅ | 46.1M | -6% |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.7M | ✅ | 46.9M | -6% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 52.5M | 🟢 **-32%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 50.6M | 🟢 **-34%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 53.1M | 🟢 **-24%** |
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
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 54.1M | -17% |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 63.0M | 🟢 **-30%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 62.9M | 🟢 **-30%** |
| required.json | required with escaped characters | 2 | ✅ | 52.8M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 67.1M | ✅ | 38.3M | 🟢 **-43%** |
| type.json | number type matches numbers | 9 | ✅ | 68.8M | ✅ | 44.4M | 🟢 **-35%** |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 47.0M | 🟢 **-32%** |
| type.json | object type matches objects | 7 | ✅ | 47.0M | ✅ | 39.4M | -16% |
| type.json | array type matches arrays | 7 | ✅ | 64.0M | ✅ | 40.5M | 🟢 **-37%** |
| type.json | boolean type matches booleans | 10 | ✅ | 54.9M | ✅ | 42.9M | 🟢 **-22%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 38.5M | 🟢 **-42%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.2M | ✅ | 41.6M | 🟢 **-37%** |
| type.json | type as array with one item | 2 | ✅ | 77.0M | ✅ | 52.4M | 🟢 **-32%** |
| type.json | type: array or object | 5 | ✅ | 72.2M | ✅ | 43.6M | 🟢 **-40%** |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 47.0M | 🟢 **-39%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.7M | ✅ | 2.1M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.3M | ✅ | 9.0M | 🟢 **-73%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ✅ | 6.3M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ✅ | 82.7M | -10% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.5M | ✅ | 59.3M | -17% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 65.8M | ✅ | 51.6M | 🟢 **-22%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 13.1M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 72.7M | -18% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 42.0M | 🟢 **-34%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 67.5M | -15% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 44.9M | 🟢 **-43%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.4M | ✅ | 24.9M | -12% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.3M | ✅ | 25.4M | 🔴 **+32%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 25.4M | -10% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.3M | ✅ | 24.8M | -15% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 24.9M | -13% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 17.0M | ✅ | 26.8M | 🔴 **+57%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.1M | ✅ | 25.4M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ✅ | 24.8M | -12% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 29.2M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 10.3M | 🟢 **-66%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.5M | ✅ | 12.7M | -18% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 13.7M | -12% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ✅ | 24.1M | -8% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.4M | ✅ | 14.0M | -20% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.9M | ✅ | 16.7M | -11% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 10.6M | 🔴 **+35%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ✅ | 7.3M | 🟢 **-34%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 91.2M | ✅ | 37.8M | 🟢 **-59%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.7M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 47.4M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 47.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.0M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.2M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 8.2M | ✅ | 6.3M | 🟢 **-23%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 30.5M | ✅ | 37.5M | 🔴 **+23%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.2M | ✅ | 61.5M | 🟢 **-60%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 27.3M | ✅ | 55.9M | 🔴 **+104%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ✅ | 71.3M | 🟢 **-57%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 56.2M | ✅ | 64.6M | +15% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.8M | ✅ | 35.8M | 🟢 **-35%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 32.9M | ✅ | 41.5M | 🔴 **+26%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 46.9M | 🟢 **-57%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 54.4M | ✅ | 66.6M | 🔴 **+22%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 43.4M | ✅ | 13.4M | 🟢 **-69%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 19.6M | ✅ | 17.6M | -10% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 25.6M | ✅ | 15.0M | 🟢 **-41%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.9M | ✅ | 31.0M | -11% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 60.3M | ✅ | 63.4M | +5% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.0M | ✅ | 27.6M | +11% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 39.1M | ✅ | 42.7M | +9% |
| allOf.json | allOf | 4 | ✅ | 45.6M | ✅ | 36.1M | 🟢 **-21%** |
| allOf.json | allOf with base schema | 5 | ✅ | 22.9M | ✅ | 27.0M | +18% |
| allOf.json | allOf simple types | 2 | ✅ | 109.8M | ✅ | 29.5M | 🟢 **-73%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 60.4M | ✅ | 73.9M | 🔴 **+22%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 48.0M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 152.6M | ✅ | 57.1M | 🟢 **-63%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 54.5M | ✅ | 74.1M | 🔴 **+36%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 107.9M | ✅ | 50.9M | 🟢 **-53%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 53.7M | ✅ | 51.4M | -4% |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 117.2M | ✅ | 52.0M | 🟢 **-56%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 45.5M | ✅ | 23.1M | 🟢 **-49%** |
| anyOf.json | anyOf | 4 | ✅ | 128.2M | ✅ | 15.0M | 🟢 **-88%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 30.2M | ✅ | 17.6M | 🟢 **-42%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 152.8M | ✅ | 16.6M | 🟢 **-89%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 54.2M | ✅ | 18.0M | 🟢 **-67%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 39.5M | ✅ | 14.8M | 🟢 **-62%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.5M | ✅ | 15.4M | 🟢 **-91%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 54.5M | ✅ | 14.5M | 🟢 **-73%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 170.0M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 44.5M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 98.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 33.8M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 83.9M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 54.4M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 113.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 51.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 96.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 47.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 95.2M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 46.8M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 94.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 47.2M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 110.6M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 48.0M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 91.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 43.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 47.3M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 91.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 51.2M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 107.1M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 33.6M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 101.1M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 54.3M | ✅ | 49.4M | -9% |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 61.1M | 🟢 **-43%** |
| default.json | invalid string value for default | 2 | ✅ | 41.9M | ✅ | 48.7M | +16% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.8M | ✅ | 44.4M | 🟢 **-42%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.3M | ✅ | 55.3M | 🟢 **-39%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 56.7M | ✅ | 67.0M | +18% |
| dependencies.json | multiple dependencies | 6 | ✅ | 36.6M | ✅ | 37.1M | +1% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 36.8M | ✅ | 40.0M | +9% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.2M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 9.9M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.1M | ✅ | 25.8M | 🟢 **-32%** |
| enum.json | simple enum validation | 2 | ✅ | 53.0M | ✅ | 40.4M | 🟢 **-24%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 2.8M | 🟢 **-95%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 44.9M | ✅ | 17.9M | 🟢 **-60%** |
| enum.json | enums in properties | 6 | ✅ | 15.8M | ✅ | 22.5M | 🔴 **+42%** |
| enum.json | enum with escaped characters | 3 | ✅ | 53.4M | ✅ | 23.8M | 🟢 **-55%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.6M | ✅ | 33.1M | 🟢 **-70%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 47.6M | ✅ | 10.3M | 🟢 **-78%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 32.8M | 🟢 **-71%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.6M | ✅ | 10.6M | 🟢 **-78%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 36.3M | 🟢 **-68%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 48.5M | ✅ | 10.2M | 🟢 **-79%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 36.6M | 🟢 **-67%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 41.0M | ✅ | 10.2M | 🟢 **-75%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 27.3M | 🟢 **-70%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 47.7M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.5M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 56.9M | ✅ | 45.3M | 🟢 **-20%** |
| format.json | idn-email format | 6 | ✅ | 163.0M | ✅ | 69.8M | 🟢 **-57%** |
| format.json | regex format | 6 | ✅ | 56.9M | ✅ | 71.3M | 🔴 **+25%** |
| format.json | ipv4 format | 6 | ✅ | 160.3M | ✅ | 68.5M | 🟢 **-57%** |
| format.json | ipv6 format | 6 | ✅ | 56.7M | ✅ | 68.5M | 🔴 **+21%** |
| format.json | idn-hostname format | 6 | ✅ | 162.6M | ✅ | 71.4M | 🟢 **-56%** |
| format.json | hostname format | 6 | ✅ | 56.9M | ✅ | 67.9M | +19% |
| format.json | date format | 6 | ✅ | 163.6M | ✅ | 71.3M | 🟢 **-56%** |
| format.json | date-time format | 6 | ✅ | 57.0M | ✅ | 68.5M | 🔴 **+20%** |
| format.json | time format | 6 | ✅ | 162.3M | ✅ | 71.7M | 🟢 **-56%** |
| format.json | json-pointer format | 6 | ✅ | 56.9M | ✅ | 69.4M | 🔴 **+22%** |
| format.json | relative-json-pointer format | 6 | ✅ | 162.7M | ✅ | 70.6M | 🟢 **-57%** |
| format.json | iri format | 6 | ✅ | 56.7M | ✅ | 71.7M | 🔴 **+26%** |
| format.json | iri-reference format | 6 | ✅ | 163.2M | ✅ | 71.6M | 🟢 **-56%** |
| format.json | uri format | 6 | ✅ | 56.6M | ✅ | 68.6M | 🔴 **+21%** |
| format.json | uri-reference format | 6 | ✅ | 159.0M | ✅ | 71.7M | 🟢 **-55%** |
| format.json | uri-template format | 6 | ✅ | 56.5M | ✅ | 71.6M | 🔴 **+27%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 164.5M | ✅ | 76.9M | 🟢 **-53%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 61.3M | ✅ | 76.2M | 🔴 **+24%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 151.9M | ✅ | 76.0M | 🟢 **-50%** |
| if-then-else.json | if and then without else | 3 | ✅ | 53.0M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 121.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 49.0M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 164.5M | ✅ | 61.8M | 🟢 **-62%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 53.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 113.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 34.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 56.7M | ✅ | 28.5M | 🟢 **-50%** |
| items.json | a schema given for items | 4 | ✅ | 41.5M | ✅ | 49.3M | +19% |
| items.json | an array of schemas for items | 6 | ✅ | 96.5M | ✅ | 54.2M | 🟢 **-44%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 61.3M | ✅ | 71.1M | +16% |
| items.json | items with boolean schema (false) | 2 | ✅ | 101.7M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 44.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.2M | ✅ | 23.3M | 🟢 **-20%** |
| items.json | nested items | 3 | ✅ | 11.7M | ✅ | 7.8M | 🟢 **-33%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 53.4M | ✅ | 59.6M | +11% |
| items.json | array-form items with null instance e... | 1 | ✅ | 56.1M | ✅ | 64.4M | +15% |
| maxItems.json | maxItems validation | 4 | ✅ | 51.3M | ✅ | 53.7M | +5% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 51.3M | ✅ | 47.4M | -8% |
| maxLength.json | maxLength validation | 5 | ✅ | 44.4M | ✅ | 46.5M | +5% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 43.0M | ✅ | 40.2M | -7% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 43.8M | ✅ | 46.6M | +6% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 38.5M | ✅ | 34.6M | -10% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 37.2M | ✅ | 35.2M | -5% |
| maximum.json | maximum validation | 4 | ✅ | 50.0M | ✅ | 54.4M | +9% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 49.7M | ✅ | 54.3M | +9% |
| minItems.json | minItems validation | 4 | ✅ | 50.4M | ✅ | 53.5M | +6% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 51.5M | ✅ | 42.5M | -18% |
| minLength.json | minLength validation | 5 | ✅ | 43.7M | ✅ | 42.1M | -4% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 42.3M | ✅ | 40.6M | -4% |
| minProperties.json | minProperties validation | 6 | ✅ | 45.0M | ✅ | 46.3M | +3% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 36.0M | ✅ | 34.8M | -3% |
| minimum.json | minimum validation | 4 | ✅ | 49.2M | ✅ | 53.8M | +9% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 51.5M | ✅ | 54.8M | +6% |
| multipleOf.json | by int | 3 | ✅ | 53.0M | ✅ | 51.6M | -3% |
| multipleOf.json | by number | 3 | ✅ | 50.7M | ✅ | 5.5M | 🟢 **-89%** |
| multipleOf.json | by small number | 2 | ✅ | 48.4M | ✅ | 4.0M | 🟢 **-92%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.5M | ✅ | 4.3M | 🟢 **-90%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 53.4M | ❌ | - | - |
| not.json | not | 2 | ✅ | 53.5M | ✅ | 17.2M | 🟢 **-68%** |
| not.json | not multiple types | 3 | ✅ | 49.6M | ✅ | 23.1M | 🟢 **-53%** |
| not.json | not more complex schema | 3 | ✅ | 48.3M | ✅ | 17.0M | 🟢 **-65%** |
| not.json | forbidden property | 2 | ✅ | 40.4M | ✅ | 45.8M | +13% |
| not.json | forbid everything with empty schema | 9 | ✅ | 44.2M | ✅ | 39.5M | -11% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 44.3M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 55.5M | ✅ | 58.4M | +5% |
| not.json | double negation | 1 | ✅ | 53.9M | ✅ | 10.9M | 🟢 **-80%** |
| oneOf.json | oneOf | 4 | ✅ | 46.0M | ✅ | 16.7M | 🟢 **-64%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 28.6M | ✅ | 17.5M | 🟢 **-39%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 48.1M | ✅ | 42.1M | -12% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 60.4M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 48.0M | ✅ | 39.1M | -19% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 48.0M | ✅ | 42.1M | -12% |
| oneOf.json | oneOf complex types | 4 | ✅ | 35.4M | ✅ | 17.7M | 🟢 **-50%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 53.3M | ✅ | 19.7M | 🟢 **-63%** |
| oneOf.json | oneOf with required | 4 | ✅ | 38.2M | ✅ | 16.9M | 🟢 **-56%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.5M | ✅ | 16.2M | 🟢 **-58%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 43.0M | ✅ | 14.4M | 🟢 **-67%** |
| pattern.json | pattern validation | 8 | ✅ | 42.7M | ✅ | 46.7M | +9% |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.9M | ✅ | 26.1M | 🔴 **+25%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.5M | ✅ | 18.0M | 🟢 **-24%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.1M | ✅ | 10.9M | 🟢 **-23%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.3M | ✅ | 13.9M | -3% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.3M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.5M | ✅ | 16.8M | +2% |
| properties.json | object properties validation | 6 | ✅ | 42.1M | ✅ | 46.6M | +11% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.7M | ✅ | 13.6M | 🟢 **-23%** |
| properties.json | properties with boolean schema | 4 | ✅ | 38.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 39.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 51.2M | ✅ | 45.1M | -12% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 29.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 17.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 60.6M | ✅ | 24.2M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 39.1M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 30.9M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 32.5M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 19.8M | ✅ | 16.8M | -15% |
| ref.json | relative pointer ref to object | 2 | ✅ | 37.9M | ✅ | 44.3M | +17% |
| ref.json | relative pointer ref to array | 2 | ✅ | 42.5M | ✅ | 38.6M | -9% |
| ref.json | escaped pointer ref | 6 | ✅ | 37.5M | ✅ | 40.0M | +7% |
| ref.json | nested refs | 2 | ✅ | 32.6M | ✅ | 50.4M | 🔴 **+55%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 40.4M | ✅ | 34.8M | -14% |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 38.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 21.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 40.3M | ✅ | 41.2M | +2% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 40.5M | ✅ | 40.9M | +1% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 60.4M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 47.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.0M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 40.1M | ✅ | 41.0M | +2% |
| ref.json | Location-independent identifier | 2 | ✅ | 40.2M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 39.7M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 39.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 41.0M | ✅ | 6.2M | 🟢 **-85%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 28.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 28.2M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 36.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.1M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 40.2M | ✅ | 43.6M | +8% |
| ref.json | URN base URI with NSS | 2 | ✅ | 40.2M | ✅ | 41.2M | +3% |
| ref.json | URN base URI with r-component | 2 | ✅ | 37.8M | ✅ | 21.4M | 🟢 **-43%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 35.0M | ✅ | 40.3M | +15% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 37.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 33.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 37.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 40.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 40.2M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 37.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 51.8M | ✅ | 51.4M | -1% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 53.9M | ✅ | 49.3M | -9% |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 49.4M | ✅ | 52.4M | +6% |
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
| required.json | required validation | 5 | ✅ | 47.5M | ✅ | 52.7M | +11% |
| required.json | required default validation | 1 | ✅ | 56.9M | ✅ | 63.0M | +11% |
| required.json | required with empty array | 1 | ✅ | 60.3M | ✅ | 62.5M | +4% |
| required.json | required with escaped characters | 2 | ✅ | 36.6M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 23.6M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 56.9M | ✅ | 29.1M | 🟢 **-49%** |
| type.json | number type matches numbers | 9 | ✅ | 46.7M | ✅ | 43.2M | -8% |
| type.json | string type matches strings | 9 | ✅ | 49.1M | ✅ | 42.1M | -14% |
| type.json | object type matches objects | 7 | ✅ | 43.9M | ✅ | 38.1M | -13% |
| type.json | array type matches arrays | 7 | ✅ | 46.6M | ✅ | 39.7M | -15% |
| type.json | boolean type matches booleans | 10 | ✅ | 46.3M | ✅ | 41.8M | -10% |
| type.json | null type matches only the null object | 10 | ✅ | 45.8M | ✅ | 38.6M | -16% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 47.5M | ✅ | 41.2M | -13% |
| type.json | type as array with one item | 2 | ✅ | 53.7M | ✅ | 49.4M | -8% |
| type.json | type: array or object | 5 | ✅ | 48.2M | ✅ | 43.3M | -10% |
| type.json | type: array, object or null | 5 | ✅ | 50.2M | ✅ | 47.0M | -6% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ✅ | 2.0M | 🟢 **-87%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.6M | ✅ | 6.3M | 🟢 **-78%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.1M | ✅ | 10.9M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 58.0M | ✅ | 66.6M | +15% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 51.3M | ✅ | 59.3M | +15% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 48.4M | ✅ | 51.3M | +6% |
| optional/bignum.json | integer | 2 | ✅ | 59.2M | ✅ | 13.0M | 🟢 **-78%** |
| optional/bignum.json | number | 2 | ✅ | 59.6M | ✅ | 73.6M | 🔴 **+23%** |
| optional/bignum.json | string | 1 | ✅ | 46.9M | ✅ | 41.3M | -12% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 55.9M | ✅ | 67.6M | 🔴 **+21%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.7M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 55.9M | ✅ | 47.1M | -16% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 44.4M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 349K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.0M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 429K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 22.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 21.0M | ✅ | 22.1M | +5% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.2M | ✅ | 25.1M | 🔴 **+38%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 22.5M | ✅ | 25.2M | +12% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.1M | ✅ | 25.2M | +9% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 24.6M | ✅ | 24.3M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 22.0M | ✅ | 26.6M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.3M | ✅ | 25.1M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 22.3M | ✅ | 25.2M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 22.9M | ✅ | 29.7M | 🔴 **+30%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.6M | ✅ | 23.4M | -9% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.1M | ✅ | 12.8M | -10% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.3M | ✅ | 13.1M | -2% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.5M | ✅ | 24.2M | -1% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 20.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.2M | ✅ | 14.5M | 🟢 **-20%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.0M | ✅ | 17.7M | +4% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 10.7M | 🔴 **+37%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 13.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 7.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.0M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.3M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 27.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 13.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 26.9M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 50.7M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 29.6M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 54.3M | ✅ | 42.9M | 🟢 **-21%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 14.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 29.2M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 44.4M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 44.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.2M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 11.7M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.7M | ✅ | 44.9M | 🔴 **+483%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.6M | ✅ | 37.8M | +0% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 60.6M | 🟢 **-60%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.9M | ✅ | 53.7M | 🟢 **-27%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ✅ | 69.9M | 🟢 **-58%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 77.0M | ✅ | 64.3M | -17% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 30.4M | ✅ | 36.1M | +19% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 20.6M | ✅ | 41.3M | 🔴 **+101%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.0M | ✅ | 47.8M | 🟢 **-55%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 76.8M | ✅ | 67.9M | -12% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.1M | ✅ | 13.9M | 🟢 **-67%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.4M | ✅ | 18.5M | -14% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.8M | ✅ | 17.4M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.6M | ✅ | 32.9M | +1% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 153.1M | ✅ | 63.1M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.5M | ✅ | 27.4M | 0% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ✅ | 43.0M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 21.7M | ✅ | 19.8M | -9% |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 17.3M | ✅ | 10.7M | 🟢 **-38%** |
| allOf.json | allOf | 4 | ✅ | 38.8M | ✅ | 34.0M | -12% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ✅ | 27.4M | -12% |
| allOf.json | allOf simple types | 2 | ✅ | 69.6M | ✅ | 50.5M | 🟢 **-27%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 78.0M | ✅ | 73.5M | -6% |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 63.3M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.2M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 85.1M | ✅ | 60.3M | 🟢 **-29%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.7M | ✅ | 71.7M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.5M | ✅ | 53.6M | 🟢 **-27%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.6M | ✅ | 51.2M | 🟢 **-56%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.6M | ✅ | 51.3M | 🟢 **-31%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.5M | ✅ | 24.0M | 🟢 **-71%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.3M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 49.8M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 75.9M | ✅ | 15.1M | 🟢 **-80%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.3M | ✅ | 18.0M | 🟢 **-49%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.1M | ✅ | 18.0M | 🟢 **-79%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.2M | ✅ | 18.0M | 🟢 **-79%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 49.3M | ✅ | 14.8M | 🟢 **-70%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.8M | ✅ | 15.7M | 🟢 **-80%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.8M | ✅ | 14.7M | 🟢 **-80%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 84.1M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 64.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 40.2M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 56.3M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 70.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 71.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.4M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 63.7M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 62.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 64.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.6M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 70.5M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 69.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 69.8M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 62.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.0M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 61.9M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 68.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 69.1M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 41.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 52.1M | 🟢 **-29%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 90.2M | ✅ | 70.8M | 🟢 **-22%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 89.9M | ✅ | 75.6M | -16% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 80.4M | ✅ | 68.9M | -14% |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 74.2M | ✅ | 71.0M | -4% |
| default.json | invalid type for default | 2 | ✅ | 67.7M | ✅ | 62.0M | -8% |
| default.json | invalid string value for default | 2 | ✅ | 53.2M | ✅ | 48.9M | -8% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.0M | ✅ | 44.6M | -13% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 61.2M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 90.3M | ✅ | 65.5M | 🟢 **-27%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 47.8M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 53.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.5M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.4M | ✅ | 32.6M | 🟢 **-54%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.4M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.2M | ✅ | 17.3M | 🟢 **-76%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 20.4M | 🔴 **+39%** |
| enum.json | enum with escaped characters | 3 | ✅ | 76.7M | ✅ | 24.2M | 🟢 **-68%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 71.9M | ✅ | 33.4M | 🟢 **-54%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.7M | ✅ | 10.3M | 🟢 **-84%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 72.0M | ✅ | 32.4M | 🟢 **-55%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.6M | ✅ | 10.7M | 🟢 **-83%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 71.3M | ✅ | 36.7M | 🟢 **-49%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ✅ | 11.4M | 🟢 **-83%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.2M | ✅ | 36.7M | 🟢 **-48%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 63.9M | ✅ | 10.4M | 🟢 **-84%** |
| enum.json | nul characters in strings | 2 | ✅ | 62.1M | ✅ | 27.4M | 🟢 **-56%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 79.2M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 89.6M | ✅ | 60.8M | 🟢 **-32%** |
| format.json | idn-email format | 6 | ✅ | 89.5M | ✅ | 70.9M | 🟢 **-21%** |
| format.json | regex format | 6 | ✅ | 72.5M | ✅ | 70.6M | -3% |
| format.json | ipv4 format | 6 | ✅ | 80.2M | ✅ | 64.4M | -20% |
| format.json | ipv6 format | 6 | ✅ | 72.6M | ✅ | 66.8M | -8% |
| format.json | idn-hostname format | 6 | ✅ | 79.9M | ✅ | 70.8M | -11% |
| format.json | hostname format | 6 | ✅ | 89.6M | ✅ | 67.3M | 🟢 **-25%** |
| format.json | date format | 6 | ✅ | 74.9M | ✅ | 71.7M | -4% |
| format.json | date-time format | 6 | ✅ | 72.7M | ✅ | 68.3M | -6% |
| format.json | time format | 6 | ✅ | 72.4M | ✅ | 71.4M | -1% |
| format.json | json-pointer format | 6 | ✅ | 72.7M | ✅ | 71.2M | -2% |
| format.json | relative-json-pointer format | 6 | ✅ | 72.7M | ✅ | 71.1M | -2% |
| format.json | iri format | 6 | ✅ | 72.7M | ✅ | 71.6M | -2% |
| format.json | iri-reference format | 6 | ✅ | 79.5M | ✅ | 71.1M | -11% |
| format.json | uri format | 6 | ✅ | 72.7M | ✅ | 64.4M | -11% |
| format.json | uri-reference format | 6 | ✅ | 72.6M | ✅ | 71.8M | -1% |
| format.json | uri-template format | 6 | ✅ | 80.2M | ✅ | 71.1M | -11% |
| format.json | uuid format | 6 | ✅ | 80.4M | ✅ | 71.7M | -11% |
| format.json | duration format | 6 | ✅ | 74.0M | ✅ | 71.7M | -3% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.6M | ✅ | 76.9M | -3% |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.5M | ✅ | 74.9M | -6% |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.7M | ✅ | 75.8M | -5% |
| if-then-else.json | if and then without else | 3 | ✅ | 73.8M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 72.8M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.5M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.5M | ✅ | 61.3M | 🟢 **-23%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.6M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.0M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.4M | ✅ | 28.5M | 🟢 **-34%** |
| items.json | a schema given for items | 4 | ✅ | 52.4M | ✅ | 44.1M | -16% |
| items.json | an array of schemas for items | 6 | ✅ | 65.4M | ✅ | 54.3M | -17% |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.5M | ✅ | 69.4M | 🟢 **-22%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.7M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 59.6M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 27.3M | ✅ | 23.4M | -14% |
| items.json | nested items | 3 | ✅ | 7.7M | ✅ | 8.9M | +16% |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 61.0M | -15% |
| items.json | array-form items with null instance e... | 1 | ✅ | 77.0M | ✅ | 64.5M | -16% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.6M | ✅ | 59.3M | 🟢 **-33%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.5M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.4M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 57.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 74.9M | ✅ | 39.7M | 🟢 **-47%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.4M | ✅ | 43.0M | 🟢 **-38%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.9M | ✅ | 46.1M | 🟢 **-23%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.2M | ✅ | 38.1M | 🟢 **-30%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.4M | ✅ | 47.2M | -16% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.4M | ✅ | 32.0M | 🟢 **-32%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.9M | ✅ | 35.4M | 🟢 **-29%** |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ✅ | 54.7M | 🟢 **-25%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 71.7M | ✅ | 54.8M | 🟢 **-24%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.5M | ✅ | 77.1M | -13% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.9M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.5M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 56.8M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 56.5M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 88.6M | ✅ | 59.7M | 🟢 **-33%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 68.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 74.9M | ✅ | 40.2M | 🟢 **-46%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.4M | ✅ | 47.3M | 🟢 **-32%** |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ✅ | 43.7M | 🟢 **-22%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 55.0M | ✅ | 41.0M | 🟢 **-25%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.5M | ✅ | 47.1M | -18% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.5M | ✅ | 33.2M | 🟢 **-33%** |
| minimum.json | minimum validation | 4 | ✅ | 73.2M | ✅ | 54.1M | 🟢 **-26%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 55.0M | 🟢 **-20%** |
| multipleOf.json | by int | 3 | ✅ | 73.8M | ✅ | 42.0M | 🟢 **-43%** |
| multipleOf.json | by number | 3 | ✅ | 35.1M | ✅ | 6.3M | 🟢 **-82%** |
| multipleOf.json | by small number | 2 | ✅ | 63.7M | ✅ | 4.1M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 4.3M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 72.0M | ✅ | 17.1M | 🟢 **-76%** |
| not.json | not multiple types | 3 | ✅ | 67.7M | ✅ | 23.5M | 🟢 **-65%** |
| not.json | not more complex schema | 3 | ✅ | 65.5M | ✅ | 17.5M | 🟢 **-73%** |
| not.json | forbidden property | 2 | ✅ | 49.7M | ✅ | 46.2M | -7% |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.0M | ✅ | 38.9M | 🟢 **-36%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.7M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 83.8M | ✅ | 64.8M | 🟢 **-23%** |
| not.json | double negation | 1 | ✅ | 85.1M | ✅ | 14.0M | 🟢 **-84%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.4M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 60.7M | ✅ | 16.2M | 🟢 **-73%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.6M | ✅ | 18.1M | 🟢 **-44%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 57.4M | ✅ | 42.8M | 🟢 **-26%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 40.0M | 🟢 **-37%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.3M | ✅ | 42.6M | 🟢 **-33%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.4M | ✅ | 18.0M | 🟢 **-58%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 71.1M | ✅ | 20.4M | 🟢 **-71%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.4M | ✅ | 17.3M | 🟢 **-63%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.7M | ✅ | 16.7M | 🟢 **-65%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.1M | ✅ | 14.6M | 🟢 **-80%** |
| pattern.json | pattern validation | 8 | ✅ | 50.0M | ✅ | 46.7M | -6% |
| pattern.json | pattern is not anchored | 1 | ✅ | 13.8M | ✅ | 22.9M | 🔴 **+66%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.6M | ✅ | 18.9M | 🟢 **-29%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.2M | ✅ | 8.9M | 🟢 **-37%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 13.1M | -17% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.9M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.9M | ✅ | 17.3M | +3% |
| properties.json | object properties validation | 6 | ✅ | 54.3M | ✅ | 44.5M | -18% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 8.3M | 🟢 **-58%** |
| properties.json | properties with boolean schema | 4 | ✅ | 48.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 66.5M | ✅ | 45.7M | 🟢 **-31%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.6M | ✅ | 49.3M | 🟢 **-44%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.7M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.2M | ✅ | 7.6M | 🔴 **+141%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ✅ | 15.9M | 🟢 **-34%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.7M | ✅ | 40.6M | 🟢 **-23%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.8M | ✅ | 41.5M | 🟢 **-27%** |
| ref.json | escaped pointer ref | 6 | ✅ | 46.0M | ✅ | 40.4M | -12% |
| ref.json | nested refs | 2 | ✅ | 38.3M | ✅ | 51.9M | 🔴 **+36%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.5M | ✅ | 35.5M | 🟢 **-32%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.6M | ✅ | 46.0M | +3% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.0M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 44.3M | ✅ | 46.8M | +6% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.0M | ✅ | 5.8M | 🟢 **-89%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.0M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.4M | ✅ | 46.1M | -12% |
| ref.json | URN base URI with NSS | 2 | ✅ | 52.1M | ✅ | 45.7M | -12% |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.2M | ✅ | 45.7M | -3% |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.3M | ✅ | 46.2M | -6% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 39.5M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 52.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 53.3M | 🟢 **-27%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 51.7M | 🟢 **-30%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.1M | ✅ | 51.6M | 🟢 **-29%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ❌ | - | - |
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
| required.json | required validation | 5 | ✅ | 62.1M | ✅ | 54.7M | -12% |
| required.json | required default validation | 1 | ✅ | 85.1M | ✅ | 55.3M | 🟢 **-35%** |
| required.json | required with empty array | 1 | ✅ | 85.1M | ✅ | 62.2M | 🟢 **-27%** |
| required.json | required with escaped characters | 2 | ✅ | 49.8M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.3M | ✅ | 40.4M | 🟢 **-36%** |
| type.json | number type matches numbers | 9 | ✅ | 66.0M | ✅ | 45.6M | 🟢 **-31%** |
| type.json | string type matches strings | 9 | ✅ | 65.3M | ✅ | 46.9M | 🟢 **-28%** |
| type.json | object type matches objects | 7 | ✅ | 56.1M | ✅ | 39.5M | 🟢 **-30%** |
| type.json | array type matches arrays | 7 | ✅ | 61.2M | ✅ | 40.2M | 🟢 **-34%** |
| type.json | boolean type matches booleans | 10 | ✅ | 62.2M | ✅ | 41.9M | 🟢 **-33%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.2M | ✅ | 39.0M | 🟢 **-37%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.3M | ✅ | 41.5M | 🟢 **-34%** |
| type.json | type as array with one item | 2 | ✅ | 73.1M | ✅ | 51.7M | 🟢 **-29%** |
| type.json | type: array or object | 5 | ✅ | 68.6M | ✅ | 43.1M | 🟢 **-37%** |
| type.json | type: array, object or null | 5 | ✅ | 73.5M | ✅ | 48.9M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.9M | ✅ | 77.0M | -2% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 57.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.5M | ✅ | 43.1M | 🟢 **-36%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 54.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 75.3M | ✅ | 46.8M | 🟢 **-38%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 40.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 35.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 77.8M | ✅ | 46.6M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.3M | ✅ | 46.2M | 🔴 **+117%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 58.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 48.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 45.1M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.7M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 70.1M | ✅ | 47.5M | 🟢 **-32%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 72.0M | ✅ | 73.4M | +2% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 55.7M | ✅ | 68.4M | 🔴 **+23%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 66.2M | ✅ | 44.5M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.3M | ✅ | 37.9M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 33.1M | ✅ | 60.1M | 🔴 **+82%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 35.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 31.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.7M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.3M | ✅ | 42.5M | 🔴 **+36%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.2M | ✅ | 58.5M | 🔴 **+94%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.0M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.3M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 45.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 17.9M | ✅ | 10.4M | 🟢 **-42%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 72.7M | ✅ | 47.8M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 50.9M | ✅ | 73.3M | 🔴 **+44%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.8M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ✅ | 2.0M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.9M | ✅ | 6.2M | 🟢 **-81%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ✅ | 6.0M | 🟢 **-69%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.3M | ✅ | 66.6M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.4M | ✅ | 60.2M | -12% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.4M | ✅ | 51.7M | -18% |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 51.2M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.0M | ✅ | 37.7M | 🟢 **-48%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 62.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 13.0M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 82.2M | ✅ | 73.7M | -10% |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 41.5M | 🟢 **-32%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 67.6M | -10% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 48.3M | 🟢 **-36%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.7M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.4M | ✅ | 41.6M | 🟢 **-32%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.3M | ✅ | 65.6M | 🟢 **-27%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.7M | ✅ | 37.7M | +12% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 53.7M | ✅ | 47.0M | -13% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 57.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 13.5M | ✅ | 21.1M | 🔴 **+56%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ✅ | 25.0M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.7M | ✅ | 25.3M | -9% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 25.1M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.1M | ✅ | 24.8M | -12% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 26.6M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.0M | ✅ | 25.3M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.6M | ✅ | 25.2M | -9% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.8M | ✅ | 27.9M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.8M | ✅ | 10.5M | 🟢 **-65%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ✅ | 13.7M | -8% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.4M | ✅ | 13.7M | -11% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.8M | ✅ | 24.4M | -12% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.1M | ✅ | 14.4M | 🟢 **-29%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ✅ | 17.7M | -11% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 11.2M | 🔴 **+42%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.2M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.9M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.6M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 69.0M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 39.9M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.6M | ✅ | 45.7M | 🟢 **-45%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.4M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.1M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 61.8M | ✅ | 36.0M | 🟢 **-42%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 53.1M | ✅ | 34.3M | 🟢 **-35%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 53.2M | ✅ | 44.1M | -17% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.1M | ✅ | 43.1M | -17% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 72.9M | ✅ | 51.6M | 🟢 **-29%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 50.3M | ✅ | 45.0M | -10% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.7M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 60.8M | ✅ | 15.4M | 🟢 **-75%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 12.2M | ✅ | 18.3M | 🔴 **+51%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 22.9M | ✅ | 17.6M | 🟢 **-23%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.2M | ✅ | 31.3M | -6% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 139.5M | ✅ | 63.3M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.6M | ✅ | 28.1M | +19% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 67.8M | ✅ | 42.7M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 26.2M | ✅ | 20.0M | 🟢 **-24%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 29.4M | ✅ | 19.1M | 🟢 **-35%** |
| allOf.json | allOf | 4 | ✅ | 36.5M | ✅ | 36.2M | -1% |
| allOf.json | allOf with base schema | 5 | ✅ | 26.7M | ✅ | 27.5M | +3% |
| allOf.json | allOf simple types | 2 | ✅ | 61.7M | ✅ | 51.1M | -17% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 139.6M | ✅ | 74.4M | 🟢 **-47%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 62.4M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 88.1M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 77.3M | ✅ | 63.3M | -18% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 138.6M | ✅ | 73.7M | 🟢 **-47%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.7M | ✅ | 53.4M | 🟢 **-28%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 100.8M | ✅ | 51.5M | 🟢 **-49%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 73.4M | ✅ | 54.0M | 🟢 **-26%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 79.2M | ✅ | 24.0M | 🟢 **-70%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 65.6M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 43.1M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.0M | ✅ | 15.0M | 🟢 **-77%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.0M | ✅ | 17.7M | 🟢 **-50%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 83.9M | ✅ | 18.0M | 🟢 **-79%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 84.7M | ✅ | 18.0M | 🟢 **-79%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 62.4M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 45.3M | ✅ | 14.4M | 🟢 **-68%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 67.7M | ✅ | 15.4M | 🟢 **-77%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.0M | ✅ | 14.5M | 🟢 **-80%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 71.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 57.9M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 63.6M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 30.5M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 55.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.6M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 70.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 70.5M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 49.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 58.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 64.1M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 62.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.7M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 62.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 61.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 61.4M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 50.7M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.2M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 60.8M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 67.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 68.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 41.0M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 66.8M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 76.1M | ✅ | 52.4M | 🟢 **-31%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 73.8M | ✅ | 75.8M | +3% |
| content.json | validation of binary string-encoding | 3 | ✅ | 90.0M | ✅ | 77.2M | -14% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 77.7M | ✅ | 74.3M | -4% |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 73.9M | ✅ | 72.6M | -2% |
| default.json | invalid type for default | 2 | ✅ | 69.1M | ✅ | 61.5M | -11% |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ✅ | 48.2M | -12% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 53.7M | ✅ | 44.3M | -18% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.4M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.2M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 89.8M | ✅ | 62.9M | 🟢 **-30%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.0M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 45.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 50.8M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 50.3M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 38.4M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 12.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.2M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 12.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 15.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 11.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.3M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.3M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.6M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 25.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 7.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.6M | ✅ | 31.4M | 🟢 **-56%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.5M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 73.5M | ✅ | 16.9M | 🟢 **-77%** |
| enum.json | enums in properties | 6 | ✅ | 14.3M | ✅ | 21.5M | 🔴 **+50%** |
| enum.json | enum with escaped characters | 3 | ✅ | 75.7M | ✅ | 24.1M | 🟢 **-68%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 70.6M | ✅ | 32.6M | 🟢 **-54%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.7M | ✅ | 7.6M | 🟢 **-88%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 70.9M | ✅ | 32.4M | 🟢 **-54%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 60.2M | ✅ | 10.7M | 🟢 **-82%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.0M | ✅ | 35.6M | 🟢 **-52%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.4M | ✅ | 10.9M | 🟢 **-84%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.8M | ✅ | 33.7M | 🟢 **-54%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 64.1M | ✅ | 10.7M | 🟢 **-83%** |
| enum.json | nul characters in strings | 2 | ✅ | 58.3M | ✅ | 26.8M | 🟢 **-54%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 67.6M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 67.7M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 82.2M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 88.3M | ✅ | 47.8M | 🟢 **-46%** |
| format.json | regex format | 7 | ✅ | 73.4M | ✅ | 70.1M | -4% |
| format.json | ipv4 format | 7 | ✅ | 73.2M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 73.2M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 73.5M | ✅ | 48.2M | 🟢 **-34%** |
| format.json | hostname format | 7 | ✅ | 73.1M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 73.3M | ✅ | 48.0M | 🟢 **-35%** |
| format.json | date-time format | 7 | ✅ | 73.1M | ✅ | 37.3M | 🟢 **-49%** |
| format.json | time format | 7 | ✅ | 73.4M | ✅ | 72.4M | -1% |
| format.json | json-pointer format | 7 | ✅ | 73.2M | ✅ | 70.9M | -3% |
| format.json | relative-json-pointer format | 7 | ✅ | 73.3M | ✅ | 69.4M | -5% |
| format.json | iri format | 7 | ✅ | 72.6M | ✅ | 72.6M | 0% |
| format.json | iri-reference format | 7 | ✅ | 71.7M | ✅ | 72.4M | +1% |
| format.json | uri format | 7 | ✅ | 73.4M | ✅ | 47.9M | 🟢 **-35%** |
| format.json | uri-reference format | 7 | ✅ | 73.4M | ✅ | 65.9M | -10% |
| format.json | uri-template format | 7 | ✅ | 72.6M | ✅ | 70.8M | -3% |
| format.json | uuid format | 7 | ✅ | 71.9M | ✅ | 72.6M | +1% |
| format.json | duration format | 7 | ✅ | 72.9M | ✅ | 70.3M | -4% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.0M | ✅ | 76.7M | -3% |
| if-then-else.json | ignore then without if | 2 | ✅ | 88.4M | ✅ | 76.0M | -14% |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.8M | ✅ | 76.7M | -4% |
| if-then-else.json | if and then without else | 3 | ✅ | 74.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 74.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.4M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.8M | ✅ | 62.2M | 🟢 **-22%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.0M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.0M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ✅ | 26.4M | 🟢 **-32%** |
| items.json | a schema given for items | 4 | ✅ | 52.3M | ✅ | 48.4M | -7% |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.4M | ✅ | 69.4M | 🟢 **-22%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 67.6M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 11.8M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 4.7M | 🟢 **-61%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 76.6M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.1M | ✅ | 18.9M | 🟢 **-59%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 43.3M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 70.4M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 74.3M | ✅ | 44.8M | 🟢 **-40%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.5M | ✅ | 76.8M | -13% |
| maxContains.json | maxContains with contains | 5 | ✅ | 56.3M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.7M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 58.3M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 74.7M | ✅ | 39.4M | 🟢 **-47%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 70.4M | ✅ | 47.2M | 🟢 **-33%** |
| maxLength.json | maxLength validation | 5 | ✅ | 56.7M | ✅ | 45.4M | -20% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.5M | ✅ | 41.0M | 🟢 **-25%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.2M | ✅ | 46.0M | -15% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.5M | ✅ | 31.8M | 🟢 **-33%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.8M | ✅ | 17.6M | 🟢 **-64%** |
| maximum.json | maximum validation | 4 | ✅ | 73.7M | ✅ | 54.6M | 🟢 **-26%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 73.2M | ✅ | 54.4M | 🟢 **-26%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.5M | ✅ | 77.0M | -13% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 58.4M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 58.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 33.9M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 87.7M | ✅ | 54.3M | 🟢 **-38%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 70.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 74.5M | ✅ | 39.5M | 🟢 **-47%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 70.4M | ✅ | 49.1M | 🟢 **-30%** |
| minLength.json | minLength validation | 5 | ✅ | 51.1M | ✅ | 30.7M | 🟢 **-40%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.0M | ✅ | 38.0M | 🟢 **-30%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.2M | ✅ | 44.9M | 🟢 **-22%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.8M | ✅ | 17.2M | 🟢 **-66%** |
| minimum.json | minimum validation | 4 | ✅ | 66.2M | ✅ | 52.1M | 🟢 **-21%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.5M | ✅ | 55.5M | 🟢 **-20%** |
| multipleOf.json | by int | 3 | ✅ | 75.1M | ✅ | 55.6M | 🟢 **-26%** |
| multipleOf.json | by number | 3 | ✅ | 72.4M | ✅ | 6.4M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 66.5M | ✅ | 4.0M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.6M | ✅ | 4.5M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 72.5M | ❌ | - | - |
| not.json | not | 2 | ✅ | 72.5M | ✅ | 16.3M | 🟢 **-78%** |
| not.json | not multiple types | 3 | ✅ | 68.1M | ✅ | 23.1M | 🟢 **-66%** |
| not.json | not more complex schema | 3 | ✅ | 66.3M | ✅ | 17.3M | 🟢 **-74%** |
| not.json | forbidden property | 2 | ✅ | 51.9M | ✅ | 46.5M | -11% |
| not.json | forbid everything with empty schema | 9 | ✅ | 58.7M | ✅ | 37.8M | 🟢 **-36%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 58.7M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 83.2M | ✅ | 63.0M | 🟢 **-24%** |
| not.json | double negation | 1 | ✅ | 84.7M | ✅ | 14.0M | 🟢 **-84%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 64.2M | ✅ | 15.1M | 🟢 **-77%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.6M | ✅ | 17.0M | 🟢 **-46%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 62.1M | ✅ | 42.7M | 🟢 **-31%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 83.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 62.6M | ✅ | 39.6M | 🟢 **-37%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 62.5M | ✅ | 42.4M | 🟢 **-32%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.5M | ✅ | 18.0M | 🟢 **-56%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.0M | ✅ | 20.4M | 🟢 **-72%** |
| oneOf.json | oneOf with required | 4 | ✅ | 50.0M | ✅ | 17.5M | 🟢 **-65%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.0M | ✅ | 16.6M | 🟢 **-63%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.2M | ✅ | 14.2M | 🟢 **-80%** |
| pattern.json | pattern validation | 8 | ✅ | 53.9M | ✅ | 43.3M | -20% |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.2M | ✅ | 28.6M | +14% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.9M | ✅ | 18.8M | 🟢 **-27%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.3M | ✅ | 6.8M | 🟢 **-55%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.7M | ✅ | 13.1M | 🟢 **-22%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.5M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ✅ | 17.3M | -4% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 62.4M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 54.6M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 77.9M | ✅ | 63.2M | -19% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 78.1M | ✅ | 74.3M | -5% |
| properties.json | object properties validation | 6 | ✅ | 50.8M | ✅ | 46.9M | -8% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.7M | ✅ | 8.2M | 🟢 **-58%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 48.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ✅ | 45.7M | 🟢 **-32%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.4M | ✅ | 50.4M | 🟢 **-43%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.0M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.4M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.8M | ✅ | 16.6M | 🟢 **-30%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.9M | ✅ | 44.8M | -15% |
| ref.json | relative pointer ref to array | 2 | ✅ | 55.7M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 43.5M | ✅ | 33.0M | 🟢 **-24%** |
| ref.json | nested refs | 2 | ✅ | 37.7M | ✅ | 51.9M | 🔴 **+38%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.1M | ✅ | 34.1M | 🟢 **-34%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.8M | ✅ | 45.4M | -14% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 84.8M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 62.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.6M | ✅ | 45.7M | -13% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.5M | ✅ | 6.0M | 🟢 **-89%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.3M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 71.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 37.6M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.1M | ✅ | 46.1M | -12% |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.6M | ✅ | 46.0M | -9% |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.3M | ✅ | 45.5M | -8% |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.6M | ✅ | 46.2M | -3% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 45.4M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.7M | ✅ | 46.7M | 🟢 **-37%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.8M | ✅ | 52.8M | 🟢 **-28%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.4M | ✅ | 53.8M | 🟢 **-20%** |
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
| required.json | required validation | 5 | ✅ | 60.3M | ✅ | 54.7M | -9% |
| required.json | required default validation | 1 | ✅ | 84.8M | ✅ | 63.3M | 🟢 **-25%** |
| required.json | required with empty array | 1 | ✅ | 84.7M | ✅ | 63.2M | 🟢 **-25%** |
| required.json | required with escaped characters | 2 | ✅ | 48.6M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 61.8M | ✅ | 38.8M | 🟢 **-37%** |
| type.json | number type matches numbers | 9 | ✅ | 80.8M | ✅ | 46.9M | 🟢 **-42%** |
| type.json | string type matches strings | 9 | ✅ | 63.6M | ✅ | 47.5M | 🟢 **-25%** |
| type.json | object type matches objects | 7 | ✅ | 46.3M | ✅ | 39.5M | -15% |
| type.json | array type matches arrays | 7 | ✅ | 58.8M | ✅ | 40.1M | 🟢 **-32%** |
| type.json | boolean type matches booleans | 10 | ✅ | 61.5M | ✅ | 43.0M | 🟢 **-30%** |
| type.json | null type matches only the null object | 10 | ✅ | 61.2M | ✅ | 40.9M | 🟢 **-33%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 59.7M | ✅ | 41.4M | 🟢 **-31%** |
| type.json | type as array with one item | 2 | ✅ | 73.4M | ✅ | 51.4M | 🟢 **-30%** |
| type.json | type: array or object | 5 | ✅ | 66.3M | ✅ | 43.9M | 🟢 **-34%** |
| type.json | type: array, object or null | 5 | ✅ | 65.5M | ✅ | 48.8M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 74.5M | ✅ | 75.9M | +2% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 56.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 68.6M | ✅ | 43.2M | 🟢 **-37%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 52.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 75.6M | ✅ | 42.4M | 🟢 **-44%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.4M | ✅ | 44.1M | -3% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 50.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 79.1M | ✅ | 49.2M | 🟢 **-38%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.5M | ✅ | 76.6M | 🔴 **+294%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 39.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 48.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 45.1M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 18.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 83.8M | ✅ | 48.1M | 🟢 **-43%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 74.3M | ✅ | 74.5M | +0% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.4M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 40.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 57.9M | ✅ | 71.1M | 🔴 **+23%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 85.2M | ✅ | 47.2M | 🟢 **-45%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.7M | ✅ | 19.9M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 27.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 65.9M | ✅ | 43.8M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.1M | ✅ | 62.5M | 🔴 **+122%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 16.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 27.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.2M | ✅ | 42.6M | 🔴 **+41%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.9M | ✅ | 62.6M | 🔴 **+103%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.9M | ✅ | 10.5M | 🟢 **-47%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.7M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 58.5M | ✅ | 47.8M | -18% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.8M | ✅ | 74.5M | 🔴 **+44%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.0M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ✅ | 2.0M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.9M | ✅ | 9.5M | 🟢 **-70%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 50.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.0M | ✅ | 54.1M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.7M | ✅ | 67.4M | -2% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.3M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 54.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.8M | ✅ | 47.2M | 🟢 **-36%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 62.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 13.0M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 85.8M | ✅ | 74.1M | -14% |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 42.0M | 🟢 **-31%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.3M | ✅ | 68.1M | -13% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 58.5M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.1M | ✅ | 48.2M | 🟢 **-38%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 58.4M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 80.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 60.6M | ✅ | 41.9M | 🟢 **-31%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 89.5M | ✅ | 66.6M | 🟢 **-26%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.6M | ✅ | 37.8M | +16% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 51.0M | ✅ | 47.1M | -8% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 56.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 34.9M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.6M | ✅ | 25.0M | -12% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.2M | ✅ | 25.3M | -13% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 20.8M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.2M | ✅ | 25.4M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.1M | ✅ | 24.7M | -12% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.2M | ✅ | 27.0M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.1M | ✅ | 25.2M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.9M | ✅ | 25.2M | -2% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.0M | ✅ | 28.5M | +6% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.6M | ✅ | 10.6M | 🟢 **-64%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.9M | ✅ | 13.6M | -14% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ✅ | 13.1M | -13% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ✅ | 24.4M | -12% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ✅ | 14.1M | 🟢 **-32%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 17.7M | -11% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 9.6M | ✅ | 10.6M | +10% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 10.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.4M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.7M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.4M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 48.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 12.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.9M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.8M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 4.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.4M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 61.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.7M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 7.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 81.9M | ✅ | 45.1M | 🟢 **-45%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.5M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.8M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.9M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.0M | ✅ | 20.3M | -19% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.2M | ✅ | 22.4M | -11% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.8M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 63.4M | ✅ | 45.1M | 🟢 **-29%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 53.2M | ✅ | 35.6M | 🟢 **-33%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 53.0M | ✅ | 44.7M | -16% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.9M | ✅ | 45.2M | -15% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 73.4M | ✅ | 51.6M | 🟢 **-30%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.0M | ✅ | 44.9M | -14% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.0M | ❌ | - | - |
