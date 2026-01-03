/**
 * Build-time Schema Compilation
 *
 * Generates standalone validator modules that don't require the tjs compiler at runtime.
 * This drastically reduces bundle size from ~90KB to ~2-5KB for typical schemas.
 *
 * Usage:
 *   import { compileToModule } from 'tjs/standalone';
 *   const moduleCode = compileToModule(schema);
 *   // Write moduleCode to a .js file
 */

import type { JsonSchema } from '../types.js';
import { compileToCode } from './compiler.js';
import type { CompileOptions } from './context.js';

/**
 * Runtime code snippets that get included in standalone validators.
 * These are the same functions used by the compiler, but serialized as strings.
 */
const RUNTIME_DEEP_EQUAL = `function deepEqual(a, b) {
  if (a === b) return true;
  const aType = typeof a;
  const bType = typeof b;
  if (aType !== bType) return false;
  if (aType !== 'object' || a === null || b === null) return false;
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
  if (aIsArray !== bIsArray) return false;
  if (aIsArray) {
    const aArr = a;
    const bArr = b;
    const len = aArr.length;
    if (len !== bArr.length) return false;
    for (let i = 0; i < len; i++) {
      if (!deepEqual(aArr[i], bArr[i])) return false;
    }
    return true;
  }
  const aObj = a;
  const bObj = b;
  const aKeys = Object.keys(aObj);
  const len = aKeys.length;
  if (len !== Object.keys(bObj).length) return false;
  for (let i = 0; i < len; i++) {
    const key = aKeys[i];
    if (!(key in bObj) || !deepEqual(aObj[key], bObj[key])) return false;
  }
  return true;
}`;

const RUNTIME_UCS2_LENGTH = `function ucs2length(str) {
  const len = str.length;
  let length = 0;
  let pos = 0;
  let value;
  while (pos < len) {
    length++;
    value = str.charCodeAt(pos++);
    if (value >= 0xd800 && value <= 0xdbff && pos < len) {
      value = str.charCodeAt(pos);
      if ((value & 0xfc00) === 0xdc00) pos++;
    }
  }
  return length;
}`;

// Simplified format validators for standalone builds
const RUNTIME_FORMAT_VALIDATORS = `const formatValidators = {
  email: (s) => /^[a-z0-9!#$%&'*+/=?^_\`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_\`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(s),
  uuid: (s) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s),
  ipv4: (s) => /^(?:(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]?\\d)$/.test(s),
  ipv6: (s) => {
    if (s.length < 2 || s.length > 45) return false;
    const parts = s.split(':');
    if (parts.length < 3 || parts.length > 8) return false;
    return true; // Simplified
  },
  date: (s) => {
    const m = /^(\\d{4})-(\\d{2})-(\\d{2})$/.exec(s);
    if (!m) return false;
    const y = +m[1], mo = +m[2], d = +m[3];
    const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    return mo >= 1 && mo <= 12 && d >= 1 && d <= (mo === 2 && isLeap ? 29 : DAYS[mo]);
  },
  time: (s) => /^([0-2]\\d):([0-5]\\d):([0-5]\\d|60)(\\.\\d+)?(z|[+-]([0-2]\\d):([0-5]\\d))$/i.test(s),
  'date-time': (s) => {
    const idx = s.indexOf('T');
    if (idx < 0 && s.indexOf('t') < 0 && s.indexOf(' ') < 0) return false;
    return formatValidators.date(s.slice(0, 10)) && formatValidators.time(s.slice(11));
  },
  hostname: (s) => {
    if (!s || s.length > 253) return false;
    const parts = s.split('.');
    for (const p of parts) {
      if (!p || p.length > 63 || !/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/i.test(p)) return false;
    }
    return true;
  },
  uri: (s) => {
    try { new URL(s); return /^[a-z][a-z0-9+.-]*:/i.test(s); } catch { return false; }
  },
  'uri-reference': (s) => {
    if (!s) return true;
    try { new URL(s, 'http://x'); return true; } catch { return false; }
  },
  'json-pointer': (s) => s === '' || /^(\\/([^~/]|~0|~1)*)*$/.test(s),
  regex: (s) => { try { new RegExp(s, 'u'); return true; } catch { return false; } }
};`;

