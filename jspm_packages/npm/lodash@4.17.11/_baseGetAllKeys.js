/* */ 
var arrayPush = require('./_arrayPush'),
    isArray = require('./isArray');
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}
module.exports = baseGetAllKeys;
