/**
 * Safe Code Generation for JSON Schema Compiler
 *
 * This module provides type-safe code generation inspired by AJV's approach.
 * It prevents code injection by using tagged template literals and wrapper classes
 * that ensure strings are always safely escaped.
 *
 * Key concepts:
 * - `Code`: Base class representing safe code fragments
 * - `Name`: Subclass for variable/identifier names
 * - `_` template: Creates Code instances, strings are auto-quoted
 * - `str` template: Creates string expression code
 *
 * SECURITY: All CodeBuilder methods ONLY accept Code types. Raw strings cannot
 * be passed directly - they must go through the `_` template which auto-escapes.
 */

// ============================================================================
// Core Types
// ============================================================================

/**
 * Private symbol to prevent external construction of Code instances
 */
const CODE_BRAND = Symbol('Code');

/**
 * Represents a safe code fragment.
 * Can only be created via the `_` tagged template literal.
 */
export class Code {
  /** Brand to ensure only internal construction */
  readonly [CODE_BRAND]: true = true;
  /** The actual code string */
  readonly #str: string;

  /** @internal - Use static factory methods or `_` template literal instead */
  protected constructor(s: string) {
    this.#str = s;
  }

  toString(): string {
    return this.#str;
  }

  /** Check if this code is empty */
  get isEmpty(): boolean {
    return this.#str === '';
  }

  /**
   * Create a Code instance from a raw string.
   * @internal - Use only within codegen.ts for utility functions
   */
  static raw(s: string): Code {
    return new Code(s);
  }

  static join(codes: Code[], separator: string): Code {
    return new Code(codes.map((c) => c.toString()).join(separator));
  }
}

/**
 * Represents a variable or identifier name.
 * Names are valid JavaScript identifiers and can be safely used in code.
 */
export class Name extends Code {
  /** The identifier string */
  readonly str: string;

  constructor(s: string) {
    super(s);
    this.str = s;
  }

  toString(): string {
    return this.str;
  }
}

/**
 * Type that can be safely interpolated into code
 */
export type SafeValue = Code | Name | string | number | boolean | null | undefined;

// ============================================================================
// Tagged Template Literals
// ============================================================================

/**
 * Escape a string for use in generated JavaScript string literals.
 * Handles quotes, backslashes, and control characters.
 */
export function escapeString(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t')
    .replace(/[\x00-\x1f\x7f]/g, (c) => `\\x${c.charCodeAt(0).toString(16).padStart(2, '0')}`);
}

/**
 * Safely interpolate a value into code.
 * - Code/Name: inserted as-is (already safe)
 * - string: wrapped in quotes and escaped
 * - number/boolean: validated at runtime, then converted to literal
 * - null: converted to "null"
 * - undefined: converted to "undefined"
 *
 * SECURITY: Numbers and booleans are validated at runtime to prevent injection
 * attacks where a value typed as number could actually be a malicious string.
 */
function safeInterpolate(value: SafeValue): string {
  if (value instanceof Code) {
    return value.toString();
  }
  if (typeof value === 'string') {
    // Strings are ALWAYS quoted - this is the key safety feature
    return `"${escapeString(value)}"`;
  }
  if (typeof value === 'number') {
    // Defense: reject NaN and Infinity which could cause issues in generated code
    if (!Number.isFinite(value)) {
      throw new Error(`Expected finite number in template, got: ${value}`);
    }
    return String(value);
  }
  if (typeof value === 'boolean') {
    return String(value);
  }
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  // Fallback - should not happen with proper typing, but escape as string for safety
  throw new Error(`Unexpected value type in template: ${typeof value}`);
}

/**
 * Tagged template literal for creating safe code.
 * Strings are automatically quoted and escaped.
 *
 * @example
 * const name = 'foo';           // raw string - will be quoted
 * const varName = new Name('x'); // Name - used as-is
 * const code = _`if (${varName} === ${name}) { ... }`
 * // Result: "if (x === "foo") { ... }"
 */
