# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | joi pass | joi ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 29.3M | 82/199 | 418K | 82 | 🟢 **-99%** |
| draft6 | 276 | ✅ 276 | 33.2M | 98/276 | 378K | 98 | 🟢 **-99%** |
| draft7 | 313 | ✅ 313 | 16.5M | 102/313 | 468K | 102 | 🟢 **-97%** |
| draft2019-09 | 435 | ✅ 435 | 20.7M | 131/435 | 428K | 131 | 🟢 **-98%** |
| draft2020-12 | 448 | ✅ 448 | 20.9M | 129/448 | 458K | 129 | 🟢 **-98%** |
| **Total** | 1671 | 1670/1671 | 21.6M | 542/1671 | 430K | 542 | 🟢 **-98%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **128.03x faster** (18 ns vs 2327 ns per test, 1591 tests in 542 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.9M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 146.8M | ✅ | 4.8M | 🟢 **-97%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 123.0M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.4M | ✅ | 4.8M | 🟢 **-97%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.5M | ✅ | 4.9M | 🟢 **-96%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 46.3M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 54.3M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.3M | ✅ | 4.8M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.0M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 50.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 38.2M | ✅ | 473K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 51.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 158.7M | ✅ | 751K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 51.7M | ✅ | 4.5M | 🟢 **-91%** |
| allOf.json | allOf | 4 | ✅ | 49.3M | ✅ | 62K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 27.3M | ✅ | 85K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.2M | ✅ | 1.9M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 1.4M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 448K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 439K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.6M | ✅ | 300K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 81.9M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.4M | ✅ | 310K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 1.0M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 420K | 🟢 **-99%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 783K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ✅ | 931K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.9M | ✅ | 406K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 13.1M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 100.1M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.1M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 59.8M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 19.6M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 54.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 88.8M | ✅ | 531K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.9M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.7M | ✅ | 771K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 48.5M | ✅ | 353K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 60.9M | ✅ | 767K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 113.1M | ✅ | 462K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.0M | ✅ | 453K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 65.5M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 844K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 830K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.2M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 592K | 🟢 **-99%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ✅ | 573K | 🟢 **-99%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 94.0M | ✅ | 601K | 🟢 **-99%** |
| format.json | email format | 6 | ✅ | 91.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 163.1M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 92.5M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 134.0M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 92.9M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 162.7M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 46.6M | ✅ | 295K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 94.2M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 66.8M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 35.4M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.9M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 4.4M | 🟢 **-94%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.0M | ✅ | 4.5M | 🟢 **-94%** |
| maxItems.json | maxItems validation | 4 | ✅ | 81.0M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 66.9M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.1M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.4M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.7M | ❌ | - | - |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 76.9M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 70.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.2M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 57.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.7M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 78.7M | ❌ | - | - |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 76.9M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 61.3M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.8M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.4M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.3M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 492K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 91.3M | ✅ | 360K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 69.6M | ✅ | 230K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ✅ | 289K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 354K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.3M | ✅ | 361K | 🟢 **-99%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 441K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 77.1M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.2M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.9M | ✅ | 228K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 509K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.6M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.6M | ✅ | 249K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 294K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 4.4M | 🟢 **-83%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.7M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 4.1M | 🟢 **-77%** |
| properties.json | object properties validation | 6 | ✅ | 56.1M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 52.1M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 968K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 28.1M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.6M | ✅ | 439K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 57.0M | ✅ | 462K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 55.1M | ✅ | 592K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 27.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.7M | ✅ | 490K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 486K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.9M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.4M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 72.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 56.9M | ✅ | 490K | 🟢 **-99%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 71.8M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 458K | 🟢 **-99%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.1M | ✅ | 467K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 469K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 71.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 72.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 70.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 44.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 42.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 72.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 54.4M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.0M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 64.6M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 69.5M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 623K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 474K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 64.6M | ✅ | 539K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 67.0M | ✅ | 595K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.9M | ✅ | 350K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 567K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 66.6M | ✅ | 302K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 74.3M | ✅ | 307K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.2M | ✅ | 4.1M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.2M | ✅ | 4.1M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.2M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 478K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.8M | ✅ | 3.9M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 3.9M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.6M | ✅ | 487K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 490K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 491K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 488K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.9M | ✅ | 381K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.1M | ✅ | 645K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.6M | ✅ | 491K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.6M | ✅ | 492K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.9M | ✅ | 861K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.3M | ✅ | 332K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 22.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 22.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 43.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.1M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 62.7M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 45.5M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 174.7M | ✅ | 3.1M | 🟢 **-98%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 32.5M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 187.2M | ✅ | 3.5M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 68.7M | ✅ | 4.9M | 🟢 **-93%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 59.8M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.0M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 112.6M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 174.9M | ✅ | 4.9M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 58.4M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 39.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.5M | ✅ | 473K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 40.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 174.4M | ✅ | 724K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 30.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ✅ | 4.2M | 🟢 **-94%** |
| allOf.json | allOf | 4 | ✅ | 41.8M | ✅ | 57K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 31.8M | ✅ | 31K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 80.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 174.6M | ✅ | 1.1M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 74.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 101.2M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 174.8M | ✅ | 1.4M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 174.3M | ✅ | 1.1M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 84.4M | ✅ | 422K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 126.9M | ✅ | 424K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 86.0M | ✅ | 287K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 85.5M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 88.0M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 54.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 170.3M | ✅ | 1.5M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 175.5M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 75.2M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 79.2M | ✅ | 293K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 190.4M | ✅ | 965K | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 128.9M | ✅ | 399K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 196.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 86.4M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 76.7M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 64.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 130.0M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 82.4M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 120.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 71.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 97.1M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 70.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 91.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 82.7M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 128.0M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 76.1M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 114.1M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 69.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 87.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 73.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 106.1M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 67.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 112.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 80.0M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 61.3M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 88.5M | ✅ | 4.2M | 🟢 **-95%** |
| default.json | invalid type for default | 2 | ✅ | 113.3M | ✅ | 738K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 59.7M | ✅ | 863K | 🟢 **-99%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 85.3M | ✅ | 454K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 97.6M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 197.9M | ✅ | 4.1M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 43.7M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 50.4M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 93.3M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 20.0M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 54.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 82.8M | ✅ | 531K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 67.1M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 82.4M | ✅ | 759K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 59.5M | ✅ | 347K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 87.8M | ✅ | 749K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 118.6M | ✅ | 452K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 72.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 119.9M | ✅ | 440K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 70.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 127.6M | ✅ | 817K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 73.3M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 127.2M | ✅ | 802K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 71.2M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 97.0M | ✅ | 577K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 79.5M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.6M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 99.7M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 158.9M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 99.7M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 161.0M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 99.7M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 159.3M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 99.7M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 159.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 96.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 63.4M | ✅ | 274K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 63.0M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 111.9M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 187.4M | ✅ | 4.3M | 🟢 **-98%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 100.1M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 62.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 34.6M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.7M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 84.9M | ✅ | 4.3M | 🟢 **-95%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.9M | ✅ | 4.3M | 🟢 **-95%** |
| maxItems.json | maxItems validation | 4 | ✅ | 84.2M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 74.2M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 70.6M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 66.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.9M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 53.3M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 87.1M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 85.6M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 87.7M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 82.3M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 65.8M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 64.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 64.3M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 45.4M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 85.6M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 81.0M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 84.0M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 80.2M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 74.3M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 62.7M | ✅ | 496K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 79.7M | ✅ | 1.8M | 🟢 **-98%** |
| not.json | not | 2 | ✅ | 83.7M | ✅ | 346K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 78.8M | ✅ | 223K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 75.9M | ✅ | 278K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 56.9M | ✅ | 338K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 69.2M | ✅ | 344K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 69.4M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 202.9M | ✅ | 4.3M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 174.5M | ✅ | 412K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 72.4M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 38.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 76.3M | ✅ | 359K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 99.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 75.6M | ✅ | 363K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 75.6M | ✅ | 363K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 46.4M | ✅ | 221K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 82.4M | ✅ | 481K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 53.7M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 54.4M | ✅ | 242K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 82.1M | ✅ | 284K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 59.9M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 16.6M | ✅ | 4.3M | 🟢 **-74%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.9M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 16.3M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.8M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 23.2M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 20.2M | ✅ | 3.9M | 🟢 **-80%** |
| properties.json | object properties validation | 6 | ✅ | 58.1M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.8M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 50.9M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 57.4M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 78.4M | ✅ | 949K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 30.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 49.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.4M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 182.9M | ✅ | 4.2M | 🟢 **-98%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 53.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 46.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 28.2M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 58.7M | ✅ | 437K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 64.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 49.2M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 43.6M | ✅ | 426K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 60.3M | ✅ | 576K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.9M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 60.2M | ✅ | 477K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 60.2M | ✅ | 474K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 174.6M | ✅ | 1.4M | 🟢 **-99%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 75.7M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 60.0M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 55.1M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 54.8M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 55.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 60.4M | ✅ | 393K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 41.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 40.2M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 44.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 60.1M | ✅ | 460K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 59.4M | ✅ | 467K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 57.5M | ✅ | 466K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 60.6M | ✅ | 466K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 59.4M | ✅ | 463K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 85.4M | ✅ | 433K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 84.7M | ✅ | 431K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 86.6M | ✅ | 433K | 🟢 **-100%** |
| refRemote.json | remote ref | 2 | ✅ | 54.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 54.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 49.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 33.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 34.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 48.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 52.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 39.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 75.0M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 175.4M | ✅ | 1.0M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 174.6M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 44.1M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 70.7M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 73.3M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 73.0M | ✅ | 613K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 62.7M | ✅ | 474K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 67.5M | ✅ | 527K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 70.6M | ✅ | 598K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.1M | ✅ | 341K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 69.6M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 84.3M | ✅ | 533K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 79.3M | ✅ | 287K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 84.0M | ✅ | 293K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 36.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 191.6M | ✅ | 4.1M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.9M | ✅ | 4.1M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 78.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 94.0M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 96.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 71.8M | ✅ | 469K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 88.0M | ✅ | 4.1M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 66.5M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 87.5M | ✅ | 4.1M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 66.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 67.5M | ✅ | 525K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 21.2M | ✅ | 528K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 32.4M | ✅ | 525K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 32.0M | ✅ | 530K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 32.4M | ✅ | 415K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 29.5M | ✅ | 683K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 32.6M | ✅ | 530K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 32.6M | ✅ | 526K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 29.1M | ✅ | 902K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 34.8M | ✅ | 361K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 18.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.9M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 23.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 23.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 27.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.9M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 45.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 33.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 101.8M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.4M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 7.0M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 38.6M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 51.6M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 50.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 33.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.6M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 23.9M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.8M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 46.7M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 158.5M | ✅ | 3.5M | 🟢 **-98%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 75.6M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 3.6M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 75.1M | ✅ | 4.9M | 🟢 **-94%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 57.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 41.6M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ✅ | 5.0M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 68.4M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 49.7M | ✅ | 468K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 727K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.7M | ✅ | 4.1M | 🟢 **-94%** |
| allOf.json | allOf | 4 | ✅ | 39.1M | ✅ | 105K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.6M | ✅ | 81K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 1.1M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 44.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 146.9M | ✅ | 1.4M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.0M | ✅ | 1.1M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.3M | ✅ | 433K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 424K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.6M | ✅ | 281K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.4M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 75.8M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.9M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 1.4M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 1.4M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 72.9M | ✅ | 295K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 170.7M | ✅ | 963K | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 403K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 178.2M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 85.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 62.3M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 54.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 72.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.9M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 93.8M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 57.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 59.8M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 63.7M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 91.8M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 62.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 52.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 95.8M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 68.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 58.8M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 62.4M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ✅ | 4.5M | 🟢 **-96%** |
| default.json | invalid type for default | 2 | ✅ | 64.2M | ✅ | 764K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 67.9M | ✅ | 914K | 🟢 **-99%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 47.7M | ✅ | 441K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 62.6M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 176.6M | ✅ | 4.2M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.0M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 43.7M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 53.9M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 19.5M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 23.8M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 52.6M | ✅ | 524K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.3M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.1M | ✅ | 759K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 43.0M | ✅ | 344K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 70.7M | ✅ | 755K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 71.9M | ✅ | 452K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.9M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 71.9M | ✅ | 441K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.5M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 70.9M | ✅ | 828K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.2M | ✅ | 808K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.4M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 62.2M | ✅ | 583K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 67.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 86.4M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 87.1M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 87.0M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 87.3M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 86.6M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 87.2M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 86.6M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 87.2M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 86.8M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 86.9M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 81.4M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 87.2M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 86.3M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 87.2M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 86.5M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 86.2M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 79.0M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ✅ | 4.3M | 🟢 **-98%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.2M | ✅ | 4.0M | 🟢 **-98%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.6M | ✅ | 4.2M | 🟢 **-98%** |
| if-then-else.json | if and then without else | 3 | ✅ | 73.6M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.6M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 907K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.6M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 70.6M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 45.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.8M | ✅ | 280K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 61.8M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 64.5M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.8M | ✅ | 4.2M | 🟢 **-98%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.8M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 65.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 30.6M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.6M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 4.3M | 🟢 **-94%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.2M | ✅ | 4.3M | 🟢 **-94%** |
| maxItems.json | maxItems validation | 4 | ✅ | 75.1M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.4M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 57.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.9M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.5M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 73.2M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.1M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 68.1M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.0M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 61.4M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.6M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 56.9M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.2M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 73.3M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 73.8M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 70.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 55.7M | ✅ | 490K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 1.9M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 73.3M | ✅ | 337K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 67.7M | ✅ | 220K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 65.9M | ✅ | 275K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 52.6M | ✅ | 334K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 62.0M | ✅ | 340K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.9M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 176.8M | ✅ | 4.1M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 403K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 61.1M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 62.9M | ✅ | 360K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 355K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 355K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.8M | ✅ | 219K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 476K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.5M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.7M | ✅ | 233K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.5M | ✅ | 275K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 53.6M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.9M | ✅ | 4.1M | 🟢 **-84%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.1M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.9M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.8M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 22.5M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 4.1M | 🟢 **-77%** |
| properties.json | object properties validation | 6 | ✅ | 54.0M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.3M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 33.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 50.5M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ✅ | 925K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.6M | ✅ | 4.1M | 🟢 **-98%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.8M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 42.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 44.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 27.2M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.0M | ✅ | 442K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 57.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.0M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 54.0M | ✅ | 444K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 55.6M | ✅ | 591K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 67.2M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.6M | ✅ | 485K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.9M | ✅ | 487K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 147.3M | ✅ | 1.4M | 🟢 **-99%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.5M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 68.8M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 68.8M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 68.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 55.1M | ✅ | 402K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 40.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 40.4M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 68.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.7M | ✅ | 475K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 52.5M | ✅ | 471K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 52.4M | ✅ | 475K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 52.5M | ✅ | 477K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 52.4M | ✅ | 477K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 53.3M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 68.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 68.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 68.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 68.6M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 449K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 453K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.4M | ✅ | 450K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 68.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 68.0M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 68.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 34.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 43.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 40.7M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 55.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 55.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.7M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 53.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 61.5M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 158.6M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 50.7M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.5M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 66.2M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 65.4M | ✅ | 615K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 56.5M | ✅ | 474K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 61.1M | ✅ | 532K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 61.9M | ✅ | 596K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 57.8M | ✅ | 340K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.3M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 73.1M | ✅ | 532K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 65.1M | ✅ | 292K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 73.6M | ✅ | 297K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 158.3M | ✅ | 4.1M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 70.4M | ✅ | 4.1M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.7M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.0M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 476K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 3.9M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 352K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.7M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 427K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 27.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 59.9M | ✅ | 543K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ✅ | 542K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 539K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.8M | ✅ | 538K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.3M | ✅ | 426K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.2M | ✅ | 676K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.1M | ✅ | 525K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.8M | ✅ | 526K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.7M | ✅ | 901K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.2M | ✅ | 374K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.4M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 14.2M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.0M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.3M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.0M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.7M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 70.0M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.2M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 73.6M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 41.1M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 64.8M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 57.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.9M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 26.6M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 41.4M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.6M | ✅ | 5.0M | 🟢 **-97%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 73.3M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 87.7M | ✅ | 4.5M | 🟢 **-95%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 78.9M | ✅ | 4.5M | 🟢 **-94%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 29.2M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.7M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.3M | ✅ | 4.5M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 62.4M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.8M | ✅ | 481K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 22.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 746K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 31.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.0M | ✅ | 4.1M | 🟢 **-94%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.7M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 38.0M | ✅ | 399K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 40.4M | ✅ | 72K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.2M | ✅ | 37K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ✅ | 1.8M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.6M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 458K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 451K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 295K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.2M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 71.5M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 91.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 81.4M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.0M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.4M | ✅ | 2.0M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.0M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 54.5M | ✅ | 318K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.6M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 425K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.5M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 65.3M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.4M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 41.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.6M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 78.6M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 76.0M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 65.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 60.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 61.8M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.2M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.6M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 63.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 47.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 4.1M | 🟢 **-95%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 172.7M | ✅ | 4.0M | 🟢 **-98%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 175.6M | ✅ | 4.1M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 178.7M | ✅ | 4.1M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 182.8M | ✅ | 4.1M | 🟢 **-98%** |
| default.json | invalid type for default | 2 | ✅ | 70.4M | ✅ | 781K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 55.0M | ✅ | 930K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 56.1M | ✅ | 458K | 🟢 **-99%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 65.2M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.2M | ✅ | 4.3M | 🟢 **-98%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.7M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 59.5M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 50.0M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 43.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 88.8M | ✅ | 536K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.6M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ✅ | 777K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 45.1M | ✅ | 348K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 77.8M | ✅ | 764K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.2M | ✅ | 457K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.4M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.1M | ✅ | 449K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.5M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ✅ | 838K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.8M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.7M | ✅ | 821K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.4M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 63.4M | ✅ | 594K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 167.9M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 182.2M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 181.5M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 182.7M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 182.8M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 181.8M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 182.7M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 182.8M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 181.0M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 182.4M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 179.5M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 182.8M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 182.3M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 182.9M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 179.8M | ❌ | - | - |
| format.json | duration format | 6 | ✅ | 182.5M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ✅ | 4.0M | 🟢 **-98%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 165.3M | ✅ | 4.3M | 🟢 **-97%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.0M | ✅ | 4.4M | 🟢 **-97%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.3M | ✅ | 981K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 46.6M | ✅ | 292K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 63.8M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 67.9M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.3M | ✅ | 4.4M | 🟢 **-97%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 72.0M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 68.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 31.0M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.7M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 4.4M | 🟢 **-94%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.0M | ✅ | 4.4M | 🟢 **-94%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.6M | ✅ | 4.5M | 🟢 **-97%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.8M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 65.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 61.2M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 80.9M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 62.4M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 59.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.7M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 51.2M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.3M | ✅ | 4.5M | 🟢 **-97%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 81.4M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.5M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.7M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 57.3M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.4M | ✅ | 4.5M | 🟢 **-97%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 80.1M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.7M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 58.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.3M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.2M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.7M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 507K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 67.5M | ✅ | 366K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 70.9M | ✅ | 233K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 69.0M | ✅ | 292K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 358K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 59.8M | ✅ | 358K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.4M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.7M | ✅ | 4.5M | 🟢 **-97%** |
| not.json | double negation | 1 | ✅ | 159.2M | ✅ | 443K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 371K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 376K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 376K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 45.0M | ✅ | 233K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ✅ | 519K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.4M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 257K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 299K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 56.3M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.3M | ✅ | 4.5M | 🟢 **-81%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 28.3M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.0M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 22.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 4.2M | 🟢 **-77%** |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.9M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 49.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 52.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.1M | ✅ | 966K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 42.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 170.9M | ✅ | 4.4M | 🟢 **-97%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 47.1M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 45.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 375K | 🟢 **-88%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 14.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 13.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.3M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.9M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.9M | ✅ | 445K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 57.3M | ✅ | 800K | 🟢 **-99%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 47.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.7M | ✅ | 493K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.8M | ✅ | 496K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.4M | ✅ | 4.5M | 🟢 **-97%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.4M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 32.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.7M | ✅ | 397K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 41.3M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 39.1M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 71.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 70.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.7M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 57.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.7M | ✅ | 480K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.8M | ✅ | 483K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.5M | ✅ | 484K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.8M | ✅ | 485K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.7M | ✅ | 483K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 54.4M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 71.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 71.3M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 71.8M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 71.1M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 72.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 839K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 824K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.1M | ✅ | 484K | 🟢 **-99%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.9M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 71.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 71.6M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 72.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 69.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 42.6M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 57.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 71.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 48.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 69.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 71.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 58.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 71.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.4M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.3M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 159.4M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 53.8M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.8M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 66.8M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 69.1M | ✅ | 631K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 56.3M | ✅ | 474K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 64.6M | ✅ | 526K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 595K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 63.8M | ✅ | 347K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 65.9M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 91.2M | ✅ | 570K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 87.7M | ✅ | 300K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 88.6M | ✅ | 310K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 4.1M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 61.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 4.0M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 78.8M | ✅ | 4.0M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 51.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 54.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 24.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 81.9M | ✅ | 1.7M | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.3M | ✅ | 1.2M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 52.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 52.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.5M | ✅ | 4.1M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 3.9M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 23.7M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.1M | ✅ | 2.6M | 🟢 **-96%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 37.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 42.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 40.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 69.6M | ✅ | 551K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 36.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 14.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.5M | ✅ | 304K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 32.3M | ✅ | 304K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 20.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 32.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 20.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 32.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 40.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 35.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 35.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 34.2M | ✅ | 305K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 33.6M | ✅ | 338K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 33.0M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 24.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.4M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 30.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 35.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 20.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.1M | ✅ | 74K | 🟢 **-100%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.4M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 82.6M | ✅ | 4.1M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.6M | ✅ | 4.0M | 🟢 **-92%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.6M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 24.0M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 29.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 159.9M | ✅ | 4.2M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.0M | ✅ | 4.1M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 66.3M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 52.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 39.6M | ✅ | 804K | 🟢 **-98%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 476K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 3.9M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 29.6M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 73.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.1M | ✅ | 4.1M | 🟢 **-98%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 49.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.5M | ✅ | 528K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 20.2M | ✅ | 528K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.2M | ✅ | 530K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.4M | ✅ | 528K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.5M | ✅ | 416K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.5M | ✅ | 684K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.7M | ✅ | 526K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.4M | ✅ | 528K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 914K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 370K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 22.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.1M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.0M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.3M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.8M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.5M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.6M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.5M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.0M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.3M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.7M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 68.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 54.8M | ✅ | 484K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 54.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 412K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.5M | ✅ | 740K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 31.1M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 54.5M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 35.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.0M | ✅ | 480K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 36.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.3M | ✅ | 737K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 34.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.2M | ✅ | 4.2M | 🟢 **-94%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 34.9M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 38.3M | ✅ | 382K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 40.1M | ✅ | 87K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 31.2M | ✅ | 44K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 85.3M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 1.8M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 463K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 461K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.5M | ✅ | 289K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.2M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 77.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 71.4M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 76.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 79.3M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 1.8M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.1M | ✅ | 1.8M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 51.2M | ✅ | 318K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.6M | ✅ | 418K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.5M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.5M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 82.4M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 41.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 78.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 69.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 76.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 58.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 66.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 68.0M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 67.9M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.7M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 73.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 64.4M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 63.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 47.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 54.2M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 4.1M | 🟢 **-95%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 175.5M | ✅ | 4.0M | 🟢 **-98%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.3M | ✅ | 4.2M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.6M | ✅ | 4.3M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 175.8M | ✅ | 4.2M | 🟢 **-98%** |
| default.json | invalid type for default | 2 | ✅ | 70.3M | ✅ | 764K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 54.8M | ✅ | 922K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 53.5M | ✅ | 413K | 🟢 **-99%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 65.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 176.5M | ✅ | 4.1M | 🟢 **-98%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 55.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.7M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 49.5M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 42.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.9M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 17.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 14.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.6M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 10.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.8M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.1M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 31.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 8.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 38.0M | ✅ | 497K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.0M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.1M | ✅ | 716K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 45.2M | ✅ | 331K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 40.7M | ✅ | 700K | 🟢 **-98%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 73.0M | ✅ | 427K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.6M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.2M | ✅ | 418K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 64.3M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.7M | ✅ | 774K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 35.5M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.1M | ✅ | 758K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.8M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 61.1M | ✅ | 545K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 183.4M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 183.1M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 183.8M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 183.6M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 181.9M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 182.7M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 181.3M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 183.3M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 147.0M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 177.0M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 183.8M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 184.1M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 183.9M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 177.4M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 150.2M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 183.3M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 183.9M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ✅ | 4.1M | 🟢 **-98%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.6M | ✅ | 3.9M | 🟢 **-98%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 3.9M | 🟢 **-98%** |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 160.6M | ✅ | 955K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 47.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 46.5M | ✅ | 283K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 64.2M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 168.5M | ✅ | 4.0M | 🟢 **-98%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 31.1M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.8M | ❌ | - | - |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 80.7M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 53.5M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 53.0M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 72.8M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 75.3M | ✅ | 4.0M | 🟢 **-95%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.8M | ✅ | 4.0M | 🟢 **-98%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 75.9M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 66.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 59.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 80.9M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.7M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 62.2M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 58.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.5M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.7M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 76.8M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.7M | ✅ | 4.0M | 🟢 **-98%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 72.0M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 61.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 66.2M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 60.9M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 58.8M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 171.7M | ✅ | 3.9M | 🟢 **-98%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 72.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 80.8M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.3M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 57.9M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 58.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.9M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.4M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 76.5M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.2M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 76.8M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.6M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 479K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.3M | ✅ | 1.7M | 🟢 **-98%** |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 352K | 🟢 **-100%** |
| not.json | not multiple types | 3 | ✅ | 71.2M | ✅ | 226K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 69.1M | ✅ | 284K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 54.4M | ✅ | 351K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.5M | ✅ | 351K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.7M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 185.2M | ✅ | 4.2M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 423K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 34.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 65.4M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 37.3M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.0M | ✅ | 360K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 363K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 355K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 45.0M | ✅ | 220K | 🟢 **-100%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 489K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.7M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ✅ | 240K | 🟢 **-100%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 270K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 56.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.1M | ✅ | 4.1M | 🟢 **-71%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.1M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.3M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.9M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 22.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 4.1M | 🟢 **-77%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 67.9M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 68.0M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 78.9M | ✅ | 4.0M | 🟢 **-95%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 79.0M | ✅ | 4.1M | 🟢 **-95%** |
| properties.json | object properties validation | 6 | ✅ | 56.2M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 21.5M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 49.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 914K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 47.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.4M | ✅ | 4.1M | 🟢 **-98%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 50.8M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 47.1M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 45.4M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.9M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.9M | ✅ | 421K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 54.7M | ✅ | 763K | 🟢 **-99%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 46.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.8M | ✅ | 474K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.7M | ✅ | 469K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.4M | ✅ | 4.0M | 🟢 **-97%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.4M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 32.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.8M | ✅ | 369K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 41.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 41.9M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 71.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 69.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 73.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 54.6M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.2M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.8M | ✅ | 474K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.8M | ✅ | 473K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 54.8M | ✅ | 474K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 54.8M | ✅ | 472K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 54.8M | ✅ | 474K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 54.8M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 71.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 70.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 70.9M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 70.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 71.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 809K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ✅ | 808K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 77.0M | ✅ | 461K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 71.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 70.7M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 70.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 70.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 39.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 46.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 42.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 57.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 70.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 70.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 70.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 53.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 69.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 77.2M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 53.9M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.8M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 69.3M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 68.8M | ✅ | 628K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 58.6M | ✅ | 477K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 64.2M | ✅ | 532K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.4M | ✅ | 606K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.7M | ✅ | 332K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.1M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 76.8M | ✅ | 569K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 70.2M | ✅ | 302K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 77.5M | ✅ | 299K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 4.0M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 61.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 57.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 70.4M | ✅ | 4.1M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 56.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 78.9M | ✅ | 4.1M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 53.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 54.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 81.8M | ✅ | 1.7M | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.7M | ✅ | 1.2M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 13.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 42.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 61.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 53.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 53.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 22.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 9.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 20.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.9M | ✅ | 4.2M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 75.3M | ✅ | 4.1M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 23.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 43.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 58.3M | ✅ | 4.0M | 🟢 **-93%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 37.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 40.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 37.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.6M | ✅ | 4.0M | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 39.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 69.6M | ✅ | 346K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 23.9M | ✅ | 348K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 19.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 22.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 38.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 33.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.8M | ✅ | 345K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.9M | ✅ | 546K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.9M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 36.9M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 49.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 20.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.2M | ✅ | 130K | 🟢 **-99%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.4M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 81.9M | ✅ | 4.2M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.7M | ✅ | 4.1M | 🟢 **-92%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 32.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.7M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 24.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 29.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 45.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.6M | ✅ | 4.2M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 73.2M | ✅ | 4.2M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.6M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 57.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 77.1M | ✅ | 793K | 🟢 **-99%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 64.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.6M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 476K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 85.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 65.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 4.1M | 🟢 **-98%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 34.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 48.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 55.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 61.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 49.9M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 64.6M | ✅ | 480K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 27.6M | ✅ | 481K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 478K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.0M | ✅ | 479K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.9M | ✅ | 376K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.3M | ✅ | 633K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.7M | ✅ | 483K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.7M | ✅ | 482K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.2M | ✅ | 846K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 32.0M | ✅ | 326K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 27.8M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.8M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 51.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.6M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.6M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 24.4M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.8M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.0M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 26.2M | ✅ | 503K | 🟢 **-98%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.6M | ✅ | 505K | 🟢 **-97%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 42.7M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 68.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.5M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 54.9M | ✅ | 483K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 54.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.9M | ✅ | 417K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 76.9M | ✅ | 726K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 54.8M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 31.2M | ❌ | - | - |
