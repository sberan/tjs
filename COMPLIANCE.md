# JSON Schema Test Suite Compliance Report

## Summary

- **Total Tests**: 1271
- **Passed**: 1162 (91.4%)
- **Failed**: 29
- **Skipped**: 80

## By Keyword

| Keyword | Passed | Failed | Skipped | Rate |
|---------|--------|--------|---------|------|
| additionalProperties | 21 | 0 | 0 | 100% |
| allOf | 30 | 0 | 0 | 100% |
| anchor | 5 | 3 | 0 | 63% |
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
| ref | 63 | 16 | 0 | 80% |
| refRemote | 0 | 0 | 31 | N/A |
| required | 16 | 0 | 0 | 100% |
| type | 80 | 0 | 0 | 100% |
| unevaluatedItems | 70 | 1 | 0 | 99% |
| unevaluatedProperties | 119 | 6 | 0 | 95% |
| uniqueItems | 69 | 0 | 0 | 100% |
| vocabulary | 0 | 0 | 5 | N/A |

## Failures

### anchor / Location-independent identifier with absolute URI

**Test**: match
**Expected**: valid
**Actual**: invalid

### anchor / Location-independent identifier with base URI change in subschema

**Test**: match
**Expected**: valid
**Actual**: invalid

### anchor / same $anchor with different base uri

**Test**: $ref resolves to /$defs/A/allOf/1
**Expected**: valid
**Actual**: invalid

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

### ref / Recursive references between schemas

**Test**: valid tree
**Expected**: valid
**Actual**: invalid

### ref / refs with relative uris and defs

**Test**: valid on both fields
**Expected**: valid
**Actual**: invalid

### ref / relative refs with absolute uris and defs

**Test**: valid on both fields
**Expected**: valid
**Actual**: invalid

### ref / $id must be resolved against nearest parent, not just immediate parent

**Test**: number is valid
**Expected**: valid
**Actual**: invalid

### ref / order of evaluation: $id and $ref

**Test**: data is valid against first definition
**Expected**: valid
**Actual**: invalid

### ref / order of evaluation: $id and $anchor and $ref

**Test**: data is valid against first definition
**Expected**: valid
**Actual**: invalid

### ref / order of evaluation: $id and $ref on nested schema

**Test**: data is valid against nested sibling
**Expected**: valid
**Actual**: invalid

### ref / simple URN base URI with $ref via the URN

**Test**: valid under the URN IDed schema
**Expected**: valid
**Actual**: invalid

### ref / URN base URI with URN and JSON pointer ref

**Test**: a string is valid
**Expected**: valid
**Actual**: invalid

### ref / URN base URI with URN and anchor ref

**Test**: a string is valid
**Expected**: valid
**Actual**: invalid

### ref / URN ref with nested pointer ref

**Test**: a string is valid
**Expected**: valid
**Actual**: invalid

### ref / ref to if

**Test**: an integer is valid
**Expected**: valid
**Actual**: invalid

### ref / ref to then

**Test**: an integer is valid
**Expected**: valid
**Actual**: invalid

### ref / ref to else

**Test**: an integer is valid
**Expected**: valid
**Actual**: invalid

### ref / ref with absolute-path-reference

**Test**: a string is valid
**Expected**: valid
**Actual**: invalid

### unevaluatedItems / unevaluatedItems with $dynamicRef

**Test**: with no unevaluated items
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / unevaluatedProperties with nested unevaluatedProperties

**Test**: with nested unevaluated properties
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / unevaluatedProperties with $dynamicRef

**Test**: with no unevaluated properties
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / nested unevaluatedProperties, outer false, inner true, properties outside

**Test**: with nested unevaluated properties
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / nested unevaluatedProperties, outer false, inner true, properties inside

**Test**: with nested unevaluated properties
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / dynamic evalation inside nested refs

**Test**: all is valid
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / dynamic evalation inside nested refs

**Test**: all + foo is valid
**Expected**: valid
**Actual**: invalid
