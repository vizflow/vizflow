/* */ 
var get = require('./get');
function baseAt(object, paths) {
  var index = -1,
      length = paths.length,
      result = Array(length),
      skip = object == null;
  while (++index < length) {
    result[index] = skip ? undefined : get(object, paths[index]);
  }
  return result;
}
module.exports = baseAt;
