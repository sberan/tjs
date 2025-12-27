import type { JsonSchema, JsonSchemaBase } from './types.js';

export interface ValidationError {
  path: string;
  message: string;
  keyword: string;
  value?: unknown;
}

export type ParseResult<T> = { ok: true; data: T } | { ok: false; errors: ValidationError[] };

export interface ValidatorOptions {
  /**
   * Whether to enforce format validation as an assertion.
   * When true (default), invalid formats will cause validation failures.
   * When false, format is treated as an annotation only (per JSON Schema spec).
   * @default true
   */
  formatAssertion?: boolean;
}

// Internal result type that tracks evaluated properties/items for unevaluated* keywords
interface ValidationResult {
  errors: ValidationError[];
  evaluatedProperties?: Set<string>;
  evaluatedItems?: Set<number>;
}

export class Validator<T> {
  readonly #schema: JsonSchema;
  readonly #anchors: Map<string, JsonSchema>;
  readonly #schemasById: Map<string, JsonSchema>;
  readonly #schemaToBaseUri: Map<JsonSchema, string>;
  readonly #options: Required<ValidatorOptions>;

  // Phantom type for type inference
  declare readonly type: T;

  constructor(schema: JsonSchema, options: ValidatorOptions = {}) {
    this.#schema = schema;
    this.#anchors = new Map();
    this.#schemasById = new Map();
    this.#schemaToBaseUri = new Map();
    this.#options = {
      formatAssertion: options.formatAssertion ?? true,
    };
    // Get root $id as base URI, or empty string
    const rootBaseUri =
      typeof schema === 'object' && schema !== null && schema.$id ? schema.$id : '';
    this.#collectAnchors(schema, rootBaseUri);
  }

  #collectAnchors(schema: JsonSchema, baseUri: string): void {
    if (typeof schema !== 'object' || schema === null) return;

    // If this schema has $id, it establishes a new base URI
    let currentBaseUri = baseUri;
    if (schema.$id) {
      // Resolve $id against the current base URI
      currentBaseUri = this.#resolveUri(schema.$id, baseUri);
      this.#schemasById.set(currentBaseUri, schema);
    }

    // Store the base URI for this schema (used when resolving $ref)
    this.#schemaToBaseUri.set(schema, currentBaseUri);

    // Register $anchor with the current base URI
    if (schema.$anchor) {
      // Store as baseUri#anchor for lookup
      const anchorUri = currentBaseUri
        ? `${currentBaseUri}#${schema.$anchor}`
        : `#${schema.$anchor}`;
      this.#anchors.set(anchorUri, schema);
      // Also store by just the anchor name for simple lookups
      this.#anchors.set(schema.$anchor, schema);
    }

    // Recurse into all subschemas with the current base URI
    if (schema.$defs) {
      for (const def of Object.values(schema.$defs)) {
        this.#collectAnchors(def, currentBaseUri);
      }
    }
    if (schema.properties) {
      for (const prop of Object.values(schema.properties)) {
        this.#collectAnchors(prop, currentBaseUri);
      }
    }
    if (schema.items && typeof schema.items === 'object') {
      this.#collectAnchors(schema.items, currentBaseUri);
    }
    if (schema.prefixItems) {
      for (const item of schema.prefixItems) {
        this.#collectAnchors(item, currentBaseUri);
      }
    }
    if (schema.additionalProperties && typeof schema.additionalProperties === 'object') {
      this.#collectAnchors(schema.additionalProperties, currentBaseUri);
    }
    if (schema.unevaluatedProperties && typeof schema.unevaluatedProperties === 'object') {
      this.#collectAnchors(schema.unevaluatedProperties, currentBaseUri);
    }
    if (schema.unevaluatedItems && typeof schema.unevaluatedItems === 'object') {
      this.#collectAnchors(schema.unevaluatedItems, currentBaseUri);
    }
    if (schema.anyOf) {
      for (const sub of schema.anyOf) {
        this.#collectAnchors(sub, currentBaseUri);
      }
    }
    if (schema.oneOf) {
      for (const sub of schema.oneOf) {
        this.#collectAnchors(sub, currentBaseUri);
      }
    }
    if (schema.allOf) {
      for (const sub of schema.allOf) {
        this.#collectAnchors(sub, currentBaseUri);
      }
    }
    if (schema.not) {
      this.#collectAnchors(schema.not, currentBaseUri);
    }
    if (schema.if) {
      this.#collectAnchors(schema.if, currentBaseUri);
    }
    if (schema.then) {
      this.#collectAnchors(schema.then, currentBaseUri);
    }
    if (schema.else) {
      this.#collectAnchors(schema.else, currentBaseUri);
    }
    if (schema.contains) {
      this.#collectAnchors(schema.contains, currentBaseUri);
    }
    if (schema.propertyNames) {
      this.#collectAnchors(schema.propertyNames, currentBaseUri);
    }
    if (schema.dependentSchemas) {
      for (const dep of Object.values(schema.dependentSchemas)) {
        this.#collectAnchors(dep, currentBaseUri);
      }
    }
    if (schema.contentSchema) {
      this.#collectAnchors(schema.contentSchema, currentBaseUri);
    }
  }

  #resolveUri(ref: string, baseUri: string): string {
    // If ref is already absolute (has scheme), return as-is
    if (/^[a-z][a-z0-9+.-]*:/i.test(ref)) {
      return ref;
    }

    // If ref starts with /, it's an absolute path - combine with base URI's scheme+host
    if (ref.startsWith('/')) {
      const match = baseUri.match(/^([a-z][a-z0-9+.-]*:\/\/[^/]+)/i);
      if (match) {
        return match[1] + ref;
      }
      return ref;
    }

    // If no base URI, return as-is
    if (!baseUri) {
      return ref;
    }

    // Relative URI - resolve against base
    // Remove fragment from base URI
    const baseWithoutFragment = baseUri.split('#')[0];

    // Remove the last path segment from base and append ref
    const lastSlash = baseWithoutFragment.lastIndexOf('/');
    if (lastSlash !== -1) {
      let resolved = baseWithoutFragment.slice(0, lastSlash + 1) + ref;
      // Normalize ./ and ../ in the path
      resolved = this.#normalizeUriPath(resolved);
      return resolved;
    }

    return ref;
  }

  #normalizeUriPath(uri: string): string {
    // Find the scheme and authority part (e.g., "https://example.com")
    const match = uri.match(/^([a-z][a-z0-9+.-]*:\/\/[^/]*)(\/.*)?$/i);
    if (!match) {
      // For URNs or other non-path URIs, just return as-is
      return uri;
    }

    const authority = match[1];
    let path = match[2] || '/';

    // Split path into segments
    const segments = path.split('/');
    const normalized: string[] = [];

    for (const segment of segments) {
      if (segment === '.' || segment === '') {
        // Skip current directory markers and empty segments (except keeping leading /)
        if (normalized.length === 0) normalized.push('');
        continue;
      }
      if (segment === '..') {
        // Go up one directory (but not above root)
        if (normalized.length > 1) {
          normalized.pop();
        }
      } else {
        normalized.push(segment);
      }
    }

    return authority + normalized.join('/');
  }

  validate(data: unknown): data is T {
    return this.#validate(data, this.#schema, '').errors.length === 0;
  }

  assert(data: unknown): T {
    const result = this.#validate(data, this.#schema, '');
    if (result.errors.length > 0) {
      const message = result.errors.map((e) => `${e.path}: ${e.message}`).join('\n');
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
      return {
        errors: [{ path, message: 'Schema is false, no value is valid', keyword: 'false' }],
      };
    }

    const errors: ValidationError[] = [];
    let evaluatedProperties: Set<string> | undefined;
    let evaluatedItems: Set<number> | undefined;

    // Handle $ref - in draft 2020-12, $ref applies alongside sibling keywords
    if (schema.$ref) {
      const refSchema = this.#resolveRef(schema.$ref, schema);
      if (refSchema) {
        const refResult = this.#validate(data, refSchema, path);
        errors.push(...refResult.errors);
        // Merge evaluated properties/items from $ref
        if (refResult.evaluatedProperties) {
          evaluatedProperties = evaluatedProperties ?? new Set();
          for (const key of refResult.evaluatedProperties) {
            evaluatedProperties.add(key);
          }
        }
        if (refResult.evaluatedItems) {
          evaluatedItems = evaluatedItems ?? new Set();
          for (const idx of refResult.evaluatedItems) {
            evaluatedItems.add(idx);
          }
        }
        // Continue to validate sibling keywords (don't return early)
      } else {
        errors.push({ path, message: `Unresolved $ref: ${schema.$ref}`, keyword: '$ref' });
      }
    }

    // Handle const
    if ('const' in schema) {
      if (!this.#deepEqual(data, schema.const)) {
        errors.push({
          path,
          message: `Expected const ${JSON.stringify(schema.const)}`,
          keyword: 'const',
          value: data,
        });
      }
      return { errors };
    }

    // Handle enum
    if (schema.enum) {
      if (!schema.enum.some((v) => this.#deepEqual(data, v))) {
        errors.push({
          path,
          message: `Value must be one of: ${JSON.stringify(schema.enum)}`,
          keyword: 'enum',
          value: data,
        });
      }
      return { errors };
    }

    // Handle anyOf - merge evaluated props from ALL valid subschemas
    if (schema.anyOf) {
      let anyValid = false;
      for (const s of schema.anyOf) {
        const result = this.#validate(data, s, path);
        if (result.errors.length === 0) {
          anyValid = true;
          // Merge evaluated properties from ALL matching subschemas (don't break)
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
          // Don't break - continue to collect annotations from other valid subschemas
        }
      }
      if (!anyValid) {
        errors.push({
          path,
          message: 'Value does not match any of the schemas in anyOf',
          keyword: 'anyOf',
          value: data,
        });
      }
      // Continue to validate base schema keywords below (don't return early)
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
        errors.push({
          path,
          message: `Value must match exactly one schema in oneOf, matched ${validCount}`,
          keyword: 'oneOf',
          value: data,
        });
      } else if (validResult) {
        // Merge evaluated properties from the single matching subschema
        if (validResult.evaluatedProperties) {
          evaluatedProperties = evaluatedProperties ?? new Set();
          for (const key of validResult.evaluatedProperties) {
            evaluatedProperties.add(key);
          }
        }
        if (validResult.evaluatedItems) {
          evaluatedItems = evaluatedItems ?? new Set();
          for (const idx of validResult.evaluatedItems) {
            evaluatedItems.add(idx);
          }
        }
      }
      // Continue to validate base schema keywords below (don't return early)
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
      // Continue to validate base schema keywords below (don't return early)
    }

    // Handle not - no evaluated properties from 'not'
    if (schema.not) {
      if (this.#validate(data, schema.not, path).errors.length === 0) {
        errors.push({
          path,
          message: 'Value must not match the schema in not',
          keyword: 'not',
          value: data,
        });
      }
      // Continue to validate base schema keywords below (don't return early)
    }

    // Handle if/then/else - merge evaluated props based on which branch is taken
    // Check !== undefined to handle if: false
    if (schema.if !== undefined) {
      const ifResult = this.#validate(data, schema.if, path);
      const ifValid = ifResult.errors.length === 0;

      if (ifValid) {
        // When if is TRUE: merge from if AND then (if exists)
        if (ifResult.evaluatedProperties) {
          evaluatedProperties = evaluatedProperties ?? new Set();
          for (const key of ifResult.evaluatedProperties) {
            evaluatedProperties.add(key);
          }
        }
        if (ifResult.evaluatedItems) {
          evaluatedItems = evaluatedItems ?? new Set();
          for (const idx of ifResult.evaluatedItems) {
            evaluatedItems.add(idx);
          }
        }

        if (schema.then !== undefined) {
          const thenResult = this.#validate(data, schema.then, path);
          errors.push(...thenResult.errors);
          if (thenResult.evaluatedProperties) {
            evaluatedProperties = evaluatedProperties ?? new Set();
            for (const key of thenResult.evaluatedProperties) {
              evaluatedProperties.add(key);
            }
          }
          if (thenResult.evaluatedItems) {
            evaluatedItems = evaluatedItems ?? new Set();
            for (const idx of thenResult.evaluatedItems) {
              evaluatedItems.add(idx);
            }
          }
        }
      } else {
        // When if is FALSE: merge from else (if exists), NOT from if
        if (schema.else !== undefined) {
          const elseResult = this.#validate(data, schema.else, path);
          errors.push(...elseResult.errors);
          if (elseResult.evaluatedProperties) {
            evaluatedProperties = evaluatedProperties ?? new Set();
            for (const key of elseResult.evaluatedProperties) {
              evaluatedProperties.add(key);
            }
          }
          if (elseResult.evaluatedItems) {
            evaluatedItems = evaluatedItems ?? new Set();
            for (const idx of elseResult.evaluatedItems) {
              evaluatedItems.add(idx);
            }
          }
        }
      }
      // Continue to validate base schema keywords below (don't return early)
    }

    // Handle type
    if (schema.type) {
      const types = Array.isArray(schema.type) ? schema.type : [schema.type];
      const typeValid = types.some((t) => this.#checkType(data, t));
      if (!typeValid) {
        errors.push({
          path,
          message: `Expected type ${types.join(' | ')}, got ${typeof data}`,
          keyword: 'type',
          value: data,
        });
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
      // Merge evaluated items from array validation with those from composition
      if (arrayResult.evaluatedItems) {
        evaluatedItems = evaluatedItems ?? new Set();
        for (const idx of arrayResult.evaluatedItems) {
          evaluatedItems.add(idx);
        }
      }
    } else if (typeof data === 'object' && data !== null) {
      const objectResult = this.#validateObject(data as Record<string, unknown>, schema, path);
      errors.push(...objectResult.errors);
      // Merge evaluated properties from object validation with those from composition
      if (objectResult.evaluatedProperties) {
        evaluatedProperties = evaluatedProperties ?? new Set();
        for (const key of objectResult.evaluatedProperties) {
          evaluatedProperties.add(key);
        }
      }
    }

    // Check unevaluatedProperties after all validation (composition + base schema)
    if (
      schema.unevaluatedProperties !== undefined &&
      typeof data === 'object' &&
      data !== null &&
      !Array.isArray(data)
    ) {
      this.#checkUnevaluatedProperties(
        data as Record<string, unknown>,
        schema,
        path,
        evaluatedProperties ?? new Set(),
        errors
      );
      // When unevaluatedProperties is true or a schema (not false), mark all properties as evaluated
      // This is important for parent schemas that also have unevaluatedProperties
      if (schema.unevaluatedProperties !== false) {
        evaluatedProperties = evaluatedProperties ?? new Set();
        for (const key of Object.keys(data as Record<string, unknown>)) {
          evaluatedProperties.add(key);
        }
      }
    }

    // Check unevaluatedItems after all validation (composition + base schema)
    if (schema.unevaluatedItems !== undefined && Array.isArray(data)) {
      this.#checkUnevaluatedItems(data, schema, path, evaluatedItems ?? new Set(), errors);
      // When unevaluatedItems is true or a schema (not false), mark all items as evaluated
      // This is important for parent schemas that also have unevaluatedItems
      if (schema.unevaluatedItems !== false) {
        evaluatedItems = evaluatedItems ?? new Set();
        for (let i = 0; i < data.length; i++) {
          evaluatedItems.add(i);
        }
      }
    }

    return { errors, evaluatedProperties, evaluatedItems };
  }

  #checkType(data: unknown, type: string): boolean {
    switch (type) {
      case 'string':
        return typeof data === 'string';
      case 'number':
        return typeof data === 'number';
      case 'integer':
        return typeof data === 'number' && Number.isInteger(data);
      case 'boolean':
        return typeof data === 'boolean';
      case 'null':
        return data === null;
      case 'array':
        return Array.isArray(data);
      case 'object':
        return typeof data === 'object' && data !== null && !Array.isArray(data);
      default:
        return false;
    }
  }

  #validateString(data: string, schema: JsonSchemaBase, path: string): ValidationError[] {
    const errors: ValidationError[] = [];

    // Use code point count (not code unit count) for length validation
    // This handles surrogate pairs correctly (e.g., emoji like 💩)
    const codePointLength = [...data].length;

    if (schema.minLength !== undefined && codePointLength < schema.minLength) {
      errors.push({
        path,
        message: `String must have at least ${schema.minLength} characters`,
        keyword: 'minLength',
        value: data,
      });
    }
    if (schema.maxLength !== undefined && codePointLength > schema.maxLength) {
      errors.push({
        path,
        message: `String must have at most ${schema.maxLength} characters`,
        keyword: 'maxLength',
        value: data,
      });
    }
    if (schema.pattern !== undefined && !new RegExp(schema.pattern).test(data)) {
      errors.push({
        path,
        message: `String must match pattern ${schema.pattern}`,
        keyword: 'pattern',
        value: data,
      });
    }
    // Format validation is configurable via options.formatAssertion
    // When true (default), format is enforced as an assertion
    // When false, format is treated as annotation-only (per JSON Schema spec)
    if (schema.format !== undefined && this.#options.formatAssertion) {
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
      email: (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s),
      uuid: (s) =>
        /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s),
      'date-time': (s) => !isNaN(Date.parse(s)) && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/.test(s),
      uri: (s) => /^[a-z][a-z\d+.-]*:\/\/.+$/i.test(s),
      ipv4: (s) =>
        /^(\d{1,3}\.){3}\d{1,3}$/.test(s) && s.split('.').every((n) => parseInt(n) <= 255),
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

    const validator = formatValidators[format];
    if (validator && !validator(data)) {
      return { path, message: `Invalid ${format} format`, keyword: 'format', value: data };
    }
    return null;
  }

  #validateContent(_data: string, _schema: JsonSchemaBase, _path: string): ValidationError[] {
    // Per JSON Schema spec (draft 2020-12), contentEncoding, contentMediaType,
    // and contentSchema are ANNOTATIONS, not assertions. They do not cause
    // validation failures by default. Validation of content is optional and
    // only happens if explicitly enabled by the application.
    // See: https://json-schema.org/understanding-json-schema/reference/non_json_data
    return [];
  }

  #validateNumber(data: number, schema: JsonSchemaBase, path: string): ValidationError[] {
    const errors: ValidationError[] = [];

    if (schema.minimum !== undefined && data < schema.minimum) {
      errors.push({
        path,
        message: `Number must be >= ${schema.minimum}`,
        keyword: 'minimum',
        value: data,
      });
    }
    if (schema.maximum !== undefined && data > schema.maximum) {
      errors.push({
        path,
        message: `Number must be <= ${schema.maximum}`,
        keyword: 'maximum',
        value: data,
      });
    }
    if (schema.exclusiveMinimum !== undefined && data <= schema.exclusiveMinimum) {
      errors.push({
        path,
        message: `Number must be > ${schema.exclusiveMinimum}`,
        keyword: 'exclusiveMinimum',
        value: data,
      });
    }
    if (schema.exclusiveMaximum !== undefined && data >= schema.exclusiveMaximum) {
      errors.push({
        path,
        message: `Number must be < ${schema.exclusiveMaximum}`,
        keyword: 'exclusiveMaximum',
        value: data,
      });
    }
    if (schema.multipleOf !== undefined) {
      // Use division and check if result is an integer to handle floating-point precision
      // This approach works better for both small multipleOf (1e-8) and regular cases
      const quotient = data / schema.multipleOf;
      const isMultiple =
        Number.isFinite(quotient) && Math.abs(quotient - Math.round(quotient)) < 1e-10;
      if (!isMultiple) {
        errors.push({
          path,
          message: `Number must be a multiple of ${schema.multipleOf}`,
          keyword: 'multipleOf',
          value: data,
        });
      }
    }

    return errors;
  }

  #validateArray(data: unknown[], schema: JsonSchemaBase, path: string): ValidationResult {
    const errors: ValidationError[] = [];
    const evaluatedItems = new Set<number>();

    if (schema.minItems !== undefined && data.length < schema.minItems) {
      errors.push({
        path,
        message: `Array must have at least ${schema.minItems} items`,
        keyword: 'minItems',
        value: data,
      });
    }
    if (schema.maxItems !== undefined && data.length > schema.maxItems) {
      errors.push({
        path,
        message: `Array must have at most ${schema.maxItems} items`,
        keyword: 'maxItems',
        value: data,
      });
    }
    if (schema.uniqueItems && !this.#areItemsUnique(data)) {
      errors.push({
        path,
        message: 'Array items must be unique',
        keyword: 'uniqueItems',
        value: data,
      });
    }

    // Validate contains (check !== undefined to handle contains: false)
    if (schema.contains !== undefined) {
      const minContains = schema.minContains ?? 1;
      const maxContains = schema.maxContains ?? Infinity;

      // Count matching items
      let matchCount = 0;
      for (let i = 0; i < data.length; i++) {
        if (this.#validate(data[i], schema.contains, `${path}[${i}]`).errors.length === 0) {
          matchCount++;
          evaluatedItems.add(i);
        }
      }

      // minContains: 0 makes contains always pass, but maxContains still applies
      if (minContains > 0 && matchCount < minContains) {
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
          errors.push({
            path,
            message: `Array must have exactly ${restStart} items`,
            keyword: 'items',
            value: data,
          });
        }
      } else if (schema.items === true) {
        // items: true means all remaining items are valid and evaluated
        for (let i = restStart; i < data.length; i++) {
          evaluatedItems.add(i);
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
    } else if (schema.items === true) {
      // items: true means all items are valid and evaluated
      for (let i = 0; i < data.length; i++) {
        evaluatedItems.add(i);
      }
    } else if (typeof schema.items === 'object') {
      for (let i = 0; i < data.length; i++) {
        evaluatedItems.add(i);
        const result = this.#validate(data[i], schema.items, `${path}[${i}]`);
        errors.push(...result.errors);
      }
    }

    // Note: unevaluatedItems is now checked in #validate after all composition
    // keywords are processed, so we have access to evaluated items from allOf/anyOf/etc.

    return { errors, evaluatedItems };
  }

  #validateObject(
    data: Record<string, unknown>,
    schema: JsonSchemaBase,
    path: string
  ): ValidationResult {
    const errors: ValidationError[] = [];
    const properties = schema.properties ?? {};
    const required = schema.required ?? [];
    const keys = Object.keys(data);
    const evaluatedProperties = new Set<string>();

    // Check minProperties/maxProperties
    if (schema.minProperties !== undefined && keys.length < schema.minProperties) {
      errors.push({
        path,
        message: `Object must have at least ${schema.minProperties} properties`,
        keyword: 'minProperties',
        value: keys.length,
      });
    }
    if (schema.maxProperties !== undefined && keys.length > schema.maxProperties) {
      errors.push({
        path,
        message: `Object must have at most ${schema.maxProperties} properties`,
        keyword: 'maxProperties',
        value: keys.length,
      });
    }

    // Check required properties
    // Use Object.hasOwn to avoid prototype pollution (e.g., __proto__, toString, constructor)
    for (const key of required) {
      if (!Object.hasOwn(data, key)) {
        errors.push({
          path: path ? `${path}.${key}` : key,
          message: 'Required property is missing',
          keyword: 'required',
        });
      }
    }

    // Check dependentRequired
    if (schema.dependentRequired) {
      for (const [trigger, dependents] of Object.entries(schema.dependentRequired)) {
        if (Object.hasOwn(data, trigger)) {
          for (const dependent of dependents) {
            if (!Object.hasOwn(data, dependent)) {
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
    // Note: Properties from dependentSchemas are NOT visible to additionalProperties,
    // but ARE visible to unevaluatedProperties. We track them separately.
    const evaluatedByApplicators = new Set<string>();
    if (schema.dependentSchemas) {
      for (const [trigger, dependentSchema] of Object.entries(schema.dependentSchemas)) {
        if (Object.hasOwn(data, trigger)) {
          // The dependent schema applies to the entire object, not just the trigger
          const result = this.#validate(data, dependentSchema, path);
          errors.push(...result.errors);
          // Track evaluated properties for unevaluatedProperties (not additionalProperties)
          if (result.evaluatedProperties) {
            for (const key of result.evaluatedProperties) {
              evaluatedByApplicators.add(key);
            }
          }
        }
      }
    }

    // Validate propertyNames (check !== undefined to handle propertyNames: false)
    if (schema.propertyNames !== undefined) {
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
      if (Object.hasOwn(data, key)) {
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
            errors.push({
              path: path ? `${path}.${key}` : key,
              message: 'Additional property is not allowed',
              keyword: 'additionalProperties',
              value,
            });
          } else if (schema.additionalProperties === true) {
            // additionalProperties: true means all additional properties are valid and evaluated
            evaluatedProperties.add(key);
          } else if (typeof schema.additionalProperties === 'object') {
            evaluatedProperties.add(key);
            const result = this.#validate(
              value,
              schema.additionalProperties,
              path ? `${path}.${key}` : key
            );
            errors.push(...result.errors);
          }
        }
      }
    }

    // Note: unevaluatedProperties is now checked in #validate after all composition
    // keywords are processed, so we have access to evaluated props from allOf/anyOf/etc.

    // Merge applicator-evaluated properties into result for unevaluatedProperties
    // (but after additionalProperties has already been checked)
    for (const key of evaluatedByApplicators) {
      evaluatedProperties.add(key);
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
          const result = this.#validate(
            value,
            schema.unevaluatedProperties,
            path ? `${path}.${key}` : key
          );
          errors.push(...result.errors);
        }
      }
    }
  }

  #resolveRef(ref: string, fromSchema: JsonSchemaBase): JsonSchema | undefined {
    // Get the base URI of the schema containing this $ref
    const currentBaseUri = this.#schemaToBaseUri.get(fromSchema) ?? '';

    // Handle root reference: #
    if (ref === '#') {
      // If we have a current base URI, return the schema with that $id
      // Otherwise return the root schema
      if (currentBaseUri) {
        return this.#schemasById.get(currentBaseUri) ?? this.#schema;
      }
      return this.#schema;
    }

    // Handle JSON Pointer: #/path/to/something
    if (ref.startsWith('#/')) {
      // Resolve relative to the current base URI's schema
      if (currentBaseUri) {
        const baseSchema = this.#schemasById.get(currentBaseUri);
        if (baseSchema) {
          return this.#resolveJsonPointerInSchema(baseSchema, ref.slice(1));
        }
      }
      return this.#resolveJsonPointer(ref.slice(1));
    }

    // Handle anchor reference: #anchorName
    const anchorMatch = ref.match(/^#([a-zA-Z][a-zA-Z0-9_-]*)$/);
    if (anchorMatch) {
      // Try with full base URI first
      if (currentBaseUri) {
        const fullAnchorUri = `${currentBaseUri}#${anchorMatch[1]}`;
        const result = this.#anchors.get(fullAnchorUri);
        if (result) return result;
      }
      // Fall back to simple anchor lookup
      return this.#anchors.get(anchorMatch[1]);
    }

    // Handle URN or URI with fragment (e.g., "urn:uuid:xxx#/path" or "http://example.com/schema#anchor")
    const fragmentIndex = ref.indexOf('#');
    if (fragmentIndex !== -1) {
      const refBaseUri = ref.slice(0, fragmentIndex);
      const fragment = ref.slice(fragmentIndex);

      // Resolve the base URI relative to current base
      const resolvedUri = this.#resolveUri(refBaseUri, currentBaseUri);

      // Look up the schema by resolved URI
      const baseSchema = this.#schemasById.get(resolvedUri);
      if (baseSchema) {
        // If there's a fragment, resolve it within that schema
        if (fragment === '#') {
          return baseSchema;
        }
        if (fragment.startsWith('#/')) {
          // JSON Pointer relative to the base schema
          return this.#resolveJsonPointerInSchema(baseSchema, fragment.slice(1));
        }
        // Anchor reference - look for $anchor in the base schema
        const anchorName = fragment.slice(1);
        return this.#findAnchorInSchema(baseSchema, anchorName);
      }
    }

    // Handle plain URI/URN reference (without fragment)
    // Resolve relative to current base URI
    const resolvedRef = this.#resolveUri(ref, currentBaseUri);
    const schema = this.#schemasById.get(resolvedRef);
    if (schema) {
      return schema;
    }

    // Also try the original ref in case it's already absolute
    return this.#schemasById.get(ref);
  }

  #findAnchorInSchema(schema: JsonSchema, anchorName: string): JsonSchema | undefined {
    if (typeof schema !== 'object' || schema === null) return undefined;

    // Get the base URI for this schema to track scope
    const baseUri = this.#schemaToBaseUri.get(schema);

    if (schema.$anchor === anchorName) {
      return schema;
    }

    // Search in all subschemas, but skip those with their own $id (they create new scope)
    const searchIn = [
      ...(schema.$defs ? Object.values(schema.$defs) : []),
      ...(schema.properties ? Object.values(schema.properties) : []),
      ...(schema.prefixItems ?? []),
      ...(schema.anyOf ?? []),
      ...(schema.oneOf ?? []),
      ...(schema.allOf ?? []),
      schema.items,
      schema.additionalProperties,
      schema.unevaluatedProperties,
      schema.unevaluatedItems,
      schema.not,
      schema.if,
      schema.then,
      schema.else,
      schema.contains,
      schema.propertyNames,
      ...(schema.dependentSchemas ? Object.values(schema.dependentSchemas) : []),
      schema.contentSchema,
    ];

    for (const subSchema of searchIn) {
      if (typeof subSchema === 'object' && subSchema !== null) {
        // Skip subschemas that have their own $id - they create a different scope
        // Only search in subschemas that share the same base URI
        const subBaseUri = this.#schemaToBaseUri.get(subSchema);
        if (subBaseUri === baseUri) {
          const found = this.#findAnchorInSchema(subSchema, anchorName);
          if (found) return found;
        }
      }
    }

    return undefined;
  }

  #resolveJsonPointerInSchema(schema: JsonSchema, pointer: string): JsonSchema | undefined {
    if (pointer === '' || pointer === '/') {
      return schema;
    }

    // Split pointer into segments and decode JSON Pointer escapes
    const segments = pointer
      .split('/')
      .slice(1) // Remove leading empty segment from split
      .map((seg) => {
        // First decode URL encoding (e.g., %22 -> ", %25 -> %)
        let decoded = seg;
        try {
          decoded = decodeURIComponent(seg);
        } catch {
          // If decoding fails, use original segment
        }
        // Then decode JSON Pointer escapes
        return decoded
          .replace(/~1/g, '/') // ~1 -> /
          .replace(/~0/g, '~'); // ~0 -> ~
      });

    let current: unknown = schema;

    for (const segment of segments) {
      if (current === null || typeof current !== 'object') {
        return undefined;
      }

      if (Array.isArray(current)) {
        const index = parseInt(segment, 10);
        if (isNaN(index) || index < 0 || index >= current.length) {
          return undefined;
        }
        current = current[index];
      } else {
        const obj = current as Record<string, unknown>;
        if (!(segment in obj)) {
          return undefined;
        }
        current = obj[segment];
      }
    }

    return current as JsonSchema;
  }

  #resolveJsonPointer(pointer: string): JsonSchema | undefined {
    if (pointer === '' || pointer === '/') {
      return this.#schema;
    }

    // Split pointer into segments and decode JSON Pointer escapes
    const segments = pointer
      .split('/')
      .slice(1) // Remove leading empty segment from split
      .map((seg) => {
        // First decode URL encoding (e.g., %22 -> ", %25 -> %)
        let decoded = seg;
        try {
          decoded = decodeURIComponent(seg);
        } catch {
          // If decoding fails, use original segment
        }
        // Then decode JSON Pointer escapes
        return decoded
          .replace(/~1/g, '/') // ~1 -> /
          .replace(/~0/g, '~'); // ~0 -> ~
      });

    let current: unknown = this.#schema;

    for (const segment of segments) {
      if (current === null || typeof current !== 'object') {
        return undefined;
      }

      if (Array.isArray(current)) {
        const index = parseInt(segment, 10);
        if (isNaN(index) || index < 0 || index >= current.length) {
          return undefined;
        }
        current = current[index];
      } else {
        const obj = current as Record<string, unknown>;
        if (!(segment in obj)) {
          return undefined;
        }
        current = obj[segment];
      }
    }

    return current as JsonSchema;
  }

  #areItemsUnique(data: unknown[]): boolean {
    // O(n^2) comparison using deepEqual to handle object key order
    for (let i = 0; i < data.length; i++) {
      for (let j = i + 1; j < data.length; j++) {
        if (this.#deepEqual(data[i], data[j])) {
          return false;
        }
      }
    }
    return true;
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
    return aKeys.every((k) => this.#deepEqual(aObj[k], bObj[k]));
  }
}
