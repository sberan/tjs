const { schema } = require('./index');

// Simple pattern test
const validator = schema({ pattern: '^a*$' });

console.log('Generated function:');
console.log(validator.validate.toString());

console.log('\n\nTesting:');
console.log(validator.validate('aaa'));
console.log(validator.validate('abc'));
