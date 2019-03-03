/* */ 
var arrayEachRight = require('./_arrayEachRight'),
    baseEachRight = require('./_baseEachRight'),
    castFunction = require('./_castFunction'),
    isArray = require('./isArray');
function forEachRight(collection, iteratee) {
  var func = isArray(collection) ? arrayEachRight : baseEachRight;
  return func(collection, castFunction(iteratee));
}
module.exports = forEachRight;
