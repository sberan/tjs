# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 44.3M | ⚠️ 4/20 | 129 | 108K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 44.5M | ⚠️ 5/25 | 166 | 126K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 44.2M | ⚠️ 5/25 | 214 | 165K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 41.6M | ⚠️ 6/31 | 244 | 187K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 49.8M | ⚠️ 6/30 | 263 | 204K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 44.8M | ⚠️ 26/131 | 1016 | 159K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 313.47x faster (22 ns vs 6996 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 69.2M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 48.6M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 56.0M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 64.1M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 44.4M | ✅ | 378K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 34.2M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 47.6M | ✅ | 27.8M | 🟢 **-42%** |
| items.json | 5 | ✅ | 17.0M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.3M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 62.6M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 20.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 71.3M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 60.5M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.9M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.3M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.9M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 26.5M | 🟢 **-60%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 58.4M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 50.4M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 54.3M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 57.7M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 58.3M | ✅ | 138K | 🟢 **-100%** |
| const.json | 35 | ✅ | 54.4M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 59.5M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 45.0M | ✅ | 379K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 66.8M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 31.3M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 47.2M | ✅ | 23.5M | 🟢 **-50%** |
| items.json | 7 | ✅ | 22.3M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 49.0M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 45.1M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 53.2M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 28.6M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.2M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 54.3M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 66.4M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 66.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 53.2M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 58.9M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 49.8M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.0M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 63.7M | ✅ | 24.7M | 🟢 **-61%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 66.6M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 44.4M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 51.6M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 33.1M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 53.5M | ✅ | 139K | 🟢 **-100%** |
| const.json | 35 | ✅ | 52.9M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 46.3M | ✅ | 370K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 72.7M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 32.2M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 43.0M | ✅ | 24.4M | 🟢 **-43%** |
| items.json | 7 | ✅ | 21.7M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 50.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 49.7M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 55.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 23.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.8M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 73.1M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 57.7M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 51.8M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.5M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.2M | ✅ | 27.4M | 🟢 **-58%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 69.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 52.9M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 59.2M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 62.1M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 59.4M | ✅ | 137K | 🟢 **-100%** |
| const.json | 35 | ✅ | 53.5M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 66.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.7M | ✅ | 25.0M | 🟢 **-62%** |
| default.json | 7 | ✅ | 47.3M | ✅ | 372K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 33.6M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 67.8M | ✅ | 26.1M | 🟢 **-62%** |
| items.json | 7 | ✅ | 21.6M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 75.8M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 54.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.1M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 57.3M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 21.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.8M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 75.6M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 54.9M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 76.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 49.8M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.8M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.8M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 56.5M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 76.1M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.6M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 27.3M | 🟢 **-59%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 56.9M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 60.2M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.9M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 56.0M | ✅ | 177K | 🟢 **-100%** |
| const.json | 35 | ✅ | 57.8M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 66.0M | ✅ | 26.9M | 🟢 **-59%** |
| default.json | 7 | ✅ | 48.4M | ✅ | 386K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 32.9M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 61.1M | ✅ | 24.8M | 🟢 **-59%** |
| items.json | 6 | ✅ | 19.3M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 76.3M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.4M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.6M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 56.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 30.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 69.1M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.2M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 52.9M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 76.3M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 49.8M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.8M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.6M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 56.8M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 76.1M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.4M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 27.1M | 🟢 **-60%** |

