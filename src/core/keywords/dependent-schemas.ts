/**
 * Dependent schemas keyword handler (dependentSchemas)
 * @see https://json-schema.org/draft/2020-12/json-schema-core#section-10.2.2.4
 */

import type { JsonSchemaBase } from '../../types.js';
import { CodeBuilder, Code, Name, _, stringify } from '../codegen.js';
import type { CompileContext } from '../context.js';
import { supportsFeature } from '../context.js';
import { AnnotationTracker } from '../annotation-tracker.js';
import type { SchemaValidator } from './types.js';

/**
 * Generate dependentSchemas validation check.
 * Uses dependency injection for sub-schema validation to avoid circular imports.
 */
export function generateDependentSchemasCheck(
  code: CodeBuilder,
  schema: JsonSchemaBase,
  dataVar: Name,
  pathExprCode: Code,
  ctx: CompileContext,
  dynamicScopeVar: Name | undefined,
  validateSubschema: SchemaValidator
): void {
  if (!schema.dependentSchemas) return;

  // dependentSchemas was introduced in draft 2019-09
  if (!supportsFeature(ctx.options.defaultMeta, 'unevaluated')) {
    return; // Skip in draft-07 and earlier
  }

  const tracker = new AnnotationTracker(ctx.getPropsTracker(), ctx.getItemsTracker());
  tracker.ensureDynamicVars();

  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    for (const [prop, depSchema] of Object.entries(schema.dependentSchemas!)) {
      // Use branch tracking: properties from dependent schemas only count as evaluated
      // when the trigger property is present at runtime
      const branch = tracker.enterBranch();

      // Create a variable to track if the trigger property exists
      const triggerExists = code.genVar('depTrigger');
      code.line(_`const ${triggerExists} = ${stringify(prop)} in ${dataVar};`);

      code.if(triggerExists, () => {
        validateSubschema(code, depSchema, dataVar, pathExprCode, ctx, dynamicScopeVar);
      });

      tracker.exitBranch(branch);
      tracker.mergeBranch(branch, triggerExists);
    }
  });
}
