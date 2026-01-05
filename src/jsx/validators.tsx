// Semantic validation components
/* @jsx jsx */
import { jsx, type CodeNode, RenderContext, renderNode } from './runtime.js';
import { DataContext, ErrorContext, type DataPath } from './context.js';
import { _, str, when } from './template.js';

// =============================================================================
// Context Helpers
// =============================================================================

function useData(ctx: RenderContext) {
  return ctx.get(DataContext);
}

function useErrors(ctx: RenderContext) {
  return ctx.get(ErrorContext);
}

// Render JSX within templates
function $(node: CodeNode, ctx: RenderContext): string {
  return renderNode(node, ctx);
}

// =============================================================================
// WithData - updates data context for children
// =============================================================================

export function WithData(
  { expr, path, children }: { expr: string; path: string; children?: CodeNode },
  ctx: RenderContext
): string {
  const newCtx = ctx.with(DataContext, { expr, path });
  return renderNode(children, newCtx);
}

// =============================================================================
// Error Generation
// =============================================================================

export function Error(
  { keyword, message, params }: { keyword: string; message: string; params?: Record<string, unknown> },
  ctx: RenderContext
): string {
  const { path } = useData(ctx);
  const { errorsVar } = useErrors(ctx);

  const errorObj = { instancePath: path, keyword, message, ...(params ?? {}) };
  return `${errorsVar}.push(${str(errorObj)});`;
}

// =============================================================================
// Type Keyword
// =============================================================================

export function TypeCheck(
  { type }: { type: string | readonly string[] },
  ctx: RenderContext
): string {
  const { expr: data } = useData(ctx);
  const types = Array.isArray(type) ? type : [type];

  if (types.length === 1) {
    const t = types[0];
    return _`
if (!(${getTypeCheck(data, t)})) {
  ${$(<Error keyword="type" message={`must be ${t}`} params={{ type: t }} />, ctx)}
}
`;
  }

  // Multiple types - try optimizations
  const canOptimizeWithTypeof = types.every(t => t === 'string' || t === 'number' || t === 'boolean');

  if (canOptimizeWithTypeof) {
    const typeVar = ctx.genVar('t');
    const checks = types.map(t => `${typeVar} === "${t}"`).join(' || ');
    return _`
const ${typeVar} = typeof ${data};
if (!(${checks})) {
  ${$(<Error keyword="type" message={`must be ${types.join(' or ')}`} params={{ type: types }} />, ctx)}
}
`;
  }

  const optimizedCheck = getOptimizedUnionTypeCheck(data, types);
  if (optimizedCheck) {
    return _`
if (!(${optimizedCheck})) {
  ${$(<Error keyword="type" message={`must be ${types.join(' or ')}`} params={{ type: types }} />, ctx)}
}
`;
  }

  const checks = types.map(t => getTypeCheck(data, t)).join(' || ');
  return _`
if (!(${checks})) {
  ${$(<Error keyword="type" message={`must be ${types.join(' or ')}`} params={{ type: types }} />, ctx)}
}
`;
}

function getTypeCheck(data: string, type: string): string {
  switch (type) {
    case 'string': return `typeof ${data} === "string"`;
    case 'number': return `typeof ${data} === "number"`;
    case 'integer': return `Number.isInteger(${data})`;
    case 'boolean': return `typeof ${data} === "boolean"`;
    case 'null': return `${data} === null`;
    case 'array': return `Array.isArray(${data})`;
    case 'object': return `(${data} && typeof ${data} === "object" && !Array.isArray(${data}))`;
    default: return 'false';
  }
}

function getOptimizedUnionTypeCheck(data: string, types: readonly string[]): string | undefined {
  const key = [...types].sort().join(',');
  switch (key) {
    case 'number,string': return `(typeof ${data} === "string" || typeof ${data} === "number")`;
    case 'boolean,number,string': return `(typeof ${data} === "string" || typeof ${data} === "number" || typeof ${data} === "boolean")`;
    case 'null,string': return `(${data} === null || typeof ${data} === "string")`;
    case 'null,number': return `(${data} === null || typeof ${data} === "number")`;
    case 'array,object': return `(typeof ${data} === "object" && ${data} !== null)`;
    case 'array,null,object': return `(typeof ${data} === "object")`;
    case 'integer,number': return `(typeof ${data} === "number")`;
    case 'array,null': return `(${data} === null || Array.isArray(${data}))`;
    case 'null,object': return `(${data} === null || (typeof ${data} === "object" && !Array.isArray(${data})))`;
  }
  return undefined;
}

