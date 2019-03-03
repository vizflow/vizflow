/* */ 
var baseUpdate = require('./_baseUpdate'),
    castFunction = require('./_castFunction');
function updateWith(object, path, updater, customizer) {
  customizer = typeof customizer == 'function' ? customizer : undefined;
  return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
}
module.exports = updateWith;
