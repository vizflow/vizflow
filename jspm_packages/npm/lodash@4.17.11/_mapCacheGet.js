/* */ 
var getMapData = require('./_getMapData');
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}
module.exports = mapCacheGet;
