/* */ 
var arrayFilter = require('./_arrayFilter'),
    isFunction = require('./isFunction');
function baseFunctions(object, props) {
  return arrayFilter(props, function(key) {
    return isFunction(object[key]);
  });
}
module.exports = baseFunctions;
