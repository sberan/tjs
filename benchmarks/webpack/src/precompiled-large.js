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
  email: (s) =>
    /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(
      s
    ),
  uuid: (s) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(s),
  ipv4: (s) =>
    /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/.test(s),
  ipv6: (s) => {
    if (s.length < 2 || s.length > 45) return false;
    const parts = s.split(':');
    if (parts.length < 3 || parts.length > 8) return false;
    return true; // Simplified
  },
  date: (s) => {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (!m) return false;
    const y = +m[1],
      mo = +m[2],
      d = +m[3];
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
    try {
      new URL(s);
      return /^[a-z][a-z0-9+.-]*:/i.test(s);
    } catch {
      return false;
    }
  },
  'uri-reference': (s) => {
    if (!s) return true;
    try {
      new URL(s, 'http://x');
      return true;
    } catch {
      return false;
    }
  },
  'json-pointer': (s) => s === '' || /^(\/([^~/]|~0|~1)*)*$/.test(s),
  regex: (s) => {
    try {
      new RegExp(s, 'u');
      return true;
    } catch {
      return false;
    }
  },
};

// Main validation function
function validate0(data, errors) {
  if (!(data && typeof data === 'object' && !Array.isArray(data))) {
    validate0.errors = [
      {
        instancePath: '',
        schemaPath: '#/type',
        keyword: 'type',
        params: { type: 'object' },
        message: 'must be object',
      },
    ];
    return false;
  }
  let missing0;
  if (
    (!('id' in data) && (missing0 = 'id')) ||
    (!('orderNumber' in data) && (missing0 = 'orderNumber')) ||
    (!('type' in data) && (missing0 = 'type')) ||
    (!('status' in data) && (missing0 = 'status')) ||
    (!('customer' in data) && (missing0 = 'customer')) ||
    (!('billingAddress' in data) && (missing0 = 'billingAddress')) ||
    (!('shippingAddress' in data) && (missing0 = 'shippingAddress')) ||
    (!('items' in data) && (missing0 = 'items')) ||
    (!('subtotal' in data) && (missing0 = 'subtotal')) ||
    (!('total' in data) && (missing0 = 'total')) ||
    (!('audit' in data) && (missing0 = 'audit'))
  ) {
    validate0.errors = [
      {
        instancePath: `/${missing0}`,
        schemaPath: '#/required',
        keyword: 'required',
        params: { missingProperty: missing0 },
        message: "must have required property '" + missing0 + "'",
      },
    ];
    return false;
  }
  const prop1 = data.id;
  if (prop1 !== undefined) {
    if (!(typeof prop1 === 'string')) {
      validate0.errors = [
        {
          instancePath: '/id',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
      ];
      return false;
    }
  }
  const prop2 = data.orderNumber;
  if (prop2 !== undefined) {
    if (!(typeof prop2 === 'string')) {
      validate0.errors = [
        {
          instancePath: '/orderNumber',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
      ];
      return false;
    }
    if (!pattern1.test(prop2)) {
      validate0.errors = [
        {
          instancePath: '/orderNumber',
          schemaPath: '#/pattern',
          keyword: 'pattern',
          params: { pattern: '^ORD-[0-9]{8}-[A-Z0-9]{6}$' },
          message: 'must match pattern "^ORD-[0-9]{8}-[A-Z0-9]{6}$"',
        },
      ];
      return false;
    }
  }
  const prop3 = data.type;
  if (prop3 !== undefined) {
    if (!(typeof prop3 === 'string')) {
      validate0.errors = [
        {
          instancePath: '/type',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
      ];
      return false;
    }
    if (
      !(
        prop3 === 'standard' ||
        prop3 === 'subscription' ||
        prop3 === 'preorder' ||
        prop3 === 'backorder' ||
        prop3 === 'exchange' ||
        prop3 === 'return'
      )
    ) {
      validate0.errors = [
        {
          instancePath: '/type',
          schemaPath: '#/enum',
          keyword: 'enum',
          params: {
            allowedValues: [
              'standard',
              'subscription',
              'preorder',
              'backorder',
              'exchange',
              'return',
            ],
          },
          message: 'must be equal to one of the allowed values',
        },
      ];
      return false;
    }
  }
  const prop4 = data.status;
  if (prop4 !== undefined) {
    if (!(typeof prop4 === 'string')) {
      validate0.errors = [
        {
          instancePath: '/status',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
      ];
      return false;
    }
    if (
      !(
        prop4 === 'draft' ||
        prop4 === 'pending' ||
        prop4 === 'confirmed' ||
        prop4 === 'processing' ||
        prop4 === 'shipped' ||
        prop4 === 'partial_shipped' ||
        prop4 === 'delivered' ||
        prop4 === 'completed' ||
        prop4 === 'cancelled' ||
        prop4 === 'refunded' ||
        prop4 === 'on_hold'
      )
    ) {
      validate0.errors = [
        {
          instancePath: '/status',
          schemaPath: '#/enum',
          keyword: 'enum',
          params: {
            allowedValues: [
              'draft',
              'pending',
              'confirmed',
              'processing',
              'shipped',
              'partial_shipped',
              'delivered',
              'completed',
              'cancelled',
              'refunded',
              'on_hold',
            ],
          },
          message: 'must be equal to one of the allowed values',
        },
      ];
      return false;
    }
  }
  const prop5 = data.customer;
  if (prop5 !== undefined) {
    if (!validate2(prop5, errors, errors ? '/customer' : '')) {
      return false;
    }
  }
  const prop6 = data.billingAddress;
  if (prop6 !== undefined) {
    if (!validate3(prop6, errors, errors ? '/billingAddress' : '')) {
      return false;
    }
  }
  const prop7 = data.shippingAddress;
  if (prop7 !== undefined) {
    if (!validate3(prop7, errors, errors ? '/shippingAddress' : '')) {
      return false;
    }
  }
  const prop8 = data.sameAsShipping;
  if (prop8 !== undefined) {
    if (!(typeof prop8 === 'boolean')) {
      validate0.errors = [
        {
          instancePath: '/sameAsShipping',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'boolean' },
          message: 'must be boolean',
        },
      ];
      return false;
    }
  }
  const prop9 = data.items;
  if (prop9 !== undefined) {
    if (!Array.isArray(prop9)) {
      validate0.errors = [
        {
          instancePath: '/items',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        },
      ];
      return false;
    }
    for (let i10 = 0, len11 = prop9.length; i10 < len11; i10++) {
      const item12 = prop9[i10];
      if (!validate4(item12, errors, errors ? `${'/items'}/${i10}` : '')) {
        return false;
      }
    }
    if (prop9.length < 1) {
      validate0.errors = [
        {
          instancePath: '/items',
          schemaPath: '#/minItems',
          keyword: 'minItems',
          params: { limit: 1 },
          message: 'must NOT have fewer than 1 items',
        },
      ];
      return false;
    }
    if (prop9.length > 100) {
      validate0.errors = [
        {
          instancePath: '/items',
          schemaPath: '#/maxItems',
          keyword: 'maxItems',
          params: { limit: 100 },
          message: 'must NOT have more than 100 items',
        },
      ];
      return false;
    }
  }
  const prop13 = data.subtotal;
  if (prop13 !== undefined) {
    if (!(prop13 && typeof prop13 === 'object' && !Array.isArray(prop13))) {
      validate0.errors = [
        {
          instancePath: '/subtotal',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
    let missing14;
    if (
      (!('amount' in prop13) && (missing14 = 'amount')) ||
      (!('currency' in prop13) && (missing14 = 'currency'))
    ) {
      validate0.errors = [
        {
          instancePath: `${'/subtotal'}/${missing14}`,
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: missing14 },
          message: "must have required property '" + missing14 + "'",
        },
      ];
      return false;
    }
    const prop15 = prop13.amount;
    if (prop15 !== undefined) {
      if (!(typeof prop15 === 'number')) {
        validate0.errors = [
          {
            instancePath: `${'/subtotal'}/amount`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'number' },
            message: 'must be number',
          },
        ];
        return false;
      }
      if (prop15 < 0) {
        validate0.errors = [
          {
            instancePath: `${'/subtotal'}/amount`,
            schemaPath: '#/minimum',
            keyword: 'minimum',
            params: { comparison: '>=', limit: 0 },
            message: 'must be >= 0',
          },
        ];
        return false;
      }
    }
    const prop16 = prop13.currency;
    if (prop16 !== undefined) {
      if (!(typeof prop16 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${'/subtotal'}/currency`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop16 === 'USD' ||
          prop16 === 'EUR' ||
          prop16 === 'GBP' ||
          prop16 === 'JPY' ||
          prop16 === 'CNY' ||
          prop16 === 'CAD' ||
          prop16 === 'AUD' ||
          prop16 === 'CHF' ||
          prop16 === 'INR' ||
          prop16 === 'MXN'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${'/subtotal'}/currency`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: {
              allowedValues: ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'AUD', 'CHF', 'INR', 'MXN'],
            },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
  }
  const prop17 = data.discount;
  if (prop17 !== undefined) {
    if (!(prop17 && typeof prop17 === 'object' && !Array.isArray(prop17))) {
      validate0.errors = [
        {
          instancePath: '/discount',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
    let missing18;
    if (
      (!('amount' in prop17) && (missing18 = 'amount')) ||
      (!('currency' in prop17) && (missing18 = 'currency'))
    ) {
      validate0.errors = [
        {
          instancePath: `${'/discount'}/${missing18}`,
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: missing18 },
          message: "must have required property '" + missing18 + "'",
        },
      ];
      return false;
    }
    const prop19 = prop17.amount;
    if (prop19 !== undefined) {
      if (!(typeof prop19 === 'number')) {
        validate0.errors = [
          {
            instancePath: `${'/discount'}/amount`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'number' },
            message: 'must be number',
          },
        ];
        return false;
      }
      if (prop19 < 0) {
        validate0.errors = [
          {
            instancePath: `${'/discount'}/amount`,
            schemaPath: '#/minimum',
            keyword: 'minimum',
            params: { comparison: '>=', limit: 0 },
            message: 'must be >= 0',
          },
        ];
        return false;
      }
    }
    const prop20 = prop17.currency;
    if (prop20 !== undefined) {
      if (!(typeof prop20 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${'/discount'}/currency`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop20 === 'USD' ||
          prop20 === 'EUR' ||
          prop20 === 'GBP' ||
          prop20 === 'JPY' ||
          prop20 === 'CNY' ||
          prop20 === 'CAD' ||
          prop20 === 'AUD' ||
          prop20 === 'CHF' ||
          prop20 === 'INR' ||
          prop20 === 'MXN'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${'/discount'}/currency`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: {
              allowedValues: ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'AUD', 'CHF', 'INR', 'MXN'],
            },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
  }
  const prop21 = data.discountCode;
  if (prop21 !== undefined) {
    if (!(typeof prop21 === 'string')) {
      validate0.errors = [
        {
          instancePath: '/discountCode',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
      ];
      return false;
    }
    if (!pattern5.test(prop21)) {
      validate0.errors = [
        {
          instancePath: '/discountCode',
          schemaPath: '#/pattern',
          keyword: 'pattern',
          params: { pattern: '^[A-Z0-9\\-]{4,20}$' },
          message: 'must match pattern "^[A-Z0-9\\-]{4,20}$"',
        },
      ];
      return false;
    }
  }
  const prop22 = data.shipping;
  if (prop22 !== undefined) {
    if (!(prop22 && typeof prop22 === 'object' && !Array.isArray(prop22))) {
      validate0.errors = [
        {
          instancePath: '/shipping',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
    let missing23;
    if (
      (!('amount' in prop22) && (missing23 = 'amount')) ||
      (!('currency' in prop22) && (missing23 = 'currency'))
    ) {
      validate0.errors = [
        {
          instancePath: `${'/shipping'}/${missing23}`,
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: missing23 },
          message: "must have required property '" + missing23 + "'",
        },
      ];
      return false;
    }
    const prop24 = prop22.amount;
    if (prop24 !== undefined) {
      if (!(typeof prop24 === 'number')) {
        validate0.errors = [
          {
            instancePath: `${'/shipping'}/amount`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'number' },
            message: 'must be number',
          },
        ];
        return false;
      }
      if (prop24 < 0) {
        validate0.errors = [
          {
            instancePath: `${'/shipping'}/amount`,
            schemaPath: '#/minimum',
            keyword: 'minimum',
            params: { comparison: '>=', limit: 0 },
            message: 'must be >= 0',
          },
        ];
        return false;
      }
    }
    const prop25 = prop22.currency;
    if (prop25 !== undefined) {
      if (!(typeof prop25 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${'/shipping'}/currency`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop25 === 'USD' ||
          prop25 === 'EUR' ||
          prop25 === 'GBP' ||
          prop25 === 'JPY' ||
          prop25 === 'CNY' ||
          prop25 === 'CAD' ||
          prop25 === 'AUD' ||
          prop25 === 'CHF' ||
          prop25 === 'INR' ||
          prop25 === 'MXN'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${'/shipping'}/currency`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: {
              allowedValues: ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'AUD', 'CHF', 'INR', 'MXN'],
            },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
  }
  const prop26 = data.tax;
  if (prop26 !== undefined) {
    if (!(prop26 && typeof prop26 === 'object' && !Array.isArray(prop26))) {
      validate0.errors = [
        {
          instancePath: '/tax',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
    let missing27;
    if (
      (!('amount' in prop26) && (missing27 = 'amount')) ||
      (!('currency' in prop26) && (missing27 = 'currency'))
    ) {
      validate0.errors = [
        {
          instancePath: `${'/tax'}/${missing27}`,
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: missing27 },
          message: "must have required property '" + missing27 + "'",
        },
      ];
      return false;
    }
    const prop28 = prop26.amount;
    if (prop28 !== undefined) {
      if (!(typeof prop28 === 'number')) {
        validate0.errors = [
          {
            instancePath: `${'/tax'}/amount`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'number' },
            message: 'must be number',
          },
        ];
        return false;
      }
      if (prop28 < 0) {
        validate0.errors = [
          {
            instancePath: `${'/tax'}/amount`,
            schemaPath: '#/minimum',
            keyword: 'minimum',
            params: { comparison: '>=', limit: 0 },
            message: 'must be >= 0',
          },
        ];
        return false;
      }
    }
    const prop29 = prop26.currency;
    if (prop29 !== undefined) {
      if (!(typeof prop29 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${'/tax'}/currency`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop29 === 'USD' ||
          prop29 === 'EUR' ||
          prop29 === 'GBP' ||
          prop29 === 'JPY' ||
          prop29 === 'CNY' ||
          prop29 === 'CAD' ||
          prop29 === 'AUD' ||
          prop29 === 'CHF' ||
          prop29 === 'INR' ||
          prop29 === 'MXN'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${'/tax'}/currency`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: {
              allowedValues: ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'AUD', 'CHF', 'INR', 'MXN'],
            },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
  }
  const prop30 = data.total;
  if (prop30 !== undefined) {
    if (!(prop30 && typeof prop30 === 'object' && !Array.isArray(prop30))) {
      validate0.errors = [
        {
          instancePath: '/total',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
    let missing31;
    if (
      (!('amount' in prop30) && (missing31 = 'amount')) ||
      (!('currency' in prop30) && (missing31 = 'currency'))
    ) {
      validate0.errors = [
        {
          instancePath: `${'/total'}/${missing31}`,
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: missing31 },
          message: "must have required property '" + missing31 + "'",
        },
      ];
      return false;
    }
    const prop32 = prop30.amount;
    if (prop32 !== undefined) {
      if (!(typeof prop32 === 'number')) {
        validate0.errors = [
          {
            instancePath: `${'/total'}/amount`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'number' },
            message: 'must be number',
          },
        ];
        return false;
      }
      if (prop32 < 0) {
        validate0.errors = [
          {
            instancePath: `${'/total'}/amount`,
            schemaPath: '#/minimum',
            keyword: 'minimum',
            params: { comparison: '>=', limit: 0 },
            message: 'must be >= 0',
          },
        ];
        return false;
      }
    }
    const prop33 = prop30.currency;
    if (prop33 !== undefined) {
      if (!(typeof prop33 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${'/total'}/currency`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop33 === 'USD' ||
          prop33 === 'EUR' ||
          prop33 === 'GBP' ||
          prop33 === 'JPY' ||
          prop33 === 'CNY' ||
          prop33 === 'CAD' ||
          prop33 === 'AUD' ||
          prop33 === 'CHF' ||
          prop33 === 'INR' ||
          prop33 === 'MXN'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${'/total'}/currency`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: {
              allowedValues: ['USD', 'EUR', 'GBP', 'JPY', 'CNY', 'CAD', 'AUD', 'CHF', 'INR', 'MXN'],
            },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
  }
  const prop34 = data.payments;
  if (prop34 !== undefined) {
    if (!Array.isArray(prop34)) {
      validate0.errors = [
        {
          instancePath: '/payments',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        },
      ];
      return false;
    }
    for (let i35 = 0, len36 = prop34.length; i35 < len36; i35++) {
      const item37 = prop34[i35];
      if (!validate6(item37, errors, errors ? `${'/payments'}/${i35}` : '')) {
        return false;
      }
    }
  }
  const prop38 = data.shipments;
  if (prop38 !== undefined) {
    if (!Array.isArray(prop38)) {
      validate0.errors = [
        {
          instancePath: '/shipments',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        },
      ];
      return false;
    }
    for (let i39 = 0, len40 = prop38.length; i39 < len40; i39++) {
      const item41 = prop38[i39];
      if (!validate7(item41, errors, errors ? `${'/shipments'}/${i39}` : '')) {
        return false;
      }
    }
  }
  const prop42 = data.notes;
  if (prop42 !== undefined) {
    if (!(typeof prop42 === 'string')) {
      validate0.errors = [
        {
          instancePath: '/notes',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
      ];
      return false;
    }
    const len43 = ucs2length(prop42);
    if (len43 > 2000) {
      validate0.errors = [
        {
          instancePath: '/notes',
          schemaPath: '#/maxLength',
          keyword: 'maxLength',
          params: { limit: 2000 },
          message: 'must NOT have more than 2000 characters',
        },
      ];
      return false;
    }
  }
  const prop44 = data.internalNotes;
  if (prop44 !== undefined) {
    if (!(typeof prop44 === 'string')) {
      validate0.errors = [
        {
          instancePath: '/internalNotes',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'string' },
          message: 'must be string',
        },
      ];
      return false;
    }
    const len45 = ucs2length(prop44);
    if (len45 > 5000) {
      validate0.errors = [
        {
          instancePath: '/internalNotes',
          schemaPath: '#/maxLength',
          keyword: 'maxLength',
          params: { limit: 5000 },
          message: 'must NOT have more than 5000 characters',
        },
      ];
      return false;
    }
  }
  const prop46 = data.tags;
  if (prop46 !== undefined) {
    if (!Array.isArray(prop46)) {
      validate0.errors = [
        {
          instancePath: '/tags',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        },
      ];
      return false;
    }
    for (let i47 = 0, len48 = prop46.length; i47 < len48; i47++) {
      if (!(typeof prop46[i47] === 'string')) {
        validate0.errors = [
          {
            instancePath: `${'/tags'}/${i47}`,
            schemaPath: '#/items/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const seen50 = new Set();
    for (let i49 = 0, len51 = prop46.length; i49 < len51; i49++) {
      const item52 = prop46[i49];
      if (seen50.has(item52)) {
        validate0.errors = [
          {
            instancePath: '/tags',
            schemaPath: '#/uniqueItems',
            keyword: 'uniqueItems',
            params: {},
            message: 'must NOT have duplicate items',
          },
        ];
        return false;
      }
      seen50.add(item52);
    }
  }
  const prop53 = data.metadata;
  if (prop53 !== undefined) {
    if (!(prop53 && typeof prop53 === 'object' && !Array.isArray(prop53))) {
      validate0.errors = [
        {
          instancePath: '/metadata',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
  }
  const prop54 = data.attachments;
  if (prop54 !== undefined) {
    if (!Array.isArray(prop54)) {
      validate0.errors = [
        {
          instancePath: '/attachments',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'array' },
          message: 'must be array',
        },
      ];
      return false;
    }
    for (let i55 = 0, len56 = prop54.length; i55 < len56; i55++) {
      const item57 = prop54[i55];
      if (!validate8(item57, errors, errors ? `${'/attachments'}/${i55}` : '')) {
        return false;
      }
    }
    if (prop54.length > 10) {
      validate0.errors = [
        {
          instancePath: '/attachments',
          schemaPath: '#/maxItems',
          keyword: 'maxItems',
          params: { limit: 10 },
          message: 'must NOT have more than 10 items',
        },
      ];
      return false;
    }
  }
  const prop58 = data.audit;
  if (prop58 !== undefined) {
    if (!(prop58 && typeof prop58 === 'object' && !Array.isArray(prop58))) {
      validate0.errors = [
        {
          instancePath: '/audit',
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
    let missing59;
    if (
      (!('createdAt' in prop58) && (missing59 = 'createdAt')) ||
      (!('createdBy' in prop58) && (missing59 = 'createdBy')) ||
      (!('version' in prop58) && (missing59 = 'version'))
    ) {
      validate0.errors = [
        {
          instancePath: `${'/audit'}/${missing59}`,
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: missing59 },
          message: "must have required property '" + missing59 + "'",
        },
      ];
      return false;
    }
    const prop60 = prop58.createdAt;
    if (prop60 !== undefined) {
      if (!(typeof prop60 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${'/audit'}/createdAt`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop61 = prop58.createdBy;
    if (prop61 !== undefined) {
      if (!(typeof prop61 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${'/audit'}/createdBy`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop62 = prop58.updatedAt;
    if (prop62 !== undefined) {
      if (!(typeof prop62 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${'/audit'}/updatedAt`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop63 = prop58.updatedBy;
    if (prop63 !== undefined) {
      if (!(typeof prop63 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${'/audit'}/updatedBy`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop64 = prop58.version;
    if (prop64 !== undefined) {
      if (!Number.isInteger(prop64)) {
        validate0.errors = [
          {
            instancePath: `${'/audit'}/version`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'integer' },
            message: 'must be integer',
          },
        ];
        return false;
      }
      if (prop64 < 1) {
        validate0.errors = [
          {
            instancePath: `${'/audit'}/version`,
            schemaPath: '#/minimum',
            keyword: 'minimum',
            params: { comparison: '>=', limit: 1 },
            message: 'must be >= 1',
          },
        ];
        return false;
      }
    }
  }
  let ifResult66 = true;
  if (data && typeof data === 'object' && !Array.isArray(data)) {
    const prop67 = data['sameAsShipping'];
    if (ifResult66 && prop67 !== undefined) {
      if (prop67 !== false) {
        ifResult66 = false;
      }
    }
  } else {
    ifResult66 = false;
  }
  const ifCond65 = ifResult66;
  if (ifCond65) {
    if (data && typeof data === 'object' && !Array.isArray(data)) {
      if (!('billingAddress' in data)) {
        validate0.errors = [
          {
            instancePath: '/billingAddress',
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: 'billingAddress' },
            message: "must have required property \'billingAddress\'",
          },
        ];
        return false;
      }
    }
  }

  function validate2(data, errors, path) {
    if (!(data && typeof data === 'object' && !Array.isArray(data))) {
      validate0.errors = [
        {
          instancePath: path,
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
    let missing68;
    if (
      (!('id' in data) && (missing68 = 'id')) ||
      (!('username' in data) && (missing68 = 'username')) ||
      (!('emails' in data) && (missing68 = 'emails')) ||
      (!('role' in data) && (missing68 = 'role')) ||
      (!('status' in data) && (missing68 = 'status'))
    ) {
      validate0.errors = [
        {
          instancePath: `${path}/${missing68}`,
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: missing68 },
          message: "must have required property '" + missing68 + "'",
        },
      ];
      return false;
    }
    const prop69 = data.id;
    if (prop69 !== undefined) {
      if (!(typeof prop69 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/id`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop70 = data.username;
    if (prop70 !== undefined) {
      if (!(typeof prop70 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/username`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      const len71 = ucs2length(prop70);
      if (len71 < 3) {
        validate0.errors = [
          {
            instancePath: `${path}/username`,
            schemaPath: '#/minLength',
            keyword: 'minLength',
            params: { limit: 3 },
            message: 'must NOT have fewer than 3 characters',
          },
        ];
        return false;
      }
      if (len71 > 50) {
        validate0.errors = [
          {
            instancePath: `${path}/username`,
            schemaPath: '#/maxLength',
            keyword: 'maxLength',
            params: { limit: 50 },
            message: 'must NOT have more than 50 characters',
          },
        ];
        return false;
      }
      if (!pattern9.test(prop70)) {
        validate0.errors = [
          {
            instancePath: `${path}/username`,
            schemaPath: '#/pattern',
            keyword: 'pattern',
            params: { pattern: '^[a-zA-Z0-9_]+$' },
            message: 'must match pattern "^[a-zA-Z0-9_]+$"',
          },
        ];
        return false;
      }
    }
    const prop72 = data.displayName;
    if (prop72 !== undefined) {
      if (!(typeof prop72 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/displayName`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      const len73 = ucs2length(prop72);
      if (len73 < 1) {
        validate0.errors = [
          {
            instancePath: `${path}/displayName`,
            schemaPath: '#/minLength',
            keyword: 'minLength',
            params: { limit: 1 },
            message: 'must NOT have fewer than 1 characters',
          },
        ];
        return false;
      }
      if (len73 > 100) {
        validate0.errors = [
          {
            instancePath: `${path}/displayName`,
            schemaPath: '#/maxLength',
            keyword: 'maxLength',
            params: { limit: 100 },
            message: 'must NOT have more than 100 characters',
          },
        ];
        return false;
      }
    }
    const prop74 = data.emails;
    if (prop74 !== undefined) {
      if (!Array.isArray(prop74)) {
        validate0.errors = [
          {
            instancePath: `${path}/emails`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'array' },
            message: 'must be array',
          },
        ];
        return false;
      }
      for (let i75 = 0, len76 = prop74.length; i75 < len76; i75++) {
        const item77 = prop74[i75];
        if (!(item77 && typeof item77 === 'object' && !Array.isArray(item77))) {
          validate0.errors = [
            {
              instancePath: `${`${path}/emails`}/${i75}`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            },
          ];
          return false;
        }
        let missing78;
        if (
          (!('type' in item77) && (missing78 = 'type')) ||
          (!('address' in item77) && (missing78 = 'address'))
        ) {
          validate0.errors = [
            {
              instancePath: `${`${`${path}/emails`}/${i75}`}/${missing78}`,
              schemaPath: '#/required',
              keyword: 'required',
              params: { missingProperty: missing78 },
              message: "must have required property '" + missing78 + "'",
            },
          ];
          return false;
        }
        const prop79 = item77.type;
        if (prop79 !== undefined) {
          if (!(typeof prop79 === 'string')) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/emails`}/${i75}`}/type`,
                schemaPath: '#/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              },
            ];
            return false;
          }
          if (!(prop79 === 'personal' || prop79 === 'work' || prop79 === 'other')) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/emails`}/${i75}`}/type`,
                schemaPath: '#/enum',
                keyword: 'enum',
                params: { allowedValues: ['personal', 'work', 'other'] },
                message: 'must be equal to one of the allowed values',
              },
            ];
            return false;
          }
        }
        const prop80 = item77.address;
        if (prop80 !== undefined) {
          if (!(typeof prop80 === 'string')) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/emails`}/${i75}`}/address`,
                schemaPath: '#/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              },
            ];
            return false;
          }
        }
        const prop81 = item77.verified;
        if (prop81 !== undefined) {
          if (!(typeof prop81 === 'boolean')) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/emails`}/${i75}`}/verified`,
                schemaPath: '#/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              },
            ];
            return false;
          }
        }
        const prop82 = item77.verifiedAt;
        if (prop82 !== undefined) {
          if (!(typeof prop82 === 'string')) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/emails`}/${i75}`}/verifiedAt`,
                schemaPath: '#/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              },
            ];
            return false;
          }
        }
      }
      if (prop74.length < 1) {
        validate0.errors = [
          {
            instancePath: `${path}/emails`,
            schemaPath: '#/minItems',
            keyword: 'minItems',
            params: { limit: 1 },
            message: 'must NOT have fewer than 1 items',
          },
        ];
        return false;
      }
      if (prop74.length > 5) {
        validate0.errors = [
          {
            instancePath: `${path}/emails`,
            schemaPath: '#/maxItems',
            keyword: 'maxItems',
            params: { limit: 5 },
            message: 'must NOT have more than 5 items',
          },
        ];
        return false;
      }
    }
    const prop83 = data.phones;
    if (prop83 !== undefined) {
      if (!Array.isArray(prop83)) {
        validate0.errors = [
          {
            instancePath: `${path}/phones`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'array' },
            message: 'must be array',
          },
        ];
        return false;
      }
      for (let i84 = 0, len85 = prop83.length; i84 < len85; i84++) {
        const item86 = prop83[i84];
        if (!(item86 && typeof item86 === 'object' && !Array.isArray(item86))) {
          validate0.errors = [
            {
              instancePath: `${`${path}/phones`}/${i84}`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            },
          ];
          return false;
        }
        let missing87;
        if (
          (!('type' in item86) && (missing87 = 'type')) ||
          (!('number' in item86) && (missing87 = 'number'))
        ) {
          validate0.errors = [
            {
              instancePath: `${`${`${path}/phones`}/${i84}`}/${missing87}`,
              schemaPath: '#/required',
              keyword: 'required',
              params: { missingProperty: missing87 },
              message: "must have required property '" + missing87 + "'",
            },
          ];
          return false;
        }
        const prop88 = item86.type;
        if (prop88 !== undefined) {
          if (!(typeof prop88 === 'string')) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/phones`}/${i84}`}/type`,
                schemaPath: '#/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              },
            ];
            return false;
          }
          if (
            !(
              prop88 === 'home' ||
              prop88 === 'work' ||
              prop88 === 'mobile' ||
              prop88 === 'fax' ||
              prop88 === 'other'
            )
          ) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/phones`}/${i84}`}/type`,
                schemaPath: '#/enum',
                keyword: 'enum',
                params: { allowedValues: ['home', 'work', 'mobile', 'fax', 'other'] },
                message: 'must be equal to one of the allowed values',
              },
            ];
            return false;
          }
        }
        const prop89 = item86.number;
        if (prop89 !== undefined) {
          if (!(typeof prop89 === 'string')) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/phones`}/${i84}`}/number`,
                schemaPath: '#/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              },
            ];
            return false;
          }
          if (!pattern10.test(prop89)) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/phones`}/${i84}`}/number`,
                schemaPath: '#/pattern',
                keyword: 'pattern',
                params: { pattern: '^\\+?[0-9\\-\\s\\(\\)]{7,20}$' },
                message: 'must match pattern "^\\+?[0-9\\-\\s\\(\\)]{7,20}$"',
              },
            ];
            return false;
          }
        }
        const prop90 = item86.extension;
        if (prop90 !== undefined) {
          if (!(typeof prop90 === 'string')) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/phones`}/${i84}`}/extension`,
                schemaPath: '#/type',
                keyword: 'type',
                params: { type: 'string' },
                message: 'must be string',
              },
            ];
            return false;
          }
          const len91 = ucs2length(prop90);
          if (len91 > 10) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/phones`}/${i84}`}/extension`,
                schemaPath: '#/maxLength',
                keyword: 'maxLength',
                params: { limit: 10 },
                message: 'must NOT have more than 10 characters',
              },
            ];
            return false;
          }
        }
        const prop92 = item86.primary;
        if (prop92 !== undefined) {
          if (!(typeof prop92 === 'boolean')) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/phones`}/${i84}`}/primary`,
                schemaPath: '#/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              },
            ];
            return false;
          }
        }
      }
      if (prop83.length > 5) {
        validate0.errors = [
          {
            instancePath: `${path}/phones`,
            schemaPath: '#/maxItems',
            keyword: 'maxItems',
            params: { limit: 5 },
            message: 'must NOT have more than 5 items',
          },
        ];
        return false;
      }
    }
    const prop93 = data.avatar;
    if (prop93 !== undefined) {
      if (!validate8(prop93, errors, errors ? `${path}/avatar` : '')) {
        return false;
      }
    }
    const prop94 = data.role;
    if (prop94 !== undefined) {
      if (!(typeof prop94 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/role`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop94 === 'admin' ||
          prop94 === 'manager' ||
          prop94 === 'user' ||
          prop94 === 'guest' ||
          prop94 === 'api'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${path}/role`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: { allowedValues: ['admin', 'manager', 'user', 'guest', 'api'] },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
    const prop95 = data.permissions;
    if (prop95 !== undefined) {
      if (!Array.isArray(prop95)) {
        validate0.errors = [
          {
            instancePath: `${path}/permissions`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'array' },
            message: 'must be array',
          },
        ];
        return false;
      }
      for (let i96 = 0, len97 = prop95.length; i96 < len97; i96++) {
        if (!(typeof prop95[i96] === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/permissions`}/${i96}`,
              schemaPath: '#/items/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
      }
      const seen99 = new Set();
      for (let i98 = 0, len100 = prop95.length; i98 < len100; i98++) {
        const item101 = prop95[i98];
        if (seen99.has(item101)) {
          validate0.errors = [
            {
              instancePath: `${path}/permissions`,
              schemaPath: '#/uniqueItems',
              keyword: 'uniqueItems',
              params: {},
              message: 'must NOT have duplicate items',
            },
          ];
          return false;
        }
        seen99.add(item101);
      }
    }
    const prop102 = data.status;
    if (prop102 !== undefined) {
      if (!(typeof prop102 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/status`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop102 === 'active' ||
          prop102 === 'inactive' ||
          prop102 === 'pending' ||
          prop102 === 'suspended' ||
          prop102 === 'deleted'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${path}/status`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: { allowedValues: ['active', 'inactive', 'pending', 'suspended', 'deleted'] },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
    const prop103 = data.lastLoginAt;
    if (prop103 !== undefined) {
      if (!(typeof prop103 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/lastLoginAt`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop104 = data.settings;
    if (prop104 !== undefined) {
      if (!(prop104 && typeof prop104 === 'object' && !Array.isArray(prop104))) {
        validate0.errors = [
          {
            instancePath: `${path}/settings`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'object' },
            message: 'must be object',
          },
        ];
        return false;
      }
      const prop105 = prop104.theme;
      if (prop105 !== undefined) {
        if (!(typeof prop105 === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/settings`}/theme`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
        if (!(prop105 === 'light' || prop105 === 'dark' || prop105 === 'system')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/settings`}/theme`,
              schemaPath: '#/enum',
              keyword: 'enum',
              params: { allowedValues: ['light', 'dark', 'system'] },
              message: 'must be equal to one of the allowed values',
            },
          ];
          return false;
        }
      }
      const prop106 = prop104.language;
      if (prop106 !== undefined) {
        if (!(typeof prop106 === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/settings`}/language`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
        if (!pattern11.test(prop106)) {
          validate0.errors = [
            {
              instancePath: `${`${path}/settings`}/language`,
              schemaPath: '#/pattern',
              keyword: 'pattern',
              params: { pattern: '^[a-z]{2}(-[A-Z]{2})?$' },
              message: 'must match pattern "^[a-z]{2}(-[A-Z]{2})?$"',
            },
          ];
          return false;
        }
      }
      const prop107 = prop104.timezone;
      if (prop107 !== undefined) {
        if (!(typeof prop107 === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/settings`}/timezone`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
      }
      const prop108 = prop104.notifications;
      if (prop108 !== undefined) {
        if (!(prop108 && typeof prop108 === 'object' && !Array.isArray(prop108))) {
          validate0.errors = [
            {
              instancePath: `${`${path}/settings`}/notifications`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'object' },
              message: 'must be object',
            },
          ];
          return false;
        }
        const prop109 = prop108.email;
        if (prop109 !== undefined) {
          if (!(typeof prop109 === 'boolean')) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/settings`}/notifications`}/email`,
                schemaPath: '#/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              },
            ];
            return false;
          }
        }
        if (Object.hasOwn(prop108, 'push')) {
          const pv110 = prop108.push;
          if (!(typeof pv110 === 'boolean')) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/settings`}/notifications`}/push`,
                schemaPath: '#/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              },
            ];
            return false;
          }
        }
        const prop111 = prop108.sms;
        if (prop111 !== undefined) {
          if (!(typeof prop111 === 'boolean')) {
            validate0.errors = [
              {
                instancePath: `${`${`${path}/settings`}/notifications`}/sms`,
                schemaPath: '#/type',
                keyword: 'type',
                params: { type: 'boolean' },
                message: 'must be boolean',
              },
            ];
            return false;
          }
        }
      }
    }
    return true;
  }

  function validate3(data, errors, path) {
    if (!(data && typeof data === 'object' && !Array.isArray(data))) {
      validate0.errors = [
        {
          instancePath: path,
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
    let missing112;
    if (
      (!('street' in data) && (missing112 = 'street')) ||
      (!('city' in data) && (missing112 = 'city')) ||
      (!('state' in data) && (missing112 = 'state')) ||
      (!('zip' in data) && (missing112 = 'zip')) ||
      (!('country' in data) && (missing112 = 'country'))
    ) {
      validate0.errors = [
        {
          instancePath: `${path}/${missing112}`,
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: missing112 },
          message: "must have required property '" + missing112 + "'",
        },
      ];
      return false;
    }
    const prop113 = data.street;
    if (prop113 !== undefined) {
      if (!(typeof prop113 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/street`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      const len114 = ucs2length(prop113);
      if (len114 < 1) {
        validate0.errors = [
          {
            instancePath: `${path}/street`,
            schemaPath: '#/minLength',
            keyword: 'minLength',
            params: { limit: 1 },
            message: 'must NOT have fewer than 1 characters',
          },
        ];
        return false;
      }
      if (len114 > 200) {
        validate0.errors = [
          {
            instancePath: `${path}/street`,
            schemaPath: '#/maxLength',
            keyword: 'maxLength',
            params: { limit: 200 },
            message: 'must NOT have more than 200 characters',
          },
        ];
        return false;
      }
    }
    const prop115 = data.street2;
    if (prop115 !== undefined) {
      if (!(typeof prop115 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/street2`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      const len116 = ucs2length(prop115);
      if (len116 > 200) {
        validate0.errors = [
          {
            instancePath: `${path}/street2`,
            schemaPath: '#/maxLength',
            keyword: 'maxLength',
            params: { limit: 200 },
            message: 'must NOT have more than 200 characters',
          },
        ];
        return false;
      }
    }
    const prop117 = data.city;
    if (prop117 !== undefined) {
      if (!(typeof prop117 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/city`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      const len118 = ucs2length(prop117);
      if (len118 < 1) {
        validate0.errors = [
          {
            instancePath: `${path}/city`,
            schemaPath: '#/minLength',
            keyword: 'minLength',
            params: { limit: 1 },
            message: 'must NOT have fewer than 1 characters',
          },
        ];
        return false;
      }
      if (len118 > 100) {
        validate0.errors = [
          {
            instancePath: `${path}/city`,
            schemaPath: '#/maxLength',
            keyword: 'maxLength',
            params: { limit: 100 },
            message: 'must NOT have more than 100 characters',
          },
        ];
        return false;
      }
    }
    const prop119 = data.state;
    if (prop119 !== undefined) {
      if (!(typeof prop119 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/state`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      const len120 = ucs2length(prop119);
      if (len120 < 2) {
        validate0.errors = [
          {
            instancePath: `${path}/state`,
            schemaPath: '#/minLength',
            keyword: 'minLength',
            params: { limit: 2 },
            message: 'must NOT have fewer than 2 characters',
          },
        ];
        return false;
      }
      if (len120 > 2) {
        validate0.errors = [
          {
            instancePath: `${path}/state`,
            schemaPath: '#/maxLength',
            keyword: 'maxLength',
            params: { limit: 2 },
            message: 'must NOT have more than 2 characters',
          },
        ];
        return false;
      }
      if (!pattern12.test(prop119)) {
        validate0.errors = [
          {
            instancePath: `${path}/state`,
            schemaPath: '#/pattern',
            keyword: 'pattern',
            params: { pattern: '^[A-Z]{2}$' },
            message: 'must match pattern "^[A-Z]{2}$"',
          },
        ];
        return false;
      }
    }
    const prop121 = data.zip;
    if (prop121 !== undefined) {
      if (!(typeof prop121 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/zip`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (!pattern13.test(prop121)) {
        validate0.errors = [
          {
            instancePath: `${path}/zip`,
            schemaPath: '#/pattern',
            keyword: 'pattern',
            params: { pattern: '^[0-9]{5}(-[0-9]{4})?$' },
            message: 'must match pattern "^[0-9]{5}(-[0-9]{4})?$"',
          },
        ];
        return false;
      }
    }
    const prop122 = data.country;
    if (prop122 !== undefined) {
      if (!(typeof prop122 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/country`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop122 === 'US' ||
          prop122 === 'CA' ||
          prop122 === 'MX' ||
          prop122 === 'UK' ||
          prop122 === 'DE' ||
          prop122 === 'FR' ||
          prop122 === 'JP' ||
          prop122 === 'CN' ||
          prop122 === 'AU' ||
          prop122 === 'BR'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${path}/country`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: { allowedValues: ['US', 'CA', 'MX', 'UK', 'DE', 'FR', 'JP', 'CN', 'AU', 'BR'] },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
    const prop123 = data.coordinates;
    if (prop123 !== undefined) {
      if (!(prop123 && typeof prop123 === 'object' && !Array.isArray(prop123))) {
        validate0.errors = [
          {
            instancePath: `${path}/coordinates`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'object' },
            message: 'must be object',
          },
        ];
        return false;
      }
      const prop124 = prop123.lat;
      if (prop124 !== undefined) {
        if (!(typeof prop124 === 'number')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/coordinates`}/lat`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            },
          ];
          return false;
        }
        if (prop124 < -90) {
          validate0.errors = [
            {
              instancePath: `${`${path}/coordinates`}/lat`,
              schemaPath: '#/minimum',
              keyword: 'minimum',
              params: { comparison: '>=', limit: -90 },
              message: 'must be >= -90',
            },
          ];
          return false;
        }
        if (prop124 > 90) {
          validate0.errors = [
            {
              instancePath: `${`${path}/coordinates`}/lat`,
              schemaPath: '#/maximum',
              keyword: 'maximum',
              params: { comparison: '<=', limit: 90 },
              message: 'must be <= 90',
            },
          ];
          return false;
        }
      }
      const prop125 = prop123.lng;
      if (prop125 !== undefined) {
        if (!(typeof prop125 === 'number')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/coordinates`}/lng`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            },
          ];
          return false;
        }
        if (prop125 < -180) {
          validate0.errors = [
            {
              instancePath: `${`${path}/coordinates`}/lng`,
              schemaPath: '#/minimum',
              keyword: 'minimum',
              params: { comparison: '>=', limit: -180 },
              message: 'must be >= -180',
            },
          ];
          return false;
        }
        if (prop125 > 180) {
          validate0.errors = [
            {
              instancePath: `${`${path}/coordinates`}/lng`,
              schemaPath: '#/maximum',
              keyword: 'maximum',
              params: { comparison: '<=', limit: 180 },
              message: 'must be <= 180',
            },
          ];
          return false;
        }
      }
    }
    return true;
  }

  function validate4(data, errors, path) {
    if (!(data && typeof data === 'object' && !Array.isArray(data))) {
      validate0.errors = [
        {
          instancePath: path,
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
    let missing126;
    if (
      (!('id' in data) && (missing126 = 'id')) ||
      (!('productId' in data) && (missing126 = 'productId')) ||
      (!('name' in data) && (missing126 = 'name')) ||
      (!('quantity' in data) && (missing126 = 'quantity')) ||
      (!('unitPrice' in data) && (missing126 = 'unitPrice')) ||
      (!('total' in data) && (missing126 = 'total'))
    ) {
      validate0.errors = [
        {
          instancePath: `${path}/${missing126}`,
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: missing126 },
          message: "must have required property '" + missing126 + "'",
        },
      ];
      return false;
    }
    const prop127 = data.id;
    if (prop127 !== undefined) {
      if (!(typeof prop127 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/id`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop128 = data.productId;
    if (prop128 !== undefined) {
      if (!(typeof prop128 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/productId`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop129 = data.variantId;
    if (prop129 !== undefined) {
      if (!(typeof prop129 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/variantId`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop130 = data.sku;
    if (prop130 !== undefined) {
      if (!(typeof prop130 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/sku`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop131 = data.name;
    if (prop131 !== undefined) {
      if (!(typeof prop131 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/name`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop132 = data.quantity;
    if (prop132 !== undefined) {
      if (!Number.isInteger(prop132)) {
        validate0.errors = [
          {
            instancePath: `${path}/quantity`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'integer' },
            message: 'must be integer',
          },
        ];
        return false;
      }
      if (prop132 < 1) {
        validate0.errors = [
          {
            instancePath: `${path}/quantity`,
            schemaPath: '#/minimum',
            keyword: 'minimum',
            params: { comparison: '>=', limit: 1 },
            message: 'must be >= 1',
          },
        ];
        return false;
      }
    }
    const prop133 = data.unitPrice;
    if (prop133 !== undefined) {
      if (!(prop133 && typeof prop133 === 'object' && !Array.isArray(prop133))) {
        validate0.errors = [
          {
            instancePath: `${path}/unitPrice`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'object' },
            message: 'must be object',
          },
        ];
        return false;
      }
      let missing134;
      if (
        (!('amount' in prop133) && (missing134 = 'amount')) ||
        (!('currency' in prop133) && (missing134 = 'currency'))
      ) {
        validate0.errors = [
          {
            instancePath: `${`${path}/unitPrice`}/${missing134}`,
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: missing134 },
            message: "must have required property '" + missing134 + "'",
          },
        ];
        return false;
      }
      const prop135 = prop133.amount;
      if (prop135 !== undefined) {
        if (!(typeof prop135 === 'number')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/unitPrice`}/amount`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            },
          ];
          return false;
        }
        if (prop135 < 0) {
          validate0.errors = [
            {
              instancePath: `${`${path}/unitPrice`}/amount`,
              schemaPath: '#/minimum',
              keyword: 'minimum',
              params: { comparison: '>=', limit: 0 },
              message: 'must be >= 0',
            },
          ];
          return false;
        }
      }
      const prop136 = prop133.currency;
      if (prop136 !== undefined) {
        if (!(typeof prop136 === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/unitPrice`}/currency`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
        if (
          !(
            prop136 === 'USD' ||
            prop136 === 'EUR' ||
            prop136 === 'GBP' ||
            prop136 === 'JPY' ||
            prop136 === 'CNY' ||
            prop136 === 'CAD' ||
            prop136 === 'AUD' ||
            prop136 === 'CHF' ||
            prop136 === 'INR' ||
            prop136 === 'MXN'
          )
        ) {
          validate0.errors = [
            {
              instancePath: `${`${path}/unitPrice`}/currency`,
              schemaPath: '#/enum',
              keyword: 'enum',
              params: {
                allowedValues: [
                  'USD',
                  'EUR',
                  'GBP',
                  'JPY',
                  'CNY',
                  'CAD',
                  'AUD',
                  'CHF',
                  'INR',
                  'MXN',
                ],
              },
              message: 'must be equal to one of the allowed values',
            },
          ];
          return false;
        }
      }
    }
    const prop137 = data.discount;
    if (prop137 !== undefined) {
      if (!(prop137 && typeof prop137 === 'object' && !Array.isArray(prop137))) {
        validate0.errors = [
          {
            instancePath: `${path}/discount`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'object' },
            message: 'must be object',
          },
        ];
        return false;
      }
      let missing138;
      if (
        (!('amount' in prop137) && (missing138 = 'amount')) ||
        (!('currency' in prop137) && (missing138 = 'currency'))
      ) {
        validate0.errors = [
          {
            instancePath: `${`${path}/discount`}/${missing138}`,
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: missing138 },
            message: "must have required property '" + missing138 + "'",
          },
        ];
        return false;
      }
      const prop139 = prop137.amount;
      if (prop139 !== undefined) {
        if (!(typeof prop139 === 'number')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/discount`}/amount`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            },
          ];
          return false;
        }
        if (prop139 < 0) {
          validate0.errors = [
            {
              instancePath: `${`${path}/discount`}/amount`,
              schemaPath: '#/minimum',
              keyword: 'minimum',
              params: { comparison: '>=', limit: 0 },
              message: 'must be >= 0',
            },
          ];
          return false;
        }
      }
      const prop140 = prop137.currency;
      if (prop140 !== undefined) {
        if (!(typeof prop140 === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/discount`}/currency`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
        if (
          !(
            prop140 === 'USD' ||
            prop140 === 'EUR' ||
            prop140 === 'GBP' ||
            prop140 === 'JPY' ||
            prop140 === 'CNY' ||
            prop140 === 'CAD' ||
            prop140 === 'AUD' ||
            prop140 === 'CHF' ||
            prop140 === 'INR' ||
            prop140 === 'MXN'
          )
        ) {
          validate0.errors = [
            {
              instancePath: `${`${path}/discount`}/currency`,
              schemaPath: '#/enum',
              keyword: 'enum',
              params: {
                allowedValues: [
                  'USD',
                  'EUR',
                  'GBP',
                  'JPY',
                  'CNY',
                  'CAD',
                  'AUD',
                  'CHF',
                  'INR',
                  'MXN',
                ],
              },
              message: 'must be equal to one of the allowed values',
            },
          ];
          return false;
        }
      }
    }
    const prop141 = data.tax;
    if (prop141 !== undefined) {
      if (!(prop141 && typeof prop141 === 'object' && !Array.isArray(prop141))) {
        validate0.errors = [
          {
            instancePath: `${path}/tax`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'object' },
            message: 'must be object',
          },
        ];
        return false;
      }
      let missing142;
      if (
        (!('amount' in prop141) && (missing142 = 'amount')) ||
        (!('currency' in prop141) && (missing142 = 'currency'))
      ) {
        validate0.errors = [
          {
            instancePath: `${`${path}/tax`}/${missing142}`,
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: missing142 },
            message: "must have required property '" + missing142 + "'",
          },
        ];
        return false;
      }
      const prop143 = prop141.amount;
      if (prop143 !== undefined) {
        if (!(typeof prop143 === 'number')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/tax`}/amount`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            },
          ];
          return false;
        }
        if (prop143 < 0) {
          validate0.errors = [
            {
              instancePath: `${`${path}/tax`}/amount`,
              schemaPath: '#/minimum',
              keyword: 'minimum',
              params: { comparison: '>=', limit: 0 },
              message: 'must be >= 0',
            },
          ];
          return false;
        }
      }
      const prop144 = prop141.currency;
      if (prop144 !== undefined) {
        if (!(typeof prop144 === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/tax`}/currency`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
        if (
          !(
            prop144 === 'USD' ||
            prop144 === 'EUR' ||
            prop144 === 'GBP' ||
            prop144 === 'JPY' ||
            prop144 === 'CNY' ||
            prop144 === 'CAD' ||
            prop144 === 'AUD' ||
            prop144 === 'CHF' ||
            prop144 === 'INR' ||
            prop144 === 'MXN'
          )
        ) {
          validate0.errors = [
            {
              instancePath: `${`${path}/tax`}/currency`,
              schemaPath: '#/enum',
              keyword: 'enum',
              params: {
                allowedValues: [
                  'USD',
                  'EUR',
                  'GBP',
                  'JPY',
                  'CNY',
                  'CAD',
                  'AUD',
                  'CHF',
                  'INR',
                  'MXN',
                ],
              },
              message: 'must be equal to one of the allowed values',
            },
          ];
          return false;
        }
      }
    }
    const prop145 = data.total;
    if (prop145 !== undefined) {
      if (!(prop145 && typeof prop145 === 'object' && !Array.isArray(prop145))) {
        validate0.errors = [
          {
            instancePath: `${path}/total`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'object' },
            message: 'must be object',
          },
        ];
        return false;
      }
      let missing146;
      if (
        (!('amount' in prop145) && (missing146 = 'amount')) ||
        (!('currency' in prop145) && (missing146 = 'currency'))
      ) {
        validate0.errors = [
          {
            instancePath: `${`${path}/total`}/${missing146}`,
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: missing146 },
            message: "must have required property '" + missing146 + "'",
          },
        ];
        return false;
      }
      const prop147 = prop145.amount;
      if (prop147 !== undefined) {
        if (!(typeof prop147 === 'number')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/total`}/amount`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            },
          ];
          return false;
        }
        if (prop147 < 0) {
          validate0.errors = [
            {
              instancePath: `${`${path}/total`}/amount`,
              schemaPath: '#/minimum',
              keyword: 'minimum',
              params: { comparison: '>=', limit: 0 },
              message: 'must be >= 0',
            },
          ];
          return false;
        }
      }
      const prop148 = prop145.currency;
      if (prop148 !== undefined) {
        if (!(typeof prop148 === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/total`}/currency`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
        if (
          !(
            prop148 === 'USD' ||
            prop148 === 'EUR' ||
            prop148 === 'GBP' ||
            prop148 === 'JPY' ||
            prop148 === 'CNY' ||
            prop148 === 'CAD' ||
            prop148 === 'AUD' ||
            prop148 === 'CHF' ||
            prop148 === 'INR' ||
            prop148 === 'MXN'
          )
        ) {
          validate0.errors = [
            {
              instancePath: `${`${path}/total`}/currency`,
              schemaPath: '#/enum',
              keyword: 'enum',
              params: {
                allowedValues: [
                  'USD',
                  'EUR',
                  'GBP',
                  'JPY',
                  'CNY',
                  'CAD',
                  'AUD',
                  'CHF',
                  'INR',
                  'MXN',
                ],
              },
              message: 'must be equal to one of the allowed values',
            },
          ];
          return false;
        }
      }
    }
    const prop149 = data.notes;
    if (prop149 !== undefined) {
      if (!(typeof prop149 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/notes`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      const len150 = ucs2length(prop149);
      if (len150 > 500) {
        validate0.errors = [
          {
            instancePath: `${path}/notes`,
            schemaPath: '#/maxLength',
            keyword: 'maxLength',
            params: { limit: 500 },
            message: 'must NOT have more than 500 characters',
          },
        ];
        return false;
      }
    }
    return true;
  }

  function validate6(data, errors, path) {
    if (!(data && typeof data === 'object' && !Array.isArray(data))) {
      validate0.errors = [
        {
          instancePath: path,
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
    let missing151;
    if (
      (!('id' in data) && (missing151 = 'id')) ||
      (!('method' in data) && (missing151 = 'method')) ||
      (!('amount' in data) && (missing151 = 'amount')) ||
      (!('status' in data) && (missing151 = 'status'))
    ) {
      validate0.errors = [
        {
          instancePath: `${path}/${missing151}`,
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: missing151 },
          message: "must have required property '" + missing151 + "'",
        },
      ];
      return false;
    }
    const prop152 = data.id;
    if (prop152 !== undefined) {
      if (!(typeof prop152 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/id`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop153 = data.method;
    if (prop153 !== undefined) {
      if (!(typeof prop153 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/method`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop153 === 'credit_card' ||
          prop153 === 'debit_card' ||
          prop153 === 'paypal' ||
          prop153 === 'bank_transfer' ||
          prop153 === 'cash' ||
          prop153 === 'check' ||
          prop153 === 'crypto' ||
          prop153 === 'gift_card'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${path}/method`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: {
              allowedValues: [
                'credit_card',
                'debit_card',
                'paypal',
                'bank_transfer',
                'cash',
                'check',
                'crypto',
                'gift_card',
              ],
            },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
    const prop154 = data.amount;
    if (prop154 !== undefined) {
      if (!(prop154 && typeof prop154 === 'object' && !Array.isArray(prop154))) {
        validate0.errors = [
          {
            instancePath: `${path}/amount`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'object' },
            message: 'must be object',
          },
        ];
        return false;
      }
      let missing155;
      if (
        (!('amount' in prop154) && (missing155 = 'amount')) ||
        (!('currency' in prop154) && (missing155 = 'currency'))
      ) {
        validate0.errors = [
          {
            instancePath: `${`${path}/amount`}/${missing155}`,
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: missing155 },
            message: "must have required property '" + missing155 + "'",
          },
        ];
        return false;
      }
      const prop156 = prop154.amount;
      if (prop156 !== undefined) {
        if (!(typeof prop156 === 'number')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/amount`}/amount`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            },
          ];
          return false;
        }
        if (prop156 < 0) {
          validate0.errors = [
            {
              instancePath: `${`${path}/amount`}/amount`,
              schemaPath: '#/minimum',
              keyword: 'minimum',
              params: { comparison: '>=', limit: 0 },
              message: 'must be >= 0',
            },
          ];
          return false;
        }
      }
      const prop157 = prop154.currency;
      if (prop157 !== undefined) {
        if (!(typeof prop157 === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/amount`}/currency`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
        if (
          !(
            prop157 === 'USD' ||
            prop157 === 'EUR' ||
            prop157 === 'GBP' ||
            prop157 === 'JPY' ||
            prop157 === 'CNY' ||
            prop157 === 'CAD' ||
            prop157 === 'AUD' ||
            prop157 === 'CHF' ||
            prop157 === 'INR' ||
            prop157 === 'MXN'
          )
        ) {
          validate0.errors = [
            {
              instancePath: `${`${path}/amount`}/currency`,
              schemaPath: '#/enum',
              keyword: 'enum',
              params: {
                allowedValues: [
                  'USD',
                  'EUR',
                  'GBP',
                  'JPY',
                  'CNY',
                  'CAD',
                  'AUD',
                  'CHF',
                  'INR',
                  'MXN',
                ],
              },
              message: 'must be equal to one of the allowed values',
            },
          ];
          return false;
        }
      }
    }
    const prop158 = data.status;
    if (prop158 !== undefined) {
      if (!(typeof prop158 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/status`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop158 === 'pending' ||
          prop158 === 'authorized' ||
          prop158 === 'captured' ||
          prop158 === 'refunded' ||
          prop158 === 'failed' ||
          prop158 === 'cancelled'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${path}/status`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: {
              allowedValues: [
                'pending',
                'authorized',
                'captured',
                'refunded',
                'failed',
                'cancelled',
              ],
            },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
    const prop159 = data.transactionId;
    if (prop159 !== undefined) {
      if (!(typeof prop159 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/transactionId`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop160 = data.cardLast4;
    if (prop160 !== undefined) {
      if (!(typeof prop160 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/cardLast4`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (!pattern14.test(prop160)) {
        validate0.errors = [
          {
            instancePath: `${path}/cardLast4`,
            schemaPath: '#/pattern',
            keyword: 'pattern',
            params: { pattern: '^[0-9]{4}$' },
            message: 'must match pattern "^[0-9]{4}$"',
          },
        ];
        return false;
      }
    }
    const prop161 = data.cardBrand;
    if (prop161 !== undefined) {
      if (!(typeof prop161 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/cardBrand`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop161 === 'visa' ||
          prop161 === 'mastercard' ||
          prop161 === 'amex' ||
          prop161 === 'discover' ||
          prop161 === 'jcb' ||
          prop161 === 'unionpay'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${path}/cardBrand`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: {
              allowedValues: ['visa', 'mastercard', 'amex', 'discover', 'jcb', 'unionpay'],
            },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
    const prop162 = data.processedAt;
    if (prop162 !== undefined) {
      if (!(typeof prop162 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/processedAt`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop163 = data.metadata;
    if (prop163 !== undefined) {
      if (!(prop163 && typeof prop163 === 'object' && !Array.isArray(prop163))) {
        validate0.errors = [
          {
            instancePath: `${path}/metadata`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'object' },
            message: 'must be object',
          },
        ];
        return false;
      }
    }
    return true;
  }

  function validate7(data, errors, path) {
    if (!(data && typeof data === 'object' && !Array.isArray(data))) {
      validate0.errors = [
        {
          instancePath: path,
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
    let missing164;
    if (
      (!('id' in data) && (missing164 = 'id')) ||
      (!('carrier' in data) && (missing164 = 'carrier')) ||
      (!('status' in data) && (missing164 = 'status'))
    ) {
      validate0.errors = [
        {
          instancePath: `${path}/${missing164}`,
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: missing164 },
          message: "must have required property '" + missing164 + "'",
        },
      ];
      return false;
    }
    const prop165 = data.id;
    if (prop165 !== undefined) {
      if (!(typeof prop165 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/id`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop166 = data.carrier;
    if (prop166 !== undefined) {
      if (!(typeof prop166 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/carrier`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop166 === 'usps' ||
          prop166 === 'ups' ||
          prop166 === 'fedex' ||
          prop166 === 'dhl' ||
          prop166 === 'amazon' ||
          prop166 === 'other'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${path}/carrier`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: { allowedValues: ['usps', 'ups', 'fedex', 'dhl', 'amazon', 'other'] },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
    const prop167 = data.service;
    if (prop167 !== undefined) {
      if (!(typeof prop167 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/service`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop168 = data.trackingNumber;
    if (prop168 !== undefined) {
      if (!(typeof prop168 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/trackingNumber`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop169 = data.trackingUrl;
    if (prop169 !== undefined) {
      if (!(typeof prop169 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/trackingUrl`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop170 = data.status;
    if (prop170 !== undefined) {
      if (!(typeof prop170 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/status`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (
        !(
          prop170 === 'pending' ||
          prop170 === 'label_created' ||
          prop170 === 'in_transit' ||
          prop170 === 'out_for_delivery' ||
          prop170 === 'delivered' ||
          prop170 === 'exception' ||
          prop170 === 'returned'
        )
      ) {
        validate0.errors = [
          {
            instancePath: `${path}/status`,
            schemaPath: '#/enum',
            keyword: 'enum',
            params: {
              allowedValues: [
                'pending',
                'label_created',
                'in_transit',
                'out_for_delivery',
                'delivered',
                'exception',
                'returned',
              ],
            },
            message: 'must be equal to one of the allowed values',
          },
        ];
        return false;
      }
    }
    const prop171 = data.estimatedDelivery;
    if (prop171 !== undefined) {
      if (!(prop171 && typeof prop171 === 'object' && !Array.isArray(prop171))) {
        validate0.errors = [
          {
            instancePath: `${path}/estimatedDelivery`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'object' },
            message: 'must be object',
          },
        ];
        return false;
      }
      if (!('start' in prop171)) {
        validate0.errors = [
          {
            instancePath: `${`${path}/estimatedDelivery`}/start`,
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: 'start' },
            message: "must have required property \'start\'",
          },
        ];
        return false;
      }
      const prop172 = prop171.start;
      if (prop172 !== undefined) {
        if (!(typeof prop172 === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/estimatedDelivery`}/start`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
      }
      const prop173 = prop171.end;
      if (prop173 !== undefined) {
        if (!(typeof prop173 === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/estimatedDelivery`}/end`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
      }
    }
    const prop174 = data.actualDelivery;
    if (prop174 !== undefined) {
      if (!(typeof prop174 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/actualDelivery`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop175 = data.weight;
    if (prop175 !== undefined) {
      if (!(typeof prop175 === 'number')) {
        validate0.errors = [
          {
            instancePath: `${path}/weight`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'number' },
            message: 'must be number',
          },
        ];
        return false;
      }
      if (prop175 < 0) {
        validate0.errors = [
          {
            instancePath: `${path}/weight`,
            schemaPath: '#/minimum',
            keyword: 'minimum',
            params: { comparison: '>=', limit: 0 },
            message: 'must be >= 0',
          },
        ];
        return false;
      }
    }
    const prop176 = data.cost;
    if (prop176 !== undefined) {
      if (!(prop176 && typeof prop176 === 'object' && !Array.isArray(prop176))) {
        validate0.errors = [
          {
            instancePath: `${path}/cost`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'object' },
            message: 'must be object',
          },
        ];
        return false;
      }
      let missing177;
      if (
        (!('amount' in prop176) && (missing177 = 'amount')) ||
        (!('currency' in prop176) && (missing177 = 'currency'))
      ) {
        validate0.errors = [
          {
            instancePath: `${`${path}/cost`}/${missing177}`,
            schemaPath: '#/required',
            keyword: 'required',
            params: { missingProperty: missing177 },
            message: "must have required property '" + missing177 + "'",
          },
        ];
        return false;
      }
      const prop178 = prop176.amount;
      if (prop178 !== undefined) {
        if (!(typeof prop178 === 'number')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/cost`}/amount`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'number' },
              message: 'must be number',
            },
          ];
          return false;
        }
        if (prop178 < 0) {
          validate0.errors = [
            {
              instancePath: `${`${path}/cost`}/amount`,
              schemaPath: '#/minimum',
              keyword: 'minimum',
              params: { comparison: '>=', limit: 0 },
              message: 'must be >= 0',
            },
          ];
          return false;
        }
      }
      const prop179 = prop176.currency;
      if (prop179 !== undefined) {
        if (!(typeof prop179 === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/cost`}/currency`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
        if (
          !(
            prop179 === 'USD' ||
            prop179 === 'EUR' ||
            prop179 === 'GBP' ||
            prop179 === 'JPY' ||
            prop179 === 'CNY' ||
            prop179 === 'CAD' ||
            prop179 === 'AUD' ||
            prop179 === 'CHF' ||
            prop179 === 'INR' ||
            prop179 === 'MXN'
          )
        ) {
          validate0.errors = [
            {
              instancePath: `${`${path}/cost`}/currency`,
              schemaPath: '#/enum',
              keyword: 'enum',
              params: {
                allowedValues: [
                  'USD',
                  'EUR',
                  'GBP',
                  'JPY',
                  'CNY',
                  'CAD',
                  'AUD',
                  'CHF',
                  'INR',
                  'MXN',
                ],
              },
              message: 'must be equal to one of the allowed values',
            },
          ];
          return false;
        }
      }
    }
    const prop180 = data.items;
    if (prop180 !== undefined) {
      if (!Array.isArray(prop180)) {
        validate0.errors = [
          {
            instancePath: `${path}/items`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'array' },
            message: 'must be array',
          },
        ];
        return false;
      }
      for (let i181 = 0, len182 = prop180.length; i181 < len182; i181++) {
        const item183 = prop180[i181];
        if (!(typeof item183 === 'string')) {
          validate0.errors = [
            {
              instancePath: `${`${path}/items`}/${i181}`,
              schemaPath: '#/type',
              keyword: 'type',
              params: { type: 'string' },
              message: 'must be string',
            },
          ];
          return false;
        }
      }
    }
    return true;
  }

  function validate8(data, errors, path) {
    if (!(data && typeof data === 'object' && !Array.isArray(data))) {
      validate0.errors = [
        {
          instancePath: path,
          schemaPath: '#/type',
          keyword: 'type',
          params: { type: 'object' },
          message: 'must be object',
        },
      ];
      return false;
    }
    let missing184;
    if (
      (!('id' in data) && (missing184 = 'id')) ||
      (!('filename' in data) && (missing184 = 'filename')) ||
      (!('mimeType' in data) && (missing184 = 'mimeType')) ||
      (!('size' in data) && (missing184 = 'size')) ||
      (!('url' in data) && (missing184 = 'url'))
    ) {
      validate0.errors = [
        {
          instancePath: `${path}/${missing184}`,
          schemaPath: '#/required',
          keyword: 'required',
          params: { missingProperty: missing184 },
          message: "must have required property '" + missing184 + "'",
        },
      ];
      return false;
    }
    const prop185 = data.id;
    if (prop185 !== undefined) {
      if (!(typeof prop185 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/id`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop186 = data.filename;
    if (prop186 !== undefined) {
      if (!(typeof prop186 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/filename`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      const len187 = ucs2length(prop186);
      if (len187 < 1) {
        validate0.errors = [
          {
            instancePath: `${path}/filename`,
            schemaPath: '#/minLength',
            keyword: 'minLength',
            params: { limit: 1 },
            message: 'must NOT have fewer than 1 characters',
          },
        ];
        return false;
      }
      if (len187 > 255) {
        validate0.errors = [
          {
            instancePath: `${path}/filename`,
            schemaPath: '#/maxLength',
            keyword: 'maxLength',
            params: { limit: 255 },
            message: 'must NOT have more than 255 characters',
          },
        ];
        return false;
      }
    }
    const prop188 = data.mimeType;
    if (prop188 !== undefined) {
      if (!(typeof prop188 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/mimeType`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (!pattern15.test(prop188)) {
        validate0.errors = [
          {
            instancePath: `${path}/mimeType`,
            schemaPath: '#/pattern',
            keyword: 'pattern',
            params: { pattern: '^[a-z]+/[a-z0-9\\-\\+\\.]+$' },
            message: 'must match pattern "^[a-z]+/[a-z0-9\\-\\+\\.]+$"',
          },
        ];
        return false;
      }
    }
    const prop189 = data.size;
    if (prop189 !== undefined) {
      if (!Number.isInteger(prop189)) {
        validate0.errors = [
          {
            instancePath: `${path}/size`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'integer' },
            message: 'must be integer',
          },
        ];
        return false;
      }
      if (prop189 < 0) {
        validate0.errors = [
          {
            instancePath: `${path}/size`,
            schemaPath: '#/minimum',
            keyword: 'minimum',
            params: { comparison: '>=', limit: 0 },
            message: 'must be >= 0',
          },
        ];
        return false;
      }
      if (prop189 > 104857600) {
        validate0.errors = [
          {
            instancePath: `${path}/size`,
            schemaPath: '#/maximum',
            keyword: 'maximum',
            params: { comparison: '<=', limit: 104857600 },
            message: 'must be <= 104857600',
          },
        ];
        return false;
      }
    }
    const prop190 = data.url;
    if (prop190 !== undefined) {
      if (!(typeof prop190 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/url`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    const prop191 = data.checksum;
    if (prop191 !== undefined) {
      if (!(typeof prop191 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/checksum`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
      if (!pattern16.test(prop191)) {
        validate0.errors = [
          {
            instancePath: `${path}/checksum`,
            schemaPath: '#/pattern',
            keyword: 'pattern',
            params: { pattern: '^[a-f0-9]{64}$' },
            message: 'must match pattern "^[a-f0-9]{64}$"',
          },
        ];
        return false;
      }
    }
    const prop192 = data.uploadedAt;
    if (prop192 !== undefined) {
      if (!(typeof prop192 === 'string')) {
        validate0.errors = [
          {
            instancePath: `${path}/uploadedAt`,
            schemaPath: '#/type',
            keyword: 'type',
            params: { type: 'string' },
            message: 'must be string',
          },
        ];
        return false;
      }
    }
    return true;
  }
  validate0.errors = null;
  return true;
}

// Validator wrapper with .validate() and .assert() methods
const largeOrderValidator = Object.assign(
  function (data) {
    largeOrderValidator.errors = null;
    const errors = [];
    const valid = validate0(data, errors);
    if (!valid) {
      largeOrderValidator.errors = errors;
    }
    return valid;
  },
  {
    errors: null,
    validate(data) {
      const valid = largeOrderValidator(data);
      if (valid) {
        return { value: data, error: undefined };
      }
      return { value: undefined, error: largeOrderValidator.errors };
    },
    assert(data) {
      if (!largeOrderValidator(data)) {
        const error = new Error(largeOrderValidator.errors?.[0]?.message || 'Validation failed');
        error.errors = largeOrderValidator.errors;
        throw error;
      }
      return data;
    },
  }
);

export { largeOrderValidator };
export default largeOrderValidator;
