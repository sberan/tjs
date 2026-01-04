// tjs type definitions for playground
// Bundled from src/types.ts and src/infer.ts

export type JsonPrimitive = string | number | boolean | null;
export type JsonArray = JsonValue[];
export type JsonObject = { [key: string]: JsonValue };
export type JsonValue = JsonPrimitive | JsonObject | JsonArray;

export type JsonSchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'null' | 'array' | 'object';

export interface JsonSchemaBase {
  $defs?: Record<string, JsonSchema>;
  definitions?: Record<string, JsonSchema>;
  $ref?: string;
  type?: JsonSchemaType | JsonSchemaType[];
  const?: JsonValue;
  enum?: readonly JsonValue[];
  properties?: Record<string, JsonSchema>;
  required?: readonly string[];
  additionalProperties?: boolean | JsonSchema;
  items?: boolean | JsonSchema | readonly JsonSchema[];
  prefixItems?: readonly JsonSchema[];
  anyOf?: readonly JsonSchema[];
  oneOf?: readonly JsonSchema[];
  allOf?: readonly JsonSchema[];
  not?: JsonSchema;
  if?: JsonSchema;
  then?: JsonSchema;
  else?: JsonSchema;
  [key: string]: unknown;
}

export type JsonSchema = boolean | JsonSchemaType | JsonSchemaBase;

export type PrimitiveTypeMap = {
  string: string;
  number: number;
  integer: number;
  boolean: boolean;
  null: null;
};

type Simplify<T> = { -readonly [K in keyof T]: T[K] } & {};

type GetDefs<S> = S extends { $defs: infer D; definitions: infer D2 }
  ? D & D2
  : S extends { $defs: infer D }
    ? D
    : S extends { definitions: infer D }
      ? D
      : {};

type InferShorthand<T extends JsonSchemaType> = T extends 'object'
  ? Record<string, unknown>
  : T extends 'array'
    ? unknown[]
    : T extends keyof PrimitiveTypeMap
      ? PrimitiveTypeMap[T]
      : unknown;

export type Infer<S, Defs = GetDefs<S>, Depth extends unknown[] = [], Root = S> =
  Depth['length'] extends 15 ? unknown
  : S extends boolean ? (S extends true ? unknown : never)
  : S extends JsonSchemaType ? InferShorthand<S>
  : S extends JsonSchemaBase ? InferSchema<S, Defs, Depth, Root>
  : unknown;

type InferSchema<S extends JsonSchemaBase, Defs, Depth extends unknown[], Root> =
  S extends { $ref: infer R extends string } ? InferRef<R, Defs, Depth, Root>
  : S extends { const: infer C } ? C
  : S extends { enum: readonly (infer E)[] } ? E
  : S extends { anyOf: readonly (infer U extends JsonSchema)[] } ? Infer<U, Defs, Depth, Root>
  : S extends { oneOf: readonly (infer U extends JsonSchema)[] } ? Infer<U, Defs, Depth, Root>
  : S extends { allOf: readonly JsonSchema[] } ? InferAllOf<S['allOf'], Defs, Depth, Root>
  : InferType<S, Defs, Depth, Root>;

type InferType<S extends JsonSchemaBase, Defs, Depth extends unknown[], Root> =
  S extends { type: infer T }
    ? T extends readonly (infer U extends JsonSchemaType)[]
      ? InferTypeUnion<U, S, Defs, Depth, Root>
      : T extends 'object' ? InferObject<S, Defs, Depth, Root>
      : T extends 'array' ? InferArray<S, Defs, Depth, Root>
      : T extends keyof PrimitiveTypeMap ? PrimitiveTypeMap[T]
      : unknown
    : unknown;

type InferTypeUnion<U extends JsonSchemaType, S extends JsonSchemaBase, Defs, Depth extends unknown[], Root> =
  U extends 'object' ? InferObject<S, Defs, Depth, Root>
  : U extends 'array' ? InferArray<S, Defs, Depth, Root>
  : MapType<U>;

type MapType<T extends JsonSchemaType> =
  T extends 'string' ? string
  : T extends 'number' ? number
  : T extends 'integer' ? number
  : T extends 'boolean' ? boolean
  : T extends 'null' ? null
  : T extends 'array' ? unknown[]
  : T extends 'object' ? Record<string, unknown>
  : never;

type InferObject<S extends JsonSchemaBase, Defs, Depth extends unknown[], Root> =
  S extends { properties: infer P extends Record<string, JsonSchema> }
    ? S extends { required: readonly string[] }
      ? BuildObject<P, S['required'], Defs, Depth, Root>
      : BuildObject<P, [], Defs, Depth, Root>
    : Record<string, unknown>;

type BuildObject<P extends Record<string, JsonSchema>, R extends readonly string[], Defs, Depth extends unknown[], Root> =
  Simplify<
    { [K in keyof P as K extends R[number] ? K : never]: Infer<P[K], Defs, Depth, Root> } &
    { [K in keyof P as K extends R[number] ? never : K]?: Infer<P[K], Defs, Depth, Root> }
  >;

type InferArray<S extends JsonSchemaBase, Defs, Depth extends unknown[], Root> =
  S extends { prefixItems: readonly JsonSchema[] }
    ? S extends { items: false } ? InferTuple<S['prefixItems'], Defs, Depth, Root>
    : S extends { items: infer I extends JsonSchema }
      ? [...InferTuple<S['prefixItems'], Defs, Depth, Root>, ...Infer<I, Defs, Depth, Root>[]]
      : [...InferTuple<S['prefixItems'], Defs, Depth, Root>, ...unknown[]]
  : S extends { items: readonly JsonSchema[] }
    ? InferTuple<S['items'], Defs, Depth, Root>
  : S extends { items: infer I extends JsonSchema }
    ? Infer<I, Defs, Depth, Root>[]
  : unknown[];

type InferTuple<T extends readonly JsonSchema[], Defs, Depth extends unknown[], Root> =
  T extends readonly [infer H extends JsonSchema, ...infer Tail extends readonly JsonSchema[]]
    ? [Infer<H, Defs, Depth, Root>, ...InferTuple<Tail, Defs, Depth, Root>]
    : [];

type InferAllOf<T extends readonly JsonSchema[], Defs, Depth extends unknown[], Root> =
  T extends readonly [infer H extends JsonSchema]
    ? Infer<H, Defs, Depth, Root>
    : T extends readonly [infer H extends JsonSchema, ...infer Tail extends readonly JsonSchema[]]
      ? Infer<H, Defs, Depth, Root> & InferAllOf<Tail, Defs, Depth, Root>
      : unknown;

type InferRef<R extends string, Defs, Depth extends unknown[], Root> =
  R extends '#' ? Infer<Root, Defs, [...Depth, unknown], Root>
  : R extends `#/$defs/${infer Name}`
    ? Name extends keyof Defs
      ? Defs[Name] extends JsonSchema ? Infer<Defs[Name], Defs, [...Depth, unknown], Root> : unknown
      : unknown
  : R extends `#/definitions/${infer Name}`
    ? Name extends keyof Defs
      ? Defs[Name] extends JsonSchema ? Infer<Defs[Name], Defs, [...Depth, unknown], Root> : unknown
      : unknown
  : unknown;

export interface Validator<T> {
  (data: unknown): boolean;
  validate(data: unknown): { valid: true; value: T; error: undefined } | { valid: false; value: undefined; error: unknown[] };
  assert(data: unknown): T;
  readonly type: T;
  errors: unknown[] | null;
}

export declare function schema<const T extends JsonSchema>(definition: T): Validator<Infer<T>>;
