/**
 * Format validators for JSON Schema "format" keyword.
 *
 * Provides comprehensive validation for all standard JSON Schema format types:
 * - date, time, date-time, duration
 * - email, idn-email
 * - hostname, idn-hostname
 * - ipv4, ipv6
 * - uri, uri-reference, uri-template
 * - iri, iri-reference
 * - uuid
 * - json-pointer, relative-json-pointer
 * - regex
 */

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

// Days in each month (1-indexed) - exported for inlining
export const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

// Optimized date/time regexes - simpler patterns for faster matching
// Exported for inlining in generated code
export const DATE_REGEX = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
export const TIME_REGEX = /^(\d\d):(\d\d):(\d\d)(?:\.\d+)?(z|([+-])(\d\d):(\d\d))$/i;
export const DATE_TIME_SEPARATOR = /t|\s/i;

// Fast mode regexes (like ajv) - less accurate but much faster
// These don't validate actual date validity (Feb 30 passes) or leap second rules
export const FAST_DATE_REGEX = /^\d\d\d\d-[0-1]\d-[0-3]\d$/;
export const FAST_TIME_REGEX =
  /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i;
export const FAST_DATE_TIME_REGEX =
  /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i;

function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function validateDate(s: string): boolean {
  const m = DATE_REGEX.exec(s);
  if (!m) return false;
  const year = +m[1];
  const month = +m[2];
  const day = +m[3];
  return (
    month >= 1 &&
    month <= 12 &&
    day >= 1 &&
    day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month])
  );
}

function validateTime(s: string): boolean {
  const m = TIME_REGEX.exec(s);
  if (!m) return false;
  const hr = +m[1];
  const min = +m[2];
  const sec = +m[3];
  const tzSign = m[5] === '-' ? -1 : 1;
  const tzH = +(m[6] || 0);
  const tzM = +(m[7] || 0);

  // Validate offset
  if (tzH > 23 || tzM > 59) return false;

  // Standard time validation (fast path)
  if (hr <= 23 && min <= 59 && sec < 60) return true;

  // Leap second validation (slow path)
  if (sec >= 61 || hr > 23 || min > 59) return false;

  // For leap second (sec = 60), UTC time must be 23:59
  const utcMin = min - tzM * tzSign;
  const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
  return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1);
}

