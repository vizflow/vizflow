/* */ 
var isPlainObject = require('./isPlainObject');
function customOmitClone(value) {
  return isPlainObject(value) ? undefined : value;
}
module.exports = customOmitClone;
