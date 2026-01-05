// Validation context system
import { createContext, type CodeNode } from './runtime.js';

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
  evaluatedVar: string;
  track: (prop: string) => void;
}

export const PropsContext = createContext<PropsTracker | null>(null);

// Items tracking context (for unevaluatedItems)
export interface ItemsTracker {
  evaluatedVar: string;
  minEvaluated: number;
}

export const ItemsContext = createContext<ItemsTracker | null>(null);
