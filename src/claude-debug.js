import { createValidator } from '../dist/core/index.js';

const s = createValidator({
  type: 'object',
  properties: {
    foo: { type: 'string' },
    bar: { type: 'number' },
    baz: { type: 'boolean' },
    qux: { type: 'string' },
    quux: { type: 'number' },
  },
  unevaluatedProperties: false,
});

console.log(s.toString());
