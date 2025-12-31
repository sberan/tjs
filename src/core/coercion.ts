/**
 * Type coercion for JSON Schema validation
 *
 * Coerces values to match schema types before validation.
 * Returns the coerced value and whether coercion was successful.
 */

import type { JsonSchema, JsonSchemaBase } from '../types.js';
import type { CoercionOptions } from './context.js';

/**
 * Coercion result - contains the coerced value (or original if no coercion needed)
 */
export interface CoerceResult {
  /** The coerced value (or original if no coercion needed/possible) */
  value: unknown;
  /** Whether the value was coerced (changed) */
  coerced: boolean;
}

/**
 * Interface for resolving $ref references during coercion
 */
export interface RefResolver {
  resolveRef(ref: string, fromSchema: JsonSchemaBase): JsonSchema | undefined;
}

/**
 * Resolve JSON pointer within a schema
 */
function resolveJsonPointer(schema: JsonSchema, pointer: string): JsonSchema | undefined {
  if (typeof schema !== 'object' || schema === null) return undefined;

  const parts = pointer
    .split('/')
    .slice(1)
    .map((p) => p.replace(/~1/g, '/').replace(/~0/g, '~'));

  let current: unknown = schema;
  for (const part of parts) {
    if (typeof current !== 'object' || current === null) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current as JsonSchema | undefined;
}

/**
 * Create a simple ref resolver for a schema and its remotes
 */
export function createRefResolver(
  rootSchema: JsonSchema,
  remotes?: Record<string, JsonSchema>
): RefResolver {
  // Build an index of schemas by $id
  const schemasById = new Map<string, JsonSchema>();

  // Index remote schemas
  if (remotes) {
    for (const [uri, schema] of Object.entries(remotes)) {
      if (typeof schema === 'object' && schema !== null) {
        schemasById.set(uri, schema);
        if (schema.$id) {
          schemasById.set(schema.$id, schema);
        }
      }
    }
  }

  // Index root schema
  if (typeof rootSchema === 'object' && rootSchema !== null && rootSchema.$id) {
    schemasById.set(rootSchema.$id, rootSchema);
  }

  return {
    resolveRef(ref: string, _fromSchema: JsonSchemaBase): JsonSchema | undefined {
      if (ref === '#') {
        return rootSchema;
      }

      if (ref.startsWith('#/')) {
        // JSON pointer
        return resolveJsonPointer(rootSchema, ref.slice(1));
      }

      // Check if it's a URI reference
      const fragmentIndex = ref.indexOf('#');
      if (fragmentIndex !== -1) {
        const baseUri = ref.slice(0, fragmentIndex);
        const fragment = ref.slice(fragmentIndex);
        const baseSchema = schemasById.get(baseUri);
        if (baseSchema) {
          if (fragment === '#') return baseSchema;
          if (fragment.startsWith('#/')) {
            return resolveJsonPointer(baseSchema, fragment.slice(1));
          }
        }
      }

      // Plain URI reference
      return schemasById.get(ref);
    },
  };
}

/**
 * Check if coercion is enabled for a specific type
 */
function isCoercionEnabled(options: CoercionOptions, type: string): boolean {
  if (options === true) return true;
  if (options === false) return false;
  if (typeof options === 'object') {
    const typeKey = type as keyof typeof options;
    return options[typeKey] === true;
  }
  return false;
}

/**
 * Coerce a value to string
 */
function coerceToString(value: unknown): CoerceResult {
  if (typeof value === 'string') {
    return { value, coerced: false };
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return { value: String(value), coerced: true };
  }
  // null, undefined, objects, arrays cannot be coerced to string
  return { value, coerced: false };
}

/**
 * Coerce a value to number
 */
function coerceToNumber(value: unknown): CoerceResult {
  if (typeof value === 'number') {
    return { value, coerced: false };
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') {
      return { value, coerced: false };
    }
    // Handle special cases
    if (trimmed === 'NaN') {
      return { value, coerced: false }; // Reject NaN
    }
    const num = Number(trimmed);
    if (!Number.isNaN(num)) {
      return { value: num, coerced: true };
    }
  }
  return { value, coerced: false };
}

/**
 * Coerce a value to integer
 */
