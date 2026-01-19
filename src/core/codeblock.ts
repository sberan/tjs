/**
 * Functional Code Blocks
 *
 * React-like approach: functions return code blocks that compose via template literals.
 * No mutable CodeBuilder - just pure functions returning code.
 */

import { Code, Name, escapeString } from './codegen.js';

/**
 * A code block - can be a single line or multiple lines.
 * Handles indentation automatically when composed.
 */
export class CodeBlock {
  readonly lines: string[];

  private constructor(lines: string[]) {
    this.lines = lines;
  }

  static from(lines: string[]): CodeBlock {
    return new CodeBlock(lines);
  }

  static empty(): CodeBlock {
    return new CodeBlock([]);
  }

  /**
   * Render to string with given base indentation
   */
  render(indent: number = 0): string {
    const prefix = '  '.repeat(indent);
    return this.lines.map(line => line ? prefix + line : '').join('\n');
  }

  toString(): string {
    return this.render(0);
  }

  get isEmpty(): boolean {
    return this.lines.length === 0;
  }
}

/**
 * Safe value types for interpolation
 */
type BlockValue = Code | Name | CodeBlock | string | number | boolean | null | undefined;

/**
 * Interpolate a value into code
 */
function interpolate(value: BlockValue): string | string[] {
  if (value instanceof CodeBlock) {
    // Return lines array - will be handled specially
    return value.lines;
  }
  if (value instanceof Code) {
    return value.toString();
  }
  if (typeof value === 'string') {
    return `"${escapeString(value)}"`;
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) {
      throw new Error(`Expected finite number, got: ${value}`);
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
    return '';
  }
  throw new Error(`Unexpected value type: ${typeof value}`);
}

/**
 * Tagged template for creating code blocks.
 *
 * Features:
 * - Multi-line support: each line becomes a separate entry
 * - Nested CodeBlocks: indentation is preserved relative to insertion point
 * - Code/Name: inserted as-is
 * - Strings: quoted and escaped
 * - Numbers/booleans: converted to literals
 *
 * @example
 * const check = code`typeof x === "string"`;
 * const block = code`
 *   if (${check}) {
 *     ${genError(...)}
 *   }
 * `;
 */
export function code(strings: TemplateStringsArray, ...values: BlockValue[]): CodeBlock {
  // Build the full string first, tracking where blocks need to be inserted
  let result = '';
  const blockInsertions: Array<{ index: number; lines: string[]; indent: number }> = [];

  for (let i = 0; i < strings.length; i++) {
    result += strings[i];

    if (i < values.length) {
      const interpolated = interpolate(values[i]);

      if (Array.isArray(interpolated)) {
        // It's a CodeBlock - need to handle multi-line insertion
        // Calculate the indentation at this insertion point
        const lastNewline = result.lastIndexOf('\n');
        const lineStart = lastNewline === -1 ? 0 : lastNewline + 1;
        const currentLine = result.slice(lineStart);
        const indent = currentLine.length - currentLine.trimStart().length;

        // Mark insertion point
        const marker = `__BLOCK_${blockInsertions.length}__`;
        blockInsertions.push({ index: blockInsertions.length, lines: interpolated, indent });
        result += marker;
      } else {
        result += interpolated;
      }
    }
  }

  // Split into lines
  let lines = result.split('\n');

  // Process block insertions (in reverse order to maintain indices)
  for (const insertion of blockInsertions.reverse()) {
    const marker = `__BLOCK_${insertion.index}__`;

    lines = lines.flatMap(line => {
      const markerIndex = line.indexOf(marker);
      if (markerIndex === -1) return [line];

      // Calculate the indentation at the marker position
      const beforeMarker = line.slice(0, markerIndex);
      const afterMarker = line.slice(markerIndex + marker.length);

      if (insertion.lines.length === 0) {
        // Empty block - just remove the marker
        const combined = beforeMarker + afterMarker;
        return combined.trim() ? [combined] : [];
      }

      if (insertion.lines.length === 1) {
        // Single line - inline it
        return [beforeMarker + insertion.lines[0] + afterMarker];
      }

      // Multi-line block - indent each line to match the marker's position
      // The marker position IS the indentation we want
      const indentStr = beforeMarker;
      const result: string[] = [];

      for (let idx = 0; idx < insertion.lines.length; idx++) {
        const blockLine = insertion.lines[idx];
        if (idx === 0) {
          // First line: put at marker position
          result.push(beforeMarker + blockLine);
        } else {
          // Subsequent lines: use same indentation
          result.push(indentStr + blockLine);
        }
      }

      // Append after-marker content to last line if non-empty
      if (afterMarker.trim()) {
        result[result.length - 1] += afterMarker;
      }

      return result;
    });
  }

  // Trim leading/trailing empty lines and normalize indentation
  lines = trimEmptyLines(lines);
  lines = dedent(lines);

  return CodeBlock.from(lines);
}

/**
 * Trim leading and trailing empty lines
 */
function trimEmptyLines(lines: string[]): string[] {
  let start = 0;
  let end = lines.length;

  while (start < end && !lines[start].trim()) start++;
  while (end > start && !lines[end - 1].trim()) end--;

  return lines.slice(start, end);
}

/**
 * Remove common leading whitespace from all lines
 */
function dedent(lines: string[]): string[] {
  if (lines.length === 0) return lines;

  // Find minimum indentation (ignoring empty lines)
  let minIndent = Infinity;
  for (const line of lines) {
    if (!line.trim()) continue;
    const indent = line.length - line.trimStart().length;
    minIndent = Math.min(minIndent, indent);
  }

  if (minIndent === 0 || minIndent === Infinity) return lines;

  // Remove the common indentation
  return lines.map(line => line.slice(minIndent));
}

// Re-export for convenience
export { Code, Name } from './codegen.js';
