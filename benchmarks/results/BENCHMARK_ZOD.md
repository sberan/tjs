# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 42.2M | ⚠️ 4/20 | 129 | 111K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 42.2M | ⚠️ 5/25 | 166 | 127K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 41.1M | ⚠️ 5/25 | 214 | 166K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 40.2M | ⚠️ 6/31 | 244 | 186K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 48.8M | ⚠️ 6/30 | 263 | 199K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 42.8M | ⚠️ 26/131 | 1016 | 159K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 289.95x faster (23 ns vs 6768 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 69.8M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 55.1M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 57.4M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 67.9M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 49.0M | ✅ | 370K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 34.3M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 49.4M | ✅ | 24.5M | 🟢 **-51%** |
| items.json | 5 | ✅ | 18.4M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.2M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 58.5M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 23.6M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 74.1M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 61.3M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 44.3M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.4M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 24.7M | 🟢 **-63%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 62.4M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 53.5M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 57.5M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 58.7M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 50.8M | ✅ | 136K | 🟢 **-100%** |
| const.json | 35 | ✅ | 49.6M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 43.9M | ✅ | 367K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.8M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 29.3M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 43.8M | ✅ | 23.8M | 🟢 **-46%** |
| items.json | 7 | ✅ | 23.2M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 49.6M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 56.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 21.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.4M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 76.4M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 54.6M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 53.8M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.8M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 24.6M | 🟢 **-63%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 62.0M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 53.9M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 54.9M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 59.1M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 49.0M | ✅ | 138K | 🟢 **-100%** |
| const.json | 35 | ✅ | 52.0M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 44.4M | ✅ | 371K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.6M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 30.3M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 41.0M | ✅ | 22.8M | 🟢 **-44%** |
| items.json | 7 | ✅ | 20.9M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.4M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 39.5M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 54.7M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 22.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.0M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 75.8M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 75.3M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 51.8M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.9M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 53.1M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.4M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 24.6M | 🟢 **-63%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 73.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.7M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 43.4M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 62.0M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 49.4M | ✅ | 139K | 🟢 **-100%** |
| const.json | 35 | ✅ | 52.0M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 66.2M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 66.0M | ✅ | 24.1M | 🟢 **-63%** |
| default.json | 7 | ✅ | 48.2M | ✅ | 371K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 33.5M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 69.1M | ✅ | 23.1M | 🟢 **-67%** |
| items.json | 7 | ✅ | 22.0M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 73.7M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.1M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.6M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 39.3M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 52.0M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 21.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.6M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.8M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.2M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 53.3M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 71.7M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 46.5M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 59.6M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 61.2M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 59.7M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 76.2M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.5M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 24.5M | 🟢 **-63%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 56.7M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 53.2M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 60.5M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 49.7M | ✅ | 136K | 🟢 **-100%** |
| const.json | 35 | ✅ | 51.9M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.9M | ✅ | 24.4M | 🟢 **-63%** |
| default.json | 7 | ✅ | 48.8M | ✅ | 367K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 33.3M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 64.1M | ✅ | 14.4M | 🟢 **-78%** |
| items.json | 6 | ✅ | 20.7M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 76.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 73.8M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 39.5M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 53.3M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 21.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.2M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 69.0M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.4M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 53.1M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 74.9M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 46.4M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.7M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 63.0M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 56.4M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 75.3M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.5M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 24.7M | 🟢 **-63%** |

