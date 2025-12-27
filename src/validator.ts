import type { JsonSchema, JsonSchemaBase, JsonValue } from './types.js';

export interface ValidationError {
  path: string;
  message: string;
  keyword: string;
  value?: unknown;
}

export type ParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: ValidationError[] };

export class Validator<T> {
  readonly #schema: JsonSchema;
  readonly #defs: Record<string, JsonSchema>;

  // Phantom type for type inference
  declare readonly type: T;

  constructor(schema: JsonSchema) {
    this.#schema = schema;
    this.#defs = typeof schema === 'object' && schema.$defs ? schema.$defs : {};
  }

  validate(data: unknown): data is T {
    return this.#validate(data, this.#schema, '').length === 0;
  }

  assert(data: unknown): T {
    const errors = this.#validate(data, this.#schema, '');
    if (errors.length > 0) {
      const message = errors.map(e => `${e.path}: ${e.message}`).join('\n');
      throw new Error(`Validation failed:\n${message}`);
    }
    return data as T;
  }

  parse(data: unknown): ParseResult<T> {
    const errors = this.#validate(data, this.#schema, '');
    if (errors.length === 0) {
      return { ok: true, data: data as T };
    }
    return { ok: false, errors };
  }

  #validate(data: unknown, schema: JsonSchema, path: string): ValidationError[] {
    // Boolean schemas
    if (schema === true) return [];
    if (schema === false) {
      return [{ path, message: 'Schema is false, no value is valid', keyword: 'false' }];
    }

    const errors: ValidationError[] = [];

    // Handle $ref
    if (schema.$ref) {
      const refSchema = this.#resolveRef(schema.$ref);
      if (refSchema) {
        return this.#validate(data, refSchema, path);
      }
      return [{ path, message: `Unresolved $ref: ${schema.$ref}`, keyword: '$ref' }];
    }

    // Handle const
    if ('const' in schema) {
      if (!this.#deepEqual(data, schema.const)) {
        errors.push({ path, message: `Expected const ${JSON.stringify(schema.const)}`, keyword: 'const', value: data });
      }
      return errors;
    }

