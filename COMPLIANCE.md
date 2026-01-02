# JSON Schema Test Suite Compliance

tjs achieves **100% compliance** on all tests that can be meaningfully evaluated in JavaScript.

## Summary by Draft

| Draft | Tests | Passed | Skipped | Compliance |
|-------|-------|--------|---------|------------|
| draft-04 | 882 | 881 | 1 | ✅ 100%* |
| draft-06 | 1170 | 1170 | 0 | ✅ 100% |
| draft-07 | 1534 | 1534 | 0 | ✅ 100% |
| draft-2019-09 | 1941 | 1941 | 0 | ✅ 100% |
| draft-2020-12 | 1990 | 1990 | 0 | ✅ 100% |
| **Total** | **7517** | **7516** | **1** | ✅ **100%*** |

\* One test is skipped (see below)

## Comparison with ajv

| Draft | tjs | ajv + formats |
|-------|-----|---------------|
| draft-04 | ✅ 100% (881/881) | ⚠️ 93.8% (827/882) |
| draft-06 | ✅ 100% (1170/1170) | ⚠️ 98.9% (1157/1170) |
| draft-07 | ✅ 100% (1534/1534) | ⚠️ 94.1% (1443/1534) |
| draft-2019-09 | ✅ 100% (1941/1941) | ⚠️ 95.6% (1855/1941) |
| draft-2020-12 | ✅ 100% (1990/1990) | ⚠️ 93.5% (1860/1990) |

## *Skipped Test

### draft-04: zeroTerminatedFloats

**File**: `optional/zeroTerminatedFloats.json`
**Test**: `a float is not an integer even without fractional part`
**Schema**: `{"type": "integer"}`
**Data**: `1` (parsed from `1.0`)

This test checks whether a validator can distinguish between `1.0` (a float) and `1` (an integer). In JavaScript, `1.0 === 1` — the language does not preserve this distinction after JSON parsing. This test is marked as **optional** in the JSON Schema Test Suite specifically because it's language-dependent.

All JavaScript-based validators (tjs, ajv, etc.) skip this test. It's not a compliance failure — it's a fundamental limitation of the JavaScript runtime.
