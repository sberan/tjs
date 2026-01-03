# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 46.6M | ⚠️ 4/20 | 129 | 165K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 47.7M | ⚠️ 5/25 | 166 | 188K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 49.7M | ⚠️ 5/25 | 214 | 241K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 32.0M | ⚠️ 6/31 | 244 | 275K | 🟢 **-99%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 34.2M | ⚠️ 6/30 | 263 | 295K | 🟢 **-99%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 39.6M | ⚠️ 26/131 | 1016 | 234K | 🟢 **-99%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 169.98x faster (25 ns vs 4289 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 77.8M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 62.6M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 58.8M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 67.6M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 56.8M | ✅ | 555K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 31.8M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 71.5M | ✅ | 28.6M | 🟢 **-60%** |
| items.json | 5 | ✅ | 22.4M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 61.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 47.8M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 62.4M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 31.6M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 20.7M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 67.9M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 83.0M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 48.0M | ✅ | 103K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 68.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 59.2M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 34.1M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 105.6M | ✅ | 30.8M | 🟢 **-71%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 70.1M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 61.6M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 58.4M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 58.7M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 51.3M | ✅ | 179K | 🟢 **-100%** |
| const.json | 35 | ✅ | 55.3M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 78.9M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 49.7M | ✅ | 553K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 78.9M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 30.6M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 59.3M | ✅ | 28.8M | 🟢 **-51%** |
| items.json | 7 | ✅ | 28.3M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 56.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 45.6M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 57.4M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 34.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 24.0M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 67.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 82.3M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 82.3M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 47.1M | ✅ | 104K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 68.2M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 64.1M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 34.4M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 78.0M | ✅ | 29.5M | 🟢 **-62%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 70.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 62.3M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 56.9M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.5M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 52.2M | ✅ | 181K | 🟢 **-100%** |
| const.json | 35 | ✅ | 54.9M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 79.0M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 50.8M | ✅ | 555K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 79.3M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 30.7M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 64.1M | ✅ | 29.1M | 🟢 **-55%** |
| items.json | 7 | ✅ | 28.7M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 61.1M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 40.2M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 56.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 40.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 23.8M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 67.8M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 82.0M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 82.6M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 48.5M | ✅ | 104K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 69.7M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 69.1M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 33.3M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 78.2M | ✅ | 28.3M | 🟢 **-64%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 44.9M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 40.7M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 36.2M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 40.2M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 35.5M | ✅ | 208K | 🟢 **-99%** |
| const.json | 35 | ✅ | 33.5M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 46.2M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 44.0M | ✅ | 28.6M | 🟢 **-35%** |
| default.json | 7 | ✅ | 36.8M | ✅ | 567K | 🟢 **-98%** |
| enum.json | 28 | ✅ | 24.5M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 44.2M | ✅ | 29.1M | 🟢 **-34%** |
| items.json | 7 | ✅ | 22.7M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 47.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 44.1M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 30.9M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 30.2M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 33.4M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 29.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 23.2M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 45.3M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 49.1M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 4.4M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 32.8M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 49.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 31.3M | ✅ | 102K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 39.1M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 39.3M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 39.7M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 48.5M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 24.3M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 45.4M | ✅ | 29.4M | 🟢 **-35%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 42.0M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 33.5M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 40.4M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 33.7M | ✅ | 203K | 🟢 **-99%** |
| const.json | 35 | ✅ | 34.0M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 48.4M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 44.6M | ✅ | 29.0M | 🟢 **-35%** |
| default.json | 7 | ✅ | 36.7M | ✅ | 576K | 🟢 **-98%** |
| enum.json | 28 | ✅ | 24.0M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 45.6M | ✅ | 29.2M | 🟢 **-36%** |
| items.json | 6 | ✅ | 21.7M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 48.5M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 45.3M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 37.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 27.9M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 33.2M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 28.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 22.3M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 42.5M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 43.6M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 46.3M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 31.3M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 47.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 30.2M | ✅ | 102K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 38.3M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 36.4M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 39.6M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 43.3M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 23.5M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 44.7M | ✅ | 28.7M | 🟢 **-36%** |

