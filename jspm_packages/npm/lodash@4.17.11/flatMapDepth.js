/* */ 
var baseFlatten = require('./_baseFlatten'),
    map = require('./map'),
    toInteger = require('./toInteger');
function flatMapDepth(collection, iteratee, depth) {
  depth = depth === undefined ? 1 : toInteger(depth);
  return baseFlatten(map(collection, iteratee), depth);
}
module.exports = flatMapDepth;
