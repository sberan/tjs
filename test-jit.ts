import { ValidatorJIT } from './src/jit/index.js';

// Test validation with JIT
const stringV = new ValidatorJIT({ type: 'string' });
console.log('--- Testing type: string ---');
console.log('hello passes:', stringV.validate('hello'));
console.log('123 fails:', !stringV.validate(123));
console.log('null fails:', !stringV.validate(null));

const intV = new ValidatorJIT({ type: 'integer' });
console.log('\n--- Testing type: integer ---');
console.log('42 passes:', intV.validate(42));
console.log('3.14 fails:', !intV.validate(3.14));
console.log('"42" fails:', !intV.validate('42'));

const multiV = new ValidatorJIT({ type: ['string', 'number'] });
console.log('\n--- Testing type: [string, number] ---');
console.log('"hello" passes:', multiV.validate('hello'));
console.log('42 passes:', multiV.validate(42));
console.log('null fails:', !multiV.validate(null));

const objV = new ValidatorJIT({ type: 'object' });
console.log('\n--- Testing type: object ---');
console.log('{} passes:', objV.validate({}));
console.log('[] fails:', !objV.validate([]));
console.log('null fails:', !objV.validate(null));

// Test properties
const propsV = new ValidatorJIT({
  type: 'object',
  properties: {
    name: { type: 'string' },
    age: { type: 'integer' },
  },
  required: ['name'],
});
console.log('\n--- Testing properties ---');
console.log('{ name: "John" } passes:', propsV.validate({ name: 'John' }));
console.log('{ name: "John", age: 30 } passes:', propsV.validate({ name: 'John', age: 30 }));
console.log('{} fails (missing required):', !propsV.validate({}));
console.log('{ name: 123 } fails (wrong type):', !propsV.validate({ name: 123 }));

console.log('\nJIT works!');
