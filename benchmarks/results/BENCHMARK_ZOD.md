# tjs vs zod Benchmarks

Performance comparison of **tjs** vs **[zod](https://zod.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | zod files | zod tests | zod ops/s | tjs vs zod |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 20 | 272 | ✅ 20 | 272 | 42.3M | ⚠️ 4/20 | 129 | 106K | 🟢 **-100%** |
| draft6 | 25 | 359 | ✅ 25 | 359 | 44.9M | ⚠️ 5/25 | 166 | 127K | 🟢 **-100%** |
| draft7 | 25 | 407 | ✅ 25 | 407 | 42.4M | ⚠️ 5/25 | 214 | 161K | 🟢 **-100%** |
| draft2019-09 | 31 | 457 | ✅ 31 | 457 | 42.0M | ⚠️ 6/31 | 244 | 188K | 🟢 **-100%** |
| draft2020-12 | 30 | 467 | ✅ 30 | 467 | 50.4M | ⚠️ 6/30 | 263 | 200K | 🟢 **-100%** |
| **Total** | 131 | 1962 | ✅ 131 | 1962 | 44.4M | ⚠️ 26/131 | 1016 | 157K | 🟢 **-100%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs zod**: 🟢 tjs is 311.87x faster (23 ns vs 7020 ns, 1962 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 66.8M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 2 | ✅ | 53.9M | ⚠️ 5 fail | - | - |
| allOf.json | 8 | ✅ | 56.6M | ⚠️ 15 fail | - | - |
| anyOf.json | 4 | ✅ | 65.4M | ⚠️ 3 fail | - | - |
| default.json | 7 | ✅ | 42.3M | ✅ | 363K | 🟢 **-99%** |
| enum.json | 32 | ✅ | 31.6M | ⚠️ 11 fail | - | - |
| format.json | 36 | ✅ | 44.3M | ✅ | 27.5M | 🟢 **-38%** |
| items.json | 5 | ✅ | 17.3M | ⚠️ 8 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.0M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 51.6M | ⚠️ 10 fail | - | - |
| oneOf.json | 4 | ✅ | 56.7M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 20.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.2M | ⚠️ 7 fail | - | - |
| properties.json | 1 | ✅ | 59.3M | ⚠️ 10 fail | - | - |
| required.json | 1 | ✅ | 70.9M | ⚠️ 6 fail | - | - |
| type.json | 79 | ✅ | 57.8M | ✅ | 66K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.3M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.1M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 27.0M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.0M | ✅ | 24.5M | 🟢 **-62%** |

### draft6

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 68.8M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 56.9M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 58.0M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 60.9M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 54.1M | ✅ | 142K | 🟢 **-100%** |
| const.json | 35 | ✅ | 51.1M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.2M | ⚠️ 9 fail | - | - |
| default.json | 7 | ✅ | 49.1M | ✅ | 390K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 76.4M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 33.3M | ⚠️ 11 fail | - | - |
| format.json | 54 | ✅ | 46.1M | ✅ | 26.5M | 🟢 **-42%** |
| items.json | 7 | ✅ | 22.0M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 49.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 50.8M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 56.8M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 30.4M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.3M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 76.2M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 51.7M | ✅ | 69K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.9M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.8M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.4M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 66.6M | ✅ | 26.7M | 🟢 **-60%** |

### draft7

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 38.7M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 48.8M | ⚠️ 5 fail | - | - |
| allOf.json | 11 | ✅ | 56.2M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 34.5M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 54.3M | ✅ | 136K | 🟢 **-100%** |
| const.json | 35 | ✅ | 60.7M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 64.4M | ⚠️ 10 fail | - | - |
| default.json | 7 | ✅ | 46.9M | ✅ | 369K | 🟢 **-99%** |
| dependencies.json | 3 | ✅ | 73.6M | ⚠️ 15 fail | - | - |
| enum.json | 28 | ✅ | 32.3M | ⚠️ 11 fail | - | - |
| format.json | 102 | ✅ | 43.9M | ✅ | 21.5M | 🟢 **-51%** |
| items.json | 7 | ✅ | 21.7M | ⚠️ 10 fail | - | - |
| multipleOf.json | 2 | ✅ | 53.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 49.6M | ⚠️ 28 fail | - | - |
| oneOf.json | 8 | ✅ | 54.9M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 22.8M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.3M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 59.4M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 73.0M | ⚠️ 5 fail | - | - |
| required.json | 2 | ✅ | 73.0M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 54.4M | ✅ | 68K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 62.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 5 | ✅ | 52.7M | ⚠️ 4 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 21.8M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 65.3M | ✅ | 28.0M | 🟢 **-57%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 69.6M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 2 | ✅ | 54.5M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 60.0M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 60.5M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 54.3M | ✅ | 136K | 🟢 **-100%** |
| const.json | 35 | ✅ | 39.6M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 67.3M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 65.5M | ✅ | 24.6M | 🟢 **-62%** |
| default.json | 7 | ✅ | 46.6M | ✅ | 381K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 31.2M | ⚠️ 11 fail | - | - |
| format.json | 114 | ✅ | 66.4M | ✅ | 25.6M | 🟢 **-61%** |
| items.json | 7 | ✅ | 21.6M | ⚠️ 6 fail | - | - |
| maxContains.json | 2 | ✅ | 76.4M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 73.7M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 55.3M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 53.1M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 56.5M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 20.6M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.5M | ⚠️ 10 fail | - | - |
| properties.json | 1 | ✅ | 61.6M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 76.3M | ⚠️ 5 fail | - | - |
| recursiveRef.json | 5 | ✅ | 2.9M | ⚠️ 14 fail | - | - |
| ref.json | 7 | ✅ | 54.4M | ⚠️ 54 fail | - | - |
| required.json | 2 | ✅ | 76.5M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 57.1M | ✅ | 70K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 63.6M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 62.9M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 56.9M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 76.6M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 28.4M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 67.0M | ✅ | 27.4M | 🟢 **-59%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | zod | zod ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 2 | ✅ | 47.2M | ⚠️ 9 fail | - | - |
| allOf.json | 11 | ✅ | 57.3M | ⚠️ 15 fail | - | - |
| anyOf.json | 7 | ✅ | 58.9M | ⚠️ 3 fail | - | - |
| boolean_schema.json | 18 | ✅ | 53.4M | ✅ | 178K | 🟢 **-100%** |
| const.json | 35 | ✅ | 58.9M | ⚠️ 7 fail | - | - |
| contains.json | 1 | ✅ | 62.0M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 63.9M | ✅ | 27.0M | 🟢 **-58%** |
| default.json | 7 | ✅ | 46.3M | ✅ | 380K | 🟢 **-99%** |
| enum.json | 28 | ✅ | 32.2M | ⚠️ 11 fail | - | - |
| format.json | 133 | ✅ | 66.8M | ✅ | 26.3M | 🟢 **-61%** |
| items.json | 6 | ✅ | 18.4M | ⚠️ 8 fail | - | - |
| maxContains.json | 2 | ✅ | 69.3M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 68.3M | ⚠️ 14 fail | - | - |
| multipleOf.json | 2 | ✅ | 51.1M | ⚠️ 3 fail | - | - |
| not.json | 9 | ✅ | 47.8M | ⚠️ 30 fail | - | - |
| oneOf.json | 8 | ✅ | 54.8M | ⚠️ 9 fail | - | - |
| pattern.json | 1 | ✅ | 22.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 17.0M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 60.5M | ⚠️ 2 fail | - | - |
| properties.json | 1 | ✅ | 57.2M | ⚠️ 12 fail | - | - |
| propertyNames.json | 2 | ✅ | 69.4M | ⚠️ 5 fail | - | - |
| ref.json | 7 | ✅ | 51.8M | ⚠️ 52 fail | - | - |
| required.json | 2 | ✅ | 66.4M | ⚠️ 6 fail | - | - |
| type.json | 80 | ✅ | 57.4M | ✅ | 67K | 🟢 **-100%** |
| uniqueItems.json | 23 | ✅ | 61.1M | ⚠️ 19 fail | - | - |
| vocabulary.json | 2 | ✅ | 57.8M | ⚠️ 1 fail | - | - |
| optional/bignum.json | 5 | ✅ | 54.3M | ⚠️ 4 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 69.8M | ⚠️ 14 fail | - | - |
| optional/ecmascript-regex.json | 40 | ✅ | 26.8M | ⚠️ 18 fail | - | - |
| optional/format/unknown.json | 7 | ✅ | 64.6M | ✅ | 27.4M | 🟢 **-58%** |

