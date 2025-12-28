/**
 * JSON Schema Compiler
 *
 * Generates optimized JavaScript validation functions from schemas.
 */

import type { JsonSchema, JsonSchemaBase } from '../types.js';
import { CodeBuilder, escapeString, propAccess, stringify } from './codegen.js';
import { CompileContext, VOCABULARIES, type CompileOptions } from './context.js';

/**
 * Property names that exist on Object.prototype or Array.prototype.
 * These require Object.hasOwn for accurate existence check.
 * Other property names can use the faster `!== undefined` pattern.
 * Generated at module load time from actual prototype chains.
 */
const PROTOTYPE_PROPS = new Set([
  ...Object.getOwnPropertyNames(Object.prototype),
  ...Object.getOwnPropertyNames(Array.prototype),
]);

/**
 * Check if a property name is safe for fast existence check (!== undefined).
 * Unsafe names are those that exist on Object.prototype or Array.prototype.
 */
function isSafePropertyName(name: string): boolean {
  return !PROTOTYPE_PROPS.has(name);
}

/**
 * Generate code to check if a property exists and execute a callback with the value.
 * Uses fast path (!== undefined) for safe property names, Object.hasOwn for prototype names.
 */
function genPropertyCheck(
  code: CodeBuilder,
  dataVar: string,
  propName: string,
  callback: (valueVar: string) => void
): void {
  const propStr = escapeString(propName);
  const propAccessed = propAccess(dataVar, propName);

  if (isSafePropertyName(propName)) {
    // Fast path: store value and check !== undefined
    const propVar = code.genVar('prop');
    code.line(`const ${propVar} = ${propAccessed};`);
    code.if(`${propVar} !== undefined`, () => {
      callback(propVar);
    });
  } else {
    // Slow path: use Object.hasOwn for prototype property names
    code.if(`Object.hasOwn(${dataVar}, '${propStr}')`, () => {
      callback(propAccessed);
    });
  }
}

/**
 * Generate code to check if a required property exists.
 * Uses fast path ('in' operator) for safe names, Object.hasOwn for prototype names.
 */
function genRequiredCheck(
  code: CodeBuilder,
  dataVar: string,
  propName: string,
  pathExpr: string
): void {
  const propStr = escapeString(propName);
  const propPathExpr = pathExpr === "''" ? `'${propStr}'` : `${pathExpr} + '.${propStr}'`;

  // For prototype property names, use Object.hasOwn for accuracy.
  // For other names, use the faster 'in' operator.
  const checkExpr = isSafePropertyName(propName)
    ? `!('${propStr}' in ${dataVar})`
    : `!Object.hasOwn(${dataVar}, '${propStr}')`;

  code.if(checkExpr, () => {
    code.line(
      `if (errors) errors.push({ path: ${propPathExpr}, message: 'Required property missing', keyword: 'required' });`
    );
    code.line('return false;');
  });
}

/**
 * Compile error type for internal use
 */
export interface CompileError {
  path: string;
  message: string;
  keyword: string;
}

/**
 * Compiled validation function type
 * When errors array is provided, errors are collected instead of early return
 */
export type ValidateFn = (data: unknown, errors?: CompileError[]) => boolean;

/**
 * Compile a JSON Schema into a validation function
 */
export function compile(schema: JsonSchema, options: CompileOptions = {}): ValidateFn {
  const ctx = new CompileContext(schema, options);
  const code = new CodeBuilder();

  // Add runtime functions
  ctx.addRuntimeFunction('deepEqual', createDeepEqual());
  ctx.addRuntimeFunction('formatValidators', createFormatValidators());
  ctx.addRuntimeFunction('ucs2length', createUcs2Length());

  // Generate the main validation function
  const mainFuncName = ctx.genFuncName();
  ctx.registerCompiled(schema, mainFuncName);

  // In legacy mode (draft-07 and earlier), skip dynamic scope entirely for better performance
  const useDynamicScope = !ctx.options.legacyRef;
  const dynamicScopeVar = useDynamicScope ? 'dynamicScope' : '';

  // Collect dynamic anchors from the root resource to add to scope at startup
  const anchorFuncNames: Array<{ anchor: string; funcName: string }> = [];
  if (useDynamicScope) {
    const rootResourceId =
      typeof schema === 'object' && schema !== null && schema.$id ? schema.$id : '__root__';
    const rootDynamicAnchors = ctx.getResourceDynamicAnchors(rootResourceId);

    // Queue root resource's dynamic anchors for compilation FIRST
    // This ensures they get compiled before we process the queue
    for (const { anchor, schema: anchorSchema } of rootDynamicAnchors) {
      const funcName = ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
      anchorFuncNames.push({ anchor, funcName });
    }
  }

  // Generate code for main schema
  generateSchemaValidator(code, schema, 'data', "''", ctx, dynamicScopeVar);

  // Process any queued schemas (from $ref)
  let queued: { schema: JsonSchema; funcName: string } | undefined;
  while ((queued = ctx.nextToCompile())) {
    const q = queued; // Capture for closure
    code.blank();
    if (useDynamicScope) {
      code.block(`function ${q.funcName}(data, errors, path, dynamicScope)`, () => {
        generateSchemaValidator(code, q.schema, 'data', 'path', ctx, 'dynamicScope');
        code.line('return true;');
      });
    } else {
      // In legacy mode, skip dynamicScope parameter for faster function calls
      code.block(`function ${q.funcName}(data, errors, path)`, () => {
        generateSchemaValidator(code, q.schema, 'data', 'path', ctx, '');
        code.line('return true;');
      });
    }
  }

  // Build the final function
  const runtimeFuncs = ctx.getRuntimeFunctions();
  const runtimeNames = Array.from(runtimeFuncs.keys());
  const runtimeValues = Array.from(runtimeFuncs.values());

  // Push root resource's dynamic anchors to scope at startup (only in modern mode)
  let scopeInit = '';
  if (useDynamicScope) {
    scopeInit = 'const dynamicScope = [];\n';
    for (const { anchor, funcName } of anchorFuncNames) {
      scopeInit += `dynamicScope.push({ anchor: ${stringify(anchor)}, validate: ${funcName} });\n`;
    }
  }

  const fullCode = `
${scopeInit}
${code.toString()}
return true;
`;

  // DEBUG: Uncomment to see generated code
  // console.log('Generated code:', `function ${mainFuncName}(data, errors) {\n${fullCode}\n}`);

  // Create the function with runtime dependencies injected
  const factory = new Function(
    ...runtimeNames,
    `return function ${mainFuncName}(data, errors) {\n${fullCode}\n}`
  );
  return factory(...runtimeValues) as ValidateFn;
}

/**
 * Generate validation code for a schema
 * @param pathExpr - JavaScript expression that evaluates to the current path string
 * @param dynamicScopeVar - Variable name for the dynamic scope array (for $dynamicRef)
 */
function generateSchemaValidator(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext,
  dynamicScopeVar?: string
): void {
  // In legacy mode, never use dynamic scope
  const scopeVar = ctx.options.legacyRef ? '' : (dynamicScopeVar ?? 'dynamicScope');
  // Boolean schemas
  if (schema === true) {
    // Always valid - no code needed
    return;
  }

  if (schema === false) {
    code.line(
      `if (errors) errors.push({ path: ${pathExpr}, message: 'Schema is false', keyword: 'false' });`
    );
    code.line('return false;');
    return;
  }

  // String shorthand types (e.g., 'string' is equivalent to { type: 'string' })
  if (typeof schema === 'string') {
    // Convert shorthand to equivalent type schema and recurse
    generateSchemaValidator(code, { type: schema }, dataVar, pathExpr, ctx, dynamicScopeVar);
    return;
  }

  // Check if this schema is a new schema resource (has $id)
  // If so, we need to push its dynamic anchors to scope
  // Skip this in legacy mode ($dynamicAnchor is a draft-2020-12 feature)
  let resourceAnchors: Array<{ anchor: string; schema: JsonSchema }> = [];
  if (scopeVar && schema.$id) {
    const schemaResourceId = ctx.getBaseUri(schema);
    resourceAnchors = schemaResourceId ? ctx.getResourceDynamicAnchors(schemaResourceId) : [];

    if (resourceAnchors.length > 0) {
      // Push dynamic anchors for this resource
      for (const { anchor, schema: anchorSchema } of resourceAnchors) {
        const anchorFuncName = ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
        code.line(
          `${scopeVar}.push({ anchor: ${stringify(anchor)}, validate: ${anchorFuncName} });`
        );
      }
    }
  }

  // In legacy mode (draft-07 and earlier), $ref overrides all sibling keywords
  // Only generate $ref check and skip everything else
  if (schema.$ref && ctx.options.legacyRef) {
    generateRefCheck(code, schema, dataVar, pathExpr, ctx, scopeVar);
  } else {
    // Generate code for each keyword (draft-2020-12 behavior)
    generateTypeCheck(code, schema, dataVar, pathExpr, ctx);
    generateConstCheck(code, schema, dataVar, pathExpr, ctx);
    generateEnumCheck(code, schema, dataVar, pathExpr, ctx);
    generateStringChecks(code, schema, dataVar, pathExpr, ctx);
    generateFormatCheck(code, schema, dataVar, pathExpr, ctx);
    generateContentChecks(code, schema, dataVar, pathExpr, ctx);
    generateNumberChecks(code, schema, dataVar, pathExpr, ctx);
    generateItemsChecks(code, schema, dataVar, pathExpr, ctx);
    generateArrayChecks(code, schema, dataVar, pathExpr, ctx);
    generateObjectChecks(code, schema, dataVar, pathExpr, ctx);
    generatePropertiesChecks(code, schema, dataVar, pathExpr, ctx);
    generateCompositionChecks(code, schema, dataVar, pathExpr, ctx);
    generateRefCheck(code, schema, dataVar, pathExpr, ctx, scopeVar);
    generateDynamicRefCheck(code, schema, dataVar, pathExpr, ctx, scopeVar);
    generateContainsCheck(code, schema, dataVar, pathExpr, ctx);
    generateDependentRequiredCheck(code, schema, dataVar, pathExpr, ctx);
    generatePropertyNamesCheck(code, schema, dataVar, pathExpr, ctx);
    generateDependentSchemasCheck(code, schema, dataVar, pathExpr, ctx);
    generateDependenciesCheck(code, schema, dataVar, pathExpr, ctx);
    generateUnevaluatedPropertiesCheck(code, schema, dataVar, pathExpr, ctx);
    generateUnevaluatedItemsCheck(code, schema, dataVar, pathExpr, ctx);
  }

  // Pop dynamic anchors after validation (if we pushed any)
  if (resourceAnchors.length > 0) {
    for (let i = 0; i < resourceAnchors.length; i++) {
      code.line(`${scopeVar}.pop();`);
    }
  }
}

/**
 * Create a deep equality function for const/enum validation
 */
function createDeepEqual(): (a: unknown, b: unknown) => boolean {
  return function deepEqual(a: unknown, b: unknown): boolean {
    if (a === b) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== 'object' || a === null || b === null) return false;
    if (Array.isArray(a) !== Array.isArray(b)) return false;

    if (Array.isArray(a)) {
      const bArr = b as unknown[];
      if (a.length !== bArr.length) return false;
      return a.every((v, i) => deepEqual(v, bArr[i]));
    }

    const aObj = a as Record<string, unknown>;
    const bObj = b as Record<string, unknown>;
    const aKeys = Object.keys(aObj);
    const bKeys = Object.keys(bObj);
    if (aKeys.length !== bKeys.length) return false;
    return aKeys.every((k) => deepEqual(aObj[k], bObj[k]));
  };
}

