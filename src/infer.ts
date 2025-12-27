import type { JsonValue, JsonObject, JsonArray, JsonSchema, JsonSchemaBase, PrimitiveTypeMap } from './types.js';

// Helper to simplify intersection types and remove readonly modifiers
type Simplify<T> = { -readonly [K in keyof T]: T[K] } & {};

// Infer TypeScript type from a JSON Schema
// Depth parameter prevents infinite recursion on circular $refs
export type Infer<S, Defs = GetDefs<S>, Depth extends unknown[] = []> =
  Depth['length'] extends 15
    ? unknown  // Recursion limit reached - prevent TypeScript "excessively deep" error
    : S extends boolean
      ? S extends true ? unknown : never
      : S extends JsonSchemaBase
        ? InferSchema<S, Defs, Depth>
        : unknown;

// Extract $defs from schema
type GetDefs<S> = S extends { $defs: infer D } ? D : {};

// Main inference for schema objects
type InferSchema<S extends JsonSchemaBase, Defs, Depth extends unknown[]> =
  // Handle $ref first
  S extends { $ref: infer R extends string }
    ? InferRef<R, Defs, Depth>
    // Handle const
    : S extends { const: infer C }
      ? C
      // Handle enum
      : S extends { enum: readonly (infer E)[] }
        ? E
        // Handle anyOf
        : S extends { anyOf: readonly (infer U extends JsonSchema)[] }
          ? Infer<U, Defs, Depth>
          // Handle oneOf (same as anyOf for types)
          : S extends { oneOf: readonly (infer U extends JsonSchema)[] }
            ? Infer<U, Defs, Depth>
            // Handle allOf
            : S extends { allOf: readonly JsonSchema[] }
              ? InferAllOf<S['allOf'], Defs, Depth>
              // Handle not
              : S extends { not: infer N }
                ? InferNot<N>
                // Handle if/then/else
                : S extends { if: JsonSchema; then: infer T extends JsonSchema; else: infer E extends JsonSchema }
                  ? Infer<T, Defs, Depth> | Infer<E, Defs, Depth>
                  : S extends { if: JsonSchema; then: infer T extends JsonSchema }
                    ? Infer<T, Defs, Depth> | InferType<S, Defs, Depth>
                    // Handle if/else (no then) - if matches → base type applies, else → E
                    : S extends { if: JsonSchema; else: infer E extends JsonSchema }
                      ? InferType<S, Defs, Depth> | Infer<E, Defs, Depth>
                      // Handle type
                      : InferType<S, Defs, Depth>;

// Infer from type field
type InferType<S extends JsonSchemaBase, Defs, Depth extends unknown[]> =
  S extends { type: infer T }
    ? T extends readonly (infer U extends JsonSchemaType)[]
      ? InferTypeUnion<U, S, Defs, Depth>
      : T extends 'object'
        ? InferObject<S, Defs, Depth>
        : T extends 'array'
          ? InferArray<S, Defs, Depth>
          : T extends keyof PrimitiveTypeMap
            ? PrimitiveTypeMap[T]
            : unknown
    : unknown;

// Handle type arrays like ['object', 'null'] - preserve structure for object/array
type InferTypeUnion<U extends JsonSchemaType, S extends JsonSchemaBase, Defs, Depth extends unknown[]> =
  U extends 'object'
    ? InferObject<S, Defs, Depth>
    : U extends 'array'
      ? InferArray<S, Defs, Depth>
      : MapType<U>;

// Map JSON Schema types to TS types
type JsonSchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'null' | 'array' | 'object';

type MapType<T extends JsonSchemaType> =
  T extends 'string' ? string :
  T extends 'number' ? number :
  T extends 'integer' ? number :
  T extends 'boolean' ? boolean :
  T extends 'null' ? null :
  T extends 'array' ? unknown[] :
  T extends 'object' ? Record<string, unknown> :
  never;

