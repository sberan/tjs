import type {
  JsonValue,
  JsonObject,
  JsonArray,
  JsonSchema,
  JsonSchemaBase,
  JsonSchemaType,
  PrimitiveTypeMap,
} from './types.js';

// Helper to simplify intersection types and remove readonly modifiers
type Simplify<T> = { -readonly [K in keyof T]: T[K] } & {};

// Infer TypeScript type from a JSON Schema
// Root is the root schema for resolving '#' refs
// Defs are the combined $defs and definitions
// Depth parameter prevents infinite recursion on circular $refs
// Supports shorthand: 'string' is equivalent to { type: 'string' }
export type Infer<
  S,
  Defs = GetDefs<S>,
  Depth extends unknown[] = [],
  Root = S,
> = Depth['length'] extends 15
  ? unknown // Recursion limit reached - prevent TypeScript "excessively deep" error
  : S extends boolean
    ? S extends true
      ? unknown
      : never
    : S extends JsonSchemaType
      ? InferShorthand<S>
      : S extends JsonSchemaBase
        ? InferSchema<S, Defs, Depth, Root>
        : unknown;

// Infer from shorthand type string (e.g., 'string', 'number', 'object', 'array')
type InferShorthand<T extends JsonSchemaType> = T extends 'object'
  ? Record<string, unknown>
  : T extends 'array'
    ? unknown[]
    : T extends keyof PrimitiveTypeMap
      ? PrimitiveTypeMap[T]
      : unknown;

// Extract $defs and definitions from schema (supporting both draft-2020-12 and draft-07)
type GetDefs<S> = S extends { $defs: infer D; definitions: infer D2 }
  ? D & D2
  : S extends { $defs: infer D }
    ? D
    : S extends { definitions: infer D }
      ? D
      : {};

// Main inference for schema objects
type InferSchema<S extends JsonSchemaBase, Defs, Depth extends unknown[], Root> =
  // Handle $ref first
  S extends { $ref: infer R extends string }
    ? InferRef<R, Defs, Depth, Root>
    : // Handle const
      S extends { const: infer C }
      ? C
      : // Handle enum
        S extends { enum: readonly (infer E)[] }
        ? E
        : // Handle anyOf - if base has type, use it to constrain branches
          S extends { anyOf: readonly JsonSchema[] }
          ? InferAnyOf<S, Defs, Depth, Root>
          : // Handle oneOf (same as anyOf for types)
            S extends { oneOf: readonly JsonSchema[] }
            ? InferOneOf<S, Defs, Depth, Root>
            : // Handle allOf - include base schema type in intersection
              S extends { allOf: readonly JsonSchema[] }
              ? InferAllOfWithBase<S, Defs, Depth, Root>
              : // Handle not
                S extends { not: infer N }
                ? InferNot<N>
                : // Handle if/then/else - merge base schema with branch schemas
                  S extends {
                      if: JsonSchema;
                      then: infer T extends JsonSchema;
                      else: infer E extends JsonSchema;
                    }
                  ?
                      | InferConditionalBranch<S, T, Defs, Depth, Root>
                      | InferConditionalBranch<S, E, Defs, Depth, Root>
                  : S extends { if: JsonSchema; then: infer T extends JsonSchema }
                    ?
                        | InferConditionalBranch<S, T, Defs, Depth, Root>
                        | InferType<S, Defs, Depth, Root>
                    : // Handle if/else (no then) - if matches → base type applies, else → E
                      S extends { if: JsonSchema; else: infer E extends JsonSchema }
                      ?
                          | InferType<S, Defs, Depth, Root>
                          | InferConditionalBranch<S, E, Defs, Depth, Root>
                      : // Handle type
                        InferType<S, Defs, Depth, Root>;

// Infer from type field
type InferType<S extends JsonSchemaBase, Defs, Depth extends unknown[], Root> = S extends {
  type: infer T;
}
  ? T extends readonly (infer U extends JsonSchemaType)[]
    ? InferTypeUnion<U, S, Defs, Depth, Root>
    : T extends 'object'
      ? InferObject<S, Defs, Depth, Root>
      : T extends 'array'
        ? InferArray<S, Defs, Depth, Root>
        : T extends keyof PrimitiveTypeMap
          ? PrimitiveTypeMap[T]
          : unknown
  : unknown;

