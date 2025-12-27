import type { JsonValue, JsonObject, JsonArray, JsonSchema, JsonSchemaBase, PrimitiveTypeMap } from './types.js';

// Helper to simplify intersection types and remove readonly modifiers
type Simplify<T> = { -readonly [K in keyof T]: T[K] } & {};

// Infer TypeScript type from a JSON Schema
export type Infer<S, Defs = GetDefs<S>> =
  S extends boolean
    ? S extends true ? unknown : never
    : S extends JsonSchemaBase
      ? InferSchema<S, Defs>
      : unknown;

// Extract $defs from schema
type GetDefs<S> = S extends { $defs: infer D } ? D : {};

// Main inference for schema objects
type InferSchema<S extends JsonSchemaBase, Defs> =
  // Handle $ref first
  S extends { $ref: infer R extends string }
    ? InferRef<R, Defs>
    // Handle const
    : S extends { const: infer C }
      ? C
      // Handle enum
      : S extends { enum: readonly (infer E)[] }
        ? E
        // Handle anyOf
        : S extends { anyOf: readonly (infer U extends JsonSchema)[] }
          ? Infer<U, Defs>
          // Handle oneOf (same as anyOf for types)
          : S extends { oneOf: readonly (infer U extends JsonSchema)[] }
            ? Infer<U, Defs>
            // Handle allOf
            : S extends { allOf: readonly JsonSchema[] }
              ? InferAllOf<S['allOf'], Defs>
              // Handle not
              : S extends { not: infer N }
                ? InferNot<N>
                // Handle if/then/else
                : S extends { if: JsonSchema; then: infer T extends JsonSchema; else: infer E extends JsonSchema }
                  ? Infer<T, Defs> | Infer<E, Defs>
                  : S extends { if: JsonSchema; then: infer T extends JsonSchema }
                    ? Infer<T, Defs> | InferType<S, Defs>
                    // Handle if/else (no then) - if matches → base type applies, else → E
                    : S extends { if: JsonSchema; else: infer E extends JsonSchema }
                      ? InferType<S, Defs> | Infer<E, Defs>
                      // Handle type
                      : InferType<S, Defs>;

// Infer from type field
type InferType<S extends JsonSchemaBase, Defs> =
  S extends { type: infer T }
    ? T extends readonly (infer U extends JsonSchemaType)[]
      ? InferTypeUnion<U, S, Defs>
      : T extends 'object'
        ? InferObject<S, Defs>
        : T extends 'array'
          ? InferArray<S, Defs>
          : T extends keyof PrimitiveTypeMap
            ? PrimitiveTypeMap[T]
            : unknown
    : unknown;

// Handle type arrays like ['object', 'null'] - preserve structure for object/array
type InferTypeUnion<U extends JsonSchemaType, S extends JsonSchemaBase, Defs> =
  U extends 'object'
    ? InferObject<S, Defs>
    : U extends 'array'
      ? InferArray<S, Defs>
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
type InferObject<S extends JsonSchemaBase, Defs> =
  S extends { properties: infer P extends Record<string, JsonSchema> }
    ? S extends { required: readonly string[] }
      ? S extends { additionalProperties: infer AP }
        ? AP extends false
          ? BuildObject<P, S['required'], Defs>
          : AP extends JsonSchema
            ? BuildObject<P, S['required'], Defs> & { [K in string as K extends keyof P ? never : K]: Infer<AP, Defs> }
            : BuildObject<P, S['required'], Defs>
        : BuildObject<P, S['required'], Defs>
      : S extends { additionalProperties: infer AP }
        ? AP extends false
          ? BuildObject<P, [], Defs>
          : AP extends JsonSchema
            ? BuildObject<P, [], Defs> & { [K in string as K extends keyof P ? never : K]: Infer<AP, Defs> }
            : BuildObject<P, [], Defs>
        : BuildObject<P, [], Defs>
    : Record<string, unknown>;

// Build object with required/optional handling
type BuildObject<
  P extends Record<string, JsonSchema>,
  R extends readonly string[],
  Defs
> = Simplify<
  { [K in keyof P as K extends R[number] ? K : never]: Infer<P[K], Defs> } &
  { [K in keyof P as K extends R[number] ? never : K]?: Infer<P[K], Defs> }
>;

// Infer array type
type InferArray<S extends JsonSchemaBase, Defs> =
  S extends { prefixItems: readonly (infer PI extends JsonSchema)[] }
    ? S extends { items: false }
      ? InferTupleFromArray<S['prefixItems'], Defs>
      : S extends { items: infer I extends JsonSchema }
        ? [...InferTupleFromArray<S['prefixItems'], Defs>, ...Infer<I, Defs>[]]
        : [...InferTupleFromArray<S['prefixItems'], Defs>, ...unknown[]]
    : S extends { items: false }
      ? []
      : S extends { items: infer I extends JsonSchema }
        ? Infer<I, Defs>[]
        : unknown[];

// Build tuple type from prefixItems array
type InferTupleFromArray<T extends readonly JsonSchema[], Defs> =
  T extends readonly [infer Head extends JsonSchema, ...infer Tail extends readonly JsonSchema[]]
    ? [Infer<Head, Defs>, ...InferTupleFromArray<Tail, Defs>]
    : [];

// Handle allOf (intersection)
type InferAllOf<T extends readonly JsonSchema[], Defs> =
  T extends readonly [infer Head extends JsonSchema]
    ? Infer<Head, Defs>
    : T extends readonly [infer Head extends JsonSchema, ...infer Tail extends readonly JsonSchema[]]
      ? Infer<Head, Defs> & InferAllOf<Tail, Defs>
      : unknown;

// Handle $ref resolution
type InferRef<R extends string, Defs> =
  R extends `#/$defs/${infer Name}`
    ? Name extends keyof Defs
      ? Defs[Name] extends JsonSchema
        ? Infer<Defs[Name], Defs>
        : unknown
      : unknown
    : unknown;

// Handle not (exclude from JsonValue)
type InferNot<N> =
  N extends { type: 'null' }
    ? string | number | boolean | JsonArray | JsonObject
    : N extends { type: 'string' }
      ? number | boolean | null | JsonArray | JsonObject
      : N extends { type: 'number' } | { type: 'integer' }
        ? string | boolean | null | JsonArray | JsonObject
        : N extends { type: 'boolean' }
          ? string | number | null | JsonArray | JsonObject
          : N extends { type: 'object' }
            ? string | number | boolean | null | JsonArray
            : N extends { type: 'array' }
              ? string | number | boolean | null | JsonObject
              : JsonValue;
