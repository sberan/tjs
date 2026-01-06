// Check format (annotation mode - no validation) - why is this slow?
import { compile } from '../dist/core/compiler.js';
import { validator as schemasafe } from '@exodus/schemasafe';

// Format from benchmark - should just do type check since formatAssertion is false
const formatSchema = { format: "email" };
const tjs = compile(formatSchema, { legacyRef: true });
const ss = schemasafe(formatSchema, { mode: 'lax', includeErrors: true });

console.log("TJS format email (annotation mode):");
console.log(tjs.toString());
console.log("\nSchemasSafe format email:");
console.log(ss.toString());
