# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 42.4M | ⚠️ 4/20 | 129 | 108K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 41.6M | ⚠️ 5/25 | 166 | 127K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 40.2M | ⚠️ 5/25 | 214 | 165K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 39.2M | ⚠️ 6/31 | 244 | 188K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 45.7M | ⚠️ 6/30 | 263 | 196K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 41.7M | ⚠️ 26/131 | 1016 | 158K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 283.78x faster (24 ns vs 6805 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 65.9M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.7M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 56.6M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 66.5M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 48.5M | ✅ | 366K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 33.7M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 47.8M | ✅ | 24.7M | 🟢 **-48%** |
| items.json | 5 | ✅ | 18.5M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.3M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 62.7M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 23.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 74.2M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 49.0M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.3M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 51.9M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.9M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.6M | ✅ | 27.5M | 🟢 **-58%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 72.9M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.5M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 53.1M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 57.0M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 49.2M | ✅ | 137K | 🟢 **-100%** |
| const.json | 35 | ✅ | 54.0M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 40.4M | ✅ | 369K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 71.8M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 25.9M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 41.9M | ✅ | 26.2M | 🟢 **-37%** |
| items.json | 7 | ✅ | 22.1M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 61.0M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 47.6M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 55.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 22.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 15.8M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 60.0M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.2M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 76.0M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 45.1M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.2M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 53.9M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.0M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.8M | ✅ | 27.4M | 🟢 **-58%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 71.9M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.4M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 46.3M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 57.2M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 46.1M | ✅ | 141K | 🟢 **-100%** |
| const.json | 35 | ✅ | 53.6M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 42.9M | ✅ | 357K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 74.1M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 26.0M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 40.0M | ✅ | 25.1M | 🟢 **-37%** |
| items.json | 7 | ✅ | 20.6M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.4M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 46.1M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 56.2M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 22.1M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.3M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 38.8M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 42.8M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.3M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 54.8M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.0M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.6M | ✅ | 27.6M | 🟢 **-58%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 64.4M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.7M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 52.1M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 58.9M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 48.5M | ✅ | 138K | 🟢 **-100%** |
| const.json | 35 | ✅ | 53.7M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 62.7M | ✅ | 27.1M | 🟢 **-57%** |
| default.json | 7 | ✅ | 48.4M | ✅ | 374K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 33.2M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 66.1M | ✅ | 26.3M | 🟢 **-60%** |
| items.json | 7 | ✅ | 22.4M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 76.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 70.4M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 39.8M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 55.1M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 21.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.3M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 2.9M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 52.6M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 76.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 43.6M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.2M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.2M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 57.3M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 76.0M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 21.6M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.8M | ✅ | 27.3M | 🟢 **-59%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 56.6M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 53.7M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 59.5M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 47.5M | ✅ | 109K | 🟢 **-100%** |
| const.json | 35 | ✅ | 52.6M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 66.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 63.6M | ✅ | 26.5M | 🟢 **-58%** |
| default.json | 7 | ✅ | 48.1M | ✅ | 364K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 31.6M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 63.0M | ✅ | 23.5M | 🟢 **-63%** |
| items.json | 6 | ✅ | 20.1M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 76.1M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 72.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.0M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 38.1M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 56.2M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 21.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 69.0M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.3M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 53.0M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 76.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 45.7M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.5M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 61.9M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 55.9M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 74.3M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 21.5M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.7M | ✅ | 27.3M | 🟢 **-58%** |

