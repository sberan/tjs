import type { JsonSchema } from '../../../types.js';
import type { ValidationError } from '../../index.js';
import { Name, _, stringify } from '../../codegen.js';
import type { CompileContext, CompileOptions } from '../../context.js';
import { supportsFeature } from '../../context.js';
import { genSubschemaExit } from '../shared/utils.js';
import { hasRestrictiveUnevaluatedProperties } from '../../props-tracker.js';
import { extractStaticProperties } from '../../schema-utils.js';
import { getCompileFn } from './compile-fn.js';

function shouldInlineRef(
  refSchema: JsonSchema,
  ctx: CompileContext,
  _dynamicScopeVar?: Name
): boolean {
  // Only inline object schemas (not boolean or string)
  if (typeof refSchema !== 'object' || refSchema === null) return false;

  // Don't inline schemas with $id (they are resources with dynamic anchors)
  if (refSchema.$id) return false;

  // Don't inline schemas that themselves have $ref (already handled by ref chain optimization)
  if (refSchema.$ref) return false;

  // Don't inline schemas with $dynamicRef or $dynamicAnchor (need dynamic scope)
  if (refSchema.$dynamicRef || refSchema.$dynamicAnchor) return false;

  // Don't inline schemas with composition keywords (complex control flow)
  if (refSchema.allOf || refSchema.anyOf || refSchema.oneOf || refSchema.not) return false;
  if (refSchema.if || refSchema.then || refSchema.else) return false;

  // Don't inline schemas with unevaluated keywords (need tracking)
  if (refSchema.unevaluatedProperties !== undefined || refSchema.unevaluatedItems !== undefined)
    return false;

  // Don't inline if already compiled (cyclic reference)
  if (ctx.isCompiled(refSchema)) return false;

  // Don't inline schemas with $defs or definitions (they may have nested refs)
  // These should be compiled as separate functions to allow proper ref resolution
  if (refSchema.$defs || refSchema.definitions) return false;

  // Don't inline schemas with patternProperties or dependentSchemas (complex)
  if (refSchema.patternProperties || refSchema.dependentSchemas || refSchema.dependencies)
    return false;

  // Helper to check if a schema is complex
  const isComplexSchema = (s: JsonSchema): boolean => {
    if (typeof s !== 'object' || s === null || Array.isArray(s)) return false;
    return !!(
      s.properties ||
      s.patternProperties ||
      s.prefixItems ||
      s.items ||
      s.contains ||
      s.allOf ||
      s.anyOf ||
      s.oneOf ||
      s.not ||
      s.if
    );
  };

  // Allow inlining simple object schemas with a small number of properties
  if (
    refSchema.properties &&
    typeof refSchema.properties === 'object' &&
    !Array.isArray(refSchema.properties)
  ) {
    const propCount = Object.keys(refSchema.properties).length;
    // Only inline if we have 5 or fewer properties
    if (propCount > 5) return false;

    // Check that property schemas are simple (no nested complexity)
    for (const propSchema of Object.values(refSchema.properties)) {
      if (isComplexSchema(propSchema)) {
        return false;
      }
    }
  }

  // Allow inlining simple array schemas with simple items
  // But not if items is an array (tuple schema) or if the items schema is complex
  if (refSchema.items) {
    // Don't inline tuple schemas (items is an array)
    if (Array.isArray(refSchema.items)) return false;
    // Don't inline if items is complex (after ruling out array, items is JsonSchema)
    const itemsSchema = refSchema.items as JsonSchema;
    if (isComplexSchema(itemsSchema)) {
      return false;
    }
  }

  // Don't inline prefixItems or contains (more complex)
  if (refSchema.prefixItems || refSchema.contains) return false;

  // Count the number of validation keywords
  const keywords = Object.keys(refSchema).filter(
    (k) =>
      k !== '$schema' && k !== '$comment' && k !== 'title' && k !== 'description' && k !== '$anchor'
  );

  // Inline if it has a reasonable number of keywords
  // Allow more keywords now that we can inline properties/items
  return keywords.length <= 8;
}

/**
 * Keyword handler for $ref validation.
 */
