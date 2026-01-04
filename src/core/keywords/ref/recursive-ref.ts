import { Name, _ } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { genSubschemaExit } from '../shared/utils.js';

/**
 * Keyword handler for $recursiveRef validation (draft 2019-09).
 */
export default function generateRecursiveRefCheck(ctx: CompileContext): void {
  const { schema, code, data, path } = ctx;
  if (!schema.$recursiveRef) return;
  const dynamicScopeVar = ctx.getDynamicScopeVar();
  const ref = schema.$recursiveRef;

  if (ref !== '#') {
    ctx.genError('$recursiveRef', `$recursiveRef must be "#" (got "${ref}")`, { $ref: ref });
    return;
  }

  const staticSchema = ctx.resolveRef(ref, schema);
  if (!staticSchema) {
    ctx.genError('$recursiveRef', `can't resolve reference ${ref}`, { $ref: ref });
    return;
  }

  const staticFuncName = ctx.queueCompile(staticSchema);
  const hasRecursiveAnchor = ctx.hasRecursiveAnchor(staticSchema);

  if (hasRecursiveAnchor) {
    const propsTracker = ctx.tracker.props;
    const itemsTracker = ctx.tracker.items;

    for (const dynSchema of ctx.getAllRecursiveAnchorSchemas()) {
      if (typeof dynSchema === 'object' && dynSchema !== null) {
        if (propsTracker.active && dynSchema.properties) {
          propsTracker.addProperties(Object.keys(dynSchema.properties));
        }
        if (itemsTracker.active && Array.isArray(dynSchema.items)) {
          itemsTracker.addPrefixItems(dynSchema.items.length);
        }
      }
    }
  }

  if (!dynamicScopeVar) {
    code.if(_`!${staticFuncName}(${data}, errors, ${path}, [])`, () => {
      genSubschemaExit(code, ctx);
    });
  } else if (!hasRecursiveAnchor) {
    code.if(_`!${staticFuncName}(${data}, errors, ${path}, ${dynamicScopeVar})`, () => {
      genSubschemaExit(code, ctx);
    });
  } else {
    const allRecursiveAnchors = ctx.getAllRecursiveAnchorSchemas();
    if (allRecursiveAnchors.length === 1) {
      code.if(_`!${staticFuncName}(${data}, errors, ${path}, ${dynamicScopeVar})`, () => {
        genSubschemaExit(code, ctx);
      });
    } else {
      const validatorVar = new Name('validator');
      code.line(
        _`const ${validatorVar} = ${dynamicScopeVar}.get('__recursive__') || ${staticFuncName};`
      );
      code.if(_`!${validatorVar}(${data}, errors, ${path}, ${dynamicScopeVar})`, () => {
        genSubschemaExit(code, ctx);
      });
    }
  }
}
