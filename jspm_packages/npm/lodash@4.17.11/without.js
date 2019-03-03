/* */ 
var baseDifference = require('./_baseDifference'),
    baseRest = require('./_baseRest'),
    isArrayLikeObject = require('./isArrayLikeObject');
var without = baseRest(function(array, values) {
  return isArrayLikeObject(array) ? baseDifference(array, values) : [];
});
module.exports = without;
