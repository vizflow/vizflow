/* */ 
var getTag = require('./_getTag'),
    isObjectLike = require('./isObjectLike');
var mapTag = '[object Map]';
function baseIsMap(value) {
  return isObjectLike(value) && getTag(value) == mapTag;
}
module.exports = baseIsMap;
