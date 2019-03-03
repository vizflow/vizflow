/* */ 
var baseClone = require('./_baseClone'),
    baseConforms = require('./_baseConforms');
var CLONE_DEEP_FLAG = 1;
function conforms(source) {
  return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
}
module.exports = conforms;
