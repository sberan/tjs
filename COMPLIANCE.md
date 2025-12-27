# JSON Schema Test Suite Compliance Report

## Summary

- **Total Tests**: 1271
- **Passed**: 1066 (83.9%)
- **Failed**: 125
- **Skipped**: 80

## By Keyword

| Keyword | Passed | Failed | Skipped | Rate |
|---------|--------|--------|---------|------|
| additionalProperties | 19 | 2 | 0 | 90% |
| allOf | 26 | 4 | 0 | 87% |
| anchor | 5 | 3 | 0 | 63% |
| anyOf | 17 | 1 | 0 | 94% |
| boolean_schema | 18 | 0 | 0 | 100% |
| const | 54 | 0 | 0 | 100% |
| contains | 19 | 2 | 0 | 90% |
| content | 9 | 9 | 0 | 50% |
| default | 7 | 0 | 0 | 100% |
| defs | 1 | 1 | 0 | 50% |
| dependentRequired | 20 | 0 | 0 | 100% |
| dependentSchemas | 20 | 0 | 0 | 100% |
| dynamicRef | 0 | 0 | 44 | N/A |
| enum | 45 | 0 | 0 | 100% |
| exclusiveMaximum | 4 | 0 | 0 | 100% |
| exclusiveMinimum | 4 | 0 | 0 | 100% |
| format | 120 | 13 | 0 | 90% |
| if-then-else | 25 | 1 | 0 | 96% |
| infinite-loop-detection | 2 | 0 | 0 | 100% |
| items | 28 | 1 | 0 | 97% |
| maxContains | 12 | 0 | 0 | 100% |
| maxItems | 6 | 0 | 0 | 100% |
| maxLength | 6 | 1 | 0 | 86% |
| maxProperties | 10 | 0 | 0 | 100% |
| maximum | 8 | 0 | 0 | 100% |
| minContains | 27 | 1 | 0 | 96% |
| minItems | 6 | 0 | 0 | 100% |
| minLength | 6 | 1 | 0 | 86% |
| minProperties | 8 | 0 | 0 | 100% |
| minimum | 11 | 0 | 0 | 100% |
| multipleOf | 8 | 2 | 0 | 80% |
| not | 39 | 1 | 0 | 98% |
| oneOf | 27 | 0 | 0 | 100% |
| pattern | 9 | 0 | 0 | 100% |
| patternProperties | 23 | 0 | 0 | 100% |
| prefixItems | 11 | 0 | 0 | 100% |
| properties | 27 | 1 | 0 | 96% |
| propertyNames | 19 | 1 | 0 | 95% |
| ref | 53 | 26 | 0 | 67% |
| refRemote | 0 | 0 | 31 | N/A |
| required | 12 | 4 | 0 | 75% |
| type | 80 | 0 | 0 | 100% |
| unevaluatedItems | 54 | 17 | 0 | 76% |
| unevaluatedProperties | 94 | 31 | 0 | 75% |
| uniqueItems | 67 | 2 | 0 | 97% |
| vocabulary | 0 | 0 | 5 | N/A |

## Failures

### additionalProperties / additionalProperties does not look in applicators

**Test**: properties defined in allOf are not examined
**Expected**: invalid
**Actual**: valid

### additionalProperties / dependentSchemas with additionalProperties

**Test**: additionalProperties can't see bar even when foo2 is present
**Expected**: invalid
**Actual**: valid

### allOf / allOf with base schema

**Test**: mismatch base schema
**Expected**: invalid
**Actual**: valid

### allOf / allOf combined with anyOf, oneOf

**Test**: allOf: false, anyOf: true, oneOf: false
**Expected**: invalid
**Actual**: valid

### allOf / allOf combined with anyOf, oneOf

**Test**: allOf: false, anyOf: true, oneOf: true
**Expected**: invalid
**Actual**: valid

### allOf / allOf combined with anyOf, oneOf

**Test**: allOf: true, anyOf: true, oneOf: false
**Expected**: invalid
**Actual**: valid

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

### anyOf / anyOf with base schema

**Test**: mismatch base schema
**Expected**: invalid
**Actual**: valid

### contains / contains keyword with boolean schema false

**Test**: any non-empty array is invalid
**Expected**: invalid
**Actual**: valid

