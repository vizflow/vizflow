/* */ 
var arrayMap = require('./_arrayMap'),
    baseIntersection = require('./_baseIntersection'),
    baseIteratee = require('./_baseIteratee'),
    baseRest = require('./_baseRest'),
    castArrayLikeObject = require('./_castArrayLikeObject'),
    last = require('./last');
var intersectionBy = baseRest(function(arrays) {
  var iteratee = last(arrays),
      mapped = arrayMap(arrays, castArrayLikeObject);
  if (iteratee === last(mapped)) {
    iteratee = undefined;
  } else {
    mapped.pop();
  }
  return (mapped.length && mapped[0] === arrays[0]) ? baseIntersection(mapped, baseIteratee(iteratee, 2)) : [];
});
module.exports = intersectionBy;
