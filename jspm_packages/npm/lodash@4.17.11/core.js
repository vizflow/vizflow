/* */ 
"format cjs";
(function(process) {
  ;
  (function() {
    var undefined;
    var VERSION = '4.17.11';
    var FUNC_ERROR_TEXT = 'Expected a function';
    var COMPARE_PARTIAL_FLAG = 1,
        COMPARE_UNORDERED_FLAG = 2;
    var WRAP_BIND_FLAG = 1,
        WRAP_PARTIAL_FLAG = 32;
    var INFINITY = 1 / 0,
        MAX_SAFE_INTEGER = 9007199254740991;
    var argsTag = '[object Arguments]',
        arrayTag = '[object Array]',
        asyncTag = '[object AsyncFunction]',
        boolTag = '[object Boolean]',
        dateTag = '[object Date]',
        errorTag = '[object Error]',
        funcTag = '[object Function]',
        genTag = '[object GeneratorFunction]',
        numberTag = '[object Number]',
        objectTag = '[object Object]',
        proxyTag = '[object Proxy]',
        regexpTag = '[object RegExp]',
        stringTag = '[object String]';
    var reUnescapedHtml = /[&<>"']/g,
        reHasUnescapedHtml = RegExp(reUnescapedHtml.source);
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    var htmlEscapes = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function('return this')();
    var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
    function arrayPush(array, values) {
      array.push.apply(array, values);
      return array;
    }
    function baseFindIndex(array, predicate, fromIndex, fromRight) {
      var length = array.length,
          index = fromIndex + (fromRight ? 1 : -1);
      while ((fromRight ? index-- : ++index < length)) {
        if (predicate(array[index], index, array)) {
          return index;
        }
      }
      return -1;
    }
    function baseProperty(key) {
      return function(object) {
        return object == null ? undefined : object[key];
      };
    }
    function basePropertyOf(object) {
      return function(key) {
        return object == null ? undefined : object[key];
      };
    }
    function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
      eachFunc(collection, function(value, index, collection) {
        accumulator = initAccum ? (initAccum = false, value) : iteratee(accumulator, value, index, collection);
      });
      return accumulator;
    }
    function baseValues(object, props) {
      return baseMap(props, function(key) {
        return object[key];
      });
    }
    var escapeHtmlChar = basePropertyOf(htmlEscapes);
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    var arrayProto = Array.prototype,
        objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var idCounter = 0;
    var nativeObjectToString = objectProto.toString;
    var oldDash = root._;
    var objectCreate = Object.create,
        propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeIsFinite = root.isFinite,
        nativeKeys = overArg(Object.keys, Object),
        nativeMax = Math.max;
    function lodash(value) {
      return value instanceof LodashWrapper ? value : new LodashWrapper(value);
    }
    var baseCreate = (function() {
      function object() {}
      return function(proto) {
        if (!isObject(proto)) {
          return {};
        }
        if (objectCreate) {
          return objectCreate(proto);
        }
        object.prototype = proto;
        var result = new object;
        object.prototype = undefined;
        return result;
      };
    }());
    function LodashWrapper(value, chainAll) {
      this.__wrapped__ = value;
      this.__actions__ = [];
      this.__chain__ = !!chainAll;
    }
    LodashWrapper.prototype = baseCreate(lodash.prototype);
    LodashWrapper.prototype.constructor = LodashWrapper;
    function assignValue(object, key, value) {
      var objValue = object[key];
      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || (value === undefined && !(key in object))) {
        baseAssignValue(object, key, value);
      }
    }
    function baseAssignValue(object, key, value) {
      object[key] = value;
    }
    function baseDelay(func, wait, args) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return setTimeout(function() {
        func.apply(undefined, args);
      }, wait);
    }
    var baseEach = createBaseEach(baseForOwn);
    function baseEvery(collection, predicate) {
      var result = true;
      baseEach(collection, function(value, index, collection) {
        result = !!predicate(value, index, collection);
        return result;
      });
      return result;
    }
    function baseExtremum(array, iteratee, comparator) {
      var index = -1,
          length = array.length;
      while (++index < length) {
        var value = array[index],
            current = iteratee(value);
        if (current != null && (computed === undefined ? (current === current && !false) : comparator(current, computed))) {
          var computed = current,
              result = value;
        }
      }
      return result;
    }
    function baseFilter(collection, predicate) {
      var result = [];
      baseEach(collection, function(value, index, collection) {
        if (predicate(value, index, collection)) {
          result.push(value);
        }
      });
      return result;
    }
    function baseFlatten(array, depth, predicate, isStrict, result) {
      var index = -1,
          length = array.length;
      predicate || (predicate = isFlattenable);
      result || (result = []);
      while (++index < length) {
        var value = array[index];
        if (depth > 0 && predicate(value)) {
          if (depth > 1) {
            baseFlatten(value, depth - 1, predicate, isStrict, result);
          } else {
            arrayPush(result, value);
          }
        } else if (!isStrict) {
          result[result.length] = value;
        }
      }
      return result;
    }
    var baseFor = createBaseFor();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    function baseFunctions(object, props) {
      return baseFilter(props, function(key) {
        return isFunction(object[key]);
      });
    }
    function baseGetTag(value) {
      return objectToString(value);
    }
    function baseGt(value, other) {
      return value > other;
    }
    var baseIsArguments = noop;
    function baseIsDate(value) {
      return isObjectLike(value) && baseGetTag(value) == dateTag;
    }
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object),
          othIsArr = isArray(other),
          objTag = objIsArr ? arrayTag : baseGetTag(object),
          othTag = othIsArr ? arrayTag : baseGetTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag,
          othIsObj = othTag == objectTag,
          isSameTag = objTag == othTag;
      stack || (stack = []);
      var objStack = find(stack, function(entry) {
        return entry[0] == object;
      });
      var othStack = find(stack, function(entry) {
        return entry[0] == other;
      });
      if (objStack && othStack) {
        return objStack[1] == other;
      }
      stack.push([object, other]);
      stack.push([other, object]);
      if (isSameTag && !objIsObj) {
        var result = (objIsArr) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
        stack.pop();
        return result;
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object,
              othUnwrapped = othIsWrapped ? other.value() : other;
          var result = equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
          stack.pop();
          return result;
        }
      }
      if (!isSameTag) {
        return false;
      }
      var result = equalObjects(object, other, bitmask, customizer, equalFunc, stack);
      stack.pop();
      return result;
    }
    function baseIsRegExp(value) {
      return isObjectLike(value) && baseGetTag(value) == regexpTag;
    }
    function baseIteratee(func) {
      if (typeof func == 'function') {
        return func;
      }
      if (func == null) {
        return identity;
      }
      return (typeof func == 'object' ? baseMatches : baseProperty)(func);
    }
    function baseLt(value, other) {
      return value < other;
    }
    function baseMap(collection, iteratee) {
      var index = -1,
          result = isArrayLike(collection) ? Array(collection.length) : [];
      baseEach(collection, function(value, key, collection) {
        result[++index] = iteratee(value, key, collection);
      });
      return result;
    }
    function baseMatches(source) {
      var props = nativeKeys(source);
      return function(object) {
        var length = props.length;
        if (object == null) {
          return !length;
        }
        object = Object(object);
        while (length--) {
          var key = props[length];
          if (!(key in object && baseIsEqual(source[key], object[key], COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG))) {
            return false;
          }
        }
        return true;
      };
    }
    function basePick(object, props) {
      object = Object(object);
      return reduce(props, function(result, key) {
        if (key in object) {
          result[key] = object[key];
        }
        return result;
      }, {});
    }
    function baseRest(func, start) {
      return setToString(overRest(func, start, identity), func + '');
    }
    function baseSlice(array, start, end) {
      var index = -1,
          length = array.length;
      if (start < 0) {
        start = -start > length ? 0 : (length + start);
      }
      end = end > length ? length : end;
      if (end < 0) {
        end += length;
      }
      length = start > end ? 0 : ((end - start) >>> 0);
      start >>>= 0;
      var result = Array(length);
      while (++index < length) {
        result[index] = array[index + start];
      }
      return result;
    }
    function copyArray(source) {
      return baseSlice(source, 0, source.length);
    }
    function baseSome(collection, predicate) {
      var result;
      baseEach(collection, function(value, index, collection) {
        result = predicate(value, index, collection);
        return !result;
      });
      return !!result;
    }
    function baseWrapperValue(value, actions) {
      var result = value;
      return reduce(actions, function(result, action) {
        return action.func.apply(action.thisArg, arrayPush([result], action.args));
      }, result);
    }
    function compareAscending(value, other) {
      if (value !== other) {
        var valIsDefined = value !== undefined,
            valIsNull = value === null,
            valIsReflexive = value === value,
            valIsSymbol = false;
        var othIsDefined = other !== undefined,
            othIsNull = other === null,
            othIsReflexive = other === other,
            othIsSymbol = false;
        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) || (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) || (valIsNull && othIsDefined && othIsReflexive) || (!valIsDefined && othIsReflexive) || !valIsReflexive) {
          return 1;
        }
        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) || (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) || (othIsNull && valIsDefined && valIsReflexive) || (!othIsDefined && valIsReflexive) || !othIsReflexive) {
          return -1;
        }
      }
      return 0;
    }
    function copyObject(source, props, object, customizer) {
      var isNew = !object;
      object || (object = {});
      var index = -1,
          length = props.length;
      while (++index < length) {
        var key = props[index];
        var newValue = customizer ? customizer(object[key], source[key], key, object, source) : undefined;
        if (newValue === undefined) {
          newValue = source[key];
        }
        if (isNew) {
          baseAssignValue(object, key, newValue);
        } else {
          assignValue(object, key, newValue);
        }
      }
      return object;
    }
    function createAssigner(assigner) {
      return baseRest(function(object, sources) {
        var index = -1,
            length = sources.length,
            customizer = length > 1 ? sources[length - 1] : undefined;
        customizer = (assigner.length > 3 && typeof customizer == 'function') ? (length--, customizer) : undefined;
        object = Object(object);
        while (++index < length) {
          var source = sources[index];
          if (source) {
            assigner(object, source, index, customizer);
          }
        }
        return object;
      });
    }
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length,
            index = fromRight ? length : -1,
            iterable = Object(collection);
        while ((fromRight ? index-- : ++index < length)) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1,
            iterable = Object(object),
            props = keysFunc(object),
            length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    function createCtor(Ctor) {
      return function() {
        var args = arguments;
        var thisBinding = baseCreate(Ctor.prototype),
            result = Ctor.apply(thisBinding, args);
        return isObject(result) ? result : thisBinding;
      };
    }
    function createFind(findIndexFunc) {
      return function(collection, predicate, fromIndex) {
        var iterable = Object(collection);
        if (!isArrayLike(collection)) {
          var iteratee = baseIteratee(predicate, 3);
          collection = keys(collection);
          predicate = function(key) {
            return iteratee(iterable[key], key, iterable);
          };
        }
        var index = findIndexFunc(collection, predicate, fromIndex);
        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined;
      };
    }
    function createPartial(func, bitmask, thisArg, partials) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var isBind = bitmask & WRAP_BIND_FLAG,
          Ctor = createCtor(func);
      function wrapper() {
        var argsIndex = -1,
            argsLength = arguments.length,
            leftIndex = -1,
            leftLength = partials.length,
            args = Array(leftLength + argsLength),
            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
        while (++leftIndex < leftLength) {
          args[leftIndex] = partials[leftIndex];
        }
        while (argsLength--) {
          args[leftIndex++] = arguments[++argsIndex];
        }
        return fn.apply(isBind ? thisArg : this, args);
      }
      return wrapper;
    }
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          arrLength = array.length,
          othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var index = -1,
          result = true,
          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? [] : undefined;
      while (++index < arrLength) {
        var arrValue = array[index],
            othValue = other[index];
        var compared;
        if (compared !== undefined) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!baseSome(other, function(othValue, othIndex) {
            if (!indexOf(seen, othIndex) && (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      return result;
    }
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == (other + '');
      }
      return false;
    }
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
          objProps = keys(object),
          objLength = objProps.length,
          othProps = keys(other),
          othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var result = true;
      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key],
            othValue = other[key];
        var compared;
        if (!(compared === undefined ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack)) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == 'constructor');
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor,
            othCtor = other.constructor;
        if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) && !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      return result;
    }
    function flatRest(func) {
      return setToString(overRest(func, undefined, flatten), func + '');
    }
    function isFlattenable(value) {
      return isArray(value) || isArguments(value);
    }
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == 'number' || (type != 'symbol' && reIsUint.test(value))) && (value > -1 && value % 1 == 0 && value < length);
    }
    function isIterateeCall(value, index, object) {
      if (!isObject(object)) {
        return false;
      }
      var type = typeof index;
      if (type == 'number' ? (isArrayLike(object) && isIndex(index, object.length)) : (type == 'string' && index in object)) {
        return eq(object[index], value);
      }
      return false;
    }
    function nativeKeysIn(object) {
      var result = [];
      if (object != null) {
        for (var key in Object(object)) {
          result.push(key);
        }
      }
      return result;
    }
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    function overRest(func, start, transform) {
      start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
      return function() {
        var args = arguments,
            index = -1,
            length = nativeMax(args.length - start, 0),
            array = Array(length);
        while (++index < length) {
          array[index] = args[start + index];
        }
        index = -1;
        var otherArgs = Array(start + 1);
        while (++index < start) {
          otherArgs[index] = args[index];
        }
        otherArgs[start] = transform(array);
        return func.apply(this, otherArgs);
      };
    }
    var setToString = identity;
    function compact(array) {
      return baseFilter(array, Boolean);
    }
    function concat() {
      var length = arguments.length;
      if (!length) {
        return [];
      }
      var args = Array(length - 1),
          array = arguments[0],
          index = length;
      while (index--) {
        args[index - 1] = arguments[index];
      }
      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
    }
    function findIndex(array, predicate, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (!length) {
        return -1;
      }
      var index = fromIndex == null ? 0 : toInteger(fromIndex);
      if (index < 0) {
        index = nativeMax(length + index, 0);
      }
      return baseFindIndex(array, baseIteratee(predicate, 3), index);
    }
    function flatten(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, 1) : [];
    }
    function flattenDeep(array) {
      var length = array == null ? 0 : array.length;
      return length ? baseFlatten(array, INFINITY) : [];
    }
    function head(array) {
      return (array && array.length) ? array[0] : undefined;
    }
    function indexOf(array, value, fromIndex) {
      var length = array == null ? 0 : array.length;
      if (typeof fromIndex == 'number') {
        fromIndex = fromIndex < 0 ? nativeMax(length + fromIndex, 0) : fromIndex;
      } else {
        fromIndex = 0;
      }
      var index = (fromIndex || 0) - 1,
          isReflexive = value === value;
      while (++index < length) {
        var other = array[index];
        if ((isReflexive ? other === value : other !== other)) {
          return index;
        }
      }
      return -1;
    }
    function last(array) {
      var length = array == null ? 0 : array.length;
      return length ? array[length - 1] : undefined;
    }
    function slice(array, start, end) {
      var length = array == null ? 0 : array.length;
      start = start == null ? 0 : +start;
      end = end === undefined ? length : +end;
      return length ? baseSlice(array, start, end) : [];
    }
    function chain(value) {
      var result = lodash(value);
      result.__chain__ = true;
      return result;
    }
    function tap(value, interceptor) {
      interceptor(value);
      return value;
    }
    function thru(value, interceptor) {
      return interceptor(value);
    }
    function wrapperChain() {
      return chain(this);
    }
    function wrapperValue() {
      return baseWrapperValue(this.__wrapped__, this.__actions__);
    }
    function every(collection, predicate, guard) {
      predicate = guard ? undefined : predicate;
      return baseEvery(collection, baseIteratee(predicate));
    }
    function filter(collection, predicate) {
      return baseFilter(collection, baseIteratee(predicate));
    }
    var find = createFind(findIndex);
    function forEach(collection, iteratee) {
      return baseEach(collection, baseIteratee(iteratee));
    }
    function map(collection, iteratee) {
      return baseMap(collection, baseIteratee(iteratee));
    }
    function reduce(collection, iteratee, accumulator) {
      return baseReduce(collection, baseIteratee(iteratee), accumulator, arguments.length < 3, baseEach);
    }
    function size(collection) {
      if (collection == null) {
        return 0;
      }
      collection = isArrayLike(collection) ? collection : nativeKeys(collection);
      return collection.length;
    }
    function some(collection, predicate, guard) {
      predicate = guard ? undefined : predicate;
      return baseSome(collection, baseIteratee(predicate));
    }
    function sortBy(collection, iteratee) {
      var index = 0;
      iteratee = baseIteratee(iteratee);
      return baseMap(baseMap(collection, function(value, key, collection) {
        return {
          'value': value,
          'index': index++,
          'criteria': iteratee(value, key, collection)
        };
      }).sort(function(object, other) {
        return compareAscending(object.criteria, other.criteria) || (object.index - other.index);
      }), baseProperty('value'));
    }
    function before(n, func) {
      var result;
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n > 0) {
          result = func.apply(this, arguments);
        }
        if (n <= 1) {
          func = undefined;
        }
        return result;
      };
    }
    var bind = baseRest(function(func, thisArg, partials) {
      return createPartial(func, WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG, thisArg, partials);
    });
    var defer = baseRest(function(func, args) {
      return baseDelay(func, 1, args);
    });
    var delay = baseRest(function(func, wait, args) {
      return baseDelay(func, toNumber(wait) || 0, args);
    });
    function negate(predicate) {
      if (typeof predicate != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      return function() {
        var args = arguments;
        return !predicate.apply(this, args);
      };
    }
    function once(func) {
      return before(2, func);
    }
    function clone(value) {
      if (!isObject(value)) {
        return value;
      }
      return isArray(value) ? copyArray(value) : copyObject(value, nativeKeys(value));
    }
    function eq(value, other) {
      return value === other || (value !== value && other !== other);
    }
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') && !propertyIsEnumerable.call(value, 'callee');
    };
    var isArray = Array.isArray;
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    function isBoolean(value) {
      return value === true || value === false || (isObjectLike(value) && baseGetTag(value) == boolTag);
    }
    var isDate = baseIsDate;
    function isEmpty(value) {
      if (isArrayLike(value) && (isArray(value) || isString(value) || isFunction(value.splice) || isArguments(value))) {
        return !value.length;
      }
      return !nativeKeys(value).length;
    }
    function isEqual(value, other) {
      return baseIsEqual(value, other);
    }
    function isFinite(value) {
      return typeof value == 'number' && nativeIsFinite(value);
    }
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    function isLength(value) {
      return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == 'object' || type == 'function');
    }
    function isObjectLike(value) {
      return value != null && typeof value == 'object';
    }
    function isNaN(value) {
      return isNumber(value) && value != +value;
    }
    function isNull(value) {
      return value === null;
    }
    function isNumber(value) {
      return typeof value == 'number' || (isObjectLike(value) && baseGetTag(value) == numberTag);
    }
    var isRegExp = baseIsRegExp;
    function isString(value) {
      return typeof value == 'string' || (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
    }
    function isUndefined(value) {
      return value === undefined;
    }
    function toArray(value) {
      if (!isArrayLike(value)) {
        return values(value);
      }
      return value.length ? copyArray(value) : [];
    }
    var toInteger = Number;
    var toNumber = Number;
    function toString(value) {
      if (typeof value == 'string') {
        return value;
      }
      return value == null ? '' : (value + '');
    }
    var assign = createAssigner(function(object, source) {
      copyObject(source, nativeKeys(source), object);
    });
    var assignIn = createAssigner(function(object, source) {
      copyObject(source, nativeKeysIn(source), object);
    });
    function create(prototype, properties) {
      var result = baseCreate(prototype);
      return properties == null ? result : assign(result, properties);
    }
    var defaults = baseRest(function(object, sources) {
      object = Object(object);
      var index = -1;
      var length = sources.length;
      var guard = length > 2 ? sources[2] : undefined;
      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
        length = 1;
      }
      while (++index < length) {
        var source = sources[index];
        var props = keysIn(source);
        var propsIndex = -1;
        var propsLength = props.length;
        while (++propsIndex < propsLength) {
          var key = props[propsIndex];
          var value = object[key];
          if (value === undefined || (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
            object[key] = source[key];
          }
        }
      }
      return object;
    });
    function has(object, path) {
      return object != null && hasOwnProperty.call(object, path);
    }
    var keys = nativeKeys;
    var keysIn = nativeKeysIn;
    var pick = flatRest(function(object, paths) {
      return object == null ? {} : basePick(object, paths);
    });
    function result(object, path, defaultValue) {
      var value = object == null ? undefined : object[path];
      if (value === undefined) {
        value = defaultValue;
      }
      return isFunction(value) ? value.call(object) : value;
    }
    function values(object) {
      return object == null ? [] : baseValues(object, keys(object));
    }
    function escape(string) {
      string = toString(string);
      return (string && reHasUnescapedHtml.test(string)) ? string.replace(reUnescapedHtml, escapeHtmlChar) : string;
    }
    function identity(value) {
      return value;
    }
    var iteratee = baseIteratee;
    function matches(source) {
      return baseMatches(assign({}, source));
    }
    function mixin(object, source, options) {
      var props = keys(source),
          methodNames = baseFunctions(source, props);
      if (options == null && !(isObject(source) && (methodNames.length || !props.length))) {
        options = source;
        source = object;
        object = this;
        methodNames = baseFunctions(source, keys(source));
      }
      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
          isFunc = isFunction(object);
      baseEach(methodNames, function(methodName) {
        var func = source[methodName];
        object[methodName] = func;
        if (isFunc) {
          object.prototype[methodName] = function() {
            var chainAll = this.__chain__;
            if (chain || chainAll) {
              var result = object(this.__wrapped__),
                  actions = result.__actions__ = copyArray(this.__actions__);
              actions.push({
                'func': func,
                'args': arguments,
                'thisArg': object
              });
              result.__chain__ = chainAll;
              return result;
            }
            return func.apply(object, arrayPush([this.value()], arguments));
          };
        }
      });
      return object;
    }
    function noConflict() {
      if (root._ === this) {
        root._ = oldDash;
      }
      return this;
    }
    function noop() {}
    function uniqueId(prefix) {
      var id = ++idCounter;
      return toString(prefix) + id;
    }
    function max(array) {
      return (array && array.length) ? baseExtremum(array, identity, baseGt) : undefined;
    }
    function min(array) {
      return (array && array.length) ? baseExtremum(array, identity, baseLt) : undefined;
    }
    lodash.assignIn = assignIn;
    lodash.before = before;
    lodash.bind = bind;
    lodash.chain = chain;
    lodash.compact = compact;
    lodash.concat = concat;
    lodash.create = create;
    lodash.defaults = defaults;
    lodash.defer = defer;
    lodash.delay = delay;
    lodash.filter = filter;
    lodash.flatten = flatten;
    lodash.flattenDeep = flattenDeep;
    lodash.iteratee = iteratee;
    lodash.keys = keys;
    lodash.map = map;
    lodash.matches = matches;
    lodash.mixin = mixin;
    lodash.negate = negate;
    lodash.once = once;
    lodash.pick = pick;
    lodash.slice = slice;
    lodash.sortBy = sortBy;
    lodash.tap = tap;
    lodash.thru = thru;
    lodash.toArray = toArray;
    lodash.values = values;
    lodash.extend = assignIn;
    mixin(lodash, lodash);
    lodash.clone = clone;
    lodash.escape = escape;
    lodash.every = every;
    lodash.find = find;
    lodash.forEach = forEach;
    lodash.has = has;
    lodash.head = head;
    lodash.identity = identity;
    lodash.indexOf = indexOf;
    lodash.isArguments = isArguments;
    lodash.isArray = isArray;
    lodash.isBoolean = isBoolean;
    lodash.isDate = isDate;
    lodash.isEmpty = isEmpty;
    lodash.isEqual = isEqual;
    lodash.isFinite = isFinite;
    lodash.isFunction = isFunction;
    lodash.isNaN = isNaN;
    lodash.isNull = isNull;
    lodash.isNumber = isNumber;
    lodash.isObject = isObject;
    lodash.isRegExp = isRegExp;
    lodash.isString = isString;
    lodash.isUndefined = isUndefined;
    lodash.last = last;
    lodash.max = max;
    lodash.min = min;
    lodash.noConflict = noConflict;
    lodash.noop = noop;
    lodash.reduce = reduce;
    lodash.result = result;
    lodash.size = size;
    lodash.some = some;
    lodash.uniqueId = uniqueId;
    lodash.each = forEach;
    lodash.first = head;
    mixin(lodash, (function() {
      var source = {};
      baseForOwn(lodash, function(func, methodName) {
        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
          source[methodName] = func;
        }
      });
      return source;
    }()), {'chain': false});
    lodash.VERSION = VERSION;
    baseEach(['pop', 'join', 'replace', 'reverse', 'split', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
      var func = (/^(?:replace|split)$/.test(methodName) ? String.prototype : arrayProto)[methodName],
          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
          retUnwrapped = /^(?:pop|join|replace|shift)$/.test(methodName);
      lodash.prototype[methodName] = function() {
        var args = arguments;
        if (retUnwrapped && !this.__chain__) {
          var value = this.value();
          return func.apply(isArray(value) ? value : [], args);
        }
        return this[chainName](function(value) {
          return func.apply(isArray(value) ? value : [], args);
        });
      };
    });
    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;
    if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
      root._ = lodash;
      define(function() {
        return lodash;
      });
    } else if (freeModule) {
      (freeModule.exports = lodash)._ = lodash;
      freeExports._ = lodash;
    } else {
      root._ = lodash;
    }
  }.call(this));
})(require('@empty'));
