/* */ 
var shuffleSelf = require('./_shuffleSelf'),
    values = require('./values');
function baseShuffle(collection) {
  return shuffleSelf(values(collection));
}
module.exports = baseShuffle;
