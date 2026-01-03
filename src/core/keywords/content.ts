/**
 * Content validation keyword handlers (contentMediaType, contentEncoding)
 * @see https://json-schema.org/draft/2020-12/json-schema-validation#section-8
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _ } from '../codegen.js';
import type { CompileContext } from '../context.js';
import { genError } from './utils.js';

/**
 * Generate content validation checks (contentMediaType, contentEncoding)
 * These are optional in draft-07 and later.
 * In draft 2020-12, content is annotation-only (no validation).
 * This is a simple handler - no sub-schema validation needed.
 */
export function generateContentChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext
): void {
  const hasContentChecks =
    schema.contentMediaType !== undefined || schema.contentEncoding !== undefined;

  if (!hasContentChecks) return;

  // Content assertion is controlled by the contentAssertion option
  // which is auto-detected from the schema dialect during context creation
  if (!ctx.options.contentAssertion) {
    return;
  }

  // Only check if data is a string
  code.if(_`typeof ${dataVar} === 'string'`, () => {
    // First check encoding if present
    if (schema.contentEncoding !== undefined) {
      if (schema.contentEncoding === 'base64') {
        // Validate base64 encoding
        // Base64 characters: A-Z, a-z, 0-9, +, /, and = for padding
        const regexName = new Name(ctx.genRuntimeName('base64Re'));
        ctx.addRuntimeFunction(regexName.str, /^[A-Za-z0-9+/]*={0,2}$/);
        code.if(_`!${regexName}.test(${dataVar}) || ${dataVar}.length % 4 !== 0`, () => {
          genError(
            code,
            pathExprCode,
            '#/contentEncoding',
            'contentEncoding',
            'must be base64 encoded',
            {},
            ctx
          );
        });
      }
    }

    // Then check media type if present
    if (schema.contentMediaType !== undefined) {
      if (schema.contentMediaType === 'application/json') {
        // If there's also base64 encoding, we need to decode first
        if (schema.contentEncoding === 'base64') {
          const decodedVar = code.genVar('decoded');
          code.try(
            () => {
              code.line(_`const ${decodedVar} = atob(${dataVar});`);
              code.line(_`JSON.parse(${decodedVar});`);
            },
            () => {
              genError(
                code,
                pathExprCode,
                '#/contentMediaType',
                'contentMediaType',
                'must be application/json',
                {},
                ctx
              );
            }
          );
        } else {
          // Validate directly as JSON
          code.try(
            () => {
              code.line(_`JSON.parse(${dataVar});`);
            },
            () => {
              genError(
                code,
                pathExprCode,
                '#/contentMediaType',
                'contentMediaType',
                'must be application/json',
                {},
                ctx
              );
            }
          );
        }
      }
    }
  });
}
