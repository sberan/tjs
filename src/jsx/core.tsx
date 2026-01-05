// Core code generation components
import type { CodeNode, RenderContext } from './runtime.js';

// Indentation helper
function indent(level: number): string {
  return '  '.repeat(level);
}

// Raw line of code
export function Line(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): string {
  const content = typeof children === 'string' ? children : '';
  return `${indent(ctx.indent)}${content}\n`;
}

// Code block with braces
export function Block(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const innerCtx = { ...ctx, indent: ctx.indent + 1 };
  return [
    `{\n`,
    renderChildren(children, innerCtx),
    `${indent(ctx.indent)}}`,
  ];
}

// If statement
export function If(
  { test, children }: { test: string; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const innerCtx = { ...ctx, indent: ctx.indent + 1 };
  return [
    `${indent(ctx.indent)}if (${test}) {\n`,
    renderChildren(children, innerCtx),
    `${indent(ctx.indent)}}\n`,
  ];
}

// Else clause (must follow If)
export function Else(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  // Remove the newline from previous If and add else
  const innerCtx = { ...ctx, indent: ctx.indent + 1 };
  return [
    ` else {\n`,
    renderChildren(children, innerCtx),
    `${indent(ctx.indent)}}\n`,
  ];
}

// If-Else combined
export function IfElse(
  { test, then, else: elseBlock }: { test: string; then: CodeNode; else?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const innerCtx = { ...ctx, indent: ctx.indent + 1 };
  const result: CodeNode[] = [
    `${indent(ctx.indent)}if (${test}) {\n`,
    renderChildren(then, innerCtx),
    `${indent(ctx.indent)}}`,
  ];

  if (elseBlock) {
    result.push(
      ` else {\n`,
      renderChildren(elseBlock, innerCtx),
      `${indent(ctx.indent)}}`
    );
  }
  result.push('\n');
  return result;
}

// Const declaration
export function Const(
  { name, value, children }: { name?: string; value: string; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const varName = name ?? ctx.genVar();
  return `${indent(ctx.indent)}const ${varName} = ${value};\n`;
}

// Let declaration
export function Let(
  { name, value }: { name?: string; value?: string },
  ctx: RenderContext
): CodeNode {
  const varName = name ?? ctx.genVar();
  const assignment = value !== undefined ? ` = ${value}` : '';
  return `${indent(ctx.indent)}let ${varName}${assignment};\n`;
}

// For loop
export function For(
  { init, test, update, children }: { init: string; test: string; update: string; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const innerCtx = { ...ctx, indent: ctx.indent + 1 };
  return [
    `${indent(ctx.indent)}for (${init}; ${test}; ${update}) {\n`,
    renderChildren(children, innerCtx),
    `${indent(ctx.indent)}}\n`,
  ];
}

// For-of loop
export function ForOf(
  { item, iterable, children }: { item: string; iterable: string; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const innerCtx = { ...ctx, indent: ctx.indent + 1 };
  return [
    `${indent(ctx.indent)}for (const ${item} of ${iterable}) {\n`,
    renderChildren(children, innerCtx),
    `${indent(ctx.indent)}}\n`,
  ];
}

// Return statement
export function Return(
  { value }: { value?: string },
  ctx: RenderContext
): CodeNode {
  if (value === undefined) {
    return `${indent(ctx.indent)}return;\n`;
  }
  return `${indent(ctx.indent)}return ${value};\n`;
}

// Statement (any expression as statement)
export function Stmt(
  { children }: { children?: string },
  ctx: RenderContext
): CodeNode {
  return `${indent(ctx.indent)}${children ?? ''};\n`;
}

// Raw code (no processing)
export function Raw(
  { children }: { children?: string },
  _ctx: RenderContext
): CodeNode {
  return children ?? '';
}

// Helper to render children
function renderChildren(children: CodeNode, ctx: RenderContext): CodeNode {
  if (!children) return '';
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children.map(child => {
      if (typeof child === 'function') {
        return (child as any)({}, ctx);
      }
      if (typeof child === 'object' && child !== null && 'type' in child) {
        const { type, props, children: c } = child;
        if (typeof type === 'function') {
          return type({ ...props, children: c }, ctx);
        }
      }
      return child;
    });
  }
  return children;
}
