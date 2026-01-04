import { schema } from 'tjs';

// =============================================================================
// $ref and $defs - Schema References
// =============================================================================

// Simple $ref (using additionalProperties: false)
const SimpleRef = schema({
  $defs: {
    Item: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
      additionalProperties: false,
    },
  },
  type: 'array',
  items: { $ref: '#/$defs/Item' },
});
SimpleRef.type; // $ExpectType { id: string }[]

// Multiple refs to same definition (using additionalProperties: false)
const MultiRef = schema({
  $defs: {
    Address: {
      type: 'object',
      properties: {
        street: { type: 'string' },
        city: { type: 'string' },
      },
      required: ['street', 'city'],
      additionalProperties: false,
    },
  },
  type: 'object',
  properties: {
    home: { $ref: '#/$defs/Address' },
    work: { $ref: '#/$defs/Address' },
  },
  additionalProperties: false,
});
MultiRef.type; // $ExpectType { home?: { street: string; city: string }; work?: { street: string; city: string } }

// Multiple definitions (using additionalProperties: false)
const MultipleDefs = schema({
  $defs: {
    Name: {
      type: 'object',
      properties: {
        first: { type: 'string' },
        last: { type: 'string' },
      },
      required: ['first', 'last'],
      additionalProperties: false,
    },
    Age: {
      type: 'integer',
    },
  },
  type: 'object',
  properties: {
    name: { $ref: '#/$defs/Name' },
    age: { $ref: '#/$defs/Age' },
  },
  required: ['name', 'age'],
  additionalProperties: false,
});
MultipleDefs.type; // $ExpectType { name: { first: string; last: string }; age: number }

// Ref in anyOf
const RefInAnyOf = schema({
  $defs: {
    StringType: { type: 'string' },
    NumberType: { type: 'number' },
  },
  anyOf: [{ $ref: '#/$defs/StringType' }, { $ref: '#/$defs/NumberType' }],
});
RefInAnyOf.type; // $ExpectType string | number

// Nested object with refs (using additionalProperties: false)
const NestedWithRefs = schema({
  $defs: {
    Coordinate: {
      type: 'object',
      properties: {
        x: { type: 'number' },
        y: { type: 'number' },
      },
      required: ['x', 'y'],
      additionalProperties: false,
    },
  },
  type: 'object',
  properties: {
    start: { $ref: '#/$defs/Coordinate' },
    end: { $ref: '#/$defs/Coordinate' },
  },
  required: ['start', 'end'],
  additionalProperties: false,
});
NestedWithRefs.type; // $ExpectType { start: { x: number; y: number }; end: { x: number; y: number } }

// Deeply nested refs (ref to ref) (using additionalProperties: false)
const DeepRefs = schema({
  $defs: {
    Inner: {
      type: 'object',
      properties: { value: { type: 'string' } },
      required: ['value'],
      additionalProperties: false,
    },
    Outer: {
      type: 'object',
      properties: { inner: { $ref: '#/$defs/Inner' } },
      required: ['inner'],
      additionalProperties: false,
    },
  },
  type: 'object',
  properties: {
    outer: { $ref: '#/$defs/Outer' },
  },
  required: ['outer'],
  additionalProperties: false,
});
DeepRefs.type; // $ExpectType { outer: { inner: { value: string } } }

// =============================================================================
// Circular References - handled by depth limit
// =============================================================================

// Circular $ref expands to depth limit instead of causing TS recursion error
const CircularRef = schema({
  $defs: {
    Node: {
      type: 'object',
      properties: {
        value: { type: 'string' },
        next: { $ref: '#/$defs/Node' },
      },
    },
  },
  $ref: '#/$defs/Node',
});
// Verify structure at first level (full expansion is ~15 levels deep)
CircularRef.type.value; // $ExpectType string | undefined
CircularRef.type.next?.value; // $ExpectType  string | undefined

// Self-referential definition (direct cycle)
const DirectCycle = schema({
  $defs: {
    Self: { $ref: '#/$defs/Self' },
  },
  $ref: '#/$defs/Self',
});
DirectCycle.type; // $ExpectType unknown

// =============================================================================
// Root Reference ($ref: '#') - Recursive Types
// =============================================================================

// Root reference creates a recursive type
const RootRef = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    friend: { $ref: '#' },
  },
  required: ['name'],
});
RootRef.type.name; // $ExpectType string
RootRef.type.friend?.name; // $ExpectType string | undefined
RootRef.type.friend?.friend?.name; // $ExpectType string | undefined

// Root reference in array (tree structure)
const TreeNode = schema({
  type: 'object',
  properties: {
    value: { type: 'number' },
    children: {
      type: 'array',
      items: { $ref: '#' },
    },
  },
  required: ['value'],
});
TreeNode.type.value; // $ExpectType number
TreeNode.type.children?.[0]?.value; // $ExpectType number | undefined
TreeNode.type.children?.[0]?.children?.[0]?.value; // $ExpectType number | undefined

// =============================================================================
// Draft-07 Style: definitions instead of $defs
// =============================================================================

// Draft-07 uses "definitions" instead of "$defs" (using additionalProperties: false)
const Draft07Ref = schema({
  definitions: {
    Item: {
      type: 'object',
      properties: { id: { type: 'string' } },
      required: ['id'],
      additionalProperties: false,
    },
  },
  type: 'array',
  items: { $ref: '#/definitions/Item' },
});
Draft07Ref.type; // $ExpectType { id: string }[]

// Mixed $defs and definitions (both should work) (using additionalProperties: false)
const MixedDefs = schema({
  $defs: {
    Name: { type: 'string' },
  },
  definitions: {
    Age: { type: 'integer' },
  },
  type: 'object',
  properties: {
    name: { $ref: '#/$defs/Name' },
    age: { $ref: '#/definitions/Age' },
  },
  required: ['name', 'age'],
  additionalProperties: false,
});
MixedDefs.type; // $ExpectType { name: string; age: number }
