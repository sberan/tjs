# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 51.2M | ⚠️ 4/20 | 129 | 107K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 55.9M | ⚠️ 5/25 | 166 | 124K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 43.3M | ⚠️ 5/25 | 214 | 162K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 48.8M | ⚠️ 6/31 | 244 | 182K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 64.5M | ⚠️ 6/30 | 263 | 201K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 52.0M | ⚠️ 26/131 | 1016 | 156K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 362.36x faster (19 ns vs 6971 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 84.0M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 57.6M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 74.0M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 82.8M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 52.8M | ✅ | 379K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 39.8M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 48.0M | ✅ | 25.9M | 🟢 **-46%** |
| items.json | 5 | ✅ | 18.1M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 66.1M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 81.9M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 90.5M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 24.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 18.1M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 70.2M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 62.2M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 75.2M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 70.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 56.4M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 32.2M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 88.5M | ✅ | 27.3M | 🟢 **-69%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 86.6M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 66.6M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 67.4M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 69.6M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 65.7M | ✅ | 135K | 🟢 **-100%** |
| const.json | 35 | ✅ | 66.4M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 83.7M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 51.3M | ✅ | 368K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 88.8M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 40.3M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 74.5M | ✅ | 25.9M | 🟢 **-65%** |
| items.json | 7 | ✅ | 23.1M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 65.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 63.2M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 68.7M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 33.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 19.7M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 73.4M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 91.1M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 90.6M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 60.7M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 74.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 70.9M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 34.4M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 89.5M | ✅ | 24.7M | 🟢 **-72%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 66.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 49.5M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 60.1M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 58.9M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 54.2M | ✅ | 141K | 🟢 **-100%** |
| const.json | 35 | ✅ | 61.4M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 48.9M | ✅ | 387K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 72.9M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.8M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 43.0M | ✅ | 24.2M | 🟢 **-44%** |
| items.json | 7 | ✅ | 21.0M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 56.2M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 72.2M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 57.2M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 29.5M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.9M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 72.5M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 72.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 50.1M | ✅ | 68K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 64.4M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 54.9M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 23.1M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 71.9M | ✅ | 27.5M | 🟢 **-62%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 88.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 67.4M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 73.3M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 76.7M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 68.1M | ✅ | 137K | 🟢 **-100%** |
| const.json | 35 | ✅ | 67.1M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 77.1M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 84.4M | ✅ | 24.4M | 🟢 **-71%** |
| default.json | 7 | ✅ | 34.7M | ✅ | 371K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 39.9M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 87.5M | ✅ | 23.4M | 🟢 **-73%** |
| items.json | 7 | ✅ | 23.8M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 90.9M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 92.0M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 66.1M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 62.0M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 69.0M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 22.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 18.1M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 70.2M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 90.8M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.1M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 65.1M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 81.0M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 54.7M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 76.9M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 73.6M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 70.3M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 92.8M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 30.0M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 95.7M | ✅ | 26.7M | 🟢 **-72%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 72.0M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 73.1M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 74.4M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 67.9M | ✅ | 187K | 🟢 **-100%** |
| const.json | 35 | ✅ | 68.0M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 85.8M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 79.8M | ✅ | 24.3M | 🟢 **-69%** |
| default.json | 7 | ✅ | 53.6M | ✅ | 374K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 41.2M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 83.1M | ✅ | 23.4M | 🟢 **-72%** |
| items.json | 6 | ✅ | 21.8M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 94.0M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 93.3M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 69.2M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 63.3M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 68.0M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 27.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 18.7M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 85.8M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 77.5M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 94.7M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 53.6M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 95.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 82.4M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 78.4M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 76.6M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 75.4M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 93.7M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 34.7M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 94.4M | ✅ | 25.6M | 🟢 **-73%** |