function validateDateTime(s: string): boolean {
  // Split on 'T' or space (RFC 3339 allows both)
  const parts = s.split(DATE_TIME_SEPARATOR);
  return parts.length === 2 && validateDate(parts[0]) && validateTime(parts[1]);
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
  const len = s.length;
  if (len === 0 || len > 253) return false;

  // Trailing dot is NOT allowed - check with charCodeAt for performance
  const lastChar = s.charCodeAt(len - 1);
  if (lastChar === 0x002e || lastChar === 0x3002 || lastChar === 0xff0e || lastChar === 0xff61) {
    return false;
  }

  // Inline label validation to avoid split() allocation
  let labelStart = 0;
  let labelLen = 0;

  for (let i = 0; i <= len; i++) {
    const code = i < len ? s.charCodeAt(i) : 0x002e; // Treat end as separator
    const isSeparator = code === 0x002e || code === 0x3002 || code === 0xff0e || code === 0xff61;

    if (isSeparator || i === len) {
      // Process label
      if (labelLen === 0 || labelLen > 63) return false;

      const label = s.substring(labelStart, labelStart + labelLen);

      // Check if it's an A-label (Punycode) - avoid toLowerCase() allocation
      if (labelLen >= 4) {
        const c0 = label.charCodeAt(0) | 0x20; // to lowercase
        const c1 = label.charCodeAt(1) | 0x20;
        const c2 = label.charCodeAt(2);
        const c3 = label.charCodeAt(3);

        if (c0 === 0x78 && c1 === 0x6e && c2 === 0x2d && c3 === 0x2d) {
          // xn-- prefix (Punycode)
          const punycode = labelLen > 4 ? label.slice(4) : '';
          if (punycode.length === 0) return false;

          // Validate Punycode - need lowercase for decoding
          const punycodeNorm = punycode.toLowerCase();
          const decoded = decodePunycode(punycodeNorm);
          if (decoded === null) return false;

          // Validate the decoded U-label
          if (!validateIdnaLabel(decoded)) return false;
        } else {
          // Check for -- in positions 2-3 (not allowed for U-labels)
          if (c2 === 0x2d && c3 === 0x2d) return false;

          // Check that label doesn't start or end with hyphen
          if (label.charCodeAt(0) === 0x2d || label.charCodeAt(labelLen - 1) === 0x2d) {
            return false;
          }

          // Validate as U-label directly
          if (!validateIdnaLabel(label)) return false;
        }
      } else {
        // Short labels - still need basic validation
        // Check that label doesn't start or end with hyphen
        if (label.charCodeAt(0) === 0x2d || label.charCodeAt(labelLen - 1) === 0x2d) {
          return false;
        }

        // Validate as U-label directly
        if (!validateIdnaLabel(label)) return false;
      }

      labelStart = i + 1;
      labelLen = 0;
    } else {
      labelLen++;
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

/**
 * Validate internationalized email (idn-email format).
 * Supports Unicode in both local part and domain.
 * Optimized for performance with early exits and minimal allocations.
 */
function validateIdnEmail(s: string): boolean {
  const len = s.length;

  // Find @ position and check for exactly one
  let atIndex = -1;
  let hasNonAscii = false;
  for (let i = 0; i < len; i++) {
    const c = s.charCodeAt(i);
    if (c === 64) {
      // '@' char
      if (atIndex >= 0) return false; // Multiple @
      atIndex = i;
    }
    if (c > 127) hasNonAscii = true;
  }

  // Must have @ and not at start or end
  if (atIndex <= 0 || atIndex >= len - 1) return false;

  // Fast path: pure ASCII email (most common case)
  if (!hasNonAscii) return validateEmail(s);

  // Internationalized email - split and validate parts
  // Domain validation
  const domainStart = atIndex + 1;
  const firstDomainChar = s.charCodeAt(domainStart);

  // Check for IP literal domain
  if (firstDomainChar === 91 && s.charCodeAt(len - 1) === 93) {
    // IP literal - local part must be ASCII only
    // Just validate with regular email since we already know there's non-ASCII
    // and IP literals don't support IDN in local part
    return false;
  }

  // Validate domain with IDN rules (this is the expensive part)
  const domain = s.slice(domainStart);
  if (!validateIdnHostname(domain)) return false;

  // Validate local part (lightweight validation for Unicode)
  // Length check
  if (atIndex > 64) return false;

  // Check first and last char not dot
  const firstChar = s.charCodeAt(0);
  const lastLocalChar = s.charCodeAt(atIndex - 1);
  if (firstChar === 46 || lastLocalChar === 46) return false;

  // Validate local part characters
  let prevWasDot = false;
  for (let i = 0; i < atIndex; i++) {
    const c = s.charCodeAt(i);

    // Check for consecutive dots
    if (c === 46) {
      // dot
      if (prevWasDot) return false;
      prevWasDot = true;
      continue;
    }
    prevWasDot = false;

    // Allow ASCII alphanumeric and common email special chars
    if (c < 128) {
      // Fast ASCII path
      if (
        (c >= 48 && c <= 57) || // 0-9
        (c >= 65 && c <= 90) || // A-Z
        (c >= 97 && c <= 122) || // a-z
        c === 33 || // !
        c === 35 || // #
        c === 36 || // $
        c === 37 || // %
        c === 38 || // &
        c === 39 || // '
        c === 42 || // *
        c === 43 || // +
        c === 45 || // -
        c === 47 || // /
        c === 61 || // =
        c === 63 || // ?
        c === 94 || // ^
        c === 95 || // _
        c === 96 || // `
        c === 123 || // {
        c === 124 || // |
        c === 125 || // }
        c === 126 // ~
      ) {
        continue;
      }
      // Disallow other ASCII chars (control chars, space, quotes, etc.)
      return false;
    }

    // Non-ASCII Unicode char - apply basic rules
    // Disallow control chars and private use
    if (
      c < 0xa0 || // Control chars + non-breaking space boundary
      (c >= 0xd800 && c <= 0xdfff) || // Surrogates
      c === 0xfffe ||
      c === 0xffff // Non-characters
    ) {
      return false;
    }
  }

  return true;
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

// URI regex from ajv-formats (RFC 3986 compliant)
// This is a pure regex approach - much faster than using new URL()
const URI_REGEX =
  /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;

// URI-reference regex from ajv-formats (RFC 3986 compliant)
const URI_REFERENCE_REGEX =
  /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;

// NOT_URI_FRAGMENT check - URI must contain / or :
const NOT_URI_FRAGMENT = /\/|:/;

function validateUri(s: string): boolean {
  // Must contain / or : to not be just a fragment
  return NOT_URI_FRAGMENT.test(s) && URI_REGEX.test(s);
}

function validateUriReference(s: string): boolean {
  if (s === '') return true;
  return URI_REFERENCE_REGEX.test(s);
}

// IRI-reference regex - like URI-reference but allows non-ASCII
const IRI_REFERENCE_REGEX =
  /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2}|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2}|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2}|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2}|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2}|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2}|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2}|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2}|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2}|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*)?$/i;

