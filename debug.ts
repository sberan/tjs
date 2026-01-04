import { schema } from './src/index.js';

const S = schema({
  type: 'object',
  properties: {
    value: { type: 'number' },
    left: { $ref: '#' },
    right: { $ref: '#' },
  },
  required: ['value'],
});

S.type;
