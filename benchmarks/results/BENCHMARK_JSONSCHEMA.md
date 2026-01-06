# tjs vs jsonschema Benchmarks

Performance comparison of **tjs** vs **[jsonschema](https://www.npmjs.com/package/jsonschema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | jsonschema pass | jsonschema ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 24.8M | 182/199 | 114K | 182 | 🟢 **-100%** |
| draft6 | 276 | ✅ 276 | 29.7M | 249/276 | 124K | 249 | 🟢 **-100%** |
| draft7 | 313 | ✅ 313 | 15.6M | 272/313 | 131K | 272 | 🟢 **-99%** |
| draft2019-09 | 435 | ✅ 435 | 18.2M | 295/435 | 135K | 295 | 🟢 **-99%** |
| draft2020-12 | 448 | ✅ 448 | 19.2M | 268/448 | 141K | 268 | 🟢 **-99%** |
| **Total** | 1671 | 1670/1671 | 19.6M | 1266/1671 | 130K | 1266 | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **281.95x faster** (27 ns vs 7716 ns per test, 4986 tests in 1266 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 45K | 🟢 **-99%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 69.8M | ✅ | 68K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.4M | ✅ | 61K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 71.2M | ✅ | 294K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 121K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 39.7M | ✅ | 44K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 59.3M | ✅ | 75K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 58.8M | ✅ | 124K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 153.0M | ✅ | 183K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 35.0M | ✅ | 65K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 24.9M | ✅ | 135K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 32.1M | ✅ | 65K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.2M | ✅ | 116K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 69.8M | ✅ | 83K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.9M | ✅ | 59K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 44.2M | ✅ | 118K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 47.7M | ✅ | 53K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 25.1M | ✅ | 45K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 122K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 69.7M | ✅ | 177K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.7M | ✅ | 130K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 61.1M | ✅ | 121K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.7M | ✅ | 121K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.6M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.0M | ✅ | 65K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 62.3M | ✅ | 121K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.9M | ✅ | 117K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.5M | ✅ | 59K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.3M | ✅ | 125K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 60.5M | ✅ | 118K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 120K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 45.4M | ✅ | 119K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.4M | ✅ | 115K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.9M | ✅ | 156K | 🟢 **-100%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.8M | ✅ | 134K | 🟢 **-100%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.6M | ✅ | 59K | 🟢 **-100%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.2M | ✅ | 62K | 🟢 **-99%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 33.2M | ✅ | 60K | 🟢 **-100%** |
| enum.json | simple enum validation | 2 | ✅ | 68.5M | ✅ | 250K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 240K | 🟢 **-100%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 57.8M | ✅ | 259K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 15.0M | ✅ | 73K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 48.6M | ✅ | 252K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.1M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.9M | ✅ | 245K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 252K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.0M | ✅ | 243K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 256K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 52.7M | ✅ | 257K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 103.2M | ✅ | 262K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 52.3M | ✅ | 256K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 260K | 🟢 **-100%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 49.1M | ✅ | 253K | 🟢 **-99%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 253K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 65.7M | ✅ | 261K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 162.3M | ✅ | 265K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 65.8M | ✅ | 265K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 163.1M | ✅ | 265K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 64.2M | ✅ | 266K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 162.0M | ✅ | 266K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ✅ | 39K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 81.9M | ✅ | 114K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 55.5M | ✅ | 93K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 28.1M | ✅ | 17K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 11.7M | ✅ | 17K | 🟢 **-100%** |
| items.json | items with null instance elements | 1 | ✅ | 60.8M | ✅ | 117K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 64.3M | ✅ | 117K | 🟢 **-100%** |
| maxItems.json | maxItems validation | 4 | ✅ | 58.3M | ✅ | 271K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 49.4M | ✅ | 265K | 🟢 **-99%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 48.1M | ✅ | 272K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.8M | ✅ | 269K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 34.3M | ✅ | 271K | 🟢 **-99%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 56.3M | ✅ | 268K | 🟢 **-100%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 57.0M | ✅ | 265K | 🟢 **-100%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 57.2M | ✅ | 265K | 🟢 **-100%** |
| minItems.json | minItems validation | 4 | ✅ | 52.4M | ✅ | 258K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 48.5M | ✅ | 264K | 🟢 **-99%** |
| minProperties.json | minProperties validation | 6 | ✅ | 48.3M | ✅ | 271K | 🟢 **-99%** |
| minimum.json | minimum validation | 4 | ✅ | 57.0M | ✅ | 270K | 🟢 **-100%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 56.6M | ✅ | 266K | 🟢 **-100%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 57.1M | ✅ | 263K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.2M | ✅ | 269K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 59.8M | ✅ | 245K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 57.0M | ✅ | 225K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 46.4M | ✅ | 219K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 24.8M | ✅ | 204K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 60.0M | ✅ | 220K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 61.2M | ✅ | 160K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 50.7M | ✅ | 159K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 49.5M | ✅ | 96K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 42.1M | ✅ | 93K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 50.5M | ✅ | 169K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 69.7M | ✅ | 124K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 53.3M | ✅ | 115K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.1M | ✅ | 113K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.7M | ✅ | 55K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.0M | ✅ | 117K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.9M | ✅ | 111K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 39.8M | ✅ | 48K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 60.0M | ✅ | 116K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 46.3M | ✅ | 267K | 🟢 **-99%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.6M | ✅ | 250K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.8M | ✅ | 117K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ✅ | 77K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ✅ | 89K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 16.1M | ✅ | 113K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 45.8M | ✅ | 90K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.4M | ✅ | 54K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 38.7M | ✅ | 31K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 57.2M | ✅ | 116K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.8M | ✅ | 57K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 22.6M | ✅ | 73K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 23.5M | ✅ | 67K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ✅ | 66K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 39.3M | ✅ | 28K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 35.0M | ✅ | 50K | 🟢 **-100%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 44.2M | ✅ | 76K | 🟢 **-100%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 50.5M | ✅ | 72K | 🟢 **-100%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 12.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.3M | ✅ | 114K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 21.5M | ✅ | 75K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 5.4M | ✅ | 8K | 🟢 **-100%** |
| ref.json | refs with quote | 2 | ✅ | 44.2M | ✅ | 63K | 🟢 **-100%** |
| ref.json | Location-independent identifier | 2 | ✅ | 61.1M | ✅ | 105K | 🟢 **-100%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 40.1M | ✅ | 77K | 🟢 **-100%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 41.6M | ✅ | 169K | 🟢 **-100%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 39.8M | ✅ | 72K | 🟢 **-100%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 61.0M | ✅ | 103K | 🟢 **-100%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 49.1M | ✅ | 94K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 54.1M | ✅ | 86K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 42.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 38.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 38.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 17.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 28.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 40.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.2M | ✅ | 104K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 66.8M | ✅ | 120K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 43.3M | ✅ | 238K | 🟢 **-99%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ✅ | 239K | 🟢 **-99%** |
| type.json | integer type matches integers | 8 | ✅ | 48.9M | ✅ | 247K | 🟢 **-99%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 252K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 55.2M | ✅ | 252K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 49.0M | ✅ | 247K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 52.2M | ✅ | 247K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 53.6M | ✅ | 250K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 49.7M | ✅ | 248K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.4M | ✅ | 246K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 60.6M | ✅ | 256K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 54.2M | ✅ | 249K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 57.3M | ✅ | 252K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ✅ | 264K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.8M | ✅ | 81K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.9M | ✅ | 78K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 63.9M | ✅ | 275K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 57.1M | ✅ | 84K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 53.9M | ✅ | 81K | 🟢 **-100%** |
| optional/bignum.json | integer | 2 | ✅ | 67.7M | ✅ | 260K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 68.7M | ✅ | 266K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 52.2M | ✅ | 245K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 63.3M | ✅ | 271K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.1M | ✅ | 259K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 63.3M | ✅ | 270K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 50.1M | ✅ | 259K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 25.7M | ✅ | 239K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.7M | ✅ | 239K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.5M | ✅ | 240K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.0M | ✅ | 240K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.6M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.3M | ✅ | 239K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 23.7M | ✅ | 240K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.3M | ✅ | 239K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 30.3M | ✅ | 242K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.4M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.3M | ✅ | 246K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.4M | ✅ | 242K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ✅ | 243K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.3M | ✅ | 245K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 17.5M | ✅ | 246K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.9M | ✅ | 122K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ✅ | 142K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.7M | ✅ | 137K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.6M | ✅ | 133K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ✅ | 121K | 🟢 **-99%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.8M | ✅ | 256K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.8M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 66.9M | ✅ | 271K | 🟢 **-100%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 32.0M | ✅ | 59K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.8M | ✅ | 240K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ✅ | 109K | 🟢 **-99%** |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 45.2M | ✅ | 24K | 🟢 **-100%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 65K | 🟢 **-100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 157.5M | ✅ | 63K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 83.8M | ✅ | 74K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 172.5M | ✅ | 279K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 84.6M | ✅ | 108K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 38.7M | ✅ | 40K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.1M | ✅ | 67K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 111.3M | ✅ | 111K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 86.4M | ✅ | 168K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.1M | ✅ | 63K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 18.5M | ✅ | 125K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 36.3M | ✅ | 60K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.4M | ✅ | 108K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.1M | ✅ | 78K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.5M | ✅ | 55K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 73.1M | ✅ | 109K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 32.0M | ✅ | 51K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 26.6M | ✅ | 43K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 77.9M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.3M | ✅ | 245K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 72.0M | ✅ | 194K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 90.1M | ✅ | 170K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 86.1M | ✅ | 165K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 121K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 80.0M | ✅ | 113K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 126.2M | ✅ | 113K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 80.6M | ✅ | 110K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.3M | ✅ | 66K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 71.1M | ✅ | 114K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.6M | ✅ | 109K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 94.1M | ✅ | 244K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 244K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 69.8M | ✅ | 177K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 68.4M | ✅ | 57K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 87.0M | ✅ | 118K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 130.2M | ✅ | 112K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 72.0M | ✅ | 590K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.2M | ✅ | 497K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 70.7M | ✅ | 262K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 52.7M | ✅ | 252K | 🟢 **-100%** |
| const.json | const with array | 3 | ✅ | 59.5M | ✅ | 250K | 🟢 **-100%** |
| const.json | const with null | 2 | ✅ | 127.7M | ✅ | 265K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 76.2M | ✅ | 263K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 89.0M | ✅ | 262K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.7M | ✅ | 251K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 97.3M | ✅ | 252K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 66.6M | ✅ | 255K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.1M | ✅ | 255K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 64.0M | ✅ | 263K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 120.3M | ✅ | 266K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 69.3M | ✅ | 264K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 118.6M | ✅ | 264K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 67.8M | ✅ | 264K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 86.4M | ✅ | 264K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 69.4M | ✅ | 265K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 102.7M | ✅ | 116K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.9M | ✅ | 85K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 74.1M | ✅ | 193K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 73.5M | ✅ | 201K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 40.4M | ✅ | 55K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 32.9M | ✅ | 154K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 111.0M | ✅ | 116K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 55.5M | ✅ | 115K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 61.3M | ✅ | 111K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 9.9M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 58.4M | ✅ | 150K | 🟢 **-100%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.8M | ✅ | 149K | 🟢 **-100%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 36.1M | ✅ | 129K | 🟢 **-100%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 27.3M | ✅ | 57K | 🟢 **-100%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 60.9M | ✅ | 150K | 🟢 **-100%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 13.0M | ✅ | 59K | 🟢 **-100%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 31.3M | ✅ | 64K | 🟢 **-100%** |
| enum.json | simple enum validation | 2 | ✅ | 115.8M | ✅ | 254K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.2M | ✅ | 243K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 123.1M | ✅ | 260K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.3M | ✅ | 78K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 124.2M | ✅ | 259K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 61.9M | ✅ | 259K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 90.7M | ✅ | 252K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.5M | ✅ | 259K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 97.5M | ✅ | 252K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 79.6M | ✅ | 263K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 107.4M | ✅ | 258K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 79.3M | ✅ | 263K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 106.3M | ✅ | 258K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 68.5M | ✅ | 259K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 115.7M | ✅ | 268K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 74.3M | ✅ | 265K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 158.7M | ✅ | 271K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 95.2M | ✅ | 270K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 154.1M | ✅ | 270K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 94.7M | ✅ | 269K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 156.8M | ✅ | 270K | 🟢 **-100%** |
| format.json | json-pointer format | 6 | ✅ | 94.9M | ✅ | 269K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 152.2M | ✅ | 270K | 🟢 **-100%** |
| format.json | uri-reference format | 6 | ✅ | 92.9M | ✅ | 269K | 🟢 **-100%** |
| format.json | uri-template format | 6 | ✅ | 158.7M | ✅ | 270K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.4M | ✅ | 41K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 68.7M | ✅ | 112K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 62.3M | ✅ | 91K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 160.5M | ✅ | 144K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 69.1M | ✅ | 260K | 🟢 **-100%** |
| items.json | items with boolean schemas | 3 | ✅ | 73.8M | ✅ | 178K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 24.1M | ✅ | 17K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 12.6M | ✅ | 17K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 80.7M | ✅ | 114K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 128.2M | ✅ | 115K | 🟢 **-100%** |
| maxItems.json | maxItems validation | 4 | ✅ | 84.7M | ✅ | 265K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 112.8M | ✅ | 265K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.4M | ✅ | 263K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 77.7M | ✅ | 262K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.9M | ✅ | 267K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 64.4M | ✅ | 264K | 🟢 **-100%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.2M | ✅ | 263K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 131.7M | ✅ | 266K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 82.2M | ✅ | 265K | 🟢 **-100%** |
| minItems.json | minItems validation | 4 | ✅ | 128.7M | ✅ | 267K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 78.2M | ✅ | 266K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 89.0M | ✅ | 257K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 59.4M | ✅ | 257K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 83.9M | ✅ | 266K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 52.0M | ✅ | 263K | 🟢 **-99%** |
| minimum.json | minimum validation | 4 | ✅ | 126.3M | ✅ | 265K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 75.0M | ✅ | 267K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 129.5M | ✅ | 243K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 74.7M | ✅ | 223K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 98.2M | ✅ | 217K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 59.7M | ✅ | 203K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 121.7M | ✅ | 221K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 80.1M | ✅ | 159K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 111.5M | ✅ | 156K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 72.4M | ✅ | 94K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 54.7M | ✅ | 91K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 67.2M | ✅ | 167K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 88.6M | ✅ | 259K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 89.0M | ✅ | 268K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 159.1M | ✅ | 121K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 68.8M | ✅ | 113K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 43.7M | ✅ | 112K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 69.8M | ✅ | 219K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 158.4M | ✅ | 185K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 64.5M | ✅ | 194K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 101.6M | ✅ | 161K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.5M | ✅ | 55K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 123.7M | ✅ | 114K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 53.7M | ✅ | 109K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 72.8M | ✅ | 64K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 78.4M | ✅ | 112K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 77.1M | ✅ | 260K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 27.2M | ✅ | 250K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 28.2M | ✅ | 114K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.9M | ✅ | 75K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.5M | ✅ | 87K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ✅ | 136K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.8M | ✅ | 109K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 66.3M | ✅ | 91K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.2M | ✅ | 53K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 50.7M | ✅ | 118K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 43.9M | ✅ | 31K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 110.9M | ✅ | 113K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.6M | ✅ | 55K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.5M | ✅ | 181K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.3M | ✅ | 143K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 172.3M | ✅ | 201K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.9M | ✅ | 192K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 44.7M | ✅ | 181K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.3M | ✅ | 161K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 27.7M | ✅ | 72K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.1M | ✅ | 65K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 60.1M | ✅ | 64K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ✅ | 27K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 38.3M | ✅ | 49K | 🟢 **-100%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.0M | ✅ | 74K | 🟢 **-100%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 34.0M | ✅ | 72K | 🟢 **-100%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 20.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.7M | ✅ | 111K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.5M | ✅ | 74K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 94.3M | ✅ | 106K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 71.3M | ✅ | 96K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.8M | ✅ | 8K | 🟢 **-100%** |
| ref.json | refs with quote | 2 | ✅ | 44.1M | ✅ | 62K | 🟢 **-100%** |
| ref.json | Location-independent identifier | 2 | ✅ | 34.3M | ✅ | 103K | 🟢 **-100%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 34.2M | ✅ | 100K | 🟢 **-100%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 32.9M | ✅ | 76K | 🟢 **-100%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 58.1M | ✅ | 165K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 26.6M | ✅ | 31K | 🟢 **-100%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 25.9M | ✅ | 32K | 🟢 **-100%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 41.8M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.6M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 32.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 33.1M | ✅ | 81K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 80.9M | ✅ | 102K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 80.8M | ✅ | 93K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.7M | ✅ | 84K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 33.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 34.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 33.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 26.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 27.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 22.8M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 32.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 28.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 28.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 60.0M | ✅ | 101K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 93.7M | ✅ | 116K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 94.7M | ✅ | 114K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 44.2M | ✅ | 232K | 🟢 **-99%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.6M | ✅ | 234K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 67.8M | ✅ | 244K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 70.3M | ✅ | 246K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 70.0M | ✅ | 246K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 59.9M | ✅ | 243K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 64.3M | ✅ | 243K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 67.4M | ✅ | 243K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.2M | ✅ | 243K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.4M | ✅ | 239K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 78.8M | ✅ | 250K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 73.8M | ✅ | 242K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 79.2M | ✅ | 245K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.4M | ✅ | 254K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 34.9M | ✅ | 81K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.8M | ✅ | 81K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 82.1M | ✅ | 269K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.8M | ✅ | 84K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 75.0M | ✅ | 79K | 🟢 **-100%** |
| optional/bignum.json | integer | 2 | ✅ | 89.5M | ✅ | 258K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 88.3M | ✅ | 262K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 68.1M | ✅ | 240K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 83.1M | ✅ | 264K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 64.1M | ✅ | 257K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 84.0M | ✅ | 265K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 64.0M | ✅ | 258K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 35.7M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 32.1M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.5M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 30.0M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.8M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 28.2M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 30.7M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 30.0M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 29.3M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.6M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ✅ | 242K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.1M | ✅ | 238K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ✅ | 237K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ✅ | 242K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.7M | ✅ | 242K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.8M | ✅ | 157K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.7M | ✅ | 191K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.8M | ✅ | 184K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 176K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ✅ | 156K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ✅ | 254K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ✅ | 259K | 🟢 **-99%** |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.1M | ✅ | 265K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.3M | ✅ | 233K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 30.0M | ✅ | 58K | 🟢 **-100%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 50.1M | ✅ | 50K | 🟢 **-100%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 50.1M | ✅ | 50K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 32.5M | ✅ | 235K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.9M | ✅ | 106K | 🟢 **-99%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 10.9M | ✅ | 38K | 🟢 **-100%** |

### draft7

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ✅ | 42K | 🟢 **-99%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.4M | ✅ | 71K | 🟢 **-100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 139.7M | ✅ | 68K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 63.4M | ✅ | 78K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 150.8M | ✅ | 295K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 69.4M | ✅ | 117K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 53.1M | ✅ | 43K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.9M | ✅ | 72K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 103.9M | ✅ | 121K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.3M | ✅ | 178K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.0M | ✅ | 64K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.5M | ✅ | 132K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.6M | ✅ | 64K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.4M | ✅ | 115K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 139.7M | ✅ | 83K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.6M | ✅ | 58K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.0M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 36.3M | ✅ | 54K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 28.8M | ✅ | 45K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 67.7M | ✅ | 118K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 139.7M | ✅ | 259K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 59.5M | ✅ | 208K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 88.1M | ✅ | 178K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.3M | ✅ | 174K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 139.6M | ✅ | 127K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.7M | ✅ | 118K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 112.2M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.0M | ✅ | 114K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 79.8M | ✅ | 68K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 70.3M | ✅ | 119K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 41.8M | ✅ | 115K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 79.6M | ✅ | 257K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 139.6M | ✅ | 257K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 59.6M | ✅ | 189K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 67.0M | ✅ | 59K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 75.6M | ✅ | 123K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 112.3M | ✅ | 117K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 69.2M | ✅ | 639K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 87.9M | ✅ | 508K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 77.6M | ✅ | 265K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 48.0M | ✅ | 253K | 🟢 **-99%** |
| const.json | const with array | 3 | ✅ | 48.2M | ✅ | 253K | 🟢 **-99%** |
| const.json | const with null | 2 | ✅ | 112.3M | ✅ | 264K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 65.3M | ✅ | 263K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 105.7M | ✅ | 264K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 51.9M | ✅ | 254K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 86.9M | ✅ | 252K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 59.4M | ✅ | 253K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 89.5M | ✅ | 255K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 57.2M | ✅ | 264K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 265K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 57.8M | ✅ | 265K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 105.6M | ✅ | 264K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 57.8M | ✅ | 264K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.4M | ✅ | 259K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 59.9M | ✅ | 264K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 83.3M | ✅ | 118K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 56.3M | ✅ | 85K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 96.8M | ✅ | 196K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 61.5M | ✅ | 203K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 47.3M | ✅ | 55K | 🟢 **-100%** |
| contains.json | contains with false if subschema | 2 | ✅ | 63.5M | ✅ | 146K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 116.8M | ✅ | 156K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 33.1M | ✅ | 117K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 36.2M | ✅ | 116K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.5M | ✅ | 112K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 57.6M | ✅ | 154K | 🟢 **-100%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 83.8M | ✅ | 152K | 🟢 **-100%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.7M | ✅ | 132K | 🟢 **-100%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 42.0M | ✅ | 58K | 🟢 **-100%** |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 52.1M | ✅ | 154K | 🟢 **-100%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.8M | ✅ | 60K | 🟢 **-100%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 19.2M | ✅ | 64K | 🟢 **-100%** |
| enum.json | simple enum validation | 2 | ✅ | 67.7M | ✅ | 255K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.9M | ✅ | 244K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ✅ | 261K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 77K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 32.3M | ✅ | 261K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 61.3M | ✅ | 259K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 30.8M | ✅ | 252K | 🟢 **-99%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 55.1M | ✅ | 259K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 56.5M | ✅ | 252K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.6M | ✅ | 264K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 60.7M | ✅ | 258K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.8M | ✅ | 262K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 52.7M | ✅ | 257K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 59.2M | ✅ | 258K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 57.6M | ✅ | 268K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 57.1M | ✅ | 264K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 73.6M | ✅ | 273K | 🟢 **-100%** |
| format.json | idn-email format | 6 | ✅ | 72.3M | ✅ | 271K | 🟢 **-100%** |
| format.json | regex format | 6 | ✅ | 63.6M | ✅ | 271K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 71.1M | ✅ | 272K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 42.9M | ✅ | 271K | 🟢 **-99%** |
| format.json | idn-hostname format | 6 | ✅ | 69.6M | ✅ | 271K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 55.2M | ✅ | 272K | 🟢 **-100%** |
| format.json | date format | 6 | ✅ | 72.3M | ✅ | 272K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 72.8M | ✅ | 272K | 🟢 **-100%** |
| format.json | time format | 6 | ✅ | 77.5M | ✅ | 272K | 🟢 **-100%** |
| format.json | json-pointer format | 6 | ✅ | 79.4M | ✅ | 271K | 🟢 **-100%** |
| format.json | relative-json-pointer format | 6 | ✅ | 73.1M | ✅ | 272K | 🟢 **-100%** |
| format.json | iri format | 6 | ✅ | 73.0M | ✅ | 271K | 🟢 **-100%** |
| format.json | iri-reference format | 6 | ✅ | 73.4M | ✅ | 273K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 79.7M | ✅ | 273K | 🟢 **-100%** |
| format.json | uri-reference format | 6 | ✅ | 73.2M | ✅ | 273K | 🟢 **-100%** |
| format.json | uri-template format | 6 | ✅ | 71.3M | ✅ | 273K | 🟢 **-100%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 82.8M | ✅ | 254K | 🟢 **-100%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 82.4M | ✅ | 278K | 🟢 **-100%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 75.3M | ✅ | 278K | 🟢 **-100%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ✅ | 179K | 🟢 **-100%** |
| if-then-else.json | if and else without then | 3 | ✅ | 59.5M | ✅ | 164K | 🟢 **-100%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 64.3M | ✅ | 145K | 🟢 **-100%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 75.2M | ✅ | 97K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 67.1M | ✅ | 157K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.4M | ✅ | 147K | 🟢 **-100%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.9M | ✅ | 152K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.9M | ✅ | 39K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 50.7M | ✅ | 114K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 59.5M | ✅ | 92K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 82.3M | ✅ | 147K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 63.4M | ✅ | 262K | 🟢 **-100%** |
| items.json | items with boolean schemas | 3 | ✅ | 57.3M | ✅ | 179K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 11.4M | ✅ | 17K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 17K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 70.2M | ✅ | 114K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 113K | 🟢 **-100%** |
| maxItems.json | maxItems validation | 4 | ✅ | 70.1M | ✅ | 266K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 65.8M | ✅ | 267K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.0M | ✅ | 263K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 52.5M | ✅ | 261K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.1M | ✅ | 268K | 🟢 **-99%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 37.9M | ✅ | 263K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.4M | ✅ | 264K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 68.6M | ✅ | 267K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 69.3M | ✅ | 265K | 🟢 **-100%** |
| minItems.json | minItems validation | 4 | ✅ | 67.7M | ✅ | 266K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 65.7M | ✅ | 266K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 54.2M | ✅ | 259K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.1M | ✅ | 262K | 🟢 **-99%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.3M | ✅ | 269K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.0M | ✅ | 265K | 🟢 **-99%** |
| minimum.json | minimum validation | 4 | ✅ | 69.4M | ✅ | 267K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.5M | ✅ | 266K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 70.2M | ✅ | 242K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 68.6M | ✅ | 221K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 63.0M | ✅ | 212K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.4M | ✅ | 200K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.7M | ✅ | 219K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 68.9M | ✅ | 157K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 64.2M | ✅ | 152K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 61.3M | ✅ | 93K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 49.9M | ✅ | 90K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 55.8M | ✅ | 167K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 56.2M | ✅ | 258K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 78.7M | ✅ | 269K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 79.8M | ✅ | 118K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 71.0M | ✅ | 110K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.0M | ✅ | 112K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 59.0M | ✅ | 223K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 79.6M | ✅ | 189K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 59.2M | ✅ | 199K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 59.3M | ✅ | 162K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.1M | ✅ | 55K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 68.0M | ✅ | 114K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 42.8M | ✅ | 109K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ✅ | 67K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 68.5M | ✅ | 115K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 51.4M | ✅ | 259K | 🟢 **-99%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.7M | ✅ | 251K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.3M | ✅ | 114K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.2M | ✅ | 70K | 🟢 **-99%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.6M | ✅ | 87K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ✅ | 137K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 111K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 50.1M | ✅ | 90K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.9M | ✅ | 52K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.6M | ✅ | 120K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 47.3M | ✅ | 31K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.1M | ✅ | 116K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.6M | ✅ | 56K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.9M | ✅ | 194K | 🟢 **-99%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.1M | ✅ | 146K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 82.5M | ✅ | 204K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.5M | ✅ | 194K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.8M | ✅ | 185K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.0M | ✅ | 165K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ✅ | 72K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.1M | ✅ | 66K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.4M | ✅ | 65K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 42.3M | ✅ | 27K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 37.2M | ✅ | 48K | 🟢 **-100%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 47.5M | ✅ | 75K | 🟢 **-100%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 47.7M | ✅ | 69K | 🟢 **-100%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 22.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.2M | ✅ | 113K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.1M | ✅ | 75K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 79.7M | ✅ | 104K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 59.5M | ✅ | 93K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ✅ | 8K | 🟢 **-100%** |
| ref.json | refs with quote | 2 | ✅ | 50.2M | ✅ | 62K | 🟢 **-100%** |
| ref.json | Location-independent identifier | 2 | ✅ | 47.9M | ✅ | 102K | 🟢 **-100%** |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 47.5M | ✅ | 100K | 🟢 **-100%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 45.5M | ✅ | 75K | 🟢 **-100%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.0M | ✅ | 166K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.9M | ✅ | 31K | 🟢 **-100%** |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.7M | ✅ | 32K | 🟢 **-100%** |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.9M | ✅ | 70K | 🟢 **-100%** |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 49.8M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.3M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.3M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.7M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.5M | ✅ | 81K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 68.7M | ✅ | 100K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.0M | ✅ | 91K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 63.1M | ✅ | 84K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 47.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 39.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 40.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.0M | ✅ | 102K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 79.7M | ✅ | 119K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 79.7M | ✅ | 117K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 47.8M | ✅ | 234K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.6M | ✅ | 237K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 57.6M | ✅ | 249K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 59.4M | ✅ | 250K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 59.4M | ✅ | 251K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 50.5M | ✅ | 248K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 56.1M | ✅ | 248K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 57.4M | ✅ | 248K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 57.0M | ✅ | 246K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.6M | ✅ | 243K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 68.4M | ✅ | 253K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 57.9M | ✅ | 246K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 61.6M | ✅ | 249K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ✅ | 262K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ✅ | 80K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.9M | ✅ | 78K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 79.1M | ✅ | 273K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 65.6M | ✅ | 84K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.0M | ✅ | 80K | 🟢 **-100%** |
| optional/bignum.json | integer | 2 | ✅ | 78.3M | ✅ | 262K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 80.4M | ✅ | 266K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 57.4M | ✅ | 245K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.8M | ✅ | 268K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.7M | ✅ | 263K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 270K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.7M | ✅ | 263K | 🟢 **-100%** |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 343K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 23.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.4M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.5M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 238K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.3M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.0M | ✅ | 238K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.3M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.0M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.9M | ✅ | 240K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.8M | ✅ | 231K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.0M | ✅ | 245K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.0M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.2M | ✅ | 239K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ✅ | 241K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.4M | ✅ | 244K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ✅ | 162K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.2M | ✅ | 196K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.6M | ✅ | 188K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.9M | ✅ | 181K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.7M | ✅ | 160K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ✅ | 254K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.9M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ✅ | 259K | 🟢 **-99%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 4.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.1M | ✅ | 243K | 🟢 **-99%** |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.5M | ✅ | 259K | 🟢 **-99%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 65.3M | ✅ | 189K | 🟢 **-100%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 7.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 76.7M | ✅ | 268K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.8M | ✅ | 232K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.7M | ✅ | 58K | 🟢 **-100%** |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 56.0M | ✅ | 101K | 🟢 **-100%** |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 56.0M | ✅ | 101K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ✅ | 237K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.3M | ✅ | 109K | 🟢 **-99%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.1M | ✅ | 36K | 🟢 **-100%** |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ✅ | 22K | 🟢 **-100%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 33.2M | ✅ | 65K | 🟢 **-100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.6M | ✅ | 66K | 🟢 **-100%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 64.9M | ✅ | 76K | 🟢 **-100%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.0M | ✅ | 280K | 🟢 **-100%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 70.1M | ✅ | 117K | 🟢 **-100%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.0M | ✅ | 42K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.3M | ✅ | 71K | 🟢 **-100%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ✅ | 118K | 🟢 **-100%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 70.0M | ✅ | 171K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.4M | ✅ | 59K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.3M | ✅ | 130K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.8M | ✅ | 62K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.8M | ✅ | 113K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.9M | ✅ | 81K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.7M | ✅ | 57K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 58.5M | ✅ | 117K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.6M | ✅ | 81K | 🟢 **-100%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.6M | ✅ | 111K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 37.4M | ✅ | 52K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ✅ | 43K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 63.2M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.0M | ✅ | 250K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 58.2M | ✅ | 207K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 181K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 76.7M | ✅ | 167K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 136.8M | ✅ | 124K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.8M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.9M | ✅ | 112K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 68K | 🟢 **-100%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 66.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 45.5M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 66.6M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 68.8M | ✅ | 113K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 37.0M | ✅ | 109K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 76.8M | ✅ | 248K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 76.8M | ✅ | 249K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 58.2M | ✅ | 183K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 46.0M | ✅ | 57K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 72.0M | ✅ | 117K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 111K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 75.0M | ✅ | 618K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 52.0M | ✅ | 497K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 57.6M | ✅ | 248K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 37.5M | ✅ | 241K | 🟢 **-99%** |
| const.json | const with array | 3 | ✅ | 50.9M | ✅ | 234K | 🟢 **-100%** |
| const.json | const with null | 2 | ✅ | 68.0M | ✅ | 251K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 32.5M | ✅ | 250K | 🟢 **-99%** |
| const.json | const with true does not match 1 | 3 | ✅ | 62.2M | ✅ | 250K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 57.1M | ✅ | 239K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 56.5M | ✅ | 238K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 53.5M | ✅ | 241K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 53.4M | ✅ | 241K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 56.1M | ✅ | 250K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 31.8M | ✅ | 252K | 🟢 **-99%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 32.8M | ✅ | 250K | 🟢 **-99%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.3M | ✅ | 251K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 57.4M | ✅ | 249K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 44.9M | ✅ | 247K | 🟢 **-99%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 55.5M | ✅ | 249K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 54.6M | ✅ | 104K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.6M | ✅ | 85K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.8M | ✅ | 190K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.5M | ✅ | 198K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 38.6M | ✅ | 56K | 🟢 **-100%** |
| contains.json | contains with false if subschema | 2 | ✅ | 60.8M | ✅ | 145K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 67.4M | ✅ | 153K | 🟢 **-100%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 79.9M | ✅ | 262K | 🟢 **-100%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 79.1M | ✅ | 260K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 70.1M | ✅ | 259K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 66.8M | ✅ | 255K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 59.6M | ✅ | 114K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 49.8M | ✅ | 112K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 39.3M | ✅ | 109K | 🟢 **-100%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 56.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 68.1M | ✅ | 260K | 🟢 **-100%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.5M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.5M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 49.9M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 48.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 37.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 36.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.9M | ✅ | 242K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.9M | ✅ | 228K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.7M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.6M | ✅ | 66K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.0M | ✅ | 247K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 62.4M | ✅ | 245K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.4M | ✅ | 238K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 62.9M | ✅ | 244K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 55.3M | ✅ | 237K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 61.3M | ✅ | 248K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.5M | ✅ | 242K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 32.3M | ✅ | 249K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.4M | ✅ | 243K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 57.4M | ✅ | 246K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 62.6M | ✅ | 251K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 57.2M | ✅ | 252K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 74.3M | ✅ | 256K | 🟢 **-100%** |
| format.json | idn-email format | 6 | ✅ | 79.1M | ✅ | 255K | 🟢 **-100%** |
| format.json | regex format | 6 | ✅ | 74.3M | ✅ | 255K | 🟢 **-100%** |
| format.json | ipv4 format | 6 | ✅ | 66.6M | ✅ | 254K | 🟢 **-100%** |
| format.json | ipv6 format | 6 | ✅ | 66.5M | ✅ | 255K | 🟢 **-100%** |
| format.json | idn-hostname format | 6 | ✅ | 63.4M | ✅ | 255K | 🟢 **-100%** |
| format.json | hostname format | 6 | ✅ | 66.5M | ✅ | 255K | 🟢 **-100%** |
| format.json | date format | 6 | ✅ | 66.5M | ✅ | 255K | 🟢 **-100%** |
| format.json | date-time format | 6 | ✅ | 66.5M | ✅ | 255K | 🟢 **-100%** |
| format.json | time format | 6 | ✅ | 66.4M | ✅ | 255K | 🟢 **-100%** |
| format.json | json-pointer format | 6 | ✅ | 66.4M | ✅ | 256K | 🟢 **-100%** |
| format.json | relative-json-pointer format | 6 | ✅ | 66.5M | ✅ | 255K | 🟢 **-100%** |
| format.json | iri format | 6 | ✅ | 66.5M | ✅ | 254K | 🟢 **-100%** |
| format.json | iri-reference format | 6 | ✅ | 66.5M | ✅ | 255K | 🟢 **-100%** |
| format.json | uri format | 6 | ✅ | 66.6M | ✅ | 255K | 🟢 **-100%** |
| format.json | uri-reference format | 6 | ✅ | 66.5M | ✅ | 256K | 🟢 **-100%** |
| format.json | uri-template format | 6 | ✅ | 66.7M | ✅ | 256K | 🟢 **-100%** |
| format.json | uuid format | 6 | ✅ | 66.6M | ✅ | 255K | 🟢 **-100%** |
| format.json | duration format | 6 | ✅ | 66.6M | ✅ | 255K | 🟢 **-100%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 72.3M | ✅ | 241K | 🟢 **-100%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 72.3M | ✅ | 262K | 🟢 **-100%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 72.3M | ✅ | 264K | 🟢 **-100%** |
| if-then-else.json | if and then without else | 3 | ✅ | 66.5M | ✅ | 170K | 🟢 **-100%** |
| if-then-else.json | if and else without then | 3 | ✅ | 66.5M | ✅ | 158K | 🟢 **-100%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 63.0M | ✅ | 141K | 🟢 **-100%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 72.2M | ✅ | 93K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 66.2M | ✅ | 152K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 63.6M | ✅ | 143K | 🟢 **-100%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ✅ | 145K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 40.9M | ✅ | 36K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 48.3M | ✅ | 111K | 🟢 **-100%** |
| items.json | an array of schemas for items | 6 | ✅ | 60.6M | ✅ | 93K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 65.6M | ✅ | 143K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.9M | ✅ | 251K | 🟢 **-100%** |
| items.json | items with boolean schemas | 3 | ✅ | 57.6M | ✅ | 176K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 12.8M | ✅ | 14K | 🟢 **-100%** |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 17K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 65.9M | ✅ | 113K | 🟢 **-100%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 70.2M | ✅ | 114K | 🟢 **-100%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 78.8M | ✅ | 260K | 🟢 **-100%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 61.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 58.7M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 53.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 68.2M | ✅ | 256K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 252K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.1M | ✅ | 250K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.1M | ✅ | 248K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.4M | ✅ | 255K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 45.7M | ✅ | 251K | 🟢 **-99%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.8M | ✅ | 252K | 🟢 **-99%** |
| maximum.json | maximum validation | 4 | ✅ | 66.9M | ✅ | 255K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ✅ | 253K | 🟢 **-100%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 79.1M | ✅ | 259K | 🟢 **-100%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 59.3M | ✅ | 161K | 🟢 **-100%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.6M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.8M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 53.0M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 49.2M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 79.1M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 61.2M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 68.1M | ✅ | 255K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.7M | ✅ | 253K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 52.0M | ✅ | 249K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 51.2M | ✅ | 248K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 53.4M | ✅ | 256K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 46.2M | ✅ | 250K | 🟢 **-99%** |
| minimum.json | minimum validation | 4 | ✅ | 66.9M | ✅ | 255K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.1M | ✅ | 254K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 67.4M | ✅ | 233K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 64.3M | ✅ | 214K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 59.1M | ✅ | 210K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 199K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.9M | ✅ | 213K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 66.9M | ✅ | 152K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 62.0M | ✅ | 151K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 60.0M | ✅ | 91K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 47.2M | ✅ | 88K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 52.0M | ✅ | 159K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 55.2M | ✅ | 247K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 75.7M | ✅ | 259K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 76.8M | ✅ | 116K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.7M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 59.5M | ✅ | 109K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.8M | ✅ | 107K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 57.9M | ✅ | 210K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 76.7M | ✅ | 186K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 58.3M | ✅ | 193K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 58.3M | ✅ | 162K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.0M | ✅ | 55K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 66.0M | ✅ | 111K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.0M | ✅ | 105K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.2M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.3M | ✅ | 109K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 50.8M | ✅ | 252K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.1M | ✅ | 243K | 🟢 **-99%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ✅ | 114K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ✅ | 74K | 🟢 **-100%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.0M | ✅ | 84K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.2M | ✅ | 136K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.6M | ✅ | 109K | 🟢 **-99%** |
| properties.json | object properties validation | 6 | ✅ | 50.5M | ✅ | 89K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ✅ | 51K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 44.6M | ✅ | 116K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 45.9M | ✅ | 29K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.0M | ✅ | 112K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.9M | ✅ | 54K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.8M | ✅ | 187K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ✅ | 142K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 79.1M | ✅ | 196K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.7M | ✅ | 190K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.4M | ✅ | 179K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.1M | ✅ | 159K | 🟢 **-100%** |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 55K | 🟢 **-98%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 11.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.0M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 3.9M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.0M | ✅ | 70K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.5M | ✅ | 63K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.6M | ✅ | 62K | 🟢 **-100%** |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ✅ | 34K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 37.0M | ✅ | 73K | 🟢 **-100%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.3M | ✅ | 110K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.6M | ✅ | 71K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 76.8M | ✅ | 148K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 58.2M | ✅ | 139K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 47.5M | ✅ | 71K | 🟢 **-100%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 25.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.3M | ✅ | 235K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.1M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 45.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 64.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 34.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.6M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.3M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.6M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.2M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 44.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.2M | ✅ | 141K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 130K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 60.5M | ✅ | 95K | 🟢 **-100%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.6M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 45.5M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 44.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 34.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 42.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 47.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 44.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.6M | ✅ | 98K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 76.8M | ✅ | 115K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 76.4M | ✅ | 113K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 46.6M | ✅ | 224K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.3M | ✅ | 227K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 53.8M | ✅ | 235K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 59.7M | ✅ | 237K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 59.3M | ✅ | 238K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 52.8M | ✅ | 234K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 55.3M | ✅ | 234K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 58.1M | ✅ | 236K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 54.2M | ✅ | 233K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.0M | ✅ | 230K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 66.7M | ✅ | 240K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 58.0M | ✅ | 233K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 61.9M | ✅ | 236K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 71.3M | ✅ | 261K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 46.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 62.1M | ✅ | 93K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 48.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 68.7M | ✅ | 94K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 41.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 38.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 70.6M | ✅ | 76K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.3M | ✅ | 74K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 37.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 51.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 45.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 46.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 64.0M | ✅ | 261K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 66.1M | ✅ | 261K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 39.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.1M | ✅ | 249K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 32.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 61.2M | ✅ | 99K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 61.2M | ✅ | 70K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.1M | ✅ | 87K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 27.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 29.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.7M | ✅ | 87K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.1M | ✅ | 87K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.2M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.4M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 42.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.2M | ✅ | 30K | 🟢 **-100%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 66.5M | ✅ | 261K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 47.7M | ✅ | 260K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 12.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 6.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ✅ | 249K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.1M | ✅ | 78K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 76K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 74.2M | ✅ | 258K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.5M | ✅ | 81K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.3M | ✅ | 77K | 🟢 **-100%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 46.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 67.0M | ✅ | 239K | 🟢 **-100%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 53.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 74.9M | ✅ | 248K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 75.9M | ✅ | 250K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 56.5M | ✅ | 228K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 256K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.9M | ✅ | 248K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 256K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 53.9M | ✅ | 248K | 🟢 **-100%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.2M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 63.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 57.1M | ✅ | 147K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 80.0M | ✅ | 145K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 32.1M | ✅ | 127K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 44.4M | ✅ | 90K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 49.5M | ✅ | 69K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 54.8M | ✅ | 150K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 38.5M | ✅ | 85K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.7M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.5M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.1M | ✅ | 225K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.2M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.9M | ✅ | 227K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.6M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 232K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.7M | ✅ | 224K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.7M | ✅ | 230K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 231K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.4M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.9M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.6M | ✅ | 157K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.5M | ✅ | 190K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.3M | ✅ | 183K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 174K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.1M | ✅ | 154K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.3M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 39.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ✅ | 246K | 🟢 **-99%** |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.1M | ✅ | 247K | 🟢 **-99%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 40.7M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.9M | ✅ | 237K | 🟢 **-99%** |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.7M | ✅ | 249K | 🟢 **-99%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.8M | ✅ | 181K | 🟢 **-100%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 38.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 75.4M | ✅ | 255K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ✅ | 226K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ✅ | 246K | 🟢 **-98%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 32.3M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 55.0M | ✅ | 251K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.0M | ✅ | 231K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.1M | ✅ | 98K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 47.6M | ✅ | 73K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 47.6M | ✅ | 72K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 47.5M | ✅ | 52K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 63.1M | ✅ | 146K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.6M | ✅ | 52K | 🟢 **-100%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.1M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | jsonschema | jsonschema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 35.9M | ✅ | 35K | 🟢 **-100%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.3M | ✅ | 134K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 50K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.3M | ✅ | 113K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 153.1M | ✅ | 78K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.8M | ✅ | 57K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 115K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.2M | ✅ | 81K | 🟢 **-100%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.3M | ✅ | 110K | 🟢 **-100%** |
| allOf.json | allOf | 4 | ✅ | 39.8M | ✅ | 52K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.3M | ✅ | 43K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ✅ | 252K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 208K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 182K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 167K | 🟢 **-100%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ✅ | 123K | 🟢 **-100%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 62.1M | ✅ | 112K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.5M | ✅ | 64K | 🟢 **-100%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 51.0M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 79.7M | ✅ | 113K | 🟢 **-100%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 40.0M | ✅ | 108K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 248K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 89.7M | ✅ | 247K | 🟢 **-100%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 182K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.5M | ✅ | 56K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 117K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 111K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.8M | ✅ | 624K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 64.6M | ✅ | 496K | 🟢 **-99%** |
| const.json | const validation | 3 | ✅ | 67.4M | ✅ | 251K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 41.2M | ✅ | 242K | 🟢 **-99%** |
| const.json | const with array | 3 | ✅ | 57.8M | ✅ | 236K | 🟢 **-100%** |
| const.json | const with null | 2 | ✅ | 78.7M | ✅ | 253K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 76.0M | ✅ | 250K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 76.1M | ✅ | 251K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.1M | ✅ | 241K | 🟢 **-100%** |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.6M | ✅ | 240K | 🟢 **-100%** |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.6M | ✅ | 244K | 🟢 **-100%** |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 67.4M | ✅ | 243K | 🟢 **-100%** |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ✅ | 251K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 73.4M | ✅ | 253K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.7M | ✅ | 251K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.1M | ✅ | 252K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 50.0M | ✅ | 254K | 🟢 **-99%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 249K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ✅ | 250K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 64.5M | ✅ | 116K | 🟢 **-100%** |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.5M | ✅ | 89K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ✅ | 192K | 🟢 **-100%** |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 70.1M | ✅ | 198K | 🟢 **-100%** |
| contains.json | items + contains | 4 | ✅ | 42.2M | ✅ | 55K | 🟢 **-100%** |
| contains.json | contains with false if subschema | 2 | ✅ | 68.8M | ✅ | 144K | 🟢 **-100%** |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 153K | 🟢 **-100%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 96.0M | ✅ | 262K | 🟢 **-100%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 78.9M | ✅ | 261K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 83.4M | ✅ | 260K | 🟢 **-100%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 77.5M | ✅ | 258K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 113K | 🟢 **-100%** |
| default.json | invalid string value for default | 2 | ✅ | 54.9M | ✅ | 111K | 🟢 **-100%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 56.1M | ✅ | 108K | 🟢 **-100%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 64.6M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 263K | 🟢 **-100%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.0M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.0M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 54.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.6M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.0M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 8.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.5M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 12.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.5M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.5M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.2M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.4M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 243K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.1M | ✅ | 229K | 🟢 **-100%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.6M | ✅ | 247K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 70K | 🟢 **-100%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ✅ | 247K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.9M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.3M | ✅ | 237K | 🟢 **-100%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.8M | ✅ | 246K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.2M | ✅ | 237K | 🟢 **-100%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 250K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ✅ | 242K | 🟢 **-100%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 72.8M | ✅ | 249K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.9M | ✅ | 244K | 🟢 **-100%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 246K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ✅ | 254K | 🟢 **-100%** |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 64.3M | ✅ | 254K | 🟢 **-100%** |
| format.json | email format | 7 | ✅ | 95.9M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 92.4M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 78.2M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 78.7M | ✅ | 256K | 🟢 **-100%** |
| format.json | hostname format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 77.8M | ✅ | 255K | 🟢 **-100%** |
| format.json | time format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 95.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 78.5M | ✅ | 255K | 🟢 **-100%** |
| format.json | iri-reference format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 78.3M | ✅ | 251K | 🟢 **-100%** |
| format.json | uuid format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 78.4M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.2M | ✅ | 242K | 🟢 **-100%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.8M | ✅ | 264K | 🟢 **-100%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.2M | ✅ | 264K | 🟢 **-100%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.4M | ✅ | 170K | 🟢 **-100%** |
| if-then-else.json | if and else without then | 3 | ✅ | 76.5M | ✅ | 158K | 🟢 **-100%** |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.6M | ✅ | 140K | 🟢 **-100%** |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 92K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ✅ | 150K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ✅ | 140K | 🟢 **-100%** |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.1M | ✅ | 143K | 🟢 **-100%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.5M | ✅ | 35K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 54.4M | ✅ | 110K | 🟢 **-100%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 142K | 🟢 **-100%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 72.0M | ✅ | 252K | 🟢 **-100%** |
| items.json | items and subitems | 6 | ✅ | 12.7M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 16K | 🟢 **-100%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 43.1M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.5M | ✅ | 74K | 🟢 **-100%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.8M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 74.9M | ✅ | 112K | 🟢 **-100%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 259K | 🟢 **-100%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.6M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 80.3M | ✅ | 255K | 🟢 **-100%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 253K | 🟢 **-100%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.4M | ✅ | 250K | 🟢 **-100%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 247K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 255K | 🟢 **-100%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.4M | ✅ | 251K | 🟢 **-100%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ✅ | 251K | 🟢 **-100%** |
| maximum.json | maximum validation | 4 | ✅ | 76.5M | ✅ | 255K | 🟢 **-100%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 74.1M | ✅ | 254K | 🟢 **-100%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.9M | ✅ | 260K | 🟢 **-100%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.8M | ✅ | 157K | 🟢 **-100%** |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 57.5M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 93.9M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 67.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 78.9M | ✅ | 255K | 🟢 **-100%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ✅ | 253K | 🟢 **-100%** |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ✅ | 249K | 🟢 **-100%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.2M | ✅ | 250K | 🟢 **-100%** |
| minProperties.json | minProperties validation | 6 | ✅ | 56.6M | ✅ | 255K | 🟢 **-100%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 51.0M | ✅ | 250K | 🟢 **-100%** |
| minimum.json | minimum validation | 4 | ✅ | 78.6M | ✅ | 257K | 🟢 **-100%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.2M | ✅ | 255K | 🟢 **-100%** |
| multipleOf.json | by int | 3 | ✅ | 77.7M | ✅ | 234K | 🟢 **-100%** |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ✅ | 214K | 🟢 **-100%** |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ✅ | 211K | 🟢 **-100%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 200K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 214K | 🟢 **-100%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 151K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 151K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 69.1M | ✅ | 89K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 53.9M | ✅ | 87K | 🟢 **-100%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 65.2M | ✅ | 158K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 64.1M | ✅ | 247K | 🟢 **-100%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.0M | ✅ | 258K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 116K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.0M | ✅ | 110K | 🟢 **-100%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.4M | ✅ | 107K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 213K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 187K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 194K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 162K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.8M | ✅ | 55K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 112K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.5M | ✅ | 105K | 🟢 **-100%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.5M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 109K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 55.6M | ✅ | 252K | 🟢 **-100%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.1M | ✅ | 243K | 🟢 **-98%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ✅ | 114K | 🟢 **-100%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 73K | 🟢 **-100%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.0M | ✅ | 83K | 🟢 **-99%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.3M | ✅ | 133K | 🟢 **-99%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.0M | ✅ | 107K | 🟢 **-99%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.3M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.4M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 258K | 🟢 **-100%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 258K | 🟢 **-100%** |
| properties.json | object properties validation | 6 | ✅ | 56.5M | ✅ | 89K | 🟢 **-100%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.9M | ✅ | 50K | 🟢 **-100%** |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ✅ | 114K | 🟢 **-100%** |
| properties.json | properties with escaped characters | 2 | ✅ | 52.6M | ✅ | 29K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 111K | 🟢 **-100%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.3M | ✅ | 53K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation | 6 | ✅ | 41.0M | ✅ | 185K | 🟢 **-100%** |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ✅ | 141K | 🟢 **-99%** |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 195K | 🟢 **-100%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.3M | ✅ | 188K | 🟢 **-100%** |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.6M | ✅ | 177K | 🟢 **-100%** |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ✅ | 158K | 🟢 **-100%** |
| ref.json | root pointer ref | 4 | ✅ | 24.6M | ✅ | 68K | 🟢 **-100%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.1M | ✅ | 62K | 🟢 **-100%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.8M | ✅ | 34K | 🟢 **-100%** |
| ref.json | nested refs | 2 | ✅ | 38.4M | ✅ | 73K | 🟢 **-100%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.2M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.2M | ✅ | 108K | 🟢 **-100%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.4M | ✅ | 69K | 🟢 **-100%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 147K | 🟢 **-100%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ✅ | 138K | 🟢 **-100%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.0M | ✅ | 68K | 🟢 **-100%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 237K | 🟢 **-100%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.0M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.0M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 41.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.0M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.4M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 139K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 129K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 94K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 45.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 40.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 50.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 46.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 97K | 🟢 **-100%** |
| required.json | required default validation | 1 | ✅ | 89.9M | ✅ | 115K | 🟢 **-100%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 113K | 🟢 **-100%** |
| required.json | required with escaped characters | 2 | ✅ | 54.2M | ✅ | 225K | 🟢 **-100%** |
| required.json | required properties whose names are J... | 7 | ✅ | 26.2M | ✅ | 229K | 🟢 **-99%** |
| type.json | integer type matches integers | 9 | ✅ | 66.4M | ✅ | 236K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 238K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 69.2M | ✅ | 237K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 59.1M | ✅ | 234K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 64.7M | ✅ | 235K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 235K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.1M | ✅ | 235K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.5M | ✅ | 233K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 242K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 70.8M | ✅ | 234K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 238K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 261K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 93K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 119K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.8M | ✅ | 68K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.9M | ✅ | 93K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.4M | ✅ | 120K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 52.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 51.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 46.4M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.5M | ✅ | 261K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 259K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.3M | ✅ | 262K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 93.8M | ✅ | 136K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.7M | ✅ | 100K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 68.9M | ✅ | 71K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 13.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.8M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 88K | 🟢 **-100%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 48.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.1M | ✅ | 30K | 🟢 **-100%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.5M | ✅ | 260K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 258K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.9M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ✅ | 249K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.9M | ✅ | 246K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ✅ | 260K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.0M | ✅ | 256K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.2M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.2M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 241K | 🟢 **-100%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 250K | 🟢 **-100%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 252K | 🟢 **-100%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 232K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 255K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ✅ | 248K | 🟢 **-100%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 256K | 🟢 **-100%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ✅ | 249K | 🟢 **-100%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ✅ | 145K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 96.0M | ✅ | 143K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.5M | ✅ | 126K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.9M | ✅ | 89K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.8M | ✅ | 69K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ✅ | 147K | 🟢 **-100%** |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.2M | ✅ | 82K | 🟢 **-100%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.1M | ✅ | 227K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.6M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 228K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 226K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 230K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.6M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.2M | ✅ | 229K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 35.1M | ✅ | 234K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.4M | ✅ | 226K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ✅ | 236K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.3M | ✅ | 231K | 🟢 **-98%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.0M | ✅ | 231K | 🟢 **-98%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.4M | ✅ | 235K | 🟢 **-99%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.8M | ✅ | 237K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ✅ | 155K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.2M | ✅ | 190K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.4M | ✅ | 183K | 🟢 **-99%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ✅ | 177K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ✅ | 154K | 🟢 **-98%** |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.9M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ✅ | 249K | 🟢 **-99%** |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.7M | ✅ | 233K | 🟢 **-99%** |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.5M | ✅ | 250K | 🟢 **-99%** |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.6M | ✅ | 180K | 🟢 **-100%** |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.9M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.3M | ✅ | 256K | 🟢 **-100%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ✅ | 227K | 🟢 **-98%** |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.2M | ✅ | 248K | 🟢 **-98%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.6M | ✅ | 235K | 🟢 **-99%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.7M | ✅ | 237K | 🟢 **-99%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 65.8M | ✅ | 252K | 🟢 **-100%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ✅ | 231K | 🟢 **-99%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.7M | ✅ | 102K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 55.2M | ✅ | 72K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 55.0M | ✅ | 71K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.6M | ✅ | 52K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 147K | 🟢 **-100%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.8M | ✅ | 51K | 🟢 **-100%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.4M | ❌ | - | - |
