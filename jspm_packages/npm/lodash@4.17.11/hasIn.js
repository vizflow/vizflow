/* */ 
var baseHasIn = require('./_baseHasIn'),
    hasPath = require('./_hasPath');
function hasIn(object, path) {
  return object != null && hasPath(object, path, baseHasIn);
}
module.exports = hasIn;
