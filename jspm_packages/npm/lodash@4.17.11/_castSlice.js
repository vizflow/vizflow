/* */ 
var baseSlice = require('./_baseSlice');
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}
module.exports = castSlice;
