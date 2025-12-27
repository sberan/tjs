import type { JsonSchema, JsonSchemaBase } from './types.js';

export interface ValidationError {
  path: string;
  message: string;
  keyword: string;
  value?: unknown;
}

export type ParseResult<T> =
  | { ok: true; data: T }
  | { ok: false; errors: ValidationError[] };

// Internal result type that tracks evaluated properties/items for unevaluated* keywords
interface ValidationResult {
  errors: ValidationError[];
  evaluatedProperties?: Set<string>;
  evaluatedItems?: Set<number>;
}

export class Validator<T> {
  readonly #schema: JsonSchema;
  readonly #defs: Record<string, JsonSchema>;
  readonly #anchors: Map<string, JsonSchema>;

  // Phantom type for type inference
  declare readonly type: T;

  constructor(schema: JsonSchema) {
    this.#schema = schema;
    this.#defs = typeof schema === 'object' && schema.$defs ? schema.$defs : {};
    this.#anchors = new Map();
    this.#collectAnchors(schema);
  }

  #collectAnchors(schema: JsonSchema): void {
    if (typeof schema !== 'object' || schema === null) return;

    if (schema.$anchor) {
      this.#anchors.set(schema.$anchor, schema);
    }

    // Recurse into all subschemas
    if (schema.$defs) {
      for (const def of Object.values(schema.$defs)) {
        this.#collectAnchors(def);
      }
    }
    if (schema.properties) {
      for (const prop of Object.values(schema.properties)) {
        this.#collectAnchors(prop);
      }
    }
    if (schema.items && typeof schema.items === 'object') {
      this.#collectAnchors(schema.items);
    }
    if (schema.prefixItems) {
      for (const item of schema.prefixItems) {
        this.#collectAnchors(item);
      }
    }
    if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
      this.#collectAnchors(schema.additionalProperties);
    }
    if (schema.unevaluatedProperties && typeof schema.unevaluatedProperties === 'object') {
      this.#collectAnchors(schema.unevaluatedProperties);
    }
    if (schema.unevaluatedItems && typeof schema.unevaluatedItems === 'object') {
      this.#collectAnchors(schema.unevaluatedItems);
    }
    if (schema.anyOf) {
      for (const sub of schema.anyOf) {
        this.#collectAnchors(sub);
      }
    }
    if (schema.oneOf) {
      for (const sub of schema.oneOf) {
        this.#collectAnchors(sub);
      }
    }
    if (schema.allOf) {
      for (const sub of schema.allOf) {
        this.#collectAnchors(sub);
      }
    }
    if (schema.not) {
      this.#collectAnchors(schema.not);
    }
    if (schema.if) {
      this.#collectAnchors(schema.if);
    }
    if (schema.then) {
      this.#collectAnchors(schema.then);
    }
    if (schema.else) {
      this.#collectAnchors(schema.else);
    }
    if (schema.contains) {
      this.#collectAnchors(schema.contains);
    }
    if (schema.propertyNames) {
      this.#collectAnchors(schema.propertyNames);
    }
    if (schema.dependentSchemas) {
      for (const dep of Object.values(schema.dependentSchemas)) {
        this.#collectAnchors(dep);
      }
    }
    if (schema.contentSchema) {
      this.#collectAnchors(schema.contentSchema);
    }
  }

  validate(data: unknown): data is T {
    return this.#validate(data, this.#schema, '').errors.length === 0;
  }

  assert(data: unknown): T {
    const result = this.#validate(data, this.#schema, '');
    if (result.errors.length > 0) {
      const message = result.errors.map(e => `${e.path}: ${e.message}`).join('\n');
      throw new Error(`Validation failed:\n${message}`);
    }
    return data as T;
  }

  parse(data: unknown): ParseResult<T> {
    const result = this.#validate(data, this.#schema, '');
    if (result.errors.length === 0) {
      return { ok: true, data: data as T };
    }
    return { ok: false, errors: result.errors };
  }

  #validate(data: unknown, schema: JsonSchema, path: string): ValidationResult {
    // Boolean schemas
    if (schema === true) return { errors: [] };
    if (schema === false) {
      return { errors: [{ path, message: 'Schema is false, no value is valid', keyword: 'false' }] };
    }

    const errors: ValidationError[] = [];
    let evaluatedProperties: Set<string> | undefined;
    let evaluatedItems: Set<number> | undefined;

    // Handle $ref
    if (schema.$ref) {
      const refSchema = this.#resolveRef(schema.$ref);
      if (refSchema) {
        return this.#validate(data, refSchema, path);
      }
      return { errors: [{ path, message: `Unresolved $ref: ${schema.$ref}`, keyword: '$ref' }] };
    }

    // Handle const
    if ('const' in schema) {
      if (!this.#deepEqual(data, schema.const)) {
        errors.push({ path, message: `Expected const ${JSON.stringify(schema.const)}`, keyword: 'const', value: data });
      }
      return { errors };
    }

    // Handle enum
    if (schema.enum) {
      if (!schema.enum.some(v => this.#deepEqual(data, v))) {
        errors.push({ path, message: `Value must be one of: ${JSON.stringify(schema.enum)}`, keyword: 'enum', value: data });
      }
      return { errors };
    }

    // Handle anyOf - merge evaluated props from the first valid subschema
    if (schema.anyOf) {
      let anyValid = false;
      for (const s of schema.anyOf) {
        const result = this.#validate(data, s, path);
        if (result.errors.length === 0) {
          anyValid = true;
          // Merge evaluated properties from matching subschema
          if (result.evaluatedProperties) {
            evaluatedProperties = evaluatedProperties ?? new Set();
            for (const key of result.evaluatedProperties) {
              evaluatedProperties.add(key);
            }
          }
          if (result.evaluatedItems) {
            evaluatedItems = evaluatedItems ?? new Set();
            for (const idx of result.evaluatedItems) {
              evaluatedItems.add(idx);
            }
          }
          break;
        }
      }
      if (!anyValid) {
        errors.push({ path, message: 'Value does not match any of the schemas in anyOf', keyword: 'anyOf', value: data });
      }
      // Check unevaluatedProperties after composition
      if (schema.unevaluatedProperties !== undefined && typeof data === 'object' && data !== null && !Array.isArray(data)) {
        this.#checkUnevaluatedProperties(data as Record<string, unknown>, schema, path, evaluatedProperties ?? new Set(), errors);
      }
      // Check unevaluatedItems after composition
      if (schema.unevaluatedItems !== undefined && Array.isArray(data)) {
        this.#checkUnevaluatedItems(data, schema, path, evaluatedItems ?? new Set(), errors);
      }
      return { errors, evaluatedProperties, evaluatedItems };
    }

    // Handle oneOf - merge evaluated props from the single valid subschema
    if (schema.oneOf) {
      let validResult: ValidationResult | null = null;
      let validCount = 0;
      for (const s of schema.oneOf) {
        const result = this.#validate(data, s, path);
        if (result.errors.length === 0) {
          validCount++;
          validResult = result;
        }
      }
      if (validCount !== 1) {
        errors.push({ path, message: `Value must match exactly one schema in oneOf, matched ${validCount}`, keyword: 'oneOf', value: data });
      } else if (validResult) {
        // Merge evaluated properties from the single matching subschema
        evaluatedProperties = validResult.evaluatedProperties;
        evaluatedItems = validResult.evaluatedItems;
      }
      // Check unevaluatedProperties after composition
      if (schema.unevaluatedProperties !== undefined && typeof data === 'object' && data !== null && !Array.isArray(data)) {
        this.#checkUnevaluatedProperties(data as Record<string, unknown>, schema, path, evaluatedProperties ?? new Set(), errors);
      }
      // Check unevaluatedItems after composition
      if (schema.unevaluatedItems !== undefined && Array.isArray(data)) {
        this.#checkUnevaluatedItems(data, schema, path, evaluatedItems ?? new Set(), errors);
      }
      return { errors, evaluatedProperties, evaluatedItems };
    }

    // Handle allOf - merge evaluated props from ALL subschemas
    if (schema.allOf) {
      for (const subSchema of schema.allOf) {
        const result = this.#validate(data, subSchema, path);
        errors.push(...result.errors);
        // Merge evaluated properties from all subschemas
        if (result.evaluatedProperties) {
          evaluatedProperties = evaluatedProperties ?? new Set();
          for (const key of result.evaluatedProperties) {
            evaluatedProperties.add(key);
          }
        }
        if (result.evaluatedItems) {
          evaluatedItems = evaluatedItems ?? new Set();
          for (const idx of result.evaluatedItems) {
            evaluatedItems.add(idx);
          }
        }
      }
      // Check unevaluatedProperties after composition
      if (schema.unevaluatedProperties !== undefined && typeof data === 'object' && data !== null && !Array.isArray(data)) {
        this.#checkUnevaluatedProperties(data as Record<string, unknown>, schema, path, evaluatedProperties ?? new Set(), errors);
      }
      // Check unevaluatedItems after composition
      if (schema.unevaluatedItems !== undefined && Array.isArray(data)) {
        this.#checkUnevaluatedItems(data, schema, path, evaluatedItems ?? new Set(), errors);
      }
      return { errors, evaluatedProperties, evaluatedItems };
    }

    // Handle not - no evaluated properties from 'not'
    if (schema.not) {
      if (this.#validate(data, schema.not, path).errors.length === 0) {
        errors.push({ path, message: 'Value must not match the schema in not', keyword: 'not', value: data });
      }
      return { errors };
    }

    // Handle if/then/else - merge evaluated props from the branch taken
    if (schema.if) {
      const ifResult = this.#validate(data, schema.if, path);
      const ifValid = ifResult.errors.length === 0;
      if (ifValid && schema.then) {
        const thenResult = this.#validate(data, schema.then, path);
        errors.push(...thenResult.errors);
        evaluatedProperties = thenResult.evaluatedProperties;
        evaluatedItems = thenResult.evaluatedItems;
      } else if (!ifValid && schema.else) {
        const elseResult = this.#validate(data, schema.else, path);
        errors.push(...elseResult.errors);
        evaluatedProperties = elseResult.evaluatedProperties;
        evaluatedItems = elseResult.evaluatedItems;
      }
      // Check unevaluatedProperties after if/then/else - also include properties from base schema
      if (schema.unevaluatedProperties !== undefined && typeof data === 'object' && data !== null && !Array.isArray(data)) {
        // Also evaluate base properties
        const baseEvaluated = new Set(evaluatedProperties);
        if (schema.properties) {
          for (const key of Object.keys(schema.properties)) {
            if (key in data) baseEvaluated.add(key);
          }
        }
        this.#checkUnevaluatedProperties(data as Record<string, unknown>, schema, path, baseEvaluated, errors);
      }
      return { errors, evaluatedProperties, evaluatedItems };
    }

    // Handle type
    if (schema.type) {
      const types = Array.isArray(schema.type) ? schema.type : [schema.type];
      const typeValid = types.some(t => this.#checkType(data, t));
      if (!typeValid) {
        errors.push({ path, message: `Expected type ${types.join(' | ')}, got ${typeof data}`, keyword: 'type', value: data });
        return { errors };
      }
    }

    // Type-specific validations
    if (typeof data === 'string') {
      errors.push(...this.#validateString(data, schema, path));
    } else if (typeof data === 'number') {
      errors.push(...this.#validateNumber(data, schema, path));
    } else if (Array.isArray(data)) {
      const arrayResult = this.#validateArray(data, schema, path);
      errors.push(...arrayResult.errors);
      evaluatedItems = arrayResult.evaluatedItems;
    } else if (typeof data === 'object' && data !== null) {
      const objectResult = this.#validateObject(data as Record<string, unknown>, schema, path);
      errors.push(...objectResult.errors);
      evaluatedProperties = objectResult.evaluatedProperties;
    }

    return { errors, evaluatedProperties, evaluatedItems };
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

    // Content validation (contentEncoding, contentMediaType, contentSchema)
    if (schema.contentEncoding || schema.contentMediaType || schema.contentSchema) {
      const contentErrors = this.#validateContent(data, schema, path);
      errors.push(...contentErrors);
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

  #validateContent(data: string, schema: JsonSchemaBase, path: string): ValidationError[] {
    const errors: ValidationError[] = [];
    let decoded: string | unknown = data;

    // Step 1: Decode contentEncoding
    if (schema.contentEncoding) {
      if (schema.contentEncoding === 'base64') {
        try {
          // Validate base64 format and decode
          // Check for valid base64 characters
          if (!/^[A-Za-z0-9+/]*={0,2}$/.test(data)) {
            errors.push({
              path,
              message: 'Invalid base64 encoding',
              keyword: 'contentEncoding',
              value: data,
            });
            return errors; // Can't proceed without valid encoding
          }
          // Decode base64 - use atob in browser, Buffer in Node
          decoded = typeof atob === 'function' ? atob(data) : Buffer.from(data, 'base64').toString('utf-8');
        } catch {
          errors.push({
            path,
            message: 'Invalid base64 encoding',
            keyword: 'contentEncoding',
            value: data,
          });
          return errors; // Can't proceed without decoding
        }
      }
      // Other encodings could be added here (quoted-printable, etc.)
    }

    // Step 2: Parse contentMediaType
    if (schema.contentMediaType) {
      if (schema.contentMediaType === 'application/json') {
        try {
          decoded = JSON.parse(decoded as string);
        } catch {
          errors.push({
            path,
            message: 'Invalid JSON content',
            keyword: 'contentMediaType',
            value: data,
          });
          return errors; // Can't validate schema without parsing
        }
      }
      // Other media types could be added here (text/plain, etc.)
    }

    // Step 3: Validate against contentSchema
    if (schema.contentSchema) {
      const result = this.#validate(decoded, schema.contentSchema, path);
      errors.push(...result.errors);
    }

    return errors;
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

  #validateArray(data: unknown[], schema: JsonSchemaBase, path: string): ValidationResult {
    const errors: ValidationError[] = [];
    const evaluatedItems = new Set<number>();

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
          if (this.#validate(data[i], schema.contains, `${path}[${i}]`).errors.length === 0) {
            matchCount++;
            evaluatedItems.add(i);
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
          evaluatedItems.add(i);
          const result = this.#validate(data[i], schema.prefixItems[i], `${path}[${i}]`);
          errors.push(...result.errors);
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
          evaluatedItems.add(i);
          const result = this.#validate(data[i], schema.items, `${path}[${i}]`);
          errors.push(...result.errors);
        }
      }
    } else if (schema.items === false) {
      if (data.length > 0) {
        errors.push({ path, message: 'Array must be empty', keyword: 'items', value: data });
      }
    } else if (typeof schema.items === 'object') {
      for (let i = 0; i < data.length; i++) {
        evaluatedItems.add(i);
        const result = this.#validate(data[i], schema.items, `${path}[${i}]`);
        errors.push(...result.errors);
      }
    }

    // Check unevaluatedItems - items not evaluated by prefixItems, items, or contains
    if (schema.unevaluatedItems !== undefined) {
      for (let i = 0; i < data.length; i++) {
        if (!evaluatedItems.has(i)) {
          if (schema.unevaluatedItems === false) {
            errors.push({
              path: `${path}[${i}]`,
              message: 'Unevaluated item is not allowed',
              keyword: 'unevaluatedItems',
              value: data[i],
            });
          } else if (typeof schema.unevaluatedItems === 'object') {
            const result = this.#validate(data[i], schema.unevaluatedItems, `${path}[${i}]`);
            errors.push(...result.errors);
          }
        }
      }
    }

    return { errors, evaluatedItems };
  }

  #validateObject(data: Record<string, unknown>, schema: JsonSchemaBase, path: string): ValidationResult {
    const errors: ValidationError[] = [];
    const properties = schema.properties ?? {};
    const required = schema.required ?? [];
    const keys = Object.keys(data);
    const evaluatedProperties = new Set<string>();

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

    // Check dependentSchemas - apply additional schema constraints when trigger property exists
    if (schema.dependentSchemas) {
      for (const [trigger, dependentSchema] of Object.entries(schema.dependentSchemas)) {
        if (trigger in data) {
          // The dependent schema applies to the entire object, not just the trigger
          const result = this.#validate(data, dependentSchema, path);
          errors.push(...result.errors);
          // Merge evaluated properties from dependent schema
          if (result.evaluatedProperties) {
            for (const key of result.evaluatedProperties) {
              evaluatedProperties.add(key);
            }
          }
        }
      }
    }

    // Validate propertyNames
    if (schema.propertyNames) {
      for (const key of keys) {
        const keyErrors = this.#validate(key, schema.propertyNames, `${path}[propertyName:${key}]`);
        for (const err of keyErrors.errors) {
          errors.push({
            path: path ? `${path}.${key}` : key,
            message: `Property name "${key}" is invalid: ${err.message}`,
            keyword: 'propertyNames',
            value: key,
          });
        }
      }
    }

    // Validate known properties and mark them as evaluated
    for (const [key, propSchema] of Object.entries(properties)) {
      if (key in data) {
        evaluatedProperties.add(key);
        const result = this.#validate(data[key], propSchema, path ? `${path}.${key}` : key);
        errors.push(...result.errors);
      }
    }

    // Validate patternProperties and mark matching keys as evaluated
    if (schema.patternProperties) {
      for (const [pattern, propSchema] of Object.entries(schema.patternProperties)) {
        const regex = new RegExp(pattern);
        for (const [key, value] of Object.entries(data)) {
          if (regex.test(key)) {
            evaluatedProperties.add(key);
            const result = this.#validate(value, propSchema, path ? `${path}.${key}` : key);
            errors.push(...result.errors);
          }
        }
      }
    }

    // Validate additional properties and mark them as evaluated
    if (schema.additionalProperties !== undefined) {
      for (const [key, value] of Object.entries(data)) {
        if (!evaluatedProperties.has(key)) {
          if (schema.additionalProperties === false) {
            errors.push({ path: path ? `${path}.${key}` : key, message: 'Additional property is not allowed', keyword: 'additionalProperties', value });
          } else if (typeof schema.additionalProperties === 'object') {
            evaluatedProperties.add(key);
            const result = this.#validate(value, schema.additionalProperties, path ? `${path}.${key}` : key);
            errors.push(...result.errors);
          }
        }
      }
    }

    // Validate unevaluatedProperties - checks properties not evaluated by any other keyword
    if (schema.unevaluatedProperties !== undefined) {
      for (const [key, value] of Object.entries(data)) {
        if (!evaluatedProperties.has(key)) {
          if (schema.unevaluatedProperties === false) {
            errors.push({ path: path ? `${path}.${key}` : key, message: 'Unevaluated property is not allowed', keyword: 'unevaluatedProperties', value });
          } else if (typeof schema.unevaluatedProperties === 'object') {
            // Validate against the unevaluatedProperties schema but don't add to evaluated set
            const result = this.#validate(value, schema.unevaluatedProperties, path ? `${path}.${key}` : key);
            errors.push(...result.errors);
          }
        }
      }
    }

    return { errors, evaluatedProperties };
  }

  #checkUnevaluatedItems(
    data: unknown[],
    schema: JsonSchemaBase,
    path: string,
    evaluatedItems: Set<number>,
    errors: ValidationError[]
  ): void {
    for (let i = 0; i < data.length; i++) {
      if (!evaluatedItems.has(i)) {
        if (schema.unevaluatedItems === false) {
          errors.push({
            path: `${path}[${i}]`,
            message: 'Unevaluated item is not allowed',
            keyword: 'unevaluatedItems',
            value: data[i],
          });
        } else if (typeof schema.unevaluatedItems === 'object') {
          const result = this.#validate(data[i], schema.unevaluatedItems, `${path}[${i}]`);
          errors.push(...result.errors);
        }
      }
    }
  }

  #checkUnevaluatedProperties(
    data: Record<string, unknown>,
    schema: JsonSchemaBase,
    path: string,
    evaluatedProperties: Set<string>,
    errors: ValidationError[]
  ): void {
    for (const [key, value] of Object.entries(data)) {
      if (!evaluatedProperties.has(key)) {
        if (schema.unevaluatedProperties === false) {
          errors.push({
            path: path ? `${path}.${key}` : key,
            message: 'Unevaluated property is not allowed',
            keyword: 'unevaluatedProperties',
            value,
          });
        } else if (typeof schema.unevaluatedProperties === 'object') {
          const result = this.#validate(value, schema.unevaluatedProperties, path ? `${path}.${key}` : key);
          errors.push(...result.errors);
        }
      }
    }
  }

  #resolveRef(ref: string): JsonSchema | undefined {
    // Handle $defs reference: #/$defs/Name
    const defsMatch = ref.match(/^#\/\$defs\/(.+)$/);
    if (defsMatch && defsMatch[1] in this.#defs) {
      return this.#defs[defsMatch[1]];
    }

    // Handle anchor reference: #anchorName
    const anchorMatch = ref.match(/^#([a-zA-Z][a-zA-Z0-9_-]*)$/);
    if (anchorMatch) {
      return this.#anchors.get(anchorMatch[1]);
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