// Handle type arrays like ['object', 'null'] - preserve structure for object/array
type InferTypeUnion<
  U extends JsonSchemaType,
  S extends JsonSchemaBase,
  Defs,
  Depth extends unknown[],
  Root,
> = U extends 'object'
  ? InferObject<S, Defs, Depth, Root>
  : U extends 'array'
    ? InferArray<S, Defs, Depth, Root>
    : MapType<U>;

// Map JSON Schema types to TS types
type MapType<T extends JsonSchemaType> = T extends 'string'
  ? string
  : T extends 'number'
    ? number
    : T extends 'integer'
      ? number
      : T extends 'boolean'
        ? boolean
        : T extends 'null'
          ? null
          : T extends 'array'
            ? unknown[]
            : T extends 'object'
              ? Record<string, unknown>
              : never;

// Infer object type
type InferObject<S extends JsonSchemaBase, Defs, Depth extends unknown[], Root> = S extends {
  properties: infer P extends Record<string, JsonSchema>;
}
  ? S extends { required: readonly string[] }
    ? S extends { additionalProperties: infer AP }
      ? AP extends false
        ? BuildObject<P, S['required'], Defs, Depth, Root>
        : AP extends JsonSchema
          ? BuildObject<P, S['required'], Defs, Depth, Root> & {
              [K in string as K extends keyof P ? never : K]: Infer<AP, Defs, Depth, Root>;
            }
          : BuildObject<P, S['required'], Defs, Depth, Root>
      : BuildObject<P, S['required'], Defs, Depth, Root>
    : S extends { additionalProperties: infer AP }
      ? AP extends false
        ? BuildObject<P, [], Defs, Depth, Root>
        : AP extends JsonSchema
          ? BuildObject<P, [], Defs, Depth, Root> & {
              [K in string as K extends keyof P ? never : K]: Infer<AP, Defs, Depth, Root>;
            }
          : BuildObject<P, [], Defs, Depth, Root>
      : BuildObject<P, [], Defs, Depth, Root>
  : // No properties - check for required without properties
    S extends { required: readonly string[] }
    ? BuildObject<{}, S['required'], Defs, Depth, Root>
    : Record<string, unknown>;

// Build object with required/optional handling
// Also adds `unknown` for required properties not defined in properties
type BuildObject<
  P extends Record<string, JsonSchema>,
  R extends readonly string[],
  Defs,
  Depth extends unknown[],
  Root,
> = Simplify<
  // Required properties from P
  {
    [K in keyof P as K extends R[number] ? K : never]: Infer<P[K], Defs, Depth, Root>;
  } & {
    // Optional properties from P
    [K in keyof P as K extends R[number] ? never : K]?: Infer<P[K], Defs, Depth, Root>;
  } & { [K in R[number] as K extends keyof P ? never : K]: unknown } // Required properties NOT in P get type `unknown`
>;

// Infer array type
// Supports both draft-2020-12 (prefixItems + items) and draft-07 (items array + additionalItems)
// Note: Both items: false and unevaluatedItems: false close a tuple
type InferArray<S extends JsonSchemaBase, Defs, Depth extends unknown[], Root> =
  // Draft-2020-12: prefixItems + items
  S extends { prefixItems: readonly JsonSchema[] }
    ? S extends { items: false }
      ? InferTupleFromArray<S['prefixItems'], Defs, Depth, Root>
      : S extends { unevaluatedItems: false }
        ? InferTupleFromArray<S['prefixItems'], Defs, Depth, Root>
        : S extends { items: infer I extends JsonSchema }
          ? [
              ...InferTupleFromArray<S['prefixItems'], Defs, Depth, Root>,
              ...Infer<I, Defs, Depth, Root>[],
            ]
          : [...InferTupleFromArray<S['prefixItems'], Defs, Depth, Root>, ...unknown[]]
    : // Draft-07: items is an array (acts like prefixItems)
      S extends { items: readonly JsonSchema[] }
      ? S extends { additionalItems: false }
        ? InferTupleFromArray<S['items'], Defs, Depth, Root>
        : S extends { additionalItems: infer AI extends JsonSchema }
          ? [
              ...InferTupleFromArray<S['items'], Defs, Depth, Root>,
              ...Infer<AI, Defs, Depth, Root>[],
            ]
          : [...InferTupleFromArray<S['items'], Defs, Depth, Root>, ...unknown[]]
      : // items is a single schema (applies to all items)
        S extends { items: false }
        ? []
        : S extends { items: infer I extends JsonSchema }
          ? Infer<I, Defs, Depth, Root>[]
          : unknown[];

