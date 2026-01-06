# tjs vs is-my-json-valid Benchmarks

Performance comparison of **tjs** vs **[is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features.

## Summary

| Draft | Groups | tjs pass | tjs ops/s | is-my-json-valid pass | is-my-json-valid ops/s | Both pass | Diff |
|-------|-------:|---------:|----------:|-----------:|----------:|----------:|-----:|
| draft4 | 199 | 198/199 | 26.5M | 163/199 | 15.4M | 163 | 🟢 **-42%** |
| draft6 | 276 | ✅ 276 | 29.7M | 182/276 | 17.0M | 182 | 🟢 **-43%** |
| draft7 | 313 | ✅ 313 | 15.9M | 193/313 | 18.7M | 193 | +17% |
| draft2019-09 | 435 | ✅ 435 | 19.8M | 231/435 | 20.1M | 231 | +2% |
| draft2020-12 | 448 | ✅ 448 | 20.8M | 219/448 | 18.6M | 219 | -11% |
| **Total** | 1671 | 1670/1671 | 20.7M | 988/1671 | 18.0M | 988 | -13% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**Result**: 🟢 **tjs** is **2.43x faster** (23 ns vs 56 ns per test, 3702 tests in 988 groups)

## Detailed Results by Draft

Showing performance for each test group. ✅ = all tests pass, ❌ = some tests fail.

### draft4

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 38.7M | ✅ | 12.4M | 🟢 **-68%** |
| additionalItems.json | when items is schema, additionalItems... | 1 | ✅ | 81.3M | ✅ | 61.9M | 🟢 **-24%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 130.0M | ✅ | 38.2M | 🟢 **-71%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 99.5M | ✅ | 79.4M | 🟢 **-20%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 128.4M | ✅ | 47.5M | 🟢 **-63%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 34.5M | ✅ | 19.3M | 🟢 **-44%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 51.8M | ✅ | 20.8M | 🟢 **-60%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 56.6M | ✅ | 43.8M | 🟢 **-23%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 154.3M | ✅ | 76.6M | 🟢 **-50%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 45.6M | ✅ | 17.7M | 🟢 **-61%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 25.5M | ✅ | 6.6M | 🟢 **-74%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 33.3M | ✅ | 15.4M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 25.5M | ✅ | 18.8M | 🟢 **-26%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 140.7M | ✅ | 72.0M | 🟢 **-49%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 39.0M | ✅ | 10.7M | 🟢 **-73%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 42.5M | ✅ | 41.1M | -3% |
| allOf.json | allOf | 4 | ✅ | 48.4M | ✅ | 29.4M | 🟢 **-39%** |
| allOf.json | allOf with base schema | 5 | ✅ | 22.7M | ✅ | 14.5M | 🟢 **-36%** |
| allOf.json | allOf simple types | 2 | ✅ | 111.3M | ✅ | 54.0M | 🟢 **-51%** |
| allOf.json | allOf with one empty schema | 1 | ✅ | 152.9M | ✅ | 76.5M | 🟢 **-50%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 152.8M | ✅ | 63.5M | 🟢 **-58%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 55.5M | ✅ | 56.9M | +2% |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 112.4M | ✅ | 30.3M | 🟢 **-73%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 48.1M | ✅ | 56.6M | +18% |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 78.7M | ✅ | 17.3M | 🟢 **-78%** |
| anyOf.json | anyOf | 4 | ✅ | 54.4M | ✅ | 32.2M | 🟢 **-41%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 56.5M | ✅ | 26.0M | 🟢 **-54%** |
| anyOf.json | anyOf complex types | 4 | ✅ | 43.9M | ✅ | 46.7M | +6% |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 165.7M | ✅ | 74.9M | 🟢 **-55%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 57.2M | ✅ | 30.1M | 🟢 **-47%** |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 98.5M | -3% |
| default.json | invalid string value for default | 2 | ✅ | 49.4M | ✅ | 63.3M | 🔴 **+28%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 77.9M | ✅ | 33.0M | 🟢 **-58%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 12.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 88.2M | ✅ | 44.9M | 🟢 **-49%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 29.0M | ✅ | 33.7M | +16% |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 57.3M | ✅ | 23.2M | 🟢 **-60%** |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 17.6M | ✅ | 13.8M | 🟢 **-22%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 53.0M | ✅ | 35.8M | 🟢 **-32%** |
| enum.json | simple enum validation | 2 | ✅ | 56.3M | ✅ | 32.4M | 🟢 **-42%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 61.2M | ✅ | 981K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 58.0M | ✅ | 3.7M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 48.8M | ✅ | 33.2M | 🟢 **-32%** |
| enum.json | enum with escaped characters | 3 | ✅ | 49.0M | ✅ | 33.3M | 🟢 **-32%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 103.9M | ✅ | 26.3M | 🟢 **-75%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 47.7M | ✅ | 4.5M | 🟢 **-91%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 102.4M | ✅ | 27.1M | 🟢 **-74%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 47.8M | ✅ | 4.4M | 🟢 **-91%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 112.6M | ✅ | 37.4M | 🟢 **-67%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 53.1M | ✅ | 4.8M | 🟢 **-91%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 112.4M | ✅ | 36.7M | 🟢 **-67%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 53.2M | ✅ | 4.8M | 🟢 **-91%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.1M | ✅ | 29.9M | 🟢 **-66%** |
| enum.json | characters with the same visual repre... | 2 | ✅ | 46.0M | ✅ | 47.4M | +3% |
| enum.json | characters with the same visual repre... | 2 | ✅ | 90.5M | ✅ | 29.0M | 🟢 **-68%** |
| format.json | email format | 6 | ✅ | 72.9M | ✅ | 118.8M | 🔴 **+63%** |
| format.json | ipv4 format | 6 | ✅ | 158.1M | ✅ | 70.5M | 🟢 **-55%** |
| format.json | ipv6 format | 6 | ✅ | 77.2M | ✅ | 74.5M | -4% |
| format.json | hostname format | 6 | ✅ | 157.9M | ✅ | 106.0M | 🟢 **-33%** |
| format.json | date-time format | 6 | ✅ | 73.2M | ✅ | 74.9M | +2% |
| format.json | uri format | 6 | ✅ | 158.4M | ✅ | 70.5M | 🟢 **-56%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 35.9M | ✅ | 16.2M | 🟢 **-55%** |
| items.json | a schema given for items | 4 | ✅ | 87.3M | ✅ | 34.0M | 🟢 **-61%** |
| items.json | an array of schemas for items | 6 | ✅ | 54.1M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 32.6M | ✅ | 6.5M | 🟢 **-80%** |
| items.json | nested items | 3 | ✅ | 13.1M | ✅ | 3.1M | 🟢 **-76%** |
| items.json | items with null instance elements | 1 | ✅ | 70.1M | ✅ | 63.6M | -9% |
| items.json | array-form items with null instance e... | 1 | ✅ | 75.0M | ✅ | 79.0M | +5% |
| maxItems.json | maxItems validation | 4 | ✅ | 64.4M | ✅ | 42.6M | 🟢 **-34%** |
| maxLength.json | maxLength validation | 5 | ✅ | 53.5M | ❌ | - | - |
| maxProperties.json | maxProperties validation | 6 | ✅ | 49.8M | ✅ | 40.3M | -19% |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 39.4M | ✅ | 39.3M | 0% |
| maximum.json | maximum validation | 4 | ✅ | 61.6M | ✅ | 42.2M | 🟢 **-32%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 60.7M | ✅ | 71.5M | +18% |
| maximum.json | maximum validation (explicit false ex... | 4 | ✅ | 61.6M | ✅ | 42.1M | 🟢 **-32%** |
| maximum.json | exclusiveMaximum validation | 2 | ✅ | 53.2M | ✅ | 56.0M | +5% |
| minItems.json | minItems validation | 4 | ✅ | 65.5M | ✅ | 42.7M | 🟢 **-35%** |
| minLength.json | minLength validation | 5 | ✅ | 47.4M | ❌ | - | - |
| minProperties.json | minProperties validation | 6 | ✅ | 49.9M | ✅ | 40.2M | -20% |
| minimum.json | minimum validation | 4 | ✅ | 61.8M | ✅ | 71.9M | +16% |
| minimum.json | minimum validation (explicit false ex... | 4 | ✅ | 60.6M | ✅ | 40.9M | 🟢 **-32%** |
| minimum.json | exclusiveMinimum validation | 2 | ✅ | 52.7M | ✅ | 55.5M | +5% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 57.9M | ✅ | 41.0M | 🟢 **-29%** |
| multipleOf.json | by int | 3 | ✅ | 60.9M | ✅ | 68.0M | +12% |
| multipleOf.json | by number | 3 | ✅ | 56.0M | ✅ | 4.0M | 🟢 **-93%** |
| multipleOf.json | by small number | 2 | ✅ | 51.4M | ✅ | 2.2M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 38.9M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 63.5M | ❌ | - | - |
| not.json | not | 2 | ✅ | 56.0M | ✅ | 29.0M | 🟢 **-48%** |
| not.json | not multiple types | 3 | ✅ | 49.5M | ✅ | 44.8M | -10% |
| not.json | not more complex schema | 3 | ✅ | 52.4M | ✅ | 35.5M | 🟢 **-32%** |
| not.json | forbidden property | 2 | ✅ | 42.2M | ✅ | 55.9M | 🔴 **+33%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 40.4M | ✅ | 20.3M | 🟢 **-50%** |
| not.json | double negation | 1 | ✅ | 154.2M | ✅ | 115.4M | 🟢 **-25%** |
| oneOf.json | oneOf | 4 | ✅ | 46.2M | ✅ | 29.1M | 🟢 **-37%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 28.8M | ✅ | 45.4M | 🔴 **+57%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 37.2M | ✅ | 24.0M | 🟢 **-35%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 55.0M | ✅ | 57.7M | +5% |
| oneOf.json | oneOf with required | 4 | ✅ | 38.0M | ✅ | 24.6M | 🟢 **-35%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 40.1M | ✅ | 37.8M | -6% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 55.5M | ✅ | 32.7M | 🟢 **-41%** |
| pattern.json | pattern validation | 8 | ✅ | 48.3M | ✅ | 61.0M | 🔴 **+26%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 46.1M | ✅ | 22.6M | 🟢 **-51%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.6M | ✅ | 11.9M | 🟢 **-53%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.5M | ✅ | 5.4M | 🟢 **-63%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.0M | ✅ | 12.5M | 🟢 **-26%** |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.4M | ✅ | 18.7M | +8% |
| properties.json | object properties validation | 6 | ✅ | 45.4M | ✅ | 48.4M | +7% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.1M | ✅ | 9.1M | 🟢 **-52%** |
| properties.json | properties with escaped characters | 2 | ✅ | 36.0M | ✅ | 31.7M | -12% |
| properties.json | properties with null valued instance ... | 1 | ✅ | 60.0M | ✅ | 69.8M | +16% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 24.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 22.5M | ✅ | 17.3M | 🟢 **-23%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 41.0M | ✅ | 31.2M | 🟢 **-24%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 45.9M | ✅ | 21.1M | 🟢 **-54%** |
| ref.json | escaped pointer ref | 6 | ✅ | 36.9M | ✅ | 24.8M | 🟢 **-33%** |
| ref.json | nested refs | 2 | ✅ | 43.5M | ✅ | 20.1M | 🟢 **-54%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 42.4M | ❌ | - | - |
| ref.json | $ref prevents a sibling id from chang... | 2 | ✅ | 53.0M | ✅ | 25.4M | 🟢 **-52%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.2M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 42.5M | ✅ | 32.2M | 🟢 **-24%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 42.5M | ✅ | 31.7M | 🟢 **-25%** |
| ref.json | Recursive references between schemas | 2 | ✅ | 10.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 41.8M | ✅ | 26.0M | 🟢 **-38%** |
| ref.json | Location-independent identifier | 2 | ✅ | 56.0M | ✅ | 29.9M | 🟢 **-47%** |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 53.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 2 | ✅ | 44.8M | ✅ | 3.3M | 🟢 **-93%** |
| ref.json | id must be resolved against nearest p... | 2 | ✅ | 53.1M | ❌ | - | - |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.5M | ✅ | 26.8M | 🟢 **-52%** |
| ref.json | id with file URI still resolves point... | 2 | ✅ | 55.5M | ✅ | 32.5M | 🟢 **-41%** |
| ref.json | empty tokens in $ref json-pointer | 2 | ✅ | 55.5M | ❌ | - | - |
| refRemote.json | remote ref | 2 | ✅ | 53.2M | ❌ | - | - |
| refRemote.json | fragment within remote ref | 2 | ✅ | 51.4M | ❌ | - | - |
| refRemote.json | ref within remote ref | 2 | ✅ | 53.5M | ❌ | - | - |
| refRemote.json | base URI change | 2 | ✅ | 28.6M | ❌ | - | - |
| refRemote.json | base URI change - change folder | 2 | ✅ | 36.4M | ❌ | - | - |
| refRemote.json | base URI change - change folder in su... | 2 | ✅ | 36.3M | ❌ | - | - |
| refRemote.json | root ref in remote ref | 3 | ✅ | 34.7M | ❌ | - | - |
| refRemote.json | Location-independent identifier in re... | 2 | ✅ | 53.6M | ❌ | - | - |
| required.json | required validation | 5 | ✅ | 51.8M | ✅ | 33.6M | 🟢 **-35%** |
| required.json | required default validation | 1 | ✅ | 154.3M | ✅ | 108.9M | 🟢 **-29%** |
| required.json | required with escaped characters | 2 | ✅ | 40.3M | ✅ | 16.9M | 🟢 **-58%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.3M | ❌ | - | - |
| type.json | integer type matches integers | 8 | ✅ | 41.7M | ✅ | 22.6M | 🟢 **-46%** |
| type.json | number type matches numbers | 9 | ✅ | 45.4M | ✅ | 47.3M | +4% |
| type.json | string type matches strings | 9 | ✅ | 47.6M | ✅ | 27.1M | 🟢 **-43%** |
| type.json | object type matches objects | 7 | ✅ | 41.2M | ✅ | 39.4M | -4% |
| type.json | array type matches arrays | 7 | ✅ | 44.3M | ✅ | 22.7M | 🟢 **-49%** |
| type.json | boolean type matches booleans | 10 | ✅ | 43.7M | ✅ | 23.9M | 🟢 **-45%** |
| type.json | null type matches only the null object | 10 | ✅ | 51.4M | ✅ | 37.3M | 🟢 **-27%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 53.6M | ✅ | 25.4M | 🟢 **-53%** |
| type.json | type as array with one item | 2 | ✅ | 52.3M | ✅ | 60.0M | +15% |
| type.json | type: array or object | 5 | ✅ | 48.8M | ✅ | 28.1M | 🟢 **-42%** |
| type.json | type: array, object or null | 5 | ✅ | 55.0M | ✅ | 56.2M | +2% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.9M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 27.9M | ✅ | 10.7M | 🟢 **-62%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 17.5M | ✅ | 11.9M | 🟢 **-32%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 144.4M | ✅ | 72.5M | 🟢 **-50%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 69.0M | ✅ | 45.4M | 🟢 **-34%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 58.1M | ✅ | 45.3M | 🟢 **-22%** |
| optional/bignum.json | integer | 2 | ✅ | 72.3M | ✅ | 67.3M | -7% |
| optional/bignum.json | number | 2 | ✅ | 75.9M | ✅ | 107.5M | 🔴 **+42%** |
| optional/bignum.json | string | 1 | ✅ | 42.4M | ✅ | 20.8M | 🟢 **-51%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 70.2M | ✅ | 96.1M | 🔴 **+37%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 40.8M | ✅ | 20.5M | 🟢 **-50%** |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 70.2M | ✅ | 96.4M | 🔴 **+37%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 40.8M | ✅ | 20.4M | 🟢 **-50%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 48.7M | ✅ | 26.8M | 🟢 **-45%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.2M | ✅ | 20.8M | +14% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.2M | ✅ | 28.4M | +17% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 24.1M | ✅ | 20.8M | -14% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.1M | ✅ | 27.6M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 24.6M | ✅ | 23.5M | -5% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 24.3M | ✅ | 28.2M | +16% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 24.1M | ✅ | 19.9M | -17% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 31.0M | ✅ | 34.2M | +10% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 25.3M | ✅ | 16.9M | 🟢 **-33%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 13.6M | ✅ | 11.5M | -16% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 13.9M | ✅ | 13.8M | -1% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 24.5M | ✅ | 18.9M | 🟢 **-23%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.3M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 17.9M | ✅ | 10.0M | 🟢 **-44%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 19.9M | ✅ | 13.7M | 🟢 **-31%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 6.5M | -18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.5M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 19.6M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 23.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 17.7M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.6M | ✅ | 4.9M | 🟢 **-54%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 35.2M | ✅ | 10.1M | 🟢 **-71%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.1M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 73.9M | ✅ | 74.3M | +1% |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.2M | ❌ | - | - |
| optional/id.json | id inside an enum is not a real ident... | 3 | ✅ | 36.8M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 26.0M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 16.4M | ❌ | - | - |
| optional/zeroTerminatedFloats.json | some languages do not distinguish bet... | 1 | ❌ | - | ❌ | - | - |

### draft6

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 60.4M | ✅ | 31.7M | 🟢 **-48%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 39.0M | ✅ | 14.1M | 🟢 **-64%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.3M | ✅ | 90.5M | 🟢 **-43%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.9M | ✅ | 28.7M | 🟢 **-63%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.9M | ✅ | 105.0M | 🟢 **-39%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 53.1M | 🟢 **-36%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 20.0M | 🟢 **-65%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 38.5M | ✅ | 22.4M | 🟢 **-42%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.7M | ✅ | 43.5M | 🟢 **-60%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ✅ | 76.5M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 57.4M | ✅ | 17.7M | 🟢 **-69%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.7M | ✅ | 11.3M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 48.8M | ✅ | 27.3M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.5M | ✅ | 19.9M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.5M | ✅ | 108.6M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 9.6M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.1M | ✅ | 50.9M | 🟢 **-23%** |
| allOf.json | allOf | 4 | ✅ | 34.7M | ✅ | 19.6M | 🟢 **-44%** |
| allOf.json | allOf with base schema | 5 | ✅ | 29.8M | ✅ | 19.9M | 🟢 **-33%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 28.8M | 🟢 **-52%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 114.1M | 🟢 **-28%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.2M | ✅ | 76.4M | 🟢 **-52%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.5M | ✅ | 113.3M | 🟢 **-29%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.0M | ✅ | 28.4M | 🟢 **-54%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 52.0M | 🟢 **-55%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 31.9M | 🟢 **-51%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 31.1M | 🟢 **-63%** |
| anyOf.json | anyOf | 4 | ✅ | 66.6M | ✅ | 38.8M | 🟢 **-42%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 51.0M | ✅ | 45.4M | -11% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.4M | ✅ | 51.1M | 🟢 **-68%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.5M | ✅ | 115.6M | 🟢 **-28%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.7M | ✅ | 32.1M | 🟢 **-57%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.8M | ✅ | 115.0M | 🟢 **-33%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.7M | ✅ | 30.1M | 🟢 **-75%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 184.1M | ✅ | 124.0M | 🟢 **-33%** |
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
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 74.2M | -8% |
| default.json | invalid type for default | 2 | ✅ | 101.3M | ✅ | 98.4M | -3% |
| default.json | invalid string value for default | 2 | ✅ | 50.4M | ✅ | 34.7M | 🟢 **-31%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 38.3M | ✅ | 31.1M | -19% |
| definitions.json | validate definition against metaschema | 2 | ✅ | 11.2M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 90.7M | ✅ | 44.8M | 🟢 **-51%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.8M | ✅ | 70.0M | 🟢 **-60%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 39.9M | ✅ | 22.7M | 🟢 **-43%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 39.8M | ✅ | 38.8M | -2% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 85.5M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.8M | ✅ | 13.6M | 🟢 **-27%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 48.1M | ✅ | 35.5M | 🟢 **-26%** |
| enum.json | simple enum validation | 2 | ✅ | 31.9M | ✅ | 17.7M | 🟢 **-45%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 57.2M | ✅ | 962K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 58.4M | ✅ | 3.8M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 55.4M | ✅ | 37.2M | 🟢 **-33%** |
| enum.json | enum with escaped characters | 3 | ✅ | 70.3M | ✅ | 37.9M | 🟢 **-46%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 110.1M | ✅ | 47.1M | 🟢 **-57%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.0M | ✅ | 4.2M | 🟢 **-92%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 107.4M | ✅ | 47.5M | 🟢 **-56%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 52.3M | ✅ | 4.2M | 🟢 **-92%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 114.4M | ✅ | 64.5M | 🟢 **-44%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.3M | ✅ | 4.6M | 🟢 **-92%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 104.5M | ✅ | 64.3M | 🟢 **-38%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ✅ | 4.6M | 🟢 **-92%** |
| enum.json | nul characters in strings | 2 | ✅ | 88.8M | ✅ | 52.4M | 🟢 **-41%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.5M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 112.9M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 81.4M | ✅ | 68.9M | -15% |
| format.json | ipv4 format | 6 | ✅ | 162.3M | ✅ | 67.0M | 🟢 **-59%** |
| format.json | ipv6 format | 6 | ✅ | 87.9M | ✅ | 116.1M | 🔴 **+32%** |
| format.json | hostname format | 6 | ✅ | 163.1M | ✅ | 75.2M | 🟢 **-54%** |
| format.json | date-time format | 6 | ✅ | 87.2M | ✅ | 69.9M | -20% |
| format.json | json-pointer format | 6 | ✅ | 162.9M | ✅ | 126.2M | 🟢 **-23%** |
| format.json | uri format | 6 | ✅ | 81.2M | ✅ | 70.4M | -13% |
| format.json | uri-reference format | 6 | ✅ | 163.6M | ✅ | 73.0M | 🟢 **-55%** |
| format.json | uri-template format | 6 | ✅ | 88.3M | ✅ | 62.8M | 🟢 **-29%** |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 57.4M | ✅ | 13.5M | 🟢 **-76%** |
| items.json | a schema given for items | 4 | ✅ | 55.7M | ✅ | 46.9M | -16% |
| items.json | an array of schemas for items | 6 | ✅ | 108.9M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.9M | ✅ | 64.9M | 🟢 **-62%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 104.4M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 62.1M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 34.7M | ✅ | 8.0M | 🟢 **-77%** |
| items.json | nested items | 3 | ✅ | 12.7M | ✅ | 2.8M | 🟢 **-78%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 93.6M | 🔴 **+21%** |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 57.8M | 🟢 **-30%** |
| maxItems.json | maxItems validation | 4 | ✅ | 73.7M | ✅ | 75.0M | +2% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 29.2M | 🟢 **-54%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.0M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.6M | ✅ | 29.3M | 🟢 **-43%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 52.7M | ✅ | 58.8M | +12% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.8M | ✅ | 23.9M | 🟢 **-43%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 40.2M | ✅ | 37.8M | -6% |
| maximum.json | maximum validation | 4 | ✅ | 68.9M | ✅ | 42.2M | 🟢 **-39%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.5M | ✅ | 66.5M | -2% |
| minItems.json | minItems validation | 4 | ✅ | 73.7M | ✅ | 42.4M | 🟢 **-42%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.1M | ✅ | 47.5M | 🟢 **-25%** |
| minLength.json | minLength validation | 5 | ✅ | 52.9M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.2M | ✅ | 32.1M | 🟢 **-39%** |
| minProperties.json | minProperties validation | 6 | ✅ | 53.8M | ✅ | 59.5M | +11% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 42.2M | ✅ | 24.3M | 🟢 **-42%** |
| minimum.json | minimum validation | 4 | ✅ | 66.2M | ✅ | 73.4M | +11% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.7M | ✅ | 41.1M | 🟢 **-36%** |
| multipleOf.json | by int | 3 | ✅ | 68.6M | ✅ | 65.7M | -4% |
| multipleOf.json | by number | 3 | ✅ | 63.7M | ✅ | 3.8M | 🟢 **-94%** |
| multipleOf.json | by small number | 2 | ✅ | 56.7M | ✅ | 2.3M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 29.9M | 🟢 **-52%** |
| not.json | not multiple types | 3 | ✅ | 56.0M | ✅ | 43.9M | 🟢 **-22%** |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ✅ | 35.4M | 🟢 **-39%** |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 59.0M | 🔴 **+28%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.9M | ✅ | 20.6M | 🟢 **-58%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 48.8M | ✅ | 36.4M | 🟢 **-25%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 179.4M | ✅ | 72.5M | 🟢 **-60%** |
| not.json | double negation | 1 | ✅ | 159.3M | ✅ | 63.3M | 🟢 **-60%** |
| oneOf.json | oneOf | 4 | ✅ | 50.9M | ✅ | 48.9M | -4% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 32.8M | ✅ | 26.5M | -19% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.8M | ✅ | 39.1M | 🟢 **-22%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 20.5M | 🟢 **-59%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 38.8M | 🟢 **-22%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.1M | ✅ | 23.9M | 🟢 **-40%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 57.7M | -7% |
| oneOf.json | oneOf with required | 4 | ✅ | 41.0M | ✅ | 24.7M | 🟢 **-40%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.6M | ✅ | 37.2M | -15% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 32.2M | 🟢 **-48%** |
| pattern.json | pattern validation | 8 | ✅ | 52.6M | ✅ | 60.6M | +15% |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.4M | ✅ | 24.2M | 🟢 **-49%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 24.7M | ✅ | 12.0M | 🟢 **-51%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.2M | ✅ | 5.4M | 🟢 **-62%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.6M | ✅ | 13.0M | 🟢 **-26%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 11.4M | ✅ | 19.8M | 🔴 **+74%** |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ✅ | 48.9M | -2% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 19.0M | ✅ | 9.1M | 🟢 **-52%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.8M | ✅ | 13.7M | 🟢 **-69%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 106.5M | 🔴 **+64%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 43.1M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.2M | ✅ | 72.5M | 🟢 **-58%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 43.9M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 38.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 40.8M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 23.9M | ✅ | 16.9M | 🟢 **-29%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 57.2M | ✅ | 29.2M | 🟢 **-49%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ✅ | 21.3M | 🟢 **-59%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.1M | ✅ | 25.0M | 🟢 **-37%** |
| ref.json | nested refs | 2 | ✅ | 47.4M | ✅ | 21.5M | 🟢 **-55%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 25.9M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.8M | ✅ | 32.2M | 🟢 **-31%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.9M | ✅ | 32.0M | 🟢 **-32%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.1M | ✅ | 55.9M | 🟢 **-65%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.7M | ✅ | 25.9M | 🟢 **-44%** |
| ref.json | Location-independent identifier | 2 | ✅ | 57.4M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 59.8M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.0M | ✅ | 3.1M | 🟢 **-93%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.8M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.3M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.7M | ✅ | 26.7M | 🟢 **-43%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ✅ | 30.0M | 🟢 **-36%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.7M | ✅ | 26.7M | 🟢 **-43%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.7M | ✅ | 30.0M | 🟢 **-36%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.4M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.5M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 26.8M | 🟢 **-57%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 32.1M | 🟢 **-49%** |
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
| required.json | required validation | 5 | ✅ | 58.0M | ✅ | 33.7M | 🟢 **-42%** |
| required.json | required default validation | 1 | ✅ | 159.1M | ✅ | 108.9M | 🟢 **-32%** |
| required.json | required with empty array | 1 | ✅ | 159.2M | ✅ | 60.6M | 🟢 **-62%** |
| required.json | required with escaped characters | 2 | ✅ | 44.4M | ✅ | 32.0M | 🟢 **-28%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.2M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.8M | ✅ | 23.1M | 🟢 **-56%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 48.3M | -12% |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 27.1M | 🟢 **-50%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 40.1M | -13% |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ✅ | 22.8M | 🟢 **-56%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.8M | ✅ | 23.9M | 🟢 **-54%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.1M | ✅ | 37.9M | 🟢 **-21%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ✅ | 24.9M | 🟢 **-52%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 60.5M | -3% |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 28.1M | 🟢 **-50%** |
| type.json | type: array, object or null | 5 | ✅ | 64.4M | ✅ | 56.9M | -12% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.0M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.2M | ✅ | 11.1M | 🟢 **-65%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.2M | ✅ | 12.2M | 🟢 **-33%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 155.6M | ✅ | 72.1M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.3M | ✅ | 46.6M | 🟢 **-39%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 68.6M | ✅ | 46.7M | 🟢 **-32%** |
| optional/bignum.json | integer | 2 | ✅ | 79.8M | ✅ | 66.1M | -17% |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 107.2M | 🔴 **+27%** |
| optional/bignum.json | string | 1 | ✅ | 47.6M | ✅ | 19.4M | 🟢 **-59%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 64.7M | -16% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 76.6M | ✅ | 64.5M | -16% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 20.7M | 🟢 **-61%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 17.2M | ✅ | 26.9M | 🔴 **+56%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 20.7M | -18% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 18.9M | ✅ | 28.6M | 🔴 **+51%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.4M | ✅ | 19.2M | 🟢 **-27%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.6M | ✅ | 30.5M | +19% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 26.8M | ✅ | 20.2M | 🟢 **-25%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.2M | ✅ | 28.5M | +9% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 23.4M | -10% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 25.4M | -8% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.2M | ✅ | 11.4M | -20% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.7M | ✅ | 13.7M | -7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ✅ | 18.5M | 🟢 **-30%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 19.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.2M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.5M | ✅ | 10.0M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ✅ | 13.8M | 🟢 **-33%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.8M | ✅ | 6.4M | -18% |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 8.6M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 20.4M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.5M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 17 | ✅ | 18.1M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 27 | ✅ | 10.7M | ✅ | 5.8M | 🟢 **-46%** |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.5M | ✅ | 10.4M | 🟢 **-73%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 29.8M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 83.7M | ✅ | 71.2M | -15% |
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

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 56.5M | ✅ | 7.1M | 🟢 **-87%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 43.5M | ✅ | 16.9M | 🟢 **-61%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.3M | ✅ | 89.8M | 🟢 **-44%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.3M | ✅ | 29.7M | 🟢 **-61%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.6M | ✅ | 121.8M | 🟢 **-29%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 53.1M | 🟢 **-36%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 56.9M | ✅ | 19.8M | 🟢 **-65%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 45.1M | ✅ | 22.0M | 🟢 **-51%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 107.4M | ✅ | 44.7M | 🟢 **-58%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 158.8M | ✅ | 73.4M | 🟢 **-54%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 66.5M | ✅ | 16.7M | 🟢 **-75%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 32.2M | ✅ | 11.6M | 🟢 **-64%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.9M | ✅ | 25.3M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.7M | ✅ | 19.5M | 🟢 **-45%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.4M | ✅ | 109.9M | 🟢 **-31%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.6M | ✅ | 9.0M | 🟢 **-69%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 50.6M | 🟢 **-24%** |
| allOf.json | allOf | 4 | ✅ | 34.1M | ✅ | 19.6M | 🟢 **-43%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.1M | ✅ | 20.2M | 🟢 **-33%** |
| allOf.json | allOf simple types | 2 | ✅ | 51.1M | ✅ | 28.9M | 🟢 **-43%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 158.8M | ✅ | 112.7M | 🟢 **-29%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.1M | ✅ | 76.3M | 🟢 **-52%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 112.0M | 🟢 **-30%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 52.2M | ✅ | 32.1M | 🟢 **-38%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 32.1M | 🟢 **-72%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 61.4M | ✅ | 32.9M | 🟢 **-46%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 82.6M | ✅ | 30.8M | 🟢 **-63%** |
| anyOf.json | anyOf | 4 | ✅ | 66.5M | ✅ | 39.8M | 🟢 **-40%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 45.1M | ✅ | 45.2M | +0% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 75.8M | 🟢 **-52%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 158.9M | ✅ | 116.4M | 🟢 **-27%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 74.5M | ✅ | 32.1M | 🟢 **-57%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 171.3M | ✅ | 116.0M | 🟢 **-32%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 119.4M | ✅ | 32.9M | 🟢 **-72%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 176.2M | ✅ | 123.9M | 🟢 **-30%** |
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
| contains.json | contains with null instance elements | 1 | ✅ | 128.8M | ✅ | 72.7M | 🟢 **-44%** |
| default.json | invalid type for default | 2 | ✅ | 66.5M | ✅ | 98.4M | 🔴 **+48%** |
| default.json | invalid string value for default | 2 | ✅ | 71.3M | ✅ | 68.0M | -5% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 49.3M | ✅ | 32.7M | 🟢 **-34%** |
| definitions.json | validate definition against metaschema | 2 | ✅ | 13.3M | ❌ | - | - |
| dependencies.json | dependencies | 7 | ✅ | 59.3M | ✅ | 44.3M | 🟢 **-25%** |
| dependencies.json | dependencies with empty array | 3 | ✅ | 175.5M | ✅ | 93.6M | 🟢 **-47%** |
| dependencies.json | multiple dependencies | 6 | ✅ | 30.7M | ✅ | 23.2M | 🟢 **-24%** |
| dependencies.json | multiple dependencies subschema | 5 | ✅ | 39.9M | ✅ | 38.7M | -3% |
| dependencies.json | dependencies with boolean subschemas | 4 | ✅ | 50.2M | ❌ | - | - |
| dependencies.json | dependencies with escaped characters | 7 | ✅ | 18.6M | ✅ | 13.6M | 🟢 **-27%** |
| dependencies.json | dependent subschema incompatible with... | 4 | ✅ | 37.7M | ✅ | 35.6M | -6% |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 30.5M | 🟢 **-52%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 41.4M | ✅ | 965K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 64.8M | ✅ | 3.7M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 38.1M | ✅ | 37.4M | -2% |
| enum.json | enum with escaped characters | 3 | ✅ | 71.3M | ✅ | 37.8M | 🟢 **-47%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 58.4M | ✅ | 46.8M | -20% |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 54.0M | ✅ | 4.1M | 🟢 **-92%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 59.4M | ✅ | 46.1M | 🟢 **-22%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 54.1M | ✅ | 4.2M | 🟢 **-92%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 66.2M | ✅ | 64.9M | -2% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 59.1M | ✅ | 4.6M | 🟢 **-92%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 66.4M | ✅ | 64.2M | -3% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 60.4M | ✅ | 4.6M | 🟢 **-92%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.2M | ✅ | 52.5M | -5% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 59.7M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 56.7M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 87.4M | ✅ | 75.2M | -14% |
| format.json | idn-email format | 6 | ✅ | 88.3M | ✅ | 69.2M | 🟢 **-22%** |
| format.json | regex format | 6 | ✅ | 87.9M | ✅ | 126.2M | 🔴 **+44%** |
| format.json | ipv4 format | 6 | ✅ | 87.7M | ✅ | 70.5M | -20% |
| format.json | ipv6 format | 6 | ✅ | 86.4M | ✅ | 75.5M | -13% |
| format.json | idn-hostname format | 6 | ✅ | 87.4M | ✅ | 113.2M | 🔴 **+30%** |
| format.json | hostname format | 6 | ✅ | 87.7M | ✅ | 73.1M | -17% |
| format.json | date format | 6 | ✅ | 86.8M | ✅ | 70.3M | -19% |
| format.json | date-time format | 6 | ✅ | 88.3M | ✅ | 115.8M | 🔴 **+31%** |
| format.json | time format | 6 | ✅ | 85.5M | ✅ | 70.3M | -18% |
| format.json | json-pointer format | 6 | ✅ | 85.0M | ✅ | 79.5M | -7% |
| format.json | relative-json-pointer format | 6 | ✅ | 88.0M | ✅ | 59.9M | 🟢 **-32%** |
| format.json | iri format | 6 | ✅ | 87.9M | ✅ | 77.5M | -12% |
| format.json | iri-reference format | 6 | ✅ | 88.2M | ✅ | 66.5M | 🟢 **-25%** |
| format.json | uri format | 6 | ✅ | 88.1M | ✅ | 115.2M | 🔴 **+31%** |
| format.json | uri-reference format | 6 | ✅ | 88.1M | ✅ | 72.2M | -18% |
| format.json | uri-template format | 6 | ✅ | 88.2M | ✅ | 70.3M | 🟢 **-20%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.8M | ✅ | 121.7M | 🟢 **-29%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.2M | ✅ | 52.1M | 🟢 **-70%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.7M | ✅ | 66.3M | 🟢 **-61%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.4M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 62.3M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 169.7M | ✅ | 79.3M | 🟢 **-53%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 40.9M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.7M | ✅ | 15.4M | 🟢 **-60%** |
| items.json | a schema given for items | 4 | ✅ | 60.1M | ✅ | 33.7M | 🟢 **-44%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.0M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 170.2M | ✅ | 65.5M | 🟢 **-62%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 70.6M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 61.8M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.9M | ✅ | 6.1M | 🟢 **-79%** |
| items.json | nested items | 3 | ✅ | 13.5M | ✅ | 2.2M | 🟢 **-83%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 63.5M | -18% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 78.9M | -5% |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 41.6M | 🟢 **-44%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 43.6M | 🟢 **-31%** |
| maxLength.json | maxLength validation | 5 | ✅ | 58.8M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.7M | ✅ | 29.7M | 🟢 **-43%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 53.7M | ✅ | 58.7M | +9% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 43.1M | ✅ | 23.1M | 🟢 **-46%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 41.9M | ✅ | 38.9M | -7% |
| maximum.json | maximum validation | 4 | ✅ | 69.1M | ✅ | 41.6M | 🟢 **-40%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 67.3M | -1% |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ✅ | 42.5M | 🟢 **-42%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.0M | ✅ | 56.7M | -10% |
| minLength.json | minLength validation | 5 | ✅ | 52.8M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 30.0M | 🟢 **-43%** |
| minProperties.json | minProperties validation | 6 | ✅ | 55.1M | ✅ | 58.6M | +6% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.9M | ✅ | 23.5M | 🟢 **-47%** |
| minimum.json | minimum validation | 4 | ✅ | 69.0M | ✅ | 69.0M | 0% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.6M | ✅ | 40.4M | 🟢 **-37%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 62.4M | -10% |
| multipleOf.json | by number | 3 | ✅ | 64.0M | ✅ | 3.9M | 🟢 **-94%** |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 2.3M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.1M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.7M | ❌ | - | - |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 29.8M | 🟢 **-53%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 44.8M | 🟢 **-20%** |
| not.json | not more complex schema | 3 | ✅ | 59.3M | ✅ | 34.9M | 🟢 **-41%** |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 58.2M | 🔴 **+26%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 49.0M | ✅ | 20.7M | 🟢 **-58%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.0M | ✅ | 35.9M | 🟢 **-27%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 184.0M | ✅ | 74.7M | 🟢 **-59%** |
| not.json | double negation | 1 | ✅ | 159.6M | ✅ | 63.9M | 🟢 **-60%** |
| oneOf.json | oneOf | 4 | ✅ | 59.6M | ✅ | 48.2M | -19% |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.5M | ✅ | 25.5M | 🟢 **-24%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 38.5M | 🟢 **-23%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.7M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.8M | ✅ | 20.4M | 🟢 **-59%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.8M | ✅ | 38.5M | 🟢 **-23%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 40.0M | ✅ | 24.0M | 🟢 **-40%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 57.2M | -7% |
| oneOf.json | oneOf with required | 4 | ✅ | 44.8M | ✅ | 24.1M | 🟢 **-46%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 43.5M | ✅ | 37.2M | -14% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 32.0M | 🟢 **-49%** |
| pattern.json | pattern validation | 8 | ✅ | 49.6M | ✅ | 60.6M | 🔴 **+22%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 47.3M | ✅ | 24.2M | 🟢 **-49%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 25.9M | ✅ | 11.9M | 🟢 **-54%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 14.8M | ✅ | 5.2M | 🟢 **-65%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 16.9M | ✅ | 13.1M | 🟢 **-22%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 20.0M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.8M | ✅ | 18.8M | +6% |
| properties.json | object properties validation | 6 | ✅ | 49.7M | ✅ | 48.5M | -2% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 5.3M | 🟢 **-74%** |
| properties.json | properties with boolean schema | 4 | ✅ | 41.8M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.9M | ✅ | 13.5M | 🟢 **-70%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 106.8M | 🔴 **+65%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 25.9M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.2M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.8M | ✅ | 76.3M | 🟢 **-56%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.6M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 41.2M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.3M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.2M | ✅ | 17.3M | 🟢 **-29%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.2M | ✅ | 31.1M | 🟢 **-33%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.2M | ✅ | 20.6M | 🟢 **-60%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.1M | ✅ | 25.8M | 🟢 **-36%** |
| ref.json | nested refs | 2 | ✅ | 47.2M | ✅ | 21.4M | 🟢 **-55%** |
| ref.json | ref overrides any sibling keywords | 3 | ✅ | 50.1M | ❌ | - | - |
| ref.json | $ref prevents a sibling $id from chan... | 2 | ✅ | 58.3M | ❌ | - | - |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 26.0M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 32.2M | 🟢 **-31%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.1M | ✅ | 31.5M | 🟢 **-32%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.3M | ✅ | 56.4M | 🟢 **-65%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 9.2M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.6M | ✅ | 24.7M | 🟢 **-47%** |
| ref.json | Location-independent identifier | 2 | ✅ | 51.6M | ❌ | - | - |
| ref.json | Reference an anchor with a non-relati... | 2 | ✅ | 58.1M | ❌ | - | - |
| ref.json | Location-independent identifier with ... | 2 | ✅ | 59.7M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.3M | ✅ | 3.1M | 🟢 **-93%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.4M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.5M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.9M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.7M | ✅ | 26.5M | 🟢 **-43%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.7M | ✅ | 31.8M | 🟢 **-32%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.8M | ✅ | 26.1M | 🟢 **-44%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 46.5M | ✅ | 30.4M | 🟢 **-35%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.8M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 58.4M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 60.0M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 60.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 60.0M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 26.7M | 🟢 **-57%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 30.0M | 🟢 **-52%** |
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
| required.json | required validation | 5 | ✅ | 57.7M | ✅ | 33.1M | 🟢 **-43%** |
| required.json | required default validation | 1 | ✅ | 158.8M | ✅ | 108.0M | 🟢 **-32%** |
| required.json | required with empty array | 1 | ✅ | 159.1M | ✅ | 60.6M | 🟢 **-62%** |
| required.json | required with escaped characters | 2 | ✅ | 44.1M | ✅ | 33.2M | 🟢 **-25%** |
| required.json | required properties whose names are J... | 7 | ✅ | 25.0M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 24.2M | 🟢 **-54%** |
| type.json | number type matches numbers | 9 | ✅ | 55.2M | ✅ | 47.8M | -13% |
| type.json | string type matches strings | 9 | ✅ | 54.1M | ✅ | 26.9M | 🟢 **-50%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 39.8M | -14% |
| type.json | array type matches arrays | 7 | ✅ | 51.5M | ✅ | 22.3M | 🟢 **-57%** |
| type.json | boolean type matches booleans | 10 | ✅ | 51.7M | ✅ | 21.2M | 🟢 **-59%** |
| type.json | null type matches only the null object | 10 | ✅ | 62.8M | ✅ | 34.6M | 🟢 **-45%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 51.1M | ✅ | 25.0M | 🟢 **-51%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 60.0M | -4% |
| type.json | type: array or object | 5 | ✅ | 55.6M | ✅ | 28.0M | 🟢 **-50%** |
| type.json | type: array, object or null | 5 | ✅ | 62.1M | ✅ | 55.5M | -11% |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.3M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 31.4M | ✅ | 10.8M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.1M | ✅ | 11.6M | 🟢 **-36%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 158.2M | ✅ | 72.7M | 🟢 **-54%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.1M | ✅ | 46.0M | 🟢 **-40%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.5M | ✅ | 46.2M | 🟢 **-33%** |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 67.4M | -16% |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 105.2M | 🔴 **+25%** |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 20.7M | 🟢 **-57%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.0M | ✅ | 96.1M | 🔴 **+25%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.5M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.0M | ✅ | 64.8M | -16% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 27.1M | ❌ | - | - |
| optional/content.json | validation of string-encoded content ... | 3 | ✅ | 345K | ❌ | - | - |
| optional/content.json | validation of binary string-encoding | 3 | ✅ | 19.3M | ❌ | - | - |
| optional/content.json | validation of binary-encoded media ty... | 4 | ✅ | 429K | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 25.0M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 18.7M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.9M | ✅ | 20.6M | +9% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.8M | ✅ | 20.8M | 🟢 **-23%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 27.0M | ✅ | 27.3M | +1% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 26.6M | ✅ | 19.0M | 🟢 **-29%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.8M | ✅ | 30.2M | +17% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 25.9M | ✅ | 20.9M | -19% |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.8M | ✅ | 28.0M | +5% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 27.0M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.7M | ✅ | 24.7M | -11% |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.7M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.2M | ✅ | 11.5M | -19% |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 14.9M | ✅ | 13.9M | -7% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 26.2M | ✅ | 18.8M | 🟢 **-28%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.0M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 23.0M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.6M | ✅ | 10.0M | 🟢 **-51%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.8M | ✅ | 13.5M | 🟢 **-35%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.1M | ✅ | 6.4M | 🟢 **-21%** |
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
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.3M | ✅ | 8.9M | 🟢 **-77%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.4M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.4M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 28.1M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 72.8M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 37.1M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.3M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.3M | ✅ | 70.2M | -15% |
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

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalItems.json | additionalItems as schema | 2 | ✅ | 25.6M | ✅ | 6.1M | 🟢 **-76%** |
| additionalItems.json | when items is schema, additionalItems... | 2 | ✅ | 36.9M | ✅ | 17.5M | 🟢 **-53%** |
| additionalItems.json | when items is schema, boolean additio... | 1 | ✅ | 159.7M | ✅ | 90.5M | 🟢 **-43%** |
| additionalItems.json | array of items with no additionalItem... | 5 | ✅ | 76.8M | ✅ | 29.8M | 🟢 **-61%** |
| additionalItems.json | additionalItems as false without items | 2 | ✅ | 171.7M | ✅ | 120.4M | 🟢 **-30%** |
| additionalItems.json | additionalItems are allowed by default | 1 | ✅ | 83.0M | ✅ | 53.2M | 🟢 **-36%** |
| additionalItems.json | additionalItems does not look in appl... | 1 | ✅ | 88.6M | ✅ | 19.9M | 🟢 **-78%** |
| additionalItems.json | items validation adjusts the starting... | 2 | ✅ | 39.0M | ✅ | 20.2M | 🟢 **-48%** |
| additionalItems.json | additionalItems with heterogeneous array | 2 | ✅ | 106.8M | ✅ | 45.0M | 🟢 **-58%** |
| additionalItems.json | additionalItems with null instance el... | 1 | ✅ | 159.4M | ✅ | 76.6M | 🟢 **-52%** |
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 61.4M | ✅ | 15.8M | 🟢 **-74%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.6M | ✅ | 11.6M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 47.1M | ✅ | 27.2M | 🟢 **-42%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 35.7M | ✅ | 20.1M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 159.2M | ✅ | 108.9M | 🟢 **-32%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 28.7M | ✅ | 9.5M | 🟢 **-67%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 66.7M | ✅ | 50.4M | 🟢 **-24%** |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.1M | ✅ | 12.4M | 🟢 **-60%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 37.7M | ✅ | 24.5M | 🟢 **-35%** |
| allOf.json | allOf | 4 | ✅ | 34.4M | ✅ | 14.4M | 🟢 **-58%** |
| allOf.json | allOf with base schema | 5 | ✅ | 38.4M | ✅ | 20.4M | 🟢 **-47%** |
| allOf.json | allOf simple types | 2 | ✅ | 60.6M | ✅ | 29.0M | 🟢 **-52%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 159.5M | ✅ | 114.8M | 🟢 **-28%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 49.9M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 92.5M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 159.4M | ✅ | 76.6M | 🟢 **-52%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 159.1M | ✅ | 114.6M | 🟢 **-28%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 62.3M | ✅ | 32.5M | 🟢 **-48%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 115.7M | ✅ | 57.6M | 🟢 **-50%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 64.6M | ✅ | 33.0M | 🟢 **-49%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 83.3M | ✅ | 31.4M | 🟢 **-62%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 62.9M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 113.7M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 59.8M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 62.2M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 65.7M | ✅ | 39.3M | 🟢 **-40%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 33.1M | ✅ | 45.5M | 🔴 **+38%** |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 159.3M | ✅ | 75.5M | 🟢 **-53%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 159.8M | ✅ | 63.7M | 🟢 **-60%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 49.9M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 48.1M | ✅ | 32.4M | 🟢 **-33%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 172.0M | ✅ | 114.3M | 🟢 **-34%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 64.8M | ✅ | 33.1M | 🟢 **-49%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 183.2M | ✅ | 115.1M | 🟢 **-37%** |
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
| contains.json | contains with null instance elements | 1 | ✅ | 80.9M | ✅ | 74.1M | -8% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 176.0M | ✅ | 123.8M | 🟢 **-30%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 176.4M | ✅ | 65.9M | 🟢 **-63%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 179.1M | ✅ | 71.9M | 🟢 **-60%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 183.3M | ✅ | 61.5M | 🟢 **-66%** |
| default.json | invalid type for default | 2 | ✅ | 46.0M | ✅ | 65.2M | 🔴 **+42%** |
| default.json | invalid string value for default | 2 | ✅ | 52.7M | ✅ | 63.3M | 🔴 **+20%** |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 45.5M | ✅ | 54.0M | +19% |
| defs.json | validate definition against metaschema | 2 | ✅ | 1.9M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 59.5M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 103.5M | ✅ | 76.7M | 🟢 **-26%** |
| dependentRequired.json | multiple dependents required | 6 | ✅ | 25.8M | ❌ | - | - |
| dependentRequired.json | dependencies with escaped characters | 4 | ✅ | 41.9M | ❌ | - | - |
| dependentSchemas.json | single dependency | 8 | ✅ | 47.9M | ❌ | - | - |
| dependentSchemas.json | boolean subschemas | 4 | ✅ | 46.9M | ❌ | - | - |
| dependentSchemas.json | dependencies with escaped characters | 4 | ✅ | 39.4M | ❌ | - | - |
| dependentSchemas.json | dependent subschema incompatible with... | 4 | ✅ | 37.0M | ❌ | - | - |
| enum.json | simple enum validation | 2 | ✅ | 63.5M | ✅ | 32.7M | 🟢 **-48%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 42.2M | ✅ | 946K | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 66.8M | ✅ | 3.6M | 🟢 **-95%** |
| enum.json | enums in properties | 6 | ✅ | 38.0M | ✅ | 37.5M | -1% |
| enum.json | enum with escaped characters | 3 | ✅ | 71.1M | ✅ | 37.6M | 🟢 **-47%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 58.8M | ✅ | 47.0M | 🟢 **-20%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 52.3M | ✅ | 4.1M | 🟢 **-92%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 56.9M | ✅ | 46.6M | -18% |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 53.6M | ✅ | 4.1M | 🟢 **-92%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 67.5M | ✅ | 61.6M | -9% |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 58.9M | ✅ | 4.4M | 🟢 **-92%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 67.3M | ✅ | 60.7M | -10% |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 58.8M | ✅ | 4.4M | 🟢 **-93%** |
| enum.json | nul characters in strings | 2 | ✅ | 55.1M | ✅ | 44.7M | -19% |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 55.2M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 54.7M | ❌ | - | - |
| format.json | email format | 6 | ✅ | 181.7M | ✅ | 71.6M | 🟢 **-61%** |
| format.json | idn-email format | 6 | ✅ | 177.4M | ✅ | 68.4M | 🟢 **-61%** |
| format.json | regex format | 6 | ✅ | 180.5M | ✅ | 112.6M | 🟢 **-38%** |
| format.json | ipv4 format | 6 | ✅ | 175.2M | ✅ | 70.2M | 🟢 **-60%** |
| format.json | ipv6 format | 6 | ✅ | 162.0M | ✅ | 71.7M | 🟢 **-56%** |
| format.json | idn-hostname format | 6 | ✅ | 181.2M | ✅ | 111.9M | 🟢 **-38%** |
| format.json | hostname format | 6 | ✅ | 181.7M | ✅ | 55.0M | 🟢 **-70%** |
| format.json | date format | 6 | ✅ | 182.2M | ✅ | 70.1M | 🟢 **-62%** |
| format.json | date-time format | 6 | ✅ | 182.2M | ✅ | 104.9M | 🟢 **-42%** |
| format.json | time format | 6 | ✅ | 145.7M | ✅ | 70.3M | 🟢 **-52%** |
| format.json | json-pointer format | 6 | ✅ | 180.6M | ✅ | 77.5M | 🟢 **-57%** |
| format.json | relative-json-pointer format | 6 | ✅ | 182.5M | ✅ | 62.5M | 🟢 **-66%** |
| format.json | iri format | 6 | ✅ | 182.6M | ✅ | 73.5M | 🟢 **-60%** |
| format.json | iri-reference format | 6 | ✅ | 182.6M | ✅ | 64.3M | 🟢 **-65%** |
| format.json | uri format | 6 | ✅ | 181.7M | ✅ | 114.2M | 🟢 **-37%** |
| format.json | uri-reference format | 6 | ✅ | 177.6M | ✅ | 65.3M | 🟢 **-63%** |
| format.json | uri-template format | 6 | ✅ | 182.8M | ✅ | 67.6M | 🟢 **-63%** |
| format.json | uuid format | 6 | ✅ | 181.5M | ✅ | 87.1M | 🟢 **-52%** |
| format.json | duration format | 6 | ✅ | 180.8M | ✅ | 63.1M | 🟢 **-65%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 171.6M | ✅ | 121.5M | 🟢 **-29%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 171.5M | ✅ | 79.4M | 🟢 **-54%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 171.3M | ✅ | 62.7M | 🟢 **-63%** |
| if-then-else.json | if and then without else | 3 | ✅ | 70.1M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 69.1M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 61.3M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 171.5M | ✅ | 74.0M | 🟢 **-57%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 64.7M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 64.2M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 42.6M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 38.6M | ✅ | 14.6M | 🟢 **-62%** |
| items.json | a schema given for items | 4 | ✅ | 57.4M | ✅ | 32.3M | 🟢 **-44%** |
| items.json | an array of schemas for items | 6 | ✅ | 65.4M | ❌ | - | - |
| items.json | items with boolean schema (true) | 2 | ✅ | 171.5M | ✅ | 65.3M | 🟢 **-62%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 62.3M | ❌ | - | - |
| items.json | items with boolean schemas | 3 | ✅ | 60.5M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 28.5M | ✅ | 6.2M | 🟢 **-78%** |
| items.json | nested items | 3 | ✅ | 13.5M | ✅ | 2.1M | 🟢 **-84%** |
| items.json | single-form items with null instance ... | 1 | ✅ | 77.1M | ✅ | 63.3M | -18% |
| items.json | array-form items with null instance e... | 1 | ✅ | 83.0M | ✅ | 79.1M | -5% |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 171.2M | ✅ | 79.2M | 🟢 **-54%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 51.7M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 57.5M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 50.8M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 73.8M | ✅ | 74.5M | +1% |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 30.1M | 🟢 **-53%** |
| maxLength.json | maxLength validation | 5 | ✅ | 59.1M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 51.6M | ✅ | 31.2M | 🟢 **-40%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 54.0M | ✅ | 58.6M | +9% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 41.9M | ✅ | 24.2M | 🟢 **-42%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 35.2M | ✅ | 38.9M | +11% |
| maximum.json | maximum validation | 4 | ✅ | 69.1M | ✅ | 42.0M | 🟢 **-39%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 67.6M | ✅ | 71.6M | +6% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 171.9M | ✅ | 79.5M | 🟢 **-54%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 59.7M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 55.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 58.4M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 47.5M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 43.5M | ❌ | - | - |
| minContains.json | minContains = 0 with no maxContains | 2 | ✅ | 171.8M | ✅ | 68.2M | 🟢 **-60%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 65.8M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 73.8M | ✅ | 74.8M | +1% |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 63.5M | ✅ | 32.1M | 🟢 **-49%** |
| minLength.json | minLength validation | 5 | ✅ | 53.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 52.3M | ✅ | 31.8M | 🟢 **-39%** |
| minProperties.json | minProperties validation | 6 | ✅ | 54.6M | ✅ | 59.5M | +9% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.6M | ✅ | 24.2M | 🟢 **-45%** |
| minimum.json | minimum validation | 4 | ✅ | 66.8M | ✅ | 72.2M | +8% |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 64.9M | ✅ | 41.1M | 🟢 **-37%** |
| multipleOf.json | by int | 3 | ✅ | 69.1M | ✅ | 67.5M | -2% |
| multipleOf.json | by number | 3 | ✅ | 63.5M | ✅ | 3.9M | 🟢 **-94%** |
| multipleOf.json | by small number | 2 | ✅ | 57.3M | ✅ | 2.3M | 🟢 **-96%** |
| multipleOf.json | float division = inf | 1 | ✅ | 43.2M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 68.9M | ❌ | - | - |
| not.json | not | 2 | ✅ | 62.9M | ✅ | 29.4M | 🟢 **-53%** |
| not.json | not multiple types | 3 | ✅ | 56.1M | ✅ | 43.4M | 🟢 **-23%** |
| not.json | not more complex schema | 3 | ✅ | 58.2M | ✅ | 35.5M | 🟢 **-39%** |
| not.json | forbidden property | 2 | ✅ | 46.1M | ✅ | 58.7M | 🔴 **+27%** |
| not.json | forbid everything with empty schema | 9 | ✅ | 45.8M | ✅ | 20.7M | 🟢 **-55%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 49.0M | ✅ | 34.9M | 🟢 **-29%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 178.6M | ✅ | 75.1M | 🟢 **-58%** |
| not.json | double negation | 1 | ✅ | 159.7M | ✅ | 62.5M | 🟢 **-61%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.6M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 53.4M | ✅ | 29.0M | 🟢 **-46%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 33.1M | ✅ | 45.3M | 🔴 **+37%** |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 49.9M | ✅ | 21.2M | 🟢 **-58%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 159.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 49.9M | ✅ | 19.4M | 🟢 **-61%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 49.9M | ✅ | 38.1M | 🟢 **-24%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 39.9M | ✅ | 24.0M | 🟢 **-40%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 61.7M | ✅ | 57.6M | -7% |
| oneOf.json | oneOf with required | 4 | ✅ | 41.3M | ✅ | 24.7M | 🟢 **-40%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 45.9M | ✅ | 37.3M | -19% |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 62.3M | ✅ | 32.5M | 🟢 **-48%** |
| pattern.json | pattern validation | 8 | ✅ | 52.4M | ✅ | 61.9M | +18% |
| pattern.json | pattern is not anchored | 1 | ✅ | 48.1M | ✅ | 24.1M | 🟢 **-50%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.9M | ✅ | 12.1M | 🟢 **-55%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.2M | ✅ | 5.9M | 🟢 **-61%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 17.4M | ✅ | 12.4M | 🟢 **-28%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 19.2M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 17.7M | ✅ | 18.0M | +1% |
| properties.json | object properties validation | 6 | ✅ | 49.8M | ✅ | 45.2M | -9% |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.0M | ✅ | 5.1M | 🟢 **-74%** |
| properties.json | properties with boolean schema | 4 | ✅ | 42.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 44.7M | ✅ | 13.6M | 🟢 **-70%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 64.8M | ✅ | 61.1M | -6% |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 26.2M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 44.3M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 18.9M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 171.7M | ✅ | 68.6M | 🟢 **-60%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 42.3M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 39.8M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.2M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without $recursiveAncho... | 4 | ✅ | 13.8M | ❌ | - | - |
| recursiveRef.json | $recursiveRef without using nesting | 5 | ✅ | 6.4M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with nesting | 5 | ✅ | 3.2M | ✅ | 38.6M | 🔴 **+1119%** |
| recursiveRef.json | $recursiveRef with $recursiveAnchor: ... | 5 | ✅ | 14.0M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 5 | ✅ | 13.9M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 9.5M | ❌ | - | - |
| recursiveRef.json | $recursiveRef with no $recursiveAncho... | 3 | ✅ | 8.3M | ❌ | - | - |
| recursiveRef.json | multiple dynamic paths to the $recurs... | 2 | ✅ | 4.4M | ❌ | - | - |
| recursiveRef.json | dynamic $recursiveRef destination (no... | 2 | ✅ | 4.2M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.1M | ✅ | 17.4M | 🟢 **-28%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 46.4M | ✅ | 31.3M | 🟢 **-33%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 51.4M | ✅ | 21.0M | 🟢 **-59%** |
| ref.json | escaped pointer ref | 6 | ✅ | 40.6M | ✅ | 25.0M | 🟢 **-39%** |
| ref.json | nested refs | 2 | ✅ | 46.6M | ✅ | 21.4M | 🟢 **-54%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 40.2M | ✅ | 25.1M | 🟢 **-38%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.3M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 46.7M | ✅ | 32.1M | 🟢 **-31%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 46.8M | ✅ | 31.8M | 🟢 **-32%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 159.5M | ✅ | 56.4M | 🟢 **-65%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 49.9M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.9M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 46.8M | ✅ | 25.9M | 🟢 **-45%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 27.4M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 47.4M | ✅ | 3.1M | 🟢 **-93%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 36.0M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 35.8M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 59.1M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 55.4M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 61.0M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 48.0M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 33.5M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 46.9M | ✅ | 26.8M | 🟢 **-43%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 46.9M | ✅ | 31.9M | 🟢 **-32%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 46.9M | ✅ | 26.7M | 🟢 **-43%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 41.8M | ✅ | 29.9M | 🟢 **-28%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 46.6M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 46.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 58.4M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 59.2M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 59.2M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 59.6M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 59.4M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 25.3M | 🟢 **-59%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 62.3M | ✅ | 30.2M | 🟢 **-52%** |
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
| required.json | required validation | 5 | ✅ | 58.0M | ✅ | 33.8M | 🟢 **-42%** |
| required.json | required default validation | 1 | ✅ | 159.0M | ✅ | 110.3M | 🟢 **-31%** |
| required.json | required with empty array | 1 | ✅ | 158.2M | ✅ | 60.5M | 🟢 **-62%** |
| required.json | required with escaped characters | 2 | ✅ | 44.0M | ✅ | 33.3M | 🟢 **-24%** |
| required.json | required properties whose names are J... | 7 | ✅ | 24.8M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 52.7M | ✅ | 24.2M | 🟢 **-54%** |
| type.json | number type matches numbers | 9 | ✅ | 55.1M | ✅ | 47.6M | -14% |
| type.json | string type matches strings | 9 | ✅ | 54.7M | ✅ | 27.0M | 🟢 **-51%** |
| type.json | object type matches objects | 7 | ✅ | 46.2M | ✅ | 39.9M | -14% |
| type.json | array type matches arrays | 7 | ✅ | 51.4M | ✅ | 22.5M | 🟢 **-56%** |
| type.json | boolean type matches booleans | 10 | ✅ | 62.1M | ✅ | 23.5M | 🟢 **-62%** |
| type.json | null type matches only the null object | 10 | ✅ | 48.9M | ✅ | 39.7M | -19% |
| type.json | multiple types can be specified in an... | 7 | ✅ | 52.0M | ✅ | 25.2M | 🟢 **-52%** |
| type.json | type as array with one item | 2 | ✅ | 62.3M | ✅ | 59.1M | -5% |
| type.json | type: array or object | 5 | ✅ | 55.7M | ✅ | 28.2M | 🟢 **-49%** |
| type.json | type: array, object or null | 5 | ✅ | 62.0M | ✅ | 56.2M | -9% |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 83.8M | ✅ | 79.6M | -5% |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 53.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 56.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 72.0M | ✅ | 51.9M | 🟢 **-28%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 49.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and addit... | 1 | ✅ | 80.9M | ✅ | 56.9M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems with ignored additio... | 2 | ✅ | 46.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with ignored applica... | 2 | ✅ | 45.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 47.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 22.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items an... | 2 | ✅ | 83.9M | ✅ | 57.5M | 🟢 **-31%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.3M | ✅ | 52.7M | 🔴 **+148%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 12.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 15.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 11.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 52.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 47.8M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 47.7M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $recursiveRef | 2 | ✅ | 2.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 39.0M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 26.7M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 91.9M | ✅ | 79.3M | -14% |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 77.1M | ✅ | 60.1M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 35.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 54.9M | ✅ | 63.2M | +15% |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 34.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 37.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 35.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent a... | 2 | ✅ | 65.3M | ✅ | 36.8M | 🟢 **-44%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 14.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 61.0M | ✅ | 26.3M | 🟢 **-57%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 32.9M | ✅ | 86.0M | 🔴 **+161%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 17.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 26.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 19.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 18.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 36.0M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 32.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 32.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $recursiveRef | 2 | ✅ | 3.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 29.5M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 32.9M | ✅ | 56.2M | 🔴 **+71%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 31.8M | ✅ | 56.2M | 🔴 **+77%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 26.3M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.2M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.1M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.3M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 28.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 31.0M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 37.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.3M | ✅ | 15.4M | -20% |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 77.3M | ✅ | 73.1M | -5% |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 49.7M | ✅ | 55.4M | +11% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 27.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.1M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 22.0M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 24.8M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 17.2M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 30.1M | ✅ | 10.8M | 🟢 **-64%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 18.3M | ✅ | 12.0M | 🟢 **-35%** |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 161.4M | ✅ | 72.7M | 🟢 **-55%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 76.2M | ✅ | 46.6M | 🟢 **-39%** |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 69.3M | ✅ | 46.4M | 🟢 **-33%** |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 50.8M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 62.3M | ✅ | 31.7M | 🟢 **-49%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 52.0M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 79.9M | ✅ | 67.6M | -15% |
| optional/bignum.json | number | 2 | ✅ | 84.2M | ✅ | 108.1M | 🔴 **+28%** |
| optional/bignum.json | string | 1 | ✅ | 47.7M | ✅ | 19.4M | 🟢 **-59%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 77.1M | ✅ | 96.0M | 🔴 **+25%** |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 77.1M | ✅ | 64.8M | -16% |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 45.6M | ❌ | - | - |
| optional/cross-draft.json | refs to future drafts are processed a... | 2 | ✅ | 28.0M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 68.9M | ✅ | 60.6M | -12% |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 59.6M | ✅ | 68.9M | +16% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 173.8M | ✅ | 64.4M | 🟢 **-63%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 35.2M | ✅ | 23.2M | 🟢 **-34%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 41.7M | ✅ | 41.0M | -2% |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 48.7M | ✅ | 30.8M | 🟢 **-37%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 48.2M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 40.7M | ✅ | 20.8M | 🟢 **-49%** |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 53.6M | ✅ | 30.2M | 🟢 **-44%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 18.9M | ✅ | 20.2M | +7% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 25.4M | ✅ | 28.5M | +12% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 26.8M | ✅ | 20.7M | 🟢 **-23%** |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 25.7M | ✅ | 27.8M | +8% |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 25.7M | ✅ | 22.8M | -12% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 19.6M | ✅ | 28.8M | 🔴 **+47%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 26.9M | ✅ | 20.7M | 🟢 **-23%** |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 26.0M | ✅ | 34.5M | 🔴 **+33%** |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 27.6M | ✅ | 17.5M | 🟢 **-37%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 16.6M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 14.4M | ✅ | 11.5M | 🟢 **-21%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.9M | ✅ | 13.3M | -16% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 20.6M | ✅ | 19.0M | -7% |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 20.9M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 22.9M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 20.4M | ✅ | 10.5M | 🟢 **-49%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.9M | ✅ | 13.8M | 🟢 **-34%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 8.0M | ✅ | 6.2M | 🟢 **-22%** |
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
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 38.3M | ✅ | 9.2M | 🟢 **-76%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.5M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 31.5M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 14.5M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.1M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 73.2M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 32.8M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.4M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 82.4M | ✅ | 71.2M | -14% |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 9.5M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 17.1M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.4M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 14.9M | ❌ | - | - |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 40.1M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 60.0M | ✅ | 37.8M | 🟢 **-37%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 27.5M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 17.6M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 46.3M | ✅ | 25.9M | 🟢 **-44%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 46.3M | ✅ | 29.3M | 🟢 **-37%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.0M | ✅ | 26.1M | 🟢 **-43%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 62.3M | ✅ | 32.6M | 🟢 **-48%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 46.3M | ✅ | 26.0M | 🟢 **-44%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 27.6M | ❌ | - | - |

### draft2020-12

| File | Group | Tests | tjs | tjs ops/s | is-my-json-valid | is-my-json-valid ops/s | Diff |
|------|-------|------:|:---:|----------:|:---:|----------:|-----:|
| additionalProperties.json | additionalProperties being false does... | 6 | ✅ | 57.0M | ✅ | 18.6M | 🟢 **-67%** |
| additionalProperties.json | non-ASCII pattern with additionalProp... | 2 | ✅ | 34.9M | ✅ | 11.1M | 🟢 **-68%** |
| additionalProperties.json | additionalProperties with schema | 3 | ✅ | 44.4M | ✅ | 24.8M | 🟢 **-44%** |
| additionalProperties.json | additionalProperties can exist by itself | 2 | ✅ | 34.0M | ✅ | 18.1M | 🟢 **-47%** |
| additionalProperties.json | additionalProperties are allowed by d... | 1 | ✅ | 176.0M | ✅ | 113.3M | 🟢 **-36%** |
| additionalProperties.json | additionalProperties does not look in... | 1 | ✅ | 26.0M | ✅ | 8.8M | 🟢 **-66%** |
| additionalProperties.json | additionalProperties with null valued... | 1 | ✅ | 60.1M | ✅ | 52.1M | -13% |
| additionalProperties.json | additionalProperties with propertyNames | 2 | ✅ | 31.4M | ✅ | 11.6M | 🟢 **-63%** |
| additionalProperties.json | dependentSchemas with additionalPrope... | 3 | ✅ | 35.6M | ✅ | 18.2M | 🟢 **-49%** |
| allOf.json | allOf | 4 | ✅ | 38.2M | ✅ | 18.4M | 🟢 **-52%** |
| allOf.json | allOf with base schema | 5 | ✅ | 30.0M | ✅ | 16.8M | 🟢 **-44%** |
| allOf.json | allOf simple types | 2 | ✅ | 66.7M | ✅ | 28.9M | 🟢 **-57%** |
| allOf.json | allOf with boolean schemas, all true | 1 | ✅ | 174.5M | ✅ | 115.1M | 🟢 **-34%** |
| allOf.json | allOf with boolean schemas, some false | 1 | ✅ | 55.0M | ❌ | - | - |
| allOf.json | allOf with boolean schemas, all false | 1 | ✅ | 82.8M | ❌ | - | - |
| allOf.json | allOf with one empty schema | 1 | ✅ | 176.9M | ✅ | 66.5M | 🟢 **-62%** |
| allOf.json | allOf with two empty schemas | 1 | ✅ | 174.8M | ✅ | 118.5M | 🟢 **-32%** |
| allOf.json | allOf with the first empty schema | 2 | ✅ | 69.2M | ✅ | 28.9M | 🟢 **-58%** |
| allOf.json | allOf with the last empty schema | 2 | ✅ | 125.5M | ✅ | 41.6M | 🟢 **-67%** |
| allOf.json | nested allOf, to check validation sem... | 2 | ✅ | 71.9M | ✅ | 29.7M | 🟢 **-59%** |
| allOf.json | allOf combined with anyOf, oneOf | 8 | ✅ | 87.5M | ✅ | 23.9M | 🟢 **-73%** |
| anchor.json | Location-independent identifier | 2 | ✅ | 70.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 124.1M | ❌ | - | - |
| anchor.json | Location-independent identifier with ... | 2 | ✅ | 48.4M | ❌ | - | - |
| anchor.json | same $anchor with different base uri | 2 | ✅ | 25.9M | ❌ | - | - |
| anyOf.json | anyOf | 4 | ✅ | 74.0M | ✅ | 37.6M | 🟢 **-49%** |
| anyOf.json | anyOf with base schema | 3 | ✅ | 38.0M | ✅ | 36.1M | -5% |
| anyOf.json | anyOf with boolean schemas, all true | 1 | ✅ | 174.8M | ✅ | 74.4M | 🟢 **-57%** |
| anyOf.json | anyOf with boolean schemas, some true | 1 | ✅ | 174.7M | ✅ | 121.0M | 🟢 **-31%** |
| anyOf.json | anyOf with boolean schemas, all false | 1 | ✅ | 54.5M | ❌ | - | - |
| anyOf.json | anyOf complex types | 4 | ✅ | 52.9M | ✅ | 33.4M | 🟢 **-37%** |
| anyOf.json | anyOf with one empty schema | 2 | ✅ | 191.2M | ✅ | 121.7M | 🟢 **-36%** |
| anyOf.json | nested anyOf, to check validation sem... | 2 | ✅ | 70.3M | ✅ | 29.8M | 🟢 **-58%** |
| boolean_schema.json | boolean schema 'true' | 9 | ✅ | 198.7M | ✅ | 126.4M | 🟢 **-36%** |
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
| contains.json | contains with null instance elements | 1 | ✅ | 89.0M | ✅ | 74.5M | -16% |
| content.json | validation of string-encoded content ... | 3 | ✅ | 197.7M | ✅ | 116.0M | 🟢 **-41%** |
| content.json | validation of binary string-encoding | 3 | ✅ | 194.6M | ✅ | 59.6M | 🟢 **-69%** |
| content.json | validation of binary-encoded media ty... | 4 | ✅ | 200.3M | ✅ | 81.2M | 🟢 **-59%** |
| content.json | validation of binary-encoded media ty... | 8 | ✅ | 196.9M | ✅ | 65.4M | 🟢 **-67%** |
| default.json | invalid type for default | 2 | ✅ | 69.8M | ✅ | 66.4M | -5% |
| default.json | invalid string value for default | 2 | ✅ | 54.1M | ✅ | 56.8M | +5% |
| default.json | the default keyword does not do anyth... | 3 | ✅ | 52.7M | ✅ | 46.5M | -12% |
| defs.json | validate definition against metaschema | 2 | ✅ | 2.1M | ❌ | - | - |
| dependentRequired.json | single dependency | 7 | ✅ | 62.2M | ❌ | - | - |
| dependentRequired.json | empty dependents | 3 | ✅ | 196.1M | ✅ | 70.6M | 🟢 **-64%** |
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
| dynamicRef.json | An $anchor with the same name as a $d... | 1 | ✅ | 8.3M | ✅ | 60.1M | 🔴 **+624%** |
| dynamicRef.json | A $dynamicRef without a matching $dyn... | 1 | ✅ | 14.7M | ✅ | 118.5M | 🔴 **+705%** |
| dynamicRef.json | A $dynamicRef with a non-matching $dy... | 1 | ✅ | 11.2M | ✅ | 74.3M | 🔴 **+564%** |
| dynamicRef.json | A $dynamicRef that initially resolves... | 2 | ✅ | 7.2M | ❌ | - | - |
| dynamicRef.json | A $dynamicRef that initially resolves... | 1 | ✅ | 14.7M | ✅ | 54.9M | 🔴 **+275%** |
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
| enum.json | simple enum validation | 2 | ✅ | 69.7M | ✅ | 29.1M | 🟢 **-58%** |
| enum.json | heterogeneous enum validation | 5 | ✅ | 44.1M | ✅ | 1.0M | 🟢 **-98%** |
| enum.json | heterogeneous enum-with-null validation | 3 | ✅ | 71.6M | ✅ | 4.4M | 🟢 **-94%** |
| enum.json | enums in properties | 6 | ✅ | 39.0M | ✅ | 27.9M | 🟢 **-28%** |
| enum.json | enum with escaped characters | 3 | ✅ | 76.7M | ✅ | 35.5M | 🟢 **-54%** |
| enum.json | enum with false does not match 0 | 3 | ✅ | 63.7M | ✅ | 33.9M | 🟢 **-47%** |
| enum.json | enum with [false] does not match [0] | 3 | ✅ | 59.1M | ✅ | 4.5M | 🟢 **-92%** |
| enum.json | enum with true does not match 1 | 3 | ✅ | 65.1M | ✅ | 34.8M | 🟢 **-47%** |
| enum.json | enum with [true] does not match [1] | 3 | ✅ | 59.5M | ✅ | 4.6M | 🟢 **-92%** |
| enum.json | enum with 0 does not match false | 3 | ✅ | 72.2M | ✅ | 52.2M | 🟢 **-28%** |
| enum.json | enum with [0] does not match [false] | 3 | ✅ | 66.3M | ✅ | 5.0M | 🟢 **-92%** |
| enum.json | enum with 1 does not match true | 3 | ✅ | 72.0M | ✅ | 51.1M | 🟢 **-29%** |
| enum.json | enum with [1] does not match [true] | 3 | ✅ | 65.9M | ✅ | 5.0M | 🟢 **-92%** |
| enum.json | nul characters in strings | 2 | ✅ | 60.6M | ✅ | 37.8M | 🟢 **-38%** |
| exclusiveMaximum.json | exclusiveMaximum validation | 4 | ✅ | 60.9M | ❌ | - | - |
| exclusiveMinimum.json | exclusiveMinimum validation | 4 | ✅ | 64.0M | ❌ | - | - |
| format.json | email format | 7 | ✅ | 202.9M | ❌ | - | - |
| format.json | idn-email format | 7 | ✅ | 203.1M | ✅ | 37.6M | 🟢 **-82%** |
| format.json | regex format | 7 | ✅ | 202.3M | ✅ | 70.7M | 🟢 **-65%** |
| format.json | ipv4 format | 7 | ✅ | 202.6M | ❌ | - | - |
| format.json | ipv6 format | 7 | ✅ | 202.0M | ❌ | - | - |
| format.json | idn-hostname format | 7 | ✅ | 197.9M | ✅ | 34.1M | 🟢 **-83%** |
| format.json | hostname format | 7 | ✅ | 203.2M | ❌ | - | - |
| format.json | date format | 7 | ✅ | 201.2M | ❌ | - | - |
| format.json | date-time format | 7 | ✅ | 199.1M | ✅ | 61.8M | 🟢 **-69%** |
| format.json | time format | 7 | ✅ | 201.6M | ❌ | - | - |
| format.json | json-pointer format | 7 | ✅ | 203.2M | ✅ | 72.9M | 🟢 **-64%** |
| format.json | relative-json-pointer format | 7 | ✅ | 196.2M | ✅ | 71.4M | 🟢 **-64%** |
| format.json | iri format | 7 | ✅ | 201.8M | ✅ | 112.0M | 🟢 **-44%** |
| format.json | iri-reference format | 7 | ✅ | 202.9M | ✅ | 62.6M | 🟢 **-69%** |
| format.json | uri format | 7 | ✅ | 203.0M | ❌ | - | - |
| format.json | uri-reference format | 7 | ✅ | 202.2M | ✅ | 74.5M | 🟢 **-63%** |
| format.json | uri-template format | 7 | ✅ | 203.0M | ✅ | 62.6M | 🟢 **-69%** |
| format.json | uuid format | 7 | ✅ | 193.1M | ✅ | 74.9M | 🟢 **-61%** |
| format.json | duration format | 7 | ✅ | 201.7M | ✅ | 70.2M | 🟢 **-65%** |
| if-then-else.json | ignore if without then or else | 2 | ✅ | 191.1M | ✅ | 124.5M | 🟢 **-35%** |
| if-then-else.json | ignore then without if | 2 | ✅ | 190.9M | ✅ | 57.2M | 🟢 **-70%** |
| if-then-else.json | ignore else without if | 2 | ✅ | 190.9M | ✅ | 81.3M | 🟢 **-57%** |
| if-then-else.json | if and then without else | 3 | ✅ | 74.6M | ❌ | - | - |
| if-then-else.json | if and else without then | 3 | ✅ | 75.5M | ❌ | - | - |
| if-then-else.json | validate against correct branch, then... | 4 | ✅ | 67.2M | ❌ | - | - |
| if-then-else.json | non-interference across combined schemas | 2 | ✅ | 186.7M | ✅ | 80.5M | 🟢 **-57%** |
| if-then-else.json | if with boolean schema true | 2 | ✅ | 69.9M | ❌ | - | - |
| if-then-else.json | if with boolean schema false | 2 | ✅ | 69.4M | ❌ | - | - |
| if-then-else.json | if appears at the end when serialized... | 4 | ✅ | 49.1M | ❌ | - | - |
| infinite-loop-detection.json | evaluating the same schema location a... | 2 | ✅ | 42.8M | ✅ | 15.2M | 🟢 **-65%** |
| items.json | a schema given for items | 4 | ✅ | 64.6M | ✅ | 32.1M | 🟢 **-50%** |
| items.json | items with boolean schema (true) | 2 | ✅ | 187.5M | ✅ | 88.1M | 🟢 **-53%** |
| items.json | items with boolean schema (false) | 2 | ✅ | 66.5M | ❌ | - | - |
| items.json | items and subitems | 6 | ✅ | 29.5M | ❌ | - | - |
| items.json | nested items | 3 | ✅ | 13.5M | ✅ | 2.4M | 🟢 **-82%** |
| items.json | prefixItems with no additional items ... | 5 | ✅ | 84.4M | ❌ | - | - |
| items.json | items does not look in applicators, v... | 2 | ✅ | 50.9M | ✅ | 23.7M | 🟢 **-53%** |
| items.json | prefixItems validation adjusts the st... | 2 | ✅ | 50.3M | ❌ | - | - |
| items.json | items with heterogeneous array | 2 | ✅ | 68.9M | ❌ | - | - |
| items.json | items with null instance elements | 1 | ✅ | 83.0M | ✅ | 66.3M | 🟢 **-20%** |
| maxContains.json | maxContains without contains is ignored | 2 | ✅ | 188.9M | ✅ | 111.9M | 🟢 **-41%** |
| maxContains.json | maxContains with contains | 5 | ✅ | 57.2M | ❌ | - | - |
| maxContains.json | maxContains with contains, value with... | 2 | ✅ | 62.7M | ❌ | - | - |
| maxContains.json | minContains < maxContains | 3 | ✅ | 56.0M | ❌ | - | - |
| maxItems.json | maxItems validation | 4 | ✅ | 81.7M | ✅ | 41.7M | 🟢 **-49%** |
| maxItems.json | maxItems validation with a decimal | 2 | ✅ | 68.8M | ✅ | 38.9M | 🟢 **-44%** |
| maxLength.json | maxLength validation | 5 | ✅ | 64.5M | ❌ | - | - |
| maxLength.json | maxLength validation with a decimal | 2 | ✅ | 56.7M | ✅ | 29.4M | 🟢 **-48%** |
| maxProperties.json | maxProperties validation | 6 | ✅ | 56.2M | ✅ | 45.8M | -19% |
| maxProperties.json | maxProperties validation with a decimal | 2 | ✅ | 42.9M | ✅ | 22.4M | 🟢 **-48%** |
| maxProperties.json | maxProperties = 0 means the object is... | 2 | ✅ | 45.2M | ✅ | 28.5M | 🟢 **-37%** |
| maximum.json | maximum validation | 4 | ✅ | 74.1M | ✅ | 42.6M | 🟢 **-43%** |
| maximum.json | maximum validation with unsigned integer | 4 | ✅ | 72.7M | ✅ | 59.7M | -18% |
| minContains.json | minContains without contains is ignored | 2 | ✅ | 191.0M | ✅ | 79.6M | 🟢 **-58%** |
| minContains.json | minContains=1 with contains | 5 | ✅ | 66.1M | ❌ | - | - |
| minContains.json | minContains=2 with contains | 6 | ✅ | 60.2M | ❌ | - | - |
| minContains.json | minContains=2 with contains with a de... | 2 | ✅ | 62.8M | ❌ | - | - |
| minContains.json | maxContains = minContains | 4 | ✅ | 52.3M | ❌ | - | - |
| minContains.json | maxContains < minContains | 4 | ✅ | 47.2M | ❌ | - | - |
| minContains.json | minContains = 0 | 2 | ✅ | 186.8M | ✅ | 64.4M | 🟢 **-66%** |
| minContains.json | minContains = 0 with maxContains | 3 | ✅ | 71.5M | ❌ | - | - |
| minItems.json | minItems validation | 4 | ✅ | 81.9M | ✅ | 62.9M | 🟢 **-23%** |
| minItems.json | minItems validation with a decimal | 2 | ✅ | 69.5M | ✅ | 27.2M | 🟢 **-61%** |
| minLength.json | minLength validation | 5 | ✅ | 59.0M | ❌ | - | - |
| minLength.json | minLength validation with a decimal | 2 | ✅ | 56.6M | ✅ | 27.8M | 🟢 **-51%** |
| minProperties.json | minProperties validation | 6 | ✅ | 58.2M | ✅ | 50.3M | -14% |
| minProperties.json | minProperties validation with a decimal | 2 | ✅ | 43.7M | ✅ | 23.2M | 🟢 **-47%** |
| minimum.json | minimum validation | 4 | ✅ | 75.4M | ✅ | 59.9M | 🟢 **-21%** |
| minimum.json | minimum validation with signed integer | 7 | ✅ | 65.7M | ✅ | 38.6M | 🟢 **-41%** |
| multipleOf.json | by int | 3 | ✅ | 74.5M | ✅ | 50.6M | 🟢 **-32%** |
| multipleOf.json | by number | 3 | ✅ | 68.9M | ✅ | 3.6M | 🟢 **-95%** |
| multipleOf.json | by small number | 2 | ✅ | 61.2M | ✅ | 2.1M | 🟢 **-97%** |
| multipleOf.json | float division = inf | 1 | ✅ | 46.6M | ❌ | - | - |
| multipleOf.json | small multiple of large integer | 1 | ✅ | 70.4M | ❌ | - | - |
| not.json | not | 2 | ✅ | 69.3M | ✅ | 28.6M | 🟢 **-59%** |
| not.json | not multiple types | 3 | ✅ | 61.5M | ✅ | 32.8M | 🟢 **-47%** |
| not.json | not more complex schema | 3 | ✅ | 62.9M | ✅ | 35.6M | 🟢 **-43%** |
| not.json | forbidden property | 2 | ✅ | 50.3M | ✅ | 41.7M | -17% |
| not.json | forbid everything with empty schema | 9 | ✅ | 48.4M | ✅ | 17.6M | 🟢 **-64%** |
| not.json | forbid everything with boolean schema... | 9 | ✅ | 45.1M | ✅ | 25.1M | 🟢 **-44%** |
| not.json | allow everything with boolean schema ... | 9 | ✅ | 197.4M | ✅ | 72.2M | 🟢 **-63%** |
| not.json | double negation | 1 | ✅ | 174.9M | ✅ | 65.0M | 🟢 **-63%** |
| not.json | collect annotations inside a 'not', e... | 2 | ✅ | 31.1M | ❌ | - | - |
| oneOf.json | oneOf | 4 | ✅ | 58.3M | ✅ | 27.4M | 🟢 **-53%** |
| oneOf.json | oneOf with base schema | 3 | ✅ | 35.6M | ✅ | 35.0M | -1% |
| oneOf.json | oneOf with boolean schemas, all true | 1 | ✅ | 56.0M | ✅ | 17.1M | 🟢 **-70%** |
| oneOf.json | oneOf with boolean schemas, one true | 1 | ✅ | 175.6M | ❌ | - | - |
| oneOf.json | oneOf with boolean schemas, more than... | 1 | ✅ | 55.5M | ✅ | 17.7M | 🟢 **-68%** |
| oneOf.json | oneOf with boolean schemas, all false | 1 | ✅ | 55.3M | ✅ | 23.8M | 🟢 **-57%** |
| oneOf.json | oneOf complex types | 4 | ✅ | 43.6M | ✅ | 22.0M | 🟢 **-50%** |
| oneOf.json | oneOf with empty schema | 2 | ✅ | 67.5M | ✅ | 41.1M | 🟢 **-39%** |
| oneOf.json | oneOf with required | 4 | ✅ | 42.3M | ✅ | 23.2M | 🟢 **-45%** |
| oneOf.json | oneOf with missing optional property | 4 | ✅ | 47.9M | ✅ | 32.1M | 🟢 **-33%** |
| oneOf.json | nested oneOf, to check validation sem... | 2 | ✅ | 70.0M | ✅ | 29.3M | 🟢 **-58%** |
| pattern.json | pattern validation | 8 | ✅ | 52.8M | ✅ | 37.1M | 🟢 **-30%** |
| pattern.json | pattern is not anchored | 1 | ✅ | 52.0M | ✅ | 24.6M | 🟢 **-53%** |
| patternProperties.json | patternProperties validates propertie... | 7 | ✅ | 26.8M | ✅ | 11.4M | 🟢 **-57%** |
| patternProperties.json | multiple simultaneous patternProperti... | 6 | ✅ | 15.6M | ✅ | 4.9M | 🟢 **-69%** |
| patternProperties.json | regexes are not anchored by default a... | 4 | ✅ | 18.3M | ✅ | 11.9M | 🟢 **-35%** |
| patternProperties.json | patternProperties with boolean schemas | 5 | ✅ | 21.9M | ❌ | - | - |
| patternProperties.json | patternProperties with null valued in... | 1 | ✅ | 19.7M | ✅ | 20.5M | +4% |
| prefixItems.json | a schema given for prefixItems | 6 | ✅ | 67.3M | ❌ | - | - |
| prefixItems.json | prefixItems with boolean schemas | 3 | ✅ | 64.6M | ❌ | - | - |
| prefixItems.json | additional items are allowed by default | 1 | ✅ | 90.2M | ✅ | 67.0M | 🟢 **-26%** |
| prefixItems.json | prefixItems with null instance elements | 1 | ✅ | 90.7M | ✅ | 118.5M | 🔴 **+31%** |
| properties.json | object properties validation | 6 | ✅ | 51.0M | ✅ | 30.0M | 🟢 **-41%** |
| properties.json | properties, patternProperties, additi... | 8 | ✅ | 20.3M | ✅ | 5.0M | 🟢 **-75%** |
| properties.json | properties with boolean schema | 4 | ✅ | 46.3M | ❌ | - | - |
| properties.json | properties with escaped characters | 2 | ✅ | 47.3M | ✅ | 13.1M | 🟢 **-72%** |
| properties.json | properties with null valued instance ... | 1 | ✅ | 73.2M | ✅ | 112.7M | 🔴 **+54%** |
| properties.json | properties whose names are Javascript... | 7 | ✅ | 28.0M | ❌ | - | - |
| propertyNames.json | propertyNames validation | 6 | ✅ | 46.5M | ❌ | - | - |
| propertyNames.json | propertyNames validation with pattern | 3 | ✅ | 21.1M | ❌ | - | - |
| propertyNames.json | propertyNames with boolean schema true | 2 | ✅ | 188.9M | ✅ | 74.4M | 🟢 **-61%** |
| propertyNames.json | propertyNames with boolean schema false | 2 | ✅ | 44.4M | ❌ | - | - |
| propertyNames.json | propertyNames with const | 3 | ✅ | 44.6M | ❌ | - | - |
| propertyNames.json | propertyNames with enum | 4 | ✅ | 42.9M | ❌ | - | - |
| ref.json | root pointer ref | 4 | ✅ | 24.8M | ✅ | 18.6M | 🟢 **-25%** |
| ref.json | relative pointer ref to object | 2 | ✅ | 49.5M | ✅ | 25.1M | 🟢 **-49%** |
| ref.json | relative pointer ref to array | 2 | ✅ | 56.1M | ❌ | - | - |
| ref.json | escaped pointer ref | 6 | ✅ | 42.4M | ✅ | 24.2M | 🟢 **-43%** |
| ref.json | nested refs | 2 | ✅ | 40.8M | ✅ | 22.9M | 🟢 **-44%** |
| ref.json | ref applies alongside sibling keywords | 3 | ✅ | 38.6M | ✅ | 21.2M | 🟢 **-45%** |
| ref.json | remote ref, containing refs itself | 2 | ✅ | 3.5M | ❌ | - | - |
| ref.json | property named $ref that is not a ref... | 2 | ✅ | 48.2M | ✅ | 29.4M | 🟢 **-39%** |
| ref.json | property named $ref, containing an ac... | 2 | ✅ | 48.3M | ✅ | 28.7M | 🟢 **-41%** |
| ref.json | $ref to boolean schema true | 1 | ✅ | 174.5M | ✅ | 61.0M | 🟢 **-65%** |
| ref.json | $ref to boolean schema false | 1 | ✅ | 54.8M | ❌ | - | - |
| ref.json | Recursive references between schemas | 2 | ✅ | 8.7M | ❌ | - | - |
| ref.json | refs with quote | 2 | ✅ | 48.9M | ✅ | 25.7M | 🟢 **-48%** |
| ref.json | ref creates new scope when adjacent t... | 1 | ✅ | 28.8M | ❌ | - | - |
| ref.json | naive replacement of $ref with its de... | 3 | ✅ | 51.6M | ✅ | 3.2M | 🟢 **-94%** |
| ref.json | refs with relative uris and defs | 3 | ✅ | 35.7M | ❌ | - | - |
| ref.json | relative refs with absolute uris and ... | 3 | ✅ | 36.7M | ❌ | - | - |
| ref.json | $id must be resolved against nearest ... | 2 | ✅ | 48.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref | 2 | ✅ | 49.2M | ❌ | - | - |
| ref.json | order of evaluation: $id and $anchor ... | 2 | ✅ | 67.6M | ❌ | - | - |
| ref.json | order of evaluation: $id and $ref on ... | 2 | ✅ | 39.4M | ❌ | - | - |
| ref.json | simple URN base URI with $ref via the... | 2 | ✅ | 35.2M | ❌ | - | - |
| ref.json | simple URN base URI with JSON pointer | 2 | ✅ | 48.5M | ✅ | 26.8M | 🟢 **-45%** |
| ref.json | URN base URI with NSS | 2 | ✅ | 48.4M | ✅ | 28.2M | 🟢 **-42%** |
| ref.json | URN base URI with r-component | 2 | ✅ | 47.3M | ✅ | 25.2M | 🟢 **-47%** |
| ref.json | URN base URI with q-component | 2 | ✅ | 47.6M | ✅ | 28.1M | 🟢 **-41%** |
| ref.json | URN base URI with URN and JSON pointe... | 2 | ✅ | 47.9M | ❌ | - | - |
| ref.json | URN base URI with URN and anchor ref | 2 | ✅ | 47.7M | ❌ | - | - |
| ref.json | URN ref with nested pointer ref | 2 | ✅ | 55.6M | ❌ | - | - |
| ref.json | ref to if | 2 | ✅ | 54.7M | ❌ | - | - |
| ref.json | ref to then | 2 | ✅ | 52.4M | ❌ | - | - |
| ref.json | ref to else | 2 | ✅ | 52.3M | ❌ | - | - |
| ref.json | ref with absolute-path-reference | 2 | ✅ | 51.3M | ❌ | - | - |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 69.7M | ✅ | 25.7M | 🟢 **-63%** |
| ref.json | $id with file URI still resolves poin... | 2 | ✅ | 70.0M | ✅ | 27.6M | 🟢 **-61%** |
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
| required.json | required validation | 5 | ✅ | 68.2M | ✅ | 32.7M | 🟢 **-52%** |
| required.json | required default validation | 1 | ✅ | 174.6M | ✅ | 105.2M | 🟢 **-40%** |
| required.json | required with empty array | 1 | ✅ | 174.6M | ✅ | 61.7M | 🟢 **-65%** |
| required.json | required with escaped characters | 2 | ✅ | 38.0M | ✅ | 26.8M | 🟢 **-30%** |
| required.json | required properties whose names are J... | 7 | ✅ | 23.6M | ❌ | - | - |
| type.json | integer type matches integers | 9 | ✅ | 55.0M | ✅ | 20.7M | 🟢 **-62%** |
| type.json | number type matches numbers | 9 | ✅ | 57.6M | ✅ | 35.5M | 🟢 **-38%** |
| type.json | string type matches strings | 9 | ✅ | 57.8M | ✅ | 25.5M | 🟢 **-56%** |
| type.json | object type matches objects | 7 | ✅ | 47.8M | ✅ | 28.3M | 🟢 **-41%** |
| type.json | array type matches arrays | 7 | ✅ | 54.0M | ✅ | 21.1M | 🟢 **-61%** |
| type.json | boolean type matches booleans | 10 | ✅ | 55.5M | ✅ | 30.4M | 🟢 **-45%** |
| type.json | null type matches only the null object | 10 | ✅ | 50.0M | ✅ | 20.3M | 🟢 **-59%** |
| type.json | multiple types can be specified in an... | 7 | ✅ | 54.7M | ✅ | 32.4M | 🟢 **-41%** |
| type.json | type as array with one item | 2 | ✅ | 68.9M | ✅ | 29.8M | 🟢 **-57%** |
| type.json | type: array or object | 5 | ✅ | 62.5M | ✅ | 35.3M | 🟢 **-44%** |
| type.json | type: array, object or null | 5 | ✅ | 68.5M | ✅ | 32.2M | 🟢 **-53%** |
| unevaluatedItems.json | unevaluatedItems true | 2 | ✅ | 88.6M | ✅ | 124.8M | 🔴 **+41%** |
| unevaluatedItems.json | unevaluatedItems false | 2 | ✅ | 57.4M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems as schema | 3 | ✅ | 59.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with uniform items | 1 | ✅ | 78.9M | ✅ | 59.8M | 🟢 **-24%** |
| unevaluatedItems.json | unevaluatedItems with tuple | 2 | ✅ | 54.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with items and prefi... | 1 | ✅ | 88.6M | ✅ | 62.4M | 🟢 **-30%** |
| unevaluatedItems.json | unevaluatedItems with items | 2 | ✅ | 48.9M | ✅ | 19.7M | 🟢 **-60%** |
| unevaluatedItems.json | unevaluatedItems with nested tuple | 2 | ✅ | 52.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested items | 3 | ✅ | 23.2M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with nested prefixIt... | 2 | ✅ | 90.9M | ✅ | 70.6M | 🟢 **-22%** |
| unevaluatedItems.json | unevaluatedItems with nested unevalua... | 2 | ✅ | 21.9M | ✅ | 70.6M | 🔴 **+222%** |
| unevaluatedItems.json | unevaluatedItems with anyOf | 4 | ✅ | 13.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with oneOf | 2 | ✅ | 16.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with not | 1 | ✅ | 38.1M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with if/then/else | 4 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with boolean schemas | 2 | ✅ | 57.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $ref | 2 | ✅ | 51.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems before $ref | 2 | ✅ | 52.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with $dynamicRef | 2 | ✅ | 10.0M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems can't see inside cou... | 1 | ✅ | 42.9M | ❌ | - | - |
| unevaluatedItems.json | item is evaluated in an uncle schema ... | 2 | ✅ | 27.3M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on adjacent ... | 3 | ✅ | 20.6M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems depends on multiple ... | 2 | ✅ | 8.9M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems and contains interac... | 8 | ✅ | 10.5M | ❌ | - | - |
| unevaluatedItems.json | unevaluatedItems with minContains = 0 | 4 | ✅ | 19.6M | ❌ | - | - |
| unevaluatedItems.json | non-array instances are valid | 6 | ✅ | 102.2M | ✅ | 65.4M | 🟢 **-36%** |
| unevaluatedItems.json | unevaluatedItems with null instance e... | 1 | ✅ | 83.3M | ✅ | 59.2M | 🟢 **-29%** |
| unevaluatedItems.json | unevaluatedItems can see annotations ... | 2 | ✅ | 22.4M | ❌ | - | - |
| unevaluatedItems.json | Evaluated items collection needs to c... | 1 | ✅ | 39.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties true | 2 | ✅ | 57.6M | ✅ | 70.2M | 🔴 **+22%** |
| unevaluatedProperties.json | unevaluatedProperties schema | 3 | ✅ | 35.3M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties false | 2 | ✅ | 40.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 35.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent p... | 2 | ✅ | 15.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with adjacent b... | 2 | ✅ | 189.4M | ✅ | 27.4M | 🟢 **-86%** |
| unevaluatedProperties.json | unevaluatedProperties with adjacent n... | 2 | ✅ | 35.3M | ✅ | 15.6M | 🟢 **-56%** |
| unevaluatedProperties.json | unevaluatedProperties with nested pro... | 2 | ✅ | 31.2M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested pat... | 2 | ✅ | 13.6M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with nested add... | 2 | ✅ | 67.6M | ✅ | 27.9M | 🟢 **-59%** |
| unevaluatedProperties.json | unevaluatedProperties with nested une... | 2 | ✅ | 30.3M | ✅ | 105.7M | 🔴 **+249%** |
| unevaluatedProperties.json | unevaluatedProperties with anyOf | 4 | ✅ | 16.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with oneOf | 2 | ✅ | 19.1M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with not | 1 | ✅ | 25.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/else | 4 | ✅ | 18.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 21.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with if/then/el... | 4 | ✅ | 17.9M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with dependentS... | 2 | ✅ | 28.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with boolean sc... | 2 | ✅ | 34.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $ref | 2 | ✅ | 31.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties before $ref | 2 | ✅ | 32.7M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties with $dynamicRef | 2 | ✅ | 9.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.4M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can't see insid... | 1 | ✅ | 30.7M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.1M | ✅ | 67.3M | 🔴 **+123%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer f... | 2 | ✅ | 30.3M | ✅ | 67.0M | 🔴 **+121%** |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 27.1M | ❌ | - | - |
| unevaluatedProperties.json | nested unevaluatedProperties, outer t... | 2 | ✅ | 28.4M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 21.2M | ❌ | - | - |
| unevaluatedProperties.json | cousin unevaluatedProperties, true an... | 2 | ✅ | 12.0M | ❌ | - | - |
| unevaluatedProperties.json | property is evaluated in an uncle sch... | 2 | ✅ | 29.1M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, allOf h... | 3 | ✅ | 33.8M | ❌ | - | - |
| unevaluatedProperties.json | in-place applicator siblings, anyOf h... | 3 | ✅ | 44.5M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + single cyclic... | 7 | ✅ | 18.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties + ref inside al... | 8 | ✅ | 19.7M | ✅ | 15.1M | 🟢 **-23%** |
| unevaluatedProperties.json | dynamic evalation inside nested refs | 21 | ✅ | 7.3M | ❌ | - | - |
| unevaluatedProperties.json | non-object instances are valid | 6 | ✅ | 88.0M | ✅ | 61.0M | 🟢 **-31%** |
| unevaluatedProperties.json | unevaluatedProperties with null value... | 1 | ✅ | 51.5M | ✅ | 58.1M | +13% |
| unevaluatedProperties.json | unevaluatedProperties not affected by... | 2 | ✅ | 31.8M | ❌ | - | - |
| unevaluatedProperties.json | unevaluatedProperties can see annotat... | 2 | ✅ | 14.4M | ❌ | - | - |
| unevaluatedProperties.json | dependentSchemas with unevaluatedProp... | 3 | ✅ | 23.0M | ❌ | - | - |
| unevaluatedProperties.json | Evaluated properties collection needs... | 1 | ✅ | 26.7M | ❌ | - | - |
| uniqueItems.json | uniqueItems validation | 28 | ✅ | 16.5M | ❌ | - | - |
| uniqueItems.json | uniqueItems with an array of items | 8 | ✅ | 33.5M | ✅ | 11.3M | 🟢 **-66%** |
| uniqueItems.json | uniqueItems with an array of items an... | 5 | ✅ | 43.4M | ❌ | - | - |
| uniqueItems.json | uniqueItems=false validation | 15 | ✅ | 165.4M | ✅ | 62.7M | 🟢 **-62%** |
| uniqueItems.json | uniqueItems=false with an array of items | 8 | ✅ | 72.1M | ✅ | 73.3M | +2% |
| uniqueItems.json | uniqueItems=false with an array of it... | 5 | ✅ | 62.3M | ❌ | - | - |
| vocabulary.json | schema that uses custom metaschema wi... | 3 | ✅ | 56.3M | ❌ | - | - |
| vocabulary.json | ignore unrecognized optional vocabulary | 2 | ✅ | 68.3M | ✅ | 29.6M | 🟢 **-57%** |
| optional/anchor.json | $anchor inside an enum is not a real ... | 4 | ✅ | 55.2M | ❌ | - | - |
| optional/bignum.json | integer | 2 | ✅ | 91.1M | ✅ | 72.7M | 🟢 **-20%** |
| optional/bignum.json | number | 2 | ✅ | 94.8M | ✅ | 109.9M | +16% |
| optional/bignum.json | string | 1 | ✅ | 52.8M | ✅ | 16.9M | 🟢 **-68%** |
| optional/bignum.json | maximum integer comparison | 1 | ✅ | 84.7M | ✅ | 89.9M | +6% |
| optional/bignum.json | float comparison with high precision | 1 | ✅ | 50.2M | ❌ | - | - |
| optional/bignum.json | minimum integer comparison | 1 | ✅ | 85.0M | ✅ | 66.4M | 🟢 **-22%** |
| optional/bignum.json | float comparison with high precision ... | 1 | ✅ | 49.9M | ❌ | - | - |
| optional/cross-draft.json | refs to historic drafts are processed... | 1 | ✅ | 95.9M | ✅ | 73.9M | 🟢 **-23%** |
| optional/dependencies-compatibility.json | single dependency | 7 | ✅ | 61.3M | ✅ | 62.9M | +2% |
| optional/dependencies-compatibility.json | empty dependents | 3 | ✅ | 197.7M | ✅ | 68.6M | 🟢 **-65%** |
| optional/dependencies-compatibility.json | multiple dependents required | 6 | ✅ | 33.0M | ✅ | 21.4M | 🟢 **-35%** |
| optional/dependencies-compatibility.json | dependencies with escaped characters | 4 | ✅ | 43.9M | ✅ | 34.5M | 🟢 **-21%** |
| optional/dependencies-compatibility.json | single schema dependency | 8 | ✅ | 50.4M | ✅ | 28.2M | 🟢 **-44%** |
| optional/dependencies-compatibility.json | boolean subschemas | 4 | ✅ | 56.6M | ❌ | - | - |
| optional/dependencies-compatibility.json | schema dependencies with escaped char... | 4 | ✅ | 42.8M | ✅ | 18.8M | 🟢 **-56%** |
| optional/dynamicRef.json | $dynamicRef skips over intermediate r... | 2 | ✅ | 8.2M | ❌ | - | - |
| optional/ecmascript-regex.json | ECMA 262 regex $ does not match trail... | 2 | ✅ | 57.9M | ✅ | 20.0M | 🟢 **-65%** |
| optional/ecmascript-regex.json | ECMA 262 regex converts \t to horizon... | 2 | ✅ | 29.3M | ✅ | 23.7M | -19% |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 28.7M | ✅ | 18.7M | 🟢 **-35%** |
| optional/ecmascript-regex.json | ECMA 262 regex escapes control codes ... | 2 | ✅ | 29.3M | ✅ | 23.5M | -20% |
| optional/ecmascript-regex.json | ECMA 262 \d matches ascii digits only | 3 | ✅ | 27.5M | ✅ | 17.9M | 🟢 **-35%** |
| optional/ecmascript-regex.json | ECMA 262 \D matches everything but as... | 3 | ✅ | 26.4M | ✅ | 27.5M | +4% |
| optional/ecmascript-regex.json | ECMA 262 \w matches ascii letters only | 2 | ✅ | 28.2M | ✅ | 19.5M | 🟢 **-31%** |
| optional/ecmascript-regex.json | ECMA 262 \W matches everything but as... | 2 | ✅ | 28.7M | ✅ | 24.4M | -15% |
| optional/ecmascript-regex.json | ECMA 262 \s matches whitespace | 11 | ✅ | 27.9M | ✅ | 25.8M | -8% |
| optional/ecmascript-regex.json | ECMA 262 \S matches everything but wh... | 11 | ✅ | 29.6M | ✅ | 19.9M | 🟢 **-33%** |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 17.1M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patterns matches [A-Za-z0-9_], ... | 4 | ✅ | 16.5M | ✅ | 11.2M | 🟢 **-32%** |
| optional/ecmascript-regex.json | pattern with ASCII ranges | 3 | ✅ | 15.8M | ✅ | 14.2M | -11% |
| optional/ecmascript-regex.json | \d in pattern matches [0-9], not unic... | 3 | ✅ | 27.9M | ✅ | 17.3M | 🟢 **-38%** |
| optional/ecmascript-regex.json | pattern with non-ASCII digits | 3 | ✅ | 22.8M | ❌ | - | - |
| optional/ecmascript-regex.json | patterns always use unicode semantics... | 4 | ✅ | 24.5M | ❌ | - | - |
| optional/ecmascript-regex.json | \w in patternProperties matches [A-Za... | 4 | ✅ | 22.0M | ✅ | 9.9M | 🟢 **-55%** |
| optional/ecmascript-regex.json | patternProperties with ASCII ranges | 3 | ✅ | 20.7M | ✅ | 12.3M | 🟢 **-40%** |
| optional/ecmascript-regex.json | \d in patternProperties matches [0-9]... | 3 | ✅ | 7.2M | ✅ | 5.8M | 🟢 **-20%** |
| optional/ecmascript-regex.json | patternProperties with non-ASCII digits | 3 | ✅ | 9.2M | ❌ | - | - |
| optional/float-overflow.json | all integers are multiples of 0.5, if... | 1 | ✅ | 11.1M | ❌ | - | - |
| optional/format/date-time.json | validation of date-time strings | 26 | ✅ | 24.0M | ❌ | - | - |
| optional/format/date.json | validation of date strings | 48 | ✅ | 26.5M | ❌ | - | - |
| optional/format/duration.json | validation of duration strings | 26 | ✅ | 39.4M | ❌ | - | - |
| optional/format/ecmascript-regex.json | \a is not an ECMA 262 control escape | 1 | ✅ | 44.3M | ❌ | - | - |
| optional/format/email.json | validation of e-mail addresses | 24 | ✅ | 12.0M | ❌ | - | - |
| optional/format/hostname.json | validation of host names | 24 | ✅ | 13.4M | ❌ | - | - |
| optional/format/hostname.json | validation of A-label (punycode) host... | 37 | ✅ | 2.7M | ❌ | - | - |
| optional/format/idn-email.json | validation of an internationalized e-... | 10 | ✅ | 18.9M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of internationalized host ... | 57 | ✅ | 9.2M | ❌ | - | - |
| optional/format/idn-hostname.json | validation of separators in internati... | 20 | ✅ | 5.4M | ❌ | - | - |
| optional/format/ipv4.json | validation of IP addresses | 16 | ✅ | 36.1M | ✅ | 5.5M | 🟢 **-85%** |
| optional/format/ipv6.json | validation of IPv6 addresses | 40 | ✅ | 16.6M | ❌ | - | - |
| optional/format/iri-reference.json | validation of IRI References | 13 | ✅ | 32.2M | ❌ | - | - |
| optional/format/iri.json | validation of IRIs | 15 | ✅ | 15.3M | ❌ | - | - |
| optional/format/json-pointer.json | validation of JSON-pointers (JSON Str... | 38 | ✅ | 30.9M | ❌ | - | - |
| optional/format/regex.json | validation of regular expressions | 8 | ✅ | 77.9M | ❌ | - | - |
| optional/format/relative-json-pointer.json | validation of Relative JSON Pointers ... | 18 | ✅ | 38.4M | ❌ | - | - |
| optional/format/time.json | validation of time strings | 46 | ✅ | 6.5M | ❌ | - | - |
| optional/format/unknown.json | unknown format | 7 | ✅ | 96.9M | ✅ | 65.4M | 🟢 **-33%** |
| optional/format/uri-reference.json | validation of URI References | 15 | ✅ | 10.1M | ❌ | - | - |
| optional/format/uri-template.json | format: uri-template | 10 | ✅ | 18.2M | ❌ | - | - |
| optional/format/uri.json | validation of URIs | 36 | ✅ | 6.9M | ❌ | - | - |
| optional/format/uuid.json | uuid format | 22 | ✅ | 15.6M | ❌ | - | - |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 22.9M | ✅ | 10.3M | 🟢 **-55%** |
| optional/format-assertion.json | schema that uses custom metaschema wi... | 2 | ✅ | 17.7M | ✅ | 11.9M | 🟢 **-33%** |
| optional/id.json | $id inside an enum is not a real iden... | 3 | ✅ | 38.4M | ❌ | - | - |
| optional/no-schema.json | validation without $schema | 3 | ✅ | 66.0M | ✅ | 35.5M | 🟢 **-46%** |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 7 | ✅ | 29.2M | ❌ | - | - |
| optional/non-bmp-regex.json | Proper UTF-16 surrogate pair handling... | 5 | ✅ | 18.0M | ❌ | - | - |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword  | 2 | ✅ | 48.7M | ✅ | 26.8M | 🟢 **-45%** |
| optional/refOfUnknownKeyword.json | reference of a root arbitrary keyword... | 2 | ✅ | 49.0M | ✅ | 28.6M | 🟢 **-42%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 48.4M | ✅ | 26.7M | 🟢 **-45%** |
| optional/refOfUnknownKeyword.json | reference internals of known non-appl... | 2 | ✅ | 69.7M | ✅ | 28.8M | 🟢 **-59%** |
| optional/refOfUnknownKeyword.json | reference of an arbitrary keyword of ... | 2 | ✅ | 49.1M | ✅ | 26.4M | 🟢 **-46%** |
| optional/unknownKeyword.json | $id inside an unknown keyword is not ... | 3 | ✅ | 24.2M | ❌ | - | - |
