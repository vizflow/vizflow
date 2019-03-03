/* */ 
var copyArray = require('./_copyArray'),
    shuffleSelf = require('./_shuffleSelf');
function arrayShuffle(array) {
  return shuffleSelf(copyArray(array));
}
module.exports = arrayShuffle;
