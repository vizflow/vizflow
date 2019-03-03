/* */ 
var baseToPairs = require('./_baseToPairs'),
    getTag = require('./_getTag'),
    mapToArray = require('./_mapToArray'),
    setToPairs = require('./_setToPairs');
var mapTag = '[object Map]',
    setTag = '[object Set]';
function createToPairs(keysFunc) {
  return function(object) {
    var tag = getTag(object);
    if (tag == mapTag) {
      return mapToArray(object);
    }
    if (tag == setTag) {
      return setToPairs(object);
    }
    return baseToPairs(object, keysFunc(object));
  };
}
module.exports = createToPairs;
