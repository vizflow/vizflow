/* */ 
var getTag = require('./_getTag'),
    isObjectLike = require('./isObjectLike');
var setTag = '[object Set]';
function baseIsSet(value) {
  return isObjectLike(value) && getTag(value) == setTag;
}
module.exports = baseIsSet;
