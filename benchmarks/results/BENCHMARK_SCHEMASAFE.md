# tjs vs schemasafe Benchmarks

Performance comparison of **tjs** vs **[@exodus/schemasafe](https://github.com/ExodusMovement/schemasafe)** using the official [JSON Schema Test Suite](https://github.com/json-schema-org/JSON-Schema-Test-Suite).

## Methodology

We only benchmark test **groups** where **both** validators pass **all** tests in that group. A file contains multiple groups (each with a schema and test cases). If either validator fails any test in a group, that entire group is excluded from benchmarking. This ensures we compare actual validation performance, not no-op functions that return early due to unsupported features. Groups where either validator fails are excluded from performance metrics but still counted for compliance.

## Summary

| Draft | Files | Tests | tjs files | tjs tests | tjs ops/s | schemasafe files | schemasafe tests | schemasafe ops/s | tjs vs schemasafe |
|-------|------:|------:|----------:|----------:|----------:|-----------:|-----------:|----------:|-----:|
| draft4 | 38 | 821 | ✅ 38 | 821 | 23.5M | ⚠️ 37/38 | 783 | 25.1M | +6% |
| draft6 | 48 | 1104 | ✅ 48 | 1104 | 25.5M | ⚠️ 47/48 | 1041 | 27.3M | +7% |
| draft7 | 52 | 1238 | ✅ 52 | 1238 | 24.7M | ⚠️ 50/52 | 1089 | 21.8M | -12% |
| draft2019-09 | 66 | 1641 | ✅ 66 | 1641 | 16.5M | ⚠️ 62/66 | 1297 | 22.3M | 🔴 **+36%** |
| draft2020-12 | 66 | 1540 | ✅ 66 | 1540 | 14.7M | ⚠️ 62/66 | 1242 | 19.9M | 🔴 **+35%** |
| **Total** | 270 | 6344 | ✅ 270 | 6344 | 19.1M | ⚠️ 258/270 | 5452 | 22.7M | +19% |

## Head-to-Head Performance

Direct comparison using only test groups where **both** validators pass **all** tests. This ensures a fair comparison by excluding groups where either validator has incomplete or incorrect implementations.

**tjs vs schemasafe**: 🟢 tjs is 1.39x faster (52 ns vs 73 ns, 6344 tests)

## Detailed Results

Only showing ops/s for files where all tests pass.

### draft4

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 17 | ✅ | 31.2M | ✅ | 78.7M | 🔴 **+152%** |
| additionalProperties.json | 16 | ✅ | 27.8M | ✅ | 58.2M | 🔴 **+109%** |
| allOf.json | 27 | ✅ | 43.0M | ✅ | 72.8M | 🔴 **+69%** |
| anyOf.json | 15 | ✅ | 51.2M | ✅ | 56.0M | +9% |
| default.json | 7 | ✅ | 47.0M | ✅ | 60.9M | 🔴 **+29%** |
| dependencies.json | 29 | ✅ | 27.6M | ✅ | 35.1M | 🔴 **+27%** |
| enum.json | 49 | ✅ | 36.6M | ✅ | 82.1M | 🔴 **+125%** |
| format.json | 36 | ✅ | 45.1M | ✅ | 115.4M | 🔴 **+156%** |
| infinite-loop-detection.json | 2 | ✅ | 34.8M | ✅ | 43.9M | 🔴 **+26%** |
| items.json | 21 | ✅ | 15.3M | ✅ | 24.1M | 🔴 **+58%** |
| maxItems.json | 4 | ✅ | 57.3M | ✅ | 112.8M | 🔴 **+97%** |
| maxLength.json | 5 | ✅ | 24.7M | ✅ | 48.8M | 🔴 **+97%** |
| maxProperties.json | 8 | ✅ | 46.2M | ✅ | 72.5M | 🔴 **+57%** |
| maximum.json | 14 | ✅ | 59.3M | ✅ | 121.0M | 🔴 **+104%** |
| minItems.json | 4 | ✅ | 55.9M | ✅ | 112.4M | 🔴 **+101%** |
| minLength.json | 5 | ✅ | 49.3M | ✅ | 43.0M | -13% |
| minProperties.json | 6 | ✅ | 49.7M | ✅ | 77.4M | 🔴 **+56%** |
| minimum.json | 17 | ✅ | 55.8M | ✅ | 122.5M | 🔴 **+120%** |
| multipleOf.json | 10 | ✅ | 61.8M | ✅ | 9.0M | 🟢 **-85%** |
| not.json | 20 | ✅ | 58.7M | ✅ | 106.3M | 🔴 **+81%** |
| oneOf.json | 23 | ✅ | 46.6M | ✅ | 43.4M | -7% |
| pattern.json | 9 | ✅ | 41.4M | ✅ | 71.1M | 🔴 **+72%** |
| patternProperties.json | 18 | ✅ | 15.9M | ✅ | 21.0M | 🔴 **+32%** |
| properties.json | 24 | ✅ | 23.6M | ✅ | 25.7M | +9% |
| ref.json | 38 | ✅ | 27.3M | ⚠️ 5 fail | - | - |
| required.json | 15 | ✅ | 27.2M | ✅ | 51.6M | 🔴 **+90%** |
| type.json | 79 | ✅ | 54.9M | ✅ | 117.5M | 🔴 **+114%** |
| uniqueItems.json | 69 | ✅ | 21.7M | ✅ | 16.1M | 🟢 **-26%** |
| optional/bignum.json | 9 | ✅ | 52.9M | ✅ | 117.8M | 🔴 **+123%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.4M | ✅ | 23.6M | 🔴 **+44%** |
| optional/float-overflow.json | 1 | ✅ | 19.4M | ✅ | 15.6M | -20% |
| optional/format/date-time.json | 26 | ✅ | 23.8M | ✅ | 9.5M | 🟢 **-60%** |
| optional/format/email.json | 17 | ✅ | 17.9M | ✅ | 13.6M | 🟢 **-24%** |
| optional/format/ipv4.json | 16 | ✅ | 38.2M | ✅ | 42.4M | +11% |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 17.7M | 🔴 **+49%** |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 5.0M | 🟢 **-22%** |
| optional/id.json | 3 | ✅ | 32.3M | ✅ | 45.1M | 🔴 **+40%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.2M | ✅ | 28.3M | 🔴 **+33%** |

### draft6

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 27.8M | ✅ | 70.8M | 🔴 **+155%** |
| additionalProperties.json | 16 | ✅ | 26.4M | ✅ | 56.4M | 🔴 **+114%** |
| allOf.json | 30 | ✅ | 44.0M | ✅ | 77.1M | 🔴 **+75%** |
| anyOf.json | 18 | ✅ | 54.6M | ✅ | 59.8M | +9% |
| boolean_schema.json | 18 | ✅ | 55.2M | ✅ | 136.4M | 🔴 **+147%** |
| const.json | 54 | ✅ | 49.9M | ✅ | 51.7M | +4% |
| contains.json | 19 | ✅ | 49.8M | ✅ | 22.8M | 🟢 **-54%** |
| default.json | 7 | ✅ | 49.0M | ✅ | 60.6M | 🔴 **+23%** |
| dependencies.json | 36 | ✅ | 28.7M | ✅ | 40.0M | 🔴 **+39%** |
| enum.json | 45 | ✅ | 36.5M | ✅ | 87.5M | 🔴 **+140%** |
| exclusiveMaximum.json | 4 | ✅ | 58.6M | ✅ | 111.3M | 🔴 **+90%** |
| exclusiveMinimum.json | 4 | ✅ | 59.3M | ✅ | 108.3M | 🔴 **+83%** |
| format.json | 54 | ✅ | 46.5M | ✅ | 94.7M | 🔴 **+104%** |
| infinite-loop-detection.json | 2 | ✅ | 36.0M | ✅ | 45.9M | 🔴 **+27%** |
| items.json | 28 | ✅ | 30.2M | ✅ | 29.9M | -1% |
| maxItems.json | 6 | ✅ | 59.5M | ✅ | 113.6M | 🔴 **+91%** |
| maxLength.json | 7 | ✅ | 55.5M | ✅ | 49.5M | -11% |
| maxProperties.json | 10 | ✅ | 45.5M | ✅ | 69.6M | 🔴 **+53%** |
| maximum.json | 8 | ✅ | 61.5M | ✅ | 115.8M | 🔴 **+88%** |
| minItems.json | 6 | ✅ | 58.9M | ✅ | 116.8M | 🔴 **+98%** |
| minLength.json | 7 | ✅ | 50.3M | ✅ | 43.9M | -13% |
| minProperties.json | 8 | ✅ | 45.1M | ✅ | 72.7M | 🔴 **+61%** |
| minimum.json | 11 | ✅ | 61.3M | ✅ | 121.7M | 🔴 **+99%** |
| multipleOf.json | 10 | ✅ | 62.8M | ✅ | 9.1M | 🟢 **-86%** |
| not.json | 38 | ✅ | 59.9M | ✅ | 104.2M | 🔴 **+74%** |
| oneOf.json | 27 | ✅ | 43.8M | ✅ | 46.4M | +6% |
| pattern.json | 9 | ✅ | 41.4M | ✅ | 71.6M | 🔴 **+73%** |
| patternProperties.json | 23 | ✅ | 15.4M | ✅ | 24.3M | 🔴 **+58%** |
| properties.json | 28 | ✅ | 23.3M | ✅ | 27.3M | +17% |
| propertyNames.json | 20 | ✅ | 29.1M | ✅ | 46.6M | 🔴 **+61%** |
| ref.json | 63 | ✅ | 22.2M | ⚠️ 5 fail | - | - |
| required.json | 16 | ✅ | 33.7M | ✅ | 53.8M | 🔴 **+60%** |
| type.json | 80 | ✅ | 51.8M | ✅ | 129.8M | 🔴 **+151%** |
| uniqueItems.json | 69 | ✅ | 24.3M | ✅ | 15.9M | 🟢 **-35%** |
| optional/bignum.json | 9 | ✅ | 57.4M | ✅ | 116.7M | 🔴 **+103%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.0M | ✅ | 24.1M | 🔴 **+42%** |
| optional/float-overflow.json | 1 | ✅ | 19.6M | ✅ | 17.3M | -12% |
| optional/format/date-time.json | 26 | ✅ | 23.4M | ✅ | 9.2M | 🟢 **-61%** |
| optional/format/email.json | 17 | ✅ | 18.1M | ✅ | 14.6M | -20% |
| optional/format/ipv4.json | 16 | ✅ | 39.6M | ✅ | 42.3M | +7% |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 17.7M | 🔴 **+50%** |
| optional/format/json-pointer.json | 38 | ✅ | 30.3M | ✅ | 39.3M | 🔴 **+30%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.8M | ✅ | 8.3M | -15% |
| optional/format/uri-template.json | 10 | ✅ | 16.7M | ✅ | 18.2M | +9% |
| optional/format/uri.json | 36 | ✅ | 6.3M | ✅ | 4.9M | 🟢 **-23%** |
| optional/id.json | 7 | ✅ | 39.9M | ✅ | 49.5M | 🔴 **+24%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.7M | ✅ | 28.3M | 🔴 **+30%** |
| optional/unknownKeyword.json | 3 | ✅ | 15.3M | ✅ | 134.1M | 🔴 **+776%** |

### draft7

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 46.3M | ✅ | 67.5M | 🔴 **+46%** |
| additionalProperties.json | 16 | ✅ | 28.7M | ✅ | 57.4M | 🔴 **+100%** |
| allOf.json | 30 | ✅ | 41.7M | ✅ | 75.8M | 🔴 **+82%** |
| anyOf.json | 18 | ✅ | 55.6M | ✅ | 61.8M | +11% |
| boolean_schema.json | 18 | ✅ | 64.6M | ✅ | 127.1M | 🔴 **+97%** |
| const.json | 54 | ✅ | 50.6M | ✅ | 51.3M | +1% |
| contains.json | 21 | ✅ | 51.4M | ✅ | 24.2M | 🟢 **-53%** |
| default.json | 7 | ✅ | 37.5M | ✅ | 59.5M | 🔴 **+59%** |
| dependencies.json | 36 | ✅ | 30.5M | ✅ | 39.9M | 🔴 **+31%** |
| enum.json | 45 | ✅ | 37.2M | ✅ | 88.3M | 🔴 **+138%** |
| exclusiveMaximum.json | 4 | ✅ | 54.6M | ✅ | 112.3M | 🔴 **+106%** |
| exclusiveMinimum.json | 4 | ✅ | 59.8M | ✅ | 108.6M | 🔴 **+82%** |
| format.json | 78 | ✅ | 45.5M | ⚠️ 24 fail | - | - |
| if-then-else.json | 26 | ✅ | 55.3M | ✅ | 103.6M | 🔴 **+87%** |
| infinite-loop-detection.json | 2 | ✅ | 38.1M | ✅ | 45.7M | +20% |
| items.json | 28 | ✅ | 30.0M | ✅ | 30.0M | 0% |
| maxItems.json | 6 | ✅ | 59.6M | ✅ | 117.5M | 🔴 **+97%** |
| maxLength.json | 7 | ✅ | 51.2M | ✅ | 49.1M | -4% |
| maxProperties.json | 10 | ✅ | 45.7M | ✅ | 69.8M | 🔴 **+53%** |
| maximum.json | 8 | ✅ | 59.0M | ✅ | 126.3M | 🔴 **+114%** |
| minItems.json | 6 | ✅ | 59.0M | ✅ | 130.7M | 🔴 **+121%** |
| minLength.json | 7 | ✅ | 50.2M | ✅ | 46.4M | -8% |
| minProperties.json | 8 | ✅ | 47.4M | ✅ | 72.3M | 🔴 **+53%** |
| minimum.json | 11 | ✅ | 61.3M | ✅ | 120.9M | 🔴 **+97%** |
| multipleOf.json | 10 | ✅ | 58.0M | ✅ | 9.1M | 🟢 **-84%** |
| not.json | 38 | ✅ | 61.5M | ✅ | 105.0M | 🔴 **+71%** |
| oneOf.json | 27 | ✅ | 49.0M | ✅ | 46.6M | -5% |
| pattern.json | 9 | ✅ | 41.8M | ✅ | 73.2M | 🔴 **+75%** |
| patternProperties.json | 23 | ✅ | 15.9M | ✅ | 23.5M | 🔴 **+48%** |
| properties.json | 28 | ✅ | 24.5M | ✅ | 27.9M | +14% |
| propertyNames.json | 20 | ✅ | 31.2M | ✅ | 47.8M | 🔴 **+53%** |
| ref.json | 71 | ✅ | 22.9M | ⚠️ 5 fail | - | - |
| required.json | 16 | ✅ | 34.3M | ✅ | 53.8M | 🔴 **+57%** |
| type.json | 80 | ✅ | 61.3M | ✅ | 130.0M | 🔴 **+112%** |
| uniqueItems.json | 69 | ✅ | 24.1M | ✅ | 15.7M | 🟢 **-35%** |
| optional/bignum.json | 9 | ✅ | 57.2M | ✅ | 118.1M | 🔴 **+107%** |
| optional/ecmascript-regex.json | 74 | ✅ | 16.5M | ✅ | 23.8M | 🔴 **+44%** |
| optional/float-overflow.json | 1 | ✅ | 19.6M | ✅ | 17.1M | -12% |
| optional/format/date-time.json | 26 | ✅ | 23.2M | ✅ | 9.3M | 🟢 **-60%** |
| optional/format/date.json | 48 | ✅ | 8.5M | ✅ | 24.6M | 🔴 **+188%** |
| optional/format/email.json | 17 | ✅ | 17.8M | ✅ | 14.5M | -19% |
| optional/format/ipv4.json | 16 | ✅ | 39.5M | ✅ | 41.6M | +5% |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 17.4M | 🔴 **+47%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.8M | ✅ | 36.3M | 🔴 **+22%** |
| optional/format/regex.json | 8 | ✅ | 59.0M | ✅ | 846K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 37.3M | ✅ | 44.9M | 🔴 **+20%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.8M | ✅ | 8.0M | -19% |
| optional/format/uri-template.json | 10 | ✅ | 15.5M | ✅ | 18.6M | +20% |
| optional/format/uri.json | 36 | ✅ | 6.5M | ✅ | 4.9M | 🟢 **-24%** |
| optional/id.json | 7 | ✅ | 44.0M | ✅ | 63.7M | 🔴 **+45%** |
| optional/non-bmp-regex.json | 12 | ✅ | 22.8M | ✅ | 27.9M | 🔴 **+22%** |
| optional/unknownKeyword.json | 3 | ✅ | 15.1M | ✅ | 135.5M | 🔴 **+795%** |

### draft2019-09

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalItems.json | 19 | ✅ | 50.4M | ✅ | 71.0M | 🔴 **+41%** |
| additionalProperties.json | 21 | ✅ | 22.5M | ✅ | 47.1M | 🔴 **+109%** |
| allOf.json | 30 | ✅ | 43.9M | ✅ | 76.6M | 🔴 **+74%** |
| anchor.json | 8 | ✅ | 53.4M | ✅ | 83.9M | 🔴 **+57%** |
| anyOf.json | 18 | ✅ | 50.2M | ✅ | 58.8M | +17% |
| boolean_schema.json | 18 | ✅ | 54.7M | ✅ | 75.8M | 🔴 **+39%** |
| const.json | 54 | ✅ | 54.5M | ✅ | 52.3M | -4% |
| contains.json | 21 | ✅ | 50.6M | ✅ | 26.5M | 🟢 **-48%** |
| content.json | 18 | ✅ | 65.5M | ✅ | 129.2M | 🔴 **+97%** |
| default.json | 7 | ✅ | 49.0M | ✅ | 60.7M | 🔴 **+24%** |
| dependentRequired.json | 20 | ✅ | 36.0M | ✅ | 57.6M | 🔴 **+60%** |
| dependentSchemas.json | 20 | ✅ | 40.7M | ✅ | 58.1M | 🔴 **+43%** |
| enum.json | 45 | ✅ | 36.3M | ✅ | 90.1M | 🔴 **+148%** |
| exclusiveMaximum.json | 4 | ✅ | 59.9M | ✅ | 112.1M | 🔴 **+87%** |
| exclusiveMinimum.json | 4 | ✅ | 58.9M | ✅ | 110.4M | 🔴 **+87%** |
| format.json | 90 | ✅ | 67.4M | ⚠️ 24 fail | - | - |
| if-then-else.json | 26 | ✅ | 53.0M | ✅ | 103.0M | 🔴 **+95%** |
| infinite-loop-detection.json | 2 | ✅ | 36.3M | ✅ | 46.5M | 🔴 **+28%** |
| items.json | 28 | ✅ | 25.2M | ✅ | 29.2M | +16% |
| maxContains.json | 12 | ✅ | 54.3M | ✅ | 27.8M | 🟢 **-49%** |
| maxItems.json | 6 | ✅ | 59.5M | ✅ | 114.7M | 🔴 **+93%** |
| maxLength.json | 7 | ✅ | 51.0M | ✅ | 50.4M | -1% |
| maxProperties.json | 10 | ✅ | 45.8M | ✅ | 69.0M | 🔴 **+51%** |
| maximum.json | 8 | ✅ | 60.3M | ✅ | 116.7M | 🔴 **+94%** |
| minContains.json | 28 | ✅ | 56.6M | ✅ | 30.4M | 🟢 **-46%** |
| minItems.json | 6 | ✅ | 59.4M | ✅ | 114.8M | 🔴 **+93%** |
| minLength.json | 7 | ✅ | 50.5M | ✅ | 43.6M | -14% |
| minProperties.json | 8 | ✅ | 47.8M | ✅ | 73.1M | 🔴 **+53%** |
| minimum.json | 11 | ✅ | 59.6M | ✅ | 114.2M | 🔴 **+92%** |
| multipleOf.json | 10 | ✅ | 57.8M | ✅ | 9.0M | 🟢 **-84%** |
| not.json | 40 | ✅ | 57.4M | ✅ | 83.4M | 🔴 **+45%** |
| oneOf.json | 27 | ✅ | 47.2M | ✅ | 47.1M | 0% |
| pattern.json | 9 | ✅ | 40.5M | ✅ | 78.1M | 🔴 **+93%** |
| patternProperties.json | 23 | ✅ | 14.6M | ✅ | 23.8M | 🔴 **+63%** |
| properties.json | 28 | ✅ | 26.7M | ✅ | 29.4M | +10% |
| propertyNames.json | 20 | ✅ | 28.0M | ✅ | 48.7M | 🔴 **+74%** |
| recursiveRef.json | 34 | ✅ | 5.6M | ✅ | 12.5M | 🔴 **+123%** |
| ref.json | 79 | ✅ | 19.3M | ⚠️ 2 fail | - | - |
| required.json | 16 | ✅ | 35.0M | ✅ | 52.8M | 🔴 **+51%** |
| type.json | 80 | ✅ | 50.6M | ✅ | 129.8M | 🔴 **+157%** |
| unevaluatedItems.json | 54 | ✅ | 21.1M | ⚠️ 2 fail | - | - |
| unevaluatedProperties.json | 121 | ✅ | 3.4M | ⚠️ 2 fail | - | - |
| uniqueItems.json | 69 | ✅ | 24.3M | ✅ | 14.8M | 🟢 **-39%** |
| optional/anchor.json | 4 | ✅ | 52.2M | ✅ | 48.2M | -8% |
| optional/bignum.json | 9 | ✅ | 53.2M | ✅ | 118.8M | 🔴 **+123%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 40.3M | ✅ | 58.0M | 🔴 **+44%** |
| optional/ecmascript-regex.json | 74 | ✅ | 17.0M | ✅ | 25.9M | 🔴 **+53%** |
| optional/float-overflow.json | 1 | ✅ | 19.5M | ✅ | 12.8M | 🟢 **-34%** |
| optional/format/date-time.json | 26 | ✅ | 24.3M | ✅ | 9.4M | 🟢 **-62%** |
| optional/format/date.json | 48 | ✅ | 8.7M | ✅ | 24.8M | 🔴 **+185%** |
| optional/format/duration.json | 26 | ✅ | 35.9M | ✅ | 14.1M | 🟢 **-61%** |
| optional/format/email.json | 17 | ✅ | 18.1M | ✅ | 14.5M | -20% |
| optional/format/ipv4.json | 16 | ✅ | 39.5M | ✅ | 42.2M | +7% |
| optional/format/ipv6.json | 40 | ✅ | 11.8M | ✅ | 17.6M | 🔴 **+49%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.8M | ✅ | 39.1M | 🔴 **+31%** |
| optional/format/regex.json | 8 | ✅ | 60.1M | ✅ | 858K | 🟢 **-99%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 37.4M | ✅ | 48.4M | 🔴 **+29%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.4M | ✅ | 7.6M | -19% |
| optional/format/uri-template.json | 10 | ✅ | 16.3M | ✅ | 19.4M | +19% |
| optional/format/uri.json | 36 | ✅ | 6.5M | ✅ | 4.9M | 🟢 **-25%** |
| optional/format/uuid.json | 22 | ✅ | 14.2M | ✅ | 16.9M | +19% |
| optional/id.json | 3 | ✅ | 34.2M | ✅ | 44.5M | 🔴 **+30%** |
| optional/no-schema.json | 3 | ✅ | 60.8M | ✅ | 73.9M | 🔴 **+22%** |
| optional/non-bmp-regex.json | 12 | ✅ | 20.1M | ✅ | 26.5M | 🔴 **+32%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 41.8M | ✅ | 64.3M | 🔴 **+54%** |
| optional/unknownKeyword.json | 3 | ✅ | 15.2M | ✅ | 135.8M | 🔴 **+790%** |

### draft2020-12

| File | Tests | tjs | tjs ops/s | schemasafe | schemasafe ops/s | Diff |
|------|------:|----:|----------:|----:|----------:|-----:|
| additionalProperties.json | 21 | ✅ | 22.5M | ✅ | 48.2M | 🔴 **+114%** |
| allOf.json | 30 | ✅ | 40.3M | ✅ | 76.1M | 🔴 **+89%** |
| anchor.json | 8 | ✅ | 45.4M | ✅ | 78.2M | 🔴 **+72%** |
| anyOf.json | 18 | ✅ | 46.3M | ✅ | 61.7M | 🔴 **+33%** |
| boolean_schema.json | 18 | ✅ | 53.4M | ✅ | 137.2M | 🔴 **+157%** |
| const.json | 54 | ✅ | 47.7M | ✅ | 52.4M | +10% |
| contains.json | 21 | ✅ | 52.7M | ✅ | 26.2M | 🟢 **-50%** |
| content.json | 18 | ✅ | 64.3M | ✅ | 137.3M | 🔴 **+113%** |
| default.json | 7 | ✅ | 45.2M | ✅ | 58.4M | 🔴 **+29%** |
| dependentRequired.json | 20 | ✅ | 39.6M | ✅ | 57.3M | 🔴 **+45%** |
| dependentSchemas.json | 20 | ✅ | 41.5M | ✅ | 58.3M | 🔴 **+40%** |
| dynamicRef.json | 29 | ✅ | 8.4M | ⚠️ 14 fail | - | - |
| enum.json | 45 | ✅ | 34.1M | ✅ | 87.8M | 🔴 **+157%** |
| exclusiveMaximum.json | 4 | ✅ | 56.0M | ✅ | 111.1M | 🔴 **+99%** |
| exclusiveMinimum.json | 4 | ✅ | 52.3M | ✅ | 109.1M | 🔴 **+109%** |
| if-then-else.json | 26 | ✅ | 52.8M | ✅ | 103.8M | 🔴 **+96%** |
| infinite-loop-detection.json | 2 | ✅ | 33.2M | ✅ | 46.0M | 🔴 **+39%** |
| items.json | 29 | ✅ | 26.1M | ✅ | 29.9M | +15% |
| maxContains.json | 12 | ✅ | 51.9M | ✅ | 27.5M | 🟢 **-47%** |
| maxItems.json | 6 | ✅ | 56.3M | ✅ | 112.5M | 🔴 **+100%** |
| maxLength.json | 7 | ✅ | 47.8M | ✅ | 53.3M | +11% |
| maxProperties.json | 10 | ✅ | 43.0M | ✅ | 69.5M | 🔴 **+62%** |
| maximum.json | 8 | ✅ | 57.7M | ✅ | 115.8M | 🔴 **+101%** |
| minContains.json | 28 | ✅ | 53.7M | ✅ | 30.6M | 🟢 **-43%** |
| minItems.json | 6 | ✅ | 57.0M | ✅ | 114.8M | 🔴 **+101%** |
| minLength.json | 7 | ✅ | 45.0M | ✅ | 46.6M | +3% |
| minProperties.json | 8 | ✅ | 45.6M | ✅ | 72.8M | 🔴 **+60%** |
| minimum.json | 11 | ✅ | 58.2M | ✅ | 120.6M | 🔴 **+107%** |
| multipleOf.json | 10 | ✅ | 53.7M | ✅ | 9.1M | 🟢 **-83%** |
| not.json | 40 | ✅ | 53.6M | ✅ | 80.4M | 🔴 **+50%** |
| oneOf.json | 27 | ✅ | 46.5M | ✅ | 48.1M | +3% |
| pattern.json | 9 | ✅ | 37.9M | ✅ | 72.1M | 🔴 **+90%** |
| patternProperties.json | 23 | ✅ | 15.7M | ✅ | 24.0M | 🔴 **+52%** |
| prefixItems.json | 11 | ✅ | 55.3M | ✅ | 74.7M | 🔴 **+35%** |
| properties.json | 28 | ✅ | 25.1M | ✅ | 28.4M | +13% |
| propertyNames.json | 20 | ✅ | 26.9M | ✅ | 46.1M | 🔴 **+72%** |
| ref.json | 77 | ✅ | 21.7M | ⚠️ 2 fail | - | - |
| required.json | 16 | ✅ | 31.5M | ✅ | 52.8M | 🔴 **+67%** |
| type.json | 80 | ✅ | 44.4M | ✅ | 118.9M | 🔴 **+168%** |
| unevaluatedItems.json | 69 | ✅ | 16.0M | ⚠️ 2 fail | - | - |
| unevaluatedProperties.json | 123 | ✅ | 2.9M | ⚠️ 2 fail | - | - |
| uniqueItems.json | 69 | ✅ | 23.9M | ✅ | 15.3M | 🟢 **-36%** |
| optional/anchor.json | 4 | ✅ | 48.2M | ✅ | 49.5M | +3% |
| optional/bignum.json | 9 | ✅ | 51.6M | ✅ | 117.3M | 🔴 **+127%** |
| optional/dependencies-compatibility.json | 36 | ✅ | 39.1M | ✅ | 56.1M | 🔴 **+44%** |
| optional/dynamicRef.json | 2 | ✅ | 7.9M | ✅ | 8.7M | +10% |
| optional/ecmascript-regex.json | 74 | ✅ | 16.8M | ✅ | 25.8M | 🔴 **+54%** |
| optional/float-overflow.json | 1 | ✅ | 14.8M | ✅ | 16.8M | +13% |
| optional/format/date-time.json | 26 | ✅ | 24.3M | ✅ | 9.4M | 🟢 **-61%** |
| optional/format/date.json | 48 | ✅ | 8.4M | ✅ | 25.1M | 🔴 **+199%** |
| optional/format/duration.json | 26 | ✅ | 36.9M | ✅ | 14.4M | 🟢 **-61%** |
| optional/format/ecmascript-regex.json | 1 | ✅ | 42.2M | ✅ | 113K | 🟢 **-100%** |
| optional/format/ipv4.json | 16 | ✅ | 38.1M | ✅ | 41.9M | +10% |
| optional/format/ipv6.json | 40 | ✅ | 11.6M | ✅ | 17.4M | 🔴 **+50%** |
| optional/format/json-pointer.json | 38 | ✅ | 29.2M | ✅ | 39.0M | 🔴 **+34%** |
| optional/format/regex.json | 8 | ✅ | 56.5M | ✅ | 919K | 🟢 **-98%** |
| optional/format/relative-json-pointer.json | 18 | ✅ | 36.1M | ✅ | 45.1M | 🔴 **+25%** |
| optional/format/uri-reference.json | 15 | ✅ | 9.5M | ✅ | 8.0M | -15% |
| optional/format/uri-template.json | 10 | ✅ | 15.4M | ✅ | 18.4M | +20% |
| optional/format/uri.json | 36 | ✅ | 6.4M | ✅ | 4.9M | 🟢 **-24%** |
| optional/format/uuid.json | 22 | ✅ | 14.4M | ✅ | 16.5M | +15% |
| optional/id.json | 3 | ✅ | 32.4M | ✅ | 45.8M | 🔴 **+41%** |
| optional/no-schema.json | 3 | ✅ | 45.0M | ✅ | 66.7M | 🔴 **+48%** |
| optional/non-bmp-regex.json | 12 | ✅ | 21.1M | ✅ | 27.3M | 🔴 **+30%** |
| optional/refOfUnknownKeyword.json | 10 | ✅ | 37.5M | ✅ | 60.3M | 🔴 **+61%** |
| optional/unknownKeyword.json | 3 | ✅ | 13.2M | ✅ | 132.3M | 🔴 **+899%** |

