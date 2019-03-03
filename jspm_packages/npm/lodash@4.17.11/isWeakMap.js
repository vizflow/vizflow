/* */ 
var getTag = require('./_getTag'),
    isObjectLike = require('./isObjectLike');
var weakMapTag = '[object WeakMap]';
function isWeakMap(value) {
  return isObjectLike(value) && getTag(value) == weakMapTag;
}
module.exports = isWeakMap;
