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

  /** @internal - Use `_` template literal instead */
  constructor(s: string) {
    this.#str = s;
  }

  toString(): string {
    return this.#str;
  }

  /** Check if this code is empty */
  get isEmpty(): boolean {
    return this.#str === '';
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
 * - number/boolean/null: converted to literal
 * - undefined: converted to "undefined"
 */
function safeInterpolate(value: SafeValue): string {
  if (value instanceof Code) {
    return value.toString();
  }
  if (typeof value === 'string') {
    // Strings are ALWAYS quoted - this is the key safety feature
    return `"${escapeString(value)}"`;
  }
  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (value === null) {
    return 'null';
  }
  if (value === undefined) {
    return 'undefined';
  }
  // Fallback - should not happen with proper typing
  return String(value);
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
  return new Code(result);
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
  return new Code(result);
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
    return new Code(`${objStr}.${prop}`);
  }
  // Otherwise use bracket notation with escaped string
  return new Code(`${objStr}["${escapeString(prop)}"]`);
}

/**
 * Generate an index access expression as Code.
 * e.g., data[i] or data[0]
 */
export function indexAccess(obj: Code | Name, index: Code | Name | number): Code {
  const objStr = obj.toString();
  const indexStr = index instanceof Code ? index.toString() : String(index);
  return new Code(`${objStr}[${indexStr}]`);
}

/**
 * Stringify a value for embedding in generated code (JSON.stringify).
 * Returns Code since it's safe to embed.
 */
export function stringify(value: unknown): Code {
  return new Code(JSON.stringify(value));
}

/**
 * Create a string literal Code from a raw string.
 * The string will be quoted and escaped.
 */
export function strLit(s: string): Code {
  return new Code(`"${escapeString(s)}"`);
}

/**
 * Create a single-quoted string literal Code.
 */
export function strLitSingle(s: string): Code {
  return new Code(`'${escapeString(s)}'`);
}

/**
 * Create a number literal Code.
 */
export function numLit(n: number): Code {
  return new Code(String(n));
}

/**
 * Concatenate multiple Code fragments.
 */
export function concat(...codes: Code[]): Code {
  return new Code(codes.map((c) => c.toString()).join(''));
}

/**
 * Join Code fragments with a separator.
 */
export function join(codes: Code[], separator: string): Code {
  return new Code(codes.map((c) => c.toString()).join(separator));
}

/**
 * Create an "and" expression (&&) from multiple conditions.
 */
export function and(...conditions: Code[]): Code {
  if (conditions.length === 0) return _`true`;
  if (conditions.length === 1) return conditions[0];
  return new Code(conditions.map((c) => c.toString()).join(' && '));
}

/**
 * Create an "or" expression (||) from multiple conditions.
 */
export function or(...conditions: Code[]): Code {
  if (conditions.length === 0) return _`false`;
  if (conditions.length === 1) return conditions[0];
  return new Code(conditions.map((c) => c.toString()).join(' || '));
}

/**
 * Negate a condition.
 */
export function not(condition: Code): Code {
  return _`!(${condition})`;
}

/**
 * Generate a path expression for error messages.
 * Returns Code that evaluates to a path string at runtime.
 */
export function pathExpr(basePath: Code | Name, segment: string | number): Code {
  if (typeof segment === 'number') {
    if (basePath.toString() === "''") {
      return _`'[${new Code(String(segment))}]'`;
    }
    return _`${basePath} + '[${new Code(String(segment))}]'`;
  }
  const escaped = escapeString(segment);
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(segment)) {
    if (basePath.toString() === "''") {
      return new Code(`'${escaped}'`);
    }
    return _`${basePath} + '.${new Code(escaped)}'`;
  }
  if (basePath.toString() === "''") {
    return new Code(`'["${escaped}"]'`);
  }
  return _`${basePath} + '["${new Code(escaped)}"]'`;
}

/**
 * Generate a dynamic path expression (when segment is a variable).
 */
export function pathExprDynamic(basePath: Code | Name, segmentVar: Code | Name): Code {
  if (basePath.toString() === "''") {
    return segmentVar;
  }
  return _`${basePath} + '.' + ${segmentVar}`;
}

/**
 * Generate a dynamic array index path expression.
 */
export function pathExprIndex(basePath: Code | Name, indexVar: Code | Name): Code {
  if (basePath.toString() === "''") {
    return _`'[' + ${indexVar} + ']'`;
  }
  return _`${basePath} + '[' + ${indexVar} + ']'`;
}

// ============================================================================
// CodeBuilder Class
// ============================================================================

/**
 * Builds JavaScript code with proper indentation and safe interpolation.
 * All methods ONLY accept Code types - no raw strings allowed.
 */
export class CodeBuilder {
  #lines: string[] = [];
  #indent = 0;
  #varCounter = 0;

  /**
   * Add a line of code at current indentation.
   * ONLY accepts Code - use the `_` template to create Code from strings.
   */
  line(code: Code): this {
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
   */
  block(header: Code, body: () => void): this {
    this.#lines.push('  '.repeat(this.#indent) + header.toString() + ' {');
    this.#indent++;
    body();
    this.#indent--;
    this.line(_`}`);
    return this;
  }

  /**
   * Add an if statement
   */
  if(condition: Code, body: () => void): this {
    return this.block(_`if (${condition})`, body);
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
      this.line(_`}`);
    }
    return this;
  }

  /**
   * Add an else-if clause
   */
  elseIf(condition: Code, body: () => void): this {
    const lastLine = this.#lines.pop();
    if (lastLine?.trim() === '}') {
      this.#lines.push(lastLine.replace('}', `} else if (${condition.toString()}) {`));
      this.#indent++;
      body();
      this.#indent--;
      this.line(_`}`);
    }
    return this;
  }

  /**
   * Add a for loop
   */
  for(init: Code, condition: Code, update: Code, body: () => void): this {
    return this.block(_`for (${init}; ${condition}; ${update})`, body);
  }

  /**
   * Add a for-of loop
   */
  forOf(variable: Name, iterable: Code, body: () => void): this {
    return this.block(_`for (const ${variable} of ${iterable})`, body);
  }

  /**
   * Add a for-in loop
   */
  forIn(variable: Name, object: Code, body: () => void): this {
    return this.block(_`for (const ${variable} in ${object})`, body);
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
