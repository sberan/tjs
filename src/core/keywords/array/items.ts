import type { JsonSchema } from '../../../types.js';
import { _, not, pathExpr, pathExprIndex, indexAccess } from '../../codegen.js';
import type { CompileContext } from '../../context.js';
import { supportsFeature } from '../../context.js';
import { hasTypeConstraint, getSimpleType, isNoOpSchema, getTypeCheck } from '../shared/utils.js';

/**
 * Keyword handler for items/prefixItems/additionalItems validation.
 */
export default function generateItemsChecks(ctx: CompileContext): void {
  const { schema, code, data, path } = ctx;
  // Draft-07 compatibility: items can be an array (acts like prefixItems)
  const itemsIsArray = Array.isArray(schema.items);

  // Cross-draft compatibility: prefixItems was introduced in 2020-12
  // In 2019-09 and earlier, prefixItems is not a keyword and should be ignored
  const hasPrefixItems = supportsFeature(schema.$schema ?? ctx.options.defaultMeta, 'prefixItems');

  const tupleSchemas: JsonSchema[] = itemsIsArray
    ? (schema.items as JsonSchema[])
    : hasPrefixItems && schema.prefixItems
      ? [...schema.prefixItems]
      : [];

  // For items after the tuple:
  // - draft-2020-12: use schema.items (if not array)
  // - draft-07: use schema.additionalItems (if items is array)
  let afterTupleSchema: JsonSchema | undefined;
  if (itemsIsArray) {
    afterTupleSchema = schema.additionalItems;
  } else if (!itemsIsArray && schema.items !== undefined) {
    // schema.items is boolean | JsonSchema (not array) here
    afterTupleSchema = schema.items as JsonSchema;
  }
  // Skip no-op schemas (true, {})
  const hasAfterTupleSchema = afterTupleSchema !== undefined && !isNoOpSchema(afterTupleSchema);

  // Filter out no-op tuple schemas - avoid creating intermediate objects
  const nonTrivialTupleSchemas: Array<{ schema: JsonSchema; index: number }> = [];
  for (let i = 0; i < tupleSchemas.length; i++) {
    const s = tupleSchemas[i];
    if (!isNoOpSchema(s)) {
      nonTrivialTupleSchemas.push({ schema: s, index: i });
    }
  }
  const hasNonTrivialTuples = nonTrivialTupleSchemas.length > 0;

  // Track items for unevaluatedItems support
  const itemsTracker = ctx.tracker.items;
  const tracker = ctx.tracker;

  // prefixItems marks items 0..N-1 as evaluated (even if schemas are trivial like `true`)
  if (tupleSchemas.length > 0) {
    itemsTracker.addPrefixItems(tupleSchemas.length);
  }

  // items keyword (when not an array) marks ALL items as evaluated
  if (afterTupleSchema !== undefined) {
    itemsTracker.markAllItemsEvaluated();
  }

  if (!hasNonTrivialTuples && !hasAfterTupleSchema) return;

  const genChecks = () => {
    for (const { schema: itemSchema, index: i } of nonTrivialTupleSchemas) {
      const itemPathExpr = pathExpr(path, i);
      code.if(_`${data}.length > ${i}`, () => {
        const itemAccess = indexAccess(data, i);
        const itemVar = code.genVar('item');
        code.line(_`const ${itemVar} = ${itemAccess};`);
        tracker.withItemsScope(() => {
          ctx.validateSubschema(itemSchema, itemVar, itemPathExpr);
        });
      });
    }

    if (hasAfterTupleSchema) {
      const startIndex = tupleSchemas.length;

      if (afterTupleSchema === false) {
        if (startIndex > 0) {
          code.if(_`${data}.length > ${startIndex}`, () => {
            ctx.genError(
              itemsIsArray ? 'additionalItems' : 'items',
              `must NOT have more than ${startIndex} items`,
              {}
            );
          });
        } else {
          code.if(_`${data}.length > 0`, () => {
            ctx.genError('items', 'must NOT have more than 0 items', {});
          });
        }
      } else if (afterTupleSchema !== true) {
        const simpleType = getSimpleType(afterTupleSchema);

        if (simpleType) {
          const iVar = code.genVar('i');
          code.forArray(
            iVar,
            data,
            () => {
              const itemAccess = indexAccess(data, iVar);
              const itemPathExpr = pathExprIndex(path, iVar);
              const typeCheck = getTypeCheck(itemAccess, simpleType);
              code.if(not(typeCheck), () => {
                ctx.withPath(itemPathExpr, () => {
                  ctx.genError('type', `must be ${simpleType}`, { type: simpleType });
                });
              });
            },
            startIndex
          );
        } else {
          const iVar = code.genVar('i');
          code.forArray(
            iVar,
            data,
            () => {
              const itemAccess = indexAccess(data, iVar);
              const itemPathExpr = pathExprIndex(path, iVar);
              const itemVar = code.genVar('item');
              code.line(_`const ${itemVar} = ${itemAccess};`);
              tracker.withItemsScope(() => {
                ctx.validateSubschema(afterTupleSchema!, itemVar, itemPathExpr);
              });
            },
            startIndex
          );
        }
      }
    }
  };

  if (hasTypeConstraint(schema, 'array')) {
    genChecks();
  } else {
    code.if(_`Array.isArray(${data})`, genChecks);
  }
}
