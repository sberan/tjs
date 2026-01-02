/**
 * Debug pattern validation - see generated code
 */

import { createValidator } from './core/index.js';

const validator = createValidator({ pattern: '^a*$' });

console.log('Generated code:');
console.log(validator.toString());

// Also test with type constraint
const validator2 = createValidator({ type: 'string', pattern: '^a*$' });

console.log('\n\nWith type constraint:');
console.log(validator2.toString());
