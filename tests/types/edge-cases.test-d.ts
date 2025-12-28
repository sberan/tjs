import { schema } from 'tjs';

// =============================================================================
// Boolean Schemas
// =============================================================================

// Boolean schema - true accepts anything
const True = schema(true);
True.type; // $ExpectType unknown

// Boolean schema - false accepts nothing
const False = schema(false);
False.type; // $ExpectType never

// =============================================================================
// Empty Schema
// =============================================================================

// Empty schema - accepts anything
const EmptySchema = schema({});
EmptySchema.type; // $ExpectType unknown
