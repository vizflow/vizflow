/* */ 
var arrayMap = require('./_arrayMap');
function baseToPairs(object, props) {
  return arrayMap(props, function(key) {
    return [key, object[key]];
  });
}
module.exports = baseToPairs;
