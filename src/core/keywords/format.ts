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

function validateDateTime(s: string): boolean {
  // Split on 'T' or space (RFC 3339 allows both)
  const parts = s.split(DATE_TIME_SEPARATOR);
  return parts.length === 2 && validateDate(parts[0]) && validateTime(parts[1]);
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

  // Ultra-fast ASCII-only path - single pass with minimal branching
  let needsSlowPath = false;
  let labelStart = 0;

  for (let i = 0; i <= len; i++) {
    const code = i < len ? s.charCodeAt(i) : 0x002e;

    if (code === 0x002e || i === len) {
      const labelLen = i - labelStart;
      if (labelLen === 0 || labelLen > 63) return false;

      const firstCode = s.charCodeAt(labelStart);
      const lastCode = s.charCodeAt(i - 1);

      // Check first/last are alphanumeric
      if (
        !(
          (firstCode >= 0x30 && firstCode <= 0x39) ||
          (firstCode >= 0x41 && firstCode <= 0x5a) ||
          (firstCode >= 0x61 && firstCode <= 0x7a)
        )
      ) {
        needsSlowPath = true;
      } else if (
        labelLen > 1 &&
        !(
          (lastCode >= 0x30 && lastCode <= 0x39) ||
          (lastCode >= 0x41 && lastCode <= 0x5a) ||
          (lastCode >= 0x61 && lastCode <= 0x7a)
        )
      ) {
        needsSlowPath = true;
      }

      // Check for -- in positions 3-4
      if (!needsSlowPath && labelLen >= 4) {
        const c2 = s.charCodeAt(labelStart + 2);
        const c3 = s.charCodeAt(labelStart + 3);
        if (c2 === 0x2d && c3 === 0x2d) {
          const c0 = s.charCodeAt(labelStart) | 0x20;
          const c1 = s.charCodeAt(labelStart + 1) | 0x20;
          if (c0 !== 0x78 || c1 !== 0x6e) return false;
          needsSlowPath = true;
        }
      }

      labelStart = i + 1;
    } else if (code > 127) {
      // Non-ASCII - need slow path
      needsSlowPath = true;
    } else if (
      !(
        (code >= 0x30 && code <= 0x39) || // 0-9
        (code >= 0x41 && code <= 0x5a) || // A-Z
        (code >= 0x61 && code <= 0x7a) || // a-z
        code === 0x2d
      )
    ) {
      // -
      // Invalid ASCII character
      return false;
    }
  }

  // Fast path succeeded
  if (!needsSlowPath) return true;

  // Slow path: Unicode or Punycode validation
  const lastChar = s.charCodeAt(len - 1);
  if (lastChar === 0x3002 || lastChar === 0xff0e || lastChar === 0xff61) return false;

  labelStart = 0;
  for (let i = 0; i <= len; i++) {
    const code = i < len ? s.charCodeAt(i) : 0x002e;
    const isSep = code === 0x002e || code === 0x3002 || code === 0xff0e || code === 0xff61;

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
    return SIMPLE_HOSTNAME_REGEX.test(domain) && domain.indexOf('--') < 0;
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

// Detect bare IPv6 addresses (without brackets) in authority
// Pattern: scheme://host:... where host looks like IPv6 (contains multiple colons)
// e.g., http://2001:0db8:... is invalid; should be http://[2001:0db8:...]
const BARE_IPV6_PATTERN = /^[a-z][a-z0-9+.-]*:\/\/[0-9a-f]*:[0-9a-f]*:/i;

function validateUri(s: string): boolean {
  // Must contain / or : to not be just a fragment
  if (!NOT_URI_FRAGMENT.test(s)) return false;
  // Reject bare IPv6 addresses (not in brackets)
  if (BARE_IPV6_PATTERN.test(s)) return false;
  return URI_REGEX.test(s);
}

function validateUriReference(s: string): boolean {
  if (s === '') return true;
  return URI_REFERENCE_REGEX.test(s);
}

// IRI validation based on RFC 3987
// Uses the URI regex as a base but also allows Unicode chars (>= 0x80)
// For performance, we first try the strict URI regex, then fall back to Unicode check

function validateIri(s: string): boolean {
  if (!s) return false;

  // Check for bare IPv6 (not in brackets) BEFORE the URI regex
  // This catches http://2001:0db8:... which would otherwise pass the URI regex
  // because it looks like a valid authority with host:port:path
  if (BARE_IPV6_PATTERN.test(s)) return false;

  // Fast path: if it's a valid URI, it's also a valid IRI
  if (URI_REGEX.test(s)) return true;

  // Slow path: check for valid IRI with Unicode characters
  // Must have valid scheme, and no forbidden characters
  const colonIdx = s.indexOf(':');
  if (colonIdx < 1 || colonIdx > 63) return false;

  // Validate scheme (first part before colon)
  const scheme = s.slice(0, colonIdx);
  if (!/^[a-z][a-z0-9+.-]*$/i.test(scheme)) return false;

  // Validate rest: no control chars (0x00-0x1F, 0x7F) or forbidden chars
  const rest = s.slice(colonIdx + 1);
  for (let i = 0; i < rest.length; i++) {
    const c = rest.charCodeAt(i);
    // Control chars (0x00-0x1F and 0x7F)
    if (c <= 0x1f || c === 0x7f) return false;
    // Forbidden chars: space (0x20), <>"{}|\^`
    if (
      c === 0x20 ||
      c === 0x22 ||
      c === 0x3c ||
      c === 0x3e ||
      c === 0x5c ||
      c === 0x5e ||
      c === 0x60 ||
      c === 0x7b ||
      c === 0x7c ||
      c === 0x7d
    )
      return false;
  }

  return true;
}

// IRI-reference regex - optimized for performance
// Rejects control chars (0x00-0x20), DEL (0x7F), and forbidden: <>"{}|\^`
// Allows percent-encoding and Unicode chars >= 0x21 (except forbidden)
const IRI_REFERENCE_REGEX = /^(?:[^\x00-\x20\x7f"<>\\^`{|}]|%[0-9a-f]{2})*$/i;

// Optimized IRI-reference validator using regex
function validateIriReference(s: string): boolean {
  return IRI_REFERENCE_REGEX.test(s);
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
