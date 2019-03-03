/* */ 
var castPath = require('./_castPath'),
    isFunction = require('./isFunction'),
    toKey = require('./_toKey');
function result(object, path, defaultValue) {
  path = castPath(path, object);
  var index = -1,
      length = path.length;
  if (!length) {
    length = 1;
    object = undefined;
  }
  while (++index < length) {
    var value = object == null ? undefined : object[toKey(path[index])];
    if (value === undefined) {
      index = length;
      value = defaultValue;
    }
    object = isFunction(value) ? value.call(object) : value;
  }
  return object;
}
module.exports = result;