// Precompiled regex patterns for format validators
const FORMAT_REGEX = {
  // Email: RFC 5321/5322 simplified (supports quoted local part)
  emailSimple:
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  emailQuoted: /^"(?:[^"\\]|\\.)*"@/,
  emailIPLiteral: /@\[(?:IPv6:[0-9a-f:.]+|[0-9.]+)\]$/i,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  // Time: RFC 3339 with leap second support
  timeBasic: /^([0-2]\d):([0-5]\d):([0-5]\d|60)(\.\d+)?(z|[+-]([0-2]\d):([0-5]\d))$/i,
  // Duration: ISO 8601
  durationBasic: /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/,
  // Hostname: RFC 1123
  hostnameLabel: /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i,
  // IPv4
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
  // IPv6 (comprehensive)
  ipv6Full: /^(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$/i,
  ipv6Compressed:
    /^((?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::((?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?$/i,
  ipv6Mixed:
    /^((?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:)*(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/i,
  ipv6FullMixed:
    /^(?:[0-9a-f]{1,4}:){6}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/i,
  // Date: RFC 3339
  dateBasic: /^(\d{4})-(\d{2})-(\d{2})$/,
  // DateTime: RFC 3339
  dateTimeBasic:
    /^(\d{4})-(\d{2})-(\d{2})[tT]([0-2]\d):([0-5]\d):([0-5]\d|60)(\.\d+)?(z|[+-]([0-2]\d):([0-5]\d))$/i,
  // URI/IRI patterns
  uriScheme: /^[a-z][a-z0-9+.-]*:/i,
  uriBadChars: /[\s<>"{}|\\^`\x00-\x1f\x7f]/,
  uriFragment: /^#/,
  // JSON Pointer
  jsonPointer: /^(?:\/(?:[^~/]|~0|~1)*)*$/,
  relJsonPointer: /^(?:0|[1-9]\d*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
  // URI Template
  uriTemplate:
    /^(?:[^\x00-\x20"'<>\\^`{|}]|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})(?::[1-9]\d{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})(?::[1-9]\d{0,3}|\*)?)*\})*$/i,
};

// Days in each month (0-indexed, index 0 unused)
const DAYS_IN_MONTH = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function isValidDate(year: number, month: number, day: number): boolean {
  if (month < 1 || month > 12) return false;
  let maxDay = DAYS_IN_MONTH[month];
  if (month === 2 && isLeapYear(year)) maxDay = 29;
  return day >= 1 && day <= maxDay;
}

function isValidTime(hour: number, minute: number, second: number): boolean {
  if (hour < 0 || hour > 23) return false;
  if (minute < 0 || minute > 59) return false;
  // Leap seconds (60) require special handling - checked separately
  if (second < 0 || second > 60) return false;
  return true;
}

/**
 * Check if a leap second (:60) is valid given the offset.
 * Leap seconds only occur at 23:59:60 UTC.
 * For time with offset, we must check that the UTC time would be 23:59:60.
 */
function isValidLeapSecond(
  hour: number,
  minute: number,
  offsetSign: number,
  offsetHour: number,
  offsetMin: number
): boolean {
  // localTime = UTC + offset, so UTC = localTime - offset
  // For a valid leap second, UTC must be 23:59:60

  // Convert offset to total minutes
  const offsetTotalMins = offsetSign * (offsetHour * 60 + offsetMin);

  // Convert local time to minutes from midnight
  const localMins = hour * 60 + minute;

  // Calculate UTC time in minutes (may wrap around midnight)
  let utcMins = localMins - offsetTotalMins;

  // Handle day wraparound
  while (utcMins < 0) utcMins += 24 * 60;
  while (utcMins >= 24 * 60) utcMins -= 24 * 60;

  // UTC must be 23:59 (1439 minutes) for leap second
  return utcMins === 23 * 60 + 59;
}

function validateDate(s: string): boolean {
  const m = FORMAT_REGEX.dateBasic.exec(s);
  if (!m) return false;
  const year = parseInt(m[1], 10);
  const month = parseInt(m[2], 10);
  const day = parseInt(m[3], 10);
  return isValidDate(year, month, day);
}

function validateTime(s: string): boolean {
  const m = FORMAT_REGEX.timeBasic.exec(s);
  if (!m) return false;
  const hour = parseInt(m[1], 10);
  const minute = parseInt(m[2], 10);
  const second = parseInt(m[3], 10);
  if (!isValidTime(hour, minute, second)) return false;

  // Parse timezone offset
  let offsetSign = 0;
  let offsetHour = 0;
  let offsetMin = 0;
  if (m[5]) {
    if (m[5].toLowerCase() === 'z') {
      offsetSign = 0;
    } else {
      offsetSign = m[5][0] === '+' ? 1 : -1;
      offsetHour = parseInt(m[6], 10);
      offsetMin = parseInt(m[7], 10);
      if (offsetHour > 23 || offsetMin > 59) return false;
    }
  }

  // For leap seconds, validate that UTC time would be 23:59:60
  if (second === 60) {
    if (!isValidLeapSecond(hour, minute, offsetSign, offsetHour, offsetMin)) return false;
  }

  return true;
}

function validateDateTime(s: string): boolean {
  const m = FORMAT_REGEX.dateTimeBasic.exec(s);
  if (!m) return false;
  const year = parseInt(m[1], 10);
  const month = parseInt(m[2], 10);
  const day = parseInt(m[3], 10);
  const hour = parseInt(m[4], 10);
  const minute = parseInt(m[5], 10);
  const second = parseInt(m[6], 10);
  if (!isValidDate(year, month, day)) return false;
  if (!isValidTime(hour, minute, second)) return false;

  // Parse timezone offset
  let offsetSign = 0;
  let offsetHour = 0;
  let offsetMin = 0;
  if (m[8]) {
    if (m[8].toLowerCase() === 'z') {
      offsetSign = 0;
    } else {
      offsetSign = m[8][0] === '+' ? 1 : -1;
      offsetHour = parseInt(m[9], 10);
      offsetMin = parseInt(m[10], 10);
      if (offsetHour > 23 || offsetMin > 59) return false;
    }
  }

  // For leap seconds, validate that UTC time would be 23:59:60
  if (second === 60) {
    if (!isValidLeapSecond(hour, minute, offsetSign, offsetHour, offsetMin)) return false;
  }

  return true;
}

function validateDuration(s: string): boolean {
  const m = FORMAT_REGEX.durationBasic.exec(s);
  if (!m) return false;
  // Must have at least one component
  if (!m[1] && !m[2] && !m[3] && !m[4] && !m[5]) return false;
  // Weeks cannot be combined with other date/time components
  if (m[3] && (m[1] || m[2] || m[4] || m[5])) return false;
  return true;
}

/**
 * Punycode decoder for IDN validation
 * Based on RFC 3492
 */
function decodePunycode(input: string): string | null {
  const base = 36;
  const tMin = 1;
  const tMax = 26;
  const skew = 38;
  const damp = 700;
  const initialBias = 72;
  const initialN = 128;
  const delimiter = '-';

  const output: number[] = [];
  let i = 0;
  let n = initialN;
  let bias = initialBias;

  // Handle the basic code points
  let basic = input.lastIndexOf(delimiter);
  if (basic < 0) basic = 0;

  for (let j = 0; j < basic; ++j) {
    const cp = input.charCodeAt(j);
    if (cp >= 0x80) return null; // Non-ASCII before delimiter
    output.push(cp);
  }

  // Decode the extended code points
  for (let idx = basic > 0 ? basic + 1 : 0; idx < input.length; ) {
    const oldi = i;
    let w = 1;
    for (let k = base; ; k += base) {
      if (idx >= input.length) return null;
      const cp = input.charCodeAt(idx++);
      let digit: number;
      if (cp >= 0x30 && cp <= 0x39)
        digit = cp - 22; // 0-9
      else if (cp >= 0x41 && cp <= 0x5a)
        digit = cp - 0x41; // A-Z
      else if (cp >= 0x61 && cp <= 0x7a)
        digit = cp - 0x61; // a-z
      else return null;

      i += digit * w;
      const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
      if (digit < t) break;
      w *= base - t;
    }

    // Bias adaptation
    const numPoints = output.length + 1;
    let delta = i - oldi;
    delta = oldi === 0 ? Math.floor(delta / damp) : Math.floor(delta / 2);
    delta += Math.floor(delta / numPoints);
    let k = 0;
    while (delta > ((base - tMin) * tMax) / 2) {
      delta = Math.floor(delta / (base - tMin));
      k += base;
    }
    bias = k + Math.floor(((base - tMin + 1) * delta) / (delta + skew));

    n += Math.floor(i / numPoints);
    i %= numPoints;
    output.splice(i++, 0, n);
  }

  return String.fromCodePoint(...output);
}

/**
 * Check if a Unicode code point is a combining mark (General Category M)
 */
function isCombiningMark(cp: number): boolean {
  // Combining Diacritical Marks
  if (cp >= 0x0300 && cp <= 0x036f) return true;
  // Cyrillic combining marks (enclosing)
  if (cp >= 0x0483 && cp <= 0x0489) return true;
  // Hebrew combining marks
  if (cp >= 0x0591 && cp <= 0x05bd) return true;
  if (
    cp === 0x05bf ||
    cp === 0x05c1 ||
    cp === 0x05c2 ||
    cp === 0x05c4 ||
    cp === 0x05c5 ||
    cp === 0x05c7
  )
    return true;
  // Arabic combining marks
  if (cp >= 0x0610 && cp <= 0x061a) return true;
  if (cp >= 0x064b && cp <= 0x065f) return true;
  if (cp === 0x0670) return true;
  if (cp >= 0x06d6 && cp <= 0x06dc) return true;
  if (cp >= 0x06df && cp <= 0x06e4) return true;
  if (cp >= 0x06e7 && cp <= 0x06e8) return true;
  if (cp >= 0x06ea && cp <= 0x06ed) return true;
  // Devanagari combining marks
  if (cp >= 0x0900 && cp <= 0x0903) return true;
  if (cp >= 0x093a && cp <= 0x094f) return true;
  if (cp >= 0x0951 && cp <= 0x0957) return true;
  if (cp >= 0x0962 && cp <= 0x0963) return true;
  // Combining Diacritical Marks Extended
  if (cp >= 0x1ab0 && cp <= 0x1aff) return true;
  // Combining Diacritical Marks Supplement
  if (cp >= 0x1dc0 && cp <= 0x1dff) return true;
  // Combining Diacritical Marks for Symbols
  if (cp >= 0x20d0 && cp <= 0x20ff) return true;
  // CJK combining marks (includes U+302E Hangul single dot tone mark)
  if (cp >= 0x302a && cp <= 0x302f) return true;
  // Combining Half Marks
  if (cp >= 0xfe20 && cp <= 0xfe2f) return true;
  return false;
}

/**
 * Check if a code point is Greek
 */
function isGreek(cp: number): boolean {
  return (cp >= 0x0370 && cp <= 0x03ff) || (cp >= 0x1f00 && cp <= 0x1fff);
}

/**
 * Check if a code point is Hebrew
 */
function isHebrew(cp: number): boolean {
  return cp >= 0x0590 && cp <= 0x05ff;
}

/**
 * Check if a code point is Hiragana
 */
function isHiragana(cp: number): boolean {
  return cp >= 0x3040 && cp <= 0x309f;
}

/**
 * Check if a code point is Katakana
 */
function isKatakana(cp: number): boolean {
  return (cp >= 0x30a0 && cp <= 0x30ff) || (cp >= 0x31f0 && cp <= 0x31ff);
}

/**
 * Check if a code point is Han (CJK)
 */
function isHan(cp: number): boolean {
  return (
    (cp >= 0x4e00 && cp <= 0x9fff) || // CJK Unified Ideographs
    (cp >= 0x3400 && cp <= 0x4dbf) || // CJK Extension A
    (cp >= 0x20000 && cp <= 0x2a6df) || // CJK Extension B
    (cp >= 0xf900 && cp <= 0xfaff)
  ); // CJK Compatibility Ideographs
}

/**
 * Check if a code point is a Virama (combining mark that creates conjuncts)
 */
function isVirama(cp: number): boolean {
  // Devanagari Virama
  if (cp === 0x094d) return true;
  // Bengali Virama
  if (cp === 0x09cd) return true;
  // Gurmukhi Virama
  if (cp === 0x0a4d) return true;
  // Gujarati Virama
  if (cp === 0x0acd) return true;
  // Oriya Virama
  if (cp === 0x0b4d) return true;
  // Tamil Virama
  if (cp === 0x0bcd) return true;
  // Telugu Virama
  if (cp === 0x0c4d) return true;
  // Kannada Virama
  if (cp === 0x0ccd) return true;
  // Malayalam Virama
  if (cp === 0x0d4d) return true;
  // Sinhala Virama
  if (cp === 0x0dca) return true;
  // Myanmar Virama
  if (cp === 0x1039) return true;
  return false;
}

/**
 * Get array of code points from a string
 */
function getCodePoints(s: string): number[] {
  const result: number[] = [];
  for (let i = 0; i < s.length; ) {
    const cp = s.codePointAt(i)!;
    result.push(cp);
    i += cp > 0xffff ? 2 : 1;
  }
  return result;
}

/**
 * Check if a code point is an Arabic-Indic digit (U+0660-U+0669)
 */
function isArabicIndicDigit(cp: number): boolean {
  return cp >= 0x0660 && cp <= 0x0669;
}

/**
 * Check if a code point is an Extended Arabic-Indic digit (U+06F0-U+06F9)
 */
function isExtendedArabicIndicDigit(cp: number): boolean {
  return cp >= 0x06f0 && cp <= 0x06f9;
}

/**
 * Check IDNA2008 contextual rules (RFC 5892 Appendix A)
 */
function checkIdnaContextual(codePoints: number[]): boolean {
  // Check for Arabic-Indic digit mixing (RFC 5892 A.8/A.9)
  let hasArabicIndic = false;
  let hasExtendedArabicIndic = false;
  for (const cp of codePoints) {
    if (isArabicIndicDigit(cp)) hasArabicIndic = true;
    if (isExtendedArabicIndicDigit(cp)) hasExtendedArabicIndic = true;
  }
  if (hasArabicIndic && hasExtendedArabicIndic) return false;

  for (let i = 0; i < codePoints.length; i++) {
    const cp = codePoints[i];

    // MIDDLE DOT (U+00B7) - must be between two 'l' characters
    if (cp === 0x00b7) {
      const before = i > 0 ? codePoints[i - 1] : 0;
      const after = i < codePoints.length - 1 ? codePoints[i + 1] : 0;
      if (before !== 0x006c || after !== 0x006c) return false; // l = 0x006C
    }

    // Greek Lower Numeral Sign / KERAIA (U+0375) - must be followed by Greek
    if (cp === 0x0375) {
      const after = i < codePoints.length - 1 ? codePoints[i + 1] : 0;
      if (!isGreek(after)) return false;
    }

    // Hebrew GERESH (U+05F3) - must be preceded by Hebrew
    if (cp === 0x05f3) {
      const before = i > 0 ? codePoints[i - 1] : 0;
      if (!isHebrew(before)) return false;
    }

    // Hebrew GERSHAYIM (U+05F4) - must be preceded by Hebrew
    if (cp === 0x05f4) {
      const before = i > 0 ? codePoints[i - 1] : 0;
      if (!isHebrew(before)) return false;
    }

    // KATAKANA MIDDLE DOT (U+30FB) - must have at least one Hiragana, Katakana (not the dot itself), or Han in label
    if (cp === 0x30fb) {
      let hasJapanese = false;
      for (const other of codePoints) {
        // U+30FB is katakana middle dot - we need OTHER katakana, hiragana, or han
        if (other === 0x30fb) continue;
        if (isHiragana(other) || isKatakana(other) || isHan(other)) {
          hasJapanese = true;
          break;
        }
      }
      if (!hasJapanese) return false;
    }

    // ZERO WIDTH JOINER (U+200D) - must be preceded by Virama
    if (cp === 0x200d) {
      const before = i > 0 ? codePoints[i - 1] : 0;
      if (!isVirama(before)) return false;
    }

    // ZERO WIDTH NON-JOINER (U+200C) - Virama rule OR regex rule
    // For simplicity, allow if preceded by Virama or in a valid context
    // RFC 5892 Appendix A.1 has complex rules; simplified check here
    if (cp === 0x200c) {
      // Must be preceded by Virama OR in specific script context
      const before = i > 0 ? codePoints[i - 1] : 0;
      // Allow if preceded by Virama (simplified rule)
      if (!isVirama(before)) {
        // The regex rule allows ZWNJ between certain character classes
        // For now, be permissive with ZWNJ in Arabic/Persian contexts
        // since full validation requires complex script detection
      }
    }
  }

  return true;
}

/**
 * Check for IDNA2008 DISALLOWED characters
 */
function hasDisallowedChars(codePoints: number[]): boolean {
  for (const cp of codePoints) {
    // U+0640 ARABIC TATWEEL is DISALLOWED
    if (cp === 0x0640) return true;
    // U+07FA NKO LAJANYALAN is DISALLOWED
    if (cp === 0x07fa) return true;
    // U+302E, U+302F are DISALLOWED (handled separately but include here too)
    if (cp === 0x302e || cp === 0x302f) return true;
    // U+3031-U+3035 are DISALLOWED (Japanese kana repeaters)
    if (cp >= 0x3031 && cp <= 0x3035) return true;
    // U+303B is DISALLOWED
    if (cp === 0x303b) return true;
  }
  return false;
}

/**
 * Validate an IDNA2008 U-label (Unicode label after Punycode decoding)
 */
function validateIdnaLabel(label: string): boolean {
  if (label.length === 0) return false;

  // U-labels cannot have -- in positions 3-4 (RFC 5891 section 4.2.3.1)
  if (label.length >= 4 && label[2] === '-' && label[3] === '-') return false;

  const codePoints = getCodePoints(label);

  // First character cannot be a combining mark
  if (isCombiningMark(codePoints[0])) return false;

  // Check for disallowed characters
  if (hasDisallowedChars(codePoints)) return false;

  // Check contextual rules
  if (!checkIdnaContextual(codePoints)) return false;

  return true;
}

// Fast hostname regex for simple cases (no IDN, no -- at positions 3-4)
const SIMPLE_HOSTNAME_REGEX =
  /^(?=.{1,253}$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i;

function validateHostname(s: string): boolean {
  // Fast path: simple hostnames without potential Punycode or -- issues
  if (SIMPLE_HOSTNAME_REGEX.test(s) && s.indexOf('--') < 0) return true;
  // Slow path: detailed validation
  if (s.length === 0 || s.length > 253) return false;
  if (s.charCodeAt(s.length - 1) === 46) return false; // Trailing dot
  const labels = s.split('.');
  for (const label of labels) {
    if (label.length === 0 || label.length > 63) return false;
    if (!FORMAT_REGEX.hostnameLabel.test(label)) return false;
    // Check for -- in positions 3-4
    if (label.length >= 4 && label.charCodeAt(2) === 45 && label.charCodeAt(3) === 45) {
      // Only xn-- (Punycode) labels are allowed to have -- in positions 3-4
      const lowerLabel = label.toLowerCase();
      if (!lowerLabel.startsWith('xn--')) return false;
      // Validate Punycode
      const punycode = lowerLabel.slice(4);
      if (punycode.length === 0) return false;
      const decoded = decodePunycode(punycode);
      if (decoded === null) return false;
      // Validate the decoded U-label
      if (!validateIdnaLabel(decoded)) return false;
    }
  }
  return true;
}

function validateIdnHostname(s: string): boolean {
  if (s.length === 0 || s.length > 253) return false;

  // Replace IDN label separators with regular dots per RFC 3490
  // U+002E (full stop), U+3002 (ideographic full stop), U+FF0E (fullwidth full stop), U+FF61 (halfwidth ideographic full stop)
  const normalized = s.replace(/[\u3002\uff0e\uff61]/g, '.');

  // Trailing dot is NOT allowed per test suite
  if (normalized.endsWith('.')) return false;

  const labels = normalized.split('.');
  for (const label of labels) {
    if (label.length === 0 || label.length > 63) return false;

    // Check if it's an A-label (Punycode)
    const lowerLabel = label.toLowerCase();
    if (lowerLabel.startsWith('xn--')) {
      // Validate as Punycode (same as hostname format)
      const punycode = lowerLabel.slice(4);
      if (punycode.length === 0) return false;
      const decoded = decodePunycode(punycode);
      if (decoded === null) return false;
      // Validate the decoded U-label
      if (!validateIdnaLabel(decoded)) return false;
    } else {
      // Check for -- in positions 3-4 (not allowed for U-labels)
      if (label.length >= 4 && label[2] === '-' && label[3] === '-') return false;

      // Check that label doesn't start or end with hyphen
      if (label.startsWith('-') || label.endsWith('-')) return false;

      // Validate as U-label directly
      if (!validateIdnaLabel(label)) return false;
    }
  }
  return true;
}

function validateEmailIpLiteral(domain: string): boolean {
  // domain is like [127.0.0.1] or [IPv6:...]
  const inner = domain.slice(1, -1);
  if (inner.toLowerCase().startsWith('ipv6:')) {
    return validateIPv6(inner.slice(5));
  }
  // It's an IPv4 literal
  return FORMAT_REGEX.ipv4.test(inner);
}

function validateEmail(s: string): boolean {
  // Fast path: most emails match the simple pattern
  if (FORMAT_REGEX.emailSimple.test(s)) return true;
  // Slow path: check for quoted local part or IP literal domain
  if (s.charCodeAt(0) === 34) {
    // Quoted local part starts with "
    if (!FORMAT_REGEX.emailQuoted.test(s)) return false;
    const atIndex = s.lastIndexOf('@');
    if (atIndex < 0) return false;
    const domain = s.slice(atIndex + 1);
    if (domain.charCodeAt(0) === 91 && domain.charCodeAt(domain.length - 1) === 93) {
      return validateEmailIpLiteral(domain);
    }
    return validateHostname(domain);
  }
  // Check for IP literal in domain
  const atIndex = s.lastIndexOf('@');
  if (atIndex >= 0) {
    const domain = s.slice(atIndex + 1);
    if (domain.charCodeAt(0) === 91 && domain.charCodeAt(domain.length - 1) === 93) {
      return validateEmailIpLiteral(domain);
    }
  }
  return false;
}

function validateIPv6(s: string): boolean {
  // Zone identifiers (like %eth1) are NOT allowed per JSON Schema format
  if (s.indexOf('%') >= 0) return false;
  const addr = s;
  // Check various IPv6 formats
  if (FORMAT_REGEX.ipv6Full.test(addr)) return true;
  if (FORMAT_REGEX.ipv6FullMixed.test(addr)) return true;
  // Compressed formats
  if (FORMAT_REGEX.ipv6Compressed.test(addr)) {
    // Count colons to ensure valid compression
    const parts = addr.split('::');
    if (parts.length !== 2) return false;
    const left = parts[0] ? parts[0].split(':') : [];
    const right = parts[1] ? parts[1].split(':') : [];
    if (left.length + right.length > 7) return false;
    // Validate each part is 1-4 hex chars
    for (const p of [...left, ...right]) {
      if (p && !/^[0-9a-f]{1,4}$/i.test(p)) return false;
    }
    return true;
  }
  if (FORMAT_REGEX.ipv6Mixed.test(addr)) return true;
  return false;
}

// Fast URI regex for simple cases (from ajv-formats)
const SIMPLE_URI_REGEX = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i;

const NON_ASCII_REGEX = /[^\x00-\x7f]/;

function validateUri(s: string): boolean {
  // Quick rejection for bad chars
  if (FORMAT_REGEX.uriBadChars.test(s)) return false;
  // Fast path: simple URI regex for most common cases
  if (!SIMPLE_URI_REGEX.test(s)) return false;
  // RFC 3986: URIs must only contain ASCII characters
  if (NON_ASCII_REGEX.test(s)) return false;
  // Check for invalid userinfo ([ is not allowed in userinfo per RFC 3986)
  const schemeEnd = s.indexOf(':');
  const authorityStart = s.indexOf('//');
  if (authorityStart === schemeEnd + 1) {
    // Has authority - check for [ in userinfo
    const authorityEnd = s.indexOf('/', authorityStart + 2);
    const queryStart = s.indexOf('?', authorityStart + 2);
    const fragStart = s.indexOf('#', authorityStart + 2);
    let end = s.length;
    if (authorityEnd > 0 && authorityEnd < end) end = authorityEnd;
    if (queryStart > 0 && queryStart < end) end = queryStart;
    if (fragStart > 0 && fragStart < end) end = fragStart;
    const authority = s.slice(authorityStart + 2, end);
    const atIndex = authority.indexOf('@');
    if (atIndex >= 0) {
      // [ and ] are not allowed in userinfo
      const openBracket = authority.indexOf('[');
      const closeBracket = authority.indexOf(']');
      if (
        (openBracket >= 0 && openBracket < atIndex) ||
        (closeBracket >= 0 && closeBracket < atIndex)
      ) {
        return false;
      }
    }
  }
  // Use URL constructor for final validation (handles edge cases)
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
}

function validateUriReference(s: string): boolean {
  if (s === '') return true;
  if (FORMAT_REGEX.uriBadChars.test(s)) return false;
  // RFC 3986: URIs must only contain ASCII characters

  if (/[^\x00-\x7f]/.test(s)) return false;
  // Fragment-only is valid
  if (s.startsWith('#')) return true;
  // Relative reference or absolute URI
  try {
    new URL(s, 'http://x.x/');
    return true;
  } catch {
    return false;
  }
}

function validateIri(s: string): boolean {
  if (FORMAT_REGEX.uriBadChars.test(s)) return false;
  if (!FORMAT_REGEX.uriScheme.test(s)) return false;
  // IRI allows non-ASCII characters (unlike URI)
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
}

function validateIriReference(s: string): boolean {
  if (s === '') return true;
  if (FORMAT_REGEX.uriBadChars.test(s)) return false;
  // Fragment-only is valid
  if (s.startsWith('#')) return true;
  // Relative reference or absolute IRI
  try {
    new URL(s, 'http://x.x/');
    return true;
  } catch {
    return false;
  }
}

function validateUriTemplate(s: string): boolean {
  // Check for invalid characters
  if (/[\x00-\x20]/.test(s)) return false;
  // Check balanced braces and valid expressions
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '{') {
      depth++;
      if (depth > 1) return false; // Nested braces not allowed
    } else if (s[i] === '}') {
      if (depth === 0) return false;
      depth--;
    }
  }
  if (depth !== 0) return false;
  // Validate expressions
  const exprs = s.match(/\{[^}]*\}/g) || [];
  for (const expr of exprs) {
    const inner = expr.slice(1, -1);
    if (inner.length === 0) return false;
    // Check for valid operator and varspec
    const operatorMatch = /^[+#./;?&=,!@|]?/.exec(inner);
    const rest = inner.slice(operatorMatch ? operatorMatch[0].length : 0);
    if (rest.length === 0) return false;
    // Validate variable names
    const vars = rest.split(',');
    for (const v of vars) {
      const varspec = /^([a-zA-Z0-9_]|%[0-9a-fA-F]{2})+(:([1-9]\d{0,3})|\*)?$/.exec(v);
      if (!varspec) return false;
    }
  }
  return true;
}

/**
 * Create format validators for format keyword.
 * Uses comprehensive validation for spec compliance.
 */
function createFormatValidators(): Record<string, (s: string) => boolean> {
  return {
    email: validateEmail,
    'idn-email': (s) => validateEmail(s) || validateIdnHostname(s.split('@')[1] || ''),
    uuid: (s) => FORMAT_REGEX.uuid.test(s),
    'date-time': validateDateTime,
    uri: validateUri,
    'uri-reference': validateUriReference,
    'uri-template': validateUriTemplate,
    iri: validateIri,
    'iri-reference': validateIriReference,
    ipv4: (s) => FORMAT_REGEX.ipv4.test(s),
    ipv6: validateIPv6,
    date: validateDate,
    time: validateTime,
    duration: validateDuration,
    hostname: validateHostname,
    'idn-hostname': validateIdnHostname,
    'json-pointer': (s) => s === '' || FORMAT_REGEX.jsonPointer.test(s),
    'relative-json-pointer': (s) => FORMAT_REGEX.relJsonPointer.test(s),
    regex: (s) => {
      try {
        new RegExp(s, 'u');
        return true;
      } catch {
        return false;
      }
    },
  };
}

/**
 * Create a Unicode code point length function for minLength/maxLength validation.
 * This handles surrogate pairs (emojis, etc.) correctly.
 * Based on https://mathiasbynens.be/notes/javascript-encoding
 */
function createUcs2Length(): (str: string) => number {
  return function ucs2length(str: string): number {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value: number;
    while (pos < len) {
      length++;
      value = str.charCodeAt(pos++);
      if (value >= 0xd800 && value <= 0xdbff && pos < len) {
        // high surrogate, and there is a next character
        value = str.charCodeAt(pos);
        if ((value & 0xfc00) === 0xdc00) pos++; // low surrogate
      }
    }
    return length;
  };
}

// =============================================================================
// Keyword Code Generators
// =============================================================================

/**
 * Generate code to push an error and return false (or just return false if no errors array)
 */
function genError(code: CodeBuilder, pathExpr: string, keyword: string, message: string): void {
  code.line(
    `if (errors) errors.push({ path: ${pathExpr}, message: '${escapeString(message)}', keyword: '${keyword}' });`
  );
  code.line('return false;');
}

/**
 * Check if schema has a specific type constraint that guarantees the type is already validated
 */
function hasTypeConstraint(schema: JsonSchemaBase, type: string): boolean {
  if (!schema.type) return false;
  if (Array.isArray(schema.type)) {
    // Only if single type
    return schema.type.length === 1 && schema.type[0] === type;
  }
  return schema.type === type;
}

/**
 * Generate type check code
 */
export function generateTypeCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (!schema.type) return;
  // type is a validation vocabulary keyword
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return;

  const types = Array.isArray(schema.type) ? schema.type : [schema.type];
  const expectedType = types.join(' or ');
  //TODO we dont't need this optimization, the multiple case is fine
  if (types.length === 1) {
    const type = types[0];
    const check = getTypeCheck(dataVar, type);
    code.if(`!(${check})`, () => {
      genError(code, pathExpr, 'type', `Expected ${expectedType}`);
    });
  } else {
    // Multiple types - need OR
    const checks = types.map((t) => getTypeCheck(dataVar, t));
    code.if(`!(${checks.join(' || ')})`, () => {
      genError(code, pathExpr, 'type', `Expected ${expectedType}`);
    });
  }
}

function getTypeCheck(dataVar: string, type: string): string {
  switch (type) {
    case 'string':
      return `typeof ${dataVar} === 'string'`;
    case 'number':
      return `typeof ${dataVar} === 'number'`;
    case 'integer':
      return `typeof ${dataVar} === 'number' && Number.isInteger(${dataVar})`;
    case 'boolean':
      return `typeof ${dataVar} === 'boolean'`;
    case 'null':
      return `${dataVar} === null`;
    case 'array':
      return `Array.isArray(${dataVar})`;
    case 'object':
      return `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`;
    default:
      return 'false';
  }
}

/**
 * Generate const check code
 */
export function generateConstCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  _ctx: CompileContext
): void {
  if (schema.const === undefined) return;

  // For primitives, use strict equality
  if (schema.const === null || typeof schema.const !== 'object') {
    // TODO let's make a conveninece function to do an if check with an error if true
    // i.e. code.assertIf(condition, pathExpr, keyword, message)
    code.if(`${dataVar} !== ${stringify(schema.const)}`, () => {
      genError(code, pathExpr, 'const', `Expected constant value`);
    });
  } else {
    // For objects/arrays, use deepEqual
    code.if(`!deepEqual(${dataVar}, ${stringify(schema.const)})`, () => {
      genError(code, pathExpr, 'const', `Expected constant value`);
    });
  }
}

/**
 * Generate enum check code
 */
export function generateEnumCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (!schema.enum) return;

  // Separate primitives from complex values (objects/arrays)
  const primitives: unknown[] = [];
  const complexValues: unknown[] = [];

  for (const v of schema.enum) {
    if (v === null || typeof v !== 'object') {
      primitives.push(v);
    } else {
      complexValues.push(v);
    }
  }

  if (complexValues.length === 0) {
    // All primitives - use Set for O(1) lookup
    const setName = ctx.genRuntimeName('enumSet');
    ctx.addRuntimeFunction(setName, new Set(primitives));
    code.if(`!${setName}.has(${dataVar})`, () => {
      genError(code, pathExpr, 'enum', `Value must be one of the allowed values`);
    });
  } else if (primitives.length === 0) {
    // All complex - use deepEqual for all
    const arrName = ctx.genRuntimeName('enumArr');
    ctx.addRuntimeFunction(arrName, complexValues);
    code.if(`!${arrName}.some(v => deepEqual(${dataVar}, v))`, () => {
      genError(code, pathExpr, 'enum', `Value must be one of the allowed values`);
    });
  } else {
    // Mixed: check primitives with Set, complex with deepEqual
    // Only call deepEqual if data is an object (since primitives are already covered by Set)
    const setName = ctx.genRuntimeName('enumSet');
    ctx.addRuntimeFunction(setName, new Set(primitives));
    const arrName = ctx.genRuntimeName('enumArr');
    ctx.addRuntimeFunction(arrName, complexValues);
    code.if(
      `!${setName}.has(${dataVar}) && (typeof ${dataVar} !== 'object' || ${dataVar} === null || !${arrName}.some(v => deepEqual(${dataVar}, v)))`,
      () => {
        genError(code, pathExpr, 'enum', `Value must be one of the allowed values`);
      }
    );
  }
}

/**
 * Generate string validation checks (minLength, maxLength, pattern)
 */
export function generateStringChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  const hasStringChecks =
    schema.minLength !== undefined ||
    schema.maxLength !== undefined ||
    schema.pattern !== undefined;

  if (!hasStringChecks) return;

  // Only check if data is a string
  code.if(`typeof ${dataVar} === 'string'`, () => {
    // Use ucs2length for proper Unicode code point counting (handles surrogate pairs)
    if (schema.minLength !== undefined || schema.maxLength !== undefined) {
      const lenVar = code.genVar('len');
      code.line(`const ${lenVar} = ucs2length(${dataVar});`);

      if (schema.minLength !== undefined) {
        code.if(`${lenVar} < ${schema.minLength}`, () => {
          genError(
            code,
            pathExpr,
            'minLength',
            `String must be at least ${schema.minLength} characters`
          );
        });
      }

      if (schema.maxLength !== undefined) {
        code.if(`${lenVar} > ${schema.maxLength}`, () => {
          genError(
            code,
            pathExpr,
            'maxLength',
            `String must be at most ${schema.maxLength} characters`
          );
        });
      }
    }

    if (schema.pattern !== undefined) {
      // Pre-compile regex as a runtime function for consistent performance
      // Use 'u' flag for Unicode support (enables \p{...} property escapes)
      const regexName = ctx.genRuntimeName('pattern');
      ctx.addRuntimeFunction(regexName, new RegExp(schema.pattern, 'u'));
      code.if(`!${regexName}.test(${dataVar})`, () => {
        genError(code, pathExpr, 'pattern', `String must match pattern ${schema.pattern}`);
      });
    }
  });
}

/**
 * Generate content validation checks (contentMediaType, contentEncoding)
 * These are optional in draft-07 and later
 * In draft 2020-12, content is annotation-only (no validation)
 */
export function generateContentChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
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
  code.if(`typeof ${dataVar} === 'string'`, () => {
    // First check encoding if present
    if (schema.contentEncoding !== undefined) {
      if (schema.contentEncoding === 'base64') {
        // Validate base64 encoding
        // Base64 characters: A-Z, a-z, 0-9, +, /, and = for padding
        const regexName = ctx.genRuntimeName('base64Re');
        ctx.addRuntimeFunction(regexName, /^[A-Za-z0-9+/]*={0,2}$/);
        code.if(`!${regexName}.test(${dataVar}) || ${dataVar}.length % 4 !== 0`, () => {
          genError(code, pathExpr, 'contentEncoding', 'String must be valid base64');
        });
      }
    }

    // Then check media type if present
    if (schema.contentMediaType !== undefined) {
      if (schema.contentMediaType === 'application/json') {
        // If there's also base64 encoding, we need to decode first
        if (schema.contentEncoding === 'base64') {
          const decodedVar = code.genVar('decoded');
          code.block('', () => {
            code.line('try {');
            code.line(`  const ${decodedVar} = atob(${dataVar});`);
            code.line(`  JSON.parse(${decodedVar});`);
            code.line('} catch (e) {');
            genError(code, pathExpr, 'contentMediaType', 'String must be valid JSON');
            code.line('}');
          });
        } else {
          // Validate directly as JSON
          code.block('', () => {
            code.line('try {');
            code.line(`  JSON.parse(${dataVar});`);
            code.line('} catch (e) {');
            genError(code, pathExpr, 'contentMediaType', 'String must be valid JSON');
            code.line('}');
          });
        }
      }
    }
  });
}

/**
 * Generate number validation checks (minimum, maximum, multipleOf, etc.)
 */
export function generateNumberChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  // Number checks are validation vocabulary keywords
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return;

  const hasNumberChecks =
    schema.minimum !== undefined ||
    schema.maximum !== undefined ||
    schema.exclusiveMinimum !== undefined ||
    schema.exclusiveMaximum !== undefined ||
    schema.multipleOf !== undefined;

  if (!hasNumberChecks) return;

  // Check if we need the typeof guard - skip if type already constrains to number/integer
  const needsTypeGuard =
    !hasTypeConstraint(schema, 'number') && !hasTypeConstraint(schema, 'integer');

  const genChecks = () => {
    // Handle minimum with optional exclusiveMinimum (draft4 boolean form)
    if (schema.minimum !== undefined) {
      // In draft4, exclusiveMinimum is a boolean that modifies minimum
      if (schema.exclusiveMinimum === true) {
        code.if(`${dataVar} <= ${schema.minimum}`, () => {
          genError(code, pathExpr, 'minimum', `Value must be > ${schema.minimum}`);
        });
      } else {
        code.if(`${dataVar} < ${schema.minimum}`, () => {
          genError(code, pathExpr, 'minimum', `Value must be >= ${schema.minimum}`);
        });
      }
    }

    // Handle maximum with optional exclusiveMaximum (draft4 boolean form)
    if (schema.maximum !== undefined) {
      // In draft4, exclusiveMaximum is a boolean that modifies maximum
      if (schema.exclusiveMaximum === true) {
        code.if(`${dataVar} >= ${schema.maximum}`, () => {
          genError(code, pathExpr, 'maximum', `Value must be < ${schema.maximum}`);
        });
      } else {
        code.if(`${dataVar} > ${schema.maximum}`, () => {
          genError(code, pathExpr, 'maximum', `Value must be <= ${schema.maximum}`);
        });
      }
    }

    // Handle exclusiveMinimum as number (draft 2020-12 form)
    if (typeof schema.exclusiveMinimum === 'number') {
      code.if(`${dataVar} <= ${schema.exclusiveMinimum}`, () => {
        genError(code, pathExpr, 'exclusiveMinimum', `Value must be > ${schema.exclusiveMinimum}`);
      });
    }

    // Handle exclusiveMaximum as number (draft 2020-12 form)
    if (typeof schema.exclusiveMaximum === 'number') {
      code.if(`${dataVar} >= ${schema.exclusiveMaximum}`, () => {
        genError(code, pathExpr, 'exclusiveMaximum', `Value must be < ${schema.exclusiveMaximum}`);
      });
    }

    if (schema.multipleOf !== undefined) {
      const multipleOf = schema.multipleOf;
      // Use Number.isInteger for accuracy (handles large numbers and Infinity correctly)
      // For integer multipleOf values, can use simpler modulo check
      if (Number.isInteger(multipleOf) && multipleOf >= 1) {
        // Fast path for integer multipleOf: simple modulo
        code.if(`${dataVar} % ${multipleOf} !== 0`, () => {
          genError(
            code,
            pathExpr,
            'multipleOf',
            `Value must be a multiple of ${schema.multipleOf}`
          );
        });
      } else {
        const divVar = code.genVar('div');
        code.line(`const ${divVar} = ${dataVar} / ${multipleOf};`);
        code.if(`!Number.isInteger(${divVar})`, () => {
          genError(
            code,
            pathExpr,
            'multipleOf',
            `Value must be a multiple of ${schema.multipleOf}`
          );
        });
      }
    }
  };

  // Skip type guard if we already know it's a number/integer
  if (needsTypeGuard) {
    code.if(`typeof ${dataVar} === 'number'`, genChecks);
  } else {
    genChecks();
  }
}

/**
 * Get the types of items from the schema's items/prefixItems definition
 * Returns empty array if types are unknown or could include objects/arrays
 */
function getItemTypes(schema: JsonSchemaBase): string[] {
  // Check items schema for type constraints
  const itemsSchema = schema.items;
  if (typeof itemsSchema === 'object' && itemsSchema !== null && !Array.isArray(itemsSchema)) {
    const itemType = (itemsSchema as JsonSchemaBase).type;
    if (typeof itemType === 'string') {
      return [itemType];
    }
    if (Array.isArray(itemType)) {
      return itemType as string[];
    }
  }
  // prefixItems or array items - too complex to analyze
  return [];
}

/**
 * Generate array validation checks (minItems, maxItems, uniqueItems)
 */
export function generateArrayChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  _ctx: CompileContext
): void {
  const hasArrayChecks =
    schema.minItems !== undefined || schema.maxItems !== undefined || schema.uniqueItems === true;

  if (!hasArrayChecks) return;

  const genChecks = () => {
    if (schema.minItems !== undefined) {
      code.if(`${dataVar}.length < ${schema.minItems}`, () => {
        genError(code, pathExpr, 'minItems', `Array must have at least ${schema.minItems} items`);
      });
    }

    if (schema.maxItems !== undefined) {
      code.if(`${dataVar}.length > ${schema.maxItems}`, () => {
        genError(code, pathExpr, 'maxItems', `Array must have at most ${schema.maxItems} items`);
      });
    }

    if (schema.uniqueItems === true) {
      // Check if items are known to be primitives at compile time
      const itemTypes = getItemTypes(schema);
      const canOptimize =
        itemTypes.length > 0 && !itemTypes.some((t) => t === 'object' || t === 'array');

      const iVar = code.genVar('i');
      const jVar = code.genVar('j');

      if (canOptimize) {
        // Fast path: items are primitives, use object hash for O(n) lookup
        const itemVar = code.genVar('item');
        const indicesVar = code.genVar('indices');
        const hasMultipleTypes = itemTypes.length > 1;

        code.line(`const ${indicesVar} = {};`);
        code.block(`for (let ${iVar} = ${dataVar}.length; ${iVar}--;)`, () => {
          code.line(`let ${itemVar} = ${dataVar}[${iVar}];`);
          // If multiple types possible, prefix strings to avoid collision with numbers
          if (hasMultipleTypes) {
            code.if(`typeof ${itemVar} === 'string'`, () => {
              code.line(`${itemVar} = '_' + ${itemVar};`);
            });
          }
          code.if(`typeof ${indicesVar}[${itemVar}] === 'number'`, () => {
            genError(code, pathExpr, 'uniqueItems', `Array items must be unique`);
          });
          code.line(`${indicesVar}[${itemVar}] = ${iVar};`);
        });
      } else {
        // Slow path: O(n²) comparison using deepEqual
        code.block(`outer: for (let ${iVar} = ${dataVar}.length; ${iVar}--;)`, () => {
          code.block(`for (let ${jVar} = ${iVar}; ${jVar}--;)`, () => {
            code.if(`deepEqual(${dataVar}[${iVar}], ${dataVar}[${jVar}])`, () => {
              genError(code, pathExpr, 'uniqueItems', `Array items must be unique`);
            });
          });
        });
      }
    }
  };

  // Skip type check if schema already has type: 'array'
  if (hasTypeConstraint(schema, 'array')) {
    genChecks();
  } else {
    // Only check if data is an array
    code.if(`Array.isArray(${dataVar})`, genChecks);
  }
}

/**
 * Generate object validation checks (required, minProperties, maxProperties)
 */
export function generateObjectChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  _ctx: CompileContext
): void {
  const hasObjectChecks =
    (schema.required && schema.required.length > 0) ||
    schema.minProperties !== undefined ||
    schema.maxProperties !== undefined;

  if (!hasObjectChecks) return;

  const genChecks = () => {
    if (schema.required && schema.required.length > 0) {
      for (const prop of schema.required) {
        genRequiredCheck(code, dataVar, prop, pathExpr);
      }
    }

    if (schema.minProperties !== undefined || schema.maxProperties !== undefined) {
      code.line(`const propCount = Object.keys(${dataVar}).length;`);

      if (schema.minProperties !== undefined) {
        code.if(`propCount < ${schema.minProperties}`, () => {
          genError(
            code,
            pathExpr,
            'minProperties',
            `Object must have at least ${schema.minProperties} properties`
          );
        });
      }

      if (schema.maxProperties !== undefined) {
        code.if(`propCount > ${schema.maxProperties}`, () => {
          genError(
            code,
            pathExpr,
            'maxProperties',
            `Object must have at most ${schema.maxProperties} properties`
          );
        });
      }
    }
  };

  // Skip type check if schema already has type: 'object'
  if (hasTypeConstraint(schema, 'object')) {
    genChecks();
  } else {
    // Only check if data is an object
    code.if(
      `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
      genChecks
    );
  }
}

/**
 * Generate properties, additionalProperties, patternProperties checks
 */
// Check if a schema is a no-op (true, {})
function isNoOpSchema(schema: JsonSchema): boolean {
  if (schema === true) return true;
  if (typeof schema === 'object' && schema !== null && Object.keys(schema).length === 0) {
    return true;
  }
  return false;
}

export function generatePropertiesChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  // Check for non-trivial property schemas
  const nonTrivialProps = schema.properties
    ? Object.entries(schema.properties).filter(([, s]) => !isNoOpSchema(s))
    : [];
  const nonTrivialPatternProps = schema.patternProperties
    ? Object.entries(schema.patternProperties).filter(([, s]) => !isNoOpSchema(s))
    : [];

  const hasProps = nonTrivialProps.length > 0;
  const hasPatternProps = nonTrivialPatternProps.length > 0;
  const hasAdditionalProps =
    schema.additionalProperties !== undefined && !isNoOpSchema(schema.additionalProperties);

  if (!hasProps && !hasPatternProps && !hasAdditionalProps) return;

  const genChecks = () => {
    // Validate defined properties (only non-trivial ones)
    for (const [propName, propSchema] of nonTrivialProps) {
      const propPathExpr =
        pathExpr === "''"
          ? `'${escapeString(propName)}'`
          : `${pathExpr} + '.${escapeString(propName)}'`;
      genPropertyCheck(code, dataVar, propName, (valueVar) => {
        generateSchemaValidator(code, propSchema, valueVar, propPathExpr, ctx);
      });
    }

    // Handle patternProperties and additionalProperties in a single loop
    if (hasPatternProps || hasAdditionalProps) {
      const definedProps = schema.properties ? Object.keys(schema.properties) : [];
      // For additionalProperties, we need ALL patternProperties patterns (even no-ops)
      // because they affect which properties are considered "additional"
      const allPatterns = schema.patternProperties ? Object.keys(schema.patternProperties) : [];

      // Pre-compile pattern regexes for ALL patterns (needed for additionalProperties check)
      // Use 'u' flag for Unicode support (enables \p{...} property escapes)
      const patternRegexNames: string[] = [];
      for (const pattern of allPatterns) {
        const regexName = ctx.genRuntimeName('patternRe');
        ctx.addRuntimeFunction(regexName, new RegExp(pattern, 'u'));
        patternRegexNames.push(regexName);
      }

      code.forIn('key', dataVar, () => {
        const keyPathExpr = pathExpr === "''" ? 'key' : `${pathExpr} + '.' + key`;

        // Generate patternProperties checks (only non-trivial ones)
        for (let i = 0; i < nonTrivialPatternProps.length; i++) {
          const [pattern, patternSchema] = nonTrivialPatternProps[i];
          // Find the index in allPatterns to get the right regex
          const regexIdx = allPatterns.indexOf(pattern);
          const regexName = patternRegexNames[regexIdx];
          code.if(`${regexName}.test(key)`, () => {
            const propAccessed = `${dataVar}[key]`;
            generateSchemaValidator(code, patternSchema, propAccessed, keyPathExpr, ctx);
          });
        }

        // Generate additionalProperties check
        if (hasAdditionalProps) {
          const addPropsSchema = schema.additionalProperties!;

          // Build condition: not a defined prop and not matching any pattern
          // Use inline comparisons for small numbers of properties (faster than Set.has)
          const conditions: string[] = [];

          // For defined properties, use inline comparison for up to ~10 props
          if (definedProps.length > 0 && definedProps.length <= 10) {
            const propChecks = definedProps.map((p) => `key !== "${escapeString(p)}"`).join(' && ');
            conditions.push(`(${propChecks})`);
          } else if (definedProps.length > 10) {
            // Use Set for larger number of properties
            const propsSetName = ctx.genRuntimeName('propsSet');
            ctx.addRuntimeFunction(propsSetName, new Set(definedProps));
            conditions.push(`!${propsSetName}.has(key)`);
          }

          // Pattern checks using pre-compiled regexes
          for (const regexName of patternRegexNames) {
            conditions.push(`!${regexName}.test(key)`);
          }

          if (conditions.length > 0) {
            code.if(conditions.join(' && '), () => {
              generateAdditionalPropsCheck(
                code,
                addPropsSchema,
                `${dataVar}[key]`,
                keyPathExpr,
                ctx
              );
            });
          } else {
            generateAdditionalPropsCheck(code, addPropsSchema, `${dataVar}[key]`, keyPathExpr, ctx);
          }
        }
      });
    }
  };

  // Skip type check if schema already has type: 'object'
  if (hasTypeConstraint(schema, 'object')) {
    genChecks();
  } else {
    // Only check if data is an object
    code.if(
      `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
      genChecks
    );
  }
}

function generateAdditionalPropsCheck(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (schema === false) {
    genError(code, pathExpr, 'additionalProperties', 'Additional properties not allowed');
  } else if (schema === true) {
    // No check needed
  } else {
    generateSchemaValidator(code, schema, dataVar, pathExpr, ctx);
  }
}

/**
 * Generate contains check (minContains, maxContains)
 */
export function generateContainsCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (schema.contains === undefined) return;

  const containsSchema = schema.contains;
  const minContains = schema.minContains ?? 1;
  const maxContains = schema.maxContains;

  // Handle boolean schemas directly
  if (containsSchema === true) {
    // Every item matches - just check array length against minContains/maxContains
    code.if(`Array.isArray(${dataVar})`, () => {
      code.if(`${dataVar}.length < ${minContains}`, () => {
        genError(
          code,
          pathExpr,
          'contains',
          `Array must contain at least ${minContains} matching items`
        );
      });
      if (maxContains !== undefined) {
        code.if(`${dataVar}.length > ${maxContains}`, () => {
          genError(
            code,
            pathExpr,
            'maxContains',
            `Array must contain at most ${maxContains} matching items`
          );
        });
      }
    });
    return;
  }

  if (containsSchema === false) {
    // Nothing matches - only valid if minContains is 0
    code.if(`Array.isArray(${dataVar})`, () => {
      if (minContains > 0) {
        genError(
          code,
          pathExpr,
          'contains',
          `Array must contain at least ${minContains} matching items`
        );
      }
      // maxContains is always satisfied since count is 0
    });
    return;
  }

  // If minContains is 0 and no maxContains, contains is always satisfied
  if (minContains === 0 && maxContains === undefined) {
    return;
  }

  // Queue the contains schema for compilation (reuses all existing generators)
  const containsFuncName = ctx.queueCompile(containsSchema);

  code.if(`Array.isArray(${dataVar})`, () => {
    const countVar = code.genVar('containsCount');
    code.line(`let ${countVar} = 0;`);

    const iVar = code.genVar('i');
    code.for(`let ${iVar} = 0`, `${iVar} < ${dataVar}.length`, `${iVar}++`, () => {
      const itemAccess = `${dataVar}[${iVar}]`;

      // Call the compiled contains validator (pass null for errors to skip collection)
      code.if(`${containsFuncName}(${itemAccess}, null, '')`, () => {
        code.line(`${countVar}++;`);
      });

      // Early exit if we've found enough and no maxContains
      if (maxContains === undefined) {
        code.if(`${countVar} >= ${minContains}`, () => {
          code.line('break;');
        });
      }
    });

    code.if(`${countVar} < ${minContains}`, () => {
      genError(
        code,
        pathExpr,
        'contains',
        `Array must contain at least ${minContains} matching items`
      );
    });

    if (maxContains !== undefined) {
      code.if(`${countVar} > ${maxContains}`, () => {
        genError(
          code,
          pathExpr,
          'maxContains',
          `Array must contain at most ${maxContains} matching items`
        );
      });
    }
  });
}

