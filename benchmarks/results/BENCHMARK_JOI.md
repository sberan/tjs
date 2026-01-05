# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | joi pass | joi ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 25.6M | 82/199 | 437K | 82 | 🟢 **-98%** |
| draft6 | 276 | ✅ 276 | 29.2M | 98/276 | 446K | 98 | 🟢 **-98%** |
| draft7 | 313 | ✅ 313 | 15.1M | 102/313 | 416K | 102 | 🟢 **-97%** |
| draft2019-09 | 435 | ✅ 435 | 18.6M | 131/435 | 479K | 131 | 🟢 **-97%** |
| draft2020-12 | 448 | ✅ 448 | 19.1M | 129/448 | 430K | 129 | 🟢 **-98%** |
| **Total** | 1671 | 1670/1671 | 19.6M | 542/1671 | 442K | 542 | 🟢 **-98%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **105.64x faster** (21 ns vs 2262 ns per test, 1591 tests in 542 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.1M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 38.7M | ✅ | 5.1M | 🟢 **-87%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 146.2M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 40.3M | ✅ | 4.6M | 🟢 **-89%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 4.7M | 🟢 **-96%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 38.7M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 29.5M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 57.0M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 151.9M | ✅ | 4.7M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 36.6M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 32.4M | ✅ | 477K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 42.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 69.9M | ✅ | 749K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 47.7M | ✅ | 4.5M | 🟢 **-91%** |
| allOf.json | allOf | 4 | ✅ | 46.6M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 21.5M | ✅ | 77K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.8M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 61.9M | ✅ | 1.9M | 🟢 **-97%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.7M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.7M | ✅ | 464K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 459K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.1M | ✅ | 307K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.6M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 60.9M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 42.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 45.8M | ✅ | 312K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.3M | ✅ | 1.0M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 67.6M | ✅ | 418K | 🟢 **-99%** |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 769K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 49.7M | ✅ | 930K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 73.4M | ✅ | 386K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.3M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.5M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.0M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.3M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 44.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 65.4M | ✅ | 533K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.7M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 29.9M | ✅ | 789K | 🟢 **-97%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 358K | 🟢 **-98%** |
| enum.json | enum with escaped characters | 3 | ✅ | 50.3M | ✅ | 781K | 🟢 **-98%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 94.8M | ✅ | 466K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 57.2M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 103.2M | ✅ | 455K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 50.9M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 852K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.6M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 836K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 57.8M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 600K | 🟢 **-99%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 48.6M | ✅ | 580K | 🟢 **-99%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 610K | 🟢 **-99%** |
| format.json | email format | 6 | ✅ | 72.9M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 86.0M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 72.2M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 162.1M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 74.3M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 162.8M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.0M | ✅ | 293K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 80.1M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 60.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.6M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 66.0M | ✅ | 4.3M | 🟢 **-94%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 70.3M | ✅ | 4.1M | 🟢 **-94%** |
| maxItems.json | maxItems validation | 4 | ✅ | 68.1M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 52.8M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.5M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 45.9M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 66.7M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 65.9M | ❌ | - | - |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 66.8M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 62.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 67.9M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 52.2M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 53.3M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 66.7M | ❌ | - | - |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 66.9M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 62.1M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.2M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 67.4M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 64.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 59.1M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 504K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 65.9M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 64.6M | ✅ | 370K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 60.3M | ✅ | 233K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 60.1M | ✅ | 293K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 47.7M | ✅ | 356K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 51.9M | ✅ | 361K | 🟢 **-99%** |
| not.json | double negation | 1 | ✅ | 76.7M | ✅ | 436K | 🟢 **-99%** |
| oneOf.json | oneOf | 4 | ✅ | 65.2M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.5M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.0M | ✅ | 232K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 66.0M | ✅ | 518K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.3M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.3M | ✅ | 253K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.1M | ✅ | 302K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 50.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.2M | ✅ | 4.4M | 🟢 **-82%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.9M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.2M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.3M | ✅ | 4.4M | 🟢 **-74%** |
| properties.json | object properties validation | 6 | ✅ | 50.0M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.0M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 45.3M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 61.9M | ✅ | 948K | 🟢 **-98%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.7M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.8M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.4M | ✅ | 441K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 50.2M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 42.7M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 36.3M | ✅ | 474K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.7M | ✅ | 596K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 66.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.0M | ✅ | 490K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 47.2M | ✅ | 494K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 66.6M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 45.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 51.0M | ✅ | 506K | 🟢 **-99%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 45.6M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 66.5M | ✅ | 490K | 🟢 **-99%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 66.2M | ✅ | 489K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.8M | ✅ | 490K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 40.7M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 41.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 44.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 76.6M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 32.5M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 26.1M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 51.9M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 59.4M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 58.8M | ✅ | 624K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 52.0M | ✅ | 478K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 55.6M | ✅ | 533K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 57.1M | ✅ | 604K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 53.6M | ✅ | 347K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.2M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 66.5M | ✅ | 566K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 57.8M | ✅ | 296K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 64.7M | ✅ | 310K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 74.3M | ✅ | 4.4M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.3M | ✅ | 4.4M | 🟢 **-93%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 75.4M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 75.9M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 56.3M | ✅ | 474K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 4.1M | 🟢 **-94%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 4.2M | 🟢 **-94%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 51.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 26.7M | ✅ | 492K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 27.6M | ✅ | 487K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.7M | ✅ | 479K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.7M | ✅ | 481K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.4M | ✅ | 374K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.1M | ✅ | 650K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.4M | ✅ | 494K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.5M | ✅ | 496K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.9M | ✅ | 853K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.6M | ✅ | 326K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.5M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 39.7M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 75.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 33.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.2M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.0M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.1M | ✅ | 4.8M | 🟢 **-97%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 80.5M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.7M | ✅ | 4.1M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 4.4M | 🟢 **-95%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.1M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.1M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 4.4M | 🟢 **-95%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.5M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 470K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.4M | ✅ | 743K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ✅ | 4.3M | 🟢 **-94%** |
| allOf.json | allOf | 4 | ✅ | 39.1M | ✅ | 61K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 69K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.7M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 1.9M | 🟢 **-98%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.0M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 461K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 458K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 314K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 79.9M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 44.5M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 1.9M | 🟢 **-98%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.9M | ✅ | 2.0M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ✅ | 319K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 433K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 61.3M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 47.6M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.1M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.5M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 68.1M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 106.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.5M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.8M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 87.9M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 54.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.6M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 38.4M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 52.5M | ✅ | 4.5M | 🟢 **-91%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 772K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 52.8M | ✅ | 927K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.9M | ✅ | 462K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.5M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 4.4M | 🟢 **-95%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.8M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 25.2M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 84.4M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.4M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 45.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 60.6M | ✅ | 554K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.7M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.0M | ✅ | 794K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 15.2M | ✅ | 357K | 🟢 **-98%** |
| enum.json | enum with escaped characters | 3 | ✅ | 68.1M | ✅ | 786K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 104.2M | ✅ | 471K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.3M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 459K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.5M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.3M | ✅ | 854K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.8M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 838K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.9M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 603K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 95.0M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 91.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 162.3M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 84.0M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 133.9M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 91.2M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 161.7M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 92.8M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 146.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 90.2M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 33.0M | ✅ | 297K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 53.8M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 96.8M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.7M | ✅ | 4.3M | 🟢 **-95%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 62.6M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.8M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.9M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 4.4M | 🟢 **-94%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 4.4M | 🟢 **-95%** |
| maxItems.json | maxItems validation | 4 | ✅ | 38.1M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.4M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.9M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.4M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.8M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.6M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.6M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.1M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 56.5M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.9M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.0M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.3M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 500K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 1.9M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 360K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 71.0M | ✅ | 234K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 292K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 49.4M | ✅ | 360K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.4M | ✅ | 367K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 59.9M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.3M | ✅ | 4.4M | 🟢 **-95%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 445K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 77.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.3M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 65.9M | ✅ | 375K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 375K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 377K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ✅ | 236K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 522K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.6M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.4M | ✅ | 258K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 305K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 54.8M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.5M | ✅ | 4.4M | 🟢 **-69%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.7M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.1M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 4.4M | 🟢 **-76%** |
| properties.json | object properties validation | 6 | ✅ | 55.3M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 49.2M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.7M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 962K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.5M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 4.3M | 🟢 **-95%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.8M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.1M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 53.0M | ✅ | 441K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.2M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 38.7M | ✅ | 479K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.8M | ✅ | 596K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.3M | ✅ | 497K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 53.3M | ✅ | 498K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 89.9M | ✅ | 1.8M | 🟢 **-98%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.9M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.0M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 407K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.6M | ✅ | 479K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.1M | ✅ | 484K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.9M | ✅ | 480K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.4M | ✅ | 479K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.3M | ✅ | 483K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 486K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.0M | ✅ | 485K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 486K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 50.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 41.6M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 89.9M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 89.9M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 52.0M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.9M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 69.5M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 630K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 58.8M | ✅ | 477K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 64.6M | ✅ | 528K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.6M | ✅ | 601K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 64.6M | ✅ | 351K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.8M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 572K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 71.8M | ✅ | 299K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 77.3M | ✅ | 305K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.8M | ✅ | 4.2M | 🟢 **-95%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ✅ | 4.2M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 479K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.1M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.1M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.1M | ✅ | 528K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 536K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 534K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 534K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.6M | ✅ | 421K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 693K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.5M | ✅ | 533K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.6M | ✅ | 536K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 924K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.2M | ✅ | 372K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 93.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.1M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.6M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 47.6M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 47.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.4M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.0M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.5M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.1M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.6M | ✅ | 5.1M | 🟢 **-97%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 64.9M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ✅ | 4.3M | 🟢 **-97%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 70.2M | ✅ | 4.4M | 🟢 **-94%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.2M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.5M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 69.9M | ✅ | 4.4M | 🟢 **-94%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.9M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 34.3M | ✅ | 478K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 749K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 27.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 4.2M | 🟢 **-94%** |
| allOf.json | allOf | 4 | ✅ | 36.4M | ✅ | 58K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 31.1M | ✅ | 40K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 63.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 58.4M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 70.0M | ✅ | 1.9M | 🟢 **-97%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.3M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 66.8M | ✅ | 453K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 449K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.2M | ✅ | 306K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 68.8M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 76.6M | ✅ | 1.8M | 🟢 **-98%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.5M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 58.3M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 72.0M | ✅ | 322K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 71.3M | ✅ | 1.1M | 🟢 **-98%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 430K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 67.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 57.9M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 50.0M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 52.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 65.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 112.0M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 51.2M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 57.7M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 48.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 56.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 58.6M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 108.5M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 57.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 88.3M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.2M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 54.5M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 58.0M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 120.6M | ✅ | 4.4M | 🟢 **-96%** |
| default.json | invalid type for default | 2 | ✅ | 62.6M | ✅ | 769K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 34.1M | ✅ | 927K | 🟢 **-97%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 24.0M | ✅ | 461K | 🟢 **-98%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.9M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 56.6M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 80.2M | ✅ | 4.3M | 🟢 **-95%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 32.1M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 41.6M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 50.8M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.1M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 34.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 64.8M | ✅ | 534K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.8M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 60.8M | ✅ | 774K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 13.9M | ✅ | 352K | 🟢 **-97%** |
| enum.json | enum with escaped characters | 3 | ✅ | 67.0M | ✅ | 773K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 64.7M | ✅ | 459K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 57.1M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 63.0M | ✅ | 454K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 57.4M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 63.0M | ✅ | 847K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.6M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 64.1M | ✅ | 828K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.7M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 39.9M | ✅ | 603K | 🟢 **-98%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 30.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 57.5M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 72.8M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 72.9M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 70.0M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 69.7M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 72.9M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 69.6M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 72.0M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 71.3M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 72.8M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 73.0M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 73.2M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 73.7M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 73.1M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 76.6M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 72.6M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 73.8M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 73.0M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 78.8M | ✅ | 4.3M | 🟢 **-95%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.1M | ✅ | 4.3M | 🟢 **-95%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 71.0M | ✅ | 4.3M | 🟢 **-94%** |
| if-then-else.json | if and then without else | 3 | ✅ | 67.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 66.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 62.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 72.2M | ✅ | 974K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 66.0M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 65.6M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 41.0M | ✅ | 294K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 48.6M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 60.4M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 79.0M | ✅ | 4.3M | 🟢 **-95%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 63.0M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 57.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 23.9M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.2M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 66.1M | ✅ | 4.4M | 🟢 **-93%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 70.3M | ✅ | 4.4M | 🟢 **-94%** |
| maxItems.json | maxItems validation | 4 | ✅ | 68.1M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.8M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 53.2M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.7M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 44.3M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 46.3M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 61.7M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 64.4M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.7M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 49.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 51.4M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 53.9M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 46.3M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 66.9M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 63.6M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 67.4M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 63.8M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 58.9M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 52.1M | ✅ | 504K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.0M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 66.2M | ✅ | 367K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 62.4M | ✅ | 237K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 57.9M | ✅ | 297K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 46.8M | ✅ | 360K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 52.1M | ✅ | 366K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 55.0M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 76.5M | ✅ | 4.5M | 🟢 **-94%** |
| not.json | double negation | 1 | ✅ | 76.8M | ✅ | 447K | 🟢 **-99%** |
| oneOf.json | oneOf | 4 | ✅ | 58.0M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 58.0M | ✅ | 371K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 76.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 58.3M | ✅ | 375K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 58.2M | ✅ | 371K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.9M | ✅ | 231K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 64.9M | ✅ | 510K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.3M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.7M | ✅ | 251K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 66.3M | ✅ | 294K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 50.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 27.2M | ✅ | 4.4M | 🟢 **-84%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.8M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.9M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.5M | ✅ | 4.4M | 🟢 **-75%** |
| properties.json | object properties validation | 6 | ✅ | 50.4M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.9M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 44.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 45.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.0M | ✅ | 969K | 🟢 **-98%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 79.1M | ✅ | 4.3M | 🟢 **-95%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.6M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.4M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.9M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 47.6M | ✅ | 434K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 35.6M | ✅ | 472K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.4M | ✅ | 597K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.6M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 47.1M | ✅ | 494K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.5M | ✅ | 491K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 76.6M | ✅ | 1.8M | 🟢 **-98%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 58.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 47.5M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 45.9M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 44.6M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 50.9M | ✅ | 403K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 37.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 48.8M | ✅ | 480K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.0M | ✅ | 488K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.5M | ✅ | 485K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.5M | ✅ | 487K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 43.8M | ✅ | 488K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 40.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 41.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.9M | ✅ | 482K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 66.7M | ✅ | 483K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.8M | ✅ | 484K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 43.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 29.7M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 38.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 42.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 33.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.5M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 76.7M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 76.7M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 46.5M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 26.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 54.3M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 59.9M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 59.4M | ✅ | 628K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 52.4M | ✅ | 469K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 55.6M | ✅ | 525K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 57.3M | ✅ | 595K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 53.3M | ✅ | 342K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 57.8M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 66.6M | ✅ | 567K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 57.9M | ✅ | 298K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 66.5M | ✅ | 305K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 74.3M | ✅ | 4.1M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.5M | ✅ | 4.1M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.4M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 75.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 75.9M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 56.0M | ✅ | 476K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 68.8M | ✅ | 4.2M | 🟢 **-94%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 53.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 68.8M | ✅ | 4.1M | 🟢 **-94%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 53.9M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 353K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 22.3M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 32.4M | ✅ | 523K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.2M | ✅ | 524K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 527K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.8M | ✅ | 522K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.1M | ✅ | 412K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.9M | ✅ | 678K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.0M | ✅ | 524K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.4M | ✅ | 525K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 913K | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.6M | ✅ | 362K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.1M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.8M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.0M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.6M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.7M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 38.6M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 34.1M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 52.5M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 53.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.8M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.5M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.6M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 4.3M | 🟢 **-97%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 80.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ✅ | 4.6M | 🟢 **-97%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 4.8M | 🟢 **-94%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.2M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.8M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 4.8M | 🟢 **-94%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.7M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 476K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 737K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 4.3M | 🟢 **-94%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.4M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.4M | ✅ | 403K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 39.4M | ✅ | 108K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 46K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.8M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 91.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 1.8M | 🟢 **-98%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.6M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 460K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 116.9M | ✅ | 458K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 39.6M | ✅ | 300K | 🟢 **-99%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.8M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 50.1M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 77.1M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.9M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 1.9M | 🟢 **-98%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 45.3M | ✅ | 2.0M | 🟢 **-96%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 49.1M | ✅ | 321K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.1M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.6M | ✅ | 434K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.5M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 64.2M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 39.4M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 57.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 78.2M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 73.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 55.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 67.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 65.7M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.6M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 58.5M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 42.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.5M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 41.5M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 4.5M | 🟢 **-94%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 96.1M | ✅ | 4.4M | 🟢 **-95%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 80.4M | ✅ | 4.3M | 🟢 **-95%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 83.3M | ✅ | 4.5M | 🟢 **-95%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 70.4M | ✅ | 4.5M | 🟢 **-94%** |
| default.json | invalid type for default | 2 | ✅ | 50.2M | ✅ | 765K | 🟢 **-98%** |
| default.json | invalid string value for default | 2 | ✅ | 26.0M | ✅ | 931K | 🟢 **-96%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.5M | ✅ | 462K | 🟢 **-99%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.8M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 33.5M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.1M | ✅ | 4.3M | 🟢 **-96%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.5M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 48.7M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.4M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 59.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 31.9M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 36.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.2M | ✅ | 539K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.4M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.3M | ✅ | 779K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 359K | 🟢 **-97%** |
| enum.json | enum with escaped characters | 3 | ✅ | 76.5M | ✅ | 771K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.2M | ✅ | 461K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.6M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.1M | ✅ | 451K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.3M | ✅ | 839K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.4M | ✅ | 826K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 64.0M | ✅ | 593K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 70.7M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.2M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 95.4M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 95.4M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 77.2M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 84.9M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 84.8M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 85.0M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 77.3M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 85.1M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 77.1M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 85.1M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 85.4M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 77.5M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 77.3M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 84.5M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 85.3M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 77.2M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 77.3M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 83.7M | ❌ | - | - |
| format.json | duration format | 6 | ✅ | 77.2M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.1M | ✅ | 4.5M | 🟢 **-95%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 84.1M | ✅ | 4.3M | 🟢 **-95%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.1M | ✅ | 4.3M | 🟢 **-95%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.6M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 1.0M | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.4M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.7M | ✅ | 297K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 53.4M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 67.2M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 4.2M | 🟢 **-96%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 65.7M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 13.0M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.3M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 4.1M | 🟢 **-95%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 4.1M | 🟢 **-95%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.8M | ✅ | 4.2M | 🟢 **-96%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 56.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 61.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 78.6M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.3M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.1M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.4M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.4M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 76.6M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 77.2M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.8M | ✅ | 4.1M | 🟢 **-96%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 71.9M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.9M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 77.5M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 93.9M | ✅ | 4.1M | 🟢 **-96%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 72.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.2M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 58.1M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.0M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 51.1M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 76.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.0M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 76.8M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.4M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.7M | ✅ | 499K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 1.9M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 76.6M | ✅ | 364K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 232K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 69.1M | ✅ | 295K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 53.6M | ✅ | 354K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 59.5M | ✅ | 357K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.1M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 89.3M | ✅ | 4.4M | 🟢 **-95%** |
| not.json | double negation | 1 | ✅ | 90.0M | ✅ | 435K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.0M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.8M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.0M | ✅ | 377K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 376K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 377K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.7M | ✅ | 233K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 515K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.2M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.4M | ✅ | 253K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 301K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 54.1M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 4.3M | 🟢 **-83%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.2M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.2M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.2M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 4.4M | 🟢 **-76%** |
| properties.json | object properties validation | 6 | ✅ | 50.2M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 48.7M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.0M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 954K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 4.3M | 🟢 **-95%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.1M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.9M | ✅ | 370K | 🟢 **-87%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.7M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.0M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.6M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.7M | ✅ | 445K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 36.2M | ✅ | 808K | 🟢 **-98%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.2M | ✅ | 494K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 53.4M | ✅ | 492K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ✅ | 4.4M | 🟢 **-95%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.0M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 396K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.8M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.2M | ✅ | 478K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.0M | ✅ | 478K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.5M | ✅ | 478K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 48.8M | ✅ | 480K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.3M | ✅ | 478K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.9M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 826K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 832K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.4M | ✅ | 479K | 🟢 **-99%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.5M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 50.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 43.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.7M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 42.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 49.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 44.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 39.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 44.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.8M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 52.6M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.5M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.7M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 69.4M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 69.0M | ✅ | 636K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 58.3M | ✅ | 479K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 64.5M | ✅ | 529K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.8M | ✅ | 605K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.2M | ✅ | 346K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 571K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 72.1M | ✅ | 302K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 77.1M | ✅ | 306K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 82.8M | ✅ | 4.0M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 51.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 4.1M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 78.9M | ✅ | 4.1M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 44.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 41.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 50.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 81.8M | ✅ | 1.7M | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.1M | ✅ | 1.2M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 59.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 50.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 51.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 45.8M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.6M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 74.6M | ✅ | 4.1M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 4.1M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 2.6M | 🟢 **-96%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 69.5M | ✅ | 551K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 29.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 306K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 33.3M | ✅ | 305K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 31.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 2.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 33.8M | ✅ | 305K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.5M | ✅ | 338K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.4M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.3M | ✅ | 128K | 🟢 **-99%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 76.4M | ✅ | 4.2M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 3.9M | 🟢 **-93%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 24.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.9M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.8M | ✅ | 4.2M | 🟢 **-95%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ✅ | 4.1M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.8M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 56.4M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 800K | 🟢 **-99%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 61.7M | ✅ | 478K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 27.4M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 71.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 95.6M | ✅ | 4.0M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.5M | ✅ | 542K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 543K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 541K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 542K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.5M | ✅ | 436K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 700K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.5M | ✅ | 545K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.7M | ✅ | 544K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 948K | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 385K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.1M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.4M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.1M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.9M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.6M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.8M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 65.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 52.3M | ✅ | 487K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 55.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.7M | ✅ | 416K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 731K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 55.0M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.2M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 41.6M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.2M | ✅ | 481K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 751K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 4.6M | 🟢 **-93%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.9M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.0M | ✅ | 351K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 39.9M | ✅ | 65K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.3M | ✅ | 32K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 1.9M | 🟢 **-98%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.4M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 457K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 450K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 300K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 76.6M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 87.3M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 52.0M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 91.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 80.2M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 36.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 1.9M | 🟢 **-98%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 90.0M | ✅ | 1.9M | 🟢 **-98%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 52.5M | ✅ | 313K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.8M | ✅ | 435K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 78.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.0M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 41.2M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 76.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.7M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 75.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 65.2M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.2M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.6M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 63.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.6M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 42.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 4.3M | 🟢 **-94%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 96.1M | ✅ | 4.2M | 🟢 **-96%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 96.1M | ✅ | 4.2M | 🟢 **-96%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 86.3M | ✅ | 4.3M | 🟢 **-95%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 76.5M | ✅ | 4.4M | 🟢 **-94%** |
| default.json | invalid type for default | 2 | ✅ | 71.6M | ✅ | 768K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 924K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 57.2M | ✅ | 457K | 🟢 **-99%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 64.9M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 96.1M | ✅ | 4.3M | 🟢 **-96%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.3M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 59.4M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 41.8M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 39.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 12.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.8M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.4M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 18.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 10.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.5M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.5M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.5M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.1M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.8M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 519K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.8M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 742K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 14.8M | ✅ | 341K | 🟢 **-98%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.0M | ✅ | 740K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.0M | ✅ | 445K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 65.5M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.9M | ✅ | 431K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.5M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.5M | ✅ | 807K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.9M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.2M | ✅ | 794K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 64.7M | ✅ | 574K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.2M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 88.5M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 95.7M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 78.5M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 78.3M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 76.1M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 76.8M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 77.8M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 78.4M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 78.2M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 78.2M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 72.5M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 78.3M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 84.1M | ✅ | 3.8M | 🟢 **-95%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 65.4M | ✅ | 4.3M | 🟢 **-93%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 83.8M | ✅ | 4.2M | 🟢 **-95%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 75.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.2M | ✅ | 947K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 75.8M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.0M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.8M | ✅ | 277K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 51.8M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.8M | ✅ | 4.4M | 🟢 **-95%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.1M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.0M | ❌ | - | - |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 79.8M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.1M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.5M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 69.0M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 4.4M | 🟢 **-94%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 93.1M | ✅ | 4.2M | 🟢 **-95%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 55.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.9M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 53.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 75.4M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 62.2M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.2M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.3M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 67.5M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.0M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 93.1M | ✅ | 4.3M | 🟢 **-95%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.0M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.5M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 56.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.6M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 52.1M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 47.8M | ✅ | 4.3M | 🟢 **-91%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 33.3M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 78.9M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 29.7M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.4M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.2M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.7M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 72.5M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 476K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 1.6M | 🟢 **-98%** |
| not.json | not | 2 | ✅ | 76.6M | ✅ | 341K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 68.6M | ✅ | 215K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 273K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 52.4M | ✅ | 342K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.2M | ✅ | 342K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.7M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 72.7M | ✅ | 4.2M | 🟢 **-94%** |
| not.json | double negation | 1 | ✅ | 89.8M | ✅ | 433K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.3M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 353K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 355K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 357K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ✅ | 215K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 484K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.2M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.8M | ✅ | 237K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 275K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 54.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.0M | ✅ | 4.0M | 🟢 **-84%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.2M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.6M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.5M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 4.0M | 🟢 **-78%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.0M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 65.2M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.9M | ✅ | 3.9M | 🟢 **-95%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 4.0M | 🟢 **-95%** |
| properties.json | object properties validation | 6 | ✅ | 56.5M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 49.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 50.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 899K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.8M | ✅ | 4.0M | 🟢 **-96%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.2M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.7M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.5M | ✅ | 408K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 50.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 39.9M | ✅ | 749K | 🟢 **-98%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 38.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.9M | ✅ | 458K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 55.0M | ✅ | 459K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ✅ | 4.0M | 🟢 **-96%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.2M | ✅ | 387K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.4M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 85.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 41.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.1M | ✅ | 457K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.7M | ✅ | 456K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.0M | ✅ | 460K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 51.1M | ✅ | 458K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.1M | ✅ | 462K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 51.6M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 49.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 793K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 792K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 460K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 43.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 51.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 50.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 49.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.3M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 52.8M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.9M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 69.2M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 68.7M | ✅ | 624K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 475K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 64.2M | ✅ | 527K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 64.7M | ✅ | 593K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 343K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 553K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 54.9M | ✅ | 286K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 76.9M | ✅ | 296K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 82.9M | ✅ | 4.1M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 56.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.3M | ✅ | 4.2M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 55.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.8M | ✅ | 4.2M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 46.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 53.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.7M | ✅ | 1.8M | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.2M | ✅ | 1.2M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 58.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 50.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 50.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.0M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.4M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.7M | ✅ | 4.3M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 4.2M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 42.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 4.1M | 🟢 **-93%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 38.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 93.9M | ✅ | 4.1M | 🟢 **-96%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 31.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.6M | ✅ | 347K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.5M | ✅ | 347K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 13.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 35.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.4M | ✅ | 345K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 544K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.2M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.7M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.2M | ✅ | 131K | 🟢 **-99%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 76.4M | ✅ | 4.2M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.4M | ✅ | 4.2M | 🟢 **-92%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.9M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.0M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.9M | ✅ | 4.3M | 🟢 **-95%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ✅ | 4.2M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.7M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 793K | 🟢 **-99%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.4M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.8M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 468K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 3.9M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 96.1M | ✅ | 4.0M | 🟢 **-96%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 49.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 54.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.9M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.9M | ✅ | 511K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.3M | ✅ | 514K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.3M | ✅ | 511K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.4M | ✅ | 511K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 401K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 658K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.7M | ✅ | 512K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.6M | ✅ | 511K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 868K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.3M | ✅ | 357K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 5.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.7M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 42.1M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.3M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.8M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.7M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.2M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.1M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.0M | ✅ | 560K | 🟢 **-98%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.7M | ✅ | 566K | 🟢 **-97%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 66.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 55.0M | ✅ | 481K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 51.5M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.2M | ✅ | 415K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 732K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.6M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.5M | ❌ | - | - |
