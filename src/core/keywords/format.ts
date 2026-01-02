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
  // For positive offset (+), we subtract to get UTC; for negative (-), we add
  const tzSign = m[5] === '-' ? 1 : -1;
  const tzH = +(m[6] || 0);
  const tzM = +(m[7] || 0);

  // Validate offset bounds
  if (tzH > 23 || tzM > 59) return false;

  // Standard time validation (fast path)
  if (hr <= 23 && min <= 59 && sec < 60) return true;

  // Leap second validation (slow path)
  if (sec >= 61 || hr > 23 || min > 59) return false;

  // For leap second (sec = 60), UTC time must be 23:59
  // UTC = local time + offset (where offset is negative for + and positive for -)
  let utcMin = min + tzM * tzSign;
  let utcHr = hr + tzH * tzSign;

  // Handle minute overflow/underflow
  if (utcMin >= 60) {
    utcMin -= 60;
    utcHr += 1;
  } else if (utcMin < 0) {
    utcMin += 60;
    utcHr -= 1;
  }

  // Handle hour overflow/underflow (wrap around 24-hour day)
  if (utcHr >= 24) {
    utcHr -= 24;
  } else if (utcHr < 0) {
    utcHr += 24;
  }

  return utcHr === 23 && utcMin === 59;
}

/**
 * Ultra-fast date-time validator using character code parsing.
 * Avoids regex and string splitting for 10x performance improvement.
 *
 * RFC 3339 format: YYYY-MM-DDTHH:MM:SS[.frac](Z|+HH:MM|-HH:MM)
 * Also allows space separator per RFC 3339 section 5.6 note 2.
 */
function validateDateTime(s: string): boolean {
  const len = s.length;
  // Minimum: 2024-01-01T00:00:00Z = 20 chars
  if (len < 20) return false;

  // Parse date portion: YYYY-MM-DD (indices 0-9)
  // Check separators first (most likely to fail on invalid input)
  if (s.charCodeAt(4) !== 45 || s.charCodeAt(7) !== 45) return false; // '-' = 45

  // Check T or space separator at index 10
  const sep = s.charCodeAt(10);
  if (sep !== 84 && sep !== 116 && sep !== 32) return false; // 'T' = 84, 't' = 116, ' ' = 32

  // Parse year (indices 0-3)
  const y0 = s.charCodeAt(0) - 48;
  const y1 = s.charCodeAt(1) - 48;
  const y2 = s.charCodeAt(2) - 48;
  const y3 = s.charCodeAt(3) - 48;
  if ((y0 | y1 | y2 | y3) < 0 || y0 > 9 || y1 > 9 || y2 > 9 || y3 > 9) return false;
  const year = y0 * 1000 + y1 * 100 + y2 * 10 + y3;

  // Parse month (indices 5-6)
  const m0 = s.charCodeAt(5) - 48;
  const m1 = s.charCodeAt(6) - 48;
  if ((m0 | m1) < 0 || m0 > 1 || m1 > 9) return false;
  const month = m0 * 10 + m1;
  if (month < 1 || month > 12) return false;

  // Parse day (indices 8-9)
  const d0 = s.charCodeAt(8) - 48;
  const d1 = s.charCodeAt(9) - 48;
  if ((d0 | d1) < 0 || d0 > 3 || d1 > 9) return false;
  const day = d0 * 10 + d1;

  // Validate day against month (with leap year for February)
  const maxDay =
    month === 2
      ? (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
        ? 29
        : 28
      : DAYS[month];
  if (day < 1 || day > maxDay) return false;

  // Parse time portion starting at index 11: HH:MM:SS
  // Check time separators
  if (s.charCodeAt(13) !== 58 || s.charCodeAt(16) !== 58) return false; // ':' = 58

  // Parse hours (indices 11-12)
  const h0 = s.charCodeAt(11) - 48;
  const h1 = s.charCodeAt(12) - 48;
  if ((h0 | h1) < 0 || h0 > 2 || h1 > 9) return false;
  const hr = h0 * 10 + h1;
  if (hr > 23) return false;

  // Parse minutes (indices 14-15)
  const mi0 = s.charCodeAt(14) - 48;
  const mi1 = s.charCodeAt(15) - 48;
  if ((mi0 | mi1) < 0 || mi0 > 5 || mi1 > 9) return false;
  const min = mi0 * 10 + mi1;

  // Parse seconds (indices 17-18)
  const s0 = s.charCodeAt(17) - 48;
  const s1 = s.charCodeAt(18) - 48;
  if ((s0 | s1) < 0 || s0 > 6 || s1 > 9) return false;
  const sec = s0 * 10 + s1;

  // Handle fractional seconds and timezone
  let i = 19;

  // Skip optional fractional seconds
  if (i < len && s.charCodeAt(i) === 46) {
    // '.' = 46
    i++;
    // Must have at least one digit
    if (i >= len) return false;
    const firstFrac = s.charCodeAt(i) - 48;
    if (firstFrac < 0 || firstFrac > 9) return false;
    i++;
    // Skip remaining fraction digits
    while (i < len) {
      const c = s.charCodeAt(i) - 48;
      if (c < 0 || c > 9) break;
      i++;
    }
  }

  // Must have timezone
  if (i >= len) return false;

  const tzChar = s.charCodeAt(i);
  let tzSign = 0;
  let tzH = 0;
  let tzM = 0;

  if (tzChar === 90 || tzChar === 122) {
    // 'Z' = 90, 'z' = 122
    i++;
  } else if (tzChar === 43 || tzChar === 45) {
    // '+' = 43, '-' = 45
    tzSign = tzChar === 45 ? -1 : 1;
    i++;

    // Parse timezone hours (2 digits)
    if (i + 2 > len) return false;
    const th0 = s.charCodeAt(i) - 48;
    const th1 = s.charCodeAt(i + 1) - 48;
    if ((th0 | th1) < 0 || th0 > 2 || th1 > 9) return false;
    tzH = th0 * 10 + th1;
    if (tzH > 23) return false;
    i += 2;

    // Optional colon separator
    if (i < len && s.charCodeAt(i) === 58) i++;

    // Parse timezone minutes (2 digits) - optional in some formats but we require it
    if (i + 2 > len) return false;
    const tm0 = s.charCodeAt(i) - 48;
    const tm1 = s.charCodeAt(i + 1) - 48;
    if ((tm0 | tm1) < 0 || tm0 > 5 || tm1 > 9) return false;
    tzM = tm0 * 10 + tm1;
    i += 2;
  } else {
    return false;
  }

  // Must have consumed entire string
  if (i !== len) return false;

  // Standard time validation (fast path - most common case)
  if (sec < 60) return true;

  // Leap second validation (sec = 60)
  if (sec > 60) return false;

  // For leap second, UTC time must be 23:59:60
  const utcMin = min - tzM * tzSign;
  const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
  return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1);
}

