/* */ 
var baseClone = require('./_baseClone'),
    baseMatchesProperty = require('./_baseMatchesProperty');
var CLONE_DEEP_FLAG = 1;
function matchesProperty(path, srcValue) {
  return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
}
module.exports = matchesProperty;
