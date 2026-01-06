/**
 * Regex flag determination and pattern optimization utilities
 */

import { Code, Name, _, stringify } from '../../codegen.js';

/**
 * Pattern optimization result - when a regex can be replaced with faster string methods
 */
export interface PatternOptimization {
  type: 'startsWith' | 'endsWith' | 'includes' | 'equals' | 'regex';
  literal?: string; // The literal string to match (for non-regex types)
}

/**
 * Analyze a regex pattern to determine if it can be optimized with string methods.
 * This significantly improves performance for common patterns like ^prefix or suffix$.
 */
export function analyzePattern(pattern: string): PatternOptimization {
  const len = pattern.length;

  // Handle simple patterns that can be optimized

  // Pattern: ^literal$ (exact match)
  if (
    len >= 2 &&
    pattern.charCodeAt(0) === 94 /* ^ */ &&
    pattern.charCodeAt(len - 1) === 36 /* $ */
  ) {
    const middle = pattern.slice(1, -1);
    if (isPlainLiteral(middle)) {
      return { type: 'equals', literal: middle };
    }
  }

  // Pattern: ^literal (startsWith)
  if (len >= 1 && pattern.charCodeAt(0) === 94 /* ^ */) {
    const rest = pattern.slice(1);
    if (isPlainLiteral(rest)) {
      return { type: 'startsWith', literal: rest };
    }
  }

  // Pattern: literal$ (endsWith)
  if (len >= 1 && pattern.charCodeAt(len - 1) === 36 /* $ */) {
    const rest = pattern.slice(0, -1);
    // Make sure $ isn't escaped
    if (
      rest.length > 0 &&
      rest.charCodeAt(rest.length - 1) !== 92 /* \ */ &&
      isPlainLiteral(rest)
    ) {
      return { type: 'endsWith', literal: rest };
    }
  }

  // Pattern: plain literal (includes)
  if (isPlainLiteral(pattern)) {
    return { type: 'includes', literal: pattern };
  }

  return { type: 'regex' };
}

/**
 * Check if a pattern segment is a plain literal (no regex special chars)
 */
function isPlainLiteral(s: string): boolean {
  // Check for regex metacharacters that would make this not a simple literal
  // These are: . * + ? ^ $ { } [ ] ( ) | \
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (
      c === 46 /* . */ ||
      c === 42 /* * */ ||
      c === 43 /* + */ ||
      c === 63 /* ? */ ||
      c === 94 /* ^ */ ||
      c === 36 /* $ */ ||
      c === 123 /* { */ ||
      c === 125 /* } */ ||
      c === 91 /* [ */ ||
      c === 93 /* ] */ ||
      c === 40 /* ( */ ||
      c === 41 /* ) */ ||
      c === 124 /* | */ ||
      c === 92 /* \ */
    ) {
      return false;
    }
  }
  return true;
}

/**
 * Generate optimized pattern check code.
 * Returns undefined if the pattern cannot be optimized (must use regex).
 */
export function generateOptimizedPatternCheck(
  pattern: string,
  dataVar: Name | Code
): Code | undefined {
  const opt = analyzePattern(pattern);

  switch (opt.type) {
    case 'startsWith':
      // Use stringify to properly quote the literal string
      return _`${dataVar}.startsWith(${stringify(opt.literal)})`;
    case 'endsWith':
      return _`${dataVar}.endsWith(${stringify(opt.literal)})`;
    case 'includes':
      return _`${dataVar}.includes(${stringify(opt.literal)})`;
    case 'equals':
      return _`${dataVar} === ${stringify(opt.literal)}`;
    default:
      return undefined;
  }
}

/**
 * Determine the optimal regex flags for a pattern string.
 * Uses 'u' flag only when necessary for better performance.
 * Cached results improve repeated calls with same patterns.
 */
const regexFlagsCache = new Map<string, string>();

export function determineRegexFlags(pattern: string): string {
  // Check cache first
  const cached = regexFlagsCache.get(pattern);
  if (cached !== undefined) return cached;

  // The 'u' flag is required for:
  // 1. Unicode property escapes (\p{...}, \P{...})
  // 2. Unicode code point escapes (\u{...})
  // 3. Characters outside BMP (code points > 0xFFFF, i.e., surrogate pairs)

  // Optimized: Single pass check for all unicode requirements
  // Check for \p{ or \P{ (unicode property escapes)
  let needsUnicode = false;
  let i = 0;
  const len = pattern.length;

  while (i < len) {
    const ch = pattern.charCodeAt(i);

    // Check for surrogate pairs (high unicode)
    if (ch >= 0xd800 && ch <= 0xdfff) {
      needsUnicode = true;
      break;
    }

    // Check for backslash escapes
    if (ch === 92 /* \ */) {
      if (i + 1 < len) {
        const next = pattern.charCodeAt(i + 1);
        // Check for \p{ or \P{ (unicode property escapes)
        if (
          (next === 112 /* p */ || next === 80) /* P */ &&
          i + 2 < len &&
          pattern.charCodeAt(i + 2) === 123 /* { */
        ) {
          needsUnicode = true;
          break;
        }
        // Check for \u{ (unicode code point escapes)
        if (next === 117 /* u */ && i + 2 < len && pattern.charCodeAt(i + 2) === 123 /* { */) {
          needsUnicode = true;
          break;
        }
        i++; // Skip next char as it's escaped
      }
    }
    i++;
  }

  const flags = needsUnicode ? 'u' : '';
  regexFlagsCache.set(pattern, flags);
  return flags;
}
