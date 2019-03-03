/* */ 
var baseRandom = require('./_baseRandom');
function arraySample(array) {
  var length = array.length;
  return length ? array[baseRandom(0, length - 1)] : undefined;
}
module.exports = arraySample;