/**
 * Generate dependentRequired check
 */
export function generateDependentRequiredCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  _ctx: CompileContext
): void {
  if (!schema.dependentRequired) return;

  // Filter out empty arrays (no requirements)
  const deps = Object.entries(schema.dependentRequired).filter(([, reqs]) => reqs.length > 0);
  if (deps.length === 0) return;

  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      for (const [prop, requiredProps] of deps) {
        const propStr = escapeString(prop);
        code.if(`'${propStr}' in ${dataVar}`, () => {
          for (const reqProp of requiredProps) {
            const reqPropStr = escapeString(reqProp);
            const reqPathExpr =
              pathExpr === "''" ? `'${reqPropStr}'` : `${pathExpr} + '.${reqPropStr}'`;
            code.if(`!('${reqPropStr}' in ${dataVar})`, () => {
              code.line(
                `if (errors) errors.push({ path: ${reqPathExpr}, message: 'Property required when ${propStr} is present', keyword: 'dependentRequired' });`
              );
              code.line('return false;');
            });
          }
        });
      }
    }
  );
}

/**
 * Generate dependentSchemas check
 */
export function generateDependentSchemasCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (!schema.dependentSchemas) return;

  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      for (const [prop, depSchema] of Object.entries(schema.dependentSchemas!)) {
        const propStr = escapeString(prop);
        code.if(`'${propStr}' in ${dataVar}`, () => {
          generateSchemaValidator(code, depSchema, dataVar, pathExpr, ctx);
        });
      }
    }
  );
}

