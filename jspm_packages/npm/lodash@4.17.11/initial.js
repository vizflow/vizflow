/* */ 
var baseSlice = require('./_baseSlice');
function initial(array) {
  var length = array == null ? 0 : array.length;
  return length ? baseSlice(array, 0, -1) : [];
}
module.exports = initial;
