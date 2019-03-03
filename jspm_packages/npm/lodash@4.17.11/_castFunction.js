/* */ 
var identity = require('./identity');
function castFunction(value) {
  return typeof value == 'function' ? value : identity;
}
module.exports = castFunction;
