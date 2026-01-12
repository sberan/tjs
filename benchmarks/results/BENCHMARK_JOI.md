# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | joi pass | joi ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 28.8M | 82/199 | 442K | 82 | 🟢 **-98%** |
| draft6 | 276 | ✅ 276 | 29.6M | 98/276 | 408K | 98 | 🟢 **-99%** |
| draft7 | 313 | ✅ 313 | 16.3M | 102/313 | 464K | 102 | 🟢 **-97%** |
| draft2019-09 | 435 | ✅ 435 | 19.6M | 131/435 | 473K | 131 | 🟢 **-98%** |
| draft2020-12 | 448 | ✅ 448 | 20.0M | 129/448 | 458K | 129 | 🟢 **-98%** |
| **Total** | 1671 | 1670/1671 | 20.7M | 542/1671 | 450K | 542 | 🟢 **-98%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **109.02x faster** (20 ns vs 2223 ns per test, 1591 tests in 542 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 64.6M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 174.6M | ✅ | 2.1M | 🟢 **-99%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 147.6M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 189.7M | ✅ | 3.5M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 129.1M | ✅ | 4.8M | 🟢 **-96%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 41.2M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.2M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 69.0M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 174.5M | ✅ | 4.7M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 51.9M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 47.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 37.0M | ✅ | 470K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 43.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 174.6M | ✅ | 747K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 37.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 52.3M | ✅ | 4.4M | 🟢 **-92%** |
| allOf.json | allOf | 4 | ✅ | 45.3M | ✅ | 107K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 25.5M | ✅ | 88K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 124.4M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 173.5M | ✅ | 1.4M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 72.8M | ✅ | 1.1M | 🟢 **-98%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.4M | ✅ | 439K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 124.6M | ✅ | 434K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.4M | ✅ | 295K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 64.2M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 49.4M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 53.2M | ✅ | 304K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 188.3M | ✅ | 979K | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 396K | 🟢 **-99%** |
| default.json | invalid type for default | 2 | ✅ | 108.2M | ✅ | 763K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 46.2M | ✅ | 932K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 84.6M | ✅ | 449K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.8M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 103.0M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 32.2M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 60.3M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.7M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 68.2M | ✅ | 532K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.8M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.3M | ✅ | 771K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 52.5M | ✅ | 352K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 56.3M | ✅ | 771K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 44.7M | ✅ | 461K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 24.7M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 113.7M | ✅ | 447K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 57.7M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 128.1M | ✅ | 835K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.1M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 125.6M | ✅ | 814K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.6M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 92.8M | ✅ | 591K | 🟢 **-99%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 54.8M | ✅ | 572K | 🟢 **-99%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.9M | ✅ | 595K | 🟢 **-99%** |
| format.json | email format | 6 | ✅ | 93.3M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 162.3M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 95.1M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 160.8M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 38.4M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 88.5M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.2M | ✅ | 280K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 72.6M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 68.0M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 35.0M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.5M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 83.6M | ✅ | 4.5M | 🟢 **-95%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 89.1M | ✅ | 4.6M | 🟢 **-95%** |
| maxItems.json | maxItems validation | 4 | ✅ | 71.6M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 63.8M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.1M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 45.8M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 81.7M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 74.5M | ❌ | - | - |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 75.9M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 64.2M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 79.8M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 58.2M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 58.4M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 75.2M | ❌ | - | - |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 73.7M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 64.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 68.5M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 71.2M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 63.3M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 61.4M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 45.6M | ✅ | 507K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 74.4M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 68.4M | ✅ | 353K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 61.5M | ✅ | 228K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 65.4M | ✅ | 284K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 50.3M | ✅ | 341K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 45.6M | ✅ | 347K | 🟢 **-99%** |
| not.json | double negation | 1 | ✅ | 174.6M | ✅ | 429K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 66.3M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.0M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.4M | ✅ | 226K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 64.3M | ✅ | 484K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 43.5M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 48.2M | ✅ | 245K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 68.6M | ✅ | 285K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 54.3M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 54.4M | ✅ | 4.4M | 🟢 **-92%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 27.5M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.4M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 12.8M | ✅ | 4.4M | 🟢 **-65%** |
| properties.json | object properties validation | 6 | ✅ | 50.2M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 47.5M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 73.8M | ✅ | 949K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.3M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.2M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 49.9M | ✅ | 447K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.0M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 43.0M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 38.6M | ✅ | 448K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 53.8M | ✅ | 599K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 67.2M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.1M | ✅ | 498K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 49.3M | ✅ | 501K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 70.3M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 54.9M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 52.5M | ✅ | 509K | 🟢 **-99%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 55.4M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 69.7M | ✅ | 455K | 🟢 **-99%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 69.0M | ✅ | 459K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 69.5M | ✅ | 453K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 50.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 50.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 42.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 42.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 36.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 54.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 68.8M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 175.6M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 39.9M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 23.7M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 53.3M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 60.0M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 59.7M | ✅ | 637K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 49.3M | ✅ | 483K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 54.7M | ✅ | 536K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 56.3M | ✅ | 606K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 51.9M | ✅ | 350K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 54.6M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 69.4M | ✅ | 542K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 58.1M | ✅ | 289K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 70.5M | ✅ | 295K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 156.9M | ✅ | 4.0M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 74.3M | ✅ | 4.0M | 🟢 **-95%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 74.4M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 90.3M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 94.6M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 52.7M | ✅ | 480K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 85.8M | ✅ | 3.9M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 49.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 84.6M | ✅ | 3.9M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 49.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 58.5M | ✅ | 545K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.1M | ✅ | 546K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.5M | ✅ | 546K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.5M | ✅ | 547K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.3M | ✅ | 432K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.2M | ✅ | 703K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 29.1M | ✅ | 544K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.8M | ✅ | 548K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.1M | ✅ | 944K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 385K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.4M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 21.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 22.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 16.6M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 40.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 17.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.9M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.7M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 62.0M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 44.6M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.1M | ✅ | 3.5M | 🟢 **-98%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 170.8M | ✅ | 3.8M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 4.9M | 🟢 **-94%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.2M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ✅ | 4.9M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 66.8M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 46.9M | ✅ | 474K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 140.4M | ✅ | 751K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 4.4M | 🟢 **-93%** |
| allOf.json | allOf | 4 | ✅ | 34.7M | ✅ | 48K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.5M | ✅ | 50K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 1.1M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 1.4M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.3M | ✅ | 1.1M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 433K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 427K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 296K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.3M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 50.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 1.8M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.4M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.8M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.6M | ✅ | 303K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.8M | ✅ | 999K | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 409K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.1M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 50.0M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 49.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 117.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 58.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 102.2M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.0M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.7M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 114.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.9M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.6M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 103.6M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 60.2M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 4.2M | 🟢 **-95%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 767K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ✅ | 922K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.0M | ✅ | 459K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.4M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 98.7M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.4M | ✅ | 4.3M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.9M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.0M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 85.1M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.7M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 51.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 540K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.1M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 67.0M | ✅ | 780K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 56.7M | ✅ | 357K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.4M | ✅ | 776K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.6M | ✅ | 465K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.1M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.7M | ✅ | 457K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.0M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 850K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.1M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 110.2M | ✅ | 824K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 60.5M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 603K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 113.4M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 81.0M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 162.8M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 88.4M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 163.4M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 88.4M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 163.6M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 86.5M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 158.1M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 88.5M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.2M | ✅ | 281K | 🟢 **-100%** |
| items.json | a schema given for items | 4 | ✅ | 56.0M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 105.7M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 172.0M | ✅ | 4.2M | 🟢 **-98%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 61.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 35.2M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.0M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 69.1M | ✅ | 4.5M | 🟢 **-94%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 4.3M | 🟢 **-95%** |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.8M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 49.9M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.9M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.6M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 68.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 62.1M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 72.2M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.4M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 50.8M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 55.0M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.4M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.1M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.7M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 69.4M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 61.8M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 519K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 1.9M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 352K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 55.9M | ✅ | 229K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 284K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 46.3M | ✅ | 340K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 354K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 48.9M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.6M | ✅ | 4.5M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 158.8M | ✅ | 426K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 49.1M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 18.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 362K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 40.9M | ✅ | 365K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 364K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.3M | ✅ | 225K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 488K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 35.2M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 22.1M | ✅ | 244K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 285K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 52.7M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.2M | ✅ | 4.5M | 🟢 **-91%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.0M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.8M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 4.5M | 🟢 **-74%** |
| properties.json | object properties validation | 6 | ✅ | 49.4M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.5M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 42.8M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 942K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 169.9M | ✅ | 4.5M | 🟢 **-97%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.7M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 40.2M | ✅ | 440K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 44.3M | ✅ | 445K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 48.7M | ✅ | 591K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 56.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 487K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 45.0M | ✅ | 490K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.4M | ✅ | 1.3M | 🟢 **-99%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 58.9M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.2M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 56.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 43.5M | ✅ | 394K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.2M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 31.0M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 45.1M | ✅ | 474K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 22.2M | ✅ | 473K | 🟢 **-98%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 39.1M | ✅ | 472K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.8M | ✅ | 469K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 43.7M | ✅ | 478K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 456K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 457K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 454K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 59.5M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 47.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 158.3M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 156.8M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 44.0M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 23.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.8M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 621K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 46.1M | ✅ | 476K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 51.0M | ✅ | 538K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 599K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 49.0M | ✅ | 345K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.2M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 527K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 295K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 62.2M | ✅ | 301K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.3M | ✅ | 4.0M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.2M | ✅ | 4.0M | 🟢 **-95%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 67.7M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 80.0M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.1M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 475K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.1M | ✅ | 3.9M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 76.6M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.1M | ✅ | 520K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.0M | ✅ | 521K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 518K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 514K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 405K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.7M | ✅ | 675K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.1M | ✅ | 516K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.8M | ✅ | 525K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.8M | ✅ | 893K | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.6M | ✅ | 360K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.9M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.0M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.1M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 43.0M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 43.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.1M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 59.6M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 40.2M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.1M | ✅ | 4.1M | 🟢 **-97%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.4M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 169.5M | ✅ | 4.7M | 🟢 **-97%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 4.8M | 🟢 **-94%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.8M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.4M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.3M | ✅ | 4.7M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 67.1M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.0M | ✅ | 478K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 751K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.8M | ✅ | 4.5M | 🟢 **-93%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 59K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 158.3M | ✅ | 1.8M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 61.7M | ✅ | 455K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 450K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 309K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.4M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 48.3M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.4M | ✅ | 1.8M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.0M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.7M | ✅ | 311K | 🟢 **-100%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.8M | ✅ | 431K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 179.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.5M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 50.0M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 49.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 117.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 60.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 107.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.0M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 88.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 114.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 103.8M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 64.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 127.0M | ✅ | 4.2M | 🟢 **-97%** |
| default.json | invalid type for default | 2 | ✅ | 62.5M | ✅ | 759K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 71.3M | ✅ | 919K | 🟢 **-99%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.4M | ✅ | 403K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.4M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 58.5M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.3M | ✅ | 4.2M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.9M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 40.3M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 25.9M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.6M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 60.6M | ✅ | 546K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.6M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.5M | ✅ | 795K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ✅ | 359K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 773K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 56.3M | ✅ | 469K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.2M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 58.0M | ✅ | 459K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 49.0M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 57.0M | ✅ | 845K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 52.0M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.1M | ✅ | 829K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 52.5M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 595K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.5M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 55.1M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 81.2M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 81.3M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 81.3M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 80.8M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 80.4M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 45.4M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 85.3M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 80.8M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 87.4M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 81.2M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 81.4M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 86.3M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 45.6M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 85.5M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 81.2M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 81.3M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 80.8M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.2M | ✅ | 4.3M | 🟢 **-97%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 167.9M | ✅ | 4.4M | 🟢 **-97%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ✅ | 4.4M | 🟢 **-97%** |
| if-then-else.json | if and then without else | 3 | ✅ | 69.6M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 63.8M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 56.5M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.4M | ✅ | 944K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.6M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.4M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.7M | ✅ | 292K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 60.1M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 65.5M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.4M | ✅ | 4.4M | 🟢 **-97%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 61.8M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.6M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.4M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 4.5M | 🟢 **-94%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 4.5M | 🟢 **-95%** |
| maxItems.json | maxItems validation | 4 | ✅ | 70.9M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 58.5M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.8M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.6M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.4M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.1M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.4M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 52.2M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 54.9M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 40.6M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.6M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 69.4M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 64.0M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 56.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 508K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 366K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 236K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 59.6M | ✅ | 293K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 360K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.1M | ✅ | 366K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.2M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 171.5M | ✅ | 4.5M | 🟢 **-97%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 438K | 🟢 **-100%** |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ✅ | 383K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 383K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 382K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.2M | ✅ | 234K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 520K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 44.1M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.4M | ✅ | 255K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 305K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 52.8M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 4.5M | 🟢 **-91%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.0M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.5M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.3M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 11.4M | ✅ | 4.5M | 🟢 **-61%** |
| properties.json | object properties validation | 6 | ✅ | 49.9M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.8M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 959K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.8M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.5M | ✅ | 4.4M | 🟢 **-97%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.5M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 42.4M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.5M | ✅ | 442K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 46.3M | ✅ | 470K | 🟢 **-99%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.0M | ✅ | 597K | 🟢 **-99%** |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 59.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 34.4M | ✅ | 493K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.5M | ✅ | 493K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 158.6M | ✅ | 1.7M | 🟢 **-99%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.1M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 43.9M | ✅ | 414K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 55.6M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.8M | ✅ | 485K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ✅ | 488K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.6M | ✅ | 486K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.6M | ✅ | 487K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ✅ | 486K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 48.3M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 59.7M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 58.2M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 482K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 483K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 484K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 58.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 45.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 45.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.0M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.2M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 159.3M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 44.3M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.8M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 55.0M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.8M | ✅ | 630K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 482K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 51.4M | ✅ | 534K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.9M | ✅ | 609K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 49.0M | ✅ | 354K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.2M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.0M | ✅ | 579K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 302K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 64.5M | ✅ | 311K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ✅ | 4.3M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.2M | ✅ | 4.2M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.4M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 47.4M | ✅ | 481K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 4.2M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.1M | ✅ | 4.1M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 348K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.0M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 428K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 492K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 25.4M | ✅ | 495K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.9M | ✅ | 495K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 492K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 382K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 650K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.0M | ✅ | 491K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.4M | ✅ | 491K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 852K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 334K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 20.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.8M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.1M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.4M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.2M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.1M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.2M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.8M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.2M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 51.9M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 52.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.9M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.0M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 68.9M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 43.7M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 157.7M | ✅ | 5.0M | 🟢 **-97%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.7M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.9M | ✅ | 4.2M | 🟢 **-98%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 4.3M | 🟢 **-95%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 46.6M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.6M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.7M | ✅ | 4.3M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.8M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 47.4M | ✅ | 482K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.6M | ✅ | 731K | 🟢 **-100%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 4.2M | 🟢 **-94%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.2M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.7M | ✅ | 400K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 34.8M | ✅ | 73K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 36.0M | ✅ | 57K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.1M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.0M | ✅ | 1.8M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.2M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 459K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 454K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 257K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.4M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 60.1M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 65.8M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.4M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 2.0M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.2M | ✅ | 1.9M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.7M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.1M | ✅ | 327K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.5M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 380K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 184.2M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 48.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 36.4M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 49.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.5M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 58.6M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 58.0M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.0M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 48.0M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 58.8M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 28.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.5M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.0M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 53.8M | ✅ | 4.3M | 🟢 **-92%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.3M | ✅ | 4.3M | 🟢 **-98%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 169.5M | ✅ | 3.7M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.0M | ✅ | 4.3M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 177.3M | ✅ | 4.4M | 🟢 **-98%** |
| default.json | invalid type for default | 2 | ✅ | 66.3M | ✅ | 771K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 50.2M | ✅ | 918K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.4M | ✅ | 465K | 🟢 **-99%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 175.2M | ✅ | 4.1M | 🟢 **-98%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 25.8M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 27.1M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.3M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.8M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.5M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.6M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 482K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.2M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.7M | ✅ | 667K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ✅ | 328K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 666K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 54.2M | ✅ | 385K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 53.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 57.6M | ✅ | 379K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 49.2M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 64.8M | ✅ | 709K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.7M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.3M | ✅ | 697K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.1M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 485K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 51.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 55.1M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 133.3M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 172.7M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 95.5M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 145.7M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 182.2M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 182.7M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 181.7M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 145.2M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 145.5M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 172.6M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 94.9M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 128.7M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 181.7M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 173.3M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 182.9M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 181.9M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 173.9M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 181.4M | ❌ | - | - |
| format.json | duration format | 6 | ✅ | 99.6M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ✅ | 4.2M | 🟢 **-98%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.6M | ✅ | 4.1M | 🟢 **-98%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.6M | ✅ | 4.1M | 🟢 **-98%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.3M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 69.4M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.2M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.6M | ✅ | 978K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.0M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.6M | ✅ | 300K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 59.3M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 65.2M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.7M | ✅ | 4.2M | 🟢 **-98%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 62.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.0M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.5M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 4.2M | 🟢 **-95%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 4.3M | 🟢 **-95%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.6M | ✅ | 4.3M | 🟢 **-98%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.9M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.0M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.1M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.1M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.5M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.8M | ✅ | 4.3M | 🟢 **-98%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 50.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.5M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.4M | ✅ | 4.3M | 🟢 **-98%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 66.1M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.4M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 55.2M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.2M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.1M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 69.4M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 64.3M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 517K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 369K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 235K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 293K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 356K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.8M | ✅ | 367K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.0M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.4M | ✅ | 4.3M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 159.5M | ✅ | 437K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.2M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.7M | ✅ | 385K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 381K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 385K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.9M | ✅ | 234K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 53.0M | ✅ | 519K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.1M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.4M | ✅ | 257K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.2M | ✅ | 272K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 52.6M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 4.1M | 🟢 **-91%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.7M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.1M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.8M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.5M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 4.2M | 🟢 **-76%** |
| properties.json | object properties validation | 6 | ✅ | 50.0M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.4M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.3M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 939K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.8M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 162.7M | ✅ | 4.1M | 🟢 **-97%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 19.8M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 37.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 14.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.0M | ✅ | 376K | 🟢 **-87%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 14.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.9M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.2M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.1M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.3M | ✅ | 431K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.3M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.5M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 45.9M | ✅ | 822K | 🟢 **-98%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 37.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.8M | ✅ | 484K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.9M | ✅ | 490K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.3M | ✅ | 4.0M | 🟢 **-97%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.5M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 46.9M | ✅ | 348K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.9M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 60.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 57.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.9M | ✅ | 484K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.9M | ✅ | 485K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.9M | ✅ | 485K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.9M | ✅ | 484K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.9M | ✅ | 484K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 60.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 60.3M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 60.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 55.0M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 56.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 842K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 837K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 474K | 🟢 **-99%** |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 60.0M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 59.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 47.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 60.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 60.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 60.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 48.8M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 60.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 56.5M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.6M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 159.3M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 19.7M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 633K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 478K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 51.0M | ✅ | 529K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 601K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.5M | ✅ | 289K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.3M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 564K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 287K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 67.1M | ✅ | 278K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.8M | ✅ | 3.8M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 57.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ✅ | 4.0M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 50.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 80.8M | ✅ | 4.0M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 45.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 45.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 24.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 84.0M | ✅ | 1.7M | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 22.0M | ✅ | 1.2M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 38.9M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 84.7M | ✅ | 4.1M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ✅ | 4.0M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.4M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 36.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 44.4M | ✅ | 2.6M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 35.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 65.4M | ✅ | 550K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 65.3M | ✅ | 303K | 🟢 **-100%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 33.0M | ✅ | 304K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 17.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 35.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 32.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.9M | ✅ | 296K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.0M | ✅ | 336K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.3M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.1M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 41.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.8M | ✅ | 132K | 🟢 **-99%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 78.1M | ✅ | 4.0M | 🟢 **-95%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.5M | ✅ | 4.0M | 🟢 **-92%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 13.6M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.8M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ✅ | 4.1M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.3M | ✅ | 4.0M | 🟢 **-95%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.8M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 43.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.3M | ✅ | 807K | 🟢 **-99%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 47.6M | ✅ | 475K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.5M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.1M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 28.8M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.5M | ✅ | 3.9M | 🟢 **-98%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 30.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 49.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 561K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.9M | ✅ | 561K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.6M | ✅ | 563K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 21.4M | ✅ | 559K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 443K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 716K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.0M | ✅ | 558K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.3M | ✅ | 561K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 948K | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 393K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.4M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.9M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.9M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.4M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.4M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.4M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.6M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.2M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.2M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.6M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.6M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.9M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.3M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.0M | ✅ | 493K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.4M | ✅ | 422K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.3M | ✅ | 751K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.4M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 28.0M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 53.6M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 31.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 45.1M | ✅ | 483K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 140.4M | ✅ | 728K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 23.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.6M | ✅ | 4.5M | 🟢 **-93%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 29.2M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.5M | ✅ | 350K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 34.3M | ✅ | 68K | 🟢 **-100%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.6M | ✅ | 48K | 🟢 **-100%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.8M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.3M | ✅ | 1.8M | 🟢 **-99%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 1.3M | 🟢 **-99%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 449K | 🟢 **-99%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 448K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 53.8M | ✅ | 300K | 🟢 **-99%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.1M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 55.7M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 62.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.7M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.6M | ✅ | 2.0M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 2.0M | 🟢 **-99%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.3M | ✅ | 313K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.7M | ✅ | 1.1M | 🟢 **-99%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 425K | 🟢 **-99%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 49.1M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 36.2M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 49.5M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 58.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 58.1M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.2M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.0M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 53.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.8M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 53.6M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 49.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 4.5M | 🟢 **-94%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.2M | ✅ | 4.4M | 🟢 **-98%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.0M | ✅ | 4.4M | 🟢 **-98%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.5M | ✅ | 4.6M | 🟢 **-97%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 182.8M | ✅ | 4.6M | 🟢 **-97%** |
| default.json | invalid type for default | 2 | ✅ | 67.4M | ✅ | 790K | 🟢 **-99%** |
| default.json | invalid string value for default | 2 | ✅ | 52.6M | ✅ | 949K | 🟢 **-98%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.3M | ✅ | 450K | 🟢 **-99%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.2M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 58.0M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 157.2M | ✅ | 4.5M | 🟢 **-97%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 25.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.0M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 48.6M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.9M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 40.6M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 21.6M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 16.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 14.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 11.1M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 17.6M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.6M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.8M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.9M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 10.0M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.0M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 10.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 28.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.4M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.8M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 56.2M | ✅ | 517K | 🟢 **-99%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 39.7M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.5M | ✅ | 744K | 🟢 **-99%** |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ✅ | 340K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 735K | 🟢 **-99%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 57.6M | ✅ | 439K | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 58.1M | ✅ | 433K | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.3M | ✅ | 799K | 🟢 **-99%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.8M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.3M | ✅ | 779K | 🟢 **-99%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 54.3M | ✅ | 565K | 🟢 **-99%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.5M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 59.5M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 176.3M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 175.8M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 183.1M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 175.2M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 182.5M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 178.0M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 182.7M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 182.5M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 183.5M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 183.2M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 182.1M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 182.6M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 183.6M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 184.0M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 176.3M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 182.4M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 182.0M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.5M | ✅ | 4.1M | 🟢 **-98%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.6M | ✅ | 4.2M | 🟢 **-98%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 170.3M | ✅ | 4.2M | 🟢 **-98%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 69.1M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.7M | ✅ | 960K | 🟢 **-99%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.7M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.7M | ✅ | 267K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 56.1M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.4M | ✅ | 4.1M | 🟢 **-98%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.0M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.4M | ❌ | - | - |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 76.7M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 46.7M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 45.3M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 63.5M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 77.1M | ✅ | 4.2M | 🟢 **-95%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 164.3M | ✅ | 4.1M | 🟢 **-97%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.9M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.7M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.9M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.8M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 42.6M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 63.0M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.7M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.4M | ✅ | 4.2M | 🟢 **-98%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.3M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.3M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.4M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 171.8M | ✅ | 4.2M | 🟢 **-98%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.9M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 54.9M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.0M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.4M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 65.5M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 63.3M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 467K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ✅ | 1.7M | 🟢 **-98%** |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 348K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 224K | 🟢 **-100%** |
| not.json | not more complex schema | 3 | ✅ | 58.1M | ✅ | 280K | 🟢 **-100%** |
| not.json | forbidden property | 2 | ✅ | 46.2M | ✅ | 348K | 🟢 **-99%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.0M | ✅ | 349K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.0M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.7M | ✅ | 4.1M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 157.1M | ✅ | 426K | 🟢 **-100%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.3M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 347K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 155.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 347K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 351K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.7M | ✅ | 214K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 484K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 41.2M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ✅ | 237K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 277K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 52.8M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 4.0M | 🟢 **-92%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.9M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.2M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.1M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 4.0M | 🟢 **-78%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.5M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 60.5M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 83.0M | ✅ | 4.0M | 🟢 **-95%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 83.0M | ✅ | 4.0M | 🟢 **-95%** |
| properties.json | object properties validation | 6 | ✅ | 49.7M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.7M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 909K | 🟢 **-99%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.8M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.8M | ✅ | 4.0M | 🟢 **-98%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.7M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ✅ | 399K | 🟢 **-99%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.5M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 47.2M | ✅ | 723K | 🟢 **-98%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 38.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 455K | 🟢 **-99%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.7M | ✅ | 457K | 🟢 **-99%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.6M | ✅ | 4.0M | 🟢 **-97%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.1M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.1M | ✅ | 376K | 🟢 **-99%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 56.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 55.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 32.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.2M | ✅ | 452K | 🟢 **-99%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.6M | ✅ | 457K | 🟢 **-99%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ✅ | 462K | 🟢 **-99%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 44.8M | ✅ | 463K | 🟢 **-99%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.6M | ✅ | 462K | 🟢 **-99%** |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 58.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 57.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 58.9M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 58.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 58.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 796K | 🟢 **-99%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 795K | 🟢 **-99%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ✅ | 455K | 🟢 **-99%** |
| refRemote.json | remote ref | 2 | ✅ | 58.8M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 57.5M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 58.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 56.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 47.2M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 54.9M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 58.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 59.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 46.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 56.2M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.0M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with empty array | 1 | ✅ | 159.6M | ✅ | 1.1M | 🟢 **-99%** |
| required.json | required with escaped characters | 2 | ✅ | 44.0M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.8M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 611K | 🟢 **-99%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 458K | 🟢 **-99%** |
| type.json | array type matches arrays | 7 | ✅ | 51.4M | ✅ | 513K | 🟢 **-99%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 588K | 🟢 **-99%** |
| type.json | null type matches only the null object | 10 | ✅ | 49.1M | ✅ | 345K | 🟢 **-99%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.1M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 558K | 🟢 **-99%** |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 291K | 🟢 **-99%** |
| type.json | type: array, object or null | 5 | ✅ | 65.5M | ✅ | 291K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.0M | ✅ | 4.0M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 57.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ✅ | 4.0M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 49.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 80.9M | ✅ | 4.0M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 84.0M | ✅ | 1.7M | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.0M | ✅ | 1.2M | 🟢 **-94%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 53.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 92.8M | ✅ | 4.1M | 🟢 **-96%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ✅ | 4.1M | 🟢 **-95%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 36.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.3M | ✅ | 4.0M | 🟢 **-93%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 33.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 34.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 14.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 171.6M | ✅ | 4.0M | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 34.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.6M | ✅ | 340K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.9M | ✅ | 342K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 29.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.9M | ✅ | 342K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.7M | ✅ | 543K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 41.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.7M | ✅ | 132K | 🟢 **-99%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.2M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 71.8M | ✅ | 4.1M | 🟢 **-94%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.6M | ✅ | 4.1M | 🟢 **-92%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.2M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 29.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 40.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.5M | ✅ | 4.2M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 75.9M | ✅ | 4.2M | 🟢 **-95%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.5M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.7M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.3M | ✅ | 795K | 🟢 **-99%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 47.6M | ✅ | 459K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 76.6M | ✅ | 4.1M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.1M | ✅ | 4.0M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 87.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 176.4M | ✅ | 3.9M | 🟢 **-98%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 30.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 42.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.7M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 52.2M | ✅ | 506K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.0M | ✅ | 503K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.3M | ✅ | 499K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 502K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.7M | ✅ | 393K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 653K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.5M | ✅ | 504K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 25.4M | ✅ | 504K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.1M | ✅ | 864K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.5M | ✅ | 348K | 🟢 **-99%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.3M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.3M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.1M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 40.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.6M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.5M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.3M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.8M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.9M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 33.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.3M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.0M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 23.1M | ✅ | 530K | 🟢 **-98%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.6M | ✅ | 538K | 🟢 **-97%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.1M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 59.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.5M | ✅ | 482K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.5M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.3M | ✅ | 420K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.2M | ✅ | 718K | 🟢 **-99%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.6M | ❌ | - | - |