// Build tuple type from prefixItems array
type InferTupleFromArray<
  T extends readonly JsonSchema[],
  Defs,
  Depth extends unknown[],
  Root,
> = T extends readonly [infer Head extends JsonSchema, ...infer Tail extends readonly JsonSchema[]]
  ? [Infer<Head, Defs, Depth, Root>, ...InferTupleFromArray<Tail, Defs, Depth, Root>]
  : [];

// Infer a conditional branch (then/else) by merging with base schema
// If branch has const/enum/type, use it directly. Otherwise merge base properties with branch properties.
type InferConditionalBranch<
  Base extends JsonSchemaBase,
  Branch extends JsonSchema,
  Defs,
  Depth extends unknown[],
  Root,
> = Branch extends { const: infer C }
  ? // Branch has const - use it directly
    C
  : Branch extends { enum: readonly (infer E)[] }
    ? // Branch has enum - use it directly
      E
    : Branch extends { type: JsonSchemaType | JsonSchemaType[] }
      ? // Branch has explicit type - infer it directly
        Infer<Branch, Defs, Depth, Root>
      : // Branch is partial - merge with base schema
        Branch extends { properties: infer BP extends Record<string, JsonSchema> }
        ? Base extends {
            type: 'object';
            properties: infer BaseP extends Record<string, JsonSchema>;
          }
          ? // Merge base properties with branch properties, branch required takes precedence
            Branch extends { required: readonly string[] }
            ? InferMergedObject<BaseP, BP, Branch['required'], Defs, Depth, Root>
            : InferMergedObject<BaseP, BP, [], Defs, Depth, Root>
          : // Base is object type but no properties - just use branch properties
            Base extends { type: 'object' }
            ? Branch extends { required: readonly string[] }
              ? BuildObject<BP, Branch['required'], Defs, Depth, Root>
              : BuildObject<BP, [], Defs, Depth, Root>
            : // Base is not object - try to infer branch directly
              Infer<Branch, Defs, Depth, Root>
        : // Branch has no properties - use base type
          InferType<Base, Defs, Depth, Root>;

// Merge base object properties with branch properties
type InferMergedObject<
  BaseP extends Record<string, JsonSchema>,
  BranchP extends Record<string, JsonSchema>,
  R extends readonly string[],
  Defs,
  Depth extends unknown[],
  Root,
> = Simplify<
  // Required properties from merged set
  {
    [K in keyof (BaseP & BranchP) as K extends R[number] ? K : never]: Infer<
      (BaseP & BranchP)[K],
      Defs,
      Depth,
      Root
    >;
  } & {
    // Optional properties from merged set
    [K in keyof (BaseP & BranchP) as K extends R[number] ? never : K]?: Infer<
      (BaseP & BranchP)[K],
      Defs,
      Depth,
      Root
    >;
  } & { [K in R[number] as K extends keyof (BaseP & BranchP) ? never : K]: unknown } // Required properties NOT in merged set get type `unknown`
>;

// Handle allOf (intersection) - just the array items
type InferAllOf<
  T extends readonly JsonSchema[],
  Defs,
  Depth extends unknown[],
  Root,
> = T extends readonly [infer Head extends JsonSchema]
  ? Infer<Head, Defs, Depth, Root>
  : T extends readonly [infer Head extends JsonSchema, ...infer Tail extends readonly JsonSchema[]]
    ? Infer<Head, Defs, Depth, Root> & InferAllOf<Tail, Defs, Depth, Root>
    : unknown;

// Handle allOf with base schema - include base type in intersection
type InferAllOfWithBase<S extends JsonSchemaBase, Defs, Depth extends unknown[], Root> = S extends {
  allOf: readonly JsonSchema[];
}
  ? S extends { type: JsonSchemaType | JsonSchemaType[] }
    ? InferType<S, Defs, Depth, Root> & InferAllOf<S['allOf'], Defs, Depth, Root>
    : InferAllOf<S['allOf'], Defs, Depth, Root>
  : unknown;

