/* */ 
(function(process) {
  var baseSlice = require('./_baseSlice'),
      isIterateeCall = require('./_isIterateeCall'),
      toInteger = require('./toInteger');
  var nativeCeil = Math.ceil,
      nativeMax = Math.max;
  function chunk(array, size, guard) {
    if ((guard ? isIterateeCall(array, size, guard) : size === undefined)) {
      size = 1;
    } else {
      size = nativeMax(toInteger(size), 0);
    }
    var length = array == null ? 0 : array.length;
    if (!length || size < 1) {
      return [];
    }
    var index = 0,
        resIndex = 0,
        result = Array(nativeCeil(length / size));
    while (index < length) {
      result[resIndex++] = baseSlice(array, index, (index += size));
    }
    return result;
  }
  module.exports = chunk;
})(require('@empty'));
