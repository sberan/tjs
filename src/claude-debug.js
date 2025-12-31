/*
 * this file is for any scratch work that claude might help with
 */

// Microbenchmark to compare integer check performance
console.log('=== INTEGER CHECK MICROBENCHMARK ===\n');

const iterations = 100_000_000;
const testValue = 42;

// Test 1: Number.isInteger
console.time('Number.isInteger');
for (let i = 0; i < iterations; i++) {
  Number.isInteger(testValue);
}
console.timeEnd('Number.isInteger');

// Test 2: typeof + modulo + isFinite
console.time('typeof + % + isFinite');
for (let i = 0; i < iterations; i++) {
  typeof testValue === 'number' && testValue % 1 === 0 && isFinite(testValue);
}
console.timeEnd('typeof + % + isFinite');

// Test with non-integer
const nonInteger = 42.5;

console.log('\n=== NON-INTEGER VALUE ===');
console.time('Number.isInteger (non-int)');
for (let i = 0; i < iterations; i++) {
  Number.isInteger(nonInteger);
}
console.timeEnd('Number.isInteger (non-int)');

console.time('typeof + % + isFinite (non-int)');
for (let i = 0; i < iterations; i++) {
  typeof nonInteger === 'number' && nonInteger % 1 === 0 && isFinite(nonInteger);
}
console.timeEnd('typeof + % + isFinite (non-int)');
