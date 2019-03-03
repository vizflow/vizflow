/* */ 
var Hash = require('./_Hash'),
    ListCache = require('./_ListCache'),
    Map = require('./_Map');
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}
module.exports = mapCacheClear;
