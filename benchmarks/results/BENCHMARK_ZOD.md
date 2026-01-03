# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 44.2M | ⚠️ 4/20 | 129 | 108K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 43.6M | ⚠️ 5/25 | 166 | 128K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 45.5M | ⚠️ 5/25 | 214 | 164K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 44.4M | ⚠️ 6/31 | 244 | 184K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 48.2M | ⚠️ 6/30 | 263 | 194K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 45.3M | ⚠️ 26/131 | 1016 | 157K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 312.24x faster (22 ns vs 6892 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 67.1M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 48.6M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 56.5M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 66.0M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 44.5M | ✅ | 371K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 32.8M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 51.0M | ✅ | 27.1M | 🟢 **-47%** |
| items.json | 5 | ✅ | 17.1M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 57.7M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 61.2M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 67.7M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 20.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.9M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 71.1M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 57.8M | ✅ | 68K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.5M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.8M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.3M | ✅ | 27.2M | 🟢 **-58%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 65.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 53.8M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 55.9M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 60.8M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 62.2M | ✅ | 140K | 🟢 **-100%** |
| const.json | 35 | ✅ | 54.8M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 45.9M | ✅ | 383K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 70.9M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 31.5M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 48.3M | ✅ | 27.2M | 🟢 **-44%** |
| items.json | 7 | ✅ | 20.3M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.2M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 46.6M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 55.8M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 23.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 9.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.4M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 72.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 46.6M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.4M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 27.7M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.2M | ✅ | 27.3M | 🟢 **-58%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 67.2M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 54.0M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 54.6M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 57.0M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 53.9M | ✅ | 136K | 🟢 **-100%** |
| const.json | 35 | ✅ | 60.7M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 64.1M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 46.8M | ✅ | 375K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 73.4M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 32.1M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 47.3M | ✅ | 23.3M | 🟢 **-51%** |
| items.json | 7 | ✅ | 23.1M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 50.1M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 62.6M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 55.5M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 29.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 73.0M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 73.1M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 49.6M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.2M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.8M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.3M | ✅ | 27.3M | 🟢 **-58%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 67.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 44.2M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 59.5M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.5M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 54.1M | ✅ | 110K | 🟢 **-100%** |
| const.json | 35 | ✅ | 61.9M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 66.0M | ✅ | 24.6M | 🟢 **-63%** |
| default.json | 7 | ✅ | 48.6M | ✅ | 375K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 31.9M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 67.5M | ✅ | 24.1M | 🟢 **-64%** |
| items.json | 7 | ✅ | 21.4M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 76.3M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 52.9M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 56.1M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 30.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.6M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 54.1M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 76.0M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 62.5M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.7M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 63.0M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 56.5M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 76.6M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.9M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.7M | ✅ | 27.3M | 🟢 **-59%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 57.9M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 49.7M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 48.2M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 52.6M | ✅ | 133K | 🟢 **-100%** |
| const.json | 35 | ✅ | 58.6M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.1M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.1M | ✅ | 25.2M | 🟢 **-61%** |
| default.json | 7 | ✅ | 45.4M | ✅ | 377K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 33.9M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 62.7M | ✅ | 24.5M | 🟢 **-61%** |
| items.json | 6 | ✅ | 19.2M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 72.9M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 70.2M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 59.7M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.2M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 51.8M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 24.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.8M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 73.1M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 62.4M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.4M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 42.9M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 73.1M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 46.3M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 50.5M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 58.1M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 46.6M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 71.5M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.6M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.5M | ✅ | 24.4M | 🟢 **-63%** |

