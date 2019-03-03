/* */ 
var asciiSize = require('./_asciiSize'),
    hasUnicode = require('./_hasUnicode'),
    unicodeSize = require('./_unicodeSize');
function stringSize(string) {
  return hasUnicode(string) ? unicodeSize(string) : asciiSize(string);
}
module.exports = stringSize;
