// Semantic validation components
/* @jsx jsx */
import { jsx, type CodeNode, type CodeElement, RenderContext, renderNode } from './runtime.js';
import { DataContext, ErrorContext, type DataPath } from './context.js';
import { If, Const, For, Stmt } from './core.js';

// WithData - updates the data context for children
export function WithData(
  { expr, path, children }: { expr: string; path: string; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  // Create a new context with updated DataContext
  const newDataPath: DataPath = { expr, path };
  const newCtx = ctx.with(DataContext, newDataPath);

  // Render children with the new context using the runtime's renderNode
  return renderNode(children, newCtx);
}

// =============================================================================
// Error Generation
// =============================================================================

export function Error(
  { keyword, message, params }: { keyword: string; message: string; params?: Record<string, unknown> },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const errorCtx = ctx.get(ErrorContext);

  const errorObj: Record<string, unknown> = {
    instancePath: dataCtx.path,
    keyword,
    message,
    ...(params ?? {}),
  };

  return <Stmt>{`${errorCtx.errorsVar}.push(${JSON.stringify(errorObj)})`}</Stmt>;
}

// =============================================================================
// Type Keyword - Full Implementation
// =============================================================================

export function TypeCheck(
  { type }: { type: string | readonly string[] },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const data = dataCtx.expr;

  const types = Array.isArray(type) ? type : [type];

  if (types.length === 1) {
    // Single type - simple check
    const t = types[0];
    const check = getTypeCheck(data, t);
    return (
      <If test={`!(${check})`}>
        <Error keyword="type" message={`must be ${t}`} params={{ type: t }} />
      </If>
    );
  }

  // Multiple types - try optimizations
  const canOptimizeWithTypeof = types.every(
    t => t === 'string' || t === 'number' || t === 'boolean'
  );

  if (canOptimizeWithTypeof) {
    // Cache typeof result for efficiency
    const typeVar = ctx.genVar('t');
    const checks = types.map(t => `${typeVar} === "${t}"`);
    return [
      <Const name={typeVar} value={`typeof ${data}`} />,
      <If test={`!(${checks.join(' || ')})`}>
        <Error keyword="type" message={`must be ${types.join(' or ')}`} params={{ type: types }} />
      </If>,
    ];
  }

  // Try optimized union check for common patterns
  const optimizedCheck = getOptimizedUnionTypeCheck(data, types);
  if (optimizedCheck) {
    return (
      <If test={`!(${optimizedCheck})`}>
        <Error keyword="type" message={`must be ${types.join(' or ')}`} params={{ type: types }} />
      </If>
    );
  }

  // Fallback: OR individual type checks
  const checks = types.map(t => getTypeCheck(data, t));
  return (
    <If test={`!(${checks.join(' || ')})`}>
      <Error keyword="type" message={`must be ${types.join(' or ')}`} params={{ type: types }} />
    </If>
  );
}

// =============================================================================
// Type Check Helpers
// =============================================================================

function getTypeCheck(data: string, type: string): string {
  switch (type) {
    case 'string':
      return `typeof ${data} === "string"`;
    case 'number':
      return `typeof ${data} === "number"`;
    case 'integer':
      return `Number.isInteger(${data})`;
    case 'boolean':
      return `typeof ${data} === "boolean"`;
    case 'null':
      return `${data} === null`;
    case 'array':
      return `Array.isArray(${data})`;
    case 'object':
      return `(${data} && typeof ${data} === "object" && !Array.isArray(${data}))`;
    default:
      return 'false';
  }
}

/**
 * Get optimized type check for common union patterns.
 * Returns undefined if no optimization is available.
 */
function getOptimizedUnionTypeCheck(data: string, types: readonly string[]): string | undefined {
  // Sort to normalize for pattern matching
  const sorted = [...types].sort();
  const key = sorted.join(',');

  switch (key) {
    case 'number,string': {
      const t = `typeof ${data}`;
      return `(${t} === "string" || ${t} === "number")`;
    }
    case 'boolean,number,string': {
      const t = `typeof ${data}`;
      return `(${t} === "string" || ${t} === "number" || ${t} === "boolean")`;
    }
    case 'null,string':
      return `(${data} === null || typeof ${data} === "string")`;
    case 'null,number':
      return `(${data} === null || typeof ${data} === "number")`;
    case 'array,object':
      // array OR object means typeof === 'object' && not null
      return `(typeof ${data} === "object" && ${data} !== null)`;
    case 'array,null,object':
      // array OR object OR null means typeof === 'object'
      return `(typeof ${data} === "object")`;
    case 'boolean,null':
      return `(${data} === null || typeof ${data} === "boolean")`;
    case 'integer,string':
      return `(Number.isInteger(${data}) || typeof ${data} === "string")`;
    case 'integer,number':
      // integer OR number - both are numbers
      return `(typeof ${data} === "number")`;
    case 'array,null':
      return `(${data} === null || Array.isArray(${data}))`;
    case 'null,object':
      return `(${data} === null || (typeof ${data} === "object" && !Array.isArray(${data})))`;
  }

  return undefined;
}

// =============================================================================
// String Validation
// =============================================================================

export function StringType(
  { minLength, maxLength, pattern }: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const data = dataCtx.expr;

  const checks: CodeNode[] = [];

  // Type check first
  checks.push(<TypeCheck type="string" />);

  // Only do string validations if it's a string
  const stringChecks: CodeNode[] = [];

  if (minLength !== undefined) {
    stringChecks.push(
      <If test={`${data}.length < ${minLength}`}>
        <Error keyword="minLength" message={`must have at least ${minLength} characters`} params={{ limit: minLength }} />
      </If>
    );
  }

  if (maxLength !== undefined) {
    stringChecks.push(
      <If test={`${data}.length > ${maxLength}`}>
        <Error keyword="maxLength" message={`must have at most ${maxLength} characters`} params={{ limit: maxLength }} />
      </If>
    );
  }

  if (pattern !== undefined) {
    stringChecks.push(
      <If test={`!/${pattern}/.test(${data})`}>
        <Error keyword="pattern" message={`must match pattern ${pattern}`} params={{ pattern }} />
      </If>
    );
  }

  if (stringChecks.length > 0) {
    checks.push(
      <If test={`typeof ${data} === "string"`}>
        {stringChecks}
      </If>
    );
  }

  return checks;
}

// =============================================================================
// Number Validation
// =============================================================================

export function NumberType(
  { min, max, exclusiveMin, exclusiveMax, multipleOf, integer }: {
    min?: number;
    max?: number;
    exclusiveMin?: number;
    exclusiveMax?: number;
    multipleOf?: number;
    integer?: boolean;
  },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const data = dataCtx.expr;

  const checks: CodeNode[] = [];
  const expectedType = integer ? 'integer' : 'number';

  // Type check
  checks.push(<TypeCheck type={expectedType} />);

  // Number-specific validations (only run if it's a number)
  const numChecks: CodeNode[] = [];

  if (min !== undefined) {
    numChecks.push(
      <If test={`${data} < ${min}`}>
        <Error keyword="minimum" message={`must be >= ${min}`} params={{ comparison: '>=', limit: min }} />
      </If>
    );
  }

  if (max !== undefined) {
    numChecks.push(
      <If test={`${data} > ${max}`}>
        <Error keyword="maximum" message={`must be <= ${max}`} params={{ comparison: '<=', limit: max }} />
      </If>
    );
  }

  if (exclusiveMin !== undefined) {
    numChecks.push(
      <If test={`${data} <= ${exclusiveMin}`}>
        <Error keyword="exclusiveMinimum" message={`must be > ${exclusiveMin}`} params={{ comparison: '>', limit: exclusiveMin }} />
      </If>
    );
  }

  if (exclusiveMax !== undefined) {
    numChecks.push(
      <If test={`${data} >= ${exclusiveMax}`}>
        <Error keyword="exclusiveMaximum" message={`must be < ${exclusiveMax}`} params={{ comparison: '<', limit: exclusiveMax }} />
      </If>
    );
  }

  if (multipleOf !== undefined) {
    // Handle floating point precision issues
    const isInteger = Number.isInteger(multipleOf);
    const check = isInteger
      ? `${data} % ${multipleOf} !== 0`
      : `Math.abs(Math.round(${data} / ${multipleOf}) * ${multipleOf} - ${data}) > 1e-10`;
    numChecks.push(
      <If test={check}>
        <Error keyword="multipleOf" message={`must be a multiple of ${multipleOf}`} params={{ multipleOf }} />
      </If>
    );
  }

  if (numChecks.length > 0) {
    checks.push(
      <If test={`typeof ${data} === "number"`}>
        {numChecks}
      </If>
    );
  }

  return checks;
}

// =============================================================================
// Object Scope
// =============================================================================

export function ObjectScope(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const data = dataCtx.expr;

  return [
    <TypeCheck type="object" />,
    <If test={`${data} && typeof ${data} === "object" && !Array.isArray(${data})`}>
      {children}
    </If>,
  ];
}

// =============================================================================
// Property Validation
// =============================================================================

export function Property(
  { name, required, children }: { name: string; required?: boolean; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const data = dataCtx.expr;
  const propExpr = `${data}[${JSON.stringify(name)}]`;
  const propPath = `${dataCtx.path}/${name}`;

  const result: CodeNode[] = [];

  if (required) {
    result.push(
      <If test={`!(${JSON.stringify(name)} in ${data})`}>
        <Error keyword="required" message={`must have required property '${name}'`} params={{ missingProperty: name }} />
      </If>
    );
  }

  // Validate the property if it exists
  result.push(
    <If test={`${JSON.stringify(name)} in ${data}`}>
      <WithData expr={propExpr} path={propPath}>
        {children}
      </WithData>
    </If>
  );

  return result;
}

// =============================================================================
// Array Scope
// =============================================================================

export function ArrayScope(
  { minItems, maxItems, children }: { minItems?: number; maxItems?: number; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const data = dataCtx.expr;

  const result: CodeNode[] = [
    <TypeCheck type="array" />,
  ];

  const arrayChecks: CodeNode[] = [];

  if (minItems !== undefined) {
    arrayChecks.push(
      <If test={`${data}.length < ${minItems}`}>
        <Error keyword="minItems" message={`must have at least ${minItems} items`} params={{ limit: minItems }} />
      </If>
    );
  }

  if (maxItems !== undefined) {
    arrayChecks.push(
      <If test={`${data}.length > ${maxItems}`}>
        <Error keyword="maxItems" message={`must have at most ${maxItems} items`} params={{ limit: maxItems }} />
      </If>
    );
  }

  if (arrayChecks.length > 0 || children) {
    result.push(
      <If test={`Array.isArray(${data})`}>
        {arrayChecks}
        {children}
      </If>
    );
  }

  return result;
}

// =============================================================================
// Array Items Validation
// =============================================================================

export function Items(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const data = dataCtx.expr;
  const indexVar = ctx.genVar('i');
  const itemExpr = `${data}[${indexVar}]`;
  const itemPath = `${dataCtx.path}/` + '${' + indexVar + '}';  // Template for dynamic path

  return (
    <For init={`let ${indexVar} = 0`} test={`${indexVar} < ${data}.length`} update={`${indexVar}++`}>
      <WithData expr={itemExpr} path={itemPath}>
        {children}
      </WithData>
    </For>
  );
}

// =============================================================================
// Boolean Type
// =============================================================================

export function BooleanType(
  _props: {},
  ctx: RenderContext
): CodeNode {
  return <TypeCheck type="boolean" />;
}

// =============================================================================
// Null Type
// =============================================================================

export function NullType(
  _props: {},
  ctx: RenderContext
): CodeNode {
  return <TypeCheck type="null" />;
}

// =============================================================================
// Const Validation
// =============================================================================

export function ConstValue(
  { value }: { value: unknown },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const data = dataCtx.expr;

  // For primitives, use direct comparison
  if (value === null || typeof value !== 'object') {
    return (
      <If test={`${data} !== ${JSON.stringify(value)}`}>
        <Error keyword="const" message="must be equal to constant" params={{ allowedValue: value }} />
      </If>
    );
  }

  // For objects/arrays, need deep equality (simplified for spike)
  return (
    <If test={`JSON.stringify(${data}) !== ${JSON.stringify(JSON.stringify(value))}`}>
      <Error keyword="const" message="must be equal to constant" params={{ allowedValue: value }} />
    </If>
  );
}

// =============================================================================
// Enum Validation
// =============================================================================

export function EnumValue(
  { values }: { values: readonly unknown[] },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const data = dataCtx.expr;

  // For all primitives, use direct comparison
  if (values.every(v => v === null || typeof v !== 'object')) {
    const checks = values.map(v => `${data} === ${JSON.stringify(v)}`);
    return (
      <If test={`!(${checks.join(' || ')})`}>
        <Error keyword="enum" message="must be one of the allowed values" params={{ allowedValues: values }} />
      </If>
    );
  }

  // Mixed or complex values - use JSON.stringify (simplified)
  const jsonValues = values.map(v => JSON.stringify(v));
  return (
    <If test={`![${jsonValues.map(j => JSON.stringify(j)).join(', ')}].includes(JSON.stringify(${data}))`}>
      <Error keyword="enum" message="must be one of the allowed values" params={{ allowedValues: values }} />
    </If>
  );
}
