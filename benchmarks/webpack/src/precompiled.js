/**
 * Auto-generated validator by tjs
 * Do not edit manually - regenerate from schema
 */

// Runtime dependencies
function deepEqual(a, b) {
  if (a === b) return true;
  const aType = typeof a;
  const bType = typeof b;
  if (aType !== bType) return false;
  if (aType !== 'object' || a === null || b === null) return false;
  const aIsArray = Array.isArray(a);
  const bIsArray = Array.isArray(b);
  if (aIsArray !== bIsArray) return false;
  if (aIsArray) {
    const aArr = a;
    const bArr = b;
    const len = aArr.length;
    if (len !== bArr.length) return false;
    for (let i = 0; i < len; i++) {
      if (!deepEqual(aArr[i], bArr[i])) return false;
    }
    return true;
  }
  const aObj = a;
  const bObj = b;
  const aKeys = Object.keys(aObj);
  const len = aKeys.length;
  if (len !== Object.keys(bObj).length) return false;
  for (let i = 0; i < len; i++) {
    const key = aKeys[i];
    if (!(key in bObj) || !deepEqual(aObj[key], bObj[key])) return false;
  }
  return true;
}

function ucs2length(str) {
  const len = str.length;
  let length = 0;
  let pos = 0;
  let value;
  while (pos < len) {
    length++;
    value = str.charCodeAt(pos++);
    if (value >= 0xd800 && value <= 0xdbff && pos < len) {
      value = str.charCodeAt(pos);
      if ((value & 0xfc00) === 0xdc00) pos++;
    }
  }
  return length;
}


