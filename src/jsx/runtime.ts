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

export interface RenderContext {
  get<T>(context: ContextValue<T>): T;
  indent: number;
  genVar(prefix?: string): string;
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
export function Fragment({ children }: { children?: CodeNode[] }): CodeNode[] {
  return children ?? [];
}

// Render a CodeNode tree to a string
export function render(node: CodeNode, contexts?: Map<ContextValue<unknown>, unknown>): string {
  let varCounter = 0;

  const ctx: RenderContext = {
    get<T>(context: ContextValue<T>): T {
      if (contexts?.has(context)) {
        return contexts.get(context) as T;
      }
      return context.defaultValue;
    },
    indent: 0,
    genVar(prefix = 'v') {
      return `${prefix}${varCounter++}`;
    },
  };

  return renderNode(node, ctx, contexts ?? new Map());
}

function renderNode(
  node: CodeNode,
  ctx: RenderContext,
  contexts: Map<ContextValue<unknown>, unknown>
): string {
  if (node === null || node === undefined || node === false) {
    return '';
  }

  if (typeof node === 'string') {
    return node;
  }

  if (Array.isArray(node)) {
    return node.map(n => renderNode(n, ctx, contexts)).join('');
  }

  // It's a CodeElement
  const { type, props, children } = node;

  if (typeof type === 'function') {
    // Component function
    const propsWithChildren = { ...props, children };
    const result = type(propsWithChildren, ctx);
    return renderNode(result, ctx, contexts);
  }

  // Intrinsic element (shouldn't happen in our system, but handle it)
  return renderNode(children, ctx, contexts);
}

// Helper to provide context values
export function withContext<T>(
  context: ContextValue<T>,
  value: T,
  node: CodeNode,
  existingContexts?: Map<ContextValue<unknown>, unknown>
): string {
  const contexts = new Map(existingContexts ?? []);
  contexts.set(context, value);
  return render(node, contexts);
}
