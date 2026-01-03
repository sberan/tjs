# tjs vs joi Benchmarks

Performance comparison of **tjs** vs **[joi](https://joi.dev/)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | joi files | joi tests | joi ops/s | tjs vs joi |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 13 | 91 | ✅ 13 | 91 | 48.0M | ⚠️ 0/13 | 0 | - | - |
| draft6 | 17 | 112 | ✅ 17 | 112 | 52.0M | ⚠️ 0/17 | 0 | - | - |
| draft7 | 18 | 120 | ✅ 18 | 120 | 52.9M | ⚠️ 0/18 | 0 | - | - |
| draft2019-09 | 24 | 169 | ✅ 24 | 169 | 37.1M | ⚠️ 1/24 | 18 | 6.4M | 🟢 **-83%** |
| draft2020-12 | 25 | 173 | ✅ 25 | 173 | 36.6M | ⚠️ 2/25 | 22 | 3.5M | 🟢 **-90%** |
| **Total** | 97 | 665 | ✅ 97 | 665 | 42.6M | ⚠️ 3/97 | 40 | 4.4M | 🟢 **-90%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs joi**: 🟢 tjs is 25.92x faster (23 ns vs 608 ns, 665 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 80.8M | ⚠️ 5 fail | - | - |
| additionalProperties.json | 1 | ✅ | 53.0M | ⚠️ 13 fail | - | - |
| allOf.json | 4 | ✅ | 73.5M | ⚠️ 21 fail | - | - |
| anyOf.json | 2 | ✅ | 68.4M | ⚠️ 13 fail | - | - |
| enum.json | 26 | ✅ | 32.7M | ⚠️ 23 fail | - | - |
| items.json | 2 | ✅ | 86.5M | ⚠️ 11 fail | - | - |
| oneOf.json | 2 | ✅ | 70.5M | ⚠️ 21 fail | - | - |
| pattern.json | 1 | ✅ | 43.9M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 24.7M | ⚠️ 7 fail | - | - |
| ref.json | 2 | ✅ | 18.7M | ⚠️ 42 fail | - | - |
| type.json | 20 | ✅ | 52.7M | ⚠️ 59 fail | - | - |
| uniqueItems.json | 23 | ✅ | 73.9M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 2 | ✅ | 95.4M | ⚠️ 7 fail | - | - |

### draft6

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 83.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 1 | ✅ | 55.2M | ⚠️ 13 fail | - | - |
| allOf.json | 5 | ✅ | 69.4M | ⚠️ 23 fail | - | - |
| anyOf.json | 4 | ✅ | 68.1M | ⚠️ 14 fail | - | - |
| contains.json | 1 | ✅ | 90.6M | ⚠️ 9 fail | - | - |
| dependencies.json | 3 | ✅ | 90.8M | ⚠️ 17 fail | - | - |
| enum.json | 22 | ✅ | 33.7M | ⚠️ 23 fail | - | - |
| items.json | 4 | ✅ | 87.1M | ⚠️ 13 fail | - | - |
| not.json | 9 | ✅ | 73.0M | ⚠️ 29 fail | - | - |
| oneOf.json | 5 | ✅ | 57.5M | ⚠️ 22 fail | - | - |
| pattern.json | 1 | ✅ | 35.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 24.6M | ⚠️ 10 fail | - | - |
| propertyNames.json | 2 | ✅ | 96.0M | ⚠️ 5 fail | - | - |
| ref.json | 4 | ✅ | 18.5M | ⚠️ 65 fail | - | - |
| type.json | 20 | ✅ | 56.5M | ⚠️ 60 fail | - | - |
| uniqueItems.json | 23 | ✅ | 74.6M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 2 | ✅ | 91.7M | ⚠️ 7 fail | - | - |

### draft7

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 88.3M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 1 | ✅ | 55.1M | ⚠️ 13 fail | - | - |
| allOf.json | 5 | ✅ | 79.5M | ⚠️ 23 fail | - | - |
| anyOf.json | 4 | ✅ | 77.9M | ⚠️ 14 fail | - | - |
| contains.json | 1 | ✅ | 90.7M | ⚠️ 10 fail | - | - |
| dependencies.json | 3 | ✅ | 88.9M | ⚠️ 17 fail | - | - |
| enum.json | 22 | ✅ | 34.6M | ⚠️ 23 fail | - | - |
| if-then-else.json | 8 | ✅ | 78.7M | ⚠️ 8 fail | - | - |
| items.json | 4 | ✅ | 88.2M | ⚠️ 13 fail | - | - |
| not.json | 9 | ✅ | 66.5M | ⚠️ 29 fail | - | - |
| oneOf.json | 5 | ✅ | 56.2M | ⚠️ 22 fail | - | - |
| pattern.json | 1 | ✅ | 35.3M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 24.2M | ⚠️ 10 fail | - | - |
| propertyNames.json | 2 | ✅ | 74.7M | ⚠️ 5 fail | - | - |
| ref.json | 4 | ✅ | 18.1M | ⚠️ 73 fail | - | - |
| type.json | 20 | ✅ | 52.6M | ⚠️ 60 fail | - | - |
| uniqueItems.json | 23 | ✅ | 74.1M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 2 | ✅ | 94.9M | ⚠️ 7 fail | - | - |

### draft2019-09

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 5 | ✅ | 48.2M | ⚠️ 6 fail | - | - |
| additionalProperties.json | 1 | ✅ | 39.0M | ⚠️ 17 fail | - | - |
| allOf.json | 5 | ✅ | 44.7M | ⚠️ 23 fail | - | - |
| anyOf.json | 4 | ✅ | 44.0M | ⚠️ 14 fail | - | - |
| contains.json | 1 | ✅ | 49.1M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 46.4M | ✅ | 6.4M | 🟢 **-86%** |
| dependentRequired.json | 3 | ✅ | 49.4M | ⚠️ 6 fail | - | - |
| enum.json | 22 | ✅ | 25.8M | ⚠️ 23 fail | - | - |
| if-then-else.json | 8 | ✅ | 46.7M | ⚠️ 8 fail | - | - |
| items.json | 4 | ✅ | 47.8M | ⚠️ 13 fail | - | - |
| maxContains.json | 2 | ✅ | 50.5M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 48.2M | ⚠️ 14 fail | - | - |
| not.json | 9 | ✅ | 47.3M | ⚠️ 31 fail | - | - |
| oneOf.json | 5 | ✅ | 36.6M | ⚠️ 22 fail | - | - |
| pattern.json | 1 | ✅ | 29.0M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 24.0M | ⚠️ 10 fail | - | - |
| propertyNames.json | 2 | ✅ | 40.7M | ⚠️ 5 fail | - | - |
| ref.json | 4 | ✅ | 15.2M | ⚠️ 76 fail | - | - |
| type.json | 20 | ✅ | 33.0M | ⚠️ 60 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 39.2M | ⚠️ 23 fail | - | - |
| unevaluatedProperties.json | 7 | ✅ | 45.2M | ⚠️ 114 fail | - | - |
| uniqueItems.json | 23 | ✅ | 41.0M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 2 | ✅ | 50.4M | ⚠️ 7 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 49.1M | ⚠️ 14 fail | - | - |

### draft2020-12

| File | Tests | tjs | tjs ops/s | joi | joi ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 1 | ✅ | 39.3M | ⚠️ 17 fail | - | - |
| allOf.json | 5 | ✅ | 44.6M | ⚠️ 23 fail | - | - |
| anyOf.json | 4 | ✅ | 43.7M | ⚠️ 14 fail | - | - |
| contains.json | 1 | ✅ | 49.7M | ⚠️ 10 fail | - | - |
| content.json | 18 | ✅ | 46.8M | ✅ | 6.4M | 🟢 **-86%** |
| dependentRequired.json | 3 | ✅ | 49.3M | ⚠️ 6 fail | - | - |
| enum.json | 22 | ✅ | 25.9M | ⚠️ 23 fail | - | - |
| if-then-else.json | 8 | ✅ | 47.4M | ⚠️ 8 fail | - | - |
| items.json | 3 | ✅ | 50.1M | ⚠️ 15 fail | - | - |
| maxContains.json | 2 | ✅ | 51.6M | ⚠️ 6 fail | - | - |
| minContains.json | 4 | ✅ | 48.4M | ⚠️ 14 fail | - | - |
| not.json | 9 | ✅ | 47.7M | ⚠️ 31 fail | - | - |
| oneOf.json | 5 | ✅ | 36.0M | ⚠️ 22 fail | - | - |
| pattern.json | 1 | ✅ | 29.7M | ⚠️ 1 fail | - | - |
| patternProperties.json | 1 | ✅ | 21.1M | ⚠️ 10 fail | - | - |
| prefixItems.json | 2 | ✅ | 50.9M | ⚠️ 2 fail | - | - |
| propertyNames.json | 2 | ✅ | 51.4M | ⚠️ 5 fail | - | - |
| ref.json | 4 | ✅ | 16.1M | ⚠️ 74 fail | - | - |
| type.json | 20 | ✅ | 33.1M | ⚠️ 60 fail | - | - |
| unevaluatedItems.json | 15 | ✅ | 36.6M | ⚠️ 31 fail | - | - |
| unevaluatedProperties.json | 11 | ✅ | 42.8M | ⚠️ 102 fail | - | - |
| uniqueItems.json | 23 | ✅ | 40.9M | ⚠️ 19 fail | - | - |
| optional/bignum.json | 2 | ✅ | 50.4M | ⚠️ 7 fail | - | - |
| optional/dependencies-compatibility.json | 3 | ✅ | 47.4M | ⚠️ 14 fail | - | - |
| optional/format-assertion.json | 4 | ✅ | 25.0M | ✅ | 1.2M | 🟢 **-95%** |

