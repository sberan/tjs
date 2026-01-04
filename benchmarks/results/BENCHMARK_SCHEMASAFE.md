# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | schemasafe files | schemasafe tests | schemasafe ops/s | tjs vs schemasafe |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 821 | ✅ 38 | 821 | 26.5M | ⚠️ 37/38 | 783 | 20.5M | 🟢 **-23%** |
| draft6 | 48 | 1104 | ✅ 48 | 1104 | 27.6M | ⚠️ 47/48 | 1041 | 22.2M | -20% |
| draft7 | 52 | 1238 | ✅ 52 | 1238 | 24.4M | ⚠️ 50/52 | 1089 | 18.4M | 🟢 **-25%** |
| draft2019-09 | 66 | 1641 | ✅ 66 | 1641 | 22.2M | ⚠️ 62/66 | 1297 | 16.8M | 🟢 **-24%** |
| draft2020-12 | 66 | 1540 | ✅ 66 | 1540 | 16.5M | ⚠️ 62/66 | 1242 | 16.9M | +2% |
| **Total** | 270 | 6344 | ✅ 270 | 6344 | 21.9M | ⚠️ 258/270 | 5452 | 18.5M | -16% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs schemasafe**: 🟢 tjs is 2.03x faster (46 ns vs 93 ns, 6344 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 65.8M | ✅ | 54.3M | -17% |
| additionalProperties.json | 16 | ✅ | 29.1M | ✅ | 29.9M | +3% |
| allOf.json | 27 | ✅ | 48.5M | ✅ | 45.9M | -5% |
| anyOf.json | 15 | ✅ | 62.3M | ✅ | 46.7M | 🟢 **-25%** |
| default.json | 7 | ✅ | 56.7M | ✅ | 55.6M | -2% |
| dependencies.json | 29 | ✅ | 32.4M | ✅ | 26.0M | -20% |
| enum.json | 49 | ✅ | 41.5M | ✅ | 52.8M | 🔴 **+27%** |
| format.json | 36 | ✅ | 52.2M | ✅ | 113.5M | 🔴 **+118%** |
| infinite-loop-detection.json | 2 | ✅ | 44.7M | ✅ | 24.9M | 🟢 **-44%** |
| items.json | 21 | ✅ | 28.0M | ✅ | 13.6M | 🟢 **-51%** |
| maxItems.json | 4 | ✅ | 77.8M | ✅ | 87.6M | +12% |
| maxLength.json | 5 | ✅ | 58.8M | ✅ | 46.5M | 🟢 **-21%** |
| maxProperties.json | 8 | ✅ | 55.8M | ✅ | 61.1M | +10% |
| maximum.json | 14 | ✅ | 73.0M | ✅ | 88.9M | 🔴 **+22%** |
| minItems.json | 4 | ✅ | 77.4M | ✅ | 86.5M | +12% |
| minLength.json | 5 | ✅ | 57.5M | ✅ | 36.4M | 🟢 **-37%** |
| minProperties.json | 6 | ✅ | 59.2M | ✅ | 68.9M | +16% |
| minimum.json | 17 | ✅ | 73.6M | ✅ | 91.0M | 🔴 **+24%** |
| multipleOf.json | 10 | ✅ | 67.2M | ✅ | 8.6M | 🟢 **-87%** |
| not.json | 20 | ✅ | 72.7M | ✅ | 59.7M | -18% |
| oneOf.json | 23 | ✅ | 58.4M | ✅ | 33.1M | 🟢 **-43%** |
| pattern.json | 9 | ✅ | 53.5M | ✅ | 70.3M | 🔴 **+31%** |
| patternProperties.json | 18 | ✅ | 16.7M | ✅ | 13.7M | -18% |
| properties.json | 24 | ✅ | 27.2M | ✅ | 18.5M | 🟢 **-32%** |
| ref.json | 38 | ✅ | 30.2M | ⚠️ 5 fail | - | - |
| required.json | 15 | ✅ | 36.3M | ✅ | 40.4M | +11% |
| type.json | 79 | ✅ | 78.2M | ✅ | 55.3M | 🟢 **-29%** |
| uniqueItems.json | 69 | ✅ | 25.5M | ✅ | 14.8M | 🟢 **-42%** |
| optional/bignum.json | 9 | ✅ | 68.1M | ✅ | 79.0M | +16% |
| optional/ecmascript-regex.json | 74 | ✅ | 16.6M | ✅ | 16.9M | +1% |
| optional/float-overflow.json | 1 | ✅ | 21.4M | ✅ | 16.0M | 🟢 **-25%** |
| optional/format/date-time.json | 26 | ✅ | 24.8M | ✅ | 9.1M | 🟢 **-63%** |
| optional/format/email.json | 17 | ✅ | 18.9M | ✅ | 13.2M | 🟢 **-30%** |
| optional/format/ipv4.json | 16 | ✅ | 42.5M | ✅ | 34.0M | 🟢 **-20%** |
| optional/format/ipv6.json | 40 | ✅ | 12.1M | ✅ | 16.0M | 🔴 **+32%** |
| optional/format/uri.json | 36 | ✅ | 6.5M | ✅ | 4.8M | 🟢 **-27%** |
| optional/id.json | 3 | ✅ | 37.3M | ✅ | 25.5M | 🟢 **-32%** |
| optional/non-bmp-regex.json | 12 | ✅ | 23.2M | ✅ | 16.3M | 🟢 **-30%** |

### draft6

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 32.1M | ✅ | 47.2M | 🔴 **+47%** |
| additionalProperties.json | 16 | ✅ | 30.3M | ✅ | 27.5M | -9% |
| allOf.json | 30 | ✅ | 44.9M | ✅ | 44.9M | 0% |
| anyOf.json | 18 | ✅ | 59.7M | ✅ | 43.3M | 🟢 **-28%** |
| boolean_schema.json | 18 | ✅ | 58.4M | ✅ | 78.4M | 🔴 **+34%** |
| const.json | 54 | ✅ | 64.3M | ✅ | 35.9M | 🟢 **-44%** |
| contains.json | 19 | ✅ | 54.5M | ✅ | 16.3M | 🟢 **-70%** |
| default.json | 7 | ✅ | 46.7M | ✅ | 51.7M | +11% |
| dependencies.json | 36 | ✅ | 31.3M | ✅ | 27.6M | -12% |
| enum.json | 45 | ✅ | 41.4M | ✅ | 54.9M | 🔴 **+33%** |
| exclusiveMaximum.json | 4 | ✅ | 67.2M | ✅ | 65.5M | -3% |
| exclusiveMinimum.json | 4 | ✅ | 60.1M | ✅ | 31.1M | 🟢 **-48%** |
| format.json | 54 | ✅ | 68.8M | ✅ | 116.7M | 🔴 **+70%** |
| infinite-loop-detection.json | 2 | ✅ | 34.3M | ✅ | 23.7M | 🟢 **-31%** |
| items.json | 28 | ✅ | 27.9M | ✅ | 16.5M | 🟢 **-41%** |
| maxItems.json | 6 | ✅ | 62.5M | ✅ | 68.6M | +10% |
| maxLength.json | 7 | ✅ | 56.2M | ✅ | 40.9M | 🟢 **-27%** |
| maxProperties.json | 10 | ✅ | 51.4M | ✅ | 48.5M | -6% |
| maximum.json | 8 | ✅ | 67.1M | ✅ | 77.5M | +15% |
| minItems.json | 6 | ✅ | 65.8M | ✅ | 73.1M | +11% |
| minLength.json | 7 | ✅ | 52.9M | ✅ | 35.8M | 🟢 **-32%** |
| minProperties.json | 8 | ✅ | 53.6M | ✅ | 57.1M | +6% |
| minimum.json | 11 | ✅ | 69.3M | ✅ | 83.4M | 🔴 **+20%** |
| multipleOf.json | 10 | ✅ | 62.2M | ✅ | 10.7M | 🟢 **-83%** |
| not.json | 38 | ✅ | 71.4M | ✅ | 62.5M | -12% |
| oneOf.json | 27 | ✅ | 57.4M | ✅ | 30.9M | 🟢 **-46%** |
| pattern.json | 9 | ✅ | 45.9M | ✅ | 68.0M | 🔴 **+48%** |
| patternProperties.json | 23 | ✅ | 15.9M | ✅ | 15.3M | -4% |
| properties.json | 28 | ✅ | 23.4M | ✅ | 19.7M | -16% |
| propertyNames.json | 20 | ✅ | 29.6M | ✅ | 26.6M | -10% |
| ref.json | 63 | ✅ | 28.9M | ⚠️ 5 fail | - | - |
| required.json | 16 | ✅ | 34.6M | ✅ | 40.5M | +17% |
| type.json | 80 | ✅ | 56.4M | ✅ | 59.4M | +5% |
| uniqueItems.json | 69 | ✅ | 23.2M | ✅ | 13.9M | 🟢 **-40%** |
| optional/bignum.json | 9 | ✅ | 59.4M | ✅ | 70.2M | +18% |
| optional/ecmascript-regex.json | 74 | ✅ | 17.8M | ✅ | 18.4M | +3% |
| optional/float-overflow.json | 1 | ✅ | 11.5M | ✅ | 11.8M | +3% |
| optional/format/date-time.json | 26 | ✅ | 27.4M | ✅ | 8.5M | 🟢 **-69%** |
| optional/format/email.json | 17 | ✅ | 18.4M | ✅ | 11.8M | 🟢 **-36%** |
| optional/format/ipv4.json | 16 | ✅ | 37.4M | ✅ | 30.0M | -20% |
| optional/format/ipv6.json | 40 | ✅ | 12.5M | ✅ | 16.8M | 🔴 **+34%** |
| optional/format/json-pointer.json | 38 | ✅ | 31.2M | ✅ | 31.9M | +2% |
| optional/format/uri-reference.json | 15 | ✅ | 10.2M | ✅ | 8.7M | -14% |
| optional/format/uri-template.json | 10 | ✅ | 18.3M | ✅ | 20.1M | +10% |
| optional/format/uri.json | 36 | ✅ | 7.0M | ✅ | 5.2M | 🟢 **-25%** |
| optional/id.json | 7 | ✅ | 39.8M | ✅ | 16.2M | 🟢 **-59%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.7M | ✅ | 17.4M | 🟢 **-23%** |
| optional/unknownKeyword.json | 3 | ✅ | 11.0M | ✅ | 20.1M | 🔴 **+83%** |

### draft7

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 27.5M | ✅ | 49.2M | 🔴 **+79%** |
| additionalProperties.json | 16 | ✅ | 29.7M | ✅ | 28.8M | -3% |
| allOf.json | 30 | ✅ | 45.5M | ✅ | 47.1M | +3% |
| anyOf.json | 18 | ✅ | 55.6M | ✅ | 50.5M | -9% |
| boolean_schema.json | 18 | ✅ | 55.2M | ✅ | 70.8M | 🔴 **+28%** |
| const.json | 54 | ✅ | 55.6M | ✅ | 33.9M | 🟢 **-39%** |
| contains.json | 21 | ✅ | 49.9M | ✅ | 18.5M | 🟢 **-63%** |
| default.json | 7 | ✅ | 48.7M | ✅ | 55.1M | +13% |
| dependencies.json | 36 | ✅ | 31.4M | ✅ | 28.9M | -8% |
| enum.json | 45 | ✅ | 37.9M | ✅ | 57.3M | 🔴 **+51%** |
| exclusiveMaximum.json | 4 | ✅ | 66.6M | ✅ | 70.9M | +6% |
| exclusiveMinimum.json | 4 | ✅ | 55.5M | ✅ | 70.3M | 🔴 **+27%** |
| format.json | 78 | ✅ | 45.8M | ⚠️ 24 fail | - | - |
| if-then-else.json | 26 | ✅ | 52.9M | ✅ | 74.0M | 🔴 **+40%** |
| infinite-loop-detection.json | 2 | ✅ | 36.0M | ✅ | 25.0M | 🟢 **-30%** |
| items.json | 28 | ✅ | 28.1M | ✅ | 15.2M | 🟢 **-46%** |
| maxItems.json | 6 | ✅ | 60.1M | ✅ | 82.0M | 🔴 **+36%** |
| maxLength.json | 7 | ✅ | 50.0M | ✅ | 43.3M | -13% |
| maxProperties.json | 10 | ✅ | 47.7M | ✅ | 56.7M | +19% |
| maximum.json | 8 | ✅ | 61.0M | ✅ | 89.3M | 🔴 **+47%** |
| minItems.json | 6 | ✅ | 60.2M | ✅ | 80.1M | 🔴 **+33%** |
| minLength.json | 7 | ✅ | 49.4M | ✅ | 39.6M | -20% |
| minProperties.json | 8 | ✅ | 48.9M | ✅ | 61.5M | 🔴 **+26%** |
| minimum.json | 11 | ✅ | 61.6M | ✅ | 91.1M | 🔴 **+48%** |
| multipleOf.json | 10 | ✅ | 57.4M | ✅ | 8.6M | 🟢 **-85%** |
| not.json | 38 | ✅ | 65.3M | ✅ | 62.5M | -4% |
| oneOf.json | 27 | ✅ | 51.4M | ✅ | 34.1M | 🟢 **-34%** |
| pattern.json | 9 | ✅ | 43.6M | ✅ | 70.8M | 🔴 **+63%** |
| patternProperties.json | 23 | ✅ | 16.4M | ✅ | 16.0M | -2% |
| properties.json | 28 | ✅ | 26.4M | ✅ | 19.5M | 🟢 **-26%** |
| propertyNames.json | 20 | ✅ | 28.3M | ✅ | 28.1M | -1% |
| ref.json | 71 | ✅ | 21.4M | ⚠️ 5 fail | - | - |
| required.json | 16 | ✅ | 36.4M | ✅ | 44.9M | 🔴 **+23%** |
| type.json | 80 | ✅ | 52.2M | ✅ | 62.4M | +20% |
| uniqueItems.json | 69 | ✅ | 24.2M | ✅ | 14.5M | 🟢 **-40%** |
| optional/bignum.json | 9 | ✅ | 58.0M | ✅ | 82.9M | 🔴 **+43%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.9M | ✅ | 18.5M | +9% |
| optional/float-overflow.json | 1 | ✅ | 15.5M | ✅ | 16.0M | +3% |
| optional/format/date-time.json | 26 | ✅ | 23.1M | ✅ | 8.8M | 🟢 **-62%** |
| optional/format/date.json | 48 | ✅ | 8.5M | ✅ | 21.6M | 🔴 **+155%** |
| optional/format/email.json | 17 | ✅ | 18.2M | ✅ | 13.1M | 🟢 **-28%** |
| optional/format/ipv4.json | 16 | ✅ | 39.8M | ✅ | 34.6M | -13% |
| optional/format/ipv6.json | 40 | ✅ | 11.7M | ✅ | 15.9M | 🔴 **+35%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.9M | ✅ | 30.8M | +3% |
| optional/format/regex.json | 8 | ✅ | 61.1M | ✅ | 851K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 32.6M | ✅ | 40.5M | 🔴 **+24%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.4M | ✅ | 7.6M | -18% |
| optional/format/uri-template.json | 10 | ✅ | 16.5M | ✅ | 18.5M | +12% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.7M | 🟢 **-26%** |
| optional/id.json | 7 | ✅ | 43.6M | ✅ | 25.8M | 🟢 **-41%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.1M | ✅ | 17.3M | 🟢 **-22%** |
| optional/unknownKeyword.json | 3 | ✅ | 12.3M | ✅ | 22.9M | 🔴 **+85%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 43.2M | ✅ | 44.6M | +3% |
| additionalProperties.json | 21 | ✅ | 23.2M | ✅ | 18.3M | 🟢 **-21%** |
| allOf.json | 30 | ✅ | 42.0M | ✅ | 39.9M | -5% |
| anchor.json | 8 | ✅ | 38.6M | ✅ | 21.7M | 🟢 **-44%** |
| anyOf.json | 18 | ✅ | 49.4M | ✅ | 37.9M | 🟢 **-23%** |
| boolean_schema.json | 18 | ✅ | 51.0M | ✅ | 60.8M | +19% |
| const.json | 54 | ✅ | 58.5M | ✅ | 28.8M | 🟢 **-51%** |
| contains.json | 21 | ✅ | 50.1M | ✅ | 12.9M | 🟢 **-74%** |
| content.json | 18 | ✅ | 65.1M | ✅ | 115.2M | 🔴 **+77%** |
| default.json | 7 | ✅ | 43.7M | ✅ | 52.3M | +20% |
| dependentRequired.json | 20 | ✅ | 34.7M | ✅ | 42.6M | 🔴 **+23%** |
| dependentSchemas.json | 20 | ✅ | 37.0M | ✅ | 32.3M | -13% |
| enum.json | 45 | ✅ | 39.4M | ✅ | 50.0M | 🔴 **+27%** |
| exclusiveMaximum.json | 4 | ✅ | 61.4M | ✅ | 56.3M | -8% |
| exclusiveMinimum.json | 4 | ✅ | 55.5M | ✅ | 57.9M | +4% |
| format.json | 90 | ✅ | 69.4M | ⚠️ 24 fail | - | - |
| if-then-else.json | 26 | ✅ | 54.1M | ✅ | 66.0M | 🔴 **+22%** |
| infinite-loop-detection.json | 2 | ✅ | 32.1M | ✅ | 21.8M | 🟢 **-32%** |
| items.json | 28 | ✅ | 26.7M | ✅ | 15.1M | 🟢 **-43%** |
| maxContains.json | 12 | ✅ | 61.2M | ✅ | 17.7M | 🟢 **-71%** |
| maxItems.json | 6 | ✅ | 60.4M | ✅ | 62.4M | +3% |
| maxLength.json | 7 | ✅ | 51.9M | ✅ | 37.7M | 🟢 **-27%** |
| maxProperties.json | 10 | ✅ | 45.8M | ✅ | 43.9M | -4% |
| maximum.json | 8 | ✅ | 62.0M | ✅ | 70.2M | +13% |
| minContains.json | 28 | ✅ | 55.6M | ✅ | 18.1M | 🟢 **-67%** |
| minItems.json | 6 | ✅ | 60.2M | ✅ | 65.2M | +8% |
| minLength.json | 7 | ✅ | 50.9M | ✅ | 35.0M | 🟢 **-31%** |
| minProperties.json | 8 | ✅ | 49.2M | ✅ | 50.4M | +2% |
| minimum.json | 11 | ✅ | 63.1M | ✅ | 76.5M | 🔴 **+21%** |
| multipleOf.json | 10 | ✅ | 56.2M | ✅ | 10.5M | 🟢 **-81%** |
| not.json | 40 | ✅ | 57.9M | ✅ | 39.3M | 🟢 **-32%** |
| oneOf.json | 27 | ✅ | 52.2M | ✅ | 26.0M | 🟢 **-50%** |
| pattern.json | 9 | ✅ | 44.7M | ✅ | 65.3M | 🔴 **+46%** |
| patternProperties.json | 23 | ✅ | 14.6M | ✅ | 13.4M | -8% |
| properties.json | 28 | ✅ | 22.8M | ✅ | 18.7M | -18% |
| propertyNames.json | 20 | ✅ | 28.0M | ✅ | 24.6M | -12% |
| recursiveRef.json | 34 | ✅ | 4.9M | ✅ | 6.5M | 🔴 **+33%** |
| ref.json | 79 | ✅ | 20.1M | ⚠️ 2 fail | - | - |
| required.json | 16 | ✅ | 27.3M | ✅ | 39.1M | 🔴 **+43%** |
| type.json | 80 | ✅ | 63.9M | ✅ | 50.9M | 🟢 **-20%** |
| unevaluatedItems.json | 54 | ✅ | 18.8M | ⚠️ 2 fail | - | - |
| unevaluatedProperties.json | 121 | ✅ | 12.6M | ⚠️ 2 fail | - | - |
| uniqueItems.json | 69 | ✅ | 22.9M | ✅ | 12.6M | 🟢 **-45%** |
| optional/anchor.json | 4 | ✅ | 52.4M | ✅ | 14.4M | 🟢 **-72%** |
| optional/bignum.json | 9 | ✅ | 54.9M | ✅ | 67.6M | 🔴 **+23%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 37.5M | ✅ | 39.1M | +4% |
| optional/ecmascript-regex.json | 74 | ✅ | 18.1M | ✅ | 17.4M | -4% |
| optional/float-overflow.json | 1 | ✅ | 11.3M | ✅ | 11.6M | +3% |
| optional/format/date-time.json | 26 | ✅ | 24.5M | ✅ | 8.1M | 🟢 **-67%** |
| optional/format/date.json | 48 | ✅ | 9.1M | ✅ | 18.8M | 🔴 **+107%** |
| optional/format/duration.json | 26 | ✅ | 39.4M | ✅ | 11.7M | 🟢 **-70%** |
| optional/format/email.json | 17 | ✅ | 18.2M | ✅ | 10.9M | 🟢 **-40%** |
| optional/format/ipv4.json | 16 | ✅ | 35.0M | ✅ | 30.0M | -14% |
| optional/format/ipv6.json | 40 | ✅ | 12.5M | ✅ | 16.0M | 🔴 **+28%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.2M | ✅ | 29.7M | -2% |
| optional/format/regex.json | 8 | ✅ | 63.2M | ✅ | 823K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 33.8M | ✅ | 33.7M | 0% |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 8.6M | -10% |
| optional/format/uri-template.json | 10 | ✅ | 17.8M | ✅ | 20.4M | +15% |
| optional/format/uri.json | 36 | ✅ | 7.0M | ✅ | 5.1M | 🟢 **-27%** |
| optional/format/uuid.json | 22 | ✅ | 15.9M | ✅ | 15.0M | -5% |
| optional/id.json | 3 | ✅ | 23.6M | ✅ | 15.0M | 🟢 **-36%** |
| optional/no-schema.json | 3 | ✅ | 56.4M | ✅ | 51.3M | -9% |
| optional/non-bmp-regex.json | 12 | ✅ | 20.3M | ✅ | 16.2M | 🟢 **-20%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 39.0M | ✅ | 22.0M | 🟢 **-44%** |
| optional/unknownKeyword.json | 3 | ✅ | 8.6M | ✅ | 14.7M | 🔴 **+70%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 31.8M | ✅ | 23.4M | 🟢 **-26%** |
| allOf.json | 30 | ✅ | 55.2M | ✅ | 45.1M | -18% |
| anchor.json | 8 | ✅ | 62.2M | ✅ | 27.8M | 🟢 **-55%** |
| anyOf.json | 18 | ✅ | 59.2M | ✅ | 45.7M | 🟢 **-23%** |
| boolean_schema.json | 18 | ✅ | 68.1M | ✅ | 77.7M | +14% |
| const.json | 54 | ✅ | 66.0M | ✅ | 34.9M | 🟢 **-47%** |
| contains.json | 21 | ✅ | 62.8M | ✅ | 18.8M | 🟢 **-70%** |
| content.json | 18 | ✅ | 84.2M | ✅ | 123.0M | 🔴 **+46%** |
| default.json | 7 | ✅ | 57.2M | ✅ | 52.2M | -9% |
| dependentRequired.json | 20 | ✅ | 40.3M | ✅ | 47.2M | +17% |
| dependentSchemas.json | 20 | ✅ | 44.5M | ✅ | 35.3M | 🟢 **-21%** |
| dynamicRef.json | 29 | ✅ | 8.6M | ⚠️ 14 fail | - | - |
| enum.json | 45 | ✅ | 43.6M | ✅ | 56.0M | 🔴 **+28%** |
| exclusiveMaximum.json | 4 | ✅ | 69.6M | ✅ | 70.4M | +1% |
| exclusiveMinimum.json | 4 | ✅ | 69.3M | ✅ | 69.8M | +1% |
| if-then-else.json | 26 | ✅ | 75.1M | ✅ | 76.3M | +2% |
| infinite-loop-detection.json | 2 | ✅ | 40.0M | ✅ | 23.3M | 🟢 **-42%** |
| items.json | 29 | ✅ | 29.8M | ✅ | 14.7M | 🟢 **-51%** |
| maxContains.json | 12 | ✅ | 62.8M | ✅ | 24.3M | 🟢 **-61%** |
| maxItems.json | 6 | ✅ | 70.6M | ✅ | 80.1M | +14% |
| maxLength.json | 7 | ✅ | 56.5M | ✅ | 42.7M | 🟢 **-24%** |
| maxProperties.json | 10 | ✅ | 54.3M | ✅ | 57.6M | +6% |
| maximum.json | 8 | ✅ | 72.3M | ✅ | 87.4M | 🔴 **+21%** |
| minContains.json | 28 | ✅ | 79.0M | ✅ | 23.8M | 🟢 **-70%** |
| minItems.json | 6 | ✅ | 70.5M | ✅ | 80.9M | +15% |
| minLength.json | 7 | ✅ | 53.9M | ✅ | 39.4M | 🟢 **-27%** |
| minProperties.json | 8 | ✅ | 56.7M | ✅ | 59.3M | +5% |
| minimum.json | 11 | ✅ | 73.0M | ✅ | 88.4M | 🔴 **+21%** |
| multipleOf.json | 10 | ✅ | 67.1M | ✅ | 8.7M | 🟢 **-87%** |
| not.json | 40 | ✅ | 68.2M | ✅ | 50.6M | 🟢 **-26%** |
| oneOf.json | 27 | ✅ | 52.5M | ✅ | 33.1M | 🟢 **-37%** |
| pattern.json | 9 | ✅ | 54.8M | ✅ | 67.0M | 🔴 **+22%** |
| patternProperties.json | 23 | ✅ | 17.1M | ✅ | 16.0M | -6% |
| prefixItems.json | 11 | ✅ | 68.5M | ✅ | 64.0M | -7% |
| properties.json | 28 | ✅ | 29.6M | ✅ | 19.7M | 🟢 **-33%** |
| propertyNames.json | 20 | ✅ | 30.2M | ✅ | 27.2M | -10% |
| ref.json | 77 | ✅ | 22.9M | ⚠️ 2 fail | - | - |
| required.json | 16 | ✅ | 32.8M | ✅ | 42.4M | 🔴 **+30%** |
| type.json | 80 | ✅ | 80.1M | ✅ | 64.4M | -20% |
| unevaluatedItems.json | 69 | ✅ | 18.3M | ⚠️ 2 fail | - | - |
| unevaluatedProperties.json | 123 | ✅ | 3.2M | ⚠️ 2 fail | - | - |
| uniqueItems.json | 69 | ✅ | 29.0M | ✅ | 14.7M | 🟢 **-49%** |
| optional/anchor.json | 4 | ✅ | 58.5M | ✅ | 23.3M | 🟢 **-60%** |
| optional/bignum.json | 9 | ✅ | 65.3M | ✅ | 82.1M | 🔴 **+26%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 50.7M | ✅ | 43.0M | -15% |
| optional/dynamicRef.json | 2 | ✅ | 8.3M | ✅ | 4.1M | 🟢 **-50%** |
| optional/ecmascript-regex.json | 74 | ✅ | 18.0M | ✅ | 16.5M | -8% |
| optional/float-overflow.json | 1 | ✅ | 21.1M | ✅ | 15.8M | 🟢 **-25%** |
| optional/format/date-time.json | 26 | ✅ | 24.6M | ✅ | 9.0M | 🟢 **-63%** |
| optional/format/date.json | 48 | ✅ | 9.0M | ✅ | 21.9M | 🔴 **+144%** |
| optional/format/duration.json | 26 | ✅ | 41.1M | ✅ | 13.0M | 🟢 **-68%** |
| optional/format/ecmascript-regex.json | 1 | ✅ | 59.5M | ✅ | 121K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 38.0M | ✅ | 35.3M | -7% |
| optional/format/ipv6.json | 40 | ✅ | 12.0M | ✅ | 16.4M | 🔴 **+37%** |
| optional/format/json-pointer.json | 38 | ✅ | 32.4M | ✅ | 33.9M | +5% |
| optional/format/regex.json | 8 | ✅ | 74.2M | ✅ | 847K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 35.9M | ✅ | 41.2M | +15% |
| optional/format/uri-reference.json | 15 | ✅ | 9.9M | ✅ | 7.6M | 🟢 **-24%** |
| optional/format/uri-template.json | 10 | ✅ | 16.2M | ✅ | 18.9M | +16% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.7M | 🟢 **-25%** |
| optional/format/uuid.json | 22 | ✅ | 15.7M | ✅ | 15.4M | -2% |
| optional/id.json | 3 | ✅ | 37.0M | ✅ | 23.2M | 🟢 **-37%** |
| optional/no-schema.json | 3 | ✅ | 64.7M | ✅ | 56.3M | -13% |
| optional/non-bmp-regex.json | 12 | ✅ | 22.7M | ✅ | 17.1M | 🟢 **-25%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 49.0M | ✅ | 23.2M | 🟢 **-53%** |
| optional/unknownKeyword.json | 3 | ✅ | 14.4M | ✅ | 24.0M | 🔴 **+67%** |

