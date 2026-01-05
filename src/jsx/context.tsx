// Validation context system
/* @jsx jsx */
import { jsx, createContext, type CodeNode, type RenderContext } from './runtime.js';
import { Stmt } from './core.js';

// Data context - tracks current data path
export interface DataPath {
  expr: string;        // The expression to access data, e.g., "data", "data.foo", "data[i]"
  path: string;        // JSON pointer path for errors, e.g., "", "/foo", "/items/0"
}

export const DataContext = createContext<DataPath>({
  expr: 'data',
  path: '',
});

// Error accumulator context
export interface ErrorAccumulator {
  errorsVar: string;   // Variable name for errors array
  genError: (keyword: string, message: string, params?: Record<string, unknown>) => CodeNode;
}

export const ErrorContext = createContext<ErrorAccumulator>({
  errorsVar: 'errors',
  genError: () => '',
});

// Props tracking context (for unevaluatedProperties)
export interface PropsTracker {
  evaluatedVar: string;  // Variable tracking evaluated props
  track: (prop: string) => void;
}

export const PropsContext = createContext<PropsTracker | null>(null);

// Items tracking context (for unevaluatedItems)
export interface ItemsTracker {
  evaluatedVar: string;
  minEvaluated: number;
}

export const ItemsContext = createContext<ItemsTracker | null>(null);

// Component to set up data scope
export function DataScope(
  { expr, path, children }: { expr: string; path: string; children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  // For now, just pass through - in full implementation would use context providers
  return children;
}

// Component to set up error handling
export function ErrorScope(
  { children }: { children?: CodeNode },
  ctx: RenderContext
): CodeNode {
  const errorsVar = ctx.genVar('errors');
  return [
    `const ${errorsVar} = [];\n`,
    children,
  ];
}

// Generate an error push
export function GenError(
  { keyword, message, params }: { keyword: string; message: string; params?: Record<string, unknown> },
  ctx: RenderContext
): CodeNode {
  const errorCtx = ctx.get(ErrorContext);
  const dataCtx = ctx.get(DataContext);

  const errorObj: Record<string, unknown> = {
    instancePath: dataCtx.path,
    keyword,
    message,
    ...params,
  };

  return <Stmt>{`${errorCtx.errorsVar}.push(${JSON.stringify(errorObj)})`}</Stmt>;
}
