# tjs vs jsonschema Benchmarks

Performance comparison of **tjs** vs **[jsonschema](https://www.npmjs.com/package/jsonschema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | jsonschema pass | jsonschema ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.7M | 182/199 | 108K | 182 | 🟢 **-100%** |
| draft6 | 276 | ✅ 276 | 26.7M | 249/276 | 121K | 249 | 🟢 **-100%** |
| draft7 | 313 | ✅ 313 | 14.9M | 272/313 | 125K | 272 | 🟢 **-99%** |
| draft2019-09 | 435 | ✅ 435 | 18.3M | 295/435 | 135K | 295 | 🟢 **-99%** |
| draft2020-12 | 448 | ✅ 448 | 19.1M | 268/448 | 140K | 268 | 🟢 **-99%** |
| **Total** | 1671 | 1670/1671 | 19.3M | 1266/1671 | 126K | 1266 | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **284.91x faster** (28 ns vs 7912 ns per test, 4986 tests in 1266 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.4M | ✅ | 23K | 🟢 **-100%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 80.7M | ✅ | 67K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.0M | ✅ | 75K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 83.6M | ✅ | 282K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 115K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 43.7M | ✅ | 42K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.4M | ✅ | 72K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 66.7M | ✅ | 118K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.1M | ✅ | 172K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 38.0M | ✅ | 58K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 24.4M | ✅ | 128K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 34.5M | ✅ | 61K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.7M | ✅ | 112K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 73.5M | ✅ | 81K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.9M | ✅ | 56K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 49.4M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 47.8M | ✅ | 52K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 26.6M | ✅ | 43K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 108.7M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 80.7M | ✅ | 166K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.1M | ✅ | 122K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.5M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.3M | ✅ | 112K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 134.8M | ✅ | 63K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 72.1M | ✅ | 113K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 41.2M | ✅ | 109K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.5M | ✅ | 56K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.3M | ✅ | 116K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 111K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 114K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 51.5M | ✅ | 112K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.6M | ✅ | 109K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.5M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.1M | ✅ | 146K | 🟢 **-100%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 25.9M | ✅ | 127K | 🟢 **-100%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.6M | ✅ | 56K | 🟢 **-100%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.3M | ✅ | 60K | 🟢 **-99%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 47.0M | ✅ | 61K | 🟢 **-100%** |
| enum.json | simple enum validation | 2 | ✅ | 79.7M | ✅ | 243K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ✅ | 229K | 🟢 **-100%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.7M | ✅ | 248K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 72K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 54.6M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.1M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 72.7M | ✅ | 237K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.7M | ✅ | 245K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.1M | ✅ | 236K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 62.8M | ✅ | 244K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 250K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.9M | ✅ | 245K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 247K | 🟢 **-100%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 54.5M | ✅ | 244K | 🟢 **-100%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 94.0M | ✅ | 242K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 79.9M | ✅ | 257K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 160.7M | ✅ | 257K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 81.4M | ✅ | 257K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 163.4M | ✅ | 256K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 81.6M | ✅ | 256K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 162.9M | ✅ | 256K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 42.5M | ✅ | 30K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 82.2M | ✅ | 112K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 61.9M | ✅ | 89K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 28.1M | ✅ | 16K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 17K | 🟢 **-100%** |
| items.json | items with null instance elements | 1 | ✅ | 68.9M | ✅ | 114K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.5M | ✅ | 114K | 🟢 **-100%** |
| maxItems.json | maxItems validation | 4 | ✅ | 69.6M | ✅ | 257K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 50.2M | ✅ | 251K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 255K | 🟢 **-100%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.0M | ✅ | 253K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 69.8M | ✅ | 256K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 69.1M | ✅ | 256K | 🟢 **-100%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 70.1M | ✅ | 252K | 🟢 **-100%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 64.7M | ✅ | 250K | 🟢 **-100%** |
| minItems.json | minItems validation | 4 | ✅ | 71.5M | ✅ | 257K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 54.1M | ✅ | 250K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.7M | ✅ | 257K | 🟢 **-100%** |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ✅ | 256K | 🟢 **-100%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 70.0M | ✅ | 253K | 🟢 **-100%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 64.6M | ✅ | 249K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.2M | ✅ | 256K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 69.7M | ✅ | 236K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 217K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 61.6M | ✅ | 213K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 200K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 216K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 70.1M | ✅ | 152K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 63.0M | ✅ | 152K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 60.9M | ✅ | 92K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 49.6M | ✅ | 88K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 56.8M | ✅ | 160K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 80.3M | ✅ | 118K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 70.9M | ✅ | 110K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.9M | ✅ | 109K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.5M | ✅ | 52K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 67.0M | ✅ | 112K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.1M | ✅ | 106K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 53.5M | ✅ | 46K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 68.2M | ✅ | 109K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 51.8M | ✅ | 253K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 21.2M | ✅ | 241K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.5M | ✅ | 115K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.5M | ✅ | 74K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.0M | ✅ | 85K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.9M | ✅ | 110K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 51.7M | ✅ | 89K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.8M | ✅ | 52K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 47.6M | ✅ | 30K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.0M | ✅ | 113K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ✅ | 54K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 24.4M | ✅ | 70K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 51.1M | ✅ | 63K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.9M | ✅ | 63K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 42.8M | ✅ | 26K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 38.4M | ✅ | 47K | 🟢 **-100%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 53.7M | ✅ | 72K | 🟢 **-100%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 69.2M | ✅ | 68K | 🟢 **-100%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.9M | ✅ | 110K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.3M | ✅ | 72K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.0M | ✅ | 8K | 🟢 **-100%** |
| ref.json | refs with quote | 2 | ✅ | 51.3M | ✅ | 60K | 🟢 **-100%** |
| ref.json | Location-independent identifier | 2 | ✅ | 70.0M | ✅ | 99K | 🟢 **-100%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 48.6M | ✅ | 72K | 🟢 **-100%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 53.0M | ✅ | 158K | 🟢 **-100%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 48.7M | ✅ | 67K | 🟢 **-100%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 68.7M | ✅ | 98K | 🟢 **-100%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 67.4M | ✅ | 90K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.4M | ✅ | 80K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 44.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 38.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.6M | ✅ | 98K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 80.4M | ✅ | 116K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 49.7M | ✅ | 226K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.5M | ✅ | 231K | 🟢 **-99%** |
| type.json | integer type matches integers | 8 | ✅ | 57.6M | ✅ | 237K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 61.7M | ✅ | 240K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 60.8M | ✅ | 240K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 54.7M | ✅ | 236K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 57.4M | ✅ | 238K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.5M | ✅ | 237K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 59.0M | ✅ | 236K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.2M | ✅ | 234K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 69.7M | ✅ | 244K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 43.7M | ✅ | 236K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 64.4M | ✅ | 239K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.5M | ✅ | 252K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.2M | ✅ | 78K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ✅ | 76K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.1M | ✅ | 260K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.1M | ✅ | 80K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ✅ | 77K | 🟢 **-100%** |
| optional/bignum.json | integer | 2 | ✅ | 79.5M | ✅ | 249K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 79.8M | ✅ | 252K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 58.7M | ✅ | 233K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 255K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 245K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.5M | ✅ | 256K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 245K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.6M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.3M | ✅ | 227K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.5M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.3M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.7M | ✅ | 227K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 23.6M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.5M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.1M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 33.7M | ✅ | 233K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.5M | ✅ | 225K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 19.2M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.3M | ✅ | 231K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ✅ | 231K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.4M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.6M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ✅ | 116K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 135K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.0M | ✅ | 131K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 126K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ✅ | 115K | 🟢 **-99%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ✅ | 245K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.2M | ✅ | 256K | 🟢 **-100%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.2M | ✅ | 54K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.3M | ✅ | 232K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.6M | ✅ | 103K | 🟢 **-99%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 28K | 🟢 **-100%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.1M | ✅ | 68K | 🟢 **-100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 134.1M | ✅ | 68K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 61.1M | ✅ | 76K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 149.4M | ✅ | 290K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 62.1M | ✅ | 118K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.5M | ✅ | 42K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 36.5M | ✅ | 71K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 119K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 55.3M | ✅ | 175K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.5M | ✅ | 61K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.8M | ✅ | 130K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.2M | ✅ | 61K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 30.6M | ✅ | 112K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 81K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.9M | ✅ | 57K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.2M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 35.2M | ✅ | 51K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 41K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 61.0M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 151.8M | ✅ | 251K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 56.3M | ✅ | 208K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 183K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 66.7M | ✅ | 166K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.3M | ✅ | 123K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 63.5M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.7M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.6M | ✅ | 110K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 81.8M | ✅ | 64K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 65.4M | ✅ | 113K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 40.9M | ✅ | 109K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 73.1M | ✅ | 252K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.6M | ✅ | 253K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 56.1M | ✅ | 185K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ✅ | 58K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 68.3M | ✅ | 117K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.5M | ✅ | 112K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 60.1M | ✅ | 624K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.8M | ✅ | 505K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 55.8M | ✅ | 256K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 49.9M | ✅ | 246K | 🟢 **-100%** |
| const.json | const with array | 3 | ✅ | 46.9M | ✅ | 239K | 🟢 **-99%** |
| const.json | const with null | 2 | ✅ | 114.0M | ✅ | 257K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 57.6M | ✅ | 253K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 105.5M | ✅ | 254K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 47.0M | ✅ | 243K | 🟢 **-99%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 89.3M | ✅ | 243K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.7M | ✅ | 246K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 88.0M | ✅ | 246K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 48.9M | ✅ | 255K | 🟢 **-99%** |
| const.json | const with 1 does not match true | 3 | ✅ | 109.8M | ✅ | 257K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 52.1M | ✅ | 255K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 104.6M | ✅ | 255K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 52.5M | ✅ | 256K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 37.8M | ✅ | 253K | 🟢 **-99%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.3M | ✅ | 252K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 95.2M | ✅ | 117K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 51.1M | ✅ | 86K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 98.9M | ✅ | 194K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 55.6M | ✅ | 201K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 50.4M | ✅ | 56K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 64.4M | ✅ | 154K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 114K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 48.2M | ✅ | 113K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 69.5M | ✅ | 109K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.4M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.5M | ✅ | 147K | 🟢 **-100%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 75.6M | ✅ | 145K | 🟢 **-100%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 40.0M | ✅ | 128K | 🟢 **-100%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.8M | ✅ | 56K | 🟢 **-100%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 84.0M | ✅ | 148K | 🟢 **-100%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 10.4M | ✅ | 60K | 🟢 **-99%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 46.1M | ✅ | 61K | 🟢 **-100%** |
| enum.json | simple enum validation | 2 | ✅ | 59.1M | ✅ | 248K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 232K | 🟢 **-100%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 55.8M | ✅ | 251K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 15.5M | ✅ | 76K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 62.8M | ✅ | 252K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.8M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.7M | ✅ | 241K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.4M | ✅ | 250K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 38.1M | ✅ | 241K | 🟢 **-99%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 113.6M | ✅ | 254K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.6M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 108.1M | ✅ | 254K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 55.2M | ✅ | 249K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 81.6M | ✅ | 252K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.5M | ✅ | 258K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.5M | ✅ | 257K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 69.5M | ✅ | 261K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 157.1M | ✅ | 260K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 69.4M | ✅ | 259K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 159.8M | ✅ | 260K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 69.5M | ✅ | 260K | 🟢 **-100%** |
| format.json | json-pointer format | 6 | ✅ | 158.3M | ✅ | 260K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 69.6M | ✅ | 260K | 🟢 **-100%** |
| format.json | uri-reference format | 6 | ✅ | 151.0M | ✅ | 260K | 🟢 **-100%** |
| format.json | uri-template format | 6 | ✅ | 69.6M | ✅ | 261K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 25.3M | ✅ | 30K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 45.5M | ✅ | 111K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 89.3M | ✅ | 89K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 55.2M | ✅ | 144K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 131.5M | ✅ | 254K | 🟢 **-100%** |
| items.json | items with boolean schemas | 3 | ✅ | 48.0M | ✅ | 178K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 27.7M | ✅ | 16K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 11.4M | ✅ | 18K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 60.2M | ✅ | 114K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 62.0M | ✅ | 114K | 🟢 **-100%** |
| maxItems.json | maxItems validation | 4 | ✅ | 64.7M | ✅ | 261K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 57.8M | ✅ | 258K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 48.5M | ✅ | 253K | 🟢 **-99%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 47.8M | ✅ | 252K | 🟢 **-99%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 48.0M | ✅ | 259K | 🟢 **-99%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.3M | ✅ | 256K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.5M | ✅ | 254K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 62.7M | ✅ | 259K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 59.3M | ✅ | 259K | 🟢 **-100%** |
| minItems.json | minItems validation | 4 | ✅ | 57.8M | ✅ | 259K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 52.9M | ✅ | 256K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 50.5M | ✅ | 252K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 48.1M | ✅ | 252K | 🟢 **-99%** |
| minProperties.json | minProperties validation | 6 | ✅ | 51.9M | ✅ | 258K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.1M | ✅ | 254K | 🟢 **-99%** |
| minimum.json | minimum validation | 4 | ✅ | 63.9M | ✅ | 258K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 56.4M | ✅ | 259K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 62.6M | ✅ | 239K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 56.8M | ✅ | 219K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 53.5M | ✅ | 214K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 41.3M | ✅ | 201K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.2M | ✅ | 214K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 63.7M | ✅ | 152K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 54.9M | ✅ | 151K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 48.7M | ✅ | 90K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 45.1M | ✅ | 88K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.8M | ✅ | 159K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 50.0M | ✅ | 250K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 71.9M | ✅ | 264K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 73.0M | ✅ | 118K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 56.2M | ✅ | 109K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.8M | ✅ | 108K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 56.0M | ✅ | 215K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 73.1M | ✅ | 188K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 56.1M | ✅ | 196K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 55.9M | ✅ | 163K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.7M | ✅ | 54K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 59.6M | ✅ | 112K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 43.0M | ✅ | 105K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.8M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 59.3M | ✅ | 109K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 47.1M | ✅ | 257K | 🟢 **-99%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 22.5M | ✅ | 245K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.2M | ✅ | 110K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.6M | ✅ | 74K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.5M | ✅ | 84K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.3M | ✅ | 137K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.3M | ✅ | 110K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 47.8M | ✅ | 89K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.0M | ✅ | 51K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 43.0M | ✅ | 116K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 42.7M | ✅ | 30K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 48.4M | ✅ | 113K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.5M | ✅ | 54K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 35.6M | ✅ | 189K | 🟢 **-99%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.5M | ✅ | 143K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 69.9M | ✅ | 199K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.6M | ✅ | 191K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 36.5M | ✅ | 180K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 37.7M | ✅ | 161K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 21.3M | ✅ | 69K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.6M | ✅ | 62K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.1M | ✅ | 62K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 41.8M | ✅ | 26K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 35.7M | ✅ | 47K | 🟢 **-100%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.4M | ✅ | 72K | 🟢 **-100%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 44.6M | ✅ | 68K | 🟢 **-100%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 22.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 45.6M | ✅ | 108K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 45.1M | ✅ | 70K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 73.0M | ✅ | 105K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 54.0M | ✅ | 93K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.2M | ✅ | 8K | 🟢 **-100%** |
| ref.json | refs with quote | 2 | ✅ | 47.0M | ✅ | 59K | 🟢 **-100%** |
| ref.json | Location-independent identifier | 2 | ✅ | 40.1M | ✅ | 99K | 🟢 **-100%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 45.4M | ✅ | 97K | 🟢 **-100%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 43.8M | ✅ | 72K | 🟢 **-100%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 46.3M | ✅ | 157K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.0M | ✅ | 29K | 🟢 **-100%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 30.1M | ✅ | 30K | 🟢 **-100%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 35.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 45.4M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.5M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 39.4M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 39.4M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 36.2M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 42.5M | ✅ | 77K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.0M | ✅ | 98K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 63.9M | ✅ | 89K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.8M | ✅ | 80K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 39.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 31.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 29.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 34.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 34.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 55.2M | ✅ | 98K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 73.0M | ✅ | 115K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 73.0M | ✅ | 113K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 44.9M | ✅ | 226K | 🟢 **-99%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.3M | ✅ | 229K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 51.4M | ✅ | 238K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 53.5M | ✅ | 240K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 55.9M | ✅ | 239K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 49.9M | ✅ | 235K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 54.2M | ✅ | 236K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 55.6M | ✅ | 238K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 52.3M | ✅ | 235K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 55.2M | ✅ | 233K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 63.6M | ✅ | 243K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 54.4M | ✅ | 236K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 59.8M | ✅ | 238K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.4M | ✅ | 252K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.6M | ✅ | 78K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 16.5M | ✅ | 78K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 70.6M | ✅ | 262K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 60.4M | ✅ | 81K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 55.8M | ✅ | 77K | 🟢 **-100%** |
| optional/bignum.json | integer | 2 | ✅ | 71.6M | ✅ | 252K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 72.1M | ✅ | 253K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 53.9M | ✅ | 232K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 60.7M | ✅ | 256K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 52.0M | ✅ | 250K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 65.7M | ✅ | 258K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 52.0M | ✅ | 249K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.6M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.8M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.8M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.3M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.0M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.7M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.1M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.3M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.0M | ✅ | 226K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.8M | ✅ | 238K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.1M | ✅ | 233K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 233K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.8M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.5M | ✅ | 239K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 19.1M | ✅ | 157K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.4M | ✅ | 192K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.7M | ✅ | 185K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 176K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 7.9M | ✅ | 155K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.5M | ✅ | 249K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 39.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.3M | ✅ | 252K | 🟢 **-99%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 69.4M | ✅ | 258K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ✅ | 230K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 32.3M | ✅ | 54K | 🟢 **-100%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 40.6M | ✅ | 48K | 🟢 **-100%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 41.1M | ✅ | 48K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.9M | ✅ | 233K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.0M | ✅ | 104K | 🟢 **-99%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.3M | ✅ | 35K | 🟢 **-100%** |

### draft7

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 26K | 🟢 **-100%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 34.6M | ✅ | 38K | 🟢 **-100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 67K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 62.0M | ✅ | 74K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.2M | ✅ | 285K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 67.2M | ✅ | 115K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.1M | ✅ | 42K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 36.9M | ✅ | 71K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 117K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 66.1M | ✅ | 171K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.3M | ✅ | 59K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.9M | ✅ | 127K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.9M | ✅ | 61K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 29.2M | ✅ | 111K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.5M | ✅ | 80K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.0M | ✅ | 56K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 55.7M | ✅ | 114K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 36.2M | ✅ | 51K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ✅ | 41K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 58.4M | ✅ | 114K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 151.9M | ✅ | 247K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 56.3M | ✅ | 205K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.4M | ✅ | 179K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 66.1M | ✅ | 163K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 121K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 64.1M | ✅ | 113K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 113K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 109K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 66K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 65.2M | ✅ | 111K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.8M | ✅ | 107K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 73.2M | ✅ | 247K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 153.0M | ✅ | 248K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 55.1M | ✅ | 185K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ✅ | 58K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 68.4M | ✅ | 115K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 110K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 64.0M | ✅ | 616K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 163.5M | ✅ | 499K | 🟢 **-100%** |
| const.json | const validation | 3 | ✅ | 56.6M | ✅ | 250K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 47.5M | ✅ | 241K | 🟢 **-99%** |
| const.json | const with array | 3 | ✅ | 49.6M | ✅ | 235K | 🟢 **-100%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 249K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 61.5M | ✅ | 248K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 111.6M | ✅ | 248K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.7M | ✅ | 239K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ✅ | 238K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 25.2M | ✅ | 241K | 🟢 **-99%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.8M | ✅ | 241K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 52.8M | ✅ | 249K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 110.9M | ✅ | 251K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 54.4M | ✅ | 249K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 103.2M | ✅ | 250K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 27.5M | ✅ | 249K | 🟢 **-99%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 248K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.7M | ✅ | 248K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 90.1M | ✅ | 118K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 52.8M | ✅ | 86K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.7M | ✅ | 191K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 59.0M | ✅ | 199K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 51.7M | ✅ | 56K | 🟢 **-100%** |
| contains.json | contains with false if subschema | 2 | ✅ | 58.3M | ✅ | 145K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 124.0M | ✅ | 152K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 49.7M | ✅ | 113K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 74.5M | ✅ | 112K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.5M | ✅ | 109K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.5M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 54.2M | ✅ | 146K | 🟢 **-100%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 70.5M | ✅ | 144K | 🟢 **-100%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.2M | ✅ | 125K | 🟢 **-100%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 41.1M | ✅ | 56K | 🟢 **-100%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 49.1M | ✅ | 148K | 🟢 **-100%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.8M | ✅ | 59K | 🟢 **-100%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 18.2M | ✅ | 62K | 🟢 **-100%** |
| enum.json | simple enum validation | 2 | ✅ | 62.9M | ✅ | 243K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 41.8M | ✅ | 230K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 58.4M | ✅ | 248K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 75K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 56.9M | ✅ | 247K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 29.5M | ✅ | 245K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.7M | ✅ | 237K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 60.2M | ✅ | 245K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.2M | ✅ | 236K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 60.6M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.4M | ✅ | 243K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 57.8M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 54.1M | ✅ | 244K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.1M | ✅ | 247K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.6M | ✅ | 252K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 55.5M | ✅ | 253K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 69.4M | ✅ | 256K | 🟢 **-100%** |
| format.json | idn-email format | 6 | ✅ | 69.4M | ✅ | 255K | 🟢 **-100%** |
| format.json | regex format | 6 | ✅ | 69.6M | ✅ | 256K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 69.6M | ✅ | 256K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 68.8M | ✅ | 255K | 🟢 **-100%** |
| format.json | idn-hostname format | 6 | ✅ | 68.1M | ✅ | 256K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 69.4M | ✅ | 256K | 🟢 **-100%** |
| format.json | date format | 6 | ✅ | 69.5M | ✅ | 255K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 69.4M | ✅ | 255K | 🟢 **-100%** |
| format.json | time format | 6 | ✅ | 61.4M | ✅ | 256K | 🟢 **-100%** |
| format.json | json-pointer format | 6 | ✅ | 68.0M | ✅ | 257K | 🟢 **-100%** |
| format.json | relative-json-pointer format | 6 | ✅ | 68.0M | ✅ | 255K | 🟢 **-100%** |
| format.json | iri format | 6 | ✅ | 57.9M | ✅ | 255K | 🟢 **-100%** |
| format.json | iri-reference format | 6 | ✅ | 69.6M | ✅ | 255K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 68.1M | ✅ | 254K | 🟢 **-100%** |
| format.json | uri-reference format | 6 | ✅ | 69.5M | ✅ | 256K | 🟢 **-100%** |
| format.json | uri-template format | 6 | ✅ | 68.7M | ✅ | 256K | 🟢 **-100%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 75.2M | ✅ | 243K | 🟢 **-100%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 70.3M | ✅ | 265K | 🟢 **-100%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 68.4M | ✅ | 264K | 🟢 **-100%** |
| if-then-else.json | if and then without else | 3 | ✅ | 55.9M | ✅ | 173K | 🟢 **-100%** |
| if-then-else.json | if and else without then | 3 | ✅ | 56.2M | ✅ | 161K | 🟢 **-100%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 60.4M | ✅ | 144K | 🟢 **-100%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 68.4M | ✅ | 92K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 54.2M | ✅ | 153K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 60.5M | ✅ | 144K | 🟢 **-100%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 37.2M | ✅ | 148K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.7M | ✅ | 36K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 44.7M | ✅ | 111K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 55.6M | ✅ | 89K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 75.0M | ✅ | 144K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 55.7M | ✅ | 251K | 🟢 **-100%** |
| items.json | items with boolean schemas | 3 | ✅ | 55.0M | ✅ | 176K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 12.3M | ✅ | 16K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 11.5M | ✅ | 17K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 63.2M | ✅ | 114K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 67.2M | ✅ | 114K | 🟢 **-100%** |
| maxItems.json | maxItems validation | 4 | ✅ | 65.0M | ✅ | 255K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 61.0M | ✅ | 252K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 51.3M | ✅ | 248K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.6M | ✅ | 247K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 50.2M | ✅ | 254K | 🟢 **-99%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.8M | ✅ | 250K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.5M | ✅ | 251K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 64.1M | ✅ | 253K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 63.0M | ✅ | 252K | 🟢 **-100%** |
| minItems.json | minItems validation | 4 | ✅ | 65.2M | ✅ | 255K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 61.2M | ✅ | 251K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 50.6M | ✅ | 247K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.4M | ✅ | 247K | 🟢 **-99%** |
| minProperties.json | minProperties validation | 6 | ✅ | 51.3M | ✅ | 254K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.2M | ✅ | 250K | 🟢 **-99%** |
| minimum.json | minimum validation | 4 | ✅ | 64.1M | ✅ | 255K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 61.1M | ✅ | 254K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 64.5M | ✅ | 234K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 61.6M | ✅ | 216K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 56.2M | ✅ | 212K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 50.3M | ✅ | 199K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 55.5M | ✅ | 213K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 63.8M | ✅ | 150K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 58.1M | ✅ | 150K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 56.1M | ✅ | 91K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 45.1M | ✅ | 88K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 50.3M | ✅ | 158K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 50.4M | ✅ | 246K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 72.0M | ✅ | 258K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 73.1M | ✅ | 116K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 57.1M | ✅ | 108K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 27.9M | ✅ | 107K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 56.0M | ✅ | 213K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 73.1M | ✅ | 187K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 56.0M | ✅ | 193K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 55.9M | ✅ | 162K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.0M | ✅ | 54K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.6M | ✅ | 110K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 43.2M | ✅ | 104K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.7M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 108K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 49.2M | ✅ | 251K | 🟢 **-99%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 23.4M | ✅ | 242K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.0M | ✅ | 114K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.2M | ✅ | 73K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.0M | ✅ | 84K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ✅ | 135K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.3M | ✅ | 108K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 47.1M | ✅ | 89K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.5M | ✅ | 51K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.1M | ✅ | 115K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.3M | ✅ | 30K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 59.2M | ✅ | 112K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ✅ | 53K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 36.2M | ✅ | 186K | 🟢 **-99%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 17.4M | ✅ | 142K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 75.1M | ✅ | 198K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.9M | ✅ | 190K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 36.3M | ✅ | 179K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 37.9M | ✅ | 159K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 23.1M | ✅ | 70K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.8M | ✅ | 63K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.6M | ✅ | 63K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 41.8M | ✅ | 26K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 35.5M | ✅ | 47K | 🟢 **-100%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.5M | ✅ | 72K | 🟢 **-100%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 44.7M | ✅ | 68K | 🟢 **-100%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 22.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.6M | ✅ | 110K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 45.3M | ✅ | 72K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 73.2M | ✅ | 104K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 56.1M | ✅ | 93K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.2M | ✅ | 8K | 🟢 **-100%** |
| ref.json | refs with quote | 2 | ✅ | 45.4M | ✅ | 60K | 🟢 **-100%** |
| ref.json | Location-independent identifier | 2 | ✅ | 44.5M | ✅ | 98K | 🟢 **-100%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 44.4M | ✅ | 97K | 🟢 **-100%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 43.4M | ✅ | 72K | 🟢 **-100%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 49.4M | ✅ | 155K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.0M | ✅ | 29K | 🟢 **-100%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.0M | ✅ | 30K | 🟢 **-100%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 43.9M | ✅ | 66K | 🟢 **-100%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 36.2M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 45.5M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 45.3M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.5M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.9M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 43.0M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 37.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 44.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 45.0M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 43.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 44.5M | ✅ | 77K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.0M | ✅ | 98K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.0M | ✅ | 89K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 59.1M | ✅ | 79K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 43.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 42.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 41.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 28.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 29.6M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 37.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 35.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 35.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.7M | ✅ | 98K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 66.9M | ✅ | 115K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 62.5M | ✅ | 113K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 44.8M | ✅ | 222K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.7M | ✅ | 226K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 70.3M | ✅ | 232K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 56.7M | ✅ | 234K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 55.3M | ✅ | 234K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 50.6M | ✅ | 230K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 53.5M | ✅ | 230K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 55.0M | ✅ | 230K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 52.2M | ✅ | 230K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 55.1M | ✅ | 228K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 63.6M | ✅ | 238K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 56.1M | ✅ | 232K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 59.6M | ✅ | 233K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ✅ | 245K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.0M | ✅ | 78K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.8M | ✅ | 76K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 71.1M | ✅ | 254K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 60.5M | ✅ | 80K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 53.3M | ✅ | 77K | 🟢 **-100%** |
| optional/bignum.json | integer | 2 | ✅ | 71.5M | ✅ | 246K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 60.1M | ✅ | 248K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 54.4M | ✅ | 228K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 65.9M | ✅ | 251K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 52.1M | ✅ | 245K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 66.0M | ✅ | 250K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 52.0M | ✅ | 244K | 🟢 **-100%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 347K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 428K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.2M | ✅ | 224K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.9M | ✅ | 224K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.2M | ✅ | 225K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.2M | ✅ | 225K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.5M | ✅ | 223K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 225K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 21.8M | ✅ | 225K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.9M | ✅ | 225K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 22.6M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 221K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.4M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.6M | ✅ | 227K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ✅ | 229K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.9M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.1M | ✅ | 233K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.0M | ✅ | 156K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ✅ | 188K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.8M | ✅ | 182K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 174K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 154K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ✅ | 242K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ✅ | 244K | 🟢 **-99%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.2M | ✅ | 227K | 🟢 **-99%** |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.0M | ✅ | 245K | 🟢 **-99%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 62.7M | ✅ | 178K | 🟢 **-100%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.5M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 71.9M | ✅ | 250K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ✅ | 223K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 14.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 32.9M | ✅ | 53K | 🟢 **-100%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 51.6M | ✅ | 95K | 🟢 **-100%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 51.6M | ✅ | 95K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.3M | ✅ | 228K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.2M | ✅ | 102K | 🟢 **-99%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.6M | ✅ | 34K | 🟢 **-100%** |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.5M | ✅ | 23K | 🟢 **-100%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.6M | ✅ | 70K | 🟢 **-100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.0M | ✅ | 68K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.5M | ✅ | 76K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.3M | ✅ | 285K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 118K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.8M | ✅ | 42K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.3M | ✅ | 72K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 119K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ✅ | 175K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 48.4M | ✅ | 60K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.3M | ✅ | 129K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 61K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.1M | ✅ | 112K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.4M | ✅ | 80K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.9M | ✅ | 56K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 115K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.9M | ✅ | 80K | 🟢 **-100%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.5M | ✅ | 110K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 38.5M | ✅ | 52K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 42K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 61.0M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 151.7M | ✅ | 245K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.9M | ✅ | 206K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 181K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 80.6M | ✅ | 164K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 122K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.5M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.5M | ✅ | 110K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 67K | 🟢 **-100%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 69.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 48.7M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 69.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 71.5M | ✅ | 113K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.4M | ✅ | 109K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.8M | ✅ | 249K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 80.8M | ✅ | 248K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.9M | ✅ | 185K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.4M | ✅ | 57K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 76.0M | ✅ | 117K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 70.6M | ✅ | 110K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.7M | ✅ | 605K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 58.0M | ✅ | 491K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 61.9M | ✅ | 250K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 39.1M | ✅ | 240K | 🟢 **-99%** |
| const.json | const with array | 3 | ✅ | 54.4M | ✅ | 235K | 🟢 **-100%** |
| const.json | const with null | 2 | ✅ | 70.3M | ✅ | 251K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 67.6M | ✅ | 249K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 67.8M | ✅ | 247K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 61.3M | ✅ | 237K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 61.0M | ✅ | 237K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.4M | ✅ | 239K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 60.3M | ✅ | 241K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 58.1M | ✅ | 250K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 67.2M | ✅ | 250K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.4M | ✅ | 249K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 65.9M | ✅ | 250K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 59.4M | ✅ | 251K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.5M | ✅ | 247K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.6M | ✅ | 248K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 59.0M | ✅ | 116K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 46.8M | ✅ | 87K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 65.6M | ✅ | 191K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 65.2M | ✅ | 198K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 38.8M | ✅ | 55K | 🟢 **-100%** |
| contains.json | contains with false if subschema | 2 | ✅ | 63.4M | ✅ | 142K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 151K | 🟢 **-100%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 84.4M | ✅ | 259K | 🟢 **-100%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 81.1M | ✅ | 260K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 75.1M | ✅ | 258K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 71.0M | ✅ | 256K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 65.5M | ✅ | 114K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 51.5M | ✅ | 110K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 48.9M | ✅ | 109K | 🟢 **-100%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 84.6M | ✅ | 260K | 🟢 **-100%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.3M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 45.9M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 51.8M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 55.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.5M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 36.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 68.2M | ✅ | 242K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 43.3M | ✅ | 229K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.9M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 73K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.7M | ✅ | 247K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 67.6M | ✅ | 244K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 60.6M | ✅ | 237K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 67.9M | ✅ | 245K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 52.9M | ✅ | 236K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.0M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 61.2M | ✅ | 243K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.2M | ✅ | 248K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 59.1M | ✅ | 244K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 59.0M | ✅ | 247K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 63.1M | ✅ | 252K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 60.1M | ✅ | 253K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 77.2M | ✅ | 255K | 🟢 **-100%** |
| format.json | idn-email format | 6 | ✅ | 78.0M | ✅ | 254K | 🟢 **-100%** |
| format.json | regex format | 6 | ✅ | 69.3M | ✅ | 254K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 70.1M | ✅ | 254K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 74.0M | ✅ | 254K | 🟢 **-100%** |
| format.json | idn-hostname format | 6 | ✅ | 70.0M | ✅ | 255K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 70.1M | ✅ | 254K | 🟢 **-100%** |
| format.json | date format | 6 | ✅ | 68.0M | ✅ | 254K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 77.7M | ✅ | 255K | 🟢 **-100%** |
| format.json | time format | 6 | ✅ | 70.4M | ✅ | 254K | 🟢 **-100%** |
| format.json | json-pointer format | 6 | ✅ | 70.0M | ✅ | 255K | 🟢 **-100%** |
| format.json | relative-json-pointer format | 6 | ✅ | 69.9M | ✅ | 254K | 🟢 **-100%** |
| format.json | iri format | 6 | ✅ | 70.1M | ✅ | 254K | 🟢 **-100%** |
| format.json | iri-reference format | 6 | ✅ | 70.2M | ✅ | 254K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 70.3M | ✅ | 254K | 🟢 **-100%** |
| format.json | uri-reference format | 6 | ✅ | 68.5M | ✅ | 254K | 🟢 **-100%** |
| format.json | uri-template format | 6 | ✅ | 70.2M | ✅ | 253K | 🟢 **-100%** |
| format.json | uuid format | 6 | ✅ | 70.1M | ✅ | 254K | 🟢 **-100%** |
| format.json | duration format | 6 | ✅ | 70.1M | ✅ | 253K | 🟢 **-100%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 75.9M | ✅ | 241K | 🟢 **-100%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 83.3M | ✅ | 262K | 🟢 **-100%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 75.6M | ✅ | 261K | 🟢 **-100%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.3M | ✅ | 172K | 🟢 **-100%** |
| if-then-else.json | if and else without then | 3 | ✅ | 67.8M | ✅ | 160K | 🟢 **-100%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 63.8M | ✅ | 142K | 🟢 **-100%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 75.8M | ✅ | 93K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 68.3M | ✅ | 153K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 67.9M | ✅ | 142K | 🟢 **-100%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.0M | ✅ | 147K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.1M | ✅ | 35K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 50.6M | ✅ | 111K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 62.6M | ✅ | 93K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 77.5M | ✅ | 143K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 65.3M | ✅ | 251K | 🟢 **-100%** |
| items.json | items with boolean schemas | 3 | ✅ | 50.2M | ✅ | 176K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 12.9M | ✅ | 14K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 13.0M | ✅ | 17K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 114K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 115K | 🟢 **-100%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 83.4M | ✅ | 262K | 🟢 **-100%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 55.4M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 60.9M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 55.6M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 71.4M | ✅ | 256K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 253K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 54.6M | ✅ | 251K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.0M | ✅ | 248K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 256K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.1M | ✅ | 252K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.8M | ✅ | 254K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 69.8M | ✅ | 256K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.5M | ✅ | 256K | 🟢 **-100%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 83.5M | ✅ | 261K | 🟢 **-100%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 64.9M | ✅ | 163K | 🟢 **-100%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 57.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 61.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 54.0M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 53.2M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 83.4M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.1M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 71.0M | ✅ | 257K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.1M | ✅ | 253K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 53.9M | ✅ | 250K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.8M | ✅ | 249K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.9M | ✅ | 257K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.8M | ✅ | 254K | 🟢 **-99%** |
| minimum.json | minimum validation | 4 | ✅ | 69.6M | ✅ | 257K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.0M | ✅ | 256K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 70.7M | ✅ | 236K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 217K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 61.5M | ✅ | 213K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 202K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.7M | ✅ | 216K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 69.5M | ✅ | 153K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 64.4M | ✅ | 152K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 62.8M | ✅ | 91K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 50.6M | ✅ | 89K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 56.1M | ✅ | 160K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 58.1M | ✅ | 247K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.4M | ✅ | 261K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 80.8M | ✅ | 118K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.4M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 61.9M | ✅ | 110K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.9M | ✅ | 108K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.7M | ✅ | 215K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.6M | ✅ | 189K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.2M | ✅ | 196K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.4M | ✅ | 164K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.3M | ✅ | 54K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 68.7M | ✅ | 113K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.7M | ✅ | 104K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.5M | ✅ | 63K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 68.5M | ✅ | 109K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 49.2M | ✅ | 254K | 🟢 **-99%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.6M | ✅ | 244K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.7M | ✅ | 114K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 73K | 🟢 **-100%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 85K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 136K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 110K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 52.0M | ✅ | 90K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ✅ | 51K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 43.8M | ✅ | 117K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 49.1M | ✅ | 29K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.2M | ✅ | 113K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.1M | ✅ | 55K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.4M | ✅ | 189K | 🟢 **-99%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ✅ | 144K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.2M | ✅ | 198K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.2M | ✅ | 191K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.5M | ✅ | 181K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.8M | ✅ | 161K | 🟢 **-100%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.0M | ✅ | 55K | 🟢 **-98%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.0M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.7M | ✅ | 70K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.8M | ✅ | 63K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 54.8M | ✅ | 63K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.4M | ✅ | 34K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 37.6M | ✅ | 74K | 🟢 **-100%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 42.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.7M | ✅ | 110K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.8M | ✅ | 70K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.6M | ✅ | 148K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.9M | ✅ | 138K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 49.1M | ✅ | 70K | 🟢 **-100%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.0M | ✅ | 238K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 67.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 36.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 39.1M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.0M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.3M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.5M | ✅ | 142K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 67.6M | ✅ | 132K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.1M | ✅ | 96K | 🟢 **-100%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.7M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 47.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 45.4M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 48.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 37.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.9M | ✅ | 99K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 116K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 80.7M | ✅ | 114K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 48.3M | ✅ | 226K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.8M | ✅ | 231K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 60.0M | ✅ | 238K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 62.1M | ✅ | 240K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 61.8M | ✅ | 239K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 54.7M | ✅ | 235K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 57.9M | ✅ | 236K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.6M | ✅ | 236K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 59.3M | ✅ | 234K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 59.5M | ✅ | 233K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 69.6M | ✅ | 243K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 63.9M | ✅ | 237K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 69.6M | ✅ | 239K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 74.7M | ✅ | 262K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 55.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 48.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 64.7M | ✅ | 94K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 52.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 71.6M | ✅ | 95K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 42.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 39.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 74.0M | ✅ | 76K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 18.5M | ✅ | 73K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 13.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 39.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 43.8M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.0M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 68.2M | ✅ | 262K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 68.9M | ✅ | 263K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 18.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 40.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.1M | ✅ | 254K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 36.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 63.7M | ✅ | 99K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.6M | ✅ | 70K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.4M | ✅ | 87K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 27.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 29.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.7M | ✅ | 87K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.6M | ✅ | 87K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.1M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 30.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 51.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.6M | ✅ | 30K | 🟢 **-100%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 69.6M | ✅ | 262K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.2M | ✅ | 263K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.4M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ✅ | 250K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ✅ | 79K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.0M | ✅ | 76K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.9M | ✅ | 261K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 65.7M | ✅ | 81K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ✅ | 77K | 🟢 **-100%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 49.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 56.2M | ✅ | 243K | 🟢 **-100%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.4M | ✅ | 250K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 79.9M | ✅ | 255K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 57.7M | ✅ | 233K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 259K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 249K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 259K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 250K | 🟢 **-100%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.3M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 65.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 60.3M | ✅ | 147K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 85.1M | ✅ | 145K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.9M | ✅ | 127K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.4M | ✅ | 90K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 51.8M | ✅ | 69K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 56.5M | ✅ | 149K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.3M | ✅ | 84K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 26.5M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.8M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.8M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.7M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.6M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.4M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.3M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.5M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 34.9M | ✅ | 227K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 12.1M | ✅ | 238K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.9M | ✅ | 233K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ✅ | 233K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.6M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.6M | ✅ | 238K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.0M | ✅ | 156K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 190K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.4M | ✅ | 183K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.6M | ✅ | 176K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ✅ | 155K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.3M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.6M | ✅ | 249K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.9M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.0M | ✅ | 249K | 🟢 **-99%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.9M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.2M | ✅ | 234K | 🟢 **-99%** |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.2M | ✅ | 249K | 🟢 **-99%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 67.4M | ✅ | 181K | 🟢 **-100%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 39.5M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.1M | ✅ | 257K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 227K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.9M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.9M | ✅ | 248K | 🟢 **-98%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.1M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.4M | ✅ | 253K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.3M | ✅ | 233K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.4M | ✅ | 105K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 49.2M | ✅ | 73K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 49.4M | ✅ | 72K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 51.4M | ✅ | 53K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 69.5M | ✅ | 147K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 50.8M | ✅ | 52K | 🟢 **-100%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.6M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 39.3M | ✅ | 33K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.7M | ✅ | 135K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 52K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.5M | ✅ | 113K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.3M | ✅ | 81K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.1M | ✅ | 57K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 64.6M | ✅ | 116K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.7M | ✅ | 81K | 🟢 **-100%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.6M | ✅ | 110K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 40.1M | ✅ | 50K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 42K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.4M | ✅ | 248K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 207K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 182K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 165K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.1M | ✅ | 122K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 114K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.4M | ✅ | 110K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.2M | ✅ | 67K | 🟢 **-100%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.6M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 50.4M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 81.8M | ✅ | 111K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.5M | ✅ | 107K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 89.9M | ✅ | 243K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 57.1M | ✅ | 245K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 179K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.5M | ✅ | 56K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ✅ | 115K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 109K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.3M | ✅ | 617K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 59.4M | ✅ | 492K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 66.7M | ✅ | 246K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 40.3M | ✅ | 235K | 🟢 **-99%** |
| const.json | const with array | 3 | ✅ | 55.2M | ✅ | 232K | 🟢 **-100%** |
| const.json | const with null | 2 | ✅ | 78.7M | ✅ | 247K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.7M | ✅ | 246K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 73.1M | ✅ | 246K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 56.8M | ✅ | 234K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.4M | ✅ | 235K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 66.3M | ✅ | 238K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 59.4M | ✅ | 238K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 40.1M | ✅ | 245K | 🟢 **-99%** |
| const.json | const with 1 does not match true | 3 | ✅ | 38.4M | ✅ | 248K | 🟢 **-99%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 40.8M | ✅ | 246K | 🟢 **-99%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 68.8M | ✅ | 246K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 247K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 49.6M | ✅ | 244K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.0M | ✅ | 245K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 64.7M | ✅ | 114K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 54.2M | ✅ | 85K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.0M | ✅ | 189K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.8M | ✅ | 197K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 41.1M | ✅ | 55K | 🟢 **-100%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.7M | ✅ | 144K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 152K | 🟢 **-100%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 90.4M | ✅ | 255K | 🟢 **-100%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 96.0M | ✅ | 256K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 74.7M | ✅ | 253K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 79.0M | ✅ | 250K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 113K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 111K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 54.9M | ✅ | 108K | 🟢 **-100%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 64.0M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 256K | 🟢 **-100%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 46.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 29.3M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 30.1M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.8M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 39.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 12.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.3M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 11.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.8M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 15.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.5M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.1M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.0M | ✅ | 240K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.7M | ✅ | 227K | 🟢 **-100%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 244K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 71K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.7M | ✅ | 243K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.0M | ✅ | 241K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.1M | ✅ | 235K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 72.4M | ✅ | 241K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.2M | ✅ | 235K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.9M | ✅ | 240K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.4M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 242K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 243K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 248K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ✅ | 249K | 🟢 **-100%** |
| format.json | email format | 7 | ✅ | 95.7M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 96.0M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 95.7M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 78.4M | ✅ | 250K | 🟢 **-100%** |
| format.json | hostname format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 78.4M | ✅ | 249K | 🟢 **-100%** |
| format.json | time format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 78.4M | ✅ | 250K | 🟢 **-100%** |
| format.json | iri-reference format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 78.6M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 78.2M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 78.5M | ✅ | 246K | 🟢 **-100%** |
| format.json | uuid format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 78.5M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.2M | ✅ | 237K | 🟢 **-100%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.6M | ✅ | 259K | 🟢 **-100%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.1M | ✅ | 258K | 🟢 **-100%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ✅ | 171K | 🟢 **-100%** |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ✅ | 158K | 🟢 **-100%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.9M | ✅ | 141K | 🟢 **-100%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 91K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ✅ | 153K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.4M | ✅ | 143K | 🟢 **-100%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.8M | ✅ | 146K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.4M | ✅ | 35K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 53.9M | ✅ | 109K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 143K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 72.0M | ✅ | 247K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 12.8M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 17K | 🟢 **-100%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.6M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 45.9M | ✅ | 74K | 🟢 **-100%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.1M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 113K | 🟢 **-100%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 256K | 🟢 **-100%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 61.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 78.9M | ✅ | 252K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 248K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.3M | ✅ | 246K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 245K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.4M | ✅ | 250K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.4M | ✅ | 247K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.2M | ✅ | 247K | 🟢 **-100%** |
| maximum.json | maximum validation | 4 | ✅ | 78.6M | ✅ | 250K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ✅ | 250K | 🟢 **-100%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 256K | 🟢 **-100%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.7M | ✅ | 160K | 🟢 **-100%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.6M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 65.8M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 59.0M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 53.9M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 71.7M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 70.2M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 80.6M | ✅ | 250K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 246K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 245K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ✅ | 244K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ✅ | 250K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.9M | ✅ | 246K | 🟢 **-100%** |
| minimum.json | minimum validation | 4 | ✅ | 76.6M | ✅ | 250K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 249K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 77.4M | ✅ | 231K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 73.2M | ✅ | 214K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 208K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 197K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 210K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 149K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 71.0M | ✅ | 149K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 68.7M | ✅ | 90K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 51.9M | ✅ | 88K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.0M | ✅ | 156K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.4M | ✅ | 241K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 89.9M | ✅ | 255K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 89.9M | ✅ | 115K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.2M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ✅ | 107K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.1M | ✅ | 105K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 206K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ✅ | 183K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 188K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 161K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ✅ | 53K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 109K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 49.5M | ✅ | 103K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 48.7M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 107K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 54.1M | ✅ | 247K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 238K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ✅ | 110K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.9M | ✅ | 73K | 🟢 **-100%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.5M | ✅ | 84K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.5M | ✅ | 135K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 109K | 🟢 **-99%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.0M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.6M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 255K | 🟢 **-100%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 254K | 🟢 **-100%** |
| properties.json | object properties validation | 6 | ✅ | 55.9M | ✅ | 88K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 16.5M | ✅ | 50K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ✅ | 116K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ✅ | 29K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 111K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.5M | ✅ | 53K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.9M | ✅ | 185K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.0M | ✅ | 142K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 194K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.2M | ✅ | 188K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ✅ | 178K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ✅ | 159K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ✅ | 70K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.8M | ✅ | 63K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.9M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.1M | ✅ | 34K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 38.8M | ✅ | 72K | 🟢 **-100%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.4M | ✅ | 109K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.8M | ✅ | 69K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ✅ | 145K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 137K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 53.7M | ✅ | 69K | 🟢 **-100%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.5M | ✅ | 234K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.1M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.3M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.8M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.8M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 141K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 129K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 92K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 44.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 49.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 39.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 48.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.5M | ✅ | 95K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 89.9M | ✅ | 113K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 89.9M | ✅ | 111K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 51.6M | ✅ | 222K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 28.0M | ✅ | 225K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 66.9M | ✅ | 232K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 68.5M | ✅ | 235K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 235K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 230K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 63.8M | ✅ | 230K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.1M | ✅ | 230K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 230K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.4M | ✅ | 228K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 238K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 71.6M | ✅ | 230K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 233K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 256K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 60.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 92K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 52.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 72.9M | ✅ | 118K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 43.8M | ✅ | 67K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 50.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.9M | ✅ | 92K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.2M | ✅ | 117K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 50.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 50.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 46.2M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.6M | ✅ | 255K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 254K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 256K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 29.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 93.9M | ✅ | 135K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 33.2M | ✅ | 98K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.6M | ✅ | 70K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 87K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 12.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 87K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 87K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ✅ | 30K | 🟢 **-100%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 76.9M | ✅ | 255K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 254K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.9M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 245K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.1M | ✅ | 240K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 52.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ✅ | 254K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.0M | ✅ | 252K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.9M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 237K | 🟢 **-100%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 63.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 245K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 247K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 227K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 250K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ✅ | 242K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 250K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 242K | 🟢 **-100%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 42.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ✅ | 143K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 142K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.4M | ✅ | 124K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 49.3M | ✅ | 88K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.5M | ✅ | 67K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 56.0M | ✅ | 147K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.3M | ✅ | 82K | 🟢 **-100%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.1M | ✅ | 223K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 224K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 224K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.4M | ✅ | 223K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.2M | ✅ | 222K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.3M | ✅ | 226K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 16.8M | ✅ | 224K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.1M | ✅ | 224K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.3M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.5M | ✅ | 220K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ✅ | 225K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ✅ | 225K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.0M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.7M | ✅ | 155K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.1M | ✅ | 186K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.2M | ✅ | 180K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.4M | ✅ | 173K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 152K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.2M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.4M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.9M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.6M | ✅ | 243K | 🟢 **-99%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.4M | ✅ | 228K | 🟢 **-99%** |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.9M | ✅ | 244K | 🟢 **-99%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.8M | ✅ | 180K | 🟢 **-100%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.3M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 93.5M | ✅ | 249K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 223K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ✅ | 242K | 🟢 **-98%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 22.2M | ✅ | 231K | 🟢 **-99%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.7M | ✅ | 232K | 🟢 **-99%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.2M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 65.6M | ✅ | 248K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.9M | ✅ | 227K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ✅ | 102K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 52.8M | ✅ | 72K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 52.8M | ✅ | 71K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.8M | ✅ | 52K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 144K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.6M | ✅ | 51K | 🟢 **-100%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.2M | ❌ | - | - |
