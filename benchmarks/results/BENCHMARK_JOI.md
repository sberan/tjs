# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | joi pass | joi ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 28.2M | 82/199 | 418K | 82 | 🟢 **-99%** |
| draft6 | 276 | ✅ 276 | 30.2M | 98/276 | 295K | 98 | 🟢 **-99%** |
| draft7 | 313 | ✅ 313 | 16.5M | 102/313 | 428K | 102 | 🟢 **-97%** |
| draft2019-09 | 435 | ✅ 435 | 20.2M | 131/435 | 405K | 131 | 🟢 **-98%** |
| draft2020-12 | 448 | ✅ 448 | 20.5M | 129/448 | 443K | 129 | 🟢 **-98%** |
| **Total** | 1671 | 1670/1671 | 21.1M | 542/1671 | 392K | 542 | 🟢 **-98%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **131.85x faster** (19 ns vs 2549 ns per test, 1591 tests in 542 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 142.6M | ✅ | 4.8M | 🟢 **-97%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 139.1M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 4.7M | 🟢 **-97%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.3M | ✅ | 4.8M | 🟢 **-96%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.5M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.9M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.6M | ✅ | 4.8M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 50.6M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 41.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 34.1M | ✅ | 473K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 742K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.3M | ✅ | 4.2M | 🟢 **-92%** |
| allOf.json | allOf | 4 | ✅ | 48.3M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.4M | ✅ | 57K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.2M | ✅ | 1.8M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 157.6M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 452K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 449K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 303K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 134.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 81.5M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 47.7M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.9M | ✅ | 313K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 172.0M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.5M | ✅ | 421K | 🟢 **-99%** |
| default.json | invalid type for default | 2 | ✅ | 107.4M | ✅ | 764K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 915K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.6M | ✅ | 399K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.9M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.4M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 58.2M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.6M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 46.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 534K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.7M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.5M | ✅ | 765K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 15.0M | ✅ | 352K | 🟢 **-98%** |
| enum.json | enum with escaped characters | 3 | ✅ | 61.7M | ✅ | 765K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.7M | ✅ | 462K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.6M | ✅ | 451K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.2M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 108.7M | ✅ | 841K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.3M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 830K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.5M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 599K | 🟢 **-99%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 576K | 🟢 **-99%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 601K | 🟢 **-99%** |
| format.json | email format | 6 | ✅ | 92.3M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 160.1M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 92.6M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 149.2M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 92.4M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 162.5M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.8M | ✅ | 290K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 81.6M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 68.1M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.4M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.2M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 4.3M | 🟢 **-94%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.8M | ✅ | 4.2M | 🟢 **-95%** |
| maxItems.json | maxItems validation | 4 | ✅ | 80.9M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 62.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.3M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.9M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ❌ | - | - |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 78.5M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 76.1M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 57.8M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.7M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 77.0M | ❌ | - | - |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 77.0M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 70.4M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 66.1M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 58.6M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 496K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.3M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 360K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 71.2M | ✅ | 235K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 68.3M | ✅ | 295K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 53.2M | ✅ | 352K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.0M | ✅ | 362K | 🟢 **-99%** |
| not.json | double negation | 1 | ✅ | 157.2M | ✅ | 435K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.1M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 41.8M | ✅ | 229K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 513K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 47.5M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 253K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 299K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 55.2M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.1M | ✅ | 3.9M | 🟢 **-84%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.0M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.3M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 4.0M | 🟢 **-78%** |
| properties.json | object properties validation | 6 | ✅ | 56.3M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 48.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 954K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.8M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.3M | ✅ | 435K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.5M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 39.7M | ✅ | 470K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.6M | ✅ | 593K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.2M | ✅ | 487K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.9M | ✅ | 492K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.3M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.6M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.7M | ✅ | 494K | 🟢 **-99%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 473K | 🟢 **-99%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 76.9M | ✅ | 472K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 471K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.7M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 40.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 51.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.7M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 53.0M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 26.2M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 64.6M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 68.6M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 85.9M | ✅ | 616K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 58.6M | ✅ | 470K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 59.8M | ✅ | 521K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 86.3M | ✅ | 589K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.7M | ✅ | 343K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 558K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 66.3M | ✅ | 294K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 297K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.0M | ✅ | 4.2M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.4M | ✅ | 4.2M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 76.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 62.9M | ✅ | 470K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.2M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.2M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 63.6M | ✅ | 483K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.3M | ✅ | 485K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 485K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 485K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.2M | ✅ | 377K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 642K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.7M | ✅ | 481K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.9M | ✅ | 485K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 862K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.9M | ✅ | 328K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 19.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 21.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.6M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 24.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 14.4M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.7M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.4M | ✅ | 2.6M | 🟢 **-98%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 38.0M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 170.8M | ✅ | 3.1M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 76.9M | ✅ | 3.9M | 🟢 **-95%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.7M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 40.5M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.1M | ✅ | 4.2M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 59.3M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 16.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 386K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ✅ | 590K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 25.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.4M | ✅ | 3.7M | 🟢 **-95%** |
| allOf.json | allOf | 4 | ✅ | 38.7M | ✅ | 31K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 22.0M | ✅ | 31K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 993K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 63.4M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.1M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 1.1M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.6M | ✅ | 959K | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.2M | ✅ | 337K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 335K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.8M | ✅ | 224K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 134.0M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 75.9M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.3M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 1.3M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 1.6M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 73.1M | ✅ | 238K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.9M | ✅ | 614K | 🟢 **-100%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 321K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 182.2M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 64.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 50.0M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 56.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 72.2M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 112.0M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.7M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 88.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 64.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.2M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.6M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 69.3M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.7M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 62.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.5M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 99.3M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 68.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 50.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 3.7M | 🟢 **-95%** |
| default.json | invalid type for default | 2 | ✅ | 107.3M | ✅ | 667K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 53.2M | ✅ | 715K | 🟢 **-99%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.3M | ✅ | 335K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.5M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.7M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.8M | ✅ | 3.8M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.9M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.2M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.0M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.4M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 45.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.9M | ✅ | 462K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.4M | ✅ | 655K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 15.9M | ✅ | 288K | 🟢 **-98%** |
| enum.json | enum with escaped characters | 3 | ✅ | 76.5M | ✅ | 652K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.8M | ✅ | 380K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.6M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 370K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 62.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 699K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 665K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.0M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 485K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.8M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 87.1M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 162.5M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 87.1M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 161.1M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 87.3M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 160.4M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 86.7M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 162.0M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 87.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 58.1M | ✅ | 215K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 52.6M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 106.0M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.7M | ✅ | 3.7M | 🟢 **-98%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 62.1M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.5M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.2M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 3.8M | 🟢 **-95%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 77.0M | ✅ | 3.8M | 🟢 **-95%** |
| maxItems.json | maxItems validation | 4 | ✅ | 75.0M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 60.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.3M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.7M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 55.5M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 57.3M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.2M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 73.4M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.1M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 74.1M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 70.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 354K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 1.7M | 🟢 **-98%** |
| not.json | not | 2 | ✅ | 73.4M | ✅ | 220K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 53.8M | ✅ | 150K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 65.6M | ✅ | 183K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 45.0M | ✅ | 242K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.3M | ✅ | 258K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.3M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.9M | ✅ | 3.7M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 248K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 53.8M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 40.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 63.4M | ✅ | 302K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 307K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 308K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.8M | ✅ | 174K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 378K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.4M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.9M | ✅ | 198K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.6M | ✅ | 225K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 54.4M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.4M | ✅ | 3.6M | 🟢 **-75%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.9M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.0M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.4M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.6M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 3.6M | 🟢 **-80%** |
| properties.json | object properties validation | 6 | ✅ | 53.1M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 48.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 49.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 777K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.8M | ✅ | 3.7M | 🟢 **-98%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.6M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.4M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 50.8M | ✅ | 375K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.9M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.1M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 37.1M | ✅ | 323K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 55.1M | ✅ | 489K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.4M | ✅ | 338K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.6M | ✅ | 414K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.3M | ✅ | 1.2M | 🟢 **-99%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.4M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.6M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.0M | ✅ | 326K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.8M | ✅ | 383K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.7M | ✅ | 380K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.7M | ✅ | 388K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 50.8M | ✅ | 381K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 52.4M | ✅ | 414K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 41.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 337K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 356K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.4M | ✅ | 365K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 49.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 39.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 38.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 41.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.4M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.5M | ✅ | 902K | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 159.5M | ✅ | 821K | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 50.1M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 62.9M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 66.3M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 65.3M | ✅ | 419K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 56.7M | ✅ | 318K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 61.3M | ✅ | 421K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 63.1M | ✅ | 488K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.0M | ✅ | 286K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 62.8M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 73.2M | ✅ | 423K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 68.6M | ✅ | 180K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 73.0M | ✅ | 222K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.5M | ✅ | 3.7M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.6M | ✅ | 3.7M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.1M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 60.7M | ✅ | 349K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 3.5M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 3.5M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 69.6M | ✅ | 380K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.9M | ✅ | 426K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.8M | ✅ | 392K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.9M | ✅ | 413K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.4M | ✅ | 308K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.0M | ✅ | 487K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.1M | ✅ | 368K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.9M | ✅ | 385K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.7M | ✅ | 729K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.4M | ✅ | 285K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.9M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.9M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.6M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.0M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 42.9M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.0M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.3M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 36.9M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 46.3M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 45.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.8M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.8M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 25.9M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.2M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.4M | ✅ | 4.2M | 🟢 **-97%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 36.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 161.3M | ✅ | 4.0M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 4.2M | 🟢 **-95%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.1M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.7M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.5M | ✅ | 4.0M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.1M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 16.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.7M | ✅ | 459K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ✅ | 720K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 13.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 35.0M | ✅ | 4.4M | 🟢 **-87%** |
| allOf.json | allOf | 4 | ✅ | 40.6M | ✅ | 89K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 40K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 59.4M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 65.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 1.8M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.4M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 455K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 450K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 299K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 81.8M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.6M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.4M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 72.5M | ✅ | 311K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 421K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.1M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.6M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 118.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.6M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.3M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.6M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 106.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 71.1M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.2M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 77.9M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 99.4M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 69.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.6M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.6M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.8M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ✅ | 4.4M | 🟢 **-96%** |
| default.json | invalid type for default | 2 | ✅ | 71.4M | ✅ | 758K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 74.5M | ✅ | 894K | 🟢 **-99%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 57.3M | ✅ | 449K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 65.1M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.1M | ✅ | 4.4M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.3M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.7M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 61.3M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.6M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 521K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.6M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.4M | ✅ | 755K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 346K | 🟢 **-98%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.6M | ✅ | 756K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 73.0M | ✅ | 452K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.8M | ✅ | 442K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.3M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 73.5M | ✅ | 823K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.4M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.5M | ✅ | 809K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 576K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 92.1M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 92.5M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 92.5M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 92.6M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 92.8M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 93.2M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 92.6M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 92.5M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 92.7M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 92.6M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 92.4M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 92.5M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 92.7M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 92.6M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 91.9M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 92.4M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 92.9M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 166.8M | ✅ | 4.4M | 🟢 **-97%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.1M | ✅ | 4.4M | 🟢 **-97%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 4.4M | 🟢 **-97%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.2M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 70.6M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.3M | ✅ | 976K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.0M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.9M | ✅ | 285K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 54.4M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 67.5M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ✅ | 4.2M | 🟢 **-98%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.5M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 65.6M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 27.7M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.9M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 60.9M | ✅ | 4.4M | 🟢 **-93%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.8M | ✅ | 2.2M | 🟢 **-97%** |
| maxItems.json | maxItems validation | 4 | ✅ | 80.6M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 61.4M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.9M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.3M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.1M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 78.5M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.1M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 57.4M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.5M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.5M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 71.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 495K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 1.9M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 351K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 223K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 68.3M | ✅ | 289K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 54.3M | ✅ | 349K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.4M | ✅ | 354K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 65.2M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 182.7M | ✅ | 4.4M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 159.4M | ✅ | 438K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 371K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 374K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 376K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 45.0M | ✅ | 233K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 515K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 47.8M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.5M | ✅ | 250K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 298K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 55.6M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.5M | ✅ | 4.4M | 🟢 **-69%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.4M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.9M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 4.2M | 🟢 **-77%** |
| properties.json | object properties validation | 6 | ✅ | 55.5M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 49.7M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.0M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 950K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 4.4M | 🟢 **-97%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.2M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.3M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.2M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.2M | ✅ | 434K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.9M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.0M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 40.0M | ✅ | 471K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.7M | ✅ | 594K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 53.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 55.4M | ✅ | 493K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 55.0M | ✅ | 493K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 158.8M | ✅ | 1.7M | 🟢 **-99%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 65.3M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 55.3M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 50.2M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 404K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.0M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.5M | ✅ | 476K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.7M | ✅ | 483K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.8M | ✅ | 480K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 53.9M | ✅ | 481K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.4M | ✅ | 481K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 44.0M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 51.5M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 75.3M | ✅ | 485K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 484K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.0M | ✅ | 484K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 51.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 43.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 41.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.8M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.2M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 159.2M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 52.4M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.5M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 86.2M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 69.5M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 69.0M | ✅ | 634K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 474K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 64.7M | ✅ | 528K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.7M | ✅ | 599K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.0M | ✅ | 349K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.0M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 577K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 72.3M | ✅ | 301K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 305K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 154.7M | ✅ | 4.2M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 4.2M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 478K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 3.9M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 347K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.4M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 429K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.7M | ✅ | 517K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 515K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 513K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 514K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.9M | ✅ | 399K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.5M | ✅ | 672K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.7M | ✅ | 515K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.3M | ✅ | 516K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 898K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 355K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 20.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.6M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.5M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.3M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.8M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 59.4M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 59.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.6M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.9M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 35.2M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.6M | ✅ | 3.6M | 🟢 **-98%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 80.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 170.5M | ✅ | 3.5M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 4.7M | 🟢 **-94%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 43.1M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.7M | ✅ | 4.6M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 63.9M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 474K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.1M | ✅ | 725K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 4.1M | 🟢 **-94%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 29.6M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.4M | ✅ | 380K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 40.9M | ✅ | 53K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 45K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 1.1M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 147.2M | ✅ | 1.4M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.8M | ✅ | 1.1M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 428K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 418K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 257K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.7M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 50.5M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 91.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 79.9M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 158.7M | ✅ | 1.5M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 78.4M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.9M | ✅ | 303K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 170.0M | ✅ | 975K | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 369K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 177.2M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 41.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 78.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.7M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 76.0M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.4M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.1M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 68.1M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 65.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 62.8M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.1M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 65.5M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.7M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 63.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 69.3M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 41.5M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 76.6M | ✅ | 4.4M | 🟢 **-94%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 174.8M | ✅ | 4.3M | 🟢 **-98%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.1M | ✅ | 4.2M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 95.5M | ✅ | 4.4M | 🟢 **-95%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 181.7M | ✅ | 4.4M | 🟢 **-98%** |
| default.json | invalid type for default | 2 | ✅ | 50.4M | ✅ | 768K | 🟢 **-98%** |
| default.json | invalid string value for default | 2 | ✅ | 49.4M | ✅ | 920K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.5M | ✅ | 438K | 🟢 **-99%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 63.7M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 174.8M | ✅ | 4.2M | 🟢 **-98%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.4M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 47.5M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.4M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 52.1M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 41.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.6M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 69.6M | ✅ | 481K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.6M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.7M | ✅ | 660K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 322K | 🟢 **-98%** |
| enum.json | enum with escaped characters | 3 | ✅ | 40.8M | ✅ | 653K | 🟢 **-98%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 73.2M | ✅ | 394K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 64.4M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 60.2M | ✅ | 383K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.3M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 72.0M | ✅ | 695K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.8M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.6M | ✅ | 693K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 66.1M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 64.4M | ✅ | 526K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 64.9M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 62.3M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 144.9M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 179.1M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 180.5M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 179.5M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 179.5M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 180.5M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 180.5M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 176.7M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 170.5M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 179.4M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 180.8M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 180.9M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 173.6M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 179.0M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 180.6M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 172.1M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 180.6M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 179.4M | ❌ | - | - |
| format.json | duration format | 6 | ✅ | 179.9M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 170.0M | ✅ | 4.4M | 🟢 **-97%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 170.3M | ✅ | 4.4M | 🟢 **-97%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 170.2M | ✅ | 4.4M | 🟢 **-97%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 170.5M | ✅ | 862K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.2M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.9M | ✅ | 271K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 53.3M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 68.2M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.5M | ✅ | 4.3M | 🟢 **-97%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 59.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 27.4M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 7.7M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 3.7M | 🟢 **-95%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 3.7M | 🟢 **-95%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 168.1M | ✅ | 3.8M | 🟢 **-98%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 80.8M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 62.0M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.8M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.3M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 170.6M | ✅ | 3.9M | 🟢 **-98%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 72.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.7M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 57.0M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 170.2M | ✅ | 3.8M | 🟢 **-98%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 72.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 80.4M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 58.1M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.2M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.5M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.4M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 504K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 1.9M | 🟢 **-98%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 349K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 71.1M | ✅ | 228K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 69.0M | ✅ | 278K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 53.7M | ✅ | 334K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.8M | ✅ | 349K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 65.0M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 177.3M | ✅ | 3.9M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 415K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.0M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.3M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 361K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 363K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 359K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.9M | ✅ | 222K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 477K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.3M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.6M | ✅ | 240K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 264K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 56.6M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.2M | ✅ | 4.0M | 🟢 **-84%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.3M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.3M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 4.0M | 🟢 **-78%** |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 49.2M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 69.9M | ✅ | 956K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.1M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 45.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.3M | ✅ | 3.8M | 🟢 **-98%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.0M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.4M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 345K | 🟢 **-89%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.3M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.3M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 53.0M | ✅ | 441K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.3M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.8M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 38.9M | ✅ | 803K | 🟢 **-98%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.7M | ✅ | 488K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.5M | ✅ | 491K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 158.8M | ✅ | 4.3M | 🟢 **-97%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 53.8M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ✅ | 348K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 41.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.5M | ✅ | 484K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.4M | ✅ | 479K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 52.3M | ✅ | 481K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 52.5M | ✅ | 481K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 51.5M | ✅ | 481K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 54.6M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 831K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 830K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 451K | 🟢 **-99%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 45.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.3M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 44.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 38.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 51.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 41.8M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 51.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.0M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.0M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 157.8M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 54.1M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.7M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 633K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 59.3M | ✅ | 480K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 64.7M | ✅ | 539K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.8M | ✅ | 597K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.7M | ✅ | 298K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 67.2M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 533K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 72.1M | ✅ | 289K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 77.1M | ✅ | 281K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 4.1M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 52.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 4.2M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 78.9M | ✅ | 4.2M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 44.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 44.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 51.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 81.8M | ✅ | 1.5M | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.4M | ✅ | 1.1M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 60.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 36.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 48.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 46.5M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.7M | ✅ | 4.2M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 4.2M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.8M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 42.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 2.6M | 🟢 **-96%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 35.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 33.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 69.6M | ✅ | 551K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 19.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.6M | ✅ | 288K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 33.8M | ✅ | 290K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 26.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 19.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 36.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.6M | ✅ | 291K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.7M | ✅ | 326K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.0M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.2M | ✅ | 59K | 🟢 **-100%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 80.6M | ✅ | 4.3M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 4.3M | 🟢 **-92%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.7M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.3M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 160.6M | ✅ | 4.2M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.9M | ✅ | 4.2M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.0M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.6M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 814K | 🟢 **-99%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 480K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.3M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.3M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.8M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 73.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 4.1M | 🟢 **-98%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 56.3M | ✅ | 538K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.9M | ✅ | 539K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.2M | ✅ | 538K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.3M | ✅ | 539K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.9M | ✅ | 421K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.4M | ✅ | 693K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.1M | ✅ | 538K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.0M | ✅ | 544K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.7M | ✅ | 943K | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.7M | ✅ | 378K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.1M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 21.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.7M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.9M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.5M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.1M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.7M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.4M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.6M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 68.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 54.7M | ✅ | 500K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 52.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.1M | ✅ | 427K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 742K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 55.1M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.1M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 25.2M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.8M | ✅ | 487K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 17.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.3M | ✅ | 745K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 24.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 4.7M | 🟢 **-93%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 29.6M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.5M | ✅ | 380K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 40.8M | ✅ | 65K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 28.9M | ✅ | 37K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 85.3M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 151.1M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 68.6M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ✅ | 1.9M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 158.7M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 450K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 450K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 77.4M | ✅ | 301K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 84.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 50.7M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 81.5M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 37.8M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.4M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 2.0M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.2M | ✅ | 323K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.9M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.1M | ✅ | 433K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 184.6M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 64.0M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 41.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 78.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 76.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.2M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 67.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 66.0M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.1M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.3M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.1M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 42.4M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 4.3M | 🟢 **-94%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.8M | ✅ | 4.3M | 🟢 **-98%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.6M | ✅ | 4.3M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 160.2M | ✅ | 4.4M | 🟢 **-97%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 184.5M | ✅ | 4.5M | 🟢 **-98%** |
| default.json | invalid type for default | 2 | ✅ | 71.6M | ✅ | 787K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 942K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 57.5M | ✅ | 454K | 🟢 **-99%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 65.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.6M | ✅ | 4.3M | 🟢 **-98%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 49.1M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.4M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 59.2M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 41.2M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 39.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 12.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.8M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.2M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 18.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.9M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.1M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.7M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.4M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.8M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ✅ | 517K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.6M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.5M | ✅ | 754K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 14.8M | ✅ | 343K | 🟢 **-98%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.7M | ✅ | 739K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.7M | ✅ | 446K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.5M | ✅ | 435K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.2M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 804K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.2M | ✅ | 788K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 64.4M | ✅ | 569K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 183.0M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 180.7M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 182.0M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 182.7M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 175.6M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 153.3M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 153.1M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 182.9M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 183.7M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 182.9M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 183.3M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 183.9M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 183.1M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 182.7M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 183.7M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 182.7M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 183.1M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 176.1M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ✅ | 3.8M | 🟢 **-98%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 170.9M | ✅ | 3.8M | 🟢 **-98%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 170.7M | ✅ | 3.7M | 🟢 **-98%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.4M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 163.6M | ✅ | 911K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.4M | ✅ | 279K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 54.6M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ✅ | 3.8M | 🟢 **-98%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 22.5M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.3M | ❌ | - | - |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.8M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 47.9M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 44.9M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 74.9M | ✅ | 3.8M | 🟢 **-95%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 3.8M | 🟢 **-98%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.1M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.4M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 79.4M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 62.7M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 50.3M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.3M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 78.2M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 157.8M | ✅ | 3.8M | 🟢 **-98%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 65.4M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.6M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 65.7M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.7M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 53.1M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 171.7M | ✅ | 3.8M | 🟢 **-98%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 72.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 79.0M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 58.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.6M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 78.7M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.5M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.1M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 475K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 1.6M | 🟢 **-98%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 347K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 221K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 68.8M | ✅ | 278K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 54.6M | ✅ | 345K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.7M | ✅ | 348K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 64.9M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 183.7M | ✅ | 3.9M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 159.2M | ✅ | 418K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.4M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.4M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 65.9M | ✅ | 350K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 65.9M | ✅ | 351K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 351K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.9M | ✅ | 214K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 478K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.3M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.6M | ✅ | 241K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 274K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 56.6M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 19.9M | ✅ | 3.9M | 🟢 **-81%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.3M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.6M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.2M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 3.9M | 🟢 **-79%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 68.2M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 64.8M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 80.8M | ✅ | 3.8M | 🟢 **-95%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 80.9M | ✅ | 3.9M | 🟢 **-95%** |
| properties.json | object properties validation | 6 | ✅ | 56.5M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.2M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 49.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 50.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 907K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 45.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 20.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.3M | ✅ | 3.8M | 🟢 **-98%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.9M | ✅ | 417K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.3M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 39.0M | ✅ | 739K | 🟢 **-98%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 44.2M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.7M | ✅ | 468K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 469K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ✅ | 3.9M | 🟢 **-98%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 53.9M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.2M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 57.0M | ✅ | 391K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.1M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.1M | ✅ | 464K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 52.6M | ✅ | 463K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.1M | ✅ | 465K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.3M | ✅ | 464K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.8M | ✅ | 460K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 54.5M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 50.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 785K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.4M | ✅ | 785K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 455K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 50.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 50.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.2M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 50.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 50.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 50.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 50.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.0M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 158.7M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 159.6M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 54.0M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 65.6M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 66.3M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 69.2M | ✅ | 610K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 465K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 63.9M | ✅ | 517K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.6M | ✅ | 584K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.7M | ✅ | 346K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 61.5M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 72.9M | ✅ | 558K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 72.3M | ✅ | 298K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 77.2M | ✅ | 301K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 3.8M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 52.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 3.8M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 55.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 3.8M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 45.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 50.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.9M | ✅ | 1.7M | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.2M | ✅ | 1.2M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 41.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 50.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 45.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 38.7M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 25.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 79.7M | ✅ | 3.8M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 3.8M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.1M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.2M | ✅ | 3.7M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 39.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 31.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.9M | ✅ | 3.7M | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 350K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 29.7M | ✅ | 352K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.0M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.4M | ✅ | 352K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 557K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.1M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.4M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.3M | ✅ | 133K | 🟢 **-99%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.4M | ✅ | 3.8M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 52.5M | ✅ | 3.8M | 🟢 **-93%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 9.0M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 14.6M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 46.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 160.4M | ✅ | 3.8M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.7M | ✅ | 3.8M | 🟢 **-95%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.3M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 54.1M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 784K | 🟢 **-99%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 461K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 64.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.6M | ✅ | 3.9M | 🟢 **-98%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 49.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 41.7M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.6M | ✅ | 513K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 20.2M | ✅ | 514K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 510K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.2M | ✅ | 513K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.6M | ✅ | 402K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.5M | ✅ | 662K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.6M | ✅ | 510K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.3M | ✅ | 514K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 867K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.1M | ✅ | 357K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 21.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.4M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.5M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.4M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 33.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.8M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.8M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 36.2M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.0M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.0M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.4M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 24.7M | ✅ | 551K | 🟢 **-98%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.7M | ✅ | 549K | 🟢 **-97%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 37.2M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 67.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 55.0M | ✅ | 490K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 54.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 53.3M | ✅ | 422K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 717K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.1M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.4M | ❌ | - | - |