// Format validation constants
const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const DATE_REGEX = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
const TIME_REGEX = /^(\d\d):(\d\d):(\d\d)(?:\.\d+)?(z|([+-])(\d\d):(\d\d))$/i;
const IPV4_REGEX = /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const JSON_POINTER_REGEX = /^(?:\/(?:[^~/]|~0|~1)*)*$/;
const REL_JSON_POINTER_REGEX = /^(?:0|[1-9]\d*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/;
const DURATION_REGEX = /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/;

// Lookup tables for hostname validation
const HOSTNAME_ALNUM = new Uint8Array(256);
const HOSTNAME_CHARS = new Uint8Array(256);
(() => {
  for (let i = 48; i <= 57; i++) { HOSTNAME_CHARS[i] = 1; HOSTNAME_ALNUM[i] = 1; }
  for (let i = 65; i <= 90; i++) { HOSTNAME_CHARS[i] = 1; HOSTNAME_ALNUM[i] = 1; }
  for (let i = 97; i <= 122; i++) { HOSTNAME_CHARS[i] = 1; HOSTNAME_ALNUM[i] = 1; }
  HOSTNAME_CHARS[45] = 1; HOSTNAME_CHARS[46] = 1;
})();

// Email local part valid chars
const EMAIL_LOCAL_ASCII = new Uint8Array(256);
(() => {
  for (let i = 48; i <= 57; i++) EMAIL_LOCAL_ASCII[i] = 1;
  for (let i = 65; i <= 90; i++) EMAIL_LOCAL_ASCII[i] = 1;
  for (let i = 97; i <= 122; i++) EMAIL_LOCAL_ASCII[i] = 1;
  [33,35,36,37,38,39,42,43,45,47,61,63,94,95,96,123,124,125,126].forEach(c => EMAIL_LOCAL_ASCII[c] = 1);
})();

function isLeapYear(year) { return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0; }

function validateDate(s) {
  const m = DATE_REGEX.exec(s);
  if (!m) return false;
  const year = +m[1], month = +m[2], day = +m[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
}

function validateTime(s) {
  const m = TIME_REGEX.exec(s);
  if (!m) return false;
  const hr = +m[1], min = +m[2], sec = +m[3];
  const tzSign = m[4] === '-' ? 1 : -1;
  const tzH = +(m[5] || 0), tzM = +(m[6] || 0);
  if (tzH > 23 || tzM > 59) return false;
  if (hr <= 23 && min <= 59 && sec < 60) return true;
  if (sec >= 61 || hr > 23 || min > 59) return false;
  let utcMin = min + tzM * tzSign, utcHr = hr + tzH * tzSign;
  if (utcMin >= 60) { utcMin -= 60; utcHr += 1; } else if (utcMin < 0) { utcMin += 60; utcHr -= 1; }
  if (utcHr >= 24) utcHr -= 24; else if (utcHr < 0) utcHr += 24;
  return utcHr === 23 && utcMin === 59;
}

function validateDateTime(s) {
  const len = s.length;
  if (len < 20) return false;
  if (s.charCodeAt(4) !== 45 || s.charCodeAt(7) !== 45) return false;
  const sep = s.charCodeAt(10);
  if (sep !== 84 && sep !== 116 && sep !== 32) return false;
  const y0 = s.charCodeAt(0)-48, y1 = s.charCodeAt(1)-48, y2 = s.charCodeAt(2)-48, y3 = s.charCodeAt(3)-48;
  if ((y0|y1|y2|y3) < 0 || y0 > 9 || y1 > 9 || y2 > 9 || y3 > 9) return false;
  const year = y0*1000 + y1*100 + y2*10 + y3;
  const m0 = s.charCodeAt(5)-48, m1 = s.charCodeAt(6)-48;
  if ((m0|m1) < 0 || m0 > 1 || m1 > 9) return false;
  const month = m0*10 + m1;
  if (month < 1 || month > 12) return false;
  const d0 = s.charCodeAt(8)-48, d1 = s.charCodeAt(9)-48;
  if ((d0|d1) < 0 || d0 > 3 || d1 > 9) return false;
  const day = d0*10 + d1;
  const maxDay = month === 2 ? (isLeapYear(year) ? 29 : 28) : DAYS[month];
  if (day < 1 || day > maxDay) return false;
  if (s.charCodeAt(13) !== 58 || s.charCodeAt(16) !== 58) return false;
  const h0 = s.charCodeAt(11)-48, h1 = s.charCodeAt(12)-48;
  if ((h0|h1) < 0 || h0 > 2 || h1 > 9) return false;
  const hr = h0*10 + h1;
  if (hr > 23) return false;
  const mi0 = s.charCodeAt(14)-48, mi1 = s.charCodeAt(15)-48;
  if ((mi0|mi1) < 0 || mi0 > 5 || mi1 > 9) return false;
  const min = mi0*10 + mi1;
  const s0 = s.charCodeAt(17)-48, s1 = s.charCodeAt(18)-48;
  if ((s0|s1) < 0 || s0 > 6 || s1 > 9) return false;
  const sec = s0*10 + s1;
  let i = 19;
  if (i < len && s.charCodeAt(i) === 46) {
    i++;
    if (i >= len) return false;
    const firstFrac = s.charCodeAt(i) - 48;
    if (firstFrac < 0 || firstFrac > 9) return false;
    i++;
    while (i < len) { const c = s.charCodeAt(i) - 48; if (c < 0 || c > 9) break; i++; }
  }
  if (i >= len) return false;
  const tzChar = s.charCodeAt(i);
  let tzSign = 0, tzH = 0, tzM = 0;
  if (tzChar === 90 || tzChar === 122) { i++; }
  else if (tzChar === 43 || tzChar === 45) {
    tzSign = tzChar === 45 ? -1 : 1;
    i++;
    if (i + 2 > len) return false;
    const th0 = s.charCodeAt(i)-48, th1 = s.charCodeAt(i+1)-48;
    if ((th0|th1) < 0 || th0 > 2 || th1 > 9) return false;
    tzH = th0*10 + th1;
    if (tzH > 23) return false;
    i += 2;
    if (i < len && s.charCodeAt(i) === 58) i++;
    if (i + 2 > len) return false;
    const tm0 = s.charCodeAt(i)-48, tm1 = s.charCodeAt(i+1)-48;
    if ((tm0|tm1) < 0 || tm0 > 5 || tm1 > 9) return false;
    tzM = tm0*10 + tm1;
    i += 2;
  } else return false;
  if (i !== len) return false;
  if (sec < 60) return true;
  if (sec > 60) return false;
  const utcMin = min - tzM * tzSign;
  const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
  return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1);
}

function validateDuration(s) {
  const len = s.length;
  if (len === 0 || s.charCodeAt(0) !== 80) return false;
  let i = 1, hasComponent = false, hasWeek = false, hasOther = false, inTime = false;
  let lastDateOrder = -1, lastTimeOrder = -1;
  while (i < len) {
    const c = s.charCodeAt(i);
    if (c === 84) {
      if (inTime) return false;
      inTime = true; i++;
      if (i >= len) return false;
      const next = s.charCodeAt(i);
      if (next < 48 || next > 57) return false;
      continue;
    }
    if (c < 48 || c > 57) return false;
    i++;
    while (i < len) {
      const d = s.charCodeAt(i);
      if (d >= 48 && d <= 57) { i++; }
      else if (d === 46) {
        i++;
        if (i >= len) return false;
        const afterDot = s.charCodeAt(i);
        if (afterDot < 48 || afterDot > 57) return false;
        while (i < len && s.charCodeAt(i) >= 48 && s.charCodeAt(i) <= 57) i++;
        break;
      } else break;
    }
    if (i >= len) return false;
    const designator = s.charCodeAt(i);
    if (inTime) {
      let order;
      if (designator === 72) order = 0;
      else if (designator === 77) order = 1;
      else if (designator === 83) order = 2;
      else return false;
      if (order <= lastTimeOrder) return false;
      lastTimeOrder = order;
      hasComponent = true; hasOther = true; i++;
    } else {
      let order;
      if (designator === 89) order = 0;
      else if (designator === 77) order = 1;
      else if (designator === 87) { order = 2; hasWeek = true; }
      else if (designator === 68) order = 3;
      else return false;
      if (order <= lastDateOrder) return false;
      lastDateOrder = order;
      hasComponent = true;
      if (designator !== 87) hasOther = true;
      i++;
    }
  }
  if (!hasComponent) return false;
  if (hasWeek && hasOther) return false;
  return true;
}

function validateHostname(s) {
  const len = s.length;
  if (len === 0 || len > 253) return false;
  let labelStart = 0;
  for (let i = 0; i <= len; i++) {
    const code = i < len ? s.charCodeAt(i) : 0x2e;
    if (code === 0x2e || i === len) {
      const labelLen = i - labelStart;
      if (labelLen === 0 || labelLen > 63) return false;
      const firstCode = s.charCodeAt(labelStart);
      const lastCode = s.charCodeAt(i - 1);
      if (!HOSTNAME_ALNUM[firstCode]) return false;
      if (labelLen > 1 && !HOSTNAME_ALNUM[lastCode]) return false;
      if (labelLen >= 4) {
        const c2 = s.charCodeAt(labelStart + 2), c3 = s.charCodeAt(labelStart + 3);
        if (c2 === 0x2d && c3 === 0x2d) {
          const c0 = s.charCodeAt(labelStart) | 0x20, c1 = s.charCodeAt(labelStart + 1) | 0x20;
          if (c0 !== 0x78 || c1 !== 0x6e) return false;
        }
      }
      labelStart = i + 1;
    } else if (!HOSTNAME_CHARS[code]) return false;
  }
  return true;
}

function validateEmail(s) {
  const len = s.length;
  if (len === 0) return false;
  const firstChar = s.charCodeAt(0);
  if (firstChar === 34) {
    if (!/^"(?:[^"\\]|\\.)*"@/.test(s)) return false;
    const atIndex = s.lastIndexOf('@');
    if (atIndex < 0) return false;
    const domain = s.slice(atIndex + 1);
    if (domain.charCodeAt(0) === 91 && domain.charCodeAt(domain.length - 1) === 93) {
      const inner = domain.slice(1, -1);
      if (inner.toLowerCase().startsWith('ipv6:')) return validateIPv6(inner.slice(5));
      return IPV4_REGEX.test(inner);
    }
    return validateHostname(domain);
  }
  if (firstChar === 46) return false;
  let atIndex = -1, prevWasDot = false;
  for (let i = 0; i < len; i++) {
    const c = s.charCodeAt(i);
    if (c === 64) {
      if (atIndex >= 0) return false;
      if (prevWasDot) return false;
      if (i === 0) return false;
      if (i > 64) return false;
      atIndex = i;
      prevWasDot = false;
      continue;
    }
    if (atIndex < 0) {
      if (c === 46) {
        if (prevWasDot) return false;
        prevWasDot = true;
      } else {
        prevWasDot = false;
        if (!EMAIL_LOCAL_ASCII[c]) return false;
      }
    }
  }
  if (atIndex < 1 || atIndex >= len - 1) return false;
  const domainStart = atIndex + 1;
  const domainLen = len - domainStart;
  if (domainLen > 253) return false;
  if (s.charCodeAt(domainStart) === 91 && s.charCodeAt(len - 1) === 93) {
    const domain = s.slice(domainStart);
    const inner = domain.slice(1, -1);
    if (inner.toLowerCase().startsWith('ipv6:')) return validateIPv6(inner.slice(5));
    return IPV4_REGEX.test(inner);
  }
  let labelStart = domainStart, labelLen = 0;
  for (let i = domainStart; i <= len; i++) {
    const c = i < len ? s.charCodeAt(i) : 46;
    if (c === 46 || i === len) {
      if (labelLen === 0 || labelLen > 63) return false;
      const firstLabelChar = s.charCodeAt(labelStart);
      const lastLabelChar = s.charCodeAt(i - 1);
      if (!((firstLabelChar >= 48 && firstLabelChar <= 57) || (firstLabelChar >= 65 && firstLabelChar <= 90) || (firstLabelChar >= 97 && firstLabelChar <= 122))) return false;
      if (labelLen > 1 && !((lastLabelChar >= 48 && lastLabelChar <= 57) || (lastLabelChar >= 65 && lastLabelChar <= 90) || (lastLabelChar >= 97 && lastLabelChar <= 122))) return false;
      if (labelLen >= 4 && s.charCodeAt(labelStart + 2) === 45 && s.charCodeAt(labelStart + 3) === 45) {
        const c0 = s.charCodeAt(labelStart) | 32, c1 = s.charCodeAt(labelStart + 1) | 32;
        if (c0 !== 120 || c1 !== 110) return false;
      }
      labelStart = i + 1;
      labelLen = 0;
    } else {
      if (!((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 45)) return false;
      labelLen++;
    }
  }
  return true;
}

function validateIPv6(s) {
  const len = s.length;
  if (len < 2 || len > 45) return false;
  for (let j = 0; j < len; j++) if (s.charCodeAt(j) === 37) return false;
  let i = 0, groupCount = 0, doubleColonSeen = false;
  if (s.charCodeAt(0) === 58) {
    if (len < 2 || s.charCodeAt(1) !== 58) return false;
    doubleColonSeen = true;
    i = 2;
    if (i === len) return true;
  }
  while (i < len) {
    const c = s.charCodeAt(i);
    if ((c >= 48 && c <= 57) || (c >= 97 && c <= 102) || (c >= 65 && c <= 70)) {
      let hexDigits = 1;
      const potentialIPv4Start = i;
      let allDecimal = c >= 48 && c <= 57;
      i++;
      while (i < len && hexDigits < 5) {
        const d = s.charCodeAt(i);
        if ((d >= 48 && d <= 57) || (d >= 97 && d <= 102) || (d >= 65 && d <= 70)) {
          if (!(d >= 48 && d <= 57)) allDecimal = false;
          hexDigits++; i++;
        } else break;
      }
      if (hexDigits > 4) return false;
      if (i < len) {
        const next = s.charCodeAt(i);
        if (next === 46 && allDecimal && hexDigits <= 3) {
          i = potentialIPv4Start;
          for (let octet = 0; octet < 4; octet++) {
            if (octet > 0) {
              if (i >= len || s.charCodeAt(i) !== 46) return false;
              i++;
            }
            if (i >= len) return false;
            const firstDigit = s.charCodeAt(i) - 48;
            if (firstDigit < 0 || firstDigit > 9) return false;
            let value = firstDigit;
            i++;
            if (i < len) {
              const d2 = s.charCodeAt(i) - 48;
              if (d2 >= 0 && d2 <= 9) {
                if (firstDigit === 0) return false;
                value = value * 10 + d2;
                i++;
                if (i < len) {
                  const d3 = s.charCodeAt(i) - 48;
                  if (d3 >= 0 && d3 <= 9) { value = value * 10 + d3; i++; }
                }
              }
            }
            if (value > 255) return false;
          }
          if (i !== len) return false;
          groupCount += 2;
          break;
        } else if (next === 58) {
          groupCount++; i++;
          if (i < len && s.charCodeAt(i) === 58) {
            if (doubleColonSeen) return false;
            doubleColonSeen = true;
            i++;
            if (i === len) break;
          }
          continue;
        } else return false;
      } else groupCount++;
    } else return false;
  }
  if (doubleColonSeen) return groupCount <= 7;
  return groupCount === 8;
}

function validateUri(s) {
  const len = s.length;
  if (len === 0) return false;
  const first = s.charCodeAt(0);
  if (!((first >= 65 && first <= 90) || (first >= 97 && first <= 122))) return false;
  let schemeEnd = -1;
  for (let i = 1; i < len; i++) {
    const c = s.charCodeAt(i);
    if (c === 58) { schemeEnd = i; break; }
    if (!((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 43 || c === 45 || c === 46)) return false;
  }
  if (schemeEnd < 1) return false;
  for (let i = schemeEnd + 1; i < len; i++) {
    const c = s.charCodeAt(i);
    if (c <= 0x1f || c === 0x7f || c === 0x20 || c === 0x22 || c === 0x3c || c === 0x3e || c === 0x5c || c === 0x5e || c === 0x60 || c === 0x7b || c === 0x7c || c === 0x7d) return false;
  }
  return true;
}

function validateUriReference(s) {
  if (s === '') return true;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c <= 0x20 || c === 0x7f || c === 0x22 || c === 0x3c || c === 0x3e || c === 0x5c || c === 0x5e || c === 0x60 || c === 0x7b || c === 0x7c || c === 0x7d) return false;
  }
  return true;
}

