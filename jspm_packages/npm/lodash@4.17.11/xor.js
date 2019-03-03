/* */ 
var arrayFilter = require('./_arrayFilter'),
    baseRest = require('./_baseRest'),
    baseXor = require('./_baseXor'),
    isArrayLikeObject = require('./isArrayLikeObject');
var xor = baseRest(function(arrays) {
  return baseXor(arrayFilter(arrays, isArrayLikeObject));
});
module.exports = xor;