export default function generateRefCheck(ctx: CompileContext): void {
  const { schema, code, data, path } = ctx;
  if (!schema.$ref) return;
  const dynamicScopeVar = ctx.getDynamicScopeVar();
  const isRemoteRef = /^https?:\/\//.test(schema.$ref);

  // Resolve the reference
  let refSchema = ctx.resolveRef(schema.$ref, schema);

  // Optimization: follow chains of $ref-only schemas to avoid function call overhead
  // Only safe when there are no $dynamicAnchor or $recursiveAnchor definitions
  if (!ctx.hasAnyDynamicAnchors() && !ctx.hasAnyRecursiveAnchors() && refSchema) {
    let depth = 0;
    const maxDepth = 100; // Prevent infinite loops
    const visited = new Set<JsonSchema>(); // Track visited schemas to detect cycles

    while (
      typeof refSchema === 'object' &&
      refSchema !== null &&
      refSchema.$ref &&
      Object.keys(refSchema).length === 1 && // Only $ref, nothing else
      depth < maxDepth &&
      !visited.has(refSchema)
    ) {
      visited.add(refSchema);
      const nextSchema = ctx.resolveRef(refSchema.$ref, refSchema);
      if (!nextSchema) break;
      refSchema = nextSchema;
      depth++;
    }
  }

  if (!refSchema) {
    ctx.genError('$ref', `can't resolve reference ${schema.$ref}`, { $ref: schema.$ref });
    return;
  }

  // Optimize: if ref points to a no-op schema (true or {}), skip entirely
  if (
    refSchema === true ||
    (typeof refSchema === 'object' && Object.keys(refSchema).length === 0)
  ) {
    return;
  }

  // Check for cross-draft reference: if the referenced schema has a different $schema,
  // compile it separately with its own draft-specific options
  const crossDraftSchema = ctx.getCrossDraftSchema(refSchema);
  const compileFn = getCompileFn();
  if (crossDraftSchema && compileFn) {
    // This is a cross-draft reference - compile it separately with its own options
    const crossDraftName = new Name(ctx.genRuntimeName('crossDraftValidator'));

    // Create a wrapper that adapts the top-level validator to the internal validator signature
    // Internal validators take (data, errors, path, [dynamicScope])
    // Top-level validators take (data, errors)
    const crossDraftOptions: CompileOptions = {
      ...ctx.options,
      defaultMeta: crossDraftSchema,
      legacyRef: supportsFeature(crossDraftSchema, 'legacyRef'),
      formatAssertion:
        ctx.options.formatAssertion ?? supportsFeature(crossDraftSchema, 'formatAssertion'),
    };

    // Compile the cross-draft schema
    const crossDraftValidator = compileFn(refSchema, crossDraftOptions);

    // Create a wrapper function that adjusts error paths
    const wrapperFn = (data: unknown, path: string) => {
      const result = crossDraftValidator(data);

      // Adjust paths in errors from cross-draft validator
      if (!result && crossDraftValidator.errors) {
        const errors = crossDraftValidator.errors as ValidationError[];
        crossDraftValidator.errors = errors.map((err) => ({
          ...err,
          instancePath: path + err.instancePath,
        }));
      }

      return result;
    };

    ctx.addRuntimeFunction(crossDraftName.str, wrapperFn);

    code.if(_`!${crossDraftName}(${data}, ${path})`, () => {
      genSubschemaExit(code, ctx);
    });
    return;
  }

  const propsTracker = ctx.tracker.props;
  const itemsTracker = ctx.tracker.items;
  const refHasId = typeof refSchema === 'object' && refSchema !== null && refSchema.$id;
  const isCyclicRef = ctx.isCompiled(refSchema);
  const forceInlineForTracking =
    (propsTracker.active || itemsTracker.active) && !refHasId && !isCyclicRef;
  if (
    !isRemoteRef &&
    (shouldInlineRef(refSchema, ctx, dynamicScopeVar) || forceInlineForTracking)
  ) {
    ctx.tracker.withConditionalScope(refSchema, () => {
      ctx.validateSubschema(refSchema, data, path);
    });
    return;
  }

  // Get the function name (queue for compilation if needed)
  const funcName = ctx.getCompiledName(refSchema) ?? ctx.queueCompile(refSchema);

  // When property tracking is active and we're calling into a ref function,
  // we need to track the properties that the ref schema statically defines.
  // This allows unevaluatedProperties in the parent to see what the ref evaluates.
  const refStaticProps =
    propsTracker.active && !hasRestrictiveUnevaluatedProperties(refSchema)
      ? extractStaticProperties(refSchema)
      : new Set<string>();

  const hasRecursiveAnchor =
    typeof refSchema === 'object' && refSchema !== null && refSchema.$recursiveAnchor === true;

  if (hasRecursiveAnchor && (propsTracker.active || itemsTracker.active)) {
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

  const isRecursiveRef = schema.$ref === '#' && hasRecursiveAnchor;

  if (isRecursiveRef && dynamicScopeVar) {
    // Always compute path for error reporting
    const pathArg = path;

    const allRecursiveAnchors = ctx.getAllRecursiveAnchorSchemas();
    if (allRecursiveAnchors.length === 1) {
      code.if(_`!${funcName}(${data}, true, ${pathArg}, ${dynamicScopeVar})`, () => {
        genSubschemaExit(code, ctx);
      });
    } else {
      const validatorVar = new Name('validator');
      code.line(
        _`const ${validatorVar} = ${dynamicScopeVar}.get('__recursive_current__') || ${funcName};`
      );
      code.if(_`!${validatorVar}(${data}, true, ${pathArg}, ${dynamicScopeVar})`, () => {
        genSubschemaExit(code, ctx);
      });
    }
    return;
  }

  if (!dynamicScopeVar) {
    // Always compute path for error reporting
    const pathArg = path;
    code.if(_`!${funcName}(${data}, true, ${pathArg})`, () => {
      genSubschemaExit(code, ctx);
    });
    if (refStaticProps.size > 0) {
      propsTracker.addProperties([...refStaticProps]);
    }
    return;
  }

  let refResourceId = ctx.getRefResourceId(schema.$ref, schema);

  if (typeof refSchema === 'object' && refSchema !== null && typeof refSchema.$id === 'string') {
    const refSchemaResourceId = ctx.getSchemaResourceId(refSchema);
    if (refSchemaResourceId) {
      refResourceId = refSchemaResourceId;
    } else {
      refResourceId = refSchema.$id;
    }
  }

  if (refResourceId) {
    const resourceAnchors = ctx.getResourceDynamicAnchors(refResourceId);
    if (resourceAnchors.length > 0) {
      // Always compute path for error reporting
      const pathArg = path;
      code.block(_``, () => {
        const savedVars = new Map<string, Name>();
        for (const { anchor, schema: anchorSchema } of resourceAnchors) {
          const anchorFuncName =
            ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
          const savedVar = new Name('saved');
          savedVars.set(anchor, savedVar);
          code.line(_`const ${savedVar} = ${dynamicScopeVar}.get(${stringify(anchor)});`);
          code.line(
            _`if (${savedVar} === undefined) ${dynamicScopeVar}.set(${stringify(anchor)}, ${anchorFuncName});`
          );
        }
        code.if(_`!${funcName}(${data}, true, ${pathArg}, ${dynamicScopeVar})`, () => {
          for (const { anchor } of resourceAnchors) {
            const savedVar = savedVars.get(anchor);
            if (savedVar) {
              code.line(
                _`if (${savedVar} === undefined) ${dynamicScopeVar}.delete(${stringify(anchor)});`
              );
            }
          }
          genSubschemaExit(code, ctx);
        });
        for (const { anchor } of resourceAnchors) {
          const savedVar = savedVars.get(anchor);
          if (savedVar) {
            code.line(
              _`if (${savedVar} === undefined) ${dynamicScopeVar}.delete(${stringify(anchor)});`
            );
          }
        }
      });
      if (refStaticProps.size > 0) {
        propsTracker.addProperties([...refStaticProps]);
      }
      return;
    }
  }

  // Always compute path for error reporting
  const pathArg = path;
  code.if(_`!${funcName}(${data}, true, ${pathArg}, ${dynamicScopeVar})`, () => {
    genSubschemaExit(code, ctx);
  });
  if (refStaticProps.size > 0) {
    propsTracker.addProperties([...refStaticProps]);
  }
}
