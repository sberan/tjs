# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | ajv pass | ajv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 27.4M | 172/199 | 13.3M | 172 | 🟢 **-52%** |
| draft6 | 276 | ✅ 276 | 29.7M | 269/276 | 14.8M | 269 | 🟢 **-50%** |
| draft7 | 313 | ✅ 313 | 16.1M | 296/313 | 13.2M | 296 | -18% |
| draft2019-09 | 435 | ✅ 435 | 18.5M | 413/435 | 6.6M | 413 | 🟢 **-64%** |
| draft2020-12 | 448 | ✅ 448 | 19.3M | 398/448 | 6.7M | 398 | 🟢 **-65%** |
| **Total** | 1671 | 1670/1671 | 20.1M | 1548/1671 | 8.9M | 1548 | 🟢 **-56%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **3.00x faster** (38 ns vs 113 ns per test, 6602 tests in 1548 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.0M | ✅ | 7.3M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.6M | ✅ | 74.6M | 🟢 **-53%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.1M | ✅ | 49.4M | 🟢 **-63%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.5M | ✅ | 64.2M | 🟢 **-63%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 122.2M | ✅ | 36.7M | 🟢 **-70%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 38.1M | ✅ | 26.6M | 🟢 **-30%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 55.1M | ✅ | 38.1M | 🟢 **-31%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 63.5M | ✅ | 22.1M | 🟢 **-65%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ✅ | 74.6M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 49.1M | ✅ | 33.7M | 🟢 **-31%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 47.3M | ✅ | 23.0M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 34.9M | ✅ | 17.2M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 50.2M | ✅ | 13.8M | 🟢 **-72%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.5M | ✅ | 73.0M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.2M | ✅ | 8.3M | 🟢 **-79%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 49.7M | ✅ | 46.6M | -6% |
| allOf.json | allOf | 4 | ✅ | 73.8M | ✅ | 34.9M | 🟢 **-53%** |
| allOf.json | allOf with base schema | 5 | ✅ | 24.4M | ✅ | 25.3M | +4% |
| allOf.json | allOf simple types | 2 | ✅ | 113.7M | ✅ | 46.1M | 🟢 **-59%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.9M | ✅ | 74.5M | 🟢 **-53%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.9M | ✅ | 73.6M | 🟢 **-54%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 50.6M | -19% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 49.7M | 🟢 **-57%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 50.9M | 🟢 **-21%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.9M | ✅ | 5.0M | 🟢 **-94%** |
| anyOf.json | anyOf | 4 | ✅ | 66.7M | ✅ | 25.4M | 🟢 **-62%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 56.7M | ✅ | 20.2M | 🟢 **-64%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.0M | ✅ | 27.4M | 🟢 **-43%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 69.1M | 🟢 **-60%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 27.8M | 🟢 **-57%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 60.0M | 🟢 **-41%** |
| default.json | invalid string value for default | 2 | ✅ | 52.0M | ✅ | 49.4M | -5% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.9M | ✅ | 44.4M | 🟢 **-44%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 99.3M | ✅ | 49.6M | 🟢 **-50%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.7M | ✅ | 33.9M | +10% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.9M | ✅ | 36.0M | 🟢 **-39%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.0M | ✅ | 22.0M | 🔴 **+23%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.2M | ✅ | 39.6M | 🟢 **-26%** |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 49.3M | 🟢 **-22%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 18.3M | 🟢 **-70%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.0M | ✅ | 44.8M | 🟢 **-33%** |
| enum.json | enums in properties | 6 | ✅ | 49.5M | ✅ | 33.6M | 🟢 **-32%** |
| enum.json | enum with escaped characters | 3 | ✅ | 51.4M | ✅ | 27.1M | 🟢 **-47%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 109.3M | ✅ | 39.2M | 🟢 **-64%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.1M | ✅ | 26.8M | 🟢 **-50%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.8M | ✅ | 39.3M | 🟢 **-64%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ✅ | 26.6M | 🟢 **-51%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 51.7M | 🟢 **-55%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 60.3M | ✅ | 28.8M | 🟢 **-52%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.4M | ✅ | 43.9M | 🟢 **-62%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.5M | ✅ | 28.5M | 🟢 **-51%** |
| enum.json | nul characters in strings | 2 | ✅ | 82.5M | ✅ | 39.6M | 🟢 **-52%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 48.5M | ✅ | 43.1M | -11% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ✅ | 41.1M | 🟢 **-55%** |
| format.json | email format | 6 | ✅ | 79.2M | ✅ | 54.9M | 🟢 **-31%** |
| format.json | ipv4 format | 6 | ✅ | 155.1M | ✅ | 54.2M | 🟢 **-65%** |
| format.json | ipv6 format | 6 | ✅ | 88.3M | ✅ | 54.6M | 🟢 **-38%** |
| format.json | hostname format | 6 | ✅ | 162.8M | ✅ | 54.7M | 🟢 **-66%** |
| format.json | date-time format | 6 | ✅ | 81.3M | ✅ | 55.4M | 🟢 **-32%** |
| format.json | uri format | 6 | ✅ | 162.7M | ✅ | 55.1M | 🟢 **-66%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.3M | ✅ | 36.3M | -5% |
| items.json | a schema given for items | 4 | ✅ | 89.0M | ✅ | 42.4M | 🟢 **-52%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.5M | ✅ | 48.9M | 🟢 **-25%** |
| items.json | items and subitems | 6 | ✅ | 35.0M | ✅ | 18.5M | 🟢 **-47%** |
| items.json | nested items | 3 | ✅ | 13.3M | ✅ | 10.8M | -19% |
| items.json | items with null instance elements | 1 | ✅ | 77.1M | ✅ | 67.4M | -13% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 68.3M | -18% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.4M | ✅ | 47.8M | 🟢 **-35%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.3M | ✅ | 47.6M | -18% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.6M | ✅ | 43.0M | -20% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 38.8M | ✅ | 31.2M | -20% |
| maximum.json | maximum validation | 4 | ✅ | 62.7M | ✅ | 46.3M | 🟢 **-26%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.5M | ✅ | 44.8M | 🟢 **-34%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 34.1M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 59.1M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.2M | ✅ | 47.6M | 🟢 **-35%** |
| minLength.json | minLength validation | 5 | ✅ | 52.7M | ✅ | 43.7M | -17% |
| minProperties.json | minProperties validation | 6 | ✅ | 53.8M | ✅ | 37.3M | 🟢 **-31%** |
| minimum.json | minimum validation | 4 | ✅ | 61.0M | ✅ | 47.0M | 🟢 **-23%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 62.7M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 58.8M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.8M | ✅ | 46.5M | 🟢 **-28%** |
| multipleOf.json | by int | 3 | ✅ | 66.8M | ✅ | 40.3M | 🟢 **-40%** |
| multipleOf.json | by number | 3 | ✅ | 58.9M | ✅ | 42.1M | 🟢 **-28%** |
| multipleOf.json | by small number | 2 | ✅ | 28.2M | ✅ | 41.3M | 🔴 **+46%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 8.8M | 🟢 **-80%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 9.0M | 🟢 **-87%** |
| not.json | not | 2 | ✅ | 62.5M | ✅ | 41.4M | 🟢 **-34%** |
| not.json | not multiple types | 3 | ✅ | 55.3M | ✅ | 25.4M | 🟢 **-54%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 39.5M | 🟢 **-32%** |
| not.json | forbidden property | 2 | ✅ | 40.2M | ✅ | 39.5M | -2% |
| not.json | forbid everything with empty schema | 9 | ✅ | 46.3M | ✅ | 39.2M | -15% |
| not.json | double negation | 1 | ✅ | 159.4M | ✅ | 74.1M | 🟢 **-54%** |
| oneOf.json | oneOf | 4 | ✅ | 53.0M | ✅ | 20.6M | 🟢 **-61%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.8M | ✅ | 13.5M | 🟢 **-62%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.2M | ✅ | 21.3M | 🟢 **-47%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 58.6M | ✅ | 36.7M | 🟢 **-37%** |
| oneOf.json | oneOf with required | 4 | ✅ | 40.1M | ✅ | 17.2M | 🟢 **-57%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.2M | ✅ | 21.7M | 🟢 **-50%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 27.3M | 🟢 **-56%** |
| pattern.json | pattern validation | 8 | ✅ | 50.3M | ✅ | 44.8M | -11% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.0M | ✅ | 27.2M | +13% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.0M | ✅ | 13.1M | 🟢 **-50%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 7.7M | 🟢 **-48%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.1M | ✅ | 8.0M | 🟢 **-53%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.0M | ✅ | 21.5M | 🔴 **+26%** |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ✅ | 40.2M | -19% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.7M | ✅ | 9.3M | 🟢 **-53%** |
| properties.json | properties with escaped characters | 2 | ✅ | 41.9M | ✅ | 43.1M | +3% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 51.3M | ✅ | 60.4M | +18% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.8M | ✅ | 20.8M | -13% |
| ref.json | relative pointer ref to object | 2 | ✅ | 40.3M | ✅ | 43.8M | +9% |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.0M | ✅ | 45.3M | -11% |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 40.7M | +1% |
| ref.json | nested refs | 2 | ✅ | 47.3M | ✅ | 48.0M | +1% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.2M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 58.4M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.9M | ✅ | 43.9M | -6% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 43.7M | -6% |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.2M | ✅ | 44.4M | -4% |
| ref.json | Location-independent identifier | 2 | ✅ | 62.9M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 58.6M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 48.6M | ✅ | 17.1M | 🟢 **-65%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 58.7M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 50.3M | -19% |
| refRemote.json | remote ref | 2 | ✅ | 59.3M | ✅ | 49.3M | -17% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 58.8M | ✅ | 48.5M | -18% |
| refRemote.json | ref within remote ref | 2 | ✅ | 58.7M | ✅ | 49.7M | -15% |
| refRemote.json | base URI change | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 56.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.1M | ✅ | 49.2M | -15% |
| required.json | required default validation | 1 | ✅ | 158.8M | ✅ | 74.6M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 44.2M | ✅ | 38.7M | -12% |
| required.json | required properties whose names are J... | 7 | ✅ | 25.1M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 50.1M | ✅ | 39.3M | 🟢 **-22%** |
| type.json | number type matches numbers | 9 | ✅ | 54.6M | ✅ | 44.1M | -19% |
| type.json | string type matches strings | 9 | ✅ | 54.6M | ✅ | 36.9M | 🟢 **-32%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 40.3M | -13% |
| type.json | array type matches arrays | 7 | ✅ | 51.6M | ✅ | 36.9M | 🟢 **-28%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 44.4M | -14% |
| type.json | null type matches only the null object | 10 | ✅ | 48.8M | ✅ | 42.6M | -13% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.4M | ✅ | 37.8M | 🟢 **-26%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 50.5M | -19% |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 40.9M | 🟢 **-27%** |
| type.json | type: array, object or null | 5 | ✅ | 62.3M | ✅ | 45.2M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ✅ | 10.6M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ✅ | 19.5M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ✅ | 30.2M | 🔴 **+64%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.5M | ✅ | 54.0M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.0M | ✅ | 54.5M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.4M | ✅ | 49.3M | 🟢 **-29%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 14.2M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 69.1M | -18% |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 39.7M | -17% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.1M | ✅ | 68.1M | -12% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 67.9M | -12% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 52.9M | ✅ | 27.6M | 🟢 **-48%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.0M | ✅ | 27.8M | 🔴 **+46%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 27.9M | +10% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 27.5M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 27.2M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 29.1M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.9M | ✅ | 27.6M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.1M | ✅ | 27.8M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 30.7M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 25.2M | -9% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.4M | ✅ | 17.7M | +7% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.2M | ✅ | 13.8M | -2% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.0M | ✅ | 13.9M | -1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ✅ | 27.0M | +3% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.3M | ✅ | 21.8M | +2% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.9M | ✅ | 23.3M | +2% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.8M | ✅ | 20.8M | +5% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.3M | ✅ | 21.8M | +8% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 9.5M | +18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 8.8M | +1% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.2M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.1M | ✅ | 2.8M | 🟢 **-88%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.9M | ✅ | 22.0M | 🔴 **+23%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.5M | ✅ | 29.2M | -15% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ✅ | 2.8M | 🟢 **-83%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.4M | ✅ | 55.9M | 🟢 **-32%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.3M | 🟢 **-30%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.3M | ✅ | 26.6M | -2% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.2M | ✅ | 8.2M | 🟢 **-49%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 62.0M | ✅ | 7.2M | 🟢 **-88%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 39.4M | ✅ | 33.2M | -16% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.3M | ✅ | 69.2M | 🟢 **-57%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 75.7M | ✅ | 46.1M | 🟢 **-39%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.1M | ✅ | 66.2M | 🟢 **-61%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 61.0M | 🟢 **-27%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 28.7M | ✅ | 27.3M | -5% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.8M | ✅ | 33.0M | 🟢 **-26%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.5M | ✅ | 43.4M | 🟢 **-60%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.5M | ✅ | 69.5M | 🟢 **-56%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 65.8M | ✅ | 26.7M | 🟢 **-59%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.0M | ✅ | 23.1M | 🟢 **-28%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 48.0M | ✅ | 16.6M | 🟢 **-65%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.6M | ✅ | 9.2M | 🟢 **-74%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 69.6M | 🟢 **-56%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 7.9M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 44.5M | 🟢 **-33%** |
| allOf.json | allOf | 4 | ✅ | 34.2M | ✅ | 32.5M | -5% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 24.0M | 🟢 **-21%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.4M | ✅ | 45.9M | 🟢 **-24%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 69.4M | 🟢 **-56%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ✅ | 38.1M | 🟢 **-24%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 89.5M | ✅ | 38.2M | 🟢 **-57%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.6M | ✅ | 69.4M | 🟢 **-57%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 68.4M | 🟢 **-57%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.2M | ✅ | 46.7M | 🟢 **-25%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 112.8M | ✅ | 47.6M | 🟢 **-58%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.1M | ✅ | 47.0M | 🟢 **-27%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 80.9M | ✅ | 4.7M | 🟢 **-94%** |
| anyOf.json | anyOf | 4 | ✅ | 66.6M | ✅ | 26.6M | 🟢 **-60%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 47.7M | ✅ | 19.8M | 🟢 **-58%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 65.8M | 🟢 **-59%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.6M | ✅ | 67.5M | 🟢 **-58%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 18.0M | 🟢 **-64%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.5M | ✅ | 31.7M | 🟢 **-57%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 64.5M | 🟢 **-62%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 115.1M | ✅ | 25.2M | 🟢 **-78%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 181.8M | ✅ | 52.9M | 🟢 **-71%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 84.0M | ✅ | 37.2M | 🟢 **-56%** |
| const.json | const validation | 3 | ✅ | 55.2M | ✅ | 34.6M | 🟢 **-37%** |
| const.json | const with object | 4 | ✅ | 50.1M | ✅ | 15.0M | 🟢 **-70%** |
| const.json | const with array | 3 | ✅ | 49.5M | ✅ | 15.6M | 🟢 **-68%** |
| const.json | const with null | 2 | ✅ | 153.8M | ✅ | 46.9M | 🟢 **-69%** |
| const.json | const with false does not match 0 | 3 | ✅ | 58.1M | ✅ | 35.7M | 🟢 **-39%** |
| const.json | const with true does not match 1 | 3 | ✅ | 103.2M | ✅ | 35.6M | 🟢 **-65%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 53.9M | ✅ | 25.5M | 🟢 **-53%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 90.9M | ✅ | 25.8M | 🟢 **-72%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.7M | ✅ | 12.6M | 🟢 **-76%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.3M | ✅ | 12.4M | 🟢 **-87%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ✅ | 42.0M | 🟢 **-21%** |
| const.json | const with 1 does not match true | 3 | ✅ | 114.2M | ✅ | 41.7M | 🟢 **-63%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ✅ | 37.0M | 🟢 **-34%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 109.1M | ✅ | 38.3M | 🟢 **-65%** |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 44.7M | -19% |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ✅ | 42.8M | 🟢 **-45%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ✅ | 45.2M | -20% |
| contains.json | contains keyword validation | 6 | ✅ | 103.2M | ✅ | 17.5M | 🟢 **-83%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ✅ | 13.8M | 🟢 **-76%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 103.9M | ✅ | 44.8M | 🟢 **-57%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.6M | ✅ | 29.4M | 🟢 **-49%** |
| contains.json | items + contains | 4 | ✅ | 63.7M | ✅ | 7.0M | 🟢 **-89%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.7M | ✅ | 61.7M | 🟢 **-24%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 55.1M | 🟢 **-46%** |
| default.json | invalid string value for default | 2 | ✅ | 52.4M | ✅ | 46.5M | -11% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.0M | ✅ | 41.2M | 🟢 **-47%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.7M | ✅ | 1.5M | 🟢 **-86%** |
| dependencies.json | dependencies | 7 | ✅ | 94.0M | ✅ | 45.9M | 🟢 **-51%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.2M | ✅ | 60.3M | 🟢 **-66%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.4M | ✅ | 33.5M | -15% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 39.7M | ✅ | 38.1M | -4% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 84.3M | ✅ | 39.6M | 🟢 **-53%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.4M | ✅ | 21.4M | +16% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.3M | ✅ | 37.6M | 🟢 **-29%** |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 46.1M | 🟢 **-27%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.3M | ✅ | 11.4M | 🟢 **-81%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.0M | ✅ | 41.9M | 🟢 **-37%** |
| enum.json | enums in properties | 6 | ✅ | 56.6M | ✅ | 35.3M | 🟢 **-38%** |
| enum.json | enum with escaped characters | 3 | ✅ | 70.2M | ✅ | 41.9M | 🟢 **-40%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 107.3M | ✅ | 35.2M | 🟢 **-67%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.0M | ✅ | 21.0M | 🟢 **-61%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 105.1M | ✅ | 35.3M | 🟢 **-66%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.0M | ✅ | 20.9M | 🟢 **-61%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.2M | ✅ | 41.4M | 🟢 **-64%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.2M | ✅ | 23.0M | 🟢 **-61%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 104.3M | ✅ | 41.3M | 🟢 **-60%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ✅ | 22.6M | 🟢 **-62%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.7M | ✅ | 43.4M | 🟢 **-51%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 57.7M | ✅ | 38.6M | 🟢 **-33%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.2M | ✅ | 37.3M | 🟢 **-67%** |
| format.json | email format | 6 | ✅ | 88.2M | ✅ | 52.6M | 🟢 **-40%** |
| format.json | ipv4 format | 6 | ✅ | 161.9M | ✅ | 53.3M | 🟢 **-67%** |
| format.json | ipv6 format | 6 | ✅ | 88.3M | ✅ | 48.5M | 🟢 **-45%** |
| format.json | hostname format | 6 | ✅ | 162.5M | ✅ | 52.9M | 🟢 **-67%** |
| format.json | date-time format | 6 | ✅ | 88.1M | ✅ | 52.0M | 🟢 **-41%** |
| format.json | json-pointer format | 6 | ✅ | 162.5M | ✅ | 52.8M | 🟢 **-67%** |
| format.json | uri format | 6 | ✅ | 87.9M | ✅ | 53.2M | 🟢 **-39%** |
| format.json | uri-reference format | 6 | ✅ | 162.0M | ✅ | 52.7M | 🟢 **-67%** |
| format.json | uri-template format | 6 | ✅ | 88.2M | ✅ | 52.9M | 🟢 **-40%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.7M | ✅ | 33.2M | 🟢 **-42%** |
| items.json | a schema given for items | 4 | ✅ | 59.3M | ✅ | 40.7M | 🟢 **-31%** |
| items.json | an array of schemas for items | 6 | ✅ | 108.6M | ✅ | 47.0M | 🟢 **-57%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.3M | ✅ | 64.0M | 🟢 **-62%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 102.3M | ✅ | 33.5M | 🟢 **-67%** |
| items.json | items with boolean schemas | 3 | ✅ | 60.0M | ✅ | 40.8M | 🟢 **-32%** |
| items.json | items and subitems | 6 | ✅ | 28.8M | ✅ | 21.2M | 🟢 **-26%** |
| items.json | nested items | 3 | ✅ | 12.9M | ✅ | 11.5M | -11% |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.0M | ✅ | 47.3M | 🟢 **-39%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 81.2M | ✅ | 63.2M | 🟢 **-22%** |
| maxItems.json | maxItems validation | 4 | ✅ | 66.9M | ✅ | 44.3M | 🟢 **-34%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.0M | ✅ | 46.3M | 🟢 **-27%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.7M | ✅ | 34.7M | 🟢 **-41%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.6M | ✅ | 40.8M | 🟢 **-21%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.6M | ✅ | 40.2M | 🟢 **-25%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.8M | ✅ | 29.9M | 🟢 **-28%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 38.7M | ✅ | 33.5M | -13% |
| maximum.json | maximum validation | 4 | ✅ | 62.6M | ✅ | 44.2M | 🟢 **-29%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.5M | ✅ | 44.0M | 🟢 **-35%** |
| minItems.json | minItems validation | 4 | ✅ | 71.9M | ✅ | 44.8M | 🟢 **-38%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.1M | ✅ | 45.5M | 🟢 **-28%** |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ✅ | 38.1M | 🟢 **-28%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 51.8M | ✅ | 35.0M | 🟢 **-32%** |
| minProperties.json | minProperties validation | 6 | ✅ | 54.8M | ✅ | 41.2M | 🟢 **-25%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.3M | ✅ | 19.9M | 🟢 **-54%** |
| minimum.json | minimum validation | 4 | ✅ | 68.6M | ✅ | 43.1M | 🟢 **-37%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.6M | ✅ | 44.4M | 🟢 **-31%** |
| multipleOf.json | by int | 3 | ✅ | 69.3M | ✅ | 24.8M | 🟢 **-64%** |
| multipleOf.json | by number | 3 | ✅ | 63.9M | ✅ | 40.3M | 🟢 **-37%** |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ✅ | 39.2M | 🟢 **-31%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 8.9M | 🟢 **-79%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 8.6M | 🟢 **-88%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 39.5M | 🟢 **-37%** |
| not.json | not multiple types | 3 | ✅ | 54.3M | ✅ | 32.6M | 🟢 **-40%** |
| not.json | not more complex schema | 3 | ✅ | 57.8M | ✅ | 28.4M | 🟢 **-51%** |
| not.json | forbidden property | 2 | ✅ | 46.0M | ✅ | 36.7M | 🟢 **-20%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.0M | ✅ | 37.2M | 🟢 **-23%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 48.6M | ✅ | 37.1M | 🟢 **-24%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 174.6M | ✅ | 56.3M | 🟢 **-68%** |
| not.json | double negation | 1 | ✅ | 159.1M | ✅ | 47.0M | 🟢 **-70%** |
| oneOf.json | oneOf | 4 | ✅ | 50.5M | ✅ | 20.5M | 🟢 **-59%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.9M | ✅ | 24.4M | 🟢 **-24%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ✅ | 31.7M | 🟢 **-36%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.5M | ✅ | 21.4M | 🟢 **-87%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 29.1M | 🟢 **-42%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 16.2M | 🟢 **-68%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.2M | ✅ | 10.8M | 🟢 **-73%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 45.0M | ✅ | 32.3M | 🟢 **-28%** |
| oneOf.json | oneOf with required | 4 | ✅ | 39.9M | ✅ | 8.8M | 🟢 **-78%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.4M | ✅ | 23.8M | 🟢 **-45%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.2M | ✅ | 25.4M | 🟢 **-59%** |
| pattern.json | pattern validation | 8 | ✅ | 52.7M | ✅ | 42.0M | 🟢 **-20%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 29.5M | 🟢 **-39%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 13.1M | 🟢 **-49%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ✅ | 7.2M | 🟢 **-52%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.0M | ✅ | 7.7M | 🟢 **-55%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.7M | ✅ | 8.4M | 🟢 **-60%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 10.6M | 🟢 **-40%** |
| properties.json | object properties validation | 6 | ✅ | 49.9M | ✅ | 40.3M | -19% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 8.9M | 🟢 **-56%** |
| properties.json | properties with boolean schema | 4 | ✅ | 40.8M | ✅ | 36.3M | -11% |
| properties.json | properties with escaped characters | 2 | ✅ | 44.6M | ✅ | 35.7M | 🟢 **-20%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.7M | ✅ | 56.7M | -12% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.1M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.7M | ✅ | 31.6M | 🟢 **-29%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 17.9M | ✅ | 16.7M | -7% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 156.9M | ✅ | 61.0M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.6M | ✅ | 27.3M | 🟢 **-36%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.6M | ✅ | 31.0M | 🟢 **-22%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ✅ | 32.6M | 🟢 **-23%** |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ✅ | 21.0M | -13% |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.9M | ✅ | 40.6M | -12% |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.1M | ✅ | 42.1M | -18% |
| ref.json | escaped pointer ref | 6 | ✅ | 39.7M | ✅ | 39.1M | -1% |
| ref.json | nested refs | 2 | ✅ | 47.3M | ✅ | 45.2M | -4% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 60.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.8M | ✅ | 5.0M | 🟢 **-81%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.3M | ✅ | 36.8M | 🟢 **-21%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.0M | ✅ | 36.2M | 🟢 **-21%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.6M | ✅ | 69.8M | 🟢 **-56%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.8M | ✅ | 38.3M | 🟢 **-23%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ✅ | 7.5M | -18% |
| ref.json | refs with quote | 2 | ✅ | 46.6M | ✅ | 40.7M | -13% |
| ref.json | Location-independent identifier | 2 | ✅ | 59.3M | ✅ | 44.8M | 🟢 **-24%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.8M | ✅ | 41.0M | 🟢 **-31%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.9M | ✅ | 47.7M | 🟢 **-20%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 46.6M | ✅ | 14.0M | 🟢 **-70%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ✅ | 33.1M | -10% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ✅ | 31.9M | -13% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 23.9M | 🟢 **-29%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.9M | ✅ | 40.3M | -14% |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.9M | ✅ | 40.0M | -15% |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.9M | ✅ | 36.9M | 🟢 **-21%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.9M | ✅ | 41.4M | -12% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.8M | ✅ | 41.1M | -12% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.6M | ✅ | 41.0M | -14% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.7M | ✅ | 47.5M | 🟢 **-20%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.1M | ✅ | 46.6M | 🟢 **-25%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 60.8M | ✅ | 46.4M | 🟢 **-24%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.2M | ✅ | 48.5M | 🟢 **-22%** |
| refRemote.json | remote ref | 2 | ✅ | 59.4M | ✅ | 46.0M | 🟢 **-23%** |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.3M | ✅ | 46.2M | 🟢 **-22%** |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.6M | ✅ | 44.2M | 🟢 **-26%** |
| refRemote.json | base URI change | 2 | ✅ | 30.4M | ✅ | 27.2M | -11% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.9M | ✅ | 19.8M | 🟢 **-40%** |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ✅ | 27.4M | 🟢 **-30%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.2M | ✅ | 12.2M | 🟢 **-68%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 47.7M | ✅ | 35.8M | 🟢 **-25%** |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.4M | ✅ | 39.0M | -18% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.0M | ✅ | 28.4M | 🟢 **-31%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 47.4M | ✅ | 38.8M | -18% |
| required.json | required validation | 5 | ✅ | 58.1M | ✅ | 45.4M | 🟢 **-22%** |
| required.json | required default validation | 1 | ✅ | 159.6M | ✅ | 69.8M | 🟢 **-56%** |
| required.json | required with empty array | 1 | ✅ | 159.2M | ✅ | 69.8M | 🟢 **-56%** |
| required.json | required with escaped characters | 2 | ✅ | 44.5M | ✅ | 33.5M | 🟢 **-25%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.0M | ✅ | 39.6M | 🟢 **-24%** |
| type.json | number type matches numbers | 9 | ✅ | 55.0M | ✅ | 36.9M | 🟢 **-33%** |
| type.json | string type matches strings | 9 | ✅ | 54.4M | ✅ | 44.2M | -19% |
| type.json | object type matches objects | 7 | ✅ | 45.1M | ✅ | 39.5M | -12% |
| type.json | array type matches arrays | 7 | ✅ | 51.0M | ✅ | 40.6M | 🟢 **-20%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 42.6M | -18% |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ✅ | 40.8M | -16% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.4M | ✅ | 38.0M | 🟢 **-26%** |
| type.json | type as array with one item | 2 | ✅ | 71.2M | ✅ | 46.7M | 🟢 **-34%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 37.0M | 🟢 **-33%** |
| type.json | type: array, object or null | 5 | ✅ | 60.9M | ✅ | 41.1M | 🟢 **-32%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.7M | ✅ | 10.6M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ✅ | 22.0M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ✅ | 25.0M | 🔴 **+35%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ✅ | 52.2M | 🟢 **-68%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ✅ | 52.2M | 🟢 **-31%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.6M | ✅ | 45.6M | 🟢 **-37%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 14.2M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 65.1M | 🟢 **-23%** |
| optional/bignum.json | string | 1 | ✅ | 43.9M | ✅ | 38.4M | -12% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 63.7M | -17% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 37.4M | -18% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.1M | ✅ | 64.3M | -17% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 37.3M | -18% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 59.9M | ✅ | 19.1M | 🟢 **-68%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.4M | ✅ | 26.2M | +3% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 26.3M | +4% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.5M | ✅ | 26.2M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 22.5M | ✅ | 25.8M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.6M | ✅ | 27.6M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.7M | ✅ | 25.2M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.9M | ✅ | 26.2M | -2% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.9M | ✅ | 28.6M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.5M | ✅ | 24.9M | -10% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.2M | ✅ | 17.3M | +7% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.1M | ✅ | 13.9M | -2% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 11.2M | ✅ | 12.8M | +14% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.6M | ✅ | 25.8M | +5% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.7M | ✅ | 22.6M | +14% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.6M | ✅ | 22.6M | -4% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.9M | ✅ | 20.7M | +4% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.8M | ✅ | 19.9M | -5% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 9.4M | +18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ✅ | 8.9M | +4% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.1M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.0M | ✅ | 21.5M | +20% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.4M | ✅ | 29.4M | 🟢 **-22%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ✅ | 2.8M | 🟢 **-83%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.1M | ✅ | 25.0M | -17% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.1M | ✅ | 53.1M | 🟢 **-35%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ✅ | 9.2M | -5% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.9M | ✅ | 15.4M | -9% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.1M | ✅ | 4.3M | 🟢 **-30%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 39.9M | ✅ | 14.1M | 🟢 **-65%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 42.3M | ✅ | 10.3M | 🟢 **-76%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 43.3M | ✅ | 9.7M | 🟢 **-78%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.5M | ✅ | 24.0M | -13% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.6M | ✅ | 9.1M | 🟢 **-45%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.1M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 68.1M | ✅ | 7.2M | 🟢 **-89%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 39.1M | ✅ | 34.4M | -12% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.5M | ✅ | 73.5M | 🟢 **-54%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 77.0M | ✅ | 30.8M | 🟢 **-60%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 64.3M | 🟢 **-63%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 66.7M | -20% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 26.7M | 🟢 **-53%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 46.8M | ✅ | 35.8M | 🟢 **-24%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 41.9M | 🟢 **-61%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.3M | ✅ | 73.4M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 66.6M | ✅ | 35.9M | 🟢 **-46%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.8M | ✅ | 23.3M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.5M | ✅ | 17.2M | 🟢 **-65%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.8M | ✅ | 13.5M | 🟢 **-62%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ✅ | 74.4M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.8M | ✅ | 8.0M | 🟢 **-72%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 46.9M | 🟢 **-30%** |
| allOf.json | allOf | 4 | ✅ | 34.1M | ✅ | 35.7M | +5% |
| allOf.json | allOf with base schema | 5 | ✅ | 29.7M | ✅ | 10.1M | 🟢 **-66%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 40.7M | 🟢 **-33%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 73.2M | 🟢 **-54%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ✅ | 39.2M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 39.2M | 🟢 **-58%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 66.6M | 🟢 **-58%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 62.9M | 🟢 **-61%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 41.2M | 🟢 **-34%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.8M | ✅ | 46.2M | 🟢 **-60%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 40.9M | 🟢 **-37%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.0M | ✅ | 4.1M | 🟢 **-95%** |
| anyOf.json | anyOf | 4 | ✅ | 66.6M | ✅ | 25.4M | 🟢 **-62%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.8M | ✅ | 18.8M | 🟢 **-63%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 44.0M | 🟢 **-72%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 73.5M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 14.1M | 🟢 **-72%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.7M | ✅ | 31.7M | 🟢 **-58%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.5M | ✅ | 68.4M | 🟢 **-60%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 26.9M | 🟢 **-78%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.0M | ✅ | 54.9M | 🟢 **-70%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.2M | ✅ | 31.7M | 🟢 **-65%** |
| const.json | const validation | 3 | ✅ | 55.2M | ✅ | 37.5M | 🟢 **-32%** |
| const.json | const with object | 4 | ✅ | 50.1M | ✅ | 15.2M | 🟢 **-70%** |
| const.json | const with array | 3 | ✅ | 47.4M | ✅ | 16.8M | 🟢 **-64%** |
| const.json | const with null | 2 | ✅ | 117.8M | ✅ | 47.6M | 🟢 **-60%** |
| const.json | const with false does not match 0 | 3 | ✅ | 60.1M | ✅ | 39.0M | 🟢 **-35%** |
| const.json | const with true does not match 1 | 3 | ✅ | 107.9M | ✅ | 37.2M | 🟢 **-66%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ✅ | 22.8M | 🟢 **-58%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.4M | ✅ | 26.0M | 🟢 **-73%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 50.0M | ✅ | 12.7M | 🟢 **-75%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.1M | ✅ | 12.8M | 🟢 **-86%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ✅ | 39.8M | 🟢 **-25%** |
| const.json | const with 1 does not match true | 3 | ✅ | 114.3M | ✅ | 42.3M | 🟢 **-63%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.7M | ✅ | 40.6M | 🟢 **-27%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.4M | ✅ | 41.7M | 🟢 **-62%** |
| const.json | nul characters in strings | 2 | ✅ | 54.5M | ✅ | 40.6M | 🟢 **-26%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ✅ | 39.0M | 🟢 **-50%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 39.7M | 🟢 **-30%** |
| contains.json | contains keyword validation | 6 | ✅ | 103.6M | ✅ | 18.6M | 🟢 **-82%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ✅ | 12.9M | 🟢 **-78%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ✅ | 44.5M | 🟢 **-57%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 59.4M | ✅ | 31.1M | 🟢 **-48%** |
| contains.json | items + contains | 4 | ✅ | 64.4M | ✅ | 8.1M | 🟢 **-87%** |
| contains.json | contains with false if subschema | 2 | ✅ | 59.5M | ✅ | 46.7M | 🟢 **-22%** |
| contains.json | contains with null instance elements | 1 | ✅ | 129.2M | ✅ | 43.5M | 🟢 **-66%** |
| default.json | invalid type for default | 2 | ✅ | 68.1M | ✅ | 59.7M | -12% |
| default.json | invalid string value for default | 2 | ✅ | 71.3M | ✅ | 44.1M | 🟢 **-38%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.2M | ✅ | 44.2M | -10% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 13.2M | ✅ | 1.3M | 🟢 **-90%** |
| dependencies.json | dependencies | 7 | ✅ | 59.5M | ✅ | 49.0M | -18% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 171.0M | ✅ | 65.0M | 🟢 **-62%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.8M | ✅ | 33.8M | +10% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.5M | ✅ | 39.0M | -4% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 48.5M | ✅ | 42.2M | -13% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.9M | ✅ | 22.0M | 🔴 **+23%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.2M | ✅ | 39.0M | +2% |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 50.1M | 🟢 **-21%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.6M | ✅ | 10.9M | 🟢 **-74%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.1M | ✅ | 48.6M | 🟢 **-28%** |
| enum.json | enums in properties | 6 | ✅ | 38.0M | ✅ | 37.1M | -2% |
| enum.json | enum with escaped characters | 3 | ✅ | 71.4M | ✅ | 47.4M | 🟢 **-34%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 58.1M | ✅ | 39.1M | 🟢 **-33%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.1M | ✅ | 21.1M | 🟢 **-61%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 57.9M | ✅ | 38.8M | 🟢 **-33%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.7M | ✅ | 20.0M | 🟢 **-63%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.5M | ✅ | 49.3M | 🟢 **-27%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.2M | ✅ | 22.2M | 🟢 **-62%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.5M | ✅ | 49.2M | 🟢 **-27%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ✅ | 22.4M | 🟢 **-62%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 45.9M | -17% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.0M | ✅ | 41.9M | 🟢 **-30%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 59.7M | ✅ | 41.4M | 🟢 **-31%** |
| format.json | email format | 6 | ✅ | 88.4M | ✅ | 55.3M | 🟢 **-37%** |
| format.json | idn-email format | 6 | ✅ | 88.5M | ✅ | 55.2M | 🟢 **-38%** |
| format.json | regex format | 6 | ✅ | 88.5M | ✅ | 54.2M | 🟢 **-39%** |
| format.json | ipv4 format | 6 | ✅ | 88.4M | ✅ | 55.0M | 🟢 **-38%** |
| format.json | ipv6 format | 6 | ✅ | 88.3M | ✅ | 55.1M | 🟢 **-38%** |
| format.json | idn-hostname format | 6 | ✅ | 87.3M | ✅ | 55.3M | 🟢 **-37%** |
| format.json | hostname format | 6 | ✅ | 88.3M | ✅ | 55.4M | 🟢 **-37%** |
| format.json | date format | 6 | ✅ | 88.2M | ✅ | 55.6M | 🟢 **-37%** |
| format.json | date-time format | 6 | ✅ | 88.2M | ✅ | 50.1M | 🟢 **-43%** |
| format.json | time format | 6 | ✅ | 88.5M | ✅ | 53.3M | 🟢 **-40%** |
| format.json | json-pointer format | 6 | ✅ | 88.4M | ✅ | 55.3M | 🟢 **-37%** |
| format.json | relative-json-pointer format | 6 | ✅ | 88.3M | ✅ | 55.4M | 🟢 **-37%** |
| format.json | iri format | 6 | ✅ | 88.4M | ✅ | 55.7M | 🟢 **-37%** |
| format.json | iri-reference format | 6 | ✅ | 88.5M | ✅ | 53.9M | 🟢 **-39%** |
| format.json | uri format | 6 | ✅ | 88.2M | ✅ | 54.9M | 🟢 **-38%** |
| format.json | uri-reference format | 6 | ✅ | 88.5M | ✅ | 55.2M | 🟢 **-38%** |
| format.json | uri-template format | 6 | ✅ | 88.0M | ✅ | 55.2M | 🟢 **-37%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.9M | ✅ | 68.7M | 🟢 **-60%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.9M | ✅ | 68.6M | 🟢 **-60%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 170.9M | ✅ | 67.6M | 🟢 **-60%** |
| if-then-else.json | if and then without else | 3 | ✅ | 67.7M | ✅ | 43.0M | 🟢 **-36%** |
| if-then-else.json | if and else without then | 3 | ✅ | 69.1M | ✅ | 38.0M | 🟢 **-45%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.2M | ✅ | 36.7M | 🟢 **-40%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.8M | ✅ | 68.8M | 🟢 **-60%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 61.5M | ✅ | 48.3M | 🟢 **-21%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ✅ | 46.9M | 🟢 **-27%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.7M | ✅ | 32.7M | 🟢 **-23%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.7M | ✅ | 37.9M | -2% |
| items.json | a schema given for items | 4 | ✅ | 55.6M | ✅ | 43.3M | 🟢 **-22%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.5M | ✅ | 50.1M | 🟢 **-24%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.7M | ✅ | 68.8M | 🟢 **-60%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ✅ | 43.2M | 🟢 **-31%** |
| items.json | items with boolean schemas | 3 | ✅ | 62.3M | ✅ | 44.3M | 🟢 **-29%** |
| items.json | items and subitems | 6 | ✅ | 28.7M | ✅ | 21.5M | 🟢 **-25%** |
| items.json | nested items | 3 | ✅ | 13.2M | ✅ | 11.8M | -10% |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 48.6M | 🟢 **-37%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 68.3M | -18% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 48.3M | 🟢 **-35%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 48.6M | 🟢 **-23%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.1M | ✅ | 48.2M | -18% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.7M | ✅ | 43.5M | -16% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.0M | ✅ | 42.5M | 🟢 **-21%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.9M | ✅ | 33.8M | -17% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.7M | ✅ | 35.7M | -16% |
| maximum.json | maximum validation | 4 | ✅ | 73.9M | ✅ | 47.5M | 🟢 **-36%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 45.6M | 🟢 **-33%** |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ✅ | 48.1M | 🟢 **-35%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 47.3M | 🟢 **-26%** |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ✅ | 43.7M | -18% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.0M | ✅ | 43.7M | -16% |
| minProperties.json | minProperties validation | 6 | ✅ | 55.0M | ✅ | 42.6M | 🟢 **-22%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.2M | ✅ | 32.6M | 🟢 **-23%** |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ✅ | 45.7M | 🟢 **-34%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.5M | ✅ | 47.2M | 🟢 **-27%** |
| multipleOf.json | by int | 3 | ✅ | 69.3M | ✅ | 43.5M | 🟢 **-37%** |
| multipleOf.json | by number | 3 | ✅ | 60.6M | ✅ | 42.5M | 🟢 **-30%** |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 40.6M | 🟢 **-29%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 7.5M | 🟢 **-83%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 9.2M | 🟢 **-87%** |
| not.json | not | 2 | ✅ | 59.2M | ✅ | 42.6M | 🟢 **-28%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 37.4M | 🟢 **-33%** |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ✅ | 39.3M | 🟢 **-33%** |
| not.json | forbidden property | 2 | ✅ | 46.2M | ✅ | 43.8M | -5% |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 39.1M | 🟢 **-20%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.1M | ✅ | 31.7M | 🟢 **-35%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.9M | ✅ | 54.8M | 🟢 **-69%** |
| not.json | double negation | 1 | ✅ | 159.2M | ✅ | 73.4M | 🟢 **-54%** |
| oneOf.json | oneOf | 4 | ✅ | 45.6M | ✅ | 21.6M | 🟢 **-53%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.0M | ✅ | 26.2M | 🟢 **-21%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 35.2M | 🟢 **-29%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ✅ | 24.4M | 🟢 **-85%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.7M | ✅ | 35.9M | 🟢 **-28%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 16.8M | 🟢 **-66%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ✅ | 20.8M | 🟢 **-48%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.8M | ✅ | 30.9M | 🟢 **-50%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.2M | ✅ | 16.4M | 🟢 **-60%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ✅ | 20.3M | 🟢 **-53%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 26.4M | 🟢 **-58%** |
| pattern.json | pattern validation | 8 | ✅ | 51.6M | ✅ | 44.5M | -14% |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 30.8M | 🟢 **-36%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 21.9M | ✅ | 14.1M | 🟢 **-36%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.9M | ✅ | 7.2M | 🟢 **-48%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.1M | ✅ | 8.1M | 🟢 **-46%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ✅ | 8.9M | 🟢 **-58%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.3M | ✅ | 21.2M | 🔴 **+22%** |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ✅ | 44.1M | -11% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 9.4M | 🟢 **-52%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.7M | ✅ | 40.6M | -5% |
| properties.json | properties with escaped characters | 2 | ✅ | 44.9M | ✅ | 43.1M | -4% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 60.5M | -7% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.6M | ✅ | 29.7M | 🟢 **-33%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ✅ | 17.0M | -10% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.6M | ✅ | 68.9M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.6M | ✅ | 28.5M | 🟢 **-33%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ✅ | 32.0M | -20% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.6M | ✅ | 33.6M | -19% |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ✅ | 19.8M | -17% |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.5M | ✅ | 43.2M | -7% |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ✅ | 44.9M | -12% |
| ref.json | escaped pointer ref | 6 | ✅ | 40.5M | ✅ | 39.6M | -2% |
| ref.json | nested refs | 2 | ✅ | 47.5M | ✅ | 48.8M | +3% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.2M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 60.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.7M | ✅ | 4.2M | 🟢 **-84%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.8M | ✅ | 43.4M | -7% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.8M | ✅ | 43.5M | -7% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.1M | ✅ | 74.4M | 🟢 **-53%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 40.1M | -19% |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ✅ | 7.3M | 🟢 **-21%** |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ✅ | 44.2M | -6% |
| ref.json | Location-independent identifier | 2 | ✅ | 59.7M | ✅ | 47.7M | 🟢 **-20%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 60.0M | ✅ | 46.2M | 🟢 **-23%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.7M | ✅ | 39.0M | 🟢 **-35%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.4M | ✅ | 14.3M | 🟢 **-70%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.3M | ✅ | 31.9M | -12% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.6M | ✅ | 31.8M | -13% |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.3M | ✅ | 48.5M | -18% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ✅ | 23.3M | 🟢 **-30%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.7M | ✅ | 43.4M | -7% |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.6M | ✅ | 43.1M | -7% |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ✅ | 43.1M | -8% |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.7M | ✅ | 43.9M | +3% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 26.4M | ✅ | 38.6M | 🔴 **+47%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.6M | ✅ | 43.4M | -9% |
| ref.json | ref to if | 2 | ✅ | 58.8M | ✅ | 47.8M | -19% |
| ref.json | ref to then | 2 | ✅ | 59.9M | ✅ | 46.9M | 🟢 **-22%** |
| ref.json | ref to else | 2 | ✅ | 60.0M | ✅ | 46.9M | 🟢 **-22%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.4M | ✅ | 49.5M | -17% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.0M | ✅ | 49.7M | -20% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 48.5M | 🟢 **-22%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 49.8M | 🟢 **-20%** |
| refRemote.json | remote ref | 2 | ✅ | 59.5M | ✅ | 47.6M | 🟢 **-20%** |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.8M | ✅ | 47.2M | 🟢 **-21%** |
| refRemote.json | ref within remote ref | 2 | ✅ | 55.0M | ✅ | 47.8M | -13% |
| refRemote.json | base URI change | 2 | ✅ | 32.5M | ✅ | 28.1M | -14% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.7M | ✅ | 27.7M | -18% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ✅ | 27.3M | 🟢 **-30%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.2M | ✅ | 11.5M | 🟢 **-70%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 25.3M | ✅ | 35.3M | 🔴 **+40%** |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 41.7M | ✅ | 42.1M | +1% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.4M | ✅ | 29.5M | 🟢 **-29%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 47.4M | ✅ | 33.9M | 🟢 **-29%** |
| required.json | required validation | 5 | ✅ | 58.1M | ✅ | 48.8M | -16% |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 74.5M | 🟢 **-53%** |
| required.json | required with empty array | 1 | ✅ | 159.4M | ✅ | 74.0M | 🟢 **-54%** |
| required.json | required with escaped characters | 2 | ✅ | 44.0M | ✅ | 34.6M | 🟢 **-21%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.8M | ✅ | 40.6M | 🟢 **-23%** |
| type.json | number type matches numbers | 9 | ✅ | 54.7M | ✅ | 43.6M | 🟢 **-20%** |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 40.0M | 🟢 **-27%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 39.9M | -14% |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ✅ | 36.2M | 🟢 **-30%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.1M | ✅ | 43.9M | -14% |
| type.json | null type matches only the null object | 10 | ✅ | 48.0M | ✅ | 42.0M | -13% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 50.9M | ✅ | 38.3M | 🟢 **-25%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 48.6M | 🟢 **-22%** |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 40.4M | 🟢 **-27%** |
| type.json | type: array, object or null | 5 | ✅ | 66.6M | ✅ | 44.2M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ✅ | 10.1M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.2M | ✅ | 22.2M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ✅ | 26.7M | 🔴 **+45%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.2M | ✅ | 54.5M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.9M | ✅ | 54.3M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.0M | ✅ | 49.0M | 🟢 **-23%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 14.2M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 68.5M | -19% |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 39.8M | -16% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 67.3M | -13% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.5M | ✅ | 36.4M | -20% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 67.7M | -12% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 37.5M | -18% |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 341K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 18.9M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 425K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.5M | ✅ | 27.1M | 🟢 **-49%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.9M | ✅ | 26.7M | -1% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.0M | ✅ | 25.2M | -6% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 27.1M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 26.6M | 0% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 23.0M | ✅ | 26.6M | +16% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.1M | ✅ | 27.6M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.3M | ✅ | 27.7M | +9% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 28.7M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.6M | ✅ | 24.6M | -11% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 14.5M | ✅ | 17.7M | 🔴 **+22%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.1M | ✅ | 13.6M | -3% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.2M | ✅ | 14.5M | +10% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 30.9M | ✅ | 27.0M | -13% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.2M | ✅ | 23.6M | 🔴 **+23%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.0M | ✅ | 23.3M | +11% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.4M | ✅ | 21.4M | +10% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.9M | ✅ | 21.7M | +4% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 9.6M | 🔴 **+20%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ✅ | 9.1M | +7% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ✅ | 2.8M | 🟢 **-88%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.4M | ✅ | 7.9M | 🟢 **-69%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ✅ | 22.5M | 🔴 **+23%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 30.7M | ✅ | 30.8M | +0% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ✅ | 2.8M | 🟢 **-83%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.0M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.1M | ✅ | 25.0M | -17% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 71.9M | ✅ | 911K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 36.7M | ✅ | 30.3M | -18% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ✅ | 5.7M | -9% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.4M | ✅ | 54.7M | 🟢 **-34%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ✅ | 9.0M | -5% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.5M | ✅ | 15.3M | -1% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.1M | 🟢 **-35%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.6M | ✅ | 14.2M | 🟢 **-65%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 47.5M | ✅ | 35.1M | 🟢 **-26%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 52.7M | ✅ | 33.9M | 🟢 **-36%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.4M | ✅ | 24.3M | -11% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ✅ | 8.2M | 🟢 **-49%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.0M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 25.6M | ✅ | 7.3M | 🟢 **-71%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 30.9M | ✅ | 34.6M | +12% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.5M | ✅ | 70.2M | 🟢 **-56%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 60.6M | ✅ | 49.3M | -19% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.9M | ✅ | 69.3M | 🟢 **-60%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 71.7M | ✅ | 65.4M | -9% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.2M | ✅ | 28.8M | 🟢 **-49%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 35.1M | ✅ | 38.3M | +9% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 78.8M | ✅ | 49.2M | 🟢 **-38%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.7M | ✅ | 74.6M | -9% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 60.3M | ✅ | 25.3M | 🟢 **-58%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 29.3M | ✅ | 23.1M | 🟢 **-21%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.7M | ✅ | 16.9M | 🟢 **-62%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.5M | ✅ | 13.2M | 🟢 **-58%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 74.8M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.5M | ✅ | 7.8M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 54.0M | ✅ | 47.0M | -13% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 12.9M | ✅ | 10.0M | 🟢 **-23%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 18.9M | ✅ | 9.7M | 🟢 **-49%** |
| allOf.json | allOf | 4 | ✅ | 30.4M | ✅ | 34.3M | +13% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.3M | ✅ | 25.2M | -17% |
| allOf.json | allOf simple types | 2 | ✅ | 51.4M | ✅ | 50.2M | -2% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 74.8M | 🟢 **-53%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 92.5M | ✅ | 41.1M | 🟢 **-56%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 41.7M | ✅ | 41.2M | -1% |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 74.3M | 🟢 **-53%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 74.5M | 🟢 **-53%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 115.7M | ✅ | 51.0M | 🟢 **-56%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 26.6M | ✅ | 51.4M | 🔴 **+93%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 117.8M | ✅ | 49.8M | 🟢 **-58%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 40.5M | ✅ | 5.1M | 🟢 **-87%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 115.7M | ✅ | 48.6M | 🟢 **-58%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 47.5M | ✅ | 48.8M | +3% |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ✅ | 49.5M | 🟢 **-56%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 25.8M | ✅ | 50.7M | 🔴 **+96%** |
| anyOf.json | anyOf | 4 | ✅ | 53.4M | ✅ | 25.1M | 🟢 **-53%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 28.8M | ✅ | 20.5M | 🟢 **-29%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 74.7M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.3M | ✅ | 68.8M | 🟢 **-57%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 41.8M | ✅ | 22.3M | 🟢 **-47%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 42.9M | ✅ | 24.3M | 🟢 **-43%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.3M | ✅ | 59.7M | 🟢 **-65%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 49.3M | ✅ | 28.0M | 🟢 **-43%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 153.2M | ✅ | 56.0M | 🟢 **-63%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 39.0M | ✅ | 35.5M | -9% |
| const.json | const validation | 3 | ✅ | 42.6M | ✅ | 39.0M | -8% |
| const.json | const with object | 4 | ✅ | 30.2M | ✅ | 15.2M | 🟢 **-50%** |
| const.json | const with array | 3 | ✅ | 39.9M | ✅ | 16.8M | 🟢 **-58%** |
| const.json | const with null | 2 | ✅ | 54.4M | ✅ | 48.3M | -11% |
| const.json | const with false does not match 0 | 3 | ✅ | 47.3M | ✅ | 37.6M | 🟢 **-21%** |
| const.json | const with true does not match 1 | 3 | ✅ | 44.8M | ✅ | 39.2M | -13% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 37.7M | ✅ | 25.2M | 🟢 **-33%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 39.3M | ✅ | 26.4M | 🟢 **-33%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 41.6M | ✅ | 12.4M | 🟢 **-70%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 38.7M | ✅ | 12.9M | 🟢 **-67%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 43.5M | ✅ | 39.8M | -8% |
| const.json | const with 1 does not match true | 3 | ✅ | 49.1M | ✅ | 41.9M | -15% |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 46.0M | ✅ | 45.2M | -2% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 48.2M | ✅ | 41.4M | -14% |
| const.json | nul characters in strings | 2 | ✅ | 47.8M | ✅ | 27.7M | 🟢 **-42%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 44.2M | ✅ | 26.0M | 🟢 **-41%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 46.8M | ✅ | 40.0M | -15% |
| contains.json | contains keyword validation | 6 | ✅ | 51.2M | ✅ | 11.5M | 🟢 **-78%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 50.2M | ✅ | 5.3M | 🟢 **-89%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 50.0M | ✅ | 46.1M | -8% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 48.3M | ✅ | 32.8M | 🟢 **-32%** |
| contains.json | items + contains | 4 | ✅ | 34.3M | ✅ | 7.0M | 🟢 **-80%** |
| contains.json | contains with false if subschema | 2 | ✅ | 50.9M | ✅ | 45.9M | -10% |
| contains.json | contains with null instance elements | 1 | ✅ | 55.5M | ✅ | 60.7M | +9% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.8M | ✅ | 44.0M | 🟢 **-75%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.6M | ✅ | 52.8M | 🟢 **-70%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.6M | ✅ | 54.6M | 🟢 **-70%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 178.7M | ✅ | 55.4M | 🟢 **-69%** |
| default.json | invalid type for default | 2 | ✅ | 59.8M | ✅ | 58.8M | -2% |
| default.json | invalid string value for default | 2 | ✅ | 46.2M | ✅ | 48.9M | +6% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 42.8M | ✅ | 44.5M | +4% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ✅ | 751K | 🟢 **-61%** |
| dependentRequired.json | single dependency | 7 | ✅ | 50.2M | ✅ | 49.3M | -2% |
| dependentRequired.json | empty dependents | 3 | ✅ | 175.5M | ✅ | 53.3M | 🟢 **-70%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.2M | ✅ | 35.5M | 🔴 **+47%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 37.0M | ✅ | 22.7M | 🟢 **-39%** |
| dependentSchemas.json | single dependency | 8 | ✅ | 42.5M | ✅ | 42.1M | -1% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 39.6M | ✅ | 40.4M | +2% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 35.9M | ✅ | 16.3M | 🟢 **-55%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 33.6M | ✅ | 35.2M | +5% |
| enum.json | simple enum validation | 2 | ✅ | 52.6M | ✅ | 31.8M | 🟢 **-40%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 36.9M | ✅ | 10.9M | 🟢 **-70%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 55.5M | ✅ | 45.2M | -19% |
| enum.json | enums in properties | 6 | ✅ | 33.6M | ✅ | 33.3M | -1% |
| enum.json | enum with escaped characters | 3 | ✅ | 58.2M | ✅ | 45.4M | 🟢 **-22%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 48.7M | ✅ | 39.5M | -19% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 45.5M | ✅ | 21.2M | 🟢 **-53%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 48.7M | ✅ | 38.8M | 🟢 **-20%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 45.6M | ✅ | 21.0M | 🟢 **-54%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 52.9M | ✅ | 44.5M | -16% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 51.2M | ✅ | 22.0M | 🟢 **-57%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 55.8M | ✅ | 43.9M | 🟢 **-21%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 50.9M | ✅ | 22.6M | 🟢 **-56%** |
| enum.json | nul characters in strings | 2 | ✅ | 47.4M | ✅ | 47.9M | +1% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 47.3M | ✅ | 42.3M | -11% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 46.9M | ✅ | 41.7M | -11% |
| format.json | email format | 6 | ✅ | 182.6M | ✅ | 55.0M | 🟢 **-70%** |
| format.json | idn-email format | 6 | ✅ | 182.8M | ✅ | 53.5M | 🟢 **-71%** |
| format.json | regex format | 6 | ✅ | 182.6M | ✅ | 55.2M | 🟢 **-70%** |
| format.json | ipv4 format | 6 | ✅ | 179.6M | ✅ | 55.6M | 🟢 **-69%** |
| format.json | ipv6 format | 6 | ✅ | 176.1M | ✅ | 50.8M | 🟢 **-71%** |
| format.json | idn-hostname format | 6 | ✅ | 183.0M | ✅ | 46.0M | 🟢 **-75%** |
| format.json | hostname format | 6 | ✅ | 181.5M | ✅ | 55.6M | 🟢 **-69%** |
| format.json | date format | 6 | ✅ | 182.2M | ✅ | 55.9M | 🟢 **-69%** |
| format.json | date-time format | 6 | ✅ | 181.7M | ✅ | 55.2M | 🟢 **-70%** |
| format.json | time format | 6 | ✅ | 182.7M | ✅ | 55.7M | 🟢 **-70%** |
| format.json | json-pointer format | 6 | ✅ | 182.6M | ✅ | 55.9M | 🟢 **-69%** |
| format.json | relative-json-pointer format | 6 | ✅ | 183.2M | ✅ | 55.8M | 🟢 **-70%** |
| format.json | iri format | 6 | ✅ | 183.1M | ✅ | 55.8M | 🟢 **-70%** |
| format.json | iri-reference format | 6 | ✅ | 182.0M | ✅ | 55.7M | 🟢 **-69%** |
| format.json | uri format | 6 | ✅ | 167.4M | ✅ | 55.6M | 🟢 **-67%** |
| format.json | uri-reference format | 6 | ✅ | 182.9M | ✅ | 55.9M | 🟢 **-69%** |
| format.json | uri-template format | 6 | ✅ | 182.4M | ✅ | 55.8M | 🟢 **-69%** |
| format.json | uuid format | 6 | ✅ | 182.3M | ✅ | 55.7M | 🟢 **-69%** |
| format.json | duration format | 6 | ✅ | 183.3M | ✅ | 55.6M | 🟢 **-70%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.3M | ✅ | 68.7M | 🟢 **-60%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 154.1M | ✅ | 68.6M | 🟢 **-56%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.8M | ✅ | 68.9M | 🟢 **-60%** |
| if-then-else.json | if and then without else | 3 | ✅ | 57.4M | ✅ | 43.3M | 🟢 **-25%** |
| if-then-else.json | if and else without then | 3 | ✅ | 57.0M | ✅ | 38.2M | 🟢 **-33%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 48.4M | ✅ | 37.7M | 🟢 **-22%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 69.2M | 🟢 **-60%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 54.3M | ✅ | 50.5M | -7% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 53.6M | ✅ | 49.0M | -8% |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 37.4M | ✅ | 32.9M | -12% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 34.7M | ✅ | 37.5M | +8% |
| items.json | a schema given for items | 4 | ✅ | 49.1M | ✅ | 43.5M | -11% |
| items.json | an array of schemas for items | 6 | ✅ | 56.1M | ✅ | 50.3M | -10% |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.8M | ✅ | 65.6M | 🟢 **-62%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 52.1M | ✅ | 43.9M | -16% |
| items.json | items with boolean schemas | 3 | ✅ | 51.6M | ✅ | 50.1M | -3% |
| items.json | items and subitems | 6 | ✅ | 26.0M | ✅ | 21.0M | -19% |
| items.json | nested items | 3 | ✅ | 12.8M | ✅ | 11.6M | -9% |
| items.json | single-form items with null instance ... | 1 | ✅ | 67.3M | ✅ | 67.6M | +1% |
| items.json | array-form items with null instance e... | 1 | ✅ | 71.5M | ✅ | 68.4M | -4% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 68.7M | 🟢 **-60%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 34.0M | ✅ | 27.8M | -18% |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 48.0M | ✅ | 37.7M | 🟢 **-22%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 32.4M | ✅ | 37.0M | +14% |
| maxItems.json | maxItems validation | 4 | ✅ | 62.1M | ✅ | 48.2M | 🟢 **-22%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 53.5M | ✅ | 46.2M | -14% |
| maxLength.json | maxLength validation | 5 | ✅ | 50.6M | ✅ | 48.3M | -5% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 42.2M | ✅ | 43.7M | +4% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 47.7M | ✅ | 43.2M | -9% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 37.3M | ✅ | 33.6M | -10% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 37.7M | ✅ | 35.2M | -6% |
| maximum.json | maximum validation | 4 | ✅ | 58.8M | ✅ | 47.4M | -19% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 57.9M | ✅ | 47.6M | -18% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 163.3M | ✅ | 68.8M | 🟢 **-58%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 51.0M | ✅ | 34.7M | 🟢 **-32%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 47.0M | ✅ | 29.4M | 🟢 **-38%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 49.9M | ✅ | 45.3M | -9% |
| minContains.json | maxContains = minContains | 4 | ✅ | 40.5M | ✅ | 37.9M | -6% |
| minContains.json | maxContains < minContains | 4 | ✅ | 35.4M | ✅ | 38.9M | +10% |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.6M | ✅ | 69.2M | 🟢 **-60%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 54.7M | ✅ | 44.6M | -18% |
| minItems.json | minItems validation | 4 | ✅ | 62.1M | ✅ | 48.0M | 🟢 **-23%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 49.5M | ✅ | 49.0M | -1% |
| minLength.json | minLength validation | 5 | ✅ | 45.8M | ✅ | 42.5M | -7% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 45.2M | ✅ | 43.5M | -4% |
| minProperties.json | minProperties validation | 6 | ✅ | 48.2M | ✅ | 42.6M | -12% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 37.7M | ✅ | 32.9M | -13% |
| minimum.json | minimum validation | 4 | ✅ | 58.9M | ✅ | 45.3M | 🟢 **-23%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 51.9M | ✅ | 47.4M | -9% |
| multipleOf.json | by int | 3 | ✅ | 42.7M | ✅ | 43.3M | +2% |
| multipleOf.json | by number | 3 | ✅ | 49.3M | ✅ | 42.8M | -13% |
| multipleOf.json | by small number | 2 | ✅ | 49.0M | ✅ | 41.8M | -15% |
| multipleOf.json | float division = inf | 1 | ✅ | 37.0M | ✅ | 9.0M | 🟢 **-76%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 51.2M | ✅ | 9.1M | 🟢 **-82%** |
| not.json | not | 2 | ✅ | 53.2M | ✅ | 43.0M | -19% |
| not.json | not multiple types | 3 | ✅ | 46.1M | ✅ | 38.4M | -17% |
| not.json | not more complex schema | 3 | ✅ | 50.3M | ✅ | 39.9M | 🟢 **-21%** |
| not.json | forbidden property | 2 | ✅ | 39.3M | ✅ | 44.2M | +12% |
| not.json | forbid everything with empty schema | 9 | ✅ | 38.3M | ✅ | 39.5M | +3% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 38.9M | ✅ | 39.8M | +2% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 183.0M | ✅ | 55.0M | 🟢 **-70%** |
| not.json | double negation | 1 | ✅ | 159.2M | ✅ | 74.0M | 🟢 **-54%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 27.2M | ✅ | 24.3M | -11% |
| oneOf.json | oneOf | 4 | ✅ | 39.6M | ✅ | 23.0M | 🟢 **-42%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 28.6M | ✅ | 24.3M | -15% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 41.8M | ✅ | 37.8M | -9% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ✅ | 27.3M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 41.8M | ✅ | 37.5M | -10% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 38.9M | ✅ | 18.8M | 🟢 **-52%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 35.9M | ✅ | 23.0M | 🟢 **-36%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 52.4M | ✅ | 40.8M | 🟢 **-22%** |
| oneOf.json | oneOf with required | 4 | ✅ | 36.5M | ✅ | 16.8M | 🟢 **-54%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 37.7M | ✅ | 18.9M | 🟢 **-50%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 52.8M | ✅ | 28.3M | 🟢 **-46%** |
| pattern.json | pattern validation | 8 | ✅ | 43.3M | ✅ | 42.0M | -3% |
| pattern.json | pattern is not anchored | 1 | ✅ | 44.8M | ✅ | 30.3M | 🟢 **-32%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.3M | ✅ | 10.7M | 🟢 **-57%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ✅ | 6.2M | 🟢 **-58%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.0M | ✅ | 8.0M | 🟢 **-50%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.2M | ✅ | 5.9M | 🟢 **-67%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.2M | ✅ | 13.7M | -20% |
| properties.json | object properties validation | 6 | ✅ | 43.0M | ✅ | 44.3M | +3% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.7M | ✅ | 9.7M | 🟢 **-48%** |
| properties.json | properties with boolean schema | 4 | ✅ | 37.2M | ✅ | 41.1M | +11% |
| properties.json | properties with escaped characters | 2 | ✅ | 38.4M | ✅ | 43.6M | +14% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 57.8M | ✅ | 60.7M | +5% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.7M | ✅ | 34.8M | -14% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.4M | ✅ | 12.8M | 🟢 **-30%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.8M | ✅ | 69.3M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 37.8M | ✅ | 27.4M | 🟢 **-28%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 35.8M | ✅ | 32.5M | -9% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 38.4M | ✅ | 34.1M | -11% |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 12.1M | ✅ | 19.4M | 🔴 **+61%** |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.3M | ✅ | 1.9M | 🟢 **-69%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 2.6M | -14% |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 13.2M | ✅ | 2.0M | 🟢 **-85%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 13.2M | ✅ | 1.9M | 🟢 **-86%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.2M | ✅ | 1.4M | 🟢 **-83%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.0M | ✅ | 3.8M | -6% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ✅ | 3.6M | -12% |
| ref.json | root pointer ref | 4 | ✅ | 21.7M | ✅ | 19.5M | -10% |
| ref.json | relative pointer ref to object | 2 | ✅ | 39.5M | ✅ | 37.8M | -4% |
| ref.json | relative pointer ref to array | 2 | ✅ | 44.2M | ✅ | 40.6M | -8% |
| ref.json | escaped pointer ref | 6 | ✅ | 36.1M | ✅ | 39.5M | +9% |
| ref.json | nested refs | 2 | ✅ | 41.3M | ✅ | 43.9M | +6% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 33.1M | ✅ | 35.7M | +8% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ✅ | 2.4M | 🟢 **-29%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 39.7M | ✅ | 44.4M | +12% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 40.6M | ✅ | 40.0M | -2% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.2M | ✅ | 73.8M | 🟢 **-54%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 41.8M | ✅ | 41.0M | -2% |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ✅ | 7.3M | -16% |
| ref.json | refs with quote | 2 | ✅ | 32.3M | ✅ | 44.8M | 🔴 **+39%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 24.6M | ✅ | 34.2M | 🔴 **+39%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 40.3M | ✅ | 14.3M | 🟢 **-65%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.4M | ✅ | 47.7M | -5% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 47.6M | ✅ | 48.9M | +3% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 52.0M | ✅ | 46.3M | -11% |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 41.4M | ✅ | 43.0M | +4% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 28.4M | ✅ | 23.1M | -19% |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 39.6M | ✅ | 41.8M | +5% |
| ref.json | URN base URI with NSS | 2 | ✅ | 39.7M | ✅ | 44.1M | +11% |
| ref.json | URN base URI with r-component | 2 | ✅ | 39.7M | ✅ | 43.9M | +10% |
| ref.json | URN base URI with q-component | 2 | ✅ | 40.8M | ✅ | 44.1M | +8% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 39.7M | ✅ | 44.3M | +12% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 39.7M | ✅ | 39.4M | -1% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 48.7M | ✅ | 49.2M | +1% |
| ref.json | ref to then | 2 | ✅ | 48.7M | ✅ | 48.4M | -1% |
| ref.json | ref to else | 2 | ✅ | 49.9M | ✅ | 49.8M | 0% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.4M | ✅ | 44.5M | -10% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 52.8M | ✅ | 50.8M | -4% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 51.5M | ✅ | 50.6M | -2% |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 52.5M | ✅ | 50.6M | -4% |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 5.0M | ✅ | 16.6M | 🔴 **+234%** |
| refRemote.json | remote ref | 2 | ✅ | 49.1M | ✅ | 49.9M | +2% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.6M | ✅ | 46.8M | -7% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 47.9M | ✅ | 49.0M | +2% |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.3M | ✅ | 46.7M | -5% |
| refRemote.json | base URI change | 2 | ✅ | 29.6M | ✅ | 28.2M | -5% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.5M | ✅ | 27.6M | -6% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.9M | ✅ | 26.7M | 🟢 **-23%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.1M | ✅ | 10.6M | 🟢 **-68%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.5M | ✅ | 37.2M | -10% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 49.8M | ✅ | 38.9M | 🟢 **-22%** |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 35.9M | ✅ | 29.5M | -18% |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 49.3M | ✅ | 42.3M | -14% |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 48.7M | ✅ | 41.9M | -14% |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 42.0M | ✅ | 41.8M | 0% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 49.8M | ✅ | 42.1M | -15% |
| required.json | required validation | 5 | ✅ | 50.3M | ✅ | 48.9M | -3% |
| required.json | required default validation | 1 | ✅ | 159.4M | ✅ | 74.3M | 🟢 **-53%** |
| required.json | required with empty array | 1 | ✅ | 159.4M | ✅ | 74.5M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 38.8M | ✅ | 38.7M | 0% |
| required.json | required properties whose names are J... | 7 | ✅ | 23.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 41.7M | ✅ | 40.4M | -3% |
| type.json | number type matches numbers | 9 | ✅ | 43.5M | ✅ | 40.1M | -8% |
| type.json | string type matches strings | 9 | ✅ | 46.1M | ✅ | 44.1M | -4% |
| type.json | object type matches objects | 7 | ✅ | 39.4M | ✅ | 40.0M | +1% |
| type.json | array type matches arrays | 7 | ✅ | 42.5M | ✅ | 39.9M | -6% |
| type.json | boolean type matches booleans | 10 | ✅ | 42.0M | ✅ | 43.5M | +4% |
| type.json | null type matches only the null object | 10 | ✅ | 40.8M | ✅ | 36.7M | -10% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 43.8M | ✅ | 38.4M | -12% |
| type.json | type as array with one item | 2 | ✅ | 52.7M | ✅ | 47.9M | -9% |
| type.json | type: array or object | 5 | ✅ | 46.5M | ✅ | 28.9M | 🟢 **-38%** |
| type.json | type: array, object or null | 5 | ✅ | 48.5M | ✅ | 45.9M | -5% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 71.6M | ✅ | 68.6M | -4% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 45.7M | ✅ | 48.4M | +6% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 45.6M | ✅ | 42.7M | -6% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 63.3M | ✅ | 61.0M | -4% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 41.2M | ✅ | 46.5M | +13% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 69.9M | ✅ | 64.3M | -8% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 39.0M | ✅ | 38.2M | -2% |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 39.4M | ✅ | 38.4M | -3% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 40.6M | ✅ | 44.5M | +10% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 20.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 71.8M | ✅ | 63.0M | -12% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.1M | ✅ | 64.4M | 🔴 **+220%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.3M | ✅ | 25.5M | 🔴 **+127%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.1M | ✅ | 20.6M | 🔴 **+36%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 30.9M | ✅ | 37.6M | 🔴 **+22%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ✅ | 26.9M | 🔴 **+142%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 45.7M | ✅ | 45.9M | +0% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 40.6M | ✅ | 44.1M | +9% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 41.8M | ✅ | 44.1M | +6% |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ✅ | 9.7M | 🔴 **+323%** |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 33.7M | ✅ | 39.9M | +18% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.8M | ✅ | 29.4M | +18% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 77.0M | ✅ | 55.3M | 🟢 **-28%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 67.3M | ✅ | 66.1M | -2% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.7M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 31.3M | ✅ | 37.4M | +20% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 49.8M | ✅ | 62.2M | 🔴 **+25%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.4M | ✅ | 16.8M | 🟢 **-47%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 33.2M | ✅ | 40.1M | 🔴 **+20%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.5M | ✅ | 36.8M | 🔴 **+21%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.6M | ✅ | 13.0M | -11% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 57.9M | ✅ | 60.3M | +4% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.9M | ✅ | 33.7M | +17% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.4M | ✅ | 9.1M | 🟢 **-32%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 58.1M | ✅ | 59.8M | +3% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 29.3M | ✅ | 60.1M | 🔴 **+105%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.3M | ✅ | 10.3M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.7M | ✅ | 13.5M | 🟢 **-24%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.9M | ✅ | 29.8M | 🔴 **+25%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.8M | ✅ | 17.2M | -3% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.3M | ✅ | 18.9M | +9% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.6M | ✅ | 25.4M | -4% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.9M | ✅ | 37.8M | +18% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.0M | ✅ | 31.1M | +11% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.0M | ✅ | 33.7M | 🔴 **+20%** |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.2M | ✅ | 10.6M | 🔴 **+236%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.5M | ✅ | 34.2M | 🔴 **+29%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.4M | ✅ | 34.2M | 🔴 **+29%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.8M | ✅ | 58.8M | 🔴 **+91%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.4M | ✅ | 57.2M | 🔴 **+101%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.9M | ✅ | 30.8M | 🔴 **+29%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ✅ | 35.3M | 🔴 **+35%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.1M | ✅ | 26.2M | 🔴 **+37%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.5M | ✅ | 36.3M | 🔴 **+216%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.0M | ✅ | 23.8M | -9% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 28.3M | ✅ | 34.1M | 🔴 **+20%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 33.0M | ✅ | 25.1M | 🟢 **-24%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.2M | ✅ | 13.3M | -18% |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.2M | ✅ | 13.6M | 🟢 **-25%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ✅ | 5.3M | 🟢 **-24%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 39.6M | ✅ | 55.8M | 🔴 **+41%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 45.4M | ✅ | 46.9M | +3% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.6M | ✅ | 12.5M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.7M | ✅ | 26.8M | 🔴 **+29%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 12.0M | ✅ | 29.4M | 🔴 **+146%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ✅ | 10.1M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.5M | ✅ | 20.0M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.4M | ✅ | 26.7M | 🔴 **+53%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.2M | ✅ | 54.5M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.6M | ✅ | 54.2M | -19% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 55.9M | ✅ | 49.4M | -12% |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 44.2M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 52.8M | ✅ | 47.7M | -10% |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 45.6M | ✅ | 11.7M | 🟢 **-74%** |
| optional/bignum.json | integer | 2 | ✅ | 69.2M | ✅ | 14.2M | 🟢 **-80%** |
| optional/bignum.json | number | 2 | ✅ | 72.5M | ✅ | 65.9M | -9% |
| optional/bignum.json | string | 1 | ✅ | 40.3M | ✅ | 40.6M | +1% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 67.4M | ✅ | 67.8M | +1% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 38.9M | ✅ | 33.0M | -15% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 67.3M | ✅ | 68.1M | +1% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 38.9M | ✅ | 39.2M | +1% |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 27.3M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 61.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 51.8M | ✅ | 49.3M | -5% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.1M | ✅ | 61.9M | 🟢 **-65%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 26.9M | ✅ | 34.0M | 🔴 **+26%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 36.8M | ✅ | 36.0M | -2% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 42.8M | ✅ | 41.3M | -3% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 39.6M | ✅ | 38.9M | -2% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 35.9M | ✅ | 30.7M | -15% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 46.3M | ✅ | 25.5M | 🟢 **-45%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 17.7M | ✅ | 27.8M | 🔴 **+57%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.6M | ✅ | 27.5M | +17% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 22.9M | ✅ | 27.9M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 23.7M | ✅ | 27.3M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.0M | ✅ | 29.1M | 🔴 **+21%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.8M | ✅ | 27.3M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 23.3M | ✅ | 27.0M | +16% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 23.6M | ✅ | 29.5M | 🔴 **+25%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 24.9M | ✅ | 26.1M | +5% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 14.6M | ✅ | 17.8M | 🔴 **+22%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.7M | ✅ | 13.9M | +1% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.4M | ✅ | 14.2M | +6% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 23.9M | ✅ | 25.3M | +6% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.1M | ✅ | 23.4M | 🔴 **+29%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.1M | ✅ | 23.1M | +5% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.3M | ✅ | 21.2M | +16% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.5M | ✅ | 16.6M | -15% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 10.1M | 🔴 **+26%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 8.8M | +2% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 20.3M | ✅ | 2.9M | 🟢 **-86%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 23.8M | ✅ | 8.1M | 🟢 **-66%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 33.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.2M | ✅ | 23.0M | 🔴 **+34%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 11.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 17.7M | ✅ | 79K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.6M | ✅ | 31.0M | -11% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 15.7M | ✅ | 2.7M | 🟢 **-82%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 29.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 13.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 27.5M | ✅ | 24.6M | -11% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 62.4M | ✅ | 912K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.7M | ✅ | 29.7M | -9% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ✅ | 5.5M | -12% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 71.1M | ✅ | 41.1M | 🟢 **-42%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ✅ | 8.9M | -4% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.4M | ✅ | 15.6M | -5% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.1M | ✅ | 4.3M | 🟢 **-29%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.3M | ✅ | 15.1M | +6% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 34.2M | ✅ | 12.2M | 🟢 **-64%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 51.8M | ✅ | 44.3M | -14% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.3M | ✅ | 26.7M | +5% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.5M | ✅ | 7.0M | 🟢 **-58%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 37.0M | ✅ | 42.3M | +14% |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 39.5M | ✅ | 43.2M | +9% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 40.3M | ✅ | 43.7M | +9% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 52.8M | ✅ | 49.4M | -6% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 40.4M | ✅ | 43.9M | +9% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 22.4M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.7M | ✅ | 36.8M | 🟢 **-31%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 29.4M | ✅ | 22.4M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.2M | ✅ | 16.6M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 19.5M | ✅ | 12.9M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 156.9M | ✅ | 74.6M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.5M | ✅ | 7.9M | 🟢 **-69%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.6M | ✅ | 44.0M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 27.8M | ✅ | 9.7M | 🟢 **-65%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.6M | ✅ | 9.8M | 🟢 **-74%** |
| allOf.json | allOf | 4 | ✅ | 31.8M | ✅ | 28.3M | -11% |
| allOf.json | allOf with base schema | 5 | ✅ | 35.1M | ✅ | 24.0M | 🟢 **-32%** |
| allOf.json | allOf simple types | 2 | ✅ | 53.8M | ✅ | 47.6M | -11% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 73.6M | 🟢 **-54%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 44.1M | ✅ | 38.7M | -12% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 91.5M | ✅ | 40.1M | 🟢 **-56%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ✅ | 73.9M | 🟢 **-54%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.6M | ✅ | 70.7M | 🟢 **-56%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.7M | ✅ | 48.3M | -13% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 45.1M | 🟢 **-61%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 49.0M | -15% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.2M | ✅ | 4.8M | 🟢 **-94%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 56.2M | ✅ | 42.4M | 🟢 **-24%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.6M | ✅ | 48.1M | 🟢 **-58%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 53.8M | ✅ | 46.0M | -14% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 27.8M | ✅ | 47.8M | 🔴 **+72%** |
| anyOf.json | anyOf | 4 | ✅ | 54.9M | ✅ | 24.7M | 🟢 **-55%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 30.7M | ✅ | 20.1M | 🟢 **-35%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 74.3M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 62.4M | 🟢 **-61%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 44.0M | ✅ | 19.6M | 🟢 **-56%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 44.0M | ✅ | 19.6M | 🟢 **-56%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 52.4M | 🟢 **-69%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.5M | ✅ | 27.1M | 🟢 **-53%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.9M | ✅ | 55.7M | 🟢 **-69%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 40.1M | ✅ | 31.7M | 🟢 **-21%** |
| const.json | const validation | 3 | ✅ | 22.8M | ✅ | 38.5M | 🔴 **+69%** |
| const.json | const with object | 4 | ✅ | 33.4M | ✅ | 14.2M | 🟢 **-57%** |
| const.json | const with array | 3 | ✅ | 41.7M | ✅ | 14.7M | 🟢 **-65%** |
| const.json | const with null | 2 | ✅ | 29.2M | ✅ | 48.4M | 🔴 **+66%** |
| const.json | const with false does not match 0 | 3 | ✅ | 47.4M | ✅ | 39.9M | -16% |
| const.json | const with true does not match 1 | 3 | ✅ | 50.9M | ✅ | 40.9M | -20% |
| const.json | const with [false] does not match [0] | 3 | ✅ | 45.1M | ✅ | 24.8M | 🟢 **-45%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 44.1M | ✅ | 26.2M | 🟢 **-41%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 23.1M | ✅ | 12.7M | 🟢 **-45%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 43.6M | ✅ | 12.5M | 🟢 **-71%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 46.8M | ✅ | 42.6M | -9% |
| const.json | const with 1 does not match true | 3 | ✅ | 58.7M | ✅ | 44.1M | 🟢 **-25%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 49.7M | ✅ | 40.9M | -18% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 49.7M | ✅ | 42.4M | -15% |
| const.json | nul characters in strings | 2 | ✅ | 49.9M | ✅ | 45.0M | -10% |
| const.json | characters with the same visual repre... | 2 | ✅ | 40.5M | ✅ | 42.4M | +5% |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.7M | ✅ | 46.1M | -9% |
| contains.json | contains keyword validation | 6 | ✅ | 58.5M | ✅ | 8.0M | 🟢 **-86%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 52.4M | ✅ | 10.1M | 🟢 **-81%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 54.9M | ✅ | 45.3M | -17% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 49.1M | ✅ | 32.4M | 🟢 **-34%** |
| contains.json | items + contains | 4 | ✅ | 33.9M | ✅ | 6.9M | 🟢 **-80%** |
| contains.json | contains with false if subschema | 2 | ✅ | 52.2M | ✅ | 45.2M | -13% |
| contains.json | contains with null instance elements | 1 | ✅ | 73.4M | ✅ | 56.8M | 🟢 **-23%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.2M | ✅ | 64.7M | 🟢 **-63%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.0M | ✅ | 49.0M | 🟢 **-72%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 161.4M | ✅ | 54.3M | 🟢 **-66%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 177.2M | ✅ | 54.5M | 🟢 **-69%** |
| default.json | invalid type for default | 2 | ✅ | 51.3M | ✅ | 59.4M | +16% |
| default.json | invalid string value for default | 2 | ✅ | 49.1M | ✅ | 42.1M | -14% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 41.7M | ✅ | 43.9M | +5% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ✅ | 723K | 🟢 **-67%** |
| dependentRequired.json | single dependency | 7 | ✅ | 53.7M | ✅ | 49.2M | -8% |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.2M | ✅ | 47.2M | 🟢 **-73%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.9M | ✅ | 32.1M | 🔴 **+29%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 38.7M | ✅ | 39.5M | +2% |
| dependentSchemas.json | single dependency | 8 | ✅ | 44.0M | ✅ | 42.6M | -3% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 42.3M | ✅ | 40.2M | -5% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 37.5M | ✅ | 31.7M | -15% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 35.6M | ✅ | 38.0M | +7% |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.6M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.0M | ✅ | 18.9M | +18% |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 11.0M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 18.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.1M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.6M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.9M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.9M | ✅ | 10.4M | 🔴 **+51%** |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.6M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.6M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 56.4M | ✅ | 29.8M | 🟢 **-47%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 38.4M | ✅ | 11.3M | 🟢 **-71%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 55.2M | ✅ | 28.0M | 🟢 **-49%** |
| enum.json | enums in properties | 6 | ✅ | 35.0M | ✅ | 37.3M | +6% |
| enum.json | enum with escaped characters | 3 | ✅ | 63.3M | ✅ | 45.2M | 🟢 **-29%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 52.0M | ✅ | 31.9M | 🟢 **-39%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 48.0M | ✅ | 20.4M | 🟢 **-57%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 48.3M | ✅ | 38.4M | 🟢 **-20%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 48.1M | ✅ | 20.5M | 🟢 **-57%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 58.7M | ✅ | 45.0M | 🟢 **-23%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.7M | ✅ | 22.9M | 🟢 **-57%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 58.7M | ✅ | 44.0M | 🟢 **-25%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 48.3M | ✅ | 22.2M | 🟢 **-54%** |
| enum.json | nul characters in strings | 2 | ✅ | 49.9M | ✅ | 45.8M | -8% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.1M | ✅ | 42.1M | 🟢 **-29%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 49.3M | ✅ | 41.0M | -17% |
| format.json | email format | 7 | ✅ | 182.9M | ✅ | 54.8M | 🟢 **-70%** |
| format.json | idn-email format | 7 | ✅ | 179.9M | ✅ | 55.0M | 🟢 **-69%** |
| format.json | regex format | 7 | ✅ | 179.2M | ✅ | 55.6M | 🟢 **-69%** |
| format.json | ipv4 format | 7 | ✅ | 168.5M | ✅ | 55.3M | 🟢 **-67%** |
| format.json | ipv6 format | 7 | ✅ | 184.1M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | idn-hostname format | 7 | ✅ | 184.1M | ✅ | 54.6M | 🟢 **-70%** |
| format.json | hostname format | 7 | ✅ | 183.6M | ✅ | 55.6M | 🟢 **-70%** |
| format.json | date format | 7 | ✅ | 183.1M | ✅ | 55.1M | 🟢 **-70%** |
| format.json | date-time format | 7 | ✅ | 182.1M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | time format | 7 | ✅ | 183.1M | ✅ | 55.5M | 🟢 **-70%** |
| format.json | json-pointer format | 7 | ✅ | 180.2M | ✅ | 54.6M | 🟢 **-70%** |
| format.json | relative-json-pointer format | 7 | ✅ | 183.8M | ✅ | 55.5M | 🟢 **-70%** |
| format.json | iri format | 7 | ✅ | 181.6M | ✅ | 54.9M | 🟢 **-70%** |
| format.json | iri-reference format | 7 | ✅ | 183.9M | ✅ | 54.3M | 🟢 **-70%** |
| format.json | uri format | 7 | ✅ | 182.1M | ✅ | 55.6M | 🟢 **-69%** |
| format.json | uri-reference format | 7 | ✅ | 183.9M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | uri-template format | 7 | ✅ | 183.0M | ✅ | 55.6M | 🟢 **-70%** |
| format.json | uuid format | 7 | ✅ | 183.3M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | duration format | 7 | ✅ | 183.1M | ✅ | 55.4M | 🟢 **-70%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.3M | ✅ | 68.0M | 🟢 **-60%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 170.7M | ✅ | 66.4M | 🟢 **-61%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.6M | ✅ | 68.5M | 🟢 **-60%** |
| if-then-else.json | if and then without else | 3 | ✅ | 60.6M | ✅ | 42.8M | 🟢 **-29%** |
| if-then-else.json | if and else without then | 3 | ✅ | 61.5M | ✅ | 37.5M | 🟢 **-39%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 54.4M | ✅ | 35.8M | 🟢 **-34%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.9M | ✅ | 68.3M | 🟢 **-60%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 57.4M | ✅ | 49.7M | -14% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 57.1M | ✅ | 45.6M | 🟢 **-20%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ✅ | 30.5M | 🟢 **-22%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.4M | ✅ | 37.0M | +4% |
| items.json | a schema given for items | 4 | ✅ | 50.1M | ✅ | 44.0M | -12% |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.7M | ✅ | 69.2M | 🟢 **-60%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 55.1M | ✅ | 41.1M | 🟢 **-25%** |
| items.json | items and subitems | 6 | ✅ | 27.1M | ✅ | 16.7M | 🟢 **-38%** |
| items.json | nested items | 3 | ✅ | 11.2M | ✅ | 11.8M | +6% |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 66.7M | ✅ | 48.7M | 🟢 **-27%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 42.3M | ✅ | 37.0M | -13% |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 41.7M | ✅ | 36.9M | -11% |
| items.json | items with heterogeneous array | 2 | ✅ | 56.6M | ✅ | 47.9M | -15% |
| items.json | items with null instance elements | 1 | ✅ | 36.6M | ✅ | 67.0M | 🔴 **+83%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.6M | ✅ | 68.5M | 🟢 **-60%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 44.9M | ✅ | 27.5M | 🟢 **-39%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 51.9M | ✅ | 44.3M | -15% |
| maxContains.json | minContains < maxContains | 3 | ✅ | 45.4M | ✅ | 36.6M | -19% |
| maxItems.json | maxItems validation | 4 | ✅ | 65.1M | ✅ | 48.3M | 🟢 **-26%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 56.5M | ✅ | 46.4M | -18% |
| maxLength.json | maxLength validation | 5 | ✅ | 53.3M | ✅ | 41.8M | 🟢 **-22%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 46.0M | ✅ | 43.7M | -5% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 49.6M | ✅ | 42.6M | -14% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 35.8M | ✅ | 34.6M | -3% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 39.5M | ✅ | 35.4M | -10% |
| maximum.json | maximum validation | 4 | ✅ | 62.0M | ✅ | 47.3M | 🟢 **-24%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 60.9M | ✅ | 48.1M | 🟢 **-21%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 170.8M | ✅ | 68.8M | 🟢 **-60%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 53.1M | ✅ | 35.5M | 🟢 **-33%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 48.6M | ✅ | 29.3M | 🟢 **-40%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 52.1M | ✅ | 43.9M | -16% |
| minContains.json | maxContains = minContains | 4 | ✅ | 41.8M | ✅ | 37.0M | -12% |
| minContains.json | maxContains < minContains | 4 | ✅ | 38.3M | ✅ | 34.0M | -11% |
| minContains.json | minContains = 0 | 2 | ✅ | 153.5M | ✅ | 68.0M | 🟢 **-56%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 62.4M | ✅ | 45.4M | 🟢 **-27%** |
| minItems.json | minItems validation | 4 | ✅ | 65.8M | ✅ | 50.0M | 🟢 **-24%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 56.2M | ✅ | 44.9M | 🟢 **-20%** |
| minLength.json | minLength validation | 5 | ✅ | 47.9M | ✅ | 44.0M | -8% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 47.6M | ✅ | 43.1M | -9% |
| minProperties.json | minProperties validation | 6 | ✅ | 49.9M | ✅ | 42.7M | -15% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 31.1M | ✅ | 32.4M | +4% |
| minimum.json | minimum validation | 4 | ✅ | 61.9M | ✅ | 46.9M | 🟢 **-24%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.6M | ✅ | 48.0M | -17% |
| multipleOf.json | by int | 3 | ✅ | 59.8M | ✅ | 44.1M | 🟢 **-26%** |
| multipleOf.json | by number | 3 | ✅ | 56.1M | ✅ | 42.7M | 🟢 **-24%** |
| multipleOf.json | by small number | 2 | ✅ | 51.6M | ✅ | 39.3M | 🟢 **-24%** |
| multipleOf.json | float division = inf | 1 | ✅ | 38.0M | ✅ | 8.9M | 🟢 **-77%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.5M | ✅ | 8.6M | 🟢 **-86%** |
| not.json | not | 2 | ✅ | 51.3M | ✅ | 41.5M | -19% |
| not.json | not multiple types | 3 | ✅ | 45.9M | ✅ | 36.9M | -20% |
| not.json | not more complex schema | 3 | ✅ | 52.9M | ✅ | 39.3M | 🟢 **-26%** |
| not.json | forbidden property | 2 | ✅ | 42.3M | ✅ | 43.5M | +3% |
| not.json | forbid everything with empty schema | 9 | ✅ | 40.9M | ✅ | 23.7M | 🟢 **-42%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 41.1M | ✅ | 38.7M | -6% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 184.1M | ✅ | 54.7M | 🟢 **-70%** |
| not.json | double negation | 1 | ✅ | 159.2M | ✅ | 73.0M | 🟢 **-54%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 28.5M | ✅ | 23.8M | -17% |
| oneOf.json | oneOf | 4 | ✅ | 44.8M | ✅ | 21.4M | 🟢 **-52%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.4M | ✅ | 24.7M | 🟢 **-21%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 44.3M | ✅ | 36.1M | -19% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.7M | ✅ | 23.8M | 🟢 **-85%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 44.3M | ✅ | 36.4M | -18% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 43.9M | ✅ | 17.8M | 🟢 **-60%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 36.5M | ✅ | 22.5M | 🟢 **-38%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.2M | ✅ | 38.5M | 🟢 **-30%** |
| oneOf.json | oneOf with required | 4 | ✅ | 37.4M | ✅ | 16.2M | 🟢 **-57%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.0M | ✅ | 19.2M | 🟢 **-49%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.7M | ✅ | 28.1M | 🟢 **-50%** |
| pattern.json | pattern validation | 8 | ✅ | 48.9M | ✅ | 45.0M | -8% |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.1M | ✅ | 31.1M | 🟢 **-33%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.4M | ✅ | 10.7M | 🟢 **-56%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 12.5M | ✅ | 6.3M | 🟢 **-50%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.0M | ✅ | 7.9M | 🟢 **-51%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.3M | ✅ | 6.0M | 🟢 **-70%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 17.8M | +3% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 58.4M | ✅ | 49.9M | -15% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 53.4M | ✅ | 46.9M | -12% |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 75.1M | ✅ | 66.7M | -11% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 75.2M | ✅ | 68.1M | -9% |
| properties.json | object properties validation | 6 | ✅ | 45.6M | ✅ | 41.4M | -9% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.9M | ✅ | 9.9M | 🟢 **-48%** |
| properties.json | properties with boolean schema | 4 | ✅ | 35.7M | ✅ | 40.9M | +14% |
| properties.json | properties with escaped characters | 2 | ✅ | 40.4M | ✅ | 43.4M | +7% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 59.6M | ✅ | 60.6M | +2% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 41.7M | ✅ | 29.4M | 🟢 **-29%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ✅ | 14.4M | 🟢 **-24%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 68.3M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 39.4M | ✅ | 28.6M | 🟢 **-27%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.5M | ✅ | 31.0M | -17% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.2M | ✅ | 33.5M | -15% |
| ref.json | root pointer ref | 4 | ✅ | 20.9M | ✅ | 18.9M | -10% |
| ref.json | relative pointer ref to object | 2 | ✅ | 39.3M | ✅ | 43.2M | +10% |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ✅ | 45.0M | -3% |
| ref.json | escaped pointer ref | 6 | ✅ | 37.2M | ✅ | 39.4M | +6% |
| ref.json | nested refs | 2 | ✅ | 43.7M | ✅ | 48.1M | +10% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 34.5M | ✅ | 37.1M | +8% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ✅ | 2.1M | 🟢 **-37%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 42.3M | ✅ | 43.2M | +2% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 41.6M | ✅ | 43.6M | +5% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.1M | ✅ | 73.8M | 🟢 **-54%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 44.3M | ✅ | 39.9M | -10% |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ✅ | 7.2M | -18% |
| ref.json | refs with quote | 2 | ✅ | 42.6M | ✅ | 44.1M | +3% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.7M | ✅ | 33.5M | 🔴 **+30%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 40.6M | ✅ | 13.3M | 🟢 **-67%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 53.8M | ✅ | 48.5M | -10% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 51.3M | ✅ | 46.4M | -10% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 53.5M | ✅ | 47.3M | -12% |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 44.1M | ✅ | 38.4M | -13% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 16.8M | ✅ | 21.9M | 🔴 **+31%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 42.8M | ✅ | 43.5M | +2% |
| ref.json | URN base URI with NSS | 2 | ✅ | 41.3M | ✅ | 43.6M | +6% |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.8M | ✅ | 43.6M | +2% |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.7M | ✅ | 43.6M | +2% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.3M | ✅ | 42.6M | +1% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.5M | ✅ | 43.8M | +5% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 52.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 53.5M | ✅ | 47.4M | -11% |
| ref.json | ref to then | 2 | ✅ | 52.8M | ✅ | 48.1M | -9% |
| ref.json | ref to else | 2 | ✅ | 53.6M | ✅ | 48.0M | -10% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 53.5M | ✅ | 48.5M | -9% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.4M | ✅ | 47.7M | -14% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.7M | ✅ | 48.2M | -14% |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.5M | ✅ | 48.5M | -13% |
| refRemote.json | remote ref | 2 | ✅ | 51.4M | ✅ | 47.3M | -8% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 53.7M | ✅ | 48.8M | -9% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 50.9M | ✅ | 48.3M | -5% |
| refRemote.json | ref within remote ref | 2 | ✅ | 52.7M | ✅ | 48.0M | -9% |
| refRemote.json | base URI change | 2 | ✅ | 28.5M | ✅ | 26.5M | -7% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.6M | ✅ | 27.1M | -11% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.5M | ✅ | 27.6M | 🟢 **-24%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 34.5M | ✅ | 11.7M | 🟢 **-66%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 39.8M | ✅ | 37.3M | -6% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.7M | ✅ | 41.6M | 🟢 **-23%** |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 37.3M | ✅ | 28.7M | 🟢 **-23%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 53.0M | ✅ | 42.0M | 🟢 **-21%** |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 52.4M | ✅ | 41.7M | 🟢 **-20%** |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 44.5M | ✅ | 41.7M | -6% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 53.6M | ✅ | 41.9M | 🟢 **-22%** |
| required.json | required validation | 5 | ✅ | 52.9M | ✅ | 48.4M | -8% |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 74.5M | 🟢 **-53%** |
| required.json | required with empty array | 1 | ✅ | 159.4M | ✅ | 74.4M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 40.9M | ✅ | 37.8M | -8% |
| required.json | required properties whose names are J... | 7 | ✅ | 23.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 44.4M | ✅ | 40.0M | -10% |
| type.json | number type matches numbers | 9 | ✅ | 43.2M | ✅ | 39.2M | -9% |
| type.json | string type matches strings | 9 | ✅ | 48.5M | ✅ | 45.0M | -7% |
| type.json | object type matches objects | 7 | ✅ | 41.3M | ✅ | 39.3M | -5% |
| type.json | array type matches arrays | 7 | ✅ | 44.9M | ✅ | 39.8M | -12% |
| type.json | boolean type matches booleans | 10 | ✅ | 43.5M | ✅ | 42.0M | -3% |
| type.json | null type matches only the null object | 10 | ✅ | 42.8M | ✅ | 41.8M | -2% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 42.9M | ✅ | 37.1M | -14% |
| type.json | type as array with one item | 2 | ✅ | 55.7M | ✅ | 48.5M | -13% |
| type.json | type: array or object | 5 | ✅ | 49.3M | ✅ | 42.3M | -14% |
| type.json | type: array, object or null | 5 | ✅ | 53.9M | ✅ | 46.2M | -14% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 75.3M | ✅ | 69.1M | -8% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 48.0M | ✅ | 48.0M | +0% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 50.5M | ✅ | 42.9M | -15% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 66.0M | ✅ | 61.7M | -6% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 45.6M | ✅ | 41.4M | -9% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 73.4M | ✅ | 66.5M | -9% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 42.1M | ✅ | 41.2M | -2% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 42.4M | ✅ | 44.3M | +5% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 75.8M | ✅ | 63.5M | -16% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.4M | ✅ | 64.2M | 🔴 **+214%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.1M | ✅ | 31.0M | 🔴 **+155%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.2M | ✅ | 27.5M | 🔴 **+81%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 32.2M | ✅ | 37.0M | +15% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.2M | ✅ | 29.7M | 🔴 **+164%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 47.9M | ✅ | 48.4M | +1% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 43.1M | ✅ | 43.7M | +2% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 43.7M | ✅ | 43.5M | -1% |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 33.8M | ✅ | 39.5M | +17% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.4M | ✅ | 29.8M | +17% |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 19.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 82.3M | ✅ | 55.3M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 70.3M | ✅ | 66.0M | -6% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 44.8M | ✅ | 37.0M | -17% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 51.1M | ✅ | 66.9M | 🔴 **+31%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.4M | ✅ | 16.0M | 🟢 **-51%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.2M | ✅ | 40.2M | +14% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.9M | ✅ | 36.4M | +14% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 13.3M | ✅ | 12.1M | -9% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 170.6M | ✅ | 68.9M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 32.4M | ✅ | 13.6M | 🟢 **-58%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 27.2M | ✅ | 30.8M | +13% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.1M | ✅ | 8.7M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 61.0M | ✅ | 60.1M | -1% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.0M | ✅ | 60.4M | 🔴 **+116%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.3M | ✅ | 10.1M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.6M | ✅ | 12.4M | 🟢 **-29%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.6M | ✅ | 29.9M | 🔴 **+27%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.7M | ✅ | 17.7M | +0% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 16.5M | ✅ | 19.1M | +15% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.5M | ✅ | 25.1M | -2% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.7M | ✅ | 37.2M | +14% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.4M | ✅ | 31.0M | +13% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 27.2M | ✅ | 30.9M | +14% |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.4M | ✅ | 33.5M | 🔴 **+22%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.5M | ✅ | 33.3M | 🔴 **+21%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.4M | ✅ | 59.1M | 🔴 **+101%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.3M | ✅ | 56.6M | 🔴 **+93%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.9M | ✅ | 26.1M | +9% |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.2M | ✅ | 30.5M | +16% |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.7M | ✅ | 27.9M | 🔴 **+42%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ✅ | 35.7M | 🔴 **+199%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.6M | ✅ | 23.4M | -9% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 30.7M | ✅ | 31.8M | +4% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 35.8M | ✅ | 25.2M | 🟢 **-30%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.5M | ✅ | 13.3M | -20% |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.6M | ✅ | 13.7M | 🟢 **-26%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ✅ | 5.3M | 🟢 **-24%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 67.6M | ✅ | 54.5M | -19% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 46.5M | ✅ | 44.8M | -4% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.0M | ✅ | 12.5M | 🟢 **-50%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.6M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.8M | ✅ | 26.3M | 🔴 **+27%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 22.5M | ✅ | 29.0M | 🔴 **+29%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ✅ | 7.0M | 🟢 **-58%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.7M | ✅ | 20.0M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 37.3M | ✅ | 27.1M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ✅ | 54.2M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.3M | ✅ | 54.2M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.4M | ✅ | 48.6M | -17% |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 46.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 55.8M | ✅ | 48.4M | -13% |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 47.0M | ✅ | 11.0M | 🟢 **-77%** |
| optional/bignum.json | integer | 2 | ✅ | 72.6M | ✅ | 14.2M | 🟢 **-80%** |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ✅ | 66.2M | -13% |
| optional/bignum.json | string | 1 | ✅ | 42.4M | ✅ | 39.9M | -6% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 66.4M | ✅ | 67.9M | +2% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 39.1M | ✅ | 38.2M | -2% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.2M | ✅ | 67.5M | -4% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.3M | ✅ | 38.1M | -5% |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 74.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.4M | ✅ | 48.4M | -11% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 65.9M | 🟢 **-62%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 28.7M | ✅ | 33.4M | +17% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 37.9M | ✅ | 35.3M | -7% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 44.6M | ✅ | 42.6M | -5% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 44.3M | ✅ | 39.8M | -10% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 37.1M | ✅ | 31.8M | -14% |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.5M | ✅ | 27.6M | 🟢 **-43%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 15.5M | ✅ | 27.6M | 🔴 **+78%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.1M | ✅ | 27.8M | +15% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.2M | ✅ | 27.7M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 23.0M | ✅ | 27.1M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.4M | ✅ | 28.8M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.4M | ✅ | 27.5M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.5M | ✅ | 26.7M | +5% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 29.7M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.5M | ✅ | 24.9M | -2% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.1M | ✅ | 17.3M | +7% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.9M | ✅ | 13.5M | -3% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.2M | ✅ | 14.4M | +2% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.8M | ✅ | 26.5M | +7% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.5M | ✅ | 22.6M | +11% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.6M | ✅ | 23.2M | +3% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.4M | ✅ | 21.1M | +9% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ✅ | 21.8M | +10% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 9.5M | 🔴 **+21%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 8.5M | +3% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 16.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.6M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.4M | ✅ | 8.1M | 🟢 **-67%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 35.4M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 36.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.3M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.3M | ✅ | 77K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.8M | ✅ | 31.1M | -13% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.0M | ✅ | 2.8M | 🟢 **-83%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 29.4M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.2M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.5M | ✅ | 25.1M | -12% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 65.6M | ✅ | 908K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.1M | ✅ | 30.6M | -5% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ✅ | 5.7M | -13% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.7M | ✅ | 48.1M | 🟢 **-36%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ✅ | 9.3M | -2% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.0M | ✅ | 15.4M | -4% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.3M | 🟢 **-31%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.2M | ✅ | 15.1M | +6% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 21.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 22.1M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.9M | ✅ | 12.0M | 🟢 **-67%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 54.4M | ✅ | 43.1M | 🟢 **-21%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.8M | ✅ | 26.6M | +3% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.8M | ✅ | 6.6M | 🟢 **-61%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 42.1M | ✅ | 43.6M | +3% |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.4M | ✅ | 43.5M | +2% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.4M | ✅ | 39.7M | -7% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 55.7M | ✅ | 48.3M | -13% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 41.8M | ✅ | 43.4M | +4% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 23.9M | ❌ | - | - |
