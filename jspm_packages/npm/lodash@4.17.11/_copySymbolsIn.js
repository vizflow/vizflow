/* */ 
var copyObject = require('./_copyObject'),
    getSymbolsIn = require('./_getSymbolsIn');
function copySymbolsIn(source, object) {
  return copyObject(source, getSymbolsIn(source), object);
}
module.exports = copySymbolsIn;
