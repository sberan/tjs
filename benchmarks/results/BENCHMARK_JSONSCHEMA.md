# tjs vs jsonschema Benchmarks

Performance comparison of **tjs** vs **[jsonschema](https://www.npmjs.com/package/jsonschema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | jsonschema pass | jsonschema ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.9M | 182/199 | 108K | 182 | 🟢 **-100%** |
| draft6 | 276 | ✅ 276 | 28.5M | 249/276 | 120K | 249 | 🟢 **-100%** |
| draft7 | 313 | ✅ 313 | 14.8M | 272/313 | 127K | 272 | 🟢 **-99%** |
| draft2019-09 | 435 | ✅ 435 | 19.3M | 295/435 | 136K | 295 | 🟢 **-99%** |
| draft2020-12 | 448 | ✅ 448 | 18.6M | 268/448 | 139K | 268 | 🟢 **-99%** |
| **Total** | 1671 | 1670/1671 | 19.5M | 1266/1671 | 127K | 1266 | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **289.78x faster** (27 ns vs 7903 ns per test, 4986 tests in 1266 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 47.5M | ✅ | 27K | 🟢 **-100%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 90.7M | ✅ | 67K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 129.0M | ✅ | 74K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 94.4M | ✅ | 286K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 132.2M | ✅ | 118K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 34.7M | ✅ | 42K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.8M | ✅ | 72K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.9M | ✅ | 119K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 166.2M | ✅ | 175K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 36.9M | ✅ | 33K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.4M | ✅ | 130K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 32.8M | ✅ | 62K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 37.5M | ✅ | 113K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 89.9M | ✅ | 81K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.4M | ✅ | 57K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.3M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 39.2M | ✅ | 48K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 24.2M | ✅ | 41K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 122.9M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 89.4M | ✅ | 167K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 166.1M | ✅ | 124K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 76.4M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 125.4M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 75.5M | ✅ | 112K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.6M | ✅ | 66K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 78.7M | ✅ | 114K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.9M | ✅ | 110K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.9M | ✅ | 56K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 176.3M | ✅ | 118K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.2M | ✅ | 111K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 104.8M | ✅ | 116K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 53.8M | ✅ | 113K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 67.8M | ✅ | 111K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.4M | ✅ | 147K | 🟢 **-100%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.0M | ✅ | 129K | 🟢 **-100%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 49.1M | ✅ | 54K | 🟢 **-100%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 12.0M | ✅ | 59K | 🟢 **-100%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 40.9M | ✅ | 61K | 🟢 **-100%** |
| enum.json | simple enum validation | 2 | ✅ | 75.5M | ✅ | 249K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.7M | ✅ | 233K | 🟢 **-100%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.6M | ✅ | 251K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 15.1M | ✅ | 69K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 58.1M | ✅ | 253K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 119.7M | ✅ | 250K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.0M | ✅ | 242K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 117.7M | ✅ | 250K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 55.5M | ✅ | 242K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 254K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.6M | ✅ | 251K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 110.1M | ✅ | 252K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 63.7M | ✅ | 249K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 97.0M | ✅ | 250K | 🟢 **-100%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ✅ | 247K | 🟢 **-100%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 89.7M | ✅ | 248K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 81.6M | ✅ | 258K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 152.6M | ✅ | 257K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 90.4M | ✅ | 258K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 156.0M | ✅ | 258K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 81.4M | ✅ | 258K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 157.7M | ✅ | 259K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.0M | ✅ | 36K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 64.8M | ✅ | 112K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 53.6M | ✅ | 89K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 27.8M | ✅ | 17K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 12.4M | ✅ | 17K | 🟢 **-100%** |
| items.json | items with null instance elements | 1 | ✅ | 77.5M | ✅ | 114K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 81.0M | ✅ | 114K | 🟢 **-100%** |
| maxItems.json | maxItems validation | 4 | ✅ | 67.5M | ✅ | 257K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.1M | ✅ | 252K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.3M | ✅ | 257K | 🟢 **-100%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.0M | ✅ | 254K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 69.4M | ✅ | 257K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.8M | ✅ | 258K | 🟢 **-100%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 71.3M | ✅ | 256K | 🟢 **-100%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 69.3M | ✅ | 252K | 🟢 **-100%** |
| minItems.json | minItems validation | 4 | ✅ | 68.6M | ✅ | 258K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 53.7M | ✅ | 250K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.5M | ✅ | 258K | 🟢 **-100%** |
| minimum.json | minimum validation | 4 | ✅ | 76.6M | ✅ | 257K | 🟢 **-100%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 56.2M | ✅ | 256K | 🟢 **-100%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 68.6M | ✅ | 252K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.7M | ✅ | 256K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 78.5M | ✅ | 237K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 72.8M | ✅ | 218K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 61.4M | ✅ | 214K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.7M | ✅ | 202K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 70.3M | ✅ | 217K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 77.4M | ✅ | 151K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 70.8M | ✅ | 148K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 70.1M | ✅ | 91K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 41.3M | ✅ | 89K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 63.6M | ✅ | 160K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 88.9M | ✅ | 118K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 69.7M | ✅ | 110K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.4M | ✅ | 108K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.5M | ✅ | 52K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 75.5M | ✅ | 112K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 47.0M | ✅ | 104K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.4M | ✅ | 46K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 75.0M | ✅ | 110K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 55.2M | ✅ | 255K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 15.7M | ✅ | 246K | 🟢 **-98%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.6M | ✅ | 116K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.8M | ✅ | 73K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.7M | ✅ | 84K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.2M | ✅ | 110K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 47.2M | ✅ | 89K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 16.9M | ✅ | 51K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 43.2M | ✅ | 30K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 71.0M | ✅ | 113K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.3M | ✅ | 53K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 23.0M | ✅ | 70K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.9M | ✅ | 63K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.2M | ✅ | 62K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.6M | ✅ | 27K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 28.6M | ✅ | 47K | 🟢 **-100%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.1M | ✅ | 72K | 🟢 **-100%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 76.5M | ✅ | 67K | 🟢 **-100%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 19.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 42.9M | ✅ | 109K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.5M | ✅ | 71K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.5M | ✅ | 8K | 🟢 **-100%** |
| ref.json | refs with quote | 2 | ✅ | 46.2M | ✅ | 59K | 🟢 **-100%** |
| ref.json | Location-independent identifier | 2 | ✅ | 76.6M | ✅ | 99K | 🟢 **-100%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 36.8M | ✅ | 72K | 🟢 **-100%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.3M | ✅ | 159K | 🟢 **-100%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 41.3M | ✅ | 67K | 🟢 **-100%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 75.5M | ✅ | 98K | 🟢 **-100%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 75.5M | ✅ | 90K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 69.5M | ✅ | 80K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 34.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 31.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 33.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 21.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 32.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.8M | ✅ | 98K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 90.2M | ✅ | 116K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 43.8M | ✅ | 227K | 🟢 **-99%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.4M | ✅ | 230K | 🟢 **-99%** |
| type.json | integer type matches integers | 8 | ✅ | 59.3M | ✅ | 237K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 68.0M | ✅ | 240K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 66.2M | ✅ | 241K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 57.7M | ✅ | 236K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 62.0M | ✅ | 237K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 65.3M | ✅ | 239K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 64.1M | ✅ | 236K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.6M | ✅ | 234K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 243K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 70.7M | ✅ | 236K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 76.3M | ✅ | 239K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 15.8M | ✅ | 252K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.3M | ✅ | 78K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.7M | ✅ | 76K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.4M | ✅ | 261K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 67.8M | ✅ | 81K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 71.9M | ✅ | 77K | 🟢 **-100%** |
| optional/bignum.json | integer | 2 | ✅ | 83.6M | ✅ | 251K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 87.7M | ✅ | 254K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 234K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 79.8M | ✅ | 258K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 61.8M | ✅ | 248K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 79.8M | ✅ | 259K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 61.5M | ✅ | 247K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.4M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.8M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.8M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.9M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.6M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.2M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.2M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.8M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.2M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.0M | ✅ | 227K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.7M | ✅ | 238K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.3M | ✅ | 233K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ✅ | 238K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.7M | ✅ | 239K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.2M | ✅ | 116K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.0M | ✅ | 135K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 15.4M | ✅ | 131K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 127K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 116K | 🟢 **-99%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 27.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.7M | ✅ | 247K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 81.2M | ✅ | 258K | 🟢 **-100%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.0M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 30.6M | ✅ | 54K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 31.6M | ✅ | 232K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.7M | ✅ | 103K | 🟢 **-99%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 35K | 🟢 **-100%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 68K | 🟢 **-100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.2M | ✅ | 67K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.7M | ✅ | 75K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.2M | ✅ | 285K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 117K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.7M | ✅ | 42K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.1M | ✅ | 71K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 118K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ✅ | 174K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.2M | ✅ | 61K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.5M | ✅ | 129K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.9M | ✅ | 61K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.9M | ✅ | 112K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.4M | ✅ | 81K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.0M | ✅ | 56K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.1M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 38.0M | ✅ | 50K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 42K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 66.7M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.1M | ✅ | 252K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.8M | ✅ | 207K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 182K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.5M | ✅ | 166K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.3M | ✅ | 123K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.6M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 111K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 67K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 72.0M | ✅ | 113K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.5M | ✅ | 109K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.6M | ✅ | 251K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 113.9M | ✅ | 251K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.8M | ✅ | 186K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 65.4M | ✅ | 56K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 75.9M | ✅ | 117K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 111K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.8M | ✅ | 628K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.5M | ✅ | 508K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 54.6M | ✅ | 253K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 49.7M | ✅ | 246K | 🟢 **-100%** |
| const.json | const with array | 3 | ✅ | 53.1M | ✅ | 239K | 🟢 **-100%** |
| const.json | const with null | 2 | ✅ | 119.3M | ✅ | 255K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 65.4M | ✅ | 253K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 253K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 59.7M | ✅ | 242K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ✅ | 242K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.0M | ✅ | 244K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.8M | ✅ | 244K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 57.1M | ✅ | 253K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 256K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 60.7M | ✅ | 253K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 112.8M | ✅ | 253K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 59.7M | ✅ | 254K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 252K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.0M | ✅ | 252K | 🟢 **-99%** |
| contains.json | contains keyword validation | 6 | ✅ | 89.2M | ✅ | 118K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.9M | ✅ | 87K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.5M | ✅ | 194K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 55.4M | ✅ | 200K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 51.5M | ✅ | 54K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 154K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 107.4M | ✅ | 114K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 49.6M | ✅ | 113K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 75.3M | ✅ | 110K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.3M | ✅ | 147K | 🟢 **-100%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 85.0M | ✅ | 146K | 🟢 **-100%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 38.0M | ✅ | 128K | 🟢 **-100%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 43.6M | ✅ | 55K | 🟢 **-100%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 40.2M | ✅ | 151K | 🟢 **-100%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 14.9M | ✅ | 58K | 🟢 **-100%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 24.5M | ✅ | 61K | 🟢 **-100%** |
| enum.json | simple enum validation | 2 | ✅ | 68.6M | ✅ | 248K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.6M | ✅ | 233K | 🟢 **-100%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.1M | ✅ | 251K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 15.7M | ✅ | 72K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.7M | ✅ | 253K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.6M | ✅ | 250K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.1M | ✅ | 241K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 104.8M | ✅ | 251K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.2M | ✅ | 242K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 102.9M | ✅ | 253K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 55.6M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 252K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 59.3M | ✅ | 248K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.2M | ✅ | 252K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 30.4M | ✅ | 257K | 🟢 **-99%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.4M | ✅ | 256K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 75.6M | ✅ | 261K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 155.5M | ✅ | 260K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 75.1M | ✅ | 260K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 157.9M | ✅ | 259K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 82.0M | ✅ | 259K | 🟢 **-100%** |
| format.json | json-pointer format | 6 | ✅ | 160.8M | ✅ | 259K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 81.1M | ✅ | 259K | 🟢 **-100%** |
| format.json | uri-reference format | 6 | ✅ | 154.4M | ✅ | 259K | 🟢 **-100%** |
| format.json | uri-template format | 6 | ✅ | 81.4M | ✅ | 259K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.6M | ✅ | 36K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 50.5M | ✅ | 112K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 107.8M | ✅ | 91K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 83.6M | ✅ | 145K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 131.5M | ✅ | 254K | 🟢 **-100%** |
| items.json | items with boolean schemas | 3 | ✅ | 59.8M | ✅ | 178K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 18.2M | ✅ | 15K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 17K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 116K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.5M | ✅ | 116K | 🟢 **-100%** |
| maxItems.json | maxItems validation | 4 | ✅ | 71.4M | ✅ | 260K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.4M | ✅ | 255K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 54.3M | ✅ | 251K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.1M | ✅ | 250K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.6M | ✅ | 259K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 45.0M | ✅ | 255K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.8M | ✅ | 254K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 70.0M | ✅ | 259K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.3M | ✅ | 258K | 🟢 **-100%** |
| minItems.json | minItems validation | 4 | ✅ | 70.8M | ✅ | 259K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 256K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 53.6M | ✅ | 253K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.9M | ✅ | 252K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.6M | ✅ | 260K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.4M | ✅ | 255K | 🟢 **-99%** |
| minimum.json | minimum validation | 4 | ✅ | 68.5M | ✅ | 261K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.5M | ✅ | 259K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 70.6M | ✅ | 238K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 220K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 61.6M | ✅ | 215K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 203K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 217K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 70.0M | ✅ | 153K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 64.8M | ✅ | 153K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 61.3M | ✅ | 92K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 49.7M | ✅ | 89K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.9M | ✅ | 161K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.9M | ✅ | 251K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.4M | ✅ | 262K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 80.7M | ✅ | 118K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 62.0M | ✅ | 110K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.2M | ✅ | 109K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.7M | ✅ | 217K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 78.5M | ✅ | 192K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.6M | ✅ | 198K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.7M | ✅ | 165K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.2M | ✅ | 53K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 68.3M | ✅ | 113K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.1M | ✅ | 106K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.7M | ✅ | 63K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.1M | ✅ | 110K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 52.0M | ✅ | 257K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.1M | ✅ | 247K | 🟢 **-98%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.3M | ✅ | 112K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 72K | 🟢 **-100%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 85K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.5M | ✅ | 137K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 111K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 52.2M | ✅ | 87K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ✅ | 50K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.0M | ✅ | 118K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 48.2M | ✅ | 30K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.1M | ✅ | 114K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ✅ | 54K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.9M | ✅ | 187K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 143K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.5M | ✅ | 199K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.0M | ✅ | 192K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.0M | ✅ | 180K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.6M | ✅ | 160K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 24.5M | ✅ | 70K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.6M | ✅ | 64K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.6M | ✅ | 63K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 44.0M | ✅ | 27K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 37.1M | ✅ | 47K | 🟢 **-100%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.8M | ✅ | 73K | 🟢 **-100%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.1M | ✅ | 68K | 🟢 **-100%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.7M | ✅ | 110K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.8M | ✅ | 72K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.7M | ✅ | 105K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.8M | ✅ | 94K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ✅ | 8K | 🟢 **-100%** |
| ref.json | refs with quote | 2 | ✅ | 49.3M | ✅ | 60K | 🟢 **-100%** |
| ref.json | Location-independent identifier | 2 | ✅ | 48.0M | ✅ | 99K | 🟢 **-100%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 48.4M | ✅ | 97K | 🟢 **-100%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.5M | ✅ | 72K | 🟢 **-100%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.1M | ✅ | 158K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.9M | ✅ | 30K | 🟢 **-100%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.2M | ✅ | 30K | 🟢 **-100%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.1M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.0M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 38.2M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 43.3M | ✅ | 77K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 98K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.7M | ✅ | 90K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.5M | ✅ | 80K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 40.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 37.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.6M | ✅ | 99K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 117K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 80.8M | ✅ | 115K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 48.2M | ✅ | 227K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.3M | ✅ | 231K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 59.6M | ✅ | 238K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 62.5M | ✅ | 240K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 61.5M | ✅ | 241K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 54.6M | ✅ | 236K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 57.9M | ✅ | 237K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.5M | ✅ | 238K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 56.3M | ✅ | 236K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.3M | ✅ | 232K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 69.5M | ✅ | 244K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 65.8M | ✅ | 235K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 67.5M | ✅ | 240K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 253K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ✅ | 78K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 76K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.6M | ✅ | 260K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.1M | ✅ | 80K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.1M | ✅ | 77K | 🟢 **-100%** |
| optional/bignum.json | integer | 2 | ✅ | 79.5M | ✅ | 251K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 79.9M | ✅ | 253K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 56.3M | ✅ | 234K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 258K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 252K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 258K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 250K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 34.7M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.6M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.3M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 19.0M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.4M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.9M | ✅ | 233K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 19.1M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.3M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.2M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.9M | ✅ | 227K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ✅ | 239K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.6M | ✅ | 233K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 232K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.2M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.1M | ✅ | 239K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ✅ | 159K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 193K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.5M | ✅ | 186K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 179K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 157K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ✅ | 248K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.5M | ✅ | 251K | 🟢 **-99%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.2M | ✅ | 255K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 227K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.8M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.1M | ✅ | 53K | 🟢 **-100%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 45.0M | ✅ | 47K | 🟢 **-100%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 44.8M | ✅ | 47K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.0M | ✅ | 231K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.3M | ✅ | 104K | 🟢 **-99%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.4M | ✅ | 35K | 🟢 **-100%** |

### draft7

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 39K | 🟢 **-99%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.0M | ✅ | 70K | 🟢 **-100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 69K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 64.8M | ✅ | 44K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ✅ | 289K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 70.2M | ✅ | 118K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.8M | ✅ | 42K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 40.9M | ✅ | 72K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 105.6M | ✅ | 120K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 70.0M | ✅ | 176K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.3M | ✅ | 61K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.6M | ✅ | 131K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 46.8M | ✅ | 62K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.1M | ✅ | 113K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.2M | ✅ | 82K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.5M | ✅ | 57K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.9M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 36.9M | ✅ | 50K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.9M | ✅ | 42K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 53.2M | ✅ | 118K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 253K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 57.5M | ✅ | 212K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 185K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 69.9M | ✅ | 168K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 125K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.8M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.9M | ✅ | 113K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 68K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 58.5M | ✅ | 115K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.5M | ✅ | 111K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 76.7M | ✅ | 256K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 151.9M | ✅ | 257K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 58.2M | ✅ | 189K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 67.3M | ✅ | 56K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 71.4M | ✅ | 119K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 113K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 67.3M | ✅ | 637K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.3M | ✅ | 514K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 57.7M | ✅ | 260K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 49.3M | ✅ | 250K | 🟢 **-99%** |
| const.json | const with array | 3 | ✅ | 48.3M | ✅ | 243K | 🟢 **-99%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 260K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 62.4M | ✅ | 259K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 259K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 51.8M | ✅ | 247K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ✅ | 246K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 57.8M | ✅ | 250K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.0M | ✅ | 251K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 30.1M | ✅ | 259K | 🟢 **-99%** |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 260K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 58.6M | ✅ | 259K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 92.3M | ✅ | 259K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 57.5M | ✅ | 259K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 254K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 49.6M | ✅ | 257K | 🟢 **-99%** |
| contains.json | contains keyword validation | 6 | ✅ | 90.2M | ✅ | 120K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.7M | ✅ | 88K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ✅ | 197K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.4M | ✅ | 205K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 51.5M | ✅ | 55K | 🟢 **-100%** |
| contains.json | contains with false if subschema | 2 | ✅ | 60.9M | ✅ | 149K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 120.7M | ✅ | 157K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 62.7M | ✅ | 116K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 59.5M | ✅ | 115K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 37.4M | ✅ | 112K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.9M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 55.6M | ✅ | 150K | 🟢 **-100%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 80.3M | ✅ | 149K | 🟢 **-100%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.8M | ✅ | 131K | 🟢 **-100%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 42.0M | ✅ | 56K | 🟢 **-100%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 51.4M | ✅ | 153K | 🟢 **-100%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 14.5M | ✅ | 59K | 🟢 **-100%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 24.6M | ✅ | 60K | 🟢 **-100%** |
| enum.json | simple enum validation | 2 | ✅ | 68.3M | ✅ | 252K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 43.4M | ✅ | 236K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.5M | ✅ | 257K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 13.7M | ✅ | 74K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.0M | ✅ | 257K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 33.5M | ✅ | 255K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.4M | ✅ | 245K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 58.4M | ✅ | 255K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 56.9M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 63.0M | ✅ | 258K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.7M | ✅ | 252K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 59.5M | ✅ | 257K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.8M | ✅ | 252K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 54.0M | ✅ | 255K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 32.6M | ✅ | 262K | 🟢 **-99%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 55.1M | ✅ | 262K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 73.0M | ✅ | 265K | 🟢 **-100%** |
| format.json | idn-email format | 6 | ✅ | 70.8M | ✅ | 263K | 🟢 **-100%** |
| format.json | regex format | 6 | ✅ | 73.6M | ✅ | 264K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 73.2M | ✅ | 264K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 73.1M | ✅ | 264K | 🟢 **-100%** |
| format.json | idn-hostname format | 6 | ✅ | 73.0M | ✅ | 264K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 77.2M | ✅ | 263K | 🟢 **-100%** |
| format.json | date format | 6 | ✅ | 72.9M | ✅ | 264K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 73.3M | ✅ | 264K | 🟢 **-100%** |
| format.json | time format | 6 | ✅ | 73.1M | ✅ | 264K | 🟢 **-100%** |
| format.json | json-pointer format | 6 | ✅ | 72.8M | ✅ | 264K | 🟢 **-100%** |
| format.json | relative-json-pointer format | 6 | ✅ | 72.9M | ✅ | 263K | 🟢 **-100%** |
| format.json | iri format | 6 | ✅ | 72.9M | ✅ | 262K | 🟢 **-100%** |
| format.json | iri-reference format | 6 | ✅ | 72.9M | ✅ | 263K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 72.7M | ✅ | 263K | 🟢 **-100%** |
| format.json | uri-reference format | 6 | ✅ | 72.7M | ✅ | 263K | 🟢 **-100%** |
| format.json | uri-template format | 6 | ✅ | 73.0M | ✅ | 263K | 🟢 **-100%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 78.9M | ✅ | 247K | 🟢 **-100%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.1M | ✅ | 271K | 🟢 **-100%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 72.1M | ✅ | 271K | 🟢 **-100%** |
| if-then-else.json | if and then without else | 3 | ✅ | 67.3M | ✅ | 175K | 🟢 **-100%** |
| if-then-else.json | if and else without then | 3 | ✅ | 66.2M | ✅ | 163K | 🟢 **-100%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 63.0M | ✅ | 145K | 🟢 **-100%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 70.1M | ✅ | 95K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 66.1M | ✅ | 156K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 65.6M | ✅ | 147K | 🟢 **-100%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ✅ | 151K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.8M | ✅ | 36K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 49.0M | ✅ | 113K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 60.4M | ✅ | 91K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 79.2M | ✅ | 146K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 63.0M | ✅ | 256K | 🟢 **-100%** |
| items.json | items with boolean schemas | 3 | ✅ | 55.7M | ✅ | 179K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 15.9M | ✅ | 17K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 11.9M | ✅ | 17K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 66.1M | ✅ | 117K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 64.1M | ✅ | 116K | 🟢 **-100%** |
| maxItems.json | maxItems validation | 4 | ✅ | 68.2M | ✅ | 261K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 259K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 49.7M | ✅ | 255K | 🟢 **-99%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.1M | ✅ | 254K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.6M | ✅ | 261K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 43.4M | ✅ | 259K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.3M | ✅ | 258K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 67.0M | ✅ | 262K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.1M | ✅ | 262K | 🟢 **-100%** |
| minItems.json | minItems validation | 4 | ✅ | 67.9M | ✅ | 262K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.8M | ✅ | 260K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 47.5M | ✅ | 254K | 🟢 **-99%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 50.9M | ✅ | 253K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 53.4M | ✅ | 261K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 46.1M | ✅ | 258K | 🟢 **-99%** |
| minimum.json | minimum validation | 4 | ✅ | 66.7M | ✅ | 262K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.4M | ✅ | 260K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 66.8M | ✅ | 240K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 64.2M | ✅ | 221K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 59.0M | ✅ | 218K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 204K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.5M | ✅ | 219K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 66.8M | ✅ | 155K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 60.5M | ✅ | 154K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 60.1M | ✅ | 92K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 46.7M | ✅ | 89K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 55.1M | ✅ | 160K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 55.2M | ✅ | 251K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 75.9M | ✅ | 264K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 76.8M | ✅ | 118K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 59.5M | ✅ | 110K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.2M | ✅ | 109K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 57.0M | ✅ | 219K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 76.7M | ✅ | 192K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 58.3M | ✅ | 200K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 58.1M | ✅ | 167K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.0M | ✅ | 53K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 66.1M | ✅ | 113K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.3M | ✅ | 107K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.2M | ✅ | 63K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.2M | ✅ | 111K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 49.2M | ✅ | 258K | 🟢 **-99%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 23.4M | ✅ | 248K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.4M | ✅ | 113K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.9M | ✅ | 73K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.7M | ✅ | 86K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 137K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.5M | ✅ | 111K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 50.1M | ✅ | 88K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.3M | ✅ | 51K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.0M | ✅ | 117K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.5M | ✅ | 30K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 59.5M | ✅ | 114K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.7M | ✅ | 53K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.9M | ✅ | 189K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ✅ | 144K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 79.1M | ✅ | 200K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.3M | ✅ | 191K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.4M | ✅ | 181K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.0M | ✅ | 161K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 22.8M | ✅ | 71K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.1M | ✅ | 64K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.9M | ✅ | 63K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ✅ | 27K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 36.4M | ✅ | 48K | 🟢 **-100%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 51.0M | ✅ | 72K | 🟢 **-100%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 45.7M | ✅ | 68K | 🟢 **-100%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.9M | ✅ | 111K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 47.5M | ✅ | 71K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 76.8M | ✅ | 104K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 58.2M | ✅ | 95K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 8K | 🟢 **-100%** |
| ref.json | refs with quote | 2 | ✅ | 47.2M | ✅ | 60K | 🟢 **-100%** |
| ref.json | Location-independent identifier | 2 | ✅ | 45.8M | ✅ | 99K | 🟢 **-100%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 43.3M | ✅ | 97K | 🟢 **-100%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 42.8M | ✅ | 72K | 🟢 **-100%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.2M | ✅ | 158K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.9M | ✅ | 29K | 🟢 **-100%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.6M | ✅ | 30K | 🟢 **-100%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 45.2M | ✅ | 67K | 🟢 **-100%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.5M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 40.1M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 43.9M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.3M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 37.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 45.7M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 45.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 45.8M | ✅ | 78K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.6M | ✅ | 98K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 90K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.2M | ✅ | 81K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 44.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 43.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 43.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 33.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 40.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 35.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.5M | ✅ | 99K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 76.7M | ✅ | 116K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 76.7M | ✅ | 114K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 45.6M | ✅ | 227K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.2M | ✅ | 231K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 58.0M | ✅ | 238K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 59.7M | ✅ | 241K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 59.0M | ✅ | 242K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 52.4M | ✅ | 236K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 55.5M | ✅ | 237K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 58.1M | ✅ | 239K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 54.0M | ✅ | 239K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.9M | ✅ | 236K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 66.7M | ✅ | 246K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 58.4M | ✅ | 239K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 66.4M | ✅ | 242K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ✅ | 254K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.2M | ✅ | 79K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.0M | ✅ | 79K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 73.2M | ✅ | 265K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.5M | ✅ | 82K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.2M | ✅ | 78K | 🟢 **-100%** |
| optional/bignum.json | integer | 2 | ✅ | 75.4M | ✅ | 255K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 75.7M | ✅ | 257K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 73.1M | ✅ | 236K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 261K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.9M | ✅ | 255K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 262K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 53.9M | ✅ | 254K | 🟢 **-100%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 356K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.1M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.8M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.3M | ✅ | 233K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.3M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.3M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.2M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.1M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.3M | ✅ | 233K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.1M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.9M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.7M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.2M | ✅ | 241K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.5M | ✅ | 236K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 235K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.2M | ✅ | 238K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 9.8M | ✅ | 241K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.6M | ✅ | 158K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.7M | ✅ | 192K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.2M | ✅ | 183K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 176K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ✅ | 154K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.7M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.5M | ✅ | 252K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.7M | ✅ | 252K | 🟢 **-99%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 28.8M | ✅ | 236K | 🟢 **-99%** |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 19.1M | ✅ | 238K | 🟢 **-99%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.8M | ✅ | 182K | 🟢 **-100%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 33.7M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 75.2M | ✅ | 258K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 229K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 31.7M | ✅ | 54K | 🟢 **-100%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 53.4M | ✅ | 97K | 🟢 **-100%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 53.4M | ✅ | 97K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.9M | ✅ | 235K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.4M | ✅ | 105K | 🟢 **-99%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.7M | ✅ | 35K | 🟢 **-100%** |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 45.2M | ✅ | 23K | 🟢 **-100%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 34.7M | ✅ | 69K | 🟢 **-100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 166.0M | ✅ | 69K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.8M | ✅ | 76K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 175.2M | ✅ | 283K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 87.0M | ✅ | 118K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 33.7M | ✅ | 42K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 31.0M | ✅ | 72K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 111.7M | ✅ | 119K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 88.9M | ✅ | 174K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 43.9M | ✅ | 60K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.8M | ✅ | 129K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 38.9M | ✅ | 62K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 30.0M | ✅ | 113K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 166.3M | ✅ | 81K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 20.3M | ✅ | 57K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 71.8M | ✅ | 117K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.0M | ✅ | 80K | 🟢 **-100%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 23.5M | ✅ | 110K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 30.7M | ✅ | 52K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 26.8M | ✅ | 43K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 82.6M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 166.2M | ✅ | 249K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 74.5M | ✅ | 207K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 101.9M | ✅ | 181K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 99.6M | ✅ | 165K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 167.3M | ✅ | 123K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 84.7M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 126.6M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 85.8M | ✅ | 111K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.4M | ✅ | 65K | 🟢 **-100%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 83.3M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 69.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 34.3M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 85.4M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 86.7M | ✅ | 113K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.9M | ✅ | 109K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 99.1M | ✅ | 246K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 99.3M | ✅ | 247K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 74.4M | ✅ | 183K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 58.4M | ✅ | 56K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 90.2M | ✅ | 116K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 86.1M | ✅ | 111K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 77.8M | ✅ | 614K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 71.5M | ✅ | 496K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 76.9M | ✅ | 249K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 44.1M | ✅ | 242K | 🟢 **-99%** |
| const.json | const with array | 3 | ✅ | 64.6M | ✅ | 234K | 🟢 **-100%** |
| const.json | const with null | 2 | ✅ | 86.4M | ✅ | 249K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 81.6M | ✅ | 249K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 78.6M | ✅ | 250K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 72.3M | ✅ | 239K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 72.1M | ✅ | 239K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 69.7M | ✅ | 240K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 70.8M | ✅ | 242K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 72.0M | ✅ | 249K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 82.3M | ✅ | 251K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 79.0M | ✅ | 250K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 80.1M | ✅ | 250K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 72.1M | ✅ | 250K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.6M | ✅ | 247K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 73.2M | ✅ | 245K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 71.1M | ✅ | 116K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 68.1M | ✅ | 89K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 79.0M | ✅ | 190K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 77.9M | ✅ | 197K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 38.3M | ✅ | 56K | 🟢 **-100%** |
| contains.json | contains with false if subschema | 2 | ✅ | 76.4M | ✅ | 144K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 87.1M | ✅ | 152K | 🟢 **-100%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 104.3M | ✅ | 258K | 🟢 **-100%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 105.4M | ✅ | 258K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 90.5M | ✅ | 257K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 78.3M | ✅ | 253K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 77.1M | ✅ | 113K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 77.1M | ✅ | 112K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 53.3M | ✅ | 109K | 🟢 **-100%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.7M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 63.9M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 104.9M | ✅ | 259K | 🟢 **-100%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 44.8M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 50.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 61.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 37.0M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 33.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 82.0M | ✅ | 242K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 51.4M | ✅ | 230K | 🟢 **-100%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 81.5M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 73K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 87.4M | ✅ | 248K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 81.4M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 72.0M | ✅ | 236K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 81.1M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 72.1M | ✅ | 238K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 83.5M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 73.1M | ✅ | 244K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 83.3M | ✅ | 250K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 72.0M | ✅ | 244K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 71.8M | ✅ | 246K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 79.2M | ✅ | 255K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 79.5M | ✅ | 254K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 103.5M | ✅ | 258K | 🟢 **-100%** |
| format.json | idn-email format | 6 | ✅ | 104.5M | ✅ | 256K | 🟢 **-100%** |
| format.json | regex format | 6 | ✅ | 90.6M | ✅ | 258K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 90.5M | ✅ | 257K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 76.7M | ✅ | 258K | 🟢 **-100%** |
| format.json | idn-hostname format | 6 | ✅ | 90.6M | ✅ | 258K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 91.2M | ✅ | 258K | 🟢 **-100%** |
| format.json | date format | 6 | ✅ | 90.6M | ✅ | 257K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 91.3M | ✅ | 258K | 🟢 **-100%** |
| format.json | time format | 6 | ✅ | 90.5M | ✅ | 258K | 🟢 **-100%** |
| format.json | json-pointer format | 6 | ✅ | 91.1M | ✅ | 258K | 🟢 **-100%** |
| format.json | relative-json-pointer format | 6 | ✅ | 90.2M | ✅ | 258K | 🟢 **-100%** |
| format.json | iri format | 6 | ✅ | 91.0M | ✅ | 258K | 🟢 **-100%** |
| format.json | iri-reference format | 6 | ✅ | 89.5M | ✅ | 258K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 92.1M | ✅ | 258K | 🟢 **-100%** |
| format.json | uri-reference format | 6 | ✅ | 90.5M | ✅ | 257K | 🟢 **-100%** |
| format.json | uri-template format | 6 | ✅ | 89.9M | ✅ | 257K | 🟢 **-100%** |
| format.json | uuid format | 6 | ✅ | 91.0M | ✅ | 257K | 🟢 **-100%** |
| format.json | duration format | 6 | ✅ | 91.0M | ✅ | 257K | 🟢 **-100%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 93.2M | ✅ | 244K | 🟢 **-100%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.3M | ✅ | 264K | 🟢 **-100%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 93.1M | ✅ | 265K | 🟢 **-100%** |
| if-then-else.json | if and then without else | 3 | ✅ | 85.7M | ✅ | 173K | 🟢 **-100%** |
| if-then-else.json | if and else without then | 3 | ✅ | 79.6M | ✅ | 160K | 🟢 **-100%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 80.8M | ✅ | 144K | 🟢 **-100%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 93.7M | ✅ | 94K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 84.2M | ✅ | 154K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 74.9M | ✅ | 144K | 🟢 **-100%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 46.3M | ✅ | 147K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.5M | ✅ | 33K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 54.8M | ✅ | 111K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 64.8M | ✅ | 93K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 105.5M | ✅ | 144K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 78.1M | ✅ | 251K | 🟢 **-100%** |
| items.json | items with boolean schemas | 3 | ✅ | 55.0M | ✅ | 176K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 14.2M | ✅ | 15K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 11.5M | ✅ | 17K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 83.8M | ✅ | 114K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 88.6M | ✅ | 114K | 🟢 **-100%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 104.0M | ✅ | 261K | 🟢 **-100%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 64.1M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 72.8M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 67.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 88.1M | ✅ | 257K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 82.2M | ✅ | 252K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 64.7M | ✅ | 249K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 62.2M | ✅ | 247K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 62.1M | ✅ | 255K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.9M | ✅ | 251K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 53.2M | ✅ | 250K | 🟢 **-100%** |
| maximum.json | maximum validation | 4 | ✅ | 85.7M | ✅ | 253K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 81.9M | ✅ | 254K | 🟢 **-100%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 104.8M | ✅ | 259K | 🟢 **-100%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 78.6M | ✅ | 161K | 🟢 **-100%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 67.9M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 74.3M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 67.8M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 103.9M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 80.1M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 89.0M | ✅ | 256K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 82.8M | ✅ | 253K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 64.2M | ✅ | 248K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 62.3M | ✅ | 249K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 64.4M | ✅ | 256K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 51.9M | ✅ | 251K | 🟢 **-100%** |
| minimum.json | minimum validation | 4 | ✅ | 85.4M | ✅ | 254K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 81.0M | ✅ | 254K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 87.9M | ✅ | 234K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 81.5M | ✅ | 217K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 74.6M | ✅ | 213K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 64.6M | ✅ | 201K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 79.5M | ✅ | 215K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 85.2M | ✅ | 152K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 78.9M | ✅ | 152K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 75.7M | ✅ | 92K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 45.6M | ✅ | 89K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 71.4M | ✅ | 159K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 71.2M | ✅ | 247K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 95.7M | ✅ | 258K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 100.0M | ✅ | 117K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 35.5M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 72.1M | ✅ | 111K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.3M | ✅ | 107K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 73.9M | ✅ | 213K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 98.9M | ✅ | 189K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 72.4M | ✅ | 196K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 75.3M | ✅ | 164K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 46.3M | ✅ | 54K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 82.7M | ✅ | 113K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 51.1M | ✅ | 107K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 51.0M | ✅ | 63K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 83.1M | ✅ | 110K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 59.0M | ✅ | 253K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 27.5M | ✅ | 244K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.8M | ✅ | 115K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.7M | ✅ | 74K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.6M | ✅ | 85K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.0M | ✅ | 136K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 20.4M | ✅ | 111K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 51.6M | ✅ | 89K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.2M | ✅ | 51K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 43.2M | ✅ | 118K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 42.3M | ✅ | 30K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 78.0M | ✅ | 114K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ✅ | 54K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.6M | ✅ | 189K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ✅ | 143K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 105.0M | ✅ | 199K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 54.2M | ✅ | 191K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.7M | ✅ | 181K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 38.8M | ✅ | 161K | 🟢 **-100%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 11.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.7M | ✅ | 55K | 🟢 **-98%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 10.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 9.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.2M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.5M | ✅ | 70K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.7M | ✅ | 63K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 50.4M | ✅ | 63K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 42.2M | ✅ | 34K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 26.2M | ✅ | 73K | 🟢 **-100%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 39.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 2.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.5M | ✅ | 111K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.5M | ✅ | 70K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 98.9M | ✅ | 147K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 76.3M | ✅ | 138K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 47.7M | ✅ | 70K | 🟢 **-100%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 21.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 62.4M | ✅ | 237K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 29.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 27.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 33.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 32.7M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 83.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 27.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 41.8M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 43.7M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 41.8M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.3M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 34.7M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 34.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 35.0M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 34.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 34.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.2M | ✅ | 141K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.6M | ✅ | 130K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.0M | ✅ | 95K | 🟢 **-100%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 32.7M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 34.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 21.6M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 33.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 34.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 35.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 35.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 30.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 33.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.7M | ✅ | 99K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 99.1M | ✅ | 116K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 98.6M | ✅ | 114K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 47.5M | ✅ | 225K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.1M | ✅ | 229K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 72.2M | ✅ | 237K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 73.7M | ✅ | 239K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 73.8M | ✅ | 238K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 62.8M | ✅ | 234K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 67.2M | ✅ | 235K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 71.9M | ✅ | 236K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 71.6M | ✅ | 234K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 69.8M | ✅ | 231K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 81.5M | ✅ | 242K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 79.2M | ✅ | 234K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 83.1M | ✅ | 238K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 92.0M | ✅ | 261K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 49.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 49.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 77.5M | ✅ | 94K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 46.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 86.4M | ✅ | 95K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 38.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 33.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 42.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 90.5M | ✅ | 77K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.3M | ✅ | 75K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 30.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 50.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 42.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 41.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 35.1M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.7M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 73.2M | ✅ | 261K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 85.0M | ✅ | 261K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 32.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 60.9M | ✅ | 249K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 29.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 75.1M | ✅ | 100K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 74.3M | ✅ | 71K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 34.8M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 20.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 16.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 2.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 23.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 23.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 35.1M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 33.3M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 22.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 18.0M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 27.4M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 50.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.4M | ✅ | 30K | 🟢 **-100%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 92.5M | ✅ | 261K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 54.9M | ✅ | 260K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 20.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.7M | ✅ | 250K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.7M | ✅ | 79K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 20.4M | ✅ | 78K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 87.5M | ✅ | 261K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.5M | ✅ | 81K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 79.1M | ✅ | 78K | 🟢 **-100%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.0M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 80.9M | ✅ | 242K | 🟢 **-100%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 65.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 93.6M | ✅ | 250K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 98.8M | ✅ | 253K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 71.6M | ✅ | 232K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 89.2M | ✅ | 256K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 67.0M | ✅ | 249K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 89.0M | ✅ | 258K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 66.6M | ✅ | 251K | 🟢 **-100%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.5M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 77.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 60.9M | ✅ | 147K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 103.1M | ✅ | 145K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 31.9M | ✅ | 128K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.1M | ✅ | 91K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 47.5M | ✅ | 68K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 62.3M | ✅ | 149K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 35.8M | ✅ | 85K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 38.1M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 21.2M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 30.2M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.6M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 28.5M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 31.3M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 31.0M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 28.4M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 33.0M | ✅ | 226K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.9M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.8M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.2M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 30.7M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.6M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 157K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.7M | ✅ | 191K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.8M | ✅ | 185K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 177K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 156K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 28.0M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 44.2M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.5M | ✅ | 245K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.4M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.7M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.1M | ✅ | 249K | 🟢 **-99%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.4M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 39.7M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.6M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 35.0M | ✅ | 232K | 🟢 **-99%** |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 33.3M | ✅ | 248K | 🟢 **-99%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 78.7M | ✅ | 184K | 🟢 **-100%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.9M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 104.0M | ✅ | 257K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.5M | ✅ | 226K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 16.5M | ✅ | 245K | 🟢 **-99%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 31.0M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 69.0M | ✅ | 254K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 32.9M | ✅ | 230K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.9M | ✅ | 104K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 43.5M | ✅ | 72K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 45.1M | ✅ | 71K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 47.5M | ✅ | 52K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 84.8M | ✅ | 146K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.0M | ✅ | 52K | 🟢 **-100%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 10.8M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 57.9M | ✅ | 25K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.0M | ✅ | 132K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.6M | ✅ | 33K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 16.0M | ✅ | 112K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 151.6M | ✅ | 80K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.4M | ✅ | 56K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 114K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.7M | ✅ | 79K | 🟢 **-100%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.9M | ✅ | 109K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 37.7M | ✅ | 50K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.2M | ✅ | 42K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 64.7M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ✅ | 246K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.8M | ✅ | 207K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 180K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.5M | ✅ | 165K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 150.8M | ✅ | 121K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.9M | ✅ | 114K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.6M | ✅ | 114K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.8M | ✅ | 110K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 72.5M | ✅ | 67K | 🟢 **-100%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 84.5M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 41.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.8M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 69.6M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 71.9M | ✅ | 113K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.5M | ✅ | 108K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.8M | ✅ | 246K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 80.7M | ✅ | 246K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.9M | ✅ | 183K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.3M | ✅ | 58K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 76.1M | ✅ | 116K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 110K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 80.5M | ✅ | 611K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 56.7M | ✅ | 490K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 60.1M | ✅ | 248K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 38.9M | ✅ | 238K | 🟢 **-99%** |
| const.json | const with array | 3 | ✅ | 54.0M | ✅ | 233K | 🟢 **-100%** |
| const.json | const with null | 2 | ✅ | 71.1M | ✅ | 248K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 68.2M | ✅ | 247K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 67.5M | ✅ | 248K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 60.8M | ✅ | 237K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 60.3M | ✅ | 237K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.2M | ✅ | 240K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 60.5M | ✅ | 239K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 58.1M | ✅ | 248K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 67.5M | ✅ | 249K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 60.9M | ✅ | 248K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 66.4M | ✅ | 248K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 58.2M | ✅ | 249K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.4M | ✅ | 245K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.5M | ✅ | 246K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 59.5M | ✅ | 116K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.2M | ✅ | 85K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 65.7M | ✅ | 189K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.1M | ✅ | 197K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 37.6M | ✅ | 55K | 🟢 **-100%** |
| contains.json | contains with false if subschema | 2 | ✅ | 63.3M | ✅ | 145K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 152K | 🟢 **-100%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 84.8M | ✅ | 258K | 🟢 **-100%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 84.8M | ✅ | 258K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 75.8M | ✅ | 255K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 71.2M | ✅ | 254K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 65.4M | ✅ | 114K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 51.3M | ✅ | 112K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.4M | ✅ | 108K | 🟢 **-100%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 60.1M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 84.8M | ✅ | 258K | 🟢 **-100%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 46.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 51.8M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.2M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 36.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.8M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.7M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 18.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.3M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.8M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.4M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.5M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.3M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 64.8M | ✅ | 242K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.9M | ✅ | 227K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.0M | ✅ | 245K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 72K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.7M | ✅ | 245K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 65.7M | ✅ | 243K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.4M | ✅ | 234K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 68.1M | ✅ | 242K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 59.7M | ✅ | 234K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.4M | ✅ | 247K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.2M | ✅ | 240K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.4M | ✅ | 247K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.8M | ✅ | 241K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 59.7M | ✅ | 245K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.6M | ✅ | 250K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 65.2M | ✅ | 251K | 🟢 **-100%** |
| format.json | email format | 7 | ✅ | 76.9M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 79.2M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 71.0M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 71.1M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 70.4M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 71.1M | ✅ | 253K | 🟢 **-100%** |
| format.json | hostname format | 7 | ✅ | 71.2M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 70.9M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 69.9M | ✅ | 251K | 🟢 **-100%** |
| format.json | time format | 7 | ✅ | 71.0M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 71.2M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 79.0M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 71.2M | ✅ | 252K | 🟢 **-100%** |
| format.json | iri-reference format | 7 | ✅ | 71.1M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 71.1M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 71.2M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 71.2M | ✅ | 248K | 🟢 **-100%** |
| format.json | uuid format | 7 | ✅ | 71.1M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 71.2M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 76.1M | ✅ | 240K | 🟢 **-100%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 83.6M | ✅ | 261K | 🟢 **-100%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 76.1M | ✅ | 259K | 🟢 **-100%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.4M | ✅ | 171K | 🟢 **-100%** |
| if-then-else.json | if and else without then | 3 | ✅ | 69.6M | ✅ | 159K | 🟢 **-100%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 65.8M | ✅ | 141K | 🟢 **-100%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 76.0M | ✅ | 92K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 68.1M | ✅ | 151K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 68.7M | ✅ | 141K | 🟢 **-100%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.1M | ✅ | 144K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.0M | ✅ | 36K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 50.6M | ✅ | 108K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 83.5M | ✅ | 142K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 63.5M | ✅ | 249K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 12.8M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.9M | ✅ | 16K | 🟢 **-100%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 72.7M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 43.2M | ✅ | 75K | 🟢 **-100%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 42.0M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 66.7M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 68.9M | ✅ | 114K | 🟢 **-100%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 82.9M | ✅ | 258K | 🟢 **-100%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 55.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 55.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 71.3M | ✅ | 252K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 250K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.1M | ✅ | 247K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.1M | ✅ | 246K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 251K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 46.6M | ✅ | 249K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.9M | ✅ | 249K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 69.1M | ✅ | 251K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.9M | ✅ | 251K | 🟢 **-100%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 82.5M | ✅ | 257K | 🟢 **-100%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 61.1M | ✅ | 160K | 🟢 **-100%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 57.5M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 61.0M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 49.8M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 54.8M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 83.6M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 68.3M | ✅ | 252K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.5M | ✅ | 250K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 54.3M | ✅ | 246K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 53.0M | ✅ | 245K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.4M | ✅ | 253K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.6M | ✅ | 248K | 🟢 **-99%** |
| minimum.json | minimum validation | 4 | ✅ | 69.9M | ✅ | 251K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ✅ | 251K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 70.6M | ✅ | 231K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 61.2M | ✅ | 214K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 61.5M | ✅ | 210K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.8M | ✅ | 198K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 214K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 69.8M | ✅ | 151K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 65.0M | ✅ | 150K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 62.9M | ✅ | 90K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 49.0M | ✅ | 88K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 54.6M | ✅ | 161K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.8M | ✅ | 243K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.3M | ✅ | 254K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 80.6M | ✅ | 116K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.9M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 54.7M | ✅ | 108K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.9M | ✅ | 106K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.7M | ✅ | 211K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.8M | ✅ | 186K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.7M | ✅ | 192K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.7M | ✅ | 161K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.3M | ✅ | 54K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.2M | ✅ | 110K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.8M | ✅ | 105K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 46.5M | ✅ | 61K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.3M | ✅ | 106K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 52.1M | ✅ | 247K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.5M | ✅ | 240K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ✅ | 115K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.1M | ✅ | 73K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ✅ | 83K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 134K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 12.8M | ✅ | 108K | 🟢 **-99%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 61.6M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 60.1M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 73.2M | ✅ | 255K | 🟢 **-100%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 73.4M | ✅ | 255K | 🟢 **-100%** |
| properties.json | object properties validation | 6 | ✅ | 52.1M | ✅ | 89K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ✅ | 51K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ✅ | 114K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 47.7M | ✅ | 28K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.4M | ✅ | 111K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ✅ | 54K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.5M | ✅ | 184K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ✅ | 141K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.4M | ✅ | 194K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 47.2M | ✅ | 186K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.0M | ✅ | 176K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.7M | ✅ | 158K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 23.3M | ✅ | 68K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.9M | ✅ | 62K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 54.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 44.5M | ✅ | 34K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 37.8M | ✅ | 73K | 🟢 **-100%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 41.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.8M | ✅ | 108K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.6M | ✅ | 70K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.8M | ✅ | 147K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.7M | ✅ | 137K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 51.0M | ✅ | 70K | 🟢 **-100%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.6M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.0M | ✅ | 234K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.3M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 67.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 37.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 39.3M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 48.8M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.8M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.7M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.4M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 48.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.3M | ✅ | 141K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 131K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.6M | ✅ | 95K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 45.2M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 26.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.7M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 45.6M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 42.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 48.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 47.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 36.8M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.8M | ✅ | 96K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 114K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 80.6M | ✅ | 111K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 43.0M | ✅ | 223K | 🟢 **-99%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.8M | ✅ | 226K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 60.1M | ✅ | 232K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 62.2M | ✅ | 235K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 61.8M | ✅ | 235K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 54.6M | ✅ | 230K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 58.0M | ✅ | 232K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.6M | ✅ | 233K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 58.8M | ✅ | 231K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 55.9M | ✅ | 229K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 69.7M | ✅ | 238K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 60.4M | ✅ | 232K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 69.8M | ✅ | 234K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 75.0M | ✅ | 257K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 55.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 48.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 64.7M | ✅ | 92K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 52.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 71.7M | ✅ | 118K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 42.9M | ✅ | 67K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 46.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 68.3M | ✅ | 92K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.1M | ✅ | 119K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 39.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 46.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 43.6M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 18.6M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 75.6M | ✅ | 258K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 68.9M | ✅ | 257K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 40.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.7M | ✅ | 257K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 33.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 83.5M | ✅ | 135K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 34.3M | ✅ | 99K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.9M | ✅ | 70K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.5M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 12.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.7M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.5M | ✅ | 87K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.6M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.1M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 46.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.7M | ✅ | 30K | 🟢 **-100%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 69.8M | ✅ | 257K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.4M | ✅ | 257K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.4M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 247K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.4M | ✅ | 243K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 43.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.7M | ✅ | 256K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 65.9M | ✅ | 253K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.5M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 49.4M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 70.1M | ✅ | 239K | 🟢 **-100%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 56.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.4M | ✅ | 246K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 79.9M | ✅ | 249K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 58.6M | ✅ | 227K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.9M | ✅ | 251K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ✅ | 245K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 251K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ✅ | 247K | 🟢 **-100%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 76.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 58.9M | ✅ | 144K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 84.9M | ✅ | 143K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.0M | ✅ | 126K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 45.9M | ✅ | 90K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 51.7M | ✅ | 68K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 57.0M | ✅ | 147K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 38.9M | ✅ | 84K | 🟢 **-100%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.2M | ✅ | 226K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.7M | ✅ | 226K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.0M | ✅ | 226K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.3M | ✅ | 226K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.5M | ✅ | 224K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.5M | ✅ | 226K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.7M | ✅ | 226K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.3M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.3M | ✅ | 223K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ✅ | 233K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ✅ | 228K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 228K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.5M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ✅ | 233K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ✅ | 155K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 188K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 181K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 174K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ✅ | 154K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 7.9M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.2M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 48.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.6M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ✅ | 244K | 🟢 **-99%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.7M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.4M | ✅ | 230K | 🟢 **-99%** |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.3M | ✅ | 246K | 🟢 **-99%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 67.8M | ✅ | 178K | 🟢 **-100%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 39.5M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.3M | ✅ | 252K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ✅ | 225K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ✅ | 243K | 🟢 **-98%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 24.2M | ✅ | 235K | 🟢 **-99%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.0M | ✅ | 235K | 🟢 **-99%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 58.5M | ✅ | 249K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.5M | ✅ | 228K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.2M | ✅ | 103K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 49.0M | ✅ | 73K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 49.2M | ✅ | 72K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.0M | ✅ | 52K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 69.3M | ✅ | 146K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.9M | ✅ | 52K | 🟢 **-100%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.7M | ❌ | - | - |
