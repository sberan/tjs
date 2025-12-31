# JSON Schema Test Suite Compliance Report

## Summary

- **Total Tests**: 1990
- **Passed**: 1909 (95.9%)
- **Failed**: 22
- **Skipped**: 59

## By Keyword

| Keyword | Passed | Failed | Skipped | Rate |
|---------|--------|--------|---------|------|
| additionalProperties | 21 | 0 | 0 | 100% |
| allOf | 30 | 0 | 0 | 100% |
| anchor | 12 | 0 | 0 | 100% |
| anyOf | 18 | 0 | 0 | 100% |
| bignum | 9 | 0 | 0 | 100% |
| boolean_schema | 18 | 0 | 0 | 100% |
| const | 54 | 0 | 0 | 100% |
| contains | 21 | 0 | 0 | 100% |
| content | 0 | 0 | 18 | N/A |
| cross-draft | 0 | 0 | 1 | N/A |
| date | 31 | 0 | 17 | 100% |
| date-time | 23 | 0 | 3 | 100% |
| default | 7 | 0 | 0 | 100% |
| defs | 2 | 0 | 0 | 100% |
| dependencies-compatibility | 36 | 0 | 0 | 100% |
| dependentRequired | 20 | 0 | 0 | 100% |
| dependentSchemas | 20 | 0 | 0 | 100% |
| duration | 26 | 0 | 0 | 100% |
| dynamicRef | 41 | 5 | 0 | 89% |
| ecmascript-regex | 75 | 0 | 0 | 100% |
| email | 24 | 0 | 0 | 100% |
| enum | 45 | 0 | 0 | 100% |
| exclusiveMaximum | 4 | 0 | 0 | 100% |
| exclusiveMinimum | 4 | 0 | 0 | 100% |
| float-overflow | 0 | 0 | 1 | N/A |
| format | 133 | 0 | 0 | 100% |
| format-assertion | 0 | 0 | 4 | N/A |
| hostname | 61 | 0 | 0 | 100% |
| id | 3 | 0 | 0 | 100% |
| idn-email | 10 | 0 | 0 | 100% |
| idn-hostname | 77 | 0 | 0 | 100% |
| if-then-else | 26 | 0 | 0 | 100% |
| infinite-loop-detection | 2 | 0 | 0 | 100% |
| ipv4 | 16 | 0 | 0 | 100% |
| ipv6 | 40 | 0 | 0 | 100% |
| iri | 14 | 0 | 1 | 100% |
| iri-reference | 13 | 0 | 0 | 100% |
| items | 29 | 0 | 0 | 100% |
| json-pointer | 38 | 0 | 0 | 100% |
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
| no-schema | 3 | 0 | 0 | 100% |
| non-bmp-regex | 12 | 0 | 0 | 100% |
| not | 40 | 0 | 0 | 100% |
| oneOf | 27 | 0 | 0 | 100% |
| pattern | 9 | 0 | 0 | 100% |
| patternProperties | 23 | 0 | 0 | 100% |
| prefixItems | 11 | 0 | 0 | 100% |
| properties | 28 | 0 | 0 | 100% |
| propertyNames | 20 | 0 | 0 | 100% |
| ref | 79 | 0 | 0 | 100% |
| refOfUnknownKeyword | 10 | 0 | 0 | 100% |
| refRemote | 15 | 16 | 0 | 48% |
| regex | 8 | 0 | 0 | 100% |
| relative-json-pointer | 18 | 0 | 0 | 100% |
| required | 16 | 0 | 0 | 100% |
| time | 35 | 0 | 11 | 100% |
| type | 80 | 0 | 0 | 100% |
| unevaluatedItems | 71 | 0 | 0 | 100% |
| unevaluatedProperties | 125 | 0 | 0 | 100% |
| uniqueItems | 69 | 0 | 0 | 100% |
| unknown | 7 | 0 | 0 | 100% |
| unknownKeyword | 0 | 0 | 3 | N/A |
| uri | 36 | 0 | 0 | 100% |
| uri-reference | 15 | 0 | 0 | 100% |
| uri-template | 10 | 0 | 0 | 100% |
| uuid | 22 | 0 | 0 | 100% |
| vocabulary | 4 | 1 | 0 | 80% |

## Failures

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

### refRemote / remote ref

**Test**: remote ref valid
**Expected**: valid
**Actual**: invalid

### refRemote / fragment within remote ref

**Test**: remote fragment valid
**Expected**: valid
**Actual**: invalid

### refRemote / anchor within remote ref

**Test**: remote anchor valid
**Expected**: valid
**Actual**: invalid

### refRemote / ref within remote ref

**Test**: ref within ref valid
**Expected**: valid
**Actual**: invalid

### refRemote / base URI change

**Test**: base URI change ref valid
**Expected**: valid
**Actual**: invalid

### refRemote / base URI change - change folder

**Test**: number is valid
**Expected**: valid
**Actual**: invalid

### refRemote / base URI change - change folder in subschema

**Test**: number is valid
**Expected**: valid
**Actual**: invalid

### refRemote / root ref in remote ref

**Test**: string is valid
**Expected**: valid
**Actual**: invalid

### refRemote / root ref in remote ref

**Test**: null is valid
**Expected**: valid
**Actual**: invalid

### refRemote / remote ref with ref to defs

**Test**: valid
**Expected**: valid
**Actual**: invalid

### refRemote / Location-independent identifier in remote ref

**Test**: integer is valid
**Expected**: valid
**Actual**: invalid

### refRemote / retrieved nested refs resolve relative to their URI not $id

**Test**: string is valid
**Expected**: valid
**Actual**: invalid

### refRemote / remote HTTP ref with different $id

**Test**: string is valid
**Expected**: valid
**Actual**: invalid

### refRemote / remote HTTP ref with different URN $id

**Test**: string is valid
**Expected**: valid
**Actual**: invalid

### refRemote / remote HTTP ref with nested absolute ref

**Test**: string is valid
**Expected**: valid
**Actual**: invalid

### refRemote / $ref to $ref finds detached $anchor

**Test**: number is valid
**Expected**: valid
**Actual**: invalid

### vocabulary / schema that uses custom metaschema with with no validation vocabulary

**Test**: no validation: invalid number, but it still validates
**Expected**: valid
**Actual**: invalid
