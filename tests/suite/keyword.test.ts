import { describe, it, expect } from 'vitest';
import { loadSingleFile } from './loader.js';
import { runTestSuite } from './runner.js';

// Test a single keyword in isolation
function testKeyword(keyword: string) {
  describe(`Keyword: ${keyword}`, () => {
    const file = loadSingleFile(keyword);

    if (!file) {
      it.skip(`${keyword}.json not found`, () => {});
      return;
    }

    for (const group of file.groups) {
      describe(group.description, () => {
        for (const test of group.tests) {
          it(test.description, () => {
            const report = runTestSuite([
              {
                ...file,
                groups: [
                  {
                    ...group,
                    tests: [test],
                  },
                ],
              },
            ]);

            expect(report.passed).toBe(1);
          });
        }
      });
    }
  });
}

// Core keywords - must pass 100%
testKeyword('type');
testKeyword('const');
testKeyword('enum');
testKeyword('properties');
testKeyword('required');
testKeyword('additionalProperties');
testKeyword('items');
testKeyword('prefixItems');
testKeyword('allOf');
testKeyword('anyOf');
testKeyword('oneOf');
testKeyword('not');
testKeyword('if-then-else');
testKeyword('ref');
testKeyword('defs');
testKeyword('boolean_schema');

// Validation keywords
testKeyword('minimum');
testKeyword('maximum');
testKeyword('exclusiveMinimum');
testKeyword('exclusiveMaximum');
testKeyword('multipleOf');
testKeyword('minLength');
testKeyword('maxLength');
testKeyword('pattern');
testKeyword('minItems');
testKeyword('maxItems');
testKeyword('uniqueItems');
testKeyword('minProperties');
testKeyword('maxProperties');

// Phase 1 keywords
testKeyword('contains');
testKeyword('minContains');
testKeyword('maxContains');
testKeyword('dependentRequired');

// Phase 2 keywords
testKeyword('patternProperties');
testKeyword('propertyNames');
testKeyword('anchor');

// Phase 3 keywords
testKeyword('dependentSchemas');
testKeyword('unevaluatedItems');
testKeyword('unevaluatedProperties');
testKeyword('content');

// Not implemented - expected to fail
testKeyword('dynamicRef');
testKeyword('refRemote');
