# tjs vs jsen Benchmarks

Performance comparison of **tjs** vs **[jsen](https://github.com/bugventure/jsen)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | jsen pass | jsen ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.7M | 170/199 | 14.8M | 170 | 🟢 **-44%** |
| draft6 | 276 | ✅ 276 | 29.9M | 182/276 | 15.2M | 182 | 🟢 **-49%** |
| draft7 | 313 | ✅ 313 | 15.4M | 193/313 | 17.0M | 193 | +10% |
| draft2019-09 | 435 | ✅ 435 | 17.9M | 227/435 | 17.9M | 227 | +0% |
| draft2020-12 | 448 | ✅ 448 | 18.9M | 213/448 | 18.3M | 213 | -3% |
| **Total** | 1671 | 1670/1671 | 19.5M | 985/1671 | 16.7M | 985 | -15% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.38x faster** (25 ns vs 60 ns per test, 3744 tests in 985 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.0M | ✅ | 5.9M | -16% |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 90.2M | ✅ | 61.3M | 🟢 **-32%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 134.2M | ✅ | 54.7M | 🟢 **-59%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 94.1M | ✅ | 70.8M | 🟢 **-25%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 123.1M | ✅ | 64.5M | 🟢 **-48%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 31.0M | ✅ | 35.7M | +15% |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 44.6M | ✅ | 41.9M | -6% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 72.9M | ✅ | 47.2M | 🟢 **-35%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 167.5M | ✅ | 68.9M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 36.0M | ✅ | 14.1M | 🟢 **-61%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 19.0M | ✅ | 18.3M | -4% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 29.7M | ✅ | 17.2M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.0M | ✅ | 31.2M | -8% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 82.6M | ✅ | 62.8M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 22.4M | ✅ | 26.7M | +19% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 51.8M | ✅ | 42.2M | -19% |
| allOf.json | allOf | 4 | ✅ | 37.4M | ✅ | 35.8M | -4% |
| allOf.json | allOf with base schema | 5 | ✅ | 23.5M | ✅ | 26.9M | +15% |
| allOf.json | allOf simple types | 2 | ✅ | 122.0M | ✅ | 47.8M | 🟢 **-61%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 89.8M | ✅ | 73.0M | -19% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 167.9M | ✅ | 73.1M | 🟢 **-56%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 77.1M | ✅ | 45.3M | 🟢 **-41%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 120.1M | ✅ | 46.1M | 🟢 **-62%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 73.4M | ✅ | 49.8M | 🟢 **-32%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.6M | ✅ | 22.2M | 🟢 **-74%** |
| anyOf.json | anyOf | 4 | ✅ | 79.6M | ✅ | 15.0M | 🟢 **-81%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 46.8M | ✅ | 18.4M | 🟢 **-61%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.1M | ✅ | 17.0M | 🟢 **-64%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 172.4M | ✅ | 15.5M | 🟢 **-91%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 77.4M | ✅ | 14.6M | 🟢 **-81%** |
| default.json | invalid type for default | 2 | ✅ | 112.0M | ✅ | 57.8M | 🟢 **-48%** |
| default.json | invalid string value for default | 2 | ✅ | 56.0M | ✅ | 42.0M | 🟢 **-25%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 67.4M | ✅ | 44.2M | 🟢 **-34%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.3M | ✅ | 5.3M | 🟢 **-53%** |
| dependencies.json | dependencies | 7 | ✅ | 87.1M | ✅ | 43.5M | 🟢 **-50%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.8M | ✅ | 37.0M | 🔴 **+20%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 50.8M | ✅ | 40.0M | 🟢 **-21%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 16.4M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.9M | ✅ | 30.8M | 🟢 **-21%** |
| enum.json | simple enum validation | 2 | ✅ | 71.8M | ✅ | 33.1M | 🟢 **-54%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 65.8M | ✅ | 3.0M | 🟢 **-95%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 65.2M | ✅ | 17.3M | 🟢 **-73%** |
| enum.json | enums in properties | 6 | ✅ | 14.9M | ✅ | 18.0M | 🔴 **+20%** |
| enum.json | enum with escaped characters | 3 | ✅ | 54.6M | ✅ | 21.7M | 🟢 **-60%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 46.1M | ✅ | 32.6M | 🟢 **-29%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 60.6M | ✅ | 10.8M | 🟢 **-82%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 116.8M | ✅ | 29.7M | 🟢 **-75%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 58.4M | ✅ | 10.7M | 🟢 **-82%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 123.8M | ✅ | 35.8M | 🟢 **-71%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.5M | ✅ | 5.5M | 🟢 **-92%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 127.1M | ✅ | 35.9M | 🟢 **-72%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 67.3M | ✅ | 10.6M | 🟢 **-84%** |
| enum.json | nul characters in strings | 2 | ✅ | 94.3M | ✅ | 25.8M | 🟢 **-73%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 59.5M | ✅ | 25.5M | 🟢 **-57%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 91.3M | ✅ | 27.5M | 🟢 **-70%** |
| format.json | email format | 6 | ✅ | 36.4M | ✅ | 65.4M | 🔴 **+80%** |
| format.json | ipv4 format | 6 | ✅ | 154.8M | ✅ | 39.5M | 🟢 **-74%** |
| format.json | ipv6 format | 6 | ✅ | 90.6M | ✅ | 66.4M | 🟢 **-27%** |
| format.json | hostname format | 6 | ✅ | 157.2M | ✅ | 66.6M | 🟢 **-58%** |
| format.json | date-time format | 6 | ✅ | 90.6M | ✅ | 66.3M | 🟢 **-27%** |
| format.json | uri format | 6 | ✅ | 154.3M | ✅ | 65.4M | 🟢 **-58%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 29.7M | ✅ | 33.2M | +12% |
| items.json | a schema given for items | 4 | ✅ | 69.0M | ✅ | 46.0M | 🟢 **-33%** |
| items.json | an array of schemas for items | 6 | ✅ | 58.4M | ✅ | 52.1M | -11% |
| items.json | items and subitems | 6 | ✅ | 15.7M | ✅ | 24.8M | 🔴 **+58%** |
| items.json | nested items | 3 | ✅ | 12.5M | ✅ | 9.1M | 🟢 **-27%** |
| items.json | items with null instance elements | 1 | ✅ | 69.3M | ✅ | 62.2M | -10% |
| items.json | array-form items with null instance e... | 1 | ✅ | 79.9M | ✅ | 65.0M | -19% |
| maxItems.json | maxItems validation | 4 | ✅ | 27.9M | ✅ | 52.6M | 🔴 **+88%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.3M | ✅ | 46.4M | -19% |
| maxProperties.json | maxProperties validation | 6 | ✅ | 55.9M | ✅ | 46.3M | -17% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 46.6M | ✅ | 33.8M | 🟢 **-27%** |
| maximum.json | maximum validation | 4 | ✅ | 69.0M | ✅ | 54.0M | 🟢 **-22%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 78.1M | ✅ | 53.4M | 🟢 **-32%** |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 78.2M | ✅ | 54.3M | 🟢 **-31%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 71.3M | ✅ | 47.1M | 🟢 **-34%** |
| minItems.json | minItems validation | 4 | ✅ | 77.1M | ✅ | 52.5M | 🟢 **-32%** |
| minLength.json | minLength validation | 5 | ✅ | 55.9M | ✅ | 43.9M | 🟢 **-21%** |
| minProperties.json | minProperties validation | 6 | ✅ | 58.1M | ✅ | 46.5M | -20% |
| minimum.json | minimum validation | 4 | ✅ | 78.0M | ✅ | 53.5M | 🟢 **-31%** |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 77.4M | ✅ | 53.7M | 🟢 **-31%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 71.1M | ✅ | 47.6M | 🟢 **-33%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 71.9M | ✅ | 54.2M | 🟢 **-25%** |
| multipleOf.json | by int | 3 | ✅ | 79.2M | ✅ | 51.9M | 🟢 **-34%** |
| multipleOf.json | by number | 3 | ✅ | 72.1M | ✅ | 6.1M | 🟢 **-92%** |
| multipleOf.json | by small number | 2 | ✅ | 66.6M | ✅ | 4.1M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 56.5M | ✅ | 4.4M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 72.0M | ❌ | - | - |
| not.json | not | 2 | ✅ | 75.8M | ✅ | 16.7M | 🟢 **-78%** |
| not.json | not multiple types | 3 | ✅ | 71.3M | ✅ | 22.9M | 🟢 **-68%** |
| not.json | not more complex schema | 3 | ✅ | 67.8M | ✅ | 16.9M | 🟢 **-75%** |
| not.json | forbidden property | 2 | ✅ | 41.6M | ✅ | 41.7M | +0% |
| not.json | forbid everything with empty schema | 9 | ✅ | 63.2M | ✅ | 31.7M | 🟢 **-50%** |
| not.json | double negation | 1 | ✅ | 88.1M | ✅ | 14.2M | 🟢 **-84%** |
| oneOf.json | oneOf | 4 | ✅ | 73.9M | ✅ | 16.4M | 🟢 **-78%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.2M | ✅ | 17.4M | 🟢 **-48%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.4M | ✅ | 17.4M | 🟢 **-59%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 75.8M | ✅ | 20.2M | 🟢 **-73%** |
| oneOf.json | oneOf with required | 4 | ✅ | 47.8M | ✅ | 16.7M | 🟢 **-65%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.3M | ✅ | 17.8M | 🟢 **-62%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.0M | ✅ | 14.6M | 🟢 **-81%** |
| pattern.json | pattern validation | 8 | ✅ | 53.2M | ✅ | 46.2M | -13% |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.8M | ✅ | 28.9M | +12% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.0M | ✅ | 19.6M | 🟢 **-22%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.3M | ✅ | 8.5M | 🟢 **-36%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 14.3M | ✅ | 13.3M | -7% |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.7M | ✅ | 19.0M | -3% |
| properties.json | object properties validation | 6 | ✅ | 45.9M | ✅ | 36.3M | 🟢 **-21%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 17.2M | ✅ | 8.0M | 🟢 **-54%** |
| properties.json | properties with escaped characters | 2 | ✅ | 43.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 70.5M | ✅ | 61.1M | -13% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.3M | ✅ | 15.9M | 🟢 **-29%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.9M | ✅ | 44.6M | +6% |
| ref.json | relative pointer ref to array | 2 | ✅ | 49.2M | ✅ | 42.3M | -14% |
| ref.json | escaped pointer ref | 6 | ✅ | 41.1M | ✅ | 40.0M | -3% |
| ref.json | nested refs | 2 | ✅ | 34.4M | ✅ | 52.4M | 🔴 **+52%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.1M | ✅ | 46.1M | -6% |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 74.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 20.5M | ✅ | 29.6M | 🔴 **+44%** |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 42.2M | ✅ | 44.9M | +6% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 45.8M | ✅ | 45.3M | -1% |
| ref.json | Recursive references between schemas | 2 | ✅ | 11.2M | ✅ | 5.5M | 🟢 **-51%** |
| ref.json | refs with quote | 2 | ✅ | 43.8M | ✅ | 45.4M | +4% |
| ref.json | Location-independent identifier | 2 | ✅ | 74.5M | ✅ | 51.6M | 🟢 **-31%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 33.6M | ✅ | 53.9M | 🔴 **+60%** |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 55.4M | ✅ | 6.9M | 🟢 **-87%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 35.3M | ✅ | 52.3M | 🔴 **+48%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 77.6M | ✅ | 50.5M | 🟢 **-35%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 76.9M | ✅ | 51.5M | 🟢 **-33%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 71.1M | ✅ | 51.3M | 🟢 **-28%** |
| refRemote.json | remote ref | 2 | ✅ | 34.6M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 34.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 33.6M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 27.2M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 33.5M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 33.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 20.1M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 30.8M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 57.9M | ✅ | 53.7M | -7% |
| required.json | required default validation | 1 | ✅ | 88.9M | ✅ | 62.9M | 🟢 **-29%** |
| required.json | required with escaped characters | 2 | ✅ | 40.0M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 23.8M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 63.7M | ✅ | 29.4M | 🟢 **-54%** |
| type.json | number type matches numbers | 9 | ✅ | 68.2M | ✅ | 46.8M | 🟢 **-31%** |
| type.json | string type matches strings | 9 | ✅ | 66.9M | ✅ | 47.0M | 🟢 **-30%** |
| type.json | object type matches objects | 7 | ✅ | 55.7M | ✅ | 38.8M | 🟢 **-30%** |
| type.json | array type matches arrays | 7 | ✅ | 62.8M | ✅ | 39.5M | 🟢 **-37%** |
| type.json | boolean type matches booleans | 10 | ✅ | 64.9M | ✅ | 42.9M | 🟢 **-34%** |
| type.json | null type matches only the null object | 10 | ✅ | 63.1M | ✅ | 39.4M | 🟢 **-38%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 63.3M | ✅ | 41.6M | 🟢 **-34%** |
| type.json | type as array with one item | 2 | ✅ | 77.2M | ✅ | 52.7M | 🟢 **-32%** |
| type.json | type: array or object | 5 | ✅ | 70.8M | ✅ | 42.6M | 🟢 **-40%** |
| type.json | type: array, object or null | 5 | ✅ | 76.2M | ✅ | 47.8M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.1M | ✅ | 2.0M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 34.6M | ✅ | 8.8M | 🟢 **-74%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 19.9M | ✅ | 11.0M | 🟢 **-45%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 79.0M | ✅ | 63.5M | -20% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.4M | ✅ | 58.8M | -14% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 59.8M | ✅ | 50.6M | -15% |
| optional/bignum.json | integer | 2 | ✅ | 84.7M | ✅ | 13.1M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 87.7M | ✅ | 72.0M | -18% |
| optional/bignum.json | string | 1 | ✅ | 66.4M | ✅ | 42.2M | 🟢 **-36%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 80.0M | ✅ | 67.7M | -15% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.2M | ✅ | 40.6M | 🟢 **-31%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 80.1M | ✅ | 68.3M | -15% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 61.5M | ✅ | 40.9M | 🟢 **-34%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.8M | ✅ | 24.8M | -11% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 30.9M | ✅ | 23.7M | 🟢 **-23%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.0M | ✅ | 23.8M | -18% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.7M | ✅ | 23.7M | 🟢 **-20%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.9M | ✅ | 23.4M | -19% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 27.0M | ✅ | 25.5M | -6% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 30.1M | ✅ | 23.4M | 🟢 **-22%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 29.5M | ✅ | 23.3M | 🟢 **-21%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.8M | ✅ | 28.3M | +6% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 31.5M | ✅ | 10.1M | 🟢 **-68%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 17.2M | ✅ | 11.5M | 🟢 **-33%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 16.2M | ✅ | 13.6M | -16% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 29.2M | ✅ | 24.2M | -17% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.7M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 21.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.3M | ✅ | 14.0M | -19% |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 16.9M | ✅ | 17.2M | +1% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 11.4M | 🔴 **+46%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.7M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 27.9M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ✅ | 7.3M | 🟢 **-35%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 44.5M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 90.8M | ✅ | 44.2M | 🟢 **-51%** |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.8M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 27.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 31.9M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.4M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.5M | ✅ | 12.5M | 🔴 **+67%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 18.8M | ✅ | 37.8M | 🔴 **+100%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 150.5M | ✅ | 62.0M | 🟢 **-59%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 80.8M | ✅ | 56.1M | 🟢 **-31%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.4M | ✅ | 71.3M | 🟢 **-57%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 80.8M | ✅ | 64.0M | 🟢 **-21%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 55.8M | ✅ | 29.0M | 🟢 **-48%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.3M | ✅ | 39.6M | -13% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.9M | ✅ | 44.9M | 🟢 **-58%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 81.0M | ✅ | 69.0M | -15% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.6M | ✅ | 13.2M | 🟢 **-72%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 22.4M | ✅ | 18.2M | -19% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.5M | ✅ | 16.3M | 🟢 **-62%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 37.0M | ✅ | 30.2M | -18% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.9M | ✅ | 63.3M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 29.9M | ✅ | 26.5M | -11% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 42.8M | 🟢 **-38%** |
| allOf.json | allOf | 4 | ✅ | 40.7M | ✅ | 35.5M | -13% |
| allOf.json | allOf with base schema | 5 | ✅ | 31.0M | ✅ | 26.9M | -13% |
| allOf.json | allOf simple types | 2 | ✅ | 72.8M | ✅ | 50.7M | 🟢 **-30%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.7M | ✅ | 74.6M | 🟢 **-51%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 66.1M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 81.0M | ✅ | 60.1M | 🟢 **-26%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.2M | ✅ | 74.7M | 🟢 **-51%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 76.6M | ✅ | 50.8M | 🟢 **-34%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 50.8M | 🟢 **-57%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 78.7M | ✅ | 50.0M | 🟢 **-36%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.4M | ✅ | 23.9M | 🟢 **-72%** |
| anyOf.json | anyOf | 4 | ✅ | 81.8M | ✅ | 15.0M | 🟢 **-82%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.5M | ✅ | 17.9M | 🟢 **-61%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 90.0M | ✅ | 16.6M | 🟢 **-82%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 152.0M | ✅ | 17.8M | 🟢 **-88%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 66.1M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 71.9M | ✅ | 14.9M | 🟢 **-79%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 84.2M | ✅ | 15.3M | 🟢 **-82%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 14.6M | 🟢 **-88%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 79.7M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 90.8M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 80.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 50.0M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 58.3M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 70.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 75.9M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 111.9M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 66.6M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 95.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 68.2M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 95.1M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 63.1M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 111.8M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 73.0M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 113.4M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 64.8M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 79.1M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 95.1M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 62.8M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 105.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 72.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 51.3M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 77.1M | ✅ | 49.9M | 🟢 **-35%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 32.2M | 🟢 **-70%** |
| default.json | invalid string value for default | 2 | ✅ | 55.2M | ✅ | 24.4M | 🟢 **-56%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 78.6M | ✅ | 44.2M | 🟢 **-44%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.7M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.6M | ✅ | 55.4M | 🟢 **-40%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 96.1M | ✅ | 30.9M | 🟢 **-68%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.7M | ✅ | 36.6M | -8% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 47.1M | ✅ | 40.1M | -15% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 59.4M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 38.4M | ✅ | 22.0M | 🟢 **-43%** |
| enum.json | simple enum validation | 2 | ✅ | 113.7M | ✅ | 35.2M | 🟢 **-69%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 46.6M | ✅ | 2.4M | 🟢 **-95%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 111.8M | ✅ | 15.2M | 🟢 **-86%** |
| enum.json | enums in properties | 6 | ✅ | 14.0M | ✅ | 20.0M | 🔴 **+43%** |
| enum.json | enum with escaped characters | 3 | ✅ | 124.5M | ✅ | 19.5M | 🟢 **-84%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 76.1M | ✅ | 30.5M | 🟢 **-60%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 96.4M | ✅ | 5.7M | 🟢 **-94%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 76.1M | ✅ | 29.9M | 🟢 **-61%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 95.5M | ✅ | 9.5M | 🟢 **-90%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 74.5M | ✅ | 30.2M | 🟢 **-59%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 97.6M | ✅ | 9.8M | 🟢 **-90%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 72.5M | ✅ | 30.2M | 🟢 **-58%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 98.7M | ✅ | 9.8M | 🟢 **-90%** |
| enum.json | nul characters in strings | 2 | ✅ | 64.8M | ✅ | 24.0M | 🟢 **-63%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 141.8M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 71.1M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 161.3M | ✅ | 45.3M | 🟢 **-72%** |
| format.json | ipv4 format | 6 | ✅ | 92.7M | ✅ | 68.4M | 🟢 **-26%** |
| format.json | ipv6 format | 6 | ✅ | 162.4M | ✅ | 68.8M | 🟢 **-58%** |
| format.json | hostname format | 6 | ✅ | 92.9M | ✅ | 68.6M | 🟢 **-26%** |
| format.json | date-time format | 6 | ✅ | 162.7M | ✅ | 68.1M | 🟢 **-58%** |
| format.json | json-pointer format | 6 | ✅ | 92.9M | ✅ | 71.9M | 🟢 **-23%** |
| format.json | uri format | 6 | ✅ | 162.6M | ✅ | 68.9M | 🟢 **-58%** |
| format.json | uri-reference format | 6 | ✅ | 92.3M | ✅ | 71.7M | 🟢 **-22%** |
| format.json | uri-template format | 6 | ✅ | 162.8M | ✅ | 71.9M | 🟢 **-56%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 44.2M | ✅ | 33.9M | 🟢 **-23%** |
| items.json | a schema given for items | 4 | ✅ | 81.7M | ✅ | 49.4M | 🟢 **-39%** |
| items.json | an array of schemas for items | 6 | ✅ | 67.9M | ✅ | 55.3M | -19% |
| items.json | items with boolean schema (true) | 2 | ✅ | 164.2M | ✅ | 71.6M | 🟢 **-56%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 67.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 84.5M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 25.6M | ✅ | 23.3M | -9% |
| items.json | nested items | 3 | ✅ | 12.8M | ✅ | 8.8M | 🟢 **-31%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 75.3M | ✅ | 61.7M | -18% |
| items.json | array-form items with null instance e... | 1 | ✅ | 128.4M | ✅ | 64.8M | 🟢 **-50%** |
| maxItems.json | maxItems validation | 4 | ✅ | 78.9M | ✅ | 53.6M | 🟢 **-32%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 78.8M | ✅ | 47.1M | 🟢 **-40%** |
| maxLength.json | maxLength validation | 5 | ✅ | 61.1M | ✅ | 46.5M | 🟢 **-24%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 75.4M | ✅ | 40.6M | 🟢 **-46%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 58.5M | ✅ | 46.9M | -20% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 63.8M | ✅ | 34.2M | 🟢 **-46%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ✅ | 33.1M | 🟢 **-33%** |
| maximum.json | maximum validation | 4 | ✅ | 125.5M | ✅ | 54.3M | 🟢 **-57%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 73.3M | ✅ | 54.3M | 🟢 **-26%** |
| minItems.json | minItems validation | 4 | ✅ | 127.4M | ✅ | 53.6M | 🟢 **-58%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 67.1M | ✅ | 47.2M | 🟢 **-30%** |
| minLength.json | minLength validation | 5 | ✅ | 77.8M | ✅ | 43.6M | 🟢 **-44%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.9M | ✅ | 40.6M | 🟢 **-29%** |
| minProperties.json | minProperties validation | 6 | ✅ | 82.3M | ✅ | 46.9M | 🟢 **-43%** |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 49.9M | ✅ | 34.9M | 🟢 **-30%** |
| minimum.json | minimum validation | 4 | ✅ | 123.5M | ✅ | 53.9M | 🟢 **-56%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 72.4M | ✅ | 55.5M | 🟢 **-23%** |
| multipleOf.json | by int | 3 | ✅ | 123.9M | ✅ | 55.6M | 🟢 **-55%** |
| multipleOf.json | by number | 3 | ✅ | 70.8M | ✅ | 6.2M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 94.8M | ✅ | 4.0M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 57.8M | ✅ | 4.2M | 🟢 **-93%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 107.8M | ❌ | - | - |
| not.json | not | 2 | ✅ | 77.0M | ✅ | 17.3M | 🟢 **-78%** |
| not.json | not multiple types | 3 | ✅ | 107.7M | ✅ | 22.6M | 🟢 **-79%** |
| not.json | not more complex schema | 3 | ✅ | 66.5M | ✅ | 17.0M | 🟢 **-74%** |
| not.json | forbidden property | 2 | ✅ | 70.6M | ✅ | 46.1M | 🟢 **-35%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 60.1M | ✅ | 39.5M | 🟢 **-34%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 89.1M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 89.7M | ✅ | 63.3M | 🟢 **-29%** |
| not.json | double negation | 1 | ✅ | 152.8M | ✅ | 14.2M | 🟢 **-91%** |
| oneOf.json | oneOf | 4 | ✅ | 66.5M | ✅ | 16.6M | 🟢 **-75%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 39.3M | ✅ | 18.3M | 🟢 **-53%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 65.9M | ✅ | 42.1M | 🟢 **-36%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 152.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 66.1M | ✅ | 36.0M | 🟢 **-46%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 92.5M | ✅ | 42.4M | 🟢 **-54%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 44.3M | ✅ | 18.0M | 🟢 **-59%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 113.7M | ✅ | 20.1M | 🟢 **-82%** |
| oneOf.json | oneOf with required | 4 | ✅ | 48.5M | ✅ | 17.4M | 🟢 **-64%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 65.7M | ✅ | 16.6M | 🟢 **-75%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 76.2M | ✅ | 14.5M | 🟢 **-81%** |
| pattern.json | pattern validation | 8 | ✅ | 73.5M | ✅ | 45.8M | 🟢 **-38%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 25.3M | ✅ | 29.0M | +15% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 30.3M | ✅ | 19.2M | 🟢 **-37%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.3M | ✅ | 10.5M | 🟢 **-31%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.1M | ✅ | 13.9M | -14% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 23.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 18.1M | ✅ | 17.3M | -4% |
| properties.json | object properties validation | 6 | ✅ | 69.7M | ✅ | 46.9M | 🟢 **-33%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.0M | ✅ | 7.7M | 🟢 **-59%** |
| properties.json | properties with boolean schema | 4 | ✅ | 59.8M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 51.1M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 104.5M | ✅ | 45.5M | 🟢 **-56%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 51.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.2M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 163.9M | ✅ | 50.5M | 🟢 **-69%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 51.3M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 54.5M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 43.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 32.9M | ✅ | 16.4M | 🟢 **-50%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 53.2M | ✅ | 45.2M | -15% |
| ref.json | relative pointer ref to array | 2 | ✅ | 80.5M | ✅ | 44.7M | 🟢 **-44%** |
| ref.json | escaped pointer ref | 6 | ✅ | 47.4M | ✅ | 40.1M | -15% |
| ref.json | nested refs | 2 | ✅ | 58.8M | ✅ | 53.1M | -10% |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 57.9M | ✅ | 46.9M | -19% |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 51.7M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.8M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 52.9M | ✅ | 45.9M | -13% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 54.5M | ✅ | 45.5M | -17% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 90.0M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 66.0M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.8M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 55.2M | ✅ | 45.1M | -18% |
| ref.json | Location-independent identifier | 2 | ✅ | 51.6M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 49.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 50.0M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 56.7M | ✅ | 5.6M | 🟢 **-90%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 34.5M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 34.5M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 43.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 53.8M | ✅ | 41.6M | 🟢 **-23%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 54.9M | ✅ | 46.1M | -16% |
| ref.json | URN base URI with r-component | 2 | ✅ | 48.0M | ✅ | 45.8M | -4% |
| ref.json | URN base URI with q-component | 2 | ✅ | 49.9M | ✅ | 47.1M | -6% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 49.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 43.9M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.7M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 53.2M | 🟢 **-31%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 77.0M | ✅ | 51.7M | 🟢 **-33%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 70.3M | ✅ | 50.5M | 🟢 **-28%** |
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
| required.json | required validation | 5 | ✅ | 64.9M | ✅ | 54.5M | -16% |
| required.json | required default validation | 1 | ✅ | 90.0M | ✅ | 63.1M | 🟢 **-30%** |
| required.json | required with empty array | 1 | ✅ | 90.0M | ✅ | 63.0M | 🟢 **-30%** |
| required.json | required with escaped characters | 2 | ✅ | 53.5M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 28.1M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 67.2M | ✅ | 29.8M | 🟢 **-56%** |
| type.json | number type matches numbers | 9 | ✅ | 69.6M | ✅ | 47.0M | 🟢 **-32%** |
| type.json | string type matches strings | 9 | ✅ | 69.3M | ✅ | 47.1M | 🟢 **-32%** |
| type.json | object type matches objects | 7 | ✅ | 58.9M | ✅ | 39.2M | 🟢 **-34%** |
| type.json | array type matches arrays | 7 | ✅ | 64.2M | ✅ | 40.1M | 🟢 **-38%** |
| type.json | boolean type matches booleans | 10 | ✅ | 66.5M | ✅ | 42.6M | 🟢 **-36%** |
| type.json | null type matches only the null object | 10 | ✅ | 66.2M | ✅ | 37.8M | 🟢 **-43%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 66.4M | ✅ | 41.2M | 🟢 **-38%** |
| type.json | type as array with one item | 2 | ✅ | 76.9M | ✅ | 52.6M | 🟢 **-32%** |
| type.json | type: array or object | 5 | ✅ | 72.3M | ✅ | 43.5M | 🟢 **-40%** |
| type.json | type: array, object or null | 5 | ✅ | 77.3M | ✅ | 48.5M | 🟢 **-37%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.9M | ✅ | 1.9M | 🟢 **-89%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.4M | ✅ | 7.9M | 🟢 **-76%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.9M | ✅ | 5.7M | 🟢 **-70%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 91.8M | ✅ | 66.1M | 🟢 **-28%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 71.8M | ✅ | 58.6M | -18% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 72.9M | ✅ | 51.5M | 🟢 **-29%** |
| optional/bignum.json | integer | 2 | ✅ | 88.5M | ✅ | 13.0M | 🟢 **-85%** |
| optional/bignum.json | number | 2 | ✅ | 88.7M | ✅ | 73.4M | -17% |
| optional/bignum.json | string | 1 | ✅ | 63.5M | ✅ | 41.4M | 🟢 **-35%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 78.9M | ✅ | 67.6M | -14% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 78.1M | ✅ | 49.8M | 🟢 **-36%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 59.9M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 36.5M | ✅ | 22.0M | 🟢 **-40%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.4M | ✅ | 25.1M | -14% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.6M | ✅ | 24.8M | -10% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.3M | ✅ | 25.0M | -12% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.7M | ✅ | 23.8M | -17% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.5M | ✅ | 26.3M | -1% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.7M | ✅ | 23.8M | -11% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.3M | ✅ | 25.0M | -12% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.2M | ✅ | 29.3M | +12% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.6M | ✅ | 23.2M | 🟢 **-24%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.2M | ✅ | 12.8M | -16% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.4M | ✅ | 13.4M | -13% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 28.3M | ✅ | 23.2M | -18% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.5M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.7M | ✅ | 13.6M | 🟢 **-34%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.2M | ✅ | 17.1M | -15% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 11.3M | 🔴 **+39%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.0M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 21.8M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 26.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 19.2M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 11.2M | ✅ | 7.2M | 🟢 **-36%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 42.5M | ❌ | - | - |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 12.1M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 32.7M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 88.5M | ✅ | 45.1M | 🟢 **-49%** |
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

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 29.9M | ✅ | 6.5M | 🟢 **-78%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 37.0M | ✅ | 37.4M | +1% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.1M | ✅ | 61.6M | 🟢 **-60%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 64.3M | ✅ | 55.9M | -13% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 163.1M | ✅ | 71.2M | 🟢 **-56%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 73.4M | ✅ | 64.3M | -12% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 54.2M | ✅ | 35.8M | 🟢 **-34%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 37.5M | ✅ | 41.5M | +11% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.8M | ✅ | 45.6M | 🟢 **-58%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 73.5M | ✅ | 67.2M | -8% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.0M | ✅ | 14.3M | 🟢 **-68%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.2M | ✅ | 18.4M | -13% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.1M | ✅ | 17.6M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 31.9M | ✅ | 31.0M | -3% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.1M | ✅ | 62.9M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 26.1M | ✅ | 27.5M | +5% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.5M | ✅ | 47.1M | 🟢 **-32%** |
| allOf.json | allOf | 4 | ✅ | 36.8M | ✅ | 35.6M | -3% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.7M | ✅ | 27.1M | -12% |
| allOf.json | allOf simple types | 2 | ✅ | 66.3M | ✅ | 52.4M | 🟢 **-21%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 53.0M | ✅ | 75.3M | 🔴 **+42%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 60.9M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 152.8M | ✅ | 63.1M | 🟢 **-59%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 73.4M | ✅ | 74.0M | +1% |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 117.8M | ✅ | 53.4M | 🟢 **-55%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 68.7M | ✅ | 52.6M | 🟢 **-23%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 119.9M | ✅ | 49.7M | 🟢 **-59%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 56.1M | ✅ | 23.9M | 🟢 **-57%** |
| anyOf.json | anyOf | 4 | ✅ | 128.4M | ✅ | 15.0M | 🟢 **-88%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.1M | ✅ | 17.6M | 🟢 **-54%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 152.8M | ✅ | 17.9M | 🟢 **-88%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 73.5M | ✅ | 17.9M | 🟢 **-76%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 92.4M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 47.4M | ✅ | 14.1M | 🟢 **-70%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 164.5M | ✅ | 15.5M | 🟢 **-91%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 71.0M | ✅ | 14.7M | 🟢 **-79%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 170.1M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 57.9M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 133.1M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 37.5M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 83.9M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 38.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 77.8M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 68.5M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 96.3M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 61.2M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 95.3M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 48.3M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 97.9M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 67.1M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 110.5M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 66.7M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 91.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 54.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 93.6M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 59.2M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 87.0M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 65.2M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 106.4M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 38.8M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 101.1M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 70.4M | ✅ | 49.7M | 🟢 **-29%** |
| default.json | invalid type for default | 2 | ✅ | 107.7M | ✅ | 61.4M | 🟢 **-43%** |
| default.json | invalid string value for default | 2 | ✅ | 51.4M | ✅ | 48.6M | -5% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 76.7M | ✅ | 44.4M | 🟢 **-42%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 10.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 91.1M | ✅ | 54.3M | 🟢 **-40%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 84.9M | ✅ | 65.2M | 🟢 **-23%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 40.0M | ✅ | 37.0M | -8% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 44.8M | ✅ | 39.7M | -11% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 86.4M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 11.3M | ❌ | - | - |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 25.2M | ✅ | 26.1M | +4% |
| enum.json | simple enum validation | 2 | ✅ | 68.7M | ✅ | 36.7M | 🟢 **-47%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 60.8M | ✅ | 2.6M | 🟢 **-96%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 68.2M | ✅ | 17.2M | 🟢 **-75%** |
| enum.json | enums in properties | 6 | ✅ | 15.9M | ✅ | 22.5M | 🔴 **+41%** |
| enum.json | enum with escaped characters | 3 | ✅ | 72.8M | ✅ | 22.7M | 🟢 **-69%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 112.4M | ✅ | 32.8M | 🟢 **-71%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.4M | ✅ | 9.6M | 🟢 **-84%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 111.7M | ✅ | 32.9M | 🟢 **-71%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 61.2M | ✅ | 10.1M | 🟢 **-84%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 109.9M | ✅ | 34.7M | 🟢 **-68%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 62.8M | ✅ | 9.8M | 🟢 **-84%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 109.9M | ✅ | 34.6M | 🟢 **-69%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 62.8M | ✅ | 10.2M | 🟢 **-84%** |
| enum.json | nul characters in strings | 2 | ✅ | 91.3M | ✅ | 25.9M | 🟢 **-72%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 65.2M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 108.4M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 81.9M | ✅ | 45.1M | 🟢 **-45%** |
| format.json | idn-email format | 6 | ✅ | 161.8M | ✅ | 68.8M | 🟢 **-57%** |
| format.json | regex format | 6 | ✅ | 79.7M | ✅ | 71.7M | -10% |
| format.json | ipv4 format | 6 | ✅ | 157.2M | ✅ | 68.5M | 🟢 **-56%** |
| format.json | ipv6 format | 6 | ✅ | 82.0M | ✅ | 66.2M | -19% |
| format.json | idn-hostname format | 6 | ✅ | 162.8M | ✅ | 71.4M | 🟢 **-56%** |
| format.json | hostname format | 6 | ✅ | 82.1M | ✅ | 36.7M | 🟢 **-55%** |
| format.json | date format | 6 | ✅ | 163.3M | ✅ | 67.4M | 🟢 **-59%** |
| format.json | date-time format | 6 | ✅ | 75.0M | ✅ | 67.4M | -10% |
| format.json | time format | 6 | ✅ | 162.2M | ✅ | 71.4M | 🟢 **-56%** |
| format.json | json-pointer format | 6 | ✅ | 81.9M | ✅ | 71.6M | -12% |
| format.json | relative-json-pointer format | 6 | ✅ | 161.7M | ✅ | 70.4M | 🟢 **-56%** |
| format.json | iri format | 6 | ✅ | 79.6M | ✅ | 66.8M | -16% |
| format.json | iri-reference format | 6 | ✅ | 147.0M | ✅ | 71.6M | 🟢 **-51%** |
| format.json | uri format | 6 | ✅ | 81.5M | ✅ | 68.3M | -16% |
| format.json | uri-reference format | 6 | ✅ | 162.6M | ✅ | 70.7M | 🟢 **-57%** |
| format.json | uri-template format | 6 | ✅ | 75.6M | ✅ | 71.6M | -5% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 159.9M | ✅ | 76.2M | 🟢 **-52%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 83.5M | ✅ | 76.2M | -9% |
| if-then-else.json | ignore else without if | 2 | ✅ | 164.4M | ✅ | 38.6M | 🟢 **-77%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 121.4M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 65.8M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 164.2M | ✅ | 37.9M | 🟢 **-77%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 69.2M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 113.4M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 39.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 56.4M | ✅ | 28.0M | 🟢 **-50%** |
| items.json | a schema given for items | 4 | ✅ | 50.5M | ✅ | 49.0M | -3% |
| items.json | an array of schemas for items | 6 | ✅ | 107.3M | ✅ | 53.3M | 🟢 **-50%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 83.5M | ✅ | 70.8M | -15% |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 59.8M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.2M | ✅ | 19.2M | 🟢 **-34%** |
| items.json | nested items | 3 | ✅ | 11.9M | ✅ | 8.9M | 🟢 **-25%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 68.9M | ✅ | 61.7M | -10% |
| items.json | array-form items with null instance e... | 1 | ✅ | 73.4M | ✅ | 64.3M | -12% |
| maxItems.json | maxItems validation | 4 | ✅ | 69.7M | ✅ | 53.5M | 🟢 **-23%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 66.3M | ✅ | 41.4M | 🟢 **-38%** |
| maxLength.json | maxLength validation | 5 | ✅ | 55.1M | ✅ | 44.8M | -19% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 53.0M | ✅ | 40.8M | 🟢 **-23%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.6M | ✅ | 45.5M | -17% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 45.8M | ✅ | 32.7M | 🟢 **-28%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 47.0M | ✅ | 34.1M | 🟢 **-27%** |
| maximum.json | maximum validation | 4 | ✅ | 69.1M | ✅ | 54.3M | 🟢 **-21%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 69.0M | ✅ | 54.8M | 🟢 **-21%** |
| minItems.json | minItems validation | 4 | ✅ | 71.2M | ✅ | 52.0M | 🟢 **-27%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 66.4M | ✅ | 22.5M | 🟢 **-66%** |
| minLength.json | minLength validation | 5 | ✅ | 52.6M | ✅ | 42.8M | -19% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.4M | ✅ | 37.8M | 🟢 **-28%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.6M | ✅ | 46.3M | -17% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 41.8M | ✅ | 32.9M | 🟢 **-21%** |
| minimum.json | minimum validation | 4 | ✅ | 70.0M | ✅ | 29.8M | 🟢 **-57%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 66.1M | ✅ | 55.2M | -17% |
| multipleOf.json | by int | 3 | ✅ | 66.6M | ✅ | 51.2M | 🟢 **-23%** |
| multipleOf.json | by number | 3 | ✅ | 67.1M | ✅ | 6.0M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 61.6M | ✅ | 4.0M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 53.9M | ✅ | 4.3M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.8M | ❌ | - | - |
| not.json | not | 2 | ✅ | 70.1M | ✅ | 17.3M | 🟢 **-75%** |
| not.json | not multiple types | 3 | ✅ | 64.3M | ✅ | 23.3M | 🟢 **-64%** |
| not.json | not more complex schema | 3 | ✅ | 62.6M | ✅ | 17.4M | 🟢 **-72%** |
| not.json | forbidden property | 2 | ✅ | 48.5M | ✅ | 46.3M | -5% |
| not.json | forbid everything with empty schema | 9 | ✅ | 57.9M | ✅ | 39.6M | 🟢 **-32%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 58.0M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 80.3M | ✅ | 63.5M | 🟢 **-21%** |
| not.json | double negation | 1 | ✅ | 80.8M | ✅ | 14.1M | 🟢 **-83%** |
| oneOf.json | oneOf | 4 | ✅ | 61.9M | ✅ | 16.7M | 🟢 **-73%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.4M | ✅ | 18.3M | 🟢 **-44%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 60.5M | ✅ | 41.2M | 🟢 **-32%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 80.8M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 60.7M | ✅ | 38.1M | 🟢 **-37%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 60.6M | ✅ | 41.3M | 🟢 **-32%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 42.3M | ✅ | 17.8M | 🟢 **-58%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 69.1M | ✅ | 20.0M | 🟢 **-71%** |
| oneOf.json | oneOf with required | 4 | ✅ | 45.9M | ✅ | 16.5M | 🟢 **-64%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.8M | ✅ | 16.1M | 🟢 **-65%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 69.2M | ✅ | 14.4M | 🟢 **-79%** |
| pattern.json | pattern validation | 8 | ✅ | 51.6M | ✅ | 46.5M | -10% |
| pattern.json | pattern is not anchored | 1 | ✅ | 20.7M | ✅ | 28.9M | 🔴 **+40%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ✅ | 19.7M | 🟢 **-23%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.7M | ✅ | 6.8M | 🟢 **-50%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.5M | ✅ | 13.8M | -11% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.7M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 17.4M | -2% |
| properties.json | object properties validation | 6 | ✅ | 51.5M | ✅ | 45.9M | -11% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.9M | ✅ | 7.4M | 🟢 **-61%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 47.2M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.4M | ✅ | 44.8M | 🟢 **-30%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.4M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 38.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.5M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 83.5M | ✅ | 50.6M | 🟢 **-39%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 48.0M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.3M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 39.6M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.6M | ✅ | 16.2M | 🟢 **-34%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 48.7M | ✅ | 44.7M | -8% |
| ref.json | relative pointer ref to array | 2 | ✅ | 52.7M | ✅ | 44.0M | -17% |
| ref.json | escaped pointer ref | 6 | ✅ | 43.7M | ✅ | 40.0M | -8% |
| ref.json | nested refs | 2 | ✅ | 37.2M | ✅ | 52.2M | 🔴 **+40%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 49.0M | ✅ | 46.8M | -4% |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 48.8M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 24.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 49.4M | ✅ | 44.6M | -10% |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.9M | ✅ | 45.0M | -8% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 80.7M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 60.8M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.3M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 49.6M | ✅ | 43.1M | -13% |
| ref.json | Location-independent identifier | 2 | ✅ | 43.5M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 43.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 46.3M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 53.1M | ✅ | 5.7M | 🟢 **-89%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 32.6M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.2M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 49.5M | ✅ | 45.5M | -8% |
| ref.json | URN base URI with NSS | 2 | ✅ | 42.3M | ✅ | 41.6M | -1% |
| ref.json | URN base URI with r-component | 2 | ✅ | 39.3M | ✅ | 44.0M | +12% |
| ref.json | URN base URI with q-component | 2 | ✅ | 45.9M | ✅ | 45.3M | -1% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 45.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 38.2M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 47.1M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 51.2M | 🟢 **-27%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 50.9M | 🟢 **-27%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 64.6M | ✅ | 51.9M | -20% |
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
| required.json | required validation | 5 | ✅ | 59.7M | ✅ | 54.2M | -9% |
| required.json | required default validation | 1 | ✅ | 80.7M | ✅ | 62.9M | 🟢 **-22%** |
| required.json | required with empty array | 1 | ✅ | 80.7M | ✅ | 62.8M | 🟢 **-22%** |
| required.json | required with escaped characters | 2 | ✅ | 48.0M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.9M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 60.1M | ✅ | 38.8M | 🟢 **-35%** |
| type.json | number type matches numbers | 9 | ✅ | 62.4M | ✅ | 45.6M | 🟢 **-27%** |
| type.json | string type matches strings | 9 | ✅ | 61.1M | ✅ | 46.3M | 🟢 **-24%** |
| type.json | object type matches objects | 7 | ✅ | 54.7M | ✅ | 39.1M | 🟢 **-29%** |
| type.json | array type matches arrays | 7 | ✅ | 57.8M | ✅ | 39.5M | 🟢 **-32%** |
| type.json | boolean type matches booleans | 10 | ✅ | 58.2M | ✅ | 42.3M | 🟢 **-27%** |
| type.json | null type matches only the null object | 10 | ✅ | 59.2M | ✅ | 37.7M | 🟢 **-36%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 59.8M | ✅ | 41.0M | 🟢 **-32%** |
| type.json | type as array with one item | 2 | ✅ | 69.6M | ✅ | 51.1M | 🟢 **-27%** |
| type.json | type: array or object | 5 | ✅ | 65.6M | ✅ | 42.7M | 🟢 **-35%** |
| type.json | type: array, object or null | 5 | ✅ | 70.0M | ✅ | 48.4M | 🟢 **-31%** |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ✅ | 2.0M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.3M | ✅ | 6.1M | 🟢 **-81%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.4M | ✅ | 6.0M | 🟢 **-67%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 77.6M | ✅ | 66.6M | -14% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 63.3M | ✅ | 60.5M | -4% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 61.7M | ✅ | 51.9M | -16% |
| optional/bignum.json | integer | 2 | ✅ | 79.4M | ✅ | 13.1M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 79.8M | ✅ | 73.8M | -8% |
| optional/bignum.json | string | 1 | ✅ | 58.0M | ✅ | 41.6M | 🟢 **-28%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 71.9M | ✅ | 67.6M | -6% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 55.7M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.9M | ✅ | 48.2M | 🟢 **-33%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 55.8M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 354K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 20.8M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 426K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 26.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 27.9M | ✅ | 20.2M | 🟢 **-28%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 28.3M | ✅ | 25.3M | -11% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.9M | ✅ | 25.1M | -7% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.4M | ✅ | 25.2M | -8% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.7M | ✅ | 24.8M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.4M | ✅ | 26.8M | +6% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.6M | ✅ | 25.0M | -9% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.4M | ✅ | 24.8M | -9% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 25.4M | ✅ | 29.8M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.4M | ✅ | 10.1M | 🟢 **-66%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.9M | ✅ | 12.4M | -17% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 13.7M | -8% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.9M | ✅ | 18.2M | 🟢 **-32%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.0M | ✅ | 14.4M | 🟢 **-28%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.2M | ✅ | 17.3M | -10% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 10.8M | 🔴 **+40%** |
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
| optional/format/unknown.json | unknown format | 7 | ✅ | 79.2M | ✅ | 47.7M | 🟢 **-40%** |
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

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 7.4M | ✅ | 6.6M | -11% |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 34.8M | ✅ | 37.9M | +9% |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 153.2M | ✅ | 61.5M | 🟢 **-60%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 61.0M | ✅ | 55.6M | -9% |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 164.3M | ✅ | 70.5M | 🟢 **-57%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 67.2M | ✅ | 63.8M | -5% |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 53.5M | ✅ | 36.2M | 🟢 **-32%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 39.9M | ✅ | 38.6M | -3% |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.1M | ✅ | 47.0M | 🟢 **-56%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 66.0M | ✅ | 68.3M | +4% |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 46.7M | ✅ | 13.6M | 🟢 **-71%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 20.7M | ✅ | 18.5M | -10% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 46.7M | ✅ | 16.9M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 30.5M | ✅ | 30.9M | +2% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.3M | ✅ | 63.3M | 🟢 **-58%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 26.8M | ✅ | 28.0M | +4% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 69.4M | ✅ | 42.9M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 24.1M | ✅ | 19.9M | -17% |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 31.2M | ✅ | 19.3M | 🟢 **-38%** |
| allOf.json | allOf | 4 | ✅ | 35.6M | ✅ | 33.9M | -5% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.2M | ✅ | 27.5M | -9% |
| allOf.json | allOf simple types | 2 | ✅ | 60.9M | ✅ | 51.9M | -15% |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.5M | ✅ | 74.1M | 🟢 **-51%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 55.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 73.2M | ✅ | 58.2M | 🟢 **-20%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 153.0M | ✅ | 73.7M | 🟢 **-52%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 63.3M | ✅ | 47.8M | 🟢 **-24%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 51.6M | 🟢 **-56%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 52.4M | -19% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.9M | ✅ | 23.5M | 🟢 **-72%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 63.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.8M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 44.4M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 63.8M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 59.0M | ✅ | 14.8M | 🟢 **-75%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 32.7M | ✅ | 16.2M | 🟢 **-50%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 73.2M | ✅ | 18.0M | 🟢 **-75%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 73.2M | ✅ | 17.8M | 🟢 **-76%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 56.2M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 44.7M | ✅ | 14.3M | 🟢 **-68%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 68.2M | ✅ | 15.0M | 🟢 **-78%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.7M | ✅ | 14.3M | 🟢 **-78%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 59.6M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 50.0M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 51.7M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 37.3M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 47.8M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 64.7M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 60.0M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 61.7M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 55.1M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 54.5M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 55.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 55.9M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 53.5M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 60.1M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 55.9M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 61.0M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 55.4M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 50.9M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 54.9M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 53.3M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 59.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 59.1M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 36.5M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 58.4M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 64.6M | ✅ | 50.3M | 🟢 **-22%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 75.8M | ✅ | 76.8M | +1% |
| content.json | validation of binary string-encoding | 3 | ✅ | 76.0M | ✅ | 76.1M | +0% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 60.1M | ✅ | 68.1M | +13% |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 61.2M | ✅ | 72.8M | +19% |
| default.json | invalid type for default | 2 | ✅ | 58.1M | ✅ | 61.3M | +6% |
| default.json | invalid string value for default | 2 | ✅ | 46.4M | ✅ | 48.0M | +4% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 46.1M | ✅ | 44.5M | -4% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 54.3M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 75.5M | ✅ | 59.7M | 🟢 **-21%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 26.3M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 42.5M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 47.3M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 47.4M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 36.5M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 33.9M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 31.7M | ✅ | 33.6M | +6% |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.4M | ✅ | 3.0M | 🟢 **-93%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 60.2M | ✅ | 17.8M | 🟢 **-70%** |
| enum.json | enums in properties | 6 | ✅ | 14.2M | ✅ | 20.2M | 🔴 **+43%** |
| enum.json | enum with escaped characters | 3 | ✅ | 63.4M | ✅ | 24.4M | 🟢 **-62%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 52.6M | ✅ | 33.3M | 🟢 **-37%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 55.1M | ✅ | 8.9M | 🟢 **-84%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 59.9M | ✅ | 32.2M | 🟢 **-46%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 49.6M | ✅ | 10.1M | 🟢 **-80%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 60.7M | ✅ | 36.7M | 🟢 **-40%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 56.6M | ✅ | 10.8M | 🟢 **-81%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 59.8M | ✅ | 35.6M | 🟢 **-41%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 56.1M | ✅ | 9.9M | 🟢 **-82%** |
| enum.json | nul characters in strings | 2 | ✅ | 52.9M | ✅ | 26.0M | 🟢 **-51%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.0M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 28.4M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 66.7M | ✅ | 43.4M | 🟢 **-35%** |
| format.json | idn-email format | 6 | ✅ | 69.6M | ✅ | 71.0M | +2% |
| format.json | regex format | 6 | ✅ | 61.2M | ✅ | 71.2M | +16% |
| format.json | ipv4 format | 6 | ✅ | 62.4M | ✅ | 68.6M | +10% |
| format.json | ipv6 format | 6 | ✅ | 62.4M | ✅ | 68.5M | +10% |
| format.json | idn-hostname format | 6 | ✅ | 62.3M | ✅ | 38.3M | 🟢 **-39%** |
| format.json | hostname format | 6 | ✅ | 33.2M | ✅ | 68.0M | 🔴 **+105%** |
| format.json | date format | 6 | ✅ | 60.9M | ✅ | 69.0M | +13% |
| format.json | date-time format | 6 | ✅ | 61.3M | ✅ | 68.5M | +12% |
| format.json | time format | 6 | ✅ | 62.3M | ✅ | 70.5M | +13% |
| format.json | json-pointer format | 6 | ✅ | 60.0M | ✅ | 71.1M | +19% |
| format.json | relative-json-pointer format | 6 | ✅ | 62.1M | ✅ | 71.3M | +15% |
| format.json | iri format | 6 | ✅ | 61.1M | ✅ | 70.4M | +15% |
| format.json | iri-reference format | 6 | ✅ | 62.2M | ✅ | 70.3M | +13% |
| format.json | uri format | 6 | ✅ | 62.4M | ✅ | 68.7M | +10% |
| format.json | uri-reference format | 6 | ✅ | 62.4M | ✅ | 70.2M | +13% |
| format.json | uri-template format | 6 | ✅ | 59.4M | ✅ | 69.2M | +17% |
| format.json | uuid format | 6 | ✅ | 62.3M | ✅ | 71.3M | +14% |
| format.json | duration format | 6 | ✅ | 62.1M | ✅ | 71.5M | +15% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 52.5M | ✅ | 76.5M | 🔴 **+46%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 54.0M | ✅ | 76.2M | 🔴 **+41%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 68.3M | ✅ | 41.0M | 🟢 **-40%** |
| if-then-else.json | if and then without else | 3 | ✅ | 55.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 60.9M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 55.9M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 35.2M | ✅ | 44.1M | 🔴 **+25%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 50.3M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 58.6M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 38.0M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 39.0M | ✅ | 27.1M | 🟢 **-30%** |
| items.json | a schema given for items | 4 | ✅ | 46.5M | ✅ | 48.9M | +5% |
| items.json | an array of schemas for items | 6 | ✅ | 57.8M | ✅ | 53.8M | -7% |
| items.json | items with boolean schema (true) | 2 | ✅ | 75.0M | ✅ | 70.4M | -6% |
| items.json | items with boolean schema (false) | 2 | ✅ | 60.2M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 53.0M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.6M | ✅ | 23.3M | 🔴 **+85%** |
| items.json | nested items | 3 | ✅ | 12.0M | ✅ | 4.8M | 🟢 **-60%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 63.3M | ✅ | 62.1M | -2% |
| items.json | array-form items with null instance e... | 1 | ✅ | 67.3M | ✅ | 64.1M | -5% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 75.1M | ✅ | 76.5M | +2% |
| maxContains.json | maxContains with contains | 5 | ✅ | 59.1M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 56.5M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 51.7M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 65.0M | ✅ | 40.9M | 🟢 **-37%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 61.1M | ✅ | 22.0M | 🟢 **-64%** |
| maxLength.json | maxLength validation | 5 | ✅ | 51.2M | ✅ | 46.4M | -9% |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 49.5M | ✅ | 36.7M | 🟢 **-26%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 50.6M | ✅ | 46.7M | -8% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.6M | ✅ | 32.7M | 🟢 **-23%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 44.3M | ✅ | 33.7M | 🟢 **-24%** |
| maximum.json | maximum validation | 4 | ✅ | 64.1M | ✅ | 52.7M | -18% |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 63.1M | ✅ | 46.7M | 🟢 **-26%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 75.3M | ✅ | 76.5M | +2% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 55.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 53.3M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 56.3M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 49.0M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 47.4M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 75.2M | ✅ | 61.1M | -19% |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 59.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 65.1M | ✅ | 40.9M | 🟢 **-37%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 61.2M | ✅ | 42.5M | 🟢 **-31%** |
| minLength.json | minLength validation | 5 | ✅ | 50.5M | ✅ | 44.1M | -13% |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 49.4M | ✅ | 41.0M | -17% |
| minProperties.json | minProperties validation | 6 | ✅ | 51.8M | ✅ | 46.2M | -11% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 44.1M | ✅ | 32.8M | 🟢 **-26%** |
| minimum.json | minimum validation | 4 | ✅ | 64.0M | ✅ | 36.8M | 🟢 **-43%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 60.7M | ✅ | 54.4M | -10% |
| multipleOf.json | by int | 3 | ✅ | 63.8M | ✅ | 52.3M | -18% |
| multipleOf.json | by number | 3 | ✅ | 61.1M | ✅ | 6.4M | 🟢 **-90%** |
| multipleOf.json | by small number | 2 | ✅ | 56.7M | ✅ | 3.8M | 🟢 **-93%** |
| multipleOf.json | float division = inf | 1 | ✅ | 50.4M | ✅ | 4.4M | 🟢 **-91%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 61.3M | ❌ | - | - |
| not.json | not | 2 | ✅ | 64.0M | ✅ | 16.7M | 🟢 **-74%** |
| not.json | not multiple types | 3 | ✅ | 58.1M | ✅ | 22.8M | 🟢 **-61%** |
| not.json | not more complex schema | 3 | ✅ | 56.3M | ✅ | 16.9M | 🟢 **-70%** |
| not.json | forbidden property | 2 | ✅ | 45.3M | ✅ | 45.1M | 0% |
| not.json | forbid everything with empty schema | 9 | ✅ | 50.2M | ✅ | 36.8M | 🟢 **-27%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 50.2M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 71.2M | ✅ | 51.7M | 🟢 **-27%** |
| not.json | double negation | 1 | ✅ | 73.0M | ✅ | 13.8M | 🟢 **-81%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 57.1M | ✅ | 14.9M | 🟢 **-74%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 30.5M | ✅ | 16.6M | 🟢 **-46%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 56.0M | ✅ | 42.2M | 🟢 **-25%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 73.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 56.1M | ✅ | 38.8M | 🟢 **-31%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 56.1M | ✅ | 41.7M | 🟢 **-26%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.7M | ✅ | 17.9M | 🟢 **-55%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 62.6M | ✅ | 19.6M | 🟢 **-69%** |
| oneOf.json | oneOf with required | 4 | ✅ | 43.0M | ✅ | 17.3M | 🟢 **-60%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ✅ | 16.4M | 🟢 **-62%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 61.1M | ✅ | 14.1M | 🟢 **-77%** |
| pattern.json | pattern validation | 8 | ✅ | 48.8M | ✅ | 46.1M | -6% |
| pattern.json | pattern is not anchored | 1 | ✅ | 13.6M | ✅ | 29.1M | 🔴 **+114%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 23.5M | ✅ | 8.9M | 🟢 **-62%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ✅ | 7.0M | 🟢 **-52%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.2M | ✅ | 12.9M | -16% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.6M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 10.9M | ✅ | 17.3M | 🔴 **+59%** |
| properties.json | object properties validation | 6 | ✅ | 46.3M | ✅ | 44.5M | -4% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 18.7M | ✅ | 8.0M | 🟢 **-57%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.9M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.4M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 59.5M | ✅ | 45.1M | 🟢 **-24%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.1M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 36.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 75.2M | ✅ | 49.5M | 🟢 **-34%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.7M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 35.7M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 38.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 12.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 5.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 2.9M | ✅ | 7.5M | 🔴 **+159%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 11.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 11.6M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.7M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 7.6M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.0M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.0M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.1M | ✅ | 16.5M | 🟢 **-25%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 45.5M | ✅ | 45.1M | -1% |
| ref.json | relative pointer ref to array | 2 | ✅ | 48.5M | ✅ | 44.4M | -8% |
| ref.json | escaped pointer ref | 6 | ✅ | 41.6M | ✅ | 37.4M | -10% |
| ref.json | nested refs | 2 | ✅ | 35.9M | ✅ | 50.4M | 🔴 **+40%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 39.1M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.1M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 44.5M | ✅ | 33.4M | 🟢 **-25%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.3M | ✅ | 45.4M | -2% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 73.2M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 56.3M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.3M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 45.6M | ✅ | 38.8M | -15% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 24.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 49.6M | ✅ | 5.6M | 🟢 **-89%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 31.1M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 31.4M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 42.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 44.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.8M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 35.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 36.3M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 45.9M | ✅ | 42.1M | -8% |
| ref.json | URN base URI with NSS | 2 | ✅ | 45.4M | ✅ | 44.6M | -2% |
| ref.json | URN base URI with r-component | 2 | ✅ | 42.6M | ✅ | 45.9M | +8% |
| ref.json | URN base URI with q-component | 2 | ✅ | 42.8M | ✅ | 44.8M | +5% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 42.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 42.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 44.9M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 44.9M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 45.2M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 43.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 44.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.0M | ✅ | 50.6M | 🟢 **-21%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 64.0M | ✅ | 50.4M | 🟢 **-21%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 59.0M | ✅ | 51.7M | -12% |
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
| required.json | required validation | 5 | ✅ | 55.2M | ✅ | 54.3M | -2% |
| required.json | required default validation | 1 | ✅ | 73.1M | ✅ | 62.2M | -15% |
| required.json | required with empty array | 1 | ✅ | 73.0M | ✅ | 63.3M | -13% |
| required.json | required with escaped characters | 2 | ✅ | 40.5M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 25.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.5M | ✅ | 33.2M | 🟢 **-37%** |
| type.json | number type matches numbers | 9 | ✅ | 56.1M | ✅ | 46.7M | -17% |
| type.json | string type matches strings | 9 | ✅ | 56.9M | ✅ | 47.0M | -17% |
| type.json | object type matches objects | 7 | ✅ | 50.9M | ✅ | 39.1M | 🟢 **-23%** |
| type.json | array type matches arrays | 7 | ✅ | 53.5M | ✅ | 40.0M | 🟢 **-25%** |
| type.json | boolean type matches booleans | 10 | ✅ | 55.4M | ✅ | 42.6M | 🟢 **-23%** |
| type.json | null type matches only the null object | 10 | ✅ | 52.2M | ✅ | 37.4M | 🟢 **-28%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 55.0M | ✅ | 41.1M | 🟢 **-25%** |
| type.json | type as array with one item | 2 | ✅ | 63.1M | ✅ | 50.3M | 🟢 **-20%** |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 42.9M | 🟢 **-23%** |
| type.json | type: array, object or null | 5 | ✅ | 63.6M | ✅ | 47.9M | 🟢 **-25%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 68.2M | ✅ | 76.8M | +12% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 48.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 44.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 59.6M | ✅ | 43.4M | 🟢 **-27%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 46.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 65.8M | ✅ | 47.1M | 🟢 **-28%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 39.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 39.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 44.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 21.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 66.7M | ✅ | 27.6M | 🟢 **-59%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.8M | ✅ | 66.3M | 🔴 **+234%** |
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
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 61.1M | ✅ | 45.4M | 🟢 **-26%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 63.3M | ✅ | 73.9M | +17% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 19.9M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 38.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 50.4M | ✅ | 67.7M | 🔴 **+34%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 29.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 58.3M | ✅ | 38.3M | 🟢 **-34%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 58.0M | ✅ | 33.0M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.3M | ✅ | 60.1M | 🔴 **+98%** |
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
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 29.3M | ✅ | 42.4M | 🔴 **+44%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 28.5M | ✅ | 59.9M | 🔴 **+110%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 22.4M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.9M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 26.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 29.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 38.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 17.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 18.5M | ✅ | 10.3M | 🟢 **-44%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.1M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 63.3M | ✅ | 45.2M | 🟢 **-29%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 46.2M | ✅ | 71.5M | 🔴 **+55%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 24.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 20.8M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 22.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.5M | ✅ | 2.0M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.7M | ✅ | 6.2M | 🟢 **-80%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.1M | ✅ | 10.9M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 70.7M | ✅ | 65.3M | -8% |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 60.6M | ✅ | 60.5M | 0% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 56.5M | ✅ | 51.7M | -9% |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 45.8M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 64.1M | ✅ | 37.4M | 🟢 **-42%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 51.1M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 71.0M | ✅ | 13.0M | 🟢 **-82%** |
| optional/bignum.json | number | 2 | ✅ | 70.0M | ✅ | 72.6M | +4% |
| optional/bignum.json | string | 1 | ✅ | 54.3M | ✅ | 41.5M | 🟢 **-24%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 66.0M | ✅ | 67.3M | +2% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.4M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 65.3M | ✅ | 48.4M | 🟢 **-26%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 52.0M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.7M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 56.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 54.4M | ✅ | 41.2M | 🟢 **-24%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 76.1M | ✅ | 65.6M | -14% |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 31.0M | ✅ | 37.1M | +20% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 42.9M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 47.8M | ✅ | 46.9M | -2% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 51.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 37.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 25.4M | ✅ | 21.7M | -15% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 19.2M | ✅ | 25.4M | 🔴 **+32%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.8M | ✅ | 25.4M | +2% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.1M | ✅ | 25.3M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.3M | ✅ | 24.3M | -4% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.7M | ✅ | 26.3M | +6% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.7M | ✅ | 25.1M | -2% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.3M | ✅ | 24.9M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 24.4M | ✅ | 28.7M | +18% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.5M | ✅ | 10.2M | 🟢 **-63%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 15.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ✅ | 12.5M | -17% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.8M | ✅ | 13.3M | -10% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.0M | ✅ | 23.5M | -10% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.2M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.3M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 19.3M | ✅ | 13.8M | 🟢 **-29%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.0M | ✅ | 17.7M | -7% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.7M | ✅ | 10.7M | 🔴 **+39%** |
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
| optional/format/unknown.json | unknown format | 7 | ✅ | 70.8M | ✅ | 45.4M | 🟢 **-36%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 16.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.5M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 32.6M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 54.9M | ✅ | 35.4M | 🟢 **-35%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 28.3M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.7M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 45.5M | ✅ | 36.1M | 🟢 **-21%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 45.6M | ✅ | 45.1M | -1% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 45.9M | ✅ | 45.1M | -2% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 63.8M | ✅ | 45.8M | 🟢 **-28%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 45.5M | ✅ | 45.0M | -1% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 13.7M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | jsen | jsen ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 42.9M | ✅ | 14.3M | 🟢 **-67%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 21.2M | ✅ | 17.8M | -16% |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 43.0M | ✅ | 17.3M | 🟢 **-60%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 32.1M | ✅ | 29.6M | -8% |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 152.3M | ✅ | 63.0M | 🟢 **-59%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.5M | ✅ | 28.1M | -2% |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 68.9M | ✅ | 42.6M | 🟢 **-38%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 25.5M | ✅ | 19.5M | 🟢 **-23%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 30.9M | ✅ | 17.1M | 🟢 **-45%** |
| allOf.json | allOf | 4 | ✅ | 38.8M | ✅ | 35.8M | -8% |
| allOf.json | allOf with base schema | 5 | ✅ | 30.8M | ✅ | 27.2M | -12% |
| allOf.json | allOf simple types | 2 | ✅ | 69.7M | ✅ | 52.9M | 🟢 **-24%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 152.1M | ✅ | 74.5M | 🟢 **-51%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 62.8M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 91.7M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 77.0M | ✅ | 63.1M | -18% |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.2M | ✅ | 74.4M | 🟢 **-51%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 73.3M | ✅ | 53.0M | 🟢 **-28%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 117.8M | ✅ | 50.7M | 🟢 **-57%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 74.7M | ✅ | 51.0M | 🟢 **-32%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 84.3M | ✅ | 23.9M | 🟢 **-72%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 73.3M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 86.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 45.1M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 73.1M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 75.8M | ✅ | 15.1M | 🟢 **-80%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 35.2M | ✅ | 18.2M | 🟢 **-48%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 85.1M | ✅ | 17.2M | 🟢 **-80%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 85.2M | ✅ | 18.1M | 🟢 **-79%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 62.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.5M | ✅ | 14.9M | 🟢 **-69%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 79.8M | ✅ | 15.7M | 🟢 **-80%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 74.8M | ✅ | 14.8M | 🟢 **-80%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 84.6M | ❌ | - | - |
| boolean_schema.json | boolean schema 'false' | 9 | ✅ | 60.7M | ❌ | - | - |
| const.json | const validation | 3 | ✅ | 63.7M | ❌ | - | - |
| const.json | const with object | 4 | ✅ | 38.1M | ❌ | - | - |
| const.json | const with array | 3 | ✅ | 56.3M | ❌ | - | - |
| const.json | const with null | 2 | ✅ | 74.6M | ❌ | - | - |
| const.json | const with false does not match 0 | 3 | ✅ | 71.5M | ❌ | - | - |
| const.json | const with true does not match 1 | 3 | ✅ | 70.6M | ❌ | - | - |
| const.json | const with [false] does not match [0] | 3 | ✅ | 62.3M | ❌ | - | - |
| const.json | const with [true] does not match [1] | 3 | ✅ | 63.9M | ❌ | - | - |
| const.json | const with {"a": false} does not matc... | 3 | ✅ | 64.8M | ❌ | - | - |
| const.json | const with {"a": true} does not match... | 3 | ✅ | 65.0M | ❌ | - | - |
| const.json | const with 0 does not match other zer... | 6 | ✅ | 60.6M | ❌ | - | - |
| const.json | const with 1 does not match true | 3 | ✅ | 70.2M | ❌ | - | - |
| const.json | const with -2.0 matches integer and f... | 5 | ✅ | 64.1M | ❌ | - | - |
| const.json | float and integers are equal up to 64... | 4 | ✅ | 61.3M | ❌ | - | - |
| const.json | nul characters in strings | 2 | ✅ | 62.2M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 56.3M | ❌ | - | - |
| const.json | characters with the same visual repre... | 2 | ✅ | 63.2M | ❌ | - | - |
| contains.json | contains keyword validation | 6 | ✅ | 60.7M | ❌ | - | - |
| contains.json | contains keyword with const keyword | 3 | ✅ | 54.4M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 2 | ✅ | 79.7M | ❌ | - | - |
| contains.json | contains keyword with boolean schema ... | 3 | ✅ | 66.9M | ❌ | - | - |
| contains.json | items + contains | 4 | ✅ | 40.2M | ❌ | - | - |
| contains.json | contains with false if subschema | 2 | ✅ | 66.1M | ❌ | - | - |
| contains.json | contains with null instance elements | 1 | ✅ | 73.6M | ✅ | 52.7M | 🟢 **-28%** |
| content.json | validation of string-encoded content ... | 3 | ✅ | 90.2M | ✅ | 76.6M | -15% |
| content.json | validation of binary string-encoding | 3 | ✅ | 88.8M | ✅ | 76.7M | -14% |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 91.1M | ✅ | 68.9M | 🟢 **-24%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 72.0M | ✅ | 71.3M | -1% |
| default.json | invalid type for default | 2 | ✅ | 67.7M | ✅ | 61.7M | -9% |
| default.json | invalid string value for default | 2 | ✅ | 53.1M | ✅ | 48.4M | -9% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 50.9M | ✅ | 44.6M | -12% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 60.6M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 89.2M | ✅ | 62.9M | 🟢 **-29%** |
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
| enum.json | simple enum validation | 2 | ✅ | 71.8M | ✅ | 23.9M | 🟢 **-67%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 45.3M | ✅ | 3.4M | 🟢 **-92%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.2M | ✅ | 17.4M | 🟢 **-76%** |
| enum.json | enums in properties | 6 | ✅ | 14.5M | ✅ | 22.0M | 🔴 **+52%** |
| enum.json | enum with escaped characters | 3 | ✅ | 70.5M | ✅ | 21.6M | 🟢 **-69%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 72.0M | ✅ | 32.6M | 🟢 **-55%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 63.5M | ✅ | 10.9M | 🟢 **-83%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 72.0M | ✅ | 31.6M | 🟢 **-56%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 63.8M | ✅ | 10.2M | 🟢 **-84%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 71.2M | ✅ | 32.3M | 🟢 **-55%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 65.2M | ✅ | 10.3M | 🟢 **-84%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 70.2M | ✅ | 34.8M | 🟢 **-50%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.3M | ✅ | 9.7M | 🟢 **-85%** |
| enum.json | nul characters in strings | 2 | ✅ | 61.4M | ✅ | 27.2M | 🟢 **-56%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 68.1M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 68.2M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 83.2M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 90.0M | ✅ | 48.2M | 🟢 **-46%** |
| format.json | regex format | 7 | ✅ | 74.4M | ✅ | 70.9M | -5% |
| format.json | ipv4 format | 7 | ✅ | 74.3M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 74.0M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 74.0M | ✅ | 48.2M | 🟢 **-35%** |
| format.json | hostname format | 7 | ✅ | 72.6M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 74.5M | ✅ | 47.8M | 🟢 **-36%** |
| format.json | date-time format | 7 | ✅ | 79.3M | ✅ | 38.0M | 🟢 **-52%** |
| format.json | time format | 7 | ✅ | 73.8M | ✅ | 70.9M | -4% |
| format.json | json-pointer format | 7 | ✅ | 74.3M | ✅ | 70.8M | -5% |
| format.json | relative-json-pointer format | 7 | ✅ | 82.6M | ✅ | 71.1M | -14% |
| format.json | iri format | 7 | ✅ | 74.5M | ✅ | 71.4M | -4% |
| format.json | iri-reference format | 7 | ✅ | 68.8M | ✅ | 71.7M | +4% |
| format.json | uri format | 7 | ✅ | 74.0M | ✅ | 48.5M | 🟢 **-34%** |
| format.json | uri-reference format | 7 | ✅ | 73.4M | ✅ | 69.0M | -6% |
| format.json | uri-template format | 7 | ✅ | 74.4M | ✅ | 71.4M | -4% |
| format.json | uuid format | 7 | ✅ | 74.2M | ✅ | 71.2M | -4% |
| format.json | duration format | 7 | ✅ | 73.6M | ✅ | 70.7M | -4% |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 79.9M | ✅ | 76.5M | -4% |
| if-then-else.json | ignore then without if | 2 | ✅ | 88.6M | ✅ | 75.4M | -15% |
| if-then-else.json | ignore else without if | 2 | ✅ | 79.8M | ✅ | 76.2M | -5% |
| if-then-else.json | if and then without else | 3 | ✅ | 73.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 72.7M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 68.5M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 79.9M | ✅ | 61.1M | 🟢 **-24%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 72.5M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 71.9M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 41.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 43.7M | ✅ | 27.6M | 🟢 **-37%** |
| items.json | a schema given for items | 4 | ✅ | 52.1M | ✅ | 28.3M | 🟢 **-46%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 88.6M | ✅ | 70.0M | 🟢 **-21%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 68.2M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 12.9M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 12.2M | ✅ | 8.4M | 🟢 **-31%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 76.6M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 45.0M | ✅ | 33.2M | 🟢 **-26%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 43.7M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 69.7M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 72.0M | ✅ | 44.8M | 🟢 **-38%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 88.5M | ✅ | 76.7M | -13% |
| maxContains.json | maxContains with contains | 5 | ✅ | 72.3M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 61.8M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 57.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 75.0M | ✅ | 39.4M | 🟢 **-47%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 69.4M | ✅ | 47.1M | 🟢 **-32%** |
| maxLength.json | maxLength validation | 5 | ✅ | 57.3M | ✅ | 45.6M | 🟢 **-20%** |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 54.9M | ✅ | 35.0M | 🟢 **-36%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.3M | ✅ | 44.2M | 🟢 **-22%** |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 48.6M | ✅ | 32.3M | 🟢 **-33%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 49.4M | ✅ | 33.5M | 🟢 **-32%** |
| maximum.json | maximum validation | 4 | ✅ | 73.3M | ✅ | 51.2M | 🟢 **-30%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.2M | ✅ | 54.6M | 🟢 **-24%** |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 88.4M | ✅ | 76.8M | -13% |
| minContains.json | minContains=1 with contains | 5 | ✅ | 68.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 59.4M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 63.5M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 58.6M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 56.6M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 88.6M | ✅ | 49.0M | 🟢 **-45%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 68.4M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 71.9M | ✅ | 39.7M | 🟢 **-45%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 47.2M | 🟢 **-32%** |
| minLength.json | minLength validation | 5 | ✅ | 56.3M | ✅ | 42.0M | 🟢 **-25%** |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 54.9M | ✅ | 40.2M | 🟢 **-27%** |
| minProperties.json | minProperties validation | 6 | ✅ | 57.3M | ✅ | 46.6M | -19% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.7M | ✅ | 33.2M | 🟢 **-22%** |
| minimum.json | minimum validation | 4 | ✅ | 73.2M | ✅ | 52.6M | 🟢 **-28%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 68.9M | ✅ | 55.6M | -19% |
| multipleOf.json | by int | 3 | ✅ | 72.3M | ✅ | 55.2M | 🟢 **-24%** |
| multipleOf.json | by number | 3 | ✅ | 70.4M | ✅ | 6.3M | 🟢 **-91%** |
| multipleOf.json | by small number | 2 | ✅ | 64.1M | ✅ | 4.0M | 🟢 **-94%** |
| multipleOf.json | float division = inf | 1 | ✅ | 55.8M | ✅ | 4.4M | 🟢 **-92%** |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 71.5M | ❌ | - | - |
| not.json | not | 2 | ✅ | 73.3M | ✅ | 17.4M | 🟢 **-76%** |
| not.json | not multiple types | 3 | ✅ | 68.0M | ✅ | 23.3M | 🟢 **-66%** |
| not.json | not more complex schema | 3 | ✅ | 66.0M | ✅ | 17.4M | 🟢 **-74%** |
| not.json | forbidden property | 2 | ✅ | 51.9M | ✅ | 46.3M | -11% |
| not.json | forbid everything with empty schema | 9 | ✅ | 62.1M | ✅ | 36.1M | 🟢 **-42%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 61.3M | ❌ | - | - |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 82.3M | ✅ | 63.3M | 🟢 **-23%** |
| not.json | double negation | 1 | ✅ | 85.0M | ✅ | 13.2M | 🟢 **-84%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 33.3M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 64.4M | ✅ | 15.1M | 🟢 **-76%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 36.5M | ✅ | 17.7M | 🟢 **-51%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 63.4M | ✅ | 42.4M | 🟢 **-33%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 85.2M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 63.4M | ✅ | 39.6M | 🟢 **-37%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 63.0M | ✅ | 40.9M | 🟢 **-35%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.5M | ✅ | 17.7M | 🟢 **-59%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 72.5M | ✅ | 20.1M | 🟢 **-72%** |
| oneOf.json | oneOf with required | 4 | ✅ | 46.4M | ✅ | 17.5M | 🟢 **-62%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 48.0M | ✅ | 16.5M | 🟢 **-66%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 70.1M | ✅ | 14.7M | 🟢 **-79%** |
| pattern.json | pattern validation | 8 | ✅ | 54.0M | ✅ | 46.6M | -14% |
| pattern.json | pattern is not anchored | 1 | ✅ | 24.9M | ✅ | 29.0M | +16% |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ✅ | 19.6M | 🟢 **-27%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 13.8M | ✅ | 9.1M | 🟢 **-34%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 15.8M | ✅ | 13.6M | -14% |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.9M | ✅ | 17.3M | -3% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 65.6M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 62.7M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 75.7M | ✅ | 41.1M | 🟢 **-46%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 77.0M | ✅ | 70.6M | -8% |
| properties.json | object properties validation | 6 | ✅ | 54.3M | ✅ | 46.9M | -14% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.5M | ✅ | 7.7M | 🟢 **-60%** |
| properties.json | properties with boolean schema | 4 | ✅ | 47.8M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 49.0M | ❌ | - | - |
| properties.json | properties with null valued instance ... | 1 | ✅ | 67.1M | ✅ | 45.8M | 🟢 **-32%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 27.8M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 39.6M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 19.6M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 88.5M | ✅ | 50.4M | 🟢 **-43%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 49.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 41.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 25.4M | ✅ | 16.7M | 🟢 **-34%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 52.4M | ✅ | 44.8M | -14% |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.4M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 46.0M | ✅ | 38.2M | -17% |
| ref.json | nested refs | 2 | ✅ | 38.1M | ✅ | 53.2M | 🔴 **+40%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 43.0M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.4M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 51.2M | ✅ | 33.4M | 🟢 **-35%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 52.6M | ✅ | 46.1M | -12% |
| ref.json | $ref to boolean schema true | 1 | ✅ | 84.9M | ❌ | - | - |
| ref.json | $ref to boolean schema false | 1 | ✅ | 63.4M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.6M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 52.9M | ✅ | 45.9M | -13% |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 24.1M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 54.8M | ✅ | 5.7M | 🟢 **-90%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 33.2M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 32.2M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 49.3M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 48.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 70.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 38.1M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 40.9M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 52.3M | ✅ | 45.5M | -13% |
| ref.json | URN base URI with NSS | 2 | ✅ | 53.0M | ✅ | 46.1M | -13% |
| ref.json | URN base URI with r-component | 2 | ✅ | 49.0M | ✅ | 42.0M | -14% |
| ref.json | URN base URI with q-component | 2 | ✅ | 52.2M | ✅ | 45.5M | -13% |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.5M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 44.5M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 49.5M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 49.6M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 47.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 49.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 72.7M | ✅ | 50.2M | 🟢 **-31%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 73.4M | ✅ | 53.1M | 🟢 **-28%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 73.4M | ✅ | 52.9M | 🟢 **-28%** |
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
| required.json | required validation | 5 | ✅ | 62.1M | ✅ | 54.1M | -13% |
| required.json | required default validation | 1 | ✅ | 85.2M | ✅ | 63.1M | 🟢 **-26%** |
| required.json | required with empty array | 1 | ✅ | 85.1M | ✅ | 80.1M | -6% |
| required.json | required with escaped characters | 2 | ✅ | 51.5M | ❌ | - | - |
| required.json | required properties whose names are J... | 7 | ✅ | 27.4M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 63.3M | ✅ | 30.0M | 🟢 **-53%** |
| type.json | number type matches numbers | 9 | ✅ | 66.6M | ✅ | 45.5M | 🟢 **-32%** |
| type.json | string type matches strings | 9 | ✅ | 62.8M | ✅ | 46.6M | 🟢 **-26%** |
| type.json | object type matches objects | 7 | ✅ | 56.8M | ✅ | 39.5M | 🟢 **-30%** |
| type.json | array type matches arrays | 7 | ✅ | 61.3M | ✅ | 40.2M | 🟢 **-34%** |
| type.json | boolean type matches booleans | 10 | ✅ | 60.9M | ✅ | 43.0M | 🟢 **-29%** |
| type.json | null type matches only the null object | 10 | ✅ | 63.0M | ✅ | 38.3M | 🟢 **-39%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 62.8M | ✅ | 41.0M | 🟢 **-35%** |
| type.json | type as array with one item | 2 | ✅ | 72.6M | ✅ | 52.9M | 🟢 **-27%** |
| type.json | type: array or object | 5 | ✅ | 67.8M | ✅ | 40.5M | 🟢 **-40%** |
| type.json | type: array, object or null | 5 | ✅ | 73.7M | ✅ | 48.9M | 🟢 **-34%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 78.2M | ✅ | 76.9M | -2% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 58.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 54.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 67.4M | ✅ | 41.7M | 🟢 **-38%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 54.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 68.1M | ✅ | 48.9M | 🟢 **-28%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 44.4M | ✅ | 40.8M | -8% |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 51.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 77.9M | ✅ | 49.3M | 🟢 **-37%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 19.2M | ✅ | 76.4M | 🔴 **+297%** |
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
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 86.4M | ✅ | 48.6M | 🟢 **-44%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 68.6M | ✅ | 74.5M | +9% |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 20.0M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 41.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 56.1M | ✅ | 50.1M | -11% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 34.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 32.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 83.0M | ✅ | 46.8M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.1M | ✅ | 19.8M | 🟢 **-43%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 9.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 66.5M | ✅ | 41.8M | 🟢 **-37%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 27.8M | ✅ | 61.6M | 🔴 **+121%** |
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
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.9M | ✅ | 42.4M | 🔴 **+52%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 27.9M | ✅ | 62.7M | 🔴 **+124%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 25.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.2M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 19.8M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 11.8M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 25.6M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 47.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.9M | ✅ | 10.4M | 🟢 **-48%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 6.9M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 77.8M | ✅ | 47.6M | 🟢 **-39%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 50.9M | ✅ | 74.5M | 🔴 **+46%** |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 25.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 12.7M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 23.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.6M | ✅ | 2.0M | 🟢 **-88%** |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 32.0M | ✅ | 9.4M | 🟢 **-71%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 43.1M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 85.5M | ✅ | 47.5M | 🟢 **-44%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 68.9M | ✅ | 67.9M | -2% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.3M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 53.2M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 72.5M | ✅ | 37.9M | 🟢 **-48%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 61.9M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 83.8M | ✅ | 13.1M | 🟢 **-84%** |
| optional/bignum.json | number | 2 | ✅ | 82.7M | ✅ | 97.3M | +18% |
| optional/bignum.json | string | 1 | ✅ | 61.0M | ✅ | 41.5M | 🟢 **-32%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 72.9M | ✅ | 68.3M | -6% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 57.7M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 71.3M | ✅ | 48.1M | 🟢 **-33%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 57.2M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 80.8M | ❌ | - | - |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 62.3M | ✅ | 41.8M | 🟢 **-33%** |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 90.3M | ✅ | 67.4M | 🟢 **-25%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.5M | ✅ | 37.4M | +11% |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 47.5M | ❌ | - | - |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 53.7M | ✅ | 47.0M | -13% |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 66.7M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 39.9M | ❌ | - | - |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.3M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 28.8M | ✅ | 24.6M | -15% |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 16.4M | ✅ | 24.2M | 🔴 **+47%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.2M | ✅ | 25.0M | -4% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.9M | ✅ | 25.0M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 28.2M | ✅ | 23.8M | -15% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.0M | ✅ | 22.4M | -14% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 27.7M | ✅ | 24.0M | -13% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 27.5M | ✅ | 23.6M | -14% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.6M | ✅ | 29.3M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 30.0M | ✅ | 10.3M | 🟢 **-66%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 15.0M | ✅ | 12.7M | -15% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.5M | ✅ | 13.6M | -12% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.7M | ✅ | 24.0M | -13% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 21.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 14.3M | 🟢 **-30%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ✅ | 17.7M | -11% |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 10.9M | 🔴 **+40%** |
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
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.3M | ✅ | 48.1M | 🟢 **-42%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.9M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.3M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.4M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 25.8M | ✅ | 17.3M | 🟢 **-33%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 16.4M | ✅ | 22.3M | 🔴 **+36%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 33.5M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 61.9M | ✅ | 45.5M | 🟢 **-26%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 15.8M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 50.6M | ✅ | 45.2M | -11% |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 53.2M | ✅ | 45.5M | -14% |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 51.6M | ✅ | 46.6M | -10% |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 70.4M | ✅ | 51.5M | 🟢 **-27%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 52.3M | ✅ | 46.5M | -11% |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 15.0M | ❌ | - | - |
