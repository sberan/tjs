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
// Example 2: Union Types
// =============================================================================

function UnionTypeExamples(_props: {}, ctx: RenderContext): CodeNode {
  return (
    <>
      <TypeCheck type="string" />
      <TypeCheck type={['string', 'number', 'boolean']} />
      <TypeCheck type={['string', 'number']} />
      <TypeCheck type={['array', 'object']} />
    </>
  );
}

// =============================================================================
// Example 3: Array
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
  const errorAcc: ErrorAccumulator = { errorsVar: 'errors', genError: () => '' };

  const ctx = new RenderContext()
    .with(DataContext, dataPath)
    .with(ErrorContext, errorAcc);

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
