// Example: JSX-based code generation
/* @jsx jsx */
/* @jsxFrag Fragment */
import { jsx, Fragment, render, createContext, type RenderContext, type CodeNode } from './runtime.js';
import { If, Const, For, Stmt } from './core.js';
import { StringType, NumberType, ObjectScope, Property, ArrayScope, Items } from './validators.js';
import { DataContext, ErrorContext, type DataPath, type ErrorAccumulator } from './context.js';

// Create a simple validator using JSX
function PersonValidator(_props: {}, ctx: RenderContext): CodeNode {
  return (
    <>
      <ObjectScope>
        <Property name="name" required>
          <StringType minLength={1} maxLength={100} />
        </Property>
        <Property name="age">
          <NumberType min={0} max={150} integer />
        </Property>
        <Property name="email">
          <StringType pattern="^[^@]+@[^@]+$" />
        </Property>
      </ObjectScope>
    </>
  );
}

// Render to see the generated code
function generateValidator(): string {
  // Set up contexts
  const dataPath: DataPath = { expr: 'data', path: '' };
  const errorAcc: ErrorAccumulator = {
    errorsVar: 'errors',
    genError: () => '',
  };

  // Create a custom render context with our contexts
  let varCounter = 0;
  const ctx: RenderContext = {
    get(context) {
      if (context === DataContext) return dataPath as any;
      if (context === ErrorContext) return errorAcc as any;
      return context.defaultValue;
    },
    indent: 1,
    genVar(prefix = 'v') {
      return `${prefix}${varCounter++}`;
    },
  };

  // Build the JSX tree
  const tree = jsx(PersonValidator, {});

  // Custom render that uses our context
  function renderWithContext(node: CodeNode): string {
    if (node === null || node === undefined || node === false) return '';
    if (typeof node === 'string') return node;
    if (Array.isArray(node)) return node.map(renderWithContext).join('');

    const { type, props, children } = node as any;
    if (typeof type === 'function') {
      const result = type({ ...props, children }, ctx);
      return renderWithContext(result);
    }
    return renderWithContext(children);
  }

  const body = renderWithContext(tree);

  return `function validate(data) {
  const errors = [];
${body}
  return errors.length === 0 ? { valid: true, value: data } : { valid: false, errors };
}`;
}

// Run the example
console.log('=== Generated Validator Code ===\n');
console.log(generateValidator());
console.log('\n=== End ===');
