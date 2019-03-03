/* */ 
var isArrayLikeObject = require('./isArrayLikeObject');
function castArrayLikeObject(value) {
  return isArrayLikeObject(value) ? value : [];
}
module.exports = castArrayLikeObject;
