/* */ 
(function(process) {
  var apply = require('./_apply'),
      arrayMap = require('./_arrayMap'),
      unzip = require('./unzip');
  function unzipWith(array, iteratee) {
    if (!(array && array.length)) {
      return [];
    }
    var result = unzip(array);
    if (iteratee == null) {
      return result;
    }
    return arrayMap(result, function(group) {
      return apply(iteratee, undefined, group);
    });
  }
  module.exports = unzipWith;
})(require('@empty'));
