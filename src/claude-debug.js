import { createValidator } from '../dist/core/index.js';

// Test different enum patterns
const schemas = [
  { name: '3 primitives', def: { enum: [1, 2, 3] } },
  { name: '6 primitives', def: { enum: [1, 2, 3, 4, 5, 6] } },
  { name: '3 strings', def: { enum: ['a', 'b', 'c'] } },
  { name: '6 strings', def: { enum: ['a', 'b', 'c', 'd', 'e', 'f'] } },
  { name: '10 strings', def: { enum: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'] } },
];

for (const { name, def } of schemas) {
  const v = createValidator(def);
  console.log(`\n=== ${name} ===`);
  console.log(v.toString());
}
