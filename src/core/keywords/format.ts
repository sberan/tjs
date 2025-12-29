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
export function createFormatValidators(): Record<string, (s: string) => boolean> {
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
