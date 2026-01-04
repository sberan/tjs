var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});

// src/core/codegen.ts
var CODE_BRAND = /* @__PURE__ */ Symbol("Code");
var _a, _str;
_a = CODE_BRAND;
var _Code = class _Code {
  /** @internal - Use static factory methods or `_` template literal instead */
  constructor(s) {
    /** Brand to ensure only internal construction */
    __publicField(this, _a, true);
    /** The actual code string */
    __privateAdd(this, _str);
    __privateSet(this, _str, s);
  }
  toString() {
    return __privateGet(this, _str);
  }
  /** Check if this code is empty */
  get isEmpty() {
    return __privateGet(this, _str) === "";
  }
  /**
   * Create a Code instance from a raw string.
   * @internal - Use only within codegen.ts for utility functions
   */
  static raw(s) {
    return new _Code(s);
  }
  static join(codes, separator) {
    return new _Code(codes.map((c) => c.toString()).join(separator));
  }
};
_str = new WeakMap();
var Code = _Code;
var Name = class extends Code {
  constructor(s) {
    super(s);
    /** The identifier string */
    __publicField(this, "str");
    this.str = s;
  }
  toString() {
    return this.str;
  }
};
function escapeString(s) {
  return s.replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\t/g, "\\t").replace(/[\x00-\x1f\x7f]/g, (c) => `\\x${c.charCodeAt(0).toString(16).padStart(2, "0")}`);
}
function safeInterpolate(value) {
  if (value instanceof Code) {
    return value.toString();
  }
  if (typeof value === "string") {
    return `"${escapeString(value)}"`;
  }
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      throw new Error(`Expected finite number in template, got: ${value}`);
    }
    return String(value);
  }
  if (typeof value === "boolean") {
    return String(value);
  }
  if (value === null) {
    return "null";
  }
  if (value === void 0) {
    return "undefined";
  }
  throw new Error(`Unexpected value type in template: ${typeof value}`);
}
function _(strings, ...values) {
  let result = strings[0];
  for (let i = 0; i < values.length; i++) {
    result += safeInterpolate(values[i]);
    result += strings[i + 1];
  }
  return Code.raw(result);
}
function propAccess(obj, prop) {
  const objStr = obj.toString();
  if (/^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(prop)) {
    return Code.raw(`${objStr}.${prop}`);
  }
  return Code.raw(`${objStr}["${escapeString(prop)}"]`);
}
function indexAccess(obj, index) {
  const objStr = obj.toString();
  const indexStr = index instanceof Code ? index.toString() : String(index);
  return Code.raw(`${objStr}[${indexStr}]`);
}
function stringify(value) {
  return Code.raw(JSON.stringify(value));
}
function and(...conditions) {
  if (conditions.length === 0) return _`true`;
  if (conditions.length === 1) return conditions[0];
  return Code.raw(conditions.map((c) => c.toString()).join(" && "));
}
function or(...conditions) {
  if (conditions.length === 0) return _`false`;
  if (conditions.length === 1) return conditions[0];
  return Code.raw(conditions.map((c) => c.toString()).join(" || "));
}
function not(condition) {
  return _`!(${condition})`;
}
function pathExpr(basePath, segment) {
  const segmentStr = String(segment);
  const escaped = escapeString(segmentStr.replace(/~/g, "~0").replace(/\//g, "~1"));
  if (basePath.toString() === "''") {
    return Code.raw(`'/${escaped}'`);
  }
  return Code.raw(`\`\${${basePath}}/${escaped}\``);
}
function pathExprDynamic(basePath, segmentVar) {
  if (basePath.toString() === "''") {
    return Code.raw(`\`/\${${segmentVar}}\``);
  }
  return Code.raw(`\`\${${basePath}}/\${${segmentVar}}\``);
}
function pathExprIndex(basePath, indexVar) {
  if (basePath.toString() === "''") {
    return Code.raw(`\`/\${${indexVar}}\``);
  }
  return Code.raw(`\`\${${basePath}}/\${${indexVar}}\``);
}
function toCode(input, values) {
  if (input instanceof Code) return input;
  return _(input, ...values || []);
}
var _lines, _indent, _varCounter;
var CodeBuilder = class {
  constructor() {
    __privateAdd(this, _lines, []);
    __privateAdd(this, _indent, 0);
    __privateAdd(this, _varCounter, 0);
  }
  /**
   * Add a line of code at current indentation.
   * Supports both: code.line(_`...`) and code.line`...`
   */
  line(input, ...values) {
    const code = toCode(input, values);
    __privateGet(this, _lines).push("  ".repeat(__privateGet(this, _indent)) + code.toString());
    return this;
  }
  /**
   * Add an empty line
   */
  blank() {
    __privateGet(this, _lines).push("");
    return this;
  }
  /**
   * Add a block with braces (e.g., if, for, function)
   * Supports both: code.block(_`header`, body) and code.block`header`(body)
   */
  block(input, ...rest) {
    if (Array.isArray(input) && "raw" in input) {
      const values = rest;
      const code = _(input, ...values);
      return (body2) => {
        __privateGet(this, _lines).push("  ".repeat(__privateGet(this, _indent)) + code.toString() + " {");
        __privateWrapper(this, _indent)._++;
        body2();
        __privateWrapper(this, _indent)._--;
        this.line`}`;
        return this;
      };
    }
    const header = input;
    const body = rest[0];
    __privateGet(this, _lines).push("  ".repeat(__privateGet(this, _indent)) + header.toString() + " {");
    __privateWrapper(this, _indent)._++;
    body();
    __privateWrapper(this, _indent)._--;
    this.line`}`;
    return this;
  }
  /**
   * Add an if statement
   * Supports both: code.if(_`cond`, body) and code.if`cond`(body)
   */
  if(input, ...rest) {
    if (Array.isArray(input) && "raw" in input) {
      const values = rest;
      const condition2 = _(input, ...values);
      return (body2) => this.block(_`if (${condition2})`, body2);
    }
    const condition = input;
    const body = rest[0];
    return this.block(_`if (${condition})`, body);
  }
  /**
   * Add an else clause
   */
  else(body) {
    const lastLine = __privateGet(this, _lines).pop();
    if (lastLine?.trim() === "}") {
      __privateGet(this, _lines).push(lastLine.replace("}", "} else {"));
      __privateWrapper(this, _indent)._++;
      body();
      __privateWrapper(this, _indent)._--;
      this.line`}`;
    }
    return this;
  }
  /**
   * Add an else-if clause
   * Supports both: code.elseIf(_`cond`, body) and code.elseIf`cond`(body)
   */
  elseIf(input, ...rest) {
    const doElseIf = (condition, body) => {
      const lastLine = __privateGet(this, _lines).pop();
      if (lastLine?.trim() === "}") {
        __privateGet(this, _lines).push(lastLine.replace("}", `} else if (${condition.toString()}) {`));
        __privateWrapper(this, _indent)._++;
        body();
        __privateWrapper(this, _indent)._--;
        this.line`}`;
      }
      return this;
    };
    if (Array.isArray(input) && "raw" in input) {
      const values = rest;
      const condition = _(input, ...values);
      return (body) => doElseIf(condition, body);
    }
    return doElseIf(input, rest[0]);
  }
  /**
   * Add a for loop
   */
  for(init, condition, update, body) {
    return this.block(_`for (${init}; ${condition}; ${update})`, body);
  }
  /**
   * Add a for-of loop
   */
  forOf(variable, iterable, body) {
    return this.block(_`for (const ${variable} of ${iterable})`, body);
  }
  /**
   * Add a for-in loop
   */
  forIn(variable, object, body) {
    return this.block(_`for (const ${variable} in ${object})`, body);
  }
  /**
   * Add a for loop iterating over array indices.
   * Common pattern: for (let i = start, len = arr.length; i < len; i++)
   * @param indexVar - The loop index variable name
   * @param array - The array expression to iterate over
   * @param body - Loop body callback
   * @param start - Starting index (default 0)
   */
  forArray(indexVar, array, body, start = 0) {
    const lenVar = this.genVar("len");
    return this.for(
      _`let ${indexVar} = ${start}, ${lenVar} = ${array}.length`,
      _`${indexVar} < ${lenVar}`,
      _`${indexVar}++`,
      body
    );
  }
  /**
   * Add a try-catch block
   */
  try(tryBody, catchBody, errorVar = new Name("e")) {
    __privateGet(this, _lines).push("  ".repeat(__privateGet(this, _indent)) + "try {");
    __privateWrapper(this, _indent)._++;
    tryBody();
    __privateWrapper(this, _indent)._--;
    __privateGet(this, _lines).push("  ".repeat(__privateGet(this, _indent)) + `} catch (${errorVar}) {`);
    __privateWrapper(this, _indent)._++;
    catchBody();
    __privateWrapper(this, _indent)._--;
    this.line`}`;
    return this;
  }
  /**
   * Generate a unique variable name and return it as a Name
   */
  genVar(prefix = "v") {
    return new Name(`${prefix}${__privateWrapper(this, _varCounter)._++}`);
  }
  /**
   * Reset variable counter (use for nested scopes)
   */
  resetVarCounter() {
    __privateSet(this, _varCounter, 0);
  }
  /**
   * Get the generated code as a string
   */
  toString() {
    return __privateGet(this, _lines).join("\n");
  }
  /**
   * Get current indentation level
   */
  get indentLevel() {
    return __privateGet(this, _indent);
  }
  /**
   * Manually increase indentation
   */
  indent() {
    __privateWrapper(this, _indent)._++;
    return this;
  }
  /**
   * Manually decrease indentation
   */
  dedent() {
    __privateWrapper(this, _indent)._--;
    return this;
  }
};
_lines = new WeakMap();
_indent = new WeakMap();
_varCounter = new WeakMap();

// src/core/props-tracker.ts
function hasRestrictiveUnevaluatedProperties(schema2) {
  if (typeof schema2 !== "object" || schema2 === null) return false;
  const unevalProps = schema2.unevaluatedProperties;
  return unevalProps !== void 0 && unevalProps !== true;
}
function containsUnevaluatedProperties(schema2, visited = /* @__PURE__ */ new Set()) {
  if (typeof schema2 !== "object" || schema2 === null) return false;
  if (visited.has(schema2)) return false;
  visited.add(schema2);
  const s = schema2;
  if (hasRestrictiveUnevaluatedProperties(schema2)) return true;
  const checkArray = (arr) => {
    if (Array.isArray(arr)) {
      return arr.some((item) => containsUnevaluatedProperties(item, visited));
    }
    return false;
  };
  if (checkArray(s.allOf)) return true;
  if (checkArray(s.anyOf)) return true;
  if (checkArray(s.oneOf)) return true;
  if (containsUnevaluatedProperties(s.not, visited)) return true;
  if (containsUnevaluatedProperties(s.if, visited)) return true;
  if (containsUnevaluatedProperties(s.then, visited)) return true;
  if (containsUnevaluatedProperties(s.else, visited)) return true;
  if (s.properties && typeof s.properties === "object") {
    for (const prop of Object.values(s.properties)) {
      if (containsUnevaluatedProperties(prop, visited)) return true;
    }
  }
  if (s.patternProperties && typeof s.patternProperties === "object") {
    for (const prop of Object.values(s.patternProperties)) {
      if (containsUnevaluatedProperties(prop, visited)) return true;
    }
  }
  if (containsUnevaluatedProperties(s.additionalProperties, visited)) return true;
  if (containsUnevaluatedProperties(s.items, visited)) return true;
  if (checkArray(s.prefixItems)) return true;
  if (containsUnevaluatedProperties(s.contains, visited)) return true;
  if (containsUnevaluatedProperties(s.additionalItems, visited)) return true;
  if (s.dependentSchemas && typeof s.dependentSchemas === "object") {
    for (const dep of Object.values(s.dependentSchemas)) {
      if (containsUnevaluatedProperties(dep, visited)) return true;
    }
  }
  if (s.$defs && typeof s.$defs === "object") {
    for (const def of Object.values(s.$defs)) {
      if (containsUnevaluatedProperties(def, visited)) return true;
    }
  }
  if (s.definitions && typeof s.definitions === "object") {
    for (const def of Object.values(s.definitions)) {
      if (containsUnevaluatedProperties(def, visited)) return true;
    }
  }
  return false;
}
var _code, _active, _staticProps, _patterns, _dynamicVar, _needsDynamic, _branchStack, _scopeStack;
var PropsTracker = class {
  constructor(code, active = false) {
    __privateAdd(this, _code);
    __privateAdd(this, _active);
    /** Static properties known at compile time */
    __privateAdd(this, _staticProps);
    /** Pattern regexes that mark properties as evaluated */
    __privateAdd(this, _patterns, []);
    /** Runtime tracking variable (created on demand) */
    __privateAdd(this, _dynamicVar);
    /** Whether we need dynamic (runtime) tracking */
    __privateAdd(this, _needsDynamic, false);
    /**
     * Stack of branch contexts.
     * When non-empty, addProperties() collects to the top branch instead of static props.
     */
    __privateAdd(this, _branchStack, []);
    /**
     * Stack of saved scope states for nested unevaluatedProperties.
     */
    __privateAdd(this, _scopeStack, []);
    __privateSet(this, _code, code);
    __privateSet(this, _active, active);
  }
  /**
   * Check if tracking is active
   */
  get active() {
    return __privateGet(this, _active);
  }
  set active(value) {
    if (value) {
      __privateSet(this, _active, true);
    }
  }
  /**
   * Check if all properties are marked as evaluated
   */
  get allEvaluated() {
    return __privateGet(this, _staticProps) === true;
  }
  /**
   * Check if we're inside a branch context
   */
  get inBranch() {
    return __privateGet(this, _branchStack).length > 0;
  }
  activate() {
    __privateSet(this, _active, true);
  }
  /**
   * Mark specific property names as evaluated (from `properties` keyword)
   * When inside a branch context, collects to the branch's static props.
   */
  addProperties(names) {
    if (!__privateGet(this, _active) || __privateGet(this, _staticProps) === true) return;
    if (__privateGet(this, _branchStack).length > 0) {
      const branch = __privateGet(this, _branchStack)[__privateGet(this, _branchStack).length - 1];
      for (const name of names) {
        branch.staticProps.add(name);
      }
      return;
    }
    if (__privateGet(this, _staticProps) === void 0) {
      __privateSet(this, _staticProps, new Set(names));
    } else {
      for (const name of names) {
        __privateGet(this, _staticProps).add(name);
      }
    }
  }
  /**
   * Enter a branch context (anyOf/oneOf/if-then-else).
   * Creates a branch state for collecting properties.
   * Returns the branch state for later merging.
   */
  enterBranch() {
    const branch = {
      staticProps: /* @__PURE__ */ new Set(),
      dynamicVar: void 0,
      needsDynamic: false
    };
    if (!__privateGet(this, _active) || __privateGet(this, _staticProps) === true) {
      return branch;
    }
    __privateGet(this, _branchStack).push(branch);
    return branch;
  }
  /**
   * Exit the current branch context.
   */
  exitBranch() {
    if (__privateGet(this, _branchStack).length > 0) {
      __privateGet(this, _branchStack).pop();
    }
  }
  /**
   * Mark pattern properties as evaluated (from `patternProperties` keyword)
   * These require runtime checking.
   */
  addPatterns(patterns) {
    if (!__privateGet(this, _active) || __privateGet(this, _staticProps) === true) return;
    __privateGet(this, _patterns).push(...patterns);
    __privateSet(this, _needsDynamic, true);
  }
  /**
   * Mark all properties as evaluated (from `additionalProperties` or nested `unevaluatedProperties`)
   */
  markAllEvaluated() {
    if (!__privateGet(this, _active)) return;
    __privateSet(this, _staticProps, true);
    __privateSet(this, _needsDynamic, false);
    __privateSet(this, _patterns, []);
  }
  /**
   * Enable dynamic tracking mode.
   * Called when entering anyOf, oneOf, if/then/else where properties
   * depend on which branch validates.
   */
  enableDynamic() {
    if (!__privateGet(this, _active) || __privateGet(this, _staticProps) === true) return;
    __privateSet(this, _needsDynamic, true);
  }
  /**
   * Get or create the dynamic tracking variable.
   * Returns a variable that holds: { [key: string]: true }
   */
  getDynamicVar() {
    if (!__privateGet(this, _active)) {
      return new Name("__noop__");
    }
    if (__privateGet(this, _dynamicVar)) return __privateGet(this, _dynamicVar);
    __privateSet(this, _needsDynamic, true);
    __privateSet(this, _dynamicVar, __privateGet(this, _code).genVar("props"));
    __privateGet(this, _code).line(_`const ${__privateGet(this, _dynamicVar)} = {};`);
    if (__privateGet(this, _staticProps) instanceof Set) {
      for (const prop of __privateGet(this, _staticProps)) {
        __privateGet(this, _code).line(_`${__privateGet(this, _dynamicVar)}[${stringify(prop)}] = true;`);
      }
    }
    return __privateGet(this, _dynamicVar);
  }
  /**
   * Generate code to mark a property as evaluated at runtime.
   * Used when iterating over object keys.
   */
  markPropertyEvaluated(keyVar) {
    if (!__privateGet(this, _active) || __privateGet(this, _staticProps) === true) return;
    const v = this.getDynamicVar();
    __privateGet(this, _code).line(_`${v}[${keyVar}] = true;`);
  }
  /**
   * Emit runtime code to add static properties to the dynamic var.
   * Use when properties need to be conditionally added at runtime.
   */
  emitAddProperties(names) {
    if (!__privateGet(this, _active) || __privateGet(this, _staticProps) === true || names.length === 0) return;
    const v = this.getDynamicVar();
    for (const name of names) {
      __privateGet(this, _code).line(_`${v}[${stringify(name)}] = true;`);
    }
  }
  /**
   * Generate the unevaluated property check.
   * Returns a Code expression that evaluates to true if the key is unevaluated.
   */
  isUnevaluated(keyVar, patternRegexVars = [], ctx) {
    if (!__privateGet(this, _active)) return _`true`;
    if (__privateGet(this, _staticProps) === true) return _`false`;
    const conditions = [];
    if (__privateGet(this, _staticProps) instanceof Set && __privateGet(this, _staticProps).size > 0) {
      if (__privateGet(this, _staticProps).size > 3 && ctx) {
        const setName = new Name(ctx.genRuntimeName("evalPropsSet"));
        ctx.addRuntimeFunction(setName.str, __privateGet(this, _staticProps));
        conditions.push(_`!${setName}.has(${keyVar})`);
      } else {
        for (const prop of __privateGet(this, _staticProps)) {
          conditions.push(_`${keyVar} !== ${stringify(prop)}`);
        }
      }
    }
    for (const regex of patternRegexVars) {
      conditions.push(_`!${regex}.test(${keyVar})`);
    }
    if (__privateGet(this, _needsDynamic) && __privateGet(this, _dynamicVar)) {
      conditions.push(_`!${__privateGet(this, _dynamicVar)}[${keyVar}]`);
    }
    if (__privateGet(this, _branchStack).length > 0) {
      const branch = __privateGet(this, _branchStack)[__privateGet(this, _branchStack).length - 1];
      if (branch.staticProps.size > 3 && ctx) {
        const setName = new Name(ctx.genRuntimeName("evalPropsSet"));
        ctx.addRuntimeFunction(setName.str, branch.staticProps);
        conditions.push(_`!${setName}.has(${keyVar})`);
      } else {
        for (const prop of branch.staticProps) {
          conditions.push(_`${keyVar} !== ${stringify(prop)}`);
        }
      }
      if (branch.dynamicVar) {
        conditions.push(_`!${branch.dynamicVar}[${keyVar}]`);
      }
    }
    if (conditions.length === 0) {
      return _`true`;
    }
    return conditions.reduce((acc, cond) => _`${acc} && ${cond}`);
  }
  /**
   * Get the static properties (for compile-time optimization)
   */
  getStaticProps() {
    if (__privateGet(this, _staticProps) instanceof Set) {
      return __privateGet(this, _staticProps);
    }
    return void 0;
  }
  /**
   * Get the pattern regexes
   */
  getPatterns() {
    return __privateGet(this, _patterns);
  }
  /**
   * Check if dynamic tracking is needed
   */
  get needsDynamic() {
    return __privateGet(this, _needsDynamic);
  }
  // ==================== Scope Management ====================
  /**
   * Push a new isolated scope for nested unevaluatedProperties.
   * The new scope starts fresh and doesn't see parent's tracked properties.
   * Call popScope() when done to restore parent state.
   */
  pushScope() {
    if (!__privateGet(this, _active)) return;
    __privateGet(this, _scopeStack).push({
      staticProps: __privateGet(this, _staticProps),
      patterns: [...__privateGet(this, _patterns)],
      dynamicVar: __privateGet(this, _dynamicVar),
      needsDynamic: __privateGet(this, _needsDynamic),
      branchStack: [...__privateGet(this, _branchStack)]
    });
    __privateSet(this, _staticProps, void 0);
    __privateSet(this, _patterns, []);
    __privateSet(this, _dynamicVar, void 0);
    __privateSet(this, _needsDynamic, false);
    __privateSet(this, _branchStack, []);
  }
  /**
   * Pop the current scope and restore parent state.
   * Optionally merges the popped scope's tracked properties into the parent.
   */
  popScope(mergeToParent = false) {
    if (!__privateGet(this, _active) || __privateGet(this, _scopeStack).length === 0) return;
    const childDynamicVar = __privateGet(this, _dynamicVar);
    const parentState = __privateGet(this, _scopeStack).pop();
    __privateSet(this, _staticProps, parentState.staticProps);
    __privateSet(this, _patterns, parentState.patterns);
    __privateSet(this, _dynamicVar, parentState.dynamicVar);
    __privateSet(this, _needsDynamic, parentState.needsDynamic);
    __privateSet(this, _branchStack, parentState.branchStack);
    if (mergeToParent && childDynamicVar) {
      const parentVar = this.getDynamicVar();
      __privateGet(this, _code).line(_`Object.assign(${parentVar}, ${childDynamicVar});`);
    }
  }
  /**
   * Execute a callback within an isolated scope.
   * Use for schemas that have their own unevaluatedProperties.
   */
  withScope(fn, mergeToParent = false) {
    this.pushScope();
    const result = fn();
    this.popScope(mergeToParent);
    return result;
  }
  /**
   * Merge a branch back into main tracker.
   * Called when a branch validates successfully.
   * Emits property additions directly - no intermediate objects needed.
   */
  mergeBranch(branch, validVar) {
    if (!__privateGet(this, _active) || __privateGet(this, _staticProps) === true) return;
    const hasStaticProps = branch.staticProps.size > 0;
    const hasDynamicVar = branch.dynamicVar !== void 0;
    if (!hasStaticProps && !hasDynamicVar) return;
    const mainVar = this.getDynamicVar();
    const emitMergeCode = () => {
      for (const prop of branch.staticProps) {
        __privateGet(this, _code).line(_`${mainVar}[${stringify(prop)}] = true;`);
      }
      if (hasDynamicVar) {
        __privateGet(this, _code).line(_`Object.assign(${mainVar}, ${branch.dynamicVar});`);
      }
    };
    if (validVar.str === "true") {
      emitMergeCode();
    } else {
      __privateGet(this, _code).if(validVar, emitMergeCode);
    }
  }
};
_code = new WeakMap();
_active = new WeakMap();
_staticProps = new WeakMap();
_patterns = new WeakMap();
_dynamicVar = new WeakMap();
_needsDynamic = new WeakMap();
_branchStack = new WeakMap();
_scopeStack = new WeakMap();

// src/core/items-tracker.ts
function hasRestrictiveUnevaluatedItems(schema2) {
  if (typeof schema2 !== "object" || schema2 === null) return false;
  const unevalItems = schema2.unevaluatedItems;
  return unevalItems !== void 0 && unevalItems !== true;
}
function containsUnevaluatedItems(schema2, visited = /* @__PURE__ */ new Set()) {
  if (typeof schema2 !== "object" || schema2 === null) return false;
  if (visited.has(schema2)) return false;
  visited.add(schema2);
  const s = schema2;
  if (hasRestrictiveUnevaluatedItems(schema2)) return true;
  const checkArray = (arr) => {
    if (Array.isArray(arr)) {
      return arr.some((item) => containsUnevaluatedItems(item, visited));
    }
    return false;
  };
  if (checkArray(s.allOf)) return true;
  if (checkArray(s.anyOf)) return true;
  if (checkArray(s.oneOf)) return true;
  if (containsUnevaluatedItems(s.not, visited)) return true;
  if (containsUnevaluatedItems(s.if, visited)) return true;
  if (containsUnevaluatedItems(s.then, visited)) return true;
  if (containsUnevaluatedItems(s.else, visited)) return true;
  if (s.properties && typeof s.properties === "object") {
    for (const prop of Object.values(s.properties)) {
      if (containsUnevaluatedItems(prop, visited)) return true;
    }
  }
  if (s.patternProperties && typeof s.patternProperties === "object") {
    for (const prop of Object.values(s.patternProperties)) {
      if (containsUnevaluatedItems(prop, visited)) return true;
    }
  }
  if (containsUnevaluatedItems(s.additionalProperties, visited)) return true;
  if (containsUnevaluatedItems(s.items, visited)) return true;
  if (checkArray(s.prefixItems)) return true;
  if (containsUnevaluatedItems(s.contains, visited)) return true;
  if (containsUnevaluatedItems(s.additionalItems, visited)) return true;
  if (s.dependentSchemas && typeof s.dependentSchemas === "object") {
    for (const dep of Object.values(s.dependentSchemas)) {
      if (containsUnevaluatedItems(dep, visited)) return true;
    }
  }
  if (s.$defs && typeof s.$defs === "object") {
    for (const def of Object.values(s.$defs)) {
      if (containsUnevaluatedItems(def, visited)) return true;
    }
  }
  if (s.definitions && typeof s.definitions === "object") {
    for (const def of Object.values(s.definitions)) {
      if (containsUnevaluatedItems(def, visited)) return true;
    }
  }
  return false;
}
var _code2, _active2, _staticItems, _dynamicVar2, _needsDynamic2, _branchStack2, _scopeStack2;
var ItemsTracker = class {
  constructor(code, active = false) {
    __privateAdd(this, _code2);
    __privateAdd(this, _active2);
    /** Static items: number means items 0..n-1 are evaluated, true means all items evaluated */
    __privateAdd(this, _staticItems);
    /** Runtime tracking variable (holds Set of evaluated indices from contains) */
    __privateAdd(this, _dynamicVar2);
    /** Whether we need dynamic item tracking (for contains) */
    __privateAdd(this, _needsDynamic2, false);
    /** Stack of branch contexts */
    __privateAdd(this, _branchStack2, []);
    /** Stack of saved scope states for nested unevaluatedItems */
    __privateAdd(this, _scopeStack2, []);
    __privateSet(this, _code2, code);
    __privateSet(this, _active2, active);
  }
  /**
   * Check if tracking is active
   */
  get active() {
    return __privateGet(this, _active2);
  }
  /**
   * Activate tracking
   */
  activate() {
    __privateSet(this, _active2, true);
  }
  /**
   * Check if all items are marked as evaluated
   */
  get allItemsEvaluated() {
    return __privateGet(this, _staticItems) === true;
  }
  /**
   * Check if we're inside a branch context
   */
  get inBranch() {
    return __privateGet(this, _branchStack2).length > 0;
  }
  /**
   * Get the static item count (highest evaluated index + 1)
   */
  getStaticItemCount() {
    if (typeof __privateGet(this, _staticItems) === "number") {
      return __privateGet(this, _staticItems);
    }
    return 0;
  }
  /**
   * Mark items 0..count-1 as evaluated (from prefixItems).
   * Takes the maximum of the current count and the new count.
   */
  addPrefixItems(count) {
    if (!__privateGet(this, _active2) || __privateGet(this, _staticItems) === true) return;
    if (__privateGet(this, _branchStack2).length > 0) {
      const branch = __privateGet(this, _branchStack2)[__privateGet(this, _branchStack2).length - 1];
      branch.staticItemCount = Math.max(branch.staticItemCount, count);
      return;
    }
    if (__privateGet(this, _staticItems) === void 0) {
      __privateSet(this, _staticItems, count);
    } else {
      __privateSet(this, _staticItems, Math.max(__privateGet(this, _staticItems), count));
    }
  }
  /**
   * Mark all items as evaluated (from `items` keyword).
   */
  markAllItemsEvaluated() {
    if (!__privateGet(this, _active2)) return;
    if (__privateGet(this, _branchStack2).length > 0) {
      const branch = __privateGet(this, _branchStack2)[__privateGet(this, _branchStack2).length - 1];
      branch.allItemsEvaluated = true;
      return;
    }
    __privateSet(this, _staticItems, true);
    __privateSet(this, _needsDynamic2, false);
  }
  /**
   * Enable dynamic tracking mode.
   * Called when contains is used, since matched indices are determined at runtime.
   */
  enableDynamic() {
    if (!__privateGet(this, _active2) || __privateGet(this, _staticItems) === true) return;
    __privateSet(this, _needsDynamic2, true);
  }
  /**
   * Get or create the dynamic tracking variable.
   * Returns a variable that holds a Set of evaluated indices.
   */
  getDynamicVar() {
    if (!__privateGet(this, _active2)) {
      return new Name("__noop__");
    }
    if (__privateGet(this, _dynamicVar2)) return __privateGet(this, _dynamicVar2);
    __privateSet(this, _needsDynamic2, true);
    __privateSet(this, _dynamicVar2, __privateGet(this, _code2).genVar("evalItems"));
    __privateGet(this, _code2).line(_`const ${__privateGet(this, _dynamicVar2)} = new Set();`);
    return __privateGet(this, _dynamicVar2);
  }
  /**
   * Get the dynamic tracking variable if it exists, without creating it.
   * Returns undefined if not created yet.
   */
  peekDynamicVar() {
    return __privateGet(this, _dynamicVar2);
  }
  /**
   * Generate code to mark an item index as evaluated at runtime.
   * Used by contains to track which indices matched.
   */
  markItemEvaluated(indexVar) {
    if (!__privateGet(this, _active2) || __privateGet(this, _staticItems) === true) return;
    const v = this.getDynamicVar();
    __privateGet(this, _code2).line(_`${v}.add(${indexVar});`);
  }
  /**
   * Enter a branch context (anyOf/oneOf/if-then-else).
   * Creates a branch state for collecting items.
   * Returns the branch state for later merging.
   */
  enterBranch() {
    const branch = {
      staticItemCount: 0,
      allItemsEvaluated: false,
      dynamicVar: void 0,
      needsDynamic: false
    };
    if (!__privateGet(this, _active2) || __privateGet(this, _staticItems) === true) {
      return branch;
    }
    __privateGet(this, _branchStack2).push(branch);
    return branch;
  }
  /**
   * Exit the current branch context.
   */
  exitBranch() {
    if (__privateGet(this, _branchStack2).length > 0) {
      __privateGet(this, _branchStack2).pop();
    }
  }
  /**
   * Merge a branch back into main tracker.
   */
  mergeBranch(branch, validVar) {
    if (!__privateGet(this, _active2) || __privateGet(this, _staticItems) === true) return;
    const hasStaticItems = branch.staticItemCount > 0;
    const hasAllItems = branch.allItemsEvaluated;
    const hasDynamicVar = branch.dynamicVar !== void 0;
    if (!hasStaticItems && !hasAllItems && !hasDynamicVar) return;
    const mainVar = this.getDynamicVar();
    const emitMergeCode = () => {
      if (hasStaticItems) {
        const iVar = __privateGet(this, _code2).genVar("i");
        __privateGet(this, _code2).for(
          _`let ${iVar} = 0`,
          _`${iVar} < ${branch.staticItemCount}`,
          _`${iVar}++`,
          () => {
            __privateGet(this, _code2).line(_`${mainVar}.add(${iVar});`);
          }
        );
      }
      if (hasAllItems) {
        __privateGet(this, _code2).line(_`${mainVar}.allItemsEvaluated = true;`);
      }
      if (hasDynamicVar) {
        __privateGet(this, _code2).line(_`${branch.dynamicVar}.forEach(function(i) { ${mainVar}.add(i); });`);
      }
    };
    if (validVar.str === "true") {
      emitMergeCode();
    } else {
      __privateGet(this, _code2).if(validVar, emitMergeCode);
    }
  }
  /**
   * Generate the unevaluated item check.
   * Returns a Code expression that evaluates to true if the index is unevaluated.
   */
  isItemUnevaluated(indexVar) {
    if (!__privateGet(this, _active2)) return _`true`;
    if (__privateGet(this, _staticItems) === true) return _`false`;
    const conditions = [];
    if (typeof __privateGet(this, _staticItems) === "number" && __privateGet(this, _staticItems) > 0) {
      conditions.push(_`${indexVar} >= ${__privateGet(this, _staticItems)}`);
    }
    if (__privateGet(this, _needsDynamic2) && __privateGet(this, _dynamicVar2)) {
      conditions.push(_`!${__privateGet(this, _dynamicVar2)}.allItemsEvaluated`);
      conditions.push(_`!${__privateGet(this, _dynamicVar2)}.has(${indexVar})`);
    }
    if (__privateGet(this, _branchStack2).length > 0) {
      const branch = __privateGet(this, _branchStack2)[__privateGet(this, _branchStack2).length - 1];
      if (branch.allItemsEvaluated) {
        return _`false`;
      }
      if (branch.staticItemCount > 0) {
        conditions.push(_`${indexVar} >= ${branch.staticItemCount}`);
      }
      if (branch.dynamicVar) {
        conditions.push(_`!${branch.dynamicVar}.has(${indexVar})`);
      }
    }
    if (conditions.length === 0) {
      return _`true`;
    }
    return conditions.reduce((acc, cond) => _`${acc} && ${cond}`);
  }
  /**
   * Check if dynamic tracking is needed
   */
  get needsDynamic() {
    return __privateGet(this, _needsDynamic2);
  }
  // ==================== Scope Management ====================
  /**
   * Push a new isolated scope for nested unevaluatedItems.
   * The new scope starts fresh and doesn't see parent's tracked items.
   * Call popScope() when done to restore parent state.
   */
  pushScope() {
    if (!__privateGet(this, _active2)) return;
    __privateGet(this, _scopeStack2).push({
      staticItems: __privateGet(this, _staticItems),
      dynamicVar: __privateGet(this, _dynamicVar2),
      needsDynamic: __privateGet(this, _needsDynamic2),
      branchStack: [...__privateGet(this, _branchStack2)]
    });
    __privateSet(this, _staticItems, void 0);
    __privateSet(this, _dynamicVar2, void 0);
    __privateSet(this, _needsDynamic2, false);
    __privateSet(this, _branchStack2, []);
  }
  /**
   * Pop the current scope and restore parent state.
   * Optionally merges the popped scope's tracked items into the parent.
   */
  popScope(mergeToParent = false) {
    if (!__privateGet(this, _active2) || __privateGet(this, _scopeStack2).length === 0) return;
    const childDynamicVar = __privateGet(this, _dynamicVar2);
    const parentState = __privateGet(this, _scopeStack2).pop();
    __privateSet(this, _staticItems, parentState.staticItems);
    __privateSet(this, _dynamicVar2, parentState.dynamicVar);
    __privateSet(this, _needsDynamic2, parentState.needsDynamic);
    __privateSet(this, _branchStack2, parentState.branchStack);
    if (mergeToParent && childDynamicVar) {
      const parentVar = this.getDynamicVar();
      __privateGet(this, _code2).line(_`${childDynamicVar}.forEach(function(i) { ${parentVar}.add(i); });`);
    }
  }
  /**
   * Execute a callback within an isolated scope.
   * Use for schemas that have their own unevaluatedItems.
   */
  withScope(fn, mergeToParent = false) {
    this.pushScope();
    const result = fn();
    this.popScope(mergeToParent);
    return result;
  }
  /**
   * Execute a callback within a branch context.
   * Returns the branch state for merging after the callback completes.
   *
   * @param fn - The callback to execute
   * @param isolate - If true, push a new scope so the branch has isolated tracking
   */
  withBranch(fn, isolate = false) {
    if (isolate) {
      __privateSet(this, _active2, true);
      this.pushScope();
    }
    const branch = this.enterBranch();
    const result = fn();
    this.exitBranch();
    if (isolate) {
      this.popScope(false);
    }
    return { result, branch };
  }
};
_code2 = new WeakMap();
_active2 = new WeakMap();
_staticItems = new WeakMap();
_dynamicVar2 = new WeakMap();
_needsDynamic2 = new WeakMap();
_branchStack2 = new WeakMap();
_scopeStack2 = new WeakMap();

// src/core/annotation-tracker.ts
var _props, _items;
var AnnotationTracker = class {
  constructor(props, items) {
    __privateAdd(this, _props);
    __privateAdd(this, _items);
    __privateSet(this, _props, props);
    __privateSet(this, _items, items);
  }
  /** Access the underlying PropsTracker */
  get props() {
    return __privateGet(this, _props);
  }
  /** Access the underlying ItemsTracker */
  get items() {
    return __privateGet(this, _items);
  }
  /** Check if either tracker is active */
  get active() {
    return __privateGet(this, _props).active || __privateGet(this, _items).active;
  }
  /**
   * Ensure dynamic vars are created before branching.
   * Call this before entering branches in anyOf/oneOf.
   */
  ensureDynamicVars() {
    if (__privateGet(this, _props).active) {
      __privateGet(this, _props).getDynamicVar();
    }
    if (__privateGet(this, _items).active) {
      __privateGet(this, _items).getDynamicVar();
    }
  }
  /**
   * Enter a branch with optional schema-based isolation.
   * Use for anyOf/oneOf where subschemas may have their own unevaluatedProperties/Items.
   *
   * @param schema - The subschema to check for isolation needs (optional)
   * @returns BranchHandle to pass to exitBranch and mergeBranch
   */
  enterBranch(schema2) {
    const propsIsolate = schema2 ? hasRestrictiveUnevaluatedProperties(schema2) : false;
    const itemsIsolate = schema2 ? hasRestrictiveUnevaluatedItems(schema2) : false;
    const props = __privateGet(this, _props).enterBranch();
    const items = __privateGet(this, _items).enterBranch();
    if (propsIsolate) __privateGet(this, _props).pushScope();
    if (itemsIsolate) __privateGet(this, _items).pushScope();
    return { props, items, propsIsolate, itemsIsolate };
  }
  /**
   * Exit a branch context.
   * Must be called after the branch code is generated, before mergeBranch.
   */
  exitBranch(handle) {
    if (handle.propsIsolate) __privateGet(this, _props).popScope(false);
    if (handle.itemsIsolate) __privateGet(this, _items).popScope(false);
    __privateGet(this, _props).exitBranch();
    __privateGet(this, _items).exitBranch();
  }
  /**
   * Merge a branch's annotations based on a condition variable.
   * Call after exitBranch.
   */
  mergeBranch(handle, validVar) {
    __privateGet(this, _props).mergeBranch(handle.props, validVar);
    __privateGet(this, _items).mergeBranch(handle.items, validVar);
  }
  /**
   * Combined exit and merge for convenience.
   * Use when you have the validVar ready immediately after generating the check.
   */
  exitAndMergeBranch(handle, validVar) {
    this.exitBranch(handle);
    this.mergeBranch(handle, validVar);
  }
  /**
   * Execute code within an isolated scope that discards annotations.
   * Use for 'not' keyword where annotations should not propagate.
   */
  withDiscardedScope(fn) {
    __privateGet(this, _props).pushScope();
    __privateGet(this, _items).pushScope();
    const result = fn();
    __privateGet(this, _props).popScope(false);
    __privateGet(this, _items).popScope(false);
    return result;
  }
  /**
   * Execute code with conditional scope isolation based on schema.
   * Use for $ref inlining where the ref target may have unevaluatedProperties/Items.
   */
  withConditionalScope(schema2, fn) {
    const propsIsolate = hasRestrictiveUnevaluatedProperties(schema2);
    const itemsIsolate = hasRestrictiveUnevaluatedItems(schema2);
    if (propsIsolate) __privateGet(this, _props).pushScope();
    if (itemsIsolate) __privateGet(this, _items).pushScope();
    const result = fn();
    if (propsIsolate) __privateGet(this, _props).popScope(false);
    if (itemsIsolate) __privateGet(this, _items).popScope(false);
    return result;
  }
  /**
   * Execute code with items-only scope isolation.
   * Use for array item validation where nested arrays are different instances.
   */
  withItemsScope(fn) {
    __privateGet(this, _items).pushScope();
    const result = fn();
    __privateGet(this, _items).popScope(false);
    return result;
  }
};
_props = new WeakMap();
_items = new WeakMap();

// src/core/context.ts
var VOCABULARIES = {
  core: "https://json-schema.org/draft/2020-12/vocab/core",
  applicator: "https://json-schema.org/draft/2020-12/vocab/applicator",
  validation: "https://json-schema.org/draft/2020-12/vocab/validation",
  meta_data: "https://json-schema.org/draft/2020-12/vocab/meta-data",
  format_annotation: "https://json-schema.org/draft/2020-12/vocab/format-annotation",
  format_assertion: "https://json-schema.org/draft/2020-12/vocab/format-assertion",
  content: "https://json-schema.org/draft/2020-12/vocab/content",
  unevaluated: "https://json-schema.org/draft/2020-12/vocab/unevaluated"
};
function supportsFeature(schemaUri, feature) {
  const isModernDraft = schemaUri.includes("2020-12") || schemaUri.includes("2021") || schemaUri.includes("2022") || schemaUri.includes("2023") || schemaUri.includes("2024") || schemaUri.includes("2025");
  const is2019 = schemaUri.includes("2019-09");
  const isLegacy = !isModernDraft && !is2019;
  switch (feature) {
    case "prefixItems":
      return isModernDraft;
    case "modernRef":
      return isModernDraft || is2019;
    case "unevaluated":
      return isModernDraft || is2019;
    case "formatAssertion":
      return isLegacy;
    case "contentAssertion":
      return isLegacy;
    case "legacyRef":
      return isLegacy;
    default:
      return true;
  }
}
var _funcCounter, _compiledRefs, _schemasById, _anchors, _dynamicAnchors, _schemaToBaseUri, _refCache, _resourceDynamicAnchors, _resourceRecursiveAnchors, _runtimeFunctions, _compileQueue, _rootSchema, _enabledVocabularies, _hasCustomVocabulary, _mainFuncName, _subschemaStack, _inlineProcessing, _rootUsesDynamicRefs, _propsTracker, _itemsTracker, _codeBuilder, _annotationTracker, _validateSubschemaFn, _dynamicScopeVar, _dataVar, _pathExprCode, _currentSchema, _CompileContext_instances, resolveVocabularies_fn, collectAnchors_fn, resolveUri_fn, resolveJsonPointer_fn, schemaUsesDynamicRefs_fn, getDraftVersion_fn;
var CompileContext = class {
  constructor(rootSchema, options = {}) {
    __privateAdd(this, _CompileContext_instances);
    /** Options for compilation */
    __publicField(this, "options");
    /** Counter for generating unique function names */
    __privateAdd(this, _funcCounter, 0);
    /** Map of schema reference -> compiled function name */
    __privateAdd(this, _compiledRefs, /* @__PURE__ */ new Map());
    /** Map of schema $id -> schema */
    __privateAdd(this, _schemasById, /* @__PURE__ */ new Map());
    /** Map of anchor name -> schema */
    __privateAdd(this, _anchors, /* @__PURE__ */ new Map());
    /** Map of dynamic anchor name -> list of schemas with that $dynamicAnchor */
    __privateAdd(this, _dynamicAnchors, /* @__PURE__ */ new Map());
    /** Map of schema -> its base URI */
    __privateAdd(this, _schemaToBaseUri, /* @__PURE__ */ new Map());
    /** Cache for resolved refs: (baseUri|ref) -> schema */
    __privateAdd(this, _refCache, /* @__PURE__ */ new Map());
    /** Map of schema resource (by $id) -> all dynamic anchors within that resource */
    __privateAdd(this, _resourceDynamicAnchors, /* @__PURE__ */ new Map());
    /** Map of schema resource (by $id) -> schema with $recursiveAnchor: true (draft 2019-09) */
    __privateAdd(this, _resourceRecursiveAnchors, /* @__PURE__ */ new Map());
    /** Runtime functions/values that will be available in generated code */
    __privateAdd(this, _runtimeFunctions, /* @__PURE__ */ new Map());
    /** Schemas that need to be compiled (queue) */
    __privateAdd(this, _compileQueue, []);
    /** Root schema for JSON pointer resolution */
    __privateAdd(this, _rootSchema);
    /** Set of enabled vocabulary URIs (null means no custom vocabulary, use defaults) */
    __privateAdd(this, _enabledVocabularies);
    /** Whether the schema uses a custom metaschema with explicit $vocabulary */
    __privateAdd(this, _hasCustomVocabulary);
    /** Main function name for error assignment */
    __privateAdd(this, _mainFuncName, null);
    /** Stack for subschema check contexts (for labeled block approach) */
    __privateAdd(this, _subschemaStack, []);
    /** Set of schemas currently being processed inline (for cycle detection) */
    __privateAdd(this, _inlineProcessing, /* @__PURE__ */ new Set());
    /** Whether the root schema uses $dynamicRef or $recursiveRef (requires dynamic scope) */
    __privateAdd(this, _rootUsesDynamicRefs);
    /** Property tracker for unevaluatedProperties support */
    __privateAdd(this, _propsTracker, null);
    /** Items tracker for unevaluatedItems support */
    __privateAdd(this, _itemsTracker, null);
    /** Code builder reference (set when trackers are initialized) */
    __privateAdd(this, _codeBuilder, null);
    /** Unified annotation tracker (singleton, created on first access) */
    __privateAdd(this, _annotationTracker, null);
    /** Callback for recursive sub-schema validation (set by compiler to break circular dep) */
    __privateAdd(this, _validateSubschemaFn, null);
    /** Current dynamic scope variable (set by compiler) */
    __privateAdd(this, _dynamicScopeVar);
    /** Current data variable being validated */
    __privateAdd(this, _dataVar, null);
    /** Current path expression code */
    __privateAdd(this, _pathExprCode, null);
    /** Current schema being validated */
    __privateAdd(this, _currentSchema, null);
    __privateSet(this, _rootSchema, rootSchema);
    const defaultMeta = options.defaultMeta ?? "https://json-schema.org/draft/2020-12/schema";
    const schemaUri = (typeof rootSchema === "object" && rootSchema !== null ? rootSchema.$schema : void 0) ?? defaultMeta;
    this.options = {
      // Auto-detect from dialect if not explicitly set
      formatAssertion: options.formatAssertion ?? supportsFeature(schemaUri, "formatAssertion"),
      contentAssertion: options.contentAssertion ?? supportsFeature(schemaUri, "contentAssertion"),
      remotes: options.remotes ?? {},
      legacyRef: options.legacyRef ?? supportsFeature(schemaUri, "legacyRef"),
      coerce: options.coerce ?? false,
      defaultMeta
    };
    for (const [uri, schema2] of Object.entries(this.options.remotes)) {
      if (typeof schema2 === "object" && schema2 !== null) {
        __privateGet(this, _schemasById).set(uri, schema2);
        if (schema2.$id) {
          __privateGet(this, _schemasById).set(schema2.$id, schema2);
        }
        __privateMethod(this, _CompileContext_instances, collectAnchors_fn).call(this, schema2, schema2.$id ?? uri);
      }
    }
    const rootBaseUri = typeof rootSchema === "object" && rootSchema !== null && rootSchema.$id ? rootSchema.$id : "";
    __privateMethod(this, _CompileContext_instances, collectAnchors_fn).call(this, rootSchema, rootBaseUri, rootBaseUri || "__root__");
    const vocabResult = __privateMethod(this, _CompileContext_instances, resolveVocabularies_fn).call(this, rootSchema);
    __privateSet(this, _enabledVocabularies, vocabResult.vocabularies);
    __privateSet(this, _hasCustomVocabulary, vocabResult.hasCustomVocabulary);
    __privateSet(this, _rootUsesDynamicRefs, __privateMethod(this, _CompileContext_instances, schemaUsesDynamicRefs_fn).call(this, rootSchema, /* @__PURE__ */ new Set()));
  }
  /**
   * Generate a unique function name for a schema.
   * The first call sets the main function name used for error assignment.
   */
  genFuncName() {
    const name = new Name(`validate${__privateWrapper(this, _funcCounter)._++}`);
    if (__privateGet(this, _mainFuncName) === null) {
      __privateSet(this, _mainFuncName, name);
    }
    return name;
  }
  /**
   * Get the main function name for error assignment in generated code.
   */
  getMainFuncName() {
    if (__privateGet(this, _mainFuncName) === null) {
      throw new Error("Main function name not yet generated");
    }
    return __privateGet(this, _mainFuncName);
  }
  /**
   * Generate a unique name for a runtime value
   */
  genRuntimeName(prefix) {
    return `${prefix}${__privateWrapper(this, _funcCounter)._++}`;
  }
  /**
   * Check if a schema has already been compiled
   */
  isCompiled(schema2) {
    return __privateGet(this, _compiledRefs).has(schema2);
  }
  /**
   * Get the function name for a compiled schema
   */
  getCompiledName(schema2) {
    return __privateGet(this, _compiledRefs).get(schema2);
  }
  /**
   * Register a schema as compiled with its function name
   */
  registerCompiled(schema2, funcName) {
    __privateGet(this, _compiledRefs).set(schema2, funcName);
  }
  /**
   * Queue a schema for compilation (used for $ref targets)
   */
  queueCompile(schema2) {
    const existing = __privateGet(this, _compiledRefs).get(schema2);
    if (existing) return existing;
    const funcName = this.genFuncName();
    __privateGet(this, _compiledRefs).set(schema2, funcName);
    __privateGet(this, _compileQueue).push({ schema: schema2, funcName });
    return funcName;
  }
  /**
   * Get the next schema to compile from the queue
   */
  nextToCompile() {
    return __privateGet(this, _compileQueue).shift();
  }
  /**
   * Check if a schema is currently being processed inline (cycle detection)
   */
  isProcessingInline(schema2) {
    return __privateGet(this, _inlineProcessing).has(schema2);
  }
  /**
   * Mark a schema as being processed inline
   */
  enterInlineProcessing(schema2) {
    __privateGet(this, _inlineProcessing).add(schema2);
  }
  /**
   * Mark a schema as no longer being processed inline
   */
  exitInlineProcessing(schema2) {
    __privateGet(this, _inlineProcessing).delete(schema2);
  }
  /**
   * Resolve a $ref to a schema
   */
  resolveRef(ref, fromSchema) {
    const currentBaseUri = __privateGet(this, _schemaToBaseUri).get(fromSchema) ?? "";
    const cacheKey = `${currentBaseUri}|${ref}`;
    if (__privateGet(this, _refCache).has(cacheKey)) {
      return __privateGet(this, _refCache).get(cacheKey);
    }
    let resolved;
    if (ref === "#") {
      if (currentBaseUri) {
        resolved = __privateGet(this, _schemasById).get(currentBaseUri);
      } else {
        resolved = __privateGet(this, _rootSchema);
      }
    } else if (ref.startsWith("#/")) {
      if (currentBaseUri) {
        const baseSchema = __privateGet(this, _schemasById).get(currentBaseUri);
        if (baseSchema) {
          resolved = __privateMethod(this, _CompileContext_instances, resolveJsonPointer_fn).call(this, baseSchema, ref.slice(1));
        }
      } else {
        resolved = __privateMethod(this, _CompileContext_instances, resolveJsonPointer_fn).call(this, __privateGet(this, _rootSchema), ref.slice(1));
      }
    } else {
      const anchorMatch = ref.match(/^#([a-zA-Z][a-zA-Z0-9_-]*)$/);
      if (anchorMatch) {
        if (currentBaseUri) {
          const fullAnchorUri = `${currentBaseUri}#${anchorMatch[1]}`;
          resolved = __privateGet(this, _anchors).get(fullAnchorUri);
          if (!resolved) {
            resolved = __privateGet(this, _anchors).get(anchorMatch[1]);
          }
        } else {
          resolved = __privateGet(this, _anchors).get(anchorMatch[1]);
        }
      } else {
        const fragmentIndex = ref.indexOf("#");
        if (fragmentIndex !== -1) {
          const refBaseUri = ref.slice(0, fragmentIndex);
          const fragment = ref.slice(fragmentIndex);
          const resolvedUri = __privateMethod(this, _CompileContext_instances, resolveUri_fn).call(this, refBaseUri, currentBaseUri);
          let baseSchema = __privateGet(this, _schemasById).get(resolvedUri);
          if (!baseSchema && fragment === "#") {
            baseSchema = __privateGet(this, _schemasById).get(resolvedUri + "#");
          }
          if (baseSchema) {
            if (fragment === "#") {
              resolved = baseSchema;
            } else if (fragment.startsWith("#/")) {
              resolved = __privateMethod(this, _CompileContext_instances, resolveJsonPointer_fn).call(this, baseSchema, fragment.slice(1));
              if (resolved && typeof resolved === "object" && !__privateGet(this, _schemaToBaseUri).has(resolved)) {
                __privateGet(this, _schemaToBaseUri).set(resolved, resolvedUri);
              }
            } else {
              const anchorName = fragment.slice(1);
              resolved = __privateGet(this, _anchors).get(`${resolvedUri}#${anchorName}`) ?? __privateGet(this, _anchors).get(anchorName);
            }
          }
        } else {
          const resolvedRef = __privateMethod(this, _CompileContext_instances, resolveUri_fn).call(this, ref, currentBaseUri);
          resolved = __privateGet(this, _schemasById).get(resolvedRef) ?? __privateGet(this, _schemasById).get(ref);
        }
      }
    }
    __privateGet(this, _refCache).set(cacheKey, resolved);
    return resolved;
  }
  /**
   * Register a runtime value (available in generated code)
   */
  addRuntimeFunction(name, value) {
    __privateGet(this, _runtimeFunctions).set(name, value);
  }
  /**
   * Get all runtime values
   */
  getRuntimeFunctions() {
    return __privateGet(this, _runtimeFunctions);
  }
  /**
   * Get base URI for a schema
   */
  getBaseUri(schema2) {
    return __privateGet(this, _schemaToBaseUri).get(schema2) ?? "";
  }
  /**
   * Get all schemas with a given $dynamicAnchor name
   */
  getDynamicAnchors(anchorName) {
    return __privateGet(this, _dynamicAnchors).get(anchorName) ?? [];
  }
  /**
   * Check if a schema has a $dynamicAnchor
   */
  hasDynamicAnchor(schema2) {
    return typeof schema2 === "object" && schema2 !== null && schema2.$dynamicAnchor !== void 0;
  }
  /**
   * Get the $dynamicAnchor name for a schema
   */
  getDynamicAnchorName(schema2) {
    if (typeof schema2 === "object" && schema2 !== null) {
      return schema2.$dynamicAnchor;
    }
    return void 0;
  }
  /**
   * Get all dynamic anchors for a schema resource (by its $id or '__root__' for root without $id)
   */
  getResourceDynamicAnchors(resourceId) {
    return __privateGet(this, _resourceDynamicAnchors).get(resourceId) ?? [];
  }
  /**
   * Get the resource ID ($id) for a schema
   */
  getSchemaResourceId(schema2) {
    if (typeof schema2 === "object" && schema2 !== null && schema2.$id) {
      return __privateGet(this, _schemaToBaseUri).get(schema2);
    }
    return void 0;
  }
  /**
   * Get root schema
   */
  getRootSchema() {
    return __privateGet(this, _rootSchema);
  }
  /**
   * Extract the resource ID from a $ref string, resolving it against the current base URI.
   * Returns the base URI of the schema resource being referenced, or undefined if the ref
   * is just a fragment reference (like "#/defs/foo" or "#anchor").
   */
  getRefResourceId(ref, fromSchema) {
    if (ref.startsWith("#")) {
      return void 0;
    }
    const currentBaseUri = __privateGet(this, _schemaToBaseUri).get(fromSchema) ?? "";
    const fragmentIndex = ref.indexOf("#");
    const refUri = fragmentIndex !== -1 ? ref.slice(0, fragmentIndex) : ref;
    if (!refUri) {
      return void 0;
    }
    const resolvedUri = __privateMethod(this, _CompileContext_instances, resolveUri_fn).call(this, refUri, currentBaseUri);
    if (__privateGet(this, _schemasById).has(resolvedUri)) {
      return resolvedUri;
    }
    return void 0;
  }
  /**
   * Check if a vocabulary is enabled for this schema
   * @param vocabularyUri - The vocabulary URI to check (typically a 2020-12 vocab URI)
   * @returns true if the vocabulary is enabled
   */
  isVocabularyEnabled(vocabularyUri) {
    if (__privateGet(this, _enabledVocabularies) === null) {
      return true;
    }
    if (__privateGet(this, _enabledVocabularies).has(vocabularyUri)) {
      return true;
    }
    const vocab2019Map = {
      "https://json-schema.org/draft/2020-12/vocab/core": "https://json-schema.org/draft/2019-09/vocab/core",
      "https://json-schema.org/draft/2020-12/vocab/applicator": "https://json-schema.org/draft/2019-09/vocab/applicator",
      "https://json-schema.org/draft/2020-12/vocab/validation": "https://json-schema.org/draft/2019-09/vocab/validation",
      "https://json-schema.org/draft/2020-12/vocab/meta-data": "https://json-schema.org/draft/2019-09/vocab/meta-data",
      "https://json-schema.org/draft/2020-12/vocab/format-annotation": "https://json-schema.org/draft/2019-09/vocab/format",
      "https://json-schema.org/draft/2020-12/vocab/format-assertion": "https://json-schema.org/draft/2019-09/vocab/format",
      "https://json-schema.org/draft/2020-12/vocab/content": "https://json-schema.org/draft/2019-09/vocab/content"
    };
    const equiv2019 = vocab2019Map[vocabularyUri];
    if (equiv2019 && __privateGet(this, _enabledVocabularies).has(equiv2019)) {
      return true;
    }
    return false;
  }
  /**
   * Check if the schema uses a custom metaschema with explicit $vocabulary
   */
  hasCustomVocabulary() {
    return __privateGet(this, _hasCustomVocabulary);
  }
  /**
   * Check if the schema tree has any $dynamicAnchor definitions
   * Used to determine if we can safely optimize $ref chains
   */
  hasAnyDynamicAnchors() {
    return __privateGet(this, _dynamicAnchors).size > 0;
  }
  /**
   * Check if the schema tree has any $recursiveAnchor definitions (draft 2019-09)
   */
  hasAnyRecursiveAnchors() {
    return __privateGet(this, _resourceRecursiveAnchors).size > 0;
  }
  /**
   * Get the schema with $recursiveAnchor: true for a given resource ID (draft 2019-09)
   */
  getResourceRecursiveAnchor(resourceId) {
    return __privateGet(this, _resourceRecursiveAnchors).get(resourceId);
  }
  /**
   * Get all schemas with $recursiveAnchor: true (draft 2019-09)
   */
  getRecursiveAnchors() {
    return Array.from(__privateGet(this, _resourceRecursiveAnchors).values());
  }
  /**
   * Get all schemas with $recursiveAnchor: true
   * Used for tracking all possible properties/items that could be evaluated
   * when $recursiveRef dynamically resolves
   */
  getAllRecursiveAnchorSchemas() {
    return Array.from(__privateGet(this, _resourceRecursiveAnchors).values());
  }
  /**
   * Check if a schema has $recursiveAnchor: true (draft 2019-09)
   */
  hasRecursiveAnchor(schema2) {
    return typeof schema2 === "object" && schema2 !== null && schema2.$recursiveAnchor === true;
  }
  /**
   * Check if the root schema uses $dynamicRef or $recursiveRef.
   * This is used to determine if dynamic scope is needed at runtime.
   * Unlike hasAnyDynamicAnchors/hasAnyRecursiveAnchors, this only checks
   * the main schema, not remotes that may never be referenced.
   */
  rootUsesDynamicRefs() {
    return __privateGet(this, _rootUsesDynamicRefs);
  }
  /**
   * Check if a schema uses a different draft than the root schema.
   * Returns the schema's $schema URI if it's different, undefined otherwise.
   */
  getCrossDraftSchema(schema2) {
    if (typeof schema2 !== "object" || schema2 === null || !schema2.$schema) {
      return void 0;
    }
    const rootSchemaUri = typeof __privateGet(this, _rootSchema) === "object" && __privateGet(this, _rootSchema) !== null ? __privateGet(this, _rootSchema).$schema : void 0;
    const rootMeta = rootSchemaUri ?? this.options.defaultMeta;
    const refDraft = __privateMethod(this, _CompileContext_instances, getDraftVersion_fn).call(this, schema2.$schema);
    const rootDraft = __privateMethod(this, _CompileContext_instances, getDraftVersion_fn).call(this, rootMeta);
    if (refDraft !== rootDraft) {
      return schema2.$schema;
    }
    return void 0;
  }
  /**
   * Initialize the property tracker for unevaluatedProperties support.
   * Must be called before accessing the tracker.
   *
   * @param code - The CodeBuilder instance
   * @param active - Whether tracking should be active (schema contains unevaluatedProperties)
   */
  initPropsTracker(code, active) {
    __privateSet(this, _codeBuilder, code);
    __privateSet(this, _propsTracker, new PropsTracker(code, active));
  }
  /**
   * Initialize the items tracker for unevaluatedItems support.
   * Must be called before accessing the tracker.
   *
   * @param code - The CodeBuilder instance
   * @param active - Whether tracking should be active (schema contains unevaluatedItems)
   */
  initItemsTracker(code, active) {
    __privateSet(this, _codeBuilder, code);
    __privateSet(this, _itemsTracker, new ItemsTracker(code, active));
  }
  /**
   * Get the property tracker.
   * Returns an inactive tracker if not initialized.
   */
  getPropsTracker() {
    if (!__privateGet(this, _propsTracker)) {
      throw new Error("PropsTracker not initialized. Call initPropsTracker first.");
    }
    return __privateGet(this, _propsTracker);
  }
  /**
   * Get the items tracker.
   * Returns an inactive tracker if not initialized.
   */
  getItemsTracker() {
    if (!__privateGet(this, _itemsTracker)) {
      throw new Error("ItemsTracker not initialized. Call initItemsTracker first.");
    }
    return __privateGet(this, _itemsTracker);
  }
  /**
   * Check if property tracking is active.
   */
  hasActivePropsTracking() {
    return __privateGet(this, _propsTracker)?.active ?? false;
  }
  /**
   * Get a unified annotation tracker that coordinates both props and items tracking.
   */
  getAnnotationTracker() {
    return new AnnotationTracker(this.getPropsTracker(), this.getItemsTracker());
  }
  // ==================== Subschema Check Mode ====================
  /**
   * Enter a subschema check context.
   * In this mode, genError will use `break` instead of `return false`.
   */
  enterSubschemaCheck(label, validVar) {
    __privateGet(this, _subschemaStack).push({ label, validVar });
  }
  /**
   * Exit the current subschema check context.
   */
  exitSubschemaCheck() {
    __privateGet(this, _subschemaStack).pop();
  }
  /**
   * Check if we're inside a subschema check context.
   */
  isInSubschemaCheck() {
    return __privateGet(this, _subschemaStack).length > 0;
  }
  /**
   * Get the label for the current subschema check block.
   */
  getSubschemaLabel() {
    if (__privateGet(this, _subschemaStack).length === 0) {
      throw new Error("Not in subschema check context");
    }
    return __privateGet(this, _subschemaStack)[__privateGet(this, _subschemaStack).length - 1].label;
  }
  /**
   * Get the valid variable for the current subschema check.
   */
  getSubschemaValidVar() {
    if (__privateGet(this, _subschemaStack).length === 0) {
      throw new Error("Not in subschema check context");
    }
    return __privateGet(this, _subschemaStack)[__privateGet(this, _subschemaStack).length - 1].validVar;
  }
  // ==================== Unified Context API ====================
  /**
   * Get the CodeBuilder instance.
   * Must be initialized first via initPropsTracker/initItemsTracker.
   */
  get code() {
    if (!__privateGet(this, _codeBuilder)) {
      throw new Error("CodeBuilder not initialized. Call initPropsTracker/initItemsTracker first.");
    }
    return __privateGet(this, _codeBuilder);
  }
  /**
   * Get the unified annotation tracker (singleton).
   * Coordinates both props and items tracking.
   */
  get tracker() {
    if (!__privateGet(this, _annotationTracker)) {
      __privateSet(this, _annotationTracker, new AnnotationTracker(
        this.getPropsTracker(),
        this.getItemsTracker()
      ));
    }
    return __privateGet(this, _annotationTracker);
  }
  /**
   * Set the validateSubschema callback.
   * Called by the compiler to inject the recursive validation function.
   */
  setValidateSubschemaFn(fn) {
    __privateSet(this, _validateSubschemaFn, fn);
  }
  /**
   * Set the current dynamic scope variable.
   * Called by the compiler when entering a schema with dynamic scope.
   */
  setDynamicScopeVar(scopeVar) {
    __privateSet(this, _dynamicScopeVar, scopeVar);
  }
  /**
   * Get the current dynamic scope variable.
   */
  getDynamicScopeVar() {
    return __privateGet(this, _dynamicScopeVar);
  }
  /**
   * Set the current schema, data variable, and path expression.
   * Called by the compiler before invoking keyword handlers.
   */
  setSchemaContext(schema2, dataVar, pathExprCode) {
    __privateSet(this, _currentSchema, schema2);
    __privateSet(this, _dataVar, dataVar);
    __privateSet(this, _pathExprCode, pathExprCode);
  }
  /**
   * Save the current schema context and return a restore function.
   * Used when recursing into subschemas that modify the context.
   */
  saveSchemaContext() {
    const savedSchema = __privateGet(this, _currentSchema);
    const savedDataVar = __privateGet(this, _dataVar);
    const savedPathExprCode = __privateGet(this, _pathExprCode);
    return () => {
      __privateSet(this, _currentSchema, savedSchema);
      __privateSet(this, _dataVar, savedDataVar);
      __privateSet(this, _pathExprCode, savedPathExprCode);
    };
  }
  /**
   * Get the current schema being validated.
   */
  get schema() {
    if (!__privateGet(this, _currentSchema)) {
      throw new Error("Schema not set. Call setSchemaContext first.");
    }
    return __privateGet(this, _currentSchema);
  }
  /**
   * Get the current data variable being validated.
   */
  get data() {
    if (!__privateGet(this, _dataVar)) {
      throw new Error("Data variable not set. Call setSchemaContext first.");
    }
    return __privateGet(this, _dataVar);
  }
  /**
   * Get the current path expression code.
   */
  get path() {
    if (!__privateGet(this, _pathExprCode)) {
      throw new Error("Path expression not set. Call setSchemaContext first.");
    }
    return __privateGet(this, _pathExprCode);
  }
  /**
   * Temporarily set a different path expression and execute a callback.
   * Restores the original path after the callback completes.
   */
  withPath(pathExprCode, fn) {
    const oldPath = __privateGet(this, _pathExprCode);
    __privateSet(this, _pathExprCode, pathExprCode);
    try {
      fn();
    } finally {
      __privateSet(this, _pathExprCode, oldPath);
    }
  }
  /**
   * Validate a sub-schema recursively.
   * Uses the injected callback to call generateSchemaValidator.
   */
  validateSubschema(schema2, dataVar, pathExprCode, dynamicScopeVar) {
    if (!__privateGet(this, _validateSubschemaFn)) {
      throw new Error(
        "validateSubschema not initialized. Compiler must call setValidateSubschemaFn."
      );
    }
    const scopeVar = dynamicScopeVar ?? __privateGet(this, _dynamicScopeVar);
    const savedSchema = __privateGet(this, _currentSchema);
    const savedDataVar = __privateGet(this, _dataVar);
    const savedPathExprCode = __privateGet(this, _pathExprCode);
    __privateGet(this, _validateSubschemaFn).call(this, schema2, dataVar, pathExprCode, this, scopeVar);
    __privateSet(this, _currentSchema, savedSchema);
    __privateSet(this, _dataVar, savedDataVar);
    __privateSet(this, _pathExprCode, savedPathExprCode);
  }
  /**
   * Generate error code.
   * Emits code to set errors and return false (or break in subschema mode).
   * Uses the current path from setDataContext().
   */
  genError(keyword, message, params) {
    const code = this.code;
    const pathExprCode = this.path;
    const schemaPath = `#/${keyword}`;
    if (this.isInSubschemaCheck()) {
      const validVar = this.getSubschemaValidVar();
      const label = this.getSubschemaLabel();
      code.line(_`${validVar} = false;`);
      code.line(_`break ${label};`);
      return;
    }
    const pathStr = pathExprCode.toString();
    const isStaticPath = pathStr === "''" || pathStr === '""';
    if (isStaticPath) {
      const errorKey = `err_${schemaPath.replace(/[^a-zA-Z0-9]/g, "_")}`;
      const errorName = new Name(errorKey);
      const errorArray = [
        {
          instancePath: "",
          schemaPath,
          keyword,
          params,
          message
        }
      ];
      this.addRuntimeFunction(errorKey, errorArray);
      code.line(_`${this.getMainFuncName()}.errors = ${errorName};`);
    } else {
      const paramsCode = stringify(params);
      const errObj = _`{ instancePath: ${pathExprCode}, schemaPath: ${schemaPath}, keyword: ${keyword}, params: ${paramsCode}, message: ${message} }`;
      code.line(_`${this.getMainFuncName()}.errors = [${errObj}];`);
    }
    code.line(_`return false;`);
  }
};
_funcCounter = new WeakMap();
_compiledRefs = new WeakMap();
_schemasById = new WeakMap();
_anchors = new WeakMap();
_dynamicAnchors = new WeakMap();
_schemaToBaseUri = new WeakMap();
_refCache = new WeakMap();
_resourceDynamicAnchors = new WeakMap();
_resourceRecursiveAnchors = new WeakMap();
_runtimeFunctions = new WeakMap();
_compileQueue = new WeakMap();
_rootSchema = new WeakMap();
_enabledVocabularies = new WeakMap();
_hasCustomVocabulary = new WeakMap();
_mainFuncName = new WeakMap();
_subschemaStack = new WeakMap();
_inlineProcessing = new WeakMap();
_rootUsesDynamicRefs = new WeakMap();
_propsTracker = new WeakMap();
_itemsTracker = new WeakMap();
_codeBuilder = new WeakMap();
_annotationTracker = new WeakMap();
_validateSubschemaFn = new WeakMap();
_dynamicScopeVar = new WeakMap();
_dataVar = new WeakMap();
_pathExprCode = new WeakMap();
_currentSchema = new WeakMap();
_CompileContext_instances = new WeakSet();
/**
 * Resolve vocabularies from the root schema's $schema metaschema
 */
resolveVocabularies_fn = function(schema2) {
  if (typeof schema2 !== "object" || schema2 === null || !schema2.$schema) {
    return { vocabularies: null, hasCustomVocabulary: false };
  }
  const schemaUri = schema2.$schema.toLowerCase().replace(/#$/, "");
  const isStandardMeta = schemaUri.includes("json-schema.org/draft") || schemaUri === "https://json-schema.org/draft/2020-12/schema" || schemaUri === "https://json-schema.org/draft/2019-09/schema" || schemaUri === "http://json-schema.org/draft-07/schema" || schemaUri === "http://json-schema.org/draft-06/schema" || schemaUri === "http://json-schema.org/draft-04/schema";
  if (isStandardMeta) {
    return { vocabularies: null, hasCustomVocabulary: false };
  }
  const metaschema = __privateGet(this, _schemasById).get(schema2.$schema);
  if (!metaschema || typeof metaschema !== "object" || metaschema === null) {
    return { vocabularies: null, hasCustomVocabulary: false };
  }
  const vocabulary = metaschema.$vocabulary;
  if (!vocabulary || typeof vocabulary !== "object") {
    return { vocabularies: null, hasCustomVocabulary: false };
  }
  const enabled = /* @__PURE__ */ new Set();
  const implementedVocabs = /* @__PURE__ */ new Set([
    "https://json-schema.org/draft/2019-09/vocab/core",
    "https://json-schema.org/draft/2019-09/vocab/applicator",
    "https://json-schema.org/draft/2019-09/vocab/validation",
    "https://json-schema.org/draft/2019-09/vocab/meta-data",
    "https://json-schema.org/draft/2019-09/vocab/format",
    "https://json-schema.org/draft/2019-09/vocab/content",
    "https://json-schema.org/draft/2020-12/vocab/core",
    "https://json-schema.org/draft/2020-12/vocab/applicator",
    "https://json-schema.org/draft/2020-12/vocab/validation",
    "https://json-schema.org/draft/2020-12/vocab/meta-data",
    "https://json-schema.org/draft/2020-12/vocab/format-annotation",
    "https://json-schema.org/draft/2020-12/vocab/format-assertion",
    "https://json-schema.org/draft/2020-12/vocab/content",
    "https://json-schema.org/draft/2020-12/vocab/unevaluated"
  ]);
  for (const [vocabUri, required] of Object.entries(vocabulary)) {
    if (required && !implementedVocabs.has(vocabUri)) {
      throw new Error(`Required vocabulary not implemented: ${vocabUri}`);
    }
    if (implementedVocabs.has(vocabUri)) {
      enabled.add(vocabUri);
    }
  }
  return { vocabularies: enabled, hasCustomVocabulary: true };
};
/**
 * Collect $id, $anchor, and $dynamicAnchor from a schema tree
 * @param resourceId - The $id of the current schema resource (for tracking dynamic anchors per resource)
 */
collectAnchors_fn = function(schema2, baseUri, resourceId) {
  if (typeof schema2 !== "object" || schema2 === null) return;
  let currentBaseUri = baseUri;
  let currentResourceId = resourceId;
  const hasRefSibling = this.options.legacyRef && schema2.$ref !== void 0;
  const schemaId = schema2.$id ?? schema2.id;
  if (schemaId && !hasRefSibling) {
    if (schemaId.startsWith("#")) {
      const anchorName = schemaId.slice(1);
      const anchorUri = currentBaseUri ? `${currentBaseUri}${schemaId}` : schemaId;
      __privateGet(this, _anchors).set(anchorUri, schema2);
      __privateGet(this, _anchors).set(anchorName, schema2);
      __privateGet(this, _anchors).set(schemaId, schema2);
    } else {
      currentBaseUri = __privateMethod(this, _CompileContext_instances, resolveUri_fn).call(this, schemaId, baseUri);
      __privateGet(this, _schemasById).set(currentBaseUri, schema2);
      currentResourceId = currentBaseUri;
    }
  }
  __privateGet(this, _schemaToBaseUri).set(schema2, currentBaseUri);
  if (schema2.$anchor) {
    const anchorUri = currentBaseUri ? `${currentBaseUri}#${schema2.$anchor}` : `#${schema2.$anchor}`;
    __privateGet(this, _anchors).set(anchorUri, schema2);
    __privateGet(this, _anchors).set(schema2.$anchor, schema2);
  }
  if (schema2.$dynamicAnchor) {
    const anchorUri = currentBaseUri ? `${currentBaseUri}#${schema2.$dynamicAnchor}` : `#${schema2.$dynamicAnchor}`;
    __privateGet(this, _anchors).set(anchorUri, schema2);
    __privateGet(this, _anchors).set(schema2.$dynamicAnchor, schema2);
    const existingList = __privateGet(this, _dynamicAnchors).get(schema2.$dynamicAnchor) ?? [];
    existingList.push(schema2);
    __privateGet(this, _dynamicAnchors).set(schema2.$dynamicAnchor, existingList);
    if (currentResourceId) {
      const resourceAnchors = __privateGet(this, _resourceDynamicAnchors).get(currentResourceId) ?? [];
      resourceAnchors.push({ anchor: schema2.$dynamicAnchor, schema: schema2 });
      __privateGet(this, _resourceDynamicAnchors).set(currentResourceId, resourceAnchors);
    }
  }
  if (schema2.$recursiveAnchor === true && currentResourceId) {
    __privateGet(this, _resourceRecursiveAnchors).set(currentResourceId, schema2);
  }
  const subschemas = [
    ...schema2.$defs ? Object.values(schema2.$defs) : [],
    ...schema2.definitions ? Object.values(schema2.definitions) : [],
    ...schema2.properties ? Object.values(schema2.properties) : [],
    ...schema2.prefixItems ?? [],
    ...schema2.anyOf ?? [],
    ...schema2.oneOf ?? [],
    ...schema2.allOf ?? [],
    ...Array.isArray(schema2.items) ? schema2.items : schema2.items ? [schema2.items] : [],
    schema2.additionalItems,
    schema2.additionalProperties,
    schema2.unevaluatedProperties,
    schema2.unevaluatedItems,
    schema2.not,
    schema2.if,
    schema2.then,
    schema2.else,
    schema2.contains,
    schema2.propertyNames,
    ...schema2.dependentSchemas ? Object.values(schema2.dependentSchemas) : [],
    ...schema2.dependencies ? Object.values(schema2.dependencies).filter((v) => !Array.isArray(v)) : [],
    ...schema2.patternProperties ? Object.values(schema2.patternProperties) : []
  ];
  for (const sub of subschemas) {
    if (typeof sub === "object" && sub !== null) {
      __privateMethod(this, _CompileContext_instances, collectAnchors_fn).call(this, sub, currentBaseUri, currentResourceId);
    }
  }
};
resolveUri_fn = function(ref, baseUri) {
  if (/^[a-z][a-z0-9+.-]*:/i.test(ref)) return ref;
  if (!baseUri) return ref;
  const baseWithoutFragment = baseUri.split("#")[0];
  if (ref.startsWith("/")) {
    const match = baseWithoutFragment.match(/^([a-z][a-z0-9+.-]*:\/\/[^/]*)/i);
    if (match) {
      return match[1] + ref;
    }
    return ref;
  }
  let normalizedRef = ref;
  if (ref.startsWith("./")) {
    normalizedRef = ref.slice(2);
  }
  const lastSlash = baseWithoutFragment.lastIndexOf("/");
  if (lastSlash !== -1) {
    return baseWithoutFragment.slice(0, lastSlash + 1) + normalizedRef;
  }
  return ref;
};
resolveJsonPointer_fn = function(schema2, pointer) {
  if (pointer === "" || pointer === "/") return schema2;
  let current = schema2;
  let start = 1;
  while (start <= pointer.length) {
    if (current === null || typeof current !== "object") return void 0;
    const end = pointer.indexOf("/", start);
    const segment = end === -1 ? pointer.slice(start) : pointer.slice(start, end);
    let decoded;
    if (segment.includes("~") || segment.includes("%")) {
      try {
        decoded = decodeURIComponent(segment).replace(/~1/g, "/").replace(/~0/g, "~");
      } catch {
        decoded = segment.replace(/~1/g, "/").replace(/~0/g, "~");
      }
    } else {
      decoded = segment;
    }
    if (Array.isArray(current)) {
      const index = parseInt(decoded, 10);
      if (isNaN(index) || index < 0 || index >= current.length) return void 0;
      current = current[index];
    } else {
      const obj = current;
      if (!(decoded in obj)) return void 0;
      current = obj[decoded];
    }
    if (end === -1) break;
    start = end + 1;
  }
  return current;
};
/**
 * Recursively check if a schema uses $dynamicRef or $recursiveRef.
 * Also follows $ref chains to detect dynamic features in referenced schemas.
 */
schemaUsesDynamicRefs_fn = function(schema2, visited) {
  if (typeof schema2 !== "object" || schema2 === null || visited.has(schema2)) {
    return false;
  }
  visited.add(schema2);
  if (schema2.$dynamicRef || schema2.$recursiveRef) {
    return true;
  }
  if (schema2.$dynamicAnchor || schema2.$recursiveAnchor === true) {
    return true;
  }
  if (schema2.$ref) {
    const resolved = this.resolveRef(schema2.$ref, schema2);
    if (resolved && !visited.has(resolved)) {
      if (__privateMethod(this, _CompileContext_instances, schemaUsesDynamicRefs_fn).call(this, resolved, visited)) {
        return true;
      }
    }
  }
  const subschemas = [
    ...schema2.$defs ? Object.values(schema2.$defs) : [],
    ...schema2.definitions ? Object.values(schema2.definitions) : [],
    ...schema2.properties ? Object.values(schema2.properties) : [],
    ...schema2.patternProperties ? Object.values(schema2.patternProperties) : [],
    ...schema2.prefixItems ?? [],
    ...schema2.anyOf ?? [],
    ...schema2.oneOf ?? [],
    ...schema2.allOf ?? [],
    ...Array.isArray(schema2.items) ? schema2.items : schema2.items ? [schema2.items] : [],
    schema2.additionalItems,
    schema2.additionalProperties,
    schema2.unevaluatedProperties,
    schema2.unevaluatedItems,
    schema2.not,
    schema2.if,
    schema2.then,
    schema2.else,
    schema2.contains,
    schema2.propertyNames,
    ...schema2.dependentSchemas ? Object.values(schema2.dependentSchemas) : []
  ].filter((s) => s !== void 0 && s !== null);
  return subschemas.some((sub) => __privateMethod(this, _CompileContext_instances, schemaUsesDynamicRefs_fn).call(this, sub, visited));
};
/**
 * Extract the draft version from a $schema URI.
 * Returns a normalized draft identifier for comparison.
 */
getDraftVersion_fn = function(schemaUri) {
  const uri = schemaUri.toLowerCase().replace(/#$/, "");
  if (uri.includes("draft-04") || uri.includes("draft4")) return "draft-04";
  if (uri.includes("draft-06") || uri.includes("draft6")) return "draft-06";
  if (uri.includes("draft-07") || uri.includes("draft7")) return "draft-07";
  if (uri.includes("2019-09")) return "2019-09";
  if (uri.includes("2020-12")) return "2020-12";
  if (uri.includes("2021")) return "2021";
  if (uri.includes("2022")) return "2022";
  if (uri.includes("2023")) return "2023";
  if (uri.includes("2024")) return "2024";
  if (uri.includes("2025")) return "2025";
  return uri;
};

// src/core/runtime/deep-equal.ts
function createDeepEqual() {
  return function deepEqual(a, b) {
    if (a === b) return true;
    const aType = typeof a;
    const bType = typeof b;
    if (aType !== bType) return false;
    if (aType !== "object" || a === null || b === null) return false;
    const aIsArray = Array.isArray(a);
    const bIsArray = Array.isArray(b);
    if (aIsArray !== bIsArray) return false;
    if (aIsArray) {
      const aArr = a;
      const bArr = b;
      const len2 = aArr.length;
      if (len2 !== bArr.length) return false;
      for (let i = 0; i < len2; i++) {
        if (!deepEqual(aArr[i], bArr[i])) return false;
      }
      return true;
    }
    const aObj = a;
    const bObj = b;
    const aKeys = Object.keys(aObj);
    const len = aKeys.length;
    if (len !== Object.keys(bObj).length) return false;
    for (let i = 0; i < len; i++) {
      const key = aKeys[i];
      if (!(key in bObj) || !deepEqual(aObj[key], bObj[key])) return false;
    }
    return true;
  };
}

// src/core/runtime/ucs2-length.ts
function createUcs2Length() {
  return function ucs2length(str) {
    const len = str.length;
    let length = 0;
    let pos = 0;
    let value;
    while (pos < len) {
      length++;
      value = str.charCodeAt(pos++);
      if (value >= 55296 && value <= 56319 && pos < len) {
        value = str.charCodeAt(pos);
        if ((value & 64512) === 56320) pos++;
      }
    }
    return length;
  };
}

// src/core/keywords/format/validators.ts
var FORMAT_REGEX = {
  // Email: RFC 5321/5322 simplified (supports quoted local part)
  emailSimple: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
  emailQuoted: /^"(?:[^"\\]|\\.)*"@/,
  emailIPLiteral: /@\[(?:IPv6:[0-9a-f:.]+|[0-9.]+)\]$/i,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
  // Time: RFC 3339 with leap second support
  timeBasic: /^([0-2]\d):([0-5]\d):([0-5]\d|60)(\.\d+)?(z|[+-]([0-2]\d):([0-5]\d))$/i,
  // Duration: ISO 8601
  durationBasic: /^P(?!$)(\d+Y)?(\d+M)?(\d+W)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+(\.\d+)?S)?)?$/,
  // Hostname: RFC 1123
  hostnameLabel: /^[a-z0-9]([a-z0-9-]{0,61}[a-z0-9])?$/i,
  // IPv4
  ipv4: /^(?:(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.){3}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/,
  // IPv6 (comprehensive)
  ipv6Full: /^(?:[0-9a-f]{1,4}:){7}[0-9a-f]{1,4}$/i,
  ipv6Compressed: /^((?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::((?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?$/i,
  ipv6Mixed: /^((?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:)*(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/i,
  ipv6FullMixed: /^(?:[0-9a-f]{1,4}:){6}(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(?:\.(?:25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}$/i,
  // Date: RFC 3339
  dateBasic: /^(\d{4})-(\d{2})-(\d{2})$/,
  // DateTime: RFC 3339
  dateTimeBasic: /^(\d{4})-(\d{2})-(\d{2})[tT]([0-2]\d):([0-5]\d):([0-5]\d|60)(\.\d+)?(z|[+-]([0-2]\d):([0-5]\d))$/i,
  // URI/IRI patterns
  uriScheme: /^[a-z][a-z0-9+.-]*:/i,
  uriBadChars: /[\s<>"{}|\\^`\x00-\x1f\x7f]/,
  uriFragment: /^#/,
  // JSON Pointer
  jsonPointer: /^(?:\/(?:[^~/]|~0|~1)*)*$/,
  relJsonPointer: /^(?:0|[1-9]\d*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
  // URI Template
  uriTemplate: /^(?:[^\x00-\x20"'<>\\^`{|}]|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})(?::[1-9]\d{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})(?::[1-9]\d{0,3}|\*)?)*\})*$/i
};
var DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
var DATE_REGEX = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
var TIME_REGEX = /^(\d\d):(\d\d):(\d\d)(?:\.\d+)?(z|([+-])(\d\d):(\d\d))$/i;
var FAST_DATE_REGEX = /^\d\d\d\d-[0-1]\d-[0-3]\d$/;
var FAST_TIME_REGEX = /^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i;
var FAST_DATE_TIME_REGEX = /^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i;
function isLeapYear(year) {
  return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
}
function validateDate(s) {
  const m = DATE_REGEX.exec(s);
  if (!m) return false;
  const year = +m[1];
  const month = +m[2];
  const day = +m[3];
  return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
}
function validateTime(s) {
  const m = TIME_REGEX.exec(s);
  if (!m) return false;
  const hr = +m[1];
  const min = +m[2];
  const sec = +m[3];
  const tzSign = m[5] === "-" ? 1 : -1;
  const tzH = +(m[6] || 0);
  const tzM = +(m[7] || 0);
  if (tzH > 23 || tzM > 59) return false;
  if (hr <= 23 && min <= 59 && sec < 60) return true;
  if (sec >= 61 || hr > 23 || min > 59) return false;
  let utcMin = min + tzM * tzSign;
  let utcHr = hr + tzH * tzSign;
  if (utcMin >= 60) {
    utcMin -= 60;
    utcHr += 1;
  } else if (utcMin < 0) {
    utcMin += 60;
    utcHr -= 1;
  }
  if (utcHr >= 24) {
    utcHr -= 24;
  } else if (utcHr < 0) {
    utcHr += 24;
  }
  return utcHr === 23 && utcMin === 59;
}
function validateDateTime(s) {
  const len = s.length;
  if (len < 20) return false;
  if (s.charCodeAt(4) !== 45 || s.charCodeAt(7) !== 45) return false;
  const sep = s.charCodeAt(10);
  if (sep !== 84 && sep !== 116 && sep !== 32) return false;
  const y0 = s.charCodeAt(0) - 48;
  const y1 = s.charCodeAt(1) - 48;
  const y2 = s.charCodeAt(2) - 48;
  const y3 = s.charCodeAt(3) - 48;
  if ((y0 | y1 | y2 | y3) < 0 || y0 > 9 || y1 > 9 || y2 > 9 || y3 > 9) return false;
  const year = y0 * 1e3 + y1 * 100 + y2 * 10 + y3;
  const m0 = s.charCodeAt(5) - 48;
  const m1 = s.charCodeAt(6) - 48;
  if ((m0 | m1) < 0 || m0 > 1 || m1 > 9) return false;
  const month = m0 * 10 + m1;
  if (month < 1 || month > 12) return false;
  const d0 = s.charCodeAt(8) - 48;
  const d1 = s.charCodeAt(9) - 48;
  if ((d0 | d1) < 0 || d0 > 3 || d1 > 9) return false;
  const day = d0 * 10 + d1;
  const maxDay = month === 2 ? year % 4 === 0 && year % 100 !== 0 || year % 400 === 0 ? 29 : 28 : DAYS[month];
  if (day < 1 || day > maxDay) return false;
  if (s.charCodeAt(13) !== 58 || s.charCodeAt(16) !== 58) return false;
  const h0 = s.charCodeAt(11) - 48;
  const h1 = s.charCodeAt(12) - 48;
  if ((h0 | h1) < 0 || h0 > 2 || h1 > 9) return false;
  const hr = h0 * 10 + h1;
  if (hr > 23) return false;
  const mi0 = s.charCodeAt(14) - 48;
  const mi1 = s.charCodeAt(15) - 48;
  if ((mi0 | mi1) < 0 || mi0 > 5 || mi1 > 9) return false;
  const min = mi0 * 10 + mi1;
  const s0 = s.charCodeAt(17) - 48;
  const s1 = s.charCodeAt(18) - 48;
  if ((s0 | s1) < 0 || s0 > 6 || s1 > 9) return false;
  const sec = s0 * 10 + s1;
  let i = 19;
  if (i < len && s.charCodeAt(i) === 46) {
    i++;
    if (i >= len) return false;
    const firstFrac = s.charCodeAt(i) - 48;
    if (firstFrac < 0 || firstFrac > 9) return false;
    i++;
    while (i < len) {
      const c = s.charCodeAt(i) - 48;
      if (c < 0 || c > 9) break;
      i++;
    }
  }
  if (i >= len) return false;
  const tzChar = s.charCodeAt(i);
  let tzSign = 0;
  let tzH = 0;
  let tzM = 0;
  if (tzChar === 90 || tzChar === 122) {
    i++;
  } else if (tzChar === 43 || tzChar === 45) {
    tzSign = tzChar === 45 ? -1 : 1;
    i++;
    if (i + 2 > len) return false;
    const th0 = s.charCodeAt(i) - 48;
    const th1 = s.charCodeAt(i + 1) - 48;
    if ((th0 | th1) < 0 || th0 > 2 || th1 > 9) return false;
    tzH = th0 * 10 + th1;
    if (tzH > 23) return false;
    i += 2;
    if (i < len && s.charCodeAt(i) === 58) i++;
    if (i + 2 > len) return false;
    const tm0 = s.charCodeAt(i) - 48;
    const tm1 = s.charCodeAt(i + 1) - 48;
    if ((tm0 | tm1) < 0 || tm0 > 5 || tm1 > 9) return false;
    tzM = tm0 * 10 + tm1;
    i += 2;
  } else {
    return false;
  }
  if (i !== len) return false;
  if (sec < 60) return true;
  if (sec > 60) return false;
  const utcMin = min - tzM * tzSign;
  const utcHr = hr - tzH * tzSign - (utcMin < 0 ? 1 : 0);
  return (utcHr === 23 || utcHr === -1) && (utcMin === 59 || utcMin === -1);
}
function validateDuration(s) {
  const len = s.length;
  if (len === 0 || s.charCodeAt(0) !== 80) return false;
  let i = 1;
  let hasComponent = false;
  let hasWeek = false;
  let hasOther = false;
  let inTime = false;
  let lastDateOrder = -1;
  let lastTimeOrder = -1;
  while (i < len) {
    const c = s.charCodeAt(i);
    if (c === 84) {
      if (inTime) return false;
      inTime = true;
      i++;
      if (i >= len) return false;
      const next = s.charCodeAt(i);
      if (next < 48 || next > 57) return false;
      continue;
    }
    if (c < 48 || c > 57) return false;
    i++;
    while (i < len) {
      const d = s.charCodeAt(i);
      if (d >= 48 && d <= 57) {
        i++;
      } else if (d === 46) {
        i++;
        if (i >= len) return false;
        const afterDot = s.charCodeAt(i);
        if (afterDot < 48 || afterDot > 57) return false;
        while (i < len && s.charCodeAt(i) >= 48 && s.charCodeAt(i) <= 57) i++;
        break;
      } else {
        break;
      }
    }
    if (i >= len) return false;
    const designator = s.charCodeAt(i);
    if (inTime) {
      let order;
      if (designator === 72) {
        order = 0;
      } else if (designator === 77) {
        order = 1;
      } else if (designator === 83) {
        order = 2;
      } else {
        return false;
      }
      if (order <= lastTimeOrder) return false;
      lastTimeOrder = order;
      hasComponent = true;
      hasOther = true;
      i++;
    } else {
      let order;
      if (designator === 89) {
        order = 0;
      } else if (designator === 77) {
        order = 1;
      } else if (designator === 87) {
        order = 2;
        hasWeek = true;
      } else if (designator === 68) {
        order = 3;
      } else {
        return false;
      }
      if (order <= lastDateOrder) return false;
      lastDateOrder = order;
      hasComponent = true;
      if (designator !== 87) hasOther = true;
      i++;
    }
  }
  if (!hasComponent) return false;
  if (hasWeek && hasOther) return false;
  return true;
}
function decodePunycode(input) {
  const len = input.length;
  const base = 36;
  const tMin = 1;
  const tMax = 26;
  const skew = 38;
  const damp = 700;
  const initialBias = 72;
  const initialN = 128;
  const output = new Array(len);
  let outputLen = 0;
  let i = 0;
  let n = initialN;
  let bias = initialBias;
  let basic = input.lastIndexOf("-");
  if (basic < 0) basic = 0;
  for (let j = 0; j < basic; ++j) {
    const cp = input.charCodeAt(j);
    if (cp >= 128) return null;
    output[outputLen++] = cp;
  }
  for (let idx = basic > 0 ? basic + 1 : 0; idx < len; ) {
    const oldi = i;
    let w = 1;
    for (let k2 = base; ; k2 += base) {
      if (idx >= len) return null;
      const cp = input.charCodeAt(idx++);
      let digit;
      if (cp >= 97 && cp <= 122)
        digit = cp - 97;
      else if (cp >= 65 && cp <= 90)
        digit = cp - 65;
      else if (cp >= 48 && cp <= 57)
        digit = cp - 22;
      else return null;
      i += digit * w;
      const t = k2 <= bias ? tMin : k2 >= bias + tMax ? tMax : k2 - bias;
      if (digit < t) break;
      w *= base - t;
    }
    const numPoints = outputLen + 1;
    let delta = i - oldi;
    delta = oldi === 0 ? Math.floor(delta / damp) : Math.floor(delta / 2);
    delta += Math.floor(delta / numPoints);
    let k = 0;
    while (delta > 455) {
      delta = Math.floor(delta / 35);
      k += base;
    }
    bias = k + Math.floor(36 * delta / (delta + skew));
    n += Math.floor(i / numPoints);
    i %= numPoints;
    for (let j = outputLen; j > i; j--) {
      output[j] = output[j - 1];
    }
    output[i++] = n;
    outputLen++;
  }
  let result = "";
  for (let j = 0; j < outputLen; j++) {
    result += String.fromCodePoint(output[j]);
  }
  return result;
}
function isVirama(cp) {
  if (cp === 2381) return true;
  if (cp === 2509) return true;
  if (cp === 2637) return true;
  if (cp === 2765) return true;
  if (cp === 2893) return true;
  if (cp === 3021) return true;
  if (cp === 3149) return true;
  if (cp === 3277) return true;
  if (cp === 3405) return true;
  if (cp === 3530) return true;
  if (cp === 4153) return true;
  return false;
}
function validateIdnaLabel(label) {
  const len = label.length;
  if (len === 0) return false;
  if (len >= 4 && label.charCodeAt(2) === 45 && label.charCodeAt(3) === 45) {
    return false;
  }
  const codePoints = [];
  for (let i = 0; i < len; ) {
    const cp = label.codePointAt(i);
    codePoints.push(cp);
    i += cp > 65535 ? 2 : 1;
  }
  const firstCp = codePoints[0];
  if (firstCp >= 768 && firstCp <= 879 || firstCp >= 1155 && firstCp <= 1161 || firstCp >= 1425 && firstCp <= 1469 || firstCp === 1471 || firstCp === 1473 || firstCp === 1474 || firstCp === 1476 || firstCp === 1477 || firstCp === 1479 || firstCp >= 1552 && firstCp <= 1562 || firstCp >= 1611 && firstCp <= 1631 || firstCp === 1648 || firstCp >= 1750 && firstCp <= 1756 || firstCp >= 1759 && firstCp <= 1764 || firstCp >= 1767 && firstCp <= 1768 || firstCp >= 1770 && firstCp <= 1773 || firstCp >= 2304 && firstCp <= 2307 || firstCp >= 2362 && firstCp <= 2383 || firstCp >= 2385 && firstCp <= 2391 || firstCp >= 2402 && firstCp <= 2403 || firstCp >= 6832 && firstCp <= 6911 || firstCp >= 7616 && firstCp <= 7679 || firstCp >= 8400 && firstCp <= 8447 || firstCp >= 12330 && firstCp <= 12335 || firstCp >= 65056 && firstCp <= 65071) {
    return false;
  }
  let hasArabicIndic = false;
  let hasExtendedArabicIndic = false;
  const cpLen = codePoints.length;
  for (let i = 0; i < cpLen; i++) {
    const cp = codePoints[i];
    if (cp === 1600 || cp === 2042 || cp === 12334 || cp === 12335 || cp >= 12337 && cp <= 12341 || cp === 12347) {
      return false;
    }
    if (cp >= 1632 && cp <= 1641) hasArabicIndic = true;
    else if (cp >= 1776 && cp <= 1785) hasExtendedArabicIndic = true;
    else if (cp === 183) {
      const before = i > 0 ? codePoints[i - 1] : 0;
      const after = i < cpLen - 1 ? codePoints[i + 1] : 0;
      if (before !== 108 || after !== 108) return false;
    } else if (cp === 885) {
      const after = i < cpLen - 1 ? codePoints[i + 1] : 0;
      if (!(after >= 880 && after <= 1023 || after >= 7936 && after <= 8191)) {
        return false;
      }
    } else if (cp === 1523) {
      const before = i > 0 ? codePoints[i - 1] : 0;
      if (!(before >= 1424 && before <= 1535)) return false;
    } else if (cp === 1524) {
      const before = i > 0 ? codePoints[i - 1] : 0;
      if (!(before >= 1424 && before <= 1535)) return false;
    } else if (cp === 12539) {
      let hasJapanese = false;
      for (let j = 0; j < cpLen; j++) {
        const other = codePoints[j];
        if (other === 12539) continue;
        if (other >= 12352 && other <= 12447 || other >= 12448 && other <= 12543 || other >= 12784 && other <= 12799 || other >= 19968 && other <= 40959 || other >= 13312 && other <= 19903) {
          hasJapanese = true;
          break;
        }
      }
      if (!hasJapanese) return false;
    } else if (cp === 8205) {
      const before = i > 0 ? codePoints[i - 1] : 0;
      if (!isVirama(before)) return false;
    }
  }
  if (hasArabicIndic && hasExtendedArabicIndic) return false;
  return true;
}
var HOSTNAME_CHARS = new Uint8Array(256);
var HOSTNAME_ALNUM = new Uint8Array(256);
(() => {
  for (let i = 48; i <= 57; i++) {
    HOSTNAME_CHARS[i] = 1;
    HOSTNAME_ALNUM[i] = 1;
  }
  for (let i = 65; i <= 90; i++) {
    HOSTNAME_CHARS[i] = 1;
    HOSTNAME_ALNUM[i] = 1;
  }
  for (let i = 97; i <= 122; i++) {
    HOSTNAME_CHARS[i] = 1;
    HOSTNAME_ALNUM[i] = 1;
  }
  HOSTNAME_CHARS[45] = 1;
  HOSTNAME_CHARS[46] = 1;
})();
function validateHostname(s) {
  const len = s.length;
  if (len === 0 || len > 253) return false;
  let labelStart = 0;
  let needsSlowPath = false;
  for (let i = 0; i <= len; i++) {
    const code = i < len ? s.charCodeAt(i) : 46;
    if (code === 46 || i === len) {
      const labelLen = i - labelStart;
      if (labelLen === 0 || labelLen > 63) return false;
      const firstCode = s.charCodeAt(labelStart);
      const lastCode = s.charCodeAt(i - 1);
      if (!HOSTNAME_ALNUM[firstCode]) return false;
      if (labelLen > 1 && !HOSTNAME_ALNUM[lastCode]) return false;
      if (labelLen >= 4) {
        const c2 = s.charCodeAt(labelStart + 2);
        const c3 = s.charCodeAt(labelStart + 3);
        if (c2 === 45 && c3 === 45) {
          const c0 = s.charCodeAt(labelStart) | 32;
          const c1 = s.charCodeAt(labelStart + 1) | 32;
          if (c0 !== 120 || c1 !== 110) return false;
          needsSlowPath = true;
        }
      }
      labelStart = i + 1;
    } else if (!HOSTNAME_CHARS[code]) {
      return false;
    }
  }
  if (needsSlowPath) {
    labelStart = 0;
    for (let i = 0; i <= len; i++) {
      const code = i < len ? s.charCodeAt(i) : 46;
      if (code === 46 || i === len) {
        const labelLen = i - labelStart;
        if (labelLen >= 4) {
          const c0 = s.charCodeAt(labelStart) | 32;
          const c1 = s.charCodeAt(labelStart + 1) | 32;
          const c2 = s.charCodeAt(labelStart + 2);
          const c3 = s.charCodeAt(labelStart + 3);
          if (c0 === 120 && c1 === 110 && c2 === 45 && c3 === 45) {
            const punycode = s.substring(labelStart + 4, i).toLowerCase();
            if (punycode.length === 0) return false;
            const decoded = decodePunycode(punycode);
            if (decoded === null) return false;
            if (!validateIdnaLabel(decoded)) return false;
          }
        }
        labelStart = i + 1;
      }
    }
  }
  return true;
}
function validateIdnHostname(s) {
  const len = s.length;
  if (len === 0 || len > 253) return false;
  for (let i = 0; i < len; i++) {
    if (s.charCodeAt(i) > 127) {
      return validateIdnHostnameSlow(s, len);
    }
  }
  let labelStart = 0;
  let hasPunycode = false;
  for (let i = 0; i <= len; i++) {
    const code = i < len ? s.charCodeAt(i) : 46;
    if (code === 46 || i === len) {
      const labelLen = i - labelStart;
      if (labelLen === 0 || labelLen > 63) return false;
      const firstCode = s.charCodeAt(labelStart);
      const lastCode = s.charCodeAt(i - 1);
      if (!(firstCode >= 48 && firstCode <= 57 || firstCode >= 65 && firstCode <= 90 || firstCode >= 97 && firstCode <= 122)) {
        return false;
      }
      if (labelLen > 1 && !(lastCode >= 48 && lastCode <= 57 || lastCode >= 65 && lastCode <= 90 || lastCode >= 97 && lastCode <= 122)) {
        return false;
      }
      if (labelLen >= 4) {
        const c2 = s.charCodeAt(labelStart + 2);
        const c3 = s.charCodeAt(labelStart + 3);
        if (c2 === 45 && c3 === 45) {
          const c0 = s.charCodeAt(labelStart) | 32;
          const c1 = s.charCodeAt(labelStart + 1) | 32;
          if (c0 === 120 && c1 === 110) {
            hasPunycode = true;
          } else {
            return false;
          }
        }
      }
      labelStart = i + 1;
    } else if (!(code >= 48 && code <= 57 || code >= 65 && code <= 90 || code >= 97 && code <= 122 || code === 45)) {
      return false;
    }
  }
  if (hasPunycode) {
    return validateIdnHostnameSlow(s, len);
  }
  return true;
}
function validateIdnHostnameSlow(s, len) {
  const lastChar = s.charCodeAt(len - 1);
  if (lastChar === 12290 || lastChar === 65294 || lastChar === 65377) return false;
  let labelStart = 0;
  for (let i = 0; i <= len; i++) {
    const code = i < len ? s.charCodeAt(i) : 46;
    const isSep = code === 46 || code === 12290 || code === 65294 || code === 65377;
    if (isSep || i === len) {
      const labelLen = i - labelStart;
      if (labelLen === 0 || labelLen > 63) return false;
      const label = s.substring(labelStart, i);
      if (labelLen >= 4) {
        const c0 = label.charCodeAt(0) | 32;
        const c1 = label.charCodeAt(1) | 32;
        const c2 = label.charCodeAt(2);
        const c3 = label.charCodeAt(3);
        if (c0 === 120 && c1 === 110 && c2 === 45 && c3 === 45) {
          const punycode = label.slice(4);
          if (!punycode) return false;
          const decoded = decodePunycode(punycode.toLowerCase());
          if (!decoded || !validateIdnaLabel(decoded)) return false;
        } else {
          if (c2 === 45 && c3 === 45) return false;
          if (label.charCodeAt(0) === 45 || label.charCodeAt(labelLen - 1) === 45) {
            return false;
          }
          if (!validateIdnaLabel(label)) return false;
        }
      } else {
        if (label.charCodeAt(0) === 45 || label.charCodeAt(labelLen - 1) === 45) {
          return false;
        }
        if (!validateIdnaLabel(label)) return false;
      }
      labelStart = i + 1;
    }
  }
  return true;
}
function validateEmailIpLiteral(domain) {
  const inner = domain.slice(1, -1);
  if (inner.toLowerCase().startsWith("ipv6:")) {
    return validateIPv6(inner.slice(5));
  }
  return FORMAT_REGEX.ipv4.test(inner);
}
function validateEmail(s) {
  const len = s.length;
  if (len === 0) return false;
  const firstChar = s.charCodeAt(0);
  if (firstChar === 34) {
    if (!FORMAT_REGEX.emailQuoted.test(s)) return false;
    const atIndex2 = s.lastIndexOf("@");
    if (atIndex2 < 0) return false;
    const domain = s.slice(atIndex2 + 1);
    if (domain.charCodeAt(0) === 91 && domain.charCodeAt(domain.length - 1) === 93) {
      return validateEmailIpLiteral(domain);
    }
    return validateHostname(domain);
  }
  if (firstChar === 46) return false;
  let atIndex = -1;
  let prevWasDot = false;
  for (let i = 0; i < len; i++) {
    const c = s.charCodeAt(i);
    if (c === 64) {
      if (atIndex >= 0) return false;
      if (prevWasDot) return false;
      if (i === 0) return false;
      if (i > 64) return false;
      atIndex = i;
      prevWasDot = false;
      continue;
    }
    if (atIndex < 0) {
      if (c === 46) {
        if (prevWasDot) return false;
        prevWasDot = true;
      } else {
        prevWasDot = false;
        if (!EMAIL_LOCAL_ASCII[c]) return false;
      }
    }
  }
  if (atIndex < 1 || atIndex >= len - 1) return false;
  const domainStart = atIndex + 1;
  const domainLen = len - domainStart;
  if (domainLen > 253) return false;
  if (s.charCodeAt(domainStart) === 91 && s.charCodeAt(len - 1) === 93) {
    return validateEmailIpLiteral(s.slice(domainStart));
  }
  let labelStart = domainStart;
  let labelLen = 0;
  for (let i = domainStart; i <= len; i++) {
    const c = i < len ? s.charCodeAt(i) : 46;
    if (c === 46 || i === len) {
      if (labelLen === 0 || labelLen > 63) return false;
      const firstLabelChar = s.charCodeAt(labelStart);
      const lastLabelChar = s.charCodeAt(i - 1);
      if (!(firstLabelChar >= 48 && firstLabelChar <= 57 || // 0-9
      firstLabelChar >= 65 && firstLabelChar <= 90 || // A-Z
      firstLabelChar >= 97 && firstLabelChar <= 122))
        return false;
      if (labelLen > 1 && !(lastLabelChar >= 48 && lastLabelChar <= 57 || lastLabelChar >= 65 && lastLabelChar <= 90 || lastLabelChar >= 97 && lastLabelChar <= 122))
        return false;
      if (labelLen >= 4 && s.charCodeAt(labelStart + 2) === 45 && s.charCodeAt(labelStart + 3) === 45) {
        const c0 = s.charCodeAt(labelStart) | 32;
        const c1 = s.charCodeAt(labelStart + 1) | 32;
        if (c0 !== 120 || c1 !== 110) return false;
      }
      labelStart = i + 1;
      labelLen = 0;
    } else {
      if (!(c >= 48 && c <= 57 || // 0-9
      c >= 65 && c <= 90 || // A-Z
      c >= 97 && c <= 122 || // a-z
      c === 45))
        return false;
      labelLen++;
    }
  }
  return true;
}
var EMAIL_LOCAL_ASCII = new Uint8Array(256);
(() => {
  for (let i = 48; i <= 57; i++) EMAIL_LOCAL_ASCII[i] = 1;
  for (let i = 65; i <= 90; i++) EMAIL_LOCAL_ASCII[i] = 1;
  for (let i = 97; i <= 122; i++) EMAIL_LOCAL_ASCII[i] = 1;
  EMAIL_LOCAL_ASCII[33] = 1;
  EMAIL_LOCAL_ASCII[35] = 1;
  EMAIL_LOCAL_ASCII[36] = 1;
  EMAIL_LOCAL_ASCII[37] = 1;
  EMAIL_LOCAL_ASCII[38] = 1;
  EMAIL_LOCAL_ASCII[39] = 1;
  EMAIL_LOCAL_ASCII[42] = 1;
  EMAIL_LOCAL_ASCII[43] = 1;
  EMAIL_LOCAL_ASCII[45] = 1;
  EMAIL_LOCAL_ASCII[47] = 1;
  EMAIL_LOCAL_ASCII[61] = 1;
  EMAIL_LOCAL_ASCII[63] = 1;
  EMAIL_LOCAL_ASCII[94] = 1;
  EMAIL_LOCAL_ASCII[95] = 1;
  EMAIL_LOCAL_ASCII[96] = 1;
  EMAIL_LOCAL_ASCII[123] = 1;
  EMAIL_LOCAL_ASCII[124] = 1;
  EMAIL_LOCAL_ASCII[125] = 1;
  EMAIL_LOCAL_ASCII[126] = 1;
})();
function validateIdnEmail(s) {
  const len = s.length;
  if (len === 0) return false;
  let atIndex = -1;
  let hasNonAscii = false;
  for (let i = 0; i < len; i++) {
    const c = s.charCodeAt(i);
    if (c === 64) {
      if (atIndex >= 0) return false;
      atIndex = i;
    } else if (c > 127) {
      hasNonAscii = true;
    }
  }
  if (atIndex <= 0 || atIndex >= len - 1) return false;
  if (!hasNonAscii) {
    if (atIndex > 64) return false;
    const firstChar2 = s.charCodeAt(0);
    const lastLocalChar2 = s.charCodeAt(atIndex - 1);
    if (firstChar2 === 46 || lastLocalChar2 === 46) return false;
    let prevWasDot2 = false;
    for (let i = 0; i < atIndex; i++) {
      const c = s.charCodeAt(i);
      if (c === 46) {
        if (prevWasDot2) return false;
        prevWasDot2 = true;
      } else {
        prevWasDot2 = false;
        if (!EMAIL_LOCAL_ASCII[c]) return false;
      }
    }
    const domainStart2 = atIndex + 1;
    const domain2 = s.slice(domainStart2);
    if (s.charCodeAt(domainStart2) === 91) {
      return validateEmailIpLiteral(domain2);
    }
    return validateHostname(domain2);
  }
  const domainStart = atIndex + 1;
  if (s.charCodeAt(domainStart) === 91 && s.charCodeAt(len - 1) === 93) {
    return false;
  }
  const domain = s.slice(domainStart);
  if (!validateIdnHostname(domain)) return false;
  if (atIndex > 64) return false;
  const firstChar = s.charCodeAt(0);
  const lastLocalChar = s.charCodeAt(atIndex - 1);
  if (firstChar === 46 || lastLocalChar === 46) return false;
  let prevWasDot = false;
  for (let i = 0; i < atIndex; i++) {
    const c = s.charCodeAt(i);
    if (c === 46) {
      if (prevWasDot) return false;
      prevWasDot = true;
      continue;
    }
    prevWasDot = false;
    if (c < 128) {
      if (!EMAIL_LOCAL_ASCII[c]) return false;
      continue;
    }
    if (c < 160 || c >= 55296 && c <= 57343 || c === 65534 || c === 65535) {
      return false;
    }
  }
  return true;
}
function validateIPv6(s) {
  const len = s.length;
  if (len < 2 || len > 45) return false;
  for (let j = 0; j < len; j++) {
    if (s.charCodeAt(j) === 37) return false;
  }
  let i = 0;
  let groupCount = 0;
  let doubleColonSeen = false;
  if (s.charCodeAt(0) === 58) {
    if (len < 2 || s.charCodeAt(1) !== 58) return false;
    doubleColonSeen = true;
    i = 2;
    if (i === len) return true;
  }
  while (i < len) {
    const c = s.charCodeAt(i);
    if (c >= 48 && c <= 57 || // 0-9
    c >= 97 && c <= 102 || // a-f
    c >= 65 && c <= 70) {
      let hexDigits = 1;
      const potentialIPv4Start = i;
      let allDecimal = c >= 48 && c <= 57;
      i++;
      while (i < len && hexDigits < 5) {
        const d = s.charCodeAt(i);
        if (d >= 48 && d <= 57 || d >= 97 && d <= 102 || d >= 65 && d <= 70) {
          if (!(d >= 48 && d <= 57)) allDecimal = false;
          hexDigits++;
          i++;
        } else {
          break;
        }
      }
      if (hexDigits > 4) return false;
      if (i < len) {
        const next = s.charCodeAt(i);
        if (next === 46 && allDecimal && hexDigits <= 3) {
          i = potentialIPv4Start;
          for (let octet = 0; octet < 4; octet++) {
            if (octet > 0) {
              if (i >= len || s.charCodeAt(i) !== 46) return false;
              i++;
            }
            if (i >= len) return false;
            const firstDigit = s.charCodeAt(i) - 48;
            if (firstDigit < 0 || firstDigit > 9) return false;
            let value = firstDigit;
            i++;
            if (i < len) {
              const d2 = s.charCodeAt(i) - 48;
              if (d2 >= 0 && d2 <= 9) {
                if (firstDigit === 0) return false;
                value = value * 10 + d2;
                i++;
                if (i < len) {
                  const d3 = s.charCodeAt(i) - 48;
                  if (d3 >= 0 && d3 <= 9) {
                    value = value * 10 + d3;
                    i++;
                  }
                }
              }
            }
            if (value > 255) return false;
          }
          if (i !== len) return false;
          groupCount += 2;
          break;
        } else if (next === 58) {
          groupCount++;
          i++;
          if (i < len && s.charCodeAt(i) === 58) {
            if (doubleColonSeen) return false;
            doubleColonSeen = true;
            i++;
            if (i === len) break;
          }
          continue;
        } else {
          return false;
        }
      } else {
        groupCount++;
      }
    } else {
      return false;
    }
  }
  if (doubleColonSeen) {
    return groupCount <= 7;
  } else {
    return groupCount === 8;
  }
}
var URI_SCHEME_CHARS = new Uint8Array(256);
var URI_UNRESERVED = new Uint8Array(256);
var URI_SUB_DELIMS = new Uint8Array(256);
var URI_PCHAR = new Uint8Array(256);
var URI_QUERY_FRAGMENT = new Uint8Array(256);
(() => {
  for (let i = 48; i <= 57; i++) URI_SCHEME_CHARS[i] = 1;
  for (let i = 65; i <= 90; i++) URI_SCHEME_CHARS[i] = 1;
  for (let i = 97; i <= 122; i++) URI_SCHEME_CHARS[i] = 1;
  URI_SCHEME_CHARS[43] = 1;
  URI_SCHEME_CHARS[45] = 1;
  URI_SCHEME_CHARS[46] = 1;
  for (let i = 48; i <= 57; i++) URI_UNRESERVED[i] = 1;
  for (let i = 65; i <= 90; i++) URI_UNRESERVED[i] = 1;
  for (let i = 97; i <= 122; i++) URI_UNRESERVED[i] = 1;
  URI_UNRESERVED[45] = 1;
  URI_UNRESERVED[46] = 1;
  URI_UNRESERVED[95] = 1;
  URI_UNRESERVED[126] = 1;
  URI_SUB_DELIMS[33] = 1;
  URI_SUB_DELIMS[36] = 1;
  URI_SUB_DELIMS[38] = 1;
  URI_SUB_DELIMS[39] = 1;
  URI_SUB_DELIMS[40] = 1;
  URI_SUB_DELIMS[41] = 1;
  URI_SUB_DELIMS[42] = 1;
  URI_SUB_DELIMS[43] = 1;
  URI_SUB_DELIMS[44] = 1;
  URI_SUB_DELIMS[59] = 1;
  URI_SUB_DELIMS[61] = 1;
  for (let i = 0; i < 256; i++) {
    if (URI_UNRESERVED[i] || URI_SUB_DELIMS[i]) URI_PCHAR[i] = 1;
  }
  URI_PCHAR[58] = 1;
  URI_PCHAR[64] = 1;
  URI_PCHAR[37] = 1;
  for (let i = 0; i < 256; i++) {
    if (URI_PCHAR[i]) URI_QUERY_FRAGMENT[i] = 1;
  }
  URI_QUERY_FRAGMENT[47] = 1;
  URI_QUERY_FRAGMENT[63] = 1;
})();
function isHexDigit(c) {
  return c >= 48 && c <= 57 || c >= 65 && c <= 70 || c >= 97 && c <= 102;
}
function isValidPctEncoded(s, i) {
  return i + 2 < s.length && s.charCodeAt(i) === 37 && isHexDigit(s.charCodeAt(i + 1)) && isHexDigit(s.charCodeAt(i + 2));
}
function parseScheme(s) {
  const len = s.length;
  if (len === 0) return -1;
  const first = s.charCodeAt(0);
  if (!(first >= 65 && first <= 90 || first >= 97 && first <= 122)) return -1;
  for (let i = 1; i < len; i++) {
    const c = s.charCodeAt(i);
    if (c === 58) return i;
    if (!URI_SCHEME_CHARS[c]) return -1;
  }
  return -1;
}
function validateAuthority(s, start, end) {
  if (start >= end) return true;
  let i = start;
  let atPos = -1;
  for (let j = i; j < end; j++) {
    if (s.charCodeAt(j) === 64) {
      atPos = j;
      break;
    }
  }
  if (atPos >= 0) {
    for (let j = i; j < atPos; j++) {
      const c = s.charCodeAt(j);
      if (c === 37) {
        if (!isValidPctEncoded(s, j)) return false;
        j += 2;
      } else if (!URI_UNRESERVED[c] && !URI_SUB_DELIMS[c] && c !== 58) {
        return false;
      }
    }
    i = atPos + 1;
  }
  let colonPos = -1;
  let inBrackets = false;
  if (i < end && s.charCodeAt(i) === 91) {
    const closeBracket = s.indexOf("]", i);
    if (closeBracket < 0 || closeBracket >= end) return false;
    const ipLiteral = s.substring(i + 1, closeBracket);
    if (ipLiteral.length === 0) return false;
    if (ipLiteral.charCodeAt(0) === 118 || ipLiteral.charCodeAt(0) === 86) {
      if (ipLiteral.indexOf(".") < 2) return false;
    }
    i = closeBracket + 1;
    inBrackets = true;
  }
  if (!inBrackets) {
    for (let j = i; j < end; j++) {
      if (s.charCodeAt(j) === 58) {
        colonPos = j;
        break;
      }
    }
  } else {
    if (i < end && s.charCodeAt(i) === 58) {
      colonPos = i;
    }
  }
  const hostEnd = colonPos >= 0 ? colonPos : end;
  if (!inBrackets) {
    for (let j = i; j < hostEnd; j++) {
      const c = s.charCodeAt(j);
      if (c === 37) {
        if (!isValidPctEncoded(s, j)) return false;
        j += 2;
      } else if (!URI_UNRESERVED[c] && !URI_SUB_DELIMS[c]) {
        return false;
      }
    }
  }
  if (colonPos >= 0) {
    for (let j = colonPos + 1; j < end; j++) {
      const c = s.charCodeAt(j);
      if (c < 48 || c > 57) return false;
    }
  }
  return true;
}
function validatePathChars(s, start, end, allowedChars) {
  for (let i = start; i < end; i++) {
    const c = s.charCodeAt(i);
    if (c === 37) {
      if (!isValidPctEncoded(s, i)) return false;
      i += 2;
    } else if (!allowedChars[c]) {
      return false;
    }
  }
  return true;
}
function validateUri(s) {
  const len = s.length;
  if (len === 0) return false;
  const schemeEnd = parseScheme(s);
  if (schemeEnd < 0) return false;
  let i = schemeEnd + 1;
  if (i + 1 < len && s.charCodeAt(i) === 47 && s.charCodeAt(i + 1) === 47) {
    i += 2;
    let authEnd = len;
    for (let j = i; j < len; j++) {
      const c = s.charCodeAt(j);
      if (c === 47 || c === 63 || c === 35) {
        authEnd = j;
        break;
      }
    }
    if (!validateAuthority(s, i, authEnd)) return false;
    i = authEnd;
  }
  let pathEnd = len;
  for (let j = i; j < len; j++) {
    const c = s.charCodeAt(j);
    if (c === 63 || c === 35) {
      pathEnd = j;
      break;
    }
  }
  if (i < pathEnd) {
    if (!validatePathChars(s, i, pathEnd, URI_PCHAR)) {
      for (let j = i; j < pathEnd; j++) {
        const c = s.charCodeAt(j);
        if (c === 37) {
          if (!isValidPctEncoded(s, j)) return false;
          j += 2;
        } else if (!URI_PCHAR[c] && c !== 47) {
          return false;
        }
      }
    }
  }
  i = pathEnd;
  if (i < len && s.charCodeAt(i) === 63) {
    i++;
    let queryEnd = len;
    for (let j = i; j < len; j++) {
      if (s.charCodeAt(j) === 35) {
        queryEnd = j;
        break;
      }
    }
    if (!validatePathChars(s, i, queryEnd, URI_QUERY_FRAGMENT)) return false;
    i = queryEnd;
  }
  if (i < len && s.charCodeAt(i) === 35) {
    i++;
    if (!validatePathChars(s, i, len, URI_QUERY_FRAGMENT)) return false;
  }
  return true;
}
var URI_REFERENCE_REGEX = /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
function validateUriReference(s) {
  if (s === "") return true;
  return URI_REFERENCE_REGEX.test(s);
}
function validateIri(s) {
  const len = s.length;
  if (len === 0) return false;
  const first = s.charCodeAt(0);
  if (!(first >= 65 && first <= 90 || first >= 97 && first <= 122)) return false;
  let schemeEnd = -1;
  for (let i = 1; i < len && i < 64; i++) {
    const c = s.charCodeAt(i);
    if (c === 58) {
      schemeEnd = i;
      break;
    }
    if (!(c >= 48 && c <= 57 || // 0-9
    c >= 65 && c <= 90 || // A-Z
    c >= 97 && c <= 122 || // a-z
    c === 43 || c === 45 || c === 46)) {
      return false;
    }
  }
  if (schemeEnd < 1) return false;
  if (schemeEnd + 3 < len && s.charCodeAt(schemeEnd + 1) === 47 && s.charCodeAt(schemeEnd + 2) === 47) {
    let i = schemeEnd + 3;
    let seenHex = false;
    let colonCount = 0;
    const limit = Math.min(len, schemeEnd + 18);
    for (; i < limit; i++) {
      const c = s.charCodeAt(i);
      if (c === 58) {
        if (seenHex) {
          colonCount++;
          if (colonCount >= 2) return false;
          seenHex = false;
        } else {
          break;
        }
      } else if (c >= 48 && c <= 57 || c >= 97 && c <= 102 || c >= 65 && c <= 70) {
        seenHex = true;
      } else {
        break;
      }
    }
  }
  for (let i = schemeEnd + 1; i < len; i++) {
    const c = s.charCodeAt(i);
    if (c <= 31 || c === 127) return false;
    if (c === 32 || // space
    c === 34 || // "
    c === 60 || // <
    c === 62 || // >
    c === 92 || // \
    c === 94 || // ^
    c === 96 || // `
    c === 123 || // {
    c === 124 || // |
    c === 125) {
      return false;
    }
  }
  return true;
}
function validateIriReference(s) {
  const len = s.length;
  if (len === 0) return true;
  for (let i = 0; i < len; i++) {
    const c = s.charCodeAt(i);
    if (c === 37) {
      if (i + 2 >= len) return false;
      const h1 = s.charCodeAt(i + 1);
      const h2 = s.charCodeAt(i + 2);
      if (!(h1 >= 48 && h1 <= 57 || // 0-9
      h1 >= 65 && h1 <= 70 || // A-F
      h1 >= 97 && h1 <= 102) || // a-f
      !(h2 >= 48 && h2 <= 57 || h2 >= 65 && h2 <= 70 || h2 >= 97 && h2 <= 102)) {
        return false;
      }
      i += 2;
      continue;
    }
    if (c <= 32 || c === 127) return false;
    if (c === 34 || // "
    c === 60 || // <
    c === 62 || // >
    c === 92 || // \
    c === 94 || // ^
    c === 96 || // `
    c === 123 || // {
    c === 124 || // |
    c === 125) {
      return false;
    }
  }
  return true;
}
var REGEX_CACHE = /* @__PURE__ */ new Map();
var REGEX_CACHE_MAX = 1e3;
function validateRegex(s) {
  const cached = REGEX_CACHE.get(s);
  if (cached !== void 0) return cached;
  let valid;
  try {
    new RegExp(s, "u");
    valid = true;
  } catch {
    valid = false;
  }
  if (REGEX_CACHE.size < REGEX_CACHE_MAX) {
    REGEX_CACHE.set(s, valid);
  }
  return valid;
}
var URI_TEMPLATE_REGEX = /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i;
function validateUriTemplate(s) {
  return URI_TEMPLATE_REGEX.test(s);
}
function createFormatValidators(fast = false) {
  return {
    email: validateEmail,
    "idn-email": validateIdnEmail,
    uuid: (s) => FORMAT_REGEX.uuid.test(s),
    "date-time": fast ? (s) => FAST_DATE_TIME_REGEX.test(s) : validateDateTime,
    uri: validateUri,
    "uri-reference": validateUriReference,
    "uri-template": validateUriTemplate,
    iri: validateIri,
    "iri-reference": validateIriReference,
    ipv4: (s) => FORMAT_REGEX.ipv4.test(s),
    ipv6: validateIPv6,
    date: fast ? (s) => FAST_DATE_REGEX.test(s) : validateDate,
    time: fast ? (s) => FAST_TIME_REGEX.test(s) : validateTime,
    duration: validateDuration,
    hostname: validateHostname,
    "idn-hostname": validateIdnHostname,
    "json-pointer": (s) => s === "" || FORMAT_REGEX.jsonPointer.test(s),
    "relative-json-pointer": (s) => FORMAT_REGEX.relJsonPointer.test(s),
    regex: validateRegex
  };
}

// src/core/keywords/shared/utils.ts
var PROTOTYPE_PROPS = /* @__PURE__ */ new Set([
  ...Object.getOwnPropertyNames(Object.prototype),
  ...Object.getOwnPropertyNames(Array.prototype)
]);
function isSafePropertyName(name) {
  return !PROTOTYPE_PROPS.has(name);
}
function genPropertyCheck(code, dataVar, propName, callback) {
  const propAccessCode = propAccess(dataVar, propName);
  if (isSafePropertyName(propName)) {
    const propVar = code.genVar("prop");
    code.line(_`const ${propVar} = ${propAccessCode};`);
    code.if(_`${propVar} !== undefined`, () => {
      callback(propVar);
    });
  } else {
    code.if(_`Object.hasOwn(${dataVar}, ${propName})`, () => {
      callback(propAccessCode);
    });
  }
}
function genRequiredCheck(code, dataVar, propName, ctx) {
  const propPathExpr = pathExpr(ctx.path, propName);
  const checkExpr = isSafePropertyName(propName) ? _`!(${propName} in ${dataVar})` : _`!Object.hasOwn(${dataVar}, ${propName})`;
  code.if(checkExpr, () => {
    ctx.withPath(propPathExpr, () => {
      ctx.genError("required", `must have required property '${propName}'`, {
        missingProperty: propName
      });
    });
  });
}
function genBatchedRequiredChecks(code, dataVar, requiredProps, ctx) {
  if (requiredProps.length === 0) return;
  if (requiredProps.length === 1) {
    genRequiredCheck(code, dataVar, requiredProps[0], ctx);
    return;
  }
  const missingVar = code.genVar("missing");
  code.line(_`let ${missingVar};`);
  const conditions = [];
  for (const propName of requiredProps) {
    if (isSafePropertyName(propName)) {
      conditions.push(_`(!(${propName} in ${dataVar}) && (${missingVar} = ${propName}))`);
    } else {
      conditions.push(
        _`(!Object.hasOwn(${dataVar}, ${propName}) && (${missingVar} = ${propName}))`
      );
    }
  }
  let combinedCondition = conditions[0];
  for (let i = 1; i < conditions.length; i++) {
    combinedCondition = _`${combinedCondition} || ${conditions[i]}`;
  }
  code.if(combinedCondition, () => {
    if (ctx?.isInSubschemaCheck()) {
      const validVar = ctx.getSubschemaValidVar();
      const label = ctx.getSubschemaLabel();
      code.line(_`${validVar} = false;`);
      code.line(_`break ${label};`);
    } else {
      const propPathExpr = pathExprDynamic(ctx.path, missingVar);
      code.line(
        _`${ctx.getMainFuncName()}.errors = [{ instancePath: ${propPathExpr}, schemaPath: '#/required', keyword: 'required', params: { missingProperty: ${missingVar} }, message: "must have required property '" + ${missingVar} + "'" }];`
      );
      code.line(_`return false;`);
    }
  });
}
function genError(code, pathExprCode, schemaPath, keyword, message, params, ctx) {
  if (ctx?.isInSubschemaCheck()) {
    const validVar = ctx.getSubschemaValidVar();
    const label = ctx.getSubschemaLabel();
    code.line(_`${validVar} = false;`);
    code.line(_`break ${label};`);
    return;
  }
  const pathStr = pathExprCode.toString();
  const isStaticPath = pathStr === "''" || pathStr === '""';
  if (isStaticPath) {
    const errorKey = `err_${schemaPath.replace(/[^a-zA-Z0-9]/g, "_")}`;
    const errorName = new Name(errorKey);
    const errorArray = [
      {
        instancePath: "",
        schemaPath,
        keyword,
        params,
        message
      }
    ];
    ctx.addRuntimeFunction(errorKey, errorArray);
    code.line(_`${ctx.getMainFuncName()}.errors = ${errorName};`);
  } else {
    const paramsCode = stringify(params);
    const errObj = _`{ instancePath: ${pathExprCode}, schemaPath: ${schemaPath}, keyword: ${keyword}, params: ${paramsCode}, message: ${message} }`;
    code.line(_`${ctx.getMainFuncName()}.errors = [${errObj}];`);
  }
  code.line(_`return false;`);
}
function genSubschemaExit(code, ctx) {
  if (ctx.isInSubschemaCheck()) {
    const validVar = ctx.getSubschemaValidVar();
    const label = ctx.getSubschemaLabel();
    code.line(_`${validVar} = false;`);
    code.line(_`break ${label};`);
  } else {
    code.line(_`return false;`);
  }
}
function hasTypeConstraint(schema2, type) {
  if (!schema2.type) return false;
  if (Array.isArray(schema2.type)) {
    return schema2.type.length === 1 && schema2.type[0] === type;
  }
  return schema2.type === type;
}
function getTypeCheck(dataVar, type) {
  switch (type) {
    case "string":
      return _`typeof ${dataVar} === 'string'`;
    case "number":
      return _`typeof ${dataVar} === 'number'`;
    case "integer":
      return _`Number.isInteger(${dataVar})`;
    case "boolean":
      return _`typeof ${dataVar} === 'boolean'`;
    case "null":
      return _`${dataVar} === null`;
    case "array":
      return _`Array.isArray(${dataVar})`;
    case "object":
      return _`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`;
    default:
      return _`false`;
  }
}
function getOptimizedUnionTypeCheck(dataVar, types) {
  const sorted = [...types].sort();
  const key = sorted.join(",");
  switch (key) {
    case "number,string":
      const t = Code.raw(`typeof ${dataVar.toString()}`);
      return _`(${t} === 'string' || ${t} === 'number')`;
    case "boolean,number,string":
      const t2 = Code.raw(`typeof ${dataVar.toString()}`);
      return _`(${t2} === 'string' || ${t2} === 'number' || ${t2} === 'boolean')`;
    case "null,string":
      return _`(${dataVar} === null || typeof ${dataVar} === 'string')`;
    case "null,number":
      return _`(${dataVar} === null || typeof ${dataVar} === 'number')`;
    // Optimized: array OR object means typeof === 'object' && not null
    case "array,object":
      return _`(typeof ${dataVar} === 'object' && ${dataVar} !== null)`;
    // Optimized: array OR object OR null means typeof === 'object'
    case "array,null,object":
      return _`(typeof ${dataVar} === 'object')`;
    // Optimized: number OR null
    case "boolean,null":
      return _`(${dataVar} === null || typeof ${dataVar} === 'boolean')`;
    // Optimized: integer OR string
    case "integer,string":
      return _`(Number.isInteger(${dataVar}) || typeof ${dataVar} === 'string')`;
    // Optimized: integer OR number (both are numbers)
    case "integer,number":
      return _`(typeof ${dataVar} === 'number')`;
    // Optimized: array OR null
    case "array,null":
      return _`(${dataVar} === null || Array.isArray(${dataVar}))`;
    // Optimized: object OR null
    case "null,object":
      return _`(${dataVar} === null || (typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})))`;
  }
  return void 0;
}
function getItemTypes(schema2) {
  const itemsSchema = schema2.items;
  if (typeof itemsSchema === "object" && itemsSchema !== null && !Array.isArray(itemsSchema)) {
    const itemType = itemsSchema.type;
    if (typeof itemType === "string") {
      return [itemType];
    }
    if (Array.isArray(itemType)) {
      return itemType;
    }
  }
  if (Array.isArray(itemsSchema)) {
    const additionalItems = schema2.additionalItems;
    if (additionalItems === void 0 || additionalItems === true) {
      return [];
    }
    const types = /* @__PURE__ */ new Set();
    for (const itemSchema of itemsSchema) {
      if (typeof itemSchema === "object" && itemSchema !== null) {
        const itemType = itemSchema.type;
        if (typeof itemType === "string") {
          types.add(itemType);
        } else if (Array.isArray(itemType)) {
          for (const t of itemType) types.add(t);
        } else {
          return [];
        }
      } else {
        return [];
      }
    }
    if (additionalItems !== false) {
      if (typeof additionalItems === "object" && additionalItems !== null) {
        const addType = additionalItems.type;
        if (typeof addType === "string") {
          types.add(addType);
        } else if (Array.isArray(addType)) {
          for (const t of addType) types.add(t);
        } else {
          return [];
        }
      }
    }
    return Array.from(types);
  }
  return [];
}
function isNoOpSchema(schema2) {
  if (schema2 === true) return true;
  if (typeof schema2 === "object" && schema2 !== null) {
    return Object.keys(schema2).length === 0;
  }
  return false;
}
function getSimpleType(schema2) {
  if (typeof schema2 !== "object" || schema2 === null) return void 0;
  const s = schema2;
  const keys = Object.keys(s);
  if (keys.length === 1 && keys[0] === "type" && typeof s.type === "string") {
    return s.type;
  }
  const metadataKeys = /* @__PURE__ */ new Set(["$schema", "$id"]);
  const validationKeys = keys.filter((k) => !metadataKeys.has(k));
  if (validationKeys.length === 1 && validationKeys[0] === "type" && typeof s.type === "string") {
    return s.type;
  }
  return void 0;
}

// src/core/keywords/value/type.ts
function generateTypeCheck(ctx) {
  const { schema: schema2, code, data } = ctx;
  if (!schema2.type) return;
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return;
  const types = Array.isArray(schema2.type) ? schema2.type : [schema2.type];
  if (types.length === 1) {
    const type = types[0];
    const check = getTypeCheck(data, type);
    code.if(not(check), () => {
      ctx.genError("type", `must be ${type}`, { type });
    });
  } else {
    const canOptimizeWithTypeof = types.every(
      (t) => t === "string" || t === "number" || t === "boolean"
    );
    if (canOptimizeWithTypeof) {
      const typeofVar = code.genVar("t");
      code.line(_`const ${typeofVar} = typeof ${data};`);
      const checks = types.map((t) => _`${typeofVar} === ${Code.raw(JSON.stringify(t))}`);
      code.if(not(or(...checks)), () => {
        ctx.genError("type", `must be ${types.join(" or ")}`, { type: types.join(",") });
      });
    } else {
      const optimizedCheck = getOptimizedUnionTypeCheck(data, types);
      if (optimizedCheck) {
        code.if(not(optimizedCheck), () => {
          ctx.genError("type", `must be ${types.join(" or ")}`, { type: types.join(",") });
        });
      } else {
        const checks = types.map((t) => getTypeCheck(data, t));
        code.if(not(or(...checks)), () => {
          ctx.genError("type", `must be ${types.join(" or ")}`, { type: types.join(",") });
        });
      }
    }
  }
}

// src/core/keywords/value/const.ts
function canInlineComparison(value, maxDepth = 2) {
  if (value === null || typeof value !== "object") return true;
  if (maxDepth <= 0) return false;
  if (Array.isArray(value)) {
    if (value.length > 5) return false;
    return value.every((v) => canInlineComparison(v, maxDepth - 1));
  }
  const keys = Object.keys(value);
  if (keys.length > 5) return false;
  return keys.every(
    (k) => canInlineComparison(value[k], maxDepth - 1)
  );
}
function genInlineComparison(dataVar, value) {
  if (value === null) return _`${dataVar} === null`;
  if (typeof value !== "object") return _`${dataVar} === ${stringify(value)}`;
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return _`(Array.isArray(${dataVar}) && ${dataVar}.length === 0)`;
    }
    const checks2 = [_`Array.isArray(${dataVar})`, _`${dataVar}.length === ${value.length}`];
    for (let i = 0; i < value.length; i++) {
      checks2.push(genInlineComparison(_`${dataVar}[${i}]`, value[i]));
    }
    return _`(${and(...checks2)})`;
  }
  const obj = value;
  const keys = Object.keys(obj);
  if (keys.length === 0) {
    return _`(typeof ${dataVar} === 'object' && ${dataVar} !== null && !Array.isArray(${dataVar}) && Object.keys(${dataVar}).length === 0)`;
  }
  if (keys.length <= 2) {
    const checks2 = [
      _`typeof ${dataVar} === 'object'`,
      _`${dataVar} !== null`,
      _`!Array.isArray(${dataVar})`
    ];
    for (const key of keys) {
      const propAccess2 = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? _`${dataVar}.${Code.raw(key)}` : _`${dataVar}[${stringify(key)}]`;
      checks2.push(genInlineComparison(propAccess2, obj[key]));
    }
    checks2.push(_`Object.keys(${dataVar}).length === ${keys.length}`);
    return _`(${and(...checks2)})`;
  }
  const checks = [
    _`typeof ${dataVar} === 'object'`,
    _`${dataVar} !== null`,
    _`!Array.isArray(${dataVar})`,
    _`Object.keys(${dataVar}).length === ${keys.length}`
  ];
  for (const key of keys) {
    const propAccess2 = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? _`${dataVar}.${Code.raw(key)}` : _`${dataVar}[${stringify(key)}]`;
    checks.push(genInlineComparison(propAccess2, obj[key]));
  }
  return _`(${and(...checks)})`;
}
function generateConstCheck(ctx) {
  const { schema: schema2, code, data } = ctx;
  if (schema2.const === void 0) return;
  if (schema2.const === null || typeof schema2.const !== "object") {
    code.if(_`${data} !== ${stringify(schema2.const)}`, () => {
      ctx.genError("const", "must be equal to constant", { allowedValue: schema2.const });
    });
  } else if (canInlineComparison(schema2.const)) {
    const inlineCheck = genInlineComparison(data, schema2.const);
    code.if(_`!(${inlineCheck})`, () => {
      ctx.genError("const", "must be equal to constant", { allowedValue: schema2.const });
    });
  } else {
    const constName = new Name(ctx.genRuntimeName("const"));
    ctx.addRuntimeFunction(constName.str, schema2.const);
    code.if(_`!deepEqual(${data}, ${constName})`, () => {
      ctx.genError("const", "must be equal to constant", { allowedValue: schema2.const });
    });
  }
}

// src/core/keywords/value/enum.ts
function generateEnumCheck(ctx) {
  const { schema: schema2, code, data } = ctx;
  if (!schema2.enum) return;
  const primitives = [];
  const complexValues = [];
  for (const v of schema2.enum) {
    if (v === null || typeof v !== "object") {
      primitives.push(v);
    } else {
      complexValues.push(v);
    }
  }
  if (complexValues.length === 0) {
    if (primitives.length <= 15) {
      const checks = [];
      for (let i = 0; i < primitives.length; i++) {
        checks.push(_`${data} === ${stringify(primitives[i])}`);
      }
      const condition = checks.length === 1 ? _`!(${checks[0]})` : _`!(${or(...checks)})`;
      code.if(condition, () => {
        ctx.genError("enum", "must be equal to one of the allowed values", {
          allowedValues: schema2.enum
        });
      });
    } else {
      const setName = new Name(ctx.genRuntimeName("enumSet"));
      ctx.addRuntimeFunction(setName.str, new Set(primitives));
      code.if(_`!${setName}.has(${data})`, () => {
        ctx.genError("enum", "must be equal to one of the allowed values", {
          allowedValues: schema2.enum
        });
      });
    }
  } else if (primitives.length === 0) {
    const inlinableValues = [];
    const nonInlinableValues = [];
    for (const v of complexValues) {
      if (canInlineComparison(v)) {
        inlinableValues.push(v);
      } else {
        nonInlinableValues.push(v);
      }
    }
    if (nonInlinableValues.length === 0) {
      const checks = [];
      for (const val of inlinableValues) {
        checks.push(genInlineComparison(data, val));
      }
      const condition = checks.length === 1 ? _`!(${checks[0]})` : _`!(${or(...checks)})`;
      code.if(condition, () => {
        ctx.genError("enum", "must be equal to one of the allowed values", {
          allowedValues: schema2.enum
        });
      });
    } else if (complexValues.length <= 10) {
      const arrName = new Name(ctx.genRuntimeName("enumArr"));
      ctx.addRuntimeFunction(arrName.str, complexValues);
      const checks = complexValues.map((_val, i) => _`deepEqual(${data}, ${arrName}[${i}])`);
      const condition = checks.length === 1 ? _`!(${checks[0]})` : _`!(${or(...checks)})`;
      code.if(condition, () => {
        ctx.genError("enum", "must be equal to one of the allowed values", {
          allowedValues: schema2.enum
        });
      });
    } else {
      const arrName = new Name(ctx.genRuntimeName("enumArr"));
      ctx.addRuntimeFunction(arrName.str, complexValues);
      const matchVar = code.genVar("match");
      const iVar = code.genVar("i");
      code.line(_`let ${matchVar} = false;`);
      code.line(_`for (let ${iVar} = 0; ${iVar} < ${arrName}.length; ${iVar}++) {`);
      code.line(_`  if (deepEqual(${data}, ${arrName}[${iVar}])) {`);
      code.line(_`    ${matchVar} = true;`);
      code.line(_`    break;`);
      code.line(_`  }`);
      code.line(_`}`);
      code.if(_`!${matchVar}`, () => {
        ctx.genError("enum", "must be equal to one of the allowed values", {
          allowedValues: schema2.enum
        });
      });
    }
  } else {
    const totalLen = primitives.length + complexValues.length;
    const inlinableComplex = [];
    const nonInlinableComplex = [];
    for (const v of complexValues) {
      if (canInlineComparison(v)) {
        inlinableComplex.push(v);
      } else {
        nonInlinableComplex.push(v);
      }
    }
    if (totalLen <= 15 && nonInlinableComplex.length === 0) {
      const checks = [];
      for (const val of primitives) {
        checks.push(_`${data} === ${stringify(val)}`);
      }
      for (const val of inlinableComplex) {
        checks.push(genInlineComparison(data, val));
      }
      const condition = _`!(${or(...checks)})`;
      code.if(condition, () => {
        ctx.genError("enum", "must be equal to one of the allowed values", {
          allowedValues: schema2.enum
        });
      });
    } else if (totalLen <= 15) {
      const arrName = new Name(ctx.genRuntimeName("enumArr"));
      ctx.addRuntimeFunction(arrName.str, complexValues);
      const checks = [];
      for (const val of primitives) {
        checks.push(_`${data} === ${stringify(val)}`);
      }
      for (let i = 0; i < complexValues.length; i++) {
        checks.push(_`deepEqual(${data}, ${arrName}[${i}])`);
      }
      const condition = _`!(${or(...checks)})`;
      code.if(condition, () => {
        ctx.genError("enum", "must be equal to one of the allowed values", {
          allowedValues: schema2.enum
        });
      });
    } else {
      const arrName = new Name(ctx.genRuntimeName("enumArr"));
      ctx.addRuntimeFunction(arrName.str, complexValues);
      const checkedVar = code.genVar("checked");
      const setName = new Name(ctx.genRuntimeName("enumSet"));
      ctx.addRuntimeFunction(setName.str, new Set(primitives));
      code.line(_`let ${checkedVar} = ${setName}.has(${data});`);
      code.if(_`!${checkedVar} && typeof ${data} === 'object' && ${data} !== null`, () => {
        const iVar = code.genVar("i");
        code.line(_`for (let ${iVar} = 0; ${iVar} < ${arrName}.length; ${iVar}++) {`);
        code.line(_`  if (deepEqual(${data}, ${arrName}[${iVar}])) {`);
        code.line(_`    ${checkedVar} = true;`);
        code.line(_`    break;`);
        code.line(_`  }`);
        code.line(_`}`);
      });
      code.if(_`!${checkedVar}`, () => {
        ctx.genError("enum", "must be equal to one of the allowed values", {
          allowedValues: schema2.enum
        });
      });
    }
  }
}

// src/core/keywords/string/regex-flags.ts
var regexFlagsCache = /* @__PURE__ */ new Map();
function determineRegexFlags(pattern) {
  const cached = regexFlagsCache.get(pattern);
  if (cached !== void 0) return cached;
  let needsUnicode = false;
  let i = 0;
  const len = pattern.length;
  while (i < len) {
    const ch = pattern.charCodeAt(i);
    if (ch >= 55296 && ch <= 57343) {
      needsUnicode = true;
      break;
    }
    if (ch === 92) {
      if (i + 1 < len) {
        const next = pattern.charCodeAt(i + 1);
        if ((next === 112 || next === 80) && i + 2 < len && pattern.charCodeAt(i + 2) === 123) {
          needsUnicode = true;
          break;
        }
        if (next === 117 && i + 2 < len && pattern.charCodeAt(i + 2) === 123) {
          needsUnicode = true;
          break;
        }
        i++;
      }
    }
    i++;
  }
  const flags = needsUnicode ? "u" : "";
  regexFlagsCache.set(pattern, flags);
  return flags;
}

// src/core/keywords/string/min-length.ts
function generateMinLengthCheck(schema2, ctx, lenVar) {
  if (schema2.minLength === void 0) return;
  const { code } = ctx;
  code.if(_`${lenVar} < ${schema2.minLength}`, () => {
    ctx.genError("minLength", `must NOT have fewer than ${schema2.minLength} characters`, {
      limit: schema2.minLength
    });
  });
}

// src/core/keywords/string/max-length.ts
function generateMaxLengthCheck(schema2, ctx, lenVar) {
  if (schema2.maxLength === void 0) return;
  const { code } = ctx;
  code.if(_`${lenVar} > ${schema2.maxLength}`, () => {
    ctx.genError("maxLength", `must NOT have more than ${schema2.maxLength} characters`, {
      limit: schema2.maxLength
    });
  });
}

// src/core/keywords/string/pattern.ts
function generatePatternCheck(schema2, ctx) {
  if (schema2.pattern === void 0) return;
  const { code, data } = ctx;
  const flags = determineRegexFlags(schema2.pattern);
  const regexName = new Name(ctx.genRuntimeName("pattern"));
  ctx.addRuntimeFunction(regexName.str, new RegExp(schema2.pattern, flags));
  code.if(_`!${regexName}.test(${data})`, () => {
    ctx.genError("pattern", `must match pattern "${schema2.pattern}"`, {
      pattern: schema2.pattern
    });
  });
}

// src/core/keywords/string/content.ts
function generateContentChecks(ctx) {
  const { schema: schema2, code, data } = ctx;
  const hasContentChecks = schema2.contentMediaType !== void 0 || schema2.contentEncoding !== void 0;
  if (!hasContentChecks) return;
  if (!ctx.options.contentAssertion) {
    return;
  }
  code.if(_`typeof ${data} === 'string'`, () => {
    if (schema2.contentEncoding !== void 0) {
      if (schema2.contentEncoding === "base64") {
        const regexName = new Name(ctx.genRuntimeName("base64Re"));
        ctx.addRuntimeFunction(regexName.str, /^[A-Za-z0-9+/]*={0,2}$/);
        code.if(_`!${regexName}.test(${data}) || ${data}.length % 4 !== 0`, () => {
          ctx.genError("contentEncoding", "must be base64 encoded", {});
        });
      }
    }
    if (schema2.contentMediaType !== void 0) {
      if (schema2.contentMediaType === "application/json") {
        if (schema2.contentEncoding === "base64") {
          const decodedVar = code.genVar("decoded");
          code.try(
            () => {
              code.line(_`const ${decodedVar} = atob(${data});`);
              code.line(_`JSON.parse(${decodedVar});`);
            },
            () => {
              ctx.genError("contentMediaType", "must be application/json", {});
            }
          );
        } else {
          code.try(
            () => {
              code.line(_`JSON.parse(${data});`);
            },
            () => {
              ctx.genError("contentMediaType", "must be application/json", {});
            }
          );
        }
      }
    }
  });
}

// src/core/keywords/string/string-checks.ts
function generateStringChecks(ctx) {
  const { schema: schema2, code, data } = ctx;
  const hasStringChecks = schema2.minLength !== void 0 || schema2.maxLength !== void 0 || schema2.pattern !== void 0;
  if (!hasStringChecks) return;
  const needsTypeCheck = schema2.type !== "string";
  const generateChecks = () => {
    if (schema2.minLength !== void 0 || schema2.maxLength !== void 0) {
      const lenVar = code.genVar("len");
      code.line(_`const ${lenVar} = ucs2length(${data});`);
      generateMinLengthCheck(schema2, ctx, lenVar);
      generateMaxLengthCheck(schema2, ctx, lenVar);
    }
    generatePatternCheck(schema2, ctx);
  };
  if (needsTypeCheck) {
    code.if(_`typeof ${data} === 'string'`, generateChecks);
  } else {
    generateChecks();
  }
}

// src/core/keywords/number/number-checks.ts
function generateNumberChecks(ctx) {
  if (!ctx.isVocabularyEnabled(VOCABULARIES.validation)) return;
  const { schema: schema2, code, data } = ctx;
  const hasNumberChecks = schema2.minimum !== void 0 || schema2.maximum !== void 0 || schema2.exclusiveMinimum !== void 0 || schema2.exclusiveMaximum !== void 0 || schema2.multipleOf !== void 0;
  if (!hasNumberChecks) return;
  const needsTypeGuard = !hasTypeConstraint(schema2, "number") && !hasTypeConstraint(schema2, "integer");
  const genChecks = () => {
    if (schema2.minimum !== void 0) {
      if (schema2.exclusiveMinimum === true) {
        code.if(_`${data} <= ${schema2.minimum}`, () => {
          ctx.genError("minimum", `must be > ${schema2.minimum}`, {
            comparison: ">",
            limit: schema2.minimum
          });
        });
      } else {
        code.if(_`${data} < ${schema2.minimum}`, () => {
          ctx.genError("minimum", `must be >= ${schema2.minimum}`, {
            comparison: ">=",
            limit: schema2.minimum
          });
        });
      }
    }
    if (schema2.maximum !== void 0) {
      if (schema2.exclusiveMaximum === true) {
        code.if(_`${data} >= ${schema2.maximum}`, () => {
          ctx.genError("maximum", `must be < ${schema2.maximum}`, {
            comparison: "<",
            limit: schema2.maximum
          });
        });
      } else {
        code.if(_`${data} > ${schema2.maximum}`, () => {
          ctx.genError("maximum", `must be <= ${schema2.maximum}`, {
            comparison: "<=",
            limit: schema2.maximum
          });
        });
      }
    }
    if (typeof schema2.exclusiveMinimum === "number") {
      code.if(_`${data} <= ${schema2.exclusiveMinimum}`, () => {
        ctx.genError("exclusiveMinimum", `must be > ${schema2.exclusiveMinimum}`, {
          comparison: ">",
          limit: schema2.exclusiveMinimum
        });
      });
    }
    if (typeof schema2.exclusiveMaximum === "number") {
      code.if(_`${data} >= ${schema2.exclusiveMaximum}`, () => {
        ctx.genError("exclusiveMaximum", `must be < ${schema2.exclusiveMaximum}`, {
          comparison: "<",
          limit: schema2.exclusiveMaximum
        });
      });
    }
    if (schema2.multipleOf !== void 0) {
      const multipleOf = schema2.multipleOf;
      if (Number.isInteger(multipleOf) && multipleOf >= 1) {
        code.if(_`${data} % ${multipleOf} !== 0`, () => {
          ctx.genError("multipleOf", `must be multiple of ${schema2.multipleOf}`, {
            multipleOf: schema2.multipleOf
          });
        });
      } else if (Number.isInteger(1 / multipleOf)) {
        const divVar = code.genVar("div");
        code.line(_`const ${divVar} = ${data} / ${multipleOf};`);
        code.if(_`!Number.isFinite(${divVar})`, () => {
          code.if(_`${data} % ${multipleOf} !== 0`, () => {
            ctx.genError("multipleOf", `must be multiple of ${schema2.multipleOf}`, {
              multipleOf: schema2.multipleOf
            });
          });
        });
        code.else(() => {
          code.if(_`!Number.isInteger(${divVar})`, () => {
            ctx.genError("multipleOf", `must be multiple of ${schema2.multipleOf}`, {
              multipleOf: schema2.multipleOf
            });
          });
        });
      } else {
        code.if(_`!Number.isInteger(${data} / ${multipleOf})`, () => {
          ctx.genError("multipleOf", `must be multiple of ${schema2.multipleOf}`, {
            multipleOf: schema2.multipleOf
          });
        });
      }
    }
  };
  if (needsTypeGuard) {
    code.if(_`typeof ${data} === 'number'`, genChecks);
  } else {
    genChecks();
  }
}

// src/core/keywords/array/min-items.ts
function generateMinItemsCheck(ctx) {
  const { schema: schema2, code, data } = ctx;
  if (schema2.minItems === void 0) return;
  const genCheck = () => {
    code.if(_`${data}.length < ${schema2.minItems}`, () => {
      ctx.genError("minItems", `must NOT have fewer than ${schema2.minItems} items`, {
        limit: schema2.minItems
      });
    });
  };
  if (hasTypeConstraint(schema2, "array")) {
    genCheck();
  } else {
    code.if(_`Array.isArray(${data})`, genCheck);
  }
}

// src/core/keywords/array/max-items.ts
function generateMaxItemsCheck(ctx) {
  const { schema: schema2, code, data } = ctx;
  if (schema2.maxItems === void 0) return;
  const genCheck = () => {
    code.if(_`${data}.length > ${schema2.maxItems}`, () => {
      ctx.genError("maxItems", `must NOT have more than ${schema2.maxItems} items`, {
        limit: schema2.maxItems
      });
    });
  };
  if (hasTypeConstraint(schema2, "array")) {
    genCheck();
  } else {
    code.if(_`Array.isArray(${data})`, genCheck);
  }
}

// src/core/keywords/array/unique-items.ts
function generateUniqueItemsCheck(ctx) {
  const { schema: schema2, code, data } = ctx;
  if (schema2.uniqueItems !== true) return;
  const genCheck = () => {
    const itemTypes = getItemTypes(schema2);
    const canOptimize = itemTypes.length > 0 && !itemTypes.some((t) => t === "object" || t === "array");
    const iVar = code.genVar("i");
    if (canOptimize) {
      const seenVar = code.genVar("seen");
      const lenVar = code.genVar("len");
      const itemVar = code.genVar("item");
      code.line(_`const ${seenVar} = new Set();`);
      code.block(
        _`for (let ${iVar} = 0, ${lenVar} = ${data}.length; ${iVar} < ${lenVar}; ${iVar}++)`,
        () => {
          code.line(_`const ${itemVar} = ${data}[${iVar}];`);
          code.if(_`${seenVar}.has(${itemVar})`, () => {
            ctx.genError("uniqueItems", "must NOT have duplicate items", {});
          });
          code.line(_`${seenVar}.add(${itemVar});`);
        }
      );
    } else {
      const jVar = code.genVar("j");
      code.block(_`outer: for (let ${iVar} = ${data}.length; ${iVar}--;)`, () => {
        code.block(_`for (let ${jVar} = ${iVar}; ${jVar}--;)`, () => {
          code.if(_`deepEqual(${data}[${iVar}], ${data}[${jVar}])`, () => {
            ctx.genError("uniqueItems", "must NOT have duplicate items", {});
          });
        });
      });
    }
  };
  if (hasTypeConstraint(schema2, "array")) {
    genCheck();
  } else {
    code.if(_`Array.isArray(${data})`, genCheck);
  }
}

// src/core/keywords/array/items.ts
function generateItemsChecks(ctx) {
  const { schema: schema2, code, data, path } = ctx;
  const itemsIsArray = Array.isArray(schema2.items);
  const hasPrefixItems = supportsFeature(schema2.$schema ?? ctx.options.defaultMeta, "prefixItems");
  const tupleSchemas = itemsIsArray ? schema2.items : hasPrefixItems && schema2.prefixItems ? [...schema2.prefixItems] : [];
  let afterTupleSchema;
  if (itemsIsArray) {
    afterTupleSchema = schema2.additionalItems;
  } else if (!itemsIsArray && schema2.items !== void 0) {
    afterTupleSchema = schema2.items;
  }
  const hasAfterTupleSchema = afterTupleSchema !== void 0 && !isNoOpSchema(afterTupleSchema);
  const nonTrivialTupleSchemas = [];
  for (let i = 0; i < tupleSchemas.length; i++) {
    const s = tupleSchemas[i];
    if (!isNoOpSchema(s)) {
      nonTrivialTupleSchemas.push({ schema: s, index: i });
    }
  }
  const hasNonTrivialTuples = nonTrivialTupleSchemas.length > 0;
  const itemsTracker = ctx.tracker.items;
  const tracker = ctx.tracker;
  if (tupleSchemas.length > 0) {
    itemsTracker.addPrefixItems(tupleSchemas.length);
  }
  if (afterTupleSchema !== void 0) {
    itemsTracker.markAllItemsEvaluated();
  }
  if (!hasNonTrivialTuples && !hasAfterTupleSchema) return;
  const genChecks = () => {
    for (const { schema: itemSchema, index: i } of nonTrivialTupleSchemas) {
      const itemPathExpr = pathExpr(path, i);
      code.if(_`${data}.length > ${i}`, () => {
        const itemAccess = indexAccess(data, i);
        const itemVar = code.genVar("item");
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
              itemsIsArray ? "additionalItems" : "items",
              `must NOT have more than ${startIndex} items`,
              {}
            );
          });
        } else {
          code.if(_`${data}.length > 0`, () => {
            ctx.genError("items", "must NOT have more than 0 items", {});
          });
        }
      } else if (afterTupleSchema !== true) {
        const simpleType = getSimpleType(afterTupleSchema);
        if (simpleType) {
          const iVar = code.genVar("i");
          code.forArray(
            iVar,
            data,
            () => {
              const itemAccess = indexAccess(data, iVar);
              const itemPathExpr = pathExprIndex(path, iVar);
              const typeCheck = getTypeCheck(itemAccess, simpleType);
              code.if(not(typeCheck), () => {
                ctx.withPath(itemPathExpr, () => {
                  ctx.genError("type", `must be ${simpleType}`, { type: simpleType });
                });
              });
            },
            startIndex
          );
        } else {
          const iVar = code.genVar("i");
          code.forArray(
            iVar,
            data,
            () => {
              const itemAccess = indexAccess(data, iVar);
              const itemPathExpr = pathExprIndex(path, iVar);
              const itemVar = code.genVar("item");
              code.line(_`const ${itemVar} = ${itemAccess};`);
              tracker.withItemsScope(() => {
                ctx.validateSubschema(afterTupleSchema, itemVar, itemPathExpr);
              });
            },
            startIndex
          );
        }
      }
    }
  };
  if (hasTypeConstraint(schema2, "array")) {
    genChecks();
  } else {
    code.if(_`Array.isArray(${data})`, genChecks);
  }
}

// src/core/keywords/shared/helpers.ts
var generateSchemaValidatorImpl;
function setGenerateSchemaValidator(fn) {
  generateSchemaValidatorImpl = fn;
}
function generateSubschemaCheck(code, schema2, dataVar, ctx, dynamicScopeVar) {
  if (!generateSchemaValidatorImpl) {
    throw new Error("generateSchemaValidator not initialized");
  }
  if (schema2 === true) return _`true`;
  if (typeof schema2 === "object" && schema2 !== null && Object.keys(schema2).length === 0) {
    return _`true`;
  }
  if (schema2 === false) return _`false`;
  let resolvedSchema = schema2;
  if (typeof schema2 === "object" && schema2 !== null && schema2.$ref && !ctx.hasAnyDynamicAnchors()) {
    const refSchema = ctx.resolveRef(schema2.$ref, schema2);
    if (refSchema) {
      resolvedSchema = refSchema;
      let depth = 0;
      const maxDepth = 100;
      while (typeof resolvedSchema === "object" && resolvedSchema !== null && "$ref" in resolvedSchema && resolvedSchema.$ref && Object.keys(resolvedSchema).length === 1 && depth < maxDepth) {
        const nextSchema = ctx.resolveRef(resolvedSchema.$ref, resolvedSchema);
        if (!nextSchema) break;
        resolvedSchema = nextSchema;
        depth++;
      }
    }
  }
  if (typeof resolvedSchema === "object" && resolvedSchema !== null && !resolvedSchema.$ref && // Must be fully resolved (no more refs)
  !resolvedSchema.$id && // Not a resource
  !resolvedSchema.$dynamicRef && !resolvedSchema.$dynamicAnchor && !resolvedSchema.allOf && !resolvedSchema.anyOf && !resolvedSchema.oneOf && !resolvedSchema.not && !resolvedSchema.if && !resolvedSchema.properties && !resolvedSchema.patternProperties && !resolvedSchema.additionalProperties && !resolvedSchema.dependentSchemas && !resolvedSchema.dependencies && !resolvedSchema.prefixItems && !resolvedSchema.items && !resolvedSchema.contains && !resolvedSchema.unevaluatedProperties && !resolvedSchema.unevaluatedItems && !resolvedSchema.$defs && !resolvedSchema.definitions) {
    const keywords = Object.keys(resolvedSchema).filter(
      (k) => k !== "$schema" && k !== "$comment" && k !== "title" && k !== "description" && k !== "$anchor" && k !== "examples" && k !== "default"
    );
    if (keywords.length === 0) {
      return _`true`;
    }
    if (keywords.length === 1 && resolvedSchema.type) {
      const types = Array.isArray(resolvedSchema.type) ? resolvedSchema.type : [resolvedSchema.type];
      if (types.length === 1) {
        return getTypeCheck(dataVar, types[0]);
      } else {
        const optimizedCheck = getOptimizedUnionTypeCheck(dataVar, types);
        if (optimizedCheck) {
          return optimizedCheck;
        }
        const checks = types.map((t) => getTypeCheck(dataVar, t));
        return or(...checks);
      }
    }
    if (keywords.length === 1 && "const" in resolvedSchema && (resolvedSchema.const === null || typeof resolvedSchema.const !== "object")) {
      return _`${dataVar} === ${stringify(resolvedSchema.const)}`;
    }
    if (keywords.length === 1 && resolvedSchema.enum && resolvedSchema.enum.length <= 5) {
      const allPrimitives = resolvedSchema.enum.every(
        (val) => val === null || typeof val !== "object"
      );
      if (allPrimitives) {
        const checks = resolvedSchema.enum.map((val) => _`${dataVar} === ${stringify(val)}`);
        return or(...checks);
      }
    }
    if (keywords.length === 1 && resolvedSchema.required && resolvedSchema.required.length === 1) {
      const propName = resolvedSchema.required[0];
      return _`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar}) && ${JSON.stringify(propName)} in ${dataVar}`;
    }
  }
  const isRefOnly = typeof schema2 === "object" && schema2 !== null && schema2.$ref && Object.keys(schema2).filter((k) => k !== "$ref" && k !== "$schema" && k !== "$comment").length === 0;
  const schemaToValidate = isRefOnly && resolvedSchema !== schema2 ? resolvedSchema : schema2;
  if (typeof schemaToValidate === "object" && schemaToValidate !== null && (ctx.isProcessingInline(schemaToValidate) || ctx.isCompiled(schemaToValidate))) {
    const funcName = ctx.getCompiledName(schemaToValidate) ?? ctx.queueCompile(schemaToValidate);
    const hasDynamicFeatures = dynamicScopeVar !== void 0;
    if (hasDynamicFeatures) {
      return _`${funcName}(${dataVar}, null, '', ${dynamicScopeVar})`;
    } else {
      return _`${funcName}(${dataVar}, null, '')`;
    }
  }
  const label = code.genVar("check");
  const validVar = code.genVar("valid");
  code.line(_`let ${validVar} = true;`);
  code.line(_`${label}: {`);
  if (typeof schemaToValidate === "object" && schemaToValidate !== null) {
    ctx.enterInlineProcessing(schemaToValidate);
  }
  ctx.enterSubschemaCheck(label, validVar);
  const restoreSchemaContext = ctx.saveSchemaContext();
  generateSchemaValidatorImpl(code, schemaToValidate, dataVar, _`''`, ctx, dynamicScopeVar);
  restoreSchemaContext();
  ctx.exitSubschemaCheck();
  if (typeof schemaToValidate === "object" && schemaToValidate !== null) {
    ctx.exitInlineProcessing(schemaToValidate);
  }
  code.line(_`}`);
  return _`${validVar}`;
}

// src/core/keywords/array/contains.ts
function generateContainsCheck(ctx) {
  const { schema: schema2, code, data } = ctx;
  if (schema2.contains === void 0) return;
  const containsSchema = schema2.contains;
  const minContains = schema2.minContains ?? 1;
  const maxContains = schema2.maxContains;
  const itemsTracker = ctx.tracker.items;
  const needsItemsTracking = itemsTracker.active;
  if (containsSchema === true) {
    if (needsItemsTracking) {
      itemsTracker.markAllItemsEvaluated();
    }
    code.if(_`Array.isArray(${data})`, () => {
      code.if(_`${data}.length < ${minContains}`, () => {
        ctx.genError("contains", `must contain at least ${minContains} valid item(s)`, {
          minContains
        });
      });
      if (maxContains !== void 0) {
        code.if(_`${data}.length > ${maxContains}`, () => {
          ctx.genError("contains", `must contain at most ${maxContains} valid item(s)`, {
            maxContains
          });
        });
      }
    });
    return;
  }
  if (containsSchema === false) {
    code.if(_`Array.isArray(${data})`, () => {
      if (minContains > 0) {
        ctx.genError("contains", `must contain at least ${minContains} valid item(s)`, {
          minContains
        });
      }
    });
    return;
  }
  if (minContains === 0 && maxContains === void 0 && !needsItemsTracking) {
    return;
  }
  if (needsItemsTracking) {
    itemsTracker.getDynamicVar();
  }
  code.if(_`Array.isArray(${data})`, () => {
    const countVar = code.genVar("containsCount");
    code.line(_`let ${countVar} = 0;`);
    const iVar = code.genVar("i");
    const canEarlyExit = !needsItemsTracking;
    const simpleType = getSimpleType(containsSchema);
    if (simpleType) {
      const lenVar = code.genVar("len");
      code.line(_`const ${lenVar} = ${data}.length;`);
      code.for(_`let ${iVar} = 0`, _`${iVar} < ${lenVar}`, _`${iVar}++`, () => {
        const itemAccess = indexAccess(data, iVar);
        let inlineCheck;
        switch (simpleType) {
          case "string":
            inlineCheck = _`typeof ${itemAccess} === 'string'`;
            break;
          case "number":
            inlineCheck = _`typeof ${itemAccess} === 'number'`;
            break;
          case "integer":
            inlineCheck = _`Number.isInteger(${itemAccess})`;
            break;
          case "boolean":
            inlineCheck = _`typeof ${itemAccess} === 'boolean'`;
            break;
          case "null":
            inlineCheck = _`${itemAccess} === null`;
            break;
          case "array":
            inlineCheck = _`Array.isArray(${itemAccess})`;
            break;
          case "object":
            inlineCheck = _`${itemAccess} && typeof ${itemAccess} === 'object' && !Array.isArray(${itemAccess})`;
            break;
          default:
            inlineCheck = _`false`;
        }
        code.if(inlineCheck, () => {
          code.line(_`${countVar}++;`);
          if (needsItemsTracking) {
            itemsTracker.markItemEvaluated(iVar);
          }
        });
        if (canEarlyExit) {
          if (maxContains === void 0) {
            code.if(_`${countVar} >= ${minContains}`, () => {
              code.line(_`break;`);
            });
          } else {
            code.if(_`${countVar} > ${maxContains}`, () => {
              code.line(_`break;`);
            });
          }
        }
      });
    } else {
      const lenVar = code.genVar("len");
      code.line(_`const ${lenVar} = ${data}.length;`);
      code.for(_`let ${iVar} = 0`, _`${iVar} < ${lenVar}`, _`${iVar}++`, () => {
        const itemAccess = indexAccess(data, iVar);
        const itemVar = code.genVar("item");
        code.line(_`const ${itemVar} = ${itemAccess};`);
        const checkExpr = generateSubschemaCheck(
          code,
          containsSchema,
          itemVar,
          ctx,
          ctx.getDynamicScopeVar()
        );
        code.if(checkExpr, () => {
          code.line(_`${countVar}++;`);
          if (needsItemsTracking) {
            itemsTracker.markItemEvaluated(iVar);
          }
        });
        if (canEarlyExit) {
          if (maxContains === void 0) {
            code.if(_`${countVar} >= ${minContains}`, () => {
              code.line(_`break;`);
            });
          } else {
            code.if(_`${countVar} > ${maxContains}`, () => {
              code.line(_`break;`);
            });
          }
        }
      });
    }
    code.if(_`${countVar} < ${minContains}`, () => {
      ctx.genError("contains", `must contain at least ${minContains} valid item(s)`, {
        minContains
      });
    });
    if (maxContains !== void 0) {
      code.if(_`${countVar} > ${maxContains}`, () => {
        ctx.genError("contains", `must contain at most ${maxContains} valid item(s)`, {
          maxContains
        });
      });
    }
  });
}

// src/core/keywords/array/unevaluated-items.ts
function generateUnevaluatedItemsCheck(ctx) {
  const { schema: schema2, code, data, path } = ctx;
  if (schema2.unevaluatedItems === void 0) return;
  const itemsTracker = ctx.tracker.items;
  if (itemsTracker.allItemsEvaluated) return;
  const unevalSchema = schema2.unevaluatedItems;
  if (unevalSchema === true && itemsTracker.active) {
    itemsTracker.getDynamicVar();
  }
  const genCheck = () => {
    const iVar = code.genVar("i");
    const lenVar = code.genVar("len");
    const staticItemCount = itemsTracker.getStaticItemCount();
    const needsDynamic = itemsTracker.needsDynamic;
    const dynamicVar = needsDynamic ? itemsTracker.getDynamicVar() : void 0;
    const allEvalVar = needsDynamic ? code.genVar("allEval") : void 0;
    if (allEvalVar && dynamicVar) {
      code.line(_`const ${allEvalVar} = ${dynamicVar}.allItemsEvaluated;`);
    }
    code.line(_`const ${lenVar} = ${data}.length;`);
    const startIdx = staticItemCount > 0 ? staticItemCount : 0;
    const loopInit = startIdx > 0 ? _`let ${iVar} = ${startIdx}` : _`let ${iVar} = 0`;
    code.for(loopInit, _`${iVar} < ${lenVar}`, _`${iVar}++`, () => {
      const itemPathExpr = pathExprIndex(path, iVar);
      let isUnevaluatedExpr = null;
      if (needsDynamic && allEvalVar && dynamicVar) {
        isUnevaluatedExpr = _`!${allEvalVar} && !${dynamicVar}.has(${iVar})`;
      } else if (needsDynamic && dynamicVar) {
        isUnevaluatedExpr = _`!${dynamicVar}.allItemsEvaluated && !${dynamicVar}.has(${iVar})`;
      }
      const genBody = () => {
        if (unevalSchema === false) {
          ctx.withPath(itemPathExpr, () => {
            ctx.genError("unevaluatedItems", "must NOT have unevaluated items", {});
          });
        } else if (unevalSchema === true) {
          itemsTracker.markItemEvaluated(iVar);
        } else {
          const itemAccess = indexAccess(data, iVar);
          const itemVar = code.genVar("unevalItem");
          code.line(_`const ${itemVar} = ${itemAccess};`);
          ctx.validateSubschema(unevalSchema, itemVar, itemPathExpr);
        }
      };
      if (isUnevaluatedExpr) {
        code.if(isUnevaluatedExpr, genBody);
      } else {
        genBody();
      }
    });
  };
  if (hasTypeConstraint(schema2, "array")) {
    genCheck();
  } else {
    code.if(_`Array.isArray(${data})`, genCheck);
  }
}

// src/core/keywords/object/object-checks.ts
function generateObjectChecks(ctx) {
  const { schema: schema2, code, data } = ctx;
  const hasObjectChecks = schema2.required && schema2.required.length > 0 || schema2.minProperties !== void 0 || schema2.maxProperties !== void 0;
  if (!hasObjectChecks) return;
  const genChecks = () => {
    if (schema2.required && schema2.required.length > 0) {
      genBatchedRequiredChecks(code, data, schema2.required, ctx);
    }
    if (schema2.minProperties !== void 0 || schema2.maxProperties !== void 0) {
      code.line(_`const propCount = Object.keys(${data}).length;`);
      if (schema2.minProperties !== void 0) {
        code.if(_`propCount < ${schema2.minProperties}`, () => {
          ctx.genError(
            "minProperties",
            `must NOT have fewer than ${schema2.minProperties} properties`,
            { limit: schema2.minProperties }
          );
        });
      }
      if (schema2.maxProperties !== void 0) {
        code.if(_`propCount > ${schema2.maxProperties}`, () => {
          ctx.genError(
            "maxProperties",
            `must NOT have more than ${schema2.maxProperties} properties`,
            { limit: schema2.maxProperties }
          );
        });
      }
    }
  };
  if (hasTypeConstraint(schema2, "object")) {
    genChecks();
  } else {
    code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, genChecks);
  }
}

// src/core/keywords/object/properties.ts
function generateAdditionalPropsCheck(schema2, dataExpr, pathExprCode, ctx) {
  const { code } = ctx;
  if (schema2 === false) {
    ctx.withPath(pathExprCode, () => {
      ctx.genError("additionalProperties", "must NOT have additional properties", {});
    });
  } else if (schema2 === true) {
  } else {
    const propVar = code.genVar("ap");
    code.line(_`const ${propVar} = ${dataExpr};`);
    const propsTracker = ctx.tracker.props;
    propsTracker.withScope(() => {
      ctx.validateSubschema(schema2, propVar, pathExprCode);
    }, false);
  }
}
function generatePropertiesChecks(ctx) {
  const { schema: schema2, code, data, path } = ctx;
  const nonTrivialProps = schema2.properties ? Object.entries(schema2.properties).filter(([, s]) => !isNoOpSchema(s)) : [];
  const nonTrivialPatternProps = schema2.patternProperties ? Object.entries(schema2.patternProperties).filter(([, s]) => !isNoOpSchema(s)) : [];
  const hasProps = nonTrivialProps.length > 0;
  const hasPatternProps = nonTrivialPatternProps.length > 0;
  const hasAdditionalProps = schema2.additionalProperties !== void 0 && !isNoOpSchema(schema2.additionalProperties);
  const propsTracker = ctx.tracker.props;
  if (schema2.properties) {
    propsTracker.addProperties(Object.keys(schema2.properties));
  }
  if (schema2.patternProperties) {
    propsTracker.addPatterns(Object.keys(schema2.patternProperties));
  }
  if (schema2.additionalProperties !== void 0 && schema2.additionalProperties !== false) {
    propsTracker.markAllEvaluated();
  }
  if (!hasProps && !hasPatternProps && !hasAdditionalProps) return;
  const genChecks = () => {
    for (const [propName, propSchema] of nonTrivialProps) {
      const propPathExpr = pathExpr(path, propName);
      genPropertyCheck(code, data, propName, (valueVar) => {
        const valueVarName = valueVar instanceof Name ? valueVar : code.genVar("pv");
        if (!(valueVar instanceof Name)) {
          code.line(_`const ${valueVarName} = ${valueVar};`);
        }
        propsTracker.withScope(() => {
          ctx.validateSubschema(propSchema, valueVarName, propPathExpr);
        }, false);
      });
    }
    if (hasPatternProps || hasAdditionalProps) {
      const definedProps = schema2.properties ? Object.keys(schema2.properties) : [];
      const allPatterns = schema2.patternProperties ? Object.keys(schema2.patternProperties) : [];
      const patternRegexNames = [];
      for (const pattern of allPatterns) {
        const flags = determineRegexFlags(pattern);
        const regexName = new Name(ctx.genRuntimeName("patternRe"));
        ctx.addRuntimeFunction(regexName.str, new RegExp(pattern, flags));
        patternRegexNames.push(regexName);
      }
      if (nonTrivialPatternProps.length > 0 || hasAdditionalProps) {
        const keyVar = new Name("key");
        code.forIn(keyVar, data, () => {
          const keyPathExpr = pathExprDynamic(path, keyVar);
          for (let i = 0; i < nonTrivialPatternProps.length; i++) {
            const [pattern, patternSchema] = nonTrivialPatternProps[i];
            const regexIdx = allPatterns.indexOf(pattern);
            const regexName = patternRegexNames[regexIdx];
            code.if(_`${regexName}.test(${keyVar})`, () => {
              const propAccessed = indexAccess(data, keyVar);
              const propVar = code.genVar("pv");
              code.line(_`const ${propVar} = ${propAccessed};`);
              propsTracker.withScope(() => {
                ctx.validateSubschema(patternSchema, propVar, keyPathExpr);
              }, false);
            });
          }
          if (hasAdditionalProps) {
            const addPropsSchema = schema2.additionalProperties;
            const conditions = [];
            if (definedProps.length > 0 && definedProps.length <= 3) {
              const propChecks = definedProps.map((p) => _`${keyVar} !== ${p}`);
              conditions.push(_`(${and(...propChecks)})`);
            } else if (definedProps.length > 3) {
              const propsSetName = new Name(ctx.genRuntimeName("propsSet"));
              ctx.addRuntimeFunction(propsSetName.str, new Set(definedProps));
              conditions.push(_`!${propsSetName}.has(${keyVar})`);
            }
            for (const regexName of patternRegexNames) {
              conditions.push(_`!${regexName}.test(${keyVar})`);
            }
            if (conditions.length > 0) {
              code.if(and(...conditions), () => {
                generateAdditionalPropsCheck(
                  addPropsSchema,
                  indexAccess(data, keyVar),
                  keyPathExpr,
                  ctx
                );
              });
            } else {
              generateAdditionalPropsCheck(
                addPropsSchema,
                indexAccess(data, keyVar),
                keyPathExpr,
                ctx
              );
            }
          }
        });
      }
    }
  };
  if (hasTypeConstraint(schema2, "object")) {
    genChecks();
  } else {
    code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, genChecks);
  }
}

// src/core/keywords/object/unevaluated-properties.ts
function generateUnevaluatedPropertiesCheck(ctx) {
  const { schema: schema2, code, data, path } = ctx;
  if (schema2.unevaluatedProperties === void 0) return;
  const propsTracker = ctx.tracker.props;
  if (propsTracker.allEvaluated) return;
  const unevalSchema = schema2.unevaluatedProperties;
  if (unevalSchema === true && propsTracker.active) {
    propsTracker.getDynamicVar();
  }
  const genCheck = () => {
    const keyVar = new Name("key");
    code.forIn(keyVar, data, () => {
      const keyPathExpr = pathExprDynamic(path, keyVar);
      const patterns = propsTracker.getPatterns();
      const patternRegexVars = [];
      for (const pattern of patterns) {
        const flags = determineRegexFlags(pattern);
        const regexName = new Name(ctx.genRuntimeName("unevalPatternRe"));
        ctx.addRuntimeFunction(regexName.str, new RegExp(pattern, flags));
        patternRegexVars.push(regexName);
      }
      const isUnevaluatedExpr = propsTracker.isUnevaluated(keyVar, patternRegexVars, ctx);
      code.if(isUnevaluatedExpr, () => {
        if (unevalSchema === false) {
          ctx.withPath(keyPathExpr, () => {
            ctx.genError("unevaluatedProperties", "must NOT have unevaluated properties", {});
          });
        } else if (unevalSchema === true) {
          propsTracker.markPropertyEvaluated(keyVar);
        } else {
          const propValue = indexAccess(data, keyVar);
          const propVar = code.genVar("unevalProp");
          code.line(_`const ${propVar} = ${propValue};`);
          ctx.validateSubschema(unevalSchema, propVar, keyPathExpr);
        }
      });
    });
  };
  if (hasTypeConstraint(schema2, "object")) {
    genCheck();
  } else {
    code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, genCheck);
  }
}

// src/core/keywords/object/dependent-required.ts
function generateDependentRequiredCheck(ctx) {
  const { schema: schema2, code, data, path } = ctx;
  if (!schema2.dependentRequired) return;
  if (!supportsFeature(ctx.options.defaultMeta, "unevaluated")) {
    return;
  }
  const deps = Object.entries(schema2.dependentRequired).filter(([, reqs]) => reqs.length > 0);
  if (deps.length === 0) return;
  const needsObjectGuard = !hasTypeConstraint(schema2, "object");
  const genDependentChecks = () => {
    for (const [prop, requiredProps] of deps) {
      code.if(_`${stringify(prop)} in ${data}`, () => {
        if (requiredProps.length === 1) {
          const reqProp = requiredProps[0];
          const reqPathExpr = pathExpr(path, reqProp);
          code.if(_`!(${stringify(reqProp)} in ${data})`, () => {
            ctx.withPath(reqPathExpr, () => {
              ctx.genError(
                "dependentRequired",
                `must have property '${reqProp}' when property '${prop}' is present`,
                { missingProperty: reqProp }
              );
            });
          });
        } else {
          const missingVar = code.genVar("missing");
          code.line(_`let ${missingVar};`);
          const conditions = [];
          for (const reqProp of requiredProps) {
            conditions.push(
              _`(!(${stringify(reqProp)} in ${data}) && (${missingVar} = ${stringify(reqProp)}))`
            );
          }
          let combinedCondition = conditions[0];
          for (let i = 1; i < conditions.length; i++) {
            combinedCondition = _`${combinedCondition} || ${conditions[i]}`;
          }
          code.if(combinedCondition, () => {
            const propPathExpr = pathExprDynamic(path, missingVar);
            const escapedProp = Code.raw(escapeString(prop));
            code.line(
              _`${ctx.getMainFuncName()}.errors = [{ instancePath: ${propPathExpr}, schemaPath: '#/dependentRequired', keyword: 'dependentRequired', params: { missingProperty: ${missingVar} }, message: "must have property '" + ${missingVar} + "' when property '${escapedProp}' is present" }];`
            );
            code.line(_`return false;`);
          });
        }
      });
    }
  };
  if (needsObjectGuard) {
    code.if(
      _`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`,
      genDependentChecks
    );
  } else {
    genDependentChecks();
  }
}

// src/core/keywords/object/dependent-schemas.ts
function generateDependentSchemasCheck(ctx) {
  const { schema: schema2, code, data, path, tracker } = ctx;
  if (!schema2.dependentSchemas) return;
  if (!supportsFeature(ctx.options.defaultMeta, "unevaluated")) {
    return;
  }
  tracker.ensureDynamicVars();
  code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, () => {
    for (const [prop, depSchema] of Object.entries(schema2.dependentSchemas)) {
      const branch = tracker.enterBranch();
      const triggerExists = code.genVar("depTrigger");
      code.line(_`const ${triggerExists} = ${stringify(prop)} in ${data};`);
      code.if(triggerExists, () => {
        ctx.validateSubschema(depSchema, data, path);
      });
      tracker.exitBranch(branch);
      tracker.mergeBranch(branch, triggerExists);
    }
  });
}

// src/core/keywords/object/dependencies.ts
function generateDependenciesCheck(ctx) {
  const { schema: schema2, code, data, path } = ctx;
  if (!schema2.dependencies) return;
  let hasNonTrivial = false;
  for (const prop in schema2.dependencies) {
    const dep = schema2.dependencies[prop];
    if (Array.isArray(dep) ? dep.length > 0 : dep !== true && !(typeof dep === "object" && dep !== null && Object.keys(dep).length === 0)) {
      hasNonTrivial = true;
      break;
    }
  }
  if (!hasNonTrivial) return;
  code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, () => {
    for (const prop in schema2.dependencies) {
      const dep = schema2.dependencies[prop];
      if (Array.isArray(dep)) {
        if (dep.length === 0) continue;
      } else if (dep === true || typeof dep === "object" && dep !== null && Object.keys(dep).length === 0) {
        continue;
      }
      code.if(_`${prop} in ${data}`, () => {
        if (Array.isArray(dep)) {
          for (const reqProp of dep) {
            const reqPathExpr = pathExpr(path, reqProp);
            code.if(_`!(${reqProp} in ${data})`, () => {
              ctx.withPath(reqPathExpr, () => {
                ctx.genError(
                  "dependencies",
                  `must have property '${reqProp}' when property '${prop}' is present`,
                  { missingProperty: reqProp }
                );
              });
            });
          }
        } else {
          ctx.validateSubschema(dep, data, path);
        }
      });
    }
  });
}

// src/core/keywords/object/property-names.ts
function generatePropertyNamesCheck(ctx) {
  const { schema: schema2, code, data, path } = ctx;
  if (schema2.propertyNames === void 0) return;
  const propNamesSchema = schema2.propertyNames;
  if (propNamesSchema === true) {
    return;
  }
  if (propNamesSchema === false) {
    code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, () => {
      code.if(_`Object.keys(${data}).length > 0`, () => {
        ctx.genError("propertyNames", "property name must be valid", {});
      });
    });
    return;
  }
  code.if(_`${data} && typeof ${data} === 'object' && !Array.isArray(${data})`, () => {
    const keyVar = new Name("key");
    code.forIn(keyVar, data, () => {
      const keyPathExpr = pathExprDynamic(path, keyVar);
      ctx.validateSubschema(propNamesSchema, keyVar, keyPathExpr);
    });
  });
}

// src/core/keywords/composition/all-of.ts
function generateAllOfCheck(ctx) {
  const { schema: schema2 } = ctx;
  if (!schema2.allOf || schema2.allOf.length === 0) return;
  const nonNoOpSchemas = schema2.allOf.filter((s) => !isNoOpSchema(s));
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

// src/core/keywords/composition/any-of.ts
function generateAnyOfCheck(ctx) {
  const { schema: schema2, code, data } = ctx;
  if (!schema2.anyOf || schema2.anyOf.length === 0) return;
  const hasNoOpBranch = schema2.anyOf.some((s) => isNoOpSchema(s));
  const propsTracker = ctx.tracker.props;
  const itemsTracker = ctx.tracker.items;
  const tracker = ctx.tracker;
  const needsTracking = (propsTracker.active || itemsTracker.active) && schema2.anyOf.some((s) => !isNoOpSchema(s) && typeof s === "object" && s !== null);
  if (hasNoOpBranch && !needsTracking) {
    propsTracker.enableDynamic();
  } else if (hasNoOpBranch && needsTracking) {
    propsTracker.enableDynamic();
    itemsTracker.enableDynamic();
    tracker.ensureDynamicVars();
    schema2.anyOf.forEach((subSchema) => {
      if (isNoOpSchema(subSchema)) return;
      const branch = tracker.enterBranch(subSchema);
      const checkExpr = generateSubschemaCheck(
        code,
        subSchema,
        data,
        ctx,
        ctx.getDynamicScopeVar()
      );
      tracker.exitBranch(branch);
      const matchedVar = code.genVar("matched");
      code.line(_`const ${matchedVar} = ${checkExpr};`);
      tracker.mergeBranch(branch, matchedVar);
    });
  } else {
    const resultVar = code.genVar("anyOfResult");
    code.line(_`let ${resultVar} = false;`);
    tracker.ensureDynamicVars();
    schema2.anyOf.forEach((subSchema, index) => {
      const generateBranchCheck = () => {
        const branch = tracker.enterBranch(subSchema);
        const checkExpr = generateSubschemaCheck(
          code,
          subSchema,
          data,
          ctx,
          ctx.getDynamicScopeVar()
        );
        tracker.exitBranch(branch);
        const matchedVar = code.genVar("matched");
        code.line(_`const ${matchedVar} = ${checkExpr};`);
        code.if(matchedVar, () => {
          code.line(_`${resultVar} = true;`);
        });
        tracker.mergeBranch(branch, matchedVar);
      };
      if (index > 0 && !tracker.active) {
        code.if(_`!${resultVar}`, generateBranchCheck);
      } else {
        generateBranchCheck();
      }
    });
    code.if(_`!${resultVar}`, () => {
      ctx.genError("anyOf", "must match a schema in anyOf", {});
    });
  }
}

// src/core/keywords/composition/one-of.ts
function generateOneOfCheck(ctx) {
  const { schema: schema2, code, data } = ctx;
  if (!schema2.oneOf || schema2.oneOf.length === 0) return;
  const oneOfTracker = ctx.tracker;
  const countVar = code.genVar("oneOfCount");
  code.line(_`let ${countVar} = 0;`);
  oneOfTracker.ensureDynamicVars();
  schema2.oneOf.forEach((subSchema) => {
    const branch = oneOfTracker.enterBranch(subSchema);
    const checkExpr = generateSubschemaCheck(code, subSchema, data, ctx, ctx.getDynamicScopeVar());
    oneOfTracker.exitBranch(branch);
    const matchedVar = code.genVar("oneOfMatched");
    code.line(_`const ${matchedVar} = ${checkExpr};`);
    code.if(matchedVar, () => {
      code.line(_`${countVar}++;`);
      code.if(_`${countVar} > 1`, () => {
        ctx.genError("oneOf", "must match exactly one schema in oneOf", {});
      });
    });
    oneOfTracker.mergeBranch(branch, matchedVar);
  });
  code.if(_`${countVar} !== 1`, () => {
    ctx.genError("oneOf", "must match exactly one schema in oneOf", {});
  });
}

// src/core/keywords/composition/not.ts
function tryInlineNotCheck(notSchema, dataVar) {
  if (typeof notSchema !== "object" || notSchema === null) {
    return void 0;
  }
  const keywords = Object.keys(notSchema).filter(
    (k) => k !== "$schema" && k !== "$comment" && k !== "title" && k !== "description"
  );
  if (keywords.length !== 1) {
    return void 0;
  }
  const keyword = keywords[0];
  if (keyword === "type") {
    const typeValue = notSchema.type;
    if (typeof typeValue === "string") {
      const typeCheck = generateTypeCheckInline(dataVar, typeValue);
      if (typeCheck) {
        return typeCheck;
      }
    } else if (Array.isArray(typeValue) && typeValue.length > 0 && typeValue.length <= 3) {
      const typeChecks = [];
      for (const t of typeValue) {
        if (typeof t === "string") {
          const check = generateTypeCheckInline(dataVar, t);
          if (check) {
            typeChecks.push(check);
          } else {
            return void 0;
          }
        } else {
          return void 0;
        }
      }
      if (typeChecks.length === typeValue.length) {
        return or(...typeChecks);
      }
    }
  }
  if (keyword === "const") {
    return _`${dataVar} === ${stringify(notSchema.const)}`;
  }
  if (keyword === "enum" && Array.isArray(notSchema.enum) && notSchema.enum.length <= 5) {
    const allPrimitives = notSchema.enum.every((val) => val === null || typeof val !== "object");
    if (allPrimitives) {
      const checks = notSchema.enum.map((val) => _`${dataVar} === ${stringify(val)}`);
      return or(...checks);
    }
  }
  return void 0;
}
function generateTypeCheckInline(valueVar, type) {
  if (typeof type === "string") {
    switch (type) {
      case "null":
        return _`${valueVar} === null`;
      case "boolean":
        return _`typeof ${valueVar} === 'boolean'`;
      case "object":
        return _`${valueVar} && typeof ${valueVar} === 'object' && !Array.isArray(${valueVar})`;
      case "array":
        return _`Array.isArray(${valueVar})`;
      case "number":
        return _`typeof ${valueVar} === 'number'`;
      case "string":
        return _`typeof ${valueVar} === 'string'`;
      case "integer":
        return _`Number.isInteger(${valueVar})`;
      default:
        return void 0;
    }
  }
  return void 0;
}
function generateNotCheck(ctx) {
  const { schema: schema2, code, data } = ctx;
  if (schema2.not === void 0) return;
  const notSchema = schema2.not;
  const notTracker = ctx.tracker;
  if (isNoOpSchema(notSchema)) {
    ctx.genError("not", "must NOT be valid", {});
  } else if (notSchema === false) {
  } else if (typeof notSchema === "object" && notSchema !== null && notSchema.not !== void 0 && Object.keys(notSchema).length === 1) {
    const innerNotSchema = notSchema.not;
    if (isNoOpSchema(innerNotSchema)) {
    } else if (innerNotSchema === false) {
      ctx.genError("not", "must NOT be valid", {});
    } else {
      const checkExpr = notTracker.withDiscardedScope(
        () => generateSubschemaCheck(code, innerNotSchema, data, ctx, ctx.getDynamicScopeVar())
      );
      code.if(_`!(${checkExpr})`, () => {
        ctx.genError("not", "must NOT be valid", {});
      });
    }
  } else {
    const inlinedCheck = tryInlineNotCheck(notSchema, data);
    if (inlinedCheck) {
      code.if(inlinedCheck, () => {
        ctx.genError("not", "must NOT be valid", {});
      });
    } else {
      const checkExpr = notTracker.withDiscardedScope(
        () => generateSubschemaCheck(code, notSchema, data, ctx, ctx.getDynamicScopeVar())
      );
      code.if(checkExpr, () => {
        ctx.genError("not", "must NOT be valid", {});
      });
    }
  }
}

// src/core/keywords/composition/if-then-else.ts
function tryInlineIfCondition(code, ifSchema, dataVar) {
  if (isNoOpSchema(ifSchema)) {
    const condVar2 = code.genVar("ifCond");
    code.line(_`const ${condVar2} = true;`);
    return { conditionVar: condVar2, evaluatedProps: [] };
  }
  if (ifSchema === false) {
    const condVar2 = code.genVar("ifCond");
    code.line(_`const ${condVar2} = false;`);
    return { conditionVar: condVar2, evaluatedProps: [] };
  }
  if (typeof ifSchema !== "object" || ifSchema === null) return void 0;
  if (ifSchema.$ref || ifSchema.$dynamicRef || ifSchema.allOf || ifSchema.anyOf || ifSchema.oneOf || ifSchema.not || ifSchema.if) {
    return void 0;
  }
  const hasProperties = ifSchema.properties !== void 0;
  const hasRequired = ifSchema.required !== void 0 && Array.isArray(ifSchema.required);
  const hasPatternProperties = ifSchema.patternProperties !== void 0;
  const hasAdditionalProperties = ifSchema.additionalProperties !== void 0;
  const hasDependencies = ifSchema.dependencies !== void 0 || ifSchema.dependentSchemas !== void 0;
  const canInline = (hasProperties || hasRequired) && !hasPatternProperties && !hasAdditionalProperties && !hasDependencies && !ifSchema.prefixItems && !ifSchema.items && !ifSchema.contains && !ifSchema.propertyNames && !ifSchema.minProperties && !ifSchema.maxProperties;
  if (!canInline) return void 0;
  const condVar = code.genVar("ifCond");
  const tempResultVar = code.genVar("ifResult");
  const evaluatedProps = [];
  code.line(_`let ${tempResultVar} = true;`);
  code.if(_`${dataVar} && typeof ${dataVar} === 'object' && !Array.isArray(${dataVar})`, () => {
    if (hasRequired && ifSchema.required && ifSchema.required.length > 0) {
      for (const propName of ifSchema.required) {
        if (typeof propName === "string") {
          code.if(_`${tempResultVar} && !(${propName} in ${dataVar})`, () => {
            code.line(_`${tempResultVar} = false;`);
          });
        }
      }
    }
    if (hasProperties && ifSchema.properties) {
      for (const [propName, propSchema] of Object.entries(ifSchema.properties)) {
        if (typeof propName !== "string") continue;
        const propVar = code.genVar("prop");
        code.line(_`const ${propVar} = ${dataVar}[${propName}];`);
        code.if(_`${tempResultVar} && ${propVar} !== undefined`, () => {
          const inlineValidation = tryInlinePropertyValidation(
            code,
            propSchema,
            propVar,
            tempResultVar
          );
          if (!inlineValidation) {
            code.line(_`${tempResultVar} = false;`);
          }
        });
        evaluatedProps.push(propName);
        if (Object.keys(ifSchema.properties).length > 1) {
          code.if(_`!${tempResultVar}`, () => {
            code.line(_`${tempResultVar} = false;`);
          });
        }
      }
    }
  });
  code.else(() => {
    code.line(_`${tempResultVar} = false;`);
  });
  code.line(_`const ${condVar} = ${tempResultVar};`);
  return { conditionVar: condVar, evaluatedProps };
}
function tryInlinePropertyValidation(code, propSchema, propVar, resultVar) {
  if (isNoOpSchema(propSchema)) {
    return true;
  }
  if (propSchema === false) {
    code.line(_`${resultVar} = false;`);
    return true;
  }
  if (typeof propSchema !== "object" || propSchema === null) return false;
  if (propSchema.$ref || propSchema.$dynamicRef || propSchema.allOf || propSchema.anyOf || propSchema.oneOf || propSchema.not || propSchema.if || propSchema.properties || propSchema.patternProperties || propSchema.additionalProperties || propSchema.unevaluatedProperties || propSchema.unevaluatedItems) {
    return false;
  }
  if (propSchema.type !== void 0) {
    const typeCheck = generateTypeCheckInline2(propVar, propSchema.type);
    if (!typeCheck) return false;
    code.if(_`!(${typeCheck})`, () => {
      code.line(_`${resultVar} = false;`);
    });
  }
  if (propSchema.const !== void 0) {
    code.if(_`${propVar} !== ${stringify(propSchema.const)}`, () => {
      code.line(_`${resultVar} = false;`);
    });
  }
  if (propSchema.enum !== void 0 && Array.isArray(propSchema.enum)) {
    code.if(_`!${stringify(propSchema.enum)}.includes(${propVar})`, () => {
      code.line(_`${resultVar} = false;`);
    });
  }
  return true;
}
function generateTypeCheckInline2(valueVar, type) {
  if (typeof type === "string") {
    switch (type) {
      case "null":
        return _`${valueVar} === null`;
      case "boolean":
        return _`typeof ${valueVar} === 'boolean'`;
      case "object":
        return _`${valueVar} && typeof ${valueVar} === 'object' && !Array.isArray(${valueVar})`;
      case "array":
        return _`Array.isArray(${valueVar})`;
      case "number":
        return _`typeof ${valueVar} === 'number'`;
      case "string":
        return _`typeof ${valueVar} === 'string'`;
      case "integer":
        return _`Number.isInteger(${valueVar})`;
      default:
        return void 0;
    }
  }
  return void 0;
}
function generateIfThenElseCheck(ctx) {
  const { schema: schema2, code, data, path } = ctx;
  if (schema2.if === void 0) return;
  const ifSchema = schema2.if;
  const thenSchema = schema2.then;
  const elseSchema = schema2.else;
  const propsTracker = ctx.tracker.props;
  const itemsTracker = ctx.tracker.items;
  const ifTracker = ctx.tracker;
  if (thenSchema === void 0 && elseSchema === void 0 && !ifTracker.active) {
    return;
  }
  const inlinedCheck = tryInlineIfCondition(code, ifSchema, data);
  if (inlinedCheck) {
    const condVar = inlinedCheck.conditionVar;
    if (propsTracker.active && (inlinedCheck.evaluatedProps.length > 0 || thenSchema || elseSchema)) {
      propsTracker.getDynamicVar();
    }
    if (itemsTracker.active && (thenSchema || elseSchema)) {
      itemsTracker.getDynamicVar();
    }
    code.if(condVar, () => {
      propsTracker.emitAddProperties(inlinedCheck.evaluatedProps);
      if (thenSchema !== void 0) {
        if (thenSchema === false) {
          ctx.genError("if", 'must match "then" schema', {});
        } else if (thenSchema !== true) {
          const branch = ifTracker.enterBranch();
          ctx.validateSubschema(thenSchema, data, path);
          ifTracker.exitAndMergeBranch(branch, new Name("true"));
        }
      }
    });
    if (elseSchema !== void 0) {
      code.if(_`!${condVar}`, () => {
        if (elseSchema === false) {
          ctx.genError("if", 'must match "else" schema', {});
        } else if (elseSchema !== true) {
          const branch = ifTracker.enterBranch();
          ctx.validateSubschema(elseSchema, data, path);
          ifTracker.exitAndMergeBranch(branch, new Name("true"));
        }
      });
    }
  } else {
    const condVar = code.genVar("ifCond");
    ifTracker.ensureDynamicVars();
    const ifBranch = ifTracker.enterBranch();
    const checkExpr = generateSubschemaCheck(code, ifSchema, data, ctx, ctx.getDynamicScopeVar());
    ifTracker.exitBranch(ifBranch);
    code.line(_`const ${condVar} = ${checkExpr};`);
    code.if(condVar, () => {
      ifTracker.mergeBranch(ifBranch, new Name("true"));
      if (thenSchema !== void 0) {
        if (thenSchema === false) {
          ctx.genError("if", 'must match "then" schema', {});
        } else if (thenSchema !== true) {
          const thenBranch = ifTracker.enterBranch();
          ctx.validateSubschema(thenSchema, data, path);
          ifTracker.exitAndMergeBranch(thenBranch, new Name("true"));
        }
      }
    });
    if (elseSchema !== void 0) {
      code.if(_`!${condVar}`, () => {
        if (elseSchema === false) {
          ctx.genError("if", 'must match "else" schema', {});
        } else if (elseSchema !== true) {
          const elseBranch = ifTracker.enterBranch();
          ctx.validateSubschema(elseSchema, data, path);
          ifTracker.exitAndMergeBranch(elseBranch, new Name("true"));
        }
      });
    }
  }
}

// src/core/schema-utils.ts
function extractStaticProperties(schema2, visited = /* @__PURE__ */ new Set()) {
  const props = /* @__PURE__ */ new Set();
  if (typeof schema2 !== "object" || schema2 === null) return props;
  if (visited.has(schema2)) return props;
  visited.add(schema2);
  const s = schema2;
  if (s.properties && typeof s.properties === "object") {
    for (const key of Object.keys(s.properties)) {
      props.add(key);
    }
  }
  if (Array.isArray(s.allOf)) {
    for (const sub of s.allOf) {
      for (const p of extractStaticProperties(sub, visited)) {
        props.add(p);
      }
    }
  }
  return props;
}

// src/core/keywords/ref/compile-fn.ts
var compileFn;
function setCompileFn(fn) {
  compileFn = fn;
}
function getCompileFn() {
  return compileFn;
}

// src/core/keywords/ref/ref.ts
function shouldInlineRef(refSchema, ctx, _dynamicScopeVar2) {
  if (typeof refSchema !== "object" || refSchema === null) return false;
  if (refSchema.$id) return false;
  if (refSchema.$ref) return false;
  if (refSchema.$dynamicRef || refSchema.$dynamicAnchor) return false;
  if (refSchema.allOf || refSchema.anyOf || refSchema.oneOf || refSchema.not) return false;
  if (refSchema.if || refSchema.then || refSchema.else) return false;
  if (refSchema.unevaluatedProperties !== void 0 || refSchema.unevaluatedItems !== void 0)
    return false;
  if (ctx.isCompiled(refSchema)) return false;
  if (refSchema.$defs || refSchema.definitions) return false;
  if (refSchema.patternProperties || refSchema.dependentSchemas || refSchema.dependencies)
    return false;
  const isComplexSchema = (s) => {
    if (typeof s !== "object" || s === null || Array.isArray(s)) return false;
    return !!(s.properties || s.patternProperties || s.prefixItems || s.items || s.contains || s.allOf || s.anyOf || s.oneOf || s.not || s.if);
  };
  if (refSchema.properties && typeof refSchema.properties === "object" && !Array.isArray(refSchema.properties)) {
    const propCount = Object.keys(refSchema.properties).length;
    if (propCount > 5) return false;
    for (const propSchema of Object.values(refSchema.properties)) {
      if (isComplexSchema(propSchema)) {
        return false;
      }
    }
  }
  if (refSchema.items) {
    if (Array.isArray(refSchema.items)) return false;
    const itemsSchema = refSchema.items;
    if (isComplexSchema(itemsSchema)) {
      return false;
    }
  }
  if (refSchema.prefixItems || refSchema.contains) return false;
  const keywords = Object.keys(refSchema).filter(
    (k) => k !== "$schema" && k !== "$comment" && k !== "title" && k !== "description" && k !== "$anchor"
  );
  return keywords.length <= 8;
}
function generateRefCheck(ctx) {
  const { schema: schema2, code, data, path } = ctx;
  if (!schema2.$ref) return;
  const dynamicScopeVar = ctx.getDynamicScopeVar();
  const isRemoteRef = /^https?:\/\//.test(schema2.$ref);
  let refSchema = ctx.resolveRef(schema2.$ref, schema2);
  if (!ctx.hasAnyDynamicAnchors() && !ctx.hasAnyRecursiveAnchors() && refSchema) {
    let depth = 0;
    const maxDepth = 100;
    const visited = /* @__PURE__ */ new Set();
    while (typeof refSchema === "object" && refSchema !== null && refSchema.$ref && Object.keys(refSchema).length === 1 && // Only $ref, nothing else
    depth < maxDepth && !visited.has(refSchema)) {
      visited.add(refSchema);
      const nextSchema = ctx.resolveRef(refSchema.$ref, refSchema);
      if (!nextSchema) break;
      refSchema = nextSchema;
      depth++;
    }
  }
  if (!refSchema) {
    ctx.genError("$ref", `can't resolve reference ${schema2.$ref}`, { $ref: schema2.$ref });
    return;
  }
  if (refSchema === true || typeof refSchema === "object" && Object.keys(refSchema).length === 0) {
    return;
  }
  const crossDraftSchema = ctx.getCrossDraftSchema(refSchema);
  const compileFn2 = getCompileFn();
  if (crossDraftSchema && compileFn2) {
    const crossDraftName = new Name(ctx.genRuntimeName("crossDraftValidator"));
    const crossDraftOptions = {
      ...ctx.options,
      defaultMeta: crossDraftSchema,
      legacyRef: supportsFeature(crossDraftSchema, "legacyRef"),
      formatAssertion: ctx.options.formatAssertion ?? supportsFeature(crossDraftSchema, "formatAssertion")
    };
    const crossDraftValidator = compileFn2(refSchema, crossDraftOptions);
    const wrapperFn = (data2, path2) => {
      const result = crossDraftValidator(data2);
      if (!result && crossDraftValidator.errors) {
        const errors = crossDraftValidator.errors;
        crossDraftValidator.errors = errors.map((err) => ({
          ...err,
          instancePath: path2 + err.instancePath
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
  const refHasId = typeof refSchema === "object" && refSchema !== null && refSchema.$id;
  const isCyclicRef = ctx.isCompiled(refSchema);
  const forceInlineForTracking = (propsTracker.active || itemsTracker.active) && !refHasId && !isCyclicRef;
  if (!isRemoteRef && (shouldInlineRef(refSchema, ctx, dynamicScopeVar) || forceInlineForTracking)) {
    ctx.tracker.withConditionalScope(refSchema, () => {
      ctx.validateSubschema(refSchema, data, path);
    });
    return;
  }
  const funcName = ctx.getCompiledName(refSchema) ?? ctx.queueCompile(refSchema);
  const refStaticProps = propsTracker.active && !hasRestrictiveUnevaluatedProperties(refSchema) ? extractStaticProperties(refSchema) : /* @__PURE__ */ new Set();
  const hasRecursiveAnchor = typeof refSchema === "object" && refSchema !== null && refSchema.$recursiveAnchor === true;
  if (hasRecursiveAnchor && (propsTracker.active || itemsTracker.active)) {
    for (const dynSchema of ctx.getAllRecursiveAnchorSchemas()) {
      if (typeof dynSchema === "object" && dynSchema !== null) {
        if (propsTracker.active && dynSchema.properties) {
          propsTracker.addProperties(Object.keys(dynSchema.properties));
        }
        if (itemsTracker.active && Array.isArray(dynSchema.items)) {
          itemsTracker.addPrefixItems(dynSchema.items.length);
        }
      }
    }
  }
  const isRecursiveRef = schema2.$ref === "#" && hasRecursiveAnchor;
  if (isRecursiveRef && dynamicScopeVar) {
    const pathArg2 = path.toString() === "''" ? _`''` : _`errors ? ${path} : ''`;
    const allRecursiveAnchors = ctx.getAllRecursiveAnchorSchemas();
    if (allRecursiveAnchors.length === 1) {
      code.if(_`!${funcName}(${data}, errors, ${pathArg2}, ${dynamicScopeVar})`, () => {
        genSubschemaExit(code, ctx);
      });
    } else {
      const validatorVar = new Name("validator");
      code.line(
        _`const ${validatorVar} = ${dynamicScopeVar}.get('__recursive_current__') || ${funcName};`
      );
      code.if(_`!${validatorVar}(${data}, errors, ${pathArg2}, ${dynamicScopeVar})`, () => {
        genSubschemaExit(code, ctx);
      });
    }
    return;
  }
  if (!dynamicScopeVar) {
    const pathArg2 = path.toString() === "''" ? _`''` : _`errors ? ${path} : ''`;
    code.if(_`!${funcName}(${data}, errors, ${pathArg2})`, () => {
      genSubschemaExit(code, ctx);
    });
    if (refStaticProps.size > 0) {
      propsTracker.addProperties([...refStaticProps]);
    }
    return;
  }
  let refResourceId = ctx.getRefResourceId(schema2.$ref, schema2);
  if (typeof refSchema === "object" && refSchema !== null && typeof refSchema.$id === "string") {
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
      const pathArg2 = path.toString() === "''" ? _`''` : _`errors ? ${path} : ''`;
      code.block(_``, () => {
        const savedVars = /* @__PURE__ */ new Map();
        for (const { anchor, schema: anchorSchema } of resourceAnchors) {
          const anchorFuncName = ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
          const savedVar = new Name("saved");
          savedVars.set(anchor, savedVar);
          code.line(_`const ${savedVar} = ${dynamicScopeVar}.get(${stringify(anchor)});`);
          code.line(
            _`if (${savedVar} === undefined) ${dynamicScopeVar}.set(${stringify(anchor)}, ${anchorFuncName});`
          );
        }
        code.if(_`!${funcName}(${data}, errors, ${pathArg2}, ${dynamicScopeVar})`, () => {
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
  const pathArg = path.toString() === "''" ? _`''` : _`errors ? ${path} : ''`;
  code.if(_`!${funcName}(${data}, errors, ${pathArg}, ${dynamicScopeVar})`, () => {
    genSubschemaExit(code, ctx);
  });
  if (refStaticProps.size > 0) {
    propsTracker.addProperties([...refStaticProps]);
  }
}

// src/core/keywords/ref/dynamic-ref.ts
function generateDynamicRefCheck(ctx) {
  const { schema: schema2, code, data, path } = ctx;
  if (!schema2.$dynamicRef) return;
  const dynamicScopeVar = ctx.getDynamicScopeVar();
  const ref = schema2.$dynamicRef;
  const anchorMatch = ref.match(/#([a-zA-Z][a-zA-Z0-9_-]*)$/);
  if (anchorMatch) {
    const anchorName = anchorMatch[1];
    const staticSchema = ctx.resolveRef(ref, schema2);
    if (!staticSchema) {
      ctx.genError("$dynamicRef", `can't resolve reference ${ref}`, { $ref: ref });
      return;
    }
    const staticFuncName = ctx.queueCompile(staticSchema);
    const hasDynamicAnchor = typeof staticSchema === "object" && staticSchema !== null && staticSchema.$dynamicAnchor === anchorName;
    const propsTracker = ctx.tracker.props;
    if (propsTracker.active) {
      for (const dynSchema of ctx.getDynamicAnchors(anchorName)) {
        if (typeof dynSchema === "object" && dynSchema !== null && dynSchema.properties) {
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
    const refSchema = ctx.resolveRef(ref, schema2);
    if (!refSchema) {
      ctx.genError("$dynamicRef", `can't resolve reference ${ref}`, { $ref: ref });
      return;
    }
    const funcName = ctx.queueCompile(refSchema);
    const scopeArg = dynamicScopeVar || _`[]`;
    code.if(_`!${funcName}(${data}, errors, ${path}, ${scopeArg})`, () => {
      genSubschemaExit(code, ctx);
    });
  }
}

// src/core/keywords/ref/recursive-ref.ts
function generateRecursiveRefCheck(ctx) {
  const { schema: schema2, code, data, path } = ctx;
  if (!schema2.$recursiveRef) return;
  const dynamicScopeVar = ctx.getDynamicScopeVar();
  const ref = schema2.$recursiveRef;
  if (ref !== "#") {
    ctx.genError("$recursiveRef", `$recursiveRef must be "#" (got "${ref}")`, { $ref: ref });
    return;
  }
  const staticSchema = ctx.resolveRef(ref, schema2);
  if (!staticSchema) {
    ctx.genError("$recursiveRef", `can't resolve reference ${ref}`, { $ref: ref });
    return;
  }
  const staticFuncName = ctx.queueCompile(staticSchema);
  const hasRecursiveAnchor = ctx.hasRecursiveAnchor(staticSchema);
  if (hasRecursiveAnchor) {
    const propsTracker = ctx.tracker.props;
    const itemsTracker = ctx.tracker.items;
    for (const dynSchema of ctx.getAllRecursiveAnchorSchemas()) {
      if (typeof dynSchema === "object" && dynSchema !== null) {
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
      const validatorVar = new Name("validator");
      code.line(
        _`const ${validatorVar} = ${dynamicScopeVar}.get('__recursive__') || ${staticFuncName};`
      );
      code.if(_`!${validatorVar}(${data}, errors, ${path}, ${dynamicScopeVar})`, () => {
        genSubschemaExit(code, ctx);
      });
    }
  }
}

// src/core/keywords/format/format-check.ts
var KNOWN_FORMATS = /* @__PURE__ */ new Set([
  "email",
  "uuid",
  "date-time",
  "uri",
  "ipv4",
  "ipv6",
  "date",
  "time",
  "duration",
  "hostname",
  "uri-reference",
  "json-pointer",
  "relative-json-pointer",
  "regex"
]);
var sharedFormatValidators = createFormatValidators(false);
function generateFormatCheck(ctx) {
  const { schema: schema2, code, data } = ctx;
  if (schema2.format === void 0) return;
  let enableFormatAssertion;
  if (ctx.hasCustomVocabulary()) {
    enableFormatAssertion = ctx.isVocabularyEnabled(VOCABULARIES.format_assertion);
  } else {
    enableFormatAssertion = ctx.options.formatAssertion;
  }
  if (!enableFormatAssertion) return;
  const format = schema2.format;
  const hasStringType = schema2.type === "string";
  const isKnownFormat = KNOWN_FORMATS.has(format);
  const validators = sharedFormatValidators;
  let formatCheck;
  if (isKnownFormat) {
    const funcName = "fmt_" + format.replace(/-/g, "_");
    const validatorName = new Name(funcName);
    ctx.addRuntimeFunction(funcName, validators[format]);
    formatCheck = _`!${validatorName}(${data})`;
  } else {
    formatCheck = _`formatValidators[${format}] && !formatValidators[${format}](${data})`;
  }
  const genFormatCheck = () => {
    code.if(formatCheck, () => {
      ctx.genError("format", `must match format "${format}"`, { format });
    });
  };
  if (hasStringType) {
    genFormatCheck();
  } else {
    code.if(_`typeof ${data} === 'string'`, genFormatCheck);
  }
}

// src/core/compiler.ts
function compile(schema2, options = {}) {
  const ctx = new CompileContext(schema2, options);
  const code = new CodeBuilder();
  const needsPropsTracking = containsUnevaluatedProperties(schema2);
  ctx.initPropsTracker(code, needsPropsTracking);
  const needsItemsTracking = containsUnevaluatedItems(schema2);
  ctx.initItemsTracker(code, needsItemsTracking);
  ctx.setValidateSubschemaFn((subschema, dataVar2, pathExprCode, subCtx, dynamicScopeVar2) => {
    generateSchemaValidator(subCtx.code, subschema, dataVar2, pathExprCode, subCtx, dynamicScopeVar2);
  });
  ctx.addRuntimeFunction("deepEqual", createDeepEqual());
  ctx.addRuntimeFunction("ucs2length", createUcs2Length());
  ctx.addRuntimeFunction("formatValidators", createFormatValidators());
  const mainFuncName = ctx.genFuncName();
  ctx.registerCompiled(schema2, mainFuncName);
  const hasDynamicFeatures = !ctx.options.legacyRef && ctx.rootUsesDynamicRefs();
  const dynamicScopeVar = hasDynamicFeatures ? new Name("dynamicScope") : void 0;
  const anchorFuncNames = [];
  if (hasDynamicFeatures) {
    const rootResourceId = typeof schema2 === "object" && schema2 !== null && schema2.$id ? schema2.$id : "__root__";
    const rootDynamicAnchors = ctx.getResourceDynamicAnchors(rootResourceId);
    for (const { anchor, schema: anchorSchema } of rootDynamicAnchors) {
      const funcName = ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
      anchorFuncNames.push({ anchor, funcName });
    }
  }
  const dataVar = new Name("data");
  const pathVar = _`''`;
  generateSchemaValidator(code, schema2, dataVar, pathVar, ctx, dynamicScopeVar);
  let queued;
  while (queued = ctx.nextToCompile()) {
    const q = queued;
    const qFuncName = q.funcName;
    code.blank();
    if (hasDynamicFeatures) {
      code.block(_`function ${qFuncName}(data, errors, path, dynamicScope)`, () => {
        const qDataVar = new Name("data");
        const qPathVar = new Name("path");
        const qDynamicScope = new Name("dynamicScope");
        generateSchemaValidator(code, q.schema, qDataVar, qPathVar, ctx, qDynamicScope);
        code.line(_`return true;`);
      });
    } else {
      code.block(_`function ${qFuncName}(data, errors, path)`, () => {
        const qDataVar = new Name("data");
        const qPathVar = new Name("path");
        generateSchemaValidator(code, q.schema, qDataVar, qPathVar, ctx);
        code.line(_`return true;`);
      });
    }
  }
  const runtimeFuncs = ctx.getRuntimeFunctions();
  const runtimeNames = Array.from(runtimeFuncs.keys());
  const runtimeValues = Array.from(runtimeFuncs.values());
  let scopeInit = "";
  if (hasDynamicFeatures) {
    scopeInit = "const dynamicScope = new Map();\n";
    for (const { anchor, funcName } of anchorFuncNames) {
      scopeInit += `dynamicScope.set(${JSON.stringify(anchor)}, ${funcName});
`;
    }
  }
  const fullCode = `
${scopeInit}
${code.toString()}
${mainFuncName}.errors = null;
return true;
`;
  if (void 0) {
    console.log("Generated code:", `function ${mainFuncName}(data, errors) {
${fullCode}
}`);
  }
  const factory = new Function(
    ...runtimeNames,
    `return function ${mainFuncName}(data, errors) {
${fullCode}
}`
  );
  return factory(...runtimeValues);
}
function generateSchemaValidator(code, schema2, dataVar, pathExprCode, ctx, dynamicScopeVar) {
  const scopeVar = ctx.options.legacyRef ? void 0 : dynamicScopeVar;
  if (schema2 === true) {
    return;
  }
  if (schema2 === false) {
    genError(code, pathExprCode, "#", "false", "boolean schema is false", {}, ctx);
    return;
  }
  if (typeof schema2 === "string") {
    generateSchemaValidator(code, { type: schema2 }, dataVar, pathExprCode, ctx, dynamicScopeVar);
    return;
  }
  const propsTracker = ctx.getPropsTracker();
  const itemsTracker = ctx.getItemsTracker();
  if (!propsTracker.active && hasRestrictiveUnevaluatedProperties(schema2)) {
    propsTracker.active = true;
  }
  if (!itemsTracker.active && hasRestrictiveUnevaluatedItems(schema2)) {
    itemsTracker.activate();
  }
  if (schema2.$dynamicRef && hasRestrictiveUnevaluatedProperties(schema2)) {
    propsTracker.activate();
    propsTracker.enableDynamic();
  }
  if (schema2.$dynamicRef && hasRestrictiveUnevaluatedItems(schema2)) {
    itemsTracker.activate();
    itemsTracker.enableDynamic();
  }
  let resourceAnchors = [];
  const savedAnchorVars = /* @__PURE__ */ new Map();
  let hasRecursiveAnchor = false;
  let savedRecursiveVar;
  let savedRecursiveCurrentVar;
  let needsItemsScopeIsolation = false;
  let needsPropsScopeIsolation = false;
  if (scopeVar && schema2.$id) {
    const schemaResourceId = ctx.getBaseUri(schema2);
    resourceAnchors = schemaResourceId ? ctx.getResourceDynamicAnchors(schemaResourceId) : [];
    if (resourceAnchors.length > 0) {
      for (const { anchor, schema: anchorSchema } of resourceAnchors) {
        const anchorFuncName = ctx.getCompiledName(anchorSchema) ?? ctx.queueCompile(anchorSchema);
        const savedVar = new Name("saved");
        savedAnchorVars.set(anchor, savedVar);
        code.line(_`const ${savedVar} = ${scopeVar}.get(${stringify(anchor)});`);
        code.line(
          _`if (${savedVar} === undefined) ${scopeVar}.set(${stringify(anchor)}, ${anchorFuncName});`
        );
      }
    }
    if (schema2.$recursiveAnchor === true) {
      hasRecursiveAnchor = true;
      const recursiveFuncName = ctx.getCompiledName(schema2) ?? ctx.queueCompile(schema2);
      savedRecursiveVar = new Name("saved");
      code.line(_`const ${savedRecursiveVar} = ${scopeVar}.get('__recursive__');`);
      code.line(
        _`if (${savedRecursiveVar} === undefined) ${scopeVar}.set('__recursive__', ${recursiveFuncName});`
      );
      savedRecursiveCurrentVar = new Name("saved_current");
      code.line(_`const ${savedRecursiveCurrentVar} = ${scopeVar}.get('__recursive_current__');`);
      code.line(_`${scopeVar}.set('__recursive_current__', ${recursiveFuncName});`);
    }
    needsItemsScopeIsolation = itemsTracker.active && !hasRestrictiveUnevaluatedItems(schema2);
    needsPropsScopeIsolation = propsTracker.active && !hasRestrictiveUnevaluatedProperties(schema2);
    if (needsItemsScopeIsolation) {
      itemsTracker.pushScope();
    }
    if (needsPropsScopeIsolation) {
      propsTracker.pushScope();
    }
  }
  ctx.setDynamicScopeVar(scopeVar);
  ctx.setSchemaContext(schema2, dataVar, pathExprCode);
  if (schema2.$ref && ctx.options.legacyRef) {
    generateRefCheck(ctx);
  } else {
    generateTypeCheck(ctx);
    generateConstCheck(ctx);
    generateEnumCheck(ctx);
    generateStringChecks(ctx);
    generateFormatCheck(ctx);
    generateContentChecks(ctx);
    generateNumberChecks(ctx);
    generateItemsChecks(ctx);
    generateMinItemsCheck(ctx);
    generateMaxItemsCheck(ctx);
    generateUniqueItemsCheck(ctx);
    generateObjectChecks(ctx);
    generatePropertiesChecks(ctx);
    generateAllOfCheck(ctx);
    generateAnyOfCheck(ctx);
    generateOneOfCheck(ctx);
    generateNotCheck(ctx);
    generateIfThenElseCheck(ctx);
    generateRefCheck(ctx);
    generateDynamicRefCheck(ctx);
    generateRecursiveRefCheck(ctx);
    generateContainsCheck(ctx);
    generateDependentRequiredCheck(ctx);
    generatePropertyNamesCheck(ctx);
    generateDependentSchemasCheck(ctx);
    generateDependenciesCheck(ctx);
    generateUnevaluatedPropertiesCheck(ctx);
    generateUnevaluatedItemsCheck(ctx);
  }
  if (needsPropsScopeIsolation) {
    propsTracker.popScope(false);
  }
  if (needsItemsScopeIsolation) {
    itemsTracker.popScope(false);
  }
  if (resourceAnchors.length > 0 && scopeVar) {
    for (const { anchor } of resourceAnchors) {
      const savedVar = savedAnchorVars.get(anchor);
      if (savedVar) {
        code.line(_`if (${savedVar} === undefined) ${scopeVar}.delete(${stringify(anchor)});`);
      }
    }
  }
  if (hasRecursiveAnchor && scopeVar && savedRecursiveVar && savedRecursiveCurrentVar) {
    code.line(_`if (${savedRecursiveVar} === undefined) ${scopeVar}.delete('__recursive__');`);
    code.line(
      _`if (${savedRecursiveCurrentVar} !== undefined) ${scopeVar}.set('__recursive_current__', ${savedRecursiveCurrentVar});`
    );
    code.line(_`else ${scopeVar}.delete('__recursive_current__');`);
  }
}
setCompileFn(compile);
setGenerateSchemaValidator(generateSchemaValidator);

// src/core/coercion.ts
function resolveJsonPointer(schema2, pointer) {
  if (typeof schema2 !== "object" || schema2 === null) return void 0;
  const parts = pointer.split("/").slice(1).map((p) => p.replace(/~1/g, "/").replace(/~0/g, "~"));
  let current = schema2;
  for (const part of parts) {
    if (typeof current !== "object" || current === null) return void 0;
    current = current[part];
  }
  return current;
}
function createRefResolver(rootSchema, remotes) {
  const schemasById = /* @__PURE__ */ new Map();
  if (remotes) {
    for (const [uri, schema2] of Object.entries(remotes)) {
      if (typeof schema2 === "object" && schema2 !== null) {
        schemasById.set(uri, schema2);
        if (schema2.$id) {
          schemasById.set(schema2.$id, schema2);
        }
      }
    }
  }
  if (typeof rootSchema === "object" && rootSchema !== null && rootSchema.$id) {
    schemasById.set(rootSchema.$id, rootSchema);
  }
  return {
    resolveRef(ref, _fromSchema) {
      if (ref === "#") {
        return rootSchema;
      }
      if (ref.startsWith("#/")) {
        return resolveJsonPointer(rootSchema, ref.slice(1));
      }
      const fragmentIndex = ref.indexOf("#");
      if (fragmentIndex !== -1) {
        const baseUri = ref.slice(0, fragmentIndex);
        const fragment = ref.slice(fragmentIndex);
        const baseSchema = schemasById.get(baseUri);
        if (baseSchema) {
          if (fragment === "#") return baseSchema;
          if (fragment.startsWith("#/")) {
            return resolveJsonPointer(baseSchema, fragment.slice(1));
          }
        }
      }
      return schemasById.get(ref);
    }
  };
}
function isCoercionEnabled(options, type) {
  if (options === true) return true;
  if (options === false) return false;
  if (typeof options === "object") {
    const typeKey = type;
    return options[typeKey] === true;
  }
  return false;
}
function coerceToString(value) {
  if (typeof value === "string") {
    return { value, coerced: false };
  }
  if (typeof value === "number" || typeof value === "boolean") {
    return { value: String(value), coerced: true };
  }
  return { value, coerced: false };
}
function coerceToNumber(value) {
  if (typeof value === "number") {
    return { value, coerced: false };
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") {
      return { value, coerced: false };
    }
    if (trimmed === "NaN") {
      return { value, coerced: false };
    }
    const num = Number(trimmed);
    if (!Number.isNaN(num)) {
      return { value: num, coerced: true };
    }
  }
  return { value, coerced: false };
}
function coerceToInteger(value) {
  if (typeof value === "number" && Number.isInteger(value)) {
    return { value, coerced: false };
  }
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (trimmed === "") {
      return { value, coerced: false };
    }
    const num = Number(trimmed);
    if (!Number.isNaN(num) && Number.isInteger(num)) {
      return { value: num, coerced: true };
    }
  }
  return { value, coerced: false };
}
function coerceToBoolean(value) {
  if (typeof value === "boolean") {
    return { value, coerced: false };
  }
  if (typeof value === "string") {
    const lower = value.toLowerCase();
    if (lower === "true" || lower === "1") {
      return { value: true, coerced: true };
    }
    if (lower === "false" || lower === "0") {
      return { value: false, coerced: true };
    }
  }
  if (typeof value === "number") {
    if (value === 1) {
      return { value: true, coerced: true };
    }
    if (value === 0) {
      return { value: false, coerced: true };
    }
  }
  return { value, coerced: false };
}
function coerceToNull(value) {
  if (value === null) {
    return { value, coerced: false };
  }
  if (typeof value === "string") {
    if (value === "" || value === "null") {
      return { value: null, coerced: true };
    }
  }
  return { value, coerced: false };
}
function coerceToArray(value) {
  if (Array.isArray(value)) {
    return { value, coerced: false };
  }
  if (value === null || value === void 0) {
    return { value, coerced: false };
  }
  return { value: [value], coerced: true };
}
function coerceToType(value, type) {
  switch (type) {
    case "string":
      return coerceToString(value);
    case "number":
      return coerceToNumber(value);
    case "integer":
      return coerceToInteger(value);
    case "boolean":
      return coerceToBoolean(value);
    case "null":
      return coerceToNull(value);
    case "array":
      return coerceToArray(value);
    case "object":
      return { value, coerced: false };
    default:
      return { value, coerced: false };
  }
}
function matchesType(value, type) {
  switch (type) {
    case "string":
      return typeof value === "string";
    case "number":
      return typeof value === "number";
    case "integer":
      return typeof value === "number" && Number.isInteger(value);
    case "boolean":
      return typeof value === "boolean";
    case "null":
      return value === null;
    case "array":
      return Array.isArray(value);
    case "object":
      return typeof value === "object" && value !== null && !Array.isArray(value);
    default:
      return false;
  }
}
function schemaMatches(value, schema2, refResolver) {
  if (typeof schema2 === "boolean") {
    return schema2;
  }
  if (typeof schema2 === "string") {
    return matchesType(value, schema2);
  }
  if (schema2.$ref && refResolver) {
    const refSchema = refResolver.resolveRef(schema2.$ref, schema2);
    if (refSchema) {
      return schemaMatches(value, refSchema, refResolver);
    }
    return false;
  }
  if (schema2.type !== void 0) {
    const types = Array.isArray(schema2.type) ? schema2.type : [schema2.type];
    const matchesAnyType = types.some((t) => matchesType(value, t));
    if (!matchesAnyType) return false;
  }
  if (schema2.const !== void 0) {
    if (value !== schema2.const) return false;
  }
  if (schema2.enum !== void 0) {
    if (!schema2.enum.includes(value)) return false;
  }
  if (schema2.properties && typeof value === "object" && value !== null && !Array.isArray(value)) {
    const obj = value;
    for (const [key, propSchema] of Object.entries(schema2.properties)) {
      if (key in obj) {
        if (!schemaMatches(obj[key], propSchema, refResolver)) {
          return false;
        }
      }
    }
  }
  if (schema2.required && typeof value === "object" && value !== null && !Array.isArray(value)) {
    const obj = value;
    for (const requiredProp of schema2.required) {
      if (!(requiredProp in obj)) {
        return false;
      }
    }
  }
  return true;
}
function coerceValue(value, schema2, options, refResolver) {
  if (typeof schema2 === "boolean") {
    return { value, coerced: false };
  }
  if (typeof schema2 === "string") {
    if (!isCoercionEnabled(options, schema2)) {
      return { value, coerced: false };
    }
    const result = coerceToType(value, schema2);
    return result;
  }
  if (schema2.$ref) {
    if (refResolver) {
      const refSchema = refResolver.resolveRef(schema2.$ref, schema2);
      if (refSchema) {
        return coerceValue(value, refSchema, options, refResolver);
      }
    }
    return { value, coerced: false };
  }
  let currentValue = value;
  let wasCoerced = false;
  if (schema2.type) {
    const types = Array.isArray(schema2.type) ? schema2.type : [schema2.type];
    const alreadyMatches = types.some((t) => matchesType(currentValue, t));
    if (!alreadyMatches) {
      for (const type of types) {
        if (!isCoercionEnabled(options, type)) continue;
        const result = coerceToType(currentValue, type);
        if (result.coerced && matchesType(result.value, type)) {
          currentValue = result.value;
          wasCoerced = true;
          break;
        }
      }
    }
  }
  if (schema2.const !== void 0 && currentValue !== schema2.const) {
    const constType = typeof schema2.const;
    if (constType === "number" && isCoercionEnabled(options, "number")) {
      const result = coerceToNumber(currentValue);
      if (result.coerced && result.value === schema2.const) {
        currentValue = result.value;
        wasCoerced = true;
      }
    } else if (constType === "boolean" && isCoercionEnabled(options, "boolean")) {
      const result = coerceToBoolean(currentValue);
      if (result.coerced && result.value === schema2.const) {
        currentValue = result.value;
        wasCoerced = true;
      }
    } else if (constType === "string" && isCoercionEnabled(options, "string")) {
      const result = coerceToString(currentValue);
      if (result.coerced && result.value === schema2.const) {
        currentValue = result.value;
        wasCoerced = true;
      }
    } else if (schema2.const === null && isCoercionEnabled(options, "null")) {
      const result = coerceToNull(currentValue);
      if (result.coerced && result.value === schema2.const) {
        currentValue = result.value;
        wasCoerced = true;
      }
    }
  }
  if (schema2.enum && !schema2.enum.includes(currentValue)) {
    for (const enumVal of schema2.enum) {
      const enumType = typeof enumVal;
      let result = null;
      if (enumType === "number" && isCoercionEnabled(options, "number")) {
        result = coerceToNumber(currentValue);
      } else if (enumType === "boolean" && isCoercionEnabled(options, "boolean")) {
        result = coerceToBoolean(currentValue);
      } else if (enumType === "string" && isCoercionEnabled(options, "string")) {
        result = coerceToString(currentValue);
      } else if (enumVal === null && isCoercionEnabled(options, "null")) {
        result = coerceToNull(currentValue);
      }
      if (result && result.coerced && result.value === enumVal) {
        currentValue = result.value;
        wasCoerced = true;
        break;
      }
    }
  }
  if (Array.isArray(currentValue)) {
    const itemsSchema = schema2.items;
    const prefixItems = schema2.prefixItems;
    if (itemsSchema || prefixItems) {
      let arrayChanged = false;
      const singleItemsSchema = itemsSchema && typeof itemsSchema !== "boolean" && !Array.isArray(itemsSchema) ? itemsSchema : void 0;
      const newArray = currentValue.map((item, index) => {
        let itemSchema;
        if (prefixItems && index < prefixItems.length) {
          itemSchema = prefixItems[index];
        } else if (singleItemsSchema) {
          itemSchema = singleItemsSchema;
        }
        if (itemSchema) {
          const result = coerceValue(item, itemSchema, options, refResolver);
          if (result.coerced) {
            arrayChanged = true;
            return result.value;
          }
        }
        return item;
      });
      if (arrayChanged) {
        currentValue = newArray;
        wasCoerced = true;
      }
    }
  }
  if (typeof currentValue === "object" && currentValue !== null && !Array.isArray(currentValue)) {
    const obj = currentValue;
    let objectChanged = false;
    const newObj = {};
    for (const [key, val] of Object.entries(obj)) {
      let propSchema;
      if (schema2.properties && key in schema2.properties) {
        propSchema = schema2.properties[key];
      } else if (schema2.patternProperties) {
        for (const [pattern, patternSchema] of Object.entries(schema2.patternProperties)) {
          try {
            if (new RegExp(pattern).test(key)) {
              propSchema = patternSchema;
              break;
            }
          } catch {
          }
        }
      }
      if (!propSchema && schema2.additionalProperties && typeof schema2.additionalProperties !== "boolean") {
        propSchema = schema2.additionalProperties;
      }
      if (propSchema) {
        const result = coerceValue(val, propSchema, options, refResolver);
        if (result.coerced) {
          objectChanged = true;
          newObj[key] = result.value;
        } else {
          newObj[key] = val;
        }
      } else {
        newObj[key] = val;
      }
    }
    if (objectChanged) {
      currentValue = newObj;
      wasCoerced = true;
    }
  }
  if (schema2.allOf) {
    for (const subSchema of schema2.allOf) {
      const result = coerceValue(currentValue, subSchema, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
      }
    }
  }
  if (schema2.anyOf) {
    for (const subSchema of schema2.anyOf) {
      const result = coerceValue(currentValue, subSchema, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
        break;
      }
    }
  }
  if (schema2.oneOf) {
    for (const subSchema of schema2.oneOf) {
      const result = coerceValue(currentValue, subSchema, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
        break;
      }
    }
  }
  if (schema2.if !== void 0) {
    const ifMatches = schemaMatches(currentValue, schema2.if, refResolver);
    if (ifMatches && schema2.then !== void 0) {
      const result = coerceValue(currentValue, schema2.then, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
      }
    } else if (!ifMatches && schema2.else !== void 0) {
      const result = coerceValue(currentValue, schema2.else, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
      }
    }
  } else {
    if (schema2.then) {
      const result = coerceValue(currentValue, schema2.then, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
      }
    }
    if (schema2.else) {
      const result = coerceValue(currentValue, schema2.else, options, refResolver);
      if (result.coerced) {
        currentValue = result.value;
        wasCoerced = true;
      }
    }
  }
  return { value: currentValue, coerced: wasCoerced };
}

// src/core/index.ts
function collectExternalRefs(schema2, baseUri, collected, visited) {
  if (typeof schema2 !== "object" || schema2 === null || visited.has(schema2)) return;
  visited.add(schema2);
  if (typeof schema2.$ref === "string" && !schema2.$ref.startsWith("#")) {
    const ref = schema2.$ref;
    let resolvedUri;
    if (/^[a-z][a-z0-9+.-]*:/i.test(ref)) {
      resolvedUri = ref.split("#")[0];
    } else if (baseUri) {
      const base = baseUri.split("#")[0];
      if (ref.startsWith("/")) {
        const match = base.match(/^([a-z][a-z0-9+.-]*:\/\/[^/]*)/i);
        resolvedUri = match ? match[1] + ref.split("#")[0] : ref.split("#")[0];
      } else {
        const lastSlash = base.lastIndexOf("/");
        resolvedUri = (lastSlash >= 0 ? base.slice(0, lastSlash + 1) : "") + ref.split("#")[0];
      }
    } else {
      resolvedUri = ref.split("#")[0];
    }
    if (resolvedUri && /^https?:\/\//i.test(resolvedUri)) {
      collected.add(resolvedUri);
    }
  }
  let currentBase = baseUri;
  const schemaId = schema2.$id ?? schema2.id;
  if (schemaId && !schemaId.startsWith("#")) {
    if (/^[a-z][a-z0-9+.-]*:/i.test(schemaId)) {
      currentBase = schemaId;
    } else if (baseUri) {
      const base = baseUri.split("#")[0];
      const lastSlash = base.lastIndexOf("/");
      currentBase = (lastSlash >= 0 ? base.slice(0, lastSlash + 1) : "") + schemaId;
    }
  }
  for (const value of Object.values(schema2)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        if (typeof item === "object" && item !== null) {
          collectExternalRefs(item, currentBase, collected, visited);
        }
      }
    } else if (typeof value === "object" && value !== null) {
      collectExternalRefs(value, currentBase, collected, visited);
    }
  }
}
async function loadRemoteSchemas(schema2, options = {}) {
  const {
    fetch: fetchFn = globalThis.fetch,
    concurrency = 5,
    timeout = 1e4,
    silent = false
  } = options;
  if (!fetchFn) {
    throw new Error("fetch is not available. Provide a custom fetch function.");
  }
  const remotes = {};
  const pending = /* @__PURE__ */ new Set();
  const fetched = /* @__PURE__ */ new Set();
  const baseUri = typeof schema2 === "object" && schema2 !== null ? schema2.$id ?? schema2.id ?? "" : "";
  collectExternalRefs(schema2, baseUri, pending, /* @__PURE__ */ new Set());
  while (pending.size > 0) {
    const batch = Array.from(pending).slice(0, concurrency);
    batch.forEach((uri) => pending.delete(uri));
    const results = await Promise.allSettled(
      batch.map(async (uri) => {
        if (fetched.has(uri)) return null;
        fetched.add(uri);
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);
        try {
          const response = await fetchFn(uri, { signal: controller.signal });
          if (!response.ok) {
            if (!silent) console.warn(`Failed to fetch ${uri}: ${response.status}`);
            return null;
          }
          const loadedSchema = await response.json();
          remotes[uri] = loadedSchema;
          if (typeof loadedSchema === "object" && loadedSchema !== null && (loadedSchema.$id || loadedSchema.id)) {
            const id = loadedSchema.$id ?? loadedSchema.id;
            if (id && id !== uri) {
              remotes[id] = loadedSchema;
            }
          }
          collectExternalRefs(loadedSchema, uri, pending, /* @__PURE__ */ new Set());
          return loadedSchema;
        } finally {
          clearTimeout(timeoutId);
        }
      })
    );
    if (!silent) {
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status === "rejected") {
          console.warn(`Failed to load ${batch[i]}: ${result.reason}`);
        }
      }
    }
  }
  return remotes;
}
async function createValidatorAsync(schema2, options = {}) {
  const loadedRemotes = await loadRemoteSchemas(schema2, options);
  const remotes = { ...loadedRemotes, ...options.remotes };
  return createValidator(schema2, { ...options, remotes });
}
function createValidator(schema2, options = {}) {
  const validateFn = compile(schema2, options);
  const coerceOptions = options.coerce;
  const validator = validateFn;
  if (coerceOptions) {
    const refResolver = createRefResolver(schema2, options.remotes);
    validator.validate = function(data) {
      const coercedData = coerceValue(data, schema2, coerceOptions, refResolver).value;
      if (validateFn(coercedData)) {
        return { valid: true, value: coercedData, error: void 0 };
      }
      return {
        valid: false,
        value: void 0,
        error: validateFn.errors ?? [
          {
            instancePath: "",
            schemaPath: "#",
            keyword: "schema",
            params: {},
            message: "validation failed"
          }
        ]
      };
    };
    validator.assert = function(data) {
      const coercedData = coerceValue(data, schema2, coerceOptions, refResolver).value;
      if (!validateFn(coercedData)) {
        const errors = validateFn.errors;
        const errorMsg = errors && errors.length > 0 ? errors.map((e) => `${e.instancePath}: ${e.message}`).join("; ") : "Validation failed";
        throw new Error(errorMsg);
      }
      return coercedData;
    };
  } else {
    validator.validate = function(data) {
      if (validateFn(data)) {
        return { valid: true, value: data, error: void 0 };
      }
      return {
        valid: false,
        value: void 0,
        error: validateFn.errors ?? [
          {
            instancePath: "",
            schemaPath: "#",
            keyword: "schema",
            params: {},
            message: "validation failed"
          }
        ]
      };
    };
    validator.assert = function(data) {
      if (!validateFn(data)) {
        const errors = validateFn.errors;
        const errorMsg = errors && errors.length > 0 ? errors.map((e) => `${e.instancePath}: ${e.message}`).join("; ") : "Validation failed";
        throw new Error(errorMsg);
      }
      return data;
    };
  }
  Object.defineProperty(validator, "type", {
    get() {
      throw new Error("type is a phantom property for type inference only");
    }
  });
  return validator;
}

// src/meta-schemas/draft-07.json
var draft_07_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "http://json-schema.org/draft-07/schema#",
  title: "Core schema meta-schema",
  definitions: {
    schemaArray: {
      type: "array",
      minItems: 1,
      items: { $ref: "#" }
    },
    nonNegativeInteger: {
      type: "integer",
      minimum: 0
    },
    nonNegativeIntegerDefault0: {
      allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
    },
    simpleTypes: {
      enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
    },
    stringArray: {
      type: "array",
      items: { type: "string" },
      uniqueItems: true,
      default: []
    }
  },
  type: ["object", "boolean"],
  properties: {
    $id: {
      type: "string",
      format: "uri-reference"
    },
    $schema: {
      type: "string",
      format: "uri"
    },
    $ref: {
      type: "string",
      format: "uri-reference"
    },
    $comment: {
      type: "string"
    },
    title: {
      type: "string"
    },
    description: {
      type: "string"
    },
    default: true,
    readOnly: {
      type: "boolean",
      default: false
    },
    writeOnly: {
      type: "boolean",
      default: false
    },
    examples: {
      type: "array",
      items: true
    },
    multipleOf: {
      type: "number",
      exclusiveMinimum: 0
    },
    maximum: {
      type: "number"
    },
    exclusiveMaximum: {
      type: "number"
    },
    minimum: {
      type: "number"
    },
    exclusiveMinimum: {
      type: "number"
    },
    maxLength: { $ref: "#/definitions/nonNegativeInteger" },
    minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
    pattern: {
      type: "string",
      format: "regex"
    },
    additionalItems: { $ref: "#" },
    items: {
      anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
      default: true
    },
    maxItems: { $ref: "#/definitions/nonNegativeInteger" },
    minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
    uniqueItems: {
      type: "boolean",
      default: false
    },
    contains: { $ref: "#" },
    maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
    minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
    required: { $ref: "#/definitions/stringArray" },
    additionalProperties: { $ref: "#" },
    definitions: {
      type: "object",
      additionalProperties: { $ref: "#" },
      default: {}
    },
    properties: {
      type: "object",
      additionalProperties: { $ref: "#" },
      default: {}
    },
    patternProperties: {
      type: "object",
      additionalProperties: { $ref: "#" },
      propertyNames: { format: "regex" },
      default: {}
    },
    dependencies: {
      type: "object",
      additionalProperties: {
        anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
      }
    },
    propertyNames: { $ref: "#" },
    const: true,
    enum: {
      type: "array",
      items: true,
      minItems: 1,
      uniqueItems: true
    },
    type: {
      anyOf: [
        { $ref: "#/definitions/simpleTypes" },
        {
          type: "array",
          items: { $ref: "#/definitions/simpleTypes" },
          minItems: 1,
          uniqueItems: true
        }
      ]
    },
    format: { type: "string" },
    contentMediaType: { type: "string" },
    contentEncoding: { type: "string" },
    if: { $ref: "#" },
    then: { $ref: "#" },
    else: { $ref: "#" },
    allOf: { $ref: "#/definitions/schemaArray" },
    anyOf: { $ref: "#/definitions/schemaArray" },
    oneOf: { $ref: "#/definitions/schemaArray" },
    not: { $ref: "#" }
  },
  default: true
};

// src/meta-schemas/draft-06.json
var draft_06_default = {
  $schema: "http://json-schema.org/draft-06/schema#",
  $id: "http://json-schema.org/draft-06/schema#",
  title: "Core schema meta-schema",
  definitions: {
    schemaArray: {
      type: "array",
      minItems: 1,
      items: { $ref: "#" }
    },
    nonNegativeInteger: {
      type: "integer",
      minimum: 0
    },
    nonNegativeIntegerDefault0: {
      allOf: [{ $ref: "#/definitions/nonNegativeInteger" }, { default: 0 }]
    },
    simpleTypes: {
      enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
    },
    stringArray: {
      type: "array",
      items: { type: "string" },
      uniqueItems: true,
      default: []
    }
  },
  type: ["object", "boolean"],
  properties: {
    $id: {
      type: "string",
      format: "uri-reference"
    },
    $schema: {
      type: "string",
      format: "uri"
    },
    $ref: {
      type: "string",
      format: "uri-reference"
    },
    title: {
      type: "string"
    },
    description: {
      type: "string"
    },
    default: {},
    examples: {
      type: "array",
      items: {}
    },
    multipleOf: {
      type: "number",
      exclusiveMinimum: 0
    },
    maximum: {
      type: "number"
    },
    exclusiveMaximum: {
      type: "number"
    },
    minimum: {
      type: "number"
    },
    exclusiveMinimum: {
      type: "number"
    },
    maxLength: { $ref: "#/definitions/nonNegativeInteger" },
    minLength: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
    pattern: {
      type: "string",
      format: "regex"
    },
    additionalItems: { $ref: "#" },
    items: {
      anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }],
      default: {}
    },
    maxItems: { $ref: "#/definitions/nonNegativeInteger" },
    minItems: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
    uniqueItems: {
      type: "boolean",
      default: false
    },
    contains: { $ref: "#" },
    maxProperties: { $ref: "#/definitions/nonNegativeInteger" },
    minProperties: { $ref: "#/definitions/nonNegativeIntegerDefault0" },
    required: { $ref: "#/definitions/stringArray" },
    additionalProperties: { $ref: "#" },
    definitions: {
      type: "object",
      additionalProperties: { $ref: "#" },
      default: {}
    },
    properties: {
      type: "object",
      additionalProperties: { $ref: "#" },
      default: {}
    },
    patternProperties: {
      type: "object",
      additionalProperties: { $ref: "#" },
      propertyNames: { format: "regex" },
      default: {}
    },
    dependencies: {
      type: "object",
      additionalProperties: {
        anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
      }
    },
    propertyNames: { $ref: "#" },
    const: {},
    enum: {
      type: "array",
      minItems: 1,
      uniqueItems: true
    },
    type: {
      anyOf: [
        { $ref: "#/definitions/simpleTypes" },
        {
          type: "array",
          items: { $ref: "#/definitions/simpleTypes" },
          minItems: 1,
          uniqueItems: true
        }
      ]
    },
    format: { type: "string" },
    allOf: { $ref: "#/definitions/schemaArray" },
    anyOf: { $ref: "#/definitions/schemaArray" },
    oneOf: { $ref: "#/definitions/schemaArray" },
    not: { $ref: "#" }
  },
  default: {}
};

// src/meta-schemas/draft-04.json
var draft_04_default = {
  id: "http://json-schema.org/draft-04/schema#",
  $schema: "http://json-schema.org/draft-04/schema#",
  description: "Core schema meta-schema",
  definitions: {
    schemaArray: {
      type: "array",
      minItems: 1,
      items: { $ref: "#" }
    },
    positiveInteger: {
      type: "integer",
      minimum: 0
    },
    positiveIntegerDefault0: {
      allOf: [{ $ref: "#/definitions/positiveInteger" }, { default: 0 }]
    },
    simpleTypes: {
      enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
    },
    stringArray: {
      type: "array",
      items: { type: "string" },
      minItems: 1,
      uniqueItems: true
    }
  },
  type: "object",
  properties: {
    id: { type: "string" },
    $schema: { type: "string" },
    title: { type: "string" },
    description: { type: "string" },
    default: {},
    multipleOf: { type: "number", minimum: 0, exclusiveMinimum: true },
    maximum: { type: "number" },
    exclusiveMaximum: { type: "boolean", default: false },
    minimum: { type: "number" },
    exclusiveMinimum: { type: "boolean", default: false },
    maxLength: { $ref: "#/definitions/positiveInteger" },
    minLength: { $ref: "#/definitions/positiveIntegerDefault0" },
    pattern: { type: "string", format: "regex" },
    additionalItems: { anyOf: [{ type: "boolean" }, { $ref: "#" }], default: {} },
    items: { anyOf: [{ $ref: "#" }, { $ref: "#/definitions/schemaArray" }], default: {} },
    maxItems: { $ref: "#/definitions/positiveInteger" },
    minItems: { $ref: "#/definitions/positiveIntegerDefault0" },
    uniqueItems: { type: "boolean", default: false },
    maxProperties: { $ref: "#/definitions/positiveInteger" },
    minProperties: { $ref: "#/definitions/positiveIntegerDefault0" },
    required: { $ref: "#/definitions/stringArray" },
    additionalProperties: { anyOf: [{ type: "boolean" }, { $ref: "#" }], default: {} },
    definitions: { type: "object", additionalProperties: { $ref: "#" }, default: {} },
    properties: { type: "object", additionalProperties: { $ref: "#" }, default: {} },
    patternProperties: {
      type: "object",
      additionalProperties: { $ref: "#" },
      default: {}
    },
    dependencies: {
      type: "object",
      additionalProperties: {
        anyOf: [{ $ref: "#" }, { $ref: "#/definitions/stringArray" }]
      }
    },
    enum: { type: "array", minItems: 1, uniqueItems: true },
    type: {
      anyOf: [
        { $ref: "#/definitions/simpleTypes" },
        {
          type: "array",
          items: { $ref: "#/definitions/simpleTypes" },
          minItems: 1,
          uniqueItems: true
        }
      ]
    },
    format: { type: "string" },
    allOf: { $ref: "#/definitions/schemaArray" },
    anyOf: { $ref: "#/definitions/schemaArray" },
    oneOf: { $ref: "#/definitions/schemaArray" },
    not: { $ref: "#" }
  },
  dependencies: {
    exclusiveMaximum: ["maximum"],
    exclusiveMinimum: ["minimum"]
  },
  default: {}
};

// src/meta-schemas/draft-2019-09.json
var draft_2019_09_default = {
  $schema: "https://json-schema.org/draft/2019-09/schema",
  $id: "https://json-schema.org/draft/2019-09/schema",
  $vocabulary: {
    "https://json-schema.org/draft/2019-09/vocab/core": true,
    "https://json-schema.org/draft/2019-09/vocab/applicator": true,
    "https://json-schema.org/draft/2019-09/vocab/validation": true,
    "https://json-schema.org/draft/2019-09/vocab/meta-data": true,
    "https://json-schema.org/draft/2019-09/vocab/format": false,
    "https://json-schema.org/draft/2019-09/vocab/content": true
  },
  $recursiveAnchor: true,
  title: "Core and Validation specifications meta-schema",
  allOf: [
    { $ref: "meta/core" },
    { $ref: "meta/applicator" },
    { $ref: "meta/validation" },
    { $ref: "meta/meta-data" },
    { $ref: "meta/format" },
    { $ref: "meta/content" }
  ],
  type: ["object", "boolean"],
  properties: {
    definitions: {
      $comment: "While no longer an official keyword as it is replaced by $defs, this keyword is retained in the meta-schema to prevent incompatible extensions as it remains in common use.",
      type: "object",
      additionalProperties: { $recursiveRef: "#" },
      default: {}
    },
    dependencies: {
      $comment: '"dependencies" is no longer a keyword, but schema authors should avoid redefining it to facilitate a smooth transition to "dependentSchemas" and "dependentRequired"',
      type: "object",
      additionalProperties: {
        anyOf: [{ $recursiveRef: "#" }, { $ref: "meta/validation#/$defs/stringArray" }]
      }
    }
  }
};

// src/meta-schemas/draft-2019-09/core.json
var core_default = {
  $schema: "https://json-schema.org/draft/2019-09/schema",
  $id: "https://json-schema.org/draft/2019-09/meta/core",
  $recursiveAnchor: true,
  title: "Core vocabulary meta-schema",
  type: ["object", "boolean"],
  properties: {
    $id: {
      type: "string",
      format: "uri-reference",
      $comment: "Non-empty fragments not allowed.",
      pattern: "^[^#]*#?$"
    },
    $schema: {
      type: "string",
      format: "uri"
    },
    $anchor: {
      type: "string",
      pattern: "^[A-Za-z][-A-Za-z0-9.:_]*$"
    },
    $ref: {
      type: "string",
      format: "uri-reference"
    },
    $recursiveRef: {
      type: "string",
      format: "uri-reference"
    },
    $recursiveAnchor: {
      type: "boolean",
      default: false
    },
    $vocabulary: {
      type: "object",
      propertyNames: {
        type: "string",
        format: "uri"
      },
      additionalProperties: {
        type: "boolean"
      }
    },
    $comment: {
      type: "string"
    },
    $defs: {
      type: "object",
      additionalProperties: { $recursiveRef: "#" },
      default: {}
    }
  }
};

// src/meta-schemas/draft-2019-09/applicator.json
var applicator_default = {
  $schema: "https://json-schema.org/draft/2019-09/schema",
  $id: "https://json-schema.org/draft/2019-09/meta/applicator",
  $recursiveAnchor: true,
  title: "Applicator vocabulary meta-schema",
  type: ["object", "boolean"],
  properties: {
    additionalItems: { $recursiveRef: "#" },
    unevaluatedItems: { $recursiveRef: "#" },
    items: {
      anyOf: [{ $recursiveRef: "#" }, { $ref: "#/$defs/schemaArray" }]
    },
    contains: { $recursiveRef: "#" },
    additionalProperties: { $recursiveRef: "#" },
    unevaluatedProperties: { $recursiveRef: "#" },
    properties: {
      type: "object",
      additionalProperties: { $recursiveRef: "#" },
      default: {}
    },
    patternProperties: {
      type: "object",
      additionalProperties: { $recursiveRef: "#" },
      propertyNames: { format: "regex" },
      default: {}
    },
    dependentSchemas: {
      type: "object",
      additionalProperties: {
        $recursiveRef: "#"
      }
    },
    propertyNames: { $recursiveRef: "#" },
    if: { $recursiveRef: "#" },
    then: { $recursiveRef: "#" },
    else: { $recursiveRef: "#" },
    allOf: { $ref: "#/$defs/schemaArray" },
    anyOf: { $ref: "#/$defs/schemaArray" },
    oneOf: { $ref: "#/$defs/schemaArray" },
    not: { $recursiveRef: "#" }
  },
  $defs: {
    schemaArray: {
      type: "array",
      minItems: 1,
      items: { $recursiveRef: "#" }
    }
  }
};

// src/meta-schemas/draft-2019-09/validation.json
var validation_default = {
  $schema: "https://json-schema.org/draft/2019-09/schema",
  $id: "https://json-schema.org/draft/2019-09/meta/validation",
  $recursiveAnchor: true,
  title: "Validation vocabulary meta-schema",
  type: ["object", "boolean"],
  properties: {
    multipleOf: {
      type: "number",
      exclusiveMinimum: 0
    },
    maximum: {
      type: "number"
    },
    exclusiveMaximum: {
      type: "number"
    },
    minimum: {
      type: "number"
    },
    exclusiveMinimum: {
      type: "number"
    },
    maxLength: { $ref: "#/$defs/nonNegativeInteger" },
    minLength: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
    pattern: {
      type: "string",
      format: "regex"
    },
    maxItems: { $ref: "#/$defs/nonNegativeInteger" },
    minItems: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
    uniqueItems: {
      type: "boolean",
      default: false
    },
    maxContains: { $ref: "#/$defs/nonNegativeInteger" },
    minContains: {
      $ref: "#/$defs/nonNegativeInteger",
      default: 1
    },
    maxProperties: { $ref: "#/$defs/nonNegativeInteger" },
    minProperties: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
    required: { $ref: "#/$defs/stringArray" },
    dependentRequired: {
      type: "object",
      additionalProperties: {
        $ref: "#/$defs/stringArray"
      }
    },
    const: true,
    enum: {
      type: "array",
      items: true
    },
    type: {
      anyOf: [
        { $ref: "#/$defs/simpleTypes" },
        {
          type: "array",
          items: { $ref: "#/$defs/simpleTypes" },
          minItems: 1,
          uniqueItems: true
        }
      ]
    }
  },
  $defs: {
    nonNegativeInteger: {
      type: "integer",
      minimum: 0
    },
    nonNegativeIntegerDefault0: {
      $ref: "#/$defs/nonNegativeInteger",
      default: 0
    },
    simpleTypes: {
      enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
    },
    stringArray: {
      type: "array",
      items: { type: "string" },
      uniqueItems: true,
      default: []
    }
  }
};

// src/meta-schemas/draft-2019-09/meta-data.json
var meta_data_default = {
  $schema: "https://json-schema.org/draft/2019-09/schema",
  $id: "https://json-schema.org/draft/2019-09/meta/meta-data",
  $recursiveAnchor: true,
  title: "Meta-data vocabulary meta-schema",
  type: ["object", "boolean"],
  properties: {
    title: {
      type: "string"
    },
    description: {
      type: "string"
    },
    default: true,
    deprecated: {
      type: "boolean",
      default: false
    },
    readOnly: {
      type: "boolean",
      default: false
    },
    writeOnly: {
      type: "boolean",
      default: false
    },
    examples: {
      type: "array",
      items: true
    }
  }
};

// src/meta-schemas/draft-2019-09/format.json
var format_default = {
  $schema: "https://json-schema.org/draft/2019-09/schema",
  $id: "https://json-schema.org/draft/2019-09/meta/format",
  $recursiveAnchor: true,
  title: "Format vocabulary meta-schema",
  type: ["object", "boolean"],
  properties: {
    format: { type: "string" }
  }
};

// src/meta-schemas/draft-2019-09/content.json
var content_default = {
  $schema: "https://json-schema.org/draft/2019-09/schema",
  $id: "https://json-schema.org/draft/2019-09/meta/content",
  $recursiveAnchor: true,
  title: "Content vocabulary meta-schema",
  type: ["object", "boolean"],
  properties: {
    contentMediaType: { type: "string" },
    contentEncoding: { type: "string" },
    contentSchema: { $recursiveRef: "#" }
  }
};

// src/meta-schemas/draft-2020-12.json
var draft_2020_12_default = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://json-schema.org/draft/2020-12/schema",
  $vocabulary: {
    "https://json-schema.org/draft/2020-12/vocab/core": true,
    "https://json-schema.org/draft/2020-12/vocab/applicator": true,
    "https://json-schema.org/draft/2020-12/vocab/unevaluated": true,
    "https://json-schema.org/draft/2020-12/vocab/validation": true,
    "https://json-schema.org/draft/2020-12/vocab/meta-data": true,
    "https://json-schema.org/draft/2020-12/vocab/format-annotation": true,
    "https://json-schema.org/draft/2020-12/vocab/content": true
  },
  $dynamicAnchor: "meta",
  title: "Core and Validation specifications meta-schema",
  allOf: [
    { $ref: "meta/core" },
    { $ref: "meta/applicator" },
    { $ref: "meta/unevaluated" },
    { $ref: "meta/validation" },
    { $ref: "meta/meta-data" },
    { $ref: "meta/format-annotation" },
    { $ref: "meta/content" }
  ],
  type: ["object", "boolean"],
  $comment: "This meta-schema also defines keywords that have appeared in previous drafts in order to prevent incompatible extensions as they remain in common use.",
  properties: {
    definitions: {
      $comment: '"definitions" has been replaced by "$defs".',
      type: "object",
      additionalProperties: { $dynamicRef: "#meta" },
      deprecated: true,
      default: {}
    },
    dependencies: {
      $comment: '"dependencies" has been split and replaced by "dependentSchemas" and "dependentRequired" in order to serve their differing semantics.',
      type: "object",
      additionalProperties: {
        anyOf: [{ $dynamicRef: "#meta" }, { $ref: "meta/validation#/$defs/stringArray" }]
      },
      deprecated: true,
      default: {}
    },
    $recursiveAnchor: {
      $comment: '"$recursiveAnchor" has been replaced by "$dynamicAnchor".',
      $ref: "meta/core#/$defs/anchorString",
      deprecated: true
    },
    $recursiveRef: {
      $comment: '"$recursiveRef" has been replaced by "$dynamicRef".',
      $ref: "meta/core#/$defs/uriReferenceString",
      deprecated: true
    }
  }
};

// src/meta-schemas/draft-2020-12/core.json
var core_default2 = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://json-schema.org/draft/2020-12/meta/core",
  $dynamicAnchor: "meta",
  title: "Core vocabulary meta-schema",
  type: ["object", "boolean"],
  properties: {
    $id: {
      $ref: "#/$defs/uriReferenceString",
      $comment: "Non-empty fragments not allowed.",
      pattern: "^[^#]*#?$"
    },
    $schema: { $ref: "#/$defs/uriString" },
    $ref: { $ref: "#/$defs/uriReferenceString" },
    $anchor: { $ref: "#/$defs/anchorString" },
    $dynamicRef: { $ref: "#/$defs/uriReferenceString" },
    $dynamicAnchor: { $ref: "#/$defs/anchorString" },
    $vocabulary: {
      type: "object",
      propertyNames: { $ref: "#/$defs/uriString" },
      additionalProperties: {
        type: "boolean"
      }
    },
    $comment: {
      type: "string"
    },
    $defs: {
      type: "object",
      additionalProperties: { $dynamicRef: "#meta" }
    }
  },
  $defs: {
    anchorString: {
      type: "string",
      pattern: "^[A-Za-z_][-A-Za-z0-9._]*$"
    },
    uriString: {
      type: "string",
      format: "uri"
    },
    uriReferenceString: {
      type: "string",
      format: "uri-reference"
    }
  }
};

// src/meta-schemas/draft-2020-12/applicator.json
var applicator_default2 = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://json-schema.org/draft/2020-12/meta/applicator",
  $dynamicAnchor: "meta",
  title: "Applicator vocabulary meta-schema",
  type: ["object", "boolean"],
  properties: {
    prefixItems: { $ref: "#/$defs/schemaArray" },
    items: { $dynamicRef: "#meta" },
    contains: { $dynamicRef: "#meta" },
    additionalProperties: { $dynamicRef: "#meta" },
    properties: {
      type: "object",
      additionalProperties: { $dynamicRef: "#meta" },
      default: {}
    },
    patternProperties: {
      type: "object",
      additionalProperties: { $dynamicRef: "#meta" },
      propertyNames: { format: "regex" },
      default: {}
    },
    dependentSchemas: {
      type: "object",
      additionalProperties: { $dynamicRef: "#meta" },
      default: {}
    },
    propertyNames: { $dynamicRef: "#meta" },
    if: { $dynamicRef: "#meta" },
    then: { $dynamicRef: "#meta" },
    else: { $dynamicRef: "#meta" },
    allOf: { $ref: "#/$defs/schemaArray" },
    anyOf: { $ref: "#/$defs/schemaArray" },
    oneOf: { $ref: "#/$defs/schemaArray" },
    not: { $dynamicRef: "#meta" }
  },
  $defs: {
    schemaArray: {
      type: "array",
      minItems: 1,
      items: { $dynamicRef: "#meta" }
    }
  }
};

// src/meta-schemas/draft-2020-12/validation.json
var validation_default2 = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://json-schema.org/draft/2020-12/meta/validation",
  $dynamicAnchor: "meta",
  title: "Validation vocabulary meta-schema",
  type: ["object", "boolean"],
  properties: {
    type: {
      anyOf: [
        { $ref: "#/$defs/simpleTypes" },
        {
          type: "array",
          items: { $ref: "#/$defs/simpleTypes" },
          minItems: 1,
          uniqueItems: true
        }
      ]
    },
    const: true,
    enum: {
      type: "array",
      items: true
    },
    multipleOf: {
      type: "number",
      exclusiveMinimum: 0
    },
    maximum: {
      type: "number"
    },
    exclusiveMaximum: {
      type: "number"
    },
    minimum: {
      type: "number"
    },
    exclusiveMinimum: {
      type: "number"
    },
    maxLength: { $ref: "#/$defs/nonNegativeInteger" },
    minLength: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
    pattern: {
      type: "string",
      format: "regex"
    },
    maxItems: { $ref: "#/$defs/nonNegativeInteger" },
    minItems: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
    uniqueItems: {
      type: "boolean",
      default: false
    },
    maxContains: { $ref: "#/$defs/nonNegativeInteger" },
    minContains: {
      $ref: "#/$defs/nonNegativeInteger",
      default: 1
    },
    maxProperties: { $ref: "#/$defs/nonNegativeInteger" },
    minProperties: { $ref: "#/$defs/nonNegativeIntegerDefault0" },
    required: { $ref: "#/$defs/stringArray" },
    dependentRequired: {
      type: "object",
      additionalProperties: {
        $ref: "#/$defs/stringArray"
      }
    }
  },
  $defs: {
    nonNegativeInteger: {
      type: "integer",
      minimum: 0
    },
    nonNegativeIntegerDefault0: {
      $ref: "#/$defs/nonNegativeInteger",
      default: 0
    },
    simpleTypes: {
      enum: ["array", "boolean", "integer", "null", "number", "object", "string"]
    },
    stringArray: {
      type: "array",
      items: { type: "string" },
      uniqueItems: true,
      default: []
    }
  }
};

// src/meta-schemas/draft-2020-12/meta-data.json
var meta_data_default2 = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://json-schema.org/draft/2020-12/meta/meta-data",
  $dynamicAnchor: "meta",
  title: "Meta-data vocabulary meta-schema",
  type: ["object", "boolean"],
  properties: {
    title: {
      type: "string"
    },
    description: {
      type: "string"
    },
    default: true,
    deprecated: {
      type: "boolean",
      default: false
    },
    readOnly: {
      type: "boolean",
      default: false
    },
    writeOnly: {
      type: "boolean",
      default: false
    },
    examples: {
      type: "array",
      items: true
    }
  }
};

// src/meta-schemas/draft-2020-12/format-annotation.json
var format_annotation_default = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://json-schema.org/draft/2020-12/meta/format-annotation",
  $dynamicAnchor: "meta",
  title: "Format vocabulary meta-schema for annotation results",
  type: ["object", "boolean"],
  properties: {
    format: { type: "string" }
  }
};

// src/meta-schemas/draft-2020-12/content.json
var content_default2 = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://json-schema.org/draft/2020-12/meta/content",
  $dynamicAnchor: "meta",
  title: "Content vocabulary meta-schema",
  type: ["object", "boolean"],
  properties: {
    contentEncoding: { type: "string" },
    contentMediaType: { type: "string" },
    contentSchema: { $dynamicRef: "#meta" }
  }
};

// src/meta-schemas/draft-2020-12/unevaluated.json
var unevaluated_default = {
  $schema: "https://json-schema.org/draft/2020-12/schema",
  $id: "https://json-schema.org/draft/2020-12/meta/unevaluated",
  $dynamicAnchor: "meta",
  title: "Unevaluated applicator vocabulary meta-schema",
  type: ["object", "boolean"],
  properties: {
    unevaluatedItems: { $dynamicRef: "#meta" },
    unevaluatedProperties: { $dynamicRef: "#meta" }
  }
};

// src/meta-schemas/index.ts
var draft07Schema = draft_07_default;
var draft06Schema = draft_06_default;
var draft04Schema = draft_04_default;
var draft201909Schema = draft_2019_09_default;
var draft202012Schema = draft_2020_12_default;
var metaSchemas = {
  // Draft-07
  "http://json-schema.org/draft-07/schema": draft07Schema,
  "http://json-schema.org/draft-07/schema#": draft07Schema,
  // Draft-06
  "http://json-schema.org/draft-06/schema": draft06Schema,
  "http://json-schema.org/draft-06/schema#": draft06Schema,
  // Draft-04
  "http://json-schema.org/draft-04/schema": draft04Schema,
  "http://json-schema.org/draft-04/schema#": draft04Schema,
  // Draft-2019-09
  "https://json-schema.org/draft/2019-09/schema": draft201909Schema,
  "https://json-schema.org/draft/2019-09/meta/core": core_default,
  "https://json-schema.org/draft/2019-09/meta/applicator": applicator_default,
  "https://json-schema.org/draft/2019-09/meta/validation": validation_default,
  "https://json-schema.org/draft/2019-09/meta/meta-data": meta_data_default,
  "https://json-schema.org/draft/2019-09/meta/format": format_default,
  "https://json-schema.org/draft/2019-09/meta/content": content_default,
  // Draft-2020-12
  "https://json-schema.org/draft/2020-12/schema": draft202012Schema,
  "https://json-schema.org/draft/2020-12/meta/core": core_default2,
  "https://json-schema.org/draft/2020-12/meta/applicator": applicator_default2,
  "https://json-schema.org/draft/2020-12/meta/validation": validation_default2,
  "https://json-schema.org/draft/2020-12/meta/meta-data": meta_data_default2,
  "https://json-schema.org/draft/2020-12/meta/format-annotation": format_annotation_default,
  "https://json-schema.org/draft/2020-12/meta/content": content_default2,
  "https://json-schema.org/draft/2020-12/meta/unevaluated": unevaluated_default
};

// src/struct.ts
function struct(properties, options) {
  const schemaProperties = {};
  const required = [];
  for (const [key, def] of Object.entries(properties)) {
    if (typeof def === "string") {
      schemaProperties[key] = { type: def };
      required.push(key);
    } else {
      const { optional, ...schemaWithoutOptional } = def;
      schemaProperties[key] = schemaWithoutOptional;
      if (!optional) {
        required.push(key);
      }
    }
  }
  const schema2 = {
    type: "object",
    properties: schemaProperties,
    ...required.length > 0 ? { required } : {}
  };
  return createValidator(schema2, options);
}

// src/index.ts
function schema(definition, options) {
  return createValidator(definition, options);
}
async function schemaAsync(definition, options) {
  return createValidatorAsync(definition, options);
}
export {
  createValidator,
  createValidatorAsync,
  draft04Schema,
  draft06Schema,
  draft07Schema,
  loadRemoteSchemas,
  metaSchemas,
  schema,
  schemaAsync,
  struct
};