function validateIri(s) {
  const len = s.length;
  if (len === 0) return false;
  const first = s.charCodeAt(0);
  if (!((first >= 65 && first <= 90) || (first >= 97 && first <= 122))) return false;
  let schemeEnd = -1;
  for (let i = 1; i < len && i < 64; i++) {
    const c = s.charCodeAt(i);
    if (c === 58) { schemeEnd = i; break; }
    if (!((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c === 43 || c === 45 || c === 46)) return false;
  }
  if (schemeEnd < 1) return false;
  for (let i = schemeEnd + 1; i < len; i++) {
    const c = s.charCodeAt(i);
    if (c <= 0x1f || c === 0x7f || c === 0x20 || c === 0x22 || c === 0x3c || c === 0x3e || c === 0x5c || c === 0x5e || c === 0x60 || c === 0x7b || c === 0x7c || c === 0x7d) return false;
  }
  return true;
}

function validateIriReference(s) {
  if (s === '') return true;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    if (c === 37) {
      if (i + 2 >= s.length) return false;
      const h1 = s.charCodeAt(i + 1), h2 = s.charCodeAt(i + 2);
      if (!((h1 >= 48 && h1 <= 57) || (h1 >= 65 && h1 <= 70) || (h1 >= 97 && h1 <= 102)) ||
          !((h2 >= 48 && h2 <= 57) || (h2 >= 65 && h2 <= 70) || (h2 >= 97 && h2 <= 102))) return false;
      i += 2;
      continue;
    }
    if (c <= 0x20 || c === 0x7f || c === 0x22 || c === 0x3c || c === 0x3e || c === 0x5c || c === 0x5e || c === 0x60 || c === 0x7b || c === 0x7c || c === 0x7d) return false;
  }
  return true;
}

