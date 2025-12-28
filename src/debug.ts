import { schema } from './index.js';

const Obj1 = schema({
  type: 'object',
  properties: {
    a: { type: 'string' },
    b: { type: 'number' },
  },
  required: ['b'],
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

const Person = schema({
  type: 'object',
  properties: {
    name: { type: 'string' },
    friend: { $ref: '#' },
  },
  required: ['name'],
});

type PersonType = typeof Person.type;
//   ^? hover to see - should be { name: string; friend?: PersonType }

// Test the recursive type
declare const p: PersonType;
p.name; // string
p.friend?.name; // string (recursive!)
p.friend?.friend?.name; // string (deeply recursive!)
