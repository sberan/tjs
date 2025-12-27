import { schema } from './index.js';

const Obj1 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
});

type Actual = typeof Obj1.type;
//   ^? hover to see

// Test what the type actually is
declare const x: Actual;
x.a; // check if optional
x.b;

const NotStringNumber = schema({
  not: {
    type: ['string', 'number'],
  },
});

type NotStringNumberType = typeof NotStringNumber.type;
//   ^? hover to see - should be boolean | null | JsonArray | JsonObject
