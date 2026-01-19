// Test the functional type handler
import generateTypeCheck from './core/keywords/value/type-functional.js';
import { Name, _ } from './core/codegen.js';

// Mock context - minimal version of CompileContext
const createMockCtx = (schema) => ({
  schema,
  data: new Name('data'),
  path: _`''`,
  isVocabularyEnabled: () => true,
  getMainFuncName: () => new Name('validate'),
});

console.log('='.repeat(60));
console.log('FUNCTIONAL TYPE HANDLER - PROTOTYPE');
console.log('='.repeat(60));

// Test 1: Single type
console.log('\n--- { type: "string" } ---\n');
console.log(generateTypeCheck(createMockCtx({ type: 'string' })).toString());

// Test 2: Single type (number)
console.log('\n--- { type: "number" } ---\n');
console.log(generateTypeCheck(createMockCtx({ type: 'number' })).toString());

// Test 3: Single type (array)
console.log('\n--- { type: "array" } ---\n');
console.log(generateTypeCheck(createMockCtx({ type: 'array' })).toString());

// Test 4: Union type (optimizable - all typeof)
console.log('\n--- { type: ["string", "number"] } (typeof optimized) ---\n');
console.log(generateTypeCheck(createMockCtx({ type: ['string', 'number'] })).toString());

// Test 5: Union type (mixed - not all typeof)
console.log('\n--- { type: ["string", "array"] } ---\n');
console.log(generateTypeCheck(createMockCtx({ type: ['string', 'array'] })).toString());

// Test 6: Union with null
console.log('\n--- { type: ["string", "null"] } ---\n');
console.log(generateTypeCheck(createMockCtx({ type: ['string', 'null'] })).toString());

// Test 7: No type (should return empty)
console.log('\n--- {} (no type) ---\n');
const noType = generateTypeCheck(createMockCtx({}));
console.log(noType.isEmpty ? '(empty block)' : noType.toString());
