// Core code generation components
import { type CodeNode, RenderContext, renderNode } from './runtime.js';

// Indentation helper
function ind(ctx: RenderContext): string {
  return '  '.repeat(ctx.indent);
}

// Raw line of code
export function Line(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): string {
  const content = typeof children === 'string' ? children : '';
  return `${ind(ctx)}${content}\n`;
}

// Code block with braces
export function Block(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const innerCtx = ctx.indented();
  return [
    `{\n`,
    renderNode(children, innerCtx),
    `${ind(ctx)}}`,
  ];
}

// If statement
export function If(
  { test, children }: { test: string; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const innerCtx = ctx.indented();
  return [
    `${ind(ctx)}if (${test}) {\n`,
    renderNode(children, innerCtx),
    `${ind(ctx)}}\n`,
  ];
}

// Else clause (must follow If)
export function Else(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const innerCtx = ctx.indented();
  return [
    ` else {\n`,
    renderNode(children, innerCtx),
    `${ind(ctx)}}\n`,
  ];
}

// If-Else combined
export function IfElse(
  { test, then, else: elseBlock }: { test: string; then: CodeNode; else?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const innerCtx = ctx.indented();
  const result: CodeNode[] = [
    `${ind(ctx)}if (${test}) {\n`,
    renderNode(then, innerCtx),
    `${ind(ctx)}}`,
  ];

  if (elseBlock) {
    result.push(
      ` else {\n`,
      renderNode(elseBlock, innerCtx),
      `${ind(ctx)}}`
    );
  }
  result.push('\n');
  return result;
}

// Const declaration
export function Const(
  { name, value }: { name?: string; value: string },
  ctx: RenderContext
): CodeNode {
  const varName = name ?? ctx.genVar();
  return `${ind(ctx)}const ${varName} = ${value};\n`;
}

// Let declaration
export function Let(
  { name, value }: { name?: string; value?: string },
  ctx: RenderContext
): CodeNode {
  const varName = name ?? ctx.genVar();
  const assignment = value !== undefined ? ` = ${value}` : '';
  return `${ind(ctx)}let ${varName}${assignment};\n`;
}

// For loop
export function For(
  { init, test, update, children }: { init: string; test: string; update: string; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const innerCtx = ctx.indented();
  return [
    `${ind(ctx)}for (${init}; ${test}; ${update}) {\n`,
    renderNode(children, innerCtx),
    `${ind(ctx)}}\n`,
  ];
}

// For-of loop
export function ForOf(
  { item, iterable, children }: { item: string; iterable: string; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const innerCtx = ctx.indented();
  return [
    `${ind(ctx)}for (const ${item} of ${iterable}) {\n`,
    renderNode(children, innerCtx),
    `${ind(ctx)}}\n`,
  ];
}

// Return statement
export function Return(
  { value }: { value?: string },
  ctx: RenderContext
): CodeNode {
  if (value === undefined) {
    return `${ind(ctx)}return;\n`;
  }
  return `${ind(ctx)}return ${value};\n`;
}

// Statement (any expression as statement)
export function Stmt(
  { children }: { children?: string },
  ctx: RenderContext
): CodeNode {
  return `${ind(ctx)}${children ?? ''};\n`;
}

// Raw code (no processing)
export function Raw(
  { children }: { children?: string },
  _ctx: RenderContext
): CodeNode {
  return children ?? '';
}
