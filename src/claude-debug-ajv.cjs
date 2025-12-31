const Ajv = require('ajv').default;
const ajv = new Ajv({ code: { source: true, lines: true } });

const schema = {
  properties: {
    foo: {},
    bar: {}
  },
  required: ["foo"]
};

const validate = ajv.compile(schema);
console.log('=== AJV Generated Code ===');
console.log(validate.toString());

const schema2 = {
  properties: {
    foo: {},
    bar: {},
    baz: {}
  },
  required: ["foo", "bar", "baz"]
};
const validate2 = ajv.compile(schema2);
console.log('\n=== AJV Multiple Required ===');
console.log(validate2.toString());