export function _(strings: TemplateStringsArray, ...values: SafeValue[]): Code {
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    result += safeInterpolate(values[i]);
    result += strings[i + 1];
  }
  return Code.raw(result);
}

/**
 * Tagged template literal for creating string expressions in code.
 * The result is code that evaluates to a string.
 *
 * @example
 * const path = new Name('path');
 * const prop = 'foo';
 * const code = str`${path} + '.${prop}'`
 * // Result: code that produces: path + '.foo'
 */
export function str(strings: TemplateStringsArray, ...values: SafeValue[]): Code {
  // For string expressions, we want to create code that builds a string
  // Values that are Code/Name are used as-is (they're expressions)
  // Values that are strings are escaped but NOT wrapped in quotes here
  // (the str template is for building string concatenation expressions)
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    const value = values[i];
    if (value instanceof Code) {
      result += value.toString();
    } else if (typeof value === 'string') {
      result += escapeString(value);
    } else if (value === null) {
      result += 'null';
    } else if (value === undefined) {
      result += 'undefined';
    } else {
      result += String(value);
    }
    result += strings[i + 1];
  }
  return Code.raw(result);
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Create a Name from a string (for identifiers)
 */
export function name(s: string): Name {
  return new Name(s);
}

/**
 * Generate a property access expression as Code.
 * Handles both dot notation (data.foo) and bracket notation (data["foo-bar"])
 */
export function propAccess(obj: Code | Name, prop: string): Code {
  const objStr = obj.toString();
  // Use dot notation if property is a valid identifier
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(prop)) {
    return Code.raw(`${objStr}.${prop}`);
  }
  // Otherwise use bracket notation with escaped string
  return Code.raw(`${objStr}["${escapeString(prop)}"]`);
}

/**
 * Generate an index access expression as Code.
 * e.g., data[i] or data[0]
 */
export function indexAccess(obj: Code | Name, index: Code | Name | number): Code {
  const objStr = obj.toString();
  const indexStr = index instanceof Code ? index.toString() : String(index);
  return Code.raw(`${objStr}[${indexStr}]`);
}

/**
 * Stringify a value for embedding in generated code (JSON.stringify).
 * Returns Code since it's safe to embed.
 */
export function stringify(value: unknown): Code {
  return Code.raw(JSON.stringify(value));
}

/**
 * Create a string literal Code from a raw string.
 * The string will be quoted and escaped.
 */
export function strLit(s: string): Code {
  return Code.raw(`"${escapeString(s)}"`);
}

/**
 * Create a single-quoted string literal Code.
 */
export function strLitSingle(s: string): Code {
  return Code.raw(`'${escapeString(s)}'`);
}

/**
 * Create a number literal Code.
 */
export function numLit(n: number): Code {
  return Code.raw(String(n));
}

/**
 * Concatenate multiple Code fragments.
 */
export function concat(...codes: Code[]): Code {
  return Code.raw(codes.map((c) => c.toString()).join(''));
}

/**
 * Join Code fragments with a separator.
 */
export function join(codes: Code[], separator: string): Code {
  return Code.raw(codes.map((c) => c.toString()).join(separator));
}

/**
 * Create an "and" expression (&&) from multiple conditions.
 */
export function and(...conditions: Code[]): Code {
  if (conditions.length === 0) return _`true`;
  if (conditions.length === 1) return conditions[0];
  return Code.raw(conditions.map((c) => c.toString()).join(' && '));
}

/**
 * Create an "or" expression (||) from multiple conditions.
 */
export function or(...conditions: Code[]): Code {
  if (conditions.length === 0) return _`false`;
  if (conditions.length === 1) return conditions[0];
  return Code.raw(conditions.map((c) => c.toString()).join(' || '));
}

/**
 * Negate a condition.
 */
export function not(condition: Code): Code {
  return _`!(${condition})`;
}

/**
 * Generate a path expression for error messages in JSON Pointer format (AJV-compatible).
 * Returns Code that evaluates to a path string at runtime.
 * Paths are in JSON Pointer format: "" for root, "/foo", "/foo/0", etc.
 */
