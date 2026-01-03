# CLAUDE.md

## Project Overview
tjs - A JSON Schema validator library with TypeScript type inference.

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
- When creating debug test files, use `/private/tmp/debug.js` instead of files in the project directory
- Use Write tool to create files instead of cat/heredoc in Bash

## API Reference
When making API changes, **always update README.md** to reflect the current API:
- `schema(definition, options?)` - Creates a validator from JSON Schema
- `struct(properties, options?)` - Ergonomic helper for object schemas
- `schemaAsync(definition, options?)` - Async version that fetches remote $refs

### Validator Methods
- `validator.validate(data)` - Returns `{ value: T, error: undefined }` on success, `{ value: undefined, error: ValidationError[] }` on failure
- `validator.assert(data)` - Returns typed value `T` on success, throws on failure
- `validator.type` - Phantom property for type inference (`typeof validator.type`)
- `validator.schema` - The JSON Schema definition, can be used for schema composition

### Important
- There is NO `.parse()` method - use `.assert()` for throwing validation or `.validate()` for result-based
- `.validate()` returns an object `{ value, error }`, NOT a boolean
- ALWAYS use src/claude-debug.js for any scratch work. do no use heredocs or shell scripts or cat commands.
