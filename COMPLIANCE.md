# JSON Schema Test Suite Compliance Report

## Summary

- **Total Tests**: 1271
- **Passed**: 1219 (95.9%)
- **Failed**: 16
- **Skipped**: 36

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
| dynamicRef | 32 | 12 | 0 | 73% |
| enum | 45 | 0 | 0 | 100% |
| exclusiveMaximum | 4 | 0 | 0 | 100% |
| exclusiveMinimum | 4 | 0 | 0 | 100% |
| format | 133 | 0 | 0 | 100% |
| if-then-else | 26 | 0 | 0 | 100% |
| infinite-loop-detection | 2 | 0 | 0 | 100% |
| items | 29 | 0 | 0 | 100% |
| maxContains | 12 | 0 | 0 | 100% |
| maxItems | 6 | 0 | 0 | 100% |
| maxLength | 7 | 0 | 0 | 100% |
| maxProperties | 10 | 0 | 0 | 100% |
| maximum | 8 | 0 | 0 | 100% |
| minContains | 28 | 0 | 0 | 100% |
| minItems | 6 | 0 | 0 | 100% |
| minLength | 7 | 0 | 0 | 100% |
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

### dynamicRef / A $dynamicRef resolves to the first $dynamicAnchor still in scope that is encountered when the schema is evaluated

**Test**: An array containing non-strings is invalid
**Expected**: invalid
**Actual**: valid

### dynamicRef / A $dynamicRef with intermediate scopes that don't include a matching $dynamicAnchor does not affect dynamic scope resolution

**Test**: An array containing non-strings is invalid
**Expected**: invalid
**Actual**: valid

### dynamicRef / A $dynamicRef that initially resolves to a schema with a matching $dynamicAnchor resolves to the first $dynamicAnchor in the dynamic scope

**Test**: The recursive part is valid against the root
**Expected**: valid
**Actual**: invalid

### dynamicRef / multiple dynamic paths to the $dynamicRef keyword

**Test**: number list with string values
**Expected**: invalid
**Actual**: valid

### dynamicRef / multiple dynamic paths to the $dynamicRef keyword

**Test**: string list with number values
**Expected**: invalid
**Actual**: valid

### dynamicRef / after leaving a dynamic scope, it is not used by a $dynamicRef

**Test**: /then/$defs/thingy is the final stop for the $dynamicRef
**Expected**: valid
**Actual**: invalid

### dynamicRef / strict-tree schema, guards against misspelled properties

**Test**: instance with correct field
**Expected**: valid
**Actual**: invalid

### dynamicRef / tests for implementation dynamic anchor and reference link

**Test**: correct extended schema
**Expected**: valid
**Actual**: invalid

### dynamicRef / $ref and $dynamicAnchor are independent of order - $defs first

**Test**: correct extended schema
**Expected**: valid
**Actual**: invalid

### dynamicRef / $ref and $dynamicAnchor are independent of order - $ref first

**Test**: correct extended schema
**Expected**: valid
**Actual**: invalid

### dynamicRef / $ref to $dynamicRef finds detached $dynamicAnchor

**Test**: number is valid
**Expected**: valid
**Actual**: invalid

### dynamicRef / $dynamicRef avoids the root of each schema, but scopes are still registered

**Test**: data is not sufficient for schema at second#/$defs/length
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
