import tsParser from '@typescript-eslint/parser';
import * as expectType from 'eslint-plugin-expect-type';

export default [
  {
    files: ['tests/types/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tests/types/tsconfig.json',
      },
    },
    plugins: {
      'expect-type': expectType,
    },
    rules: {
      'expect-type/expect': 'error',
    },
  },
];
