/**
 * Struct helper for ergonomic object schema definition
 *
 * Usage:
 *   const Person = struct({
 *     firstName: 'string',
 *     lastName: 'string',
 *     age: { type: 'number', optional: true },
 *     email: { type: 'string', format: 'email', optional: true }
 *   });
 */

import type { JsonSchema, JsonSchemaBase, JsonSchemaType } from './types.js';
import type { Infer } from './infer.js';
import { createValidator, type Validator } from './core/index.js';
import type { CompileOptions } from './core/context.js';

// Schema with optional marker for struct
type StructSchema = JsonSchemaBase & { optional?: boolean };

// Property definition can be shorthand type string or full schema with optional marker
type StructPropertyDef = JsonSchemaType | StructSchema;

// Check if a property definition is marked as optional
type IsOptional<T> = T extends { optional: true } ? true : false;

// Build a synthetic root schema from the struct properties for $ref resolution
type BuildStructSchema<Props extends Record<string, StructPropertyDef>> = {
  type: 'object';
  properties: {
    [K in keyof Props]: Props[K] extends JsonSchemaType
      ? { type: Props[K] }
      : Omit<Props[K], 'optional'>;
  };
  required: Array<RequiredKeys<Props>>;
};

// Infer the type from a property definition, using Infer from infer.ts
// Pass Root through so Infer can resolve $ref naturally
type InferPropertyType<T extends StructPropertyDef, Root> = T extends JsonSchemaType
  ? Infer<T>
  : T extends StructSchema
    ? Infer<Omit<T, 'optional'>, {}, [], Root>
    : unknown;

// Extract keys where the property is optional
type OptionalKeys<Props extends Record<string, StructPropertyDef>> = {
  [K in keyof Props]: IsOptional<Props[K]> extends true ? K : never;
}[keyof Props];

// Extract keys where the property is required
type RequiredKeys<Props extends Record<string, StructPropertyDef>> = {
  [K in keyof Props]: IsOptional<Props[K]> extends true ? never : K;
}[keyof Props];

// Infer the full struct type
type InferStructType<Props extends Record<string, StructPropertyDef>> = {
  [K in RequiredKeys<Props>]: InferPropertyType<Props[K], BuildStructSchema<Props>>;
} & {
  [K in OptionalKeys<Props>]?: InferPropertyType<Props[K], BuildStructSchema<Props>>;
};

// Simplify the intersection
type Simplify<T> = { [K in keyof T]: T[K] } & {};

/**
 * Create a struct schema with ergonomic syntax
 *
 * @example
 * const Person = struct({
 *   firstName: 'string',
 *   lastName: 'string',
 *   age: { type: 'number', optional: true },
 * });
 *
 * // Equivalent to:
 * schema({
 *   type: 'object',
 *   properties: {
 *     firstName: { type: 'string' },
 *     lastName: { type: 'string' },
 *     age: { type: 'number' },
 *   },
 *   required: ['firstName', 'lastName'],
 * });
 */
export function struct<const Props extends Record<string, StructPropertyDef>>(
  properties: Props,
  options?: CompileOptions
): Validator<Simplify<InferStructType<Props>>> {
  // Convert property definitions to JSON Schema properties
  const schemaProperties: Record<string, JsonSchema> = {};
  const required: string[] = [];

  for (const [key, def] of Object.entries(properties)) {
    if (typeof def === 'string') {
      // Shorthand type - always required
      schemaProperties[key] = { type: def };
      required.push(key);
    } else {
      // Full schema - check for optional marker
      const { optional, ...schemaWithoutOptional } = def;
      schemaProperties[key] = schemaWithoutOptional;
      if (!optional) {
        required.push(key);
      }
    }
  }

  // Build the schema
  const schema: JsonSchemaBase = {
    type: 'object',
    properties: schemaProperties,
    ...(required.length > 0 ? { required } : {}),
  };

  return createValidator<Simplify<InferStructType<Props>>>(schema, options);
}

// Re-export the property def type for external use
export type { StructPropertyDef, StructSchema };
