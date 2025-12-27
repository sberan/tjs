# JSON Schema Test Suite Compliance Report

## Summary

- **Total Tests**: 1271
- **Passed**: 1200 (94.4%)
- **Failed**: 71
- **Skipped**: 0

## By Keyword

| Keyword | Passed | Failed | Skipped | Rate |
|---------|--------|--------|---------|------|
| additionalProperties | 21 | 0 | 0 | 100% |
| allOf | 30 | 0 | 0 | 100% |
| anchor | 8 | 0 | 0 | 100% |
| anyOf | 17 | 1 | 0 | 94% |
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
| multipleOf | 9 | 1 | 0 | 90% |
| not | 38 | 2 | 0 | 95% |
| oneOf | 26 | 1 | 0 | 96% |
| pattern | 9 | 0 | 0 | 100% |
| patternProperties | 23 | 0 | 0 | 100% |
| prefixItems | 11 | 0 | 0 | 100% |
| properties | 26 | 2 | 0 | 93% |
| propertyNames | 19 | 1 | 0 | 95% |
| ref | 77 | 2 | 0 | 97% |
| refRemote | 30 | 1 | 0 | 97% |
| required | 12 | 4 | 0 | 75% |
| type | 80 | 0 | 0 | 100% |
| unevaluatedItems | 59 | 12 | 0 | 83% |
| unevaluatedProperties | 95 | 30 | 0 | 76% |
| uniqueItems | 69 | 0 | 0 | 100% |
| vocabulary | 4 | 1 | 0 | 80% |

## Failures

### anyOf / nested anyOf, to check validation semantics

**Test**: anything non-null is invalid
**Expected**: invalid
**Actual**: valid

### defs / validate definition against metaschema

**Test**: invalid definition schema
**Expected**: invalid
**Actual**: valid

### dynamicRef / A $dynamicRef resolves to the first $dynamicAnchor still in scope that is encountered when the schema is evaluated

**Test**: An array containing non-strings is invalid
**Expected**: invalid
**Actual**: valid

### dynamicRef / A $dynamicRef with intermediate scopes that don't include a matching $dynamicAnchor does not affect dynamic scope resolution

**Test**: An array containing non-strings is invalid
**Expected**: invalid
**Actual**: valid

### dynamicRef / A $dynamicRef that initially resolves to a schema with a matching $dynamicAnchor resolves to the first $dynamicAnchor in the dynamic scope

**Test**: The recursive part is not valid against the root
**Expected**: invalid
**Actual**: valid

### dynamicRef / multiple dynamic paths to the $dynamicRef keyword

**Test**: number list with string values
**Expected**: invalid
**Actual**: valid

### dynamicRef / multiple dynamic paths to the $dynamicRef keyword

**Test**: string list with number values
**Expected**: invalid
**Actual**: valid

### dynamicRef / after leaving a dynamic scope, it is not used by a $dynamicRef

**Test**: string matches /$defs/thingy, but the $dynamicRef does not stop here
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

**Test**: incorrect extended schema
**Expected**: invalid
**Actual**: valid

### dynamicRef / $ref and $dynamicAnchor are independent of order - $defs first

**Test**: incorrect extended schema
**Expected**: invalid
**Actual**: valid

### dynamicRef / $ref and $dynamicAnchor are independent of order - $ref first

**Test**: incorrect extended schema
**Expected**: invalid
**Actual**: valid

### dynamicRef / $dynamicRef avoids the root of each schema, but scopes are still registered

**Test**: data is not sufficient for schema at second#/$defs/length
**Expected**: invalid
**Actual**: valid

### multipleOf / float division = inf

**Test**: always invalid, but naive implementations may raise an overflow error
**Expected**: invalid
**Actual**: valid

### not / double negation

**Test**: any value is valid
**Expected**: valid
**Actual**: invalid

### not / collect annotations inside a 'not', even if collection is disabled

**Test**: unevaluated property
**Expected**: valid
**Actual**: invalid

### oneOf / nested oneOf, to check validation semantics

**Test**: anything non-null is invalid
**Expected**: invalid
**Actual**: valid