// Handle anyOf - if base has type, constrain the result
type InferAnyOf<S extends JsonSchemaBase, Defs, Depth extends unknown[], Root> = S extends {
  anyOf: readonly (infer U extends JsonSchema)[];
}
  ? S extends { type: JsonSchemaType | JsonSchemaType[] }
    ? // Base has a type - the anyOf branches must also satisfy it
      // If branch has type, use it; otherwise inherit from base
      InferAnyOfBranches<S['anyOf'], S, Defs, Depth, Root>
    : // No base type - just union the branches
      Infer<U, Defs, Depth, Root>
  : unknown;

// Handle oneOf - same logic as anyOf for types
type InferOneOf<S extends JsonSchemaBase, Defs, Depth extends unknown[], Root> = S extends {
  oneOf: readonly (infer U extends JsonSchema)[];
}
  ? S extends { type: JsonSchemaType | JsonSchemaType[] }
    ? InferAnyOfBranches<S['oneOf'], S, Defs, Depth, Root>
    : Infer<U, Defs, Depth, Root>
  : unknown;

// Infer anyOf/oneOf branches, inheriting base type when branch has no type
type InferAnyOfBranches<
  Branches extends readonly JsonSchema[],
  Base extends JsonSchemaBase,
  Defs,
  Depth extends unknown[],
  Root,
> = Branches extends readonly (infer B extends JsonSchema)[]
  ? B extends { type: JsonSchemaType | JsonSchemaType[] }
    ? // Branch has its own type - use it directly
      Infer<B, Defs, Depth, Root>
    : B extends { const: infer C }
      ? // Branch has const - use it directly
        C
      : B extends { enum: readonly (infer E)[] }
        ? // Branch has enum - use it directly
          E
        : // Branch has no type/const/enum - inherit from base
          InferType<Base, Defs, Depth, Root>
  : unknown;

// Handle $ref resolution with depth tracking to prevent infinite recursion
// '#' resolves to the root schema (passed through as Root parameter)
// '#/$defs/Name' and '#/definitions/Name' resolve from the Defs map
type InferRef<R extends string, Defs, Depth extends unknown[], Root> = R extends '#'
  ? Infer<Root, Defs, [...Depth, unknown], Root> // Root reference - recurse with depth increment
  : R extends `#/$defs/${infer Name}`
    ? Name extends keyof Defs
      ? Defs[Name] extends JsonSchema
        ? Infer<Defs[Name], Defs, [...Depth, unknown], Root> // Increment depth on $ref
        : unknown
      : unknown
    : R extends `#/definitions/${infer Name}`
      ? Name extends keyof Defs
        ? Defs[Name] extends JsonSchema
          ? Infer<Defs[Name], Defs, [...Depth, unknown], Root>
          : unknown
        : unknown
      : unknown;

// Handle not (exclude from JsonValue)
// Supports both single types and type arrays
// Uses explicit union building instead of Exclude for cleaner type output
// Force evaluation to avoid showing the helper type name
type InferNot<N> = N extends { type: readonly string[] }
  ? EvalNotType<BuildNotType<N['type']>>
  : N extends { type: string }
    ? EvalNotType<BuildNotType<readonly [N['type']]>>
    : JsonValue;

// Force TypeScript to fully evaluate the union type
type EvalNotType<T> = T extends infer U ? U : never;

// Build the "not" type by including only types NOT in the excluded set
// Note: 'integer' and 'number' both map to TS number, so excluding either excludes number
type ExcludesNumber<T extends readonly string[]> = 'number' extends T[number]
  ? true
  : 'integer' extends T[number]
    ? true
    : false;

type BuildNotType<Excluded extends readonly string[]> =
  | ('string' extends Excluded[number] ? never : string)
  | (ExcludesNumber<Excluded> extends true ? never : number)
  | ('boolean' extends Excluded[number] ? never : boolean)
  | ('null' extends Excluded[number] ? never : null)
  | ('array' extends Excluded[number] ? never : JsonArray)
  | ('object' extends Excluded[number] ? never : JsonObject);