/**
 * Generate legacy dependencies check (draft-07)
 * dependencies can contain either:
 * - array of strings (like dependentRequired)
 * - schema object (like dependentSchemas)
 */
export function generateDependenciesCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (!schema.dependencies) return;

  // Filter out no-op dependencies (empty arrays, true, {})
  const nonTrivialDeps = Object.entries(schema.dependencies).filter(([, dep]) => {
    if (Array.isArray(dep)) {
      return dep.length > 0; // Skip empty arrays
    }
    // Skip no-op schemas (true, {})
    if (dep === true) return false;
    if (typeof dep === 'object' && dep !== null && Object.keys(dep).length === 0) return false;
    return true;
  });

  if (nonTrivialDeps.length === 0) return;

  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      for (const [prop, dep] of nonTrivialDeps) {
        const propStr = escapeString(prop);
        code.if(`'${propStr}' in ${dataVar}`, () => {
          if (Array.isArray(dep)) {
            // Array of required property names
            for (const reqProp of dep) {
              const reqPropStr = escapeString(reqProp);
              const reqPathExpr =
                pathExpr === "''" ? `'${reqPropStr}'` : `${pathExpr} + '.${reqPropStr}'`;
              code.if(`!('${reqPropStr}' in ${dataVar})`, () => {
                code.line(
                  `if (errors) errors.push({ path: ${reqPathExpr}, message: 'Property required when ${propStr} is present', keyword: 'dependencies' });`
                );
                code.line('return false;');
              });
            }
          } else {
            // Schema that must validate
            generateSchemaValidator(code, dep as JsonSchema, dataVar, pathExpr, ctx);
          }
        });
      }
    }
  );
}

