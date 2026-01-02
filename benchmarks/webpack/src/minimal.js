/**
 * Minimal test case: simple string schema
 * This measures the base bundle size for the simplest possible use case.
 */
import { schema } from 'tjs';

const stringValidator = schema({ type: 'string' });

// Export to prevent tree-shaking from removing
export { stringValidator };

// Simple usage to ensure code is included
export function validate(data) {
  return stringValidator.validate(data);
}
