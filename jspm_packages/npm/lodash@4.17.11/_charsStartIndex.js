/* */ 
var baseIndexOf = require('./_baseIndexOf');
function charsStartIndex(strSymbols, chrSymbols) {
  var index = -1,
      length = strSymbols.length;
  while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
  return index;
}
module.exports = charsStartIndex;
