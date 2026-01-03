/**
 * Format validation keyword handler (format)
 * @see https://json-schema.org/draft/2020-12/json-schema-validation#section-7
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _ } from '../codegen.js';
import type { CompileContext } from '../context.js';
import { VOCABULARIES } from '../context.js';
import { genError } from './utils.js';
import { createFormatValidators } from './format.js';

/**
 * Known format strings that have dedicated validators.
 * Using direct function references instead of object lookups for these formats
 * improves performance.
 */
const KNOWN_FORMATS = new Set([
  'email',
  'uuid',
  'date-time',
  'uri',
  'ipv4',
  'ipv6',
  'date',
  'time',
  'duration',
  'hostname',
  'uri-reference',
  'json-pointer',
  'relative-json-pointer',
  'regex',
]);

// Pre-created format validators instances (one for full validation, one for fast regex-only)
const sharedFormatValidators = createFormatValidators(false);

/**
 * Generate format validation check.
 * This is a simple handler - no sub-schema validation needed.
 */
export function generateFormatCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  if (schema.format === undefined) return;

  // Determine if format validation should be enabled:
  // 1. If there's a custom metaschema with $vocabulary, check if format-assertion is enabled
  // 2. Otherwise, use the global formatAssertion option (auto-detected from dialect)
  let enableFormatAssertion: boolean;
  if (ctx.hasCustomVocabulary()) {
    // Custom metaschema: use vocabulary to determine format validation
    enableFormatAssertion = ctx.isVocabularyEnabled(VOCABULARIES.format_assertion);
  } else {
    // No custom metaschema: use the global option (respects user's explicit setting or auto-detection)
    enableFormatAssertion = ctx.options.formatAssertion;
  }

  if (!enableFormatAssertion) return;

  const format = schema.format;

  // Check if schema already has type: 'string' (no need to re-check type)
  const hasStringType = schema.type === 'string';

  // For known formats, register a direct function reference for faster calls
  const isKnownFormat = KNOWN_FORMATS.has(format);

  const validators = sharedFormatValidators;

  let formatCheck: Code;
  if (isKnownFormat) {
    // Register the specific format validator as a runtime function for direct calls
    // This avoids the object property lookup overhead on every validation
    const funcName = 'fmt_' + format.replace(/-/g, '_');
    const validatorName = new Name(funcName);

    // Always register the runtime function (ctx.addRuntimeFunction is idempotent for same name)
    ctx.addRuntimeFunction(funcName, validators[format]);

    formatCheck = _`!${validatorName}(${dataVar})`;
  } else {
    formatCheck = _`formatValidators[${format}] && !formatValidators[${format}](${dataVar})`;
  }

  const genFormatCheck = () => {
    code.if(formatCheck, () => {
      genError(
        code,
        pathExprCode,
        '#/format',
        'format',
        `must match format "${format}"`,
        {
          format,
        },
        ctx
      );
    });
  };

  if (hasStringType) {
    // Type already checked, just do format check
    genFormatCheck();
  } else {
    // Only check if data is a string
    code.if(_`typeof ${dataVar} === 'string'`, genFormatCheck);
  }
}
