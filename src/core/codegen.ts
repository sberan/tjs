/**
 * Code generation utilities for schema compiler
 */

/**
 * Builds JavaScript code strings with proper indentation
 */
export class CodeBuilder {
  #lines: string[] = [];
  #indent = 0;
  #varCounter = 0;

  /**
   * Add a line of code at current indentation
   */
  line(code: string): this {
    this.#lines.push('  '.repeat(this.#indent) + code);
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
  block(header: string, body: () => void): this {
    this.line(header + ' {');
    this.#indent++;
    body();
    this.#indent--;
    this.line('}');
    return this;
  }

  /**
   * Add an if statement
   */
  if(condition: string, body: () => void): this {
    return this.block(`if (${condition})`, body);
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
  elseIf(condition: string, body: () => void): this {
    const lastLine = this.#lines.pop();
    if (lastLine?.trim() === '}') {
      this.#lines.push(lastLine.replace('}', `} else if (${condition}) {`));
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
  for(init: string, condition: string, update: string, body: () => void): this {
    return this.block(`for (${init}; ${condition}; ${update})`, body);
  }

  /**
   * Add a for-of loop
   */
  forOf(variable: string, iterable: string, body: () => void): this {
    return this.block(`for (const ${variable} of ${iterable})`, body);
  }

  /**
   * Add a for-in loop
   */
  forIn(variable: string, object: string, body: () => void): this {
    return this.block(`for (const ${variable} in ${object})`, body);
  }

  /**
   * Generate a unique variable name
   */
  genVar(prefix = 'v'): string {
    return `${prefix}${this.#varCounter++}`;
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
}

/**
 * Escape a string for use in generated JavaScript
 */
export function escapeString(s: string): string {
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

/**
 * Generate a property access expression
 * Handles both dot notation (data.foo) and bracket notation (data["foo-bar"])
 */
export function propAccess(obj: string, prop: string): string {
  // Use dot notation if property is a valid identifier
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(prop)) {
    return `${obj}.${prop}`;
  }
  // Otherwise use bracket notation
  return `${obj}['${escapeString(prop)}']`;
}

/**
 * Generate a path string for error messages
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

/**
 * Stringify a value for embedding in generated code
 */
export function stringify(value: unknown): string {
  return JSON.stringify(value);
}
