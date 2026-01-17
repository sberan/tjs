// Test the functional type handler
import generateTypeCheck from './core/keywords/value/type-functional.js';
import { Name, _ } from './core/codegen.js';

// Mock context
const mockCtx = {
  schema: { type: 'string' },
  data: new Name('data'),
  path: _`''`,
  isVocabularyEnabled: () => true,
  getMainFuncName: () => new Name('validate0'),
};

console.log('=== Single type: string ===');
const result1 = generateTypeCheck(mockCtx);
console.log(result1.toString());
console.log();

// Test with number
mockCtx.schema = { type: 'number' };
console.log('=== Single type: number ===');
const result2 = generateTypeCheck(mockCtx);
console.log(result2.toString());
console.log();

// Test with multiple types (optimizable)
mockCtx.schema = { type: ['string', 'number'] };
console.log('=== Union type: string | number (optimizable) ===');
const result3 = generateTypeCheck(mockCtx);
console.log(result3.toString());
console.log();

// Test with mixed types (not optimizable)
mockCtx.schema = { type: ['string', 'array'] };
console.log('=== Union type: string | array ===');
const result4 = generateTypeCheck(mockCtx);
console.log(result4.toString());
