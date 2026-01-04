import type { CompileContext } from '../../context.js';
import { isNoOpSchema } from '../shared/utils.js';
import { hasRestrictiveUnevaluatedProperties } from '../../props-tracker.js';
import { hasRestrictiveUnevaluatedItems } from '../../items-tracker.js';

/**
 * Keyword handler for allOf validation.
 */
export default function generateAllOfCheck(ctx: CompileContext): void {
  const { schema } = ctx;
  if (!schema.allOf || schema.allOf.length === 0) return;

  const nonNoOpSchemas = schema.allOf.filter((s) => !isNoOpSchema(s));

  if (nonNoOpSchemas.length > 0) {
    const { data, path } = ctx;
    const propsTracker = ctx.tracker.props;
    const itemsTracker = ctx.tracker.items;
    for (const subSchema of nonNoOpSchemas) {
      const needsPropsIsolation = hasRestrictiveUnevaluatedProperties(subSchema);
      const needsItemsIsolation = hasRestrictiveUnevaluatedItems(subSchema);
      if (needsPropsIsolation) {
        propsTracker.withScope(() => {
          if (needsItemsIsolation) {
            itemsTracker.withScope(() => {
              ctx.validateSubschema(subSchema, data, path);
            }, false);
          } else {
            ctx.validateSubschema(subSchema, data, path);
          }
        }, false);
      } else if (needsItemsIsolation) {
        itemsTracker.withScope(() => {
          ctx.validateSubschema(subSchema, data, path);
        }, false);
      } else {
        ctx.validateSubschema(subSchema, data, path);
      }
    }
  }
}
