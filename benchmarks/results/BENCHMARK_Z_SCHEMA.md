# tjs vs z-schema Benchmarks

Performance comparison of **tjs** vs **[z-schema](https://github.com/zaggino/z-schema)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | z-schema pass | z-schema ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.5M | 169/199 | 835K | 169 | 🟢 **-97%** |
| draft6 | 276 | ✅ 276 | 29.7M | 0/276 | - | 0 | - |
| draft7 | 313 | ✅ 313 | 15.9M | 0/313 | - | 0 | - |
| draft2019-09 | 435 | ✅ 435 | 19.8M | 28/435 | 517K | 28 | 🟢 **-97%** |
| draft2020-12 | 448 | ✅ 448 | 20.8M | 28/448 | 677K | 28 | 🟢 **-97%** |
| **Total** | 1671 | 1670/1671 | 20.7M | 225/1671 | 791K | 225 | 🟢 **-96%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **43.54x faster** (29 ns vs 1264 ns per test, 803 tests in 225 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 38.7M | ✅ | 576K | 🟢 **-99%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 81.3M | ✅ | 1.7M | 🟢 **-98%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 130.0M | ✅ | 1.7M | 🟢 **-99%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 99.5M | ✅ | 3.3M | 🟢 **-97%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 128.4M | ✅ | 2.0M | 🟢 **-98%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 34.5M | ✅ | 345K | 🟢 **-99%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 51.8M | ✅ | 627K | 🟢 **-99%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 56.6M | ✅ | 1.4M | 🟢 **-98%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 154.3M | ✅ | 3.7M | 🟢 **-98%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.6M | ✅ | 1.1M | 🟢 **-98%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 25.5M | ✅ | 822K | 🟢 **-97%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 33.3M | ✅ | 807K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 25.5M | ✅ | 795K | 🟢 **-97%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 140.7M | ✅ | 1.4M | 🟢 **-99%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.0M | ✅ | 391K | 🟢 **-99%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 42.5M | ✅ | 1.8M | 🟢 **-96%** |
| allOf.json | allOf | 4 | ✅ | 48.4M | ✅ | 444K | 🟢 **-99%** |
| allOf.json | allOf with base schema | 5 | ✅ | 22.7M | ✅ | 380K | 🟢 **-98%** |
| allOf.json | allOf simple types | 2 | ✅ | 111.3M | ✅ | 922K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 152.9M | ✅ | 3.1M | 🟢 **-98%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 2.5M | 🟢 **-98%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.5M | ✅ | 1.0M | 🟢 **-98%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 112.4M | ✅ | 963K | 🟢 **-99%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 48.1M | ✅ | 912K | 🟢 **-98%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 78.7M | ✅ | 342K | 🟢 **-100%** |
| anyOf.json | anyOf | 4 | ✅ | 54.4M | ✅ | 657K | 🟢 **-99%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 56.5M | ✅ | 574K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.9M | ✅ | 385K | 🟢 **-99%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 165.7M | ✅ | 2.7M | 🟢 **-98%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.2M | ✅ | 635K | 🟢 **-99%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 2.1M | 🟢 **-98%** |
| default.json | invalid string value for default | 2 | ✅ | 49.4M | ✅ | 1.9M | 🟢 **-96%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.9M | ✅ | 885K | 🟢 **-99%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ✅ | 126K | 🟢 **-99%** |
| dependencies.json | dependencies | 7 | ✅ | 88.2M | ✅ | 1.8M | 🟢 **-98%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 29.0M | ✅ | 839K | 🟢 **-97%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 57.3M | ✅ | 448K | 🟢 **-99%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.6M | ✅ | 711K | 🟢 **-96%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.0M | ✅ | 779K | 🟢 **-99%** |
| enum.json | simple enum validation | 2 | ✅ | 56.3M | ✅ | 1.7M | 🟢 **-97%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.2M | ✅ | 808K | 🟢 **-99%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 58.0M | ✅ | 2.1M | 🟢 **-96%** |
| enum.json | enums in properties | 6 | ✅ | 48.8M | ✅ | 643K | 🟢 **-99%** |
| enum.json | enum with escaped characters | 3 | ✅ | 49.0M | ✅ | 2.2M | 🟢 **-95%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 103.9M | ✅ | 1.2M | 🟢 **-99%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 47.7M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 102.4M | ✅ | 1.1M | 🟢 **-99%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.8M | ✅ | 998K | 🟢 **-98%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.6M | ✅ | 1.9M | 🟢 **-98%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.1M | ✅ | 1.4M | 🟢 **-97%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 112.4M | ✅ | 2.1M | 🟢 **-98%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.2M | ✅ | 1.4M | 🟢 **-97%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.1M | ✅ | 1.9M | 🟢 **-98%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 46.0M | ✅ | 1.9M | 🟢 **-96%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 90.5M | ✅ | 1.9M | 🟢 **-98%** |
| format.json | email format | 6 | ✅ | 72.9M | ✅ | 3.4M | 🟢 **-95%** |
| format.json | ipv4 format | 6 | ✅ | 158.1M | ✅ | 3.0M | 🟢 **-98%** |
| format.json | ipv6 format | 6 | ✅ | 77.2M | ✅ | 3.0M | 🟢 **-96%** |
| format.json | hostname format | 6 | ✅ | 157.9M | ✅ | 3.0M | 🟢 **-98%** |
| format.json | date-time format | 6 | ✅ | 73.2M | ✅ | 3.0M | 🟢 **-96%** |
| format.json | uri format | 6 | ✅ | 158.4M | ✅ | 3.0M | 🟢 **-98%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.9M | ✅ | 359K | 🟢 **-99%** |
| items.json | a schema given for items | 4 | ✅ | 87.3M | ✅ | 999K | 🟢 **-99%** |
| items.json | an array of schemas for items | 6 | ✅ | 54.1M | ✅ | 937K | 🟢 **-98%** |
| items.json | items and subitems | 6 | ✅ | 32.6M | ✅ | 237K | 🟢 **-99%** |
| items.json | nested items | 3 | ✅ | 13.1M | ✅ | 134K | 🟢 **-99%** |
| items.json | items with null instance elements | 1 | ✅ | 70.1M | ✅ | 2.1M | 🟢 **-97%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.0M | ✅ | 2.1M | 🟢 **-97%** |
| maxItems.json | maxItems validation | 4 | ✅ | 64.4M | ✅ | 1.8M | 🟢 **-97%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.5M | ✅ | 2.1M | 🟢 **-96%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 49.8M | ✅ | 1.6M | 🟢 **-97%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 39.4M | ✅ | 1.1M | 🟢 **-97%** |
| maximum.json | maximum validation | 4 | ✅ | 61.6M | ✅ | 1.5M | 🟢 **-98%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 60.7M | ✅ | 1.7M | 🟢 **-97%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 61.6M | ✅ | 1.4M | 🟢 **-98%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 53.2M | ✅ | 1.6M | 🟢 **-97%** |
| minItems.json | minItems validation | 4 | ✅ | 65.5M | ✅ | 1.8M | 🟢 **-97%** |
| minLength.json | minLength validation | 5 | ✅ | 47.4M | ✅ | 1.6M | 🟢 **-97%** |
| minProperties.json | minProperties validation | 6 | ✅ | 49.9M | ✅ | 2.0M | 🟢 **-96%** |
| minimum.json | minimum validation | 4 | ✅ | 61.8M | ✅ | 1.6M | 🟢 **-97%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 60.6M | ✅ | 1.5M | 🟢 **-98%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 52.7M | ✅ | 1.4M | 🟢 **-97%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.9M | ✅ | 1.8M | 🟢 **-97%** |
| multipleOf.json | by int | 3 | ✅ | 60.9M | ✅ | 1.4M | 🟢 **-98%** |
| multipleOf.json | by number | 3 | ✅ | 56.0M | ✅ | 1.2M | 🟢 **-98%** |
| multipleOf.json | by small number | 2 | ✅ | 51.4M | ✅ | 866K | 🟢 **-98%** |
| multipleOf.json | float division = inf | 1 | ✅ | 38.9M | ✅ | 772K | 🟢 **-98%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.5M | ✅ | 1.9M | 🟢 **-97%** |
| not.json | not | 2 | ✅ | 56.0M | ✅ | 814K | 🟢 **-99%** |
| not.json | not multiple types | 3 | ✅ | 49.5M | ✅ | 879K | 🟢 **-98%** |
| not.json | not more complex schema | 3 | ✅ | 52.4M | ✅ | 535K | 🟢 **-99%** |
| not.json | forbidden property | 2 | ✅ | 42.2M | ✅ | 864K | 🟢 **-98%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 40.4M | ✅ | 1.2M | 🟢 **-97%** |
| not.json | double negation | 1 | ✅ | 154.2M | ✅ | 1.4M | 🟢 **-99%** |
| oneOf.json | oneOf | 4 | ✅ | 46.2M | ✅ | 478K | 🟢 **-99%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 28.8M | ✅ | 574K | 🟢 **-98%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 37.2M | ✅ | 306K | 🟢 **-99%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.0M | ✅ | 761K | 🟢 **-99%** |
| oneOf.json | oneOf with required | 4 | ✅ | 38.0M | ✅ | 374K | 🟢 **-99%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 40.1M | ✅ | 366K | 🟢 **-99%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.5M | ✅ | 589K | 🟢 **-99%** |
| pattern.json | pattern validation | 8 | ✅ | 48.3M | ✅ | 2.1M | 🟢 **-96%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.1M | ✅ | 2.5M | 🟢 **-95%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ✅ | 738K | 🟢 **-97%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ✅ | 444K | 🟢 **-97%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.0M | ✅ | 641K | 🟢 **-96%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 1.3M | 🟢 **-93%** |
| properties.json | object properties validation | 6 | ✅ | 45.4M | ✅ | 759K | 🟢 **-98%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.1M | ✅ | 577K | 🟢 **-97%** |
| properties.json | properties with escaped characters | 2 | ✅ | 36.0M | ✅ | 189K | 🟢 **-99%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 1.7M | 🟢 **-97%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.5M | ✅ | 769K | 🟢 **-97%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.0M | ✅ | 733K | 🟢 **-98%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 45.9M | ✅ | 685K | 🟢 **-99%** |
| ref.json | escaped pointer ref | 6 | ✅ | 36.9M | ✅ | 714K | 🟢 **-98%** |
| ref.json | nested refs | 2 | ✅ | 43.5M | ✅ | 920K | 🟢 **-98%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 42.4M | ✅ | 879K | 🟢 **-98%** |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 53.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.2M | ✅ | 339K | 🟢 **-99%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 42.5M | ✅ | 744K | 🟢 **-98%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.5M | ✅ | 718K | 🟢 **-98%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 41.8M | ✅ | 717K | 🟢 **-98%** |
| ref.json | Location-independent identifier | 2 | ✅ | 56.0M | ✅ | 910K | 🟢 **-98%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 53.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 44.8M | ❌ | - | - |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 53.1M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.5M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.5M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.5M | ✅ | 926K | 🟢 **-98%** |
| refRemote.json | remote ref | 2 | ✅ | 53.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 34.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 51.8M | ✅ | 1.6M | 🟢 **-97%** |
| required.json | required default validation | 1 | ✅ | 154.3M | ✅ | 2.9M | 🟢 **-98%** |
| required.json | required with escaped characters | 2 | ✅ | 40.3M | ✅ | 484K | 🟢 **-99%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.3M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 41.7M | ✅ | 870K | 🟢 **-98%** |
| type.json | number type matches numbers | 9 | ✅ | 45.4M | ✅ | 1.0M | 🟢 **-98%** |
| type.json | string type matches strings | 9 | ✅ | 47.6M | ✅ | 1.0M | 🟢 **-98%** |
| type.json | object type matches objects | 7 | ✅ | 41.2M | ✅ | 929K | 🟢 **-98%** |
| type.json | array type matches arrays | 7 | ✅ | 44.3M | ✅ | 878K | 🟢 **-98%** |
| type.json | boolean type matches booleans | 10 | ✅ | 43.7M | ✅ | 965K | 🟢 **-98%** |
| type.json | null type matches only the null object | 10 | ✅ | 51.4M | ✅ | 859K | 🟢 **-98%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.6M | ✅ | 836K | 🟢 **-98%** |
| type.json | type as array with one item | 2 | ✅ | 52.3M | ✅ | 1.1M | 🟢 **-98%** |
| type.json | type: array or object | 5 | ✅ | 48.8M | ✅ | 832K | 🟢 **-98%** |
| type.json | type: array, object or null | 5 | ✅ | 55.0M | ✅ | 1.2M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ✅ | 1.1M | 🟢 **-93%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 27.9M | ✅ | 701K | 🟢 **-97%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.5M | ✅ | 710K | 🟢 **-96%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 144.4M | ✅ | 3.7M | 🟢 **-97%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.0M | ✅ | 1.3M | 🟢 **-98%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.1M | ✅ | 1.1M | 🟢 **-98%** |
| optional/bignum.json | integer | 2 | ✅ | 72.3M | ✅ | 2.5M | 🟢 **-97%** |
| optional/bignum.json | number | 2 | ✅ | 75.9M | ✅ | 2.5M | 🟢 **-97%** |
| optional/bignum.json | string | 1 | ✅ | 42.4M | ✅ | 1.0M | 🟢 **-98%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.2M | ✅ | 3.5M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.8M | ✅ | 860K | 🟢 **-98%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.2M | ✅ | 3.5M | 🟢 **-95%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.8M | ✅ | 864K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.7M | ✅ | 821K | 🟢 **-98%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.2M | ✅ | 827K | 🟢 **-95%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.2M | ✅ | 820K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.1M | ✅ | 819K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.1M | ✅ | 742K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.6M | ✅ | 1.0M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.3M | ✅ | 799K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.1M | ✅ | 815K | 🟢 **-97%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 31.0M | ✅ | 1.3M | 🟢 **-96%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.3M | ✅ | 670K | 🟢 **-97%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.6M | ✅ | 864K | 🟢 **-94%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.9M | ✅ | 903K | 🟢 **-93%** |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.5M | ✅ | 806K | 🟢 **-97%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.9M | ✅ | 648K | 🟢 **-96%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ✅ | 691K | 🟢 **-97%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 655K | 🟢 **-92%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.7M | ✅ | 415K | 🟢 **-98%** |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.6M | ✅ | 1.0M | 🟢 **-90%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.2M | ✅ | 1.1M | 🟢 **-97%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 73.9M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 36.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.4M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.4M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 39.0M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.3M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.9M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.9M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.5M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 57.4M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 48.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 34.7M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 29.8M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.2M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.0M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.6M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.4M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.7M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.8M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.7M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 184.1M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 88.5M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 50.2M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 48.8M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 117.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 58.7M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 107.7M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 44.5M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 92.7M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 114.4M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 53.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 110.2M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 54.9M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 77.5M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 55.2M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 51.4M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 55.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.7M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 57.0M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 50.4M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 38.3M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.7M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.8M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.9M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 39.8M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 85.5M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.8M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 48.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 31.9M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 57.2M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 58.4M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 55.4M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 70.3M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.1M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.4M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 52.3M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.3M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 104.5M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.5M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 81.4M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 162.3M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 87.9M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 163.1M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 87.2M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 162.9M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 81.2M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 163.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 88.3M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.4M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 55.7M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 108.9M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.9M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 62.1M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 34.7M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.7M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.0M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.7M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.8M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 40.2M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 68.9M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.1M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 52.9M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.2M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 53.8M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.2M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 66.2M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.7M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 68.6M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 63.7M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 56.7M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 62.9M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 56.0M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 46.1M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.9M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 48.8M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.4M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 159.3M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.8M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.1M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 41.0M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 52.6M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.4M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.7M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.2M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.6M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 11.4M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.8M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.1M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.2M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.9M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 57.2M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.1M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.1M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 57.4M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.8M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.0M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 59.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.1M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 58.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 30.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.2M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.5M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 40.2M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 46.5M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.0M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.1M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 159.2M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 44.4M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.8M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 48.1M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 55.7M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 64.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 155.6M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 68.6M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.8M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 47.6M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 76.6M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 17.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 18.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.5M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.7M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.3M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.5M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 43.1M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 41.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.0M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.9M | ❌ | - | - |

### draft7

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 56.5M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 43.5M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.3M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.3M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ❌ | - | - |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.1M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.4M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 66.5M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ❌ | - | - |
| allOf.json | allOf | 4 | ✅ | 34.1M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.1M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 51.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 52.2M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.4M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.6M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 66.5M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 158.9M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.5M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.3M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.4M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 176.2M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.2M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 50.6M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 49.7M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 45.7M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 116.9M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 60.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 107.4M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.2M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.3M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.6M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 92.9M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 52.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 57.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.7M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 108.2M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 78.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 103.3M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 58.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 104.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 59.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.9M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 128.8M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 66.5M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 71.3M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.3M | ❌ | - | - |
| definitions.json | validate definition against metaschema | 2 | ✅ | 13.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 59.3M | ❌ | - | - |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.5M | ❌ | - | - |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.7M | ❌ | - | - |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 39.9M | ❌ | - | - |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 50.2M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.6M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 37.7M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 41.4M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.8M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 71.3M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 58.4M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.0M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 59.4M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.2M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.1M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.4M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 60.4M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 55.2M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.7M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 56.7M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 87.4M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 88.3M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 87.9M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 87.7M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 86.4M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 87.4M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 87.7M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 86.8M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 88.3M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 85.5M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 85.0M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 88.0M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 87.9M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 88.2M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 88.1M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 88.1M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 88.2M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.2M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 70.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 62.3M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 169.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.7M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 60.1M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 65.0M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.2M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 70.6M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 61.8M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.9M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.5M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 58.8M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.7M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.7M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 43.1M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.9M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.1M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.0M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 52.8M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 55.1M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.9M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.6M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 64.0M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.1M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.7M | ❌ | - | - |
| not.json | not | 2 | ✅ | 62.9M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 56.1M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 59.3M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 46.1M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.0M | ❌ | - | - |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.0M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 184.0M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 159.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 59.6M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.5M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ❌ | - | - |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.0M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 44.8M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 49.6M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.3M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.9M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.9M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 49.7M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 41.8M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.9M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.2M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.8M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.6M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 41.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.3M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.2M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.1M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 47.2M | ❌ | - | - |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 58.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.1M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.3M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | Location-independent identifier | 2 | ✅ | 51.6M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 58.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.3M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.5M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 58.4M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 60.0M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 60.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 60.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 55.9M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 59.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 59.9M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 36.8M | ❌ | - | - |
| refRemote.json | remote ref with ref to definitions | 2 | ✅ | 49.3M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 47.3M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 39.5M | ❌ | - | - |
| refRemote.json | $ref to $ref finds location-independe... | 2 | ✅ | 46.9M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.7M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 158.8M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 159.1M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 44.1M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.0M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.1M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 62.8M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.1M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 55.6M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 62.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 158.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.5M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ❌ | - | - |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.5M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 27.1M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 345K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.3M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 429K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.9M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.6M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 24.6M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.5M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 56 | ✅ | 8.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.1M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.4M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.1M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.8M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.3M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.7M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.1M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 40.1M | ❌ | - | - |
| optional/id.json | non-schema object containing a plain-... | 2 | ✅ | 52.7M | ❌ | - | - |
| optional/id.json | non-schema object containing an $id p... | 2 | ✅ | 52.7M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.6M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.5M | ❌ | - | - |

### draft2019-09

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 25.6M | ❌ | - | - |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.9M | ❌ | - | - |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.7M | ❌ | - | - |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.8M | ❌ | - | - |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.7M | ❌ | - | - |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ❌ | - | - |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 88.6M | ✅ | 398K | 🟢 **-100%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 39.0M | ❌ | - | - |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 106.8M | ❌ | - | - |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.4M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.6M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 47.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.2M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 435K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.1M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.7M | ✅ | 433K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 34.4M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 38.4M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ✅ | 493K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 480K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.4M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.6M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 59.8M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 62.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 65.7M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 33.1M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.3M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.8M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 481K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.1M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 172.0M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.2M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 49.2M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 35.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 49.3M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 60.4M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 57.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 54.0M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.0M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 51.4M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 51.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.4M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.3M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.8M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 55.8M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.4M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 60.0M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 57.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 62.1M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 57.8M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.1M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 59.6M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.0M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.4M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.1M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 183.3M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 46.0M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.5M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.5M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 103.5M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 25.8M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 41.9M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 47.9M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.9M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.4M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.2M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 38.0M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 58.8M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.3M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 56.9M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.6M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.5M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.9M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.3M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 55.1M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.2M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 54.7M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 181.7M | ❌ | - | - |
| format.json | idn-email format | 6 | ✅ | 177.4M | ❌ | - | - |
| format.json | regex format | 6 | ✅ | 180.5M | ❌ | - | - |
| format.json | ipv4 format | 6 | ✅ | 175.2M | ❌ | - | - |
| format.json | ipv6 format | 6 | ✅ | 162.0M | ❌ | - | - |
| format.json | idn-hostname format | 6 | ✅ | 181.2M | ❌ | - | - |
| format.json | hostname format | 6 | ✅ | 181.7M | ❌ | - | - |
| format.json | date format | 6 | ✅ | 182.2M | ❌ | - | - |
| format.json | date-time format | 6 | ✅ | 182.2M | ❌ | - | - |
| format.json | time format | 6 | ✅ | 145.7M | ❌ | - | - |
| format.json | json-pointer format | 6 | ✅ | 180.6M | ❌ | - | - |
| format.json | relative-json-pointer format | 6 | ✅ | 182.5M | ❌ | - | - |
| format.json | iri format | 6 | ✅ | 182.6M | ❌ | - | - |
| format.json | iri-reference format | 6 | ✅ | 182.6M | ❌ | - | - |
| format.json | uri format | 6 | ✅ | 181.7M | ❌ | - | - |
| format.json | uri-reference format | 6 | ✅ | 177.6M | ❌ | - | - |
| format.json | uri-template format | 6 | ✅ | 182.8M | ❌ | - | - |
| format.json | uuid format | 6 | ✅ | 181.5M | ❌ | - | - |
| format.json | duration format | 6 | ✅ | 180.8M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.5M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 69.1M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 57.4M | ❌ | - | - |
| items.json | an array of schemas for items | 6 | ✅ | 65.4M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 60.5M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.5M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.5M | ❌ | - | - |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ❌ | - | - |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.2M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.5M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 59.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.6M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.0M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.9M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 35.2M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 69.1M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.9M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 59.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.5M | ✅ | 513K | 🟢 **-99%** |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.8M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 54.6M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.6M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 66.8M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 63.5M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ✅ | 511K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 62.9M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 56.1M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 46.1M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 45.8M | ✅ | 552K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.0M | ✅ | 577K | 🟢 **-99%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.6M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 159.7M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 53.4M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.1M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 497K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 491K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 487K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.9M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 41.3M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.9M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 52.4M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.9M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.4M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.2M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 42.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.7M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.3M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 14.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 13.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.3M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.4M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.1M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 40.6M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.2M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ✅ | 481K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.4M | ✅ | 438K | 🟢 **-98%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.4M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 55.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 41.8M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 58.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 59.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 59.2M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 62.3M | ❌ | - | - |
| ref.json | $ref with $recursiveAnchor | 2 | ✅ | 4.8M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 59.1M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.9M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 58.9M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 58.7M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 32.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 34.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 39.1M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 37.9M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 47.4M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 59.0M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 41.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 59.1M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 58.5M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 47.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 59.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 58.0M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 159.0M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 158.2M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 44.0M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 24.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 51.4M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 62.1M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 55.7M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 62.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 56.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 49.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 80.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 46.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 45.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 83.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ✅ | 414K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 52.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ✅ | 458K | 🟢 **-99%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 35.9M | ✅ | 422K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 34.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 65.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 14.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 61.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 32.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 17.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 26.9M | ✅ | 391K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 36.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 32.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.4M | ✅ | 442K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.5M | ✅ | 439K | 🟢 **-99%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.9M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.8M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.3M | ✅ | 467K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.1M | ✅ | 449K | 🟢 **-98%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 37.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.3M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 77.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.8M | ✅ | 435K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.3M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.8M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.3M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 514K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.1M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ✅ | 538K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.1M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ✅ | 527K | 🟢 **-99%** |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 28.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 173.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 35.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 41.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.8M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 19.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.4M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 20.6M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.3M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 25.4M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 37.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.3M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 12.7M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.5M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.1M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.2M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.3M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.1M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.2M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.8M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.4M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.9M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.1M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 60.0M | ✅ | 1.9M | 🟢 **-97%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.3M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.3M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.6M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | z-schema | z-schema ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 57.0M | ❌ | - | - |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.9M | ❌ | - | - |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.4M | ❌ | - | - |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 176.0M | ❌ | - | - |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 26.0M | ✅ | 547K | 🟢 **-98%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 60.1M | ❌ | - | - |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.4M | ❌ | - | - |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 35.6M | ✅ | 527K | 🟢 **-99%** |
| allOf.json | allOf | 4 | ✅ | 38.2M | ❌ | - | - |
| allOf.json | allOf with base schema | 5 | ✅ | 30.0M | ❌ | - | - |
| allOf.json | allOf simple types | 2 | ✅ | 66.7M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 174.5M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 55.0M | ✅ | 692K | 🟢 **-99%** |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 82.8M | ✅ | 692K | 🟢 **-99%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 176.9M | ❌ | - | - |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 174.8M | ❌ | - | - |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.2M | ❌ | - | - |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 125.5M | ❌ | - | - |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 71.9M | ❌ | - | - |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 87.5M | ❌ | - | - |
| anchor.json | Location-independent identifier | 2 | ✅ | 70.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 124.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 48.4M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 25.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 74.0M | ❌ | - | - |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.0M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 174.8M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 174.7M | ❌ | - | - |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 54.5M | ✅ | 664K | 🟢 **-99%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 52.9M | ❌ | - | - |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 191.2M | ❌ | - | - |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 70.3M | ❌ | - | - |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 198.7M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 48.4M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 54.0M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 37.9M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 50.2M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 70.6M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 63.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 63.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 58.6M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 60.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 56.0M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 55.2M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 73.1M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 28.7M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 66.5M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 60.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 55.0M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 61.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 63.5M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 60.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 64.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 62.1M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 41.7M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 65.3M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 89.0M | ❌ | - | - |
| content.json | validation of string-encoded content ... | 3 | ✅ | 197.7M | ❌ | - | - |
| content.json | validation of binary string-encoding | 3 | ✅ | 194.6M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 200.3M | ❌ | - | - |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 196.9M | ❌ | - | - |
| default.json | invalid type for default | 2 | ✅ | 69.8M | ❌ | - | - |
| default.json | invalid string value for default | 2 | ✅ | 54.1M | ❌ | - | - |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.7M | ❌ | - | - |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 62.2M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 196.1M | ❌ | - | - |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 24.9M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 43.8M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 50.5M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 52.1M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 42.4M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.5M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to a $dynamicAnchor in ... | 2 | ✅ | 13.0M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef to an $anchor in the sa... | 2 | ✅ | 17.8M | ❌ | - | - |
| dynamicRef.json | A $ref to a $dynamicAnchor in the sam... | 2 | ✅ | 14.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef resolves to the first $... | 2 | ✅ | 10.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without anchor in fragm... | 2 | ✅ | 11.9M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with intermediate scope... | 2 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.3M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 14.7M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 11.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.7M | ❌ | - | - |
| dynamicRef.json | multiple dynamic paths to the $dynami... | 4 | ✅ | 5.3M | ❌ | - | - |
| dynamicRef.json | after leaving a dynamic scope, it is ... | 3 | ✅ | 6.7M | ❌ | - | - |
| dynamicRef.json | strict-tree schema, guards against mi... | 2 | ✅ | 6.3M | ❌ | - | - |
| dynamicRef.json | tests for implementation dynamic anch... | 3 | ✅ | 8.7M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 8.9M | ❌ | - | - |
| dynamicRef.json | $ref and $dynamicAnchor are independe... | 3 | ✅ | 9.0M | ❌ | - | - |
| dynamicRef.json | $ref to $dynamicRef finds detached $d... | 2 | ✅ | 8.8M | ❌ | - | - |
| dynamicRef.json | $dynamicRef points to a boolean schema | 2 | ✅ | 27.4M | ❌ | - | - |
| dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.4M | ❌ | - | - |
| dynamicRef.json | $dynamicRef avoids the root of each s... | 2 | ✅ | 7.1M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 69.7M | ❌ | - | - |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.1M | ❌ | - | - |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.6M | ❌ | - | - |
| enum.json | enums in properties | 6 | ✅ | 39.0M | ❌ | - | - |
| enum.json | enum with escaped characters | 3 | ✅ | 76.7M | ❌ | - | - |
| enum.json | enum with false does not match 0 | 3 | ✅ | 63.7M | ❌ | - | - |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.1M | ❌ | - | - |
| enum.json | enum with true does not match 1 | 3 | ✅ | 65.1M | ❌ | - | - |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 59.5M | ❌ | - | - |
| enum.json | enum with 0 does not match false | 3 | ✅ | 72.2M | ❌ | - | - |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.3M | ❌ | - | - |
| enum.json | enum with 1 does not match true | 3 | ✅ | 72.0M | ❌ | - | - |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.9M | ❌ | - | - |
| enum.json | nul characters in strings | 2 | ✅ | 60.6M | ❌ | - | - |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.9M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 64.0M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 202.9M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 203.1M | ❌ | - | - |
| format.json | regex format | 7 | ✅ | 202.3M | ❌ | - | - |
| format.json | ipv4 format | 7 | ✅ | 202.6M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 202.0M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 197.9M | ❌ | - | - |
| format.json | hostname format | 7 | ✅ | 203.2M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 201.2M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 199.1M | ❌ | - | - |
| format.json | time format | 7 | ✅ | 201.6M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 203.2M | ❌ | - | - |
| format.json | relative-json-pointer format | 7 | ✅ | 196.2M | ❌ | - | - |
| format.json | iri format | 7 | ✅ | 201.8M | ❌ | - | - |
| format.json | iri-reference format | 7 | ✅ | 202.9M | ❌ | - | - |
| format.json | uri format | 7 | ✅ | 203.0M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 202.2M | ❌ | - | - |
| format.json | uri-template format | 7 | ✅ | 203.0M | ❌ | - | - |
| format.json | uuid format | 7 | ✅ | 193.1M | ❌ | - | - |
| format.json | duration format | 7 | ✅ | 201.7M | ❌ | - | - |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 191.1M | ❌ | - | - |
| if-then-else.json | ignore then without if | 2 | ✅ | 190.9M | ❌ | - | - |
| if-then-else.json | ignore else without if | 2 | ✅ | 190.9M | ❌ | - | - |
| if-then-else.json | if and then without else | 3 | ✅ | 74.6M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 75.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 67.2M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 186.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 69.9M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 69.4M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 49.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 42.8M | ❌ | - | - |
| items.json | a schema given for items | 4 | ✅ | 64.6M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 187.5M | ❌ | - | - |
| items.json | items with boolean schema (false) | 2 | ✅ | 66.5M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.5M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.5M | ❌ | - | - |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 84.4M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 50.9M | ❌ | - | - |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 50.3M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 68.9M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 83.0M | ❌ | - | - |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 188.9M | ❌ | - | - |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.2M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 62.7M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 56.0M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 81.7M | ❌ | - | - |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 68.8M | ❌ | - | - |
| maxLength.json | maxLength validation | 5 | ✅ | 64.5M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.7M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.2M | ❌ | - | - |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.9M | ❌ | - | - |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 45.2M | ❌ | - | - |
| maximum.json | maximum validation | 4 | ✅ | 74.1M | ❌ | - | - |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.7M | ❌ | - | - |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 191.0M | ❌ | - | - |
| minContains.json | minContains=1 with contains | 5 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 60.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 62.8M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 52.3M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 47.2M | ✅ | 662K | 🟢 **-99%** |
| minContains.json | minContains = 0 | 2 | ✅ | 186.8M | ❌ | - | - |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.9M | ❌ | - | - |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ❌ | - | - |
| minLength.json | minLength validation | 5 | ✅ | 59.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.6M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 58.2M | ❌ | - | - |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.7M | ❌ | - | - |
| minimum.json | minimum validation | 4 | ✅ | 75.4M | ❌ | - | - |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.7M | ❌ | - | - |
| multipleOf.json | by int | 3 | ✅ | 74.5M | ❌ | - | - |
| multipleOf.json | by number | 3 | ✅ | 68.9M | ❌ | - | - |
| multipleOf.json | by small number | 2 | ✅ | 61.2M | ❌ | - | - |
| multipleOf.json | float division = inf | 1 | ✅ | 46.6M | ✅ | 691K | 🟢 **-99%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 70.4M | ❌ | - | - |
| not.json | not | 2 | ✅ | 69.3M | ❌ | - | - |
| not.json | not multiple types | 3 | ✅ | 61.5M | ❌ | - | - |
| not.json | not more complex schema | 3 | ✅ | 62.9M | ❌ | - | - |
| not.json | forbidden property | 2 | ✅ | 50.3M | ❌ | - | - |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.4M | ✅ | 715K | 🟢 **-99%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 45.1M | ✅ | 742K | 🟢 **-98%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 197.4M | ❌ | - | - |
| not.json | double negation | 1 | ✅ | 174.9M | ❌ | - | - |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 58.3M | ❌ | - | - |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 56.0M | ✅ | 679K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 175.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 55.5M | ✅ | 674K | 🟢 **-99%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 55.3M | ✅ | 676K | 🟢 **-99%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.6M | ❌ | - | - |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 67.5M | ❌ | - | - |
| oneOf.json | oneOf with required | 4 | ✅ | 42.3M | ❌ | - | - |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.9M | ❌ | - | - |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 70.0M | ❌ | - | - |
| pattern.json | pattern validation | 8 | ✅ | 52.8M | ❌ | - | - |
| pattern.json | pattern is not anchored | 1 | ✅ | 52.0M | ❌ | - | - |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ❌ | - | - |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.6M | ❌ | - | - |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.3M | ❌ | - | - |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.9M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.7M | ❌ | - | - |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 67.3M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 64.6M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 90.2M | ❌ | - | - |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 90.7M | ❌ | - | - |
| properties.json | object properties validation | 6 | ✅ | 51.0M | ❌ | - | - |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.3M | ❌ | - | - |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 47.3M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 73.2M | ❌ | - | - |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 21.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 188.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 44.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ❌ | - | - |
| ref.json | relative pointer ref to object | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 42.4M | ❌ | - | - |
| ref.json | nested refs | 2 | ✅ | 40.8M | ❌ | - | - |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 38.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.2M | ❌ | - | - |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.3M | ❌ | - | - |
| ref.json | $ref to boolean schema true | 1 | ✅ | 174.5M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 54.8M | ✅ | 650K | 🟢 **-99%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 48.9M | ❌ | - | - |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.8M | ✅ | 554K | 🟢 **-98%** |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.6M | ❌ | - | - |
| ref.json | refs with relative uris and defs | 3 | ✅ | 35.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 67.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 39.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 35.2M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 48.5M | ❌ | - | - |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.4M | ❌ | - | - |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.3M | ❌ | - | - |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 55.6M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 54.7M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 52.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ❌ | - | - |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 69.6M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 52.3M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 55.2M | ❌ | - | - |
| refRemote.json | anchor within remote ref | 2 | ✅ | 53.8M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 51.1M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 31.0M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 29.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 41.5M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | remote ref with ref to defs | 2 | ✅ | 45.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.2M | ❌ | - | - |
| refRemote.json | retrieved nested refs resolve relativ... | 2 | ✅ | 44.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different $id | 2 | ✅ | 53.0M | ❌ | - | - |
| refRemote.json | remote HTTP ref with different URN $id | 2 | ✅ | 52.4M | ❌ | - | - |
| refRemote.json | remote HTTP ref with nested absolute ref | 2 | ✅ | 43.6M | ❌ | - | - |
| refRemote.json | $ref to $ref finds detached $anchor | 2 | ✅ | 55.1M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 68.2M | ❌ | - | - |
| required.json | required default validation | 1 | ✅ | 174.6M | ❌ | - | - |
| required.json | required with empty array | 1 | ✅ | 174.6M | ❌ | - | - |
| required.json | required with escaped characters | 2 | ✅ | 38.0M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 23.6M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 55.0M | ❌ | - | - |
| type.json | number type matches numbers | 9 | ✅ | 57.6M | ❌ | - | - |
| type.json | string type matches strings | 9 | ✅ | 57.8M | ❌ | - | - |
| type.json | object type matches objects | 7 | ✅ | 47.8M | ❌ | - | - |
| type.json | array type matches arrays | 7 | ✅ | 54.0M | ❌ | - | - |
| type.json | boolean type matches booleans | 10 | ✅ | 55.5M | ❌ | - | - |
| type.json | null type matches only the null object | 10 | ✅ | 50.0M | ❌ | - | - |
| type.json | multiple types can be specified in an... | 7 | ✅ | 54.7M | ❌ | - | - |
| type.json | type as array with one item | 2 | ✅ | 68.9M | ❌ | - | - |
| type.json | type: array or object | 5 | ✅ | 62.5M | ❌ | - | - |
| type.json | type: array, object or null | 5 | ✅ | 68.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 88.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 57.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 59.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 78.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 54.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 88.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 48.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 52.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 90.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 13.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 38.1M | ✅ | 520K | 🟢 **-99%** |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 57.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 51.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 52.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 42.9M | ✅ | 585K | 🟢 **-99%** |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 27.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 102.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 83.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.4M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 39.3M | ✅ | 560K | 🟢 **-99%** |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 57.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 40.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 35.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 189.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 67.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.9M | ✅ | 495K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 9.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.4M | ✅ | 578K | 🟢 **-98%** |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.7M | ✅ | 575K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.1M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.1M | ✅ | 567K | 🟢 **-98%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.2M | ✅ | 544K | 🟢 **-97%** |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 29.1M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 33.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 44.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.7M | ❌ | - | - |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 88.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 31.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.4M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 23.0M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 26.7M | ✅ | 563K | 🟢 **-98%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 43.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 165.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.3M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 56.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 68.3M | ❌ | - | - |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 91.1M | ❌ | - | - |
| optional/bignum.json | number | 2 | ✅ | 94.8M | ❌ | - | - |
| optional/bignum.json | string | 1 | ✅ | 52.8M | ✅ | 732K | 🟢 **-99%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 84.7M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.2M | ✅ | 734K | 🟢 **-99%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 85.0M | ❌ | - | - |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 49.9M | ✅ | 732K | 🟢 **-99%** |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 95.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.3M | ❌ | - | - |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 197.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.0M | ❌ | - | - |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 43.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 50.4M | ❌ | - | - |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 56.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 42.8M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 57.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.5M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.7M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.6M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.5M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ❌ | - | - |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.2M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.0M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 39.4M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 44.3M | ✅ | 738K | 🟢 **-98%** |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 12.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.4M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.7M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.4M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.1M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.6M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.9M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 77.9M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 38.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.9M | ❌ | - | - |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.1M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.9M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 22.9M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.7M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 38.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 66.0M | ✅ | 3.0M | 🟢 **-95%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 48.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 49.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 48.4M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 69.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.1M | ❌ | - | - |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 24.2M | ❌ | - | - |
