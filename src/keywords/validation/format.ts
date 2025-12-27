import type { KeywordContext, KeywordResult, ValidationError } from '../types.js';
import { EMPTY_RESULT } from '../types.js';

const formatValidators: Record<string, (s: string) => boolean> = {
  // Existing formats
  email: (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),
  uuid: (s) => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s),
  'date-time': (s) => !isNaN(Date.parse(s)) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(s),
  uri: (s) => /^[a-z][a-z\d+.-]*:\/\/.+$/i.test(s),
  ipv4: (s) => /^(\d{1,3}\.){3}\d{1,3}$/.test(s) && s.split('.').every((n) => parseInt(n) <= 255),
  ipv6: (s) => /^([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$/i.test(s),
  // New formats
  date: (s) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s)),
  time: (s) => /^\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/.test(s),
  duration: (s) =>
    /^P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/.test(s) &&
    s !== 'P' &&
    s !== 'PT',
  hostname: (s) =>
    /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(s),
  'uri-reference': (s) => {
    try {
      new URL(s, 'http://example.com');
      return true;
    } catch {
      return false;
    }
  },
  'json-pointer': (s) => s === '' || /^(\/([^~/]|~0|~1)*)*$/.test(s),
  'relative-json-pointer': (s) => /^\d+(#|(\/([^~/]|~0|~1)*)*)?$/.test(s),
  regex: (s) => {
    try {
      new RegExp(s);
      return true;
    } catch {
      return false;
    }
  },
};

export function validateFormat(ctx: KeywordContext, formatAssertion: boolean): KeywordResult {
  const { data, schema, path } = ctx;

  if (schema.format === undefined) {
    return EMPTY_RESULT;
  }

  // Format validation is configurable
  // When formatAssertion is false, format is treated as annotation-only (per JSON Schema spec)
  if (!formatAssertion) {
    return EMPTY_RESULT;
  }

  if (typeof data !== 'string') {
    return EMPTY_RESULT;
  }

  const validator = formatValidators[schema.format];
  if (validator && !validator(data)) {
    const errors: ValidationError[] = [
      { path, message: `Invalid ${schema.format} format`, keyword: 'format', value: data },
    ];
    return { errors };
  }

  return EMPTY_RESULT;
}
