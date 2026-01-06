# tjs vs jsen Benchmarks

Performance comparison of **tjs** vs **[jsen](https://github.com/bugventure/jsen)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | jsen pass | jsen ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.4M | 170/199 | 15.2M | 170 | 🟢 **-43%** |
| draft6 | 276 | ✅ 276 | 28.7M | 182/276 | 15.8M | 182 | 🟢 **-45%** |
| draft7 | 313 | ✅ 313 | 15.6M | 193/313 | 17.3M | 193 | +11% |
| draft2019-09 | 435 | ✅ 435 | 18.6M | 227/435 | 16.9M | 227 | -9% |
| draft2020-12 | 448 | ✅ 448 | 18.8M | 213/448 | 18.2M | 213 | -4% |
| **Total** | 1671 | 1670/1671 | 19.7M | 985/1671 | 16.7M | 985 | -15% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.40x faster** (25 ns vs 60 ns per test, 3744 tests in 985 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.5M | ✅ | 28.5M | 🔴 **+283%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 85.1M | ✅ | 58.0M | 🟢 **-32%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 144.6M | ✅ | 42.1M | 🟢 **-71%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 88.3M | ✅ | 71.5M | -19% |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 53.6M | 🟢 **-57%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 44.4M | ✅ | 35.1M | 🟢 **-21%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.3M | ✅ | 38.8M | 🟢 **-33%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 69.6M | ✅ | 42.9M | 🟢 **-38%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 151.9M | ✅ | 68.7M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 38.7M | ✅ | 14.0M | 🟢 **-64%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.0M | ✅ | 18.4M | -17% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 34.9M | ✅ | 17.2M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 43.9M | ✅ | 31.0M | 🟢 **-29%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 77.1M | ✅ | 62.6M | -19% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 32.5M | ✅ | 24.5M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 50.9M | ✅ | 42.9M | -16% |
| allOf.json | allOf | 4 | ✅ | 46.8M | ✅ | 36.4M | 🟢 **-22%** |
| allOf.json | allOf with base schema | 5 | ✅ | 26.8M | ✅ | 27.0M | +1% |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 51.9M | 🟢 **-53%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 85.2M | ✅ | 54.0M | 🟢 **-37%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.9M | ✅ | 74.6M | 🟢 **-51%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.4M | ✅ | 46.8M | 🟢 **-36%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.5M | ✅ | 51.1M | 🟢 **-56%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.5M | ✅ | 35.7M | 🟢 **-52%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 22.7M | 🟢 **-73%** |
| anyOf.json | anyOf | 4 | ✅ | 76.0M | ✅ | 15.1M | 🟢 **-80%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.1M | ✅ | 16.1M | 🟢 **-64%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.0M | ✅ | 16.7M | 🟢 **-65%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 163.7M | ✅ | 15.1M | 🟢 **-91%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.6M | ✅ | 14.7M | 🟢 **-80%** |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 61.7M | 🟢 **-43%** |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ✅ | 48.4M | -8% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.2M | ✅ | 45.2M | 🟢 **-41%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ✅ | 6.9M | 🟢 **-44%** |
| dependencies.json | dependencies | 7 | ✅ | 90.8M | ✅ | 55.8M | 🟢 **-39%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.2M | ✅ | 37.7M | +13% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 31.7M | ✅ | 40.5M | 🔴 **+28%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.5M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 45.7M | ✅ | 29.0M | 🟢 **-37%** |
| enum.json | simple enum validation | 2 | ✅ | 71.9M | ✅ | 35.8M | 🟢 **-50%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.6M | ✅ | 3.5M | 🟢 **-94%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.1M | ✅ | 18.2M | 🟢 **-74%** |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 17.8M | +20% |
| enum.json | enum with escaped characters | 3 | ✅ | 57.4M | ✅ | 21.7M | 🟢 **-62%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 106.5M | ✅ | 32.0M | 🟢 **-70%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.6M | ✅ | 10.9M | 🟢 **-82%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 57.8M | ✅ | 33.0M | 🟢 **-43%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 31.7M | ✅ | 10.7M | 🟢 **-66%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.3M | ✅ | 34.9M | 🟢 **-69%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.5M | ✅ | 10.9M | 🟢 **-83%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 104.7M | ✅ | 36.7M | 🟢 **-65%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 63.3M | ✅ | 9.5M | 🟢 **-85%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 27.4M | 🟢 **-70%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ✅ | 25.1M | 🟢 **-55%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 24.1M | 🟢 **-74%** |
| format.json | email format | 6 | ✅ | 79.6M | ✅ | 68.5M | -14% |
| format.json | ipv4 format | 6 | ✅ | 162.5M | ✅ | 68.4M | 🟢 **-58%** |
| format.json | ipv6 format | 6 | ✅ | 79.4M | ✅ | 68.7M | -14% |
| format.json | hostname format | 6 | ✅ | 134.1M | ✅ | 68.3M | 🟢 **-49%** |
| format.json | date-time format | 6 | ✅ | 82.8M | ✅ | 68.4M | -17% |
| format.json | uri format | 6 | ✅ | 133.5M | ✅ | 68.9M | 🟢 **-48%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.3M | ✅ | 35.6M | -7% |
| items.json | a schema given for items | 4 | ✅ | 68.4M | ✅ | 49.1M | 🟢 **-28%** |
| items.json | an array of schemas for items | 6 | ✅ | 33.4M | ✅ | 54.5M | 🔴 **+63%** |
| items.json | items and subitems | 6 | ✅ | 13.4M | ✅ | 25.2M | 🔴 **+88%** |
| items.json | nested items | 3 | ✅ | 11.8M | ✅ | 8.8M | 🟢 **-25%** |
| items.json | items with null instance elements | 1 | ✅ | 72.0M | ✅ | 62.1M | -14% |
| items.json | array-form items with null instance e... | 1 | ✅ | 76.9M | ✅ | 65.0M | -15% |
| maxItems.json | maxItems validation | 4 | ✅ | 74.5M | ✅ | 53.4M | 🟢 **-28%** |
| maxLength.json | maxLength validation | 5 | ✅ | 56.1M | ✅ | 47.0M | -16% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.1M | ✅ | 46.7M | -15% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.1M | ✅ | 35.2M | -18% |
| maximum.json | maximum validation | 4 | ✅ | 66.4M | ✅ | 54.6M | -18% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ✅ | 54.6M | -17% |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 72.6M | ✅ | 53.5M | 🟢 **-26%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 67.4M | ✅ | 49.9M | 🟢 **-26%** |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ✅ | 53.7M | 🟢 **-27%** |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ✅ | 41.9M | 🟢 **-26%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.3M | ✅ | 46.1M | -20% |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ✅ | 53.8M | 🟢 **-23%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 70.8M | ✅ | 54.3M | 🟢 **-23%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 63.2M | ✅ | 49.5M | 🟢 **-22%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 55.6M | -19% |
| multipleOf.json | by int | 3 | ✅ | 74.0M | ✅ | 56.0M | 🟢 **-24%** |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 6.4M | 🟢 **-90%** |
| multipleOf.json | by small number | 2 | ✅ | 64.0M | ✅ | 4.1M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 4.3M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 73.4M | ✅ | 15.2M | 🟢 **-79%** |
| not.json | not multiple types | 3 | ✅ | 67.9M | ✅ | 22.3M | 🟢 **-67%** |
| not.json | not more complex schema | 3 | ✅ | 65.9M | ✅ | 16.6M | 🟢 **-75%** |
| not.json | forbidden property | 2 | ✅ | 49.5M | ✅ | 39.1M | 🟢 **-21%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.3M | ✅ | 36.6M | 🟢 **-39%** |
| not.json | double negation | 1 | ✅ | 85.2M | ✅ | 13.9M | 🟢 **-84%** |
| oneOf.json | oneOf | 4 | ✅ | 74.3M | ✅ | 16.7M | 🟢 **-78%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.3M | ✅ | 16.5M | 🟢 **-51%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.4M | ✅ | 18.2M | 🟢 **-58%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.4M | ✅ | 19.5M | 🟢 **-73%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.7M | ✅ | 17.2M | 🟢 **-63%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 57.4M | ✅ | 18.1M | 🟢 **-69%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 67.9M | ✅ | 14.5M | 🟢 **-79%** |
| pattern.json | pattern validation | 8 | ✅ | 54.0M | ✅ | 46.9M | -13% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.8M | ✅ | 28.6M | +15% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 19.4M | 🟢 **-24%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.9M | ✅ | 6.3M | 🟢 **-55%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.0M | ✅ | 13.4M | -5% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 16.6M | -7% |
| properties.json | object properties validation | 6 | ✅ | 53.0M | ✅ | 46.8M | -12% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ✅ | 7.7M | 🟢 **-60%** |
| properties.json | properties with escaped characters | 2 | ✅ | 48.8M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ✅ | 61.8M | -8% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.3M | ✅ | 16.1M | 🟢 **-36%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 51.3M | ✅ | 44.4M | -13% |
| ref.json | relative pointer ref to array | 2 | ✅ | 55.6M | ✅ | 43.9M | 🟢 **-21%** |
| ref.json | escaped pointer ref | 6 | ✅ | 45.5M | ✅ | 39.6M | -13% |
| ref.json | nested refs | 2 | ✅ | 38.2M | ✅ | 53.4M | 🔴 **+40%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 52.9M | ✅ | 50.3M | -5% |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 73.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.5M | ✅ | 27.3M | +11% |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.1M | ✅ | 45.5M | -13% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.2M | ✅ | 46.9M | -7% |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.0M | ✅ | 5.3M | 🟢 **-52%** |
| ref.json | refs with quote | 2 | ✅ | 50.5M | ✅ | 45.6M | -10% |
| ref.json | Location-independent identifier | 2 | ✅ | 73.2M | ✅ | 51.0M | 🟢 **-30%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 49.0M | ✅ | 52.0M | +6% |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 54.5M | ✅ | 6.6M | 🟢 **-88%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 48.8M | ✅ | 51.1M | +5% |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 73.2M | ✅ | 51.8M | 🟢 **-29%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 73.4M | ✅ | 51.8M | 🟢 **-29%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.3M | ✅ | 52.6M | 🟢 **-22%** |
| refRemote.json | remote ref | 2 | ✅ | 49.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 26.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.4M | ✅ | 54.7M | -12% |
| required.json | required default validation | 1 | ✅ | 85.2M | ✅ | 63.2M | 🟢 **-26%** |
| required.json | required with escaped characters | 2 | ✅ | 49.9M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 26.0M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 60.7M | ✅ | 29.0M | 🟢 **-52%** |
| type.json | number type matches numbers | 9 | ✅ | 65.8M | ✅ | 46.9M | 🟢 **-29%** |
| type.json | string type matches strings | 9 | ✅ | 65.8M | ✅ | 47.0M | 🟢 **-29%** |
| type.json | object type matches objects | 7 | ✅ | 56.9M | ✅ | 38.7M | 🟢 **-32%** |
| type.json | array type matches arrays | 7 | ✅ | 61.2M | ✅ | 39.7M | 🟢 **-35%** |
| type.json | boolean type matches booleans | 10 | ✅ | 63.1M | ✅ | 41.8M | 🟢 **-34%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.9M | ✅ | 38.7M | 🟢 **-38%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.6M | ✅ | 41.1M | 🟢 **-35%** |
| type.json | type as array with one item | 2 | ✅ | 71.4M | ✅ | 50.7M | 🟢 **-29%** |
| type.json | type: array or object | 5 | ✅ | 69.0M | ✅ | 40.1M | 🟢 **-42%** |
| type.json | type: array, object or null | 5 | ✅ | 73.4M | ✅ | 47.5M | 🟢 **-35%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.7M | ✅ | 2.1M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.7M | ✅ | 9.0M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ✅ | 6.1M | 🟢 **-68%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 86.1M | ✅ | 66.9M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.5M | ✅ | 60.6M | -12% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.3M | ✅ | 51.8M | 🟢 **-25%** |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 13.1M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 84.0M | ✅ | 74.3M | -12% |
| optional/bignum.json | string | 1 | ✅ | 60.9M | ✅ | 42.1M | 🟢 **-31%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 68.2M | -9% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ✅ | 40.7M | 🟢 **-30%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 68.3M | -9% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ✅ | 41.1M | 🟢 **-29%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.8M | ✅ | 25.1M | -10% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.8M | ✅ | 25.1M | -13% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 25.2M | -10% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 33.8M | ✅ | 24.0M | 🟢 **-29%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.0M | ✅ | 24.7M | -12% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 23.3M | ✅ | 26.6M | +14% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.9M | ✅ | 25.4M | -9% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.7M | ✅ | 24.9M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.2M | ✅ | 30.0M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.5M | ✅ | 9.7M | 🟢 **-67%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ✅ | 12.8M | -14% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ✅ | 13.3M | -12% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.7M | ✅ | 24.3M | -12% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 13.7M | 🟢 **-32%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.1M | ✅ | 17.8M | -2% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.6M | ✅ | 11.3M | 🔴 **+49%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.6M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ✅ | 7.4M | 🟢 **-33%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.6M | ✅ | 47.8M | 🟢 **-40%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.2M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.0M | ✅ | 14.1M | 🔴 **+102%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 37.5M | +1% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 61.8M | 🟢 **-60%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 36.3M | ✅ | 55.0M | 🔴 **+52%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.3M | ✅ | 70.4M | 🟢 **-57%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.3M | ✅ | 64.5M | -12% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.0M | ✅ | 35.9M | 🟢 **-35%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.7M | ✅ | 42.0M | -2% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 106.5M | ✅ | 47.3M | 🟢 **-56%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ✅ | 68.5M | -7% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.7M | ✅ | 13.8M | 🟢 **-70%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.5M | ✅ | 18.6M | -14% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.9M | ✅ | 17.6M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.4M | ✅ | 31.3M | -9% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 63.2M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.3M | ✅ | 27.8M | -1% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 42.7M | 🟢 **-38%** |
| allOf.json | allOf | 4 | ✅ | 38.3M | ✅ | 36.5M | -5% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.1M | ✅ | 27.3M | -12% |
| allOf.json | allOf simple types | 2 | ✅ | 66.6M | ✅ | 46.1M | 🟢 **-31%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.1M | ✅ | 74.3M | 🟢 **-51%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.5M | ✅ | 59.7M | -19% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.2M | ✅ | 74.2M | 🟢 **-52%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 70.0M | ✅ | 52.4M | 🟢 **-25%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 52.8M | 🟢 **-55%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.8M | ✅ | 50.9M | 🟢 **-28%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 23.3M | 🟢 **-72%** |
| anyOf.json | anyOf | 4 | ✅ | 71.6M | ✅ | 15.0M | 🟢 **-79%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 44.7M | ✅ | 18.2M | 🟢 **-59%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.7M | ✅ | 17.7M | 🟢 **-78%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.9M | ✅ | 18.0M | 🟢 **-88%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.7M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 77.5M | ✅ | 14.7M | 🟢 **-81%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 83.4M | ✅ | 15.5M | 🟢 **-81%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 14.6M | 🟢 **-88%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 71.1M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 88.9M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 74.3M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 53.7M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 68.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 59.2M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.8M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 56.7M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 106.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 106.8M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 59.7M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.7M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 98.8M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 65.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 44.6M | 🟢 **-37%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 61.7M | 🟢 **-43%** |
| default.json | invalid string value for default | 2 | ✅ | 51.4M | ✅ | 48.7M | -5% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.5M | ✅ | 44.2M | 🟢 **-44%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.2M | ✅ | 55.0M | 🟢 **-40%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 84.7M | ✅ | 67.6M | 🟢 **-20%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.3M | ✅ | 37.2M | -5% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 44.7M | ✅ | 40.2M | -10% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.1M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.3M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 46.3M | ✅ | 26.0M | 🟢 **-44%** |
| enum.json | simple enum validation | 2 | ✅ | 68.6M | ✅ | 37.9M | 🟢 **-45%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 2.6M | 🟢 **-96%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.1M | ✅ | 15.1M | 🟢 **-78%** |
| enum.json | enums in properties | 6 | ✅ | 15.3M | ✅ | 19.9M | 🔴 **+30%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.3M | ✅ | 23.6M | 🟢 **-67%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 109.2M | ✅ | 33.3M | 🟢 **-70%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.0M | ✅ | 9.7M | 🟢 **-84%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 108.9M | ✅ | 31.7M | 🟢 **-71%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.1M | ✅ | 9.8M | 🟢 **-84%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 108.7M | ✅ | 34.6M | 🟢 **-68%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 62.1M | ✅ | 9.8M | 🟢 **-84%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 36.7M | 🟢 **-67%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 55.3M | ✅ | 10.1M | 🟢 **-82%** |
| enum.json | nul characters in strings | 2 | ✅ | 89.9M | ✅ | 27.2M | 🟢 **-70%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 65.2M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.0M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 78.9M | ✅ | 45.3M | 🟢 **-43%** |
| format.json | ipv4 format | 6 | ✅ | 161.2M | ✅ | 68.4M | 🟢 **-58%** |
| format.json | ipv6 format | 6 | ✅ | 80.3M | ✅ | 68.1M | -15% |
| format.json | hostname format | 6 | ✅ | 162.4M | ✅ | 68.4M | 🟢 **-58%** |
| format.json | date-time format | 6 | ✅ | 78.0M | ✅ | 65.8M | -16% |
| format.json | json-pointer format | 6 | ✅ | 156.4M | ✅ | 71.7M | 🟢 **-54%** |
| format.json | uri format | 6 | ✅ | 75.5M | ✅ | 68.7M | -9% |
| format.json | uri-reference format | 6 | ✅ | 162.0M | ✅ | 71.6M | 🟢 **-56%** |
| format.json | uri-template format | 6 | ✅ | 80.9M | ✅ | 71.7M | -11% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.7M | ✅ | 33.5M | 🟢 **-42%** |
| items.json | a schema given for items | 4 | ✅ | 50.4M | ✅ | 48.3M | -4% |
| items.json | an array of schemas for items | 6 | ✅ | 95.8M | ✅ | 54.3M | 🟢 **-43%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 78.2M | ✅ | 71.4M | -9% |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 60.0M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.2M | ✅ | 23.4M | -17% |
| items.json | nested items | 3 | ✅ | 11.4M | ✅ | 9.0M | 🟢 **-21%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 62.2M | -10% |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.3M | ✅ | 82.2M | +12% |
| maxItems.json | maxItems validation | 4 | ✅ | 67.4M | ✅ | 53.4M | 🟢 **-21%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 48.5M | 🟢 **-27%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.1M | ✅ | 46.7M | -15% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.1M | ✅ | 40.5M | 🟢 **-24%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 46.3M | -15% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.5M | ✅ | 33.7M | -19% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.7M | ✅ | 35.7M | 🟢 **-25%** |
| maximum.json | maximum validation | 4 | ✅ | 69.8M | ✅ | 54.6M | 🟢 **-22%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 69.1M | ✅ | 54.3M | 🟢 **-21%** |
| minItems.json | minItems validation | 4 | ✅ | 71.3M | ✅ | 53.5M | 🟢 **-25%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.3M | ✅ | 42.5M | 🟢 **-36%** |
| minLength.json | minLength validation | 5 | ✅ | 53.3M | ✅ | 44.1M | -17% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.9M | ✅ | 39.9M | 🟢 **-25%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.8M | ✅ | 46.7M | -16% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.2M | ✅ | 34.9M | 🟢 **-26%** |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ✅ | 53.8M | 🟢 **-23%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ✅ | 55.1M | -17% |
| multipleOf.json | by int | 3 | ✅ | 70.4M | ✅ | 54.8M | 🟢 **-22%** |
| multipleOf.json | by number | 3 | ✅ | 67.0M | ✅ | 6.5M | 🟢 **-90%** |
| multipleOf.json | by small number | 2 | ✅ | 56.3M | ✅ | 4.0M | 🟢 **-93%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 4.2M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ❌ | - | - |
| not.json | not | 2 | ✅ | 70.0M | ✅ | 17.2M | 🟢 **-75%** |
| not.json | not multiple types | 3 | ✅ | 64.1M | ✅ | 23.0M | 🟢 **-64%** |
| not.json | not more complex schema | 3 | ✅ | 55.4M | ✅ | 17.1M | 🟢 **-69%** |
| not.json | forbidden property | 2 | ✅ | 48.8M | ✅ | 45.6M | -6% |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.7M | ✅ | 36.0M | 🟢 **-38%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.8M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 79.9M | ✅ | 57.7M | 🟢 **-28%** |
| not.json | double negation | 1 | ✅ | 80.7M | ✅ | 15.3M | 🟢 **-81%** |
| oneOf.json | oneOf | 4 | ✅ | 61.5M | ✅ | 16.6M | 🟢 **-73%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.6M | ✅ | 17.2M | 🟢 **-47%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.5M | ✅ | 41.9M | 🟢 **-31%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.7M | ✅ | 39.3M | 🟢 **-35%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.5M | ✅ | 41.9M | 🟢 **-31%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.2M | ✅ | 18.0M | 🟢 **-57%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.0M | ✅ | 20.2M | 🟢 **-71%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.8M | ✅ | 17.4M | 🟢 **-62%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 44.1M | ✅ | 16.5M | 🟢 **-63%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.2M | ✅ | 14.6M | 🟢 **-79%** |
| pattern.json | pattern validation | 8 | ✅ | 51.9M | ✅ | 46.7M | -10% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.4M | ✅ | 27.9M | +14% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.5M | ✅ | 19.2M | 🟢 **-27%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.9M | ✅ | 8.3M | 🟢 **-44%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.8M | ✅ | 12.2M | -18% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.9M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 15.5M | -13% |
| properties.json | object properties validation | 6 | ✅ | 51.1M | ✅ | 45.7M | -11% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ✅ | 7.7M | 🟢 **-60%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 47.5M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 63.5M | ✅ | 45.1M | 🟢 **-29%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.4M | ✅ | 50.4M | 🟢 **-40%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 47.6M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.6M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ✅ | 15.6M | 🟢 **-37%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 50.5M | ✅ | 44.9M | -11% |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.5M | ✅ | 44.7M | -15% |
| ref.json | escaped pointer ref | 6 | ✅ | 44.2M | ✅ | 40.1M | -9% |
| ref.json | nested refs | 2 | ✅ | 37.1M | ✅ | 52.7M | 🔴 **+42%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 53.4M | ✅ | 50.2M | -6% |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.6M | ✅ | 47.0M | -7% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 49.7M | ✅ | 45.7M | -8% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.7M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 51.0M | ✅ | 45.7M | -10% |
| ref.json | Location-independent identifier | 2 | ✅ | 47.5M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 47.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 52.9M | ✅ | 6.1M | 🟢 **-89%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 30.8M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.0M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 49.9M | ✅ | 44.4M | -11% |
| ref.json | URN base URI with NSS | 2 | ✅ | 49.7M | ✅ | 45.3M | -9% |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.2M | ✅ | 46.7M | +1% |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.0M | ✅ | 45.5M | -3% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.5M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 40.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 51.9M | 🟢 **-26%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 81.7M | ✅ | 52.9M | 🟢 **-35%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 52.2M | ✅ | 51.6M | -1% |
| refRemote.json | remote ref | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 45.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 37.2M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 37.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 60.1M | ✅ | 54.4M | -10% |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 63.0M | 🟢 **-22%** |
| required.json | required with empty array | 1 | ✅ | 80.4M | ✅ | 63.2M | 🟢 **-21%** |
| required.json | required with escaped characters | 2 | ✅ | 48.4M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 26.7M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 60.0M | ✅ | 38.5M | 🟢 **-36%** |
| type.json | number type matches numbers | 9 | ✅ | 62.0M | ✅ | 44.7M | 🟢 **-28%** |
| type.json | string type matches strings | 9 | ✅ | 61.4M | ✅ | 47.3M | 🟢 **-23%** |
| type.json | object type matches objects | 7 | ✅ | 54.7M | ✅ | 38.9M | 🟢 **-29%** |
| type.json | array type matches arrays | 7 | ✅ | 57.8M | ✅ | 40.1M | 🟢 **-31%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.4M | ✅ | 42.6M | 🟢 **-28%** |
| type.json | null type matches only the null object | 10 | ✅ | 59.2M | ✅ | 36.8M | 🟢 **-38%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.0M | ✅ | 41.4M | 🟢 **-31%** |
| type.json | type as array with one item | 2 | ✅ | 69.3M | ✅ | 47.6M | 🟢 **-31%** |
| type.json | type: array or object | 5 | ✅ | 61.5M | ✅ | 41.4M | 🟢 **-33%** |
| type.json | type: array, object or null | 5 | ✅ | 67.8M | ✅ | 48.3M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.5M | ✅ | 2.0M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ✅ | 6.4M | 🟢 **-80%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.0M | ✅ | 6.0M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.2M | ✅ | 83.2M | +8% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.1M | ✅ | 61.0M | -8% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.6M | ✅ | 51.3M | -17% |
| optional/bignum.json | integer | 2 | ✅ | 79.2M | ✅ | 13.0M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 79.8M | ✅ | 74.0M | -7% |
| optional/bignum.json | string | 1 | ✅ | 57.9M | ✅ | 41.5M | 🟢 **-28%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 68.0M | -5% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 47.5M | 🟢 **-34%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 26.7M | ✅ | 21.8M | -18% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.7M | ✅ | 24.3M | 🔴 **+23%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.7M | ✅ | 23.7M | -11% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.2M | ✅ | 25.1M | -8% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.7M | ✅ | 24.6M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.6M | ✅ | 26.9M | +5% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.5M | ✅ | 25.3M | -8% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.4M | ✅ | 24.9M | -9% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.4M | ✅ | 29.8M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 34.9M | ✅ | 23.0M | 🟢 **-34%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 19.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ✅ | 12.2M | -17% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.2M | ✅ | 13.6M | -11% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.3M | ✅ | 23.7M | -13% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 14.1M | 🟢 **-30%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.5M | ✅ | 17.8M | -4% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 11.1M | 🔴 **+40%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ✅ | 7.3M | 🟢 **-34%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 78.8M | ✅ | 54.7M | 🟢 **-31%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.1M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 44.8M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 45.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.5M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.6M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 6.5M | -10% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.7M | ✅ | 37.6M | -3% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 149.2M | ✅ | 61.9M | 🟢 **-59%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.8M | ✅ | 56.1M | 🟢 **-23%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ✅ | 54.4M | 🟢 **-67%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 64.4M | 🟢 **-20%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.2M | ✅ | 35.6M | 🟢 **-35%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.6M | ✅ | 35.4M | 🟢 **-21%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 48.5M | 🟢 **-55%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 68.7M | -15% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.0M | ✅ | 14.0M | 🟢 **-69%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.2M | ✅ | 18.1M | -19% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.4M | ✅ | 17.5M | 🟢 **-58%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.9M | ✅ | 31.2M | -13% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 63.0M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.2M | ✅ | 28.0M | -1% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 42.9M | 🟢 **-38%** |
| allOf.json | allOf | 4 | ✅ | 39.7M | ✅ | 36.1M | -9% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.6M | ✅ | 27.6M | -10% |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 52.5M | 🟢 **-28%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.0M | ✅ | 74.7M | 🟢 **-51%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 60.4M | 🟢 **-25%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.7M | ✅ | 74.3M | 🟢 **-51%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 50.8M | 🟢 **-34%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 51.4M | 🟢 **-56%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 51.1M | 🟢 **-35%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 23.8M | 🟢 **-72%** |
| anyOf.json | anyOf | 4 | ✅ | 81.5M | ✅ | 15.1M | 🟢 **-81%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.1M | ✅ | 17.9M | 🟢 **-60%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 89.9M | ✅ | 17.9M | 🟢 **-80%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.6M | ✅ | 17.7M | 🟢 **-88%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ✅ | 16.5M | 🟢 **-77%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ✅ | 15.3M | 🟢 **-82%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 14.0M | 🟢 **-88%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.3M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 84.9M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 51.1M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 112.0M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.4M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 65.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.2M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 109.0M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.9M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.7M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 99.5M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.2M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 86.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.6M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.2M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 124.2M | ✅ | 44.2M | 🟢 **-64%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 61.6M | -14% |
| default.json | invalid string value for default | 2 | ✅ | 74.5M | ✅ | 46.2M | 🟢 **-38%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 54.9M | ✅ | 43.2M | 🟢 **-21%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.6M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 62.8M | ✅ | 55.4M | -12% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 64.5M | 🟢 **-33%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.6M | ✅ | 31.3M | -7% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.6M | ✅ | 32.4M | 🟢 **-30%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 56.6M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.0M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.6M | ✅ | 15.7M | 🟢 **-59%** |
| enum.json | simple enum validation | 2 | ✅ | 60.4M | ✅ | 34.9M | 🟢 **-42%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.7M | ✅ | 3.0M | 🟢 **-94%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.2M | ✅ | 18.2M | 🟢 **-72%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 22.7M | 🔴 **+55%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.2M | ✅ | 23.8M | 🟢 **-70%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 60.0M | ✅ | 32.1M | 🟢 **-47%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.3M | ✅ | 7.8M | 🟢 **-88%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.6M | ✅ | 32.8M | 🟢 **-57%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.8M | ✅ | 9.6M | 🟢 **-84%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.5M | ✅ | 36.2M | 🟢 **-51%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 10.3M | 🟢 **-85%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.3M | ✅ | 36.3M | 🟢 **-48%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 66.5M | ✅ | 10.7M | 🟢 **-84%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 13.6M | 🟢 **-79%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 67.5M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.7M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 78.1M | ✅ | 45.6M | 🟢 **-42%** |
| format.json | idn-email format | 6 | ✅ | 83.9M | ✅ | 71.4M | -15% |
| format.json | regex format | 6 | ✅ | 84.1M | ✅ | 71.5M | -15% |
| format.json | ipv4 format | 6 | ✅ | 92.0M | ✅ | 68.4M | 🟢 **-26%** |
| format.json | ipv6 format | 6 | ✅ | 83.8M | ✅ | 68.0M | -19% |
| format.json | idn-hostname format | 6 | ✅ | 83.8M | ✅ | 69.2M | -17% |
| format.json | hostname format | 6 | ✅ | 83.8M | ✅ | 68.4M | -18% |
| format.json | date format | 6 | ✅ | 91.4M | ✅ | 71.4M | 🟢 **-22%** |
| format.json | date-time format | 6 | ✅ | 88.2M | ✅ | 66.5M | 🟢 **-25%** |
| format.json | time format | 6 | ✅ | 83.3M | ✅ | 71.4M | -14% |
| format.json | json-pointer format | 6 | ✅ | 92.4M | ✅ | 71.3M | 🟢 **-23%** |
| format.json | relative-json-pointer format | 6 | ✅ | 84.0M | ✅ | 71.2M | -15% |
| format.json | iri format | 6 | ✅ | 90.7M | ✅ | 71.6M | 🟢 **-21%** |
| format.json | iri-reference format | 6 | ✅ | 84.8M | ✅ | 71.8M | -15% |
| format.json | uri format | 6 | ✅ | 83.8M | ✅ | 68.4M | -18% |
| format.json | uri-reference format | 6 | ✅ | 89.4M | ✅ | 69.7M | 🟢 **-22%** |
| format.json | uri-template format | 6 | ✅ | 92.3M | ✅ | 67.9M | 🟢 **-26%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 93.8M | ✅ | 54.7M | 🟢 **-42%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.9M | ✅ | 68.1M | 🟢 **-27%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.1M | ✅ | 60.5M | 🟢 **-28%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.9M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.0M | ✅ | 62.7M | 🟢 **-25%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.4M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 45.0M | ✅ | 28.4M | 🟢 **-37%** |
| items.json | a schema given for items | 4 | ✅ | 54.3M | ✅ | 49.0M | -10% |
| items.json | an array of schemas for items | 6 | ✅ | 67.4M | ✅ | 55.2M | -18% |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 71.0M | 🟢 **-24%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.7M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 65.1M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 13.0M | ✅ | 23.5M | 🔴 **+81%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 8.9M | 🟢 **-28%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 62.3M | -17% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 64.9M | -20% |
| maxItems.json | maxItems validation | 4 | ✅ | 79.0M | ✅ | 53.8M | 🟢 **-32%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 48.9M | 🟢 **-33%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.3M | ✅ | 46.7M | 🟢 **-21%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 39.8M | 🟢 **-30%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.4M | ✅ | 46.3M | 🟢 **-21%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.4M | ✅ | 33.6M | 🟢 **-32%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.7M | ✅ | 34.7M | 🟢 **-32%** |
| maximum.json | maximum validation | 4 | ✅ | 75.0M | ✅ | 54.6M | 🟢 **-27%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 74.7M | ✅ | 54.7M | 🟢 **-27%** |
| minItems.json | minItems validation | 4 | ✅ | 81.1M | ✅ | 53.8M | 🟢 **-34%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 71.0M | ✅ | 46.9M | 🟢 **-34%** |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 44.2M | 🟢 **-24%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 41.1M | 🟢 **-28%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ✅ | 45.7M | 🟢 **-24%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.4M | ✅ | 35.2M | 🟢 **-30%** |
| minimum.json | minimum validation | 4 | ✅ | 79.0M | ✅ | 54.2M | 🟢 **-31%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 55.4M | 🟢 **-24%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 51.5M | 🟢 **-34%** |
| multipleOf.json | by number | 3 | ✅ | 73.6M | ✅ | 6.5M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 3.9M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 3.9M | 🟢 **-93%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 17.3M | 🟢 **-78%** |
| not.json | not multiple types | 3 | ✅ | 71.0M | ✅ | 23.1M | 🟢 **-67%** |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 16.5M | 🟢 **-76%** |
| not.json | forbidden property | 2 | ✅ | 54.0M | ✅ | 46.0M | -15% |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.2M | ✅ | 39.1M | 🟢 **-35%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.0M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.3M | ✅ | 63.4M | 🟢 **-30%** |
| not.json | double negation | 1 | ✅ | 89.6M | ✅ | 14.3M | 🟢 **-84%** |
| oneOf.json | oneOf | 4 | ✅ | 66.1M | ✅ | 16.7M | 🟢 **-75%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.7M | ✅ | 17.9M | 🟢 **-47%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 42.6M | 🟢 **-35%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 39.3M | 🟢 **-41%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 42.2M | 🟢 **-36%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ✅ | 18.1M | 🟢 **-60%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 20.2M | 🟢 **-73%** |
| oneOf.json | oneOf with required | 4 | ✅ | 57.5M | ✅ | 17.3M | 🟢 **-70%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 16.7M | 🟢 **-66%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 14.6M | 🟢 **-81%** |
| pattern.json | pattern validation | 8 | ✅ | 56.2M | ✅ | 46.8M | -17% |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 29.0M | +14% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.7M | ✅ | 19.2M | 🟢 **-28%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.1M | ✅ | 7.1M | 🟢 **-46%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.1M | ✅ | 11.6M | 🟢 **-23%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 15.1M | -17% |
| properties.json | object properties validation | 6 | ✅ | 56.0M | ✅ | 46.8M | -16% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ✅ | 8.1M | 🟢 **-58%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.6M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 44.2M | 🟢 **-37%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 44.9M | 🟢 **-52%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.5M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.4M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.7M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.1M | ✅ | 16.6M | 🟢 **-37%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.2M | ✅ | 40.8M | 🟢 **-25%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.7M | ✅ | 40.7M | 🟢 **-31%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.1M | ✅ | 40.2M | -15% |
| ref.json | nested refs | 2 | ✅ | 39.1M | ✅ | 46.0M | +18% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.0M | ✅ | 44.4M | 🟢 **-22%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.4M | ✅ | 42.1M | 🟢 **-21%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 53.7M | ✅ | 45.4M | -16% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 88.1M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.7M | ✅ | 41.7M | 🟢 **-24%** |
| ref.json | Location-independent identifier | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 6.2M | 🟢 **-89%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.0M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.2M | ✅ | 45.0M | -14% |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.2M | ✅ | 46.2M | -13% |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.6M | ✅ | 42.6M | -14% |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.4M | ✅ | 45.3M | -8% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.9M | ✅ | 52.0M | 🟢 **-32%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 51.4M | 🟢 **-33%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 49.9M | 🟢 **-29%** |
| refRemote.json | remote ref | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 39.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 41.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 54.4M | -16% |
| required.json | required default validation | 1 | ✅ | 87.9M | ✅ | 63.1M | 🟢 **-28%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 63.2M | 🟢 **-30%** |
| required.json | required with escaped characters | 2 | ✅ | 52.1M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 67.0M | ✅ | 38.7M | 🟢 **-42%** |
| type.json | number type matches numbers | 9 | ✅ | 68.6M | ✅ | 46.7M | 🟢 **-32%** |
| type.json | string type matches strings | 9 | ✅ | 68.8M | ✅ | 46.8M | 🟢 **-32%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 38.8M | 🟢 **-34%** |
| type.json | array type matches arrays | 7 | ✅ | 64.5M | ✅ | 40.1M | 🟢 **-38%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.4M | ✅ | 42.7M | 🟢 **-36%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.6M | ✅ | 41.3M | 🟢 **-37%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ✅ | 41.8M | 🟢 **-37%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 51.8M | 🟢 **-33%** |
| type.json | type: array or object | 5 | ✅ | 72.4M | ✅ | 43.5M | 🟢 **-40%** |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 48.9M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ✅ | 2.1M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ✅ | 6.4M | 🟢 **-80%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.0M | ✅ | 6.1M | 🟢 **-68%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ✅ | 65.1M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 60.1M | -16% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.8M | ✅ | 50.2M | 🟢 **-31%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 13.0M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 73.9M | -17% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 42.0M | 🟢 **-34%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 68.3M | -13% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.6M | ✅ | 49.7M | 🟢 **-37%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 347K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 18.7M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.4M | ✅ | 19.7M | 🟢 **-33%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 25.2M | -14% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.9M | ✅ | 24.9M | -11% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 25.1M | -12% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.8M | ✅ | 24.8M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 26.8M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.1M | ✅ | 25.4M | -9% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.5M | ✅ | 25.2M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.3M | ✅ | 27.7M | +9% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.4M | ✅ | 10.3M | 🟢 **-66%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.2M | ✅ | 12.8M | 🟢 **-21%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 12.6M | -14% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.1M | ✅ | 24.2M | -14% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.5M | ✅ | 15.0M | 🟢 **-27%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.0M | ✅ | 17.0M | -5% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 10.6M | 🔴 **+39%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.0M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 20.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.3M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.3M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.7M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.2M | ✅ | 47.9M | 🟢 **-50%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.5M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 59.5M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 58.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.1M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 6.4M | -12% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.7M | ✅ | 38.2M | +1% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.1M | ✅ | 61.8M | 🟢 **-60%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.5M | ✅ | 55.8M | 🟢 **-27%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ✅ | 71.5M | 🟢 **-56%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 77.0M | ✅ | 64.5M | -16% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.4M | ✅ | 35.9M | 🟢 **-34%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 43.5M | ✅ | 40.5M | -7% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 48.3M | 🟢 **-55%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 77.1M | ✅ | 68.8M | -11% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.3M | ✅ | 13.4M | 🟢 **-71%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.8M | ✅ | 15.9M | 🟢 **-27%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.2M | ✅ | 16.0M | 🟢 **-63%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.7M | ✅ | 24.7M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 63.0M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.4M | ✅ | 26.7M | -6% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 42.7M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.5M | ✅ | 17.0M | 🟢 **-33%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.3M | ✅ | 17.5M | 🟢 **-44%** |
| allOf.json | allOf | 4 | ✅ | 38.7M | ✅ | 30.9M | 🟢 **-20%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 25.1M | -18% |
| allOf.json | allOf simple types | 2 | ✅ | 65.9M | ✅ | 50.3M | 🟢 **-24%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 143.1M | ✅ | 74.4M | 🟢 **-48%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 85.1M | ✅ | 47.6M | 🟢 **-44%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.9M | ✅ | 74.6M | 🟢 **-51%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.3M | ✅ | 52.5M | 🟢 **-28%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 50.0M | 🟢 **-58%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.6M | ✅ | 50.3M | 🟢 **-33%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 22.7M | 🟢 **-73%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 49.1M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 82.4M | ✅ | 14.5M | 🟢 **-82%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.2M | ✅ | 16.5M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.1M | ✅ | 18.0M | 🟢 **-79%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.1M | ✅ | 16.8M | 🟢 **-80%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.2M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.9M | ✅ | 13.9M | 🟢 **-72%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.9M | ✅ | 13.7M | 🟢 **-83%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 13.0M | 🟢 **-83%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 82.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 61.3M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 40.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 56.1M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.6M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 64.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 71.5M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.3M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 62.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 57.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 62.8M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 35.1M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 57.2M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 68.9M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 31.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 61.7M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 68.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 69.2M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 65.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 27.8M | 🟢 **-62%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 90.1M | ✅ | 50.2M | 🟢 **-44%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 89.6M | ✅ | 77.1M | -14% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 87.7M | ✅ | 54.1M | 🟢 **-38%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 73.0M | ✅ | 63.5M | -13% |
| default.json | invalid type for default | 2 | ✅ | 68.0M | ✅ | 53.8M | 🟢 **-21%** |
| default.json | invalid string value for default | 2 | ✅ | 53.2M | ✅ | 43.6M | -18% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 26.2M | ✅ | 19.8M | 🟢 **-24%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 61.5M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 90.0M | ✅ | 63.5M | 🟢 **-29%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.4M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 44.7M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 53.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.8M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 70.9M | ✅ | 24.3M | 🟢 **-66%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.3M | ✅ | 2.8M | 🟢 **-94%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 70.9M | ✅ | 16.3M | 🟢 **-77%** |
| enum.json | enums in properties | 6 | ✅ | 14.3M | ✅ | 20.5M | 🔴 **+43%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 20.8M | 🟢 **-71%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 69.1M | ✅ | 26.5M | 🟢 **-62%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.8M | ✅ | 10.4M | 🟢 **-83%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 71.9M | ✅ | 27.5M | 🟢 **-62%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ✅ | 10.6M | 🟢 **-80%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 68.6M | ✅ | 16.1M | 🟢 **-77%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 57.2M | ✅ | 10.4M | 🟢 **-82%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.3M | ✅ | 29.4M | 🟢 **-56%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 55.9M | ✅ | 10.4M | 🟢 **-81%** |
| enum.json | nul characters in strings | 2 | ✅ | 57.0M | ✅ | 21.2M | 🟢 **-63%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.3M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 61.4M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 89.0M | ✅ | 42.5M | 🟢 **-52%** |
| format.json | idn-email format | 6 | ✅ | 79.1M | ✅ | 58.0M | 🟢 **-27%** |
| format.json | regex format | 6 | ✅ | 76.6M | ✅ | 34.6M | 🟢 **-55%** |
| format.json | ipv4 format | 6 | ✅ | 80.7M | ✅ | 58.5M | 🟢 **-27%** |
| format.json | ipv6 format | 6 | ✅ | 80.7M | ✅ | 58.2M | 🟢 **-28%** |
| format.json | idn-hostname format | 6 | ✅ | 73.3M | ✅ | 60.6M | -17% |
| format.json | hostname format | 6 | ✅ | 77.7M | ✅ | 56.9M | 🟢 **-27%** |
| format.json | date format | 6 | ✅ | 77.5M | ✅ | 59.0M | 🟢 **-24%** |
| format.json | date-time format | 6 | ✅ | 73.6M | ✅ | 57.5M | 🟢 **-22%** |
| format.json | time format | 6 | ✅ | 76.4M | ✅ | 59.7M | 🟢 **-22%** |
| format.json | json-pointer format | 6 | ✅ | 80.6M | ✅ | 60.9M | 🟢 **-24%** |
| format.json | relative-json-pointer format | 6 | ✅ | 73.3M | ✅ | 58.8M | -20% |
| format.json | iri format | 6 | ✅ | 79.9M | ✅ | 54.3M | 🟢 **-32%** |
| format.json | iri-reference format | 6 | ✅ | 73.7M | ✅ | 60.4M | -18% |
| format.json | uri format | 6 | ✅ | 80.9M | ✅ | 47.1M | 🟢 **-42%** |
| format.json | uri-reference format | 6 | ✅ | 77.1M | ✅ | 52.1M | 🟢 **-32%** |
| format.json | uri-template format | 6 | ✅ | 80.5M | ✅ | 59.2M | 🟢 **-26%** |
| format.json | uuid format | 6 | ✅ | 79.7M | ✅ | 59.6M | 🟢 **-25%** |
| format.json | duration format | 6 | ✅ | 75.8M | ✅ | 60.7M | -20% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.9M | ✅ | 76.7M | -4% |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.9M | ✅ | 76.8M | -4% |
| if-then-else.json | ignore else without if | 2 | ✅ | 88.5M | ✅ | 76.7M | -13% |
| if-then-else.json | if and then without else | 3 | ✅ | 73.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 73.0M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.7M | ✅ | 61.9M | 🟢 **-22%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.4M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.9M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.6M | ✅ | 23.7M | 🟢 **-46%** |
| items.json | a schema given for items | 4 | ✅ | 50.9M | ✅ | 41.1M | -19% |
| items.json | an array of schemas for items | 6 | ✅ | 65.3M | ✅ | 46.2M | 🟢 **-29%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.6M | ✅ | 62.0M | 🟢 **-30%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.6M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 62.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.8M | ✅ | 22.0M | 🔴 **+71%** |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 8.5M | 🟢 **-29%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 62.2M | -14% |
| items.json | array-form items with null instance e... | 1 | ✅ | 69.4M | ✅ | 65.4M | -6% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.6M | ✅ | 76.8M | -13% |
| maxContains.json | maxContains with contains | 5 | ✅ | 72.4M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.4M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 56.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 74.9M | ✅ | 33.8M | 🟢 **-55%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.4M | ✅ | 31.5M | 🟢 **-55%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.1M | ✅ | 39.5M | 🟢 **-31%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.9M | ✅ | 40.3M | 🟢 **-27%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.3M | ✅ | 41.3M | 🟢 **-27%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 43.6M | ✅ | 25.4M | 🟢 **-42%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ✅ | 25.4M | 🟢 **-49%** |
| maximum.json | maximum validation | 4 | ✅ | 73.2M | ✅ | 41.3M | 🟢 **-44%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.2M | ✅ | 44.1M | 🟢 **-39%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.3M | ✅ | 66.5M | 🟢 **-25%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 63.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.4M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.5M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 54.0M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 54.6M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 88.6M | ✅ | 60.2M | 🟢 **-32%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 68.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 75.0M | ✅ | 33.2M | 🟢 **-56%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.2M | ✅ | 45.4M | 🟢 **-34%** |
| minLength.json | minLength validation | 5 | ✅ | 56.0M | ✅ | 37.4M | 🟢 **-33%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.7M | ✅ | 40.7M | 🟢 **-26%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.7M | ✅ | 41.2M | 🟢 **-29%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.3M | ✅ | 25.8M | 🟢 **-48%** |
| minimum.json | minimum validation | 4 | ✅ | 73.2M | ✅ | 43.7M | 🟢 **-40%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 48.5M | 🟢 **-30%** |
| multipleOf.json | by int | 3 | ✅ | 73.9M | ✅ | 40.2M | 🟢 **-46%** |
| multipleOf.json | by number | 3 | ✅ | 70.1M | ✅ | 6.3M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 64.0M | ✅ | 3.9M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.7M | ✅ | 4.2M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 73.3M | ✅ | 15.1M | 🟢 **-79%** |
| not.json | not multiple types | 3 | ✅ | 67.9M | ✅ | 20.4M | 🟢 **-70%** |
| not.json | not more complex schema | 3 | ✅ | 65.9M | ✅ | 15.7M | 🟢 **-76%** |
| not.json | forbidden property | 2 | ✅ | 51.0M | ✅ | 46.3M | -9% |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.7M | ✅ | 35.8M | 🟢 **-42%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.9M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.0M | ✅ | 57.0M | 🟢 **-29%** |
| not.json | double negation | 1 | ✅ | 85.1M | ✅ | 11.2M | 🟢 **-87%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.5M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 64.4M | ✅ | 14.2M | 🟢 **-78%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.0M | ✅ | 16.0M | 🟢 **-52%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 62.4M | ✅ | 42.2M | 🟢 **-32%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.2M | ✅ | 39.5M | 🟢 **-38%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.2M | ✅ | 42.2M | 🟢 **-33%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.4M | ✅ | 16.7M | 🟢 **-62%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.4M | ✅ | 17.0M | 🟢 **-77%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.5M | ✅ | 16.0M | 🟢 **-66%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.9M | ✅ | 15.1M | 🟢 **-68%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.5M | ✅ | 12.6M | 🟢 **-83%** |
| pattern.json | pattern validation | 8 | ✅ | 53.8M | ✅ | 42.4M | 🟢 **-21%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.4M | ✅ | 28.7M | 🔴 **+100%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ✅ | 18.5M | 🟢 **-30%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.6M | ✅ | 6.5M | 🟢 **-55%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.7M | ✅ | 12.9M | -12% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.1M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 17.2M | -3% |
| properties.json | object properties validation | 6 | ✅ | 54.3M | ✅ | 40.7M | 🟢 **-25%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ✅ | 7.9M | 🟢 **-60%** |
| properties.json | properties with boolean schema | 4 | ✅ | 47.9M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 47.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 45.2M | 🟢 **-33%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.5M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.4M | ✅ | 64.0M | 🟢 **-28%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.7M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 7.6M | 🔴 **+148%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.3M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.9M | ✅ | 14.4M | 🟢 **-40%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 53.2M | ✅ | 43.8M | -18% |
| ref.json | relative pointer ref to array | 2 | ✅ | 55.6M | ✅ | 44.1M | 🟢 **-21%** |
| ref.json | escaped pointer ref | 6 | ✅ | 45.9M | ✅ | 36.0M | 🟢 **-22%** |
| ref.json | nested refs | 2 | ✅ | 37.7M | ✅ | 53.4M | 🔴 **+42%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 42.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.2M | ✅ | 26.5M | 🟢 **-47%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.8M | ✅ | 45.5M | -10% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.2M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.2M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.4M | ✅ | 45.9M | -12% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 54.9M | ✅ | 5.1M | 🟢 **-91%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.2M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 42.2M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.5M | ✅ | 30.6M | 🟢 **-42%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.6M | ✅ | 45.5M | -10% |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.5M | ✅ | 45.5M | -4% |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.5M | ✅ | 45.5M | -4% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.2M | ✅ | 50.2M | 🟢 **-31%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 72.9M | ✅ | 52.9M | 🟢 **-27%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.4M | ✅ | 51.4M | 🟢 **-24%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 48.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 43.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 26.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 47.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 47.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.3M | ✅ | 47.2M | 🟢 **-24%** |
| required.json | required default validation | 1 | ✅ | 85.1M | ✅ | 63.2M | 🟢 **-26%** |
| required.json | required with empty array | 1 | ✅ | 85.1M | ✅ | 63.1M | 🟢 **-26%** |
| required.json | required with escaped characters | 2 | ✅ | 49.8M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.5M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.6M | ✅ | 37.6M | 🟢 **-41%** |
| type.json | number type matches numbers | 9 | ✅ | 66.2M | ✅ | 43.8M | 🟢 **-34%** |
| type.json | string type matches strings | 9 | ✅ | 65.3M | ✅ | 44.1M | 🟢 **-32%** |
| type.json | object type matches objects | 7 | ✅ | 56.4M | ✅ | 35.4M | 🟢 **-37%** |
| type.json | array type matches arrays | 7 | ✅ | 60.7M | ✅ | 37.3M | 🟢 **-39%** |
| type.json | boolean type matches booleans | 10 | ✅ | 62.8M | ✅ | 33.6M | 🟢 **-47%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.6M | ✅ | 38.3M | 🟢 **-39%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.1M | ✅ | 38.1M | 🟢 **-40%** |
| type.json | type as array with one item | 2 | ✅ | 73.0M | ✅ | 53.2M | 🟢 **-27%** |
| type.json | type: array or object | 5 | ✅ | 68.3M | ✅ | 34.5M | 🟢 **-50%** |
| type.json | type: array, object or null | 5 | ✅ | 73.5M | ✅ | 42.8M | 🟢 **-42%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.9M | ✅ | 77.1M | -2% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 58.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 46.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.0M | ✅ | 42.9M | 🟢 **-36%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 48.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 75.2M | ✅ | 46.7M | 🟢 **-38%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 43.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 34.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 77.9M | ✅ | 47.0M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.6M | ✅ | 66.5M | 🔴 **+223%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 57.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 45.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 48.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 45.2M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.4M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 71.2M | ✅ | 43.3M | 🟢 **-39%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 72.0M | ✅ | 74.7M | +4% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 55.9M | ✅ | 68.1M | 🔴 **+22%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 34.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 34.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 66.7M | ✅ | 44.2M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.7M | ✅ | 43.7M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 31.1M | ✅ | 59.6M | 🔴 **+92%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 22.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.8M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.7M | ✅ | 42.5M | 🔴 **+34%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.2M | ✅ | 46.9M | 🔴 **+55%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.0M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 30.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 46.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.7M | ✅ | 10.1M | 🟢 **-49%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 72.9M | ✅ | 43.0M | 🟢 **-41%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.7M | ✅ | 74.4M | 🔴 **+50%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.7M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 1.9M | 🟢 **-89%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.8M | ✅ | 6.2M | 🟢 **-80%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 14.1M | ✅ | 6.0M | 🟢 **-57%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 86.1M | ✅ | 63.0M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.7M | ✅ | 54.5M | 🟢 **-21%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.9M | ✅ | 43.8M | 🟢 **-32%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 51.0M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.0M | ✅ | 26.3M | 🟢 **-64%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 61.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.7M | ✅ | 12.9M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 84.1M | ✅ | 74.4M | -12% |
| optional/bignum.json | string | 1 | ✅ | 60.9M | ✅ | 41.7M | 🟢 **-32%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 68.1M | -9% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 47.1M | 🟢 **-37%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.8M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.4M | ✅ | 38.5M | 🟢 **-37%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.3M | ✅ | 65.4M | 🟢 **-28%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.7M | ✅ | 33.9M | +1% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 52.8M | ✅ | 42.9M | -19% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 59.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.0M | ✅ | 18.3M | 🟢 **-32%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.9M | ✅ | 21.2M | 🟢 **-27%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.7M | ✅ | 20.6M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.1M | ✅ | 20.8M | 🟢 **-20%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.9M | ✅ | 21.9M | 🟢 **-21%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 23.3M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.9M | ✅ | 20.8M | 🟢 **-26%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.7M | ✅ | 20.9M | 🟢 **-25%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.7M | ✅ | 28.6M | +11% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.8M | ✅ | 10.2M | 🟢 **-66%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 13.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.3M | ✅ | 12.0M | 🟢 **-22%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 12.9M | -13% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.7M | ✅ | 21.2M | 🟢 **-23%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 14.3M | 🟢 **-30%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.7M | ✅ | 16.1M | -19% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 10.4M | 🔴 **+29%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.4M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.2M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 69.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.3M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.4M | ✅ | 44.0M | 🟢 **-47%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.7M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 62.8M | ✅ | 29.9M | 🟢 **-52%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 22.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 52.7M | ✅ | 25.5M | 🟢 **-52%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 52.9M | ✅ | 44.6M | -16% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 53.3M | ✅ | 44.8M | -16% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 72.4M | ✅ | 52.8M | 🟢 **-27%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.7M | ✅ | 39.7M | 🟢 **-25%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.9M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 56.9M | ✅ | 21.0M | 🟢 **-63%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.3M | ✅ | 18.4M | -14% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 17.1M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.7M | ✅ | 30.7M | -6% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.6M | ✅ | 57.1M | 🟢 **-63%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.2M | ✅ | 26.5M | -6% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 42.6M | 🟢 **-39%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.4M | ✅ | 19.9M | 🟢 **-22%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.2M | ✅ | 19.3M | 🟢 **-38%** |
| allOf.json | allOf | 4 | ✅ | 39.2M | ✅ | 36.0M | -8% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 27.4M | -11% |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ✅ | 50.6M | 🟢 **-27%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 142.0M | ✅ | 39.2M | 🟢 **-72%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 63.0M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 77.1M | ✅ | 51.3M | 🟢 **-33%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 74.4M | 🟢 **-51%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 72.1M | ✅ | 45.7M | 🟢 **-37%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 45.9M | 🟢 **-61%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 27.9M | 🟢 **-63%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 23.7M | 🟢 **-72%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.3M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 48.3M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 76.0M | ✅ | 14.2M | 🟢 **-81%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.2M | ✅ | 17.8M | 🟢 **-55%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.2M | ✅ | 17.8M | 🟢 **-79%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.2M | ✅ | 16.0M | 🟢 **-81%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.9M | ✅ | 14.7M | 🟢 **-70%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.9M | ✅ | 15.7M | 🟢 **-80%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 14.6M | 🟢 **-81%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 76.3M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.9M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 64.0M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 38.5M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 56.2M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 72.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 72.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 62.7M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 62.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.7M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 70.2M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 33.5M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.6M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 58.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 61.7M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 67.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 21.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 48.7M | 🟢 **-34%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 75.0M | ✅ | 38.3M | 🟢 **-49%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 90.3M | ✅ | 76.9M | -15% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 79.6M | ✅ | 68.8M | -14% |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 76.3M | ✅ | 41.3M | 🟢 **-46%** |
| default.json | invalid type for default | 2 | ✅ | 64.4M | ✅ | 58.8M | -9% |
| default.json | invalid string value for default | 2 | ✅ | 53.1M | ✅ | 42.5M | 🟢 **-20%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 26.3M | ✅ | 44.3M | 🔴 **+69%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 60.9M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 80.6M | ✅ | 55.1M | 🟢 **-32%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 47.5M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 52.9M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 52.7M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 38.6M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 10.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.5M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.6M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 11.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 8.6M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.7M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.5M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.7M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 26.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.9M | ✅ | 30.8M | 🟢 **-57%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.1M | ✅ | 2.9M | 🟢 **-94%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.1M | ✅ | 17.5M | 🟢 **-73%** |
| enum.json | enums in properties | 6 | ✅ | 14.8M | ✅ | 12.5M | -15% |
| enum.json | enum with escaped characters | 3 | ✅ | 72.9M | ✅ | 23.7M | 🟢 **-67%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 69.3M | ✅ | 31.4M | 🟢 **-55%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 62.0M | ✅ | 10.2M | 🟢 **-84%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 72.2M | ✅ | 32.6M | 🟢 **-55%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.9M | ✅ | 10.6M | 🟢 **-83%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 71.5M | ✅ | 34.3M | 🟢 **-52%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ✅ | 10.7M | 🟢 **-84%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.9M | ✅ | 36.5M | 🟢 **-46%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.7M | ✅ | 10.4M | 🟢 **-84%** |
| enum.json | nul characters in strings | 2 | ✅ | 62.2M | ✅ | 26.8M | 🟢 **-57%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 67.4M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 68.1M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 83.3M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 83.2M | ✅ | 44.8M | 🟢 **-46%** |
| format.json | regex format | 7 | ✅ | 75.4M | ✅ | 72.1M | -4% |
| format.json | ipv4 format | 7 | ✅ | 73.8M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 75.2M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 75.6M | ✅ | 45.9M | 🟢 **-39%** |
| format.json | hostname format | 7 | ✅ | 75.6M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 75.3M | ✅ | 45.6M | 🟢 **-39%** |
| format.json | date-time format | 7 | ✅ | 75.4M | ✅ | 28.5M | 🟢 **-62%** |
| format.json | time format | 7 | ✅ | 74.2M | ✅ | 72.3M | -3% |
| format.json | json-pointer format | 7 | ✅ | 82.5M | ✅ | 72.2M | -12% |
| format.json | relative-json-pointer format | 7 | ✅ | 75.3M | ✅ | 71.0M | -6% |
| format.json | iri format | 7 | ✅ | 75.6M | ✅ | 72.6M | -4% |
| format.json | iri-reference format | 7 | ✅ | 75.5M | ✅ | 68.4M | -9% |
| format.json | uri format | 7 | ✅ | 75.5M | ✅ | 49.8M | 🟢 **-34%** |
| format.json | uri-reference format | 7 | ✅ | 73.8M | ✅ | 72.0M | -2% |
| format.json | uri-template format | 7 | ✅ | 75.6M | ✅ | 72.4M | -4% |
| format.json | uuid format | 7 | ✅ | 75.4M | ✅ | 72.6M | -4% |
| format.json | duration format | 7 | ✅ | 75.6M | ✅ | 66.2M | -12% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.8M | ✅ | 76.5M | -4% |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.9M | ✅ | 75.9M | -5% |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.9M | ✅ | 77.1M | -4% |
| if-then-else.json | if and then without else | 3 | ✅ | 72.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 72.8M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 80.0M | ✅ | 60.5M | 🟢 **-24%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 72.0M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.2M | ✅ | 28.4M | 🟢 **-34%** |
| items.json | a schema given for items | 4 | ✅ | 51.6M | ✅ | 49.4M | -4% |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.5M | ✅ | 61.8M | 🟢 **-30%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.8M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.7M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 9.2M | 🟢 **-25%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 75.6M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 44.4M | ✅ | 34.6M | 🟢 **-22%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 43.0M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 69.7M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 72.0M | ✅ | 46.2M | 🟢 **-36%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.6M | ✅ | 77.0M | -13% |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.3M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 57.2M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 75.2M | ✅ | 40.8M | 🟢 **-46%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 49.0M | 🟢 **-29%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.2M | ✅ | 46.7M | -18% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.6M | ✅ | 31.7M | 🟢 **-42%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.2M | ✅ | 46.8M | -17% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.6M | ✅ | 34.9M | 🟢 **-27%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.6M | ✅ | 33.6M | 🟢 **-31%** |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ✅ | 54.9M | 🟢 **-25%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.1M | ✅ | 54.7M | -20% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.3M | ✅ | 77.1M | -13% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 63.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 58.0M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.0M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 58.7M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 53.9M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 88.6M | ✅ | 61.9M | 🟢 **-30%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 68.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 75.3M | ✅ | 40.4M | 🟢 **-46%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 48.5M | 🟢 **-30%** |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ✅ | 44.4M | 🟢 **-21%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.9M | ✅ | 37.9M | 🟢 **-31%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.8M | ✅ | 51.8M | -10% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.5M | ✅ | 27.6M | 🟢 **-43%** |
| minimum.json | minimum validation | 4 | ✅ | 73.3M | ✅ | 53.6M | 🟢 **-27%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 55.3M | -20% |
| multipleOf.json | by int | 3 | ✅ | 73.3M | ✅ | 55.3M | 🟢 **-25%** |
| multipleOf.json | by number | 3 | ✅ | 70.0M | ✅ | 6.5M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 4.1M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 4.5M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.8M | ❌ | - | - |
| not.json | not | 2 | ✅ | 73.3M | ✅ | 17.4M | 🟢 **-76%** |
| not.json | not multiple types | 3 | ✅ | 67.7M | ✅ | 23.2M | 🟢 **-66%** |
| not.json | not more complex schema | 3 | ✅ | 66.1M | ✅ | 16.8M | 🟢 **-75%** |
| not.json | forbidden property | 2 | ✅ | 49.9M | ✅ | 47.4M | -5% |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.0M | ✅ | 36.6M | 🟢 **-40%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.5M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 84.6M | ✅ | 45.9M | 🟢 **-46%** |
| not.json | double negation | 1 | ✅ | 85.1M | ✅ | 14.2M | 🟢 **-83%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 64.5M | ✅ | 15.1M | 🟢 **-77%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.0M | ✅ | 17.9M | 🟢 **-46%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 63.0M | ✅ | 42.4M | 🟢 **-33%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.2M | ✅ | 32.8M | 🟢 **-48%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 42.4M | 🟢 **-33%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.1M | ✅ | 18.0M | 🟢 **-58%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.4M | ✅ | 19.7M | 🟢 **-73%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.7M | ✅ | 16.8M | 🟢 **-64%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.4M | ✅ | 16.6M | 🟢 **-65%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.1M | ✅ | 14.4M | 🟢 **-80%** |
| pattern.json | pattern validation | 8 | ✅ | 54.1M | ✅ | 46.0M | -15% |
| pattern.json | pattern is not anchored | 1 | ✅ | 22.7M | ✅ | 29.0M | 🔴 **+28%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.1M | ✅ | 18.8M | -19% |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ✅ | 11.1M | 🟢 **-26%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.2M | ✅ | 13.3M | -18% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.6M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 17.3M | -3% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.7M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 62.3M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 77.0M | ✅ | 61.8M | -20% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 77.0M | ✅ | 73.0M | -5% |
| properties.json | object properties validation | 6 | ✅ | 53.3M | ✅ | 46.7M | -12% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 8.0M | 🟢 **-60%** |
| properties.json | properties with boolean schema | 4 | ✅ | 47.8M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 43.7M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 45.2M | 🟢 **-33%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.5M | ✅ | 47.3M | 🟢 **-46%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.1M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.9M | ✅ | 16.7M | 🟢 **-30%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 51.9M | ✅ | 45.1M | -13% |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 44.9M | ✅ | 32.9M | 🟢 **-27%** |
| ref.json | nested refs | 2 | ✅ | 37.8M | ✅ | 50.1M | 🔴 **+33%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.3M | ✅ | 35.9M | 🟢 **-29%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.5M | ✅ | 45.7M | -13% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.1M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.5M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.4M | ✅ | 45.8M | -12% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 54.9M | ✅ | 6.1M | 🟢 **-89%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.4M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 37.8M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 41.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 51.8M | ✅ | 45.9M | -11% |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.6M | ✅ | 45.4M | -10% |
| ref.json | URN base URI with r-component | 2 | ✅ | 41.9M | ✅ | 45.0M | +7% |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.5M | ✅ | 45.7M | +0% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 51.6M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 45.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 52.8M | 🟢 **-28%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 72.6M | ✅ | 53.1M | 🟢 **-27%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.3M | ✅ | 51.8M | 🟢 **-23%** |
| refRemote.json | remote ref | 2 | ✅ | 45.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 42.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 45.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 45.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 49.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.4M | ✅ | 54.5M | -13% |
| required.json | required default validation | 1 | ✅ | 85.1M | ✅ | 63.2M | 🟢 **-26%** |
| required.json | required with empty array | 1 | ✅ | 85.2M | ✅ | 63.3M | 🟢 **-26%** |
| required.json | required with escaped characters | 2 | ✅ | 50.1M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 24.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.9M | ✅ | 30.0M | 🟢 **-53%** |
| type.json | number type matches numbers | 9 | ✅ | 66.2M | ✅ | 47.1M | 🟢 **-29%** |
| type.json | string type matches strings | 9 | ✅ | 65.9M | ✅ | 46.6M | 🟢 **-29%** |
| type.json | object type matches objects | 7 | ✅ | 56.2M | ✅ | 39.0M | 🟢 **-31%** |
| type.json | array type matches arrays | 7 | ✅ | 61.1M | ✅ | 40.0M | 🟢 **-34%** |
| type.json | boolean type matches booleans | 10 | ✅ | 63.1M | ✅ | 41.4M | 🟢 **-34%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.8M | ✅ | 38.9M | 🟢 **-38%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 62.9M | ✅ | 41.4M | 🟢 **-34%** |
| type.json | type as array with one item | 2 | ✅ | 73.1M | ✅ | 52.8M | 🟢 **-28%** |
| type.json | type: array or object | 5 | ✅ | 67.3M | ✅ | 43.3M | 🟢 **-36%** |
| type.json | type: array, object or null | 5 | ✅ | 73.1M | ✅ | 48.8M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.8M | ✅ | 77.1M | -2% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 57.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 49.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.4M | ✅ | 43.2M | 🟢 **-36%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 51.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 75.3M | ✅ | 49.5M | 🟢 **-34%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.1M | ✅ | 43.8M | -1% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 77.9M | ✅ | 49.6M | 🟢 **-36%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.9M | ✅ | 76.9M | 🔴 **+268%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 58.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 49.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 44.5M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 83.8M | ✅ | 45.7M | 🟢 **-45%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 71.9M | ✅ | 73.9M | +3% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 56.1M | ✅ | 60.3M | +7% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 33.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 88.5M | ✅ | 47.2M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 32.3M | ✅ | 19.2M | 🟢 **-41%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.5M | ✅ | 44.1M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.0M | ✅ | 62.5M | 🔴 **+123%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 16.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.0M | ✅ | 42.9M | 🔴 **+53%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.8M | ✅ | 62.7M | 🔴 **+125%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.0M | ✅ | 10.3M | 🟢 **-48%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 78.5M | ✅ | 45.8M | 🟢 **-42%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 50.9M | ✅ | 73.9M | 🔴 **+45%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 2.0M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ✅ | 6.7M | 🟢 **-79%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 44.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.6M | ✅ | 44.0M | 🟢 **-49%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.9M | ✅ | 66.2M | -4% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.2M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 51.1M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.5M | ✅ | 37.1M | 🟢 **-50%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 61.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 13.1M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 84.0M | ✅ | 73.8M | -12% |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 41.1M | 🟢 **-33%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 68.4M | -9% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 48.6M | 🟢 **-35%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 80.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.9M | ✅ | 42.0M | 🟢 **-32%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.1M | ✅ | 65.7M | 🟢 **-27%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.6M | ✅ | 37.4M | +11% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 52.7M | ✅ | 47.1M | -11% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 57.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.6M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.3M | ✅ | 21.3M | 🟢 **-25%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ✅ | 25.3M | 🔴 **+27%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.1M | ✅ | 25.3M | -7% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 24.0M | -14% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 13.7M | ✅ | 24.7M | 🔴 **+80%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 12.7M | ✅ | 26.6M | 🔴 **+109%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.4M | ✅ | 25.0M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.3M | ✅ | 25.1M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.8M | ✅ | 25.6M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 10.7M | 🟢 **-64%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.7M | ✅ | 12.0M | -18% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.2M | ✅ | 13.7M | -10% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.8M | ✅ | 23.4M | -16% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.3M | ✅ | 15.6M | 🟢 **-23%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ✅ | 17.5M | -12% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 11.5M | 🔴 **+48%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.1M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.0M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 49.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.9M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.3M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 71.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.4M | ✅ | 46.0M | 🟢 **-45%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.0M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.4M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 24.6M | ✅ | 20.1M | -18% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.5M | ✅ | 22.8M | 🔴 **+23%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.2M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 61.7M | ✅ | 45.4M | 🟢 **-26%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 51.2M | ✅ | 33.8M | 🟢 **-34%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 51.0M | ✅ | 46.8M | -8% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 50.9M | ✅ | 45.6M | -10% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 73.1M | ✅ | 53.1M | 🟢 **-27%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.5M | ✅ | 45.2M | -14% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.5M | ❌ | - | - |
