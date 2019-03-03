/* */ 
var isArrayLike = require('./isArrayLike'),
    isObjectLike = require('./isObjectLike');
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}
module.exports = isArrayLikeObject;
