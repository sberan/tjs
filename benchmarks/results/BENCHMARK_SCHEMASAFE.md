# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | schemasafe files | schemasafe tests | schemasafe ops/s | tjs vs schemasafe |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 821 | ✅ 38 | 821 | 26.3M | ⚠️ 37/38 | 783 | 20.7M | 🟢 **-21%** |
| draft6 | 48 | 1104 | ✅ 48 | 1104 | 25.3M | ⚠️ 47/48 | 1041 | 22.3M | -12% |
| draft7 | 52 | 1238 | ✅ 52 | 1238 | 26.7M | ⚠️ 50/52 | 1089 | 18.6M | 🟢 **-30%** |
| draft2019-09 | 66 | 1641 | ✅ 66 | 1641 | 23.1M | ⚠️ 62/66 | 1297 | 18.5M | -20% |
| draft2020-12 | 66 | 1540 | ✅ 66 | 1540 | 23.8M | ⚠️ 62/66 | 1242 | 16.8M | 🟢 **-29%** |
| **Total** | 270 | 6344 | ✅ 270 | 6344 | 24.7M | ⚠️ 258/270 | 5452 | 19.0M | 🟢 **-23%** |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs schemasafe**: 🟢 tjs is 2.33x faster (41 ns vs 94 ns, 6344 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 34.2M | ✅ | 58.9M | 🔴 **+72%** |
| additionalProperties.json | 16 | ✅ | 31.0M | ✅ | 32.0M | +3% |
| allOf.json | 27 | ✅ | 54.4M | ✅ | 46.2M | -15% |
| anyOf.json | 15 | ✅ | 56.2M | ✅ | 45.4M | -19% |
| default.json | 7 | ✅ | 56.5M | ✅ | 54.0M | -4% |
| dependencies.json | 29 | ✅ | 31.4M | ✅ | 24.4M | 🟢 **-22%** |
| enum.json | 49 | ✅ | 40.6M | ✅ | 52.8M | 🔴 **+30%** |
| format.json | 36 | ✅ | 47.9M | ✅ | 113.5M | 🔴 **+137%** |
| infinite-loop-detection.json | 2 | ✅ | 44.1M | ✅ | 12.7M | 🟢 **-71%** |
| items.json | 21 | ✅ | 28.1M | ✅ | 12.8M | 🟢 **-54%** |
| maxItems.json | 4 | ✅ | 70.8M | ✅ | 87.9M | 🔴 **+24%** |
| maxLength.json | 5 | ✅ | 58.8M | ✅ | 45.9M | 🟢 **-22%** |
| maxProperties.json | 8 | ✅ | 55.7M | ✅ | 60.9M | +9% |
| maximum.json | 14 | ✅ | 73.1M | ✅ | 90.2M | 🔴 **+23%** |
| minItems.json | 4 | ✅ | 74.0M | ✅ | 79.8M | +8% |
| minLength.json | 5 | ✅ | 57.4M | ✅ | 35.6M | 🟢 **-38%** |
| minProperties.json | 6 | ✅ | 59.1M | ✅ | 69.2M | +17% |
| minimum.json | 17 | ✅ | 73.5M | ✅ | 92.1M | 🔴 **+25%** |
| multipleOf.json | 10 | ✅ | 67.3M | ✅ | 8.6M | 🟢 **-87%** |
| not.json | 20 | ✅ | 72.3M | ✅ | 60.3M | -17% |
| oneOf.json | 23 | ✅ | 58.3M | ✅ | 32.9M | 🟢 **-44%** |
| pattern.json | 9 | ✅ | 53.9M | ✅ | 70.1M | 🔴 **+30%** |
| patternProperties.json | 18 | ✅ | 17.1M | ✅ | 14.5M | -15% |
| properties.json | 24 | ✅ | 28.3M | ✅ | 18.1M | 🟢 **-36%** |
| ref.json | 38 | ✅ | 30.5M | ⚠️ 5 fail | - | - |
| required.json | 15 | ✅ | 37.0M | ✅ | 42.7M | +15% |
| type.json | 79 | ✅ | 82.5M | ✅ | 65.7M | 🟢 **-20%** |
| uniqueItems.json | 69 | ✅ | 26.0M | ✅ | 14.8M | 🟢 **-43%** |
| optional/bignum.json | 9 | ✅ | 68.2M | ✅ | 83.3M | 🔴 **+22%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.3M | ✅ | 17.7M | +2% |
| optional/float-overflow.json | 1 | ✅ | 21.7M | ✅ | 15.8M | 🟢 **-27%** |
| optional/format/date-time.json | 26 | ✅ | 25.5M | ✅ | 9.0M | 🟢 **-65%** |
| optional/format/email.json | 17 | ✅ | 19.0M | ✅ | 13.7M | 🟢 **-28%** |
| optional/format/ipv4.json | 16 | ✅ | 43.8M | ✅ | 35.4M | -19% |
| optional/format/ipv6.json | 40 | ✅ | 12.0M | ✅ | 16.2M | 🔴 **+35%** |
| optional/format/uri.json | 36 | ✅ | 6.1M | ✅ | 4.7M | 🟢 **-23%** |
| optional/id.json | 3 | ✅ | 37.5M | ✅ | 25.0M | 🟢 **-33%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.4M | ✅ | 17.6M | -18% |

### draft6

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 53.2M | ✅ | 27.4M | 🟢 **-48%** |
| additionalProperties.json | 16 | ✅ | 29.0M | ✅ | 24.9M | -14% |
| allOf.json | 30 | ✅ | 43.4M | ✅ | 48.3M | +11% |
| anyOf.json | 18 | ✅ | 47.4M | ✅ | 47.7M | +1% |
| boolean_schema.json | 18 | ✅ | 28.5M | ✅ | 79.7M | 🔴 **+180%** |
| const.json | 54 | ✅ | 47.4M | ✅ | 37.9M | 🟢 **-20%** |
| contains.json | 19 | ✅ | 48.6M | ✅ | 17.1M | 🟢 **-65%** |
| default.json | 7 | ✅ | 46.0M | ✅ | 54.9M | +19% |
| dependencies.json | 36 | ✅ | 27.9M | ✅ | 30.9M | +11% |
| enum.json | 45 | ✅ | 34.6M | ✅ | 56.6M | 🔴 **+64%** |
| exclusiveMaximum.json | 4 | ✅ | 54.1M | ✅ | 69.9M | 🔴 **+29%** |
| exclusiveMinimum.json | 4 | ✅ | 51.8M | ✅ | 69.5M | 🔴 **+34%** |
| format.json | 54 | ✅ | 43.8M | ✅ | 116.3M | 🔴 **+165%** |
| infinite-loop-detection.json | 2 | ✅ | 34.7M | ✅ | 24.7M | 🟢 **-29%** |
| items.json | 28 | ✅ | 27.7M | ✅ | 15.7M | 🟢 **-43%** |
| maxItems.json | 6 | ✅ | 57.4M | ✅ | 84.4M | 🔴 **+47%** |
| maxLength.json | 7 | ✅ | 48.3M | ✅ | 40.5M | -16% |
| maxProperties.json | 10 | ✅ | 46.4M | ✅ | 57.2M | 🔴 **+23%** |
| maximum.json | 8 | ✅ | 57.7M | ✅ | 91.3M | 🔴 **+58%** |
| minItems.json | 6 | ✅ | 57.6M | ✅ | 83.6M | 🔴 **+45%** |
| minLength.json | 7 | ✅ | 52.4M | ✅ | 38.7M | 🟢 **-26%** |
| minProperties.json | 8 | ✅ | 48.0M | ✅ | 60.6M | 🔴 **+26%** |
| minimum.json | 11 | ✅ | 59.1M | ✅ | 91.7M | 🔴 **+55%** |
| multipleOf.json | 10 | ✅ | 55.2M | ✅ | 8.6M | 🟢 **-84%** |
| not.json | 38 | ✅ | 52.8M | ✅ | 63.5M | 🔴 **+20%** |
| oneOf.json | 27 | ✅ | 47.9M | ✅ | 34.4M | 🟢 **-28%** |
| pattern.json | 9 | ✅ | 40.8M | ✅ | 72.1M | 🔴 **+77%** |
| patternProperties.json | 23 | ✅ | 14.3M | ✅ | 15.8M | +11% |
| properties.json | 28 | ✅ | 25.5M | ✅ | 19.7M | 🟢 **-23%** |
| propertyNames.json | 20 | ✅ | 32.3M | ✅ | 29.2M | -10% |
| ref.json | 63 | ✅ | 27.5M | ⚠️ 5 fail | - | - |
| required.json | 16 | ✅ | 30.7M | ✅ | 43.8M | 🔴 **+42%** |
| type.json | 80 | ✅ | 60.4M | ✅ | 66.7M | +10% |
| uniqueItems.json | 69 | ✅ | 24.2M | ✅ | 14.8M | 🟢 **-39%** |
| optional/bignum.json | 9 | ✅ | 55.1M | ✅ | 79.8M | 🔴 **+45%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.0M | ✅ | 18.3M | +8% |
| optional/float-overflow.json | 1 | ✅ | 14.1M | ✅ | 15.9M | +13% |
| optional/format/date-time.json | 26 | ✅ | 22.1M | ✅ | 9.0M | 🟢 **-59%** |
| optional/format/email.json | 17 | ✅ | 18.0M | ✅ | 13.0M | 🟢 **-28%** |
| optional/format/ipv4.json | 16 | ✅ | 37.2M | ✅ | 34.7M | -7% |
| optional/format/ipv6.json | 40 | ✅ | 11.6M | ✅ | 16.2M | 🔴 **+40%** |
| optional/format/json-pointer.json | 38 | ✅ | 26.9M | ✅ | 33.9M | 🔴 **+26%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.4M | ✅ | 7.7M | -18% |
| optional/format/uri-template.json | 10 | ✅ | 16.8M | ✅ | 18.5M | +10% |
| optional/format/uri.json | 36 | ✅ | 6.1M | ✅ | 4.7M | 🟢 **-22%** |
| optional/id.json | 7 | ✅ | 37.7M | ✅ | 28.1M | 🟢 **-25%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.8M | ✅ | 17.7M | 🟢 **-22%** |
| optional/unknownKeyword.json | 3 | ✅ | 11.9M | ✅ | 24.5M | 🔴 **+107%** |

### draft7

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 65.1M | ✅ | 28.0M | 🟢 **-57%** |
| additionalProperties.json | 16 | ✅ | 33.8M | ✅ | 28.7M | -15% |
| allOf.json | 30 | ✅ | 50.3M | ✅ | 47.4M | -6% |
| anyOf.json | 18 | ✅ | 59.9M | ✅ | 49.5M | -17% |
| boolean_schema.json | 18 | ✅ | 68.0M | ✅ | 84.9M | 🔴 **+25%** |
| const.json | 54 | ✅ | 68.2M | ✅ | 34.0M | 🟢 **-50%** |
| contains.json | 21 | ✅ | 63.1M | ✅ | 18.6M | 🟢 **-71%** |
| default.json | 7 | ✅ | 57.0M | ✅ | 55.6M | -2% |
| dependencies.json | 36 | ✅ | 31.3M | ✅ | 28.9M | -8% |
| enum.json | 45 | ✅ | 45.1M | ✅ | 58.6M | 🔴 **+30%** |
| exclusiveMaximum.json | 4 | ✅ | 69.7M | ✅ | 70.5M | +1% |
| exclusiveMinimum.json | 4 | ✅ | 83.4M | ✅ | 71.2M | -15% |
| format.json | 78 | ✅ | 43.6M | ⚠️ 24 fail | - | - |
| if-then-else.json | 26 | ✅ | 66.7M | ✅ | 76.7M | +15% |
| infinite-loop-detection.json | 2 | ✅ | 42.7M | ✅ | 25.3M | 🟢 **-41%** |
| items.json | 28 | ✅ | 30.7M | ✅ | 16.8M | 🟢 **-45%** |
| maxItems.json | 6 | ✅ | 70.6M | ✅ | 81.0M | +15% |
| maxLength.json | 7 | ✅ | 53.2M | ✅ | 45.4M | -15% |
| maxProperties.json | 10 | ✅ | 53.9M | ✅ | 59.0M | +9% |
| maximum.json | 8 | ✅ | 72.7M | ✅ | 91.4M | 🔴 **+26%** |
| minItems.json | 6 | ✅ | 70.4M | ✅ | 82.6M | +17% |
| minLength.json | 7 | ✅ | 54.1M | ✅ | 39.9M | 🟢 **-26%** |
| minProperties.json | 8 | ✅ | 56.5M | ✅ | 62.1M | +10% |
| minimum.json | 11 | ✅ | 72.9M | ✅ | 90.3M | 🔴 **+24%** |
| multipleOf.json | 10 | ✅ | 67.4M | ✅ | 8.6M | 🟢 **-87%** |
| not.json | 38 | ✅ | 78.1M | ✅ | 71.1M | -9% |
| oneOf.json | 27 | ✅ | 60.8M | ✅ | 34.1M | 🟢 **-44%** |
| pattern.json | 9 | ✅ | 48.0M | ✅ | 69.5M | 🔴 **+45%** |
| patternProperties.json | 23 | ✅ | 16.1M | ✅ | 16.3M | +1% |
| properties.json | 28 | ✅ | 25.3M | ✅ | 20.2M | 🟢 **-20%** |
| propertyNames.json | 20 | ✅ | 31.5M | ✅ | 29.4M | -7% |
| ref.json | 71 | ✅ | 31.6M | ⚠️ 5 fail | - | - |
| required.json | 16 | ✅ | 40.4M | ✅ | 43.4M | +7% |
| type.json | 80 | ✅ | 86.6M | ✅ | 67.8M | 🟢 **-22%** |
| uniqueItems.json | 69 | ✅ | 26.0M | ✅ | 14.7M | 🟢 **-44%** |
| optional/bignum.json | 9 | ✅ | 69.9M | ✅ | 85.7M | 🔴 **+23%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.9M | ✅ | 17.9M | +0% |
| optional/float-overflow.json | 1 | ✅ | 21.5M | ✅ | 16.0M | 🟢 **-26%** |
| optional/format/date-time.json | 26 | ✅ | 24.7M | ✅ | 9.0M | 🟢 **-64%** |
| optional/format/date.json | 48 | ✅ | 8.3M | ✅ | 21.6M | 🔴 **+161%** |
| optional/format/email.json | 17 | ✅ | 19.0M | ✅ | 13.6M | 🟢 **-28%** |
| optional/format/ipv4.json | 16 | ✅ | 37.8M | ✅ | 33.7M | -11% |
| optional/format/ipv6.json | 40 | ✅ | 12.1M | ✅ | 16.1M | 🔴 **+33%** |
| optional/format/json-pointer.json | 38 | ✅ | 32.6M | ✅ | 34.0M | +4% |
| optional/format/regex.json | 8 | ✅ | 73.2M | ✅ | 855K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 41.7M | ✅ | 40.5M | -3% |
| optional/format/uri-reference.json | 15 | ✅ | 9.6M | ✅ | 7.6M | 🟢 **-21%** |
| optional/format/uri-template.json | 10 | ✅ | 16.2M | ✅ | 18.4M | +14% |
| optional/format/uri.json | 36 | ✅ | 6.5M | ✅ | 4.7M | 🟢 **-27%** |
| optional/id.json | 7 | ✅ | 48.3M | ✅ | 26.3M | 🟢 **-46%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.4M | ✅ | 17.0M | 🟢 **-24%** |
| optional/unknownKeyword.json | 3 | ✅ | 15.7M | ✅ | 23.6M | 🔴 **+51%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 52.4M | ✅ | 51.1M | -2% |
| additionalProperties.json | 21 | ✅ | 28.1M | ✅ | 22.6M | -20% |
| allOf.json | 30 | ✅ | 51.6M | ✅ | 46.4M | -10% |
| anchor.json | 8 | ✅ | 57.5M | ✅ | 27.4M | 🟢 **-52%** |
| anyOf.json | 18 | ✅ | 55.5M | ✅ | 43.5M | 🟢 **-22%** |
| boolean_schema.json | 18 | ✅ | 58.9M | ✅ | 79.0M | 🔴 **+34%** |
| const.json | 54 | ✅ | 60.7M | ✅ | 34.1M | 🟢 **-44%** |
| contains.json | 21 | ✅ | 53.2M | ✅ | 18.4M | 🟢 **-65%** |
| content.json | 18 | ✅ | 74.5M | ✅ | 123.0M | 🔴 **+65%** |
| default.json | 7 | ✅ | 52.8M | ✅ | 52.3M | -1% |
| dependentRequired.json | 20 | ✅ | 44.1M | ✅ | 48.1M | +9% |
| dependentSchemas.json | 20 | ✅ | 47.5M | ✅ | 35.0M | 🟢 **-26%** |
| enum.json | 45 | ✅ | 40.2M | ✅ | 48.5M | 🔴 **+21%** |
| exclusiveMaximum.json | 4 | ✅ | 62.8M | ✅ | 69.5M | +11% |
| exclusiveMinimum.json | 4 | ✅ | 61.8M | ✅ | 70.4M | +14% |
| format.json | 90 | ✅ | 71.1M | ⚠️ 24 fail | - | - |
| if-then-else.json | 26 | ✅ | 62.8M | ✅ | 69.7M | +11% |
| infinite-loop-detection.json | 2 | ✅ | 37.7M | ✅ | 24.3M | 🟢 **-36%** |
| items.json | 28 | ✅ | 28.4M | ✅ | 14.8M | 🟢 **-48%** |
| maxContains.json | 12 | ✅ | 58.6M | ✅ | 24.3M | 🟢 **-59%** |
| maxItems.json | 6 | ✅ | 64.6M | ✅ | 81.9M | 🔴 **+27%** |
| maxLength.json | 7 | ✅ | 51.9M | ✅ | 45.4M | -13% |
| maxProperties.json | 10 | ✅ | 51.1M | ✅ | 55.5M | +9% |
| maximum.json | 8 | ✅ | 65.6M | ✅ | 80.1M | 🔴 **+22%** |
| minContains.json | 28 | ✅ | 60.5M | ✅ | 23.9M | 🟢 **-60%** |
| minItems.json | 6 | ✅ | 64.7M | ✅ | 78.9M | 🔴 **+22%** |
| minLength.json | 7 | ✅ | 52.3M | ✅ | 38.6M | 🟢 **-26%** |
| minProperties.json | 8 | ✅ | 52.7M | ✅ | 59.6M | +13% |
| minimum.json | 11 | ✅ | 73.5M | ✅ | 89.1M | 🔴 **+21%** |
| multipleOf.json | 10 | ✅ | 62.0M | ✅ | 8.6M | 🟢 **-86%** |
| not.json | 40 | ✅ | 63.3M | ✅ | 52.3M | -17% |
| oneOf.json | 27 | ✅ | 49.2M | ✅ | 32.7M | 🟢 **-33%** |
| pattern.json | 9 | ✅ | 43.5M | ✅ | 70.1M | 🔴 **+61%** |
| patternProperties.json | 23 | ✅ | 14.9M | ✅ | 14.4M | -3% |
| properties.json | 28 | ✅ | 28.2M | ✅ | 21.2M | 🟢 **-25%** |
| propertyNames.json | 20 | ✅ | 29.1M | ✅ | 28.4M | -2% |
| recursiveRef.json | 34 | ✅ | 5.7M | ✅ | 7.9M | 🔴 **+38%** |
| ref.json | 79 | ✅ | 18.9M | ⚠️ 2 fail | - | - |
| required.json | 16 | ✅ | 31.7M | ✅ | 42.0M | 🔴 **+33%** |
| type.json | 80 | ✅ | 67.5M | ✅ | 60.5M | -10% |
| unevaluatedItems.json | 54 | ✅ | 22.2M | ⚠️ 2 fail | - | - |
| unevaluatedProperties.json | 121 | ✅ | 13.4M | ⚠️ 2 fail | - | - |
| uniqueItems.json | 69 | ✅ | 24.5M | ✅ | 14.4M | 🟢 **-41%** |
| optional/anchor.json | 4 | ✅ | 55.8M | ✅ | 21.8M | 🟢 **-61%** |
| optional/bignum.json | 9 | ✅ | 60.5M | ✅ | 82.7M | 🔴 **+37%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 42.7M | ✅ | 42.7M | +0% |
| optional/ecmascript-regex.json | 74 | ✅ | 17.7M | ✅ | 17.7M | +0% |
| optional/float-overflow.json | 1 | ✅ | 13.3M | ✅ | 16.4M | 🔴 **+24%** |
| optional/format/date-time.json | 26 | ✅ | 25.7M | ✅ | 8.8M | 🟢 **-66%** |
| optional/format/date.json | 48 | ✅ | 8.5M | ✅ | 21.6M | 🔴 **+155%** |
| optional/format/duration.json | 26 | ✅ | 39.6M | ✅ | 12.9M | 🟢 **-67%** |
| optional/format/email.json | 17 | ✅ | 18.6M | ✅ | 14.1M | 🟢 **-24%** |
| optional/format/ipv4.json | 16 | ✅ | 41.8M | ✅ | 35.1M | -16% |
| optional/format/ipv6.json | 40 | ✅ | 12.0M | ✅ | 16.2M | 🔴 **+36%** |
| optional/format/json-pointer.json | 38 | ✅ | 31.5M | ✅ | 33.6M | +6% |
| optional/format/regex.json | 8 | ✅ | 67.0M | ✅ | 913K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 34.2M | ✅ | 38.5M | +13% |
| optional/format/uri-reference.json | 15 | ✅ | 9.4M | ✅ | 7.7M | -19% |
| optional/format/uri-template.json | 10 | ✅ | 17.6M | ✅ | 18.5M | +5% |
| optional/format/uri.json | 36 | ✅ | 6.5M | ✅ | 4.8M | 🟢 **-26%** |
| optional/format/uuid.json | 22 | ✅ | 14.1M | ✅ | 15.2M | +8% |
| optional/id.json | 3 | ✅ | 34.3M | ✅ | 23.6M | 🟢 **-31%** |
| optional/no-schema.json | 3 | ✅ | 60.2M | ✅ | 54.8M | -9% |
| optional/non-bmp-regex.json | 12 | ✅ | 20.7M | ✅ | 17.0M | -18% |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 50.1M | ✅ | 26.4M | 🟢 **-47%** |
| optional/unknownKeyword.json | 3 | ✅ | 13.2M | ✅ | 23.2M | 🔴 **+76%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 30.4M | ✅ | 15.1M | 🟢 **-50%** |
| allOf.json | 30 | ✅ | 56.0M | ✅ | 46.9M | -16% |
| anchor.json | 8 | ✅ | 58.7M | ✅ | 25.2M | 🟢 **-57%** |
| anyOf.json | 18 | ✅ | 56.8M | ✅ | 46.4M | -18% |
| boolean_schema.json | 18 | ✅ | 64.6M | ✅ | 77.8M | 🔴 **+20%** |
| const.json | 54 | ✅ | 64.2M | ✅ | 34.8M | 🟢 **-46%** |
| contains.json | 21 | ✅ | 64.0M | ✅ | 19.3M | 🟢 **-70%** |
| content.json | 18 | ✅ | 79.9M | ✅ | 118.4M | 🔴 **+48%** |
| default.json | 7 | ✅ | 53.9M | ✅ | 54.7M | +1% |
| dependentRequired.json | 20 | ✅ | 46.4M | ✅ | 49.0M | +6% |
| dependentSchemas.json | 20 | ✅ | 42.2M | ✅ | 35.5M | -16% |
| dynamicRef.json | 29 | ✅ | 8.6M | ⚠️ 14 fail | - | - |
| enum.json | 45 | ✅ | 39.9M | ✅ | 55.0M | 🔴 **+38%** |
| exclusiveMaximum.json | 4 | ✅ | 66.8M | ✅ | 70.3M | +5% |
| exclusiveMinimum.json | 4 | ✅ | 66.6M | ✅ | 70.5M | +6% |
| if-then-else.json | 26 | ✅ | 71.1M | ✅ | 77.2M | +9% |
| infinite-loop-detection.json | 2 | ✅ | 39.3M | ✅ | 23.9M | 🟢 **-39%** |
| items.json | 29 | ✅ | 29.3M | ✅ | 14.6M | 🟢 **-50%** |
| maxContains.json | 12 | ✅ | 60.3M | ✅ | 25.0M | 🟢 **-59%** |
| maxItems.json | 6 | ✅ | 67.5M | ✅ | 82.6M | 🔴 **+22%** |
| maxLength.json | 7 | ✅ | 56.3M | ✅ | 40.6M | 🟢 **-28%** |
| maxProperties.json | 10 | ✅ | 53.1M | ✅ | 58.8M | +11% |
| maximum.json | 8 | ✅ | 69.2M | ✅ | 89.4M | 🔴 **+29%** |
| minContains.json | 28 | ✅ | 75.1M | ✅ | 25.6M | 🟢 **-66%** |
| minItems.json | 6 | ✅ | 67.3M | ✅ | 82.5M | 🔴 **+23%** |
| minLength.json | 7 | ✅ | 53.6M | ✅ | 37.6M | 🟢 **-30%** |
| minProperties.json | 8 | ✅ | 54.8M | ✅ | 60.8M | +11% |
| minimum.json | 11 | ✅ | 69.6M | ✅ | 88.2M | 🔴 **+27%** |
| multipleOf.json | 10 | ✅ | 64.2M | ✅ | 8.6M | 🟢 **-87%** |
| not.json | 40 | ✅ | 67.8M | ✅ | 52.6M | 🟢 **-22%** |
| oneOf.json | 27 | ✅ | 50.2M | ✅ | 32.6M | 🟢 **-35%** |
| pattern.json | 9 | ✅ | 43.7M | ✅ | 68.7M | 🔴 **+57%** |
| patternProperties.json | 23 | ✅ | 17.4M | ✅ | 15.8M | -9% |
| prefixItems.json | 11 | ✅ | 66.7M | ✅ | 64.3M | -4% |
| properties.json | 28 | ✅ | 29.2M | ✅ | 20.0M | 🟢 **-31%** |
| propertyNames.json | 20 | ✅ | 30.5M | ✅ | 28.7M | -6% |
| ref.json | 77 | ✅ | 33.5M | ⚠️ 2 fail | - | - |
| required.json | 16 | ✅ | 40.8M | ✅ | 44.4M | +9% |
| type.json | 80 | ✅ | 56.7M | ✅ | 61.9M | +9% |
| unevaluatedItems.json | 69 | ✅ | 18.0M | ⚠️ 2 fail | - | - |
| unevaluatedProperties.json | 123 | ✅ | 13.8M | ⚠️ 2 fail | - | - |
| uniqueItems.json | 69 | ✅ | 28.4M | ✅ | 14.7M | 🟢 **-48%** |
| optional/anchor.json | 4 | ✅ | 57.3M | ✅ | 21.1M | 🟢 **-63%** |
| optional/bignum.json | 9 | ✅ | 59.7M | ✅ | 78.6M | 🔴 **+32%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 43.3M | ✅ | 44.0M | +2% |
| optional/dynamicRef.json | 2 | ✅ | 8.3M | ✅ | 2.9M | 🟢 **-66%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.3M | ✅ | 18.3M | +6% |
| optional/float-overflow.json | 1 | ✅ | 20.6M | ✅ | 15.7M | 🟢 **-24%** |
| optional/format/date-time.json | 26 | ✅ | 26.2M | ✅ | 9.0M | 🟢 **-66%** |
| optional/format/date.json | 48 | ✅ | 8.6M | ✅ | 21.8M | 🔴 **+155%** |
| optional/format/duration.json | 26 | ✅ | 40.8M | ✅ | 13.1M | 🟢 **-68%** |
| optional/format/ecmascript-regex.json | 1 | ✅ | 52.8M | ✅ | 121K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 37.2M | ✅ | 35.7M | -4% |
| optional/format/ipv6.json | 40 | ✅ | 12.0M | ✅ | 16.0M | 🔴 **+34%** |
| optional/format/json-pointer.json | 38 | ✅ | 31.7M | ✅ | 33.8M | +7% |
| optional/format/regex.json | 8 | ✅ | 69.8M | ✅ | 859K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 38.7M | ✅ | 40.2M | +4% |
| optional/format/uri-reference.json | 15 | ✅ | 9.8M | ✅ | 7.6M | 🟢 **-22%** |
| optional/format/uri-template.json | 10 | ✅ | 15.8M | ✅ | 18.1M | +14% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.7M | 🟢 **-25%** |
| optional/format/uuid.json | 22 | ✅ | 15.2M | ✅ | 15.5M | +2% |
| optional/id.json | 3 | ✅ | 36.4M | ✅ | 24.1M | 🟢 **-34%** |
| optional/no-schema.json | 3 | ✅ | 60.9M | ✅ | 53.0M | -13% |
| optional/non-bmp-regex.json | 12 | ✅ | 23.2M | ✅ | 18.0M | 🟢 **-23%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 50.7M | ✅ | 23.7M | 🟢 **-53%** |
| optional/unknownKeyword.json | 3 | ✅ | 14.0M | ✅ | 23.5M | 🔴 **+67%** |

