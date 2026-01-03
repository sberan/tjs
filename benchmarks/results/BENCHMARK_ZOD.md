# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 39.3M | ⚠️ 4/20 | 129 | 109K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 46.5M | ⚠️ 5/25 | 166 | 127K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 45.4M | ⚠️ 5/25 | 214 | 165K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 40.6M | ⚠️ 6/31 | 244 | 186K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 50.2M | ⚠️ 6/30 | 263 | 204K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 44.4M | ⚠️ 26/131 | 1016 | 159K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 301.88x faster (23 ns vs 6797 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 64.1M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 52.4M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 56.1M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 63.3M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 42.9M | ✅ | 385K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 31.9M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 47.7M | ✅ | 27.8M | 🟢 **-42%** |
| items.json | 5 | ✅ | 17.1M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 51.2M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 61.1M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 56.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 20.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.4M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 57.2M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 66.6M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 45.7M | ✅ | 68K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 60.3M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 51.2M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 24.2M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 61.8M | ✅ | 26.5M | 🟢 **-57%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 66.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 54.4M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 56.8M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 60.8M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 52.7M | ✅ | 137K | 🟢 **-100%** |
| const.json | 35 | ✅ | 60.0M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 46.0M | ✅ | 379K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 73.4M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 31.7M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 47.6M | ✅ | 27.6M | 🟢 **-42%** |
| items.json | 7 | ✅ | 21.7M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.2M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 51.7M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 55.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 23.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.1M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.9M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 68.6M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 59.6M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.3M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.9M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 63.6M | ✅ | 24.7M | 🟢 **-61%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 72.0M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.0M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 58.1M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.7M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 50.4M | ✅ | 137K | 🟢 **-100%** |
| const.json | 35 | ✅ | 55.7M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 48.8M | ✅ | 377K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 73.7M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 35.4M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 41.9M | ✅ | 22.6M | 🟢 **-46%** |
| items.json | 7 | ✅ | 22.7M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.2M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.2M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 56.4M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 30.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.4M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.1M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 76.1M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 59.6M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 51.5M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.4M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.6M | ✅ | 27.6M | 🟢 **-59%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 56.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 37.9M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 48.6M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 48.7M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 49.9M | ✅ | 136K | 🟢 **-100%** |
| const.json | 35 | ✅ | 51.6M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 65.1M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 67.2M | ✅ | 23.5M | 🟢 **-65%** |
| default.json | 7 | ✅ | 44.2M | ✅ | 360K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 33.2M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 66.0M | ✅ | 24.6M | 🟢 **-63%** |
| items.json | 7 | ✅ | 19.5M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 72.1M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 70.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 58.8M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.6M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 50.6M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 24.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.8M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 62.4M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.5M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 2.5M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 43.7M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 72.9M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 52.0M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 56.3M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 58.5M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 48.9M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 71.7M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 30.2M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 63.6M | ✅ | 25.9M | 🟢 **-59%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 51.5M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 57.4M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 59.7M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 53.6M | ✅ | 176K | 🟢 **-100%** |
| const.json | 35 | ✅ | 55.6M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 61.5M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 62.7M | ✅ | 26.9M | 🟢 **-57%** |
| default.json | 7 | ✅ | 45.9M | ✅ | 381K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 32.0M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 64.4M | ✅ | 26.2M | 🟢 **-59%** |
| items.json | 6 | ✅ | 18.9M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 66.5M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 65.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 51.1M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.6M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 54.3M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 23.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 12.8M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 60.8M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 57.3M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 69.7M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 52.9M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 69.4M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 59.1M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 61.0M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 57.6M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 54.4M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 69.2M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 27.5M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 64.8M | ✅ | 27.5M | 🟢 **-58%** |

