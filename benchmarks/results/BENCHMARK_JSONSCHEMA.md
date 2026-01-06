# tjs vs jsonschema Benchmarks

Performance comparison of **tjs** vs **[jsonschema](https://www.npmjs.com/package/jsonschema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | jsonschema pass | jsonschema ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.6M | 182/199 | 114K | 182 | 🟢 **-100%** |
| draft6 | 276 | ✅ 276 | 30.1M | 249/276 | 105K | 249 | 🟢 **-100%** |
| draft7 | 313 | ✅ 313 | 15.5M | 272/313 | 126K | 272 | 🟢 **-99%** |
| draft2019-09 | 435 | ✅ 435 | 19.3M | 295/435 | 140K | 295 | 🟢 **-99%** |
| draft2020-12 | 448 | ✅ 448 | 18.4M | 268/448 | 144K | 268 | 🟢 **-99%** |
| **Total** | 1671 | 1670/1671 | 19.8M | 1266/1671 | 125K | 1266 | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **301.09x faster** (26 ns vs 7971 ns per test, 4986 tests in 1266 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 44K | 🟢 **-99%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 85.2M | ✅ | 67K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 144.1M | ✅ | 78K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 88.5M | ✅ | 297K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 118K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 44.5M | ✅ | 43K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.0M | ✅ | 72K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 69.7M | ✅ | 121K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 152.8M | ✅ | 180K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 38.9M | ✅ | 44K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.6M | ✅ | 134K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 35.2M | ✅ | 64K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 43.9M | ✅ | 115K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 77.0M | ✅ | 84K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.3M | ✅ | 59K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 50.9M | ✅ | 118K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 44.0M | ✅ | 53K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 26.6M | ✅ | 46K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.8M | ✅ | 121K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 85.1M | ✅ | 176K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 130K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.4M | ✅ | 121K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 121K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 66K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 76.1M | ✅ | 121K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.8M | ✅ | 116K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 49.0M | ✅ | 61K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.5M | ✅ | 125K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 118K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 118K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 53.3M | ✅ | 117K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.7M | ✅ | 113K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.7M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.5M | ✅ | 152K | 🟢 **-100%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.5M | ✅ | 130K | 🟢 **-100%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 57.8M | ✅ | 60K | 🟢 **-100%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.5M | ✅ | 63K | 🟢 **-100%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 46.1M | ✅ | 64K | 🟢 **-100%** |
| enum.json | simple enum validation | 2 | ✅ | 71.9M | ✅ | 257K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.5M | ✅ | 240K | 🟢 **-100%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 65.7M | ✅ | 259K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 64K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 57.7M | ✅ | 258K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.9M | ✅ | 255K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.9M | ✅ | 248K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 256K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.0M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 108.7M | ✅ | 261K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ✅ | 254K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 109.9M | ✅ | 260K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.4M | ✅ | 255K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 258K | 🟢 **-100%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ✅ | 254K | 🟢 **-100%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.6M | ✅ | 254K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 83.4M | ✅ | 269K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 162.2M | ✅ | 268K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 86.1M | ✅ | 268K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 162.9M | ✅ | 268K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 87.1M | ✅ | 268K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 162.3M | ✅ | 268K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 42.5M | ✅ | 41K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 80.4M | ✅ | 113K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.6M | ✅ | 93K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 13.3M | ✅ | 18K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 18K | 🟢 **-100%** |
| items.json | items with null instance elements | 1 | ✅ | 72.0M | ✅ | 116K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 77.0M | ✅ | 117K | 🟢 **-100%** |
| maxItems.json | maxItems validation | 4 | ✅ | 67.3M | ✅ | 267K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.2M | ✅ | 262K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.4M | ✅ | 268K | 🟢 **-100%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.7M | ✅ | 264K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ✅ | 264K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.2M | ✅ | 264K | 🟢 **-100%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 73.2M | ✅ | 261K | 🟢 **-100%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 67.4M | ✅ | 259K | 🟢 **-100%** |
| minItems.json | minItems validation | 4 | ✅ | 81.7M | ✅ | 269K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 55.3M | ✅ | 262K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.6M | ✅ | 268K | 🟢 **-100%** |
| minimum.json | minimum validation | 4 | ✅ | 73.1M | ✅ | 267K | 🟢 **-100%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 73.3M | ✅ | 263K | 🟢 **-100%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 67.4M | ✅ | 257K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ✅ | 267K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 74.0M | ✅ | 242K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 70.1M | ✅ | 223K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 218K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 202K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 220K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 72.6M | ✅ | 158K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 68.1M | ✅ | 157K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 65.7M | ✅ | 95K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 49.9M | ✅ | 92K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.4M | ✅ | 168K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 85.1M | ✅ | 123K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 64.5M | ✅ | 113K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.4M | ✅ | 112K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.3M | ✅ | 56K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 115K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.6M | ✅ | 109K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.6M | ✅ | 49K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 36.2M | ✅ | 114K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 53.9M | ✅ | 264K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 21.7M | ✅ | 251K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ✅ | 116K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 78K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.6M | ✅ | 88K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 113K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 53.1M | ✅ | 90K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ✅ | 55K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 22.1M | ✅ | 32K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ✅ | 116K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ✅ | 57K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 25.4M | ✅ | 76K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.3M | ✅ | 67K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.3M | ✅ | 65K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 45.4M | ✅ | 28K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 34.4M | ✅ | 49K | 🟢 **-100%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 26.1M | ✅ | 76K | 🟢 **-100%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 73.5M | ✅ | 72K | 🟢 **-100%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 11.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.4M | ✅ | 114K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 25.8M | ✅ | 75K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.5M | ✅ | 8K | 🟢 **-100%** |
| ref.json | refs with quote | 2 | ✅ | 49.8M | ✅ | 63K | 🟢 **-100%** |
| ref.json | Location-independent identifier | 2 | ✅ | 73.4M | ✅ | 104K | 🟢 **-100%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 44.0M | ✅ | 76K | 🟢 **-100%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 54.1M | ✅ | 167K | 🟢 **-100%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 47.5M | ✅ | 72K | 🟢 **-100%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 73.4M | ✅ | 102K | 🟢 **-100%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 52.7M | ✅ | 94K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.1M | ✅ | 85K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 43.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 42.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 32.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 35.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 26.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 24.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 38.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 60.7M | ✅ | 103K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 85.2M | ✅ | 118K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 49.2M | ✅ | 236K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.7M | ✅ | 238K | 🟢 **-99%** |
| type.json | integer type matches integers | 8 | ✅ | 61.4M | ✅ | 244K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 65.6M | ✅ | 248K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 65.2M | ✅ | 248K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 56.5M | ✅ | 244K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 61.0M | ✅ | 245K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 63.0M | ✅ | 244K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.6M | ✅ | 243K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.5M | ✅ | 240K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 73.2M | ✅ | 249K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 68.9M | ✅ | 243K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 73.7M | ✅ | 247K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.5M | ✅ | 264K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.6M | ✅ | 82K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.6M | ✅ | 78K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 86.0M | ✅ | 272K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.3M | ✅ | 84K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.3M | ✅ | 80K | 🟢 **-100%** |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 259K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 84.1M | ✅ | 265K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 240K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.1M | ✅ | 267K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ✅ | 252K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 267K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ✅ | 251K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.0M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.7M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.7M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 19.4M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.2M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.0M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.1M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.2M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.9M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.4M | ✅ | 240K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.9M | ✅ | 237K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 236K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ✅ | 240K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.5M | ✅ | 242K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ✅ | 120K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 139K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.6M | ✅ | 136K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 131K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ✅ | 121K | 🟢 **-99%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.0M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.8M | ✅ | 255K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 87.4M | ✅ | 268K | 🟢 **-100%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 36.1M | ✅ | 59K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.3M | ✅ | 236K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.5M | ✅ | 108K | 🟢 **-99%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 49.2M | ✅ | 18K | 🟢 **-100%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 17.0M | ✅ | 40K | 🟢 **-100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 166.8M | ✅ | 59K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.0M | ✅ | 38K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 177.8M | ✅ | 252K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 88.3M | ✅ | 99K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 37.6M | ✅ | 37K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 36.7M | ✅ | 63K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 103K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 90.2M | ✅ | 159K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.7M | ✅ | 27K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.5M | ✅ | 110K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 38.8M | ✅ | 54K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.8M | ✅ | 96K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 166.9M | ✅ | 71K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 24.8M | ✅ | 50K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.1M | ✅ | 99K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 48K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 26.7M | ✅ | 38K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 82.7M | ✅ | 104K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 140.7M | ✅ | 213K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 75.0M | ✅ | 182K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 102.1M | ✅ | 160K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 86.2M | ✅ | 149K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 166.5M | ✅ | 109K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 85.2M | ✅ | 102K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 108.0M | ✅ | 103K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 86.1M | ✅ | 99K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.4M | ✅ | 51K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 87.4M | ✅ | 101K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.0M | ✅ | 97K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 99.4M | ✅ | 223K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 166.2M | ✅ | 222K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 74.4M | ✅ | 158K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 78.1M | ✅ | 50K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 104.0M | ✅ | 102K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 130.2M | ✅ | 99K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 77.7M | ✅ | 569K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.3M | ✅ | 451K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 75.7M | ✅ | 233K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 54.6M | ✅ | 222K | 🟢 **-100%** |
| const.json | const with array | 3 | ✅ | 62.6M | ✅ | 200K | 🟢 **-100%** |
| const.json | const with null | 2 | ✅ | 130.7M | ✅ | 218K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 81.6M | ✅ | 224K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 120.3M | ✅ | 228K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 71.7M | ✅ | 208K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 96.0M | ✅ | 208K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 71.4M | ✅ | 216K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 93.6M | ✅ | 215K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 69.3M | ✅ | 228K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 123.3M | ✅ | 229K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.2M | ✅ | 226K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 117.5M | ✅ | 225K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 68.0M | ✅ | 229K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 88.7M | ✅ | 221K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 72.7M | ✅ | 225K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 100.4M | ✅ | 101K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 68.7M | ✅ | 77K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 106.5M | ✅ | 174K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 80.0M | ✅ | 179K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 24.1M | ✅ | 45K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 87.5M | ✅ | 135K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 106.0M | ✅ | 100K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 52.0M | ✅ | 96K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 60.9M | ✅ | 92K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.9M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 85.8M | ✅ | 100K | 🟢 **-100%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 100.9M | ✅ | 130K | 🟢 **-100%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 37.4M | ✅ | 112K | 🟢 **-100%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 41.3M | ✅ | 50K | 🟢 **-100%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 93.6M | ✅ | 129K | 🟢 **-100%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.5M | ✅ | 53K | 🟢 **-100%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.5M | ✅ | 56K | 🟢 **-100%** |
| enum.json | simple enum validation | 2 | ✅ | 83.7M | ✅ | 216K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 65.8M | ✅ | 198K | 🟢 **-100%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 70.2M | ✅ | 225K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 15.8M | ✅ | 64K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 87.7M | ✅ | 226K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 119.3M | ✅ | 222K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 27.3M | ✅ | 204K | 🟢 **-99%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 120.4M | ✅ | 223K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 71.7M | ✅ | 210K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 51.1M | ✅ | 227K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 72.7M | ✅ | 217K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 126.5M | ✅ | 228K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.4M | ✅ | 220K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 98.2M | ✅ | 226K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 79.4M | ✅ | 228K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 115.0M | ✅ | 229K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 94.3M | ✅ | 234K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 159.9M | ✅ | 235K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 97.0M | ✅ | 234K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 67.2M | ✅ | 235K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 98.5M | ✅ | 233K | 🟢 **-100%** |
| format.json | json-pointer format | 6 | ✅ | 161.0M | ✅ | 233K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 99.3M | ✅ | 229K | 🟢 **-100%** |
| format.json | uri-reference format | 6 | ✅ | 152.8M | ✅ | 236K | 🟢 **-100%** |
| format.json | uri-template format | 6 | ✅ | 87.9M | ✅ | 236K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 49.1M | ✅ | 27K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 25.2M | ✅ | 101K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 84.5M | ✅ | 86K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 102.7M | ✅ | 132K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 141.3M | ✅ | 230K | 🟢 **-100%** |
| items.json | items with boolean schemas | 3 | ✅ | 54.5M | ✅ | 160K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 15.4M | ✅ | 14K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 11.7M | ✅ | 16K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 84.6M | ✅ | 102K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 88.3M | ✅ | 105K | 🟢 **-100%** |
| maxItems.json | maxItems validation | 4 | ✅ | 93.4M | ✅ | 239K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 82.0M | ✅ | 237K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 60.3M | ✅ | 235K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 60.4M | ✅ | 233K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.1M | ✅ | 239K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 52.0M | ✅ | 235K | 🟢 **-100%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 54.8M | ✅ | 238K | 🟢 **-100%** |
| maximum.json | maximum validation | 4 | ✅ | 86.8M | ✅ | 238K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 82.0M | ✅ | 237K | 🟢 **-100%** |
| minItems.json | minItems validation | 4 | ✅ | 88.3M | ✅ | 239K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 78.6M | ✅ | 241K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 60.7M | ✅ | 228K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 61.9M | ✅ | 228K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 64.0M | ✅ | 231K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 45.5M | ✅ | 222K | 🟢 **-100%** |
| minimum.json | minimum validation | 4 | ✅ | 90.9M | ✅ | 234K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 81.0M | ✅ | 237K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 86.9M | ✅ | 213K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 80.7M | ✅ | 194K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 73.4M | ✅ | 196K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 63.3M | ✅ | 180K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 79.8M | ✅ | 194K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 101.0M | ✅ | 136K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 79.1M | ✅ | 136K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 76.4M | ✅ | 81K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 46.9M | ✅ | 81K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 70.6M | ✅ | 146K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 71.9M | ✅ | 225K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 95.7M | ✅ | 240K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 98.3M | ✅ | 109K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 72.8M | ✅ | 99K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.8M | ✅ | 100K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 74.2M | ✅ | 192K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 99.1M | ✅ | 168K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 76.1M | ✅ | 175K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 74.5M | ✅ | 146K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 47.6M | ✅ | 49K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 82.7M | ✅ | 103K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 49.9M | ✅ | 97K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 57.0M | ✅ | 59K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 81.6M | ✅ | 100K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 59.6M | ✅ | 232K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 27.6M | ✅ | 224K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.7M | ✅ | 106K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.6M | ✅ | 68K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ✅ | 75K | 🟢 **-100%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.2M | ✅ | 122K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 13.1M | ✅ | 97K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 52.3M | ✅ | 85K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.6M | ✅ | 49K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 45.0M | ✅ | 106K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 46.0M | ✅ | 26K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 77.0M | ✅ | 104K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.5M | ✅ | 45K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.6M | ✅ | 172K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.7M | ✅ | 132K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 104.7M | ✅ | 180K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 56.6M | ✅ | 172K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.7M | ✅ | 161K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.7M | ✅ | 142K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 24.3M | ✅ | 62K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 50.9M | ✅ | 55K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.1M | ✅ | 55K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ✅ | 24K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 32.7M | ✅ | 43K | 🟢 **-100%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 52.8M | ✅ | 60K | 🟢 **-100%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 37.7M | ✅ | 61K | 🟢 **-100%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 21.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.3M | ✅ | 95K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 47.0M | ✅ | 61K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 99.2M | ✅ | 96K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 74.5M | ✅ | 87K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.7M | ✅ | 6K | 🟢 **-100%** |
| ref.json | refs with quote | 2 | ✅ | 49.6M | ✅ | 52K | 🟢 **-100%** |
| ref.json | Location-independent identifier | 2 | ✅ | 40.3M | ✅ | 90K | 🟢 **-100%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 42.8M | ✅ | 88K | 🟢 **-100%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 35.2M | ✅ | 67K | 🟢 **-100%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 62.0M | ✅ | 142K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 29.0M | ✅ | 27K | 🟢 **-100%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 30.0M | ✅ | 28K | 🟢 **-100%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.5M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.8M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 34.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 39.1M | ✅ | 69K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.3M | ✅ | 91K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 86.4M | ✅ | 81K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 74K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 36.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 37.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 37.0M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 24.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 34.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 34.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 30.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.3M | ✅ | 89K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 98.7M | ✅ | 104K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 93.7M | ✅ | 101K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 47.4M | ✅ | 202K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ✅ | 205K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 70.7M | ✅ | 209K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 74.4M | ✅ | 210K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 70.7M | ✅ | 213K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 63.9M | ✅ | 210K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 68.1M | ✅ | 210K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 71.8M | ✅ | 211K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 70.6M | ✅ | 211K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 70.0M | ✅ | 203K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 84.9M | ✅ | 219K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 79.6M | ✅ | 204K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 81.8M | ✅ | 210K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ✅ | 222K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 36.1M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 20.1M | ✅ | 71K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 87.2M | ✅ | 241K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.2M | ✅ | 74K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 79.0M | ✅ | 74K | 🟢 **-100%** |
| optional/bignum.json | integer | 2 | ✅ | 94.2M | ✅ | 231K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 98.7M | ✅ | 234K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 73.6M | ✅ | 212K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 87.4M | ✅ | 236K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 66.8M | ✅ | 233K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 87.5M | ✅ | 239K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 66.4M | ✅ | 229K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 31.0M | ✅ | 210K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 40.2M | ✅ | 210K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.5M | ✅ | 211K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 20.8M | ✅ | 211K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.7M | ✅ | 207K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 16.9M | ✅ | 213K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 31.3M | ✅ | 209K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 31.0M | ✅ | 211K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 29.7M | ✅ | 216K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 33.0M | ✅ | 208K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 18.2M | ✅ | 222K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.5M | ✅ | 216K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.7M | ✅ | 212K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.8M | ✅ | 218K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.9M | ✅ | 220K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.6M | ✅ | 144K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.8M | ✅ | 174K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.9M | ✅ | 168K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 156K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ✅ | 138K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 28.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.2M | ✅ | 219K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.6M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 40.9M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 33.4M | ✅ | 238K | 🟢 **-99%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 98.5M | ✅ | 237K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.5M | ✅ | 224K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.1M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 31.7M | ✅ | 50K | 🟢 **-100%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 51.1M | ✅ | 44K | 🟢 **-100%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 50.5M | ✅ | 44K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 33.3M | ✅ | 207K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ✅ | 91K | 🟢 **-99%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 11.3M | ✅ | 32K | 🟢 **-100%** |

### draft7

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 26K | 🟢 **-100%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.6M | ✅ | 68K | 🟢 **-100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.7M | ✅ | 68K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 80.8M | ✅ | 75K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ✅ | 285K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 117K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.3M | ✅ | 42K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 43.3M | ✅ | 71K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 117K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 172K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.4M | ✅ | 58K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.4M | ✅ | 127K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 61K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.8M | ✅ | 111K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 81K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.0M | ✅ | 56K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 40.4M | ✅ | 50K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 41K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 250K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 208K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 182K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 80.9M | ✅ | 166K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 123K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 114K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 110K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 67K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 82.3M | ✅ | 113K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.0M | ✅ | 109K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 89.9M | ✅ | 250K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.7M | ✅ | 251K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 188K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 72.0M | ✅ | 57K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 117K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 111K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.7M | ✅ | 624K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ✅ | 500K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 67.2M | ✅ | 254K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 49.8M | ✅ | 244K | 🟢 **-100%** |
| const.json | const with array | 3 | ✅ | 58.4M | ✅ | 240K | 🟢 **-100%** |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 255K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 76.1M | ✅ | 254K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 111.8M | ✅ | 255K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.3M | ✅ | 243K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 94.3M | ✅ | 244K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.5M | ✅ | 244K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.8M | ✅ | 245K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ✅ | 255K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 106.3M | ✅ | 256K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.8M | ✅ | 255K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 103.2M | ✅ | 255K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 254K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 251K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.2M | ✅ | 252K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 89.5M | ✅ | 117K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.8M | ✅ | 86K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.7M | ✅ | 193K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 71.9M | ✅ | 200K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 51.2M | ✅ | 54K | 🟢 **-100%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ✅ | 145K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ✅ | 152K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 71.1M | ✅ | 113K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 74.5M | ✅ | 111K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.2M | ✅ | 109K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.6M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 62.5M | ✅ | 145K | 🟢 **-100%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 145K | 🟢 **-100%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.6M | ✅ | 126K | 🟢 **-100%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.4M | ✅ | 55K | 🟢 **-100%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 60.7M | ✅ | 147K | 🟢 **-100%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.8M | ✅ | 59K | 🟢 **-100%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 19.6M | ✅ | 59K | 🟢 **-100%** |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 246K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.3M | ✅ | 229K | 🟢 **-100%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.5M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.4M | ✅ | 75K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.4M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.7M | ✅ | 247K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 64.7M | ✅ | 239K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.3M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 56.4M | ✅ | 238K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.5M | ✅ | 250K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.5M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.7M | ✅ | 250K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ✅ | 245K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.4M | ✅ | 248K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 70.9M | ✅ | 253K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 63.3M | ✅ | 254K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 92.5M | ✅ | 256K | 🟢 **-100%** |
| format.json | idn-email format | 6 | ✅ | 92.2M | ✅ | 255K | 🟢 **-100%** |
| format.json | regex format | 6 | ✅ | 91.9M | ✅ | 256K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 86.6M | ✅ | 255K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 83.8M | ✅ | 255K | 🟢 **-100%** |
| format.json | idn-hostname format | 6 | ✅ | 80.1M | ✅ | 255K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 86.9M | ✅ | 256K | 🟢 **-100%** |
| format.json | date format | 6 | ✅ | 89.1M | ✅ | 255K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 83.6M | ✅ | 256K | 🟢 **-100%** |
| format.json | time format | 6 | ✅ | 89.8M | ✅ | 254K | 🟢 **-100%** |
| format.json | json-pointer format | 6 | ✅ | 83.6M | ✅ | 255K | 🟢 **-100%** |
| format.json | relative-json-pointer format | 6 | ✅ | 83.8M | ✅ | 255K | 🟢 **-100%** |
| format.json | iri format | 6 | ✅ | 89.6M | ✅ | 255K | 🟢 **-100%** |
| format.json | iri-reference format | 6 | ✅ | 90.1M | ✅ | 255K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 84.5M | ✅ | 255K | 🟢 **-100%** |
| format.json | uri-reference format | 6 | ✅ | 92.9M | ✅ | 255K | 🟢 **-100%** |
| format.json | uri-template format | 6 | ✅ | 92.9M | ✅ | 255K | 🟢 **-100%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 93.9M | ✅ | 241K | 🟢 **-100%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.9M | ✅ | 263K | 🟢 **-100%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.1M | ✅ | 264K | 🟢 **-100%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.4M | ✅ | 172K | 🟢 **-100%** |
| if-then-else.json | if and else without then | 3 | ✅ | 71.3M | ✅ | 159K | 🟢 **-100%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ✅ | 142K | 🟢 **-100%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 93K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 75.1M | ✅ | 153K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ✅ | 143K | 🟢 **-100%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.5M | ✅ | 147K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.3M | ✅ | 36K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 53.6M | ✅ | 111K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 66.8M | ✅ | 89K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 144K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 84.0M | ✅ | 253K | 🟢 **-100%** |
| items.json | items with boolean schemas | 3 | ✅ | 65.7M | ✅ | 177K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 12.9M | ✅ | 17K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 17K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 115K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 115K | 🟢 **-100%** |
| maxItems.json | maxItems validation | 4 | ✅ | 78.8M | ✅ | 257K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 254K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.2M | ✅ | 251K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.5M | ✅ | 249K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.8M | ✅ | 257K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.9M | ✅ | 253K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.2M | ✅ | 253K | 🟢 **-100%** |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ✅ | 255K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ✅ | 256K | 🟢 **-100%** |
| minItems.json | minItems validation | 4 | ✅ | 78.7M | ✅ | 257K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 254K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 57.8M | ✅ | 250K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.6M | ✅ | 248K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 59.5M | ✅ | 257K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.5M | ✅ | 254K | 🟢 **-99%** |
| minimum.json | minimum validation | 4 | ✅ | 76.8M | ✅ | 255K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 256K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ✅ | 236K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 218K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 214K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 200K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 216K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 153K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 152K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 69.0M | ✅ | 91K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 52.8M | ✅ | 88K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 59.8M | ✅ | 160K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 65.2M | ✅ | 248K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.3M | ✅ | 261K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 118K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 74.3M | ✅ | 110K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.6M | ✅ | 108K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.0M | ✅ | 216K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 188K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 194K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 163K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.7M | ✅ | 54K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 75.4M | ✅ | 112K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.4M | ✅ | 106K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.7M | ✅ | 63K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 110K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ✅ | 254K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.6M | ✅ | 243K | 🟢 **-98%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.2M | ✅ | 110K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ✅ | 73K | 🟢 **-100%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 85K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.9M | ✅ | 135K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 109K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 56.1M | ✅ | 88K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ✅ | 51K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.0M | ✅ | 116K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 51.7M | ✅ | 30K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 113K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ✅ | 54K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.2M | ✅ | 188K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.7M | ✅ | 142K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 199K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.9M | ✅ | 191K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.5M | ✅ | 180K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ✅ | 161K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 26.1M | ✅ | 71K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.7M | ✅ | 63K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.0M | ✅ | 62K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.2M | ✅ | 27K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 41.4M | ✅ | 47K | 🟢 **-100%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.7M | ✅ | 72K | 🟢 **-100%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 50.8M | ✅ | 68K | 🟢 **-100%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.0M | ✅ | 109K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.5M | ✅ | 71K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 105K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 94K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ✅ | 8K | 🟢 **-100%** |
| ref.json | refs with quote | 2 | ✅ | 54.1M | ✅ | 60K | 🟢 **-100%** |
| ref.json | Location-independent identifier | 2 | ✅ | 49.4M | ✅ | 98K | 🟢 **-100%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 50.9M | ✅ | 97K | 🟢 **-100%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 48.7M | ✅ | 72K | 🟢 **-100%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 158K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.2M | ✅ | 30K | 🟢 **-100%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.1M | ✅ | 30K | 🟢 **-100%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.2M | ✅ | 66K | 🟢 **-100%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.5M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.9M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.8M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.4M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.3M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 51.6M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.2M | ✅ | 77K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 98K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 90K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 80K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 46.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 42.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 98K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 116K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 89.3M | ✅ | 114K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 53.8M | ✅ | 228K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ✅ | 230K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 67.2M | ✅ | 238K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 69.4M | ✅ | 240K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 69.2M | ✅ | 239K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 236K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 63.0M | ✅ | 236K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 64.8M | ✅ | 237K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.9M | ✅ | 236K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.4M | ✅ | 233K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 243K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 72.3M | ✅ | 236K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 77.1M | ✅ | 239K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ✅ | 251K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.9M | ✅ | 78K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ✅ | 76K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.2M | ✅ | 260K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 81K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.4M | ✅ | 77K | 🟢 **-100%** |
| optional/bignum.json | integer | 2 | ✅ | 88.4M | ✅ | 251K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 254K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 63.4M | ✅ | 233K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 258K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 250K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 257K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ✅ | 251K | 🟢 **-100%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 348K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 21.3M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 429K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.4M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.8M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 19.7M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.9M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.3M | ✅ | 233K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 226K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ✅ | 232K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.8M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.0M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.5M | ✅ | 238K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.4M | ✅ | 157K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 191K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.1M | ✅ | 184K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 177K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 155K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.2M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ✅ | 248K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.9M | ✅ | 249K | 🟢 **-99%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.5M | ✅ | 234K | 🟢 **-99%** |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.7M | ✅ | 251K | 🟢 **-99%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.0M | ✅ | 180K | 🟢 **-100%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 92.5M | ✅ | 258K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.0M | ✅ | 227K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 32.7M | ✅ | 54K | 🟢 **-100%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 50.1M | ✅ | 96K | 🟢 **-100%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 59.5M | ✅ | 96K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 24.1M | ✅ | 233K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.2M | ✅ | 104K | 🟢 **-99%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.0M | ✅ | 34K | 🟢 **-100%** |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 32.5M | ✅ | 40K | 🟢 **-100%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.7M | ✅ | 68K | 🟢 **-100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 167.4M | ✅ | 66K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 78.5M | ✅ | 77K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 178.9M | ✅ | 294K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 87.6M | ✅ | 116K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 39.0M | ✅ | 42K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.8M | ✅ | 71K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 112.8M | ✅ | 117K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 88.6M | ✅ | 176K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 44.2M | ✅ | 64K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.7M | ✅ | 133K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 40.4M | ✅ | 63K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.0M | ✅ | 115K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 163.8M | ✅ | 82K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.3M | ✅ | 58K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 73.3M | ✅ | 117K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.7M | ✅ | 82K | 🟢 **-100%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 25.5M | ✅ | 112K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 36.3M | ✅ | 54K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.7M | ✅ | 45K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 82.4M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 166.6M | ✅ | 253K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 75.2M | ✅ | 211K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 102.1M | ✅ | 177K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 88.9M | ✅ | 171K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 167.1M | ✅ | 125K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 85.4M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 127.1M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 87.0M | ✅ | 113K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.4M | ✅ | 65K | 🟢 **-100%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 85.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 71.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 36.1M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 83.8M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 86.8M | ✅ | 119K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.9M | ✅ | 113K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 99.1M | ✅ | 256K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 100.3M | ✅ | 254K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 76.1M | ✅ | 186K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.6M | ✅ | 60K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 89.5M | ✅ | 121K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 59.3M | ✅ | 114K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 93.5M | ✅ | 621K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 71.0M | ✅ | 498K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 65.0M | ✅ | 259K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 42.9M | ✅ | 249K | 🟢 **-99%** |
| const.json | const with array | 3 | ✅ | 56.5M | ✅ | 248K | 🟢 **-100%** |
| const.json | const with null | 2 | ✅ | 87.7M | ✅ | 258K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 82.2M | ✅ | 259K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 79.0M | ✅ | 259K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 70.3M | ✅ | 247K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 72.4M | ✅ | 247K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 71.6M | ✅ | 252K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 64.7M | ✅ | 252K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 71.1M | ✅ | 258K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 82.4M | ✅ | 260K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.5M | ✅ | 259K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 79.2M | ✅ | 258K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 71.3M | ✅ | 258K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 64.5M | ✅ | 255K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 73.1M | ✅ | 257K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 71.1M | ✅ | 117K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 69.4M | ✅ | 85K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 89.7M | ✅ | 193K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 79.9M | ✅ | 202K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 38.4M | ✅ | 56K | 🟢 **-100%** |
| contains.json | contains with false if subschema | 2 | ✅ | 75.9M | ✅ | 147K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 87.9M | ✅ | 153K | 🟢 **-100%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 101.4M | ✅ | 268K | 🟢 **-100%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 105.2M | ✅ | 268K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 79.0M | ✅ | 265K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 77.3M | ✅ | 263K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 78.1M | ✅ | 117K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 56.7M | ✅ | 115K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.5M | ✅ | 112K | 🟢 **-100%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.7M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 63.6M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 100.7M | ✅ | 269K | 🟢 **-100%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.5M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 43.1M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 50.0M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 62.8M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 36.0M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 34.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 82.5M | ✅ | 253K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 51.0M | ✅ | 240K | 🟢 **-100%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 81.6M | ✅ | 256K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.6M | ✅ | 77K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 88.3M | ✅ | 257K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 79.1M | ✅ | 254K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 70.1M | ✅ | 247K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 81.8M | ✅ | 254K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 72.4M | ✅ | 247K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 84.9M | ✅ | 259K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 75.1M | ✅ | 253K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 83.3M | ✅ | 259K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 73.9M | ✅ | 253K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 72.4M | ✅ | 255K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.3M | ✅ | 262K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 79.7M | ✅ | 261K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 104.7M | ✅ | 265K | 🟢 **-100%** |
| format.json | idn-email format | 6 | ✅ | 102.4M | ✅ | 264K | 🟢 **-100%** |
| format.json | regex format | 6 | ✅ | 90.8M | ✅ | 264K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 90.6M | ✅ | 264K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 89.6M | ✅ | 264K | 🟢 **-100%** |
| format.json | idn-hostname format | 6 | ✅ | 89.8M | ✅ | 264K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 91.2M | ✅ | 264K | 🟢 **-100%** |
| format.json | date format | 6 | ✅ | 90.1M | ✅ | 264K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 90.7M | ✅ | 264K | 🟢 **-100%** |
| format.json | time format | 6 | ✅ | 90.5M | ✅ | 264K | 🟢 **-100%** |
| format.json | json-pointer format | 6 | ✅ | 90.9M | ✅ | 264K | 🟢 **-100%** |
| format.json | relative-json-pointer format | 6 | ✅ | 92.6M | ✅ | 263K | 🟢 **-100%** |
| format.json | iri format | 6 | ✅ | 90.9M | ✅ | 264K | 🟢 **-100%** |
| format.json | iri-reference format | 6 | ✅ | 90.2M | ✅ | 264K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 90.0M | ✅ | 264K | 🟢 **-100%** |
| format.json | uri-reference format | 6 | ✅ | 91.1M | ✅ | 264K | 🟢 **-100%** |
| format.json | uri-template format | 6 | ✅ | 90.6M | ✅ | 264K | 🟢 **-100%** |
| format.json | uuid format | 6 | ✅ | 89.6M | ✅ | 264K | 🟢 **-100%** |
| format.json | duration format | 6 | ✅ | 90.0M | ✅ | 264K | 🟢 **-100%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 92.2M | ✅ | 248K | 🟢 **-100%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 92.7M | ✅ | 271K | 🟢 **-100%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 93.2M | ✅ | 271K | 🟢 **-100%** |
| if-then-else.json | if and then without else | 3 | ✅ | 85.8M | ✅ | 175K | 🟢 **-100%** |
| if-then-else.json | if and else without then | 3 | ✅ | 85.7M | ✅ | 161K | 🟢 **-100%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 80.7M | ✅ | 144K | 🟢 **-100%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 93.0M | ✅ | 96K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 80.7M | ✅ | 155K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 83.2M | ✅ | 145K | 🟢 **-100%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 46.4M | ✅ | 148K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 41.8M | ✅ | 38K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 54.2M | ✅ | 112K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.7M | ✅ | 91K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 104.0M | ✅ | 144K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 78.0M | ✅ | 259K | 🟢 **-100%** |
| items.json | items with boolean schemas | 3 | ✅ | 58.9M | ✅ | 176K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 14.7M | ✅ | 15K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 17K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 84.5M | ✅ | 114K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 88.1M | ✅ | 114K | 🟢 **-100%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 105.1M | ✅ | 269K | 🟢 **-100%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 70.2M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 73.4M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 67.0M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 89.3M | ✅ | 263K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 78.3M | ✅ | 261K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 65.5M | ✅ | 257K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 61.6M | ✅ | 258K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 62.3M | ✅ | 264K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 53.1M | ✅ | 261K | 🟢 **-100%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 54.9M | ✅ | 261K | 🟢 **-100%** |
| maximum.json | maximum validation | 4 | ✅ | 85.0M | ✅ | 263K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 85.4M | ✅ | 262K | 🟢 **-100%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 103.5M | ✅ | 269K | 🟢 **-100%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 79.3M | ✅ | 161K | 🟢 **-100%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 67.8M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 74.3M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 67.3M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 65.7M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 104.4M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 80.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 86.7M | ✅ | 263K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 82.2M | ✅ | 264K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 65.0M | ✅ | 256K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 62.3M | ✅ | 257K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 63.8M | ✅ | 264K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 52.9M | ✅ | 262K | 🟢 **-100%** |
| minimum.json | minimum validation | 4 | ✅ | 85.3M | ✅ | 262K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 80.6M | ✅ | 261K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 86.3M | ✅ | 240K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 80.6M | ✅ | 220K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 73.8M | ✅ | 214K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 64.0M | ✅ | 200K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 79.6M | ✅ | 217K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 83.9M | ✅ | 156K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 79.1M | ✅ | 154K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 75.8M | ✅ | 94K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 46.0M | ✅ | 90K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 71.3M | ✅ | 167K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 70.7M | ✅ | 255K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 95.1M | ✅ | 265K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 98.4M | ✅ | 120K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 35.5M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 70.7M | ✅ | 112K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.4M | ✅ | 110K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 75.3M | ✅ | 217K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 99.7M | ✅ | 187K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 98.6M | ✅ | 198K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 76.1M | ✅ | 162K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 47.4M | ✅ | 57K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 82.8M | ✅ | 114K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 52.1M | ✅ | 107K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 56.3M | ✅ | 64K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 83.6M | ✅ | 113K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 60.3M | ✅ | 260K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 15.1M | ✅ | 244K | 🟢 **-98%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.5M | ✅ | 114K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ✅ | 77K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.1M | ✅ | 87K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.2M | ✅ | 137K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 20.1M | ✅ | 111K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 54.2M | ✅ | 88K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.9M | ✅ | 54K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.1M | ✅ | 117K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.9M | ✅ | 30K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 78.8M | ✅ | 114K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.8M | ✅ | 56K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.2M | ✅ | 191K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 144K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 101.9M | ✅ | 202K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 53.6M | ✅ | 192K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.8M | ✅ | 183K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.5M | ✅ | 163K | 🟢 **-100%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 12.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.7M | ✅ | 57K | 🟢 **-98%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 10.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 10.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.4M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.3M | ✅ | 73K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.7M | ✅ | 66K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.7M | ✅ | 64K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.1M | ✅ | 36K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 29.8M | ✅ | 73K | 🟢 **-100%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 39.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 2.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.7M | ✅ | 113K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.2M | ✅ | 74K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 99.3M | ✅ | 149K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 74.3M | ✅ | 140K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.0M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 48.6M | ✅ | 74K | 🟢 **-100%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 23.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 62.5M | ✅ | 248K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 29.3M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 28.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 35.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 42.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 82.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 31.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 47.3M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.8M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 24.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.0M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 35.8M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 35.1M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 35.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 33.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 35.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.5M | ✅ | 141K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.2M | ✅ | 131K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 76.2M | ✅ | 97K | 🟢 **-100%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.5M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 33.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 33.8M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 34.7M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 35.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 28.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 23.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 33.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 35.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 34.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 34.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 29.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 34.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.6M | ✅ | 101K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 99.6M | ✅ | 118K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 99.2M | ✅ | 116K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 46.7M | ✅ | 231K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.5M | ✅ | 234K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 72.3M | ✅ | 245K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 74.1M | ✅ | 248K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 73.3M | ✅ | 247K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 64.1M | ✅ | 244K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 68.1M | ✅ | 245K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 71.6M | ✅ | 246K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 70.4M | ✅ | 244K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 69.1M | ✅ | 242K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 85.2M | ✅ | 252K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 73.8M | ✅ | 244K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 84.6M | ✅ | 246K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 92.1M | ✅ | 268K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 50.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 49.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 77.5M | ✅ | 94K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 47.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 85.8M | ✅ | 95K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 36.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 29.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 20.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 91.0M | ✅ | 77K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.4M | ✅ | 75K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 32.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 44.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 37.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 43.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 36.1M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 73.6M | ✅ | 269K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 85.1M | ✅ | 268K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 33.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 62.7M | ✅ | 258K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 32.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 75.2M | ✅ | 102K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 75.2M | ✅ | 73K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 35.4M | ✅ | 89K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 16.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 24.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 23.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 34.2M | ✅ | 89K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 33.5M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 22.7M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.3M | ✅ | 32K | 🟢 **-100%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 92.7M | ✅ | 269K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 55.2M | ✅ | 267K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.1M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 21.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.5M | ✅ | 258K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 35.6M | ✅ | 80K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 20.3M | ✅ | 77K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 87.3M | ✅ | 269K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.8M | ✅ | 83K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 79.2M | ✅ | 79K | 🟢 **-100%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 52.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 85.5M | ✅ | 250K | 🟢 **-100%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 67.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 93.6M | ✅ | 256K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 98.3M | ✅ | 260K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 71.5M | ✅ | 242K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 86.6M | ✅ | 262K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 66.8M | ✅ | 254K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 89.2M | ✅ | 262K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 66.9M | ✅ | 257K | 🟢 **-100%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.5M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 76.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 64.1M | ✅ | 150K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 104.3M | ✅ | 150K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.0M | ✅ | 130K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 44.6M | ✅ | 93K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 49.5M | ✅ | 69K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 59.8M | ✅ | 152K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 35.2M | ✅ | 86K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.7M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 32.2M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.7M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 30.0M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 30.7M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 28.8M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 30.3M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 30.7M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 33.0M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 18.1M | ✅ | 240K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.8M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.8M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 36.8M | ✅ | 239K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 23.7M | ✅ | 240K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.6M | ✅ | 160K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.1M | ✅ | 192K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.6M | ✅ | 186K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 177K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ✅ | 157K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 12.2M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 27.8M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.6M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 43.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.8M | ✅ | 254K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.7M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.4M | ✅ | 257K | 🟢 **-99%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 13.3M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 34.3M | ✅ | 240K | 🟢 **-99%** |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 33.4M | ✅ | 258K | 🟢 **-99%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 80.0M | ✅ | 186K | 🟢 **-100%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.8M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 103.3M | ✅ | 265K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.2M | ✅ | 229K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.8M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 16.9M | ✅ | 255K | 🟢 **-98%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 31.5M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 69.7M | ✅ | 263K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 33.4M | ✅ | 236K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ✅ | 107K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 49.1M | ✅ | 76K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 47.7M | ✅ | 75K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 50.3M | ✅ | 55K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 85.0M | ✅ | 149K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 48.5M | ✅ | 55K | 🟢 **-100%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 9.8M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 55.5M | ✅ | 56K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.2M | ✅ | 137K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.2M | ✅ | 62K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.1M | ✅ | 113K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 108.3M | ✅ | 81K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.4M | ✅ | 58K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 114K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.3M | ✅ | 80K | 🟢 **-100%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.8M | ✅ | 108K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 36.3M | ✅ | 53K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.2M | ✅ | 44K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 63.7M | ✅ | 118K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 255K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.4M | ✅ | 205K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 59.5M | ✅ | 175K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 65.3M | ✅ | 169K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.3M | ✅ | 125K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.5M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.4M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 63.0M | ✅ | 113K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 67K | 🟢 **-100%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 66.8M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.3M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 41.3M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 39.0M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 63.0M | ✅ | 80K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 33.7M | ✅ | 114K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 76.8M | ✅ | 254K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 76.6M | ✅ | 255K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 58.4M | ✅ | 182K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 45.6M | ✅ | 59K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 72.1M | ✅ | 122K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 67.6M | ✅ | 115K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 75.1M | ✅ | 619K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 52.7M | ✅ | 486K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 52.8M | ✅ | 257K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 38.0M | ✅ | 248K | 🟢 **-99%** |
| const.json | const with array | 3 | ✅ | 40.6M | ✅ | 246K | 🟢 **-99%** |
| const.json | const with null | 2 | ✅ | 54.8M | ✅ | 258K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 33.6M | ✅ | 257K | 🟢 **-99%** |
| const.json | const with true does not match 1 | 3 | ✅ | 62.7M | ✅ | 257K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 52.3M | ✅ | 245K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 49.9M | ✅ | 245K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 55.7M | ✅ | 249K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 53.6M | ✅ | 250K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 56.0M | ✅ | 256K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 61.8M | ✅ | 258K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 58.5M | ✅ | 257K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 55.9M | ✅ | 257K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 28.1M | ✅ | 257K | 🟢 **-99%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 52.6M | ✅ | 256K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 44.7M | ✅ | 257K | 🟢 **-99%** |
| contains.json | contains keyword validation | 6 | ✅ | 55.7M | ✅ | 113K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 56.7M | ✅ | 84K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 51.8M | ✅ | 191K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 63.0M | ✅ | 199K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 37.6M | ✅ | 55K | 🟢 **-100%** |
| contains.json | contains with false if subschema | 2 | ✅ | 60.9M | ✅ | 143K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 54.3M | ✅ | 151K | 🟢 **-100%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 76.7M | ✅ | 267K | 🟢 **-100%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 80.3M | ✅ | 267K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 64.0M | ✅ | 264K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 65.3M | ✅ | 262K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 32.0M | ✅ | 114K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 49.7M | ✅ | 113K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.9M | ✅ | 110K | 🟢 **-100%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 55.0M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 79.9M | ✅ | 266K | 🟢 **-100%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.0M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 41.4M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.8M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 43.8M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 20.3M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 18.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 11.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 19.1M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 14.1M | ❌ | - | - |
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
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.5M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 26.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 54.1M | ✅ | 249K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 40.3M | ✅ | 235K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 63.3M | ✅ | 253K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.2M | ✅ | 70K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 69.3M | ✅ | 254K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 63.2M | ✅ | 250K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 57.4M | ✅ | 244K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 64.7M | ✅ | 250K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 57.0M | ✅ | 244K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 65.1M | ✅ | 254K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.9M | ✅ | 247K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 64.4M | ✅ | 254K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ✅ | 247K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 57.4M | ✅ | 253K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 62.4M | ✅ | 257K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 62.7M | ✅ | 255K | 🟢 **-100%** |
| format.json | email format | 7 | ✅ | 75.1M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 75.4M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 64.2M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 67.2M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 34.5M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 67.2M | ✅ | 260K | 🟢 **-100%** |
| format.json | hostname format | 7 | ✅ | 66.6M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 67.1M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 67.2M | ✅ | 260K | 🟢 **-100%** |
| format.json | time format | 7 | ✅ | 67.2M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 67.2M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 67.1M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 65.2M | ✅ | 260K | 🟢 **-100%** |
| format.json | iri-reference format | 7 | ✅ | 67.0M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 34.8M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 66.7M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 66.8M | ✅ | 255K | 🟢 **-100%** |
| format.json | uuid format | 7 | ✅ | 66.7M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 67.1M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.2M | ✅ | 248K | 🟢 **-100%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.1M | ✅ | 267K | 🟢 **-100%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 72.2M | ✅ | 266K | 🟢 **-100%** |
| if-then-else.json | if and then without else | 3 | ✅ | 67.3M | ✅ | 167K | 🟢 **-100%** |
| if-then-else.json | if and else without then | 3 | ✅ | 66.4M | ✅ | 155K | 🟢 **-100%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 63.1M | ✅ | 137K | 🟢 **-100%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 72.3M | ✅ | 95K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 66.2M | ✅ | 147K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 65.8M | ✅ | 138K | 🟢 **-100%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 38.4M | ✅ | 140K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 40.1M | ✅ | 35K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 48.9M | ✅ | 107K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 79.1M | ✅ | 137K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 60.7M | ✅ | 249K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 12.6M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 16K | 🟢 **-100%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 66.3M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 41.2M | ✅ | 74K | 🟢 **-100%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 39.9M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 62.5M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 66.1M | ✅ | 111K | 🟢 **-100%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 79.1M | ✅ | 262K | 🟢 **-100%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 53.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 58.6M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 53.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 68.2M | ✅ | 253K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 252K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.1M | ✅ | 250K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.2M | ✅ | 249K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 51.8M | ✅ | 256K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 44.0M | ✅ | 250K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.7M | ✅ | 250K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 67.0M | ✅ | 253K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.1M | ✅ | 254K | 🟢 **-100%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 78.1M | ✅ | 262K | 🟢 **-100%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 59.0M | ✅ | 153K | 🟢 **-100%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.5M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.8M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 50.4M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 49.0M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 79.1M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 62.2M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 68.2M | ✅ | 253K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.8M | ✅ | 252K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 52.4M | ✅ | 250K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 51.2M | ✅ | 250K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 52.1M | ✅ | 256K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 44.5M | ✅ | 251K | 🟢 **-99%** |
| minimum.json | minimum validation | 4 | ✅ | 65.2M | ✅ | 253K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.5M | ✅ | 252K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 67.6M | ✅ | 232K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 64.1M | ✅ | 209K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 59.1M | ✅ | 205K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 187K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.0M | ✅ | 205K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 66.9M | ✅ | 152K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 60.0M | ✅ | 151K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 58.7M | ✅ | 90K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 46.7M | ✅ | 88K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 55.0M | ✅ | 159K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 51.4M | ✅ | 244K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 76.6M | ✅ | 260K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 73.6M | ✅ | 116K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.7M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 59.4M | ✅ | 108K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.6M | ✅ | 105K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 58.2M | ✅ | 207K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 76.5M | ✅ | 175K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 58.2M | ✅ | 188K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 58.2M | ✅ | 153K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.7M | ✅ | 54K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 66.1M | ✅ | 110K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 43.7M | ✅ | 102K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.2M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.3M | ✅ | 109K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 50.6M | ✅ | 253K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.2M | ✅ | 239K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 110K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 74K | 🟢 **-100%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.1M | ✅ | 83K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.9M | ✅ | 129K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.5M | ✅ | 104K | 🟢 **-99%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 59.1M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 53.6M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 70.1M | ✅ | 258K | 🟢 **-100%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 70.2M | ✅ | 259K | 🟢 **-100%** |
| properties.json | object properties validation | 6 | ✅ | 49.7M | ✅ | 90K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ✅ | 52K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.5M | ✅ | 112K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 46.3M | ✅ | 29K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.0M | ✅ | 108K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.9M | ✅ | 55K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.0M | ✅ | 182K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 137K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 79.2M | ✅ | 191K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.2M | ✅ | 181K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.2M | ✅ | 172K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.5M | ✅ | 154K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 22.6M | ✅ | 72K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.8M | ✅ | 65K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 42.8M | ✅ | 36K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 36.6M | ✅ | 73K | 🟢 **-100%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.2M | ✅ | 109K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.9M | ✅ | 72K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 76.7M | ✅ | 147K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 58.1M | ✅ | 137K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 47.2M | ✅ | 72K | 🟢 **-100%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.1M | ✅ | 243K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.1M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 44.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 64.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 43.4M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.3M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.2M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 45.5M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 45.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 45.9M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 141K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 131K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 66.9M | ✅ | 96K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 44.5M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.3M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 43.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 31.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 40.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 46.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 36.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 45.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 55.8M | ✅ | 99K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 76.3M | ✅ | 113K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 76.7M | ✅ | 112K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 46.5M | ✅ | 229K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.3M | ✅ | 232K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 53.0M | ✅ | 238K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 59.9M | ✅ | 241K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 59.1M | ✅ | 241K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 52.5M | ✅ | 236K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 55.9M | ✅ | 237K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 57.4M | ✅ | 238K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 53.9M | ✅ | 237K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.2M | ✅ | 233K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 66.5M | ✅ | 242K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 58.4M | ✅ | 237K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 62.2M | ✅ | 240K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 71.4M | ✅ | 266K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 52.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 48.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 62.1M | ✅ | 92K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 48.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 68.7M | ✅ | 116K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 41.6M | ✅ | 66K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 70.5M | ✅ | 92K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.4M | ✅ | 121K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 38.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 51.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 42.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 45.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 18.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 72.2M | ✅ | 267K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 65.8M | ✅ | 266K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 39.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.3M | ✅ | 267K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 32.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 29.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 79.1M | ✅ | 134K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 30.7M | ✅ | 99K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 61.0M | ✅ | 71K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.0M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 22.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 10.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 26.9M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 26.4M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 24.1M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 16.7M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 44.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.6M | ✅ | 32K | 🟢 **-100%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 66.5M | ✅ | 266K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 47.8M | ✅ | 265K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 24.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.6M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.7M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ✅ | 250K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.5M | ✅ | 249K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 42.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 74.2M | ✅ | 266K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.5M | ✅ | 262K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.1M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 47.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 67.0M | ✅ | 242K | 🟢 **-100%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 75.2M | ✅ | 253K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 75.8M | ✅ | 257K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 55.6M | ✅ | 234K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 262K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.8M | ✅ | 254K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 262K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 53.9M | ✅ | 254K | 🟢 **-100%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 73.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 56.8M | ✅ | 147K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 80.2M | ✅ | 146K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.2M | ✅ | 126K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 44.2M | ✅ | 90K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 49.7M | ✅ | 69K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 51.2M | ✅ | 145K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 37.7M | ✅ | 84K | 🟢 **-100%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.5M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.4M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.1M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.1M | ✅ | 233K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 19.0M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.4M | ✅ | 233K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.8M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.7M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ✅ | 240K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 233K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.0M | ✅ | 236K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.7M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.2M | ✅ | 239K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.0M | ✅ | 154K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 12.3M | ✅ | 187K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.6M | ✅ | 180K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 173K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ✅ | 153K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.7M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.3M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 39.1M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 43.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.7M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ✅ | 254K | 🟢 **-99%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 40.9M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.0M | ✅ | 237K | 🟢 **-99%** |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.2M | ✅ | 254K | 🟢 **-99%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.8M | ✅ | 184K | 🟢 **-100%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 38.6M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 75.2M | ✅ | 262K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ✅ | 227K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ✅ | 251K | 🟢 **-98%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 23.9M | ✅ | 241K | 🟢 **-99%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.0M | ✅ | 242K | 🟢 **-99%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 33.6M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 57.2M | ✅ | 260K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ✅ | 233K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.0M | ✅ | 104K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.9M | ✅ | 75K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.5M | ✅ | 74K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 47.3M | ✅ | 55K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 66.7M | ✅ | 151K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 47.1M | ✅ | 54K | 🟢 **-100%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.1M | ❌ | - | - |