// Infer object type
type InferObject<S extends JsonSchemaBase, Defs, Depth extends unknown[]> =
  S extends { properties: infer P extends Record<string, JsonSchema> }
    ? S extends { required: readonly string[] }
      ? S extends { additionalProperties: infer AP }
        ? AP extends false
          ? BuildObject<P, S['required'], Defs, Depth>
          : AP extends JsonSchema
            ? BuildObject<P, S['required'], Defs, Depth> & { [K in string as K extends keyof P ? never : K]: Infer<AP, Defs, Depth> }
            : BuildObject<P, S['required'], Defs, Depth>
        : BuildObject<P, S['required'], Defs, Depth>
      : S extends { additionalProperties: infer AP }
        ? AP extends false
          ? BuildObject<P, [], Defs, Depth>
          : AP extends JsonSchema
            ? BuildObject<P, [], Defs, Depth> & { [K in string as K extends keyof P ? never : K]: Infer<AP, Defs, Depth> }
            : BuildObject<P, [], Defs, Depth>
        : BuildObject<P, [], Defs, Depth>
    : Record<string, unknown>;

// Build object with required/optional handling
// Also adds `unknown` for required properties not defined in properties
type BuildObject<
  P extends Record<string, JsonSchema>,
  R extends readonly string[],
  Defs,
  Depth extends unknown[]
> = Simplify<
  // Required properties from P
  { [K in keyof P as K extends R[number] ? K : never]: Infer<P[K], Defs, Depth> } &
  // Optional properties from P
  { [K in keyof P as K extends R[number] ? never : K]?: Infer<P[K], Defs, Depth> } &
  // Required properties NOT in P get type `unknown`
  { [K in R[number] as K extends keyof P ? never : K]: unknown }
>;

// Infer array type
type InferArray<S extends JsonSchemaBase, Defs, Depth extends unknown[]> =
  S extends { prefixItems: readonly (infer PI extends JsonSchema)[] }
    ? S extends { items: false }
      ? InferTupleFromArray<S['prefixItems'], Defs, Depth>
      : S extends { items: infer I extends JsonSchema }
        ? [...InferTupleFromArray<S['prefixItems'], Defs, Depth>, ...Infer<I, Defs, Depth>[]]
        : [...InferTupleFromArray<S['prefixItems'], Defs, Depth>, ...unknown[]]
    : S extends { items: false }
      ? []
      : S extends { items: infer I extends JsonSchema }
        ? Infer<I, Defs, Depth>[]
        : unknown[];

// Build tuple type from prefixItems array
type InferTupleFromArray<T extends readonly JsonSchema[], Defs, Depth extends unknown[]> =
  T extends readonly [infer Head extends JsonSchema, ...infer Tail extends readonly JsonSchema[]]
    ? [Infer<Head, Defs, Depth>, ...InferTupleFromArray<Tail, Defs, Depth>]
    : [];

// Handle allOf (intersection)
type InferAllOf<T extends readonly JsonSchema[], Defs, Depth extends unknown[]> =
  T extends readonly [infer Head extends JsonSchema]
    ? Infer<Head, Defs, Depth>
    : T extends readonly [infer Head extends JsonSchema, ...infer Tail extends readonly JsonSchema[]]
      ? Infer<Head, Defs, Depth> & InferAllOf<Tail, Defs, Depth>
      : unknown;

// Handle $ref resolution with depth tracking to prevent infinite recursion
type InferRef<R extends string, Defs, Depth extends unknown[]> =
  R extends `#/$defs/${infer Name}`
    ? Name extends keyof Defs
      ? Defs[Name] extends JsonSchema
        ? Infer<Defs[Name], Defs, [...Depth, unknown]>  // Increment depth on $ref
        : unknown
      : unknown
    : unknown;

// Handle not (exclude from JsonValue)
// Supports both single types and type arrays
// Uses explicit union building instead of Exclude for cleaner type output
type InferNot<N> =
  N extends { type: readonly string[] }
    ? BuildNotType<N['type']>
    : N extends { type: string }
      ? BuildNotType<readonly [N['type']]>
      : JsonValue;

// Build the "not" type by including only types NOT in the excluded set
// Note: 'integer' and 'number' both map to TS number, so excluding either excludes number
type ExcludesNumber<T extends readonly string[]> = 'number' extends T[number] ? true : 'integer' extends T[number] ? true : false;

type BuildNotType<Excluded extends readonly string[]> =
  | ('string' extends Excluded[number] ? never : string)
  | (ExcludesNumber<Excluded> extends true ? never : number)
  | ('boolean' extends Excluded[number] ? never : boolean)
  | ('null' extends Excluded[number] ? never : null)
  | ('array' extends Excluded[number] ? never : JsonArray)
  | ('object' extends Excluded[number] ? never : JsonObject);
