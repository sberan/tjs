import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as expectType from 'eslint-plugin-expect-type';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default [
  // Ignore debug files and dist
  {
    ignores: ['src/debug.ts', 'dist/**'],
  },
  // Prettier config for all files
  eslintConfigPrettier,
  // TypeScript files with Prettier
  {
    files: ['src/**/*.ts', 'tests/**/*.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },
  // Type tests with expect-type plugin (more lenient on unused vars for type testing)
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
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
];
