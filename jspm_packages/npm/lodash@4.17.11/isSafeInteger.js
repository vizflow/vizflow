/* */ 
var isInteger = require('./isInteger');
var MAX_SAFE_INTEGER = 9007199254740991;
function isSafeInteger(value) {
  return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
}
module.exports = isSafeInteger;
