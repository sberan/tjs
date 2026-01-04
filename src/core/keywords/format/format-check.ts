import { Code, Name, _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { VOCABULARIES } from '../../context.js';
import { createFormatValidators } from './validators.js';

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

const sharedFormatValidators = createFormatValidators(false);

/**
 * Keyword handler for format validation.
 */
export default function generateFormatCheck(ctx: CompileContext): void {
  const { schema, code, data } = ctx;
  if (schema.format === undefined) return;

  let enableFormatAssertion: boolean;
  if (ctx.hasCustomVocabulary()) {
    enableFormatAssertion = ctx.isVocabularyEnabled(VOCABULARIES.format_assertion);
  } else {
    enableFormatAssertion = ctx.options.formatAssertion;
  }

  if (!enableFormatAssertion) return;

  const format = schema.format;
  const hasStringType = schema.type === 'string';
  const isKnownFormat = KNOWN_FORMATS.has(format);
  const validators = sharedFormatValidators;

  let formatCheck: Code;
  if (isKnownFormat) {
    const funcName = 'fmt_' + format.replace(/-/g, '_');
    const validatorName = new Name(funcName);
    ctx.addRuntimeFunction(funcName, validators[format]);
    formatCheck = _`!${validatorName}(${data})`;
  } else {
    formatCheck = _`formatValidators[${format}] && !formatValidators[${format}](${data})`;
  }

  const genFormatCheck = () => {
    code.if(formatCheck, () => {
      ctx.genError('format', `must match format "${format}"`, { format });
    });
  };

  if (hasStringType) {
    genFormatCheck();
  } else {
    code.if(_`typeof ${data} === 'string'`, genFormatCheck);
  }
}
