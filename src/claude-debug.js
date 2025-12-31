/*
 * this file is for any scratch work that claude might help with
 */

import { schema } from '../dist/index.js';
import * as fs from 'fs';

// Load test schemas
const treeSchema = JSON.parse(
  fs.readFileSync('./tests/json-schema-test-suite/remotes/draft2020-12/tree.json', 'utf-8')
);
const strictTreeTest = JSON.parse(
  fs.readFileSync('./tests/json-schema-test-suite/draft2020-12/dynamicRef.json', 'utf-8')
);

// Find the strict-tree test
const strictTreeSchema = strictTreeTest.find(
  (t) => t.description === 'strict-tree schema, guards against misspelled properties'
).schema;

console.log('=== strict-tree schema ===');
console.log(JSON.stringify(strictTreeSchema, null, 2));

const v = schema(strictTreeSchema, {
  schemas: [treeSchema],
  draft: '2020-12',
});

console.log('\n=== Generated Code ===');
console.log(v.toString());
