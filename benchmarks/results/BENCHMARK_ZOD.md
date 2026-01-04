# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 37.5M | ⚠️ 4/20 | 129 | 108K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 43.1M | ⚠️ 5/25 | 166 | 136K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 45.3M | ⚠️ 5/25 | 214 | 163K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 38.6M | ⚠️ 6/31 | 244 | 181K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 49.2M | ⚠️ 6/30 | 263 | 204K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 42.7M | ⚠️ 26/131 | 1016 | 160K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 292.99x faster (23 ns vs 6855 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 51.8M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 42.4M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 52.0M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 55.9M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 41.3M | ✅ | 372K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 30.1M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 47.5M | ✅ | 27.9M | 🟢 **-41%** |
| items.json | 5 | ✅ | 16.4M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 46.8M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 41.8M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 52.3M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 22.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.7M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 53.1M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 62.0M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 52.1M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 56.4M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 46.1M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 20.3M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 61.5M | ✅ | 24.8M | 🟢 **-60%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 58.6M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 52.1M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 52.8M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 55.6M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 52.1M | ✅ | 144K | 🟢 **-100%** |
| const.json | 35 | ✅ | 48.8M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 63.1M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 45.3M | ✅ | 388K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 68.7M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 30.7M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 45.4M | ✅ | 24.8M | 🟢 **-45%** |
| items.json | 7 | ✅ | 21.5M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 51.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 44.4M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 45.2M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 22.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 57.5M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 69.2M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 68.4M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 53.3M | ✅ | 74K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 58.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 41.1M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 27.7M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 59.9M | ✅ | 26.0M | 🟢 **-57%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 66.7M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 54.2M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 65.9M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 54.0M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 61.9M | ✅ | 140K | 🟢 **-100%** |
| const.json | 35 | ✅ | 59.9M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 64.5M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 44.2M | ✅ | 369K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 73.2M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 32.4M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 42.4M | ✅ | 21.7M | 🟢 **-49%** |
| items.json | 7 | ✅ | 23.1M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.4M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 63.0M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 54.0M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 22.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 50.9M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.7M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 72.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 57.6M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 51.8M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 27.9M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.0M | ✅ | 27.5M | 🟢 **-58%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 58.8M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.2M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 51.7M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 28.8M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 47.0M | ✅ | 134K | 🟢 **-100%** |
| const.json | 35 | ✅ | 51.2M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.0M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.4M | ✅ | 21.7M | 🟢 **-67%** |
| default.json | 7 | ✅ | 44.0M | ✅ | 364K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 32.5M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 59.0M | ✅ | 21.7M | 🟢 **-63%** |
| items.json | 7 | ✅ | 19.5M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 52.6M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 69.6M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 57.2M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 47.7M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 51.7M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 24.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 18.2M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 62.1M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 73.1M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 2.5M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 40.3M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 72.8M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 46.4M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 49.8M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 57.4M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 46.3M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 71.3M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 30.7M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 63.3M | ✅ | 24.5M | 🟢 **-61%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 56.8M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 60.2M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.7M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 55.9M | ✅ | 183K | 🟢 **-100%** |
| const.json | 35 | ✅ | 61.7M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.1M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 66.1M | ✅ | 26.7M | 🟢 **-60%** |
| default.json | 7 | ✅ | 47.6M | ✅ | 380K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 31.8M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 59.9M | ✅ | 23.2M | 🟢 **-61%** |
| items.json | 6 | ✅ | 19.5M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 72.5M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 68.9M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.1M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 53.2M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 56.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 30.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.6M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 68.9M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.0M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 54.6M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 73.9M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 47.5M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.8M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.8M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 56.1M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 75.9M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.5M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 27.3M | 🟢 **-59%** |

