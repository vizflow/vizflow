/* */ 
var getMapData = require('./_getMapData');
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}
module.exports = mapCacheHas;
