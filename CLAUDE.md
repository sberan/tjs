# CLAUDE.md

## Project Overview
json-schema-ts - A JSON Schema validator library with TypeScript type inference.

## Commands
- `npm test` - Run all tests (type tests)
- `npm run test:types` - Run type tests only
- `npm run build` - Build the project

## Project Structure
- `src/` - Source code
  - `index.ts` - Main entry point, exports `schema()` function
  - `infer.ts` - TypeScript type inference from JSON Schema
  - `types.ts` - Core type definitions
- `tests/types/` - Type-level tests (`.test-d.ts` files)
- `dist/` - Built output

## Development Notes
- Type tests use the `Expect<Equal<...>>` pattern for compile-time assertions
- The `schema()` function returns a `Validator<T>` where T is inferred from the schema
- Run `npm test` to verify type inference is working correctly