// =============================================================================
// String Validation
// =============================================================================

export function StringType(
  { minLength, maxLength, pattern }: { minLength?: number; maxLength?: number; pattern?: string },
  ctx: RenderContext
): string {
  const { expr: data } = useData(ctx);
  const hasConstraints = minLength !== undefined || maxLength !== undefined || pattern !== undefined;

  return _`
${$(<TypeCheck type="string" />, ctx)}
${when(hasConstraints, _`
if (typeof ${data} === "string") {
  ${when(minLength !== undefined, _`
  if (${data}.length < ${minLength}) {
    ${$(<Error keyword="minLength" message={`must have at least ${minLength} characters`} params={{ limit: minLength }} />, ctx)}
  }
  `)}
  ${when(maxLength !== undefined, _`
  if (${data}.length > ${maxLength}) {
    ${$(<Error keyword="maxLength" message={`must have at most ${maxLength} characters`} params={{ limit: maxLength }} />, ctx)}
  }
  `)}
  ${when(pattern !== undefined, _`
  if (!/${pattern}/.test(${data})) {
    ${$(<Error keyword="pattern" message={`must match pattern ${pattern}`} params={{ pattern }} />, ctx)}
  }
  `)}
}
`)}
`;
}

// =============================================================================
// Number Validation
// =============================================================================

export function NumberType(
  { min, max, exclusiveMin, exclusiveMax, multipleOf, integer }: {
    min?: number; max?: number; exclusiveMin?: number; exclusiveMax?: number; multipleOf?: number; integer?: boolean;
  },
  ctx: RenderContext
): string {
  const { expr: data } = useData(ctx);
  const hasConstraints = min !== undefined || max !== undefined || exclusiveMin !== undefined || exclusiveMax !== undefined || multipleOf !== undefined;

  return _`
${$(<TypeCheck type={integer ? 'integer' : 'number'} />, ctx)}
${when(hasConstraints, _`
if (typeof ${data} === "number") {
  ${when(min !== undefined, _`
  if (${data} < ${min}) {
    ${$(<Error keyword="minimum" message={`must be >= ${min}`} params={{ comparison: '>=', limit: min }} />, ctx)}
  }
  `)}
  ${when(max !== undefined, _`
  if (${data} > ${max}) {
    ${$(<Error keyword="maximum" message={`must be <= ${max}`} params={{ comparison: '<=', limit: max }} />, ctx)}
  }
  `)}
  ${when(exclusiveMin !== undefined, _`
  if (${data} <= ${exclusiveMin}) {
    ${$(<Error keyword="exclusiveMinimum" message={`must be > ${exclusiveMin}`} params={{ comparison: '>', limit: exclusiveMin }} />, ctx)}
  }
  `)}
  ${when(exclusiveMax !== undefined, _`
  if (${data} >= ${exclusiveMax}) {
    ${$(<Error keyword="exclusiveMaximum" message={`must be < ${exclusiveMax}`} params={{ comparison: '<', limit: exclusiveMax }} />, ctx)}
  }
  `)}
  ${when(multipleOf !== undefined, _`
  if (${Number.isInteger(multipleOf) ? `${data} % ${multipleOf} !== 0` : `Math.abs(Math.round(${data} / ${multipleOf}) * ${multipleOf} - ${data}) > 1e-10`}) {
    ${$(<Error keyword="multipleOf" message={`must be a multiple of ${multipleOf}`} params={{ multipleOf }} />, ctx)}
  }
  `)}
}
`)}
`;
}

// =============================================================================
// Object Scope
// =============================================================================