export interface StandaloneOptions extends CompileOptions {
  /** Export name for the validator (default: 'validator') */
  exportName?: string;
  /** Output format: 'esm' for ES modules, 'cjs' for CommonJS (default: 'esm') */
  format?: 'esm' | 'cjs';
}

/**
 * Compile a JSON Schema to a standalone ES module.
 *
 * The generated module exports a validator with:
 * - validate(data) - Returns { value, error } result
 * - assert(data) - Returns typed value or throws
 * - errors - Array of validation errors (null if valid)
 *
 * @example
 * ```ts
 * import { compileToModule } from 'tjs/standalone';
 *
 * const moduleCode = compileToModule({
 *   type: 'object',
 *   properties: { name: { type: 'string' } },
 *   required: ['name']
 * });
 *
 * // Write moduleCode to user-validator.js
 * fs.writeFileSync('user-validator.js', moduleCode);
 *
 * // Then import and use:
 * // import { validator } from './user-validator.js';
 * // validator.validate({ name: 'Alice' }); // { value: { name: 'Alice' }, error: undefined }
 * ```
 */
export function compileToModule(schema: JsonSchema, options: StandaloneOptions = {}): string {
  const { exportName = 'validator', format = 'esm', ...compileOpts } = options;

  // Compile the schema to code
  const result = compileToCode(schema, compileOpts);

  const lines: string[] = [];

  // Header comment
  lines.push('/**');
  lines.push(' * Auto-generated validator by tjs');
  lines.push(' * Do not edit manually - regenerate from schema');
  lines.push(' */');
  lines.push('');

  // Add runtime functions based on dependencies
  lines.push('// Runtime dependencies');
  if (result.runtimeDependencies.includes('deepEqual')) {
    lines.push(RUNTIME_DEEP_EQUAL);
    lines.push('');
  }
  if (result.runtimeDependencies.includes('ucs2length')) {
    lines.push(RUNTIME_UCS2_LENGTH);
    lines.push('');
  }
  if (result.runtimeDependencies.includes('formatValidators')) {
    lines.push(RUNTIME_FORMAT_VALIDATORS);
    lines.push('');
  }

  // Add any pattern regexes
  for (const dep of result.runtimeDependencies) {
    if (dep.startsWith('pattern')) {
      // These are dynamically generated regex patterns
      // We need to serialize them from the compile context
      // For now, we'll just note that they exist
    }
  }

  // Generate the main validation function
  lines.push('// Main validation function');
  lines.push(`function ${result.functionName}(data, errors) {`);
  lines.push(
    result.code
      .split('\n')
      .map((line) => '  ' + line)
      .join('\n')
  );
  lines.push('}');
  lines.push('');

  // Generate the validator wrapper
  lines.push('// Validator wrapper with .validate() and .assert() methods');
  lines.push(`const ${exportName} = Object.assign(`);
  lines.push(`  function(data) {`);
  lines.push(`    ${exportName}.errors = null;`);
  lines.push(`    const errors = [];`);
  lines.push(`    const valid = ${result.functionName}(data, errors);`);
  lines.push(`    if (!valid) {`);
  lines.push(`      ${exportName}.errors = errors;`);
  lines.push(`    }`);
  lines.push(`    return valid;`);
  lines.push(`  },`);
  lines.push(`  {`);
  lines.push(`    errors: null,`);
  lines.push(`    validate(data) {`);
  lines.push(`      const valid = ${exportName}(data);`);
  lines.push(`      if (valid) {`);
  lines.push(`        return { value: data, error: undefined };`);
  lines.push(`      }`);
  lines.push(`      return { value: undefined, error: ${exportName}.errors };`);
  lines.push(`    },`);
  lines.push(`    assert(data) {`);
  lines.push(`      if (!${exportName}(data)) {`);
  lines.push(
    `        const error = new Error(${exportName}.errors?.[0]?.message || 'Validation failed');`
  );
  lines.push(`        error.errors = ${exportName}.errors;`);
  lines.push(`        throw error;`);
  lines.push(`      }`);
  lines.push(`      return data;`);
  lines.push(`    }`);
  lines.push(`  }`);
  lines.push(`);`);
  lines.push('');

  // Export based on format
  if (format === 'esm') {
    lines.push(`export { ${exportName} };`);
    lines.push(`export default ${exportName};`);
  } else {
    lines.push(`module.exports = ${exportName};`);
    lines.push(`module.exports.${exportName} = ${exportName};`);
  }

  return lines.join('\n');
}

