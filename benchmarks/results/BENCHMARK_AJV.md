# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | ajv pass | ajv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 27.0M | 172/199 | 13.4M | 172 | 🟢 **-50%** |
| draft6 | 276 | ✅ 276 | 28.9M | 269/276 | 14.8M | 269 | 🟢 **-49%** |
| draft7 | 313 | ✅ 313 | 14.8M | 296/313 | 13.2M | 296 | -11% |
| draft2019-09 | 435 | ✅ 435 | 18.7M | 413/435 | 6.4M | 413 | 🟢 **-66%** |
| draft2020-12 | 448 | ✅ 448 | 19.8M | 398/448 | 6.8M | 398 | 🟢 **-66%** |
| **Total** | 1671 | 1670/1671 | 19.7M | 1548/1671 | 8.8M | 1548 | 🟢 **-55%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.98x faster** (38 ns vs 113 ns per test, 6602 tests in 1548 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.0M | ✅ | 53.3M | -11% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.5M | ✅ | 71.2M | 🟢 **-55%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.9M | ✅ | 49.6M | 🟢 **-63%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.2M | ✅ | 51.9M | 🟢 **-70%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 129.0M | ✅ | 66.6M | 🟢 **-48%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 36.3M | ✅ | 27.8M | 🟢 **-23%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 55.3M | ✅ | 37.5M | 🟢 **-32%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 59.9M | ✅ | 48.2M | -20% |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.0M | ✅ | 71.3M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 47.6M | ✅ | 24.5M | 🟢 **-49%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 43.9M | ✅ | 23.1M | 🟢 **-47%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 33.9M | ✅ | 17.0M | 🟢 **-50%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 50.4M | ✅ | 13.7M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ✅ | 70.9M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.3M | ✅ | 7.6M | 🟢 **-81%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 48.2M | ✅ | 45.0M | -7% |
| allOf.json | allOf | 4 | ✅ | 71.5M | ✅ | 30.7M | 🟢 **-57%** |
| allOf.json | allOf with base schema | 5 | ✅ | 23.5M | ✅ | 24.9M | +6% |
| allOf.json | allOf simple types | 2 | ✅ | 113.7M | ✅ | 39.0M | 🟢 **-66%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.2M | ✅ | 71.1M | 🟢 **-55%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.5M | ✅ | 71.6M | 🟢 **-55%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 58.9M | ✅ | 48.5M | -18% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.8M | ✅ | 49.0M | 🟢 **-58%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 48.1M | 🟢 **-21%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 80.6M | ✅ | 10.2M | 🟢 **-87%** |
| anyOf.json | anyOf | 4 | ✅ | 62.9M | ✅ | 27.1M | 🟢 **-57%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.0M | ✅ | 20.9M | 🟢 **-58%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 45.7M | ✅ | 27.2M | 🟢 **-40%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 67.5M | 🟢 **-61%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 27.2M | 🟢 **-55%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 56.8M | 🟢 **-44%** |
| default.json | invalid string value for default | 2 | ✅ | 48.6M | ✅ | 47.7M | -2% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 75.6M | ✅ | 44.0M | 🟢 **-42%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.4M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.6M | ✅ | 44.7M | 🟢 **-51%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 29.6M | ✅ | 33.8M | +14% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 57.7M | ✅ | 39.0M | 🟢 **-32%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.3M | ✅ | 21.9M | 🔴 **+20%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.2M | ✅ | 38.5M | 🟢 **-28%** |
| enum.json | simple enum validation | 2 | ✅ | 24.9M | ✅ | 49.2M | 🔴 **+98%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 57.6M | ✅ | 17.3M | 🟢 **-70%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.7M | ✅ | 44.7M | 🟢 **-29%** |
| enum.json | enums in properties | 6 | ✅ | 50.0M | ✅ | 33.3M | 🟢 **-34%** |
| enum.json | enum with escaped characters | 3 | ✅ | 49.1M | ✅ | 43.5M | -11% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.2M | ✅ | 38.8M | 🟢 **-65%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 48.2M | ✅ | 24.8M | 🟢 **-49%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.5M | ✅ | 39.1M | 🟢 **-64%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 46.6M | ✅ | 26.5M | 🟢 **-43%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.4M | ✅ | 48.0M | 🟢 **-57%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.5M | ✅ | 28.1M | 🟢 **-48%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.4M | ✅ | 46.1M | 🟢 **-60%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 50.8M | ✅ | 28.0M | 🟢 **-45%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 46.3M | 🟢 **-48%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 46.2M | ✅ | 44.2M | -4% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ✅ | 46.7M | 🟢 **-49%** |
| format.json | email format | 6 | ✅ | 77.3M | ✅ | 54.6M | 🟢 **-29%** |
| format.json | ipv4 format | 6 | ✅ | 162.7M | ✅ | 54.3M | 🟢 **-67%** |
| format.json | ipv6 format | 6 | ✅ | 80.2M | ✅ | 54.3M | 🟢 **-32%** |
| format.json | hostname format | 6 | ✅ | 163.0M | ✅ | 52.1M | 🟢 **-68%** |
| format.json | date-time format | 6 | ✅ | 77.4M | ✅ | 54.6M | 🟢 **-29%** |
| format.json | uri format | 6 | ✅ | 162.7M | ✅ | 54.3M | 🟢 **-67%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 36.7M | ✅ | 35.8M | -3% |
| items.json | a schema given for items | 4 | ✅ | 88.3M | ✅ | 43.4M | 🟢 **-51%** |
| items.json | an array of schemas for items | 6 | ✅ | 61.1M | ✅ | 49.6M | -19% |
| items.json | items and subitems | 6 | ✅ | 34.7M | ✅ | 21.9M | 🟢 **-37%** |
| items.json | nested items | 3 | ✅ | 13.1M | ✅ | 11.3M | -13% |
| items.json | items with null instance elements | 1 | ✅ | 44.7M | ✅ | 59.3M | 🔴 **+33%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 78.8M | ✅ | 67.7M | -14% |
| maxItems.json | maxItems validation | 4 | ✅ | 68.8M | ✅ | 46.6M | 🟢 **-32%** |
| maxLength.json | maxLength validation | 5 | ✅ | 56.1M | ✅ | 46.8M | -16% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 50.2M | ✅ | 41.2M | -18% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 40.0M | ✅ | 26.9M | 🟢 **-33%** |
| maximum.json | maximum validation | 4 | ✅ | 59.9M | ✅ | 46.0M | 🟢 **-23%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 60.1M | ✅ | 47.6M | 🟢 **-21%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 64.8M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 47.6M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 63.3M | ✅ | 47.5M | 🟢 **-25%** |
| minLength.json | minLength validation | 5 | ✅ | 50.3M | ✅ | 22.5M | 🟢 **-55%** |
| minProperties.json | minProperties validation | 6 | ✅ | 52.7M | ✅ | 41.7M | 🟢 **-21%** |
| minimum.json | minimum validation | 4 | ✅ | 65.3M | ✅ | 46.6M | 🟢 **-29%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 64.9M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 55.7M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 61.2M | ✅ | 47.8M | 🟢 **-22%** |
| multipleOf.json | by int | 3 | ✅ | 62.7M | ✅ | 43.3M | 🟢 **-31%** |
| multipleOf.json | by number | 3 | ✅ | 58.9M | ✅ | 41.5M | 🟢 **-30%** |
| multipleOf.json | by small number | 2 | ✅ | 54.1M | ✅ | 40.5M | 🟢 **-25%** |
| multipleOf.json | float division = inf | 1 | ✅ | 41.0M | ✅ | 8.7M | 🟢 **-79%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.1M | ✅ | 8.4M | 🟢 **-87%** |
| not.json | not | 2 | ✅ | 59.4M | ✅ | 41.4M | 🟢 **-30%** |
| not.json | not multiple types | 3 | ✅ | 52.9M | ✅ | 34.3M | 🟢 **-35%** |
| not.json | not more complex schema | 3 | ✅ | 55.4M | ✅ | 35.6M | 🟢 **-36%** |
| not.json | forbidden property | 2 | ✅ | 44.2M | ✅ | 39.8M | -10% |
| not.json | forbid everything with empty schema | 9 | ✅ | 43.5M | ✅ | 37.4M | -14% |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 71.6M | 🟢 **-55%** |
| oneOf.json | oneOf | 4 | ✅ | 48.4M | ✅ | 22.7M | 🟢 **-53%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.6M | ✅ | 26.2M | -17% |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.4M | ✅ | 20.5M | 🟢 **-47%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 58.3M | ✅ | 36.5M | 🟢 **-37%** |
| oneOf.json | oneOf with required | 4 | ✅ | 39.3M | ✅ | 16.8M | 🟢 **-57%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.2M | ✅ | 18.4M | 🟢 **-55%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.9M | ✅ | 27.1M | 🟢 **-54%** |
| pattern.json | pattern validation | 8 | ✅ | 50.6M | ✅ | 44.2M | -13% |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.6M | ✅ | 31.0M | 🟢 **-34%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 13.7M | 🟢 **-47%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 6.8M | 🟢 **-54%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.5M | ✅ | 7.9M | 🟢 **-52%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.5M | ✅ | 9.1M | 🟢 **-48%** |
| properties.json | object properties validation | 6 | ✅ | 47.7M | ✅ | 43.0M | -10% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ✅ | 9.3M | 🟢 **-53%** |
| properties.json | properties with escaped characters | 2 | ✅ | 41.5M | ✅ | 38.0M | -9% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.3M | ✅ | 56.4M | -9% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.5M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.7M | ✅ | 21.3M | -6% |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.5M | ✅ | 40.8M | -8% |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.0M | ✅ | 45.0M | -8% |
| ref.json | escaped pointer ref | 6 | ✅ | 38.6M | ✅ | 39.3M | +2% |
| ref.json | nested refs | 2 | ✅ | 44.9M | ✅ | 43.9M | -2% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 46.9M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 58.9M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.7M | ✅ | 41.7M | -7% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.7M | ✅ | 42.1M | -6% |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 44.6M | ✅ | 42.5M | -5% |
| ref.json | Location-independent identifier | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 55.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 46.4M | ✅ | 17.3M | 🟢 **-63%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 56.4M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 58.8M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 58.8M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 53.5M | ✅ | 47.9M | -10% |
| refRemote.json | remote ref | 2 | ✅ | 55.8M | ✅ | 46.5M | -17% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.1M | ✅ | 47.4M | +1% |
| refRemote.json | ref within remote ref | 2 | ✅ | 55.9M | ✅ | 47.7M | -15% |
| refRemote.json | base URI change | 2 | ✅ | 29.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 55.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 55.6M | ✅ | 47.6M | -14% |
| required.json | required default validation | 1 | ✅ | 147.0M | ✅ | 71.4M | 🟢 **-51%** |
| required.json | required with escaped characters | 2 | ✅ | 42.0M | ✅ | 36.4M | -13% |
| required.json | required properties whose names are J... | 7 | ✅ | 23.8M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 44.5M | ✅ | 36.9M | -17% |
| type.json | number type matches numbers | 9 | ✅ | 51.8M | ✅ | 43.8M | -15% |
| type.json | string type matches strings | 9 | ✅ | 51.4M | ✅ | 45.6M | -11% |
| type.json | object type matches objects | 7 | ✅ | 43.7M | ✅ | 36.4M | -17% |
| type.json | array type matches arrays | 7 | ✅ | 48.0M | ✅ | 41.0M | -14% |
| type.json | boolean type matches booleans | 10 | ✅ | 48.8M | ✅ | 36.5M | 🟢 **-25%** |
| type.json | null type matches only the null object | 10 | ✅ | 45.8M | ✅ | 35.6M | 🟢 **-22%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 48.7M | ✅ | 37.0M | 🟢 **-24%** |
| type.json | type as array with one item | 2 | ✅ | 58.9M | ✅ | 49.1M | -17% |
| type.json | type: array or object | 5 | ✅ | 52.6M | ✅ | 39.6M | 🟢 **-25%** |
| type.json | type: array, object or null | 5 | ✅ | 59.0M | ✅ | 43.4M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ✅ | 10.2M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.5M | ✅ | 20.9M | 🟢 **-31%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.1M | ✅ | 27.5M | 🔴 **+52%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ✅ | 53.4M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.9M | ✅ | 53.5M | 🟢 **-25%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ✅ | 48.2M | 🟢 **-22%** |
| optional/bignum.json | integer | 2 | ✅ | 75.1M | ✅ | 14.1M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 80.0M | ✅ | 67.6M | -15% |
| optional/bignum.json | string | 1 | ✅ | 45.0M | ✅ | 31.1M | 🟢 **-31%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 73.5M | ✅ | 47.6M | 🟢 **-35%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 43.1M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 67.3M | -8% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 43.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 51.0M | ✅ | 27.6M | 🟢 **-46%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.2M | ✅ | 27.6M | 🔴 **+52%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.1M | ✅ | 27.9M | +7% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.7M | ✅ | 27.9M | +13% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 18.2M | ✅ | 25.4M | 🔴 **+40%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.0M | ✅ | 29.3M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.0M | ✅ | 27.6M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.7M | ✅ | 26.6M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 30.7M | ✅ | 30.4M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.7M | ✅ | 24.8M | -7% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ✅ | 15.5M | -6% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.7M | ✅ | 14.1M | +3% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.0M | ✅ | 14.4M | +3% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.7M | ✅ | 26.6M | +7% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.2M | ✅ | 23.5M | 🔴 **+29%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.9M | ✅ | 22.8M | +4% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.8M | ✅ | 20.7M | +5% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 20.4M | +1% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 8.9M | +12% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ✅ | 9.0M | +6% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.1M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.0M | ✅ | 22.4M | 🔴 **+24%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.6M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 33.2M | ✅ | 30.8M | -7% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.3M | ✅ | 2.8M | 🟢 **-83%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 78.3M | ✅ | 54.7M | 🟢 **-30%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.2M | 🟢 **-32%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 38.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.7M | ✅ | 27.0M | +5% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.5M | ✅ | 8.4M | 🟢 **-49%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.2M | ✅ | 48.2M | -20% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 34.7M | ✅ | 29.7M | -15% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.1M | ✅ | 68.4M | 🟢 **-57%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 71.8M | ✅ | 42.0M | 🟢 **-41%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.9M | ✅ | 71.3M | 🟢 **-59%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 78.7M | ✅ | 68.2M | -13% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 22.0M | 🟢 **-61%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.7M | ✅ | 27.1M | 🟢 **-37%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 40.1M | 🟢 **-63%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.2M | ✅ | 72.8M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.3M | ✅ | 24.5M | 🟢 **-60%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.1M | ✅ | 20.2M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.0M | ✅ | 12.6M | 🟢 **-71%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.4M | ✅ | 13.5M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.2M | ✅ | 74.1M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.6M | ✅ | 8.1M | 🟢 **-71%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 42.2M | 🟢 **-37%** |
| allOf.json | allOf | 4 | ✅ | 32.3M | ✅ | 28.6M | -11% |
| allOf.json | allOf with base schema | 5 | ✅ | 28.5M | ✅ | 22.5M | 🟢 **-21%** |
| allOf.json | allOf simple types | 2 | ✅ | 55.8M | ✅ | 36.3M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 73.9M | 🟢 **-54%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 46.1M | ✅ | 29.9M | 🟢 **-35%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 28.8M | 🟢 **-69%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.6M | ✅ | 72.1M | 🟢 **-55%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ✅ | 73.8M | 🟢 **-54%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 58.2M | ✅ | 39.5M | 🟢 **-32%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.8M | ✅ | 40.5M | 🟢 **-65%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 60.0M | ✅ | 36.8M | 🟢 **-39%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 75.2M | ✅ | 9.3M | 🟢 **-88%** |
| anyOf.json | anyOf | 4 | ✅ | 62.6M | ✅ | 22.5M | 🟢 **-64%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 47.8M | ✅ | 13.0M | 🟢 **-73%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 157.1M | ✅ | 68.8M | 🟢 **-56%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 73.6M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 42.6M | ✅ | 12.3M | 🟢 **-71%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 72.4M | ✅ | 23.1M | 🟢 **-68%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.4M | ✅ | 71.9M | 🟢 **-58%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 18.7M | 🟢 **-84%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 177.6M | ✅ | 53.1M | 🟢 **-70%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 81.1M | ✅ | 30.1M | 🟢 **-63%** |
| const.json | const validation | 3 | ✅ | 51.3M | ✅ | 30.5M | 🟢 **-40%** |
| const.json | const with object | 4 | ✅ | 50.1M | ✅ | 14.0M | 🟢 **-72%** |
| const.json | const with array | 3 | ✅ | 43.5M | ✅ | 15.5M | 🟢 **-64%** |
| const.json | const with null | 2 | ✅ | 117.8M | ✅ | 36.0M | 🟢 **-69%** |
| const.json | const with false does not match 0 | 3 | ✅ | 54.2M | ✅ | 32.0M | 🟢 **-41%** |
| const.json | const with true does not match 1 | 3 | ✅ | 107.8M | ✅ | 31.3M | 🟢 **-71%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 47.3M | ✅ | 22.0M | 🟢 **-53%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ✅ | 21.0M | 🟢 **-78%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 48.7M | ✅ | 11.8M | 🟢 **-76%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 92.4M | ✅ | 11.7M | 🟢 **-87%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 46.3M | ✅ | 35.6M | 🟢 **-23%** |
| const.json | const with 1 does not match true | 3 | ✅ | 114.1M | ✅ | 38.3M | 🟢 **-66%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 52.0M | ✅ | 35.3M | 🟢 **-32%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 53.6M | ✅ | 36.3M | 🟢 **-32%** |
| const.json | nul characters in strings | 2 | ✅ | 44.1M | ✅ | 34.2M | 🟢 **-23%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.3M | ✅ | 35.0M | 🟢 **-46%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 52.5M | ✅ | 34.6M | 🟢 **-34%** |
| contains.json | contains keyword validation | 6 | ✅ | 94.9M | ✅ | 12.7M | 🟢 **-87%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 54.5M | ✅ | 9.4M | 🟢 **-83%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 74.2M | ✅ | 36.3M | 🟢 **-51%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 52.4M | ✅ | 23.9M | 🟢 **-54%** |
| contains.json | items + contains | 4 | ✅ | 58.7M | ✅ | 6.9M | 🟢 **-88%** |
| contains.json | contains with null instance elements | 1 | ✅ | 76.7M | ✅ | 66.9M | -13% |
| default.json | invalid type for default | 2 | ✅ | 81.0M | ✅ | 33.7M | 🟢 **-58%** |
| default.json | invalid string value for default | 2 | ✅ | 50.3M | ✅ | 49.4M | -2% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 63.3M | ✅ | 38.0M | 🟢 **-40%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.6M | ✅ | 1.4M | 🟢 **-88%** |
| dependencies.json | dependencies | 7 | ✅ | 87.4M | ✅ | 45.2M | 🟢 **-48%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.1M | ✅ | 61.0M | 🟢 **-65%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 36.7M | ✅ | 29.7M | -19% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 35.9M | ✅ | 32.8M | -9% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 67.9M | ✅ | 35.0M | 🟢 **-48%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.9M | ✅ | 19.6M | +9% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 52.5M | ✅ | 30.1M | 🟢 **-43%** |
| enum.json | simple enum validation | 2 | ✅ | 55.5M | ✅ | 36.4M | 🟢 **-34%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.7M | ✅ | 10.3M | 🟢 **-83%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 54.8M | ✅ | 40.2M | 🟢 **-27%** |
| enum.json | enums in properties | 6 | ✅ | 49.7M | ✅ | 30.4M | 🟢 **-39%** |
| enum.json | enum with escaped characters | 3 | ✅ | 63.9M | ✅ | 39.4M | 🟢 **-38%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.5M | ✅ | 35.1M | 🟢 **-68%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 45.6M | ✅ | 19.2M | 🟢 **-58%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 95.9M | ✅ | 31.7M | 🟢 **-67%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 48.9M | ✅ | 19.1M | 🟢 **-61%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.1M | ✅ | 40.1M | 🟢 **-64%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.3M | ✅ | 20.7M | 🟢 **-61%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.4M | ✅ | 40.2M | 🟢 **-65%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 55.3M | ✅ | 21.2M | 🟢 **-62%** |
| enum.json | nul characters in strings | 2 | ✅ | 67.1M | ✅ | 35.4M | 🟢 **-47%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 51.0M | ✅ | 23.2M | 🟢 **-54%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 113.2M | ✅ | 33.5M | 🟢 **-70%** |
| format.json | email format | 6 | ✅ | 80.8M | ✅ | 54.7M | 🟢 **-32%** |
| format.json | ipv4 format | 6 | ✅ | 133.4M | ✅ | 54.2M | 🟢 **-59%** |
| format.json | ipv6 format | 6 | ✅ | 82.5M | ✅ | 53.6M | 🟢 **-35%** |
| format.json | hostname format | 6 | ✅ | 162.0M | ✅ | 54.2M | 🟢 **-67%** |
| format.json | date-time format | 6 | ✅ | 81.0M | ✅ | 49.2M | 🟢 **-39%** |
| format.json | json-pointer format | 6 | ✅ | 160.1M | ✅ | 53.9M | 🟢 **-66%** |
| format.json | uri format | 6 | ✅ | 82.6M | ✅ | 55.5M | 🟢 **-33%** |
| format.json | uri-reference format | 6 | ✅ | 161.1M | ✅ | 53.0M | 🟢 **-67%** |
| format.json | uri-template format | 6 | ✅ | 82.5M | ✅ | 45.3M | 🟢 **-45%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 55.5M | ✅ | 29.8M | 🟢 **-46%** |
| items.json | a schema given for items | 4 | ✅ | 53.1M | ✅ | 31.2M | 🟢 **-41%** |
| items.json | an array of schemas for items | 6 | ✅ | 108.9M | ✅ | 43.4M | 🟢 **-60%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 168.5M | ✅ | 71.6M | 🟢 **-58%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 129.2M | ✅ | 29.4M | 🟢 **-77%** |
| items.json | items with boolean schemas | 3 | ✅ | 51.3M | ✅ | 39.4M | 🟢 **-23%** |
| items.json | items and subitems | 6 | ✅ | 29.9M | ✅ | 19.0M | 🟢 **-37%** |
| items.json | nested items | 3 | ✅ | 13.2M | ✅ | 10.1M | 🟢 **-23%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 73.4M | ✅ | 67.6M | -8% |
| items.json | array-form items with null instance e... | 1 | ✅ | 78.6M | ✅ | 69.9M | -11% |
| maxItems.json | maxItems validation | 4 | ✅ | 66.3M | ✅ | 39.6M | 🟢 **-40%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 59.2M | ✅ | 26.2M | 🟢 **-56%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.8M | ✅ | 40.5M | 🟢 **-27%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 47.9M | ✅ | 32.7M | 🟢 **-32%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 51.1M | ✅ | 35.3M | 🟢 **-31%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.0M | ✅ | 26.5M | 🟢 **-34%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 40.8M | ✅ | 27.5M | 🟢 **-33%** |
| maximum.json | maximum validation | 4 | ✅ | 64.2M | ✅ | 42.0M | 🟢 **-35%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 63.4M | ✅ | 42.7M | 🟢 **-33%** |
| minItems.json | minItems validation | 4 | ✅ | 68.8M | ✅ | 43.3M | 🟢 **-37%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 58.9M | ✅ | 40.4M | 🟢 **-31%** |
| minLength.json | minLength validation | 5 | ✅ | 49.9M | ✅ | 36.2M | 🟢 **-28%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.4M | ✅ | 34.1M | 🟢 **-31%** |
| minProperties.json | minProperties validation | 6 | ✅ | 52.1M | ✅ | 39.1M | 🟢 **-25%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 40.3M | ✅ | 27.1M | 🟢 **-33%** |
| minimum.json | minimum validation | 4 | ✅ | 64.0M | ✅ | 42.2M | 🟢 **-34%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 60.6M | ✅ | 41.6M | 🟢 **-31%** |
| multipleOf.json | by int | 3 | ✅ | 63.6M | ✅ | 38.1M | 🟢 **-40%** |
| multipleOf.json | by number | 3 | ✅ | 58.1M | ✅ | 37.2M | 🟢 **-36%** |
| multipleOf.json | by small number | 2 | ✅ | 53.4M | ✅ | 34.1M | 🟢 **-36%** |
| multipleOf.json | float division = inf | 1 | ✅ | 39.9M | ✅ | 7.8M | 🟢 **-80%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.1M | ✅ | 10.6M | 🟢 **-84%** |
| not.json | not | 2 | ✅ | 58.7M | ✅ | 29.8M | 🟢 **-49%** |
| not.json | not multiple types | 3 | ✅ | 51.9M | ✅ | 24.9M | 🟢 **-52%** |
| not.json | not more complex schema | 3 | ✅ | 54.9M | ✅ | 30.0M | 🟢 **-45%** |
| not.json | forbidden property | 2 | ✅ | 41.8M | ✅ | 33.3M | 🟢 **-20%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 42.6M | ✅ | 30.3M | 🟢 **-29%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 42.5M | ✅ | 29.9M | 🟢 **-30%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.5M | ✅ | 54.0M | 🟢 **-70%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 74.5M | 🟢 **-53%** |
| oneOf.json | oneOf | 4 | ✅ | 47.9M | ✅ | 17.0M | 🟢 **-64%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.5M | ✅ | 22.2M | 🟢 **-27%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 46.1M | ✅ | 26.6M | 🟢 **-42%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 158.8M | ✅ | 16.8M | 🟢 **-89%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 46.1M | ✅ | 25.5M | 🟢 **-45%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 46.0M | ✅ | 11.7M | 🟢 **-74%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.6M | ✅ | 18.4M | 🟢 **-52%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 57.0M | ✅ | 27.2M | 🟢 **-52%** |
| oneOf.json | oneOf with required | 4 | ✅ | 39.5M | ✅ | 14.1M | 🟢 **-64%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.5M | ✅ | 18.4M | 🟢 **-56%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.4M | ✅ | 21.5M | 🟢 **-63%** |
| pattern.json | pattern validation | 8 | ✅ | 49.2M | ✅ | 38.8M | 🟢 **-21%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.4M | ✅ | 32.4M | 🟢 **-32%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.4M | ✅ | 12.2M | 🟢 **-50%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.2M | ✅ | 7.7M | 🟢 **-46%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.8M | ✅ | 8.2M | 🟢 **-51%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.8M | ✅ | 9.0M | 🟢 **-52%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 21.6M | 🔴 **+23%** |
| properties.json | object properties validation | 6 | ✅ | 44.0M | ✅ | 39.3M | -11% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ✅ | 9.4M | 🟢 **-52%** |
| properties.json | properties with boolean schema | 4 | ✅ | 38.8M | ✅ | 33.8M | -13% |
| properties.json | properties with escaped characters | 2 | ✅ | 41.4M | ✅ | 34.1M | -18% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.2M | ✅ | 63.8M | +3% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.7M | ✅ | 27.2M | 🟢 **-36%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ✅ | 15.4M | -19% |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.7M | ✅ | 71.7M | 🟢 **-58%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 40.5M | ✅ | 20.4M | 🟢 **-50%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.4M | ✅ | 26.0M | 🟢 **-32%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.1M | ✅ | 25.8M | 🟢 **-36%** |
| ref.json | root pointer ref | 4 | ✅ | 23.3M | ✅ | 19.0M | -19% |
| ref.json | relative pointer ref to object | 2 | ✅ | 40.7M | ✅ | 34.8M | -15% |
| ref.json | relative pointer ref to array | 2 | ✅ | 45.5M | ✅ | 36.3M | 🟢 **-20%** |
| ref.json | escaped pointer ref | 6 | ✅ | 36.5M | ✅ | 35.4M | -3% |
| ref.json | nested refs | 2 | ✅ | 41.0M | ✅ | 37.5M | -9% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 46.6M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.9M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.8M | ✅ | 4.8M | 🟢 **-80%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 43.2M | ✅ | 36.5M | -16% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 43.2M | ✅ | 36.2M | -16% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ✅ | 73.8M | 🟢 **-54%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 45.9M | ✅ | 28.6M | 🟢 **-38%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.0M | ✅ | 7.1M | 🟢 **-21%** |
| ref.json | refs with quote | 2 | ✅ | 43.1M | ✅ | 35.4M | -18% |
| ref.json | Location-independent identifier | 2 | ✅ | 51.9M | ✅ | 37.2M | 🟢 **-28%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 52.0M | ✅ | 37.6M | 🟢 **-28%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.9M | ✅ | 37.9M | 🟢 **-25%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 42.0M | ✅ | 12.9M | 🟢 **-69%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 35.0M | ✅ | 29.7M | -15% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.0M | ✅ | 27.4M | 🟢 **-22%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.8M | ✅ | 22.0M | 🟢 **-31%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 43.1M | ✅ | 38.8M | -10% |
| ref.json | URN base URI with NSS | 2 | ✅ | 43.4M | ✅ | 37.0M | -15% |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.7M | ✅ | 37.8M | -12% |
| ref.json | URN base URI with q-component | 2 | ✅ | 43.5M | ✅ | 36.4M | -16% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.4M | ✅ | 34.2M | -19% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.2M | ✅ | 36.3M | -18% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.7M | ✅ | 35.8M | 🟢 **-29%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.1M | ✅ | 36.7M | 🟢 **-37%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.1M | ✅ | 37.2M | 🟢 **-36%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.2M | ✅ | 37.0M | 🟢 **-36%** |
| refRemote.json | remote ref | 2 | ✅ | 53.0M | ✅ | 37.6M | 🟢 **-29%** |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.1M | ✅ | 36.6M | 🟢 **-27%** |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.0M | ✅ | 37.1M | 🟢 **-30%** |
| refRemote.json | base URI change | 2 | ✅ | 28.5M | ✅ | 23.6M | -17% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.4M | ✅ | 25.7M | -15% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.0M | ✅ | 24.9M | 🟢 **-33%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 36.2M | ✅ | 10.1M | 🟢 **-72%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 43.6M | ✅ | 31.1M | 🟢 **-29%** |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 42.4M | ✅ | 33.3M | 🟢 **-21%** |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.1M | ✅ | 27.2M | 🟢 **-29%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 39.3M | ✅ | 37.4M | -5% |
| required.json | required validation | 5 | ✅ | 54.0M | ✅ | 43.6M | -19% |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 73.8M | 🟢 **-54%** |
| required.json | required with empty array | 1 | ✅ | 159.4M | ✅ | 73.2M | 🟢 **-54%** |
| required.json | required with escaped characters | 2 | ✅ | 41.7M | ✅ | 29.8M | 🟢 **-29%** |
| required.json | required properties whose names are J... | 7 | ✅ | 22.7M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 45.4M | ✅ | 34.2M | 🟢 **-25%** |
| type.json | number type matches numbers | 9 | ✅ | 50.8M | ✅ | 34.9M | 🟢 **-31%** |
| type.json | string type matches strings | 9 | ✅ | 49.9M | ✅ | 38.2M | 🟢 **-23%** |
| type.json | object type matches objects | 7 | ✅ | 42.2M | ✅ | 33.2M | 🟢 **-21%** |
| type.json | array type matches arrays | 7 | ✅ | 57.3M | ✅ | 34.1M | 🟢 **-40%** |
| type.json | boolean type matches booleans | 10 | ✅ | 47.1M | ✅ | 35.4M | 🟢 **-25%** |
| type.json | null type matches only the null object | 10 | ✅ | 44.8M | ✅ | 34.3M | 🟢 **-23%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 47.3M | ✅ | 33.0M | 🟢 **-30%** |
| type.json | type as array with one item | 2 | ✅ | 58.2M | ✅ | 38.2M | 🟢 **-34%** |
| type.json | type: array or object | 5 | ✅ | 50.8M | ✅ | 35.3M | 🟢 **-30%** |
| type.json | type: array, object or null | 5 | ✅ | 57.1M | ✅ | 39.4M | 🟢 **-31%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ✅ | 9.9M | 🟢 **-41%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.0M | ✅ | 20.3M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.6M | ✅ | 23.8M | 🔴 **+35%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ✅ | 55.6M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.8M | ✅ | 52.1M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.8M | ✅ | 43.5M | 🟢 **-27%** |
| optional/bignum.json | integer | 2 | ✅ | 76.1M | ✅ | 11.6M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 77.7M | ✅ | 70.8M | -9% |
| optional/bignum.json | string | 1 | ✅ | 44.3M | ✅ | 31.1M | 🟢 **-30%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 73.5M | ✅ | 71.2M | -3% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 42.1M | ✅ | 27.9M | 🟢 **-34%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 70.6M | -4% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 42.2M | ✅ | 27.5M | 🟢 **-35%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 49.9M | ✅ | 23.7M | 🟢 **-52%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 23.4M | ✅ | 24.1M | +3% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 17.7M | ✅ | 23.8M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.4M | ✅ | 23.8M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 23.4M | ✅ | 22.1M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 23.7M | ✅ | 24.3M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.7M | ✅ | 23.7M | +0% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 23.7M | ✅ | 23.7M | 0% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.4M | ✅ | 26.6M | +9% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.3M | ✅ | 22.4M | -12% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.8M | ✅ | 16.9M | +7% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.7M | ✅ | 14.3M | +4% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.1M | ✅ | 14.0M | -1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 23.6M | ✅ | 22.8M | -4% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.9M | ✅ | 19.7M | +4% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ✅ | 20.9M | -6% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ✅ | 18.4M | -4% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ✅ | 18.5M | -7% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 9.5M | +18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 8.7M | +0% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.1M | ✅ | 3.1M | 🟢 **-87%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.1M | ✅ | 19.3M | +6% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.6M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.9M | ✅ | 27.1M | 🟢 **-27%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.3M | ✅ | 3.1M | 🟢 **-81%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.2M | ✅ | 23.5M | -20% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 76.5M | ✅ | 55.1M | 🟢 **-28%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 9.4M | -4% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.0M | ✅ | 16.4M | -3% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.5M | 🟢 **-29%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.6M | ✅ | 11.1M | 🟢 **-69%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 40.8M | ✅ | 9.5M | 🟢 **-77%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 40.9M | ✅ | 9.6M | 🟢 **-76%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.4M | ✅ | 24.0M | -5% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.3M | ✅ | 8.9M | 🟢 **-42%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 25.3M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 51.6M | ✅ | 7.3M | 🟢 **-86%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 30.7M | ✅ | 34.4M | +12% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 157.8M | ✅ | 75.6M | 🟢 **-52%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 57.2M | ✅ | 50.9M | -11% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 162.8M | ✅ | 69.1M | 🟢 **-58%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 64.7M | ✅ | 66.7M | +3% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.3M | ✅ | 28.3M | 🟢 **-49%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 36.1M | ✅ | 35.9M | 0% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 100.2M | ✅ | 49.7M | 🟢 **-50%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 147.5M | ✅ | 74.7M | 🟢 **-49%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 57.5M | ✅ | 28.6M | 🟢 **-50%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 28.0M | ✅ | 21.9M | 🟢 **-22%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 40.7M | ✅ | 16.6M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 29.6M | ✅ | 13.4M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 136.3M | ✅ | 74.2M | 🟢 **-46%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 24.0M | ✅ | 8.1M | 🟢 **-66%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 59.9M | ✅ | 46.6M | 🟢 **-22%** |
| allOf.json | allOf | 4 | ✅ | 28.6M | ✅ | 33.3M | +17% |
| allOf.json | allOf with base schema | 5 | ✅ | 28.0M | ✅ | 24.6M | -12% |
| allOf.json | allOf simple types | 2 | ✅ | 49.6M | ✅ | 49.3M | -1% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 147.5M | ✅ | 74.7M | 🟢 **-49%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 37.4M | ✅ | 39.9M | +7% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 77.2M | ✅ | 35.5M | 🟢 **-54%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.7M | ✅ | 73.9M | 🟢 **-53%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 147.3M | ✅ | 74.7M | 🟢 **-49%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 45.3M | ✅ | 47.2M | +4% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 102.6M | ✅ | 48.2M | 🟢 **-53%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 51.2M | ✅ | 42.7M | -17% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 75.9M | ✅ | 5.1M | 🟢 **-93%** |
| anyOf.json | anyOf | 4 | ✅ | 51.4M | ✅ | 27.3M | 🟢 **-47%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.1M | ✅ | 20.1M | 🟢 **-55%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 147.2M | ✅ | 74.5M | 🟢 **-49%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 147.3M | ✅ | 73.9M | 🟢 **-50%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 39.9M | ✅ | 19.4M | 🟢 **-51%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 69.1M | ✅ | 27.1M | 🟢 **-61%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 161.9M | ✅ | 68.7M | 🟢 **-58%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 102.6M | ✅ | 27.6M | 🟢 **-73%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 176.9M | ✅ | 55.3M | 🟢 **-69%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 81.4M | ✅ | 38.4M | 🟢 **-53%** |
| const.json | const validation | 3 | ✅ | 44.7M | ✅ | 38.6M | -14% |
| const.json | const with object | 4 | ✅ | 43.2M | ✅ | 15.2M | 🟢 **-65%** |
| const.json | const with array | 3 | ✅ | 39.9M | ✅ | 15.6M | 🟢 **-61%** |
| const.json | const with null | 2 | ✅ | 110.0M | ✅ | 49.7M | 🟢 **-55%** |
| const.json | const with false does not match 0 | 3 | ✅ | 45.9M | ✅ | 39.2M | -15% |
| const.json | const with true does not match 1 | 3 | ✅ | 101.3M | ✅ | 39.0M | 🟢 **-62%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 41.7M | ✅ | 26.7M | 🟢 **-36%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 88.0M | ✅ | 26.5M | 🟢 **-70%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 40.1M | ✅ | 12.6M | 🟢 **-69%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 88.5M | ✅ | 12.4M | 🟢 **-86%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 43.5M | ✅ | 43.5M | +0% |
| const.json | const with 1 does not match true | 3 | ✅ | 107.0M | ✅ | 49.9M | 🟢 **-53%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 46.7M | ✅ | 41.5M | -11% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 90.5M | ✅ | 42.5M | 🟢 **-53%** |
| const.json | nul characters in strings | 2 | ✅ | 43.6M | ✅ | 47.4M | +9% |
| const.json | characters with the same visual repre... | 2 | ✅ | 70.6M | ✅ | 45.2M | 🟢 **-36%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 48.4M | ✅ | 48.5M | +0% |
| contains.json | contains keyword validation | 6 | ✅ | 86.4M | ✅ | 14.9M | 🟢 **-83%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 46.3M | ✅ | 14.3M | 🟢 **-69%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 97.5M | ✅ | 47.2M | 🟢 **-52%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 45.9M | ✅ | 31.8M | 🟢 **-31%** |
| contains.json | items + contains | 4 | ✅ | 53.3M | ✅ | 6.9M | 🟢 **-87%** |
| contains.json | contains with false if subschema | 2 | ✅ | 44.9M | ✅ | 47.1M | +5% |
| contains.json | contains with null instance elements | 1 | ✅ | 115.2M | ✅ | 66.5M | 🟢 **-42%** |
| default.json | invalid type for default | 2 | ✅ | 57.1M | ✅ | 59.1M | +3% |
| default.json | invalid string value for default | 2 | ✅ | 61.1M | ✅ | 49.3M | -19% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 31.1M | ✅ | 44.0M | 🔴 **+41%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 9.8M | ✅ | 1.3M | 🟢 **-86%** |
| dependencies.json | dependencies | 7 | ✅ | 44.3M | ✅ | 47.2M | +7% |
| dependencies.json | dependencies with empty array | 3 | ✅ | 168.8M | ✅ | 65.9M | 🟢 **-61%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 26.3M | ✅ | 34.5M | 🔴 **+31%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 34.6M | ✅ | 38.0M | +10% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 38.4M | ✅ | 41.4M | +8% |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 16.2M | ✅ | 21.9M | 🔴 **+35%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 32.9M | ✅ | 38.6M | +17% |
| enum.json | simple enum validation | 2 | ✅ | 47.2M | ✅ | 50.4M | +7% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 32.4M | ✅ | 11.4M | 🟢 **-65%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 48.0M | ✅ | 50.1M | +4% |
| enum.json | enums in properties | 6 | ✅ | 33.1M | ✅ | 36.3M | +10% |
| enum.json | enum with escaped characters | 3 | ✅ | 52.9M | ✅ | 50.3M | -5% |
| enum.json | enum with false does not match 0 | 3 | ✅ | 22.4M | ✅ | 38.4M | 🔴 **+71%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 43.9M | ✅ | 21.1M | 🟢 **-52%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 45.6M | ✅ | 37.8M | -17% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 39.9M | ✅ | 20.6M | 🟢 **-48%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 48.8M | ✅ | 42.6M | -13% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 47.9M | ✅ | 22.6M | 🟢 **-53%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 48.6M | ✅ | 43.2M | -11% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 46.5M | ✅ | 22.5M | 🟢 **-52%** |
| enum.json | nul characters in strings | 2 | ✅ | 44.8M | ✅ | 45.7M | +2% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 43.3M | ✅ | 40.6M | -6% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 45.9M | ✅ | 41.1M | -10% |
| format.json | email format | 6 | ✅ | 70.0M | ✅ | 54.3M | 🟢 **-22%** |
| format.json | idn-email format | 6 | ✅ | 66.2M | ✅ | 43.0M | 🟢 **-35%** |
| format.json | regex format | 6 | ✅ | 66.9M | ✅ | 55.4M | -17% |
| format.json | ipv4 format | 6 | ✅ | 68.7M | ✅ | 54.1M | 🟢 **-21%** |
| format.json | ipv6 format | 6 | ✅ | 66.8M | ✅ | 54.7M | -18% |
| format.json | idn-hostname format | 6 | ✅ | 66.1M | ✅ | 54.8M | -17% |
| format.json | hostname format | 6 | ✅ | 70.6M | ✅ | 55.1M | 🟢 **-22%** |
| format.json | date format | 6 | ✅ | 69.0M | ✅ | 54.9M | 🟢 **-20%** |
| format.json | date-time format | 6 | ✅ | 70.6M | ✅ | 54.7M | 🟢 **-23%** |
| format.json | time format | 6 | ✅ | 67.2M | ✅ | 54.8M | -18% |
| format.json | json-pointer format | 6 | ✅ | 67.2M | ✅ | 54.7M | -19% |
| format.json | relative-json-pointer format | 6 | ✅ | 70.4M | ✅ | 55.0M | 🟢 **-22%** |
| format.json | iri format | 6 | ✅ | 65.7M | ✅ | 54.8M | -17% |
| format.json | iri-reference format | 6 | ✅ | 65.8M | ✅ | 54.5M | -17% |
| format.json | uri format | 6 | ✅ | 58.9M | ✅ | 42.6M | 🟢 **-28%** |
| format.json | uri-reference format | 6 | ✅ | 67.5M | ✅ | 54.1M | -20% |
| format.json | uri-template format | 6 | ✅ | 64.3M | ✅ | 54.0M | -16% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 137.9M | ✅ | 69.1M | 🟢 **-50%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 163.1M | ✅ | 68.6M | 🟢 **-58%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 149.2M | ✅ | 67.3M | 🟢 **-55%** |
| if-then-else.json | if and then without else | 3 | ✅ | 53.0M | ✅ | 29.3M | 🟢 **-45%** |
| if-then-else.json | if and else without then | 3 | ✅ | 53.7M | ✅ | 38.3M | 🟢 **-29%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 46.2M | ✅ | 36.6M | 🟢 **-21%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 161.4M | ✅ | 68.7M | 🟢 **-57%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 47.1M | ✅ | 43.2M | -8% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 48.0M | ✅ | 28.2M | 🟢 **-41%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 33.6M | ✅ | 31.1M | -7% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 29.5M | ✅ | 33.9M | +15% |
| items.json | a schema given for items | 4 | ✅ | 42.5M | ✅ | 42.4M | 0% |
| items.json | an array of schemas for items | 6 | ✅ | 56.3M | ✅ | 49.2M | -13% |
| items.json | items with boolean schema (true) | 2 | ✅ | 162.7M | ✅ | 68.5M | 🟢 **-58%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 49.0M | ✅ | 41.6M | -15% |
| items.json | items with boolean schemas | 3 | ✅ | 48.3M | ✅ | 44.0M | -9% |
| items.json | items and subitems | 6 | ✅ | 25.3M | ✅ | 21.9M | -13% |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 11.7M | -2% |
| items.json | single-form items with null instance ... | 1 | ✅ | 63.2M | ✅ | 67.2M | +6% |
| items.json | array-form items with null instance e... | 1 | ✅ | 63.8M | ✅ | 68.2M | +7% |
| maxItems.json | maxItems validation | 4 | ✅ | 54.2M | ✅ | 47.0M | -13% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 50.4M | ✅ | 46.6M | -8% |
| maxLength.json | maxLength validation | 5 | ✅ | 42.0M | ✅ | 47.5M | +13% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 43.3M | ✅ | 43.6M | +1% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 44.3M | ✅ | 41.5M | -6% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 33.6M | ✅ | 31.4M | -7% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 36.2M | ✅ | 32.0M | -12% |
| maximum.json | maximum validation | 4 | ✅ | 52.5M | ✅ | 45.1M | -14% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 53.7M | ✅ | 46.7M | -13% |
| minItems.json | minItems validation | 4 | ✅ | 54.4M | ✅ | 47.5M | -13% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 50.4M | ✅ | 44.1M | -13% |
| minLength.json | minLength validation | 5 | ✅ | 39.9M | ✅ | 42.5M | +6% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 40.4M | ✅ | 43.4M | +7% |
| minProperties.json | minProperties validation | 6 | ✅ | 44.9M | ✅ | 41.3M | -8% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 34.2M | ✅ | 32.2M | -6% |
| minimum.json | minimum validation | 4 | ✅ | 53.5M | ✅ | 45.1M | -16% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 54.8M | ✅ | 47.9M | -13% |
| multipleOf.json | by int | 3 | ✅ | 49.9M | ✅ | 43.1M | -14% |
| multipleOf.json | by number | 3 | ✅ | 49.2M | ✅ | 42.6M | -13% |
| multipleOf.json | by small number | 2 | ✅ | 46.9M | ✅ | 37.2M | 🟢 **-21%** |
| multipleOf.json | float division = inf | 1 | ✅ | 35.2M | ✅ | 8.8M | 🟢 **-75%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 52.5M | ✅ | 8.0M | 🟢 **-85%** |
| not.json | not | 2 | ✅ | 42.7M | ✅ | 24.0M | 🟢 **-44%** |
| not.json | not multiple types | 3 | ✅ | 45.0M | ✅ | 37.8M | -16% |
| not.json | not more complex schema | 3 | ✅ | 44.9M | ✅ | 38.6M | -14% |
| not.json | forbidden property | 2 | ✅ | 35.6M | ✅ | 43.3M | 🔴 **+22%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 38.8M | ✅ | 39.4M | +2% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 36.1M | ✅ | 31.9M | -12% |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 162.0M | ✅ | 54.9M | 🟢 **-66%** |
| not.json | double negation | 1 | ✅ | 146.9M | ✅ | 71.3M | 🟢 **-51%** |
| oneOf.json | oneOf | 4 | ✅ | 43.6M | ✅ | 21.9M | 🟢 **-50%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 28.6M | ✅ | 26.4M | -7% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 39.7M | ✅ | 36.4M | -8% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 146.5M | ✅ | 24.5M | 🟢 **-83%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 40.0M | ✅ | 36.3M | -9% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 39.9M | ✅ | 18.2M | 🟢 **-54%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 34.0M | ✅ | 21.2M | 🟢 **-38%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 45.7M | ✅ | 39.5M | -14% |
| oneOf.json | oneOf with required | 4 | ✅ | 34.4M | ✅ | 16.5M | 🟢 **-52%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 34.0M | ✅ | 20.7M | 🟢 **-39%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 43.9M | ✅ | 28.1M | 🟢 **-36%** |
| pattern.json | pattern validation | 8 | ✅ | 43.8M | ✅ | 41.4M | -5% |
| pattern.json | pattern is not anchored | 1 | ✅ | 40.3M | ✅ | 30.8M | 🟢 **-24%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 22.4M | ✅ | 13.2M | 🟢 **-41%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.5M | ✅ | 7.4M | 🟢 **-45%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ✅ | 8.3M | 🟢 **-45%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.1M | ✅ | 8.7M | 🟢 **-52%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 15.0M | ✅ | 9.5M | 🟢 **-36%** |
| properties.json | object properties validation | 6 | ✅ | 39.6M | ✅ | 44.2M | +12% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.1M | ✅ | 9.4M | 🟢 **-48%** |
| properties.json | properties with boolean schema | 4 | ✅ | 36.4M | ✅ | 39.8M | +9% |
| properties.json | properties with escaped characters | 2 | ✅ | 35.9M | ✅ | 42.8M | +19% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 54.0M | ✅ | 60.4M | +12% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 22.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 35.4M | ✅ | 29.6M | -16% |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 17.8M | ✅ | 13.6M | 🟢 **-24%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 162.9M | ✅ | 69.0M | 🟢 **-58%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 34.9M | ✅ | 28.4M | -19% |
| propertyNames.json | propertyNames with const | 3 | ✅ | 34.0M | ✅ | 30.3M | -11% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 35.8M | ✅ | 26.1M | 🟢 **-27%** |
| ref.json | root pointer ref | 4 | ✅ | 17.6M | ✅ | 20.6M | +18% |
| ref.json | relative pointer ref to object | 2 | ✅ | 39.2M | ✅ | 42.8M | +9% |
| ref.json | relative pointer ref to array | 2 | ✅ | 35.3M | ✅ | 44.8M | 🔴 **+27%** |
| ref.json | escaped pointer ref | 6 | ✅ | 33.5M | ✅ | 39.2M | +17% |
| ref.json | nested refs | 2 | ✅ | 38.0M | ✅ | 48.6M | 🔴 **+28%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 39.7M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 22.8M | ✅ | 4.3M | 🟢 **-81%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 37.1M | ✅ | 43.1M | +16% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 36.5M | ✅ | 43.1M | +18% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 147.8M | ✅ | 74.1M | 🟢 **-50%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 40.1M | ✅ | 39.4M | -2% |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.8M | ✅ | 7.7M | -2% |
| ref.json | refs with quote | 2 | ✅ | 37.4M | ✅ | 44.4M | +19% |
| ref.json | Location-independent identifier | 2 | ✅ | 46.5M | ✅ | 49.3M | +6% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 45.1M | ✅ | 49.4M | +10% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 47.2M | ✅ | 40.8M | -13% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 36.1M | ✅ | 14.5M | 🟢 **-60%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.8M | ✅ | 33.5M | +5% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 30.6M | ✅ | 33.4M | +9% |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 43.9M | ✅ | 40.9M | -7% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 24.3M | ✅ | 24.0M | -1% |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 36.6M | ✅ | 41.6M | +14% |
| ref.json | URN base URI with NSS | 2 | ✅ | 39.0M | ✅ | 42.6M | +9% |
| ref.json | URN base URI with r-component | 2 | ✅ | 36.2M | ✅ | 44.0M | 🔴 **+22%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 39.3M | ✅ | 43.5M | +11% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 37.7M | ✅ | 38.1M | +1% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 37.3M | ✅ | 39.1M | +5% |
| ref.json | ref to if | 2 | ✅ | 48.6M | ✅ | 48.6M | +0% |
| ref.json | ref to then | 2 | ✅ | 41.7M | ✅ | 48.0M | +15% |
| ref.json | ref to else | 2 | ✅ | 46.5M | ✅ | 48.2M | +4% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.2M | ✅ | 47.1M | +2% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 47.8M | ✅ | 47.6M | -1% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 49.7M | ✅ | 48.5M | -2% |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 47.7M | ✅ | 48.2M | +1% |
| refRemote.json | remote ref | 2 | ✅ | 42.6M | ✅ | 49.0M | +15% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 43.9M | ✅ | 47.7M | +9% |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.6M | ✅ | 47.6M | +7% |
| refRemote.json | base URI change | 2 | ✅ | 27.1M | ✅ | 28.2M | +4% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 28.9M | ✅ | 27.6M | -5% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 30.5M | ✅ | 27.6M | -10% |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.4M | ✅ | 11.4M | 🟢 **-64%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 37.3M | ✅ | 34.5M | -8% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 35.3M | ✅ | 42.1M | +19% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 32.9M | ✅ | 31.2M | -5% |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 36.7M | ✅ | 42.5M | +16% |
| required.json | required validation | 5 | ✅ | 46.8M | ✅ | 47.3M | +1% |
| required.json | required default validation | 1 | ✅ | 144.7M | ✅ | 74.9M | 🟢 **-48%** |
| required.json | required with empty array | 1 | ✅ | 147.0M | ✅ | 74.6M | 🟢 **-49%** |
| required.json | required with escaped characters | 2 | ✅ | 38.3M | ✅ | 29.1M | 🟢 **-24%** |
| required.json | required properties whose names are J... | 7 | ✅ | 21.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 40.6M | ✅ | 37.7M | -7% |
| type.json | number type matches numbers | 9 | ✅ | 41.8M | ✅ | 42.9M | +3% |
| type.json | string type matches strings | 9 | ✅ | 44.5M | ✅ | 39.2M | -12% |
| type.json | object type matches objects | 7 | ✅ | 34.8M | ✅ | 39.6M | +14% |
| type.json | array type matches arrays | 7 | ✅ | 40.8M | ✅ | 32.9M | -19% |
| type.json | boolean type matches booleans | 10 | ✅ | 49.4M | ✅ | 42.3M | -14% |
| type.json | null type matches only the null object | 10 | ✅ | 37.8M | ✅ | 41.1M | +9% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 41.8M | ✅ | 38.2M | -9% |
| type.json | type as array with one item | 2 | ✅ | 49.2M | ✅ | 47.1M | -4% |
| type.json | type: array or object | 5 | ✅ | 46.2M | ✅ | 39.7M | -14% |
| type.json | type: array, object or null | 5 | ✅ | 52.6M | ✅ | 43.8M | -17% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 15.8M | ✅ | 10.1M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.3M | ✅ | 20.9M | 🟢 **-26%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 16.9M | ✅ | 27.1M | 🔴 **+60%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 160.2M | ✅ | 53.9M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 60.4M | ✅ | 53.7M | -11% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 57.3M | ✅ | 49.4M | -14% |
| optional/bignum.json | integer | 2 | ✅ | 60.8M | ✅ | 14.1M | 🟢 **-77%** |
| optional/bignum.json | number | 2 | ✅ | 62.3M | ✅ | 68.4M | +10% |
| optional/bignum.json | string | 1 | ✅ | 38.6M | ✅ | 39.7M | +3% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 59.7M | ✅ | 68.3M | +14% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 35.8M | ✅ | 38.2M | +7% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 60.5M | ✅ | 68.0M | +12% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 38.3M | ✅ | 38.5M | +1% |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 339K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 17.3M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 417K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 39.5M | ✅ | 27.6M | 🟢 **-30%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 17.8M | ✅ | 26.7M | 🔴 **+50%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 23.0M | ✅ | 27.7M | 🔴 **+20%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 22.8M | ✅ | 27.8M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 22.0M | ✅ | 27.3M | 🔴 **+24%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 21.6M | ✅ | 29.0M | 🔴 **+34%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.4M | ✅ | 27.5M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 22.7M | ✅ | 27.6M | 🔴 **+22%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 23.6M | ✅ | 29.6M | 🔴 **+26%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 22.9M | ✅ | 24.7M | +8% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 12.4M | ✅ | 18.1M | 🔴 **+46%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 12.7M | ✅ | 14.1M | +11% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.2M | ✅ | 14.4M | +9% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 23.1M | ✅ | 26.6M | +15% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.3M | ✅ | 23.6M | 🔴 **+36%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 20.0M | ✅ | 21.7M | +8% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.5M | ✅ | 20.2M | +15% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.9M | ✅ | 21.4M | +19% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 9.2M | +18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ✅ | 8.8M | +3% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 21.8M | ✅ | 2.9M | 🟢 **-87%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 22.8M | ✅ | 7.8M | 🟢 **-66%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 16.8M | ✅ | 21.4M | 🔴 **+28%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 17.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 4.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 28.8M | ✅ | 30.1M | +4% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 15.4M | ✅ | 2.8M | 🟢 **-82%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 27.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 13.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 26.7M | ✅ | 25.5M | -5% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 53.5M | ✅ | 904K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 31.6M | ✅ | 30.0M | -5% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.1M | ✅ | 5.6M | -8% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 67.9M | ✅ | 54.2M | 🟢 **-20%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.2M | ✅ | 9.1M | -1% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 14.7M | ✅ | 15.3M | +4% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.8M | ✅ | 4.3M | 🟢 **-27%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.5M | ✅ | 14.7M | 🟢 **-57%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 40.2M | ✅ | 34.5M | -14% |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 40.3M | ✅ | 37.8M | -6% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 22.8M | ✅ | 26.9M | +18% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ✅ | 8.3M | 🟢 **-48%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 20.5M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 26.0M | ✅ | 7.1M | 🟢 **-73%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.3M | ✅ | 34.1M | -3% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.0M | ✅ | 44.2M | 🟢 **-72%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 63.8M | ✅ | 49.5M | 🟢 **-22%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.7M | ✅ | 68.9M | 🟢 **-60%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 75.2M | ✅ | 66.2M | -12% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 26.3M | 🟢 **-54%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 35.5M | ✅ | 34.3M | -3% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 45.8M | 🟢 **-57%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.0M | ✅ | 73.4M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 68.5M | ✅ | 23.6M | 🟢 **-66%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.9M | ✅ | 23.2M | 🟢 **-27%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 48.7M | ✅ | 16.9M | 🟢 **-65%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.2M | ✅ | 13.2M | 🟢 **-58%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ✅ | 74.4M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 26.6M | ✅ | 5.5M | 🟢 **-79%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 46.9M | 🟢 **-30%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 27.7M | ✅ | 11.1M | 🟢 **-60%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 33.4M | ✅ | 31.1M | -7% |
| allOf.json | allOf | 4 | ✅ | 32.1M | ✅ | 34.8M | +8% |
| allOf.json | allOf with base schema | 5 | ✅ | 28.9M | ✅ | 24.6M | -15% |
| allOf.json | allOf simple types | 2 | ✅ | 54.4M | ✅ | 46.9M | -14% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.8M | ✅ | 74.5M | 🟢 **-53%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 43.9M | ✅ | 40.1M | -9% |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 32.2M | 🟢 **-65%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.6M | ✅ | 43.1M | 🟢 **-73%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.8M | ✅ | 47.7M | 🟢 **-70%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.7M | ✅ | 48.0M | -14% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.8M | ✅ | 47.3M | 🟢 **-59%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 48.3M | -16% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.4M | ✅ | 4.5M | 🟢 **-95%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 56.2M | ✅ | 46.6M | -17% |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ✅ | 30.6M | 🟢 **-73%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 53.2M | ✅ | 46.9M | -12% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 55.7M | ✅ | 48.3M | -13% |
| anyOf.json | anyOf | 4 | ✅ | 60.1M | ✅ | 24.6M | 🟢 **-59%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 32.1M | ✅ | 20.1M | 🟢 **-37%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 73.2M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.6M | ✅ | 73.2M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 44.3M | ✅ | 19.6M | 🟢 **-56%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 44.1M | ✅ | 24.0M | 🟢 **-46%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.9M | ✅ | 51.7M | 🟢 **-70%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 20.8M | 🟢 **-64%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 181.9M | ✅ | 54.0M | 🟢 **-70%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 41.2M | ✅ | 39.4M | -4% |
| const.json | const validation | 3 | ✅ | 49.2M | ✅ | 38.8M | 🟢 **-21%** |
| const.json | const with object | 4 | ✅ | 33.9M | ✅ | 15.1M | 🟢 **-56%** |
| const.json | const with array | 3 | ✅ | 41.8M | ✅ | 16.6M | 🟢 **-60%** |
| const.json | const with null | 2 | ✅ | 57.2M | ✅ | 48.1M | -16% |
| const.json | const with false does not match 0 | 3 | ✅ | 51.9M | ✅ | 39.8M | 🟢 **-23%** |
| const.json | const with true does not match 1 | 3 | ✅ | 51.2M | ✅ | 38.3M | 🟢 **-25%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 48.0M | ✅ | 25.5M | 🟢 **-47%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 48.2M | ✅ | 25.8M | 🟢 **-47%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 44.6M | ✅ | 12.7M | 🟢 **-72%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 44.5M | ✅ | 12.6M | 🟢 **-72%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 47.4M | ✅ | 43.6M | -8% |
| const.json | const with 1 does not match true | 3 | ✅ | 60.4M | ✅ | 40.5M | 🟢 **-33%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 49.5M | ✅ | 39.8M | -20% |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 55.9M | ✅ | 41.9M | 🟢 **-25%** |
| const.json | nul characters in strings | 2 | ✅ | 48.4M | ✅ | 45.3M | -6% |
| const.json | characters with the same visual repre... | 2 | ✅ | 46.2M | ✅ | 43.1M | -7% |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ✅ | 44.9M | -11% |
| contains.json | contains keyword validation | 6 | ✅ | 54.1M | ✅ | 8.3M | 🟢 **-85%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 53.0M | ✅ | 10.0M | 🟢 **-81%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 54.9M | ✅ | 46.7M | -15% |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 51.2M | ✅ | 29.0M | 🟢 **-43%** |
| contains.json | items + contains | 4 | ✅ | 36.6M | ✅ | 6.9M | 🟢 **-81%** |
| contains.json | contains with false if subschema | 2 | ✅ | 53.7M | ✅ | 46.5M | -13% |
| contains.json | contains with null instance elements | 1 | ✅ | 73.5M | ✅ | 65.2M | -11% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 175.7M | ✅ | 63.8M | 🟢 **-64%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.8M | ✅ | 64.5M | 🟢 **-63%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.6M | ✅ | 61.6M | 🟢 **-66%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 183.7M | ✅ | 55.7M | 🟢 **-70%** |
| default.json | invalid type for default | 2 | ✅ | 62.2M | ✅ | 59.8M | -4% |
| default.json | invalid string value for default | 2 | ✅ | 46.7M | ✅ | 49.4M | +6% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.4M | ✅ | 44.3M | -2% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.8M | ✅ | 768K | 🟢 **-58%** |
| dependentRequired.json | single dependency | 7 | ✅ | 54.4M | ✅ | 49.4M | -9% |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.4M | ✅ | 63.1M | 🟢 **-64%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.8M | ✅ | 34.5M | 🔴 **+39%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 38.5M | ✅ | 38.5M | +0% |
| dependentSchemas.json | single dependency | 8 | ✅ | 44.7M | ✅ | 42.8M | -4% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 42.4M | ✅ | 38.2M | -10% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 37.0M | ✅ | 31.1M | -16% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 35.7M | ✅ | 37.7M | +6% |
| enum.json | simple enum validation | 2 | ✅ | 56.6M | ✅ | 42.8M | 🟢 **-24%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 38.9M | ✅ | 11.3M | 🟢 **-71%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 58.3M | ✅ | 48.9M | -16% |
| enum.json | enums in properties | 6 | ✅ | 35.1M | ✅ | 35.7M | +2% |
| enum.json | enum with escaped characters | 3 | ✅ | 63.2M | ✅ | 45.3M | 🟢 **-28%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 51.8M | ✅ | 39.1M | 🟢 **-24%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 48.2M | ✅ | 21.1M | 🟢 **-56%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 51.5M | ✅ | 39.4M | 🟢 **-23%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 48.1M | ✅ | 20.5M | 🟢 **-57%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 58.7M | ✅ | 44.7M | 🟢 **-24%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.7M | ✅ | 22.5M | 🟢 **-58%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 60.3M | ✅ | 43.5M | 🟢 **-28%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.4M | ✅ | 22.5M | 🟢 **-58%** |
| enum.json | nul characters in strings | 2 | ✅ | 50.1M | ✅ | 45.4M | -9% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 49.5M | ✅ | 42.4M | -14% |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 49.3M | ✅ | 41.2M | -17% |
| format.json | email format | 6 | ✅ | 181.6M | ✅ | 55.5M | 🟢 **-69%** |
| format.json | idn-email format | 6 | ✅ | 182.8M | ✅ | 55.7M | 🟢 **-70%** |
| format.json | regex format | 6 | ✅ | 182.4M | ✅ | 55.7M | 🟢 **-69%** |
| format.json | ipv4 format | 6 | ✅ | 182.5M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | ipv6 format | 6 | ✅ | 182.8M | ✅ | 55.7M | 🟢 **-70%** |
| format.json | idn-hostname format | 6 | ✅ | 182.7M | ✅ | 52.6M | 🟢 **-71%** |
| format.json | hostname format | 6 | ✅ | 183.0M | ✅ | 55.6M | 🟢 **-70%** |
| format.json | date format | 6 | ✅ | 183.1M | ✅ | 55.4M | 🟢 **-70%** |
| format.json | date-time format | 6 | ✅ | 179.8M | ✅ | 55.6M | 🟢 **-69%** |
| format.json | time format | 6 | ✅ | 182.6M | ✅ | 54.7M | 🟢 **-70%** |
| format.json | json-pointer format | 6 | ✅ | 182.5M | ✅ | 55.6M | 🟢 **-70%** |
| format.json | relative-json-pointer format | 6 | ✅ | 182.4M | ✅ | 55.7M | 🟢 **-69%** |
| format.json | iri format | 6 | ✅ | 182.9M | ✅ | 55.8M | 🟢 **-69%** |
| format.json | iri-reference format | 6 | ✅ | 182.8M | ✅ | 55.6M | 🟢 **-70%** |
| format.json | uri format | 6 | ✅ | 183.0M | ✅ | 55.7M | 🟢 **-70%** |
| format.json | uri-reference format | 6 | ✅ | 180.6M | ✅ | 55.2M | 🟢 **-69%** |
| format.json | uri-template format | 6 | ✅ | 182.3M | ✅ | 54.5M | 🟢 **-70%** |
| format.json | uuid format | 6 | ✅ | 182.0M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | duration format | 6 | ✅ | 182.9M | ✅ | 54.6M | 🟢 **-70%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.7M | ✅ | 67.7M | 🟢 **-61%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.6M | ✅ | 69.0M | 🟢 **-60%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.8M | ✅ | 68.5M | 🟢 **-60%** |
| if-then-else.json | if and then without else | 3 | ✅ | 62.2M | ✅ | 43.3M | 🟢 **-30%** |
| if-then-else.json | if and else without then | 3 | ✅ | 61.5M | ✅ | 37.5M | 🟢 **-39%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 50.8M | ✅ | 37.2M | 🟢 **-27%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 69.1M | 🟢 **-60%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 57.5M | ✅ | 50.4M | -12% |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 57.2M | ✅ | 45.4M | 🟢 **-21%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.2M | ✅ | 32.5M | -17% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 32.0M | ✅ | 34.7M | +8% |
| items.json | a schema given for items | 4 | ✅ | 51.4M | ✅ | 42.3M | -18% |
| items.json | an array of schemas for items | 6 | ✅ | 59.3M | ✅ | 31.5M | 🟢 **-47%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.3M | ✅ | 67.9M | 🟢 **-60%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 55.2M | ✅ | 39.9M | 🟢 **-28%** |
| items.json | items with boolean schemas | 3 | ✅ | 28.3M | ✅ | 43.2M | 🔴 **+53%** |
| items.json | items and subitems | 6 | ✅ | 26.8M | ✅ | 20.9M | 🟢 **-22%** |
| items.json | nested items | 3 | ✅ | 13.0M | ✅ | 11.2M | -14% |
| items.json | single-form items with null instance ... | 1 | ✅ | 70.3M | ✅ | 48.5M | 🟢 **-31%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 66.0M | ✅ | 68.5M | +4% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.8M | ✅ | 68.8M | 🟢 **-60%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 45.4M | ✅ | 27.5M | 🟢 **-39%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 51.9M | ✅ | 44.5M | -14% |
| maxContains.json | minContains < maxContains | 3 | ✅ | 42.4M | ✅ | 36.4M | -14% |
| maxItems.json | maxItems validation | 4 | ✅ | 60.1M | ✅ | 47.9M | 🟢 **-20%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 56.1M | ✅ | 40.4M | 🟢 **-28%** |
| maxLength.json | maxLength validation | 5 | ✅ | 48.1M | ✅ | 47.3M | -2% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 47.0M | ✅ | 43.1M | -8% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 48.7M | ✅ | 42.9M | -12% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 35.3M | ✅ | 34.9M | -1% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 39.0M | ✅ | 33.0M | -16% |
| maximum.json | maximum validation | 4 | ✅ | 56.4M | ✅ | 47.1M | -17% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 56.5M | ✅ | 47.8M | -15% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 68.8M | 🟢 **-60%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 53.7M | ✅ | 35.3M | 🟢 **-34%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 54.5M | ✅ | 29.3M | 🟢 **-46%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 52.3M | ✅ | 45.1M | -14% |
| minContains.json | maxContains = minContains | 4 | ✅ | 42.5M | ✅ | 38.0M | -10% |
| minContains.json | maxContains < minContains | 4 | ✅ | 37.7M | ✅ | 33.7M | -10% |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 88.2M | ✅ | 68.3M | 🟢 **-23%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 51.9M | ✅ | 44.7M | -14% |
| minItems.json | minItems validation | 4 | ✅ | 59.8M | ✅ | 47.7M | 🟢 **-20%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 56.0M | ✅ | 47.7M | -15% |
| minLength.json | minLength validation | 5 | ✅ | 47.9M | ✅ | 43.5M | -9% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 41.4M | ✅ | 43.3M | +5% |
| minProperties.json | minProperties validation | 6 | ✅ | 50.0M | ✅ | 42.3M | -15% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 36.0M | ✅ | 32.4M | -10% |
| minimum.json | minimum validation | 4 | ✅ | 61.4M | ✅ | 45.9M | 🟢 **-25%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.5M | ✅ | 47.9M | -17% |
| multipleOf.json | by int | 3 | ✅ | 54.1M | ✅ | 43.6M | -19% |
| multipleOf.json | by number | 3 | ✅ | 44.7M | ✅ | 42.2M | -6% |
| multipleOf.json | by small number | 2 | ✅ | 51.6M | ✅ | 36.7M | 🟢 **-29%** |
| multipleOf.json | float division = inf | 1 | ✅ | 38.9M | ✅ | 8.9M | 🟢 **-77%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.5M | ✅ | 8.9M | 🟢 **-86%** |
| not.json | not | 2 | ✅ | 56.2M | ✅ | 41.6M | 🟢 **-26%** |
| not.json | not multiple types | 3 | ✅ | 48.3M | ✅ | 35.7M | 🟢 **-26%** |
| not.json | not more complex schema | 3 | ✅ | 52.2M | ✅ | 39.2M | 🟢 **-25%** |
| not.json | forbidden property | 2 | ✅ | 20.9M | ✅ | 41.2M | 🔴 **+98%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 41.1M | ✅ | 39.5M | -4% |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 41.2M | ✅ | 32.3M | 🟢 **-22%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 177.4M | ✅ | 47.7M | 🟢 **-73%** |
| not.json | double negation | 1 | ✅ | 159.1M | ✅ | 73.6M | 🟢 **-54%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 28.0M | ✅ | 23.9M | -15% |
| oneOf.json | oneOf | 4 | ✅ | 46.2M | ✅ | 21.6M | 🟢 **-53%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.0M | ✅ | 23.4M | 🟢 **-25%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 44.3M | ✅ | 36.6M | -17% |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.6M | ✅ | 24.2M | 🟢 **-85%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 44.2M | ✅ | 36.7M | -17% |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 44.1M | ✅ | 18.0M | 🟢 **-59%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.6M | ✅ | 22.4M | 🟢 **-45%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.3M | ✅ | 35.9M | 🟢 **-35%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.6M | ✅ | 16.0M | 🟢 **-61%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 40.1M | ✅ | 18.6M | 🟢 **-54%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.5M | ✅ | 28.1M | 🟢 **-49%** |
| pattern.json | pattern validation | 8 | ✅ | 49.1M | ✅ | 41.0M | -17% |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.1M | ✅ | 30.8M | 🟢 **-33%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.6M | ✅ | 11.3M | 🟢 **-54%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.9M | ✅ | 5.9M | 🟢 **-60%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.6M | ✅ | 8.1M | 🟢 **-51%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.1M | ✅ | 5.8M | 🟢 **-71%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 14.2M | ✅ | 17.8M | 🔴 **+25%** |
| properties.json | object properties validation | 6 | ✅ | 45.7M | ✅ | 43.6M | -5% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ✅ | 10.0M | 🟢 **-48%** |
| properties.json | properties with boolean schema | 4 | ✅ | 39.1M | ✅ | 38.7M | -1% |
| properties.json | properties with escaped characters | 2 | ✅ | 40.0M | ✅ | 22.2M | 🟢 **-44%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 60.1M | +0% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.0M | ✅ | 27.7M | 🟢 **-34%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ✅ | 13.5M | 🟢 **-29%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.7M | ✅ | 68.6M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 38.9M | ✅ | 21.2M | 🟢 **-45%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.4M | ✅ | 32.2M | -14% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.7M | ✅ | 33.6M | -15% |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.5M | ✅ | 18.8M | 🔴 **+39%** |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.0M | ✅ | 1.8M | 🟢 **-70%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.0M | ✅ | 2.5M | -17% |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 13.4M | ✅ | 1.9M | 🟢 **-86%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.8M | ✅ | 1.8M | 🟢 **-86%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.5M | ✅ | 1.3M | 🟢 **-82%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ✅ | 3.8M | -7% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ✅ | 3.7M | -8% |
| ref.json | root pointer ref | 4 | ✅ | 21.5M | ✅ | 19.4M | -10% |
| ref.json | relative pointer ref to object | 2 | ✅ | 42.4M | ✅ | 43.6M | +3% |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.7M | ✅ | 45.3M | -3% |
| ref.json | escaped pointer ref | 6 | ✅ | 37.5M | ✅ | 40.6M | +8% |
| ref.json | nested refs | 2 | ✅ | 42.9M | ✅ | 48.5M | +13% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 34.5M | ✅ | 37.3M | +8% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ✅ | 2.3M | 🟢 **-27%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.5M | ✅ | 43.9M | +6% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.7M | ✅ | 43.6M | +2% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 157.2M | ✅ | 74.8M | 🟢 **-52%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 44.2M | ✅ | 40.9M | -7% |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ✅ | 7.2M | -19% |
| ref.json | refs with quote | 2 | ✅ | 42.2M | ✅ | 44.5M | +6% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.5M | ✅ | 33.6M | 🔴 **+32%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 40.6M | ✅ | 14.2M | 🟢 **-65%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.9M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 53.2M | ✅ | 49.6M | -7% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 50.8M | ✅ | 47.3M | -7% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 54.8M | ✅ | 48.3M | -12% |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 42.7M | ✅ | 31.8M | 🟢 **-25%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 27.8M | ✅ | 22.9M | -18% |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 42.7M | ✅ | 43.9M | +3% |
| ref.json | URN base URI with NSS | 2 | ✅ | 42.4M | ✅ | 43.6M | +3% |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.7M | ✅ | 44.0M | +3% |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.7M | ✅ | 43.9M | +3% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.4M | ✅ | 43.8M | +3% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.7M | ✅ | 43.9M | +3% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 52.7M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 52.0M | ✅ | 48.0M | -8% |
| ref.json | ref to then | 2 | ✅ | 52.6M | ✅ | 48.4M | -8% |
| ref.json | ref to else | 2 | ✅ | 51.1M | ✅ | 48.8M | -4% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.9M | ✅ | 49.9M | -4% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.7M | ✅ | 46.2M | -17% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 48.7M | ✅ | 49.7M | +2% |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.7M | ✅ | 49.2M | -12% |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.6M | ✅ | 16.7M | 🔴 **+267%** |
| refRemote.json | remote ref | 2 | ✅ | 51.2M | ✅ | 49.2M | -4% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.1M | ✅ | 48.4M | -5% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 50.9M | ✅ | 48.3M | -5% |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.3M | ✅ | 48.0M | -10% |
| refRemote.json | base URI change | 2 | ✅ | 30.0M | ✅ | 28.1M | -6% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.2M | ✅ | 27.3M | -10% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.5M | ✅ | 27.6M | 🟢 **-24%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 34.8M | ✅ | 10.6M | 🟢 **-69%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 43.2M | ✅ | 37.4M | -13% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.3M | ✅ | 41.5M | 🟢 **-22%** |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 37.3M | ✅ | 29.6M | 🟢 **-21%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 51.2M | ✅ | 41.7M | -19% |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 52.6M | ✅ | 41.7M | 🟢 **-21%** |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 43.5M | ✅ | 41.2M | -5% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 52.5M | ✅ | 41.8M | 🟢 **-20%** |
| required.json | required validation | 5 | ✅ | 52.9M | ✅ | 48.7M | -8% |
| required.json | required default validation | 1 | ✅ | 159.4M | ✅ | 74.1M | 🟢 **-54%** |
| required.json | required with empty array | 1 | ✅ | 159.5M | ✅ | 74.6M | 🟢 **-53%** |
| required.json | required with escaped characters | 2 | ✅ | 40.4M | ✅ | 37.1M | -8% |
| required.json | required properties whose names are J... | 7 | ✅ | 23.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 44.3M | ✅ | 40.2M | -9% |
| type.json | number type matches numbers | 9 | ✅ | 46.0M | ✅ | 39.8M | -13% |
| type.json | string type matches strings | 9 | ✅ | 48.5M | ✅ | 45.8M | -6% |
| type.json | object type matches objects | 7 | ✅ | 41.2M | ✅ | 39.4M | -4% |
| type.json | array type matches arrays | 7 | ✅ | 44.9M | ✅ | 40.3M | -10% |
| type.json | boolean type matches booleans | 10 | ✅ | 44.4M | ✅ | 43.4M | -2% |
| type.json | null type matches only the null object | 10 | ✅ | 43.0M | ✅ | 36.1M | -16% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 46.1M | ✅ | 37.2M | -19% |
| type.json | type as array with one item | 2 | ✅ | 55.7M | ✅ | 42.6M | 🟢 **-24%** |
| type.json | type: array or object | 5 | ✅ | 49.6M | ✅ | 42.4M | -15% |
| type.json | type: array, object or null | 5 | ✅ | 55.8M | ✅ | 44.8M | -20% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 75.4M | ✅ | 60.2M | 🟢 **-20%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 48.1M | ✅ | 44.6M | -7% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 50.5M | ✅ | 42.5M | -16% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 66.1M | ✅ | 61.6M | -7% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 45.4M | ✅ | 45.9M | +1% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 73.3M | ✅ | 66.8M | -9% |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 39.5M | ✅ | 38.2M | -3% |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 40.9M | ✅ | 34.8M | -15% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 43.7M | ✅ | 43.1M | -2% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 76.0M | ✅ | 64.4M | -15% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.4M | ✅ | 64.0M | 🔴 **+213%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.1M | ✅ | 30.8M | 🔴 **+154%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.3M | ✅ | 19.8M | 🔴 **+29%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 32.2M | ✅ | 35.0M | +9% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.8M | ✅ | 27.3M | 🔴 **+152%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 48.0M | ✅ | 48.6M | +1% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 43.6M | ✅ | 43.4M | 0% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 43.1M | ✅ | 43.3M | +0% |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ✅ | 9.6M | 🔴 **+346%** |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 35.5M | ✅ | 39.5M | +11% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.3M | ✅ | 30.3M | +19% |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 82.4M | ✅ | 55.4M | 🟢 **-33%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 70.3M | ✅ | 66.2M | -6% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 32.8M | ✅ | 37.2M | +14% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 51.2M | ✅ | 62.1M | 🔴 **+21%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.7M | ✅ | 16.0M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.1M | ✅ | 38.8M | +11% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.9M | ✅ | 36.5M | +14% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.7M | ✅ | 12.7M | -14% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 60.4M | ✅ | 59.7M | -1% |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.7M | ✅ | 31.0M | +8% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.6M | ✅ | 9.0M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 60.3M | ✅ | 57.3M | -5% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 29.6M | ✅ | 59.6M | 🔴 **+102%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.4M | ✅ | 10.1M | 🟢 **-38%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.0M | ✅ | 13.9M | 🟢 **-23%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.1M | ✅ | 29.3M | +17% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.5M | ✅ | 18.7M | +1% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.6M | ✅ | 19.1M | +8% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 27.2M | ✅ | 25.6M | -6% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 33.5M | ✅ | 32.0M | -5% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.5M | ✅ | 30.9M | +1% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 30.4M | ✅ | 31.5M | +3% |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ✅ | 10.5M | 🔴 **+236%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.4M | ✅ | 33.7M | 🔴 **+23%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.4M | ✅ | 34.1M | 🔴 **+25%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.8M | ✅ | 59.7M | 🔴 **+100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.9M | ✅ | 57.2M | 🔴 **+98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 24.6M | ✅ | 30.5M | 🔴 **+24%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.8M | ✅ | 35.9M | 🔴 **+34%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.9M | ✅ | 29.1M | 🔴 **+46%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.1M | ✅ | 36.2M | 🔴 **+200%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.7M | ✅ | 23.6M | -11% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 30.2M | ✅ | 31.6M | +5% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 34.2M | ✅ | 18.4M | 🟢 **-46%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.3M | ✅ | 12.3M | 🟢 **-29%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.3M | ✅ | 14.1M | 🟢 **-23%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ✅ | 5.2M | 🟢 **-26%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 67.6M | ✅ | 54.5M | -19% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 46.8M | ✅ | 46.8M | +0% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.3M | ✅ | 12.6M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.4M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.2M | ✅ | 27.2M | 🔴 **+28%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.4M | ✅ | 25.7M | +10% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ✅ | 7.1M | 🟢 **-58%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 28.6M | ✅ | 20.3M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.5M | ✅ | 27.2M | 🔴 **+55%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 159.9M | ✅ | 54.5M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.9M | ✅ | 54.3M | 🟢 **-22%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.8M | ✅ | 49.2M | -16% |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 46.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 55.8M | ✅ | 47.6M | -15% |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 47.6M | ✅ | 11.1M | 🟢 **-77%** |
| optional/bignum.json | integer | 2 | ✅ | 72.5M | ✅ | 14.3M | 🟢 **-80%** |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ✅ | 69.0M | -9% |
| optional/bignum.json | string | 1 | ✅ | 42.6M | ✅ | 40.0M | -6% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.3M | ✅ | 67.6M | -4% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 39.3M | ✅ | 35.2M | -11% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.3M | ✅ | 68.2M | -3% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.9M | ✅ | 37.1M | -9% |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 27.8M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 63.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.3M | ✅ | 49.2M | -9% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 161.0M | ✅ | 63.8M | 🟢 **-60%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 29.1M | ✅ | 33.4M | +15% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 37.8M | ✅ | 36.1M | -4% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 44.2M | ✅ | 42.7M | -4% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 44.3M | ✅ | 40.8M | -8% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 37.4M | ✅ | 31.2M | -16% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.5M | ✅ | 26.6M | 🟢 **-45%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 24.7M | ✅ | 27.7M | +12% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.1M | ✅ | 27.8M | +15% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.1M | ✅ | 27.8M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.1M | ✅ | 27.2M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.6M | ✅ | 29.0M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.9M | ✅ | 28.6M | +20% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.1M | ✅ | 27.7M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 19.9M | ✅ | 30.1M | 🔴 **+52%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.8M | ✅ | 25.6M | -1% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.4M | ✅ | 17.5M | +14% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.5M | ✅ | 13.9M | +3% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.2M | ✅ | 14.6M | +2% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 23.7M | ✅ | 27.0M | +14% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.1M | ✅ | 23.7M | 🔴 **+24%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.5M | ✅ | 23.4M | +4% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.7M | ✅ | 20.7M | +11% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ✅ | 21.8M | +10% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 9.3M | +18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ✅ | 8.8M | +1% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 16.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.6M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.3M | ✅ | 7.9M | 🟢 **-68%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 35.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.6M | ✅ | 22.5M | 🔴 **+28%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.4M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 17.5M | ✅ | 74K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 4.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 32.2M | ✅ | 30.6M | -5% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.1M | ✅ | 2.8M | 🟢 **-83%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.2M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.5M | ✅ | 25.5M | -11% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.6M | ✅ | 912K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.5M | ✅ | 30.3M | -12% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ✅ | 5.6M | -11% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.7M | ✅ | 55.4M | 🟢 **-26%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ✅ | 9.1M | -3% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.6M | ✅ | 15.7M | +0% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ✅ | 4.3M | 🟢 **-27%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 13.3M | ✅ | 14.7M | +11% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.9M | ✅ | 12.2M | 🟢 **-67%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 54.2M | ✅ | 44.7M | -18% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 24.6M | ✅ | 27.3M | +11% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.4M | ✅ | 6.9M | 🟢 **-58%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 42.2M | ✅ | 43.9M | +4% |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.4M | ✅ | 43.2M | +2% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 41.7M | ✅ | 43.3M | +4% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 55.8M | ✅ | 49.5M | -11% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.3M | ✅ | 43.7M | +3% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 23.8M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.8M | ✅ | 22.0M | 🟢 **-59%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 30.8M | ✅ | 23.0M | 🟢 **-25%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.2M | ✅ | 17.3M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.1M | ✅ | 13.7M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.6M | ✅ | 74.1M | 🟢 **-53%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 21.7M | ✅ | 8.3M | 🟢 **-62%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.4M | ✅ | 45.1M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 28.4M | ✅ | 7.2M | 🟢 **-75%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.9M | ✅ | 9.8M | 🟢 **-74%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 28.6M | -18% |
| allOf.json | allOf with base schema | 5 | ✅ | 28.0M | ✅ | 26.8M | -4% |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 36.5M | 🟢 **-40%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 65.6M | 🟢 **-59%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ✅ | 36.7M | 🟢 **-26%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 36.1M | 🟢 **-61%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ✅ | 74.0M | 🟢 **-53%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 66.3M | 🟢 **-58%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 48.5M | 🟢 **-22%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 45.4M | 🟢 **-61%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 43.4M | 🟢 **-33%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 5.0M | 🟢 **-94%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ✅ | 48.0M | 🟢 **-24%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ✅ | 50.0M | 🟢 **-56%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 59.6M | ✅ | 48.3M | -19% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 62.3M | ✅ | 48.1M | 🟢 **-23%** |
| anyOf.json | anyOf | 4 | ✅ | 64.9M | ✅ | 23.0M | 🟢 **-65%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.3M | ✅ | 20.5M | 🟢 **-40%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 54.3M | 🟢 **-66%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 147.2M | ✅ | 69.5M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 21.2M | 🟢 **-57%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.3M | ✅ | 18.9M | 🟢 **-62%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.8M | ✅ | 55.2M | 🟢 **-68%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 62.8M | ✅ | 27.5M | 🟢 **-56%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 176.1M | ✅ | 55.0M | 🟢 **-69%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 49.1M | ✅ | 39.1M | 🟢 **-20%** |
| const.json | const validation | 3 | ✅ | 55.1M | ✅ | 38.2M | 🟢 **-31%** |
| const.json | const with object | 4 | ✅ | 36.0M | ✅ | 15.1M | 🟢 **-58%** |
| const.json | const with array | 3 | ✅ | 49.4M | ✅ | 15.7M | 🟢 **-68%** |
| const.json | const with null | 2 | ✅ | 64.8M | ✅ | 49.3M | 🟢 **-24%** |
| const.json | const with false does not match 0 | 3 | ✅ | 58.7M | ✅ | 39.6M | 🟢 **-32%** |
| const.json | const with true does not match 1 | 3 | ✅ | 58.1M | ✅ | 39.7M | 🟢 **-32%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ✅ | 14.5M | 🟢 **-73%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.1M | ✅ | 14.2M | 🟢 **-74%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.5M | ✅ | 11.7M | 🟢 **-77%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.7M | ✅ | 12.4M | 🟢 **-76%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.5M | ✅ | 43.2M | -19% |
| const.json | const with 1 does not match true | 3 | ✅ | 67.5M | ✅ | 43.5M | 🟢 **-36%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ✅ | 41.4M | 🟢 **-26%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.1M | ✅ | 42.5M | 🟢 **-33%** |
| const.json | nul characters in strings | 2 | ✅ | 54.3M | ✅ | 38.2M | 🟢 **-30%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.4M | ✅ | 43.7M | -13% |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.5M | ✅ | 45.0M | -17% |
| contains.json | contains keyword validation | 6 | ✅ | 59.9M | ✅ | 18.4M | 🟢 **-69%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ✅ | 5.5M | 🟢 **-91%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.0M | ✅ | 45.0M | 🟢 **-27%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ✅ | 31.8M | 🟢 **-45%** |
| contains.json | items + contains | 4 | ✅ | 40.2M | ✅ | 6.8M | 🟢 **-83%** |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ✅ | 30.3M | 🟢 **-49%** |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 53.5M | 🟢 **-34%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 175.8M | ✅ | 63.1M | 🟢 **-64%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ✅ | 64.7M | 🟢 **-63%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 178.5M | ✅ | 46.2M | 🟢 **-74%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 183.7M | ✅ | 55.2M | 🟢 **-70%** |
| default.json | invalid type for default | 2 | ✅ | 68.1M | ✅ | 59.0M | -13% |
| default.json | invalid string value for default | 2 | ✅ | 52.5M | ✅ | 41.7M | 🟢 **-21%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.2M | ✅ | 44.0M | -11% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ✅ | 755K | 🟢 **-66%** |
| dependentRequired.json | single dependency | 7 | ✅ | 57.2M | ✅ | 48.4M | -15% |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.5M | ✅ | 57.7M | 🟢 **-67%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.3M | ✅ | 35.4M | 🔴 **+46%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ✅ | 38.8M | -8% |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.6M | ✅ | 42.3M | -13% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.9M | ✅ | 39.4M | -16% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.0M | ✅ | 32.2M | -17% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 35.9M | ✅ | 39.1M | +9% |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.5M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.9M | ✅ | 11.1M | 🟢 **-34%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 11.0M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 13.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 8.4M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ✅ | 10.3M | 🔴 **+66%** |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.5M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.7M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 31.8M | ✅ | 50.8M | 🔴 **+60%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 39.9M | ✅ | 11.5M | 🟢 **-71%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.4M | ✅ | 44.7M | 🟢 **-31%** |
| enum.json | enums in properties | 6 | ✅ | 37.6M | ✅ | 36.6M | -3% |
| enum.json | enum with escaped characters | 3 | ✅ | 68.4M | ✅ | 48.7M | 🟢 **-29%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 55.9M | ✅ | 39.3M | 🟢 **-30%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 48.6M | ✅ | 20.1M | 🟢 **-59%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 57.8M | ✅ | 38.7M | 🟢 **-33%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 49.3M | ✅ | 20.5M | 🟢 **-58%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 62.8M | ✅ | 44.9M | 🟢 **-29%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.8M | ✅ | 22.7M | 🟢 **-60%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.7M | ✅ | 43.5M | 🟢 **-35%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.5M | ✅ | 22.6M | 🟢 **-58%** |
| enum.json | nul characters in strings | 2 | ✅ | 52.9M | ✅ | 44.0M | -17% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.5M | ✅ | 40.8M | 🟢 **-31%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 54.6M | ✅ | 41.5M | 🟢 **-24%** |
| format.json | email format | 7 | ✅ | 182.2M | ✅ | 55.1M | 🟢 **-70%** |
| format.json | idn-email format | 7 | ✅ | 182.3M | ✅ | 53.9M | 🟢 **-70%** |
| format.json | regex format | 7 | ✅ | 183.2M | ✅ | 54.9M | 🟢 **-70%** |
| format.json | ipv4 format | 7 | ✅ | 183.7M | ✅ | 55.2M | 🟢 **-70%** |
| format.json | ipv6 format | 7 | ✅ | 183.2M | ✅ | 54.9M | 🟢 **-70%** |
| format.json | idn-hostname format | 7 | ✅ | 148.4M | ✅ | 55.0M | 🟢 **-63%** |
| format.json | hostname format | 7 | ✅ | 148.6M | ✅ | 53.8M | 🟢 **-64%** |
| format.json | date format | 7 | ✅ | 175.8M | ✅ | 55.2M | 🟢 **-69%** |
| format.json | date-time format | 7 | ✅ | 167.5M | ✅ | 54.6M | 🟢 **-67%** |
| format.json | time format | 7 | ✅ | 183.7M | ✅ | 55.1M | 🟢 **-70%** |
| format.json | json-pointer format | 7 | ✅ | 183.3M | ✅ | 55.0M | 🟢 **-70%** |
| format.json | relative-json-pointer format | 7 | ✅ | 181.8M | ✅ | 54.5M | 🟢 **-70%** |
| format.json | iri format | 7 | ✅ | 172.9M | ✅ | 55.0M | 🟢 **-68%** |
| format.json | iri-reference format | 7 | ✅ | 173.3M | ✅ | 54.7M | 🟢 **-68%** |
| format.json | uri format | 7 | ✅ | 183.5M | ✅ | 54.5M | 🟢 **-70%** |
| format.json | uri-reference format | 7 | ✅ | 167.0M | ✅ | 55.2M | 🟢 **-67%** |
| format.json | uri-template format | 7 | ✅ | 183.5M | ✅ | 55.3M | 🟢 **-70%** |
| format.json | uuid format | 7 | ✅ | 148.4M | ✅ | 55.7M | 🟢 **-62%** |
| format.json | duration format | 7 | ✅ | 183.7M | ✅ | 55.1M | 🟢 **-70%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 155.2M | ✅ | 68.8M | 🟢 **-56%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.7M | ✅ | 68.2M | 🟢 **-60%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 106.4M | ✅ | 68.6M | 🟢 **-36%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ✅ | 43.3M | 🟢 **-38%** |
| if-then-else.json | if and else without then | 3 | ✅ | 69.4M | ✅ | 38.6M | 🟢 **-44%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.3M | ✅ | 37.3M | 🟢 **-39%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 170.8M | ✅ | 59.8M | 🟢 **-65%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ✅ | 49.9M | 🟢 **-23%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ✅ | 47.6M | 🟢 **-26%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.7M | ✅ | 31.5M | 🟢 **-26%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.1M | ✅ | 37.8M | +7% |
| items.json | a schema given for items | 4 | ✅ | 58.6M | ✅ | 39.6M | 🟢 **-33%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.0M | ✅ | 69.0M | 🟢 **-60%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.2M | ✅ | 43.0M | 🟢 **-31%** |
| items.json | items and subitems | 6 | ✅ | 27.1M | ✅ | 17.1M | 🟢 **-37%** |
| items.json | nested items | 3 | ✅ | 13.4M | ✅ | 12.5M | -7% |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 73.5M | ✅ | 49.5M | 🟢 **-33%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 48.1M | ✅ | 39.8M | -17% |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 46.6M | ✅ | 37.2M | 🟢 **-20%** |
| items.json | items with heterogeneous array | 2 | ✅ | 63.5M | ✅ | 45.7M | 🟢 **-28%** |
| items.json | items with null instance elements | 1 | ✅ | 77.1M | ✅ | 67.3M | -13% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 169.7M | ✅ | 68.4M | 🟢 **-60%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.7M | ✅ | 27.5M | 🟢 **-47%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.9M | ✅ | 44.3M | 🟢 **-23%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.7M | ✅ | 37.1M | 🟢 **-27%** |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ✅ | 48.4M | 🟢 **-34%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 48.7M | 🟢 **-23%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.2M | ✅ | 46.6M | 🟢 **-21%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.8M | ✅ | 38.2M | 🟢 **-26%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.2M | ✅ | 42.6M | -20% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.9M | ✅ | 32.3M | 🟢 **-23%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.6M | ✅ | 34.0M | 🟢 **-20%** |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ✅ | 47.3M | 🟢 **-31%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.7M | ✅ | 45.0M | 🟢 **-34%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.5M | ✅ | 69.0M | 🟢 **-60%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.2M | ✅ | 36.3M | 🟢 **-40%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 54.4M | ✅ | 29.2M | 🟢 **-46%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ✅ | 45.0M | 🟢 **-23%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.5M | ✅ | 37.9M | 🟢 **-20%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.4M | ✅ | 38.6M | -11% |
| minContains.json | minContains = 0 | 2 | ✅ | 171.6M | ✅ | 59.6M | 🟢 **-65%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.9M | ✅ | 44.7M | 🟢 **-32%** |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ✅ | 47.8M | 🟢 **-35%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 46.3M | 🟢 **-27%** |
| minLength.json | minLength validation | 5 | ✅ | 52.6M | ✅ | 44.4M | -16% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.2M | ✅ | 43.5M | -17% |
| minProperties.json | minProperties validation | 6 | ✅ | 52.8M | ✅ | 42.6M | -19% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.1M | ✅ | 32.5M | 🟢 **-21%** |
| minimum.json | minimum validation | 4 | ✅ | 62.8M | ✅ | 47.3M | 🟢 **-25%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ✅ | 48.7M | 🟢 **-25%** |
| multipleOf.json | by int | 3 | ✅ | 69.4M | ✅ | 44.1M | 🟢 **-37%** |
| multipleOf.json | by number | 3 | ✅ | 62.2M | ✅ | 42.6M | 🟢 **-31%** |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 37.5M | 🟢 **-35%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 8.8M | 🟢 **-80%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 9.2M | 🟢 **-87%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 37.2M | 🟢 **-41%** |
| not.json | not multiple types | 3 | ✅ | 56.0M | ✅ | 37.8M | 🟢 **-33%** |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ✅ | 38.0M | 🟢 **-35%** |
| not.json | forbidden property | 2 | ✅ | 46.0M | ✅ | 43.1M | -6% |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 38.4M | 🟢 **-22%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.9M | ✅ | 38.1M | 🟢 **-38%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 183.4M | ✅ | 54.7M | 🟢 **-70%** |
| not.json | double negation | 1 | ✅ | 159.4M | ✅ | 73.1M | 🟢 **-54%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.5M | ✅ | 24.3M | 🟢 **-23%** |
| oneOf.json | oneOf | 4 | ✅ | 47.1M | ✅ | 21.3M | 🟢 **-55%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.3M | ✅ | 24.5M | 🟢 **-26%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 36.7M | 🟢 **-26%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.4M | ✅ | 26.3M | 🟢 **-84%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 36.6M | 🟢 **-27%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 17.5M | 🟢 **-65%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.0M | ✅ | 22.1M | 🟢 **-45%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 38.0M | 🟢 **-38%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.2M | ✅ | 16.3M | 🟢 **-60%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ✅ | 19.8M | 🟢 **-54%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 28.5M | 🟢 **-54%** |
| pattern.json | pattern validation | 8 | ✅ | 52.5M | ✅ | 39.4M | 🟢 **-25%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.3M | ✅ | 31.0M | 🟢 **-34%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.1M | ✅ | 11.0M | 🟢 **-56%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.3M | ✅ | 5.8M | 🟢 **-59%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.6M | ✅ | 7.5M | 🟢 **-55%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.6M | ✅ | 5.9M | 🟢 **-72%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 17.8M | +0% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.6M | ✅ | 49.3M | 🟢 **-25%** |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 62.3M | ✅ | 47.1M | 🟢 **-24%** |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 83.0M | ✅ | 66.5M | -20% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 82.9M | ✅ | 68.1M | -18% |
| properties.json | object properties validation | 6 | ✅ | 49.9M | ✅ | 44.4M | -11% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.7M | ✅ | 9.8M | 🟢 **-50%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.7M | ✅ | 41.0M | -4% |
| properties.json | properties with escaped characters | 2 | ✅ | 44.5M | ✅ | 43.6M | -2% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 60.7M | -6% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.8M | ✅ | 29.1M | 🟢 **-34%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ✅ | 14.5M | 🟢 **-25%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.6M | ✅ | 59.9M | 🟢 **-65%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 41.9M | ✅ | 28.8M | 🟢 **-31%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 41.5M | ✅ | 30.7M | 🟢 **-26%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.7M | ✅ | 33.9M | -19% |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ✅ | 19.1M | 🟢 **-20%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.3M | ✅ | 41.7M | -10% |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ✅ | 45.0M | -12% |
| ref.json | escaped pointer ref | 6 | ✅ | 40.6M | ✅ | 39.5M | -3% |
| ref.json | nested refs | 2 | ✅ | 46.9M | ✅ | 43.8M | -7% |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 39.7M | ✅ | 37.4M | -6% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ✅ | 2.1M | 🟢 **-37%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.8M | ✅ | 43.9M | -6% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 43.9M | -6% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 156.8M | ✅ | 74.7M | 🟢 **-52%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 40.2M | -19% |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.1M | ✅ | 7.2M | 🟢 **-21%** |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ✅ | 44.4M | -5% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.4M | ✅ | 32.8M | +20% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.3M | ✅ | 14.4M | 🟢 **-70%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.8M | ✅ | 45.9M | 🟢 **-23%** |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 57.2M | ✅ | 44.0M | 🟢 **-23%** |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.2M | ✅ | 44.4M | 🟢 **-27%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 48.1M | ✅ | 42.0M | -13% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.4M | ✅ | 22.8M | 🟢 **-32%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ✅ | 43.4M | -7% |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.8M | ✅ | 43.7M | -7% |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.6M | ✅ | 43.9M | -6% |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.8M | ✅ | 44.6M | -5% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.4M | ✅ | 43.1M | -7% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.8M | ✅ | 43.6M | -3% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 59.2M | ✅ | 47.9M | -19% |
| ref.json | ref to then | 2 | ✅ | 55.5M | ✅ | 48.3M | -13% |
| ref.json | ref to else | 2 | ✅ | 60.1M | ✅ | 49.4M | -18% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.8M | ✅ | 47.9M | -20% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 48.0M | 🟢 **-23%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 49.1M | 🟢 **-21%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 48.8M | 🟢 **-22%** |
| refRemote.json | remote ref | 2 | ✅ | 59.4M | ✅ | 48.1M | -19% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 58.8M | ✅ | 49.5M | -16% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 59.9M | ✅ | 46.6M | 🟢 **-22%** |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.8M | ✅ | 47.3M | 🟢 **-21%** |
| refRemote.json | base URI change | 2 | ✅ | 32.6M | ✅ | 27.9M | -15% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.1M | ✅ | 27.4M | -19% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.7M | ✅ | 27.6M | 🟢 **-29%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.1M | ✅ | 10.6M | 🟢 **-72%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 47.2M | ✅ | 36.0M | 🟢 **-24%** |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 58.2M | ✅ | 41.5M | 🟢 **-29%** |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ✅ | 28.4M | 🟢 **-29%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 54.3M | ✅ | 41.7M | 🟢 **-23%** |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 59.8M | ✅ | 41.3M | 🟢 **-31%** |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 47.5M | ✅ | 38.3M | -19% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 59.6M | ✅ | 41.7M | 🟢 **-30%** |
| required.json | required validation | 5 | ✅ | 57.9M | ✅ | 47.7M | -18% |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 74.1M | 🟢 **-54%** |
| required.json | required with empty array | 1 | ✅ | 159.5M | ✅ | 73.8M | 🟢 **-54%** |
| required.json | required with escaped characters | 2 | ✅ | 44.3M | ✅ | 37.6M | -15% |
| required.json | required properties whose names are J... | 7 | ✅ | 24.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 40.2M | 🟢 **-24%** |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ✅ | 40.1M | 🟢 **-27%** |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 45.9M | -16% |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 39.7M | -14% |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ✅ | 40.1M | 🟢 **-22%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 43.5M | -16% |
| type.json | null type matches only the null object | 10 | ✅ | 48.8M | ✅ | 41.9M | -14% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ✅ | 38.1M | 🟢 **-27%** |
| type.json | type as array with one item | 2 | ✅ | 62.2M | ✅ | 48.5M | 🟢 **-22%** |
| type.json | type: array or object | 5 | ✅ | 55.1M | ✅ | 42.3M | 🟢 **-23%** |
| type.json | type: array, object or null | 5 | ✅ | 64.1M | ✅ | 44.1M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.5M | ✅ | 69.1M | -17% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.4M | ✅ | 47.8M | -10% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 57.0M | ✅ | 42.9M | 🟢 **-25%** |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ✅ | 63.0M | -13% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 50.0M | ✅ | 46.5M | -7% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 80.9M | ✅ | 66.6M | -18% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 48.0M | ✅ | 42.1M | -12% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.9M | ✅ | 42.9M | -10% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 84.0M | ✅ | 62.4M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.0M | ✅ | 64.6M | 🔴 **+207%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.5M | ✅ | 25.4M | 🔴 **+104%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.8M | ✅ | 19.7M | 🔴 **+25%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ✅ | 37.2M | +6% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.5M | ✅ | 26.3M | 🔴 **+129%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.4M | ✅ | 46.1M | -14% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.8M | ✅ | 43.9M | -8% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.9M | ✅ | 41.7M | -13% |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ✅ | 38.4M | -2% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.2M | ✅ | 30.6M | 🔴 **+26%** |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 20.1M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.2M | ✅ | 55.2M | 🟢 **-40%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ✅ | 66.0M | -14% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 36.0M | ✅ | 37.0M | +3% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.9M | ✅ | 68.3M | 🔴 **+25%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.3M | ✅ | 16.7M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.8M | ✅ | 40.0M | +6% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.3M | ✅ | 35.9M | +11% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.0M | ✅ | 12.7M | -10% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.4M | ✅ | 68.6M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 32.4M | ✅ | 12.9M | 🟢 **-60%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.5M | ✅ | 31.2M | +10% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 11.8M | ✅ | 8.2M | 🟢 **-31%** |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.6M | ✅ | 58.9M | -12% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 25.9M | ✅ | 53.4M | 🔴 **+106%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.3M | ✅ | 8.7M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.0M | ✅ | 12.5M | 🟢 **-26%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 22.2M | ✅ | 28.8M | 🔴 **+30%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.1M | ✅ | 17.6M | -3% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.3M | ✅ | 18.8M | +8% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.6M | ✅ | 25.0M | -6% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.8M | ✅ | 37.3M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.6M | ✅ | 31.1M | +9% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.4M | ✅ | 32.8M | +15% |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ✅ | 34.0M | +16% |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.5M | ✅ | 33.2M | +13% |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 25.1M | ✅ | 58.8M | 🔴 **+135%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 26.1M | ✅ | 59.2M | 🔴 **+126%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.3M | ✅ | 30.3M | 🔴 **+30%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.8M | ✅ | 35.3M | 🔴 **+37%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.8M | ✅ | 29.2M | 🔴 **+47%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.1M | ✅ | 35.9M | 🔴 **+224%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.8M | ✅ | 23.3M | -13% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 30.5M | ✅ | 29.7M | -2% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 35.9M | ✅ | 25.0M | 🟢 **-30%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.5M | ✅ | 12.4M | 🟢 **-29%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ✅ | 14.1M | 🟢 **-27%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ✅ | 5.2M | 🟢 **-27%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 79.2M | ✅ | 53.3M | 🟢 **-33%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.7M | ✅ | 44.8M | -10% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.7M | ✅ | 12.5M | 🟢 **-55%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.0M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.2M | ✅ | 26.9M | 🔴 **+21%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.1M | ✅ | 28.9M | 🔴 **+26%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.7M | ✅ | 7.3M | 🟢 **-56%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.0M | ✅ | 21.9M | 🟢 **-29%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 44.8M | ✅ | 27.9M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.5M | ✅ | 54.3M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ✅ | 52.9M | 🟢 **-30%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.2M | ✅ | 48.7M | -16% |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.3M | ✅ | 49.0M | 🟢 **-21%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 50.5M | ✅ | 11.3M | 🟢 **-78%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 14.3M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 68.4M | -19% |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 38.8M | -19% |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.1M | ✅ | 67.4M | -12% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.4M | ✅ | 38.4M | -15% |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 67.4M | -13% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 44.1M | ✅ | 35.2M | 🟢 **-20%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 87.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.5M | ✅ | 48.2M | -19% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.6M | ✅ | 65.6M | 🟢 **-63%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 28.2M | ✅ | 36.3M | 🔴 **+28%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 41.8M | ✅ | 39.4M | -6% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.2M | ✅ | 41.5M | -14% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.8M | ✅ | 39.2M | -20% |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.6M | ✅ | 30.8M | 🟢 **-24%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 26.5M | 🟢 **-51%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.5M | ✅ | 27.4M | 🔴 **+48%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 27.7M | +9% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 26.4M | -2% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.3M | ✅ | 27.2M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.4M | ✅ | 29.0M | +14% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.4M | ✅ | 27.5M | +12% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.9M | ✅ | 27.8M | +3% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 28.4M | +9% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 25.3M | -9% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.1M | ✅ | 18.2M | +13% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.3M | ✅ | 13.6M | +2% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.6M | ✅ | 14.2M | +5% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.2M | ✅ | 27.2M | +12% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.5M | ✅ | 23.2M | +13% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.6M | ✅ | 23.3M | -1% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 20.9M | +2% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.6M | ✅ | 20.6M | +0% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 8.7M | +9% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 8.6M | -2% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 20.7M | ✅ | 2.9M | 🟢 **-86%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.3M | ✅ | 8.1M | 🟢 **-69%** |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.9M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 40.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.2M | ✅ | 78K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.0M | ✅ | 30.6M | -10% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ✅ | 2.8M | 🟢 **-83%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.2M | ✅ | 24.7M | -15% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.2M | ✅ | 899K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.3M | ✅ | 29.6M | 🟢 **-21%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ✅ | 5.7M | -13% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.4M | ✅ | 54.8M | 🟢 **-34%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ✅ | 9.3M | -2% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.9M | ✅ | 15.3M | -9% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ✅ | 4.4M | 🟢 **-31%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.9M | ✅ | 14.2M | -5% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 23.1M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.3M | ✅ | 11.8M | 🟢 **-71%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.8M | ✅ | 42.8M | 🟢 **-28%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.3M | ✅ | 26.6M | -3% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.0M | ✅ | 6.9M | 🟢 **-59%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.4M | ✅ | 41.1M | -12% |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.4M | ✅ | 43.5M | -6% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.3M | ✅ | 43.0M | -7% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.3M | ✅ | 50.2M | -19% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.4M | ✅ | 43.4M | -6% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.6M | ❌ | - | - |
