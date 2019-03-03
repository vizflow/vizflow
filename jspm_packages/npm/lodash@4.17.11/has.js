/* */ 
var baseHas = require('./_baseHas'),
    hasPath = require('./_hasPath');
function has(object, path) {
  return object != null && hasPath(object, path, baseHas);
}
module.exports = has;
