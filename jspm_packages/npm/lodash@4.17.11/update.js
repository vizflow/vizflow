/* */ 
var baseUpdate = require('./_baseUpdate'),
    castFunction = require('./_castFunction');
function update(object, path, updater) {
  return object == null ? object : baseUpdate(object, path, castFunction(updater));
}
module.exports = update;
