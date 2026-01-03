# Build-Time Schema Compilation

tjs supports compiling JSON Schema validators at build time, producing standalone validator modules that don't require the tjs compiler at runtime. This can reduce bundle sizes by **up to 95%**.

## Bundle Size Comparison

| Schema Complexity | Runtime Compilation | Build-Time Compilation | Reduction |
|-------------------|---------------------|------------------------|-----------|
| Simple (user schema) | ~23 KB gzipped | ~1 KB gzipped | **95%** |
| Large (14 $defs, enterprise) | ~25 KB gzipped | ~6 KB gzipped | **77%** |

## When to Use Build-Time Compilation

**Use build-time compilation when:**
- Bundle size is critical (mobile, edge functions, browser)
- Schemas are known at build time
- You want the fastest possible cold-start time

**Use runtime compilation when:**
- Schemas are dynamic or user-provided
- Development/prototyping (simpler workflow)
- Server-side where bundle size is less critical

## Quick Start

### Using the CLI

```bash
# Compile a schema to a standalone validator module
npx tjs compile schema.json -o validator.js

# Generate CommonJS instead of ESM
npx tjs compile schema.json -o validator.cjs --format cjs
```

### Using the API

```typescript
import { compileToModule } from 'tjs/standalone';
import { writeFileSync } from 'fs';

const schema = {
  type: 'object',
  properties: {
    name: { type: 'string' },
    email: { type: 'string', format: 'email' }
  },
  required: ['name', 'email']
};

const code = compileToModule(schema, {
  exportName: 'validateUser',
  format: 'esm'
});

writeFileSync('validators/user.js', code);
```

## CLI Reference

```
Usage: tjs compile <schema> [options]

Arguments:
  schema              Path to JSON Schema file

Options:
  -o, --output       Output file path (default: stdout)
  -n, --name         Export name for the validator (default: "validate")
  -f, --format       Module format: "esm" or "cjs" (default: "esm")
  -h, --help         Show help
```

### Examples

```bash
# Basic usage
tjs compile user-schema.json -o src/validators/user.js

# Named export
tjs compile order-schema.json -o validators/order.js --name validateOrder

# CommonJS format
tjs compile config-schema.json -o validators/config.cjs --format cjs

# Multiple schemas in build script
for schema in schemas/*.json; do
  name=$(basename "$schema" .json)
  tjs compile "$schema" -o "validators/${name}.js" --name "validate${name^}"
done
```

## API Reference

### `compileToModule(schema, options?)`

Compiles a JSON Schema to a standalone validator module.

```typescript
import { compileToModule } from 'tjs/standalone';

const code = compileToModule(schema, {
  exportName: 'validate',  // Name of the exported function
  format: 'esm'            // 'esm' or 'cjs'
});
```

**Returns:** A string containing the complete validator module code.

### `compileMultipleToModule(schemas, options?)`

Compiles multiple schemas into a single module with named exports.

```typescript
import { compileMultipleToModule } from 'tjs/standalone';

const code = compileMultipleToModule({
  User: userSchema,
  Product: productSchema,
  Order: orderSchema
}, {
  format: 'esm'
});

// Generates:
// export function validateUser(data) { ... }
// export function validateProduct(data) { ... }
// export function validateOrder(data) { ... }
```

## Generated Validator API

The generated validator functions have this signature:

```typescript
interface ValidationResult {
  valid: boolean;
  errors?: Array<{
    path: string;
    message: string;
    keyword: string;
  }>;
}

function validate(data: unknown): ValidationResult;
```

### Usage Example

```javascript
import { validate } from './validators/user.js';

const result = validate({ name: 'Alice', email: 'alice@example.com' });

if (result.valid) {
  console.log('Valid!');
} else {
  console.log('Errors:', result.errors);
}
```

## Build Tool Integration

### Webpack

Pre-compile schemas as part of your build:

```javascript
// build-schemas.js
import { compileToModule } from 'tjs/standalone';
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { glob } from 'glob';

mkdirSync('src/validators', { recursive: true });

for (const file of glob.sync('schemas/*.json')) {
  const schema = JSON.parse(readFileSync(file, 'utf8'));
  const name = file.replace('schemas/', '').replace('.json', '');
  const code = compileToModule(schema, {
    exportName: `validate${name.charAt(0).toUpperCase() + name.slice(1)}`
  });
  writeFileSync(`src/validators/${name}.js`, code);
}
```

Add to your build script:
```json
{
  "scripts": {
    "prebuild": "node build-schemas.js",
    "build": "webpack"
  }
}
```

### Vite

Same approach works with Vite:

```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  // Pre-compile schemas before Vite build
  plugins: [{
    name: 'compile-schemas',
    buildStart() {
      // Run schema compilation here
    }
  }]
});
```

### esbuild

```javascript
import * as esbuild from 'esbuild';
import { compileToModule } from 'tjs/standalone';

// Pre-compile schemas first, then bundle
await esbuild.build({
  entryPoints: ['src/index.js'],
  bundle: true,
  outfile: 'dist/bundle.js',
});
```

## Running the Benchmark

The webpack benchmark is included in the repository:

```bash
cd benchmarks/webpack
npm install
npm run benchmark
```

This will:
1. Build multiple bundles with different schema configurations
2. Compare runtime compilation vs build-time compilation
3. Display raw and gzipped sizes

Sample output:
```
╔══════════════════════════════════════════════════════════════════╗
║           TJS Webpack Bundle Size Benchmark                       ║
╚══════════════════════════════════════════════════════════════════╝

┌─────────────────┬────────────────┬────────────────┐
│ Entry           │ Raw Size       │ Gzipped        │
├─────────────────┼────────────────┼────────────────┤
│ minimal         │      66.84 KB  │      23.01 KB  │
│ medium          │      67.54 KB  │      23.18 KB  │
│ complex         │      68.23 KB  │      23.49 KB  │
│ large           │      73.19 KB  │      24.90 KB  │
│ precompiled     │       2.35 KB  │       1.04 KB  │
│ precompiled-large│     13.85 KB  │       5.82 KB  │
└─────────────────┴────────────────┴────────────────┘

SAVINGS BY SCHEMA SIZE:
  Simple schema: 23.18 KB → 1.04 KB (95.5% smaller)
  Large schema:  24.90 KB → 5.82 KB (76.6% smaller)
```

## Technical Details

### What's Included in Compiled Validators

Compiled validators are self-contained and include only what's needed:
- The validation logic for your specific schema
- Required runtime helpers (deep equality, string length for unicode, format validators)
- No compiler, no schema parser, no unused features

### Format Validation

Format validators are included only if your schema uses them:

```javascript
// Schema with email format
{
  type: 'string',
  format: 'email'
}

// Generated code includes only email validation
const formatValidators = {
  email: (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)
};
```

### Limitations

- Generated validators don't support dynamic schema changes
- Remote `$ref` URLs must be resolved at compile time
- Type inference requires importing types separately:

```typescript
// types.ts (manual type definition)
export interface User {
  name: string;
  email: string;
}

// user-validator.js (generated)
import { validate } from './user-validator.js';
import type { User } from './types';

const result = validate(data);
if (result.valid) {
  const user = data as User;
}
```

For full type inference with runtime compilation, use the standard `schema()` function instead.
