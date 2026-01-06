# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | zod pass | zod ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.4M | 73/199 | 141K | 73 | 🟢 **-99%** |
| draft6 | 276 | ✅ 276 | 28.7M | 102/276 | 150K | 102 | 🟢 **-99%** |
| draft7 | 313 | ✅ 313 | 15.6M | 110/313 | 171K | 110 | 🟢 **-99%** |
| draft2019-09 | 435 | ✅ 435 | 18.6M | 125/435 | 187K | 125 | 🟢 **-99%** |
| draft2020-12 | 448 | ✅ 448 | 18.8M | 121/448 | 188K | 121 | 🟢 **-99%** |
| **Total** | 1671 | 1670/1671 | 19.7M | 531/1671 | 169K | 531 | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **320.49x faster** (18 ns vs 5926 ns per test, 1962 tests in 531 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.5M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 85.1M | ✅ | 46.6M | 🟢 **-45%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 144.6M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 88.3M | ✅ | 43.4M | 🟢 **-51%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 124.4M | ✅ | 68.7M | 🟢 **-45%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 44.4M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 58.3M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 69.6M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 151.9M | ✅ | 43.6M | 🟢 **-71%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 38.7M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 34.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 43.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 77.1M | ✅ | 42.0M | 🟢 **-46%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 32.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 50.9M | ✅ | 43.8M | -14% |
| allOf.json | allOf | 4 | ✅ | 46.8M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 26.8M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 109.9M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 85.2M | ✅ | 28.1M | 🟢 **-67%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.9M | ✅ | 6.0M | 🟢 **-96%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.4M | ✅ | 136K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.5M | ✅ | 111K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.5M | ✅ | 117K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 76.0M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.0M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 163.7M | ✅ | 10.6M | 🟢 **-94%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.6M | ✅ | 116K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 107.6M | ✅ | 23.9M | 🟢 **-78%** |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ✅ | 24.6M | 🟢 **-53%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.2M | ✅ | 162K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.8M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.2M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 31.7M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.5M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 45.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.9M | ✅ | 81K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.6M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.1M | ✅ | 134K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 82K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 57.4M | ✅ | 165K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 106.5M | ✅ | 86K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.6M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 57.8M | ✅ | 87K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 31.7M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.3M | ✅ | 174K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 63.5M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 104.7M | ✅ | 173K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 63.3M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 115K | 🟢 **-100%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ✅ | 110K | 🟢 **-100%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 93.9M | ✅ | 116K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 79.6M | ✅ | 26.8M | 🟢 **-66%** |
| format.json | ipv4 format | 6 | ✅ | 162.5M | ✅ | 26.4M | 🟢 **-84%** |
| format.json | ipv6 format | 6 | ✅ | 79.4M | ✅ | 28.2M | 🟢 **-65%** |
| format.json | hostname format | 6 | ✅ | 134.1M | ✅ | 26.0M | 🟢 **-81%** |
| format.json | date-time format | 6 | ✅ | 82.8M | ✅ | 28.0M | 🟢 **-66%** |
| format.json | uri format | 6 | ✅ | 133.5M | ✅ | 26.4M | 🟢 **-80%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.3M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 68.4M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 33.4M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 13.4M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.8M | ✅ | 66K | 🟢 **-99%** |
| items.json | items with null instance elements | 1 | ✅ | 72.0M | ✅ | 22.9M | 🟢 **-68%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 76.9M | ✅ | 22.9M | 🟢 **-70%** |
| maxItems.json | maxItems validation | 4 | ✅ | 74.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 56.1M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.1M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 43.1M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 66.4M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 66.0M | ❌ | - | - |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 72.6M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 67.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 57.3M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ❌ | - | - |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 70.8M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 63.2M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 74.0M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 64.0M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 44K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 829K | 🟢 **-99%** |
| not.json | not | 2 | ✅ | 73.4M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 67.9M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 65.9M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 49.5M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.3M | ✅ | 65K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 85.2M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 74.3M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.3M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.4M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.4M | ✅ | 113K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.7M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 57.4M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 67.9M | ✅ | 116K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 54.0M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.8M | ✅ | 22.0M | -11% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.5M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.9M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 22.1M | 🔴 **+24%** |
| properties.json | object properties validation | 6 | ✅ | 53.0M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 48.8M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.2M | ✅ | 21.8M | 🟢 **-68%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.3M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 51.3M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 55.6M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 45.5M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 38.2M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 52.9M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 73.5M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.1M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.2M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.0M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 73.2M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 54.5M | ❌ | - | - |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 48.8M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 73.2M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 73.4M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 49.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 26.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.3M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.4M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 85.2M | ✅ | 22.0M | 🟢 **-74%** |
| required.json | required with escaped characters | 2 | ✅ | 49.9M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 26.0M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 60.7M | ✅ | 74K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 65.8M | ✅ | 99K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 65.8M | ✅ | 100K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 56.9M | ✅ | 79K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 61.2M | ✅ | 78K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 63.1M | ✅ | 84K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.9M | ✅ | 76K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.6M | ✅ | 70K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 71.4M | ✅ | 115K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 69.0M | ✅ | 73K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 73.4M | ✅ | 110K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 86.1M | ✅ | 24.9M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.5M | ✅ | 24.8M | 🟢 **-64%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.3M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.0M | ✅ | 22.4M | 🟢 **-73%** |
| optional/bignum.json | string | 1 | ✅ | 60.9M | ✅ | 57K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 21.0M | 🟢 **-72%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 20.9M | 🟢 **-72%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.8M | ✅ | 108K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.8M | ✅ | 108K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 109K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 33.8M | ✅ | 109K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.0M | ✅ | 81K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 23.3M | ✅ | 163K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.9M | ✅ | 108K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.7M | ✅ | 107K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.2M | ✅ | 292K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.5M | ✅ | 80K | 🟢 **-100%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.6M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.2M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.6M | ✅ | 24.5M | 🟢 **-69%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.2M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.0M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 152.9M | ✅ | 44.7M | 🟢 **-71%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 36.3M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.3M | ✅ | 39.6M | 🟢 **-76%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.3M | ✅ | 62.6M | -15% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.0M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 42.7M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 106.5M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ✅ | 39.6M | 🟢 **-46%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.7M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 42.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 39.7M | 🟢 **-74%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 39.7M | 🟢 **-43%** |
| allOf.json | allOf | 4 | ✅ | 38.3M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 31.1M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 66.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.1M | ✅ | 5.0M | 🟢 **-97%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.7M | ✅ | 69K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 64K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.5M | ✅ | 20.2M | 🟢 **-73%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.2M | ✅ | 4.9M | 🟢 **-97%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 70.0M | ✅ | 114K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 70.8M | ✅ | 124K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 71.6M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 44.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 80.7M | ✅ | 14.4M | 🟢 **-82%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.9M | ✅ | 15.0M | 🟢 **-90%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 60.7M | ✅ | 47K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 77.5M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 83.4M | ✅ | 7.8M | 🟢 **-91%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 121K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 71.1M | ✅ | 25.9M | 🟢 **-64%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 88.9M | ✅ | 69K | 🟢 **-100%** |
| const.json | const validation | 3 | ✅ | 74.3M | ✅ | 88K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 49.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 53.7M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 117K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 68.0M | ✅ | 89K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 89K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 59.2M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 60.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 94.8M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 56.7M | ✅ | 89K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 106.3M | ✅ | 176K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 65.0M | ✅ | 117K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 106.8M | ✅ | 115K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 59.7M | ✅ | 118K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 113K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 60.7M | ✅ | 119K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 98.8M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 65.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.7M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 19.8M | 🟢 **-72%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 24.6M | 🟢 **-77%** |
| default.json | invalid string value for default | 2 | ✅ | 51.4M | ✅ | 23.5M | 🟢 **-54%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 79.5M | ✅ | 171K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.2M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 84.7M | ✅ | 24.2M | 🟢 **-71%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.3M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 44.7M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 87.1M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.3M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 46.3M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 68.6M | ✅ | 86K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.1M | ✅ | 144K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 15.3M | ✅ | 97K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.3M | ✅ | 177K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 109.2M | ✅ | 92K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 108.9M | ✅ | 93K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 108.7M | ✅ | 182K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 62.1M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 111.7M | ✅ | 183K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 55.3M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 89.9M | ✅ | 121K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 65.2M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.0M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 78.9M | ✅ | 25.1M | 🟢 **-68%** |
| format.json | ipv4 format | 6 | ✅ | 161.2M | ✅ | 26.2M | 🟢 **-84%** |
| format.json | ipv6 format | 6 | ✅ | 80.3M | ✅ | 24.9M | 🟢 **-69%** |
| format.json | hostname format | 6 | ✅ | 162.4M | ✅ | 26.5M | 🟢 **-84%** |
| format.json | date-time format | 6 | ✅ | 78.0M | ✅ | 25.2M | 🟢 **-68%** |
| format.json | json-pointer format | 6 | ✅ | 156.4M | ✅ | 26.7M | 🟢 **-83%** |
| format.json | uri format | 6 | ✅ | 75.5M | ✅ | 25.4M | 🟢 **-66%** |
| format.json | uri-reference format | 6 | ✅ | 162.0M | ✅ | 27.0M | 🟢 **-83%** |
| format.json | uri-template format | 6 | ✅ | 80.9M | ✅ | 25.4M | 🟢 **-69%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.7M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 50.4M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 95.8M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 78.2M | ✅ | 24.6M | 🟢 **-69%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 60.0M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.2M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.4M | ✅ | 69K | 🟢 **-99%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 24.5M | 🟢 **-65%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.3M | ✅ | 23.7M | 🟢 **-68%** |
| maxItems.json | maxItems validation | 4 | ✅ | 67.4M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 55.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.1M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.5M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.7M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.8M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 69.1M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 71.3M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.3M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 53.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 55.8M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 47.2M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 70.4M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 67.0M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 56.3M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 48K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 767K | 🟢 **-99%** |
| not.json | not | 2 | ✅ | 70.0M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 64.1M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 55.4M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 48.8M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.7M | ✅ | 69K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 57.8M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 79.9M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 80.7M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 61.5M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.5M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.7M | ✅ | 4.1M | 🟢 **-95%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.7M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.5M | ✅ | 45K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.2M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.0M | ✅ | 122K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.8M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 44.1M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.2M | ✅ | 122K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 51.9M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.4M | ✅ | 23.1M | -5% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.5M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.9M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.8M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.9M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 23.6M | 🔴 **+33%** |
| properties.json | object properties validation | 6 | ✅ | 51.1M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 47.5M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 63.5M | ✅ | 23.6M | 🟢 **-63%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 37.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.3M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.4M | ✅ | 24.1M | 🟢 **-71%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 47.6M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.6M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 50.5M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 44.2M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 37.1M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 53.4M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 23.7M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.7M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 47.5M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 47.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 52.9M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 30.8M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.0M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 49.9M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.0M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.5M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 40.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 81.7M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 52.2M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 47.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 45.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.4M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 37.2M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 37.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 60.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 23.7M | 🟢 **-71%** |
| required.json | required with empty array | 1 | ✅ | 80.4M | ✅ | 24.9M | 🟢 **-69%** |
| required.json | required with escaped characters | 2 | ✅ | 48.4M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 26.7M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 60.0M | ✅ | 85K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 62.0M | ✅ | 104K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 61.4M | ✅ | 102K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 54.7M | ✅ | 80K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 57.8M | ✅ | 80K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 59.4M | ✅ | 87K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 59.2M | ✅ | 77K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 60.0M | ✅ | 73K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 69.3M | ✅ | 123K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 61.5M | ✅ | 79K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 67.8M | ✅ | 119K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.2M | ✅ | 24.4M | 🟢 **-68%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 66.1M | ✅ | 25.7M | 🟢 **-61%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.2M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 79.8M | ✅ | 21.5M | 🟢 **-73%** |
| optional/bignum.json | string | 1 | ✅ | 57.9M | ✅ | 61K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 24.8M | 🟢 **-66%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 23.9M | 🟢 **-67%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 26.7M | ✅ | 115K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.7M | ✅ | 115K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.7M | ✅ | 116K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.2M | ✅ | 114K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.7M | ✅ | 87K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.6M | ✅ | 173K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.5M | ✅ | 116K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.4M | ✅ | 116K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.4M | ✅ | 313K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 34.9M | ✅ | 80K | 🟢 **-100%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 19.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.8M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.4M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.5M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 41.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 78.8M | ✅ | 25.4M | 🟢 **-68%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.8M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.1M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 44.8M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 45.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.5M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.6M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.2M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 38.7M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 149.2M | ✅ | 47.8M | 🟢 **-68%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 72.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ✅ | 41.5M | 🟢 **-75%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 42.0M | 🟢 **-48%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.2M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.6M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 42.0M | 🟢 **-48%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.0M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 41.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.7M | ✅ | 42.3M | 🟢 **-72%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 42.5M | 🟢 **-39%** |
| allOf.json | allOf | 4 | ✅ | 39.7M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.6M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 153.0M | ✅ | 5.7M | 🟢 **-96%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 74K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 67K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 24.0M | 🟢 **-70%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.7M | ✅ | 5.3M | 🟢 **-97%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.0M | ✅ | 116K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 110K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 124K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 81.5M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 89.9M | ✅ | 17.2M | 🟢 **-81%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.6M | ✅ | 16.8M | 🟢 **-89%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 47K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.8M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ✅ | 10.3M | 🟢 **-88%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 122K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.3M | ✅ | 26.6M | 🟢 **-66%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 84.9M | ✅ | 69K | 🟢 **-100%** |
| const.json | const validation | 3 | ✅ | 67.2M | ✅ | 90K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 49.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 51.1M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 119.9M | ✅ | 121K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ✅ | 91K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 112.0M | ✅ | 90K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.4M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 65.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.2M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ✅ | 91K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 109.0M | ✅ | 181K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 72.9M | ✅ | 102K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.7M | ✅ | 118K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 120K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 117K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ✅ | 122K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 99.5M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.2M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 86.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.6M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 68.2M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 124.2M | ✅ | 22.6M | 🟢 **-82%** |
| default.json | invalid type for default | 2 | ✅ | 71.5M | ✅ | 24.6M | 🟢 **-66%** |
| default.json | invalid string value for default | 2 | ✅ | 74.5M | ✅ | 24.4M | 🟢 **-67%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 54.9M | ✅ | 175K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.6M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 62.8M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 25.1M | 🟢 **-74%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 33.6M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 46.6M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 56.6M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.0M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.6M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 60.4M | ✅ | 88K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 47.7M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.2M | ✅ | 146K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.7M | ✅ | 97K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 80.2M | ✅ | 183K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 60.0M | ✅ | 95K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 66.3M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 75.6M | ✅ | 96K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.8M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.5M | ✅ | 190K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 68.7M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.3M | ✅ | 190K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 66.5M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 126K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 67.5M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 70.7M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 78.1M | ✅ | 27.3M | 🟢 **-65%** |
| format.json | idn-email format | 6 | ✅ | 83.9M | ✅ | 28.3M | 🟢 **-66%** |
| format.json | regex format | 6 | ✅ | 84.1M | ✅ | 27.3M | 🟢 **-68%** |
| format.json | ipv4 format | 6 | ✅ | 92.0M | ✅ | 28.1M | 🟢 **-69%** |
| format.json | ipv6 format | 6 | ✅ | 83.8M | ✅ | 27.3M | 🟢 **-67%** |
| format.json | idn-hostname format | 6 | ✅ | 83.8M | ✅ | 28.1M | 🟢 **-66%** |
| format.json | hostname format | 6 | ✅ | 83.8M | ✅ | 26.6M | 🟢 **-68%** |
| format.json | date format | 6 | ✅ | 91.4M | ✅ | 28.1M | 🟢 **-69%** |
| format.json | date-time format | 6 | ✅ | 88.2M | ✅ | 27.1M | 🟢 **-69%** |
| format.json | time format | 6 | ✅ | 83.3M | ✅ | 28.1M | 🟢 **-66%** |
| format.json | json-pointer format | 6 | ✅ | 92.4M | ✅ | 27.1M | 🟢 **-71%** |
| format.json | relative-json-pointer format | 6 | ✅ | 84.0M | ✅ | 26.9M | 🟢 **-68%** |
| format.json | iri format | 6 | ✅ | 90.7M | ✅ | 27.3M | 🟢 **-70%** |
| format.json | iri-reference format | 6 | ✅ | 84.8M | ✅ | 28.0M | 🟢 **-67%** |
| format.json | uri format | 6 | ✅ | 83.8M | ✅ | 27.0M | 🟢 **-68%** |
| format.json | uri-reference format | 6 | ✅ | 89.4M | ✅ | 28.0M | 🟢 **-69%** |
| format.json | uri-template format | 6 | ✅ | 92.3M | ✅ | 27.2M | 🟢 **-71%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 93.8M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 93.9M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 84.1M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 77.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 76.6M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 71.9M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 84.0M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 76.1M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 75.4M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 45.0M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 54.3M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 67.4M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 93.9M | ✅ | 27.0M | 🟢 **-71%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 71.7M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 65.1M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 13.0M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 67K | 🟢 **-99%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 26.5M | 🟢 **-65%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 80.9M | ✅ | 23.5M | 🟢 **-71%** |
| maxItems.json | maxItems validation | 4 | ✅ | 79.0M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 72.6M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.3M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.9M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 49.4M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 50.7M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 75.0M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 74.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.1M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 71.0M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 58.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.8M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 59.8M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 50.4M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 79.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 77.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 73.6M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 47K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 75.2M | ✅ | 802K | 🟢 **-99%** |
| not.json | not | 2 | ✅ | 77.0M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 71.0M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 68.9M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 54.0M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.2M | ✅ | 71K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.0M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 90.3M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 89.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 66.1M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 66.1M | ✅ | 63K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 90.0M | ✅ | 5.7M | 🟢 **-94%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 45K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.6M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 76.0M | ✅ | 126K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 57.5M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 49.3M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 126K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 56.2M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 24.6M | -3% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.7M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.1M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.1M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 25.2M | 🔴 **+39%** |
| properties.json | object properties validation | 6 | ✅ | 56.0M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.4M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 49.1M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.6M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.2M | ✅ | 26.3M | 🟢 **-63%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 40.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.4M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 93.9M | ✅ | 26.4M | 🟢 **-72%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.5M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 40.4M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.7M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 26.1M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 54.2M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 58.7M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.1M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 39.1M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 53.4M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 53.7M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 88.1M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.1M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 54.7M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 51.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.9M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.0M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.2M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.2M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.4M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 50.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 50.7M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 76.9M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.1M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 50.4M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.0M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 39.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 41.4M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 87.9M | ✅ | 26.3M | 🟢 **-70%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 26.5M | 🟢 **-71%** |
| required.json | required with escaped characters | 2 | ✅ | 52.1M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 67.0M | ✅ | 86K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 68.6M | ✅ | 105K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 68.8M | ✅ | 103K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 81K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 64.5M | ✅ | 81K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.4M | ✅ | 87K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 65.6M | ✅ | 79K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.3M | ✅ | 72K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 127K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 72.4M | ✅ | 79K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 77.4M | ✅ | 109K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.7M | ✅ | 26.9M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 26.9M | 🟢 **-63%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 25.0M | 🟢 **-72%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 63K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 26.4M | 🟢 **-67%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.6M | ✅ | 26.4M | 🟢 **-66%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 60.0M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 347K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 18.7M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 424K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 29.4M | ✅ | 116K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 117K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.9M | ✅ | 118K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.4M | ✅ | 116K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.8M | ✅ | 88K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 175K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.1M | ✅ | 117K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.5M | ✅ | 117K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.3M | ✅ | 315K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.4M | ✅ | 80K | 🟢 **-100%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.1M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 18.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.8M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 9.0M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.9M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.2M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 20.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.9M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.3M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.3M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.7M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.2M | ✅ | 26.5M | 🟢 **-72%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.5M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.5M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 59.5M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 58.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.1M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.3M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.7M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.1M | ✅ | 47.8M | 🟢 **-69%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.5M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.5M | ✅ | 42.6M | 🟢 **-74%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 77.0M | ✅ | 68.9M | -11% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.4M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 43.5M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 77.1M | ✅ | 44.0M | 🟢 **-43%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.3M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.8M | ✅ | 41.7M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.3M | ✅ | 42.6M | 🟢 **-39%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.5M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.3M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 38.7M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 65.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 143.1M | ✅ | 5.7M | 🟢 **-96%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 60.7M | ✅ | 68K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 59K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 85.1M | ✅ | 25.8M | 🟢 **-70%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 151.9M | ✅ | 5.4M | 🟢 **-96%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.3M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 118K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.6M | ✅ | 122K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 85.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 49.1M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 82.4M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.1M | ✅ | 15.4M | 🟢 **-82%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.1M | ✅ | 17.3M | 🟢 **-80%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.2M | ✅ | 48K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.9M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.9M | ✅ | 10.6M | 🟢 **-87%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 120K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 82.8M | ✅ | 27.2M | 🟢 **-67%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 61.3M | ✅ | 70K | 🟢 **-100%** |
| const.json | const validation | 3 | ✅ | 63.1M | ✅ | 94K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 40.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 56.1M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.6M | ✅ | 127K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 64.9M | ✅ | 96K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 71.5M | ✅ | 96K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.3M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 62.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 57.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 62.8M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.4M | ✅ | 96K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 35.1M | ✅ | 191K | 🟢 **-99%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 57.2M | ✅ | 107K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 68.9M | ✅ | 124K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 31.2M | ✅ | 127K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 122K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.3M | ✅ | 127K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 61.7M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 68.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 69.2M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.3M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 65.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 25.6M | 🟢 **-65%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 90.1M | ✅ | 27.3M | 🟢 **-70%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 89.6M | ✅ | 26.5M | 🟢 **-70%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 87.7M | ✅ | 27.6M | 🟢 **-69%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 73.0M | ✅ | 26.9M | 🟢 **-63%** |
| default.json | invalid type for default | 2 | ✅ | 68.0M | ✅ | 26.6M | 🟢 **-61%** |
| default.json | invalid string value for default | 2 | ✅ | 53.2M | ✅ | 26.6M | 🟢 **-50%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 26.2M | ✅ | 172K | 🟢 **-99%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 61.5M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 90.0M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.4M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 44.7M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 53.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 54.8M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.7M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 70.9M | ✅ | 87K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.3M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 70.9M | ✅ | 143K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.3M | ✅ | 95K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 177K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 69.1M | ✅ | 93K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 61.8M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 71.9M | ✅ | 93K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 68.6M | ✅ | 185K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 57.2M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.3M | ✅ | 186K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 55.9M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 57.0M | ✅ | 123K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.3M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 61.4M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 89.0M | ✅ | 26.7M | 🟢 **-70%** |
| format.json | idn-email format | 6 | ✅ | 79.1M | ✅ | 27.0M | 🟢 **-66%** |
| format.json | regex format | 6 | ✅ | 76.6M | ✅ | 26.7M | 🟢 **-65%** |
| format.json | ipv4 format | 6 | ✅ | 80.7M | ✅ | 26.9M | 🟢 **-67%** |
| format.json | ipv6 format | 6 | ✅ | 80.7M | ✅ | 27.1M | 🟢 **-66%** |
| format.json | idn-hostname format | 6 | ✅ | 73.3M | ✅ | 26.4M | 🟢 **-64%** |
| format.json | hostname format | 6 | ✅ | 77.7M | ✅ | 27.0M | 🟢 **-65%** |
| format.json | date format | 6 | ✅ | 77.5M | ✅ | 27.0M | 🟢 **-65%** |
| format.json | date-time format | 6 | ✅ | 73.6M | ✅ | 27.1M | 🟢 **-63%** |
| format.json | time format | 6 | ✅ | 76.4M | ✅ | 26.9M | 🟢 **-65%** |
| format.json | json-pointer format | 6 | ✅ | 80.6M | ✅ | 26.3M | 🟢 **-67%** |
| format.json | relative-json-pointer format | 6 | ✅ | 73.3M | ✅ | 27.0M | 🟢 **-63%** |
| format.json | iri format | 6 | ✅ | 79.9M | ✅ | 27.0M | 🟢 **-66%** |
| format.json | iri-reference format | 6 | ✅ | 73.7M | ✅ | 26.9M | 🟢 **-63%** |
| format.json | uri format | 6 | ✅ | 80.9M | ✅ | 26.9M | 🟢 **-67%** |
| format.json | uri-reference format | 6 | ✅ | 77.1M | ✅ | 26.9M | 🟢 **-65%** |
| format.json | uri-template format | 6 | ✅ | 80.5M | ✅ | 27.0M | 🟢 **-67%** |
| format.json | uuid format | 6 | ✅ | 79.7M | ✅ | 27.0M | 🟢 **-66%** |
| format.json | duration format | 6 | ✅ | 75.8M | ✅ | 27.0M | 🟢 **-64%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.9M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.9M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 88.5M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 73.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 73.0M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.4M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.9M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.6M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 50.9M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 65.3M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.6M | ✅ | 26.7M | 🟢 **-70%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.6M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 62.9M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.8M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.1M | ✅ | 66K | 🟢 **-99%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 72.0M | ✅ | 26.3M | 🟢 **-63%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 69.4M | ✅ | 26.1M | 🟢 **-62%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.6M | ✅ | 26.5M | 🟢 **-70%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 72.4M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.4M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 56.9M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 74.9M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.4M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 57.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.9M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 43.6M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 73.2M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.2M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.3M | ✅ | 26.4M | 🟢 **-70%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 63.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.4M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.5M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 54.0M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 54.6M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 88.6M | ✅ | 26.6M | 🟢 **-70%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 68.7M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 75.0M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.2M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 56.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.7M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 57.7M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.3M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 73.2M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 73.9M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 70.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 64.0M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 55.7M | ✅ | 47K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.9M | ✅ | 834K | 🟢 **-99%** |
| not.json | not | 2 | ✅ | 73.3M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 67.9M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 65.9M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 51.0M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.7M | ✅ | 70K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 60.9M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.0M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 85.1M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.5M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 64.4M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 62.4M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.1M | ✅ | 5.7M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.2M | ✅ | 63K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.2M | ✅ | 44K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.4M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.4M | ✅ | 124K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.5M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.9M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.5M | ✅ | 124K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 53.8M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 14.4M | ✅ | 25.4M | 🔴 **+77%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.4M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.6M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.7M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.1M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 25.4M | 🔴 **+42%** |
| properties.json | object properties validation | 6 | ✅ | 54.3M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 47.9M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 47.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 25.6M | 🟢 **-62%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.7M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.5M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.4M | ✅ | 25.7M | 🟢 **-71%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.7M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.1M | ✅ | 2.9M | -6% |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 12.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 12.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.1M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.1M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.3M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.1M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.9M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 53.2M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 55.6M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 45.9M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 37.7M | ✅ | 122K | 🟢 **-100%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 42.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.2M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 50.8M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.2M | ✅ | 24.8M | 🟢 **-71%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.2M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.5M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 54.9M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.2M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 42.2M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.5M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.5M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.5M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.2M | ✅ | 123K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 72.9M | ✅ | 125K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.4M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 48.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 43.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.2M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 26.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.8M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 41.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 47.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 47.7M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.3M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 85.1M | ✅ | 25.6M | 🟢 **-70%** |
| required.json | required with empty array | 1 | ✅ | 85.1M | ✅ | 24.1M | 🟢 **-72%** |
| required.json | required with escaped characters | 2 | ✅ | 49.8M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.5M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.6M | ✅ | 87K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 66.2M | ✅ | 104K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 65.3M | ✅ | 104K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 56.4M | ✅ | 80K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 60.7M | ✅ | 80K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 62.8M | ✅ | 86K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.6M | ✅ | 78K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.1M | ✅ | 67K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 73.0M | ✅ | 122K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 68.3M | ✅ | 79K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 73.5M | ✅ | 106K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 58.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 46.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 48.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 75.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 43.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 34.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 77.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 57.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 45.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 48.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 45.2M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.4M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 71.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 72.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 55.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 34.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 34.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 66.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 31.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 22.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 17.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 32.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.8M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.2M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.5M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.0M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 27.5M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 30.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 46.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.7M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 72.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.7M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 14.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 86.1M | ✅ | 26.3M | 🟢 **-69%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.7M | ✅ | 25.6M | 🟢 **-63%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 63.9M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 51.0M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.0M | ✅ | 124K | 🟢 **-100%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 61.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.7M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.1M | ✅ | 24.0M | 🟢 **-72%** |
| optional/bignum.json | string | 1 | ✅ | 60.9M | ✅ | 61K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 25.2M | 🟢 **-67%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 25.5M | 🟢 **-66%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.8M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.3M | ✅ | 26.4M | 🟢 **-71%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 52.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 59.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.0M | ✅ | 115K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.9M | ✅ | 115K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.7M | ✅ | 116K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.1M | ✅ | 116K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.9M | ✅ | 87K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 173K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.9M | ✅ | 117K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.7M | ✅ | 117K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.7M | ✅ | 315K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.8M | ✅ | 80K | 🟢 **-100%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 13.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.0M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.4M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 40.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.6M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.0M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 43.0M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.8M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.2M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 69.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 40.3M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.4M | ✅ | 25.5M | 🟢 **-69%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 35.7M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 62.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 22.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 52.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 52.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 53.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 72.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.7M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.9M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 56.9M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.3M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.6M | ✅ | 42.5M | 🟢 **-72%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 43.6M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.4M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.2M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 39.2M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 142.0M | ✅ | 5.6M | 🟢 **-96%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 63.0M | ✅ | 71K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 65K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 77.1M | ✅ | 25.8M | 🟢 **-67%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 5.0M | 🟢 **-97%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 72.1M | ✅ | 126K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 143K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 125K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.2M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.3M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 48.3M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 76.0M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 39.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.2M | ✅ | 15.1M | 🟢 **-82%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.2M | ✅ | 18.0M | 🟢 **-79%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 50K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.9M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.9M | ✅ | 10.3M | 🟢 **-87%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 125K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 76.3M | ✅ | 26.7M | 🟢 **-65%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.9M | ✅ | 68K | 🟢 **-100%** |
| const.json | const validation | 3 | ✅ | 64.0M | ✅ | 94K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 38.5M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 56.2M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.7M | ✅ | 124K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 72.0M | ✅ | 95K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 72.2M | ✅ | 93K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.4M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 62.7M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 62.6M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.7M | ✅ | 94K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 70.2M | ✅ | 187K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 33.5M | ✅ | 105K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 63.6M | ✅ | 123K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 58.6M | ✅ | 124K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 121K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.4M | ✅ | 125K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 61.7M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 59.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 67.5M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 21.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 24.4M | 🟢 **-67%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 75.0M | ✅ | 27.0M | 🟢 **-64%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 90.3M | ✅ | 25.3M | 🟢 **-72%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 79.6M | ✅ | 27.2M | 🟢 **-66%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 76.3M | ✅ | 25.2M | 🟢 **-67%** |
| default.json | invalid type for default | 2 | ✅ | 64.4M | ✅ | 24.5M | 🟢 **-62%** |
| default.json | invalid string value for default | 2 | ✅ | 53.1M | ✅ | 24.8M | 🟢 **-53%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 26.3M | ✅ | 164K | 🟢 **-99%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 60.9M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 80.6M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 27.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 47.5M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 52.9M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 52.7M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 38.6M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 10.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.5M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.6M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 11.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 8.6M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.7M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.5M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.6M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.7M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 26.7M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.9M | ✅ | 86K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.1M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.1M | ✅ | 142K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.8M | ✅ | 87K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.9M | ✅ | 178K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 69.3M | ✅ | 93K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 62.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 72.2M | ✅ | 93K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.9M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 71.5M | ✅ | 185K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.9M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.9M | ✅ | 185K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.7M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 62.2M | ✅ | 123K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 67.4M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 68.1M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 83.3M | ✅ | 26.0M | 🟢 **-69%** |
| format.json | idn-email format | 7 | ✅ | 83.2M | ✅ | 28.5M | 🟢 **-66%** |
| format.json | regex format | 7 | ✅ | 75.4M | ✅ | 26.9M | 🟢 **-64%** |
| format.json | ipv4 format | 7 | ✅ | 73.8M | ✅ | 28.6M | 🟢 **-61%** |
| format.json | ipv6 format | 7 | ✅ | 75.2M | ✅ | 27.1M | 🟢 **-64%** |
| format.json | idn-hostname format | 7 | ✅ | 75.6M | ✅ | 26.7M | 🟢 **-65%** |
| format.json | hostname format | 7 | ✅ | 75.6M | ✅ | 27.1M | 🟢 **-64%** |
| format.json | date format | 7 | ✅ | 75.3M | ✅ | 28.9M | 🟢 **-62%** |
| format.json | date-time format | 7 | ✅ | 75.4M | ✅ | 26.9M | 🟢 **-64%** |
| format.json | time format | 7 | ✅ | 74.2M | ✅ | 28.6M | 🟢 **-61%** |
| format.json | json-pointer format | 7 | ✅ | 82.5M | ✅ | 27.2M | 🟢 **-67%** |
| format.json | relative-json-pointer format | 7 | ✅ | 75.3M | ✅ | 28.7M | 🟢 **-62%** |
| format.json | iri format | 7 | ✅ | 75.6M | ✅ | 26.8M | 🟢 **-64%** |
| format.json | iri-reference format | 7 | ✅ | 75.5M | ✅ | 28.5M | 🟢 **-62%** |
| format.json | uri format | 7 | ✅ | 75.5M | ✅ | 26.8M | 🟢 **-65%** |
| format.json | uri-reference format | 7 | ✅ | 73.8M | ✅ | 28.6M | 🟢 **-61%** |
| format.json | uri-template format | 7 | ✅ | 75.6M | ✅ | 27.1M | 🟢 **-64%** |
| format.json | uuid format | 7 | ✅ | 75.4M | ✅ | 28.6M | 🟢 **-62%** |
| format.json | duration format | 7 | ✅ | 75.6M | ✅ | 27.1M | 🟢 **-64%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.8M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 79.9M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.9M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 72.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 72.8M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.7M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 80.0M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 72.0M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.2M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 51.6M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.5M | ✅ | 26.4M | 🟢 **-70%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.8M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.7M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.3M | ✅ | 66K | 🟢 **-99%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 75.6M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 44.4M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 43.0M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 69.7M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 72.0M | ✅ | 26.4M | 🟢 **-63%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.6M | ✅ | 28.1M | 🟢 **-68%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 63.3M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 57.2M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 75.2M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 57.2M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 47.6M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 48.6M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 68.1M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.3M | ✅ | 26.5M | 🟢 **-70%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 63.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 58.0M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.0M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 58.7M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 53.9M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 88.6M | ✅ | 26.7M | 🟢 **-70%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 68.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 75.3M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 57.8M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 48.5M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 73.3M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 69.0M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 73.3M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 70.0M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 46K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.8M | ✅ | 819K | 🟢 **-99%** |
| not.json | not | 2 | ✅ | 73.3M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 67.7M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 66.1M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 49.9M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 61.0M | ✅ | 69K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.5M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 84.6M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 85.1M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 64.5M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.0M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 63.0M | ✅ | 61K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.2M | ✅ | 5.7M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.2M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.4M | ✅ | 44K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.1M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.4M | ✅ | 121K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.7M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.4M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 72.1M | ✅ | 123K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 54.1M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 22.7M | ✅ | 25.4M | +12% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.1M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.1M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.2M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.6M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 25.2M | 🔴 **+41%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.7M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 62.3M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 77.0M | ✅ | 24.7M | 🟢 **-68%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 77.0M | ✅ | 24.5M | 🟢 **-68%** |
| properties.json | object properties validation | 6 | ✅ | 53.3M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.8M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 47.8M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 43.7M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 25.8M | 🟢 **-62%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.5M | ✅ | 25.8M | 🟢 **-71%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.1M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.9M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 51.9M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 53.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 44.9M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 37.8M | ✅ | 122K | 🟢 **-100%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 50.3M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.5M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 85.1M | ✅ | 25.5M | 🟢 **-70%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.5M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 26.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 54.9M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 33.4M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 37.8M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 41.7M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 51.8M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 50.6M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 41.9M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.5M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 51.6M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 45.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 122K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 72.6M | ✅ | 123K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 67.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 45.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 46.8M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 48.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 31.9M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 35.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 31.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 42.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 48.8M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 45.7M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 45.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 49.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.4M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 85.1M | ✅ | 24.9M | 🟢 **-71%** |
| required.json | required with empty array | 1 | ✅ | 85.2M | ✅ | 25.3M | 🟢 **-70%** |
| required.json | required with escaped characters | 2 | ✅ | 50.1M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 24.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.9M | ✅ | 86K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 66.2M | ✅ | 101K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 65.9M | ✅ | 100K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 56.2M | ✅ | 78K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 61.1M | ✅ | 78K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 63.1M | ✅ | 83K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.8M | ✅ | 76K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 62.9M | ✅ | 70K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 73.1M | ✅ | 123K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 67.3M | ✅ | 84K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 73.1M | ✅ | 104K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 57.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 49.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 51.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 75.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 48.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 77.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 20.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 58.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 49.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 44.5M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 24.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 83.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 71.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.6M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 56.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 31.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 33.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 30.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 88.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 28.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 14.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 16.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 23.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.0M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.8M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 20.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 20.0M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 78.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 50.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 44.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.6M | ✅ | 25.2M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.9M | ✅ | 25.3M | 🟢 **-63%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 64.2M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 51.1M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 73.5M | ✅ | 122K | 🟢 **-100%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 61.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.0M | ✅ | 24.3M | 🟢 **-71%** |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 61K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 75.2M | ✅ | 24.9M | 🟢 **-67%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 75.2M | ✅ | 25.0M | 🟢 **-67%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.8M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 80.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.1M | ✅ | 26.1M | 🟢 **-71%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 52.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 57.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.6M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.3M | ✅ | 113K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.9M | ✅ | 113K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.1M | ✅ | 114K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.8M | ✅ | 115K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 13.7M | ✅ | 86K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 12.7M | ✅ | 171K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.4M | ✅ | 115K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.3M | ✅ | 114K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.8M | ✅ | 307K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 78K | 🟢 **-100%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.8M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.2M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.5M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.2M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.1M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.0M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 49.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.9M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.8M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.1M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.3M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 71.5M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.4M | ✅ | 25.3M | 🟢 **-70%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.0M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.4M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 24.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 18.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 36.2M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 61.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 51.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 51.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 50.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 73.1M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.5M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.5M | ❌ | - | - |