function validateIri(s: string): boolean {
  // Early exit for empty strings
  if (!s) return false;

  let i = 0;
  const len = s.length;

  // Scheme: [a-z][a-z0-9+.-]*:
  let code = s.charCodeAt(i);
  if (code < 0x61 || code > 0x7a) return false; // First char must be a-z
  i++;

  while (i < len) {
    code = s.charCodeAt(i);
    if (code === 0x3a) {
      // Found scheme separator ':'
      i++;
      break;
    }
    // Scheme chars: a-z, 0-9, +, ., -
    if (
      !(
        (code >= 0x61 && code <= 0x7a) || // a-z
        (code >= 0x41 && code <= 0x5a) || // A-Z (case insensitive)
        (code >= 0x30 && code <= 0x39) || // 0-9
        code === 0x2b || // +
        code === 0x2e || // .
        code === 0x2d // -
      )
    ) {
      return false;
    }
    i++;
  }

  // Must have found ':' (scheme separator)
  if (i === len || s.charCodeAt(i - 1) !== 0x3a) return false;

  // Validate rest of IRI - check for disallowed characters
  // IRI allows: unreserved, reserved, percent-encoded, and Unicode chars >= U+00A0
  for (; i < len; i++) {
    code = s.charCodeAt(i);

    // Disallowed: control chars (0x00-0x1F, 0x7F), space (0x20), and: <>"{}|\^`
    if (code <= 0x20 || code === 0x7f) return false;
    if (
      code === 0x3c || // <
      code === 0x3e || // >
      code === 0x22 || // "
      code === 0x7b || // {
      code === 0x7d || // }
      code === 0x7c || // |
      code === 0x5c || // \
      code === 0x5e || // ^
      code === 0x60 // `
    ) {
      return false;
    }

    // Validate percent-encoding: %[0-9a-fA-F]{2}
    if (code === 0x25) {
      // %
      if (i + 2 >= len) return false;
      const h1 = s.charCodeAt(i + 1);
      const h2 = s.charCodeAt(i + 2);
      if (
        !(
          (h1 >= 0x30 && h1 <= 0x39) || // 0-9
          (h1 >= 0x41 && h1 <= 0x46) || // A-F
          (h1 >= 0x61 && h1 <= 0x66) // a-f
        ) ||
        !((h2 >= 0x30 && h2 <= 0x39) || (h2 >= 0x41 && h2 <= 0x46) || (h2 >= 0x61 && h2 <= 0x66))
      ) {
        return false;
      }
      i += 2; // Skip the two hex digits
    }
  }

  return true;
}

// Optimized IRI-reference validator - single-pass validation
function validateIriReference(s: string): boolean {
  if (s === '') return true;

  const len = s.length;
  let hasScheme = false;
  let hasAuthority = false;

  // Single pass: check bad chars and detect structure
  for (let i = 0; i < len; i++) {
    const code = s.charCodeAt(i);
    const ch = s[i];

    // Reject control chars, spaces (code <= 0x20 includes \x00-\x1f and space)
    if (code <= 0x20 || code === 0x7f) return false;

    // Check forbidden chars using switch
    switch (ch) {
      case '<':
      case '>':
      case '"':
      case '{':
      case '}':
      case '|':
      case '\\':
      case '^':
      case '`':
        return false;
      case '%':
        // Validate percent-encoding: must be followed by 2 hex digits
        if (i + 2 >= len) return false;
        const h1 = s.charCodeAt(i + 1);
        const h2 = s.charCodeAt(i + 2);
        // Check if h1 and h2 are hex: 0-9 (48-57), A-F (65-70), a-f (97-102)
        if (
          !((h1 >= 48 && h1 <= 57) || (h1 >= 65 && h1 <= 70) || (h1 >= 97 && h1 <= 102)) ||
          !((h2 >= 48 && h2 <= 57) || (h2 >= 65 && h2 <= 70) || (h2 >= 97 && h2 <= 102))
        ) {
          return false;
        }
        i += 2; // Skip hex digits
        break;
      case '/':
        // Detect authority: "//" at start
        if (i === 0 && len > 1 && s[1] === '/') {
          hasAuthority = true;
        }
        break;
      case ':':
        // Detect scheme: letter followed by [a-z0-9+.-]* before ':'
        if (!hasAuthority && i > 0 && i < 64) {
          // schemes are typically short
          const schemeMatch = /^[a-z][a-z0-9+.-]*$/i.test(s.substring(0, i));
          if (schemeMatch) hasScheme = true;
        }
        break;
    }
  }

  // For complex IRIs (with scheme or authority), validate with full regex
  if (hasScheme || hasAuthority) {
    return IRI_REFERENCE_REGEX.test(s);
  }

  // Simple relative reference - validated by char check above
  return true;
}

// URI-template regex from ajv-formats (RFC 6570 compliant)
const URI_TEMPLATE_REGEX =
  /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;

function validateUriTemplate(s: string): boolean {
  return URI_TEMPLATE_REGEX.test(s);
}

/**
 * Create format validators for format keyword.
 * @param fast - Use fast regex-only validation (like ajv). Less accurate but faster.
 */
export function createFormatValidators(fast = false): Record<string, (s: string) => boolean> {
  return {
    email: validateEmail,
    'idn-email': validateIdnEmail,
    uuid: (s) => FORMAT_REGEX.uuid.test(s),
    'date-time': fast ? (s) => FAST_DATE_TIME_REGEX.test(s) : validateDateTime,
    uri: validateUri,
    'uri-reference': validateUriReference,
    'uri-template': validateUriTemplate,
    iri: validateIri,
    'iri-reference': validateIriReference,
    ipv4: (s) => FORMAT_REGEX.ipv4.test(s),
    ipv6: validateIPv6,
    date: fast ? (s) => FAST_DATE_REGEX.test(s) : validateDate,
    time: fast ? (s) => FAST_TIME_REGEX.test(s) : validateTime,
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
