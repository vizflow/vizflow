/* */ 
var castPath = require('./_castPath'),
    toKey = require('./_toKey');
function baseGet(object, path) {
  path = castPath(path, object);
  var index = 0,
      length = path.length;
  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}
module.exports = baseGet;
