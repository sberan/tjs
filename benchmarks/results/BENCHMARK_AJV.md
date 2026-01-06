# tjs vs ajv Benchmarks

Performance comparison of **tjs** vs **[ajv](https://ajv.js.org/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | ajv pass | ajv ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.6M | 172/199 | 13.3M | 172 | 🟢 **-50%** |
| draft6 | 276 | ✅ 276 | 30.1M | 269/276 | 14.8M | 269 | 🟢 **-51%** |
| draft7 | 313 | ✅ 313 | 15.5M | 296/313 | 13.3M | 296 | -14% |
| draft2019-09 | 435 | ✅ 435 | 19.3M | 413/435 | 6.5M | 413 | 🟢 **-66%** |
| draft2020-12 | 448 | ✅ 448 | 18.4M | 398/448 | 5.2M | 398 | 🟢 **-72%** |
| **Total** | 1671 | 1670/1671 | 19.8M | 1548/1671 | 8.1M | 1548 | 🟢 **-59%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **3.18x faster** (39 ns vs 123 ns per test, 6602 tests in 1548 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 7.1M | -2% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 85.2M | ✅ | 73.6M | -14% |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 144.1M | ✅ | 49.3M | 🟢 **-66%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 88.5M | ✅ | 66.1M | 🟢 **-25%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 66.6M | 🟢 **-46%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 44.5M | ✅ | 28.3M | 🟢 **-36%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.0M | ✅ | 37.1M | 🟢 **-36%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 69.7M | ✅ | 48.4M | 🟢 **-30%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 152.8M | ✅ | 74.5M | 🟢 **-51%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 38.9M | ✅ | 31.0M | 🟢 **-20%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.6M | ✅ | 23.3M | +3% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 35.2M | ✅ | 17.4M | 🟢 **-50%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 43.9M | ✅ | 13.5M | 🟢 **-69%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 77.0M | ✅ | 74.0M | -4% |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.3M | ✅ | 8.2M | 🟢 **-75%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 50.9M | ✅ | 46.8M | -8% |
| allOf.json | allOf | 4 | ✅ | 44.0M | ✅ | 28.0M | 🟢 **-36%** |
| allOf.json | allOf with base schema | 5 | ✅ | 26.6M | ✅ | 23.3M | -12% |
| allOf.json | allOf simple types | 2 | ✅ | 109.8M | ✅ | 47.6M | 🟢 **-57%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 85.1M | ✅ | 74.0M | -13% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 74.0M | 🟢 **-52%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.4M | ✅ | 36.0M | 🟢 **-51%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 40.3M | 🟢 **-66%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 47.8M | 🟢 **-36%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 10.1M | 🟢 **-88%** |
| anyOf.json | anyOf | 4 | ✅ | 76.1M | ✅ | 27.2M | 🟢 **-64%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.8M | ✅ | 18.4M | 🟢 **-60%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 49.0M | ✅ | 32.8M | 🟢 **-33%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.5M | ✅ | 66.3M | 🟢 **-60%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 24.0M | 🟢 **-68%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 57.8M | 🟢 **-46%** |
| default.json | invalid string value for default | 2 | ✅ | 53.3M | ✅ | 49.0M | -8% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.7M | ✅ | 24.8M | 🟢 **-68%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.7M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.5M | ✅ | 48.3M | 🟢 **-47%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.5M | ✅ | 36.3M | +8% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 57.8M | ✅ | 37.9M | 🟢 **-34%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.5M | ✅ | 20.7M | +12% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 46.1M | ✅ | 25.5M | 🟢 **-45%** |
| enum.json | simple enum validation | 2 | ✅ | 71.9M | ✅ | 44.4M | 🟢 **-38%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.5M | ✅ | 17.5M | 🟢 **-71%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 65.7M | ✅ | 45.1M | 🟢 **-31%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 31.8M | 🔴 **+116%** |
| enum.json | enum with escaped characters | 3 | ✅ | 57.7M | ✅ | 42.2M | 🟢 **-27%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.9M | ✅ | 38.9M | 🟢 **-66%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.9M | ✅ | 26.8M | 🟢 **-58%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 39.0M | 🟢 **-65%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.0M | ✅ | 26.5M | 🟢 **-59%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 108.7M | ✅ | 49.7M | 🟢 **-54%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ✅ | 28.6M | 🟢 **-57%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 109.9M | ✅ | 43.6M | 🟢 **-60%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.4M | ✅ | 28.2M | 🟢 **-57%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 45.0M | 🟢 **-51%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ✅ | 43.4M | 🟢 **-23%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.6M | ✅ | 41.0M | 🟢 **-56%** |
| format.json | email format | 6 | ✅ | 83.4M | ✅ | 54.8M | 🟢 **-34%** |
| format.json | ipv4 format | 6 | ✅ | 162.2M | ✅ | 55.2M | 🟢 **-66%** |
| format.json | ipv6 format | 6 | ✅ | 86.1M | ✅ | 54.8M | 🟢 **-36%** |
| format.json | hostname format | 6 | ✅ | 162.9M | ✅ | 55.2M | 🟢 **-66%** |
| format.json | date-time format | 6 | ✅ | 87.1M | ✅ | 55.1M | 🟢 **-37%** |
| format.json | uri format | 6 | ✅ | 162.3M | ✅ | 54.9M | 🟢 **-66%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 42.5M | ✅ | 34.5M | -19% |
| items.json | a schema given for items | 4 | ✅ | 80.4M | ✅ | 43.3M | 🟢 **-46%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.6M | ✅ | 46.2M | 🟢 **-30%** |
| items.json | items and subitems | 6 | ✅ | 13.3M | ✅ | 21.9M | 🔴 **+65%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 11.7M | -5% |
| items.json | items with null instance elements | 1 | ✅ | 72.0M | ✅ | 66.7M | -7% |
| items.json | array-form items with null instance e... | 1 | ✅ | 77.0M | ✅ | 67.7M | -12% |
| maxItems.json | maxItems validation | 4 | ✅ | 67.3M | ✅ | 46.0M | 🟢 **-32%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.2M | ✅ | 47.0M | -18% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.4M | ✅ | 41.5M | 🟢 **-26%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.7M | ✅ | 32.5M | 🟢 **-35%** |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ✅ | 47.6M | 🟢 **-35%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.2M | ✅ | 48.1M | 🟢 **-33%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 73.2M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 67.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.7M | ✅ | 47.8M | 🟢 **-42%** |
| minLength.json | minLength validation | 5 | ✅ | 55.3M | ✅ | 44.2M | -20% |
| minProperties.json | minProperties validation | 6 | ✅ | 57.6M | ✅ | 42.5M | 🟢 **-26%** |
| minimum.json | minimum validation | 4 | ✅ | 73.1M | ✅ | 47.2M | 🟢 **-35%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 73.3M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 67.4M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 46.4M | 🟢 **-33%** |
| multipleOf.json | by int | 3 | ✅ | 74.0M | ✅ | 43.7M | 🟢 **-41%** |
| multipleOf.json | by number | 3 | ✅ | 70.1M | ✅ | 42.5M | 🟢 **-39%** |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 37.8M | 🟢 **-41%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 8.9M | 🟢 **-84%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 9.2M | 🟢 **-87%** |
| not.json | not | 2 | ✅ | 72.6M | ✅ | 43.0M | 🟢 **-41%** |
| not.json | not multiple types | 3 | ✅ | 68.1M | ✅ | 37.2M | 🟢 **-45%** |
| not.json | not more complex schema | 3 | ✅ | 65.7M | ✅ | 37.9M | 🟢 **-42%** |
| not.json | forbidden property | 2 | ✅ | 49.9M | ✅ | 43.4M | -13% |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.4M | ✅ | 38.6M | 🟢 **-37%** |
| not.json | double negation | 1 | ✅ | 85.1M | ✅ | 73.5M | -14% |
| oneOf.json | oneOf | 4 | ✅ | 64.5M | ✅ | 22.5M | 🟢 **-65%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.4M | ✅ | 24.3M | 🟢 **-25%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.3M | ✅ | 25.9M | 🟢 **-40%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 35.8M | 🟢 **-51%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.6M | ✅ | 21.0M | 🟢 **-55%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.6M | ✅ | 21.3M | 🟢 **-55%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 36.2M | ✅ | 23.4M | 🟢 **-36%** |
| pattern.json | pattern validation | 8 | ✅ | 53.9M | ✅ | 43.8M | -19% |
| pattern.json | pattern is not anchored | 1 | ✅ | 21.7M | ✅ | 30.5M | 🔴 **+41%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ✅ | 13.6M | 🟢 **-48%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 7.4M | 🟢 **-50%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.6M | ✅ | 8.0M | 🟢 **-49%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 21.3M | 🔴 **+22%** |
| properties.json | object properties validation | 6 | ✅ | 53.1M | ✅ | 43.7M | -18% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ✅ | 9.2M | 🟢 **-52%** |
| properties.json | properties with escaped characters | 2 | ✅ | 22.1M | ✅ | 42.2M | 🔴 **+91%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ✅ | 60.4M | -10% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.4M | ✅ | 21.5M | -15% |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.3M | ✅ | 43.1M | +4% |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.3M | ✅ | 44.3M | -8% |
| ref.json | escaped pointer ref | 6 | ✅ | 45.4M | ✅ | 40.2M | -11% |
| ref.json | nested refs | 2 | ✅ | 34.4M | ✅ | 47.8M | 🔴 **+39%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 26.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 73.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 11.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.4M | ✅ | 43.5M | -12% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 25.8M | ✅ | 43.6M | 🔴 **+69%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 49.8M | ✅ | 44.7M | -10% |
| ref.json | Location-independent identifier | 2 | ✅ | 73.4M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 44.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 54.1M | ✅ | 17.2M | 🟢 **-68%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 47.5M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 73.4M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 52.7M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.1M | ✅ | 47.8M | 🟢 **-29%** |
| refRemote.json | remote ref | 2 | ✅ | 43.1M | ✅ | 47.4M | +10% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 42.2M | ✅ | 47.3M | +12% |
| refRemote.json | ref within remote ref | 2 | ✅ | 32.5M | ✅ | 47.1M | 🔴 **+45%** |
| refRemote.json | base URI change | 2 | ✅ | 28.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 35.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 26.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 24.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 38.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 60.7M | ✅ | 48.8M | -20% |
| required.json | required default validation | 1 | ✅ | 85.2M | ✅ | 73.0M | -14% |
| required.json | required with escaped characters | 2 | ✅ | 49.2M | ✅ | 37.6M | 🟢 **-24%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.7M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 61.4M | ✅ | 38.9M | 🟢 **-37%** |
| type.json | number type matches numbers | 9 | ✅ | 65.6M | ✅ | 44.3M | 🟢 **-32%** |
| type.json | string type matches strings | 9 | ✅ | 65.2M | ✅ | 39.7M | 🟢 **-39%** |
| type.json | object type matches objects | 7 | ✅ | 56.5M | ✅ | 39.7M | 🟢 **-30%** |
| type.json | array type matches arrays | 7 | ✅ | 61.0M | ✅ | 36.6M | 🟢 **-40%** |
| type.json | boolean type matches booleans | 10 | ✅ | 63.0M | ✅ | 37.3M | 🟢 **-41%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.6M | ✅ | 34.1M | 🟢 **-46%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.5M | ✅ | 36.6M | 🟢 **-42%** |
| type.json | type as array with one item | 2 | ✅ | 73.2M | ✅ | 48.3M | 🟢 **-34%** |
| type.json | type: array or object | 5 | ✅ | 68.9M | ✅ | 40.3M | 🟢 **-42%** |
| type.json | type: array, object or null | 5 | ✅ | 73.7M | ✅ | 46.5M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.5M | ✅ | 6.8M | 🟢 **-61%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.6M | ✅ | 19.1M | 🟢 **-41%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.6M | ✅ | 26.8M | 🔴 **+44%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 86.0M | ✅ | 54.5M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.3M | ✅ | 51.9M | 🟢 **-24%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.3M | ✅ | 47.8M | 🟢 **-31%** |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 14.2M | 🟢 **-83%** |
| optional/bignum.json | number | 2 | ✅ | 84.1M | ✅ | 66.3M | 🟢 **-21%** |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 39.0M | 🟢 **-36%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.1M | ✅ | 67.7M | -10% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 67.4M | -10% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.0M | ✅ | 25.9M | -7% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.7M | ✅ | 27.8M | -3% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.7M | ✅ | 27.4M | -1% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 19.4M | ✅ | 27.7M | 🔴 **+43%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.2M | ✅ | 27.2M | -3% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.0M | ✅ | 26.3M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.1M | ✅ | 28.8M | +2% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.2M | ✅ | 24.9M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.9M | ✅ | 30.3M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 24.3M | -19% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.4M | ✅ | 17.9M | +16% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.9M | ✅ | 14.1M | -6% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 14.5M | -3% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ✅ | 26.9M | -4% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.5M | ✅ | 23.5M | +9% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 23.3M | +0% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 19.7M | -3% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.6M | ✅ | 21.7M | +17% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 9.0M | +17% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ✅ | 8.9M | 0% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.0M | ✅ | 2.9M | 🟢 **-89%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.8M | ✅ | 21.3M | +14% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.4M | ✅ | 30.5M | -18% |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ✅ | 2.8M | 🟢 **-77%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 87.4M | ✅ | 54.5M | 🟢 **-38%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ✅ | 4.3M | 🟢 **-33%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 36.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.3M | ✅ | 26.9M | -11% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.5M | ✅ | 8.8M | 🟢 **-50%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 49.2M | ✅ | 7.3M | 🟢 **-85%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 17.0M | ✅ | 27.6M | 🔴 **+63%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 166.8M | ✅ | 74.8M | 🟢 **-55%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.0M | ✅ | 43.3M | 🟢 **-43%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 177.8M | ✅ | 72.5M | 🟢 **-59%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 88.3M | ✅ | 69.5M | 🟢 **-21%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 37.6M | ✅ | 21.5M | 🟢 **-43%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 36.7M | ✅ | 29.4M | -20% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 36.2M | 🟢 **-66%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 90.2M | ✅ | 74.6M | -17% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.7M | ✅ | 29.1M | 🟢 **-32%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.5M | ✅ | 20.0M | -2% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 38.8M | ✅ | 16.6M | 🟢 **-57%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.8M | ✅ | 13.2M | 🟢 **-61%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 166.9M | ✅ | 70.4M | 🟢 **-58%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 24.8M | ✅ | 8.0M | 🟢 **-68%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.1M | ✅ | 45.1M | 🟢 **-32%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 27.3M | 🟢 **-21%** |
| allOf.json | allOf with base schema | 5 | ✅ | 26.7M | ✅ | 22.3M | -17% |
| allOf.json | allOf simple types | 2 | ✅ | 82.7M | ✅ | 36.2M | 🟢 **-56%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 140.7M | ✅ | 75.5M | 🟢 **-46%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 75.0M | ✅ | 28.3M | 🟢 **-62%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 102.1M | ✅ | 26.3M | 🟢 **-74%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 86.2M | ✅ | 73.7M | -15% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 166.5M | ✅ | 75.7M | 🟢 **-55%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 85.2M | ✅ | 36.6M | 🟢 **-57%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 108.0M | ✅ | 34.9M | 🟢 **-68%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 86.1M | ✅ | 35.8M | 🟢 **-58%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.4M | ✅ | 9.2M | 🟢 **-89%** |
| anyOf.json | anyOf | 4 | ✅ | 87.4M | ✅ | 21.9M | 🟢 **-75%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.0M | ✅ | 16.0M | 🟢 **-65%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 99.4M | ✅ | 73.9M | 🟢 **-26%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 166.2M | ✅ | 75.3M | 🟢 **-55%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 74.4M | ✅ | 13.2M | 🟢 **-82%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 78.1M | ✅ | 23.4M | 🟢 **-70%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 104.0M | ✅ | 66.6M | 🟢 **-36%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 130.2M | ✅ | 19.6M | 🟢 **-85%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 77.7M | ✅ | 55.0M | 🟢 **-29%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.3M | ✅ | 29.8M | 🟢 **-67%** |
| const.json | const validation | 3 | ✅ | 75.7M | ✅ | 31.6M | 🟢 **-58%** |
| const.json | const with object | 4 | ✅ | 54.6M | ✅ | 13.7M | 🟢 **-75%** |
| const.json | const with array | 3 | ✅ | 62.6M | ✅ | 15.0M | 🟢 **-76%** |
| const.json | const with null | 2 | ✅ | 130.7M | ✅ | 36.5M | 🟢 **-72%** |
| const.json | const with false does not match 0 | 3 | ✅ | 81.6M | ✅ | 33.8M | 🟢 **-59%** |
| const.json | const with true does not match 1 | 3 | ✅ | 120.3M | ✅ | 32.8M | 🟢 **-73%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 71.7M | ✅ | 22.9M | 🟢 **-68%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 96.0M | ✅ | 22.6M | 🟢 **-76%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 71.4M | ✅ | 11.9M | 🟢 **-83%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 93.6M | ✅ | 11.7M | 🟢 **-87%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 69.3M | ✅ | 36.1M | 🟢 **-48%** |
| const.json | const with 1 does not match true | 3 | ✅ | 123.3M | ✅ | 38.8M | 🟢 **-69%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.2M | ✅ | 33.5M | 🟢 **-54%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 117.5M | ✅ | 36.4M | 🟢 **-69%** |
| const.json | nul characters in strings | 2 | ✅ | 68.0M | ✅ | 35.5M | 🟢 **-48%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 88.7M | ✅ | 32.3M | 🟢 **-64%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 72.7M | ✅ | 37.7M | 🟢 **-48%** |
| contains.json | contains keyword validation | 6 | ✅ | 100.4M | ✅ | 15.0M | 🟢 **-85%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 68.7M | ✅ | 9.6M | 🟢 **-86%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 106.5M | ✅ | 33.6M | 🟢 **-68%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 80.0M | ✅ | 23.4M | 🟢 **-71%** |
| contains.json | items + contains | 4 | ✅ | 24.1M | ✅ | 6.8M | 🟢 **-72%** |
| contains.json | contains with null instance elements | 1 | ✅ | 87.5M | ✅ | 64.6M | 🟢 **-26%** |
| default.json | invalid type for default | 2 | ✅ | 106.0M | ✅ | 56.4M | 🟢 **-47%** |
| default.json | invalid string value for default | 2 | ✅ | 52.0M | ✅ | 51.6M | -1% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 60.9M | ✅ | 38.4M | 🟢 **-37%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.9M | ✅ | 1.4M | 🟢 **-87%** |
| dependencies.json | dependencies | 7 | ✅ | 85.8M | ✅ | 44.3M | 🟢 **-48%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 100.9M | ✅ | 65.5M | 🟢 **-35%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 37.4M | ✅ | 30.7M | -18% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 41.3M | ✅ | 34.1M | -18% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 93.6M | ✅ | 26.9M | 🟢 **-71%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.5M | ✅ | 20.4M | +16% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.5M | ✅ | 31.3M | -19% |
| enum.json | simple enum validation | 2 | ✅ | 83.7M | ✅ | 35.2M | 🟢 **-58%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 65.8M | ✅ | 10.7M | 🟢 **-84%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 70.2M | ✅ | 38.9M | 🟢 **-45%** |
| enum.json | enums in properties | 6 | ✅ | 15.8M | ✅ | 30.1M | 🔴 **+90%** |
| enum.json | enum with escaped characters | 3 | ✅ | 87.7M | ✅ | 39.4M | 🟢 **-55%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 119.3M | ✅ | 31.5M | 🟢 **-74%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 27.3M | ✅ | 18.2M | 🟢 **-33%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 120.4M | ✅ | 29.8M | 🟢 **-75%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 71.7M | ✅ | 18.8M | 🟢 **-74%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 51.1M | ✅ | 39.8M | 🟢 **-22%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 72.7M | ✅ | 21.7M | 🟢 **-70%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 126.5M | ✅ | 39.2M | 🟢 **-69%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.4M | ✅ | 21.8M | 🟢 **-65%** |
| enum.json | nul characters in strings | 2 | ✅ | 98.2M | ✅ | 34.3M | 🟢 **-65%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 79.4M | ✅ | 35.1M | 🟢 **-56%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 115.0M | ✅ | 34.8M | 🟢 **-70%** |
| format.json | email format | 6 | ✅ | 94.3M | ✅ | 54.4M | 🟢 **-42%** |
| format.json | ipv4 format | 6 | ✅ | 159.9M | ✅ | 55.3M | 🟢 **-65%** |
| format.json | ipv6 format | 6 | ✅ | 97.0M | ✅ | 52.6M | 🟢 **-46%** |
| format.json | hostname format | 6 | ✅ | 67.2M | ✅ | 54.5M | -19% |
| format.json | date-time format | 6 | ✅ | 98.5M | ✅ | 54.5M | 🟢 **-45%** |
| format.json | json-pointer format | 6 | ✅ | 161.0M | ✅ | 52.0M | 🟢 **-68%** |
| format.json | uri format | 6 | ✅ | 99.3M | ✅ | 55.2M | 🟢 **-44%** |
| format.json | uri-reference format | 6 | ✅ | 152.8M | ✅ | 48.1M | 🟢 **-68%** |
| format.json | uri-template format | 6 | ✅ | 87.9M | ✅ | 53.9M | 🟢 **-39%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 49.1M | ✅ | 28.9M | 🟢 **-41%** |
| items.json | a schema given for items | 4 | ✅ | 25.2M | ✅ | 23.0M | -9% |
| items.json | an array of schemas for items | 6 | ✅ | 84.5M | ✅ | 44.6M | 🟢 **-47%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 102.7M | ✅ | 65.4M | 🟢 **-36%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 141.3M | ✅ | 30.9M | 🟢 **-78%** |
| items.json | items with boolean schemas | 3 | ✅ | 54.5M | ✅ | 38.8M | 🟢 **-29%** |
| items.json | items and subitems | 6 | ✅ | 15.4M | ✅ | 18.1M | +18% |
| items.json | nested items | 3 | ✅ | 11.7M | ✅ | 10.7M | -9% |
| items.json | single-form items with null instance ... | 1 | ✅ | 84.6M | ✅ | 67.8M | -20% |
| items.json | array-form items with null instance e... | 1 | ✅ | 88.3M | ✅ | 62.4M | 🟢 **-29%** |
| maxItems.json | maxItems validation | 4 | ✅ | 93.4M | ✅ | 41.5M | 🟢 **-56%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 82.0M | ✅ | 35.0M | 🟢 **-57%** |
| maxLength.json | maxLength validation | 5 | ✅ | 60.3M | ✅ | 38.4M | 🟢 **-36%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 60.4M | ✅ | 32.8M | 🟢 **-46%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.1M | ✅ | 36.4M | 🟢 **-37%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 52.0M | ✅ | 25.6M | 🟢 **-51%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 54.8M | ✅ | 24.7M | 🟢 **-55%** |
| maximum.json | maximum validation | 4 | ✅ | 86.8M | ✅ | 40.5M | 🟢 **-53%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 82.0M | ✅ | 41.4M | 🟢 **-50%** |
| minItems.json | minItems validation | 4 | ✅ | 88.3M | ✅ | 42.2M | 🟢 **-52%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 78.6M | ✅ | 34.7M | 🟢 **-56%** |
| minLength.json | minLength validation | 5 | ✅ | 60.7M | ✅ | 35.0M | 🟢 **-42%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 61.9M | ✅ | 36.2M | 🟢 **-42%** |
| minProperties.json | minProperties validation | 6 | ✅ | 64.0M | ✅ | 39.0M | 🟢 **-39%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 45.5M | ✅ | 27.8M | 🟢 **-39%** |
| minimum.json | minimum validation | 4 | ✅ | 90.9M | ✅ | 38.6M | 🟢 **-58%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 81.0M | ✅ | 44.0M | 🟢 **-46%** |
| multipleOf.json | by int | 3 | ✅ | 86.9M | ✅ | 37.5M | 🟢 **-57%** |
| multipleOf.json | by number | 3 | ✅ | 80.7M | ✅ | 36.8M | 🟢 **-54%** |
| multipleOf.json | by small number | 2 | ✅ | 73.4M | ✅ | 32.1M | 🟢 **-56%** |
| multipleOf.json | float division = inf | 1 | ✅ | 63.3M | ✅ | 7.3M | 🟢 **-88%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 79.8M | ✅ | 10.6M | 🟢 **-87%** |
| not.json | not | 2 | ✅ | 101.0M | ✅ | 28.7M | 🟢 **-72%** |
| not.json | not multiple types | 3 | ✅ | 79.1M | ✅ | 28.6M | 🟢 **-64%** |
| not.json | not more complex schema | 3 | ✅ | 76.4M | ✅ | 29.4M | 🟢 **-62%** |
| not.json | forbidden property | 2 | ✅ | 46.9M | ✅ | 35.3M | 🟢 **-25%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 70.6M | ✅ | 30.8M | 🟢 **-56%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 71.9M | ✅ | 27.3M | 🟢 **-62%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 95.7M | ✅ | 54.4M | 🟢 **-43%** |
| not.json | double negation | 1 | ✅ | 98.3M | ✅ | 75.7M | 🟢 **-23%** |
| oneOf.json | oneOf | 4 | ✅ | 72.8M | ✅ | 17.1M | 🟢 **-77%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.8M | ✅ | 22.1M | 🟢 **-38%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 74.2M | ✅ | 22.9M | 🟢 **-69%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 99.1M | ✅ | 15.4M | 🟢 **-85%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 76.1M | ✅ | 23.1M | 🟢 **-70%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 74.5M | ✅ | 10.9M | 🟢 **-85%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 47.6M | ✅ | 17.7M | 🟢 **-63%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 82.7M | ✅ | 27.0M | 🟢 **-67%** |
| oneOf.json | oneOf with required | 4 | ✅ | 49.9M | ✅ | 13.3M | 🟢 **-73%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 57.0M | ✅ | 18.5M | 🟢 **-68%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 81.6M | ✅ | 20.6M | 🟢 **-75%** |
| pattern.json | pattern validation | 8 | ✅ | 59.6M | ✅ | 38.7M | 🟢 **-35%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 27.6M | ✅ | 28.2M | +2% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.7M | ✅ | 14.3M | 🟢 **-42%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.6M | ✅ | 7.5M | 🟢 **-45%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ✅ | 8.5M | 🟢 **-44%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.2M | ✅ | 8.8M | 🟢 **-54%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 13.1M | ✅ | 21.3M | 🔴 **+62%** |
| properties.json | object properties validation | 6 | ✅ | 52.3M | ✅ | 40.6M | 🟢 **-22%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.6M | ✅ | 9.2M | 🟢 **-51%** |
| properties.json | properties with boolean schema | 4 | ✅ | 45.0M | ✅ | 33.0M | 🟢 **-27%** |
| properties.json | properties with escaped characters | 2 | ✅ | 46.0M | ✅ | 34.4M | 🟢 **-25%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 77.0M | ✅ | 61.8M | -20% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.6M | ✅ | 27.1M | 🟢 **-33%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.7M | ✅ | 15.0M | 🟢 **-24%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 104.7M | ✅ | 72.2M | 🟢 **-31%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 56.6M | ✅ | 20.7M | 🟢 **-63%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.7M | ✅ | 24.9M | 🟢 **-36%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.7M | ✅ | 26.8M | 🟢 **-34%** |
| ref.json | root pointer ref | 4 | ✅ | 24.3M | ✅ | 18.7M | 🟢 **-23%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 50.9M | ✅ | 34.0M | 🟢 **-33%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.1M | ✅ | 33.6M | 🟢 **-37%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ✅ | 32.3M | 🟢 **-25%** |
| ref.json | nested refs | 2 | ✅ | 32.7M | ✅ | 36.1M | +10% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 52.8M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 37.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 21.1M | ✅ | 4.9M | 🟢 **-77%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.3M | ✅ | 34.2M | 🟢 **-31%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 47.0M | ✅ | 35.3M | 🟢 **-25%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 99.2M | ✅ | 75.5M | 🟢 **-24%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 74.5M | ✅ | 31.6M | 🟢 **-58%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.7M | ✅ | 7.1M | -8% |
| ref.json | refs with quote | 2 | ✅ | 49.6M | ✅ | 34.3M | 🟢 **-31%** |
| ref.json | Location-independent identifier | 2 | ✅ | 40.3M | ✅ | 35.7M | -11% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 42.8M | ✅ | 36.3M | -15% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 35.2M | ✅ | 37.9M | +8% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 62.0M | ✅ | 12.6M | 🟢 **-80%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 29.0M | ✅ | 28.9M | 0% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 30.0M | ✅ | 28.7M | -5% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 47.0M | ✅ | 22.0M | 🟢 **-53%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 50.4M | ✅ | 33.7M | 🟢 **-33%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.4M | ✅ | 36.4M | 🟢 **-25%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.4M | ✅ | 34.5M | 🟢 **-27%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.5M | ✅ | 36.6M | -20% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.8M | ✅ | 36.8M | -20% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 34.0M | ✅ | 35.3M | +4% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 39.1M | ✅ | 36.3M | -7% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.3M | ✅ | 36.2M | 🟢 **-58%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 86.4M | ✅ | 35.9M | 🟢 **-58%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 33.1M | 🟢 **-57%** |
| refRemote.json | remote ref | 2 | ✅ | 36.0M | ✅ | 35.3M | -2% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 37.4M | ✅ | 36.2M | -3% |
| refRemote.json | ref within remote ref | 2 | ✅ | 37.0M | ✅ | 36.6M | -1% |
| refRemote.json | base URI change | 2 | ✅ | 28.7M | ✅ | 23.9M | -17% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.1M | ✅ | 25.5M | -12% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.3M | ✅ | 25.9M | 🟢 **-29%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 24.3M | ✅ | 10.2M | 🟢 **-58%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 34.9M | ✅ | 29.6M | -15% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 34.3M | ✅ | 32.0M | -7% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.2M | ✅ | 27.2M | 🟢 **-38%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 30.2M | ✅ | 36.6M | 🔴 **+21%** |
| required.json | required validation | 5 | ✅ | 65.3M | ✅ | 44.7M | 🟢 **-31%** |
| required.json | required default validation | 1 | ✅ | 98.7M | ✅ | 74.5M | 🟢 **-25%** |
| required.json | required with empty array | 1 | ✅ | 93.7M | ✅ | 75.6M | -19% |
| required.json | required with escaped characters | 2 | ✅ | 47.4M | ✅ | 30.1M | 🟢 **-36%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 70.7M | ✅ | 34.3M | 🟢 **-51%** |
| type.json | number type matches numbers | 9 | ✅ | 74.4M | ✅ | 34.4M | 🟢 **-54%** |
| type.json | string type matches strings | 9 | ✅ | 70.7M | ✅ | 38.2M | 🟢 **-46%** |
| type.json | object type matches objects | 7 | ✅ | 63.9M | ✅ | 33.8M | 🟢 **-47%** |
| type.json | array type matches arrays | 7 | ✅ | 68.1M | ✅ | 33.8M | 🟢 **-50%** |
| type.json | boolean type matches booleans | 10 | ✅ | 71.8M | ✅ | 36.3M | 🟢 **-49%** |
| type.json | null type matches only the null object | 10 | ✅ | 70.6M | ✅ | 28.1M | 🟢 **-60%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 70.0M | ✅ | 29.3M | 🟢 **-58%** |
| type.json | type as array with one item | 2 | ✅ | 84.9M | ✅ | 36.7M | 🟢 **-57%** |
| type.json | type: array or object | 5 | ✅ | 79.6M | ✅ | 34.2M | 🟢 **-57%** |
| type.json | type: array, object or null | 5 | ✅ | 81.8M | ✅ | 39.0M | 🟢 **-52%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ✅ | 10.0M | 🟢 **-41%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 36.1M | ✅ | 20.4M | 🟢 **-44%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 20.1M | ✅ | 23.5M | +17% |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 87.2M | ✅ | 56.1M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.2M | ✅ | 52.2M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 79.0M | ✅ | 42.2M | 🟢 **-47%** |
| optional/bignum.json | integer | 2 | ✅ | 94.2M | ✅ | 11.6M | 🟢 **-88%** |
| optional/bignum.json | number | 2 | ✅ | 98.7M | ✅ | 71.6M | 🟢 **-27%** |
| optional/bignum.json | string | 1 | ✅ | 73.6M | ✅ | 31.7M | 🟢 **-57%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 87.4M | ✅ | 67.0M | 🟢 **-23%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 66.8M | ✅ | 27.7M | 🟢 **-59%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 87.5M | ✅ | 69.1M | 🟢 **-21%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 66.4M | ✅ | 28.3M | 🟢 **-57%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 31.0M | ✅ | 24.0M | 🟢 **-22%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 40.2M | ✅ | 23.9M | 🟢 **-40%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.5M | ✅ | 24.1M | -15% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 20.8M | ✅ | 24.0M | +15% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.7M | ✅ | 22.4M | 🟢 **-25%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 16.9M | ✅ | 23.7M | 🔴 **+40%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 31.3M | ✅ | 22.7M | 🟢 **-27%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 31.0M | ✅ | 24.0M | 🟢 **-23%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 29.7M | ✅ | 27.3M | -8% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 33.0M | ✅ | 22.5M | 🟢 **-32%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 18.2M | ✅ | 17.1M | -6% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.5M | ✅ | 14.3M | -18% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.7M | ✅ | 14.3M | -14% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.8M | ✅ | 20.6M | 🟢 **-31%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.9M | ✅ | 19.8M | -14% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.6M | ✅ | 20.9M | -11% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.8M | ✅ | 18.5M | -2% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.9M | ✅ | 18.4M | +3% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 9.1M | +15% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ✅ | 8.8M | +1% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 28.1M | ✅ | 3.0M | 🟢 **-89%** |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.2M | ✅ | 19.0M | -1% |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.6M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 40.9M | ✅ | 26.0M | 🟢 **-36%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.5M | ✅ | 3.1M | 🟢 **-76%** |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 33.4M | ✅ | 23.3M | 🟢 **-30%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 98.5M | ✅ | 55.4M | 🟢 **-44%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.5M | ✅ | 9.3M | -12% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.8M | ✅ | 16.5M | -12% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.1M | ✅ | 4.4M | 🟢 **-37%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 31.7M | ✅ | 11.7M | 🟢 **-63%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 51.1M | ✅ | 9.6M | 🟢 **-81%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 50.5M | ✅ | 9.6M | 🟢 **-81%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 33.3M | ✅ | 24.1M | 🟢 **-28%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ✅ | 9.2M | 🟢 **-43%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 11.3M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 7.0M | -3% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.6M | ✅ | 34.4M | -6% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.7M | ✅ | 74.3M | 🟢 **-51%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 80.8M | ✅ | 49.7M | 🟢 **-39%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ✅ | 68.3M | 🟢 **-58%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 66.8M | -17% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.3M | ✅ | 8.3M | 🟢 **-85%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 43.3M | ✅ | 30.6M | 🟢 **-29%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 47.9M | 🟢 **-56%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 74.1M | -9% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.4M | ✅ | 33.4M | 🟢 **-28%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.4M | ✅ | 23.3M | +9% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 17.1M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.8M | ✅ | 13.7M | 🟢 **-63%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 70.3M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.0M | ✅ | 8.4M | 🟢 **-71%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 46.8M | 🟢 **-33%** |
| allOf.json | allOf | 4 | ✅ | 40.4M | ✅ | 33.0M | -18% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 25.7M | -16% |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 40.5M | 🟢 **-44%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 74.4M | 🟢 **-51%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 37.3M | 🟢 **-44%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 30.9M | 🟢 **-67%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 80.9M | ✅ | 43.2M | 🟢 **-47%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 70.1M | 🟢 **-54%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 49.7M | 🟢 **-36%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 37.7M | 🟢 **-68%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 48.4M | 🟢 **-39%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 10.1M | 🟢 **-88%** |
| anyOf.json | anyOf | 4 | ✅ | 82.3M | ✅ | 24.3M | 🟢 **-70%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.0M | ✅ | 18.4M | 🟢 **-60%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 89.9M | ✅ | 74.7M | -17% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.7M | ✅ | 74.6M | 🟢 **-51%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 20.0M | 🟢 **-70%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 72.0M | ✅ | 32.8M | 🟢 **-54%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 69.1M | -18% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 27.6M | 🟢 **-77%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.7M | ✅ | 48.6M | 🟢 **-39%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ✅ | 31.9M | 🟢 **-65%** |
| const.json | const validation | 3 | ✅ | 67.2M | ✅ | 38.5M | 🟢 **-43%** |
| const.json | const with object | 4 | ✅ | 49.8M | ✅ | 15.2M | 🟢 **-70%** |
| const.json | const with array | 3 | ✅ | 58.4M | ✅ | 16.7M | 🟢 **-71%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 40.5M | 🟢 **-66%** |
| const.json | const with false does not match 0 | 3 | ✅ | 76.1M | ✅ | 39.9M | 🟢 **-48%** |
| const.json | const with true does not match 1 | 3 | ✅ | 111.8M | ✅ | 39.7M | 🟢 **-64%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.3M | ✅ | 26.4M | 🟢 **-60%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 94.3M | ✅ | 26.3M | 🟢 **-72%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.5M | ✅ | 12.2M | 🟢 **-82%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.8M | ✅ | 12.7M | 🟢 **-87%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ✅ | 26.2M | 🟢 **-58%** |
| const.json | const with 1 does not match true | 3 | ✅ | 106.3M | ✅ | 44.2M | 🟢 **-58%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.8M | ✅ | 27.8M | 🟢 **-62%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 103.2M | ✅ | 41.7M | 🟢 **-60%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 44.7M | 🟢 **-31%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 45.1M | 🟢 **-43%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.2M | ✅ | 46.4M | -14% |
| contains.json | contains keyword validation | 6 | ✅ | 89.5M | ✅ | 8.3M | 🟢 **-91%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.8M | ✅ | 13.3M | 🟢 **-78%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.7M | ✅ | 46.3M | 🟢 **-56%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 71.9M | ✅ | 28.5M | 🟢 **-60%** |
| contains.json | items + contains | 4 | ✅ | 51.2M | ✅ | 4.0M | 🟢 **-92%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ✅ | 46.7M | 🟢 **-32%** |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ✅ | 66.0M | 🟢 **-47%** |
| default.json | invalid type for default | 2 | ✅ | 71.1M | ✅ | 45.4M | 🟢 **-36%** |
| default.json | invalid string value for default | 2 | ✅ | 74.5M | ✅ | 45.9M | 🟢 **-38%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.2M | ✅ | 43.5M | -4% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.6M | ✅ | 1.3M | 🟢 **-90%** |
| dependencies.json | dependencies | 7 | ✅ | 62.5M | ✅ | 48.8M | 🟢 **-22%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 59.9M | 🟢 **-38%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.6M | ✅ | 35.6M | +6% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.4M | ✅ | 37.8M | -19% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 60.7M | ✅ | 39.5M | 🟢 **-35%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.8M | ✅ | 22.4M | +19% |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 19.6M | ✅ | 38.1M | 🔴 **+94%** |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 51.2M | 🟢 **-32%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.3M | ✅ | 11.4M | 🟢 **-75%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.5M | ✅ | 48.4M | 🟢 **-35%** |
| enum.json | enums in properties | 6 | ✅ | 14.4M | ✅ | 36.3M | 🔴 **+152%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.4M | ✅ | 45.3M | 🟢 **-44%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.7M | ✅ | 39.4M | 🟢 **-48%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 64.7M | ✅ | 21.2M | 🟢 **-67%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.3M | ✅ | 39.3M | 🟢 **-48%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 56.4M | ✅ | 20.9M | 🟢 **-63%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.5M | ✅ | 43.6M | 🟢 **-41%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.5M | ✅ | 21.3M | 🟢 **-69%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.7M | ✅ | 43.6M | 🟢 **-41%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 22.5M | 🟢 **-67%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.4M | ✅ | 46.3M | 🟢 **-28%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 70.9M | ✅ | 42.1M | 🟢 **-41%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 63.3M | ✅ | 41.4M | 🟢 **-35%** |
| format.json | email format | 6 | ✅ | 92.5M | ✅ | 55.7M | 🟢 **-40%** |
| format.json | idn-email format | 6 | ✅ | 92.2M | ✅ | 55.0M | 🟢 **-40%** |
| format.json | regex format | 6 | ✅ | 91.9M | ✅ | 54.6M | 🟢 **-41%** |
| format.json | ipv4 format | 6 | ✅ | 86.6M | ✅ | 54.4M | 🟢 **-37%** |
| format.json | ipv6 format | 6 | ✅ | 83.8M | ✅ | 55.3M | 🟢 **-34%** |
| format.json | idn-hostname format | 6 | ✅ | 80.1M | ✅ | 55.5M | 🟢 **-31%** |
| format.json | hostname format | 6 | ✅ | 86.9M | ✅ | 53.3M | 🟢 **-39%** |
| format.json | date format | 6 | ✅ | 89.1M | ✅ | 56.7M | 🟢 **-36%** |
| format.json | date-time format | 6 | ✅ | 83.6M | ✅ | 55.7M | 🟢 **-33%** |
| format.json | time format | 6 | ✅ | 89.8M | ✅ | 54.8M | 🟢 **-39%** |
| format.json | json-pointer format | 6 | ✅ | 83.6M | ✅ | 55.6M | 🟢 **-33%** |
| format.json | relative-json-pointer format | 6 | ✅ | 83.8M | ✅ | 50.3M | 🟢 **-40%** |
| format.json | iri format | 6 | ✅ | 89.6M | ✅ | 55.7M | 🟢 **-38%** |
| format.json | iri-reference format | 6 | ✅ | 90.1M | ✅ | 55.3M | 🟢 **-39%** |
| format.json | uri format | 6 | ✅ | 84.5M | ✅ | 55.6M | 🟢 **-34%** |
| format.json | uri-reference format | 6 | ✅ | 92.9M | ✅ | 61.1M | 🟢 **-34%** |
| format.json | uri-template format | 6 | ✅ | 92.9M | ✅ | 44.1M | 🟢 **-53%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 93.9M | ✅ | 68.2M | 🟢 **-27%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.9M | ✅ | 69.0M | 🟢 **-27%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.1M | ✅ | 64.6M | 🟢 **-23%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.4M | ✅ | 43.4M | 🟢 **-44%** |
| if-then-else.json | if and else without then | 3 | ✅ | 71.3M | ✅ | 38.7M | 🟢 **-46%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ✅ | 37.6M | 🟢 **-48%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 68.4M | -19% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 75.1M | ✅ | 45.6M | 🟢 **-39%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ✅ | 46.3M | 🟢 **-38%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.5M | ✅ | 32.0M | 🟢 **-21%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.3M | ✅ | 28.8M | 🟢 **-35%** |
| items.json | a schema given for items | 4 | ✅ | 53.6M | ✅ | 43.0M | -20% |
| items.json | an array of schemas for items | 6 | ✅ | 66.8M | ✅ | 50.4M | 🟢 **-24%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 69.0M | 🟢 **-26%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 84.0M | ✅ | 43.5M | 🟢 **-48%** |
| items.json | items with boolean schemas | 3 | ✅ | 65.7M | ✅ | 44.2M | 🟢 **-33%** |
| items.json | items and subitems | 6 | ✅ | 12.9M | ✅ | 22.5M | 🔴 **+74%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 11.7M | -3% |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 67.1M | -11% |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 68.2M | -16% |
| maxItems.json | maxItems validation | 4 | ✅ | 78.8M | ✅ | 48.2M | 🟢 **-39%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 47.0M | 🟢 **-35%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.2M | ✅ | 46.8M | 🟢 **-21%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.5M | ✅ | 43.6M | -18% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.8M | ✅ | 42.8M | 🟢 **-26%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.9M | ✅ | 34.9M | 🟢 **-30%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.2M | ✅ | 35.3M | 🟢 **-31%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 34.5M | 🟢 **-55%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ✅ | 47.9M | 🟢 **-37%** |
| minItems.json | minItems validation | 4 | ✅ | 78.7M | ✅ | 47.7M | 🟢 **-39%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 46.8M | 🟢 **-36%** |
| minLength.json | minLength validation | 5 | ✅ | 57.8M | ✅ | 44.2M | 🟢 **-24%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.6M | ✅ | 43.7M | 🟢 **-23%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.5M | ✅ | 42.5M | 🟢 **-29%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.5M | ✅ | 35.4M | 🟢 **-30%** |
| minimum.json | minimum validation | 4 | ✅ | 76.8M | ✅ | 46.7M | 🟢 **-39%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 48.9M | 🟢 **-32%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 42.8M | 🟢 **-45%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 42.8M | 🟢 **-42%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 41.1M | 🟢 **-38%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 8.9M | 🟢 **-85%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 8.6M | 🟢 **-89%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 43.4M | 🟢 **-44%** |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 37.8M | 🟢 **-47%** |
| not.json | not more complex schema | 3 | ✅ | 69.0M | ✅ | 37.4M | 🟢 **-46%** |
| not.json | forbidden property | 2 | ✅ | 52.8M | ✅ | 44.0M | -17% |
| not.json | forbid everything with empty schema | 9 | ✅ | 59.8M | ✅ | 39.4M | 🟢 **-34%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 65.2M | ✅ | 39.2M | 🟢 **-40%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.3M | ✅ | 54.8M | 🟢 **-39%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 73.5M | -18% |
| oneOf.json | oneOf | 4 | ✅ | 74.3M | ✅ | 20.8M | 🟢 **-72%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.6M | ✅ | 26.4M | -19% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.0M | ✅ | 36.9M | 🟢 **-44%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 26.2M | 🟢 **-71%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 36.4M | 🟢 **-45%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 18.2M | 🟢 **-72%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.7M | ✅ | 25.7M | 🟢 **-42%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 75.4M | ✅ | 39.5M | 🟢 **-48%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.4M | ✅ | 16.7M | 🟢 **-65%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.7M | ✅ | 22.7M | 🟢 **-54%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 28.1M | 🟢 **-63%** |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ✅ | 38.6M | 🟢 **-32%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.6M | ✅ | 31.1M | 🔴 **+113%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.2M | ✅ | 14.1M | 🟢 **-48%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ✅ | 7.1M | 🟢 **-53%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 8.0M | 🟢 **-49%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.9M | ✅ | 8.6M | 🟢 **-59%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 21.7M | +20% |
| properties.json | object properties validation | 6 | ✅ | 56.1M | ✅ | 45.2M | -20% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 9.2M | 🟢 **-53%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.0M | ✅ | 40.4M | -18% |
| properties.json | properties with escaped characters | 2 | ✅ | 51.7M | ✅ | 43.6M | -16% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 60.8M | -13% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.2M | ✅ | 30.4M | 🟢 **-24%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.7M | ✅ | 13.9M | 🟢 **-30%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 51.9M | 🟢 **-45%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.9M | ✅ | 29.2M | 🟢 **-43%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.5M | ✅ | 32.3M | 🟢 **-20%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ✅ | 34.0M | 🟢 **-21%** |
| ref.json | root pointer ref | 4 | ✅ | 26.1M | ✅ | 19.8M | 🟢 **-24%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.7M | ✅ | 42.8M | -19% |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.0M | ✅ | 45.1M | 🟢 **-24%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.2M | ✅ | 39.2M | -17% |
| ref.json | nested refs | 2 | ✅ | 41.4M | ✅ | 49.2M | +19% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.7M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.6M | ✅ | 4.1M | 🟢 **-83%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.0M | ✅ | 43.8M | -16% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.5M | ✅ | 43.9M | -19% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 70.6M | 🟢 **-21%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 40.6M | 🟢 **-39%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 7.5M | -11% |
| ref.json | refs with quote | 2 | ✅ | 54.1M | ✅ | 44.8M | -17% |
| ref.json | Location-independent identifier | 2 | ✅ | 49.4M | ✅ | 47.7M | -3% |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 50.9M | ✅ | 48.9M | -4% |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 48.7M | ✅ | 48.5M | 0% |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 14.2M | 🟢 **-75%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.2M | ✅ | 32.2M | 0% |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.1M | ✅ | 32.2M | -6% |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.2M | ✅ | 49.3M | -2% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ✅ | 21.3M | 🟢 **-51%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.5M | ✅ | 43.3M | 🟢 **-21%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.9M | ✅ | 43.8M | -19% |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.8M | ✅ | 43.5M | -11% |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.4M | ✅ | 42.9M | -13% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.9M | ✅ | 43.7M | -11% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.3M | ✅ | 43.0M | -1% |
| ref.json | ref to if | 2 | ✅ | 51.2M | ✅ | 48.2M | -6% |
| ref.json | ref to then | 2 | ✅ | 51.6M | ✅ | 48.9M | -5% |
| ref.json | ref to else | 2 | ✅ | 49.6M | ✅ | 47.0M | -5% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.2M | ✅ | 50.0M | -2% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 48.3M | 🟢 **-37%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 50.0M | 🟢 **-35%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 50.0M | 🟢 **-29%** |
| refRemote.json | remote ref | 2 | ✅ | 46.0M | ✅ | 49.4M | +7% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.3M | ✅ | 46.7M | -3% |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.1M | ✅ | 48.9M | +2% |
| refRemote.json | base URI change | 2 | ✅ | 29.0M | ✅ | 28.1M | -3% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.1M | ✅ | 27.7M | -14% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ✅ | 26.6M | 🟢 **-32%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.1M | ✅ | 13.2M | 🟢 **-60%** |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.1M | ✅ | 36.3M | -18% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 42.3M | ✅ | 42.0M | -1% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.3M | ✅ | 29.6M | 🟢 **-36%** |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.7M | ✅ | 42.2M | +9% |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 48.4M | 🟢 **-25%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 68.8M | 🟢 **-23%** |
| required.json | required with empty array | 1 | ✅ | 89.3M | ✅ | 74.5M | -17% |
| required.json | required with escaped characters | 2 | ✅ | 53.8M | ✅ | 38.4M | 🟢 **-29%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 67.2M | ✅ | 40.9M | 🟢 **-39%** |
| type.json | number type matches numbers | 9 | ✅ | 69.4M | ✅ | 40.4M | 🟢 **-42%** |
| type.json | string type matches strings | 9 | ✅ | 69.2M | ✅ | 46.3M | 🟢 **-33%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 40.0M | 🟢 **-32%** |
| type.json | array type matches arrays | 7 | ✅ | 63.0M | ✅ | 40.7M | 🟢 **-35%** |
| type.json | boolean type matches booleans | 10 | ✅ | 64.8M | ✅ | 44.3M | 🟢 **-32%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.9M | ✅ | 41.5M | 🟢 **-37%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.4M | ✅ | 38.5M | 🟢 **-42%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 49.6M | 🟢 **-36%** |
| type.json | type: array or object | 5 | ✅ | 72.3M | ✅ | 38.7M | 🟢 **-46%** |
| type.json | type: array, object or null | 5 | ✅ | 77.1M | ✅ | 44.4M | 🟢 **-42%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ✅ | 10.3M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.9M | ✅ | 21.0M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 25.9M | 🔴 **+38%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.2M | ✅ | 54.3M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 54.4M | 🟢 **-24%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.4M | ✅ | 49.4M | 🟢 **-26%** |
| optional/bignum.json | integer | 2 | ✅ | 88.4M | ✅ | 14.1M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 64.3M | 🟢 **-28%** |
| optional/bignum.json | string | 1 | ✅ | 63.4M | ✅ | 39.7M | 🟢 **-37%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 68.3M | -14% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 38.5M | 🟢 **-36%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 68.1M | -14% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 38.1M | 🟢 **-36%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 348K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 21.3M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 429K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.4M | ✅ | 27.6M | -6% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.8M | ✅ | 27.6M | 🔴 **+39%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 19.7M | ✅ | 27.8M | 🔴 **+41%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 27.7M | -2% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 25.0M | -13% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 29.1M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.9M | ✅ | 27.0M | +0% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ✅ | 27.7M | -2% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.3M | ✅ | 28.9M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 26.8M | -12% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ✅ | 17.6M | +4% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ✅ | 13.2M | -11% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.8M | ✅ | 14.3M | -15% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.0M | ✅ | 26.6M | -8% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.5M | ✅ | 23.2M | +13% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.4M | ✅ | 22.9M | -2% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 20.8M | +1% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.1M | ✅ | 21.8M | +9% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 9.3M | +17% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 8.3M | -4% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.2M | ✅ | 8.1M | -1% |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ✅ | 21.4M | +14% |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.8M | ✅ | 31.0M | 🟢 **-20%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ✅ | 2.8M | 🟢 **-77%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.7M | ✅ | 25.2M | 🟢 **-23%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.0M | ✅ | 907K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.4M | ✅ | 30.1M | 🟢 **-27%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ✅ | 5.8M | -13% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 92.5M | ✅ | 55.2M | 🟢 **-40%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.0M | ✅ | 9.3M | -7% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.2M | ✅ | 15.6M | -4% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ✅ | 4.2M | 🟢 **-33%** |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 32.7M | ✅ | 14.8M | 🟢 **-55%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 50.1M | ✅ | 34.7M | 🟢 **-31%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 59.5M | ✅ | 35.9M | 🟢 **-40%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 24.1M | ✅ | 27.0M | +12% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.2M | ✅ | 8.2M | 🟢 **-52%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.0M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 32.5M | ✅ | 12.2M | 🟢 **-62%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.7M | ✅ | 11.7M | 🟢 **-68%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 167.4M | ✅ | 73.1M | 🟢 **-56%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 78.5M | ✅ | 50.0M | 🟢 **-36%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 178.9M | ✅ | 63.7M | 🟢 **-64%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 87.6M | ✅ | 66.7M | 🟢 **-24%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 39.0M | ✅ | 23.7M | 🟢 **-39%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.8M | ✅ | 34.0M | -13% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 112.8M | ✅ | 46.0M | 🟢 **-59%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 88.6M | ✅ | 43.0M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 44.2M | ✅ | 33.1M | 🟢 **-25%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.7M | ✅ | 21.7M | 0% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 40.4M | ✅ | 17.1M | 🟢 **-58%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.0M | ✅ | 12.5M | 🟢 **-62%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 163.8M | ✅ | 73.3M | 🟢 **-55%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.3M | ✅ | 4.2M | 🟢 **-83%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 73.3M | ✅ | 46.3M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.7M | ✅ | 9.9M | 🟢 **-61%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 25.5M | ✅ | 30.1M | +18% |
| allOf.json | allOf | 4 | ✅ | 36.3M | ✅ | 32.4M | -11% |
| allOf.json | allOf with base schema | 5 | ✅ | 27.7M | ✅ | 25.5M | -8% |
| allOf.json | allOf simple types | 2 | ✅ | 82.4M | ✅ | 43.4M | 🟢 **-47%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 166.6M | ✅ | 74.0M | 🟢 **-56%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 75.2M | ✅ | 36.0M | 🟢 **-52%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 102.1M | ✅ | 38.1M | 🟢 **-63%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 88.9M | ✅ | 73.2M | -18% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 167.1M | ✅ | 73.3M | 🟢 **-56%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 85.4M | ✅ | 48.7M | 🟢 **-43%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 127.1M | ✅ | 46.8M | 🟢 **-63%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 87.0M | ✅ | 32.4M | 🟢 **-63%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.4M | ✅ | 9.7M | 🟢 **-89%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 85.0M | ✅ | 48.6M | 🟢 **-43%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 71.1M | ✅ | 48.3M | 🟢 **-32%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 36.1M | ✅ | 48.5M | 🔴 **+35%** |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 83.8M | ✅ | 48.9M | 🟢 **-42%** |
| anyOf.json | anyOf | 4 | ✅ | 86.8M | ✅ | 24.7M | 🟢 **-72%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.9M | ✅ | 19.7M | 🟢 **-49%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 99.1M | ✅ | 73.3M | 🟢 **-26%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 100.3M | ✅ | 72.4M | 🟢 **-28%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 76.1M | ✅ | 20.2M | 🟢 **-73%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.6M | ✅ | 20.0M | 🟢 **-61%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 89.5M | ✅ | 55.6M | 🟢 **-38%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 59.3M | ✅ | 20.6M | 🟢 **-65%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 93.5M | ✅ | 55.2M | 🟢 **-41%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 71.0M | ✅ | 39.3M | 🟢 **-45%** |
| const.json | const validation | 3 | ✅ | 65.0M | ✅ | 40.7M | 🟢 **-37%** |
| const.json | const with object | 4 | ✅ | 42.9M | ✅ | 15.3M | 🟢 **-64%** |
| const.json | const with array | 3 | ✅ | 56.5M | ✅ | 13.7M | 🟢 **-76%** |
| const.json | const with null | 2 | ✅ | 87.7M | ✅ | 48.4M | 🟢 **-45%** |
| const.json | const with false does not match 0 | 3 | ✅ | 82.2M | ✅ | 39.8M | 🟢 **-52%** |
| const.json | const with true does not match 1 | 3 | ✅ | 79.0M | ✅ | 38.4M | 🟢 **-51%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 70.3M | ✅ | 24.8M | 🟢 **-65%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 72.4M | ✅ | 24.1M | 🟢 **-67%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 71.6M | ✅ | 12.8M | 🟢 **-82%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 64.7M | ✅ | 12.7M | 🟢 **-80%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 71.1M | ✅ | 43.2M | 🟢 **-39%** |
| const.json | const with 1 does not match true | 3 | ✅ | 82.4M | ✅ | 44.0M | 🟢 **-47%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.5M | ✅ | 45.4M | 🟢 **-37%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 79.2M | ✅ | 43.2M | 🟢 **-45%** |
| const.json | nul characters in strings | 2 | ✅ | 71.3M | ✅ | 46.8M | 🟢 **-34%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 64.5M | ✅ | 39.3M | 🟢 **-39%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 73.1M | ✅ | 46.9M | 🟢 **-36%** |
| contains.json | contains keyword validation | 6 | ✅ | 71.1M | ✅ | 18.2M | 🟢 **-74%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 69.4M | ✅ | 10.2M | 🟢 **-85%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 89.7M | ✅ | 43.2M | 🟢 **-52%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 79.9M | ✅ | 28.7M | 🟢 **-64%** |
| contains.json | items + contains | 4 | ✅ | 38.4M | ✅ | 6.9M | 🟢 **-82%** |
| contains.json | contains with false if subschema | 2 | ✅ | 75.9M | ✅ | 47.2M | 🟢 **-38%** |
| contains.json | contains with null instance elements | 1 | ✅ | 87.9M | ✅ | 65.9M | 🟢 **-25%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 101.4M | ✅ | 65.3M | 🟢 **-36%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 105.2M | ✅ | 65.0M | 🟢 **-38%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 79.0M | ✅ | 51.4M | 🟢 **-35%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 77.3M | ✅ | 53.2M | 🟢 **-31%** |
| default.json | invalid type for default | 2 | ✅ | 78.1M | ✅ | 58.0M | 🟢 **-26%** |
| default.json | invalid string value for default | 2 | ✅ | 56.7M | ✅ | 49.4M | -13% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.5M | ✅ | 44.1M | -14% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.7M | ✅ | 750K | 🟢 **-55%** |
| dependentRequired.json | single dependency | 7 | ✅ | 63.6M | ✅ | 49.5M | 🟢 **-22%** |
| dependentRequired.json | empty dependents | 3 | ✅ | 100.7M | ✅ | 64.8M | 🟢 **-36%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.5M | ✅ | 33.6M | 🔴 **+27%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 43.1M | ✅ | 36.5M | -15% |
| dependentSchemas.json | single dependency | 8 | ✅ | 50.0M | ✅ | 43.0M | -14% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 62.8M | ✅ | 40.9M | 🟢 **-35%** |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 36.0M | ✅ | 31.2M | -13% |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 34.5M | ✅ | 36.3M | +5% |
| enum.json | simple enum validation | 2 | ✅ | 82.5M | ✅ | 49.7M | 🟢 **-40%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 51.0M | ✅ | 11.4M | 🟢 **-78%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 81.6M | ✅ | 45.1M | 🟢 **-45%** |
| enum.json | enums in properties | 6 | ✅ | 14.6M | ✅ | 31.8M | 🔴 **+118%** |
| enum.json | enum with escaped characters | 3 | ✅ | 88.3M | ✅ | 45.4M | 🟢 **-49%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 79.1M | ✅ | 39.5M | 🟢 **-50%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 70.1M | ✅ | 21.1M | 🟢 **-70%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 81.8M | ✅ | 38.9M | 🟢 **-52%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 72.4M | ✅ | 20.7M | 🟢 **-71%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 84.9M | ✅ | 45.0M | 🟢 **-47%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 75.1M | ✅ | 22.7M | 🟢 **-70%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 83.3M | ✅ | 43.8M | 🟢 **-47%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 73.9M | ✅ | 22.4M | 🟢 **-70%** |
| enum.json | nul characters in strings | 2 | ✅ | 72.4M | ✅ | 45.5M | 🟢 **-37%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.3M | ✅ | 36.0M | 🟢 **-47%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 79.7M | ✅ | 41.3M | 🟢 **-48%** |
| format.json | email format | 6 | ✅ | 104.7M | ✅ | 54.3M | 🟢 **-48%** |
| format.json | idn-email format | 6 | ✅ | 102.4M | ✅ | 55.2M | 🟢 **-46%** |
| format.json | regex format | 6 | ✅ | 90.8M | ✅ | 54.8M | 🟢 **-40%** |
| format.json | ipv4 format | 6 | ✅ | 90.6M | ✅ | 55.1M | 🟢 **-39%** |
| format.json | ipv6 format | 6 | ✅ | 89.6M | ✅ | 55.3M | 🟢 **-38%** |
| format.json | idn-hostname format | 6 | ✅ | 89.8M | ✅ | 55.2M | 🟢 **-39%** |
| format.json | hostname format | 6 | ✅ | 91.2M | ✅ | 55.1M | 🟢 **-40%** |
| format.json | date format | 6 | ✅ | 90.1M | ✅ | 54.7M | 🟢 **-39%** |
| format.json | date-time format | 6 | ✅ | 90.7M | ✅ | 54.5M | 🟢 **-40%** |
| format.json | time format | 6 | ✅ | 90.5M | ✅ | 55.2M | 🟢 **-39%** |
| format.json | json-pointer format | 6 | ✅ | 90.9M | ✅ | 55.1M | 🟢 **-39%** |
| format.json | relative-json-pointer format | 6 | ✅ | 92.6M | ✅ | 55.2M | 🟢 **-40%** |
| format.json | iri format | 6 | ✅ | 90.9M | ✅ | 54.0M | 🟢 **-41%** |
| format.json | iri-reference format | 6 | ✅ | 90.2M | ✅ | 53.2M | 🟢 **-41%** |
| format.json | uri format | 6 | ✅ | 90.0M | ✅ | 55.4M | 🟢 **-38%** |
| format.json | uri-reference format | 6 | ✅ | 91.1M | ✅ | 55.1M | 🟢 **-40%** |
| format.json | uri-template format | 6 | ✅ | 90.6M | ✅ | 55.0M | 🟢 **-39%** |
| format.json | uuid format | 6 | ✅ | 89.6M | ✅ | 54.9M | 🟢 **-39%** |
| format.json | duration format | 6 | ✅ | 90.0M | ✅ | 55.2M | 🟢 **-39%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 92.2M | ✅ | 68.5M | 🟢 **-26%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 92.7M | ✅ | 68.3M | 🟢 **-26%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 93.2M | ✅ | 67.7M | 🟢 **-27%** |
| if-then-else.json | if and then without else | 3 | ✅ | 85.8M | ✅ | 43.0M | 🟢 **-50%** |
| if-then-else.json | if and else without then | 3 | ✅ | 85.7M | ✅ | 37.5M | 🟢 **-56%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 80.7M | ✅ | 36.4M | 🟢 **-55%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 93.0M | ✅ | 68.6M | 🟢 **-26%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 80.7M | ✅ | 48.7M | 🟢 **-40%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 83.2M | ✅ | 49.7M | 🟢 **-40%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 46.4M | ✅ | 31.0M | 🟢 **-33%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 41.8M | ✅ | 29.9M | 🟢 **-28%** |
| items.json | a schema given for items | 4 | ✅ | 54.2M | ✅ | 41.7M | 🟢 **-23%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.7M | ✅ | 49.7M | 🟢 **-24%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 104.0M | ✅ | 68.5M | 🟢 **-34%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 78.0M | ✅ | 43.7M | 🟢 **-44%** |
| items.json | items with boolean schemas | 3 | ✅ | 58.9M | ✅ | 47.4M | -20% |
| items.json | items and subitems | 6 | ✅ | 14.7M | ✅ | 21.1M | 🔴 **+44%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 11.9M | 0% |
| items.json | single-form items with null instance ... | 1 | ✅ | 84.5M | ✅ | 66.4M | 🟢 **-21%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 88.1M | ✅ | 67.9M | 🟢 **-23%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 105.1M | ✅ | 68.4M | 🟢 **-35%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 70.2M | ✅ | 27.8M | 🟢 **-60%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 73.4M | ✅ | 44.9M | 🟢 **-39%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 67.0M | ✅ | 35.0M | 🟢 **-48%** |
| maxItems.json | maxItems validation | 4 | ✅ | 89.3M | ✅ | 46.2M | 🟢 **-48%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 78.3M | ✅ | 47.4M | 🟢 **-39%** |
| maxLength.json | maxLength validation | 5 | ✅ | 65.5M | ✅ | 46.2M | 🟢 **-29%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 61.6M | ✅ | 43.2M | 🟢 **-30%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 62.3M | ✅ | 42.5M | 🟢 **-32%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 53.1M | ✅ | 35.1M | 🟢 **-34%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 54.9M | ✅ | 34.9M | 🟢 **-36%** |
| maximum.json | maximum validation | 4 | ✅ | 85.0M | ✅ | 47.2M | 🟢 **-45%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 85.4M | ✅ | 47.0M | 🟢 **-45%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 103.5M | ✅ | 68.1M | 🟢 **-34%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 79.3M | ✅ | 35.7M | 🟢 **-55%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 67.8M | ✅ | 28.6M | 🟢 **-58%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 74.3M | ✅ | 44.4M | 🟢 **-40%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 67.3M | ✅ | 38.2M | 🟢 **-43%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 65.7M | ✅ | 34.7M | 🟢 **-47%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 104.4M | ✅ | 67.8M | 🟢 **-35%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 80.5M | ✅ | 42.5M | 🟢 **-47%** |
| minItems.json | minItems validation | 4 | ✅ | 86.7M | ✅ | 47.9M | 🟢 **-45%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 82.2M | ✅ | 46.6M | 🟢 **-43%** |
| minLength.json | minLength validation | 5 | ✅ | 65.0M | ✅ | 44.2M | 🟢 **-32%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 62.3M | ✅ | 43.8M | 🟢 **-30%** |
| minProperties.json | minProperties validation | 6 | ✅ | 63.8M | ✅ | 42.6M | 🟢 **-33%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 52.9M | ✅ | 32.6M | 🟢 **-38%** |
| minimum.json | minimum validation | 4 | ✅ | 85.3M | ✅ | 47.3M | 🟢 **-45%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 80.6M | ✅ | 48.4M | 🟢 **-40%** |
| multipleOf.json | by int | 3 | ✅ | 86.3M | ✅ | 42.6M | 🟢 **-51%** |
| multipleOf.json | by number | 3 | ✅ | 80.6M | ✅ | 39.1M | 🟢 **-52%** |
| multipleOf.json | by small number | 2 | ✅ | 73.8M | ✅ | 39.8M | 🟢 **-46%** |
| multipleOf.json | float division = inf | 1 | ✅ | 64.0M | ✅ | 8.5M | 🟢 **-87%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 79.6M | ✅ | 9.0M | 🟢 **-89%** |
| not.json | not | 2 | ✅ | 83.9M | ✅ | 43.2M | 🟢 **-49%** |
| not.json | not multiple types | 3 | ✅ | 79.1M | ✅ | 37.6M | 🟢 **-52%** |
| not.json | not more complex schema | 3 | ✅ | 75.8M | ✅ | 39.5M | 🟢 **-48%** |
| not.json | forbidden property | 2 | ✅ | 46.0M | ✅ | 43.6M | -5% |
| not.json | forbid everything with empty schema | 9 | ✅ | 71.3M | ✅ | 29.5M | 🟢 **-59%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 70.7M | ✅ | 32.2M | 🟢 **-54%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 95.1M | ✅ | 55.4M | 🟢 **-42%** |
| not.json | double negation | 1 | ✅ | 98.4M | ✅ | 72.9M | 🟢 **-26%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 35.5M | ✅ | 24.3M | 🟢 **-32%** |
| oneOf.json | oneOf | 4 | ✅ | 70.7M | ✅ | 22.0M | 🟢 **-69%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.4M | ✅ | 25.0M | 🟢 **-31%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 75.3M | ✅ | 36.9M | 🟢 **-51%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 99.7M | ✅ | 24.5M | 🟢 **-75%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 98.6M | ✅ | 37.0M | 🟢 **-62%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 76.1M | ✅ | 18.6M | 🟢 **-76%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 47.4M | ✅ | 18.8M | 🟢 **-60%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 82.8M | ✅ | 36.6M | 🟢 **-56%** |
| oneOf.json | oneOf with required | 4 | ✅ | 52.1M | ✅ | 17.0M | 🟢 **-67%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 56.3M | ✅ | 20.0M | 🟢 **-64%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 83.6M | ✅ | 28.2M | 🟢 **-66%** |
| pattern.json | pattern validation | 8 | ✅ | 60.3M | ✅ | 44.6M | 🟢 **-26%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 15.1M | ✅ | 31.1M | 🔴 **+106%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.5M | ✅ | 10.5M | 🟢 **-60%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ✅ | 6.2M | 🟢 **-57%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.1M | ✅ | 8.0M | 🟢 **-47%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.2M | ✅ | 5.7M | 🟢 **-70%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 20.1M | ✅ | 17.9M | -11% |
| properties.json | object properties validation | 6 | ✅ | 54.2M | ✅ | 44.4M | -18% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.9M | ✅ | 10.0M | 🟢 **-47%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.1M | ✅ | 40.8M | -8% |
| properties.json | properties with escaped characters | 2 | ✅ | 45.9M | ✅ | 43.8M | -5% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 78.8M | ✅ | 60.8M | 🟢 **-23%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.2M | ✅ | 28.5M | 🟢 **-29%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 14.5M | 🟢 **-24%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 101.9M | ✅ | 65.8M | 🟢 **-35%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 53.6M | ✅ | 29.0M | 🟢 **-46%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.8M | ✅ | 32.3M | -17% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.5M | ✅ | 34.2M | -16% |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 12.1M | ✅ | 20.0M | 🔴 **+65%** |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.8M | ✅ | 1.9M | 🟢 **-67%** |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.7M | ✅ | 2.6M | -4% |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 10.1M | ✅ | 2.6M | 🟢 **-74%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 10.9M | ✅ | 1.9M | 🟢 **-83%** |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.4M | ✅ | 1.4M | 🟢 **-82%** |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ✅ | 4.0M | -2% |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ✅ | 3.5M | -15% |
| ref.json | root pointer ref | 4 | ✅ | 24.3M | ✅ | 20.0M | -18% |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.7M | ✅ | 43.6M | -10% |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.7M | ✅ | 45.5M | -9% |
| ref.json | escaped pointer ref | 6 | ✅ | 43.1M | ✅ | 40.0M | -7% |
| ref.json | nested refs | 2 | ✅ | 29.8M | ✅ | 48.3M | 🔴 **+62%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 39.8M | ✅ | 37.6M | -6% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 2.7M | ✅ | 2.4M | -12% |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.7M | ✅ | 43.7M | -8% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.2M | ✅ | 40.0M | -13% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 99.3M | ✅ | 73.9M | 🟢 **-26%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 74.3M | ✅ | 41.0M | 🟢 **-45%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.0M | ✅ | 7.2M | -11% |
| ref.json | refs with quote | 2 | ✅ | 48.6M | ✅ | 44.3M | -9% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 23.4M | ✅ | 33.7M | 🔴 **+44%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 62.5M | ✅ | 14.5M | 🟢 **-77%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 29.3M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 28.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 35.6M | ✅ | 49.4M | 🔴 **+39%** |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 42.2M | ✅ | 47.0M | +11% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 82.9M | ✅ | 48.2M | 🟢 **-42%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 31.1M | ✅ | 42.4M | 🔴 **+36%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 47.3M | ✅ | 22.7M | 🟢 **-52%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.2M | ✅ | 43.8M | -7% |
| ref.json | URN base URI with NSS | 2 | ✅ | 49.2M | ✅ | 43.7M | -11% |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.2M | ✅ | 43.4M | -8% |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.8M | ✅ | 45.0M | +5% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 24.9M | ✅ | 43.7M | 🔴 **+75%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.0M | ✅ | 43.9M | -5% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 35.8M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 35.1M | ✅ | 49.7M | 🔴 **+42%** |
| ref.json | ref to then | 2 | ✅ | 35.1M | ✅ | 49.2M | 🔴 **+40%** |
| ref.json | ref to else | 2 | ✅ | 33.0M | ✅ | 49.7M | 🔴 **+51%** |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 35.1M | ✅ | 50.4M | 🔴 **+44%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.5M | ✅ | 48.9M | 🟢 **-43%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.2M | ✅ | 49.7M | 🟢 **-42%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 76.2M | ✅ | 48.4M | 🟢 **-37%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.5M | ✅ | 16.0M | 🔴 **+256%** |
| refRemote.json | remote ref | 2 | ✅ | 33.8M | ✅ | 46.9M | 🔴 **+39%** |
| refRemote.json | fragment within remote ref | 2 | ✅ | 33.8M | ✅ | 48.0M | 🔴 **+42%** |
| refRemote.json | anchor within remote ref | 2 | ✅ | 34.7M | ✅ | 43.4M | 🔴 **+25%** |
| refRemote.json | ref within remote ref | 2 | ✅ | 35.1M | ✅ | 32.4M | -8% |
| refRemote.json | base URI change | 2 | ✅ | 29.2M | ✅ | 27.8M | -5% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 28.8M | ✅ | 27.7M | -4% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.3M | ✅ | 27.3M | 🟢 **-25%** |
| refRemote.json | root ref in remote ref | 3 | ✅ | 23.4M | ✅ | 11.7M | 🟢 **-50%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 33.5M | ✅ | 28.5M | -15% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 35.4M | ✅ | 41.2M | +16% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.5M | ✅ | 29.8M | 🟢 **-31%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 34.4M | ✅ | 42.0M | 🔴 **+22%** |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 34.9M | ✅ | 37.6M | +8% |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 29.0M | ✅ | 41.0M | 🔴 **+41%** |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 34.9M | ✅ | 42.5M | 🔴 **+22%** |
| required.json | required validation | 5 | ✅ | 59.6M | ✅ | 49.4M | -17% |
| required.json | required default validation | 1 | ✅ | 99.6M | ✅ | 73.8M | 🟢 **-26%** |
| required.json | required with empty array | 1 | ✅ | 99.2M | ✅ | 73.8M | 🟢 **-26%** |
| required.json | required with escaped characters | 2 | ✅ | 46.7M | ✅ | 37.6M | -19% |
| required.json | required properties whose names are J... | 7 | ✅ | 25.5M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 72.3M | ✅ | 40.5M | 🟢 **-44%** |
| type.json | number type matches numbers | 9 | ✅ | 74.1M | ✅ | 43.5M | 🟢 **-41%** |
| type.json | string type matches strings | 9 | ✅ | 73.3M | ✅ | 45.3M | 🟢 **-38%** |
| type.json | object type matches objects | 7 | ✅ | 64.1M | ✅ | 37.3M | 🟢 **-42%** |
| type.json | array type matches arrays | 7 | ✅ | 68.1M | ✅ | 40.8M | 🟢 **-40%** |
| type.json | boolean type matches booleans | 10 | ✅ | 71.6M | ✅ | 37.5M | 🟢 **-48%** |
| type.json | null type matches only the null object | 10 | ✅ | 70.4M | ✅ | 36.6M | 🟢 **-48%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 69.1M | ✅ | 38.6M | 🟢 **-44%** |
| type.json | type as array with one item | 2 | ✅ | 85.2M | ✅ | 50.6M | 🟢 **-41%** |
| type.json | type: array or object | 5 | ✅ | 73.8M | ✅ | 42.8M | 🟢 **-42%** |
| type.json | type: array, object or null | 5 | ✅ | 84.6M | ✅ | 44.2M | 🟢 **-48%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 92.1M | ✅ | 68.3M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 50.5M | ✅ | 48.8M | -3% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 49.2M | ✅ | 42.9M | -13% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 77.5M | ✅ | 62.6M | -19% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 47.0M | ✅ | 46.4M | -1% |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 85.8M | ✅ | 66.7M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 36.5M | ✅ | 37.0M | +1% |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 29.7M | ✅ | 37.4M | 🔴 **+26%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.8M | ✅ | 44.6M | -3% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 20.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 91.0M | ✅ | 63.6M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.4M | ✅ | 63.1M | 🔴 **+195%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.1M | ✅ | 26.6M | 🔴 **+120%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.2M | ✅ | 20.1M | 🔴 **+42%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 32.1M | ✅ | 37.4M | +17% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ✅ | 27.6M | 🔴 **+145%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 44.0M | ✅ | 42.9M | -2% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 37.2M | ✅ | 43.8M | +18% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 43.7M | ✅ | 37.8M | -13% |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ✅ | 10.0M | 🔴 **+361%** |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 36.1M | ✅ | 40.1M | +11% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.2M | ✅ | 30.6M | 🔴 **+32%** |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 73.6M | ✅ | 54.7M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 85.1M | ✅ | 66.0M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 33.2M | ✅ | 37.5M | +13% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 62.7M | ✅ | 60.9M | -3% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.2M | ✅ | 15.8M | 🟢 **-49%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 32.8M | ✅ | 40.0M | 🔴 **+22%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.3M | ✅ | 37.0M | +18% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ✅ | 12.0M | +6% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 75.2M | ✅ | 60.0M | 🟢 **-20%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.5M | ✅ | 33.8M | +15% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.6M | ✅ | 9.1M | -6% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 75.2M | ✅ | 60.2M | -20% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 35.4M | ✅ | 59.7M | 🔴 **+69%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.1M | ✅ | 7.1M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.5M | ✅ | 13.8M | 🟢 **-25%** |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 21.6M | ✅ | 29.8M | 🔴 **+38%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.6M | ✅ | 17.8M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 16.8M | ✅ | 18.1M | +7% |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.9M | ✅ | 24.3M | -9% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.3M | ✅ | 37.6M | 🔴 **+20%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.0M | ✅ | 26.8M | -11% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.9M | ✅ | 31.3M | +8% |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.0M | ✅ | 10.6M | 🔴 **+252%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 24.0M | ✅ | 33.8M | 🔴 **+41%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 23.5M | ✅ | 34.0M | 🔴 **+45%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 34.2M | ✅ | 59.8M | 🔴 **+75%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 33.5M | ✅ | 55.7M | 🔴 **+66%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 22.7M | ✅ | 30.7M | 🔴 **+35%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.8M | ✅ | 32.3M | 🔴 **+20%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 18.8M | ✅ | 29.4M | 🔴 **+56%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.4M | ✅ | 36.2M | 🔴 **+218%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.0M | ✅ | 23.7M | -15% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 26.7M | ✅ | 33.5M | 🔴 **+25%** |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.8M | ✅ | 19.5M | 🟢 **-61%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ✅ | 13.0M | 🟢 **-32%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.3M | ✅ | 13.5M | 🟢 **-33%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ✅ | 5.3M | 🟢 **-27%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 92.7M | ✅ | 55.0M | 🟢 **-41%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 55.2M | ✅ | 30.7M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.8M | ✅ | 12.3M | 🟢 **-52%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.1M | ✅ | 27.3M | 🔴 **+36%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 21.1M | ✅ | 29.1M | 🔴 **+37%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.5M | ✅ | 7.3M | 🟢 **-56%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 35.6M | ✅ | 20.4M | 🟢 **-43%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 20.3M | ✅ | 25.3M | 🔴 **+24%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 87.3M | ✅ | 54.2M | 🟢 **-38%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.8M | ✅ | 53.4M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 79.2M | ✅ | 48.7M | 🟢 **-39%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 52.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 85.5M | ✅ | 42.2M | 🟢 **-51%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 67.3M | ✅ | 10.7M | 🟢 **-84%** |
| optional/bignum.json | integer | 2 | ✅ | 93.6M | ✅ | 14.2M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 98.3M | ✅ | 67.4M | 🟢 **-31%** |
| optional/bignum.json | string | 1 | ✅ | 71.5M | ✅ | 40.9M | 🟢 **-43%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 86.6M | ✅ | 67.4M | 🟢 **-22%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 66.8M | ✅ | 38.6M | 🟢 **-42%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 89.2M | ✅ | 67.3M | 🟢 **-24%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 66.9M | ✅ | 38.4M | 🟢 **-43%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.5M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 76.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 64.1M | ✅ | 46.4M | 🟢 **-28%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 104.3M | ✅ | 64.7M | 🟢 **-38%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.0M | ✅ | 34.1M | +3% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 44.6M | ✅ | 36.4M | -18% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 49.5M | ✅ | 40.2M | -19% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 59.8M | ✅ | 39.8M | 🟢 **-33%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 35.2M | ✅ | 30.7M | -13% |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.7M | ✅ | 26.9M | -9% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 32.2M | ✅ | 27.5M | -15% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.7M | ✅ | 27.8M | -6% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 30.0M | ✅ | 27.8M | -7% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 30.7M | ✅ | 27.5M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 28.8M | ✅ | 28.9M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 30.3M | ✅ | 27.3M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 30.7M | ✅ | 25.8M | -16% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 29.0M | +7% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 33.0M | ✅ | 25.0M | 🟢 **-24%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 18.1M | ✅ | 17.0M | -6% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.8M | ✅ | 13.8M | 🟢 **-22%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.8M | ✅ | 14.6M | -13% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 36.8M | ✅ | 25.9M | 🟢 **-30%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 23.7M | ✅ | 23.2M | -2% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.6M | ✅ | 22.7M | -4% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.1M | ✅ | 22.0M | +15% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.6M | ✅ | 20.3M | +15% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 9.6M | 🔴 **+23%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ✅ | 8.9M | +1% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 12.2M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 27.8M | ✅ | 2.9M | 🟢 **-90%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.6M | ✅ | 8.1M | -15% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 43.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.8M | ✅ | 21.8M | +10% |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.7M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.4M | ✅ | 77K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.2M | ✅ | 29.6M | 🟢 **-28%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 13.3M | ✅ | 2.8M | 🟢 **-79%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 34.3M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 33.4M | ✅ | 25.2M | 🟢 **-24%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 80.0M | ✅ | 908K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.8M | ✅ | 30.6M | -19% |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ✅ | 5.6M | -17% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 103.3M | ✅ | 55.0M | 🟢 **-47%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.2M | ✅ | 9.4M | -8% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.8M | ✅ | 15.3M | -19% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.8M | ✅ | 4.3M | 🟢 **-36%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 16.9M | ✅ | 15.0M | -11% |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 31.5M | ✅ | 12.2M | 🟢 **-61%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 69.7M | ✅ | 45.0M | 🟢 **-35%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 33.4M | ✅ | 27.0M | -19% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ✅ | 7.1M | 🟢 **-56%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 49.1M | ✅ | 43.2M | -12% |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 47.7M | ✅ | 43.6M | -9% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 50.3M | ✅ | 43.6M | -13% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 85.0M | ✅ | 50.1M | 🟢 **-41%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 48.5M | ✅ | 41.4M | -15% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 9.8M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | ajv | ajv ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 55.5M | ✅ | 36.1M | 🟢 **-35%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.2M | ✅ | 22.6M | +7% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.2M | ✅ | 17.4M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.1M | ✅ | 13.7M | 🟢 **-56%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 108.3M | ✅ | 74.1M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.4M | ✅ | 8.3M | 🟢 **-70%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 46.7M | 🟢 **-33%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.3M | ✅ | 10.0M | 🟢 **-59%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.8M | ✅ | 9.6M | 🟢 **-69%** |
| allOf.json | allOf | 4 | ✅ | 36.3M | ✅ | 26.2M | 🟢 **-28%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.2M | ✅ | 24.0M | -18% |
| allOf.json | allOf simple types | 2 | ✅ | 63.7M | ✅ | 30.0M | 🟢 **-53%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 74.2M | 🟢 **-51%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.4M | ✅ | 30.7M | 🟢 **-38%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 59.5M | ✅ | 40.0M | 🟢 **-33%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 65.3M | ✅ | 74.1M | +13% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.3M | ✅ | 73.8M | 🟢 **-52%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.5M | ✅ | 48.0M | 🟢 **-28%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.4M | ✅ | 48.0M | 🟢 **-58%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 63.0M | ✅ | 44.0M | 🟢 **-30%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 4.7M | 🟢 **-94%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 66.8M | ✅ | 47.9M | 🟢 **-28%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.3M | ✅ | 39.6M | 🟢 **-54%** |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 41.3M | ✅ | 48.4M | +17% |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 39.0M | ✅ | 48.8M | 🔴 **+25%** |
| anyOf.json | anyOf | 4 | ✅ | 63.0M | ✅ | 26.8M | 🟢 **-57%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 33.7M | ✅ | 20.7M | 🟢 **-39%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 76.8M | ✅ | 74.4M | -3% |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 76.6M | ✅ | 73.3M | -4% |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 58.4M | ✅ | 20.6M | 🟢 **-65%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 45.6M | ✅ | 10.9M | 🟢 **-76%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 72.1M | ✅ | 58.6M | -19% |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 67.6M | ✅ | 18.9M | 🟢 **-72%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 75.1M | ✅ | 55.9M | 🟢 **-26%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 52.7M | ✅ | 32.2M | 🟢 **-39%** |
| const.json | const validation | 3 | ✅ | 52.8M | ✅ | 36.6M | 🟢 **-31%** |
| const.json | const with object | 4 | ✅ | 38.0M | ✅ | 15.1M | 🟢 **-60%** |
| const.json | const with array | 3 | ✅ | 40.6M | ✅ | 15.9M | 🟢 **-61%** |
| const.json | const with null | 2 | ✅ | 54.8M | ✅ | 47.2M | -14% |
| const.json | const with false does not match 0 | 3 | ✅ | 33.6M | ✅ | 35.5M | +6% |
| const.json | const with true does not match 1 | 3 | ✅ | 62.7M | ✅ | 39.4M | 🟢 **-37%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 52.3M | ✅ | 25.3M | 🟢 **-52%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 49.9M | ✅ | 14.1M | 🟢 **-72%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 55.7M | ✅ | 12.9M | 🟢 **-77%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 53.6M | ✅ | 12.8M | 🟢 **-76%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 56.0M | ✅ | 39.5M | 🟢 **-29%** |
| const.json | const with 1 does not match true | 3 | ✅ | 61.8M | ✅ | 38.8M | 🟢 **-37%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 58.5M | ✅ | 40.6M | 🟢 **-30%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 55.9M | ✅ | 42.1M | 🟢 **-25%** |
| const.json | nul characters in strings | 2 | ✅ | 28.1M | ✅ | 40.6M | 🔴 **+45%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 52.6M | ✅ | 39.5M | 🟢 **-25%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 44.7M | ✅ | 46.1M | +3% |
| contains.json | contains keyword validation | 6 | ✅ | 55.7M | ✅ | 8.0M | 🟢 **-86%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 56.7M | ✅ | 9.3M | 🟢 **-84%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 51.8M | ✅ | 26.2M | 🟢 **-49%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 63.0M | ✅ | 32.2M | 🟢 **-49%** |
| contains.json | items + contains | 4 | ✅ | 37.6M | ✅ | 8.1M | 🟢 **-78%** |
| contains.json | contains with false if subschema | 2 | ✅ | 60.9M | ✅ | 43.7M | 🟢 **-28%** |
| contains.json | contains with null instance elements | 1 | ✅ | 54.3M | ✅ | 66.4M | 🔴 **+22%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 76.7M | ✅ | 51.3M | 🟢 **-33%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 80.3M | ✅ | 64.5M | -20% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 64.0M | ✅ | 50.6M | 🟢 **-21%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 65.3M | ✅ | 54.7M | -16% |
| default.json | invalid type for default | 2 | ✅ | 32.0M | ✅ | 32.4M | +1% |
| default.json | invalid string value for default | 2 | ✅ | 49.7M | ✅ | 48.6M | -2% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.9M | ✅ | 42.2M | -8% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ✅ | 830K | 🟢 **-61%** |
| dependentRequired.json | single dependency | 7 | ✅ | 55.0M | ✅ | 49.8M | -9% |
| dependentRequired.json | empty dependents | 3 | ✅ | 79.9M | ✅ | 64.3M | -20% |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.0M | ✅ | 34.3M | 🔴 **+27%** |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 41.4M | ✅ | 37.6M | -9% |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.8M | ✅ | 42.9M | -12% |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 43.8M | ✅ | 41.7M | -5% |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 20.3M | ✅ | 31.8M | 🔴 **+57%** |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 18.4M | ✅ | 37.3M | 🔴 **+103%** |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 11.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 19.1M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 14.1M | ✅ | 19.7M | 🔴 **+40%** |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.6M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.2M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.5M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ✅ | 10.6M | 🔴 **+71%** |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.5M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 26.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 54.1M | ✅ | 50.7M | -6% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 40.3M | ✅ | 11.4M | 🟢 **-72%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 63.3M | ✅ | 44.3M | 🟢 **-30%** |
| enum.json | enums in properties | 6 | ✅ | 14.2M | ✅ | 35.8M | 🔴 **+152%** |
| enum.json | enum with escaped characters | 3 | ✅ | 69.3M | ✅ | 45.6M | 🟢 **-34%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 63.2M | ✅ | 39.0M | 🟢 **-38%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 57.4M | ✅ | 21.0M | 🟢 **-63%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 64.7M | ✅ | 37.8M | 🟢 **-42%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 57.0M | ✅ | 20.8M | 🟢 **-63%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 65.1M | ✅ | 44.8M | 🟢 **-31%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.9M | ✅ | 21.7M | 🟢 **-63%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 64.4M | ✅ | 43.9M | 🟢 **-32%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ✅ | 22.4M | 🟢 **-62%** |
| enum.json | nul characters in strings | 2 | ✅ | 57.4M | ✅ | 45.9M | 🟢 **-20%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 62.4M | ✅ | 41.4M | 🟢 **-34%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 62.7M | ✅ | 40.9M | 🟢 **-35%** |
| format.json | email format | 7 | ✅ | 75.1M | ✅ | 43.8M | 🟢 **-42%** |
| format.json | idn-email format | 7 | ✅ | 75.4M | ✅ | 55.5M | 🟢 **-26%** |
| format.json | regex format | 7 | ✅ | 64.2M | ✅ | 55.9M | -13% |
| format.json | ipv4 format | 7 | ✅ | 67.2M | ✅ | 54.7M | -19% |
| format.json | ipv6 format | 7 | ✅ | 34.5M | ✅ | 54.5M | 🔴 **+58%** |
| format.json | idn-hostname format | 7 | ✅ | 67.2M | ✅ | 56.0M | -17% |
| format.json | hostname format | 7 | ✅ | 66.6M | ✅ | 54.4M | -18% |
| format.json | date format | 7 | ✅ | 67.1M | ✅ | 55.5M | -17% |
| format.json | date-time format | 7 | ✅ | 67.2M | ✅ | 54.6M | -19% |
| format.json | time format | 7 | ✅ | 67.2M | ✅ | 55.6M | -17% |
| format.json | json-pointer format | 7 | ✅ | 67.2M | ✅ | 55.9M | -17% |
| format.json | relative-json-pointer format | 7 | ✅ | 67.1M | ✅ | 55.2M | -18% |
| format.json | iri format | 7 | ✅ | 65.2M | ✅ | 55.0M | -16% |
| format.json | iri-reference format | 7 | ✅ | 67.0M | ✅ | 55.5M | -17% |
| format.json | uri format | 7 | ✅ | 34.8M | ✅ | 55.5M | 🔴 **+60%** |
| format.json | uri-reference format | 7 | ✅ | 66.7M | ✅ | 55.3M | -17% |
| format.json | uri-template format | 7 | ✅ | 66.8M | ✅ | 55.4M | -17% |
| format.json | uuid format | 7 | ✅ | 66.7M | ✅ | 56.1M | -16% |
| format.json | duration format | 7 | ✅ | 67.1M | ✅ | 55.6M | -17% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.2M | ✅ | 68.8M | -13% |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.1M | ✅ | 68.1M | -14% |
| if-then-else.json | ignore else without if | 2 | ✅ | 72.2M | ✅ | 68.8M | -5% |
| if-then-else.json | if and then without else | 3 | ✅ | 67.3M | ✅ | 43.5M | 🟢 **-35%** |
| if-then-else.json | if and else without then | 3 | ✅ | 66.4M | ✅ | 38.3M | 🟢 **-42%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 63.1M | ✅ | 36.8M | 🟢 **-42%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 72.3M | ✅ | 68.2M | -6% |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 66.2M | ✅ | 47.1M | 🟢 **-29%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 65.8M | ✅ | 47.6M | 🟢 **-28%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 38.4M | ✅ | 31.4M | -18% |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 40.1M | ✅ | 37.7M | -6% |
| items.json | a schema given for items | 4 | ✅ | 48.9M | ✅ | 43.0M | -12% |
| items.json | items with boolean schema (true) | 2 | ✅ | 79.1M | ✅ | 68.5M | -13% |
| items.json | items with boolean schema (false) | 2 | ✅ | 60.7M | ✅ | 43.6M | 🟢 **-28%** |
| items.json | items and subitems | 6 | ✅ | 12.6M | ✅ | 16.6M | 🔴 **+32%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 10.9M | -11% |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 66.3M | ✅ | 49.8M | 🟢 **-25%** |
| items.json | items does not look in applicators, v... | 2 | ✅ | 41.2M | ✅ | 39.2M | -5% |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 39.9M | ✅ | 37.7M | -6% |
| items.json | items with heterogeneous array | 2 | ✅ | 62.5M | ✅ | 48.0M | 🟢 **-23%** |
| items.json | items with null instance elements | 1 | ✅ | 66.1M | ✅ | 67.3M | +2% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 79.1M | ✅ | 68.1M | -14% |
| maxContains.json | maxContains with contains | 5 | ✅ | 53.8M | ✅ | 27.4M | 🟢 **-49%** |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 58.6M | ✅ | 45.0M | 🟢 **-23%** |
| maxContains.json | minContains < maxContains | 3 | ✅ | 53.8M | ✅ | 37.1M | 🟢 **-31%** |
| maxItems.json | maxItems validation | 4 | ✅ | 68.2M | ✅ | 48.5M | 🟢 **-29%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 48.5M | 🟢 **-24%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.1M | ✅ | 47.0M | -11% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.2M | ✅ | 43.7M | -15% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 51.8M | ✅ | 42.9M | -17% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 44.0M | ✅ | 34.9M | 🟢 **-21%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.7M | ✅ | 34.5M | 🟢 **-23%** |
| maximum.json | maximum validation | 4 | ✅ | 67.0M | ✅ | 43.8M | 🟢 **-35%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.1M | ✅ | 47.8M | 🟢 **-28%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 78.1M | ✅ | 51.3M | 🟢 **-34%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 59.0M | ✅ | 35.8M | 🟢 **-39%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.5M | ✅ | 28.7M | 🟢 **-48%** |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.8M | ✅ | 45.1M | 🟢 **-23%** |
| minContains.json | maxContains = minContains | 4 | ✅ | 50.4M | ✅ | 37.3M | 🟢 **-26%** |
| minContains.json | maxContains < minContains | 4 | ✅ | 49.0M | ✅ | 33.5M | 🟢 **-32%** |
| minContains.json | minContains = 0 | 2 | ✅ | 79.1M | ✅ | 66.6M | -16% |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 62.2M | ✅ | 44.9M | 🟢 **-28%** |
| minItems.json | minItems validation | 4 | ✅ | 68.2M | ✅ | 47.9M | 🟢 **-30%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.8M | ✅ | 49.8M | 🟢 **-22%** |
| minLength.json | minLength validation | 5 | ✅ | 52.4M | ✅ | 44.3M | -15% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 51.2M | ✅ | 43.7M | -15% |
| minProperties.json | minProperties validation | 6 | ✅ | 52.1M | ✅ | 42.0M | -19% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 44.5M | ✅ | 33.5M | 🟢 **-25%** |
| minimum.json | minimum validation | 4 | ✅ | 65.2M | ✅ | 47.3M | 🟢 **-27%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.5M | ✅ | 48.2M | 🟢 **-24%** |
| multipleOf.json | by int | 3 | ✅ | 67.6M | ✅ | 44.1M | 🟢 **-35%** |
| multipleOf.json | by number | 3 | ✅ | 64.1M | ✅ | 42.8M | 🟢 **-33%** |
| multipleOf.json | by small number | 2 | ✅ | 59.1M | ✅ | 39.3M | 🟢 **-33%** |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 8.9M | 🟢 **-83%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.0M | ✅ | 9.1M | 🟢 **-86%** |
| not.json | not | 2 | ✅ | 66.9M | ✅ | 43.3M | 🟢 **-35%** |
| not.json | not multiple types | 3 | ✅ | 60.0M | ✅ | 37.7M | 🟢 **-37%** |
| not.json | not more complex schema | 3 | ✅ | 58.7M | ✅ | 39.4M | 🟢 **-33%** |
| not.json | forbidden property | 2 | ✅ | 46.7M | ✅ | 34.2M | 🟢 **-27%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 55.0M | ✅ | 32.3M | 🟢 **-41%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 51.4M | ✅ | 32.5M | 🟢 **-37%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 76.6M | ✅ | 54.9M | 🟢 **-28%** |
| not.json | double negation | 1 | ✅ | 73.6M | ✅ | 73.5M | 0% |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.7M | ✅ | 22.3M | 🟢 **-30%** |
| oneOf.json | oneOf | 4 | ✅ | 59.4M | ✅ | 21.8M | 🟢 **-63%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.6M | ✅ | 24.9M | 🟢 **-21%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 58.2M | ✅ | 36.5M | 🟢 **-37%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 76.5M | ✅ | 27.0M | 🟢 **-65%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 58.2M | ✅ | 36.3M | 🟢 **-38%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 58.2M | ✅ | 18.6M | 🟢 **-68%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.7M | ✅ | 18.0M | 🟢 **-56%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 66.1M | ✅ | 40.0M | 🟢 **-39%** |
| oneOf.json | oneOf with required | 4 | ✅ | 43.7M | ✅ | 21.5M | 🟢 **-51%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.2M | ✅ | 19.4M | 🟢 **-57%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.3M | ✅ | 27.9M | 🟢 **-58%** |
| pattern.json | pattern validation | 8 | ✅ | 50.6M | ✅ | 39.0M | 🟢 **-23%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.2M | ✅ | 31.1M | 🔴 **+29%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 10.4M | 🟢 **-59%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 5.7M | 🟢 **-61%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.1M | ✅ | 7.6M | 🟢 **-50%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.9M | ✅ | 5.7M | 🟢 **-71%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.5M | ✅ | 17.7M | +1% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 59.1M | ✅ | 50.5M | -15% |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 53.6M | ✅ | 44.0M | -18% |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 70.1M | ✅ | 65.2M | -7% |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 70.2M | ✅ | 64.4M | -8% |
| properties.json | object properties validation | 6 | ✅ | 49.7M | ✅ | 44.8M | -10% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ✅ | 9.6M | 🟢 **-50%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.5M | ✅ | 41.1M | -8% |
| properties.json | properties with escaped characters | 2 | ✅ | 46.3M | ✅ | 43.6M | -6% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.0M | ✅ | 60.4M | -3% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.0M | ✅ | 30.2M | 🟢 **-21%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 14.1M | 🟢 **-27%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 79.2M | ✅ | 68.9M | -13% |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.2M | ✅ | 28.7M | 🟢 **-38%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.2M | ✅ | 31.3M | -16% |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.5M | ✅ | 33.3M | -16% |
| ref.json | root pointer ref | 4 | ✅ | 22.6M | ✅ | 18.5M | -18% |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.8M | ✅ | 43.3M | -7% |
| ref.json | relative pointer ref to array | 2 | ✅ | 50.5M | ✅ | 44.8M | -11% |
| ref.json | escaped pointer ref | 6 | ✅ | 42.8M | ✅ | 40.0M | -7% |
| ref.json | nested refs | 2 | ✅ | 36.6M | ✅ | 49.2M | 🔴 **+34%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.5M | ✅ | 37.8M | -7% |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ✅ | 2.2M | 🟢 **-35%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.2M | ✅ | 43.8M | -7% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.9M | ✅ | 42.8M | -9% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 76.7M | ✅ | 73.8M | -4% |
| ref.json | $ref to boolean schema false | 1 | ✅ | 58.1M | ✅ | 40.2M | 🟢 **-31%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 7.1M | -15% |
| ref.json | refs with quote | 2 | ✅ | 47.2M | ✅ | 44.5M | -6% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.5M | ✅ | 33.4M | 🔴 **+31%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.1M | ✅ | 14.4M | 🟢 **-72%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.1M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.3M | ✅ | 49.5M | +7% |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 44.5M | ✅ | 47.3M | +6% |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 64.4M | ✅ | 47.4M | 🟢 **-26%** |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.3M | ✅ | 40.0M | +4% |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.9M | ✅ | 22.8M | 🟢 **-40%** |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.2M | ✅ | 42.5M | -10% |
| ref.json | URN base URI with NSS | 2 | ✅ | 47.2M | ✅ | 43.3M | -8% |
| ref.json | URN base URI with r-component | 2 | ✅ | 43.4M | ✅ | 43.6M | +0% |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.3M | ✅ | 43.2M | -2% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.9M | ✅ | 43.0M | -4% |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.2M | ✅ | 42.9M | -3% |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 45.5M | ✅ | 48.1M | +6% |
| ref.json | ref to then | 2 | ✅ | 46.1M | ✅ | 47.9M | +4% |
| ref.json | ref to else | 2 | ✅ | 45.0M | ✅ | 48.6M | +8% |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 45.9M | ✅ | 49.9M | +9% |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 48.0M | 🟢 **-28%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 49.1M | 🟢 **-27%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 66.9M | ✅ | 48.2M | 🟢 **-28%** |
| refRemote.json | remote ref | 2 | ✅ | 44.5M | ✅ | 47.9M | +8% |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.3M | ✅ | 47.5M | +7% |
| refRemote.json | anchor within remote ref | 2 | ✅ | 43.8M | ✅ | 43.0M | -2% |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.8M | ✅ | 48.4M | +8% |
| refRemote.json | base URI change | 2 | ✅ | 27.9M | ✅ | 27.8M | -1% |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.7M | ✅ | 27.5M | -13% |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.1M | ✅ | 27.6M | -19% |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.5M | ✅ | 10.9M | 🟢 **-64%** |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 31.9M | ✅ | 37.7M | +18% |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.9M | ✅ | 41.6M | -5% |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.3M | ✅ | 29.4M | 🟢 **-23%** |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 40.6M | ✅ | 34.6M | -15% |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 46.9M | ✅ | 41.7M | -11% |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 36.9M | ✅ | 42.0M | +14% |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 45.9M | ✅ | 36.8M | -20% |
| required.json | required validation | 5 | ✅ | 55.8M | ✅ | 49.3M | -12% |
| required.json | required default validation | 1 | ✅ | 76.3M | ✅ | 74.6M | -2% |
| required.json | required with empty array | 1 | ✅ | 76.7M | ✅ | 74.1M | -3% |
| required.json | required with escaped characters | 2 | ✅ | 46.5M | ✅ | 38.4M | -17% |
| required.json | required properties whose names are J... | 7 | ✅ | 26.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 53.0M | ✅ | 40.8M | 🟢 **-23%** |
| type.json | number type matches numbers | 9 | ✅ | 59.9M | ✅ | 40.3M | 🟢 **-33%** |
| type.json | string type matches strings | 9 | ✅ | 59.1M | ✅ | 45.4M | 🟢 **-23%** |
| type.json | object type matches objects | 7 | ✅ | 52.5M | ✅ | 40.2M | 🟢 **-23%** |
| type.json | array type matches arrays | 7 | ✅ | 55.9M | ✅ | 40.8M | 🟢 **-27%** |
| type.json | boolean type matches booleans | 10 | ✅ | 57.4M | ✅ | 43.2M | 🟢 **-25%** |
| type.json | null type matches only the null object | 10 | ✅ | 53.9M | ✅ | 36.9M | 🟢 **-31%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.2M | ✅ | 38.3M | 🟢 **-33%** |
| type.json | type as array with one item | 2 | ✅ | 66.5M | ✅ | 50.8M | 🟢 **-24%** |
| type.json | type: array or object | 5 | ✅ | 58.4M | ✅ | 42.5M | 🟢 **-27%** |
| type.json | type: array, object or null | 5 | ✅ | 62.2M | ✅ | 44.6M | 🟢 **-28%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 71.4M | ✅ | 50.5M | 🟢 **-29%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 52.2M | ✅ | 48.3M | -7% |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 48.2M | ✅ | 43.0M | -11% |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 62.1M | ✅ | 54.9M | -12% |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 48.5M | ✅ | 47.5M | -2% |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 68.7M | ✅ | 67.2M | -2% |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 41.6M | ✅ | 42.1M | +1% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.6M | ✅ | 44.0M | -4% |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 70.5M | ✅ | 62.9M | -11% |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.4M | ✅ | 64.0M | 🔴 **+214%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ✅ | 26.4M | 🔴 **+121%** |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.9M | ✅ | 20.6M | 🔴 **+38%** |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 38.0M | ✅ | 37.7M | -1% |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ✅ | 21.0M | 🔴 **+90%** |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 51.0M | ✅ | 48.0M | -6% |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 42.2M | ✅ | 43.6M | +3% |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 45.2M | ✅ | 43.9M | -3% |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 42.1M | ✅ | 39.7M | -6% |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.8M | ✅ | 30.3M | 🔴 **+27%** |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 18.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 72.2M | ✅ | 52.7M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 65.8M | ✅ | 65.9M | +0% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 39.1M | ✅ | 37.0M | -5% |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.3M | ✅ | 69.0M | 🔴 **+32%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 30.4M | ✅ | 15.8M | 🟢 **-48%** |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 32.8M | ✅ | 39.6M | 🔴 **+21%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 29.6M | ✅ | 36.3M | 🔴 **+23%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.2M | ✅ | 12.8M | +15% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 79.1M | ✅ | 68.8M | -13% |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 30.7M | ✅ | 13.1M | 🟢 **-57%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 27.0M | ✅ | 32.3M | +19% |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.2M | ✅ | 8.7M | -5% |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 61.0M | ✅ | 59.6M | -2% |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.0M | ✅ | 58.3M | 🔴 **+116%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.1M | ✅ | 11.9M | 🟢 **-21%** |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.1M | ✅ | 15.0M | -12% |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 22.6M | ✅ | 29.5M | 🔴 **+30%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.4M | ✅ | 18.1M | +10% |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.5M | ✅ | 19.4M | 🔴 **+25%** |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.0M | ✅ | 25.0M | +0% |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 30.3M | ✅ | 37.2M | 🔴 **+23%** |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.0M | ✅ | 30.9M | +14% |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 27.0M | ✅ | 31.1M | +15% |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 10.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.6M | ✅ | 33.8M | 🔴 **+27%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.0M | ✅ | 34.0M | 🔴 **+26%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 26.9M | ✅ | 58.8M | 🔴 **+119%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 26.4M | ✅ | 59.7M | 🔴 **+126%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 24.1M | ✅ | 30.4M | 🔴 **+26%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ✅ | 36.0M | 🔴 **+38%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 16.7M | ✅ | 28.6M | 🔴 **+71%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.6M | ✅ | 36.2M | 🔴 **+212%** |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.8M | ✅ | 23.4M | -6% |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.3M | ✅ | 34.6M | +18% |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 44.5M | ✅ | 25.2M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.0M | ✅ | 12.7M | 🟢 **-25%** |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.6M | ✅ | 14.0M | 🟢 **-28%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ✅ | 5.4M | 🟢 **-25%** |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 66.5M | ✅ | 55.4M | -17% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 47.8M | ✅ | 46.8M | -2% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 24.9M | ✅ | 12.5M | 🟢 **-50%** |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.6M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.7M | ✅ | 27.3M | 🔴 **+32%** |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.0M | ✅ | 28.9M | 🔴 **+25%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ✅ | 10.5M | 🟢 **-39%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.5M | ✅ | 19.6M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 42.2M | ✅ | 25.7M | 🟢 **-39%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 74.2M | ✅ | 54.3M | 🟢 **-27%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.5M | ✅ | 54.2M | -15% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.1M | ✅ | 48.7M | -18% |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 47.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 67.0M | ✅ | 47.9M | 🟢 **-28%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.3M | ✅ | 11.6M | 🟢 **-79%** |
| optional/bignum.json | integer | 2 | ✅ | 75.2M | ✅ | 14.1M | 🟢 **-81%** |
| optional/bignum.json | number | 2 | ✅ | 75.8M | ✅ | 68.6M | -9% |
| optional/bignum.json | string | 1 | ✅ | 55.6M | ✅ | 39.8M | 🟢 **-28%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 67.6M | -2% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.8M | ✅ | 37.9M | 🟢 **-30%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 67.8M | -1% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 53.9M | ✅ | 38.0M | 🟢 **-29%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 73.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 56.8M | ✅ | 44.3M | 🟢 **-22%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 80.2M | ✅ | 64.8M | -19% |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.2M | ✅ | 32.9M | +2% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 44.2M | ✅ | 36.8M | -17% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 49.7M | ✅ | 42.0M | -15% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 51.2M | ✅ | 40.2M | 🟢 **-21%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 37.7M | ✅ | 30.0M | 🟢 **-20%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.5M | ✅ | 27.6M | +0% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.4M | ✅ | 27.7M | 🔴 **+43%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 26.4M | +4% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ✅ | 27.8M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.1M | ✅ | 27.3M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.1M | ✅ | 27.1M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 19.0M | ✅ | 26.9M | 🔴 **+42%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.4M | ✅ | 29.0M | +14% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.8M | ✅ | 28.1M | +9% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.7M | ✅ | 24.8M | -14% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ✅ | 17.6M | +6% |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 14.1M | -7% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.0M | ✅ | 14.3M | -5% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.7M | ✅ | 26.9M | +1% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.2M | ✅ | 20.8M | +14% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.0M | ✅ | 22.6M | +3% |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 12.3M | ✅ | 20.7M | 🔴 **+68%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.6M | ✅ | 19.9M | +13% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 9.3M | +20% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ✅ | 8.6M | +2% |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.7M | ✅ | 2.9M | 🟢 **-88%** |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.3M | ✅ | 7.5M | -9% |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 39.1M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 43.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.7M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ✅ | 50K | 🟢 **-100%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 40.9M | ✅ | 30.6M | 🟢 **-25%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ✅ | 2.8M | 🟢 **-77%** |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.0M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.2M | ✅ | 25.4M | -16% |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.8M | ✅ | 907K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 38.6M | ✅ | 29.4M | 🟢 **-24%** |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ✅ | 5.6M | -11% |
| optional/format/unknown.json | unknown format | 7 | ✅ | 75.2M | ✅ | 55.9M | 🟢 **-26%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ✅ | 9.1M | -4% |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.9M | ✅ | 15.0M | -6% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ✅ | 4.3M | 🟢 **-32%** |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ✅ | 14.7M | -3% |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 23.9M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.0M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 33.6M | ✅ | 12.0M | 🟢 **-64%** |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 57.2M | ✅ | 44.9M | 🟢 **-21%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ✅ | 25.7M | -12% |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.0M | ✅ | 6.9M | 🟢 **-60%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.9M | ✅ | 43.6M | -7% |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.5M | ✅ | 43.6M | +3% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 47.3M | ✅ | 43.8M | -7% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 66.7M | ✅ | 50.5M | 🟢 **-24%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 47.1M | ✅ | 43.9M | -7% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.1M | ❌ | - | - |
