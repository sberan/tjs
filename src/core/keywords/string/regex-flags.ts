/**
 * Regex flag determination utility
 */

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
