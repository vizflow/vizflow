/* */ 
var basePropertyOf = require('./_basePropertyOf');
var htmlUnescapes = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'"
};
var unescapeHtmlChar = basePropertyOf(htmlUnescapes);
module.exports = unescapeHtmlChar;
