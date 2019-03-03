/* */ 
var copyObject = require('./_copyObject'),
    getSymbols = require('./_getSymbols');
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}
module.exports = copySymbols;
