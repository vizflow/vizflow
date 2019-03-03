/* */ 
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');
var boolTag = '[object Boolean]';
function isBoolean(value) {
  return value === true || value === false || (isObjectLike(value) && baseGetTag(value) == boolTag);
}
module.exports = isBoolean;
