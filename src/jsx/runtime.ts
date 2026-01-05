// JSX Runtime for Code Generation
// Instead of creating DOM nodes, we accumulate code strings

export type CodeNode = string | CodeElement | CodeNode[] | null | undefined | false;

export interface CodeElement {
  type: string | ComponentFn;
  props: Record<string, unknown>;
  children: CodeNode[];
}

export type ComponentFn = (props: Record<string, unknown>, ctx: RenderContext) => CodeNode;

// Context system - like React context but simpler
export interface ContextValue<T> {
  _brand: 'context';
  defaultValue: T;
}

export function createContext<T>(defaultValue: T): ContextValue<T> {
  return { _brand: 'context', defaultValue };
}

// Mutable render context that can be extended
export class RenderContext {
  private values: Map<ContextValue<unknown>, unknown>;
  private _varCounter: number;
  indent: number;

  constructor(
    values?: Map<ContextValue<unknown>, unknown>,
    varCounter = 0,
    indent = 0
  ) {
    this.values = values ?? new Map();
    this._varCounter = varCounter;
    this.indent = indent;
  }

  get<T>(context: ContextValue<T>): T {
    if (this.values.has(context)) {
      return this.values.get(context) as T;
    }
    return context.defaultValue;
  }

  // Create a new context with an updated value (immutable update)
  with<T>(context: ContextValue<T>, value: T): RenderContext {
    const newValues = new Map(this.values);
    newValues.set(context, value);
    return new RenderContext(newValues, this._varCounter, this.indent);
  }

  genVar(prefix = 'v'): string {
    return `${prefix}${this._varCounter++}`;
  }

  // Create a child context with increased indent
  indented(): RenderContext {
    return new RenderContext(this.values, this._varCounter, this.indent + 1);
  }
}

// JSX factory function
export function jsx(
  type: string | ComponentFn,
  props: Record<string, unknown> | null,
  ...children: CodeNode[]
): CodeElement {
  return {
    type,
    props: props ?? {},
    children: children.flat(),
  };
}

// Also export as jsxs for React 17+ runtime
export const jsxs = jsx;

// Fragment just returns children
export function Fragment({ children }: { children?: CodeNode }): CodeNode {
  return children ?? [];
}

// Main render function
export function render(node: CodeNode, ctx?: RenderContext): string {
  const context = ctx ?? new RenderContext();
  return renderNode(node, context);
}

// Internal render function
export function renderNode(node: CodeNode, ctx: RenderContext): string {
  if (node === null || node === undefined || node === false) {
    return '';
  }

  if (typeof node === 'string') {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(n => renderNode(n, ctx)).join('');
  }

  // It's a CodeElement
  const { type, props, children } = node;

  if (typeof type === 'function') {
    // Component function - call it with current context
    const propsWithChildren = { ...props, children };
    const result = type(propsWithChildren, ctx);
    return renderNode(result, ctx);
  }

  // Intrinsic element (shouldn't happen in our system, but handle it)
  return renderNode(children, ctx);
}
