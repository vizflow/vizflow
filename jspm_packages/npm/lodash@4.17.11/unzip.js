/* */ 
(function(process) {
  var arrayFilter = require('./_arrayFilter'),
      arrayMap = require('./_arrayMap'),
      baseProperty = require('./_baseProperty'),
      baseTimes = require('./_baseTimes'),
      isArrayLikeObject = require('./isArrayLikeObject');
  var nativeMax = Math.max;
  function unzip(array) {
    if (!(array && array.length)) {
      return [];
    }
    var length = 0;
    array = arrayFilter(array, function(group) {
      if (isArrayLikeObject(group)) {
        length = nativeMax(group.length, length);
        return true;
      }
    });
    return baseTimes(length, function(index) {
      return arrayMap(array, baseProperty(index));
    });
  }
  module.exports = unzip;
})(require('@empty'));
