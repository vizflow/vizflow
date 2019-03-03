/* */ 
var baseClamp = require('./_baseClamp'),
    shuffleSelf = require('./_shuffleSelf'),
    values = require('./values');
function baseSampleSize(collection, n) {
  var array = values(collection);
  return shuffleSelf(array, baseClamp(n, 0, array.length));
}
module.exports = baseSampleSize;
