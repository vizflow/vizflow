/* */ 
var baseRandom = require('./_baseRandom');
function shuffleSelf(array, size) {
  var index = -1,
      length = array.length,
      lastIndex = length - 1;
  size = size === undefined ? length : size;
  while (++index < size) {
    var rand = baseRandom(index, lastIndex),
        value = array[rand];
    array[rand] = array[index];
    array[index] = value;
  }
  array.length = size;
  return array;
}
module.exports = shuffleSelf;
