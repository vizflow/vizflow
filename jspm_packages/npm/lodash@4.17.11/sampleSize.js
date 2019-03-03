/* */ 
var arraySampleSize = require('./_arraySampleSize'),
    baseSampleSize = require('./_baseSampleSize'),
    isArray = require('./isArray'),
    isIterateeCall = require('./_isIterateeCall'),
    toInteger = require('./toInteger');
function sampleSize(collection, n, guard) {
  if ((guard ? isIterateeCall(collection, n, guard) : n === undefined)) {
    n = 1;
  } else {
    n = toInteger(n);
  }
  var func = isArray(collection) ? arraySampleSize : baseSampleSize;
  return func(collection, n);
}
module.exports = sampleSize;
