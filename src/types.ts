import type { JsonValue, JsonObject, JsonArray } from 'type-fest';

// Primitive type names
export type JsonSchemaType =
  | 'string'
  | 'number'
  | 'integer'
  | 'boolean'
  | 'null'
  | 'array'
  | 'object';

// Base schema interface
export interface JsonSchemaBase {
  $defs?: Record<string, JsonSchema>;
  definitions?: Record<string, JsonSchema>; // draft-07 equivalent of $defs
  $ref?: string;
  type?: JsonSchemaType | JsonSchemaType[];
  const?: JsonValue;
  enum?: readonly JsonValue[];
  properties?: Record<string, JsonSchema>;
  patternProperties?: Record<string, JsonSchema>;
  propertyNames?: JsonSchema;
  required?: readonly string[];
  additionalProperties?: boolean | JsonSchema;
  $anchor?: string;
  $dynamicAnchor?: string;
  $dynamicRef?: string;
  items?: boolean | JsonSchema | readonly JsonSchema[];
  prefixItems?: readonly JsonSchema[];
  anyOf?: readonly JsonSchema[];
  oneOf?: readonly JsonSchema[];
  allOf?: readonly JsonSchema[];
  not?: JsonSchema;
  if?: JsonSchema;
  then?: JsonSchema;
  else?: JsonSchema;
  // Runtime-only constraints (don't affect types)
  format?: string;
  minimum?: number;
  maximum?: number;
  exclusiveMinimum?: number | boolean; // number in 2020-12, boolean in draft4
  exclusiveMaximum?: number | boolean; // number in 2020-12, boolean in draft4
  multipleOf?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  // Object constraints
  minProperties?: number;
  maxProperties?: number;
  dependentRequired?: Record<string, readonly string[]>;
  dependentSchemas?: Record<string, JsonSchema>;
  unevaluatedProperties?: boolean | JsonSchema;
  // Array constraints
  contains?: JsonSchema;
  minContains?: number;
  maxContains?: number;
  unevaluatedItems?: boolean | JsonSchema;
  // Legacy draft-07 keywords (for backwards compatibility)
  additionalItems?: boolean | JsonSchema;
  dependencies?: Record<string, JsonSchema | readonly string[]>;
  // Content keywords (for validating encoded content)
  contentEncoding?: string;
  contentMediaType?: string;
  contentSchema?: JsonSchema;
  // Annotations (metadata only, no validation)
  title?: string;
  description?: string;
  default?: JsonValue;
  deprecated?: boolean;
  examples?: readonly JsonValue[];
  readOnly?: boolean;
  writeOnly?: boolean;
  $comment?: string;
  $id?: string;
  id?: string; // draft-04 equivalent of $id
  $schema?: string;
  $vocabulary?: Record<string, boolean>;
}

// JsonSchema can be a boolean, type string shorthand, or an object
// Shorthand: 'string' is equivalent to { type: 'string' }
export type JsonSchema = boolean | JsonSchemaType | JsonSchemaBase;

// Helper to map JSON Schema type strings to TS types
export type PrimitiveTypeMap = {
  string: string;
  number: number;
  integer: number;
  boolean: boolean;
  null: null;
};

// Re-export for convenience
export type { JsonValue, JsonObject, JsonArray };
