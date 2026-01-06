# tjs vs z-schema Benchmarks

Performance comparison of **tjs** vs **[z-schema](https://github.com/zaggino/z-schema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | z-schema pass | z-schema ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 25.0M | 169/199 | 843K | 169 | 🟢 **-97%** |
| draft6 | 276 | ✅ 276 | 29.2M | 0/276 | - | 0 | - |
| draft7 | 313 | ✅ 313 | 15.4M | 0/313 | - | 0 | - |
| draft2019-09 | 435 | ✅ 435 | 17.8M | 28/435 | 669K | 28 | 🟢 **-96%** |
| draft2020-12 | 448 | ✅ 448 | 18.3M | 28/448 | 690K | 28 | 🟢 **-96%** |
| **Total** | 1671 | 1670/1671 | 19.2M | 225/1671 | 817K | 225 | 🟢 **-96%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **40.18x faster** (30 ns vs 1225 ns per test, 803 tests in 225 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.1M | ✅ | 647K | 🟢 **-91%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 69.7M | ✅ | 1.6M | 🟢 **-98%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 132.0M | ✅ | 1.8M | 🟢 **-99%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 71.2M | ✅ | 3.5M | 🟢 **-95%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.5M | ✅ | 2.2M | 🟢 **-98%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 39.8M | ✅ | 367K | 🟢 **-99%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 59.3M | ✅ | 659K | 🟢 **-99%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 57.8M | ✅ | 1.4M | 🟢 **-98%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 152.7M | ✅ | 3.9M | 🟢 **-97%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 35.2M | ✅ | 1.1M | 🟢 **-97%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 24.1M | ✅ | 788K | 🟢 **-97%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 32.0M | ✅ | 714K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 44.3M | ✅ | 738K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 69.7M | ✅ | 1.3M | 🟢 **-98%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 33.7M | ✅ | 383K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 44.6M | ✅ | 1.8M | 🟢 **-96%** |
| allOf.json | allOf | 4 | ✅ | 47.7M | ✅ | 459K | 🟢 **-99%** |
| allOf.json | allOf with base schema | 5 | ✅ | 24.6M | ✅ | 385K | 🟢 **-98%** |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ✅ | 1.2M | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 65.3M | ✅ | 3.3M | 🟢 **-95%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.9M | ✅ | 2.7M | 🟢 **-98%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 61.1M | ✅ | 965K | 🟢 **-98%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 971K | 🟢 **-99%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.5M | ✅ | 939K | 🟢 **-98%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 336K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 62.3M | ✅ | 656K | 🟢 **-99%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.7M | ✅ | 571K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.5M | ✅ | 384K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.5M | ✅ | 2.7M | 🟢 **-98%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 61.8M | ✅ | 629K | 🟢 **-99%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 2.2M | 🟢 **-98%** |
| default.json | invalid string value for default | 2 | ✅ | 46.4M | ✅ | 1.9M | 🟢 **-96%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.2M | ✅ | 885K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.9M | ✅ | 125K | 🟢 **-99%** |
| dependencies.json | dependencies | 7 | ✅ | 91.7M | ✅ | 1.7M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.8M | ✅ | 821K | 🟢 **-97%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 57.5M | ✅ | 450K | 🟢 **-99%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.1M | ✅ | 712K | 🟢 **-94%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 33.4M | ✅ | 771K | 🟢 **-98%** |
| enum.json | simple enum validation | 2 | ✅ | 54.4M | ✅ | 1.7M | 🟢 **-97%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.4M | ✅ | 817K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 52.3M | ✅ | 2.2M | 🟢 **-96%** |
| enum.json | enums in properties | 6 | ✅ | 15.0M | ✅ | 651K | 🟢 **-96%** |
| enum.json | enum with escaped characters | 3 | ✅ | 46.2M | ✅ | 2.1M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 98.8M | ✅ | 1.2M | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 60.6M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 1.2M | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.0M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 113.6M | ✅ | 2.3M | 🟢 **-98%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 51.5M | ✅ | 1.5M | 🟢 **-97%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 2.3M | 🟢 **-98%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 51.7M | ✅ | 1.7M | 🟢 **-97%** |
| enum.json | nul characters in strings | 2 | ✅ | 90.5M | ✅ | 2.0M | 🟢 **-98%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 48.7M | ✅ | 1.9M | 🟢 **-96%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 1.9M | 🟢 **-98%** |
| format.json | email format | 6 | ✅ | 64.4M | ✅ | 3.6M | 🟢 **-94%** |
| format.json | ipv4 format | 6 | ✅ | 163.0M | ✅ | 3.2M | 🟢 **-98%** |
| format.json | ipv6 format | 6 | ✅ | 65.2M | ✅ | 3.2M | 🟢 **-95%** |
| format.json | hostname format | 6 | ✅ | 161.1M | ✅ | 3.1M | 🟢 **-98%** |
| format.json | date-time format | 6 | ✅ | 65.5M | ✅ | 3.2M | 🟢 **-95%** |
| format.json | uri format | 6 | ✅ | 163.0M | ✅ | 3.1M | 🟢 **-98%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.3M | ✅ | 355K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 38.8M | ✅ | 977K | 🟢 **-97%** |
| items.json | an array of schemas for items | 6 | ✅ | 55.2M | ✅ | 938K | 🟢 **-98%** |
| items.json | items and subitems | 6 | ✅ | 28.6M | ✅ | 239K | 🟢 **-99%** |
| items.json | nested items | 3 | ✅ | 11.7M | ✅ | 134K | 🟢 **-99%** |
| items.json | items with null instance elements | 1 | ✅ | 60.8M | ✅ | 2.1M | 🟢 **-96%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 64.2M | ✅ | 2.2M | 🟢 **-97%** |
| maxItems.json | maxItems validation | 4 | ✅ | 59.9M | ✅ | 1.8M | 🟢 **-97%** |
| maxLength.json | maxLength validation | 5 | ✅ | 48.7M | ✅ | 2.0M | 🟢 **-96%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 47.9M | ✅ | 1.6M | 🟢 **-97%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 38.8M | ✅ | 1.0M | 🟢 **-97%** |
| maximum.json | maximum validation | 4 | ✅ | 57.1M | ✅ | 1.5M | 🟢 **-97%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 56.4M | ✅ | 1.6M | 🟢 **-97%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 57.7M | ✅ | 1.4M | 🟢 **-98%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 57.2M | ✅ | 1.6M | 🟢 **-97%** |
| minItems.json | minItems validation | 4 | ✅ | 58.0M | ✅ | 1.7M | 🟢 **-97%** |
| minLength.json | minLength validation | 5 | ✅ | 45.2M | ✅ | 1.5M | 🟢 **-97%** |
| minProperties.json | minProperties validation | 6 | ✅ | 49.4M | ✅ | 1.9M | 🟢 **-96%** |
| minimum.json | minimum validation | 4 | ✅ | 58.4M | ✅ | 1.6M | 🟢 **-97%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 59.3M | ✅ | 1.4M | 🟢 **-98%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 52.5M | ✅ | 1.4M | 🟢 **-97%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 58.7M | ✅ | 1.8M | 🟢 **-97%** |
| multipleOf.json | by int | 3 | ✅ | 60.4M | ✅ | 1.3M | 🟢 **-98%** |
| multipleOf.json | by number | 3 | ✅ | 54.7M | ✅ | 1.2M | 🟢 **-98%** |
| multipleOf.json | by small number | 2 | ✅ | 54.3M | ✅ | 1.2M | 🟢 **-98%** |
| multipleOf.json | float division = inf | 1 | ✅ | 44.9M | ✅ | 779K | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 58.9M | ✅ | 2.0M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 61.1M | ✅ | 803K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 57.0M | ✅ | 867K | 🟢 **-98%** |
| not.json | not more complex schema | 3 | ✅ | 53.4M | ✅ | 530K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 44.2M | ✅ | 877K | 🟢 **-98%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.9M | ✅ | 1.1M | 🟢 **-98%** |
| not.json | double negation | 1 | ✅ | 69.6M | ✅ | 1.3M | 🟢 **-98%** |
| oneOf.json | oneOf | 4 | ✅ | 57.4M | ✅ | 468K | 🟢 **-99%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.2M | ✅ | 564K | 🟢 **-98%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 38.7M | ✅ | 305K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 60.3M | ✅ | 730K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 42.0M | ✅ | 372K | 🟢 **-99%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 42.4M | ✅ | 369K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 60.3M | ✅ | 623K | 🟢 **-99%** |
| pattern.json | pattern validation | 8 | ✅ | 47.3M | ✅ | 2.2M | 🟢 **-95%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 12.9M | ✅ | 2.6M | 🟢 **-80%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.9M | ✅ | 745K | 🟢 **-97%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.7M | ✅ | 441K | 🟢 **-97%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.0M | ✅ | 635K | 🟢 **-96%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 15.9M | ✅ | 1.3M | 🟢 **-92%** |
| properties.json | object properties validation | 6 | ✅ | 46.3M | ✅ | 742K | 🟢 **-98%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.2M | ✅ | 577K | 🟢 **-97%** |
| properties.json | properties with escaped characters | 2 | ✅ | 43.3M | ✅ | 186K | 🟢 **-100%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 57.3M | ✅ | 1.7M | 🟢 **-97%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.7M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.6M | ✅ | 774K | 🟢 **-97%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 44.4M | ✅ | 727K | 🟢 **-98%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 47.1M | ✅ | 675K | 🟢 **-99%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.8M | ✅ | 700K | 🟢 **-98%** |
| ref.json | nested refs | 2 | ✅ | 35.1M | ✅ | 905K | 🟢 **-97%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 44.2M | ✅ | 860K | 🟢 **-98%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 61.4M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 21.1M | ✅ | 327K | 🟢 **-98%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.2M | ✅ | 736K | 🟢 **-98%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 43.9M | ✅ | 704K | 🟢 **-98%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 44.2M | ✅ | 706K | 🟢 **-98%** |
| ref.json | Location-independent identifier | 2 | ✅ | 61.1M | ✅ | 877K | 🟢 **-99%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 43.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 44.0M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 60.0M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 61.3M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 56.6M | ✅ | 902K | 🟢 **-98%** |
| refRemote.json | remote ref | 2 | ✅ | 43.7M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 42.5M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 42.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 35.3M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 42.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 53.1M | ✅ | 1.6M | 🟢 **-97%** |
| required.json | required default validation | 1 | ✅ | 69.8M | ✅ | 3.1M | 🟢 **-96%** |
| required.json | required with escaped characters | 2 | ✅ | 43.5M | ✅ | 576K | 🟢 **-99%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.4M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 49.3M | ✅ | 860K | 🟢 **-98%** |
| type.json | number type matches numbers | 9 | ✅ | 52.6M | ✅ | 1.0M | 🟢 **-98%** |
| type.json | string type matches strings | 9 | ✅ | 67.1M | ✅ | 1.0M | 🟢 **-98%** |
| type.json | object type matches objects | 7 | ✅ | 48.4M | ✅ | 925K | 🟢 **-98%** |
| type.json | array type matches arrays | 7 | ✅ | 52.2M | ✅ | 909K | 🟢 **-98%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.4M | ✅ | 953K | 🟢 **-98%** |
| type.json | null type matches only the null object | 10 | ✅ | 50.6M | ✅ | 841K | 🟢 **-98%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.6M | ✅ | 821K | 🟢 **-98%** |
| type.json | type as array with one item | 2 | ✅ | 60.8M | ✅ | 1.0M | 🟢 **-98%** |
| type.json | type: array or object | 5 | ✅ | 53.5M | ✅ | 841K | 🟢 **-98%** |
| type.json | type: array, object or null | 5 | ✅ | 56.5M | ✅ | 1.2M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ✅ | 1.5M | 🟢 **-91%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.1M | ✅ | 701K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.1M | ✅ | 701K | 🟢 **-96%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 67.2M | ✅ | 3.7M | 🟢 **-94%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 57.6M | ✅ | 1.3M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 53.9M | ✅ | 1.1M | 🟢 **-98%** |
| optional/bignum.json | integer | 2 | ✅ | 67.7M | ✅ | 2.6M | 🟢 **-96%** |
| optional/bignum.json | number | 2 | ✅ | 68.6M | ✅ | 2.6M | 🟢 **-96%** |
| optional/bignum.json | string | 1 | ✅ | 50.4M | ✅ | 1.0M | 🟢 **-98%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 62.9M | ✅ | 3.6M | 🟢 **-94%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.0M | ✅ | 851K | 🟢 **-98%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 63.4M | ✅ | 3.7M | 🟢 **-94%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 50.1M | ✅ | 876K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 24.5M | ✅ | 814K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 26.8M | ✅ | 825K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.4M | ✅ | 822K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.9M | ✅ | 818K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.0M | ✅ | 741K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.3M | ✅ | 1.0M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.5M | ✅ | 809K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.2M | ✅ | 818K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.1M | ✅ | 1.4M | 🟢 **-94%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.3M | ✅ | 674K | 🟢 **-98%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.7M | ✅ | 802K | 🟢 **-95%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ✅ | 907K | 🟢 **-94%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 25.6M | ✅ | 807K | 🟢 **-97%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 18.9M | ✅ | 642K | 🟢 **-97%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 16.7M | ✅ | 665K | 🟢 **-96%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.3M | ✅ | 649K | 🟢 **-91%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.3M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.0M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.7M | ✅ | 415K | 🟢 **-98%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ✅ | 1.0M | 🟢 **-90%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.6M | ✅ | 1.2M | 🟢 **-97%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 68.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 31.1M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.8M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 22.6M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.8M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 39.2M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.4M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 39.0M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.2M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 80.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.2M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 33.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 39.9M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 31.1M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 59.3M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 90.0M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 75.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 151.6M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 81.0M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 117.8M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 77.1M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 119.8M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 61.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 128.3M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.6M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 152.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 89.9M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 50.3M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.6M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 78.7M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 164.3M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 64.6M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 98.2M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 39.7M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 72.4M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 39.6M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 111.6M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 72.0M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 96.3M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 63.9M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 88.9M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 59.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 97.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 72.5M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 95.3M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 70.0M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 91.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 58.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 81.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 53.7M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 83.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 71.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 106.6M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 41.6M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 71.6M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 74.5M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.7M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 65.2M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 95.9M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.6M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 41.9M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 61.4M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.4M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.7M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 74.8M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 79.9M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.1M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.6M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.0M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 66.0M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.1M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 73.7M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 68.5M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.0M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 91.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 92.2M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 92.7M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 92.1M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 92.5M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 92.6M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 92.6M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 92.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 88.4M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.5M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 54.6M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 68.1M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 65.3M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 25.8M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.2M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 78.2M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.3M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 57.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.9M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.8M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 78.6M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 75.6M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 75.3M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.7M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 58.1M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.5M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.8M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 76.9M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.3M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.6M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.3M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 71.2M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 69.0M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 54.6M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 64.7M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.3M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.3M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 89.9M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.2M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 75.5M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 47.0M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.1M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 56.1M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.9M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.6M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.7M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.6M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 55.7M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.1M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 49.2M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 50.6M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.8M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.7M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.3M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 55.5M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.9M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.6M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 38.7M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.9M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 54.3M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.8M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.9M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 50.1M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 51.3M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.3M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 54.9M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 55.0M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.2M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 52.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.9M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 50.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 44.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 26.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.6M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 43.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 38.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 65.0M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 90.0M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 90.0M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 54.3M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.3M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.4M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 69.2M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 58.8M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 64.7M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 66.1M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.4M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 72.3M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 77.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 16.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 36.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.1M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.7M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.9M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 93.3M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.0M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.5M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.5M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 29.9M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 47.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.8M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.7M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.5M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.8M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 80.6M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.2M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 52.4M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.2M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.3M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 151.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.2M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 38.7M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.3M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 65.5M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.2M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.9M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.0M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 80.4M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.5M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.3M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 65.6M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.2M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 89.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 67.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.3M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 74.6M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 110.5M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.5M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.4M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 109.0M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 67.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.2M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 63.6M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 111.0M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 61.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 53.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 35.2M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 26.7M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 124.3M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 74.5M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 51.2M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.6M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 63.7M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 95.9M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 34.1M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 45.8M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 56.2M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.3M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 36.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 75.3M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.6M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 70.0M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 14.2M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 74.1M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 75.0M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.3M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.7M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 56.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 70.6M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 33.2M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.7M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 63.1M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 64.8M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 86.9M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 83.7M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 90.3M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 83.6M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 82.8M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 83.3M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 90.1M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 46.0M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 87.5M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 82.4M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 83.1M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 83.7M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 78.9M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 83.8M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 83.7M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 87.0M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 79.3M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 93.8M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.8M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.2M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 77.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 75.9M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.3M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 41.3M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 52.7M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 68.1M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 84.0M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 64.7M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 25.7M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.0M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 78.8M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.1M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.8M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.9M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 78.6M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 74.9M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 79.3M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.6M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.4M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.5M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 83.4M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.9M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.7M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.5M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 71.0M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 69.0M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 53.0M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.3M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.4M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.1M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 90.0M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 67.1M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 34.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 89.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 65.6M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 36.8M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.1M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 58.3M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.9M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.1M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 56.0M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.5M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.4M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 54.2M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.6M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 46.8M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.0M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.1M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.4M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.1M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.0M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 55.0M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.2M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 36.8M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 52.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 51.8M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 53.0M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 48.2M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 45.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.2M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.6M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 53.8M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 52.1M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.9M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.1M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 46.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 33.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 41.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 37.2M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 45.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 36.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.7M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 90.0M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 89.6M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 52.4M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.7M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 66.5M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 68.8M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 69.0M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 58.8M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 64.6M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 65.0M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 61.1M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 76.7M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 72.1M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 76.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.9M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 356K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 21.6M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 428K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 29.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 34.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 26.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.3M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.8M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.0M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.7M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.7M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 74.2M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 41.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 95.8M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.2M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.6M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 59.4M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 59.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.0M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.3M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 47.9M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 32.6M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 132.2M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 59.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 157.5M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 65.0M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 37.8M | ✅ | 504K | 🟢 **-99%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 33.0M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 113.2M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 69.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 44.5M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 19.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 37.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 27.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 165.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 21.2M | ✅ | 568K | 🟢 **-97%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 73.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 22.9M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 23.4M | ✅ | 536K | 🟢 **-98%** |
| allOf.json | allOf | 4 | ✅ | 30.7M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 26.6M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 62.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 161.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 57.6M | ✅ | 711K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 101.8M | ✅ | 704K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 69.3M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 166.4M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 63.6M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 121.8M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 63.7M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 85.5M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 63.0M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 68.4M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 32.0M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 63.8M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 63.5M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 34.6M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 71.4M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 71.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 57.9M | ✅ | 678K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 44.4M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 69.8M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 63.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 63.7M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 55.2M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 57.9M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 37.6M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 50.8M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 63.6M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 60.5M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 60.3M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 53.3M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 53.7M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 54.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 55.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 54.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 63.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 58.9M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 56.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 42.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.9M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 54.9M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 54.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 48.9M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 58.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 32.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 48.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 64.8M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 76.1M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 75.3M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 69.1M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 62.5M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 60.4M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 42.3M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 34.3M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.5M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 49.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 73.8M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.2M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 36.8M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 41.2M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 43.4M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 31.9M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 28.6M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 60.8M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 41.4M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 55.6M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 13.6M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 65.1M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 54.0M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 51.9M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 59.8M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 52.8M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 59.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 54.1M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 61.5M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 51.7M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 43.5M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 53.8M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 58.8M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 70.5M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 70.6M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 63.8M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 61.6M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 62.6M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 63.0M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 63.2M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 61.7M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 61.4M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 59.8M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 64.0M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 63.8M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 63.8M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 63.6M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 61.6M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 63.9M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 63.9M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 64.0M | ❌ | - | - |
| format.json | duration format | 6 | ✅ | 63.5M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 69.7M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 69.6M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 69.4M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 64.8M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 63.1M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 59.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 69.9M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 61.6M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 62.6M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 38.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 31.9M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 44.0M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 50.9M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 76.5M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 59.9M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 46.0M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 13.5M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 10.9M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 62.1M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 65.4M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 75.7M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 50.0M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 56.1M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 52.3M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 64.6M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 61.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 52.2M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 50.1M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 45.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 40.8M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.1M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 63.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 63.8M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 76.2M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 56.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 52.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 57.0M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 52.6M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 47.1M | ✅ | 644K | 🟢 **-99%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 76.7M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 59.9M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 63.7M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 61.9M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 50.9M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.8M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 52.1M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.3M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 63.4M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 60.2M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 63.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 60.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 53.0M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 47.8M | ✅ | 695K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 59.4M | ❌ | - | - |
| not.json | not | 2 | ✅ | 63.7M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 57.7M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 56.9M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 40.1M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 54.4M | ✅ | 703K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 55.7M | ✅ | 740K | 🟢 **-99%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 71.9M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 72.0M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 30.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 55.2M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.8M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 53.9M | ✅ | 680K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 71.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 56.7M | ✅ | 674K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 56.0M | ✅ | 674K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.7M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 63.4M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 42.2M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 41.8M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 63.3M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 48.7M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.1M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.9M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 12.8M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 13.7M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 17.8M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.3M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 42.7M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 16.1M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 36.9M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 38.8M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 54.1M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 33.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 17.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 76.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 32.0M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 34.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 10.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.3M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 9.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 9.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.1M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.1M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 19.3M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 39.1M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 40.7M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 36.1M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 25.8M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 33.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 2.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 38.7M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 39.6M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 71.8M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 57.3M | ✅ | 652K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 38.8M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 19.8M | ✅ | 559K | 🟢 **-97%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 50.1M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 25.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 25.3M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 30.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 31.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 62.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 26.7M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 36.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 38.6M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 38.5M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 36.4M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 37.6M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 36.5M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 36.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 31.1M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 31.5M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 31.9M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 30.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 30.8M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 63.6M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 63.6M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 61.0M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.4M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 31.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 31.1M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 31.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 31.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 25.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 25.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 30.6M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 20.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 29.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 29.7M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 34.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 31.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 30.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 26.8M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 30.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 51.0M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 71.2M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 71.7M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 38.3M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 22.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 54.6M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 57.0M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 57.3M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 48.6M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 52.6M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 55.0M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 50.5M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.4M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 54.4M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 61.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 69.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 41.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 41.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 60.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 39.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 64.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 33.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 31.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 37.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 67.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 13.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 28.3M | ✅ | 529K | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 42.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 37.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 34.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 32.4M | ✅ | 590K | 🟢 **-98%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 60.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 64.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 29.5M | ✅ | 570K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 50.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 27.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 28.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 59.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 59.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 31.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 16.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 19.2M | ✅ | 481K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 15.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 14.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 23.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 24.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 24.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 2.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 20.4M | ✅ | 582K | 🟢 **-97%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 20.9M | ✅ | 584K | 🟢 **-97%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.0M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 20.0M | ✅ | 553K | 🟢 **-97%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 24.0M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 16.0M | ✅ | 529K | 🟢 **-97%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 10.4M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 22.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 24.4M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 36.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 16.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.3M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 63.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 45.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 22.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 17.3M | ✅ | 570K | 🟢 **-97%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 69.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 58.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 54.0M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 41.9M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 61.1M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 68.9M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 71.3M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 55.8M | ✅ | 737K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 64.4M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 51.5M | ✅ | 737K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 64.1M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 51.5M | ✅ | 733K | 🟢 **-99%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 22.5M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 60.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 49.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 76.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 28.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 37.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 42.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 47.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 32.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 34.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.0M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 6.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.2M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.4M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 38.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.7M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 34.9M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.2M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.9M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.2M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 60.7M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 33.5M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 70.6M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.1M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.6M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.9M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.8M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 26.8M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 53.8M | ✅ | 2.6M | 🟢 **-95%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 39.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 37.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 37.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 39.0M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 8.5M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 32.4M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 19.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 39.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 27.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 162.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 21.3M | ✅ | 583K | 🟢 **-97%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 73.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 23.3M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 22.8M | ✅ | 549K | 🟢 **-98%** |
| allOf.json | allOf | 4 | ✅ | 31.9M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 24.2M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 25.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 164.3M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 63.5M | ✅ | 729K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 101.6M | ✅ | 716K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 75.3M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 161.5M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 56.4M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 128.1M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 53.5M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 86.3M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 66.5M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 19.4M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 31.8M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 26.5M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 65.5M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.9M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 81.3M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.0M | ✅ | 685K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.3M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 76.0M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 70.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 75.9M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 59.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 59.0M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 37.7M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 49.3M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 70.6M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 66.5M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 65.8M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 55.2M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 55.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 58.2M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 56.8M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 58.2M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 66.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 59.9M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.6M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 58.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 53.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 61.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.3M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 52.2M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 24.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 56.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 32.5M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 62.5M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 28.1M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 80.6M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 84.7M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 75.1M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 68.2M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 66.0M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 51.5M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 43.8M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.8M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 52.8M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 85.3M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.1M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 39.3M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 43.4M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.3M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 31.6M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 29.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 11.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 14.3M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 12.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 9.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 13.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 9.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 5.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 12.6M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 4.5M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 4.9M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 4.7M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 6.6M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 5.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 6.8M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 19.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 5.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 69.1M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.4M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.7M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 14.2M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 70.4M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 66.9M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 58.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 66.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 58.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 69.8M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 61.8M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 68.9M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 60.8M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 58.1M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 63.7M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 64.7M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 75.8M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 77.3M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 69.3M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 69.1M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 62.6M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 69.0M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 68.7M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 69.0M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 68.9M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 68.1M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 62.9M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 68.9M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 69.1M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 62.6M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 69.1M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 69.0M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 69.0M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 68.6M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 69.2M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 76.0M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 75.9M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 74.8M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 67.7M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 70.4M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 66.2M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 67.0M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 69.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.7M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 33.5M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 45.5M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 84.8M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 64.5M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 13.3M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.2M | ❌ | - | - |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 72.5M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 35.3M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 34.1M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 68.4M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 71.0M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 85.7M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 54.0M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.7M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 57.3M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 72.5M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 68.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 53.2M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 51.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.7M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.1M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 70.4M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 70.0M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 84.2M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 60.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 56.9M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 59.6M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 53.7M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 53.6M | ✅ | 659K | 🟢 **-99%** |
| minContains.json | minContains = 0 | 2 | ✅ | 85.2M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 67.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 72.2M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 67.8M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 52.9M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 53.6M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 53.6M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 46.4M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.8M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.8M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 72.0M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 63.5M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 59.3M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 49.1M | ✅ | 699K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 64.3M | ❌ | - | - |
| not.json | not | 2 | ✅ | 70.0M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 62.8M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 60.5M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 40.6M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.1M | ✅ | 723K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.1M | ✅ | 746K | 🟢 **-99%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 78.0M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 77.1M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 32.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 60.2M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 31.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 61.1M | ✅ | 698K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 81.3M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.6M | ✅ | 694K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 61.2M | ✅ | 690K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.7M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.2M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 43.7M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.0M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.6M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 52.8M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 26.3M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.2M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.8M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.5M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 18.3M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.8M | ❌ | - | - |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 54.7M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 47.8M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 73.7M | ❌ | - | - |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 73.8M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 45.0M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.4M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 39.6M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 38.3M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.2M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 36.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.8M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 85.4M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 46.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 34.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 35.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 19.8M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 39.2M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 42.2M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 37.7M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 26.6M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 35.4M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 2.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 40.8M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 40.1M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 77.2M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.5M | ✅ | 659K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 7.1M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 39.6M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 19.3M | ✅ | 562K | 🟢 **-97%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.4M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 23.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 24.4M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 32.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 32.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 69.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 26.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 39.2M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 39.0M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 39.3M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 37.1M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 37.3M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 34.3M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 37.2M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 30.7M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 31.3M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 32.2M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 32.5M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 31.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.1M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 66.0M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 31.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 30.6M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 30.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 23.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 24.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 20.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 29.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 35.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 31.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 26.1M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 31.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 54.2M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 81.3M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 81.0M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 40.7M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 23.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 59.9M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 60.6M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 60.2M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 51.2M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 56.4M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 58.1M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 59.4M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 58.7M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 70.5M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 60.6M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 65.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 75.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 42.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 43.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 65.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 38.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 67.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 34.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 39.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 74.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 13.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 28.3M | ✅ | 527K | 🟢 **-98%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 10.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 41.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 35.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 36.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 30.3M | ✅ | 609K | 🟢 **-98%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 20.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 17.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 7.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 9.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 16.3M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 74.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 70.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 17.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 27.3M | ✅ | 574K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 55.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 29.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 29.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 27.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 10.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 84.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 28.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 24.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 8.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 64.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 13.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 15.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 18.8M | ✅ | 504K | 🟢 **-97%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 15.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 13.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 22.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 27.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 8.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 20.1M | ✅ | 601K | 🟢 **-97%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 20.8M | ✅ | 600K | 🟢 **-97%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.7M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.6M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 19.9M | ✅ | 584K | 🟢 **-97%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 23.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 16.2M | ✅ | 570K | 🟢 **-96%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 23.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 26.2M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 43.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 15.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.3M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 74.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 47.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 23.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 11.5M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 18.3M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 18.6M | ✅ | 574K | 🟢 **-97%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 15.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 41.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 75.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 62.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.5M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 41.8M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 70.4M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 56.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 76.3M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 79.7M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 59.6M | ✅ | 739K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.4M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.6M | ✅ | 753K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.3M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 56.2M | ✅ | 750K | 🟢 **-99%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 73.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 85.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 29.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 39.1M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 28.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 56.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 32.0M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 6.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.1M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 38.3M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 47.8M | ✅ | 751K | 🟢 **-98%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.5M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.7M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.4M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.2M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.1M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 65.4M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 77.5M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.2M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.0M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.9M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.9M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.8M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.4M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 27.8M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 60.8M | ✅ | 2.7M | 🟢 **-96%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 14.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 40.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 38.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 40.5M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 70.5M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 41.6M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 10.3M | ❌ | - | - |