export function ObjectScope(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): string {
  const { expr: data } = useData(ctx);

  return _`
${$(<TypeCheck type="object" />, ctx)}
if (${data} && typeof ${data} === "object" && !Array.isArray(${data})) {
${$(children, ctx.indented())}
}
`;
}

// =============================================================================
// Property Validation
// =============================================================================

export function Property(
  { name, required, children }: { name: string; required?: boolean; children?: CodeNode },
  ctx: RenderContext
): string {
  const { expr: data, path } = useData(ctx);
  const propExpr = `${data}[${str(name)}]`;
  const propPath = `${path}/${name}`;
  const ind = '  '.repeat(ctx.indent);

  return _`
${when(required === true, _`
${ind}if (!(${str(name)} in ${data})) {
${ind}  ${$(<Error keyword="required" message={`must have required property '${name}'`} params={{ missingProperty: name }} />, ctx)}
${ind}}
`)}
${ind}if (${str(name)} in ${data}) {
${$(<WithData expr={propExpr} path={propPath}>{children}</WithData>, ctx)}
${ind}}
`;
}

// =============================================================================
// Array Scope
// =============================================================================

export function ArrayScope(
  { minItems, maxItems, children }: { minItems?: number; maxItems?: number; children?: CodeNode },
  ctx: RenderContext
): string {
  const { expr: data } = useData(ctx);

  return _`
${$(<TypeCheck type="array" />, ctx)}
if (Array.isArray(${data})) {
  ${when(minItems !== undefined, _`
  if (${data}.length < ${minItems}) {
    ${$(<Error keyword="minItems" message={`must have at least ${minItems} items`} params={{ limit: minItems }} />, ctx)}
  }
  `)}
  ${when(maxItems !== undefined, _`
  if (${data}.length > ${maxItems}) {
    ${$(<Error keyword="maxItems" message={`must have at most ${maxItems} items`} params={{ limit: maxItems }} />, ctx)}
  }
  `)}
${$(children, ctx.indented())}
}
`;
}

// =============================================================================
// Array Items
// =============================================================================

export function Items(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): string {
  const { expr: data, path } = useData(ctx);
  const i = ctx.genVar('i');

  return _`
for (let ${i} = 0; ${i} < ${data}.length; ${i}++) {
${$(<WithData expr={`${data}[${i}]`} path={`${path}/\${${i}}`}>{children}</WithData>, ctx)}
}
`;
}

// =============================================================================
// Simple Types
// =============================================================================

export function BooleanType(_: {}, ctx: RenderContext): string {
  return $(<TypeCheck type="boolean" />, ctx);
}

export function NullType(_: {}, ctx: RenderContext): string {
  return $(<TypeCheck type="null" />, ctx);
}

// =============================================================================
// Const & Enum
// =============================================================================

export function ConstValue({ value }: { value: unknown }, ctx: RenderContext): string {
  const { expr: data } = useData(ctx);

  if (value === null || typeof value !== 'object') {
    return _`
if (${data} !== ${str(value)}) {
  ${$(<Error keyword="const" message="must be equal to constant" params={{ allowedValue: value }} />, ctx)}
}
`;
  }

  return _`
if (JSON.stringify(${data}) !== ${str(JSON.stringify(value))}) {
  ${$(<Error keyword="const" message="must be equal to constant" params={{ allowedValue: value }} />, ctx)}
}
`;
}

export function EnumValue({ values }: { values: readonly unknown[] }, ctx: RenderContext): string {
  const { expr: data } = useData(ctx);

  if (values.every(v => v === null || typeof v !== 'object')) {
    const checks = values.map(v => `${data} === ${str(v)}`).join(' || ');
    return _`
if (!(${checks})) {
  ${$(<Error keyword="enum" message="must be one of the allowed values" params={{ allowedValues: values }} />, ctx)}
}
`;
  }

  const jsonValues = values.map(v => str(JSON.stringify(v))).join(', ');
  return _`
if (![${jsonValues}].includes(JSON.stringify(${data}))) {
  ${$(<Error keyword="enum" message="must be one of the allowed values" params={{ allowedValues: values }} />, ctx)}
}
`;
}
