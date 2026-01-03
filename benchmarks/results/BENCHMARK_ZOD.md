# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 40.6M | ⚠️ 4/20 | 129 | 109K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 42.4M | ⚠️ 5/25 | 166 | 127K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 42.0M | ⚠️ 5/25 | 214 | 161K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 40.0M | ⚠️ 6/31 | 244 | 180K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 47.8M | ⚠️ 6/30 | 263 | 196K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 42.6M | ⚠️ 26/131 | 1016 | 156K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 293.39x faster (23 ns vs 6887 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 68.1M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.6M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 57.8M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 67.8M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 49.1M | ✅ | 371K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 33.8M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 48.6M | ✅ | 24.7M | 🟢 **-49%** |
| items.json | 5 | ✅ | 18.5M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 48.6M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.6M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 59.6M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 23.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.4M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 74.3M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 49.9M | ✅ | 68K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 53.0M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 23.1M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 24.8M | 🟢 **-63%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 64.7M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.9M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 56.9M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 58.7M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 51.0M | ✅ | 135K | 🟢 **-100%** |
| const.json | 35 | ✅ | 50.8M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 43.9M | ✅ | 361K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.9M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 28.5M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 43.3M | ✅ | 24.1M | 🟢 **-44%** |
| items.json | 7 | ✅ | 21.0M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 61.2M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 56.7M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 19.6M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 75.3M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 76.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 56.2M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 56.4M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.8M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 24.8M | 🟢 **-63%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 64.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.8M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 54.8M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 59.0M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 53.8M | ✅ | 135K | 🟢 **-100%** |
| const.json | 35 | ✅ | 53.4M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.0M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 44.2M | ✅ | 365K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.9M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 30.2M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 40.3M | ✅ | 23.2M | 🟢 **-42%** |
| items.json | 7 | ✅ | 20.6M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 45.6M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 56.3M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 21.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.8M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.8M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.6M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 75.4M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 46.0M | ✅ | 68K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 60.8M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.6M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.9M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 25.0M | 🟢 **-63%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 68.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.8M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 46.7M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.9M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 53.7M | ✅ | 135K | 🟢 **-100%** |
| const.json | 35 | ✅ | 47.7M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.8M | ✅ | 23.6M | 🟢 **-64%** |
| default.json | 7 | ✅ | 47.3M | ✅ | 372K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 31.8M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 68.1M | ✅ | 23.0M | 🟢 **-66%** |
| items.json | 7 | ✅ | 22.5M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 76.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.9M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.4M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 35.8M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 55.0M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 22.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.6M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 53.8M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 76.3M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 47.0M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.7M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.7M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 55.8M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 76.9M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.7M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 24.7M | 🟢 **-63%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 56.9M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 54.8M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.9M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 49.0M | ✅ | 131K | 🟢 **-100%** |
| const.json | 35 | ✅ | 54.1M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 66.0M | ✅ | 24.8M | 🟢 **-62%** |
| default.json | 7 | ✅ | 47.6M | ✅ | 369K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 34.1M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 66.6M | ✅ | 23.3M | 🟢 **-65%** |
| items.json | 6 | ✅ | 20.9M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 76.5M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.4M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 51.0M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.0M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 57.0M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 21.2M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 69.0M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.4M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 53.7M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 68.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 47.2M | ✅ | 68K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 61.7M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 61.1M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 56.3M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 76.0M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.7M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.6M | ✅ | 25.0M | 🟢 **-62%** |

