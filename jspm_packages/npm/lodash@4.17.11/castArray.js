/* */ 
var isArray = require('./isArray');
function castArray() {
  if (!arguments.length) {
    return [];
  }
  var value = arguments[0];
  return isArray(value) ? value : [value];
}
module.exports = castArray;
