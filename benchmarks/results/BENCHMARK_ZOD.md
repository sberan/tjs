# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 45.3M | ⚠️ 4/20 | 129 | 108K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 46.9M | ⚠️ 5/25 | 166 | 128K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 42.4M | ⚠️ 5/25 | 214 | 161K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 44.0M | ⚠️ 6/31 | 244 | 184K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 49.6M | ⚠️ 6/30 | 263 | 208K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 45.6M | ⚠️ 26/131 | 1016 | 158K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 308.10x faster (22 ns vs 6757 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 68.6M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.8M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 57.9M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 68.4M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 46.1M | ✅ | 388K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 34.4M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 46.0M | ✅ | 26.2M | 🟢 **-43%** |
| items.json | 5 | ✅ | 17.5M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.0M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 62.5M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 73.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 23.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.2M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 74.0M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 61.3M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.5M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.3M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.9M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 68.6M | ✅ | 27.5M | 🟢 **-60%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 67.8M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 54.5M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 60.2M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 60.9M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 55.9M | ✅ | 137K | 🟢 **-100%** |
| const.json | 35 | ✅ | 61.4M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 49.0M | ✅ | 394K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 74.0M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.3M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 53.4M | ✅ | 25.8M | 🟢 **-52%** |
| items.json | 7 | ✅ | 21.7M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 54.9M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.4M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 53.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 29.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 16.9M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 64.1M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 62.9M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 56.1M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 56.2M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.3M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.5M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.9M | ✅ | 27.2M | 🟢 **-59%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 63.5M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 27.4M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 57.1M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 58.6M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 53.1M | ✅ | 124K | 🟢 **-100%** |
| const.json | 35 | ✅ | 56.2M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 62.0M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 44.9M | ✅ | 374K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 69.8M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 32.4M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 43.7M | ✅ | 25.5M | 🟢 **-42%** |
| items.json | 7 | ✅ | 22.8M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 51.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 46.4M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 39.0M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 20.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 20.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 57.1M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 69.6M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 68.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 45.7M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 61.1M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 50.7M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 26.6M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.0M | ✅ | 27.5M | 🟢 **-58%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 68.2M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.5M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 53.3M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.5M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 61.7M | ✅ | 137K | 🟢 **-100%** |
| const.json | 35 | ✅ | 62.3M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 66.2M | ✅ | 24.3M | 🟢 **-63%** |
| default.json | 7 | ✅ | 47.6M | ✅ | 388K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 32.2M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 66.8M | ✅ | 22.6M | 🟢 **-66%** |
| items.json | 7 | ✅ | 21.3M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 76.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 74.4M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 25.6M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 49.6M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 55.3M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 23.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.7M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.2M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 3.0M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 53.8M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 76.0M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 60.6M | ✅ | 68K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.7M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.8M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 56.4M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 76.5M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 29.8M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.8M | ✅ | 27.0M | 🟢 **-60%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 54.6M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 58.8M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 61.0M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 55.0M | ✅ | 178K | 🟢 **-100%** |
| const.json | 35 | ✅ | 61.8M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 64.6M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 64.7M | ✅ | 27.2M | 🟢 **-58%** |
| default.json | 7 | ✅ | 46.5M | ✅ | 388K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 30.8M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 68.0M | ✅ | 25.5M | 🟢 **-63%** |
| items.json | 6 | ✅ | 20.8M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 73.0M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 71.4M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.5M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 49.2M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 55.8M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 29.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 14.7M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 65.1M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 71.8M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 53.5M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 73.0M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 57.7M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.8M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 60.5M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 54.7M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 73.0M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 22.5M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.2M | ✅ | 24.3M | 🟢 **-63%** |