function coerceToInteger(value: unknown): CoerceResult {
  if (typeof value === 'number' && Number.isInteger(value)) {
    return { value, coerced: false };
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (trimmed === '') {
      return { value, coerced: false };
    }
    const num = Number(trimmed);
    if (!Number.isNaN(num) && Number.isInteger(num)) {
      return { value: num, coerced: true };
    }
  }
  return { value, coerced: false };
}

/**
 * Coerce a value to boolean
 */
function coerceToBoolean(value: unknown): CoerceResult {
  if (typeof value === 'boolean') {
    return { value, coerced: false };
  }
  if (typeof value === 'string') {
    const lower = value.toLowerCase();
    if (lower === 'true' || lower === '1') {
      return { value: true, coerced: true };
    }
    if (lower === 'false' || lower === '0') {
      return { value: false, coerced: true };
    }
  }
  if (typeof value === 'number') {
    if (value === 1) {
      return { value: true, coerced: true };
    }
    if (value === 0) {
      return { value: false, coerced: true };
    }
  }
  return { value, coerced: false };
}

/**
 * Coerce a value to null
 */
function coerceToNull(value: unknown): CoerceResult {
  if (value === null) {
    return { value, coerced: false };
  }
  if (typeof value === 'string') {
    if (value === '' || value === 'null') {
      return { value: null, coerced: true };
    }
  }
  return { value, coerced: false };
}

/**
 * Coerce a value to array (wraps non-array values)
 */
function coerceToArray(value: unknown): CoerceResult {
  if (Array.isArray(value)) {
    return { value, coerced: false };
  }
  // null and undefined cannot be wrapped
  if (value === null || value === undefined) {
    return { value, coerced: false };
  }
  // Wrap single value in array
  return { value: [value], coerced: true };
}

/**
 * Coerce a value to match a single type
 */
function coerceToType(value: unknown, type: string): CoerceResult {
  switch (type) {
    case 'string':
      return coerceToString(value);
    case 'number':
      return coerceToNumber(value);
    case 'integer':
      return coerceToInteger(value);
    case 'boolean':
      return coerceToBoolean(value);
    case 'null':
      return coerceToNull(value);
    case 'array':
      return coerceToArray(value);
    case 'object':
      // Objects cannot be coerced
      return { value, coerced: false };
    default:
      return { value, coerced: false };
  }
}

/**
 * Check if a value matches a type
 */
function matchesType(value: unknown, type: string): boolean {
  switch (type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number';
    case 'integer':
      return typeof value === 'number' && Number.isInteger(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'null':
      return value === null;
    case 'array':
      return Array.isArray(value);
    case 'object':
      return typeof value === 'object' && value !== null && !Array.isArray(value);
    default:
      return false;
  }
}

/**
 * Simple schema matching for 'if' conditions in coercion
 * This is a lightweight implementation to avoid circular dependencies with the compiler
 */
function schemaMatches(value: unknown, schema: JsonSchema, refResolver?: RefResolver): boolean {
  // Handle boolean schemas
  if (typeof schema === 'boolean') {
    return schema;
  }

  // Handle string shorthand
  if (typeof schema === 'string') {
    return matchesType(value, schema);
  }

  // Handle $ref
  if (schema.$ref && refResolver) {
    const refSchema = refResolver.resolveRef(schema.$ref, schema);
    if (refSchema) {
      return schemaMatches(value, refSchema, refResolver);
    }
    return false;
  }

  // Handle type keyword
  if (schema.type !== undefined) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];
    const matchesAnyType = types.some((t) => matchesType(value, t));
    if (!matchesAnyType) return false;
  }

  // Handle const keyword
  if (schema.const !== undefined) {
    if (value !== schema.const) return false;
  }

  // Handle enum keyword
  if (schema.enum !== undefined) {
    if (!schema.enum.includes(value as never)) return false;
  }

  // Handle properties for objects
  if (schema.properties && typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      if (key in obj) {
        if (!schemaMatches(obj[key], propSchema, refResolver)) {
          return false;
        }
      }
    }
  }

  // Handle required keyword
  if (schema.required && typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>;
    for (const requiredProp of schema.required) {
      if (!(requiredProp in obj)) {
        return false;
      }
    }
  }

  // If we get here, all checks passed
  return true;
}

