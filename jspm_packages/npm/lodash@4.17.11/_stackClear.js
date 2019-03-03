/* */ 
var ListCache = require('./_ListCache');
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}
module.exports = stackClear;
