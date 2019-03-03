/* */ 
var baseClamp = require('./_baseClamp'),
    copyArray = require('./_copyArray'),
    shuffleSelf = require('./_shuffleSelf');
function arraySampleSize(array, n) {
  return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
}
module.exports = arraySampleSize;