/**
 * Deep coerce a value according to a schema
 * Recursively coerces nested objects and arrays
 *
 * @param value - The value to coerce
 * @param schema - The JSON Schema to coerce against
 * @param options - Coercion options (which types to coerce)
 * @param refResolver - Optional resolver for $ref references
 */
export function coerceValue(
  value: unknown,
  schema: JsonSchema,
  options: CoercionOptions,
  refResolver?: RefResolver
): CoerceResult {
  // Boolean schemas don't require coercion
  if (typeof schema === 'boolean') {
    return { value, coerced: false };
  }

  // Handle string shorthand (e.g., 'string' instead of { type: 'string' })
  if (typeof schema === 'string') {
    if (!isCoercionEnabled(options, schema)) {
      return { value, coerced: false };
    }
    const result = coerceToType(value, schema);
    return result;
  }

  // Handle $ref - resolve the reference and coerce against it
  if (schema.$ref) {
    if (refResolver) {
      const refSchema = refResolver.resolveRef(schema.$ref, schema);
      if (refSchema) {
        return coerceValue(value, refSchema, options, refResolver);
      }
    }
    // Can't resolve ref - skip coercion
    return { value, coerced: false };
  }

  let currentValue = value;
  let wasCoerced = false;

  // Handle type coercion
  if (schema.type) {
    const types = Array.isArray(schema.type) ? schema.type : [schema.type];

    // Check if value already matches one of the types
    const alreadyMatches = types.some((t) => matchesType(currentValue, t));

    if (!alreadyMatches) {
      // Try to coerce to each type in order
      for (const type of types) {
        if (!isCoercionEnabled(options, type)) continue;
        const result = coerceToType(currentValue, type);
        if (result.coerced && matchesType(result.value, type)) {
          currentValue = result.value;
          wasCoerced = true;
          break;
        }
      }
    }
  }

  // Handle const coercion
  if (schema.const !== undefined && currentValue !== schema.const) {
    const constType = typeof schema.const;
    if (constType === 'number' && isCoercionEnabled(options, 'number')) {
      const result = coerceToNumber(currentValue);
      if (result.coerced && result.value === schema.const) {
        currentValue = result.value;
        wasCoerced = true;
      }
    } else if (constType === 'boolean' && isCoercionEnabled(options, 'boolean')) {
      const result = coerceToBoolean(currentValue);
      if (result.coerced && result.value === schema.const) {
        currentValue = result.value;
        wasCoerced = true;
      }
    } else if (constType === 'string' && isCoercionEnabled(options, 'string')) {
      const result = coerceToString(currentValue);
      if (result.coerced && result.value === schema.const) {
        currentValue = result.value;
        wasCoerced = true;
      }
    } else if (schema.const === null && isCoercionEnabled(options, 'null')) {
      const result = coerceToNull(currentValue);
      if (result.coerced && result.value === schema.const) {
        currentValue = result.value;
        wasCoerced = true;
      }
    }
  }

  // Handle enum coercion - try to match any enum value
  if (schema.enum && !schema.enum.includes(currentValue as never)) {
    for (const enumVal of schema.enum) {
      const enumType = typeof enumVal;
      let result: CoerceResult | null = null;

      if (enumType === 'number' && isCoercionEnabled(options, 'number')) {
        result = coerceToNumber(currentValue);
      } else if (enumType === 'boolean' && isCoercionEnabled(options, 'boolean')) {
        result = coerceToBoolean(currentValue);
      } else if (enumType === 'string' && isCoercionEnabled(options, 'string')) {
        result = coerceToString(currentValue);
      } else if (enumVal === null && isCoercionEnabled(options, 'null')) {
        result = coerceToNull(currentValue);
      }

      if (result && result.coerced && result.value === enumVal) {
        currentValue = result.value;
        wasCoerced = true;
        break;
      }
    }
  }

  // Handle array coercion and item coercion
  if (Array.isArray(currentValue)) {
    const itemsSchema = schema.items;
    const prefixItems = schema.prefixItems;

    if (itemsSchema || prefixItems) {
      let arrayChanged = false;
      // Determine if items is a single schema (not an array for draft-04 tuple validation)
      const singleItemsSchema: JsonSchema | undefined =
        itemsSchema && typeof itemsSchema !== 'boolean' && !Array.isArray(itemsSchema)
          ? (itemsSchema as JsonSchema)
          : undefined;

      const newArray = currentValue.map((item, index) => {
        // Use prefixItems for tuple positions, then items for rest
        let itemSchema: JsonSchema | undefined;
        if (prefixItems && index < prefixItems.length) {
          itemSchema = prefixItems[index];
        } else if (singleItemsSchema) {
          itemSchema = singleItemsSchema;
        }

        if (itemSchema) {
          const result = coerceValue(item, itemSchema, options, refResolver);
          if (result.coerced) {
            arrayChanged = true;
            return result.value;
          }
        }
        return item;
      });

      if (arrayChanged) {
        currentValue = newArray;
        wasCoerced = true;
      }
    }
  }

  // Handle object coercion (properties, additionalProperties, patternProperties)
  if (typeof currentValue === 'object' && currentValue !== null && !Array.isArray(currentValue)) {
    const obj = currentValue as Record<string, unknown>;
    let objectChanged = false;
    const newObj: Record<string, unknown> = {};

    for (const [key, val] of Object.entries(obj)) {
      let propSchema: JsonSchema | undefined;

      // Check defined properties first
      if (schema.properties && key in schema.properties) {
        propSchema = schema.properties[key];
      } else if (schema.patternProperties) {
        // Check pattern properties
        for (const [pattern, patternSchema] of Object.entries(schema.patternProperties)) {
          try {
            if (new RegExp(pattern).test(key)) {
              propSchema = patternSchema;
              break;
            }
          } catch {
            // Invalid regex, skip
          }
        }
      }

      // Fall back to additionalProperties
      if (
        !propSchema &&
        schema.additionalProperties &&
        typeof schema.additionalProperties !== 'boolean'
      ) {
        propSchema = schema.additionalProperties;
      }

      if (propSchema) {
        const result = coerceValue(val, propSchema, options, refResolver);
        if (result.coerced) {
          objectChanged = true;
          newObj[key] = result.value;
        } else {
          newObj[key] = val;
        }
      } else {
        newObj[key] = val;
      }
    }

    if (objectChanged) {
      currentValue = newObj;
      wasCoerced = true;
    }
  }

  // Handle composition keywords (allOf, anyOf, oneOf)
  // For these, we try to coerce to match the subschemas
  if (schema.allOf) {
    for (const subSchema of schema.allOf) {
      const result = coerceValue(currentValue, subSchema, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
      }
    }
  }

  if (schema.anyOf) {
    // Try each schema until one successfully coerces
    for (const subSchema of schema.anyOf) {
      const result = coerceValue(currentValue, subSchema, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
        break;
      }
    }
  }

  if (schema.oneOf) {
    // Try each schema until one successfully coerces
    for (const subSchema of schema.oneOf) {
      const result = coerceValue(currentValue, subSchema, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
        break;
      }
    }
  }

  // Handle if-then-else
  // Evaluate the 'if' schema to determine which branch to apply
  if (schema.if !== undefined) {
    // We need to validate against the 'if' schema to determine the branch
    const ifMatches = schemaMatches(currentValue, schema.if, refResolver);

    if (ifMatches && schema.then !== undefined) {
      // If condition matches, apply 'then' schema coercion
      const result = coerceValue(currentValue, schema.then, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
      }
    } else if (!ifMatches && schema.else !== undefined) {
      // If condition doesn't match, apply 'else' schema coercion
      const result = coerceValue(currentValue, schema.else, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
      }
    }
  } else {
    // Legacy behavior: if no 'if' schema, apply both then and else (shouldn't happen in valid schemas)
    if (schema.then) {
      const result = coerceValue(currentValue, schema.then, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
      }
    }
    if (schema.else) {
      const result = coerceValue(currentValue, schema.else, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
      }
    }
  }

  return { value: currentValue, coerced: wasCoerced };
}

/**
 * Create a coercion function for a schema
 */
export function createCoercer(
  schema: JsonSchema,
  options: CoercionOptions,
  refResolver?: RefResolver
): (value: unknown) => unknown {
  return (value: unknown) => {
    const result = coerceValue(value, schema, options, refResolver);
    return result.value;
  };
}
