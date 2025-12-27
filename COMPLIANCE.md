# JSON Schema Test Suite Compliance Report

## Summary

- **Total Tests**: 1271
- **Passed**: 1185 (93.2%)
- **Failed**: 6
- **Skipped**: 80

## By Keyword

| Keyword | Passed | Failed | Skipped | Rate |
|---------|--------|--------|---------|------|
| additionalProperties | 21 | 0 | 0 | 100% |
| allOf | 30 | 0 | 0 | 100% |
| anchor | 8 | 0 | 0 | 100% |
| anyOf | 18 | 0 | 0 | 100% |
| boolean_schema | 18 | 0 | 0 | 100% |
| const | 54 | 0 | 0 | 100% |
| contains | 21 | 0 | 0 | 100% |
| content | 18 | 0 | 0 | 100% |
| default | 7 | 0 | 0 | 100% |
| defs | 1 | 1 | 0 | 50% |
| dependentRequired | 20 | 0 | 0 | 100% |
| dependentSchemas | 20 | 0 | 0 | 100% |
| dynamicRef | 0 | 0 | 44 | N/A |
| enum | 45 | 0 | 0 | 100% |
| exclusiveMaximum | 4 | 0 | 0 | 100% |
| exclusiveMinimum | 4 | 0 | 0 | 100% |
| format | 133 | 0 | 0 | 100% |
| if-then-else | 26 | 0 | 0 | 100% |
| infinite-loop-detection | 2 | 0 | 0 | 100% |
| items | 29 | 0 | 0 | 100% |
| maxContains | 12 | 0 | 0 | 100% |
| maxItems | 6 | 0 | 0 | 100% |
| maxLength | 6 | 1 | 0 | 86% |
| maxProperties | 10 | 0 | 0 | 100% |
| maximum | 8 | 0 | 0 | 100% |
| minContains | 28 | 0 | 0 | 100% |
| minItems | 6 | 0 | 0 | 100% |
| minLength | 6 | 1 | 0 | 86% |
| minProperties | 8 | 0 | 0 | 100% |
| minimum | 11 | 0 | 0 | 100% |
| multipleOf | 10 | 0 | 0 | 100% |
| not | 40 | 0 | 0 | 100% |
| oneOf | 27 | 0 | 0 | 100% |
| pattern | 9 | 0 | 0 | 100% |
| patternProperties | 23 | 0 | 0 | 100% |
| prefixItems | 11 | 0 | 0 | 100% |
| properties | 28 | 0 | 0 | 100% |
| propertyNames | 20 | 0 | 0 | 100% |
| ref | 78 | 1 | 0 | 99% |
| refRemote | 0 | 0 | 31 | N/A |
| required | 16 | 0 | 0 | 100% |
| type | 80 | 0 | 0 | 100% |
| unevaluatedItems | 70 | 1 | 0 | 99% |
| unevaluatedProperties | 124 | 1 | 0 | 99% |
| uniqueItems | 69 | 0 | 0 | 100% |
| vocabulary | 0 | 0 | 5 | N/A |

## Failures

### defs / validate definition against metaschema

**Test**: valid definition schema
**Expected**: valid
**Actual**: invalid

### maxLength / maxLength validation

**Test**: two graphemes is long enough
**Expected**: valid
**Actual**: invalid

### minLength / minLength validation

**Test**: one grapheme is not long enough
**Expected**: invalid
**Actual**: valid

### ref / remote ref, containing refs itself

**Test**: remote ref valid
**Expected**: valid
**Actual**: invalid

### unevaluatedItems / unevaluatedItems with $dynamicRef

**Test**: with no unevaluated items
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / unevaluatedProperties with $dynamicRef

**Test**: with no unevaluated properties
**Expected**: valid
**Actual**: invalid
