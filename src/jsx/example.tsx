// Example: JSX-based code generation
/* @jsx jsx */
/* @jsxFrag Fragment */
import { jsx, Fragment, RenderContext, render, type CodeNode } from './runtime.js';
import {
  TypeCheck,
  StringType,
  NumberType,
  ObjectScope,
  Property,
  ArrayScope,
  Items,
  BooleanType,
  ConstValue,
  EnumValue,
} from './validators.js';
import { DataContext, ErrorContext, type DataPath, type ErrorAccumulator } from './context.js';

// =============================================================================
// Example 1: Person Validator
// =============================================================================

function PersonValidator(_props: {}, ctx: RenderContext): CodeNode {
  return (
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
  );
}

// =============================================================================
// Example 2: Union Types (showing optimizations)
// =============================================================================

function UnionTypeExamples(_props: {}, ctx: RenderContext): CodeNode {
  return (
    <>
      {/* Single type */}
      <TypeCheck type="string" />

      {/* Optimized: string | number | boolean -> cache typeof */}
      <TypeCheck type={['string', 'number', 'boolean']} />

      {/* Optimized: string | number -> common pattern */}
      <TypeCheck type={['string', 'number']} />

      {/* Optimized: array | object -> typeof === 'object' && !== null */}
      <TypeCheck type={['array', 'object']} />

      {/* Optimized: null | string */}
      <TypeCheck type={['null', 'string']} />

      {/* Fallback: mixed types without optimization */}
      <TypeCheck type={['string', 'array', 'null']} />
    </>
  );
}

// =============================================================================
// Example 3: Array with items
// =============================================================================

function ArrayValidator(_props: {}, ctx: RenderContext): CodeNode {
  return (
    <ArrayScope minItems={1} maxItems={10}>
      <Items>
        <StringType minLength={1} />
      </Items>
    </ArrayScope>
  );
}

// =============================================================================
// Render Helper
// =============================================================================

function generateValidator(name: string, component: (props: {}, ctx: RenderContext) => CodeNode): string {
  const dataPath: DataPath = { expr: 'data', path: '' };
  const errorAcc: ErrorAccumulator = {
    errorsVar: 'errors',
    genError: () => '',
  };

  // Create render context with initial values
  const ctx = new RenderContext()
    .with(DataContext, dataPath)
    .with(ErrorContext, errorAcc);

  // Render the component tree
  const tree = jsx(component, {});
  const body = render(tree, ctx);

  return `function ${name}(data) {
  const errors = [];
${body}
  return errors.length === 0 ? { valid: true, value: data } : { valid: false, errors };
}`;
}

// =============================================================================
// Run Examples
// =============================================================================

console.log('=== Person Validator ===\n');
console.log(generateValidator('validatePerson', PersonValidator));

console.log('\n\n=== Union Type Examples ===\n');
console.log(generateValidator('validateUnionTypes', UnionTypeExamples));

console.log('\n\n=== Array Validator ===\n');
console.log(generateValidator('validateArray', ArrayValidator));

console.log('\n=== End ===');
