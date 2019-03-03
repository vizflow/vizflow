/* */ 
var baseFlatten = require('./_baseFlatten'),
    map = require('./map');
var INFINITY = 1 / 0;
function flatMapDeep(collection, iteratee) {
  return baseFlatten(map(collection, iteratee), INFINITY);
}
module.exports = flatMapDeep;
