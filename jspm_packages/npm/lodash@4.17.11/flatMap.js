/* */ 
var baseFlatten = require('./_baseFlatten'),
    map = require('./map');
function flatMap(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), 1);
}
module.exports = flatMap;
