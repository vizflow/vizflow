/* */ 
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');
var regexpTag = '[object RegExp]';
function baseIsRegExp(value) {
  return isObjectLike(value) && baseGetTag(value) == regexpTag;
}
module.exports = baseIsRegExp;
