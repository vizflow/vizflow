/* */ 
var baseGetTag = require('./_baseGetTag'),
    isObjectLike = require('./isObjectLike');
var dateTag = '[object Date]';
function baseIsDate(value) {
  return isObjectLike(value) && baseGetTag(value) == dateTag;
}
module.exports = baseIsDate;