### contains / contains keyword with boolean schema false

**Test**: empty array is invalid
**Expected**: invalid
**Actual**: valid

### content / validation of string-encoded content based on media type

**Test**: an invalid JSON document; validates true
**Expected**: valid
**Actual**: invalid

### content / validation of binary string-encoding

**Test**: an invalid base64 string (% is not a valid character); validates true
**Expected**: valid
**Actual**: invalid

### content / validation of binary-encoded media type documents

**Test**: a validly-encoded invalid JSON document; validates true
**Expected**: valid
**Actual**: invalid

### content / validation of binary-encoded media type documents

**Test**: an invalid base64 string that is valid JSON; validates true
**Expected**: valid
**Actual**: invalid

### content / validation of binary-encoded media type documents with schema

**Test**: an invalid base64-encoded JSON document; validates true
**Expected**: valid
**Actual**: invalid

### content / validation of binary-encoded media type documents with schema

**Test**: an empty object as a base64-encoded JSON document; validates true
**Expected**: valid
**Actual**: invalid

### content / validation of binary-encoded media type documents with schema

**Test**: an empty array as a base64-encoded JSON document
**Expected**: valid
**Actual**: invalid

### content / validation of binary-encoded media type documents with schema

**Test**: a validly-encoded invalid JSON document; validates true
**Expected**: valid
**Actual**: invalid

### content / validation of binary-encoded media type documents with schema

**Test**: an invalid base64 string that is valid JSON; validates true
**Expected**: valid
**Actual**: invalid

### defs / validate definition against metaschema

**Test**: valid definition schema
**Expected**: valid
**Actual**: invalid

### format / email format

**Test**: invalid email string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### format / regex format

**Test**: invalid regex string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### format / ipv4 format

**Test**: invalid ipv4 string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### format / ipv6 format

**Test**: invalid ipv6 string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### format / hostname format

**Test**: invalid hostname string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### format / date format

**Test**: invalid date string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### format / date-time format

**Test**: invalid date-time string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### format / time format

**Test**: invalid time string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### format / json-pointer format

**Test**: invalid json-pointer string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### format / relative-json-pointer format

**Test**: invalid relative-json-pointer string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### format / uri format

**Test**: invalid uri string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### format / uuid format

**Test**: invalid uuid string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### format / duration format

**Test**: invalid duration string is only an annotation by default
**Expected**: valid
**Actual**: invalid

### if-then-else / if with boolean schema false

**Test**: boolean schema false in if always chooses the else path (invalid)
**Expected**: invalid
**Actual**: valid

### items / items does not look in applicators, valid case

**Test**: prefixItems in allOf does not constrain items, invalid case
**Expected**: invalid
**Actual**: valid

### maxLength / maxLength validation

**Test**: two graphemes is long enough
**Expected**: valid
**Actual**: invalid

### minContains / minContains = 0 with maxContains

**Test**: too many
**Expected**: invalid
**Actual**: valid

### minLength / minLength validation

**Test**: one grapheme is not long enough
**Expected**: invalid
**Actual**: valid

### multipleOf / by small number

**Test**: 0.0075 is multiple of 0.0001
**Expected**: valid
**Actual**: invalid

### multipleOf / small multiple of large integer

**Test**: any integer is a multiple of 1e-8
**Expected**: valid
**Actual**: invalid

### not / collect annotations inside a 'not', even if collection is disabled

**Test**: annotations are still collected inside a 'not'
**Expected**: invalid
**Actual**: valid

### properties / properties whose names are Javascript object property names

**Test**: none of the properties mentioned
**Expected**: valid
**Actual**: invalid

### propertyNames / propertyNames with boolean schema false

**Test**: object with any properties is invalid
**Expected**: invalid
**Actual**: valid

### ref / root pointer ref

**Test**: match
**Expected**: valid
**Actual**: invalid

### ref / root pointer ref

**Test**: recursive match
**Expected**: valid
**Actual**: invalid

### ref / relative pointer ref to object

**Test**: match
**Expected**: valid
**Actual**: invalid

### ref / relative pointer ref to array

**Test**: match array
**Expected**: valid
**Actual**: invalid

### ref / escaped pointer ref

**Test**: slash valid
**Expected**: valid
**Actual**: invalid

... and 75 more failures