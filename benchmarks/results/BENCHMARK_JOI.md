# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | joi pass | joi ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.5M | 82/199 | 390K | 82 | 🟢 **-99%** |
| draft6 | 276 | ✅ 276 | 29.7M | 98/276 | 448K | 98 | 🟢 **-98%** |
| draft7 | 313 | ✅ 313 | 16.3M | 102/313 | 451K | 102 | 🟢 **-97%** |
| draft2019-09 | 435 | ✅ 435 | 17.5M | 131/435 | 477K | 131 | 🟢 **-97%** |
| draft2020-12 | 448 | ✅ 448 | 19.6M | 129/448 | 494K | 129 | 🟢 **-97%** |
| **Total** | 1671 | 1670/1671 | 19.8M | 542/1671 | 454K | 542 | 🟢 **-98%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **99.18x faster** (22 ns vs 2202 ns per test, 1591 tests in 542 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.7M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 159.1M | ✅ | 5.1M | 🟢 **-97%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 4.7M | 🟢 **-97%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 126.1M | ✅ | 5.0M | 🟢 **-96%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 34.7M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 68.4M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 56.6M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 154.2M | ✅ | 5.0M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.8M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 46.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 33.2M | ✅ | 476K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 48.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.8M | ✅ | 745K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 46.7M | ✅ | 4.3M | 🟢 **-91%** |
| allOf.json | allOf | 4 | ✅ | 49.1M | ✅ | 56K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 23.0M | ✅ | 56K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 113.7M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 1.8M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.7M | ✅ | 446K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 436K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 302K | 🟢 **-99%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 60.0M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.6M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 44.1M | ✅ | 311K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.1M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 412K | 🟢 **-99%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 765K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 48.7M | ✅ | 923K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.7M | ✅ | 396K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.0M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 92.4M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 28.9M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.7M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.2M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 56.6M | ✅ | 531K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.4M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 59.4M | ✅ | 773K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 48.9M | ✅ | 349K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 49.5M | ✅ | 760K | 🟢 **-98%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.4M | ✅ | 461K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 48.1M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 106.9M | ✅ | 448K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.9M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.4M | ✅ | 834K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.6M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 114.4M | ✅ | 819K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.4M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 586K | 🟢 **-99%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 46.2M | ✅ | 573K | 🟢 **-99%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ✅ | 591K | 🟢 **-99%** |
| format.json | email format | 6 | ✅ | 74.0M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 163.3M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 79.2M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 163.7M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 78.5M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 163.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.9M | ✅ | 291K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 89.0M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 59.4M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 35.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.9M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 70.3M | ✅ | 4.3M | 🟢 **-94%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 4.2M | 🟢 **-94%** |
| maxItems.json | maxItems validation | 4 | ✅ | 65.6M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 53.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 49.1M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 39.2M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 61.5M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 61.0M | ❌ | - | - |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 61.8M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 53.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 65.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 47.6M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 50.3M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 61.9M | ❌ | - | - |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 61.8M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 53.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 58.0M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 61.3M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 56.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 51.5M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 39.0M | ✅ | 491K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.5M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 55.9M | ✅ | 358K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 49.0M | ✅ | 227K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 52.7M | ✅ | 289K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 42.4M | ✅ | 348K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 40.9M | ✅ | 357K | 🟢 **-99%** |
| not.json | double negation | 1 | ✅ | 159.0M | ✅ | 433K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 54.3M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 29.5M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 37.3M | ✅ | 228K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.2M | ✅ | 499K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 38.3M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 40.2M | ✅ | 246K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.7M | ✅ | 288K | 🟢 **-99%** |
| pattern.json | pattern validation | 8 | ✅ | 49.1M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.1M | ✅ | 4.4M | 🟢 **-91%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.9M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 13.9M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 4.3M | 🟢 **-75%** |
| properties.json | object properties validation | 6 | ✅ | 45.7M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.2M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 40.0M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 962K | 🟢 **-98%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.0M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 42.4M | ✅ | 430K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 37.5M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 37.3M | ✅ | 458K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 45.9M | ✅ | 590K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 55.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.3M | ✅ | 488K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.7M | ✅ | 486K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.3M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 42.4M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 56.3M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 43.0M | ✅ | 485K | 🟢 **-99%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.5M | ✅ | 453K | 🟢 **-99%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.8M | ✅ | 459K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.8M | ✅ | 458K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 51.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 53.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 35.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 40.6M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 23.4M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 41.3M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 45.7M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 48.4M | ✅ | 613K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 41.4M | ✅ | 472K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 44.5M | ✅ | 524K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 44.0M | ✅ | 582K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 42.8M | ✅ | 340K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 46.1M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 55.7M | ✅ | 553K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 49.6M | ✅ | 289K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 55.7M | ✅ | 295K | 🟢 **-99%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ✅ | 4.1M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.0M | ✅ | 4.0M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 72.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 42.5M | ✅ | 463K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.3M | ✅ | 4.0M | 🟢 **-94%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.3M | ✅ | 4.0M | 🟢 **-94%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.6M | ✅ | 481K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.3M | ✅ | 478K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.5M | ✅ | 480K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 18.2M | ✅ | 473K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.0M | ✅ | 370K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.5M | ✅ | 628K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.4M | ✅ | 477K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.1M | ✅ | 478K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.0M | ✅ | 840K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.6M | ✅ | 324K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.0M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.7M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.4M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.0M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 25.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.3M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 59.1M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 40.6M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.3M | ✅ | 5.1M | 🟢 **-97%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 77.0M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 167.7M | ✅ | 4.6M | 🟢 **-97%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 4.8M | 🟢 **-94%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.8M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.6M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.6M | ✅ | 4.8M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 67.3M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.3M | ✅ | 478K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.1M | ✅ | 743K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 4.4M | 🟢 **-93%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 119K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 56K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 51.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 157.4M | ✅ | 1.9M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 470K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 460K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 294K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.7M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 158.7M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 157.7M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.8M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.6M | ✅ | 285K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 166.8M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.7M | ✅ | 421K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.6M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 54.9M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 37.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 25.1M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 117.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 53.3M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 54.7M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 47.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 51.6M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 57.9M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.7M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.0M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 53.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 90.1M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.6M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 59.5M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 4.4M | 🟢 **-95%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 784K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ✅ | 938K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.0M | ✅ | 404K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 50.4M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 171.5M | ✅ | 4.4M | 🟢 **-97%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.9M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.3M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 82.5M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.5M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 26.6M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 528K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.2M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 61.2M | ✅ | 763K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 54.1M | ✅ | 352K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 59.7M | ✅ | 754K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.1M | ✅ | 443K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.5M | ✅ | 435K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 113.5M | ✅ | 815K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.4M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 113.8M | ✅ | 799K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.1M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 583K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.2M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.5M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 81.0M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 147.6M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 85.2M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 156.4M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 81.2M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 157.2M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 88.5M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 157.0M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 88.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.7M | ✅ | 302K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 60.5M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 106.9M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 167.5M | ✅ | 4.2M | 🟢 **-97%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 61.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 35.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.4M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 4.4M | 🟢 **-94%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 4.4M | 🟢 **-95%** |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 58.6M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.8M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.5M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.8M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.9M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.4M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 54.2M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.1M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.0M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 64.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 517K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 1.9M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 368K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 236K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 296K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 363K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 371K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.1M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 171.4M | ✅ | 4.3M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 158.6M | ✅ | 444K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.4M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ✅ | 375K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 158.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 375K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 375K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ✅ | 238K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 518K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.9M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.5M | ✅ | 257K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 292K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 52.6M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 4.1M | 🟢 **-91%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.8M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.4M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.0M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 4.0M | 🟢 **-78%** |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 960K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.1M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 45.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 166.9M | ✅ | 4.1M | 🟢 **-98%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.7M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 41.1M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ✅ | 444K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 47.7M | ✅ | 477K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.9M | ✅ | 598K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 59.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 497K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.6M | ✅ | 496K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ✅ | 1.8M | 🟢 **-99%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.8M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 58.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.4M | ✅ | 391K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ✅ | 486K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.6M | ✅ | 484K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ✅ | 485K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.7M | ✅ | 486K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ✅ | 491K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 60.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.1M | ✅ | 490K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 490K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.3M | ✅ | 491K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 53.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.0M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 47.9M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 46.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 158.1M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 158.6M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 44.6M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.4M | ✅ | 638K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 486K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 51.4M | ✅ | 543K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 612K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ✅ | 335K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.0M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 574K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 54.5M | ✅ | 307K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 62.2M | ✅ | 305K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 159.4M | ✅ | 4.2M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ✅ | 4.2M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 47.5M | ✅ | 484K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 4.2M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.5M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 4.3M | 🟢 **-94%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 480K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.9M | ✅ | 486K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.1M | ✅ | 485K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 484K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 381K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 641K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.4M | ✅ | 491K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.3M | ✅ | 489K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 867K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 331K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.9M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.6M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 81.9M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.5M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 43.3M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 42.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.0M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 64.5M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 43.3M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 174.5M | ✅ | 3.4M | 🟢 **-98%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 77.4M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 191.0M | ✅ | 3.4M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 85.4M | ✅ | 4.7M | 🟢 **-95%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 62.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.0M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 112.0M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 174.8M | ✅ | 4.7M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 69.5M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.1M | ✅ | 474K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 174.5M | ✅ | 734K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 70.4M | ✅ | 4.5M | 🟢 **-94%** |
| allOf.json | allOf | 4 | ✅ | 35.4M | ✅ | 113K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 32.1M | ✅ | 53K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 62.4M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 174.5M | ✅ | 1.1M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 51.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 95.0M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 174.8M | ✅ | 1.5M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 174.6M | ✅ | 1.2M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 65.6M | ✅ | 444K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 123.4M | ✅ | 435K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 67.0M | ✅ | 295K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.0M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 61.6M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.4M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 174.7M | ✅ | 1.8M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 165.3M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 51.5M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 88.2M | ✅ | 299K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 146.5M | ✅ | 1.0M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 123.6M | ✅ | 411K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 151.5M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 88.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 55.9M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 53.6M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 46.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 123.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 59.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 106.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 50.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 92.7M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 49.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.0M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 52.2M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 94.2M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 56.7M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.4M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 55.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 86.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 57.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 104.3M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 113.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 50.4M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 59.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.6M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 133.3M | ✅ | 4.5M | 🟢 **-97%** |
| default.json | invalid type for default | 2 | ✅ | 66.9M | ✅ | 761K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 71.1M | ✅ | 907K | 🟢 **-99%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 47.1M | ✅ | 454K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.6M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 58.2M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 197.1M | ✅ | 4.2M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 31.3M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.4M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 49.4M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.6M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 37.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 64.3M | ✅ | 535K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.5M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 60.1M | ✅ | 776K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 37.2M | ✅ | 349K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 68.6M | ✅ | 767K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 57.2M | ✅ | 461K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.5M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 60.6M | ✅ | 451K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 55.5M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 69.4M | ✅ | 830K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.7M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 69.2M | ✅ | 814K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.4M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 53.1M | ✅ | 592K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 60.0M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 87.7M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 93.4M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 93.7M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 93.6M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 92.9M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 91.1M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 93.6M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 93.8M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 93.0M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 90.7M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 92.4M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 84.9M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 92.9M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 83.2M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 93.0M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 93.4M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 80.3M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 190.4M | ✅ | 4.5M | 🟢 **-98%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 189.0M | ✅ | 4.3M | 🟢 **-98%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 188.0M | ✅ | 4.3M | 🟢 **-98%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.0M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 71.3M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 62.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 191.1M | ✅ | 861K | 🟢 **-100%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 65.6M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 63.9M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 45.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 36.9M | ✅ | 279K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 59.6M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 63.0M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.6M | ✅ | 4.2M | 🟢 **-97%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 62.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.6M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.4M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 79.7M | ✅ | 4.2M | 🟢 **-95%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 85.2M | ✅ | 4.3M | 🟢 **-95%** |
| maxItems.json | maxItems validation | 4 | ✅ | 75.7M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 60.4M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 58.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.2M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.7M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 70.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 75.7M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 64.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 56.6M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 56.3M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.9M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.3M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.7M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 68.9M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 64.5M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 57.2M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 42.6M | ✅ | 508K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 72.6M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 64.8M | ✅ | 349K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 58.4M | ✅ | 227K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 60.3M | ✅ | 279K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 47.7M | ✅ | 339K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 44.7M | ✅ | 346K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 44.5M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 200.6M | ✅ | 4.5M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 174.8M | ✅ | 417K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 60.6M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.3M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 51.0M | ✅ | 358K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 174.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 51.2M | ✅ | 356K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 50.8M | ✅ | 356K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.8M | ✅ | 220K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 62.9M | ✅ | 482K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.0M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.8M | ✅ | 240K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 64.4M | ✅ | 282K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 51.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 53.0M | ✅ | 4.5M | 🟢 **-91%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.6M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.3M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.8M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.4M | ✅ | 4.5M | 🟢 **-77%** |
| properties.json | object properties validation | 6 | ✅ | 47.0M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.1M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 43.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 45.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.4M | ✅ | 949K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 187.7M | ✅ | 4.4M | 🟢 **-98%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.5M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 43.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 44.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.9M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.8M | ✅ | 436K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.0M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 41.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 36.9M | ✅ | 450K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 51.2M | ✅ | 583K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.1M | ✅ | 484K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.2M | ✅ | 484K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 140.4M | ✅ | 1.4M | 🟢 **-99%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 48.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 45.8M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 48.3M | ✅ | 411K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.2M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.6M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 45.8M | ✅ | 477K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 45.9M | ✅ | 477K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.5M | ✅ | 474K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.0M | ✅ | 475K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 43.8M | ✅ | 473K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 38.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 45.3M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 45.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 43.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.4M | ✅ | 456K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 65.1M | ✅ | 459K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 65.1M | ✅ | 452K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.8M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 39.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 36.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.8M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 175.1M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 173.5M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 36.6M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 22.7M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 51.9M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 54.8M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 55.2M | ✅ | 619K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ✅ | 481K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 48.0M | ✅ | 546K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 606K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 47.5M | ✅ | 350K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 49.5M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 65.7M | ✅ | 534K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 54.5M | ✅ | 296K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 62.4M | ✅ | 301K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 164.8M | ✅ | 4.2M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.5M | ✅ | 4.1M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 60.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 86.6M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 90.3M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 48.3M | ✅ | 468K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 81.0M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 46.4M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 81.1M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 46.6M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 334K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.8M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 395K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 24.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 54.2M | ✅ | 516K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.6M | ✅ | 520K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ✅ | 522K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.1M | ✅ | 521K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 414K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.7M | ✅ | 666K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.8M | ✅ | 522K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.2M | ✅ | 523K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.7M | ✅ | 882K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 28.3M | ✅ | 367K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.0M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 21.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.3M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 33.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.8M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.7M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 33.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 91.1M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.1M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.0M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.5M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 54.4M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 51.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.6M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 21.0M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 21.4M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 28.3M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 155.3M | ✅ | 5.0M | 🟢 **-97%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 63.2M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 163.5M | ✅ | 4.4M | 🟢 **-97%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 74.9M | ✅ | 4.7M | 🟢 **-94%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.8M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 32.6M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.5M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 155.0M | ✅ | 4.7M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 62.5M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 28.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 40.5M | ✅ | 464K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 28.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 155.0M | ✅ | 736K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 19.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 4.2M | 🟢 **-94%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 27.8M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 25.6M | ✅ | 381K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 31.7M | ✅ | 110K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 38.5M | ✅ | 48K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 54.3M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 155.3M | ✅ | 1.2M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 43.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 155.1M | ✅ | 1.8M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.8M | ✅ | 1.2M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.7M | ✅ | 457K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.4M | ✅ | 452K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 57.6M | ✅ | 298K | 🟢 **-99%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.1M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 56.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.6M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 36.6M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 55.7M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 59.2M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 31.3M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 154.4M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.1M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 44.2M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.0M | ✅ | 315K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.9M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.5M | ✅ | 419K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.0M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 41.2M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 49.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 31.5M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 37.0M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 57.6M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 51.7M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 51.4M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 48.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 48.1M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 40.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 40.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 47.3M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 60.0M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 49.3M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 50.8M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 45.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 44.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 47.0M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 51.4M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 46.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 54.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 38.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 18.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 53.5M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.4M | ✅ | 4.2M | 🟢 **-94%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.1M | ✅ | 4.1M | 🟢 **-98%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.0M | ✅ | 4.2M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 176.3M | ✅ | 4.2M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 159.8M | ✅ | 4.3M | 🟢 **-97%** |
| default.json | invalid type for default | 2 | ✅ | 61.2M | ✅ | 762K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 47.0M | ✅ | 915K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 27.3M | ✅ | 450K | 🟢 **-98%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.6M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 53.5M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.3M | ✅ | 4.2M | 🟢 **-98%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 17.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 38.2M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 44.1M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 41.5M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 33.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 30.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 47.7M | ✅ | 532K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 34.8M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 51.2M | ✅ | 777K | 🟢 **-98%** |
| enum.json | enums in properties | 6 | ✅ | 33.7M | ✅ | 348K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 32.8M | ✅ | 758K | 🟢 **-98%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 47.0M | ✅ | 457K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 43.7M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 51.4M | ✅ | 450K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.6M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 58.6M | ✅ | 830K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.7M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 58.8M | ✅ | 815K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.1M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 47.6M | ✅ | 589K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 47.9M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 48.1M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 182.0M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 182.6M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 162.2M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 174.1M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 174.0M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 171.6M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 174.2M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 181.3M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 182.6M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 182.7M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 179.0M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 181.1M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 174.3M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 182.3M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 182.0M | ❌ | - | - |
| format.json | duration format | 6 | ✅ | 182.6M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 160.5M | ✅ | 4.1M | 🟢 **-97%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.7M | ✅ | 4.3M | 🟢 **-98%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 4.3M | 🟢 **-98%** |
| if-then-else.json | if and then without else | 3 | ✅ | 62.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 60.0M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 53.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 169.0M | ✅ | 980K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 57.4M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 57.1M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.6M | ✅ | 290K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 42.6M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 58.7M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.5M | ✅ | 4.3M | 🟢 **-97%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 55.1M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 53.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 24.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 10.2M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 70.3M | ✅ | 4.3M | 🟢 **-94%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 4.3M | 🟢 **-94%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 4.1M | 🟢 **-98%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 43.0M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 50.5M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 44.5M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 65.7M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 56.4M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 52.9M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 47.0M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 40.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 29.0M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 25.0M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 61.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 61.0M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 170.9M | ✅ | 4.2M | 🟢 **-98%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 51.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 46.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 50.9M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 40.2M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 36.3M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.7M | ✅ | 4.3M | 🟢 **-97%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 56.1M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 46.7M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 56.4M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 45.9M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 47.2M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 36.3M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 29.9M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 61.7M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 56.9M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 61.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 56.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 51.6M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 38.9M | ✅ | 503K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.4M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 56.2M | ✅ | 346K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 49.9M | ✅ | 230K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 52.8M | ✅ | 288K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 42.4M | ✅ | 346K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 41.2M | ✅ | 355K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 41.0M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 176.6M | ✅ | 4.4M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 157.8M | ✅ | 430K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 22.7M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 45.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 29.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 43.7M | ✅ | 372K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 44.3M | ✅ | 369K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 44.2M | ✅ | 373K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 36.0M | ✅ | 232K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.2M | ✅ | 510K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 36.8M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.4M | ✅ | 249K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.7M | ✅ | 297K | 🟢 **-99%** |
| pattern.json | pattern validation | 8 | ✅ | 41.9M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 34.9M | ✅ | 4.3M | 🟢 **-88%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.6M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 11.9M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.6M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 14.9M | ✅ | 4.2M | 🟢 **-72%** |
| properties.json | object properties validation | 6 | ✅ | 45.2M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 38.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 40.8M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 940K | 🟢 **-98%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 16.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.5M | ✅ | 4.3M | 🟢 **-97%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 28.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 33.9M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 35.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 10.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 4.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.7M | ✅ | 373K | 🟢 **-86%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 9.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 9.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 6.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 5.6M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 3.4M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 20.4M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.0M | ✅ | 438K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 37.1M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 30.2M | ✅ | 794K | 🟢 **-97%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 34.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 2.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 41.3M | ✅ | 485K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.5M | ✅ | 487K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.0M | ✅ | 4.0M | 🟢 **-97%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 44.3M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 6.8M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 19.2M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 38.3M | ✅ | 393K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 28.1M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 28.3M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 38.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 37.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 30.5M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 29.4M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 42.8M | ✅ | 478K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 42.7M | ✅ | 472K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.8M | ✅ | 475K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.7M | ✅ | 476K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.4M | ✅ | 476K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.6M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 38.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 39.5M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 39.4M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 38.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 38.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.7M | ✅ | 835K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 55.7M | ✅ | 834K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.7M | ✅ | 477K | 🟢 **-99%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 3.6M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 37.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 37.5M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 38.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 25.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 24.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 29.7M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 26.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 26.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 37.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 39.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 25.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 37.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 52.8M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.4M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 159.2M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 38.3M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 15.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 42.7M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 45.1M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 47.3M | ✅ | 617K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 39.9M | ✅ | 467K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 44.9M | ✅ | 515K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 43.2M | ✅ | 594K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 43.0M | ✅ | 339K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.8M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 55.7M | ✅ | 561K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 48.3M | ✅ | 296K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 54.2M | ✅ | 304K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 75.4M | ✅ | 4.1M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 48.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 39.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 66.0M | ✅ | 4.1M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 45.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 72.5M | ✅ | 4.2M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 31.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 43.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 75.8M | ✅ | 1.7M | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 17.4M | ✅ | 1.2M | 🟢 **-93%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 13.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 32.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 48.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 43.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 43.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 35.4M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.4M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 76.2M | ✅ | 4.3M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 70.3M | ✅ | 4.0M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 44.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 51.4M | ✅ | 2.6M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 13.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 60.3M | ✅ | 553K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 24.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 12.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 60.3M | ✅ | 299K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.7M | ✅ | 295K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 15.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 27.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 25.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 25.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 2.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 19.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 19.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.4M | ✅ | 302K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 23.1M | ✅ | 334K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 15.4M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 23.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 37.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 17.8M | ✅ | 127K | 🟢 **-99%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.0M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 67.3M | ✅ | 4.2M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 46.7M | ✅ | 3.8M | 🟢 **-92%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 24.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 17.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 13.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.0M | ✅ | 4.3M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.9M | ✅ | 3.9M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.5M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 46.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 55.8M | ✅ | 800K | 🟢 **-99%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 43.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 72.6M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 76.0M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 42.6M | ✅ | 469K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.3M | ✅ | 4.1M | 🟢 **-94%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.2M | ✅ | 4.1M | 🟢 **-94%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.9M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 14.7M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 63.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.9M | ✅ | 4.1M | 🟢 **-98%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 28.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 38.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 44.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 43.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 34.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 46.8M | ✅ | 540K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 13.4M | ✅ | 542K | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 15.5M | ✅ | 543K | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 16.2M | ✅ | 543K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 15.2M | ✅ | 428K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 15.1M | ✅ | 698K | 🟢 **-95%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 16.2M | ✅ | 541K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 15.8M | ✅ | 539K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 15.3M | ✅ | 932K | 🟢 **-94%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 15.7M | ✅ | 377K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 12.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 15.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 14.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 16.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 22.2M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 35.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.3M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.4M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 27.6M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 15.9M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 29.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 23.0M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.0M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 23.2M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.0M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 5.6M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.1M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 26.1M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 54.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 16.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 42.5M | ✅ | 476K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.4M | ✅ | 409K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 55.7M | ✅ | 722K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 42.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.5M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.5M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.1M | ✅ | 481K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.2M | ✅ | 723K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 22.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 4.4M | 🟢 **-93%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 26.5M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 33.5M | ✅ | 406K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 32.3M | ✅ | 66K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.3M | ✅ | 108K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 57.3M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 46.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 1.8M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 58.9M | ✅ | 464K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 460K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 47.0M | ✅ | 306K | 🟢 **-99%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 78.9M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 59.4M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 56.4M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 58.8M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 63.3M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 30.8M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 157.2M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.3M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 46.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 42.8M | ✅ | 321K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 61.0M | ✅ | 430K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 42.6M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 49.7M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 33.5M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 41.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 61.0M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 50.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 54.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 50.8M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 36.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 43.2M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 42.5M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 50.0M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 60.1M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 51.4M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 57.4M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 52.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 46.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.5M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 54.6M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 53.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 50.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 48.2M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 37.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 28.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.0M | ✅ | 4.1M | 🟢 **-95%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 174.5M | ✅ | 4.3M | 🟢 **-98%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ✅ | 4.3M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 178.8M | ✅ | 4.4M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 175.3M | ✅ | 4.4M | 🟢 **-97%** |
| default.json | invalid type for default | 2 | ✅ | 64.7M | ✅ | 774K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 46.7M | ✅ | 932K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 41.2M | ✅ | 464K | 🟢 **-99%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 54.0M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 4.4M | 🟢 **-97%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 37.9M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 43.7M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 24.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 36.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 34.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.2M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.9M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.7M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.8M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.9M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.6M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 57.6M | ✅ | 517K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 39.2M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 62.9M | ✅ | 744K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 34.7M | ✅ | 341K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 67.2M | ✅ | 731K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 55.3M | ✅ | 441K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 51.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 54.7M | ✅ | 430K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 50.9M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 61.8M | ✅ | 803K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.3M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 61.7M | ✅ | 788K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.0M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 52.7M | ✅ | 569K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 56.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 56.3M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 182.9M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 175.2M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 181.7M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 182.6M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 184.3M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 175.7M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 179.4M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 182.7M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 182.8M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 180.5M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 183.0M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 183.7M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 183.6M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.1M | ✅ | 4.1M | 🟢 **-98%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.3M | ✅ | 4.0M | 🟢 **-98%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ✅ | 4.0M | 🟢 **-98%** |
| if-then-else.json | if and then without else | 3 | ✅ | 66.2M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 65.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 57.0M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 944K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 60.9M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 60.5M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.5M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 37.3M | ✅ | 276K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 51.5M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.0M | ✅ | 4.1M | 🟢 **-98%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 58.6M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 27.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.7M | ❌ | - | - |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 72.0M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 44.3M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.3M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 60.0M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 73.6M | ✅ | 4.0M | 🟢 **-95%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.0M | ✅ | 4.1M | 🟢 **-98%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 48.0M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 54.8M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 48.2M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 69.6M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 58.8M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 53.5M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 47.8M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.0M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.0M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 65.3M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 64.2M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.5M | ✅ | 4.0M | 🟢 **-98%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 54.8M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 50.9M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 55.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 43.9M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 40.5M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 171.3M | ✅ | 4.1M | 🟢 **-98%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 60.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 69.6M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 53.2M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 49.6M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.8M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 50.8M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 40.7M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 65.4M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 59.9M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 65.3M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 59.0M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 46.3M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 41.0M | ✅ | 480K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 66.1M | ✅ | 1.7M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 59.4M | ✅ | 346K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 52.9M | ✅ | 225K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 55.3M | ✅ | 279K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 43.6M | ✅ | 345K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 43.0M | ✅ | 343K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 42.6M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.5M | ✅ | 4.0M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 157.4M | ✅ | 417K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 29.8M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 47.6M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.4M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 46.9M | ✅ | 352K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 46.9M | ✅ | 355K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 46.9M | ✅ | 355K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 36.4M | ✅ | 218K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 58.2M | ✅ | 480K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 37.4M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 38.4M | ✅ | 242K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 58.8M | ✅ | 280K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 49.7M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.4M | ✅ | 3.9M | 🟢 **-92%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.7M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.7M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.4M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 15.9M | ✅ | 3.9M | 🟢 **-75%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 58.5M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 57.2M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 78.9M | ✅ | 3.9M | 🟢 **-95%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 78.8M | ✅ | 3.9M | 🟢 **-95%** |
| properties.json | object properties validation | 6 | ✅ | 45.0M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 38.8M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 42.7M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 62.3M | ✅ | 912K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 41.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 4.0M | 🟢 **-98%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 40.8M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 35.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 38.5M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.1M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.0M | ✅ | 412K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 37.9M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 45.5M | ✅ | 745K | 🟢 **-98%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 34.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.7M | ✅ | 456K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 44.6M | ✅ | 459K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 158.8M | ✅ | 3.9M | 🟢 **-98%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 46.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 44.8M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 44.9M | ✅ | 389K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 56.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 54.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 57.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 45.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 44.8M | ✅ | 458K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 44.7M | ✅ | 457K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 44.7M | ✅ | 457K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.8M | ✅ | 456K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 44.7M | ✅ | 460K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.3M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 56.7M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 56.6M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 56.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 56.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 56.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 781K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 58.9M | ✅ | 782K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 58.9M | ✅ | 454K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 56.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 56.7M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 56.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 35.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 45.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 54.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 56.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 56.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 45.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 56.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 52.8M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 159.5M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 41.9M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 22.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 46.1M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 50.8M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 51.3M | ✅ | 615K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 43.5M | ✅ | 467K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 47.7M | ✅ | 525K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 47.4M | ✅ | 586K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 43.3M | ✅ | 340K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 47.5M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 58.9M | ✅ | 548K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 50.3M | ✅ | 293K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 55.6M | ✅ | 304K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 79.5M | ✅ | 3.8M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 50.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 68.9M | ✅ | 3.9M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 47.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 76.9M | ✅ | 3.8M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 45.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 79.8M | ✅ | 1.7M | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.1M | ✅ | 1.2M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 33.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 41.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 39.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 42.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 37.2M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 86.3M | ✅ | 3.9M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 73.6M | ✅ | 3.9M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 34.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 52.9M | ✅ | 3.9M | 🟢 **-93%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 36.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.5M | ✅ | 3.9M | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 63.8M | ✅ | 349K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.2M | ✅ | 351K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 26.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 26.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.0M | ✅ | 349K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.0M | ✅ | 550K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.7M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 24.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 34.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.6M | ✅ | 132K | 🟢 **-99%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 67.4M | ✅ | 3.9M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 48.2M | ✅ | 3.9M | 🟢 **-92%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 37.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 145.5M | ✅ | 3.9M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.4M | ✅ | 3.9M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 57.2M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 48.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 58.9M | ✅ | 779K | 🟢 **-99%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 47.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 76.1M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 80.0M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 45.0M | ✅ | 472K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 73.5M | ✅ | 3.8M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 43.1M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 73.5M | ✅ | 3.8M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 43.1M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 82.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.7M | ✅ | 3.7M | 🟢 **-98%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 29.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 38.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 44.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 43.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 37.0M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.2M | ✅ | 507K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 23.6M | ✅ | 510K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.7M | ✅ | 510K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.9M | ✅ | 508K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.0M | ✅ | 395K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.1M | ✅ | 656K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.3M | ✅ | 506K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.7M | ✅ | 511K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 22.8M | ✅ | 861K | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.5M | ✅ | 352K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.8M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 18.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.1M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 36.8M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 38.7M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.5M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.2M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.9M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 66.1M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 34.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 74.9M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 21.1M | ✅ | 549K | 🟢 **-97%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 16.3M | ✅ | 550K | 🟢 **-97%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 56.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 44.3M | ✅ | 478K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 42.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.4M | ✅ | 413K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 56.6M | ✅ | 728K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 44.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 24.8M | ❌ | - | - |
