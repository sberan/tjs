// Code template tag - handles multiline code with JSX interpolation
import { type CodeNode, RenderContext, renderNode } from './runtime.js';

export type CodeChunk = string | CodeChunk[] | false | null | undefined;

// The _ template tag for code generation
export function _(strings: TemplateStringsArray, ...values: unknown[]): string {
  let result = '';

  for (let i = 0; i < strings.length; i++) {
    result += strings[i];

    if (i < values.length) {
      const value = values[i];
      result += interpolate(value);
    }
  }

  return result;
}

function interpolate(value: unknown): string {
  if (value === false || value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value.map(interpolate).join('');
  }

  // It's likely a rendered CodeNode (already a string from JSX)
  return String(value);
}

// Helper to conditionally include code
export function when(condition: boolean | undefined, code: string): string {
  return condition ? code : '';
}

// Helper to stringify values safely for code
export function str(value: unknown): string {
  return JSON.stringify(value);
}

// Helper for property access that handles special characters
export function prop(obj: string, key: string): string {
  // Use bracket notation for keys that aren't valid identifiers
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key)) {
    return `${obj}.${key}`;
  }
  return `${obj}[${JSON.stringify(key)}]`;
}