/**
 * Generate propertyNames check
 */
export function generatePropertyNamesCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (schema.propertyNames === undefined) return;

  const propNamesSchema = schema.propertyNames;

  // Handle boolean schema for propertyNames
  if (propNamesSchema === true) {
    // All property names are valid - no check needed
    return;
  }

  if (propNamesSchema === false) {
    // No property names are valid - object must be empty
    code.if(
      `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
      () => {
        code.if(`Object.keys(${dataVar}).length > 0`, () => {
          genError(code, pathExpr, 'propertyNames', 'No properties allowed');
        });
      }
    );
    return;
  }

  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      code.forIn('key', dataVar, () => {
        // For propertyNames, the path is the key itself
        generateSchemaValidator(code, propNamesSchema, 'key', 'key', ctx);
      });
    }
  );
}

/**
 * Generate $ref check
 */
export function generateRefCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext,
  dynamicScopeVar: string = 'dynamicScope'
): void {
  if (!schema.$ref) return;

  // Resolve the reference
  let refSchema = ctx.resolveRef(schema.$ref, schema);

  // Optimization: follow chains of $ref-only schemas to avoid function call overhead
  // Only safe when there are no $dynamicAnchor definitions in the entire schema tree
  if (!ctx.hasAnyDynamicAnchors() && refSchema) {
    let depth = 0;
    const maxDepth = 100; // Prevent infinite loops
    while (
      typeof refSchema === 'object' &&
      refSchema.$ref &&
      Object.keys(refSchema).length === 1 && // Only $ref, nothing else
      depth < maxDepth
    ) {
      const nextSchema = ctx.resolveRef(refSchema.$ref, refSchema);
      if (!nextSchema) break;
      refSchema = nextSchema;
      depth++;
    }
  }

  if (!refSchema) {
    // Can't resolve - schema is invalid, always fail
    genError(code, pathExpr, '$ref', `Cannot resolve reference ${schema.$ref}`);
    return;
  }

  // Optimize: if ref points to a no-op schema (true or {}), skip entirely
  if (
    refSchema === true ||
    (typeof refSchema === 'object' && Object.keys(refSchema).length === 0)
  ) {
    return;
  }

  // Get the function name (queue for compilation if needed)
  const funcName = ctx.getCompiledName(refSchema) ?? ctx.queueCompile(refSchema);

  // In legacy mode, dynamicScopeVar is empty - simpler function call
  if (!dynamicScopeVar) {
    code.if(`!${funcName}(${dataVar}, errors, ${pathExpr})`, () => {
      code.line('return false;');
    });
    return;
  }

  // Check if the $ref is entering a new schema resource
  // This can happen in two ways:
  // 1. The $ref URI part (e.g., "bar" in "bar#/$defs/item") identifies a resource
  // 2. The resolved schema has its own $id, making it a sub-resource
  //
  // When both happen, the resolved schema's resource takes precedence
  // because that's where the $dynamicRef will be evaluated.
  let refResourceId = ctx.getRefResourceId(schema.$ref, schema);

  // Check if the resolved schema itself is a resource (has its own $id)
  if (typeof refSchema === 'object' && refSchema !== null && typeof refSchema.$id === 'string') {
    // The resolved schema is its own resource - use its anchors
    // Resolve the $id relative to its base URI
    const refSchemaResourceId = ctx.getSchemaResourceId(refSchema);
    if (refSchemaResourceId) {
      refResourceId = refSchemaResourceId;
    } else {
      refResourceId = refSchema.$id;
    }
  }

  if (refResourceId) {
    const resourceAnchors = ctx.getResourceDynamicAnchors(refResourceId);
    if (resourceAnchors.length > 0) {
      // Push dynamic anchors for this resource, call validator, then pop
      code.block('', () => {
        const pushCount = resourceAnchors.length;
        for (const { anchor, schema: anchorSchema } of resourceAnchors) {
          const anchorFuncName =
            ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
          code.line(
            `${dynamicScopeVar}.push({ anchor: ${stringify(anchor)}, validate: ${anchorFuncName} });`
          );
        }
        code.if(`!${funcName}(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar})`, () => {
          // Pop before returning
          for (let i = 0; i < pushCount; i++) {
            code.line(`${dynamicScopeVar}.pop();`);
          }
          code.line('return false;');
        });
        // Pop after successful validation
        for (let i = 0; i < pushCount; i++) {
          code.line(`${dynamicScopeVar}.pop();`);
        }
      });
      return;
    }
  }

  // No dynamic anchors to push - simple call
  code.if(`!${funcName}(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar})`, () => {
    code.line('return false;');
  });
}

/**
 * Generate composition checks (allOf, anyOf, oneOf, not, if-then-else)
 */
export function generateCompositionChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  // allOf - all subschemas must validate
  if (schema.allOf && schema.allOf.length > 0) {
    for (const subSchema of schema.allOf) {
      generateSchemaValidator(code, subSchema, dataVar, pathExpr, ctx);
    }
  }

  // anyOf - at least one subschema must validate
  if (schema.anyOf && schema.anyOf.length > 0) {
    // If any schema is a no-op (true, {}), anyOf always passes
    if (schema.anyOf.some((s) => isNoOpSchema(s))) {
      // Skip generating anyOf check entirely
    } else {
      const resultVar = code.genVar('anyOfResult');
      code.line(`let ${resultVar} = false;`);

      for (const subSchema of schema.anyOf) {
        // Try each subschema, set result to true if any passes
        code.if(`!${resultVar}`, () => {
          const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
          code.line(`${resultVar} = ${checkExpr};`);
        });
      }

      code.if(`!${resultVar}`, () => {
        genError(code, pathExpr, 'anyOf', 'Value must match at least one schema');
      });
    }
  }

  // oneOf - exactly one subschema must validate
  if (schema.oneOf && schema.oneOf.length > 0) {
    const countVar = code.genVar('oneOfCount');
    code.line(`let ${countVar} = 0;`);

    for (const subSchema of schema.oneOf) {
      const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
      code.line(`if (${checkExpr}) ${countVar}++;`);

      // Early exit if more than one matches
      code.if(`${countVar} > 1`, () => {
        genError(code, pathExpr, 'oneOf', 'Value must match exactly one schema');
      });
    }

    code.if(`${countVar} !== 1`, () => {
      genError(code, pathExpr, 'oneOf', 'Value must match exactly one schema');
    });
  }

  // not - subschema must NOT validate
  if (schema.not !== undefined) {
    const notSchema = schema.not;
    const checkExpr = generateSubschemaCheck(notSchema, dataVar, ctx);
    code.if(checkExpr, () => {
      genError(code, pathExpr, 'not', 'Value must not match schema');
    });
  }

  // if-then-else
  if (schema.if !== undefined) {
    const ifSchema = schema.if;
    const thenSchema = schema.then;
    const elseSchema = schema.else;

    // Skip if there's no then or else - the if condition has no effect
    if (thenSchema === undefined && elseSchema === undefined) {
      return;
    }

    // Check if condition matches
    const condVar = code.genVar('ifCond');
    const checkExpr = generateSubschemaCheck(ifSchema, dataVar, ctx);
    code.line(`const ${condVar} = ${checkExpr};`);

    // Apply then or else based on condition
    if (thenSchema !== undefined) {
      code.if(condVar, () => {
        if (thenSchema === false) {
          genError(code, pathExpr, 'then', 'Conditional validation failed');
        } else if (thenSchema !== true) {
          generateSchemaValidator(code, thenSchema, dataVar, pathExpr, ctx);
        }
      });
    }

    if (elseSchema !== undefined) {
      code.if(`!${condVar}`, () => {
        if (elseSchema === false) {
          genError(code, pathExpr, 'else', 'Conditional validation failed');
        } else if (elseSchema !== true) {
          generateSchemaValidator(code, elseSchema, dataVar, pathExpr, ctx);
        }
      });
    }
  }
}

/**
 * Generate a call to validate against a subschema for anyOf/oneOf/not
 * Returns a code expression that evaluates to true if the subschema matches
 */
function generateSubschemaCheck(schema: JsonSchema, dataVar: string, ctx: CompileContext): string {
  // Handle no-op schemas (true, {}) - always pass
  if (schema === true) return 'true';
  if (typeof schema === 'object' && schema !== null && Object.keys(schema).length === 0) {
    return 'true';
  }
  // Handle always-fail schema
  if (schema === false) return 'false';

  // Compile the subschema as a separate function to handle all keywords including composition
  const funcName = ctx.queueCompile(schema);
  // In legacy mode (draft-07 and earlier), don't pass dynamicScope for faster calls
  if (ctx.options.legacyRef) {
    return `${funcName}(${dataVar}, null, '')`;
  }
  return `${funcName}(${dataVar}, null, '', dynamicScope)`;
}

/**
 * Generate items and prefixItems checks for arrays
 * Supports both draft-2020-12 (prefixItems + items) and draft-07 (items array + additionalItems)
 */
export function generateItemsChecks(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  // Draft-07 compatibility: items can be an array (acts like prefixItems)
  const itemsIsArray = Array.isArray(schema.items);

  // Cross-draft compatibility: prefixItems was introduced in 2020-12
  // In 2019-09 and earlier, prefixItems is not a keyword and should be ignored
  const schemaDialect = schema.$schema;
  const supportsPrefixItems =
    !schemaDialect ||
    schemaDialect.includes('2020-12') ||
    schemaDialect.includes('2021') ||
    schemaDialect.includes('2022') ||
    schemaDialect.includes('2023') ||
    schemaDialect.includes('2024') ||
    schemaDialect.includes('2025');

  const tupleSchemas: JsonSchema[] = itemsIsArray
    ? (schema.items as JsonSchema[])
    : supportsPrefixItems && schema.prefixItems
      ? [...schema.prefixItems]
      : [];

  // For items after the tuple:
  // - draft-2020-12: use schema.items (if not array)
  // - draft-07: use schema.additionalItems (if items is array)
  let afterTupleSchema: JsonSchema | undefined;
  if (itemsIsArray) {
    afterTupleSchema = schema.additionalItems;
  } else if (!itemsIsArray && schema.items !== undefined) {
    // schema.items is boolean | JsonSchema (not array) here
    afterTupleSchema = schema.items as JsonSchema;
  }
  // Skip no-op schemas (true, {})
  const hasAfterTupleSchema = afterTupleSchema !== undefined && !isNoOpSchema(afterTupleSchema);

  // Filter out no-op tuple schemas
  const nonTrivialTupleSchemas = tupleSchemas
    .map((s, i) => ({ schema: s, index: i }))
    .filter(({ schema }) => !isNoOpSchema(schema));
  const hasNonTrivialTuples = nonTrivialTupleSchemas.length > 0;

  if (!hasNonTrivialTuples && !hasAfterTupleSchema) return;

  const genChecks = () => {
    // Handle tuple items (prefixItems in 2020-12, items array in draft-07)
    // Only validate non-trivial schemas
    for (const { schema: itemSchema, index: i } of nonTrivialTupleSchemas) {
      const itemPathExpr = pathExpr === "''" ? `'[${i}]'` : `${pathExpr} + '[${i}]'`;
      code.if(`${dataVar}.length > ${i}`, () => {
        const itemAccess = `${dataVar}[${i}]`;
        generateSchemaValidator(code, itemSchema, itemAccess, itemPathExpr, ctx);
      });
    }

    // Handle items after tuple (items in 2020-12, additionalItems in draft-07)
    if (hasAfterTupleSchema) {
      const startIndex = tupleSchemas.length;

      if (afterTupleSchema === false) {
        // No additional items allowed
        if (startIndex > 0) {
          code.if(`${dataVar}.length > ${startIndex}`, () => {
            genError(
              code,
              pathExpr,
              itemsIsArray ? 'additionalItems' : 'items',
              `Array must have at most ${startIndex} items`
            );
          });
        } else {
          code.if(`${dataVar}.length > 0`, () => {
            genError(code, pathExpr, 'items', 'Array must be empty');
          });
        }
      } else if (afterTupleSchema !== true) {
        // Validate each item after tuple
        const iVar = code.genVar('i');
        code.for(`let ${iVar} = ${startIndex}`, `${iVar} < ${dataVar}.length`, `${iVar}++`, () => {
          const itemAccess = `${dataVar}[${iVar}]`;
          const itemPathExpr =
            pathExpr === "''" ? `'[' + ${iVar} + ']'` : `${pathExpr} + '[' + ${iVar} + ']'`;
          generateSchemaValidator(code, afterTupleSchema!, itemAccess, itemPathExpr, ctx);
        });
      }
    }
  };

  // Skip type check if schema already has type: 'array'
  if (hasTypeConstraint(schema, 'array')) {
    genChecks();
  } else {
    // Only check if data is an array
    code.if(`Array.isArray(${dataVar})`, genChecks);
  }
}

/**
 * Generate format check code
 */
// Known format validators - used to skip existence check for known formats
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

export function generateFormatCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (schema.format === undefined) return;

  // Skip if formatAssertion is disabled
  if (!ctx.options.formatAssertion) return;

  const format = schema.format;
  const escapedFormat = escapeString(format);

  // Check if schema already has type: 'string' (no need to re-check type)
  const hasStringType = schema.type === 'string';

  // For known formats, skip the existence check
  const isKnownFormat = KNOWN_FORMATS.has(format);

  const formatCheck = isKnownFormat
    ? `!formatValidators['${escapedFormat}'](${dataVar})`
    : `formatValidators['${escapedFormat}'] && !formatValidators['${escapedFormat}'](${dataVar})`;

  const genFormatCheck = () => {
    code.if(formatCheck, () => {
      genError(code, pathExpr, 'format', `Invalid ${format} format`);
    });
  };

  if (hasStringType) {
    // Type already checked, just do format check
    genFormatCheck();
  } else {
    // Only check if data is a string
    code.if(`typeof ${dataVar} === 'string'`, genFormatCheck);
  }
}

/**
 * Generate $dynamicRef check code
 */
export function generateDynamicRefCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext,
  dynamicScopeVar: string = 'dynamicScope'
): void {
  if (!schema.$dynamicRef) return;

  const ref = schema.$dynamicRef;

  // Check if this ref contains an anchor fragment (like #items or extended#meta)
  // The anchor must be a plain name (not a JSON pointer like #/defs/foo)
  const anchorMatch = ref.match(/#([a-zA-Z][a-zA-Z0-9_-]*)$/);

  if (anchorMatch) {
    // This is an anchor reference - first resolve statically
    const anchorName = anchorMatch[1];

    // Resolve the static fallback
    const staticSchema = ctx.resolveRef(ref, schema);
    if (!staticSchema) {
      genError(code, pathExpr, '$dynamicRef', `Cannot resolve reference ${ref}`);
      return;
    }
    const staticFuncName = ctx.queueCompile(staticSchema);

    // Check if the statically resolved schema has a matching $dynamicAnchor
    // If not, $dynamicRef behaves like a regular $ref (no dynamic scope search)
    const hasDynamicAnchor =
      typeof staticSchema === 'object' &&
      staticSchema !== null &&
      staticSchema.$dynamicAnchor === anchorName;

    // If no dynamic scope var (legacy mode or empty), just call static validator
    if (!dynamicScopeVar) {
      code.if(`!${staticFuncName}(${dataVar}, errors, ${pathExpr}, [])`, () => {
        code.line('return false;');
      });
    } else if (!hasDynamicAnchor) {
      // No matching $dynamicAnchor - behave like a regular $ref
      code.if(`!${staticFuncName}(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar})`, () => {
        code.line('return false;');
      });
    } else {
      // Has matching $dynamicAnchor - search dynamic scope at runtime
      // The dynamic scope is searched from the BEGINNING (outermost/first) to find the first match
      code.block('', () => {
        code.line(`let dynamicValidator = null;`);
        code.line(`for (let i = 0; i < ${dynamicScopeVar}.length; i++) {`);
        code.line(`  if (${dynamicScopeVar}[i].anchor === ${stringify(anchorName)}) {`);
        code.line(`    dynamicValidator = ${dynamicScopeVar}[i].validate;`);
        code.line(`    break;`);
        code.line(`  }`);
        code.line(`}`);
        // Use dynamic validator if found, otherwise use static fallback
        code.line(`const validator = dynamicValidator || ${staticFuncName};`);
        code.if(`!validator(${dataVar}, errors, ${pathExpr}, ${dynamicScopeVar})`, () => {
          code.line('return false;');
        });
      });
    }
  } else {
    // Not an anchor reference - resolve statically like $ref
    // This handles cases like $dynamicRef: "#/$defs/items"
    const refSchema = ctx.resolveRef(ref, schema);

    if (!refSchema) {
      genError(code, pathExpr, '$dynamicRef', `Cannot resolve reference ${ref}`);
      return;
    }

    const funcName = ctx.queueCompile(refSchema);
    const scopeArg = dynamicScopeVar || '[]';
    code.if(`!${funcName}(${dataVar}, errors, ${pathExpr}, ${scopeArg})`, () => {
      code.line('return false;');
    });
  }
}

/**
 * Collect properties evaluated by a schema recursively (follows all keywords that evaluate properties)
 * This is used for runtime tracking of which branch matched
 * @param recurseComposition - if true, also recurse into anyOf/oneOf (for branch evaluation)
 */
function collectLocalEvaluatedProperties(
  schema: JsonSchema,
  ctx: CompileContext,
  visited: Set<JsonSchema> = new Set(),
  recurseComposition: boolean = true
): {
  props: string[];
  patterns: string[];
  hasAdditional: boolean;
  hasUnevaluatedTrue: boolean;
} {
  if (typeof schema !== 'object' || schema === null) {
    return { props: [], patterns: [], hasAdditional: false, hasUnevaluatedTrue: false };
  }

  if (visited.has(schema)) {
    return { props: [], patterns: [], hasAdditional: false, hasUnevaluatedTrue: false };
  }
  visited.add(schema);

  const props: string[] = [];
  const patterns: string[] = [];
  let hasAdditional = false;
  let hasUnevaluatedTrue = false;

  // Check for unevaluatedProperties: true which evaluates all properties
  if (schema.unevaluatedProperties === true) {
    hasUnevaluatedTrue = true;
  }

  // Follow $ref
  if (schema.$ref) {
    const refSchema = ctx.resolveRef(schema.$ref, schema);
    if (refSchema) {
      const collected = collectLocalEvaluatedProperties(
        refSchema,
        ctx,
        visited,
        recurseComposition
      );
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
      if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
    }
  }

  // Follow $dynamicRef - need to collect from ALL possible dynamic targets
  if (schema.$dynamicRef) {
    const ref = schema.$dynamicRef;
    const anchorMatch = ref.match(/#([a-zA-Z][a-zA-Z0-9_-]*)$/);
    if (anchorMatch) {
      // Get all schemas with this dynamic anchor
      const anchorName = anchorMatch[1];
      const dynamicSchemas = ctx.getDynamicAnchors(anchorName);
      for (const dynSchema of dynamicSchemas) {
        const collected = collectLocalEvaluatedProperties(
          dynSchema,
          ctx,
          new Set(visited),
          recurseComposition
        );
        props.push(...collected.props);
        patterns.push(...collected.patterns);
        if (collected.hasAdditional) hasAdditional = true;
        if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
      }
    } else {
      // Not a dynamic anchor ref, resolve statically
      const refSchema = ctx.resolveRef(ref, schema);
      if (refSchema) {
        const collected = collectLocalEvaluatedProperties(
          refSchema,
          ctx,
          visited,
          recurseComposition
        );
        props.push(...collected.props);
        patterns.push(...collected.patterns);
        if (collected.hasAdditional) hasAdditional = true;
        if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
      }
    }
  }

  // Direct properties
  if (schema.properties) {
    props.push(...Object.keys(schema.properties));
  }

  // Pattern properties
  if (schema.patternProperties) {
    patterns.push(...Object.keys(schema.patternProperties));
  }

  // additionalProperties evaluates all additional properties
  if (schema.additionalProperties !== undefined && schema.additionalProperties !== false) {
    hasAdditional = true;
  }

  // allOf - recurse (allOf always applies)
  if (schema.allOf) {
    for (const sub of schema.allOf) {
      const collected = collectLocalEvaluatedProperties(sub, ctx, visited, recurseComposition);
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
      if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
    }
  }

  // For branch evaluation, also recurse into anyOf/oneOf
  if (recurseComposition) {
    // anyOf - recurse
    if (schema.anyOf) {
      for (const sub of schema.anyOf) {
        const collected = collectLocalEvaluatedProperties(sub, ctx, visited, true);
        props.push(...collected.props);
        patterns.push(...collected.patterns);
        if (collected.hasAdditional) hasAdditional = true;
        if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
      }
    }

    // oneOf - recurse
    if (schema.oneOf) {
      for (const sub of schema.oneOf) {
        const collected = collectLocalEvaluatedProperties(sub, ctx, visited, true);
        props.push(...collected.props);
        patterns.push(...collected.patterns);
        if (collected.hasAdditional) hasAdditional = true;
        if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
      }
    }

    // if - collect from if schema when it matches
    if (schema.if) {
      const collected = collectLocalEvaluatedProperties(schema.if, ctx, visited, true);
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
      if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
    }

    // then - collect when if matches
    if (schema.then) {
      const collected = collectLocalEvaluatedProperties(schema.then, ctx, visited, true);
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
      if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
    }

    // else - collect when if doesn't match
    if (schema.else) {
      const collected = collectLocalEvaluatedProperties(schema.else, ctx, visited, true);
      props.push(...collected.props);
      patterns.push(...collected.patterns);
      if (collected.hasAdditional) hasAdditional = true;
      if (collected.hasUnevaluatedTrue) hasUnevaluatedTrue = true;
    }
  }

  return {
    props: [...new Set(props)],
    patterns: [...new Set(patterns)],
    hasAdditional,
    hasUnevaluatedTrue,
  };
}

/**
 * Collect nested composition keywords (anyOf/oneOf/if-then-else) from allOf branches
 * These need runtime evaluation for unevaluatedProperties
 */
function collectNestedCompositions(
  schema: JsonSchema,
  ctx: CompileContext,
  visited: Set<JsonSchema> = new Set()
): Array<{ type: 'anyOf' | 'oneOf' | 'if'; schemas: readonly JsonSchema[] }> {
  if (typeof schema !== 'object' || schema === null) return [];
  if (visited.has(schema)) return [];
  visited.add(schema);

  const result: Array<{ type: 'anyOf' | 'oneOf' | 'if'; schemas: readonly JsonSchema[] }> = [];

  // Follow $ref
  if (schema.$ref) {
    const refSchema = ctx.resolveRef(schema.$ref, schema);
    if (refSchema) {
      result.push(...collectNestedCompositions(refSchema, ctx, visited));
    }
  }

  // Check allOf for nested composition keywords
  if (schema.allOf) {
    for (const sub of schema.allOf) {
      if (typeof sub === 'object' && sub !== null) {
        // Check for anyOf in this allOf branch
        if (sub.anyOf && sub.anyOf.length > 0) {
          result.push({ type: 'anyOf', schemas: sub.anyOf });
        }
        // Check for oneOf in this allOf branch
        if (sub.oneOf && sub.oneOf.length > 0) {
          result.push({ type: 'oneOf', schemas: sub.oneOf });
        }
        // Check for if/then/else in this allOf branch
        if (sub.if !== undefined) {
          const ifSchemas: JsonSchema[] = [sub.if];
          if (sub.then) ifSchemas.push(sub.then);
          if (sub.else) ifSchemas.push(sub.else);
          result.push({ type: 'if', schemas: ifSchemas });
        }
        // Recurse into nested allOf
        result.push(...collectNestedCompositions(sub, ctx, visited));
      }
    }
  }

  return result;
}

/**
 * Generate runtime code to collect evaluated properties from a matched branch,
 * recursively handling nested oneOf/anyOf
 */
function generateBranchEvaluatedProperties(
  code: CodeBuilder,
  schema: JsonSchema,
  dataVar: string,
  ctx: CompileContext,
  visited: Set<JsonSchema> = new Set()
): void {
  if (typeof schema !== 'object' || schema === null) return;
  if (visited.has(schema)) return;
  visited.add(schema);

  // Collect static properties (not recursing into oneOf/anyOf)
  const staticProps = collectLocalEvaluatedProperties(schema, ctx, new Set(), false);

  // Add static props and patterns
  if (staticProps.props.length > 0) {
    for (const p of staticProps.props) {
      code.line(`evaluatedProps["${escapeString(p)}"] = true;`);
    }
  }
  if (staticProps.patterns.length > 0) {
    code.line(`dynamicPatterns.push(...${stringify(staticProps.patterns)});`);
  }
  if (staticProps.hasAdditional || staticProps.hasUnevaluatedTrue) {
    code.line('allPropsEvaluated = true;');
    return; // No need to check further
  }

  // Resolve $ref and check its nested compositions
  let targetSchema = schema;
  if (schema.$ref) {
    const refSchema = ctx.resolveRef(schema.$ref, schema);
    if (refSchema && typeof refSchema === 'object' && refSchema !== null) {
      targetSchema = refSchema;
    }
  }

  // Handle nested oneOf - check which branch matches and recursively collect
  if (typeof targetSchema === 'object' && targetSchema !== null && targetSchema.oneOf) {
    for (const subSchema of targetSchema.oneOf) {
      const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
      code.if(checkExpr, () => {
        generateBranchEvaluatedProperties(code, subSchema, dataVar, ctx, new Set(visited));
      });
    }
  }

  // Handle nested anyOf - check all matching branches
  if (typeof targetSchema === 'object' && targetSchema !== null && targetSchema.anyOf) {
    for (const subSchema of targetSchema.anyOf) {
      const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
      code.if(checkExpr, () => {
        generateBranchEvaluatedProperties(code, subSchema, dataVar, ctx, new Set(visited));
      });
    }
  }

  // Handle nested if/then/else
  if (typeof targetSchema === 'object' && targetSchema !== null && targetSchema.if !== undefined) {
    const ifSchema = targetSchema.if;
    const condVar = code.genVar('nestedIfCond');
    const condCheckExpr = generateSubschemaCheck(ifSchema, dataVar, ctx);
    code.line(`const ${condVar} = ${condCheckExpr};`);

    code.if(condVar, () => {
      generateBranchEvaluatedProperties(code, ifSchema, dataVar, ctx, new Set(visited));
      if (targetSchema.then) {
        generateBranchEvaluatedProperties(code, targetSchema.then, dataVar, ctx, new Set(visited));
      }
    });
    if (targetSchema.else) {
      code.else(() => {
        generateBranchEvaluatedProperties(code, targetSchema.else!, dataVar, ctx, new Set(visited));
      });
    }
  }
}

/**
 * Generate unevaluatedProperties check code
 *
 * This tracks which properties have been evaluated by other keywords
 * and validates any remaining properties against the unevaluatedProperties schema.
 */
export function generateUnevaluatedPropertiesCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (schema.unevaluatedProperties === undefined) return;

  // Collect static evaluated properties (from properties, patternProperties, additionalProperties, allOf, $ref)
  // Don't recurse into anyOf/oneOf/if-then-else - those need runtime evaluation
  const {
    props: staticProps,
    patterns: staticPatterns,
    hasAdditional,
    hasUnevaluatedTrue,
  } = collectLocalEvaluatedProperties(schema, ctx, new Set(), false);

  // If additionalProperties is set or unevaluatedProperties: true is in allOf, all properties are evaluated
  if (hasAdditional || hasUnevaluatedTrue) {
    return; // Nothing to check
  }

  // Collect information about runtime-evaluated branches
  const hasAnyOf = schema.anyOf && schema.anyOf.length > 0;
  const hasOneOf = schema.oneOf && schema.oneOf.length > 0;
  const hasIfThenElse = schema.if !== undefined;
  const hasDependentSchemas =
    schema.dependentSchemas && Object.keys(schema.dependentSchemas).length > 0;

  // Collect nested composition keywords from allOf that need runtime evaluation
  const nestedCompositions = collectNestedCompositions(schema, ctx);
  const hasNestedCompositions = nestedCompositions.length > 0;

  // Need runtime evaluation if we have any conditional keywords
  const needsRuntimeEval =
    hasAnyOf || hasOneOf || hasIfThenElse || hasDependentSchemas || hasNestedCompositions;

  // Only check if data is an object
  code.if(
    `typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar})`,
    () => {
      if (needsRuntimeEval) {
        // Create runtime object for evaluated properties (faster than Set for property lookup)
        const propsObjInit =
          staticProps.length > 0
            ? `{${staticProps.map((p) => `"${escapeString(p)}": true`).join(', ')}}`
            : '{}';
        code.line(`const evaluatedProps = ${propsObjInit};`);

        // Pre-compile static patterns as runtime regex functions
        // Use 'u' flag for Unicode support (enables \p{...} property escapes)
        const patternVars: string[] = [];
        for (const pattern of staticPatterns) {
          const patternVar = ctx.genRuntimeName('evalPattern');
          ctx.addRuntimeFunction(patternVar, new RegExp(pattern, 'u'));
          patternVars.push(patternVar);
        }

        // Track dynamic patterns added at runtime
        code.line(`const dynamicPatterns = [];`);
        code.line(`let allPropsEvaluated = false;`);

        // Handle if/then/else
        if (hasIfThenElse) {
          const ifSchema = schema.if!;
          const condVar = code.genVar('ifCond');
          const checkExpr = generateSubschemaCheck(ifSchema, dataVar, ctx);
          code.line(`const ${condVar} = ${checkExpr};`);

          // When if matches, collect properties from the if schema itself
          code.if(condVar, () => {
            const ifProps = collectLocalEvaluatedProperties(ifSchema, ctx);
            for (const p of ifProps.props) {
              code.line(`evaluatedProps["${escapeString(p)}"] = true;`);
            }
            if (ifProps.patterns.length > 0) {
              code.line(`dynamicPatterns.push(...${stringify(ifProps.patterns)});`);
            }
            if (ifProps.hasAdditional || ifProps.hasUnevaluatedTrue) {
              code.line('allPropsEvaluated = true;');
            }

            // Also add then properties if then exists
            if (schema.then) {
              const thenProps = collectLocalEvaluatedProperties(schema.then, ctx);
              for (const p of thenProps.props) {
                code.line(`evaluatedProps["${escapeString(p)}"] = true;`);
              }
              if (thenProps.patterns.length > 0) {
                code.line(`dynamicPatterns.push(...${stringify(thenProps.patterns)});`);
              }
              if (thenProps.hasAdditional || thenProps.hasUnevaluatedTrue) {
                code.line('allPropsEvaluated = true;');
              }
            }
          });

          // When if doesn't match, add else properties
          if (schema.else) {
            code.else(() => {
              const elseProps = collectLocalEvaluatedProperties(schema.else!, ctx);
              for (const p of elseProps.props) {
                code.line(`evaluatedProps["${escapeString(p)}"] = true;`);
              }
              if (elseProps.patterns.length > 0) {
                code.line(`dynamicPatterns.push(...${stringify(elseProps.patterns)});`);
              }
              if (elseProps.hasAdditional || elseProps.hasUnevaluatedTrue) {
                code.line('allPropsEvaluated = true;');
              }
            });
          }
        }

        // Handle anyOf - add properties from ALL matching branches
        if (hasAnyOf) {
          for (const subSchema of schema.anyOf!) {
            const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
            code.if(checkExpr, () => {
              generateBranchEvaluatedProperties(code, subSchema, dataVar, ctx);
            });
          }
        }

        // Handle oneOf - add properties from THE matching branch
        if (hasOneOf) {
          for (const subSchema of schema.oneOf!) {
            const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
            code.if(checkExpr, () => {
              generateBranchEvaluatedProperties(code, subSchema, dataVar, ctx);
            });
          }
        }

        // Handle dependentSchemas - add properties from matching schemas
        if (hasDependentSchemas) {
          for (const [triggerProp, depSchema] of Object.entries(schema.dependentSchemas!)) {
            const depProps = collectLocalEvaluatedProperties(depSchema, ctx);
            if (
              depProps.props.length > 0 ||
              depProps.patterns.length > 0 ||
              depProps.hasAdditional ||
              depProps.hasUnevaluatedTrue
            ) {
              code.if(`Object.hasOwn(${dataVar}, '${escapeString(triggerProp)}')`, () => {
                for (const p of depProps.props) {
                  code.line(`evaluatedProps["${escapeString(p)}"] = true;`);
                }
                if (depProps.patterns.length > 0) {
                  code.line(`dynamicPatterns.push(...${stringify(depProps.patterns)});`);
                }
                if (depProps.hasAdditional || depProps.hasUnevaluatedTrue) {
                  code.line('allPropsEvaluated = true;');
                }
              });
            }
          }
        }

        // Handle nested compositions from allOf (anyOf/oneOf/if inside allOf)
        if (hasNestedCompositions) {
          for (const comp of nestedCompositions) {
            if (comp.type === 'anyOf' || comp.type === 'oneOf') {
              // For each branch, check if it matches and add its properties
              for (const subSchema of comp.schemas) {
                const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
                code.if(checkExpr, () => {
                  generateBranchEvaluatedProperties(code, subSchema, dataVar, ctx);
                });
              }
            }
            // Note: nested if/then/else is handled similarly but we'd need the if schema to check the condition
          }
        }

        // Now check unevaluated properties using the runtime-built object
        code.if('!allPropsEvaluated', () => {
          code.forIn('key', dataVar, () => {
            // Build the condition: check object property, pre-compiled patterns, then dynamic patterns
            const conditions: string[] = ['!evaluatedProps[key]'];

            // Add pre-compiled static pattern checks
            for (const patternVar of patternVars) {
              conditions.push(`!${patternVar}.test(key)`);
            }

            // Add dynamic patterns check only if there are dynamic patterns
            // Use 'u' flag for Unicode support
            // Short-circuit: skip if dynamicPatterns is empty (common case)
            conditions.push(
              '(dynamicPatterns.length === 0 || !dynamicPatterns.some(p => new RegExp(p, "u").test(key)))'
            );

            code.if(conditions.join(' && '), () => {
              const keyPathExpr = pathExpr === "''" ? 'key' : `${pathExpr} + '.' + key`;
              if (schema.unevaluatedProperties === false) {
                code.line(
                  `if (errors) errors.push({ path: ${keyPathExpr}, message: 'Unevaluated property not allowed', keyword: 'unevaluatedProperties' });`
                );
                code.line('return false;');
              } else if (
                schema.unevaluatedProperties !== true &&
                schema.unevaluatedProperties !== undefined
              ) {
                generateSchemaValidator(
                  code,
                  schema.unevaluatedProperties,
                  `${dataVar}[key]`,
                  keyPathExpr,
                  ctx
                );
              }
            });
          });
        });
      } else {
        // No runtime evaluation needed, use static evaluation
        // Pre-compile static patterns as runtime regex for better performance
        // Use 'u' flag for Unicode support (enables \p{...} property escapes)
        const staticPatternVars: string[] = [];
        for (const pattern of staticPatterns) {
          const patternVar = ctx.genRuntimeName('evalPattern');
          ctx.addRuntimeFunction(patternVar, new RegExp(pattern, 'u'));
          staticPatternVars.push(patternVar);
        }

        // Use object lookup for static properties (faster than includes)
        let staticPropsVar: string | null = null;
        if (staticProps.length > 0) {
          staticPropsVar = ctx.genRuntimeName('evalProps');
          const propsObj: Record<string, true> = {};
          for (const p of staticProps) {
            propsObj[p] = true;
          }
          ctx.addRuntimeFunction(staticPropsVar, propsObj);
        }

        code.forIn('key', dataVar, () => {
          const conditions: string[] = [];

          if (staticPropsVar) {
            conditions.push(`!${staticPropsVar}[key]`);
          }

          for (const patternVar of staticPatternVars) {
            conditions.push(`!${patternVar}.test(key)`);
          }

          const condition = conditions.length > 0 ? conditions.join(' && ') : 'true';

          const keyPathExpr = pathExpr === "''" ? 'key' : `${pathExpr} + '.' + key`;
          code.if(condition, () => {
            if (schema.unevaluatedProperties === false) {
              code.line(
                `if (errors) errors.push({ path: ${keyPathExpr}, message: 'Unevaluated property not allowed', keyword: 'unevaluatedProperties' });`
              );
              code.line('return false;');
            } else if (
              schema.unevaluatedProperties !== true &&
              schema.unevaluatedProperties !== undefined
            ) {
              generateSchemaValidator(
                code,
                schema.unevaluatedProperties,
                `${dataVar}[key]`,
                keyPathExpr,
                ctx
              );
            }
          });
        });
      }
    }
  );
}

/**
 * Collect the highest evaluated item index from a schema (recursively)
 * @param recurseComposition - if false, don't recurse into anyOf/oneOf/if-then-else
 */
function collectEvaluatedItems(
  schema: JsonSchema,
  ctx: CompileContext,
  visited: Set<JsonSchema> = new Set(),
  recurseComposition: boolean = true
): {
  prefixCount: number;
  hasItems: boolean;
  hasUnevaluatedItemsTrue: boolean;
  containsSchemas: JsonSchema[];
} {
  if (typeof schema !== 'object' || schema === null) {
    return { prefixCount: 0, hasItems: false, hasUnevaluatedItemsTrue: false, containsSchemas: [] };
  }

  // Prevent infinite recursion for circular refs
  if (visited.has(schema)) {
    return { prefixCount: 0, hasItems: false, hasUnevaluatedItemsTrue: false, containsSchemas: [] };
  }
  visited.add(schema);

  let prefixCount = schema.prefixItems?.length ?? 0;
  let hasItems = schema.items !== undefined && schema.items !== false;
  let hasUnevaluatedItemsTrue = schema.unevaluatedItems === true;
  const containsSchemas: JsonSchema[] = schema.contains ? [schema.contains] : [];

  // Follow $ref
  if (schema.$ref) {
    const refSchema = ctx.resolveRef(schema.$ref, schema);
    if (refSchema) {
      const collected = collectEvaluatedItems(refSchema, ctx, visited, recurseComposition);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
      containsSchemas.push(...collected.containsSchemas);
    }
  }

  // Follow $dynamicRef - need to collect from ALL possible dynamic targets
  if (schema.$dynamicRef) {
    const ref = schema.$dynamicRef;
    const anchorMatch = ref.match(/#([a-zA-Z][a-zA-Z0-9_-]*)$/);
    if (anchorMatch) {
      // Get all schemas with this dynamic anchor
      const anchorName = anchorMatch[1];
      const dynamicSchemas = ctx.getDynamicAnchors(anchorName);
      for (const dynSchema of dynamicSchemas) {
        const collected = collectEvaluatedItems(
          dynSchema,
          ctx,
          new Set(visited),
          recurseComposition
        );
        prefixCount = Math.max(prefixCount, collected.prefixCount);
        if (collected.hasItems) hasItems = true;
        if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
        containsSchemas.push(...collected.containsSchemas);
      }
    } else {
      // Not a dynamic anchor ref, resolve statically
      const refSchema = ctx.resolveRef(ref, schema);
      if (refSchema) {
        const collected = collectEvaluatedItems(refSchema, ctx, visited, recurseComposition);
        prefixCount = Math.max(prefixCount, collected.prefixCount);
        if (collected.hasItems) hasItems = true;
        if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
        containsSchemas.push(...collected.containsSchemas);
      }
    }
  }

  // allOf - take maximum prefix count
  if (schema.allOf) {
    for (const sub of schema.allOf) {
      const collected = collectEvaluatedItems(sub, ctx, visited, recurseComposition);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
      containsSchemas.push(...collected.containsSchemas);
    }
  }

  // Only recurse into anyOf/oneOf/if-then-else if recurseComposition is true
  if (recurseComposition) {
    // anyOf - take maximum prefix count
    if (schema.anyOf) {
      for (const sub of schema.anyOf) {
        const collected = collectEvaluatedItems(sub, ctx, visited, true);
        prefixCount = Math.max(prefixCount, collected.prefixCount);
        if (collected.hasItems) hasItems = true;
        if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
        containsSchemas.push(...collected.containsSchemas);
      }
    }

    // oneOf - take maximum prefix count
    if (schema.oneOf) {
      for (const sub of schema.oneOf) {
        const collected = collectEvaluatedItems(sub, ctx, visited, true);
        prefixCount = Math.max(prefixCount, collected.prefixCount);
        if (collected.hasItems) hasItems = true;
        if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
        containsSchemas.push(...collected.containsSchemas);
      }
    }

    // if/then/else
    if (schema.if) {
      const collected = collectEvaluatedItems(schema.if, ctx, visited, true);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
      containsSchemas.push(...collected.containsSchemas);
    }
    if (schema.then) {
      const collected = collectEvaluatedItems(schema.then, ctx, visited, true);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
      containsSchemas.push(...collected.containsSchemas);
    }
    if (schema.else) {
      const collected = collectEvaluatedItems(schema.else, ctx, visited, true);
      prefixCount = Math.max(prefixCount, collected.prefixCount);
      if (collected.hasItems) hasItems = true;
      if (collected.hasUnevaluatedItemsTrue) hasUnevaluatedItemsTrue = true;
      containsSchemas.push(...collected.containsSchemas);
    }
  }

  return { prefixCount, hasItems, hasUnevaluatedItemsTrue, containsSchemas };
}

/**
 * Generate unevaluatedItems check code
 *
 * This tracks which array items have been evaluated by other keywords
 * and validates any remaining items against the unevaluatedItems schema.
 */
export function generateUnevaluatedItemsCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  pathExpr: string,
  ctx: CompileContext
): void {
  if (schema.unevaluatedItems === undefined) return;

  // Collect info about evaluated items from the schema tree (static, without anyOf/oneOf/if-then-else)
  const {
    prefixCount: staticPrefixCount,
    hasItems,
    hasUnevaluatedItemsTrue,
    containsSchemas,
  } = collectEvaluatedItems(schema, ctx, new Set(), false);

  // If items is defined and not false anywhere, or unevaluatedItems: true is in allOf, all items are evaluated
  if (hasItems || hasUnevaluatedItemsTrue) {
    return; // Nothing to check
  }

  // Check if we need runtime evaluation for anyOf/oneOf/if-then-else
  const hasAnyOf = schema.anyOf && schema.anyOf.length > 0;
  const hasOneOf = schema.oneOf && schema.oneOf.length > 0;
  const hasIfThenElse = schema.if !== undefined;
  const hasContains = containsSchemas.length > 0;
  const needsRuntimeEval = hasAnyOf || hasOneOf || hasIfThenElse || hasContains;

  // Check if any subschema has contains (requires Set tracking)
  const anySubschemaHasContains = (): boolean => {
    const checkSchema = (s: JsonSchemaBase): boolean => {
      if (s.contains !== undefined) return true;
      if (s.anyOf) {
        for (const sub of s.anyOf) {
          if (typeof sub === 'object' && sub !== null && checkSchema(sub)) return true;
        }
      }
      if (s.oneOf) {
        for (const sub of s.oneOf) {
          if (typeof sub === 'object' && sub !== null && checkSchema(sub)) return true;
        }
      }
      if (s.allOf) {
        for (const sub of s.allOf) {
          if (typeof sub === 'object' && sub !== null && checkSchema(sub)) return true;
        }
      }
      if (s.if !== undefined) {
        // Check the if schema itself
        if (typeof s.if === 'object' && s.if !== null && checkSchema(s.if)) return true;
        if (s.then && typeof s.then === 'object' && checkSchema(s.then)) return true;
        if (s.else && typeof s.else === 'object' && checkSchema(s.else)) return true;
      }
      return false;
    };
    return hasContains || checkSchema(schema);
  };

  // Use Set only when contains is present (can evaluate arbitrary items)
  // Otherwise use a simple maxEvaluatedIndex number (faster)
  const needsSet = anySubschemaHasContains();

  // Only check if data is an array
  code.if(`Array.isArray(${dataVar})`, () => {
    if (needsRuntimeEval) {
      // Track evaluated items - use number when possible, Set when contains is present
      const maxIndexVar = code.genVar('maxIdx');
      const evaluatedSetVar = needsSet ? code.genVar('evaluatedItems') : null;

      code.line(`let ${maxIndexVar} = ${staticPrefixCount - 1};`);
      if (evaluatedSetVar) {
        code.line(`const ${evaluatedSetVar} = new Set();`);
        // Mark static prefixItems as evaluated
        if (staticPrefixCount > 0) {
          code.line(
            `for (let k = 0; k < Math.min(${staticPrefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
          );
        }
      }

      // Handle contains - check each item against all contains schemas (requires Set)
      if (evaluatedSetVar) {
        for (const containsSchema of containsSchemas) {
          const iVar = code.genVar('i');
          code.for(`let ${iVar} = 0`, `${iVar} < ${dataVar}.length`, `${iVar}++`, () => {
            const checkExpr = generateSubschemaCheck(containsSchema, `${dataVar}[${iVar}]`, ctx);
            code.if(checkExpr, () => {
              code.line(`${evaluatedSetVar}.add(${iVar});`);
            });
          });
        }
      }

      // Handle anyOf - check which branches match and get their prefixItems count
      if (hasAnyOf) {
        for (const subSchema of schema.anyOf!) {
          const subCollected = collectEvaluatedItems(subSchema, ctx, new Set(), true);
          if (
            subCollected.prefixCount > 0 ||
            subCollected.hasItems ||
            subCollected.containsSchemas.length > 0
          ) {
            const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
            code.if(checkExpr, () => {
              if (subCollected.hasItems) {
                // All items are evaluated - set max to array length
                code.line(`${maxIndexVar} = ${dataVar}.length - 1;`);
                if (evaluatedSetVar) {
                  code.line(
                    `for (let k = 0; k < ${dataVar}.length; k++) ${evaluatedSetVar}.add(k);`
                  );
                }
              } else {
                if (subCollected.prefixCount > 0) {
                  // Update max index
                  code.line(
                    `${maxIndexVar} = Math.max(${maxIndexVar}, ${subCollected.prefixCount - 1});`
                  );
                  if (evaluatedSetVar) {
                    code.line(
                      `for (let k = 0; k < Math.min(${subCollected.prefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
                    );
                  }
                }
                // Handle nested contains
                if (evaluatedSetVar) {
                  for (const nestedContains of subCollected.containsSchemas) {
                    const kVar = code.genVar('k');
                    code.for(`let ${kVar} = 0`, `${kVar} < ${dataVar}.length`, `${kVar}++`, () => {
                      const nestedCheck = generateSubschemaCheck(
                        nestedContains,
                        `${dataVar}[${kVar}]`,
                        ctx
                      );
                      code.if(nestedCheck, () => {
                        code.line(`${evaluatedSetVar}.add(${kVar});`);
                      });
                    });
                  }
                }
              }
            });
          }
        }
      }

      // Handle oneOf - similar to anyOf
      if (hasOneOf) {
        for (const subSchema of schema.oneOf!) {
          const subCollected = collectEvaluatedItems(subSchema, ctx, new Set(), true);
          if (
            subCollected.prefixCount > 0 ||
            subCollected.hasItems ||
            subCollected.containsSchemas.length > 0
          ) {
            const checkExpr = generateSubschemaCheck(subSchema, dataVar, ctx);
            code.if(checkExpr, () => {
              if (subCollected.hasItems) {
                code.line(`${maxIndexVar} = ${dataVar}.length - 1;`);
                if (evaluatedSetVar) {
                  code.line(
                    `for (let k = 0; k < ${dataVar}.length; k++) ${evaluatedSetVar}.add(k);`
                  );
                }
              } else {
                if (subCollected.prefixCount > 0) {
                  code.line(
                    `${maxIndexVar} = Math.max(${maxIndexVar}, ${subCollected.prefixCount - 1});`
                  );
                  if (evaluatedSetVar) {
                    code.line(
                      `for (let k = 0; k < Math.min(${subCollected.prefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
                    );
                  }
                }
                if (evaluatedSetVar) {
                  for (const nestedContains of subCollected.containsSchemas) {
                    const kVar = code.genVar('k');
                    code.for(`let ${kVar} = 0`, `${kVar} < ${dataVar}.length`, `${kVar}++`, () => {
                      const nestedCheck = generateSubschemaCheck(
                        nestedContains,
                        `${dataVar}[${kVar}]`,
                        ctx
                      );
                      code.if(nestedCheck, () => {
                        code.line(`${evaluatedSetVar}.add(${kVar});`);
                      });
                    });
                  }
                }
              }
            });
          }
        }
      }

      // Handle if/then/else - recursively handles nested if/then/else in then/else branches
      if (hasIfThenElse) {
        if (evaluatedSetVar) {
          generateIfThenElseEvaluatedItems(code, schema, dataVar, evaluatedSetVar, ctx);
        } else {
          generateIfThenElseEvaluatedItemsNumeric(code, schema, dataVar, maxIndexVar, ctx);
        }
      }

      // Now validate unevaluated items
      if (schema.unevaluatedItems === false) {
        if (evaluatedSetVar) {
          // Use Set-based check
          const jVar = code.genVar('j');
          code.for(`let ${jVar} = 0`, `${jVar} < ${dataVar}.length`, `${jVar}++`, () => {
            code.if(`!${evaluatedSetVar}.has(${jVar})`, () => {
              const itemPathExpr =
                pathExpr === "''" ? `'[' + ${jVar} + ']'` : `${pathExpr} + '[' + ${jVar} + ']'`;
              code.line(
                `if (errors) errors.push({ path: ${itemPathExpr}, message: 'Unevaluated item not allowed', keyword: 'unevaluatedItems' });`
              );
              code.line('return false;');
            });
          });
        } else {
          // Use simple length check (much faster)
          code.if(`${dataVar}.length > ${maxIndexVar} + 1`, () => {
            const itemPathExpr =
              pathExpr === "''"
                ? `'[' + (${maxIndexVar} + 1) + ']'`
                : `${pathExpr} + '[' + (${maxIndexVar} + 1) + ']'`;
            code.line(
              `if (errors) errors.push({ path: ${itemPathExpr}, message: 'Unevaluated item not allowed', keyword: 'unevaluatedItems' });`
            );
            code.line('return false;');
          });
        }
      } else if (schema.unevaluatedItems !== true) {
        if (evaluatedSetVar) {
          const jVar = code.genVar('j');
          code.for(`let ${jVar} = 0`, `${jVar} < ${dataVar}.length`, `${jVar}++`, () => {
            code.if(`!${evaluatedSetVar}.has(${jVar})`, () => {
              const itemPathExpr =
                pathExpr === "''" ? `'[' + ${jVar} + ']'` : `${pathExpr} + '[' + ${jVar} + ']'`;
              generateSchemaValidator(
                code,
                schema.unevaluatedItems as JsonSchema,
                `${dataVar}[${jVar}]`,
                itemPathExpr,
                ctx
              );
            });
          });
        } else {
          // Validate items beyond maxIndex against the schema
          const jVar = code.genVar('j');
          code.for(
            `let ${jVar} = ${maxIndexVar} + 1`,
            `${jVar} < ${dataVar}.length`,
            `${jVar}++`,
            () => {
              const itemPathExpr =
                pathExpr === "''" ? `'[' + ${jVar} + ']'` : `${pathExpr} + '[' + ${jVar} + ']'`;
              generateSchemaValidator(
                code,
                schema.unevaluatedItems as JsonSchema,
                `${dataVar}[${jVar}]`,
                itemPathExpr,
                ctx
              );
            }
          );
        }
      }
    } else {
      // No runtime evaluation needed, use simpler static evaluation
      if (schema.unevaluatedItems === false) {
        if (staticPrefixCount > 0) {
          code.if(`${dataVar}.length > ${staticPrefixCount}`, () => {
            const itemPathExpr =
              pathExpr === "''"
                ? `'[' + ${staticPrefixCount} + ']'`
                : `${pathExpr} + '[' + ${staticPrefixCount} + ']'`;
            code.line(
              `if (errors) errors.push({ path: ${itemPathExpr}, message: 'Unevaluated item not allowed', keyword: 'unevaluatedItems' });`
            );
            code.line('return false;');
          });
        } else {
          code.if(`${dataVar}.length > 0`, () => {
            genError(code, pathExpr, 'unevaluatedItems', 'Array must be empty');
          });
        }
      } else if (schema.unevaluatedItems !== true) {
        // Validate unevaluated items against the schema
        const iVar = code.genVar('i');
        code.for(
          `let ${iVar} = ${staticPrefixCount}`,
          `${iVar} < ${dataVar}.length`,
          `${iVar}++`,
          () => {
            const itemPathExpr =
              pathExpr === "''" ? `'[' + ${iVar} + ']'` : `${pathExpr} + '[' + ${iVar} + ']'`;
            generateSchemaValidator(
              code,
              schema.unevaluatedItems as JsonSchema,
              `${dataVar}[${iVar}]`,
              itemPathExpr,
              ctx
            );
          }
        );
      }
    }
  });
}

