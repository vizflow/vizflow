/* */ 
var apply = require('./_apply'),
    arrayMap = require('./_arrayMap'),
    baseFlatten = require('./_baseFlatten'),
    baseIteratee = require('./_baseIteratee'),
    baseRest = require('./_baseRest'),
    baseUnary = require('./_baseUnary'),
    castRest = require('./_castRest'),
    isArray = require('./isArray');
var nativeMin = Math.min;
var overArgs = castRest(function(func, transforms) {
  transforms = (transforms.length == 1 && isArray(transforms[0])) ? arrayMap(transforms[0], baseUnary(baseIteratee)) : arrayMap(baseFlatten(transforms, 1), baseUnary(baseIteratee));
  var funcsLength = transforms.length;
  return baseRest(function(args) {
    var index = -1,
        length = nativeMin(args.length, funcsLength);
    while (++index < length) {
      args[index] = transforms[index].call(this, args[index]);
    }
    return apply(func, this, args);
  });
});
module.exports = overArgs;
