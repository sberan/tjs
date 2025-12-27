import type { JsonValue, JsonObject, JsonArray } from 'type-fest';

// Primitive type names
export type JsonSchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'null' | 'array' | 'object';

// Base schema interface
export interface JsonSchemaBase {
  $defs?: Record<string, JsonSchema>;
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
  items?: boolean | JsonSchema;
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
  exclusiveMinimum?: number;
  exclusiveMaximum?: number;
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
  // Array constraints
  contains?: JsonSchema;
  minContains?: number;
  maxContains?: number;
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
}

// JsonSchema can be a boolean or an object
export type JsonSchema = boolean | JsonSchemaBase;

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
