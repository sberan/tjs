import { _, stringify } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { genSubschemaExit } from '../shared/utils.js';

/**
 * Keyword handler for $dynamicRef validation.
 */
export default function generateDynamicRefCheck(ctx: CompileContext): void {
  const { schema, code, data, path } = ctx;
  if (!schema.$dynamicRef) return;
  const dynamicScopeVar = ctx.getDynamicScopeVar();
  const ref = schema.$dynamicRef;

  const anchorMatch = ref.match(/#([a-zA-Z][a-zA-Z0-9_-]*)$/);

  if (anchorMatch) {
    const anchorName = anchorMatch[1];

    const staticSchema = ctx.resolveRef(ref, schema);
    if (!staticSchema) {
      ctx.genError('$dynamicRef', `can't resolve reference ${ref}`, { $ref: ref });
      return;
    }
    const staticFuncName = ctx.queueCompile(staticSchema);

    const hasDynamicAnchor =
      typeof staticSchema === 'object' &&
      staticSchema !== null &&
      staticSchema.$dynamicAnchor === anchorName;

    const propsTracker = ctx.tracker.props;
    if (propsTracker.active) {
      for (const dynSchema of ctx.getDynamicAnchors(anchorName)) {
        if (typeof dynSchema === 'object' && dynSchema !== null && dynSchema.properties) {
          propsTracker.emitAddProperties(Object.keys(dynSchema.properties));
        }
      }
    }

    if (!dynamicScopeVar) {
      code.if(_`!${staticFuncName}(${data}, errors, ${path}, [])`, () => {
        genSubschemaExit(code, ctx);
      });
    } else if (!hasDynamicAnchor) {
      code.if(_`!${staticFuncName}(${data}, errors, ${path}, ${dynamicScopeVar})`, () => {
        genSubschemaExit(code, ctx);
      });
    } else {
      code.block(_``, () => {
        code.line(
          _`const validator = ${dynamicScopeVar}.get(${stringify(anchorName)}) || ${staticFuncName};`
        );
        code.if(_`!validator(${data}, errors, ${path}, ${dynamicScopeVar})`, () => {
          genSubschemaExit(code, ctx);
        });
      });
    }
  } else {
    const refSchema = ctx.resolveRef(ref, schema);

    if (!refSchema) {
      ctx.genError('$dynamicRef', `can't resolve reference ${ref}`, { $ref: ref });
      return;
    }

    const funcName = ctx.queueCompile(refSchema);
    const scopeArg = dynamicScopeVar || _`[]`;
    code.if(_`!${funcName}(${data}, errors, ${path}, ${scopeArg})`, () => {
      genSubschemaExit(code, ctx);
    });
  }
}
