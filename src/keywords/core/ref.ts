import type { KeywordContext, KeywordResult } from '../types.js';
import { EMPTY_RESULT, errorResult, mergeResults } from '../types.js';

export function validateRef(ctx: KeywordContext): KeywordResult {
  const {
    data,
    schema,
    path,
    dynamicScope,
    validate,
    resolveRef,
    buildRefDynamicScope,
    getBaseUri,
    resolveUri,
  } = ctx;

  if (!schema.$ref) {
    return EMPTY_RESULT;
  }

  const refSchema = resolveRef(schema.$ref, schema);

  if (!refSchema) {
    const currentBaseUri = getBaseUri(schema);
    const resolvedUri = resolveUri(schema.$ref, currentBaseUri);
    return errorResult(
      path,
      `Unresolved $ref: ${schema.$ref} (resolved to: ${resolvedUri})`,
      '$ref'
    );
  }

  // When following a $ref to a different resource, that resource enters the dynamic scope
  const refDynamicScope = buildRefDynamicScope(schema.$ref, schema, dynamicScope);
  return validate(data, refSchema, path, refDynamicScope);
}

export function validateDynamicRef(ctx: KeywordContext): KeywordResult {
  const { data, schema, path, dynamicScope, validate, resolveDynamicRef } = ctx;

  if (!schema.$dynamicRef) {
    return EMPTY_RESULT;
  }

  const refSchema = resolveDynamicRef(schema.$dynamicRef, schema, dynamicScope);

  if (!refSchema) {
    return errorResult(path, `Unresolved $dynamicRef: ${schema.$dynamicRef}`, '$dynamicRef');
  }

  return validate(data, refSchema, path, dynamicScope);
}
