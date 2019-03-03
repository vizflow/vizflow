/* */ 
var baseClone = require('./_baseClone'),
    baseMatches = require('./_baseMatches');
var CLONE_DEEP_FLAG = 1;
function matches(source) {
  return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
}
module.exports = matches;
