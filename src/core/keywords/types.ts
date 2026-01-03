/**
 * Type definitions for keyword handlers.
 *
 * Keyword handlers are functions that generate validation code for JSON Schema keywords.
 * There are two types:
 * - SimpleKeywordHandler: For keywords that don't need to recursively validate sub-schemas
 * - ComplexKeywordHandler: For keywords that need to validate nested schemas (via dependency injection)
 */

import type { CodeBuilder, Code, Name } from '../codegen.js';
import type { CompileContext } from '../context.js';
import type { JsonSchema, JsonSchemaBase } from '../../types.js';

/**
 * Function type for recursive schema validation.
 * Passed to complex keyword handlers via dependency injection to avoid circular imports.
 */
export type SchemaValidator = (
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar?: Name
) => void;

/**
 * Options for simple keyword handlers (no sub-schema validation needed).
 */
export interface SimpleKeywordOptions {
  /** Code builder for generating JavaScript */
  code: CodeBuilder;
  /** The schema being compiled */
  schema: JsonSchemaBase;
  /** Variable name containing data being validated */
  dataVar: Name;
  /** Code expression for the current path */
  pathExprCode: Code;
  /** Compilation context (refs, vocabularies, options) */
  ctx: CompileContext;
}

/**
 * Options for complex keyword handlers (need sub-schema validation).
 * Extends SimpleKeywordOptions with dependency injection for recursive validation.
 */
export interface ComplexKeywordOptions extends SimpleKeywordOptions {
  /** Variable name for the dynamic scope (for $dynamicRef) */
  dynamicScopeVar?: Name;
  /** Injected function for validating sub-schemas (avoids circular imports) */
  validateSubschema: SchemaValidator;
}

/**
 * Simple keyword handler - no recursive validation needed.
 * Examples: type, const, enum, minLength, maximum
 */
export type SimpleKeywordHandler = (opts: SimpleKeywordOptions) => void;

/**
 * Complex keyword handler - needs recursive sub-schema validation.
 * Examples: properties, items, allOf, $ref
 */
export type ComplexKeywordHandler = (opts: ComplexKeywordOptions) => void;