/**
 * Compile multiple schemas to a single module with named exports.
 * Useful for bundling related validators together.
 *
 * @example
 * ```ts
 * const moduleCode = compileMultipleToModule({
 *   userSchema: { type: 'object', properties: { name: { type: 'string' } } },
 *   postSchema: { type: 'object', properties: { title: { type: 'string' } } }
 * });
 * ```
 */
export function compileMultipleToModule(
  schemas: Record<string, JsonSchema>,
  options: Omit<StandaloneOptions, 'exportName'> = {}
): string {
  const { format = 'esm', ...compileOpts } = options;

  // Compile all schemas
  const compiledSchemas = Object.entries(schemas).map(([name, schema]) => ({
    name,
    result: compileToCode(schema, compileOpts),
  }));

  // Collect all runtime dependencies
  const allDeps = new Set<string>();
  for (const { result } of compiledSchemas) {
    for (const dep of result.runtimeDependencies) {
      allDeps.add(dep);
    }
  }

  const lines: string[] = [];

  // Header
  lines.push('/**');
  lines.push(' * Auto-generated validators by tjs');
  lines.push(' * Do not edit manually - regenerate from schemas');
  lines.push(' */');
  lines.push('');

  // Shared runtime dependencies
  lines.push('// Shared runtime dependencies');
  if (allDeps.has('deepEqual')) {
    lines.push(RUNTIME_DEEP_EQUAL);
    lines.push('');
  }
  if (allDeps.has('ucs2length')) {
    lines.push(RUNTIME_UCS2_LENGTH);
    lines.push('');
  }
  if (allDeps.has('formatValidators')) {
    lines.push(RUNTIME_FORMAT_VALIDATORS);
    lines.push('');
  }

  // Generate each validator
  for (const { name, result } of compiledSchemas) {
    lines.push(`// ${name} validator`);
    lines.push(`function ${result.functionName}(data, errors) {`);
    lines.push(
      result.code
        .split('\n')
        .map((line) => '  ' + line)
        .join('\n')
    );
    lines.push('}');
    lines.push('');

    lines.push(`const ${name} = Object.assign(`);
    lines.push(`  function(data) {`);
    lines.push(`    ${name}.errors = null;`);
    lines.push(`    const errors = [];`);
    lines.push(`    const valid = ${result.functionName}(data, errors);`);
    lines.push(`    if (!valid) { ${name}.errors = errors; }`);
    lines.push(`    return valid;`);
    lines.push(`  },`);
    lines.push(`  {`);
    lines.push(`    errors: null,`);
    lines.push(`    validate(data) {`);
    lines.push(`      const valid = ${name}(data);`);
    lines.push(
      `      return valid ? { value: data, error: undefined } : { value: undefined, error: ${name}.errors };`
    );
    lines.push(`    },`);
    lines.push(`    assert(data) {`);
    lines.push(`      if (!${name}(data)) {`);
    lines.push(
      `        const error = new Error(${name}.errors?.[0]?.message || 'Validation failed');`
    );
    lines.push(`        error.errors = ${name}.errors;`);
    lines.push(`        throw error;`);
    lines.push(`      }`);
    lines.push(`      return data;`);
    lines.push(`    }`);
    lines.push(`  }`);
    lines.push(`);`);
    lines.push('');
  }

  // Exports
  const exportNames = compiledSchemas.map((s) => s.name);
  if (format === 'esm') {
    lines.push(`export { ${exportNames.join(', ')} };`);
  } else {
    lines.push(`module.exports = { ${exportNames.join(', ')} };`);
  }

  return lines.join('\n');
}
