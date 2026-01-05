// Semantic validation components
/* @jsx jsx */
import { jsx, type CodeNode, type RenderContext, type CodeElement } from './runtime.js';
import { DataContext, ErrorContext, type DataPath } from './context.js';
import { If, Const, For, Stmt } from './core.js';

// WithData - updates the data context for children
export function WithData(
  { expr, path, children }: { expr: string; path: string; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  // Create a new context with updated DataContext
  const newDataPath: DataPath = { expr, path };
  const newCtx: RenderContext = {
    ...ctx,
    get(context) {
      if (context === DataContext) return newDataPath as any;
      return ctx.get(context);
    },
  };

  // Render children with the new context
  return renderWithContext(children, newCtx);
}

// Helper to render children with a specific context
function renderWithContext(children: CodeNode, ctx: RenderContext): CodeNode {
  if (!children) return '';
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children.map(child => renderWithContext(child, ctx));
  }
  // It's a CodeElement
  const elem = children as CodeElement;
  if (typeof elem.type === 'function') {
    return elem.type({ ...elem.props, children: elem.children }, ctx);
  }
  return renderWithContext(elem.children, ctx);
}

// Type check component
export function TypeCheck(
  { type, children }: { type: string | string[]; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const errorCtx = ctx.get(ErrorContext);
  const data = dataCtx.expr;

  const types = Array.isArray(type) ? type : [type];

  if (types.length === 1) {
    const t = types[0];
    const check = getTypeCheck(data, t);
    const negatedCheck = negateCheck(check);

    return (
      <If test={negatedCheck}>
        <Stmt>{`${errorCtx.errorsVar}.push({ instancePath: "${dataCtx.path}", keyword: "type", message: "must be ${t}" })`}</Stmt>
      </If>
    );
  }

  // Multiple types - cache typeof
  const typeVar = ctx.genVar('t');
  const checks = types.map(t => getTypeCheckWithVar(typeVar, data, t));
  const combined = checks.join(' && ');

  return [
    <Const name={typeVar} value={`typeof ${data}`} />,
    <If test={combined}>
      <Stmt>{`${errorCtx.errorsVar}.push({ instancePath: "${dataCtx.path}", keyword: "type", message: "must be ${types.join(' or ')}" })`}</Stmt>
    </If>,
  ];
}

// String validation
export function StringType(
  { minLength, maxLength, pattern, children }: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
    children?: CodeNode;
  },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const errorCtx = ctx.get(ErrorContext);
  const data = dataCtx.expr;

  const checks: CodeNode[] = [];

  // Type check first
  checks.push(
    <If test={`typeof ${data} !== "string"`}>
      <Stmt>{`${errorCtx.errorsVar}.push({ instancePath: "${dataCtx.path}", keyword: "type", message: "must be string" })`}</Stmt>
    </If>
  );

  // Only do string validations if it's a string
  const stringChecks: CodeNode[] = [];

  if (minLength !== undefined) {
    stringChecks.push(
      <If test={`${data}.length < ${minLength}`}>
        <Stmt>{`${errorCtx.errorsVar}.push({ instancePath: "${dataCtx.path}", keyword: "minLength", message: "must have at least ${minLength} characters" })`}</Stmt>
      </If>
    );
  }

  if (maxLength !== undefined) {
    stringChecks.push(
      <If test={`${data}.length > ${maxLength}`}>
        <Stmt>{`${errorCtx.errorsVar}.push({ instancePath: "${dataCtx.path}", keyword: "maxLength", message: "must have at most ${maxLength} characters" })`}</Stmt>
      </If>
    );
  }

  if (pattern !== undefined) {
    stringChecks.push(
      <If test={`!/${pattern}/.test(${data})`}>
        <Stmt>{`${errorCtx.errorsVar}.push({ instancePath: "${dataCtx.path}", keyword: "pattern", message: "must match pattern ${pattern}" })`}</Stmt>
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

// Number validation
export function NumberType(
  { min, max, integer, children }: {
    min?: number;
    max?: number;
    integer?: boolean;
    children?: CodeNode;
  },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const errorCtx = ctx.get(ErrorContext);
  const data = dataCtx.expr;

  const checks: CodeNode[] = [];
  const expectedType = integer ? 'integer' : 'number';

  // Type check
  const typeCheck = integer
    ? `typeof ${data} !== "number" || !Number.isInteger(${data})`
    : `typeof ${data} !== "number"`;

  checks.push(
    <If test={typeCheck}>
      <Stmt>{`${errorCtx.errorsVar}.push({ instancePath: "${dataCtx.path}", keyword: "type", message: "must be ${expectedType}" })`}</Stmt>
    </If>
  );

  // Number-specific validations
  const numChecks: CodeNode[] = [];

  if (min !== undefined) {
    numChecks.push(
      <If test={`${data} < ${min}`}>
        <Stmt>{`${errorCtx.errorsVar}.push({ instancePath: "${dataCtx.path}", keyword: "minimum", message: "must be >= ${min}" })`}</Stmt>
      </If>
    );
  }

  if (max !== undefined) {
    numChecks.push(
      <If test={`${data} > ${max}`}>
        <Stmt>{`${errorCtx.errorsVar}.push({ instancePath: "${dataCtx.path}", keyword: "maximum", message: "must be <= ${max}" })`}</Stmt>
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

// Object scope - tracks properties
export function ObjectScope(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const errorCtx = ctx.get(ErrorContext);
  const data = dataCtx.expr;

  return [
    <If test={`typeof ${data} !== "object" || ${data} === null || Array.isArray(${data})`}>
      <Stmt>{`${errorCtx.errorsVar}.push({ instancePath: "${dataCtx.path}", keyword: "type", message: "must be object" })`}</Stmt>
    </If>,
    <If test={`typeof ${data} === "object" && ${data} !== null && !Array.isArray(${data})`}>
      {children}
    </If>,
  ];
}

// Property validation - uses a wrapper to update context
export function Property(
  { name, required, children }: { name: string; required?: boolean; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const errorCtx = ctx.get(ErrorContext);
  const data = dataCtx.expr;
  const propExpr = `${data}[${JSON.stringify(name)}]`;
  const propPath = `${dataCtx.path}/${name}`;

  const result: CodeNode[] = [];

  if (required) {
    result.push(
      <If test={`!(${JSON.stringify(name)} in ${data})`}>
        <Stmt>{`${errorCtx.errorsVar}.push({ instancePath: "${dataCtx.path}", keyword: "required", message: "must have required property '${name}'" })`}</Stmt>
      </If>
    );
  }

  // Validate the property if it exists - use WithData to update context
  result.push(
    <If test={`${JSON.stringify(name)} in ${data}`}>
      <WithData expr={propExpr} path={propPath}>
        {children}
      </WithData>
    </If>
  );

  return result;
}

// Array scope
export function ArrayScope(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const errorCtx = ctx.get(ErrorContext);
  const data = dataCtx.expr;

  return [
    <If test={`!Array.isArray(${data})`}>
      <Stmt>{`${errorCtx.errorsVar}.push({ instancePath: "${dataCtx.path}", keyword: "type", message: "must be array" })`}</Stmt>
    </If>,
    <If test={`Array.isArray(${data})`}>
      {children}
    </If>,
  ];
}

// Array items validation
export function Items(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const dataCtx = ctx.get(DataContext);
  const data = dataCtx.expr;
  const indexVar = ctx.genVar('i');

  return (
    <For init={`let ${indexVar} = 0`} test={`${indexVar} < ${data}.length`} update={`${indexVar}++`}>
      {/* Here we'd update DataContext to point to data[i] */}
      {children}
    </For>
  );
}

// Helper functions
function getTypeCheck(data: string, type: string): string {
  switch (type) {
    case 'string':
      return `typeof ${data} === "string"`;
    case 'number':
      return `typeof ${data} === "number"`;
    case 'integer':
      return `typeof ${data} === "number" && Number.isInteger(${data})`;
    case 'boolean':
      return `typeof ${data} === "boolean"`;
    case 'null':
      return `${data} === null`;
    case 'array':
      return `Array.isArray(${data})`;
    case 'object':
      return `typeof ${data} === "object" && ${data} !== null && !Array.isArray(${data})`;
    default:
      return 'true';
  }
}

function getTypeCheckWithVar(typeVar: string, data: string, type: string): string {
  switch (type) {
    case 'string':
      return `${typeVar} !== "string"`;
    case 'number':
      return `${typeVar} !== "number"`;
    case 'integer':
      return `${typeVar} !== "number" || !Number.isInteger(${data})`;
    case 'boolean':
      return `${typeVar} !== "boolean"`;
    case 'null':
      return `${data} !== null`;
    case 'array':
      return `!Array.isArray(${data})`;
    case 'object':
      return `${typeVar} !== "object" || ${data} === null || Array.isArray(${data})`;
    default:
      return 'false';
  }
}

function negateCheck(check: string): string {
  if (check.startsWith('!')) {
    return check.slice(1);
  }
  return `!(${check})`;
}
