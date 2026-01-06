# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | zod pass | zod ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.7M | 73/199 | 150K | 73 | 🟢 **-99%** |
| draft6 | 276 | ✅ 276 | 29.9M | 102/276 | 149K | 102 | 🟢 **-100%** |
| draft7 | 313 | ✅ 313 | 15.4M | 110/313 | 167K | 110 | 🟢 **-99%** |
| draft2019-09 | 435 | ✅ 435 | 17.9M | 125/435 | 183K | 125 | 🟢 **-99%** |
| draft2020-12 | 448 | ✅ 448 | 18.9M | 121/448 | 190K | 121 | 🟢 **-99%** |
| **Total** | 1671 | 1670/1671 | 19.5M | 531/1671 | 169K | 531 | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **316.08x faster** (19 ns vs 5911 ns per test, 1962 tests in 531 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.0M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 90.2M | ✅ | 49.8M | 🟢 **-45%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 134.2M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 94.1M | ✅ | 45.5M | 🟢 **-52%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 123.1M | ✅ | 70.0M | 🟢 **-43%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 31.0M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.6M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.9M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 167.5M | ✅ | 42.5M | 🟢 **-75%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 36.0M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 19.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 29.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 82.6M | ✅ | 43.2M | 🟢 **-48%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 22.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 51.8M | ✅ | 44.0M | -15% |
| allOf.json | allOf | 4 | ✅ | 37.4M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 23.5M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 122.0M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 89.8M | ✅ | 28.8M | 🟢 **-68%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 167.9M | ✅ | 6.1M | 🟢 **-96%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 149K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 120.1M | ✅ | 112K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 73.4M | ✅ | 118K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.6M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 79.6M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.8M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.1M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 172.4M | ✅ | 11.0M | 🟢 **-94%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 77.4M | ✅ | 122K | 🟢 **-100%** |
| default.json | invalid type for default | 2 | ✅ | 112.0M | ✅ | 24.7M | 🟢 **-78%** |
| default.json | invalid string value for default | 2 | ✅ | 56.0M | ✅ | 25.3M | 🟢 **-55%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 67.4M | ✅ | 179K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 87.1M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.8M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 50.8M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 16.4M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.8M | ✅ | 89K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 65.8M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 65.2M | ✅ | 146K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 98K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 54.6M | ✅ | 184K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 46.1M | ✅ | 95K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 60.6M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 116.8M | ✅ | 95K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 58.4M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 123.8M | ✅ | 190K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.5M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 127.1M | ✅ | 190K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 67.3M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 94.3M | ✅ | 126K | 🟢 **-100%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 59.5M | ✅ | 122K | 🟢 **-100%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ✅ | 127K | 🟢 **-100%** |
| format.json | email format | 6 | ✅ | 36.4M | ✅ | 25.9M | 🟢 **-29%** |
| format.json | ipv4 format | 6 | ✅ | 154.8M | ✅ | 27.0M | 🟢 **-83%** |
| format.json | ipv6 format | 6 | ✅ | 90.6M | ✅ | 26.9M | 🟢 **-70%** |
| format.json | hostname format | 6 | ✅ | 157.2M | ✅ | 26.9M | 🟢 **-83%** |
| format.json | date-time format | 6 | ✅ | 90.6M | ✅ | 27.1M | 🟢 **-70%** |
| format.json | uri format | 6 | ✅ | 154.3M | ✅ | 27.0M | 🟢 **-83%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 29.7M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 69.0M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 58.4M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 15.7M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.5M | ✅ | 63K | 🟢 **-99%** |
| items.json | items with null instance elements | 1 | ✅ | 69.3M | ✅ | 26.3M | 🟢 **-62%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.9M | ✅ | 26.3M | 🟢 **-67%** |
| maxItems.json | maxItems validation | 4 | ✅ | 27.9M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 57.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.9M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 46.6M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 78.1M | ❌ | - | - |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 78.2M | ❌ | - | - |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 71.3M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 77.1M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 55.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 58.1M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 78.0M | ❌ | - | - |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 77.4M | ❌ | - | - |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 71.1M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.9M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 79.2M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 72.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 66.6M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 56.5M | ✅ | 48K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 72.0M | ✅ | 827K | 🟢 **-99%** |
| not.json | not | 2 | ✅ | 75.8M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 71.3M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 67.8M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 41.6M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 63.2M | ✅ | 70K | 🟢 **-100%** |
| not.json | double negation | 1 | ✅ | 88.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 73.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.2M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.4M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 75.8M | ✅ | 127K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 47.8M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.3M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.0M | ✅ | 127K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 53.2M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.8M | ✅ | 24.9M | -4% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.0M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.3M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.3M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.7M | ✅ | 25.6M | 🔴 **+30%** |
| properties.json | object properties validation | 6 | ✅ | 45.9M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.2M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 43.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.5M | ✅ | 25.8M | 🟢 **-63%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.3M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.9M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 41.1M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 34.4M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 74.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 20.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 42.2M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 45.8M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 43.8M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 74.5M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 33.6M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 55.4M | ❌ | - | - |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 35.3M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.6M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 76.9M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 71.1M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 34.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 34.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 33.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 20.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 30.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.9M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 88.9M | ✅ | 25.2M | 🟢 **-72%** |
| required.json | required with escaped characters | 2 | ✅ | 40.0M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 23.8M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 63.7M | ✅ | 77K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 68.2M | ✅ | 115K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 66.9M | ✅ | 105K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 55.7M | ✅ | 82K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 62.8M | ✅ | 82K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 64.9M | ✅ | 88K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 63.1M | ✅ | 79K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.3M | ✅ | 73K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 77.2M | ✅ | 127K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 70.8M | ✅ | 79K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 76.2M | ✅ | 109K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 34.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 79.0M | ✅ | 26.3M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.4M | ✅ | 25.4M | 🟢 **-63%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.8M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 84.7M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 87.7M | ✅ | 24.3M | 🟢 **-72%** |
| optional/bignum.json | string | 1 | ✅ | 66.4M | ✅ | 63K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 80.0M | ✅ | 25.3M | 🟢 **-68%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.2M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 80.1M | ✅ | 25.7M | 🟢 **-68%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 61.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.8M | ✅ | 119K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 30.9M | ✅ | 118K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.0M | ✅ | 120K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.7M | ✅ | 120K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.9M | ✅ | 90K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.0M | ✅ | 180K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 30.1M | ✅ | 121K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.5M | ✅ | 120K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.8M | ✅ | 321K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.5M | ✅ | 82K | 🟢 **-100%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 16.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 27.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.5M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 90.8M | ✅ | 26.4M | 🟢 **-71%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.8M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 27.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 31.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.4M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.5M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 18.8M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 150.5M | ✅ | 47.1M | 🟢 **-69%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 80.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ✅ | 42.7M | 🟢 **-74%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 41.7M | 🟢 **-48%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.8M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.3M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.9M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 41.7M | 🟢 **-49%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.6M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 37.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.9M | ✅ | 41.3M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 36.7M | 🟢 **-47%** |
| allOf.json | allOf | 4 | ✅ | 40.7M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.7M | ✅ | 5.4M | 🟢 **-96%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ✅ | 71K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 61K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 25.4M | 🟢 **-69%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.2M | ✅ | 4.8M | 🟢 **-97%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 76.6M | ✅ | 111K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 113K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 120K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 81.8M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.5M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 15.7M | 🟢 **-83%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.0M | ✅ | 18.1M | 🟢 **-88%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ✅ | 46K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.9M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ✅ | 10.5M | 🟢 **-88%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 119K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.7M | ✅ | 34.6M | 🟢 **-57%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ✅ | 72K | 🟢 **-100%** |
| const.json | const validation | 3 | ✅ | 80.1M | ✅ | 93K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 50.0M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.3M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 70.7M | ✅ | 124K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ✅ | 92K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ✅ | 92K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.6M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 68.2M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ✅ | 93K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ✅ | 186K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.0M | ✅ | 104K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.4M | ✅ | 123K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 125K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ✅ | 120K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ✅ | 124K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 95.1M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 62.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.3M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 26.7M | 🟢 **-65%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 31.2M | 🟢 **-71%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 27.3M | 🟢 **-51%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.6M | ✅ | 169K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.7M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.6M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 25.3M | 🟢 **-74%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.7M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 47.1M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 59.4M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.4M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 113.7M | ✅ | 86K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.6M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 111.8M | ✅ | 143K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 87K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 124.5M | ✅ | 179K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.1M | ✅ | 92K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 96.4M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.1M | ✅ | 93K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.5M | ✅ | 184K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 97.6M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 72.5M | ✅ | 183K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 98.7M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 122K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 141.8M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 161.3M | ✅ | 25.7M | 🟢 **-84%** |
| format.json | ipv4 format | 6 | ✅ | 92.7M | ✅ | 26.0M | 🟢 **-72%** |
| format.json | ipv6 format | 6 | ✅ | 162.4M | ✅ | 25.5M | 🟢 **-84%** |
| format.json | hostname format | 6 | ✅ | 92.9M | ✅ | 26.0M | 🟢 **-72%** |
| format.json | date-time format | 6 | ✅ | 162.7M | ✅ | 25.6M | 🟢 **-84%** |
| format.json | json-pointer format | 6 | ✅ | 92.9M | ✅ | 25.6M | 🟢 **-72%** |
| format.json | uri format | 6 | ✅ | 162.6M | ✅ | 25.3M | 🟢 **-84%** |
| format.json | uri-reference format | 6 | ✅ | 92.3M | ✅ | 25.9M | 🟢 **-72%** |
| format.json | uri-template format | 6 | ✅ | 162.8M | ✅ | 25.5M | 🟢 **-84%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.2M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 81.7M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 67.9M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.2M | ✅ | 25.1M | 🟢 **-85%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 67.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 84.5M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 25.6M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.8M | ✅ | 65K | 🟢 **-99%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 24.8M | 🟢 **-67%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 128.4M | ✅ | 24.9M | 🟢 **-81%** |
| maxItems.json | maxItems validation | 4 | ✅ | 78.9M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 78.8M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 61.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 75.4M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 63.8M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 125.5M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 73.3M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 127.4M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 67.1M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 77.8M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 82.3M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.9M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 123.5M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 123.9M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 70.8M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 94.8M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 46K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 107.8M | ✅ | 807K | 🟢 **-99%** |
| not.json | not | 2 | ✅ | 77.0M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 107.7M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 66.5M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 70.6M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.1M | ✅ | 68K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 89.1M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 89.7M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 152.8M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 66.5M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 39.3M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 65.9M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 152.6M | ✅ | 5.5M | 🟢 **-96%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 62K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 43K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.3M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 113.7M | ✅ | 122K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.5M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 65.7M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 123K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 73.5M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 24.8M | -2% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 30.3M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.3M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.1M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 23.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 24.9M | 🔴 **+38%** |
| properties.json | object properties validation | 6 | ✅ | 69.7M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 59.8M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.1M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 104.5M | ✅ | 24.9M | 🟢 **-76%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 51.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 163.9M | ✅ | 25.2M | 🟢 **-85%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.3M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 54.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 32.9M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 53.2M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 80.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 58.8M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.9M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.9M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.5M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.0M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 55.2M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 51.6M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.7M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.5M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 53.8M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.9M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.9M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 51.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 48.8M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 29.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 40.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 47.0M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 40.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 64.9M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 24.5M | 🟢 **-73%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 23.4M | 🟢 **-74%** |
| required.json | required with escaped characters | 2 | ✅ | 53.5M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 67.2M | ✅ | 83K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 101K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 102K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 81K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 64.2M | ✅ | 80K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 86K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.2M | ✅ | 78K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.4M | ✅ | 71K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 123K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 72.3M | ✅ | 77K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 77.3M | ✅ | 104K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.8M | ✅ | 25.0M | 🟢 **-73%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 24.8M | 🟢 **-65%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 23.6M | 🟢 **-73%** |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 61K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 25.0M | 🟢 **-68%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.1M | ✅ | 24.8M | 🟢 **-68%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 36.5M | ✅ | 113K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 113K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 114K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 115K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 86K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 171K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.7M | ✅ | 114K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ✅ | 114K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.2M | ✅ | 307K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.6M | ✅ | 80K | 🟢 **-100%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.4M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 42.5M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.5M | ✅ | 24.3M | 🟢 **-73%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.0M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 37.9M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 47.5M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 47.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 30.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.2M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.7M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 29.9M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.1M | ✅ | 47.1M | 🟢 **-69%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 64.3M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 163.1M | ✅ | 31.5M | 🟢 **-81%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 41.3M | 🟢 **-44%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.2M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.5M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ✅ | 42.1M | 🟢 **-43%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.0M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.1M | ✅ | 41.8M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 26.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 42.4M | 🟢 **-39%** |
| allOf.json | allOf | 4 | ✅ | 36.8M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 66.3M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 53.0M | ✅ | 5.6M | 🟢 **-89%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 92.5M | ✅ | 68K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 60.9M | ✅ | 65K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 152.8M | ✅ | 24.8M | 🟢 **-84%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 73.4M | ✅ | 4.5M | 🟢 **-94%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 117.8M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 68.7M | ✅ | 114K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 120K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 56.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 128.4M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 152.8M | ✅ | 16.8M | 🟢 **-89%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 73.5M | ✅ | 16.5M | 🟢 **-77%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 92.4M | ✅ | 47K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.4M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.5M | ✅ | 9.7M | 🟢 **-94%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 119K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 170.1M | ✅ | 26.3M | 🟢 **-85%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 57.9M | ✅ | 67K | 🟢 **-100%** |
| const.json | const validation | 3 | ✅ | 133.1M | ✅ | 89K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 37.5M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 83.9M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 38.7M | ✅ | 117K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 77.8M | ✅ | 90K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 68.5M | ✅ | 90K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 96.3M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 61.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 95.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 48.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 97.9M | ✅ | 89K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 67.1M | ✅ | 177K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 110.5M | ✅ | 100K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 66.7M | ✅ | 117K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 91.2M | ✅ | 118K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.3M | ✅ | 115K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 93.6M | ✅ | 118K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 59.2M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 87.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 65.2M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 106.4M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 38.8M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 101.1M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 22.4M | 🟢 **-68%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 24.6M | 🟢 **-77%** |
| default.json | invalid string value for default | 2 | ✅ | 51.4M | ✅ | 24.1M | 🟢 **-53%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.7M | ✅ | 162K | 🟢 **-100%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.1M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 84.9M | ✅ | 24.7M | 🟢 **-71%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 40.0M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 44.8M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 86.4M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.3M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 25.2M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 68.7M | ✅ | 86K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.2M | ✅ | 144K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 15.9M | ✅ | 88K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.8M | ✅ | 176K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.4M | ✅ | 93K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.4M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.7M | ✅ | 93K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.2M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 109.9M | ✅ | 183K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 62.8M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 109.9M | ✅ | 183K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.8M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 121K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 65.2M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.4M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 81.9M | ✅ | 26.8M | 🟢 **-67%** |
| format.json | idn-email format | 6 | ✅ | 161.8M | ✅ | 28.3M | 🟢 **-82%** |
| format.json | regex format | 6 | ✅ | 79.7M | ✅ | 26.6M | 🟢 **-67%** |
| format.json | ipv4 format | 6 | ✅ | 157.2M | ✅ | 28.2M | 🟢 **-82%** |
| format.json | ipv6 format | 6 | ✅ | 82.0M | ✅ | 26.5M | 🟢 **-68%** |
| format.json | idn-hostname format | 6 | ✅ | 162.8M | ✅ | 28.2M | 🟢 **-83%** |
| format.json | hostname format | 6 | ✅ | 82.1M | ✅ | 26.5M | 🟢 **-68%** |
| format.json | date format | 6 | ✅ | 163.3M | ✅ | 26.6M | 🟢 **-84%** |
| format.json | date-time format | 6 | ✅ | 75.0M | ✅ | 28.2M | 🟢 **-62%** |
| format.json | time format | 6 | ✅ | 162.2M | ✅ | 26.4M | 🟢 **-84%** |
| format.json | json-pointer format | 6 | ✅ | 81.9M | ✅ | 28.2M | 🟢 **-66%** |
| format.json | relative-json-pointer format | 6 | ✅ | 161.7M | ✅ | 26.5M | 🟢 **-84%** |
| format.json | iri format | 6 | ✅ | 79.6M | ✅ | 28.2M | 🟢 **-65%** |
| format.json | iri-reference format | 6 | ✅ | 147.0M | ✅ | 26.5M | 🟢 **-82%** |
| format.json | uri format | 6 | ✅ | 81.5M | ✅ | 26.5M | 🟢 **-67%** |
| format.json | uri-reference format | 6 | ✅ | 162.6M | ✅ | 28.2M | 🟢 **-83%** |
| format.json | uri-template format | 6 | ✅ | 75.6M | ✅ | 26.5M | 🟢 **-65%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 159.9M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 83.5M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 164.4M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 70.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 121.4M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 65.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 164.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 69.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 113.4M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 56.4M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 50.5M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 107.3M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 83.5M | ✅ | 26.3M | 🟢 **-69%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 59.8M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.2M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 11.9M | ✅ | 60K | 🟢 **-99%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 27.1M | 🟢 **-61%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 25.8M | 🟢 **-65%** |
| maxItems.json | maxItems validation | 4 | ✅ | 69.7M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.3M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 55.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.0M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 45.8M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.0M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.1M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 69.0M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 71.2M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.4M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 52.6M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.4M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 55.6M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.8M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 66.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 61.6M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 46K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ✅ | 827K | 🟢 **-99%** |
| not.json | not | 2 | ✅ | 70.1M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 64.3M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 62.6M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 48.5M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.9M | ✅ | 67K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 58.0M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.3M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 80.8M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 61.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.4M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.5M | ✅ | 61K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.8M | ✅ | 5.5M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.7M | ✅ | 61K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.6M | ✅ | 44K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.3M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.1M | ✅ | 123K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.9M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.8M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.2M | ✅ | 123K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 51.6M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.7M | ✅ | 25.3M | 🔴 **+22%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.7M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.5M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 24.8M | 🔴 **+39%** |
| properties.json | object properties validation | 6 | ✅ | 51.5M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.9M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 47.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.4M | ✅ | 25.4M | 🟢 **-61%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.5M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.5M | ✅ | 24.7M | 🟢 **-70%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.0M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.3M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.6M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.6M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.7M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.7M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 43.7M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 37.2M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.0M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.4M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.7M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.8M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.3M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 43.5M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 43.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.1M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.2M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 42.3M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 39.3M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.9M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 38.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.6M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 45.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 42.3M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 40.7M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 30.5M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 41.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 37.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 43.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 38.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 59.7M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 25.3M | 🟢 **-69%** |
| required.json | required with empty array | 1 | ✅ | 80.7M | ✅ | 24.9M | 🟢 **-69%** |
| required.json | required with escaped characters | 2 | ✅ | 48.0M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 60.1M | ✅ | 85K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 62.4M | ✅ | 102K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 61.1M | ✅ | 100K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 54.7M | ✅ | 79K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 57.8M | ✅ | 79K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 58.2M | ✅ | 85K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 59.2M | ✅ | 77K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 59.8M | ✅ | 71K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 69.6M | ✅ | 120K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 65.6M | ✅ | 85K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 70.0M | ✅ | 105K | 🟢 **-100%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.6M | ✅ | 25.0M | 🟢 **-68%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.3M | ✅ | 25.2M | 🟢 **-60%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.7M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.4M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 79.8M | ✅ | 24.1M | 🟢 **-70%** |
| optional/bignum.json | string | 1 | ✅ | 58.0M | ✅ | 61K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 24.1M | 🟢 **-67%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.7M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 25.5M | 🟢 **-65%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 354K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.8M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 426K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.9M | ✅ | 115K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.3M | ✅ | 114K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 116K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.4M | ✅ | 116K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.7M | ✅ | 87K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.4M | ✅ | 171K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.6M | ✅ | 115K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.4M | ✅ | 116K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.4M | ✅ | 311K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.4M | ✅ | 80K | 🟢 **-100%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.9M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.9M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.4M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.3M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.2M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.1M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 19.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 9.3M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.4M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.0M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.3M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 31.4M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 68.2M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 39.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.6M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.2M | ✅ | 25.2M | 🟢 **-68%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 15.4M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 35.2M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 53.9M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 55.4M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.6M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.1M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 14.5M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 34.8M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.2M | ✅ | 48.0M | 🟢 **-69%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 61.0M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.3M | ✅ | 42.0M | 🟢 **-74%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 67.2M | ✅ | 69.5M | +3% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 53.5M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 39.9M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.1M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 66.0M | ✅ | 43.7M | 🟢 **-34%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.7M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 46.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 30.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.3M | ✅ | 43.9M | 🟢 **-71%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 26.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 43.6M | 🟢 **-37%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.1M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.2M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 35.6M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.2M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 60.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ✅ | 5.7M | 🟢 **-96%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 55.8M | ✅ | 73K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 60K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.2M | ✅ | 20.2M | 🟢 **-72%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.0M | ✅ | 4.8M | 🟢 **-97%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 63.3M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 115K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 119K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.9M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 63.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.8M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 44.4M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 63.8M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 59.0M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 32.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 73.2M | ✅ | 15.2M | 🟢 **-79%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 73.2M | ✅ | 17.1M | 🟢 **-77%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 56.2M | ✅ | 47K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 44.7M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 68.2M | ✅ | 10.3M | 🟢 **-85%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 119K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 59.6M | ✅ | 28.1M | 🟢 **-53%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 50.0M | ✅ | 68K | 🟢 **-100%** |
| const.json | const validation | 3 | ✅ | 51.7M | ✅ | 89K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 37.3M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 47.8M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 64.7M | ✅ | 120K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 60.0M | ✅ | 90K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 61.7M | ✅ | 89K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 55.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 55.9M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.5M | ✅ | 90K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 60.1M | ✅ | 181K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.9M | ✅ | 99K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 61.0M | ✅ | 116K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ✅ | 119K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.9M | ✅ | 113K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 118K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 54.9M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 53.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 59.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 59.1M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 36.5M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 58.4M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 64.6M | ✅ | 23.5M | 🟢 **-64%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 75.8M | ✅ | 28.2M | 🟢 **-63%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 76.0M | ✅ | 26.5M | 🟢 **-65%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 60.1M | ✅ | 28.7M | 🟢 **-52%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 61.2M | ✅ | 27.4M | 🟢 **-55%** |
| default.json | invalid type for default | 2 | ✅ | 58.1M | ✅ | 25.8M | 🟢 **-56%** |
| default.json | invalid string value for default | 2 | ✅ | 46.4M | ✅ | 24.9M | 🟢 **-46%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 46.1M | ✅ | 169K | 🟢 **-100%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 54.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 75.5M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.3M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.5M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 47.3M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 47.4M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 36.5M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 33.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 31.7M | ✅ | 86K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.4M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 60.2M | ✅ | 143K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.2M | ✅ | 87K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 63.4M | ✅ | 177K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 52.6M | ✅ | 92K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.1M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 59.9M | ✅ | 92K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 49.6M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 60.7M | ✅ | 185K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.6M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 59.8M | ✅ | 185K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.1M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 52.9M | ✅ | 121K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 28.4M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 66.7M | ✅ | 25.6M | 🟢 **-62%** |
| format.json | idn-email format | 6 | ✅ | 69.6M | ✅ | 28.3M | 🟢 **-59%** |
| format.json | regex format | 6 | ✅ | 61.2M | ✅ | 26.3M | 🟢 **-57%** |
| format.json | ipv4 format | 6 | ✅ | 62.4M | ✅ | 27.5M | 🟢 **-56%** |
| format.json | ipv6 format | 6 | ✅ | 62.4M | ✅ | 26.7M | 🟢 **-57%** |
| format.json | idn-hostname format | 6 | ✅ | 62.3M | ✅ | 28.4M | 🟢 **-54%** |
| format.json | hostname format | 6 | ✅ | 33.2M | ✅ | 26.8M | -19% |
| format.json | date format | 6 | ✅ | 60.9M | ✅ | 28.1M | 🟢 **-54%** |
| format.json | date-time format | 6 | ✅ | 61.3M | ✅ | 24.7M | 🟢 **-60%** |
| format.json | time format | 6 | ✅ | 62.3M | ✅ | 26.7M | 🟢 **-57%** |
| format.json | json-pointer format | 6 | ✅ | 60.0M | ✅ | 28.2M | 🟢 **-53%** |
| format.json | relative-json-pointer format | 6 | ✅ | 62.1M | ✅ | 25.4M | 🟢 **-59%** |
| format.json | iri format | 6 | ✅ | 61.1M | ✅ | 28.2M | 🟢 **-54%** |
| format.json | iri-reference format | 6 | ✅ | 62.2M | ✅ | 26.8M | 🟢 **-57%** |
| format.json | uri format | 6 | ✅ | 62.4M | ✅ | 28.2M | 🟢 **-55%** |
| format.json | uri-reference format | 6 | ✅ | 62.4M | ✅ | 26.6M | 🟢 **-57%** |
| format.json | uri-template format | 6 | ✅ | 59.4M | ✅ | 28.4M | 🟢 **-52%** |
| format.json | uuid format | 6 | ✅ | 62.3M | ✅ | 26.2M | 🟢 **-58%** |
| format.json | duration format | 6 | ✅ | 62.1M | ✅ | 28.3M | 🟢 **-54%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 52.5M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 54.0M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 68.3M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 55.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 60.9M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 55.9M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 35.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 50.3M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 58.6M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 38.0M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.0M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 46.5M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 57.8M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 75.0M | ✅ | 26.4M | 🟢 **-65%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 60.2M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 53.0M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.6M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 59K | 🟢 **-100%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 63.3M | ✅ | 27.4M | 🟢 **-57%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 67.3M | ✅ | 26.2M | 🟢 **-61%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 75.1M | ✅ | 28.0M | 🟢 **-63%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.1M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 56.5M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 51.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 65.0M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 61.1M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 51.2M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 50.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.6M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.3M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 64.1M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 63.1M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 75.3M | ✅ | 26.6M | 🟢 **-65%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 55.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 53.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 56.3M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 49.0M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 47.4M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 75.2M | ✅ | 26.5M | 🟢 **-65%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 59.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 65.1M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 61.2M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 50.5M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.4M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 51.8M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 44.1M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 64.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 60.7M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 63.8M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 61.1M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 56.7M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 50.4M | ✅ | 46K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 61.3M | ✅ | 828K | 🟢 **-99%** |
| not.json | not | 2 | ✅ | 64.0M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 58.1M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 56.3M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 45.3M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 50.2M | ✅ | 69K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 50.2M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 71.2M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 73.0M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 57.1M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 56.0M | ✅ | 61K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 73.2M | ✅ | 6.0M | 🟢 **-92%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 56.1M | ✅ | 61K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 56.1M | ✅ | 44K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.7M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 62.6M | ✅ | 122K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 43.0M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 61.1M | ✅ | 120K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 48.8M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 13.6M | ✅ | 25.4M | 🔴 **+87%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.5M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.6M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 10.9M | ✅ | 25.6M | 🔴 **+135%** |
| properties.json | object properties validation | 6 | ✅ | 46.3M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.7M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.9M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.4M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 59.5M | ✅ | 25.8M | 🟢 **-57%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.1M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 36.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 75.2M | ✅ | 25.9M | 🟢 **-66%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.7M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 35.7M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 38.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 12.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.9M | ✅ | 2.8M | -3% |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 11.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.6M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.0M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.1M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.5M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 41.6M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 35.9M | ✅ | 121K | 🟢 **-100%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 39.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.5M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 73.2M | ✅ | 25.6M | 🟢 **-65%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 56.3M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.3M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 45.6M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 24.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 49.6M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.1M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.4M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 42.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 44.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 35.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 36.3M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 45.9M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 45.4M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.6M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.8M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 44.9M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 44.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 45.2M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 43.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 44.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.0M | ✅ | 121K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.0M | ✅ | 123K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 59.0M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.7M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 44.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 43.2M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 42.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 30.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 33.4M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 28.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 44.4M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.9M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 45.2M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 45.3M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 43.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 55.2M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 73.1M | ✅ | 22.0M | 🟢 **-70%** |
| required.json | required with empty array | 1 | ✅ | 73.0M | ✅ | 25.0M | 🟢 **-66%** |
| required.json | required with escaped characters | 2 | ✅ | 40.5M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.5M | ✅ | 85K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 56.1M | ✅ | 104K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 56.9M | ✅ | 104K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 50.9M | ✅ | 80K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 53.5M | ✅ | 80K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 55.4M | ✅ | 86K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 52.2M | ✅ | 78K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 55.0M | ✅ | 71K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 63.1M | ✅ | 122K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 78K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 63.6M | ✅ | 104K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 68.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 48.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 44.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 59.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 46.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 65.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 39.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 39.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 44.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 66.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 11.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 14.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 36.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 49.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 43.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 43.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 40.6M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.2M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 61.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 63.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 19.9M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 38.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 50.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 29.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 58.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 58.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 15.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 24.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 26.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 30.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 26.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 27.0M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 22.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 38.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 63.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 46.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 24.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.8M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 22.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 70.7M | ✅ | 25.8M | 🟢 **-64%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 60.6M | ✅ | 25.7M | 🟢 **-58%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 56.5M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 45.8M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 64.1M | ✅ | 121K | 🟢 **-100%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 51.1M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 71.0M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 70.0M | ✅ | 24.2M | 🟢 **-65%** |
| optional/bignum.json | string | 1 | ✅ | 54.3M | ✅ | 61K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 66.0M | ✅ | 25.7M | 🟢 **-61%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.4M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 65.3M | ✅ | 25.2M | 🟢 **-61%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 52.0M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.7M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 56.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 76.1M | ✅ | 25.8M | 🟢 **-66%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 31.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 42.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 47.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 51.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 37.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 25.4M | ✅ | 113K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.2M | ✅ | 114K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.8M | ✅ | 114K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.1M | ✅ | 114K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.3M | ✅ | 85K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 171K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.7M | ✅ | 114K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.3M | ✅ | 115K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.4M | ✅ | 308K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.5M | ✅ | 79K | 🟢 **-100%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 15.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.8M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.8M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.6M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 8.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 39.7M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.8M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 30.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.7M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.8M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 61.9M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.0M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 70.8M | ✅ | 25.2M | 🟢 **-64%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 32.6M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 54.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 45.5M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 45.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 45.9M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 63.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 45.5M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.7M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.9M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.3M | ✅ | 43.8M | 🟢 **-71%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ✅ | 41.6M | 🟢 **-40%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.5M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.9M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 38.8M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.1M | ✅ | 5.9M | 🟢 **-96%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 62.8M | ✅ | 78K | 🟢 **-100%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 91.7M | ✅ | 73K | 🟢 **-100%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 77.0M | ✅ | 27.1M | 🟢 **-65%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.2M | ✅ | 4.7M | 🟢 **-97%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.3M | ✅ | 155K | 🟢 **-100%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 159K | 🟢 **-100%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 121K | 🟢 **-100%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.3M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 45.1M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 75.8M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.2M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.1M | ✅ | 14.4M | 🟢 **-83%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.2M | ✅ | 12.3M | 🟢 **-86%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 62.9M | ✅ | 47K | 🟢 **-100%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.5M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.8M | ✅ | 10.1M | 🟢 **-87%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.8M | ✅ | 120K | 🟢 **-100%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 84.6M | ✅ | 28.0M | 🟢 **-67%** |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.7M | ✅ | 68K | 🟢 **-100%** |
| const.json | const validation | 3 | ✅ | 63.7M | ✅ | 89K | 🟢 **-100%** |
| const.json | const with object | 4 | ✅ | 38.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 56.3M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.6M | ✅ | 120K | 🟢 **-100%** |
| const.json | const with false does not match 0 | 3 | ✅ | 71.5M | ✅ | 91K | 🟢 **-100%** |
| const.json | const with true does not match 1 | 3 | ✅ | 70.6M | ✅ | 91K | 🟢 **-100%** |
| const.json | const with [false] does not match [0] | 3 | ✅ | 62.3M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 63.9M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 64.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 65.0M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.6M | ✅ | 90K | 🟢 **-100%** |
| const.json | const with 1 does not match true | 3 | ✅ | 70.2M | ✅ | 180K | 🟢 **-100%** |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 64.1M | ✅ | 100K | 🟢 **-100%** |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 61.3M | ✅ | 117K | 🟢 **-100%** |
| const.json | nul characters in strings | 2 | ✅ | 62.2M | ✅ | 121K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ✅ | 115K | 🟢 **-100%** |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.2M | ✅ | 121K | 🟢 **-100%** |
| contains.json | contains keyword validation | 6 | ✅ | 60.7M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 54.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 79.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 21.3M | 🟢 **-71%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 90.2M | ✅ | 26.3M | 🟢 **-71%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 88.8M | ✅ | 27.0M | 🟢 **-70%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 91.1M | ✅ | 27.6M | 🟢 **-70%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 72.0M | ✅ | 27.7M | 🟢 **-62%** |
| default.json | invalid type for default | 2 | ✅ | 67.7M | ✅ | 24.5M | 🟢 **-64%** |
| default.json | invalid string value for default | 2 | ✅ | 53.1M | ✅ | 24.6M | 🟢 **-54%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 50.9M | ✅ | 173K | 🟢 **-100%** |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 60.6M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 89.2M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 28.2M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 46.9M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 49.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 56.0M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.4M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 38.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 11.1M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 20.0M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 15.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 11.4M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 13.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 10.5M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 9.8M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 12.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 15.6M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 6.0M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.4M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.2M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.5M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.8M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 7.5M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.5M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 71.8M | ✅ | 86K | 🟢 **-100%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.3M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.2M | ✅ | 144K | 🟢 **-100%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 90K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 70.5M | ✅ | 182K | 🟢 **-100%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 72.0M | ✅ | 95K | 🟢 **-100%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.5M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 72.0M | ✅ | 95K | 🟢 **-100%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.8M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 71.2M | ✅ | 188K | 🟢 **-100%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.2M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.2M | ✅ | 189K | 🟢 **-100%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.3M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 61.4M | ✅ | 125K | 🟢 **-100%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 68.2M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 83.2M | ✅ | 26.6M | 🟢 **-68%** |
| format.json | idn-email format | 7 | ✅ | 90.0M | ✅ | 27.6M | 🟢 **-69%** |
| format.json | regex format | 7 | ✅ | 74.4M | ✅ | 27.6M | 🟢 **-63%** |
| format.json | ipv4 format | 7 | ✅ | 74.3M | ✅ | 27.5M | 🟢 **-63%** |
| format.json | ipv6 format | 7 | ✅ | 74.0M | ✅ | 27.3M | 🟢 **-63%** |
| format.json | idn-hostname format | 7 | ✅ | 74.0M | ✅ | 27.6M | 🟢 **-63%** |
| format.json | hostname format | 7 | ✅ | 72.6M | ✅ | 27.6M | 🟢 **-62%** |
| format.json | date format | 7 | ✅ | 74.5M | ✅ | 27.6M | 🟢 **-63%** |
| format.json | date-time format | 7 | ✅ | 79.3M | ✅ | 27.6M | 🟢 **-65%** |
| format.json | time format | 7 | ✅ | 73.8M | ✅ | 27.6M | 🟢 **-63%** |
| format.json | json-pointer format | 7 | ✅ | 74.3M | ✅ | 27.6M | 🟢 **-63%** |
| format.json | relative-json-pointer format | 7 | ✅ | 82.6M | ✅ | 27.7M | 🟢 **-66%** |
| format.json | iri format | 7 | ✅ | 74.5M | ✅ | 27.6M | 🟢 **-63%** |
| format.json | iri-reference format | 7 | ✅ | 68.8M | ✅ | 27.7M | 🟢 **-60%** |
| format.json | uri format | 7 | ✅ | 74.0M | ✅ | 27.5M | 🟢 **-63%** |
| format.json | uri-reference format | 7 | ✅ | 73.4M | ✅ | 26.3M | 🟢 **-64%** |
| format.json | uri-template format | 7 | ✅ | 74.4M | ✅ | 26.1M | 🟢 **-65%** |
| format.json | uuid format | 7 | ✅ | 74.2M | ✅ | 26.8M | 🟢 **-64%** |
| format.json | duration format | 7 | ✅ | 73.6M | ✅ | 27.5M | 🟢 **-63%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.9M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 88.6M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.8M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 73.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 72.7M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.5M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.9M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.9M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.7M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 52.1M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.6M | ✅ | 25.4M | 🟢 **-71%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.9M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 66K | 🟢 **-99%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 76.6M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 45.0M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 43.7M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 69.7M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 72.0M | ✅ | 26.3M | 🟢 **-63%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.5M | ✅ | 26.5M | 🟢 **-70%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 72.3M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.8M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 57.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 75.0M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.4M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 57.3M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.9M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.3M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.6M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.2M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.4M | ✅ | 27.1M | 🟢 **-69%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 68.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.4M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.5M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 58.6M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 56.6M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 88.6M | ✅ | 27.1M | 🟢 **-69%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 68.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 71.9M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.9M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 57.3M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.7M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 73.2M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 68.9M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 72.3M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 70.4M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 46K | 🟢 **-100%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.5M | ✅ | 831K | 🟢 **-99%** |
| not.json | not | 2 | ✅ | 73.3M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 68.0M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 66.0M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 51.9M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 62.1M | ✅ | 69K | 🟢 **-100%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.3M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 82.3M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 85.0M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.3M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 64.4M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 63.4M | ✅ | 63K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.2M | ✅ | 5.7M | 🟢 **-93%** |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 63K | 🟢 **-100%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.0M | ✅ | 45K | 🟢 **-100%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.5M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 125K | 🟢 **-100%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.4M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 48.0M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 70.1M | ✅ | 125K | 🟢 **-100%** |
| pattern.json | pattern validation | 8 | ✅ | 54.0M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.9M | ✅ | 26.7M | +7% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.8M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.8M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 26.7M | 🔴 **+49%** |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.6M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 62.7M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 75.7M | ✅ | 26.6M | 🟢 **-65%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 77.0M | ✅ | 26.4M | 🟢 **-66%** |
| properties.json | object properties validation | 6 | ✅ | 54.3M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 47.8M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 49.0M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 26.5M | 🟢 **-60%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.5M | ✅ | 26.9M | 🟢 **-70%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.4M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.0M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 38.1M | ✅ | 123K | 🟢 **-100%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.6M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 84.9M | ✅ | 26.6M | 🟢 **-69%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.9M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 24.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 54.8M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.2M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.3M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.0M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.0M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 52.2M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.5M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 44.5M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 72.7M | ✅ | 123K | 🟢 **-100%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 125K | 🟢 **-100%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.4M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 48.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 49.2M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 46.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 47.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.7M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 38.8M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 32.1M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 42.6M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 49.1M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 49.8M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 49.6M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 38.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 47.0M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 62.1M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 85.2M | ✅ | 26.6M | 🟢 **-69%** |
| required.json | required with empty array | 1 | ✅ | 85.1M | ✅ | 25.2M | 🟢 **-70%** |
| required.json | required with escaped characters | 2 | ✅ | 51.5M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.3M | ✅ | 86K | 🟢 **-100%** |
| type.json | number type matches numbers | 9 | ✅ | 66.6M | ✅ | 106K | 🟢 **-100%** |
| type.json | string type matches strings | 9 | ✅ | 62.8M | ✅ | 102K | 🟢 **-100%** |
| type.json | object type matches objects | 7 | ✅ | 56.8M | ✅ | 81K | 🟢 **-100%** |
| type.json | array type matches arrays | 7 | ✅ | 61.3M | ✅ | 79K | 🟢 **-100%** |
| type.json | boolean type matches booleans | 10 | ✅ | 60.9M | ✅ | 85K | 🟢 **-100%** |
| type.json | null type matches only the null object | 10 | ✅ | 63.0M | ✅ | 77K | 🟢 **-100%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 62.8M | ✅ | 71K | 🟢 **-100%** |
| type.json | type as array with one item | 2 | ✅ | 72.6M | ✅ | 124K | 🟢 **-100%** |
| type.json | type: array or object | 5 | ✅ | 67.8M | ✅ | 78K | 🟢 **-100%** |
| type.json | type: array, object or null | 5 | ✅ | 73.7M | ✅ | 104K | 🟢 **-100%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 58.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 54.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 68.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 51.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 77.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 40.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 58.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 48.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 49.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 44.9M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 23.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 86.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 68.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.0M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 56.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 34.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 83.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 13.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 16.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 16.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 19.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 24.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 31.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 28.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 11.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.2M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.9M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 6.9M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 77.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 50.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.7M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 43.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.5M | ✅ | 26.9M | 🟢 **-69%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.9M | ✅ | 26.8M | 🟢 **-61%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.3M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 53.2M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 72.5M | ✅ | 124K | 🟢 **-100%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 61.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 82.7M | ✅ | 24.2M | 🟢 **-71%** |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 62K | 🟢 **-100%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 72.9M | ✅ | 26.4M | 🟢 **-64%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.7M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.3M | ✅ | 26.2M | 🟢 **-63%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.2M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 80.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 62.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.3M | ✅ | 27.6M | 🟢 **-69%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 53.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 66.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.9M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.8M | ✅ | 115K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 16.4M | ✅ | 116K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 117K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.9M | ✅ | 117K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.2M | ✅ | 88K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.0M | ✅ | 174K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.7M | ✅ | 117K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.5M | ✅ | 117K | 🟢 **-100%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.6M | ✅ | 314K | 🟢 **-99%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 82K | 🟢 **-100%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.7M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 25.9M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 8.4M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 41.2M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 49.8M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 11.8M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.0M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.7M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.3M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 37.6M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 11.9M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.2M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.8M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 64.2M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 35.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.3M | ✅ | 26.4M | 🟢 **-68%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.4M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.8M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 16.4M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 33.5M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 61.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 50.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 53.2M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 51.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 70.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.0M | ❌ | - | - |
