/* */ 
var arrayShuffle = require('./_arrayShuffle'),
    baseShuffle = require('./_baseShuffle'),
    isArray = require('./isArray');
function shuffle(collection) {
  var func = isArray(collection) ? arrayShuffle : baseShuffle;
  return func(collection);
}
module.exports = shuffle;