function validateDuration(s: string): boolean {
  // ISO 8601 duration: P[n]Y[n]M[n]W[n]DT[n]H[n]M[n]S
  // Must start with P
  const len = s.length;
  if (len === 0 || s.charCodeAt(0) !== 80) return false; // P = 80

  let i = 1;
  let hasComponent = false;
  let hasWeek = false;
  let hasOther = false;
  let inTime = false;
  // Track order: Y=0, M=1, W=2, D=3 for date; H=0, M=1, S=2 for time
  let lastDateOrder = -1;
  let lastTimeOrder = -1;

  while (i < len) {
    const c = s.charCodeAt(i);

    // Check for T (time separator)
    if (c === 84) {
      // T = 84
      if (inTime) return false; // Multiple T
      inTime = true;
      i++;
      // Must have at least one digit after T
      if (i >= len) return false;
      const next = s.charCodeAt(i);
      if (next < 48 || next > 57) return false; // Must be digit
      continue;
    }

    // Parse number
    if (c < 48 || c > 57) return false; // Must be digit
    i++;

    // Skip remaining digits and optional decimal point
    while (i < len) {
      const d = s.charCodeAt(i);
      if (d >= 48 && d <= 57) {
        // 0-9
        i++;
      } else if (d === 46) {
        // . = 46
        i++;
        // After decimal, must have digits
        if (i >= len) return false;
        const afterDot = s.charCodeAt(i);
        if (afterDot < 48 || afterDot > 57) return false;
        while (i < len && s.charCodeAt(i) >= 48 && s.charCodeAt(i) <= 57) i++;
        break;
      } else {
        break;
      }
    }

    // Must have designator
    if (i >= len) return false;
    const designator = s.charCodeAt(i);

    if (inTime) {
      // Time components: H, M, S (must be in order)
      let order: number;
      if (designator === 72) {
        // H=72
        order = 0;
      } else if (designator === 77) {
        // M=77
        order = 1;
      } else if (designator === 83) {
        // S=83
        order = 2;
      } else {
        return false;
      }
      // Check order
      if (order <= lastTimeOrder) return false;
      lastTimeOrder = order;
      hasComponent = true;
      hasOther = true;
      i++;
    } else {
      // Date components: Y, M, W, D (must be in order)
      let order: number;
      if (designator === 89) {
        // Y=89
        order = 0;
      } else if (designator === 77) {
        // M=77
        order = 1;
      } else if (designator === 87) {
        // W=87
        order = 2;
        hasWeek = true;
      } else if (designator === 68) {
        // D=68
        order = 3;
      } else {
        return false;
      }
      // Check order
      if (order <= lastDateOrder) return false;
      lastDateOrder = order;
      hasComponent = true;
      if (designator !== 87) hasOther = true;
      i++;
    }
  }

  // Must have at least one component
  if (!hasComponent) return false;

  // Weeks cannot be combined with other components
  if (hasWeek && hasOther) return false;

  return true;
}

/**
 * Punycode decoder for IDN validation
 * Based on RFC 3492
 */
