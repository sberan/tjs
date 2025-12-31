/*
 * this file is for any scratch work that claude might help with
 */

import { schema } from '../dist/index.js';
import { Bench } from 'tinybench';

// Test schema from the benchmark
const testSchema = {
  $schema: 'https://json-schema.org/v1',
  not: {
    anyOf: [true, { properties: { foo: true } }],
    unevaluatedProperties: false,
  },
};

const v = schema(testSchema);

// Warm up
for (let i = 0; i < 1000; i++) {
  v.assert({ bar: 1 });
  try {
    v.assert({ foo: 1 });
  } catch {}
}

// Benchmark
const bench = new Bench({ time: 1000 });
bench
  .add('valid case { bar: 1 }', () => {
    v.assert({ bar: 1 });
  })
  .add('invalid case { foo: 1 }', () => {
    try {
      v.assert({ foo: 1 });
    } catch {}
  });

await bench.run();
console.table(bench.table());
