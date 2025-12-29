# JSON Schema Test Suite Compliance Report

## Summary

- **Total Tests**: 1271
- **Passed**: 0 (0.0%)
- **Failed**: 1271
- **Skipped**: 0

## By Keyword

| Keyword | Passed | Failed | Skipped | Rate |
|---------|--------|--------|---------|------|
| additionalProperties | 0 | 21 | 0 | 0% |
| allOf | 0 | 30 | 0 | 0% |
| anchor | 0 | 8 | 0 | 0% |
| anyOf | 0 | 18 | 0 | 0% |
| boolean_schema | 0 | 18 | 0 | 0% |
| const | 0 | 54 | 0 | 0% |
| contains | 0 | 21 | 0 | 0% |
| content | 0 | 18 | 0 | 0% |
| default | 0 | 7 | 0 | 0% |
| defs | 0 | 2 | 0 | 0% |
| dependentRequired | 0 | 20 | 0 | 0% |
| dependentSchemas | 0 | 20 | 0 | 0% |
| dynamicRef | 0 | 44 | 0 | 0% |
| enum | 0 | 45 | 0 | 0% |
| exclusiveMaximum | 0 | 4 | 0 | 0% |
| exclusiveMinimum | 0 | 4 | 0 | 0% |
| format | 0 | 133 | 0 | 0% |
| if-then-else | 0 | 26 | 0 | 0% |
| infinite-loop-detection | 0 | 2 | 0 | 0% |
| items | 0 | 29 | 0 | 0% |
| maxContains | 0 | 12 | 0 | 0% |
| maxItems | 0 | 6 | 0 | 0% |
| maxLength | 0 | 7 | 0 | 0% |
| maxProperties | 0 | 10 | 0 | 0% |
| maximum | 0 | 8 | 0 | 0% |
| minContains | 0 | 28 | 0 | 0% |
| minItems | 0 | 6 | 0 | 0% |
| minLength | 0 | 7 | 0 | 0% |
| minProperties | 0 | 8 | 0 | 0% |
| minimum | 0 | 11 | 0 | 0% |
| multipleOf | 0 | 10 | 0 | 0% |
| not | 0 | 40 | 0 | 0% |
| oneOf | 0 | 27 | 0 | 0% |
| pattern | 0 | 9 | 0 | 0% |
| patternProperties | 0 | 23 | 0 | 0% |
| prefixItems | 0 | 11 | 0 | 0% |
| properties | 0 | 28 | 0 | 0% |
| propertyNames | 0 | 20 | 0 | 0% |
| ref | 0 | 79 | 0 | 0% |
| refRemote | 0 | 31 | 0 | 0% |
| required | 0 | 16 | 0 | 0% |
| type | 0 | 80 | 0 | 0% |
| unevaluatedItems | 0 | 71 | 0 | 0% |
| unevaluatedProperties | 0 | 125 | 0 | 0% |
| uniqueItems | 0 | 69 | 0 | 0% |
| vocabulary | 0 | 5 | 0 | 0% |

## Failures

### additionalProperties / additionalProperties being false does not allow other properties

**Test**: no additional properties is valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties being false does not allow other properties

**Test**: an additional property is invalid
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties being false does not allow other properties

**Test**: ignores arrays
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties being false does not allow other properties

**Test**: ignores strings
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties being false does not allow other properties

**Test**: ignores other non-objects
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties being false does not allow other properties

**Test**: patternProperties are not additional properties
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / non-ASCII pattern with additionalProperties

**Test**: matching the pattern is valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / non-ASCII pattern with additionalProperties

**Test**: not matching the pattern is invalid
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties with schema

**Test**: no additional properties is valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties with schema

**Test**: an additional valid property is valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties with schema

**Test**: an additional invalid property is invalid
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties can exist by itself

**Test**: an additional valid property is valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties can exist by itself

**Test**: an additional invalid property is invalid
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties are allowed by default

**Test**: additional properties are allowed
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties does not look in applicators

**Test**: properties defined in allOf are not examined
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties with null valued instance properties

**Test**: allows null values
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties with propertyNames

**Test**: Valid against both keywords
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / additionalProperties with propertyNames

**Test**: Valid against propertyNames, but not additionalProperties
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / dependentSchemas with additionalProperties

**Test**: additionalProperties doesn't consider dependentSchemas
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / dependentSchemas with additionalProperties

**Test**: additionalProperties can't see bar
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### additionalProperties / dependentSchemas with additionalProperties

**Test**: additionalProperties can't see bar even when foo2 is present
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf

**Test**: allOf
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf

**Test**: mismatch second
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf

**Test**: mismatch first
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf

**Test**: wrong type
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with base schema

**Test**: valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with base schema

**Test**: mismatch base schema
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with base schema

**Test**: mismatch first allOf
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with base schema

**Test**: mismatch second allOf
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with base schema

**Test**: mismatch both
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf simple types

**Test**: valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf simple types

**Test**: mismatch one
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with boolean schemas, all true

**Test**: any value is valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with boolean schemas, some false

**Test**: any value is invalid
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with boolean schemas, all false

**Test**: any value is invalid
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with one empty schema

**Test**: any data is valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with two empty schemas

**Test**: any data is valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with the first empty schema

**Test**: number is valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with the first empty schema

**Test**: string is invalid
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with the last empty schema

**Test**: number is valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf with the last empty schema

**Test**: string is invalid
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / nested allOf, to check validation semantics

**Test**: null is valid
**Expected**: valid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / nested allOf, to check validation semantics

**Test**: anything non-null is invalid
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf combined with anyOf, oneOf

**Test**: allOf: false, anyOf: false, oneOf: false
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf combined with anyOf, oneOf

**Test**: allOf: false, anyOf: false, oneOf: true
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf combined with anyOf, oneOf

**Test**: allOf: false, anyOf: true, oneOf: false
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf combined with anyOf, oneOf

**Test**: allOf: false, anyOf: true, oneOf: true
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf combined with anyOf, oneOf

**Test**: allOf: true, anyOf: false, oneOf: false
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf combined with anyOf, oneOf

**Test**: allOf: true, anyOf: false, oneOf: true
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

### allOf / allOf combined with anyOf, oneOf

**Test**: allOf: true, anyOf: true, oneOf: false
**Expected**: invalid
**Actual**: invalid
**Error**: Schema construction failed: TypeError: __vite_ssr_import_3__.Validator is not a function

... and 1221 more failures