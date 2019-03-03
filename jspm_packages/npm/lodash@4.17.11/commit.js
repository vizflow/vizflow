/* */ 
var LodashWrapper = require('./_LodashWrapper');
function wrapperCommit() {
  return new LodashWrapper(this.value(), this.__chain__);
}
module.exports = wrapperCommit;
