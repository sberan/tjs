import { createValidatorAsync } from './core/index.js';

// Test case: "ignore unrecognized optional vocabulary"
const remotes = {
  'http://localhost:1234/draft2019-09/metaschema-optional-vocabulary.json': {
    $schema: 'https://json-schema.org/draft/2019-09/schema',
    $id: 'http://localhost:1234/draft2019-09/metaschema-optional-vocabulary.json',
    $vocabulary: {
      'https://json-schema.org/draft/2019-09/vocab/validation': true,
      'https://json-schema.org/draft/2019-09/vocab/core': true,
      'http://localhost:1234/draft/2019-09/vocab/custom': false, // Optional vocabulary - should be ignored
    },
    $recursiveAnchor: true,
    allOf: [
      { $ref: 'https://json-schema.org/draft/2019-09/meta/validation' },
      { $ref: 'https://json-schema.org/draft/2019-09/meta/core' },
    ],
  },
};

const schema = {
  $schema: 'http://localhost:1234/draft2019-09/metaschema-optional-vocabulary.json',
  type: 'number',
} as const;

async function test() {
  try {
    const validator = await createValidatorAsync(schema as any, {
      defaultMeta: 'draft2019-09',
      remotes: remotes as any,
    });

    // Test: string value should be invalid
    const data1 = 'foobar';
    const result1 = validator(data1);
    console.log('Test 1 - string value:');
    console.log('Data:', JSON.stringify(data1));
    console.log('Expected: false, Got:', result1);

    // Test: number value should be valid
    const data2 = 20;
    const result2 = validator(data2);
    console.log('\nTest 2 - number value:');
    console.log('Data:', JSON.stringify(data2));
    console.log('Expected: true, Got:', result2);
  } catch (e) {
    console.error('Error:', e);
  }
}

test();
