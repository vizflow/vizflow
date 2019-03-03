/* */ 
var baseGet = require('./_baseGet'),
    baseSet = require('./_baseSet'),
    castPath = require('./_castPath');
function basePickBy(object, paths, predicate) {
  var index = -1,
      length = paths.length,
      result = {};
  while (++index < length) {
    var path = paths[index],
        value = baseGet(object, path);
    if (predicate(value, path)) {
      baseSet(result, castPath(path, object), value);
    }
  }
  return result;
}
module.exports = basePickBy;
