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
  readonly name: string;

  constructor(name: string) {
    super(name);
    this.name = name;
  }

  toString(): string {
    return this.name;
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
 * Generate a property access expression.
 * Handles both dot notation (data.foo) and bracket notation (data["foo-bar"])
 * Returns string for backwards compatibility with existing code.
 */
export function propAccess(obj: Code | Name | string, prop: string): string {
  const objStr = obj instanceof Code ? obj.toString() : obj;
  // Use dot notation if property is a valid identifier
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(prop)) {
    return `${objStr}.${prop}`;
  }
  // Otherwise use bracket notation with escaped string
  return `${objStr}["${escapeString(prop)}"]`;
}

/**
 * Stringify a value for embedding in generated code (JSON.stringify).
 * Returns a string since JSON.stringify output is always safe.
 */
export function stringify(value: unknown): string {
  return JSON.stringify(value);
}

/**
 * Create raw code from a trusted string.
 * WARNING: Only use for compile-time constants, never for user input!
 */
export function rawCode(s: string): Code {
  return new Code(s);
}

// ============================================================================
// CodeBuilder Class
// ============================================================================

/**
 * Builds JavaScript code with proper indentation and safe interpolation.
 */
export class CodeBuilder {
  #lines: string[] = [];
  #indent = 0;
  #varCounter = 0;

  /**
   * Add a line of code at current indentation.
   * Accepts Code for safety, or string for backwards compatibility.
   */
  line(code: Code | string): this {
    const codeStr = code instanceof Code ? code.toString() : code;
    this.#lines.push('  '.repeat(this.#indent) + codeStr);
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
  block(header: Code | string, body: () => void): this {
    const headerStr = header instanceof Code ? header.toString() : header;
    this.line(headerStr + ' {');
    this.#indent++;
    body();
    this.#indent--;
    this.line('}');
    return this;
  }

  /**
   * Add an if statement
   */
  if(condition: Code | string, body: () => void): this {
    const condStr = condition instanceof Code ? condition.toString() : condition;
    return this.block(`if (${condStr})`, body);
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
      this.line('}');
    }
    return this;
  }

  /**
   * Add an else-if clause
   */
  elseIf(condition: Code | string, body: () => void): this {
    const condStr = condition instanceof Code ? condition.toString() : condition;
    const lastLine = this.#lines.pop();
    if (lastLine?.trim() === '}') {
      this.#lines.push(lastLine.replace('}', `} else if (${condStr}) {`));
      this.#indent++;
      body();
      this.#indent--;
      this.line('}');
    }
    return this;
  }

  /**
   * Add a for loop
   */
  for(
    init: Code | string,
    condition: Code | string,
    update: Code | string,
    body: () => void
  ): this {
    const initStr = init instanceof Code ? init.toString() : init;
    const condStr = condition instanceof Code ? condition.toString() : condition;
    const updateStr = update instanceof Code ? update.toString() : update;
    return this.block(`for (${initStr}; ${condStr}; ${updateStr})`, body);
  }

  /**
   * Add a for-of loop
   */
  forOf(variable: Name | string, iterable: Code | string, body: () => void): this {
    const varStr = variable instanceof Name ? variable.name : variable;
    const iterStr = iterable instanceof Code ? iterable.toString() : iterable;
    return this.block(`for (const ${varStr} of ${iterStr})`, body);
  }

  /**
   * Add a for-in loop
   */
  forIn(variable: Name | string, object: Code | string, body: () => void): this {
    const varStr = variable instanceof Name ? variable.name : variable;
    const objStr = object instanceof Code ? object.toString() : object;
    return this.block(`for (const ${varStr} in ${objStr})`, body);
  }

  /**
   * Generate a unique variable name and return it as a Name
   */
  genVar(prefix = 'v'): string {
    return `${prefix}${this.#varCounter++}`;
  }

  /**
   * Generate a unique variable Name
   */
  genName(prefix = 'v'): Name {
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

// ============================================================================
// Legacy exports for backwards compatibility
// ============================================================================

/**
 * Generate a path string for error messages
 * @deprecated Use the new safe code generation patterns instead
 */
export function pathExpr(basePath: string, segment: string | number): string {
  if (typeof segment === 'number') {
    return basePath ? `${basePath} + '[${segment}]'` : `'[${segment}]'`;
  }
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(segment)) {
    return basePath ? `${basePath} + '.${segment}'` : `'${segment}'`;
  }
  return basePath
    ? `${basePath} + '["${escapeString(segment)}"]'`
    : `'["${escapeString(segment)}"]'`;
}
