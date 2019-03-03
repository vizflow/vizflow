/* */ 
(function(Buffer) {
  'use strict';
  function compare(a, b) {
    if (a === b) {
      return 0;
    }
    var x = a.length;
    var y = b.length;
    for (var i = 0,
        len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y) {
      return -1;
    }
    if (y < x) {
      return 1;
    }
    return 0;
  }
  function isBuffer(b) {
    if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
      return global.Buffer.isBuffer(b);
    }
    return !!(b != null && b._isBuffer);
  }
  var util = require('util');
  var hasOwn = Object.prototype.hasOwnProperty;
  var pSlice = Array.prototype.slice;
  var functionsHaveNames = (function() {
    return function foo() {}.name === 'foo';
  }());
  function pToString(obj) {
    return Object.prototype.toString.call(obj);
  }
  function isView(arrbuf) {
    if (isBuffer(arrbuf)) {
      return false;
    }
    if (typeof global.ArrayBuffer !== 'function') {
      return false;
    }
    if (typeof ArrayBuffer.isView === 'function') {
      return ArrayBuffer.isView(arrbuf);
    }
    if (!arrbuf) {
      return false;
    }
    if (arrbuf instanceof DataView) {
      return true;
    }
    if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
      return true;
    }
    return false;
  }
  var assert = module.exports = ok;
  var regex = /\s*function\s+([^\(\s]*)\s*/;
  function getName(func) {
    if (!util.isFunction(func)) {
      return;
    }
    if (functionsHaveNames) {
      return func.name;
    }
    var str = func.toString();
    var match = str.match(regex);
    return match && match[1];
  }
  assert.AssertionError = function AssertionError(options) {
    this.name = 'AssertionError';
    this.actual = options.actual;
    this.expected = options.expected;
    this.operator = options.operator;
    if (options.message) {
      this.message = options.message;
      this.generatedMessage = false;
    } else {
      this.message = getMessage(this);
      this.generatedMessage = true;
    }
    var stackStartFunction = options.stackStartFunction || fail;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, stackStartFunction);
    } else {
      var err = new Error();
      if (err.stack) {
        var out = err.stack;
        var fn_name = getName(stackStartFunction);
        var idx = out.indexOf('\n' + fn_name);
        if (idx >= 0) {
          var next_line = out.indexOf('\n', idx + 1);
          out = out.substring(next_line + 1);
        }
        this.stack = out;
      }
    }
  };
  util.inherits(assert.AssertionError, Error);
  function truncate(s, n) {
    if (typeof s === 'string') {
      return s.length < n ? s : s.slice(0, n);
    } else {
      return s;
    }
  }
  function inspect(something) {
    if (functionsHaveNames || !util.isFunction(something)) {
      return util.inspect(something);
    }
    var rawname = getName(something);
    var name = rawname ? ': ' + rawname : '';
    return '[Function' + name + ']';
  }
  function getMessage(self) {
    return truncate(inspect(self.actual), 128) + ' ' + self.operator + ' ' + truncate(inspect(self.expected), 128);
  }
  function fail(actual, expected, message, operator, stackStartFunction) {
    throw new assert.AssertionError({
      message: message,
      actual: actual,
      expected: expected,
      operator: operator,
      stackStartFunction: stackStartFunction
    });
  }
  assert.fail = fail;
  function ok(value, message) {
    if (!value)
      fail(value, true, message, '==', assert.ok);
  }
  assert.ok = ok;
  assert.equal = function equal(actual, expected, message) {
    if (actual != expected)
      fail(actual, expected, message, '==', assert.equal);
  };
  assert.notEqual = function notEqual(actual, expected, message) {
    if (actual == expected) {
      fail(actual, expected, message, '!=', assert.notEqual);
    }
  };
  assert.deepEqual = function deepEqual(actual, expected, message) {
    if (!_deepEqual(actual, expected, false)) {
      fail(actual, expected, message, 'deepEqual', assert.deepEqual);
    }
  };
  assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
    if (!_deepEqual(actual, expected, true)) {
      fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
    }
  };
  function _deepEqual(actual, expected, strict, memos) {
    if (actual === expected) {
      return true;
    } else if (isBuffer(actual) && isBuffer(expected)) {
      return compare(actual, expected) === 0;
    } else if (util.isDate(actual) && util.isDate(expected)) {
      return actual.getTime() === expected.getTime();
    } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
      return actual.source === expected.source && actual.global === expected.global && actual.multiline === expected.multiline && actual.lastIndex === expected.lastIndex && actual.ignoreCase === expected.ignoreCase;
    } else if ((actual === null || typeof actual !== 'object') && (expected === null || typeof expected !== 'object')) {
      return strict ? actual === expected : actual == expected;
    } else if (isView(actual) && isView(expected) && pToString(actual) === pToString(expected) && !(actual instanceof Float32Array || actual instanceof Float64Array)) {
      return compare(new Uint8Array(actual.buffer), new Uint8Array(expected.buffer)) === 0;
    } else if (isBuffer(actual) !== isBuffer(expected)) {
      return false;
    } else {
      memos = memos || {
        actual: [],
        expected: []
      };
      var actualIndex = memos.actual.indexOf(actual);
      if (actualIndex !== -1) {
        if (actualIndex === memos.expected.indexOf(expected)) {
          return true;
        }
      }
      memos.actual.push(actual);
      memos.expected.push(expected);
      return objEquiv(actual, expected, strict, memos);
    }
  }
  function isArguments(object) {
    return Object.prototype.toString.call(object) == '[object Arguments]';
  }
  function objEquiv(a, b, strict, actualVisitedObjects) {
    if (a === null || a === undefined || b === null || b === undefined)
      return false;
    if (util.isPrimitive(a) || util.isPrimitive(b))
      return a === b;
    if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
      return false;
    var aIsArgs = isArguments(a);
    var bIsArgs = isArguments(b);
    if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
      return false;
    if (aIsArgs) {
      a = pSlice.call(a);
      b = pSlice.call(b);
      return _deepEqual(a, b, strict);
    }
    var ka = objectKeys(a);
    var kb = objectKeys(b);
    var key,
        i;
    if (ka.length !== kb.length)
      return false;
    ka.sort();
    kb.sort();
    for (i = ka.length - 1; i >= 0; i--) {
      if (ka[i] !== kb[i])
        return false;
    }
    for (i = ka.length - 1; i >= 0; i--) {
      key = ka[i];
      if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
        return false;
    }
    return true;
  }
  assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
    if (_deepEqual(actual, expected, false)) {
      fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
    }
  };
  assert.notDeepStrictEqual = notDeepStrictEqual;
  function notDeepStrictEqual(actual, expected, message) {
    if (_deepEqual(actual, expected, true)) {
      fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
    }
  }
  assert.strictEqual = function strictEqual(actual, expected, message) {
    if (actual !== expected) {
      fail(actual, expected, message, '===', assert.strictEqual);
    }
  };
  assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
    if (actual === expected) {
      fail(actual, expected, message, '!==', assert.notStrictEqual);
    }
  };
  function expectedException(actual, expected) {
    if (!actual || !expected) {
      return false;
    }
    if (Object.prototype.toString.call(expected) == '[object RegExp]') {
      return expected.test(actual);
    }
    try {
      if (actual instanceof expected) {
        return true;
      }
    } catch (e) {}
    if (Error.isPrototypeOf(expected)) {
      return false;
    }
    return expected.call({}, actual) === true;
  }
  function _tryBlock(block) {
    var error;
    try {
      block();
    } catch (e) {
      error = e;
    }
    return error;
  }
  function _throws(shouldThrow, block, expected, message) {
    var actual;
    if (typeof block !== 'function') {
      throw new TypeError('"block" argument must be a function');
    }
    if (typeof expected === 'string') {
      message = expected;
      expected = null;
    }
    actual = _tryBlock(block);
    message = (expected && expected.name ? ' (' + expected.name + ').' : '.') + (message ? ' ' + message : '.');
    if (shouldThrow && !actual) {
      fail(actual, expected, 'Missing expected exception' + message);
    }
    var userProvidedMessage = typeof message === 'string';
    var isUnwantedException = !shouldThrow && util.isError(actual);
    var isUnexpectedException = !shouldThrow && actual && !expected;
    if ((isUnwantedException && userProvidedMessage && expectedException(actual, expected)) || isUnexpectedException) {
      fail(actual, expected, 'Got unwanted exception' + message);
    }
    if ((shouldThrow && actual && expected && !expectedException(actual, expected)) || (!shouldThrow && actual)) {
      throw actual;
    }
  }
  assert.throws = function(block, error, message) {
    _throws(true, block, error, message);
  };
  assert.doesNotThrow = function(block, error, message) {
    _throws(false, block, error, message);
  };
  assert.ifError = function(err) {
    if (err)
      throw err;
  };
  var objectKeys = Object.keys || function(obj) {
    var keys = [];
    for (var key in obj) {
      if (hasOwn.call(obj, key))
        keys.push(key);
    }
    return keys;
  };
})(require('buffer').Buffer);
