/**
 * Schema utility functions for compile-time analysis
 */

import type { JsonSchema, JsonSchemaBase } from '../types.js';

/**
 * Extract statically known property names from a schema.
 * Used to track evaluated properties when calling into a ref function.
 * Recursively traverses the schema to find all `properties` definitions.
 */
export function extractStaticProperties(
  schema: JsonSchema,
  visited = new Set<JsonSchema>()
): Set<string> {
  const props = new Set<string>();

  if (typeof schema !== 'object' || schema === null) return props;
  if (visited.has(schema)) return props; // Avoid cycles
  visited.add(schema);

  const s = schema as JsonSchemaBase;

  // Direct properties
  if (s.properties && typeof s.properties === 'object') {
    for (const key of Object.keys(s.properties)) {
      props.add(key);
    }
  }

  // Recurse into allOf (properties are always evaluated)
  if (Array.isArray(s.allOf)) {
    for (const sub of s.allOf) {
      for (const p of extractStaticProperties(sub, visited)) {
        props.add(p);
      }
    }
  }

  // NOTE: We don't recurse into anyOf/oneOf/if-then-else because those
  // are conditional. Only properties that are ALWAYS evaluated should be
  // extracted for static tracking.

  return props;
}
