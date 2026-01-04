# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 40.0M | ⚠️ 4/20 | 129 | 109K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 43.0M | ⚠️ 5/25 | 166 | 126K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 46.3M | ⚠️ 5/25 | 214 | 162K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 38.4M | ⚠️ 6/31 | 244 | 183K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 51.6M | ⚠️ 6/30 | 263 | 196K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 43.7M | ⚠️ 26/131 | 1016 | 156K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 301.25x faster (23 ns vs 6891 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 54.6M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 47.3M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 56.9M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 63.5M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 43.4M | ✅ | 384K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 31.5M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 47.8M | ✅ | 27.4M | 🟢 **-43%** |
| items.json | 5 | ✅ | 16.6M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 51.2M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 46.5M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 57.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 21.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.5M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 57.1M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 59.7M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 49.2M | ✅ | 68K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 55.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 51.0M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 25.8M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 64.8M | ✅ | 27.4M | 🟢 **-58%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 37.7M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 48.3M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 56.7M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.0M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 53.6M | ✅ | 134K | 🟢 **-100%** |
| const.json | 35 | ✅ | 52.0M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 47.4M | ✅ | 373K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 73.4M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.2M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 44.6M | ✅ | 27.0M | 🟢 **-39%** |
| items.json | 7 | ✅ | 17.9M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.4M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 48.6M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 55.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 23.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.6M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 72.7M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 47.9M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.6M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.0M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.3M | ✅ | 27.4M | 🟢 **-58%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 72.6M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 47.9M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 59.4M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.4M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 54.0M | ✅ | 135K | 🟢 **-100%** |
| const.json | 35 | ✅ | 56.6M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 49.1M | ✅ | 380K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 77.0M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.7M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 42.8M | ✅ | 23.3M | 🟢 **-46%** |
| items.json | 7 | ✅ | 22.4M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.4M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 49.4M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 56.8M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 22.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.5M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 76.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 64.7M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.3M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.3M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 26.3M | 🟢 **-61%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 53.4M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 44.6M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 53.7M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 54.7M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 50.0M | ✅ | 136K | 🟢 **-100%** |
| const.json | 35 | ✅ | 46.0M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 56.4M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 60.3M | ✅ | 24.1M | 🟢 **-60%** |
| default.json | 7 | ✅ | 42.6M | ✅ | 370K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 29.7M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 58.7M | ✅ | 22.0M | 🟢 **-62%** |
| items.json | 7 | ✅ | 20.6M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 62.7M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 58.0M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 45.6M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 43.9M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 51.2M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 17.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.7M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 53.0M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 63.0M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 47.9M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 55.6M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 53.8M | ✅ | 68K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 56.6M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 61.0M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 50.3M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 62.9M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 21.1M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 61.9M | ✅ | 28.0M | 🟢 **-55%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 56.6M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 60.2M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 62.1M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 55.8M | ✅ | 133K | 🟢 **-100%** |
| const.json | 35 | ✅ | 50.7M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.8M | ✅ | 27.5M | 🟢 **-58%** |
| default.json | 7 | ✅ | 46.9M | ✅ | 380K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 30.8M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 66.0M | ✅ | 24.8M | 🟢 **-62%** |
| items.json | 6 | ✅ | 19.4M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 76.1M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 72.8M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 52.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.4M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 56.8M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 23.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 68.5M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.6M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 54.5M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 76.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 61.8M | ✅ | 68K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.6M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 61.9M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 56.3M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 76.1M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.7M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.7M | ✅ | 27.1M | 🟢 **-59%** |

