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

const formatValidators = {
  email: (s) => /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(s),
  uuid: (s) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s),
  ipv4: (s) => /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/.test(s),
  ipv6: (s) => {
    if (s.length < 2 || s.length > 45) return false;
    const parts = s.split(':');
    if (parts.length < 3 || parts.length > 8) return false;
    return true; // Simplified
  },
  date: (s) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (!m) return false;
    const y = +m[1], mo = +m[2], d = +m[3];
    const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
    return mo >= 1 && mo <= 12 && d >= 1 && d <= (mo === 2 && isLeap ? 29 : DAYS[mo]);
  },
  time: (s) => /^([0-2]\d):([0-5]\d):([0-5]\d|60)(\.\d+)?(z|[+-]([0-2]\d):([0-5]\d))$/i.test(s),
  'date-time': (s) => {
    const idx = s.indexOf('T');
    if (idx < 0 && s.indexOf('t') < 0 && s.indexOf(' ') < 0) return false;
    return formatValidators.date(s.slice(0, 10)) && formatValidators.time(s.slice(11));
  },
  hostname: (s) => {
    if (!s || s.length > 253) return false;
    const parts = s.split('.');
    for (const p of parts) {
      if (!p || p.length > 63 || !/^[a-z0-9]([a-z0-9-]*[a-z0-9])?$/i.test(p)) return false;
    }
    return true;
  },
  uri: (s) => {
    try { new URL(s); return /^[a-z][a-z0-9+.-]*:/i.test(s); } catch { return false; }
  },
  'uri-reference': (s) => {
    if (!s) return true;
    try { new URL(s, 'http://x'); return true; } catch { return false; }
  },
  'json-pointer': (s) => s === '' || /^(\/([^~/]|~0|~1)*)*$/.test(s),
  regex: (s) => { try { new RegExp(s, 'u'); return true; } catch { return false; } }
};

// Main validation function
function validate0(data, errors) {
  if (!(data && typeof data === 'object' && !Array.isArray(data))) {
    validate0.errors = [{ instancePath: '', schemaPath: "#/type", keyword: "type", params: {"type":"object"}, message: "must be object" }];
    return false;
  }
  let missing0;
  if ((!("id" in data) && (missing0 = "id")) || (!("name" in data) && (missing0 = "name")) || (!("email" in data) && (missing0 = "email"))) {
    validate0.errors = [{ instancePath: `/${missing0}`, schemaPath: '#/required', keyword: 'required', params: { missingProperty: missing0 }, message: "must have required property '" + missing0 + "'" }];
    return false;
  }
  const prop1 = data.id;
  if (prop1 !== undefined) {
    if (!(Number.isInteger(prop1))) {
      validate0.errors = [{ instancePath: '/id', schemaPath: "#/type", keyword: "type", params: {"type":"integer"}, message: "must be integer" }];
      return false;
    }
  }
  const prop2 = data.name;
  if (prop2 !== undefined) {
    if (!(typeof prop2 === 'string')) {
      validate0.errors = [{ instancePath: '/name', schemaPath: "#/type", keyword: "type", params: {"type":"string"}, message: "must be string" }];
      return false;
    }
    const len3 = ucs2length(prop2);
    if (len3 < 1) {
      validate0.errors = [{ instancePath: '/name', schemaPath: "#/minLength", keyword: "minLength", params: {"limit":1}, message: "must NOT have fewer than 1 characters" }];
      return false;
    }
  }
  const prop4 = data.email;
  if (prop4 !== undefined) {
    if (!(typeof prop4 === 'string')) {
      validate0.errors = [{ instancePath: '/email', schemaPath: "#/type", keyword: "type", params: {"type":"string"}, message: "must be string" }];
      return false;
    }
  }
  const prop5 = data.age;
  if (prop5 !== undefined) {
    if (!(Number.isInteger(prop5))) {
      validate0.errors = [{ instancePath: '/age', schemaPath: "#/type", keyword: "type", params: {"type":"integer"}, message: "must be integer" }];
      return false;
    }
    if (prop5 < 0) {
      validate0.errors = [{ instancePath: '/age', schemaPath: "#/minimum", keyword: "minimum", params: {"comparison":">=","limit":0}, message: "must be >= 0" }];
      return false;
    }
    if (prop5 > 150) {
      validate0.errors = [{ instancePath: '/age', schemaPath: "#/maximum", keyword: "maximum", params: {"comparison":"<=","limit":150}, message: "must be <= 150" }];
      return false;
    }
  }
  const prop6 = data.active;
  if (prop6 !== undefined) {
    if (!(typeof prop6 === 'boolean')) {
      validate0.errors = [{ instancePath: '/active', schemaPath: "#/type", keyword: "type", params: {"type":"boolean"}, message: "must be boolean" }];
      return false;
    }
  }
  const prop7 = data.role;
  if (prop7 !== undefined) {
    if (!(typeof prop7 === 'string')) {
      validate0.errors = [{ instancePath: '/role', schemaPath: "#/type", keyword: "type", params: {"type":"string"}, message: "must be string" }];
      return false;
    }
    if (!(prop7 === "admin" || prop7 === "user" || prop7 === "guest")) {
      validate0.errors = [{ instancePath: '/role', schemaPath: "#/enum", keyword: "enum", params: {"allowedValues":["admin","user","guest"]}, message: "must be equal to one of the allowed values" }];
      return false;
    }
  }
  for (const key in data) {
    if (!propsSet1.has(key)) {
      validate0.errors = [{ instancePath: `/${key}`, schemaPath: "#/additionalProperties", keyword: "additionalProperties", params: {}, message: "must NOT have additional properties" }];
      return false;
    }
  }
  validate0.errors = null;
  return true;
}

// Validator wrapper with .validate() and .assert() methods
const userValidator = Object.assign(
  function(data) {
    userValidator.errors = null;
    const errors = [];
    const valid = validate0(data, errors);
    if (!valid) {
      userValidator.errors = errors;
    }
    return valid;
  },
  {
    errors: null,
    validate(data) {
      const valid = userValidator(data);
      if (valid) {
        return { value: data, error: undefined };
      }
      return { value: undefined, error: userValidator.errors };
    },
    assert(data) {
      if (!userValidator(data)) {
        const error = new Error(userValidator.errors?.[0]?.message || 'Validation failed');
        error.errors = userValidator.errors;
        throw error;
      }
      return data;
    }
  }
);

export { userValidator };
export default userValidator;