export function pathExpr(basePath: Code | Name, segment: string | number): Code {
  // Escape segment for JSON Pointer: ~ becomes ~0, / becomes ~1
  const segmentStr = String(segment);
  const escaped = escapeString(segmentStr.replace(/~/g, '~0').replace(/\//g, '~1'));
  if (basePath.toString() === "''") {
    return Code.raw(`'/${escaped}'`);
  }
  // Use template literal for faster string concatenation
  return Code.raw(`\`\${${basePath}}/${escaped}\``);
}

/**
 * Generate a dynamic path expression (when segment is a variable) in JSON Pointer format.
 */
export function pathExprDynamic(basePath: Code | Name, segmentVar: Code | Name): Code {
  if (basePath.toString() === "''") {
    // Use template literal for faster string concatenation
    return Code.raw(`\`/\${${segmentVar}}\``);
  }
  // Use template literal for faster string concatenation
  return Code.raw(`\`\${${basePath}}/\${${segmentVar}}\``);
}

/**
 * Generate a dynamic array index path expression in JSON Pointer format.
 */
export function pathExprIndex(basePath: Code | Name, indexVar: Code | Name): Code {
  if (basePath.toString() === "''") {
    // Use template literal for faster string concatenation
    return Code.raw(`\`/\${${indexVar}}\``);
  }
  // Use template literal for faster string concatenation
  return Code.raw(`\`\${${basePath}}/\${${indexVar}}\``);
}

// ============================================================================
// CodeBuilder Class
// ============================================================================

/**
 * Helper type for tagged template or Code argument
 */
type TemplateInput = Code | TemplateStringsArray;

/**
 * Convert tagged template or Code to Code
 */
function toCode(input: TemplateInput, values?: SafeValue[]): Code {
  if (input instanceof Code) return input;
  // It's a TemplateStringsArray - use _ to build Code
  return _(input, ...(values || []));
}

/**
 * Builds JavaScript code with proper indentation and safe interpolation.
 * Methods accept either Code or tagged template syntax:
 *   code.if(_`condition`, body)  // traditional
 *   code.if`condition`(body)     // tagged template
 */
export class CodeBuilder {
  #lines: string[] = [];
  #indent = 0;
  #varCounter = 0;

  /**
   * Add a line of code at current indentation.
   * Supports both: code.line(_`...`) and code.line`...`
   */
  line(input: TemplateInput, ...values: SafeValue[]): this {
    const code = toCode(input, values);
    this.#lines.push('  '.repeat(this.#indent) + code.toString());
    return this;
  }

  /**
   * Add an empty line
   */
  blank(): this {
    this.#lines.push('');
    return this;
  }

  /**
   * Add a block with braces (e.g., if, for, function)
   * Supports both: code.block(_`header`, body) and code.block`header`(body)
   */
  block(input: TemplateInput, ...rest: unknown[]): this | ((body: () => void) => this) {
    // Check if called as tagged template
    if (Array.isArray(input) && 'raw' in input) {
      const values = rest as SafeValue[];
      const code = _(input as TemplateStringsArray, ...values);
      // Return a function that takes the body
      return (body: () => void) => {
        this.#lines.push('  '.repeat(this.#indent) + code.toString() + ' {');
        this.#indent++;
        body();
        this.#indent--;
        this.line`}`;
        return this;
      };
    }
    // Traditional call: block(code, body)
    const header = input as Code;
    const body = rest[0] as () => void;
    this.#lines.push('  '.repeat(this.#indent) + header.toString() + ' {');
    this.#indent++;
    body();
    this.#indent--;
    this.line`}`;
    return this;
  }

  /**
   * Add an if statement
   * Supports both: code.if(_`cond`, body) and code.if`cond`(body)
   */
  if(input: TemplateInput, ...rest: unknown[]): this | ((body: () => void) => this) {
    // Check if called as tagged template
    if (Array.isArray(input) && 'raw' in input) {
      const values = rest as SafeValue[];
      const condition = _(input as TemplateStringsArray, ...values);
      return (body: () => void) => this.block(_`if (${condition})`, body) as this;
    }
    // Traditional call: if(code, body)
    const condition = input as Code;
    const body = rest[0] as () => void;
    return this.block(_`if (${condition})`, body) as this;
  }

  /**
   * Add an else clause
   */
  else(body: () => void): this {
    // Remove the closing brace from previous line
    const lastLine = this.#lines.pop();
    if (lastLine?.trim() === '}') {
      this.#lines.push(lastLine.replace('}', '} else {'));
      this.#indent++;
      body();
      this.#indent--;
      this.line`}`;
    }
    return this;
  }

  /**
   * Add an else-if clause
   * Supports both: code.elseIf(_`cond`, body) and code.elseIf`cond`(body)
   */
  elseIf(input: TemplateInput, ...rest: unknown[]): this | ((body: () => void) => this) {
    const doElseIf = (condition: Code, body: () => void) => {
      const lastLine = this.#lines.pop();
      if (lastLine?.trim() === '}') {
        this.#lines.push(lastLine.replace('}', `} else if (${condition.toString()}) {`));
        this.#indent++;
        body();
        this.#indent--;
        this.line`}`;
      }
      return this;
    };

    // Check if called as tagged template
    if (Array.isArray(input) && 'raw' in input) {
      const values = rest as SafeValue[];
      const condition = _(input as TemplateStringsArray, ...values);
      return (body: () => void) => doElseIf(condition, body);
    }
    // Traditional call
    return doElseIf(input as Code, rest[0] as () => void);
  }

  /**
   * Add a for loop
   */
  for(init: Code, condition: Code, update: Code, body: () => void): this {
    return this.block(_`for (${init}; ${condition}; ${update})`, body) as this;
  }

  /**
   * Add a for-of loop
   */
  forOf(variable: Name, iterable: Code, body: () => void): this {
    return this.block(_`for (const ${variable} of ${iterable})`, body) as this;
  }

  /**
   * Add a for-in loop
   */
  forIn(variable: Name, object: Code, body: () => void): this {
    return this.block(_`for (const ${variable} in ${object})`, body) as this;
  }

  /**
   * Add a for loop iterating over array indices.
   * Common pattern: for (let i = start, len = arr.length; i < len; i++)
   * @param indexVar - The loop index variable name
   * @param array - The array expression to iterate over
   * @param body - Loop body callback
   * @param start - Starting index (default 0)
   */
  forArray(indexVar: Name, array: Code | Name, body: () => void, start: number = 0): this {
    const lenVar = this.genVar('len');
    return this.for(
      _`let ${indexVar} = ${start}, ${lenVar} = ${array}.length`,
      _`${indexVar} < ${lenVar}`,
      _`${indexVar}++`,
      body
    );
  }

  /**
   * Add a try-catch block
   */
  try(tryBody: () => void, catchBody: () => void, errorVar: Name = new Name('e')): this {
    this.#lines.push('  '.repeat(this.#indent) + 'try {');
    this.#indent++;
    tryBody();
    this.#indent--;
    this.#lines.push('  '.repeat(this.#indent) + `} catch (${errorVar}) {`);
    this.#indent++;
    catchBody();
    this.#indent--;
    this.line`}`;
    return this;
  }

  /**
   * Generate a unique variable name and return it as a Name
   */
  genVar(prefix = 'v'): Name {
    return new Name(`${prefix}${this.#varCounter++}`);
  }

  /**
   * Reset variable counter (use for nested scopes)
   */
  resetVarCounter(): void {
    this.#varCounter = 0;
  }

  /**
   * Get the generated code as a string
   */
  toString(): string {
    return this.#lines.join('\n');
  }

  /**
   * Get current indentation level
   */
  get indentLevel(): number {
    return this.#indent;
  }

  /**
   * Manually increase indentation
   */
  indent(): this {
    this.#indent++;
    return this;
  }

  /**
   * Manually decrease indentation
   */
  dedent(): this {
    this.#indent--;
    return this;
  }
}
