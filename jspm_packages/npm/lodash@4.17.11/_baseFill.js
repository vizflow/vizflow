/* */ 
var toInteger = require('./toInteger'),
    toLength = require('./toLength');
function baseFill(array, value, start, end) {
  var length = array.length;
  start = toInteger(start);
  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = (end === undefined || end > length) ? length : toInteger(end);
  if (end < 0) {
    end += length;
  }
  end = start > end ? 0 : toLength(end);
  while (start < end) {
    array[start++] = value;
  }
  return array;
}
module.exports = baseFill;