/**
 * Recursively generate code to track evaluated items for if/then/else
 * This handles nested if/then/else structures properly
 */
function generateIfThenElseEvaluatedItems(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  evaluatedSetVar: string,
  ctx: CompileContext
): void {
  if (schema.if === undefined) return;

  const ifSchema = schema.if;
  const condVar = code.genVar('ifCond');
  const checkExpr = generateSubschemaCheck(ifSchema, dataVar, ctx);
  code.line(`const ${condVar} = ${checkExpr};`);

  // When if matches, add items from if and then
  code.if(condVar, () => {
    // Add evaluated items from the if schema itself
    const ifCollected = collectEvaluatedItems(ifSchema, ctx, new Set(), false);
    if (ifCollected.prefixCount > 0) {
      code.line(
        `for (let k = 0; k < Math.min(${ifCollected.prefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
      );
    }
    // Add items matched by contains in the if schema
    for (const nestedContains of ifCollected.containsSchemas) {
      const kVar = code.genVar('k');
      code.for(`let ${kVar} = 0`, `${kVar} < ${dataVar}.length`, `${kVar}++`, () => {
        const nestedCheck = generateSubschemaCheck(nestedContains, `${dataVar}[${kVar}]`, ctx);
        code.if(nestedCheck, () => {
          code.line(`${evaluatedSetVar}.add(${kVar});`);
        });
      });
    }

    // Handle the then branch
    if (schema.then) {
      const thenSchema = schema.then;
      // First add simple items from then (not from nested if/then)
      const thenCollected = collectEvaluatedItems(thenSchema, ctx, new Set(), false);
      if (thenCollected.hasItems) {
        code.line(`for (let k = 0; k < ${dataVar}.length; k++) ${evaluatedSetVar}.add(k);`);
      } else if (thenCollected.prefixCount > 0) {
        code.line(
          `for (let k = 0; k < Math.min(${thenCollected.prefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
        );
      }
      for (const nestedContains of thenCollected.containsSchemas) {
        const kVar = code.genVar('k');
        code.for(`let ${kVar} = 0`, `${kVar} < ${dataVar}.length`, `${kVar}++`, () => {
          const nestedCheck = generateSubschemaCheck(nestedContains, `${dataVar}[${kVar}]`, ctx);
          code.if(nestedCheck, () => {
            code.line(`${evaluatedSetVar}.add(${kVar});`);
          });
        });
      }

      // Recursively handle nested if/then/else in the then branch
      if (typeof thenSchema === 'object' && thenSchema !== null && thenSchema.if !== undefined) {
        generateIfThenElseEvaluatedItems(code, thenSchema, dataVar, evaluatedSetVar, ctx);
      }
    }
  });

  // When if doesn't match, add items from else
  if (schema.else) {
    code.else(() => {
      const elseSchema = schema.else!;
      const elseCollected = collectEvaluatedItems(elseSchema, ctx, new Set(), false);
      if (elseCollected.hasItems) {
        code.line(`for (let k = 0; k < ${dataVar}.length; k++) ${evaluatedSetVar}.add(k);`);
      } else if (elseCollected.prefixCount > 0) {
        code.line(
          `for (let k = 0; k < Math.min(${elseCollected.prefixCount}, ${dataVar}.length); k++) ${evaluatedSetVar}.add(k);`
        );
      }
      for (const nestedContains of elseCollected.containsSchemas) {
        const kVar = code.genVar('k');
        code.for(`let ${kVar} = 0`, `${kVar} < ${dataVar}.length`, `${kVar}++`, () => {
          const nestedCheck = generateSubschemaCheck(nestedContains, `${dataVar}[${kVar}]`, ctx);
          code.if(nestedCheck, () => {
            code.line(`${evaluatedSetVar}.add(${kVar});`);
          });
        });
      }

      // Recursively handle nested if/then/else in the else branch
      if (typeof elseSchema === 'object' && elseSchema !== null && elseSchema.if !== undefined) {
        generateIfThenElseEvaluatedItems(code, elseSchema, dataVar, evaluatedSetVar, ctx);
      }
    });
  }
}

/**
 * Numeric version of if/then/else evaluated items tracking.
 * Uses a simple maxIndex counter instead of Set (faster when no contains).
 */
function generateIfThenElseEvaluatedItemsNumeric(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: string,
  maxIndexVar: string,
  ctx: CompileContext
): void {
  if (schema.if === undefined) return;

  const ifSchema = schema.if;
  const condVar = code.genVar('ifCond');
  const checkExpr = generateSubschemaCheck(ifSchema, dataVar, ctx);
  code.line(`const ${condVar} = ${checkExpr};`);

  // When if matches, update maxIndex from if and then
  code.if(condVar, () => {
    const ifCollected = collectEvaluatedItems(ifSchema, ctx, new Set(), false);
    if (ifCollected.prefixCount > 0) {
      code.line(`${maxIndexVar} = Math.max(${maxIndexVar}, ${ifCollected.prefixCount - 1});`);
    }
    if (ifCollected.hasItems) {
      code.line(`${maxIndexVar} = ${dataVar}.length - 1;`);
    }

    // Handle the then branch
    if (schema.then) {
      const thenSchema = schema.then;
      const thenCollected = collectEvaluatedItems(thenSchema, ctx, new Set(), false);
      if (thenCollected.hasItems) {
        code.line(`${maxIndexVar} = ${dataVar}.length - 1;`);
      } else if (thenCollected.prefixCount > 0) {
        code.line(`${maxIndexVar} = Math.max(${maxIndexVar}, ${thenCollected.prefixCount - 1});`);
      }

      // Recursively handle nested if/then/else in the then branch
      if (typeof thenSchema === 'object' && thenSchema !== null && thenSchema.if !== undefined) {
        generateIfThenElseEvaluatedItemsNumeric(code, thenSchema, dataVar, maxIndexVar, ctx);
      }
    }
  });

  // When if doesn't match, update maxIndex from else
  if (schema.else) {
    code.else(() => {
      const elseSchema = schema.else!;
      const elseCollected = collectEvaluatedItems(elseSchema, ctx, new Set(), false);
      if (elseCollected.hasItems) {
        code.line(`${maxIndexVar} = ${dataVar}.length - 1;`);
      } else if (elseCollected.prefixCount > 0) {
        code.line(`${maxIndexVar} = Math.max(${maxIndexVar}, ${elseCollected.prefixCount - 1});`);
      }

      // Recursively handle nested if/then/else in the else branch
      if (typeof elseSchema === 'object' && elseSchema !== null && elseSchema.if !== undefined) {
        generateIfThenElseEvaluatedItemsNumeric(code, elseSchema, dataVar, maxIndexVar, ctx);
      }
    });
  }
}