    // Handle enum
    if (schema.enum) {
      if (!schema.enum.some(v => this.#deepEqual(data, v))) {
        errors.push({ path, message: `Value must be one of: ${JSON.stringify(schema.enum)}`, keyword: 'enum', value: data });
      }
      return errors;
    }

    // Handle anyOf
    if (schema.anyOf) {
      const anyValid = schema.anyOf.some(s => this.#validate(data, s, path).length === 0);
      if (!anyValid) {
        errors.push({ path, message: 'Value does not match any of the schemas in anyOf', keyword: 'anyOf', value: data });
      }
      return errors;
    }

    // Handle oneOf
    if (schema.oneOf) {
      const validCount = schema.oneOf.filter(s => this.#validate(data, s, path).length === 0).length;
      if (validCount !== 1) {
        errors.push({ path, message: `Value must match exactly one schema in oneOf, matched ${validCount}`, keyword: 'oneOf', value: data });
      }
      return errors;
    }

    // Handle allOf
    if (schema.allOf) {
      for (const subSchema of schema.allOf) {
        errors.push(...this.#validate(data, subSchema, path));
      }
      return errors;
    }

    // Handle not
    if (schema.not) {
      if (this.#validate(data, schema.not, path).length === 0) {
        errors.push({ path, message: 'Value must not match the schema in not', keyword: 'not', value: data });
      }
      return errors;
    }

    // Handle if/then/else
    if (schema.if) {
      const ifValid = this.#validate(data, schema.if, path).length === 0;
      if (ifValid && schema.then) {
        errors.push(...this.#validate(data, schema.then, path));
      } else if (!ifValid && schema.else) {
        errors.push(...this.#validate(data, schema.else, path));
      }
      return errors;
    }

    // Handle type
    if (schema.type) {
      const types = Array.isArray(schema.type) ? schema.type : [schema.type];
      const typeValid = types.some(t => this.#checkType(data, t));
      if (!typeValid) {
        errors.push({ path, message: `Expected type ${types.join(' | ')}, got ${typeof data}`, keyword: 'type', value: data });
        return errors;
      }
    }

    // Type-specific validations
    if (typeof data === 'string') {
      errors.push(...this.#validateString(data, schema, path));
    } else if (typeof data === 'number') {
      errors.push(...this.#validateNumber(data, schema, path));
    } else if (Array.isArray(data)) {
      errors.push(...this.#validateArray(data, schema, path));
    } else if (typeof data === 'object' && data !== null) {
      errors.push(...this.#validateObject(data as Record<string, unknown>, schema, path));
    }

    return errors;
  }

  #checkType(data: unknown, type: string): boolean {
    switch (type) {
      case 'string': return typeof data === 'string';
      case 'number': return typeof data === 'number';
      case 'integer': return typeof data === 'number' && Number.isInteger(data);
      case 'boolean': return typeof data === 'boolean';
      case 'null': return data === null;
      case 'array': return Array.isArray(data);
      case 'object': return typeof data === 'object' && data !== null && !Array.isArray(data);
      default: return false;
    }
  }

  #validateString(data: string, schema: JsonSchemaBase, path: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (schema.minLength !== undefined && data.length < schema.minLength) {
      errors.push({ path, message: `String must have at least ${schema.minLength} characters`, keyword: 'minLength', value: data });
    }
    if (schema.maxLength !== undefined && data.length > schema.maxLength) {
      errors.push({ path, message: `String must have at most ${schema.maxLength} characters`, keyword: 'maxLength', value: data });
    }
    if (schema.pattern !== undefined && !new RegExp(schema.pattern).test(data)) {
      errors.push({ path, message: `String must match pattern ${schema.pattern}`, keyword: 'pattern', value: data });
    }
    if (schema.format !== undefined) {
      const formatError = this.#validateFormat(data, schema.format, path);
      if (formatError) errors.push(formatError);
    }

    return errors;
  }

  #validateFormat(data: string, format: string, path: string): ValidationError | null {
    const formatValidators: Record<string, (s: string) => boolean> = {
      // Existing formats
      email: s => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),
      uuid: s => /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s),
      'date-time': s => !isNaN(Date.parse(s)) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(s),
      uri: s => /^[a-z][a-z\d+.-]*:\/\/.+$/i.test(s),
      ipv4: s => /^(\d{1,3}\.){3}\d{1,3}$/.test(s) && s.split('.').every(n => parseInt(n) <= 255),
      ipv6: s => /^([0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$/i.test(s),
      // New formats
      date: s => /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(Date.parse(s)),
      time: s => /^\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/.test(s),
      duration: s => /^P(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/.test(s) && s !== 'P' && s !== 'PT',
      hostname: s => /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?(\.[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?)*$/i.test(s),
      'uri-reference': s => {
        try {
          new URL(s, 'http://example.com');
          return true;
        } catch {
          return false;
        }
      },
      'json-pointer': s => s === '' || /^(\/([^~/]|~0|~1)*)*$/.test(s),
      'relative-json-pointer': s => /^\d+(#|(\/([^~/]|~0|~1)*)*)?$/.test(s),
      regex: s => {
        try {
          new RegExp(s);
          return true;
        } catch {
          return false;
        }
      },
    };

    const validator = formatValidators[format];
    if (validator && !validator(data)) {
      return { path, message: `Invalid ${format} format`, keyword: 'format', value: data };
    }
    return null;
  }

  #validateNumber(data: number, schema: JsonSchemaBase, path: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (schema.minimum !== undefined && data < schema.minimum) {
      errors.push({ path, message: `Number must be >= ${schema.minimum}`, keyword: 'minimum', value: data });
    }
    if (schema.maximum !== undefined && data > schema.maximum) {
      errors.push({ path, message: `Number must be <= ${schema.maximum}`, keyword: 'maximum', value: data });
    }
    if (schema.exclusiveMinimum !== undefined && data <= schema.exclusiveMinimum) {
      errors.push({ path, message: `Number must be > ${schema.exclusiveMinimum}`, keyword: 'exclusiveMinimum', value: data });
    }
    if (schema.exclusiveMaximum !== undefined && data >= schema.exclusiveMaximum) {
      errors.push({ path, message: `Number must be < ${schema.exclusiveMaximum}`, keyword: 'exclusiveMaximum', value: data });
    }
    if (schema.multipleOf !== undefined && data % schema.multipleOf !== 0) {
      errors.push({ path, message: `Number must be a multiple of ${schema.multipleOf}`, keyword: 'multipleOf', value: data });
    }

    return errors;
  }

  #validateArray(data: unknown[], schema: JsonSchemaBase, path: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (schema.minItems !== undefined && data.length < schema.minItems) {
      errors.push({ path, message: `Array must have at least ${schema.minItems} items`, keyword: 'minItems', value: data });
    }
    if (schema.maxItems !== undefined && data.length > schema.maxItems) {
      errors.push({ path, message: `Array must have at most ${schema.maxItems} items`, keyword: 'maxItems', value: data });
    }
    if (schema.uniqueItems && new Set(data.map(x => JSON.stringify(x))).size !== data.length) {
      errors.push({ path, message: 'Array items must be unique', keyword: 'uniqueItems', value: data });
    }

    // Validate contains
    if (schema.contains) {
      const minContains = schema.minContains ?? 1;
      const maxContains = schema.maxContains ?? Infinity;

      // minContains: 0 disables contains validation entirely
      if (minContains > 0) {
        let matchCount = 0;
        for (let i = 0; i < data.length; i++) {
          if (this.#validate(data[i], schema.contains, `${path}[${i}]`).length === 0) {
            matchCount++;
          }
        }

        if (matchCount < minContains) {
          errors.push({
            path,
            message: `Array must contain at least ${minContains} item(s) matching the contains schema`,
            keyword: 'contains',
            value: matchCount,
          });
        }
        if (matchCount > maxContains) {
          errors.push({
            path,
            message: `Array must contain at most ${maxContains} item(s) matching the contains schema`,
            keyword: 'maxContains',
            value: matchCount,
          });
        }
      }
    }

    // Validate prefixItems (tuple)
    if (schema.prefixItems) {
      for (let i = 0; i < schema.prefixItems.length; i++) {
        if (i < data.length) {
          errors.push(...this.#validate(data[i], schema.prefixItems[i], `${path}[${i}]`));
        }
      }
      // Validate remaining items
      const restStart = schema.prefixItems.length;
      if (schema.items === false) {
        if (data.length > restStart) {
          errors.push({ path, message: `Array must have exactly ${restStart} items`, keyword: 'items', value: data });
        }
      } else if (typeof schema.items === 'object') {
        for (let i = restStart; i < data.length; i++) {
          errors.push(...this.#validate(data[i], schema.items, `${path}[${i}]`));
        }
      }
    } else if (schema.items === false) {
      if (data.length > 0) {
        errors.push({ path, message: 'Array must be empty', keyword: 'items', value: data });
      }
    } else if (typeof schema.items === 'object') {
      for (let i = 0; i < data.length; i++) {
        errors.push(...this.#validate(data[i], schema.items, `${path}[${i}]`));
      }
    }

    return errors;
  }

  #validateObject(data: Record<string, unknown>, schema: JsonSchemaBase, path: string): ValidationError[] {
    const errors: ValidationError[] = [];
    const properties = schema.properties ?? {};
    const required = schema.required ?? [];
    const keys = Object.keys(data);

    // Check minProperties/maxProperties
    if (schema.minProperties !== undefined && keys.length < schema.minProperties) {
      errors.push({ path, message: `Object must have at least ${schema.minProperties} properties`, keyword: 'minProperties', value: keys.length });
    }
    if (schema.maxProperties !== undefined && keys.length > schema.maxProperties) {
      errors.push({ path, message: `Object must have at most ${schema.maxProperties} properties`, keyword: 'maxProperties', value: keys.length });
    }

    // Check required properties
    for (const key of required) {
      if (!(key in data)) {
        errors.push({ path: path ? `${path}.${key}` : key, message: 'Required property is missing', keyword: 'required' });
      }
    }

    // Check dependentRequired
    if (schema.dependentRequired) {
      for (const [trigger, dependents] of Object.entries(schema.dependentRequired)) {
        if (trigger in data) {
          for (const dependent of dependents) {
            if (!(dependent in data)) {
              errors.push({
                path: path ? `${path}.${dependent}` : dependent,
                message: `Property "${dependent}" is required when "${trigger}" is present`,
                keyword: 'dependentRequired',
              });
            }
          }
        }
      }
    }

    // Validate known properties
    for (const [key, propSchema] of Object.entries(properties)) {
      if (key in data) {
        errors.push(...this.#validate(data[key], propSchema, path ? `${path}.${key}` : key));
      }
    }

    // Validate additional properties
    if (schema.additionalProperties !== undefined) {
      const knownKeys = new Set(Object.keys(properties));
      for (const [key, value] of Object.entries(data)) {
        if (!knownKeys.has(key)) {
          if (schema.additionalProperties === false) {
            errors.push({ path: path ? `${path}.${key}` : key, message: 'Additional property is not allowed', keyword: 'additionalProperties', value });
          } else if (typeof schema.additionalProperties === 'object') {
            errors.push(...this.#validate(value, schema.additionalProperties, path ? `${path}.${key}` : key));
          }
        }
      }
    }

    return errors;
  }

  #resolveRef(ref: string): JsonSchema | undefined {
    const match = ref.match(/^#\/\$defs\/(.+)$/);
    if (match && match[1] in this.#defs) {
      return this.#defs[match[1]];
    }
    return undefined;
  }

  #deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object' || a === null || b === null) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a)) {
      const bArr = b as unknown[];
      if (a.length !== bArr.length) return false;
      return a.every((v, i) => this.#deepEqual(v, bArr[i]));
    }

    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every(k => this.#deepEqual(aObj[k], bObj[k]));
  }
}
