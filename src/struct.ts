/**
 * Struct helper for ergonomic object schema definition
 *
 * Usage:
 *   const Person = struct({
 *     firstName: 'string',
 *     lastName: 'string',
 *     age: 'number',
 *     email: { type: 'string', format: 'email' }
 *   }).optional('age', 'email');
 */

import type { JsonSchema, JsonSchemaType, JsonSchemaBase } from './types.js';
import type { Infer } from './infer.js';
import { createValidator, type Validator } from './core/index.js';
import type { CompileOptions } from './core/context.js';

// Property definition can be shorthand or full schema
type PropertyDef = JsonSchemaType | JsonSchemaBase;

// Map property definitions to their inferred types
type InferPropertyDef<T extends PropertyDef> = T extends JsonSchemaType
  ? T extends 'string'
    ? string
    : T extends 'number'
      ? number
      : T extends 'integer'
        ? number
        : T extends 'boolean'
          ? boolean
          : T extends 'null'
            ? null
            : T extends 'object'
              ? Record<string, unknown>
              : T extends 'array'
                ? unknown[]
                : unknown
  : T extends JsonSchemaBase
    ? Infer<T>
    : unknown;

// Infer object type from property definitions with required/optional handling
type InferStruct<
  Props extends Record<string, PropertyDef>,
  OptionalKeys extends keyof Props = never,
> = {
  [K in Exclude<keyof Props, OptionalKeys>]: InferPropertyDef<Props[K]>;
} & {
  [K in OptionalKeys]?: InferPropertyDef<Props[K]>;
};

// Simplify the intersection
type Simplify<T> = { [K in keyof T]: T[K] } & {};

/**
 * Struct builder interface - allows chaining .optional() calls
 */
export interface StructBuilder<
  Props extends Record<string, PropertyDef>,
  OptionalKeys extends keyof Props = never,
> extends Validator<Simplify<InferStruct<Props, OptionalKeys>>> {
  /**
   * Mark specific properties as optional
   */
  optional<K extends Exclude<keyof Props, OptionalKeys>>(
    ...keys: K[]
  ): StructBuilder<Props, OptionalKeys | K>;
}

/**
 * Create a struct schema with ergonomic syntax
 *
 * @example
 * const Person = struct({
 *   firstName: 'string',
 *   lastName: 'string',
 *   age: 'number',
 * }).optional('age');
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
export function struct<Props extends Record<string, PropertyDef>>(
  properties: Props,
  options?: CompileOptions
): StructBuilder<Props, never> {
  return createStructBuilder(properties, [], options);
}

function createStructBuilder<
  Props extends Record<string, PropertyDef>,
  OptionalKeys extends keyof Props,
>(
  properties: Props,
  optionalKeys: (keyof Props)[],
  options?: CompileOptions
): StructBuilder<Props, OptionalKeys> {
  // Convert property definitions to JSON Schema properties
  const schemaProperties: Record<string, JsonSchema> = {};
  for (const [key, def] of Object.entries(properties)) {
    // Shorthand types become { type: '...' }, full schemas pass through
    schemaProperties[key] = typeof def === 'string' ? { type: def } : def;
  }

  // All keys not in optionalKeys are required
  const allKeys = Object.keys(properties);
  const optionalSet = new Set(optionalKeys as string[]);
  const required = allKeys.filter((k) => !optionalSet.has(k));

  // Build the schema
  const schema: JsonSchemaBase = {
    type: 'object',
    properties: schemaProperties,
    ...(required.length > 0 ? { required } : {}),
  };

  // Create the validator
  const validator = createValidator<Simplify<InferStruct<Props, OptionalKeys>>>(schema, options);

  // Add the optional() method
  const builder = validator as StructBuilder<Props, OptionalKeys>;
  builder.optional = <K extends Exclude<keyof Props, OptionalKeys>>(...keys: K[]) => {
    return createStructBuilder<Props, OptionalKeys | K>(
      properties,
      [...optionalKeys, ...keys],
      options
    );
  };

  return builder;
}