const formatValidators = {
  email: validateEmail,
  'idn-email': validateEmail,
  uuid: (s) => UUID_REGEX.test(s),
  'date-time': validateDateTime,
  uri: validateUri,
  'uri-reference': validateUriReference,
  'uri-template': validateUriReference,
  iri: validateIri,
  'iri-reference': validateIriReference,
  ipv4: (s) => IPV4_REGEX.test(s),
  ipv6: validateIPv6,
  date: validateDate,
  time: validateTime,
  duration: validateDuration,
  hostname: validateHostname,
  'idn-hostname': validateHostname,
  'json-pointer': (s) => s === '' || JSON_POINTER_REGEX.test(s),
  'relative-json-pointer': (s) => REL_JSON_POINTER_REGEX.test(s),
  regex: (s) => { try { new RegExp(s, 'u'); return true; } catch { return false; } }
};

// Main validation function
function validate0(data, errors) {
  if (!(data && typeof data === 'object' && !Array.isArray(data))) {
    validate0.errors = [{ instancePath: '', schemaPath: "#/type", keyword: "type", params: {"type":"object"}, message: "must be object" }];
    return false;
  }
  let missing0;
  if ((!("name" in data) && (missing0 = "name")) || (!("email" in data) && (missing0 = "email"))) {
    validate0.errors = [{ instancePath: `/${missing0}`, schemaPath: '#/required', keyword: 'required', params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
    return false;
  }
  const prop1 = data.name;
  if (prop1 !== undefined) {
    if (!(typeof prop1 === 'string')) {
      validate0.errors = [{ instancePath: '/name', schemaPath: "#/type", keyword: "type", params: {"type":"string"}, message: "must be string" }];
      return false;
    }
  }
  const prop2 = data.email;
  if (prop2 !== undefined) {
    if (!(typeof prop2 === 'string')) {
      validate0.errors = [{ instancePath: '/email', schemaPath: "#/type", keyword: "type", params: {"type":"string"}, message: "must be string" }];
      return false;
    }
    if (!fmt_email(prop2)) {
      validate0.errors = [{ instancePath: '/email', schemaPath: "#/format", keyword: "format", params: {"format":"email"}, message: "must match format \"email\"" }];
      return false;
    }
  }
  const prop3 = data.age;
  if (prop3 !== undefined) {
    if (!(Number.isInteger(prop3))) {
      validate0.errors = [{ instancePath: '/age', schemaPath: "#/type", keyword: "type", params: {"type":"integer"}, message: "must be integer" }];
      return false;
    }
    if (prop3 < 0) {
      validate0.errors = [{ instancePath: '/age', schemaPath: "#/minimum", keyword: "minimum", params: {"comparison":">=","limit":0}, message: "must be >= 0" }];
      return false;
    }
  }
  validate0.errors = null;
  return true;
}

// Validator wrapper with .validate() and .assert() methods
const validator = Object.assign(
  function(data) {
    validator.errors = null;
    const errors = [];
    const valid = validate0(data, errors);
    if (!valid) {
      validator.errors = errors;
    }
    return valid;
  },
  {
    errors: null,
    validate(data) {
      const valid = validator(data);
      if (valid) {
        return { value: data, error: undefined };
      }
      return { value: undefined, error: validator.errors };
    },
    assert(data) {
      if (!validator(data)) {
        const error = new Error(validator.errors?.[0]?.message || 'Validation failed');
        error.errors = validator.errors;
        throw error;
      }
      return data;
    }
  }
);

export { validator };
export default validator;