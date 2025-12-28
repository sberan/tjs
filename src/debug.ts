import { schema, struct } from './index.js';

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
const xss = NotStringNumber.validate('hello');
type NotStringNumberType = typeof NotStringNumber.type;
//   ^? hover to see - should be boolean | null | JsonArray | JsonObject

const Person = struct({
  name: { type: 'string' },
  age: { type: 'integer', optional: true },
  friend: { $ref: '#' },
});

// Person(data) returns boolean (type guard for validation)
// Use Person.assert(data) to get typed data back
const alice = Person.assert({
  name: 'Alice',
  friend: {
    name: 'Bob',
    friend: {
      name: 'Charlie',
    },
  },
});
type PersonType = typeof Person.type;
//   ^? hover to see - should be { name: string; friend?: PersonType }

// Test the recursive type
declare const p: PersonType;
p.name; // string
p.friend?.name; // string (recursive!)
p.friend?.friend?.name; // string (deeply recursive!)
