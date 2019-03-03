/* */ 
var baseGet = require('./_baseGet'),
    baseSet = require('./_baseSet');
function baseUpdate(object, path, updater, customizer) {
  return baseSet(object, path, updater(baseGet(object, path)), customizer);
}
module.exports = baseUpdate;
