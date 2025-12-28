import { schema } from 'tjs';

// =============================================================================
// if/then/else - Conditional Schema Application
// =============================================================================

// if/then/else - produces union of then/else branches
const IfThenElse = schema({
  if: { type: 'string' },
  then: { type: 'string', minLength: 1 },
  else: { type: 'number' },
});
IfThenElse.type; // $ExpectType string | number

// if/then/else with object branches (explicit types)
const IfThenElseObjects = schema({
  if: { type: 'object' },
  then: { type: 'object', properties: { discount: { type: 'number' } }, required: ['discount'] },
  else: { type: 'object', properties: { trial: { type: 'boolean' } } },
});
IfThenElseObjects.type; // $ExpectType { discount: number; } | { trial?: boolean }

// if/then/else with base object and partial branches - merges properties
const IfThenElseMerged = schema({
  type: 'object',
  properties: {
    kind: { type: 'string' },
  },
  if: { properties: { kind: { const: 'premium' } } },
  then: { properties: { discount: { type: 'number' } }, required: ['discount'] },
  else: { properties: { trial: { type: 'boolean' } } },
});
IfThenElseMerged.type; // $ExpectType { discount: number; kind?: string; } | { kind?: string; trial?: boolean; }

// if/then only (no else) - uses base type as fallback
const IfThenOnly = schema({
  type: 'string',
  if: { minLength: 5 },
  then: { pattern: '^[A-Z]' },
});
IfThenOnly.type; // $ExpectType string

// if/then where base type dominates
const IfThenBaseType = schema({
  type: 'number',
  if: { minimum: 0 },
  then: { type: 'number' },
});
IfThenBaseType.type; // $ExpectType number

// if/else only (no then)
const IfElseOnly = schema({
  type: ['string', 'number'],
  if: { type: 'string', minLength: 5 },
  else: { type: 'number', minimum: 0 },
});
IfElseOnly.type; // $ExpectType string | number

// if/then without base type - falls back to unknown
const IfThenNoBase = schema({
  if: { type: 'string' },
  then: { type: 'string' },
});
IfThenNoBase.type; // $ExpectType unknown

// if/else without then and no base type
const IfElseNoBase = schema({
  if: { type: 'string' },
  else: { type: 'number' },
});
IfElseNoBase.type; // $ExpectType unknown
