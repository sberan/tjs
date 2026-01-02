#!/usr/bin/env node
/**
 * TJS CLI - Build-time schema compilation
 *
 * Usage:
 *   npx tjs compile schema.json -o validator.js
 *   npx tjs compile schema.json --esm -o validator.mjs
 *   npx tjs compile schema.json --cjs -o validator.cjs
 */

import { readFileSync, writeFileSync } from 'fs';
import { basename, extname } from 'path';
import { compileToModule, compileMultipleToModule } from './core/standalone.js';
import type { JsonSchema } from './types.js';

interface CliArgs {
  command: string;
  inputs: string[];
  output?: string;
  format: 'esm' | 'cjs';
  exportName?: string;
  help: boolean;
}

function parseArgs(args: string[]): CliArgs {
  const result: CliArgs = {
    command: '',
    inputs: [],
    format: 'esm',
    help: false,
  };

  let i = 0;
  while (i < args.length) {
    const arg = args[i];

    if (arg === '-h' || arg === '--help') {
      result.help = true;
    } else if (arg === '-o' || arg === '--output') {
      result.output = args[++i];
    } else if (arg === '--esm') {
      result.format = 'esm';
    } else if (arg === '--cjs') {
      result.format = 'cjs';
    } else if (arg === '-n' || arg === '--name') {
      result.exportName = args[++i];
    } else if (!arg.startsWith('-')) {
      if (!result.command) {
        result.command = arg;
      } else {
        result.inputs.push(arg);
      }
    }
    i++;
  }

  return result;
}

function printHelp(): void {
  console.log(`
TJS - Build-time JSON Schema Compilation

Usage:
  tjs compile <schema.json> [options]     Compile a schema to a standalone validator
  tjs compile <a.json> <b.json> [options] Compile multiple schemas to one module

Options:
  -o, --output <file>   Output file path (default: stdout)
  -n, --name <name>     Export name for the validator (default: 'validator')
  --esm                 Output ES modules format (default)
  --cjs                 Output CommonJS format
  -h, --help            Show this help message

Examples:
  # Compile a schema to ES module
  tjs compile user-schema.json -o user-validator.js

  # Compile with custom export name
  tjs compile user.json -n userValidator -o validators.js

  # Compile multiple schemas to one file
  tjs compile user.json post.json -o validators.js

  # Output CommonJS
  tjs compile schema.json --cjs -o validator.cjs
`);
}

function loadSchema(filePath: string): JsonSchema {
  const content = readFileSync(filePath, 'utf-8');
  return JSON.parse(content) as JsonSchema;
}

function deriveExportName(filePath: string): string {
  const base = basename(filePath, extname(filePath));
  // Convert to camelCase
  return base
    .replace(/[-_.]([a-z])/g, (_, c) => c.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase())
    .replace(/[^a-zA-Z0-9]/g, '');
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));

  if (args.help || !args.command) {
    printHelp();
    process.exit(args.help ? 0 : 1);
  }

  if (args.command !== 'compile') {
    console.error(`Unknown command: ${args.command}`);
    console.error('Run "tjs --help" for usage information.');
    process.exit(1);
  }

  if (args.inputs.length === 0) {
    console.error('Error: No input files specified');
    console.error('Run "tjs --help" for usage information.');
    process.exit(1);
  }

  let output: string;

  if (args.inputs.length === 1) {
    // Single schema
    const schema = loadSchema(args.inputs[0]);
    const exportName = args.exportName || deriveExportName(args.inputs[0]);
    output = compileToModule(schema, {
      exportName,
      format: args.format,
    });
  } else {
    // Multiple schemas
    const schemas: Record<string, JsonSchema> = {};
    for (const input of args.inputs) {
      const name = deriveExportName(input);
      schemas[name] = loadSchema(input);
    }
    output = compileMultipleToModule(schemas, {
      format: args.format,
    });
  }

  if (args.output) {
    writeFileSync(args.output, output);
    console.log(`Compiled to ${args.output}`);
  } else {
    console.log(output);
  }
}

main();