### properties / properties, patternProperties, additionalProperties interaction

**Test**: patternProperty invalidates property
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

### ref / order of evaluation: $id and $ref on nested schema

**Test**: data is valid against nested sibling
**Expected**: valid
**Actual**: invalid

### ref / ref with absolute-path-reference

**Test**: a string is valid
**Expected**: valid
**Actual**: invalid

### refRemote / root ref in remote ref

**Test**: object is invalid
**Expected**: invalid
**Actual**: valid

### required / required properties whose names are Javascript object property names

**Test**: none of the properties mentioned
**Expected**: invalid
**Actual**: valid

### required / required properties whose names are Javascript object property names

**Test**: __proto__ present
**Expected**: invalid
**Actual**: valid

### required / required properties whose names are Javascript object property names

**Test**: toString present
**Expected**: invalid
**Actual**: valid

### required / required properties whose names are Javascript object property names

**Test**: constructor present
**Expected**: invalid
**Actual**: valid

### unevaluatedItems / unevaluatedItems with nested items

**Test**: with invalid additional item
**Expected**: invalid
**Actual**: valid

### unevaluatedItems / unevaluatedItems with nested unevaluatedItems

**Test**: with additional items
**Expected**: valid
**Actual**: invalid

### unevaluatedItems / unevaluatedItems with anyOf

**Test**: when one schema matches and has unevaluated items
**Expected**: invalid
**Actual**: valid

### unevaluatedItems / unevaluatedItems with if/then/else

**Test**: when if matches and it has unevaluated items
**Expected**: invalid
**Actual**: valid

### unevaluatedItems / unevaluatedItems with $ref

**Test**: with no unevaluated items
**Expected**: valid
**Actual**: invalid

### unevaluatedItems / unevaluatedItems before $ref

**Test**: with no unevaluated items
**Expected**: valid
**Actual**: invalid

### unevaluatedItems / unevaluatedItems with $dynamicRef

**Test**: with no unevaluated items
**Expected**: valid
**Actual**: invalid

### unevaluatedItems / unevaluatedItems depends on multiple nested contains

**Test**: 5 not evaluated, passes unevaluatedItems
**Expected**: valid
**Actual**: invalid

### unevaluatedItems / unevaluatedItems and contains interact to control item dependency relationship

**Test**: only a's are valid
**Expected**: valid
**Actual**: invalid

### unevaluatedItems / unevaluatedItems and contains interact to control item dependency relationship

**Test**: a's and b's are valid
**Expected**: valid
**Actual**: invalid

### unevaluatedItems / unevaluatedItems and contains interact to control item dependency relationship

**Test**: a's, b's and c's are valid
**Expected**: valid
**Actual**: invalid

### unevaluatedItems / unevaluatedItems can see annotations from if without then and else

**Test**: valid in case if is evaluated
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / unevaluatedProperties with nested unevaluatedProperties

**Test**: with nested unevaluated properties
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / unevaluatedProperties with anyOf

**Test**: when one matches and has unevaluated properties
**Expected**: invalid
**Actual**: valid

### unevaluatedProperties / unevaluatedProperties with anyOf

**Test**: when two match and has unevaluated properties
**Expected**: invalid
**Actual**: valid

### unevaluatedProperties / unevaluatedProperties with if/then/else

**Test**: when if is true and has no unevaluated properties
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / unevaluatedProperties with if/then/else, then not defined

**Test**: when if is true and has no unevaluated properties
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / unevaluatedProperties with if/then/else, else not defined

**Test**: when if is true and has no unevaluated properties
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / unevaluatedProperties with dependentSchemas

**Test**: with no unevaluated properties
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / unevaluatedProperties with $ref

**Test**: with no unevaluated properties
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / unevaluatedProperties before $ref

**Test**: with no unevaluated properties
**Expected**: valid
**Actual**: invalid

### unevaluatedProperties / unevaluatedProperties with $dynamicRef

**Test**: with no unevaluated properties
**Expected**: valid
**Actual**: invalid

... and 21 more failures