function decodePunycode(input: string): string | null {
  const len = input.length;
  const base = 36;
  const tMin = 1;
  const tMax = 26;
  const skew = 38;
  const damp = 700;
  const initialBias = 72;
  const initialN = 128;

  // Pre-allocate output array to reduce re-allocations
  const output: number[] = new Array(len);
  let outputLen = 0;
  let i = 0;
  let n = initialN;
  let bias = initialBias;

  // Handle the basic code points
  let basic = input.lastIndexOf('-');
  if (basic < 0) basic = 0;

  for (let j = 0; j < basic; ++j) {
    const cp = input.charCodeAt(j);
    if (cp >= 0x80) return null; // Non-ASCII before delimiter
    output[outputLen++] = cp;
  }

  // Decode the extended code points
  for (let idx = basic > 0 ? basic + 1 : 0; idx < len; ) {
    const oldi = i;
    let w = 1;
    for (let k = base; ; k += base) {
      if (idx >= len) return null;
      const cp = input.charCodeAt(idx++);
      // Optimize digit conversion with fastest path first (lowercase letters most common)
      let digit: number;
      if (cp >= 0x61 && cp <= 0x7a)
        digit = cp - 0x61; // a-z
      else if (cp >= 0x41 && cp <= 0x5a)
        digit = cp - 0x41; // A-Z
      else if (cp >= 0x30 && cp <= 0x39)
        digit = cp - 22; // 0-9
      else return null;

      i += digit * w;
      const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
      if (digit < t) break;
      w *= base - t;
    }

    // Bias adaptation
    const numPoints = outputLen + 1;
    let delta = i - oldi;
    delta = oldi === 0 ? Math.floor(delta / damp) : Math.floor(delta / 2);
    delta += Math.floor(delta / numPoints);
    let k = 0;
    while (delta > 455) {
      // Pre-computed: ((base - tMin) * tMax) / 2 = 455
      delta = Math.floor(delta / 35); // Pre-computed: base - tMin = 35
      k += base;
    }
    bias = k + Math.floor((36 * delta) / (delta + skew)); // Pre-computed: base - tMin + 1 = 36

    n += Math.floor(i / numPoints);
    i %= numPoints;

    // Optimize splice: shift elements manually (faster than splice for small arrays)
    for (let j = outputLen; j > i; j--) {
      output[j] = output[j - 1];
    }
    output[i++] = n;
    outputLen++;
  }

  // Build string directly to avoid spread operator overhead
  let result = '';
  for (let j = 0; j < outputLen; j++) {
    result += String.fromCodePoint(output[j]);
  }
  return result;
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
 * Validate an IDNA2008 U-label (Unicode label after Punycode decoding)
 * Optimized with inlined checks
 */
function validateIdnaLabel(label: string): boolean {
  const len = label.length;
  if (len === 0) return false;

  // U-labels cannot have -- in positions 3-4 (RFC 5891 section 4.2.3.1)
  if (len >= 4 && label.charCodeAt(2) === 0x2d && label.charCodeAt(3) === 0x2d) {
    return false;
  }

  // Build code points array inline
  const codePoints: number[] = [];
  for (let i = 0; i < len; ) {
    const cp = label.codePointAt(i)!;
    codePoints.push(cp);
    i += cp > 0xffff ? 2 : 1;
  }

  const firstCp = codePoints[0];

  // First character cannot be a combining mark (inline check for common ranges)
  if (
    (firstCp >= 0x0300 && firstCp <= 0x036f) ||
    (firstCp >= 0x0483 && firstCp <= 0x0489) ||
    (firstCp >= 0x0591 && firstCp <= 0x05bd) ||
    firstCp === 0x05bf ||
    firstCp === 0x05c1 ||
    firstCp === 0x05c2 ||
    firstCp === 0x05c4 ||
    firstCp === 0x05c5 ||
    firstCp === 0x05c7 ||
    (firstCp >= 0x0610 && firstCp <= 0x061a) ||
    (firstCp >= 0x064b && firstCp <= 0x065f) ||
    firstCp === 0x0670 ||
    (firstCp >= 0x06d6 && firstCp <= 0x06dc) ||
    (firstCp >= 0x06df && firstCp <= 0x06e4) ||
    (firstCp >= 0x06e7 && firstCp <= 0x06e8) ||
    (firstCp >= 0x06ea && firstCp <= 0x06ed) ||
    (firstCp >= 0x0900 && firstCp <= 0x0903) ||
    (firstCp >= 0x093a && firstCp <= 0x094f) ||
    (firstCp >= 0x0951 && firstCp <= 0x0957) ||
    (firstCp >= 0x0962 && firstCp <= 0x0963) ||
    (firstCp >= 0x1ab0 && firstCp <= 0x1aff) ||
    (firstCp >= 0x1dc0 && firstCp <= 0x1dff) ||
    (firstCp >= 0x20d0 && firstCp <= 0x20ff) ||
    (firstCp >= 0x302a && firstCp <= 0x302f) ||
    (firstCp >= 0xfe20 && firstCp <= 0xfe2f)
  ) {
    return false;
  }

  // Inline disallowed char check + contextual rules
  let hasArabicIndic = false;
  let hasExtendedArabicIndic = false;
  const cpLen = codePoints.length;

  for (let i = 0; i < cpLen; i++) {
    const cp = codePoints[i];

    // Disallowed characters (inline)
    if (
      cp === 0x0640 ||
      cp === 0x07fa ||
      cp === 0x302e ||
      cp === 0x302f ||
      (cp >= 0x3031 && cp <= 0x3035) ||
      cp === 0x303b
    ) {
      return false;
    }

    // Contextual rules (inline)
    if (cp >= 0x0660 && cp <= 0x0669) hasArabicIndic = true;
    else if (cp >= 0x06f0 && cp <= 0x06f9) hasExtendedArabicIndic = true;
    // MIDDLE DOT (U+00B7)
    else if (cp === 0x00b7) {
      const before = i > 0 ? codePoints[i - 1] : 0;
      const after = i < cpLen - 1 ? codePoints[i + 1] : 0;
      if (before !== 0x006c || after !== 0x006c) return false;
    }
    // Greek KERAIA (U+0375)
    else if (cp === 0x0375) {
      const after = i < cpLen - 1 ? codePoints[i + 1] : 0;
      if (!((after >= 0x0370 && after <= 0x03ff) || (after >= 0x1f00 && after <= 0x1fff))) {
        return false;
      }
    }
    // Hebrew GERESH (U+05F3)
    else if (cp === 0x05f3) {
      const before = i > 0 ? codePoints[i - 1] : 0;
      if (!(before >= 0x0590 && before <= 0x05ff)) return false;
    }
    // Hebrew GERSHAYIM (U+05F4)
    else if (cp === 0x05f4) {
      const before = i > 0 ? codePoints[i - 1] : 0;
      if (!(before >= 0x0590 && before <= 0x05ff)) return false;
    }
    // KATAKANA MIDDLE DOT (U+30FB)
    else if (cp === 0x30fb) {
      let hasJapanese = false;
      for (let j = 0; j < cpLen; j++) {
        const other = codePoints[j];
        if (other === 0x30fb) continue;
        if (
          (other >= 0x3040 && other <= 0x309f) ||
          (other >= 0x30a0 && other <= 0x30ff) ||
          (other >= 0x31f0 && other <= 0x31ff) ||
          (other >= 0x4e00 && other <= 0x9fff) ||
          (other >= 0x3400 && other <= 0x4dbf)
        ) {
          hasJapanese = true;
          break;
        }
      }
      if (!hasJapanese) return false;
    }
    // ZERO WIDTH JOINER (U+200D)
    else if (cp === 0x200d) {
      const before = i > 0 ? codePoints[i - 1] : 0;
      if (!isVirama(before)) return false;
    }
  }

  if (hasArabicIndic && hasExtendedArabicIndic) return false;
  return true;
}

// Lookup table for hostname characters (256 entries for fast lookup)
const HOSTNAME_CHARS = new Uint8Array(256);
(() => {
  // 0-9 (48-57)
  for (let i = 48; i <= 57; i++) HOSTNAME_CHARS[i] = 1;
  // A-Z (65-90)
  for (let i = 65; i <= 90; i++) HOSTNAME_CHARS[i] = 1;
  // a-z (97-122)
  for (let i = 97; i <= 122; i++) HOSTNAME_CHARS[i] = 1;
  // - (45)
  HOSTNAME_CHARS[45] = 1;
  // . (46)
  HOSTNAME_CHARS[46] = 1;
})();

function validateHostname(s: string): boolean {
  const len = s.length;
  if (len === 0 || len > 253) return false;

  // Single-pass validation with character-by-character checking
  let labelStart = 0;
  let needsSlowPath = false;

  for (let i = 0; i <= len; i++) {
    const code = i < len ? s.charCodeAt(i) : 0x002e; // Use '.' as terminator

    // End of label (dot or end of string)
    if (code === 0x002e || i === len) {
      const labelLen = i - labelStart;

      // Empty label or too long
      if (labelLen === 0 || labelLen > 63) return false;

      const firstCode = s.charCodeAt(labelStart);
      const lastCode = s.charCodeAt(i - 1);

      // First char must be alphanumeric
      if (
        !(
          (firstCode >= 0x30 && firstCode <= 0x39) || // 0-9
          (firstCode >= 0x41 && firstCode <= 0x5a) || // A-Z
          (firstCode >= 0x61 && firstCode <= 0x7a) // a-z
        )
      ) {
        return false;
      }

      // Last char must be alphanumeric (if label length > 1)
      if (
        labelLen > 1 &&
        !(
          (lastCode >= 0x30 && lastCode <= 0x39) ||
          (lastCode >= 0x41 && lastCode <= 0x5a) ||
          (lastCode >= 0x61 && lastCode <= 0x7a)
        )
      ) {
        return false;
      }

      // Check for -- in positions 2-3
      if (labelLen >= 4) {
        const c2 = s.charCodeAt(labelStart + 2);
        const c3 = s.charCodeAt(labelStart + 3);
        if (c2 === 0x2d && c3 === 0x2d) {
          // Must be xn-- for Punycode
          const c0 = s.charCodeAt(labelStart) | 0x20; // lowercase
          const c1 = s.charCodeAt(labelStart + 1) | 0x20; // lowercase
          if (c0 !== 0x78 || c1 !== 0x6e) return false; // Not 'xn--'
          needsSlowPath = true;
        }
      }

      labelStart = i + 1;
    } else if (!HOSTNAME_CHARS[code]) {
      // Invalid character
      return false;
    }
  }

  // If we need to validate Punycode, do it now (rare case)
  if (needsSlowPath) {
    labelStart = 0;
    for (let i = 0; i <= len; i++) {
      const code = i < len ? s.charCodeAt(i) : 0x002e;

      if (code === 0x002e || i === len) {
        const labelLen = i - labelStart;

        // Check for xn-- prefix
        if (labelLen >= 4) {
          const c0 = s.charCodeAt(labelStart) | 0x20;
          const c1 = s.charCodeAt(labelStart + 1) | 0x20;
          const c2 = s.charCodeAt(labelStart + 2);
          const c3 = s.charCodeAt(labelStart + 3);

          if (c0 === 0x78 && c1 === 0x6e && c2 === 0x2d && c3 === 0x2d) {
            // Extract punycode part (skip 'xn--')
            const punycode = s.substring(labelStart + 4, i).toLowerCase();
            if (punycode.length === 0) return false;

            const decoded = decodePunycode(punycode);
            if (decoded === null) return false;

            // Validate the decoded U-label
            if (!validateIdnaLabel(decoded)) return false;
          }
        }

        labelStart = i + 1;
      }
    }
  }

  return true;
}

function validateIdnHostname(s: string): boolean {
  const len = s.length;
  if (len === 0 || len > 253) return false;

  // Fast path: early scan for non-ASCII (most common case is ASCII-only)
  // Exit immediately if we find non-ASCII to avoid wasted work
  for (let i = 0; i < len; i++) {
    if (s.charCodeAt(i) > 127) {
      // Found non-ASCII, jump to slow path
      return validateIdnHostnameSlow(s, len);
    }
  }

  // Pure ASCII path - optimized inline validation
  let labelStart = 0;
  let hasPunycode = false;

  for (let i = 0; i <= len; i++) {
    const code = i < len ? s.charCodeAt(i) : 0x2e;

    if (code === 0x2e || i === len) {
      const labelLen = i - labelStart;
      if (labelLen === 0 || labelLen > 63) return false;

      const firstCode = s.charCodeAt(labelStart);
      const lastCode = s.charCodeAt(i - 1);

      // First/last must be alphanumeric
      if (
        !(
          (firstCode >= 0x30 && firstCode <= 0x39) ||
          (firstCode >= 0x41 && firstCode <= 0x5a) ||
          (firstCode >= 0x61 && firstCode <= 0x7a)
        )
      ) {
        return false;
      }

      if (
        labelLen > 1 &&
        !(
          (lastCode >= 0x30 && lastCode <= 0x39) ||
          (lastCode >= 0x41 && lastCode <= 0x5a) ||
          (lastCode >= 0x61 && lastCode <= 0x7a)
        )
      ) {
        return false;
      }

      // Check for -- in positions 2-3
      if (labelLen >= 4) {
        const c2 = s.charCodeAt(labelStart + 2);
        const c3 = s.charCodeAt(labelStart + 3);
        if (c2 === 0x2d && c3 === 0x2d) {
          const c0 = s.charCodeAt(labelStart) | 0x20;
          const c1 = s.charCodeAt(labelStart + 1) | 0x20;
          if (c0 === 0x78 && c1 === 0x6e) {
            hasPunycode = true;
          } else {
            return false;
          }
        }
      }

      labelStart = i + 1;
    } else if (
      !(
        (code >= 0x30 && code <= 0x39) ||
        (code >= 0x41 && code <= 0x5a) ||
        (code >= 0x61 && code <= 0x7a) ||
        code === 0x2d
      )
    ) {
      return false;
    }
  }

  // If we have punycode, need to validate it
  if (hasPunycode) {
    return validateIdnHostnameSlow(s, len);
  }

  return true;
}

// Slow path for Unicode/Punycode validation - extracted to separate function
// This keeps the fast path small and optimizable
function validateIdnHostnameSlow(s: string, len: number): boolean {
  const lastChar = s.charCodeAt(len - 1);
  if (lastChar === 0x3002 || lastChar === 0xff0e || lastChar === 0xff61) return false;

  let labelStart = 0;
  for (let i = 0; i <= len; i++) {
    const code = i < len ? s.charCodeAt(i) : 0x2e;
    const isSep = code === 0x2e || code === 0x3002 || code === 0xff0e || code === 0xff61;

    if (isSep || i === len) {
      const labelLen = i - labelStart;
      if (labelLen === 0 || labelLen > 63) return false;

      const label = s.substring(labelStart, i);

      // Punycode check
      if (labelLen >= 4) {
        const c0 = label.charCodeAt(0) | 0x20;
        const c1 = label.charCodeAt(1) | 0x20;
        const c2 = label.charCodeAt(2);
        const c3 = label.charCodeAt(3);

        if (c0 === 0x78 && c1 === 0x6e && c2 === 0x2d && c3 === 0x2d) {
          const punycode = label.slice(4);
          if (!punycode) return false;
          const decoded = decodePunycode(punycode.toLowerCase());
          if (!decoded || !validateIdnaLabel(decoded)) return false;
        } else {
          if (c2 === 0x2d && c3 === 0x2d) return false;
          if (label.charCodeAt(0) === 0x2d || label.charCodeAt(labelLen - 1) === 0x2d) {
            return false;
          }
          if (!validateIdnaLabel(label)) return false;
        }
      } else {
        if (label.charCodeAt(0) === 0x2d || label.charCodeAt(labelLen - 1) === 0x2d) {
          return false;
        }
        if (!validateIdnaLabel(label)) return false;
      }

      labelStart = i + 1;
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
  const len = s.length;
  if (len === 0) return false;

  const firstChar = s.charCodeAt(0);

  // Check for quoted local part (rare, use slow path)
  if (firstChar === 34) {
    // '"'
    if (!FORMAT_REGEX.emailQuoted.test(s)) return false;
    const atIndex = s.lastIndexOf('@');
    if (atIndex < 0) return false;
    const domain = s.slice(atIndex + 1);
    if (domain.charCodeAt(0) === 91 && domain.charCodeAt(domain.length - 1) === 93) {
      return validateEmailIpLiteral(domain);
    }
    return validateHostname(domain);
  }

  // Single pass: find @ and validate local part simultaneously
  if (firstChar === 46) return false; // Can't start with '.'

  let atIndex = -1;
  let prevWasDot = false;

  for (let i = 0; i < len; i++) {
    const c = s.charCodeAt(i);

    if (c === 64) {
      // '@'
      if (atIndex >= 0) return false; // Multiple @
      if (prevWasDot) return false; // Can't end local part with '.'
      if (i === 0) return false; // Can't start with @
      if (i > 64) return false; // Local part too long
      atIndex = i;
      prevWasDot = false;
      continue;
    }

    // Before @ - validate local part
    if (atIndex < 0) {
      if (c === 46) {
        if (prevWasDot) return false; // Consecutive dots
        prevWasDot = true;
      } else {
        prevWasDot = false;
        if (!EMAIL_LOCAL_ASCII[c]) return false; // Invalid character
      }
    }
  }

  // Must have @ and domain
  if (atIndex < 1 || atIndex >= len - 1) return false;

  // Validate domain
  const domainStart = atIndex + 1;
  const domainLen = len - domainStart;
  if (domainLen > 253) return false;

  // Check for IP literal domain (rare)
  if (s.charCodeAt(domainStart) === 91 && s.charCodeAt(len - 1) === 93) {
    return validateEmailIpLiteral(s.slice(domainStart));
  }

  // Inline domain validation - single pass
  let labelStart = domainStart;
  let labelLen = 0;

  for (let i = domainStart; i <= len; i++) {
    const c = i < len ? s.charCodeAt(i) : 46; // Use '.' as terminator

    if (c === 46 || i === len) {
      // End of label
      if (labelLen === 0 || labelLen > 63) return false;

      const firstLabelChar = s.charCodeAt(labelStart);
      const lastLabelChar = s.charCodeAt(i - 1);

      // Label must start with alphanumeric
      if (
        !(
          (firstLabelChar >= 48 && firstLabelChar <= 57) || // 0-9
          (firstLabelChar >= 65 && firstLabelChar <= 90) || // A-Z
          (firstLabelChar >= 97 && firstLabelChar <= 122)
        )
      )
        // a-z
        return false;

      // Label must end with alphanumeric (if length > 1)
      if (
        labelLen > 1 &&
        !(
          (lastLabelChar >= 48 && lastLabelChar <= 57) ||
          (lastLabelChar >= 65 && lastLabelChar <= 90) ||
          (lastLabelChar >= 97 && lastLabelChar <= 122)
        )
      )
        return false;

      // Check for -- in positions 2-3 (must be xn-- for punycode)
      if (
        labelLen >= 4 &&
        s.charCodeAt(labelStart + 2) === 45 &&
        s.charCodeAt(labelStart + 3) === 45
      ) {
        const c0 = s.charCodeAt(labelStart) | 32;
        const c1 = s.charCodeAt(labelStart + 1) | 32;
        if (c0 !== 120 || c1 !== 110) return false; // Not 'xn--'
      }

      labelStart = i + 1;
      labelLen = 0;
    } else {
      // Within label - check valid character
      if (
        !(
          (c >= 48 && c <= 57) || // 0-9
          (c >= 65 && c <= 90) || // A-Z
          (c >= 97 && c <= 122) || // a-z
          c === 45
        )
      )
        // -
        return false;
      labelLen++;
    }
  }

  return true;
}

// Lookup table for valid ASCII local part characters (256 entries for fast lookup)
// 1 = valid, 0 = invalid
const EMAIL_LOCAL_ASCII = new Uint8Array(256);
// Initialize lookup table
(() => {
  // 0-9 (48-57)
  for (let i = 48; i <= 57; i++) EMAIL_LOCAL_ASCII[i] = 1;
  // A-Z (65-90)
  for (let i = 65; i <= 90; i++) EMAIL_LOCAL_ASCII[i] = 1;
  // a-z (97-122)
  for (let i = 97; i <= 122; i++) EMAIL_LOCAL_ASCII[i] = 1;
  // Special chars: ! # $ % & ' * + - / = ? ^ _ ` { | } ~
  EMAIL_LOCAL_ASCII[33] = 1; // !
  EMAIL_LOCAL_ASCII[35] = 1; // #
  EMAIL_LOCAL_ASCII[36] = 1; // $
  EMAIL_LOCAL_ASCII[37] = 1; // %
  EMAIL_LOCAL_ASCII[38] = 1; // &
  EMAIL_LOCAL_ASCII[39] = 1; // '
  EMAIL_LOCAL_ASCII[42] = 1; // *
  EMAIL_LOCAL_ASCII[43] = 1; // +
  EMAIL_LOCAL_ASCII[45] = 1; // -
  EMAIL_LOCAL_ASCII[47] = 1; // /
  EMAIL_LOCAL_ASCII[61] = 1; // =
  EMAIL_LOCAL_ASCII[63] = 1; // ?
  EMAIL_LOCAL_ASCII[94] = 1; // ^
  EMAIL_LOCAL_ASCII[95] = 1; // _
  EMAIL_LOCAL_ASCII[96] = 1; // `
  EMAIL_LOCAL_ASCII[123] = 1; // {
  EMAIL_LOCAL_ASCII[124] = 1; // |
  EMAIL_LOCAL_ASCII[125] = 1; // }
  EMAIL_LOCAL_ASCII[126] = 1; // ~
})();

/**
 * Validate internationalized email (idn-email format).
 * Supports Unicode in both local part and domain.
 * Heavily optimized for performance with lookup tables and minimal allocations.
 */
function validateIdnEmail(s: string): boolean {
  const len = s.length;
  if (len === 0) return false;

  // Single-pass scan: find @ and detect ASCII-only
  let atIndex = -1;
  let hasNonAscii = false;

  for (let i = 0; i < len; i++) {
    const c = s.charCodeAt(i);
    if (c === 64) {
      // '@'
      if (atIndex >= 0) return false; // Multiple @
      atIndex = i;
    } else if (c > 127) {
      hasNonAscii = true;
    }
  }

  // Must have exactly one @ (not at start or end)
  if (atIndex <= 0 || atIndex >= len - 1) return false;

  // Fast path: ASCII-only email
  if (!hasNonAscii) {
    // Inline fast ASCII email validation to avoid function call
    // Check local part
    if (atIndex > 64) return false;
    const firstChar = s.charCodeAt(0);
    const lastLocalChar = s.charCodeAt(atIndex - 1);
    if (firstChar === 46 || lastLocalChar === 46) return false;

    let prevWasDot = false;
    for (let i = 0; i < atIndex; i++) {
      const c = s.charCodeAt(i);
      if (c === 46) {
        if (prevWasDot) return false;
        prevWasDot = true;
      } else {
        prevWasDot = false;
        if (!EMAIL_LOCAL_ASCII[c]) return false;
      }
    }

    // Check domain - use simple regex for ASCII case
    const domainStart = atIndex + 1;
    const domain = s.slice(domainStart);

    // Check for IP literal
    if (s.charCodeAt(domainStart) === 91) {
      return validateEmailIpLiteral(domain);
    }

    // Simple hostname check for ASCII
    return validateHostname(domain);
  }

  // Slow path: internationalized email
  const domainStart = atIndex + 1;

  // Check for IP literal domain (not allowed with non-ASCII)
  if (s.charCodeAt(domainStart) === 91 && s.charCodeAt(len - 1) === 93) {
    return false;
  }

  // Validate domain with IDN rules (expensive but necessary)
  const domain = s.slice(domainStart);
  if (!validateIdnHostname(domain)) return false;

  // Validate local part
  if (atIndex > 64) return false;

  const firstChar = s.charCodeAt(0);
  const lastLocalChar = s.charCodeAt(atIndex - 1);
  if (firstChar === 46 || lastLocalChar === 46) return false;

  // Validate local part characters
  let prevWasDot = false;
  for (let i = 0; i < atIndex; i++) {
    const c = s.charCodeAt(i);

    if (c === 46) {
      if (prevWasDot) return false;
      prevWasDot = true;
      continue;
    }
    prevWasDot = false;

    // ASCII path - use lookup table
    if (c < 128) {
      if (!EMAIL_LOCAL_ASCII[c]) return false;
      continue;
    }

    // Non-ASCII: minimal validation
    // Reject control chars, surrogates, and some non-characters
    if (c < 0xa0 || (c >= 0xd800 && c <= 0xdfff) || c === 0xfffe || c === 0xffff) {
      return false;
    }
  }

  return true;
}

/**
 * Ultra-fast IPv6 validator using character code parsing.
 * Avoids regex and string splitting for maximum performance.
 *
 * Supports:
 * - Full form: 2001:0db8:85a3:0000:0000:8a2e:0370:7334
 * - Compressed: 2001:db8::8a2e:370:7334, ::1, ::
 * - IPv4-mapped: ::ffff:192.168.1.1, 2001:db8::192.168.1.1
 */
function validateIPv6(s: string): boolean {
  const len = s.length;
  if (len < 2 || len > 45) return false; // Minimum "::" (2), maximum with IPv4 suffix

  // Check for zone identifier (not allowed per JSON Schema)
  for (let j = 0; j < len; j++) {
    if (s.charCodeAt(j) === 37) return false; // '%'
  }

  let i = 0;
  let groupCount = 0;
  let doubleColonSeen = false;

  // Handle leading :: (very common case like ::1)
  if (s.charCodeAt(0) === 58) {
    // ':'
    if (len < 2 || s.charCodeAt(1) !== 58) return false; // Single leading : is invalid
    doubleColonSeen = true;
    i = 2;
    if (i === len) return true; // "::" is valid
  }

  while (i < len) {
    const c = s.charCodeAt(i);

    // Check for hex digit (0-9, a-f, A-F)
    if (
      (c >= 48 && c <= 57) || // 0-9
      (c >= 97 && c <= 102) || // a-f
      (c >= 65 && c <= 70) // A-F
    ) {
      // Parse hex group (1-4 hex digits)
      let hexDigits = 1;
      const potentialIPv4Start = i;
      let allDecimal = c >= 48 && c <= 57;
      i++;

      while (i < len && hexDigits < 5) {
        const d = s.charCodeAt(i);
        if ((d >= 48 && d <= 57) || (d >= 97 && d <= 102) || (d >= 65 && d <= 70)) {
          if (!(d >= 48 && d <= 57)) allDecimal = false;
          hexDigits++;
          i++;
        } else {
          break;
        }
      }

      if (hexDigits > 4) return false; // Too many hex digits

      // Check what follows
      if (i < len) {
        const next = s.charCodeAt(i);
        if (next === 46 && allDecimal && hexDigits <= 3) {
          // '.' - This is IPv4 suffix (first octet must be 1-3 digits)
          i = potentialIPv4Start;

          // Parse IPv4 (4 octets separated by dots)
          for (let octet = 0; octet < 4; octet++) {
            if (octet > 0) {
              if (i >= len || s.charCodeAt(i) !== 46) return false;
              i++;
            }

            // Parse decimal number (1-3 digits, value 0-255)
            if (i >= len) return false;
            const firstDigit = s.charCodeAt(i) - 48;
            if (firstDigit < 0 || firstDigit > 9) return false;
            let value = firstDigit;
            i++;

            // More digits?
            if (i < len) {
              const d2 = s.charCodeAt(i) - 48;
              if (d2 >= 0 && d2 <= 9) {
                // Leading zero check (01, 00, etc are invalid)
                if (firstDigit === 0) return false;
                value = value * 10 + d2;
                i++;

                if (i < len) {
                  const d3 = s.charCodeAt(i) - 48;
                  if (d3 >= 0 && d3 <= 9) {
                    value = value * 10 + d3;
                    i++;
                  }
                }
              }
            }

            if (value > 255) return false;
          }

          // Must have consumed entire string
          if (i !== len) return false;

          // IPv4 counts as 2 groups (replaces 2 x 16-bit groups)
          groupCount += 2;
          break;
        } else if (next === 58) {
          // ':'
          groupCount++;
          i++;

          // Check for ::
          if (i < len && s.charCodeAt(i) === 58) {
            if (doubleColonSeen) return false; // Only one :: allowed
            doubleColonSeen = true;
            i++;
            if (i === len) break; // Trailing :: is valid
          }
          continue;
        } else {
          return false; // Invalid character after hex group
        }
      } else {
        // End of string after hex group
        groupCount++;
      }
    } else {
      return false; // Invalid character
    }
  }

  // Validate group count
  // IPv6 has 8 x 16-bit groups. IPv4 suffix counts as 2 groups (32 bits).
  if (doubleColonSeen) {
    // With ::, we can have at most 7 groups total (at least one zero group implied)
    return groupCount <= 7;
  } else {
    // Without ::, must have exactly 8 groups
    return groupCount === 8;
  }
}

// URI regex from ajv-formats (RFC 3986 compliant) - no longer used, kept for reference
// const URI_REGEX = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/...$/i;
// const BARE_IPV6_PATTERN = /^[a-z][a-z0-9+.-]*:\/\/[0-9a-f]*:[0-9a-f]*:/i;

// Optimized URI validation using character-by-character parsing
// RFC 3986 compliant - faster than regex due to early exits and no backtracking

// Lookup tables for valid URI characters (256 entries for fast lookup)
const URI_SCHEME_CHARS = new Uint8Array(256);
const URI_UNRESERVED = new Uint8Array(256);
const URI_SUB_DELIMS = new Uint8Array(256);
const URI_PCHAR = new Uint8Array(256);
const URI_QUERY_FRAGMENT = new Uint8Array(256);

// Initialize lookup tables once
(() => {
  // Scheme chars: ALPHA / DIGIT / "+" / "-" / "."
  for (let i = 48; i <= 57; i++) URI_SCHEME_CHARS[i] = 1; // 0-9
  for (let i = 65; i <= 90; i++) URI_SCHEME_CHARS[i] = 1; // A-Z
  for (let i = 97; i <= 122; i++) URI_SCHEME_CHARS[i] = 1; // a-z
  URI_SCHEME_CHARS[43] = 1; // +
  URI_SCHEME_CHARS[45] = 1; // -
  URI_SCHEME_CHARS[46] = 1; // .

  // Unreserved: ALPHA / DIGIT / "-" / "." / "_" / "~"
  for (let i = 48; i <= 57; i++) URI_UNRESERVED[i] = 1;
  for (let i = 65; i <= 90; i++) URI_UNRESERVED[i] = 1;
  for (let i = 97; i <= 122; i++) URI_UNRESERVED[i] = 1;
  URI_UNRESERVED[45] = 1; // -
  URI_UNRESERVED[46] = 1; // .
  URI_UNRESERVED[95] = 1; // _
  URI_UNRESERVED[126] = 1; // ~

  // Sub-delims: "!" / "$" / "&" / "'" / "(" / ")" / "*" / "+" / "," / ";" / "="
  URI_SUB_DELIMS[33] = 1; // !
  URI_SUB_DELIMS[36] = 1; // $
  URI_SUB_DELIMS[38] = 1; // &
  URI_SUB_DELIMS[39] = 1; // '
  URI_SUB_DELIMS[40] = 1; // (
  URI_SUB_DELIMS[41] = 1; // )
  URI_SUB_DELIMS[42] = 1; // *
  URI_SUB_DELIMS[43] = 1; // +
  URI_SUB_DELIMS[44] = 1; // ,
  URI_SUB_DELIMS[59] = 1; // ;
  URI_SUB_DELIMS[61] = 1; // =

  // Pchar: unreserved / pct-encoded / sub-delims / ":" / "@"
  for (let i = 0; i < 256; i++) {
    if (URI_UNRESERVED[i] || URI_SUB_DELIMS[i]) URI_PCHAR[i] = 1;
  }
  URI_PCHAR[58] = 1; // :
  URI_PCHAR[64] = 1; // @
  URI_PCHAR[37] = 1; // % (for percent-encoding marker)

  // Query/fragment: pchar / "/" / "?"
  for (let i = 0; i < 256; i++) {
    if (URI_PCHAR[i]) URI_QUERY_FRAGMENT[i] = 1;
  }
  URI_QUERY_FRAGMENT[47] = 1; // /
  URI_QUERY_FRAGMENT[63] = 1; // ?
})();

// Fast hex digit check
function isHexDigit(c: number): boolean {
  return (c >= 48 && c <= 57) || (c >= 65 && c <= 70) || (c >= 97 && c <= 102);
}

// Validate percent-encoded sequence at position i
function isValidPctEncoded(s: string, i: number): boolean {
  return (
    i + 2 < s.length &&
    s.charCodeAt(i) === 37 &&
    isHexDigit(s.charCodeAt(i + 1)) &&
    isHexDigit(s.charCodeAt(i + 2))
  );
}

// Parse URI scheme: must start with ALPHA, followed by ALPHA / DIGIT / "+" / "-" / "."
function parseScheme(s: string): number {
  const len = s.length;
  if (len === 0) return -1;

  // First char must be alpha
  const first = s.charCodeAt(0);
  if (!((first >= 65 && first <= 90) || (first >= 97 && first <= 122))) return -1;

  // Find colon
  for (let i = 1; i < len; i++) {
    const c = s.charCodeAt(i);
    if (c === 58) return i; // Found ":"
    if (!URI_SCHEME_CHARS[c]) return -1;
  }

  return -1; // No colon found
}

// Validate authority (after "//")
// authority = [ userinfo "@" ] host [ ":" port ]
function validateAuthority(s: string, start: number, end: number): boolean {
  if (start >= end) return true; // Empty authority is valid

  let i = start;

  // Check for userinfo (before @)
  let atPos = -1;
  for (let j = i; j < end; j++) {
    if (s.charCodeAt(j) === 64) {
      atPos = j;
      break;
    }
  }

  if (atPos >= 0) {
    // Validate userinfo
    for (let j = i; j < atPos; j++) {
      const c = s.charCodeAt(j);
      if (c === 37) {
        if (!isValidPctEncoded(s, j)) return false;
        j += 2;
      } else if (!URI_UNRESERVED[c] && !URI_SUB_DELIMS[c] && c !== 58) {
        return false;
      }
    }
    i = atPos + 1;
  }

  // Parse host[:port]
  let colonPos = -1;
  let inBrackets = false;

  if (i < end && s.charCodeAt(i) === 91) {
    // IPv6 or IPvFuture literal
    const closeBracket = s.indexOf(']', i);
    if (closeBracket < 0 || closeBracket >= end) return false;

    // Simple validation: just check it's not empty and has valid chars
    const ipLiteral = s.substring(i + 1, closeBracket);
    if (ipLiteral.length === 0) return false;

    // Check for IPvFuture: "v" hex+ "." (unreserved / sub-delims / ":")+
    if (ipLiteral.charCodeAt(0) === 118 || ipLiteral.charCodeAt(0) === 86) {
      // Just do basic validation - full validation would be complex
      if (ipLiteral.indexOf('.') < 2) return false;
    }

    i = closeBracket + 1;
    inBrackets = true;
  }

  // Find port (colon after host)
  if (!inBrackets) {
    for (let j = i; j < end; j++) {
      if (s.charCodeAt(j) === 58) {
        colonPos = j;
        break;
      }
    }
  } else {
    if (i < end && s.charCodeAt(i) === 58) {
      colonPos = i;
    }
  }

  const hostEnd = colonPos >= 0 ? colonPos : end;

  // Validate host (if not IP literal)
  if (!inBrackets) {
    for (let j = i; j < hostEnd; j++) {
      const c = s.charCodeAt(j);
      if (c === 37) {
        if (!isValidPctEncoded(s, j)) return false;
        j += 2;
      } else if (!URI_UNRESERVED[c] && !URI_SUB_DELIMS[c]) {
        return false;
      }
    }
  }

  // Validate port (if present)
  if (colonPos >= 0) {
    for (let j = colonPos + 1; j < end; j++) {
      const c = s.charCodeAt(j);
      if (c < 48 || c > 57) return false; // Must be digit
    }
  }

  return true;
}

// Validate path/query/fragment chars
function validatePathChars(
  s: string,
  start: number,
  end: number,
  allowedChars: Uint8Array
): boolean {
  for (let i = start; i < end; i++) {
    const c = s.charCodeAt(i);
    if (c === 37) {
      if (!isValidPctEncoded(s, i)) return false;
      i += 2;
    } else if (!allowedChars[c]) {
      return false;
    }
  }
  return true;
}

function validateUri(s: string): boolean {
  const len = s.length;
  if (len === 0) return false;

  // Parse scheme
  const schemeEnd = parseScheme(s);
  if (schemeEnd < 0) return false;

  let i = schemeEnd + 1; // Skip ":"

  // Check for authority ("//")
  if (i + 1 < len && s.charCodeAt(i) === 47 && s.charCodeAt(i + 1) === 47) {
    i += 2; // Skip "//"

    // Find end of authority (next "/" or "?" or "#" or end)
    let authEnd = len;
    for (let j = i; j < len; j++) {
      const c = s.charCodeAt(j);
      if (c === 47 || c === 63 || c === 35) {
        authEnd = j;
        break;
      }
    }

    if (!validateAuthority(s, i, authEnd)) return false;
    i = authEnd;
  }

  // Parse path
  let pathEnd = len;
  for (let j = i; j < len; j++) {
    const c = s.charCodeAt(j);
    if (c === 63 || c === 35) {
      pathEnd = j;
      break;
    }
  }

  if (i < pathEnd) {
    if (!validatePathChars(s, i, pathEnd, URI_PCHAR)) {
      // Also allow "/" in path
      for (let j = i; j < pathEnd; j++) {
        const c = s.charCodeAt(j);
        if (c === 37) {
          if (!isValidPctEncoded(s, j)) return false;
          j += 2;
        } else if (!URI_PCHAR[c] && c !== 47) {
          return false;
        }
      }
    }
  }

  i = pathEnd;

  // Parse query (if present)
  if (i < len && s.charCodeAt(i) === 63) {
    i++; // Skip "?"
    let queryEnd = len;
    for (let j = i; j < len; j++) {
      if (s.charCodeAt(j) === 35) {
        queryEnd = j;
        break;
      }
    }

    if (!validatePathChars(s, i, queryEnd, URI_QUERY_FRAGMENT)) return false;
    i = queryEnd;
  }

  // Parse fragment (if present)
  if (i < len && s.charCodeAt(i) === 35) {
    i++; // Skip "#"
    if (!validatePathChars(s, i, len, URI_QUERY_FRAGMENT)) return false;
  }

  return true;
}

// URI-reference regex from ajv-formats (RFC 3986 compliant)
const URI_REFERENCE_REGEX =
  /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;

function validateUriReference(s: string): boolean {
  if (s === '') return true;
  return URI_REFERENCE_REGEX.test(s);
}

// IRI validation based on RFC 3987
// Uses character-by-character parsing for maximum performance
// Allows Unicode chars (>= 0x80) unlike URI

function validateIri(s: string): boolean {
  const len = s.length;
  if (len === 0) return false;

  // Parse scheme: must start with alpha, followed by alpha/digit/+/-/.
  // Scheme ends at first ':'
  const first = s.charCodeAt(0);
  if (!((first >= 65 && first <= 90) || (first >= 97 && first <= 122))) return false;

  let schemeEnd = -1;
  for (let i = 1; i < len && i < 64; i++) {
    const c = s.charCodeAt(i);
    if (c === 58) {
      // ':'
      schemeEnd = i;
      break;
    }
    // alpha / digit / "+" / "-" / "."
    if (
      !(
        (c >= 48 && c <= 57) || // 0-9
        (c >= 65 && c <= 90) || // A-Z
        (c >= 97 && c <= 122) || // a-z
        c === 43 ||
        c === 45 ||
        c === 46
      )
    ) {
      // + - .
      return false;
    }
  }

  if (schemeEnd < 1) return false;

  // Check for bare IPv6 pattern (http://2001:0db8:...) - early rejection
  // This is invalid because IPv6 in authority must be bracketed
  // Only check if we have "//" after scheme (authority component)
  if (
    schemeEnd + 3 < len &&
    s.charCodeAt(schemeEnd + 1) === 47 &&
    s.charCodeAt(schemeEnd + 2) === 47
  ) {
    // Quick check: look for pattern hex:hex: in first few chars after //
    // This catches bare IPv6 like http://2001:db8::1/path
    let i = schemeEnd + 3;
    let seenHex = false;
    let colonCount = 0;

    // Scan up to 15 chars (enough to detect IPv6 pattern)
    const limit = Math.min(len, schemeEnd + 18);
    for (; i < limit; i++) {
      const c = s.charCodeAt(i);
      if (c === 58) {
        // ':'
        if (seenHex) {
          colonCount++;
          if (colonCount >= 2) return false; // Bare IPv6: hex:hex: pattern
          seenHex = false;
        } else {
          break; // :: or : without hex - not bare IPv6
        }
      } else if ((c >= 48 && c <= 57) || (c >= 97 && c <= 102) || (c >= 65 && c <= 70)) {
        seenHex = true;
      } else {
        // Not hex or colon - stop checking
        break;
      }
    }
  }

  // Validate rest of IRI: no control chars or forbidden chars
  for (let i = schemeEnd + 1; i < len; i++) {
    const c = s.charCodeAt(i);

    // Control chars (0x00-0x1F and 0x7F)
    if (c <= 0x1f || c === 0x7f) return false;

    // Forbidden chars: space (0x20), <>"{}|\^`
    if (
      c === 0x20 || // space
      c === 0x22 || // "
      c === 0x3c || // <
      c === 0x3e || // >
      c === 0x5c || // \
      c === 0x5e || // ^
      c === 0x60 || // `
      c === 0x7b || // {
      c === 0x7c || // |
      c === 0x7d // }
    ) {
      return false;
    }

    // All other chars are allowed (including Unicode >= 0x80)
  }

  return true;
}

// Optimized IRI-reference validator using character-by-character parsing
// IRI-reference can be a relative reference, so scheme is optional
// Rejects control chars (0x00-0x20), DEL (0x7F), and forbidden: <>"{}|\^`
function validateIriReference(s: string): boolean {
  const len = s.length;
  if (len === 0) return true; // Empty string is valid IRI-reference

  // Character-by-character validation for maximum speed
  for (let i = 0; i < len; i++) {
    const c = s.charCodeAt(i);

    // Percent-encoding: check for valid %XX sequence
    if (c === 37) {
      // '%'
      if (i + 2 >= len) return false;
      const h1 = s.charCodeAt(i + 1);
      const h2 = s.charCodeAt(i + 2);
      // Check both hex digits
      if (
        !(
          (h1 >= 48 && h1 <= 57) || // 0-9
          (h1 >= 65 && h1 <= 70) || // A-F
          (h1 >= 97 && h1 <= 102)
        ) || // a-f
        !((h2 >= 48 && h2 <= 57) || (h2 >= 65 && h2 <= 70) || (h2 >= 97 && h2 <= 102))
      ) {
        return false;
      }
      i += 2; // Skip the two hex digits
      continue;
    }

    // Control chars (0x00-0x20 and 0x7F) are forbidden
    if (c <= 0x20 || c === 0x7f) return false;

    // Forbidden chars: " < > \ ^ ` { | }
    if (
      c === 0x22 || // "
      c === 0x3c || // <
      c === 0x3e || // >
      c === 0x5c || // \
      c === 0x5e || // ^
      c === 0x60 || // `
      c === 0x7b || // {
      c === 0x7c || // |
      c === 0x7d // }
    ) {
      return false;
    }

    // All other chars (including Unicode >= 0x80) are allowed
  }

  return true;
}

/**
 * Fast regex syntax validation.
 * Instead of creating a new RegExp for every validation (slow!),
 * we use a cached approach: valid regexes are cached, and we only
 * create RegExp for uncached strings.
 *
 * For the JSON Schema test suite, most test data are simple strings
 * that get validated repeatedly, so caching provides huge speedup.
 */
const REGEX_CACHE = new Map<string, boolean>();
const REGEX_CACHE_MAX = 1000;

function validateRegex(s: string): boolean {
  // Check cache first
  const cached = REGEX_CACHE.get(s);
  if (cached !== undefined) return cached;

  // Validate by attempting to create RegExp
  let valid: boolean;
  try {
    new RegExp(s, 'u');
    valid = true;
  } catch {
    valid = false;
  }

  // Cache result (with size limit to prevent memory issues)
  if (REGEX_CACHE.size < REGEX_CACHE_MAX) {
    REGEX_CACHE.set(s, valid);
  }

  return valid;
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
    regex: validateRegex,
  };
}
