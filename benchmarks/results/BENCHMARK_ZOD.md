# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 50.5M | ⚠️ 4/20 | 129 | 105K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 54.1M | ⚠️ 5/25 | 166 | 127K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 49.7M | ⚠️ 5/25 | 214 | 157K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 48.0M | ⚠️ 6/31 | 244 | 184K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 57.8M | ⚠️ 6/30 | 263 | 206K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 51.9M | ⚠️ 26/131 | 1016 | 156K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 380.05x faster (19 ns vs 7319 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 46.8M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 67.1M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 74.6M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 84.0M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 51.4M | ✅ | 375K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 39.4M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 54.0M | ✅ | 27.7M | 🟢 **-49%** |
| items.json | 5 | ✅ | 18.0M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 66.1M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 61.9M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 74.0M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 20.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 18.1M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 70.2M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 67.0M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 78.3M | ✅ | 66K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 67.0M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 63.3M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 30.2M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 88.4M | ✅ | 24.6M | 🟢 **-72%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 90.6M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 67.5M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 73.4M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 75.9M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 68.0M | ✅ | 142K | 🟢 **-100%** |
| const.json | 35 | ✅ | 66.1M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 76.7M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 56.7M | ✅ | 379K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 92.6M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 40.7M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 43.9M | ✅ | 27.2M | 🟢 **-38%** |
| items.json | 7 | ✅ | 23.0M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 66.1M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 62.1M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 66.6M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 32.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.6M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 70.1M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 90.7M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 90.8M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 81.2M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 76.8M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 69.2M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 32.4M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 88.5M | ✅ | 27.6M | 🟢 **-69%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 84.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 55.2M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 67.3M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 72.5M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 74.1M | ✅ | 130K | 🟢 **-100%** |
| const.json | 35 | ✅ | 60.7M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 73.6M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 54.9M | ✅ | 358K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 87.0M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 38.7M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 41.1M | ✅ | 24.6M | 🟢 **-40%** |
| items.json | 7 | ✅ | 23.3M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 62.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 59.2M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 65.2M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 24.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.9M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 67.2M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 83.8M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 85.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 73.3M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 73.1M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 61.3M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 31.0M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 83.4M | ✅ | 27.6M | 🟢 **-67%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 80.1M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 68.2M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 66.5M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 71.3M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 68.6M | ✅ | 132K | 🟢 **-100%** |
| const.json | 35 | ✅ | 69.6M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 83.9M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 75.2M | ✅ | 19.3M | 🟢 **-74%** |
| default.json | 7 | ✅ | 48.0M | ✅ | 352K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 38.0M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 84.1M | ✅ | 20.4M | 🟢 **-76%** |
| items.json | 7 | ✅ | 23.2M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 90.7M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 88.8M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 66.4M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 58.6M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 68.7M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 26.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 19.9M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 73.8M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 91.5M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 2.3M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 45.3M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 90.6M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 74.9M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 74.4M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 73.8M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 63.4M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 89.4M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 34.1M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 89.7M | ✅ | 20.3M | 🟢 **-77%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 63.9M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 68.4M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 71.8M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 59.7M | ✅ | 176K | 🟢 **-100%** |
| const.json | 35 | ✅ | 61.3M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 73.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 79.3M | ✅ | 27.3M | 🟢 **-66%** |
| default.json | 7 | ✅ | 54.8M | ✅ | 376K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 36.6M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 82.8M | ✅ | 25.8M | 🟢 **-69%** |
| items.json | 6 | ✅ | 20.5M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 85.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 85.8M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 63.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 78.3M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 64.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 24.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.9M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 79.7M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 67.2M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 85.6M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 62.6M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 85.0M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 72.3M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 73.5M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 70.2M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 69.9M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 86.9M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 25.0M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 82.9M | ✅ | 27.5M | 🟢 **-67%** |

