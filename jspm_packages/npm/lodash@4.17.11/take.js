/* */ 
var baseSlice = require('./_baseSlice'),
    toInteger = require('./toInteger');
function take(array, n, guard) {
  if (!(array && array.length)) {
    return [];
  }
  n = (guard || n === undefined) ? 1 : toInteger(n);
  return baseSlice(array, 0, n < 0 ? 0 : n);
}
module.exports = take;
