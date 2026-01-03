# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 43.2M | ⚠️ 4/20 | 129 | 110K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 43.3M | ⚠️ 5/25 | 166 | 125K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 45.9M | ⚠️ 5/25 | 214 | 157K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 43.3M | ⚠️ 6/31 | 244 | 186K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 50.6M | ⚠️ 6/30 | 263 | 201K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 45.4M | ⚠️ 26/131 | 1016 | 157K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 314.70x faster (22 ns vs 6933 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 66.9M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 54.4M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 56.6M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 61.8M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 43.7M | ✅ | 391K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 33.9M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 47.1M | ✅ | 27.7M | 🟢 **-41%** |
| items.json | 5 | ✅ | 17.4M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 49.4M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 60.2M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 21.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 70.9M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 55.9M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.9M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.8M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.1M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.2M | ✅ | 27.7M | 🟢 **-58%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 66.9M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 52.7M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 60.2M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 60.9M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 55.6M | ✅ | 136K | 🟢 **-100%** |
| const.json | 35 | ✅ | 57.9M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 39.9M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 48.4M | ✅ | 373K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.3M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.8M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 43.3M | ✅ | 24.6M | 🟢 **-43%** |
| items.json | 7 | ✅ | 21.8M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 54.7M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 48.5M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 56.8M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 29.6M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.5M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 76.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 61.4M | ✅ | 68K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.8M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.8M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 20.5M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 26.6M | 🟢 **-60%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 73.0M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 49.6M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 53.6M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.0M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 52.8M | ✅ | 133K | 🟢 **-100%** |
| const.json | 35 | ✅ | 63.5M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 48.7M | ✅ | 375K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 75.6M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.0M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 47.9M | ✅ | 24.3M | 🟢 **-49%** |
| items.json | 7 | ✅ | 21.6M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 54.8M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 46.9M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 54.6M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 23.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.4M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.8M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 70.9M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 72.0M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 59.3M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 51.2M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 25.4M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 26.8M | 🟢 **-60%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 69.9M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 49.5M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 60.2M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 62.2M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 57.0M | ✅ | 139K | 🟢 **-100%** |
| const.json | 35 | ✅ | 53.0M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 66.1M | ✅ | 24.5M | 🟢 **-63%** |
| default.json | 7 | ✅ | 48.8M | ✅ | 378K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 33.2M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 68.7M | ✅ | 26.2M | 🟢 **-62%** |
| items.json | 7 | ✅ | 21.9M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 76.0M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.8M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.5M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 55.0M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 27.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.9M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.1M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 54.7M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 76.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 48.9M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.7M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 63.0M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 55.5M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 73.3M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 30.2M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 27.6M | 🟢 **-59%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 57.0M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 58.8M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.6M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 56.0M | ✅ | 135K | 🟢 **-100%** |
| const.json | 35 | ✅ | 61.6M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 62.0M | ✅ | 27.7M | 🟢 **-55%** |
| default.json | 7 | ✅ | 48.9M | ✅ | 383K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 33.1M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 69.1M | ✅ | 26.1M | 🟢 **-62%** |
| items.json | 6 | ✅ | 19.4M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 76.1M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 63.9M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.1M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 56.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 21.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 68.9M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.2M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 54.7M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 75.4M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 61.0M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.8M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.8M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 56.3M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 76.8M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.8M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 27.8M | 🟢 **-59%** |

