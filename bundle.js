(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * lodash 4.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseFlatten = require('lodash._baseflatten');

/**
 * Flattens `array` a single level deep.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to flatten.
 * @returns {Array} Returns the new flattened array.
 * @example
 *
 * _.flatten([1, [2, [3, [4]], 5]]);
 * // => [1, 2, [3, [4]], 5]
 */
function flatten(array) {
  var length = array ? array.length : 0;
  return length ? baseFlatten(array, 1) : [];
}

module.exports = flatten;

},{"lodash._baseflatten":2}],2:[function(require,module,exports){
/**
 * lodash 4.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * The base implementation of `_.flatten` with support for restricting flattening.
 *
 * @private
 * @param {Array} array The array to flatten.
 * @param {number} depth The maximum recursion depth.
 * @param {boolean} [isStrict] Restrict flattening to arrays-like objects.
 * @param {Array} [result=[]] The initial result value.
 * @returns {Array} Returns the new flattened array.
 */
function baseFlatten(array, depth, isStrict, result) {
  result || (result = []);

  var index = -1,
      length = array.length;

  while (++index < length) {
    var value = array[index];
    if (depth > 0 && isArrayLikeObject(value) &&
        (isStrict || isArray(value) || isArguments(value))) {
      if (depth > 1) {
        // Recursively flatten arrays (susceptible to call stack limits).
        baseFlatten(value, depth - 1, isStrict, result);
      } else {
        arrayPush(result, value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value)) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

module.exports = baseFlatten;

},{}],3:[function(require,module,exports){
/**
 * lodash 4.1.0 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseEach = require('lodash._baseeach');

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Casts `value` to `identity` if it's not a function.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the array-like object.
 */
function baseCastFunction(value) {
  return typeof value == 'function' ? value : identity;
}

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The iteratee is invoked with three arguments: (value, index|key, collection).
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a "length" property
 * are iterated like arrays. To avoid this behavior use `_.forIn` or `_.forOwn`
 * for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(value) {
 *   console.log(value);
 * });
 * // => logs `1` then `2`
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'a' then 'b' (iteration order is not guaranteed)
 */
function forEach(collection, iteratee) {
  return (typeof iteratee == 'function' && isArray(collection))
    ? arrayEach(collection, iteratee)
    : baseEach(collection, baseCastFunction(iteratee));
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * This method returns the first argument given to it.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = forEach;

},{"lodash._baseeach":4}],4:[function(require,module,exports){
/**
 * lodash 4.1.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    stringTag = '[object String]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototypeOf = Object.getPrototypeOf,
    propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = Object.keys;

/**
 * The base implementation of `_.forEach` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object} Returns `collection`.
 */
var baseEach = createBaseEach(baseForOwn);

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iteratee functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return hasOwnProperty.call(object, key) ||
    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
}

/**
 * The base implementation of `_.keys` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  return nativeKeys(Object(object));
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Creates a `baseEach` or `baseEachRight` function.
 *
 * @private
 * @param {Function} eachFunc The function to iterate over a collection.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
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

/**
 * Creates a base function for methods like `_.forIn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
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

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value)) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  var isProto = isPrototype(object);
  if (!(isProto || isArrayLike(object))) {
    return baseKeys(object);
  }
  var indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  for (var key in object) {
    if (baseHas(object, key) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseEach;

},{}],5:[function(require,module,exports){
/**
 * lodash 4.2.1 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */
var baseEach = require('lodash._baseeach'),
    baseIteratee = require('lodash._baseiteratee');

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * The base implementation of `_.map` without support for iteratee shorthands.
 *
 * @private
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function baseMap(collection, iteratee) {
  var index = -1,
      result = isArrayLike(collection) ? Array(collection.length) : [];

  baseEach(collection, function(value, key, collection) {
    result[++index] = iteratee(value, key, collection);
  });
  return result;
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Creates an array of values by running each element in `collection` through
 * `iteratee`. The iteratee is invoked with three arguments:
 * (value, index|key, collection).
 *
 * Many lodash methods are guarded to work as iteratees for methods like
 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
 *
 * The guarded methods are:
 * `ary`, `curry`, `curryRight`, `drop`, `dropRight`, `every`, `fill`,
 * `invert`, `parseInt`, `random`, `range`, `rangeRight`, `slice`, `some`,
 * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimEnd`, `trimStart`,
 * and `words`
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object} collection The collection to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 * @example
 *
 * function square(n) {
 *   return n * n;
 * }
 *
 * _.map([4, 8], square);
 * // => [16, 64]
 *
 * _.map({ 'a': 4, 'b': 8 }, square);
 * // => [16, 64] (iteration order is not guaranteed)
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * // The `_.property` iteratee shorthand.
 * _.map(users, 'user');
 * // => ['barney', 'fred']
 */
function map(collection, iteratee) {
  var func = isArray(collection) ? arrayMap : baseMap;
  return func(collection, baseIteratee(iteratee, 3));
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value)) && !isFunction(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

module.exports = map;

},{"lodash._baseeach":6,"lodash._baseiteratee":7}],6:[function(require,module,exports){
arguments[4][4][0].apply(exports,arguments)
},{"dup":4}],7:[function(require,module,exports){
(function (global){
/**
 * lodash 4.5.2 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for comparison styles. */
var UNORDERED_COMPARE_FLAG = 1,
    PARTIAL_COMPARE_FLAG = 2;

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari > 5). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used to determine if values are of the language type `Object`. */
var objectTypes = {
  'function': true,
  'object': true
};

/** Detect free variable `exports`. */
var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
  ? exports
  : undefined;

/** Detect free variable `module`. */
var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
  ? module
  : undefined;

/** Detect free variable `global` from Node.js. */
var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

/** Detect free variable `self`. */
var freeSelf = checkGlobal(objectTypes[typeof self] && self);

/** Detect free variable `window`. */
var freeWindow = checkGlobal(objectTypes[typeof window] && window);

/** Detect `this` as the global object. */
var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

/**
 * Used as a reference to the global object.
 *
 * The `this` value is used if it's the global object to avoid Greasemonkey's
 * restricted `window` object, otherwise the `window` object is used.
 */
var root = freeGlobal ||
  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
    freeSelf || thisGlobal || Function('return this')();

/**
 * A specialized version of `_.map` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the new mapped array.
 */
function arrayMap(array, iteratee) {
  var index = -1,
      length = array.length,
      result = Array(length);

  while (++index < length) {
    result[index] = iteratee(array[index], index, array);
  }
  return result;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
 * of key-value pairs for `object` corresponding to the property names of `props`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the new array of key-value pairs.
 */
function baseToPairs(object, props) {
  return arrayMap(props, function(key) {
    return [key, object[key]];
  });
}

/**
 * Checks if `value` is a global object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
 */
function checkGlobal(value) {
  return (value && value.Object === Object) ? value : null;
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

/**
 * Converts `map` to an array.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the converted array.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Converts `set` to an array.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the converted array.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = Function.prototype.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototypeOf = Object.getPrototypeOf,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = Object.keys;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var mapCtorString = Map ? funcToString.call(Map) : '',
    setCtorString = Set ? funcToString.call(Set) : '',
    weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : '';

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates an hash object.
 *
 * @private
 * @constructor
 * @returns {Object} Returns the new hash object.
 */
function Hash() {}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(hash, key) {
  return hashHas(hash, key) && delete hash[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @param {Object} hash The hash to query.
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(hash, key) {
  if (nativeCreate) {
    var result = hash[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @param {Object} hash The hash to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(hash, key) {
  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 */
function hashSet(hash, key, value) {
  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
}

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function MapCache(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.clear();
  while (++index < length) {
    var entry = values[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': Map ? new Map : [],
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapDelete(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapGet(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map.get(key) : assocGet(data.map, key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapHas(key) {
  var data = this.__data__;
  if (isKeyable(key)) {
    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
  }
  return Map ? data.map.has(key) : assocHas(data.map, key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache object.
 */
function mapSet(key, value) {
  var data = this.__data__;
  if (isKeyable(key)) {
    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
  } else if (Map) {
    data.map.set(key, value);
  } else {
    assocSet(data.map, key, value);
  }
  return this;
}

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function Stack(values) {
  var index = -1,
      length = values ? values.length : 0;

  this.clear();
  while (++index < length) {
    var entry = values[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = { 'array': [], 'map': null };
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocDelete(array, key) : data.map['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocGet(array, key) : data.map.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  var data = this.__data__,
      array = data.array;

  return array ? assocHas(array, key) : data.map.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache object.
 */
function stackSet(key, value) {
  var data = this.__data__,
      array = data.array;

  if (array) {
    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
      assocSet(array, key, value);
    } else {
      data.array = null;
      data.map = new MapCache(array);
    }
  }
  var map = data.map;
  if (map) {
    map.set(key, value);
  }
  return this;
}

/**
 * Removes `key` and its value from the associative array.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function assocDelete(array, key) {
  var index = assocIndexOf(array, key);
  if (index < 0) {
    return false;
  }
  var lastIndex = array.length - 1;
  if (index == lastIndex) {
    array.pop();
  } else {
    splice.call(array, index, 1);
  }
  return true;
}

/**
 * Gets the associative array value for `key`.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function assocGet(array, key) {
  var index = assocIndexOf(array, key);
  return index < 0 ? undefined : array[index][1];
}

/**
 * Checks if an associative array value for `key` exists.
 *
 * @private
 * @param {Array} array The array to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function assocHas(array, key) {
  return assocIndexOf(array, key) > -1;
}

/**
 * Gets the index at which the first occurrence of `key` is found in `array`
 * of key-value pairs.
 *
 * @private
 * @param {Array} array The array to search.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * Sets the associative array `key` to `value`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 */
function assocSet(array, key, value) {
  var index = assocIndexOf(array, key);
  if (index < 0) {
    array.push([key, value]);
  } else {
    array[index][1] = value;
  }
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function baseCastPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path + ''] : baseCastPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[path[index++]];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.has` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHas(object, key) {
  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
  // that are composed entirely of index properties, return `false` for
  // `hasOwnProperty` checks of them.
  return hasOwnProperty.call(object, key) ||
    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
}

/**
 * The base implementation of `_.hasIn` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} key The key to check.
 * @returns {boolean} Returns `true` if `key` exists, else `false`.
 */
function baseHasIn(object, key) {
  return key in Object(object);
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {boolean} [bitmask] The bitmask of comparison flags.
 *  The bitmask may be composed of the following flags:
 *     1 - Unordered comparison
 *     2 - Partial comparison
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, bitmask, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = getTag(object);
    objTag = objTag == argsTag ? objectTag : objTag;
  }
  if (!othIsArr) {
    othTag = getTag(other);
    othTag = othTag == argsTag ? objectTag : othTag;
  }
  var objIsObj = objTag == objectTag && !isHostObject(object),
      othIsObj = othTag == objectTag && !isHostObject(other),
      isSameTag = objTag == othTag;

  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, equalFunc, customizer, bitmask, stack)
      : equalByTag(object, other, objTag, equalFunc, customizer, bitmask, stack);
  }
  if (!(bitmask & PARTIAL_COMPARE_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      stack || (stack = new Stack);
      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, equalFunc, customizer, bitmask, stack);
}

/**
 * The base implementation of `_.isMatch` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Object} source The object of property values to match.
 * @param {Array} matchData The property names, values, and compare flags to match.
 * @param {Function} [customizer] The function to customize comparisons.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, source, matchData, customizer) {
  var index = matchData.length,
      length = index,
      noCustomizer = !customizer;

  if (object == null) {
    return !length;
  }
  object = Object(object);
  while (index--) {
    var data = matchData[index];
    if ((noCustomizer && data[2])
          ? data[1] !== object[data[0]]
          : !(data[0] in object)
        ) {
      return false;
    }
  }
  while (++index < length) {
    data = matchData[index];
    var key = data[0],
        objValue = object[key],
        srcValue = data[1];

    if (noCustomizer && data[2]) {
      if (objValue === undefined && !(key in object)) {
        return false;
      }
    } else {
      var stack = new Stack,
          result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;

      if (!(result === undefined
            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
            : result
          )) {
        return false;
      }
    }
  }
  return true;
}

/**
 * The base implementation of `_.iteratee`.
 *
 * @private
 * @param {*} [value=_.identity] The value to convert to an iteratee.
 * @returns {Function} Returns the iteratee.
 */
function baseIteratee(value) {
  var type = typeof value;
  if (type == 'function') {
    return value;
  }
  if (value == null) {
    return identity;
  }
  if (type == 'object') {
    return isArray(value)
      ? baseMatchesProperty(value[0], value[1])
      : baseMatches(value);
  }
  return property(value);
}

/**
 * The base implementation of `_.keys` which doesn't skip the constructor
 * property of prototypes or treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  return nativeKeys(Object(object));
}

/**
 * The base implementation of `_.matches` which doesn't clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var matchData = getMatchData(source);
  if (matchData.length == 1 && matchData[0][2]) {
    var key = matchData[0][0],
        value = matchData[0][1];

    return function(object) {
      if (object == null) {
        return false;
      }
      return object[key] === value &&
        (value !== undefined || (key in Object(object)));
    };
  }
  return function(object) {
    return object === source || baseIsMatch(object, source, matchData);
  };
}

/**
 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
 *
 * @private
 * @param {string} path The path of the property to get.
 * @param {*} srcValue The value to match.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(path, srcValue) {
  return function(object) {
    var objValue = get(object, path);
    return (objValue === undefined && objValue === srcValue)
      ? hasIn(object, path)
      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
  };
}

/**
 * The base implementation of `_.property` without support for deep paths.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

/**
 * A specialized version of `baseProperty` which supports deep paths.
 *
 * @private
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 */
function basePropertyDeep(path) {
  return function(object) {
    return baseGet(object, path);
  };
}

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
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

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
  var index = -1,
      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked) {
    return stacked == other;
  }
  var result = true;
  stack.set(array, other);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (isUnordered) {
      if (!arraySome(other, function(othValue) {
            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
          })) {
        result = false;
        break;
      }
    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, equalFunc, customizer, bitmask, stack) {
  switch (tag) {
    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object) ? other != +other : object == +other;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      // Recursively compare objects (susceptible to call stack limits).
      return equalArrays(convert(object), convert(other), equalFunc, customizer, bitmask | UNORDERED_COMPARE_FLAG, stack.set(object, other));

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} customizer The function to customize comparisons.
 * @param {number} bitmask The bitmask of comparison flags. See `baseIsEqual` for more details.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
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
    if (!(isPartial ? key in other : baseHas(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  return result;
}

/**
 * Gets the "length" property value of `object`.
 *
 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
 * that affects Safari on at least iOS 8.1-8.3 ARM64.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {*} Returns the "length" value.
 */
var getLength = baseProperty('length');

/**
 * Gets the property names, values, and compare flags of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the match data of `object`.
 */
function getMatchData(object) {
  var result = toPairs(object),
      length = result.length;

  while (length--) {
    result[length][2] = isStrictComparable(result[length][1]);
  }
  return result;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = object[key];
  return isNative(value) ? value : undefined;
}

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function getTag(value) {
  return objectToString.call(value);
}

// Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
if ((Map && getTag(new Map) != mapTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : null,
        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case mapCtorString: return mapTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `path` exists on `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @param {Function} hasFunc The function to check properties.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 */
function hasPath(object, path, hasFunc) {
  if (object == null) {
    return false;
  }
  var result = hasFunc(object, path);
  if (!result && !isKey(path)) {
    path = baseCastPath(path);
    object = parent(object, path);
    if (object != null) {
      path = last(path);
      result = hasFunc(object, path);
    }
  }
  var length = object ? object.length : undefined;
  return result || (
    !!length && isLength(length) && isIndex(path, length) &&
    (isArray(object) || isString(object) || isArguments(object))
  );
}

/**
 * Creates an array of index keys for `object` values of arrays,
 * `arguments` objects, and strings, otherwise `null` is returned.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array|null} Returns index keys, else `null`.
 */
function indexKeys(object) {
  var length = object ? object.length : undefined;
  if (isLength(length) &&
      (isArray(object) || isString(object) || isArguments(object))) {
    return baseTimes(length, String);
  }
  return null;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (typeof value == 'number') {
    return true;
  }
  return !isArray(value) &&
    (reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
      (object != null && value in Object(object)));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return type == 'number' || type == 'boolean' ||
    (type == 'string' && value != '__proto__') || value == null;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && !isObject(value);
}

/**
 * Gets the parent value at `path` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} path The path to get the parent value of.
 * @returns {*} Returns the parent value.
 */
function parent(object, path) {
  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
function stringToPath(string) {
  var result = [];
  toString(string).replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
}

/**
 * Gets the last element of `array`.
 *
 * @static
 * @memberOf _
 * @category Array
 * @param {Array} array The array to query.
 * @returns {*} Returns the last element of `array`.
 * @example
 *
 * _.last([1, 2, 3]);
 * // => 3
 */
function last(array) {
  var length = array ? array.length : 0;
  return length ? array[length - 1] : undefined;
}

/**
 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var other = { 'user': 'fred' };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @type {Function}
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(getLength(value)) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8 which returns 'object' for typed array and weak map constructors,
  // and PhantomJS 1.9 which returns 'function' for `NodeList` instances.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (isFunction(value)) {
    return reIsNative.test(funcToString.call(value));
  }
  return isObjectLike(value) &&
    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
}

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' ||
    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
}

/**
 * Converts `value` to a string if it's not one. An empty string is returned
 * for `null` and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (value == null) {
    return '';
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined` the `defaultValue` is used in its place.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

/**
 * Checks if `path` is a direct or inherited property of `object`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path to check.
 * @returns {boolean} Returns `true` if `path` exists, else `false`.
 * @example
 *
 * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
 *
 * _.hasIn(object, 'a');
 * // => true
 *
 * _.hasIn(object, 'a.b.c');
 * // => true
 *
 * _.hasIn(object, ['a', 'b', 'c']);
 * // => true
 *
 * _.hasIn(object, 'b');
 * // => false
 */
function hasIn(object, path) {
  return hasPath(object, path, baseHasIn);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  var isProto = isPrototype(object);
  if (!(isProto || isArrayLike(object))) {
    return baseKeys(object);
  }
  var indexes = indexKeys(object),
      skipIndexes = !!indexes,
      result = indexes || [],
      length = result.length;

  for (var key in object) {
    if (baseHas(object, key) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
        !(isProto && key == 'constructor')) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates an array of own enumerable key-value pairs for `object` which
 * can be consumed by `_.fromPairs`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the new array of key-value pairs.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.toPairs(new Foo);
 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
 */
function toPairs(object) {
  return baseToPairs(object, keys(object));
}

/**
 * This method returns the first argument given to it.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

/**
 * Creates a function that returns the value at `path` of a given object.
 *
 * @static
 * @memberOf _
 * @category Util
 * @param {Array|string} path The path of the property to get.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var objects = [
 *   { 'a': { 'b': { 'c': 2 } } },
 *   { 'a': { 'b': { 'c': 1 } } }
 * ];
 *
 * _.map(objects, _.property('a.b.c'));
 * // => [2, 1]
 *
 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
 * // => [1, 2]
 */
function property(path) {
  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
}

// Avoid inheriting from `Object.prototype` when possible.
Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

// Add functions to the `MapCache`.
MapCache.prototype.clear = mapClear;
MapCache.prototype['delete'] = mapDelete;
MapCache.prototype.get = mapGet;
MapCache.prototype.has = mapHas;
MapCache.prototype.set = mapSet;

// Add functions to the `Stack` cache.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

module.exports = baseIteratee;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],8:[function(require,module,exports){
'use strict';

// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/mxjj6jom/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.Circle(container, {
    strokeWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
  });

  return bar;
}

module.exports = create;

},{"progressbar.js":28}],9:[function(require,module,exports){
'use strict';

// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/3pxvkq2d/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.Circle(container, {
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    duration: 1400,
    easing: 'bounce',
    strokeWidth: 6,
    from: { color: '#FFEA82', a: 0 },
    to: { color: '#ED6A5A', a: 1 },
    // Set default step function for all animate calls
    step: function step(state, circle) {
      circle.path.setAttribute('stroke', state.color);
    }
  });

  return bar;
}

module.exports = create;

},{"progressbar.js":28}],10:[function(require,module,exports){
'use strict';

// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/72tkyn40/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.Circle(container, {
    color: '#aaa',
    // This has to be the same size as the maximum width to
    // prevent clipping
    strokeWidth: 10,
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,

    text: {
      autoStyleContainer: false
    },
    from: { color: '#aaa', width: 1 },
    to: { color: '#333', width: 10 },
    // Set default step function for all animate calls
    step: function step(state, circle) {
      circle.path.setAttribute('stroke', state.color);
      circle.path.setAttribute('stroke-width', state.width);
      var value = Math.round(circle.value() * 100);
      if (value === 0) {
        circle.setText('');
      } else {
        circle.setText(value);
      }
    }
  });
  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar.text.style.fontSize = '2rem';

  return bar;
}

module.exports = create;

},{"progressbar.js":28}],11:[function(require,module,exports){
'use strict';

// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/dnLLgm5o/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(pathId) {
  var bar = new ProgressBar.Path(pathId, {
    easing: 'easeInOut',
    duration: 1400
  });

  return bar;
}

module.exports = create;

},{"progressbar.js":28}],12:[function(require,module,exports){
'use strict';

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.Circle(container, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
  });

  return bar;
}

module.exports = create;

},{"progressbar.js":28}],13:[function(require,module,exports){
'use strict';

var Square = require('../square');

function create(container) {
  var bar = new Square(container, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#ED6A5A',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
  });

  return bar;
}

module.exports = create;

},{"../square":22}],14:[function(require,module,exports){
'use strict';

var Triangle = require('../triangle');

function create(container) {
  var bar = new Triangle(container, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#0FA0CE',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
  });

  return bar;
}

module.exports = create;

},{"../triangle":23}],15:[function(require,module,exports){
'use strict';

// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/rfny4ftb/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.Line(container, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: { width: '100%', height: '100%' }
  });

  return bar;
}

module.exports = create;

},{"progressbar.js":28}],16:[function(require,module,exports){
'use strict';

// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/k5v2d0rr/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.Line(container, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: { width: '100%', height: '100%' },
    text: {
      style: {
        // Text color.
        // Default: same as stroke color (options.color)
        color: '#999',
        position: 'absolute',
        right: '0',
        top: '30px',
        padding: 0,
        margin: 0,
        transform: null
      },
      autoStyleContainer: false
    },
    from: { color: '#FFEA82' },
    to: { color: '#ED6A5A' },
    step: function step(state, bar) {
      bar.setText(Math.round(bar.value() * 100) + ' %');
    }
  });

  return bar;
}

module.exports = create;

},{"progressbar.js":28}],17:[function(require,module,exports){
'use strict';

// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/swc64gg3/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.Line(container, {
    strokeWidth: 4,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: { width: '100%', height: '100%' },
    from: { color: '#FFEA82' },
    to: { color: '#ED6A5A' },
    step: function step(state, bar) {
      bar.path.setAttribute('stroke', state.color);
    }
  });

  return bar;
}

module.exports = create;

},{"progressbar.js":28}],18:[function(require,module,exports){
'use strict';

// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/bs8ane6m/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.SemiCircle(container, {
    strokeWidth: 6,
    easing: 'easeInOut',
    duration: 1400,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    svgStyle: null
  });

  return bar;
}

module.exports = create;

},{"progressbar.js":28}],19:[function(require,module,exports){
'use strict';

// WARNING: When editing this file, remember to update the JSFiddle:
// https://jsfiddle.net/kimmobrunfeldt/sqwdkrg0/
// MAKE SURE TO SET THE NEW VERSION: "SET AS BASE"

var ProgressBar = require('progressbar.js');

function create(container) {
  var bar = new ProgressBar.SemiCircle(container, {
    strokeWidth: 8,
    color: '#FFEA82',
    trailColor: '#eee',
    trailWidth: 1,
    easing: 'easeInOut',
    duration: 1400,
    svgStyle: null,
    text: {
      value: '',
      alignToBottom: false
    },
    from: { color: '#FFEA82' },
    to: { color: '#ED6A5A' },
    // Set default step function for all animate calls
    step: function step(state, bar) {
      bar.path.setAttribute('stroke', state.color);
      var value = Math.round(bar.value() * 100);
      if (value === 0) {
        bar.setText('');
      } else {
        bar.setText(value);
      }

      bar.text.style.color = state.color;
    }
  });
  bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
  bar.text.style.fontSize = '2rem';

  return bar;
}

module.exports = create;

},{"progressbar.js":28}],20:[function(require,module,exports){
'use strict';

var _ = {
  map: require('lodash.map'),
  forEach: require('lodash.foreach')
};
var ProgressBar = require('progressbar.js');
window.ProgressBar = ProgressBar;
var introSquare = require('./examples/intro-square');
var introCircle = require('./examples/intro-circle');
var introTriangle = require('./examples/intro-triangle');
var initializeExamples = require('./init-examples');

function onLoad() {
  // Create a fake loading bar, just for a demo. :)
  var loadingBar = createLoadingBar();
  playFakeLoadingDemo(loadingBar);

  var playIntro = initializeIntro();
  var playExamples = initializeExamples();

  setTimeout(function () {
    playIntro();
    playExamples();
  }, 1500);
}

function initializeIntro() {
  var createBars = [introSquare, introCircle, introTriangle];
  var introBars = _.map(createBars, function (createBar, i) {
    return createBar('#intro-demo' + (i + 1));
  });

  setInterval(function () {
    _.forEach(introBars, function (bar) {
      return bar.set(0);
    });
    playIntroDemo(introBars);
  }, 5000);

  return function () {
    return playIntroDemo(introBars);
  };
}

function playIntroDemo(introBars) {
  _.forEach(introBars, function (bar) {
    return bar.animate(1);
  });
  var triangle = introBars[2];

  setTimeout(function () {
    triangle.path.style['stroke-linecap'] = 'round';
  }, 100);
}

function playFakeLoadingDemo(loadingBar) {
  setTimeout(function () {
    return loadingBar.animate(0.1);
  }, 20);
  setTimeout(function () {
    loadingBar.animate(1.0, {
      duration: 500,
      easing: 'easeIn'
    });
  }, 500);
  setTimeout(function () {
    return loadingBar.set(0);
  }, 1200);
}

function createLoadingBar() {
  return new ProgressBar.Line('#loading-bar', {
    color: '#0FA0CE',
    svgStyle: {
      width: '100%',
      height: '100%',
      display: 'block'
    }
  });
}

window.onload = onLoad;

},{"./examples/intro-circle":12,"./examples/intro-square":13,"./examples/intro-triangle":14,"./init-examples":21,"lodash.foreach":3,"lodash.map":5,"progressbar.js":28}],21:[function(require,module,exports){
'use strict';

var _ = {
  map: require('lodash.map'),
  forEach: require('lodash.foreach'),
  flatten: require('lodash.flatten')
};

var _require = require('./util');

var playLoop = _require.playLoop;

var examples = {
  line: [require('./examples/line-1'), require('./examples/line-2'), require('./examples/line-3')],
  circle: [require('./examples/circle-1'), require('./examples/circle-2'), require('./examples/circle-3')],
  semiCircle: [require('./examples/semi-circle-1'), require('./examples/semi-circle-2')],
  custom: [require('./examples/custom-1')]
};

function initialize() {
  var bars = _.flatten(_.map(examples, function (createBars, key) {
    return _.map(createBars, function (createBar, i) {
      return createBar('#example-' + key.toLowerCase() + '-' + (i + 1));
    });
  }));

  return function () {
    return _.forEach(bars, function (bar) {
      return playLoop(bar);
    });
  };
}

module.exports = initialize;

},{"./examples/circle-1":8,"./examples/circle-2":9,"./examples/circle-3":10,"./examples/custom-1":11,"./examples/line-1":15,"./examples/line-2":16,"./examples/line-3":17,"./examples/semi-circle-1":18,"./examples/semi-circle-2":19,"./util":24,"lodash.flatten":1,"lodash.foreach":3,"lodash.map":5}],22:[function(require,module,exports){
'use strict';

// Square shaped progress bar
// Note: Square is not core part of API anymore. It's left here
//       for reference. square is not included to the progressbar
//       build anymore

var _require = require('progressbar.js');

var utils = _require.utils;
var Shape = _require.Shape;


var Square = function Square(container, options) {
    this._pathTemplate = 'M 0,{halfOfStrokeWidth}' + ' L {width},{halfOfStrokeWidth}' + ' L {width},{width}' + ' L {halfOfStrokeWidth},{width}' + ' L {halfOfStrokeWidth},{strokeWidth}';

    this._trailTemplate = 'M {startMargin},{halfOfStrokeWidth}' + ' L {width},{halfOfStrokeWidth}' + ' L {width},{width}' + ' L {halfOfStrokeWidth},{width}' + ' L {halfOfStrokeWidth},{halfOfStrokeWidth}';

    Shape.apply(this, arguments);
};

Square.prototype = new Shape();
Square.prototype.constructor = Square;

Square.prototype._pathString = function _pathString(opts) {
    var w = 100 - opts.strokeWidth / 2;

    return utils.render(this._pathTemplate, {
        width: w,
        strokeWidth: opts.strokeWidth,
        halfOfStrokeWidth: opts.strokeWidth / 2
    });
};

Square.prototype._trailString = function _trailString(opts) {
    var w = 100 - opts.strokeWidth / 2;

    return utils.render(this._trailTemplate, {
        width: w,
        strokeWidth: opts.strokeWidth,
        halfOfStrokeWidth: opts.strokeWidth / 2,
        startMargin: opts.strokeWidth / 2 - opts.trailWidth / 2
    });
};

module.exports = Square;

},{"progressbar.js":28}],23:[function(require,module,exports){
'use strict';

// Triangle shaped progress bar

var _require = require('progressbar.js');

var utils = _require.utils;
var Shape = _require.Shape;


var Triangle = function Triangle(container, options) {
    this._pathTemplate = 'M 50,{center} L 98,{bottomCenter}' + ' L 2,{bottomCenter} L 50,{center}';
    Shape.apply(this, arguments);
};

Triangle.prototype = new Shape();
Triangle.prototype.constructor = Triangle;

Triangle.prototype._pathString = function _pathString(opts) {
    return utils.render(this._pathTemplate, {
        center: opts.strokeWidth / 2,
        bottomCenter: 100 - opts.strokeWidth / 2
    });
};

Triangle.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

module.exports = Triangle;

},{"progressbar.js":28}],24:[function(require,module,exports){
"use strict";

function playLoop(bar) {
  function animateBar() {
    bar.animate(1, function () {
      setTimeout(function () {
        bar.animate(0);
      }, 500);
    });
  }

  setInterval(function () {
    bar.set(0);
    animateBar();
  }, 4500);

  animateBar();
}

module.exports = {
  playLoop: playLoop
};

},{}],25:[function(require,module,exports){
/* shifty - v1.5.2 - 2016-02-10 - http://jeremyckahn.github.io/shifty */
;(function () {
  var root = this || Function('return this')();

/**
 * Shifty Core
 * By Jeremy Kahn - jeremyckahn@gmail.com
 */

var Tweenable = (function () {

  'use strict';

  // Aliases that get defined later in this function
  var formula;

  // CONSTANTS
  var DEFAULT_SCHEDULE_FUNCTION;
  var DEFAULT_EASING = 'linear';
  var DEFAULT_DURATION = 500;
  var UPDATE_TIME = 1000 / 60;

  var _now = Date.now
       ? Date.now
       : function () {return +new Date();};

  var now = typeof SHIFTY_DEBUG_NOW !== 'undefined' ? SHIFTY_DEBUG_NOW : _now;

  if (typeof window !== 'undefined') {
    // requestAnimationFrame() shim by Paul Irish (modified for Shifty)
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    DEFAULT_SCHEDULE_FUNCTION = window.requestAnimationFrame
       || window.webkitRequestAnimationFrame
       || window.oRequestAnimationFrame
       || window.msRequestAnimationFrame
       || (window.mozCancelRequestAnimationFrame
       && window.mozRequestAnimationFrame)
       || setTimeout;
  } else {
    DEFAULT_SCHEDULE_FUNCTION = setTimeout;
  }

  function noop () {
    // NOOP!
  }

  /**
   * Handy shortcut for doing a for-in loop. This is not a "normal" each
   * function, it is optimized for Shifty.  The iterator function only receives
   * the property name, not the value.
   * @param {Object} obj
   * @param {Function(string)} fn
   * @private
   */
  function each (obj, fn) {
    var key;
    for (key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
        fn(key);
      }
    }
  }

  /**
   * Perform a shallow copy of Object properties.
   * @param {Object} targetObject The object to copy into
   * @param {Object} srcObject The object to copy from
   * @return {Object} A reference to the augmented `targetObj` Object
   * @private
   */
  function shallowCopy (targetObj, srcObj) {
    each(srcObj, function (prop) {
      targetObj[prop] = srcObj[prop];
    });

    return targetObj;
  }

  /**
   * Copies each property from src onto target, but only if the property to
   * copy to target is undefined.
   * @param {Object} target Missing properties in this Object are filled in
   * @param {Object} src
   * @private
   */
  function defaults (target, src) {
    each(src, function (prop) {
      if (typeof target[prop] === 'undefined') {
        target[prop] = src[prop];
      }
    });
  }

  /**
   * Calculates the interpolated tween values of an Object for a given
   * timestamp.
   * @param {Number} forPosition The position to compute the state for.
   * @param {Object} currentState Current state properties.
   * @param {Object} originalState: The original state properties the Object is
   * tweening from.
   * @param {Object} targetState: The destination state properties the Object
   * is tweening to.
   * @param {number} duration: The length of the tween in milliseconds.
   * @param {number} timestamp: The UNIX epoch time at which the tween began.
   * @param {Object} easing: This Object's keys must correspond to the keys in
   * targetState.
   * @private
   */
  function tweenProps (forPosition, currentState, originalState, targetState,
    duration, timestamp, easing) {
    var normalizedPosition =
        forPosition < timestamp ? 0 : (forPosition - timestamp) / duration;


    var prop;
    var easingObjectProp;
    var easingFn;
    for (prop in currentState) {
      if (currentState.hasOwnProperty(prop)) {
        easingObjectProp = easing[prop];
        easingFn = typeof easingObjectProp === 'function'
          ? easingObjectProp
          : formula[easingObjectProp];

        currentState[prop] = tweenProp(
          originalState[prop],
          targetState[prop],
          easingFn,
          normalizedPosition
        );
      }
    }

    return currentState;
  }

  /**
   * Tweens a single property.
   * @param {number} start The value that the tween started from.
   * @param {number} end The value that the tween should end at.
   * @param {Function} easingFunc The easing curve to apply to the tween.
   * @param {number} position The normalized position (between 0.0 and 1.0) to
   * calculate the midpoint of 'start' and 'end' against.
   * @return {number} The tweened value.
   * @private
   */
  function tweenProp (start, end, easingFunc, position) {
    return start + (end - start) * easingFunc(position);
  }

  /**
   * Applies a filter to Tweenable instance.
   * @param {Tweenable} tweenable The `Tweenable` instance to call the filter
   * upon.
   * @param {String} filterName The name of the filter to apply.
   * @private
   */
  function applyFilter (tweenable, filterName) {
    var filters = Tweenable.prototype.filter;
    var args = tweenable._filterArgs;

    each(filters, function (name) {
      if (typeof filters[name][filterName] !== 'undefined') {
        filters[name][filterName].apply(tweenable, args);
      }
    });
  }

  var timeoutHandler_endTime;
  var timeoutHandler_currentTime;
  var timeoutHandler_isEnded;
  var timeoutHandler_offset;
  /**
   * Handles the update logic for one step of a tween.
   * @param {Tweenable} tweenable
   * @param {number} timestamp
   * @param {number} delay
   * @param {number} duration
   * @param {Object} currentState
   * @param {Object} originalState
   * @param {Object} targetState
   * @param {Object} easing
   * @param {Function(Object, *, number)} step
   * @param {Function(Function,number)}} schedule
   * @param {number=} opt_currentTimeOverride Needed for accurate timestamp in
   * Tweenable#seek.
   * @private
   */
  function timeoutHandler (tweenable, timestamp, delay, duration, currentState,
    originalState, targetState, easing, step, schedule,
    opt_currentTimeOverride) {

    timeoutHandler_endTime = timestamp + delay + duration;

    timeoutHandler_currentTime =
    Math.min(opt_currentTimeOverride || now(), timeoutHandler_endTime);

    timeoutHandler_isEnded =
      timeoutHandler_currentTime >= timeoutHandler_endTime;

    timeoutHandler_offset = duration - (
      timeoutHandler_endTime - timeoutHandler_currentTime);

    if (tweenable.isPlaying()) {
      if (timeoutHandler_isEnded) {
        step(targetState, tweenable._attachment, timeoutHandler_offset);
        tweenable.stop(true);
      } else {
        tweenable._scheduleId =
          schedule(tweenable._timeoutHandler, UPDATE_TIME);

        applyFilter(tweenable, 'beforeTween');

        // If the animation has not yet reached the start point (e.g., there was
        // delay that has not yet completed), just interpolate the starting
        // position of the tween.
        if (timeoutHandler_currentTime < (timestamp + delay)) {
          tweenProps(1, currentState, originalState, targetState, 1, 1, easing);
        } else {
          tweenProps(timeoutHandler_currentTime, currentState, originalState,
            targetState, duration, timestamp + delay, easing);
        }

        applyFilter(tweenable, 'afterTween');

        step(currentState, tweenable._attachment, timeoutHandler_offset);
      }
    }
  }


  /**
   * Creates a usable easing Object from a string, a function or another easing
   * Object.  If `easing` is an Object, then this function clones it and fills
   * in the missing properties with `"linear"`.
   * @param {Object.<string|Function>} fromTweenParams
   * @param {Object|string|Function} easing
   * @return {Object.<string|Function>}
   * @private
   */
  function composeEasingObject (fromTweenParams, easing) {
    var composedEasing = {};
    var typeofEasing = typeof easing;

    if (typeofEasing === 'string' || typeofEasing === 'function') {
      each(fromTweenParams, function (prop) {
        composedEasing[prop] = easing;
      });
    } else {
      each(fromTweenParams, function (prop) {
        if (!composedEasing[prop]) {
          composedEasing[prop] = easing[prop] || DEFAULT_EASING;
        }
      });
    }

    return composedEasing;
  }

  /**
   * Tweenable constructor.
   * @class Tweenable
   * @param {Object=} opt_initialState The values that the initial tween should
   * start at if a `from` object is not provided to `{{#crossLink
   * "Tweenable/tween:method"}}{{/crossLink}}` or `{{#crossLink
   * "Tweenable/setConfig:method"}}{{/crossLink}}`.
   * @param {Object=} opt_config Configuration object to be passed to
   * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
   * @module Tweenable
   * @constructor
   */
  function Tweenable (opt_initialState, opt_config) {
    this._currentState = opt_initialState || {};
    this._configured = false;
    this._scheduleFunction = DEFAULT_SCHEDULE_FUNCTION;

    // To prevent unnecessary calls to setConfig do not set default
    // configuration here.  Only set default configuration immediately before
    // tweening if none has been set.
    if (typeof opt_config !== 'undefined') {
      this.setConfig(opt_config);
    }
  }

  /**
   * Configure and start a tween.
   * @method tween
   * @param {Object=} opt_config Configuration object to be passed to
   * `{{#crossLink "Tweenable/setConfig:method"}}{{/crossLink}}`.
   * @chainable
   */
  Tweenable.prototype.tween = function (opt_config) {
    if (this._isTweening) {
      return this;
    }

    // Only set default config if no configuration has been set previously and
    // none is provided now.
    if (opt_config !== undefined || !this._configured) {
      this.setConfig(opt_config);
    }

    this._timestamp = now();
    this._start(this.get(), this._attachment);
    return this.resume();
  };

  /**
   * Configure a tween that will start at some point in the future.
   *
   * @method setConfig
   * @param {Object} config The following values are valid:
   * - __from__ (_Object=_): Starting position.  If omitted, `{{#crossLink
   *   "Tweenable/get:method"}}get(){{/crossLink}}` is used.
   * - __to__ (_Object=_): Ending position.
   * - __duration__ (_number=_): How many milliseconds to animate for.
   * - __delay__ (_delay=_): How many milliseconds to wait before starting the
   *   tween.
   * - __start__ (_Function(Object, *)_): Function to execute when the tween
   *   begins.  Receives the state of the tween as the first parameter and
   *   `attachment` as the second parameter.
   * - __step__ (_Function(Object, *, number)_): Function to execute on every
   *   tick.  Receives `{{#crossLink
   *   "Tweenable/get:method"}}get(){{/crossLink}}` as the first parameter,
   *   `attachment` as the second parameter, and the time elapsed since the
   *   start of the tween as the third. This function is not called on the
   *   final step of the animation, but `finish` is.
   * - __finish__ (_Function(Object, *)_): Function to execute upon tween
   *   completion.  Receives the state of the tween as the first parameter and
   *   `attachment` as the second parameter.
   * - __easing__ (_Object.<string|Function>|string|Function=_): Easing curve
   *   name(s) or function(s) to use for the tween.
   * - __attachment__ (_*_): Cached value that is passed to the
   *   `step`/`start`/`finish` methods.
   * @chainable
   */
  Tweenable.prototype.setConfig = function (config) {
    config = config || {};
    this._configured = true;

    // Attach something to this Tweenable instance (e.g.: a DOM element, an
    // object, a string, etc.);
    this._attachment = config.attachment;

    // Init the internal state
    this._pausedAtTime = null;
    this._scheduleId = null;
    this._delay = config.delay || 0;
    this._start = config.start || noop;
    this._step = config.step || noop;
    this._finish = config.finish || noop;
    this._duration = config.duration || DEFAULT_DURATION;
    this._currentState = shallowCopy({}, config.from) || this.get();
    this._originalState = this.get();
    this._targetState = shallowCopy({}, config.to) || this.get();

    var self = this;
    this._timeoutHandler = function () {
      timeoutHandler(self,
        self._timestamp,
        self._delay,
        self._duration,
        self._currentState,
        self._originalState,
        self._targetState,
        self._easing,
        self._step,
        self._scheduleFunction
      );
    };

    // Aliases used below
    var currentState = this._currentState;
    var targetState = this._targetState;

    // Ensure that there is always something to tween to.
    defaults(targetState, currentState);

    this._easing = composeEasingObject(
      currentState, config.easing || DEFAULT_EASING);

    this._filterArgs =
      [currentState, this._originalState, targetState, this._easing];

    applyFilter(this, 'tweenCreated');
    return this;
  };

  /**
   * @method get
   * @return {Object} The current state.
   */
  Tweenable.prototype.get = function () {
    return shallowCopy({}, this._currentState);
  };

  /**
   * @method set
   * @param {Object} state The current state.
   */
  Tweenable.prototype.set = function (state) {
    this._currentState = state;
  };

  /**
   * Pause a tween.  Paused tweens can be resumed from the point at which they
   * were paused.  This is different from `{{#crossLink
   * "Tweenable/stop:method"}}{{/crossLink}}`, as that method
   * causes a tween to start over when it is resumed.
   * @method pause
   * @chainable
   */
  Tweenable.prototype.pause = function () {
    this._pausedAtTime = now();
    this._isPaused = true;
    return this;
  };

  /**
   * Resume a paused tween.
   * @method resume
   * @chainable
   */
  Tweenable.prototype.resume = function () {
    if (this._isPaused) {
      this._timestamp += now() - this._pausedAtTime;
    }

    this._isPaused = false;
    this._isTweening = true;

    this._timeoutHandler();

    return this;
  };

  /**
   * Move the state of the animation to a specific point in the tween's
   * timeline.  If the animation is not running, this will cause the `step`
   * handlers to be called.
   * @method seek
   * @param {millisecond} millisecond The millisecond of the animation to seek
   * to.  This must not be less than `0`.
   * @chainable
   */
  Tweenable.prototype.seek = function (millisecond) {
    millisecond = Math.max(millisecond, 0);
    var currentTime = now();

    if ((this._timestamp + millisecond) === 0) {
      return this;
    }

    this._timestamp = currentTime - millisecond;

    if (!this.isPlaying()) {
      this._isTweening = true;
      this._isPaused = false;

      // If the animation is not running, call timeoutHandler to make sure that
      // any step handlers are run.
      timeoutHandler(this,
        this._timestamp,
        this._delay,
        this._duration,
        this._currentState,
        this._originalState,
        this._targetState,
        this._easing,
        this._step,
        this._scheduleFunction,
        currentTime
      );

      this.pause();
    }

    return this;
  };

  /**
   * Stops and cancels a tween.
   * @param {boolean=} gotoEnd If `false` or omitted, the tween just stops at
   * its current state, and the `finish` handler is not invoked.  If `true`,
   * the tweened object's values are instantly set to the target values, and
   * `finish` is invoked.
   * @method stop
   * @chainable
   */
  Tweenable.prototype.stop = function (gotoEnd) {
    this._isTweening = false;
    this._isPaused = false;
    this._timeoutHandler = noop;

    (root.cancelAnimationFrame            ||
    root.webkitCancelAnimationFrame     ||
    root.oCancelAnimationFrame          ||
    root.msCancelAnimationFrame         ||
    root.mozCancelRequestAnimationFrame ||
    root.clearTimeout)(this._scheduleId);

    if (gotoEnd) {
      applyFilter(this, 'beforeTween');
      tweenProps(
        1,
        this._currentState,
        this._originalState,
        this._targetState,
        1,
        0,
        this._easing
      );
      applyFilter(this, 'afterTween');
      applyFilter(this, 'afterTweenEnd');
      this._finish.call(this, this._currentState, this._attachment);
    }

    return this;
  };

  /**
   * @method isPlaying
   * @return {boolean} Whether or not a tween is running.
   */
  Tweenable.prototype.isPlaying = function () {
    return this._isTweening && !this._isPaused;
  };

  /**
   * Set a custom schedule function.
   *
   * If a custom function is not set,
   * [`requestAnimationFrame`](https://developer.mozilla.org/en-US/docs/Web/API/window.requestAnimationFrame)
   * is used if available, otherwise
   * [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/Window.setTimeout)
   * is used.
   * @method setScheduleFunction
   * @param {Function(Function,number)} scheduleFunction The function to be
   * used to schedule the next frame to be rendered.
   */
  Tweenable.prototype.setScheduleFunction = function (scheduleFunction) {
    this._scheduleFunction = scheduleFunction;
  };

  /**
   * `delete` all "own" properties.  Call this when the `Tweenable` instance
   * is no longer needed to free memory.
   * @method dispose
   */
  Tweenable.prototype.dispose = function () {
    var prop;
    for (prop in this) {
      if (this.hasOwnProperty(prop)) {
        delete this[prop];
      }
    }
  };

  /**
   * Filters are used for transforming the properties of a tween at various
   * points in a Tweenable's life cycle.  See the README for more info on this.
   * @private
   */
  Tweenable.prototype.filter = {};

  /**
   * This object contains all of the tweens available to Shifty.  It is
   * extensible - simply attach properties to the `Tweenable.prototype.formula`
   * Object following the same format as `linear`.
   *
   * `pos` should be a normalized `number` (between 0 and 1).
   * @property formula
   * @type {Object(function)}
   */
  Tweenable.prototype.formula = {
    linear: function (pos) {
      return pos;
    }
  };

  formula = Tweenable.prototype.formula;

  shallowCopy(Tweenable, {
    'now': now
    ,'each': each
    ,'tweenProps': tweenProps
    ,'tweenProp': tweenProp
    ,'applyFilter': applyFilter
    ,'shallowCopy': shallowCopy
    ,'defaults': defaults
    ,'composeEasingObject': composeEasingObject
  });

  // `root` is provided in the intro/outro files.

  // A hook used for unit testing.
  if (typeof SHIFTY_DEBUG_NOW === 'function') {
    root.timeoutHandler = timeoutHandler;
  }

  // Bootstrap Tweenable appropriately for the environment.
  if (typeof exports === 'object') {
    // CommonJS
    module.exports = Tweenable;
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define(function () {return Tweenable;});
  } else if (typeof root.Tweenable === 'undefined') {
    // Browser: Make `Tweenable` globally accessible.
    root.Tweenable = Tweenable;
  }

  return Tweenable;

} ());

/*!
 * All equations are adapted from Thomas Fuchs'
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/penner.js).
 *
 * Based on Easing Equations (c) 2003 [Robert
 * Penner](http://www.robertpenner.com/), all rights reserved. This work is
 * [subject to terms](http://www.robertpenner.com/easing_terms_of_use.html).
 */

/*!
 *  TERMS OF USE - EASING EQUATIONS
 *  Open source under the BSD License.
 *  Easing Equations (c) 2003 Robert Penner, all rights reserved.
 */

;(function () {

  Tweenable.shallowCopy(Tweenable.prototype.formula, {
    easeInQuad: function (pos) {
      return Math.pow(pos, 2);
    },

    easeOutQuad: function (pos) {
      return -(Math.pow((pos - 1), 2) - 1);
    },

    easeInOutQuad: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,2);}
      return -0.5 * ((pos -= 2) * pos - 2);
    },

    easeInCubic: function (pos) {
      return Math.pow(pos, 3);
    },

    easeOutCubic: function (pos) {
      return (Math.pow((pos - 1), 3) + 1);
    },

    easeInOutCubic: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,3);}
      return 0.5 * (Math.pow((pos - 2),3) + 2);
    },

    easeInQuart: function (pos) {
      return Math.pow(pos, 4);
    },

    easeOutQuart: function (pos) {
      return -(Math.pow((pos - 1), 4) - 1);
    },

    easeInOutQuart: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,4);}
      return -0.5 * ((pos -= 2) * Math.pow(pos,3) - 2);
    },

    easeInQuint: function (pos) {
      return Math.pow(pos, 5);
    },

    easeOutQuint: function (pos) {
      return (Math.pow((pos - 1), 5) + 1);
    },

    easeInOutQuint: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,5);}
      return 0.5 * (Math.pow((pos - 2),5) + 2);
    },

    easeInSine: function (pos) {
      return -Math.cos(pos * (Math.PI / 2)) + 1;
    },

    easeOutSine: function (pos) {
      return Math.sin(pos * (Math.PI / 2));
    },

    easeInOutSine: function (pos) {
      return (-0.5 * (Math.cos(Math.PI * pos) - 1));
    },

    easeInExpo: function (pos) {
      return (pos === 0) ? 0 : Math.pow(2, 10 * (pos - 1));
    },

    easeOutExpo: function (pos) {
      return (pos === 1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    },

    easeInOutExpo: function (pos) {
      if (pos === 0) {return 0;}
      if (pos === 1) {return 1;}
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(2,10 * (pos - 1));}
      return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
    },

    easeInCirc: function (pos) {
      return -(Math.sqrt(1 - (pos * pos)) - 1);
    },

    easeOutCirc: function (pos) {
      return Math.sqrt(1 - Math.pow((pos - 1), 2));
    },

    easeInOutCirc: function (pos) {
      if ((pos /= 0.5) < 1) {return -0.5 * (Math.sqrt(1 - pos * pos) - 1);}
      return 0.5 * (Math.sqrt(1 - (pos -= 2) * pos) + 1);
    },

    easeOutBounce: function (pos) {
      if ((pos) < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      } else if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      } else if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      } else {
        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
      }
    },

    easeInBack: function (pos) {
      var s = 1.70158;
      return (pos) * pos * ((s + 1) * pos - s);
    },

    easeOutBack: function (pos) {
      var s = 1.70158;
      return (pos = pos - 1) * pos * ((s + 1) * pos + s) + 1;
    },

    easeInOutBack: function (pos) {
      var s = 1.70158;
      if ((pos /= 0.5) < 1) {
        return 0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s));
      }
      return 0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
    },

    elastic: function (pos) {
      // jshint maxlen:90
      return -1 * Math.pow(4,-8 * pos) * Math.sin((pos * 6 - 1) * (2 * Math.PI) / 2) + 1;
    },

    swingFromTo: function (pos) {
      var s = 1.70158;
      return ((pos /= 0.5) < 1) ?
          0.5 * (pos * pos * (((s *= (1.525)) + 1) * pos - s)) :
          0.5 * ((pos -= 2) * pos * (((s *= (1.525)) + 1) * pos + s) + 2);
    },

    swingFrom: function (pos) {
      var s = 1.70158;
      return pos * pos * ((s + 1) * pos - s);
    },

    swingTo: function (pos) {
      var s = 1.70158;
      return (pos -= 1) * pos * ((s + 1) * pos + s) + 1;
    },

    bounce: function (pos) {
      if (pos < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      } else if (pos < (2 / 2.75)) {
        return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      } else if (pos < (2.5 / 2.75)) {
        return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      } else {
        return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
      }
    },

    bouncePast: function (pos) {
      if (pos < (1 / 2.75)) {
        return (7.5625 * pos * pos);
      } else if (pos < (2 / 2.75)) {
        return 2 - (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
      } else if (pos < (2.5 / 2.75)) {
        return 2 - (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
      } else {
        return 2 - (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
      }
    },

    easeFromTo: function (pos) {
      if ((pos /= 0.5) < 1) {return 0.5 * Math.pow(pos,4);}
      return -0.5 * ((pos -= 2) * Math.pow(pos,3) - 2);
    },

    easeFrom: function (pos) {
      return Math.pow(pos,4);
    },

    easeTo: function (pos) {
      return Math.pow(pos,0.25);
    }
  });

}());

// jshint maxlen:100
/**
 * The Bezier magic in this file is adapted/copied almost wholesale from
 * [Scripty2](https://github.com/madrobby/scripty2/blob/master/src/effects/transitions/cubic-bezier.js),
 * which was adapted from Apple code (which probably came from
 * [here](http://opensource.apple.com/source/WebCore/WebCore-955.66/platform/graphics/UnitBezier.h)).
 * Special thanks to Apple and Thomas Fuchs for much of this code.
 */

/**
 *  Copyright (c) 2006 Apple Computer, Inc. All rights reserved.
 *
 *  Redistribution and use in source and binary forms, with or without
 *  modification, are permitted provided that the following conditions are met:
 *
 *  1. Redistributions of source code must retain the above copyright notice,
 *  this list of conditions and the following disclaimer.
 *
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation
 *  and/or other materials provided with the distribution.
 *
 *  3. Neither the name of the copyright holder(s) nor the names of any
 *  contributors may be used to endorse or promote products derived from
 *  this software without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 *  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 *  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 *  ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 *  LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 *  CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 *  SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 *  INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 *  CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */
;(function () {
  // port of webkit cubic bezier handling by http://www.netzgesta.de/dev/
  function cubicBezierAtTime(t,p1x,p1y,p2x,p2y,duration) {
    var ax = 0,bx = 0,cx = 0,ay = 0,by = 0,cy = 0;
    function sampleCurveX(t) {
      return ((ax * t + bx) * t + cx) * t;
    }
    function sampleCurveY(t) {
      return ((ay * t + by) * t + cy) * t;
    }
    function sampleCurveDerivativeX(t) {
      return (3.0 * ax * t + 2.0 * bx) * t + cx;
    }
    function solveEpsilon(duration) {
      return 1.0 / (200.0 * duration);
    }
    function solve(x,epsilon) {
      return sampleCurveY(solveCurveX(x, epsilon));
    }
    function fabs(n) {
      if (n >= 0) {
        return n;
      } else {
        return 0 - n;
      }
    }
    function solveCurveX(x, epsilon) {
      var t0,t1,t2,x2,d2,i;
      for (t2 = x, i = 0; i < 8; i++) {
        x2 = sampleCurveX(t2) - x;
        if (fabs(x2) < epsilon) {
          return t2;
        }
        d2 = sampleCurveDerivativeX(t2);
        if (fabs(d2) < 1e-6) {
          break;
        }
        t2 = t2 - x2 / d2;
      }
      t0 = 0.0;
      t1 = 1.0;
      t2 = x;
      if (t2 < t0) {
        return t0;
      }
      if (t2 > t1) {
        return t1;
      }
      while (t0 < t1) {
        x2 = sampleCurveX(t2);
        if (fabs(x2 - x) < epsilon) {
          return t2;
        }
        if (x > x2) {
          t0 = t2;
        }else {
          t1 = t2;
        }
        t2 = (t1 - t0) * 0.5 + t0;
      }
      return t2; // Failure.
    }
    cx = 3.0 * p1x;
    bx = 3.0 * (p2x - p1x) - cx;
    ax = 1.0 - cx - bx;
    cy = 3.0 * p1y;
    by = 3.0 * (p2y - p1y) - cy;
    ay = 1.0 - cy - by;
    return solve(t, solveEpsilon(duration));
  }
  /**
   *  getCubicBezierTransition(x1, y1, x2, y2) -> Function
   *
   *  Generates a transition easing function that is compatible
   *  with WebKit's CSS transitions `-webkit-transition-timing-function`
   *  CSS property.
   *
   *  The W3C has more information about CSS3 transition timing functions:
   *  http://www.w3.org/TR/css3-transitions/#transition-timing-function_tag
   *
   *  @param {number} x1
   *  @param {number} y1
   *  @param {number} x2
   *  @param {number} y2
   *  @return {function}
   *  @private
   */
  function getCubicBezierTransition (x1, y1, x2, y2) {
    return function (pos) {
      return cubicBezierAtTime(pos,x1,y1,x2,y2,1);
    };
  }
  // End ported code

  /**
   * Create a Bezier easing function and attach it to `{{#crossLink
   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  This
   * function gives you total control over the easing curve.  Matthew Lein's
   * [Ceaser](http://matthewlein.com/ceaser/) is a useful tool for visualizing
   * the curves you can make with this function.
   * @method setBezierFunction
   * @param {string} name The name of the easing curve.  Overwrites the old
   * easing function on `{{#crossLink
   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}` if it
   * exists.
   * @param {number} x1
   * @param {number} y1
   * @param {number} x2
   * @param {number} y2
   * @return {function} The easing function that was attached to
   * Tweenable.prototype.formula.
   */
  Tweenable.setBezierFunction = function (name, x1, y1, x2, y2) {
    var cubicBezierTransition = getCubicBezierTransition(x1, y1, x2, y2);
    cubicBezierTransition.displayName = name;
    cubicBezierTransition.x1 = x1;
    cubicBezierTransition.y1 = y1;
    cubicBezierTransition.x2 = x2;
    cubicBezierTransition.y2 = y2;

    return Tweenable.prototype.formula[name] = cubicBezierTransition;
  };


  /**
   * `delete` an easing function from `{{#crossLink
   * "Tweenable/formula:property"}}Tweenable#formula{{/crossLink}}`.  Be
   * careful with this method, as it `delete`s whatever easing formula matches
   * `name` (which means you can delete standard Shifty easing functions).
   * @method unsetBezierFunction
   * @param {string} name The name of the easing function to delete.
   * @return {function}
   */
  Tweenable.unsetBezierFunction = function (name) {
    delete Tweenable.prototype.formula[name];
  };

})();

;(function () {

  function getInterpolatedValues (
    from, current, targetState, position, easing, delay) {
    return Tweenable.tweenProps(
      position, current, from, targetState, 1, delay, easing);
  }

  // Fake a Tweenable and patch some internals.  This approach allows us to
  // skip uneccessary processing and object recreation, cutting down on garbage
  // collection pauses.
  var mockTweenable = new Tweenable();
  mockTweenable._filterArgs = [];

  /**
   * Compute the midpoint of two Objects.  This method effectively calculates a
   * specific frame of animation that `{{#crossLink
   * "Tweenable/tween:method"}}{{/crossLink}}` does many times over the course
   * of a full tween.
   *
   *     var interpolatedValues = Tweenable.interpolate({
   *       width: '100px',
   *       opacity: 0,
   *       color: '#fff'
   *     }, {
   *       width: '200px',
   *       opacity: 1,
   *       color: '#000'
   *     }, 0.5);
   *
   *     console.log(interpolatedValues);
   *     // {opacity: 0.5, width: "150px", color: "rgb(127,127,127)"}
   *
   * @static
   * @method interpolate
   * @param {Object} from The starting values to tween from.
   * @param {Object} targetState The ending values to tween to.
   * @param {number} position The normalized position value (between `0.0` and
   * `1.0`) to interpolate the values between `from` and `to` for.  `from`
   * represents `0` and `to` represents `1`.
   * @param {Object.<string|Function>|string|Function} easing The easing
   * curve(s) to calculate the midpoint against.  You can reference any easing
   * function attached to `Tweenable.prototype.formula`, or provide the easing
   * function(s) directly.  If omitted, this defaults to "linear".
   * @param {number=} opt_delay Optional delay to pad the beginning of the
   * interpolated tween with.  This increases the range of `position` from (`0`
   * through `1`) to (`0` through `1 + opt_delay`).  So, a delay of `0.5` would
   * increase all valid values of `position` to numbers between `0` and `1.5`.
   * @return {Object}
   */
  Tweenable.interpolate = function (
    from, targetState, position, easing, opt_delay) {

    var current = Tweenable.shallowCopy({}, from);
    var delay = opt_delay || 0;
    var easingObject = Tweenable.composeEasingObject(
      from, easing || 'linear');

    mockTweenable.set({});

    // Alias and reuse the _filterArgs array instead of recreating it.
    var filterArgs = mockTweenable._filterArgs;
    filterArgs.length = 0;
    filterArgs[0] = current;
    filterArgs[1] = from;
    filterArgs[2] = targetState;
    filterArgs[3] = easingObject;

    // Any defined value transformation must be applied
    Tweenable.applyFilter(mockTweenable, 'tweenCreated');
    Tweenable.applyFilter(mockTweenable, 'beforeTween');

    var interpolatedValues = getInterpolatedValues(
      from, current, targetState, position, easingObject, delay);

    // Transform values back into their original format
    Tweenable.applyFilter(mockTweenable, 'afterTween');

    return interpolatedValues;
  };

}());

/**
 * This module adds string interpolation support to Shifty.
 *
 * The Token extension allows Shifty to tween numbers inside of strings.  Among
 * other things, this allows you to animate CSS properties.  For example, you
 * can do this:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { transform: 'translateX(45px)' },
 *       to: { transform: 'translateX(90xp)' }
 *     });
 *
 * `translateX(45)` will be tweened to `translateX(90)`.  To demonstrate:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { transform: 'translateX(45px)' },
 *       to: { transform: 'translateX(90px)' },
 *       step: function (state) {
 *         console.log(state.transform);
 *       }
 *     });
 *
 * The above snippet will log something like this in the console:
 *
 *     translateX(60.3px)
 *     ...
 *     translateX(76.05px)
 *     ...
 *     translateX(90px)
 *
 * Another use for this is animating colors:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { color: 'rgb(0,255,0)' },
 *       to: { color: 'rgb(255,0,255)' },
 *       step: function (state) {
 *         console.log(state.color);
 *       }
 *     });
 *
 * The above snippet will log something like this:
 *
 *     rgb(84,170,84)
 *     ...
 *     rgb(170,84,170)
 *     ...
 *     rgb(255,0,255)
 *
 * This extension also supports hexadecimal colors, in both long (`#ff00ff`)
 * and short (`#f0f`) forms.  Be aware that hexadecimal input values will be
 * converted into the equivalent RGB output values.  This is done to optimize
 * for performance.
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { color: '#0f0' },
 *       to: { color: '#f0f' },
 *       step: function (state) {
 *         console.log(state.color);
 *       }
 *     });
 *
 * This snippet will generate the same output as the one before it because
 * equivalent values were supplied (just in hexadecimal form rather than RGB):
 *
 *     rgb(84,170,84)
 *     ...
 *     rgb(170,84,170)
 *     ...
 *     rgb(255,0,255)
 *
 * ## Easing support
 *
 * Easing works somewhat differently in the Token extension.  This is because
 * some CSS properties have multiple values in them, and you might need to
 * tween each value along its own easing curve.  A basic example:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { transform: 'translateX(0px) translateY(0px)' },
 *       to: { transform:   'translateX(100px) translateY(100px)' },
 *       easing: { transform: 'easeInQuad' },
 *       step: function (state) {
 *         console.log(state.transform);
 *       }
 *     });
 *
 * The above snippet will create values like this:
 *
 *     translateX(11.56px) translateY(11.56px)
 *     ...
 *     translateX(46.24px) translateY(46.24px)
 *     ...
 *     translateX(100px) translateY(100px)
 *
 * In this case, the values for `translateX` and `translateY` are always the
 * same for each step of the tween, because they have the same start and end
 * points and both use the same easing curve.  We can also tween `translateX`
 * and `translateY` along independent curves:
 *
 *     var tweenable = new Tweenable();
 *     tweenable.tween({
 *       from: { transform: 'translateX(0px) translateY(0px)' },
 *       to: { transform:   'translateX(100px) translateY(100px)' },
 *       easing: { transform: 'easeInQuad bounce' },
 *       step: function (state) {
 *         console.log(state.transform);
 *       }
 *     });
 *
 * The above snippet will create values like this:
 *
 *     translateX(10.89px) translateY(82.35px)
 *     ...
 *     translateX(44.89px) translateY(86.73px)
 *     ...
 *     translateX(100px) translateY(100px)
 *
 * `translateX` and `translateY` are not in sync anymore, because `easeInQuad`
 * was specified for `translateX` and `bounce` for `translateY`.  Mixing and
 * matching easing curves can make for some interesting motion in your
 * animations.
 *
 * The order of the space-separated easing curves correspond the token values
 * they apply to.  If there are more token values than easing curves listed,
 * the last easing curve listed is used.
 * @submodule Tweenable.token
 */

// token function is defined above only so that dox-foundation sees it as
// documentation and renders it.  It is never used, and is optimized away at
// build time.

;(function (Tweenable) {

  /**
   * @typedef {{
   *   formatString: string
   *   chunkNames: Array.<string>
   * }}
   * @private
   */
  var formatManifest;

  // CONSTANTS

  var R_NUMBER_COMPONENT = /(\d|\-|\.)/;
  var R_FORMAT_CHUNKS = /([^\-0-9\.]+)/g;
  var R_UNFORMATTED_VALUES = /[0-9.\-]+/g;
  var R_RGB = new RegExp(
    'rgb\\(' + R_UNFORMATTED_VALUES.source +
    (/,\s*/.source) + R_UNFORMATTED_VALUES.source +
    (/,\s*/.source) + R_UNFORMATTED_VALUES.source + '\\)', 'g');
  var R_RGB_PREFIX = /^.*\(/;
  var R_HEX = /#([0-9]|[a-f]){3,6}/gi;
  var VALUE_PLACEHOLDER = 'VAL';

  // HELPERS

  /**
   * @param {Array.number} rawValues
   * @param {string} prefix
   *
   * @return {Array.<string>}
   * @private
   */
  function getFormatChunksFrom (rawValues, prefix) {
    var accumulator = [];

    var rawValuesLength = rawValues.length;
    var i;

    for (i = 0; i < rawValuesLength; i++) {
      accumulator.push('_' + prefix + '_' + i);
    }

    return accumulator;
  }

  /**
   * @param {string} formattedString
   *
   * @return {string}
   * @private
   */
  function getFormatStringFrom (formattedString) {
    var chunks = formattedString.match(R_FORMAT_CHUNKS);

    if (!chunks) {
      // chunks will be null if there were no tokens to parse in
      // formattedString (for example, if formattedString is '2').  Coerce
      // chunks to be useful here.
      chunks = ['', ''];

      // If there is only one chunk, assume that the string is a number
      // followed by a token...
      // NOTE: This may be an unwise assumption.
    } else if (chunks.length === 1 ||
      // ...or if the string starts with a number component (".", "-", or a
      // digit)...
    formattedString[0].match(R_NUMBER_COMPONENT)) {
      // ...prepend an empty string here to make sure that the formatted number
      // is properly replaced by VALUE_PLACEHOLDER
      chunks.unshift('');
    }

    return chunks.join(VALUE_PLACEHOLDER);
  }

  /**
   * Convert all hex color values within a string to an rgb string.
   *
   * @param {Object} stateObject
   *
   * @return {Object} The modified obj
   * @private
   */
  function sanitizeObjectForHexProps (stateObject) {
    Tweenable.each(stateObject, function (prop) {
      var currentProp = stateObject[prop];

      if (typeof currentProp === 'string' && currentProp.match(R_HEX)) {
        stateObject[prop] = sanitizeHexChunksToRGB(currentProp);
      }
    });
  }

  /**
   * @param {string} str
   *
   * @return {string}
   * @private
   */
  function  sanitizeHexChunksToRGB (str) {
    return filterStringChunks(R_HEX, str, convertHexToRGB);
  }

  /**
   * @param {string} hexString
   *
   * @return {string}
   * @private
   */
  function convertHexToRGB (hexString) {
    var rgbArr = hexToRGBArray(hexString);
    return 'rgb(' + rgbArr[0] + ',' + rgbArr[1] + ',' + rgbArr[2] + ')';
  }

  var hexToRGBArray_returnArray = [];
  /**
   * Convert a hexadecimal string to an array with three items, one each for
   * the red, blue, and green decimal values.
   *
   * @param {string} hex A hexadecimal string.
   *
   * @returns {Array.<number>} The converted Array of RGB values if `hex` is a
   * valid string, or an Array of three 0's.
   * @private
   */
  function hexToRGBArray (hex) {

    hex = hex.replace(/#/, '');

    // If the string is a shorthand three digit hex notation, normalize it to
    // the standard six digit notation
    if (hex.length === 3) {
      hex = hex.split('');
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }

    hexToRGBArray_returnArray[0] = hexToDec(hex.substr(0, 2));
    hexToRGBArray_returnArray[1] = hexToDec(hex.substr(2, 2));
    hexToRGBArray_returnArray[2] = hexToDec(hex.substr(4, 2));

    return hexToRGBArray_returnArray;
  }

  /**
   * Convert a base-16 number to base-10.
   *
   * @param {Number|String} hex The value to convert
   *
   * @returns {Number} The base-10 equivalent of `hex`.
   * @private
   */
  function hexToDec (hex) {
    return parseInt(hex, 16);
  }

  /**
   * Runs a filter operation on all chunks of a string that match a RegExp
   *
   * @param {RegExp} pattern
   * @param {string} unfilteredString
   * @param {function(string)} filter
   *
   * @return {string}
   * @private
   */
  function filterStringChunks (pattern, unfilteredString, filter) {
    var pattenMatches = unfilteredString.match(pattern);
    var filteredString = unfilteredString.replace(pattern, VALUE_PLACEHOLDER);

    if (pattenMatches) {
      var pattenMatchesLength = pattenMatches.length;
      var currentChunk;

      for (var i = 0; i < pattenMatchesLength; i++) {
        currentChunk = pattenMatches.shift();
        filteredString = filteredString.replace(
          VALUE_PLACEHOLDER, filter(currentChunk));
      }
    }

    return filteredString;
  }

  /**
   * Check for floating point values within rgb strings and rounds them.
   *
   * @param {string} formattedString
   *
   * @return {string}
   * @private
   */
  function sanitizeRGBChunks (formattedString) {
    return filterStringChunks(R_RGB, formattedString, sanitizeRGBChunk);
  }

  /**
   * @param {string} rgbChunk
   *
   * @return {string}
   * @private
   */
  function sanitizeRGBChunk (rgbChunk) {
    var numbers = rgbChunk.match(R_UNFORMATTED_VALUES);
    var numbersLength = numbers.length;
    var sanitizedString = rgbChunk.match(R_RGB_PREFIX)[0];

    for (var i = 0; i < numbersLength; i++) {
      sanitizedString += parseInt(numbers[i], 10) + ',';
    }

    sanitizedString = sanitizedString.slice(0, -1) + ')';

    return sanitizedString;
  }

  /**
   * @param {Object} stateObject
   *
   * @return {Object} An Object of formatManifests that correspond to
   * the string properties of stateObject
   * @private
   */
  function getFormatManifests (stateObject) {
    var manifestAccumulator = {};

    Tweenable.each(stateObject, function (prop) {
      var currentProp = stateObject[prop];

      if (typeof currentProp === 'string') {
        var rawValues = getValuesFrom(currentProp);

        manifestAccumulator[prop] = {
          'formatString': getFormatStringFrom(currentProp)
          ,'chunkNames': getFormatChunksFrom(rawValues, prop)
        };
      }
    });

    return manifestAccumulator;
  }

  /**
   * @param {Object} stateObject
   * @param {Object} formatManifests
   * @private
   */
  function expandFormattedProperties (stateObject, formatManifests) {
    Tweenable.each(formatManifests, function (prop) {
      var currentProp = stateObject[prop];
      var rawValues = getValuesFrom(currentProp);
      var rawValuesLength = rawValues.length;

      for (var i = 0; i < rawValuesLength; i++) {
        stateObject[formatManifests[prop].chunkNames[i]] = +rawValues[i];
      }

      delete stateObject[prop];
    });
  }

  /**
   * @param {Object} stateObject
   * @param {Object} formatManifests
   * @private
   */
  function collapseFormattedProperties (stateObject, formatManifests) {
    Tweenable.each(formatManifests, function (prop) {
      var currentProp = stateObject[prop];
      var formatChunks = extractPropertyChunks(
        stateObject, formatManifests[prop].chunkNames);
      var valuesList = getValuesList(
        formatChunks, formatManifests[prop].chunkNames);
      currentProp = getFormattedValues(
        formatManifests[prop].formatString, valuesList);
      stateObject[prop] = sanitizeRGBChunks(currentProp);
    });
  }

  /**
   * @param {Object} stateObject
   * @param {Array.<string>} chunkNames
   *
   * @return {Object} The extracted value chunks.
   * @private
   */
  function extractPropertyChunks (stateObject, chunkNames) {
    var extractedValues = {};
    var currentChunkName, chunkNamesLength = chunkNames.length;

    for (var i = 0; i < chunkNamesLength; i++) {
      currentChunkName = chunkNames[i];
      extractedValues[currentChunkName] = stateObject[currentChunkName];
      delete stateObject[currentChunkName];
    }

    return extractedValues;
  }

  var getValuesList_accumulator = [];
  /**
   * @param {Object} stateObject
   * @param {Array.<string>} chunkNames
   *
   * @return {Array.<number>}
   * @private
   */
  function getValuesList (stateObject, chunkNames) {
    getValuesList_accumulator.length = 0;
    var chunkNamesLength = chunkNames.length;

    for (var i = 0; i < chunkNamesLength; i++) {
      getValuesList_accumulator.push(stateObject[chunkNames[i]]);
    }

    return getValuesList_accumulator;
  }

  /**
   * @param {string} formatString
   * @param {Array.<number>} rawValues
   *
   * @return {string}
   * @private
   */
  function getFormattedValues (formatString, rawValues) {
    var formattedValueString = formatString;
    var rawValuesLength = rawValues.length;

    for (var i = 0; i < rawValuesLength; i++) {
      formattedValueString = formattedValueString.replace(
        VALUE_PLACEHOLDER, +rawValues[i].toFixed(4));
    }

    return formattedValueString;
  }

  /**
   * Note: It's the duty of the caller to convert the Array elements of the
   * return value into numbers.  This is a performance optimization.
   *
   * @param {string} formattedString
   *
   * @return {Array.<string>|null}
   * @private
   */
  function getValuesFrom (formattedString) {
    return formattedString.match(R_UNFORMATTED_VALUES);
  }

  /**
   * @param {Object} easingObject
   * @param {Object} tokenData
   * @private
   */
  function expandEasingObject (easingObject, tokenData) {
    Tweenable.each(tokenData, function (prop) {
      var currentProp = tokenData[prop];
      var chunkNames = currentProp.chunkNames;
      var chunkLength = chunkNames.length;

      var easing = easingObject[prop];
      var i;

      if (typeof easing === 'string') {
        var easingChunks = easing.split(' ');
        var lastEasingChunk = easingChunks[easingChunks.length - 1];

        for (i = 0; i < chunkLength; i++) {
          easingObject[chunkNames[i]] = easingChunks[i] || lastEasingChunk;
        }

      } else {
        for (i = 0; i < chunkLength; i++) {
          easingObject[chunkNames[i]] = easing;
        }
      }

      delete easingObject[prop];
    });
  }

  /**
   * @param {Object} easingObject
   * @param {Object} tokenData
   * @private
   */
  function collapseEasingObject (easingObject, tokenData) {
    Tweenable.each(tokenData, function (prop) {
      var currentProp = tokenData[prop];
      var chunkNames = currentProp.chunkNames;
      var chunkLength = chunkNames.length;

      var firstEasing = easingObject[chunkNames[0]];
      var typeofEasings = typeof firstEasing;

      if (typeofEasings === 'string') {
        var composedEasingString = '';

        for (var i = 0; i < chunkLength; i++) {
          composedEasingString += ' ' + easingObject[chunkNames[i]];
          delete easingObject[chunkNames[i]];
        }

        easingObject[prop] = composedEasingString.substr(1);
      } else {
        easingObject[prop] = firstEasing;
      }
    });
  }

  Tweenable.prototype.filter.token = {
    'tweenCreated': function (currentState, fromState, toState, easingObject) {
      sanitizeObjectForHexProps(currentState);
      sanitizeObjectForHexProps(fromState);
      sanitizeObjectForHexProps(toState);
      this._tokenData = getFormatManifests(currentState);
    },

    'beforeTween': function (currentState, fromState, toState, easingObject) {
      expandEasingObject(easingObject, this._tokenData);
      expandFormattedProperties(currentState, this._tokenData);
      expandFormattedProperties(fromState, this._tokenData);
      expandFormattedProperties(toState, this._tokenData);
    },

    'afterTween': function (currentState, fromState, toState, easingObject) {
      collapseFormattedProperties(currentState, this._tokenData);
      collapseFormattedProperties(fromState, this._tokenData);
      collapseFormattedProperties(toState, this._tokenData);
      collapseEasingObject(easingObject, this._tokenData);
    }
  };

} (Tweenable));

}).call(null);

},{}],26:[function(require,module,exports){
// Circle shaped progress bar

var Shape = require('./shape');
var utils = require('./utils');

var Circle = function Circle(container, options) {
    // Use two arcs to form a circle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m 0,-{radius}' +
        ' a {radius},{radius} 0 1 1 0,{2radius}' +
        ' a {radius},{radius} 0 1 1 0,-{2radius}';

    this.containerAspectRatio = 1;

    Shape.apply(this, arguments);
};

Circle.prototype = new Shape();
Circle.prototype.constructor = Circle;

Circle.prototype._pathString = function _pathString(opts) {
    var widthOfWider = opts.strokeWidth;
    if (opts.trailWidth && opts.trailWidth > opts.strokeWidth) {
        widthOfWider = opts.trailWidth;
    }

    var r = 50 - widthOfWider / 2;

    return utils.render(this._pathTemplate, {
        radius: r,
        '2radius': r * 2
    });
};

Circle.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

module.exports = Circle;

},{"./shape":31,"./utils":32}],27:[function(require,module,exports){
// Line shaped progress bar

var Shape = require('./shape');
var utils = require('./utils');

var Line = function Line(container, options) {
    this._pathTemplate = 'M 0,{center} L 100,{center}';
    Shape.apply(this, arguments);
};

Line.prototype = new Shape();
Line.prototype.constructor = Line;

Line.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 ' + opts.strokeWidth);
    svg.setAttribute('preserveAspectRatio', 'none');
};

Line.prototype._pathString = function _pathString(opts) {
    return utils.render(this._pathTemplate, {
        center: opts.strokeWidth / 2
    });
};

Line.prototype._trailString = function _trailString(opts) {
    return this._pathString(opts);
};

module.exports = Line;

},{"./shape":31,"./utils":32}],28:[function(require,module,exports){
module.exports = {
    // Higher level API, different shaped progress bars
    Line: require('./line'),
    Circle: require('./circle'),
    SemiCircle: require('./semicircle'),

    // Lower level API to use any SVG path
    Path: require('./path'),

    // Base-class for creating new custom shapes
    // to be in line with the API of built-in shapes
    // Undocumented.
    Shape: require('./shape'),

    // Internal utils, undocumented.
    utils: require('./utils')
};

},{"./circle":26,"./line":27,"./path":29,"./semicircle":30,"./shape":31,"./utils":32}],29:[function(require,module,exports){
'use strict';

// Lower level API to animate any kind of svg path

var Tweenable = require('shifty');
var utils = require('./utils');

var EASING_ALIASES = {
    easeIn: 'easeInCubic',
    easeOut: 'easeOutCubic',
    easeInOut: 'easeInOutCubic'
};

var Path = function Path(path, opts) {
    // Throw a better error if not initialized with `new` keyword
    if (!(this instanceof Path)) {
        throw new Error('Constructor was called without new keyword');
    }

    // Default parameters for animation
    opts = utils.extend({
        duration: 800,
        easing: 'linear',
        from: {},
        to: {},
        step: function step() {}
    }, opts);

    var element;
    if (utils.isString(path)) {
        element = document.querySelector(path);
    } else {
        element = path;
    }

    // Reveal .path as public attribute
    this.path = element;
    this._opts = opts;
    this._tweenable = null;

    // Set up the starting positions
    var length = this.path.getTotalLength();
    this.path.style.strokeDasharray = length + ' ' + length;
    this.set(0);
};

Path.prototype.value = function value() {
    var offset = this._getComputedDashOffset();
    var length = this.path.getTotalLength();

    var progress = 1 - offset / length;
    // Round number to prevent returning very small number like 1e-30, which
    // is practically 0
    return parseFloat(progress.toFixed(6), 10);
};

Path.prototype.set = function set(progress) {
    this.stop();

    this.path.style.strokeDashoffset = this._progressToOffset(progress);

    var step = this._opts.step;
    if (utils.isFunction(step)) {
        var easing = this._easing(this._opts.easing);
        var values = this._calculateTo(progress, easing);
        var reference = this._opts.shape || this;
        step(values, reference, this._opts.attachment);
    }
};

Path.prototype.stop = function stop() {
    this._stopTween();
    this.path.style.strokeDashoffset = this._getComputedDashOffset();
};

// Method introduced here:
// http://jakearchibald.com/2013/animated-line-drawing-svg/
Path.prototype.animate = function animate(progress, opts, cb) {
    opts = opts || {};

    if (utils.isFunction(opts)) {
        cb = opts;
        opts = {};
    }

    var passedOpts = utils.extend({}, opts);

    // Copy default opts to new object so defaults are not modified
    var defaultOpts = utils.extend({}, this._opts);
    opts = utils.extend(defaultOpts, opts);

    var shiftyEasing = this._easing(opts.easing);
    var values = this._resolveFromAndTo(progress, shiftyEasing, passedOpts);

    this.stop();

    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    this.path.getBoundingClientRect();

    var offset = this._getComputedDashOffset();
    var newOffset = this._progressToOffset(progress);

    var self = this;
    this._tweenable = new Tweenable();
    this._tweenable.tween({
        from: utils.extend({ offset: offset }, values.from),
        to: utils.extend({ offset: newOffset }, values.to),
        duration: opts.duration,
        easing: shiftyEasing,
        step: function step(state) {
            self.path.style.strokeDashoffset = state.offset;
            var reference = opts.shape || self;
            opts.step(state, reference, opts.attachment);
        },
        finish: function finish(state) {
            if (utils.isFunction(cb)) {
                cb();
            }
        }
    });
};

Path.prototype._getComputedDashOffset = function _getComputedDashOffset() {
    var computedStyle = window.getComputedStyle(this.path, null);
    return parseFloat(computedStyle.getPropertyValue('stroke-dashoffset'), 10);
};

Path.prototype._progressToOffset = function _progressToOffset(progress) {
    var length = this.path.getTotalLength();
    return length - progress * length;
};

// Resolves from and to values for animation.
Path.prototype._resolveFromAndTo = function _resolveFromAndTo(progress, easing, opts) {
    if (opts.from && opts.to) {
        return {
            from: opts.from,
            to: opts.to
        };
    }

    return {
        from: this._calculateFrom(easing),
        to: this._calculateTo(progress, easing)
    };
};

// Calculate `from` values from options passed at initialization
Path.prototype._calculateFrom = function _calculateFrom(easing) {
    return Tweenable.interpolate(this._opts.from, this._opts.to, this.value(), easing);
};

// Calculate `to` values from options passed at initialization
Path.prototype._calculateTo = function _calculateTo(progress, easing) {
    return Tweenable.interpolate(this._opts.from, this._opts.to, progress, easing);
};

Path.prototype._stopTween = function _stopTween() {
    if (this._tweenable !== null) {
        this._tweenable.stop();
        this._tweenable = null;
    }
};

Path.prototype._easing = function _easing(easing) {
    if (EASING_ALIASES.hasOwnProperty(easing)) {
        return EASING_ALIASES[easing];
    }

    return easing;
};

module.exports = Path;

},{"./utils":32,"shifty":25}],30:[function(require,module,exports){
// Semi-SemiCircle shaped progress bar

var Shape = require('./shape');
var Circle = require('./circle');
var utils = require('./utils');

var SemiCircle = function SemiCircle(container, options) {
    // Use one arc to form a SemiCircle
    // See this answer http://stackoverflow.com/a/10477334/1446092
    this._pathTemplate =
        'M 50,50 m -{radius},0' +
        ' a {radius},{radius} 0 1 1 {2radius},0';

    this.containerAspectRatio = 2;

    Shape.apply(this, arguments);
};

SemiCircle.prototype = new Shape();
SemiCircle.prototype.constructor = SemiCircle;

SemiCircle.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 50');
};

SemiCircle.prototype._initializeTextContainer = function _initializeTextContainer(
    opts,
    container,
    textContainer
) {
    if (opts.text.style) {
        // Reset top style
        textContainer.style.top = 'auto';
        textContainer.style.bottom = '0';

        if (opts.text.alignToBottom) {
            utils.setStyle(textContainer, 'transform', 'translate(-50%, 0)');
        } else {
            utils.setStyle(textContainer, 'transform', 'translate(-50%, 50%)');
        }
    }
};

// Share functionality with Circle, just have different path
SemiCircle.prototype._pathString = Circle.prototype._pathString;
SemiCircle.prototype._trailString = Circle.prototype._trailString;

module.exports = SemiCircle;

},{"./circle":26,"./shape":31,"./utils":32}],31:[function(require,module,exports){
'use strict';

// Base object for different progress bar shapes

var Path = require('./path');
var utils = require('./utils');

var DESTROYED_ERROR = 'Object is destroyed';

var Shape = function Shape(container, opts) {
    // Throw a better error if progress bars are not initialized with `new`
    // keyword
    if (!(this instanceof Shape)) {
        throw new Error('Constructor was called without new keyword');
    }

    // Prevent calling constructor without parameters so inheritance
    // works correctly. To understand, this is how Shape is inherited:
    //
    //   Line.prototype = new Shape();
    //
    // We just want to set the prototype for Line.
    if (arguments.length === 0) {
        return;
    }

    // Default parameters for progress bar creation
    this._opts = utils.extend({
        color: '#555',
        strokeWidth: 1.0,
        trailColor: null,
        trailWidth: null,
        fill: null,
        text: {
            style: {
                color: null,
                position: 'absolute',
                left: '50%',
                top: '50%',
                padding: 0,
                margin: 0,
                transform: {
                    prefix: true,
                    value: 'translate(-50%, -50%)'
                }
            },
            autoStyleContainer: true,
            alignToBottom: true,
            value: null,
            className: 'progressbar-text'
        },
        svgStyle: {
            display: 'block',
            width: '100%'
        }
    }, opts, true); // Use recursive extend

    // If user specifies e.g. svgStyle or text style, the whole object
    // should replace the defaults to make working with styles easier
    if (utils.isObject(opts) && opts.svgStyle !== undefined) {
        this._opts.svgStyle = opts.svgStyle;
    }
    if (utils.isObject(opts) && utils.isObject(opts.text) && opts.text.style !== undefined) {
        this._opts.text.style = opts.text.style;
    }

    var svgView = this._createSvgView(this._opts);

    var element;
    if (utils.isString(container)) {
        element = document.querySelector(container);
    } else {
        element = container;
    }

    if (!element) {
        throw new Error('Container does not exist: ' + container);
    }

    this._container = element;
    this._container.appendChild(svgView.svg);
    this._warnContainerAspectRatio(this._container);

    if (this._opts.svgStyle) {
        utils.setStyles(svgView.svg, this._opts.svgStyle);
    }

    // Expose public attributes before Path initialization
    this.svg = svgView.svg;
    this.path = svgView.path;
    this.trail = svgView.trail;
    this.text = null;

    var newOpts = utils.extend({
        attachment: undefined,
        shape: this
    }, this._opts);
    this._progressPath = new Path(svgView.path, newOpts);

    if (utils.isObject(this._opts.text) && this._opts.text.value !== null) {
        this.setText(this._opts.text.value);
    }
};

Shape.prototype.animate = function animate(progress, opts, cb) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    this._progressPath.animate(progress, opts, cb);
};

Shape.prototype.stop = function stop() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    // Don't crash if stop is called inside step function
    if (this._progressPath === undefined) {
        return;
    }

    this._progressPath.stop();
};

Shape.prototype.destroy = function destroy() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    this.stop();
    this.svg.parentNode.removeChild(this.svg);
    this.svg = null;
    this.path = null;
    this.trail = null;
    this._progressPath = null;

    if (this.text !== null) {
        this.text.parentNode.removeChild(this.text);
        this.text = null;
    }
};

Shape.prototype.set = function set(progress) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    this._progressPath.set(progress);
};

Shape.prototype.value = function value() {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    if (this._progressPath === undefined) {
        return 0;
    }

    return this._progressPath.value();
};

Shape.prototype.setText = function setText(newText) {
    if (this._progressPath === null) {
        throw new Error(DESTROYED_ERROR);
    }

    if (this.text === null) {
        // Create new text node
        this.text = this._createTextContainer(this._opts, this._container);
        this._container.appendChild(this.text);
    }

    // Remove previous text and add new
    if (utils.isObject(newText)) {
        utils.removeChildren(this.text);
        this.text.appendChild(newText);
    } else {
        this.text.innerHTML = newText;
    }
};

Shape.prototype._createSvgView = function _createSvgView(opts) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    this._initializeSvg(svg, opts);

    var trailPath = null;
    // Each option listed in the if condition are 'triggers' for creating
    // the trail path
    if (opts.trailColor || opts.trailWidth) {
        trailPath = this._createTrail(opts);
        svg.appendChild(trailPath);
    }

    var path = this._createPath(opts);
    svg.appendChild(path);

    return {
        svg: svg,
        path: path,
        trail: trailPath
    };
};

Shape.prototype._initializeSvg = function _initializeSvg(svg, opts) {
    svg.setAttribute('viewBox', '0 0 100 100');
};

Shape.prototype._createPath = function _createPath(opts) {
    var pathString = this._pathString(opts);
    return this._createPathElement(pathString, opts);
};

Shape.prototype._createTrail = function _createTrail(opts) {
    // Create path string with original passed options
    var pathString = this._trailString(opts);

    // Prevent modifying original
    var newOpts = utils.extend({}, opts);

    // Defaults for parameters which modify trail path
    if (!newOpts.trailColor) {
        newOpts.trailColor = '#eee';
    }
    if (!newOpts.trailWidth) {
        newOpts.trailWidth = newOpts.strokeWidth;
    }

    newOpts.color = newOpts.trailColor;
    newOpts.strokeWidth = newOpts.trailWidth;

    // When trail path is set, fill must be set for it instead of the
    // actual path to prevent trail stroke from clipping
    newOpts.fill = null;

    return this._createPathElement(pathString, newOpts);
};

Shape.prototype._createPathElement = function _createPathElement(pathString, opts) {
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathString);
    path.setAttribute('stroke', opts.color);
    path.setAttribute('stroke-width', opts.strokeWidth);

    if (opts.fill) {
        path.setAttribute('fill', opts.fill);
    } else {
        path.setAttribute('fill-opacity', '0');
    }

    return path;
};

Shape.prototype._createTextContainer = function _createTextContainer(opts, container) {
    var textContainer = document.createElement('div');
    textContainer.className = opts.text.className;

    var textStyle = opts.text.style;
    if (textStyle) {
        if (opts.text.autoStyleContainer) {
            container.style.position = 'relative';
        }

        utils.setStyles(textContainer, textStyle);
        // Default text color to progress bar's color
        if (!textStyle.color) {
            textContainer.style.color = opts.color;
        }
    }

    this._initializeTextContainer(opts, container, textContainer);
    return textContainer;
};

// Give custom shapes possibility to modify text element
Shape.prototype._initializeTextContainer = function (opts, container, element) {
    // By default, no-op
    // Custom shapes should respect API options, such as text.style
};

Shape.prototype._pathString = function _pathString(opts) {
    throw new Error('Override this function for each progress bar');
};

Shape.prototype._trailString = function _trailString(opts) {
    throw new Error('Override this function for each progress bar');
};

Shape.prototype._warnContainerAspectRatio = function _warnContainerAspectRatio(container) {
    if (!this.containerAspectRatio) {
        return;
    }

    var computedStyle = window.getComputedStyle(container, null);
    var width = parseFloat(computedStyle.getPropertyValue('width'), 10);
    var height = parseFloat(computedStyle.getPropertyValue('height'), 10);
    if (!utils.floatEquals(this.containerAspectRatio, width / height)) {
        console.warn('Incorrect aspect ratio of container', this._container, 'detected:', computedStyle.getPropertyValue('width') + '(width)', '/', computedStyle.getPropertyValue('height') + '(height)', '=', width / height);

        console.warn('Aspect ratio of should be', this.containerAspectRatio);
    }
};

module.exports = Shape;

},{"./path":29,"./utils":32}],32:[function(require,module,exports){
// Utility functions

var PREFIXES = 'Webkit Moz O ms'.split(' ');
var FLOAT_COMPARISON_EPSILON = 0.001;

// Copy all attributes from source object to destination object.
// destination object is mutated.
function extend(destination, source, recursive) {
    destination = destination || {};
    source = source || {};
    recursive = recursive || false;

    for (var attrName in source) {
        if (source.hasOwnProperty(attrName)) {
            var destVal = destination[attrName];
            var sourceVal = source[attrName];
            if (recursive && isObject(destVal) && isObject(sourceVal)) {
                destination[attrName] = extend(destVal, sourceVal, recursive);
            } else {
                destination[attrName] = sourceVal;
            }
        }
    }

    return destination;
}

// Renders templates with given variables. Variables must be surrounded with
// braces without any spaces, e.g. {variable}
// All instances of variable placeholders will be replaced with given content
// Example:
// render('Hello, {message}!', {message: 'world'})
function render(template, vars) {
    var rendered = template;

    for (var key in vars) {
        if (vars.hasOwnProperty(key)) {
            var val = vars[key];
            var regExpString = '\\{' + key + '\\}';
            var regExp = new RegExp(regExpString, 'g');

            rendered = rendered.replace(regExp, val);
        }
    }

    return rendered;
}

function setStyle(element, style, value) {
    var elStyle = element.style;  // cache for performance

    for (var i = 0; i < PREFIXES.length; ++i) {
        var prefix = PREFIXES[i];
        elStyle[prefix + capitalize(style)] = value;
    }

    elStyle[style] = value;
}

function setStyles(element, styles) {
    forEachObject(styles, function(styleValue, styleName) {
        // Allow disabling some individual styles by setting them
        // to null or undefined
        if (styleValue === null || styleValue === undefined) {
            return;
        }

        // If style's value is {prefix: true, value: '50%'},
        // Set also browser prefixed styles
        if (isObject(styleValue) && styleValue.prefix === true) {
            setStyle(element, styleName, styleValue.value);
        } else {
            element.style[styleName] = styleValue;
        }
    });
}

function capitalize(text) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function isString(obj) {
    return typeof obj === 'string' || obj instanceof String;
}

function isFunction(obj) {
    return typeof obj === 'function';
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

// Returns true if `obj` is object as in {a: 1, b: 2}, not if it's function or
// array
function isObject(obj) {
    if (isArray(obj)) {
        return false;
    }

    var type = typeof obj;
    return type === 'object' && !!obj;
}

function forEachObject(object, callback) {
    for (var key in object) {
        if (object.hasOwnProperty(key)) {
            var val = object[key];
            callback(val, key);
        }
    }
}

function floatEquals(a, b) {
    return Math.abs(a - b) < FLOAT_COMPARISON_EPSILON;
}

// https://coderwall.com/p/nygghw/don-t-use-innerhtml-to-empty-dom-elements
function removeChildren(el) {
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

module.exports = {
    extend: extend,
    render: render,
    setStyle: setStyle,
    setStyles: setStyles,
    capitalize: capitalize,
    isString: isString,
    isFunction: isFunction,
    isObject: isObject,
    forEachObject: forEachObject,
    floatEquals: floatEquals,
    removeChildren: removeChildren
};

},{}]},{},[20])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZsYXR0ZW4vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZsYXR0ZW4vbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWZsYXR0ZW4vaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZvcmVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLmZvcmVhY2gvbm9kZV9tb2R1bGVzL2xvZGFzaC5fYmFzZWVhY2gvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLm1hcC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2gubWFwL25vZGVfbW9kdWxlcy9sb2Rhc2guX2Jhc2VpdGVyYXRlZS9pbmRleC5qcyIsInNjcmlwdHMvZXhhbXBsZXMvY2lyY2xlLTEuanMiLCJzY3JpcHRzL2V4YW1wbGVzL2NpcmNsZS0yLmpzIiwic2NyaXB0cy9leGFtcGxlcy9jaXJjbGUtMy5qcyIsInNjcmlwdHMvZXhhbXBsZXMvY3VzdG9tLTEuanMiLCJzY3JpcHRzL2V4YW1wbGVzL2ludHJvLWNpcmNsZS5qcyIsInNjcmlwdHMvZXhhbXBsZXMvaW50cm8tc3F1YXJlLmpzIiwic2NyaXB0cy9leGFtcGxlcy9pbnRyby10cmlhbmdsZS5qcyIsInNjcmlwdHMvZXhhbXBsZXMvbGluZS0xLmpzIiwic2NyaXB0cy9leGFtcGxlcy9saW5lLTIuanMiLCJzY3JpcHRzL2V4YW1wbGVzL2xpbmUtMy5qcyIsInNjcmlwdHMvZXhhbXBsZXMvc2VtaS1jaXJjbGUtMS5qcyIsInNjcmlwdHMvZXhhbXBsZXMvc2VtaS1jaXJjbGUtMi5qcyIsInNjcmlwdHMvaW5kZXguanMiLCJzY3JpcHRzL2luaXQtZXhhbXBsZXMuanMiLCJzY3JpcHRzL3NxdWFyZS5qcyIsInNjcmlwdHMvdHJpYW5nbGUuanMiLCJzY3JpcHRzL3V0aWwuanMiLCIuLi9wcm9ncmVzc2Jhci5qcy9ub2RlX21vZHVsZXMvc2hpZnR5L2Rpc3Qvc2hpZnR5LmpzIiwiLi4vcHJvZ3Jlc3NiYXIuanMvc3JjL2NpcmNsZS5qcyIsIi4uL3Byb2dyZXNzYmFyLmpzL3NyYy9saW5lLmpzIiwiLi4vcHJvZ3Jlc3NiYXIuanMvc3JjL21haW4uanMiLCIuLi9wcm9ncmVzc2Jhci5qcy9zcmMvcGF0aC5qcyIsIi4uL3Byb2dyZXNzYmFyLmpzL3NyYy9zZW1pY2lyY2xlLmpzIiwiLi4vcHJvZ3Jlc3NiYXIuanMvc3JjL3NoYXBlLmpzIiwiLi4vcHJvZ3Jlc3NiYXIuanMvc3JjL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdnQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUMvUUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNubkRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtB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Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyoqXG4gKiBsb2Rhc2ggNC4xLjAgKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCAyMDEyLTIwMTYgVGhlIERvam8gRm91bmRhdGlvbiA8aHR0cDovL2Rvam9mb3VuZGF0aW9uLm9yZy8+XG4gKiBCYXNlZCBvbiBVbmRlcnNjb3JlLmpzIDEuOC4zIDxodHRwOi8vdW5kZXJzY29yZWpzLm9yZy9MSUNFTlNFPlxuICogQ29weXJpZ2h0IDIwMDktMjAxNiBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICogQXZhaWxhYmxlIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqL1xudmFyIGJhc2VGbGF0dGVuID0gcmVxdWlyZSgnbG9kYXNoLl9iYXNlZmxhdHRlbicpO1xuXG4vKipcbiAqIEZsYXR0ZW5zIGBhcnJheWAgYSBzaW5nbGUgbGV2ZWwgZGVlcC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gZmxhdHRlbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IGZsYXR0ZW5lZCBhcnJheS5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5mbGF0dGVuKFsxLCBbMiwgWzMsIFs0XV0sIDVdXSk7XG4gKiAvLyA9PiBbMSwgMiwgWzMsIFs0XV0sIDVdXG4gKi9cbmZ1bmN0aW9uIGZsYXR0ZW4oYXJyYXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcbiAgcmV0dXJuIGxlbmd0aCA/IGJhc2VGbGF0dGVuKGFycmF5LCAxKSA6IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZsYXR0ZW47XG4iLCIvKipcbiAqIGxvZGFzaCA0LjEuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNiBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE2IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKlxuICogQXBwZW5kcyB0aGUgZWxlbWVudHMgb2YgYHZhbHVlc2AgdG8gYGFycmF5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHZhbHVlcyBUaGUgdmFsdWVzIHRvIGFwcGVuZC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheVB1c2goYXJyYXksIHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcy5sZW5ndGgsXG4gICAgICBvZmZzZXQgPSBhcnJheS5sZW5ndGg7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhcnJheVtvZmZzZXQgKyBpbmRleF0gPSB2YWx1ZXNbaW5kZXhdO1xuICB9XG4gIHJldHVybiBhcnJheTtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mbGF0dGVuYCB3aXRoIHN1cHBvcnQgZm9yIHJlc3RyaWN0aW5nIGZsYXR0ZW5pbmcuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBmbGF0dGVuLlxuICogQHBhcmFtIHtudW1iZXJ9IGRlcHRoIFRoZSBtYXhpbXVtIHJlY3Vyc2lvbiBkZXB0aC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2lzU3RyaWN0XSBSZXN0cmljdCBmbGF0dGVuaW5nIHRvIGFycmF5cy1saWtlIG9iamVjdHMuXG4gKiBAcGFyYW0ge0FycmF5fSBbcmVzdWx0PVtdXSBUaGUgaW5pdGlhbCByZXN1bHQgdmFsdWUuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBmbGF0dGVuZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGbGF0dGVuKGFycmF5LCBkZXB0aCwgaXNTdHJpY3QsIHJlc3VsdCkge1xuICByZXN1bHQgfHwgKHJlc3VsdCA9IFtdKTtcblxuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHZhciB2YWx1ZSA9IGFycmF5W2luZGV4XTtcbiAgICBpZiAoZGVwdGggPiAwICYmIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJlxuICAgICAgICAoaXNTdHJpY3QgfHwgaXNBcnJheSh2YWx1ZSkgfHwgaXNBcmd1bWVudHModmFsdWUpKSkge1xuICAgICAgaWYgKGRlcHRoID4gMSkge1xuICAgICAgICAvLyBSZWN1cnNpdmVseSBmbGF0dGVuIGFycmF5cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgICBiYXNlRmxhdHRlbih2YWx1ZSwgZGVwdGggLSAxLCBpc1N0cmljdCwgcmVzdWx0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFycmF5UHVzaChyZXN1bHQsIHZhbHVlKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFpc1N0cmljdCkge1xuICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gdmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ucHJvcGVydHlgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZVByb3BlcnR5KGtleSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogR2V0cyB0aGUgXCJsZW5ndGhcIiBwcm9wZXJ0eSB2YWx1ZSBvZiBgb2JqZWN0YC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyB1c2VkIHRvIGF2b2lkIGEgW0pJVCBidWddKGh0dHBzOi8vYnVncy53ZWJraXQub3JnL3Nob3dfYnVnLmNnaT9pZD0xNDI3OTIpXG4gKiB0aGF0IGFmZmVjdHMgU2FmYXJpIG9uIGF0IGxlYXN0IGlPUyA4LjEtOC4zIEFSTTY0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgXCJsZW5ndGhcIiB2YWx1ZS5cbiAqL1xudmFyIGdldExlbmd0aCA9IGJhc2VQcm9wZXJ0eSgnbGVuZ3RoJyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGFuIGBhcmd1bWVudHNgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhmdW5jdGlvbigpIHsgcmV0dXJuIGFyZ3VtZW50czsgfSgpKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJndW1lbnRzKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FyZ3VtZW50cyh2YWx1ZSkge1xuICAvLyBTYWZhcmkgOC4xIGluY29ycmVjdGx5IG1ha2VzIGBhcmd1bWVudHMuY2FsbGVlYCBlbnVtZXJhYmxlIGluIHN0cmljdCBtb2RlLlxuICByZXR1cm4gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpICYmIGhhc093blByb3BlcnR5LmNhbGwodmFsdWUsICdjYWxsZWUnKSAmJlxuICAgICghcHJvcGVydHlJc0VudW1lcmFibGUuY2FsbCh2YWx1ZSwgJ2NhbGxlZScpIHx8IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IGFyZ3NUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYW4gYEFycmF5YCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEB0eXBlIHtGdW5jdGlvbn1cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5KF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG52YXIgaXNBcnJheSA9IEFycmF5LmlzQXJyYXk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgIT0gbnVsbCAmJiBpc0xlbmd0aChnZXRMZW5ndGgodmFsdWUpKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgaXMgbGlrZSBgXy5pc0FycmF5TGlrZWAgZXhjZXB0IHRoYXQgaXQgYWxzbyBjaGVja3MgaWYgYHZhbHVlYFxuICogaXMgYW4gb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBhcnJheS1saWtlIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChkb2N1bWVudC5ib2R5LmNoaWxkcmVuKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlT2JqZWN0KCdhYmMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2VPYmplY3QodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgaXNBcnJheUxpa2UodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOCB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgd2VhayBtYXAgY29uc3RydWN0b3JzLFxuICAvLyBhbmQgUGhhbnRvbUpTIDEuOSB3aGljaCByZXR1cm5zICdmdW5jdGlvbicgZm9yIGBOb2RlTGlzdGAgaW5zdGFuY2VzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBpcyBsb29zZWx5IGJhc2VkIG9uIFtgVG9MZW5ndGhgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy10b2xlbmd0aCkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlIFtsYW5ndWFnZSB0eXBlXShodHRwczovL2VzNS5naXRodWIuaW8vI3g4KSBvZiBgT2JqZWN0YC5cbiAqIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc09iamVjdCh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3QodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiAhIXZhbHVlICYmICh0eXBlID09ICdvYmplY3QnIHx8IHR5cGUgPT0gJ2Z1bmN0aW9uJyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgb2JqZWN0LWxpa2UuIEEgdmFsdWUgaXMgb2JqZWN0LWxpa2UgaWYgaXQncyBub3QgYG51bGxgXG4gKiBhbmQgaGFzIGEgYHR5cGVvZmAgcmVzdWx0IG9mIFwib2JqZWN0XCIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRmxhdHRlbjtcbiIsIi8qKlxuICogbG9kYXNoIDQuMS4wIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE2IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTYgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlRWFjaCA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWVhY2gnKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8uZm9yRWFjaGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yXG4gKiBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBhcnJheUVhY2goYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgaWYgKGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KSA9PT0gZmFsc2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYXJyYXk7XG59XG5cbi8qKlxuICogQ2FzdHMgYHZhbHVlYCB0byBgaWRlbnRpdHlgIGlmIGl0J3Mgbm90IGEgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5LWxpa2Ugb2JqZWN0LlxuICovXG5mdW5jdGlvbiBiYXNlQ2FzdEZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlIDogaWRlbnRpdHk7XG59XG5cbi8qKlxuICogSXRlcmF0ZXMgb3ZlciBlbGVtZW50cyBvZiBgY29sbGVjdGlvbmAgaW52b2tpbmcgYGl0ZXJhdGVlYCBmb3IgZWFjaCBlbGVtZW50LlxuICogVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6ICh2YWx1ZSwgaW5kZXh8a2V5LCBjb2xsZWN0aW9uKS5cbiAqIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseSByZXR1cm5pbmcgYGZhbHNlYC5cbiAqXG4gKiAqKk5vdGU6KiogQXMgd2l0aCBvdGhlciBcIkNvbGxlY3Rpb25zXCIgbWV0aG9kcywgb2JqZWN0cyB3aXRoIGEgXCJsZW5ndGhcIiBwcm9wZXJ0eVxuICogYXJlIGl0ZXJhdGVkIGxpa2UgYXJyYXlzLiBUbyBhdm9pZCB0aGlzIGJlaGF2aW9yIHVzZSBgXy5mb3JJbmAgb3IgYF8uZm9yT3duYFxuICogZm9yIG9iamVjdCBpdGVyYXRpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBhbGlhcyBlYWNoXG4gKiBAY2F0ZWdvcnkgQ29sbGVjdGlvblxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXyhbMSwgMl0pLmZvckVhY2goZnVuY3Rpb24odmFsdWUpIHtcbiAqICAgY29uc29sZS5sb2codmFsdWUpO1xuICogfSk7XG4gKiAvLyA9PiBsb2dzIGAxYCB0aGVuIGAyYFxuICpcbiAqIF8uZm9yRWFjaCh7ICdhJzogMSwgJ2InOiAyIH0sIGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAqICAgY29uc29sZS5sb2coa2V5KTtcbiAqIH0pO1xuICogLy8gPT4gbG9ncyAnYScgdGhlbiAnYicgKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICByZXR1cm4gKHR5cGVvZiBpdGVyYXRlZSA9PSAnZnVuY3Rpb24nICYmIGlzQXJyYXkoY29sbGVjdGlvbikpXG4gICAgPyBhcnJheUVhY2goY29sbGVjdGlvbiwgaXRlcmF0ZWUpXG4gICAgOiBiYXNlRWFjaChjb2xsZWN0aW9uLCBiYXNlQ2FzdEZ1bmN0aW9uKGl0ZXJhdGVlKSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUge0Z1bmN0aW9ufVxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBUaGlzIG1ldGhvZCByZXR1cm5zIHRoZSBmaXJzdCBhcmd1bWVudCBnaXZlbiB0byBpdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IFV0aWxcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgQW55IHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgYHZhbHVlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmlkZW50aXR5KG9iamVjdCkgPT09IG9iamVjdDtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gaWRlbnRpdHkodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZvckVhY2g7XG4iLCIvKipcbiAqIGxvZGFzaCA0LjEuMSAoQ3VzdG9tIEJ1aWxkKSA8aHR0cHM6Ly9sb2Rhc2guY29tLz5cbiAqIEJ1aWxkOiBgbG9kYXNoIG1vZHVsYXJpemUgZXhwb3J0cz1cIm5wbVwiIC1vIC4vYFxuICogQ29weXJpZ2h0IDIwMTItMjAxNiBUaGUgRG9qbyBGb3VuZGF0aW9uIDxodHRwOi8vZG9qb2ZvdW5kYXRpb24ub3JnLz5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgMjAwOS0yMDE2IEplcmVteSBBc2hrZW5hcywgRG9jdW1lbnRDbG91ZCBhbmQgSW52ZXN0aWdhdGl2ZSBSZXBvcnRlcnMgJiBFZGl0b3JzXG4gKiBBdmFpbGFibGUgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgYXJnc1RhZyA9ICdbb2JqZWN0IEFyZ3VtZW50c10nLFxuICAgIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgc3RyaW5nVGFnID0gJ1tvYmplY3QgU3RyaW5nXSc7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udGltZXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kc1xuICogb3IgbWF4IGFycmF5IGxlbmd0aCBjaGVja3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgdGltZXMgdG8gaW52b2tlIGBpdGVyYXRlZWAuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiByZXN1bHRzLlxuICovXG5mdW5jdGlvbiBiYXNlVGltZXMobiwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICByZXN1bHQgPSBBcnJheShuKTtcblxuICB3aGlsZSAoKytpbmRleCA8IG4pIHtcbiAgICByZXN1bHRbaW5kZXhdID0gaXRlcmF0ZWUoaW5kZXgpO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIHZhbHVlID0gKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgPyArdmFsdWUgOiAtMTtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqIFVzZWQgdG8gY2hlY2sgb2JqZWN0cyBmb3Igb3duIHByb3BlcnRpZXMuICovXG52YXIgaGFzT3duUHJvcGVydHkgPSBvYmplY3RQcm90by5oYXNPd25Qcm9wZXJ0eTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqIEJ1aWx0LWluIHZhbHVlIHJlZmVyZW5jZXMuICovXG52YXIgZ2V0UHJvdG90eXBlT2YgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YsXG4gICAgcHJvcGVydHlJc0VudW1lcmFibGUgPSBvYmplY3RQcm90by5wcm9wZXJ0eUlzRW51bWVyYWJsZTtcblxuLyogQnVpbHQtaW4gbWV0aG9kIHJlZmVyZW5jZXMgZm9yIHRob3NlIHdpdGggdGhlIHNhbWUgbmFtZSBhcyBvdGhlciBgbG9kYXNoYCBtZXRob2RzLiAqL1xudmFyIG5hdGl2ZUtleXMgPSBPYmplY3Qua2V5cztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5mb3JFYWNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl8T2JqZWN0fSBSZXR1cm5zIGBjb2xsZWN0aW9uYC5cbiAqL1xudmFyIGJhc2VFYWNoID0gY3JlYXRlQmFzZUVhY2goYmFzZUZvck93bik7XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYGJhc2VGb3JJbmAgYW5kIGBiYXNlRm9yT3duYCB3aGljaCBpdGVyYXRlc1xuICogb3ZlciBgb2JqZWN0YCBwcm9wZXJ0aWVzIHJldHVybmVkIGJ5IGBrZXlzRnVuY2AgaW52b2tpbmcgYGl0ZXJhdGVlYCBmb3JcbiAqIGVhY2ggcHJvcGVydHkuIEl0ZXJhdGVlIGZ1bmN0aW9ucyBtYXkgZXhpdCBpdGVyYXRpb24gZWFybHkgYnkgZXhwbGljaXRseVxuICogcmV0dXJuaW5nIGBmYWxzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHBhcmFtIHtGdW5jdGlvbn0ga2V5c0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGdldCB0aGUga2V5cyBvZiBgb2JqZWN0YC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbnZhciBiYXNlRm9yID0gY3JlYXRlQmFzZUZvcigpO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmZvck93bmAgd2l0aG91dCBzdXBwb3J0IGZvciBpdGVyYXRlZSBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgYG9iamVjdGAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VGb3JPd24ob2JqZWN0LCBpdGVyYXRlZSkge1xuICByZXR1cm4gb2JqZWN0ICYmIGJhc2VGb3Iob2JqZWN0LCBpdGVyYXRlZSwga2V5cyk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uaGFzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBrZXkgVGhlIGtleSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUhhcyhvYmplY3QsIGtleSkge1xuICAvLyBBdm9pZCBhIGJ1ZyBpbiBJRSAxMC0xMSB3aGVyZSBvYmplY3RzIHdpdGggYSBbW1Byb3RvdHlwZV1dIG9mIGBudWxsYCxcbiAgLy8gdGhhdCBhcmUgY29tcG9zZWQgZW50aXJlbHkgb2YgaW5kZXggcHJvcGVydGllcywgcmV0dXJuIGBmYWxzZWAgZm9yXG4gIC8vIGBoYXNPd25Qcm9wZXJ0eWAgY2hlY2tzIG9mIHRoZW0uXG4gIHJldHVybiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwga2V5KSB8fFxuICAgICh0eXBlb2Ygb2JqZWN0ID09ICdvYmplY3QnICYmIGtleSBpbiBvYmplY3QgJiYgZ2V0UHJvdG90eXBlT2Yob2JqZWN0KSA9PT0gbnVsbCk7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8ua2V5c2Agd2hpY2ggZG9lc24ndCBza2lwIHRoZSBjb25zdHJ1Y3RvclxuICogcHJvcGVydHkgb2YgcHJvdG90eXBlcyBvciB0cmVhdCBzcGFyc2UgYXJyYXlzIGFzIGRlbnNlLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzLlxuICovXG5mdW5jdGlvbiBiYXNlS2V5cyhvYmplY3QpIHtcbiAgcmV0dXJuIG5hdGl2ZUtleXMoT2JqZWN0KG9iamVjdCkpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5YCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eShrZXkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBgYmFzZUVhY2hgIG9yIGBiYXNlRWFjaFJpZ2h0YCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZWFjaEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGl0ZXJhdGUgb3ZlciBhIGNvbGxlY3Rpb24uXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VFYWNoKGVhY2hGdW5jLCBmcm9tUmlnaHQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gICAgaWYgKGNvbGxlY3Rpb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNvbGxlY3Rpb247XG4gICAgfVxuICAgIGlmICghaXNBcnJheUxpa2UoY29sbGVjdGlvbikpIHtcbiAgICAgIHJldHVybiBlYWNoRnVuYyhjb2xsZWN0aW9uLCBpdGVyYXRlZSk7XG4gICAgfVxuICAgIHZhciBsZW5ndGggPSBjb2xsZWN0aW9uLmxlbmd0aCxcbiAgICAgICAgaW5kZXggPSBmcm9tUmlnaHQgPyBsZW5ndGggOiAtMSxcbiAgICAgICAgaXRlcmFibGUgPSBPYmplY3QoY29sbGVjdGlvbik7XG5cbiAgICB3aGlsZSAoKGZyb21SaWdodCA/IGluZGV4LS0gOiArK2luZGV4IDwgbGVuZ3RoKSkge1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2luZGV4XSwgaW5kZXgsIGl0ZXJhYmxlKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjb2xsZWN0aW9uO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBiYXNlIGZ1bmN0aW9uIGZvciBtZXRob2RzIGxpa2UgYF8uZm9ySW5gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGJhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUJhc2VGb3IoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QsIGl0ZXJhdGVlLCBrZXlzRnVuYykge1xuICAgIHZhciBpbmRleCA9IC0xLFxuICAgICAgICBpdGVyYWJsZSA9IE9iamVjdChvYmplY3QpLFxuICAgICAgICBwcm9wcyA9IGtleXNGdW5jKG9iamVjdCksXG4gICAgICAgIGxlbmd0aCA9IHByb3BzLmxlbmd0aDtcblxuICAgIHdoaWxlIChsZW5ndGgtLSkge1xuICAgICAgdmFyIGtleSA9IHByb3BzW2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdO1xuICAgICAgaWYgKGl0ZXJhdGVlKGl0ZXJhYmxlW2tleV0sIGtleSwgaXRlcmFibGUpID09PSBmYWxzZSkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iamVjdDtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIGluZGV4IGtleXMgZm9yIGBvYmplY3RgIHZhbHVlcyBvZiBhcnJheXMsXG4gKiBgYXJndW1lbnRzYCBvYmplY3RzLCBhbmQgc3RyaW5ncywgb3RoZXJ3aXNlIGBudWxsYCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fG51bGx9IFJldHVybnMgaW5kZXgga2V5cywgZWxzZSBgbnVsbGAuXG4gKi9cbmZ1bmN0aW9uIGluZGV4S2V5cyhvYmplY3QpIHtcbiAgdmFyIGxlbmd0aCA9IG9iamVjdCA/IG9iamVjdC5sZW5ndGggOiB1bmRlZmluZWQ7XG4gIGlmIChpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzU3RyaW5nKG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSkpIHtcbiAgICByZXR1cm4gYmFzZVRpbWVzKGxlbmd0aCwgU3RyaW5nKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBsaWtlbHkgYSBwcm90b3R5cGUgb2JqZWN0LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvdG90eXBlLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzUHJvdG90eXBlKHZhbHVlKSB7XG4gIHZhciBDdG9yID0gdmFsdWUgJiYgdmFsdWUuY29uc3RydWN0b3IsXG4gICAgICBwcm90byA9ICh0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nICYmIEN0b3IucHJvdG90eXBlKSB8fCBvYmplY3RQcm90bztcblxuICByZXR1cm4gdmFsdWUgPT09IHByb3RvO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBpbmNvcnJlY3RseSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgoZ2V0TGVuZ3RoKHZhbHVlKSkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIHdlYWsgbWFwIGNvbnN0cnVjdG9ycyxcbiAgLy8gYW5kIFBoYW50b21KUyAxLjkgd2hpY2ggcmV0dXJucyAnZnVuY3Rpb24nIGZvciBgTm9kZUxpc3RgIGluc3RhbmNlcy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgbG9vc2VseSBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTdHJpbmdgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNTdHJpbmcoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTdHJpbmcoMSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzdHJpbmcnIHx8XG4gICAgKCFpc0FycmF5KHZhbHVlKSAmJiBpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN0cmluZ1RhZyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KTtcbiAgaWYgKCEoaXNQcm90byB8fCBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBiYXNlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciBpbmRleGVzID0gaW5kZXhLZXlzKG9iamVjdCksXG4gICAgICBza2lwSW5kZXhlcyA9ICEhaW5kZXhlcyxcbiAgICAgIHJlc3VsdCA9IGluZGV4ZXMgfHwgW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoYmFzZUhhcyhvYmplY3QsIGtleSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkgJiZcbiAgICAgICAgIShpc1Byb3RvICYmIGtleSA9PSAnY29uc3RydWN0b3InKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlRWFjaDtcbiIsIi8qKlxuICogbG9kYXNoIDQuMi4xIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE2IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTYgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cbnZhciBiYXNlRWFjaCA9IHJlcXVpcmUoJ2xvZGFzaC5fYmFzZWVhY2gnKSxcbiAgICBiYXNlSXRlcmF0ZWUgPSByZXF1aXJlKCdsb2Rhc2guX2Jhc2VpdGVyYXRlZScpO1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBNQVhfU0FGRV9JTlRFR0VSID0gOTAwNzE5OTI1NDc0MDk5MTtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXSc7XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBfLm1hcGAgZm9yIGFycmF5cyB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlXG4gKiBzaG9ydGhhbmRzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXJyYXlNYXAoYXJyYXksIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBpdGVyYXRlZShhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlIFtgdG9TdHJpbmdUYWdgXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3QucHJvdG90eXBlLnRvc3RyaW5nKVxuICogb2YgdmFsdWVzLlxuICovXG52YXIgb2JqZWN0VG9TdHJpbmcgPSBvYmplY3RQcm90by50b1N0cmluZztcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXBgIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxPYmplY3R9IGNvbGxlY3Rpb24gVGhlIGNvbGxlY3Rpb24gdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgbmV3IG1hcHBlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hcChjb2xsZWN0aW9uLCBpdGVyYXRlZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IGlzQXJyYXlMaWtlKGNvbGxlY3Rpb24pID8gQXJyYXkoY29sbGVjdGlvbi5sZW5ndGgpIDogW107XG5cbiAgYmFzZUVhY2goY29sbGVjdGlvbiwgZnVuY3Rpb24odmFsdWUsIGtleSwgY29sbGVjdGlvbikge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IGl0ZXJhdGVlKHZhbHVlLCBrZXksIGNvbGxlY3Rpb24pO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIHZhbHVlcyBieSBydW5uaW5nIGVhY2ggZWxlbWVudCBpbiBgY29sbGVjdGlvbmAgdGhyb3VnaFxuICogYGl0ZXJhdGVlYC4gVGhlIGl0ZXJhdGVlIGlzIGludm9rZWQgd2l0aCB0aHJlZSBhcmd1bWVudHM6XG4gKiAodmFsdWUsIGluZGV4fGtleSwgY29sbGVjdGlvbikuXG4gKlxuICogTWFueSBsb2Rhc2ggbWV0aG9kcyBhcmUgZ3VhcmRlZCB0byB3b3JrIGFzIGl0ZXJhdGVlcyBmb3IgbWV0aG9kcyBsaWtlXG4gKiBgXy5ldmVyeWAsIGBfLmZpbHRlcmAsIGBfLm1hcGAsIGBfLm1hcFZhbHVlc2AsIGBfLnJlamVjdGAsIGFuZCBgXy5zb21lYC5cbiAqXG4gKiBUaGUgZ3VhcmRlZCBtZXRob2RzIGFyZTpcbiAqIGBhcnlgLCBgY3VycnlgLCBgY3VycnlSaWdodGAsIGBkcm9wYCwgYGRyb3BSaWdodGAsIGBldmVyeWAsIGBmaWxsYCxcbiAqIGBpbnZlcnRgLCBgcGFyc2VJbnRgLCBgcmFuZG9tYCwgYHJhbmdlYCwgYHJhbmdlUmlnaHRgLCBgc2xpY2VgLCBgc29tZWAsXG4gKiBgc29ydEJ5YCwgYHRha2VgLCBgdGFrZVJpZ2h0YCwgYHRlbXBsYXRlYCwgYHRyaW1gLCBgdHJpbUVuZGAsIGB0cmltU3RhcnRgLFxuICogYW5kIGB3b3Jkc2BcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IENvbGxlY3Rpb25cbiAqIEBwYXJhbSB7QXJyYXl8T2JqZWN0fSBjb2xsZWN0aW9uIFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb258T2JqZWN0fHN0cmluZ30gW2l0ZXJhdGVlPV8uaWRlbnRpdHldIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBtYXBwZWQgYXJyYXkuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIHNxdWFyZShuKSB7XG4gKiAgIHJldHVybiBuICogbjtcbiAqIH1cbiAqXG4gKiBfLm1hcChbNCwgOF0sIHNxdWFyZSk7XG4gKiAvLyA9PiBbMTYsIDY0XVxuICpcbiAqIF8ubWFwKHsgJ2EnOiA0LCAnYic6IDggfSwgc3F1YXJlKTtcbiAqIC8vID0+IFsxNiwgNjRdIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKlxuICogdmFyIHVzZXJzID0gW1xuICogICB7ICd1c2VyJzogJ2Jhcm5leScgfSxcbiAqICAgeyAndXNlcic6ICdmcmVkJyB9XG4gKiBdO1xuICpcbiAqIC8vIFRoZSBgXy5wcm9wZXJ0eWAgaXRlcmF0ZWUgc2hvcnRoYW5kLlxuICogXy5tYXAodXNlcnMsICd1c2VyJyk7XG4gKiAvLyA9PiBbJ2Jhcm5leScsICdmcmVkJ11cbiAqL1xuZnVuY3Rpb24gbWFwKGNvbGxlY3Rpb24sIGl0ZXJhdGVlKSB7XG4gIHZhciBmdW5jID0gaXNBcnJheShjb2xsZWN0aW9uKSA/IGFycmF5TWFwIDogYmFzZU1hcDtcbiAgcmV0dXJuIGZ1bmMoY29sbGVjdGlvbiwgYmFzZUl0ZXJhdGVlKGl0ZXJhdGVlLCAzKSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhbiBgQXJyYXlgIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHR5cGUge0Z1bmN0aW9ufVxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgY29ycmVjdGx5IGNsYXNzaWZpZWQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5KGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzQXJyYXkoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbnZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKGdldExlbmd0aCh2YWx1ZSkpICYmICFpc0Z1bmN0aW9uKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIHdlYWsgbWFwIGNvbnN0cnVjdG9ycyxcbiAgLy8gYW5kIFBoYW50b21KUyAxLjkgd2hpY2ggcmV0dXJucyAnZnVuY3Rpb24nIGZvciBgTm9kZUxpc3RgIGluc3RhbmNlcy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgbG9vc2VseSBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IG1hcDtcbiIsIi8qKlxuICogbG9kYXNoIDQuNS4yIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgMjAxMi0yMDE2IFRoZSBEb2pvIEZvdW5kYXRpb24gPGh0dHA6Ly9kb2pvZm91bmRhdGlvbi5vcmcvPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCAyMDA5LTIwMTYgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqIEF2YWlsYWJsZSB1bmRlciBNSVQgbGljZW5zZSA8aHR0cHM6Ly9sb2Rhc2guY29tL2xpY2Vuc2U+XG4gKi9cblxuLyoqIFVzZWQgYXMgdGhlIHNpemUgdG8gZW5hYmxlIGxhcmdlIGFycmF5IG9wdGltaXphdGlvbnMuICovXG52YXIgTEFSR0VfQVJSQVlfU0laRSA9IDIwMDtcblxuLyoqIFVzZWQgdG8gc3RhbmQtaW4gZm9yIGB1bmRlZmluZWRgIGhhc2ggdmFsdWVzLiAqL1xudmFyIEhBU0hfVU5ERUZJTkVEID0gJ19fbG9kYXNoX2hhc2hfdW5kZWZpbmVkX18nO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIGJpdG1hc2tzIGZvciBjb21wYXJpc29uIHN0eWxlcy4gKi9cbnZhciBVTk9SREVSRURfQ09NUEFSRV9GTEFHID0gMSxcbiAgICBQQVJUSUFMX0NPTVBBUkVfRkxBRyA9IDI7XG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTE7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBhcmdzVGFnID0gJ1tvYmplY3QgQXJndW1lbnRzXScsXG4gICAgYXJyYXlUYWcgPSAnW29iamVjdCBBcnJheV0nLFxuICAgIGJvb2xUYWcgPSAnW29iamVjdCBCb29sZWFuXScsXG4gICAgZGF0ZVRhZyA9ICdbb2JqZWN0IERhdGVdJyxcbiAgICBlcnJvclRhZyA9ICdbb2JqZWN0IEVycm9yXScsXG4gICAgZnVuY1RhZyA9ICdbb2JqZWN0IEZ1bmN0aW9uXScsXG4gICAgZ2VuVGFnID0gJ1tvYmplY3QgR2VuZXJhdG9yRnVuY3Rpb25dJyxcbiAgICBtYXBUYWcgPSAnW29iamVjdCBNYXBdJyxcbiAgICBudW1iZXJUYWcgPSAnW29iamVjdCBOdW1iZXJdJyxcbiAgICBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJyxcbiAgICByZWdleHBUYWcgPSAnW29iamVjdCBSZWdFeHBdJyxcbiAgICBzZXRUYWcgPSAnW29iamVjdCBTZXRdJyxcbiAgICBzdHJpbmdUYWcgPSAnW29iamVjdCBTdHJpbmddJyxcbiAgICBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJyxcbiAgICB3ZWFrTWFwVGFnID0gJ1tvYmplY3QgV2Vha01hcF0nO1xuXG52YXIgYXJyYXlCdWZmZXJUYWcgPSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nLFxuICAgIGZsb2F0MzJUYWcgPSAnW29iamVjdCBGbG9hdDMyQXJyYXldJyxcbiAgICBmbG9hdDY0VGFnID0gJ1tvYmplY3QgRmxvYXQ2NEFycmF5XScsXG4gICAgaW50OFRhZyA9ICdbb2JqZWN0IEludDhBcnJheV0nLFxuICAgIGludDE2VGFnID0gJ1tvYmplY3QgSW50MTZBcnJheV0nLFxuICAgIGludDMyVGFnID0gJ1tvYmplY3QgSW50MzJBcnJheV0nLFxuICAgIHVpbnQ4VGFnID0gJ1tvYmplY3QgVWludDhBcnJheV0nLFxuICAgIHVpbnQ4Q2xhbXBlZFRhZyA9ICdbb2JqZWN0IFVpbnQ4Q2xhbXBlZEFycmF5XScsXG4gICAgdWludDE2VGFnID0gJ1tvYmplY3QgVWludDE2QXJyYXldJyxcbiAgICB1aW50MzJUYWcgPSAnW29iamVjdCBVaW50MzJBcnJheV0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBwcm9wZXJ0eSBuYW1lcyB3aXRoaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVJc0RlZXBQcm9wID0gL1xcLnxcXFsoPzpbXltcXF1dKnwoW1wiJ10pKD86KD8hXFwxKVteXFxcXF18XFxcXC4pKj9cXDEpXFxdLyxcbiAgICByZUlzUGxhaW5Qcm9wID0gL15cXHcqJC8sXG4gICAgcmVQcm9wTmFtZSA9IC9bXi5bXFxdXSt8XFxbKD86KC0/XFxkKyg/OlxcLlxcZCspPyl8KFtcIiddKSgoPzooPyFcXDIpW15cXFxcXXxcXFxcLikqPylcXDIpXFxdL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGBSZWdFeHBgIFtzeW50YXggY2hhcmFjdGVyc10oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtcGF0dGVybnMpLiAqL1xudmFyIHJlUmVnRXhwQ2hhciA9IC9bXFxcXF4kLiorPygpW1xcXXt9fF0vZztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggYmFja3NsYXNoZXMgaW4gcHJvcGVydHkgcGF0aHMuICovXG52YXIgcmVFc2NhcGVDaGFyID0gL1xcXFwoXFxcXCk/L2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBob3N0IGNvbnN0cnVjdG9ycyAoU2FmYXJpID4gNSkuICovXG52YXIgcmVJc0hvc3RDdG9yID0gL15cXFtvYmplY3QgLis/Q29uc3RydWN0b3JcXF0kLztcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqIFVzZWQgdG8gaWRlbnRpZnkgYHRvU3RyaW5nVGFnYCB2YWx1ZXMgb2YgdHlwZWQgYXJyYXlzLiAqL1xudmFyIHR5cGVkQXJyYXlUYWdzID0ge307XG50eXBlZEFycmF5VGFnc1tmbG9hdDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Zsb2F0NjRUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDhUYWddID0gdHlwZWRBcnJheVRhZ3NbaW50MTZUYWddID1cbnR5cGVkQXJyYXlUYWdzW2ludDMyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW3VpbnQ4VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50OENsYW1wZWRUYWddID0gdHlwZWRBcnJheVRhZ3NbdWludDE2VGFnXSA9XG50eXBlZEFycmF5VGFnc1t1aW50MzJUYWddID0gdHJ1ZTtcbnR5cGVkQXJyYXlUYWdzW2FyZ3NUYWddID0gdHlwZWRBcnJheVRhZ3NbYXJyYXlUYWddID1cbnR5cGVkQXJyYXlUYWdzW2FycmF5QnVmZmVyVGFnXSA9IHR5cGVkQXJyYXlUYWdzW2Jvb2xUYWddID1cbnR5cGVkQXJyYXlUYWdzW2RhdGVUYWddID0gdHlwZWRBcnJheVRhZ3NbZXJyb3JUYWddID1cbnR5cGVkQXJyYXlUYWdzW2Z1bmNUYWddID0gdHlwZWRBcnJheVRhZ3NbbWFwVGFnXSA9XG50eXBlZEFycmF5VGFnc1tudW1iZXJUYWddID0gdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tyZWdleHBUYWddID0gdHlwZWRBcnJheVRhZ3Nbc2V0VGFnXSA9XG50eXBlZEFycmF5VGFnc1tzdHJpbmdUYWddID0gdHlwZWRBcnJheVRhZ3Nbd2Vha01hcFRhZ10gPSBmYWxzZTtcblxuLyoqIFVzZWQgdG8gZGV0ZXJtaW5lIGlmIHZhbHVlcyBhcmUgb2YgdGhlIGxhbmd1YWdlIHR5cGUgYE9iamVjdGAuICovXG52YXIgb2JqZWN0VHlwZXMgPSB7XG4gICdmdW5jdGlvbic6IHRydWUsXG4gICdvYmplY3QnOiB0cnVlXG59O1xuXG4vKiogRGV0ZWN0IGZyZWUgdmFyaWFibGUgYGV4cG9ydHNgLiAqL1xudmFyIGZyZWVFeHBvcnRzID0gKG9iamVjdFR5cGVzW3R5cGVvZiBleHBvcnRzXSAmJiBleHBvcnRzICYmICFleHBvcnRzLm5vZGVUeXBlKVxuICA/IGV4cG9ydHNcbiAgOiB1bmRlZmluZWQ7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgbW9kdWxlYC4gKi9cbnZhciBmcmVlTW9kdWxlID0gKG9iamVjdFR5cGVzW3R5cGVvZiBtb2R1bGVdICYmIG1vZHVsZSAmJiAhbW9kdWxlLm5vZGVUeXBlKVxuICA/IG1vZHVsZVxuICA6IHVuZGVmaW5lZDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gY2hlY2tHbG9iYWwoZnJlZUV4cG9ydHMgJiYgZnJlZU1vZHVsZSAmJiB0eXBlb2YgZ2xvYmFsID09ICdvYmplY3QnICYmIGdsb2JhbCk7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSBjaGVja0dsb2JhbChvYmplY3RUeXBlc1t0eXBlb2Ygc2VsZl0gJiYgc2VsZik7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgd2luZG93YC4gKi9cbnZhciBmcmVlV2luZG93ID0gY2hlY2tHbG9iYWwob2JqZWN0VHlwZXNbdHlwZW9mIHdpbmRvd10gJiYgd2luZG93KTtcblxuLyoqIERldGVjdCBgdGhpc2AgYXMgdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgdGhpc0dsb2JhbCA9IGNoZWNrR2xvYmFsKG9iamVjdFR5cGVzW3R5cGVvZiB0aGlzXSAmJiB0aGlzKTtcblxuLyoqXG4gKiBVc2VkIGFzIGEgcmVmZXJlbmNlIHRvIHRoZSBnbG9iYWwgb2JqZWN0LlxuICpcbiAqIFRoZSBgdGhpc2AgdmFsdWUgaXMgdXNlZCBpZiBpdCdzIHRoZSBnbG9iYWwgb2JqZWN0IHRvIGF2b2lkIEdyZWFzZW1vbmtleSdzXG4gKiByZXN0cmljdGVkIGB3aW5kb3dgIG9iamVjdCwgb3RoZXJ3aXNlIHRoZSBgd2luZG93YCBvYmplY3QgaXMgdXNlZC5cbiAqL1xudmFyIHJvb3QgPSBmcmVlR2xvYmFsIHx8XG4gICgoZnJlZVdpbmRvdyAhPT0gKHRoaXNHbG9iYWwgJiYgdGhpc0dsb2JhbC53aW5kb3cpKSAmJiBmcmVlV2luZG93KSB8fFxuICAgIGZyZWVTZWxmIHx8IHRoaXNHbG9iYWwgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ubWFwYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBpdGVyYXRlZSBUaGUgZnVuY3Rpb24gaW52b2tlZCBwZXIgaXRlcmF0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBuZXcgbWFwcGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhcnJheU1hcChhcnJheSwgaXRlcmF0ZWUpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGgsXG4gICAgICByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuXG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGFycmF5W2luZGV4XSwgaW5kZXgsIGFycmF5KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5zb21lYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3IgaXRlcmF0ZWVcbiAqIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpdGVyYXRlIG92ZXIuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkaWNhdGUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbnkgZWxlbWVudCBwYXNzZXMgdGhlIHByZWRpY2F0ZSBjaGVjaywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBhcnJheVNvbWUoYXJyYXksIHByZWRpY2F0ZSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGlmIChwcmVkaWNhdGUoYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRpbWVzYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHNcbiAqIG9yIG1heCBhcnJheSBsZW5ndGggY2hlY2tzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge251bWJlcn0gbiBUaGUgbnVtYmVyIG9mIHRpbWVzIHRvIGludm9rZSBgaXRlcmF0ZWVgLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcmVzdWx0cy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRpbWVzKG4sIGl0ZXJhdGVlKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobik7XG5cbiAgd2hpbGUgKCsraW5kZXggPCBuKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGl0ZXJhdGVlKGluZGV4KTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvUGFpcnNgIGFuZCBgXy50b1BhaXJzSW5gIHdoaWNoIGNyZWF0ZXMgYW4gYXJyYXlcbiAqIG9mIGtleS12YWx1ZSBwYWlycyBmb3IgYG9iamVjdGAgY29ycmVzcG9uZGluZyB0byB0aGUgcHJvcGVydHkgbmFtZXMgb2YgYHByb3BzYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheX0gcHJvcHMgVGhlIHByb3BlcnR5IG5hbWVzIHRvIGdldCB2YWx1ZXMgZm9yLlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IGFycmF5IG9mIGtleS12YWx1ZSBwYWlycy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvUGFpcnMob2JqZWN0LCBwcm9wcykge1xuICByZXR1cm4gYXJyYXlNYXAocHJvcHMsIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBba2V5LCBvYmplY3Rba2V5XV07XG4gIH0pO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgZ2xvYmFsIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7bnVsbHxPYmplY3R9IFJldHVybnMgYHZhbHVlYCBpZiBpdCdzIGEgZ2xvYmFsIG9iamVjdCwgZWxzZSBgbnVsbGAuXG4gKi9cbmZ1bmN0aW9uIGNoZWNrR2xvYmFsKHZhbHVlKSB7XG4gIHJldHVybiAodmFsdWUgJiYgdmFsdWUuT2JqZWN0ID09PSBPYmplY3QpID8gdmFsdWUgOiBudWxsO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QgaW4gSUUgPCA5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgaG9zdCBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNIb3N0T2JqZWN0KHZhbHVlKSB7XG4gIC8vIE1hbnkgaG9zdCBvYmplY3RzIGFyZSBgT2JqZWN0YCBvYmplY3RzIHRoYXQgY2FuIGNvZXJjZSB0byBzdHJpbmdzXG4gIC8vIGRlc3BpdGUgaGF2aW5nIGltcHJvcGVybHkgZGVmaW5lZCBgdG9TdHJpbmdgIG1ldGhvZHMuXG4gIHZhciByZXN1bHQgPSBmYWxzZTtcbiAgaWYgKHZhbHVlICE9IG51bGwgJiYgdHlwZW9mIHZhbHVlLnRvU3RyaW5nICE9ICdmdW5jdGlvbicpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gISEodmFsdWUgKyAnJyk7XG4gICAgfSBjYXRjaCAoZSkge31cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBpbmRleC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcGFyYW0ge251bWJlcn0gW2xlbmd0aD1NQVhfU0FGRV9JTlRFR0VSXSBUaGUgdXBwZXIgYm91bmRzIG9mIGEgdmFsaWQgaW5kZXguXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGluZGV4LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSW5kZXgodmFsdWUsIGxlbmd0aCkge1xuICB2YWx1ZSA9ICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgfHwgcmVJc1VpbnQudGVzdCh2YWx1ZSkpID8gK3ZhbHVlIDogLTE7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuIHZhbHVlID4gLTEgJiYgdmFsdWUgJSAxID09IDAgJiYgdmFsdWUgPCBsZW5ndGg7XG59XG5cbi8qKlxuICogQ29udmVydHMgYG1hcGAgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBtYXAgVGhlIG1hcCB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIG1hcFRvQXJyYXkobWFwKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobWFwLnNpemUpO1xuXG4gIG1hcC5mb3JFYWNoKGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgICByZXN1bHRbKytpbmRleF0gPSBba2V5LCB2YWx1ZV07XG4gIH0pO1xuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzZXRgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc2V0IFRoZSBzZXQgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBzZXRUb0FycmF5KHNldCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KHNldC5zaXplKTtcblxuICBzZXQuZm9yRWFjaChmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJlc3VsdFsrK2luZGV4XSA9IHZhbHVlO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIGFycmF5UHJvdG8gPSBBcnJheS5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gRnVuY3Rpb24ucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKipcbiAqIFVzZWQgdG8gcmVzb2x2ZSB0aGUgW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgaWYgYSBtZXRob2QgaXMgbmF0aXZlLiAqL1xudmFyIHJlSXNOYXRpdmUgPSBSZWdFeHAoJ14nICtcbiAgZnVuY1RvU3RyaW5nLmNhbGwoaGFzT3duUHJvcGVydHkpLnJlcGxhY2UocmVSZWdFeHBDaGFyLCAnXFxcXCQmJylcbiAgLnJlcGxhY2UoL2hhc093blByb3BlcnR5fChmdW5jdGlvbikuKj8oPz1cXFxcXFwoKXwgZm9yIC4rPyg/PVxcXFxcXF0pL2csICckMS4qPycpICsgJyQnXG4pO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbCxcbiAgICBVaW50OEFycmF5ID0gcm9vdC5VaW50OEFycmF5LFxuICAgIGdldFByb3RvdHlwZU9mID0gT2JqZWN0LmdldFByb3RvdHlwZU9mLFxuICAgIHByb3BlcnR5SXNFbnVtZXJhYmxlID0gb2JqZWN0UHJvdG8ucHJvcGVydHlJc0VudW1lcmFibGUsXG4gICAgc3BsaWNlID0gYXJyYXlQcm90by5zcGxpY2U7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVLZXlzID0gT2JqZWN0LmtleXM7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHRoYXQgYXJlIHZlcmlmaWVkIHRvIGJlIG5hdGl2ZS4gKi9cbnZhciBNYXAgPSBnZXROYXRpdmUocm9vdCwgJ01hcCcpLFxuICAgIFNldCA9IGdldE5hdGl2ZShyb290LCAnU2V0JyksXG4gICAgV2Vha01hcCA9IGdldE5hdGl2ZShyb290LCAnV2Vha01hcCcpLFxuICAgIG5hdGl2ZUNyZWF0ZSA9IGdldE5hdGl2ZShPYmplY3QsICdjcmVhdGUnKTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG1hcHMsIHNldHMsIGFuZCB3ZWFrbWFwcy4gKi9cbnZhciBtYXBDdG9yU3RyaW5nID0gTWFwID8gZnVuY1RvU3RyaW5nLmNhbGwoTWFwKSA6ICcnLFxuICAgIHNldEN0b3JTdHJpbmcgPSBTZXQgPyBmdW5jVG9TdHJpbmcuY2FsbChTZXQpIDogJycsXG4gICAgd2Vha01hcEN0b3JTdHJpbmcgPSBXZWFrTWFwID8gZnVuY1RvU3RyaW5nLmNhbGwoV2Vha01hcCkgOiAnJztcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFZhbHVlT2YgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnZhbHVlT2YgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gaGFzaCBvYmplY3QuXG4gKlxuICogQHByaXZhdGVcbiAqIEBjb25zdHJ1Y3RvclxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbmV3IGhhc2ggb2JqZWN0LlxuICovXG5mdW5jdGlvbiBIYXNoKCkge31cblxuLyoqXG4gKiBSZW1vdmVzIGBrZXlgIGFuZCBpdHMgdmFsdWUgZnJvbSB0aGUgaGFzaC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hEZWxldGUoaGFzaCwga2V5KSB7XG4gIHJldHVybiBoYXNoSGFzKGhhc2gsIGtleSkgJiYgZGVsZXRlIGhhc2hba2V5XTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBoYXNoIHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IGhhc2ggVGhlIGhhc2ggdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gaGFzaEdldChoYXNoLCBrZXkpIHtcbiAgaWYgKG5hdGl2ZUNyZWF0ZSkge1xuICAgIHZhciByZXN1bHQgPSBoYXNoW2tleV07XG4gICAgcmV0dXJuIHJlc3VsdCA9PT0gSEFTSF9VTkRFRklORUQgPyB1bmRlZmluZWQgOiByZXN1bHQ7XG4gIH1cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwoaGFzaCwga2V5KSA/IGhhc2hba2V5XSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYSBoYXNoIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBlbnRyeSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhbiBlbnRyeSBmb3IgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc2hIYXMoaGFzaCwga2V5KSB7XG4gIHJldHVybiBuYXRpdmVDcmVhdGUgPyBoYXNoW2tleV0gIT09IHVuZGVmaW5lZCA6IGhhc093blByb3BlcnR5LmNhbGwoaGFzaCwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBoYXNoIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBoYXNoIFRoZSBoYXNoIHRvIG1vZGlmeS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICovXG5mdW5jdGlvbiBoYXNoU2V0KGhhc2gsIGtleSwgdmFsdWUpIHtcbiAgaGFzaFtrZXldID0gKG5hdGl2ZUNyZWF0ZSAmJiB2YWx1ZSA9PT0gdW5kZWZpbmVkKSA/IEhBU0hfVU5ERUZJTkVEIDogdmFsdWU7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG1hcCBjYWNoZSBvYmplY3QgdG8gc3RvcmUga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7QXJyYXl9IFt2YWx1ZXNdIFRoZSB2YWx1ZXMgdG8gY2FjaGUuXG4gKi9cbmZ1bmN0aW9uIE1hcENhY2hlKHZhbHVlcykge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IHZhbHVlcyA/IHZhbHVlcy5sZW5ndGggOiAwO1xuXG4gIHRoaXMuY2xlYXIoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICB2YXIgZW50cnkgPSB2YWx1ZXNbaW5kZXhdO1xuICAgIHRoaXMuc2V0KGVudHJ5WzBdLCBlbnRyeVsxXSk7XG4gIH1cbn1cblxuLyoqXG4gKiBSZW1vdmVzIGFsbCBrZXktdmFsdWUgZW50cmllcyBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqL1xuZnVuY3Rpb24gbWFwQ2xlYXIoKSB7XG4gIHRoaXMuX19kYXRhX18gPSB7XG4gICAgJ2hhc2gnOiBuZXcgSGFzaCxcbiAgICAnbWFwJzogTWFwID8gbmV3IE1hcCA6IFtdLFxuICAgICdzdHJpbmcnOiBuZXcgSGFzaFxuICB9O1xufVxuXG4vKipcbiAqIFJlbW92ZXMgYGtleWAgYW5kIGl0cyB2YWx1ZSBmcm9tIHRoZSBtYXAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGRlbGV0ZVxuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChpc0tleWFibGUoa2V5KSkge1xuICAgIHJldHVybiBoYXNoRGVsZXRlKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyBkYXRhLnN0cmluZyA6IGRhdGEuaGFzaCwga2V5KTtcbiAgfVxuICByZXR1cm4gTWFwID8gZGF0YS5tYXBbJ2RlbGV0ZSddKGtleSkgOiBhc3NvY0RlbGV0ZShkYXRhLm1hcCwga2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBtYXAgdmFsdWUgZm9yIGBrZXlgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBnZXRcbiAqIEBtZW1iZXJPZiBNYXBDYWNoZVxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIG1hcEdldChrZXkpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoaXNLZXlhYmxlKGtleSkpIHtcbiAgICByZXR1cm4gaGFzaEdldCh0eXBlb2Yga2V5ID09ICdzdHJpbmcnID8gZGF0YS5zdHJpbmcgOiBkYXRhLmhhc2gsIGtleSk7XG4gIH1cbiAgcmV0dXJuIE1hcCA/IGRhdGEubWFwLmdldChrZXkpIDogYXNzb2NHZXQoZGF0YS5tYXAsIGtleSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGEgbWFwIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIE1hcENhY2hlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gbWFwSGFzKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX187XG4gIGlmIChpc0tleWFibGUoa2V5KSkge1xuICAgIHJldHVybiBoYXNoSGFzKHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyBkYXRhLnN0cmluZyA6IGRhdGEuaGFzaCwga2V5KTtcbiAgfVxuICByZXR1cm4gTWFwID8gZGF0YS5tYXAuaGFzKGtleSkgOiBhc3NvY0hhcyhkYXRhLm1hcCwga2V5KTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBtYXAgYGtleWAgdG8gYHZhbHVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQG5hbWUgc2V0XG4gKiBAbWVtYmVyT2YgTWFwQ2FjaGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgVGhlIGtleSBvZiB0aGUgdmFsdWUgdG8gc2V0LlxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gc2V0LlxuICogQHJldHVybnMge09iamVjdH0gUmV0dXJucyB0aGUgbWFwIGNhY2hlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gbWFwU2V0KGtleSwgdmFsdWUpIHtcbiAgdmFyIGRhdGEgPSB0aGlzLl9fZGF0YV9fO1xuICBpZiAoaXNLZXlhYmxlKGtleSkpIHtcbiAgICBoYXNoU2V0KHR5cGVvZiBrZXkgPT0gJ3N0cmluZycgPyBkYXRhLnN0cmluZyA6IGRhdGEuaGFzaCwga2V5LCB2YWx1ZSk7XG4gIH0gZWxzZSBpZiAoTWFwKSB7XG4gICAgZGF0YS5tYXAuc2V0KGtleSwgdmFsdWUpO1xuICB9IGVsc2Uge1xuICAgIGFzc29jU2V0KGRhdGEubWFwLCBrZXksIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgc3RhY2sgY2FjaGUgb2JqZWN0IHRvIHN0b3JlIGtleS12YWx1ZSBwYWlycy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0FycmF5fSBbdmFsdWVzXSBUaGUgdmFsdWVzIHRvIGNhY2hlLlxuICovXG5mdW5jdGlvbiBTdGFjayh2YWx1ZXMpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSB2YWx1ZXMgPyB2YWx1ZXMubGVuZ3RoIDogMDtcblxuICB0aGlzLmNsZWFyKCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgdmFyIGVudHJ5ID0gdmFsdWVzW2luZGV4XTtcbiAgICB0aGlzLnNldChlbnRyeVswXSwgZW50cnlbMV0pO1xuICB9XG59XG5cbi8qKlxuICogUmVtb3ZlcyBhbGwga2V5LXZhbHVlIGVudHJpZXMgZnJvbSB0aGUgc3RhY2suXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGNsZWFyXG4gKiBAbWVtYmVyT2YgU3RhY2tcbiAqL1xuZnVuY3Rpb24gc3RhY2tDbGVhcigpIHtcbiAgdGhpcy5fX2RhdGFfXyA9IHsgJ2FycmF5JzogW10sICdtYXAnOiBudWxsIH07XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIHN0YWNrLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAbmFtZSBkZWxldGVcbiAqIEBtZW1iZXJPZiBTdGFja1xuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byByZW1vdmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGVudHJ5IHdhcyByZW1vdmVkLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIHN0YWNrRGVsZXRlKGtleSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBhcnJheSA9IGRhdGEuYXJyYXk7XG5cbiAgcmV0dXJuIGFycmF5ID8gYXNzb2NEZWxldGUoYXJyYXksIGtleSkgOiBkYXRhLm1hcFsnZGVsZXRlJ10oa2V5KTtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBzdGFjayB2YWx1ZSBmb3IgYGtleWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGdldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBlbnRyeSB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gc3RhY2tHZXQoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGFycmF5ID0gZGF0YS5hcnJheTtcblxuICByZXR1cm4gYXJyYXkgPyBhc3NvY0dldChhcnJheSwga2V5KSA6IGRhdGEubWFwLmdldChrZXkpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhIHN0YWNrIHZhbHVlIGZvciBga2V5YCBleGlzdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIGhhc1xuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tIYXMoa2V5KSB7XG4gIHZhciBkYXRhID0gdGhpcy5fX2RhdGFfXyxcbiAgICAgIGFycmF5ID0gZGF0YS5hcnJheTtcblxuICByZXR1cm4gYXJyYXkgPyBhc3NvY0hhcyhhcnJheSwga2V5KSA6IGRhdGEubWFwLmhhcyhrZXkpO1xufVxuXG4vKipcbiAqIFNldHMgdGhlIHN0YWNrIGBrZXlgIHRvIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBuYW1lIHNldFxuICogQG1lbWJlck9mIFN0YWNrXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHNldC5cbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHNldC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFJldHVybnMgdGhlIHN0YWNrIGNhY2hlIG9iamVjdC5cbiAqL1xuZnVuY3Rpb24gc3RhY2tTZXQoa2V5LCB2YWx1ZSkge1xuICB2YXIgZGF0YSA9IHRoaXMuX19kYXRhX18sXG4gICAgICBhcnJheSA9IGRhdGEuYXJyYXk7XG5cbiAgaWYgKGFycmF5KSB7XG4gICAgaWYgKGFycmF5Lmxlbmd0aCA8IChMQVJHRV9BUlJBWV9TSVpFIC0gMSkpIHtcbiAgICAgIGFzc29jU2V0KGFycmF5LCBrZXksIHZhbHVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YS5hcnJheSA9IG51bGw7XG4gICAgICBkYXRhLm1hcCA9IG5ldyBNYXBDYWNoZShhcnJheSk7XG4gICAgfVxuICB9XG4gIHZhciBtYXAgPSBkYXRhLm1hcDtcbiAgaWYgKG1hcCkge1xuICAgIG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG5cbi8qKlxuICogUmVtb3ZlcyBga2V5YCBhbmQgaXRzIHZhbHVlIGZyb20gdGhlIGFzc29jaWF0aXZlIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHZhbHVlIHRvIHJlbW92ZS5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZW50cnkgd2FzIHJlbW92ZWQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NEZWxldGUoYXJyYXksIGtleSkge1xuICB2YXIgaW5kZXggPSBhc3NvY0luZGV4T2YoYXJyYXksIGtleSk7XG4gIGlmIChpbmRleCA8IDApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGxhc3RJbmRleCA9IGFycmF5Lmxlbmd0aCAtIDE7XG4gIGlmIChpbmRleCA9PSBsYXN0SW5kZXgpIHtcbiAgICBhcnJheS5wb3AoKTtcbiAgfSBlbHNlIHtcbiAgICBzcGxpY2UuY2FsbChhcnJheSwgaW5kZXgsIDEpO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIGFzc29jaWF0aXZlIGFycmF5IHZhbHVlIGZvciBga2V5YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBnZXQuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgZW50cnkgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFzc29jR2V0KGFycmF5LCBrZXkpIHtcbiAgdmFyIGluZGV4ID0gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpO1xuICByZXR1cm4gaW5kZXggPCAwID8gdW5kZWZpbmVkIDogYXJyYXlbaW5kZXhdWzFdO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBhbiBhc3NvY2lhdGl2ZSBhcnJheSB2YWx1ZSBmb3IgYGtleWAgZXhpc3RzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIGVudHJ5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGFuIGVudHJ5IGZvciBga2V5YCBleGlzdHMsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NIYXMoYXJyYXksIGtleSkge1xuICByZXR1cm4gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpID4gLTE7XG59XG5cbi8qKlxuICogR2V0cyB0aGUgaW5kZXggYXQgd2hpY2ggdGhlIGZpcnN0IG9jY3VycmVuY2Ugb2YgYGtleWAgaXMgZm91bmQgaW4gYGFycmF5YFxuICogb2Yga2V5LXZhbHVlIHBhaXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2VhcmNoLlxuICogQHBhcmFtIHsqfSBrZXkgVGhlIGtleSB0byBzZWFyY2ggZm9yLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIG1hdGNoZWQgdmFsdWUsIGVsc2UgYC0xYC5cbiAqL1xuZnVuY3Rpb24gYXNzb2NJbmRleE9mKGFycmF5LCBrZXkpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgaWYgKGVxKGFycmF5W2xlbmd0aF1bMF0sIGtleSkpIHtcbiAgICAgIHJldHVybiBsZW5ndGg7XG4gICAgfVxuICB9XG4gIHJldHVybiAtMTtcbn1cblxuLyoqXG4gKiBTZXRzIHRoZSBhc3NvY2lhdGl2ZSBhcnJheSBga2V5YCB0byBgdmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gbW9kaWZ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSB2YWx1ZSB0byBzZXQuXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBzZXQuXG4gKi9cbmZ1bmN0aW9uIGFzc29jU2V0KGFycmF5LCBrZXksIHZhbHVlKSB7XG4gIHZhciBpbmRleCA9IGFzc29jSW5kZXhPZihhcnJheSwga2V5KTtcbiAgaWYgKGluZGV4IDwgMCkge1xuICAgIGFycmF5LnB1c2goW2tleSwgdmFsdWVdKTtcbiAgfSBlbHNlIHtcbiAgICBhcnJheVtpbmRleF1bMV0gPSB2YWx1ZTtcbiAgfVxufVxuXG4vKipcbiAqIENhc3RzIGB2YWx1ZWAgdG8gYSBwYXRoIGFycmF5IGlmIGl0J3Mgbm90IG9uZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICovXG5mdW5jdGlvbiBiYXNlQ2FzdFBhdGgodmFsdWUpIHtcbiAgcmV0dXJuIGlzQXJyYXkodmFsdWUpID8gdmFsdWUgOiBzdHJpbmdUb1BhdGgodmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmdldGAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWZhdWx0IHZhbHVlcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSByZXNvbHZlZCB2YWx1ZS5cbiAqL1xuZnVuY3Rpb24gYmFzZUdldChvYmplY3QsIHBhdGgpIHtcbiAgcGF0aCA9IGlzS2V5KHBhdGgsIG9iamVjdCkgPyBbcGF0aCArICcnXSA6IGJhc2VDYXN0UGF0aChwYXRoKTtcblxuICB2YXIgaW5kZXggPSAwLFxuICAgICAgbGVuZ3RoID0gcGF0aC5sZW5ndGg7XG5cbiAgd2hpbGUgKG9iamVjdCAhPSBudWxsICYmIGluZGV4IDwgbGVuZ3RoKSB7XG4gICAgb2JqZWN0ID0gb2JqZWN0W3BhdGhbaW5kZXgrK11dO1xuICB9XG4gIHJldHVybiAoaW5kZXggJiYgaW5kZXggPT0gbGVuZ3RoKSA/IG9iamVjdCA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IGtleSBUaGUga2V5IHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGBrZXlgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSGFzKG9iamVjdCwga2V5KSB7XG4gIC8vIEF2b2lkIGEgYnVnIGluIElFIDEwLTExIHdoZXJlIG9iamVjdHMgd2l0aCBhIFtbUHJvdG90eXBlXV0gb2YgYG51bGxgLFxuICAvLyB0aGF0IGFyZSBjb21wb3NlZCBlbnRpcmVseSBvZiBpbmRleCBwcm9wZXJ0aWVzLCByZXR1cm4gYGZhbHNlYCBmb3JcbiAgLy8gYGhhc093blByb3BlcnR5YCBjaGVja3Mgb2YgdGhlbS5cbiAgcmV0dXJuIGhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBrZXkpIHx8XG4gICAgKHR5cGVvZiBvYmplY3QgPT0gJ29iamVjdCcgJiYga2V5IGluIG9iamVjdCAmJiBnZXRQcm90b3R5cGVPZihvYmplY3QpID09PSBudWxsKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5oYXNJbmAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30ga2V5IFRoZSBrZXkgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYGtleWAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VIYXNJbihvYmplY3QsIGtleSkge1xuICByZXR1cm4ga2V5IGluIE9iamVjdChvYmplY3QpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmlzRXF1YWxgIHdoaWNoIHN1cHBvcnRzIHBhcnRpYWwgY29tcGFyaXNvbnNcbiAqIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gW2N1c3RvbWl6ZXJdIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtiaXRtYXNrXSBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLlxuICogIFRoZSBiaXRtYXNrIG1heSBiZSBjb21wb3NlZCBvZiB0aGUgZm9sbG93aW5nIGZsYWdzOlxuICogICAgIDEgLSBVbm9yZGVyZWQgY29tcGFyaXNvblxuICogICAgIDIgLSBQYXJ0aWFsIGNvbXBhcmlzb25cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYHZhbHVlYCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gYmFzZUlzRXF1YWwodmFsdWUsIG90aGVyLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICBpZiAodmFsdWUgPT09IG90aGVyKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwgfHwgb3RoZXIgPT0gbnVsbCB8fCAoIWlzT2JqZWN0KHZhbHVlKSAmJiAhaXNPYmplY3RMaWtlKG90aGVyKSkpIHtcbiAgICByZXR1cm4gdmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcjtcbiAgfVxuICByZXR1cm4gYmFzZUlzRXF1YWxEZWVwKHZhbHVlLCBvdGhlciwgYmFzZUlzRXF1YWwsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsYCBmb3IgYXJyYXlzIGFuZCBvYmplY3RzIHdoaWNoIHBlcmZvcm1zXG4gKiBkZWVwIGNvbXBhcmlzb25zIGFuZCB0cmFja3MgdHJhdmVyc2VkIG9iamVjdHMgZW5hYmxpbmcgb2JqZWN0cyB3aXRoIGNpcmN1bGFyXG4gKiByZWZlcmVuY2VzIHRvIGJlIGNvbXBhcmVkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbYml0bWFza10gVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbc3RhY2tdIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBiYXNlSXNFcXVhbERlZXAob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgb2JqSXNBcnIgPSBpc0FycmF5KG9iamVjdCksXG4gICAgICBvdGhJc0FyciA9IGlzQXJyYXkob3RoZXIpLFxuICAgICAgb2JqVGFnID0gYXJyYXlUYWcsXG4gICAgICBvdGhUYWcgPSBhcnJheVRhZztcblxuICBpZiAoIW9iaklzQXJyKSB7XG4gICAgb2JqVGFnID0gZ2V0VGFnKG9iamVjdCk7XG4gICAgb2JqVGFnID0gb2JqVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvYmpUYWc7XG4gIH1cbiAgaWYgKCFvdGhJc0Fycikge1xuICAgIG90aFRhZyA9IGdldFRhZyhvdGhlcik7XG4gICAgb3RoVGFnID0gb3RoVGFnID09IGFyZ3NUYWcgPyBvYmplY3RUYWcgOiBvdGhUYWc7XG4gIH1cbiAgdmFyIG9iaklzT2JqID0gb2JqVGFnID09IG9iamVjdFRhZyAmJiAhaXNIb3N0T2JqZWN0KG9iamVjdCksXG4gICAgICBvdGhJc09iaiA9IG90aFRhZyA9PSBvYmplY3RUYWcgJiYgIWlzSG9zdE9iamVjdChvdGhlciksXG4gICAgICBpc1NhbWVUYWcgPSBvYmpUYWcgPT0gb3RoVGFnO1xuXG4gIGlmIChpc1NhbWVUYWcgJiYgIW9iaklzT2JqKSB7XG4gICAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgICByZXR1cm4gKG9iaklzQXJyIHx8IGlzVHlwZWRBcnJheShvYmplY3QpKVxuICAgICAgPyBlcXVhbEFycmF5cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKVxuICAgICAgOiBlcXVhbEJ5VGFnKG9iamVjdCwgb3RoZXIsIG9ialRhZywgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjayk7XG4gIH1cbiAgaWYgKCEoYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHKSkge1xuICAgIHZhciBvYmpJc1dyYXBwZWQgPSBvYmpJc09iaiAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgJ19fd3JhcHBlZF9fJyksXG4gICAgICAgIG90aElzV3JhcHBlZCA9IG90aElzT2JqICYmIGhhc093blByb3BlcnR5LmNhbGwob3RoZXIsICdfX3dyYXBwZWRfXycpO1xuXG4gICAgaWYgKG9iaklzV3JhcHBlZCB8fCBvdGhJc1dyYXBwZWQpIHtcbiAgICAgIHN0YWNrIHx8IChzdGFjayA9IG5ldyBTdGFjayk7XG4gICAgICByZXR1cm4gZXF1YWxGdW5jKG9iaklzV3JhcHBlZCA/IG9iamVjdC52YWx1ZSgpIDogb2JqZWN0LCBvdGhJc1dyYXBwZWQgPyBvdGhlci52YWx1ZSgpIDogb3RoZXIsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbiAgICB9XG4gIH1cbiAgaWYgKCFpc1NhbWVUYWcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgc3RhY2sgfHwgKHN0YWNrID0gbmV3IFN0YWNrKTtcbiAgcmV0dXJuIGVxdWFsT2JqZWN0cyhvYmplY3QsIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5pc01hdGNoYCB3aXRob3V0IHN1cHBvcnQgZm9yIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtPYmplY3R9IHNvdXJjZSBUaGUgb2JqZWN0IG9mIHByb3BlcnR5IHZhbHVlcyB0byBtYXRjaC5cbiAqIEBwYXJhbSB7QXJyYXl9IG1hdGNoRGF0YSBUaGUgcHJvcGVydHkgbmFtZXMsIHZhbHVlcywgYW5kIGNvbXBhcmUgZmxhZ3MgdG8gbWF0Y2guXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbY3VzdG9taXplcl0gVGhlIGZ1bmN0aW9uIHRvIGN1c3RvbWl6ZSBjb21wYXJpc29ucy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgb2JqZWN0YCBpcyBhIG1hdGNoLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VJc01hdGNoKG9iamVjdCwgc291cmNlLCBtYXRjaERhdGEsIGN1c3RvbWl6ZXIpIHtcbiAgdmFyIGluZGV4ID0gbWF0Y2hEYXRhLmxlbmd0aCxcbiAgICAgIGxlbmd0aCA9IGluZGV4LFxuICAgICAgbm9DdXN0b21pemVyID0gIWN1c3RvbWl6ZXI7XG5cbiAgaWYgKG9iamVjdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuICFsZW5ndGg7XG4gIH1cbiAgb2JqZWN0ID0gT2JqZWN0KG9iamVjdCk7XG4gIHdoaWxlIChpbmRleC0tKSB7XG4gICAgdmFyIGRhdGEgPSBtYXRjaERhdGFbaW5kZXhdO1xuICAgIGlmICgobm9DdXN0b21pemVyICYmIGRhdGFbMl0pXG4gICAgICAgICAgPyBkYXRhWzFdICE9PSBvYmplY3RbZGF0YVswXV1cbiAgICAgICAgICA6ICEoZGF0YVswXSBpbiBvYmplY3QpXG4gICAgICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIGRhdGEgPSBtYXRjaERhdGFbaW5kZXhdO1xuICAgIHZhciBrZXkgPSBkYXRhWzBdLFxuICAgICAgICBvYmpWYWx1ZSA9IG9iamVjdFtrZXldLFxuICAgICAgICBzcmNWYWx1ZSA9IGRhdGFbMV07XG5cbiAgICBpZiAobm9DdXN0b21pemVyICYmIGRhdGFbMl0pIHtcbiAgICAgIGlmIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkICYmICEoa2V5IGluIG9iamVjdCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc3RhY2sgPSBuZXcgU3RhY2ssXG4gICAgICAgICAgcmVzdWx0ID0gY3VzdG9taXplciA/IGN1c3RvbWl6ZXIob2JqVmFsdWUsIHNyY1ZhbHVlLCBrZXksIG9iamVjdCwgc291cmNlLCBzdGFjaykgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGlmICghKHJlc3VsdCA9PT0gdW5kZWZpbmVkXG4gICAgICAgICAgICA/IGJhc2VJc0VxdWFsKHNyY1ZhbHVlLCBvYmpWYWx1ZSwgY3VzdG9taXplciwgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyB8IFBBUlRJQUxfQ09NUEFSRV9GTEFHLCBzdGFjaylcbiAgICAgICAgICAgIDogcmVzdWx0XG4gICAgICAgICAgKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB0cnVlO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLml0ZXJhdGVlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSBbdmFsdWU9Xy5pZGVudGl0eV0gVGhlIHZhbHVlIHRvIGNvbnZlcnQgdG8gYW4gaXRlcmF0ZWUuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIGl0ZXJhdGVlLlxuICovXG5mdW5jdGlvbiBiYXNlSXRlcmF0ZWUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIGlmICh0eXBlID09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gaWRlbnRpdHk7XG4gIH1cbiAgaWYgKHR5cGUgPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gaXNBcnJheSh2YWx1ZSlcbiAgICAgID8gYmFzZU1hdGNoZXNQcm9wZXJ0eSh2YWx1ZVswXSwgdmFsdWVbMV0pXG4gICAgICA6IGJhc2VNYXRjaGVzKHZhbHVlKTtcbiAgfVxuICByZXR1cm4gcHJvcGVydHkodmFsdWUpO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLmtleXNgIHdoaWNoIGRvZXNuJ3Qgc2tpcCB0aGUgY29uc3RydWN0b3JcbiAqIHByb3BlcnR5IG9mIHByb3RvdHlwZXMgb3IgdHJlYXQgc3BhcnNlIGFycmF5cyBhcyBkZW5zZS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBhcnJheSBvZiBwcm9wZXJ0eSBuYW1lcy5cbiAqL1xuZnVuY3Rpb24gYmFzZUtleXMob2JqZWN0KSB7XG4gIHJldHVybiBuYXRpdmVLZXlzKE9iamVjdChvYmplY3QpKTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5tYXRjaGVzYCB3aGljaCBkb2Vzbid0IGNsb25lIGBzb3VyY2VgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gc291cmNlIFRoZSBvYmplY3Qgb2YgcHJvcGVydHkgdmFsdWVzIHRvIG1hdGNoLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VNYXRjaGVzKHNvdXJjZSkge1xuICB2YXIgbWF0Y2hEYXRhID0gZ2V0TWF0Y2hEYXRhKHNvdXJjZSk7XG4gIGlmIChtYXRjaERhdGEubGVuZ3RoID09IDEgJiYgbWF0Y2hEYXRhWzBdWzJdKSB7XG4gICAgdmFyIGtleSA9IG1hdGNoRGF0YVswXVswXSxcbiAgICAgICAgdmFsdWUgPSBtYXRjaERhdGFbMF1bMV07XG5cbiAgICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG9iamVjdFtrZXldID09PSB2YWx1ZSAmJlxuICAgICAgICAodmFsdWUgIT09IHVuZGVmaW5lZCB8fCAoa2V5IGluIE9iamVjdChvYmplY3QpKSk7XG4gICAgfTtcbiAgfVxuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PT0gc291cmNlIHx8IGJhc2VJc01hdGNoKG9iamVjdCwgc291cmNlLCBtYXRjaERhdGEpO1xuICB9O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLm1hdGNoZXNQcm9wZXJ0eWAgd2hpY2ggZG9lc24ndCBjbG9uZSBgc3JjVmFsdWVgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHBhcmFtIHsqfSBzcmNWYWx1ZSBUaGUgdmFsdWUgdG8gbWF0Y2guXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gYmFzZU1hdGNoZXNQcm9wZXJ0eShwYXRoLCBzcmNWYWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24ob2JqZWN0KSB7XG4gICAgdmFyIG9ialZhbHVlID0gZ2V0KG9iamVjdCwgcGF0aCk7XG4gICAgcmV0dXJuIChvYmpWYWx1ZSA9PT0gdW5kZWZpbmVkICYmIG9ialZhbHVlID09PSBzcmNWYWx1ZSlcbiAgICAgID8gaGFzSW4ob2JqZWN0LCBwYXRoKVxuICAgICAgOiBiYXNlSXNFcXVhbChzcmNWYWx1ZSwgb2JqVmFsdWUsIHVuZGVmaW5lZCwgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyB8IFBBUlRJQUxfQ09NUEFSRV9GTEFHKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eWAgd2l0aG91dCBzdXBwb3J0IGZvciBkZWVwIHBhdGhzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30ga2V5IFRoZSBrZXkgb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHkoa2V5KSB7XG4gIHJldHVybiBmdW5jdGlvbihvYmplY3QpIHtcbiAgICByZXR1cm4gb2JqZWN0ID09IG51bGwgPyB1bmRlZmluZWQgOiBvYmplY3Rba2V5XTtcbiAgfTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VQcm9wZXJ0eWAgd2hpY2ggc3VwcG9ydHMgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheXxzdHJpbmd9IHBhdGggVGhlIHBhdGggb2YgdGhlIHByb3BlcnR5IHRvIGdldC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG9iamVjdCkge1xuICAgIHJldHVybiBiYXNlR2V0KG9iamVjdCwgcGF0aCk7XG4gIH07XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8uc2xpY2VgIHdpdGhvdXQgYW4gaXRlcmF0ZWUgY2FsbCBndWFyZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIHNsaWNlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD0wXSBUaGUgc3RhcnQgcG9zaXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gW2VuZD1hcnJheS5sZW5ndGhdIFRoZSBlbmQgcG9zaXRpb24uXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHNsaWNlIG9mIGBhcnJheWAuXG4gKi9cbmZ1bmN0aW9uIGJhc2VTbGljZShhcnJheSwgc3RhcnQsIGVuZCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcblxuICBpZiAoc3RhcnQgPCAwKSB7XG4gICAgc3RhcnQgPSAtc3RhcnQgPiBsZW5ndGggPyAwIDogKGxlbmd0aCArIHN0YXJ0KTtcbiAgfVxuICBlbmQgPSBlbmQgPiBsZW5ndGggPyBsZW5ndGggOiBlbmQ7XG4gIGlmIChlbmQgPCAwKSB7XG4gICAgZW5kICs9IGxlbmd0aDtcbiAgfVxuICBsZW5ndGggPSBzdGFydCA+IGVuZCA/IDAgOiAoKGVuZCAtIHN0YXJ0KSA+Pj4gMCk7XG4gIHN0YXJ0ID4+Pj0gMDtcblxuICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICByZXN1bHRbaW5kZXhdID0gYXJyYXlbaW5kZXggKyBzdGFydF07XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIGFycmF5cyB3aXRoIHN1cHBvcnQgZm9yXG4gKiBwYXJ0aWFsIGRlZXAgY29tcGFyaXNvbnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBjb21wYXJlLlxuICogQHBhcmFtIHtBcnJheX0gb3RoZXIgVGhlIG90aGVyIGFycmF5IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYGFycmF5YCBhbmQgYG90aGVyYCBvYmplY3RzLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcnJheXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxBcnJheXMoYXJyYXksIG90aGVyLCBlcXVhbEZ1bmMsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHLFxuICAgICAgaXNVbm9yZGVyZWQgPSBiaXRtYXNrICYgVU5PUkRFUkVEX0NPTVBBUkVfRkxBRyxcbiAgICAgIGFyckxlbmd0aCA9IGFycmF5Lmxlbmd0aCxcbiAgICAgIG90aExlbmd0aCA9IG90aGVyLmxlbmd0aDtcblxuICBpZiAoYXJyTGVuZ3RoICE9IG90aExlbmd0aCAmJiAhKGlzUGFydGlhbCAmJiBvdGhMZW5ndGggPiBhcnJMZW5ndGgpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgdmFyIHN0YWNrZWQgPSBzdGFjay5nZXQoYXJyYXkpO1xuICBpZiAoc3RhY2tlZCkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQoYXJyYXksIG90aGVyKTtcblxuICAvLyBJZ25vcmUgbm9uLWluZGV4IHByb3BlcnRpZXMuXG4gIHdoaWxlICgrK2luZGV4IDwgYXJyTGVuZ3RoKSB7XG4gICAgdmFyIGFyclZhbHVlID0gYXJyYXlbaW5kZXhdLFxuICAgICAgICBvdGhWYWx1ZSA9IG90aGVyW2luZGV4XTtcblxuICAgIGlmIChjdXN0b21pemVyKSB7XG4gICAgICB2YXIgY29tcGFyZWQgPSBpc1BhcnRpYWxcbiAgICAgICAgPyBjdXN0b21pemVyKG90aFZhbHVlLCBhcnJWYWx1ZSwgaW5kZXgsIG90aGVyLCBhcnJheSwgc3RhY2spXG4gICAgICAgIDogY3VzdG9taXplcihhcnJWYWx1ZSwgb3RoVmFsdWUsIGluZGV4LCBhcnJheSwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgaWYgKGNvbXBhcmVkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmIChjb21wYXJlZCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgYXJyYXlzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKGlzVW5vcmRlcmVkKSB7XG4gICAgICBpZiAoIWFycmF5U29tZShvdGhlciwgZnVuY3Rpb24ob3RoVmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiBhcnJWYWx1ZSA9PT0gb3RoVmFsdWUgfHwgZXF1YWxGdW5jKGFyclZhbHVlLCBvdGhWYWx1ZSwgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spO1xuICAgICAgICAgIH0pKSB7XG4gICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCEoYXJyVmFsdWUgPT09IG90aFZhbHVlIHx8IGVxdWFsRnVuYyhhcnJWYWx1ZSwgb3RoVmFsdWUsIGN1c3RvbWl6ZXIsIGJpdG1hc2ssIHN0YWNrKSkpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHN0YWNrWydkZWxldGUnXShhcnJheSk7XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQSBzcGVjaWFsaXplZCB2ZXJzaW9uIG9mIGBiYXNlSXNFcXVhbERlZXBgIGZvciBjb21wYXJpbmcgb2JqZWN0cyBvZlxuICogdGhlIHNhbWUgYHRvU3RyaW5nVGFnYC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBmdW5jdGlvbiBvbmx5IHN1cHBvcnRzIGNvbXBhcmluZyB2YWx1ZXMgd2l0aCB0YWdzIG9mXG4gKiBgQm9vbGVhbmAsIGBEYXRlYCwgYEVycm9yYCwgYE51bWJlcmAsIGBSZWdFeHBgLCBvciBgU3RyaW5nYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge09iamVjdH0gb3RoZXIgVGhlIG90aGVyIG9iamVjdCB0byBjb21wYXJlLlxuICogQHBhcmFtIHtzdHJpbmd9IHRhZyBUaGUgYHRvU3RyaW5nVGFnYCBvZiB0aGUgb2JqZWN0cyB0byBjb21wYXJlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZXF1YWxGdW5jIFRoZSBmdW5jdGlvbiB0byBkZXRlcm1pbmUgZXF1aXZhbGVudHMgb2YgdmFsdWVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gY3VzdG9taXplciBUaGUgZnVuY3Rpb24gdG8gY3VzdG9taXplIGNvbXBhcmlzb25zLlxuICogQHBhcmFtIHtudW1iZXJ9IGJpdG1hc2sgVGhlIGJpdG1hc2sgb2YgY29tcGFyaXNvbiBmbGFncy4gU2VlIGBiYXNlSXNFcXVhbGAgZm9yIG1vcmUgZGV0YWlscy5cbiAqIEBwYXJhbSB7T2JqZWN0fSBzdGFjayBUcmFja3MgdHJhdmVyc2VkIGBvYmplY3RgIGFuZCBgb3RoZXJgIG9iamVjdHMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIG9iamVjdHMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gZXF1YWxCeVRhZyhvYmplY3QsIG90aGVyLCB0YWcsIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzaywgc3RhY2spIHtcbiAgc3dpdGNoICh0YWcpIHtcbiAgICBjYXNlIGFycmF5QnVmZmVyVGFnOlxuICAgICAgaWYgKChvYmplY3QuYnl0ZUxlbmd0aCAhPSBvdGhlci5ieXRlTGVuZ3RoKSB8fFxuICAgICAgICAgICFlcXVhbEZ1bmMobmV3IFVpbnQ4QXJyYXkob2JqZWN0KSwgbmV3IFVpbnQ4QXJyYXkob3RoZXIpKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcblxuICAgIGNhc2UgYm9vbFRhZzpcbiAgICBjYXNlIGRhdGVUYWc6XG4gICAgICAvLyBDb2VyY2UgZGF0ZXMgYW5kIGJvb2xlYW5zIHRvIG51bWJlcnMsIGRhdGVzIHRvIG1pbGxpc2Vjb25kcyBhbmQgYm9vbGVhbnNcbiAgICAgIC8vIHRvIGAxYCBvciBgMGAgdHJlYXRpbmcgaW52YWxpZCBkYXRlcyBjb2VyY2VkIHRvIGBOYU5gIGFzIG5vdCBlcXVhbC5cbiAgICAgIHJldHVybiArb2JqZWN0ID09ICtvdGhlcjtcblxuICAgIGNhc2UgZXJyb3JUYWc6XG4gICAgICByZXR1cm4gb2JqZWN0Lm5hbWUgPT0gb3RoZXIubmFtZSAmJiBvYmplY3QubWVzc2FnZSA9PSBvdGhlci5tZXNzYWdlO1xuXG4gICAgY2FzZSBudW1iZXJUYWc6XG4gICAgICAvLyBUcmVhdCBgTmFOYCB2cy4gYE5hTmAgYXMgZXF1YWwuXG4gICAgICByZXR1cm4gKG9iamVjdCAhPSArb2JqZWN0KSA/IG90aGVyICE9ICtvdGhlciA6IG9iamVjdCA9PSArb3RoZXI7XG5cbiAgICBjYXNlIHJlZ2V4cFRhZzpcbiAgICBjYXNlIHN0cmluZ1RhZzpcbiAgICAgIC8vIENvZXJjZSByZWdleGVzIHRvIHN0cmluZ3MgYW5kIHRyZWF0IHN0cmluZ3MgcHJpbWl0aXZlcyBhbmQgc3RyaW5nXG4gICAgICAvLyBvYmplY3RzIGFzIGVxdWFsLiBTZWUgaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4MTUuMTAuNi40IGZvciBtb3JlIGRldGFpbHMuXG4gICAgICByZXR1cm4gb2JqZWN0ID09IChvdGhlciArICcnKTtcblxuICAgIGNhc2UgbWFwVGFnOlxuICAgICAgdmFyIGNvbnZlcnQgPSBtYXBUb0FycmF5O1xuXG4gICAgY2FzZSBzZXRUYWc6XG4gICAgICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHO1xuICAgICAgY29udmVydCB8fCAoY29udmVydCA9IHNldFRvQXJyYXkpO1xuXG4gICAgICBpZiAob2JqZWN0LnNpemUgIT0gb3RoZXIuc2l6ZSAmJiAhaXNQYXJ0aWFsKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEFzc3VtZSBjeWNsaWMgdmFsdWVzIGFyZSBlcXVhbC5cbiAgICAgIHZhciBzdGFja2VkID0gc3RhY2suZ2V0KG9iamVjdCk7XG4gICAgICBpZiAoc3RhY2tlZCkge1xuICAgICAgICByZXR1cm4gc3RhY2tlZCA9PSBvdGhlcjtcbiAgICAgIH1cbiAgICAgIC8vIFJlY3Vyc2l2ZWx5IGNvbXBhcmUgb2JqZWN0cyAoc3VzY2VwdGlibGUgdG8gY2FsbCBzdGFjayBsaW1pdHMpLlxuICAgICAgcmV0dXJuIGVxdWFsQXJyYXlzKGNvbnZlcnQob2JqZWN0KSwgY29udmVydChvdGhlciksIGVxdWFsRnVuYywgY3VzdG9taXplciwgYml0bWFzayB8IFVOT1JERVJFRF9DT01QQVJFX0ZMQUcsIHN0YWNrLnNldChvYmplY3QsIG90aGVyKSk7XG5cbiAgICBjYXNlIHN5bWJvbFRhZzpcbiAgICAgIGlmIChzeW1ib2xWYWx1ZU9mKSB7XG4gICAgICAgIHJldHVybiBzeW1ib2xWYWx1ZU9mLmNhbGwob2JqZWN0KSA9PSBzeW1ib2xWYWx1ZU9mLmNhbGwob3RoZXIpO1xuICAgICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYGJhc2VJc0VxdWFsRGVlcGAgZm9yIG9iamVjdHMgd2l0aCBzdXBwb3J0IGZvclxuICogcGFydGlhbCBkZWVwIGNvbXBhcmlzb25zLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBvdGhlciBUaGUgb3RoZXIgb2JqZWN0IHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBlcXVhbEZ1bmMgVGhlIGZ1bmN0aW9uIHRvIGRldGVybWluZSBlcXVpdmFsZW50cyBvZiB2YWx1ZXMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBjdXN0b21pemVyIFRoZSBmdW5jdGlvbiB0byBjdXN0b21pemUgY29tcGFyaXNvbnMuXG4gKiBAcGFyYW0ge251bWJlcn0gYml0bWFzayBUaGUgYml0bWFzayBvZiBjb21wYXJpc29uIGZsYWdzLiBTZWUgYGJhc2VJc0VxdWFsYCBmb3IgbW9yZSBkZXRhaWxzLlxuICogQHBhcmFtIHtPYmplY3R9IHN0YWNrIFRyYWNrcyB0cmF2ZXJzZWQgYG9iamVjdGAgYW5kIGBvdGhlcmAgb2JqZWN0cy5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgb2JqZWN0cyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBlcXVhbE9iamVjdHMob2JqZWN0LCBvdGhlciwgZXF1YWxGdW5jLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykge1xuICB2YXIgaXNQYXJ0aWFsID0gYml0bWFzayAmIFBBUlRJQUxfQ09NUEFSRV9GTEFHLFxuICAgICAgb2JqUHJvcHMgPSBrZXlzKG9iamVjdCksXG4gICAgICBvYmpMZW5ndGggPSBvYmpQcm9wcy5sZW5ndGgsXG4gICAgICBvdGhQcm9wcyA9IGtleXMob3RoZXIpLFxuICAgICAgb3RoTGVuZ3RoID0gb3RoUHJvcHMubGVuZ3RoO1xuXG4gIGlmIChvYmpMZW5ndGggIT0gb3RoTGVuZ3RoICYmICFpc1BhcnRpYWwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIGluZGV4ID0gb2JqTGVuZ3RoO1xuICB3aGlsZSAoaW5kZXgtLSkge1xuICAgIHZhciBrZXkgPSBvYmpQcm9wc1tpbmRleF07XG4gICAgaWYgKCEoaXNQYXJ0aWFsID8ga2V5IGluIG90aGVyIDogYmFzZUhhcyhvdGhlciwga2V5KSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgLy8gQXNzdW1lIGN5Y2xpYyB2YWx1ZXMgYXJlIGVxdWFsLlxuICB2YXIgc3RhY2tlZCA9IHN0YWNrLmdldChvYmplY3QpO1xuICBpZiAoc3RhY2tlZCkge1xuICAgIHJldHVybiBzdGFja2VkID09IG90aGVyO1xuICB9XG4gIHZhciByZXN1bHQgPSB0cnVlO1xuICBzdGFjay5zZXQob2JqZWN0LCBvdGhlcik7XG5cbiAgdmFyIHNraXBDdG9yID0gaXNQYXJ0aWFsO1xuICB3aGlsZSAoKytpbmRleCA8IG9iakxlbmd0aCkge1xuICAgIGtleSA9IG9ialByb3BzW2luZGV4XTtcbiAgICB2YXIgb2JqVmFsdWUgPSBvYmplY3Rba2V5XSxcbiAgICAgICAgb3RoVmFsdWUgPSBvdGhlcltrZXldO1xuXG4gICAgaWYgKGN1c3RvbWl6ZXIpIHtcbiAgICAgIHZhciBjb21wYXJlZCA9IGlzUGFydGlhbFxuICAgICAgICA/IGN1c3RvbWl6ZXIob3RoVmFsdWUsIG9ialZhbHVlLCBrZXksIG90aGVyLCBvYmplY3QsIHN0YWNrKVxuICAgICAgICA6IGN1c3RvbWl6ZXIob2JqVmFsdWUsIG90aFZhbHVlLCBrZXksIG9iamVjdCwgb3RoZXIsIHN0YWNrKTtcbiAgICB9XG4gICAgLy8gUmVjdXJzaXZlbHkgY29tcGFyZSBvYmplY3RzIChzdXNjZXB0aWJsZSB0byBjYWxsIHN0YWNrIGxpbWl0cykuXG4gICAgaWYgKCEoY29tcGFyZWQgPT09IHVuZGVmaW5lZFxuICAgICAgICAgID8gKG9ialZhbHVlID09PSBvdGhWYWx1ZSB8fCBlcXVhbEZ1bmMob2JqVmFsdWUsIG90aFZhbHVlLCBjdXN0b21pemVyLCBiaXRtYXNrLCBzdGFjaykpXG4gICAgICAgICAgOiBjb21wYXJlZFxuICAgICAgICApKSB7XG4gICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBza2lwQ3RvciB8fCAoc2tpcEN0b3IgPSBrZXkgPT0gJ2NvbnN0cnVjdG9yJyk7XG4gIH1cbiAgaWYgKHJlc3VsdCAmJiAhc2tpcEN0b3IpIHtcbiAgICB2YXIgb2JqQ3RvciA9IG9iamVjdC5jb25zdHJ1Y3RvcixcbiAgICAgICAgb3RoQ3RvciA9IG90aGVyLmNvbnN0cnVjdG9yO1xuXG4gICAgLy8gTm9uIGBPYmplY3RgIG9iamVjdCBpbnN0YW5jZXMgd2l0aCBkaWZmZXJlbnQgY29uc3RydWN0b3JzIGFyZSBub3QgZXF1YWwuXG4gICAgaWYgKG9iakN0b3IgIT0gb3RoQ3RvciAmJlxuICAgICAgICAoJ2NvbnN0cnVjdG9yJyBpbiBvYmplY3QgJiYgJ2NvbnN0cnVjdG9yJyBpbiBvdGhlcikgJiZcbiAgICAgICAgISh0eXBlb2Ygb2JqQ3RvciA9PSAnZnVuY3Rpb24nICYmIG9iakN0b3IgaW5zdGFuY2VvZiBvYmpDdG9yICYmXG4gICAgICAgICAgdHlwZW9mIG90aEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBvdGhDdG9yIGluc3RhbmNlb2Ygb3RoQ3RvcikpIHtcbiAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICBzdGFja1snZGVsZXRlJ10ob2JqZWN0KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBcImxlbmd0aFwiIHByb3BlcnR5IHZhbHVlIG9mIGBvYmplY3RgLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIGZ1bmN0aW9uIGlzIHVzZWQgdG8gYXZvaWQgYSBbSklUIGJ1Z10oaHR0cHM6Ly9idWdzLndlYmtpdC5vcmcvc2hvd19idWcuY2dpP2lkPTE0Mjc5MilcbiAqIHRoYXQgYWZmZWN0cyBTYWZhcmkgb24gYXQgbGVhc3QgaU9TIDguMS04LjMgQVJNNjQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIHRoZSBcImxlbmd0aFwiIHZhbHVlLlxuICovXG52YXIgZ2V0TGVuZ3RoID0gYmFzZVByb3BlcnR5KCdsZW5ndGgnKTtcblxuLyoqXG4gKiBHZXRzIHRoZSBwcm9wZXJ0eSBuYW1lcywgdmFsdWVzLCBhbmQgY29tcGFyZSBmbGFncyBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBtYXRjaCBkYXRhIG9mIGBvYmplY3RgLlxuICovXG5mdW5jdGlvbiBnZXRNYXRjaERhdGEob2JqZWN0KSB7XG4gIHZhciByZXN1bHQgPSB0b1BhaXJzKG9iamVjdCksXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIHdoaWxlIChsZW5ndGgtLSkge1xuICAgIHJlc3VsdFtsZW5ndGhdWzJdID0gaXNTdHJpY3RDb21wYXJhYmxlKHJlc3VsdFtsZW5ndGhdWzFdKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIG5hdGl2ZSBmdW5jdGlvbiBhdCBga2V5YCBvZiBgb2JqZWN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHBhcmFtIHtzdHJpbmd9IGtleSBUaGUga2V5IG9mIHRoZSBtZXRob2QgdG8gZ2V0LlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGZ1bmN0aW9uIGlmIGl0J3MgbmF0aXZlLCBlbHNlIGB1bmRlZmluZWRgLlxuICovXG5mdW5jdGlvbiBnZXROYXRpdmUob2JqZWN0LCBrZXkpIHtcbiAgdmFyIHZhbHVlID0gb2JqZWN0W2tleV07XG4gIHJldHVybiBpc05hdGl2ZSh2YWx1ZSkgPyB2YWx1ZSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBgdG9TdHJpbmdUYWdgIG9mIGB2YWx1ZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHF1ZXJ5LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgYHRvU3RyaW5nVGFnYC5cbiAqL1xuZnVuY3Rpb24gZ2V0VGFnKHZhbHVlKSB7XG4gIHJldHVybiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKTtcbn1cblxuLy8gRmFsbGJhY2sgZm9yIElFIDExIHByb3ZpZGluZyBgdG9TdHJpbmdUYWdgIHZhbHVlcyBmb3IgbWFwcywgc2V0cywgYW5kIHdlYWttYXBzLlxuaWYgKChNYXAgJiYgZ2V0VGFnKG5ldyBNYXApICE9IG1hcFRhZykgfHxcbiAgICAoU2V0ICYmIGdldFRhZyhuZXcgU2V0KSAhPSBzZXRUYWcpIHx8XG4gICAgKFdlYWtNYXAgJiYgZ2V0VGFnKG5ldyBXZWFrTWFwKSAhPSB3ZWFrTWFwVGFnKSkge1xuICBnZXRUYWcgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHZhciByZXN1bHQgPSBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSxcbiAgICAgICAgQ3RvciA9IHJlc3VsdCA9PSBvYmplY3RUYWcgPyB2YWx1ZS5jb25zdHJ1Y3RvciA6IG51bGwsXG4gICAgICAgIGN0b3JTdHJpbmcgPSB0eXBlb2YgQ3RvciA9PSAnZnVuY3Rpb24nID8gZnVuY1RvU3RyaW5nLmNhbGwoQ3RvcikgOiAnJztcblxuICAgIGlmIChjdG9yU3RyaW5nKSB7XG4gICAgICBzd2l0Y2ggKGN0b3JTdHJpbmcpIHtcbiAgICAgICAgY2FzZSBtYXBDdG9yU3RyaW5nOiByZXR1cm4gbWFwVGFnO1xuICAgICAgICBjYXNlIHNldEN0b3JTdHJpbmc6IHJldHVybiBzZXRUYWc7XG4gICAgICAgIGNhc2Ugd2Vha01hcEN0b3JTdHJpbmc6IHJldHVybiB3ZWFrTWFwVGFnO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgZXhpc3RzIG9uIGBvYmplY3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGhhc0Z1bmMgVGhlIGZ1bmN0aW9uIHRvIGNoZWNrIHByb3BlcnRpZXMuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHBhdGhgIGV4aXN0cywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNQYXRoKG9iamVjdCwgcGF0aCwgaGFzRnVuYykge1xuICBpZiAob2JqZWN0ID09IG51bGwpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHJlc3VsdCA9IGhhc0Z1bmMob2JqZWN0LCBwYXRoKTtcbiAgaWYgKCFyZXN1bHQgJiYgIWlzS2V5KHBhdGgpKSB7XG4gICAgcGF0aCA9IGJhc2VDYXN0UGF0aChwYXRoKTtcbiAgICBvYmplY3QgPSBwYXJlbnQob2JqZWN0LCBwYXRoKTtcbiAgICBpZiAob2JqZWN0ICE9IG51bGwpIHtcbiAgICAgIHBhdGggPSBsYXN0KHBhdGgpO1xuICAgICAgcmVzdWx0ID0gaGFzRnVuYyhvYmplY3QsIHBhdGgpO1xuICAgIH1cbiAgfVxuICB2YXIgbGVuZ3RoID0gb2JqZWN0ID8gb2JqZWN0Lmxlbmd0aCA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuIHJlc3VsdCB8fCAoXG4gICAgISFsZW5ndGggJiYgaXNMZW5ndGgobGVuZ3RoKSAmJiBpc0luZGV4KHBhdGgsIGxlbmd0aCkgJiZcbiAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzU3RyaW5nKG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSlcbiAgKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIGluZGV4IGtleXMgZm9yIGBvYmplY3RgIHZhbHVlcyBvZiBhcnJheXMsXG4gKiBgYXJndW1lbnRzYCBvYmplY3RzLCBhbmQgc3RyaW5ncywgb3RoZXJ3aXNlIGBudWxsYCBpcyByZXR1cm5lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0FycmF5fG51bGx9IFJldHVybnMgaW5kZXgga2V5cywgZWxzZSBgbnVsbGAuXG4gKi9cbmZ1bmN0aW9uIGluZGV4S2V5cyhvYmplY3QpIHtcbiAgdmFyIGxlbmd0aCA9IG9iamVjdCA/IG9iamVjdC5sZW5ndGggOiB1bmRlZmluZWQ7XG4gIGlmIChpc0xlbmd0aChsZW5ndGgpICYmXG4gICAgICAoaXNBcnJheShvYmplY3QpIHx8IGlzU3RyaW5nKG9iamVjdCkgfHwgaXNBcmd1bWVudHMob2JqZWN0KSkpIHtcbiAgICByZXR1cm4gYmFzZVRpbWVzKGxlbmd0aCwgU3RyaW5nKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHByb3BlcnR5IG5hbWUgYW5kIG5vdCBhIHByb3BlcnR5IHBhdGguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtPYmplY3R9IFtvYmplY3RdIFRoZSBvYmplY3QgdG8gcXVlcnkga2V5cyBvbi5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcHJvcGVydHkgbmFtZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleSh2YWx1ZSwgb2JqZWN0KSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICByZXR1cm4gIWlzQXJyYXkodmFsdWUpICYmXG4gICAgKHJlSXNQbGFpblByb3AudGVzdCh2YWx1ZSkgfHwgIXJlSXNEZWVwUHJvcC50ZXN0KHZhbHVlKSB8fFxuICAgICAgKG9iamVjdCAhPSBudWxsICYmIHZhbHVlIGluIE9iamVjdChvYmplY3QpKSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgc3VpdGFibGUgZm9yIHVzZSBhcyB1bmlxdWUgb2JqZWN0IGtleS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0tleWFibGUodmFsdWUpIHtcbiAgdmFyIHR5cGUgPSB0eXBlb2YgdmFsdWU7XG4gIHJldHVybiB0eXBlID09ICdudW1iZXInIHx8IHR5cGUgPT0gJ2Jvb2xlYW4nIHx8XG4gICAgKHR5cGUgPT0gJ3N0cmluZycgJiYgdmFsdWUgIT0gJ19fcHJvdG9fXycpIHx8IHZhbHVlID09IG51bGw7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgbGlrZWx5IGEgcHJvdG90eXBlIG9iamVjdC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHByb3RvdHlwZSwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1Byb3RvdHlwZSh2YWx1ZSkge1xuICB2YXIgQ3RvciA9IHZhbHVlICYmIHZhbHVlLmNvbnN0cnVjdG9yLFxuICAgICAgcHJvdG8gPSAodHlwZW9mIEN0b3IgPT0gJ2Z1bmN0aW9uJyAmJiBDdG9yLnByb3RvdHlwZSkgfHwgb2JqZWN0UHJvdG87XG5cbiAgcmV0dXJuIHZhbHVlID09PSBwcm90bztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBzdWl0YWJsZSBmb3Igc3RyaWN0IGVxdWFsaXR5IGNvbXBhcmlzb25zLCBpLmUuIGA9PT1gLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlmIHN1aXRhYmxlIGZvciBzdHJpY3RcbiAqICBlcXVhbGl0eSBjb21wYXJpc29ucywgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc1N0cmljdENvbXBhcmFibGUodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSAmJiAhaXNPYmplY3QodmFsdWUpO1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHBhcmVudCB2YWx1ZSBhdCBgcGF0aGAgb2YgYG9iamVjdGAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggdG8gZ2V0IHRoZSBwYXJlbnQgdmFsdWUgb2YuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcGFyZW50IHZhbHVlLlxuICovXG5mdW5jdGlvbiBwYXJlbnQob2JqZWN0LCBwYXRoKSB7XG4gIHJldHVybiBwYXRoLmxlbmd0aCA9PSAxID8gb2JqZWN0IDogZ2V0KG9iamVjdCwgYmFzZVNsaWNlKHBhdGgsIDAsIC0xKSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gYSBwcm9wZXJ0eSBwYXRoIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcHJvcGVydHkgcGF0aCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5nVG9QYXRoKHN0cmluZykge1xuICB2YXIgcmVzdWx0ID0gW107XG4gIHRvU3RyaW5nKHN0cmluZykucmVwbGFjZShyZVByb3BOYW1lLCBmdW5jdGlvbihtYXRjaCwgbnVtYmVyLCBxdW90ZSwgc3RyaW5nKSB7XG4gICAgcmVzdWx0LnB1c2gocXVvdGUgPyBzdHJpbmcucmVwbGFjZShyZUVzY2FwZUNoYXIsICckMScpIDogKG51bWJlciB8fCBtYXRjaCkpO1xuICB9KTtcbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBHZXRzIHRoZSBsYXN0IGVsZW1lbnQgb2YgYGFycmF5YC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IEFycmF5XG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IG9mIGBhcnJheWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ubGFzdChbMSwgMiwgM10pO1xuICogLy8gPT4gM1xuICovXG5mdW5jdGlvbiBsYXN0KGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG4gIHJldHVybiBsZW5ndGggPyBhcnJheVtsZW5ndGggLSAxXSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzYuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqIHZhciBvdGhlciA9IHsgJ3VzZXInOiAnZnJlZCcgfTtcbiAqXG4gKiBfLmVxKG9iamVjdCwgb2JqZWN0KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKG9iamVjdCwgb3RoZXIpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKCdhJywgJ2EnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmVxKCdhJywgT2JqZWN0KCdhJykpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmVxKE5hTiwgTmFOKTtcbiAqIC8vID0+IHRydWVcbiAqL1xuZnVuY3Rpb24gZXEodmFsdWUsIG90aGVyKSB7XG4gIHJldHVybiB2YWx1ZSA9PT0gb3RoZXIgfHwgKHZhbHVlICE9PSB2YWx1ZSAmJiBvdGhlciAhPT0gb3RoZXIpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGxpa2VseSBhbiBgYXJndW1lbnRzYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcmd1bWVudHMoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oKSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FyZ3VtZW50cyhbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcmd1bWVudHModmFsdWUpIHtcbiAgLy8gU2FmYXJpIDguMSBpbmNvcnJlY3RseSBtYWtlcyBgYXJndW1lbnRzLmNhbGxlZWAgZW51bWVyYWJsZSBpbiBzdHJpY3QgbW9kZS5cbiAgcmV0dXJuIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSAmJiBoYXNPd25Qcm9wZXJ0eS5jYWxsKHZhbHVlLCAnY2FsbGVlJykgJiZcbiAgICAoIXByb3BlcnR5SXNFbnVtZXJhYmxlLmNhbGwodmFsdWUsICdjYWxsZWUnKSB8fCBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBhcmdzVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGFuIGBBcnJheWAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAdHlwZSB7RnVuY3Rpb259XG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzQXJyYXkoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXkoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheSgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xudmFyIGlzQXJyYXkgPSBBcnJheS5pc0FycmF5O1xuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UuIEEgdmFsdWUgaXMgY29uc2lkZXJlZCBhcnJheS1saWtlIGlmIGl0J3NcbiAqIG5vdCBhIGZ1bmN0aW9uIGFuZCBoYXMgYSBgdmFsdWUubGVuZ3RoYCB0aGF0J3MgYW4gaW50ZWdlciBncmVhdGVyIHRoYW4gb3JcbiAqIGVxdWFsIHRvIGAwYCBhbmQgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUmAuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgoZ2V0TGVuZ3RoKHZhbHVlKSkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIFRoaXMgbWV0aG9kIGlzIGxpa2UgYF8uaXNBcnJheUxpa2VgIGV4Y2VwdCB0aGF0IGl0IGFsc28gY2hlY2tzIGlmIGB2YWx1ZWBcbiAqIGlzIGFuIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gYXJyYXktbGlrZSBvYmplY3QsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZU9iamVjdCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNBcnJheUxpa2VPYmplY3QoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlT2JqZWN0KHZhbHVlKSB7XG4gIHJldHVybiBpc09iamVjdExpa2UodmFsdWUpICYmIGlzQXJyYXlMaWtlKHZhbHVlKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYEZ1bmN0aW9uYCBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDggd2hpY2ggcmV0dXJucyAnb2JqZWN0JyBmb3IgdHlwZWQgYXJyYXkgYW5kIHdlYWsgbWFwIGNvbnN0cnVjdG9ycyxcbiAgLy8gYW5kIFBoYW50b21KUyAxLjkgd2hpY2ggcmV0dXJucyAnZnVuY3Rpb24nIGZvciBgTm9kZUxpc3RgIGluc3RhbmNlcy5cbiAgdmFyIHRhZyA9IGlzT2JqZWN0KHZhbHVlKSA/IG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIHJldHVybiB0YWcgPT0gZnVuY1RhZyB8fCB0YWcgPT0gZ2VuVGFnO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgYXJyYXktbGlrZSBsZW5ndGguXG4gKlxuICogKipOb3RlOioqIFRoaXMgZnVuY3Rpb24gaXMgbG9vc2VseSBiYXNlZCBvbiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNi4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZSBbbGFuZ3VhZ2UgdHlwZV0oaHR0cHM6Ly9lczUuZ2l0aHViLmlvLyN4OCkgb2YgYE9iamVjdGAuXG4gKiAoZS5nLiBhcnJheXMsIGZ1bmN0aW9ucywgb2JqZWN0cywgcmVnZXhlcywgYG5ldyBOdW1iZXIoMClgLCBhbmQgYG5ldyBTdHJpbmcoJycpYClcbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBuYXRpdmUgZnVuY3Rpb24uXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgbmF0aXZlIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNOYXRpdmUoQXJyYXkucHJvdG90eXBlLnB1c2gpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNOYXRpdmUoXyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc05hdGl2ZSh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBpZiAoaXNGdW5jdGlvbih2YWx1ZSkpIHtcbiAgICByZXR1cm4gcmVJc05hdGl2ZS50ZXN0KGZ1bmNUb1N0cmluZy5jYWxsKHZhbHVlKSk7XG4gIH1cbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICAoaXNIb3N0T2JqZWN0KHZhbHVlKSA/IHJlSXNOYXRpdmUgOiByZUlzSG9zdEN0b3IpLnRlc3QodmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3RyaW5nYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3RyaW5nKCdhYmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzU3RyaW5nKDEpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3RyaW5nJyB8fFxuICAgICghaXNBcnJheSh2YWx1ZSkgJiYgaXNPYmplY3RMaWtlKHZhbHVlKSAmJiBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA9PSBzdHJpbmdUYWcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgU3ltYm9sYCBwcmltaXRpdmUgb3Igb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBjb3JyZWN0bHkgY2xhc3NpZmllZCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgdHlwZWQgYXJyYXkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGNvcnJlY3RseSBjbGFzc2lmaWVkLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNUeXBlZEFycmF5KG5ldyBVaW50OEFycmF5KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzVHlwZWRBcnJheShbXSk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1R5cGVkQXJyYXkodmFsdWUpIHtcbiAgcmV0dXJuIGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiZcbiAgICBpc0xlbmd0aCh2YWx1ZS5sZW5ndGgpICYmICEhdHlwZWRBcnJheVRhZ3Nbb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSldO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBzdHJpbmcgaWYgaXQncyBub3Qgb25lLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWRcbiAqIGZvciBgbnVsbGAgYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIEdldHMgdGhlIHZhbHVlIGF0IGBwYXRoYCBvZiBgb2JqZWN0YC4gSWYgdGhlIHJlc29sdmVkIHZhbHVlIGlzXG4gKiBgdW5kZWZpbmVkYCB0aGUgYGRlZmF1bHRWYWx1ZWAgaXMgdXNlZCBpbiBpdHMgcGxhY2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEBwYXJhbSB7QXJyYXl8c3RyaW5nfSBwYXRoIFRoZSBwYXRoIG9mIHRoZSBwcm9wZXJ0eSB0byBnZXQuXG4gKiBAcGFyYW0geyp9IFtkZWZhdWx0VmFsdWVdIFRoZSB2YWx1ZSByZXR1cm5lZCBpZiB0aGUgcmVzb2x2ZWQgdmFsdWUgaXMgYHVuZGVmaW5lZGAuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgcmVzb2x2ZWQgdmFsdWUuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICdhJzogW3sgJ2InOiB7ICdjJzogMyB9IH1dIH07XG4gKlxuICogXy5nZXQob2JqZWN0LCAnYVswXS5iLmMnKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsIFsnYScsICcwJywgJ2InLCAnYyddKTtcbiAqIC8vID0+IDNcbiAqXG4gKiBfLmdldChvYmplY3QsICdhLmIuYycsICdkZWZhdWx0Jyk7XG4gKiAvLyA9PiAnZGVmYXVsdCdcbiAqL1xuZnVuY3Rpb24gZ2V0KG9iamVjdCwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHZhciByZXN1bHQgPSBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IGJhc2VHZXQob2JqZWN0LCBwYXRoKTtcbiAgcmV0dXJuIHJlc3VsdCA9PT0gdW5kZWZpbmVkID8gZGVmYXVsdFZhbHVlIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgcGF0aGAgaXMgYSBkaXJlY3Qgb3IgaW5oZXJpdGVkIHByb3BlcnR5IG9mIGBvYmplY3RgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgcGF0aGAgZXhpc3RzLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSBfLmNyZWF0ZSh7ICdhJzogXy5jcmVhdGUoeyAnYic6IF8uY3JlYXRlKHsgJ2MnOiAzIH0pIH0pIH0pO1xuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaGFzSW4ob2JqZWN0LCAnYS5iLmMnKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgWydhJywgJ2InLCAnYyddKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmhhc0luKG9iamVjdCwgJ2InKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGhhc0luKG9iamVjdCwgcGF0aCkge1xuICByZXR1cm4gaGFzUGF0aChvYmplY3QsIHBhdGgsIGJhc2VIYXNJbik7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiB0aGUgb3duIGVudW1lcmFibGUgcHJvcGVydHkgbmFtZXMgb2YgYG9iamVjdGAuXG4gKlxuICogKipOb3RlOioqIE5vbi1vYmplY3QgdmFsdWVzIGFyZSBjb2VyY2VkIHRvIG9iamVjdHMuIFNlZSB0aGVcbiAqIFtFUyBzcGVjXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi82LjAvI3NlYy1vYmplY3Qua2V5cylcbiAqIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBPYmplY3RcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgYXJyYXkgb2YgcHJvcGVydHkgbmFtZXMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8ua2V5cyhuZXcgRm9vKTtcbiAqIC8vID0+IFsnYScsICdiJ10gKGl0ZXJhdGlvbiBvcmRlciBpcyBub3QgZ3VhcmFudGVlZClcbiAqXG4gKiBfLmtleXMoJ2hpJyk7XG4gKiAvLyA9PiBbJzAnLCAnMSddXG4gKi9cbmZ1bmN0aW9uIGtleXMob2JqZWN0KSB7XG4gIHZhciBpc1Byb3RvID0gaXNQcm90b3R5cGUob2JqZWN0KTtcbiAgaWYgKCEoaXNQcm90byB8fCBpc0FycmF5TGlrZShvYmplY3QpKSkge1xuICAgIHJldHVybiBiYXNlS2V5cyhvYmplY3QpO1xuICB9XG4gIHZhciBpbmRleGVzID0gaW5kZXhLZXlzKG9iamVjdCksXG4gICAgICBza2lwSW5kZXhlcyA9ICEhaW5kZXhlcyxcbiAgICAgIHJlc3VsdCA9IGluZGV4ZXMgfHwgW10sXG4gICAgICBsZW5ndGggPSByZXN1bHQubGVuZ3RoO1xuXG4gIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICBpZiAoYmFzZUhhcyhvYmplY3QsIGtleSkgJiZcbiAgICAgICAgIShza2lwSW5kZXhlcyAmJiAoa2V5ID09ICdsZW5ndGgnIHx8IGlzSW5kZXgoa2V5LCBsZW5ndGgpKSkgJiZcbiAgICAgICAgIShpc1Byb3RvICYmIGtleSA9PSAnY29uc3RydWN0b3InKSkge1xuICAgICAgcmVzdWx0LnB1c2goa2V5KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFycmF5IG9mIG93biBlbnVtZXJhYmxlIGtleS12YWx1ZSBwYWlycyBmb3IgYG9iamVjdGAgd2hpY2hcbiAqIGNhbiBiZSBjb25zdW1lZCBieSBgXy5mcm9tUGFpcnNgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgT2JqZWN0XG4gKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIG5ldyBhcnJheSBvZiBrZXktdmFsdWUgcGFpcnMuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqICAgdGhpcy5iID0gMjtcbiAqIH1cbiAqXG4gKiBGb28ucHJvdG90eXBlLmMgPSAzO1xuICpcbiAqIF8udG9QYWlycyhuZXcgRm9vKTtcbiAqIC8vID0+IFtbJ2EnLCAxXSwgWydiJywgMl1dIChpdGVyYXRpb24gb3JkZXIgaXMgbm90IGd1YXJhbnRlZWQpXG4gKi9cbmZ1bmN0aW9uIHRvUGFpcnMob2JqZWN0KSB7XG4gIHJldHVybiBiYXNlVG9QYWlycyhvYmplY3QsIGtleXMob2JqZWN0KSk7XG59XG5cbi8qKlxuICogVGhpcyBtZXRob2QgcmV0dXJucyB0aGUgZmlyc3QgYXJndW1lbnQgZ2l2ZW4gdG8gaXQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0geyp9IHZhbHVlIEFueSB2YWx1ZS5cbiAqIEByZXR1cm5zIHsqfSBSZXR1cm5zIGB2YWx1ZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3QgPSB7ICd1c2VyJzogJ2ZyZWQnIH07XG4gKlxuICogXy5pZGVudGl0eShvYmplY3QpID09PSBvYmplY3Q7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlkZW50aXR5KHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSB2YWx1ZSBhdCBgcGF0aGAgb2YgYSBnaXZlbiBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge0FycmF5fHN0cmluZ30gcGF0aCBUaGUgcGF0aCBvZiB0aGUgcHJvcGVydHkgdG8gZ2V0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKiBAZXhhbXBsZVxuICpcbiAqIHZhciBvYmplY3RzID0gW1xuICogICB7ICdhJzogeyAnYic6IHsgJ2MnOiAyIH0gfSB9LFxuICogICB7ICdhJzogeyAnYic6IHsgJ2MnOiAxIH0gfSB9XG4gKiBdO1xuICpcbiAqIF8ubWFwKG9iamVjdHMsIF8ucHJvcGVydHkoJ2EuYi5jJykpO1xuICogLy8gPT4gWzIsIDFdXG4gKlxuICogXy5tYXAoXy5zb3J0Qnkob2JqZWN0cywgXy5wcm9wZXJ0eShbJ2EnLCAnYicsICdjJ10pKSwgJ2EuYi5jJyk7XG4gKiAvLyA9PiBbMSwgMl1cbiAqL1xuZnVuY3Rpb24gcHJvcGVydHkocGF0aCkge1xuICByZXR1cm4gaXNLZXkocGF0aCkgPyBiYXNlUHJvcGVydHkocGF0aCkgOiBiYXNlUHJvcGVydHlEZWVwKHBhdGgpO1xufVxuXG4vLyBBdm9pZCBpbmhlcml0aW5nIGZyb20gYE9iamVjdC5wcm90b3R5cGVgIHdoZW4gcG9zc2libGUuXG5IYXNoLnByb3RvdHlwZSA9IG5hdGl2ZUNyZWF0ZSA/IG5hdGl2ZUNyZWF0ZShudWxsKSA6IG9iamVjdFByb3RvO1xuXG4vLyBBZGQgZnVuY3Rpb25zIHRvIHRoZSBgTWFwQ2FjaGVgLlxuTWFwQ2FjaGUucHJvdG90eXBlLmNsZWFyID0gbWFwQ2xlYXI7XG5NYXBDYWNoZS5wcm90b3R5cGVbJ2RlbGV0ZSddID0gbWFwRGVsZXRlO1xuTWFwQ2FjaGUucHJvdG90eXBlLmdldCA9IG1hcEdldDtcbk1hcENhY2hlLnByb3RvdHlwZS5oYXMgPSBtYXBIYXM7XG5NYXBDYWNoZS5wcm90b3R5cGUuc2V0ID0gbWFwU2V0O1xuXG4vLyBBZGQgZnVuY3Rpb25zIHRvIHRoZSBgU3RhY2tgIGNhY2hlLlxuU3RhY2sucHJvdG90eXBlLmNsZWFyID0gc3RhY2tDbGVhcjtcblN0YWNrLnByb3RvdHlwZVsnZGVsZXRlJ10gPSBzdGFja0RlbGV0ZTtcblN0YWNrLnByb3RvdHlwZS5nZXQgPSBzdGFja0dldDtcblN0YWNrLnByb3RvdHlwZS5oYXMgPSBzdGFja0hhcztcblN0YWNrLnByb3RvdHlwZS5zZXQgPSBzdGFja1NldDtcblxubW9kdWxlLmV4cG9ydHMgPSBiYXNlSXRlcmF0ZWU7XG4iLCIvLyBXQVJOSU5HOiBXaGVuIGVkaXRpbmcgdGhpcyBmaWxlLCByZW1lbWJlciB0byB1cGRhdGUgdGhlIEpTRmlkZGxlOlxuLy8gaHR0cHM6Ly9qc2ZpZGRsZS5uZXQva2ltbW9icnVuZmVsZHQvbXhqajZqb20vXG4vLyBNQUtFIFNVUkUgVE8gU0VUIFRIRSBORVcgVkVSU0lPTjogXCJTRVQgQVMgQkFTRVwiXG5cbnZhciBQcm9ncmVzc0JhciA9IHJlcXVpcmUoJ3Byb2dyZXNzYmFyLmpzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZShjb250YWluZXIpIHtcbiAgdmFyIGJhciA9IG5ldyBQcm9ncmVzc0Jhci5DaXJjbGUoY29udGFpbmVyLCB7XG4gICAgc3Ryb2tlV2lkdGg6IDYsXG4gICAgZWFzaW5nOiAnZWFzZUluT3V0JyxcbiAgICBkdXJhdGlvbjogMTQwMCxcbiAgICBjb2xvcjogJyNGRkVBODInLFxuICAgIHRyYWlsQ29sb3I6ICcjZWVlJyxcbiAgICB0cmFpbFdpZHRoOiAxLFxuICAgIHN2Z1N0eWxlOiBudWxsXG4gIH0pO1xuXG4gIHJldHVybiBiYXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlO1xuIiwiLy8gV0FSTklORzogV2hlbiBlZGl0aW5nIHRoaXMgZmlsZSwgcmVtZW1iZXIgdG8gdXBkYXRlIHRoZSBKU0ZpZGRsZTpcbi8vIGh0dHBzOi8vanNmaWRkbGUubmV0L2tpbW1vYnJ1bmZlbGR0LzNweHZrcTJkL1xuLy8gTUFLRSBTVVJFIFRPIFNFVCBUSEUgTkVXIFZFUlNJT046IFwiU0VUIEFTIEJBU0VcIlxuXG52YXIgUHJvZ3Jlc3NCYXIgPSByZXF1aXJlKCdwcm9ncmVzc2Jhci5qcycpO1xuXG5mdW5jdGlvbiBjcmVhdGUoY29udGFpbmVyKSB7XG4gIHZhciBiYXIgPSBuZXcgUHJvZ3Jlc3NCYXIuQ2lyY2xlKGNvbnRhaW5lciwge1xuICAgIGNvbG9yOiAnI0ZGRUE4MicsXG4gICAgdHJhaWxDb2xvcjogJyNlZWUnLFxuICAgIHRyYWlsV2lkdGg6IDEsXG4gICAgZHVyYXRpb246IDE0MDAsXG4gICAgZWFzaW5nOiAnYm91bmNlJyxcbiAgICBzdHJva2VXaWR0aDogNixcbiAgICBmcm9tOiB7Y29sb3I6ICcjRkZFQTgyJywgYTowfSxcbiAgICB0bzoge2NvbG9yOiAnI0VENkE1QScsIGE6MX0sXG4gICAgLy8gU2V0IGRlZmF1bHQgc3RlcCBmdW5jdGlvbiBmb3IgYWxsIGFuaW1hdGUgY2FsbHNcbiAgICBzdGVwOiBmdW5jdGlvbihzdGF0ZSwgY2lyY2xlKSB7XG4gICAgICBjaXJjbGUucGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHN0YXRlLmNvbG9yKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBiYXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlO1xuIiwiLy8gV0FSTklORzogV2hlbiBlZGl0aW5nIHRoaXMgZmlsZSwgcmVtZW1iZXIgdG8gdXBkYXRlIHRoZSBKU0ZpZGRsZTpcbi8vIGh0dHBzOi8vanNmaWRkbGUubmV0L2tpbW1vYnJ1bmZlbGR0LzcydGt5bjQwL1xuLy8gTUFLRSBTVVJFIFRPIFNFVCBUSEUgTkVXIFZFUlNJT046IFwiU0VUIEFTIEJBU0VcIlxuXG52YXIgUHJvZ3Jlc3NCYXIgPSByZXF1aXJlKCdwcm9ncmVzc2Jhci5qcycpO1xuXG5mdW5jdGlvbiBjcmVhdGUoY29udGFpbmVyKSB7XG4gIHZhciBiYXIgPSBuZXcgUHJvZ3Jlc3NCYXIuQ2lyY2xlKGNvbnRhaW5lciwge1xuICAgIGNvbG9yOiAnI2FhYScsXG4gICAgLy8gVGhpcyBoYXMgdG8gYmUgdGhlIHNhbWUgc2l6ZSBhcyB0aGUgbWF4aW11bSB3aWR0aCB0b1xuICAgIC8vIHByZXZlbnQgY2xpcHBpbmdcbiAgICBzdHJva2VXaWR0aDogMTAsXG4gICAgdHJhaWxXaWR0aDogMSxcbiAgICBlYXNpbmc6ICdlYXNlSW5PdXQnLFxuICAgIGR1cmF0aW9uOiAxNDAwLFxuXG4gICAgdGV4dDoge1xuICAgICAgYXV0b1N0eWxlQ29udGFpbmVyOiBmYWxzZVxuICAgIH0sXG4gICAgZnJvbTogeyBjb2xvcjogJyNhYWEnLCB3aWR0aDogMSB9LFxuICAgIHRvOiB7IGNvbG9yOiAnIzMzMycsIHdpZHRoOiAxMCB9LFxuICAgIC8vIFNldCBkZWZhdWx0IHN0ZXAgZnVuY3Rpb24gZm9yIGFsbCBhbmltYXRlIGNhbGxzXG4gICAgc3RlcDogZnVuY3Rpb24oc3RhdGUsIGNpcmNsZSkge1xuICAgICAgY2lyY2xlLnBhdGguc2V0QXR0cmlidXRlKCdzdHJva2UnLCBzdGF0ZS5jb2xvcik7XG4gICAgICBjaXJjbGUucGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZS13aWR0aCcsIHN0YXRlLndpZHRoKTtcbiAgICAgIHZhciB2YWx1ZSA9IE1hdGgucm91bmQoY2lyY2xlLnZhbHVlKCkgKiAxMDApO1xuICAgICAgaWYgKHZhbHVlID09PSAwKSB7XG4gICAgICAgIGNpcmNsZS5zZXRUZXh0KCcnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNpcmNsZS5zZXRUZXh0KHZhbHVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuICBiYXIudGV4dC5zdHlsZS5mb250RmFtaWx5ID0gJ1wiUmFsZXdheVwiLCBIZWx2ZXRpY2EsIHNhbnMtc2VyaWYnO1xuICBiYXIudGV4dC5zdHlsZS5mb250U2l6ZSA9ICcycmVtJztcblxuICByZXR1cm4gYmFyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcbiIsIi8vIFdBUk5JTkc6IFdoZW4gZWRpdGluZyB0aGlzIGZpbGUsIHJlbWVtYmVyIHRvIHVwZGF0ZSB0aGUgSlNGaWRkbGU6XG4vLyBodHRwczovL2pzZmlkZGxlLm5ldC9raW1tb2JydW5mZWxkdC9kbkxMZ201by9cbi8vIE1BS0UgU1VSRSBUTyBTRVQgVEhFIE5FVyBWRVJTSU9OOiBcIlNFVCBBUyBCQVNFXCJcblxudmFyIFByb2dyZXNzQmFyID0gcmVxdWlyZSgncHJvZ3Jlc3NiYXIuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlKHBhdGhJZCkge1xuICB2YXIgYmFyID0gbmV3IFByb2dyZXNzQmFyLlBhdGgocGF0aElkLCB7XG4gICAgZWFzaW5nOiAnZWFzZUluT3V0JyxcbiAgICBkdXJhdGlvbjogMTQwMFxuICB9KTtcblxuICByZXR1cm4gYmFyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcbiIsInZhciBQcm9ncmVzc0JhciA9IHJlcXVpcmUoJ3Byb2dyZXNzYmFyLmpzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZShjb250YWluZXIpIHtcbiAgdmFyIGJhciA9IG5ldyBQcm9ncmVzc0Jhci5DaXJjbGUoY29udGFpbmVyLCB7XG4gICAgc3Ryb2tlV2lkdGg6IDQsXG4gICAgZWFzaW5nOiAnZWFzZUluT3V0JyxcbiAgICBkdXJhdGlvbjogMTQwMCxcbiAgICBjb2xvcjogJyNGRkVBODInLFxuICAgIHRyYWlsQ29sb3I6ICcjZWVlJyxcbiAgICB0cmFpbFdpZHRoOiAxLFxuICAgIHN2Z1N0eWxlOiBudWxsXG4gIH0pO1xuXG4gIHJldHVybiBiYXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlO1xuIiwidmFyIFNxdWFyZSA9IHJlcXVpcmUoJy4uL3NxdWFyZScpO1xuXG5mdW5jdGlvbiBjcmVhdGUoY29udGFpbmVyKSB7XG4gIHZhciBiYXIgPSBuZXcgU3F1YXJlKGNvbnRhaW5lciwge1xuICAgIHN0cm9rZVdpZHRoOiA0LFxuICAgIGVhc2luZzogJ2Vhc2VJbk91dCcsXG4gICAgZHVyYXRpb246IDE0MDAsXG4gICAgY29sb3I6ICcjRUQ2QTVBJyxcbiAgICB0cmFpbENvbG9yOiAnI2VlZScsXG4gICAgdHJhaWxXaWR0aDogMSxcbiAgICBzdmdTdHlsZTogbnVsbFxuICB9KTtcblxuICByZXR1cm4gYmFyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcbiIsInZhciBUcmlhbmdsZSA9IHJlcXVpcmUoJy4uL3RyaWFuZ2xlJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZShjb250YWluZXIpIHtcbiAgdmFyIGJhciA9IG5ldyBUcmlhbmdsZShjb250YWluZXIsIHtcbiAgICBzdHJva2VXaWR0aDogNCxcbiAgICBlYXNpbmc6ICdlYXNlSW5PdXQnLFxuICAgIGR1cmF0aW9uOiAxNDAwLFxuICAgIGNvbG9yOiAnIzBGQTBDRScsXG4gICAgdHJhaWxDb2xvcjogJyNlZWUnLFxuICAgIHRyYWlsV2lkdGg6IDEsXG4gICAgc3ZnU3R5bGU6IG51bGxcbiAgfSk7XG5cbiAgcmV0dXJuIGJhcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGU7XG4iLCIvLyBXQVJOSU5HOiBXaGVuIGVkaXRpbmcgdGhpcyBmaWxlLCByZW1lbWJlciB0byB1cGRhdGUgdGhlIEpTRmlkZGxlOlxuLy8gaHR0cHM6Ly9qc2ZpZGRsZS5uZXQva2ltbW9icnVuZmVsZHQvcmZueTRmdGIvXG4vLyBNQUtFIFNVUkUgVE8gU0VUIFRIRSBORVcgVkVSU0lPTjogXCJTRVQgQVMgQkFTRVwiXG5cbnZhciBQcm9ncmVzc0JhciA9IHJlcXVpcmUoJ3Byb2dyZXNzYmFyLmpzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZShjb250YWluZXIpIHtcbiAgdmFyIGJhciA9IG5ldyBQcm9ncmVzc0Jhci5MaW5lKGNvbnRhaW5lciwge1xuICAgIHN0cm9rZVdpZHRoOiA0LFxuICAgIGVhc2luZzogJ2Vhc2VJbk91dCcsXG4gICAgZHVyYXRpb246IDE0MDAsXG4gICAgY29sb3I6ICcjRkZFQTgyJyxcbiAgICB0cmFpbENvbG9yOiAnI2VlZScsXG4gICAgdHJhaWxXaWR0aDogMSxcbiAgICBzdmdTdHlsZToge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnfVxuICB9KTtcblxuICByZXR1cm4gYmFyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcbiIsIi8vIFdBUk5JTkc6IFdoZW4gZWRpdGluZyB0aGlzIGZpbGUsIHJlbWVtYmVyIHRvIHVwZGF0ZSB0aGUgSlNGaWRkbGU6XG4vLyBodHRwczovL2pzZmlkZGxlLm5ldC9raW1tb2JydW5mZWxkdC9rNXYyZDByci9cbi8vIE1BS0UgU1VSRSBUTyBTRVQgVEhFIE5FVyBWRVJTSU9OOiBcIlNFVCBBUyBCQVNFXCJcblxudmFyIFByb2dyZXNzQmFyID0gcmVxdWlyZSgncHJvZ3Jlc3NiYXIuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlKGNvbnRhaW5lcikge1xuICB2YXIgYmFyID0gbmV3IFByb2dyZXNzQmFyLkxpbmUoY29udGFpbmVyLCB7XG4gICAgc3Ryb2tlV2lkdGg6IDQsXG4gICAgZWFzaW5nOiAnZWFzZUluT3V0JyxcbiAgICBkdXJhdGlvbjogMTQwMCxcbiAgICBjb2xvcjogJyNGRkVBODInLFxuICAgIHRyYWlsQ29sb3I6ICcjZWVlJyxcbiAgICB0cmFpbFdpZHRoOiAxLFxuICAgIHN2Z1N0eWxlOiB7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJSd9LFxuICAgIHRleHQ6IHtcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIC8vIFRleHQgY29sb3IuXG4gICAgICAgIC8vIERlZmF1bHQ6IHNhbWUgYXMgc3Ryb2tlIGNvbG9yIChvcHRpb25zLmNvbG9yKVxuICAgICAgICBjb2xvcjogJyM5OTknLFxuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgcmlnaHQ6ICcwJyxcbiAgICAgICAgdG9wOiAnMzBweCcsXG4gICAgICAgIHBhZGRpbmc6IDAsXG4gICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgdHJhbnNmb3JtOiBudWxsXG4gICAgICB9LFxuICAgICAgYXV0b1N0eWxlQ29udGFpbmVyOiBmYWxzZVxuICAgIH0sXG4gICAgZnJvbToge2NvbG9yOiAnI0ZGRUE4Mid9LFxuICAgIHRvOiB7Y29sb3I6ICcjRUQ2QTVBJ30sXG4gICAgc3RlcDogKHN0YXRlLCBiYXIpID0+IHtcbiAgICAgIGJhci5zZXRUZXh0KE1hdGgucm91bmQoYmFyLnZhbHVlKCkgKiAxMDApICsgJyAlJyk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gYmFyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZTtcbiIsIi8vIFdBUk5JTkc6IFdoZW4gZWRpdGluZyB0aGlzIGZpbGUsIHJlbWVtYmVyIHRvIHVwZGF0ZSB0aGUgSlNGaWRkbGU6XG4vLyBodHRwczovL2pzZmlkZGxlLm5ldC9raW1tb2JydW5mZWxkdC9zd2M2NGdnMy9cbi8vIE1BS0UgU1VSRSBUTyBTRVQgVEhFIE5FVyBWRVJTSU9OOiBcIlNFVCBBUyBCQVNFXCJcblxudmFyIFByb2dyZXNzQmFyID0gcmVxdWlyZSgncHJvZ3Jlc3NiYXIuanMnKTtcblxuZnVuY3Rpb24gY3JlYXRlKGNvbnRhaW5lcikge1xuICB2YXIgYmFyID0gbmV3IFByb2dyZXNzQmFyLkxpbmUoY29udGFpbmVyLCB7XG4gICAgc3Ryb2tlV2lkdGg6IDQsXG4gICAgZWFzaW5nOiAnZWFzZUluT3V0JyxcbiAgICBkdXJhdGlvbjogMTQwMCxcbiAgICBjb2xvcjogJyNGRkVBODInLFxuICAgIHRyYWlsQ29sb3I6ICcjZWVlJyxcbiAgICB0cmFpbFdpZHRoOiAxLFxuICAgIHN2Z1N0eWxlOiB7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJSd9LFxuICAgIGZyb206IHtjb2xvcjogJyNGRkVBODInfSxcbiAgICB0bzoge2NvbG9yOiAnI0VENkE1QSd9LFxuICAgIHN0ZXA6IChzdGF0ZSwgYmFyKSA9PiB7XG4gICAgICBiYXIucGF0aC5zZXRBdHRyaWJ1dGUoJ3N0cm9rZScsIHN0YXRlLmNvbG9yKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBiYXI7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlO1xuIiwiLy8gV0FSTklORzogV2hlbiBlZGl0aW5nIHRoaXMgZmlsZSwgcmVtZW1iZXIgdG8gdXBkYXRlIHRoZSBKU0ZpZGRsZTpcbi8vIGh0dHBzOi8vanNmaWRkbGUubmV0L2tpbW1vYnJ1bmZlbGR0L2JzOGFuZTZtL1xuLy8gTUFLRSBTVVJFIFRPIFNFVCBUSEUgTkVXIFZFUlNJT046IFwiU0VUIEFTIEJBU0VcIlxuXG52YXIgUHJvZ3Jlc3NCYXIgPSByZXF1aXJlKCdwcm9ncmVzc2Jhci5qcycpO1xuXG5mdW5jdGlvbiBjcmVhdGUoY29udGFpbmVyKSB7XG4gIHZhciBiYXIgPSBuZXcgUHJvZ3Jlc3NCYXIuU2VtaUNpcmNsZShjb250YWluZXIsIHtcbiAgICBzdHJva2VXaWR0aDogNixcbiAgICBlYXNpbmc6ICdlYXNlSW5PdXQnLFxuICAgIGR1cmF0aW9uOiAxNDAwLFxuICAgIGNvbG9yOiAnI0ZGRUE4MicsXG4gICAgdHJhaWxDb2xvcjogJyNlZWUnLFxuICAgIHRyYWlsV2lkdGg6IDEsXG4gICAgc3ZnU3R5bGU6IG51bGxcbiAgfSk7XG5cbiAgcmV0dXJuIGJhcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGU7XG4iLCIvLyBXQVJOSU5HOiBXaGVuIGVkaXRpbmcgdGhpcyBmaWxlLCByZW1lbWJlciB0byB1cGRhdGUgdGhlIEpTRmlkZGxlOlxuLy8gaHR0cHM6Ly9qc2ZpZGRsZS5uZXQva2ltbW9icnVuZmVsZHQvc3F3ZGtyZzAvXG4vLyBNQUtFIFNVUkUgVE8gU0VUIFRIRSBORVcgVkVSU0lPTjogXCJTRVQgQVMgQkFTRVwiXG5cbnZhciBQcm9ncmVzc0JhciA9IHJlcXVpcmUoJ3Byb2dyZXNzYmFyLmpzJyk7XG5cbmZ1bmN0aW9uIGNyZWF0ZShjb250YWluZXIpIHtcbiAgdmFyIGJhciA9IG5ldyBQcm9ncmVzc0Jhci5TZW1pQ2lyY2xlKGNvbnRhaW5lciwge1xuICAgIHN0cm9rZVdpZHRoOiA4LFxuICAgIGNvbG9yOiAnI0ZGRUE4MicsXG4gICAgdHJhaWxDb2xvcjogJyNlZWUnLFxuICAgIHRyYWlsV2lkdGg6IDEsXG4gICAgZWFzaW5nOiAnZWFzZUluT3V0JyxcbiAgICBkdXJhdGlvbjogMTQwMCxcbiAgICBzdmdTdHlsZTogbnVsbCxcbiAgICB0ZXh0OiB7XG4gICAgICB2YWx1ZTogJycsXG4gICAgICBhbGlnblRvQm90dG9tOiBmYWxzZVxuICAgIH0sXG4gICAgZnJvbToge2NvbG9yOiAnI0ZGRUE4Mid9LFxuICAgIHRvOiB7Y29sb3I6ICcjRUQ2QTVBJ30sXG4gICAgLy8gU2V0IGRlZmF1bHQgc3RlcCBmdW5jdGlvbiBmb3IgYWxsIGFuaW1hdGUgY2FsbHNcbiAgICBzdGVwOiAoc3RhdGUsIGJhcikgPT4ge1xuICAgICAgYmFyLnBhdGguc2V0QXR0cmlidXRlKCdzdHJva2UnLCBzdGF0ZS5jb2xvcik7XG4gICAgICB2YXIgdmFsdWUgPSBNYXRoLnJvdW5kKGJhci52YWx1ZSgpICogMTAwKTtcbiAgICAgIGlmICh2YWx1ZSA9PT0gMCkge1xuICAgICAgICBiYXIuc2V0VGV4dCgnJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBiYXIuc2V0VGV4dCh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGJhci50ZXh0LnN0eWxlLmNvbG9yID0gc3RhdGUuY29sb3I7XG4gICAgfVxuICB9KTtcbiAgYmFyLnRleHQuc3R5bGUuZm9udEZhbWlseSA9ICdcIlJhbGV3YXlcIiwgSGVsdmV0aWNhLCBzYW5zLXNlcmlmJztcbiAgYmFyLnRleHQuc3R5bGUuZm9udFNpemUgPSAnMnJlbSc7XG5cbiAgcmV0dXJuIGJhcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBjcmVhdGU7XG4iLCJjb25zdCBfID0ge1xuICBtYXA6IHJlcXVpcmUoJ2xvZGFzaC5tYXAnKSxcbiAgZm9yRWFjaDogcmVxdWlyZSgnbG9kYXNoLmZvcmVhY2gnKVxufTtcbmNvbnN0IFByb2dyZXNzQmFyID0gcmVxdWlyZSgncHJvZ3Jlc3NiYXIuanMnKTtcbndpbmRvdy5Qcm9ncmVzc0JhciA9IFByb2dyZXNzQmFyO1xuY29uc3QgaW50cm9TcXVhcmUgPSByZXF1aXJlKCcuL2V4YW1wbGVzL2ludHJvLXNxdWFyZScpO1xuY29uc3QgaW50cm9DaXJjbGUgPSByZXF1aXJlKCcuL2V4YW1wbGVzL2ludHJvLWNpcmNsZScpO1xuY29uc3QgaW50cm9UcmlhbmdsZSA9IHJlcXVpcmUoJy4vZXhhbXBsZXMvaW50cm8tdHJpYW5nbGUnKTtcbmNvbnN0IGluaXRpYWxpemVFeGFtcGxlcyA9IHJlcXVpcmUoJy4vaW5pdC1leGFtcGxlcycpO1xuXG5mdW5jdGlvbiBvbkxvYWQoKSB7XG4gIC8vIENyZWF0ZSBhIGZha2UgbG9hZGluZyBiYXIsIGp1c3QgZm9yIGEgZGVtby4gOilcbiAgdmFyIGxvYWRpbmdCYXIgPSBjcmVhdGVMb2FkaW5nQmFyKCk7XG4gIHBsYXlGYWtlTG9hZGluZ0RlbW8obG9hZGluZ0JhcilcblxuICBjb25zdCBwbGF5SW50cm8gPSBpbml0aWFsaXplSW50cm8oKTtcbiAgY29uc3QgcGxheUV4YW1wbGVzID0gaW5pdGlhbGl6ZUV4YW1wbGVzKCk7XG5cbiAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgcGxheUludHJvKCk7XG4gICAgcGxheUV4YW1wbGVzKCk7XG4gIH0sIDE1MDApO1xufVxuXG5mdW5jdGlvbiBpbml0aWFsaXplSW50cm8oKSB7XG4gIGNvbnN0IGNyZWF0ZUJhcnMgPSBbaW50cm9TcXVhcmUsIGludHJvQ2lyY2xlLCBpbnRyb1RyaWFuZ2xlXTtcbiAgY29uc3QgaW50cm9CYXJzID0gXy5tYXAoY3JlYXRlQmFycywgKGNyZWF0ZUJhciwgaSkgPT4ge1xuICAgIHJldHVybiBjcmVhdGVCYXIoJyNpbnRyby1kZW1vJyArIChpICsgMSkpO1xuICB9KTtcblxuICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgXy5mb3JFYWNoKGludHJvQmFycywgYmFyID0+IGJhci5zZXQoMCkpO1xuICAgIHBsYXlJbnRyb0RlbW8oaW50cm9CYXJzKTtcbiAgfSwgNTAwMCk7XG5cbiAgcmV0dXJuICgpID0+IHBsYXlJbnRyb0RlbW8oaW50cm9CYXJzKTtcbn1cblxuZnVuY3Rpb24gcGxheUludHJvRGVtbyhpbnRyb0JhcnMpIHtcbiAgXy5mb3JFYWNoKGludHJvQmFycywgYmFyID0+IGJhci5hbmltYXRlKDEpKTtcbiAgdmFyIHRyaWFuZ2xlID0gaW50cm9CYXJzWzJdO1xuXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHRyaWFuZ2xlLnBhdGguc3R5bGVbJ3N0cm9rZS1saW5lY2FwJ10gPSAncm91bmQnO1xuICB9LCAxMDApO1xufVxuXG5mdW5jdGlvbiBwbGF5RmFrZUxvYWRpbmdEZW1vKGxvYWRpbmdCYXIpIHtcbiAgc2V0VGltZW91dCgoKSA9PiBsb2FkaW5nQmFyLmFuaW1hdGUoMC4xKSwgMjApO1xuICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICBsb2FkaW5nQmFyLmFuaW1hdGUoMS4wLCB7XG4gICAgICBkdXJhdGlvbjogNTAwLFxuICAgICAgZWFzaW5nOiAnZWFzZUluJ1xuICAgIH0pXG4gIH0sIDUwMCk7XG4gIHNldFRpbWVvdXQoKCkgPT4gbG9hZGluZ0Jhci5zZXQoMCksIDEyMDApO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMb2FkaW5nQmFyKCkge1xuICByZXR1cm4gbmV3IFByb2dyZXNzQmFyLkxpbmUoJyNsb2FkaW5nLWJhcicsIHtcbiAgICBjb2xvcjogJyMwRkEwQ0UnLFxuICAgIHN2Z1N0eWxlOiB7XG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBkaXNwbGF5OiAnYmxvY2snXG4gICAgfVxuICB9KTtcbn1cblxud2luZG93Lm9ubG9hZCA9IG9uTG9hZDtcbiIsImNvbnN0IF8gPSB7XG4gIG1hcDogcmVxdWlyZSgnbG9kYXNoLm1hcCcpLFxuICBmb3JFYWNoOiByZXF1aXJlKCdsb2Rhc2guZm9yZWFjaCcpLFxuICBmbGF0dGVuOiByZXF1aXJlKCdsb2Rhc2guZmxhdHRlbicpXG59O1xuY29uc3Qge3BsYXlMb29wfSA9IHJlcXVpcmUoJy4vdXRpbCcpO1xuY29uc3QgZXhhbXBsZXMgPSB7XG4gIGxpbmU6IFtcbiAgICByZXF1aXJlKCcuL2V4YW1wbGVzL2xpbmUtMScpLFxuICAgIHJlcXVpcmUoJy4vZXhhbXBsZXMvbGluZS0yJyksXG4gICAgcmVxdWlyZSgnLi9leGFtcGxlcy9saW5lLTMnKVxuICBdLFxuICBjaXJjbGU6IFtcbiAgICByZXF1aXJlKCcuL2V4YW1wbGVzL2NpcmNsZS0xJyksXG4gICAgcmVxdWlyZSgnLi9leGFtcGxlcy9jaXJjbGUtMicpLFxuICAgIHJlcXVpcmUoJy4vZXhhbXBsZXMvY2lyY2xlLTMnKVxuICBdLFxuICBzZW1pQ2lyY2xlOiBbXG4gICAgcmVxdWlyZSgnLi9leGFtcGxlcy9zZW1pLWNpcmNsZS0xJyksXG4gICAgcmVxdWlyZSgnLi9leGFtcGxlcy9zZW1pLWNpcmNsZS0yJylcbiAgXSxcbiAgY3VzdG9tOiBbXG4gICAgcmVxdWlyZSgnLi9leGFtcGxlcy9jdXN0b20tMScpXG4gIF1cbn07XG5cblxuZnVuY3Rpb24gaW5pdGlhbGl6ZSgpIHtcbiAgY29uc3QgYmFycyA9IF8uZmxhdHRlbihfLm1hcChleGFtcGxlcywgKGNyZWF0ZUJhcnMsIGtleSkgPT4ge1xuICAgIHJldHVybiBfLm1hcChjcmVhdGVCYXJzLCAoY3JlYXRlQmFyLCBpKSA9PiB7XG4gICAgICByZXR1cm4gY3JlYXRlQmFyKCcjZXhhbXBsZS0nICsga2V5LnRvTG93ZXJDYXNlKCkgKyAnLScgKyAoaSArIDEpKTtcbiAgICB9KTtcbiAgfSkpO1xuXG4gIHJldHVybiAoKSA9PiBfLmZvckVhY2goYmFycywgYmFyID0+IHBsYXlMb29wKGJhcikpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluaXRpYWxpemU7XG4iLCIvLyBTcXVhcmUgc2hhcGVkIHByb2dyZXNzIGJhclxuLy8gTm90ZTogU3F1YXJlIGlzIG5vdCBjb3JlIHBhcnQgb2YgQVBJIGFueW1vcmUuIEl0J3MgbGVmdCBoZXJlXG4vLyAgICAgICBmb3IgcmVmZXJlbmNlLiBzcXVhcmUgaXMgbm90IGluY2x1ZGVkIHRvIHRoZSBwcm9ncmVzc2JhclxuLy8gICAgICAgYnVpbGQgYW55bW9yZVxuXG5jb25zdCB7dXRpbHMsIFNoYXBlfSA9IHJlcXVpcmUoJ3Byb2dyZXNzYmFyLmpzJyk7XG5cbnZhciBTcXVhcmUgPSBmdW5jdGlvbiBTcXVhcmUoY29udGFpbmVyLCBvcHRpb25zKSB7XG4gICAgdGhpcy5fcGF0aFRlbXBsYXRlID1cbiAgICAgICAgJ00gMCx7aGFsZk9mU3Ryb2tlV2lkdGh9JyArXG4gICAgICAgICcgTCB7d2lkdGh9LHtoYWxmT2ZTdHJva2VXaWR0aH0nICtcbiAgICAgICAgJyBMIHt3aWR0aH0se3dpZHRofScgK1xuICAgICAgICAnIEwge2hhbGZPZlN0cm9rZVdpZHRofSx7d2lkdGh9JyArXG4gICAgICAgICcgTCB7aGFsZk9mU3Ryb2tlV2lkdGh9LHtzdHJva2VXaWR0aH0nO1xuXG4gICAgdGhpcy5fdHJhaWxUZW1wbGF0ZSA9XG4gICAgICAgICdNIHtzdGFydE1hcmdpbn0se2hhbGZPZlN0cm9rZVdpZHRofScgK1xuICAgICAgICAnIEwge3dpZHRofSx7aGFsZk9mU3Ryb2tlV2lkdGh9JyArXG4gICAgICAgICcgTCB7d2lkdGh9LHt3aWR0aH0nICtcbiAgICAgICAgJyBMIHtoYWxmT2ZTdHJva2VXaWR0aH0se3dpZHRofScgK1xuICAgICAgICAnIEwge2hhbGZPZlN0cm9rZVdpZHRofSx7aGFsZk9mU3Ryb2tlV2lkdGh9JztcblxuICAgIFNoYXBlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG59O1xuXG5TcXVhcmUucHJvdG90eXBlID0gbmV3IFNoYXBlKCk7XG5TcXVhcmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU3F1YXJlO1xuXG5TcXVhcmUucHJvdG90eXBlLl9wYXRoU3RyaW5nID0gZnVuY3Rpb24gX3BhdGhTdHJpbmcob3B0cykge1xuICAgIHZhciB3ID0gMTAwIC0gb3B0cy5zdHJva2VXaWR0aCAvIDI7XG5cbiAgICByZXR1cm4gdXRpbHMucmVuZGVyKHRoaXMuX3BhdGhUZW1wbGF0ZSwge1xuICAgICAgICB3aWR0aDogdyxcbiAgICAgICAgc3Ryb2tlV2lkdGg6IG9wdHMuc3Ryb2tlV2lkdGgsXG4gICAgICAgIGhhbGZPZlN0cm9rZVdpZHRoOiBvcHRzLnN0cm9rZVdpZHRoIC8gMlxuICAgIH0pO1xufTtcblxuU3F1YXJlLnByb3RvdHlwZS5fdHJhaWxTdHJpbmcgPSBmdW5jdGlvbiBfdHJhaWxTdHJpbmcob3B0cykge1xuICAgIHZhciB3ID0gMTAwIC0gb3B0cy5zdHJva2VXaWR0aCAvIDI7XG5cbiAgICByZXR1cm4gdXRpbHMucmVuZGVyKHRoaXMuX3RyYWlsVGVtcGxhdGUsIHtcbiAgICAgICAgd2lkdGg6IHcsXG4gICAgICAgIHN0cm9rZVdpZHRoOiBvcHRzLnN0cm9rZVdpZHRoLFxuICAgICAgICBoYWxmT2ZTdHJva2VXaWR0aDogb3B0cy5zdHJva2VXaWR0aCAvIDIsXG4gICAgICAgIHN0YXJ0TWFyZ2luOiBvcHRzLnN0cm9rZVdpZHRoIC8gMiAtIG9wdHMudHJhaWxXaWR0aCAvIDJcbiAgICB9KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU3F1YXJlO1xuIiwiLy8gVHJpYW5nbGUgc2hhcGVkIHByb2dyZXNzIGJhclxuXG5jb25zdCB7dXRpbHMsIFNoYXBlfSA9IHJlcXVpcmUoJ3Byb2dyZXNzYmFyLmpzJyk7XG5cbnZhciBUcmlhbmdsZSA9IGZ1bmN0aW9uIFRyaWFuZ2xlKGNvbnRhaW5lciwgb3B0aW9ucykge1xuICAgIHRoaXMuX3BhdGhUZW1wbGF0ZSA9ICdNIDUwLHtjZW50ZXJ9IEwgOTgse2JvdHRvbUNlbnRlcn0nICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnIEwgMix7Ym90dG9tQ2VudGVyfSBMIDUwLHtjZW50ZXJ9JztcbiAgICBTaGFwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblxuVHJpYW5nbGUucHJvdG90eXBlID0gbmV3IFNoYXBlKCk7XG5UcmlhbmdsZS5wcm90b3R5cGUuY29uc3RydWN0b3IgPSBUcmlhbmdsZTtcblxuVHJpYW5nbGUucHJvdG90eXBlLl9wYXRoU3RyaW5nID0gZnVuY3Rpb24gX3BhdGhTdHJpbmcob3B0cykge1xuICAgIHJldHVybiB1dGlscy5yZW5kZXIodGhpcy5fcGF0aFRlbXBsYXRlLCB7XG4gICAgICAgIGNlbnRlcjogb3B0cy5zdHJva2VXaWR0aCAvIDIsXG4gICAgICAgIGJvdHRvbUNlbnRlcjogMTAwIC0gb3B0cy5zdHJva2VXaWR0aCAvIDJcbiAgICB9KTtcbn07XG5cblRyaWFuZ2xlLnByb3RvdHlwZS5fdHJhaWxTdHJpbmcgPSBmdW5jdGlvbiBfdHJhaWxTdHJpbmcob3B0cykge1xuICAgIHJldHVybiB0aGlzLl9wYXRoU3RyaW5nKG9wdHMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBUcmlhbmdsZTtcbiIsImZ1bmN0aW9uIHBsYXlMb29wKGJhcikge1xuICBmdW5jdGlvbiBhbmltYXRlQmFyKCkge1xuICAgIGJhci5hbmltYXRlKDEsICgpID0+IHtcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBiYXIuYW5pbWF0ZSgwKVxuICAgICAgfSwgNTAwKTtcbiAgICB9KTtcbiAgfVxuXG4gIHNldEludGVydmFsKCgpID0+IHtcbiAgICBiYXIuc2V0KDApXG4gICAgYW5pbWF0ZUJhcigpO1xuICB9LCA0NTAwKTtcblxuICBhbmltYXRlQmFyKCk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0ge1xuICBwbGF5TG9vcFxufTtcbiIsIi8qIHNoaWZ0eSAtIHYxLjUuMiAtIDIwMTYtMDItMTAgLSBodHRwOi8vamVyZW15Y2thaG4uZ2l0aHViLmlvL3NoaWZ0eSAqL1xuOyhmdW5jdGlvbiAoKSB7XG4gIHZhciByb290ID0gdGhpcyB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIFNoaWZ0eSBDb3JlXG4gKiBCeSBKZXJlbXkgS2FobiAtIGplcmVteWNrYWhuQGdtYWlsLmNvbVxuICovXG5cbnZhciBUd2VlbmFibGUgPSAoZnVuY3Rpb24gKCkge1xuXG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBBbGlhc2VzIHRoYXQgZ2V0IGRlZmluZWQgbGF0ZXIgaW4gdGhpcyBmdW5jdGlvblxuICB2YXIgZm9ybXVsYTtcblxuICAvLyBDT05TVEFOVFNcbiAgdmFyIERFRkFVTFRfU0NIRURVTEVfRlVOQ1RJT047XG4gIHZhciBERUZBVUxUX0VBU0lORyA9ICdsaW5lYXInO1xuICB2YXIgREVGQVVMVF9EVVJBVElPTiA9IDUwMDtcbiAgdmFyIFVQREFURV9USU1FID0gMTAwMCAvIDYwO1xuXG4gIHZhciBfbm93ID0gRGF0ZS5ub3dcbiAgICAgICA/IERhdGUubm93XG4gICAgICAgOiBmdW5jdGlvbiAoKSB7cmV0dXJuICtuZXcgRGF0ZSgpO307XG5cbiAgdmFyIG5vdyA9IHR5cGVvZiBTSElGVFlfREVCVUdfTk9XICE9PSAndW5kZWZpbmVkJyA/IFNISUZUWV9ERUJVR19OT1cgOiBfbm93O1xuXG4gIGlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIHJlcXVlc3RBbmltYXRpb25GcmFtZSgpIHNoaW0gYnkgUGF1bCBJcmlzaCAobW9kaWZpZWQgZm9yIFNoaWZ0eSlcbiAgICAvLyBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xuICAgIERFRkFVTFRfU0NIRURVTEVfRlVOQ1RJT04gPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgfHwgd2luZG93LndlYmtpdFJlcXVlc3RBbmltYXRpb25GcmFtZVxuICAgICAgIHx8IHdpbmRvdy5vUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgfHwgd2luZG93Lm1zUmVxdWVzdEFuaW1hdGlvbkZyYW1lXG4gICAgICAgfHwgKHdpbmRvdy5tb3pDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWVcbiAgICAgICAmJiB3aW5kb3cubW96UmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxuICAgICAgIHx8IHNldFRpbWVvdXQ7XG4gIH0gZWxzZSB7XG4gICAgREVGQVVMVF9TQ0hFRFVMRV9GVU5DVElPTiA9IHNldFRpbWVvdXQ7XG4gIH1cblxuICBmdW5jdGlvbiBub29wICgpIHtcbiAgICAvLyBOT09QIVxuICB9XG5cbiAgLyoqXG4gICAqIEhhbmR5IHNob3J0Y3V0IGZvciBkb2luZyBhIGZvci1pbiBsb29wLiBUaGlzIGlzIG5vdCBhIFwibm9ybWFsXCIgZWFjaFxuICAgKiBmdW5jdGlvbiwgaXQgaXMgb3B0aW1pemVkIGZvciBTaGlmdHkuICBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gb25seSByZWNlaXZlc1xuICAgKiB0aGUgcHJvcGVydHkgbmFtZSwgbm90IHRoZSB2YWx1ZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9ialxuICAgKiBAcGFyYW0ge0Z1bmN0aW9uKHN0cmluZyl9IGZuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBlYWNoIChvYmosIGZuKSB7XG4gICAgdmFyIGtleTtcbiAgICBmb3IgKGtleSBpbiBvYmopIHtcbiAgICAgIGlmIChPYmplY3QuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkpIHtcbiAgICAgICAgZm4oa2V5KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogUGVyZm9ybSBhIHNoYWxsb3cgY29weSBvZiBPYmplY3QgcHJvcGVydGllcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldE9iamVjdCBUaGUgb2JqZWN0IHRvIGNvcHkgaW50b1xuICAgKiBAcGFyYW0ge09iamVjdH0gc3JjT2JqZWN0IFRoZSBvYmplY3QgdG8gY29weSBmcm9tXG4gICAqIEByZXR1cm4ge09iamVjdH0gQSByZWZlcmVuY2UgdG8gdGhlIGF1Z21lbnRlZCBgdGFyZ2V0T2JqYCBPYmplY3RcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIHNoYWxsb3dDb3B5ICh0YXJnZXRPYmosIHNyY09iaikge1xuICAgIGVhY2goc3JjT2JqLCBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgdGFyZ2V0T2JqW3Byb3BdID0gc3JjT2JqW3Byb3BdO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIHRhcmdldE9iajtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb3BpZXMgZWFjaCBwcm9wZXJ0eSBmcm9tIHNyYyBvbnRvIHRhcmdldCwgYnV0IG9ubHkgaWYgdGhlIHByb3BlcnR5IHRvXG4gICAqIGNvcHkgdG8gdGFyZ2V0IGlzIHVuZGVmaW5lZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldCBNaXNzaW5nIHByb3BlcnRpZXMgaW4gdGhpcyBPYmplY3QgYXJlIGZpbGxlZCBpblxuICAgKiBAcGFyYW0ge09iamVjdH0gc3JjXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBkZWZhdWx0cyAodGFyZ2V0LCBzcmMpIHtcbiAgICBlYWNoKHNyYywgZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIGlmICh0eXBlb2YgdGFyZ2V0W3Byb3BdID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0YXJnZXRbcHJvcF0gPSBzcmNbcHJvcF07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgaW50ZXJwb2xhdGVkIHR3ZWVuIHZhbHVlcyBvZiBhbiBPYmplY3QgZm9yIGEgZ2l2ZW5cbiAgICogdGltZXN0YW1wLlxuICAgKiBAcGFyYW0ge051bWJlcn0gZm9yUG9zaXRpb24gVGhlIHBvc2l0aW9uIHRvIGNvbXB1dGUgdGhlIHN0YXRlIGZvci5cbiAgICogQHBhcmFtIHtPYmplY3R9IGN1cnJlbnRTdGF0ZSBDdXJyZW50IHN0YXRlIHByb3BlcnRpZXMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcmlnaW5hbFN0YXRlOiBUaGUgb3JpZ2luYWwgc3RhdGUgcHJvcGVydGllcyB0aGUgT2JqZWN0IGlzXG4gICAqIHR3ZWVuaW5nIGZyb20uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0YXJnZXRTdGF0ZTogVGhlIGRlc3RpbmF0aW9uIHN0YXRlIHByb3BlcnRpZXMgdGhlIE9iamVjdFxuICAgKiBpcyB0d2VlbmluZyB0by5cbiAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uOiBUaGUgbGVuZ3RoIG9mIHRoZSB0d2VlbiBpbiBtaWxsaXNlY29uZHMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB0aW1lc3RhbXA6IFRoZSBVTklYIGVwb2NoIHRpbWUgYXQgd2hpY2ggdGhlIHR3ZWVuIGJlZ2FuLlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nOiBUaGlzIE9iamVjdCdzIGtleXMgbXVzdCBjb3JyZXNwb25kIHRvIHRoZSBrZXlzIGluXG4gICAqIHRhcmdldFN0YXRlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gdHdlZW5Qcm9wcyAoZm9yUG9zaXRpb24sIGN1cnJlbnRTdGF0ZSwgb3JpZ2luYWxTdGF0ZSwgdGFyZ2V0U3RhdGUsXG4gICAgZHVyYXRpb24sIHRpbWVzdGFtcCwgZWFzaW5nKSB7XG4gICAgdmFyIG5vcm1hbGl6ZWRQb3NpdGlvbiA9XG4gICAgICAgIGZvclBvc2l0aW9uIDwgdGltZXN0YW1wID8gMCA6IChmb3JQb3NpdGlvbiAtIHRpbWVzdGFtcCkgLyBkdXJhdGlvbjtcblxuXG4gICAgdmFyIHByb3A7XG4gICAgdmFyIGVhc2luZ09iamVjdFByb3A7XG4gICAgdmFyIGVhc2luZ0ZuO1xuICAgIGZvciAocHJvcCBpbiBjdXJyZW50U3RhdGUpIHtcbiAgICAgIGlmIChjdXJyZW50U3RhdGUuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgZWFzaW5nT2JqZWN0UHJvcCA9IGVhc2luZ1twcm9wXTtcbiAgICAgICAgZWFzaW5nRm4gPSB0eXBlb2YgZWFzaW5nT2JqZWN0UHJvcCA9PT0gJ2Z1bmN0aW9uJ1xuICAgICAgICAgID8gZWFzaW5nT2JqZWN0UHJvcFxuICAgICAgICAgIDogZm9ybXVsYVtlYXNpbmdPYmplY3RQcm9wXTtcblxuICAgICAgICBjdXJyZW50U3RhdGVbcHJvcF0gPSB0d2VlblByb3AoXG4gICAgICAgICAgb3JpZ2luYWxTdGF0ZVtwcm9wXSxcbiAgICAgICAgICB0YXJnZXRTdGF0ZVtwcm9wXSxcbiAgICAgICAgICBlYXNpbmdGbixcbiAgICAgICAgICBub3JtYWxpemVkUG9zaXRpb25cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gY3VycmVudFN0YXRlO1xuICB9XG5cbiAgLyoqXG4gICAqIFR3ZWVucyBhIHNpbmdsZSBwcm9wZXJ0eS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFRoZSB2YWx1ZSB0aGF0IHRoZSB0d2VlbiBzdGFydGVkIGZyb20uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBlbmQgVGhlIHZhbHVlIHRoYXQgdGhlIHR3ZWVuIHNob3VsZCBlbmQgYXQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IGVhc2luZ0Z1bmMgVGhlIGVhc2luZyBjdXJ2ZSB0byBhcHBseSB0byB0aGUgdHdlZW4uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwb3NpdGlvbiBUaGUgbm9ybWFsaXplZCBwb3NpdGlvbiAoYmV0d2VlbiAwLjAgYW5kIDEuMCkgdG9cbiAgICogY2FsY3VsYXRlIHRoZSBtaWRwb2ludCBvZiAnc3RhcnQnIGFuZCAnZW5kJyBhZ2FpbnN0LlxuICAgKiBAcmV0dXJuIHtudW1iZXJ9IFRoZSB0d2VlbmVkIHZhbHVlLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gdHdlZW5Qcm9wIChzdGFydCwgZW5kLCBlYXNpbmdGdW5jLCBwb3NpdGlvbikge1xuICAgIHJldHVybiBzdGFydCArIChlbmQgLSBzdGFydCkgKiBlYXNpbmdGdW5jKHBvc2l0aW9uKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBcHBsaWVzIGEgZmlsdGVyIHRvIFR3ZWVuYWJsZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtUd2VlbmFibGV9IHR3ZWVuYWJsZSBUaGUgYFR3ZWVuYWJsZWAgaW5zdGFuY2UgdG8gY2FsbCB0aGUgZmlsdGVyXG4gICAqIHVwb24uXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBmaWx0ZXJOYW1lIFRoZSBuYW1lIG9mIHRoZSBmaWx0ZXIgdG8gYXBwbHkuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBhcHBseUZpbHRlciAodHdlZW5hYmxlLCBmaWx0ZXJOYW1lKSB7XG4gICAgdmFyIGZpbHRlcnMgPSBUd2VlbmFibGUucHJvdG90eXBlLmZpbHRlcjtcbiAgICB2YXIgYXJncyA9IHR3ZWVuYWJsZS5fZmlsdGVyQXJncztcblxuICAgIGVhY2goZmlsdGVycywgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIGlmICh0eXBlb2YgZmlsdGVyc1tuYW1lXVtmaWx0ZXJOYW1lXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZmlsdGVyc1tuYW1lXVtmaWx0ZXJOYW1lXS5hcHBseSh0d2VlbmFibGUsIGFyZ3MpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgdmFyIHRpbWVvdXRIYW5kbGVyX2VuZFRpbWU7XG4gIHZhciB0aW1lb3V0SGFuZGxlcl9jdXJyZW50VGltZTtcbiAgdmFyIHRpbWVvdXRIYW5kbGVyX2lzRW5kZWQ7XG4gIHZhciB0aW1lb3V0SGFuZGxlcl9vZmZzZXQ7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSB1cGRhdGUgbG9naWMgZm9yIG9uZSBzdGVwIG9mIGEgdHdlZW4uXG4gICAqIEBwYXJhbSB7VHdlZW5hYmxlfSB0d2VlbmFibGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IHRpbWVzdGFtcFxuICAgKiBAcGFyYW0ge251bWJlcn0gZGVsYXlcbiAgICogQHBhcmFtIHtudW1iZXJ9IGR1cmF0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjdXJyZW50U3RhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IG9yaWdpbmFsU3RhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IHRhcmdldFN0YXRlXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBlYXNpbmdcbiAgICogQHBhcmFtIHtGdW5jdGlvbihPYmplY3QsICosIG51bWJlcil9IHN0ZXBcbiAgICogQHBhcmFtIHtGdW5jdGlvbihGdW5jdGlvbixudW1iZXIpfX0gc2NoZWR1bGVcbiAgICogQHBhcmFtIHtudW1iZXI9fSBvcHRfY3VycmVudFRpbWVPdmVycmlkZSBOZWVkZWQgZm9yIGFjY3VyYXRlIHRpbWVzdGFtcCBpblxuICAgKiBUd2VlbmFibGUjc2Vlay5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIHRpbWVvdXRIYW5kbGVyICh0d2VlbmFibGUsIHRpbWVzdGFtcCwgZGVsYXksIGR1cmF0aW9uLCBjdXJyZW50U3RhdGUsXG4gICAgb3JpZ2luYWxTdGF0ZSwgdGFyZ2V0U3RhdGUsIGVhc2luZywgc3RlcCwgc2NoZWR1bGUsXG4gICAgb3B0X2N1cnJlbnRUaW1lT3ZlcnJpZGUpIHtcblxuICAgIHRpbWVvdXRIYW5kbGVyX2VuZFRpbWUgPSB0aW1lc3RhbXAgKyBkZWxheSArIGR1cmF0aW9uO1xuXG4gICAgdGltZW91dEhhbmRsZXJfY3VycmVudFRpbWUgPVxuICAgIE1hdGgubWluKG9wdF9jdXJyZW50VGltZU92ZXJyaWRlIHx8IG5vdygpLCB0aW1lb3V0SGFuZGxlcl9lbmRUaW1lKTtcblxuICAgIHRpbWVvdXRIYW5kbGVyX2lzRW5kZWQgPVxuICAgICAgdGltZW91dEhhbmRsZXJfY3VycmVudFRpbWUgPj0gdGltZW91dEhhbmRsZXJfZW5kVGltZTtcblxuICAgIHRpbWVvdXRIYW5kbGVyX29mZnNldCA9IGR1cmF0aW9uIC0gKFxuICAgICAgdGltZW91dEhhbmRsZXJfZW5kVGltZSAtIHRpbWVvdXRIYW5kbGVyX2N1cnJlbnRUaW1lKTtcblxuICAgIGlmICh0d2VlbmFibGUuaXNQbGF5aW5nKCkpIHtcbiAgICAgIGlmICh0aW1lb3V0SGFuZGxlcl9pc0VuZGVkKSB7XG4gICAgICAgIHN0ZXAodGFyZ2V0U3RhdGUsIHR3ZWVuYWJsZS5fYXR0YWNobWVudCwgdGltZW91dEhhbmRsZXJfb2Zmc2V0KTtcbiAgICAgICAgdHdlZW5hYmxlLnN0b3AodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0d2VlbmFibGUuX3NjaGVkdWxlSWQgPVxuICAgICAgICAgIHNjaGVkdWxlKHR3ZWVuYWJsZS5fdGltZW91dEhhbmRsZXIsIFVQREFURV9USU1FKTtcblxuICAgICAgICBhcHBseUZpbHRlcih0d2VlbmFibGUsICdiZWZvcmVUd2VlbicpO1xuXG4gICAgICAgIC8vIElmIHRoZSBhbmltYXRpb24gaGFzIG5vdCB5ZXQgcmVhY2hlZCB0aGUgc3RhcnQgcG9pbnQgKGUuZy4sIHRoZXJlIHdhc1xuICAgICAgICAvLyBkZWxheSB0aGF0IGhhcyBub3QgeWV0IGNvbXBsZXRlZCksIGp1c3QgaW50ZXJwb2xhdGUgdGhlIHN0YXJ0aW5nXG4gICAgICAgIC8vIHBvc2l0aW9uIG9mIHRoZSB0d2Vlbi5cbiAgICAgICAgaWYgKHRpbWVvdXRIYW5kbGVyX2N1cnJlbnRUaW1lIDwgKHRpbWVzdGFtcCArIGRlbGF5KSkge1xuICAgICAgICAgIHR3ZWVuUHJvcHMoMSwgY3VycmVudFN0YXRlLCBvcmlnaW5hbFN0YXRlLCB0YXJnZXRTdGF0ZSwgMSwgMSwgZWFzaW5nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0d2VlblByb3BzKHRpbWVvdXRIYW5kbGVyX2N1cnJlbnRUaW1lLCBjdXJyZW50U3RhdGUsIG9yaWdpbmFsU3RhdGUsXG4gICAgICAgICAgICB0YXJnZXRTdGF0ZSwgZHVyYXRpb24sIHRpbWVzdGFtcCArIGRlbGF5LCBlYXNpbmcpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXBwbHlGaWx0ZXIodHdlZW5hYmxlLCAnYWZ0ZXJUd2VlbicpO1xuXG4gICAgICAgIHN0ZXAoY3VycmVudFN0YXRlLCB0d2VlbmFibGUuX2F0dGFjaG1lbnQsIHRpbWVvdXRIYW5kbGVyX29mZnNldCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuICAvKipcbiAgICogQ3JlYXRlcyBhIHVzYWJsZSBlYXNpbmcgT2JqZWN0IGZyb20gYSBzdHJpbmcsIGEgZnVuY3Rpb24gb3IgYW5vdGhlciBlYXNpbmdcbiAgICogT2JqZWN0LiAgSWYgYGVhc2luZ2AgaXMgYW4gT2JqZWN0LCB0aGVuIHRoaXMgZnVuY3Rpb24gY2xvbmVzIGl0IGFuZCBmaWxsc1xuICAgKiBpbiB0aGUgbWlzc2luZyBwcm9wZXJ0aWVzIHdpdGggYFwibGluZWFyXCJgLlxuICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nfEZ1bmN0aW9uPn0gZnJvbVR3ZWVuUGFyYW1zXG4gICAqIEBwYXJhbSB7T2JqZWN0fHN0cmluZ3xGdW5jdGlvbn0gZWFzaW5nXG4gICAqIEByZXR1cm4ge09iamVjdC48c3RyaW5nfEZ1bmN0aW9uPn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGNvbXBvc2VFYXNpbmdPYmplY3QgKGZyb21Ud2VlblBhcmFtcywgZWFzaW5nKSB7XG4gICAgdmFyIGNvbXBvc2VkRWFzaW5nID0ge307XG4gICAgdmFyIHR5cGVvZkVhc2luZyA9IHR5cGVvZiBlYXNpbmc7XG5cbiAgICBpZiAodHlwZW9mRWFzaW5nID09PSAnc3RyaW5nJyB8fCB0eXBlb2ZFYXNpbmcgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGVhY2goZnJvbVR3ZWVuUGFyYW1zLCBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICBjb21wb3NlZEVhc2luZ1twcm9wXSA9IGVhc2luZztcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBlYWNoKGZyb21Ud2VlblBhcmFtcywgZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgaWYgKCFjb21wb3NlZEVhc2luZ1twcm9wXSkge1xuICAgICAgICAgIGNvbXBvc2VkRWFzaW5nW3Byb3BdID0gZWFzaW5nW3Byb3BdIHx8IERFRkFVTFRfRUFTSU5HO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tcG9zZWRFYXNpbmc7XG4gIH1cblxuICAvKipcbiAgICogVHdlZW5hYmxlIGNvbnN0cnVjdG9yLlxuICAgKiBAY2xhc3MgVHdlZW5hYmxlXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0X2luaXRpYWxTdGF0ZSBUaGUgdmFsdWVzIHRoYXQgdGhlIGluaXRpYWwgdHdlZW4gc2hvdWxkXG4gICAqIHN0YXJ0IGF0IGlmIGEgYGZyb21gIG9iamVjdCBpcyBub3QgcHJvdmlkZWQgdG8gYHt7I2Nyb3NzTGlua1xuICAgKiBcIlR3ZWVuYWJsZS90d2VlbjptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1gIG9yIGB7eyNjcm9zc0xpbmtcbiAgICogXCJUd2VlbmFibGUvc2V0Q29uZmlnOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fWAuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0X2NvbmZpZyBDb25maWd1cmF0aW9uIG9iamVjdCB0byBiZSBwYXNzZWQgdG9cbiAgICogYHt7I2Nyb3NzTGluayBcIlR3ZWVuYWJsZS9zZXRDb25maWc6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319YC5cbiAgICogQG1vZHVsZSBUd2VlbmFibGVcbiAgICogQGNvbnN0cnVjdG9yXG4gICAqL1xuICBmdW5jdGlvbiBUd2VlbmFibGUgKG9wdF9pbml0aWFsU3RhdGUsIG9wdF9jb25maWcpIHtcbiAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBvcHRfaW5pdGlhbFN0YXRlIHx8IHt9O1xuICAgIHRoaXMuX2NvbmZpZ3VyZWQgPSBmYWxzZTtcbiAgICB0aGlzLl9zY2hlZHVsZUZ1bmN0aW9uID0gREVGQVVMVF9TQ0hFRFVMRV9GVU5DVElPTjtcblxuICAgIC8vIFRvIHByZXZlbnQgdW5uZWNlc3NhcnkgY2FsbHMgdG8gc2V0Q29uZmlnIGRvIG5vdCBzZXQgZGVmYXVsdFxuICAgIC8vIGNvbmZpZ3VyYXRpb24gaGVyZS4gIE9ubHkgc2V0IGRlZmF1bHQgY29uZmlndXJhdGlvbiBpbW1lZGlhdGVseSBiZWZvcmVcbiAgICAvLyB0d2VlbmluZyBpZiBub25lIGhhcyBiZWVuIHNldC5cbiAgICBpZiAodHlwZW9mIG9wdF9jb25maWcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICB0aGlzLnNldENvbmZpZyhvcHRfY29uZmlnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ29uZmlndXJlIGFuZCBzdGFydCBhIHR3ZWVuLlxuICAgKiBAbWV0aG9kIHR3ZWVuXG4gICAqIEBwYXJhbSB7T2JqZWN0PX0gb3B0X2NvbmZpZyBDb25maWd1cmF0aW9uIG9iamVjdCB0byBiZSBwYXNzZWQgdG9cbiAgICogYHt7I2Nyb3NzTGluayBcIlR3ZWVuYWJsZS9zZXRDb25maWc6bWV0aG9kXCJ9fXt7L2Nyb3NzTGlua319YC5cbiAgICogQGNoYWluYWJsZVxuICAgKi9cbiAgVHdlZW5hYmxlLnByb3RvdHlwZS50d2VlbiA9IGZ1bmN0aW9uIChvcHRfY29uZmlnKSB7XG4gICAgaWYgKHRoaXMuX2lzVHdlZW5pbmcpIHtcbiAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8vIE9ubHkgc2V0IGRlZmF1bHQgY29uZmlnIGlmIG5vIGNvbmZpZ3VyYXRpb24gaGFzIGJlZW4gc2V0IHByZXZpb3VzbHkgYW5kXG4gICAgLy8gbm9uZSBpcyBwcm92aWRlZCBub3cuXG4gICAgaWYgKG9wdF9jb25maWcgIT09IHVuZGVmaW5lZCB8fCAhdGhpcy5fY29uZmlndXJlZCkge1xuICAgICAgdGhpcy5zZXRDb25maWcob3B0X2NvbmZpZyk7XG4gICAgfVxuXG4gICAgdGhpcy5fdGltZXN0YW1wID0gbm93KCk7XG4gICAgdGhpcy5fc3RhcnQodGhpcy5nZXQoKSwgdGhpcy5fYXR0YWNobWVudCk7XG4gICAgcmV0dXJuIHRoaXMucmVzdW1lKCk7XG4gIH07XG5cbiAgLyoqXG4gICAqIENvbmZpZ3VyZSBhIHR3ZWVuIHRoYXQgd2lsbCBzdGFydCBhdCBzb21lIHBvaW50IGluIHRoZSBmdXR1cmUuXG4gICAqXG4gICAqIEBtZXRob2Qgc2V0Q29uZmlnXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBjb25maWcgVGhlIGZvbGxvd2luZyB2YWx1ZXMgYXJlIHZhbGlkOlxuICAgKiAtIF9fZnJvbV9fIChfT2JqZWN0PV8pOiBTdGFydGluZyBwb3NpdGlvbi4gIElmIG9taXR0ZWQsIGB7eyNjcm9zc0xpbmtcbiAgICogICBcIlR3ZWVuYWJsZS9nZXQ6bWV0aG9kXCJ9fWdldCgpe3svY3Jvc3NMaW5rfX1gIGlzIHVzZWQuXG4gICAqIC0gX190b19fIChfT2JqZWN0PV8pOiBFbmRpbmcgcG9zaXRpb24uXG4gICAqIC0gX19kdXJhdGlvbl9fIChfbnVtYmVyPV8pOiBIb3cgbWFueSBtaWxsaXNlY29uZHMgdG8gYW5pbWF0ZSBmb3IuXG4gICAqIC0gX19kZWxheV9fIChfZGVsYXk9Xyk6IEhvdyBtYW55IG1pbGxpc2Vjb25kcyB0byB3YWl0IGJlZm9yZSBzdGFydGluZyB0aGVcbiAgICogICB0d2Vlbi5cbiAgICogLSBfX3N0YXJ0X18gKF9GdW5jdGlvbihPYmplY3QsICopXyk6IEZ1bmN0aW9uIHRvIGV4ZWN1dGUgd2hlbiB0aGUgdHdlZW5cbiAgICogICBiZWdpbnMuICBSZWNlaXZlcyB0aGUgc3RhdGUgb2YgdGhlIHR3ZWVuIGFzIHRoZSBmaXJzdCBwYXJhbWV0ZXIgYW5kXG4gICAqICAgYGF0dGFjaG1lbnRgIGFzIHRoZSBzZWNvbmQgcGFyYW1ldGVyLlxuICAgKiAtIF9fc3RlcF9fIChfRnVuY3Rpb24oT2JqZWN0LCAqLCBudW1iZXIpXyk6IEZ1bmN0aW9uIHRvIGV4ZWN1dGUgb24gZXZlcnlcbiAgICogICB0aWNrLiAgUmVjZWl2ZXMgYHt7I2Nyb3NzTGlua1xuICAgKiAgIFwiVHdlZW5hYmxlL2dldDptZXRob2RcIn19Z2V0KCl7ey9jcm9zc0xpbmt9fWAgYXMgdGhlIGZpcnN0IHBhcmFtZXRlcixcbiAgICogICBgYXR0YWNobWVudGAgYXMgdGhlIHNlY29uZCBwYXJhbWV0ZXIsIGFuZCB0aGUgdGltZSBlbGFwc2VkIHNpbmNlIHRoZVxuICAgKiAgIHN0YXJ0IG9mIHRoZSB0d2VlbiBhcyB0aGUgdGhpcmQuIFRoaXMgZnVuY3Rpb24gaXMgbm90IGNhbGxlZCBvbiB0aGVcbiAgICogICBmaW5hbCBzdGVwIG9mIHRoZSBhbmltYXRpb24sIGJ1dCBgZmluaXNoYCBpcy5cbiAgICogLSBfX2ZpbmlzaF9fIChfRnVuY3Rpb24oT2JqZWN0LCAqKV8pOiBGdW5jdGlvbiB0byBleGVjdXRlIHVwb24gdHdlZW5cbiAgICogICBjb21wbGV0aW9uLiAgUmVjZWl2ZXMgdGhlIHN0YXRlIG9mIHRoZSB0d2VlbiBhcyB0aGUgZmlyc3QgcGFyYW1ldGVyIGFuZFxuICAgKiAgIGBhdHRhY2htZW50YCBhcyB0aGUgc2Vjb25kIHBhcmFtZXRlci5cbiAgICogLSBfX2Vhc2luZ19fIChfT2JqZWN0LjxzdHJpbmd8RnVuY3Rpb24+fHN0cmluZ3xGdW5jdGlvbj1fKTogRWFzaW5nIGN1cnZlXG4gICAqICAgbmFtZShzKSBvciBmdW5jdGlvbihzKSB0byB1c2UgZm9yIHRoZSB0d2Vlbi5cbiAgICogLSBfX2F0dGFjaG1lbnRfXyAoXypfKTogQ2FjaGVkIHZhbHVlIHRoYXQgaXMgcGFzc2VkIHRvIHRoZVxuICAgKiAgIGBzdGVwYC9gc3RhcnRgL2BmaW5pc2hgIG1ldGhvZHMuXG4gICAqIEBjaGFpbmFibGVcbiAgICovXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuc2V0Q29uZmlnID0gZnVuY3Rpb24gKGNvbmZpZykge1xuICAgIGNvbmZpZyA9IGNvbmZpZyB8fCB7fTtcbiAgICB0aGlzLl9jb25maWd1cmVkID0gdHJ1ZTtcblxuICAgIC8vIEF0dGFjaCBzb21ldGhpbmcgdG8gdGhpcyBUd2VlbmFibGUgaW5zdGFuY2UgKGUuZy46IGEgRE9NIGVsZW1lbnQsIGFuXG4gICAgLy8gb2JqZWN0LCBhIHN0cmluZywgZXRjLik7XG4gICAgdGhpcy5fYXR0YWNobWVudCA9IGNvbmZpZy5hdHRhY2htZW50O1xuXG4gICAgLy8gSW5pdCB0aGUgaW50ZXJuYWwgc3RhdGVcbiAgICB0aGlzLl9wYXVzZWRBdFRpbWUgPSBudWxsO1xuICAgIHRoaXMuX3NjaGVkdWxlSWQgPSBudWxsO1xuICAgIHRoaXMuX2RlbGF5ID0gY29uZmlnLmRlbGF5IHx8IDA7XG4gICAgdGhpcy5fc3RhcnQgPSBjb25maWcuc3RhcnQgfHwgbm9vcDtcbiAgICB0aGlzLl9zdGVwID0gY29uZmlnLnN0ZXAgfHwgbm9vcDtcbiAgICB0aGlzLl9maW5pc2ggPSBjb25maWcuZmluaXNoIHx8IG5vb3A7XG4gICAgdGhpcy5fZHVyYXRpb24gPSBjb25maWcuZHVyYXRpb24gfHwgREVGQVVMVF9EVVJBVElPTjtcbiAgICB0aGlzLl9jdXJyZW50U3RhdGUgPSBzaGFsbG93Q29weSh7fSwgY29uZmlnLmZyb20pIHx8IHRoaXMuZ2V0KCk7XG4gICAgdGhpcy5fb3JpZ2luYWxTdGF0ZSA9IHRoaXMuZ2V0KCk7XG4gICAgdGhpcy5fdGFyZ2V0U3RhdGUgPSBzaGFsbG93Q29weSh7fSwgY29uZmlnLnRvKSB8fCB0aGlzLmdldCgpO1xuXG4gICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgIHRoaXMuX3RpbWVvdXRIYW5kbGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGltZW91dEhhbmRsZXIoc2VsZixcbiAgICAgICAgc2VsZi5fdGltZXN0YW1wLFxuICAgICAgICBzZWxmLl9kZWxheSxcbiAgICAgICAgc2VsZi5fZHVyYXRpb24sXG4gICAgICAgIHNlbGYuX2N1cnJlbnRTdGF0ZSxcbiAgICAgICAgc2VsZi5fb3JpZ2luYWxTdGF0ZSxcbiAgICAgICAgc2VsZi5fdGFyZ2V0U3RhdGUsXG4gICAgICAgIHNlbGYuX2Vhc2luZyxcbiAgICAgICAgc2VsZi5fc3RlcCxcbiAgICAgICAgc2VsZi5fc2NoZWR1bGVGdW5jdGlvblxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgLy8gQWxpYXNlcyB1c2VkIGJlbG93XG4gICAgdmFyIGN1cnJlbnRTdGF0ZSA9IHRoaXMuX2N1cnJlbnRTdGF0ZTtcbiAgICB2YXIgdGFyZ2V0U3RhdGUgPSB0aGlzLl90YXJnZXRTdGF0ZTtcblxuICAgIC8vIEVuc3VyZSB0aGF0IHRoZXJlIGlzIGFsd2F5cyBzb21ldGhpbmcgdG8gdHdlZW4gdG8uXG4gICAgZGVmYXVsdHModGFyZ2V0U3RhdGUsIGN1cnJlbnRTdGF0ZSk7XG5cbiAgICB0aGlzLl9lYXNpbmcgPSBjb21wb3NlRWFzaW5nT2JqZWN0KFxuICAgICAgY3VycmVudFN0YXRlLCBjb25maWcuZWFzaW5nIHx8IERFRkFVTFRfRUFTSU5HKTtcblxuICAgIHRoaXMuX2ZpbHRlckFyZ3MgPVxuICAgICAgW2N1cnJlbnRTdGF0ZSwgdGhpcy5fb3JpZ2luYWxTdGF0ZSwgdGFyZ2V0U3RhdGUsIHRoaXMuX2Vhc2luZ107XG5cbiAgICBhcHBseUZpbHRlcih0aGlzLCAndHdlZW5DcmVhdGVkJyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2QgZ2V0XG4gICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGN1cnJlbnQgc3RhdGUuXG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gc2hhbGxvd0NvcHkoe30sIHRoaXMuX2N1cnJlbnRTdGF0ZSk7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBtZXRob2Qgc2V0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZSBUaGUgY3VycmVudCBzdGF0ZS5cbiAgICovXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuc2V0ID0gZnVuY3Rpb24gKHN0YXRlKSB7XG4gICAgdGhpcy5fY3VycmVudFN0YXRlID0gc3RhdGU7XG4gIH07XG5cbiAgLyoqXG4gICAqIFBhdXNlIGEgdHdlZW4uICBQYXVzZWQgdHdlZW5zIGNhbiBiZSByZXN1bWVkIGZyb20gdGhlIHBvaW50IGF0IHdoaWNoIHRoZXlcbiAgICogd2VyZSBwYXVzZWQuICBUaGlzIGlzIGRpZmZlcmVudCBmcm9tIGB7eyNjcm9zc0xpbmtcbiAgICogXCJUd2VlbmFibGUvc3RvcDptZXRob2RcIn19e3svY3Jvc3NMaW5rfX1gLCBhcyB0aGF0IG1ldGhvZFxuICAgKiBjYXVzZXMgYSB0d2VlbiB0byBzdGFydCBvdmVyIHdoZW4gaXQgaXMgcmVzdW1lZC5cbiAgICogQG1ldGhvZCBwYXVzZVxuICAgKiBAY2hhaW5hYmxlXG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLnBhdXNlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuX3BhdXNlZEF0VGltZSA9IG5vdygpO1xuICAgIHRoaXMuX2lzUGF1c2VkID0gdHJ1ZTtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICAvKipcbiAgICogUmVzdW1lIGEgcGF1c2VkIHR3ZWVuLlxuICAgKiBAbWV0aG9kIHJlc3VtZVxuICAgKiBAY2hhaW5hYmxlXG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLnJlc3VtZSA9IGZ1bmN0aW9uICgpIHtcbiAgICBpZiAodGhpcy5faXNQYXVzZWQpIHtcbiAgICAgIHRoaXMuX3RpbWVzdGFtcCArPSBub3coKSAtIHRoaXMuX3BhdXNlZEF0VGltZTtcbiAgICB9XG5cbiAgICB0aGlzLl9pc1BhdXNlZCA9IGZhbHNlO1xuICAgIHRoaXMuX2lzVHdlZW5pbmcgPSB0cnVlO1xuXG4gICAgdGhpcy5fdGltZW91dEhhbmRsZXIoKTtcblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBNb3ZlIHRoZSBzdGF0ZSBvZiB0aGUgYW5pbWF0aW9uIHRvIGEgc3BlY2lmaWMgcG9pbnQgaW4gdGhlIHR3ZWVuJ3NcbiAgICogdGltZWxpbmUuICBJZiB0aGUgYW5pbWF0aW9uIGlzIG5vdCBydW5uaW5nLCB0aGlzIHdpbGwgY2F1c2UgdGhlIGBzdGVwYFxuICAgKiBoYW5kbGVycyB0byBiZSBjYWxsZWQuXG4gICAqIEBtZXRob2Qgc2Vla1xuICAgKiBAcGFyYW0ge21pbGxpc2Vjb25kfSBtaWxsaXNlY29uZCBUaGUgbWlsbGlzZWNvbmQgb2YgdGhlIGFuaW1hdGlvbiB0byBzZWVrXG4gICAqIHRvLiAgVGhpcyBtdXN0IG5vdCBiZSBsZXNzIHRoYW4gYDBgLlxuICAgKiBAY2hhaW5hYmxlXG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLnNlZWsgPSBmdW5jdGlvbiAobWlsbGlzZWNvbmQpIHtcbiAgICBtaWxsaXNlY29uZCA9IE1hdGgubWF4KG1pbGxpc2Vjb25kLCAwKTtcbiAgICB2YXIgY3VycmVudFRpbWUgPSBub3coKTtcblxuICAgIGlmICgodGhpcy5fdGltZXN0YW1wICsgbWlsbGlzZWNvbmQpID09PSAwKSB7XG4gICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0aGlzLl90aW1lc3RhbXAgPSBjdXJyZW50VGltZSAtIG1pbGxpc2Vjb25kO1xuXG4gICAgaWYgKCF0aGlzLmlzUGxheWluZygpKSB7XG4gICAgICB0aGlzLl9pc1R3ZWVuaW5nID0gdHJ1ZTtcbiAgICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG5cbiAgICAgIC8vIElmIHRoZSBhbmltYXRpb24gaXMgbm90IHJ1bm5pbmcsIGNhbGwgdGltZW91dEhhbmRsZXIgdG8gbWFrZSBzdXJlIHRoYXRcbiAgICAgIC8vIGFueSBzdGVwIGhhbmRsZXJzIGFyZSBydW4uXG4gICAgICB0aW1lb3V0SGFuZGxlcih0aGlzLFxuICAgICAgICB0aGlzLl90aW1lc3RhbXAsXG4gICAgICAgIHRoaXMuX2RlbGF5LFxuICAgICAgICB0aGlzLl9kdXJhdGlvbixcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLFxuICAgICAgICB0aGlzLl9vcmlnaW5hbFN0YXRlLFxuICAgICAgICB0aGlzLl90YXJnZXRTdGF0ZSxcbiAgICAgICAgdGhpcy5fZWFzaW5nLFxuICAgICAgICB0aGlzLl9zdGVwLFxuICAgICAgICB0aGlzLl9zY2hlZHVsZUZ1bmN0aW9uLFxuICAgICAgICBjdXJyZW50VGltZVxuICAgICAgKTtcblxuICAgICAgdGhpcy5wYXVzZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBTdG9wcyBhbmQgY2FuY2VscyBhIHR3ZWVuLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW49fSBnb3RvRW5kIElmIGBmYWxzZWAgb3Igb21pdHRlZCwgdGhlIHR3ZWVuIGp1c3Qgc3RvcHMgYXRcbiAgICogaXRzIGN1cnJlbnQgc3RhdGUsIGFuZCB0aGUgYGZpbmlzaGAgaGFuZGxlciBpcyBub3QgaW52b2tlZC4gIElmIGB0cnVlYCxcbiAgICogdGhlIHR3ZWVuZWQgb2JqZWN0J3MgdmFsdWVzIGFyZSBpbnN0YW50bHkgc2V0IHRvIHRoZSB0YXJnZXQgdmFsdWVzLCBhbmRcbiAgICogYGZpbmlzaGAgaXMgaW52b2tlZC5cbiAgICogQG1ldGhvZCBzdG9wXG4gICAqIEBjaGFpbmFibGVcbiAgICovXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIChnb3RvRW5kKSB7XG4gICAgdGhpcy5faXNUd2VlbmluZyA9IGZhbHNlO1xuICAgIHRoaXMuX2lzUGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5fdGltZW91dEhhbmRsZXIgPSBub29wO1xuXG4gICAgKHJvb3QuY2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgICAgICAgICB8fFxuICAgIHJvb3Qud2Via2l0Q2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgIHx8XG4gICAgcm9vdC5vQ2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgICAgICAgfHxcbiAgICByb290Lm1zQ2FuY2VsQW5pbWF0aW9uRnJhbWUgICAgICAgICB8fFxuICAgIHJvb3QubW96Q2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8XG4gICAgcm9vdC5jbGVhclRpbWVvdXQpKHRoaXMuX3NjaGVkdWxlSWQpO1xuXG4gICAgaWYgKGdvdG9FbmQpIHtcbiAgICAgIGFwcGx5RmlsdGVyKHRoaXMsICdiZWZvcmVUd2VlbicpO1xuICAgICAgdHdlZW5Qcm9wcyhcbiAgICAgICAgMSxcbiAgICAgICAgdGhpcy5fY3VycmVudFN0YXRlLFxuICAgICAgICB0aGlzLl9vcmlnaW5hbFN0YXRlLFxuICAgICAgICB0aGlzLl90YXJnZXRTdGF0ZSxcbiAgICAgICAgMSxcbiAgICAgICAgMCxcbiAgICAgICAgdGhpcy5fZWFzaW5nXG4gICAgICApO1xuICAgICAgYXBwbHlGaWx0ZXIodGhpcywgJ2FmdGVyVHdlZW4nKTtcbiAgICAgIGFwcGx5RmlsdGVyKHRoaXMsICdhZnRlclR3ZWVuRW5kJyk7XG4gICAgICB0aGlzLl9maW5pc2guY2FsbCh0aGlzLCB0aGlzLl9jdXJyZW50U3RhdGUsIHRoaXMuX2F0dGFjaG1lbnQpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIC8qKlxuICAgKiBAbWV0aG9kIGlzUGxheWluZ1xuICAgKiBAcmV0dXJuIHtib29sZWFufSBXaGV0aGVyIG9yIG5vdCBhIHR3ZWVuIGlzIHJ1bm5pbmcuXG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLmlzUGxheWluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5faXNUd2VlbmluZyAmJiAhdGhpcy5faXNQYXVzZWQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNldCBhIGN1c3RvbSBzY2hlZHVsZSBmdW5jdGlvbi5cbiAgICpcbiAgICogSWYgYSBjdXN0b20gZnVuY3Rpb24gaXMgbm90IHNldCxcbiAgICogW2ByZXF1ZXN0QW5pbWF0aW9uRnJhbWVgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSlcbiAgICogaXMgdXNlZCBpZiBhdmFpbGFibGUsIG90aGVyd2lzZVxuICAgKiBbYHNldFRpbWVvdXRgXShodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvV2luZG93LnNldFRpbWVvdXQpXG4gICAqIGlzIHVzZWQuXG4gICAqIEBtZXRob2Qgc2V0U2NoZWR1bGVGdW5jdGlvblxuICAgKiBAcGFyYW0ge0Z1bmN0aW9uKEZ1bmN0aW9uLG51bWJlcil9IHNjaGVkdWxlRnVuY3Rpb24gVGhlIGZ1bmN0aW9uIHRvIGJlXG4gICAqIHVzZWQgdG8gc2NoZWR1bGUgdGhlIG5leHQgZnJhbWUgdG8gYmUgcmVuZGVyZWQuXG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLnNldFNjaGVkdWxlRnVuY3Rpb24gPSBmdW5jdGlvbiAoc2NoZWR1bGVGdW5jdGlvbikge1xuICAgIHRoaXMuX3NjaGVkdWxlRnVuY3Rpb24gPSBzY2hlZHVsZUZ1bmN0aW9uO1xuICB9O1xuXG4gIC8qKlxuICAgKiBgZGVsZXRlYCBhbGwgXCJvd25cIiBwcm9wZXJ0aWVzLiAgQ2FsbCB0aGlzIHdoZW4gdGhlIGBUd2VlbmFibGVgIGluc3RhbmNlXG4gICAqIGlzIG5vIGxvbmdlciBuZWVkZWQgdG8gZnJlZSBtZW1vcnkuXG4gICAqIEBtZXRob2QgZGlzcG9zZVxuICAgKi9cbiAgVHdlZW5hYmxlLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBwcm9wO1xuICAgIGZvciAocHJvcCBpbiB0aGlzKSB7XG4gICAgICBpZiAodGhpcy5oYXNPd25Qcm9wZXJ0eShwcm9wKSkge1xuICAgICAgICBkZWxldGUgdGhpc1twcm9wXTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEZpbHRlcnMgYXJlIHVzZWQgZm9yIHRyYW5zZm9ybWluZyB0aGUgcHJvcGVydGllcyBvZiBhIHR3ZWVuIGF0IHZhcmlvdXNcbiAgICogcG9pbnRzIGluIGEgVHdlZW5hYmxlJ3MgbGlmZSBjeWNsZS4gIFNlZSB0aGUgUkVBRE1FIGZvciBtb3JlIGluZm8gb24gdGhpcy5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIFR3ZWVuYWJsZS5wcm90b3R5cGUuZmlsdGVyID0ge307XG5cbiAgLyoqXG4gICAqIFRoaXMgb2JqZWN0IGNvbnRhaW5zIGFsbCBvZiB0aGUgdHdlZW5zIGF2YWlsYWJsZSB0byBTaGlmdHkuICBJdCBpc1xuICAgKiBleHRlbnNpYmxlIC0gc2ltcGx5IGF0dGFjaCBwcm9wZXJ0aWVzIHRvIHRoZSBgVHdlZW5hYmxlLnByb3RvdHlwZS5mb3JtdWxhYFxuICAgKiBPYmplY3QgZm9sbG93aW5nIHRoZSBzYW1lIGZvcm1hdCBhcyBgbGluZWFyYC5cbiAgICpcbiAgICogYHBvc2Agc2hvdWxkIGJlIGEgbm9ybWFsaXplZCBgbnVtYmVyYCAoYmV0d2VlbiAwIGFuZCAxKS5cbiAgICogQHByb3BlcnR5IGZvcm11bGFcbiAgICogQHR5cGUge09iamVjdChmdW5jdGlvbil9XG4gICAqL1xuICBUd2VlbmFibGUucHJvdG90eXBlLmZvcm11bGEgPSB7XG4gICAgbGluZWFyOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gcG9zO1xuICAgIH1cbiAgfTtcblxuICBmb3JtdWxhID0gVHdlZW5hYmxlLnByb3RvdHlwZS5mb3JtdWxhO1xuXG4gIHNoYWxsb3dDb3B5KFR3ZWVuYWJsZSwge1xuICAgICdub3cnOiBub3dcbiAgICAsJ2VhY2gnOiBlYWNoXG4gICAgLCd0d2VlblByb3BzJzogdHdlZW5Qcm9wc1xuICAgICwndHdlZW5Qcm9wJzogdHdlZW5Qcm9wXG4gICAgLCdhcHBseUZpbHRlcic6IGFwcGx5RmlsdGVyXG4gICAgLCdzaGFsbG93Q29weSc6IHNoYWxsb3dDb3B5XG4gICAgLCdkZWZhdWx0cyc6IGRlZmF1bHRzXG4gICAgLCdjb21wb3NlRWFzaW5nT2JqZWN0JzogY29tcG9zZUVhc2luZ09iamVjdFxuICB9KTtcblxuICAvLyBgcm9vdGAgaXMgcHJvdmlkZWQgaW4gdGhlIGludHJvL291dHJvIGZpbGVzLlxuXG4gIC8vIEEgaG9vayB1c2VkIGZvciB1bml0IHRlc3RpbmcuXG4gIGlmICh0eXBlb2YgU0hJRlRZX0RFQlVHX05PVyA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJvb3QudGltZW91dEhhbmRsZXIgPSB0aW1lb3V0SGFuZGxlcjtcbiAgfVxuXG4gIC8vIEJvb3RzdHJhcCBUd2VlbmFibGUgYXBwcm9wcmlhdGVseSBmb3IgdGhlIGVudmlyb25tZW50LlxuICBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgLy8gQ29tbW9uSlNcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFR3ZWVuYWJsZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAvLyBBTURcbiAgICBkZWZpbmUoZnVuY3Rpb24gKCkge3JldHVybiBUd2VlbmFibGU7fSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIHJvb3QuVHdlZW5hYmxlID09PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEJyb3dzZXI6IE1ha2UgYFR3ZWVuYWJsZWAgZ2xvYmFsbHkgYWNjZXNzaWJsZS5cbiAgICByb290LlR3ZWVuYWJsZSA9IFR3ZWVuYWJsZTtcbiAgfVxuXG4gIHJldHVybiBUd2VlbmFibGU7XG5cbn0gKCkpO1xuXG4vKiFcbiAqIEFsbCBlcXVhdGlvbnMgYXJlIGFkYXB0ZWQgZnJvbSBUaG9tYXMgRnVjaHMnXG4gKiBbU2NyaXB0eTJdKGh0dHBzOi8vZ2l0aHViLmNvbS9tYWRyb2JieS9zY3JpcHR5Mi9ibG9iL21hc3Rlci9zcmMvZWZmZWN0cy90cmFuc2l0aW9ucy9wZW5uZXIuanMpLlxuICpcbiAqIEJhc2VkIG9uIEVhc2luZyBFcXVhdGlvbnMgKGMpIDIwMDMgW1JvYmVydFxuICogUGVubmVyXShodHRwOi8vd3d3LnJvYmVydHBlbm5lci5jb20vKSwgYWxsIHJpZ2h0cyByZXNlcnZlZC4gVGhpcyB3b3JrIGlzXG4gKiBbc3ViamVjdCB0byB0ZXJtc10oaHR0cDovL3d3dy5yb2JlcnRwZW5uZXIuY29tL2Vhc2luZ190ZXJtc19vZl91c2UuaHRtbCkuXG4gKi9cblxuLyohXG4gKiAgVEVSTVMgT0YgVVNFIC0gRUFTSU5HIEVRVUFUSU9OU1xuICogIE9wZW4gc291cmNlIHVuZGVyIHRoZSBCU0QgTGljZW5zZS5cbiAqICBFYXNpbmcgRXF1YXRpb25zIChjKSAyMDAzIFJvYmVydCBQZW5uZXIsIGFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKi9cblxuOyhmdW5jdGlvbiAoKSB7XG5cbiAgVHdlZW5hYmxlLnNoYWxsb3dDb3B5KFR3ZWVuYWJsZS5wcm90b3R5cGUuZm9ybXVsYSwge1xuICAgIGVhc2VJblF1YWQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHJldHVybiBNYXRoLnBvdyhwb3MsIDIpO1xuICAgIH0sXG5cbiAgICBlYXNlT3V0UXVhZDogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIC0oTWF0aC5wb3coKHBvcyAtIDEpLCAyKSAtIDEpO1xuICAgIH0sXG5cbiAgICBlYXNlSW5PdXRRdWFkOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAwLjUgKiBNYXRoLnBvdyhwb3MsMik7fVxuICAgICAgcmV0dXJuIC0wLjUgKiAoKHBvcyAtPSAyKSAqIHBvcyAtIDIpO1xuICAgIH0sXG5cbiAgICBlYXNlSW5DdWJpYzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIE1hdGgucG93KHBvcywgMyk7XG4gICAgfSxcblxuICAgIGVhc2VPdXRDdWJpYzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIChNYXRoLnBvdygocG9zIC0gMSksIDMpICsgMSk7XG4gICAgfSxcblxuICAgIGVhc2VJbk91dEN1YmljOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAwLjUgKiBNYXRoLnBvdyhwb3MsMyk7fVxuICAgICAgcmV0dXJuIDAuNSAqIChNYXRoLnBvdygocG9zIC0gMiksMykgKyAyKTtcbiAgICB9LFxuXG4gICAgZWFzZUluUXVhcnQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHJldHVybiBNYXRoLnBvdyhwb3MsIDQpO1xuICAgIH0sXG5cbiAgICBlYXNlT3V0UXVhcnQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHJldHVybiAtKE1hdGgucG93KChwb3MgLSAxKSwgNCkgLSAxKTtcbiAgICB9LFxuXG4gICAgZWFzZUluT3V0UXVhcnQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIGlmICgocG9zIC89IDAuNSkgPCAxKSB7cmV0dXJuIDAuNSAqIE1hdGgucG93KHBvcyw0KTt9XG4gICAgICByZXR1cm4gLTAuNSAqICgocG9zIC09IDIpICogTWF0aC5wb3cocG9zLDMpIC0gMik7XG4gICAgfSxcblxuICAgIGVhc2VJblF1aW50OiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gTWF0aC5wb3cocG9zLCA1KTtcbiAgICB9LFxuXG4gICAgZWFzZU91dFF1aW50OiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gKE1hdGgucG93KChwb3MgLSAxKSwgNSkgKyAxKTtcbiAgICB9LFxuXG4gICAgZWFzZUluT3V0UXVpbnQ6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIGlmICgocG9zIC89IDAuNSkgPCAxKSB7cmV0dXJuIDAuNSAqIE1hdGgucG93KHBvcyw1KTt9XG4gICAgICByZXR1cm4gMC41ICogKE1hdGgucG93KChwb3MgLSAyKSw1KSArIDIpO1xuICAgIH0sXG5cbiAgICBlYXNlSW5TaW5lOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gLU1hdGguY29zKHBvcyAqIChNYXRoLlBJIC8gMikpICsgMTtcbiAgICB9LFxuXG4gICAgZWFzZU91dFNpbmU6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHJldHVybiBNYXRoLnNpbihwb3MgKiAoTWF0aC5QSSAvIDIpKTtcbiAgICB9LFxuXG4gICAgZWFzZUluT3V0U2luZTogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuICgtMC41ICogKE1hdGguY29zKE1hdGguUEkgKiBwb3MpIC0gMSkpO1xuICAgIH0sXG5cbiAgICBlYXNlSW5FeHBvOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gKHBvcyA9PT0gMCkgPyAwIDogTWF0aC5wb3coMiwgMTAgKiAocG9zIC0gMSkpO1xuICAgIH0sXG5cbiAgICBlYXNlT3V0RXhwbzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIChwb3MgPT09IDEpID8gMSA6IC1NYXRoLnBvdygyLCAtMTAgKiBwb3MpICsgMTtcbiAgICB9LFxuXG4gICAgZWFzZUluT3V0RXhwbzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgaWYgKHBvcyA9PT0gMCkge3JldHVybiAwO31cbiAgICAgIGlmIChwb3MgPT09IDEpIHtyZXR1cm4gMTt9XG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAwLjUgKiBNYXRoLnBvdygyLDEwICogKHBvcyAtIDEpKTt9XG4gICAgICByZXR1cm4gMC41ICogKC1NYXRoLnBvdygyLCAtMTAgKiAtLXBvcykgKyAyKTtcbiAgICB9LFxuXG4gICAgZWFzZUluQ2lyYzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIC0oTWF0aC5zcXJ0KDEgLSAocG9zICogcG9zKSkgLSAxKTtcbiAgICB9LFxuXG4gICAgZWFzZU91dENpcmM6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHJldHVybiBNYXRoLnNxcnQoMSAtIE1hdGgucG93KChwb3MgLSAxKSwgMikpO1xuICAgIH0sXG5cbiAgICBlYXNlSW5PdXRDaXJjOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAtMC41ICogKE1hdGguc3FydCgxIC0gcG9zICogcG9zKSAtIDEpO31cbiAgICAgIHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAocG9zIC09IDIpICogcG9zKSArIDEpO1xuICAgIH0sXG5cbiAgICBlYXNlT3V0Qm91bmNlOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAoKHBvcykgPCAoMSAvIDIuNzUpKSB7XG4gICAgICAgIHJldHVybiAoNy41NjI1ICogcG9zICogcG9zKTtcbiAgICAgIH0gZWxzZSBpZiAocG9zIDwgKDIgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gKDcuNTYyNSAqIChwb3MgLT0gKDEuNSAvIDIuNzUpKSAqIHBvcyArIDAuNzUpO1xuICAgICAgfSBlbHNlIGlmIChwb3MgPCAoMi41IC8gMi43NSkpIHtcbiAgICAgICAgcmV0dXJuICg3LjU2MjUgKiAocG9zIC09ICgyLjI1IC8gMi43NSkpICogcG9zICsgMC45Mzc1KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAoNy41NjI1ICogKHBvcyAtPSAoMi42MjUgLyAyLjc1KSkgKiBwb3MgKyAwLjk4NDM3NSk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIGVhc2VJbkJhY2s6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgIHJldHVybiAocG9zKSAqIHBvcyAqICgocyArIDEpICogcG9zIC0gcyk7XG4gICAgfSxcblxuICAgIGVhc2VPdXRCYWNrOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICByZXR1cm4gKHBvcyA9IHBvcyAtIDEpICogcG9zICogKChzICsgMSkgKiBwb3MgKyBzKSArIDE7XG4gICAgfSxcblxuICAgIGVhc2VJbk91dEJhY2s6IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgIGlmICgocG9zIC89IDAuNSkgPCAxKSB7XG4gICAgICAgIHJldHVybiAwLjUgKiAocG9zICogcG9zICogKCgocyAqPSAoMS41MjUpKSArIDEpICogcG9zIC0gcykpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIDAuNSAqICgocG9zIC09IDIpICogcG9zICogKCgocyAqPSAoMS41MjUpKSArIDEpICogcG9zICsgcykgKyAyKTtcbiAgICB9LFxuXG4gICAgZWxhc3RpYzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgLy8ganNoaW50IG1heGxlbjo5MFxuICAgICAgcmV0dXJuIC0xICogTWF0aC5wb3coNCwtOCAqIHBvcykgKiBNYXRoLnNpbigocG9zICogNiAtIDEpICogKDIgKiBNYXRoLlBJKSAvIDIpICsgMTtcbiAgICB9LFxuXG4gICAgc3dpbmdGcm9tVG86IGZ1bmN0aW9uIChwb3MpIHtcbiAgICAgIHZhciBzID0gMS43MDE1ODtcbiAgICAgIHJldHVybiAoKHBvcyAvPSAwLjUpIDwgMSkgP1xuICAgICAgICAgIDAuNSAqIChwb3MgKiBwb3MgKiAoKChzICo9ICgxLjUyNSkpICsgMSkgKiBwb3MgLSBzKSkgOlxuICAgICAgICAgIDAuNSAqICgocG9zIC09IDIpICogcG9zICogKCgocyAqPSAoMS41MjUpKSArIDEpICogcG9zICsgcykgKyAyKTtcbiAgICB9LFxuXG4gICAgc3dpbmdGcm9tOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICB2YXIgcyA9IDEuNzAxNTg7XG4gICAgICByZXR1cm4gcG9zICogcG9zICogKChzICsgMSkgKiBwb3MgLSBzKTtcbiAgICB9LFxuXG4gICAgc3dpbmdUbzogZnVuY3Rpb24gKHBvcykge1xuICAgICAgdmFyIHMgPSAxLjcwMTU4O1xuICAgICAgcmV0dXJuIChwb3MgLT0gMSkgKiBwb3MgKiAoKHMgKyAxKSAqIHBvcyArIHMpICsgMTtcbiAgICB9LFxuXG4gICAgYm91bmNlOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAocG9zIDwgKDEgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gKDcuNTYyNSAqIHBvcyAqIHBvcyk7XG4gICAgICB9IGVsc2UgaWYgKHBvcyA8ICgyIC8gMi43NSkpIHtcbiAgICAgICAgcmV0dXJuICg3LjU2MjUgKiAocG9zIC09ICgxLjUgLyAyLjc1KSkgKiBwb3MgKyAwLjc1KTtcbiAgICAgIH0gZWxzZSBpZiAocG9zIDwgKDIuNSAvIDIuNzUpKSB7XG4gICAgICAgIHJldHVybiAoNy41NjI1ICogKHBvcyAtPSAoMi4yNSAvIDIuNzUpKSAqIHBvcyArIDAuOTM3NSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKDcuNTYyNSAqIChwb3MgLT0gKDIuNjI1IC8gMi43NSkpICogcG9zICsgMC45ODQzNzUpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBib3VuY2VQYXN0OiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAocG9zIDwgKDEgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gKDcuNTYyNSAqIHBvcyAqIHBvcyk7XG4gICAgICB9IGVsc2UgaWYgKHBvcyA8ICgyIC8gMi43NSkpIHtcbiAgICAgICAgcmV0dXJuIDIgLSAoNy41NjI1ICogKHBvcyAtPSAoMS41IC8gMi43NSkpICogcG9zICsgMC43NSk7XG4gICAgICB9IGVsc2UgaWYgKHBvcyA8ICgyLjUgLyAyLjc1KSkge1xuICAgICAgICByZXR1cm4gMiAtICg3LjU2MjUgKiAocG9zIC09ICgyLjI1IC8gMi43NSkpICogcG9zICsgMC45Mzc1KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAyIC0gKDcuNTYyNSAqIChwb3MgLT0gKDIuNjI1IC8gMi43NSkpICogcG9zICsgMC45ODQzNzUpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICBlYXNlRnJvbVRvOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICBpZiAoKHBvcyAvPSAwLjUpIDwgMSkge3JldHVybiAwLjUgKiBNYXRoLnBvdyhwb3MsNCk7fVxuICAgICAgcmV0dXJuIC0wLjUgKiAoKHBvcyAtPSAyKSAqIE1hdGgucG93KHBvcywzKSAtIDIpO1xuICAgIH0sXG5cbiAgICBlYXNlRnJvbTogZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIE1hdGgucG93KHBvcyw0KTtcbiAgICB9LFxuXG4gICAgZWFzZVRvOiBmdW5jdGlvbiAocG9zKSB7XG4gICAgICByZXR1cm4gTWF0aC5wb3cocG9zLDAuMjUpO1xuICAgIH1cbiAgfSk7XG5cbn0oKSk7XG5cbi8vIGpzaGludCBtYXhsZW46MTAwXG4vKipcbiAqIFRoZSBCZXppZXIgbWFnaWMgaW4gdGhpcyBmaWxlIGlzIGFkYXB0ZWQvY29waWVkIGFsbW9zdCB3aG9sZXNhbGUgZnJvbVxuICogW1NjcmlwdHkyXShodHRwczovL2dpdGh1Yi5jb20vbWFkcm9iYnkvc2NyaXB0eTIvYmxvYi9tYXN0ZXIvc3JjL2VmZmVjdHMvdHJhbnNpdGlvbnMvY3ViaWMtYmV6aWVyLmpzKSxcbiAqIHdoaWNoIHdhcyBhZGFwdGVkIGZyb20gQXBwbGUgY29kZSAod2hpY2ggcHJvYmFibHkgY2FtZSBmcm9tXG4gKiBbaGVyZV0oaHR0cDovL29wZW5zb3VyY2UuYXBwbGUuY29tL3NvdXJjZS9XZWJDb3JlL1dlYkNvcmUtOTU1LjY2L3BsYXRmb3JtL2dyYXBoaWNzL1VuaXRCZXppZXIuaCkpLlxuICogU3BlY2lhbCB0aGFua3MgdG8gQXBwbGUgYW5kIFRob21hcyBGdWNocyBmb3IgbXVjaCBvZiB0aGlzIGNvZGUuXG4gKi9cblxuLyoqXG4gKiAgQ29weXJpZ2h0IChjKSAyMDA2IEFwcGxlIENvbXB1dGVyLCBJbmMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICogIG1vZGlmaWNhdGlvbiwgYXJlIHBlcm1pdHRlZCBwcm92aWRlZCB0aGF0IHRoZSBmb2xsb3dpbmcgY29uZGl0aW9ucyBhcmUgbWV0OlxuICpcbiAqICAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsXG4gKiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lci5cbiAqXG4gKiAgMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICogIHRoaXMgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIgaW4gdGhlIGRvY3VtZW50YXRpb25cbiAqICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cbiAqXG4gKiAgMy4gTmVpdGhlciB0aGUgbmFtZSBvZiB0aGUgY29weXJpZ2h0IGhvbGRlcihzKSBub3IgdGhlIG5hbWVzIG9mIGFueVxuICogIGNvbnRyaWJ1dG9ycyBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tXG4gKiAgdGhpcyBzb2Z0d2FyZSB3aXRob3V0IHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cbiAqXG4gKiAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCJcbiAqICBBTkQgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFXG4gKiAgSU1QTElFRCBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSBBTkQgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0VcbiAqICBBUkUgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBPV05FUiBPUiBDT05UUklCVVRPUlMgQkVcbiAqICBMSUFCTEUgRk9SIEFOWSBESVJFQ1QsIElORElSRUNULCBJTkNJREVOVEFMLCBTUEVDSUFMLCBFWEVNUExBUlksIE9SXG4gKiAgQ09OU0VRVUVOVElBTCBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0ZcbiAqICBTVUJTVElUVVRFIEdPT0RTIE9SIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1NcbiAqICBJTlRFUlJVUFRJT04pIEhPV0VWRVIgQ0FVU0VEIEFORCBPTiBBTlkgVEhFT1JZIE9GIExJQUJJTElUWSwgV0hFVEhFUiBJTlxuICogIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLCBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpXG4gKiAgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEVcbiAqICBQT1NTSUJJTElUWSBPRiBTVUNIIERBTUFHRS5cbiAqL1xuOyhmdW5jdGlvbiAoKSB7XG4gIC8vIHBvcnQgb2Ygd2Via2l0IGN1YmljIGJlemllciBoYW5kbGluZyBieSBodHRwOi8vd3d3Lm5ldHpnZXN0YS5kZS9kZXYvXG4gIGZ1bmN0aW9uIGN1YmljQmV6aWVyQXRUaW1lKHQscDF4LHAxeSxwMngscDJ5LGR1cmF0aW9uKSB7XG4gICAgdmFyIGF4ID0gMCxieCA9IDAsY3ggPSAwLGF5ID0gMCxieSA9IDAsY3kgPSAwO1xuICAgIGZ1bmN0aW9uIHNhbXBsZUN1cnZlWCh0KSB7XG4gICAgICByZXR1cm4gKChheCAqIHQgKyBieCkgKiB0ICsgY3gpICogdDtcbiAgICB9XG4gICAgZnVuY3Rpb24gc2FtcGxlQ3VydmVZKHQpIHtcbiAgICAgIHJldHVybiAoKGF5ICogdCArIGJ5KSAqIHQgKyBjeSkgKiB0O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzYW1wbGVDdXJ2ZURlcml2YXRpdmVYKHQpIHtcbiAgICAgIHJldHVybiAoMy4wICogYXggKiB0ICsgMi4wICogYngpICogdCArIGN4O1xuICAgIH1cbiAgICBmdW5jdGlvbiBzb2x2ZUVwc2lsb24oZHVyYXRpb24pIHtcbiAgICAgIHJldHVybiAxLjAgLyAoMjAwLjAgKiBkdXJhdGlvbik7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHNvbHZlKHgsZXBzaWxvbikge1xuICAgICAgcmV0dXJuIHNhbXBsZUN1cnZlWShzb2x2ZUN1cnZlWCh4LCBlcHNpbG9uKSk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGZhYnMobikge1xuICAgICAgaWYgKG4gPj0gMCkge1xuICAgICAgICByZXR1cm4gbjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAwIC0gbjtcbiAgICAgIH1cbiAgICB9XG4gICAgZnVuY3Rpb24gc29sdmVDdXJ2ZVgoeCwgZXBzaWxvbikge1xuICAgICAgdmFyIHQwLHQxLHQyLHgyLGQyLGk7XG4gICAgICBmb3IgKHQyID0geCwgaSA9IDA7IGkgPCA4OyBpKyspIHtcbiAgICAgICAgeDIgPSBzYW1wbGVDdXJ2ZVgodDIpIC0geDtcbiAgICAgICAgaWYgKGZhYnMoeDIpIDwgZXBzaWxvbikge1xuICAgICAgICAgIHJldHVybiB0MjtcbiAgICAgICAgfVxuICAgICAgICBkMiA9IHNhbXBsZUN1cnZlRGVyaXZhdGl2ZVgodDIpO1xuICAgICAgICBpZiAoZmFicyhkMikgPCAxZS02KSB7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgdDIgPSB0MiAtIHgyIC8gZDI7XG4gICAgICB9XG4gICAgICB0MCA9IDAuMDtcbiAgICAgIHQxID0gMS4wO1xuICAgICAgdDIgPSB4O1xuICAgICAgaWYgKHQyIDwgdDApIHtcbiAgICAgICAgcmV0dXJuIHQwO1xuICAgICAgfVxuICAgICAgaWYgKHQyID4gdDEpIHtcbiAgICAgICAgcmV0dXJuIHQxO1xuICAgICAgfVxuICAgICAgd2hpbGUgKHQwIDwgdDEpIHtcbiAgICAgICAgeDIgPSBzYW1wbGVDdXJ2ZVgodDIpO1xuICAgICAgICBpZiAoZmFicyh4MiAtIHgpIDwgZXBzaWxvbikge1xuICAgICAgICAgIHJldHVybiB0MjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoeCA+IHgyKSB7XG4gICAgICAgICAgdDAgPSB0MjtcbiAgICAgICAgfWVsc2Uge1xuICAgICAgICAgIHQxID0gdDI7XG4gICAgICAgIH1cbiAgICAgICAgdDIgPSAodDEgLSB0MCkgKiAwLjUgKyB0MDtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0MjsgLy8gRmFpbHVyZS5cbiAgICB9XG4gICAgY3ggPSAzLjAgKiBwMXg7XG4gICAgYnggPSAzLjAgKiAocDJ4IC0gcDF4KSAtIGN4O1xuICAgIGF4ID0gMS4wIC0gY3ggLSBieDtcbiAgICBjeSA9IDMuMCAqIHAxeTtcbiAgICBieSA9IDMuMCAqIChwMnkgLSBwMXkpIC0gY3k7XG4gICAgYXkgPSAxLjAgLSBjeSAtIGJ5O1xuICAgIHJldHVybiBzb2x2ZSh0LCBzb2x2ZUVwc2lsb24oZHVyYXRpb24pKTtcbiAgfVxuICAvKipcbiAgICogIGdldEN1YmljQmV6aWVyVHJhbnNpdGlvbih4MSwgeTEsIHgyLCB5MikgLT4gRnVuY3Rpb25cbiAgICpcbiAgICogIEdlbmVyYXRlcyBhIHRyYW5zaXRpb24gZWFzaW5nIGZ1bmN0aW9uIHRoYXQgaXMgY29tcGF0aWJsZVxuICAgKiAgd2l0aCBXZWJLaXQncyBDU1MgdHJhbnNpdGlvbnMgYC13ZWJraXQtdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25gXG4gICAqICBDU1MgcHJvcGVydHkuXG4gICAqXG4gICAqICBUaGUgVzNDIGhhcyBtb3JlIGluZm9ybWF0aW9uIGFib3V0IENTUzMgdHJhbnNpdGlvbiB0aW1pbmcgZnVuY3Rpb25zOlxuICAgKiAgaHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy10cmFuc2l0aW9ucy8jdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb25fdGFnXG4gICAqXG4gICAqICBAcGFyYW0ge251bWJlcn0geDFcbiAgICogIEBwYXJhbSB7bnVtYmVyfSB5MVxuICAgKiAgQHBhcmFtIHtudW1iZXJ9IHgyXG4gICAqICBAcGFyYW0ge251bWJlcn0geTJcbiAgICogIEByZXR1cm4ge2Z1bmN0aW9ufVxuICAgKiAgQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGdldEN1YmljQmV6aWVyVHJhbnNpdGlvbiAoeDEsIHkxLCB4MiwgeTIpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKHBvcykge1xuICAgICAgcmV0dXJuIGN1YmljQmV6aWVyQXRUaW1lKHBvcyx4MSx5MSx4Mix5MiwxKTtcbiAgICB9O1xuICB9XG4gIC8vIEVuZCBwb3J0ZWQgY29kZVxuXG4gIC8qKlxuICAgKiBDcmVhdGUgYSBCZXppZXIgZWFzaW5nIGZ1bmN0aW9uIGFuZCBhdHRhY2ggaXQgdG8gYHt7I2Nyb3NzTGlua1xuICAgKiBcIlR3ZWVuYWJsZS9mb3JtdWxhOnByb3BlcnR5XCJ9fVR3ZWVuYWJsZSNmb3JtdWxhe3svY3Jvc3NMaW5rfX1gLiAgVGhpc1xuICAgKiBmdW5jdGlvbiBnaXZlcyB5b3UgdG90YWwgY29udHJvbCBvdmVyIHRoZSBlYXNpbmcgY3VydmUuICBNYXR0aGV3IExlaW4nc1xuICAgKiBbQ2Vhc2VyXShodHRwOi8vbWF0dGhld2xlaW4uY29tL2NlYXNlci8pIGlzIGEgdXNlZnVsIHRvb2wgZm9yIHZpc3VhbGl6aW5nXG4gICAqIHRoZSBjdXJ2ZXMgeW91IGNhbiBtYWtlIHdpdGggdGhpcyBmdW5jdGlvbi5cbiAgICogQG1ldGhvZCBzZXRCZXppZXJGdW5jdGlvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBUaGUgbmFtZSBvZiB0aGUgZWFzaW5nIGN1cnZlLiAgT3ZlcndyaXRlcyB0aGUgb2xkXG4gICAqIGVhc2luZyBmdW5jdGlvbiBvbiBge3sjY3Jvc3NMaW5rXG4gICAqIFwiVHdlZW5hYmxlL2Zvcm11bGE6cHJvcGVydHlcIn19VHdlZW5hYmxlI2Zvcm11bGF7ey9jcm9zc0xpbmt9fWAgaWYgaXRcbiAgICogZXhpc3RzLlxuICAgKiBAcGFyYW0ge251bWJlcn0geDFcbiAgICogQHBhcmFtIHtudW1iZXJ9IHkxXG4gICAqIEBwYXJhbSB7bnVtYmVyfSB4MlxuICAgKiBAcGFyYW0ge251bWJlcn0geTJcbiAgICogQHJldHVybiB7ZnVuY3Rpb259IFRoZSBlYXNpbmcgZnVuY3Rpb24gdGhhdCB3YXMgYXR0YWNoZWQgdG9cbiAgICogVHdlZW5hYmxlLnByb3RvdHlwZS5mb3JtdWxhLlxuICAgKi9cbiAgVHdlZW5hYmxlLnNldEJlemllckZ1bmN0aW9uID0gZnVuY3Rpb24gKG5hbWUsIHgxLCB5MSwgeDIsIHkyKSB7XG4gICAgdmFyIGN1YmljQmV6aWVyVHJhbnNpdGlvbiA9IGdldEN1YmljQmV6aWVyVHJhbnNpdGlvbih4MSwgeTEsIHgyLCB5Mik7XG4gICAgY3ViaWNCZXppZXJUcmFuc2l0aW9uLmRpc3BsYXlOYW1lID0gbmFtZTtcbiAgICBjdWJpY0JlemllclRyYW5zaXRpb24ueDEgPSB4MTtcbiAgICBjdWJpY0JlemllclRyYW5zaXRpb24ueTEgPSB5MTtcbiAgICBjdWJpY0JlemllclRyYW5zaXRpb24ueDIgPSB4MjtcbiAgICBjdWJpY0JlemllclRyYW5zaXRpb24ueTIgPSB5MjtcblxuICAgIHJldHVybiBUd2VlbmFibGUucHJvdG90eXBlLmZvcm11bGFbbmFtZV0gPSBjdWJpY0JlemllclRyYW5zaXRpb247XG4gIH07XG5cblxuICAvKipcbiAgICogYGRlbGV0ZWAgYW4gZWFzaW5nIGZ1bmN0aW9uIGZyb20gYHt7I2Nyb3NzTGlua1xuICAgKiBcIlR3ZWVuYWJsZS9mb3JtdWxhOnByb3BlcnR5XCJ9fVR3ZWVuYWJsZSNmb3JtdWxhe3svY3Jvc3NMaW5rfX1gLiAgQmVcbiAgICogY2FyZWZ1bCB3aXRoIHRoaXMgbWV0aG9kLCBhcyBpdCBgZGVsZXRlYHMgd2hhdGV2ZXIgZWFzaW5nIGZvcm11bGEgbWF0Y2hlc1xuICAgKiBgbmFtZWAgKHdoaWNoIG1lYW5zIHlvdSBjYW4gZGVsZXRlIHN0YW5kYXJkIFNoaWZ0eSBlYXNpbmcgZnVuY3Rpb25zKS5cbiAgICogQG1ldGhvZCB1bnNldEJlemllckZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFRoZSBuYW1lIG9mIHRoZSBlYXNpbmcgZnVuY3Rpb24gdG8gZGVsZXRlLlxuICAgKiBAcmV0dXJuIHtmdW5jdGlvbn1cbiAgICovXG4gIFR3ZWVuYWJsZS51bnNldEJlemllckZ1bmN0aW9uID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICBkZWxldGUgVHdlZW5hYmxlLnByb3RvdHlwZS5mb3JtdWxhW25hbWVdO1xuICB9O1xuXG59KSgpO1xuXG47KGZ1bmN0aW9uICgpIHtcblxuICBmdW5jdGlvbiBnZXRJbnRlcnBvbGF0ZWRWYWx1ZXMgKFxuICAgIGZyb20sIGN1cnJlbnQsIHRhcmdldFN0YXRlLCBwb3NpdGlvbiwgZWFzaW5nLCBkZWxheSkge1xuICAgIHJldHVybiBUd2VlbmFibGUudHdlZW5Qcm9wcyhcbiAgICAgIHBvc2l0aW9uLCBjdXJyZW50LCBmcm9tLCB0YXJnZXRTdGF0ZSwgMSwgZGVsYXksIGVhc2luZyk7XG4gIH1cblxuICAvLyBGYWtlIGEgVHdlZW5hYmxlIGFuZCBwYXRjaCBzb21lIGludGVybmFscy4gIFRoaXMgYXBwcm9hY2ggYWxsb3dzIHVzIHRvXG4gIC8vIHNraXAgdW5lY2Nlc3NhcnkgcHJvY2Vzc2luZyBhbmQgb2JqZWN0IHJlY3JlYXRpb24sIGN1dHRpbmcgZG93biBvbiBnYXJiYWdlXG4gIC8vIGNvbGxlY3Rpb24gcGF1c2VzLlxuICB2YXIgbW9ja1R3ZWVuYWJsZSA9IG5ldyBUd2VlbmFibGUoKTtcbiAgbW9ja1R3ZWVuYWJsZS5fZmlsdGVyQXJncyA9IFtdO1xuXG4gIC8qKlxuICAgKiBDb21wdXRlIHRoZSBtaWRwb2ludCBvZiB0d28gT2JqZWN0cy4gIFRoaXMgbWV0aG9kIGVmZmVjdGl2ZWx5IGNhbGN1bGF0ZXMgYVxuICAgKiBzcGVjaWZpYyBmcmFtZSBvZiBhbmltYXRpb24gdGhhdCBge3sjY3Jvc3NMaW5rXG4gICAqIFwiVHdlZW5hYmxlL3R3ZWVuOm1ldGhvZFwifX17ey9jcm9zc0xpbmt9fWAgZG9lcyBtYW55IHRpbWVzIG92ZXIgdGhlIGNvdXJzZVxuICAgKiBvZiBhIGZ1bGwgdHdlZW4uXG4gICAqXG4gICAqICAgICB2YXIgaW50ZXJwb2xhdGVkVmFsdWVzID0gVHdlZW5hYmxlLmludGVycG9sYXRlKHtcbiAgICogICAgICAgd2lkdGg6ICcxMDBweCcsXG4gICAqICAgICAgIG9wYWNpdHk6IDAsXG4gICAqICAgICAgIGNvbG9yOiAnI2ZmZidcbiAgICogICAgIH0sIHtcbiAgICogICAgICAgd2lkdGg6ICcyMDBweCcsXG4gICAqICAgICAgIG9wYWNpdHk6IDEsXG4gICAqICAgICAgIGNvbG9yOiAnIzAwMCdcbiAgICogICAgIH0sIDAuNSk7XG4gICAqXG4gICAqICAgICBjb25zb2xlLmxvZyhpbnRlcnBvbGF0ZWRWYWx1ZXMpO1xuICAgKiAgICAgLy8ge29wYWNpdHk6IDAuNSwgd2lkdGg6IFwiMTUwcHhcIiwgY29sb3I6IFwicmdiKDEyNywxMjcsMTI3KVwifVxuICAgKlxuICAgKiBAc3RhdGljXG4gICAqIEBtZXRob2QgaW50ZXJwb2xhdGVcbiAgICogQHBhcmFtIHtPYmplY3R9IGZyb20gVGhlIHN0YXJ0aW5nIHZhbHVlcyB0byB0d2VlbiBmcm9tLlxuICAgKiBAcGFyYW0ge09iamVjdH0gdGFyZ2V0U3RhdGUgVGhlIGVuZGluZyB2YWx1ZXMgdG8gdHdlZW4gdG8uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBwb3NpdGlvbiBUaGUgbm9ybWFsaXplZCBwb3NpdGlvbiB2YWx1ZSAoYmV0d2VlbiBgMC4wYCBhbmRcbiAgICogYDEuMGApIHRvIGludGVycG9sYXRlIHRoZSB2YWx1ZXMgYmV0d2VlbiBgZnJvbWAgYW5kIGB0b2AgZm9yLiAgYGZyb21gXG4gICAqIHJlcHJlc2VudHMgYDBgIGFuZCBgdG9gIHJlcHJlc2VudHMgYDFgLlxuICAgKiBAcGFyYW0ge09iamVjdC48c3RyaW5nfEZ1bmN0aW9uPnxzdHJpbmd8RnVuY3Rpb259IGVhc2luZyBUaGUgZWFzaW5nXG4gICAqIGN1cnZlKHMpIHRvIGNhbGN1bGF0ZSB0aGUgbWlkcG9pbnQgYWdhaW5zdC4gIFlvdSBjYW4gcmVmZXJlbmNlIGFueSBlYXNpbmdcbiAgICogZnVuY3Rpb24gYXR0YWNoZWQgdG8gYFR3ZWVuYWJsZS5wcm90b3R5cGUuZm9ybXVsYWAsIG9yIHByb3ZpZGUgdGhlIGVhc2luZ1xuICAgKiBmdW5jdGlvbihzKSBkaXJlY3RseS4gIElmIG9taXR0ZWQsIHRoaXMgZGVmYXVsdHMgdG8gXCJsaW5lYXJcIi5cbiAgICogQHBhcmFtIHtudW1iZXI9fSBvcHRfZGVsYXkgT3B0aW9uYWwgZGVsYXkgdG8gcGFkIHRoZSBiZWdpbm5pbmcgb2YgdGhlXG4gICAqIGludGVycG9sYXRlZCB0d2VlbiB3aXRoLiAgVGhpcyBpbmNyZWFzZXMgdGhlIHJhbmdlIG9mIGBwb3NpdGlvbmAgZnJvbSAoYDBgXG4gICAqIHRocm91Z2ggYDFgKSB0byAoYDBgIHRocm91Z2ggYDEgKyBvcHRfZGVsYXlgKS4gIFNvLCBhIGRlbGF5IG9mIGAwLjVgIHdvdWxkXG4gICAqIGluY3JlYXNlIGFsbCB2YWxpZCB2YWx1ZXMgb2YgYHBvc2l0aW9uYCB0byBudW1iZXJzIGJldHdlZW4gYDBgIGFuZCBgMS41YC5cbiAgICogQHJldHVybiB7T2JqZWN0fVxuICAgKi9cbiAgVHdlZW5hYmxlLmludGVycG9sYXRlID0gZnVuY3Rpb24gKFxuICAgIGZyb20sIHRhcmdldFN0YXRlLCBwb3NpdGlvbiwgZWFzaW5nLCBvcHRfZGVsYXkpIHtcblxuICAgIHZhciBjdXJyZW50ID0gVHdlZW5hYmxlLnNoYWxsb3dDb3B5KHt9LCBmcm9tKTtcbiAgICB2YXIgZGVsYXkgPSBvcHRfZGVsYXkgfHwgMDtcbiAgICB2YXIgZWFzaW5nT2JqZWN0ID0gVHdlZW5hYmxlLmNvbXBvc2VFYXNpbmdPYmplY3QoXG4gICAgICBmcm9tLCBlYXNpbmcgfHwgJ2xpbmVhcicpO1xuXG4gICAgbW9ja1R3ZWVuYWJsZS5zZXQoe30pO1xuXG4gICAgLy8gQWxpYXMgYW5kIHJldXNlIHRoZSBfZmlsdGVyQXJncyBhcnJheSBpbnN0ZWFkIG9mIHJlY3JlYXRpbmcgaXQuXG4gICAgdmFyIGZpbHRlckFyZ3MgPSBtb2NrVHdlZW5hYmxlLl9maWx0ZXJBcmdzO1xuICAgIGZpbHRlckFyZ3MubGVuZ3RoID0gMDtcbiAgICBmaWx0ZXJBcmdzWzBdID0gY3VycmVudDtcbiAgICBmaWx0ZXJBcmdzWzFdID0gZnJvbTtcbiAgICBmaWx0ZXJBcmdzWzJdID0gdGFyZ2V0U3RhdGU7XG4gICAgZmlsdGVyQXJnc1szXSA9IGVhc2luZ09iamVjdDtcblxuICAgIC8vIEFueSBkZWZpbmVkIHZhbHVlIHRyYW5zZm9ybWF0aW9uIG11c3QgYmUgYXBwbGllZFxuICAgIFR3ZWVuYWJsZS5hcHBseUZpbHRlcihtb2NrVHdlZW5hYmxlLCAndHdlZW5DcmVhdGVkJyk7XG4gICAgVHdlZW5hYmxlLmFwcGx5RmlsdGVyKG1vY2tUd2VlbmFibGUsICdiZWZvcmVUd2VlbicpO1xuXG4gICAgdmFyIGludGVycG9sYXRlZFZhbHVlcyA9IGdldEludGVycG9sYXRlZFZhbHVlcyhcbiAgICAgIGZyb20sIGN1cnJlbnQsIHRhcmdldFN0YXRlLCBwb3NpdGlvbiwgZWFzaW5nT2JqZWN0LCBkZWxheSk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gdmFsdWVzIGJhY2sgaW50byB0aGVpciBvcmlnaW5hbCBmb3JtYXRcbiAgICBUd2VlbmFibGUuYXBwbHlGaWx0ZXIobW9ja1R3ZWVuYWJsZSwgJ2FmdGVyVHdlZW4nKTtcblxuICAgIHJldHVybiBpbnRlcnBvbGF0ZWRWYWx1ZXM7XG4gIH07XG5cbn0oKSk7XG5cbi8qKlxuICogVGhpcyBtb2R1bGUgYWRkcyBzdHJpbmcgaW50ZXJwb2xhdGlvbiBzdXBwb3J0IHRvIFNoaWZ0eS5cbiAqXG4gKiBUaGUgVG9rZW4gZXh0ZW5zaW9uIGFsbG93cyBTaGlmdHkgdG8gdHdlZW4gbnVtYmVycyBpbnNpZGUgb2Ygc3RyaW5ncy4gIEFtb25nXG4gKiBvdGhlciB0aGluZ3MsIHRoaXMgYWxsb3dzIHlvdSB0byBhbmltYXRlIENTUyBwcm9wZXJ0aWVzLiAgRm9yIGV4YW1wbGUsIHlvdVxuICogY2FuIGRvIHRoaXM6XG4gKlxuICogICAgIHZhciB0d2VlbmFibGUgPSBuZXcgVHdlZW5hYmxlKCk7XG4gKiAgICAgdHdlZW5hYmxlLnR3ZWVuKHtcbiAqICAgICAgIGZyb206IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCg0NXB4KScgfSxcbiAqICAgICAgIHRvOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoOTB4cCknIH1cbiAqICAgICB9KTtcbiAqXG4gKiBgdHJhbnNsYXRlWCg0NSlgIHdpbGwgYmUgdHdlZW5lZCB0byBgdHJhbnNsYXRlWCg5MClgLiAgVG8gZGVtb25zdHJhdGU6XG4gKlxuICogICAgIHZhciB0d2VlbmFibGUgPSBuZXcgVHdlZW5hYmxlKCk7XG4gKiAgICAgdHdlZW5hYmxlLnR3ZWVuKHtcbiAqICAgICAgIGZyb206IHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWCg0NXB4KScgfSxcbiAqICAgICAgIHRvOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoOTBweCknIH0sXG4gKiAgICAgICBzdGVwOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAqICAgICAgICAgY29uc29sZS5sb2coc3RhdGUudHJhbnNmb3JtKTtcbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqXG4gKiBUaGUgYWJvdmUgc25pcHBldCB3aWxsIGxvZyBzb21ldGhpbmcgbGlrZSB0aGlzIGluIHRoZSBjb25zb2xlOlxuICpcbiAqICAgICB0cmFuc2xhdGVYKDYwLjNweClcbiAqICAgICAuLi5cbiAqICAgICB0cmFuc2xhdGVYKDc2LjA1cHgpXG4gKiAgICAgLi4uXG4gKiAgICAgdHJhbnNsYXRlWCg5MHB4KVxuICpcbiAqIEFub3RoZXIgdXNlIGZvciB0aGlzIGlzIGFuaW1hdGluZyBjb2xvcnM6XG4gKlxuICogICAgIHZhciB0d2VlbmFibGUgPSBuZXcgVHdlZW5hYmxlKCk7XG4gKiAgICAgdHdlZW5hYmxlLnR3ZWVuKHtcbiAqICAgICAgIGZyb206IHsgY29sb3I6ICdyZ2IoMCwyNTUsMCknIH0sXG4gKiAgICAgICB0bzogeyBjb2xvcjogJ3JnYigyNTUsMCwyNTUpJyB9LFxuICogICAgICAgc3RlcDogZnVuY3Rpb24gKHN0YXRlKSB7XG4gKiAgICAgICAgIGNvbnNvbGUubG9nKHN0YXRlLmNvbG9yKTtcbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqXG4gKiBUaGUgYWJvdmUgc25pcHBldCB3aWxsIGxvZyBzb21ldGhpbmcgbGlrZSB0aGlzOlxuICpcbiAqICAgICByZ2IoODQsMTcwLDg0KVxuICogICAgIC4uLlxuICogICAgIHJnYigxNzAsODQsMTcwKVxuICogICAgIC4uLlxuICogICAgIHJnYigyNTUsMCwyNTUpXG4gKlxuICogVGhpcyBleHRlbnNpb24gYWxzbyBzdXBwb3J0cyBoZXhhZGVjaW1hbCBjb2xvcnMsIGluIGJvdGggbG9uZyAoYCNmZjAwZmZgKVxuICogYW5kIHNob3J0IChgI2YwZmApIGZvcm1zLiAgQmUgYXdhcmUgdGhhdCBoZXhhZGVjaW1hbCBpbnB1dCB2YWx1ZXMgd2lsbCBiZVxuICogY29udmVydGVkIGludG8gdGhlIGVxdWl2YWxlbnQgUkdCIG91dHB1dCB2YWx1ZXMuICBUaGlzIGlzIGRvbmUgdG8gb3B0aW1pemVcbiAqIGZvciBwZXJmb3JtYW5jZS5cbiAqXG4gKiAgICAgdmFyIHR3ZWVuYWJsZSA9IG5ldyBUd2VlbmFibGUoKTtcbiAqICAgICB0d2VlbmFibGUudHdlZW4oe1xuICogICAgICAgZnJvbTogeyBjb2xvcjogJyMwZjAnIH0sXG4gKiAgICAgICB0bzogeyBjb2xvcjogJyNmMGYnIH0sXG4gKiAgICAgICBzdGVwOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAqICAgICAgICAgY29uc29sZS5sb2coc3RhdGUuY29sb3IpO1xuICogICAgICAgfVxuICogICAgIH0pO1xuICpcbiAqIFRoaXMgc25pcHBldCB3aWxsIGdlbmVyYXRlIHRoZSBzYW1lIG91dHB1dCBhcyB0aGUgb25lIGJlZm9yZSBpdCBiZWNhdXNlXG4gKiBlcXVpdmFsZW50IHZhbHVlcyB3ZXJlIHN1cHBsaWVkIChqdXN0IGluIGhleGFkZWNpbWFsIGZvcm0gcmF0aGVyIHRoYW4gUkdCKTpcbiAqXG4gKiAgICAgcmdiKDg0LDE3MCw4NClcbiAqICAgICAuLi5cbiAqICAgICByZ2IoMTcwLDg0LDE3MClcbiAqICAgICAuLi5cbiAqICAgICByZ2IoMjU1LDAsMjU1KVxuICpcbiAqICMjIEVhc2luZyBzdXBwb3J0XG4gKlxuICogRWFzaW5nIHdvcmtzIHNvbWV3aGF0IGRpZmZlcmVudGx5IGluIHRoZSBUb2tlbiBleHRlbnNpb24uICBUaGlzIGlzIGJlY2F1c2VcbiAqIHNvbWUgQ1NTIHByb3BlcnRpZXMgaGF2ZSBtdWx0aXBsZSB2YWx1ZXMgaW4gdGhlbSwgYW5kIHlvdSBtaWdodCBuZWVkIHRvXG4gKiB0d2VlbiBlYWNoIHZhbHVlIGFsb25nIGl0cyBvd24gZWFzaW5nIGN1cnZlLiAgQSBiYXNpYyBleGFtcGxlOlxuICpcbiAqICAgICB2YXIgdHdlZW5hYmxlID0gbmV3IFR3ZWVuYWJsZSgpO1xuICogICAgIHR3ZWVuYWJsZS50d2Vlbih7XG4gKiAgICAgICBmcm9tOiB7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVgoMHB4KSB0cmFuc2xhdGVZKDBweCknIH0sXG4gKiAgICAgICB0bzogeyB0cmFuc2Zvcm06ICAgJ3RyYW5zbGF0ZVgoMTAwcHgpIHRyYW5zbGF0ZVkoMTAwcHgpJyB9LFxuICogICAgICAgZWFzaW5nOiB7IHRyYW5zZm9ybTogJ2Vhc2VJblF1YWQnIH0sXG4gKiAgICAgICBzdGVwOiBmdW5jdGlvbiAoc3RhdGUpIHtcbiAqICAgICAgICAgY29uc29sZS5sb2coc3RhdGUudHJhbnNmb3JtKTtcbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqXG4gKiBUaGUgYWJvdmUgc25pcHBldCB3aWxsIGNyZWF0ZSB2YWx1ZXMgbGlrZSB0aGlzOlxuICpcbiAqICAgICB0cmFuc2xhdGVYKDExLjU2cHgpIHRyYW5zbGF0ZVkoMTEuNTZweClcbiAqICAgICAuLi5cbiAqICAgICB0cmFuc2xhdGVYKDQ2LjI0cHgpIHRyYW5zbGF0ZVkoNDYuMjRweClcbiAqICAgICAuLi5cbiAqICAgICB0cmFuc2xhdGVYKDEwMHB4KSB0cmFuc2xhdGVZKDEwMHB4KVxuICpcbiAqIEluIHRoaXMgY2FzZSwgdGhlIHZhbHVlcyBmb3IgYHRyYW5zbGF0ZVhgIGFuZCBgdHJhbnNsYXRlWWAgYXJlIGFsd2F5cyB0aGVcbiAqIHNhbWUgZm9yIGVhY2ggc3RlcCBvZiB0aGUgdHdlZW4sIGJlY2F1c2UgdGhleSBoYXZlIHRoZSBzYW1lIHN0YXJ0IGFuZCBlbmRcbiAqIHBvaW50cyBhbmQgYm90aCB1c2UgdGhlIHNhbWUgZWFzaW5nIGN1cnZlLiAgV2UgY2FuIGFsc28gdHdlZW4gYHRyYW5zbGF0ZVhgXG4gKiBhbmQgYHRyYW5zbGF0ZVlgIGFsb25nIGluZGVwZW5kZW50IGN1cnZlczpcbiAqXG4gKiAgICAgdmFyIHR3ZWVuYWJsZSA9IG5ldyBUd2VlbmFibGUoKTtcbiAqICAgICB0d2VlbmFibGUudHdlZW4oe1xuICogICAgICAgZnJvbTogeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVYKDBweCkgdHJhbnNsYXRlWSgwcHgpJyB9LFxuICogICAgICAgdG86IHsgdHJhbnNmb3JtOiAgICd0cmFuc2xhdGVYKDEwMHB4KSB0cmFuc2xhdGVZKDEwMHB4KScgfSxcbiAqICAgICAgIGVhc2luZzogeyB0cmFuc2Zvcm06ICdlYXNlSW5RdWFkIGJvdW5jZScgfSxcbiAqICAgICAgIHN0ZXA6IGZ1bmN0aW9uIChzdGF0ZSkge1xuICogICAgICAgICBjb25zb2xlLmxvZyhzdGF0ZS50cmFuc2Zvcm0pO1xuICogICAgICAgfVxuICogICAgIH0pO1xuICpcbiAqIFRoZSBhYm92ZSBzbmlwcGV0IHdpbGwgY3JlYXRlIHZhbHVlcyBsaWtlIHRoaXM6XG4gKlxuICogICAgIHRyYW5zbGF0ZVgoMTAuODlweCkgdHJhbnNsYXRlWSg4Mi4zNXB4KVxuICogICAgIC4uLlxuICogICAgIHRyYW5zbGF0ZVgoNDQuODlweCkgdHJhbnNsYXRlWSg4Ni43M3B4KVxuICogICAgIC4uLlxuICogICAgIHRyYW5zbGF0ZVgoMTAwcHgpIHRyYW5zbGF0ZVkoMTAwcHgpXG4gKlxuICogYHRyYW5zbGF0ZVhgIGFuZCBgdHJhbnNsYXRlWWAgYXJlIG5vdCBpbiBzeW5jIGFueW1vcmUsIGJlY2F1c2UgYGVhc2VJblF1YWRgXG4gKiB3YXMgc3BlY2lmaWVkIGZvciBgdHJhbnNsYXRlWGAgYW5kIGBib3VuY2VgIGZvciBgdHJhbnNsYXRlWWAuICBNaXhpbmcgYW5kXG4gKiBtYXRjaGluZyBlYXNpbmcgY3VydmVzIGNhbiBtYWtlIGZvciBzb21lIGludGVyZXN0aW5nIG1vdGlvbiBpbiB5b3VyXG4gKiBhbmltYXRpb25zLlxuICpcbiAqIFRoZSBvcmRlciBvZiB0aGUgc3BhY2Utc2VwYXJhdGVkIGVhc2luZyBjdXJ2ZXMgY29ycmVzcG9uZCB0aGUgdG9rZW4gdmFsdWVzXG4gKiB0aGV5IGFwcGx5IHRvLiAgSWYgdGhlcmUgYXJlIG1vcmUgdG9rZW4gdmFsdWVzIHRoYW4gZWFzaW5nIGN1cnZlcyBsaXN0ZWQsXG4gKiB0aGUgbGFzdCBlYXNpbmcgY3VydmUgbGlzdGVkIGlzIHVzZWQuXG4gKiBAc3VibW9kdWxlIFR3ZWVuYWJsZS50b2tlblxuICovXG5cbi8vIHRva2VuIGZ1bmN0aW9uIGlzIGRlZmluZWQgYWJvdmUgb25seSBzbyB0aGF0IGRveC1mb3VuZGF0aW9uIHNlZXMgaXQgYXNcbi8vIGRvY3VtZW50YXRpb24gYW5kIHJlbmRlcnMgaXQuICBJdCBpcyBuZXZlciB1c2VkLCBhbmQgaXMgb3B0aW1pemVkIGF3YXkgYXRcbi8vIGJ1aWxkIHRpbWUuXG5cbjsoZnVuY3Rpb24gKFR3ZWVuYWJsZSkge1xuXG4gIC8qKlxuICAgKiBAdHlwZWRlZiB7e1xuICAgKiAgIGZvcm1hdFN0cmluZzogc3RyaW5nXG4gICAqICAgY2h1bmtOYW1lczogQXJyYXkuPHN0cmluZz5cbiAgICogfX1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIHZhciBmb3JtYXRNYW5pZmVzdDtcblxuICAvLyBDT05TVEFOVFNcblxuICB2YXIgUl9OVU1CRVJfQ09NUE9ORU5UID0gLyhcXGR8XFwtfFxcLikvO1xuICB2YXIgUl9GT1JNQVRfQ0hVTktTID0gLyhbXlxcLTAtOVxcLl0rKS9nO1xuICB2YXIgUl9VTkZPUk1BVFRFRF9WQUxVRVMgPSAvWzAtOS5cXC1dKy9nO1xuICB2YXIgUl9SR0IgPSBuZXcgUmVnRXhwKFxuICAgICdyZ2JcXFxcKCcgKyBSX1VORk9STUFUVEVEX1ZBTFVFUy5zb3VyY2UgK1xuICAgICgvLFxccyovLnNvdXJjZSkgKyBSX1VORk9STUFUVEVEX1ZBTFVFUy5zb3VyY2UgK1xuICAgICgvLFxccyovLnNvdXJjZSkgKyBSX1VORk9STUFUVEVEX1ZBTFVFUy5zb3VyY2UgKyAnXFxcXCknLCAnZycpO1xuICB2YXIgUl9SR0JfUFJFRklYID0gL14uKlxcKC87XG4gIHZhciBSX0hFWCA9IC8jKFswLTldfFthLWZdKXszLDZ9L2dpO1xuICB2YXIgVkFMVUVfUExBQ0VIT0xERVIgPSAnVkFMJztcblxuICAvLyBIRUxQRVJTXG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7QXJyYXkubnVtYmVyfSByYXdWYWx1ZXNcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByZWZpeFxuICAgKlxuICAgKiBAcmV0dXJuIHtBcnJheS48c3RyaW5nPn1cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGdldEZvcm1hdENodW5rc0Zyb20gKHJhd1ZhbHVlcywgcHJlZml4KSB7XG4gICAgdmFyIGFjY3VtdWxhdG9yID0gW107XG5cbiAgICB2YXIgcmF3VmFsdWVzTGVuZ3RoID0gcmF3VmFsdWVzLmxlbmd0aDtcbiAgICB2YXIgaTtcblxuICAgIGZvciAoaSA9IDA7IGkgPCByYXdWYWx1ZXNMZW5ndGg7IGkrKykge1xuICAgICAgYWNjdW11bGF0b3IucHVzaCgnXycgKyBwcmVmaXggKyAnXycgKyBpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gYWNjdW11bGF0b3I7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdHRlZFN0cmluZ1xuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBnZXRGb3JtYXRTdHJpbmdGcm9tIChmb3JtYXR0ZWRTdHJpbmcpIHtcbiAgICB2YXIgY2h1bmtzID0gZm9ybWF0dGVkU3RyaW5nLm1hdGNoKFJfRk9STUFUX0NIVU5LUyk7XG5cbiAgICBpZiAoIWNodW5rcykge1xuICAgICAgLy8gY2h1bmtzIHdpbGwgYmUgbnVsbCBpZiB0aGVyZSB3ZXJlIG5vIHRva2VucyB0byBwYXJzZSBpblxuICAgICAgLy8gZm9ybWF0dGVkU3RyaW5nIChmb3IgZXhhbXBsZSwgaWYgZm9ybWF0dGVkU3RyaW5nIGlzICcyJykuICBDb2VyY2VcbiAgICAgIC8vIGNodW5rcyB0byBiZSB1c2VmdWwgaGVyZS5cbiAgICAgIGNodW5rcyA9IFsnJywgJyddO1xuXG4gICAgICAvLyBJZiB0aGVyZSBpcyBvbmx5IG9uZSBjaHVuaywgYXNzdW1lIHRoYXQgdGhlIHN0cmluZyBpcyBhIG51bWJlclxuICAgICAgLy8gZm9sbG93ZWQgYnkgYSB0b2tlbi4uLlxuICAgICAgLy8gTk9URTogVGhpcyBtYXkgYmUgYW4gdW53aXNlIGFzc3VtcHRpb24uXG4gICAgfSBlbHNlIGlmIChjaHVua3MubGVuZ3RoID09PSAxIHx8XG4gICAgICAvLyAuLi5vciBpZiB0aGUgc3RyaW5nIHN0YXJ0cyB3aXRoIGEgbnVtYmVyIGNvbXBvbmVudCAoXCIuXCIsIFwiLVwiLCBvciBhXG4gICAgICAvLyBkaWdpdCkuLi5cbiAgICBmb3JtYXR0ZWRTdHJpbmdbMF0ubWF0Y2goUl9OVU1CRVJfQ09NUE9ORU5UKSkge1xuICAgICAgLy8gLi4ucHJlcGVuZCBhbiBlbXB0eSBzdHJpbmcgaGVyZSB0byBtYWtlIHN1cmUgdGhhdCB0aGUgZm9ybWF0dGVkIG51bWJlclxuICAgICAgLy8gaXMgcHJvcGVybHkgcmVwbGFjZWQgYnkgVkFMVUVfUExBQ0VIT0xERVJcbiAgICAgIGNodW5rcy51bnNoaWZ0KCcnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY2h1bmtzLmpvaW4oVkFMVUVfUExBQ0VIT0xERVIpO1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnZlcnQgYWxsIGhleCBjb2xvciB2YWx1ZXMgd2l0aGluIGEgc3RyaW5nIHRvIGFuIHJnYiBzdHJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZU9iamVjdFxuICAgKlxuICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBtb2RpZmllZCBvYmpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIHNhbml0aXplT2JqZWN0Rm9ySGV4UHJvcHMgKHN0YXRlT2JqZWN0KSB7XG4gICAgVHdlZW5hYmxlLmVhY2goc3RhdGVPYmplY3QsIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICB2YXIgY3VycmVudFByb3AgPSBzdGF0ZU9iamVjdFtwcm9wXTtcblxuICAgICAgaWYgKHR5cGVvZiBjdXJyZW50UHJvcCA9PT0gJ3N0cmluZycgJiYgY3VycmVudFByb3AubWF0Y2goUl9IRVgpKSB7XG4gICAgICAgIHN0YXRlT2JqZWN0W3Byb3BdID0gc2FuaXRpemVIZXhDaHVua3NUb1JHQihjdXJyZW50UHJvcCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtzdHJpbmd9IHN0clxuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiAgc2FuaXRpemVIZXhDaHVua3NUb1JHQiAoc3RyKSB7XG4gICAgcmV0dXJuIGZpbHRlclN0cmluZ0NodW5rcyhSX0hFWCwgc3RyLCBjb252ZXJ0SGV4VG9SR0IpO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBoZXhTdHJpbmdcbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gY29udmVydEhleFRvUkdCIChoZXhTdHJpbmcpIHtcbiAgICB2YXIgcmdiQXJyID0gaGV4VG9SR0JBcnJheShoZXhTdHJpbmcpO1xuICAgIHJldHVybiAncmdiKCcgKyByZ2JBcnJbMF0gKyAnLCcgKyByZ2JBcnJbMV0gKyAnLCcgKyByZ2JBcnJbMl0gKyAnKSc7XG4gIH1cblxuICB2YXIgaGV4VG9SR0JBcnJheV9yZXR1cm5BcnJheSA9IFtdO1xuICAvKipcbiAgICogQ29udmVydCBhIGhleGFkZWNpbWFsIHN0cmluZyB0byBhbiBhcnJheSB3aXRoIHRocmVlIGl0ZW1zLCBvbmUgZWFjaCBmb3JcbiAgICogdGhlIHJlZCwgYmx1ZSwgYW5kIGdyZWVuIGRlY2ltYWwgdmFsdWVzLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gaGV4IEEgaGV4YWRlY2ltYWwgc3RyaW5nLlxuICAgKlxuICAgKiBAcmV0dXJucyB7QXJyYXkuPG51bWJlcj59IFRoZSBjb252ZXJ0ZWQgQXJyYXkgb2YgUkdCIHZhbHVlcyBpZiBgaGV4YCBpcyBhXG4gICAqIHZhbGlkIHN0cmluZywgb3IgYW4gQXJyYXkgb2YgdGhyZWUgMCdzLlxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gaGV4VG9SR0JBcnJheSAoaGV4KSB7XG5cbiAgICBoZXggPSBoZXgucmVwbGFjZSgvIy8sICcnKTtcblxuICAgIC8vIElmIHRoZSBzdHJpbmcgaXMgYSBzaG9ydGhhbmQgdGhyZWUgZGlnaXQgaGV4IG5vdGF0aW9uLCBub3JtYWxpemUgaXQgdG9cbiAgICAvLyB0aGUgc3RhbmRhcmQgc2l4IGRpZ2l0IG5vdGF0aW9uXG4gICAgaWYgKGhleC5sZW5ndGggPT09IDMpIHtcbiAgICAgIGhleCA9IGhleC5zcGxpdCgnJyk7XG4gICAgICBoZXggPSBoZXhbMF0gKyBoZXhbMF0gKyBoZXhbMV0gKyBoZXhbMV0gKyBoZXhbMl0gKyBoZXhbMl07XG4gICAgfVxuXG4gICAgaGV4VG9SR0JBcnJheV9yZXR1cm5BcnJheVswXSA9IGhleFRvRGVjKGhleC5zdWJzdHIoMCwgMikpO1xuICAgIGhleFRvUkdCQXJyYXlfcmV0dXJuQXJyYXlbMV0gPSBoZXhUb0RlYyhoZXguc3Vic3RyKDIsIDIpKTtcbiAgICBoZXhUb1JHQkFycmF5X3JldHVybkFycmF5WzJdID0gaGV4VG9EZWMoaGV4LnN1YnN0cig0LCAyKSk7XG5cbiAgICByZXR1cm4gaGV4VG9SR0JBcnJheV9yZXR1cm5BcnJheTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb252ZXJ0IGEgYmFzZS0xNiBudW1iZXIgdG8gYmFzZS0xMC5cbiAgICpcbiAgICogQHBhcmFtIHtOdW1iZXJ8U3RyaW5nfSBoZXggVGhlIHZhbHVlIHRvIGNvbnZlcnRcbiAgICpcbiAgICogQHJldHVybnMge051bWJlcn0gVGhlIGJhc2UtMTAgZXF1aXZhbGVudCBvZiBgaGV4YC5cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGhleFRvRGVjIChoZXgpIHtcbiAgICByZXR1cm4gcGFyc2VJbnQoaGV4LCAxNik7XG4gIH1cblxuICAvKipcbiAgICogUnVucyBhIGZpbHRlciBvcGVyYXRpb24gb24gYWxsIGNodW5rcyBvZiBhIHN0cmluZyB0aGF0IG1hdGNoIGEgUmVnRXhwXG4gICAqXG4gICAqIEBwYXJhbSB7UmVnRXhwfSBwYXR0ZXJuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSB1bmZpbHRlcmVkU3RyaW5nXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb24oc3RyaW5nKX0gZmlsdGVyXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGZpbHRlclN0cmluZ0NodW5rcyAocGF0dGVybiwgdW5maWx0ZXJlZFN0cmluZywgZmlsdGVyKSB7XG4gICAgdmFyIHBhdHRlbk1hdGNoZXMgPSB1bmZpbHRlcmVkU3RyaW5nLm1hdGNoKHBhdHRlcm4pO1xuICAgIHZhciBmaWx0ZXJlZFN0cmluZyA9IHVuZmlsdGVyZWRTdHJpbmcucmVwbGFjZShwYXR0ZXJuLCBWQUxVRV9QTEFDRUhPTERFUik7XG5cbiAgICBpZiAocGF0dGVuTWF0Y2hlcykge1xuICAgICAgdmFyIHBhdHRlbk1hdGNoZXNMZW5ndGggPSBwYXR0ZW5NYXRjaGVzLmxlbmd0aDtcbiAgICAgIHZhciBjdXJyZW50Q2h1bms7XG5cbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGF0dGVuTWF0Y2hlc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgIGN1cnJlbnRDaHVuayA9IHBhdHRlbk1hdGNoZXMuc2hpZnQoKTtcbiAgICAgICAgZmlsdGVyZWRTdHJpbmcgPSBmaWx0ZXJlZFN0cmluZy5yZXBsYWNlKFxuICAgICAgICAgIFZBTFVFX1BMQUNFSE9MREVSLCBmaWx0ZXIoY3VycmVudENodW5rKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpbHRlcmVkU3RyaW5nO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIGZvciBmbG9hdGluZyBwb2ludCB2YWx1ZXMgd2l0aGluIHJnYiBzdHJpbmdzIGFuZCByb3VuZHMgdGhlbS5cbiAgICpcbiAgICogQHBhcmFtIHtzdHJpbmd9IGZvcm1hdHRlZFN0cmluZ1xuICAgKlxuICAgKiBAcmV0dXJuIHtzdHJpbmd9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBzYW5pdGl6ZVJHQkNodW5rcyAoZm9ybWF0dGVkU3RyaW5nKSB7XG4gICAgcmV0dXJuIGZpbHRlclN0cmluZ0NodW5rcyhSX1JHQiwgZm9ybWF0dGVkU3RyaW5nLCBzYW5pdGl6ZVJHQkNodW5rKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcmdiQ2h1bmtcbiAgICpcbiAgICogQHJldHVybiB7c3RyaW5nfVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gc2FuaXRpemVSR0JDaHVuayAocmdiQ2h1bmspIHtcbiAgICB2YXIgbnVtYmVycyA9IHJnYkNodW5rLm1hdGNoKFJfVU5GT1JNQVRURURfVkFMVUVTKTtcbiAgICB2YXIgbnVtYmVyc0xlbmd0aCA9IG51bWJlcnMubGVuZ3RoO1xuICAgIHZhciBzYW5pdGl6ZWRTdHJpbmcgPSByZ2JDaHVuay5tYXRjaChSX1JHQl9QUkVGSVgpWzBdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBudW1iZXJzTGVuZ3RoOyBpKyspIHtcbiAgICAgIHNhbml0aXplZFN0cmluZyArPSBwYXJzZUludChudW1iZXJzW2ldLCAxMCkgKyAnLCc7XG4gICAgfVxuXG4gICAgc2FuaXRpemVkU3RyaW5nID0gc2FuaXRpemVkU3RyaW5nLnNsaWNlKDAsIC0xKSArICcpJztcblxuICAgIHJldHVybiBzYW5pdGl6ZWRTdHJpbmc7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlT2JqZWN0XG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gQW4gT2JqZWN0IG9mIGZvcm1hdE1hbmlmZXN0cyB0aGF0IGNvcnJlc3BvbmQgdG9cbiAgICogdGhlIHN0cmluZyBwcm9wZXJ0aWVzIG9mIHN0YXRlT2JqZWN0XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBnZXRGb3JtYXRNYW5pZmVzdHMgKHN0YXRlT2JqZWN0KSB7XG4gICAgdmFyIG1hbmlmZXN0QWNjdW11bGF0b3IgPSB7fTtcblxuICAgIFR3ZWVuYWJsZS5lYWNoKHN0YXRlT2JqZWN0LCBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgdmFyIGN1cnJlbnRQcm9wID0gc3RhdGVPYmplY3RbcHJvcF07XG5cbiAgICAgIGlmICh0eXBlb2YgY3VycmVudFByb3AgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciByYXdWYWx1ZXMgPSBnZXRWYWx1ZXNGcm9tKGN1cnJlbnRQcm9wKTtcblxuICAgICAgICBtYW5pZmVzdEFjY3VtdWxhdG9yW3Byb3BdID0ge1xuICAgICAgICAgICdmb3JtYXRTdHJpbmcnOiBnZXRGb3JtYXRTdHJpbmdGcm9tKGN1cnJlbnRQcm9wKVxuICAgICAgICAgICwnY2h1bmtOYW1lcyc6IGdldEZvcm1hdENodW5rc0Zyb20ocmF3VmFsdWVzLCBwcm9wKVxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIG1hbmlmZXN0QWNjdW11bGF0b3I7XG4gIH1cblxuICAvKipcbiAgICogQHBhcmFtIHtPYmplY3R9IHN0YXRlT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSBmb3JtYXRNYW5pZmVzdHNcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGV4cGFuZEZvcm1hdHRlZFByb3BlcnRpZXMgKHN0YXRlT2JqZWN0LCBmb3JtYXRNYW5pZmVzdHMpIHtcbiAgICBUd2VlbmFibGUuZWFjaChmb3JtYXRNYW5pZmVzdHMsIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICB2YXIgY3VycmVudFByb3AgPSBzdGF0ZU9iamVjdFtwcm9wXTtcbiAgICAgIHZhciByYXdWYWx1ZXMgPSBnZXRWYWx1ZXNGcm9tKGN1cnJlbnRQcm9wKTtcbiAgICAgIHZhciByYXdWYWx1ZXNMZW5ndGggPSByYXdWYWx1ZXMubGVuZ3RoO1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhd1ZhbHVlc0xlbmd0aDsgaSsrKSB7XG4gICAgICAgIHN0YXRlT2JqZWN0W2Zvcm1hdE1hbmlmZXN0c1twcm9wXS5jaHVua05hbWVzW2ldXSA9ICtyYXdWYWx1ZXNbaV07XG4gICAgICB9XG5cbiAgICAgIGRlbGV0ZSBzdGF0ZU9iamVjdFtwcm9wXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gc3RhdGVPYmplY3RcbiAgICogQHBhcmFtIHtPYmplY3R9IGZvcm1hdE1hbmlmZXN0c1xuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gY29sbGFwc2VGb3JtYXR0ZWRQcm9wZXJ0aWVzIChzdGF0ZU9iamVjdCwgZm9ybWF0TWFuaWZlc3RzKSB7XG4gICAgVHdlZW5hYmxlLmVhY2goZm9ybWF0TWFuaWZlc3RzLCBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgdmFyIGN1cnJlbnRQcm9wID0gc3RhdGVPYmplY3RbcHJvcF07XG4gICAgICB2YXIgZm9ybWF0Q2h1bmtzID0gZXh0cmFjdFByb3BlcnR5Q2h1bmtzKFxuICAgICAgICBzdGF0ZU9iamVjdCwgZm9ybWF0TWFuaWZlc3RzW3Byb3BdLmNodW5rTmFtZXMpO1xuICAgICAgdmFyIHZhbHVlc0xpc3QgPSBnZXRWYWx1ZXNMaXN0KFxuICAgICAgICBmb3JtYXRDaHVua3MsIGZvcm1hdE1hbmlmZXN0c1twcm9wXS5jaHVua05hbWVzKTtcbiAgICAgIGN1cnJlbnRQcm9wID0gZ2V0Rm9ybWF0dGVkVmFsdWVzKFxuICAgICAgICBmb3JtYXRNYW5pZmVzdHNbcHJvcF0uZm9ybWF0U3RyaW5nLCB2YWx1ZXNMaXN0KTtcbiAgICAgIHN0YXRlT2JqZWN0W3Byb3BdID0gc2FuaXRpemVSR0JDaHVua3MoY3VycmVudFByb3ApO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZU9iamVjdFxuICAgKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBjaHVua05hbWVzXG4gICAqXG4gICAqIEByZXR1cm4ge09iamVjdH0gVGhlIGV4dHJhY3RlZCB2YWx1ZSBjaHVua3MuXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBleHRyYWN0UHJvcGVydHlDaHVua3MgKHN0YXRlT2JqZWN0LCBjaHVua05hbWVzKSB7XG4gICAgdmFyIGV4dHJhY3RlZFZhbHVlcyA9IHt9O1xuICAgIHZhciBjdXJyZW50Q2h1bmtOYW1lLCBjaHVua05hbWVzTGVuZ3RoID0gY2h1bmtOYW1lcy5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNodW5rTmFtZXNMZW5ndGg7IGkrKykge1xuICAgICAgY3VycmVudENodW5rTmFtZSA9IGNodW5rTmFtZXNbaV07XG4gICAgICBleHRyYWN0ZWRWYWx1ZXNbY3VycmVudENodW5rTmFtZV0gPSBzdGF0ZU9iamVjdFtjdXJyZW50Q2h1bmtOYW1lXTtcbiAgICAgIGRlbGV0ZSBzdGF0ZU9iamVjdFtjdXJyZW50Q2h1bmtOYW1lXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZXh0cmFjdGVkVmFsdWVzO1xuICB9XG5cbiAgdmFyIGdldFZhbHVlc0xpc3RfYWNjdW11bGF0b3IgPSBbXTtcbiAgLyoqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBzdGF0ZU9iamVjdFxuICAgKiBAcGFyYW0ge0FycmF5LjxzdHJpbmc+fSBjaHVua05hbWVzXG4gICAqXG4gICAqIEByZXR1cm4ge0FycmF5LjxudW1iZXI+fVxuICAgKiBAcHJpdmF0ZVxuICAgKi9cbiAgZnVuY3Rpb24gZ2V0VmFsdWVzTGlzdCAoc3RhdGVPYmplY3QsIGNodW5rTmFtZXMpIHtcbiAgICBnZXRWYWx1ZXNMaXN0X2FjY3VtdWxhdG9yLmxlbmd0aCA9IDA7XG4gICAgdmFyIGNodW5rTmFtZXNMZW5ndGggPSBjaHVua05hbWVzLmxlbmd0aDtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2h1bmtOYW1lc0xlbmd0aDsgaSsrKSB7XG4gICAgICBnZXRWYWx1ZXNMaXN0X2FjY3VtdWxhdG9yLnB1c2goc3RhdGVPYmplY3RbY2h1bmtOYW1lc1tpXV0pO1xuICAgIH1cblxuICAgIHJldHVybiBnZXRWYWx1ZXNMaXN0X2FjY3VtdWxhdG9yO1xuICB9XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBmb3JtYXRTdHJpbmdcbiAgICogQHBhcmFtIHtBcnJheS48bnVtYmVyPn0gcmF3VmFsdWVzXG4gICAqXG4gICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGdldEZvcm1hdHRlZFZhbHVlcyAoZm9ybWF0U3RyaW5nLCByYXdWYWx1ZXMpIHtcbiAgICB2YXIgZm9ybWF0dGVkVmFsdWVTdHJpbmcgPSBmb3JtYXRTdHJpbmc7XG4gICAgdmFyIHJhd1ZhbHVlc0xlbmd0aCA9IHJhd1ZhbHVlcy5sZW5ndGg7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJhd1ZhbHVlc0xlbmd0aDsgaSsrKSB7XG4gICAgICBmb3JtYXR0ZWRWYWx1ZVN0cmluZyA9IGZvcm1hdHRlZFZhbHVlU3RyaW5nLnJlcGxhY2UoXG4gICAgICAgIFZBTFVFX1BMQUNFSE9MREVSLCArcmF3VmFsdWVzW2ldLnRvRml4ZWQoNCkpO1xuICAgIH1cblxuICAgIHJldHVybiBmb3JtYXR0ZWRWYWx1ZVN0cmluZztcbiAgfVxuXG4gIC8qKlxuICAgKiBOb3RlOiBJdCdzIHRoZSBkdXR5IG9mIHRoZSBjYWxsZXIgdG8gY29udmVydCB0aGUgQXJyYXkgZWxlbWVudHMgb2YgdGhlXG4gICAqIHJldHVybiB2YWx1ZSBpbnRvIG51bWJlcnMuICBUaGlzIGlzIGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge3N0cmluZ30gZm9ybWF0dGVkU3RyaW5nXG4gICAqXG4gICAqIEByZXR1cm4ge0FycmF5LjxzdHJpbmc+fG51bGx9XG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBmdW5jdGlvbiBnZXRWYWx1ZXNGcm9tIChmb3JtYXR0ZWRTdHJpbmcpIHtcbiAgICByZXR1cm4gZm9ybWF0dGVkU3RyaW5nLm1hdGNoKFJfVU5GT1JNQVRURURfVkFMVUVTKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbkRhdGFcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGV4cGFuZEVhc2luZ09iamVjdCAoZWFzaW5nT2JqZWN0LCB0b2tlbkRhdGEpIHtcbiAgICBUd2VlbmFibGUuZWFjaCh0b2tlbkRhdGEsIGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICB2YXIgY3VycmVudFByb3AgPSB0b2tlbkRhdGFbcHJvcF07XG4gICAgICB2YXIgY2h1bmtOYW1lcyA9IGN1cnJlbnRQcm9wLmNodW5rTmFtZXM7XG4gICAgICB2YXIgY2h1bmtMZW5ndGggPSBjaHVua05hbWVzLmxlbmd0aDtcblxuICAgICAgdmFyIGVhc2luZyA9IGVhc2luZ09iamVjdFtwcm9wXTtcbiAgICAgIHZhciBpO1xuXG4gICAgICBpZiAodHlwZW9mIGVhc2luZyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgdmFyIGVhc2luZ0NodW5rcyA9IGVhc2luZy5zcGxpdCgnICcpO1xuICAgICAgICB2YXIgbGFzdEVhc2luZ0NodW5rID0gZWFzaW5nQ2h1bmtzW2Vhc2luZ0NodW5rcy5sZW5ndGggLSAxXTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgY2h1bmtMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGVhc2luZ09iamVjdFtjaHVua05hbWVzW2ldXSA9IGVhc2luZ0NodW5rc1tpXSB8fCBsYXN0RWFzaW5nQ2h1bms7XG4gICAgICAgIH1cblxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IGNodW5rTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBlYXNpbmdPYmplY3RbY2h1bmtOYW1lc1tpXV0gPSBlYXNpbmc7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZGVsZXRlIGVhc2luZ09iamVjdFtwcm9wXTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAcGFyYW0ge09iamVjdH0gZWFzaW5nT2JqZWN0XG4gICAqIEBwYXJhbSB7T2JqZWN0fSB0b2tlbkRhdGFcbiAgICogQHByaXZhdGVcbiAgICovXG4gIGZ1bmN0aW9uIGNvbGxhcHNlRWFzaW5nT2JqZWN0IChlYXNpbmdPYmplY3QsIHRva2VuRGF0YSkge1xuICAgIFR3ZWVuYWJsZS5lYWNoKHRva2VuRGF0YSwgZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgIHZhciBjdXJyZW50UHJvcCA9IHRva2VuRGF0YVtwcm9wXTtcbiAgICAgIHZhciBjaHVua05hbWVzID0gY3VycmVudFByb3AuY2h1bmtOYW1lcztcbiAgICAgIHZhciBjaHVua0xlbmd0aCA9IGNodW5rTmFtZXMubGVuZ3RoO1xuXG4gICAgICB2YXIgZmlyc3RFYXNpbmcgPSBlYXNpbmdPYmplY3RbY2h1bmtOYW1lc1swXV07XG4gICAgICB2YXIgdHlwZW9mRWFzaW5ncyA9IHR5cGVvZiBmaXJzdEVhc2luZztcblxuICAgICAgaWYgKHR5cGVvZkVhc2luZ3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhciBjb21wb3NlZEVhc2luZ1N0cmluZyA9ICcnO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2h1bmtMZW5ndGg7IGkrKykge1xuICAgICAgICAgIGNvbXBvc2VkRWFzaW5nU3RyaW5nICs9ICcgJyArIGVhc2luZ09iamVjdFtjaHVua05hbWVzW2ldXTtcbiAgICAgICAgICBkZWxldGUgZWFzaW5nT2JqZWN0W2NodW5rTmFtZXNbaV1dO1xuICAgICAgICB9XG5cbiAgICAgICAgZWFzaW5nT2JqZWN0W3Byb3BdID0gY29tcG9zZWRFYXNpbmdTdHJpbmcuc3Vic3RyKDEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZWFzaW5nT2JqZWN0W3Byb3BdID0gZmlyc3RFYXNpbmc7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBUd2VlbmFibGUucHJvdG90eXBlLmZpbHRlci50b2tlbiA9IHtcbiAgICAndHdlZW5DcmVhdGVkJzogZnVuY3Rpb24gKGN1cnJlbnRTdGF0ZSwgZnJvbVN0YXRlLCB0b1N0YXRlLCBlYXNpbmdPYmplY3QpIHtcbiAgICAgIHNhbml0aXplT2JqZWN0Rm9ySGV4UHJvcHMoY3VycmVudFN0YXRlKTtcbiAgICAgIHNhbml0aXplT2JqZWN0Rm9ySGV4UHJvcHMoZnJvbVN0YXRlKTtcbiAgICAgIHNhbml0aXplT2JqZWN0Rm9ySGV4UHJvcHModG9TdGF0ZSk7XG4gICAgICB0aGlzLl90b2tlbkRhdGEgPSBnZXRGb3JtYXRNYW5pZmVzdHMoY3VycmVudFN0YXRlKTtcbiAgICB9LFxuXG4gICAgJ2JlZm9yZVR3ZWVuJzogZnVuY3Rpb24gKGN1cnJlbnRTdGF0ZSwgZnJvbVN0YXRlLCB0b1N0YXRlLCBlYXNpbmdPYmplY3QpIHtcbiAgICAgIGV4cGFuZEVhc2luZ09iamVjdChlYXNpbmdPYmplY3QsIHRoaXMuX3Rva2VuRGF0YSk7XG4gICAgICBleHBhbmRGb3JtYXR0ZWRQcm9wZXJ0aWVzKGN1cnJlbnRTdGF0ZSwgdGhpcy5fdG9rZW5EYXRhKTtcbiAgICAgIGV4cGFuZEZvcm1hdHRlZFByb3BlcnRpZXMoZnJvbVN0YXRlLCB0aGlzLl90b2tlbkRhdGEpO1xuICAgICAgZXhwYW5kRm9ybWF0dGVkUHJvcGVydGllcyh0b1N0YXRlLCB0aGlzLl90b2tlbkRhdGEpO1xuICAgIH0sXG5cbiAgICAnYWZ0ZXJUd2Vlbic6IGZ1bmN0aW9uIChjdXJyZW50U3RhdGUsIGZyb21TdGF0ZSwgdG9TdGF0ZSwgZWFzaW5nT2JqZWN0KSB7XG4gICAgICBjb2xsYXBzZUZvcm1hdHRlZFByb3BlcnRpZXMoY3VycmVudFN0YXRlLCB0aGlzLl90b2tlbkRhdGEpO1xuICAgICAgY29sbGFwc2VGb3JtYXR0ZWRQcm9wZXJ0aWVzKGZyb21TdGF0ZSwgdGhpcy5fdG9rZW5EYXRhKTtcbiAgICAgIGNvbGxhcHNlRm9ybWF0dGVkUHJvcGVydGllcyh0b1N0YXRlLCB0aGlzLl90b2tlbkRhdGEpO1xuICAgICAgY29sbGFwc2VFYXNpbmdPYmplY3QoZWFzaW5nT2JqZWN0LCB0aGlzLl90b2tlbkRhdGEpO1xuICAgIH1cbiAgfTtcblxufSAoVHdlZW5hYmxlKSk7XG5cbn0pLmNhbGwobnVsbCk7XG4iLCIvLyBDaXJjbGUgc2hhcGVkIHByb2dyZXNzIGJhclxuXG52YXIgU2hhcGUgPSByZXF1aXJlKCcuL3NoYXBlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBDaXJjbGUgPSBmdW5jdGlvbiBDaXJjbGUoY29udGFpbmVyLCBvcHRpb25zKSB7XG4gICAgLy8gVXNlIHR3byBhcmNzIHRvIGZvcm0gYSBjaXJjbGVcbiAgICAvLyBTZWUgdGhpcyBhbnN3ZXIgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMTA0NzczMzQvMTQ0NjA5MlxuICAgIHRoaXMuX3BhdGhUZW1wbGF0ZSA9XG4gICAgICAgICdNIDUwLDUwIG0gMCwte3JhZGl1c30nICtcbiAgICAgICAgJyBhIHtyYWRpdXN9LHtyYWRpdXN9IDAgMSAxIDAsezJyYWRpdXN9JyArXG4gICAgICAgICcgYSB7cmFkaXVzfSx7cmFkaXVzfSAwIDEgMSAwLC17MnJhZGl1c30nO1xuXG4gICAgdGhpcy5jb250YWluZXJBc3BlY3RSYXRpbyA9IDE7XG5cbiAgICBTaGFwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblxuQ2lyY2xlLnByb3RvdHlwZSA9IG5ldyBTaGFwZSgpO1xuQ2lyY2xlLnByb3RvdHlwZS5jb25zdHJ1Y3RvciA9IENpcmNsZTtcblxuQ2lyY2xlLnByb3RvdHlwZS5fcGF0aFN0cmluZyA9IGZ1bmN0aW9uIF9wYXRoU3RyaW5nKG9wdHMpIHtcbiAgICB2YXIgd2lkdGhPZldpZGVyID0gb3B0cy5zdHJva2VXaWR0aDtcbiAgICBpZiAob3B0cy50cmFpbFdpZHRoICYmIG9wdHMudHJhaWxXaWR0aCA+IG9wdHMuc3Ryb2tlV2lkdGgpIHtcbiAgICAgICAgd2lkdGhPZldpZGVyID0gb3B0cy50cmFpbFdpZHRoO1xuICAgIH1cblxuICAgIHZhciByID0gNTAgLSB3aWR0aE9mV2lkZXIgLyAyO1xuXG4gICAgcmV0dXJuIHV0aWxzLnJlbmRlcih0aGlzLl9wYXRoVGVtcGxhdGUsIHtcbiAgICAgICAgcmFkaXVzOiByLFxuICAgICAgICAnMnJhZGl1cyc6IHIgKiAyXG4gICAgfSk7XG59O1xuXG5DaXJjbGUucHJvdG90eXBlLl90cmFpbFN0cmluZyA9IGZ1bmN0aW9uIF90cmFpbFN0cmluZyhvcHRzKSB7XG4gICAgcmV0dXJuIHRoaXMuX3BhdGhTdHJpbmcob3B0cyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENpcmNsZTtcbiIsIi8vIExpbmUgc2hhcGVkIHByb2dyZXNzIGJhclxuXG52YXIgU2hhcGUgPSByZXF1aXJlKCcuL3NoYXBlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBMaW5lID0gZnVuY3Rpb24gTGluZShjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICB0aGlzLl9wYXRoVGVtcGxhdGUgPSAnTSAwLHtjZW50ZXJ9IEwgMTAwLHtjZW50ZXJ9JztcbiAgICBTaGFwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblxuTGluZS5wcm90b3R5cGUgPSBuZXcgU2hhcGUoKTtcbkxpbmUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gTGluZTtcblxuTGluZS5wcm90b3R5cGUuX2luaXRpYWxpemVTdmcgPSBmdW5jdGlvbiBfaW5pdGlhbGl6ZVN2ZyhzdmcsIG9wdHMpIHtcbiAgICBzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAgJyArIG9wdHMuc3Ryb2tlV2lkdGgpO1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ByZXNlcnZlQXNwZWN0UmF0aW8nLCAnbm9uZScpO1xufTtcblxuTGluZS5wcm90b3R5cGUuX3BhdGhTdHJpbmcgPSBmdW5jdGlvbiBfcGF0aFN0cmluZyhvcHRzKSB7XG4gICAgcmV0dXJuIHV0aWxzLnJlbmRlcih0aGlzLl9wYXRoVGVtcGxhdGUsIHtcbiAgICAgICAgY2VudGVyOiBvcHRzLnN0cm9rZVdpZHRoIC8gMlxuICAgIH0pO1xufTtcblxuTGluZS5wcm90b3R5cGUuX3RyYWlsU3RyaW5nID0gZnVuY3Rpb24gX3RyYWlsU3RyaW5nKG9wdHMpIHtcbiAgICByZXR1cm4gdGhpcy5fcGF0aFN0cmluZyhvcHRzKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gTGluZTtcbiIsIm1vZHVsZS5leHBvcnRzID0ge1xuICAgIC8vIEhpZ2hlciBsZXZlbCBBUEksIGRpZmZlcmVudCBzaGFwZWQgcHJvZ3Jlc3MgYmFyc1xuICAgIExpbmU6IHJlcXVpcmUoJy4vbGluZScpLFxuICAgIENpcmNsZTogcmVxdWlyZSgnLi9jaXJjbGUnKSxcbiAgICBTZW1pQ2lyY2xlOiByZXF1aXJlKCcuL3NlbWljaXJjbGUnKSxcblxuICAgIC8vIExvd2VyIGxldmVsIEFQSSB0byB1c2UgYW55IFNWRyBwYXRoXG4gICAgUGF0aDogcmVxdWlyZSgnLi9wYXRoJyksXG5cbiAgICAvLyBCYXNlLWNsYXNzIGZvciBjcmVhdGluZyBuZXcgY3VzdG9tIHNoYXBlc1xuICAgIC8vIHRvIGJlIGluIGxpbmUgd2l0aCB0aGUgQVBJIG9mIGJ1aWx0LWluIHNoYXBlc1xuICAgIC8vIFVuZG9jdW1lbnRlZC5cbiAgICBTaGFwZTogcmVxdWlyZSgnLi9zaGFwZScpLFxuXG4gICAgLy8gSW50ZXJuYWwgdXRpbHMsIHVuZG9jdW1lbnRlZC5cbiAgICB1dGlsczogcmVxdWlyZSgnLi91dGlscycpXG59O1xuIiwiLy8gTG93ZXIgbGV2ZWwgQVBJIHRvIGFuaW1hdGUgYW55IGtpbmQgb2Ygc3ZnIHBhdGhcblxudmFyIFR3ZWVuYWJsZSA9IHJlcXVpcmUoJ3NoaWZ0eScpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgRUFTSU5HX0FMSUFTRVMgPSB7XG4gICAgZWFzZUluOiAnZWFzZUluQ3ViaWMnLFxuICAgIGVhc2VPdXQ6ICdlYXNlT3V0Q3ViaWMnLFxuICAgIGVhc2VJbk91dDogJ2Vhc2VJbk91dEN1YmljJ1xufTtcblxudmFyIFBhdGggPSBmdW5jdGlvbiBQYXRoKHBhdGgsIG9wdHMpIHtcbiAgICAvLyBUaHJvdyBhIGJldHRlciBlcnJvciBpZiBub3QgaW5pdGlhbGl6ZWQgd2l0aCBgbmV3YCBrZXl3b3JkXG4gICAgaWYgKCEodGhpcyBpbnN0YW5jZW9mIFBhdGgpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ29uc3RydWN0b3Igd2FzIGNhbGxlZCB3aXRob3V0IG5ldyBrZXl3b3JkJyk7XG4gICAgfVxuXG4gICAgLy8gRGVmYXVsdCBwYXJhbWV0ZXJzIGZvciBhbmltYXRpb25cbiAgICBvcHRzID0gdXRpbHMuZXh0ZW5kKHtcbiAgICAgICAgZHVyYXRpb246IDgwMCxcbiAgICAgICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICAgICAgZnJvbToge30sXG4gICAgICAgIHRvOiB7fSxcbiAgICAgICAgc3RlcDogZnVuY3Rpb24oKSB7fVxuICAgIH0sIG9wdHMpO1xuXG4gICAgdmFyIGVsZW1lbnQ7XG4gICAgaWYgKHV0aWxzLmlzU3RyaW5nKHBhdGgpKSB7XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQgPSBwYXRoO1xuICAgIH1cblxuICAgIC8vIFJldmVhbCAucGF0aCBhcyBwdWJsaWMgYXR0cmlidXRlXG4gICAgdGhpcy5wYXRoID0gZWxlbWVudDtcbiAgICB0aGlzLl9vcHRzID0gb3B0cztcbiAgICB0aGlzLl90d2VlbmFibGUgPSBudWxsO1xuXG4gICAgLy8gU2V0IHVwIHRoZSBzdGFydGluZyBwb3NpdGlvbnNcbiAgICB2YXIgbGVuZ3RoID0gdGhpcy5wYXRoLmdldFRvdGFsTGVuZ3RoKCk7XG4gICAgdGhpcy5wYXRoLnN0eWxlLnN0cm9rZURhc2hhcnJheSA9IGxlbmd0aCArICcgJyArIGxlbmd0aDtcbiAgICB0aGlzLnNldCgwKTtcbn07XG5cblBhdGgucHJvdG90eXBlLnZhbHVlID0gZnVuY3Rpb24gdmFsdWUoKSB7XG4gICAgdmFyIG9mZnNldCA9IHRoaXMuX2dldENvbXB1dGVkRGFzaE9mZnNldCgpO1xuICAgIHZhciBsZW5ndGggPSB0aGlzLnBhdGguZ2V0VG90YWxMZW5ndGgoKTtcblxuICAgIHZhciBwcm9ncmVzcyA9IDEgLSBvZmZzZXQgLyBsZW5ndGg7XG4gICAgLy8gUm91bmQgbnVtYmVyIHRvIHByZXZlbnQgcmV0dXJuaW5nIHZlcnkgc21hbGwgbnVtYmVyIGxpa2UgMWUtMzAsIHdoaWNoXG4gICAgLy8gaXMgcHJhY3RpY2FsbHkgMFxuICAgIHJldHVybiBwYXJzZUZsb2F0KHByb2dyZXNzLnRvRml4ZWQoNiksIDEwKTtcbn07XG5cblBhdGgucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChwcm9ncmVzcykge1xuICAgIHRoaXMuc3RvcCgpO1xuXG4gICAgdGhpcy5wYXRoLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSB0aGlzLl9wcm9ncmVzc1RvT2Zmc2V0KHByb2dyZXNzKTtcblxuICAgIHZhciBzdGVwID0gdGhpcy5fb3B0cy5zdGVwO1xuICAgIGlmICh1dGlscy5pc0Z1bmN0aW9uKHN0ZXApKSB7XG4gICAgICAgIHZhciBlYXNpbmcgPSB0aGlzLl9lYXNpbmcodGhpcy5fb3B0cy5lYXNpbmcpO1xuICAgICAgICB2YXIgdmFsdWVzID0gdGhpcy5fY2FsY3VsYXRlVG8ocHJvZ3Jlc3MsIGVhc2luZyk7XG4gICAgICAgIHZhciByZWZlcmVuY2UgPSB0aGlzLl9vcHRzLnNoYXBlIHx8IHRoaXM7XG4gICAgICAgIHN0ZXAodmFsdWVzLCByZWZlcmVuY2UsIHRoaXMuX29wdHMuYXR0YWNobWVudCk7XG4gICAgfVxufTtcblxuUGF0aC5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgdGhpcy5fc3RvcFR3ZWVuKCk7XG4gICAgdGhpcy5wYXRoLnN0eWxlLnN0cm9rZURhc2hvZmZzZXQgPSB0aGlzLl9nZXRDb21wdXRlZERhc2hPZmZzZXQoKTtcbn07XG5cbi8vIE1ldGhvZCBpbnRyb2R1Y2VkIGhlcmU6XG4vLyBodHRwOi8vamFrZWFyY2hpYmFsZC5jb20vMjAxMy9hbmltYXRlZC1saW5lLWRyYXdpbmctc3ZnL1xuUGF0aC5wcm90b3R5cGUuYW5pbWF0ZSA9IGZ1bmN0aW9uIGFuaW1hdGUocHJvZ3Jlc3MsIG9wdHMsIGNiKSB7XG4gICAgb3B0cyA9IG9wdHMgfHwge307XG5cbiAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihvcHRzKSkge1xuICAgICAgICBjYiA9IG9wdHM7XG4gICAgICAgIG9wdHMgPSB7fTtcbiAgICB9XG5cbiAgICB2YXIgcGFzc2VkT3B0cyA9IHV0aWxzLmV4dGVuZCh7fSwgb3B0cyk7XG5cbiAgICAvLyBDb3B5IGRlZmF1bHQgb3B0cyB0byBuZXcgb2JqZWN0IHNvIGRlZmF1bHRzIGFyZSBub3QgbW9kaWZpZWRcbiAgICB2YXIgZGVmYXVsdE9wdHMgPSB1dGlscy5leHRlbmQoe30sIHRoaXMuX29wdHMpO1xuICAgIG9wdHMgPSB1dGlscy5leHRlbmQoZGVmYXVsdE9wdHMsIG9wdHMpO1xuXG4gICAgdmFyIHNoaWZ0eUVhc2luZyA9IHRoaXMuX2Vhc2luZyhvcHRzLmVhc2luZyk7XG4gICAgdmFyIHZhbHVlcyA9IHRoaXMuX3Jlc29sdmVGcm9tQW5kVG8ocHJvZ3Jlc3MsIHNoaWZ0eUVhc2luZywgcGFzc2VkT3B0cyk7XG5cbiAgICB0aGlzLnN0b3AoKTtcblxuICAgIC8vIFRyaWdnZXIgYSBsYXlvdXQgc28gc3R5bGVzIGFyZSBjYWxjdWxhdGVkICYgdGhlIGJyb3dzZXJcbiAgICAvLyBwaWNrcyB1cCB0aGUgc3RhcnRpbmcgcG9zaXRpb24gYmVmb3JlIGFuaW1hdGluZ1xuICAgIHRoaXMucGF0aC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIHZhciBvZmZzZXQgPSB0aGlzLl9nZXRDb21wdXRlZERhc2hPZmZzZXQoKTtcbiAgICB2YXIgbmV3T2Zmc2V0ID0gdGhpcy5fcHJvZ3Jlc3NUb09mZnNldChwcm9ncmVzcyk7XG5cbiAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgdGhpcy5fdHdlZW5hYmxlID0gbmV3IFR3ZWVuYWJsZSgpO1xuICAgIHRoaXMuX3R3ZWVuYWJsZS50d2Vlbih7XG4gICAgICAgIGZyb206IHV0aWxzLmV4dGVuZCh7IG9mZnNldDogb2Zmc2V0IH0sIHZhbHVlcy5mcm9tKSxcbiAgICAgICAgdG86IHV0aWxzLmV4dGVuZCh7IG9mZnNldDogbmV3T2Zmc2V0IH0sIHZhbHVlcy50byksXG4gICAgICAgIGR1cmF0aW9uOiBvcHRzLmR1cmF0aW9uLFxuICAgICAgICBlYXNpbmc6IHNoaWZ0eUVhc2luZyxcbiAgICAgICAgc3RlcDogZnVuY3Rpb24oc3RhdGUpIHtcbiAgICAgICAgICAgIHNlbGYucGF0aC5zdHlsZS5zdHJva2VEYXNob2Zmc2V0ID0gc3RhdGUub2Zmc2V0O1xuICAgICAgICAgICAgdmFyIHJlZmVyZW5jZSA9IG9wdHMuc2hhcGUgfHwgc2VsZjtcbiAgICAgICAgICAgIG9wdHMuc3RlcChzdGF0ZSwgcmVmZXJlbmNlLCBvcHRzLmF0dGFjaG1lbnQpO1xuICAgICAgICB9LFxuICAgICAgICBmaW5pc2g6IGZ1bmN0aW9uKHN0YXRlKSB7XG4gICAgICAgICAgICBpZiAodXRpbHMuaXNGdW5jdGlvbihjYikpIHtcbiAgICAgICAgICAgICAgICBjYigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59O1xuXG5QYXRoLnByb3RvdHlwZS5fZ2V0Q29tcHV0ZWREYXNoT2Zmc2V0ID0gZnVuY3Rpb24gX2dldENvbXB1dGVkRGFzaE9mZnNldCgpIHtcbiAgICB2YXIgY29tcHV0ZWRTdHlsZSA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMucGF0aCwgbnVsbCk7XG4gICAgcmV0dXJuIHBhcnNlRmxvYXQoY29tcHV0ZWRTdHlsZS5nZXRQcm9wZXJ0eVZhbHVlKCdzdHJva2UtZGFzaG9mZnNldCcpLCAxMCk7XG59O1xuXG5QYXRoLnByb3RvdHlwZS5fcHJvZ3Jlc3NUb09mZnNldCA9IGZ1bmN0aW9uIF9wcm9ncmVzc1RvT2Zmc2V0KHByb2dyZXNzKSB7XG4gICAgdmFyIGxlbmd0aCA9IHRoaXMucGF0aC5nZXRUb3RhbExlbmd0aCgpO1xuICAgIHJldHVybiBsZW5ndGggLSBwcm9ncmVzcyAqIGxlbmd0aDtcbn07XG5cbi8vIFJlc29sdmVzIGZyb20gYW5kIHRvIHZhbHVlcyBmb3IgYW5pbWF0aW9uLlxuUGF0aC5wcm90b3R5cGUuX3Jlc29sdmVGcm9tQW5kVG8gPSBmdW5jdGlvbiBfcmVzb2x2ZUZyb21BbmRUbyhwcm9ncmVzcywgZWFzaW5nLCBvcHRzKSB7XG4gICAgaWYgKG9wdHMuZnJvbSAmJiBvcHRzLnRvKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmcm9tOiBvcHRzLmZyb20sXG4gICAgICAgICAgICB0bzogb3B0cy50b1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGZyb206IHRoaXMuX2NhbGN1bGF0ZUZyb20oZWFzaW5nKSxcbiAgICAgICAgdG86IHRoaXMuX2NhbGN1bGF0ZVRvKHByb2dyZXNzLCBlYXNpbmcpXG4gICAgfTtcbn07XG5cbi8vIENhbGN1bGF0ZSBgZnJvbWAgdmFsdWVzIGZyb20gb3B0aW9ucyBwYXNzZWQgYXQgaW5pdGlhbGl6YXRpb25cblBhdGgucHJvdG90eXBlLl9jYWxjdWxhdGVGcm9tID0gZnVuY3Rpb24gX2NhbGN1bGF0ZUZyb20oZWFzaW5nKSB7XG4gICAgcmV0dXJuIFR3ZWVuYWJsZS5pbnRlcnBvbGF0ZSh0aGlzLl9vcHRzLmZyb20sIHRoaXMuX29wdHMudG8sIHRoaXMudmFsdWUoKSwgZWFzaW5nKTtcbn07XG5cbi8vIENhbGN1bGF0ZSBgdG9gIHZhbHVlcyBmcm9tIG9wdGlvbnMgcGFzc2VkIGF0IGluaXRpYWxpemF0aW9uXG5QYXRoLnByb3RvdHlwZS5fY2FsY3VsYXRlVG8gPSBmdW5jdGlvbiBfY2FsY3VsYXRlVG8ocHJvZ3Jlc3MsIGVhc2luZykge1xuICAgIHJldHVybiBUd2VlbmFibGUuaW50ZXJwb2xhdGUodGhpcy5fb3B0cy5mcm9tLCB0aGlzLl9vcHRzLnRvLCBwcm9ncmVzcywgZWFzaW5nKTtcbn07XG5cblBhdGgucHJvdG90eXBlLl9zdG9wVHdlZW4gPSBmdW5jdGlvbiBfc3RvcFR3ZWVuKCkge1xuICAgIGlmICh0aGlzLl90d2VlbmFibGUgIT09IG51bGwpIHtcbiAgICAgICAgdGhpcy5fdHdlZW5hYmxlLnN0b3AoKTtcbiAgICAgICAgdGhpcy5fdHdlZW5hYmxlID0gbnVsbDtcbiAgICB9XG59O1xuXG5QYXRoLnByb3RvdHlwZS5fZWFzaW5nID0gZnVuY3Rpb24gX2Vhc2luZyhlYXNpbmcpIHtcbiAgICBpZiAoRUFTSU5HX0FMSUFTRVMuaGFzT3duUHJvcGVydHkoZWFzaW5nKSkge1xuICAgICAgICByZXR1cm4gRUFTSU5HX0FMSUFTRVNbZWFzaW5nXTtcbiAgICB9XG5cbiAgICByZXR1cm4gZWFzaW5nO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXRoO1xuIiwiLy8gU2VtaS1TZW1pQ2lyY2xlIHNoYXBlZCBwcm9ncmVzcyBiYXJcblxudmFyIFNoYXBlID0gcmVxdWlyZSgnLi9zaGFwZScpO1xudmFyIENpcmNsZSA9IHJlcXVpcmUoJy4vY2lyY2xlJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBTZW1pQ2lyY2xlID0gZnVuY3Rpb24gU2VtaUNpcmNsZShjb250YWluZXIsIG9wdGlvbnMpIHtcbiAgICAvLyBVc2Ugb25lIGFyYyB0byBmb3JtIGEgU2VtaUNpcmNsZVxuICAgIC8vIFNlZSB0aGlzIGFuc3dlciBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8xMDQ3NzMzNC8xNDQ2MDkyXG4gICAgdGhpcy5fcGF0aFRlbXBsYXRlID1cbiAgICAgICAgJ00gNTAsNTAgbSAte3JhZGl1c30sMCcgK1xuICAgICAgICAnIGEge3JhZGl1c30se3JhZGl1c30gMCAxIDEgezJyYWRpdXN9LDAnO1xuXG4gICAgdGhpcy5jb250YWluZXJBc3BlY3RSYXRpbyA9IDI7XG5cbiAgICBTaGFwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xufTtcblxuU2VtaUNpcmNsZS5wcm90b3R5cGUgPSBuZXcgU2hhcGUoKTtcblNlbWlDaXJjbGUucHJvdG90eXBlLmNvbnN0cnVjdG9yID0gU2VtaUNpcmNsZTtcblxuU2VtaUNpcmNsZS5wcm90b3R5cGUuX2luaXRpYWxpemVTdmcgPSBmdW5jdGlvbiBfaW5pdGlhbGl6ZVN2ZyhzdmcsIG9wdHMpIHtcbiAgICBzdmcuc2V0QXR0cmlidXRlKCd2aWV3Qm94JywgJzAgMCAxMDAgNTAnKTtcbn07XG5cblNlbWlDaXJjbGUucHJvdG90eXBlLl9pbml0aWFsaXplVGV4dENvbnRhaW5lciA9IGZ1bmN0aW9uIF9pbml0aWFsaXplVGV4dENvbnRhaW5lcihcbiAgICBvcHRzLFxuICAgIGNvbnRhaW5lcixcbiAgICB0ZXh0Q29udGFpbmVyXG4pIHtcbiAgICBpZiAob3B0cy50ZXh0LnN0eWxlKSB7XG4gICAgICAgIC8vIFJlc2V0IHRvcCBzdHlsZVxuICAgICAgICB0ZXh0Q29udGFpbmVyLnN0eWxlLnRvcCA9ICdhdXRvJztcbiAgICAgICAgdGV4dENvbnRhaW5lci5zdHlsZS5ib3R0b20gPSAnMCc7XG5cbiAgICAgICAgaWYgKG9wdHMudGV4dC5hbGlnblRvQm90dG9tKSB7XG4gICAgICAgICAgICB1dGlscy5zZXRTdHlsZSh0ZXh0Q29udGFpbmVyLCAndHJhbnNmb3JtJywgJ3RyYW5zbGF0ZSgtNTAlLCAwKScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdXRpbHMuc2V0U3R5bGUodGV4dENvbnRhaW5lciwgJ3RyYW5zZm9ybScsICd0cmFuc2xhdGUoLTUwJSwgNTAlKScpO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuLy8gU2hhcmUgZnVuY3Rpb25hbGl0eSB3aXRoIENpcmNsZSwganVzdCBoYXZlIGRpZmZlcmVudCBwYXRoXG5TZW1pQ2lyY2xlLnByb3RvdHlwZS5fcGF0aFN0cmluZyA9IENpcmNsZS5wcm90b3R5cGUuX3BhdGhTdHJpbmc7XG5TZW1pQ2lyY2xlLnByb3RvdHlwZS5fdHJhaWxTdHJpbmcgPSBDaXJjbGUucHJvdG90eXBlLl90cmFpbFN0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBTZW1pQ2lyY2xlO1xuIiwiLy8gQmFzZSBvYmplY3QgZm9yIGRpZmZlcmVudCBwcm9ncmVzcyBiYXIgc2hhcGVzXG5cbnZhciBQYXRoID0gcmVxdWlyZSgnLi9wYXRoJyk7XG52YXIgdXRpbHMgPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbnZhciBERVNUUk9ZRURfRVJST1IgPSAnT2JqZWN0IGlzIGRlc3Ryb3llZCc7XG5cbnZhciBTaGFwZSA9IGZ1bmN0aW9uIFNoYXBlKGNvbnRhaW5lciwgb3B0cykge1xuICAgIC8vIFRocm93IGEgYmV0dGVyIGVycm9yIGlmIHByb2dyZXNzIGJhcnMgYXJlIG5vdCBpbml0aWFsaXplZCB3aXRoIGBuZXdgXG4gICAgLy8ga2V5d29yZFxuICAgIGlmICghKHRoaXMgaW5zdGFuY2VvZiBTaGFwZSkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDb25zdHJ1Y3RvciB3YXMgY2FsbGVkIHdpdGhvdXQgbmV3IGtleXdvcmQnKTtcbiAgICB9XG5cbiAgICAvLyBQcmV2ZW50IGNhbGxpbmcgY29uc3RydWN0b3Igd2l0aG91dCBwYXJhbWV0ZXJzIHNvIGluaGVyaXRhbmNlXG4gICAgLy8gd29ya3MgY29ycmVjdGx5LiBUbyB1bmRlcnN0YW5kLCB0aGlzIGlzIGhvdyBTaGFwZSBpcyBpbmhlcml0ZWQ6XG4gICAgLy9cbiAgICAvLyAgIExpbmUucHJvdG90eXBlID0gbmV3IFNoYXBlKCk7XG4gICAgLy9cbiAgICAvLyBXZSBqdXN0IHdhbnQgdG8gc2V0IHRoZSBwcm90b3R5cGUgZm9yIExpbmUuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIERlZmF1bHQgcGFyYW1ldGVycyBmb3IgcHJvZ3Jlc3MgYmFyIGNyZWF0aW9uXG4gICAgdGhpcy5fb3B0cyA9IHV0aWxzLmV4dGVuZCh7XG4gICAgICAgIGNvbG9yOiAnIzU1NScsXG4gICAgICAgIHN0cm9rZVdpZHRoOiAxLjAsXG4gICAgICAgIHRyYWlsQ29sb3I6IG51bGwsXG4gICAgICAgIHRyYWlsV2lkdGg6IG51bGwsXG4gICAgICAgIGZpbGw6IG51bGwsXG4gICAgICAgIHRleHQ6IHtcbiAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgY29sb3I6IG51bGwsXG4gICAgICAgICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgICAgICAgbGVmdDogJzUwJScsXG4gICAgICAgICAgICAgICAgdG9wOiAnNTAlJyxcbiAgICAgICAgICAgICAgICBwYWRkaW5nOiAwLFxuICAgICAgICAgICAgICAgIG1hcmdpbjogMCxcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IHtcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogJ3RyYW5zbGF0ZSgtNTAlLCAtNTAlKSdcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXV0b1N0eWxlQ29udGFpbmVyOiB0cnVlLFxuICAgICAgICAgICAgYWxpZ25Ub0JvdHRvbTogdHJ1ZSxcbiAgICAgICAgICAgIHZhbHVlOiBudWxsLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAncHJvZ3Jlc3NiYXItdGV4dCdcbiAgICAgICAgfSxcbiAgICAgICAgc3ZnU3R5bGU6IHtcbiAgICAgICAgICAgIGRpc3BsYXk6ICdibG9jaycsXG4gICAgICAgICAgICB3aWR0aDogJzEwMCUnXG4gICAgICAgIH1cbiAgICB9LCBvcHRzLCB0cnVlKTsgIC8vIFVzZSByZWN1cnNpdmUgZXh0ZW5kXG5cbiAgICAvLyBJZiB1c2VyIHNwZWNpZmllcyBlLmcuIHN2Z1N0eWxlIG9yIHRleHQgc3R5bGUsIHRoZSB3aG9sZSBvYmplY3RcbiAgICAvLyBzaG91bGQgcmVwbGFjZSB0aGUgZGVmYXVsdHMgdG8gbWFrZSB3b3JraW5nIHdpdGggc3R5bGVzIGVhc2llclxuICAgIGlmICh1dGlscy5pc09iamVjdChvcHRzKSAmJiBvcHRzLnN2Z1N0eWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fb3B0cy5zdmdTdHlsZSA9IG9wdHMuc3ZnU3R5bGU7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc09iamVjdChvcHRzKSAmJiB1dGlscy5pc09iamVjdChvcHRzLnRleHQpICYmIG9wdHMudGV4dC5zdHlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX29wdHMudGV4dC5zdHlsZSA9IG9wdHMudGV4dC5zdHlsZTtcbiAgICB9XG5cbiAgICB2YXIgc3ZnVmlldyA9IHRoaXMuX2NyZWF0ZVN2Z1ZpZXcodGhpcy5fb3B0cyk7XG5cbiAgICB2YXIgZWxlbWVudDtcbiAgICBpZiAodXRpbHMuaXNTdHJpbmcoY29udGFpbmVyKSkge1xuICAgICAgICBlbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcihjb250YWluZXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGVsZW1lbnQgPSBjb250YWluZXI7XG4gICAgfVxuXG4gICAgaWYgKCFlbGVtZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignQ29udGFpbmVyIGRvZXMgbm90IGV4aXN0OiAnICsgY29udGFpbmVyKTtcbiAgICB9XG5cbiAgICB0aGlzLl9jb250YWluZXIgPSBlbGVtZW50O1xuICAgIHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZChzdmdWaWV3LnN2Zyk7XG4gICAgdGhpcy5fd2FybkNvbnRhaW5lckFzcGVjdFJhdGlvKHRoaXMuX2NvbnRhaW5lcik7XG5cbiAgICBpZiAodGhpcy5fb3B0cy5zdmdTdHlsZSkge1xuICAgICAgICB1dGlscy5zZXRTdHlsZXMoc3ZnVmlldy5zdmcsIHRoaXMuX29wdHMuc3ZnU3R5bGUpO1xuICAgIH1cblxuICAgIC8vIEV4cG9zZSBwdWJsaWMgYXR0cmlidXRlcyBiZWZvcmUgUGF0aCBpbml0aWFsaXphdGlvblxuICAgIHRoaXMuc3ZnID0gc3ZnVmlldy5zdmc7XG4gICAgdGhpcy5wYXRoID0gc3ZnVmlldy5wYXRoO1xuICAgIHRoaXMudHJhaWwgPSBzdmdWaWV3LnRyYWlsO1xuICAgIHRoaXMudGV4dCA9IG51bGw7XG5cbiAgICB2YXIgbmV3T3B0cyA9IHV0aWxzLmV4dGVuZCh7XG4gICAgICAgIGF0dGFjaG1lbnQ6IHVuZGVmaW5lZCxcbiAgICAgICAgc2hhcGU6IHRoaXNcbiAgICB9LCB0aGlzLl9vcHRzKTtcbiAgICB0aGlzLl9wcm9ncmVzc1BhdGggPSBuZXcgUGF0aChzdmdWaWV3LnBhdGgsIG5ld09wdHMpO1xuXG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KHRoaXMuX29wdHMudGV4dCkgJiYgdGhpcy5fb3B0cy50ZXh0LnZhbHVlICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMuc2V0VGV4dCh0aGlzLl9vcHRzLnRleHQudmFsdWUpO1xuICAgIH1cbn07XG5cblNoYXBlLnByb3RvdHlwZS5hbmltYXRlID0gZnVuY3Rpb24gYW5pbWF0ZShwcm9ncmVzcywgb3B0cywgY2IpIHtcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihERVNUUk9ZRURfRVJST1IpO1xuICAgIH1cblxuICAgIHRoaXMuX3Byb2dyZXNzUGF0aC5hbmltYXRlKHByb2dyZXNzLCBvcHRzLCBjYik7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuc3RvcCA9IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgaWYgKHRoaXMuX3Byb2dyZXNzUGF0aCA9PT0gbnVsbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoREVTVFJPWUVEX0VSUk9SKTtcbiAgICB9XG5cbiAgICAvLyBEb24ndCBjcmFzaCBpZiBzdG9wIGlzIGNhbGxlZCBpbnNpZGUgc3RlcCBmdW5jdGlvblxuICAgIGlmICh0aGlzLl9wcm9ncmVzc1BhdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5fcHJvZ3Jlc3NQYXRoLnN0b3AoKTtcbn07XG5cblNoYXBlLnByb3RvdHlwZS5kZXN0cm95ID0gZnVuY3Rpb24gZGVzdHJveSgpIHtcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihERVNUUk9ZRURfRVJST1IpO1xuICAgIH1cblxuICAgIHRoaXMuc3RvcCgpO1xuICAgIHRoaXMuc3ZnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodGhpcy5zdmcpO1xuICAgIHRoaXMuc3ZnID0gbnVsbDtcbiAgICB0aGlzLnBhdGggPSBudWxsO1xuICAgIHRoaXMudHJhaWwgPSBudWxsO1xuICAgIHRoaXMuX3Byb2dyZXNzUGF0aCA9IG51bGw7XG5cbiAgICBpZiAodGhpcy50ZXh0ICE9PSBudWxsKSB7XG4gICAgICAgIHRoaXMudGV4dC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMudGV4dCk7XG4gICAgICAgIHRoaXMudGV4dCA9IG51bGw7XG4gICAgfVxufTtcblxuU2hhcGUucHJvdG90eXBlLnNldCA9IGZ1bmN0aW9uIHNldChwcm9ncmVzcykge1xuICAgIGlmICh0aGlzLl9wcm9ncmVzc1BhdGggPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKERFU1RST1lFRF9FUlJPUik7XG4gICAgfVxuXG4gICAgdGhpcy5fcHJvZ3Jlc3NQYXRoLnNldChwcm9ncmVzcyk7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUudmFsdWUgPSBmdW5jdGlvbiB2YWx1ZSgpIHtcbiAgICBpZiAodGhpcy5fcHJvZ3Jlc3NQYXRoID09PSBudWxsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihERVNUUk9ZRURfRVJST1IpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9wcm9ncmVzc1BhdGggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5fcHJvZ3Jlc3NQYXRoLnZhbHVlKCk7XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuc2V0VGV4dCA9IGZ1bmN0aW9uIHNldFRleHQobmV3VGV4dCkge1xuICAgIGlmICh0aGlzLl9wcm9ncmVzc1BhdGggPT09IG51bGwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKERFU1RST1lFRF9FUlJPUik7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGV4dCA9PT0gbnVsbCkge1xuICAgICAgICAvLyBDcmVhdGUgbmV3IHRleHQgbm9kZVxuICAgICAgICB0aGlzLnRleHQgPSB0aGlzLl9jcmVhdGVUZXh0Q29udGFpbmVyKHRoaXMuX29wdHMsIHRoaXMuX2NvbnRhaW5lcik7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLnRleHQpO1xuICAgIH1cblxuICAgIC8vIFJlbW92ZSBwcmV2aW91cyB0ZXh0IGFuZCBhZGQgbmV3XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KG5ld1RleHQpKSB7XG4gICAgICAgIHV0aWxzLnJlbW92ZUNoaWxkcmVuKHRoaXMudGV4dCk7XG4gICAgICAgIHRoaXMudGV4dC5hcHBlbmRDaGlsZChuZXdUZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnRleHQuaW5uZXJIVE1MID0gbmV3VGV4dDtcbiAgICB9XG59O1xuXG5TaGFwZS5wcm90b3R5cGUuX2NyZWF0ZVN2Z1ZpZXcgPSBmdW5jdGlvbiBfY3JlYXRlU3ZnVmlldyhvcHRzKSB7XG4gICAgdmFyIHN2ZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCAnc3ZnJyk7XG4gICAgdGhpcy5faW5pdGlhbGl6ZVN2ZyhzdmcsIG9wdHMpO1xuXG4gICAgdmFyIHRyYWlsUGF0aCA9IG51bGw7XG4gICAgLy8gRWFjaCBvcHRpb24gbGlzdGVkIGluIHRoZSBpZiBjb25kaXRpb24gYXJlICd0cmlnZ2VycycgZm9yIGNyZWF0aW5nXG4gICAgLy8gdGhlIHRyYWlsIHBhdGhcbiAgICBpZiAob3B0cy50cmFpbENvbG9yIHx8IG9wdHMudHJhaWxXaWR0aCkge1xuICAgICAgICB0cmFpbFBhdGggPSB0aGlzLl9jcmVhdGVUcmFpbChvcHRzKTtcbiAgICAgICAgc3ZnLmFwcGVuZENoaWxkKHRyYWlsUGF0aCk7XG4gICAgfVxuXG4gICAgdmFyIHBhdGggPSB0aGlzLl9jcmVhdGVQYXRoKG9wdHMpO1xuICAgIHN2Zy5hcHBlbmRDaGlsZChwYXRoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHN2Zzogc3ZnLFxuICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICB0cmFpbDogdHJhaWxQYXRoXG4gICAgfTtcbn07XG5cblNoYXBlLnByb3RvdHlwZS5faW5pdGlhbGl6ZVN2ZyA9IGZ1bmN0aW9uIF9pbml0aWFsaXplU3ZnKHN2Zywgb3B0cykge1xuICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3ZpZXdCb3gnLCAnMCAwIDEwMCAxMDAnKTtcbn07XG5cblNoYXBlLnByb3RvdHlwZS5fY3JlYXRlUGF0aCA9IGZ1bmN0aW9uIF9jcmVhdGVQYXRoKG9wdHMpIHtcbiAgICB2YXIgcGF0aFN0cmluZyA9IHRoaXMuX3BhdGhTdHJpbmcob3B0cyk7XG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVBhdGhFbGVtZW50KHBhdGhTdHJpbmcsIG9wdHMpO1xufTtcblxuU2hhcGUucHJvdG90eXBlLl9jcmVhdGVUcmFpbCA9IGZ1bmN0aW9uIF9jcmVhdGVUcmFpbChvcHRzKSB7XG4gICAgLy8gQ3JlYXRlIHBhdGggc3RyaW5nIHdpdGggb3JpZ2luYWwgcGFzc2VkIG9wdGlvbnNcbiAgICB2YXIgcGF0aFN0cmluZyA9IHRoaXMuX3RyYWlsU3RyaW5nKG9wdHMpO1xuXG4gICAgLy8gUHJldmVudCBtb2RpZnlpbmcgb3JpZ2luYWxcbiAgICB2YXIgbmV3T3B0cyA9IHV0aWxzLmV4dGVuZCh7fSwgb3B0cyk7XG5cbiAgICAvLyBEZWZhdWx0cyBmb3IgcGFyYW1ldGVycyB3aGljaCBtb2RpZnkgdHJhaWwgcGF0aFxuICAgIGlmICghbmV3T3B0cy50cmFpbENvbG9yKSB7XG4gICAgICAgIG5ld09wdHMudHJhaWxDb2xvciA9ICcjZWVlJztcbiAgICB9XG4gICAgaWYgKCFuZXdPcHRzLnRyYWlsV2lkdGgpIHtcbiAgICAgICAgbmV3T3B0cy50cmFpbFdpZHRoID0gbmV3T3B0cy5zdHJva2VXaWR0aDtcbiAgICB9XG5cbiAgICBuZXdPcHRzLmNvbG9yID0gbmV3T3B0cy50cmFpbENvbG9yO1xuICAgIG5ld09wdHMuc3Ryb2tlV2lkdGggPSBuZXdPcHRzLnRyYWlsV2lkdGg7XG5cbiAgICAvLyBXaGVuIHRyYWlsIHBhdGggaXMgc2V0LCBmaWxsIG11c3QgYmUgc2V0IGZvciBpdCBpbnN0ZWFkIG9mIHRoZVxuICAgIC8vIGFjdHVhbCBwYXRoIHRvIHByZXZlbnQgdHJhaWwgc3Ryb2tlIGZyb20gY2xpcHBpbmdcbiAgICBuZXdPcHRzLmZpbGwgPSBudWxsO1xuXG4gICAgcmV0dXJuIHRoaXMuX2NyZWF0ZVBhdGhFbGVtZW50KHBhdGhTdHJpbmcsIG5ld09wdHMpO1xufTtcblxuU2hhcGUucHJvdG90eXBlLl9jcmVhdGVQYXRoRWxlbWVudCA9IGZ1bmN0aW9uIF9jcmVhdGVQYXRoRWxlbWVudChwYXRoU3RyaW5nLCBvcHRzKSB7XG4gICAgdmFyIHBhdGggPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3BhdGgnKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZCcsIHBhdGhTdHJpbmcpO1xuICAgIHBhdGguc2V0QXR0cmlidXRlKCdzdHJva2UnLCBvcHRzLmNvbG9yKTtcbiAgICBwYXRoLnNldEF0dHJpYnV0ZSgnc3Ryb2tlLXdpZHRoJywgb3B0cy5zdHJva2VXaWR0aCk7XG5cbiAgICBpZiAob3B0cy5maWxsKSB7XG4gICAgICAgIHBhdGguc2V0QXR0cmlidXRlKCdmaWxsJywgb3B0cy5maWxsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwYXRoLnNldEF0dHJpYnV0ZSgnZmlsbC1vcGFjaXR5JywgJzAnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGF0aDtcbn07XG5cblNoYXBlLnByb3RvdHlwZS5fY3JlYXRlVGV4dENvbnRhaW5lciA9IGZ1bmN0aW9uIF9jcmVhdGVUZXh0Q29udGFpbmVyKG9wdHMsIGNvbnRhaW5lcikge1xuICAgIHZhciB0ZXh0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGV4dENvbnRhaW5lci5jbGFzc05hbWUgPSBvcHRzLnRleHQuY2xhc3NOYW1lO1xuXG4gICAgdmFyIHRleHRTdHlsZSA9IG9wdHMudGV4dC5zdHlsZTtcbiAgICBpZiAodGV4dFN0eWxlKSB7XG4gICAgICAgIGlmIChvcHRzLnRleHQuYXV0b1N0eWxlQ29udGFpbmVyKSB7XG4gICAgICAgICAgICBjb250YWluZXIuc3R5bGUucG9zaXRpb24gPSAncmVsYXRpdmUnO1xuICAgICAgICB9XG5cbiAgICAgICAgdXRpbHMuc2V0U3R5bGVzKHRleHRDb250YWluZXIsIHRleHRTdHlsZSk7XG4gICAgICAgIC8vIERlZmF1bHQgdGV4dCBjb2xvciB0byBwcm9ncmVzcyBiYXIncyBjb2xvclxuICAgICAgICBpZiAoIXRleHRTdHlsZS5jb2xvcikge1xuICAgICAgICAgICAgdGV4dENvbnRhaW5lci5zdHlsZS5jb2xvciA9IG9wdHMuY29sb3I7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLl9pbml0aWFsaXplVGV4dENvbnRhaW5lcihvcHRzLCBjb250YWluZXIsIHRleHRDb250YWluZXIpO1xuICAgIHJldHVybiB0ZXh0Q29udGFpbmVyO1xufTtcblxuLy8gR2l2ZSBjdXN0b20gc2hhcGVzIHBvc3NpYmlsaXR5IHRvIG1vZGlmeSB0ZXh0IGVsZW1lbnRcblNoYXBlLnByb3RvdHlwZS5faW5pdGlhbGl6ZVRleHRDb250YWluZXIgPSBmdW5jdGlvbihvcHRzLCBjb250YWluZXIsIGVsZW1lbnQpIHtcbiAgICAvLyBCeSBkZWZhdWx0LCBuby1vcFxuICAgIC8vIEN1c3RvbSBzaGFwZXMgc2hvdWxkIHJlc3BlY3QgQVBJIG9wdGlvbnMsIHN1Y2ggYXMgdGV4dC5zdHlsZVxufTtcblxuU2hhcGUucHJvdG90eXBlLl9wYXRoU3RyaW5nID0gZnVuY3Rpb24gX3BhdGhTdHJpbmcob3B0cykge1xuICAgIHRocm93IG5ldyBFcnJvcignT3ZlcnJpZGUgdGhpcyBmdW5jdGlvbiBmb3IgZWFjaCBwcm9ncmVzcyBiYXInKTtcbn07XG5cblNoYXBlLnByb3RvdHlwZS5fdHJhaWxTdHJpbmcgPSBmdW5jdGlvbiBfdHJhaWxTdHJpbmcob3B0cykge1xuICAgIHRocm93IG5ldyBFcnJvcignT3ZlcnJpZGUgdGhpcyBmdW5jdGlvbiBmb3IgZWFjaCBwcm9ncmVzcyBiYXInKTtcbn07XG5cblNoYXBlLnByb3RvdHlwZS5fd2FybkNvbnRhaW5lckFzcGVjdFJhdGlvID0gZnVuY3Rpb24gX3dhcm5Db250YWluZXJBc3BlY3RSYXRpbyhjb250YWluZXIpIHtcbiAgICBpZiAoIXRoaXMuY29udGFpbmVyQXNwZWN0UmF0aW8pIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHZhciBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoY29udGFpbmVyLCBudWxsKTtcbiAgICB2YXIgd2lkdGggPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnd2lkdGgnKSwgMTApO1xuICAgIHZhciBoZWlnaHQgPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnaGVpZ2h0JyksIDEwKTtcbiAgICBpZiAoIXV0aWxzLmZsb2F0RXF1YWxzKHRoaXMuY29udGFpbmVyQXNwZWN0UmF0aW8sIHdpZHRoIC8gaGVpZ2h0KSkge1xuICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAnSW5jb3JyZWN0IGFzcGVjdCByYXRpbyBvZiBjb250YWluZXInLFxuICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLFxuICAgICAgICAgICAgJ2RldGVjdGVkOicsXG4gICAgICAgICAgICBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ3dpZHRoJykgKyAnKHdpZHRoKScsXG4gICAgICAgICAgICAnLycsXG4gICAgICAgICAgICBjb21wdXRlZFN0eWxlLmdldFByb3BlcnR5VmFsdWUoJ2hlaWdodCcpICsgJyhoZWlnaHQpJyxcbiAgICAgICAgICAgICc9JyxcbiAgICAgICAgICAgIHdpZHRoIC8gaGVpZ2h0XG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgJ0FzcGVjdCByYXRpbyBvZiBzaG91bGQgYmUnLFxuICAgICAgICAgICAgdGhpcy5jb250YWluZXJBc3BlY3RSYXRpb1xuICAgICAgICApO1xuICAgIH1cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcGU7XG4iLCIvLyBVdGlsaXR5IGZ1bmN0aW9uc1xuXG52YXIgUFJFRklYRVMgPSAnV2Via2l0IE1veiBPIG1zJy5zcGxpdCgnICcpO1xudmFyIEZMT0FUX0NPTVBBUklTT05fRVBTSUxPTiA9IDAuMDAxO1xuXG4vLyBDb3B5IGFsbCBhdHRyaWJ1dGVzIGZyb20gc291cmNlIG9iamVjdCB0byBkZXN0aW5hdGlvbiBvYmplY3QuXG4vLyBkZXN0aW5hdGlvbiBvYmplY3QgaXMgbXV0YXRlZC5cbmZ1bmN0aW9uIGV4dGVuZChkZXN0aW5hdGlvbiwgc291cmNlLCByZWN1cnNpdmUpIHtcbiAgICBkZXN0aW5hdGlvbiA9IGRlc3RpbmF0aW9uIHx8IHt9O1xuICAgIHNvdXJjZSA9IHNvdXJjZSB8fCB7fTtcbiAgICByZWN1cnNpdmUgPSByZWN1cnNpdmUgfHwgZmFsc2U7XG5cbiAgICBmb3IgKHZhciBhdHRyTmFtZSBpbiBzb3VyY2UpIHtcbiAgICAgICAgaWYgKHNvdXJjZS5oYXNPd25Qcm9wZXJ0eShhdHRyTmFtZSkpIHtcbiAgICAgICAgICAgIHZhciBkZXN0VmFsID0gZGVzdGluYXRpb25bYXR0ck5hbWVdO1xuICAgICAgICAgICAgdmFyIHNvdXJjZVZhbCA9IHNvdXJjZVthdHRyTmFtZV07XG4gICAgICAgICAgICBpZiAocmVjdXJzaXZlICYmIGlzT2JqZWN0KGRlc3RWYWwpICYmIGlzT2JqZWN0KHNvdXJjZVZhbCkpIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblthdHRyTmFtZV0gPSBleHRlbmQoZGVzdFZhbCwgc291cmNlVmFsLCByZWN1cnNpdmUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvblthdHRyTmFtZV0gPSBzb3VyY2VWYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZGVzdGluYXRpb247XG59XG5cbi8vIFJlbmRlcnMgdGVtcGxhdGVzIHdpdGggZ2l2ZW4gdmFyaWFibGVzLiBWYXJpYWJsZXMgbXVzdCBiZSBzdXJyb3VuZGVkIHdpdGhcbi8vIGJyYWNlcyB3aXRob3V0IGFueSBzcGFjZXMsIGUuZy4ge3ZhcmlhYmxlfVxuLy8gQWxsIGluc3RhbmNlcyBvZiB2YXJpYWJsZSBwbGFjZWhvbGRlcnMgd2lsbCBiZSByZXBsYWNlZCB3aXRoIGdpdmVuIGNvbnRlbnRcbi8vIEV4YW1wbGU6XG4vLyByZW5kZXIoJ0hlbGxvLCB7bWVzc2FnZX0hJywge21lc3NhZ2U6ICd3b3JsZCd9KVxuZnVuY3Rpb24gcmVuZGVyKHRlbXBsYXRlLCB2YXJzKSB7XG4gICAgdmFyIHJlbmRlcmVkID0gdGVtcGxhdGU7XG5cbiAgICBmb3IgKHZhciBrZXkgaW4gdmFycykge1xuICAgICAgICBpZiAodmFycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICB2YXIgdmFsID0gdmFyc1trZXldO1xuICAgICAgICAgICAgdmFyIHJlZ0V4cFN0cmluZyA9ICdcXFxceycgKyBrZXkgKyAnXFxcXH0nO1xuICAgICAgICAgICAgdmFyIHJlZ0V4cCA9IG5ldyBSZWdFeHAocmVnRXhwU3RyaW5nLCAnZycpO1xuXG4gICAgICAgICAgICByZW5kZXJlZCA9IHJlbmRlcmVkLnJlcGxhY2UocmVnRXhwLCB2YWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlbmRlcmVkO1xufVxuXG5mdW5jdGlvbiBzZXRTdHlsZShlbGVtZW50LCBzdHlsZSwgdmFsdWUpIHtcbiAgICB2YXIgZWxTdHlsZSA9IGVsZW1lbnQuc3R5bGU7ICAvLyBjYWNoZSBmb3IgcGVyZm9ybWFuY2VcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgUFJFRklYRVMubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHByZWZpeCA9IFBSRUZJWEVTW2ldO1xuICAgICAgICBlbFN0eWxlW3ByZWZpeCArIGNhcGl0YWxpemUoc3R5bGUpXSA9IHZhbHVlO1xuICAgIH1cblxuICAgIGVsU3R5bGVbc3R5bGVdID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIHNldFN0eWxlcyhlbGVtZW50LCBzdHlsZXMpIHtcbiAgICBmb3JFYWNoT2JqZWN0KHN0eWxlcywgZnVuY3Rpb24oc3R5bGVWYWx1ZSwgc3R5bGVOYW1lKSB7XG4gICAgICAgIC8vIEFsbG93IGRpc2FibGluZyBzb21lIGluZGl2aWR1YWwgc3R5bGVzIGJ5IHNldHRpbmcgdGhlbVxuICAgICAgICAvLyB0byBudWxsIG9yIHVuZGVmaW5lZFxuICAgICAgICBpZiAoc3R5bGVWYWx1ZSA9PT0gbnVsbCB8fCBzdHlsZVZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIElmIHN0eWxlJ3MgdmFsdWUgaXMge3ByZWZpeDogdHJ1ZSwgdmFsdWU6ICc1MCUnfSxcbiAgICAgICAgLy8gU2V0IGFsc28gYnJvd3NlciBwcmVmaXhlZCBzdHlsZXNcbiAgICAgICAgaWYgKGlzT2JqZWN0KHN0eWxlVmFsdWUpICYmIHN0eWxlVmFsdWUucHJlZml4ID09PSB0cnVlKSB7XG4gICAgICAgICAgICBzZXRTdHlsZShlbGVtZW50LCBzdHlsZU5hbWUsIHN0eWxlVmFsdWUudmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZVtzdHlsZU5hbWVdID0gc3R5bGVWYWx1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBjYXBpdGFsaXplKHRleHQpIHtcbiAgICByZXR1cm4gdGV4dC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHRleHQuc2xpY2UoMSk7XG59XG5cbmZ1bmN0aW9uIGlzU3RyaW5nKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCBvYmogaW5zdGFuY2VvZiBTdHJpbmc7XG59XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24ob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzQXJyYXkob2JqKSB7XG4gICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChvYmopID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vLyBSZXR1cm5zIHRydWUgaWYgYG9iamAgaXMgb2JqZWN0IGFzIGluIHthOiAxLCBiOiAyfSwgbm90IGlmIGl0J3MgZnVuY3Rpb24gb3Jcbi8vIGFycmF5XG5mdW5jdGlvbiBpc09iamVjdChvYmopIHtcbiAgICBpZiAoaXNBcnJheShvYmopKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgcmV0dXJuIHR5cGUgPT09ICdvYmplY3QnICYmICEhb2JqO1xufVxuXG5mdW5jdGlvbiBmb3JFYWNoT2JqZWN0KG9iamVjdCwgY2FsbGJhY2spIHtcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqZWN0KSB7XG4gICAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IG9iamVjdFtrZXldO1xuICAgICAgICAgICAgY2FsbGJhY2sodmFsLCBrZXkpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmbG9hdEVxdWFscyhhLCBiKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKGEgLSBiKSA8IEZMT0FUX0NPTVBBUklTT05fRVBTSUxPTjtcbn1cblxuLy8gaHR0cHM6Ly9jb2RlcndhbGwuY29tL3AvbnlnZ2h3L2Rvbi10LXVzZS1pbm5lcmh0bWwtdG8tZW1wdHktZG9tLWVsZW1lbnRzXG5mdW5jdGlvbiByZW1vdmVDaGlsZHJlbihlbCkge1xuICAgIHdoaWxlIChlbC5maXJzdENoaWxkKSB7XG4gICAgICAgIGVsLnJlbW92ZUNoaWxkKGVsLmZpcnN0Q2hpbGQpO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgcmVuZGVyOiByZW5kZXIsXG4gICAgc2V0U3R5bGU6IHNldFN0eWxlLFxuICAgIHNldFN0eWxlczogc2V0U3R5bGVzLFxuICAgIGNhcGl0YWxpemU6IGNhcGl0YWxpemUsXG4gICAgaXNTdHJpbmc6IGlzU3RyaW5nLFxuICAgIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gICAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICAgIGZvckVhY2hPYmplY3Q6IGZvckVhY2hPYmplY3QsXG4gICAgZmxvYXRFcXVhbHM6IGZsb2F0RXF1YWxzLFxuICAgIHJlbW92ZUNoaWxkcmVuOiByZW1vdmVDaGlsZHJlblxufTtcbiJdfQ==
