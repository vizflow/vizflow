/* */ 
var baseGet = require('./_baseGet'),
    baseSlice = require('./_baseSlice');
function parent(object, path) {
  return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
}
module.exports = parent;
