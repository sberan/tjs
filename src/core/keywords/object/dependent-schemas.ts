import { _, stringify } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { supportsFeature } from '../../context.js';

/**
 * Keyword handler for dependentSchemas validation.
 */
export default function generateDependentSchemasCheck(ctx: CompileContext): void {
  const { schema, code, data, path, tracker } = ctx;
  if (!schema.dependentSchemas) return;

  if (!supportsFeature(ctx.options.defaultMeta, 'unevaluated')) {
    return;
  }
  tracker.ensureDynamicVars();

  code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, () => {
    for (const [prop, depSchema] of Object.entries(schema.dependentSchemas!)) {
      const branch = tracker.enterBranch();

      const triggerExists = code.genVar('depTrigger');
      code.line(_`const ${triggerExists} = ${stringify(prop)} in ${data};`);

      code.if(triggerExists, () => {
        ctx.validateSubschema(depSchema, data, path);
      });

      tracker.exitBranch(branch);
      tracker.mergeBranch(branch, triggerExists);
    }
  });
}
