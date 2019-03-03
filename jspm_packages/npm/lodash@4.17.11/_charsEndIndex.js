/* */ 
var baseIndexOf = require('./_baseIndexOf');
function charsEndIndex(strSymbols, chrSymbols) {
  var index = strSymbols.length;
  while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}
module.exports = charsEndIndex;
