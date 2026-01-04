/**
 * Shared helpers for keyword code generators
 *
 * This module contains functions that are used by multiple keyword handlers
 * but are too specific to codegen to belong in utils.ts.
 */

import type { JsonSchema } from '../../../types.js';
import { CodeBuilder, Code, Name, _, or, stringify } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { getTypeCheck, getOptimizedUnionTypeCheck } from './utils.js';

// Forward declaration for circular dependency
type GenerateSchemaValidatorFn = (
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name
) => void;

let generateSchemaValidatorImpl: GenerateSchemaValidatorFn | undefined;

/**
 * Set the generateSchemaValidator implementation to break circular dependency.
 * This must be called during module initialization.
 */
export function setGenerateSchemaValidator(fn: GenerateSchemaValidatorFn): void {
  generateSchemaValidatorImpl = fn;
}

/**
 * Generate inline code to check if a schema validates without returning errors.
 * Returns a Code expression that evaluates to boolean.
 *
 * This is used for checking if a subschema matches in anyOf, oneOf, not, if/then/else.
 */
export function generateSubschemaCheck(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: Name,
  ctx: CompileContext,
  dynamicScopeVar?: Name
): Code {
  if (!generateSchemaValidatorImpl) {
    throw new Error('generateSchemaValidator not initialized');
  }

  // Handle no-op schemas (true, {}) - always pass
  if (schema === true) return _`true`;
  if (typeof schema === 'object' && schema !== null && Object.keys(schema).length === 0) {
    return _`true`;
  }
  // Handle always-fail schema
  if (schema === false) return _`false`;

  // OPTIMIZATION: Resolve $ref chains and inline simple schemas
  let resolvedSchema: JsonSchema = schema;
  if (
    typeof schema === 'object' &&
    schema !== null &&
    schema.$ref &&
    !ctx.hasAnyDynamicAnchors() // Don't optimize with dynamic anchors
  ) {
    // Resolve the reference and follow chains
    const refSchema = ctx.resolveRef(schema.$ref, schema);
    if (refSchema) {
      resolvedSchema = refSchema;

      // Follow $ref-only chains to the final schema
      let depth = 0;
      const maxDepth = 100;
      while (
        typeof resolvedSchema === 'object' &&
        resolvedSchema !== null &&
        '$ref' in resolvedSchema &&
        resolvedSchema.$ref &&
        Object.keys(resolvedSchema).length === 1 &&
        depth < maxDepth
      ) {
        const nextSchema = ctx.resolveRef(resolvedSchema.$ref, resolvedSchema);
        if (!nextSchema) break;
        resolvedSchema = nextSchema;
        depth++;
      }
    }
  }

  // Try to inline simple schemas for better performance
  if (
    typeof resolvedSchema === 'object' &&
    resolvedSchema !== null &&
    !resolvedSchema.$ref && // Must be fully resolved (no more refs)
    !resolvedSchema.$id && // Not a resource
    !resolvedSchema.$dynamicRef &&
    !resolvedSchema.$dynamicAnchor &&
    !resolvedSchema.allOf &&
    !resolvedSchema.anyOf &&
    !resolvedSchema.oneOf &&
    !resolvedSchema.not &&
    !resolvedSchema.if &&
    !resolvedSchema.properties &&
    !resolvedSchema.patternProperties &&
    !resolvedSchema.additionalProperties &&
    !resolvedSchema.dependentSchemas &&
    !resolvedSchema.dependencies &&
    !resolvedSchema.prefixItems &&
    !resolvedSchema.items &&
    !resolvedSchema.contains &&
    !resolvedSchema.unevaluatedProperties &&
    !resolvedSchema.unevaluatedItems &&
    !resolvedSchema.$defs &&
    !resolvedSchema.definitions
  ) {
    // Count actual validation keywords (exclude metadata)
    const keywords = Object.keys(resolvedSchema).filter(
      (k) =>
        k !== '$schema' &&
        k !== '$comment' &&
        k !== 'title' &&
        k !== 'description' &&
        k !== '$anchor' &&
        k !== 'examples' &&
        k !== 'default'
    );

    // Only inline very simple schemas
    if (keywords.length === 0) {
      return _`true`; // Empty schema = no-op
    }

    // Inline single type check
    if (keywords.length === 1 && resolvedSchema.type) {
      const types = Array.isArray(resolvedSchema.type)
        ? resolvedSchema.type
        : [resolvedSchema.type];
      if (types.length === 1) {
        return getTypeCheck(dataVar, types[0]);
      } else {
        // Multiple types - try optimized union check first
        const optimizedCheck = getOptimizedUnionTypeCheck(dataVar, types);
        if (optimizedCheck) {
          return optimizedCheck;
        }
        // Fallback: generate individual OR checks
        const checks = types.map((t) => getTypeCheck(dataVar, t));
        return or(...checks);
      }
    }

    // Inline const check (primitives only for simplicity)
    if (
      keywords.length === 1 &&
      'const' in resolvedSchema &&
      (resolvedSchema.const === null || typeof resolvedSchema.const !== 'object')
    ) {
      return _`${dataVar} === ${stringify(resolvedSchema.const)}`;
    }

    // Inline simple enum check (up to 5 primitive values)
    if (keywords.length === 1 && resolvedSchema.enum && resolvedSchema.enum.length <= 5) {
      const allPrimitives = resolvedSchema.enum.every(
        (val) => val === null || typeof val !== 'object'
      );
      if (allPrimitives) {
        const checks = resolvedSchema.enum.map((val) => _`${dataVar} === ${stringify(val)}`);
        return or(...checks);
      }
    }

    // Inline simple required check (single property)
    if (keywords.length === 1 && resolvedSchema.required && resolvedSchema.required.length === 1) {
      const propName = resolvedSchema.required[0];
      return _`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar}) && ${JSON.stringify(propName)} in ${dataVar}`;
    }
  }

  // For complex schemas, use labeled block approach
  // This avoids IIFE overhead and error save/restore

  // Determine which schema to validate (follow $ref chains if possible)
  const isRefOnly =
    typeof schema === 'object' &&
    schema !== null &&
    schema.$ref &&
    Object.keys(schema).filter((k) => k !== '$ref' && k !== '$schema' && k !== '$comment')
      .length === 0;
  const schemaToValidate = isRefOnly && resolvedSchema !== schema ? resolvedSchema : schema;

  // Cycle detection: if this schema is already being processed inline, use function call
  if (
    typeof schemaToValidate === 'object' &&
    schemaToValidate !== null &&
    (ctx.isProcessingInline(schemaToValidate) || ctx.isCompiled(schemaToValidate))
  ) {
    const funcName = ctx.getCompiledName(schemaToValidate) ?? ctx.queueCompile(schemaToValidate);
    const hasDynamicFeatures = dynamicScopeVar !== undefined;
    if (hasDynamicFeatures) {
      return _`${funcName}(${dataVar}, null, '', ${dynamicScopeVar})`;
    } else {
      return _`${funcName}(${dataVar}, null, '')`;
    }
  }

  // Create labeled block for early exit without IIFE
  const label = code.genVar('check');
  const validVar = code.genVar('valid');

  code.line(_`let ${validVar} = true;`);
  code.line(_`${label}: {`);

  // Track that we're processing this schema inline (for cycle detection)
  if (typeof schemaToValidate === 'object' && schemaToValidate !== null) {
    ctx.enterInlineProcessing(schemaToValidate);
  }

  // Enter subschema check mode - genError will use break instead of return
  ctx.enterSubschemaCheck(label, validVar);

  // Save the current schema context before recursing
  const restoreSchemaContext = ctx.saveSchemaContext();

  // Generate validation inline (genError will set validVar = false and break)
  generateSchemaValidatorImpl(code, schemaToValidate, dataVar, _`''`, ctx, dynamicScopeVar);

  // Restore the schema context after recursing
  restoreSchemaContext();

  // Exit subschema check mode
  ctx.exitSubschemaCheck();

  // Stop tracking inline processing
  if (typeof schemaToValidate === 'object' && schemaToValidate !== null) {
    ctx.exitInlineProcessing(schemaToValidate);
  }

  code.line(_`}`);

  return _`${validVar}`;
}
